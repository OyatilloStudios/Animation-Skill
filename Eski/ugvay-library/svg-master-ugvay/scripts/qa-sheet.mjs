// QA contact sheet: one still from the middle of every scene (+ optional extra times) → one PNG.
// Send this PNG to the AI (Gemini/ChatGPT/Claude) and ask it to fix what it sees.
// Usage: node qa-sheet.mjs film.html sheet.png [--times 1.2,3.4] [--cuts]   (--cuts adds frames ±0.1 s around every cut)
import { chromium } from 'playwright';
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const a = process.argv.slice(2), pos = a.filter((x, i) => !x.startsWith('--') && !(a[i - 1] || '').match(/^--times$/));
const [htmlArg, outArg = 'sheet.png'] = pos; if (!htmlArg) { console.log('usage: node qa-sheet.mjs film.html sheet.png [--times 1,2] [--cuts]'); process.exit(1); }
const HTML = path.resolve(htmlArg), ROOT = path.dirname(HTML), ti = a.indexOf('--times'), CUTS = a.includes('--cuts');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.ogg': 'audio/ogg', '.m4a': 'audio/mp4', '.json': 'application/json' };
const server = http.createServer((q, r) => { const p = path.join(ROOT, decodeURIComponent(q.url.split('?')[0]));
  if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { 'Content-Type': MIME[path.extname(p).toLowerCase()] || 'application/octet-stream' }); fs.createReadStream(p).pipe(r); });
await new Promise(r => server.listen(0, '127.0.0.1', r));
const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--disable-gpu', '--mute-audio'] });
const p = await b.newPage({ viewport: { width: 1280, height: 720 } }); const errs = [];
p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && !/Failed to load resource/.test(m.text()) && errs.push(m.text()));
p.on('response', r => r.status() >= 400 && !/favicon/.test(r.url()) && errs.push(`missing file (${r.status()}): ${decodeURIComponent(r.url().replace(/^https?:\/\/[^/]+\//, ''))}`));
await p.goto(`http://127.0.0.1:${server.address().port}/${encodeURIComponent(path.basename(HTML))}?t=0`);
await p.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
const info = await p.evaluate(() => ({ qa: window.__qa, sc: window.__scenes || [], err: window.__errors || [], dur: window.__DUR }));
let times = ti >= 0 ? a[ti + 1].split(',').map(Number) : (info.qa || [0.5, 0.25, 0.5, 0.75, 0.98].map(f => +(f * info.dur).toFixed(2)));
if (CUTS) info.sc.slice(1).forEach(s => times.push(+(s.start - .1).toFixed(2), +(s.start + .1).toFixed(2)));
times = [...new Set(times)].sort((x, y) => x - y);
const shots = [];
const isCanvas = await p.evaluate(() => !!document.querySelector('canvas') && !document.querySelector('#stage'));
if (!isCanvas) { const W = await p.evaluate(() => window.__W || 1920), H = await p.evaluate(() => window.__H || 1080); const w = W > H ? 640 : 360;
  await p.setViewportSize({ width: w, height: Math.round(w * H / W) }); await p.waitForTimeout(150); }
const textIssues = [];
for (const t of times) {
  if (isCanvas) shots.push(await p.evaluate(t => { window.__seek(t); const c = document.querySelector('canvas'), s = document.createElement('canvas');
    const w = c.width > c.height ? 640 : 360; s.width = w; s.height = Math.round(w * c.height / c.width); s.getContext('2d').drawImage(c, 0, 0, s.width, s.height); return s.toDataURL('image/jpeg', .85); }, t));
  else { await p.evaluate(t => window.__seek(t), t);
    // text-overlap check (TextLayout TL.scan) — red boxes are drawn on the sheet, list printed below
    const ti = await p.evaluate(t => { if (!window.TL) return []; const svg = document.querySelector('svg'); if (!svg) return []; const W = window.__W || 1920, H = window.__H || 1080;
      const r = TL.scan(svg, { W, H, frame: svg, tol: .06 }); const NS = 'http://www.w3.org/2000/svg'; const g = document.createElementNS(NS, 'g'); g.id = '__tlqa'; const vb = svg.viewBox.baseVal; const kx = vb && vb.width ? vb.width / W : 1;
      r.issues.filter(i => i.type === 'overlap').forEach(i => [i.A, i.B].forEach(b => { const q = document.createElementNS(NS, 'rect'); Object.entries({ x: b.x * kx, y: b.y * kx, width: b.w * kx, height: b.h * kx, fill: 'none', stroke: '#ff2040', 'stroke-width': 4 * kx }).forEach(([k, v]) => q.setAttribute(k, v)); g.appendChild(q) }));
      svg.appendChild(g); return r.issues.filter(i => i.type === 'overlap').map(i => `t=${t}: overlap "${i.a}" × "${i.b}"`) }, t);
    textIssues.push(...ti);
    shots.push('data:image/jpeg;base64,' + (await p.screenshot({ type: 'jpeg', quality: 85 })).toString('base64')); await p.evaluate(() => document.getElementById('__tlqa')?.remove()); }
}
const labels = times.map(t => { const i = info.sc.findIndex(s => t < s.start + s.dur); const s = info.sc[i < 0 ? info.sc.length - 1 : i]; return `${(i < 0 ? info.sc.length : i + 1)} ${s ? (s.type || s.title || '').slice(0, 26) : ''}  t=${t}`; });
const png = await p.evaluate(({ shots, labels }) => new Promise(async res => {
  const ims = await Promise.all(shots.map(u => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.src = u; })));
  const w = ims[0].width, h = ims[0].height, cols = w > h ? 3 : 5, rows = Math.ceil(ims.length / cols), g = 8, c = document.createElement('canvas');
  c.width = cols * (w + g) + g; c.height = rows * (h + g + 26) + g; const x = c.getContext('2d'); x.fillStyle = '#222'; x.fillRect(0, 0, c.width, c.height);
  ims.forEach((im, i) => { const X = g + (i % cols) * (w + g), Y = g + Math.floor(i / cols) * (h + g + 26); x.drawImage(im, X, Y + 26); x.fillStyle = '#ffd400'; x.font = 'bold 16px monospace'; x.fillText(labels[i], X + 2, Y + 18); });
  res(c.toDataURL('image/png')); }), { shots, labels });
fs.writeFileSync(outArg, Buffer.from(png.split(',')[1], 'base64'));
console.log(`scenes: ${info.sc.map(s => s.type || s.title).join(' → ')}  (${info.dur?.toFixed?.(2)} s)`);
console.log(info.err.length || errs.length ? 'ERRORS:\n  ' + [...info.err, ...errs].join('\n  ') : 'no errors');
const warns = await p.evaluate(() => window.__warnings || []);
if (warns.length) console.log('WARNINGS:\n  ' + warns.join('\n  '));
console.log(textIssues.length ? 'TEXT OVERLAPS (red boxes on the sheet):\n  ' + textIssues.join('\n  ') : 'text: no overlaps');
console.log('sheet →', path.resolve(outArg));
await b.close(); server.close();
