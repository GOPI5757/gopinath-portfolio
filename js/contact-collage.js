import {projectSettings} from "../config/projects.js";
const config=projectSettings.contactCollage;
import {el} from "./utils.js";
import {renderImage} from "./renderers.js";
import {onRouteDispose} from "./experience.js";

export function withContactCollage(form, projects) {
  if (!config.enabled || !form) return form;
  const items=projects.filter(p=>p.enabled && config.projectOverrides?.[p.id]?.enabled!==false)
    .map(p=>config.projectOverrides?.[p.id]?.src || p.coverImage).filter(Boolean);
  if(!items.length)return form;
  const row=el("div",{className:"contact-collage-row"},form);
  const art=el("div",{className:"contact-thumbnail-collage",attrs:{"aria-hidden":"true",hidden:true}});
  row.append(art);
  row.style.setProperty("--contact-collage-form-width",form.style.maxWidth || "36rem");
  row.style.setProperty("--contact-collage-gap",config.gap || "2rem");
  art.style.setProperty("--collage-height",config.height || "34rem");
  art.style.setProperty("--collage-columns",String(Math.max(1,Math.min(6,Number(config.columns)||3))));
  art.style.setProperty("--collage-ratio",config.tileRatio || "16 / 10");
  art.style.setProperty("--collage-opacity",String(Math.max(0,Math.min(1,Number(config.opacity)||0))));
  art.style.setProperty("--collage-saturation",String(Math.max(0,Number(config.saturation)||0)));
  art.style.setProperty("--collage-rotation",`${Number(config.rotation)||0}deg`);
  art.style.setProperty("--collage-fade",config.edgeFade || "12%");
  let built=false,disposed=false;
  const query=matchMedia(`(min-width:${Math.max(761,Number(config.minViewportWidth)||1100)}px)`);
  function update(){
    if(disposed || !row.isConnected)return;
    const formWidth=parseFloat(getComputedStyle(form).maxWidth)||576;
    const gap=parseFloat(getComputedStyle(row).columnGap)||32;
    const show=query.matches && row.clientWidth>=formWidth+gap+Math.max(150,Number(config.minCollageWidth)||250);
    row.classList.toggle("has-contact-collage",show);art.hidden=!show;
    if(show&&!built){
      const grid=el("div",{className:"contact-thumbnail-grid"});
      items.forEach(src=>grid.append(el("div",{className:"contact-thumbnail-tile"},renderImage(src,"","contact-collage-image"))));
      art.append(grid);built=true;
    }
  }
  const observer=new ResizeObserver(update);observer.observe(row);
  query.addEventListener("change",update);
  onRouteDispose(()=>{disposed=true;observer.disconnect();query.removeEventListener("change",update);});
  return row;
}
