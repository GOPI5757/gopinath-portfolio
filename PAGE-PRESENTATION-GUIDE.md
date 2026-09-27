# Project backgrounds and counts

This update adds only the project-page background images, the right-arrow hidden-project badge, and the total-project badge beside the home Projects section label. Existing project content, videos, thumbnails, code walkthroughs and other settings are preserved.

## Switch features off

Open `config/project-presentation.js`. Each feature has its own `enabled` switch:

- `pageBackground.enabled`: the blended image behind the project title, description and facts.
- `hiddenProjects.enabled`: the count on the project bar's right arrow.
- `totalProjects.enabled`: the total beside the home Projects section label.

Set any of these to `false` to hide that feature.

## Replace a page image without changing a thumbnail

All page background images are independent copies in `assets/images/project-page-backgrounds/`. Current thumbnails were used as the initial images. Their smaller responsive versions are in that folder's `responsive/` subfolder.

1. Put your new image in `assets/images/project-page-backgrounds/` with a descriptive filename.
2. Find the matching project ID in `config/project-page-images.js` and change its `src` path.
3. **Remove its `versions` array** unless you have also created new responsive versions of the replacement image. Otherwise browsers can keep selecting the old responsive images.
4. Adjust `position` and `mobilePosition` to choose which part is visible, for example `"70% center"`. Set that entry's `enabled` to `false` to hide the background for just that game.

When adding a new game, add its ID and image entry to `project-page-images.js` if you want a page background. The two counts update from the project list automatically when the site loads; they do not need a manually entered number.

## Appearance

Shared values are in `project-presentation.js` under `pageBackground`. An individual game's image entry can override them:

- `opacity`: image strength from 0 to 1; default 0.32 keeps text readable.
- `height` / `mobileHeight`: maximum backdrop height. This is decorative and never inserts space above the title.
- `fit`: default `"cover"` fills the width and crops as needed without stretching.
- `position` / `mobilePosition`: image focus point.
- `sideFade`: softness at both horizontal edges.
- `topFade`: distance before the top edge becomes fully visible.
- `bottomFadeStart`: point where the lower fade starts; it fades completely into the existing page background at the bottom.
- `mobileMaxWidth`: shared mobile breakpoint, in pixels.

The background scrolls away with the page, and the existing text and facts stay in place. If a background image cannot load, its decorative layer is removed and the original page background remains.

## What the counts mean

The right-arrow number counts cards that are wholly or partly hidden beyond the right edge of the project strip. It updates while scrolling, after resizing, and when restoring the minimized bar. It hides at the end. A click keeps the existing scrolling distance: on a narrow phone, multiple clicks may be needed to reveal all remaining projects. `disableAtEnds` controls whether the arrows are disabled at their respective ends. Accessible labels can be edited using the `{count}` placeholder.

The total counts distinct enabled project IDs with a title. It does not multiply projects that belong to several categories, and it remains the overall total when switching category filters. The label and singular form are customizable.

## Checks

Checked all 11 project routes on desktop, plus phone and tablet layouts, background image paths, bar scrolling and minimization, and all three feature switches. Turning the background off preserved the hero's measured height and title position. No horizontal page overflow was observed at the checked widths of 320, 390, 820 and 1440 pixels. The original project data and media are unchanged.
