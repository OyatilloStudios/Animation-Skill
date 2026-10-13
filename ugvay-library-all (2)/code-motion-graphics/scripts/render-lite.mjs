#!/usr/bin/env node
/* render-lite.mjs — gentle, headless, resumable HTML → MP4 renderer
   - No window on screen (headless), GPU disabled, low process priority, frame-rate cap, cool-down pauses
   - Serves the HTML's folder over a local HTTP server → external .js / images / fonts / audio all load
   - Works with ANY animation page:
       mode "seek":  page exposes window.__seek(t)         (this skill's templates) — exact
       mode "clock": no __seek → virtual clock (Date, performance.now, rAF, timers) + CSS/WAAPI animations set per frame
   - Audio: window.__renderAudio() → WAV, or --audio file, or first <audio>/<video> src found in the page
   - Resumable: frames are saved to disk; re-run the same command to continue after a crash/shutdown

   Usage:
     node render-lite.mjs film.html out.mp4 [--fps 30] [--duration 15] [--width 1920 --height 1080]
          [--max-fps 8] [--pause-every 150 --pause-sec 5] [--threads 2] [--quality 90]
          [--audio music.wav] [--draft] [--keep-frames] [--selector canvas]
   Gentlest:  nice -n 19 node render-lite.mjs film.html out.mp4 --max-fps 5 --threads 1      (Linux/macOS)
              start /low /b node render-lite.mjs film.html out.mp4 --max-fps 5 --threads 1   (Windows)
*/
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';

const argv = process.argv.slice(2);
const FLAGS = /^--(draft|keep-frames)$/;
const pos = argv.filter((a, i) => { const p = argv[i - 1] || ''; return !a.startsWith('--') && (!p.startsWith('--') || FLAGS.test(p)); });
const opt = (k, d) => { const i = argv.indexOf('--' + k); return i < 0 ? d : (argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : true); };
const [htmlArg, outArg] = pos;
if (!htmlArg || !outArg) { console.log('usage: node render-lite.mjs film.html out.mp4 [options]  (see header)'); process.exit(1); }
const HTML = path.resolve(htmlArg), OUT = path.resolve(outArg), ROOT = path.dirname(HTML);
const draft = !!opt('draft', false);
const FPS = +opt('fps', draft ? 15 : 30), MAXFPS = +opt('max-fps', 0), THREADS = String(opt('threads', 2));
const PAUSE_EVERY = +opt('pause-every', 0), PAUSE_SEC = +opt('pause-sec', 5), Q = +opt('quality', draft ? 75 : 90);
const SEL = opt('selector', null), AUDIO_ARG = opt('audio', null), KEEP = !!opt('keep-frames', false);
let W = +opt('width', 0), H = +opt('height', 0), DUR = +opt('duration', 0);
const FR = OUT.replace(/\.mp4$/i, '') + '_frames';
try { os.setPriority(19); } catch {}                                    // lowest CPU priority for this process
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ---- tiny static server (so fetch/import/audio/images work exactly like on a website) ---- */
const MIME = { '.html':'text/html', '.js':'text/javascript', '.mjs':'text/javascript', '.css':'text/css', '.json':'application/json',
  '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.gif':'image/gif', '.svg':'image/svg+xml',
  '.wav':'audio/wav', '.mp3':'audio/mpeg', '.ogg':'audio/ogg', '.m4a':'audio/mp4', '.mp4':'video/mp4', '.webm':'video/webm',
  '.woff':'font/woff', '.woff2':'font/woff2', '.ttf':'font/ttf', '.otf':'font/otf' };
const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(p).toLowerCase()] || 'application/octet-stream', 'Access-Control-Allow-Origin': '*' });
  fs.createReadStream(p).pipe(res);
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const URL0 = `http://127.0.0.1:${server.address().port}/${path.relative(ROOT, HTML).split(path.sep).join('/')}`;

/* ---- headless browser, GPU off, one renderer process ---- */
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME || undefined,
  args: ['--disable-gpu', '--disable-gpu-compositing', '--renderer-process-limit=1', '--disable-extensions',
         '--mute-audio', '--autoplay-policy=no-user-gesture-required', '--disable-dev-shm-usage'] });
const ctxB = await browser.newContext({ viewport: { width: W || 1920, height: H || 1080 }, deviceScaleFactor: 1 });
const page = await ctxB.newPage();
const errors = []; page.on('pageerror', e => errors.push(e.message));

// install virtual clock BEFORE the page runs (only used if the page has no __seek)
await page.clock.install({ time: 0 });
await page.goto(URL0 + '?t=0', { waitUntil: 'load' });
await page.waitForFunction(() => window.__ready !== false, null, { timeout: 120000 }).catch(() => {});
const info = await page.evaluate(sel => {
  const el = sel ? document.querySelector(sel) : (document.querySelector('canvas') || document.querySelector('#stage') || document.body);
  const r = el.getBoundingClientRect();
  return { seek: typeof window.__seek === 'function', dur: window.__DUR || 0, audioFn: typeof window.__renderAudio === 'function',
    canvas: el.tagName === 'CANVAS', cw: el.width || 0, ch: el.height || 0, rect: [r.x, r.y, r.width, r.height],
    media: [...document.querySelectorAll('audio[src],video[src],audio source[src]')].map(m => m.getAttribute('src')),
    cssMax: Math.max(0, ...document.getAnimations().map(a => { const t = a.effect.getComputedTiming(); return isFinite(t.endTime) ? t.endTime / 1000 : 0; })) };
}, SEL);
const MODE = info.seek ? 'seek' : 'clock';
DUR = DUR || info.dur || info.cssMax || 10;
if (info.canvas && !W) { W = info.cw; H = info.ch; await page.setViewportSize({ width: W, height: H }); }
W = W || 1920; H = H || 1080;
const total = Math.round(DUR * FPS);
console.log(`mode=${MODE} ${W}x${H} ${FPS}fps ${DUR}s → ${total} frames${draft ? ' (draft)' : ''}`);

/* ---- cache stamp: if the HTML/JS/CSS or options changed, old frames+audio are discarded ---- */
const stampOf = () => { const h = crypto.createHash('sha1'); h.update(JSON.stringify([W, H, FPS, DUR, SEL, Q, draft]));
  const walk = d => { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name);
    if (f.isDirectory()) { if (!/_frames$|node_modules|^\./.test(f.name)) walk(p); } else if (/\.(html?|js|mjs|css|json)$/i.test(f.name)) h.update(p + fs.readFileSync(p)); } };
  walk(ROOT); return h.digest('hex'); };
const STAMP = stampOf(), stampFile = path.join(FR, 'stamp.txt'), WAVOUT = OUT.replace(/\.mp4$/i, '') + '.wav';
if (fs.existsSync(FR) && (!fs.existsSync(stampFile) || fs.readFileSync(stampFile, 'utf8') !== STAMP)) { fs.rmSync(FR, { recursive: true, force: true }); fs.rmSync(WAVOUT, { force: true }); console.log('changes detected → fresh render'); }
if (!fs.existsSync(FR)) fs.rmSync(WAVOUT, { force: true });
fs.mkdirSync(FR, { recursive: true }); fs.writeFileSync(stampFile, STAMP);

/* ---- audio first (cheap, resumable) ---- */
let wav = null;
if (info.audioFn) { wav = OUT.replace(/\.mp4$/i, '') + '.wav'; if (!fs.existsSync(wav)) fs.writeFileSync(wav, Buffer.from(await page.evaluate(() => window.__renderAudio()), 'base64')); }
else if (AUDIO_ARG) wav = path.resolve(AUDIO_ARG);
else if (info.media.length) { const m = path.join(ROOT, info.media[0]); if (fs.existsSync(m)) wav = m; }

/* ---- frames (resumable) ---- */
fs.mkdirSync(FR, { recursive: true });
const name = i => path.join(FR, `f${String(i).padStart(5, '0')}.jpg`);
let startAt = 0; while (startAt < total && fs.existsSync(name(startAt)) && fs.statSync(name(startAt)).size > 0) startAt++;
if (startAt) console.log(`resuming at frame ${startAt}`);
if (MODE === 'clock') await page.clock.runFor(Math.round(startAt * 1000 / FPS));
const t0 = Date.now();
for (let i = startAt; i < total; i++) {
  const ts = Date.now(), t = i / FPS;
  if (MODE === 'seek') await page.evaluate(t => window.__seek(t), t);
  else { if (i > startAt) await page.clock.runFor(Math.round(1000 / FPS));
         await page.evaluate(ms => document.getAnimations().forEach(a => { a.pause(); a.currentTime = ms; }), t * 1000); }
  let buf;
  if (info.canvas) {   // fastest path: read pixels straight from the canvas (no screenshot)
    const b64 = await page.evaluate(([sel, q]) => (sel ? document.querySelector(sel) : document.querySelector('canvas')).toDataURL('image/jpeg', q).split(',')[1], [SEL, Q / 100]);
    buf = Buffer.from(b64, 'base64');
  } else {
    const [x, y, w, h] = info.rect; buf = await page.screenshot({ type: 'jpeg', quality: Q, clip: { x, y, width: w || W, height: h || H } });
  }
  fs.writeFileSync(name(i) + '.tmp', buf); fs.renameSync(name(i) + '.tmp', name(i));   // atomic → safe resume
  if (MAXFPS) { const wait = 1000 / MAXFPS - (Date.now() - ts); if (wait > 0) await sleep(wait); }
  if (PAUSE_EVERY && (i + 1) % PAUSE_EVERY === 0) { console.log(`cool-down ${PAUSE_SEC}s…`); await sleep(PAUSE_SEC * 1000); }
  if (i % 30 === 0 || i === total - 1) {
    const done = i + 1 - startAt, rate = done / ((Date.now() - t0) / 1000);
    process.stdout.write(`\rframe ${i + 1}/${total}  ${rate.toFixed(1)} fps  eta ${Math.max(0, (total - i - 1) / rate).toFixed(0)}s   `);
  }
}
console.log('');
await browser.close(); server.close();

/* ---- encode (limited threads, low priority) ---- */
const args = ['-y', '-v', 'error', '-framerate', String(FPS), '-i', path.join(FR, 'f%05d.jpg')];
if (wav) args.push('-i', wav, '-c:a', 'aac', '-b:a', '192k', '-shortest');
args.push('-threads', THREADS, '-c:v', 'libx264', '-preset', draft ? 'ultrafast' : 'medium', '-crf', draft ? '28' : '18',
  '-pix_fmt', 'yuv420p', '-movflags', '+faststart');
if (draft) args.push('-vf', 'scale=iw/2:-2');
args.push(OUT);
const ff = spawn('ffmpeg', args, { stdio: 'inherit' });
try { os.setPriority(ff.pid, 19); } catch {}
const code = await new Promise(r => ff.on('close', r));
if (code === 0 && !KEEP) { fs.rmSync(FR, { recursive: true, force: true }); if (info.audioFn) fs.rmSync(WAVOUT, { force: true }); }
console.log(code === 0 ? `done → ${OUT}` : 'ffmpeg failed', errors.length ? 'page errors: ' + JSON.stringify(errors) : '');
