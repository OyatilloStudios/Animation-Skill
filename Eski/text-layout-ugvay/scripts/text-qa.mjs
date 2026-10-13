// TEXT QA — finds overlapping / cut-off / out-of-safe-area text in ANY HTML animation (SVG, HTML/CSS, or canvas that calls TL.track).
// Usage: node text-qa.mjs page.html report.png [--times 1,2.5,4] [--every 0.5] [--safe 0.05]
// Works with LESSON (svgmaster), FILM (motion-engine) and custom pages exposing window.__seek(t) (otherwise a single still).
import { chromium } from 'playwright'; import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import url from 'node:url';
const a = process.argv.slice(2); const [htmlArg, outArg = 'text-qa.png'] = a; if (!htmlArg) { console.log('usage: node text-qa.mjs page.html report.png [--times ..] [--every s]'); process.exit(1); }
const opt = k => { const i = a.indexOf(k); return i > 0 ? a[i + 1] : null };
const HTML = path.resolve(htmlArg), ROOT = path.dirname(HTML); const TLJS = fs.readFileSync(path.join(path.dirname(url.fileURLToPath(import.meta.url)), '..', 'textlayout.js'), 'utf8');
const server = http.createServer((q, r) => { const p = path.join(ROOT, decodeURIComponent(q.url.split('?')[0])); if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { r.writeHead(404); return r.end() }
  const ext = path.extname(p); r.writeHead(200, { 'Content-Type': { '.html': 'text/html', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' }[ext] || 'application/octet-stream' }); fs.createReadStream(p).pipe(r) });
await new Promise(r => server.listen(0, '127.0.0.1', r));
const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--disable-gpu', '--mute-audio'] }); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
await p.goto(`http://127.0.0.1:${server.address().port}/${encodeURIComponent(path.basename(HTML))}?t=0`);
await p.waitForFunction(() => window.__ready === true, null, { timeout: 15000 }).catch(() => {}); await p.waitForTimeout(300);
await p.evaluate(src => { if (!window.TL) (0, eval)(src) }, TLJS);
const dur = await p.evaluate(() => window.__DUR || window.__duration || 0); const hasSeek = await p.evaluate(() => typeof window.__seek === 'function');
let times = opt('--times') ? opt('--times').split(',').map(Number) : null; const every = +(opt('--every') || 0);
if (!times) times = hasSeek && dur ? (every ? Array.from({ length: Math.floor(dur / every) }, (_, i) => +(i * every + every / 2).toFixed(2)) : (await p.evaluate(() => window.__qa || null)) || Array.from({ length: 12 }, (_, i) => +((i + .5) * dur / 12).toFixed(2))) : [0];
const safeK = +(opt('--safe') || 0); const all = []; const shots = [];
for (const t of times) {
  if (hasSeek) await p.evaluate(t => { window.TL && TL.resetFrame && TL.resetFrame(); window.__seek(t) }, t);
  const res = await p.evaluate(safeK => { const svg = document.querySelector('svg#stage') || document.querySelector('svg'); const cv = document.querySelector('canvas');
    const W = window.__W || (svg && svg.viewBox.baseVal.width) || (cv && cv.width) || innerWidth, H = window.__H || (svg && svg.viewBox.baseVal.height) || (cv && cv.height) || innerHeight;
    const root = svg || document.body; const frame = svg || cv || document.body; const S = safeK ? TL.safe(W, H, Math.round(Math.min(W, H) * safeK)) : { x: 0, y: 0, w: W, h: H };
    const r = TL.scan(root, { W, H, frame, safe: S, tol: .06 }); const issues = r.issues.map(i => ({ type: i.type, a: i.a, b: i.b, A: i.A && { x: i.A.x, y: i.A.y, w: i.A.w, h: i.A.h }, B: i.B && { x: i.B.x, y: i.B.y, w: i.B.w, h: i.B.h } }));
    (TL.frameIssues ? TL.frameIssues() : []).forEach(i => issues.push({ type: 'overlap (canvas)', a: i.a, b: i.b }));
    // draw red boxes
    const box = document.createElement('div'); box.id = '__tq'; box.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:99999'; const fr = frame.getBoundingClientRect(); const k = fr.width / W;
    issues.forEach(i => [i.A, i.B].filter(Boolean).forEach(q => { const d = document.createElement('div'); d.style.cssText = `position:fixed;left:${fr.left + q.x * k}px;top:${fr.top + q.y * k}px;width:${q.w * k}px;height:${q.h * k}px;border:3px solid ${i.type === 'outside' ? '#ffb000' : '#ff2040'}`; box.appendChild(d) }));
    document.body.appendChild(box); return { issues, n: r.boxes.length } }, safeK);
  res.issues.forEach(i => all.push(`t=${t}: ${i.type} "${i.a}"${i.b ? ' × "' + i.b + '"' : ''}`));
  if (res.issues.length) shots.push({ t, img: 'data:image/jpeg;base64,' + (await p.screenshot({ type: 'jpeg', quality: 80 })).toString('base64') });
  await p.evaluate(() => document.getElementById('__tq')?.remove());
}
if (shots.length) { const png = await p.evaluate(shots => new Promise(async res => { const ims = await Promise.all(shots.map(s => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.src = s.img }))); const w = 640, h = Math.round(w * ims[0].height / ims[0].width), cols = 2, rows = Math.ceil(ims.length / cols), c = document.createElement('canvas'); c.width = cols * (w + 8) + 8; c.height = rows * (h + 34) + 8; const x = c.getContext('2d'); x.fillStyle = '#222'; x.fillRect(0, 0, c.width, c.height); ims.forEach((im, i) => { const X = 8 + (i % cols) * (w + 8), Y = 8 + Math.floor(i / cols) * (h + 34); x.drawImage(im, X, Y + 26, w, h); x.fillStyle = '#ffd400'; x.font = 'bold 16px monospace'; x.fillText('t=' + shots[i].t, X, Y + 18) }); res(c.toDataURL('image/png')) }), shots); fs.writeFileSync(outArg, Buffer.from(png.split(',')[1], 'base64')) }
const warns = await p.evaluate(() => window.__warnings || []); if (warns.length) console.log('ENGINE WARNINGS:\n  ' + warns.join('\n  '));
console.log(all.length ? `TEXT PROBLEMS (${all.length}) — red = overlap, orange = outside safe area:\n  ` + all.join('\n  ') + `\nreport → ${path.resolve(outArg)}` : `text OK: ${times.length} frame(s) checked, no overlaps`);
await b.close(); server.close(); process.exit(all.length ? 2 : 0);
