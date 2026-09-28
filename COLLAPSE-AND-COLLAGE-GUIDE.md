> **Configuration moved:** This is a historical guide. All project content and project-related controls now live in `config/projects.js`; code snippets remain separate. Use [PROJECT-CONFIG-GUIDE.md](PROJECT-CONFIG-GUIDE.md) for current paths and settings. Technical blocks now start expanded.

# Collapsible project content and contact collage

This update starts from your supplied ZIP. It adds collapse controls to the Code walkthroughs and Technical work section headings, their individual walkthrough/block titles, and an optional decorative thumbnail collage beside the contact form. Your original content, documents, assets and other configuration files are preserved.

## Collapse settings

Edit `config/collapsible-content.js`. Every existing project and code/technical block is listed with its title for easy identification.

- Top-level `enabled: false` removes all collapse controls and shows all content normally.
- Each project's `enabled: false` does the same for that project only.
- For each title, `enabled: true` adds a clickable arrow; `enabled: false` makes it a normal heading with its content visible.
- `initiallyCollapsed: true` starts that title closed. `false` starts it open. This setting only applies when its collapse control is enabled.
- `sections.code` and `sections.technical` control the two overall section titles.
- `codeBlocks` controls each code walkthrough, including its snippets, explanations and connections as one block.
- `technicalBlocks` controls each individual technical-work block, including its descriptions and images.

The initial setup keeps the overall sections open and individual blocks closed. Visitors can open multiple blocks independently; opening one does not close another. Closing and reopening an overall section preserves its child blocks' current states. Visiting another project and returning resets the states to the configured defaults.

For example, under `projects["digging-game"].codeBlocks`, change the existing entry to:

```js
"dig-surface-mesh": {
  title: "Digging updates an exposed-face mesh",
  enabled: true,
  initiallyCollapsed: false
}
```

The `title` fields in this configuration are reference labels only; displayed wording still comes from the original project/code configuration. Do not change the entry keys when changing a displayed title. Two existing Digging Game technical blocks share an original ID, so their independent keys have `--1` and `--2` suffixes. This keeps the original project data intact.

New projects and blocks use the values under `defaults` until you add per-project/per-title entries. Existing explicit entries override those defaults. To change the current blocks' behavior, edit their listed entries. A normal individual title remains inside its parent section, so closing that parent still hides it.

The whole title and arrow act as a button. Tab focuses it, and Enter or Space toggles it. Hidden content is removed from keyboard navigation. Code arrows recalculate when reopened; copy and connection buttons remain available in expanded blocks.

## Contact collage

Edit `config/contact-collage.js`:

- `enabled: false` removes the collage and returns the original form layout.
- `minViewportWidth`: minimum screen width, default 1100 pixels. Phones stay excluded even if you lower this below 761.
- `minCollageWidth`: required free width beside the form, default 250 pixels. The collage disappears when there is insufficient space; the form keeps its configured width.
- `gap`: space between form and collage.
- `height`: maximum collage height.
- `columns`: thumbnail columns (1–6).
- `tileRatio`: thumbnail proportions, default `"16 / 10"`.
- `opacity`: 0–1; lower values blend the collage more subtly into the background.
- `saturation`: color intensity; 0 makes it grayscale.
- `rotation`: grid tilt in degrees; 0 removes the tilt.
- `edgeFade`: width of the soft fading edges, default `"12%"`.

The collage automatically uses each enabled project's existing cover image. No new images were added. To exclude a specific game or choose a different existing image, add an override:

```js
projectOverrides: {
  "word-search": { enabled: false },
  "digging-game": {
    enabled: true,
    src: "assets/images/projects/digging-game/cover.webp"
  }
}
```

Use an actual image path from your archive if changing `src`. Omitting `src` uses that project's normal thumbnail. The collage is decorative, has no links, and does not cover or intercept the form. Images are added only after the wider layout becomes eligible.

## Scope and verification

Existing files changed: `index.html`, `js/app.js`, and `js/code-snippets.js`. New configuration, rendering helpers, styles and this guide supply the two features. Original project text, code excerpts, videos, documents and images are unchanged. Git history from the input archive is excluded from the deliverable, as in previous website ZIPs.

Checks covered mobile project routes, nested open/close behavior, restored code arrows, keyboard operation, normal titles, initial-state overrides, the master off switch, and collage removal on narrow screens or when disabled. Run `node scripts/validate.mjs` for the existing configuration, syntax and asset checks.
