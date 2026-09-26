export function normalizeGroup(group) {
  const snippets = (group.snippets || []).filter(s => s.enabled !== false).map(s => ({
    ...s, startLine: Number.isInteger(s.startLine) && s.startLine > 0 ? s.startLine : 1,
    lines: String(s.code ?? "").replace(/\r\n?/g, "\n").split("\n"),
  }));
  const ids = new Set();
  for (const s of snippets) {
    if (!/^[a-zA-Z0-9_-]+$/.test(s.id) || ids.has(s.id)) throw new Error(`Invalid or duplicate snippet id: ${s.id}`);
    ids.add(s.id);
  }
  const rangeValid = r => {
    const s = snippets.find(s => s.id === r?.snippet);
    return Boolean(s && Number.isInteger(r.start) && Number.isInteger(r.end ?? r.start) && r.start >= s.startLine && (r.end ?? r.start) >= r.start && (r.end ?? r.start) < s.startLine + s.lines.length);
  };
  for (const s of snippets) for (const h of s.highlights || []) {
    if (!rangeValid({ ...h, snippet: s.id })) throw new Error(`Invalid highlight in ${s.id}`);
  }
  const connectionIds = new Set();
  const connections = (group.connections || []).filter(c => c.enabled !== false);
  for (const c of connections) {
    if (!c.id || connectionIds.has(c.id) || !rangeValid(c.from) || !rangeValid(c.to)) throw new Error(`Invalid connection: ${c.id}`);
    connectionIds.add(c.id);
  }
  return { ...group, snippets, connections };
}
