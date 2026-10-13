# Rendering & export

Contents: 1 Deterministic clock · 2 Choosing the medium · 3 Making CSS/WAAPI/GSAP seekable · 4 Three.js · 5 Remotion · 6 Frame capture pipeline · 7 FFmpeg recipes · 8 Performance · 9 Delivery without tools

## 1. Deterministic clock
- Single entry point `render(t)`; the playback loop only computes `t` and calls it.
- Live playback: `t=(performance.now()-start)/1000`, or `AudioContext.currentTime-audioStart` when sound is on (audio clock = perfect A/V sync).
- Export: `window.__seek(t)` stops the loop and renders exactly frame `i/fps`.
- No `Math.random()` at draw time; no state that accumulates between frames. If a simulation is unavoidable, precompute all frames' states once at fixed step `1/fps` and index by frame.
- Fonts: system fonts or embedded base64 `@font-face`; `await document.fonts.ready` before first capture.

## 2. Choosing the medium
| Need | Use |
| --- | --- |
| Procedural graphics, particles, type, pseudo-3D | Canvas 2D (default) |
| Crisp vector UI, icons, path drawing, DOM layout | SVG / HTML+CSS driven by `t` |
| Real lighting, materials, shaders, many 3D objects | Three.js / raw WebGL |
| Long, templated, data-driven or narrated video | Remotion (React, `useCurrentFrame`) |
| HTML-first motion with deterministic MP4 | HyperFrames-style HTML render (same idea as this skill's scripts) |

## 3. Making CSS / WAAPI / GSAP seekable
```js
// Web Animations API: pause all, then set time from render(t)
const anims=document.getAnimations(); anims.forEach(a=>a.pause());
function render(t){ anims.forEach(a=>a.currentTime=t*1000); }
// CSS keyframes: same — getAnimations() includes CSS animations once they've started (set animation-play-state: paused)
// GSAP: build a paused master timeline and seek it
const tl=gsap.timeline({paused:true}); /* tl.to(...) */ function render(t){ tl.seek(t); }
```
GSAP needs a CDN or an inlined copy; ask before adding external dependencies.

## 4. Three.js
- `renderer=new THREE.WebGLRenderer({canvas, antialias:true, preserveDrawingBuffer:true})` (needed for screenshots).
- In `render(t)`: set all object transforms/uniforms from `t`, then `renderer.render(scene,camera)`. Never use `clock.getDelta()`.
- Shader time uniform: `uTime.value=t`.

## 5. Remotion (React → MP4)
```tsx
import {AbsoluteFill,useCurrentFrame,useVideoConfig,interpolate,spring,Sequence,Composition} from 'remotion';
export const Title=()=>{const f=useCurrentFrame(),{fps}=useVideoConfig();
  const s=spring({frame:f,fps,config:{damping:12}}); const o=interpolate(f,[0,15],[0,1],{extrapolateRight:'clamp'});
  return <AbsoluteFill style={{background:'#0B0B0D',alignItems:'center',justifyContent:'center'}}>
    <h1 style={{color:'#F4F1EA',fontSize:180,transform:`scale(${s})`,opacity:o}}>Hello</h1></AbsoluteFill>;};
export const Root=()=> <Composition id="Main" component={Title} durationInFrames={450} fps={30} width={1920} height={1080}/>;
// render: npx remotion render src/index.ts Main out.mp4   (offline: remotion render entry.tsx Main out.mp4)
```
Use `<Sequence from={...} durationInFrames={...}>` for scenes, `<Audio src=...>` for music, `staticFile()` for assets. All animation must derive from `useCurrentFrame()`.

## 6. Frame capture pipeline (this skill's scripts)
1. Playwright launches Chromium at the stage size (1920×1080).
2. Load `film.html?t=0` (capture mode hides UI).
3. `__renderAudio()` renders the soundtrack in an `OfflineAudioContext` → WAV.
4. For i in 0…DUR·fps−1: `__seek(i/fps)`, screenshot the canvas (JPEG q92) → pipe into FFmpeg `image2pipe`.
5. FFmpeg muxes video + WAV → H.264/AAC MP4.
Typical speed: ~12–25 frames/s at 1080p → a 15 s film renders in ~30–60 s.

## 7. FFmpeg recipes
```bash
# PNG sequence → MP4
ffmpeg -framerate 30 -i f%04d.png -c:v libx264 -pix_fmt yuv420p -crf 18 -movflags +faststart out.mp4
# add / replace audio
ffmpeg -i out.mp4 -i music.wav -c:v copy -c:a aac -b:a 192k -shortest final.mp4
# vertical 9:16 from a 1080x1920 stage: just set the stage; or crop a 16:9 render (loses sides)
ffmpeg -i out.mp4 -vf "crop=608:1080,scale=1080:1920" vertical.mp4
# high-quality GIF (palette)
ffmpeg -i out.mp4 -vf "fps=20,scale=960:-1:flags=lanczos,split[a][b];[a]palettegen[p];[b][p]paletteuse" out.gif
# transparent WebM (render canvas with clearRect, PNG frames)
ffmpeg -framerate 30 -i f%04d.png -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 0 -crf 30 alpha.webm
# loop 3 times
ffmpeg -stream_loop 2 -i out.mp4 -c copy looped.mp4
# extract a frame for QA
ffmpeg -ss 7.5 -i out.mp4 -frames:v 1 check.png
```
Social specs: Reels/TikTok/Shorts 1080×1920 30 fps ≤ 60 s; YouTube 1920×1080 (or 3840×2160); X/LinkedIn 1920×1080 or 1080×1080, H.264 + AAC.

## 8. Performance
- Keep per-frame work < 16 ms for live playback: cache gradients/paths that do not change, avoid `ctx.filter` blur on full frames, cap particles at ~2000 on Canvas.
- Precompute geometry (point clouds, text samples) once at load.
- Export does not need real-time speed; quality over speed there.

## 9. Delivery without a render environment
- Give the single HTML file and instructions: open in Chrome → full screen (F11) → screen-record (OBS, macOS Cmd+Shift+5, Windows Win+Alt+R) → trim.
- Or give the commands from SKILL.md to run locally (Node 18+, `npm i playwright`, `npx playwright install chromium`, FFmpeg).

## 10. Low-heat renderer (render-lite.mjs) — default for user PCs
- Headless (no window), `--disable-gpu`, one renderer process, OS priority lowered for Chromium + FFmpeg, FFmpeg `-threads` capped.
- Serves the HTML's folder over a tiny local HTTP server → external `<script src>`, CSS, fonts, images, `fetch()`, `<audio>` all load.
- `seek` mode if `window.__seek` exists; otherwise `clock` mode: Playwright virtual clock advances `requestAnimationFrame`, `performance.now`, `setTimeout`, and `document.getAnimations()` (CSS/WAAPI) frame-by-frame → deterministic even for pages never built for rendering. Give `--duration`.
- Canvas pages are captured with `canvas.toDataURL('image/jpeg')` (much cheaper than screenshots); DOM pages use a clipped screenshot (`--selector`).
- Audio: `__renderAudio()` → else `--audio file` → else first `<audio>/<video>` src.
- Resumable: frames go to `<out>_frames/`; rerun the same command to continue after a crash/shutdown. `--keep-frames` keeps them.
- Throttle: `--max-fps 5`, `--pause-every 150 --pause-sec 10`, `--threads 1`; `--draft` = half size, fast preview.
