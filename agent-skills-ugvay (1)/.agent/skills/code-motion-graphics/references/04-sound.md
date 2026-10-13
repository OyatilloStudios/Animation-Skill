# Sound design (WebAudio + your own SFX library)

Contents: 1 Rules · 2 audiokit API · 3 Mixing chain · 4 Music theory quick sheet · 5 Writing a score · 6 Motion → sound map · 7 Using the user's SFX library · 8 External music & voiceover · 9 Loudness & QA · 10 Mistakes

## 1. Rules
- Audio is scheduled from the SAME constants as the visuals (BPM, BEAT, BAR, scene starts, hit times). Never type a second list of times.
- Every visual hit (cut, slam, landing, pop, logo) has a sound; every sound has a visual cause. Silence is a tool: drop the drums one beat before the big hit.
- Click-free: every gain change ramps (audiokit `env` does it). Never `gain.value = x` during playback.
- Live playback starts audio on a click (autoplay policy). Export renders in `OfflineAudioContext` → WAV → muxed.
- Deterministic: seeded noise, no Math.random.

## 2. audiokit API (assets/audiokit.js)
`const A=makeMixer(ac)` then:
| Call | Sound | Typical use |
| --- | --- | --- |
| `A.kick(at,v)` | punchy kick + click, ducks music | every beat / every cut |
| `A.snare(at)`, `A.clap(at)` | backbeat | beats 2 & 4 |
| `A.hat(at,v,open,pan)` | hi-hat | off-beats |
| `A.bass(at,hz,len)` | filtered saw+sub | root note per bar |
| `A.pad(at,freqs,len)` | wide detuned chord | harmony bed, logo resolve |
| `A.pluck(at,hz,v,pan)` | short melodic note | arpeggios, UI moments |
| `A.blip(at,hz)` / `A.tick(at)` | UI / decode ticks | type-on, scramble, counters |
| `A.whoosh(cut)` | swish that PEAKS at the cut time | transitions, fast moves |
| `A.riser(at,len)` | tension build | before a drop/logo |
| `A.reverseSwell(hit)` | reverse cymbal into a hit | logo landing |
| `A.impact(at)` | boom + sub drop + noise tail | logo, big reveal |
| `A.sample(at,buf,opts)` | the USER's sound file | section 7 |
Theory helpers: `hz('A',4)`, `chord('A','minor',3)`, `scaleNote('A','minor',deg,5)`, `PROG.epic|calm|dark|tech`.

## 3. Mixing chain (already built into makeMixer)
drums bus (0.9) + music bus (0.6, sidechain-ducked by each kick) + fx bus (0.7) → master → compressor (−14 dB, 4:1) → limiter (−2 dB) → output trim (0.55). Reverb: generated 2.2 s impulse; sends from music (.5) and fx (.4). Panning: hats/plucks slightly L/R for width; whooshes pan L→R across the cut.
Balance guide: kick and impacts loudest; music bed clearly lower than SFX; UI ticks very quiet (v .03–.08).

## 4. Music theory quick sheet
- Keys by mood: A minor / D minor = epic, serious; C major / F major = friendly, bright; E minor = tech, modern; Dorian = cool, groovy.
- Progressions (4 bars, repeat): epic Am–F–C–G; calm Cmaj7–Am7–Fmaj7–Gsus4; dark Dm–B♭–F–C; tech Em–C–G–D.
- Bass plays the chord root (octave 1–2). Pad plays the chord (octave 3). Melody/plucks pick notes from the scale (octave 4–5); land on chord tones on downbeats.
- Tempo by mood: 80–95 cinematic, 100–115 corporate, 118–128 energetic tech, 140+ hype (use half-time feel).
- End on the tonic chord (the first chord of the key) for resolution at the logo.

## 5. Writing a score (template)
```js
function scheduleAudio(t0,ac,lib){
  const A=makeMixer(ac);
  for(let bar=0;bar<BARS;bar++){ const at=t0+bar*BAR, [r,ty]=PROG.epic[bar%4];
    A.pad(at,chord(r,ty,3),BAR); A.bass(at,hz(r,1),BEAT*1.5); A.bass(at+BEAT*2,hz(r,1),BEAT*1.5);
    for(let b=0;b<4;b++){ A.kick(at+b*BEAT); A.hat(at+b*BEAT+BEAT/2); if(b%2) A.clap(at+b*BEAT); } }
  SCENES.forEach(([s])=>s>0&&A.whoosh(t0+s));          // whoosh into every cut
  A.riser(t0+LOGO_T-BAR,BAR); A.impact(t0+LOGO_T);     // build → hit on the logo
}
```
Arrangement: intro (pad only or pad+hat) → build (add kick, bass) → peak (full) → drop-out 1 beat → impact + pad resolve → tail (reverb fades) — always leave ≥ 1 s of tail after the last hit.

## 6. Motion → sound map
| Visual | Sound |
| --- | --- |
| Hard cut | kick (+ whoosh peaking on the cut) |
| Fast move / swipe | whoosh, length = move duration, pitch up with speed |
| Letter slam | short snare/blip per letter, pitch rising `hz*2**(i/12)` |
| Bounce landing | soft tick/pluck at each contact |
| Type-on / scramble | tick every 2–3 frames, very quiet |
| Counter roll | blips accelerating, final value = pluck on a chord tone |
| Pop / scale-in with overshoot | pluck or "pop" sample |
| Iris wipe / big zoom | riser into impact |
| Logo land | reverseSwell + impact + tonic pad |
| UI click | tick + tiny pluck |
| Glitch | 2–3 frames of noise bursts + bitcrush-like square blips |

## 7. Using the user's SFX library
The user can label their own sounds; the skill then picks and places them automatically.
### 7.1 Ask the user for (once)
"Put your sounds in `assets/sfx/` and send a list like the one below (or let me generate it from file names). For each file: tags, and where the main hit is if it isn't at the very start."
### 7.2 Manifest format (sfx.json or inline const)
```json
[
  {"id":"whoosh_fast_01","file":"assets/sfx/whoosh_fast_01.wav","tags":["whoosh","transition","fast"],"hitAt":0.42,"gain":0.8},
  {"id":"impact_deep_01","file":"assets/sfx/impact_deep_01.wav","tags":["impact","hit","logo","boom"],"hitAt":0.0,"gain":0.9},
  {"id":"riser_8s","file":"assets/sfx/riser_8s.wav","tags":["riser","build","tension"],"hitAt":8.0,"gain":0.7},
  {"id":"click_ui_02","file":"assets/sfx/click_ui_02.wav","tags":["click","ui","tap"],"hitAt":0.0,"gain":0.5},
  {"id":"pop_01","file":"assets/sfx/pop_01.wav","tags":["pop","bubble","scale-in"],"hitAt":0.01,"gain":0.6},
  {"id":"glitch_03","file":"assets/sfx/glitch_03.wav","tags":["glitch","digital","crypto"],"hitAt":0.0,"gain":0.5},
  {"id":"music_bed","file":"assets/music/bed_120bpm.wav","tags":["music","bed"],"bpm":120,"key":"Am","hitAt":0,"gain":0.6}
]
```
- `hitAt` = seconds from file start to the transient/peak. Risers: hitAt = end of the rise. Whooshes: the loudest point. This makes `A.sample(cutTime, …, {hitAt})` land the peak EXACTLY on the cut.
- Find hitAt automatically: `ffmpeg -i f.wav -af astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.Peak_level -f null -` and take the loudest window, or ask the user.
- Standard tags vocabulary: whoosh, swish, transition, impact, hit, boom, logo, riser, build, downlifter, click, tap, ui, pop, bubble, glitch, digital, type, keyboard, notification, success, error, cash, camera, swipe, ambience, music, bed, stinger.
### 7.3 Code
```js
const MANIFEST=[/* entries above */];
async function prepareAudio(ac){ return await loadLibrary(ac, MANIFEST); }   // decode once per context
// in scheduleAudio(t0,ac,lib):
const wh=pickSfx(lib,['whoosh','transition'],sceneIndex);           // deterministic choice; vary seed per cut
if(wh) A.sample(t0+cut, wh.buf, {gain:wh.gain, hitAt:wh.hitAt, reverb:.2, pan:0});
else   A.whoosh(t0+cut);                                           // fallback to synthesized
```
Live playback: `lib=await loadLibrary(AC,MANIFEST)` on the play click; export: `__renderAudio` must `await loadLibrary(oac,MANIFEST)` before `scheduleAudio(0,oac,lib)`.
Files load via `fetch` → serve the folder (`npx serve .`) or run Chromium with `--allow-file-access-from-files` (the render scripts already do). For a single-file deliverable, embed small SFX as `data:audio/wav;base64,…`.
### 7.4 Music bed from the library
- Set `BPM` = the track's bpm; align scene starts to its bars (`BAR=240/bpm`). If the track has an intro before beat 1, put that offset in `hitAt` and add it to all times.
- Play it on the music bus so kicks still duck it, or with `bus:'master'` if it's already mixed. Fade out over the last bar.
- Don't add synthesized drums on top of a full track; add only SFX hits.
### 7.5 Licensing
Use only sounds the user owns or that are licensed for their use; never download random sounds from the web.

## 8. External music & voiceover
- Voiceover: TTS → get word timestamps → time scenes and captions to them (caption appears 0.1 s before the word). Duck music −8 dB under speech (`music.gain` ramps).
- Final mix with FFmpeg if needed: `ffmpeg -i film.mp4 -i vo.wav -filter_complex "[1:a]volume=1.0[a1];[0:a][a1]amix=inputs=2:duration=first" -c:v copy final.mp4`.

## 9. Loudness & QA
- Targets (social/web): mean ≈ −18…−16 dB, peak ≤ −3 dB (≈ −14 LUFS integrated). Check: `ffmpeg -hide_banner -i film.wav -af volumedetect -f null - 2>&1 | grep -E "mean|max"`. Precise: `-af loudnorm=print_format=summary`.
- Listen points: every cut, the logo hit, the last second (tail not cut off).

## 10. Mistakes
- Music louder than SFX; constant wall of sound with no dynamics; whoosh starting at the cut instead of peaking on it; clicks from instant gain jumps; kick on every beat for 60 s (fatigue — vary sections); forgetting the tail; using a library sound without aligning its hitAt.
