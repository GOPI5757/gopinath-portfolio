import {resumeSettings as resume} from '../config/discovery.js';
import {projectSettings} from '../config/projects.js';
const live=projectSettings.home.featured;
import {el} from './utils.js';
import {renderImage} from './renderers.js';

export function resumeLinks(location){
  const config=resume[location];if(!resume.enabled||!config?.enabled||!resume.href)return null;
  const group=el('div',{className:`resume-actions resume-actions--${location}`,attrs:{'aria-label':'Resume'}});
  group.style.setProperty('--resume-accent',resume.accent);group.style.setProperty('--resume-text',resume.textColor);
  if(config.showView)group.append(el('a',{className:'resume-view',text:location==='header'?resume.headerViewLabel:resume.viewLabel,attrs:{href:resume.href,target:'_blank',rel:'noopener noreferrer','aria-label':resume.viewLabel+' (opens in a new tab)'}}));
  if(config.showDownload)group.append(el('a',{className:'resume-download',text:location==='header'?resume.headerDownloadLabel:resume.downloadLabel,attrs:{href:resume.href,download:'','aria-label':resume.downloadLabel,title:resume.downloadLabel,'data-short-label':resume.headerDownloadShortLabel || '↓'}}));
  return group.childElementCount?group:null;
}

export function renderLiveProject(projects){
  const p=projects.find(p=>p.id===live.projectId&&p.enabled);if(!live.enabled||!p)return null;
  const title=live.title||p.title,meta=[live.showEngine&&(live.engine||p.engine),live.showLanguage&&(live.language||p.language),live.showFormat&&(live.format||p.format||p.platform)].filter(Boolean);
  const strip=el('a',{className:'live-project',attrs:{href:`#project/${p.id}`,'aria-label':`${live.label}: ${title}. ${live.linkLabel}`}},[
    el('span',{className:'live-project-badge'},[el('span',{className:'live-project-dot',attrs:{'aria-hidden':'true'}}),el('span',{text:live.label})]),
    live.showImage?renderImage(live.image||p.coverImage,'','live-project-image'):null,
    el('span',{className:'live-project-copy'},[el('strong',{text:title}),el('span',{className:'live-project-meta',text:meta.join(' · ')}),live.description?el('span',{className:'live-project-description',text:live.description}):null]),
    el('span',{className:'live-project-link',text:`${live.linkLabel} ↗`}),
  ]);
  strip.classList.toggle('is-full-width',live.fullWidth!==false);
  strip.style.setProperty('--live-label-color',live.labelColor || live.accent);
  strip.style.setProperty('--live-accent',live.accent);strip.style.setProperty('--live-image-width',live.imageWidth);strip.style.setProperty('--live-image-fit',live.imageFit);
  return strip;
}
