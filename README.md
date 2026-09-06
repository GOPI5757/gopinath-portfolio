# Configurable Game Programmer Portfolio

A responsive, static portfolio for a game programmer. The website is rendered from section-specific JavaScript configuration files—content is not hardcoded into the page layout.

## Open it locally

The site uses JavaScript modules, so serve this folder from a small local web server instead of opening `index.html` directly. For example, from this folder:

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080` in a browser. Any ordinary static-site host (GitHub Pages, Netlify, Vercel static hosting, etc.) can host the front end.

## Edit content

All user-facing content is in `config/`. Every widget/item has an `enabled` property:

```js
{ enabled: false, title: "This will not render" }
```

Disabled or empty content is omitted completely, so the surrounding page reflows without empty headings, cards, or broken media areas.

| File | Controls |
| --- | --- |
| `config/site.js` | Name, role, navigation, hero actions, resume button, footer |
| `config/theme.js` | Global colors and fonts |
| `config/intro.js` | Intro splash text, duration, collage image paths, typography |
| `config/profile.js` | Profile copy, tags and journey strip |
| `config/projects.js` | Project categories, project nodes, themed detail pages, technical blocks, documents, images and videos |
| `config/skills.js` | Skill groups and individual skills |
| `config/certificates.js` | Certificate carousel items |
| `config/contact.js` | Form delivery settings, email/phone and social links |

Text style options can be attached to the relevant widgets, for example:

```js
style: {
  title: { fontSize: "3rem", fontFamily: "Space Grotesk", color: "#ffffff" },
  description: { fontSize: "1rem", color: "#aab7d4" }
}
```

## Add a project

1. Add a category object to `projectCategories` only if you need a new group.
2. Add one project object to `projectItems`, choose its `id`, and list one or more `categoryIds`.
3. Add `facts`, `technicalBlocks`, `documentGroups`, `images`, `gameplayVideos`, or `engineWorkVideos` only where needed.
4. Set the item and any nested widget to `enabled: true`.

Each project detail view is a shareable route such as `#project/digging-game`. Its `theme` object changes the detail-page color scheme only for that project.

Example image carousel item:

```js
images: [
  {
    id: "digging-gameplay-01",
    enabled: true,
    src: "./assets/images/projects/digging-game/gameplay-01.jpg",
    alt: "The digging area in the game",
    caption: "Gameplay view"
  }
]
```

Example video item:

```js
gameplayVideos: [
  {
    id: "digging-demo",
    enabled: true,
    title: "Digging loop",
    description: "Short gameplay demonstration.",
    src: "./assets/videos/gameplay/digging-loop.mp4",
    type: "video/mp4"
  }
]
```

## Assets

Use these folders so paths remain tidy as the portfolio grows:

```text
assets/
├── images/
│   ├── intro/            # splash collage images
│   ├── projects/         # create a folder per project when helpful
│   └── certificates/     # certificate scans/images
├── videos/
│   ├── gameplay/         # gameplay clips
│   └── engine-work/      # editor/debug/technical clips
├── documents/            # GDDs, case studies, PDFs
└── resume/               # downloadable resume PDF
```

Use web-friendly, compressed images (WebP/JPG/PNG) and videos (MP4/WebM). A configured media widget with an empty source is not rendered. If a configured file cannot load, its media element is removed rather than distorting the layout.

## Contact form

The starter configuration has no personal email address or social links because none were provided. Add those in `config/contact.js` and set their `enabled` flags to `true`.

`deliveryMode: "mailto"` is the no-backend option: it opens the visitor’s email app with the form details. Set `recipientEmail` before publishing.

For automatic sending, set `deliveryMode: "endpoint"` and use the optional Resend-based server example in `server/`:

1. Copy `server/.env.example` to `server/.env` and set its values.
2. Run the server with Node.js 18+.
3. Set `endpoint` in `config/contact.js` to its public `/api/contact` address.

Keep `.env` private; it contains an email-service API key and must never be committed or placed in `config/`.

## Responsive and accessibility behavior

- The layout uses fluid grids and typography from 320px mobile width through desktop.
- Project nodes turn into a non-overflowing grid; graph connector decoration is removed when space is tight.
- Navigation collapses to a keyboard-accessible menu on small screens.
- Carousels support arrow keys, visible controls and accessible slide labels.
- Focus states, semantic headings, form labels, reduced-motion support and a skip link are included.

## Project structure

```text
game-programmer-portfolio/
├── index.html
├── README.md
├── config/
├── css/
├── js/
├── assets/
└── server/                 # optional contact endpoint example
```
