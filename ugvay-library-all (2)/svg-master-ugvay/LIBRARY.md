# UGVAY LIBRARY — 3 skill, bitta kutubxona (router)

You (the AI) have a **library of three skills**. Do NOT load or use all of them for every request. Read this file first, pick **only the skills and files the request needs** (table §2), then follow that skill's own instructions. Combine skills only when the request really needs it (§3).

| # | Skill (folder) | What it is | Main file to read |
|---|---|---|---|
| A | **SVG Master Ugvay** `svg-master-ugvay/` | Educational lesson videos: `LESSON({...})` engine — biology/medicine atlas, chemistry, physics simulations, math, history, geography, 3D molecules/solids/globe, Camera Master (13 presets), 68 text effects, 26 transitions, text-timed scenes, layout guard, quiz, captions, MP4 · v2.8 LIBRARY: 223 item types on 28 shelves (NEW v2.8: physiology shelf — reflex arc, circulation, endocrine feedback, breathing, autonomic, thermoregulation/fever, acid–base; cell & molecular biology II — meiosis, cellular respiration, cell cycle/p53, DNA repair, protein sorting, cytoskeleton, cell junctions, metabolism; genetics & evolution — karyotype (Down, Turner…), operon/epigenetics, Hardy–Weinberg/drift, natural selection, hominins; botany — plant sections, transpiration, flower/double fertilization, alternation of generations, plant hormones, nitrogen fixation; v2.7: style:academic, level school|university, shared params, knowledge graph + SM.recipe(text); redrawn heart, kidney, brain, eye, vessel, Na⁺/K⁺ pump, enzyme, digestive; scientific generators shelf — ODE (SIR, predator–prey, Michaelis, PK, logistic, decay, Hodgkin–Huxley), nucleic acids (mutation, restriction, PCR), VSEPR, electron configuration, equation balancing, crystals, wave superposition, pedigree, blood smear, macromolecule assembly; immunology & pharmacology shelf — lymphocytes, vaccines, allergy, autoimmune, transplant, ADME, agonist/antagonist; v2.6: infectious agents shelf — H. pylori, TB, cholera, pyogenic cocci, hepatitis B, SARS-CoV-2, Candida, helminths, microbiota, antimicrobial resistance; + osteon, smell/taste, stroke, smoking, heavy metals; v2.5: academic medicine — organ structure, pathological processes, toxicology/chemical injury; v2.4: Earth science & astronomy — Earth layers, plates, volcano, earthquake, lightning, atmosphere, water cycle, seasons, moon phases, eclipses, solar system; photosynthesis, EM induction, states of matter; labels track moving parts; physics/biology accuracy fixes; molecular biology, histology, anatomy, microbiology, pathology, optics, space, periodic table, genetics, zoology, sceneries, mascot) — `references/LIBRARY-INDEX.md` (v2.8) | `SVGMASTER.md` |
| B | **Code Motion Graphics** `code-motion-graphics/` | Motion design / promo / showreel / logo / kinetic typography / reels: `FILM({...})` engine (16 scene types, 18 transitions, v3.2) or fully custom canvas animation by PROTOCOL; sound design | `engine/ENGINE.md`, `SKILL.md` |
| C | **Text Layout Ugvay** `text-layout-ugvay/` | Rules + `textlayout.js` so text never overlaps / overflows; zones, auto-fit, labels, captions, Uzbek typography, motion rules (v1.1), `text-qa.mjs` | `TEXT-LAYOUT.md` |

## 1. Decision procedure (always, silently)
1. What is the **purpose**? *teach/explain a topic* → A · *advertise, brand, impress, logo, reel, intro, kinetic text* → B · *only fix/arrange text, slides, posters* → C.
2. Does the result put **a lot of text** on screen (paragraphs, ≥ 5 labels, long titles, captions)? → also apply C's rules (A already has C built in; for B add `textlayout.js`).
3. Does it need **both** a lesson and a cinematic brand intro/outro or a promo of a course? → A + B (§3 recipe 1).
4. Say in one line which skill(s) you use and why, e.g. *"SVG Master (dars) + Text Layout qoidalari"*. If the user names a skill ("motion bilan qil", "svg master bilan"), use exactly that one.

## 2. Request → skill → files to read (load only these)
| User asks (examples) | Skill(s) | Read |
|---|---|---|
| "fotosintez haqida dars", "yurak qanday ishlaydi", "Nyuton qonuni animatsiya", "Amir Temur haqida video dars", quiz | A | `SVGMASTER.md` + per subject `references/SUBJECTS.md`; biology/medicine `references/BIO-ATLAS.md`; camera moves/3D `references/CAMERA.md` |
| "molekula 3D aylansin", "kub hajmi", "Yer o‘qi og‘ishi" | A (3D items) | `SVGMASTER.md` §3D + `references/CAMERA.md` |
| "rasmimdagi hujayrani tushuntir" (photo) | A (`image` + labels) | `SVGMASTER.md` image section |
| "logo animatsiya", "showreel", "reklama video", "Instagram reels intro", "kinetik matn", "crypto/tech effekt" | B | `engine/ENGINE.md` (FILM). Custom work → `SKILL.md` PROTOCOL + needed `references/0X-*.md` only |
| "ovoz/musiqa effektlari", "sound design" | B | `references/04-sound.md` |
| "matnlar ustma-ust tushyapti", "matn sig‘masin", "slayd/poster matnini joyla" | C | `TEXT-LAYOUT.md` |
| "kurs uchun reklama + 1 ta dars", "darsga chiroyli intro/outro" | B + A (+C) | §3 recipe 1 |
| "dars ichida brend logotipi chiqsin" | A (+ B only for the logo sting) | §3 recipe 2 |
| "motion videoda ko‘p matn bor" | B + C | §3 recipe 3 |

## 3. Combination recipes
1. **Intro (B) + Lesson (A) + Outro (B)** — make `intro.html` with FILM (`title`/`particles` → `logo`, 4–6 s, `format` same as the lesson), `lesson.html` with LESSON, `outro.html` with FILM (`cta`/`logo`). Render each with its own `render-lite.mjs` (same size, 30 fps), then join: `bash scripts/join.sh final.mp4 intro.mp4 lesson.mp4 outro.mp4`. Use the same theme colors (e.g. LESSON `theme:'bio'` ↔ FILM `theme:{preset:'dark',accent:'#3FE0C5'}`).
2. **Brand inside a lesson (A)** — LESSON `brand:'UGVAY'` for the corner mark; if a full logo animation is wanted, put a 3 s FILM `logo` scene as intro via recipe 1. Don't mix both engines in one HTML.
3. **Text-heavy motion (B + C)** — in FILM keep texts short (ENGINE.md rules). In custom canvas scenes include `textlayout.js` and draw text with `TL.drawFit` in `TL.layout` zones; check with `text-layout-ugvay/scripts/text-qa.mjs`.
4. **Any deliverable with text** — before delivering, run the QA of the used skill: A → `scripts/qa-sheet.mjs` (prints `TEXT OVERLAPS` + `WARNINGS`), B → `scripts/qa-sheet.mjs` + `text-qa.mjs`, C → `text-qa.mjs`. Fix until clean.

## 4. Rules shared by all three
- Lesson language default: Uzbek (Latin, oʻ gʻ ʼ). Facts/numbers only from the user or the skill's reference files.
- One idea per scene; stagger entrances; final frame/hold ≥ 1 s.
- Never write raw animation loops when an engine covers the request (A: LESSON, B: FILM). Extend engines only when an item/scene is truly missing.
- Each engine is self-contained: `svgmaster.js` (A), `motion-engine.js` (B), `textlayout.js` (C, also built into A). Put the needed `.js` next to the HTML.

## 5. Folder layout of the library zip
```
ugvay-library/
  LIBRARY.md                 ← this router (read first)
  svg-master-ugvay/          ← A
  code-motion-graphics/      ← B
  text-layout-ugvay/         ← C
  scripts/join.sh            ← join intro + lesson + outro MP4s
```

## 6. Gemini Gem — one Gem for the whole library
**Instructions:** paste §1–§4 of this file + the "Workflow" of the chosen skill's GEMINI-GEM.md files (A, B, C).
**Knowledge (≤ 10 files):** `LIBRARY.md`, `svg-master-ugvay/SVGMASTER.md`, `svg-master-ugvay/references/SUBJECTS.md`, `svg-master-ugvay/references/BIO-ATLAS.md`, `svg-master-ugvay/references/CAMERA.md`, `svg-master-ugvay/references/LIBRARY-INDEX.md`, `code-motion-graphics/engine/ENGINE.md`, `code-motion-graphics/SKILL.md`, `text-layout-ugvay/TEXT-LAYOUT.md`, one example per engine (`svg-master-ugvay/examples/v2-bio-camera-3d.html`, `code-motion-graphics/engine/example-all.html`).
