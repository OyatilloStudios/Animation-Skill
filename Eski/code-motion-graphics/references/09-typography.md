# Typography mastery for motion

Contents: 1 Type system · 2 Fonts & loading · 3 Layout math · 4 Kinetic type catalogue · 5 Scramble / decode ("crypto") text · 6 Text effects · 7 Writing on-screen copy · 8 Multilingual (Uzbek, Cyrillic, RTL) · 9 Typography mistakes

## 1. Type system (1920×1080)
| Role | Size | Weight | Tracking | Use |
| --- | --- | --- | --- | --- |
| Hero / slam | 200–320 px | 800–900 | −2 to −8 px | 1–2 words max |
| Headline | 110–160 px | 700–800 | −1 to −4 px | ≤ 6 words per line |
| Subhead | 44–64 px | 500–600 | 0 | one line |
| Body / caption | 32–40 px | 400–500 | 0 | ≤ 12 words on screen at once |
| Label / kicker | 20–28 px CAPS | 600–700 | +4 to +10 px | section numbers, small tags |
Vertical 1080×1920: same px sizes ×0.85, max 3–4 words per line. Line-height 0.95–1.05 for big type, 1.3 for body.

## 2. Fonts & loading
- Default stack: `-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif` (always available, renders identically in headless Chrome as Helvetica/Arial-like).
- Custom font: `@font-face{font-family:Brand;src:url(assets/brand.woff2)}` or base64; then `await document.fonts.load('800 100px Brand')` BEFORE first render and before capture. Canvas silently falls back to a default font if not loaded — the #1 typography bug.
- Pairings: one sans family in 2–3 weights is enough. If a contrast voice is needed: serif display (Georgia/Playfair-like) for one emotional word + sans for everything else. Mono (Menlo/Consolas) for code, data, "tech/crypto" vibes.
- Variable fonts: animate weight with `font-variation-settings` in DOM/SVG (canvas: step through weights 100…900 per frame — only works if the font is variable and loaded).

## 3. Layout math (canvas)
- Always set `ctx.font` (and `ctx.letterSpacing`) BEFORE `measureText`.
- Width with tracking: `measure()` from motionkit subtracts the trailing spacing. Centered text with tracking: use `textC()` (canvas shifts it right by track/2 otherwise).
- Vertical centering: use `ctx.textBaseline='alphabetic'`, baseline = centerY + capHeight/2, capHeight ≈ 0.72 × size (Helvetica/Arial).
- Per-character positions: use PREFIX widths `measureText(str.slice(0,i))` (keeps kerning), never sum of single-char widths.
- Wrapping: `wrap(ctx,text,maxW)`; never let a line exceed the 96 px safe area. Re-check after every copy change.
- Optical alignment: punctuation and round letters (O, C) may hang 2–4 % outside the left edge for big type.

## 4. Kinetic type catalogue (pick 2–3 per film, not all)
| Effect | How | When |
| --- | --- | --- |
| Slam | per-letter scale 3→1, outExpo, slight rotation, shake | energy, hooks |
| Mask rise | line rises from below a clip baseline, outExpo, 60–80 ms stagger per line | premium, Apple-like |
| Word-by-word on beat | one word per beat; emphasis word bigger / accent color | quotes, lyrics |
| Tracking in | letterSpacing 40 → −2 px with opacity 0→1 | elegant titles |
| Type-on | characters appear + blinking cursor | tech, code, messages |
| Scramble / decode | random glyphs settle into the real text | tech, security, "crypto", AI |
| Split & slide | top half/bottom half of text slide opposite ways (clip each half) | transitions |
| Counter roll | digits roll vertically to target | stats |
| Outline → fill | strokeText first, then fill wipes in | posters |
| Stretch | scaleY 0→1.2→1 from baseline | playful |
| Text as mask | photo/video visible only inside letters | hero moments |
| Text on path | place glyphs along a curve (getPointAtLength / parametric) with rotation | circular badges |
| 3D flip | per-letter scaleY = cos(angle), slight y offset, staggered | reveals |
| Highlight sweep | rectangle behind a word grows left→right in accent color | emphasis |

## 5. Scramble / decode text (the "crypto/hacker" effect)
Use `drawScramble(ctx,str,x,y,p,{font,frame,align,track})` from motionkit.
- `p` = progress 0→1 (e.g., `prog(lt,.2,1.6)`), `frame=Math.floor(lt*30)` so glyphs change 30×/s deterministically (use `lt*15` for slower flicker).
- Glyphs are locked to the FINAL positions — the line never jumps. (Bug to avoid: building a string with spaces for hidden letters and drawing it centered → the whole line slides as it decodes.)
- Charset options: `'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'` (clean), `'01'` (binary), `'!<>-_\\/[]{}—=+*^?#'` (glitch), katakana `'アイウエオカキクケコサシスセソ'` (cyber), hex `'0123456789ABCDEF'` (crypto/hash).
- Pair with: mono font, a soft `tick()` sound every 2–3 frames during decode, an accent color flash on completion.
- Hash/crypto vibe extras: show a scrolling column of hex lines (seeded), a block of `0x…` addresses typing on, a progress bar, a lock icon that "clicks".

## 6. Text effects
- Glow: `glow(ctx,color,30,()=>ctx.fillText(...))`; layer 2 glows (blur 10 + 40) for neon.
- Gradient fill: `ctx.fillStyle=ctx.createLinearGradient(x0,0,x1,0)`; animate the gradient offset for shimmer.
- Long shadow / extrude: draw the text 20–40 times offset by (i,i) in a darker color, then the face on top.
- Glitch: draw 3 copies with RGB channel offsets (`globalCompositeOperation='lighter'`, red/cyan), and random horizontal slice offsets on 2–3 frames only.
- Chromatic aberration on hit: 1–3 frames, ±4–8 px.
- Motion blur on fast text: ghost copies (techniques #16).

## 7. Writing on-screen copy
- Max 3–6 words per card; one idea per card; verbs > nouns. "Ship faster." beats "Our platform enables faster shipping."
- Reading time: hold ≥ 0.3 s per word + 0.6 s. Never cut a sentence before it can be read twice.
- Hierarchy: kicker (small caps) → headline → optional sub. Never two headlines at once.
- Numbers: write them as numerals, with units ("3× faster", "12 000 users"); round for impact but never change meaning.
- Use the user's exact words when given. If you shorten, show the user the shortened version.

## 8. Multilingual (Uzbek, Cyrillic, RTL)
- Uzbek Latin apostrophes: use ʻ (U+02BB) in oʻ, gʻ and ʼ (U+02BC) for tutuq belgisi; NOT a straight ' (it looks broken in big type). Check the font has these glyphs.
- Cyrillic: the system stack covers it; check kerning visually.
- Uppercasing: `toLocaleUpperCase('uz')`, `('tr')` for Turkish i/İ.
- RTL (Arabic, Hebrew): set `ctx.direction='rtl'`, do not animate letter-by-letter (letters join); animate by words.
- CJK: no letterSpacing negative; line breaks per character are allowed.

## 9. Typography mistakes (forbidden)
- More than 2 families; random weights; centered paragraphs of body text.
- Text touching frame edges; text over busy image without a scrim (add a 35–55 % dark gradient behind).
- Letter-by-letter animation of long sentences (unreadable).
- Font not loaded before capture (fallback font in the MP4).
- Fake bold/italic (synthesized) — use real weights.
