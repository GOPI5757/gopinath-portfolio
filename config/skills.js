export const skillGroups = [
  {
    id: "engines",
    enabled: true,
    title: "Game Engines",
    description: "Tools used to build 2D and 3D game projects.",
    skills: [
      { id: "unreal", enabled: true, name: "Unreal Engine", description: "3D projects, C++, gameplay and mocap-oriented work." },
      { id: "unity", enabled: true, name: "Unity", description: "2D/3D games, gameplay systems, prototypes and multiplayer work." },
      { id: "roblox", enabled: true, name: "Roblox Studio", description: "Early prototypes and independent problem solving." },
    ],
  },
  {
    id: "programming",
    enabled: true,
    title: "Programming & Data",
    description: "Languages and foundations used across games and software.",
    skills: [
      { id: "cpp", enabled: true, name: "C++", description: "Used with Unreal Engine projects." },
      { id: "csharp", enabled: true, name: "C#", description: "Used with Unity game development." },
      { id: "python", enabled: true, name: "Python", description: "Structured software development and automation." },
      { id: "sql", enabled: true, name: "SQL / MySQL", description: "Data storage, processing and timetable software." },
    ],
  },
  {
    id: "gameplay",
    enabled: true,
    title: "Gameplay & Technical Areas",
    description: "Areas demonstrated through the project work in this portfolio.",
    skills: [
      { id: "systems", enabled: true, name: "Gameplay systems", description: "Interactive mechanics, progression and game logic." },
      { id: "networking", enabled: true, name: "Multiplayer synchronization", description: "Real-time movement and packet-management focus." },
      { id: "optimization", enabled: true, name: "Optimization", description: "Chunk-based representation to reduce per-block object cost." },
      { id: "animation", enabled: true, name: "Animation integration", description: "Creative-tool foundations applied alongside engine work." },
    ],
  },
  {
    id: "creative-tools",
    enabled: true,
    title: "Creative & Production Tools",
    description: "A visual foundation that supports game development work.",
    skills: [
      { id: "blender", enabled: true, name: "Blender / Maya", description: "3D modeling and asset exploration." },
      { id: "materials", enabled: true, name: "Substance Painter", description: "Material-work knowledge." },
      { id: "aftereffects", enabled: true, name: "After Effects", description: "Keyframes, color and visual effects foundations." },
    ],
  },
];
