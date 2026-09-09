# Requested navigation and intro revision

This revision uses your supplied Portfolio/7 ZIP as its starting point. Project content, media files, profile styling, contact positioning rules and all other site features are preserved.

## Changes and controls

1. **Projects bar restored.** Thumbnails appear on the home and project pages. Minimize hides the entire row; the header shows an arrow with “Projects” to restore it. Its state persists while switching between pages. The current project is highlighted. In `config/site.js`, see `projectQuickBar.mode`, `initiallyCollapsed`, `minimizeLabel` and `restoreLabel`.
2. **Intro restored.** It starts before the main page, uses your existing 14 collage images and exits into the page after the configured duration. The opening markup, critical styles and small collage images are embedded in `index.html`, preventing the main page from flashing while JavaScript or images load. It plays on each full page load; internal navigation does not replay it. Reduced-motion preferences remain respected.
3. **Contact background matched.** Each project's background extends through the reserved right-hand area and the contact panel uses the project's colors. Contact placement and its breakpoints are unchanged. See `experience.contact.matchProjectBackground` in `config/experience.js`.
4. **Documents and links at the top.** A compact row keeps the existing links above the project introduction. It sticks below the header/projects bar on viewports at least 761px wide and 650px tall. Phones and short screens use normal scrolling to preserve viewing space. It never covers the contact panel. See `experience.projectDetail.documents` for compact mode, label, sticky behavior, minimum dimensions and maximum height.

## Editing the intro

Edit `config/intro.js` for its text, images, duration, enabled state and `showOncePerTab` preference. After changing that file, run `npm run sync:intro` with Node.js installed to synchronize the embedded opening frame. No packages are required. This step keeps the very first frame consistent with the configuration and embeds only the small existing image variants. Other configuration changes still require only a page refresh.

Run `npm run check` to check the configured files and JavaScript syntax. The earlier README/configuration notes describe the previous revision's defaults; the settings above supersede its drawer, disabled-intro and bottom-document defaults.
