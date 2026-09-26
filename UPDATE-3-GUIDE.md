# Update 3 — layout controls

This update contains only the seven requested layout changes. It supersedes the earlier guides where the defaults below differ. Edit the configuration files, save them and refresh the page. After publishing, a hard refresh may be needed to clear the browser cache.

## Live-project strip — `config/discovery.js`

In `liveProjectSettings`:

- `fullWidth: true` spans the available page width. Set `false` to restore the previous inset strip.
- `avoidContact: true` moves the strip's content clear of an expanded desktop contact panel. Its outer width stays unchanged. Set `false` for an overlay. This control is independent of the general contact-content adjustment setting.
- `label: "It's live now"` controls the badge text.
- `labelColor: "#ff6670"` controls the red badge text and dot. Use any valid CSS color.
- The existing `projectId`, title, engine, language, format, description, image, visibility and accent settings still work. `accent` controls the strip's other accent details.

The label is manually configured. It is not an automatic release-status check, and does not change the project's status elsewhere.

## Resume — `config/discovery.js`

`resumeSettings.header` still displays the view and download links in the header. Both use the same `href` PDF path.

`resumeSettings.profile.enabled: false` removes the profile resume group. `suppressLegacyProfileResume: true` also hides the older resume action from the profile. To restore the profile group, set `profile.enabled` to `true`; keep the legacy suppression enabled to avoid duplicates.

## Mobile header — `config/experience.js`

In `experience.navigation`:

- `mobileSingleRow: true` places the name, action controls and menu in one row.
- On narrow phones, swipe the controls horizontally to reach Projects and the Bar/Drawer switch. The name and menu stay visible; keyboard users can tab through every control.
- Set `mobileSingleRow: false` to restore the previous two-row mobile header.
- `mobileHeaderMaxWidth: 760` sets the single-row breakpoint in CSS pixels.
- `mobileControlsLabel` is the accessible label for the scrolling controls.

## Project facts — `config/experience.js`

`experience.projectFacts` defaults to two columns up to `mobileMaxWidth: 760`, and three up to `tabletMaxWidth: 1100`. Change `mobileColumns` to `3` to try three facts per mobile row. Column counts are limited to 1–6; narrower cards wrap longer text. Desktop styling remains unchanged.

## Bottom contact strip — `config/experience.js`

`experience.contact.alwaysOpenOnMobile: true` keeps contacts visible and removes the collapse toggle whenever the existing responsive rules place the strip at the bottom. This includes short-height screens that already use bottom placement. The arrows and swipe hint remain available.

Set this option to `false` to restore the bottom-strip toggle. The desktop/right-side toggle remains available in either case. Its collapsed preference is preserved when resizing between desktop and mobile.

## Single videos — `config/experience.js`

Both `experience.gameplayVideos.expandSingleVideo` and `experience.engineVideos.expandSingleVideo` default to `true`. A section or selected engine-work category with exactly one video spans the whole grid row, keeping its configured aspect ratio. Multiple videos retain the existing desktop/tablet/mobile column counts. Set either option to `false` to restore fixed-column sizing for a single video in that section.

## Included checks

- Configuration, JavaScript syntax, local asset paths, intro-collage behavior and code-arrow routing checks passed.
- Browser checks covered 320px/390px phones, an 820px tablet and a 1440px desktop; single-row and two-row headers; two/three-column facts; contact placement and toggles; and single/multiple gameplay and engine videos.
- Existing project descriptions, project data, code examples, resume PDF, images, documents and videos were preserved.

Publish the contents of `game-programmer-portfolio/` using the same GitHub Pages process as before. No build step or new service is required.
