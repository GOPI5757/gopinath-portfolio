import {el} from './utils.js';
import {renderImage} from './renderers.js';
import {projectSettings} from '../config/projects.js';

function icon(item){
  if(item.iconImage)return el('img',{className:'welcome-link-icon',attrs:{src:item.iconImage,alt:'',loading:'lazy'}});
  const paths={
    github:'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.81c.85 0 1.71.12 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.39.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z',
    email:'M3 5h18v14H3V5Zm1 2 8 6 8-6M4 18l5-5m11 5-5-5',
    itch:'M3 8 5 3h14l2 5M3 8v3c0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0V8M5 13v8h14v-8M9 17h6m-3-2v4'
  };
  if(item.icon==='linkedin')return el('span',{className:'welcome-link-icon welcome-linkedin',text:'in',attrs:{'aria-hidden':'true'}});
  if(!paths[item.icon])return el('span',{className:'welcome-link-icon',text:item.icon || '↗',attrs:{'aria-hidden':'true'}});
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('class','welcome-link-icon');svg.setAttribute('aria-hidden','true');
  const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',paths[item.icon]);
  path.setAttribute('fill',item.icon==='github'?'currentColor':'none');
  if(item.icon!=='github'){path.setAttribute('stroke','currentColor');path.setAttribute('stroke-width','1.7');path.setAttribute('stroke-linejoin','round');}
  svg.append(path);return svg;
}
function safeURL(value){if(typeof value!=='string'||!value.trim())return null;try{const url=new URL(value,location.href);return ['https:','http:','mailto:','tel:'].includes(url.protocol)?url.href:null}catch{return null}}
function panel(title,className,body){return el('aside',{className:`welcome-panel ${className}`,attrs:{'aria-label':title}},[el('h2',{className:'welcome-panel-title',text:title}),body]);}

export function attachWelcome(section,profile,projects){
  const config=profile.welcome;if(!config?.enabled)return;
  section.classList.add('welcome-section');
  for(const [name,value] of Object.entries({'--welcome-background':config.background,'--welcome-accent':config.accent,'--welcome-panel':config.panelBackground,'--welcome-border':config.panelBorder,'--welcome-decoration-opacity':config.decorations?.opacity ?? .5}))section.style.setProperty(name,String(value));
  if(config.decorations?.enabled!==false){
    const decor=el('div',{className:'welcome-decor',attrs:{'aria-hidden':'true'}});
    for(let n=0;n<4;n++)decor.append(el('i',{className:`welcome-corner corner-${n}`}));
    decor.append(el('span',{className:'welcome-circuit circuit-left'}),el('span',{className:'welcome-circuit circuit-right'}));section.prepend(decor);
  }
  const dock=el('div',{className:'welcome-dock'}),quick=config.quickLinks;
  if(quick?.enabled){
    const links=(quick.items || []).filter(item=>item.enabled!==false && item.label && safeURL(item.url)).map(item=>el('a',{className:'welcome-quick-link',attrs:{href:safeURL(item.url),target:'_blank',rel:'noopener noreferrer','aria-label':`${item.label} (opens in a new tab)`}},[icon(item),el('span',{text:item.label})]));
    if(links.length){const list=el('nav',{className:'welcome-quick-list',attrs:{'aria-label':quick.title || 'Quick links',tabindex:0}},links);const box=panel(quick.title || 'Quick links','welcome-quick',list);box.style.setProperty('--welcome-quick-width',quick.maxWidth || '28rem');dock.append(box);}
  }
  if(config.scrollCue?.enabled)dock.append(el('a',{className:'welcome-scroll',attrs:{href:config.scrollCue.target || '#projects','aria-label':'Scroll to projects'}},[el('span',{text:config.scrollCue.label || 'Scroll'}),el('span',{className:'welcome-scroll-line',attrs:{'aria-hidden':'true'}}),el('span',{text:'⌄',attrs:{'aria-hidden':'true'}})]));
  const featured=projectSettings.home.welcomeFeatured;
  if(featured?.enabled){
    const items=(featured.items || []).filter(item=>item.enabled!==false).map(item=>({item,project:projects.find(p=>p.id===item.projectId && p.enabled)})).filter(x=>x.project);
    if(items.length){
      const list=el('nav',{className:'welcome-featured-list',attrs:{'aria-label':featured.title || 'Featured games',tabindex:0}},items.map(({item,project:p})=>el('a',{className:'welcome-featured-link',attrs:{href:`#project/${p.id}`}},[renderImage(item.image || p.coverImage,'','welcome-featured-image'),el('span',{text:item.title || p.title}),el('span',{className:'welcome-featured-arrow',text:'→',attrs:{'aria-hidden':'true'}})])));
      const box=panel(featured.title || 'Featured games','welcome-featured',list);
      box.style.setProperty('--welcome-featured-width',featured.maxWidth || '22rem');
      box.style.setProperty('--welcome-visible',String(Math.max(1,Math.min(3,Math.floor(Number(featured.maxVisible)||3)))));
      box.style.setProperty('--welcome-row-height',featured.rowHeight || '3.2rem');
      box.style.setProperty('--welcome-mobile-row-height',featured.mobileRowHeight || '2.55rem');
      box.style.setProperty('--welcome-compact-row-height',featured.compactRowHeight || '2.4rem');
      box.style.setProperty('--welcome-image-fit',featured.imageFit || 'cover');dock.append(box);
    }
  }
  if(dock.childElementCount)section.querySelector('.profile-grid').append(dock);
  else section.classList.add('welcome-no-dock');
}
