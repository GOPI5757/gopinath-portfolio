// Only the project-page backdrop and project counts are controlled here.
// Per-game images are listed separately in project-page-images.js.
export const projectPresentation = {
  pageBackground: {
    enabled: true,
    opacity: 0.32, // 0–1; lower values make text easier to read.
    height: "46rem", // Maximum image height; adds no space above the content.
    mobileHeight: "32rem",
    fit: "cover",
    position: "center 35%",
    mobilePosition: "center 35%",
    sideFade: "12%",
    topFade: "7%",
    bottomFadeStart: "48%",
    mobileMaxWidth: 760,
  },
  hiddenProjects: {
    enabled: true,
    label: "{count} projects hidden to the right. Scroll to reveal more.",
    singleLabel: "1 project hidden to the right. Scroll to reveal it.",
    disableAtEnds: true,
  },
  totalProjects: {
    enabled: true,
    label: "{count} projects",
    singleLabel: "1 project",
  },
};
