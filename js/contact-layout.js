import {experience} from '../config/experience.js';
import {onRouteDispose} from './experience.js';

// Reflow intersecting content blocks, not an entire reserved page column.
// Padding leaves their outer geometry stable, preventing width feedback loops.
export function attachContactLayout(rail) {
  if (!rail) return;
  const config=experience.contact;
  const selector='.profile-copy,.project-detail-hero,.documents-toolbar,.section-heading,.project-category-panel,.project-category-tabs,.detail-section,.skills-grid,.contact-form';
  const targets=[...document.querySelectorAll(selector)];
  const original=new Map(targets.map(node=>[node,getComputedStyle(node).paddingRight]));
  let frame=0,disposed=false;
  function update(){
    frame=0;
    if(disposed)return;
    const active=config.adjustContentAroundPanel && document.documentElement.classList.contains('contact-right') && !rail.classList.contains('is-collapsed');
    const panel=rail.getBoundingClientRect();
    for(const node of targets){
      const box=node.getBoundingClientRect();
      const overlaps=active && box.top<panel.bottom && box.bottom>panel.top && box.right>panel.left && box.left<panel.right;
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
