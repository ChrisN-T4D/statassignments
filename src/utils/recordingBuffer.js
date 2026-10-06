/**
 * Spool recording chunks to private browser storage, not an ever-growing array
 * of encoded video. Each chunk is committed separately so a later quota/write
 * failure cannot discard earlier chunks. Files stay local and are removed on
 * discard/unmount; this is temporary storage, not a recovery/backup service.
 */
export const RECORDING_BUFFER_LIMIT = 32 * 1024 * 1024

export async function createRecordingBuffer({
  storage = globalThis.navigator?.storage,
  locks = globalThis.navigator?.locks,
  limit = RECORDING_BUFFER_LIMIT,
  onPressure = () => {}
} = {}) {
  let root
  let directory
  let releaseLock
  const name = `mm-recording-${globalThis.crypto.randomUUID()}`
  try {
    root = await storage?.getDirectory?.()
    if (root && locks) {
      // Hold a cross-tab lock for the lifetime of the preview too. On a later
      // recording, only delete abandoned directories (e.g. after a tab crash).
      await new Promise((resolve, reject) => {
        locks.request(name, () => new Promise(release => {
          releaseLock = release
          resolve()
        })).catch(reject)
      })
      for await (const [oldName, handle] of root.entries()) {
        if (handle.kind !== 'directory' || !oldName.startsWith('mm-recording-')) continue
        await locks.request(oldName, { ifAvailable: true }, async lock => {
          if (lock) await root.removeEntry(oldName, { recursive: true }).catch(() => {})
        })
      }
    }
    if (root) directory = await root.getDirectoryHandle(name, { create: true })
  } catch (_) {
    releaseLock?.()
    // Private browsing and older browsers may not expose writable storage.
  }

  const entries = []
  let pendingBytes = 0
  let memoryBytes = 0
  let size = 0
  let tail = Promise.resolve()
  let closed = false
  let warned = false
  let diskAvailable = Boolean(directory)

  function pressure(reason) {
    if (warned) return
    warned = true
    onPressure(reason)
  }

  return {
    get size() { return size },
    get bufferedBytes() { return pendingBytes + memoryBytes },
    get usesDisk() { return diskAvailable },
    append(blob) {
      if (closed) throw new Error('Recording storage is closed')
      if (!blob?.size) return
      size += blob.size
      pendingBytes += blob.size
      const index = entries.length
      const entry = {}
      entries.push(entry)
      tail = tail.then(async () => {
        if (diskAvailable) {
          let writer
          try {
            const file = await directory.getFileHandle(String(index), { create: true })
            writer = await file.createWritable()
            await writer.write(blob)
            await writer.close()
            entry.file = file
          } catch (_) {
            try { await writer?.abort() } catch (_) { /* already closed */ }
            diskAvailable = false
            entry.blob = blob
            memoryBytes += blob.size
            pressure('storage')
          }
        } else {
          entry.blob = blob
          memoryBytes += blob.size
        }
        pendingBytes -= blob.size
      })
      // Request an orderly stop before the queue/fallback consumes unbounded RAM.
      // Accept the final dataavailable event too: never silently drop a chunk.
      if (pendingBytes + memoryBytes >= limit) pressure('memory')
    },
    async finish(type) {
      closed = true
      await tail
      const parts = []
      for (const entry of entries) {
        parts.push(entry.file ? await entry.file.getFile() : entry.blob)
      }
      // File-backed Blob parts do not require reading the video into JS memory.
      return new Blob(parts, { type })
    },
    async dispose() {
      closed = true
      await tail
      entries.length = 0
      memoryBytes = 0
      try {
        if (directory) {
          await root.removeEntry(name, { recursive: true })
          directory = null
        }
      } finally {
        releaseLock?.()
      }
    }
  }
}
