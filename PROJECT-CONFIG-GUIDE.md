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
