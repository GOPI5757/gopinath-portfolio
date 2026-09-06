// Categories and project items are separate so you can create any number of
// categories and place a project in one or more categories with `categoryIds`.
// A project does not need media: nodes still render safely from its theme.
// Add a project's optional `backgroundImages` array to scatter subtle decorative
// images behind its detail page. Each entry can be an image path or an object
// with `src` and an optional `enabled` switch.
// In each project's `theme`, `background` can be one color (for a solid color)
// or an array of colors (for a smooth gradient). Optionally set `backgroundAngle`
// to control the gradient direction, for example "135deg".

export const projectSectionWidgets = [
  {
    id: "projects-section",
    enabled: true,
    eyebrow: "PROJECT GRAPH / 02",
    title: "Playable ideas, connected through systems.",
    description: "Select a project node to open its configurable technical breakdown.",
    style: { title: { fontSize: "clamp(2rem, 4vw, 4rem)", fontFamily: "Space Grotesk", color: "var(--text)" } },
  },
];

export const projectCategories = [
  { id: "all-projects", enabled: true, title: "All Projects", description: "Gopinath's Projects", accent: "#f0e0b7" },
  { id: "current", enabled: true, title: "Current Development", description: "Projects still in progress.", accent: "#8b9dff" },
  { id: "systems", enabled: true, title: "Systems & Progression", description: "Procedural logic, progression and puzzle systems.", accent: "#5de0bd" },
  { id: "multiplayer", enabled: true, title: "Multiplayer & Local Play", description: "Online and local competitive experiences.", accent: "#ffbb6c" },
  { id: "game-jams", enabled: true, title: "Game Jam Projects", description: "Rapid builds shaped by a shared theme.", accent: "#f28ddd" },
];

const emptyMedia = {
  images: [
    {
      id: "digging-gameplay-01",
      enabled: true,
      src: "assets/images/projects/coverImages/bbCoverImg.png",
      alt: "The digging area in the game",
      caption: "Gameplay view"
    },
    {
      id: "digging-gameplay-01",
      enabled: true,
      src: "assets/images/projects/coverImages/t3CoverImg.jpg",
      alt: "The digging area in the game",
      caption: "Gameplay view"
    }
  ],
  gameplayVideos: [],
  engineWorkVideos: [],
  documentGroups: [],
};

export const projectItems = [
  {
    id: "ren-path-of-destiny",
    enabled: true,
    categoryIds: ["current", "all-projects"],
    title: "Ren: Path of Destiny",
    nodeLabel: "REN",
    status: "In progress",
    engine: "Unreal Engine 5.8",
    language: "C++",
    platform: "3D",
    shortDescription: "A fast-paced crowd-control beat 'em up with combat-driven environment puzzles.",
    description:
      "A fast-paced beat 'em up centered on systemic crowd-control mechanics. The game bridges the gap between combat and exploration by utilizing combat abilities as environmental traversal tools, replacing standard attack inputs with interactive, state-driven challenges.",
    coverImage: "assets/images/projects/coverImages/renCoverImg.png",
    backgroundImages: [
      "assets/images/projects/ren/gi_01.png",
      "assets/images/projects/ren/gi_02.png",
      "assets/images/projects/ren/gi_03.png",
      "assets/images/projects/ren/gi_04.png",
      "assets/images/projects/ren/tb/ren-puzzle-1.png",
      "assets/images/projects/ren/tb/mocap_1.png",
      "assets/images/projects/ren/tb/hung-prog-1.png",
    ],
    theme: { background: ["#180e0e", "#0e180f", "#524949"], surface: "#110a0a", text: "#fee8e8", muted: "#cab4b4", accent: "#db7878", signal: "#f0c86e" },
    facts: [
      { id: "engine", enabled: true, label: "Engine", value: "Unreal Engine 5.8" },
      { id: "language", enabled: true, label: "Language", value: "C++" },
      { id: "format", enabled: true, label: "Format", value: "3D" },
      { id: "status", enabled: true, label: "Status", value: "In progress" },
      { id: "Genre", enabled: true, label: "Genre", value: "Beat em' up" },
      { id: "tp", enabled: true, label: "Target Platform", value: "PC" },
    ],
    technicalBlocks: [
      {
        id: "ren-combat-puzzles",
        enabled: true,
        title: "Combat-led environment puzzles",
        images: ["assets/images/projects/ren/tb/ren-puzzle-1.png"],
        imageAlt: "",
        description: "The project direction connects combat styles to environmental progression, using a small focus-and-strength interaction for obstacles instead of treating every obstacle as a single attack-button action.",
        layout: "image-right",
      },
      {
        id: "ren-mocap",
        enabled: true,
        title: "Mocap-focused production direction",
        images: [
          { id: "ren-mocap-1", enabled: true, src: "assets/images/projects/ren/tb/mocap_1.png", alt: "Ren mocap production" },
          { id: "ren-mocap-2", enabled: true, src: "assets/images/projects/ren/tb/mocap_2.png", alt: "Ren mocap production" },
        ],
        description: "The project is being developed with UE 5.8 mocap as part of its current production direction.",
        layout: "image-left",
      },
      {
        id: "ren-hungarian",
        enabled: true,
        title: "Hungarian Algorithm",
        progressionImages: [
          {
            src: "assets/images/projects/ren/tb/hung-prog-1.png",
            alt: "Initial stage"
          },
          {
            src: "assets/images/projects/ren/tb/hung-prog-2.png",
            alt: "Second stage"
          },
          {
            src: "assets/images/projects/ren/tb/hung-prog-3.png",
            alt: "Final stage"
          },
        ],
        description: `Built a group-coordination system using the Hungarian 
          algorithm to solve the assignment problem between active enemies and available tactical locations. 
          This optimization guarantees the shortest possible combined travel distance for the swarm, 
          replacing sub-optimal "greedy" pathfinding with deterministic, coordinated unit tactics.`,
        layout: "image-right",
      },
    ],
    images: [
      {
        id: "ren-gi-01",
        enabled: true,
        src: "assets/images/projects/ren/gi_01.png",
        alt: "The digging area in the game",
        caption: "Non-Combat View"
      },
      {
        id: "ren-gi-02",
        enabled: true,
        src: "assets/images/projects/ren/gi_02.png",
        alt: "The digging area in the game",
        caption: "Combat View"
      },
      {
        id: "ren-gi-03",
        enabled: true,
        src: "assets/images/projects/ren/gi_03.png",
        alt: "The digging area in the game",
        caption: "Finisher View - I"
      },
      {
        id: "ren-gi-04",
        enabled: true,
        src: "assets/images/projects/ren/gi_04.png",
        alt: "The digging area in the game",
        caption: "Finisher View - II"
      },
    ],
    gameplayVideos: [
      {
        id: "ren-gameplay-01",
        enabled: true,
        youtube: "https://youtu.be/4wY3zX4B1Zg",
        title: "Ren: Path Of Desitny Gameplay"
      },
    ],
    engineWorkVideos: [
      {
        id: "ren-ew-01",
        enabled: true,
        youtube: "https://youtu.be/QyXb43AwSq8",
        title: "Engine work Video 001",
        section: ["Combat Rings & Slots"]
      },
      {
        id: "ren-ew-02",
        enabled: true,
        youtube: "https://youtu.be/k1mQgSQ-klQ",
        title: "Engine work Video 002",
        section: ["Combat Rings & Slots"]
      },
      {
        id: "ren-ew-03",
        enabled: true,
        youtube: "https://youtu.be/NNZstGU-1Po",
        title: "Engine work Video 003",
        section: ["Combat Rings & Slots"]
      },
      {
        id: "ren-ew-04",
        enabled: true,
        youtube: "https://youtu.be/Mjdh4Gls-MY",
        title: "Engine work Video 004",
        section: ["Combat Rings & Slots"]
      },
      {
        id: "ren-ew-05",
        enabled: true,
        youtube: "https://youtu.be/CxHe3NrmUnY",
        title: "Engine work Video 005",
        section: ["Enemy AI", "Player Combat"]
      },
      {
        id: "ren-ew-06",
        enabled: true,
        youtube: "https://youtu.be/FbNhW7YUZ1c",
        title: "Engine work Video 006",
        section: ["Enemy Detection"]
      },
      {
        id: "ren-ew-07",
        enabled: true,
        youtube: "https://youtu.be/s0MjbsNwZg4",
        title: "Engine work Video 007",
        section: ["Enemy Detection"]
      },
      {
        id: "ren-ew-08",
        enabled: true,
        youtube: "https://youtu.be/rdTxzRZD-rA",
        title: "Engine work Video 008",
        section: ["Enemy AI", "Combat Rings & Slots"]
      },
      {
        id: "ren-ew-09",
        enabled: true,
        youtube: "https://youtu.be/yOb-ThfCnWM",
        title: "Engine work Video 009",
        section: ["Enemy AI"]
      },
      {
        id: "ren-ew-10",
        enabled: true,
        youtube: "https://youtu.be/F3siB5rxSUU",
        title: "Engine work Video 010",
        section: ["Enemy AI"]
      },
      {
        id: "ren-ew-11",
        enabled: true,
        youtube: "https://youtu.be/NwrY-bt1SMk",
        title: "Engine work Video 011",
        section: ["Enemy AI", "Combat Rings & Slots"]
      },
      {
        id: "ren-ew-12",
        enabled: true,
        youtube: "https://youtu.be/heypAKcaKNY",
        title: "Engine work Video 012",
        section: ["Enemy AI", "Combat Rings & Slots"]
      },
      {
        id: "ren-ew-13",
        enabled: true,
        youtube: "https://youtu.be/TvxKmhTEsas",
        title: "Engine work Video 013",
        section: ["Combat Rings & Slots"]
      },
      {
        id: "ren-ew-14",
        enabled: true,
        youtube: "https://youtu.be/05apNyIEjp8",
        title: "Engine work Video 014",
        section: ["Combat Rings & Slots"]
      },
    ],
    documentSections: [
      {
        id: "ren-documents",
        enabled: true,
        title: "Documents",
        groups: [
          {
            id: "ren-gvd",
            enabled: true,
            title: "Game Vision Document",
            documents: [
              {
                id: "ren-gdd",
                enabled: true,
                label: "View GVD",
                href: "assets/documents/ren/GAME VISION DOCUMENT.pdf",
                type: "PDF"
              },
            ],
          },
          {
            id: "ren-rvj",
            enabled: true,
            title: "Programmer's RVJ (Revised Visual Journal)",
            documents: [
              {
                id: "ren-rvj-doc",
                enabled: true,
                label: "View RVJ",
                href: "assets/documents/ren/Programmer_RVJ.pdf",
                type: "PDF"
              },
            ],
          },
        ],
      },
      {
        id: "ren-links",
        enabled: true,
        title: "Links",
        groups: [
          {
            id: "ren-miro-group",
            enabled: true,
            title: "Programmer Miro Board",
            documents: [
              {
                id: "ren-miro",
                enabled: true,
                label: "Miro Board",
                href: "https://miro.com/app/board/uXjVHuAc9Vk=/?share_link_id=124472935259/",
                type: "MIRO",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "digging-game",
    enabled: true,
    categoryIds: ["current", "systems", "all-projects"],
    title: "Digging Game",
    nodeLabel: "DIG",
    status: "In progress",
    engine: "Unity",
    language: "C#",
    platform: "3D",
    shortDescription: "A rebuilding and resource-progression game with a chunk-based sand area.",
    description:
      "The player rebuilds a broken house by completing quests, earning coins, opening areas, gathering materials and crafting resources. A large sand area uses Minecraft-like blocks presented through a chunk system.",
    coverImage: "assets/images/projects/coverImages/dgCoverImg.png",
    backgroundImages: [
      "assets/images/projects/dg/Gameplay_1.png",
      "assets/images/projects/dg/Gameplay_2.png",
      "assets/images/projects/dg/EngineView.png",
      "assets/images/projects/dg/Tools Shop View.png",
      "assets/images/projects/dg/Backpack Shop View.png",
      "assets/images/projects/dg/Storage View.png",
      "assets/images/projects/dg/Quests View.png",
    ],
    theme: { background: ["#1b1a10", "#101a1b", "#4b4b46"], surface: "#2b2b17", text: "#fcf9ca", muted: "#ede8de", accent: "#dbc278", signal: "#f0c86e" },
    facts: [
      { id: "engine", enabled: true, label: "Engine", value: "Unity" },
      { id: "language", enabled: true, label: "Language", value: "C#" },
      { id: "format", enabled: true, label: "Format", value: "3D" },
      { id: "status", enabled: true, label: "Status", value: "In progress" },
      { id: "Genre", enabled: true, label: "Genre", value: "Casual, Resource Management, Simulation" },
      { id: "tp", enabled: true, label: "Target Platform", value: "PC" },
    ],
    technicalBlocks: [
      {
        id: "digging-chunk-system",
        enabled: true,
        title: "Chunk-based block representation",
        images: [
          { id: "dg-chunk-1", enabled: true, src: "assets/images/projects/dg/tb/dg_chunkSystemGIF.gif", alt: "Chunk System" },
        ],
        imageAlt: "",
        description: "Instead of making every sand block its own object, blocks inside a chunk are represented as one object. This was programmed to reduce CPU cost while retaining a large block-based digging area.",
        layout: "image-right",
      },
      {
        id: "digging-chunk-system",
        enabled: true,
        title: "Chunk-Based Chest Spawning System",
        progressionImages: [
          {
            src: "assets/images/projects/dg/tb/chestSO.gif",
            alt: "Initial stage"
          },
          {
            src: "assets/images/projects/dg/tb/chestSO_1.png",
            alt: "Initial stage"
          },
          {
            src: "assets/images/projects/dg/tb/chestOpen.png",
            alt: "Initial stage"
          },
        ],
        images: [
          { id: "dg-chunk-2", enabled: true, src: "assets/images/projects/dg/tb/chestSO.gif", alt: "Chunk System" },
          { id: "dg-chunk-2", enabled: true, src: "assets/images/projects/dg/tb/chestSO_1.png", alt: "Chunk System" },
        ],
        imageAlt: "",
        description: `I designed a chunk-based chest spawning system for the sand area, using Unity Scriptable Objects to efficiently manage chest
          distribution. The system allows designers to configure the number of chests spawned per chunk along with 
          their rarity and corresponding chest counts, making it easy to fine-tune chest distribution and rarity without modifying the core gameplay logic.`,
        layout: "image-left",
      },
    ],
    documentGroups: [
      {
        id: "digging-design-docs",
        enabled: true,
        title: "Game Design Documents",
        documents: [
          { id: "digging-gdd", enabled: true, label: "View GDD", href: "assets/documents/dg/Untitled_DG_GDD.pdf", type: "PDF" },
        ],
      },
    ],
    images: [
      {
        id: "dg-gi-01",
        enabled: true,
        src: "assets/images/projects/dg/Gameplay_1.png",
        alt: "The digging area in the game",
        caption: "Gameplay View"
      },
      {
        id: "dg-gi-02",
        enabled: true,
        src: "assets/images/projects/dg/Gameplay_2.png",
        alt: "The digging area in the game",
        caption: "Gameplay View"
      },
      {
        id: "rdgen-gi-03",
        enabled: true,
        src: "assets/images/projects/dg/EngineView.png",
        alt: "The digging area in the game",
        caption: "Engine View"
      },
      {
        id: "dg-gi-04",
        enabled: true,
        src: "assets/images/projects/dg/Tools Shop View.png",
        alt: "The digging area in the game",
        caption: "Tools shop view"
      },
      {
        id: "dg-gi-05",
        enabled: true,
        src: "assets/images/projects/dg/Backpack Shop View.png",
        alt: "The digging area in the game",
        caption: "Backpack shop view"
      },
      {
        id: "dg-gi-06",
        enabled: true,
        src: "assets/images/projects/dg/Storage View.png",
        alt: "The digging area in the game",
        caption: "Storage view"
      },
      {
        id: "dg-gi-07",
        enabled: true,
        src: "assets/images/projects/dg/Quests View.png",
        alt: "The digging area in the game",
        caption: "Quests view"
      },
    ],
    gameplayVideos: [
      {
        id: "dg-gameplay-01",
        enabled: true,
        youtube: "https://youtu.be/BvFgmtQqz14",
        title: "Digging Game Gameplay"
      },
    ],
    engineWorkVideos: [],
  },
  {
    id: "word-search",
    enabled: true,
    categoryIds: ["systems", "all-projects"],
    title: "Word Search",
    nodeLabel: "WORD",
    status: "Completed",
    engine: "Unity",
    language: "C#",
    platform: "2D",
    shortDescription: "A word-search recreation built around randomized grids and staged difficulty.",
    description:
      `Word Search is a dynamic recreation of the classic hidden-word puzzle, built around procedural grid generation
       and escalating difficulty. The game starts with a 5×5 grid and increases in size every five levels, 
       capping at level 30. To ensure high replayability, both the target words and grid letters are randomized on 
       each restart. Additionally, each five-level tier features a strict time limit, which is exposed to the 
       Engine Inspector via Scriptable Objects for rapid playtesting and balancing.`,
    coverImage: "assets/images/projects/coverImages/wsCoverImg.jpeg",
    theme: { background: ["#271e10", "#102713", "#102027", "#c9c390", "#abc0c1"], surface: "#4b2f12", text: "#f6e4cd", muted: "#eee7d4", accent: "#ffcb77", signal: "#f4bd6a" },
    facts: [
      { id: "engine", enabled: true, label: "Engine", value: "Unity" },
      { id: "language", enabled: true, label: "Language", value: "C#" },
      { id: "format", enabled: true, label: "Format", value: "2D" },
      { id: "status", enabled: true, label: "Status", value: "Completed" },
      { id: "Genre", enabled: true, label: "Genre", value: "Word Puzzle" },
      { id: "tp", enabled: true, label: "Target Platform", value: "Mobile" },
    ],
    technicalBlocks: [
      {
        id: "word-random-grid",
        enabled: true,
        title: "Randomized levels and progression",
        image: "",
        progressionImages: [
          {
            src: "assets/images/projects/ws/tb/ws_1_5.png",
            alt: "Initial stage"
          },
          {
            src: "assets/images/projects/ws/tb/ws_6_10.png",
            alt: "Initial stage"
          },
          {
            src: "assets/images/projects/ws/tb/ws_11_15.png",
            alt: "Initial stage"
          },
          {
            src: "assets/images/projects/ws/tb/ws_16_20.png",
            alt: "Initial stage"
          },
          {
            src: "assets/images/projects/ws/tb/ws_21_25.png",
            alt: "Initial stage"
          },
          {
            src: "assets/images/projects/ws/tb/ws_26_30.png",
            alt: "Initial stage"
          },
        ],
        imageAlt: "",
        description: "Grid size, words and letters are randomized for replay attempts. Difficulty grows in five-level sets by increasing the grid and word count.",
        layout: "image-right",
      },
      {
        id: "word-scriptable-time",
        enabled: true,
        title: "Data-Driven Difficulty Scaling",
        images: [
          { id: "ws-inspector-1", enabled: true, src: "assets/images/projects/ws/tb/ws_inspector.gif", alt: "ws inspector values" },
        ],
        imageAlt: "",
        description: `Architected a data-driven difficulty system using Scriptable Objects to manage time limits and word counts for each five-level tier. 
        Decoupling these parameters from the core logic allows for rapid, code-free balancing and iteration directly within the Unity Inspector.`,
        layout: "image-left",
      },
    ],
    images: [
      {
        id: "ws-gi-01",
        enabled: true,
        src: "assets/images/projects/ws/ws_gameView.png",
        alt: "The digging area in the game",
        caption: "Game View"
      },
      {
        id: "ws-gi-02",
        enabled: true,
        src: "assets/images/projects/ws/ws_win.png",
        alt: "The digging area in the game",
        caption: "Win condition"
      },
      {
        id: "ws-gi-03",
        enabled: true,
        src: "assets/images/projects/ws/ws_lose.png",
        alt: "The digging area in the game",
        caption: "Lose condition"
      },
    ],
    gameplayVideos: [
      {
        id: "ws-gameplay-01",
        enabled: true,
        youtube: "https://youtu.be/i4H2fltSuXA",
        title: "Word Search Gameplay (Level 1-5)"
      },
      {
        id: "ws-gameplay-02",
        enabled: true,
        youtube: "https://youtu.be/S-35Gd8rmRE",
        title: "Word Search Gameplay (Level 6-10)"
      },
      {
        id: "ws-gameplay-03",
        enabled: true,
        youtube: "https://youtu.be/Hj8Y2CDEVfQ",
        title: "Word Search Gameplay (Level 11-15)"
      },
      {
        id: "ws-gameplay-04",
        enabled: true,
        youtube: "https://youtu.be/iogl2iNBn7A",
        title: "Word Search Gameplay (Level 16-20)"
      },
      {
        id: "ws-gameplay-05",
        enabled: true,
        youtube: "https://youtu.be/U1e9I7c9djQ",
        title: "Word Search Gameplay (Level 21-25)"
      },
      {
        id: "ws-gameplay-06",
        enabled: true,
        youtube: "https://youtu.be/8Dyy5h6uVkc",
        title: "Word Search Gameplay (Level 26-30)"
      },
    ],
    documentSections: [
      {
        id: "ws-links",
        enabled: true,
        title: "Links",
        groups: [
          {
            id: "ws-itch-link",
            enabled: true,
            title: "Word Search Game Link",
            documents: [
              {
                id: "ws-itch",
                enabled: true,
                label: "Play Game",
                href: "https://gopi5757.itch.io/word-search",
                type: "itch.io",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "tower-of-hanoi",
    enabled: true,
    categoryIds: ["systems", "all-projects"],
    title: "Tower of Hanoi",
    nodeLabel: "HANOI",
    status: "Completed",
    engine: "Unity",
    language: "C#",
    platform: "2D",
    shortDescription: "A recreation of the Tower of Hanoi puzzle with shuffled starting order.",
    description: "A simple Tower of Hanoi recreation where a shuffled puzzle is presented for the player to solve.",
    coverImage: "assets/images/projects/coverImages/tohCoverImg.png",
    theme: { background: ["#393730", "#4e3224", "#250000" 
      , "#001e08", "#20001a"], backgroundAngle: "180deg", surface: "#383322", text: "#e7d6e2", muted: "#b4a6b0", accent: "#e8dfe5", signal: "#d0ccbc" },
    facts: [
      { id: "engine", enabled: true, label: "Engine", value: "Unity" },
      { id: "language", enabled: true, label: "Language", value: "C#" },
      { id: "format", enabled: true, label: "Format", value: "2D" },
      { id: "status", enabled: true, label: "Status", value: "Completed" },
      { id: "Genre", enabled: true, label: "Genre", value: "Puzzle / Logic" },
      { id: "tp", enabled: true, label: "Target Platform", value: "PC / Mobile" },
    ],
    technicalBlocks: [],
    gameplayVideos: [
      {
        id: "toh-gameplay-01",
        enabled: true,
        youtube: "https://youtu.be/-KfnGO4pEb8",
        title: "Tower of Hanoi Gameplay"
      },
    ],
    images: [
      {
        id: "toh-gi-01",
        enabled: true,
        src: "assets/images/projects/toh/toh_gameView.png",
        alt: "The digging area in the game",
        caption: "Gameplay view"
      },
      {
        id: "toh-gi-02",
        enabled: true,
        src: "assets/images/projects/toh/toh_win_condition.png",
        alt: "The digging area in the game",
        caption: "Win condition"
      },
      {
        id: "toh-gi-03",
        enabled: true,
        src: "assets/images/projects/toh/toh_lose_condition.png",
        alt: "The digging area in the game",
        caption: "Lose condition"
      },
    ],
    documentSections: [
      {
        id: "toh-links",
        enabled: true,
        title: "Links",
        groups: [
          {
            id: "toh-itch-link",
            enabled: true,
            title: "Tower of Hanoi Game Link",
            documents: [
              {
                id: "ws-itch",
                enabled: true,
                label: "Play Game",
                href: "https://gopi5757.itch.io/tower-of-hanoi",
                type: "itch.io",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ruin-runners",
    enabled: true,
    categoryIds: ["multiplayer", "all-projects"],
    title: "Ruin Runners",
    nodeLabel: "RUIN",
    status: "Finished",
    engine: "Unity",
    language: "C#",
    platform: "2D",
    shortDescription: "A two-player online multiplayer game across 10 increasingly difficult levels.",
    description:
      "Two players attempt a sequence of 10 levels with increasing difficulty. The project focuses on online multiplayer, synchronizing movements and managing packets in real time.",
    coverImage: "assets/images/projects/coverImages/rrCoverImg.png",
    theme: { background: "#1a1510", surface: "#35281c", text: "#fff8ed", muted: "#dec9a9", accent: "#ffb36f", signal: "#8ee2bb" },
    facts: [
      { id: "engine", enabled: true, label: "Engine", value: "Unity" },
      { id: "language", enabled: true, label: "Language", value: "C#" },
      { id: "format", enabled: true, label: "Format", value: "2D online multiplayer" },
      { id: "status", enabled: true, label: "Status", value: "Finished" },
      { id: "Genre", enabled: true, label: "Genre", value: "Beat em' up" },
      { id: "tp", enabled: true, label: "Target Platform", value: "PC" },
    ],
    technicalBlocks: [
      {
        id: "ruin-sync",
        enabled: true,
        title: "Real-time player synchronization",
        image: "",
        imageAlt: "",
        description: "The project focus was synchronizing player movement and managing packets in real time for the two-player online experience.",
        layout: "image-left",
      },
    ],
    ...emptyMedia,
  },
  {
    id: "ball-bashers",
    enabled: true,
    categoryIds: ["multiplayer", "all-projects"],
    title: "Ball Bashers",
    nodeLabel: "BASH",
    status: "Completed",
    engine: "Unity",
    language: "C#",
    platform: "3D",
    shortDescription: "A local two-player basketball-inspired game built for quick play.",
    description:
      "A simple local two-player game inspired by basketball. Players use separate shift keys to hit rotating balls, with the player who hits the most winning the round.",
    coverImage: "assets/images/projects/coverImages/bbCoverImg.png",
    theme: { background: ["#121e1d", "#1e1b12", "#12191e", "#121e15"], surface: "#392417", text: "#fff6ef", muted: "#e1c1aa", accent: "#ff9d58", signal: "#ffd36b" },
    facts: [
      { id: "engine", enabled: true, label: "Engine", value: "Unity" },
      { id: "language", enabled: true, label: "Language", value: "C#" },
      { id: "format", enabled: true, label: "Format", value: "3D local multiplayer" },
      { id: "status", enabled: true, label: "Status", value: "Completed" },
      { id: "Genre", enabled: true, label: "Genre", value: "Casual, Co-op" },
      { id: "tp", enabled: true, label: "Target Platform", value: "PC" },
    ],
    technicalBlocks: [],
    images: [
      {
        id: "bb-gi-01",
        enabled: true,
        src: "assets/images/projects/bb/bb_menu.png",
        alt: "The digging area in the game",
        caption: "Menu View"
      },
      {
        id: "bb-gi-02",
        enabled: true,
        src: "assets/images/projects/bb/bb_hit.png",
        alt: "The digging area in the game",
        caption: "Game View"
      },
      {
        id: "bb-gi-03",
        enabled: true,
        src: "assets/images/projects/bb/bb_p1_win.png",
        alt: "The digging area in the game",
        caption: "Player 1 Win condition"
      },
      {
        id: "bb-gi-03",
        enabled: true,
        src: "assets/images/projects/bb/bb_p2_win.png",
        alt: "The digging area in the game",
        caption: "Player 2 Win condition"
      },
    ],
    gameplayVideos: [
      {
        id: "bb-gameplay-01",
        enabled: true,
        youtube: "https://youtu.be/wisogkippXA",
        title: "Ball Bashers Gameplay Video"
      },
    ],
  },
  {
    id: "two-player-tag",
    enabled: true,
    categoryIds: ["multiplayer", "all-projects"],
    title: "2-Player Tag",
    nodeLabel: "TAG",
    status: "Completed",
    engine: "Unity",
    language: "C#",
    platform: "2D",
    shortDescription: "A local two-player arena game where the player holding the tag at time-out loses.",
    description:
      "Players compete in a 2D arena. One player begins with the tag, and the goal is to pass it to the opponent before the final second; the tag holder loses.",
    coverImage: "assets/images/projects/coverImages/tagCoverImg.png",
    theme: { background: "#181125", surface: "#2d1b4a", text: "#f9f3ff", muted: "#d1bce6", accent: "#b597ff", signal: "#80e8cf" },
    facts: [
      { id: "engine", enabled: true, label: "Engine", value: "Unity" },
      { id: "language", enabled: true, label: "Language", value: "C#" },
      { id: "format", enabled: true, label: "Format", value: "2D local multiplayer" },
      { id: "status", enabled: true, label: "Status", value: "Completed" },
      { id: "Genre", enabled: true, label: "Genre", value: "Beat em' up" },
      { id: "tp", enabled: true, label: "Target Platform", value: "PC" },
    ],
    technicalBlocks: [],
    ...emptyMedia,
  },
  {
    id: "think-try-treasure",
    enabled: true,
    categoryIds: ["systems", "all-projects"],
    title: "Think Try Treasure",
    nodeLabel: "T3",
    status: "Completed",
    engine: "Unreal Engine 4.27",
    language: "C++",
    platform: "3D",
    shortDescription: "A violence-free obstacle, quiz and puzzle game created for a school competition.",
    description:
      "Created for a Chinmaya Vidyalaya school competition while in 11th standard. The player progresses through obstacles, math quizzes and puzzles to reach a treasure in a non-violent game format.",
    coverImage: "assets/images/projects/coverImages/t3CoverImg.jpg",
    theme: { background: "#111e23", surface: "#18343a", text: "#efffff", muted: "#b7d4d7", accent: "#6ed8df", signal: "#ecd16f" },
    facts: [
      { id: "engine", enabled: true, label: "Engine", value: "Unreal Engine 4.27" },
      { id: "language", enabled: true, label: "Language", value: "C++" },
      { id: "format", enabled: true, label: "Format", value: "3D" },
      { id: "status", enabled: true, label: "Status", value: "Completed" },
      { id: "Genre", enabled: true, label: "Genre", value: "Beat em' up" },
      { id: "tp", enabled: true, label: "Target Platform", value: "PC" },
    ],
    technicalBlocks: [],
    ...emptyMedia,
  },
  {
    id: "lost-trance",
    enabled: true,
    categoryIds: ["game-jams", "all-projects"],
    title: "Lost Trance",
    nodeLabel: "TRANCE",
    status: "Completed · GGJ 2026",
    engine: "Unity",
    language: "C#",
    platform: "2D",
    shortDescription: "A mask-themed dream world where each emotion grants a progression ability.",
    description:
      "Built for Global Game Jam 2026 with the theme ‘mask.’ The player is trapped in dreams and changes between yellow (happy), purple (sad) and red (anger) masks, using their abilities in the right places to progress.",
    coverImage: "assets/images/projects/coverImages/ltCoverImg.png",
    theme: { background: "#20122c", surface: "#422355", text: "#fff7ff", muted: "#d8bfdf", accent: "#e07ee1", signal: "#f6d562" },
    facts: [
      { id: "engine", enabled: true, label: "Engine", value: "Unity" },
      { id: "language", enabled: true, label: "Language", value: "C#" },
      { id: "format", enabled: true, label: "Format", value: "2D game jam project" },
      { id: "status", enabled: true, label: "Status", value: "Completed · GGJ 2026" },
      { id: "Genre", enabled: true, label: "Genre", value: "Beat em' up" },
      { id: "tp", enabled: true, label: "Target Platform", value: "PC" },
    ],
    technicalBlocks: [
      {
        id: "trance-mask-abilities",
        enabled: true,
        title: "Emotion-based ability progression",
        image: "",
        imageAlt: "",
        description: "Yellow, purple and red masks represent happy, sad and anger states. Their special abilities are used in the appropriate areas to progress through the dream world.",
        layout: "image-right",
      },
    ],
    ...emptyMedia,
  },
  {
    id: "ben-3",
    enabled: true,
    categoryIds: ["game-jams", "all-projects"],
    title: "Ben 3",
    nodeLabel: "BEN3",
    status: "Completed · BYOG 2025",
    engine: "Unity",
    language: "C#",
    platform: "2D",
    shortDescription: "A game-jam project with three powers earned through short genre-switching mini-games.",
    description:
      "Built for BYOG 2025 around the ‘Re:Think, Re:Mix and Re:Make’ theme. Inspired by Ben 10 powers, the player earns jump, dash and shrink abilities from a watch by completing mini-games of different genres, then reaches the end.",
    coverImage: "assets/images/projects/coverImages/benCoverImg.png",
    theme: { background: "#102318", surface: "#1d4327", text: "#f4fff3", muted: "#c0dfbd", accent: "#8de365", signal: "#ffdb74" },
    facts: [
      { id: "engine", enabled: true, label: "Engine", value: "Unity" },
      { id: "language", enabled: true, label: "Language", value: "C#" },
      { id: "format", enabled: true, label: "Format", value: "2D game jam project" },
      { id: "status", enabled: true, label: "Status", value: "Completed · BYOG 2025" },
      { id: "Genre", enabled: true, label: "Genre", value: "Beat em' up" },
      { id: "tp", enabled: true, label: "Target Platform", value: "PC" },
    ],
    technicalBlocks: [
      {
        id: "ben-mini-games",
        enabled: true,
        title: "Abilities earned through mini-games",
        image: "",
        imageAlt: "",
        description: "Jump, dash and shrink abilities are collected by completing small mini-games that use different game genres before the player progresses to the end.",
        layout: "image-left",
      },
    ],
    ...emptyMedia,
  },
  {
    id: "bubble-parkour",
    enabled: true,
    categoryIds: ["game-jams", "all-projects"],
    title: "Bubble Parkour",
    nodeLabel: "BUBBLE",
    status: "Completed · GGJ 2025",
    engine: "Unity",
    language: "C#",
    platform: "3D",
    shortDescription: "A bathroom-scale parkour escape made for the ‘Bubble’ Global Game Jam theme.",
    description:
      "Built for Global Game Jam 2025, this was the first game jam project. The player navigates an exaggerated bathroom where surrounding objects are much larger than the character, attempting to escape through the window.",
    coverImage: "assets/images/projects/coverImages/bpCoverImg.png",
    theme: { background: "#10202b", surface: "#163c51", text: "#f1fbff", muted: "#b8d5e1", accent: "#6bc9ee", signal: "#b5e96b" },
    facts: [
      { id: "engine", enabled: true, label: "Engine", value: "Unity" },
      { id: "language", enabled: true, label: "Language", value: "C#" },
      { id: "format", enabled: true, label: "Format", value: "3D game jam project" },
      { id: "status", enabled: true, label: "Status", value: "Completed · GGJ 2025" },
      { id: "Genre", enabled: true, label: "Genre", value: "Beat em' up" },
      { id: "tp", enabled: true, label: "Target Platform", value: "PC" },
    ],
    technicalBlocks: [],
    ...emptyMedia,
  },
];
