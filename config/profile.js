export const profileWidgets = [
  {
    id: "profile",
    enabled: true,
    eyebrow: "PROFILE / 01",
    title: "Gopinath S",
    role: "Gameplay Programmer",
    description: "",
    centered: true,
    fitViewport: true,
    welcome: {
      enabled: true,
      background: "#050d17",
      accent: "#21bfff",
      panelBackground: "#071321e8",
      panelBorder: "#21445e",
      decorations: { enabled: true, opacity: 0.5 },
      quickLinks: {
        enabled: true,
        title: "Quick links",
        maxWidth: "28rem",
        items: [
          { enabled: true, label: "GitHub", icon: "github", url: "https://github.com/GOPI5757" },
          { enabled: true, label: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/gopinath-s-5b994b32b/" },
          { enabled: true, label: "itch.io", icon: "itch", url: "https://gopi5757.itch.io/" },
        ]
      },
      scrollCue: { enabled: true, label: "Scroll", target: "#projects" }
    },
    tags: [
      { id: "unreal", enabled: true, label: "Unreal Engine · C++" },
      { id: "unity", enabled: true, label: "Unity · C#" },
      { id: "systems", enabled: true, label: "Gameplay systems" },
      { id: "problem-solving", enabled: true, label: "Problem solving" },
    ],
    style: {
      title: { fontSize: "clamp(3rem, 6.5vw, 6.2rem)", fontFamily: "Space Grotesk", color: "var(--text)" },
      description: { fontSize: "clamp(1.125rem, 1.6vw, 1.35rem)", fontFamily: "Manrope", color: "#dce6f5" },
    },
  },
];

