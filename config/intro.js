// Add intro images to assets/images/intro and insert their relative paths into
// `backgroundAssets`. Leaving it empty produces a styled node-grid background.
export const introWidgets = [
  {
    id: "intro-splash",
    enabled: true,
    durationMs: 3000,
    showOncePerTab: false,
    collageColumns: 3,
    collageMinRows: 3,
    titleGap: "clamp(1rem, 2.5vh, 2rem)",
    backgroundAssets: [
      "assets/images/intro/collage-01.webp",
      "assets/images/intro/collage-02.webp",
      "assets/images/intro/collage-03.webp",
      "assets/images/intro/collage-04.webp",
      "assets/images/intro/collage-05.webp",
      "assets/images/intro/collage-06.webp",
      "assets/images/intro/collage-07.webp",
      "assets/images/intro/collage-08.webp",
      "assets/images/intro/collage-09.webp",
      "assets/images/intro/collage-10.webp",
      "assets/images/intro/collage-11.webp",
      "assets/images/intro/collage-12.webp",
      "assets/images/intro/collage-13.webp",
      "assets/images/intro/collage-14.webp",
    ],
    title: "Gopinath S",
    subtitle: "Gameplay Programmer",
    kicker: "SYSTEM INITIALIZING",
    style: {
      title: { fontSize: "clamp(3rem, 11vw, 8.5rem)", fontFamily: "Space Grotesk", color: "#f4f7ff" },
      subtitle: { fontSize: "clamp(0.9rem, 2vw, 1.2rem)", fontFamily: "DM Mono", color: "#73a7ff" },
    },
  },
];
