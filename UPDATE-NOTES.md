# Update notes

## Changes

- Integrated the silent 25.6-second gameplay montage with landscape, square and portrait exports, matching posters, readable overlays and pause/play controls.
- Right contact panel for laptop/desktop viewports; bottom contact strip at width <= 760px or height <= 520px. Thresholds and placement are configurable.
- On-demand project browser replaces the persistent top thumbnail strip. The original strip remains configurable.
- Larger, brighter profile description. Two project cards per row on phones, with improved narrow-screen wrapping.
- Project detail order: gameplay, technical work, screenshots, engine videos, documents. Order is configurable.
- Missing resume download and empty certificate navigation hidden. Unrelated placeholder galleries removed; all projects retained.
- Fixed category keyboard wraparound, route title resets, malformed project hashes and observer/listener cleanup. Home section navigation preserves the video state.
- Clarified the form prepares an email draft rather than sending directly.

## Image loading

The original image folder contained **75,261,623 bytes (75.26 MB)**, including large PNGs and animations. Format conversion alone does not fix excessive dimensions or too many simultaneous downloads.

The replacement library is **7,848,162 bytes (7.85 MB)** including all responsive sizes and animation posters, about **89.6% less image storage**. This is an asset-size comparison, not a measured live-site speed improvement.

The site now selects smaller variants, reserves image dimensions, loads images near the viewport, defers unopened carousel slides, disables decorative image layers by default, and creates YouTube players only after a click. Three background video exports add about 11.4 MiB to the package, but only the export selected for the current profile shape is attached at a time.

There was no live GitHub deployment or network timing comparison. Visitor connection, cache state and third-party services still affect loading. Asset paths were checked from a subdirectory to reflect repository-based static hosting.

## Checks

- JavaScript syntax and 10 configuration modules validated.
- All 11 project IDs checked for duplicates; 239 configured local asset references verified with exact filename case.
- Browser viewport checks: 320x740, 390x844, 844x390, 1024x768, 1280x720 and 1366x768. Checked grid counts, contact placement and horizontal overflow.
- Checked project dialog, navigation, video pause, contact collapse and a mobile project carousel.
- Confirmed no YouTube iframe before Play and one iframe for the clicked player afterward. External playback remains dependent on YouTube and the visitor's network.
- Confirmed the portrait video is selected for the mobile profile after layout.

These are browser viewport checks, not physical-device tests or a guarantee for every browser. No deployment was made.

## Content still worth adding

The strongest remaining credibility improvements need your information: a real resume, individual contributions on team projects, team size/dates, playable builds and specific technical results. Rename generic labels such as Engine work Video 001 to the actual demonstrated system in config/projects.js. No unverifiable accomplishments or performance metrics were added.
