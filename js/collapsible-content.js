import {projectSettings,projectItems} from "../config/projects.js";
import { el } from "./utils.js";

let serial = 0;
export function collapseOptions(projectId, type, id, entry) {
  const project = projectItems.find(p=>p.id===projectId);
  if (!projectSettings.collapse.enabled || project?.collapseEnabled === false) return {enabled:false};
  const local = type === "sections" ? project?.sections?.[id]?.collapse
    : type === "technicalBlocks" ? entry?.collapse
    : project?.sections?.code?.blocks?.[id]?.collapse;
  return {...projectSettings.collapse.defaults?.[type], ...local};
}

// Hide siblings along the heading's ancestry, keeping existing grid/figure markup intact.
export function collapsible(root, heading, options) {
  if (!root || !heading || !options?.enabled) return root;
  const targets = [];
  for(let branch=heading;branch!==root;branch=branch.parentElement){
    if(!branch.parentElement)return root;
    for(const sibling of branch.parentElement.children)if(sibling!==branch)targets.push(sibling);
  }
  if(!targets.length)return root;
  const originalHidden=new Map(targets.map(node=>[node,node.hidden]));
  const prefix=`collapse-${++serial}`;
  targets.forEach((node,i)=>{if(!node.id)node.id=`${prefix}-${i}`;});
  const label=heading.textContent;
  const button=el("button",{className:"collapse-heading-button",attrs:{type:"button","aria-controls":targets.map(n=>n.id).join(" ")}});
  const arrow=el("span",{className:"collapse-heading-arrow",text:"›",attrs:{"aria-hidden":"true"}});
  const text=el("span",{},[...heading.childNodes]);
  button.append(text,arrow);heading.append(button);
  root.classList.add("has-collapse-control");
  let collapsed=options.initiallyCollapsed===true;
  function update(){
    button.setAttribute("aria-expanded",String(!collapsed));
    button.title=`${collapsed?"Expand":"Collapse"} ${label}`;
    root.classList.toggle("is-content-collapsed",collapsed);
    targets.forEach(node=>{node.hidden=collapsed || originalHidden.get(node);});
    root.dispatchEvent(new CustomEvent("contentvisibilitychange",{bubbles:true}));
  }
  button.addEventListener("click",()=>{collapsed=!collapsed;update();});
  update();
  return root;
}
