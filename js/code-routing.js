// Shortest rectilinear routes through free space, with a small bend penalty.
// Card interiors are obstacles; ports sit on their left/right edges.
const inside=(p,r)=>p.x>r.left+.01&&p.x<r.right-.01&&p.y>r.top+.01&&p.y<r.bottom-.01;
function clear(a,b,obstacles){
  return !obstacles.some(r=>a.x===b.x
    ? a.x>r.left+.01&&a.x<r.right-.01&&Math.max(a.y,b.y)>r.top+.01&&Math.min(a.y,b.y)<r.bottom-.01
    : a.y>r.top+.01&&a.y<r.bottom-.01&&Math.max(a.x,b.x)>r.left+.01&&Math.min(a.x,b.x)<r.right-.01);
}
function simplify(points){
  return points.filter((p,i)=>!i||p.x!==points[i-1].x||p.y!==points[i-1].y).filter((p,i,a)=>!i||i===a.length-1||!((a[i-1].x===p.x&&p.x===a[i+1].x)||(a[i-1].y===p.y&&p.y===a[i+1].y)));
}
function search(start,end,rects,width,height,bendPenalty){
  const xs=[...new Set([start.x,end.x,3,width-3,...rects.flatMap(r=>[r.left,r.right])])].sort((a,b)=>a-b);
  const ys=[...new Set([start.y,end.y,3,height-3,...rects.flatMap(r=>[r.top,r.bottom])])].sort((a,b)=>a-b);
  const nodes=[],grid=new Map();
  ys.forEach((y,j)=>xs.forEach((x,i)=>{const p={x,y,i,j};if(x>=0&&x<=width&&y>=0&&y<=height&&!rects.some(r=>inside(p,r))){grid.set(`${i},${j}`,nodes.length);nodes.push(p)}}));
  const source=nodes.findIndex(p=>p.x===start.x&&p.y===start.y),target=nodes.findIndex(p=>p.x===end.x&&p.y===end.y);
  if(source<0||target<0)return null;
  const dist=new Map([[`${source}:0`,0]]),previous=new Map(),pending=new Set([`${source}:0`]);
  let final;
  while(pending.size){
    let key,best=Infinity;for(const k of pending)if(dist.get(k)<best){best=dist.get(k);key=k}
    pending.delete(key);const [index,direction]=key.split(':').map(Number),a=nodes[index];
    if(index===target){final=key;break;}
    for(const [di,dj,nextDir] of [[1,0,1],[-1,0,1],[0,1,2],[0,-1,2]]){
      const next=grid.get(`${a.i+di},${a.j+dj}`);if(next===undefined)continue;
      const b=nodes[next];if(!clear(a,b,rects))continue;
      const cost=best+Math.abs(b.x-a.x)+Math.abs(b.y-a.y)+(direction&&direction!==nextDir?bendPenalty:0),nk=`${next}:${nextDir}`;
      if(cost<(dist.get(nk)??Infinity)){dist.set(nk,cost);previous.set(nk,key);pending.add(nk)}
    }
  }
  if(!final)return null;
  const points=[];for(let k=final;k;k=previous.get(k))points.push(nodes[Number(k.split(':')[0])]);
  return {points:points.reverse().map(({x,y})=>({x,y})),cost:dist.get(final)};
}
export function routeConnection({from,to,rects,width,height,mobile=false,lane=10,bendPenalty=4}){
  const obstacles=rects.map(r=>({left:r.left-4,right:r.right+4,top:r.top-4,bottom:r.bottom+4}));
  let best;
  for(const sideA of mobile?['left']:['left','right'])for(const sideB of mobile?['left']:['left','right']){
    const a={x:from.rect[sideA],y:from.y},b={x:to.rect[sideB],y:to.y};
    const start={x:a.x+(sideA==='left'?-lane:lane),y:a.y},end={x:b.x+(sideB==='left'?-lane:lane),y:b.y};
    if(!clear(a,start,rects.filter(r=>r!==from.rect))||!clear(end,b,rects.filter(r=>r!==to.rect)))continue;
    const route=search(start,end,obstacles,width,height,bendPenalty);if(!route)continue;
    const points=simplify([a,...route.points,b]);
    const score=points.slice(1).reduce((s,p,i)=>s+Math.abs(p.x-points[i].x)+Math.abs(p.y-points[i].y),0)+(points.length-2)*bendPenalty;
    if(!best||score<best.score)best={points,score};
  }
  return best?.points || [];
}
export function pathData(points){return points.map((p,i)=>!i?`M ${p.x} ${p.y}`:p.x===points[i-1].x?`V ${p.y}`:`H ${p.x}`).join(' ')}
