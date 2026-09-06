// Every visible item is an object with an `enabled` switch. Add, remove, or edit
// objects here without touching the rendering code.
export const siteSettings = [
  {
    id: "site",
    enabled: true,
    name: "Gopinath S",
    headerTitle: "Gameplay Programmer",
    role: "Gameplay Programmer",
    shortRole: "Gameplay systems · technical problem solving",
    metaDescription: "Game Programmer portfolio",
    navigation: [
      { id: "profile", enabled: true, label: "Profile", target: "#profile" },
      { id: "projects", enabled: true, label: "Projects", target: "#projects" },
      { id: "skills", enabled: true, label: "Skills", target: "#skills" },
      { id: "certificates", enabled: true, label: "Certificates", target: "#certificates" },
      { id: "contact", enabled: true, label: "Contact", target: "#contact" },
    ],
    // Add, remove, or restyle any profile action here. `href` supports page
    // anchors, website links, PDFs, and downloadable files. Use `download`
    // for a file download and `newTab` for an external destination.
    profileActions: [
      {
        id: "projects",
        enabled: true,
        label: "Explore projects",
        href: "#projects",
        background: "var(--accent)",
        textColor: "#061020",
        borderColor: "var(--accent)",
        hoverBackground: "var(--signal)",
        hoverBorderColor: "var(--signal)",
      },
      {
        id: "resume",
        enabled: true,
        label: "Download resume",
        href: "./assets/resume/your-resume.pdf",
        download: true,
        background: "color-mix(in srgb, var(--surface) 80%, transparent)",
        textColor: "var(--text)",
        borderColor: "var(--line)",
        hoverBackground: "var(--surface-raised)",
      },
    ],
    projectQuickBar: {
      enabled: true,
      label: "Projects",
      previousLabel: "Previous projects",
      nextLabel: "Next projects",
    },
    footer: {
      enabled: true,
      text: "@ 2026 Gopinath S. All rights reserved.",
      style: { fontSize: "0.78rem", fontFamily: "DM Mono", color: "var(--muted)" },
    },
  },
];
