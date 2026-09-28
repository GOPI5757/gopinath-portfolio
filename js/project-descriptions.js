import {projectSettings} from "../config/projects.js";

// Theme-matched description panels; all controls remain in config/projects.js.
export function applyProjectDescriptionStyle(main,project) {
  const shared=projectSettings.detail.descriptions;
  if(!shared.enabled || project.descriptionStyle?.enabled===false)return;
  const config={...shared,...project.descriptionStyle};
  const probe=document.createElement("span");
  probe.style.display="none";
  main.append(probe);
  const resolveColor=(value,fallback)=>{
    probe.style.color=value;
    const channels=getComputedStyle(probe).color.match(/^rgba?\(([^)]+)\)/)?.[1].split(/[ ,/]+/).slice(0,3).map(Number);
    return channels?.length===3 && channels.every(Number.isFinite)?channels:fallback;
  };
  const rgb=resolveColor(config.background==="auto" ? "var(--project-surface, #10131c)" : config.background,[16,19,28]);
  const muted=resolveColor("var(--project-muted, #ffffff)",[255,255,255]);
  const accent=resolveColor("var(--project-accent, #ffffff)",[255,255,255]);
  probe.remove();
  const luminance=(color)=>{
    const linear=color.map(c=>{const v=c/255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;});
    return .2126*linear[0]+.7152*linear[1]+.0722*linear[2];
  };
  const opacity=Number.isFinite(Number(config.opacity))?Math.max(0,Math.min(1,Number(config.opacity))):.9;
  // Check contrast against both extremes of imagery beneath the translucent panel.
  const backgrounds=[0,255].map(base=>luminance(rgb.map(c=>c*opacity+base*(1-opacity))));
  const contrast=(color)=>Math.min(...backgrounds.map(bg=>{
    const fg=luminance(color);return (Math.max(fg,bg)+.05)/(Math.min(fg,bg)+.05);
  }));
  const automatic=contrast(muted)>=4.5?muted:(contrast([255,255,255])>=contrast([16,16,16])?[255,255,255]:[16,16,16]);
  const text=config.textColor==="auto" ? `rgb(${automatic.join(",")})` : config.textColor;
  const borderOpacity=Number.isFinite(Number(config.borderOpacity))?Math.max(0,Math.min(1,Number(config.borderOpacity))):.22;
  const selectors={hero:".project-detail-description",technical:".technical-description",code:".code-group-description,.code-explanation > p:last-child"};
  for(const [kind,selector] of Object.entries(selectors)){
    if(config[kind]?.enabled===false)continue;
    for(const node of main.querySelectorAll(selector)){
      node.classList.add("project-readable-description");
      node.style.setProperty("--description-panel",`rgba(${rgb.join(",")},${opacity})`);
      node.style.setProperty("--description-padding",config.padding || "0.7rem 1rem");
      node.style.setProperty("--description-border",`rgba(${accent.join(",")},${borderOpacity})`);
      node.style.setProperty("--description-radius",config.radius || "0.65rem");
      node.style.color=text;
    }
  }
}
