# SVG MASTER UGVAY — LESSON engine reference (v2.3 — LIBRARY: 131 item types on 17 shelves · Typography 68 · 26 transitions · Camera presets · Layout guard)

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

## 4b. LIBRARY SHELVES — v2.3: 48 new item types, v2.4: +14 (Earth science & astronomy, photosynthesis, induction, states of matter), v2.5: +20 (medicine I/II, toxicology), v2.6: +15 (osteon, chemosense, stroke, smoking, metals + new shelf `infect`) — 180 items total
All new items accept the common keys (`area`, `box`, `at`, `labels:true|[...]`, `id`, `anim`). Labels: `labels:true` shows every built-in label (uz/en/ru by `lang`).
**Generic chips (any item, old or new):** `analogy:true` or `analogy:'text'` → “≈ O‘xshatish (model)” badge (use for every model / comparison that is NOT literal reality) · `warn:'text'` → ⚠ safety chip (chemicals, radiation, electricity, lab).
**Catalog in code:** `SM.catalog` (shelves), `SM.list('molbio')`, `SM.find('qon')`. See `references/LIBRARY-INDEX.md` (every item, every kind) and `references/FACTS.md` (what is exact vs. simplified).

### Molekulyar biologiya (`molbio`)
| type | params | shows |
|---|---|---|
| `replication` | `cycle` (s) | helicase opens the fork, 2 polymerases, leading + lagging strand, RNA primers, Okazaki fragments (semi-conservative) |
| `transcription` | `sequence:'TACGGATTC'` (template DNA), `cycle` | RNA polymerase reads template → mRNA (A→U, T→A, G→C, C→G) |
| `translation` | `codons:'AUGGCU…UAA'`, `step` | ribosome A/P/E sites, tRNA anticodons, amino-acid chain by the REAL genetic code, stops at UAA/UAG/UGA |
| `protein` | `kind: all·primary·secondary·tertiary·quaternary` | 4 structure levels (α-helix, β-sheet, fold, subunits) |
| `hemoglobin` | `cycle` | 2α + 2β chains, 4 heme groups, cooperative O₂ binding (up to 4 O₂) |
| `aminoacid` | `kind:'peptide'` (default = one amino acid) | amino acid structure / peptide bond + H₂O release |
| `receptor` | `kind: rtk·ion·nuclear·gpcr` | receptor tyrosine kinase, ion channel, nuclear receptor, G-protein coupled |
| `signalway` | `kind: all·endocrine·paracrine·autocrine·juxtacrine·synaptic` | cell-signalling distance types |

### Gistologiya (`histo`)
| type | params | shows |
|---|---|---|
| `tissue` | `kind: squamous·cuboidal·columnar·stratified·ciliated·loose·dense·adipose·cartilage·bone·blood·skeletal·cardiac·smooth·nervous` | H&E microscope circle (eosin pink / haematoxylin purple) |
| `celltype` | `kind: neuron·rbc·neutrophil·lymphocyte·platelet·skeletal·smooth·epithelial·adipocyte·osteocyte·sperm·egg·fibroblast·stem·plant·rod` | one cell + name + real size |
| `cellgallery` | `cells:['rbc','neuron',…]` | gallery grid of cell types |
| `skin` | `goosebumps:true` | epidermis/dermis/hypodermis, hair, sweat gland, arrector pili |
| `hair` | — | hair follicle, bulb, sebaceous gland |
| `sarcomere` | `cycle` | actin/myosin sliding, Z-lines, A/I bands, H-zone |
| `musclezoom` | — | muscle → fascicle → fibre → myofibril → sarcomere |

### Anatomiya (`anatomy`)
| `walker` | `cycle`, `muscles:true`, `skin`, `shirt` | human gait: stance ≈60% / swing ≈40%, joint angle curves, muscle activation |
|---|---|---|
| `skeleton` | — | main bones of human skeleton |
| `armlever` | `cycle` | elbow = 3rd-class lever, biceps/triceps antagonists |

### Mikrobiologiya / immunologiya (`micro`)
| `virion` | `kind: phage·corona·influenza·hiv·adeno·tmv` | virus structures |
|---|---|---|
| `phagecycle` | `cycle` | lytic cycle: attach → inject → replicate → assemble → lysis |
| `bactshapes` | `shapes:[…]` | coccus, bacillus, spirillum, vibrio, staph/strep |
| `fission` | `cycle` | binary fission |
| `antibody` | — | Y-shape, heavy/light chains, Fab/Fc, antigen binding |
| `phagocytosis` | `cycle` | macrophage engulfs bacterium → phagosome → lysosome |

### Patologiya (`patho`)
| `cellinjury` | `kind: all·necrosis·apoptosis` | reversible → irreversible injury |
|---|---|---|
| `atherosclerosis` | default = progression, `kind:'rupture'` | plaque growth, lumen narrowing, rupture + thrombus |
| `inflammation` | `cycle` | vasodilation, leukocyte migration, 5 cardinal signs |
| `neoplasia` | — | normal → dysplasia → carcinoma in situ → invasion |

### Fizika / Optika / Materiallar (`physics`, `optics`, `matter`)
| `prism` | `exaggerate` (default 8, note shown; `1` = real) | white light dispersion (Snell + Cauchy) |
|---|---|---|
| `spectrum` | — | EM spectrum radio → gamma, wavelengths |
| `raydiagram` | `kind: convex·concave·concavemirror·convexmirror·plane`, `u`, `f`, `h`, `move:true` | principal rays, image by 1/f = 1/u + 1/v, magnification |
| `wavecompare` | — | compare wavelength / amplitude / frequency |
| `shock` | `kind: subsonic·sonic·supersonic`, `mach` | wavefronts, Mach cone sin μ = 1/M |
| `spacetime` | `mass` | rubber-sheet curvature (ALWAYS shows analogy badge) |
| `material` | `kind: rope·rigid·soft·fluid·gas`, `particles` | how materials respond |

### Kosmos va atom (`space`)
| `planet` | `name: mercury·venus·earth·mars·jupiter·saturn·uranus·neptune·pluto·moon` OR `kind: rocky·desert·ice·lava·ocean·gas·toxic` + `seed`, `rings`, `spin`, `title` | real-looking planet / generated planet |
|---|---|---|
| `exoplanet` | `star: O·B·A·F·G·K·M`, `size`, `seed` | transit + light curve, depth = (Rp/R★)² |
| `starlife` | `mass: low·high`, `end: neutron·blackhole` | nebula → main sequence → giant → remnant |
| `atommodel` | `kind: all·dalton·thomson·rutherford·bohr·quantum` | history of atom models |
| `decay` | `kind: alpha·beta·gamma·penetration` | nuclear decay, paper/aluminium/lead |

### Kimyo va genetika (`chem`)
| `periodic` | `highlight:['Fe','O']`, `category:'noble'` | all 118 elements, categories coloured |
|---|---|---|
| `orbital` | `kind: all·s·p·d` | orbital shapes |
| `punnett` | `cross:'Aa x Aa'` or `'AaBb x AaBb'`, `traits:{A:'…',a:'…'}` | grid + COMPUTED genotype/phenotype ratios |

### Zoologiya (`zoo`)
| `taxonomy` | `animal: human·dog·cat·lion·wolf·horse·honeybee` or `ranks:[…]`, `title` | domain → species |
|---|---|---|
| `evotree` | — | evolutionary tree of main groups |
| `animal` | `kind: fish·insect·bird` | labelled body plan |

### Yer haqidagi fanlar va astronomiya (`earth`) — v2.4
| `earthlayers` | — | Yerning kesimi (PREM chuqurliklari), mantiya konveksiyasi, harorat grafigi |
|---|---|---|
| `plates` | `kind: divergent·convergent·collision·transform` | plitalar harakati, tizma, nov, tog‘, yoriq |
| `volcano` | — | magma o‘chog‘i, kanal, krater, lava, kul buluti |
| `earthquake` | `cycle` | gipotsentr, episentr, P/S to‘lqinlar, seysmogramma |
| `thunderstorm` | `cycle` | zaryadlar, pog‘onali lider, qaytuvchi zarba, momaqaldiroq kechikishi |
| `atmosphere` | — | qatlamlar, ozon, Karman chizig‘i, harorat profili |
| `watercycle` | — | bug‘lanish, transpiratsiya, kondensatsiya, yog‘in, oqim, yer osti suvlari |
| `seasons` | `year` (s) | orbita, o‘q og‘ishi 23,44°, sana va fasl yozuvi |
| `moonphases` | `cycle` (s) | orbita + Yerdan ko‘rinish, faza nomi, yoritilgan % |
| `eclipse` | `kind: solar·lunar` | umbra / penumbra (aniq urinma konuslar) |
| `solarsystem` | `year` (s) | 8 sayyora, real davr nisbatlari, asteroidlar kamari |
| `statesofmatter` | `kind: heating·compare`, `cycle` | isish egri chizig‘i + zarralar modeli / 3 holat yonma-yon (javon `matter`) |
| `photosynthesis` | `cycle` | tilakoid → ATF+NADF·H → Kalvin sikli; H₂O, O₂, CO₂, glyukoza oqimi (javon `cell`) |
| `induction` | `cycle` | magnit + g‘altak + galvanometr, Φ va ε grafiklari, Lens qutbi (javon `physics`) |

### Tibbiyot I: a’zolar tuzilishi (`med1`) — v2.5 (akademik uslub, masshtab chizig‘i, real sonlar)
| `ear` | `kind: structure·cochlea·corti·balance` | tashqi/o‘rta/ichki quloq, chig‘anoq tonotopiyasi, Korti a’zosi, yarim doira kanallar |
|---|---|---|
| `liver` | `kind: lobule·acinus·hepatocyte` | bo‘lakcha (triada, markaziy vena), atsinus 1–3 zonalar, gepatotsit organellalari |
| `islet` | `kind: histology·glucose` | α/β/δ hujayralar; glyukoza → insulin sekretsiyasi zanjiri |
| `retina` | `kind: layers·photo` | 10 qavat, tayoqcha ~92 mln / kolbacha ~4,6 mln; fototransduksiya, Vm −40→−70 mV |
| `stomach` | `kind: wall·parietal`, `drug: none·ppi·h2` | fundal bezlar, H⁺/K⁺-ATFaza, H2/M3/CCK2 retseptorlar, kislota grafigi |
| `villus` | `kind: structure·absorption` | vorsinka/kripta, ~30 m²; SGLT1, GLUT5/2, PepT1, xilomikron → laktal |
| `cardio` | `kind: conduction·ap`, `slow` | SA→AV→His→Purkinye + sinxron EKG; SA va qorincha harakat potensiallari, fazalar 0–4 |
| `osteon` | `kind: structure·remodeling` — v2.6 | Gavers kanali, lamellalar, osteotsit lakunalari (osteon Ø ~200–250 µm); BMU: osteoklast → osteoblast → osteoid |
| `chemosense` | `kind: olfaction·taste` — v2.6 | ~400 xil hid retseptori, glomerula; ta’m kurtagi, 5 ta’m va retseptorlar |

### Tibbiyot II: patologik jarayonlar (`med2`) — v2.5
| `hemostasis` | `kind: plug·cascade` | trombotsit tiqini (vWF, agregatsiya); ichki/tashqi/umumiy yo‘l, PT/aPTT, trombin grafigi |
|---|---|---|
| `thrombosis` | `kind: virchow·infarct` | Virxov triadasi, DVT → TELA yo‘li; LAD infarkti, gistologik bosqichlar, troponin/CK-MB |
| `healing` | `kind: wound·fracture` | 4 faza + hujayralar/mustahkamlik grafigi; gematoma → kallus → remodelyatsiya |
| `adaptation` | `kind: all·atrophy·hypertrophy·hyperplasia·metaplasia·dysplasia` | normal → adaptatsiya morfingi |
| `edema` | `kind: starling·causes`, `cause: none·heart·albumin·inflammation·lymph` | Starling kuchlari (Guyton qiymatlari), NFP strelkalari |
| `metastasis` | `kind: cascade` | EMT, MMP, intravazatsiya, CTC, ekstravazatsiya, kolonizatsiya |
| `apoptosis` | `kind: pathways·autophagy` | Fas/kaspaza-8, Bcl-2/BAX, sitoxrom c, apoptosoma; autofagiya (LC3, mTOR/AMPK) |
| `stroke` | `kind: ischemic·hemorrhagic` — v2.6 | ishemik yadro/penumbra, tPA (≤4,5 soat) va trombektomiya (≤6 soat, tanlab ≤24 soat) oynalari; gemorragik insult |

### Kimyoviy moddalar ta’siri (`tox`) — v2.5 (xavfli mavzularda `warn:'…'` qo‘shing)
| `toxin` | `kind: co·cyanide·organophosphate·botulinum·lead` | mexanizm + grafik + davolash (gidroksokobalamin, atropin/pralidoksim …) |
|---|---|---|
| `livertox` | `kind: paracetamol·alcohol`, `dose: overdose·therapeutic` | NAPQI/GSH, 3-zona nekrozi, NAC; ADH/ALDH2/MEOS, steatoz → sirroz |
| `burn` | `kind: compare` | kislota (koagulyatsion) vs ishqor (kollikvatsion), teri masshtabda, yuvish |
| `radical` | `kind: ros·peroxidation`, `vitE: false` | O₂•⁻ → H₂O₂ → OH• (Fenton), SOD/katalaza; lipid peroksidlanish zanjiri, vitamin E/C |
| `radiation` | `kind: dna·survival` | to‘g‘ri/bilvosita ta’sir, SSB/DSB, NHEJ/HR (DNK masshtabda); LQ egri chiziq + doza shkalasi |
| `caries` | `kind: stephan·lesion` | Stephan egri chizig‘i, de/remineralizatsiya, F⁻; emal → dentin → pulpa → absess |
| `smoking` | `kind: lung·nicotine` — v2.6 | kiprikchalar, shilliq, KOAH/emfizema, saraton; nikotin qondagi konsentratsiyasi (t½ ~2 soat) |
| `metals` | `kind: mercury·arsenic·cadmium` — v2.6 | –SH guruhlariga bog‘lanish, yo‘l (kirish → a’zo), a’zolar xaritasi, xelatorlar |

### Mikroorganizmlar ta’siri (`infect`) — v2.6 (akademik uslub; yuqumli mavzularda `warn:'…'` qo‘shish mumkin)
| `hpylori` | `kind: mechanism` | shilliqda suzish, ureaza NH₃ bulut, CagA/VacA, neytrofillar; oqibatlar (gastrit/yara/saraton) |
|---|---|---|
| `tuberculosis` | `kind: granuloma` | tomchi yadrolari, alveolyar makrofag, kazeoz markaz, Langhans hujayrasi, fibroz kapsula |
| `cholera` | `kind: toxin` | AB₅ toksin → GM1 → Gsα → cAMP → CFTR; SGLT1 saqlanadi → ORS |
| `pyogenic` | `kind: staph·strep` | S. aureus absessi (koagulaza, MRSA), S. pyogenes flegmonasi, revmatik isitma/glomerulonefrit vaqti |
| `hepatitis` | `kind: hbv·serology` | NTCP → cccDNK → pgRNK → teskari transkripsiya; HBsAg/anti-HBc/anti-HBs, “oyna” davri |
| `sarscov2` | `kind: entry·course` | ACE2/TMPRSS2, RdRp/Mpro (remdesivir/nirmatrelvir); virus yuki, IgM/IgG, yuqumli davr |
| `candida` | `kind: morphology` | achitqi → psevdogifa → gifa (10 µm masshtab), Als3, kandidalizin, biofilm; azol/exinokandin/amfoteritsin |
| `helminth` | `kind: ascaris·tapeworm` | askarida ko‘chishi (jigar → o‘pka → ichak), ~200 000 tuxum/kun; T. solium sikli, neyrosistitserkoz |
| `microbiota` | `kind: gut·antibiotic` | zichlik 10¹ → 10¹² (log), shilliq qavatlari, QZYK/butirat; antibiotik → C. difficile, FMT |
| `resistance` | `kind: mechanisms·selection` | β-laktamaza, efflyuks, nishon o‘zgarishi, porin, konyugatsiya; mutant seleksiyasi, MIC–MPC; GBD 2021 |

### v2.7 — Akademik uslub, daraja, umumiy parametrlar, bilim grafi, retseptlar (Bosqich 0)
- `style:'academic'` (dars kaliti) → bosiq `academic` mavzu, chang/musiqa yo‘q, tinch o‘tishlar; mascot/emoji/explosion/sparks/glowOrb yashiriladi.
- `level:'school'|'university'` (dars / sahna / element) → `school`: ≤5 asosiy yorliq, faktlar paneli (`class="uni"`) yashiriladi.
- `params:{T, pH, C, P, O2, CO2, dose, t}` (element > sahna > dars > standart 37 °C, pH 7.4…) → `SM.param('T',it)`; ferment, mixaelis va boshqalar bunga bog‘langan.
- Bilim grafi: `SM.graph.node(t)`, `SM.graph.links(t)`, `SM.graph.path(a,b)`, `SM.graph.check()` (portlarsiz elementlar), `SM.graph.add(t,{in,out,part,tags})`.
- Retseptlar: `SM.recipe('allergiya va anafilaksiya',{level,style,max})` → tayyor LESSON konfiguratsiyasi (sabab → mexanizm → oqibat); `SM.lesson(text,opts)` darhol ijro etadi.

### Ilmiy generatorlar (`gen`) — v2.7 (barcha sonlar qurilish vaqtida hisoblanadi)
| `ode` | `kind: sir·predator·michaelis·pk·logistic·decay·hh` | RK4 integratsiya (`SM.RK4`); parametrlar `p:{…}`; mixaelis `inhib: competitive·noncompetitive` + T/pH; pk — MEC/MTC oynasi, Css; HH — m/h/n darvozalari |
| `nucleic` | `kind: helix·mutation·restriction·pcr` | `seq`; `mut:'c.20A>T'·'c.12insA'·'c.12del'` (kodon jadvali, missens/nonsens/ramka siljishi); EcoRI/BamHI/HindIII/PstI/SmaI + gel; PZR `cycles, eff` → Ct |
| `vsepr` | `formula:'H2O'` | AXE turi, 3D aylanuvchi geometriya, bo‘linmagan juftlar, burchaklar |
| `econfig` | `element:'Fe', charge` | Madelung tartibi + istisnolar (Cr, Cu…), Hund qutilari (`SM.econfig`) |
| `balance` | `equation:'C3H8 + O2 -> CO2 + H2O'` (`+` bo‘shliq bilan; `->`, `=`, `→`) | kasr Gauss eliminatsiyasi, atom jadvali, massa tekshiruvi; ixtiyoriy `dH`, `Ea` (`SM.balance`) |
| `crystal` | `kind: sc·bcc·fcc·hcp·nacl·diamond` | CN va qadoqlanish hisoblangan (52,4 / 68 / 74 / 74 / 66,4 / 34 %) |
| `superpose` | `kind: sum·beats·standing` | `f1,f2,A1,A2,phase` |
| `pedigree` | `mode: AD·AR·XLR·XLD·mt` | urug‘li Mendel tanlovi, 3 avlod |
| `section` | `kind: bloodsmear` | 11 px/µm, har bir leykotsit turi, leykoformula jadvali |
| `assembly` | `kind: actin·microtubule·collagen·capsid·channel` | makromolekula yig‘ilishi animatsiyasi |

### Immunologiya va farmakologiya (`immuno`) — v2.7
| `lymphocyte` | `kind: bcell·tcell` | B: klon seleksiya → plazmotsit/xotira; T: MHC I/II + CD8/CD4, perforin/granzim |
| `vaccine` | `R0, coverage, booster, seed` | IgM/IgG birlamchi vs revaksinatsiya, platformalar, jamoa immuniteti panjarasi (1−1/R0) |
| `allergy` | — | sensibilizatsiya, IgE kesishuvi, degranulyatsiya, erta/kech faza grafigi |
| `autoimmune` | `kind: t1d·graves·myasthenia` | β-hujayra massasi egri chizig‘i; TRAb + teskari aloqa; AChR antitanalar va plastinka potensiali |
| `transplant` | `donor, recipient` (HLA) | A-B-DR mos kelmaslik, rad etish vaqt chizig‘i, immunosupressiya |
| `adme` | `p:{dose, fa, Fh, V, ka, thalf}` | ichak → darvoza venasi → jigar → plazma → to‘qimalar/buyrak; IV vs og‘iz (RK4), AUC, Cmax/Tmax, CL |
| `agonist` | `kind: full·partial·competitive·noncompetitive·inverse` | Hill egri chiziqlari, EC₅₀, Schild r, pA₂, retseptor animatsiyasi |

### v2.7 qayta chizilganlar (Bosqich 1)
`heart`, `kidney`, `brain` (`activity: motor·sensory·speech·language·hearing·vision`), `eye` (25 px/mm, `defect: normal·myopia·hyperopia`), `vessel` (laminar oqim, devor qavatlari), `transport` (`kind: pump` = Na⁺/K⁺-ATPaza), `enzyme` (induced fit, Ea, T/pH), `digestive` (proporsional), `watercycle` (Trenberth oqimlari), `volcano` (2–10 km o‘choq), `periodic` (faqat ajratilganlar yorlig‘i).

### Fiziologiya (`physio`) — v2.8
| type | kalitlar | nima ko‘rsatadi |
|---|---|---|
| `reflex` | `kind: stretch·withdrawal`, `length` (m), `velocity` (m/s) | reflektor yoy: retseptor → afferent → orqa miya (mono/polisinaptik) → efferent → mushak; latentlik = 2·L/v + sinaps kechikishi |
| `circulation` | `HR, SV, volume` | katta/kichik qon aylanish, bosimlar (aorta 120/80 … venalar), MO = YUCH × UH, a’zolarga taqsimlanish (%) |
| `endocrine` | `kind: thyroid·cortisol·glucose`, `diabetes:true` | gipotalamus–gipofiz–bez o‘qi, manfiy teskari aloqa; glyukoza–insulin ODE modeli (ovqatdan keyingi egri) |
| `breathing` | `kind: mechanics·spirogram`, `TV, IRV, ERV, RV` | diafragma, plevra ichi/alveolyar bosim; spirogramma: VC = TV+IRV+ERV, TLC = VC+RV |
| `autonomic` | `mode: sympathetic·parasympathetic·both` | a’zolarga simpatik/parasimpatik ta’sir, mediatorlar (NA, ACh), ganglionlar joyi |
| `thermoreg` | `kind: cold·heat·fever`, `env` (°C) | o‘rnatish nuqtasi, titrash/vazokonstriksiya, terlash; isitmada PGE₂ nuqtani ko‘taradi |
| `acidbase` | `kind: normal·racid·ralk·macid·malk` | Henderson–Hasselbalch (pH = 6,1 + log[HCO₃⁻]/(0,03·pCO₂)), Davenport diagrammasi, Winter formulasi |

### Hujayra va molekulyar biologiya II (`cellbio`) — v2.8
| type | kalitlar | nima ko‘rsatadi |
|---|---|---|
| `meiosis` | — | meyoz I (krossingover, gomologlar ajralishi) va II, 4 gaploid gameta |
| `respiration` | `kind: overview·etc`, `shuttle: malate·glycerol`, `cyanide:true` | glikoliz → PDH → Krebs → ETZ; ATF balansi hisoblanadi (~32/30); sianid IV kompleksni to‘sadi |
| `cellcycle` | `kind: normal·damage`, `G1,S,G2,M` (soat) | sikl fazalari, siklin–CDK, nazorat nuqtalari; DNK shikasti → p53 → p21 → to‘xtash/apoptoz |
| `dnarepair` | `kind: mismatch·ber·ner·dsb` | MutS/MutL, glikozilaza, UV dimeri kesib olish, NHEJ/gomologik rekombinatsiya |
| `sorting` | — | signal peptid → EPT → Golji → lizosoma / membrana / sekretsiya (M6P) |
| `cytoskeleton` | `kind: overview·motors`, `speed` | aktin (7 nm), mikrotubula (25 nm), oraliq filament (10 nm); kinezin (+), dinein (−) |
| `junctions` | — | zich birikma, adgeziv kamar, desmosoma, gemidesmosoma, tirqishli (konneksin) |
| `metabolism` | `kind: fed·fasting` | jigar, mushak, yog‘ to‘qimasi orasida glyukoza/yog‘ kislotalari/keton oqimlari; insulin vs glyukagon |

### Genetika va evolyutsiya (`genetics`) — v2.8
| type | kalitlar | nima ko‘rsatadi |
|---|---|---|
| `karyotype` | `kind: normal·down·turner·klinefelter·edwards·patau`, `sex` | 23 juft xromosoma idiogrammasi, trisomiya/monosomiya belgilash |
| `operon` | `kind: lac·trp·epigenetics` | repressor, induktor/korepressor, CAP; DNK metillanishi va giston atsetillanishi |
| `hardy` | `kind: equilibrium·drift`, `p, incidence, N, generations, lines, seed` | p² + 2pq + q² = 1; kasallik uchrashidan tashuvchilar; dreyf simulyatsiyasi (Wright–Fisher) |
| `selection` | `kind: directional·stabilizing·disruptive` | moslanuvchanlik funksiyasi, avlodlar bo‘yicha taqsimot siljishi |
| `hominin` | — | gomininlar vaqt shkalasi (mln yil) va miya hajmi (sm³) |

### Botanika (`botany`) — v2.8
| type | kalitlar | nima ko‘rsatadi |
|---|---|---|
| `plantsection` | `kind: root·stem·monocot·leaf` | ildiz (Kaspari belbog‘i), ikki/bir pallali poya, barg kesimi; shkala chizig‘i |
| `transpiration` | `RH` (%), `T` (°C) | Ψ gradienti tuproq → ildiz → ksilema → barg → havo (log shkala); Ψhavo = (RT/V̄w)·ln(RH) hisoblanadi |
| `flower` | `kind: structure·fertilization` | gul qismlari; chang naychasi, qo‘sh urug‘lanish (zigota 2n, endosperm 3n) |
| `altgen` | `kind: moss·fern·angiosperm` | sporofit (2n) ↔ gametofit (n) sikli, nasllarning nisbiy kattaligi |
| `planthormone` | `kind: phototropism·overview` | auksin (PIN), yorug‘lik tomoni; auksin, gibberellin, sitokinin, ABK, etilen jadvali |
| `nitrogen` | `kind: nodule·cycle` | tuganak, nitrogenaza (N₂ + 8H⁺ + 8e⁻ + 16 ATF), leggemoglobin; global azot aylanishi (Tg N/yil) |

### Yorliqlar (labels) dvigateli — v2.4 aniqliklari
- Har bir yorliq **langar (anchor)** ga bog‘langan: `[x,y]` (qo‘zg‘almas), `{el, fx, fy}` (element ichidagi nisbiy nuqta — element harakatlansa yorliq ham ergashadi), yoki **funksiya** `()=>[x,y]` (har kadrda qayta hisoblanadi; `null` qaytarsa yorliq yashiriladi — masalan, tasvir cheksizlikda yoki qism hali paydo bo‘lmagan).
- `labelLayout: 'auto'|'side'|'tb'`; `sides:{qism:'left'|'right'|'top'|'bottom'}` — majburiy tomon. `core:[...]` — `labels:true` da ko‘rsatiladigan asosiy qismlar (qolganlari `labels:['qism']` bilan).

### Fon va maskot (`scene`)
| `scenery` | `kind: forest·mountains·desert·ocean·underwater·night·city·field·arctic·savanna·space·lab`, `seed`, `dim` (0–1) | full-screen animated background; put it FIRST in items |
|---|---|---|
| `mascot` | `pose: wave·point·think·happy·idea·warn`, `text`, `talk`, `talkFor`, `color` | friendly guide character with speech bubble |


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
