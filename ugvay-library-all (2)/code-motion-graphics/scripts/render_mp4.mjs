// Usage: node render_mp4.mjs <abs html> <out.mp4> [fps]
// Requires page to expose window.__seek(t), window.__DUR, optional window.__renderAudio()
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
const [,, html, out, fpsArg='30'] = process.argv; const fps=+fpsArg;
const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args:['--allow-file-access-from-files','--autoplay-policy=no-user-gesture-required'] });
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://' + html + '?t=0'); await p.waitForFunction(()=>window.__ready!==false,null,{timeout:60000}); await p.waitForTimeout(200);
const dur = await p.evaluate(() => window.__DUR);
let wav=null;
if (await p.evaluate(()=>typeof window.__renderAudio==='function')) {
  wav = out.replace(/\.mp4$/,'') + '.wav';
  fs.writeFileSync(wav, Buffer.from(await p.evaluate(()=>window.__renderAudio()),'base64'));
}
const args=['-y','-f','image2pipe','-framerate',String(fps),'-i','-'];
if (wav) args.push('-i',wav,'-c:a','aac','-b:a','192k','-shortest');
args.push('-c:v','libx264','-pix_fmt','yuv420p','-crf','18','-preset','medium','-movflags','+faststart',out);
const ff=spawn('ffmpeg',args,{stdio:['pipe','ignore','inherit']});
const total=Math.round(dur*fps);
for(let i=0;i<total;i++){
  await p.evaluate(t=>window.__seek(t), i/fps);
  const buf=await p.locator('canvas').screenshot({type:'jpeg',quality:92});
  if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once('drain',r));
}
ff.stdin.end(); await new Promise(r=>ff.on('close',r));
console.log('done',out,'frames',total,'errors',JSON.stringify(errs));
await b.close();
