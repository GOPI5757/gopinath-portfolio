import { experience } from "../config/experience.js";
import { applyExperience, attachProfileVideo, disposeRoute, onRouteDispose } from "./experience.js";
import { siteSettings } from "../config/site.js";
import { portfolioThemes } from "../config/theme.js";
import { introWidgets } from "../config/intro.js";
import { profileWidgets } from "../config/profile.js";
import { projectCategories, projectItems, projectSectionWidgets } from "../config/projects.js";
import { skillGroups } from "../config/skills.js";
import { certificateWidgets } from "../config/certificates.js";
import { contactWidgets } from "../config/contact.js";
import { announce, applyTextStyle, byId, el, enabled, first, hasValue, isInternalTarget, scrollToTarget, textElement, visible } from "./utils.js";
import { eyebrow, renderCarousel, renderChip, renderDocumentGroup, renderImage, renderTechnicalBlock, renderVideo, renderDocumentSection, sectionHeading } from "./renderers.js";

const site = first(siteSettings) || {};
const root = document.querySelector("#site-shell");
let projectQuickBarCollapsed = site.projectQuickBar?.initiallyCollapsed !== false;
let contactRailCollapsed = experience.contact.initiallyCollapsed;

function applyPortfolioTheme() {
  const theme = first(portfolioThemes);
  if (!theme) return;
  Object.entries(theme.colors || {}).forEach(([key, value]) => document.documentElement.style.setProperty(`--${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`, value));
  Object.entries(theme.fonts || {}).forEach(([key, value]) => document.documentElement.style.setProperty(`--font-${key}`, value));
  if (hasValue(site.metaDescription)) document.querySelector('meta[name="description"]')?.setAttribute("content", site.metaDescription);
  document.title = site.name ? `${site.name} | ${site.role || "Portfolio"}` : "Game Programmer Portfolio";
}

function brand() {
  return el("a", { className: "brand", attrs: { href: "#top", "aria-label": "Return to portfolio home" } }, [
    el("span", { className: "brand-name", text: site.name || "Portfolio" }),
    hasValue(site.headerTitle) ? el("span", { className: "brand-title", text: site.headerTitle }) : null,
  ]);
}

function navigateTo(target) {
  if (!isInternalTarget(target)) return;
  if (location.hash === target) {
    renderRoute();
    requestAnimationFrame(() => scrollToTarget(target));
  } else {
    location.hash = target;
  }
}

function renderHeader() {
  const navId = "main-navigation";
  const navLinks = visible(site.navigation).filter(item => item.target !== "#certificates" || visible(first(certificateWidgets)?.items || []).some(item => hasValue(item.image))).map((item) => el("a", {
    className: "nav-link",
    text: item.label,
    attrs: { href: item.target },
    on: { click: (event) => {
      if (item.target === "#contact") {
        const rail = document.querySelector(".contact-rail");
        const railToggle = rail?.querySelector(".contact-rail-toggle");
        if (rail && railToggle) {
          event.preventDefault();
          if (rail.classList.contains("is-collapsed")) railToggle.click();
        }
      }
      document.querySelector(".site-header")?.classList.remove("nav-open");
      const menu = document.querySelector(".menu-toggle"); if(menu){menu.setAttribute("aria-expanded","false");menu.textContent="Menu";}
    } },
  }));
  const nav = el("nav", { className: "site-nav", attrs: { id: navId, "aria-label": "Main navigation" } }, navLinks);
  const menuButton = el("button", {
    className: "menu-toggle",
    text: "Menu",
    attrs: { type: "button", "aria-expanded": "false", "aria-controls": navId },
  });
  const header = el("header", { className: "site-header" }, [brand(), el("div", {className:"header-actions"}, [site.projectQuickBar?.enabled !== false && site.projectQuickBar?.mode === "drawer" ? el("button", {className:"browse-projects-button",text:site.projectQuickBar.buttonLabel || "Browse projects",attrs:{type:"button","aria-haspopup":"dialog"},on:{click:()=>document.querySelector("#projects-drawer")?.showModal()}}) : null, menuButton, nav])]);
  if (site.projectQuickBar?.enabled !== false && site.projectQuickBar?.mode === "bar") {
    const restore = el("button", {
      className: "project-quickbar-restore",
      text: `⌄ ${site.projectQuickBar.restoreLabel || "Projects"}`,
      attrs: {type: "button", hidden: !projectQuickBarCollapsed, "aria-expanded": "false", "aria-controls": "project-quickbar"},
      on: {click: () => document.querySelector(".project-quickbar-toggle")?.click()},
    });
    header.querySelector(".header-actions").prepend(restore);
  }
  menuButton.addEventListener("click", () => {
    const expanded = header.classList.toggle("nav-open");
    menuButton.setAttribute("aria-expanded", String(expanded));
    menuButton.textContent = expanded ? "Close" : "Menu";
  });
  return header;
}

function renderProjectQuickBar() {
  const config=site.projectQuickBar || {};
  if(config.enabled===false)return null;
  if(config.mode!=="drawer")return renderLegacyProjectQuickBar();
  const dialog=el("dialog",{className:"projects-drawer",attrs:{id:"projects-drawer","aria-labelledby":"drawer-title"}});
  const close=el("button",{className:"drawer-close",text:config.closeLabel || "Close",attrs:{type:"button"},on:{click:()=>dialog.close()}});
  const items=visible(projectItems).map(project=>el("a",{className:"drawer-project",attrs:{href:`#project/${project.id}`},on:{click:()=>dialog.close()}},[renderImage(project.coverImage,"","drawer-cover"),el("strong",{text:project.title}),el("span",{className:"drawer-meta",text:`${project.engine} · ${project.language}`})]));
  dialog.append(el("div",{className:"drawer-heading"},[el("h2",{text:config.label || "Projects",attrs:{id:"drawer-title"}}),close]),el("div",{className:"drawer-projects"},items));
  dialog.addEventListener("click",event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
  return dialog;
}

function renderLegacyProjectQuickBar() {
  const config = site.projectQuickBar || {};
  const projects = visible(projectItems).filter((project) => hasValue(project.title));
  if (config.enabled === false || !projects.length) return null;

  const trackId = "project-quickbar-track";
  const bar = el("aside", {
    className: "project-quickbar",
    attrs: { id: "project-quickbar", "aria-label": config.label || "Projects" },
  });
  const track = el("div", {
    className: "project-quickbar-track",
    attrs: { id: trackId, tabindex: "0", "aria-label": "Quick project access" },
  });
  const toggleIcon = el("span", { className: "project-quickbar-toggle-icon", attrs: { "aria-hidden": "true" } });
  const toggle = el("button", {
    className: "project-quickbar-toggle",
    attrs: { type: "button", "aria-controls": trackId },
  }, [toggleIcon, el("span", { text: config.minimizeLabel || "Minimize" })]);

  projects.forEach((project) => {
    const link = el("a", {
      className: "project-quickbar-item",
      attrs: { href: `#project/${project.id}`, "aria-label": `Open ${project.title}`, "aria-current": currentProjectId() === project.id ? "page" : undefined },
    });
    const image = renderImage(project.coverImage, "", "project-quickbar-image");
    if (image) link.append(el("span", { className: "project-quickbar-cover", attrs: { "aria-hidden": "true" } }, image));
    link.append(el("span", { className: "project-quickbar-title", text: project.title }));
    track.append(link);
  });

  const scrollTrack = (direction) => {
    track.scrollBy({
      left: direction * Math.max(track.clientWidth * 0.72, 220),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };
  const previous = el("button", {
    className: "project-quickbar-scroll project-quickbar-scroll--previous",
    text: "←",
    attrs: { type: "button", "aria-label": config.previousLabel || "Previous projects" },
    on: { click: () => scrollTrack(-1) },
  });
  const next = el("button", {
    className: "project-quickbar-scroll project-quickbar-scroll--next",
    text: "→",
    attrs: { type: "button", "aria-label": config.nextLabel || "Next projects" },
    on: { click: () => scrollTrack(1) },
  });

  const updateCollapsedState = () => {
    bar.classList.toggle("is-collapsed", projectQuickBarCollapsed);
    toggle.setAttribute("aria-expanded", String(!projectQuickBarCollapsed));
    toggleIcon.textContent = "⌃";
    bar.hidden = projectQuickBarCollapsed;
    const restore = document.querySelector(".project-quickbar-restore");
    if (restore) restore.hidden = !projectQuickBarCollapsed;
    document.documentElement.classList.toggle("projects-minimized", projectQuickBarCollapsed);
  };
  toggle.addEventListener("click", () => {
    projectQuickBarCollapsed = !projectQuickBarCollapsed;
    updateCollapsedState();
    if (projectQuickBarCollapsed) document.querySelector(".project-quickbar-restore")?.focus({preventScroll: true});
    else toggle.focus({preventScroll: true});
  });
  updateCollapsedState();

  bar.append(el("div", { className: "project-quickbar-inner" }, [toggle, previous, track, next]));
  return bar;
}

function renderFooter() {
  const footer = site.footer;
  if (!footer?.enabled) return null;
  return el("footer", { className: "site-footer" }, [applyTextStyle(el("p", { text: footer.text || "" }), footer.style)]);
}

function renderProfileSection() {
  const profile = byId(profileWidgets, "profile");
  if (!enabled(profile)) return null;
  const tags = visible(profile.tags).map((tag) => renderChip(tag.label));
  const copy = el("div", { className: "profile-copy" }, [
    eyebrow(profile.eyebrow),
    textElement("h1", profile.title || "", "hero-title", profile.style?.title),
    hasValue(profile.role || site.role) ? el("p", { className: "hero-role", text: profile.role || site.role }) : null,
    hasValue(profile.description) ? textElement("p", profile.description, "profile-description", profile.style?.description) : null,
    tags.length ? el("div", { className: "chip-row", attrs: { "aria-label": "Core areas" } }, tags) : null,
    renderProfileActions(),
  ]);
  const signal = el("aside", { className: "profile-signal", attrs: { "aria-label": "Portfolio focus" } }, [
    el("span", { className: "signal-pulse", attrs: { "aria-hidden": "true" } }),
    el("p", { className: "signal-label", text: "CURRENT FOCUS" }),
    el("p", { className: "signal-value", text: site.shortRole || "Game Programmer" }),
    el("div", { className: "signal-lines", attrs: { "aria-hidden": "true" } }),
  ]);
  copy.querySelector("h1").id = "profile-title";
  const section=el("section", { className: "profile-section section-shell", attrs: { id: "profile", "aria-labelledby": "profile-title" } }, [el("div", { className: "profile-grid" }, [copy, signal])]);
  attachProfileVideo(section);
  return section;
}

function renderProfileActions() {
  const legacyActions = [
    site.primaryAction ? { ...site.primaryAction, href: site.primaryAction.href || site.primaryAction.target } : null,
    site.resumeAction,
  ].filter(Boolean);
  const actions = visible(Array.isArray(site.profileActions) ? site.profileActions : legacyActions)
    .filter((action) => hasValue(action.href) && hasValue(action.label))
    .map((action) => {
      const style = {};
      if (hasValue(action.background)) style["--profile-action-background"] = action.background;
      if (hasValue(action.textColor)) style["--profile-action-color"] = action.textColor;
      if (hasValue(action.borderColor)) style["--profile-action-border"] = action.borderColor;
      if (hasValue(action.hoverBackground)) style["--profile-action-hover-background"] = action.hoverBackground;
      if (hasValue(action.hoverColor)) style["--profile-action-hover-color"] = action.hoverColor;
      if (hasValue(action.hoverBorderColor)) style["--profile-action-hover-border"] = action.hoverBorderColor;
      const link = el("a", {
        className: "profile-action",
        text: action.label,
        attrs: {
          href: action.href,
          download: action.download ? (typeof action.download === "string" ? action.download : "") : undefined,
          target: action.newTab ? "_blank" : undefined,
          rel: action.newTab ? "noreferrer" : undefined,
        },
      });
      Object.entries(style).forEach(([property, value]) => link.style.setProperty(property, value));
      return link;
    });
  return actions.length ? el("div", { className: "action-row" }, actions) : null;
}

function renderJourneySection() {
  const journey = byId(profileWidgets, "journey-strip");
  const steps = visible(journey?.steps);
  if (!enabled(journey) || !steps.length) return null;
  const items = steps.map((step, index) => el("article", { className: "journey-step" }, [
    el("span", { className: "journey-index", text: String(index + 1).padStart(2, "0") }),
    el("h3", { className: "journey-label", text: step.label }),
    el("p", { className: "journey-detail", text: step.detail }),
  ]));
  return el("section", { className: "journey-section section-shell section-shell--tight", attrs: { "aria-labelledby": "journey-strip-title" } }, [
    sectionHeading(journey, { compact: true }),
    el("div", { className: "journey-grid" }, items),
  ]);
}

function renderProjectsSection() {
  const section = first(projectSectionWidgets);
  if (!enabled(section)) return null;

  // Only categories that are enabled and contain at least one enabled project
  // are shown. The project data remains fully controlled by config/projects.js.
  const availableCategories = visible(projectCategories)
    .map((category) => ({
      category,
      projects: visible(projectItems).filter((project) => project.categoryIds?.includes(category.id)),
    }))
    .filter(({ projects }) => projects.length);

  if (!availableCategories.length) return null;

  let activeIndex = 0;

  const categoryButtons = el("div", {
    className: "project-category-tabs",
    attrs: {
      role: "tablist",
      "aria-label": "Project categories",
    },
  });

  const projectPanel = el("div", {
    className: "project-category-panel",
    attrs: {
      role: "tabpanel",
      tabindex: "0",
    },
  });

  const categorySelect = el("select", {
    className: "project-category-select-control",
    attrs: {
      id: "project-category-select",
      "aria-label": "Select project category",
    },
    on: {
      change: (event) => setActiveCategory(Number(event.currentTarget.value), true),
    },
  }, availableCategories.map(({ category }, index) =>
    el("option", {
      text: `${String(index + 1).padStart(2, "0")} · ${category.title}`,
      attrs: { value: String(index) },
    })
  ));

  const categorySelectControl = el("div", { className: "project-category-select" }, [
    el("label", {
      className: "project-category-select-label",
      text: "Project category",
      attrs: { for: "project-category-select" },
    }),
    categorySelect,
  ]);

  const tabs = availableCategories.map(({ category }, index) => {
    const button = el("button", {
      className: "project-category-tab",
      style: { "--category-accent": category.accent || "var(--accent)" },
      attrs: {
        type: "button",
        role: "tab",
        id: `project-tab-${category.id}`,
        "aria-controls": `project-panel-${category.id}`,
        "aria-selected": "false",
        tabindex: "-1",
      },
      on: {
        click: () => setActiveCategory(index, true),
      },
    });

    button.append(
      el("span", {
        className: "category-tab-index",
        text: String(index + 1).padStart(2, "0"),
        attrs: { "aria-hidden": "true" },
      }),
      el("span", {
        className: "category-tab-copy",
      }, [
        el("span", { className: "category-tab-title", text: category.title }),
        hasValue(category.description)
          ? el("span", { className: "category-tab-description", text: category.description })
          : null,
      ]),
      el("span", {
        className: "category-tab-arrow",
        text: "→",
        attrs: { "aria-hidden": "true" },
      })
    );

    categoryButtons.append(button);
    return button;
  });

  function setActiveCategory(index, animate = false) {
    activeIndex = (index + availableCategories.length) % availableCategories.length;

    const { category, projects } = availableCategories[activeIndex];
    const accent = category.accent || "var(--accent)";

    tabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === activeIndex;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
      tab.setAttribute("tabindex", selected ? "0" : "-1");
    });
    categorySelect.value = String(activeIndex);

    projectPanel.style.setProperty("--category-accent", accent);

    projectPanel.setAttribute("aria-labelledby", `project-tab-${category.id}`);
    projectPanel.id = `project-panel-${category.id}`;

    if (animate) {
      projectPanel.classList.remove("is-switching");
      void projectPanel.offsetWidth;
      projectPanel.classList.add("is-switching");
    }

    const heading = el("div", { className: "category-heading" }, [
      el("p", {
        className: "category-kicker",
        text: `GROUP_${category.id.toUpperCase()}`,
      }),
      el("h3", {
        className: "category-title",
        text: category.title,
      }),
      hasValue(category.description)
        ? el("p", { className: "category-description", text: category.description })
        : null,
    ]);

    const nodes = projects.map((project, projectIndex) =>
      renderProjectNode(project, projectIndex)
    );

    projectPanel.replaceChildren(
      heading,
      el("div", { className: "project-graph" }, nodes)
    );
  }

  categoryButtons.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();

    let nextIndex = activeIndex;
    if (event.key === "ArrowRight") nextIndex += 1;
    if (event.key === "ArrowLeft") nextIndex -= 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = availableCategories.length - 1;

    setActiveCategory(nextIndex, true);
    tabs[activeIndex].focus();
  });

  setActiveCategory(0);

  return el("section", {
    className: "projects-section section-shell",
    attrs: {
      id: "projects",
      "aria-labelledby": "projects-section-title",
    },
  }, [
    sectionHeading(section),
    categorySelectControl,
    categoryButtons,
    projectPanel,
  ]);
}

function renderProjectNode(project, index) {
  const node = el("button", {
    className: "project-node",
    attrs: { type: "button", "aria-label": `Open ${project.title}` },
    style: { "--node-accent": project.theme?.accent || "var(--accent)", "--node-surface": project.theme?.surface || "var(--surface)" },
    on: { click: () => { location.hash = `#project/${project.id}`; } },
  });
  const cover = renderImage(project.coverImage, `${project.title} cover`, "project-node-image");
  if (cover) node.append(el("span", { className: "project-node-cover", attrs: { "aria-hidden": "true" } }, cover));
  node.append(
    el("span", { className: "node-pin node-pin--in", attrs: { "aria-hidden": "true" } }),
    el("span", { className: "node-pin node-pin--out", attrs: { "aria-hidden": "true" } }),
    el("span", { className: "node-index", text: String(index + 1).padStart(2, "0") }),
    el("span", { className: "node-label", text: project.nodeLabel || project.title }),
    el("span", { className: "node-title", text: project.title }),
    el("span", { className: "node-meta", text: [project.engine, project.language, project.platform].filter(Boolean).join(" · ") }),
    el("span", { className: "node-open", text: "Open project ↗" }),
  );
  return node;
}

function renderSkillsSection() {
  const groups = visible(skillGroups).map((group) => ({ ...group, skills: visible(group.skills) })).filter((group) => group.skills.length);
  if (!groups.length) return null;
  const heading = { id: "skills", eyebrow: "SKILLS / 03", title: "Systems, tools and foundations.", description: "A working set shaped by game development and software projects." };
  const groupElements = groups.map((group) => el("article", { className: "skill-group" }, [
    el("div", { className: "skill-group-heading" }, [el("h3", { className: "skill-group-title", text: group.title }), hasValue(group.description) ? el("p", { className: "skill-group-description", text: group.description }) : null]),
    el("ul", { className: "skill-list" }, group.skills.map((skill) => el("li", { className: "skill-item" }, [el("h4", { className: "skill-name", text: skill.name }), hasValue(skill.description) ? el("p", { className: "skill-description", text: skill.description }) : null]))),
  ]));
  return el("section", { className: "skills-section section-shell", attrs: { id: "skills", "aria-labelledby": "skills-title" } }, [sectionHeading(heading), el("div", { className: "skills-grid" }, groupElements)]);
}

function renderCertificateSection() {
  const widget = first(certificateWidgets);
  const items = visible(widget?.items).filter((item) => hasValue(item.image));
  if (!enabled(widget) || !items.length) return null;
  const carousel = renderCarousel(items, {
    label: "Certificates",
    className: "carousel certificate-carousel",
    renderSlide: (item) => {
      const image = renderImage(item.image, item.alt || item.title, "certificate-image");
      const detail = el("div", { className: "certificate-copy" }, [el("h3", { text: item.title || "Certificate" }), hasValue(item.issuer) ? el("p", { text: item.issuer }) : null]);
      return hasValue(item.credentialUrl) ? el("a", { className: "certificate-link", attrs: { href: item.credentialUrl, target: "_blank", rel: "noreferrer" } }, [image, detail]) : el("div", { className: "certificate-link" }, [image, detail]);
    },
  });
  return el("section", { className: "certificates-section section-shell", attrs: { id: "certificates", "aria-labelledby": "certificates-title" } }, [sectionHeading(widget), carousel]);
}

function renderContactRail() {
  const widget = first(contactWidgets);
  const config = widget?.bar || {};
  if (!enabled(widget) || config.enabled === false) return null;

  const directDetails = visible(widget.directDetails).filter((detail) => hasValue(detail.value));
  const socials = visible(widget.socialLinks).filter((link) => hasValue(link.url));
  if (!directDetails.length && !socials.length) return null;

  const panelId = "contact-rail-panel";
  const rail = el("aside", { className: "contact-rail", attrs: { id: "contact", "aria-label": config.label || "Contact" } });
  const panel = el("div", { className: "contact-rail-panel", attrs: { id: panelId } }, [
    el("p", { className: "contact-rail-heading", text: config.label || "Contact" }),
    directDetails.length ? el("div", { className: "contact-rail-direct-list" }, directDetails.map((detail) =>
      el("a", {
        className: "contact-rail-direct",
        attrs: { href: `${detail.href || ""}${detail.value}` },
      }, [el("span", { text: detail.label }), el("strong", { text: detail.value })])
    )) : null,
    socials.length ? el("div", { className: "contact-rail-social-list", attrs: { "aria-label": "Social links" } }, socials.map((link) =>
      el("a", {
        className: "contact-rail-social",
        text: link.label,
        attrs: { href: link.url, target: "_blank", rel: "noreferrer" },
      })
    )) : null,
  ]);
  const icon = el("span", { className: "contact-rail-toggle-icon", attrs: { "aria-hidden": "true" } });
  const toggle = el("button", {
    className: "contact-rail-toggle",
    attrs: { type: "button", "aria-controls": panelId },
  }, [icon, el("span", { text: config.label || "Contact" })]);
  const mobileTrackId = "contact-rail-mobile-track";
  const mobileTrack = el("div", {
    className: "contact-rail-mobile-track",
    attrs: { id: mobileTrackId, tabindex: "0", "aria-label": "Swipe through contact details and social links" },
  });
  directDetails.forEach((detail) => {
    mobileTrack.append(el("a", {
      className: "contact-rail-mobile-item",
      attrs: { href: `${detail.href || ""}${detail.value}` },
    }, [el("span", { className: "contact-rail-mobile-item-label", text: detail.label }), el("strong", { text: detail.value })]));
  });
  socials.forEach((link) => {
    mobileTrack.append(el("a", {
      className: "contact-rail-mobile-item contact-rail-mobile-social",
      text: link.label,
      attrs: { href: link.url, target: "_blank", rel: "noreferrer" },
    }));
  });
  const scrollMobileTrack = (direction) => {
    mobileTrack.scrollBy({
      left: direction * Math.max(mobileTrack.clientWidth * 0.7, 180),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };
  const mobilePrevious = el("button", {
    className: "contact-rail-mobile-scroll",
    text: "←",
    attrs: { type: "button", "aria-label": "Previous contact details" },
    on: { click: () => scrollMobileTrack(-1) },
  });
  const mobileNext = el("button", {
    className: "contact-rail-mobile-scroll",
    text: "→",
    attrs: { type: "button", "aria-label": "Next contact details" },
    on: { click: () => scrollMobileTrack(1) },
  });
  const mobileToggleIcon = el("span", { className: "contact-rail-mobile-toggle-icon", attrs: { "aria-hidden": "true" } });
  const mobileToggle = el("button", {
    className: "contact-rail-mobile-toggle",
    attrs: { type: "button", "aria-controls": mobileTrackId },
  }, [mobileToggleIcon, el("span", { text: config.label || "Contact" })]);
  const mobileStrip = el("div", { className: "contact-rail-mobile-strip" }, [
    mobileToggle,
    mobilePrevious,
    mobileTrack,
    mobileNext,
  ]);
  const updateCollapsedState = () => {
    rail.classList.toggle("is-collapsed", contactRailCollapsed);
    document.documentElement.classList.toggle("contact-collapsed",contactRailCollapsed);
    toggle.setAttribute("aria-expanded", String(!contactRailCollapsed));
    icon.textContent = contactRailCollapsed ? "⌃" : "⌄";
    mobileToggle.setAttribute("aria-expanded", String(!contactRailCollapsed));
    mobileToggleIcon.textContent = contactRailCollapsed ? "⌃" : "⌄";
  };
  const toggleContactRail = () => {
    contactRailCollapsed = !contactRailCollapsed;
    updateCollapsedState();
  };
  toggle.addEventListener("click", toggleContactRail);
  mobileToggle.addEventListener("click", toggleContactRail);
  updateCollapsedState();
  rail.append(panel, toggle, mobileStrip);
  return rail;
}

function mountContactRail() {
  const rail=renderContactRail();
  document.querySelector("#contact-rail-root")?.replaceChildren(...[rail].filter(Boolean));
  document.documentElement.classList.toggle("has-contact",!!rail);
}

function renderContactSection() {
  const widget = first(contactWidgets);
  if (!enabled(widget)) return null;
  const form = renderContactForm(widget.form);
  if (!form) return null;
  const email=widget.form?.recipientEmail || visible(widget.directDetails).find(detail=>detail.id==="email")?.value;
  return el("section", { className: "contact-section section-shell", attrs: { id: "contact-form", "aria-labelledby": "contact-title" } }, [sectionHeading(widget), email ? el("a",{className:"contact-direct-inline",text:email,attrs:{href:`mailto:${email}`}}) : null, widget.form?.enabled && widget.form?.deliveryMode === "mailto" ? el("p",{className:"contact-form-note",text:widget.form.explanation || ""}) : null, form]);
}

function renderContactForm(config) {
  const fields = visible(config?.fields);
  if (!enabled(config) || !fields.length) return null;
  const status = el("p", { className: "form-status", attrs: { role: "status" } });
  const fieldNodes = fields.map((field) => {
    const fieldId = `contact-${field.id}`;
    const control = field.type === "textarea"
      ? el("textarea", { className: "form-control", attrs: { id: fieldId, name: field.id, required: field.required, placeholder: field.placeholder, rows: "5" } })
      : el("input", { className: "form-control", attrs: { id: fieldId, name: field.id, type: field.type || "text", required: field.required, placeholder: field.placeholder } });
    return el("div", { className: "form-field" }, [el("label", { text: field.label, attrs: { for: fieldId } }), control]);
  });
  const form = el("form", { className: "contact-form", attrs: { novalidate: "" } }, [
    hasValue(config.title) ? el("h3", { className: "contact-form-title", text: config.title }) : null,
    ...fieldNodes,
    el("button", { className: "button button--primary", text: config.buttonLabel || "Send message", attrs: { type: "submit" } }),
    !hasValue(config.recipientEmail) ? el("p", { className: "form-config-note", text: "Add your email address in config/contact.js before publishing." }) : null,
    status,
  ]);
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = Object.fromEntries(new FormData(form).entries());
    if (!hasValue(config.recipientEmail)) {
      status.textContent = "A recipient email address has not been configured yet.";
      status.className = "form-status is-error";
      return;
    }
    if (config.deliveryMode === "endpoint") {
      try {
        status.textContent = "Sending…";
        const response = await fetch(config.endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
        if (!response.ok) throw new Error("Request failed");
        form.reset();
        status.textContent = "Message sent. Thank you.";
        status.className = "form-status is-success";
      } catch {
        status.textContent = "Message could not be sent. Please try the direct email link.";
        status.className = "form-status is-error";
      }
      return;
    }
    const subject = encodeURIComponent(`Portfolio message from ${values.name || "a visitor"}`);
    const body = encodeURIComponent(`Name: ${values.name || ""}\nEmail: ${values.email || ""}\n\n${values.message || ""}`);
    window.location.href = `mailto:${config.recipientEmail}?subject=${subject}&body=${body}`;
    status.textContent = config.successMessage || "Your email app should now be ready.";
    status.className = "form-status is-success";
  });
  return form;
}

function renderHome() {
  const main = el("main", { attrs: { id: "main-content", tabindex: "-1" } }, [
    renderProfileSection(),
    renderProjectsSection(),
    renderSkillsSection(),
    renderCertificateSection(),
    renderContactSection(),
  ]);
  root.replaceChildren(...[renderHeader(), renderProjectQuickBar(), main, renderFooter()].filter(Boolean));
  mountContactRail();
}

function renderEngineWorkVideos(project) {
  const videos = visible(project.engineWorkVideos);
  if (!videos.length) return null;

  const sectionNames = [...new Set(
    videos.flatMap((video) => Array.isArray(video.section) ? video.section : [])
      .filter(hasValue)
  )];

  const unsectionedVideos = videos.filter(
    (video) =>
      !Array.isArray(video.section) ||
      !video.section.some(hasValue)
  );

  // With zero or one unique section, keep the existing behavior and show every video.
  if (sectionNames.length <= 1) {
    const engineVideos = videos.map((video) => renderVideo({...video,poster:video.poster || project.coverImage}, "Engine-work video")).filter(Boolean);
    return engineVideos.length
      ? el("section", { className: "detail-section", attrs: { "aria-labelledby": "engine-videos-title" } }, [
          el("h2", { className: "detail-heading", text: "Engine-work videos", attrs: { id: "engine-videos-title" } }),
          el("div", { className: "video-grid" }, engineVideos),
        ])
      : null;
  }

  const sections = [...sectionNames];

  if (unsectionedVideos.length > 0) {
    sections.push("Other");
  }

  let activeSection = sectionNames[0];
  const tabs = el("div", {
    className: "engine-video-section-tabs",
    attrs: { role: "tablist", "aria-label": "Engine-work video sections" },
  });
  const videoGrid = el("div", { className: "video-grid" });

  // const renderSection = () => {
  //   videoGrid.replaceChildren(
  //     ...videos
  //       .filter((video) => Array.isArray(video.section) && video.section.includes(activeSection))
  //       .map((video) => renderVideo({...video,poster:video.poster || project.coverImage}, "Engine-work video"))
  //       .filter(Boolean)
  //   );
  // };

  const renderSection = () => {
    const filteredVideos =
      activeSection === "Other"
        ? unsectionedVideos
        : videos.filter(
            (video) =>
              Array.isArray(video.section) &&
              video.section.includes(activeSection)
          );

    videoGrid.replaceChildren(
      ...filteredVideos
        .map((video) => renderVideo({...video,poster:video.poster || project.coverImage}, "Engine-work video"))
        .filter(Boolean)
    );
  };

  sections.forEach((sectionName) => {
    const tab = el("button", {
      className: "engine-video-section-tab",
      text: sectionName,
      attrs: { type: "button", role: "tab", "aria-selected": String(sectionName === activeSection) },
      on: {
        click: () => {
          activeSection = sectionName;
          tabs.querySelectorAll(".engine-video-section-tab").forEach((button) => {
            const selected = button.textContent === activeSection;
            button.classList.toggle("is-active", selected);
            button.setAttribute("aria-selected", String(selected));
          });
          renderSection();
        },
      },
    });
    tab.classList.toggle("is-active", sectionName === activeSection);
    tabs.append(tab);
  });

  renderSection();

  return el("section", { className: "detail-section", attrs: { "aria-labelledby": "engine-videos-title" } }, [
    el("h2", { className: "detail-heading", text: "Engine-work videos", attrs: { id: "engine-videos-title" } }),
    tabs,
    videoGrid,
  ]);
}

function jumpToTopImmediately() {
  const documentElement = document.documentElement;
  const inlineScrollBehavior = documentElement.style.scrollBehavior;
  documentElement.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  requestAnimationFrame(() => {
    documentElement.style.scrollBehavior = inlineScrollBehavior;
  });
}

function projectBackdropSources(project) {
  const configuredSources = Array.isArray(project.backgroundImages)
    ? project.backgroundImages
        .filter((image) => typeof image === "string" ? hasValue(image) : image?.enabled !== false && hasValue(image?.src))
        .map((image) => typeof image === "string" ? image : image.src)
    : [];
  const sources = configuredSources.length ? configuredSources : [project.coverImage].filter(hasValue);
  return [...new Set(sources)];
}

function seededRandom(seed) {
  let state = 2166136261;
  for (const character of seed) {
    state ^= character.charCodeAt(0);
    state = Math.imul(state, 16777619);
  }
  return () => {
    state += 0x6D2B79F5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function renderProjectBackground(project) {
  const uniqueSources = projectBackdropSources(project).slice(0, 16);
  if (!uniqueSources.length) return null;
  if(!experience.performance.decorativeProjectImages)return null;
  const overlayCount = Math.max(0,Math.min(15,experience.performance.maxDecorativeImages));
  const sources = Array.from({ length: overlayCount }, (_, index) => uniqueSources[index % uniqueSources.length]);

  const random = seededRandom(project.id || project.title || "project");
  const alignment = ["start", "center", "end"];
  const movement = () => `${(random() - 0.5).toFixed(2)}rem`;
  const overlays = sources.map((source, index) => {
    const overlay = el("div", { className: "project-background-overlay", attrs: { "aria-hidden": "true" } });

    overlay.style.setProperty("--project-overlay-width", `${Math.round(random() * 4 + 18)}rem`);
    overlay.style.setProperty("--project-overlay-opacity", (random() * 0.035 + 0.075).toFixed(3));
    overlay.style.setProperty("--project-overlay-rotation", `${((random() * 4) - 2).toFixed(2)}deg`);
    overlay.style.setProperty("--project-overlay-inline-align", alignment[Math.floor(random() * alignment.length)]);
    overlay.style.setProperty("--project-overlay-block-align", alignment[Math.floor(random() * alignment.length)]);
    overlay.style.setProperty("--project-overlay-enter-x", movement());
    overlay.style.setProperty("--project-overlay-enter-y", movement());
    overlay.style.setProperty("--project-overlay-drift-x", movement());
    overlay.style.setProperty("--project-overlay-drift-y", movement());
    overlay.style.setProperty("--project-overlay-exit-x", movement());
    overlay.style.setProperty("--project-overlay-exit-y", movement());
    overlay.style.setProperty("--project-overlay-duration", `${Math.round(random() * 6 + 12)}s`);
    overlay.style.setProperty("--project-overlay-delay", `${-(index * 1.15 + random() * 2).toFixed(2)}s`);

    const image = renderImage(source, "", "project-background-overlay-image");
    image?.addEventListener("error", () => overlay.remove());
    overlay.append(image);
    return overlay;
  });

  return el("div", { className: "project-background-overlays", attrs: { "aria-hidden": "true" } }, overlays);
}

function projectThemeStyle(theme = {}) {
  const backgroundColors = Array.isArray(theme.background)
    ? theme.background.filter(hasValue)
    : hasValue(theme.background)
      ? [theme.background]
      : [];
  const style = Object.fromEntries(
    Object.entries(theme)
      .filter(([key]) => key !== "background" && key !== "backgroundAngle")
      .map(([key, value]) => [`--project-${key}`, value])
  );

  if (backgroundColors.length === 1) {
    style["--project-background"] = backgroundColors[0];
  } else if (backgroundColors.length > 1) {
    const angle = hasValue(theme.backgroundAngle) ? theme.backgroundAngle : "135deg";
    style["--project-background"] = `linear-gradient(${angle}, ${backgroundColors.join(", ")})`;
  }

  return style;
}

function renderProjectDetail(project) {
  const technical = visible(project.technicalBlocks).map(renderTechnicalBlock).filter(Boolean);
  const documentSections = visible(project.documentSections).map(renderDocumentSection).filter(Boolean);
  const docs = visible(project.documentGroups).map(renderDocumentGroup).filter(Boolean);
  const images = visible(project.images).filter((image) => hasValue(image.src));
  const gameplayVideos = visible(project.gameplayVideos).map((video) => renderVideo({...video,poster:video.poster || project.coverImage}, "Gameplay video")).filter(Boolean);
  const engineVideosSection = renderEngineWorkVideos(project);
  const themeStyle = projectThemeStyle(project.theme);

  const facts = visible(project.facts).map((fact) => el("div", { className: "project-fact" }, [el("dt", { text: fact.label }), el("dd", { text: fact.value })]));
  const back = el("button", { className: "back-link", text: "← All projects", attrs: { type: "button" }, on: { click: () => { location.hash = "#projects"; } } });
  const intro = el("section", { className: "project-detail-hero", attrs: { "aria-labelledby": "project-title" } }, [
    back,
    eyebrow("PROJECT DETAIL"),
    el("p", { className: "project-status", text: project.status || "Project" }),
    el("h1", { className: "project-detail-title", text: project.title, attrs: { id: "project-title" } }),
    hasValue(project.description) ? el("p", { className: "project-detail-description", text: project.description }) : null,
    facts.length ? el("dl", { className: "project-facts" }, facts) : null,
  ]);
  const detailSections = [
    technical.length ? el("section", { className: "detail-section", attrs: { "aria-labelledby": "technical-title" } }, [el("h2", { className: "detail-heading", text: "Technical work", attrs: { id: "technical-title" } }), el("div", { className: "technical-list" }, technical)]) : null,
    images.length ? el("section", { className: "detail-section", attrs: { "aria-labelledby": "images-title" } }, [el("h2", { className: "detail-heading", text: "Gameplay images", attrs: { id: "images-title" } }), renderCarousel(images, { label: `${project.title} gameplay images`, className: "carousel image-carousel", renderSlide: (image) => el("figure", { className: "gameplay-image-figure" }, [renderImage(image.src, image.alt || "", "gameplay-image"), hasValue(image.caption) ? el("figcaption", { text: image.caption }) : null]) })]) : null,
    gameplayVideos.length ? el("section", { className: "detail-section", attrs: { "aria-labelledby": "gameplay-videos-title" } }, [el("h2", { className: "detail-heading", text: "Gameplay videos", attrs: { id: "gameplay-videos-title" } }), el("div", { className: "video-grid" }, gameplayVideos)]) : null,
    engineVideosSection,
  ].filter(Boolean);

  const documentContent = documentSections.length
    ? documentSections
    : docs.length
      ? [
          el("h2", { className: "detail-heading", text: "Documents", attrs: { id: "documents-title" } }),
          el("div", { className: "document-groups" }, docs),
        ]
      : [];

  const documentsSidebar = documentContent.length
    ? el("aside", {
        className: "project-documents-sidebar",
        attrs: documentSections.length
          ? { "aria-label": "Project documents and links" }
          : { "aria-labelledby": "documents-title" },
      }, documentContent)
    : null;
  
  if (documentsSidebar && experience.projectDetail.documents?.compact) {
    const links = [...documentsSidebar.querySelectorAll("a")];
    for (const link of links) {
      const groupTitle = link.closest(".document-group")?.querySelector("h3")?.textContent;
      if (groupTitle) link.title = groupTitle;
    }
    documentsSidebar.replaceChildren(
      el("h2", {className: "documents-toolbar-title", text: experience.projectDetail.documents.label, attrs: {id: "documents-title"}}),
      el("div", {className: "documents-toolbar-links"}, links)
    );
    documentsSidebar.classList.add("documents-toolbar");
    documentsSidebar.setAttribute("aria-labelledby", "documents-title");
  }

  // const main = el("main", { 
  //   className: "project-detail project-detail--enter", 
  //   attrs: { id: "main-content", tabindex: "-1" },
  //   style: themeStyle 
  // }, 
  //   [intro, ...detailSections]
  // );

  const main = el("main", { 
    className: "project-detail project-detail--enter", 
    attrs: { id: "main-content", tabindex: "-1" },
  }, [renderProjectBackground(project), ...(experience.projectDetail.documents?.compact && documentsSidebar ? [documentsSidebar] : []), intro, ...(() => {
    const sections = new Map(detailSections.map(section => [section.getAttribute("aria-labelledby").replace(/-title$/, ""),section]));
    if(documentsSidebar && !experience.projectDetail.documents?.compact) sections.set("documents",documentsSidebar);
    const result=[];
    for(const key of experience.projectDetail.sectionOrder || []){if(sections.has(key)){result.push(sections.get(key));sections.delete(key)}}
    return [...result,...sections.values()];
  })()]);

  Object.entries(themeStyle).forEach(([property, value]) => {
    main.style.setProperty(property, value);
  });

  jumpToTopImmediately();
  root.replaceChildren(...[renderHeader(), renderProjectQuickBar(), main, renderFooter()].filter(Boolean));
  mountContactRail();
  document.title = `${project.title} | ${site.name || "Portfolio"}`;
  requestAnimationFrame(() => main.focus({ preventScroll: true }));
}

function renderNotFoundProject() {
  const main = el("main", { className: "project-not-found section-shell", attrs: { id: "main-content", tabindex: "-1" } }, [
    eyebrow("PROJECT NOT FOUND"),
    el("h1", { className: "section-title", text: "This project is unavailable." }),
    el("p", { className: "section-description", text: "It may be disabled or the link may no longer exist." }),
    el("a", { className: "button button--primary", text: "Return to projects", attrs: { href: "#projects" } }),
  ]);
  root.replaceChildren(...[renderHeader(), renderProjectQuickBar(), main, renderFooter()].filter(Boolean));
  mountContactRail();
  jumpToTopImmediately();
}

function currentProjectId() {
  let hash; try { hash=decodeURIComponent(location.hash); } catch { return "invalid-link"; }
  const match = hash.match(/^#project\/([^/?#]+)$/);
  return match?.[1] || null;
}

function syncPageChrome() {
  const main = document.querySelector(".project-detail");
  const html = document.documentElement;
  html.classList.toggle("project-route", Boolean(main) && experience.contact.matchProjectBackground !== false);
  for (const name of ["background", "surface", "text", "muted", "accent", "signal"]) {
    html.style.setProperty(`--active-project-${name}`, main ? getComputedStyle(main).getPropertyValue(`--project-${name}`) : "initial");
  }
  const header = document.querySelector(".site-header");
  const bar = document.querySelector(".project-quickbar");
  const documents = document.querySelector(".documents-toolbar");
  const measure = () => {
    html.style.setProperty("--header-height", `${header?.offsetHeight || 0}px`);
    html.style.setProperty("--project-bar-height", `${bar?.offsetHeight || 0}px`);
    html.style.setProperty("--documents-height", documents && getComputedStyle(documents).position === "sticky" ? `${documents.offsetHeight}px` : "0px");
  };
  const observer = new ResizeObserver(measure);
  [header, bar, documents].filter(Boolean).forEach(node => observer.observe(node));
  measure();
  onRouteDispose(() => observer.disconnect());
}

function renderRoute() {
  const projectId = currentProjectId();
  if (projectId) {
    disposeRoute();
    const project = visible(projectItems).find((item) => item.id === projectId);
    if (project) renderProjectDetail(project); else renderNotFoundProject();
    syncPageChrome();
    return;
  }
  document.querySelectorAll("dialog[open]").forEach(dialog=>dialog.close());
  if(!document.querySelector("#profile")){disposeRoute();renderHome();syncPageChrome();}
  document.title = `${site.name || "Portfolio"} | ${site.role || "Gameplay Programmer"}`;
  if (
    location.hash &&
    location.hash !== "#top" &&
    !document.documentElement.classList.contains("intro-pending") &&
    !document.documentElement.classList.contains("intro-active")
  ) requestAnimationFrame(() => scrollToTarget(location.hash));
}

function renderIntro() {
  const intro = first(introWidgets);
  const documentElement = document.documentElement;
  const releaseIntroGuard = () => {
    documentElement.classList.remove("intro-pending", "intro-active");
    document.querySelector("#intro-root").replaceChildren();
    document.querySelector("#site-shell")?.removeAttribute("inert");
    document.querySelector("#contact-rail-root")?.removeAttribute("inert");
  };
  if (!enabled(intro)) {
    releaseIntroGuard();
    return;
  }
  const sessionKey = "portfolio-intro-seen";
  try {
    if (intro.showOncePerTab && sessionStorage.getItem(sessionKey)) {
      releaseIntroGuard();
      return;
    }
  } catch {
    // The splash remains available when session storage is unavailable.
  }

  jumpToTopImmediately();
  const rootNode = document.querySelector("#intro-root");
  const images = (intro.backgroundAssets || []).filter(hasValue).map((image, index) => renderImage(image, "", "intro-collage-image"));
  const collage = images.length ? el("div", { className: "intro-collage", attrs: { "aria-hidden": "true" } }, images) : null;
  const title = applyTextStyle(el("h1", { className: "intro-title", text: intro.title || site.name || "Portfolio" }), intro.style?.title);
  const subtitle = applyTextStyle(el("p", { className: "intro-subtitle", text: intro.subtitle || site.role || "" }), intro.style?.subtitle);
  const splash = rootNode.querySelector(".intro-splash") || el("div", { className: "intro-splash", attrs: { role: "presentation" } }, [
    collage,
    el("div", { className: "intro-noise", attrs: { "aria-hidden": "true" } }),
    el("div", { className: "intro-copy" }, [hasValue(intro.kicker) ? el("p", { className: "intro-kicker", text: intro.kicker }) : null, title, subtitle]),
  ]);
  applyTextStyle(splash.querySelector(".intro-title"), intro.style?.title).textContent = intro.title || site.name || "Portfolio";
  applyTextStyle(splash.querySelector(".intro-subtitle"), intro.style?.subtitle).textContent = intro.subtitle || site.role || "";
  rootNode.replaceChildren(splash);
  document.querySelector("#site-shell").setAttribute("inert", "");
  document.querySelector("#contact-rail-root").setAttribute("inert", "");
  documentElement.classList.add("intro-active");
  documentElement.classList.remove("intro-pending");
  try {
    if (intro.showOncePerTab) sessionStorage.setItem(sessionKey, "true");
  } catch {
    // Keep showing the splash for this visit if session storage is unavailable.
  }
  const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : Number(intro.durationMs || 0);
  window.setTimeout(() => {
    documentElement.classList.remove("intro-pending");
    splash.classList.add("is-exiting");
    window.setTimeout(() => {
      splash.remove();
      releaseIntroGuard();
      jumpToTopImmediately();
    }, 500);
  }, duration);
}

applyPortfolioTheme();
applyExperience();
renderRoute();
renderIntro();
window.addEventListener("hashchange", renderRoute);
window.addEventListener("click", (event) => {
  const anchor = event.target.closest('a[href^="#"]');
  if (!anchor) return;
  const target = anchor.getAttribute("href");
  if (!target || target.startsWith("#project/")) return;
  if (location.hash?.startsWith("#project/") && target !== "#top") {
    event.preventDefault();
    navigateTo(target);
  }
});
