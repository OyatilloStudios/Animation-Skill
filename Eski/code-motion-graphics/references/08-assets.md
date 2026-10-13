# Assets: images, video & what to ask the user for

Code draws shapes, type, light, particles and 3D geometry perfectly. It CANNOT draw: real photos, faces, people, real products, real places, detailed illustrations, textures with realism, brand logos it has never seen. For those, ASK for assets (or for permission to use AI-generated ones). Never fake a photo with code; never invent a logo for a real brand.

Contents: 1 When to ask · 2 Asset request form · 3 Formats & sizes · 4 AI image prompt template · 5 Using images in code · 6 Using video in code · 7 Self-contained embedding · 8 Placeholders

## 1. When to ask (decision rule)
| The film needs… | Do |
| --- | --- |
| Shapes, type, data, abstract motion, UI drawn from scratch | Code it. Ask nothing. |
| The user's logo | Ask for SVG (best) or transparent PNG ≥ 2000 px wide |
| Product / person / place / food / interior | Ask for photos, or offer AI image prompts (section 4) |
| App/website demo | Ask for screenshots (PNG, native resolution) or the real UI text to rebuild it in code |
| Texture/background mood | Code it first (noise, gradients, grain); ask only if a real texture is essential |
| Footage (b-roll) | Ask for MP4 clips; animate typography/graphics on top |

Ask ONCE, in one message, using the form below. While waiting, build the film with labeled placeholders (section 8) so the user sees the motion immediately.

## 2. Asset request form (copy, fill, send to the user)
```
To make this film I need these files:

1. [logo]      Logo — SVG preferred (or PNG with transparent background), at least 2000 px wide.
               Do you have a light version for dark backgrounds?
2. [hero]      Main photo — JPG or PNG, at least 3840×2160 (16:9), subject centered,
               plenty of empty space on the LEFT for the headline.
3. [shots 1-3] Product/app screenshots — PNG at native resolution, no cropping.
4. [font]      Brand font file (WOFF2/TTF/OTF) or the font name. If none, I'll use a clean system sans.
5. [colors]    Brand colors as HEX (e.g. #FF4A1C). If none, I'll propose a palette.
6. [audio]     Music track (WAV/MP3) or SFX library + tags (see the sound reference), or "generate in code".

Don't have photos? I can give you ready prompts for an AI image generator (Midjourney / Imagen / DALL·E / Flux) for each image.
Name files exactly as in [brackets] (logo.svg, hero.jpg, shot1.png…) and put them in an "assets" folder next to the HTML.
```

## 3. Formats & sizes
| Asset | Best format | Minimum size for 1920×1080 film | Notes |
| --- | --- | --- | --- |
| Logo / icon / illustration | SVG | vector | Flat, outlined text, viewBox set. Else transparent PNG ≥ 2000 px |
| Photo full-frame | JPG (q85-95) or WebP | 3840×2160 (2× for Ken Burns zoom) | sRGB; 1920×1080 only if no zoom |
| Photo vertical film (1080×1920) | JPG | 2160×3840 | Subject in the middle third |
| Cut-out object (product, person) | PNG / WebP with alpha | ≥ 2000 px on long side | Clean edges, no shadow baked in |
| Screenshot | PNG | native (often 2560×1600 / 1170×2532) | Do not upscale; frame it in a device mockup |
| Texture (paper, grain, film) | JPG tiling or PNG | 1024–2048 square | Seamless if tiling |
| Footage | MP4 H.264 or WebM | 1920×1080, 30 fps (match film fps) | For alpha: WebM VP9 or PNG sequence |
| Font | WOFF2 | — | Check license allows embedding |
| Music / SFX | WAV 48 kHz 16/24-bit (best) or MP3 320k | — | Trim silence at start of SFX or provide hitAt |

Safe-zone rule for photos: tell the user where text will sit ("keep the left 40 % calm/empty").

## 4. AI image prompt template
Write one prompt per needed image. Match the film's palette and leave space for type. Structure:
```
[subject + action], [setting], [composition: framing, camera angle, negative space side],
[lighting], [color palette with hex-like words], [style/medium], [lens/camera if photo],
[mood], aspect ratio [16:9 | 9:16 | 1:1], high detail, no text, no logos, no watermark
```
Examples:
- Product hero: "a matte black wireless earbud case floating, soft studio backdrop, centered with wide empty space on the left, rim light and soft orange (#FF4A1C) glow from behind, minimal premium product photography, 85mm lens, shallow depth of field, calm luxurious mood, aspect ratio 16:9, no text, no logos"
- Background plate: "abstract dark gradient fog with subtle film grain, deep charcoal (#0B0B0D) to warm ember orange, large soft shapes, cinematic, empty center for typography, aspect ratio 16:9, no text"
- Person (vertical): "young student studying with a laptop at night, warm desk lamp, city lights bokeh, medium shot from the side, subject on the right third, copy space left, cinematic photo, 35mm, aspect ratio 9:16, no text"
- Cut-out: "single red sneaker, side view, isolated on pure white background, even soft light, product photo, no shadow, aspect ratio 1:1" (then remove background → PNG)
Rules: always add "no text, no logos, no watermark" (AI text is garbage — the film's real type is drawn in code). Specify aspect ratio = film ratio. Ask for 2–4 variations and pick the cleanest.

## 5. Using images in code (Canvas)
```js
// load BEFORE first render; capture must wait for this promise
const ready = Promise.all([loadImage('hero','assets/hero.jpg'), loadImage('logo','assets/logo.png'), document.fonts.ready]);
ready.then(()=>{ window.__ready=true; render(0); });
// in a scene:
drawCover(ctx, ASSETS.hero, 0,0,W,H, lerp(1.05,1.15,p), lerp(-.3,.3,p), 0);   // Ken Burns (slow zoom+pan)
```
Techniques with photos: Ken Burns (scale 1.05→1.15 over the scene, inOutSine-like), masked reveals (clip rect/circle/text), split panels sliding, duotone (draw grayscale with `ctx.filter='grayscale(1) contrast(1.2)'`, then `globalCompositeOperation='multiply'` a color), parallax cut-outs (background slower than PNG subject), photo inside text (`clip` with text path via offscreen canvas + `source-in`), device mockup (rounded rect frame + screenshot clipped inside).
SVG logos: `loadImage('logo','assets/logo.svg')` works; set the image width/height when drawing; for path animation inline the SVG instead (see SVG reference).
Render script: wait for `window.__ready` before capturing (`await page.waitForFunction(()=>window.__ready)`).

## 6. Using video in code
```js
const v=document.createElement('video'); v.src='assets/clip.mp4'; v.muted=true; v.preload='auto';
// in __seek (export): await seekVideo(v, t - sceneStart); then render(t) draws ctx.drawImage(v, ...)
window.__seek=async t=>{ playing=false; await seekVideo(v, clamp(t-SCENE_START,0,v.duration-0.01)); render(t); };
```
For live playback, play the video normally and draw it each frame. For export, every frame must seek and await `seeked`. Prefer pre-extracting frames with FFmpeg (`ffmpeg -i clip.mp4 -vf fps=30 f%04d.jpg`) for long clips.

## 7. Self-contained embedding
To deliver ONE file: convert small assets to data URIs.
```bash
echo "data:image/png;base64,$(base64 -w0 logo.png)"   # paste as src
```
Keep embedded total < 10 MB. Large photos/video: deliver a folder (film.html + assets/) as a zip.

## 8. Placeholders while waiting
Draw a neutral rectangle with a thin border, a diagonal cross, and the label "[hero.jpg 3840×2160]" in the exact place and size the real asset will occupy. Animate it exactly as the real image will move. Swapping later = changing only `src`.
