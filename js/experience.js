import { experience as settings } from "../config/experience.js";
import { el } from "./utils.js";
let cleanup=[];
export function onRouteDispose(fn){cleanup.push(fn)}
export function disposeRoute(){cleanup.splice(0).forEach(fn=>fn());document.querySelectorAll('dialog[open]').forEach(d=>d.close())}

export function applyExperience(){
  const {contact:c,projectGrid:g,profileVideo:v,projectBrowser:b}=settings;
  const root=document.documentElement;
  const numeric=(value,fallback)=>Number.isFinite(Number(value))?Number(value):fallback;
  const columns=value=>Math.max(1,Math.min(6,Math.round(numeric(value,2))));
  const css=el('style',{text:`
    :root{--contact-panel-width:${c.panelWidth};--contact-top:${c.topOffset};--grid-gap:${g.gap};--cover-opacity:${g.coverOpacity};--hero-min-height:${v.desktopMinHeight};--hero-mobile-height:${v.mobileMinHeight};--hero-overlay:${v.overlayDesktop};--hero-portrait-overlay:${v.overlayPortrait};--hero-fit:${v.objectFit};}
    .project-graph{grid-template-columns:repeat(${columns(g.desktopColumns)},minmax(0,1fr));gap:var(--grid-gap)}
    .projects-drawer{width:min(${b.maxWidth},calc(100% - 2rem));max-height:${b.maxHeight}}
    .drawer-projects{grid-template-columns:repeat(${columns(b.desktopColumns)},minmax(0,1fr))}.drawer-project img{aspect-ratio:${b.thumbnailAspectRatio}}
    @media(max-width:${numeric(b.mobileMaxWidth,760)}px){.drawer-projects{grid-template-columns:repeat(${columns(b.mobileColumns)},minmax(0,1fr))}}
    ${!g.showGraphConnectors?'.project-node::before,.project-node::after,.node-pin{display:none}':''}
    ${!g.showCategoryCode?'.category-kicker{display:none}':''}
    @media(max-width:${numeric(settings.navigation.menuMaxWidth,1100)}px){.site-header{position:sticky}.menu-toggle{display:block;min-height:44px;padding:.5rem .65rem}.site-nav{position:absolute;top:calc(100% + .35rem);right:0;display:none;flex-direction:column;align-items:stretch;min-width:13rem;padding:.5rem;border:1px solid var(--line);background:var(--surface);box-shadow:0 1rem 2rem #0006}.site-header.nav-open .site-nav{display:flex}.nav-link{padding:.75rem}}
    @media(max-width:${numeric(g.tabletMaxWidth,1100)}px){.project-graph{grid-template-columns:repeat(${columns(g.tabletColumns)},minmax(0,1fr))}}
    @media(max-width:${numeric(g.mobileMaxWidth,760)}px){.project-graph{grid-template-columns:repeat(${columns(g.mobileColumns)},minmax(0,1fr));gap:${g.mobileGap}}.project-node{min-height:${g.mobileCardMinHeight};padding:.8rem}.node-title{font-size:${g.mobileTitleSize};line-height:1.2;letter-spacing:-.025em}.node-meta{font-size:.75rem;overflow-wrap:anywhere}.node-open{font-size:.75rem}.node-index{margin-bottom:1rem}.project-category-panel{padding:.65rem}.node-label{font-size:.75rem}}
    @media(max-width:${numeric(v.mobileMaxWidth,600)}px){.profile-section.has-video{min-height:var(--hero-mobile-height);aspect-ratio:9/16}.has-video .profile-grid{align-self:start;padding:2rem 1.2rem}.has-video .profile-copy{width:100%;max-width:none}.has-video .hero-title{font-size:clamp(2.8rem,11vw,4rem)}.has-video .chip-row{gap:.35rem}.has-video .chip{font-size:.75rem}.has-video .profile-description{line-height:1.55}}
    ${settings.projectDetail.documents?.sticky ? `@media(min-width:${numeric(settings.projectDetail.documents.stickyMinWidth,761)}px) and (min-height:${numeric(settings.projectDetail.documents.stickyMinHeight,650)}px){.project-detail .documents-toolbar{position:sticky;top:calc(var(--header-height) + var(--project-bar-height));max-height:${settings.projectDetail.documents.maxHeight};overflow-y:auto}}` : ''}
    ${settings.customCSS || ''}
  `});document.head.append(css);
  const query=matchMedia(`(max-width:${numeric(c.mobileMaxWidth,760)}px), (max-height:${numeric(c.shortMaxHeight,520)}px)`);
  const update=()=>{const bottom=c.placement==='bottom'||(c.placement!=='right'&&query.matches);root.classList.toggle('contact-bottom',bottom);root.classList.toggle('contact-right',!bottom);root.classList.toggle('reserve-contact-space',c.reserveContentSpace!==false)};
  query.addEventListener('change',update);update();
}

export function attachProfileVideo(section){
  const config=settings.profileVideo;
  if(!config.enabled)return;
  section.classList.add('has-video');
  const media=el('div',{className:'profile-video-layer','attrs':{'aria-hidden':'true'}});
  const video=el('video',{className:'profile-background-video',attrs:{muted:'',playsinline:'',loop:'',preload:'none',tabindex:'-1'}});
  video.muted=true;media.append(video);section.prepend(media);
  const button=el('button',{className:'profile-video-toggle',text:config.pauseLabel,attrs:{type:'button'}});
  if(config.showPauseButton)section.append(button);
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let userPaused=config.autoplay===false||(config.respectReducedMotion&&motion.matches)||(config.respectDataSaver&&navigator.connection?.saveData===true);
  let inView=true,variant='',disposed=false,ready=false,timer;
  function state(){button.textContent=video.paused?config.playLabel:config.pauseLabel;button.setAttribute('aria-label',button.textContent)}
  function play(){if(disposed||!variant||!ready)return;if(userPaused||!inView||document.hidden){video.pause();state();return}if(!video.getAttribute('src')){video.src=config.sources[variant].src;video.load()}video.play().catch(state)}
  function choose(){
    const ratio=section.clientWidth/section.clientHeight;
    const next=ratio<config.portraitMaxRatio?'mobile':ratio<config.squareMaxRatio?'tablet':'desktop';
    if(next===variant)return;variant=next;ready=false;section.dataset.videoShape=next;
    video.pause();video.removeAttribute('src');video.poster=config.sources[next].poster;video.load();
    clearTimeout(timer);timer=setTimeout(()=>{ready=true;play()},config.loadDelayMs);state();
  }
  button.addEventListener('click',()=>{userPaused=!video.paused;ready=true;play()});
  video.addEventListener('play',state);video.addEventListener('pause',state);
  const onError=()=>{media.classList.add('video-unavailable');video.removeAttribute('src');video.load();state()};video.addEventListener('error',onError,{once:true});
  const resize=new ResizeObserver(choose);resize.observe(section);
  const intersection=new IntersectionObserver(([entry])=>{inView=!config.pauseWhenOffscreen||entry.isIntersecting;play()},{threshold:.08});intersection.observe(section);
  const motionChange=()=>{if(config.respectReducedMotion){userPaused=motion.matches;play()}};
  document.addEventListener('visibilitychange',play);motion.addEventListener('change',motionChange);
  onRouteDispose(()=>{disposed=true;clearTimeout(timer);resize.disconnect();intersection.disconnect();document.removeEventListener('visibilitychange',play);motion.removeEventListener('change',motionChange);video.pause();video.removeAttribute('src');video.load()});
}
