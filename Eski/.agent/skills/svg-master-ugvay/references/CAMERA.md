# CAMERA MASTER & 3D — kinematografiya qo‘llanmasi (v2)

## Camera keyframes (scene `camera`)
`camera:[{t:0.5, dur:1.5, on:'@heart.lv', zoom:2.2}, {t:4, follow:'@p', zoom:1.6}, {t:7, x:960, y:540, zoom:1, rotate:0, tilt:0}]`
- Each keyframe eases from the previous state (`ease`: inOutCubic default; also outCubic, outBack, linear…).
- `on` — fixed target (`'@id'` center or `'@id.part'` anchor, or `[x,y]`). `follow` — tracks moving bodies every frame (pendulum, spring, projectile, orbit, incline; any item exposing `track()`).
- `zoom` 1 = whole stage; 1.5–2.5 = detail; >3 only for tiny parts. `rotate` deg (dutch angle, ±6 max). `tilt` deg (squash, fake 3D floor 20–50).
- Lesson `handheld:true` adds a living camera; scene `shake:[{t,dur,amp}]` for impacts/explosions.
- Background parallax follows the camera automatically (`parallax:false` to disable).

## Focus & lens
- `focus:{at:3, to:7, on:['heart'], blur:true}` → rack focus (others blur & dim). Without `blur` they only dim.
- `magnifier` item: live zoomed lens over a part (`on`, `zoom`, `r`, `lens`, `text`). `spotlight` item: dark vignette with a hole on a part.

## Transitions
`fade` (default) · `slide` · `zoom` · `whip` (0.45 s fast pan with motion blur — energetic topic change) · `iris` (circle opens — new chapter) · `dive` (put `dive:'@prev.part'` on the next scene: previous zooms into the part, next grows out of it — the best way to go organ → tissue → cell → organelle → molecule).

## Shot grammar (professional rules)
1. Establish → detail → return: show the whole object first, then camera to the part, then zoom back (zoom 1) before the scene ends.
2. One camera move per idea; hold 1.5–3 s on each detail while the narrator explains it.
3. Move only while nothing else is entering; stagger items (`at`) and camera keyframes (`t`).
4. Use `dive` for scale changes, `whip` for topic changes, `iris` for chapter starts, `fade` otherwise.
5. Shake only for physical events (collision, explosion, heartbeat accent) ≤ 0.6 s.

## 3D items (see SVGMASTER.md §4 3D)
- Views: `yaw` (around vertical), `pitch` (look from above), `spin` (deg/s auto-rotate), `view:[{t,dur,yaw,pitch,zoom}]` for scripted orbits, `persp` (perspective strength).
- Molecules (`mol3d`): use real geometry — H₂O bent 104,5°, CH₄ tetrahedral 109,5°, NH₃ pyramidal 107°, CO₂ linear 180°, C₂H₄ planar 120°, C₆H₆ flat hexagon. `style:'fill'` = space-filling model.
- Geometry (`solid`): label vertices for stereometry problems, hidden edges dashed automatically; combine with `formula` (V = a³, V = ⅓Sh, V = πr²h, V = 4/3πR³).
- Astronomy: `globe` (tilt 23,4° → fasllar), `solar3d`. Math: `axes3d` with vectors and surfaces.

## v2.2 presets & transitions
`camera:'push-in'|'pull-out'|'ken-burns'|'pan-left'|'pan-right'|'pan-up'|'pan-down'|'orbit'|'dolly'|'crane'|'reveal'|'focus'|'tour'` (object form `{preset:'focus', on:'@brain.cortex', zoom:1.6, at:2, dur:1.2}`; `tour` takes `on:[...]`). No camera → gentle automatic move, different per scene.
Transitions (26, default `'auto'`): fade zoom zoom-out slide whip dive iris push-left/right/up/down wipe-left/right/up/down split barn blinds venetian diagonal grid radial blur flip spin page.
Text items are pinned (don't move with the camera); when the camera zooms, a paper card fades in behind them.
