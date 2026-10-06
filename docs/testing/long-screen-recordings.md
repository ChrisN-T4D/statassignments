# Long screen recording verification

## Findings and change

The prior recorder retained every emitted Blob until stop (and retained the chunk
array after creating the preview). At 2.5 Mb/s, one hour is approximately 1.125 GB
before audio. Browsers may spill Blob data to disk themselves; this finding does
not establish that all those bytes were resident RAM or prove the cause of a
particular student's interrupted recording.

The first capture attempt also imposed no resolution/frame-rate constraint, VP9
was preferred over VP8, and native `onstop` did not reset the recording UI or
release the capture pipeline. A fixed 250 ms cleanup timer could run independently
of final chunk delivery.

The fix:

- Commit each chunk to an origin-private local file, releasing its queued Blob.
  Finalization creates a Blob from file-backed parts, without `arrayBuffer()` or
  base64 conversion of the whole video. No server upload is added.
- On storage failure, preserve the failed chunk and pending/final chunks in memory
  and request an orderly stop. Unsupported storage uses a memory fallback with a
  32 MiB stop watermark. This is not a cap on the browser's total RAM, nor a strict
  cap on a single late/oversized chunk emitted by the browser.
- Keep files until discard/unmount. Where Web Locks are available, a later start
  removes abandoned directories but skips active recordings/previews in other
  tabs. After a crash/close, temporary files can remain until that cleanup or until
  site data is cleared. This is not a reload recovery feature; students must still
  download their video.
- Prefer VP8 and 1080p/15 fps capture with unconstrained compatibility fallbacks;
  limit camera compositing size/rate and release its video/canvas resources.
- Finalize only after `onstop` (after final `dataavailable`); explain unexpected
  stops, release input devices, protect unsaved previews from a new start, and warn
  on closing/reloading with an active or unsaved recording.

## Automated checks

```sh
npm ci --include=dev --ignore-scripts --legacy-peer-deps
npm run verify:screen-recorder
npm run build
```

`--legacy-peer-deps` is needed by the existing Vite 7 / plugin-vue 5 peer mismatch;
this change does not update dependencies.

The optional Chromium integration check needs `playwright-core` and a Chromium
executable. It uses a synthetic canvas display source, **real MediaRecorder and
OPFS**, and the actual Vue component. It does not exercise the OS screen picker.

```sh
# Terminal 1
npm run dev -- --host 127.0.0.1 --port 5178
# Terminal 2; adjust executable/module paths for your environment
PLAYWRIGHT_MODULE=/path/to/playwright-core/index.mjs \
CHROMIUM_PATH=/usr/bin/chromium \
node scripts/verify-screen-recorder-browser.mjs
```

Coverage: normal stop, pause/resume, playable download metadata, final chunks,
external and unexpected recorder stops, injected disk-full partial-save behavior,
preview replacement guard, cleanup, lock-protected abandoned-file cleanup,
desktop/mobile layout smoke, and an accelerated 3,600-chunk / 1.125 GB storage run.
The stress producer waits when its pending queue exceeds 2 MiB. Its measured queue
size and optional JS heap samples are not a total-browser RAM benchmark.

## Still required before release

- One actual 60–90 minute homework recording on Chrome/Edge, Firefox, and Safari,
  including narration, pause/resume, download and playback through the final frame.
- Repeat with camera enabled, switching to another tab/app, and Tools closed.
  Canvas `requestAnimationFrame` compositing is still subject to background-tab
  throttling; this patch does not claim to solve that browser behavior.
- Inspect total browser process memory, CPU, readability of software text at 1080p,
  A/V sync, and storage use, not only JavaScript heap or the application queue.
- Check a low-storage/private-browsing environment. An orderly partial-save stop
  is intentional when storage or the fallback watermark is exhausted.
- Confirm the affected students' browser/version and whether sharing ended, the
  computer slept, the page closed, or only the video froze. No affected-user trace
  was available during implementation.

No production service, configuration or data was changed. Development-host SSH
was unavailable; tests ran in an isolated GitHub checkout, not the neu2 compose
stack. No merge or deployment is part of this change.
