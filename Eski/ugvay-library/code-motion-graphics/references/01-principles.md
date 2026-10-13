# Motion design principles

Contents: 1 The 12 principles in code · 2 Easing · 3 Timing & rhythm · 4 Transitions · 5 Composition · 6 Typography · 7 Color · 8 Storytelling · 9 Taste rules

## 1. The 12 principles of animation, translated to code

| Principle | What it means | How to do it in code |
| --- | --- | --- |
| Squash & stretch | Mass and elasticity | Scale Y up/X down in fast motion (`sy=1+v*k, sx=1-v*k*.5`); squash on impact (`sy=1-k, sx=1+k`) for ~60 ms; keep area ≈ constant |
| Anticipation | Wind-up before action | Move 5–15 % opposite before the main move (`outBack` reversed, or a small dip 0.1–0.2 s before) |
| Staging | One clear focal point | One moving hero at a time; dim/blur others; center of interest on the thirds or dead center |
| Straight-ahead vs pose-to-pose | Simulation vs keyframes | Physics/particles = straight-ahead (`f(t)` closed-form or seeded sim); layout = pose-to-pose (`lerp` between states with easing) |
| Follow-through & overlap | Parts settle at different times | Stagger children 30–80 ms; trailing elements overshoot with `spring` |
| Slow in / slow out | Acceleration | Never linear for position/scale; use eases (section 2) |
| Arcs | Natural paths are curved | Add `Math.sin(p*Math.PI)*h` to a straight `lerp`, or quadratic Bézier paths |
| Secondary action | Supporting motion | Labels, counters, grain, subtle parallax that support (never compete with) the hero |
| Timing | Number of frames = weight/mood | Light/snappy 6–12 frames; heavy/elegant 18–36 frames at 30 fps |
| Exaggeration | Push beyond real | Overshoot 10–30 %, hit scale 3× → 1×, shakes 8–16 px |
| Solid drawing | Volume and depth | Perspective projection `f=d/(d+z)`, depth-sorted draws, depth-based alpha/size |
| Appeal | Charm, clarity | Clean shapes, consistent radius, pleasing proportions, one personality |

## 2. Easing

- Entrance (things arriving): `outExpo`, `outCubic`, `outBack` (overshoot), `spring`.
- Exit (things leaving): `inExpo`, `inCubic` — accelerate away.
- State-to-state: `inOutCubic`, `inOutQuint` (snappier middle).
- Elastic/organic: `spring(t, freq, damp)` = `1 - e^(-damp·t)·cos(2π·freq·t)`.
- Linear only for: constant rotation, scrolling tickers, clocks, film-time counters.
- CSS equivalents: outExpo ≈ `cubic-bezier(.16,1,.3,1)`, inOutCubic ≈ `cubic-bezier(.65,0,.35,1)`, outBack ≈ `cubic-bezier(.34,1.56,.64,1)`.
- Ease *properties separately*: position with inOut, opacity faster (finish in the first 30–40 %), scale with outBack.

## 3. Timing & rhythm

- Choose BPM: calm 80–100, product/tech 110–124, energetic 124–140. `BEAT=60/BPM`.
- Scene lengths on the bar grid (1, 2 or 4 bars). Cuts land exactly on the downbeat.
- Inside a scene: main hit on beat 1, secondary on beat 3, micro-accents on off-beats.
- Readability: a viewer needs ~0.3 s per short word plus 1 s; a headline of 3–5 words must stay still ≥ 1.2 s.
- Stagger: 30–80 ms per item (letters 30–50 ms, cards 60–120 ms). Total stagger ≤ 40 % of the move.
- Rest: after 3–4 dense beats, give one beat of near-stillness. End on a hold ≥ 1 s.
- 30 fps is the default; 60 fps for fast UI/scrolling; 24 fps for a cinematic feel.

## 4. Transitions (cuts with intent)

- **Match cut**: an element in scene A becomes an element in scene B (dot → letter i; circle → tunnel center).
- **Iris/shape wipe**: the hero grows to fill the frame (new background), or a hole shrinks to a point.
- **Mask/slide reveal**: content enters through a clipping rect; headline lines rise from below a baseline.
- **Whip/smear**: 3–6 frames of motion blur (draw 4–8 ghost copies with decreasing alpha) + whoosh.
- **Zoom punch**: 2–4 % scale-up on the cut decaying over ~0.18 s; optional 1-frame white flash at 10–15 % alpha.
- **Morph**: interpolate point sets (sphere → torus → cube); keep point count constant and pair indices sensibly.
- Never cross-fade everything; cross-fades read as "slideshow".

## 5. Composition

- Safe area: ≥ 96 px from every edge at 1920×1080 (≥ 120 px top/bottom for vertical UI overlays on Reels/TikTok).
- Use thirds or dead center; one focal point per moment.
- Scale contrast: hero type 160–320 px vs labels 20–28 px with wide tracking.
- Negative space is a feature. Fill the frame only intentionally (grids, tunnels, full-bleed color).
- Depth: foreground (sharp, big, fast), midground (hero), background (slow, dim). Parallax ratios 1 : 0.6 : 0.3.
- Avoid empty halves of the frame for more than ~1 s unless it is a deliberate pause.

## 6. Typography in motion

- One family (system sans / Inter-like / Helvetica-like). Weights: 900 for slams, 600–800 for headlines, 500–600 for subs.
- Kinetic type modes: per-letter slam (scale 3→1 + slight rotation), per-word on the beat, line rises through a mask, tracking animation (letterSpacing 30 → −2 px), counter roll-ups, type-on (characters revealed with a cursor).
- Tight tracking for big headlines (−2 to −6 px), wide tracking for small caps labels (+4 to +10 px).
- Keep words whole; do not animate letter-by-letter for body copy.
- Measure text with `ctx.measureText` (set font and letterSpacing first) to position accents exactly (e.g., the dot of an i).

## 7. Color

- Palette: background, ink, one accent; optionally one secondary. Example dark: `#0B0B0D / #F4F1EA / #FF4A1C`. Example light: `#F7F5F0 / #141414 / #2F5BFF`.
- Use full-frame accent color for one "loud" scene only; it resets attention.
- Depth via alpha (0.15 far → 1 near), not via many hues.
- Finish: subtle vignette (radial gradient to 30–35 % black), optional grain (seeded noise at 3–5 % alpha).
- Check contrast: text ≥ 4.5:1 against its background.

## 8. Storytelling structure

- 15 s reel: Hook (0–2 s) → Build (2–10 s, 3–5 vignettes) → Peak (10–13 s) → Resolve/Logo (13–15 s + hold).
- Explainer 30–60 s: Problem → Insight → How it works (3 steps) → Proof (number) → CTA. Write the voiceover script first; time scenes to it.
- Logo reveal 5–8 s: Tension (abstract motion) → Impact (logo lands on a hit) → Settle (tagline, URL).
- Data story: one comparison that matters, revealed with honest timing (constant time scale shows real acceleration).

## 9. Taste rules (what separates "designed" from "generated")

- Fewer elements, better timed. Remove anything that does not serve the idea.
- Every motion has a cause (a beat, a previous motion, a reveal).
- Consistent physics: if things bounce, they bounce the same way everywhere.
- Consistent geometry: one corner radius, one stroke weight family, one grid.
- No rainbow gradients, no glossy bevels, no clip-art. Prefer flat color, light, and type.
- Surprise once: one unexpected match cut or morph per film.
