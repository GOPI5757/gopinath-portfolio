// Regenerate the first-paint intro after changing config/intro.js.
// The embedded small images avoid network requests for the opening collage.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {introWidgets} from '../config/intro.js';
import {imageManifest} from '../config/image-manifest.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const intro=introWidgets.find(item=>item.enabled);
const escape=value=>String(value??'').replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const textStyle=style=>escape(Object.entries(style||{}).map(([key,value])=>`${key.replace(/[A-Z]/g,letter=>'-'+letter.toLowerCase())}:${value}`).join(';'));
let html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const critical=`<!-- INTRO GUARD START -->
    <style>
      html.intro-pending,html.intro-pending body{overflow:hidden;background:#070b16}
      html.intro-pending #site-shell,html.intro-pending #contact-rail-root,html.intro-pending .skip-link{visibility:hidden}
      #intro-root .intro-splash{position:fixed;inset:0;z-index:90;display:grid;place-items:center;overflow:hidden;background:#070b16;color:#f4f7ff}
      #intro-root .intro-collage{position:absolute;inset:-4%;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.8rem;opacity:.32;transform:rotate(-4deg) scale(1.1)}
      #intro-root .intro-collage-image{width:100%;height:100%;min-height:0;object-fit:cover}
      #intro-root .intro-copy{position:relative;z-index:2;text-align:center;padding:1rem}
    </style>
    <noscript><style>#intro-root{display:none}html.intro-pending body{overflow:auto}</style></noscript>
    <!-- INTRO GUARD END -->`;
html=html.replace(/\s*<!-- INTRO GUARD START -->[\s\S]*?<!-- INTRO GUARD END -->/,'');
html=html.replace('<title>',''+critical+'\n    <title>');
html=html.replace(/<html lang="en"[^>]*>/,`<html lang="en"${intro?' class="intro-pending"':''}>`);
let markup='';
if(intro){
  const images=(intro.backgroundAssets||[]).map(src=>{
    const asset=imageManifest[src.replace(/^\.\//,'')];
    const file=asset?.versions?.[0]?.src||asset?.poster||src;
    const bytes=fs.readFileSync(path.join(root,file));
    const mime=path.extname(file)==='.webp'?'image/webp':path.extname(file)==='.png'?'image/png':'image/jpeg';
    return `<img class="intro-collage-image" alt="" src="data:${mime};base64,${bytes.toString('base64')}" />`;
  }).join('');
  markup=`<div class="intro-splash" role="presentation"><div class="intro-collage" aria-hidden="true" style="grid-template-rows:repeat(${Math.ceil((intro.backgroundAssets?.length||1)/3)},minmax(0,1fr))">${images}</div><div class="intro-noise" aria-hidden="true"></div><div class="intro-copy"><p class="intro-kicker">${escape(intro.kicker)}</p><h1 class="intro-title" style="${textStyle(intro.style?.title)}">${escape(intro.title)}</h1><p class="intro-subtitle" style="${textStyle(intro.style?.subtitle)}">${escape(intro.subtitle)}</p></div></div>`;
}
html=html.replace(/<div id="intro-root">[\s\S]*?<\/div>\s*(?=<div id="site-shell">)/,`<div id="intro-root">${markup}</div>\n    `);
fs.writeFileSync(path.join(root,'index.html'),html);
console.log(`First-paint intro synchronized; ${intro?.backgroundAssets?.length||0} embedded collage images.`);
