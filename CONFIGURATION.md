# Configuration guide

Edit the files in config/, save and refresh. No rebuild is needed. Keep quotes and commas valid. Content items with `enabled: false` are hidden.

## Profile background

Edit `profileVideo` in config/experience.js:

| Setting | Effect |
| --- | --- |
| enabled | true; set false to restore a profile without the video layer |
| autoplay | true; silent playback where the browser permits it |
| showPauseButton | Shows a visitor-controlled pause/play button |
| pauseLabel / playLabel | Control labels |
| respectReducedMotion / respectDataSaver | Starts with a poster when the browser reports these preferences |
| pauseWhenOffscreen | Pauses outside the viewport; hidden browser tabs also pause |
| loadDelayMs | 350; lets the poster and text render first |
| desktopMinHeight / mobileMinHeight | 38rem / 48rem |
| mobileMaxWidth | 600; viewport breakpoint for phone profile spacing |
| portraitMaxRatio / squareMaxRatio | 0.82 / 1.35; selects the export using the profile SECTION width divided by its height |
| objectFit | contain preserves the entire export; cover fills the area but crops |
| overlayDesktop / overlayPortrait | Editable CSS gradients behind text |
| sources | Desktop, tablet and mobile MP4 paths and their matching posters |

The same silent 25.6-second montage is supplied at 1600x900, 960x960 and 720x1280. Landscape gameplay is preserved within blurred extensions in the square/portrait compositions. Only one video source is attached at a time. Crossing a shape threshold on resize changes the source and restarts the loop. Text and shading are website elements, not baked into the video.

Autoplay depends on browser policy; the poster remains when playback cannot start. The visible play button allows manual playback. Data-saver detection depends on browser support.

For profile text size, edit `profileWidgets[0].style.description.fontSize` in config/profile.js. Its current `clamp(1.125rem, 1.6vw, 1.35rem)` scales from 18 to 21.6 pixels at the default browser font size. Copy, tags, title size and colors are in the same file.

## Contact position

Edit `contact` in config/experience.js:

- placement: "auto" moves the bar to the bottom at **width <= 760 pixels OR height <= 520 pixels**. Otherwise it stays on the right, including 1024x768, 1280x720 and 1366x768 laptop viewports.
- mobileMaxWidth and shortMaxHeight change those thresholds. Browser viewport size determines behavior, rather than the device name.
- placement: "right" or "bottom" forces that position everywhere.
- panelWidth and topOffset set the right panel width and distance from the top.
- initiallyCollapsed sets its initial open state.
- reserveContentSpace: true prevents the right panel from covering content.

Contact labels, email, phone, social links and form fields remain in config/contact.js. On phones, swipe the contact items horizontally. The mailto form prepares an email draft. Endpoint mode requires your own working backend; server/ contains an optional example, which GitHub Pages cannot run.

## Projects at the top

In config/site.js, edit the site's projectQuickBar object:

- mode: "drawer" provides the compact Browse projects button. The list opens on demand and closes via Close, Escape or a click outside the dialog.
- mode: "bar" restores the old horizontal strip; initiallyCollapsed controls that strip.
- enabled: false hides this extra project navigation. The main Projects section remains.
- buttonLabel, label and closeLabel rename the controls.

In config/experience.js, projectBrowser controls maxWidth, maxHeight, desktopColumns, mobileColumns, mobileMaxWidth and thumbnailAspectRatio. navigation.menuMaxWidth controls when main navigation becomes a Menu button.

## Project cards and pages

In config/experience.js, projectGrid controls:

- mobileColumns: 2, tabletColumns: 3, desktopColumns: 4.
- mobileMaxWidth: 760 and tabletMaxWidth: 1100.
- gap, mobileGap, mobileTitleSize and mobileCardMinHeight.
- coverOpacity, showGraphConnectors and showCategoryCode.

projectDetail.sectionOrder is an ordered list of gameplay-videos, technical, images, engine-videos and documents. Reorder to change presentation; omit an ID to hide its section. Empty sections are omitted automatically.

All project content is in config/projects.js. Projects have a unique id, categoryIds, coverImage, facts and optional technicalBlocks, images, gameplayVideos, engineWorkVideos and documentGroups. Add or disable items there. YouTube items use `youtube: "https://youtu.be/VIDEO_ID"`; an optional poster overrides the project cover on their Play button.

## Images and performance

In config/experience.js, performance controls:

| Setting | Effect |
| --- | --- |
| responsiveImages | Select a suitable generated image width |
| lazyImages | Load images near the viewport |
| imageRootMargin | How early nearby images load; 180px by default |
| imageSizes | Browser, project-card and detail size hints; adjust if substantially changing column widths |
| clickToLoadYouTube | Load a player only after Play is clicked |
| playVideoLabel / watchLinkLabel / imageErrorLabel | Media control/fallback copy |
| decorativeProjectImages | Optional decorative image collage on project pages; off by default |
| maxDecorativeImages | Maximum decorative images when enabled |

assets/optimized contains the generated variants. config/image-manifest.js connects their paths, dimensions and widths. Keep these files together. Carousels create additional slides only when selected. Animated technical diagrams remain animated WebP; their static poster is used when reduced motion is requested at page load.

To add an image, create a folder such as assets/images/my-project, add your resized/compressed file, and set its coverImage or src in config/projects.js. An ordinary image path works without a manifest entry. WebP alone does not guarantee small downloads: dimensions and file size also matter. For multiple sizes, follow an existing image-manifest.js entry with src, width, height and versions. Match filename case exactly.

Original full-resolution images remain in your original ZIP and are omitted from this package to avoid duplicate uploads. config/image-source-map.json maps old names to optimized replacements.

## Other settings

- config/intro.js: optional intro animation, disabled by default.
- config/theme.js: global fonts and colors.
- config/skills.js and config/certificates.js: skills and certificates. Certificate navigation is hidden while there is no enabled certificate image.
- config/site.js: profile actions and resume. Add your actual PDF and enable its action.
- experience.customCSS: advanced CSS overrides for visual details beyond the named settings. This is appended after the regular stylesheets.

For content improvements, add your exact role, team size, dates, playable/source links and the challenge, implementation and result behind your strongest systems. Include only facts and metrics you can substantiate.
