import {projectSettings} from "../config/projects.js";
import { el } from "./utils.js";

const labelFor = (config, count) => (count === 1 ? config.singleLabel : config.label).replaceAll("{count}", String(count));

export function withProjectPageBackground(intro, project) {
  const config = projectSettings.detail.pageBackground;
  const image = project.pageBackground;
  if (!config.enabled || !image?.src || image.enabled === false) return intro;
  const stage = el("div", {className:"project-hero-stage"});
  const backdrop = el("div", {className:"project-page-backdrop", attrs:{"aria-hidden":"true"}});
  const picture = el("img", {attrs:{src:image.src, alt:"", decoding:"async", loading:"eager", fetchpriority:"high"}});
  // Independent image paths prevent later page-image edits changing card thumbnails.
  if (image.versions?.length) {
    picture.srcset = image.versions.map(v => `${v.src} ${v.width}w`).join(", ");
    picture.sizes = "100vw";
  }
  picture.addEventListener("error", () => backdrop.remove(), {once:true});
  const options = {...config, ...image};
  const opacity = Number(options.opacity);
  stage.style.setProperty("--page-image-opacity", String(Number.isFinite(opacity) ? Math.max(0,Math.min(1,opacity)) : .32));
  for (const [key, variable] of Object.entries({height:"height", mobileHeight:"mobile-height", fit:"fit", position:"position", mobilePosition:"mobile-position", sideFade:"side-fade", topFade:"top-fade", bottomFadeStart:"bottom-fade"})) {
    stage.style.setProperty(`--page-image-${variable}`, options[key]);
  }
  const mobile = Math.max(240, Number(config.mobileMaxWidth) || 760);
  stage.append(el("style", {text:`@media(max-width:${mobile}px){.project-page-backdrop{max-height:var(--page-image-mobile-height)}.project-page-backdrop img{object-position:var(--page-image-mobile-position)}}`}), backdrop, intro);
  backdrop.append(picture);
  return stage;
}

export function withProjectTotal(heading, projects) {
  const config = projectSettings.home.totalProjects;
  if (!config.enabled) return heading;
  // Count each enabled project once, regardless of category membership or active filter.
  const count = new Set(projects.filter(p=>p.enabled && p.title).map(p=>p.id)).size;
  const badge = el("span", {className:"project-total-count", text:labelFor(config,count)});
  const kicker = heading.querySelector(".eyebrow");
  const row = el("div", {className:"project-heading-meta"});
  if (kicker) {kicker.replaceWith(row);row.append(kicker,badge);} else {row.append(badge);heading.prepend(row);}
  return heading;
}

export function attachProjectHiddenCount(bar) {
  const config = projectSettings.navigation.quickBar.hiddenProjects;
  if (!config.enabled || !bar) return () => {};
  const track = bar.querySelector(".project-quickbar-track");
  const next = bar.querySelector(".project-quickbar-scroll--next");
  const previous = bar.querySelector(".project-quickbar-scroll--previous");
  if (!track || !next) return () => {};
  const originalLabel = next.getAttribute("aria-label");
  const badge = el("span", {className:"project-hidden-count", attrs:{"aria-hidden":"true"}});
  next.append(badge);
  const update = () => {
    if (!track.clientWidth) {badge.hidden=true;return;}
    const edge = track.getBoundingClientRect().right;
    const count = [...track.children].filter(item=>item.getBoundingClientRect().right > edge + 1).length;
    badge.textContent=String(count);badge.hidden=count===0;
    next.title=count ? labelFor(config,count) : "No more projects to the right";
    next.setAttribute("aria-label", count ? `${originalLabel}. ${labelFor(config,count)}` : originalLabel);
    if(config.disableAtEnds){next.disabled=count===0;if(previous)previous.disabled=track.scrollLeft<=1;}
  };
  track.addEventListener("scroll",update,{passive:true});
  const observer=new ResizeObserver(update);
  observer.observe(track);
  [...track.children].forEach(item=>observer.observe(item));
  update();
  return ()=>{observer.disconnect();track.removeEventListener("scroll",update);badge.remove();next.setAttribute("aria-label",originalLabel);next.removeAttribute("title");next.disabled=false;if(previous)previous.disabled=false;};
}
