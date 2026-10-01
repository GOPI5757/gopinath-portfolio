// Site-wide responsiveness, profile video and loading. Project settings: projects.js.
export const experience = {
  "navigation": {
    "menuMaxWidth": 1100,
    "mobileSingleRow": false,
    "mobileHeaderMaxWidth": 760,
    "mobileControlsLabel": "Header actions — swipe left or right for more"
  },
  "contact": {
    "placement": "auto",
    "mobileMaxWidth": 760,
    "shortMaxHeight": 520,
    "panelWidth": "13rem",
    "topOffset": "7.25rem",
    "avoidLiveProject": true,
    "liveProjectGap": 12,
    "initiallyCollapsed": false,
    "alwaysOpenOnMobile": true,
    "reserveContentSpace": false,
    "adjustContentAroundPanel": true,
    "contentGap": 18,
    "minContentWidth": 320,
    "showMobileScrollHint": true,
    "mobileScrollHint": "Swipe for more contacts",
    "matchProjectBackground": false
  },
  "profileVideo": {
    "enabled": true,
    "autoplay": true,
    "showPauseButton": false,
    "edgeBlend": {
      "enabled": true,
      "width": 0.12,
      "background": "var(--background)"
    },
    "overlay": {
      "enabled": true,
      "background": ["#070d18", "#070e18", "#070d18"],
      "opacity": 0.9925,
      "angle": 45
    },
    "pauseLabel": "Pause background",
    "playLabel": "Play background",
    "respectReducedMotion": true,
    "respectDataSaver": true,
    "pauseWhenOffscreen": true,
    "loadDelayMs": 350,
    "desktopMinHeight": "38rem",
    "mobileMinHeight": "48rem",
    "mobileMaxWidth": 600,
    "portraitMaxRatio": 0.82,
    "squareMaxRatio": 1.35,
    "objectFit": "contain",
    "overlayDesktop": "linear-gradient(90deg,rgba(4,9,18,.94),rgba(4,9,18,.70) 35%,rgba(4,9,18,.12) 78%)",
    "overlayPortrait": "linear-gradient(180deg,rgba(4,9,18,.96),rgba(4,9,18,.70) 38%,rgba(4,9,18,.05) 65%,rgba(4,9,18,.30))",
    "sources": {
      "desktop": {
        "src": "assets/video/profile-desktop.mp4",
        "poster": "assets/video/poster-desktop.jpg"
      },
      "tablet": {
        "src": "assets/video/profile-tablet.mp4",
        "poster": "assets/video/poster-tablet.jpg"
      },
      "mobile": {
        "src": "assets/video/profile-mobile.mp4",
        "poster": "assets/video/poster-mobile.jpg"
      }
    }
  },
  "performance": {
    "responsiveImages": true,
    "lazyImages": true,
    "imageRootMargin": "180px",
    "imageSizes": {
      "browser": "240px",
      "projectCard": "(max-width:760px) 45vw, (max-width:1100px) 30vw, 300px",
      "detail": "(max-width:760px) 94vw, 900px"
    },
    "imageQualityNote": "Variants are generated in assets/images. Custom image paths also work without a manifest entry.",
    "clickToLoadYouTube": true,
    "playVideoLabel": "Play video",
    "imageErrorLabel": "Image unavailable",
    "watchLinkLabel": "Watch on YouTube ↗"
  },
  "customCSS": ""
};
