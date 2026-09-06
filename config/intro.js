// Add intro images to assets/images/intro and insert their relative paths into
// `backgroundAssets`. Leaving it empty produces a styled node-grid background.
export const introWidgets = [
  {
    id: "intro-splash",
    enabled: true,
    durationMs: 3000,
    showOncePerTab: true,
    backgroundAssets: [
      "assets/images/intro/intro.png",
      "assets/images/intro/intro_1.png",
      "assets/images/intro/intro_2.png",
      "assets/images/intro/intro_3.png",
      "assets/images/intro/intro_4.png",
      "assets/images/intro/intro_5.png",
      "assets/images/intro/intro_6.png",
      "assets/images/intro/intro_7.png",
      "assets/images/intro/intro_8.png",
      "assets/images/intro/intro_9.png",
      "assets/images/intro/intro_10.png",
      "assets/images/intro/intro_11.png",
      "assets/images/intro/intro_12.png",
      "assets/images/intro/intro_13.png",
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
