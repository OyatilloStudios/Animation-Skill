---
name: text-layout-ugvay
description: Text layout and fitting rules + textlayout.js library so on-screen text never overlaps, overflows or touches edges — zones, auto-fit font size, balanced wrapping, non-overlapping labels, captions, Uzbek typography, and a text QA checker (text-qa.mjs) for SVG, canvas and HTML animations, lessons, slides and videos.
---
# Text Layout Ugvay
v1.1: motion rules for text (TEXT-LAYOUT.md §5b) — animate whole paragraphs, text stays fixed while the camera moves, objects never cover text, scene time from text volume.
Use when a task puts text on screen (lesson, motion film, slide, poster, reel) or when the user complains that texts overlap / are cut / don't fit.
1. Read `TEXT-LAYOUT.md` (rules §1, zones §2). Plan zones before writing text.
2. Use the engine's built-in guard (SVG Master) or `textlayout.js` (`TL.fit`, `TL.drawFit`, `TL.svgText`, `TL.place`).
3. Run `node scripts/text-qa.mjs page.html report.png` and fix until `text OK`.
Part of the UGVAY library — see `../ugvay-library/SKILL.md` for combining with SVG Master Ugvay and Code Motion Graphics.
