# SVG mastery

Use SVG for: logos, icons, line art, signatures, diagrams, UI with crisp edges, path morphs, maps. Drive it from `render(t)` like everything else.

Contents: 1 Anatomy · 2 Path commands · 3 Drawing lines on · 4 Path morphing · 5 Masks & clip-paths · 6 Filters (glow, goo, noise, displacement) · 7 Gradients & patterns · 8 Transforms done right · 9 Moving along a path · 10 SVG ↔ Canvas · 11 Logo animation recipe · 12 Mistakes

## 1. Anatomy
```html
<svg id="stage" viewBox="0 0 1920 1080" width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs> <!-- gradients, masks, filters, symbols live here --> </defs>
  <g id="logo" transform="translate(960 540)"> <path id="p1" d="M-200 0 C -100 -150 100 -150 200 0" fill="none" stroke="#F4F1EA" stroke-width="12" stroke-linecap="round"/> </g>
</svg>
```
Always set `viewBox` = stage size; scale the `<svg>` with CSS like the canvas. Group (`<g>`) everything that moves together.

## 2. Path commands (uppercase absolute, lowercase relative)
`M x y` move · `L x y` line · `H x` / `V y` · `C x1 y1 x2 y2 x y` cubic Bézier · `S` smooth cubic · `Q x1 y1 x y` quadratic · `T` smooth quadratic · `A rx ry rot large sweep x y` arc · `Z` close.
Circle as path: `M cx-r cy a r r 0 1 0 2r 0 a r r 0 1 0 -2r 0`. Rounded rect: use `<rect rx>`.

## 3. Drawing lines on (stroke reveal)
```js
const P=[...document.querySelectorAll('.draw')].map(el=>{const L=el.getTotalLength();el.style.strokeDasharray=L;return [el,L]});
function render(t){ P.forEach(([el,L],i)=>{ const p=E.inOutCubic(prog(t,i*.12,i*.12+1.2)); el.style.strokeDashoffset=L*(1-p); }); }
```
Then fill fades in after the stroke completes (`fill-opacity` 0→1 over 0.3 s). For outlined fonts: convert text to paths in a vector editor first (or ask the user for an SVG with outlined text).

## 4. Path morphing
- Simple & reliable: both paths have the SAME commands in the same order and the same number of points → interpolate each number.
```js
const nums=d=>d.match(/-?\d*\.?\d+/g).map(Number);
function morphD(dA,dB,p){ const a=nums(dA),b=nums(dB); let i=0; return dA.replace(/-?\d*\.?\d+/g,()=>{const v=lerp(a[i],b[i],p);i++;return v.toFixed(2)}); }
el.setAttribute('d', morphD(A,B,E.inOutCubic(p)));
```
- Different shapes: resample both outlines to N points with `getPointAtLength` (N=120–200), align the start point (rotate the array to the closest pair), then lerp points and rebuild `M…L…Z`.
- Shape → circle → shape is a safe intermediate when outlines differ a lot.

## 5. Masks & clip-paths
```html
<clipPath id="reveal"><rect id="rv" x="0" y="0" width="0" height="1080"/></clipPath>
<g clip-path="url(#reveal)"> … </g>      <!-- animate rv width from 0 to 1920 -->
<mask id="m"><rect width="1920" height="1080" fill="white"/><circle id="hole" cx="960" cy="540" r="0" fill="black"/></mask>
```
Clip = hard edge. Mask = soft edge (white shows, black hides, gray partial; use gradients for feathered wipes). Text masks: put `<text>` inside a mask to show imagery through letters.

## 6. Filters
```html
<filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="14" result="b"/><feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"/></filter>
<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="3"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 .06"/></feComponentTransfer><feBlend in2="SourceGraphic" mode="overlay"/></filter>
<filter id="wave"><feTurbulence id="turb" type="turbulence" baseFrequency=".01 .03" numOctaves="2" seed="1"/><feDisplacementMap in="SourceGraphic" scale="30"/></filter>
```
Animate filter params from `t` (e.g., `turb.setAttribute('baseFrequency', ...)`, `seed` changes per frame = boiling line effect). Filters are expensive: keep them on small groups.

## 7. Gradients & patterns
`<linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#FF4A1C"/><stop offset="1" stop-color="#FFB347"/></linearGradient>`; animate `gradientTransform="rotate(…)"` or stop offsets for shimmer. Use `gradientUnits="userSpaceOnUse"` when the gradient should not stretch with the shape.

## 8. Transforms done right
- Use the attribute form with explicit pivot: `transform="translate(x y) rotate(a) scale(s)"` on a `<g>` whose content is drawn around (0,0). This avoids the classic "rotates around the top-left corner" bug.
- CSS transforms on SVG need `transform-box: fill-box; transform-origin: center;`.
- Order matters: translate → rotate → scale (read right-to-left as applied to the shape).

## 9. Moving along a path
```js
const L=path.getTotalLength(), q=E.inOutCubic(p), pt=path.getPointAtLength(L*q), pt2=path.getPointAtLength(Math.min(L,L*q+1));
const ang=Math.atan2(pt2.y-pt.y,pt2.x-pt.x)*180/Math.PI;
obj.setAttribute('transform',`translate(${pt.x} ${pt.y}) rotate(${ang})`);
```

## 10. SVG ↔ Canvas
- SVG path in canvas: `const p2=new Path2D(d); ctx.stroke(p2); ctx.fill(p2);` (dash tricks work too: `setLineDash([L,L])`, `lineDashOffset`).
- Whole SVG into canvas (for capture or effects): serialize → Blob URL → `Image` → `drawImage` (load once; SVG with external fonts won't render — outline the text).
- Capture: the render scripts screenshot `canvas, #stage` — give the `<svg>` `id="stage"`.

## 11. Logo animation recipe (SVG logo from the user)
1. Inspect the SVG: list its paths/groups; give each meaningful part an id (mark, wordmark, dot…).
2. Normalize: set viewBox, remove fixed width/height, convert strokes/fills to the brand colors.
3. Choreograph (5–8 s): mark parts draw on (stroke reveal, staggered) → fills fade in → wordmark mask-rises letter group by letter group → one accent part pops with outBack → light sweep → tagline. Hit sound on the pop.
4. Never redraw or "improve" the user's logo geometry; animate the parts as they are.

## 12. Mistakes
- Missing viewBox → wrong scaling. Animating `width/height` of paths instead of transforms. Morphing paths with different command structures (garbage shapes). Huge filter regions (slow). Text in SVG without a loaded font (fallback). Forgetting `stroke-linecap="round"` on drawn lines (ugly dash ends).
