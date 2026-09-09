// Add intro images to assets/images/intro and insert their relative paths into
// `backgroundAssets`. Leaving it empty produces a styled node-grid background.
export const introWidgets = [
  {
    id: "intro-splash",
    enabled: true,
    durationMs: 3000,
    showOncePerTab: false,
    backgroundAssets: [
      "assets/optimized/bbbf71df1c40-1600.webp",
      "assets/optimized/b9b61651d19b-1600.webp",
      "assets/optimized/fcc9142e26ab-1048.webp",
      "assets/optimized/68559777e597-1600.webp",
      "assets/optimized/5dad40cd78f5-1600.webp",
      "assets/optimized/ec0322d0c911-1600.webp",
      "assets/optimized/4e5a0c788760-1082.webp",
      "assets/optimized/07139429716a-1600.webp",
      "assets/optimized/a537d4256ceb-936.webp",
      "assets/optimized/8fd45d3465f8-1069.webp",
      "assets/optimized/3998c753f476-1077.webp",
      "assets/optimized/d60e0a3dab6a-1064.webp",
      "assets/optimized/71ead4a601ca-1075.webp",
      "assets/optimized/0e49861e783a-1065.webp",
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
