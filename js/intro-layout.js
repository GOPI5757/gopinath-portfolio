export function fillCollageSources(sources, columns=3, minRows=3) {
  const originals=(sources||[]).filter(source=>typeof source==='string'&&source.trim());
  if(!originals.length)return [];
  columns=Math.max(1,Math.min(8,Math.floor(Number(columns)||3)));
  minRows=Math.max(1,Math.min(8,Math.floor(Number(minRows)||3)));
  const count=Math.max(columns*minRows,Math.ceil(originals.length/columns)*columns);
  return Array.from({length:count},(_,i)=>originals[i%originals.length]);
}
