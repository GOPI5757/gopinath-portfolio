export const profileWidgets = [
  {
    id: "profile",
    enabled: true,
    eyebrow: "PROFILE / 01",
    title: "Gopinath S",
    role: "Gameplay Programmer",
    description: "I build playable systems across Unreal Engine and Unity, with a focus on combat, multiplayer synchronization, progression, and performance-minded world building.",
    tags: [
      { id: "unreal", enabled: true, label: "Unreal Engine · C++" },
      { id: "unity", enabled: true, label: "Unity · C#" },
      { id: "systems", enabled: true, label: "Gameplay systems" },
      { id: "problem-solving", enabled: true, label: "Problem solving" },
    ],
    style: {
      title: { fontSize: "clamp(3rem, 6.5vw, 6.2rem)", fontFamily: "Space Grotesk", color: "var(--text)" },
      description: { fontSize: "1.02rem", fontFamily: "Manrope", color: "var(--muted)" },
    },
  },
];
