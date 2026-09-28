// Site identity, navigation links and profile actions. Project browser settings: projects.js.
export const siteSettings = [
  {
    "id": "site",
    "enabled": true,
    "name": "Gopinath S",
    "headerTitle": "Gameplay Programmer",
    "role": "Gameplay Programmer",
    "shortRole": "Gameplay systems · technical problem solving",
    "metaDescription": "Game Programmer portfolio",
    "navigation": [
      {
        "id": "profile",
        "enabled": true,
        "label": "Profile",
        "target": "#profile"
      },
      {
        "id": "projects",
        "enabled": true,
        "label": "Projects",
        "target": "#projects"
      },
      {
        "id": "skills",
        "enabled": true,
        "label": "Skills",
        "target": "#skills"
      },
      {
        "id": "certificates",
        "enabled": true,
        "label": "Certificates",
        "target": "#certificates"
      },
      {
        "id": "contact",
        "enabled": true,
        "label": "Contact",
        "target": "#contact-form"
      }
    ],
    "profileActions": [
      {
        "id": "projects",
        "enabled": true,
        "label": "Explore projects",
        "href": "#projects",
        "background": "var(--accent)",
        "textColor": "#061020",
        "borderColor": "var(--accent)",
        "hoverBackground": "var(--signal)",
        "hoverBorderColor": "var(--signal)"
      },
      {
        "id": "resume",
        "enabled": true,
        "label": "Download resume",
        "href": "./assets/resume/Gopinath_S_Gameplay_Programmer_Resume.pdf",
        "download": true,
        "background": "color-mix(in srgb, var(--surface) 80%, transparent)",
        "textColor": "var(--text)",
        "borderColor": "var(--line)",
        "hoverBackground": "var(--surface-raised)"
      }
    ],
    "footer": {
      "enabled": true,
      "text": "© 2026 Gopinath S. All rights reserved.",
      "style": {
        "fontSize": "0.78rem",
        "fontFamily": "DM Mono",
        "color": "var(--muted)"
      }
    }
  }
];
