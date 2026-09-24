# Image folders

All 65 source images (230 files including smaller variants and animation posters) have readable names and folders. No image was recompressed, resized or otherwise changed in this revision.

## Structure

```text
assets/images/
  intro/
    collage-01.webp ... collage-14.webp
    responsive/
  projects/
    ren-path-of-destiny/
      cover.webp
      responsive/
      gameplay/
        gameplay-01.webp
        responsive/gameplay-01-320w.webp
      technical/
        hungarian-algorithm-step-01.webp
        mocap-01.webp
        responsive/
    digging-game/
    ball-bashers/
    word-search/
    tower-of-hanoi/
    ruin-runners/
    2-player-tag/
    think-try-treasure/
    lost-trance/
    ben-3/
    bubble-parkour/
```

Each project has only the folders needed by its existing images. Covers are stored with their projects. The regular filename is the largest existing version; responsive subfolders contain smaller versions with their width in the name. For example, `gameplay-01-640w.webp` is 640 pixels wide. Animated diagrams retain separate `-poster.webp` stills.

`config/projects.js` and `config/intro.js` reference these new paths. `config/image-manifest.js` preserves the browser's responsive selection and reduced-motion posters. `config/image-source-map.json` connects original full-resolution filenames from the older source archive to their current organized counterparts. The intro synchronization script reads the updated manifest automatically.

To replace an existing image, either replace its complete family of sizes or use a new filename in the project configuration. Changing only the largest file can leave visitors seeing an older smaller variant. New ordinary image paths also work without a manifest entry. After changing intro configuration, follow the existing `npm run sync:intro` instruction.

The website's layout, text, navigation, intro behavior, contact placement, documents and videos were not changed.
