---
name: svg-master-ugvay
description: Create professional animated educational lesson videos (biology, medicine, chemistry, physics, math, history, economics) as SVG with the LESSON() engine — diagrams, labelled structures, formulas, physics simulations, effects, 3D molecules/solids/globe, cinematic camera (follow, dive, magnifier), cell & organ atlas, image annotation, quiz, captions, music, MP4 export.
---
# SVG Master Ugvay
1. Read `SVGMASTER.md` (API) and, per subject, `references/SUBJECTS.md`; follow `references/DESIGN.md`; biology/medicine → `references/BIO-ATLAS.md`; camera moves & 3D → `references/CAMERA.md`. Text layout is built in (SVGMASTER.md §5b); part of the UGVAY library (`../ugvay-library/SKILL.md`) — for promos/logos/reels use Code Motion Graphics instead.
2. Plan scenes (table), then write ONE HTML: `<script src="svgmaster.js"></script>` + `LESSON({...})`. Imitate `examples/`.
3. Check: `node scripts/qa-sheet.mjs lesson.html sheet.png` → look at the sheet, fix errors/overlaps.
4. Export: `node scripts/render-lite.mjs lesson.html lesson.mp4`.
v2.2: scenes are timed from their text (don't force `dur`), 68 text effects + 26 transitions + camera presets (SVGMASTER.md §5c), layout guard keeps objects off text. Never write custom animation loops; extend the engine in `engine/src/` only if a needed item is missing (register `SM.items.name={build(it){…return {g,update(lt,p,st,sceneDur),len}}}` and rebuild by concatenating motionkit + audiokit + src/*.js).
