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
  if (!hasValue(image)) return null;
  const img = el("img", { className, attrs: { src: image, alt: alt || "" } });
  img.addEventListener("error", () => img.closest(".project-node-cover, figure, .carousel-slide, .project-cover")?.remove());
  return img;
}

// export function renderVideo(item, kindLabel) {
//   if (!item?.enabled || !hasValue(item.src)) return null;
//   const video = el("video", {
//     className: "project-video",
//     attrs: { controls: true, preload: "metadata", playsinline: true },
//   });
//   video.append(el("source", { attrs: { src: item.src, type: item.type || "video/mp4" } }));
//   const heading = textElement("h3", item.title || kindLabel, "video-title", item.style?.title);
//   const description = hasValue(item.description) ? textElement("p", item.description, "video-description", item.style?.description) : null;
//   return el("article", { className: "video-card" }, [video, el("div", { className: "video-copy" }, [heading, description])]);
// }

export function renderVideo(item, kindLabel) {
  if (!item?.enabled || !hasValue(item.youtube)) return null;

  const videoId = extractYouTubeId(item.youtube);

  if (!videoId) return null;

  const iframe = el("iframe", {
    className: "project-video",
    attrs: {
      src: `https://www.youtube.com/embed/${videoId}`,
      title: item.title || kindLabel,
      loading: "lazy",
      allow:
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
      allowfullscreen: "",
    },
  });

  const heading = textElement(
    "h3",
    item.title || kindLabel,
    "video-title",
    item.style?.title
  );

  const description = hasValue(item.description)
    ? textElement(
        "p",
        item.description,
        "video-description",
        item.style?.description
      )
    : null;

  return el("article", { className: "video-card" }, [
    iframe,
    el("div", { className: "video-copy" }, [
      heading,
      description,
    ]),
  ]);
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
    const slide = el("div", { className: "carousel-slide", attrs: { role: "group", "aria-roledescription": "slide", "aria-label": `${index + 1} of ${items.length}` } }, renderSlide(item, index));
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
