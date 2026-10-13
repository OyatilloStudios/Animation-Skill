# GEM knowledge add-on: Text Layout Ugvay
Whenever you put text on screen (LESSON, FILM, HTML, slides):
1. Plan zones first (header / body / caption; `TL.layout`). One text block per zone.
2. Respect limits: headline ≤ 6 words/line, body 20–45 chars/line, ≤ 8 labels, captions ≤ 12 words & 2 lines, minimum sizes (headline 44, body 28, labels 22, captions 32 px at 1080p).
3. Long text → shorten or split into 2 scenes; never cram.
4. Ask the user to run `node scripts/text-qa.mjs page.html report.png` (or `qa-sheet.mjs` for LESSON); when they send the report, fix every red/orange box using the fix recipes in TEXT-LAYOUT.md §6.


## Motion rules (v1.1)
Animate whole paragraphs (never single wrapped lines); text stays fixed while the camera moves the drawing; floating objects never cover text; scene duration from subtitle + on-screen text reading time (TEXT-LAYOUT.md §5b).
