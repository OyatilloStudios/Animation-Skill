# Particles & buttery-smooth motion (pro level)

Contents: 1 What "smooth" means · 2 Smoothness rules · 3 Particle architecture · 4 Particle recipes (12) · 5 Flow fields & noise · 6 Glow, trails, depth · 7 Performance budgets · 8 Mistakes

## 1. What "smooth" means
Smooth = (a) continuous position AND velocity (no sudden speed changes), (b) consistent frame pacing, (c) no aliasing/jitter. Amateur motion fails (a): things start/stop abruptly or change direction with a kink.

## 2. Smoothness rules
1. Never start or stop at full speed: use eases with zero velocity at ends (inOut*) unless an impact is intended.
2. Chained moves: if the object should PAUSE at each key, use `kf(t,[[0,a],[1,b,E.inOutCubic],[2,c,E.inOutCubic]])` (zero velocity at each key). If it should FLOW THROUGH the keys without stopping, use a Catmull-Rom spline through the points (below) driven by one eased progress value.
3. Overlap actions by 20–40 % (next element starts before the previous finishes).
4. Use sub-pixel rendering: do NOT `Math.round` positions of moving things (only of static 1-px lines).
5. Scale from the right pivot: translate to the pivot, scale, translate back.
6. Rotate with eased angle, and keep angular speed continuous across scenes.
7. Opacity: fade faster than you move (opacity done in the first 30–40 % of an entrance).
8. Camera moves: always inOutCubic/Quint, 2–4 s, never linear unless it's a constant drift.
9. Follow/lag (organic trailing): closed-form exponential smoothing of a target path: `x(t)=target(t - lag)` or blend `lerp(target(t), target(t-0.1), .5)` — never per-frame `x+=(tx-x)*0.1` (frame-rate dependent, not seekable).
10. Springs: use `spring(t,{stiffness:170,damping:18})` (natural), `{stiffness:300,damping:15}` (bouncy), `{stiffness:120,damping:26}` (soft, no overshoot).
11. 60 fps export for fast motion/particles (render_mp4.mjs … 60); 30 fps for calm films.
12. Motion blur for anything moving > ~40 px/frame (ghost copies or `ctx.filter='blur()'` along motion on 2–3 frames).

Catmull-Rom (smooth path through points):
```js
function catmull(pts,u){ const n=pts.length-1, i=Math.min(n-1,Math.floor(u*n)), t=u*n-i;
  const p0=pts[Math.max(0,i-1)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(n,i+2)];
  const f=(a,b,c,d)=>.5*((2*b)+(-a+c)*t+(2*a-5*b+4*c-d)*t*t+(-a+3*b-3*c+d)*t*t*t);
  return [f(p0[0],p1[0],p2[0],p3[0]), f(p0[1],p1[1],p2[1],p3[1])]; }
```

## 3. Particle architecture (deterministic)
- Define each particle by constants made ONCE from a seeded PRNG: birth time, lifetime, start pos, velocity, size, color index, seed.
- Position at time t = closed-form function of (t − birth): ballistic `p0+v*a+.5*g*a²`, orbital `c+R(cos(w a+φ), sin(w a+φ))`, noise drift `p0 + ∫curl` (precompute if integrating).
- If you must integrate (flocking, collisions, flow-field paths): precompute ALL frames at fixed dt=1/fps at load into a Float32Array `[frame][particle][x,y]` and index by `Math.floor(t*fps)` — fully seekable.
- Draw order: background (small, dim, slow) → mid → foreground (big, blurred, fast).

## 4. Particle recipes
1. **Dust/bokeh ambience**: 60–150 circles, radius 2–40, alpha .03–.15, slow noise drift, big ones blurred (`shadowBlur`). Fills empty frames elegantly.
2. **Burst/explosion on hit**: 200–600 particles born at the hit time, speed 300–900 px/s random angle, drag `v*e^{-3a}` (closed-form: `p0 + v*(1-e^{-k a})/k`), gravity optional, alpha 1→0, sizes shrink.
3. **Confetti**: rectangles, gravity + sideways sine flutter, rotation 3D-ish via `scaleX=cos(spin*a)`; brand colors only.
4. **Sparks**: thin lines oriented along velocity (length ∝ speed), additive blending, orange→yellow→white.
5. **Text/logo assembly**: `samplePoints()` of the text → particles start scattered (or from flow field) → ease to targets with per-particle delay (`delay=rnd(i)*.3`) → final frame swaps to solid text (crossfade 0.15 s) so edges are crisp.
6. **Dissolve/disintegrate**: reverse of 5; particles leave left→right sorted by x with noise drift upward.
7. **Flow-field streams**: thousands of points following `curl()`; draw with trails (section 6).
8. **Starfield/warp**: points in 3D, z decreasing, project `x/z`, draw as lines from previous projection = speed streaks.
9. **Orbit rings / atoms**: particles on ellipses with different tilts, depth sort, back half dimmer.
10. **Data particles**: one particle = one data unit (e.g., 1 dot = 1 000 users), arranged into bars/grids — honest and beautiful.
11. **Snow/rain/embers**: falling with wind noise, loop by wrapping y modulo height (seamless).
12. **Magnetic cursor field**: grid of dots displaced away from a moving point with falloff `exp(-d²/σ²)`, spring back.

## 5. Flow fields & noise
- `noise3(x*s, y*s, t*speed)` with s≈0.002–0.006 (bigger s = tighter swirls); `fbm` for natural textures; `curl` for fluid motion (no clumping).
- Animated noise backgrounds: draw low-res (e.g., 192×108) noise into an offscreen canvas each frame, scale up with smoothing → cheap smooth gradients.
- Loops: sample noise on a circle in time: `noise3(x, y, cos(2πt/L)*r) + …` or use 4D trick with two circles.

## 6. Glow, trails, depth
- Additive glow: `globalCompositeOperation='lighter'` + small bright cores + larger dim halos (2 passes).
- Trails (seekable): draw each particle's last K positions (compute at t−k·dt) with decreasing alpha; NOT the "don't clear the canvas" trick (not seekable).
- Depth of field: size and blur grow with |z−focus|; alpha drops for far particles.
- Color by speed or life: `mixColor(cold,hot,speedNorm)`.

## 7. Performance budgets (Canvas 2D, live 60 fps)
| Item | Budget |
| --- | --- |
| Filled circles (arc) | ~3 000 |
| fillRect 2×2 dots | ~15 000 |
| shadowBlur objects | ~50 (expensive) |
| Full-frame ctx.filter blur | 0–1 per frame |
Tricks: pre-render a glowing particle sprite once (offscreen canvas) and `drawImage` it (10× faster than shadowBlur); batch same-colored shapes into one path; for > 20 000 particles use WebGL (Three.js Points). Export is offline, so it may be slower than real time — but live preview should stay smooth.

## 8. Mistakes
- `Math.random()` in render (flicker, non-reproducible). Per-frame accumulation (`x+=vx`) without precompute (breaks seeking). Linear movement of everything (robotic). Particles everywhere all the time (noise, no focus) — use them for moments. Pure white particles on pure black without size/alpha variation (looks cheap). Forgetting to crossfade particle text into real text (fuzzy final frame).
