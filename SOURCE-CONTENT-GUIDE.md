> **Configuration moved:** This is a historical guide. All project content and project-related controls now live in `config/projects.js`; code snippets remain separate. Use [PROJECT-CONFIG-GUIDE.md](PROJECT-CONFIG-GUIDE.md) for current paths and settings. Technical blocks now start expanded.

# Source-backed portfolio update

This version starts from your supplied `gopinath-portfolio.zip`. Existing project descriptions, facts, links and technical work are retained. New technical blocks and screenshots appear before the existing items. All placeholder code blocks have been removed.

## Included source reviews

| Website project | Supplied archive | Walkthroughs | Code excerpts |
| --- | --- | ---: | ---: |
| Digging Game | DiggingGame.zip | 5 | 13 |
| Ruin Runners | 2PMultiplayer.zip | 3 | 8 |
| Ball Bashers | BaseBallGame.zip | 2 | 6 |
| 2-Player Tag | c_3.zip, Snow_Game scripts | 2 | 4 |
| Tower of Hanoi | TOH.zip | 2 | 4 |
| Ben 3 | BYOG_2D.zip | 3 | 8 |
| Bubble Parkour | GGJ_2025_ParkourFPS-main.zip | 2 | 4 |
| Lost Trance | mask-project.zip | 4 | 9 |
| Word Search | word_search_2d.rar | 3 | 8 |
| **Total** | | **26** | **64** |

Ren and Think Try Treasure had no source archive in this delivery. Their existing pages and technical content remain; their placeholder walkthrough sections are hidden until real snippets are added. The initial word_search.zip was a template; only the corrected word_search_2d.rar supplied the new Word Search excerpts.

Excerpts retain original source line numbers and code, with shared leading indentation removed for readability. Some excerpts intentionally show a portion of a longer method and are not standalone compilable files. `config/code-source-audit.json` records each excerpt's source path, range and original-file SHA-256. Generated input wrappers, Unity template scripts and package-cache code are not presented as portfolio work.

## Customize the content

- `config/code-projects/<project-id>.js`: editable walkthrough arrays. Each block has its own title, description, snippets, highlights, connections and explanation position. Duplicate a block with a new ID to add another. Source paths are documentation; displayed code is stored directly in `code`.
- Each snippet has `fileName`, `language`, `startLine`, `code`, `highlights` and `explanation`. Highlight and arrow line numbers must refer to the original numbers starting at `startLine`.
- `config/source-additions.js`: the new technical blocks and gameplay images. These are prepended to the corresponding project arrays in the app. Set a block or image's `enabled` to `false` to hide it. Your original `config/projects.js` was not edited.
- `config/code-snippets.js`: shared typography, columns, explanation placement and arrow appearance. Existing settings continue to work.

Connections represent the call, event or state relationship stated in their labels; they are not all direct function calls. Use the connection buttons to jump to highlighted lines on phones, or the Source button to return to the origin.

## Arrow overlap controls

Arrows now account for routes already drawn in the same block. They use nearby parallel lanes and small endpoint offsets inside the selected line, rather than sharing a horizontal or vertical segment. They keep square corners and avoid card interiors.

- `avoidArrowOverlap: true`: enable separation; `false` restores independent shortest routing.
- `arrowLaneSpacing: 6`: preferred spacing in CSS pixels (clamped to 3–12).
- `arrowPortSpread: 6`: maximum preferred endpoint adjustment inside the highlighted line range.
- `arrowMaxDetour: 48`: maximum allowed additional travel relative to the original route (minimum 12 pixels).
- `arrowClearance` and `arrowBendPenalty` keep their existing meanings.

Routes remain bounded and compact. Very dense custom diagrams can still require changing snippet order, selected lines or spacing; the supplied diagrams and the reported parallel-endpoint case were checked for shared segments at desktop and phone widths.

## Gameplay images and background edit

Added 10 stills from the supplied recordings: three Digging Game, one Ball Bashers, four Lost Trance and two Word Search. Their descriptive filenames live inside each project's `gameplay` folder. Smaller WebP variants and image-manifest entries support responsive loading. `config/gameplay-stills.json` records recording names and timestamps.

The silent background montage is **26.2 seconds**, with Ren, Digging Game, Ball Bashers, Tower of Hanoi, Word Search and Lost Trance. Lost Trance contributes yellow-, blue- and red-realm gameplay; Digging Game and Word Search use their supplied recordings. Other source archives contained no usable gameplay recordings, so they were not represented with fabricated footage. Existing gameplay galleries and videos were preserved.

The montage uses short dissolves and a loop transition, with the full gameplay frame fitted over a blurred background. Portrait gameplay is retained without stretching. Output versions:

| Variant | Resolution | Approximate size |
| --- | --- | --- |
| Desktop | 1600 × 900 | 4.5 MB |
| Tablet | 960 × 960 | 2.6 MB |
| Mobile | 720 × 1280 | 2.4 MB |

The existing `experience.profileVideo` configuration still controls playback, loading, overlays, device selection and file paths. `config/profile-montage.json` documents editable shot choices and timing, but changing this recipe requires rendering a new video in an editor; it does not edit MP4s at runtime.

## Accuracy notes

- Ruin Runners contains reconciliation methods, but its call is commented out in the supplied revision. The new content labels this accurately rather than claiming active reconciliation.
- Digging Game performs exposed-face culling and chunk rebuilds. No greedy-meshing or measured performance claim was invented.
- The corrected Word Search source uses serialized structs and arrays for level tuning. The new notes describe this revision; your older technical notes remain below, including their earlier ScriptableObject description.
- The source review supports the descriptions and code selections. It does not certify the Unity games themselves as bug-free, and the games were not rebuilt or gameplay-tested in Unity for this website update.

## Verification and publishing

All excerpts were compared against the supplied files. Website configuration, exact-case asset paths, syntax, code ranges and arrow routing tests passed. Browser checks covered all project routes at desktop and phone widths, including unchanged pages without new source. The videos decoded fully, have no audio and include fast-start metadata.

Publish the contents of `gopinath-portfolio/` as before. No backend or build step is required. The delivered ZIP excludes the input archive's Git history; website files and existing media are preserved except for the six intended profile video/poster replacements.
