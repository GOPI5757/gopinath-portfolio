# Controls for this update

All existing project content and media remain in their original locations. Open the site through a local web server or GitHub Pages, not by double-clicking index.html (JavaScript modules require HTTP).

## Intro

Edit `config/intro.js`:
- `titleGap`: space between the name, subtitle and intro label.
- `collageColumns` and `collageMinRows`: collage dimensions.
- `backgroundAssets`: your images, in their original order. Only the extra cells needed to complete the grid repeat images. For example, 14 images in 3 columns produces 15 cells, repeating the first image once.

After editing the intro, run `node scripts/sync-intro.mjs` and upload the updated `index.html` as well. The first frame is embedded in HTML so the intro appears before the main page, without waiting for JavaScript or image downloads. Do not remove the intro guard from index.html.

## Floating contact panel

Edit `experience.contact` in `config/experience.js`:
- `adjustContentAroundPanel: true`: nearby content blocks make room for the open panel. There is no full-height reserved page column. A long block, such as a code walkthrough, can become narrower while it intersects the panel.
- `adjustContentAroundPanel: false`: the same floating panel overlays content without changing its width. It can cover content underneath; collapse it to uncover that area.
- Keep `reserveContentSpace: false` for both modes. This older setting would restore a full-height side column.
- `panelWidth`, `topOffset`, `contentGap`, `minContentWidth`, `initiallyCollapsed` control size, spacing and initial state.
- `mobileMaxWidth: 760` and `shortMaxHeight: 520` control when contact moves to the bottom. Normal laptop viewports keep it on the right.
- `showMobileScrollHint` and `mobileScrollHint` control the swipe hint. Arrow buttons also move the strip, and become disabled at its ends.

This is block-level layout reflow, not image/pixel cutting. The profile video and page background stay full-width. The panel remains fixed while scrolling.

## Homepage project cards

Edit `experience.projectGrid` in `config/experience.js`:
- `visualCards` enables the new thumbnail-first style.
- `showStatus` displays the existing project's status.
- `thumbnailRatio`, `coverOpacity`, `gap`, `mobileGap`, and the existing desktop/tablet/mobile column counts control appearance.

## Code walkthroughs

Edit `config/code-snippets.js`. A **visible, clearly labelled placeholder** is included on the **Digging Game** page, directly after gameplay videos. Other projects get this section when you add their project ID to `projectCodeSnippets`.

Each project maps to an array, so you can add any number of walkthrough groups. Each group contains any number of files and connections. IDs must be unique within their group; snippet IDs use letters, digits, underscores or hyphens.

1. Copy the example group to the desired project key (IDs are in `config/projects.js`).
2. Replace each snippet's `fileName`, `language`, `code`, `startLine` and `explanation`.
3. Set `highlights` to one or more inclusive ranges, such as `[{ start: 6, end: 9 }, { start: 15, end: 18 }]`.
4. Add connections with an ID, label, `from` and `to`. Both endpoints identify a snippet ID and inclusive line range:

```js
{
  id: "spawn-call",
  label: "Spawn request → implementation",
  from: { snippet: "header", start: 6, end: 7 },
  to: { snippet: "implementation", start: 20, end: 26 },
}
```

Repeat `from` in additional connection objects to draw several arrows from the same source. `end` can be omitted for a single line. The arrow meets the center of the selected line range at the card edge; it does not depend on horizontal code scrolling. Same-file connections are supported too.

`startLine: 40` means the first displayed line is 40, so highlights and endpoints must use those displayed line numbers. Keep every range inside its file. Run the validation command below after editing to catch mistakes.

Set a group's `explanationPosition` to `"left"` or `"right"`. The explanation column contains a separate labelled explanation for each file. On mobile, explanations stack below the files. Global defaults include `columns` (maximum), `minCardWidth`, `explanationWidth`, `mobileMaxWidth`, `fontSize`, `lineHeight`, `arrowColor`, `highlightColor` and `showConnections`.

Code cards fit fewer columns when necessary. `explanationStackBelow` also moves explanations below the code when the available group width gets too narrow, including when an open contact panel reduces that width. Long code lines scroll inside their own card. On mobile, cards stack and right-angle arrows run in the left gutter. Connection buttons let readers jump to destination or source lines and highlight both endpoints. Copy buttons copy the file without line numbers. Basic syntax colours support common C++/C# tokens; other languages are safely displayed as text.

When your real code and explanation are in place, set `placeholder: false` and replace the group's example title/description. Set group `enabled: false` to hide a walkthrough, or global `codeSnippetSettings.enabled: false` to hide all walkthroughs.

Code uses JavaScript template strings (backticks). Escape a literal backtick as \` and a literal interpolation opener as \${ when pasting code. Backslashes inside code strings must be escaped as \\. An alternative is `code: ["first line", "second line"].join("\n")` with normal JS string escaping.

The renderer never executes pasted code or treats it as HTML. Invalid groups are omitted safely at runtime and reported by the validation script.

## Contact form

Edit `form` in `config/contact.js`:
- `maxWidth: "36rem"` keeps the form near half a desktop page and fits narrow screens.
- `showGmail`, `showCopy`, `gmailLabel`, `copyLabel`, `buttonLabel` and `recipientEmail` control its options.
- Default `deliveryMode: "mailto"` prepares a draft in an email app. Gmail prepares a browser draft; Copy message provides a clipboard/manual-copy fallback. Visitors must send the message in their chosen email service. No email is sent by this static website.
- A real service can be connected later with `deliveryMode: "endpoint"` and its HTTPS URL. It must accept the form fields as JSON, allow your site's origin, and return a success HTTP status. `timeoutMs` bounds failed requests. Never put a private API key in this public config.

## Engine-work videos

Edit `experience.engineVideos` in `config/experience.js`:
- `desktopColumns: 4` (change to 5 if preferred).
- `tabletColumns: 3`.
- `mobileColumns: 2` (change to 3 if preferred).
- `desktop` starts above `tabletMaxWidth: 1100`; mobile is at/below `mobileMaxWidth: 760`.
- `gap` controls spacing. Counts are clamped to 1–6. Gameplay videos retain their existing layout.

## Validate and publish

```text
node scripts/sync-intro.mjs
node scripts/validate.mjs
node scripts/test-features.mjs
```

Upload the contents of `game-programmer-portfolio`, including `.nojekyll`, to your existing GitHub Pages folder. Keep the existing project configuration, media and folder paths together. No additional packages or build system are required.
