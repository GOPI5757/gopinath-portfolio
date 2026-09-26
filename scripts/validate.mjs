// Run with Node.js: node scripts/validate.mjs. No packages needed.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const errors=[];const assets=new Set();let modules=0;
function visit(value,where){
  if(typeof value==='string'){
    if(/^(\.\/)?assets\//.test(value))assets.add(value.replace(/^\.\//,''));
  }else if(Array.isArray(value)){value.forEach((v,i)=>visit(v,`${where}[${i}]`))}
  else if(value&&typeof value==='object'&&value.enabled!==false){Object.entries(value).forEach(([k,v])=>visit(v,`${where}.${k}`))}
}
for(const file of fs.readdirSync(path.join(root,'config')).filter(f=>f.endsWith('.js'))){
  const full=path.join(root,'config',file);execFileSync(process.execPath,['--check',full]);
  const data=await import(pathToFileURL(full));visit(data,file);modules++;
}
for(const file of fs.readdirSync(path.join(root,'js')).filter(f=>f.endsWith('.js')))execFileSync(process.execPath,['--check',path.join(root,'js',file)]);
for(const asset of assets){
  let dir=root;
  for(const part of decodeURIComponent(asset).split('/')){
    if(!fs.existsSync(dir)||!fs.statSync(dir).isDirectory()||!fs.readdirSync(dir).includes(part)){errors.push(`Missing or wrong-case asset: ${asset}`);break}
    dir=path.join(dir,part);
  }
}
const {projectItems}=await import(pathToFileURL(path.join(root,'config/projects.js')));
const ids=projectItems.filter(p=>p.enabled).map(p=>p.id);
if(new Set(ids).size!==ids.length)errors.push('Duplicate project IDs');
const {projectCodeSnippets}=await import(pathToFileURL(path.join(root,'config/code-snippets.js')));
const {normalizeGroup}=await import(pathToFileURL(path.join(root,'js/code-model.js')));
for(const [id,groups] of Object.entries(projectCodeSnippets)){
 if(!projectItems.some(p=>p.id===id))errors.push(`Unknown code project: ${id}`);
 const groupIds=new Set();
 for(const group of groups){
  if(!group.id || groupIds.has(group.id))errors.push(`Missing or duplicate code group id in ${id}`);
  groupIds.add(group.id);
  try{normalizeGroup(group)}catch(error){errors.push(`${id}/${group.id}: ${error.message}`)}
 }
}
const {experience}=await import(pathToFileURL(path.join(root,'config/experience.js')));
for(const type of ['desktop','tablet','mobile']){
 if(!experience.profileVideo.sources[type]?.src||!experience.profileVideo.sources[type]?.poster)errors.push(`Missing ${type} video/poster config`);
}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`PASS: ${modules} config modules; ${ids.length} projects; ${assets.size} asset references exist with exact filename case; JavaScript syntax valid.`);
