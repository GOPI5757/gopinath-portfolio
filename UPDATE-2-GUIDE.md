# Portfolio update 2 — customization

These settings are for the changes in this ZIP. Existing media and project descriptions are preserved. The two code examples in **every game** are visibly labelled placeholders; replace them with real code before presenting them as your implementation.

## Multiple code blocks for every project

Open `config/code-projects/<project-id>.js`, for example `config/code-projects/ren-path-of-destiny.js`. Each file exports a `blocks` array:

```js
export const blocks = [
  { id: "combat", enabled: true, title: "Combat system", /* snippets, explanations, connections */ },
  { id: "movement", enabled: true, title: "Movement system", /* its own snippets, explanations, connections */ },
];
```

The complete editable examples are already in each file. Duplicate an entire block and assign a unique block `id` to add a third, fourth or more. Within each block:

- `snippets` contains any number of files, with unique snippet IDs, `fileName`, `language`, `code`, `startLine`, `highlights`, and `explanation`.
- `connections` contains any number of arrows. `from` and `to` each select a `snippet`, `start` line and optional inclusive `end` line. Repeat a source in multiple connections to branch to several destinations.
- `explanationPosition: "left"` or `"right"` changes the explanation column. On smaller screens it moves below the code to retain readability.
- `placeholder: false` removes the placeholder label once you supply your real implementation. Replace the sample titles and descriptions too.
- `enabled: false` hides a block. An empty array hides the section for that project.

Snippet IDs may repeat in different blocks; highlights and connections remain independent. `startLine` controls the displayed first line, and ranges use those displayed numbers. Use backtick strings for multiline code; escape literal backticks, backslashes and `${` sequences as required by JavaScript strings.

`config/code-snippets.js` holds the project-to-file mapping and global layout, colour and font defaults. New games need an imported block array and matching project ID in this mapping. `columns` is a maximum; `minCardWidth` keeps narrow cards from becoming unreadable. `arrowClearance` controls the gutter offset and `arrowBendPenalty` discourages unnecessary corners.

Arrows choose short horizontal/vertical routes around the actual card rectangles. They no longer automatically travel above the cards for cross-row links. On mobile they use the outside gutter. Extra detours are used only where cards obstruct a shorter route. A connection button jumps to its destination; its Source button returns to the source range.

## Contact bar

`experience.contact.matchProjectBackground` in `config/experience.js` is now `false`: contact uses the homepage theme on every route. Set it to `true` only if you want the former project-colour behavior.

The header Contact link still navigates to the contact form, and also expands the side/bottom contact bar if it was collapsed. Existing overlay/reflow, size and positioning controls remain available. The new featured-project strip also makes room when local contact reflow is enabled.

## Resume buttons

Edit `resumeSettings` in `config/discovery.js`:

- `href` is the shared PDF path for all new View/Download buttons.
- `profile.enabled`, `showView`, `showDownload` and `first` control the profile buttons and whether they appear before Explore projects.
- `header.enabled`, `showView` and `showDownload` control top-bar buttons.
- Labels, `accent` and `textColor` are configurable. `headerDownloadShortLabel` is the compact mobile download label, with a full accessible label retained.

View opens the PDF in a new tab; Download uses the browser's download behavior. PDF display depends on the visitor's browser/PDF preferences. These buttons do not change the resume file. The old `profileActions` resume item is suppressed while the new profile resume controls are enabled, preventing duplicates. Other custom profile actions remain intact.

## Video images and responsive grids

Edit `videoPresentation` in `config/discovery.js`:

- `thumbnailSource: "youtube"` shows the video's YouTube thumbnail (the new default).
- `thumbnailSource: "project"` shows the game's cover image.
- `thumbnailSource: "custom"` uses the individual video's `poster` path.
- `posterFit: "contain"` shows the whole image without stretching or cropping, including portrait images. Empty space at the sides is expected for portrait pictures inside a landscape frame. `"cover"` fills the frame but can crop it.
- `aspectRatio` controls the video/thumbnail frame, default `"16 / 9"`; `background` controls its letterbox colour.

Any video object in `config/projects.js` can override `thumbnailSource`, `posterFit` or `aspectRatio`. Set its `poster` for custom mode. YouTube image failures fall back to the project cover; playback and the Watch on YouTube link remain available. Thumbnail loading depends on YouTube/network availability.

Edit `experience.gameplayVideos` in `config/experience.js`: defaults are `desktopColumns: 4`, `tabletColumns: 3`, `mobileColumns: 2`. Breakpoints and gaps are in the same object. `experience.engineVideos` independently controls engine-work videos. A project with only one video still shows one card; videos are never duplicated to fill the grid.

## Featured project at the top of the homepage

Edit `liveProjectSettings` in `config/discovery.js`. Default: **Ren: Path of Destiny**.

- `enabled` shows/hides the strip; `projectId` selects a configured project and its destination.
- `label` defaults to IN DEVELOPMENT. This is a featured work-in-progress label, not an automatic live-status feed.
- `showImage`, `showEngine`, `showLanguage`, `showFormat` toggle details.
- Empty `title`, `engine`, `language`, `format` and `image` use that project's values. Supply overrides if desired; `description` is optional.
- `imageFit`, `imageWidth`, `accent` and `linkLabel` control presentation.

The strip appears before the profile, only on the homepage. It is not fixed or sticky and scrolls out of view normally.

## Visitor choice: project bar or drawer

Edit `siteSettings[0].projectQuickBar` in `config/site.js`:

- `mode` is the initial default (`"bar"` or `"drawer"`).
- `allowVisitorModeSwitch: true` shows the two-option control beside Projects/Browse projects.
- `rememberVisitorMode: true` remembers the selection in that browser. A saved visitor choice overrides `mode`. Set this to false if the configuration should be the default on every reload.
- `barModeLabel`, `drawerModeLabel`, `modeSwitchLabel`, `buttonLabel`, `mobileButtonLabel` and the existing minimize/restore labels are editable.

The visible control uses two keyboard-accessible pressed-state buttons. It changes navigation without rebuilding the project content or clearing a typed contact message. Bar mode retains Minimize and Restore; drawer mode retains the project dialog.

## Validate and host

```text
node scripts/validate.mjs
node scripts/test-features.mjs
node scripts/test-routing.mjs
```

Serve through HTTP locally or upload the folder contents (including `.nojekyll`) to GitHub Pages. Keep all existing assets and the new modules/config folders. No dependencies or build step are required. If changing the intro later, run `node scripts/sync-intro.mjs` as documented in the previous guide.
