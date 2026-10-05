import { collapsible, collapseOptions } from "./collapsible-content.js";
import { codeSnippetSettings as settings, projectCodeSnippets } from "../config/code-snippets.js";
import { el, announce } from "./utils.js";
import { onRouteDispose } from "./experience.js";
import { normalizeGroup } from "./code-model.js";
import { routeConnection, pathData } from "./code-routing.js";
import { copyText } from "./clipboard.js";

const svgNode = (tag, attrs = {}) => { const n = document.createElementNS("http://www.w3.org/2000/svg", tag); Object.entries(attrs).forEach(([k,v]) => n.setAttribute(k,v)); return n; };
let serial = 0;
function tokens(line) {
  // Text nodes are always used: code containing HTML is displayed, never executed.
  return line.split(/(\/\/.*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:class|public|private|protected|const|auto|return|for|if|else|void|int|float|bool|static|using|namespace|new|struct|include|pragma|once)\b|\b\d+\b)/g).filter(Boolean).map(t => el("span", { text:t, className: t.startsWith("//") ? "token-comment" : /^["']/.test(t) ? "token-string" : /^(class|public|private|protected|const|auto|return|for|if|else|void|int|float|bool|static|using|namespace|new|struct|include|pragma|once)$/.test(t) ? "token-keyword" : /^\d+$/.test(t) ? "token-number" : "" }));
}

// Independent reading layout: one full-width code panel and its explanation per item.
// Original walkthrough routing and source text are left intact.
function renderStackedGroup(group, projectId) {
  const defaults = {...settings.stacked, ...group.stacked};
  const list = el("div", {className:"code-stack"});
  list.style.setProperty("--stack-gap", defaults.gap || "1.5rem");
  for (const s of group.snippets) {
    const options = {...defaults, ...s.stacked};
    const code = el("code", {className:"code-lines"});
    s.lines.forEach((text,index) => {
      const number = s.startLine + index;
      const line = el("span", {className:"code-line"}, [
        options.showLineNumbers !== false ? el("span", {className:"code-line-number",text:number,attrs:{"aria-hidden":"true"}}) : null,
        el("span", {className:"code-line-text"}, tokens(text || " "))
      ]);
      line.classList.toggle("is-highlighted", (s.highlights || []).some(h=>number>=h.start && number<=(h.end ?? h.start)));
      code.append(line);
    });
    const filename = s.fileName || s.id;
    const copy = el("button", {className:"code-copy",text:"Copy",attrs:{type:"button","aria-label":`Copy ${filename}`}});
    copy.addEventListener("click",async()=>{
      try {await copyText(s.lines.join("\n"));announce(`${filename} copied`)}
      catch {announce("Copy unavailable. Select the code and copy it manually.")}
    });
    const scroll = el("pre", {className:"code-scroll",attrs:{tabindex:"0",role:"region","aria-label":`${filename}, ${s.language || "code"}. Long lines wrap; scroll vertically for more code.`}}, [code]);
    const card = el("article", {className:"code-card"}, [
      el("header", {className:"code-file-header"}, [el("h4",{text:filename}),options.showLanguage!==false ? el("span",{text:s.language || "Text"}) : null,options.showCopyButton!==false ? copy : null]),scroll
    ]);
    const explanation = s.explanation?.enabled !== false && (s.explanation?.title || s.explanation?.text)
      ? el("div", {className:"code-explanation"}, [s.explanation.title ? el("h4",{text:s.explanation.title}) : null,s.explanation.text ? el("p",{text:s.explanation.text}) : null]) : null;
    const item = el("div", {className:"code-stack-item"}, [card,explanation]);
    item.classList.toggle("without-line-numbers",options.showLineNumbers===false);
    item.classList.toggle("without-viewport-cap",options.maxViewportHeight==="none");
    for (const [key,value] of Object.entries({"--stack-max-height":s.maxHeight || options.maxHeight || "24rem","--stack-viewport-height":options.maxViewportHeight || "60svh","--stack-font-size":options.fontSize || ".875rem","--stack-line-height":options.lineHeight || "1.7"})) item.style.setProperty(key,String(value));
    list.append(item);
  }
  const article = el("article", {className:"code-walkthrough code-walkthrough-stacked"}, [
    group.placeholder ? el("p",{className:"code-placeholder",text:"PLACEHOLDER EXAMPLE — replace with your own code"}) : null,
    el("h3",{text:group.title || "Code walkthrough"}),
    group.description ? el("p",{className:"code-group-description",text:group.description}) : null,list
  ]);
  return collapsible(article,article.querySelector("h3"),collapseOptions(projectId,"codeBlocks",group.id));
}

function renderGroup(source, projectId) {
  let group;
  try { group = normalizeGroup(source); } catch(error) { console.warn("Code walkthrough configuration:", error.message); return null; }
  if (!group.snippets.length) return null;
  if (group.layout === "stacked" && settings.stacked?.enabled !== false) return renderStackedGroup(group, projectId);
  const prefix = `walkthrough-${++serial}`;
  const board = el("div", { className:"code-board" });
  const columns = Math.max(1, Math.min(5, Number(group.columns || settings.columns) || 3));
  board.style.setProperty("--code-columns", String(columns));
  const cards = new Map(), lines = new Map();
  const explanations = el("aside", { className:"code-explanations", attrs:{"aria-label":"Code explanations"} });
  for (const s of group.snippets) {
    const code = el("code", { className:"code-lines" });
    s.lines.forEach((text, index) => {
      const number = index + s.startLine;
      const line = el("span", { className:"code-line", attrs:{ id:`${prefix}-${s.id}-${number}` } }, [el("span", { className:"code-line-number", text:number, attrs:{"aria-hidden":"true"} }), el("span", {className:"code-line-text"}, tokens(text || " "))]);
      line.classList.toggle("is-highlighted", (s.highlights || []).some(h => number >= h.start && number <= (h.end ?? h.start)));
      lines.set(`${s.id}:${number}`, line); code.append(line);
    });
    const copy = el("button", { className:"code-copy", text:"Copy", attrs:{type:"button", "aria-label":`Copy ${s.fileName}`} });
    copy.addEventListener("click", async () => { try { await copyText(s.lines.join("\n")); announce(`${s.fileName} copied`); } catch { announce("Copy unavailable. Select the code and copy it manually."); } });
    const card = el("article", { className:"code-card" }, [el("header", {className:"code-file-header"}, [el("h4", {text:s.fileName || s.id}), el("span", {text:s.language || "Text"}), copy]), el("pre", {className:"code-scroll", attrs:{tabindex:"0", "aria-label":`${s.fileName}, ${s.language || "code"}. Scroll horizontally for long lines.`}}, [code])]);
    cards.set(s.id, card); board.append(card);
    explanations.append(el("div", {className:"code-explanation"}, [el("p", {className:"code-explanation-file",text:s.fileName}), el("h4", {text:s.explanation?.title || "Explanation"}), el("p", {text:s.explanation?.text || "Add your explanation in config/code-snippets.js."})]));
  }
  const svg = svgNode("svg", {class:"code-connections", "aria-hidden":"true", focusable:"false"});
  const defs = svgNode("defs"), marker = svgNode("marker", {id:`${prefix}-arrow`,viewBox:"0 0 8 8",refX:"7",refY:"4",markerWidth:"6",markerHeight:"6",orient:"auto"});
  marker.append(svgNode("path", {d:"M 0 0 L 8 4 L 0 8 z",fill:"var(--code-arrow)"})); defs.append(marker); svg.append(defs); board.append(svg);
  const connections = settings.showConnections !== false ? group.connections : [];
  const paths = connections.map(c => { const p = svgNode("path", {class:"code-connection-path", "data-connection":c.id, "marker-end":`url(#${prefix}-arrow)`}); svg.append(p); return p; });
  const connectionList = el("div", {className:"code-connection-list", attrs:{"aria-label":"Follow code connections"}});
  function activate(c, target) {
    for (const line of lines.values()) line.classList.remove("is-connected");
    for (const r of [c.from,c.to]) for (let n=r.start;n<=(r.end ?? r.start);n++) lines.get(`${r.snippet}:${n}`)?.classList.add("is-connected");
    paths.forEach((path,i)=>path.classList.toggle("is-active",connections[i] === c));
    if (target) { const line = lines.get(`${target.snippet}:${target.start}`); line?.scrollIntoView({block:"center",behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}); line?.setAttribute("tabindex","-1"); line?.focus({preventScroll:true}); }
  }
  connections.forEach((c,i) => {
    const label = c.label || `Connection ${i+1}`;
    connectionList.append(el("div", {className:"code-connection-control"}, [el("button", {text:`${String(i+1).padStart(2,"0")} · ${label}`,attrs:{type:"button"},on:{click:()=>activate(c,c.to)}}), el("button", {text:"Source",attrs:{type:"button","aria-label":`${label}: show source lines`},on:{click:()=>activate(c,c.from)}})]));
  });
  const layout = el("div", {className:"code-walkthrough-layout"}, [board,explanations]);
  layout.classList.toggle("explanation-left", (group.explanationPosition || settings.explanationPosition) === "left");
  const article = el("article", {className:"code-walkthrough"}, [group.placeholder ? el("p", {className:"code-placeholder",text:"PLACEHOLDER EXAMPLE — replace with your own code"}) : null, el("h3",{text:group.title || "Code walkthrough"}), group.description ? el("p", {className:"code-group-description",text:group.description}) : null, layout, connections.length ? el("p", {className:"code-connection-hint",text:"Follow the arrows, or select a connection below to jump to its highlighted lines."}) : null, connectionList]);
  let frame, disposed=false;
  function draw() {
    if (disposed || !board.isConnected || !board.getClientRects().length) return;
    const stacked=layout.getBoundingClientRect().width < (Number(settings.explanationStackBelow)||780);
    layout.classList.toggle("is-stacked",stacked);
    let bounds=board.getBoundingClientRect();
    const mobile = bounds.width < 500 || matchMedia(`(max-width:${Number(settings.mobileMaxWidth)||760}px)`).matches;
    board.classList.toggle("is-narrow",mobile);
    const fitted = mobile ? 1 : Math.max(1,Math.min(columns,Math.floor((bounds.width-32)/(Math.max(160,Number(settings.minCardWidth)||260)+36))));
    board.style.setProperty("--code-columns",String(fitted));
    bounds=board.getBoundingClientRect();
    svg.setAttribute("viewBox",`0 0 ${bounds.width} ${bounds.height}`);
    svg.setAttribute("width",bounds.width); svg.setAttribute("height",bounds.height);
    const geometry=new Map([...cards].map(([id,card])=>{const box=card.getBoundingClientRect();return [id,{left:box.left-bounds.left,right:box.right-bounds.left,top:box.top-bounds.top,bottom:box.bottom-bounds.top}]}));
    const occupied=[];
    connections.forEach((c,i) => {
      const port=r=>{const first=lines.get(`${r.snippet}:${r.start}`).getBoundingClientRect(),last=lines.get(`${r.snippet}:${r.end ?? r.start}`).getBoundingClientRect();return {rect:geometry.get(r.snippet),y:(first.top+last.bottom)/2-bounds.top,minY:first.top-bounds.top+3,maxY:last.bottom-bounds.top-3}};
      const points=routeConnection({from:port(c.from),to:port(c.to),rects:[...geometry.values()],width:bounds.width,height:bounds.height,mobile,lane:Math.max(8,Math.min(20,Number(settings.arrowClearance)||10)),bendPenalty:Number(settings.arrowBendPenalty)||4,occupied:settings.avoidArrowOverlap===false?[]:occupied,spacing:Math.max(3,Math.min(12,Number(settings.arrowLaneSpacing)||6)),maxDetour:Math.max(12,Number(settings.arrowMaxDetour)||48),portSpread:Math.max(0,Number(settings.arrowPortSpread)||6)});
      occupied.push(points);
      paths[i].setAttribute("d",pathData(points));
    });
  }
  const schedule=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(draw)};
  const observer=new ResizeObserver(schedule); observer.observe(layout); observer.observe(board); cards.forEach(card=>observer.observe(card));
  window.addEventListener("resize",schedule); document.fonts?.ready.then(schedule); schedule();
  onRouteDispose(()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener("resize",schedule)});
  return collapsible(article,article.querySelector("h3"),collapseOptions(projectId,"codeBlocks",group.id));
}

export function renderCodeSnippets(project) {
  if (!settings.enabled) return null;
  const groups=(projectCodeSnippets[project.id] || []).filter(g=>g.enabled!==false).map(group=>renderGroup(group,project.id)).filter(Boolean);
  if (!groups.length) return null;
  const section=el("section", {className:"detail-section code-section",attrs:{"aria-labelledby":"code-snippets-title"}}, [el("h2",{className:"detail-heading",text:settings.title,attrs:{id:"code-snippets-title"}}),...groups]);
  for (const [key,value] of Object.entries({"--code-font-size":settings.fontSize,"--code-line-height":settings.lineHeight,"--code-arrow":settings.arrowColor,"--code-highlight":settings.highlightColor,"--code-explanation-width":settings.explanationWidth})) section.style.setProperty(key,value);
  return collapsible(section,section.querySelector(".detail-heading"),collapseOptions(project.id,"sections","code"));
}
