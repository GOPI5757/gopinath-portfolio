// Resume buttons share the existing PDF; replace this single path to update all of them.
export const resumeSettings = {
  enabled: true,
  href: "./assets/resume/Gopinath_S_Gameplay_Programmer_Resume.pdf",
  viewLabel: "View resume", downloadLabel: "Download resume",
  headerViewLabel: "Resume", headerDownloadLabel: "Download",
  headerDownloadShortLabel: "↓",
  suppressLegacyProfileResume: true,
  profile: { enabled: false, showView: true, showDownload: true, first: true },
  header: { enabled: true, showView: true, showDownload: true },
  accent: "var(--signal)", textColor: "#061020",
};

// This is a featured work-in-progress link, not a live stream or automatic status feed.
export const liveProjectSettings = {
  enabled: true, projectId: "ren-path-of-destiny",
  label: "IN DEVELOPMENT", labelColor: "#ff6670", linkLabel: "View project",
  fullWidth: true, avoidContact: true,
  showImage: true, showEngine: true, showLanguage: true, showFormat: true,
  imageFit: "contain", imageWidth: "4.5rem", accent: "var(--signal)",
  // Empty values use the selected project's configuration.
  title: "", engine: "", language: "", format: "", image: "", description: "",
};

export const videoPresentation = {
  // "youtube" = real video thumbnail; "project" = project's cover; "custom" = video.poster.
  thumbnailSource: "youtube",
  posterFit: "contain", // Fully visible, including portrait images. "cover" may crop.
  aspectRatio: "16 / 9", background: "#070b16",
  // Each video can override thumbnailSource, posterFit and aspectRatio in config/projects.js.
};
