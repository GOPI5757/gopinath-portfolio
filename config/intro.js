// Add intro images to assets/images/intro and insert their relative paths into
// `backgroundAssets`. Leaving it empty produces a styled node-grid background.
export const introWidgets = [
  {
    id: "intro-splash",
    enabled: true,
    durationMs: 3000,
    showOncePerTab: true,
    backgroundAssets: [
      "assets/images/intro/intro.webp",
      "assets/images/intro/intro_1.webp",
      "assets/images/intro/intro_2.webp",
      "assets/images/intro/intro_3.webp",
      "assets/images/intro/intro_4.webp",
      "assets/images/intro/intro_5.webp",
      "assets/images/intro/intro_6.webp",
      "assets/images/intro/intro_7.webp",
      "assets/images/intro/intro_8.webp",
      "assets/images/intro/intro_9.webp",
      "assets/images/intro/intro_10.webp",
      "assets/images/intro/intro_11.webp",
      "assets/images/intro/intro_12.webp",
      "assets/images/intro/intro_13.webp",
    ],
    title: "Gopinath S",
    subtitle: "Gameplay Programmer;",
    kicker: "SYSTEM INITIALIZING",
    style: {
      title: { fontSize: "clamp(3rem, 11vw, 8.5rem)", fontFamily: "Space Grotesk", color: "#f4f7ff" },
      subtitle: { fontSize: "clamp(0.9rem, 2vw, 1.2rem)", fontFamily: "DM Mono", color: "#73a7ff" },
    },
  },
];
