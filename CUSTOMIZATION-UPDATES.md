> **Configuration moved:** This is a historical guide. All project content and project-related controls now live in `config/projects.js`; code snippets remain separate. Use [PROJECT-CONFIG-GUIDE.md](PROJECT-CONFIG-GUIDE.md) for current paths and settings. Technical blocks now start expanded.

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

The current version includes multiple independent blocks for every project. Edit the matching file under `config/code-projects/`. See `UPDATE-2-GUIDE.md` for the current block structure, routing, video, resume and navigation settings.

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
