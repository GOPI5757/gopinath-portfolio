import assert from 'node:assert/strict';
import {fillCollageSources} from '../js/intro-layout.js';
import {normalizeGroup} from '../js/code-model.js';
import {projectCodeSnippets} from '../config/code-snippets.js';
// Preserve original order and fill only missing cells, including a one-image collage.
for(const count of [1,2,9,14,15,16]){
 const source=Array.from({length:count},(_,i)=>`image-${i}`),filled=fillCollageSources(source,3,3);
 assert.deepEqual(filled.slice(0,count),source);
 assert.equal(filled.length,Math.max(9,Math.ceil(count/3)*3));
 assert(filled.every(item=>source.includes(item)));
}
assert.deepEqual(fillCollageSources([],3,3),[]);
const example=structuredClone(projectCodeSnippets['digging-game'][0]);
assert.equal(normalizeGroup(example).connections.length,example.connections.length);
for(const groups of Object.values(projectCodeSnippets)) for(const group of groups){assert.equal(group.placeholder,false);normalizeGroup(group);}
const invalid=structuredClone(example);invalid.connections[0].to.end=1000;
assert.throws(()=>normalizeGroup(invalid),/Invalid connection/);
const duplicate=structuredClone(example);duplicate.snippets[1].id=duplicate.snippets[0].id;
assert.throws(()=>normalizeGroup(duplicate),/duplicate snippet/);
const missing=structuredClone(example);missing.connections[0].from.snippet='missing';
assert.throws(()=>normalizeGroup(missing),/Invalid connection/);
const offset={snippets:[{id:'file',startLine:40,code:'one\r\ntwo',highlights:[{start:40,end:41}]}],connections:[{id:'self',from:{snippet:'file',start:40},to:{snippet:'file',start:41}}]};
assert.deepEqual(normalizeGroup(offset).snippets[0].lines,['one','two']);
console.log('PASS: collage coverage/order, line offsets, multiple destinations, invalid endpoints and duplicate IDs.');
