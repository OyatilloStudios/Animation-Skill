# TEXT LAYOUT UGVAY — matn joylashuvi qoidalari va API (v1.1)

Goal: **no text ever overlaps, gets cut, touches the frame edge or becomes unreadable** — in any animation (SVG lessons, canvas motion films, HTML pages, slides). The library `textlayout.js` (global `TL`, no dependencies) works in Canvas, SVG and HTML. It never changes the words; it changes only size, line breaks and position.

## 1. The 10 rules (always)
1. **Zones first.** Split the frame into zones before writing text: header · body (media / text) · caption. Use `TL.layout(name)`; never place text by guessing coordinates.
2. **One zone = one text block.** Two text blocks never share a zone. Labels live outside the drawing (left/right columns) or in free space found by `TL.place`.
3. **Fit, don't overflow.** Every block is fitted into its box with `TL.fit` (largest size that fits, balanced lines). Minimum readable sizes at 1080p: headline 44 px, body 28 px, labels 22 px, captions 32 px. If the minimum doesn't fit → **shorten the text or split into two scenes** (say so), never shrink below the minimum.
4. **Safe area** = 6 % of the short side (≈ 65 px at 1080p, 96 px for social video). Nothing outside it.
5. **Line length:** 20–45 characters per line for body, ≤ 6 words per headline line, ≤ 2 caption lines (≤ 12 words per caption chunk — `TL.chunks`).
6. **Balanced lines, no orphans** (one short word alone on the last line). `TL.wrap(…,{balance:true})` does it.
7. **Labels:** ≤ 8 per scene, leader lines don't cross, gap ≥ 8 px between label boxes, label text never sits on top of the drawing (use a background pill or place outside).
8. **Captions** sit in the caption zone with a 45–60 % dark backdrop; other text must not enter that zone while a caption is shown.
9. **Timing:** reading time ≥ `TL.readTime(text)` (0.6 s + 0.32 s/word). Don't show two blocks entering at the same moment — stagger 0.3–0.6 s.
10. **Check with tools, not eyes only:** run `scripts/text-qa.mjs` (red boxes = overlaps, orange = outside safe area) and fix until it prints `text OK`.

Uzbek: `TL.uz(text)` converts o' g' → oʻ gʻ and ' → ʼ (tutuq belgisi). Uppercase with `toLocaleUpperCase('uz')`.

## 2. Zones — `TL.layout(name, W, H, {margin, header, caption, n, cols})`
Returns rectangles `{x,y,w,h}`: always `safe`, `header`, `body`, `caption`, plus:
| name | extra zones | use |
|---|---|---|
| `'title'` | `kicker`, `title`, `sub` | title cards, chapter cards |
| `'two-col'` | `left`, `right` (vertical video: top/bottom) | compare, text + diagram |
| `'media-left'` / `'media-right'` | `media`, `text` | picture/diagram + explanation |
| `'lower-third'` | `lower` | name tags |
| `'grid'` | `cells[]` (`n`, `cols`) | cards, icons with captions |
Vertical 9:16 automatically stacks columns.

## 3. API
| function | returns / does |
|---|---|
| `TL.measure(text,size,weight,family,track)` | width in px |
| `TL.wrap(text,size,maxW,{weight,family,balance})` | array of lines (balanced, no orphans, respects `\n`) |
| `TL.fit(text,{w,h,max,min,weight,family,lineHeight,maxLines})` | `{size,lines,width,height,lineHeight,overflow}` — `overflow:true` means: shorten the text |
| `TL.svgText(parent,text,box,{max,min,align:'start'|'middle'|'end',valign,color,weight})` | fitted multi-line SVG `<text>` |
| `TL.drawFit(ctx,text,box,{max,min,align:'left'|'center'|'right',valign,color,weight})` | draws fitted text on canvas and registers its box for QA |
| `TL.place(items,{bounds,obstacles,gap,dist})` | non-overlapping positions for labels; items `{x,y` (anchor)`,w,h,priority}` → `{x,y,w,h,ok}` |
| `TL.relax(rects,{bounds,gap})` | pushes movable rectangles apart vertically (`fixed:true` = obstacle) |
| `TL.scan(root,{W,H,frame,safe})` | `{boxes,issues}` — all visible texts in SVG/HTML and their overlaps |
| `TL.guard(root,{W,H})` | moves elements marked `data-tl-move` until nothing overlaps; returns remaining issues |
| `TL.chunks(text,{maxWords:12})` · `TL.readTime(text)` | caption chunks · seconds to read |
| `TL.track(x,y,w,h,text)` · `TL.resetFrame()` · `TL.frameIssues()` | canvas bookkeeping for QA |
| `TL.safe(W,H,margin)` · `TL.overlap(a,b)` · `TL.hits(a,b,pad)` · `TL.inside(a,B)` | geometry helpers |

## 4. How it plugs into the other UGVAY skills
- **SVG Master Ugvay (LESSON)** — already built in (v2.1): `text` items auto-fit their area (`fit:false`, `minSize`), long titles shrink to one line, callout labels are auto-moved away from other texts, the header band and the caption band (`textGuard:false` to disable), header has a soft scrim when the camera zooms under it, `qa-sheet.mjs` draws red boxes and lists `TEXT OVERLAPS` and engine `WARNINGS`. Fix the lesson until both are clean.
- **Code Motion Graphics (FILM / custom canvas)** — add `<script src="textlayout.js"></script>` before your scene code; in custom scenes draw text with `TL.drawFit(ctx,text,box,…)` inside zones from `TL.layout`; call `TL.resetFrame()` at the start of `render(t)`. `text-qa.mjs` then checks canvas text too.
- **Plain HTML / slides** — give text elements fixed zones; run `TL.guard(document.body)` after layout for elements marked `data-tl-move`; run `text-qa.mjs`.

## 5. QA
`node scripts/text-qa.mjs page.html report.png [--every 0.5] [--times 1,2] [--safe 0.05]` → exit code 0 = OK, 2 = problems (report PNG with red/orange boxes + list). Works with `__seek(t)` pages (LESSON, FILM) and static pages.

## 5b. Motion rules for text (v1.1) — no fragments, real order, enough time
1. **Animate paragraphs, not wrapped lines.** A bullet that wraps to 2–3 lines enters as one unit (its lines together); never let line 2 show while line 1 is still hidden. Fades/clips by frame-edge must act on the whole block.
2. **Text is HUD, drawings are world.** When the camera zooms/pans a drawing, the text block stays fixed on screen (or the camera frames the text too). If the zoomed drawing passes under the text, put a soft card behind the text.
3. **Order:** title → body in reading order (top→bottom, left→right) → emphasis on the key word → exit. Exit only after emphasis; never replay the entrance at the end. One entrance style per scene (order), a different one in the next scene (variety).
4. **Objects never cover text:** magnifier lenses, callouts, formulas and pictures go to free space; reserve the text rectangle before placing any floating object; keep 12–16 px gaps.
5. **Time from text:** `scene ≥ animations + hold` and `scene ≥ subtitles/2.3 words·s⁻¹ + on-screen words/3 words·s⁻¹` (`TL.readTime` per block; children ×1.2). Each subtitle chunk ≥ 1.6 s. Long narration → split the scene, don't speed it up.
6. Frames/pills around text are sized from the measured text **including letter-spacing** (`width = TL.measure(text) + letterSpacing × characters + 2 × padding`).

## 6. Fix recipes (when QA complains)
| problem | fix (in this order) |
|---|---|
| paragraph overflows area | shorten the text → bigger area (`area:'right'` → `'full'`) → split into 2 scenes |
| label × label | fewer labels (≤ 8), `labels:['a','b']` instead of `true`, bigger area, show labels in 2 scenes |
| label × paragraph | move paragraph to the other side / other area; labels need free columns next to the drawing |
| title too long | ≤ 6 words; put details in `say` |
| text under caption | keep items out of `bottom` area when the scene has `say`, or `captions:false` |
| text on busy image | add a backdrop panel (40–60 % dark) or move text to its own zone |
