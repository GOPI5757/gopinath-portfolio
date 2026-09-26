import assert from 'node:assert/strict';
import {routeConnection,pathData} from '../js/code-routing.js';
const a={left:34,right:300,top:42,bottom:310},b={left:336,right:602,top:42,bottom:340},c={left:34,right:300,top:390,bottom:670};
const rects=[a,b,c];
const route=(from,to,mobile=false)=>routeConnection({from,to,rects,width:636,height:710,mobile});
const points=route({rect:b,y:240},{rect:c,y:500});
assert(points.length>=3);assert(points.every(p=>p.y>=240 && p.y<=500),'Cross-row route should go directly down, not above the cards');
assert(points.slice(1).every((p,i)=>p.x===points[i].x||p.y===points[i].y),'All segments orthogonal');
assert(!/[CQ]/.test(pathData(points)));
const length=points.slice(1).reduce((sum,p,i)=>sum+Math.abs(p.x-points[i].x)+Math.abs(p.y-points[i].y),0);
assert.equal(length,296,'Reported screenshot case should use a Manhattan-minimal path');
const stacked=route({rect:a,y:220},{rect:c,y:500},true);assert(stacked.length>0);assert(stacked.slice(1,-1).every(p=>p.x<a.left),'Mobile arrows stay outside code cards');
const same=route({rect:a,y:140},{rect:a,y:220});assert(same.length>=4);
// Skip a middle card without traversing its interior.
const middle={left:336,right:602,top:42,bottom:340},last={left:638,right:904,top:42,bottom:340};
const across=routeConnection({from:{rect:a,y:200},to:{rect:last,y:200},rects:[a,middle,last],width:940,height:400});
assert(across.length>0);assert(across.some(p=>p.y<42||p.y>340));
console.log('PASS: minimal cross-row path, orthogonal segments, mobile gutters, same-file and obstacle avoidance.');
