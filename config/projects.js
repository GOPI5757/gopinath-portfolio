// All project content and project-related appearance settings live here.
// Code text and connections remain in code-snippets.js and code-projects/.
// See PROJECT-CONFIG-GUIDE.md for the hierarchy and migration map.

// Shared navigation, home grid, detail appearance, collapse defaults and contact collage.
export const projectSettings = {
  "navigation": {
    "quickBar": {
      "enabled": true,
      "allowVisitorModeSwitch": true,
      "rememberVisitorMode": true,
      "modeSwitchLabel": "Project navigation",
      "barModeLabel": "Bar",
      "drawerModeLabel": "Drawer",
      "mode": "drawer",
      "initiallyCollapsed": false,
      "minimizeLabel": "Minimize",
      "restoreLabel": "Projects",
      "buttonLabel": "Browse projects",
      "mobileButtonLabel": "Projects",
      "closeLabel": "Close",
      "label": "Projects",
      "previousLabel": "Previous projects",
      "nextLabel": "Next projects",
      "hiddenProjects": {
        "enabled": true,
        "label": "{count} projects hidden to the right. Scroll to reveal more.",
        "singleLabel": "1 project hidden to the right. Scroll to reveal it.",
        "disableAtEnds": true
      }
    },
    "drawer": {
      "maxWidth": "860px",
      "maxHeight": "85svh",
      "desktopColumns": 3,
      "mobileColumns": 2,
      "mobileMaxWidth": 760,
      "thumbnailAspectRatio": "16 / 10"
    }
  },
  "home": {
    "welcomeFeatured": {
      "enabled": true,
      "title": "Featured games",
      "maxVisible": 3,
      "maxWidth": "22rem",
      "rowHeight": "3.2rem",
      "mobileRowHeight": "2.55rem",
      "compactRowHeight": "2.4rem",
      "imageFit": "cover",
      "items": [
        { "enabled": true, "projectId": "ren-path-of-destiny" },
        { "enabled": true, "projectId": "digging-game" },
        { "enabled": true, "projectId": "ruin-runners" }
      ]
    },
    "grid": {
      "mobileMaxWidth": 760,
      "mobileColumns": 2,
      "tabletMaxWidth": 1100,
      "tabletColumns": 3,
      "desktopColumns": 4,
      "gap": "1rem",
      "mobileGap": "0.65rem",
      "mobileTitleSize": "1.05rem",
      "mobileCardMinHeight": "13rem",
      "coverOpacity": 0.85,
      "visualCards": true,
      "showStatus": true,
      "statusBadge": {
        "enabled": true,
        "radius": "0.45rem",
        "inProgress": {"label": "In progress", "background": "#873c16", "textColor": "#fff4df"},
        "completed": {"label": "Completed", "background": "#155a40", "textColor": "#eafff3"},
        "other": {"background": "#24334d", "textColor": "#ffffff"}
      },
      "cardBorder": {"enabled": true, "color": "#62738d", "width": "1px"},
      "thumbnailRatio": "16 / 10",
      "showGraphConnectors": false,
      "showCategoryCode": false
    },
    "totalProjects": {
      "enabled": true,
      "label": "{count} projects",
      "singleLabel": "1 project"
    },
    "featured": {
      "enabled": true,
      "projectId": "ren-path-of-destiny",
      "label": "IN DEVELOPMENT",
      "labelColor": "#ff6670",
      "linkLabel": "View project",
      "fullWidth": true,
      "avoidContact": true,
      "showImage": true,
      "showEngine": true,
      "showLanguage": true,
      "showFormat": true,
      "imageFit": "contain",
      "imageWidth": "4.5rem",
      "accent": "var(--signal)",
      "title": "",
      "engine": "",
      "language": "",
      "format": "",
      "image": "",
      "description": ""
    }
  },
  "detail": {
    "sectionOrder": [
      "documents",
      "gameplay-videos",
      "code-snippets",
      "technical",
      "images",
      "engine-videos"
    ],
    "documents": {
      "compact": true,
      "label": "Documents & links",
      "sticky": true,
      "stickyMinWidth": 761,
      "stickyMinHeight": 650,
      "maxHeight": "7rem"
    },
    "facts": {
      "mobileColumns": 2,
      "tabletColumns": 3,
      "mobileMaxWidth": 760,
      "tabletMaxWidth": 1100
    },
    "videos": {
      "gameplay": {
        "expandSingleVideo": true,
        "desktopColumns": 4,
        "tabletColumns": 3,
        "mobileColumns": 2,
        "tabletMaxWidth": 1100,
        "mobileMaxWidth": 760,
        "gap": "0.75rem"
      },
      "engine": {
        "expandSingleVideo": true,
        "desktopColumns": 4,
        "tabletColumns": 3,
        "mobileColumns": 2,
        "tabletMaxWidth": 1100,
        "mobileMaxWidth": 760,
        "gap": "0.75rem"
      },
      "presentation": {
        "thumbnailSource": "youtube",
        "posterFit": "contain",
        "aspectRatio": "16 / 9",
        "background": "#070b16"
      }
    },
    "pageBackground": {
      "enabled": true,
      "opacity": 0.32,
      "height": "46rem",
      "mobileHeight": "32rem",
      "fit": "cover",
      "position": "center 35%",
      "mobilePosition": "center 35%",
      "sideFade": "12%",
      "topFade": "7%",
      "bottomFadeStart": "48%",
      "mobileMaxWidth": 760
    },
    "decorativeImages": {
      "enabled": false,
      "maxImages": 3
    },
    "descriptions": {
      "enabled": true,
      "background": "auto",
      "textColor": "auto",
      "opacity": 0.9,
      "padding": "0.7rem 1rem",
      "radius": "0.65rem",
      "borderOpacity": 0.22,
      "hero": {
        "enabled": true
      },
      "technical": {
        "enabled": true
      },
      "code": {
        "enabled": true
      }
    }
  },
  "collapse": {
    "enabled": true,
    "defaults": {
      "sections": {
        "enabled": true,
        "initiallyCollapsed": false
      },
      "codeBlocks": {
        "enabled": true,
        "initiallyCollapsed": true
      },
      "technicalBlocks": {
        "enabled": true,
        "initiallyCollapsed": false
      }
    }
  },
  "contactCollage": {
    "enabled": true,
    "minViewportWidth": 1100,
    "minCollageWidth": 250,
    "gap": "2rem",
    "height": "34rem",
    "columns": 3,
    "tileRatio": "16 / 10",
    "opacity": 0.38,
    "saturation": 0.75,
    "rotation": -5,
    "edgeFade": "12%",
    "projectOverrides": {}
  }
};

// Home-page Projects heading.
export const projectSectionWidgets = [
  {
    "id": "projects-section",
    "enabled": true,
    "eyebrow": "PROJECT GRAPH / 02",
    "title": "Projects",
    "description": "",
    "style": {
      "title": {
        "fontSize": "clamp(2rem, 4vw, 4rem)",
        "fontFamily": "Space Grotesk",
        "color": "var(--text)"
      }
    }
  }
];

// Project categories.
export const projectCategories = [
  {
    "id": "all-projects",
    "enabled": true,
    "title": "All Projects",
    "description": "Gopinath's Projects",
    "accent": "#f0e0b7"
  },
  {
    "id": "current",
    "enabled": true,
    "title": "Current Development",
    "description": "Projects still in progress.",
    "accent": "#8b9dff"
  },
  {
    "id": "systems",
    "enabled": true,
    "title": "Systems & Progression",
    "description": "Procedural logic, progression and puzzle systems.",
    "accent": "#5de0bd"
  },
  {
    "id": "multiplayer",
    "enabled": true,
    "title": "Multiplayer & Local Play",
    "description": "Online and local competitive experiences.",
    "accent": "#ffbb6c"
  },
  {
    "id": "game-jams",
    "enabled": true,
    "title": "Game Jam Projects",
    "description": "Rapid builds shaped by a shared theme.",
    "accent": "#f28ddd"
  }
];

// Each game's content, page background, section controls and technical blocks.
export const projectItems = [
  {
    "id": "ren-path-of-destiny",
    "enabled": true,
    "categoryIds": [
      "current",
      "all-projects"
    ],
    "title": "Ren: Path of Destiny",
    "nodeLabel": "REN",
    "status": "In progress",
    "engine": "Unreal Engine 5.8",
    "language": "C++",
    "platform": "3D",
    "shortDescription": "A fast-paced crowd-control beat 'em up with combat-driven environment puzzles.",
    "description": "A fast-paced beat 'em up centered on systemic crowd-control mechanics. The game bridges the gap between combat and exploration by utilizing combat abilities as environmental traversal tools, replacing standard attack inputs with interactive, state-driven challenges.",
    "coverImage": "assets/images/projects/ren-path-of-destiny/cover.webp",
    "backgroundImages": [
      "assets/images/projects/ren-path-of-destiny/gameplay/gameplay-01.webp",
      "assets/images/projects/ren-path-of-destiny/gameplay/gameplay-02.webp",
      "assets/images/projects/ren-path-of-destiny/gameplay/gameplay-03.webp",
      "assets/images/projects/ren-path-of-destiny/gameplay/gameplay-04.webp",
      "assets/images/projects/ren-path-of-destiny/technical/environment-puzzle-01.webp",
      "assets/images/projects/ren-path-of-destiny/technical/mocap-01.webp",
      "assets/images/projects/ren-path-of-destiny/technical/hungarian-algorithm-step-01.webp"
    ],
    "theme": {
      "background": [
        "#180e0e",
        "#0e180f",
        "#524949"
      ],
      "surface": "#110a0a",
      "text": "#fee8e8",
      "muted": "#cab4b4",
      "accent": "#db7878",
      "signal": "#f0c86e"
    },
    "facts": [
      {
        "id": "engine",
        "enabled": true,
        "label": "Engine",
        "value": "Unreal Engine 5.8"
      },
      {
        "id": "language",
        "enabled": true,
        "label": "Language",
        "value": "C++"
      },
      {
        "id": "format",
        "enabled": true,
        "label": "Format",
        "value": "3D"
      },
      {
        "id": "status",
        "enabled": true,
        "label": "Status",
        "value": "In progress"
      },
      {
        "id": "Genre",
        "enabled": true,
        "label": "Genre",
        "value": "Beat em' up"
      },
      {
        "id": "tp",
        "enabled": true,
        "label": "Target Platform",
        "value": "PC"
      },
      {
        "id": "Role",
        "enabled": true,
        "label": "ROLE",
        "value": "Game Programmer"
      }
    ],
    "technicalBlocks": [
      {
        "id": "ren-combat-puzzles",
        "enabled": true,
        "title": "Combat-led environment puzzles",
        "images": [
          "assets/images/projects/ren-path-of-destiny/technical/environment-puzzle-01.webp"
        ],
        "imageAlt": "",
        "description": "The project direction connects combat styles to environmental progression, using a small focus-and-strength interaction for obstacles instead of treating every obstacle as a single attack-button action.",
        "layout": "image-right",
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "ren-mocap",
        "enabled": true,
        "title": "Mocap-focused production direction",
        "images": [
          {
            "id": "ren-mocap-1",
            "enabled": true,
            "src": "assets/images/projects/ren-path-of-destiny/technical/mocap-01.webp",
            "alt": "Ren mocap production"
          },
          {
            "id": "ren-mocap-2",
            "enabled": true,
            "src": "assets/images/projects/ren-path-of-destiny/technical/mocap-02.webp",
            "alt": "Ren mocap production"
          }
        ],
        "description": "The project is being developed with UE 5.8 mocap as part of its current production direction.",
        "layout": "image-left",
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "ren-hungarian",
        "enabled": true,
        "title": "Hungarian Algorithm",
        "progressionImages": [
          {
            "src": "assets/images/projects/ren-path-of-destiny/technical/hungarian-algorithm-step-01.webp",
            "alt": "Initial stage"
          },
          {
            "src": "assets/images/projects/ren-path-of-destiny/technical/hungarian-algorithm-step-02.webp",
            "alt": "Second stage"
          },
          {
            "src": "assets/images/projects/ren-path-of-destiny/technical/hungarian-algorithm-step-03.webp",
            "alt": "Final stage"
          }
        ],
        "description": "Built a group-coordination system using the Hungarian \n          algorithm to solve the assignment problem between active enemies and available tactical locations. \n          This optimization guarantees the shortest possible combined travel distance for the swarm, \n          replacing sub-optimal \"greedy\" pathfinding with deterministic, coordinated unit tactics.",
        "layout": "image-right",
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      }
    ],
    "images": [
      {
        "id": "ren-gi-01",
        "enabled": true,
        "src": "assets/images/projects/ren-path-of-destiny/gameplay/gameplay-01.webp",
        "alt": "Gameplay screenshot",
        "caption": "Non-Combat View"
      },
      {
        "id": "ren-gi-02",
        "enabled": true,
        "src": "assets/images/projects/ren-path-of-destiny/gameplay/gameplay-02.webp",
        "alt": "Gameplay screenshot",
        "caption": "Combat View"
      },
      {
        "id": "ren-gi-03",
        "enabled": true,
        "src": "assets/images/projects/ren-path-of-destiny/gameplay/gameplay-03.webp",
        "alt": "Gameplay screenshot",
        "caption": "Finisher View - I"
      },
      {
        "id": "ren-gi-04",
        "enabled": true,
        "src": "assets/images/projects/ren-path-of-destiny/gameplay/gameplay-04.webp",
        "alt": "Gameplay screenshot",
        "caption": "Finisher View - II"
      }
    ],
    "gameplayVideos": [
      {
        "id": "ren-gameplay-01",
        "enabled": true,
        "youtube": "https://youtu.be/4wY3zX4B1Zg",
        "title": "Ren: Path of Destiny Gameplay"
      }
    ],
    "engineWorkVideos": [
      {
        "id": "ren-ew-01",
        "enabled": true,
        "youtube": "https://youtu.be/QyXb43AwSq8",
        "title": "Engine work Video 001",
        "section": [
          "Combat Rings & Slots"
        ]
      },
      {
        "id": "ren-ew-02",
        "enabled": true,
        "youtube": "https://youtu.be/k1mQgSQ-klQ",
        "title": "Engine work Video 002",
        "section": [
          "Combat Rings & Slots"
        ]
      },
      {
        "id": "ren-ew-03",
        "enabled": true,
        "youtube": "https://youtu.be/NNZstGU-1Po",
        "title": "Engine work Video 003",
        "section": [
          "Combat Rings & Slots"
        ]
      },
      {
        "id": "ren-ew-04",
        "enabled": true,
        "youtube": "https://youtu.be/Mjdh4Gls-MY",
        "title": "Engine work Video 004",
        "section": [
          "Combat Rings & Slots"
        ]
      },
      {
        "id": "ren-ew-05",
        "enabled": true,
        "youtube": "https://youtu.be/CxHe3NrmUnY",
        "title": "Engine work Video 005",
        "section": [
          "Enemy AI",
          "Player Combat"
        ]
      },
      {
        "id": "ren-ew-06",
        "enabled": true,
        "youtube": "https://youtu.be/FbNhW7YUZ1c",
        "title": "Engine work Video 006",
        "section": [
          "Enemy Detection"
        ]
      },
      {
        "id": "ren-ew-07",
        "enabled": true,
        "youtube": "https://youtu.be/s0MjbsNwZg4",
        "title": "Engine work Video 007",
        "section": [
          "Enemy Detection"
        ]
      },
      {
        "id": "ren-ew-08",
        "enabled": true,
        "youtube": "https://youtu.be/rdTxzRZD-rA",
        "title": "Engine work Video 008",
        "section": [
          "Enemy AI",
          "Combat Rings & Slots"
        ]
      },
      {
        "id": "ren-ew-09",
        "enabled": true,
        "youtube": "https://youtu.be/yOb-ThfCnWM",
        "title": "Engine work Video 009",
        "section": [
          "Enemy AI"
        ]
      },
      {
        "id": "ren-ew-10",
        "enabled": true,
        "youtube": "https://youtu.be/F3siB5rxSUU",
        "title": "Engine work Video 010",
        "section": [
          "Enemy AI"
        ]
      },
      {
        "id": "ren-ew-11",
        "enabled": true,
        "youtube": "https://youtu.be/NwrY-bt1SMk",
        "title": "Engine work Video 011",
        "section": [
          "Enemy AI",
          "Combat Rings & Slots"
        ]
      },
      {
        "id": "ren-ew-12",
        "enabled": true,
        "youtube": "https://youtu.be/heypAKcaKNY",
        "title": "Engine work Video 012",
        "section": [
          "Enemy AI",
          "Combat Rings & Slots"
        ]
      },
      {
        "id": "ren-ew-13",
        "enabled": true,
        "youtube": "https://youtu.be/TvxKmhTEsas",
        "title": "Engine work Video 013",
        "section": [
          "Combat Rings & Slots"
        ]
      },
      {
        "id": "ren-ew-14",
        "enabled": true,
        "youtube": "https://youtu.be/05apNyIEjp8",
        "title": "Engine work Video 014",
        "section": [
          "Combat Rings & Slots"
        ]
      }
    ],
    "documentSections": [
      {
        "id": "ren-documents",
        "enabled": true,
        "title": "Documents",
        "groups": [
          {
            "id": "ren-gvd",
            "enabled": true,
            "title": "Game Vision Document",
            "documents": [
              {
                "id": "ren-gdd",
                "enabled": true,
                "label": "View GVD",
                "href": "assets/documents/ren/GAME VISION DOCUMENT.pdf",
                "type": "PDF"
              }
            ]
          },
          {
            "id": "ren-rvj",
            "enabled": true,
            "title": "Programmer's RVJ (Revised Visual Journal)",
            "documents": [
              {
                "id": "ren-rvj-doc",
                "enabled": true,
                "label": "View RVJ",
                "href": "assets/documents/ren/Programmer_RVJ.pdf",
                "type": "PDF"
              }
            ]
          }
        ]
      },
      {
        "id": "ren-links",
        "enabled": true,
        "title": "Links",
        "groups": [
          {
            "id": "ren-miro-group",
            "enabled": true,
            "title": "Programmer Miro Board",
            "documents": [
              {
                "id": "ren-miro",
                "enabled": true,
                "label": "Miro Board",
                "href": "https://miro.com/app/board/uXjVHuAc9Vk=/?share_link_id=124472935259/",
                "type": "MIRO"
              }
            ]
          }
        ]
      }
    ],
    "pageBackground": {
      "enabled": true,
      "src": "assets/images/project-page-backgrounds/ren-path-of-destiny.webp",
      "position": "center 35%",
      "mobilePosition": "center 35%",
      "versions": [
        {
          "src": "assets/images/project-page-backgrounds/responsive/ren-path-of-destiny-320w.webp",
          "width": 320
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/ren-path-of-destiny-640w.webp",
          "width": 640
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/ren-path-of-destiny-1280w.webp",
          "width": 1280
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/ren-path-of-destiny-1600w.webp",
          "width": 1600
        }
      ]
    },
    "descriptionStyle": {
      "enabled": true
    },
    "collapseEnabled": true,
    "sections": {
      "code": {
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        },
        "blocks": {}
      },
      "technical": {
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      }
    }
  },
  {
    "id": "digging-game",
    "enabled": true,
    "categoryIds": [
      "current",
      "systems",
      "all-projects"
    ],
    "title": "Digging Game",
    "nodeLabel": "DIG",
    "status": "In progress",
    "engine": "Unity",
    "language": "C#",
    "platform": "3D",
    "shortDescription": "A rebuilding and resource-progression game with a chunk-based sand area.",
    "description": "The player rebuilds a broken house by completing quests, earning coins, opening areas, gathering materials and crafting resources. A large sand area uses Minecraft-like blocks presented through a chunk system.",
    "coverImage": "assets/images/projects/digging-game/cover.webp",
    "backgroundImages": [
      "assets/images/projects/digging-game/gameplay/gameplay-01.webp",
      "assets/images/projects/digging-game/gameplay/gameplay-02.webp",
      "assets/images/projects/digging-game/technical/engine-view.webp",
      "assets/images/projects/digging-game/gameplay/tools-shop.webp",
      "assets/images/projects/digging-game/gameplay/backpack-shop.webp",
      "assets/images/projects/digging-game/gameplay/storage.webp",
      "assets/images/projects/digging-game/gameplay/quests.webp"
    ],
    "theme": {
      "background": [
        "#1b1a10",
        "#101a1b",
        "#4b4b46"
      ],
      "surface": "#2b2b17",
      "text": "#fcf9ca",
      "muted": "#ede8de",
      "accent": "#dbc278",
      "signal": "#f0c86e"
    },
    "facts": [
      {
        "id": "engine",
        "enabled": true,
        "label": "Engine",
        "value": "Unity"
      },
      {
        "id": "language",
        "enabled": true,
        "label": "Language",
        "value": "C#"
      },
      {
        "id": "format",
        "enabled": true,
        "label": "Format",
        "value": "3D"
      },
      {
        "id": "status",
        "enabled": true,
        "label": "Status",
        "value": "In progress"
      },
      {
        "id": "Genre",
        "enabled": true,
        "label": "Genre",
        "value": "Casual, Resource Management, Simulation"
      },
      {
        "id": "tp",
        "enabled": true,
        "label": "Target Platform",
        "value": "PC"
      },
      {
        "id": "Role",
        "enabled": true,
        "label": "ROLE",
        "value": "Solo Developer (Programming, Art and Design)"
      }
    ],
    "technicalBlocks": [
      {
        "id": "source-dig-surface-mesh",
        "enabled": true,
        "title": "Digging updates an exposed-face mesh",
        "description": "Implemented chunk-local face culling: each sand cell checks six neighbours and only exposed faces contribute vertices and triangle indices. A depleted cell becomes air and triggers a mesh and collider rebuild. The supplied version rebuilds the affected chunk; it does not use greedy meshing or claim measured frame-rate gains.",
        "layout": "image-right",
        "images": [
          {
            "id": "source-mining-hit",
            "enabled": true,
            "src": "assets/images/projects/digging-game/gameplay/mining-hit.webp",
            "alt": "Mining a sand cell with the current tool",
            "caption": "Mining a sand cell with the current tool"
          }
        ],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "source-dig-quest-events",
        "enabled": true,
        "title": "Mining progress flows through typed events",
        "description": "A generic event channel lets digging report quest progress without owning the quest UI.",
        "layout": "image-right",
        "images": [],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "source-dig-depth-activation",
        "enabled": true,
        "title": "Depth-based chunk activation",
        "description": "A depth-change event controls which chunk objects and their chests stay active around the player.",
        "layout": "image-right",
        "images": [],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "source-dig-machine-queue",
        "enabled": true,
        "title": "Timed processing queues and claim callbacks",
        "description": "The mortar machine tracks each processing job independently, then hands a claim callback to its UI slot.",
        "layout": "image-right",
        "images": [
          {
            "id": "source-mortar-processing",
            "enabled": true,
            "src": "assets/images/projects/digging-game/gameplay/mortar-processing.webp",
            "alt": "Mortar processing interface and inventory",
            "caption": "Mortar processing interface and inventory"
          }
        ],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "source-dig-treasure-timing",
        "enabled": true,
        "title": "A timing challenge unlocks treasure",
        "description": "Implemented a chest timing challenge with an oscillating UI pointer, a randomized safe zone and event-driven key progression. Success dispatches MG_GamePassedEvent to coordinate the chest and its UI; tuning remains in the project’s serialized values.",
        "layout": "image-right",
        "images": [
          {
            "id": "source-rare-chest",
            "enabled": true,
            "src": "assets/images/projects/digging-game/gameplay/rare-chest.webp",
            "alt": "A rare chest exposed inside the digging area",
            "caption": "A rare chest exposed inside the digging area"
          }
        ],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "digging-chunk-system",
        "enabled": true,
        "title": "Chunk-based block representation",
        "images": [
          {
            "id": "dg-chunk-1",
            "enabled": true,
            "src": "assets/images/projects/digging-game/technical/chunk-system-animation.webp",
            "alt": "Chunk System"
          }
        ],
        "imageAlt": "",
        "description": "Instead of making every sand block its own object, blocks inside a chunk are represented as one object. This was programmed to reduce CPU cost while retaining a large block-based digging area.",
        "layout": "image-right",
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "digging-chunk-system",
        "enabled": true,
        "title": "Chunk-Based Chest Spawning System",
        "progressionImages": [
          {
            "src": "assets/images/projects/digging-game/technical/chest-scriptable-object-animation.webp",
            "alt": "Initial stage"
          },
          {
            "src": "assets/images/projects/digging-game/technical/chest-scriptable-object.webp",
            "alt": "Initial stage"
          },
          {
            "src": "assets/images/projects/digging-game/technical/chest-open.webp",
            "alt": "Initial stage"
          }
        ],
        "images": [
          {
            "id": "dg-chunk-2",
            "enabled": true,
            "src": "assets/images/projects/digging-game/technical/chest-scriptable-object-animation.webp",
            "alt": "Chunk System"
          },
          {
            "id": "dg-chunk-2",
            "enabled": true,
            "src": "assets/images/projects/digging-game/technical/chest-scriptable-object.webp",
            "alt": "Chunk System"
          }
        ],
        "imageAlt": "",
        "description": "I designed a chunk-based chest spawning system for the sand area, using Unity Scriptable Objects to efficiently manage chest\n          distribution. The system allows designers to configure the number of chests spawned per chunk along with \n          their rarity and corresponding chest counts, making it easy to fine-tune chest distribution and rarity without modifying the core gameplay logic.",
        "layout": "image-left",
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      }
    ],
    "documentGroups": [
      {
        "id": "digging-design-docs",
        "enabled": true,
        "title": "Game Design Documents",
        "documents": [
          {
            "id": "digging-gdd",
            "enabled": true,
            "label": "View GDD",
            "href": "assets/documents/dg/Untitled_DG_GDD.pdf",
            "type": "PDF"
          }
        ]
      }
    ],
    "images": [
      {
        "id": "source-mining-hit",
        "enabled": true,
        "src": "assets/images/projects/digging-game/gameplay/mining-hit.webp",
        "alt": "Mining a sand cell with the current tool",
        "caption": "Mining a sand cell with the current tool"
      },
      {
        "id": "source-rare-chest",
        "enabled": true,
        "src": "assets/images/projects/digging-game/gameplay/rare-chest.webp",
        "alt": "A rare chest exposed inside the digging area",
        "caption": "A rare chest exposed inside the digging area"
      },
      {
        "id": "source-mortar-processing",
        "enabled": true,
        "src": "assets/images/projects/digging-game/gameplay/mortar-processing.webp",
        "alt": "Mortar processing interface and inventory",
        "caption": "Mortar processing interface and inventory"
      },
      {
        "id": "dg-gi-01",
        "enabled": true,
        "src": "assets/images/projects/digging-game/gameplay/gameplay-01.webp",
        "alt": "Gameplay screenshot",
        "caption": "Gameplay View"
      },
      {
        "id": "dg-gi-02",
        "enabled": true,
        "src": "assets/images/projects/digging-game/gameplay/gameplay-02.webp",
        "alt": "Gameplay screenshot",
        "caption": "Gameplay View"
      },
      {
        "id": "rdgen-gi-03",
        "enabled": true,
        "src": "assets/images/projects/digging-game/technical/engine-view.webp",
        "alt": "Gameplay screenshot",
        "caption": "Engine View"
      },
      {
        "id": "dg-gi-04",
        "enabled": true,
        "src": "assets/images/projects/digging-game/gameplay/tools-shop.webp",
        "alt": "Gameplay screenshot",
        "caption": "Tools shop view"
      },
      {
        "id": "dg-gi-05",
        "enabled": true,
        "src": "assets/images/projects/digging-game/gameplay/backpack-shop.webp",
        "alt": "Gameplay screenshot",
        "caption": "Backpack shop view"
      },
      {
        "id": "dg-gi-06",
        "enabled": true,
        "src": "assets/images/projects/digging-game/gameplay/storage.webp",
        "alt": "Gameplay screenshot",
        "caption": "Storage view"
      },
      {
        "id": "dg-gi-07",
        "enabled": true,
        "src": "assets/images/projects/digging-game/gameplay/quests.webp",
        "alt": "Gameplay screenshot",
        "caption": "Quests view"
      }
    ],
    "gameplayVideos": [
      {
        "id": "dg-gameplay-01",
        "enabled": true,
        "youtube": "https://youtu.be/BvFgmtQqz14",
        "title": "Digging Game Gameplay"
      }
    ],
    "engineWorkVideos": [],
    "pageBackground": {
      "enabled": true,
      "src": "assets/images/project-page-backgrounds/digging-game.webp",
      "position": "center 35%",
      "mobilePosition": "center 35%",
      "versions": [
        {
          "src": "assets/images/project-page-backgrounds/responsive/digging-game-320w.webp",
          "width": 320
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/digging-game-640w.webp",
          "width": 640
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/digging-game-1280w.webp",
          "width": 1280
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/digging-game-1600w.webp",
          "width": 1600
        }
      ]
    },
    "descriptionStyle": {
      "enabled": true
    },
    "collapseEnabled": true,
    "sections": {
      "code": {
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        },
        "blocks": {
          "dig-surface-mesh": {
            "title": "Digging updates an exposed-face mesh",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          },
          "dig-quest-events": {
            "title": "Mining progress flows through typed events",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          },
          "dig-depth-activation": {
            "title": "Depth-based chunk activation",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          },
          "dig-machine-queue": {
            "title": "Timed processing queues and claim callbacks",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          },
          "dig-treasure-timing": {
            "title": "A timing challenge unlocks treasure",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          }
        }
      },
      "technical": {
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      }
    }
  },
  {
    "id": "ruin-runners",
    "enabled": true,
    "categoryIds": [
      "multiplayer",
      "all-projects"
    ],
    "title": "Ruin Runners",
    "nodeLabel": "RUIN",
    "status": "Completed",
    "engine": "Unity",
    "language": "C#",
    "platform": "2D",
    "shortDescription": "A two-player online multiplayer game across 10 increasingly difficult levels.",
    "description": "Two players attempt a sequence of 10 levels with increasing difficulty. The project focuses on online multiplayer, synchronizing movements and managing packets in real time.",
    "coverImage": "assets/images/projects/ruin-runners/cover.webp",
    "theme": {
      "background": "#1a1510",
      "surface": "#35281c",
      "text": "#fff8ed",
      "muted": "#dec9a9",
      "accent": "#ffb36f",
      "signal": "#8ee2bb"
    },
    "facts": [
      {
        "id": "engine",
        "enabled": true,
        "label": "Engine",
        "value": "Unity"
      },
      {
        "id": "language",
        "enabled": true,
        "label": "Language",
        "value": "C#"
      },
      {
        "id": "format",
        "enabled": true,
        "label": "Format",
        "value": "2D online multiplayer"
      },
      {
        "id": "status",
        "enabled": true,
        "label": "Status",
        "value": "Finished"
      },
      {
        "id": "Genre",
        "enabled": true,
        "label": "Genre",
        "value": "Online multiplayer platformer"
      },
      {
        "id": "tp",
        "enabled": true,
        "label": "Target Platform",
        "value": "PC"
      },
      {
        "id": "Role",
        "enabled": true,
        "label": "ROLE",
        "value": "Solo Developer (Programming, Art and Design)"
      }
    ],
    "technicalBlocks": [
      {
        "id": "source-rr-network-ticks",
        "enabled": true,
        "title": "Tick-based input and state exchange",
        "description": "Built a tick-driven network movement experiment with serialized input/state payloads, circular history buffers, client-side movement and server input processing. The source also contains rewind/replay reconciliation methods, but their call is disabled in this revision; active reconciliation or production latency guarantees are not claimed.",
        "layout": "image-right",
        "images": [],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "source-rr-relay-session",
        "enabled": true,
        "title": "Relay rooms and join codes",
        "description": "Implemented host creation and join-code entry with Unity Authentication, Relay allocations and UnityTransport configuration. The lobby exposes player count and enables the host’s start control once two players are present.",
        "layout": "image-right",
        "images": [],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "source-rr-network-hazards",
        "enabled": true,
        "title": "Server-timed hazards with replicated visuals",
        "description": "A networked spike alternates states on the server while clients react to replicated values.",
        "layout": "image-right",
        "images": [],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "ruin-sync",
        "enabled": true,
        "title": "Real-time player synchronization",
        "image": "",
        "imageAlt": "",
        "description": "The project focus was synchronizing player movement and managing packets in real time for the two-player online experience.",
        "layout": "image-left",
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      }
    ],
    "images": [],
    "gameplayVideos": [
      {
        "id": "rr-gameplay-01",
        "enabled": true,
        "youtube": "https://youtu.be/sZXb1ajNQcU",
        "title": "Ruin Runners Gameplay"
      }
    ],
    "engineWorkVideos": [],
    "documentGroups": [],
    "pageBackground": {
      "enabled": true,
      "src": "assets/images/project-page-backgrounds/ruin-runners.webp",
      "position": "center 35%",
      "mobilePosition": "center 35%",
      "versions": [
        {
          "src": "assets/images/project-page-backgrounds/responsive/ruin-runners-320w.webp",
          "width": 320
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/ruin-runners-640w.webp",
          "width": 640
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/ruin-runners-1048w.webp",
          "width": 1048
        }
      ]
    },
    "descriptionStyle": {
      "enabled": true
    },
    "collapseEnabled": true,
    "sections": {
      "code": {
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        },
        "blocks": {
          "rr-network-ticks": {
            "title": "Tick-based input and state exchange",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          },
          "rr-relay-session": {
            "title": "Relay rooms and join codes",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          },
          "rr-network-hazards": {
            "title": "Server-timed hazards with replicated visuals",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          }
        }
      },
      "technical": {
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      }
    }
  },
  {
    "id": "word-search",
    "enabled": true,
    "categoryIds": [
      "systems",
      "all-projects"
    ],
    "title": "Word Search",
    "nodeLabel": "WORD",
    "status": "Completed",
    "engine": "Unity",
    "language": "C#",
    "platform": "2D",
    "shortDescription": "A word-search recreation built around randomized grids and staged difficulty.",
    "description": "Word Search is a dynamic recreation of the classic hidden-word puzzle, built around procedural grid generation\n       and escalating difficulty. The game starts with a 5×5 grid and increases in size every five levels, \n       capping at level 30. To ensure high replayability, both the target words and grid letters are randomized on \n       each restart. Additionally, each five-level tier features a strict time limit, which is exposed to the \n       Engine Inspector via Scriptable Objects for rapid playtesting and balancing.",
    "coverImage": "assets/images/projects/word-search/cover.webp",
    "theme": {
      "background": [
        "#271e10",
        "#102713",
        "#102027",
        "#c9c390",
        "#abc0c1"
      ],
      "surface": "#4b2f12",
      "text": "#f6e4cd",
      "muted": "#eee7d4",
      "accent": "#ffcb77",
      "signal": "#f4bd6a"
    },
    "facts": [
      {
        "id": "engine",
        "enabled": true,
        "label": "Engine",
        "value": "Unity"
      },
      {
        "id": "language",
        "enabled": true,
        "label": "Language",
        "value": "C#"
      },
      {
        "id": "format",
        "enabled": true,
        "label": "Format",
        "value": "2D"
      },
      {
        "id": "status",
        "enabled": true,
        "label": "Status",
        "value": "Completed"
      },
      {
        "id": "Genre",
        "enabled": true,
        "label": "Genre",
        "value": "Word Puzzle"
      },
      {
        "id": "tp",
        "enabled": true,
        "label": "Target Platform",
        "value": "Mobile"
      },
      {
        "id": "Role",
        "enabled": true,
        "label": "ROLE",
        "value": "Game Programmer"
      }
    ],
    "technicalBlocks": [
      {
        "id": "source-ws-placement",
        "enabled": true,
        "title": "Directional word placement with bounds checks",
        "description": "Implemented randomized horizontal, vertical and diagonal word placement with direction-specific boundary tests and empty-cell checks. Placement orientation is rotated between attempts, and remaining grid positions receive random filler letters. Word selection filters by length and avoids duplicate target words. The supplied generator rejects occupied cells rather than overlapping matching letters.",
        "layout": "image-right",
        "images": [],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "source-ws-selection",
        "enabled": true,
        "title": "Straight-line selection and reverse-word matching",
        "description": "Built drag selection with backtracking, a direction-locked continuation after the first two cells, and forward/reverse word matching. Completed targets are tracked to prevent repeat matches; invalid selections remove their selection bar.",
        "layout": "image-right",
        "images": [],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "source-ws-levels",
        "enabled": true,
        "title": "Inspector-configured level tiers and time limits",
        "description": "In the supplied Word Search revision, serializable level_data arrays define the maximum level, grid size and five time budgets per tier. The timer formats minutes/seconds and triggers the loss state on expiry; matching all target words triggers the win presentation. This documents the supplied implementation while retaining the earlier technical notes below.",
        "layout": "image-right",
        "images": [],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "word-random-grid",
        "enabled": true,
        "title": "Randomized levels and progression",
        "image": "",
        "progressionImages": [
          {
            "src": "assets/images/projects/word-search/technical/levels-01-05.webp",
            "alt": "Initial stage"
          },
          {
            "src": "assets/images/projects/word-search/technical/levels-06-10.webp",
            "alt": "Initial stage"
          },
          {
            "src": "assets/images/projects/word-search/technical/levels-11-15.webp",
            "alt": "Initial stage"
          },
          {
            "src": "assets/images/projects/word-search/technical/levels-16-20.webp",
            "alt": "Initial stage"
          },
          {
            "src": "assets/images/projects/word-search/technical/levels-21-25.webp",
            "alt": "Initial stage"
          },
          {
            "src": "assets/images/projects/word-search/technical/levels-26-30.webp",
            "alt": "Initial stage"
          }
        ],
        "imageAlt": "",
        "description": "Grid size, words and letters are randomized for replay attempts. Difficulty grows in five-level sets by increasing the grid and word count.",
        "layout": "image-right",
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "word-scriptable-time",
        "enabled": true,
        "title": "Data-Driven Difficulty Scaling",
        "images": [
          {
            "id": "ws-inspector-1",
            "enabled": true,
            "src": "assets/images/projects/word-search/technical/inspector-animation.webp",
            "alt": "ws inspector values"
          }
        ],
        "imageAlt": "",
        "description": "Architected a data-driven difficulty system using Scriptable Objects to manage time limits and word counts for each five-level tier. \n        Decoupling these parameters from the core logic allows for rapid, code-free balancing and iteration directly within the Unity Inspector.",
        "layout": "image-left",
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      }
    ],
    "images": [
      {
        "id": "ws-gi-01",
        "enabled": true,
        "src": "assets/images/projects/word-search/gameplay/gameplay.webp",
        "alt": "Gameplay screenshot",
        "caption": "Game View"
      },
      {
        "id": "ws-gi-02",
        "enabled": true,
        "src": "assets/images/projects/word-search/gameplay/win-state.webp",
        "alt": "Gameplay screenshot",
        "caption": "Win condition"
      },
      {
        "id": "ws-gi-03",
        "enabled": true,
        "src": "assets/images/projects/word-search/gameplay/lose-state.webp",
        "alt": "Gameplay screenshot",
        "caption": "Lose condition"
      }
    ],
    "gameplayVideos": [
      {
        "id": "ws-gameplay-01",
        "enabled": true,
        "youtube": "https://youtu.be/i4H2fltSuXA",
        "title": "Word Search Gameplay (Level 1-5)"
      },
      {
        "id": "ws-gameplay-02",
        "enabled": true,
        "youtube": "https://youtu.be/S-35Gd8rmRE",
        "title": "Word Search Gameplay (Level 6-10)"
      },
      {
        "id": "ws-gameplay-03",
        "enabled": true,
        "youtube": "https://youtu.be/Hj8Y2CDEVfQ",
        "title": "Word Search Gameplay (Level 11-15)"
      },
      {
        "id": "ws-gameplay-04",
        "enabled": true,
        "youtube": "https://youtu.be/iogl2iNBn7A",
        "title": "Word Search Gameplay (Level 16-20)"
      },
      {
        "id": "ws-gameplay-05",
        "enabled": true,
        "youtube": "https://youtu.be/U1e9I7c9djQ",
        "title": "Word Search Gameplay (Level 21-25)"
      },
      {
        "id": "ws-gameplay-06",
        "enabled": true,
        "youtube": "https://youtu.be/8Dyy5h6uVkc",
        "title": "Word Search Gameplay (Level 26-30)"
      }
    ],
    "documentSections": [
      {
        "id": "ws-links",
        "enabled": true,
        "title": "Links",
        "groups": [
          {
            "id": "ws-itch-link",
            "enabled": true,
            "title": "Word Search Game Link",
            "documents": [
              {
                "id": "ws-itch",
                "enabled": true,
                "label": "Play Game",
                "href": "https://gopi5757.itch.io/word-search",
                "type": "itch.io"
              }
            ]
          }
        ]
      }
    ],
    "pageBackground": {
      "enabled": true,
      "src": "assets/images/project-page-backgrounds/ren-path-of-destiny.webp",
      "position": "center 35%",
      "mobilePosition": "center 35%",
      "versions": [
        {
          "src": "assets/images/project-page-backgrounds/responsive/word-search-320w.webp",
          "width": 320
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/word-search-610w.webp",
          "width": 610
        },
      ]
    },
    "descriptionStyle": {
      "enabled": true
    },
    "collapseEnabled": true,
    "sections": {
      "code": {
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        },
        "blocks": {
          "ws-placement": {
            "title": "Directional word placement with bounds checks",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          },
          "ws-selection": {
            "title": "Straight-line selection and reverse-word matching",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          },
          "ws-levels": {
            "title": "Inspector-configured level tiers and time limits",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          }
        }
      },
      "technical": {
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      }
    }
  },
  {
    "id": "tower-of-hanoi",
    "enabled": true,
    "categoryIds": [
      "systems",
      "all-projects"
    ],
    "title": "Tower of Hanoi",
    "nodeLabel": "HANOI",
    "status": "Completed",
    "engine": "Unity",
    "language": "C#",
    "platform": "2D",
    "shortDescription": "A recreation of the Tower of Hanoi puzzle with shuffled starting order.",
    "description": "A simple Tower of Hanoi recreation where a shuffled puzzle is presented for the player to solve.",
    "coverImage": "assets/images/projects/tower-of-hanoi/cover.webp",
    "theme": {
      "background": [
        "#393730",
        "#4e3224",
        "#250000",
        "#001e08",
        "#20001a"
      ],
      "backgroundAngle": "180deg",
      "surface": "#383322",
      "text": "#e7d6e2",
      "muted": "#b4a6b0",
      "accent": "#e8dfe5",
      "signal": "#d0ccbc"
    },
    "facts": [
      {
        "id": "engine",
        "enabled": true,
        "label": "Engine",
        "value": "Unity"
      },
      {
        "id": "language",
        "enabled": true,
        "label": "Language",
        "value": "C#"
      },
      {
        "id": "format",
        "enabled": true,
        "label": "Format",
        "value": "2D"
      },
      {
        "id": "status",
        "enabled": true,
        "label": "Status",
        "value": "Completed"
      },
      {
        "id": "Genre",
        "enabled": true,
        "label": "Genre",
        "value": "Puzzle / Logic"
      },
      {
        "id": "tp",
        "enabled": true,
        "label": "Target Platform",
        "value": "PC / Mobile"
      },
      {
        "id": "Role",
        "enabled": true,
        "label": "ROLE",
        "value": "Game Programmer"
      }
    ],
    "technicalBlocks": [
      {
        "id": "source-hanoi-valid-moves",
        "enabled": true,
        "title": "Validate disc placement before counting a move",
        "description": "The drop handler checks the destination stack and restores invalid placements.",
        "layout": "image-right",
        "images": [],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "source-hanoi-scramble",
        "enabled": true,
        "title": "Generate puzzles with legal disc moves",
        "description": "Created randomized starting layouts by applying legal disc transfers to an initialized stack. Each transfer updates transform-derived tower lists, while the interactive drop handler enforces the same smaller-on-larger rule. This provides reversible puzzle states without claiming an optimal solver or a measured difficulty score.",
        "layout": "image-right",
        "images": [],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      }
    ],
    "gameplayVideos": [
      {
        "id": "toh-gameplay-01",
        "enabled": true,
        "youtube": "https://youtu.be/-KfnGO4pEb8",
        "title": "Tower of Hanoi Gameplay"
      }
    ],
    "images": [
      {
        "id": "toh-gi-01",
        "enabled": true,
        "src": "assets/images/projects/tower-of-hanoi/gameplay/gameplay.webp",
        "alt": "Gameplay screenshot",
        "caption": "Gameplay view"
      },
      {
        "id": "toh-gi-02",
        "enabled": true,
        "src": "assets/images/projects/tower-of-hanoi/gameplay/win-condition.webp",
        "alt": "Gameplay screenshot",
        "caption": "Win condition"
      },
      {
        "id": "toh-gi-03",
        "enabled": true,
        "src": "assets/images/projects/tower-of-hanoi/gameplay/lose-condition.webp",
        "alt": "Gameplay screenshot",
        "caption": "Lose condition"
      }
    ],
    "documentSections": [
      {
        "id": "toh-links",
        "enabled": true,
        "title": "Links",
        "groups": [
          {
            "id": "toh-itch-link",
            "enabled": true,
            "title": "Tower of Hanoi Game Link",
            "documents": [
              {
                "id": "ws-itch",
                "enabled": true,
                "label": "Play Game",
                "href": "https://gopi5757.itch.io/tower-of-hanoi",
                "type": "itch.io"
              }
            ]
          }
        ]
      }
    ],
    "pageBackground": {
      "enabled": true,
      "src": "assets/images/project-page-backgrounds/ren-path-of-destiny.webp",
      "position": "center 35%",
      "mobilePosition": "center 35%",
      "versions": [
        {
          "src": "assets/images/project-page-backgrounds/responsive/tower-of-hanoi-320w.webp",
          "width": 320
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/tower-of-hanoi-640w.webp",
          "width": 640
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/tower-of-hanoi-1280w.webp",
          "width": 1280
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/tower-of-hanoi-1600w.webp",
          "width": 1600
        }
      ]
    },
    "descriptionStyle": {
      "enabled": true
    },
    "collapseEnabled": true,
    "sections": {
      "code": {
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        },
        "blocks": {
          "hanoi-valid-moves": {
            "title": "Validate disc placement before counting a move",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          },
          "hanoi-scramble": {
            "title": "Generate puzzles with legal disc moves",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          }
        }
      },
      "technical": {
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      }
    }
  },
  {
    "id": "ball-bashers",
    "enabled": true,
    "categoryIds": [
      "multiplayer",
      "all-projects"
    ],
    "title": "Ball Bashers",
    "nodeLabel": "BASH",
    "status": "Completed",
    "engine": "Unity",
    "language": "C#",
    "platform": "3D",
    "shortDescription": "A local two-player basketball-inspired game built for quick play.",
    "description": "A simple local two-player game inspired by basketball. Players use separate shift keys to hit rotating balls, with the player who hits the most winning the round.",
    "coverImage": "assets/images/projects/ball-bashers/cover.webp",
    "theme": {
      "background": [
        "#121e1d",
        "#1e1b12",
        "#12191e",
        "#121e15"
      ],
      "surface": "#392417",
      "text": "#fff6ef",
      "muted": "#e1c1aa",
      "accent": "#ff9d58",
      "signal": "#ffd36b"
    },
    "facts": [
      {
        "id": "engine",
        "enabled": true,
        "label": "Engine",
        "value": "Unity"
      },
      {
        "id": "language",
        "enabled": true,
        "label": "Language",
        "value": "C#"
      },
      {
        "id": "format",
        "enabled": true,
        "label": "Format",
        "value": "3D local multiplayer"
      },
      {
        "id": "status",
        "enabled": true,
        "label": "Status",
        "value": "Completed"
      },
      {
        "id": "Genre",
        "enabled": true,
        "label": "Genre",
        "value": "Casual, Co-op"
      },
      {
        "id": "tp",
        "enabled": true,
        "label": "Target Platform",
        "value": "PC"
      },
      {
        "id": "Role",
        "enabled": true,
        "label": "ROLE",
        "value": "Game Programmer"
      }
    ],
    "technicalBlocks": [
      {
        "id": "source-bb-hit-speed",
        "enabled": true,
        "title": "Hit detection drives ball acceleration",
        "description": "Bat raycasts resolve a hit and delegate ball-speed changes to the ball component.",
        "layout": "image-right",
        "images": [
          {
            "id": "source-arena-recording",
            "enabled": true,
            "src": "assets/images/projects/ball-bashers/gameplay/arena-recording.webp",
            "alt": "Ball Bashers arena from the supplied recording",
            "caption": "Ball Bashers arena from the supplied recording"
          }
        ],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "source-bb-match-timer",
        "enabled": true,
        "title": "Match state and timed results",
        "description": "The match timer updates its UI and transitions to the post-game presentation when time expires.",
        "layout": "image-right",
        "images": [],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      }
    ],
    "images": [
      {
        "id": "source-arena-recording",
        "enabled": true,
        "src": "assets/images/projects/ball-bashers/gameplay/arena-recording.webp",
        "alt": "Ball Bashers arena from the supplied recording",
        "caption": "Ball Bashers arena from the supplied recording"
      },
      {
        "id": "bb-gi-01",
        "enabled": true,
        "src": "assets/images/projects/ball-bashers/gameplay/menu.webp",
        "alt": "Gameplay screenshot",
        "caption": "Menu View"
      },
      {
        "id": "bb-gi-02",
        "enabled": true,
        "src": "assets/images/projects/ball-bashers/gameplay/hit.webp",
        "alt": "Gameplay screenshot",
        "caption": "Game View"
      },
      {
        "id": "bb-gi-03",
        "enabled": true,
        "src": "assets/images/projects/ball-bashers/gameplay/player-1-win.webp",
        "alt": "Gameplay screenshot",
        "caption": "Player 1 Win condition"
      },
      {
        "id": "bb-gi-03",
        "enabled": true,
        "src": "assets/images/projects/ball-bashers/gameplay/player-2-win.webp",
        "alt": "Gameplay screenshot",
        "caption": "Player 2 Win condition"
      }
    ],
    "gameplayVideos": [
      {
        "id": "bb-gameplay-01",
        "enabled": true,
        "youtube": "https://youtu.be/wisogkippXA",
        "title": "Ball Bashers Gameplay Video"
      }
    ],
    "pageBackground": {
      "enabled": true,
      "src": "assets/images/project-page-backgrounds/ball-bashers.webp",
      "position": "center 35%",
      "mobilePosition": "center 35%",
      "versions": [
        {
          "src": "assets/images/project-page-backgrounds/responsive/ball-bashers-320w.webp",
          "width": 320
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/ball-bashers-640w.webp",
          "width": 640
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/ball-bashers-1082w.webp",
          "width": 1082
        }
      ]
    },
    "descriptionStyle": {
      "enabled": true
    },
    "collapseEnabled": true,
    "sections": {
      "code": {
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        },
        "blocks": {
          "bb-hit-speed": {
            "title": "Hit detection drives ball acceleration",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          },
          "bb-match-timer": {
            "title": "Match state and timed results",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          }
        }
      },
      "technical": {
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      }
    }
  },
  {
    "id": "two-player-tag",
    "enabled": true,
    "categoryIds": [
      "multiplayer",
      "all-projects"
    ],
    "title": "2-Player Tag",
    "nodeLabel": "TAG",
    "status": "Completed",
    "engine": "Unity",
    "language": "C#",
    "platform": "2D",
    "shortDescription": "A local two-player arena game where the player holding the tag at time-out loses.",
    "description": "Players compete in a 2D arena. One player begins with the tag, and the goal is to pass it to the opponent before the final second; the tag holder loses.",
    "coverImage": "assets/images/projects/2-player-tag/cover.webp",
    "theme": {
      "background": "#181125",
      "surface": "#2d1b4a",
      "text": "#f9f3ff",
      "muted": "#d1bce6",
      "accent": "#b597ff",
      "signal": "#80e8cf"
    },
    "facts": [
      {
        "id": "engine",
        "enabled": true,
        "label": "Engine",
        "value": "Unity"
      },
      {
        "id": "language",
        "enabled": true,
        "label": "Language",
        "value": "C#"
      },
      {
        "id": "format",
        "enabled": true,
        "label": "Format",
        "value": "2D local multiplayer"
      },
      {
        "id": "status",
        "enabled": true,
        "label": "Status",
        "value": "Completed"
      },
      {
        "id": "Genre",
        "enabled": true,
        "label": "Genre",
        "value": "Local multiplayer tag"
      },
      {
        "id": "tp",
        "enabled": true,
        "label": "Target Platform",
        "value": "PC"
      },
      {
        "id": "Role",
        "enabled": true,
        "label": "ROLE",
        "value": "Game Programmer"
      }
    ],
    "technicalBlocks": [
      {
        "id": "source-tag-transfer",
        "enabled": true,
        "title": "Contact transfers the tag",
        "description": "Collision state separates tag transfer from continued overlap between players.",
        "layout": "image-right",
        "images": [],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "source-tag-shared-camera",
        "enabled": true,
        "title": "A shared camera follows both players",
        "description": "Implemented shared-screen framing using average player position, vertical camera limits and distance-based orthographic zoom. The game also provides randomized spawn points, a timed round, paired teleporters and score presentation; these systems are separate from the online networking used in Ruin Runners.",
        "layout": "image-right",
        "images": [],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      }
    ],
    "images": [],
    "gameplayVideos": [],
    "gameplayVideos": [
      {
        "id": "2p-gameplay-01",
        "enabled": true,
        "youtube": "https://youtu.be/pwxsrynqhJk",
        "title": "2 Player Tag Gameplay Video"
      }
    ],
    "documentGroups": [],
    "pageBackground": {
      "enabled": true,
      "src": "assets/images/project-page-backgrounds/two-player-tag.webp",
      "position": "center 35%",
      "mobilePosition": "center 35%",
      "versions": [
        {
          "src": "assets/images/project-page-backgrounds/responsive/two-player-tag-320w.webp",
          "width": 320
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/two-player-tag-640w.webp",
          "width": 640
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/two-player-tag-1280w.webp",
          "width": 1280
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/two-player-tag-1600w.webp",
          "width": 1600
        }
      ]
    },
    "descriptionStyle": {
      "enabled": true
    },
    "collapseEnabled": true,
    "sections": {
      "code": {
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        },
        "blocks": {
          "tag-transfer": {
            "title": "Contact transfers the tag",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          },
          "tag-shared-camera": {
            "title": "A shared camera follows both players",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          }
        }
      },
      "technical": {
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      }
    }
  },
  {
    "id": "think-try-treasure",
    "enabled": true,
    "categoryIds": [
      "systems",
      "all-projects"
    ],
    "title": "Think Try Treasure",
    "nodeLabel": "T3",
    "status": "Completed",
    "engine": "Unreal Engine 4.27",
    "language": "C++",
    "platform": "3D",
    "shortDescription": "A violence-free obstacle, quiz and puzzle game created for a school competition.",
    "description": "Created for a Chinmaya Vidyalaya school competition while in 11th standard. The player progresses through obstacles, math quizzes and puzzles to reach a treasure in a non-violent game format.",
    "coverImage": "assets/images/projects/think-try-treasure/cover.webp",
    "theme": {
      "background": "#111e23",
      "surface": "#18343a",
      "text": "#efffff",
      "muted": "#b7d4d7",
      "accent": "#6ed8df",
      "signal": "#ecd16f"
    },
    "facts": [
      {
        "id": "engine",
        "enabled": true,
        "label": "Engine",
        "value": "Unreal Engine 4.27"
      },
      {
        "id": "language",
        "enabled": true,
        "label": "Language",
        "value": "C++"
      },
      {
        "id": "format",
        "enabled": true,
        "label": "Format",
        "value": "3D"
      },
      {
        "id": "status",
        "enabled": true,
        "label": "Status",
        "value": "Completed"
      },
      {
        "id": "Genre",
        "enabled": true,
        "label": "Genre",
        "value": "Puzzle / Adventure"
      },
      {
        "id": "tp",
        "enabled": true,
        "label": "Target Platform",
        "value": "PC"
      },
      {
        "id": "Role",
        "enabled": true,
        "label": "ROLE",
        "value": "Solo Developer (Programming, Art and Design)"
      }
    ],
    "technicalBlocks": [],
    "images": [],
    "gameplayVideos": [],
    "engineWorkVideos": [],
    "documentGroups": [],
    "pageBackground": {
      "enabled": true,
      "src": "assets/images/project-page-backgrounds/think-try-treasure.webp",
      "position": "center 35%",
      "mobilePosition": "center 35%",
      "versions": [
        {
          "src": "assets/images/project-page-backgrounds/responsive/think-try-treasure-320w.webp",
          "width": 320
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/think-try-treasure-640w.webp",
          "width": 640
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/think-try-treasure-1024w.webp",
          "width": 1024
        }
      ]
    },
    "descriptionStyle": {
      "enabled": true
    },
    "collapseEnabled": true,
    "sections": {
      "code": {
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        },
        "blocks": {}
      },
      "technical": {
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      }
    }
  },
  {
    "id": "lost-trance",
    "enabled": true,
    "categoryIds": [
      "game-jams",
      "all-projects"
    ],
    "title": "Lost Trance",
    "nodeLabel": "TRANCE",
    "status": "Completed · GGJ 2026",
    "engine": "Unity",
    "language": "C#",
    "platform": "2D",
    "shortDescription": "A mask-themed dream world where each emotion grants a progression ability.",
    "description": "Built for Global Game Jam 2026 with the theme ‘mask.’ The player is trapped in dreams and changes between yellow (happy), purple (sad) and red (anger) masks, using their abilities in the right places to progress.",
    "coverImage": "assets/images/projects/lost-trance/cover.webp",
    "theme": {
      "background": "#20122c",
      "surface": "#422355",
      "text": "#fff7ff",
      "muted": "#d8bfdf",
      "accent": "#e07ee1",
      "signal": "#f6d562"
    },
    "facts": [
      {
        "id": "engine",
        "enabled": true,
        "label": "Engine",
        "value": "Unity"
      },
      {
        "id": "language",
        "enabled": true,
        "label": "Language",
        "value": "C#"
      },
      {
        "id": "format",
        "enabled": true,
        "label": "Format",
        "value": "2D game jam project"
      },
      {
        "id": "status",
        "enabled": true,
        "label": "Status",
        "value": "Completed · GGJ 2026"
      },
      {
        "id": "Genre",
        "enabled": true,
        "label": "Genre",
        "value": "Puzzle / Adventure"
      },
      {
        "id": "tp",
        "enabled": true,
        "label": "Target Platform",
        "value": "PC"
      },
      {
        "id": "Role",
        "enabled": true,
        "label": "ROLE",
        "value": "Game Programmer"
      }
    ],
    "technicalBlocks": [
      {
        "id": "source-trance-realm-collision",
        "enabled": true,
        "title": "Realm changes alter the world’s collision state",
        "description": "Realm-tagged objects fade during a transition, then their colliders are enabled or disabled for the new realm.",
        "layout": "image-right",
        "images": [
          {
            "id": "source-red-realm-traversal",
            "enabled": true,
            "src": "assets/images/projects/lost-trance/gameplay/red-realm-traversal.webp",
            "alt": "Red realm traversal and obstacles",
            "caption": "Red realm traversal and obstacles"
          }
        ],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "source-trance-local-slow",
        "enabled": true,
        "title": "Slow selected hazards without slowing everything",
        "description": "The slow-mode toggle propagates state to falling blocks and their spawners.",
        "layout": "image-right",
        "images": [
          {
            "id": "source-blue-realm-platforms",
            "enabled": true,
            "src": "assets/images/projects/lost-trance/gameplay/blue-realm-platforms.webp",
            "alt": "Platform traversal in the blue realm",
            "caption": "Platform traversal in the blue realm"
          }
        ],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "source-trance-traversal",
        "enabled": true,
        "title": "Realm-gated dash and wall traversal",
        "description": "Implemented realm-gated movement including dash, double-jump availability, wall jumping and staged wall climbing. Dash temporarily alters collider/gravity state and decays over an unscaled timer; wall jumping is bounded by a wall-hold window.",
        "layout": "image-right",
        "images": [
          {
            "id": "source-yellow-realm-dash",
            "enabled": true,
            "src": "assets/images/projects/lost-trance/gameplay/yellow-realm-dash.webp",
            "alt": "Dashing across the yellow realm",
            "caption": "Dashing across the yellow realm"
          }
        ],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "source-trance-swing",
        "enabled": true,
        "title": "Attach the player to a physics swing",
        "description": "The player first moves to the swing position, then adds a configured DistanceJoint2D.",
        "layout": "image-right",
        "images": [
          {
            "id": "source-swing-joint",
            "enabled": true,
            "src": "assets/images/projects/lost-trance/gameplay/swing-joint.webp",
            "alt": "Swinging between platforms",
            "caption": "Swinging between platforms"
          }
        ],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "trance-mask-abilities",
        "enabled": true,
        "title": "Emotion-based ability progression",
        "image": "",
        "imageAlt": "",
        "description": "Yellow, purple and red masks represent happy, sad and anger states. Their special abilities are used in the appropriate areas to progress through the dream world.",
        "layout": "image-right",
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      }
    ],
    "images": [
      {
        "id": "source-yellow-realm-dash",
        "enabled": true,
        "src": "assets/images/projects/lost-trance/gameplay/yellow-realm-dash.webp",
        "alt": "Dashing across the yellow realm",
        "caption": "Dashing across the yellow realm"
      },
      {
        "id": "source-blue-realm-platforms",
        "enabled": true,
        "src": "assets/images/projects/lost-trance/gameplay/blue-realm-platforms.webp",
        "alt": "Platform traversal in the blue realm",
        "caption": "Platform traversal in the blue realm"
      },
      {
        "id": "source-red-realm-traversal",
        "enabled": true,
        "src": "assets/images/projects/lost-trance/gameplay/red-realm-traversal.webp",
        "alt": "Red realm traversal and obstacles",
        "caption": "Red realm traversal and obstacles"
      },
      {
        "id": "source-swing-joint",
        "enabled": true,
        "src": "assets/images/projects/lost-trance/gameplay/swing-joint.webp",
        "alt": "Swinging between platforms",
        "caption": "Swinging between platforms"
      }
    ],
    "gameplayVideos": [
      {
        "id": "lt-gameplay-01",
        "enabled": true,
        "youtube": "https://youtu.be/XGzpZdOmXcQ",
        "title": "Lost Trance Gameplay Video"
      }
    ],
    "engineWorkVideos": [],
    "documentGroups": [],
    "pageBackground": {
      "enabled": true,
      "src": "assets/images/project-page-backgrounds/lost-trance.webp",
      "position": "center 35%",
      "mobilePosition": "center 35%",
      "versions": [
        {
          "src": "assets/images/project-page-backgrounds/responsive/lost-trance-320w.webp",
          "width": 320
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/lost-trance-640w.webp",
          "width": 640
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/lost-trance-1280w.webp",
          "width": 1280
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/lost-trance-1600w.webp",
          "width": 1600
        }
      ]
    },
    "descriptionStyle": {
      "enabled": true
    },
    "collapseEnabled": true,
    "sections": {
      "code": {
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        },
        "blocks": {
          "trance-realm-collision": {
            "title": "Realm changes alter the world’s collision state",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          },
          "trance-local-slow": {
            "title": "Slow selected hazards without slowing everything",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          },
          "trance-traversal": {
            "title": "Realm-gated dash and wall traversal",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          },
          "trance-swing": {
            "title": "Attach the player to a physics swing",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          }
        }
      },
      "technical": {
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      }
    }
  },
  {
    "id": "ben-3",
    "enabled": true,
    "categoryIds": [
      "game-jams",
      "all-projects"
    ],
    "title": "Ben 3",
    "nodeLabel": "BEN3",
    "status": "Completed · BYOG 2025",
    "engine": "Unity",
    "language": "C#",
    "platform": "2D",
    "shortDescription": "A game-jam project with three powers earned through short genre-switching mini-games.",
    "description": "Built for BYOG 2025 around the ‘Re:Think, Re:Mix and Re:Make’ theme. Inspired by Ben 10 powers, the player earns jump, dash and shrink abilities from a watch by completing mini-games of different genres, then reaches the end.",
    "coverImage": "assets/images/projects/ben-3/cover.webp",
    "theme": {
      "background": "#102318",
      "surface": "#1d4327",
      "text": "#f4fff3",
      "muted": "#c0dfbd",
      "accent": "#8de365",
      "signal": "#ffdb74"
    },
    "facts": [
      {
        "id": "engine",
        "enabled": true,
        "label": "Engine",
        "value": "Unity"
      },
      {
        "id": "language",
        "enabled": true,
        "label": "Language",
        "value": "C#"
      },
      {
        "id": "format",
        "enabled": true,
        "label": "Format",
        "value": "2D game jam project"
      },
      {
        "id": "status",
        "enabled": true,
        "label": "Status",
        "value": "Completed · BYOG 2025"
      },
      {
        "id": "Genre",
        "enabled": true,
        "label": "Genre",
        "value": "Platformer / Mini-games"
      },
      {
        "id": "tp",
        "enabled": true,
        "label": "Target Platform",
        "value": "PC"
      },
      {
        "id": "Role",
        "enabled": true,
        "label": "ROLE",
        "value": "Game Programmer"
      }
    ],
    "technicalBlocks": [
      {
        "id": "source-ben-ability-selection",
        "enabled": true,
        "title": "Ability selection gates movement options",
        "description": "The selector keeps at most one unlocked ability active, and the player dispatches the corresponding action.",
        "layout": "image-right",
        "images": [],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "source-ben-wire-puzzle",
        "enabled": true,
        "title": "Wire swapping updates visuals and puzzle state",
        "description": "A wire puzzle moves the chosen pair and commits the logical swap when animation reaches its destination.",
        "layout": "image-right",
        "images": [],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "source-ben-memory-puzzle",
        "enabled": true,
        "title": "Memory sequences validate partial input",
        "description": "The sequence puzzle checks each player input against the expected order before advancing the round.",
        "layout": "image-right",
        "images": [],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "ben-mini-games",
        "enabled": true,
        "title": "Abilities earned through mini-games",
        "image": "",
        "imageAlt": "",
        "description": "Jump, dash and shrink abilities are collected by completing small mini-games that use different game genres before the player progresses to the end.",
        "layout": "image-left",
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      }
    ],
    "images": [],
    "gameplayVideos": [
      {
        "id": "b3-gameplay-01",
        "enabled": true,
        "youtube": "https://youtu.be/oHbOex0BFyo",
        "title": "BEN 3 Gameplay Video"
      }
    ],  
    "engineWorkVideos": [],
    "documentGroups": [],
    "pageBackground": {
      "enabled": true,
      "src": "assets/images/project-page-backgrounds/ben-3.webp",
      "position": "center 35%",
      "mobilePosition": "center 35%",
      "versions": [
        {
          "src": "assets/images/project-page-backgrounds/responsive/ben-3-320w.webp",
          "width": 320
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/ben-3-640w.webp",
          "width": 640
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/ben-3-1280w.webp",
          "width": 1280
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/ben-3-1600w.webp",
          "width": 1600
        }
      ]
    },
    "descriptionStyle": {
      "enabled": true
    },
    "collapseEnabled": true,
    "sections": {
      "code": {
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        },
        "blocks": {
          "ben-ability-selection": {
            "title": "Ability selection gates movement options",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          },
          "ben-wire-puzzle": {
            "title": "Wire swapping updates visuals and puzzle state",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          },
          "ben-memory-puzzle": {
            "title": "Memory sequences validate partial input",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          }
        }
      },
      "technical": {
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      }
    }
  },
  {
    "id": "bubble-parkour",
    "enabled": true,
    "categoryIds": [
      "game-jams",
      "all-projects"
    ],
    "title": "Bubble Parkour",
    "nodeLabel": "BUBBLE",
    "status": "Completed · GGJ 2025",
    "engine": "Unity",
    "language": "C#",
    "platform": "3D",
    "shortDescription": "A bathroom-scale parkour escape made for the ‘Bubble’ Global Game Jam theme.",
    "description": "Built for Global Game Jam 2025, this was the first game jam project. The player navigates an exaggerated bathroom where surrounding objects are much larger than the character, attempting to escape through the window.",
    "coverImage": "assets/images/projects/bubble-parkour/cover.webp",
    "theme": {
      "background": "#10202b",
      "surface": "#163c51",
      "text": "#f1fbff",
      "muted": "#b8d5e1",
      "accent": "#6bc9ee",
      "signal": "#b5e96b"
    },
    "facts": [
      {
        "id": "engine",
        "enabled": true,
        "label": "Engine",
        "value": "Unity"
      },
      {
        "id": "language",
        "enabled": true,
        "label": "Language",
        "value": "C#"
      },
      {
        "id": "format",
        "enabled": true,
        "label": "Format",
        "value": "3D game jam project"
      },
      {
        "id": "status",
        "enabled": true,
        "label": "Status",
        "value": "Completed · GGJ 2025"
      },
      {
        "id": "Genre",
        "enabled": true,
        "label": "Genre",
        "value": "Parkour / Platformer"
      },
      {
        "id": "tp",
        "enabled": true,
        "label": "Target Platform",
        "value": "PC"
      },
      {
        "id": "Role",
        "enabled": true,
        "label": "ROLE",
        "value": "Game Programmer"
      }
    ],
    "technicalBlocks": [
      {
        "id": "source-bubble-slide",
        "enabled": true,
        "title": "A timed slide links movement and camera animation",
        "description": "The player enters a slide only under the configured movement and ground-state conditions.",
        "layout": "image-right",
        "images": [],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      },
      {
        "id": "source-bubble-wall-contact",
        "enabled": true,
        "title": "Wall contacts control movement and camera tilt",
        "description": "Connected wall-contact sensors to directional movement restrictions, gravity changes and camera tilt. Separate slope triggers set a slope-traversal flag and camera animation. These excerpts document the supplied prototype implementation, without presenting it as a general-purpose parkour controller.",
        "layout": "image-right",
        "images": [],
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      }
    ],
    "images": [],
    "gameplayVideos": [
      {
        "id": "bp-gameplay-01",
        "enabled": true,
        "youtube": "https://youtu.be/V_2Rpvzyrj0",
        "title": "Bubble Parkour Gameplay Video"
      }
    ],
    "engineWorkVideos": [],
    "documentGroups": [],
    "pageBackground": {
      "enabled": true,
      "src": "assets/images/project-page-backgrounds/bubble-parkour.webp",
      "position": "center 35%",
      "mobilePosition": "center 35%",
      "versions": [
        {
          "src": "assets/images/project-page-backgrounds/responsive/bubble-parkour-320w.webp",
          "width": 320
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/bubble-parkour-640w.webp",
          "width": 640
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/bubble-parkour-1280w.webp",
          "width": 1280
        },
        {
          "src": "assets/images/project-page-backgrounds/responsive/bubble-parkour-1600w.webp",
          "width": 1600
        }
      ]
    },
    "descriptionStyle": {
      "enabled": true
    },
    "collapseEnabled": true,
    "sections": {
      "code": {
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        },
        "blocks": {
          "bubble-slide": {
            "title": "A timed slide links movement and camera animation",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          },
          "bubble-wall-contact": {
            "title": "Wall contacts control movement and camera tilt",
            "collapse": {
              "enabled": true,
              "initiallyCollapsed": true
            }
          }
        }
      },
      "technical": {
        "collapse": {
          "enabled": true,
          "initiallyCollapsed": false
        }
      }
    }
  }
];
