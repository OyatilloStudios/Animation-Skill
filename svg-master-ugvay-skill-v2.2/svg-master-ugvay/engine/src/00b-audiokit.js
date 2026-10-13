/* ================= AUDIOKIT v2 — deterministic WebAudio score =================
   Works in AudioContext (live) and OfflineAudioContext (export). Needs BPM/BEAT/BAR constants.
   Usage:  const A=makeMixer(ac); A.kick(at); A.pad(at,chord('A','minor',3),len); ... */
function makeMixer(ac){
  // --- buses: drums / music / fx → master (compressor + limiter-ish) ---
  const master=ac.createGain();master.gain.value=1;const out=ac.createGain();out.gain.value=.55; // output trim after limiter → mean ≈ -18 dB, peak ≤ -3 dB
  const comp=ac.createDynamicsCompressor();comp.threshold.value=-14;comp.knee.value=8;comp.ratio.value=4;comp.attack.value=.003;comp.release.value=.2;
  const lim=ac.createDynamicsCompressor();lim.threshold.value=-2;lim.knee.value=0;lim.ratio.value=20;lim.attack.value=.001;lim.release.value=.05;
  master.connect(comp).connect(lim).connect(out).connect(ac.destination);
  const bus=n=>{const g=ac.createGain();g.gain.value=n;g.connect(master);return g};
  const drums=bus(.9),music=bus(.6),fx=bus(.7);
  // --- reverb: generated impulse (seeded) ---
  const rev=ac.createConvolver(),len=ac.sampleRate*2.2,ir=ac.createBuffer(2,len,ac.sampleRate);
  for(let c=0;c<2;c++){const d=ir.getChannelData(c);for(let i=0;i<len;i++){const r=Math.sin((i+c*7919)*12.9898)*43758.5453;d[i]=((r-Math.floor(r))*2-1)*Math.pow(1-i/len,3)}}
  rev.buffer=ir;const revRet=ac.createGain();revRet.gain.value=.35;rev.connect(revRet).connect(master);
  const send=(node,amt)=>{const g=ac.createGain();g.gain.value=amt;node.connect(g).connect(rev)};
  send(music,.5);send(fx,.4);
  // --- seeded noise buffer ---
  const nb=ac.createBuffer(1,ac.sampleRate,ac.sampleRate),nd=nb.getChannelData(0);
  for(let i=0;i<nd.length;i++){const r=Math.sin(i*78.233)*43758.5453;nd[i]=(r-Math.floor(r))*2-1}
  // --- click-free envelope: ALWAYS ramp from/to ~0 (never jump gain) ---
  const env=(g,at,a,peak,hold,rel)=>{g.gain.setValueAtTime(0.0001,at);g.gain.exponentialRampToValueAtTime(peak,at+a);
    g.gain.setValueAtTime(peak,at+a+hold);g.gain.exponentialRampToValueAtTime(0.0001,at+a+hold+rel)};
  const pan=(node,p)=>{const s=ac.createStereoPanner();s.pan.value=p;node.connect(s);return s};
  const noiseSrc=(at,dur)=>{const s=ac.createBufferSource();s.buffer=nb;s.loop=true;s.start(at);s.stop(at+dur+.05);return s};
  // --- sidechain: duck music bus on each kick (pumping) ---
  const duck=(at,depth=.55,rel=.22)=>{music.gain.setValueAtTime(.6,at);music.gain.linearRampToValueAtTime(.6*(1-depth),at+.01);music.gain.linearRampToValueAtTime(.6,at+rel)};
  const A={ac,master,drums,music,fx,nb,
    // play a decoded sample from the user's library (see SFX library section). opts: gain, rate, pan, bus, offset (s into file), hitAt (s of the transient inside the file)
    sample(at,buf,{gain=1,rate=1,pan:p=0,bus='fx',offset=0,hitAt=0,dur,fadeOut=.03,reverb=0}={}){
      const s=ac.createBufferSource(),g=ac.createGain(),sp=ac.createStereoPanner();s.buffer=buf;s.playbackRate.value=rate;sp.pan.value=p;
      const start=Math.max(0,at-hitAt/rate),len=dur??(buf.duration-offset)/rate;
      g.gain.setValueAtTime(gain,start);g.gain.setValueAtTime(gain,start+Math.max(0,len-fadeOut));g.gain.linearRampToValueAtTime(0,start+len);
      s.connect(g).connect(sp).connect(A[bus]);if(reverb)send(g,reverb);s.start(start,offset,len*rate+.01)},
    kick(at,v=1){const o=ac.createOscillator(),g=ac.createGain();o.frequency.setValueAtTime(160,at);o.frequency.exponentialRampToValueAtTime(45,at+.11);
      env(g,at,.002,v,.02,.32);o.connect(g).connect(drums);o.start(at);o.stop(at+.4);
      const c=noiseSrc(at,.01),cf=ac.createBiquadFilter(),cg=ac.createGain();cf.type='highpass';cf.frequency.value=3000;env(cg,at,.001,.15*v,0,.012);c.connect(cf).connect(cg).connect(drums);duck(at)},
    snare(at,v=.6){const s=noiseSrc(at,.25),f=ac.createBiquadFilter(),g=ac.createGain();f.type='bandpass';f.frequency.value=1900;f.Q.value=.8;env(g,at,.001,v,.0,.18);s.connect(f).connect(g).connect(drums);send(g,.25);
      const o=ac.createOscillator(),og=ac.createGain();o.frequency.setValueAtTime(220,at);o.frequency.exponentialRampToValueAtTime(140,at+.08);env(og,at,.001,v*.5,0,.1);o.connect(og).connect(drums);o.start(at);o.stop(at+.15)},
    clap(at,v=.5){[0,.01,.022].forEach(d=>{const s=noiseSrc(at+d,.12),f=ac.createBiquadFilter(),g=ac.createGain();f.type='bandpass';f.frequency.value=1200;env(g,at+d,.001,v,0,d<.02?.03:.12);s.connect(f).connect(g).connect(drums);send(g,.3)})},
    hat(at,v=.12,open=false,p=.25){const s=noiseSrc(at,.3),f=ac.createBiquadFilter(),g=ac.createGain();f.type='highpass';f.frequency.value=8500;env(g,at,.001,v,0,open?.22:.04);s.connect(f).connect(g);pan(g,p).connect(drums)},
    bass(at,hz,len,v=.35){const o=ac.createOscillator(),o2=ac.createOscillator(),f=ac.createBiquadFilter(),g=ac.createGain();o.type='sawtooth';o2.type='square';o.frequency.value=hz;o2.frequency.value=hz/2;
      f.type='lowpass';f.Q.value=6;f.frequency.setValueAtTime(900,at);f.frequency.exponentialRampToValueAtTime(220,at+len*.8);
      env(g,at,.01,v,Math.max(0,len-.09),.06);o.connect(f);o2.connect(f);f.connect(g).connect(music);o.start(at);o2.start(at);o.stop(at+len+.1);o2.stop(at+len+.1)},
    pad(at,freqs,len,v=.05){freqs.forEach((hz,i)=>[-6,6].forEach(cents=>{const o=ac.createOscillator(),g=ac.createGain(),f=ac.createBiquadFilter();o.type='sawtooth';o.frequency.value=hz;o.detune.value=cents;
      f.type='lowpass';f.frequency.value=1800;env(g,at,Math.min(.6,len*.3),v,Math.max(0,len*.4),len*.5);o.connect(f).connect(g);pan(g,cents>0?.4:-.4).connect(music);o.start(at);o.stop(at+len+.1)}))},
    pluck(at,hz,v=.12,p=0){const o=ac.createOscillator(),g=ac.createGain(),f=ac.createBiquadFilter();o.type='triangle';o.frequency.value=hz;f.type='lowpass';f.frequency.setValueAtTime(4000,at);f.frequency.exponentialRampToValueAtTime(400,at+.3);
      env(g,at,.003,v,0,.35);o.connect(f).connect(g);pan(g,p).connect(music);o.start(at);o.stop(at+.45)},
    blip(at,hz=1320,v=.08,p=0){const o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.frequency.value=hz;env(g,at,.002,v,0,.09);o.connect(g);pan(g,p).connect(fx);o.start(at);o.stop(at+.12)},
    riser(at,len,v=.3){const s=noiseSrc(at,len),f=ac.createBiquadFilter(),g=ac.createGain();f.type='bandpass';f.Q.value=5;f.frequency.setValueAtTime(250,at);f.frequency.exponentialRampToValueAtTime(7000,at+len);
      g.gain.setValueAtTime(.0001,at);g.gain.exponentialRampToValueAtTime(v,at+len);g.gain.exponentialRampToValueAtTime(.0001,at+len+.03);s.connect(f).connect(g).connect(fx)},
    whoosh(cut,v=.35,len=.35){const at=cut-len,s=noiseSrc(at,len+.1),f=ac.createBiquadFilter(),g=ac.createGain(),p=ac.createStereoPanner();f.type='bandpass';f.Q.value=2;
      f.frequency.setValueAtTime(400,at);f.frequency.exponentialRampToValueAtTime(5000,cut);p.pan.setValueAtTime(-.8,at);p.pan.linearRampToValueAtTime(.8,cut+.05);
      g.gain.setValueAtTime(.0001,at);g.gain.exponentialRampToValueAtTime(v,cut-.02);g.gain.exponentialRampToValueAtTime(.0001,cut+.12);s.connect(f).connect(g).connect(p).connect(fx)},
    impact(at,v=.9){A.kick(at,v);const o=ac.createOscillator(),g=ac.createGain();o.frequency.setValueAtTime(70,at);o.frequency.exponentialRampToValueAtTime(32,at+1.4);env(g,at,.003,v*.7,.05,1.4);o.connect(g).connect(drums);o.start(at);o.stop(at+1.6);
      const s=noiseSrc(at,1.2),f=ac.createBiquadFilter(),ng=ac.createGain();f.type='lowpass';f.frequency.setValueAtTime(6000,at);f.frequency.exponentialRampToValueAtTime(300,at+1);env(ng,at,.002,.35*v,0,1);s.connect(f).connect(ng).connect(fx)},
    reverseSwell(hit,len=1.2,v=.25){const s=noiseSrc(hit-len,len),f=ac.createBiquadFilter(),g=ac.createGain();f.type='lowpass';f.frequency.setValueAtTime(300,hit-len);f.frequency.exponentialRampToValueAtTime(8000,hit);
      g.gain.setValueAtTime(.0001,hit-len);g.gain.exponentialRampToValueAtTime(v,hit-.01);g.gain.setValueAtTime(.0001,hit);s.connect(f).connect(g).connect(fx)},
    tick(at,v=.06){const o=ac.createOscillator(),g=ac.createGain();o.type='square';o.frequency.value=2400;env(g,at,.0005,v,0,.015);o.connect(g).connect(fx);o.start(at);o.stop(at+.03)},
  };
  return A;
}
/* ---------- music theory ---------- */
const NOTE={C:0,'C#':1,D:2,'D#':3,E:4,F:5,'F#':6,G:7,'G#':8,A:9,'A#':10,B:11};
const hz=(name,oct=4)=>440*2**((NOTE[name]+12*(oct+1)-69)/12);           // hz('A',4)=440
const SCALE={major:[0,2,4,5,7,9,11],minor:[0,2,3,5,7,8,10],dorian:[0,2,3,5,7,9,10],penta:[0,3,5,7,10]};
const CHORD={major:[0,4,7],minor:[0,3,7],maj7:[0,4,7,11],min7:[0,3,7,10],sus2:[0,2,7],sus4:[0,5,7],add9:[0,4,7,14]};
const chord=(root,type='minor',oct=3)=>CHORD[type].map(s=>hz(root,oct)*2**(s/12));
const scaleNote=(root,scale,deg,oct=4)=>{const s=SCALE[scale],n=s.length;return hz(root,oct)*2**((s[((deg%n)+n)%n]+12*Math.floor(deg/n))/12)};
// Progressions that always sound good (minor key i–VI–III–VII): Am F C G
const PROG={epic:[['A','minor'],['F','major'],['C','major'],['G','major']],
  calm:[['C','maj7'],['A','min7'],['F','maj7'],['G','sus4']],
  dark:[['D','minor'],['A#','major'],['F','major'],['C','major']],
  tech:[['E','minor'],['C','major'],['G','major'],['D','major']]};

/* ---------- user SFX library ---------- */
// manifest: [{id,file,tags:[...],hitAt,gain,bpm,key,loop}]  — file paths relative to the HTML, or data: URIs
async function loadLibrary(ac,manifest){
  const lib={};
  await Promise.all(manifest.map(async m=>{
    const res=await fetch(m.file); if(!res.ok)throw new Error('sfx missing: '+m.file);
    lib[m.id]={...m,buf:await ac.decodeAudioData(await res.arrayBuffer())};
  }));
  return lib;
}
// pick the best sound for a cue by tags (deterministic). cue: 'whoosh'|'impact'|'riser'|'click'|'pop'|'swish'|'glitch'|'type'|'ui'|'logo'|'transition'...
function pickSfx(lib,want,seed=0){
  const W=[].concat(want);const scored=Object.values(lib).map(s=>[s,W.filter(w=>s.tags.includes(w)).length]).filter(x=>x[1]>0)
    .sort((a,b)=>b[1]-a[1]||a[0].id.localeCompare(b[0].id));
  if(!scored.length)return null;const top=scored.filter(x=>x[1]===scored[0][1]);return top[Math.floor(rnd(seed)*top.length)][0];
}
