// QA stills: node frames.mjs <abs html> <outDir> <t1,t2,...>
// Renders exact timestamps via window.__seek(t) and saves PNGs + reports page errors.
import { chromium } from 'playwright';
const [,, html, outDir, list] = process.argv;
const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args:['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
await p.goto('file://' + html + '?t=0'); await p.waitForFunction(()=>window.__ready!==false,null,{timeout:60000}); await p.waitForTimeout(200);
const times = list.split(',').map(Number);
for (const t of times) {
  await p.evaluate(t => window.__seek(t), t);
  await p.locator('canvas, #stage').first().screenshot({ path: `${outDir}/t_${t.toFixed(2)}.png` });
}
console.log('stills', times.length, 'errors', JSON.stringify(errs));
await b.close();
