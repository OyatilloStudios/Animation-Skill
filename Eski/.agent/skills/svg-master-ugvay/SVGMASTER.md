# SVG MASTER UGVAY — LESSON engine reference (v2.2 — Typography 68 · 26 transitions · Camera presets · Layout guard · Text-timed scenes)

You (the AI) write **one HTML file** that loads `svgmaster.js` and calls `LESSON({...})`.
The engine draws everything as animated SVG: layout, animation, glow, captions, music/SFX, QA hooks, MP4 export.
**Never write raw animation code, timers, canvas or CSS animations. Only the LESSON object.**

```html
<!doctype html><html><head><meta charset="utf-8"><title>Lesson</title></head><body>
<script src="svgmaster.js"></script>
<script>
LESSON({
  title:'Yurak qanday ishlaydi?', subtitle:'Qon aylanish doiralari', subject:'Biologiya', author:'Ugvay',
  format:'16:9', theme:'night', lang:'uz', music:'calm',
  scenes:[
    {kind:'title', say:'Bugun yurak ishini ko‘ramiz.'},
    {title:'Yurak *tuzilishi*', say:'Yurak to‘rt kameradan iborat.', items:[
      {type:'heart', area:'left2', labels:['ra','la','rv','lv','aorta']},
      {type:'text', area:'right2', bullets:true, text:'- 4 kamera\n- 2 qon aylanish doirasi\n- ~70 zarba/daqiqa'}]},
    {kind:'quiz', question:'Yurakda nechta kamera bor?', options:['2','3','4','5'], answer:2},
    {kind:'end', points:['Yurak — mushakli nasos','4 kamera','Katta va kichik qon aylanish doirasi']}
  ]});
</script></body></html>
```

## 1. Lesson keys
| key | values | default |
|---|---|---|
| `title`, `subtitle`, `subject`, `author` | text (title card + metadata) | — |
| `format` | `'16:9'` (1920×1080) · `'9:16'` (1080×1920 reels) · `'1:1'` · `'4:5'` | `'16:9'` |
| `theme` | `night` · `paper` · `blueprint` · `chalk` · `bio` | `night` |
| `colors` | override theme keys `{a1:'#..',bg:'#..'}` | — |
| `lang` | `'uz'` · `'en'` · `'ru'` (auto label names, quiz/summary words) | `'uz'` |
| `music` | `'calm'` · `'epic'` · `'dark'` · `'tech'` · `false` · `{file:'bg.mp3',gain:.5}` | `'calm'` |
| `sfx` | soft blips on item appear, whoosh on scene change | `true` |
| `voice` | `{file:'voice.mp3', at:0, gain:1}` one narration file for the whole lesson | — |
| `captions` | show `say` text as subtitles | `true` |
| `progress` | thin chapter progress bar at the bottom | `true` |
| `brand` | small corner text, e.g. `'UGVAY'` | — |
| `transition` | default scene transition (one of the 26 in §5c) or `'auto'` = a different transition every scene, never the same twice in a row | `'auto'` |
| `transitions` | your own pool for `'auto'`, e.g. `['page','wipe-right','iris','blinds']` | 20 built-in |
| `camera` | `'auto'` (a different gentle move every scene) · a preset name for all scenes · `false` (static) | `'auto'` |
| `drift` | `false` = no automatic camera move | `true` |
| `typo` | `'auto'` (varied text effects, see §5c) · `false` (plain) · `{title:'mask-up', text:'rise', emph:'highlight', out:'fade'}` fixed for the whole lesson | `'auto'` |
| `pace` | reading speed factor: `1.2` = 20 % longer scenes (younger viewers), `0.9` = faster | `1` |
| `pinText` | `text` items stay fixed on screen while the camera moves the drawing (never cut, never half-hidden) | `true` |
| `layoutGuard` | floating objects (magnifier, formula, picture, small diagram) are moved to free space so they never cover text or leave the frame | `true` |
| `grid`, `dust`, `vignette` | background details (false to disable; vignette 0..1) | on |
| `font`, `fontUrl` | custom font family / woff2 next to the HTML | Inter→Arial |
| `handheld` | `true` or amplitude px — subtle living camera on every scene | off (6 px if `true`) |
| `parallax` | background moves slightly with the camera | `true` |
| `textGuard` | auto-move callout labels away from other texts, the header band and the caption band | `true` |
| `headerScrim` | soft dark band behind the scene title (readable when the camera zooms under it) | `true` |

## 2. Scene keys
| key | meaning |
|---|---|
| `title` | header at top (`*word*` = accent color). Auto chapter number. |
| `say` | narration / caption text. Split into sentences, shown in sequence. **Scene length follows the text:** subtitles ≈ 2.3 words/s + on-screen `text` ≈ 3 words/s (see §5c). |
| `items` | list of visual items (section 4). |
| `dur` | seconds. **Usually omit** → auto = max(last item finished + `hold` (2.2 s), reading time of `say` + on-screen text, audio length). A `dur` shorter than the reading time gives a WARNING. |
| `pace` | reading speed factor for this scene only. |
| `typo` | `{title:'wave', text:'mask-up', emph:'circle', out:'blur-out'}` text effects for this scene (§5c); `false` = plain. |
| `kind` | `'title'` (title card), `'quiz'`, `'end'` (summary) — need no items. |
| `audio` | `'s3.mp3'` or `{file,at,gain}` narration for this scene; scene lasts at least the audio length. |
| `camera` | preset name `'push-in'` · `{preset:'focus', on:'@heart.lv', zoom:1.6}` (see §5c) or `{x,y,zoom}` or keyframes `[{t:1, dur:1.5, on:'@cell.nucleus', zoom:2.2, rotate:0, tilt:0, ease:'inOutCubic'}, {t:5, follow:'@ball', zoom:1.6}, {t:8, zoom:1}]`. `on` = fixed point/part, `follow` = tracks a moving item (pendulum bob, projectile, orbit body, spring block, incline block). See CAMERA.md. |
| `shake` | `[{t:3, dur:.6, amp:18}]` camera shake (explosion, impact, heartbeat). |
| `dive` | `'@cell.mitochondria'` (put on the NEXT scene): previous scene zooms deep into that point, then this scene grows out of it — organ → cell → organelle. |
| `focus` | `{at:4, to:8, on:['heartId'], blur:true}` (object or list) → everything else dims; `blur:true` = cinematic rack focus (others blurred). |
| `transition` | any of the 26 transitions in §5c (`'auto'` default) · `dive` (see CAMERA.md) |
| quiz | `question`, `options:[…]`, `answer` (0-based index), `think` (seconds countdown, 5), `explain` |
| end | `points:[…]`, `text` (closing line, default "E’tiboringiz uchun rahmat!") |

## 3. Item timing, placement, animation (common keys for every item)
- **Timing:** items appear one after another automatically. `at:3` = absolute second in the scene · `at:'+1.5'` = 1.5 s after the previous item started · `with:true` = together with previous · `wait:2` = gap before the next item · `dur` = entrance length · `out:9` = fade out at 9 s.
- **Placement:** `area:'name'` (preferred) or `box:[x,y,w,h]` in stage pixels. Point items use `x,y` or `on:'@id.part'`.
- **Areas (16:9):** `full` · `center` · `wide` · `left` / `right` (50/50) · `left2` / `right2` (60/40) · `left3` / `right3` (40/60) · `top` / `bottom` · `topleft` `topright` `bottomleft` `bottomright`.  In 9:16 `left*`=top part, `right*`=bottom part automatically. **Never put two items in the same area** unless one is an effect/pulse/label.
- **Anim:** `anim:'fade'|'rise'|'pop'|'grow'|'zoom'|'draw'|'slide-left'|'slide-right'|'write'|'none'` (good defaults per type).
- **References:** give an item `id:'h'`; later items use `'@h'` (center) or `'@h.lv'` (named part) in `on`, `from`, `to`, `camera.on`, `focus.on`.
- Also: `color` (`a1`..`a5`, `ink`, `dim` or CSS), `glow:true`, `opacity`, `sfx:false`.
- Stage size: 1920×1080 (16:9). Header occupies y < 170, captions y > 890. Press **G** in the browser (or `?guides=1`) to see the pixel grid + area boxes.

## 4. Item catalogue
### Text & math
- `text` — `text`, `size`(42), `align` left|center|right, `valign`, `bullets:true` (lines starting with `- `, wrapped lines get a hanging indent and every bullet appears **whole**, in reading order), `*accent*`, `accent:'a2'`. Typography (§5c): `fx` (entrance), `emph` (emphasis on the `*accent*` words), `fxOut` (exit; with `out:9` at that second, otherwise just before the scene ends), `emphAt` (s after start), `step` (s between bullets, .55). `pin:false` lets the camera move the text with the drawing. **Auto-fit:** the paragraph shrinks until it fits its area (`minSize` 20, `fit:false` to disable); if it still doesn't fit you get a WARNING → shorten the text or use a bigger area.
- `formula` — `tex` (TeX subset: `\frac{}{}`, `\sqrt[n]{}`, `^ _`, Greek `\alpha..\Omega`, `\cdot \times \pm \to \rightarrow \Rightarrow \leftrightarrow \approx \neq \le \ge \infty \partial \nabla \Delta`, `\int_a^b`, `\sum_{i=1}^n`, `\vec{v}` `\bar{x}` `\hat{}`, `\text{...}`, `\left( \right)`, `\color{a2}{...}`), `size`(64), `boxed:true`, `chem:true` (upright letters, H_2O), `align`. Written left→right.
- `number` — count-up: `value`, `from`, `decimals`, `prefix`, `suffix`, `label`, `size`, `countDur`.
- `label` — single callout: `x,y` or `on:'@id.part'`, `text`, `dx`,`dy`.
- `emoji` — `char`, `x,y`, `size`.
### Drawing primitives (stage pixels)
- `shape` — `shape:'circle'|'ellipse'|'rect'|'line'|'polygon'|'path'`, `x,y,r` / `rx,ry` / `w,h` / `x1,y1,x2,y2` / `points:[[x,y],…]` / `d`, `fill`, `width`, `dashed`, `glow`. Drawn on stroke-by-stroke.
- `arrow` — `from:[x,y]|'@id.part'`, `to`, `curve`(-1..1), `text`, `both`, `flow:true` (moving dots), `flowColor`.
- `svg` — custom vector: `markup:'<path d="…" stroke="#4FD1FF" fill="none"/>'`, `x,y,scale`. Stroked elements draw on automatically.
- `pulse` — attention rings at `x,y`/`on`.
- `image` — user picture: `src:'photo.jpg'`, `area`, `labels:[{x:.42,y:.31,text:'Yadro',id:'n'}]` (x,y = 0..1 of the image → automatic leader lines, no overlap), `focus:[{x,y,r:.08,at:5}]` (glowing ring). Open the HTML with `?grid=1` to see a 0.1 grid over images and read coordinates.
### Biology & medicine (presets; `labels:true` = all parts, or list of part names / `{part,text}`)
- `cell` — `kind:'animal'|'plant'`. Parts: nucleus nucleolus mitochondria er golgi ribosome lysosome membrane cytoplasm (+ plant: wall chloroplast vacuole).
- `dna` — rotating helix: `turns`, `letters:true`, `unzip:true`, `unzipAt`.
- `mitosis` — phases play in order with name: `phases:[…]`, `phaseDur`(2.2).
- `neuron` — action potential travelling: `impulse`, `period`. Parts: dendrite soma axon myelin node terminal.
- `virus`, `membrane` (diffusion through channel; parts channel inside outside), `enzyme` (lock-and-key cycle; parts enzyme activesite substrate products).
- `heart` — 4 chambers, blue/red blood flow, beat: `bpm`, `flow`. Parts: ra la rv lv aorta pulmonary vena pveins septum valve.
- `vessel` — blood vessel with flowing RBCs: `speed`, `cells`, `object` (custom image as cell).
### Cell biology atlas (v2) — all have `labels`, parts usable as `@id.part` for camera/arrows
- `transport` — `kind:'simple'|'channel'|'carrier'|'pump'|'endocytosis'|'exocytosis'|'osmosis'`, `cycle` (s). Na⁺/K⁺ pump = `pump` (3 Na⁺ out, 2 K⁺ in per ATP). Parts: outside inside membrane protein molecule atp pump vesicle solute water.
- `signal` — ligand → receptor → relay → effector → second messenger → cascade → nucleus → response; `step` texts. Parts: ligand receptor relay effector messenger cascade nucleus response.
- `synapse` — impulse, vesicles fuse, neurotransmitter crosses cleft, ions enter. Parts: presynaptic vesicle neurotransmitter cleft receptor postsynaptic ion.
- `mitochondrion` (outerMembrane innerMembrane cristae matrix atpSynthase mtDNA ribosome), `chloroplast` (outerMembrane innerMembrane thylakoid granum stroma lamella starch), `nucleus` (nuclearEnvelope pore chromatin nucleolus mrna).
- Cells: `bacteria` (capsule wallB membrane nucleoid plasmid ribosome flagellum pili cytoplasm), `rbc` (rbc biconcave hemoglobin size), `wbc` phagocytosis (lobedNucleus granules pseudopod bacterium phagosome), `muscle` sarcomere contraction (fiber nuclei sarcomere zline actin myosin), `epithelium` (microvilli nucleus basement junction epicell), `sperm` (acrosome nucleus midpiece tailS), `egg` (corona zona cytoplasm nucleus).
### Organs (medicine) 
- `lungs` breathing (`rate`): trachea bronchus bronchiole alveoli rightLung leftLung diaphragm · `alveolus` gas exchange: bronchiole alveolus capillary o2 co2 rbc.
- `kidney`: cortex medulla pelvis ureter renalArtery renalVein · `nephron`: glomerulus bowman proximal loop distal collecting.
- `brain`: frontal parietal temporal occipital cerebellum brainstem; `highlight:'temporal'|[…]`, `activity:false`.
- `digestive`: mouth esophagus stomach liver gallbladder pancreas smallIntestine largeIntestine rectum (food bolus travels).
- `eye`: cornea iris pupil lens vitreous retina opticNerve sclera (light rays focus on retina).
Accuracy notes for all of these → `references/BIO-ATLAS.md`.

### Camera helper items
- `magnifier` — lens that shows a live zoomed copy of the scene: `on:'@cell.mitochondria'` (or x,y), `zoom` 2.6, `r` 210, `lens:[x,y]`, `text`, `color`. The lens is placed **automatically in free space** — never over text, never off-frame, not on top of its own target (shrinks to 52 % if the scene is full). Give `lens` only if you really need a spot; if it covers text it is moved anyway.
- `spotlight` — darkens everything except a soft circle: `on:'@heart.lv'`, `r`, `dim` .68.

### 3D (pure SVG, depth-sorted, shaded) — common: `yaw` `pitch` (deg), `spin` (deg/s), `zoom`, `persp` (6; 0 = orthographic), `view:[{t:2,dur:1.5,yaw:90,pitch:40,zoom:1.3}]`
- `mol3d` — `preset:'H2O'|'CO2'|'CH4'|'NH3'|'C2H4'|'C2H2'|'C6H6'|'H2'|'O2'|'N2'|'HCl'|'Cl2'|'C2H5OH'|'CH3OH'|'H2SO4'|'C6H12O6'` or `atoms:[['C',x,y,z],…]` (Å) + `orders:{'0-1':2}`; `style:'ball-stick'|'fill'`, `angle:true` (bond angle arc, e.g. 104,5°), `symbols`, `name:false|'text'`.
- `lattice` — `kind:'nacl'|'sc'|'bcc'|'fcc'`, `n`, `element`, `legend`.
- `dna3d` — `pairs` 20, `seq:'ATGC…'`, `turn` 36°/bp, `unzip:true|seconds`, `vertical:false` (horizontal), legend A–T, G–C.
- `solid` — `shape:'cube'|'cuboid'|'pyramid'|'prism'|'tetra'|'octa'|'cylinder'|'cone'|'frustum'|'sphere'`, `a b c|h`, `n` (base sides), `color`, `labels:true|['A','B',…]` (vertex letters, cube: A B C D A₁ B₁ C₁ D₁), hidden edges dashed, `fillOpacity`, sphere `rLabel`.
- `globe` — Earth: continents, grid, equator, axis `tilt` 23.4°, `rotate` deg/s, `lon` start, `night:false`, `pins:[{lat:41.3,lon:69.2,text:'Toshkent'}]`, `text`.
- `solar3d` — Sun + `planets` (1–8) on orbits, Kepler-like speeds (T^-½), `speed`, `pitch`, `labels:false`.
- `axes3d` — x y z axes + grid; `vectors:[{to:[2,1,2],from,text,color,proj}]`, `points:[{at:[x,y,z],text}]`, `fn:'sin(x)*cos(y)'` surface z=f(x,y), `range`, `res`.
### Chemistry
- `atom` — `Z` (1–36) or `symbol`, `shells`, `speed` — Bohr model with orbiting electrons.
- `molecule` — `preset:'H2O'|'CO2'|'CH4'|'NH3'|'O2'|'H2'|'N2'|'Cl2'|'HCl'|'CO'|'C2H5OH'|'C6H6'|'NaCl'|'H2SO4'` or custom `atoms:[['C',0,0],['O',1.2,0]]` (x,y in bond lengths), `bonds:[[0,1,2]]` (atom i, atom j, order 1–3), `labels`, `wobble`.
- `reaction` — `left:['2H2','O2']`, `right:['2H2O']`, `condition:'t°'`, `equation` (TeX override), `keep:false`. Molecules collide → flash → products, equation below.
### Physics (real equations, numerically integrated — physically correct motion)
- `pendulum` — `L`(m), `angle`(°), `g`, `damping`, `readout`, `graphT` (θ(t) graph).
- `spring` — `k`, `m`, `x0`, `damping`, energy bars, `object`.
- `projectile` — `v0`, `angle`, `h0`, `g`, `drag`, trajectory, apex, components, readout.
- `collision` — `m1,m2,v1,v2,e` (e=1 elastic, 0 inelastic); momentum/energy readout.
- `orbit` — Kepler ellipse `e`, `period`, `areas:true` (equal areas) or `planets:[{a:1,period:4,color:'a1',size:14,src:'earth.png'}]` (a = relative radius; period default from Kepler's 3rd law), `tilt:.4` (perspective).
- `wave` — `kind:'transverse'|'longitudinal'|'standing'|'superposition'`, `A`, `wavelength`, `f`, `annotate`.
- `field` — `charges:[{q:1,x:.3,y:.5},{q:-1,x:.7,y:.5}]` (x,y = 0..1 of the area), field lines with flow.
- `refraction` — `n1,n2,angle`, `sweep` (animate angle → total internal reflection).
- `lens` — `kind:'convex'|'concave'`, `f`, `rays`.
- `incline` — `angle`, `mu`, `m`, force vectors.
- `circuit` — `V`, `R`, moving electrons, bulb brightness.
- `object:{src:'ball.png',size:80}` — replace the moving body with any picture (pendulum, projectile, spring, incline, vessel).
### Effects (deterministic particles)
`fire` (`intensity`, `scale`) · `smoke` (`density`, `wind`) · `water` (`level`, `waves`, `bubbles`) · `rain` · `snow` · `bubbles` · `sparks` (`x,y`) · `lightning` (`from`,`to`) · `rays` (`x,y`) · `explosion` (`x,y`, `at`) · `glowOrb` (`x,y,r,color`). Put them in an area or at x,y; combine with other items.
### Diagrams & data
- `mindmap` — `center`, `branches:[{text, children:[…]}]`.
- `timeline` — `events:[{date:'1336', title:'…', text:'…'}]`, `vertical`, `stepDur`.
- `flow` — `nodes:['A','B','C']` (chain) or `cycle:true` + `center`; `highlight:true` (running glow).
- `compare` — `columns:[{title:'Mitoz', items:['…','…']}, …]`.
- `chart` — `fns:[{f:'9-0.8*x',label:'Talab',color:'a3'}]`, `xrange`,`yrange`, `xlabel`,`ylabel`, `points:[[x,y]]`, `shade:{f,from,to}`, `mark:{x,y,label}`.
- `barchart` — `data:[['A',3],['B',5]]`. `pie` — `data:[['X',40],['Y',35]]` (donut + legend).
- Special: `titleCard`, `summary`, `quiz` (used by scene kinds; can be used as items).

## 5. Rules that make lessons look professional
1. One idea per scene, 1–3 items. 6–12 scenes per lesson. Title → content → quiz → end.
2. Use **areas**, not pixels. Diagram + explanation = `left2` + `right2`.
3. `say` = what a teacher says (1–3 short sentences). The visual must show exactly what `say` describes.
4. Use presets when they exist; build custom visuals with `shape`/`arrow`/`svg` only when needed.
5. Labels: max ~8 per scene, short names (1–3 words).
6. Scientific accuracy first (see references/SUBJECTS.md). Formulas in TeX, units always.
7. Accent color = the key term: `*mitoxondriya*`.
8. After writing: open the HTML → no red error banner → run `qa-sheet` and look at every frame.

## 5b. Text layout (built-in Text Layout Ugvay — see text-layout-ugvay/TEXT-LAYOUT.md)
- Zones: header (scene title, 1 line — long titles shrink to 62 %, then are cut with … + WARNING) · body (areas) · caption band at the bottom when the scene has `say`. Don't put `text` items in `bottom` areas of scenes with `say`.
- One text block per area; a drawing with `labels` needs free space left and right of it (use `area:'left'`/`'right'` + text on the other side, or `area:'full'` alone).
- ≤ 8 labels per drawing (`labels:['lv','aorta',…]` instead of `true` when crowded). Titles ≤ 6 words. `say` sentences ≤ 20 words.
- Engine warnings (`window.__warnings`, printed by qa-sheet) mean text was crowded or didn't fit — fix them like errors.


## 5c. Typography, transitions, camera presets, timing (v2.2)
**Order of every text:** entrance → (emphasis) → (exit). It runs once, in this order; nothing is replayed at the end. Bullets appear one by one, each bullet complete (never fragments). Text blocks stay on screen while the camera moves; if the camera zooms in, a paper card appears behind the text.

**Text effects (68)** — use on `text` items (`fx`, `emph`, `fxOut`), or lesson/scene `typo:{title,text,emph,out}`:
- entrance (32): `fade` `rise` `drop` `slide-left` `slide-right` `zoom-in` `zoom-out` `pop` `blur-in` `typewriter` `scramble` `wave` `cascade` `flip-up` `tracking-in` `mask-up` `mask-down` `wipe-right` `highlight-in` `split-center` `rotate-in` `bounce` `elastic` `glitch-in` `skew-in` `random` `spin` `swing` `stretch` `rise-blur` `counter` (numbers count up) `ink` (outline draws, then fills)
- emphasis (18, on `*accent*` words): `pulse` `shake` `wiggle` `jump` `wave` `color` `glow` `highlight` (marker) `underline` `circle` (hand-drawn ring) `box` `heartbeat` `tilt` `rubber` `flash` `color-wave` `swell` `focus` (others dim)
- exit (18): `fade` `sink` `lift` `slide-out-left` `slide-out-right` `shrink` `blow` `blur-out` `typewriter-back` `scatter` `wave-out` `wipe-out` `flip-down` `collapse` `dissolve` `mask-out` `spin-out` `drop-out`
- `typo:'auto'` (default): every scene gets a different calm entrance for its texts and a different title effect; `*accent*` words get a marker/underline/box/ring. Same effect inside one scene = order; different between scenes = variety.
- Good pairs: lessons → `rise`/`mask-up`/`rise-blur` + `highlight`; hooks/questions → `typewriter`, `scramble`, `wave`; numbers → `counter`; warnings → `shake`/`flash`; endings → `blur-out`/`dissolve`. Calm topics: avoid `glitch-in`, `spin`, `scatter`.

**Transitions (26):** `fade` `zoom` `zoom-out` `slide` `whip` `dive` `iris` `push-left` `push-right` `push-up` `push-down` `wipe-left` `wipe-right` `wipe-up` `wipe-down` `split` `barn` `blinds` `venetian` `diagonal` `grid` `radial` `blur` `flip` `spin` `page` (+ `cut`). Default `'auto'` picks a different one every scene. Calm lesson pool example: `transitions:['page','wipe-right','iris','push-left','blinds','blur']`.

**Camera presets:** `camera:'push-in'` or `{preset, on:'@id.part', zoom, at, dur}` — `push-in` `pull-out` `ken-burns` `pan-left` `pan-right` `pan-up` `pan-down` `orbit` `dolly` `crane` `reveal` (starts close on `on`, pulls back) `focus` (wide → close on `on` → wide) `tour` (`on:['@a','@b','@c']` visits each part). Without `camera` every scene gets a gentle, different move (`soft-in/out/left/right/up/rot`); `camera:false` = static.

**Timing from text:** scene length = max(animations + hold, subtitles at ~2.3 words/s + on-screen text at ~3 words/s, voice audio). Long `say` → split it over two scenes rather than forcing `dur`. `pace:1.2` for children.

**Layout guard:** after building a scene the engine moves floating objects (magnifier lens, formula, image, emoji, number, small diagrams) to the nearest free place if they cover a text block or stick out of the frame; items referenced by `@id`, arrows, labels, shapes and effects are never moved; `lock:true` keeps an item where you put it. Warnings tell you when no free place exists → use less text or a smaller object.

## 6. Errors & QA
- `qa-sheet.mjs` also checks every frame for **overlapping texts** (red boxes on the sheet + `TEXT OVERLAPS` list) and prints `WARNINGS`. Fix until it prints `no errors` and `text: no overlaps`.
- Wrong type/key/area/part → red banner listing problems with suggestions ("did you mean…"). Also `window.__errors`.
- `node scripts/qa-sheet.mjs lesson.html sheet.png` → one PNG with a frame from every scene + error list. Send the PNG back to the AI to fix.
- `node scripts/render-lite.mjs lesson.html lesson.mp4` → MP4 with music (exact frames, resumable, low CPU).
- Browser controls: ▶ Sound · ⏮ ⏭ scenes · CC captions · Grid · Space pause · ←/→ scenes · G guides.
