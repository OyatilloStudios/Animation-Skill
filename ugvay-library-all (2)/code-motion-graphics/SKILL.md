# Code Motion Graphics — skill (v3.2)

> **UGVAY library:** this skill = motion design, promos, logos, showreels, reels, kinetic typography, sound. Educational lessons (biology, physics, chemistry, history, quizzes) → use **SVG Master Ugvay**; text arrangement rules → **Text Layout Ugvay** (`textlayout.js` is in `assets/` and `engine/`). Router: `LIBRARY.md`.
> **Text never overlaps:** in custom scenes include `<script src="textlayout.js"></script>`, take zones from `TL.layout(...)`, draw text with `TL.drawFit(ctx,text,box,{max,align,valign})`, call `TL.resetFrame()` at the start of `render(t)`, and check with `text-qa.mjs` (Text Layout skill).

Create studio-quality motion graphics, animated HTML and MP4 videos by writing the animation as code. The AI never paints pixels: it writes a program in which every pixel is a pure function of time `t`; a headless browser captures frames; FFmpeg encodes them. Text, numbers, shapes, particles, 3D-projected geometry, SVG and sound are all code. Photos, faces, real products and footage come from the user (or AI image generators) — ask for them.

> v3.2: FILM engine has 18 transitions (iris, blinds, split, shutter, circle, glitch, spin, flip, whip, drop, blur, push-up + classic) and cycles 16 by default — vary them per cut. For educational lessons with text-heavy scenes use SVG Master Ugvay v2.2 (68 text effects, 26 transitions, text-timed scenes).

## ENGINE MODE — try this first (fastest, most reliable, works for weaker models too)
If the request can be built from the 16 scene types in `engine/ENGINE.md` (titles, kinetic words, scramble, particles→text, counters, bar charts, lists, quotes, photos with Ken Burns, split/vs, 3D wireframe, waves, dot grid, lower-thirds, CTA, logo reveal), DO NOT write animation code. Write only a `FILM({...})` script that uses `engine/motion-engine.js` (layout, easing, transitions, sound, safe areas and export hooks are already tested). Then QA with `scripts/qa-sheet.mjs` and render with `scripts/render-lite.mjs`. Use the full PROTOCOL below only for custom work the engine cannot express (or add a `custom` scene).

## How to use this skill (read fully before the first line of code)
Follow the PROTOCOL step by step. Do not skip steps. Do not answer with only an explanation: always deliver a working file.

### PROTOCOL
**Step 1 — Brief.** Write down (silently or for the user) these 9 fields. If a field is missing, use the default in brackets and say so in one line.
1 purpose/platform [portfolio reel] · 2 length [15 s] · 3 format [1920×1080, 30 fps] · 4 exact on-screen text [ask] · 5 data/numbers [only from the user] · 6 brand: colors/font/logo [dark #0B0B0D / ink #F4F1EA / accent #FF4A1C, system sans] · 7 mood [premium, minimal, punchy] · 8 key moment [the logo lands on a hit] · 9 audio [synthesized score at 120 BPM, or the user's SFX library].
If the film needs photos/logo/footage → send the **asset request** (reference 08) ONCE and continue with placeholders.

**Step 2 — Concept in one sentence.** "A single orange dot travels through every scene and becomes the dot of the i in the logo." Must contain: the through-line element + the ending.

**Step 3 — Beat sheet (mandatory table before code).**
| # | start–end (s) | bars | what happens | technique (ref 02/09/10/11) | easing | transition out | sound |
Rules: scenes 1.5–4 s, starts on bar lines (`BAR=240/BPM`), 3–8 scenes for 15 s, one hero per scene, one held moment, final hold ≥ 1 s.

**Step 4 — Build from `template-pro.html`** (reference 07). Edit only: CONFIG, PRECOMPUTE, SCENES, scheduleAudio. Keep the toolkits and the hooks. Each scene is `function sName(lt, d)` using only `lt` (local seconds).

**Step 5 — Self-check the code against the HARD RULES** (below) before running it.

**Step 6 — QA stills.** Render stills at the middle of every scene and ±0.1 s around every cut (`scripts/frames.mjs`). Look at EVERY image. Fix every defect from the QA checklist (reference 06). Repeat until clean.

**Step 7 — Export.** `scripts/render-lite.mjs film.html film.mp4 --fps 30` (headless, GPU off, low priority, resumable; works with external JS/CSS/audio files in the same folder and with pages that have no `__seek`). Old `render_mp4.mjs` still works (60 for fast particle work). Verify duration (`ffprobe`) and loudness (`volumedetect`: mean −18…−16 dB, peak ≤ −3 dB).

**Step 8 — Deliver.** The HTML + MP4 (+ assets folder if any). Then: a 3–6 line scene list, the defaults you assumed, and 3 concrete edit offers ("make it vertical", "slow scene 3", "swap the accent to navy").
If you cannot run code (no browser/Node): deliver the HTML anyway and give the user the screen-record and local-render instructions (reference 03 §9).

### HARD RULES (never break)
1. `render(t)` is pure: no `Math.random()` (use `rnd(i)`/`mulberry32` at setup), no `Date.now()`/`performance.now()` inside scenes, no `setTimeout`/`setInterval`, no per-frame accumulation (`x+=v`). Same `t` → same frame.
2. Fixed stage (1920×1080 / 1080×1920 / 1080×1080) scaled by CSS. All coordinates in stage pixels.
3. One self-contained HTML, no CDNs unless the user allows; fonts and images preloaded; `window.__ready=true` only after loading.
4. Never linear motion for position/scale (only for constant rotation/drift). Never start/stop moves abruptly unless it is an impact.
5. Safe area 96 px. Text never touches edges. Headlines ≥ 110 px, labels ≥ 20 px at 1080p.
6. Max 1 font family (+ mono for tech), 3 colors + neutrals, 2–3 kinetic-type effects per film.
7. Text exactly as given. Numbers only from the user/source. No fake logos, no AI-faked photos drawn with code.
8. Cuts on bar lines; every visual hit has a sound; whooshes PEAK on the cut.
9. Hold the final frame ≥ 1 s; the final frame must be a complete, beautiful composition.
10. Look at the frames before delivering. Never claim it looks good without inspecting.

### QUALITY BAR ("pro" means all of these)
- One clear idea and a through-line; a surprising match cut or morph at least once.
- Every entrance eased (outExpo/outBack/spring), every exit accelerates (inExpo), every state change inOutCubic/Quint; stagger 30–80 ms.
- Rhythm: dense → breath → dense → peak → resolve. Nothing static for > 1.5 s except the final hold.
- Depth: at least two layers (foreground motion + subtle background: grain, vignette, dust particles, or parallax).
- Finish: vignette, optional grain, light sweep or glow on the hero moment.
- Sound: score + transitions + hits + resolve chord; balanced, no clipping.

### FORBIDDEN (instant amateur look)
Rainbow gradients, drop-shadow everything, 5 fonts, centered paragraphs, everything fading in at once, linear slides, random bouncing for no reason, text over busy images without a scrim, stock "glossy 3D", particles everywhere all the time, ending on a black frame, cutting off the audio tail.

## Request → technique map (start here when unsure)
| User says | Use |
| --- | --- |
| "showreel", "go all out" | ref 05 §2 beat sheet: bounce → slam → 3D morph → grid wave → ribbon → tunnel → numbers → logo |
| "logo animation / reveal" | ref 10 §11 (SVG logo) or ref 05 §3; impact + reverse swell |
| "kinetic text / quote / lyrics" | ref 09 §4 (word-on-beat, mask rise, slam) |
| "tech / AI / crypto / hacker" | ref 09 §5 scramble + mono font + hex columns + ticks; ref 11 flow-field particles |
| "particles / magic / dust / explosion" | ref 11 §4 recipes |
| "data / statistics / growth" | ref 02 §18 chart build, ref 05 §6, counters, honest timing |
| "product / app promo" | ref 05 §7–8 + ref 08 (ask for screenshots) + device mockup |
| "photo slideshow / real estate / food" | ref 08 §5 Ken Burns, masked reveals, duotone + kinetic captions |
| "loop / background / stream" | ref 02 §17 seamless loops, noise fields |
| "Reels / TikTok / Shorts" | 1080×1920, 7–15 s, big type, hook in first 1 s, captions in safe zone |
| "use my sounds" | ref 04 §7 SFX library manifest |

## Commands
```bash
CHROME=$(which chromium) node scripts/qa-sheet.mjs film.html sheet.png --cuts           # one QA image: every scene + cuts
CHROME=$(which chromium) node scripts/frames.mjs /abs/film.html ./qa 1.0,2.9,3.1,5.0   # stills
CHROME=$(which chromium) node scripts/render-lite.mjs film.html film.mp4 --fps 30      # MP4 + audio (recommended)
node scripts/render-lite.mjs film.html preview.mp4 --draft                             # fast half-size preview
node scripts/render-lite.mjs film.html film.mp4 --max-fps 5 --threads 1 --pause-every 150 --pause-sec 10   # weak/overheating PC
# any HTML without __seek: add --duration 12 (virtual clock drives rAF, setTimeout, CSS/WAAPI animations)
ffprobe -v error -show_entries format=duration -of csv=p=0 film.mp4
ffmpeg -hide_banner -i film.wav -af volumedetect -f null - 2>&1 | grep -E "mean|max"
```
Needs Node 18+, Playwright Chromium, FFmpeg. Scripts allow local file access (images/SFX) and wait for `window.__ready`.

## References (load what the step needs)
- 01 Motion design principles — 12 principles in code, easing, timing, transitions, composition, color, taste.
- 02 Techniques cookbook — 23 copy-ready effects.
- 03 Rendering & export — medium choice, seekable CSS/GSAP/Three.js/Remotion, FFmpeg recipes.
- 04 Sound design — audiokit, mixing, music theory, motion→sound map, the user's SFX library.
- 05 Prompt library & briefs — beat sheets for 10 film types + edit prompts.
- 06 QA checklist & common bugs.
- 07 Template & scripts — template.html (basic), template-pro.html (motionkit + audiokit), frames.mjs, render_mp4.mjs, render-lite.mjs (low-heat headless renderer), qa-sheet.mjs (contact sheet), bundle.mjs (inline into one HTML).
- engine/ENGINE.md — Motion Engine: FILM script format, 16 scene types, recipes, rules. engine/motion-engine.js + example-*.html.
- 08 Assets — when/what to ask, formats & sizes, AI image prompt template, images/video in code, placeholders.
- 09 Typography — type system, fonts, layout math, kinetic type catalogue, scramble/decode text, copywriting, Uzbek/Cyrillic.
- 10 SVG mastery — paths, line draw, morphing, masks, filters, logo animation recipe.
- 11 Particles & smoothness — smoothness rules, splines, springs, deterministic particle systems, 12 recipes, budgets.
- 12 Code library — full motionkit.js and audiokit.js source.
