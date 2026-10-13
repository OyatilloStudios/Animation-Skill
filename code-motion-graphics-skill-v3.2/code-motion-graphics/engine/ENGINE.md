# Motion Engine — write a FILM script, get a studio-quality video

**Why:** the engine contains tested layout, easing, transitions, sound and export code.
The AI writes only a short `FILM({...})` script (10–40 lines). Nothing can overflow the frame,
no function can be missing, the sound follows the cuts automatically.

## File you deliver
```html
<!doctype html><html><head><meta charset="utf-8"></head><body>
<script src="motion-engine.js"></script>   <!-- same folder -->
<script>
FILM({
  title:'My film', format:'16:9', theme:'dark', bpm:120, music:'tech', grid:true,
  scenes:[
    {type:'title', kicker:'STUDIO REEL', text:'Code meets *motion*', sub:'Every pixel is a function of time'},
    {type:'counter', value:1250000, suffix:'+', label:'frames rendered'},
    {type:'logo', text:'animotion', tagline:'PURE CODE · STUDIO QUALITY'}
  ]
});
</script></body></html>
```
Open in Chrome → hover → **▶ Sound**. Keys: `Space` pause, `←/→` previous/next scene, `G` safe-area guides.

## Global options
| key | values | default |
|---|---|---|
| format | `'16:9'` `'9:16'` `'1:1'` `'4:5'` | 16:9 |
| theme | `'dark'` `'light'` `'neon'` `'navy'` `'warm'` `'mono'` or `{preset:'dark', accent:'#FF4A1C', accent2:'#2DE1C2', bg, bg2, ink, dim, onAccent, font:'"Inter",sans-serif', fontUrl:'fonts/Inter.woff2', mono}` | dark |
| bpm | 90–140 (scene length = bars × 4 beats) | 120 |
| music | `'tech'` `'epic'` `'calm'` `'dark'` `'pop'` `'none'` or `{file:'music.mp3', gain:.8, offset:0}` (own track; SFX still added) | tech |
| grid / dust / grain / vignette | `true/false`; grain 0–.08 or `'film'` (animated, 5–10× bigger MP4); vignette 0–1 | false / true / .03 static / .55 |
| push | slow camera push per scene (0–.06) | .025 |
| fps | 30 or 60 | 30 |

## Common scene keys
`type` (required) · `bars` (length in bars, can be 1.5) or `seconds` · `transition` to the next scene (18): `'zoom'` `'wipe'` `'slide'` `'fade'` `'flash'` `'cut'` `'iris'` `'blinds'` `'split'` `'shutter'` `'circle'` `'glitch'` `'spin'` `'flip'` `'whip'` `'drop'` `'blur'` `'push-up'` (default cycles 16 different ones, never two equal in a row; unknown names → error banner) · `size` (text scale, default 1).
Text: wrap a word in `*stars*` to color it with the accent. `\n` forces a line break. Text is never changed by the engine.

## Scene catalogue (16)
| type | keys | default bars | use for |
|---|---|---|---|
| `title` | text, sub, kicker | 1 | opening, chapter titles, statements |
| `words` | text, perBeat (1–2) | auto (1 word/beat) | hooks, kinetic quotes, lyrics, "Stop scrolling." |
| `scramble` | text, sub | 1 | tech/AI/crypto/hacker decode reveal |
| `particles` | text, sub | 2 | magic/tech moment: dust converges into a word |
| `counter` | value, prefix, suffix, label, sub, decimals, sep, countDur | 2 | big stats ("1 250 000+", "97%", "$4.2M") |
| `bars` | title, data:[{label,value}], unit | 2 | comparisons, rankings (max bar = accent) |
| `list` | title, items:[...] (2–5) | 2 | tips, features, steps, agenda |
| `quote` | text, author | 2 | testimonials, quotes |
| `image` | src, caption, sub, focus:[x,y], zoomFrom, zoomTo, pan | 2 | photos, products, real estate, food (placeholder if missing) |
| `split` | left, right, label ('VS', '→', '' for none) | 1 | before/after, old/new, vs |
| `shape3d` | shape ('cube' 'octa' 'ico'), text, sub | 2 | tech, 3D, engineering, abstract |
| `wave` | text, sub | 2 | audio, music, data flow, calm moments |
| `grid` | text, sub | 2 | tech background statement, ripple |
| `lower` | text (name), sub (role) | 2 | name tags, speaker intro |
| `cta` | text, button, done, handle | 2 | "Follow / Subscribe / Buy" endings |
| `logo` | text (wordmark) or src (logo image), tagline, sub, hit | 2 | final logo reveal — always last |

Last scene is automatically ≥ 2 s. Drums stop at the logo/CTA hit so the ending resolves.

## Recipes (scene order that works)
- **Showreel 15 s:** title → scramble → particles(1.5) → shape3d(1.5) → wave(1) → logo
- **Reels/TikTok 9:16:** words (hook) → title → list → counter → split → cta
- **Product promo:** words → image → list (features) → counter → cta → logo
- **Data story:** title → counter → bars → quote → logo
- **Personal intro:** title → lower → list (skills) → image → cta
- **Logo sting 4–6 s:** particles(1) → logo

## Rules for the AI
1. Use ONLY types and keys from this file. Do not invent new keys. Do not write drawing code.
2. 4–8 scenes for 15–20 s; one idea per scene; ≤ 7 words per title, ≤ 5 list items, ≤ 6 bars.
3. Numbers only from the user. Text exactly as the user gave it (fix only obvious typos, say so).
4. Choose theme + music to match the mood: tech→dark/neon+tech, corporate→navy+epic, lifestyle→warm+pop, minimal→mono/light+calm.
5. End with `logo` or `cta`. Vary transitions (or leave default). Put `*accent*` on 1 word per scene max.
6. Images: ask the user for files (name them `img/1.jpg`…), put them in the folder next to the HTML.
7. After writing: check every scene has its required keys (table above). Errors show as a red banner on screen and in `window.__errors`.

## Custom scene (advanced, only if the catalogue truly lacks it)
```js
FILM({ custom:{ myScene:{ bars:1, prep(s,K){}, draw(lt,d,s,K){ const {ctx,W,H,T,cx,cy,F,label}=K; /* draw using lt (0..d) only */ } } },
       scenes:[{type:'myScene'}] })
```

## Render & check
```bash
node scripts/qa-sheet.mjs film.html sheet.png     # one image with a still from every scene → look at it / send it to the AI
node scripts/render-lite.mjs film.html film.mp4    # MP4 with sound (low heat, resumable)
node scripts/bundle.mjs film.html film-single.html # one self-contained HTML (engine inlined) to share
```
