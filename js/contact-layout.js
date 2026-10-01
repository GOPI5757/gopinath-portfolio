import {projectSettings} from '../config/projects.js';
const liveProjectSettings=projectSettings.home.featured;
import {experience} from '../config/experience.js';
import {onRouteDispose} from './experience.js';

// Reflow intersecting content blocks, not an entire reserved page column.
// Padding leaves their outer geometry stable, preventing width feedback loops.
export function attachContactLayout(rail) {
  if (!rail) return;
  const config=experience.contact;
  const selector='.live-project,.profile-copy,.welcome-dock,.project-detail-hero,.documents-toolbar,.section-heading,.project-category-panel,.project-category-tabs,.detail-section,.skills-grid,.contact-form';
  const targets=[...document.querySelectorAll(selector)];
  const original=new Map(targets.map(node=>[node,getComputedStyle(node).paddingRight]));
  let frame=0,disposed=false;
  function update(){
    frame=0;
    if(disposed)return;
    const active=document.documentElement.classList.contains('contact-right') && !rail.classList.contains('is-collapsed');
    // Clear the live strip at its actual rendered height, including wrapping and bar mode.
    const live=config.avoidLiveProject!==false?document.querySelector('.live-project'):null;
    const liveBottom=live?Math.max(0,live.getBoundingClientRect().bottom):0;
    const gap=Number.isFinite(Number(config.liveProjectGap))?Math.max(0,Number(config.liveProjectGap)):12;
    rail.style.setProperty('--contact-effective-top',`max(var(--contact-top),calc(var(--header-height) + var(--project-bar-height) + .5rem),${liveBottom>0?liveBottom+gap:0}px)`);
    const panel=rail.getBoundingClientRect();
    for(const node of targets){
      const box=node.getBoundingClientRect();
      const adjust=node.classList.contains('live-project') ? liveProjectSettings.avoidContact!==false : config.adjustContentAroundPanel;
      const overlaps=active && adjust && box.top<panel.bottom && box.bottom>panel.top && box.right>panel.left && box.left<panel.right;
      const inset=overlaps?Math.min(Math.max(0,box.right-panel.left+config.contentGap),Math.max(0,box.width-config.minContentWidth)):0;
      node.style.setProperty('--contact-original-padding',original.get(node));
      node.style.setProperty('--contact-local-inset',`${inset}px`);
      node.classList.toggle('contact-flow-target',inset>0);
    }
  }
  function schedule(){if(!disposed&&!frame)frame=requestAnimationFrame(update)}
  const observer=new ResizeObserver(schedule);observer.observe(rail);
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule);
  window.addEventListener('contactlayoutchange',schedule);
  const settle=setTimeout(schedule,650);
  document.fonts?.ready.then(schedule);
  schedule();
  onRouteDispose(()=>{
    disposed=true;cancelAnimationFrame(frame);clearTimeout(settle);observer.disconnect();
    window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);
    window.removeEventListener('contactlayoutchange',schedule);
  });
}
