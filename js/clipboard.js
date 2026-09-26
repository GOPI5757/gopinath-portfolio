// A blocked permission request must not leave Copy waiting indefinitely.
export async function copyText(text) {
  if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
  let timer;
  try {
    await Promise.race([
      navigator.clipboard.writeText(text),
      new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error("Clipboard unavailable")),1200)}),
    ]);
  } finally {clearTimeout(timer);}
}
