# Video Tutorial Guidelines

This folder contains video resources for the statistics course.

## Directory Structure

```
videos/
├── backups/          # Backup videos (downloaded from YouTube)
│   ├── correlation-tutorial.mp4
│   ├── t-test-walkthrough.mp4
│   └── regression-basics.mp4
└── gifs/             # Short animated clips
    ├── select-variables.gif
    └── run-analysis.gif
```

## Adding Videos to Topics

### Method 1: YouTube Embedded (Recommended)

Add this HTML to your topic's `contentHtml` in `src/data/topics.js`:

```html
<div class="video-box">
  <div class="video-title">📺 Video Tutorial: Your Title Here</div>
  <div class="video-wrapper">
    <iframe
      src="https://www.youtube.com/embed/YOUR_VIDEO_ID?rel=0&modestbranding=1"
      title="Descriptive title for accessibility"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</div>
```

**How to get YouTube Video ID:**
- From URL `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Video ID is: `dQw4w9WgXcQ` (everything after `v=`)

### Method 2: Self-Hosted Video

For backup videos or short clips:

```html
<div class="video-box">
  <div class="video-title">📺 Tutorial: Your Title</div>
  <div class="video-wrapper">
    <video controls playsinline>
      <source src="/videos/backups/your-video.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</div>
```

### Method 3: GIF Animation

For short animated demonstrations:

```html
<div class="video-box">
  <div class="video-title">Demo: Selecting Variables</div>
  <div class="video-wrapper">
    <img src="/videos/gifs/select-variables.gif" alt="How to select variables in Jamovi">
  </div>
</div>
```

## Video Guidelines

### YouTube Videos (Primary)
- **Pros:** No storage costs, reliable streaming, easy updates, mobile-optimized
- **Cons:** Requires internet, external dependency
- **Best for:** Longer tutorials (3+ minutes), frequently updated content
- **Setup:** Create a "Statistics Course" YouTube channel or playlist

### Backup Videos (Secondary)
- **Purpose:** Fallback if YouTube is blocked or unavailable
- **When to create:** Only for critical/essential tutorials
- **Format:** .mp4 (H.264 codec)
- **Resolution:** 720p (1280x720) is sufficient
- **File size:** Target 10-20MB (compress using HandBrake)
- **Download tool:** Use youtube-dl or similar to download from YouTube

### GIFs (For Short Clips)
- **Best for:** 5-15 second demonstrations
- **Tool:** Use ScreenToGif, Gifski, or LICEcap
- **Size:** Keep under 5MB
- **Alternative:** Use .webm format for better quality/size ratio

## Video Production Tips

### Recording

1. **Close unnecessary apps/windows** - Minimize distractions
2. **Maximize the software window** - Focus on what matters
3. **Use clear audio** - Built-in mic is fine, but test first
4. **Keep videos short** - 3-5 minutes max per concept
5. **Plan your walkthrough** - Know what you'll demonstrate before recording

### Editing

- **Trim dead space** - Cut out pauses and mistakes
- **Add captions** - Accessibility and non-native English speakers
- **Consistent intro/outro** - Brand your course
- **Add timestamps** - YouTube chapters for longer videos

### Compression

Use HandBrake with these settings:
- **Preset:** "Fast 720p30"
- **Video Codec:** H.264
- **Framerate:** 30fps (or "Same as source")
- **Quality:** RF 22-24 (lower = better quality but bigger file)
- **Audio:** AAC, 128kbps

## YouTube Channel Setup

1. Create channel: "YourUniversity Statistics Course"
2. Organize playlists by module:
   - Module 1: Introduction
   - Module 2: Research Design
   - Module 3: Software Basics
   - ...
   - Module 8: Analysis Methods
3. Enable captions (auto-generate, then edit for accuracy)
4. Use consistent naming: "[Module X.Y] Topic Name - Software"
5. Add to course playlist for easy navigation

## Maintenance

- **Update videos** when software UI changes
- **Monitor comments** on YouTube for common questions
- **Check backup videos** match current YouTube versions
- **Archive old versions** (don't delete, students may still reference)

## Example Pattern

Here's a complete example showing YouTube + backup:

```html
<div class="video-box">
  <div class="video-title">📺 Video Tutorial: Running a T-Test in Jamovi</div>
  <div class="video-wrapper">
    <!-- Primary: YouTube -->
    <iframe
      src="https://www.youtube.com/embed/abc123xyz?rel=0&modestbranding=1&start=0"
      title="T-Test Tutorial in Jamovi"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
  <details style="margin-top: 0.5rem;">
    <summary style="cursor: pointer; font-size: 0.875rem; color: var(--text-muted);">
      📥 Offline backup video available
    </summary>
    <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.5rem;">
      If YouTube is unavailable,
      <a href="/videos/backups/t-test-jamovi.mp4" download>download the backup video (15MB)</a>.
    </p>
  </details>
</div>
```

## Need Help?

- Check existing topics for examples (see Correlation topic in Module 8)
- Test videos on mobile devices and different browsers
- Consider accessibility (captions, transcripts, alternative text)
