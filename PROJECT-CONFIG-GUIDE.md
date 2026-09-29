# Project configuration: one place to edit

All editable project content and project-related presentation settings now live in **`config/projects.js`**. The only separate project-authoring configuration is the code system: `config/code-snippets.js` and the per-game code arrays in `config/code-projects/`.

The five former project configuration files (`source-additions.js`, `project-page-images.js`, `project-presentation.js`, `collapsible-content.js`, and `contact-collage.js`) have been removed after their values were migrated. Nothing imports those files anymore.

## Each game: `projectItems`

Find a game's `id` or `title` in `projectItems`:

| What to edit | Location inside that game |
| --- | --- |
| Title, summary, description, engine, language, status | Existing named fields |
| Card thumbnail | `coverImage` |
| Page background image and image-specific appearance | `pageBackground` |
| Facts, videos, documents, gallery images | `facts`, `gameplayVideos`, `engineWorkVideos`, `documentGroups` / `documentSections`, `images` |
| All technical content, including the source-backed additions | `technicalBlocks` |
| Collapse behavior of one technical block | That block's `collapse` object |
| Overall Technical work section collapse | `sections.technical.collapse` |
| Overall Code walkthroughs section collapse | `sections.code.collapse` |
| Collapse behavior of one code walkthrough | `sections.code.blocks["walkthrough-id"].collapse` |
| Disable every collapse control for the game | `collapseEnabled: false` |
| Override description panel styling for this game | `descriptionStyle` |

Technical descriptions and new screenshots have been merged into their original project arrays, retaining exactly the former display order. Code excerpts and connection definitions remain separate and unchanged.

All **36 technical blocks start expanded**: each now has `collapse.initiallyCollapsed: false`. A collapse object's `enabled: false` means a normal, always-visible heading; it does not remove content. Use the block's original outer `enabled` field to hide the entire block. Code walkthroughs retain their previous initial states.

Example technical block:

```js
{
  id: "my-system",
  enabled: true,
  title: "My gameplay system",
  description: "Explain the implementation here.",
  collapse: { enabled: true, initiallyCollapsed: false },
  images: []
}
```

For a new code walkthrough, put its code in `config/code-projects/<game-id>.js`. Add an entry with the same walkthrough ID under the game's `sections.code.blocks` only if you want to override the shared collapse defaults. The `title` in that control entry is a reference label; the displayed title comes from the code walkthrough itself.

## Shared project settings: `projectSettings`

| Setting | Location |
| --- | --- |
| Bar/drawer switch, labels, default mode | `navigation.quickBar` |
| Right-arrow hidden-project count | `navigation.quickBar.hiddenProjects` |
| Drawer dimensions and columns | `navigation.drawer` |
| Home project-card grid | `home.grid` |
| Total project count | `home.totalProjects` |
| Featured/live project strip | `home.featured` |
| Detail-page section order | `detail.sectionOrder` |
| Document toolbar | `detail.documents` |
| Responsive fact columns | `detail.facts` |
| Gameplay / engine video grids | `detail.videos.gameplay` / `detail.videos.engine` |
| YouTube/project thumbnail choice and video fitting | `detail.videos.presentation` |
| Default page background blending | `detail.pageBackground` |
| Scattered decorative images | `detail.decorativeImages` |
| Description panels and readable text | `detail.descriptions` |
| Collapse master switch and defaults | `collapse` |
| Thumbnail collage beside the contact form | `contactCollage` |

Home section wording remains in `projectSectionWidgets`, and project categories remain in `projectCategories`, both in this same file. Contact details, profile content, resume links, site identity, intro and global loading behavior remain in their existing non-project files.

## Description readability

The new subtle panels cover project introductions, technical descriptions, code walkthrough descriptions and code explanation paragraphs. They use the project's surface color, a faint theme-colored border and rounded corners. Internal padding gives the text breathing room while keeping the existing paragraph width and font size. Automatic text color prefers the project's muted text color when its contrast is sufficient, otherwise it uses contrasting light or dark text.

In `projectSettings.detail.descriptions`:

- `enabled: false` turns the treatment off globally.
- `background: "auto"` follows the project's surface color. You can provide a solid CSS color instead.
- `textColor: "auto"` chooses contrasting text. You can provide your own color instead.
- `opacity` controls the panel strength; default `0.9` keeps the background from interfering with the text.
- `padding` controls breathing room inside the panel (default `"0.7rem 1rem"`).
- `borderOpacity` controls the subtle theme-colored border (default `0.22`).
- `radius` controls corner rounding.
- `hero.enabled`, `technical.enabled` and `code.enabled` independently control each description type.

Override these for one game in its `descriptionStyle`, for example:

```js
descriptionStyle: {
  enabled: true,
  background: "#17202b",
  textColor: "auto",
  opacity: 0.94
}
```

## Image files and generated metadata

Existing asset paths are unchanged. When replacing a game's `pageBackground.src`, also remove or update its `versions` array so browsers do not select the old responsive image.

The remaining image manifests and JSON audit reports describe generated assets, recording timestamps, source provenance or the profile montage. They are supporting metadata, not separate editable project display settings. `js/` files are rendering code; routine content editing does not require changing them.

## Verification

The migration was checked against the previous ZIP's effective project data. All project text, original media entries and ordering match. Existing code files and assets are byte-for-byte preserved. Technical blocks were changed only by adding their local collapse settings with an expanded initial state. Browser checks cover the new description styling, collapse controls, project navigation and responsive layouts.

Run `node scripts/validate.mjs` to check configuration imports, syntax and local asset paths.


## Centered profile and project cards (September 30, 2026)

These controls use the existing configuration files; no new configuration file is needed.

### Profile and video overlay

In `config/profile.js`, the profile keeps `description: ""`. `centered: true` centers the name, role, tags and action button. Existing contact-content adjustment still applies while the desktop contact panel is open.

In `config/experience.js`, edit `profileVideo.overlay`:

```js
overlay: {
  enabled: true,
  background: ["#070d18"],
  opacity: 0.58,
  angle: 90
}
```

One color produces a solid overlay. Two or more colors produce a linear gradient, for example `background: ["#070d18", "#24436b"]`. `angle` is in degrees, using CSS gradient directions (90 = toward the right, 180 = downward). `opacity` ranges from 0 (transparent) to 1 (opaque). `enabled: false` hides the layer. The same layer sits between the video and text on all device sizes. The older `overlayDesktop` and `overlayPortrait` settings are fallbacks only if the new `overlay` object is removed.

`profileVideo.showPauseButton` is now `false`; the existing video playback and reduced-motion/data-saving behavior remains intact.

### Contact sidebar clearance

In `config/experience.js`, `contact.topOffset` is `"7.25rem"`. `avoidLiveProject: true` also keeps the right sidebar below the live-project strip while that strip is visible. `liveProjectGap: 12` controls the gap in pixels. The mobile bottom contact bar keeps its previous behavior.

### Project-card badges and borders

In `config/projects.js`, edit `projectSettings.home.grid.statusBadge`:

- `enabled: false` hides all thumbnail status badges. The existing `showStatus: false` switch also hides them.
- `inProgress` and `completed` each expose `label`, `background` and `textColor`.
- `radius` sets corner rounding.
- Existing statuses containing "In progress" or "development" use `inProgress`; those containing "Completed" or "Finished" use `completed`. The original status text on project detail pages remains unchanged. Other statuses use `other` colors and their original text.

`projectSettings.home.grid.cardBorder` exposes `enabled`, `color` and `width`. Disabling it returns to the original card border styling.

The home cards retain their images, titles, engine/language/format and click behavior. The repeated node label and "Open project" text are omitted.

### Numbered section labels

In `config/site.js`, `showSectionEyebrows: false` hides the small labels such as "PROFILE / 01", "PROJECTS / 02", "SKILLS / 03" and the corresponding labels on other home sections. The main section headings remain. Set it to `true` to restore those labels. Project-detail labels and the opening intro are unchanged.


## Screen-fitting profile

`config/profile.js` now has `fitViewport: true`. The profile fills the screen space remaining below the header, project bar and live-project strip, and above the mobile contact bar. It updates on resizing, rotation, mobile browser-height changes and bar minimization. The full video frame is contained without cropping; unused side/top space can appear when its aspect ratio differs from the available area. Text remains vertically centered, with compact spacing on short screens and a final scale-to-fit safeguard for very restricted heights. The rest of the website remains scrollable below it. Set `fitViewport: false` to restore the previous profile sizing.

The Explore projects button uses a dark theme gradient, accent border, teal arrow and keyboard focus outline. Its colors remain editable in `config/site.js` under `profileActions`, on the action with `id: "projects"`.


## Profile video edge blending

In `config/experience.js`, `profileVideo.edgeBlend` controls the soft horizontal edges:

```js
edgeBlend: {
  enabled: true,
  width: 0.12,
  background: "var(--background)"
}
```

`width` is the fraction of the visible video width faded on each side (0.12 = 12%; valid range 0–0.5). `background` follows the page theme by default. Set `enabled: false` to restore hard edges. The fade follows the actual contained video/poster edges even when there is empty space beside the video; it does not crop, stretch or resize the video or affect the profile text, overlay or button.
