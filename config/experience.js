// Appearance, responsive behaviour and loading controls for this update.
// Widths/heights are CSS pixels. Text sizes accept CSS values such as rem/clamp().
export const experience = {
  navigation: { menuMaxWidth: 1100 },
  projectBrowser: {
    maxWidth: "860px",
    maxHeight: "85svh",
    desktopColumns: 3,
    mobileColumns: 2,
    mobileMaxWidth: 760,
    thumbnailAspectRatio: "16 / 10",
  },
  contact: {
    placement: "auto", // "auto", "right", or "bottom"
    mobileMaxWidth: 760,
    shortMaxHeight: 520, // 1366×768 and 1280×720 laptops stay on the right.
    panelWidth: "13rem",
    topOffset: "6.25rem",
    initiallyCollapsed: false,
    reserveContentSpace: true,
    matchProjectBackground: true,
  },
  projectGrid: {
    mobileMaxWidth: 760,
    mobileColumns: 2,
    tabletMaxWidth: 1100,
    tabletColumns: 3,
    desktopColumns: 4,
    gap: "1rem",
    mobileGap: "0.65rem",
    mobileTitleSize: "1.05rem",
    mobileCardMinHeight: "13rem",
    coverOpacity: 0.42,
    showGraphConnectors: false,
    showCategoryCode: false,
  },
  profileVideo: {
    enabled: true,
    autoplay: true,
    showPauseButton: true,
    pauseLabel: "Pause background",
    playLabel: "Play background",
    respectReducedMotion: true,
    respectDataSaver: true,
    pauseWhenOffscreen: true,
    loadDelayMs: 350, // Let the poster and profile text render first.
    desktopMinHeight: "38rem",
    mobileMinHeight: "48rem",
    mobileMaxWidth: 600,
    portraitMaxRatio: 0.82,
    squareMaxRatio: 1.35,
    objectFit: "contain", // Preserve the complete frame; "cover" can crop.
    overlayDesktop: "linear-gradient(90deg,rgba(4,9,18,.94),rgba(4,9,18,.70) 35%,rgba(4,9,18,.12) 78%)",
    overlayPortrait: "linear-gradient(180deg,rgba(4,9,18,.96),rgba(4,9,18,.70) 38%,rgba(4,9,18,.05) 65%,rgba(4,9,18,.30))",
    sources: {
      desktop: { src: "assets/video/profile-desktop.mp4", poster: "assets/video/poster-desktop.jpg" },
      tablet: { src: "assets/video/profile-tablet.mp4", poster: "assets/video/poster-tablet.jpg" },
      mobile: { src: "assets/video/profile-mobile.mp4", poster: "assets/video/poster-mobile.jpg" },
    },
  },
  performance: {
    responsiveImages: true,
    lazyImages: true,
    imageRootMargin: "180px",
    imageSizes: {
      browser: "240px",
      projectCard: "(max-width:760px) 45vw, (max-width:1100px) 30vw, 300px",
      detail: "(max-width:760px) 94vw, 900px",
    },
    imageQualityNote: "Variants are generated in assets/optimized. Custom image paths also work without a manifest entry.",
    clickToLoadYouTube: true,
    playVideoLabel: "Play video",
    imageErrorLabel: "Image unavailable",
    watchLinkLabel: "Watch on YouTube ↗",
    decorativeProjectImages: false,
    maxDecorativeImages: 3,
  },
  projectDetail: {
    sectionOrder: ["documents", "gameplay-videos", "technical", "images", "engine-videos"],
    documents: {
      compact: true,
      label: "Documents & links",
      sticky: true,
      stickyMinWidth: 761,
      stickyMinHeight: 650,
      maxHeight: "7rem",
    },
  },
  // Optional CSS for advanced styling, appended after the generated rules.
  // Most changes can be made using the settings above or profile.js/theme.js.
  customCSS: "",
};
