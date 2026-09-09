import { imageManifest } from "../config/image-manifest.js";
import { experience } from "../config/experience.js";
import { onRouteDispose } from "./experience.js";
import { applyTextStyle, el, hasValue, makeId, textElement, visible } from "./utils.js";

export function eyebrow(text) {
  return hasValue(text) ? el("p", { className: "eyebrow", text }) : null;
}

export function sectionHeading(widget, options = {}) {
  const { compact = false } = options;
  const title = textElement("h2", widget.title || "", compact ? "section-title section-title--compact" : "section-title", widget.style?.title);
  if (widget.id) title.id = `${widget.id}-title`;
  const description = hasValue(widget.description)
    ? textElement("p", widget.description, "section-description", widget.style?.description)
    : null;
  return el("div", { className: "section-heading" }, [eyebrow(widget.eyebrow), title, description]);
}

export function renderChip(label, className = "chip") {
  return el("span", { className, text: label });
}

export function renderImage(image, alt, className = "media-image") {
  if(!hasValue(image))return null;
  const asset=imageManifest[image.replace(/^\.\//,"")];
  const config=experience.performance;
  const img=el("img",{className,attrs:{alt:alt || "",decoding:"async",width:asset?.width,height:asset?.height}});
  const sizes=/quickbar|drawer/.test(className)?config.imageSizes.browser:/node/.test(className)?config.imageSizes.projectCard:config.imageSizes.detail;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const load=()=>{
    if(asset?.versions && config.responsiveImages){img.sizes=sizes;img.srcset=asset.versions.map(v=>`${v.src} ${v.width}w`).join(', ')}
    img.src=asset?.animated && reduced ? asset.poster : image;
  };
  if(config.lazyImages && 'IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){load();observer.disconnect()}},{rootMargin:config.imageRootMargin});
    observer.observe(img);onRouteDispose(()=>observer.disconnect());
  } else load();
  img.addEventListener('error',()=>{
    img.removeAttribute('srcset');img.removeAttribute('src');
    if(!alt){img.style.visibility='hidden';return}
    const message=el('span',{className:'image-unavailable',text:config.imageErrorLabel,attrs:{role:'img','aria-label':alt}});img.replaceWith(message);
  },{once:true});
  return img;
}

export function renderVideo(item, kindLabel) {
  if(!item?.enabled || !hasValue(item.youtube))return null;
  const id=extractYouTubeId(item.youtube);if(!id)return null;
  const title=item.title || kindLabel;
  const container=el('div',{className:'video-container'});
  const mount=(autoplay=false)=>{
    const iframe=el('iframe',{className:'project-video',attrs:{src:`https://www.youtube-nocookie.com/embed/${id}?autoplay=${autoplay?1:0}`,title,loading:'lazy',allow:'autoplay; encrypted-media; picture-in-picture; fullscreen',allowfullscreen:'',referrerpolicy:'strict-origin-when-cross-origin'}});
    container.replaceChildren(iframe);if(autoplay)iframe.focus();
  };
  if(experience.performance.clickToLoadYouTube){
    const button=el('button',{className:'video-launch',attrs:{type:'button','aria-label':`${experience.performance.playVideoLabel}: ${title}`},on:{click:()=>mount(true)}},[
      hasValue(item.poster)?renderImage(item.poster,'','video-poster'):null,
      el('span',{className:'video-launch-label',text:`▶ ${experience.performance.playVideoLabel}`})
    ]);container.append(button);
  } else mount();
  return el('article',{className:'video-card'},[container,el('div',{className:'video-copy'},[
    textElement('h3',title,'video-title',item.style?.title),
    hasValue(item.description)?textElement('p',item.description,'video-description',item.style?.description):null,
    el('a',{className:'video-link',text:experience.performance.watchLinkLabel,attrs:{href:item.youtube,target:'_blank',rel:'noreferrer'}})
  ])]);
}

function extractYouTubeId(value) {
  try {
    const url = new URL(value);

    if (url.hostname === "youtu.be") {
      return url.pathname.slice(1);
    }

    if (
      url.hostname === "youtube.com" ||
      url.hostname === "www.youtube.com" ||
      url.hostname === "m.youtube.com"
    ) {
      return url.searchParams.get("v");
    }

    return null;
  } catch {
    return null;
  }
}

export function renderCarousel(items, options = {}) {
  const { label = "Carousel", renderSlide, className = "carousel" } = options;
  if (!items.length) return null;

  const carouselId = makeId("carousel");
  const viewport = el("div", { className: "carousel-viewport", attrs: { id: carouselId, tabindex: "0", "aria-label": label } });
  const track = el("div", { className: "carousel-track" });
  const dots = el("div", { className: "carousel-dots", attrs: { role: "tablist", "aria-label": `${label} slides` } });
  let activeIndex = 0;

  const slides = items.map((item, index) => {
    const slide = el("div", { className: "carousel-slide", attrs: { role: "group", "aria-roledescription": "slide", "aria-label": `${index + 1} of ${items.length}` } }, index === 0 ? renderSlide(item, index) : null);
    slide.dataset.rendered = String(index === 0);
    track.append(slide);
    return slide;
  });

  const dotButtons = items.map((_, index) => {
    const button = el("button", {
      className: "carousel-dot",
      attrs: { type: "button", role: "tab", "aria-label": `Go to slide ${index + 1}` },
      on: { click: () => setActive(index) },
    });
    dots.append(button);
    return button;
  });

  function setActive(index) {
    activeIndex = (index + items.length) % items.length;
    if(slides[activeIndex].dataset.rendered !== "true"){slides[activeIndex].append(renderSlide(items[activeIndex],activeIndex));slides[activeIndex].dataset.rendered="true";}
    track.style.transform = `translateX(-${activeIndex * 100}%)`;
    slides.forEach((slide, slideIndex) => slide.setAttribute("aria-hidden", String(slideIndex !== activeIndex)));
    dotButtons.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
      dot.setAttribute("aria-selected", String(dotIndex === activeIndex));
    });
  }

  const previous = el("button", { className: "carousel-button carousel-button--previous", text: "←", attrs: { type: "button", "aria-controls": carouselId, "aria-label": `Previous ${label.toLowerCase()}` }, on: { click: () => setActive(activeIndex - 1) } });
  const next = el("button", { className: "carousel-button carousel-button--next", text: "→", attrs: { type: "button", "aria-controls": carouselId, "aria-label": `Next ${label.toLowerCase()}` }, on: { click: () => setActive(activeIndex + 1) } });

  viewport.append(track);
  viewport.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); setActive(activeIndex - 1); }
    if (event.key === "ArrowRight") { event.preventDefault(); setActive(activeIndex + 1); }
  });
  setActive(0);
  return el("div", { className }, [viewport, previous, next, dots]);
}

export function renderTechnicalBlock(block) {
  if (!block?.enabled) return null;

  const progressionImages = Array.isArray(block.progressionImages)
    ? block.progressionImages
        .filter((image) => {
          if (typeof image === "string") return hasValue(image);
          return enabledImage(image);
        })
        .map((image) => typeof image === "string" ? { src: image, alt: block.imageAlt || "" } : image)
    : [];

  if (progressionImages.length) {
    const progression = el("div", { className: "technical-progression" });
    let columns = 0;

    const renderProgressionRows = () => {
      const nextColumns = window.matchMedia("(min-width: 900px)").matches
        ? 3
        : window.matchMedia("(min-width: 640px)").matches
          ? 2
          : 1;

      if (nextColumns === columns) return;
      columns = nextColumns;

      const rows = [];
      for (let index = 0; index < progressionImages.length; index += columns) {
        const steps = progressionImages.slice(index, index + columns).map((image) =>
          el("div", { className: "technical-progression-step" }, [
            el("figure", { className: "technical-progression-item" }, [
              renderImage(image.src, image.alt || "", "technical-progression-image"),
            ]),
          ])
        );
        rows.push(el("div", { className: "technical-progression-row" }, steps));
      }

      progression.replaceChildren(...rows);
    };

    renderProgressionRows();
    window.addEventListener("resize", renderProgressionRows);
    onRouteDispose(()=>window.removeEventListener("resize", renderProgressionRows));
    const copy = el("div", { className: "technical-progression-copy" }, [
      textElement("h3", block.title || "Technical work", "technical-title", block.style?.title),
      hasValue(block.description)
        ? textElement("p", block.description, "technical-description", block.style?.description)
        : null,
    ]);

    return el("article", { className: "technical-progression-block" }, [copy, progression]);
  }

  const galleryImages = Array.isArray(block.images)
    ? block.images
        .filter((image) => {
          if (typeof image === "string") return hasValue(image);
          return enabledImage(image);
        })
        .map((image) => typeof image === "string" ? { src: image, alt: block.imageAlt || "" } : image)
    : [];

  if (!galleryImages.length && hasValue(block.image)) {
    galleryImages.push({ src: block.image, alt: block.imageAlt || "" });
  }

  const imageSizeValue = block.imageSize;
  const imageSize = typeof imageSizeValue === "number"
    ? (Number.isFinite(imageSizeValue) ? `${Math.max(1, Math.min(100, imageSizeValue))}%` : null)
    : typeof imageSizeValue === "string" && /^\s*\d+(?:\.\d+)?%\s*$/.test(imageSizeValue)
      ? `${Math.max(1, Math.min(100, Number.parseFloat(imageSizeValue)))}%`
      : null;

  const visualStyle = imageSize ? { width: imageSize } : undefined;

  const visual = galleryImages.length > 1
    ? el("div", { className: "technical-visual", style: visualStyle }, renderCarousel(galleryImages, {
        label: `${block.title || "Technical work"} images`,
        className: "carousel technical-carousel",
        renderSlide: (image) => renderImage(image.src, image.alt || "", "technical-image"),
      }))
    : galleryImages.length === 1
      ? el("figure", { className: "technical-visual", style: visualStyle }, renderImage(galleryImages[0].src, galleryImages[0].alt, "technical-image"))
      : null;

  const copy = el("div", { className: "technical-copy" }, [
    textElement("h3", block.title || "Technical work", "technical-title", block.style?.title),
    hasValue(block.description)
      ? textElement("p", block.description, "technical-description", block.style?.description)
      : null,
  ]);

  return el("article", { className: `technical-block ${visual ? "" : "technical-block--text-only"} ${visual && block.layout === "image-left" ? "technical-block--image-left" : ""} ${visual && block.layout === "image-right" ? "technical-block--image-right" : ""}` }, [
    copy,
    visual,
  ]);
}

function enabledImage(image) {
  return Boolean(image?.enabled !== false && hasValue(image?.src));
}

export function renderDocumentGroup(group) {
  const docs = visible(group?.documents).filter((document) => hasValue(document.href));
  if (!group?.enabled || !docs.length) return null;
  const links = docs.map((document) => el("a", {
    className: "document-link",
    text: document.label || "Open document",
    attrs: { href: document.href, target: "_blank", rel: "noreferrer" },
  }, document.type ? renderChip(document.type, "document-type") : null));
  return el("div", { className: "document-group" }, [textElement("h3", group.title || "Documents", "document-group-title", group.style?.title), el("div", { className: "document-list" }, links)]);
}

export function renderDocumentSection(section) {
  const groups = visible(section?.groups).map(renderDocumentGroup).filter(Boolean);
  if (!section?.enabled || !groups.length) return null;

  return el("section", { className: "document-section" }, [
    textElement("h2", section.title || "Documents", "document-section-title", section.style?.title),
    el("div", { className: "document-groups" }, groups),
  ]);
}

