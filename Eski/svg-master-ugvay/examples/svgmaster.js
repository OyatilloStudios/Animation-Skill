/* ================= MOTIONKIT v2 — paste inside <script> before your scenes =================
   Pure, deterministic helpers. Every function depends only on its inputs (no real clock, no Math.random). */

/* ---------- math ---------- */
const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const lerp=(a,b,t)=>a+(b-a)*t;
const prog=(t,a,b)=>clamp((t-a)/(b-a));                    // 0..1 inside window [a,b]
const smoothstep=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t)};
const mapRange=(x,a,b,c,d)=>c+(d-c)*clamp((x-a)/(b-a));
const TAU=Math.PI*2;

/* ---------- easing ---------- */
const E={
  linear:t=>t,
  inQuad:t=>t*t, outQuad:t=>1-(1-t)**2, inOutQuad:t=>t<.5?2*t*t:1-(-2*t+2)**2/2,
  inCubic:t=>t**3, outCubic:t=>1-(1-t)**3, inOutCubic:t=>t<.5?4*t**3:1-(-2*t+2)**3/2,
  inQuart:t=>t**4, outQuart:t=>1-(1-t)**4, inOutQuart:t=>t<.5?8*t**4:1-(-2*t+2)**4/2,
  inQuint:t=>t**5, outQuint:t=>1-(1-t)**5, inOutQuint:t=>t<.5?16*t**5:1-(-2*t+2)**5/2,
  inExpo:t=>t<=0?0:2**(10*t-10), outExpo:t=>t>=1?1:1-2**(-10*t),
  inOutExpo:t=>t<=0?0:t>=1?1:t<.5?2**(20*t-10)/2:(2-2**(-20*t+10))/2,
  inCirc:t=>1-Math.sqrt(1-t*t), outCirc:t=>Math.sqrt(1-(t-1)**2),
  inBack:t=>2.70158*t**3-1.70158*t*t, outBack:t=>1+2.70158*(t-1)**3+1.70158*(t-1)**2,
  outElastic:t=>t<=0?0:t>=1?1:2**(-10*t)*Math.sin((t*10-.75)*TAU/3)+1,
  outBounce:t=>{const n=7.5625,d=2.75;if(t<1/d)return n*t*t;if(t<2/d)return n*(t-=1.5/d)*t+.75;if(t<2.5/d)return n*(t-=2.25/d)*t+.9375;return n*(t-=2.625/d)*t+.984375},
};
// CSS-style cubic-bezier(x1,y1,x2,y2) → easing fn (Newton + bisection)
function cubicBezier(x1,y1,x2,y2){
  const cx=3*x1,bx=3*(x2-x1)-cx,ax=1-cx-bx,cy=3*y1,by=3*(y2-y1)-cy,ay=1-cy-by;
  const sx=t=>((ax*t+bx)*t+cx)*t, sy=t=>((ay*t+by)*t+cy)*t, dx=t=>(3*ax*t+2*bx)*t+cx;
  return x=>{if(x<=0)return 0;if(x>=1)return 1;let t=x;
    for(let i=0;i<8;i++){const e=sx(t)-x;if(Math.abs(e)<1e-6)return sy(t);const d=dx(t);if(Math.abs(d)<1e-6)break;t-=e/d}
    let a=0,b=1;t=x;for(let i=0;i<30;i++){const v=sx(t);if(Math.abs(v-x)<1e-6)break;v<x?a=t:b=t;t=(a+b)/2}return sy(t)};
}
E.apple=cubicBezier(.25,.1,.25,1); E.material=cubicBezier(.4,0,.2,1); E.snappy=cubicBezier(.16,1,.3,1);
// damped spring, closed form (critically/under-damped). t in seconds, returns 0→1
function spring(t,{stiffness=170,damping=18,mass=1}={}){
  if(t<=0)return 0;const w0=Math.sqrt(stiffness/mass),z=damping/(2*Math.sqrt(stiffness*mass));
  if(z<1){const wd=w0*Math.sqrt(1-z*z);return 1-Math.exp(-z*w0*t)*(Math.cos(wd*t)+z*w0/wd*Math.sin(wd*t))}
  return 1-Math.exp(-w0*t)*(1+w0*t);
}
// keyframes: kf(t,[[0,0],[0.5,100,E.outBack],[1.2,40,E.inOutCubic]]) → value; easing belongs to the segment ending at that key
function kf(t,keys){
  if(t<=keys[0][0])return keys[0][1];
  for(let i=1;i<keys.length;i++){const [t1,v1,ez=E.inOutCubic]=keys[i],[t0,v0]=keys[i-1];
    if(t<=t1)return lerp(v0,v1,ez((t-t0)/(t1-t0)))}
  return keys.at(-1)[1];
}

/* ---------- deterministic randomness & noise ---------- */
const rnd=i=>{const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)};      // hash 0..1
function mulberry32(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);
  t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}                  // seeded PRNG for setup only
const _h=(x,y,z=0)=>{const s=Math.sin(x*127.1+y*311.7+z*74.7)*43758.5453;return s-Math.floor(s)};
const _f=t=>t*t*t*(t*(t*6-15)+10);
function noise3(x,y,z=0){ // smooth value noise, -1..1
  const xi=Math.floor(x),yi=Math.floor(y),zi=Math.floor(z),xf=_f(x-xi),yf=_f(y-yi),zf=_f(z-zi);
  const L=(a,b,t)=>a+(b-a)*t, c=(i,j,k)=>_h(xi+i,yi+j,zi+k);
  return L(L(L(c(0,0,0),c(1,0,0),xf),L(c(0,1,0),c(1,1,0),xf),yf),L(L(c(0,0,1),c(1,0,1),xf),L(c(0,1,1),c(1,1,1),xf),yf),zf)*2-1;
}
const fbm=(x,y,z=0,oct=4)=>{let v=0,a=.5,f=1;for(let i=0;i<oct;i++){v+=a*noise3(x*f,y*f,z*f);f*=2;a*=.5}return v};
function curl(x,y,z=0,e=.01){ // divergence-free flow → smooth swirling particles
  const dx=(noise3(x,y+e,z)-noise3(x,y-e,z))/(2*e), dy=(noise3(x+e,y,z)-noise3(x-e,y,z))/(2*e);
  return [dx,-dy];
}

/* ---------- color ---------- */
const hex2rgb=h=>{const n=parseInt(h.slice(1),16);return[n>>16&255,n>>8&255,n&255]};
const mixColor=(a,b,t)=>{const A=hex2rgb(a),B=hex2rgb(b);return`rgb(${A.map((v,i)=>Math.round(lerp(v,B[i],t))).join(',')})`};
const rgba=(h,a)=>{const[r,g,b]=hex2rgb(h);return`rgba(${r},${g},${b},${a})`};

/* ---------- text ---------- */
// scramble/decode ("crypto") text: settles left→right; deterministic glyphs per frame
function scramble(str,p,{chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/',frame=0,spread=.35}={}){
  return [...str].map((c,i)=>{if(c===' ')return' ';const at=i/str.length*(1-spread);
    if(p>=at+spread)return c; if(p<at)return ' '; return chars[Math.floor(rnd(i*13.7+frame)*chars.length)];}).join('');
}
// DRAW scramble with every glyph locked to its FINAL position (no layout jumping). align: 'left'|'center'|'right'
function drawScramble(ctx,str,x,y,p,{font,color='#fff',track=0,align='center',frame=0,chars,spread=.35}={}){
  ctx.save();ctx.font=font;ctx.fillStyle=color;ctx.textAlign='left';ctx.letterSpacing='0px';
  const chs=[...str],pre=i=>ctx.measureText(chs.slice(0,i).join('')).width+track*i; // prefix widths keep kerning
  const total=pre(chs.length)-track,x0=align==='center'?x-total/2:align==='right'?x-total:x;
  const shown=scramble(str,p,{frame,chars,spread});
  chs.forEach((c,i)=>{const g=shown[i];if(g===' ')return;
    const slot=pre(i+1)-track-pre(i),gw=ctx.measureText(g).width;ctx.fillText(g,x0+pre(i)+(slot-gw)/2,y)}); // glyph centered in its final slot
  ctx.restore();
}
// CENTERED text with letterSpacing: canvas adds trailing spacing → shift left by track/2
function textC(ctx,s,x,y,font,color,track=0){ctx.save();ctx.font=font;ctx.fillStyle=color;ctx.textAlign='center';ctx.letterSpacing=track+'px';ctx.fillText(s,x-track/2,y);ctx.restore()}
// measure with letterSpacing; returns width without trailing spacing
function measure(ctx,s,font,track=0){ctx.save();ctx.font=font;ctx.letterSpacing=track+'px';const w=ctx.measureText(s).width-track;ctx.restore();return w}
// sample filled pixels of text/shape into points (for particle formations). Call once at load.
function samplePoints(drawFn,w,h,step=6){
  const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');drawFn(g);
  const d=g.getImageData(0,0,w,h).data,pts=[];
  for(let y=0;y<h;y+=step)for(let x=0;x<w;x+=step)if(d[(y*w+x)*4+3]>128)pts.push([x,y]);return pts;
}
// word wrap to max width
function wrap(ctx,text,maxW){const words=text.split(' '),lines=[];let line='';
  for(const w of words){const t=line?line+' '+w:w;if(ctx.measureText(t).width>maxW&&line){lines.push(line);line=w}else line=t}
  if(line)lines.push(line);return lines}

/* ---------- images & video (load once, then draw from render(t)) ---------- */
const ASSETS={};
function loadImage(key,src){return new Promise((res,rej)=>{const im=new Image();im.onload=()=>{ASSETS[key]=im;res(im)};im.onerror=()=>rej(new Error('image failed: '+src));im.src=src})}
// draw image like CSS object-fit: cover, with optional Ken Burns zoom (s) and pan (px,py in -1..1)
function drawCover(ctx,im,x,y,w,h,s=1,px=0,py=0){
  const r=Math.max(w/im.width,h/im.height)*s,iw=im.width*r,ih=im.height*r;
  ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();
  ctx.drawImage(im,x+(w-iw)/2+px*(iw-w)/2,y+(h-ih)/2+py*(ih-h)/2,iw,ih);ctx.restore();
}
// video frames must be seeked and awaited before capture
async function seekVideo(v,t){if(Math.abs(v.currentTime-t)<1e-3)return;await new Promise(r=>{v.onseeked=r;v.currentTime=t})}

/* ---------- canvas helpers ---------- */
function glow(ctx,color,blur,fn){ctx.save();ctx.shadowColor=color;ctx.shadowBlur=blur;fn();ctx.restore()}
function additive(ctx,fn){ctx.save();ctx.globalCompositeOperation='lighter';fn();ctx.restore()}
function withAlpha(ctx,a,fn){ctx.save();ctx.globalAlpha*=a;fn();ctx.restore()}
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
/* TextLayout UGVAY v1 — matn joylashuvi kutubxonasi (Canvas · SVG · HTML).
   Fit text into boxes, balanced wrapping, safe areas, layout templates, non-overlapping label placement,
   DOM overlap guard (auto-fix) and QA reports. No dependencies. Global: TL.  Never changes the words. */
(function(G){'use strict';
const TL={version:'1.0'};const C=(typeof document!=='undefined')?document.createElement('canvas').getContext('2d'):null;
TL.font='Inter, "Segoe UI", Arial, sans-serif';
// ---------- measuring ----------
TL.measure=(s,size,weight=600,family=TL.font,track=0)=>{if(!C)return String(s).length*size*.55;C.font=`${weight} ${size}px ${family}`;const t=String(s).replace(/\*/g,'');return C.measureText(t).width+Math.max(0,t.length-1)*track};
// ---------- Uzbek typography ----------
TL.uz=s=>String(s).replace(/([OoGg])['‘’`ʼ]/g,'$1ʻ').replace(/([a-zA-Zʻ])['’`](?=[a-zA-Z])/g,'$1ʼ');
// ---------- wrapping ----------
function greedy(words,size,maxW,o){const lines=[];let line='';for(const w of words){const t=line?line+' '+w:w;if(!line||TL.measure(t,size,o.weight,o.family,o.track)<=maxW)line=t;else{lines.push(line);line=w}}if(line)lines.push(line);return lines}
TL.wrap=(text,size,maxW,o={})=>{o={weight:600,family:TL.font,track:0,balance:true,...o};const out=[];String(text).split('\n').forEach(par=>{const words=par.split(/\s+/).filter(Boolean);if(!words.length){out.push('');return}
  let lines=greedy(words,size,maxW,o);if(o.balance&&lines.length>1){let lo=maxW*.45,hi=maxW;for(let k=0;k<14;k++){const mid=(lo+hi)/2;const l2=greedy(words,size,mid,o);if(l2.length<=lines.length&&l2.every(l=>TL.measure(l,size,o.weight,o.family,o.track)<=mid+.5))hi=mid;else lo=mid}lines=greedy(words,size,hi,o)}
  // no orphan: last line of one short word → pull a word down
  if(lines.length>1){const L=lines[lines.length-1];if(!/\s/.test(L)&&L.length<8){const p=lines[lines.length-2].split(' ');if(p.length>2){const w=p.pop();const cand=w+' '+L;if(TL.measure(cand,size,o.weight,o.family,o.track)<=maxW){lines[lines.length-2]=p.join(' ');lines[lines.length-1]=cand}}}}
  out.push(...lines)});return out};
// ---------- fit: biggest size where wrapped text fits w×h ----------
TL.fit=(text,o={})=>{const w=o.w||600,h=o.h||200,lh=o.lineHeight||1.22,max=o.max||120,min=o.min||16;let best=null;let lo=min,hi=max;
  const ok=s=>{const lines=TL.wrap(text,s,w,o);if(o.maxLines&&lines.length>o.maxLines)return null;const wd=Math.max(0,...lines.map(l=>TL.measure(l,s,o.weight,o.family,o.track)));if(wd>w+.5)return null;const ht=(lines.length-1)*s*lh+s;return ht<=h?{size:s,lines,width:wd,height:ht,lineHeight:s*lh}:null};
  for(let k=0;k<18;k++){const m=(lo+hi)/2;const r=ok(m);if(r){best=r;lo=m}else hi=m}const s0=Math.floor(lo);best=ok(s0)||best;
  if(!best){const lines=TL.wrap(text,min,w,o);best={size:min,lines,width:w,height:lines.length*min*lh,lineHeight:min*lh,overflow:true}}return best};
// ---------- safe areas & layout templates ----------
TL.safe=(W=1920,H=1080,m)=>{const mm=m??Math.round(Math.min(W,H)*.06);return {x:mm,y:mm,w:W-2*mm,h:H-2*mm}};
TL.layout=(name,W=1920,H=1080,o={})=>{const S=TL.safe(W,H,o.margin);const v=H>W;const top=o.header??Math.round(H*(v?.11:.13));const cap=o.caption??Math.round(H*(v?.12:.14));const body={x:S.x,y:S.y+top,w:S.w,h:S.h-top-cap};const g=Math.round(W*.03);
  const R={safe:S,header:{x:S.x,y:S.y,w:S.w,h:top-g*.3},caption:{x:S.x+S.w*.1,y:S.y+S.h-cap+g*.3,w:S.w*.8,h:cap-g*.3},body};
  const split=(f)=>v?[{...body,h:body.h*f-g/2},{...body,y:body.y+body.h*f+g/2,h:body.h*(1-f)-g/2}]:[{...body,w:body.w*f-g/2},{...body,x:body.x+body.w*f+g/2,w:body.w*(1-f)-g/2}];
  if(name==='two-col'){const [a,b]=split(.5);R.left=a;R.right=b}else if(name==='media-left'||name==='media-right'){const [a,b]=split(.55);R.media=name==='media-left'?a:b;R.text=name==='media-left'?b:a}
  else if(name==='title'){R.kicker={x:S.x,y:H*.3,w:S.w,h:H*.06};R.title={x:S.x+S.w*.08,y:H*.37,w:S.w*.84,h:H*.22};R.sub={x:S.x+S.w*.15,y:H*.62,w:S.w*.7,h:H*.08}}
  else if(name==='lower-third'){R.lower={x:S.x,y:S.y+S.h-H*.2,w:S.w*.6,h:H*.16}}else if(name==='grid'){const n=o.n||4,c=o.cols||(v?1:2),r=Math.ceil(n/c);R.cells=[];for(let i=0;i<n;i++){const cw=(body.w-g*(c-1))/c,ch=(body.h-g*(r-1))/r;R.cells.push({x:body.x+(i%c)*(cw+g),y:body.y+Math.floor(i/c)*(ch+g),w:cw,h:ch})}}
  return R};
// ---------- rectangles ----------
TL.overlap=(a,b,p=0)=>Math.max(0,Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x)+p)*Math.max(0,Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y)+p);
TL.hits=(a,b,p=0)=>a.x-p<b.x+b.w&&b.x-p<a.x+a.w&&a.y-p<b.y+b.h&&b.y-p<a.y+a.h;
TL.inside=(a,B)=>a.x>=B.x-.5&&a.y>=B.y-.5&&a.x+a.w<=B.x+B.w+.5&&a.y+a.h<=B.y+B.h+.5;
// ---------- label placement (anchor points → non-overlapping text boxes) ----------
// items:[{x,y (anchor), w,h (text box), id, priority}] ; o:{bounds, obstacles:[rects], gap, dist}
TL.place=(items,o={})=>{const B=o.bounds||TL.safe(),gap=o.gap??8,d=o.dist??28;const placed=[...(o.obstacles||[]).map(r=>({...r,_obs:true}))];const out=[];
  const order=[...items].map((it,i)=>({...it,_i:i})).sort((a,b)=>(b.priority||0)-(a.priority||0));
  order.forEach(it=>{const {w,h}=it;const C=[];const dirs=[[1,0],[-1,0],[0,-1],[0,1],[1,-1],[-1,-1],[1,1],[-1,1]];for(let ring=1;ring<=6;ring++)dirs.forEach(([dx,dy])=>{const r=d*ring;let x=it.x+(dx>0?r:dx<0?-r-w:-w/2),y=it.y+(dy>0?r:dy<0?-r-h:-h/2);C.push({x,y,w,h,ring})});
    let best=null,bs=Infinity;C.forEach(c=>{let s=c.ring*40;if(!TL.inside(c,B))s+=1e6;placed.forEach(p=>{s+=TL.overlap(c,p,gap)*(p._obs?3:10)});if(s<bs){bs=s;best=c}});
    const r={...best,id:it.id,i:it._i,ok:bs<1e5&&placed.every(p=>!TL.hits(best,p,gap/2))};placed.push(r);out[it._i]=r});return out};
// ---------- relax: push movable rectangles apart (vertical first, keeps x) ----------
TL.relax=(rects,o={})=>{const B=o.bounds,gap=o.gap??6;const R=rects.map(r=>({...r}));for(let it=0;it<(o.iterations||60);it++){let moved=false;
  for(let i=0;i<R.length;i++)for(let j=i+1;j<R.length;j++){const a=R[i],b=R[j];if(!TL.hits(a,b,gap)||(a.fixed&&b.fixed))continue;const ov=Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y)+gap;const dir=(a.y+a.h/2)<=(b.y+b.h/2)?-1:1;
    if(a.fixed){b.y-=dir*ov}else if(b.fixed){a.y+=dir*ov}else{a.y+=dir*ov/2;b.y-=dir*ov/2}moved=true}
  if(B)R.forEach(r=>{if(r.fixed)return;r.y=Math.min(Math.max(r.y,B.y),B.y+B.h-r.h);r.x=Math.min(Math.max(r.x,B.x),B.x+B.w-r.w)});if(!moved)break}return R};
// ---------- captions: split narration into readable chunks ----------
TL.chunks=(text,o={})=>{const maxW=o.maxWords||12;const out=[];String(text).split(/(?<=[.!?…])\s+/).forEach(s=>{const w=s.split(/\s+/).filter(Boolean);if(w.length<=maxW){if(w.length)out.push(s.trim());return}
  const parts=s.split(/(?<=[,;:—])\s+/);let cur=[];parts.forEach(p=>{const pw=p.split(/\s+/);if(cur.length+pw.length>maxW&&cur.length){out.push(cur.join(' '));cur=[]}cur.push(...pw);while(cur.length>maxW){out.push(cur.splice(0,Math.ceil(cur.length/Math.ceil(cur.length/maxW))).join(' '))}});if(cur.length)out.push(cur.join(' '))});return out};
TL.readTime=s=>.6+String(s).split(/\s+/).filter(Boolean).length*.32;
// ---------- DOM (SVG/HTML) scan & guard ----------
const vis=e=>{if(e.checkVisibility&&!e.checkVisibility({opacityProperty:true,visibilityProperty:true}))return false;let n=e,op=1;while(n&&n.nodeType===1){const cs=getComputedStyle(n);if(cs.display==='none'||cs.visibility==='hidden')return false;op*=parseFloat(cs.opacity||1)*(n.getAttribute&&n.getAttribute('opacity')!=null?parseFloat(n.getAttribute('opacity')):1);n=n.parentNode}return op>.15};
TL.scan=(root=document.body,o={})=>{const els=[...root.querySelectorAll(o.selector||'text, [data-tl], h1,h2,h3,p,li,span.tl')].filter(e=>(e.textContent||'').trim()&&vis(e)&&!e.closest('[data-tl-ignore]'));
  const ref=(o.frame||root.closest&&root.closest('svg')||root).getBoundingClientRect();const sx=o.W?o.W/ref.width:1,sy=o.H?o.H/ref.height:1;
  const boxes=els.filter(e=>!els.some(p=>p!==e&&p.contains(e))).map(e=>{const r=e.getBoundingClientRect();return {el:e,text:e.textContent.trim().slice(0,40),x:(r.left-ref.left)*sx,y:(r.top-ref.top)*sy,w:r.width*sx,h:r.height*sy}}).filter(b=>b.w>1&&b.h>1);
  const issues=[];const pad=o.pad??-2;for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++){const a=boxes[i],b=boxes[j];const ov=TL.overlap(a,b,pad);if(ov>Math.min(a.w*a.h,b.w*b.h)*(o.tol??.04))issues.push({type:'overlap',a:a.text,b:b.text,area:Math.round(ov),A:a,B:b})}
  if(o.W){const S=o.safe||{x:0,y:0,w:o.W,h:o.H};boxes.forEach(b=>{if(!TL.inside(b,S))issues.push({type:'outside',a:b.text,A:b})})}return {boxes,issues}};
// guard: move elements marked movable (data-tl-move or o.movable(el)) so they stop overlapping; returns remaining issues
TL.guard=(root=document.body,o={})=>{const W=o.W,H=o.H;const res=TL.scan(root,o);const mv=o.movable||(e=>e.closest('[data-tl-move]'));const R=res.boxes.map(b=>({...b,fixed:!mv(b.el)}));const R2=TL.relax(R,{gap:o.gap??6,bounds:o.bounds});
  R2.forEach((r,i)=>{const dy=r.y-R[i].y;if(Math.abs(dy)<.5)return;const tgt=mv(r.el);if(!tgt)return;const k=o.H?(tgt.ownerSVGElement||tgt).getBoundingClientRect().height/o.H:1;const cur=tgt.getAttribute('data-tl-dy')*1||0;const ndy=cur+dy;tgt.setAttribute('data-tl-dy',ndy);
    if(tgt.namespaceURI&&tgt.namespaceURI.includes('svg')){if(!tgt.hasAttribute('data-tl-base'))tgt.setAttribute('data-tl-base',tgt.getAttribute('transform')||'');tgt.setAttribute('transform',`${tgt.getAttribute('data-tl-base')} translate(0 ${ndy.toFixed(1)})`.trim())}else tgt.style.translate=`0 ${ndy}px`});
  return TL.scan(root,o).issues};
// ---------- canvas helpers (motion engines) ----------
TL.frame=[];TL.track=(x,y,w,h,text='')=>{TL.frame.push({x,y,w,h,text});return {x,y,w,h}};TL.resetFrame=()=>{TL.frame=[]};
TL.frameIssues=()=>{const f=TL.frame,out=[];for(let i=0;i<f.length;i++)for(let j=i+1;j<f.length;j++)if(TL.overlap(f[i],f[j],-2)>4)out.push({type:'overlap',a:f[i].text,b:f[j].text});return out};
// drawFit: fitted + wrapped multi-line text inside box (align left|center|right, valign top|middle|bottom). Returns the fit.
TL.drawFit=(ctx,text,box,o={})=>{const F=TL.fit(text,{w:box.w,h:box.h,...o});const fam=o.family||TL.font,wt=o.weight||700;ctx.save();ctx.font=`${wt} ${F.size}px ${fam}`;ctx.textBaseline='alphabetic';ctx.fillStyle=o.color||ctx.fillStyle;const al=o.align||'left';ctx.textAlign=al;
  const top=box.y+(o.valign==='middle'?(box.h-F.height)/2:o.valign==='bottom'?box.h-F.height:0);const x=al==='center'?box.x+box.w/2:al==='right'?box.x+box.w:box.x;F.lines.forEach((l,i)=>ctx.fillText(l,x,top+F.size*.8+i*F.lineHeight));ctx.restore();
  const bw=F.width,bx=al==='center'?box.x+(box.w-bw)/2:al==='right'?box.x+box.w-bw:box.x;TL.track(bx,top,bw,F.height,text);return F};
// svgText: fitted multi-line <text> inside box
TL.svgText=(parent,text,box,o={})=>{const NS='http://www.w3.org/2000/svg';const F=TL.fit(text,{w:box.w,h:box.h,...o});const t=document.createElementNS(NS,'text');const al=o.align||'start';const x=al==='middle'?box.x+box.w/2:al==='end'?box.x+box.w:box.x;
  const top=box.y+(o.valign==='middle'?(box.h-F.height)/2:o.valign==='bottom'?box.h-F.height:0);t.setAttribute('font-size',F.size);t.setAttribute('font-weight',o.weight||700);t.setAttribute('font-family',o.family||TL.font);t.setAttribute('text-anchor',al);if(o.color)t.setAttribute('fill',o.color);
  F.lines.forEach((l,i)=>{const s=document.createElementNS(NS,'tspan');s.setAttribute('x',x);s.setAttribute('y',top+F.size*.8+i*F.lineHeight);s.textContent=l;t.appendChild(s)});parent.appendChild(t);return {el:t,...F}};
TL.report=(issues)=>{const k=issues||[];if(typeof window!=='undefined'){window.__textIssues=k}return k.map(i=>i.type==='overlap'?`overlap: "${i.a}" × "${i.b}"`:`outside safe area: "${i.a}"`)};
G.TL=TL;if(typeof module!=='undefined')module.exports=TL})(typeof window!=='undefined'?window:globalThis);
/* ================= SVG MASTER UGVAY — lesson engine core =================
   LESSON({...}) → animated, seekable SVG lesson video (HTML). Every frame is a pure function of time t. */
const NS='http://www.w3.org/2000/svg';
const SM={}; // global registry
let SW=1920,SH=1080,SU=1,TH,FONT,MATHF,MONOF,SVG,DEFS,ROOTG,CAP,CAPTXT,LSN,SCN=[],SDUR=1,SERR=[],SIMG={},SGRID=false,LANG='uz';
const STHEMES={
  night:{bg:'#0A0F1E',bg2:'#121A33',ink:'#EAF0FF',dim:'#8C98B8',faint:'rgba(234,240,255,.10)',a1:'#4FD1FF',a2:'#FFB547',a3:'#FF5C7A',a4:'#7CF29A',a5:'#B18CFF',panel:'rgba(18,26,51,.82)'},
  paper:{bg:'#F6F1E7',bg2:'#EDE5D6',ink:'#1C1B22',dim:'#6B6676',faint:'rgba(28,27,34,.10)',a1:'#1F6FEB',a2:'#E8790C',a3:'#D7263D',a4:'#1A9E5A',a5:'#7B4BD6',panel:'rgba(255,255,255,.85)'},
  blueprint:{bg:'#0B2A4A',bg2:'#103A63',ink:'#E8F4FF',dim:'#9CC3E6',faint:'rgba(232,244,255,.12)',a1:'#FFFFFF',a2:'#FFD166',a3:'#FF7B7B',a4:'#8EF0C4',a5:'#C3B5FF',panel:'rgba(11,42,74,.85)'},
  chalk:{bg:'#18261F',bg2:'#1F3229',ink:'#F3F1E6',dim:'#A9B5A8',faint:'rgba(243,241,230,.10)',a1:'#8FD3FF',a2:'#FFD36E',a3:'#FF8A8A',a4:'#A6F08A',a5:'#D7B8FF',panel:'rgba(24,38,31,.85)'},
  bio:{bg:'#07141A',bg2:'#0D2530',ink:'#E9FBF6',dim:'#86AFA8',faint:'rgba(233,251,246,.10)',a1:'#3FE0C5',a2:'#FFC857',a3:'#FF6B8B',a4:'#9BE564',a5:'#A78BFA',panel:'rgba(13,37,48,.85)'}
};
const col=c=>!c?TH.ink:(TH[c]||c); // 'a1'..'a5','ink','dim' or any CSS color
/* ---------- svg helpers ---------- */
let BUILDHOST=null;let LBLREC=[];const SERR_WARN=[]; // while an item builds, parentless <g> are attached here so geometry (getTotalLength/getBBox) works
function el(tag,attrs={},parent){const e=document.createElementNS(NS,tag);if(!parent&&BUILDHOST&&tag==='g')parent=BUILDHOST;for(const k in attrs)if(attrs[k]!==undefined&&attrs[k]!==null)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e}
const at=(e,o)=>{for(const k in o)e.setAttribute(k,o[k]);return e};
const f2=v=>Math.round(v*100)/100;
const MC=document.createElement('canvas').getContext('2d');
function tw(s,size,weight=600,fam=FONT){MC.font=`${weight} ${size}px ${fam}`;return MC.measureText(s).width}
function wrapText(s,size,maxW,weight=600,fam=FONT){const out=[];String(s).split('\n').forEach(par=>{let line='';par.split(/\s+/).forEach(w=>{const t=line?line+' '+w:w;if(tw(t.replace(/\*/g,''),size,weight,fam)>maxW&&line){out.push(line);line=w}else line=t});out.push(line)});return out}
// rich text line → tspans ("*word*" = accent color)
function richT(textEl,line,accent){textEl.textContent='';let acc=false;line.split(/(\*)/).forEach(tok=>{if(tok==='*'){acc=!acc;return}if(!tok)return;const sp=el('tspan',{},textEl);sp.textContent=tok;if(acc)sp.setAttribute('fill',accent)})}
/* ---------- deterministic helpers (motionkit provides E, prog, clamp, lerp, rnd, spring, noise3) ---------- */
const ease=n=>E[n]||E.outCubic;
const lerpPt=(a,b,t)=>[lerp(a[0],b[0],t),lerp(a[1],b[1],t)];
function seeded(i,k=0){return rnd(i*12.9898+k*78.233)}
/* ---------- areas: named layout boxes so the AI never guesses pixels ---------- */
function areas(){
  const top=SH>SW?260*SU:170*SU,bot=SH>SW?380*SU:190*SU,side=96*SU,x=side,y=top,w=SW-2*side,h=SH-top-bot,g=40*SU,v=SH>SW;
  const A={full:[x,y,w,h],center:[x+w*.2,y+h*.05,w*.6,h*.9],wide:[x,y+h*.1,w,h*.8]};
  if(!v){A.left=[x,y,w*.5-g/2,h];A.right=[x+w*.5+g/2,y,w*.5-g/2,h];A.left2=[x,y,w*.6-g/2,h];A.right2=[x+w*.6+g/2,y,w*.4-g/2,h];A.left3=[x,y,w*.4-g/2,h];A.right3=[x+w*.4+g/2,y,w*.6-g/2,h];
    A.top=[x,y,w,h*.5-g/2];A.bottom=[x,y+h*.5+g/2,w,h*.5-g/2]}
  else{A.left=A.top=[x,y,w,h*.5-g/2];A.right=A.bottom=[x,y+h*.5+g/2,w,h*.5-g/2];A.left2=A.left3=[x,y,w,h*.55-g/2];A.right2=A.right3=[x,y+h*.55+g/2,w,h*.45-g/2]}
  A.topleft=[x,y,w*.5-g/2,h*.5-g/2];A.topright=[x+w*.5+g/2,y,w*.5-g/2,h*.5-g/2];A.bottomleft=[x,y+h*.5+g/2,w*.5-g/2,h*.5-g/2];A.bottomright=[x+w*.5+g/2,y+h*.5+g/2,w*.5-g/2,h*.5-g/2];
  return A}
function boxOf(it){if(Array.isArray(it.box))return it.box.map(v=>v*1);const A=areas();return A[it.area||'full']||A.full}
// fit a design of size (dw,dh) into box → {s,x,y} (centered)
function fitIn(box,dw,dh,pad=0){const [x,y,w,h]=box;const s=Math.min((w-2*pad)/dw,(h-2*pad)/dh);return {s,x:x+w/2-dw*s/2,y:y+h/2-dh*s/2,cx:x+w/2,cy:y+h/2}}
/* ---------- filters & gradients ---------- */
function makeDefs(){
  DEFS=el('defs',{},SVG);
  const glow=(id,sd)=>{const f=el('filter',{id,x:'-50%',y:'-50%',width:'200%',height:'200%'},DEFS);el('feGaussianBlur',{stdDeviation:sd,result:'b'},f);const m=el('feMerge',{},f);el('feMergeNode',{in:'b'},m);el('feMergeNode',{in:'b'},m);el('feMergeNode',{in:'SourceGraphic'},m)};
  glow('glow',6*SU);glow('glow2',14*SU);glow('glowS',3*SU);
  const bl=(id,sd)=>{const f=el('filter',{id,x:'-50%',y:'-50%',width:'200%',height:'200%'},DEFS);el('feGaussianBlur',{stdDeviation:sd},f)};bl('blur4',4*SU);bl('blur10',10*SU);bl('blur24',24*SU);
  const sh=el('filter',{id:'shadow',x:'-20%',y:'-20%',width:'140%',height:'150%'},DEFS);el('feDropShadow',{dx:0,dy:6*SU,stdDeviation:10*SU,'flood-color':'#000','flood-opacity':.35},sh);
  const rg=el('radialGradient',{id:'bgg',cx:'50%',cy:'42%',r:'75%'},DEFS);el('stop',{offset:'0%','stop-color':TH.bg2},rg);el('stop',{offset:'100%','stop-color':TH.bg},rg);
  const vg=el('radialGradient',{id:'vig',cx:'50%',cy:'50%',r:'75%'},DEFS);el('stop',{offset:'60%','stop-color':'#000','stop-opacity':0},vg);el('stop',{offset:'100%','stop-color':'#000','stop-opacity':LSN.vignette??.45},vg);
  const ah=(id,c)=>{const m=el('marker',{id,viewBox:'0 0 10 10',refX:8,refY:5,markerWidth:6,markerHeight:6,orient:'auto-start-reverse'},DEFS);el('path',{d:'M0,0 L10,5 L0,10 L2.5,5 z',fill:c},m)};
  ['ink','dim','a1','a2','a3','a4','a5'].forEach(k=>ah('ar-'+k,TH[k]));
}
function arrowMarker(c){const k=['ink','dim','a1','a2','a3','a4','a5'].find(k=>TH[k]===col(c)||k===c);if(k)return `url(#ar-${k})`;const id='ar-x'+(DEFS.childNodes.length);const m=el('marker',{id,viewBox:'0 0 10 10',refX:8,refY:5,markerWidth:6,markerHeight:6,orient:'auto-start-reverse'},DEFS);el('path',{d:'M0,0 L10,5 L0,10 L2.5,5 z',fill:col(c)},m);return `url(#${id})`}
function gradient(stops,{radial=false,x1=0,y1=0,x2=0,y2=1}={}){const id='g'+Math.round(rnd(DEFS.childNodes.length+.5)*1e9);const g=radial?el('radialGradient',{id},DEFS):el('linearGradient',{id,x1,y1,x2,y2},DEFS);stops.forEach(([o,c,a=1])=>el('stop',{offset:o,'stop-color':col(c),'stop-opacity':a},g));return `url(#${id})`}
/* ---------- MATH: offline TeX-subset → SVG (frac, sqrt, ^ _, greek, operators, \int \sum \lim, \vec, \text, \left( \right), chemistry) ---------- */
const MSYM={alpha:'α',beta:'β',gamma:'γ',delta:'δ',epsilon:'ε',varepsilon:'ε',zeta:'ζ',eta:'η',theta:'θ',vartheta:'ϑ',iota:'ι',kappa:'κ',lambda:'λ',mu:'μ',nu:'ν',xi:'ξ',pi:'π',rho:'ρ',sigma:'σ',tau:'τ',upsilon:'υ',phi:'φ',varphi:'φ',chi:'χ',psi:'ψ',omega:'ω',
  Gamma:'Γ',Delta:'Δ',Theta:'Θ',Lambda:'Λ',Xi:'Ξ',Pi:'Π',Sigma:'Σ',Phi:'Φ',Psi:'Ψ',Omega:'Ω',
  cdot:'·',times:'×',div:'÷',pm:'±',mp:'∓',to:'→',rightarrow:'→',leftarrow:'←',Rightarrow:'⇒',Leftrightarrow:'⇔',leftrightarrow:'↔',rightleftharpoons:'⇌',uparrow:'↑',downarrow:'↓',
  infty:'∞',approx:'≈',neq:'≠',ne:'≠',leq:'≤',le:'≤',geq:'≥',ge:'≥',sim:'∼',propto:'∝',equiv:'≡',partial:'∂',nabla:'∇',degree:'°',circ:'°',prime:'′',ldots:'…',cdots:'⋯',
  in:'∈',forall:'∀',exists:'∃',cup:'∪',cap:'∩',subset:'⊂',angle:'∠',perp:'⊥',parallel:'∥',hbar:'ℏ',ell:'ℓ',sum:'∑',prod:'∏',int:'∫',oint:'∮',iint:'∬',
  sin:'sin',cos:'cos',tan:'tan',cot:'cot',log:'log',ln:'ln',exp:'exp',lim:'lim',max:'max',min:'min',sqrt:'√',quad:' ',qquad:'  ',',':' ',';':' ',' ':' '};
const MOPS=new Set(['+','−','-','=','<','>','±','×','÷','·','→','←','⇒','⇔','↔','⇌','≈','≠','≤','≥','∼','∝','≡','∈','⊂','∪','∩']);
const BIGOPS=new Set(['∑','∏','∫','∮','∬']);
function mParse(src){let i=0;const s=src;
  const peek=()=>s[i];
  function cmd(){i++;let n='';if(/[a-zA-Z]/.test(s[i])){while(i<s.length&&/[a-zA-Z]/.test(s[i]))n+=s[i++]}else n=s[i++];return n}
  function arg(){while(s[i]===' ')i++;if(s[i]==='{'){i++;const g=list('}');i++;return g}if(s[i]==='\\'){const n=cmd();return [sym(n)]}return [{t:'ch',v:s[i++]}]}
  function rawArg(){while(s[i]===' ')i++;if(s[i]!=='{')return s[i++]||'';i++;let d=1,o='';while(i<s.length){if(s[i]==='{')d++;if(s[i]==='}'){d--;if(!d)break}o+=s[i++]}i++;return o}
  function sym(n){if(MSYM[n]!==undefined){const v=MSYM[n];return v.length>1&&/^[a-z]+$/.test(v)?{t:'fn',v}:{t:'ch',v,up:true}}return {t:'ch',v:n,up:true}}
  function atom(){const c=s[i];
    if(c==='{'){i++;const g=list('}');i++;return {t:'grp',v:g}}
    if(c==='\\'){const n=cmd();
      if(n==='frac'||n==='dfrac'||n==='tfrac')return {t:'frac',n:arg(),d:arg()};
      if(n==='sqrt'){let idx=null;if(s[i]==='['){i++;let o='';while(s[i]!==']')o+=s[i++];i++;idx=mParse(o)}return {t:'sqrt',v:arg(),idx}}
      if(n==='text'||n==='mathrm'||n==='rm')return {t:'text',v:rawArg()};
      if(n==='vec'||n==='overrightarrow')return {t:'vec',v:arg()};
      if(n==='overline'||n==='bar')return {t:'bar',v:arg()};
      if(n==='hat')return {t:'hat',v:arg()};
      if(n==='left'||n==='right'){let d=s[i++];if(d==='\\')d=cmd()==='{'?'{':'}';return {t:n,v:d==='.'?'':d}}
      if(n==='color'){const c=rawArg();return {t:'color',c,v:arg()}}
      return sym(n)}
    i++;if(c==='-')return {t:'ch',v:'−'};if(c==='*')return {t:'ch',v:'·'};if(c==="'")return {t:'ch',v:'′'};return {t:'ch',v:c}}
  function list(end){const out=[];while(i<s.length&&s[i]!==end){if(s[i]===' '){i++;continue}
      if(s[i]==='^'||s[i]==='_'){const k=s[i++];let base=out.pop()||{t:'ch',v:''};if(base.t!=='sc')base={t:'sc',b:base};const a=arg();if(k==='^')base.sup=a;else base.sub=a;out.push(base);continue}
      out.push(atom())}
    return out}
  return list(undefined)}
// layout → box {w,a,d,draw(g,x,y,fill)}
function mLayout(nodes,S,opt){
  const it=opt.chem?false:true;const items=[];let depth=0;
  const glyph=(v,size,{italic=false,weight=400}={})=>{const w=tw(v,size,weight,MATHF)*(italic?1.02:1);return {w,a:size*.72,d:size*.22,draw(g,x,y,fill){const t=el('text',{x:f2(x),y:f2(y),'font-size':f2(size),'font-family':MATHF,'font-style':italic?'italic':'normal','font-weight':weight,fill},g);t.textContent=v}}};
  const hbox=(bs,pad=0)=>{let w=0,a=0,d=0;bs.forEach(b=>{w+=b.w;a=Math.max(a,b.a);d=Math.max(d,b.d)});return {w:w+pad,a,d,draw(g,x,y,fill){let xx=x;bs.forEach(b=>{b.draw(g,xx,y,fill);xx+=b.w})}}};
  function one(n,size){
    if(n.t==='ch'){const v=n.v;if(MOPS.has(v)){const g=glyph(v,size);const sp=size*(v==='·'?.12:.24);return {w:g.w+2*sp,a:g.a,d:g.d,draw(G,x,y,f){g.draw(G,x+sp,y,f)}}}
      if(BIGOPS.has(v)){const g=glyph(v,size*1.5);return {...g,big:true,a:size*1.05,d:size*.4}}
      const italic=it&&!n.up&&/^[a-zA-Z]$/.test(v);return glyph(v,size,{italic})}
    if(n.t==='fn'){const g=glyph(n.v,size);return {w:g.w+size*.16,a:g.a,d:g.d,draw(G,x,y,f){g.draw(G,x,y,f)}}}
    if(n.t==='text')return glyph(n.v,size);
    if(n.t==='grp')return row(n.v,size);
    if(n.t==='color'){const b=row(n.v,size);return {...b,draw(G,x,y){b.draw(G,x,y,col(n.c))}}}
    if(n.t==='frac'){const s2=size*(depth>0?.78:.86);depth++;const N=row(n.n,s2),D=row(n.d,s2);depth--;const w=Math.max(N.w,D.w)+size*.3,ax=size*.3,gap=size*.14,th=Math.max(1.5,size*.055);
      return {w:w+size*.12,a:ax+gap+N.a+N.d,d:-ax+gap+D.a+D.d,draw(G,x,y,f){N.draw(G,x+size*.06+(w-N.w)/2,y-ax-gap-N.d,f);D.draw(G,x+size*.06+(w-D.w)/2,y-ax+gap+D.a+th,f);el('rect',{x:f2(x+size*.06),y:f2(y-ax-th/2),width:f2(w),height:f2(th),fill:f},G)}}}
    if(n.t==='sqrt'){const B=row(n.v,size),pad=size*.12,h=B.a+B.d+pad*2,rw=size*.55,th=Math.max(1.5,size*.055);const I=n.idx?row(n.idx,size*.55):null;
      return {w:rw+B.w+pad*2,a:B.a+pad*1.6,d:B.d+pad*.4,draw(G,x,y,f){const top=y-B.a-pad*1.4,bot=y+B.d+pad*.3;
        el('path',{d:`M${f2(x)},${f2(y-(B.a)*.35)} L${f2(x+rw*.25)},${f2(y-(B.a)*.45)} L${f2(x+rw*.55)},${f2(bot)} L${f2(x+rw)},${f2(top)} L${f2(x+rw+B.w+pad*2)},${f2(top)}`,fill:'none',stroke:f,'stroke-width':f2(th),'stroke-linejoin':'round'},G);
        if(I)I.draw(G,x,y-B.a*.55,f);B.draw(G,x+rw+pad,y,f)}}}
    if(n.t==='vec'||n.t==='bar'||n.t==='hat'){const B=row(n.v,size);return {w:B.w,a:B.a+size*.28,d:B.d,draw(G,x,y,f){B.draw(G,x,y,f);const yy=y-B.a-size*.12,th=Math.max(1.5,size*.05);
      if(n.t==='bar')el('rect',{x:f2(x+size*.05),y:f2(yy),width:f2(B.w-size*.1),height:f2(th),fill:f},G);
      else if(n.t==='hat')el('path',{d:`M${f2(x+B.w*.2)},${f2(yy+size*.08)} L${f2(x+B.w/2)},${f2(yy-size*.06)} L${f2(x+B.w*.8)},${f2(yy+size*.08)}`,fill:'none',stroke:f,'stroke-width':f2(th)},G);
      else{el('path',{d:`M${f2(x+size*.05)},${f2(yy)} L${f2(x+B.w)},${f2(yy)} M${f2(x+B.w-size*.16)},${f2(yy-size*.09)} L${f2(x+B.w)},${f2(yy)} L${f2(x+B.w-size*.16)},${f2(yy+size*.09)}`,fill:'none',stroke:f,'stroke-width':f2(th),'stroke-linecap':'round'},G)}}}}
    if(n.t==='sc'){const B=one(n.b,size),ss=size*.68;const P=n.sup?row(n.sup,ss):null,Q=n.sub?row(n.sub,ss):null;
      if(B.big){const w=Math.max(B.w,P?P.w:0,Q?Q.w:0);const isInt=/∫|∮|∬/.test(n.b.v);if(isInt){const sw=Math.max(P?P.w:0,Q?Q.w:0);return {w:B.w+sw+size*.1,a:Math.max(B.a,P?B.a*.9+P.a:0),d:Math.max(B.d,Q?B.d*.8+Q.d:0),draw(G,x,y,f){B.draw(G,x,y+size*.12,f);if(P)P.draw(G,x+B.w*.85,y-B.a*.75,f);if(Q)Q.draw(G,x+B.w*.45,y+B.d*.85,f)}}}
        return {w:w+size*.1,a:B.a+(P?P.a+P.d+size*.1:0),d:B.d+(Q?Q.a+Q.d+size*.1:0),draw(G,x,y,f){B.draw(G,x+(w-B.w)/2,y+size*.12,f);if(P)P.draw(G,x+(w-P.w)/2,y-B.a-P.d-size*.05,f);if(Q)Q.draw(G,x+(w-Q.w)/2,y+B.d+Q.a+size*.08,f)}}}
      const up=size*.42,dn=size*.24;return {w:B.w+Math.max(P?P.w:0,Q?Q.w:0)+size*.04,a:Math.max(B.a,P?up+P.a:0),d:Math.max(B.d,Q?dn+Q.d:0),draw(G,x,y,f){B.draw(G,x,y,f);if(P)P.draw(G,x+B.w+size*.02,y-up,f);if(Q)Q.draw(G,x+B.w+size*.02,y+dn,f)}}}
    return glyph('?',size)}
  function row(ns,size){const bs=[];for(let k=0;k<ns.length;k++){const n=ns[k];
      if(n.t==='left'){let j=k+1,dd=1;while(j<ns.length&&dd){if(ns[j].t==='left')dd++;if(ns[j].t==='right')dd--;j++}const inner=row(ns.slice(k+1,j-1),size);const R=ns[j-1]||{v:''};
        const hh=inner.a+inner.d,sc=Math.max(1,hh/(size*.95));const delim=(v)=>{if(!v)return {w:size*.05,a:0,d:0,draw(){}};const g=glyph(v,size);return {w:g.w,a:inner.a,d:inner.d,draw(G,x,y,f){const gg=el('g',{transform:`translate(0 ${f2(y-(inner.a-inner.d)/2)}) scale(1 ${f2(sc)}) translate(0 ${f2(-(y-(inner.a-inner.d)/2)+size*.25/sc*0)})`},G);g.draw(gg,x,y+size*.28-(size*.28)/sc*0,f)}}};
        bs.push(delim(n.v),inner,delim(R.v));k=j-1;continue}
      if(n.t==='right')continue;bs.push(one(n,size))}
    return hbox(bs)}
  return row(nodes,S)}
function mathBox(tex,size,opt={}){return mLayout(mParse(String(tex)),size,opt)}
/* ---------- ITEM SYSTEM ---------- */
SM.items={};
const DEF_ANIM={text:'rise',formula:'write',label:'pop',image:'fade',arrow:'draw',shape:'draw',svg:'draw'};
// mark element as drawable (stroke draw-on)
function dr(e,len=1){e.setAttribute('pathLength',len);e.classList.add('dr');return e}
function textEl(parent,s,x,y,{size=34,weight=600,color,anchor='start',fam=FONT,accent,italic=false,ls=0}={}){
  const t=el('text',{x:f2(x),y:f2(y),'font-size':f2(size),'font-weight':weight,'font-family':fam,fill:col(color),'text-anchor':anchor,'font-style':italic?'italic':'normal','letter-spacing':ls||undefined},parent);richT(t,s,col(accent||'a1'));return t}
function panel(parent,x,y,w,h,{r=14,fill,stroke,sw=1.5}={}){return el('rect',{x:f2(x),y:f2(y),width:f2(w),height:f2(h),rx:f2(r*SU),fill:fill||TH.panel,stroke:stroke?col(stroke):TH.faint,'stroke-width':f2(sw*SU)},parent)}
// TEXT — paragraph / bullets; auto-wrap + auto-fit inside its area, hanging indent for bullets,
// typography from TYPO (fx / emph / fxOut), paragraphs reveal in reading order, pinned to the screen (camera never cuts it)
const TX_ANIM={fade:'fade',rise:'rise',pop:'pop',zoom:'zoom-in',grow:'zoom-in','slide-left':'slide-left','slide-right':'slide-right',draw:'ink',lines:null};
SM.items.text={build(it,ctx){const [x,y,w,h]=boxOf(it);let size=(it.size||42)*SU;const weight=it.weight||(size>60*SU?800:500);const lhK=it.lh||1.3;const al=it.align||'left';
  const pars=String(it.text||'').split('\n');const isB=p=>/^\s*[-•]\s+/.test(p);const bul=it.bullets||pars.filter(p=>p.trim()).every(isB)&&pars.some(isB);
  const lay=sz=>{const out=[];const ind=al==='left'?tw('• ',sz,weight):0;pars.forEach((par,pi)=>{const b=bul&&isB(par);const body=b?par.replace(/^\s*[-•]\s+/,''):par;if(!body.trim()){out.push({s:'',p:pi,gap:1});return}
    const ww=wrapText(body,sz,b?w-ind:w,weight);let open=false;ww.forEach((l,k)=>{let s=(open?'*':'')+l;const n=(s.match(/\*/g)||[]).length;open=n%2===1;if(open)s+='*';out.push({s:(b&&k===0?'• ':'')+s,p:pi,ind:b&&k>0?ind:0})})});return out};
  const hOf=ls=>ls.reduce((a,l)=>a+(l.gap?.45:1),0)*size*lhK;let lines=lay(size);
  if(it.fit!==false){const minS=(it.minSize||20)*SU;while(size>minS&&(hOf(lines)>h||lines.some(l=>tw(l.s.replace(/\*/g,''),size,weight)+l.ind>w+1))){size*=.94;lines=lay(size)}if(hOf(lines)>h)SERR_WARN.push(`text '${String(it.text).slice(0,30)}...' does not fit its area even at ${Math.round(size)} px: shorten it or use a bigger area`)}
  const lh=size*lhK,ax=al==='center'?x+w/2:al==='right'?x+w:x,anchor=al==='center'?'middle':al==='right'?'end':'start';const total=hOf(lines);
  let yy=it.valign==='top'?y+size:it.valign==='bottom'?y+h-total+size:y+h/2-total/2+size*.8;const g=el('g');
  const L=[];lines.forEach(l=>{if(!l.gap)L.push({s:l.s,x:ax+(l.ind||0),y:yy,size,weight,color:it.color,accent:it.accent,anchor,p:l.p});yy+=(l.gap?.45:1)*lh});
  const S=ctx&&ctx.scene||{};const T={...(typeof LSN.typo==='object'?LSN.typo:{}),...(typeof S.typo==='object'?S.typo:{})};const auto=LSN.typo!==false&&S.typo!==false;
  const legacy=it.anim&&it.anim in TX_ANIM?TX_ANIM[it.anim]:undefined;
  const fin=it.fx||it.in||(it.anim==='none'?null:legacy)||T.text||(auto?TYPO.pick('text',(S.i||0)*7+3):'rise');
  const hasAcc=/\*[^*]+\*/.test(it.text||'');const fem=it.emph||(T.emph)||(auto&&hasAcc&&it.emph!==false?TYPO.pick('emph',(S.i||0)*5+1):null);
  const fout=it.fxOut||it.outFx||T.out||null;
  const B=TYPO.block(g,L,{in:fin,emph:fem||undefined,out:fout||undefined,step:it.step??(bul?.55:.4),emphAt:it.emphAt,outAt:fout?(it.out!=null?'abs':'end'):undefined,mark:it.mark,ring:it.ring});
  return {g,selfAnim:true,selfOut:!!fout,pin:it.pin!==false,noDraw:true,len:()=>B.len,update(lt,p,st,dur){if(B.spec.outAt==='abs')B.spec.outAt=it.out-st;B.update(lt,st,dur)}}}};
// FORMULA — TeX subset, "write" reveals left→right
SM.items.formula={build(it){const box=boxOf(it);const size=(it.size||64)*SU;const B=mathBox(it.tex,size,{chem:it.chem});const g=el('g');
  let s=1;if(B.w>box[2]*.96)s=box[2]*.96/B.w;const al=it.align||'center';const x=al==='left'?box[0]:al==='right'?box[0]+box[2]-B.w*s:box[0]+box[2]/2-B.w*s/2,y=box[1]+box[3]/2+(B.a-B.d)/2*s;
  const inner=el('g',{transform:`translate(${f2(x)} ${f2(y)}) scale(${f2(s)})`},g);
  if(it.panel!==false&&it.boxed){const pb=panel(g,x-30*SU,y-B.a*s-24*SU,B.w*s+60*SU,(B.a+B.d)*s+48*SU,{stroke:it.color||'a1'});g.insertBefore(pb,inner)}
  const id='clip'+Math.round(rnd(box[0]+box[1]+B.w)*1e9);const cp=el('clipPath',{id},DEFS);const cr=el('rect',{x:-10,y:-B.a-20,width:0,height:B.a+B.d+40},cp);
  const content=el('g',{'clip-path':`url(#${id})`},inner);B.draw(content,0,0,col(it.color||'ink'));
  g.setAttribute('data-tl-ignore','');return {g,anchor:[x+B.w*s/2,y],update(lt,p){cr.setAttribute('width',f2((B.w+20)*(it.anim==='write'||!it.anim?E.inOutCubic(p):1)))},noDraw:true}}};
// SHAPES — circle/rect/line/path/polygon/ellipse (stage coords) with draw-on
SM.items.shape={build(it){const g=el('g');const c=col(it.color||'a1'),sw=(it.width||4)*SU,fill=it.fill?col(it.fill):'none';const k=it.shape||'circle';let e;
  const st={stroke:c,'stroke-width':f2(sw),fill,'fill-opacity':it.fillOpacity??(it.fill?.9:undefined),'stroke-linecap':'round','stroke-linejoin':'round','stroke-dasharray':it.dashed?`${12*SU} ${10*SU}`:undefined};
  if(k==='circle')e=el('circle',{cx:it.x,cy:it.y,r:it.r||60,...st},g);else if(k==='ellipse')e=el('ellipse',{cx:it.x,cy:it.y,rx:it.rx||80,ry:it.ry||50,...st},g);
  else if(k==='rect')e=el('rect',{x:it.x,y:it.y,width:it.w||200,height:it.h||120,rx:it.rx||0,...st},g);else if(k==='line')e=el('line',{x1:it.x1,y1:it.y1,x2:it.x2,y2:it.y2,...st},g);
  else if(k==='polygon')e=el('polygon',{points:(it.points||[]).map(p=>p.join(',')).join(' '),...st},g);else e=el('path',{d:it.d||'',...st},g);
  if(!it.dashed)dr(e);if(it.glow)g.setAttribute('filter','url(#glow)');return {g}}};
// ARROW — straight or curved (curve: -1..1), optional label, flowing dots
SM.items.arrow={build(it){const g=el('g');const [x1,y1]=it.from,[x2,y2]=it.to,c=col(it.color||'ink'),cv=it.curve||0;const mx=(x1+x2)/2-(y2-y1)*cv*.5,my=(y1+y2)/2+(x2-x1)*cv*.5;
  const d=`M${x1},${y1} Q${f2(mx)},${f2(my)} ${x2},${y2}`;const p=dr(el('path',{d,fill:'none',stroke:c,'stroke-width':f2((it.width||4)*SU),'stroke-linecap':'round','marker-end':arrowMarker(it.color||'ink'),'marker-start':it.both?arrowMarker(it.color||'ink'):undefined},g));
  if(it.text){const t=textEl(g,it.text,mx,my-16*SU,{size:(it.size||28)*SU,anchor:'middle',color:it.textColor||it.color||'ink'});}
  let fl=null;if(it.flow){fl=flowDots(g,p,{color:it.flowColor||it.color||'a1',n:it.flowN||6,speed:it.flowSpeed||.5,r:6*SU})}
  if(it.glow)g.setAttribute('filter','url(#glowS)');return {g,update(lt,pp){fl&&fl(lt,pp)}}}};
// dots moving along a path (blood, current, energy). Returns update(lt,p)
function flowDots(g,path,{color='a1',n=8,speed=.4,r=6,glow=true,size}={}){let L=null;const dots=[];for(let i=0;i<n;i++)dots.push(el('circle',{r:f2(size||r),fill:col(color),filter:glow?'url(#glowS)':undefined,opacity:0},g));
  return (lt,p)=>{if(L===null){try{L=path.getTotalLength()}catch(e){return}}dots.forEach((d,i)=>{const u=((lt*speed+i/n)%1+1)%1;const pt=path.getPointAtLength(u*L);d.setAttribute('cx',f2(pt.x));d.setAttribute('cy',f2(pt.y));d.setAttribute('opacity',f2(p>=1?Math.sin(Math.PI*u)**.4:0))})}}
// RAW SVG markup (custom shapes from the AI), placed at x,y with scale
SM.items.svg={build(it){const g=el('g',{transform:`translate(${it.x||0} ${it.y||0}) scale(${it.scale||1})`});g.innerHTML=it.markup||'';g.querySelectorAll('path,line,polyline,polygon,circle,ellipse,rect').forEach(e=>{if(e.getAttribute('stroke')&&e.getAttribute('stroke')!=='none')dr(e)});if(it.glow)g.setAttribute('filter','url(#glow)');return {g}}};
// IMAGE — user photo/diagram; labels with x,y in 0..1 of the image; focus ring
SM.items.image={build(it){const box0=boxOf(it);const im=SIMG[it.src];const g=el('g');let iw=im?im.naturalWidth:1600,ih=im?im.naturalHeight:1000;const LB=(it.labels||[]).filter(l=>l&&l.text!=null);const ls=(it.labelSize||28)*SU;
  const mw=LB.length?Math.min(box0[2]*.28,Math.max(...LB.map(l=>tw(String(l.text),ls,600)))+70*SU):0;const box=[box0[0]+mw,box0[1],box0[2]-2*mw,box0[3]];const F=fitIn(box,iw,ih);const w=iw*F.s,h=ih*F.s;
  const cid='ic'+Math.round(rnd(box[0]*3+box[1])*1e9);const cp=el('clipPath',{id:cid},DEFS);el('rect',{x:F.x,y:F.y,width:w,height:h,rx:f2(18*SU)},cp);
  if(im)el('image',{href:im.src,x:F.x,y:F.y,width:w,height:h,'clip-path':`url(#${cid})`,preserveAspectRatio:'xMidYMid slice'},g);
  else{panel(g,F.x,F.y,w,h,{});textEl(g,'IMAGE · '+(it.src||'?'),F.x+w/2,F.y+h/2,{anchor:'middle',color:'dim',size:28*SU,fam:MONOF})}
  el('rect',{x:F.x,y:F.y,width:w,height:h,rx:f2(18*SU),fill:'none',stroke:TH.faint,'stroke-width':2},g);
  if(SGRID){for(let k=1;k<10;k++){el('line',{x1:F.x+w*k/10,y1:F.y,x2:F.x+w*k/10,y2:F.y+h,stroke:'#0f0','stroke-opacity':.5},g);el('line',{x1:F.x,y1:F.y+h*k/10,x2:F.x+w,y2:F.y+h*k/10,stroke:'#0f0','stroke-opacity':.5},g);
    textEl(g,(k/10).toFixed(1),F.x+w*k/10+4,F.y+18,{size:16,color:'#0f0'});textEl(g,(k/10).toFixed(1),F.x+4,F.y+h*k/10-4,{size:16,color:'#0f0'})}}
  const anchors={};LB.forEach((l,i)=>{anchors[l.id||('p'+i)]=[F.x+l.x*w,F.y+l.y*h]});
  const upL=LB.length?placeLabels(g,LB.map(l=>({x:F.x+l.x*w,y:F.y+l.y*h,text:String(l.text),color:l.color,at:l.at,side:l.side})),[F.x,F.y,w,h],{size:it.labelSize||28,start:0}):null;
  const rings=(it.focus?[].concat(it.focus):[]).map(fc=>{const c=el('circle',{cx:F.x+fc.x*w,cy:F.y+fc.y*h,r:(fc.r||.08)*Math.min(w,h),fill:'none',stroke:col(fc.color||'a2'),'stroke-width':f2(5*SU),filter:'url(#glowS)',opacity:0},g);return [c,fc]});
  return {g,anchors,frame:[F.x,F.y,w,h],len:()=>LB.length?(it.dur||1)+.3+LB.length*.35+.9:(it.dur||1),update(lt,p,st){upL&&upL(lt-(it.labelsAt??(st+(it.dur||1)+.3)));rings.forEach(([c,fc])=>{const t0=fc.at??st+1;const q=E.outBack(prog(lt,t0,t0+.6));c.setAttribute('opacity',f2(prog(lt,t0,t0+.2)*(.75+.25*Math.sin(lt*5))));c.setAttribute('stroke-dasharray','');c.style.transformOrigin=`${c.getAttribute('cx')}px ${c.getAttribute('cy')}px`;c.style.transform=`scale(${f2(Math.max(.01,q))})`})}}}};
// HIGHLIGHT ring / pulse at a point
SM.items.pulse={build(it){const g=el('g');const c=col(it.color||'a2');const rs=[0,1,2].map(()=>el('circle',{cx:it.x,cy:it.y,r:1,fill:'none',stroke:c,'stroke-width':f2(4*SU)},g));el('circle',{cx:it.x,cy:it.y,r:(it.r||14)*SU*.6,fill:c,filter:'url(#glowS)'},g);
  return {g,update(lt){rs.forEach((r,i)=>{const u=((lt*.7+i/3)%1);r.setAttribute('r',f2((it.r||14)*SU*(1+u*4)));r.setAttribute('opacity',f2((1-u)*.8))})}}}};
/* ---------- callout labels (auto columns, leader lines, no overlaps) ---------- */
function placeLabels(parent,list,frame,{size=28,color,start=0,gap=.35,side='auto',lineColor}={}){
  // list: [{x,y,text}] anchor points (stage coords). frame: [x,y,w,h] of the drawing → labels go to left/right columns outside it
  size*=SU;const [fx,fy,fw,fh]=frame,cxm=fx+fw/2;const L=[],R=[];
  const amb=[];list.forEach(o=>{const s=o.side||side;if(s==='auto'&&Math.abs(o.x-cxm)<fw*.08){amb.push(o);return}((s==='left')||(s==='auto'&&o.x<cxm)?L:R).push(o)});amb.forEach(o=>(L.length<=R.length?L:R).push(o));
  const out=[];const pad=36*SU;
  [[L,'left'],[R,'right']].forEach(([arr,sd])=>{arr.sort((a,b)=>a.y-b.y);const n=arr.length;if(!n)return;const minG=size*1.9;
    let ys=arr.map(o=>o.y);for(let k=1;k<n;k++)ys[k]=Math.max(ys[k],ys[k-1]+minG);const over=ys[n-1]-(fy+fh);if(over>0)ys=ys.map(v=>v-over);for(let k=n-2;k>=0;k--)ys[k]=Math.min(ys[k],ys[k+1]-minG);
    const lx=sd==='left'?fx-pad:fx+fw+pad;
    arr.forEach((o,k)=>{const g=el('g',{},parent);const ty=ys[k];const c=col(o.color||color||'a2');
      const ln=dr(el('path',{d:`M${f2(o.x)},${f2(o.y)} L${f2(sd==='left'?lx+12*SU:lx-12*SU)},${f2(ty)} L${f2(lx)},${f2(ty)}`,fill:'none',stroke:col(lineColor||o.color||color||'a2'),'stroke-width':f2(2.5*SU),'stroke-opacity':.9},g));
      const dot=el('circle',{cx:f2(o.x),cy:f2(o.y),r:f2(7*SU),fill:c,stroke:TH.bg,'stroke-width':f2(2.5*SU)},g);
      const room=sd==='left'?lx-10*SU-40*SU:SW-40*SU-(lx+10*SU);let ls=size;const tw0=tw(String(o.text).replace(/\*/g,''),ls,600);if(tw0>room){ls=Math.max(16*SU,size*room/tw0);if(tw(String(o.text),ls,600)>room+1)SERR_WARN.push(`label '${o.text}' is cut at the frame edge: use a smaller drawing area or a shorter label`)}
      const tx=textEl(g,o.text,sd==='left'?lx-10*SU:lx+10*SU,ty+size*.35,{size:ls,anchor:sd==='left'?'end':'start',color:o.textColor||'ink',weight:600});
      const t0=o.at??start+k*gap+(sd==='right'?.15:0);const rec={g,ln,dot,tx,t0,ty,move(ny){if(Math.abs(ny-ty)<.5)return;tx.setAttribute('y',f2(ny+size*.35));ln.setAttribute('d',`M${f2(o.x)},${f2(o.y)} L${f2(sd==='left'?lx+12*SU:lx-12*SU)},${f2(ny)} L${f2(lx)},${f2(ny)}`)}};out.push(rec);LBLREC.push(rec)})});
  return lt=>out.forEach(({ln,dot,tx,t0})=>{const p=prog(lt,t0,t0+.7);ln.style.strokeDashoffset=f2(1-E.inOutCubic(p));dot.setAttribute('opacity',f2(prog(lt,t0,t0+.15)));
    tx.setAttribute('opacity',f2(prog(lt,t0+.35,t0+.75)));tx.setAttribute('transform',`translate(${f2((1-E.outCubic(prog(lt,t0+.35,t0+.8)))*(tx.getAttribute('text-anchor')==='end'?14:-14)*SU)} 0)`)})}
// single callout pointing to (x,y)
SM.items.label={build(it){const g=el('g');const lx=it.tx??it.x+(it.dx??160)*SU,ly=it.ty??it.y+(it.dy??-80)*SU,c=col(it.color||'a2'),size=(it.size||30)*SU;const right=lx>=it.x;
  const ln=dr(el('path',{d:`M${it.x},${it.y} L${f2(lx)},${f2(ly)} L${f2(lx+(right?30:-30)*SU)},${f2(ly)}`,fill:'none',stroke:c,'stroke-width':f2(2.5*SU)},g));el('circle',{cx:it.x,cy:it.y,r:f2(7*SU),fill:c,stroke:TH.bg,'stroke-width':f2(2.5*SU)},g);
  const tx=textEl(g,it.text||'',lx+(right?40:-40)*SU,ly+size*.35,{size,anchor:right?'start':'end',color:it.textColor||'ink'});
  if(it.guard!==false)LBLREC.push({tx,ty:ly,move(ny){tx.setAttribute('y',f2(ny+size*.35));ln.setAttribute('d',`M${it.x},${it.y} L${f2(lx)},${f2(ny)} L${f2(lx+(right?30:-30)*SU)},${f2(ny)}`)}});return {g}}};
/* ---------- PRESET WRAPPER: design in local units → fit into area, auto labels ---------- */
const NAMES={
 uz:{membrane:'Hujayra membranasi',nucleus:'Yadro',nucleolus:'Yadrocha',mitochondria:'Mitoxondriya',er:'Endoplazmatik to‘r',golgi:'Golji apparati',ribosome:'Ribosoma',lysosome:'Lizosoma',cytoplasm:'Sitoplazma',wall:'Hujayra devori',vacuole:'Vakuola',chloroplast:'Xloroplast',
  backbone:'Qand-fosfat zanjiri',basepair:'Azot asoslari jufti',dendrite:'Dendrit',soma:'Neyron tanasi',axon:'Akson',myelin:'Miyelin qobiq',node:'Ranvye bo‘g‘imi',terminal:'Akson uchi (sinaps)',
  capsid:'Kapsid',spike:'Oqsil tikanlari',genome:'Genom (RNK)',envelope:'Qobiq',head:'Gidrofil bosh',tail:'Gidrofob dum',channel:'Kanal oqsil',molecule:'Molekula',outside:'Hujayra tashqarisi',inside:'Hujayra ichi',
  enzyme:'Ferment',activesite:'Faol markaz',substrate:'Substrat',products:'Mahsulotlar',complex:'Ferment-substrat kompleksi',
  ra:'O‘ng bo‘lmacha',la:'Chap bo‘lmacha',rv:'O‘ng qorincha',lv:'Chap qorincha',aorta:'Aorta',pulmonary:'O‘pka arteriyasi',vena:'Kovak venalar',pveins:'O‘pka venalari',septum:'To‘siq',valve:'Klapan',
  nucleusAtom:'Yadro',electron:'Elektron',shell:'Elektron qavat',centrosome:'Sentrosoma',spindle:'Bo‘linish duki',chromosome:'Xromosoma',
  interphase:'Interfaza',prophase:'Profaza',metaphase:'Metafaza',anaphase:'Anafaza',telophase:'Telofaza',cytokinesis:'Sitokinez'},
 en:{membrane:'Cell membrane',nucleus:'Nucleus',nucleolus:'Nucleolus',mitochondria:'Mitochondrion',er:'Endoplasmic reticulum',golgi:'Golgi apparatus',ribosome:'Ribosome',lysosome:'Lysosome',cytoplasm:'Cytoplasm',wall:'Cell wall',vacuole:'Vacuole',chloroplast:'Chloroplast',
  backbone:'Sugar-phosphate backbone',basepair:'Base pair',dendrite:'Dendrite',soma:'Cell body',axon:'Axon',myelin:'Myelin sheath',node:'Node of Ranvier',terminal:'Axon terminal',
  capsid:'Capsid',spike:'Spike proteins',genome:'Genome (RNA)',envelope:'Envelope',head:'Hydrophilic head',tail:'Hydrophobic tail',channel:'Channel protein',molecule:'Molecule',outside:'Outside the cell',inside:'Inside the cell',
  enzyme:'Enzyme',activesite:'Active site',substrate:'Substrate',products:'Products',complex:'Enzyme–substrate complex',
  ra:'Right atrium',la:'Left atrium',rv:'Right ventricle',lv:'Left ventricle',aorta:'Aorta',pulmonary:'Pulmonary artery',vena:'Venae cavae',pveins:'Pulmonary veins',septum:'Septum',valve:'Valve',
  nucleusAtom:'Nucleus',electron:'Electron',shell:'Electron shell',centrosome:'Centrosome',spindle:'Spindle',chromosome:'Chromosome',
  interphase:'Interphase',prophase:'Prophase',metaphase:'Metaphase',anaphase:'Anaphase',telophase:'Telophase',cytokinesis:'Cytokinesis'},
 ru:{membrane:'Клеточная мембрана',nucleus:'Ядро',nucleolus:'Ядрышко',mitochondria:'Митохондрия',er:'Эндоплазматическая сеть',golgi:'Аппарат Гольджи',ribosome:'Рибосома',lysosome:'Лизосома',cytoplasm:'Цитоплазма',wall:'Клеточная стенка',vacuole:'Вакуоль',chloroplast:'Хлоропласт',
  backbone:'Сахарофосфатный остов',basepair:'Пара оснований',dendrite:'Дендрит',soma:'Тело нейрона',axon:'Аксон',myelin:'Миелиновая оболочка',node:'Перехват Ранвье',terminal:'Окончание аксона',
  capsid:'Капсид',spike:'Шипы',genome:'Геном (РНК)',envelope:'Оболочка',head:'Гидрофильная головка',tail:'Гидрофобный хвост',channel:'Белок-канал',molecule:'Молекула',outside:'Снаружи клетки',inside:'Внутри клетки',
  enzyme:'Фермент',activesite:'Активный центр',substrate:'Субстрат',products:'Продукты',complex:'Фермент-субстратный комплекс',
  ra:'Правое предсердие',la:'Левое предсердие',rv:'Правый желудочек',lv:'Левый желудочек',aorta:'Аорта',pulmonary:'Лёгочная артерия',vena:'Полые вены',pveins:'Лёгочные вены',septum:'Перегородка',valve:'Клапан',
  nucleusAtom:'Ядро',electron:'Электрон',shell:'Электронный слой',centrosome:'Центросома',spindle:'Веретено деления',chromosome:'Хромосома',
  interphase:'Интерфаза',prophase:'Профаза',metaphase:'Метафаза',anaphase:'Анафаза',telophase:'Телофаза',cytokinesis:'Цитокинез'}};
const nm=k=>(NAMES[LANG]||NAMES.uz)[k]||(NAMES.en[k])||k;
function preset(dw,dh,make){return {build(it,ctx){const box=boxOf(it);let labs=it.labels===true?null:(it.labels||[]);const g=el('g');
  let inner=box;const P0={};
  const wantAll=it.labels===true;
  const tmp=el('g');const P=make(tmp,it,P0);const names=wantAll?Object.keys(P.anchors||{}):labs.map(l=>typeof l==='string'?l:l.part);
  const texts=names.map((n,i)=>{const l=wantAll?n:labs[i];return typeof l==='object'&&l.text?l.text:nm(n)});
  if(names.length){const ls=(it.labelSize||28)*SU,mw=Math.min(box[2]*.3,Math.max(...texts.map(t=>tw(t,ls,600)))+70*SU);inner=[box[0]+mw,box[1],box[2]-2*mw,box[3]]}
  const F=fitIn(inner,dw,dh);const gi=el('g',{transform:`translate(${f2(F.x)} ${f2(F.y)}) scale(${f2(F.s)})`},g);while(tmp.firstChild)gi.appendChild(tmp.firstChild);
  let upL=null;if(names.length){const list=names.map((n,i)=>{const a=(P.anchors||{})[n];if(!a){SERR.push(`labels: part "${n}" not found in ${it.type}. Parts: ${Object.keys(P.anchors||{}).join(', ')}`);return null}
      const l=wantAll?{}:(typeof labs[i]==='object'?labs[i]:{});return {x:F.x+a[0]*F.s,y:F.y+a[1]*F.s,text:texts[i],color:l.color,at:l.at}}).filter(Boolean);
    upL=placeLabels(g,list,[F.x,F.y,dw*F.s,dh*F.s],{size:it.labelSize||28,start:0})}
  const anchorsStage={};for(const k in (P.anchors||{}))anchorsStage[k]=[F.x+P.anchors[k][0]*F.s,F.y+P.anchors[k][1]*F.s];
  if(it.glow)gi.setAttribute('filter','url(#glowS)');
  return {g,anchors:anchorsStage,frame:[F.x,F.y,dw*F.s,dh*F.s],len:()=>Math.max(P.len?P.len():0,names.length?(it.labelsAt!=null?it.labelsAt-0:(it.dur||1.4)+.2)+names.length*.35+.9:(it.dur||1.4)),update(lt,p,st,d){P.update&&P.update(lt,p,st,d);upL&&upL(lt-(it.labelsAt??(st+(it.dur||1.4)+.2)))}}}}}
// organic closed blob path through n points (deterministic wobble)
function blob(cx,cy,rx,ry,{n=28,amp=.04,seed=1,t=0,speed=1}={}){const pts=[];for(let i=0;i<n;i++){const a=i/n*TAU,r=1+amp*(Math.sin(a*3+seed+t*speed)*.6+Math.sin(a*5+seed*2-t*speed*.7)*.4);pts.push([cx+Math.cos(a)*rx*r,cy+Math.sin(a)*ry*r])}return smoothClosed(pts)}
function smoothClosed(P){const n=P.length;let d=`M${f2(P[0][0])},${f2(P[0][1])}`;for(let i=0;i<n;i++){const p0=P[(i-1+n)%n],p1=P[i],p2=P[(i+1)%n],p3=P[(i+2)%n];
  d+=` C${f2(p1[0]+(p2[0]-p0[0])/6)},${f2(p1[1]+(p2[1]-p0[1])/6)} ${f2(p2[0]-(p3[0]-p1[0])/6)},${f2(p2[1]-(p3[1]-p1[1])/6)} ${f2(p2[0])},${f2(p2[1])}`}return d+'Z'}
function smoothOpen(P){let d=`M${f2(P[0][0])},${f2(P[0][1])}`;for(let i=0;i<P.length-1;i++){const p0=P[Math.max(0,i-1)],p1=P[i],p2=P[i+1],p3=P[Math.min(P.length-1,i+2)];
  d+=` C${f2(p1[0]+(p2[0]-p0[0])/6)},${f2(p1[1]+(p2[1]-p0[1])/6)} ${f2(p2[0]-(p3[0]-p1[0])/6)},${f2(p2[1]-(p3[1]-p1[1])/6)} ${f2(p2[0])},${f2(p2[1])}`}return d}
function wavy(x1,y1,x2,y2,amp,waves){const pts=[];const n=Math.max(8,waves*8);for(let i=0;i<=n;i++){const u=i/n,x=lerp(x1,x2,u),y=lerp(y1,y2,u);const nx=-(y2-y1),ny=x2-x1,L=Math.hypot(nx,ny)||1;const o=Math.sin(u*waves*TAU)*amp;pts.push([x+nx/L*o,y+ny/L*o])}return smoothOpen(pts)}
/* ---------- CELL (animal | plant) ---------- */
SM.items.cell=preset(1000,720,(g,it)=>{const plant=it.kind==='plant';const A={};const sw=5;
  let wall=null;if(plant){wall=dr(el('rect',{x:30,y:30,width:940,height:660,rx:60,fill:'none',stroke:TH.a4,'stroke-width':14,'stroke-opacity':.85},g));A.wall=[60,120]}
  const cyto=el('path',{fill:gradient([[0,'a1',.16],[1,'a1',.05]],{radial:true}),stroke:TH.a1,'stroke-width':sw,filter:'url(#glowS)'},g);dr(cyto);A.membrane=plant?[110,640]:[120,520];A.cytoplasm=[300,560];
  const parts=el('g',{},g);
  let vac=null;if(plant){vac=el('path',{d:blob(560,380,270,190,{seed:3,amp:.05}),fill:TH.a1,'fill-opacity':.12,stroke:TH.a1,'stroke-width':3,'stroke-opacity':.7},parts);dr(vac);A.vacuole=[600,380]}
  const nx=plant?240:440,ny=plant?230:340,nr=plant?95:125;
  const nuc=dr(el('circle',{cx:nx,cy:ny,r:nr,fill:TH.a5,'fill-opacity':.2,stroke:TH.a5,'stroke-width':5},parts));el('circle',{cx:nx+nr*.25,cy:ny-nr*.15,r:nr*.32,fill:TH.a5,'fill-opacity':.6},parts);
  for(let k=0;k<5;k++)dr(el('path',{d:wavy(nx-nr*.6,ny-nr*.4+k*nr*.22,nx+nr*.3,ny-nr*.3+k*nr*.22,6,3),fill:'none',stroke:TH.a5,'stroke-width':2.5,'stroke-opacity':.55},parts));
  for(let k=0;k<10;k++){const a=k/10*TAU;el('circle',{cx:nx+Math.cos(a)*nr,cy:ny+Math.sin(a)*nr,r:4,fill:TH.bg},parts)}
  A.nucleus=[nx-nr*.7,ny+nr*.55];A.nucleolus=[nx+nr*.25,ny-nr*.15];
  const mito=(x,y,rot,s=1)=>{const m=el('g',{transform:`translate(${x} ${y}) rotate(${rot}) scale(${s})`},parts);dr(el('rect',{x:-75,y:-32,width:150,height:64,rx:32,fill:TH.a2,'fill-opacity':.18,stroke:TH.a2,'stroke-width':4},m));
    dr(el('path',{d:'M-58,0 '+[...Array(7)].map((_,i)=>`L${-50+i*16},${i%2?-20:20}`).join(' ')+' L58,0',fill:'none',stroke:TH.a2,'stroke-width':3,'stroke-linejoin':'round'},m));return m};
  const ms=plant?[[800,170,20],[160,540,-30],[860,560,40]]:[[700,190,25],[230,520,-20],[760,520,60]];ms.forEach(([x,y,r])=>mito(x,y,r,plant?.8:1));A.mitochondria=[ms[1][0],ms[1][1]+30];
  if(!plant||true){const ex=plant?380:600,ey=plant?240:330;for(let k=0;k<4;k++)dr(el('path',{d:wavy(ex+k*26,ey-150+k*10,ex+40+k*26,ey+140-k*10,10,4),fill:'none',stroke:TH.a4,'stroke-width':4,'stroke-opacity':.8},parts));A.er=[ex+40,ey-120];
    for(let k=0;k<26;k++){const u=seeded(k,1),v=seeded(k,2);el('circle',{cx:ex-10+u*120,cy:ey-140+v*280,r:4,fill:TH.ink,'fill-opacity':.7},parts)}A.ribosome=[ex+100,ey+120]}
  const gx=plant?720:770,gy=plant?560:380;for(let k=0;k<4;k++)dr(el('path',{d:`M${gx-70+k*6},${gy-40+k*24} Q${gx},${gy-70+k*24} ${gx+70-k*6},${gy-40+k*24}`,fill:'none',stroke:TH.a3,'stroke-width':12,'stroke-linecap':'round','stroke-opacity':.85},parts));
  for(let k=0;k<3;k++)el('circle',{cx:gx+90+k*20,cy:gy-30+k*30,r:9,fill:TH.a3,'fill-opacity':.7},parts);A.golgi=[gx,gy+50];
  if(!plant){[[300,170,30],[560,600,24],[880,330,20]].forEach(([x,y,r])=>{dr(el('circle',{cx:x,cy:y,r,fill:TH.a3,'fill-opacity':.25,stroke:TH.a3,'stroke-width':3},parts));for(let k=0;k<4;k++)el('circle',{cx:x+Math.cos(k*1.7)*r*.45,cy:y+Math.sin(k*1.7)*r*.45,r:3,fill:TH.a3},parts)});A.lysosome=[300,170]}
  if(plant){[[180,400,-20],[880,300,70],[420,600,10],[700,120,-10]].forEach(([x,y,r])=>{const c=el('g',{transform:`translate(${x} ${y}) rotate(${r})`},parts);dr(el('ellipse',{rx:70,ry:34,fill:TH.a4,'fill-opacity':.35,stroke:TH.a4,'stroke-width':4},c));
    for(let k=-2;k<=2;k++)for(let j=0;j<3;j++)el('rect',{x:k*24-8,y:-18+j*12,width:16,height:8,rx:3,fill:TH.a4,'fill-opacity':.9},c)});A.chloroplast=[180,430]}
  const dots=[...Array(28)].map((_,i)=>el('circle',{r:2.5,fill:TH.ink,'fill-opacity':.35},parts));
  return {anchors:A,update(lt){cyto.setAttribute('d',plant?blob(500,360,440,310,{amp:.02,seed:2,t:lt,speed:.8,n:32}):blob(500,360,470,330,{amp:.035,seed:1,t:lt,speed:.9,n:32}));
    dots.forEach((d,i)=>{const bx=200+seeded(i,3)*600,by=150+seeded(i,4)*420;d.setAttribute('cx',f2(bx+Math.sin(lt*.4+i)*18));d.setAttribute('cy',f2(by+Math.cos(lt*.33+i*1.3)*14))})}}});
/* ---------- DNA double helix (rotating, optional unzip) ---------- */
SM.items.dna=preset(1400,420,(g,it)=>{const N=it.pairs||22,cy=210,amp=150,L=1300,x0=50;const s1=el('path',{fill:'none',stroke:TH.a1,'stroke-width':10,'stroke-linecap':'round'},g),s2=el('path',{fill:'none',stroke:TH.a5,'stroke-width':10,'stroke-linecap':'round'},g);
  const PAIRS=['AT','TA','GC','CG'],PC={A:TH.a3,T:TH.a2,G:TH.a4,C:TH.a1};const rungs=[...Array(N)].map((_,i)=>{const pr=PAIRS[Math.floor(seeded(i,7)*4)];const r1=el('line',{stroke:PC[pr[0]],'stroke-width':9,'stroke-linecap':'round'},g),r2=el('line',{stroke:PC[pr[1]],'stroke-width':9,'stroke-linecap':'round'},g);
    const t1=it.letters?el('text',{'font-size':22,'font-family':MONOF,'font-weight':700,fill:TH.ink,'text-anchor':'middle'},g):null,t2=it.letters?el('text',{'font-size':22,'font-family':MONOF,'font-weight':700,fill:TH.ink,'text-anchor':'middle'},g):null;if(t1){t1.textContent=pr[0];t2.textContent=pr[1]}return [r1,r2,t1,t2]});
  g.appendChild(s1);g.appendChild(s2);
  const A={backbone:[x0+L*.18,cy-amp],basepair:[x0+L*.62,cy]};
  return {anchors:A,update(lt,p,st,d){const ph=lt*(it.speed??1.2),k=TAU*(it.turns||3)/L;const unz=it.unzip?E.inOutCubic(prog(lt,st+(it.unzipAt??1.5),st+(it.unzipAt??1.5)+3)):0;
    const sep=x=>unz*Math.max(0,(x-x0)/L-(1-unz))*0+unz*smoothstep(x0+L*(1-unz),x0+L*(1-unz)+200,x)*120;
    const pts1=[],pts2=[];for(let x=x0;x<=x0+L;x+=20){const a=Math.sin(x*k+ph);pts1.push([x,cy+a*amp-sep(x)]);pts2.push([x,cy-a*amp+sep(x)])}
    s1.setAttribute('d',smoothOpen(pts1));s2.setAttribute('d',smoothOpen(pts2));
    rungs.forEach(([r1,r2,t1,t2],i)=>{const x=x0+30+i*(L-60)/(N-1),a=Math.sin(x*k+ph),y1=cy+a*amp-sep(x),y2=cy-a*amp+sep(x),ym=(y1+y2)/2,depth=Math.cos(x*k+ph),gap=unz*smoothstep(x0+L*(1-unz),x0+L*(1-unz)+200,x)*60;
      at(r1,{x1:f2(x),y1:f2(y1),x2:f2(x),y2:f2(ym-gap),'stroke-opacity':f2(.45+.55*(depth*.5+.5))});at(r2,{x1:f2(x),y1:f2(ym+gap),x2:f2(x),y2:f2(y2),'stroke-opacity':f2(.45+.55*(depth*.5+.5))});
      if(t1){at(t1,{x:f2(x),y:f2((y1+ym)/2+8)});at(t2,{x:f2(x),y:f2((y2+ym)/2+8)})}})}}});
/* ---------- NEURON with travelling action potential ---------- */
SM.items.neuron=preset(1500,520,(g,it)=>{const A={};const sx=230,sy=260;
  const branch=(x,y,a,len,depth,seed)=>{if(depth<=0)return;const x2=x+Math.cos(a)*len,y2=y+Math.sin(a)*len;dr(el('path',{d:`M${f2(x)},${f2(y)} Q${f2((x+x2)/2+Math.sin(seed)*14)},${f2((y+y2)/2+Math.cos(seed)*14)} ${f2(x2)},${f2(y2)}`,fill:'none',stroke:TH.a1,'stroke-width':depth*3.2,'stroke-linecap':'round'},g));
    branch(x2,y2,a-.45+seeded(seed,1)*.2,len*.68,depth-1,seed*1.7+1);branch(x2,y2,a+.45-seeded(seed,2)*.2,len*.68,depth-1,seed*2.3+2)};
  [-2.4,-2.9,2.5,3.1,-1.9,2.0].forEach((a,i)=>branch(sx+Math.cos(a)*60,sy+Math.sin(a)*60,a,95,3,i+1));A.dendrite=[sx-215,sy-90];
  const ax=`M${sx+60},${sy} C${sx+300},${sy-40} ${sx+600},${sy+40} ${sx+900},${sy} S${sx+1080},${sy-20} ${sx+1120},${sy}`;const axon=dr(el('path',{d:ax,fill:'none',stroke:TH.a1,'stroke-width':12,'stroke-linecap':'round'},g));
  const soma=el('path',{d:blob(sx,sy,85,75,{seed:4,amp:.08}),fill:TH.a1,'fill-opacity':.25,stroke:TH.a1,'stroke-width':6},g);dr(soma);el('circle',{cx:sx-5,cy:sy,r:30,fill:TH.a5,'fill-opacity':.7},g);A.soma=[sx+40,sy+60];A.nucleus=[sx-5,sy];
  const AL=axon.getTotalLength();const my=[];for(let k=0;k<6;k++){const u0=.12+k*.13,p0=axon.getPointAtLength(u0*AL),p1=axon.getPointAtLength((u0+.1)*AL);const ang=Math.atan2(p1.y-p0.y,p1.x-p0.x)*180/Math.PI,len=Math.hypot(p1.x-p0.x,p1.y-p0.y);
    my.push(el('rect',{x:-len/2,y:-20,width:len,height:40,rx:20,fill:TH.a2,'fill-opacity':.35,stroke:TH.a2,'stroke-width':3,transform:`translate(${f2((p0.x+p1.x)/2)} ${f2((p0.y+p1.y)/2)}) rotate(${f2(ang)})`},g))}
  A.myelin=[axon.getPointAtLength(.31*AL).x,axon.getPointAtLength(.31*AL).y-20];A.node=[axon.getPointAtLength(.475*AL).x,axon.getPointAtLength(.475*AL).y+10];A.axon=[axon.getPointAtLength(.95*AL).x-60,axon.getPointAtLength(.95*AL).y];
  const ex=sx+1120,ey=sy;[-.7,-.25,.25,.7].forEach((a,i)=>{const x2=ex+Math.cos(a)*110,y2=ey+Math.sin(a)*110;dr(el('path',{d:`M${ex},${ey} Q${ex+50},${f2(ey+Math.sin(a)*30)} ${f2(x2)},${f2(y2)}`,fill:'none',stroke:TH.a1,'stroke-width':6,'stroke-linecap':'round'},g));el('circle',{cx:f2(x2+8),cy:f2(y2),r:16,fill:TH.a4,'fill-opacity':.6,stroke:TH.a4,'stroke-width':3},g)});A.terminal=[ex+120,ey+80];
  const imp=el('circle',{r:22,fill:TH.a2,filter:'url(#glow2)',opacity:0},g),imp2=el('circle',{r:10,fill:'#fff',opacity:0},g);
  return {anchors:A,update(lt,p,st){if(it.impulse===false)return;const per=it.period||2.2,u=((lt-st-1.2)/per)%1;if(lt-st<1.2){imp.setAttribute('opacity',0);imp2.setAttribute('opacity',0);return}
    const pt=axon.getPointAtLength(E.inOutCubic(u)*AL);[imp,imp2].forEach(c=>{c.setAttribute('cx',f2(pt.x));c.setAttribute('cy',f2(pt.y));c.setAttribute('opacity',f2(Math.sin(Math.PI*u)**.3))});
    my.forEach((m,k)=>{const uk=.17+k*.13;m.setAttribute('fill-opacity',f2(.35+.5*Math.exp(-(((u-uk)*12)**2))))})}}});
/* ---------- MITOSIS — phases animate in sequence ---------- */
SM.items.mitosis=preset(1100,760,(g,it)=>{const PH=it.phases||['interphase','prophase','metaphase','anaphase','telophase','cytokinesis'];const cx=550,cy=360;
  const memb=el('path',{fill:TH.a1,'fill-opacity':.1,stroke:TH.a1,'stroke-width':6,filter:'url(#glowS)'},g);const memb2=el('path',{fill:TH.a1,'fill-opacity':.1,stroke:TH.a1,'stroke-width':6,opacity:0},g);
  const env=el('circle',{cx,cy,r:190,fill:TH.a5,'fill-opacity':.08,stroke:TH.a5,'stroke-width':4},g),envL=el('circle',{r:120,fill:TH.a5,'fill-opacity':.08,stroke:TH.a5,'stroke-width':4,opacity:0},g),envR=el('circle',{r:120,fill:TH.a5,'fill-opacity':.08,stroke:TH.a5,'stroke-width':4,opacity:0},g);
  const chromatin=[...Array(7)].map((_,k)=>el('path',{d:wavy(cx-130,cy-110+k*36,cx+130,cy-100+k*36,10,4),fill:'none',stroke:TH.a3,'stroke-width':3,'stroke-opacity':.6},g));
  const spG=el('g',{},g);const cs=[el('circle',{r:14,fill:TH.a2,filter:'url(#glowS)'},g),el('circle',{r:14,fill:TH.a2,filter:'url(#glowS)'},g)];
  const CH=[{c:TH.a3,p:[cx-60,cy-60]},{c:TH.a3,p:[cx+70,cy+40]},{c:TH.a1==='#FFFFFF'?TH.a4:TH.a4,p:[cx-20,cy+80]},{c:TH.a4,p:[cx+40,cy-90]}];
  const rods=[];CH.forEach((ch,i)=>{for(let s=0;s<2;s++)rods.push({el:el('line',{stroke:ch.c,'stroke-width':18,'stroke-linecap':'round'},g),ch:i,s})});
  const fib=rods.map(()=>el('line',{stroke:TH.ink,'stroke-opacity':.35,'stroke-width':2},spG));
  const lbl=el('text',{x:cx,y:735,'text-anchor':'middle','font-size':44,'font-weight':800,'font-family':FONT,fill:TH.a2},g);
  const A={membrane:[cx-420,cy+120],nucleus:[cx+160,cy-110],chromosome:[cx-60,cy-60],centrosome:[cx-330,cy],spindle:[cx-200,cy-60]};
  return {anchors:A,len:()=>.6+PH.length*(it.phaseDur||2.2)+.3,update(lt,p,st,d){const span=it.phaseDur||Math.max(.8,(d-st-1)/PH.length),u=clamp((lt-st-.6)/span,0,PH.length-1e-3),i=Math.floor(u),fr=E.inOutCubic(smoothstep(.55,1,u-i));
    const val=(name)=>{const idx=n=>PH.indexOf(n);return null};const key=PH[i],nxt=PH[Math.min(i+1,PH.length-1)];
    const S={interphase:{env:1,chr:0,pole:0,sep:0,pinch:0,spin:0,newEnv:0,crom:1},prophase:{env:.5,chr:1,pole:.6,sep:0,pinch:0,spin:.3,newEnv:0,crom:0},metaphase:{env:0,chr:1,pole:1,sep:0,pinch:0,spin:1,newEnv:0,crom:0,align:1},
      anaphase:{env:0,chr:1,pole:1,sep:1,pinch:.15,spin:1,newEnv:0,crom:0,align:1},telophase:{env:0,chr:1,pole:1,sep:1.15,pinch:.7,spin:.2,newEnv:1,crom:0,align:1},cytokinesis:{env:0,chr:1,pole:1,sep:1.2,pinch:1,spin:0,newEnv:1,crom:0,align:1}};
    const a=S[key]||S.interphase,b=S[nxt]||a,v=k=>lerp(a[k]||0,b[k]||0,fr);
    const pinch=v('pinch'),rx=420+pinch*60;const pts=[];for(let k=0;k<48;k++){const th=k/48*TAU;let x=Math.cos(th)*rx,y=Math.sin(th)*290;y*=1-pinch*.92*Math.exp(-((x/150)**2));pts.push([cx+x,cy+y])}
    if(pinch<.97){memb.setAttribute('d',smoothClosed(pts));memb.setAttribute('opacity',1);memb2.setAttribute('opacity',0)}else{memb.setAttribute('d',blob(cx-250,cy,220,270,{amp:.03,seed:1,t:lt}));memb2.setAttribute('d',blob(cx+250,cy,220,270,{amp:.03,seed:2,t:lt}));memb2.setAttribute('opacity',1)}
    env.setAttribute('opacity',f2(v('env')));env.setAttribute('stroke-dasharray',v('env')<.95?'14 12':'');chromatin.forEach(c=>c.setAttribute('opacity',f2(v('crom'))));
    const pl=v('pole'),px=330*pl;at(cs[0],{cx:f2(cx-20-px),cy:f2(cy-60*(1-pl))});at(cs[1],{cx:f2(cx+20+px),cy:f2(cy-60*(1-pl))});
    const al=v('align'),sp=v('sep'),chr=v('chr');
    rods.forEach((r,k)=>{const ch=CH[r.ch];const tx=lerp(ch.p[0],cx,al),ty=lerp(ch.p[1],cy-150+r.ch*100,al);const dir=r.s?1:-1;const ox=dir*sp*260;
      const ang=lerp(dir*.45,0,clamp(sp*2)),len=48;const x=tx+ox,y=ty;const cxr=Math.sin(ang)*len,cyr=Math.cos(ang)*len;
      at(r.el,{x1:f2(x-cxr),y1:f2(y-cyr),x2:f2(x+cxr),y2:f2(y+cyr),opacity:f2(chr),'stroke-width':f2(lerp(6,18,chr))});
      at(fib[k],{x1:cs[r.s].getAttribute('cx'),y1:cs[r.s].getAttribute('cy'),x2:f2(x),y2:f2(y),opacity:f2(v('spin'))})});
    const ne=v('newEnv');[envL,envR].forEach((e,k)=>at(e,{cx:f2(cx+(k?1:-1)*(260*sp)),cy:f2(cy-0),opacity:f2(ne),r:f2(110+ne*20)}));
    lbl.textContent=nm(fr>.5?nxt:key)}}});
/* ---------- VIRUS (icosahedral capsid + spikes) ---------- */
SM.items.virus=preset(700,700,(g,it)=>{const cx=350,cy=350,R=200;const rot=el('g',{},g);
  for(let k=0;k<14;k++){const a=k/14*TAU;const x1=cx+Math.cos(a)*R,y1=cy+Math.sin(a)*R,x2=cx+Math.cos(a)*(R+90),y2=cy+Math.sin(a)*(R+90);dr(el('line',{x1,y1,x2,y2,stroke:TH.a3,'stroke-width':8,'stroke-linecap':'round'},rot));el('circle',{cx:x2,cy:y2,r:20,fill:TH.a3,'fill-opacity':.85},rot)}
  dr(el('circle',{cx,cy,r:R+12,fill:'none',stroke:TH.a2,'stroke-width':6,'stroke-dasharray':'2 0'},rot));
  const hex=[...Array(6)].map((_,k)=>[cx+Math.cos(k/6*TAU)*R,cy+Math.sin(k/6*TAU)*R]);dr(el('polygon',{points:hex.map(p=>p.join(',')).join(' '),fill:TH.a1,'fill-opacity':.15,stroke:TH.a1,'stroke-width':6},rot));
  hex.forEach(p=>dr(el('line',{x1:cx,y1:cy,x2:p[0],y2:p[1],stroke:TH.a1,'stroke-width':3,'stroke-opacity':.6},rot)));
  dr(el('path',{d:wavy(cx-110,cy-40,cx+110,cy+40,22,5),fill:'none',stroke:TH.a4,'stroke-width':6},rot));
  return {anchors:{spike:[cx+Math.cos(0)*(R+90),cy],capsid:[cx-R*.7,cy+R*.55],genome:[cx-60,cy-20],envelope:[cx,cy-R-12]},update(lt){rot.setAttribute('transform',`rotate(${f2(lt*8)} ${cx} ${cy})`)}}});
/* ---------- MEMBRANE bilayer + channel + diffusion ---------- */
SM.items.membrane=preset(1500,640,(g,it)=>{const y0=230,y1=410,N=26,chX=750;const A={};
  for(let k=0;k<N;k++){const x=60+k*54;if(Math.abs(x-chX)<70)continue;[[y0,1],[y1,-1]].forEach(([y,d])=>{el('circle',{cx:x,cy:y,r:20,fill:TH.a1,'fill-opacity':.85},g);
    dr(el('path',{d:wavy(x-6,y+d*20,x-6,y+d*85,4,2),fill:'none',stroke:TH.a2,'stroke-width':4},g));dr(el('path',{d:wavy(x+6,y+d*20,x+6,y+d*85,4,2),fill:'none',stroke:TH.a2,'stroke-width':4},g))})}
  dr(el('rect',{x:chX-60,y:y0-50,width:44,height:y1-y0+100,rx:22,fill:TH.a5,'fill-opacity':.5,stroke:TH.a5,'stroke-width':4},g));dr(el('rect',{x:chX+16,y:y0-50,width:44,height:y1-y0+100,rx:22,fill:TH.a5,'fill-opacity':.5,stroke:TH.a5,'stroke-width':4},g));
  A.head=[60+3*54,y0];A.tail=[60+8*54-6,(y0+y1)/2];A.channel=[chX+38,y0-40];A.outside=[1300,90];A.inside=[1300,560];
  el('text',{x:1440,y:60,'text-anchor':'end','font-size':30,'font-family':FONT,'font-weight':700,fill:TH.dim},g).textContent='';
  const M=[...Array(it.molecules||30)].map(()=>el('circle',{r:12,fill:TH.a4,filter:'url(#glowS)'},g));A.molecule=[300,110];
  return {anchors:A,update(lt,p,st){M.forEach((m,i)=>{const T=6+seeded(i,1)*3,ph=seeded(i,2),u=((lt-st)/T+ph)%1;const through=i%3===0;let x,y;
    const hx=80+seeded(i,3)*1340,hy=40+seeded(i,4)*130;
    if(through){if(u<.45){x=lerp(hx,chX,E.inOutCubic(u/.45));y=lerp(hy,y0-70,E.inOutCubic(u/.45))}else if(u<.6){x=chX;y=lerp(y0-70,y1+70,(u-.45)/.15)}else{const q=(u-.6)/.4;x=lerp(chX,80+seeded(i,5)*1340,E.outCubic(q));y=lerp(y1+70,470+seeded(i,6)*130,E.outCubic(q))}}
    else{x=hx+Math.sin(lt*.7+i)*30;y=hy+Math.cos(lt*.5+i*1.3)*20}
    at(m,{cx:f2(x),cy:f2(y),opacity:f2(prog(lt,st+.5,st+1))})})}}});
/* ---------- ENZYME lock & key (mechanism over time) ---------- */
SM.items.enzyme=preset(1400,640,(g,it)=>{const ex=520,ey=380;
  const enz=dr(el('path',{d:`M${ex-260},${ey+160} Q${ex-300},${ey-60} ${ex-150},${ey-150} L${ex-60},${ey-150} L${ex-60},${ey-80} Q${ex},${ey-30} ${ex+60},${ey-80} L${ex+60},${ey-150} L${ex+150},${ey-150} Q${ex+300},${ey-60} ${ex+260},${ey+160} Z`,fill:TH.a1,'fill-opacity':.22,stroke:TH.a1,'stroke-width':6,'stroke-linejoin':'round'},g));
  const sub=el('g',{},g);const pa=el('path',{d:'M-60,0 L-60,-70 L0,-70 L0,-20 Q-30,10 -60,0Z',fill:TH.a2,'fill-opacity':.8,stroke:TH.a2,'stroke-width':4},sub),pb=el('path',{d:'M0,-70 L60,-70 L60,0 Q30,10 0,-20Z',fill:TH.a3,'fill-opacity':.8,stroke:TH.a3,'stroke-width':4},sub);
  const glowc=el('ellipse',{cx:ex,cy:ey-110,rx:120,ry:70,fill:TH.a2,filter:'url(#blur24)',opacity:0},g);g.appendChild(sub);
  return {anchors:{enzyme:[ex-200,ey+100],activesite:[ex,ey-60],substrate:[ex+460,ey-300],products:[ex+380,ey-200]},update(lt,p,st,d){const c=it.cycle||Math.max(4,d-st-1),u=((lt-st-.8)/c);const q=clamp(u,0,1);
    const inP=E.inOutCubic(prog(q,0,.35)),bind=prog(q,.35,.6),out=E.inOutCubic(prog(q,.6,1));const sx=lerp(ex+460,ex,inP),sy=lerp(ey-330,ey-75,inP);
    sub.setAttribute('transform',`translate(${f2(sx)} ${f2(sy)})`);glowc.setAttribute('opacity',f2(Math.sin(Math.PI*bind)*.6));
    pa.setAttribute('transform',`translate(${f2(-out*360)} ${f2(-out*260)}) rotate(${f2(-out*30)})`);pb.setAttribute('transform',`translate(${f2(out*360)} ${f2(-out*260)}) rotate(${f2(out*30)})`);
    enz.setAttribute('transform',`translate(0 ${f2(Math.sin(Math.PI*bind)*-6)})`)}}});
/* ---------- ATOM (Bohr model, orbiting electrons) ---------- */
const ELEM={H:1,He:2,Li:3,Be:4,B:5,C:6,N:7,O:8,F:9,Ne:10,Na:11,Mg:12,Al:13,Si:14,P:15,S:16,Cl:17,Ar:18,K:19,Ca:20};
function shellsOf(Z){const cap=[2,8,8,18,18,32],out=[];let r=Z;for(const c of cap){if(r<=0)break;out.push(Math.min(c,r));r-=c}return out}
SM.items.atom=preset(800,800,(g,it)=>{const cx=400,cy=400;const Z=it.Z||ELEM[it.symbol]||6;const sh=it.shells||shellsOf(Z);const N=Math.round(it.neutrons??Z*1.1);
  const rmax=360,r0=110;const rings=sh.map((_,k)=>r0+(rmax-r0)*(sh.length===1?.5:k/(sh.length-1)));
  rings.forEach(r=>dr(el('circle',{cx,cy,r,fill:'none',stroke:TH.a1,'stroke-width':3,'stroke-opacity':.45},g)));
  const nuc=el('g',{filter:'url(#glowS)'},g);const n=Math.min(Z+N,40);for(let k=0;k<n;k++){const a=k*2.399,rr=Math.sqrt(k+.5)*10.5;el('circle',{cx:cx+Math.cos(a)*rr,cy:cy+Math.sin(a)*rr,r:13,fill:k%2?TH.a3:TH.dim,stroke:TH.bg,'stroke-width':2},nuc)}
  if(it.symbol){const t=el('text',{x:cx,y:cy+22,'text-anchor':'middle','font-size':62,'font-weight':800,'font-family':FONT,fill:'#fff',stroke:TH.bg,'stroke-width':6,'paint-order':'stroke'},g);t.textContent=it.symbol}
  const es=[];sh.forEach((c,k)=>{for(let j=0;j<c;j++)es.push({k,j,c,e:el('circle',{r:14,fill:TH.a2,filter:'url(#glowS)'},g)})});
  return {anchors:{nucleusAtom:[cx-60,cy+50],electron:[cx+rings[rings.length-1],cy],shell:[cx,cy-rings[Math.max(0,rings.length-2)]]},update(lt){es.forEach(o=>{const w=(it.speed??1)*1.6/(o.k+1)**.8,a=o.j/o.c*TAU+lt*w+o.k*.7;at(o.e,{cx:f2(cx+Math.cos(a)*rings[o.k]),cy:f2(cy+Math.sin(a)*rings[o.k])})})}}});
/* ---------- MOLECULES (ball & stick, CPK colours) ---------- */
const CPK={H:['#F2F4F8',26],C:['#8A93A6',38],O:['#FF4D4D',36],N:['#4D7CFF',36],Cl:['#3DDC84',42],Na:['#B07CFF',44],S:['#FFD23F',42],P:['#FF9A3D',42],F:['#9BE564',30],K:['#8F5CFF',48],Ca:['#7A8B99',46]};
const MOL={H2:{a:[['H',-.5,0],['H',.5,0]],b:[[0,1,1]]},O2:{a:[['O',-.6,0],['O',.6,0]],b:[[0,1,2]]},N2:{a:[['N',-.6,0],['N',.6,0]],b:[[0,1,3]]},Cl2:{a:[['Cl',-.7,0],['Cl',.7,0]],b:[[0,1,1]]},HCl:{a:[['H',-.6,0],['Cl',.6,0]],b:[[0,1,1]]},
  H2O:{a:[['O',0,0],['H',-.8,.6],['H',.8,.6]],b:[[0,1,1],[0,2,1]]},CO2:{a:[['C',0,0],['O',-1.2,0],['O',1.2,0]],b:[[0,1,2],[0,2,2]]},CO:{a:[['C',-.6,0],['O',.6,0]],b:[[0,1,3]]},
  NH3:{a:[['N',0,0],['H',-.85,.55],['H',.85,.55],['H',0,-1]],b:[[0,1,1],[0,2,1],[0,3,1]]},CH4:{a:[['C',0,0],['H',-.9,-.9],['H',.9,-.9],['H',-.9,.9],['H',.9,.9]],b:[[0,1,1],[0,2,1],[0,3,1],[0,4,1]]},
  C2H5OH:{a:[['C',-1.2,0],['C',0,0],['O',1.2,0],['H',1.8,.7],['H',-1.6,-.9],['H',-1.9,.6],['H',-1.0,1],['H',0,-1.05],['H',.1,1.05]],b:[[0,1,1],[1,2,1],[2,3,1],[0,4,1],[0,5,1],[0,6,1],[1,7,1],[1,8,1]]},
  C6H6:{a:[...[...Array(6)].map((_,k)=>['C',Math.cos(k/6*TAU+Math.PI/6)*1.2,Math.sin(k/6*TAU+Math.PI/6)*1.2]),...[...Array(6)].map((_,k)=>['H',Math.cos(k/6*TAU+Math.PI/6)*2.2,Math.sin(k/6*TAU+Math.PI/6)*2.2])],b:[...[...Array(6)].map((_,k)=>[k,(k+1)%6,k%2?1:2]),...[...Array(6)].map((_,k)=>[k,k+6,1])]},
  NaCl:{a:(()=>{const o=[];for(let i=0;i<4;i++)for(let j=0;j<4;j++)o.push([(i+j)%2?'Cl':'Na',(i-1.5)*1.1,(j-1.5)*1.1]);return o})(),b:(()=>{const o=[];for(let i=0;i<4;i++)for(let j=0;j<4;j++){if(i<3)o.push([i*4+j,(i+1)*4+j,0]);if(j<3)o.push([i*4+j,i*4+j+1,0])}return o})()},
  H2SO4:{a:[['S',0,0],['O',0,-1.2],['O',0,1.2],['O',-1.2,0],['O',1.2,0],['H',-2,0],['H',2,0]],b:[[0,1,2],[0,2,2],[0,3,1],[0,4,1],[3,5,1],[4,6,1]]}};
function drawMol(g,spec,U=100,{letters=true}={}){const m=typeof spec==='string'?MOL[spec]:spec;if(!m){SERR.push('molecule: unknown preset "'+spec+'". Presets: '+Object.keys(MOL).join(', '));return {w:100,h:100,atoms:[]}}
  const A=m.a||m.atoms,B=m.b||m.bonds||[];const xs=A.map(a=>a[1]),ys=A.map(a=>a[2]);const pad=.9;const minx=Math.min(...xs)-pad,miny=Math.min(...ys)-pad;const w=(Math.max(...xs)+pad-minx)*U,h=(Math.max(...ys)+pad-miny)*U;
  const P=A.map(a=>[(a[1]-minx)*U,(a[2]-miny)*U]);const bg=el('g',{},g);
  B.forEach(([i,j,o])=>{const [x1,y1]=P[i],[x2,y2]=P[j];const L=Math.hypot(x2-x1,y2-y1)||1,nx=-(y2-y1)/L,ny=(x2-x1)/L;const offs=o===0?[0]:o===2?[-7,7]:o===3?[-11,0,11]:[0];
    offs.forEach(d=>dr(el('line',{x1:f2(x1+nx*d),y1:f2(y1+ny*d),x2:f2(x2+nx*d),y2:f2(y2+ny*d),stroke:o===0?TH.dim:TH.ink,'stroke-opacity':o===0?.4:.8,'stroke-width':o===0?3:6,'stroke-linecap':'round','stroke-dasharray':o===0?'6 8':undefined},bg)))});
  const atoms=A.map((a,k)=>{const [c,r]=CPK[a[0]]||['#ccc',36];const gr=gradient([[0,'#ffffff',.95],[.35,c,1],[1,c,1]],{radial:true});const ag=el('g',{},g);
    el('circle',{cx:f2(P[k][0]),cy:f2(P[k][1]),r:r*U/100,fill:gr,stroke:TH.bg,'stroke-width':3},ag);
    if(letters){const t=el('text',{x:f2(P[k][0]),y:f2(P[k][1]+r*U/100*.36),'text-anchor':'middle','font-size':f2(r*U/100*.95),'font-weight':800,'font-family':FONT,fill:a[0]==='H'?'#1b1b22':'#fff'},ag);t.textContent=a[0]}return ag});
  return {w,h,P,atoms,A}}
SM.items.molecule={build(it){const box=boxOf(it);const m=typeof it.preset==='string'||!it.atoms?it.preset||'H2O':{a:it.atoms,b:it.bonds};const g=el('g');const probe=el('g');const M=drawMol(probe,m,100,it);
  let inner=box;const names=(it.labels||[]);if(names.length){const mw=Math.min(box[2]*.28,Math.max(...names.map(l=>tw(l.text||'',28*SU)))+70*SU);inner=[box[0]+mw,box[1],box[2]-2*mw,box[3]]}
  const F=fitIn(inner,M.w,M.h,10*SU);const gi=el('g',{transform:`translate(${f2(F.x)} ${f2(F.y)}) scale(${f2(Math.min(F.s,it.maxScale||2.2))})`},g);const sc=Math.min(F.s,it.maxScale||2.2);
  const ox=F.cx-M.w*sc/2,oy=F.cy-M.h*sc/2;gi.setAttribute('transform',`translate(${f2(ox)} ${f2(oy)}) scale(${f2(sc)})`);while(probe.firstChild)gi.appendChild(probe.firstChild);
  let upL=null;if(names.length){upL=placeLabels(g,names.map(l=>({x:ox+M.P[l.atom||0][0]*sc,y:oy+M.P[l.atom||0][1]*sc,text:l.text,color:l.color})),[ox,oy,M.w*sc,M.h*sc],{start:0})}
  if(it.formula){const fb=mathBox(it.formula,48*SU,{chem:true});const fg=el('g',{transform:`translate(${f2(F.cx-fb.w/2)} ${f2(Math.min(box[1]+box[3]-10*SU,oy+M.h*sc+70*SU))})`},g);fb.draw(fg,0,0,TH.ink)}
  return {g,update(lt,p,st){const w=it.wobble===false?0:1;gi.setAttribute('transform',`translate(${f2(ox)} ${f2(oy)}) rotate(${f2(w*Math.sin(lt*.8)*3)} ${f2(M.w/2)} ${f2(M.h/2)}) scale(${f2(sc)})`);upL&&upL(lt-st-(it.dur||1)-.2)}}}};
/* ---------- REACTION: reactant molecules collide → products appear ---------- */
SM.items.reaction={build(it){const box=boxOf(it);const g=el('g');const [x,y,w,h]=box;const L=[].concat(it.left||[]),R=[].concat(it.right||[]);
  const parse=s=>{const m=String(s).match(/^(\d*)\s*(.+)$/);return {n:+m[1]||1,f:m[2]}};const Lp=L.map(parse),Rp=R.map(parse);
  const U=it.molSize?it.molSize*SU:Math.min(105*SU,h*.2);const side=(list,x0,x1)=>{const items=[];list.forEach(o=>{for(let k=0;k<Math.min(o.n,3);k++)items.push(o.f)});const gs=items.map(f=>{const gg=el('g',{},g);const M=drawMol(gg,f,U);return {gg,M}});
    const tot=gs.reduce((a,b)=>a+b.M.w,0)+(gs.length-1)*30*SU;const sc=Math.min(1,(x1-x0)/tot);let cx=(x0+x1)/2-tot*sc/2;gs.forEach(o=>{o.x=cx;o.y=y+h*.42-o.M.h*sc/2;o.sc=sc;cx+=(o.M.w+30*SU)*sc});return gs};
  const GL=side(Lp,x,x+w*.4),GR=side(Rp,x+w*.6,x+w);const ar=dr(el('path',{d:`M${f2(x+w*.43)},${f2(y+h*.42)} L${f2(x+w*.57)},${f2(y+h*.42)}`,stroke:TH.ink,'stroke-width':f2(5*SU),'marker-end':arrowMarker('ink'),fill:'none'},g));
  const eq=it.equation||`${L.join(' + ')} \\rightarrow ${R.join(' + ')}`.replace(/([A-Z][a-z]?)(\d+)/g,'$1_{$2}');const fb=mathBox(eq,(it.size||64)*SU,{chem:true});const fg=el('g',{transform:`translate(${f2(x+w/2-fb.w/2)} ${f2(y+h*.86)})`},g);fb.draw(fg,0,0,TH.ink);
  if(it.condition){const t=textEl(g,it.condition,x+w/2,y+h*.42-26*SU,{anchor:'middle',size:26*SU,color:'a2'})}
  const flash=el('circle',{cx:x+w/2,cy:y+h*.42,r:120*SU,fill:TH.a2,filter:'url(#blur24)',opacity:0},g);
  return {g,update(lt,p,st){const t1=st+.8,t2=t1+1.2;GL.forEach((o,i)=>{const q=E.inCubic(prog(lt,t1,t2)),cxm=x+w/2-o.M.w*o.sc/2;const sh=Math.sin(lt*30+i)*3*SU*prog(lt,t1-.3,t1);
      o.gg.setAttribute('transform',`translate(${f2(lerp(o.x,cxm,q)+sh)} ${f2(o.y)}) scale(${f2(o.sc*(1-q*.4))})`);o.gg.setAttribute('opacity',f2(1-prog(lt,t2-.3,t2)*(it.keep?0:.0)-0))});
    GL.forEach(o=>{if(lt<t2){o.gg.setAttribute('opacity',1);return}const q2=E.outCubic(prog(lt,t2+.5,t2+1.3));if(it.keep===false||q2<=0){o.gg.setAttribute('opacity',0);return}o.gg.setAttribute('transform',`translate(${f2(o.x)} ${f2(o.y)}) scale(${f2(o.sc)})`);o.gg.setAttribute('opacity',f2(.35*q2))});flash.setAttribute('opacity',f2(Math.max(0,1-Math.abs(lt-t2)/.35)*.8));
    GR.forEach((o,i)=>{const q=E.outBack(prog(lt,t2+i*.12,t2+.6+i*.12));o.gg.setAttribute('transform',`translate(${f2(o.x)} ${f2(o.y+(1-q)*30*SU)}) scale(${f2(o.sc*Math.max(.001,q))})`);o.gg.setAttribute('opacity',f2(prog(lt,t2+i*.12,t2+.2+i*.12)))});
    ar.style.strokeDashoffset=f2(1-E.inOutCubic(prog(lt,st,st+.8)))},noDraw:true}}};
/* ---------- HEART (schematic, 4 chambers, blood flow, beating) ---------- */
SM.items.heart=preset(900,900,(g,it)=>{const B=TH.a1==='#FFFFFF'?'#7FB8FF':'#4D8DFF',Rr=TH.a3;
  const vessel=(d,c,w)=>dr(el('path',{d,fill:'none',stroke:c,'stroke-width':w,'stroke-linecap':'round','stroke-opacity':.85},g));
  vessel('M255,40 L262,300',B,50);vessel('M200,860 C210,700 230,560 250,440',B,50);vessel('M520,330 C520,150 520,90 610,80 C700,72 735,140 735,330',Rr,56);
  vessel('M390,380 C390,250 410,190 430,160 M430,160 C380,120 300,120 230,150 M430,160 C500,140 560,160 600,190',B,44);vessel('M890,280 L700,320 M890,370 L700,350',Rr,30);
  const hb=el('g',{},g);
  dr(el('path',{d:'M450,840 C230,700 120,560 130,400 C140,260 250,200 340,215 C400,225 440,250 450,285 C470,240 520,215 580,210 C690,205 780,280 775,420 C770,580 650,720 450,840 Z',fill:TH.bg2,'fill-opacity':.9,stroke:TH.a3,'stroke-width':8},hb));
  const ch=(cx,cy,rx,ry,c,sw=4)=>dr(el('ellipse',{cx,cy,rx,ry,fill:c,'fill-opacity':.3,stroke:c,'stroke-width':sw},hb));
  ch(285,345,105,85,B);ch(615,335,105,80,Rr);ch(315,585,115,150,B);ch(595,600,120,175,Rr,14);
  dr(el('path',{d:'M455,290 C475,420 465,600 475,800',fill:'none',stroke:TH.ink,'stroke-opacity':.6,'stroke-width':10,'stroke-linecap':'round'},hb));
  [[290,445],[600,440]].forEach(([x,y])=>{el('path',{d:`M${x-40},${y} Q${x-20},${y+28} ${x},${y} Q${x+20},${y+28} ${x+40},${y}`,fill:'none',stroke:TH.a2,'stroke-width':6,'stroke-linecap':'round'},hb)});
  const pb=el('path',{d:'M262,60 L270,320 C290,420 300,520 330,660 C360,560 380,420 395,330 L410,200 L430,160 L300,130',fill:'none'},g),pr=el('path',{d:'M880,300 L660,330 C620,420 600,520 600,700 C580,560 540,420 525,330 L520,150 C530,90 600,75 660,85 C720,100 735,200 735,330',fill:'none'},g);
  const fb=flowDots(g,pb,{color:B,n:14,speed:.22,size:9}),fr=flowDots(g,pr,{color:Rr,n:14,speed:.22,size:9});
  return {anchors:{ra:[240,330],la:[660,320],rv:[300,640],lv:[620,660],aorta:[615,82],pulmonary:[300,128],vena:[255,90],pveins:[820,330],septum:[468,560],valve:[600,445]},
    update(lt,p,st){const bpm=it.bpm||70,ph=(lt*bpm/60)%1,beat=1+.035*Math.exp(-(((ph-.08)*14)**2))+.02*Math.exp(-(((ph-.3)*14)**2));hb.setAttribute('transform',`translate(450 470) scale(${f2(beat)}) translate(-450 -470)`);
      if(it.flow!==false){fb(lt,lt>st+1?1:0);fr(lt,lt>st+1?1:0)}}}});
/* ---------- BLOOD VESSEL with flowing red cells ---------- */
SM.items.vessel=preset(1500,420,(g,it)=>{dr(el('path',{d:'M0,90 C400,60 1100,120 1500,90',fill:'none',stroke:TH.a3,'stroke-width':14},g));dr(el('path',{d:'M0,330 C400,360 1100,300 1500,330',fill:'none',stroke:TH.a3,'stroke-width':14},g));
  el('rect',{x:0,y:100,width:1500,height:220,fill:TH.a3,'fill-opacity':.08},g);const cells=[...Array(it.cells||22)].map((_,i)=>{const c=el('g',{},g);el('ellipse',{rx:38,ry:24,fill:TH.a3,'fill-opacity':.9},c);el('ellipse',{rx:16,ry:8,fill:'#000','fill-opacity':.25},c);return c});
  return {anchors:{vessel:[750,80]},update(lt){cells.forEach((c,i)=>{const sp=(it.speed||1)*(140+seeded(i,1)*90),x=((seeded(i,2)*1700+lt*sp)%1700)-100,y=150+seeded(i,3)*120+Math.sin(lt*2+i)*8;c.setAttribute('transform',`translate(${f2(x)} ${f2(y)}) rotate(${f2(Math.sin(lt+i)*25)})`)})}}});
/* ---------- PHYSICS: deterministic simulations (RK4 / analytic), live readouts, graphs, custom objects ---------- */
function rk4(f,y,t,dt){const k1=f(t,y),k2=f(t+dt/2,y.map((v,i)=>v+k1[i]*dt/2)),k3=f(t+dt/2,y.map((v,i)=>v+k2[i]*dt/2)),k4=f(t+dt,y.map((v,i)=>v+k3[i]*dt));return y.map((v,i)=>v+dt/6*(k1[i]+2*k2[i]+2*k3[i]+k4[i]))}
function simulate(f,y0,T,dt=1/240){const out=[y0.slice()];let y=y0.slice();for(let t=0;t<T;t+=dt){y=rk4(f,y,t,dt);out.push(y.slice())}return {at(t){const i=clamp(t/dt,0,out.length-1),a=Math.floor(i),b=Math.min(a+1,out.length-1),u=i-a;return out[a].map((v,k)=>lerp(v,out[b][k],u))},dt,out}}
function readout(g,x,y,rows,{size=28}={}){size*=SU;const w=Math.max(...rows.map(r=>tw(r[0]+' = 0000.00 '+(r[2]||''),size,600,MONOF)))+40*SU,h=rows.length*size*1.45+30*SU;panel(g,x-w,y,w,h,{});
  const ts=rows.map((r,i)=>{const t=el('text',{x:f2(x-w+20*SU),y:f2(y+24*SU+size*.95+i*size*1.45),'font-size':f2(size),'font-family':MONOF,'font-weight':600,fill:col(r[3]||'ink')},g);return t});
  return vals=>ts.forEach((t,i)=>{const r=rows[i];t.textContent=`${r[0]} = ${typeof vals[i]==='number'?vals[i].toFixed(r[1]??2):vals[i]} ${r[2]||''}`})}
function graphStrip(g,box,{label='',ylabel='',T=10,ymin=-1,ymax=1,color='a1'}={}){const [x,y,w,h]=box;panel(g,x,y,w,h,{r:12});const px=x+70*SU,py=y+20*SU,pw=w-90*SU,ph=h-55*SU;
  el('line',{x1:px,y1:py+ph/2*(ymax>0&&ymin<0?1:0)+(ymin>=0?ph:0),x2:px+pw,y2:py+ph/2*(ymax>0&&ymin<0?1:0)+(ymin>=0?ph:0),stroke:TH.dim,'stroke-width':1.5},g);el('line',{x1:px,y1:py,x2:px,y2:py+ph,stroke:TH.dim,'stroke-width':1.5},g);
  textEl(g,ylabel,px-14*SU,py+16*SU,{size:22*SU,anchor:'end',color:'dim',fam:MONOF});textEl(g,label,px+pw,py+ph+30*SU,{size:22*SU,anchor:'end',color:'dim',fam:MONOF});
  const pl=el('polyline',{fill:'none',stroke:col(color),'stroke-width':f2(3.5*SU),'stroke-linejoin':'round'},g);const dot=el('circle',{r:f2(7*SU),fill:col(color),filter:'url(#glowS)'},g);
  const map=(t,v)=>[px+t/T*pw,py+ph*(1-(v-ymin)/(ymax-ymin))];
  return (fn,t)=>{const pts=[];const n=Math.max(2,Math.floor(Math.min(t,T)/T*200));for(let i=0;i<=n;i++){const tt=Math.min(t,T)*i/n;pts.push(map(tt,fn(tt)).map(f2).join(','))}pl.setAttribute('points',pts.join(' '));const [a,b]=map(Math.min(t,T),fn(Math.min(t,T)));at(dot,{cx:f2(a),cy:f2(b)})}}
function body(g,it,r,color){if(it.object&&SIMG[it.object.src||it.object]){const src=it.object.src||it.object,s=(it.object.size||r*2.4);const im=el('image',{href:SIMG[src].src,width:s,height:s,x:-s/2,y:-s/2},g);return im}
  const gr=gradient([[0,'#ffffff',.9],[.35,color,1],[1,color,1]],{radial:true});return el('circle',{r,fill:gr,filter:'url(#glowS)'},g)}
const splitGraph=(it,box)=>it.graph?[[box[0],box[1],box[2],box[3]*.68],[box[0],box[1]+box[3]*.72,box[2],box[3]*.28]]:[box,null];
const simT=(lt,st,it)=>Math.max(0,(lt-st-(it.delay??.8))*(it.speed||1));
// PENDULUM
SM.items.pendulum={build(it){const g=el('g');const [B,GB]=splitGraph(it,boxOf(it));const L=it.L||1.5,g0=it.g||9.81,c=it.damping||0,th0=(it.angle??30)*Math.PI/180;const T=60;
  const S=simulate((t,[th,w])=>[w,-(g0/L)*Math.sin(th)-c*w],[th0,0],T);const scale=Math.min(B[3]*.78/L,B[2]*.4/(L*Math.sin(Math.min(Math.abs(th0),1.4))+.2));
  const px=B[0]+B[2]/2,py=B[1]+B[3]*.08,Lp=L*scale;el('rect',{x:px-140*SU,y:py-14*SU,width:280*SU,height:14*SU,rx:4,fill:TH.dim},g);
  el('line',{x1:px,y1:py,x2:px,y2:py+Lp*1.05,stroke:TH.dim,'stroke-dasharray':`${8*SU} ${8*SU}`,'stroke-width':2},g);const arc=el('path',{fill:'none',stroke:col('a2'),'stroke-width':f2(3*SU)},g);const thT=textEl(g,'θ',px,py+90*SU,{size:30*SU,color:'a2',fam:MATHF,italic:true});
  const trail=el('polyline',{fill:'none',stroke:col('a1'),'stroke-width':f2(3*SU),'stroke-opacity':.5},g);const rod=el('line',{stroke:TH.ink,'stroke-width':f2(4*SU)},g);const bg=el('g',{},g);body(bg,it,34*SU,col(it.color||'a2'));
  const vA=el('line',{stroke:col('a4'),'stroke-width':f2(5*SU),'marker-end':arrowMarker('a4'),'stroke-linecap':'round'},g);el('circle',{cx:px,cy:py,r:8*SU,fill:TH.ink},g);
  const ro=it.readout!==false?readout(g,B[0]+B[2],B[1],[['θ',1,'°','a2'],['ω',2,'rad/s','a4'],['T',2,'s','a1']]):null;const gr=GB?graphStrip(g,GB,{label:'t, s',ylabel:'θ',T:Math.min(T,it.graphT||10),ymin:-th0*1.1*180/Math.PI,ymax:th0*1.1*180/Math.PI,color:'a2'}):null;
  return {g,update(lt,p,st){const t=simT(lt,st,it);const [th,w]=S.at(t);const bx=px+Math.sin(th)*Lp,by=py+Math.cos(th)*Lp;g.__tk=[bx,by];at(rod,{x1:px,y1:py,x2:f2(bx),y2:f2(by)});bg.setAttribute('transform',`translate(${f2(bx)} ${f2(by)}) rotate(${f2(-th*180/Math.PI)})`);
    const ar=90*SU;arc.setAttribute('d',`M${px},${py+ar} A${ar},${ar} 0 0 ${th>0?0:1} ${f2(px+Math.sin(th)*ar)},${f2(py+Math.cos(th)*ar)}`);at(thT,{x:f2(px+Math.sin(th/2)*(ar+30*SU)-8*SU),y:f2(py+Math.cos(th/2)*(ar+30*SU)+10*SU)});
    const vs=w*Lp*.18;at(vA,{x1:f2(bx),y1:f2(by),x2:f2(bx+Math.cos(th)*vs),y2:f2(by-Math.sin(th)*vs),opacity:Math.abs(vs)>6?1:0});
    const pts=[];for(let k=0;k<40;k++){const tt=t-k*.03;if(tt<0)break;const [a]=S.at(tt);pts.push(f2(px+Math.sin(a)*Lp)+','+f2(py+Math.cos(a)*Lp))}trail.setAttribute('points',pts.join(' '));
    ro&&ro([th*180/Math.PI,w,2*Math.PI*Math.sqrt(L/g0)]);gr&&gr(tt=>S.at(tt)[0]*180/Math.PI,t)},noDraw:true}}};
// SPRING (mass on a spring, horizontal) with energy bars
SM.items.spring={build(it){const g=el('g');const [B,GB]=splitGraph(it,boxOf(it));const k=it.k||20,m=it.m||1,x0=it.x0??.3,c=it.damping||0;const S=simulate((t,[x,v])=>[v,(-k*x-c*v)/m],[x0,0],60);
  const wall=B[0]+40*SU,eqx=B[0]+B[2]*.45,sc=(B[2]*.25)/Math.max(.05,Math.abs(x0)),y=B[1]+B[3]*.45,bs=110*SU;el('rect',{x:wall-30*SU,y:y-120*SU,width:30*SU,height:200*SU,fill:TH.dim},g);el('line',{x1:wall,y1:y+bs/2+4*SU,x2:B[0]+B[2]*.9,y2:y+bs/2+4*SU,stroke:TH.dim,'stroke-width':3},g);
  el('line',{x1:eqx,y1:y-90*SU,x2:eqx,y2:y+80*SU,stroke:TH.dim,'stroke-dasharray':'6 6'},g);textEl(g,'x = 0',eqx,y-100*SU,{size:22*SU,anchor:'middle',color:'dim',fam:MONOF});
  const sp=el('polyline',{fill:'none',stroke:col('a1'),'stroke-width':f2(4*SU),'stroke-linejoin':'round'},g);const blk=el('g',{},g);if(it.object)body(blk,it,bs/2,col('a2'));else{el('rect',{x:-bs/2,y:-bs/2,width:bs,height:bs,rx:12*SU,fill:col('a2'),filter:'url(#glowS)'},blk);textEl(blk,`${m} kg`,0,10*SU,{size:28*SU,anchor:'middle',color:'#111',weight:800})}
  const eb=el('g',{},g);const ebx=B[0]+B[2]*.92,eby=B[1]+B[3]*.2,ebh=B[3]*.55;const keR=el('rect',{x:ebx-70*SU,width:40*SU,fill:col('a3')},eb),peR=el('rect',{x:ebx-20*SU,width:40*SU,fill:col('a1')},eb);textEl(eb,'Eₖ',ebx-50*SU,eby+ebh+32*SU,{size:24*SU,anchor:'middle',color:'a3'});textEl(eb,'Eₚ',ebx,eby+ebh+32*SU,{size:24*SU,anchor:'middle',color:'a1'});
  const ro=it.readout!==false?readout(g,B[0]+B[2]*.8,B[1],[['x',2,'m','a2'],['v',2,'m/s','a4'],['T',2,'s','a1']]):null;const gr=GB?graphStrip(g,GB,{label:'t, s',ylabel:'x',T:it.graphT||10,ymin:-Math.abs(x0)*1.1,ymax:Math.abs(x0)*1.1,color:'a2'}):null;const E0=.5*k*x0*x0;
  return {g,update(lt,p,st){const t=simT(lt,st,it);const [x,v]=S.at(t);const bx=eqx+x*sc;g.__tk=[bx,y];blk.setAttribute('transform',`translate(${f2(bx)} ${f2(y)})`);const n=14,pts=[[wall,y]];const L=bx-bs/2-wall;for(let i=1;i<n;i++)pts.push([wall+L*i/n,y+(i%2?-30:30)*SU]);pts.push([bx-bs/2,y]);sp.setAttribute('points',pts.map(q=>q.map(f2).join(',')).join(' '));
    const ke=.5*m*v*v/E0,pe=.5*k*x*x/E0;at(keR,{y:f2(eby+ebh*(1-ke)),height:f2(ebh*ke)});at(peR,{y:f2(eby+ebh*(1-pe)),height:f2(ebh*pe)});ro&&ro([x,v,2*Math.PI*Math.sqrt(m/k)]);gr&&gr(tt=>S.at(tt)[0],t)},noDraw:true}}};
// PROJECTILE (optional air drag), trace, velocity components, apex & range
SM.items.projectile={build(it){const g=el('g');const B=boxOf(it);const v0=it.v0||20,a=(it.angle??45)*Math.PI/180,g0=it.g||9.81,h0=it.h0||0,kd=it.drag||0;
  const S=simulate((t,[x,y,vx,vy])=>{const v=Math.hypot(vx,vy);return [vx,vy,-kd*v*vx,-g0-kd*v*vy]},[0,h0,v0*Math.cos(a),v0*Math.sin(a)],40,1/480);let tf=0;for(let i=1;i<S.out.length;i++){if(S.out[i][1]<0){tf=i*S.dt;break}}if(!tf)tf=40;
  let R=0,H=h0;for(let i=0;i<tf/S.dt;i++){R=Math.max(R,S.out[i][0]);H=Math.max(H,S.out[i][1])}const sc=Math.min(B[2]*.86/Math.max(R,1),B[3]*.7/Math.max(H,1));const ox=B[0]+B[2]*.06,oy=B[1]+B[3]*.88;const P=(x,y)=>[ox+x*sc,oy-y*sc];
  el('line',{x1:B[0],y1:oy,x2:B[0]+B[2],y2:oy,stroke:TH.dim,'stroke-width':3},g);for(let k=0;k<=10;k++){const gx=ox+R*sc*k/10;el('line',{x1:gx,y1:oy,x2:gx,y2:oy+10*SU,stroke:TH.dim},g)}
  if(h0>0)el('rect',{x:ox-60*SU,y:oy-h0*sc,width:60*SU,height:h0*sc,fill:TH.faint,stroke:TH.dim},g);
  const path=el('polyline',{fill:'none',stroke:col('a1'),'stroke-width':f2(4*SU),'stroke-dasharray':`${2*SU} ${10*SU}`,'stroke-linecap':'round'},g);const ghosts=el('g',{},g);
  const pre=dr(el('polyline',{fill:'none',stroke:TH.faint,'stroke-width':f2(2*SU),points:[...Array(61)].map((_,i)=>P(...S.at(tf*i/60).slice(0,2)).map(f2).join(',')).join(' ')},g));
  const ap=S.out.reduce((b,s)=>s[1]>b[1]?s:b,S.out[0]);const [apx,apy]=P(ap[0],ap[1]);const apG=el('g',{opacity:0},g);el('line',{x1:apx,y1:apy,x2:apx,y2:oy,stroke:col('a2'),'stroke-dasharray':'6 6','stroke-width':2},apG);textEl(apG,`h max = ${H.toFixed(1)} m`,apx+14*SU,apy-16*SU,{size:26*SU,color:'a2',fam:MONOF});
  const rG=el('g',{opacity:0},g);const [rx]=P(R,0);el('line',{x1:ox,y1:oy+34*SU,x2:rx,y2:oy+34*SU,stroke:col('a4'),'stroke-width':3,'marker-end':arrowMarker('a4'),'marker-start':arrowMarker('a4')},rG);textEl(rG,`L = ${R.toFixed(1)} m`,(ox+rx)/2,oy+70*SU,{size:26*SU,anchor:'middle',color:'a4',fam:MONOF});
  const vx=el('line',{stroke:col('a4'),'stroke-width':f2(4*SU),'marker-end':arrowMarker('a4')},g),vy=el('line',{stroke:col('a3'),'stroke-width':f2(4*SU),'marker-end':arrowMarker('a3')},g);const bg=el('g',{},g);body(bg,it,22*SU,col(it.color||'a2'));
  const ro=it.readout!==false?readout(g,B[0]+B[2],B[1],[['t',2,'s','ink'],['x',1,'m','a4'],['y',1,'m','a3'],['v',1,'m/s','a1']]):null;
  return {g,update(lt,p,st){const t=Math.min(simT(lt,st,it),tf);const s=S.at(t);const [bx,by]=P(s[0],Math.max(0,s[1]));g.__tk=[bx,by];bg.setAttribute('transform',`translate(${f2(bx)} ${f2(by)})`);
    const pts=[];const n=Math.max(2,Math.floor(t/tf*120));for(let i=0;i<=n;i++){const q=S.at(t*i/n);pts.push(P(q[0],Math.max(0,q[1])).map(f2).join(','))}path.setAttribute('points',pts.join(' '));
    while(ghosts.childNodes.length<Math.floor(t/(tf/12)))  {const q=S.at(ghosts.childNodes.length*(tf/12));const [gx,gy]=P(q[0],q[1]);el('circle',{cx:f2(gx),cy:f2(gy),r:f2(7*SU),fill:col('a1'),'fill-opacity':.4},ghosts)}
    while(ghosts.childNodes.length>Math.floor(t/(tf/12)))ghosts.lastChild.remove();
    const vs=sc*.35*(it.vectorScale||1);at(vx,{x1:f2(bx),y1:f2(by),x2:f2(bx+s[2]*vs),y2:f2(by),opacity:t<tf?1:0});at(vy,{x1:f2(bx),y1:f2(by),x2:f2(bx),y2:f2(by-s[3]*vs),opacity:t<tf&&Math.abs(s[3])>.5?1:0});
    const tap=ap?S.out.indexOf(ap)*S.dt:0;apG.setAttribute('opacity',f2(prog(t,tap,tap+.3)));rG.setAttribute('opacity',f2(prog(t,tf-.01,tf+.0)));ro&&ro([t,s[0],Math.max(0,s[1]),Math.hypot(s[2],s[3])])},noDraw:true}}};
// COLLISION 1D (elastic e=1 … inelastic e=0)
SM.items.collision={build(it){const g=el('g');const B=boxOf(it);const m1=it.m1||2,m2=it.m2||1,u1=it.v1??3,u2=it.v2??-1,e=it.e??1;const w1=90*SU*Math.cbrt(m1),w2=90*SU*Math.cbrt(m2);
  const v1=((m1-e*m2)*u1+(1+e)*m2*u2)/(m1+m2),v2=((m2-e*m1)*u2+(1+e)*m1*u1)/(m1+m2);const L=10,sc=B[2]/L,x10=2,x20=7;const gap=(x20-x10)*sc-(w1+w2)/2;const tc=gap/((u1-u2)*sc);
  const y=B[1]+B[3]*.6;el('line',{x1:B[0],y1:y,x2:B[0]+B[2],y2:y,stroke:TH.dim,'stroke-width':3},g);
  const mk=(w,c,m)=>{const b=el('g',{},g);el('rect',{x:-w/2,y:-w,width:w,height:w,rx:10*SU,fill:col(c),filter:'url(#glowS)'},b);textEl(b,`${m} kg`,0,-w/2+10*SU,{size:26*SU,anchor:'middle',color:'#111',weight:800});return b};
  const b1=mk(w1,'a2',m1),b2=mk(w2,'a1',m2);const a1=el('line',{stroke:col('a4'),'stroke-width':f2(5*SU),'marker-end':arrowMarker('a4')},g),a2=el('line',{stroke:col('a4'),'stroke-width':f2(5*SU),'marker-end':arrowMarker('a4')},g);
  const fl=el('circle',{r:60*SU,fill:col('a2'),filter:'url(#blur24)',opacity:0},g);
  const ro=readout(g,B[0]+B[2],B[1],[['v₁',2,'m/s','a2'],['v₂',2,'m/s','a1'],['p',2,'kg·m/s','a4'],['Eₖ',2,'J','a3']]);
  return {g,update(lt,p,st){const t=simT(lt,st,it);const before=t<tc;const x1=B[0]+x10*sc+(before?u1*t:u1*tc+v1*(t-tc))*sc,x2=B[0]+x20*sc+(before?u2*t:u2*tc+v2*(t-tc))*sc;
    b1.setAttribute('transform',`translate(${f2(x1)} ${y})`);b2.setAttribute('transform',`translate(${f2(x2)} ${y})`);const va=before?u1:v1,vb=before?u2:v2;
    at(a1,{x1:f2(x1),y1:f2(y-w1-30*SU),x2:f2(x1+va*40*SU),y2:f2(y-w1-30*SU),opacity:Math.abs(va)>.05?1:0});at(a2,{x1:f2(x2),y1:f2(y-w2-30*SU),x2:f2(x2+vb*40*SU),y2:f2(y-w2-30*SU),opacity:Math.abs(vb)>.05?1:0});
    at(fl,{cx:f2(x1+w1/2),cy:f2(y-w1/2),opacity:f2(Math.max(0,1-Math.abs(t-tc)/.25)*.9)});ro([va,vb,m1*va+m2*vb,.5*m1*va*va+.5*m2*vb*vb])},noDraw:true}}};
// ORBIT (Kepler ellipse with equal-area sectors) or circular multi-planet system
function kepler(M,e){let E=M;for(let i=0;i<8;i++)E=E-(E-e*Math.sin(E)-M)/(1-e*Math.cos(E));return E}
SM.items.orbit={build(it){const g=el('g');const B=boxOf(it);const cx=B[0]+B[2]/2,cy=B[1]+B[3]/2;
  const sunR=(it.sunSize||46)*SU;const sun=el('g',{},g);el('circle',{cx:0,cy:0,r:sunR*2.2,fill:col('a2'),filter:'url(#blur24)',opacity:.6},sun);el('circle',{cx:0,cy:0,r:sunR,fill:gradient([[0,'#fff'],[.4,'a2'],[1,'#ff7a1a']],{radial:true})},sun);
  if(it.planets){sun.setAttribute('transform',`translate(${cx} ${cy})`);const maxA=Math.max(...it.planets.map(p=>p.a||1));const sc=Math.min(B[2],B[3])*.46/maxA;
    const ps=it.planets.map((p,i)=>{const r=(p.a||1)*sc;dr(el('ellipse',{cx,cy,rx:r,ry:r*(it.tilt??1),fill:'none',stroke:TH.faint,'stroke-width':2},g));const b=el('g',{},g);if(p.src&&SIMG[p.src])el('image',{href:SIMG[p.src].src,width:(p.size||24)*2*SU,height:(p.size||24)*2*SU,x:-(p.size||24)*SU,y:-(p.size||24)*SU},b);else el('circle',{r:(p.size||14)*SU,fill:col(p.color||['a1','a4','a3','a5'][i%4]),filter:'url(#glowS)'},b);
      if(p.name)textEl(b,p.name,0,-(p.size||14)*SU-12*SU,{size:22*SU,anchor:'middle',color:'dim'});return {b,r,T:p.period||(Math.pow(p.a||1,1.5)*(it.yearSec||6)),ph:seeded(i,9)*TAU}});
    return {g,update(lt){ps.forEach(o=>{const a=o.ph+lt/o.T*TAU;o.b.setAttribute('transform',`translate(${f2(cx+Math.cos(a)*o.r)} ${f2(cy+Math.sin(a)*o.r*(it.tilt??1))})`)})},noDraw:true}}
  const e=it.e??.5,T=it.period||6;const aPx=Math.min(B[2]*.42,B[3]*.46/Math.sqrt(1-e*e)),bPx=aPx*Math.sqrt(1-e*e),cf=aPx*e;const fx=cx+cf;sun.setAttribute('transform',`translate(${fx} ${cy})`);
  dr(el('ellipse',{cx,cy,rx:aPx,ry:bPx,fill:'none',stroke:col('a1'),'stroke-width':f2(3*SU),'stroke-opacity':.7},g));const pos=tt=>{const M=(tt/T)*TAU,E2=kepler(M,e);return [cx+aPx*Math.cos(E2),cy+bPx*Math.sin(E2)]};
  const sectors=el('g',{},g);const N=it.areas?6:0;const sec=[];for(let k=0;k<N;k++){const pts=[[fx,cy]];for(let j=0;j<=12;j++)pts.push(pos((k+j/12/2)*T/N*1));sec.push(el('polygon',{points:pts.map(q=>q.map(f2).join(',')).join(' '),fill:col(k%2?'a1':'a5'),'fill-opacity':.25,opacity:0},sectors))}
  const rv=el('line',{stroke:TH.dim,'stroke-width':2,'stroke-dasharray':'6 6'},g);const vv=el('line',{stroke:col('a4'),'stroke-width':f2(4*SU),'marker-end':arrowMarker('a4')},g);const pb=el('g',{},g);body(pb,it,20*SU,col(it.color||'a1'));
  const ro=it.readout!==false?readout(g,B[0]+B[2],B[1],[['r',2,'a','a5'],['v',2,'v₀','a4']]):null;
  return {g,update(lt,p,st){const t=simT(lt,st,it);const [x,y]=pos(t);g.__tk=[x,y];pb.setAttribute('transform',`translate(${f2(x)} ${f2(y)})`);at(rv,{x1:fx,y1:cy,x2:f2(x),y2:f2(y)});const [x2,y2]=pos(t+.02);const sp=Math.hypot(x2-x,y2-y)/.02;
    at(vv,{x1:f2(x),y1:f2(y),x2:f2(x+(x2-x)/.02*.25),y2:f2(y+(y2-y)/.02*.25)});sec.forEach((s,k)=>s.setAttribute('opacity',f2(prog(t,k*T/N*1+T/N/2*0,(k*T/N)+.4)*(t>=k*T/N?1:0))));
    const r=Math.hypot(x-fx,y-cy)/aPx;ro&&ro([r,sp/(TAU*aPx/T)])},noDraw:true}}};
// WAVES: transverse | longitudinal | standing | superposition
SM.items.wave={build(it){const g=el('g');const B=boxOf(it);const k=it.kind||'transverse';const A=(it.A||1),lam=it.wavelength||1,f=it.f||.5;const x0=B[0]+20*SU,W=B[2]-40*SU,cy=B[1]+B[3]/2,Ap=Math.min(B[3]*.3,130*SU)*A/Math.max(1,A);
  const nW=it.waves||2.5,kk=TAU*nW/W,om=TAU*f;el('line',{x1:x0,y1:cy,x2:x0+W,y2:cy,stroke:TH.faint,'stroke-width':2},g);
  const mkLine=(c,w=5)=>el('path',{fill:'none',stroke:col(c),'stroke-width':f2(w*SU),'stroke-linecap':'round',filter:'url(#glowS)'},g);
  const main=mkLine(it.color||'a1');const l2=k==='superposition'?mkLine('a3',3):null,l3=k==='superposition'?mkLine('a5',3):null;if(l2){l2.setAttribute('stroke-opacity',.6);l3.setAttribute('stroke-opacity',.6);g.appendChild(main)}
  const N=k==='longitudinal'?60:24;const parts=[...Array(N)].map((_,i)=>el(k==='longitudinal'?'line':'circle',k==='longitudinal'?{stroke:col('a2'),'stroke-width':f2(4*SU)}:{r:f2(7*SU),fill:col('a2')},g));
  const nodes=k==='standing'?[...Array(Math.floor(nW*2)+1)].map((_,i)=>el('circle',{cx:f2(x0+i*Math.PI/kk),cy,r:f2(9*SU),fill:'none',stroke:col('a3'),'stroke-width':3},g)):[];
  if(it.annotate!==false&&(k==='transverse')){const lg=el('g',{},g);const xa=x0+W*.1,xb=xa+TAU/kk;el('line',{x1:xa,y1:cy-Ap-40*SU,x2:xb,y2:cy-Ap-40*SU,stroke:col('a4'),'stroke-width':3,'marker-end':arrowMarker('a4'),'marker-start':arrowMarker('a4')},lg);textEl(lg,'λ',(xa+xb)/2,cy-Ap-55*SU,{size:36*SU,anchor:'middle',color:'a4',fam:MATHF,italic:true});
    el('line',{x1:x0+W*.92,y1:cy,x2:x0+W*.92,y2:cy-Ap,stroke:col('a3'),'stroke-width':3,'marker-end':arrowMarker('a3')},lg);textEl(lg,'A',x0+W*.92+14*SU,cy-Ap/2,{size:36*SU,color:'a3',fam:MATHF,italic:true})}
  return {g,update(lt,p,st){const t=lt-st;const rev=E.outCubic(prog(lt,st,st+1.2));const y=(x,tt)=>{const u=x-x0;if(k==='standing')return 2*Ap*.5*Math.sin(kk*u)*Math.cos(om*tt);if(k==='superposition')return Ap*.5*Math.sin(kk*u-om*tt)+Ap*.5*Math.sin(kk*1.5*u+om*.6*tt);return Ap*Math.sin(kk*u-om*tt)};
    const path=fn=>{let d='';for(let x=x0;x<=x0+W*rev;x+=6*SU)d+=(d?'L':'M')+f2(x)+','+f2(cy-fn(x));return d};
    if(k==='longitudinal'){main.setAttribute('d','');parts.forEach((l,i)=>{const xe=x0+i*W/(N-1),dx=Ap*.35*Math.sin(kk*(xe-x0)-om*t);at(l,{x1:f2(xe+dx),y1:f2(cy-60*SU),x2:f2(xe+dx),y2:f2(cy+60*SU),opacity:f2(xe<=x0+W*rev?1:0)})});return}
    main.setAttribute('d',path(x=>y(x,t)));if(l2){l2.setAttribute('d',path(x=>Ap*.5*Math.sin(kk*(x-x0)-om*t)));l3.setAttribute('d',path(x=>Ap*.5*Math.sin(kk*1.5*(x-x0)+om*.6*t)))}
    parts.forEach((c,i)=>{const xe=x0+i*W/(N-1);at(c,{cx:f2(xe),cy:f2(cy-y(xe,t)),opacity:f2(it.particles===false?0:(xe<=x0+W*rev?1:0))})})},noDraw:true}}};
// ELECTRIC FIELD lines from point charges (x,y in 0..1 of the area)
SM.items.field={build(it){const g=el('g');const B=boxOf(it);const Q=(it.charges||[{q:1,x:.35,y:.5},{q:-1,x:.65,y:.5}]).map(c=>({q:c.q,x:B[0]+c.x*B[2],y:B[1]+c.y*B[3]}));
  const Ef=(x,y)=>{let ex=0,ey=0;Q.forEach(c=>{const dx=x-c.x,dy=y-c.y,r2=dx*dx+dy*dy+1,r=Math.sqrt(r2);ex+=c.q*dx/(r2*r);ey+=c.q*dy/(r2*r)});return [ex,ey]};
  const lines=[];const nl=it.lines||16;Q.filter(c=>c.q>0||Q.every(q=>q.q<0)).forEach(c=>{for(let i=0;i<nl;i++){const a=i/nl*TAU;let x=c.x+Math.cos(a)*24*SU,y=c.y+Math.sin(a)*24*SU;const pts=[[x,y]];const sgn=c.q>0?1:-1;
    for(let s=0;s<900;s++){const [ex,ey]=Ef(x,y),m=Math.hypot(ex,ey)||1;x+=sgn*ex/m*6*SU;y+=sgn*ey/m*6*SU;pts.push([x,y]);if(x<B[0]||x>B[0]+B[2]||y<B[1]||y>B[1]+B[3])break;if(Q.some(o=>o!==c&&Math.hypot(x-o.x,y-o.y)<20*SU))break}
    if(pts.length>3)lines.push(pts)}});
  const ls=lines.map(pts=>{const pa=dr(el('path',{d:smoothOpen(pts.filter((_,i)=>i%2===0||i===pts.length-1)),fill:'none',stroke:col('a1'),'stroke-width':f2(2.5*SU),'stroke-opacity':.75},g));return pa});
  const flows=ls.map(pa=>flowDots(g,pa,{color:'a2',n:3,speed:.25,size:5*SU,glow:true}));
  Q.forEach(c=>{const cc=c.q>0?'a3':'a1';el('circle',{cx:c.x,cy:c.y,r:34*SU,fill:col(cc),filter:'url(#glowS)'},g);textEl(g,c.q>0?'+':'−',c.x,c.y+14*SU,{size:46*SU,anchor:'middle',color:'#fff',weight:800})});
  return {g,update(lt,p,st){flows.forEach(f=>f(lt,p))}}}};
// REFRACTION (Snell) with reflection & total internal reflection
SM.items.refraction={build(it){const g=el('g');const B=boxOf(it);const n1=it.n1||1,n2=it.n2||1.5;const cx=B[0]+B[2]/2,cy=B[1]+B[3]/2,R=Math.min(B[2],B[3])*.46;
  el('rect',{x:B[0],y:cy,width:B[2],height:B[3]/2,fill:col('a1'),'fill-opacity':.12},g);el('line',{x1:B[0],y1:cy,x2:B[0]+B[2],y2:cy,stroke:col('a1'),'stroke-width':3},g);el('line',{x1:cx,y1:cy-R,x2:cx,y2:cy+R,stroke:TH.dim,'stroke-dasharray':'8 8','stroke-width':2},g);
  textEl(g,`n₁ = ${n1}`,B[0]+20*SU,cy-24*SU,{size:28*SU,color:'dim',fam:MONOF});textEl(g,`n₂ = ${n2}`,B[0]+20*SU,cy+44*SU,{size:28*SU,color:'a1',fam:MONOF});
  const inc=el('line',{stroke:col('a2'),'stroke-width':f2(6*SU),filter:'url(#glowS)','marker-end':arrowMarker('a2')},g),ref=el('line',{stroke:col('a2'),'stroke-width':f2(3*SU),'stroke-opacity':.5},g),tr=el('line',{stroke:col('a2'),'stroke-width':f2(6*SU),filter:'url(#glowS)'},g);
  const arc1=el('path',{fill:'none',stroke:col('a4'),'stroke-width':3},g),arc2=el('path',{fill:'none',stroke:col('a3'),'stroke-width':3},g);const t1=textEl(g,'',0,0,{size:28*SU,color:'a4',fam:MONOF}),t2=textEl(g,'',0,0,{size:28*SU,color:'a3',fam:MONOF});
  return {g,update(lt,p,st){const sweep=it.sweep?lerp(it.angle??30,it.sweep,E.inOutCubic(prog(lt,st+1.5,st+1.5+(it.sweepDur||5)))):(it.angle??30);const a=sweep*Math.PI/180;
    const sx=cx-Math.sin(a)*R,sy=cy-Math.cos(a)*R;const q=E.outCubic(prog(lt,st,st+.8));at(inc,{x1:f2(sx),y1:f2(sy),x2:f2(lerp(sx,cx,q)),y2:f2(lerp(sy,cy,q))});const s2=n1/n2*Math.sin(a),on=prog(lt,st+.8,st+1.2);
    at(ref,{x1:cx,y1:cy,x2:f2(cx+Math.sin(a)*R*on),y2:f2(cy-Math.cos(a)*R*on),'stroke-opacity':Math.abs(s2)>1?1:.45});
    if(Math.abs(s2)<=1){const b=Math.asin(s2);at(tr,{x1:cx,y1:cy,x2:f2(cx+Math.sin(b)*R*on),y2:f2(cy+Math.cos(b)*R*on),opacity:1});const r2=70*SU;arc2.setAttribute('d',`M${cx},${cy+r2} A${r2},${r2} 0 0 0 ${f2(cx+Math.sin(b)*r2)},${f2(cy+Math.cos(b)*r2)}`);at(t2,{x:f2(cx+Math.sin(b/2)*(r2+20*SU)+6*SU),y:f2(cy+Math.cos(b/2)*(r2+20*SU)+24*SU)});t2.textContent=`θ₂ = ${(b*180/Math.PI).toFixed(1)}°`}
    else{at(tr,{opacity:0});arc2.setAttribute('d','');t2.textContent='to‘liq ichki qaytish';at(t2,{x:f2(cx+30*SU),y:f2(cy+60*SU)})}
    const r1=80*SU;arc1.setAttribute('d',`M${cx},${cy-r1} A${r1},${r1} 0 0 0 ${f2(cx-Math.sin(a)*r1)},${f2(cy-Math.cos(a)*r1)}`);at(t1,{x:f2(cx-Math.sin(a/2)*(r1+30*SU)-150*SU),y:f2(cy-Math.cos(a/2)*(r1+30*SU))});t1.textContent=`θ₁ = ${sweep.toFixed(1)}°`},noDraw:true}}};
// LENS (thin convex/concave lens, parallel rays → focus)
SM.items.lens={build(it){const g=el('g');const B=boxOf(it);const cx=B[0]+B[2]/2,cy=B[1]+B[3]/2,h=B[3]*.38,f=(it.f||.25)*B[2],cv=it.kind!=='concave';
  el('line',{x1:B[0],y1:cy,x2:B[0]+B[2],y2:cy,stroke:TH.dim,'stroke-width':2},g);dr(el('path',{d:cv?`M${cx},${cy-h} Q${cx+60*SU},${cy} ${cx},${cy+h} Q${cx-60*SU},${cy} ${cx},${cy-h}`:`M${cx-30*SU},${cy-h} L${cx+30*SU},${cy-h} Q${cx},${cy} ${cx+30*SU},${cy+h} L${cx-30*SU},${cy+h} Q${cx},${cy} ${cx-30*SU},${cy-h}`,fill:col('a1'),'fill-opacity':.2,stroke:col('a1'),'stroke-width':3},g));
  [[cx+f,'F'],[cx-f,'F′']].forEach(([x,l])=>{el('circle',{cx:x,cy,r:8*SU,fill:col('a3')},g);textEl(g,l,x,cy+40*SU,{size:30*SU,anchor:'middle',color:'a3',fam:MATHF,italic:true})});
  const rays=[...Array(it.rays||5)].map((_,i)=>{const yy=cy-h*.8+i*(h*1.6)/((it.rays||5)-1);const pts=cv?`M${B[0]},${yy} L${cx},${yy} L${B[0]+B[2]},${f2(yy+(cy-yy)/f*(B[0]+B[2]-cx))}`:`M${B[0]},${yy} L${cx},${yy} L${B[0]+B[2]},${f2(yy-(cy-yy)/f*(B[0]+B[2]-cx))}`;
    const pa=dr(el('path',{d:pts,fill:'none',stroke:col('a2'),'stroke-width':f2(3.5*SU),filter:'url(#glowS)'},g));if(!cv)dr(el('path',{d:`M${cx},${yy} L${cx-f},${cy}`,fill:'none',stroke:col('a2'),'stroke-width':2,'stroke-dasharray':'6 8','stroke-opacity':.6},g));return pa});
  return {g}}};
// INCLINED PLANE with friction and force vectors
SM.items.incline={build(it){const g=el('g');const B=boxOf(it);const th=(it.angle??30)*Math.PI/180,mu=it.mu??.2,g0=it.g||9.81,m=it.m||2;const a=Math.max(0,g0*(Math.sin(th)-mu*Math.cos(th)));const Lm=it.length||5;
  const W=B[2]*.8,Hh=Math.min(B[3]*.75,W*Math.tan(th));const W2=Hh/Math.tan(th);const x0=B[0]+B[2]*.08,y0=B[1]+B[3]*.92;dr(el('polygon',{points:`${x0},${y0} ${f2(x0+W2)},${y0} ${x0},${f2(y0-Hh)}`,fill:TH.faint,stroke:TH.dim,'stroke-width':3},g));
  textEl(g,`α = ${(th*180/Math.PI).toFixed(0)}°`,x0+W2-150*SU,y0-20*SU,{size:28*SU,color:'a2',fam:MONOF});const Lpx=Math.hypot(W2,Hh),sc=Lpx/Lm;const bs=90*SU;const ux=Math.cos(th),uy=Math.sin(th);
  const blk=el('g',{},g);if(it.object)body(blk,it,bs/2,col('a2'));else{el('rect',{x:-bs/2,y:-bs,width:bs,height:bs,rx:10*SU,fill:col('a2')},blk);textEl(blk,`${m} kg`,0,-bs/2+10*SU,{size:24*SU,anchor:'middle',color:'#111',weight:800})}
  const vec=(c)=>el('line',{stroke:col(c),'stroke-width':f2(5*SU),'marker-end':arrowMarker(c),'stroke-linecap':'round'},g);const vg=vec('a3'),vn=vec('a1'),vf=vec('a4');const lg=textEl(g,'mg',0,0,{size:26*SU,color:'a3',fam:MATHF,italic:true}),ln=textEl(g,'N',0,0,{size:26*SU,color:'a1',fam:MATHF,italic:true}),lf=textEl(g,'F_ish',0,0,{size:26*SU,color:'a4',fam:MATHF,italic:true});lf.textContent='Fₛ';
  const ro=readout(g,B[0]+B[2],B[1],[['a',2,'m/s²','a2'],['v',2,'m/s','a4'],['s',2,'m','ink']]);
  return {g,update(lt,p,st){const t=simT(lt,st,it);let s=.5*a*t*t;if(s>Lm-.6)s=Lm-.6;const v=Math.sqrt(2*a*s);const px=x0+s*sc*ux,py=y0-Hh+s*sc*uy;g.__tk=[px,py];blk.setAttribute('transform',`translate(${f2(px)} ${f2(py)}) rotate(${f2(th*180/Math.PI)})`);
    const cxb=px+Math.sin(th)*bs/2,cyb=py-Math.cos(th)*bs/2,F=110*SU;at(vg,{x1:f2(cxb),y1:f2(cyb),x2:f2(cxb),y2:f2(cyb+F)});at(lg,{x:f2(cxb+10*SU),y:f2(cyb+F+30*SU)});const nx=Math.sin(th),ny=-Math.cos(th);at(vn,{x1:f2(cxb),y1:f2(cyb),x2:f2(cxb+nx*F*Math.cos(th)),y2:f2(cyb+ny*F*Math.cos(th))});at(ln,{x:f2(cxb+nx*F+10*SU),y:f2(cyb+ny*F)});
    const ff=F*mu*Math.cos(th)*1.6;at(vf,{x1:f2(cxb),y1:f2(cyb),x2:f2(cxb-ux*ff),y2:f2(cyb-uy*ff),opacity:mu>0?1:0});at(lf,{x:f2(cxb-ux*ff-40*SU),y:f2(cyb-uy*ff-10*SU),opacity:mu>0?1:0});ro([a,v,s])},noDraw:true}}};
// SIMPLE CIRCUIT: battery + resistor + bulb, electron flow ∝ current
SM.items.circuit={build(it){const g=el('g');const B=boxOf(it);const V=it.V||9,R=it.R||3,I=V/R;const x=B[0]+B[2]*.15,y=B[1]+B[3]*.15,w=B[2]*.7,h=B[3]*.7;
  const loop=dr(el('rect',{x,y,width:w,height:h,rx:30*SU,fill:'none',stroke:TH.ink,'stroke-width':f2(6*SU)},g));
  el('rect',{x:x-30*SU,y:y+h/2-60*SU,width:60*SU,height:120*SU,fill:TH.bg},g);el('line',{x1:x-40*SU,y1:y+h/2-20*SU,x2:x+40*SU,y2:y+h/2-20*SU,stroke:TH.ink,'stroke-width':f2(8*SU)},g);el('line',{x1:x-22*SU,y1:y+h/2+20*SU,x2:x+22*SU,y2:y+h/2+20*SU,stroke:TH.ink,'stroke-width':f2(8*SU)},g);textEl(g,`${V} V`,x-60*SU,y+h/2+10*SU,{size:30*SU,anchor:'end',color:'a2',fam:MONOF});
  el('rect',{x:x+w/2-90*SU,y:y-20*SU,width:180*SU,height:40*SU,fill:TH.bg},g);el('polyline',{points:[...Array(9)].map((_,i)=>`${f2(x+w/2-90*SU+i*22.5*SU)},${f2(y+(i===0||i===8?0:(i%2?-18:18)*SU))}`).join(' '),fill:'none',stroke:col('a1'),'stroke-width':f2(6*SU)},g);textEl(g,`${R} Ω`,x+w/2,y-40*SU,{size:30*SU,anchor:'middle',color:'a1',fam:MONOF});
  const bx=x+w,by=y+h/2;el('circle',{cx:bx,cy:by,r:46*SU,fill:TH.bg,stroke:TH.ink,'stroke-width':f2(5*SU)},g);const bulb=el('circle',{cx:bx,cy:by,r:40*SU,fill:col('a2'),filter:'url(#glow2)',opacity:0},g);el('path',{d:`M${bx-20*SU},${by+20*SU} L${bx-8*SU},${by-14*SU} L${bx+8*SU},${by+14*SU} L${bx+20*SU},${by-20*SU}`,fill:'none',stroke:TH.ink,'stroke-width':3},g);
  const fl=flowDots(g,loop,{color:'a4',n:18,speed:.06*I,size:7*SU});const ro=readout(g,B[0]+B[2],B[1],[['U',1,'V','a2'],['R',1,'Ω','a1'],['I',2,'A','a4'],['P',1,'W','a3']]);
  return {g,update(lt,p,st){fl(lt,p);bulb.setAttribute('opacity',f2(p>=1?Math.min(1,I*V/40)*(.85+.15*Math.sin(lt*20)):0));ro([V,R,I,V*I])}}}};
/* ---------- EFFECTS (deterministic particles in SVG): fire, smoke, water, bubbles, rain, snow, sparks, lightning, rays, explosion ---------- */
const fxBox=it=>{if(it.x!=null)return [it.x-(it.w||200)/2,it.y-(it.h||300),it.w||200,it.h||300];return boxOf(it)};
SM.items.fire={build(it){const B=fxBox(it);const fw=Math.min(B[2],B[3]*.62)*(it.scale||1),fh=fw*1.45;const cx=B[0]+B[2]/2,base=B[1]+B[3]-(B[3]-Math.min(B[3],fh))*.15;const g=el('g',{style:'mix-blend-mode:screen'});
  const core=el('ellipse',{cx,cy:base-fh*.1,rx:fw*.55,ry:fh*.16,fill:'#FF6A1A',filter:'url(#blur24)',opacity:.7},g);
  const LAY=[['#E2401B',1,.55],['#FF7A22',.8,.8],['#FFB23F',.6,.9],['#FFF0B8',.36,1]];
  const tongues=[];LAY.forEach(([c,s,o],li)=>{for(let k=0;k<(li<2?3:2);k++)tongues.push({e:el('path',{fill:c,opacity:o,filter:li<3?'url(#blur4)':'url(#glowS)'},g),s:s*(k?(.62+seeded(li*7+k,2)*.25):1),off:k?(seeded(li*5+k,1)-.5)*fw*.45:0,li,k})});
  const N=it.n||28;const ps=[...Array(N)].map(()=>el('circle',{fill:'#FFD36E',filter:'url(#blur4)'},g));const embers=[...Array(16)].map(()=>el('circle',{r:f2(2.6*SU),fill:'#FFC36B',filter:'url(#glowS)'},g));
  const C=['#FFF3B0','#FFD36E','#FFA53D','#FF6A2A','#D7263D'];
  return {g,update(lt,p){const I=(it.intensity||1)*p;
    tongues.forEach((T,i)=>{const H=fh*T.s*(.9+.14*noise3(lt*2.2,i*3.1)),W=fw*T.s*.62;const n=18;let L=[],R=[];const bx=cx+T.off;
      for(let j=0;j<=n;j++){const u=j/n;const hw=W/2*Math.pow(1-u,.85)*Math.min(1,Math.sqrt(u*5+.25));const sway=noise3(lt*1.8-u*2.2,i*1.7)*fw*.22*u*u+noise3(lt*4-u*5,i+9)*fw*.04*u;const yy=base-u*H;L.push([bx+sway-hw,yy]);R.push([bx+sway+hw,yy])}
      const P=[...L,...R.reverse()];T.e.setAttribute('d',smoothClosed(P));T.e.setAttribute('opacity',f2(I*(T.li===3?1:.85)))});
    ps.forEach((c,i)=>{const life=.6+seeded(i,1)*.5,u=((lt/life+seeded(i,2))%1);const sx=cx+(seeded(i,3)-.5)*fw*.6;const xx=sx+(cx-sx)*u*.7+noise3(lt*3,i)*fw*.12*u,yy=base-fh*.15-u*fh*(.55+seeded(i,4)*.45);
      at(c,{cx:f2(xx),cy:f2(yy),r:f2(Math.max(.1,fw*.035*(1-u)*(.6+seeded(i,5)*.6))),fill:C[Math.min(4,1+Math.floor(u*4))],opacity:f2(I*(1-u)*.7)})});
    embers.forEach((c,i)=>{const life=1.4+seeded(i,6),u=((lt/life+seeded(i,7))%1);at(c,{cx:f2(cx+(seeded(i,8)-.5)*fw*.8+noise3(lt,i)*40*SU),cy:f2(base-fh*.3-u*fh*1.1),opacity:f2(I*(1-u)*(.5+.5*Math.sin(lt*9+i)))})});
    core.setAttribute('opacity',f2(I*(.55+.12*Math.sin(lt*13)+.08*Math.sin(lt*7.3))))}}}};
SM.items.smoke={build(it){const [x,y,w0,h]=fxBox(it);const w=Math.min(w0,h*.7);const g=el('g');const N=it.n||26,cx=x+w0/2,base=y+h;const ps=[...Array(N)].map(()=>el('circle',{fill:col(it.color||'#9AA3B5'),filter:'url(#blur10)'},g));
  return {g,update(lt,p){ps.forEach((c,i)=>{const life=3+seeded(i,1)*2,u=((lt/life+seeded(i,2))%1);at(c,{cx:f2(cx+(seeded(i,3)-.5)*w*.4+Math.sin(lt*.8+i)*w*.25*u+u*w*.2*(it.wind||0)),cy:f2(base-u*h),r:f2(w*.08+u*w*.28),opacity:f2(p*(it.density??.26)*Math.sin(Math.PI*u))})})}}}};
SM.items.water={build(it){const box=boxOf(it);const [x,y,w,h]=box;const lvl=y+h*(1-(it.level??.55));const g=el('g');const fill=gradient([[0,it.color||'a1',.55],[1,it.color||'a1',.15]]);
  const body=el('path',{fill},g),surf=el('path',{fill:'none',stroke:col(it.color||'a1'),'stroke-width':f2(4*SU),filter:'url(#glowS)'},g),surf2=el('path',{fill:'none',stroke:'#fff','stroke-opacity':.25,'stroke-width':f2(2*SU)},g);
  const bub=[...Array(it.bubbles??18)].map(()=>el('circle',{fill:'none',stroke:'#fff','stroke-opacity':.6,'stroke-width':2},g));const caus=[...Array(6)].map(()=>el('path',{fill:'none',stroke:'#fff','stroke-opacity':.08,'stroke-width':f2(10*SU),filter:'url(#blur4)'},g));
  return {g,update(lt){const A=(it.waves??1)*14*SU,yy=X=>lvl+A*(Math.sin(X/(120*SU)+lt*1.6)*.6+Math.sin(X/(57*SU)-lt*2.3)*.4);let d=`M${x},${f2(yy(x))}`,d2='';for(let X=x;X<=x+w;X+=12*SU){d+=` L${f2(X)},${f2(yy(X))}`;d2+=(d2?' L':'M')+f2(X)+','+f2(yy(X)+10*SU)}
    surf.setAttribute('d',d);surf2.setAttribute('d',d2);body.setAttribute('d',d+` L${x+w},${y+h} L${x},${y+h} Z`);
    bub.forEach((b,i)=>{const life=2.5+seeded(i,1)*2,u=((lt/life+seeded(i,2))%1);const bx=x+seeded(i,3)*w+Math.sin(lt*2+i)*8*SU,by=lerp(y+h-10*SU,lvl+10*SU,u);at(b,{cx:f2(bx),cy:f2(by),r:f2((4+seeded(i,4)*8)*SU),opacity:f2(Math.sin(Math.PI*u))})});
    caus.forEach((c,i)=>{const cy2=lvl+(h*(1-(it.level??.55)))*0+40*SU+i*((y+h-lvl)/6);let dd='';for(let X=x;X<=x+w;X+=40*SU)dd+=(dd?' L':'M')+f2(X)+','+f2(cy2+Math.sin(X/(90*SU)+lt*(1+i*.2)+i)*14*SU);c.setAttribute('d',dd)})}}}};
const precip=(kind)=>({build(it){const [x,y,w,h]=boxOf(it);const g=el('g');const N=it.n||(kind==='rain'?90:kind==='snow'?70:30);
  const ps=[...Array(N)].map(()=>kind==='rain'?el('line',{stroke:col(it.color||'a1'),'stroke-opacity':.6,'stroke-width':f2(2.5*SU),'stroke-linecap':'round'},g):el('circle',{fill:kind==='snow'?'#fff':'none',stroke:kind==='bubbles'?col(it.color||'a1'):'none','stroke-width':2},g));
  return {g,update(lt,p){ps.forEach((e,i)=>{const sp=kind==='rain'?1.1+seeded(i,1)*.6:kind==='snow'?.12+seeded(i,1)*.1:.2+seeded(i,1)*.2;let u=((lt*sp+seeded(i,2))%1);if(kind==='bubbles')u=1-u;
    const px=x+seeded(i,3)*w+(kind==='snow'?Math.sin(lt+i)*20*SU:0),py=y+u*h;if(kind==='rain')at(e,{x1:f2(px),y1:f2(py),x2:f2(px-6*SU),y2:f2(py+30*SU),opacity:f2(p)});else at(e,{cx:f2(px),cy:f2(py),r:f2((kind==='snow'?3:6+seeded(i,4)*10)*SU),opacity:f2(p*(kind==='snow'?.85:Math.sin(Math.PI*u)))})})}}}});
SM.items.rain=precip('rain');SM.items.snow=precip('snow');SM.items.bubbles=precip('bubbles');
SM.items.sparks={build(it){const cx=it.x??boxOf(it)[0]+boxOf(it)[2]/2,cy=it.y??boxOf(it)[1]+boxOf(it)[3]/2;const g=el('g',{style:'mix-blend-mode:screen'});const N=it.n||40;const ps=[...Array(N)].map(()=>el('line',{stroke:'#FFD36E','stroke-width':f2(3*SU),'stroke-linecap':'round',filter:'url(#glowS)'},g));
  return {g,update(lt,p){ps.forEach((l,i)=>{const life=.8+seeded(i,1)*.6,u=((lt/life+seeded(i,2))%1),a=-Math.PI/2+(seeded(i,3)-.5)*2.4,v=(300+seeded(i,4)*400)*SU;const tt=u*life;const x=cx+Math.cos(a)*v*tt,y=cy+Math.sin(a)*v*tt+.5*900*SU*tt*tt;const vx=Math.cos(a)*v,vy=Math.sin(a)*v+900*SU*tt;const L=.03;
    at(l,{x1:f2(x),y1:f2(y),x2:f2(x-vx*L),y2:f2(y-vy*L),opacity:f2(p*(1-u))})})}}}};
SM.items.lightning={build(it){const [x1,y1]=it.from||[960,100],[x2,y2]=it.to||[960,900];const g=el('g');const b=el('path',{fill:'none',stroke:'#fff','stroke-width':f2(4*SU),filter:'url(#glow2)'},g),b2=el('path',{fill:'none',stroke:col(it.color||'a1'),'stroke-width':f2(10*SU),'stroke-opacity':.5,filter:'url(#blur10)'},g);
  const flash=el('rect',{x:0,y:0,width:SW,height:SH,fill:'#fff',opacity:0},g);
  return {g,update(lt,p){const fr=Math.floor(lt*(it.rate||14));const n=18;let d=`M${x1},${y1}`;for(let k=1;k<=n;k++){const u=k/n,j=k===n?0:(seeded(fr*31+k,1)-.5)*(it.jitter||90)*SU;const nx=-(y2-y1),ny=x2-x1,L=Math.hypot(nx,ny);d+=` L${f2(lerp(x1,x2,u)+nx/L*j)},${f2(lerp(y1,y2,u)+ny/L*j)}`}
    const on=it.continuous?1:(seeded(fr,5)>.45?1:0);b.setAttribute('d',d);b2.setAttribute('d',d);b.setAttribute('opacity',f2(p*on));b2.setAttribute('opacity',f2(p*on));flash.setAttribute('opacity',f2(it.flash?p*on*.08:0))}}}};
SM.items.rays={build(it){const cx=it.x??SW/2,cy=it.y??SH/2;const g=el('g');const N=it.n||16,R=(it.r||900)*SU;const rays=[...Array(N)].map((_,i)=>el('path',{fill:col(it.color||'a2'),'fill-opacity':.07},g));el('circle',{cx,cy,r:(it.core||60)*SU,fill:col(it.color||'a2'),filter:'url(#blur24)'},g);
  return {g,update(lt){rays.forEach((r,i)=>{const a=i/N*TAU+lt*.08,da=TAU/N*.32;r.setAttribute('d',`M${cx},${cy} L${f2(cx+Math.cos(a-da)*R)},${f2(cy+Math.sin(a-da)*R)} L${f2(cx+Math.cos(a+da)*R)},${f2(cy+Math.sin(a+da)*R)} Z`)})}}}};
SM.items.explosion={build(it){const cx=it.x??SW/2,cy=it.y??SH/2;const g=el('g',{style:'mix-blend-mode:screen'});const N=it.n||60;const ring=el('circle',{cx,cy,fill:'none',stroke:'#FFD36E','stroke-width':f2(8*SU),filter:'url(#glowS)'},g);const core=el('circle',{cx,cy,fill:'#FFF3B0',filter:'url(#blur24)'},g);
  const ps=[...Array(N)].map(()=>el('circle',{fill:'#FFA53D',filter:'url(#glowS)'},g));
  return {g,update(lt,p,st){const t=lt-(it.at??st);if(t<0){g.setAttribute('opacity',0);return}g.setAttribute('opacity',1);const q=E.outExpo(clamp(t/1.2));at(ring,{r:f2(q*(it.r||420)*SU),opacity:f2(1-q)});at(core,{r:f2((1-q)*180*SU+20*SU),opacity:f2(1-clamp(t/.8))});
    ps.forEach((c,i)=>{const a=seeded(i,1)*TAU,v=(it.r||420)*SU*(.4+seeded(i,2)*.8);const d=E.outCubic(clamp(t/1.4))*v;at(c,{cx:f2(cx+Math.cos(a)*d),cy:f2(cy+Math.sin(a)*d+t*t*60*SU),r:f2((1-clamp(t/1.6))*10*SU+.1),opacity:f2(1-clamp(t/1.6))})})}}}};
SM.items.glowOrb={build(it){const g=el('g');const c=col(it.color||'a1');el('circle',{cx:it.x,cy:it.y,r:(it.r||60)*SU*2.2,fill:c,filter:'url(#blur24)',opacity:.5},g);const core=el('circle',{cx:it.x,cy:it.y,r:(it.r||60)*SU,fill:gradient([[0,'#fff'],[.5,c],[1,c,.2]],{radial:true})},g);
  return {g,update(lt){core.setAttribute('r',f2((it.r||60)*SU*(1+.05*Math.sin(lt*3))))}}}};
/* ---------- DIAGRAMS: mindmap, timeline, flow/cycle, compare, chart (functions, area, mark), bars, pie, number, emoji ---------- */
const PAL=['a1','a2','a3','a4','a5'];
function node(g,x,y,text,{size=30,color='a1',filled=false,maxW=360,pad=22,weight=700,sub}={}){size*=SU;maxW*=SU;const lines=wrapText(text,size,maxW,weight);const w=Math.max(...lines.map(l=>tw(l.replace(/\*/g,''),size,weight)))+pad*2*SU,lh=size*1.2;
  const subS=size*.7,subL=sub?wrapText(sub,subS,maxW,500):[];const h=lines.length*lh+subL.length*subS*1.25+pad*1.3*SU;const ng=el('g',{},g);
  el('rect',{x:f2(x-w/2),y:f2(y-h/2),width:f2(w),height:f2(h),rx:f2(Math.min(h/2,22*SU)),fill:filled?col(color):TH.panel,stroke:col(color),'stroke-width':f2(3*SU),filter:filled?'url(#glowS)':undefined},ng);
  lines.forEach((l,i)=>textEl(ng,l,x,y-h/2+pad*.65*SU+lh*(i+.8),{size,anchor:'middle',weight,color:filled?TH.bg:'ink'}));subL.forEach((l,i)=>textEl(ng,l,x,y-h/2+pad*.65*SU+lh*lines.length+subS*1.25*(i+.85),{size:subS,anchor:'middle',weight:500,color:filled?TH.bg:'dim'}));
  return {g:ng,w,h}}
const popT=(e,x,y,q)=>{e.setAttribute('transform',`translate(${f2(x)} ${f2(y)}) scale(${f2(Math.max(.001,q))}) translate(${f2(-x)} ${f2(-y)})`);e.setAttribute('opacity',f2(clamp(q*3)))};
SM.items.mindmap={build(it){const [x,y,w,h]=boxOf(it);const g=el('g');const cx=x+w/2,cy=y+h/2;const br=it.branches||[];const n=br.length;const rx=w*.3,ry=h*.3;const lines=el('g',{},g),nodes=el('g',{},g);
  const C=node(nodes,cx,cy,it.center||'',{size:38,filled:true,color:it.color||'a1',maxW:300});const anim=[];anim.push({e:C.g,x:cx,y:cy,t:0});
  br.forEach((b,i)=>{const bo=typeof b==='string'?{text:b}:b;const a=-Math.PI/2+i/n*TAU,c=bo.color||PAL[(i+1)%5];let bx=cx+Math.cos(a)*rx,by=cy+Math.sin(a)*ry;
    const p=dr(el('path',{d:`M${f2(cx)},${f2(cy)} C${f2(cx+Math.cos(a)*rx*.5)},${f2(cy+Math.sin(a)*ry*.2)} ${f2(bx-Math.cos(a)*rx*.3)},${f2(by-Math.sin(a)*ry*.1)} ${f2(bx)},${f2(by)}`,fill:'none',stroke:col(c),'stroke-width':f2(5*SU),'stroke-linecap':'round'},lines));
    const N=node(nodes,bx,by,bo.text,{size:34,color:c,maxW:280,sub:bo.sub});const t0=.5+i*.55;anim.push({p,t:t0},{e:N.g,x:bx,y:by,t:t0+.4});
    (bo.children||[]).forEach((ch,j)=>{const m=bo.children.length,spread=Math.min(1.1,.42*m),ca=a+(m>1?(j/(m-1)-.5)*spread:0);let kx=cx+Math.cos(ca)*w*.46,ky=cy+Math.sin(ca)*h*.45;
      const cw=Math.min(240,(w*.2)/SU);const tws=tw(ch,27*SU,600)+40*SU;kx=clamp(kx,x+Math.min(cw*SU,tws)/2,x+w-Math.min(cw*SU,tws)/2);ky=clamp(ky,y+30*SU,y+h-30*SU);
      const cp=dr(el('path',{d:`M${f2(bx)},${f2(by)} Q${f2((bx+kx)/2+Math.cos(a)*20*SU)},${f2((by+ky)/2+Math.sin(a)*20*SU)} ${f2(kx)},${f2(ky)}`,fill:'none',stroke:col(c),'stroke-width':f2(2.5*SU),'stroke-opacity':.7},lines));
      const K=node(nodes,kx,ky,ch,{size:27,color:c,maxW:cw,weight:600,pad:16});const tj=t0+.7+j*.18;anim.push({p:cp,t:tj},{e:K.g,x:kx,y:ky,t:tj+.3})})});
  return {g,noDraw:true,len:()=>Math.max(...anim.map(o=>o.t))+.8,update(lt,p,st){anim.forEach(o=>{if(o.p)o.p.style.strokeDashoffset=f2(1-E.inOutCubic(prog(lt,st+o.t,st+o.t+.5)));else popT(o.e,o.x,o.y,E.outBack(prog(lt,st+o.t,st+o.t+.5)))})}}}};
SM.items.timeline={build(it){const [x,y,w,h]=boxOf(it);const g=el('g');const ev=it.events||[];const n=ev.length;const vert=SH>SW||it.vertical;const anim=[];
  if(!vert){const ay=y+h/2,x0=x+40*SU,x1=x+w-40*SU;const ax=dr(el('line',{x1:x0,y1:ay,x2:x1,y2:ay,stroke:TH.dim,'stroke-width':f2(4*SU),'stroke-linecap':'round'},g));const cw=Math.min(380*SU,(x1-x0)/Math.max(1,n)*1.7);
    const mg=Math.min(cw/2,(x1-x0)/4);const xs=ev.map((e,i)=>n===1?(x0+x1)/2:x0+mg+i*(x1-x0-2*mg)/(n-1));const dot=el('circle',{r:f2(12*SU),fill:col('a2'),filter:'url(#glow)'},g);
    ev.forEach((e,i)=>{const up=i%2===0,c=e.color||PAL[i%5],ex=xs[i];el('circle',{cx:ex,cy:ay,r:f2(10*SU),fill:col(c),stroke:TH.bg,'stroke-width':3},g);const eg=el('g',{},g);
      const cy2=up?ay-h*.26:ay+h*.26;el('line',{x1:ex,y1:ay,x2:ex,y2:cy2+(up?60:-60)*SU,stroke:col(c),'stroke-width':2,'stroke-dasharray':'4 6'},eg);
      const D=textEl(eg,e.date||'',ex,cy2-(up?50:-10)*SU-(up?0:0),{size:44*SU,anchor:'middle',weight:800,color:c,fam:MONOF});const tl=wrapText(e.title||'',34*SU,cw,700);tl.forEach((l,k)=>textEl(eg,l,ex,cy2-(up?10:-50)*SU+k*40*SU,{size:34*SU,anchor:'middle',weight:700}));
      if(e.text){wrapText(e.text,26*SU,cw,500).slice(0,3).forEach((l,k)=>textEl(eg,l,ex,cy2-(up?10:-50)*SU+tl.length*40*SU+k*32*SU,{size:26*SU,anchor:'middle',weight:500,color:'dim'}))}
      anim.push({e:eg,x:ex,y:cy2,i})});
    return {g,noDraw:true,len:()=>.8+n*(it.per||it.stepDur||1.1)+.4,update(lt,p,st){const per=it.per||Math.max(.7,((it.stepDur||1.1))),T0=st+.8;ax.style.strokeDashoffset=f2(1-E.inOutCubic(prog(lt,st,st+.8)));const u=clamp((lt-T0)/per,0,n-1);const i0=Math.floor(u),fr=E.inOutCubic(u-i0);
      at(dot,{cx:f2(lerp(xs[i0],xs[Math.min(n-1,i0+1)],fr)),cy:ay,opacity:f2(prog(lt,st+.6,st+.9))});anim.forEach(o=>{const t=T0+o.i*per-.1;const q=E.outCubic(prog(lt,t,t+.5));o.e.setAttribute('opacity',f2(q));o.e.setAttribute('transform',`translate(0 ${f2((1-q)*(o.i%2?-20:20)*SU)})`)})}}}
  const axX=x+w*.18,y0=y+20*SU,y1=y+h-20*SU;const ax=dr(el('line',{x1:axX,y1:y0,x2:axX,y2:y1,stroke:TH.dim,'stroke-width':f2(4*SU)},g));const ys=ev.map((e,i)=>n===1?(y0+y1)/2:y0+30*SU+i*(y1-y0-60*SU)/(n-1));
  ev.forEach((e,i)=>{const c=e.color||PAL[i%5];el('circle',{cx:axX,cy:ys[i],r:f2(10*SU),fill:col(c)},g);const eg=el('g',{},g);textEl(eg,e.date||'',axX-24*SU,ys[i]+12*SU,{size:40*SU,anchor:'end',weight:800,color:c,fam:MONOF});
    wrapText(e.title||'',34*SU,w*.75,700).forEach((l,k)=>textEl(eg,l,axX+30*SU,ys[i]+10*SU+k*40*SU,{size:34*SU,weight:700}));anim.push({e:eg,i})});
  return {g,noDraw:true,len:()=>.8+n*(it.stepDur||1)+.4,update(lt,p,st){ax.style.strokeDashoffset=f2(1-E.inOutCubic(prog(lt,st,st+.8)));anim.forEach(o=>{const t=st+.8+o.i*(it.stepDur||1);const q=E.outCubic(prog(lt,t,t+.5));o.e.setAttribute('opacity',f2(q));o.e.setAttribute('transform',`translate(${f2((1-q)*30*SU)} 0)`)})}}}};
SM.items.flow={build(it){const [x,y,w,h]=boxOf(it);const g=el('g');const ns=(it.nodes||[]).map(o=>typeof o==='string'?{text:o}:o);const n=ns.length;const cyc=it.cycle;const vert=SH>SW;const ag=el('g',{},g),ng=el('g',{},g);let pos=[];
  if(cyc){const rx=w*.36,ry=h*.38;pos=ns.map((_,i)=>{const a=-Math.PI/2+i/n*TAU;return [x+w/2+Math.cos(a)*rx,y+h/2+Math.sin(a)*ry]});if(it.center){const C=node(ng,x+w/2,y+h/2,it.center,{size:32,filled:true,color:'a1',maxW:260});pos.center=C}}
  else if(vert||it.dir==='v'){pos=ns.map((_,i)=>[x+w/2,y+(i+.5)*h/n])}else{const per=n<=5?n:Math.ceil(n/2),rows=Math.ceil(n/per);pos=ns.map((_,i)=>{const r=Math.floor(i/per),c=i%per,cc=r%2?per-1-c:c;return [x+(cc+.5)*w/per,y+(r+.5)*h/rows]})}
  const maxW=cyc?Math.min(300,w/SU*.24):vert?Math.min(600,w/SU*.8):Math.min(320,w/SU/Math.min(n,5)*.78);
  const N=ns.map((o,i)=>node(ng,pos[i][0],pos[i][1],o.text,{size:it.size||34,color:o.color||PAL[i%5],maxW,sub:o.sub,filled:o.filled}));const ar=[];
  const edge=(i,j)=>{const [ax,ay]=pos[i],[bx,by]=pos[j];const dx=bx-ax,dy=by-ay,L=Math.hypot(dx,dy)||1;const ux=dx/L,uy=dy/L;const cut=(Nn)=>Math.min(Math.abs(Nn.w/2/(ux||1e-6)),Math.abs(Nn.h/2/(uy||1e-6)))+14*SU;
    const sx=ax+ux*cut(N[i]),sy=ay+uy*cut(N[i]),ex=bx-ux*cut(N[j]),ey=by-uy*cut(N[j]);const bend=cyc?.18:0;const mx=(sx+ex)/2-(ey-sy)*bend,my=(sy+ey)/2+(ex-sx)*bend;
    const p=dr(el('path',{d:`M${f2(sx)},${f2(sy)} Q${f2(mx)},${f2(my)} ${f2(ex)},${f2(ey)}`,fill:'none',stroke:col(it.arrowColor||'dim'),'stroke-width':f2(4*SU),'marker-end':arrowMarker(it.arrowColor||'dim'),'stroke-linecap':'round'},ag));
    const fl=it.flowDots!==false?flowDots(ag,p,{color:ns[i].color||PAL[i%5],n:3,speed:.45,size:6*SU}):null;return {p,fl}};
  for(let i=0;i<n-1;i++)ar.push(edge(i,i+1));if(cyc&&n>2)ar.push(edge(n-1,0));
  return {g,noDraw:true,len:()=>.2+n*(it.stepDur||.9)+.6,update(lt,p,st){const per=it.stepDur||.9;if(pos.center)popT(pos.center.g,x+w/2,y+h/2,E.outBack(prog(lt,st,st+.5)));
    N.forEach((o,i)=>{const t=st+.2+i*per;popT(o.g,pos[i][0],pos[i][1],E.outBack(prog(lt,t,t+.5)));const hl=it.highlight?Math.exp(-(((((lt-st-.2)/per)%n)-i)**2)*4):0;if(it.highlight)o.g.setAttribute('filter',hl>.5?'url(#glow)':'')});
    ar.forEach((a,i)=>{const t=st+.2+i*per+.45;a.p.style.strokeDashoffset=f2(1-E.inOutCubic(prog(lt,t,t+.45)));a.fl&&a.fl(lt,prog(lt,st+.2+n*per,st+.3+n*per))})}}}};
SM.items.compare={build(it){const [x,y,w,h]=boxOf(it);const g=el('g');const cs=it.columns||[];const n=cs.length||1,gap=30*SU,cw=(w-gap*(n-1))/n;const anim=[];
  cs.forEach((c,i)=>{const cx=x+i*(cw+gap),cc=c.color||PAL[i%5];const cg=el('g',{},g);panel(cg,cx,y,cw,h,{stroke:cc,sw:2.5});el('rect',{x:cx,y,width:cw,height:f2(90*SU),rx:f2(14*SU),fill:col(cc),'fill-opacity':.9},cg);
    textEl(cg,c.title||'',cx+cw/2,y+60*SU,{size:38*SU,anchor:'middle',weight:800,color:TH.bg});anim.push({e:cg,t:i*.35,x:cx+cw/2,y:y+h/2,pop:true});
    (c.items||[]).forEach((t,j)=>{const ig=el('g',{},g);const iy=y+140*SU+j*Math.min(110*SU,(h-170*SU)/Math.max(1,c.items.length));el('circle',{cx:cx+40*SU,cy:iy-10*SU,r:f2(9*SU),fill:col(cc)},ig);
      wrapText(t,32*SU,cw-90*SU,600).slice(0,2).forEach((l,k)=>textEl(ig,l,cx+64*SU,iy+k*38*SU,{size:32*SU,weight:600}));anim.push({e:ig,t:i*.35+.5+j*.3})})});
  return {g,noDraw:true,len:()=>Math.max(0,...anim.map(o=>o.t))+.7,update(lt,p,st){anim.forEach(o=>{const q=E.outCubic(prog(lt,st+o.t,st+o.t+.5));if(o.pop){o.e.setAttribute('opacity',f2(q));o.e.setAttribute('transform',`translate(0 ${f2((1-q)*40*SU)})`)}else{o.e.setAttribute('opacity',f2(q));o.e.setAttribute('transform',`translate(${f2((1-q)*-20*SU)} 0)`)}})}}}};
function compileFn(s){let e=String(s).replace(/\^/g,'**').replace(/(\d)\s*([a-zA-Z(])/g,'$1*$2').replace(/\bln\b/g,'log').replace(/\)\s*\(/g,')*(');try{return new Function('x','with(Math){return '+e+'}')}catch(err){SERR.push('chart: cannot parse f(x) = '+s);return ()=>0}}
SM.items.chart={build(it){const B=boxOf(it);const g=el('g');const [x0,x1]=it.xrange||(Array.isArray(it.x)?it.x:[-5,5]),[y0,y1]=it.yrange||(Array.isArray(it.y)?it.y:[-5,5]);const px=B[0]+90*SU,py=B[1]+20*SU,pw=B[2]-120*SU,ph=B[3]-90*SU;const X=v=>px+(v-x0)/(x1-x0)*pw,Y=v=>py+ph-(v-y0)/(y1-y0)*ph;
  const gridG=el('g',{},g);const tick=(a,b)=>{const r=(b-a)/8,p=Math.pow(10,Math.floor(Math.log10(r))),m=r/p;return (m<1.5?1:m<3?2:m<7?5:10)*p};const tx=tick(x0,x1),ty=tick(y0,y1);
  for(let v=Math.ceil(x0/tx)*tx;v<=x1+1e-9;v+=tx){el('line',{x1:X(v),y1:py,x2:X(v),y2:py+ph,stroke:TH.faint},gridG);textEl(gridG,+v.toFixed(6)+'',X(v),py+ph+34*SU,{size:22*SU,anchor:'middle',color:'dim',fam:MONOF})}
  for(let v=Math.ceil(y0/ty)*ty;v<=y1+1e-9;v+=ty){el('line',{x1:px,y1:Y(v),x2:px+pw,y2:Y(v),stroke:TH.faint},gridG);textEl(gridG,+v.toFixed(6)+'',px-12*SU,Y(v)+8*SU,{size:22*SU,anchor:'end',color:'dim',fam:MONOF})}
  const axY=clamp(Y(0),py,py+ph),axX=clamp(X(0),px,px+pw);const axes=[dr(el('line',{x1:px,y1:axY,x2:px+pw+20*SU,y2:axY,stroke:TH.ink,'stroke-width':3,'marker-end':arrowMarker('ink')},g)),dr(el('line',{x1:axX,y1:py+ph,x2:axX,y2:py-20*SU,stroke:TH.ink,'stroke-width':3,'marker-end':arrowMarker('ink')},g))];
  textEl(g,it.xlabel||'x',px+pw+10*SU,axY+(it.xlabel&&it.xlabel.length>2?78:40)*SU,{size:28*SU,anchor:'end',color:'ink',fam:MATHF,italic:!it.xlabel||it.xlabel.length<3});textEl(g,it.ylabel||'y',axX+14*SU,py,{size:28*SU,color:'ink',fam:MATHF,italic:!it.ylabel||it.ylabel.length<3});
  const cid='cc'+Math.round(rnd(px+py)*1e9);const cp=el('clipPath',{id:cid},DEFS);el('rect',{x:px,y:py,width:pw,height:ph},cp);const plot=el('g',{'clip-path':`url(#${cid})`},g);
  if(it.shade){const f=compileFn(it.shade.f);const a=it.shade.from??x0,b=it.shade.to??x1;let d=`M${f2(X(a))},${f2(Y(0))}`;for(let k=0;k<=100;k++){const v=a+(b-a)*k/100;d+=` L${f2(X(v))},${f2(Y(f(v)))}`}d+=` L${f2(X(b))},${f2(Y(0))} Z`;var areaP=el('path',{d,fill:col(it.shade.color||'a1'),'fill-opacity':.25,opacity:0},plot)}
  const curves=(it.fns||[]).map((o,i)=>{const fo=typeof o==='string'?{f:o}:o;const f=compileFn(fo.f);let d='',pen=false;for(let k=0;k<=400;k++){const v=x0+(x1-x0)*k/400,yy=f(v);if(!isFinite(yy)||Math.abs(yy)>1e6){pen=false;continue}d+=(pen?' L':' M')+f2(X(v))+','+f2(Y(yy));pen=true}
    const c=fo.color||PAL[i%5];const p=dr(el('path',{d,fill:'none',stroke:col(c),'stroke-width':f2(5*SU),'stroke-linecap':'round','stroke-linejoin':'round',filter:'url(#glowS)','stroke-dasharray':fo.dashed?'10 10':undefined},plot));
    let lb=null;if(fo.label){const lx=fo.labelAt??x1-(x1-x0)*.12;lb=textEl(g,fo.label,X(lx),clamp(Y(f(lx))-18*SU,py+30*SU,py+ph-10*SU),{size:30*SU,anchor:'middle',color:c,weight:700})}return {p,lb}});
  const pts=(it.points||[]).map(([a,b])=>el('circle',{cx:X(a),cy:Y(b),r:f2(8*SU),fill:col('a2'),opacity:0},g));
  let mk=null;if(it.mark){const m=it.mark;mk=el('g',{opacity:0},g);el('path',{d:`M${X(m.x)},${Y(m.y)} L${X(m.x)},${axY} M${X(m.x)},${Y(m.y)} L${axX},${Y(m.y)}`,stroke:col('a2'),'stroke-dasharray':'6 6','stroke-width':2.5},mk);el('circle',{cx:X(m.x),cy:Y(m.y),r:f2(12*SU),fill:col('a2'),filter:'url(#glow)'},mk);if(m.label)textEl(mk,m.label,X(m.x)+20*SU,Y(m.y)-20*SU,{size:28*SU,color:'a2',weight:700})}
  return {g,noDraw:true,len:()=>.6+curves.length*.7+1.4,update(lt,p,st){axes.forEach(a=>a.style.strokeDashoffset=f2(1-E.inOutCubic(prog(lt,st,st+.7))));gridG.setAttribute('opacity',f2(prog(lt,st,st+.6)));
    curves.forEach((c,i)=>{const t=st+.6+i*.7;c.p.style.strokeDashoffset=f2(1-E.inOutCubic(prog(lt,t,t+1.1)));c.lb&&c.lb.setAttribute('opacity',f2(prog(lt,t+.9,t+1.3)))});
    const tE=st+.6+curves.length*.7+.6;pts.forEach((c,i)=>c.setAttribute('opacity',f2(prog(lt,tE+i*.08,tE+i*.08+.2))));if(areaP)areaP.setAttribute('opacity',f2(prog(lt,tE,tE+.6)));if(mk)mk.setAttribute('opacity',f2(prog(lt,tE+.3,tE+.8)))}}}};
const normData=d=>(d||[]).map(o=>Array.isArray(o)?{label:o[0],value:+o[1],color:o[2]}:typeof o==='number'?{label:'',value:o}:o);
SM.items.barchart={build(it){const B=boxOf(it);const g=el('g');const d=normData(it.data);const n=d.length;const max=it.max||Math.max(...d.map(o=>o.value));const px=B[0]+30*SU,py=B[1]+40*SU,pw=B[2]-60*SU,ph=B[3]-110*SU;const bw=pw/n*.62;
  el('line',{x1:px,y1:py+ph,x2:px+pw,y2:py+ph,stroke:TH.ink,'stroke-width':3},g);const bars=d.map((o,i)=>{const c=o.color||(it.highlight===i?'a2':'a1');const bx=px+(i+.5)*pw/n-bw/2;const r=el('rect',{x:f2(bx),width:f2(bw),rx:f2(8*SU),fill:col(c),'fill-opacity':it.highlight!=null&&it.highlight!==i?.45:.95},g);
    textEl(g,o.label,bx+bw/2,py+ph+40*SU,{size:26*SU,anchor:'middle',color:'ink',weight:600});const v=el('text',{x:f2(bx+bw/2),'text-anchor':'middle','font-size':f2(28*SU),'font-family':MONOF,'font-weight':700,fill:col(c)},g);return {r,v,o}});
  if(it.unitLabel)textEl(g,it.unitLabel,px,py-10*SU,{size:24*SU,color:'dim'});
  return {g,noDraw:true,len:()=>1.4+bars.length*.15,update(lt,p,st){bars.forEach((b,i)=>{const q=E.outCubic(prog(lt,st+.2+i*.15,st+1.2+i*.15));const hh=ph*b.o.value/max*q;at(b.r,{y:f2(py+ph-hh),height:f2(Math.max(0,hh))});at(b.v,{y:f2(py+ph-hh-14*SU)});const dec=(String(b.o.value).split('.')[1]||'').length;b.v.textContent=(b.o.value*q).toFixed(dec)+(it.unit||'')})}}}};
SM.items.pie={build(it){const B=boxOf(it);const g=el('g');const d=normData(it.data);const tot=d.reduce((a,o)=>a+o.value,0);const R=Math.min(B[2]*.3,B[3]*.42),cx=B[0]+B[2]*(d.length?.38:.5),cy=B[1]+B[3]/2;const segs=[];let a0=-Math.PI/2;
  d.forEach((o,i)=>{const a1=a0+o.value/tot*TAU;const c=o.color||PAL[i%5];const p=el('path',{fill:'none',stroke:col(c),'stroke-width':f2(R*.42),d:`M${f2(cx+Math.cos(a0)*R*.79)},${f2(cy+Math.sin(a0)*R*.79)} A${f2(R*.79)},${f2(R*.79)} 0 ${a1-a0>Math.PI?1:0} 1 ${f2(cx+Math.cos(a1)*R*.79)},${f2(cy+Math.sin(a1)*R*.79)}`},g);dr(p);
    const ly=B[1]+B[3]*.15+i*Math.min(70*SU,B[3]*.7/d.length);const lg=el('g',{},g);el('rect',{x:B[0]+B[2]*.72,y:ly-22*SU,width:28*SU,height:28*SU,rx:6,fill:col(c)},lg);textEl(lg,`${o.label} — ${(o.value/tot*100).toFixed(o.decimals??0)}%`,B[0]+B[2]*.72+44*SU,ly,{size:28*SU,weight:600});segs.push({p,lg});a0=a1});
  if(it.center)textEl(g,it.center,cx,cy+14*SU,{size:40*SU,anchor:'middle',weight:800});
  return {g,noDraw:true,len:()=>.9+segs.length*.45,update(lt,p,st){segs.forEach((s,i)=>{const t=st+.2+i*.45;s.p.style.strokeDashoffset=f2(1-E.inOutCubic(prog(lt,t,t+.6)));s.lg.setAttribute('opacity',f2(prog(lt,t+.3,t+.7)))})}}}};
SM.items.number={build(it){const B=boxOf(it);const g=el('g');const size=(it.size||150)*SU;const t=textEl(g,'',B[0]+B[2]/2,B[1]+B[3]/2+size*.3,{size,anchor:'middle',weight:800,color:it.color||'a2',fam:FONT});const l=it.label?textEl(g,it.label,B[0]+B[2]/2,B[1]+B[3]/2+size*.3+64*SU,{size:36*SU,anchor:'middle',color:'dim',weight:600}):null;
  const dec=it.decimals??(String(it.value).split('.')[1]||'').length;const fmt=v=>v.toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
  return {g,len:()=>(it.countDur||1.8)+.2,update(lt,p,st){const q=E.outQuart(prog(lt,st,st+(it.countDur||1.8)));t.textContent=(it.prefix||'')+fmt((it.from||0)+(it.value-(it.from||0))*q)+(it.suffix||'')}}}};
SM.items.emoji={build(it){const g=el('g');const s=(it.size||120)*SU;const t=el('text',{x:it.x,y:it.y+s*.35,'font-size':f2(s),'text-anchor':'middle','font-family':'"Noto Color Emoji","Apple Color Emoji","Segoe UI Emoji",sans-serif'},g);t.textContent=it.char||'⭐';return {g,update(lt){if(it.float!==false)g.setAttribute('transform',`translate(0 ${f2(Math.sin(lt*1.6+it.x)*6*SU)})`)}}}};
/* ---------- built-in scene kinds: title card, summary, quiz ---------- */
var BPM=76,BEAT=60/BPM,BAR=BEAT*4; // audiokit globals
const L10N={uz:{summary:'Xulosa',quiz:'Savol',answer:'Javob',thanks:'E’tiboringiz uchun rahmat!',think:'O‘ylab ko‘ring…'},
  en:{summary:'Summary',quiz:'Question',answer:'Answer',thanks:'Thanks for watching!',think:'Think about it…'},
  ru:{summary:'Итоги',quiz:'Вопрос',answer:'Ответ',thanks:'Спасибо за внимание!',think:'Подумайте…'}};
const tr=k=>(L10N[LANG]||L10N.uz)[k]||L10N.en[k];
SM.items.titleCard={build(it){const g=el('g');const cx=SW/2,cy=SH*(SH>SW?.42:.46);const v=SH>SW;
  const orb=el('circle',{cx,cy,r:f2(360*SU),fill:gradient([[0,'a1',.28],[1,'a1',0]],{radial:true})},g);
  const rings=[0,1,2].map(i=>{const rg=el('g',{},g);el('ellipse',{cx:0,cy:0,rx:f2((470+i*120)*SU),ry:f2((150+i*44)*SU),fill:'none',stroke:col(['a1','a2','a5'][i]),'stroke-opacity':.22,'stroke-width':f2(2*SU)},rg);
    const d=el('circle',{r:f2(8*SU),fill:col(['a1','a2','a5'][i]),filter:'url(#glowS)'},rg);return {rg,d,i}});
  const chipT=(it.subject||LSN.subject||'').toUpperCase();let chip=null;
  if(chipT){chip=el('g',{},g);const cs=26*SU,lsp=4*SU,w=tw(chipT,cs,800)+lsp*chipT.length+56*SU;panel(chip,cx-w/2,cy-(v?330:250)*SU,w,54*SU,{r:27,fill:'none',stroke:'a1'});textEl(chip,chipT,cx+lsp/2,cy-(v?330:250)*SU+36*SU,{size:cs,weight:800,anchor:'middle',color:'a1',ls:4*SU})}
  const size=(it.size||(v?92:104))*SU;const lines=wrapText(it.text||LSN.title||'',size,SW*(v?.84:.78),800);const lh=size*1.12;const y0=cy-(lines.length-1)*lh/2+size*.3-(it.subtitle||LSN.subtitle?30*SU:0);
  const TFX=it.fx||(typeof LSN.typo==='object'&&LSN.typo.title)||(LSN.typo===false?'rise':TYPO.pick(['mask-up','tracking-in','rise-blur','split-center','wave','blur-in'],String(it.text||LSN.title||'').length));const TB=TYPO.block(g,lines.map((l,i)=>({s:l,x:cx,y:y0+i*lh,size,weight:800,anchor:'middle',accent:'a2',p:i})),{in:TFX,step:.25});
  const ul=dr(el('path',{d:`M${f2(cx-160*SU)},${f2(y0+(lines.length-1)*lh+46*SU)} L${f2(cx+160*SU)},${f2(y0+(lines.length-1)*lh+46*SU)}`,stroke:col('a2'),'stroke-width':f2(6*SU),'stroke-linecap':'round'},g));
  const subT=it.subtitle??LSN.subtitle;const sub=subT?wrapText(subT,40*SU,SW*.7,500).map((l,i)=>textEl(g,l,cx,y0+(lines.length-1)*lh+120*SU+i*54*SU,{size:40*SU,weight:500,anchor:'middle',color:'dim'})):[];
  const au=(it.author??LSN.author)?textEl(g,it.author??LSN.author,cx,SH-(v?420:210)*SU,{size:30*SU,anchor:'middle',color:'dim',weight:600,ls:2*SU}):null;
  return {g,noDraw:true,update(lt){rings.forEach(({rg,d,i})=>{rg.setAttribute('transform',`translate(${cx} ${cy}) rotate(${-8+i*9})`);const a=lt*(.35+i*.12)+i*2;at(d,{cx:f2(Math.cos(a)*(470+i*120)*SU),cy:f2(Math.sin(a)*(150+i*44)*SU)});rg.setAttribute('opacity',f2(E.outCubic(prog(lt,.2+i*.2,1.2+i*.2))))});
    orb.setAttribute('opacity',f2(prog(lt,0,1.2)*(.85+.15*Math.sin(lt*1.3))));if(chip)chip.setAttribute('opacity',f2(prog(lt,.2,.7)));
    TB.update(lt,.35,99);
    ul.style.strokeDashoffset=f2(1-E.inOutCubic(prog(lt,1,1.8)));sub.forEach((s,i)=>s.setAttribute('opacity',f2(prog(lt,1.3+i*.15,2+i*.15))));au&&au.setAttribute('opacity',f2(prog(lt,1.8,2.5)))}}}};
SM.items.summary={build(it){const box=boxOf(it);const g=el('g');const pts=it.points||[];const size=(it.size||44)*SU;const head=textEl(g,it.heading||tr('summary'),box[0]+box[2]/2,box[1]+60*SU,{size:64*SU,weight:800,anchor:'middle',color:'a1'});
  const rows=[];const w=Math.min(box[2],1300*SU),x=box[0]+box[2]/2-w/2;let y=box[1]+140*SU;const lh=size*1.25;
  pts.forEach((p,i)=>{const ls=wrapText(p,size,w-110*SU,600);const rg=el('g',{},g);const h=ls.length*lh+30*SU;panel(rg,x,y,w,h,{r:18});
    const ck=el('g',{transform:`translate(${f2(x+48*SU)} ${f2(y+h/2)})`},rg);el('circle',{r:f2(24*SU),fill:col(['a1','a2','a4','a5','a3'][i%5]),'fill-opacity':.18,stroke:col(['a1','a2','a4','a5','a3'][i%5]),'stroke-width':f2(3*SU)},ck);
    const tick=dr(el('path',{d:`M${f2(-10*SU)},0 L${f2(-2*SU)},${f2(9*SU)} L${f2(12*SU)},${f2(-9*SU)}`,fill:'none',stroke:col(['a1','a2','a4','a5','a3'][i%5]),'stroke-width':f2(4*SU),'stroke-linecap':'round','stroke-linejoin':'round'},ck));
    ls.forEach((l,k)=>textEl(rg,l,x+96*SU,y+15*SU+lh*(k+.78),{size,weight:600,accent:'a2'}));rows.push({rg,tick});y+=h+22*SU});
  const th=it.text!==false?textEl(g,it.text||tr('thanks'),box[0]+box[2]/2,Math.min(box[1]+box[3],y+90*SU),{size:46*SU,weight:700,anchor:'middle',color:'a2'}):null;
  const gap=it.gap||1.1;return {g,noDraw:true,update(lt,p,st){head.setAttribute('opacity',f2(prog(lt,st,st+.6)));rows.forEach((r,i)=>{const t0=st+.6+i*gap,q=E.outCubic(prog(lt,t0,t0+.6));r.rg.setAttribute('opacity',f2(q));r.rg.setAttribute('transform',`translate(${f2((1-q)*-40*SU)} 0)`);r.tick.style.strokeDashoffset=f2(1-prog(lt,t0+.35,t0+.8))});
    th&&th.setAttribute('opacity',f2(prog(lt,st+.6+rows.length*gap+.3,st+.6+rows.length*gap+1)))},len:()=>.6+pts.length*gap+1.5}}};
SM.items.quiz={build(it){const box=boxOf(it);const g=el('g');const v=SH>SW;const opts=it.options||[];const ans=it.answer??0;const think=it.think??5;
  const chip=textEl(g,'❓ '+tr('quiz'),box[0]+box[2]/2,box[1]+30*SU,{size:32*SU,weight:800,anchor:'middle',color:'a2',ls:3*SU});
  const qs=(it.size||54)*SU;const ql=wrapText(it.question||'',qs,box[2]*.9,700);const qT=ql.map((l,i)=>textEl(g,l,box[0]+box[2]/2,box[1]+110*SU+i*qs*1.2,{size:qs,weight:700,anchor:'middle',accent:'a1'}));
  const top=box[1]+110*SU+ql.length*qs*1.2+30*SU;const cols=v||opts.length<3?1:2,rowsN=Math.ceil(opts.length/cols),gp=26*SU;const cw=(box[2]*(cols===1?.8:.96)-gp*(cols-1))/cols,ch=Math.min(130*SU,(box[1]+box[3]-top-100*SU-gp*(rowsN-1))/rowsN);
  const x0=box[0]+box[2]/2-(cw*cols+gp*(cols-1))/2;const cards=opts.map((o,i)=>{const c=i%cols,r=Math.floor(i/cols);const x=x0+c*(cw+gp),y=top+r*(ch+gp);const cg=el('g',{},g);
    const rc=panel(cg,x,y,cw,ch,{r:20,stroke:'faint',sw:2.5});const L='ABCDEF'[i];el('circle',{cx:f2(x+50*SU),cy:f2(y+ch/2),r:f2(28*SU),fill:col('a1'),'fill-opacity':.15,stroke:col('a1'),'stroke-width':f2(2.5*SU)},cg);
    textEl(cg,L,x+50*SU,y+ch/2+11*SU,{size:30*SU,weight:800,anchor:'middle',color:'a1'});const fs=Math.min(40*SU,ch*.36);const ls=wrapText(o,fs,cw-120*SU,600).slice(0,2);ls.forEach((l,k)=>textEl(cg,l,x+100*SU,y+ch/2+fs*.35+(k-(ls.length-1)/2)*fs*1.15,{size:fs,weight:600}));return {cg,rc,i}});
  const ry=Math.min(box[1]+box[3]-40*SU,top+rowsN*(ch+gp)+50*SU),R=34*SU,cx=box[0]+box[2]/2;const ringBg=el('circle',{cx,cy:ry,r:R,fill:'none',stroke:TH.faint,'stroke-width':f2(7*SU)},g);
  const ring=el('circle',{cx,cy:ry,r:R,fill:'none',stroke:col('a2'),'stroke-width':f2(7*SU),'stroke-linecap':'round',transform:`rotate(-90 ${cx} ${ry})`,'stroke-dasharray':f2(TAU*R),'stroke-dashoffset':0},g);
  const num=textEl(g,'',cx,ry+12*SU,{size:32*SU,weight:800,anchor:'middle',color:'a2',fam:MONOF});
  const exp=it.explain?wrapText(it.explain,34*SU,box[2]*.85,500).map((l,i)=>textEl(g,l,cx,ry-6*SU+i*44*SU,{size:34*SU,weight:500,anchor:'middle',color:'dim',accent:'a4'})):[];
  return {g,noDraw:true,update(lt,p,st){chip.setAttribute('opacity',f2(prog(lt,st,st+.4)));qT.forEach((t,i)=>t.setAttribute('opacity',f2(prog(lt,st+.2+i*.15,st+.7+i*.15))));
    const t1=st+1+opts.length*.25,tr0=t1+.3,tr1=tr0+think;cards.forEach(({cg,rc,i})=>{const q=E.outBack(prog(lt,st+.9+i*.25,st+1.4+i*.25));cg.setAttribute('opacity',f2(clamp(q)));
      const rv=prog(lt,tr1,tr1+.5);const ok=i===ans;cg.setAttribute('opacity',f2(clamp(q)*(ok?1:1-.6*rv)));at(rc,{stroke:ok&&rv>0?col('a4'):TH.faint,'stroke-width':f2((2.5+3*rv*(ok?1:0))*SU),filter:ok&&rv>.5?'url(#glowS)':''});
      const s=ok?1+.04*Math.sin(clamp(rv)*Math.PI):1;const bb=[+rc.getAttribute('x')+ +rc.getAttribute('width')/2,+rc.getAttribute('y')+ +rc.getAttribute('height')/2];cg.setAttribute('transform',`translate(${f2(bb[0])} ${f2(bb[1])}) scale(${f2(s*(.9+.1*clamp(q)))}) translate(${f2(-bb[0])} ${f2(-bb[1])})`)});
    const u=prog(lt,tr0,tr1);const vis=lt>=tr0-.2&&lt<tr1+.6?1:0;[ringBg,ring,num].forEach(e=>e.setAttribute('opacity',f2(vis*prog(lt,tr0-.2,tr0)*(1-prog(lt,tr1+.2,tr1+.6)))));ring.setAttribute('stroke-dashoffset',f2(TAU*R*u));num.textContent=lt<tr1?String(Math.ceil(think*(1-u))):'✓';
    exp.forEach((e,i)=>e.setAttribute('opacity',f2(prog(lt,tr1+.8+i*.2,tr1+1.4+i*.2))))},len:()=>1.3+opts.length*.25+think+(it.explain?4:2.2)}}};

/* ================= PLAYER ================= */
const ENT={text:.8,formula:1.8,label:.7,arrow:.9,shape:1.2,image:1,svg:1.4,pulse:.4,number:1.6,emoji:.6,titleCard:2.2,summary:1,quiz:1};
const ANIM_DEF={text:'rise',formula:'write',label:'draw',arrow:'draw',shape:'draw',svg:'draw',image:'fade',emoji:'pop',pulse:'fade',number:'fade',titleCard:'none',summary:'none',quiz:'none',fire:'fade',smoke:'fade',water:'fade',rain:'fade',snow:'fade',bubbles:'fade',sparks:'fade',rays:'fade',glowOrb:'fade',explosion:'none',lightning:'fade'};
const SCENE_KEYS=['shake','dive','title','say','dur','kind','camera','items','transition','audio','focus','hold','notes','id','subtitle','question','options','answer','think','explain','points','text'];
const ITEM_COMMON=['type','id','at','with','dur','out','anim','wait','area','box','x','y','color','glow','opacity','scale','rotate','on','z'];
function lev(a,b){const d=[...Array(b.length+1).keys()];for(let i=1;i<=a.length;i++){let p=d[0];d[0]=i;for(let j=1;j<=b.length;j++){const t=d[j];d[j]=Math.min(d[j]+1,d[j-1]+1,p+(a[i-1]===b[j-1]?0:1));p=t}}return d[b.length]}
const near=(k,list)=>list.map(x=>[x,lev(k.toLowerCase(),x.toLowerCase())]).sort((a,b)=>a[1]-b[1])[0];
function resolvePt(v,REG,where){if(typeof v!=='string'||v[0]!=='@')return v;const [id,part]=v.slice(1).split('.');const r=REG[id];if(!r){SERR.push(`${where}: unknown reference "${v}" (give the target item an id:"${id}" and define it earlier)`);return [SW/2,SH/2]}
  if(part){const a=r.anchors&&r.anchors[part];if(!a){SERR.push(`${where}: "${id}" has no part "${part}". Parts: ${Object.keys(r.anchors||{}).join(', ')||'(none – use @'+id+')'}`);return r.center}return a}return r.center}
function alias(it){const t=it.type;const A=(k,...o)=>{if(it[k]==null)for(const x of o)if(it[x]!=null){it[k]=it[x];break}};
  if(t==='flow')A('nodes','steps','items','stages');if(t==='formula')A('tex','formula','text','latex');if(t==='text')A('text','content','value');if(t==='image')A('src','image','file','url');
  if(t==='mindmap'){A('center','text','title','topic');A('branches','children','items');if(Array.isArray(it.branches))it.branches=it.branches.map(b=>typeof b==='string'?b:{...b,text:b.text??b.title??b.name})}
  if(t==='timeline'){A('events','items','points');if(Array.isArray(it.events))it.events=it.events.map(e=>{if(typeof e==='string')return {title:e};const o={...e};o.date=o.date??o.year??o.time??o.when;if(o.title==null){o.title=o.text??o.label??o.name;if(o.title===o.text)delete o.text}return o})}
  if(t==='compare'&&Array.isArray(it.columns))it.columns=it.columns.map(c=>({...c,items:c.items??c.points??c.rows,title:c.title??c.name}));
  if(t==='barchart'||t==='pie')A('data','values','items');if(t==='chart')A('fns','functions','fn','f');if(typeof it.fns==='string')it.fns=[it.fns];
  if(t==='emoji')A('char','emoji','text');if(t==='number')A('value','to','number');if(t==='label')A('text','label');return it}
function sayChunks(say){if(!say)return [];return String(say).match(/[^.!?…]+[.!?…]*\s*/g).map(s=>s.trim()).filter(Boolean)}
let IRIS=null,IRIS2=null,TZC=null,TZM=null,TZB=null;
// ---- 26 scene transitions (default 'auto' = a different one every scene) ----
const TZ_DUR={fade:.6,zoom:.6,slide:.6,whip:.45,dive:1.1,iris:.9,'push-left':.75,'push-right':.75,'push-up':.75,'push-down':.75,'wipe-left':.8,'wipe-right':.8,'wipe-up':.8,'wipe-down':.8,split:.8,barn:.8,blinds:.95,venetian:.95,diagonal:.85,grid:1.05,radial:.9,blur:.8,flip:.8,spin:.8,page:.95,'zoom-out':.7,cut:.001};
const TZ_ALL=Object.keys(TZ_DUR);const TZ_CLIP=new Set(['wipe-left','wipe-right','wipe-up','wipe-down','split','barn','blinds','venetian','diagonal','grid','radial']);const TZ_KEEP=new Set(['push-left','push-right','push-up','push-down','flip','page']);
const TZ_POOL=['push-left','wipe-right','iris','blinds','zoom','split','push-up','diagonal','blur','slide','flip','grid','page','barn','radial','venetian','spin','zoom-out','wipe-down','push-right'];let TZ_LAST=null;
function autoTz(si){if(si===0)return 'fade';const P=Array.isArray(LSN.transitions)?LSN.transitions:TZ_POOL;let k=Math.floor(seeded(si,17)*P.length)%P.length;let n=P[k];if(n===TZ_LAST)n=P[(k+1)%P.length];TZ_LAST=n;return n}
function tzSetup(HUD){const cp=el('clipPath',{id:'tzclip',clipPathUnits:'userSpaceOnUse'},DEFS);TZC=el('g',{},cp);const m=el('mask',{id:'tzmask',maskUnits:'userSpaceOnUse',x:-SW,y:-SH,width:SW*3,height:SH*3},DEFS);el('rect',{x:-SW,y:-SH,width:SW*3,height:SH*3,fill:'#fff'},m);TZM=el('g',{},m);
  [6,14,26].forEach((d,i)=>{const f=el('filter',{id:'tzb'+(i+1),x:'-10%',y:'-10%',width:'120%',height:'120%'},DEFS);el('feGaussianBlur',{stdDeviation:f2(d*SU)},f)});
  const ps=el('filter',{id:'pageSh',x:'-10%',y:'-10%',width:'120%',height:'130%'},DEFS);el('feDropShadow',{dx:0,dy:f2(18*SU),stdDeviation:f2(26*SU),'flood-color':'#000','flood-opacity':.35},ps);
  TZB=el('path',{fill:'none',stroke:col('a1'),'stroke-width':f2(6*SU),'stroke-linecap':'round'},HUD);TZB.style.display='none'}
function tzClip(n,p){TZC.textContent='';TZM.textContent='';const sh=[];const R=(x,y,w,h)=>sh.push(['rect',{x:f2(x),y:f2(y),width:f2(Math.max(0,w)),height:f2(Math.max(0,h))}]);let edge=null;
  if(n==='wipe-right'){R(0,0,SW*p,SH);edge=`M${f2(SW*p)},0 L${f2(SW*p)},${SH}`}else if(n==='wipe-left'){R(SW*(1-p),0,SW*p,SH);edge=`M${f2(SW*(1-p))},0 L${f2(SW*(1-p))},${SH}`}
  else if(n==='wipe-down'){R(0,0,SW,SH*p);edge=`M0,${f2(SH*p)} L${SW},${f2(SH*p)}`}else if(n==='wipe-up'){R(0,SH*(1-p),SW,SH*p);edge=`M0,${f2(SH*(1-p))} L${SW},${f2(SH*(1-p))}`}
  else if(n==='split')R(SW/2*(1-p),0,SW*p,SH);else if(n==='barn')R(0,SH/2*(1-p),SW,SH*p);
  else if(n==='blinds'){const N=8;for(let i=0;i<N;i++){const q=E.inOutCubic(prog(p,i*.05,i*.05+.65));R(0,i*SH/N,SW,SH/N*q+.5)}}
  else if(n==='venetian'){const N=12,w=SW/N;for(let i=0;i<N;i++){const q=E.inOutCubic(prog(p,i*.03,i*.03+.67));R(i*w+w/2*(1-q),0,w*q+.5,SH)}}
  else if(n==='diagonal'){const X=-SH*.4+(SW+SH*.8)*p;sh.push(['polygon',{points:`0,0 ${f2(X+SH*.35)},0 ${f2(X-SH*.35)},${SH} 0,${SH}`}]);edge=`M${f2(X+SH*.35)},0 L${f2(X-SH*.35)},${SH}`}
  else if(n==='grid'){const C=8,Rr=5,w=SW/C,h=SH/Rr;for(let a=0;a<C;a++)for(let b=0;b<Rr;b++){const d=(a+b)/(C+Rr-2)*.55,q=E.outCubic(prog(p,d,d+.45));R(a*w+w/2*(1-q),b*h+h/2*(1-q),w*q+.6,h*q+.6)}}
  else if(n==='radial')sh.push(['circle',{cx:0,cy:SH,r:f2(Math.hypot(SW,SH)*p)}]);
  sh.forEach(([t,a])=>{el(t,a,TZC);el(t,{...a,fill:'#000'},TZM)});
  if(edge&&p>0&&p<1){TZB.style.display='';at(TZB,{d:edge,opacity:f2(Math.sin(Math.PI*p))})}}
// ---- camera presets: camera:'push-in' | {preset:'focus', on:'@heart', zoom:1.6} | keyframes as before. No camera → a gentle, different move each scene ----
function camPreset(c,S,si){const d=S.dur;
  if(c==null||c==='auto'){if(LSN.drift===false||LSN.camera===false)return null;const P=['soft-in','soft-out','soft-right','soft-left','soft-up','soft-rot'];c=(typeof LSN.camera==='string'&&LSN.camera!=='auto')?LSN.camera:P[Math.floor(seeded(si,13)*P.length)%P.length]}
  if(c===false||c==='none'||c==='static')return null;if(Array.isArray(c))return c;if(typeof c==='object'&&!c.preset)return c;
  const o=typeof c==='string'?{preset:c}:c;const n=o.preset,z=o.zoom,on=o.on,t0=o.at??o.t??0;const cx=SW/2,cy=SH/2,X=SW*.075,Y=SH*.07;
  if(n==='tour'){const L=[].concat(on||[]);if(!L.length){SERR_WARN.push(`scene ${si+1}: camera tour needs on:['@a','@b']`);return null}const seg=(d-1.6)/L.length;return [...L.map((p,k)=>({on:p,t:.5+k*seg,dur:Math.min(1.3,seg*.6),zoom:z??1.5})),{t:d-1.4,dur:1.1,zoom:1,x:cx,y:cy}]}
  const A={'soft-in':[{t:0,dur:d,zoom:1.04,ease:'linear'}],'soft-out':[{t:0,dur:.001,zoom:1.04},{t:0,dur:d,zoom:1,ease:'linear'}],
    'soft-right':[{t:0,dur:.001,x:cx-22*SU,zoom:1.03},{t:0,dur:d,x:cx+22*SU,ease:'linear'}],'soft-left':[{t:0,dur:.001,x:cx+22*SU,zoom:1.03},{t:0,dur:d,x:cx-22*SU,ease:'linear'}],
    'soft-up':[{t:0,dur:.001,y:cy+16*SU,zoom:1.03},{t:0,dur:d,y:cy-16*SU,ease:'linear'}],'soft-rot':[{t:0,dur:.001,zoom:1.03,rotate:-.5},{t:0,dur:d,rotate:.5,ease:'linear'}],
    'push-in':[{on,t:t0+.3,dur:o.dur??Math.max(1.5,d*.7),zoom:z??1.2}],'pull-out':[{on,t:0,dur:.001,zoom:z??1.35},{t:t0+.3,dur:o.dur??2.6,zoom:1,x:cx,y:cy}],
    'ken-burns':[{t:0,dur:.001,zoom:1.06,x:cx-X*.6,y:cy+Y*.4},{t:0,dur:d,zoom:z??1.16,x:cx+X*.6,y:cy-Y*.4,ease:'inOutQuad'}],
    'pan-right':[{t:0,dur:.001,zoom:z??1.15,x:cx-X},{t:t0,dur:o.dur??d,x:cx+X,ease:'inOutQuad'}],'pan-left':[{t:0,dur:.001,zoom:z??1.15,x:cx+X},{t:t0,dur:o.dur??d,x:cx-X,ease:'inOutQuad'}],
    'pan-down':[{t:0,dur:.001,zoom:z??1.15,y:cy-Y},{t:t0,dur:o.dur??d,y:cy+Y,ease:'inOutQuad'}],'pan-up':[{t:0,dur:.001,zoom:z??1.15,y:cy+Y},{t:t0,dur:o.dur??d,y:cy-Y,ease:'inOutQuad'}],
    orbit:[{t:0,dur:.001,zoom:z??1.08,rotate:-2},{t:0,dur:d}],dolly:[{on,t:t0+.2,dur:o.dur??d*.8,zoom:z??1.25,rotate:1,ease:'inOutQuad'}],
    crane:[{t:0,dur:.001,y:cy-SH*.11,zoom:1.12},{t:t0,dur:o.dur??Math.min(d,3.5),y:cy,zoom:1.04,ease:'outCubic'}],
    reveal:[{on,t:0,dur:.001,zoom:z??1.8},{t:o.hold??.9,dur:o.dur??1.8,zoom:1,x:cx,y:cy}],
    focus:[{on,t:t0||d*.3,dur:1.2,zoom:z??1.6},{t:Math.max((t0||d*.3)+2.2,d-1.6),dur:1.2,zoom:1,x:cx,y:cy}]};
  A.orbit[1].rotate=2;
  if(!A[n]){SERR.push(`scene ${si+1}: unknown camera preset "${n}" → ${[...Object.keys(A),'tour'].join(', ')}`);return null}
  return A[n].map(k=>{const q={...k};if(q.on==null)delete q.on;return q})}

async function LESSON(cfg){
  LSN=cfg||{};window.__errors=SERR;window.__warnings=SERR_WARN;window.__ready=false;const q=new URLSearchParams(location.search);
  const fmt=LSN.format||'16:9';[SW,SH]=fmt==='9:16'?[1080,1920]:fmt==='1:1'?[1080,1080]:fmt==='4:5'?[1080,1350]:[1920,1080];SU=Math.min(SW,SH)/1080;
  LANG=LSN.lang||'uz';TH={...(STHEMES[LSN.theme]||STHEMES.night),...(LSN.colors||{})};if(LSN.theme&&!STHEMES[LSN.theme])SERR.push(`theme "${LSN.theme}" unknown → ${Object.keys(STHEMES).join(', ')}`);
  FONT=LSN.font||'Inter,"Segoe UI",Roboto,Arial,"Liberation Sans",sans-serif';MATHF=LSN.mathFont||'"Cambria Math","STIX Two Math","Times New Roman","Liberation Serif",serif';MONOF='"JetBrains Mono",Consolas,"Liberation Mono",monospace';
  SGRID=q.has('grid');const FPS=LSN.fps||30;
  const st=document.createElement('style');st.textContent=`html,body{margin:0;height:100%;background:${TH.bg};overflow:hidden}#stage{display:block;width:100vw;height:100vh}
  .dr{stroke-dasharray:1 1}#ui{position:fixed;left:0;right:0;bottom:0;display:flex;gap:8px;align-items:center;padding:8px 12px;background:linear-gradient(transparent,rgba(0,0,0,.65));font:13px system-ui;opacity:.15;transition:opacity .3s}#ui:hover{opacity:1}
  #ui button{background:rgba(255,255,255,.14);color:#fff;border:0;border-radius:6px;padding:6px 10px;cursor:pointer}#bar{flex:1;height:6px;background:rgba(255,255,255,.2);border-radius:3px;position:relative;cursor:pointer}#fill{position:absolute;left:0;top:0;bottom:0;background:${TH.a1};border-radius:3px}
  .mk{position:absolute;top:-3px;width:2px;height:12px;background:rgba(255,255,255,.6)}#tc{color:#fff;font:12px ui-monospace,monospace;min-width:92px}body.capture #ui{display:none}
  #err{position:fixed;left:10px;top:10px;right:10px;background:#B00020;color:#fff;font:14px/1.45 ui-monospace,monospace;padding:10px 14px;border-radius:8px;white-space:pre-wrap;z-index:9;max-height:45vh;overflow:auto}`;document.head.appendChild(st);
  if(LSN.fontUrl){try{const ff=await new FontFace(FONT.split(',')[0].replace(/"/g,''),`url(${LSN.fontUrl})`).load();document.fonts.add(ff)}catch(e){SERR.push('fontUrl failed: '+e.message)}}
  await document.fonts.ready;
  SVG=el('svg',{id:'stage',viewBox:`0 0 ${SW} ${SH}`,xmlns:NS,'font-family':FONT},document.body);makeDefs();
  // background
  const BG=el('g',{},SVG);el('rect',{width:SW,height:SH,fill:'url(#bgg)'},BG);
  if(LSN.grid!==false){const pid='bgp';const pt=el('pattern',{id:pid,width:f2(60*SU),height:f2(60*SU),patternUnits:'userSpaceOnUse'},DEFS);
    if(LSN.theme==='blueprint'||LSN.theme==='paper')el('path',{d:`M${f2(60*SU)},0 L0,0 0,${f2(60*SU)}`,fill:'none',stroke:TH.faint,'stroke-width':1},pt);else el('circle',{cx:f2(30*SU),cy:f2(30*SU),r:f2(1.6*SU),fill:TH.faint},pt);el('rect',{width:SW,height:SH,fill:`url(#${pid})`,opacity:.8},BG)}
  const dust=[];if(LSN.dust!==false&&LSN.theme!=='paper')for(let i=0;i<26;i++)dust.push(el('circle',{r:f2((1+seeded(i,1)*2.4)*SU),fill:i%3?TH.a1:TH.a5,opacity:f2(.08+seeded(i,2)*.14)},BG));
  {const wf=el('filter',{id:'whipblur',x:'-20%',y:'-5%',width:'140%',height:'110%'},DEFS);el('feGaussianBlur',{stdDeviation:`${40*SU} 0`},wf);const ic=el('clipPath',{id:'irisclip'},DEFS);IRIS=el('circle',{cx:SW/2,cy:SH/2,r:10},ic);const im=el('mask',{id:'irismask',maskUnits:'userSpaceOnUse',x:-SW,y:-SH,width:SW*3,height:SH*3},DEFS);el('rect',{x:-SW,y:-SH,width:SW*3,height:SH*3,fill:'#fff'},im);IRIS2=el('circle',{cx:SW/2,cy:SH/2,r:10,fill:'#000'},im)}
  ROOTG=el('g',{},SVG);const HUD=el('g',{},SVG);tzSetup(HUD);el('rect',{width:SW,height:SH,fill:'url(#vig)','pointer-events':'none'},SVG);const TOP=el('g',{},SVG);
  // ---- images & audio preload ----
  const srcs=new Set();const scan=o=>{if(!o||typeof o!=='object')return;for(const k in o){const v=o[k];if((k==='src'||k==='object'||k==='image')&&typeof v==='string'&&!/^(@|#)/.test(v))srcs.add(v);else if(typeof v==='object')scan(v)}};scan(LSN.scenes);
  await Promise.all([...srcs].map(src=>new Promise(res=>{const im=new Image();im.onload=()=>{SIMG[src]=im;res()};im.onerror=()=>{SERR.push('image not found: '+src+' (put the file next to the HTML or use a data: URI)');res()};im.src=src})));
  const AUD={};const dec=new OfflineAudioContext(2,48000,48000);const afiles=new Set([LSN.voice&&LSN.voice.file,LSN.music&&LSN.music.file,...(LSN.scenes||[]).map(s=>s.audio&&(s.audio.file||s.audio))].filter(x=>typeof x==='string'));
  await Promise.all([...afiles].map(async f=>{try{const ab=await (await fetch(f)).arrayBuffer();AUD[f]={ab,buf:await dec.decodeAudioData(ab.slice(0))}}catch(e){SERR.push('audio not found/decodable: '+f)}}));
  // ---- scenes ----
  if(!Array.isArray(LSN.scenes)||!LSN.scenes.length){SERR.push('LESSON needs scenes:[…]');LSN.scenes=[{kind:'title'}]}
  const REG={};let T0=0;const TRANS=.6;
  SCN=LSN.scenes.map((s,si)=>{const where=`scene ${si+1}${s.title?' "'+s.title+'"':''}`;Object.keys(s).forEach(k=>{if(!SCENE_KEYS.includes(k)){const n=near(k,SCENE_KEYS);SERR.push(`${where}: unknown key "${k}"${n&&n[1]<=3?' – did you mean "'+n[0]+'"?':''}`)}});
    LBLREC.length=0;const S={...s,i:si,g:el('g',{},ROOTG),cam:null,items:[],chunks:sayChunks(s.say)};S.cam=el('g',{id:'cam'+si},S.g);S.over=el('g',{},S.g);S.pin=el('g',{},S.g);S.cards=el('g',{},S.pin);
    let items=(s.items||[]).slice();
    if(s.kind==='title')items.unshift({type:'titleCard',text:s.title||LSN.title,subtitle:s.subtitle,_t:1});
    if(s.kind==='end')items.unshift({type:'summary',points:s.points||[],text:s.text,area:'full',at:.3,_t:1});
    if(s.kind==='quiz')items.unshift({type:'quiz',question:s.question,options:s.options,answer:s.answer,think:s.think,explain:s.explain,area:'full',at:.3,_t:1});
    const header=s.title&&!s.kind;let cursor=header?.8:.4,prevStart=cursor,end=0;
    if(header){const hg=el('g',{},S.g);S.hg=hg;if(LSN.headerScrim!==false)el('rect',{x:0,y:0,width:SW,height:f2((SH>SW?260:170)*SU),fill:gradient([[0,TH.bg,.92],[.6,TH.bg,.7],[1,TH.bg,0]])},hg);const hs=(SH>SW?58:52)*SU,hx=(SH>SW?96:96)*SU,hy=(SH>SW?190:108)*SU;const num=String(SCN_COUNT(si)).padStart(2,'0');
      const nb=el('g',{},hg);el('rect',{x:f2(hx),y:f2(hy-hs*.82),width:f2(hs*1.25),height:f2(hs*1.05),rx:f2(10*SU),fill:col('a1'),'fill-opacity':.16,stroke:col('a1'),'stroke-width':f2(2*SU)},nb);textEl(nb,num,hx+hs*.625,hy-hs*.06,{size:hs*.55,weight:800,anchor:'middle',color:'a1',fam:MONOF});
      let hs2=hs;const hmax=SW-hx*2-hs*1.6-(LSN.brand?160*SU:0);while(hs2>hs*.62&&tw(String(s.title).replace(/\*/g,''),hs2,800)>hmax)hs2*=.95;let ht=String(s.title);if(tw(ht.replace(/\*/g,''),hs2,800)>hmax){SERR_WARN.push(`scene ${si+1}: title too long for one line — shorten it (max ~${Math.round(hmax/(hs2*.55))} characters)`);while(ht.length>8&&tw(ht.replace(/\*/g,'')+'…',hs2,800)>hmax)ht=ht.replace(/\s*\S+\s*$/,'');ht+='…'}const TT=typeof s.typo==='object'&&s.typo.title||typeof LSN.typo==='object'&&LSN.typo.title||(LSN.typo===false||s.typo===false?'slide-left':TYPO.pick('title',si*3+1));const HB=TYPO.block(hg,[{s:ht,x:hx+hs*1.6,y:hy,size:hs2,weight:800,accent:'a2',p:0}],{in:TT});S.titleFx=TT;
      const ul=el('rect',{x:f2(hx+hs*1.6),y:f2(hy+16*SU),width:0,height:f2(4*SU),rx:f2(2*SU),fill:col('a1')},hg);const hw=Math.min(tw(ht.replace(/\*/g,''),hs2,800),SW-hx*2-hs*1.6);
      S.header=lt=>{HB.update(lt,.05,S.dur);nb.setAttribute('opacity',f2(prog(lt,0,.4)));ul.setAttribute('width',f2(hw*.22*E.inOutCubic(prog(lt,.4,1.1))))}}
    items.forEach((it0,ii)=>{const iw=`${where} item ${ii+1} (${it0.type})`;const it=alias({...it0});const B=SM.items[it.type];
      if(!B){const n=near(String(it.type),Object.keys(SM.items));SERR.push(`${iw}: unknown type "${it.type}"${n?' – did you mean "'+n[0]+'"?':''}`);return}
      if(it.area&&!Array.isArray(it.box)&&!areas()[it.area])SERR.push(`${iw}: unknown area "${it.area}" → ${Object.keys(areas()).join(', ')}`);
      ['from','to'].forEach(k=>{it[k]=resolvePt(it[k],REG,iw)});if(it.on){const p=resolvePt(it.on,REG,iw);if(Array.isArray(p)){it.x=p[0];it.y=p[1]}}
      if(typeof it.at==='string'&&it.at[0]==='@'){const p=resolvePt(it.at,REG,iw);it.x=p[0];it.y=p[1];delete it.at}
      let start;if(typeof it.at==='number')start=it.at;else if(typeof it.at==='string'&&/^[+-]/.test(it.at))start=prevStart+parseFloat(it.at);else if(it.with)start=prevStart;else start=cursor;
      const wrap=el('g',{},S.cam);let R;BUILDHOST=wrap;try{R=B.build(it,{scene:S,REG})}catch(e){BUILDHOST=null;wrap.remove();SERR.push(`${iw}: ${e.message}`);console.error(e);return}BUILDHOST=null;
      wrap.appendChild(R.g);if(R.overlay)S.over.appendChild(wrap);else if(R.pin&&LSN.pinText!==false)S.pin.appendChild(wrap);let bb={x:SW/2,y:SH/2,width:0,height:0};try{bb=wrap.getBBox()}catch(e){}
      const center=R.anchor||[bb.x+bb.width/2,bb.y+bb.height/2];if(it.id)REG[it.id]={anchors:R.anchors||{},center,frame:R.frame,R};
      const ent=it.dur??ENT[it.type]??1.4;const anim=it.anim||ANIM_DEF[it.type]||'grow';const drs=R.noDraw?[]:[...wrap.querySelectorAll('.dr')];
      const len=R.len?R.len():ent;const o={it,wrap,R,start,ent,anim,drs,center,where:iw,errd:false,pinned:wrap.parentNode===S.pin};S.items.push(o);
      prevStart=start;cursor=Math.max(cursor,start+(it.wait??(len*.8+.45)));end=Math.max(end,start+len)});
    // ---- layout guard: floating objects (magnifier, formulas, pictures, small diagrams) never cover text and never leave the frame ----
    if(LSN.layoutGuard!==false){try{const inv=S.cam.getScreenCTM().inverse();const bxo=e=>{const r=e.getBBox();const m=inv.multiply(e.getScreenCTM());const P=[[r.x,r.y],[r.x+r.width,r.y],[r.x,r.y+r.height],[r.x+r.width,r.y+r.height]].map(([x,y])=>[m.a*x+m.c*y+m.e,m.b*x+m.d*y+m.f]);const xs=P.map(p=>p[0]),ys=P.map(p=>p[1]);return {x:Math.min(...xs),y:Math.min(...ys),w:Math.max(...xs)-Math.min(...xs),h:Math.max(...ys)-Math.min(...ys)}};
      const V=SH>SW,top=(header?(V?230:150):24)*SU,bot=(s.say&&LSN.captions!==false?(V?360:140):24)*SU,SAFE={x:24*SU,y:top,w:SW-48*SU,h:SH-top-bot};
      const ov=(a,b,g=0)=>Math.max(0,Math.min(a.x+a.w,b.x+b.w)+g-Math.max(a.x,b.x))*Math.max(0,Math.min(a.y+a.h,b.y+b.h)+g-Math.max(a.y,b.y));
      const inside=(b,t=1)=>b.x>=SAFE.x-t&&b.y>=SAFE.y-t&&b.x+b.w<=SAFE.x+SAFE.w+t&&b.y+b.h<=SAFE.y+SAFE.h+t;
      const TXT=[];S.items.forEach(o=>{if(o.pinned){const b=bxo(o.wrap);if(b.w){TXT.push(b);o.tb=b}}});
      TXT.forEach((a,i)=>TXT.forEach((b,j)=>{if(j>i&&ov(a,b)>.05*Math.min(a.w*a.h,b.w*b.h))SERR_WARN.push(`scene ${si+1}: two text blocks overlap — give them different areas`)}));
      const IJ=JSON.stringify(s.items||[]);const refd=id=>id&&IJ.includes('"@'+id);
      const FIXED=new Set(['text','arrow','label','pulse','shape','spotlight','titleCard','summary','quiz','fire','smoke','water','rain','snow','bubbles','sparks','lightning','rays','explosion','glowOrb']);
      const soft=[];S.items.forEach(o=>{if(!o.pinned&&o.it.type!=='magnifier'){try{const b=bxo(o.wrap);if(b.w*b.h<SW*SH*.6)soft.push({o,b})}catch(e){}}});
      const placed=TXT.slice();
      const spot=(b,avoidSoft,self)=>{for(let rr=0;rr<=Math.max(SW,SH);rr+=24*SU){const n=rr?Math.max(8,Math.round(rr/(18*SU))):1;for(let k=0;k<n;k++){const a=k/n*TAU;const c={x:b.x+Math.cos(a)*rr,y:b.y+Math.sin(a)*rr,w:b.w,h:b.h};if(!inside(c))continue;if(placed.some(p=>ov(p,c,14*SU)>0))continue;if(avoidSoft&&soft.some(q=>q.o!==self&&ov(q.b,c,8*SU)>0))continue;return c}}return null};
      const move=(o,dx,dy)=>{if(!o.fix){o.fix=el('g',{},o.wrap);o.fix.appendChild(o.R.g)}o.fix.setAttribute('transform',`translate(${f2(dx)} ${f2(dy)})`);o.center=[o.center[0]+dx,o.center[1]+dy];const r=o.it.id&&REG[o.it.id];if(r){r.center=[r.center[0]+dx,r.center[1]+dy];for(const k in r.anchors){const v=r.anchors[k];if(Array.isArray(v))r.anchors[k]=[v[0]+dx,v[1]+dy]}}};
      const lenses=[];[...S.items.filter(o=>o.it.type!=='magnifier'),...S.items.filter(o=>o.it.type==='magnifier')].forEach(o=>{const t=o.it.type;
        if(t==='magnifier'&&o.R.setLens){const hard=TXT.concat(lenses);const L=o.R.lens();const lb=(x,y,r)=>{const w=Math.max(r*2,L.lw||0);return {x:x-w/2,y:y-r,w,h:r*2+(L.label?70*SU:0)}};const tg={x:L.tx-L.r/L.z-30*SU,y:L.ty-L.r/L.z-30*SU,w:2*L.r/L.z+60*SU,h:2*L.r/L.z+60*SU};
          const sc=c=>soft.reduce((a,q)=>a+ov(q.b,c),0)+ov(tg,c)*6;let cur=lb(L.lx,L.ly,L.r);
          if(!inside(cur,4)||hard.some(p=>ov(p,cur,10*SU)>0)||(L.auto&&sc(cur)>cur.w*cur.h*.25)){let best=null;
            for(const k of [1,.86,.74,.62,.52]){const r=L.r*k;const hw=Math.max(r,(L.lw||0)/2);for(let x=SAFE.x+hw;x<=SAFE.x+SAFE.w-hw;x+=30*SU)for(let y=SAFE.y+r;y<=SAFE.y+SAFE.h-r-(L.label?70*SU:0);y+=30*SU){const c=lb(x,y,r);if(hard.some(p=>ov(p,c,12*SU)>0))continue;const v=sc(c)/(c.w*c.h)*4+Math.hypot(x-L.tx,y-L.ty)/SW*.6+(1-k)*1.5;if(!best||v<best.v)best={v,x,y,r}}}
            if(best){o.R.setLens(best.x,best.y,best.r);cur=lb(best.x,best.y,best.r)}else SERR_WARN.push(`scene ${si+1}: no free place for the magnifier — text would be covered; use a smaller r or less text`)}
          lenses.push(cur);placed.push(cur)}
        else if(!o.pinned&&!FIXED.has(t)&&!o.it.lock&&!refd(o.it.id)){let b;try{b=bxo(o.wrap)}catch(e){return}if(!b.w||b.w*b.h>SW*SH*.35)return;
          const hit=placed.some(p=>ov(p,b)>.04*b.w*b.h);const fits=b.w<=SAFE.w&&b.h<=SAFE.h;
          if((hit||!inside(b,6))&&fits){const c=spot(b,true,o)||spot(b,false,o);if(c){move(o,c.x-b.x,c.y-b.y);b=c}else SERR_WARN.push(`scene ${si+1}: ${t} covers text and no free place was found — use another area`)}
          placed.push(b)}});
      if(s.camera&&s.camera!=='auto'){S.hasCards=true;S.items.forEach(o=>{if(o.tb){const b=o.tb,px=30*SU,py=24*SU;o.card=el('rect',{x:f2(b.x-px),y:f2(b.y-py),width:f2(b.w+px*2),height:f2(b.h+py*2),rx:f2(22*SU),fill:TH.bg,'fill-opacity':.94,stroke:TH.faint,'stroke-width':f2(1.5*SU),opacity:0},S.cards)}})}
    }catch(e){console.warn('layoutGuard',e)}}
    // ---- text guard: labels never overlap other texts, the header band or the caption band ----
    if(LSN.textGuard!==false&&LBLREC.length){try{const inv=S.cam.getScreenCTM().inverse();const bbx=e=>{const r=e.getBBox();const m=inv.multiply(e.getScreenCTM());const P=[[r.x,r.y],[r.x+r.width,r.y],[r.x,r.y+r.height],[r.x+r.width,r.y+r.height]].map(([x,y])=>[m.a*x+m.c*y+m.e,m.b*x+m.d*y+m.f]);const xs=P.map(p=>p[0]),ys=P.map(p=>p[1]);return {x:Math.min(...xs),y:Math.min(...ys),w:Math.max(...xs)-Math.min(...xs),h:Math.max(...ys)-Math.min(...ys)}};
      const mine=new Set(LBLREC.map(r=>r.tx));const obs=[...S.cam.querySelectorAll('text')].filter(t=>!mine.has(t)&&t.textContent.trim()).map(t=>({...bbx(t),fixed:true}));S.items.forEach(o=>{if(o.pinned){try{const b=bbx(o.wrap);if(b.w)obs.push({...b,fixed:true})}catch(e){}}});
      if(header)obs.push({x:0,y:0,w:SW,h:(SH>SW?230:150)*SU,fixed:true});if(LSN.captions!==false&&s.say)obs.push({x:SW*.12,y:SH-(SH>SW?360:135)*SU,w:SW*.76,h:(SH>SW?360:135)*SU,fixed:true});
      const L=LBLREC.map(r=>({...bbx(r.tx),rec:r}));const out=TL.relax([...obs,...L],{gap:8*SU,bounds:{x:0,y:(header?(SH>SW?230:150):20)*SU,w:SW,h:SH-(header?(SH>SW?230:150):20)*SU-(s.say?(SH>SW?360:135):20)*SU},iterations:80});
      out.slice(obs.length).forEach((r,k)=>{const o0=L[k];const dy=r.y-o0.y;if(Math.abs(dy)>.5)o0.rec.move(o0.rec.ty+dy)});
      const rest=TL.relax([],{});const left=[];out.forEach((a,i)=>out.forEach((b,j)=>{if(j>i&&TL.hits(a,b,-2)&&!(a.fixed&&b.fixed))left.push(1)}));if(left.length)SERR_WARN.push(`scene ${si+1}: ${left.length} label(s) still crowded — use fewer labels or a bigger area`)}catch(e){console.warn('textGuard',e)}}
    if(LBLREC.length){try{const inv=S.cam.getScreenCTM().inverse();S.lbls=LBLREC.filter(r=>r.g).map(r=>{const b=r.tx.getBBox(),m=inv.multiply(r.tx.getScreenCTM());const P=[[b.x,b.y],[b.x+b.width,b.y+b.height]].map(([x,y])=>[m.a*x+m.c*y+m.e,m.b*x+m.d*y+m.f]);return {rec:r,x1:Math.min(P[0][0],P[1][0]),x2:Math.max(P[0][0],P[1][0]),y1:Math.min(P[0][1],P[1][1]),y2:Math.max(P[0][1],P[1][1])}})}catch(e){}}
    LBLREC.length=0;
    const wc=x=>String(x||'').replace(/[*]/g,' ').split(/\s+/).filter(Boolean).length;const pace=s.pace??LSN.pace??1;const capW=wc(s.say);const scrW=(s.items||[]).reduce((a,it)=>a+(it.type==='text'?wc(it.text??it.content??it.value):0),0)+(s.kind==='end'?wc((s.points||[]).join(' ')):0);const sayNeed=capW?(capW/2.3+S.chunks.length*.3+1)*pace:0,readNeed=scrW?(scrW/3+1)*pace:0;const sayDur=capW?sayNeed+readNeed*.45:readNeed;S.need=sayDur;const ad=s.audio&&AUD[s.audio.file||s.audio]?AUD[s.audio.file||s.audio].buf.duration+.9:0;
    S.dur=s.dur??Math.max(end+(s.hold??2.2),sayDur,ad?ad+readNeed*.25:0,s.kind==='title'?4.5:2.5);if(s.dur!=null&&s.dur<sayDur*.8)SERR_WARN.push(`scene ${si+1}: dur ${s.dur}s is too short for its text/subtitles (needs ~${Math.ceil(sayDur)}s) — remove dur, the engine times scenes from the text`);
    {const want=s.transition||(s.dive?'dive':null)||LSN.transition||'auto';S.tz=(want==='auto'||want==='random')?autoTz(si):want;if(!TZ_ALL.includes(S.tz)){SERR.push(`scene ${si+1}: unknown transition "${S.tz}" → ${TZ_ALL.join(', ')}`);S.tz='fade'}S.camK=camPreset(s.camera,S,si)}S.start=T0;T0+=S.dur;
    // focus windows
    S.focus=[].concat(s.focus||[]).map(f=>({...f,ids:[].concat(f.on||f.id||[])}));
    // captions schedule
    let tot=S.chunks.reduce((a,c)=>a+c.length,0),acc=0;S.cap=S.chunks.map(c=>{const a=.25+acc/tot*(S.dur-.5);acc+=c.length;return {text:c,a,b:.25+acc/tot*(S.dur-.5)}});
    return S});
  SCN.forEach(S=>S.g.style.display='none');
  function SCN_COUNT(si){let n=0;for(let k=0;k<=si;k++)if(LSN.scenes[k].title&&!LSN.scenes[k].kind)n++;return n}
  SDUR=Math.max(1,T0);const DUR=SDUR;
  // ---- captions + progress (HUD, outside camera) ----
  const capOn=LSN.captions!==false&&!q.has('nocap');const capG=el('g',{},HUD);const capBg=el('rect',{rx:f2(16*SU),fill:'rgba(0,0,0,.55)'},capG);const capT=[0,1,2].map(()=>el('text',{'font-size':f2(36*SU),'font-weight':600,fill:'#fff','text-anchor':'middle','font-family':FONT},capG));
  const capY=SH-(SH>SW?300:70)*SU;let lastCap=null;
  const setCap=(txt,op)=>{if(!capOn||!txt){capG.setAttribute('opacity',0);return}if(txt!==lastCap){lastCap=txt;const ls=wrapText(txt,36*SU,SW*(SH>SW?.84:.7),600).slice(0,3);const lh=46*SU;
      capT.forEach((t,i)=>{richT(t,ls[i]||'',TH.a2);at(t,{x:SW/2,y:f2(capY-(ls.length-1-i)*lh)})});const w=Math.max(...ls.map(l=>tw(l.replace(/\*/g,''),36*SU,600)))+60*SU;at(capBg,{x:f2(SW/2-w/2),y:f2(capY-(ls.length-1)*lh-40*SU),width:f2(w),height:f2((ls.length-1)*lh+60*SU)})}capG.setAttribute('opacity',f2(op))};
  const progG=el('g',{},HUD);const pOn=LSN.progress!==false;el('rect',{x:0,y:f2(SH-5*SU),width:SW,height:f2(5*SU),fill:TH.faint},progG);const pFill=el('rect',{x:0,y:f2(SH-5*SU),width:0,height:f2(5*SU),fill:col('a1')},progG);
  SCN.forEach(s=>{if(s.i)el('rect',{x:f2(s.start/DUR*SW-1.5*SU),y:f2(SH-5*SU),width:f2(3*SU),height:f2(5*SU),fill:TH.bg},progG)});if(!pOn)progG.style.display='none';
  const brand=LSN.brand?textEl(HUD,LSN.brand,SW-40*SU,(SH>SW?100:58)*SU,{size:24*SU,weight:700,anchor:'end',color:'dim',ls:2*SU}):null;
  // ---- guides overlay (G key / ?guides=1): stage grid + named areas so coordinates are never guessed ----
  const GU=el('g',{opacity:.9},TOP);GU.style.display=q.has('guides')?'':'none';{const step=100;for(let x=0;x<=SW;x+=step){el('line',{x1:x,y1:0,x2:x,y2:SH,stroke:'#ff0',opacity:x%500?.15:.4},GU);if(x%200===0)textEl(GU,String(x),x+4,16,{size:14,color:'#ff0',fam:MONOF})}
    for(let y=0;y<=SH;y+=step){el('line',{x1:0,y1:y,x2:SW,y2:y,stroke:'#ff0',opacity:y%500?.15:.4},GU);if(y%200===0)textEl(GU,String(y),4,y-4,{size:14,color:'#ff0',fam:MONOF})}
    const A=areas();['full','left','right','top','bottom'].forEach((k,i)=>{const [x,y,w,h]=A[k];el('rect',{x,y,width:w,height:h,fill:'none',stroke:['#0ff','#f0f','#0f0','#fa0','#f55'][i],'stroke-dasharray':'8 6','stroke-width':2},GU);textEl(GU,k,x+8,y+22+i*20,{size:18,color:['#0ff','#f0f','#0f0','#fa0','#f55'][i],fam:MONOF})})}
  // ---- render(t) ----
  const sceneAt=t=>{for(let i=SCN.length-1;i>=0;i--)if(t>=SCN[i].start)return i;return 0};
  function camAt(S,lt){let cx=SW/2,cy=SH/2,z=1,rot=0,tilt=0;const C=S.camK;const pt=v=>{if(Array.isArray(v))return v;if(typeof v==='string'&&v[0]==='@'){const r=REG[v.slice(1).split('.')[0]];if(r&&r.R&&!v.includes('.')){const k=r.R.track?r.R.track():r.R.g&&r.R.g.__tk;if(k)return k}}return resolvePt(v,REG,`scene ${S.i+1} camera`)};
    if(C){const K=Array.isArray(C)?C:[C];let cur={x:SW/2,y:SH/2,z:1,r:0,tl:0};K.forEach(k=>{const p=(k.on||k.follow)?pt(k.on||k.follow):[k.x??cur.x,k.y??cur.y];const t0=k.t??k.at??0,d=k.dur??1.2;const u=(E[k.ease]||E.inOutCubic)(prog(lt,t0,t0+d));
        cur={x:lerp(cur.x,p[0],u),y:lerp(cur.y,p[1],u),z:lerp(cur.z,k.zoom??cur.z,u),r:lerp(cur.r,k.rotate??cur.r,u),tl:lerp(cur.tl,k.tilt??cur.tl,u)}});cx=cur.x;cy=cur.y;z=cur.z;rot=cur.r;tilt=cur.tl}
    
    let sx=0,sy=0;const hh=(LSN.handheld===true?6:LSN.handheld||0)*SU;if(hh){sx+=noise3(lt*.6,1.3)*hh;sy+=noise3(lt*.6,7.1)*hh}
    (S.shake||[]).forEach(k=>{const t0=k.t??k.at??0,d=k.dur??.6;if(lt>=t0&&lt<t0+d){const a=(k.amp??18)*SU*(1-(lt-t0)/d)**2;sx+=noise3(lt*25,3)*a;sy+=noise3(lt*25,9)*a}});return {cx,cy,z,rot,tilt,sx,sy}}
  function drawScene(S,lt,op,dir,tz0,pp){S.g.style.display='';S.g.setAttribute('opacity',f2(op));S.g.removeAttribute('filter');S.g.removeAttribute('clip-path');S.g.removeAttribute('mask');
    const tz=tz0||S.tz||'fade';let tf='';
    if(op<1){const u=1-op;if(tz==='zoom')tf=`translate(${SW/2} ${SH/2}) scale(${f2(1+dir*u*.08)}) translate(${-SW/2} ${-SH/2})`;else if(tz==='slide')tf=`translate(${f2(dir*-u*120*SU)} 0)`;
      else if(tz==='whip'){tf=`translate(${f2(dir*-u*SW*.6)} 0)`;S.g.setAttribute('filter','url(#whipblur)');S.g.setAttribute('opacity',f2(Math.min(1,op*1.6)))}
      else if(tz==='dive'){if(dir<0){const D=SCN[S.i+1]&&SCN[S.i+1].dive;const p=D?(Array.isArray(D)?D:resolvePt(D,REG,'dive')):[SW/2,SH/2];const k=1+u*u*7;tf=`translate(${f2(p[0])} ${f2(p[1])}) scale(${f2(k)}) translate(${f2(-p[0])} ${f2(-p[1])})`;S.g.setAttribute('opacity',f2(clamp(op*1.4)))}
        else{const k=.25+.75*(1-u);tf=`translate(${SW/2} ${SH/2}) scale(${f2(k)}) translate(${-SW/2} ${-SH/2})`}}
      else if(tz==='iris'&&dir>0){S.g.setAttribute('opacity',1);S.g.setAttribute('clip-path','url(#irisclip)')}
      else if(tz==='iris'){S.g.setAttribute('opacity',1);S.g.setAttribute('mask','url(#irismask)')}
      else if(TZ_CLIP.has(tz)){S.g.setAttribute('opacity',1);S.g.setAttribute(dir>0?'clip-path':'mask',dir>0?'url(#tzclip)':'url(#tzmask)')}
      else if(tz.startsWith('push-')){S.g.setAttribute('opacity',1);const P_=pp??(dir>0?op:1-op);const k=dir>0?1-P_:-P_;const D={'push-left':[SW,0],'push-right':[-SW,0],'push-up':[0,SH],'push-down':[0,-SH]}[tz]||[SW,0];tf=`translate(${f2(D[0]*k)} ${f2(D[1]*k)})`}
      else if(tz==='flip'){const P_=pp??(dir>0?op:1-op);let sx=dir<0?1-P_*2:P_*2-1;S.g.setAttribute('opacity',sx>0?1:0);sx=Math.max(.001,E.outCubic(clamp(sx)));tf=`translate(${SW/2} ${SH/2}) scale(${f2(sx)} ${f2(1-.06*(1-sx))}) translate(${-SW/2} ${-SH/2})`}
      else if(tz==='spin'){const P_=dir>0?op:1-op;const a=dir>0?(1-P_)*-10:P_*10,sc=dir>0?.8+.2*P_:1+.25*P_;tf=`translate(${SW/2} ${SH/2}) rotate(${f2(a)}) scale(${f2(sc)}) translate(${-SW/2} ${-SH/2})`}
      else if(tz==='zoom-out'){const P_=dir>0?op:1-op;const sc=dir>0?1.3-.3*P_:1-.15*P_;tf=`translate(${SW/2} ${SH/2}) scale(${f2(sc)}) translate(${-SW/2} ${-SH/2})`}
      else if(tz==='blur'){const n=Math.round(u*3);if(n>0)S.g.setAttribute('filter',`url(#tzb${n})`)}
      else if(tz==='page'){const P_=pp??(dir>0?op:1-op);S.g.setAttribute('opacity',1);if(dir<0){if(!S.sheet){S.sheet=el('g',{});el('rect',{width:SW,height:SH,fill:'url(#bgg)'},S.sheet);if(document.getElementById('bgp'))el('rect',{width:SW,height:SH,fill:'url(#bgp)',opacity:.8},S.sheet);S.g.insertBefore(S.sheet,S.g.firstChild)}S.sheet.style.display='';const e=E.inCubic(P_);tf=`translate(${f2(-SW*.04*e)} ${f2(-SH*1.12*e)}) rotate(${f2(-5*e)} ${SW/2} ${SH})`;S.g.setAttribute('filter','url(#pageSh)')}else{const sc=.95+.05*P_;tf=`translate(${SW/2} ${SH/2}) scale(${f2(sc)}) translate(${-SW/2} ${-SH/2})`}}
      else tf=`translate(0 ${f2(dir*-u*18*SU)})`}
    if(S.sheet&&!(op<1&&tz==='page'&&dir<0))S.sheet.style.display='none';

    S.g.setAttribute('transform',tf);S.cs=camAt(S,lt);
    S.header&&S.header(lt);if(S.hg)S.hg.setAttribute('opacity',dir<0?0:1);
    S.items.forEach(o=>{const {it,wrap,R,start,ent,anim}=o;if(lt<start-.001&&anim!=='none'){wrap.style.display='none';return}wrap.style.display='';
      const p=clamp((lt-start)/ent);const e=E.outCubic(p);let opa=1,tfm='';const [ax,ay]=o.center;
      if(R.selfAnim){}else if(anim==='fade')opa=e;else if(anim==='rise'){opa=e;tfm=`translate(0 ${f2((1-e)*36*SU)})`}else if(anim==='pop'){const s=E.outBack(p);opa=clamp(p*3);tfm=`translate(${f2(ax)} ${f2(ay)}) scale(${f2(Math.max(.01,s))}) translate(${f2(-ax)} ${f2(-ay)})`}
      else if(anim==='grow'){opa=e;const s=.92+.08*e;tfm=`translate(${f2(ax)} ${f2(ay)}) scale(${f2(s)}) translate(${f2(-ax)} ${f2(-ay)})`}else if(anim==='zoom'){opa=e;const s=1.25-.25*e;tfm=`translate(${f2(ax)} ${f2(ay)}) scale(${f2(s)}) translate(${f2(-ax)} ${f2(-ay)})`}
      else if(anim==='slide-left'||anim==='slide-right'){opa=e;tfm=`translate(${f2((1-e)*(anim==='slide-left'?-1:1)*120*SU)} 0)`}else if(anim==='draw'){opa=o.drs.length?clamp(p*5):e}
      if(o.drs.length){const dp=anim==='draw'?E.inOutCubic(p):1;o.drs.forEach(d=>{if(dp>=1){d.style.strokeDasharray='none';d.style.strokeDashoffset=0}else{d.style.strokeDasharray='1 1';d.style.strokeDashoffset=f2(1-dp)}})}
      if(it.out!=null&&!R.selfOut)opa*=1-prog(lt,it.out,it.out+.5);
      // focus: dim items not in focus
      let blurIt=false;S.focus.forEach(f=>{const a=f.at??0,b=f.to??S.dur;const k=prog(lt,a,a+.4)*(1-prog(lt,b,b+.4));if(k>0&&!f.ids.includes(it.id)&&!it._t){opa*=1-(f.blur?.45:.72)*k;if(f.blur&&k>.3)blurIt=true}});wrap.setAttribute('filter',blurIt?'url(#blur10)':'');
      if(it.opacity!=null)opa*=it.opacity;wrap.setAttribute('opacity',f2(opa));wrap.setAttribute('transform',tfm);
      if(R.update&&!o.errd){try{R.update(lt,p,start,S.dur)}catch(e){o.errd=true;SERR.push(`${o.where} update: ${e.message}`);console.error(e);showErr()}}});
    {const c2=S.cs=camAt(S,lt);if(S.hasCards){const mv=clamp(Math.max((c2.z-1.06)/.08,(Math.hypot(c2.cx-SW/2,c2.cy-SH/2)-50*SU)/(80*SU)));S.items.forEach(o=>{if(o.card)o.card.setAttribute('opacity',f2(o.wrap.style.display==='none'?0:mv*.95*(+o.wrap.getAttribute('opacity')||0)))})}S.cam.setAttribute('transform',`translate(${f2(SW/2+c2.sx)} ${f2(SH/2+c2.sy)}) rotate(${f2(c2.rot)}) scale(${f2(c2.z)},${f2(c2.z*Math.cos(c2.tilt*Math.PI/180))}) translate(${f2(-c2.cx)} ${f2(-c2.cy)})`);{const moved=Math.abs(c2.z-1)>.03||Math.abs(c2.cx-SW/2)>4*SU||Math.abs(c2.cy-SH/2)>4*SU||Math.abs(c2.rot)>.5;if(!S.allT)S.allT=[...S.cam.querySelectorAll('text')].filter(t=>!(S.lbls||[]).some(o=>o.rec.tx===t));
      if(moved&&LSN.edgeFade!==false){const R0=SVG.getBoundingClientRect(),k=SW/R0.width,m=16*SU;S.allT.forEach(t=>{const r=t.getBoundingClientRect();if(!r.width){return}const X1=(r.left-R0.left)*k,X2=(r.right-R0.left)*k,Y1=(r.top-R0.top)*k,Y2=(r.bottom-R0.top)*k;const out=Math.max(0,m-X1,X2-(SW-m),m-Y1,Y2-(SH-m));t.style.opacity=out>0?f2(clamp(1-out/(24*SU))):'';S._ef=true})}
      else if(S._ef){S.allT.forEach(t=>t.style.opacity='');S._ef=false}}if(S.lbls){const m=24*SU,zy=c2.z*Math.cos(c2.tilt*Math.PI/180);S.lbls.forEach(o=>{const X1=SW/2+c2.sx+(o.x1-c2.cx)*c2.z,X2=SW/2+c2.sx+(o.x2-c2.cx)*c2.z,Y1=SH/2+c2.sy+(o.y1-c2.cy)*zy,Y2=SH/2+c2.sy+(o.y2-c2.cy)*zy;const out=Math.max(0,m-X1,X2-(SW-m),(S.header?150*SU:m)-Y1,Y2-(SH-m));o.rec.g.setAttribute('opacity',f2(clamp(1-out/(30*SU))))})}}
    // captions
    const c=S.cap.find(c=>lt>=c.a&&lt<c.b);if(c&&op>.5)setCap(c.text,Math.min(prog(lt,c.a,c.a+.25),1-prog(lt,c.b-.2,c.b))*1);else if(op>.5)setCap(null)}
  function render(t){t=clamp(t,0,DUR-1e-4);TZB.style.display='none';const i=sceneAt(t);SCN.forEach(s=>s.g.style.display='none');const S=SCN[i],lt=t-S.start;
    const TZ=S.tz||'fade';const TR=TZ_DUR[TZ]||TRANS;
    if(i>0&&lt<TR){const P=SCN[i-1];if(TZ==='iris'){const r=f2(Math.hypot(SW,SH)*.56*E.inOutCubic(clamp(lt/TR)));IRIS.setAttribute('r',r);IRIS2.setAttribute('r',r)}if(TZ_CLIP.has(TZ))tzClip(TZ,E.inOutCubic(clamp(lt/TR)));drawScene(P,P.dur+lt,TZ==='iris'||TZ_CLIP.has(TZ)||TZ_KEEP.has(TZ)?.999:1-E.inOutCubic(lt/TR),-1,TZ,E.inOutCubic(clamp(lt/TR)))}
    drawScene(S,lt,i>0?E.inOutCubic(clamp(lt/TR)):1,1,TZ);
    if(LSN.parallax!==false&&S.cs){const c=S.cs;BG.setAttribute('transform',`translate(${f2(SW/2)} ${f2(SH/2)}) scale(${f2(1+(c.z-1)*.12)}) translate(${f2(-SW/2-(c.cx-SW/2)*.12+c.sx*.3)} ${f2(-SH/2-(c.cy-SH/2)*.12+c.sy*.3)})`)}if(i===0&&S.kind!=='title')S.g.setAttribute('opacity',f2(clamp(t/.5)));
    if(i>0&&lt<TR){ROOTG.appendChild(TZ==='page'?SCN[i-1].g:S.g)}
    dust.forEach((d,k)=>{const sp=.004+seeded(k,3)*.008;at(d,{cx:f2(((seeded(k,4)+t*sp*(k%2?1:-1))%1+1)%1*SW),cy:f2(((seeded(k,5)-t*sp*.6)%1+1)%1*SH)})});
    pFill.setAttribute('width',f2(t/DUR*SW));if(!S.cap.length)setCap(null)}
  // ---- audio score (deterministic; WebAudio live + OfflineAudioContext export) ----
  const MUS=LSN.music===undefined?'calm':LSN.music;const SFX=LSN.sfx!==false;
  function scheduleAudio(t0,ac,from=0){const A=makeMixer(ac);const tt=x=>t0+x-from;const ok=x=>x>=from-.01;
    if(AUD.__voice);const vf=LSN.voice&&LSN.voice.file;const hasVoice=!!vf||SCN.some(s=>s.audio);
    if(MUS&&typeof MUS==='string'&&PROG[MUS]){const pr=PROG[MUS];const nb=Math.ceil((DUR+1)/BAR);const vol=(LSN.musicVolume??1)*(hasVoice?.55:1);
      for(let b=0;b<nb;b++){const at0=b*BAR;if(at0+BAR<from)continue;const [r,ty]=pr[b%pr.length];const fade=Math.min(1,(DUR-at0)/BAR);
        if(ok(at0))A.pad(tt(at0),chord(r,ty,3),BAR*1.02,.06*vol*fade);
        for(let k=0;k<8;k++){const x=at0+k*BEAT/2;if(!ok(x)||x>DUR-1)continue;if(seeded(b*8+k,7)<.55){const ch=chord(r,ty,4);A.pluck(tt(x),ch[(k*2+b)%ch.length],.055*vol,(seeded(k,3)-.5)*.6)}}
        if(ok(at0)&&b%2===0)A.bass(tt(at0),chord(r,ty,1)[0]*1,BAR*.9,.09*vol)}}
    const mf=LSN.music&&LSN.music.file;if(mf&&AUD[mf]){const off=Math.max(0,from);A.sample(tt(Math.max(from,0)),AUD[mf].buf,{gain:LSN.music.gain??.5,bus:'music',offset:off,dur:Math.max(.1,DUR-off),fadeOut:1.5})}
    if(vf&&AUD[vf]){const off=Math.max(0,from-(LSN.voice.at||0));if(off<AUD[vf].buf.duration)A.sample(tt(Math.max(from,LSN.voice.at||0)),AUD[vf].buf,{gain:LSN.voice.gain??1,bus:'fx',offset:off})}
    SCN.forEach(S=>{const af=S.audio&&(S.audio.file||S.audio);if(af&&AUD[af]){const a0=S.start+(S.audio.at??.4);const off=Math.max(0,from-a0);if(off<AUD[af].buf.duration)A.sample(tt(Math.max(from,a0)),AUD[af].buf,{gain:S.audio.gain??1,bus:'fx',offset:off})}
      if(!SFX)return;if(S.i>0&&ok(S.start))A.whoosh(tt(S.start+.15),.12,.4);
      S.items.forEach((o,k)=>{const x=S.start+o.start;if(!ok(x)||o.it._t||o.it.sfx===false)return;const big=['explosion','lightning'].includes(o.it.type);if(big){A.impact(tt(x+(o.it.type==='explosion'?0:0)),.35);return}
        A.blip(tt(x),scaleNote('C','penta',(k*2+S.i)%7,5),.025,(seeded(k,9)-.5)*.5)});
      if(S.kind==='quiz'){const qi=S.items.find(o=>o.it.type==='quiz');if(qi){const th=qi.it.think??5,t1=S.start+qi.start+1.3+(qi.it.options||[]).length*.25;for(let k=0;k<Math.floor(th);k++)if(ok(t1+k))A.tick(tt(t1+k),.05);if(ok(t1+th))A.blip(tt(t1+th),1568,.07)}}});
    return A}
  // ---- hooks for render-lite / qa-sheet ----
  window.__DUR=DUR;window.__FPS=FPS;window.__W=SW;window.__H=SH;window.__seek=t=>{playing=false;render(t)};
  window.__scenes=SCN.map(s=>({title:s.title||s.kind||'',start:+s.start.toFixed(3),dur:+s.dur.toFixed(3),items:s.items.map(o=>o.it.type+'@'+o.start.toFixed(1))}));
  window.__qa=SCN.map(s=>+(s.start+Math.min(s.dur*.72,s.dur-.2)).toFixed(3));
  window.__renderAudio=async()=>{const sr=48000,oac=new OfflineAudioContext(2,Math.ceil(sr*(DUR+.5)),sr);scheduleAudio(0,oac);
    const buf=await oac.startRendering(),n=buf.length,ch=[buf.getChannelData(0),buf.getChannelData(1)];
    const dv=new DataView(new ArrayBuffer(44+n*4)),w=(o,s)=>[...s].forEach((c,i)=>dv.setUint8(o+i,c.charCodeAt(0)));
    w(0,'RIFF');dv.setUint32(4,36+n*4,true);w(8,'WAVEfmt ');dv.setUint32(16,16,true);dv.setUint16(20,1,true);dv.setUint16(22,2,true);dv.setUint32(24,sr,true);dv.setUint32(28,sr*4,true);dv.setUint16(32,4,true);dv.setUint16(34,16,true);w(36,'data');dv.setUint32(40,n*4,true);
    for(let i=0;i<n;i++)for(let c=0;c<2;c++)dv.setInt16(44+i*4+c*2,clamp(ch[c][i],-1,1)*32767,true);
    let bin='';const u8=new Uint8Array(dv.buffer);for(let i=0;i<u8.length;i+=32768)bin+=String.fromCharCode(...u8.subarray(i,i+32768));return btoa(bin)};
  // ---- UI ----
  function showErr(){let b=document.getElementById('err');if(!SERR.length){b&&b.remove();return}if(!b){b=document.createElement('div');b.id='err';document.body.appendChild(b)}b.textContent='⚠ LESSON errors ('+SERR.length+'):\n• '+[...new Set(SERR)].join('\n• ')}
  const ui=document.createElement('div');ui.id='ui';ui.innerHTML=`<button id="pp">▶ Sound</button><button id="pv">⏮</button><button id="nx">⏭</button><button id="cc">CC</button><button id="gd">Grid</button><div id="bar"><div id="fill"></div></div><span id="tc"></span>`;document.body.appendChild(ui);
  const bar=ui.querySelector('#bar');SCN.forEach(s=>{const m=document.createElement('div');m.className='mk';m.style.left=(s.start/DUR*100)+'%';m.title=s.title||s.kind||'';bar.appendChild(m)});
  let AC=null,start=performance.now(),playing=true,audioClock=null,cur=0,src=null;
  const stopAudio=()=>{if(src)try{src.master.disconnect()}catch(e){}src=null;audioClock=null};
  const tick=now=>{if(!playing)return;let t=audioClock!=null?AC.currentTime-audioClock:(now-start)/1000;if(t>=DUR+.8){stopAudio();start=now;t=0}
    cur=Math.min(t,DUR-1e-4);render(cur);ui.querySelector('#fill').style.width=(cur/DUR*100)+'%';ui.querySelector('#tc').textContent=cur.toFixed(1)+' / '+DUR.toFixed(1)+'s';requestAnimationFrame(tick)};
  async function play(from,sound){stopAudio();if(sound){AC=AC||new AudioContext();await AC.resume();audioClock=AC.currentTime+.08-from;src=scheduleAudio(AC.currentTime+.08,AC,from)}start=performance.now()-from*1000;cur=from;playing=true;requestAnimationFrame(tick)}
  const jump=d=>{const i=clamp(sceneAt(cur)+d,0,SCN.length-1);play(SCN[i].start+.001,!!src)};
  ui.querySelector('#pp').onclick=()=>play(cur>=DUR-.5?0:cur,true);ui.querySelector('#pv').onclick=()=>jump(-1);ui.querySelector('#nx').onclick=()=>jump(1);
  ui.querySelector('#cc').onclick=()=>{capG.style.display=capG.style.display?'':'none'};ui.querySelector('#gd').onclick=()=>{GU.style.display=GU.style.display?'':'none';if(!playing)render(cur)};
  bar.onclick=e=>{const r=bar.getBoundingClientRect();const t=(e.clientX-r.left)/r.width*DUR;if(playing)play(t,!!src);else{cur=t;render(cur)}};
  addEventListener('keydown',e=>{if(e.key==='g'||e.key==='G'){GU.style.display=GU.style.display?'':'none';if(!playing)render(cur)}
    if(e.key===' '){e.preventDefault();if(playing){playing=false;stopAudio()}else play(cur,!!AC)}if(e.key==='ArrowRight')jump(1);if(e.key==='ArrowLeft')jump(-1)});
  showErr();if(SERR.length)console.warn('LESSON errors:\n'+SERR.join('\n'));
  if(q.has('t')){document.body.classList.add('capture');playing=false;render(+q.get('t'))}else requestAnimationFrame(tick);
  window.__ready=true;
}
window.LESSON=LESSON;
/* ================= CELL BIOLOGY ATLAS: membrane transport, signalling, synapse, organelle close-ups ================= */
Object.assign(NAMES.uz,{protein:'Tashuvchi oqsil',pump:'Na⁺/K⁺ nasos',atp:'ATF',vesicle:'Pufakcha (vezikula)',solute:'Erigan modda',water:'Suv molekulalari',gradient:'Konsentratsiya gradienti',
  ligand:'Signal molekulasi (gormon)',receptor:'Retseptor',relay:'G-oqsil (uzatuvchi)',effector:'Effektor ferment',messenger:'Ikkilamchi vositachi (sAMF)',cascade:'Kinazalar kaskadi',response:'Hujayra javobi (gen faollashuvi)',
  presynaptic:'Presinaptik uch',neurotransmitter:'Neyromediator',cleft:'Sinaptik yoriq',postsynaptic:'Postsinaptik membrana',ion:'Ionlar (Na⁺)',
  outerMembrane:'Tashqi membrana',innerMembrane:'Ichki membrana',cristae:'Kristalar',matrix:'Matriks',atpSynthase:'ATF-sintaza',mtDNA:'Halqasimon DNK',
  thylakoid:'Tilakoid',granum:'Grana',stroma:'Stroma',lamella:'Lamella',starch:'Kraxmal donachasi',
  nuclearEnvelope:'Yadro qobig‘i (2 membrana)',pore:'Yadro teshigi',chromatin:'Xromatin',mrna:'iRNK'});
Object.assign(NAMES.en,{protein:'Carrier protein',pump:'Na⁺/K⁺ pump',atp:'ATP',vesicle:'Vesicle',solute:'Solute',water:'Water molecules',gradient:'Concentration gradient',
  ligand:'Signal molecule (hormone)',receptor:'Receptor',relay:'G protein (relay)',effector:'Effector enzyme',messenger:'Second messenger (cAMP)',cascade:'Kinase cascade',response:'Cell response (gene activation)',
  presynaptic:'Presynaptic terminal',neurotransmitter:'Neurotransmitter',cleft:'Synaptic cleft',postsynaptic:'Postsynaptic membrane',ion:'Ions (Na⁺)',
  outerMembrane:'Outer membrane',innerMembrane:'Inner membrane',cristae:'Cristae',matrix:'Matrix',atpSynthase:'ATP synthase',mtDNA:'Circular DNA',
  thylakoid:'Thylakoid',granum:'Granum',stroma:'Stroma',lamella:'Lamella',starch:'Starch grain',
  nuclearEnvelope:'Nuclear envelope (2 membranes)',pore:'Nuclear pore',chromatin:'Chromatin',mrna:'mRNA'});
Object.assign(NAMES.ru,{protein:'Белок-переносчик',pump:'Na⁺/K⁺-насос',atp:'АТФ',vesicle:'Везикула',solute:'Растворённое вещество',water:'Молекулы воды',gradient:'Градиент концентрации',
  ligand:'Сигнальная молекула',receptor:'Рецептор',relay:'G-белок',effector:'Фермент-эффектор',messenger:'Вторичный посредник (цАМФ)',cascade:'Каскад киназ',response:'Ответ клетки',
  presynaptic:'Пресинаптическое окончание',neurotransmitter:'Нейромедиатор',cleft:'Синаптическая щель',postsynaptic:'Постсинаптическая мембрана',ion:'Ионы (Na⁺)',
  outerMembrane:'Наружная мембрана',innerMembrane:'Внутренняя мембрана',cristae:'Кристы',matrix:'Матрикс',atpSynthase:'АТФ-синтаза',mtDNA:'Кольцевая ДНК',
  thylakoid:'Тилакоид',granum:'Грана',stroma:'Строма',lamella:'Ламелла',starch:'Зерно крахмала',nuclearEnvelope:'Ядерная оболочка',pore:'Ядерная пора',chromatin:'Хроматин',mrna:'иРНК'});
// phospholipid bilayer (horizontal), gaps = [[x0,x1],…] left free for proteins
function bilayer(g,x0,x1,yc,{gaps=[],sp=44,hr=15,len=56,draw=true}={}){for(let x=x0;x<=x1;x+=sp){if(gaps.some(([a,b])=>x>a-hr&&x<b+hr))continue;
  [[-1],[1]].forEach(([d])=>{const hy=yc+d*(len+hr+4);el('circle',{cx:x,cy:hy,r:hr,fill:TH.a1,'fill-opacity':.85},g);
    [-5,5].forEach(o=>{const p=el('path',{d:wavy(x+o,hy-d*hr,x+o,yc+d*4,3,2),fill:'none',stroke:TH.a2,'stroke-width':3.5,'stroke-opacity':.85},g);if(draw)dr(p)})})}}
const lbl=(g,s,x,y,{size=30,color,anchor='middle',weight=700}={})=>{const t=el('text',{x,y,'text-anchor':anchor,'font-size':size,'font-family':FONT,'font-weight':weight,fill:col(color||'dim')},g);t.textContent=s;return t};
const dot=(g,r,c,glow=true)=>el('circle',{r,fill:col(c),filter:glow?'url(#glowS)':undefined},g);
const mv=(e,x,y,o)=>{e.setAttribute('cx',f2(x));e.setAttribute('cy',f2(y));if(o!=null)e.setAttribute('opacity',f2(o))};
/* ---------- TRANSPORT across membrane: kind simple|channel|carrier|pump|endocytosis|exocytosis|osmosis ---------- */
SM.items.transport=preset(1500,760,(g,it)=>{const k=it.kind||'simple',yc=380,A={outside:[1380,90],inside:[1380,690],membrane:[120,yc-75]};const T=it.cycle||(k==='pump'?6:k==='simple'||k==='channel'?7:5);
  const tag=t=>lbl(g,t,40,60,{anchor:'start',size:30,color:'dim'});
  if(k==='osmosis'){const L=el('rect',{x:80,width:660,fill:TH.a1,'fill-opacity':.22},g),R=el('rect',{x:760,width:660,fill:TH.a1,'fill-opacity':.22},g);
    dr(el('path',{d:'M80,60 L80,700 L1420,700 L1420,60',fill:'none',stroke:TH.ink,'stroke-width':5},g));dr(el('line',{x1:750,y1:120,x2:750,y2:700,stroke:TH.a5,'stroke-width':8,'stroke-dasharray':'18 12'},g));
    const S=[...Array(12)].map(()=>dot(g,22,'a2',false)),W=[...Array(46)].map(()=>dot(g,8,'a1',false));A.solute=[1000,560];A.water=[400,560];A.membrane=[750,200];
    return {anchors:A,update(lt,p,st){const q=E.inOutCubic(prog(lt,st+1,st+(it.dur2||9)));const lL=300+110*q,lR=300-110*q;at(L,{y:lL,height:700-lL});at(R,{y:lR,height:700-lR});
      S.forEach((s,i)=>mv(s,800+seeded(i,1)*560+Math.sin(lt+i)*14,Math.max(lR+40,420+seeded(i,2)*250)+Math.cos(lt*.8+i)*10));
      W.forEach((w,i)=>{const cross=i%3===0;const u=((lt-st)/T+seeded(i,3))%1;let x,y;if(cross){x=lerp(120+seeded(i,4)*560,800+seeded(i,5)*560,E.inOutCubic(u));y=lerp(Math.max(lL+30,500),Math.max(lR+30,480),u)+Math.sin(u*TAU*2)*20+seeded(i,6)*120}
        else{const left=i%2===0;x=(left?120:800)+seeded(i,4)*560+Math.sin(lt*1.3+i)*10;y=(left?lL:lR)+40+seeded(i,6)*Math.max(60,(700-(left?lL:lR))-70)}mv(w,x,y,prog(lt,st+.3,st+.9))})}}}
  if(k==='endocytosis'||k==='exocytosis'){const band=[el('path',{fill:'none',stroke:TH.a1,'stroke-width':76,'stroke-opacity':.9,'stroke-linejoin':'round'},g),el('path',{fill:'none',stroke:TH.bg2,'stroke-width':48,'stroke-linejoin':'round'},g),el('path',{fill:'none',stroke:TH.a2,'stroke-width':40,'stroke-dasharray':'3 9','stroke-opacity':.8,'stroke-linejoin':'round'},g)];
    const ves=[el('circle',{r:100,fill:'none',stroke:TH.a1,'stroke-width':30},g),el('circle',{r:100,fill:'none',stroke:TH.a2,'stroke-width':16,'stroke-dasharray':'3 9'},g)];
    const cargo=[...Array(k==='endocytosis'?1:9)].map((_,i)=>dot(g,k==='endocytosis'?52:13,k==='endocytosis'?'a3':'a4'));A.vesicle=[750,600];A.molecule=[750,150];
    const cx=750;return {anchors:A,update(lt,p,st){const u=((lt-st-.6)/T%1+1)%1;const v=k==='endocytosis'?u:1-u;// v: 0 outside →1 inside
      const depth=v<.5?E.inOutCubic(v/.5)*230:v<.62?230*(1-E.inOutCubic((v-.5)/.12)):0;const w=100+depth*.25;
      let d='M0,'+yc;for(let x=0;x<=1500;x+=20){const g2=Math.exp(-(((x-cx)/w)**2));d+=` L${x},${f2(yc+depth*g2)}`}band.forEach(b=>b.setAttribute('d',d));
      const vy=v<.5?yc+depth-90:v<.62?yc+230-80:lerp(yc+150,640,E.outCubic((v-.62)/.38));const vo=v<.5?0:clamp((v-.5)/.06);ves.forEach(c=>{mv(c,cx,vy);c.setAttribute('opacity',f2(vo))});
      cargo.forEach((c,i)=>{if(k==='endocytosis'){const y=v<.3?lerp(70,yc-40,E.inOutCubic(v/.3)):v<.5?yc+depth-90:vy;mv(c,cx,y,1)}else{const a=i/9*TAU;let x=cx+Math.cos(a)*45,y=vy+Math.sin(a)*45;
        if(u>.38){const q=E.outCubic(clamp((u-.38)/.6));x=cx+Math.cos(a)*(45+q*360);y=lerp(yc-40,90,q)+Math.sin(a)*60*q}mv(c,x,y,u>.38?1-clamp((u-.9)/.1):1)}})}}}
  // membrane-based kinds
  const px=750,gap=k==='simple'?[]:[[px-110,px+110]];bilayer(g,60,1440,yc,{gaps:gap});
  const hi=lbl(g,nm('gradient')+' ↓',1440,200,{anchor:'end',size:28,color:'a2'});
  if(k==='simple'||k==='channel'){if(k==='channel'){[-1,1].forEach(s=>dr(el('rect',{x:px+s*55-30,y:yc-120,width:60,height:240,rx:30,fill:TH.a5,'fill-opacity':.55,stroke:TH.a5,'stroke-width':4},g)));A.protein=[px+30,yc-110]}
    const M=[...Array(34)].map((_,i)=>dot(g,k==='channel'?13:11,k==='channel'?'a4':'a3'));A.molecule=[300,140];
    return {anchors:A,update(lt,p,st){M.forEach((m,i)=>{const cross=i%2===0,u=((lt-st)/T+seeded(i,1))%1;const hx=100+seeded(i,2)*1300,hy=60+seeded(i,3)*190;let x,y;
      if(cross){const ex=k==='channel'?px:hx+(seeded(i,4)-.5)*200,bx=100+seeded(i,5)*1300,by=500+seeded(i,6)*220;if(u<.4){const q=E.inOutCubic(u/.4);x=lerp(hx,ex,q);y=lerp(hy,yc-110,q)}else if(u<.6){x=ex+Math.sin(u*40)*4;y=lerp(yc-110,yc+110,(u-.4)/.2)}else{const q=E.outCubic((u-.6)/.4);x=lerp(ex,bx,q);y=lerp(yc+110,by,q)}}
      else{x=hx+Math.sin(lt*.8+i)*25;y=hy+Math.cos(lt*.6+i)*16}mv(m,x,y,prog(lt,st+.4,st+1)*(cross&&u>.92?1-(u-.92)/.08:1))})}}}
  // carrier & pump: two lobes that rock open-out ↔ open-in
  const lobes=[-1,1].map(s=>{const e=dr(el('rect',{x:-36,y:-130,width:72,height:260,rx:34,fill:k==='pump'?TH.a5:TH.a4,'fill-opacity':.55,stroke:k==='pump'?TH.a5:TH.a4,'stroke-width':4},g));return {e,s}});
  const setL=f=>lobes.forEach(({e,s})=>e.setAttribute('transform',`translate(${px+s*50} ${yc}) rotate(${f2(s*lerp(14,-14,f))})`));A.protein=[px+50,yc-120];
  if(k==='carrier'){const gl=el('polygon',{points:[0,1,2,3,4,5].map(i=>`${f2(Math.cos(i/6*TAU)*24)},${f2(Math.sin(i/6*TAU)*24)}`).join(' '),fill:TH.a2,filter:'url(#glowS)'},g);A.molecule=[px,120];
    return {anchors:A,update(lt,p,st){const u=((lt-st-.5)/T%1+1)%1;const f=u<.3?0:u<.5?E.inOutCubic((u-.3)/.2):u<.7?1:1-E.inOutCubic((u-.7)/.3);setL(f);
      const y=u<.3?lerp(90,yc-40,E.inOutCubic(u/.3)):u<.5?lerp(yc-40,yc+40,(u-.3)/.2):u<.72?lerp(yc+40,680,E.outCubic((u-.5)/.22)):680;gl.setAttribute('transform',`translate(${px} ${f2(y)})`);gl.setAttribute('opacity',f2(u<.72?1:1-(u-.72)/.08<0?0:1-(u-.72)/.08))}}}
  // pump: 3 Na+ out, 2 K+ in, ATP
  const na=[0,1,2].map(()=>dot(g,16,'a2')),kk=[0,1].map(()=>dot(g,18,'a5')),atp=dot(g,20,'#FFE066');const tA=lbl(g,'ATF → ADF + F',px+150,yc+40,{anchor:'start',size:28,color:'#FFE066'});
  lbl(g,'3 Na⁺',150,140,{anchor:'start',size:34,color:'a2'});lbl(g,'2 K⁺',150,650,{anchor:'start',size:34,color:'a5'});A.atp=[px+30,yc+120];A.pump=A.protein;
  return {anchors:A,update(lt,p,st){const u=((lt-st-.5)/T%1+1)%1;// 0-.2 Na bind from inside, .2-.3 ATP, .3-.45 flip out, .45-.6 Na leave/K bind, .6-.75 flip in, .75-.9 K leave
    const f=u<.3?0:u<.45?E.inOutCubic((u-.3)/.15):u<.6?1:u<.75?1-E.inOutCubic((u-.6)/.15):0;setL(1-f);
    na.forEach((n,i)=>{const sx=420+i*80,ox=px-30+i*30;let x,y;if(u<.2){const q=E.inOutCubic(u/.2);x=lerp(sx,ox,q);y=lerp(640,yc+30,q)}else if(u<.45){x=ox;y=lerp(yc+30,yc-30,clamp((u-.3)/.15))}else{const q=E.outCubic(clamp((u-.45)/.2));x=lerp(ox,ox+(i-1)*260,q);y=lerp(yc-30,110+i*20,q)}mv(n,x,y,u>.9?1-(u-.9)/.1:1)});
    kk.forEach((n,i)=>{const sx=1000+i*90,ox=px-15+i*30;let x,y;if(u<.45){x=sx+Math.sin(lt+i)*10;y=120+i*30}else if(u<.6){const q=E.inOutCubic((u-.45)/.15);x=lerp(sx,ox,q);y=lerp(120+i*30,yc-30,q)}else if(u<.75){x=ox;y=lerp(yc-30,yc+30,(u-.6)/.15)}else{const q=E.outCubic(clamp((u-.75)/.2));x=lerp(ox,ox+(i?200:-200),q);y=lerp(yc+30,640,q)}mv(n,x,y,1)});
    const ua=clamp((u-.18)/.12);mv(atp,lerp(px+260,px+40,E.inOutCubic(ua)),yc+120,u<.18?0:u<.4?1:1-clamp((u-.4)/.1));tA.setAttribute('opacity',f2(u>.22&&u<.5?1:0))}}});
/* ---------- SIGNAL transduction: ligand → receptor → G protein → effector → cAMP → kinase cascade → nucleus ---------- */
SM.items.signal=preset(1500,880,(g,it)=>{const yc=230,A={};bilayer(g,40,1460,yc,{gaps:[[420,520],[780,900]]});
  const rec=[-1,1].map(s=>dr(el('rect',{x:470+s*26-22,y:yc-160,width:44,height:280,rx:22,fill:TH.a5,'fill-opacity':.6,stroke:TH.a5,'stroke-width':4},g)));
  const eff=dr(el('path',{d:blob(840,yc,60,120,{seed:3}),fill:TH.a4,'fill-opacity':.45,stroke:TH.a4,'stroke-width':4},g));
  const lig=el('polygon',{points:'0,-26 24,0 0,26 -24,0',fill:TH.a2,filter:'url(#glowS)'},g);const gp=el('ellipse',{rx:46,ry:30,fill:TH.a3,'fill-opacity':.75,stroke:TH.a3,'stroke-width':3},g);
  const msg=[...Array(16)].map(()=>dot(g,9,'a1'));const nx=1220,ny=700;dr(el('circle',{cx:nx,cy:ny,r:150,fill:TH.a5,'fill-opacity':.12,stroke:TH.a5,'stroke-width':5},g));
  const dna=dr(el('path',{d:wavy(nx-90,ny,nx+90,ny,16,4),fill:'none',stroke:TH.a5,'stroke-width':5},g));const K=[[700,520],[900,620],[1060,700]].map(([x,y],i)=>{const c=el('g',{},g);el('circle',{cx:x,cy:y,r:42,fill:TH.panel,stroke:TH.a2,'stroke-width':4},c);lbl(c,'K'+(i+1),x,y+11,{size:30,color:'a2'});return {c,x,y}});
  const ar=[[[840,350],[700,470]],[[742,540],[858,600]],[[942,640],[1018,680]],[[1102,700],[1068+2,700]]].slice(0,3).map(([a,b])=>dr(el('path',{d:`M${a[0]},${a[1]} L${b[0]},${b[1]}`,stroke:TH.ink,'stroke-width':4,'marker-end':arrowMarker('ink'),fill:'none',opacity:.25},g)));
  const mr=el('path',{d:'',fill:'none',stroke:TH.a4,'stroke-width':7,'stroke-linecap':'round',filter:'url(#glowS)'},g);
  const step=lbl(g,'',1460,60,{anchor:'end',size:32,color:'a2'});
  Object.assign(A,{ligand:[300,80],receptor:[496,yc-140],relay:[620,yc+110],effector:[880,yc-100],messenger:[760,420],cascade:[900,600],nucleus:[nx,ny-150],response:[nx+150,ny-40]});
  const T=it.cycle||10;const names=[nm('ligand'),nm('relay'),nm('messenger'),nm('cascade'),nm('response')];
  return {anchors:A,update(lt,p,st){const u=((lt-st-.4)/T%1+1)%1,s=u*T;// seconds in cycle
    const lq=E.inOutCubic(clamp(s/1.6));lig.setAttribute('transform',`translate(${f2(lerp(220,470,lq))} ${f2(lerp(60,yc-150,lq))}) rotate(${f2(s*60)})`);
    const on=clamp((s-1.6)/.4);rec.forEach(r=>r.setAttribute('fill-opacity',f2(.6+.35*on)));
    const gq=E.inOutCubic(clamp((s-2)/1.4));gp.setAttribute('transform',`translate(${f2(lerp(560,780,gq))} ${yc+95})`);gp.setAttribute('opacity',f2(clamp((s-1.8)/.3)*(1-clamp((s-8.8)/.5))));
    eff.setAttribute('fill-opacity',f2(.45+.4*clamp((s-3.3)/.4)));
    msg.forEach((m,i)=>{const q=E.outCubic(clamp((s-3.6-i*.05)/1.6));const a=seeded(i,1)*Math.PI*.9+Math.PI*.05;mv(m,840+Math.cos(a)*q*260*(.6+seeded(i,2)*.5),yc+120+Math.sin(a)*q*220,q>0?1-clamp((s-8.5)/.6):0)});
    K.forEach((k2,i)=>{const t0=5+i*.8;const q=clamp((s-t0)/.4);k2.c.setAttribute('opacity',f2(.35+.65*q));k2.c.setAttribute('filter',q>.5&&s<t0+1.5?'url(#glowS)':'')});ar.forEach((a,i)=>a.setAttribute('opacity',f2(.25+.75*clamp((s-4.7-i*.8)/.3))));
    dna.setAttribute('stroke',s>7.4?TH.a4:TH.a5);const mq=clamp((s-7.6)/1.2);mr.setAttribute('d',mq>0?wavy(nx+20,ny-20,nx+20+mq*280,ny-20-mq*160,8,3):'');mr.setAttribute('opacity',f2(1-clamp((s-9.3)/.5)));
    const si=s<2?0:s<3.6?1:s<5?2:s<7.4?3:4;step.textContent=(si+1)+'. '+names[si];step.setAttribute('opacity',f2(prog(lt,st+.5,st+1)))}}});
/* ---------- SYNAPSE: impulse → vesicles fuse → neurotransmitter → receptors → ion flow ---------- */
SM.items.synapse=preset(1200,900,(g,it)=>{const A={};const top=dr(el('path',{d:'M380,0 L380,180 C380,300 260,330 260,400 C260,450 330,470 600,470 C870,470 940,450 940,400 C940,330 820,300 820,180 L820,0',fill:TH.a1,'fill-opacity':.14,stroke:TH.a1,'stroke-width':6},g));
  const post=dr(el('path',{d:'M120,900 L120,600 C120,560 200,545 600,545 C1000,545 1080,560 1080,600 L1080,900',fill:TH.a4,'fill-opacity':.1,stroke:TH.a4,'stroke-width':6},g));
  const R=[380,500,600,700,820].map(x=>el('rect',{x:x-22,y:540,width:44,height:46,rx:10,fill:TH.a5,'fill-opacity':.6,stroke:TH.a5,'stroke-width':3},g));
  const V=[[420,330],[540,380],[660,350],[780,330],[480,240],[720,240]].map(([x,y],i)=>{const c=el('g',{},g);el('circle',{r:40,fill:TH.panel,stroke:TH.a2,'stroke-width':4},c);for(let k=0;k<6;k++)el('circle',{cx:Math.cos(k)*18,cy:Math.sin(k*1.7)*18,r:6,fill:TH.a2},c);return {c,x,y}});
  const NT=[...Array(30)].map(()=>dot(g,7,'a2'));const ION=[...Array(14)].map(()=>dot(g,8,'a3'));const imp=el('circle',{r:24,fill:'#fff',filter:'url(#glow2)'},g);
  Object.assign(A,{presynaptic:[380,120],vesicle:[420,330],neurotransmitter:[600,505],cleft:[1000,508],receptor:[820,560],postsynaptic:[1080,640],ion:[600,760]});
  const T=it.cycle||5;return {anchors:A,update(lt,p,st){const u=((lt-st-.5)/T%1+1)%1;
    mv(imp,600,lerp(-20,300,E.inCubic(clamp(u/.25))),u<.28?Math.sin(Math.PI*clamp(u/.28)):0);
    V.forEach((v,i)=>{const near=i<4;const q=near?E.inOutCubic(clamp((u-.25-i*.02)/.15)):0;const y=lerp(v.y,452,q);const fus=near?clamp((u-.4)/.08):0;v.c.setAttribute('transform',`translate(${v.x} ${f2(y)}) scale(${f2(1-fus*.7)})`);v.c.setAttribute('opacity',f2(1-fus+(u>.95?0:0)+(near&&u>.9?clamp((u-.9)/.1):0)))});
    NT.forEach((n,i)=>{const sx=420+(i%4)*120,tx=380+(i%5)*110+(seeded(i,1)-.5)*30;const q=clamp((u-.45-seeded(i,2)*.08)/.2);const back=clamp((u-.82)/.15);
      mv(n,lerp(sx,tx,q)+(seeded(i,3)-.5)*40*Math.sin(q*3),lerp(470,535,E.inOutCubic(q))-back*70,q>0?1-back:0)});
    R.forEach((r,i)=>{const on=clamp((u-.6)/.05)*(1-clamp((u-.85)/.1));r.setAttribute('fill-opacity',f2(.6+.4*on));r.setAttribute('filter',on>.5?'url(#glowS)':'')});
    ION.forEach((n,i)=>{const x=[380,500,600,700,820][i%5];const q=clamp((u-.65-seeded(i,1)*.1)/.25);mv(n,x+(seeded(i,2)-.5)*20,lerp(520,840,E.inCubic(q)),q>0&&q<1?1:0)})}}});
/* ---------- ORGANELLE close-ups ---------- */
SM.items.mitochondrion=preset(1400,800,(g,it)=>{const A={};dr(el('path',{d:blob(700,400,640,330,{seed:2,amp:.02}),fill:TH.a2,'fill-opacity':.12,stroke:TH.a2,'stroke-width':10},g));
  const inner=dr(el('path',{d:blob(700,400,600,290,{seed:2,amp:.02}),fill:TH.a3,'fill-opacity':.14,stroke:TH.a3,'stroke-width':6},g));const n=9,syn=[];
  for(let i=0;i<n;i++){const x=230+i*118,top=i%2===0,ye=400+(top?-1:1)*290*Math.sqrt(Math.max(0,1-((x-700)/600)**2))*.97,dep=top?470:330;
    dr(el('path',{d:`M${x-24},${f2(ye)} L${x-24},${dep} A24,24 0 0 ${top?0:1} ${x+24},${dep} L${x+24},${f2(ye)}`,fill:TH.a3,'fill-opacity':.28,stroke:TH.a3,'stroke-width':7,'stroke-linejoin':'round'},g));
    for(let k=0;k<3;k++){const y=lerp(ye,dep,(k+.6)/3.4);syn.push(el('circle',{cx:x+(k%2?-36:36),cy:f2(y),r:9,fill:TH.a4},g))}}
  dr(el('path',{d:blob(1120,250,46,36,{seed:5,amp:.15}),fill:'none',stroke:TH.a5,'stroke-width':4},g));for(let k=0;k<14;k++)el('circle',{cx:260+seeded(k,1)*880,cy:200+seeded(k,2)*400,r:6,fill:TH.dim},g);
  const atp=[...Array(14)].map(()=>dot(g,10,'#FFE066'));Object.assign(A,{outerMembrane:[700,72],innerMembrane:[300,180],cristae:[348,420],matrix:[650,620],atpSynthase:[214,330],mtDNA:[1120,250],ribosome:[260+seeded(3,1)*880,200+seeded(3,2)*400]});
  return {anchors:A,update(lt,p,st){atp.forEach((a,i)=>{const u=((lt-st)/3+seeded(i,1))%1;const s=syn[(i*5)%syn.length];const x=+s.getAttribute('cx'),y=+s.getAttribute('cy');mv(a,x+(seeded(i,2)-.5)*120*u,y+(y<400?1:-1)*u*90,prog(lt,st+1,st+1.5)*Math.sin(Math.PI*u))})}}});
SM.items.chloroplast=preset(1400,800,(g,it)=>{const A={};dr(el('path',{d:blob(700,400,640,320,{seed:4,amp:.02}),fill:TH.a4,'fill-opacity':.12,stroke:TH.a4,'stroke-width':10},g));dr(el('path',{d:blob(700,400,612,292,{seed:4,amp:.02}),fill:'none',stroke:TH.a4,'stroke-width':5},g));
  const G=[[300,330],[520,470],[740,330],[960,470],[1140,330]];G.forEach(([x,y],i)=>{for(let k=0;k<6;k++)dr(el('rect',{x:x-70,y:y-90+k*30,width:140,height:24,rx:12,fill:TH.a4,'fill-opacity':.55,stroke:'#2E8B57','stroke-width':3},g));if(i<G.length-1){const [x2,y2]=G[i+1];dr(el('path',{d:`M${x+70},${y} C${x+130},${y} ${x2-130},${y2} ${x2-70},${y2}`,fill:'none',stroke:TH.a4,'stroke-width':8,'stroke-opacity':.6},g))}});
  el('ellipse',{cx:640,cy:640,rx:60,ry:34,fill:'#F3E9C8','fill-opacity':.8},g);const O=[...Array(12)].map(()=>el('circle',{r:12,fill:'none',stroke:TH.a1,'stroke-width':3},g));
  const rays=[0,1,2,3].map(i=>dr(el('path',{d:`M${150+i*80},-10 L${300+i*120},300`,stroke:'#FFE066','stroke-width':6,'stroke-dasharray':'20 14',opacity:.8},g)));
  Object.assign(A,{thylakoid:[300,240],granum:[740,250],stroma:[1100,640],lamella:[630,400],starch:[640,640],outerMembrane:[700,80],innerMembrane:[1300,400]});
  return {anchors:A,update(lt,p,st){rays.forEach((r,i)=>r.setAttribute('stroke-dashoffset',f2(-lt*60)));O.forEach((o,i)=>{const u=((lt-st)/4+seeded(i,1))%1;const [x,y]=G[i%5];mv(o,x+(seeded(i,2)-.5)*120+Math.sin(u*9)*10,y-100-u*300,prog(lt,st+1,st+1.5)*(1-u))})}}});
SM.items.nucleus=preset(1200,1000,(g,it)=>{const A={};const c=[600,500];dr(el('circle',{cx:600,cy:500,r:420,fill:TH.a5,'fill-opacity':.1,stroke:TH.a5,'stroke-width':10},g));dr(el('circle',{cx:600,cy:500,r:392,fill:'none',stroke:TH.a5,'stroke-width':6},g));
  const pores=[];for(let k=0;k<10;k++){const a=k/10*TAU+.2;pores.push([600+Math.cos(a)*406,500+Math.sin(a)*406]);el('circle',{cx:600+Math.cos(a)*406,cy:500+Math.sin(a)*406,r:17,fill:TH.bg,stroke:TH.a2,'stroke-width':5},g)}
  for(let k=0;k<7;k++)dr(el('path',{d:wavy(320+seeded(k,1)*300,300+seeded(k,2)*400,560+seeded(k,3)*300,320+seeded(k,4)*380,14,5),fill:'none',stroke:TH.a1,'stroke-width':5,'stroke-opacity':.75},g));
  el('circle',{cx:680,cy:560,r:95,fill:TH.a3,'fill-opacity':.45,filter:'url(#glowS)'},g);const M=[...Array(5)].map(()=>el('path',{fill:'none',stroke:TH.a4,'stroke-width':6,'stroke-linecap':'round'},g));
  Object.assign(A,{nuclearEnvelope:[600,80],pore:pores[2],chromatin:[420,380],nucleolus:[680,560],mrna:pores[0]});
  return {anchors:A,update(lt,p,st){M.forEach((m,i)=>{const u=((lt-st)/3.5+i/5)%1;const P=pores[(i*2)%10],a=Math.atan2(P[1]-500,P[0]-600);const r0=300+u*260;const x=600+Math.cos(a)*r0,y=500+Math.sin(a)*r0;
    m.setAttribute('d',wavy(x-Math.cos(a)*30,y-Math.sin(a)*30,x+Math.cos(a)*30,y+Math.sin(a)*30,6,2));m.setAttribute('opacity',f2(prog(lt,st+1,st+1.5)*Math.sin(Math.PI*u)))})}}});
/* ================= CELL TYPES & ORGANS ================= */
Object.assign(NAMES.uz,{capsule:'Kapsula',wallB:'Hujayra devori',nucleoid:'Nukleoid (DNK)',plasmid:'Plazmida',flagellum:'Xivchin',pili:'Pililar (tukchalar)',
  rbc:'Eritrotsit',biconcave:'Ikki tomoni botiq disk (yon ko‘rinish)',hemoglobin:'Gemoglobin (yadrosiz)',size:'Diametri ≈ 7–8 mkm',
  lobedNucleus:'Bo‘lakli yadro',granules:'Donachalar',pseudopod:'Soxta oyoqcha',bacterium:'Bakteriya',phagosome:'Fagosoma',
  fiber:'Muskul tolasi',nuclei:'Ko‘p yadrolar',sarcomere:'Sarkomer',zline:'Z-chiziq',actin:'Aktin (ingichka)',myosin:'Miozin (yo‘g‘on)',
  microvilli:'Mikrovorsinkalar',basement:'Bazal membrana',junction:'Zich birikma',epicell:'Epiteliy hujayrasi',
  acrosome:'Akrosoma',midpiece:'O‘rta qism (mitoxondriyalar)',tailS:'Dum (xivchin)',zona:'Yaltiroq qobiq',corona:'Nursimon toj',
  trachea:'Traxeya',bronchus:'Bronx',bronchiole:'Bronxiola',alveoli:'Alveolalar',rightLung:'O‘ng o‘pka (3 bo‘lak)',leftLung:'Chap o‘pka (2 bo‘lak)',diaphragm:'Diafragma',
  alveolus:'Alveola',capillary:'Kapillyar',o2:'O₂ (qonga)',co2:'CO₂ (alveolaga)',
  cortex:'Po‘stloq qavat',medulla:'Mag‘iz qavat (piramidalar)',pelvis:'Buyrak jomi',ureter:'Siydik nayi',renalArtery:'Buyrak arteriyasi',renalVein:'Buyrak venasi',
  glomerulus:'Kapillyar koptokcha',bowman:'Shumlyanskiy–Boumen kapsulasi',proximal:'Proksimal kanalcha',loop:'Genle halqasi',distal:'Distal kanalcha',collecting:'Yig‘uvchi nay',
  frontal:'Peshona bo‘lagi',parietal:'Tepa bo‘lagi',temporal:'Chakka bo‘lagi',occipital:'Ensa bo‘lagi',cerebellum:'Miyacha',brainstem:'Miya ustuni',
  mouth:'Og‘iz bo‘shlig‘i',esophagus:'Qizilo‘ngach',stomach:'Oshqozon',liver:'Jigar',gallbladder:'O‘t pufagi',pancreas:'Oshqozon osti bezi',smallIntestine:'Ingichka ichak',largeIntestine:'Yo‘g‘on ichak',rectum:'To‘g‘ri ichak',
  cornea:'Shox parda',iris:'Rangdor parda',pupil:'Qorachiq',lens:'Gavhar',retina:'To‘r parda',opticNerve:'Ko‘ruv nervi',vitreous:'Shishasimon tana',sclera:'Oqsil parda'});
Object.assign(NAMES.en,{capsule:'Capsule',wallB:'Cell wall',nucleoid:'Nucleoid (DNA)',plasmid:'Plasmid',flagellum:'Flagellum',pili:'Pili',rbc:'Red blood cell',biconcave:'Biconcave disc (side view)',hemoglobin:'Hemoglobin (no nucleus)',size:'Diameter ≈ 7–8 µm',
  lobedNucleus:'Lobed nucleus',granules:'Granules',pseudopod:'Pseudopod',bacterium:'Bacterium',phagosome:'Phagosome',fiber:'Muscle fibre',nuclei:'Many nuclei',sarcomere:'Sarcomere',zline:'Z line',actin:'Actin (thin)',myosin:'Myosin (thick)',
  microvilli:'Microvilli',basement:'Basement membrane',junction:'Tight junction',epicell:'Epithelial cell',acrosome:'Acrosome',midpiece:'Midpiece (mitochondria)',tailS:'Tail (flagellum)',zona:'Zona pellucida',corona:'Corona radiata',
  trachea:'Trachea',bronchus:'Bronchus',bronchiole:'Bronchiole',alveoli:'Alveoli',rightLung:'Right lung (3 lobes)',leftLung:'Left lung (2 lobes)',diaphragm:'Diaphragm',alveolus:'Alveolus',capillary:'Capillary',o2:'O₂ into blood',co2:'CO₂ into alveolus',
  cortex:'Cortex',medulla:'Medulla (pyramids)',pelvis:'Renal pelvis',ureter:'Ureter',renalArtery:'Renal artery',renalVein:'Renal vein',glomerulus:'Glomerulus',bowman:'Bowman’s capsule',proximal:'Proximal tubule',loop:'Loop of Henle',distal:'Distal tubule',collecting:'Collecting duct',
  frontal:'Frontal lobe',parietal:'Parietal lobe',temporal:'Temporal lobe',occipital:'Occipital lobe',cerebellum:'Cerebellum',brainstem:'Brainstem',
  mouth:'Mouth',esophagus:'Oesophagus',stomach:'Stomach',liver:'Liver',gallbladder:'Gallbladder',pancreas:'Pancreas',smallIntestine:'Small intestine',largeIntestine:'Large intestine',rectum:'Rectum',
  cornea:'Cornea',iris:'Iris',pupil:'Pupil',lens:'Lens',retina:'Retina',opticNerve:'Optic nerve',vitreous:'Vitreous body',sclera:'Sclera'});
Object.assign(NAMES.ru,{capsule:'Капсула',wallB:'Клеточная стенка',nucleoid:'Нуклеоид (ДНК)',plasmid:'Плазмида',flagellum:'Жгутик',pili:'Пили',rbc:'Эритроцит',biconcave:'Двояковогнутый диск',hemoglobin:'Гемоглобин (без ядра)',size:'Диаметр ≈ 7–8 мкм',
  lobedNucleus:'Сегментированное ядро',granules:'Гранулы',pseudopod:'Ложноножка',bacterium:'Бактерия',phagosome:'Фагосома',fiber:'Мышечное волокно',nuclei:'Много ядер',sarcomere:'Саркомер',zline:'Z-линия',actin:'Актин',myosin:'Миозин',
  microvilli:'Микроворсинки',basement:'Базальная мембрана',junction:'Плотный контакт',epicell:'Эпителиальная клетка',acrosome:'Акросома',midpiece:'Средняя часть',tailS:'Хвост',zona:'Блестящая оболочка',corona:'Лучистый венец',
  trachea:'Трахея',bronchus:'Бронх',bronchiole:'Бронхиола',alveoli:'Альвеолы',rightLung:'Правое лёгкое',leftLung:'Левое лёгкое',diaphragm:'Диафрагма',alveolus:'Альвеола',capillary:'Капилляр',o2:'O₂ в кровь',co2:'CO₂ в альвеолу',
  cortex:'Корковое вещество',medulla:'Мозговое вещество',pelvis:'Лоханка',ureter:'Мочеточник',renalArtery:'Почечная артерия',renalVein:'Почечная вена',glomerulus:'Клубочек',bowman:'Капсула Боумена',proximal:'Проксимальный каналец',loop:'Петля Генле',distal:'Дистальный каналец',collecting:'Собирательная трубка',
  frontal:'Лобная доля',parietal:'Теменная доля',temporal:'Височная доля',occipital:'Затылочная доля',cerebellum:'Мозжечок',brainstem:'Ствол мозга',
  mouth:'Ротовая полость',esophagus:'Пищевод',stomach:'Желудок',liver:'Печень',gallbladder:'Желчный пузырь',pancreas:'Поджелудочная железа',smallIntestine:'Тонкий кишечник',largeIntestine:'Толстый кишечник',rectum:'Прямая кишка',
  cornea:'Роговица',iris:'Радужка',pupil:'Зрачок',lens:'Хрусталик',retina:'Сетчатка',opticNerve:'Зрительный нерв',vitreous:'Стекловидное тело',sclera:'Склера'});
const fillS=(c,o=.18,w=5)=>({fill:col(c),'fill-opacity':o,stroke:col(c),'stroke-width':w});
/* ---------- CELL TYPES ---------- */
SM.items.bacteria=preset(1400,700,(g,it)=>{const A={};dr(el('rect',{x:200,y:170,width:960,height:360,rx:180,fill:'none',stroke:TH.a4,'stroke-width':5,'stroke-dasharray':'16 12'},g));
  dr(el('rect',{x:240,y:205,width:880,height:290,rx:145,...fillS('a4',.12,12)},g));dr(el('rect',{x:262,y:226,width:836,height:248,rx:124,fill:TH.a1,'fill-opacity':.1,stroke:TH.a1,'stroke-width':5},g));
  dr(el('path',{d:blob(680,350,170,70,{seed:7,amp:.35,n:40}),fill:'none',stroke:TH.a5,'stroke-width':6},g));[[930,300],[460,410]].forEach(([x,y])=>dr(el('circle',{cx:x,cy:y,r:24,fill:'none',stroke:TH.a2,'stroke-width':5},g)));
  for(let k=0;k<26;k++)el('circle',{cx:330+seeded(k,1)*700,cy:250+seeded(k,2)*200,r:6,fill:TH.dim},g);
  for(let k=0;k<16;k++){const a=k/16*TAU,x=680+Math.cos(a)*470,y=350+Math.sin(a)*172;dr(el('line',{x1:x,y1:y,x2:x+Math.cos(a)*40,y2:y+Math.sin(a)*40,stroke:TH.a4,'stroke-width':3},g))}
  const fl=el('path',{fill:'none',stroke:TH.a4,'stroke-width':6,'stroke-linecap':'round'},g);Object.assign(A,{capsule:[680,170],wallB:[680,207],membrane:[680,500],nucleoid:[680,300],plasmid:[930,300],ribosome:[330+seeded(2,1)*700,250+seeded(2,2)*200],flagellum:[1300,350],pili:[680+470,350-40],cytoplasm:[400,300]});
  return {anchors:A,update(lt){let d='M1160,350';for(let x=1160;x<=1400;x+=8)d+=` L${x},${f2(350+Math.sin((x-1160)/40-lt*9)*26*((x-1160)/240))}`;fl.setAttribute('d',d)}}});
SM.items.rbc=preset(1300,700,(g,it)=>{const A={};const gr=gradient([[0,'#FF8FA3'],[.55,'#E0314F'],[1,'#8E1029']],{radial:true});const C=[[260,260,120],[560,200,100],[470,480,130],[800,420,110]];
  const D=C.map(([x,y,r],i)=>{const c=el('g',{},g);el('circle',{r,fill:gr},c);el('circle',{r:r*.42,fill:'#B3152F','fill-opacity':.55,filter:'url(#blur4)'},c);el('circle',{r,fill:'none',stroke:'#FF6F86','stroke-width':4},c);return {c,x,y,i}});
  const sv=el('g',{},g);dr(el('path',{d:'M1000,200 C1080,180 1080,260 1060,350 C1040,440 1080,520 1000,500 C920,520 960,440 940,350 C920,260 920,180 1000,200 Z',fill:'#E0314F',stroke:'#FF6F86','stroke-width':4},sv));
  dr(el('line',{x1:140,y1:620,x2:380,y2:620,stroke:TH.ink,'stroke-width':3,'marker-end':arrowMarker('ink'),'marker-start':arrowMarker('ink')},g));
  Object.assign(A,{rbc:[560,200],biconcave:[1000,200],hemoglobin:[470,480],size:[260,620]});
  return {anchors:A,update(lt){D.forEach(o=>o.c.setAttribute('transform',`translate(${f2(o.x+Math.sin(lt*.6+o.i)*14)} ${f2(o.y+Math.cos(lt*.5+o.i*2)*12)})`))}}});
SM.items.wbc=preset(1200,800,(g,it)=>{const A={};const cell=el('path',{fill:TH.a5,'fill-opacity':.14,stroke:TH.a5,'stroke-width':6},g);
  const nu=[[470,330],[560,410],[470,480]].map(([x,y])=>el('ellipse',{cx:x,cy:y,rx:62,ry:50,fill:TH.a5,'fill-opacity':.6},g));dr(el('path',{d:'M470,330 Q560,350 560,410 Q560,460 470,480',fill:'none',stroke:TH.a5,'stroke-width':14,'stroke-opacity':.6},g));
  for(let k=0;k<30;k++)el('circle',{cx:330+seeded(k,1)*360,cy:230+seeded(k,2)*340,r:5,fill:TH.a2,'fill-opacity':.8},g);
  const bac=el('rect',{x:-50,y:-22,width:100,height:44,rx:22,fill:TH.a4,'fill-opacity':.8,stroke:TH.a4,'stroke-width':3},g);const ph=el('circle',{r:70,fill:'none',stroke:TH.a5,'stroke-width':4,'stroke-dasharray':'8 6'},g);
  Object.assign(A,{lobedNucleus:[560,410],granules:[330+seeded(4,1)*360,230+seeded(4,2)*340],pseudopod:[790,300],bacterium:[1000,400],phagosome:[760,420]});
  const T=it.cycle||7;return {anchors:A,update(lt,p,st){const u=((lt-st)/T%1+1)%1;const reach=Math.sin(Math.PI*clamp(u/.6))*0.9;
    const P=[];for(let i=0;i<40;i++){const a=i/40*TAU;let r=290*(1+.04*Math.sin(a*5+lt));const da=Math.abs(((a+Math.PI)%TAU)-Math.PI);if(da<.6)r+=reach*230*Math.cos(da/.6*Math.PI/2)**2;P.push([520+Math.cos(a)*r,400+Math.sin(a)*r*.9])}
    cell.setAttribute('d',smoothClosed(P));const bx=u<.35?1000:u<.6?lerp(1000,760,E.inOutCubic((u-.35)/.25)):760;bac.setAttribute('transform',`translate(${f2(bx)} 400) rotate(${f2(lt*20)})`);bac.setAttribute('opacity',f2(u<.75?1:1-clamp((u-.75)/.2)));
    mv(ph,760,400,u>.55?clamp((u-.55)/.1)*(1-clamp((u-.9)/.1)):0)}}});
SM.items.muscle=preset(1500,760,(g,it)=>{const A={};dr(el('rect',{x:60,y:40,width:1380,height:170,rx:85,...fillS('a3',.15,5)},g));for(let x=110;x<1400;x+=26)el('line',{x1:x,y1:52,x2:x,y2:198,stroke:TH.a3,'stroke-opacity':x%52?.25:.55,'stroke-width':x%52?3:6},g);
  [[260,70],[700,180],[1150,74]].forEach(([x,y])=>el('ellipse',{cx:x,cy:y,rx:40,ry:16,fill:TH.a5,'fill-opacity':.8},g));
  const Z=[0,1].map(()=>el('line',{y1:300,y2:700,stroke:TH.ink,'stroke-width':8},g));const act=[],myo=[];
  for(let r=0;r<5;r++){const y=340+r*80;[0,1].forEach(s=>act.push({e:el('line',{y1:y,y2:y,stroke:TH.a1,'stroke-width':6},g),s,y}));myo.push(el('line',{x1:540,x2:960,y1:y+40-40,y2:y,stroke:TH.a2,'stroke-width':18,'stroke-linecap':'round'},g))}
  const heads=myo.map(m=>[...Array(10)].map((_,k)=>el('line',{stroke:TH.a2,'stroke-width':4},g)));
  Object.assign(A,{fiber:[1300,60],nuclei:[700,180],sarcomere:[750,720],zline:[310,300],actin:[420,340],myosin:[750,340]});
  return {anchors:A,update(lt,p,st){const c=(1-Math.cos(((lt-st)/3)*TAU))/2;const zl=lerp(300,450,c),zr=lerp(1200,1050,c);at(Z[0],{x1:zl,x2:zl});at(Z[1],{x1:zr,x2:zr});
    act.forEach(o=>{if(o.s===0)at(o.e,{x1:zl,x2:zl+330,y1:o.y,y2:o.y});else at(o.e,{x1:zr,x2:zr-330,y1:o.y,y2:o.y})});
    heads.forEach((hs,r)=>{const y=340+r*80;hs.forEach((h,k)=>{const x=560+k*42,sgn=x<750?-1:1,sw=Math.sin(lt*8+k)*10;at(h,{x1:x,y1:y,x2:x+sgn*20+sw,y2:y-(k%2?1:-1)*24})})});myo.forEach((m,r)=>at(m,{y1:340+r*80,y2:340+r*80}))}}});
SM.items.epithelium=preset(1500,700,(g,it)=>{const A={};const n=7,w=180,x0=120;const mv2=[];for(let i=0;i<n;i++){const x=x0+i*w;dr(el('rect',{x:x+4,y:200,width:w-8,height:380,rx:14,...fillS('a1',.13,4)},g));el('ellipse',{cx:x+w/2,cy:470,rx:42,ry:58,fill:TH.a5,'fill-opacity':.65},g);
    for(let k=0;k<6;k++)mv2.push(el('rect',{x:x+14+k*27,y:150,width:16,height:52,rx:8,fill:TH.a1,'fill-opacity':.55},g));if(i)el('circle',{cx:x,cy:222,r:9,fill:TH.a2},g)}
  dr(el('line',{x1:100,y1:600,x2:1400,y2:600,stroke:TH.a4,'stroke-width':12},g));Object.assign(A,{microvilli:[x0+w*3.5,150],nucleus:[x0+w*1.5,470],basement:[1300,600],junction:[x0+w,222],epicell:[x0+w*5.5,330]});
  return {anchors:A,update(lt){mv2.forEach((m,i)=>m.setAttribute('height',f2(52+Math.sin(lt*2+i*.6)*6)))}}});
SM.items.sperm=preset(1500,500,(g,it)=>{const A={};const sg=el('g',{},g);dr(el('ellipse',{cx:200,cy:250,rx:110,ry:72,...fillS('a1',.2,5)},sg));el('path',{d:'M120,200 Q200,150 280,200 L280,215 Q200,175 120,215 Z',fill:TH.a2,'fill-opacity':.8},sg);
  el('ellipse',{cx:205,cy:258,rx:72,ry:44,fill:TH.a5,'fill-opacity':.6},sg);dr(el('rect',{x:305,y:232,width:220,height:36,rx:18,...fillS('a3',.25,4)},sg));for(let k=0;k<7;k++)el('ellipse',{cx:325+k*30,cy:250,rx:12,ry:16,fill:'none',stroke:TH.a3,'stroke-width':3},sg);
  const tl=el('path',{fill:'none',stroke:TH.a1,'stroke-width':7,'stroke-linecap':'round'},sg);Object.assign(A,{acrosome:[200,170],nucleus:[205,258],midpiece:[415,232],tailS:[1100,250]});
  return {anchors:A,update(lt){let d='M525,250';for(let x=525;x<=1440;x+=10){const u=(x-525)/915;d+=` L${x},${f2(250+Math.sin(u*9-lt*10)*70*u)}`}tl.setAttribute('d',d);sg.setAttribute('transform',`translate(0 ${f2(Math.sin(lt*10)*4)})`)}}});
SM.items.egg=preset(1000,1000,(g,it)=>{const A={};for(let k=0;k<26;k++){const a=k/26*TAU;dr(el('circle',{cx:500+Math.cos(a)*400,cy:500+Math.sin(a)*400,r:42,...fillS('a2',.25,3)},g))}
  dr(el('circle',{cx:500,cy:500,r:345,fill:'none',stroke:TH.a1,'stroke-width':30,'stroke-opacity':.35},g));dr(el('circle',{cx:500,cy:500,r:325,...fillS('a3',.12,4)},g));el('circle',{cx:560,cy:440,r:85,fill:TH.a5,'fill-opacity':.55},g);
  for(let k=0;k<40;k++)el('circle',{cx:300+seeded(k,1)*400,cy:300+seeded(k,2)*400,r:5,fill:TH.dim},g);const S=[0,1,2].map(()=>el('path',{fill:'none',stroke:TH.ink,'stroke-width':4},g));
  Object.assign(A,{corona:[500,100],zona:[150,500],cytoplasm:[380,650],nucleus:[560,440]});
  return {anchors:A,update(lt){S.forEach((s,i)=>{const a=i*2.1+.6,r=470+30*Math.sin(lt+i),x=500+Math.cos(a)*r,y=500+Math.sin(a)*r;let d=`M${f2(x)},${f2(y)}`;for(let k=1;k<10;k++){const rr=r+k*8;d+=` L${f2(500+Math.cos(a+Math.sin(lt*8+k)*.02)*rr)},${f2(500+Math.sin(a)*rr+Math.sin(lt*9+k)*4)}`}s.setAttribute('d',d)})}}});
/* ---------- ORGANS ---------- */
SM.items.lungs=preset(1200,1000,(g,it)=>{const A={};const L=el('g',{},g);
  const rl='M560,240 C430,240 250,330 210,560 C180,740 200,860 260,880 C360,900 470,860 540,820 C560,700 560,400 560,240 Z',ll='M640,240 C770,240 950,330 990,560 C1020,740 1000,860 940,880 C860,900 760,860 700,830 C720,760 690,720 650,700 C640,500 640,380 640,240 Z';
  dr(el('path',{d:rl,...fillS('a3',.2,6)},L));dr(el('path',{d:ll,...fillS('a3',.2,6)},L));dr(el('path',{d:'M250,520 C350,540 450,500 540,470 M240,700 C340,690 460,650 540,640',fill:'none',stroke:TH.a3,'stroke-width':3,'stroke-opacity':.6},L));dr(el('path',{d:'M960,600 C860,600 740,560 650,520',fill:'none',stroke:TH.a3,'stroke-width':3,'stroke-opacity':.6},L));
  dr(el('path',{d:'M570,20 L570,300 M630,20 L630,300',fill:'none',stroke:TH.a1,'stroke-width':8},g));for(let y=50;y<300;y+=34)el('line',{x1:570,y1:y,x2:630,y2:y,stroke:TH.a1,'stroke-width':5,'stroke-opacity':.6},g);
  const tips=[];const br=(x,y,a,len,w,d)=>{const x2=x+Math.cos(a)*len,y2=y+Math.sin(a)*len;dr(el('line',{x1:f2(x),y1:f2(y),x2:f2(x2),y2:f2(y2),stroke:TH.a1,'stroke-width':w,'stroke-linecap':'round'},L));if(d>0){br(x2,y2,a-.45,len*.72,w*.7,d-1);br(x2,y2,a+.4,len*.72,w*.7,d-1)}else tips.push([x2,y2])};
  br(600,300,Math.PI*.72,150,14,4);br(600,300,Math.PI*.28,150,14,4);tips.forEach(([x,y])=>{for(let k=0;k<3;k++)el('circle',{cx:f2(x+Math.cos(k*2)*12),cy:f2(y+Math.sin(k*2)*12),r:11,fill:TH.a3,'fill-opacity':.55,stroke:TH.a3,'stroke-width':2},L)});
  const dia=el('path',{fill:'none',stroke:TH.a2,'stroke-width':12,'stroke-linecap':'round'},g);const air=[...Array(10)].map(()=>dot(g,9,'#BFEFFF'));
  Object.assign(A,{trachea:[630,120],bronchus:[500,360],bronchiole:[300,560],alveoli:tips[3],rightLung:[220,600],leftLung:[990,600],diaphragm:[600,945]});
  return {anchors:A,update(lt,p,st){const br2=(it.rate||15)/60,ph=Math.sin((lt-st)*br2*TAU-Math.PI/2),inh=(ph+1)/2;L.setAttribute('transform',`translate(600 520) scale(${f2(1+.045*inh)},${f2(1+.06*inh)}) translate(-600 -520)`);
    const dy=lerp(905,950,inh);dia.setAttribute('d',`M150,${f2(dy+40)} C300,${f2(dy-60)} 900,${f2(dy-60)} 1050,${f2(dy+40)}`);const dir=Math.cos((lt-st)*br2*TAU-Math.PI/2)>0?1:-1;
    air.forEach((a,i)=>{const u=(((lt-st)*.8+i/10)%1);mv(a,600+Math.sin(i)*14,dir>0?lerp(20,300,u):lerp(300,20,u),prog(lt,st+.6,st+1)*.9)})}}});
SM.items.alveolus=preset(1400,800,(g,it)=>{const A={};dr(el('path',{d:'M470,0 L470,140 M560,0 L560,140',fill:'none',stroke:TH.a1,'stroke-width':10},g));
  dr(el('path',{d:blob(515,380,270,250,{seed:9,amp:.06}),...fillS('a1',.12,8)},g));const cap='M120,700 C200,420 260,700 515,690 C760,680 830,420 900,560 C960,690 1100,640 1360,600';
  const cg=gradient([[0,'#3D6BFF'],[1,'#FF3D5A']],{x1:0,y1:0,x2:1,y2:0});const cp=dr(el('path',{d:cap,fill:'none',stroke:cg,'stroke-width':70,'stroke-opacity':.55,'stroke-linecap':'round'},g));
  const path=el('path',{d:cap,fill:'none',stroke:'none'},g);const R=[...Array(9)].map(()=>el('ellipse',{rx:26,ry:15,fill:'#E0314F',stroke:'#FF8FA3','stroke-width':2},g));
  const O=[...Array(14)].map(()=>dot(g,9,'a1')),C=[...Array(10)].map(()=>dot(g,9,'#B8B8B8',false));
  Object.assign(A,{bronchiole:[560,60],alveolus:[300,250],capillary:[1250,615],o2:[515,560],co2:[650,520],rbc:[900,560]});
  let Lp=null;return {anchors:A,update(lt,p,st){if(Lp===null){try{Lp=path.getTotalLength()}catch(e){return}}R.forEach((r,i)=>{const u=((lt-st)*.07+i/9)%1;const q=path.getPointAtLength(u*Lp),q2=path.getPointAtLength(Math.min(Lp,u*Lp+2));
      r.setAttribute('transform',`translate(${f2(q.x)} ${f2(q.y)}) rotate(${f2(Math.atan2(q2.y-q.y,q2.x-q.x)*180/Math.PI)})`);r.setAttribute('fill',mixColor('#6B4BC8','#E0314F',clamp((q.x-300)/500)))});
    O.forEach((o,i)=>{const u=((lt-st)/3+seeded(i,1))%1;const x=380+seeded(i,2)*280;mv(o,x+Math.sin(u*6)*8,lerp(260+seeded(i,3)*120,680,E.inCubic(u)),prog(lt,st+.6,st+1)*(1-u))});
    C.forEach((c,i)=>{const u=((lt-st)/3.4+seeded(i,4))%1;const x=420+seeded(i,5)*260;mv(c,x+Math.sin(u*5)*8,lerp(680,300+seeded(i,6)*100,E.outCubic(u)),prog(lt,st+.6,st+1)*(1-u))})}}});
SM.items.kidney=preset(1000,1000,(g,it)=>{const A={};const bean='M520,90 C780,60 930,260 920,500 C910,760 760,930 520,910 C330,895 260,760 330,640 C380,560 380,440 330,360 C260,240 330,100 520,90 Z';
  dr(el('path',{d:bean,...fillS('a3',.28,8)},g));dr(el('path',{d:'M520,150 C730,130 860,290 855,500 C850,720 730,860 520,850 C400,842 360,760 410,680 C450,600 450,400 410,320 C370,240 400,160 520,150 Z',fill:TH.a3,'fill-opacity':.15},g));
  const pyr=[[640,230],[760,380],[770,560],[690,720],[560,800]].map(([x,y])=>{const a=Math.atan2(y-500,x-470);const bx=470+Math.cos(a)*140,by=500+Math.sin(a)*140;const nx=-Math.sin(a)*70,ny=Math.cos(a)*70;return dr(el('path',{d:`M${f2(x+nx)},${f2(y+ny)} L${f2(x-nx)},${f2(y-ny)} L${f2(bx)},${f2(by)} Z`,fill:TH.a3,'fill-opacity':.45,stroke:TH.a3,'stroke-width':3},g))});
  dr(el('path',{d:'M500,330 C620,380 620,620 500,670 C440,640 420,560 420,500 C420,440 440,360 500,330 Z',fill:TH.a2,'fill-opacity':.5,stroke:TH.a2,'stroke-width':4},g));
  dr(el('path',{d:'M440,560 C330,620 300,760 330,1000',fill:'none',stroke:TH.a2,'stroke-width':22,'stroke-linecap':'round'},g));const ar=dr(el('path',{d:'M430,450 C300,430 200,420 0,400',fill:'none',stroke:'#E0314F','stroke-width':26},g));const ve=dr(el('path',{d:'M430,500 C300,500 200,500 0,500',fill:'none',stroke:'#3D6BFF','stroke-width':30},g));
  const fa=flowDots(g,ar,{color:'#FF8FA3',n:6,speed:-.4,size:7}),fv=flowDots(g,ve,{color:'#9DB4FF',n:6,speed:.4,size:7});
  Object.assign(A,{cortex:[880,500],medulla:[760,380],pelvis:[520,500],ureter:[320,900],renalArtery:[150,415],renalVein:[150,500]});return {anchors:A,update(lt,p){fa(lt,p);fv(lt,p)}}});
SM.items.nephron=preset(1400,900,(g,it)=>{const A={};dr(el('path',{d:'M180,120 A130,130 0 1 0 330,250',...fillS('a1',.08,8)},g));const glo=dr(el('path',{d:blob(220,220,70,60,{seed:3,amp:.3,n:36}),fill:'none',stroke:'#E0314F','stroke-width':8},g));
  dr(el('path',{d:'M0,150 C80,150 120,180 160,200 M160,250 C120,280 80,300 0,300',fill:'none',stroke:'#E0314F','stroke-width':12},g));
  const tub='M320,240 C360,170 400,300 440,220 C480,150 520,300 560,240 C580,210 600,230 600,280 L600,760 C600,860 720,860 720,760 L720,330 C720,280 760,260 800,300 C840,340 880,220 920,280 C960,340 1000,240 1050,260';
  const tp=dr(el('path',{d:tub,fill:'none',stroke:TH.a2,'stroke-width':22,'stroke-opacity':.55,'stroke-linecap':'round','stroke-linejoin':'round'},g));const cd=dr(el('path',{d:'M1050,80 L1050,880',fill:'none',stroke:TH.a4,'stroke-width':34,'stroke-opacity':.5,'stroke-linecap':'round'},g));
  const f1=flowDots(g,tp,{color:'#FFE066',n:14,speed:.12,size:7}),f2_=flowDots(g,cd,{color:'#FFE066',n:6,speed:.15,size:7});
  Object.assign(A,{glomerulus:[220,220],bowman:[90,280],proximal:[440,220],loop:[660,850],distal:[920,280],collecting:[1050,700]});return {anchors:A,update(lt,p){f1(lt,p);f2_(lt,p)}}});
SM.items.brain=preset(1300,900,(g,it)=>{const A={};const outline='M180,520 C120,330 260,120 520,90 C760,60 1020,140 1110,340 C1170,480 1120,600 1000,640 C880,680 760,640 680,660 C560,690 430,700 330,660 C250,630 210,590 180,520 Z';
  const cid='brc'+Math.round(rnd(7)*1e6);const cp=el('clipPath',{id:cid},DEFS);el('path',{d:outline},cp);const R=el('g',{'clip-path':`url(#${cid})`},g);
  const regs={frontal:['M0,0 L560,0 L520,330 L330,620 L0,700 Z','a1'],parietal:['M560,0 L930,0 L900,380 L520,330 Z','a4'],occipital:['M930,0 L1300,0 L1300,700 L960,640 L900,380 Z','a5'],temporal:['M300,640 C360,500 520,430 700,430 C860,430 960,520 960,650 L700,740 Z','a2']};
  const RE={};for(const k in regs){RE[k]=el('path',{d:regs[k][0],fill:col(regs[k][1]),'fill-opacity':.32},R)}
  for(let k=0;k<16;k++)dr(el('path',{d:wavy(220+seeded(k,1)*780,150+seeded(k,2)*420,260+seeded(k,3)*780,180+seeded(k,4)*420,14,3),fill:'none',stroke:TH.ink,'stroke-width':4,'stroke-opacity':.35},R));
  dr(el('path',{d:outline,fill:'none',stroke:TH.ink,'stroke-width':7},g));const cb=dr(el('path',{d:'M820,660 C840,600 1060,610 1080,690 C1090,760 940,800 860,760 C820,740 810,700 820,660 Z',fill:TH.a3,'fill-opacity':.35,stroke:TH.a3,'stroke-width':5},g));
  for(let k=0;k<6;k++)el('path',{d:`M${840+k*8},${690+k*12} C${900},${670+k*14} ${1000},${680+k*14} ${1060-k*6},${700+k*10}`,fill:'none',stroke:TH.a3,'stroke-width':2,'stroke-opacity':.6},g);
  dr(el('path',{d:'M700,650 C700,720 720,800 700,900 L790,900 C780,800 790,720 800,660',fill:TH.a2,'fill-opacity':.3,stroke:TH.a2,'stroke-width':5},g));
  const sp=[...Array(18)].map(()=>dot(g,6,'#FFFFFF'));Object.assign(A,{frontal:[320,330],parietal:[740,180],occipital:[1060,420],temporal:[640,560],cerebellum:[960,740],brainstem:[750,850]});
  return {anchors:A,update(lt,p,st){const h=it.highlight;for(const k in RE){const on=h===k||(Array.isArray(h)&&h.includes(k));RE[k].setAttribute('fill-opacity',f2(on?.45+.25*Math.sin(lt*4):h?.12:.32))}
    sp.forEach((s,i)=>{const u=((lt*.7+seeded(i,1)*3)%1);mv(s,240+seeded(i+Math.floor(lt*.7+seeded(i,1)*3)*7,2)*800,180+seeded(i+Math.floor(lt*.7+seeded(i,1)*3)*7,3)*380,it.activity===false?0:Math.sin(Math.PI*u)*.9)})}}});
SM.items.digestive=preset(1000,1300,(g,it)=>{const A={};const route='M500,40 C500,120 500,160 500,200 L500,470 C520,520 560,520 640,500 C760,470 800,560 760,640 C720,700 640,700 600,690';
  dr(el('path',{d:'M400,30 C420,90 580,90 600,30',fill:'none',stroke:TH.a3,'stroke-width':10},g));dr(el('path',{d:'M500,90 L500,470',fill:'none',stroke:TH.a3,'stroke-width':26,'stroke-opacity':.55,'stroke-linecap':'round'},g));
  dr(el('path',{d:'M180,470 C200,380 420,370 560,420 C600,440 600,520 520,560 C400,610 230,620 180,470 Z',...fillS('#B5543C',.55,5)},g));dr(el('ellipse',{cx:470,cy:590,rx:34,ry:24,fill:TH.a4,'fill-opacity':.7},g));
  dr(el('path',{d:'M490,470 C560,440 720,430 780,520 C830,610 760,720 640,720 C590,720 590,680 620,660 C680,630 700,560 640,540 C580,520 540,520 500,500 Z',...fillS('a2',.35,6)},g));
  dr(el('path',{d:'M560,740 C650,720 760,730 820,700',fill:'none',stroke:'#E8C07A','stroke-width':28,'stroke-linecap':'round','stroke-opacity':.7},g));
  dr(el('path',{d:'M250,1060 L250,820 C250,770 290,760 340,760 L700,760 C750,760 780,780 780,830 L780,1120 C780,1170 700,1180 560,1180 L520,1260',fill:'none',stroke:TH.a5,'stroke-width':54,'stroke-opacity':.4,'stroke-linejoin':'round'},g));
  let si='M600,700';for(let r=0;r<5;r++){const y=830+r*60;si+=` C${r%2?380:680},${y-30} ${r%2?380:680},${y+30} ${r%2?660:360},${y+30}`}const sp=dr(el('path',{d:si,fill:'none',stroke:'#F2A3B3','stroke-width':26,'stroke-opacity':.6,'stroke-linecap':'round'},g));
  const food=dot(g,16,'#FFE066');const path=el('path',{d:route+' '+si.replace('M600,700',' L600,700'),fill:'none'},g);
  Object.assign(A,{mouth:[500,60],esophagus:[500,300],liver:[230,450],gallbladder:[470,590],stomach:[760,520],pancreas:[800,705],smallIntestine:[520,950],largeIntestine:[250,900],rectum:[540,1230]});
  let Lp=null;return {anchors:A,update(lt,p,st){if(Lp===null){try{Lp=path.getTotalLength()}catch(e){return}}const u=((lt-st-.8)/(it.cycle||9)%1+1)%1;const q=path.getPointAtLength(u*Lp);mv(food,q.x,q.y,prog(lt,st+.8,st+1.2))}}});
SM.items.eye=preset(1400,800,(g,it)=>{const A={};dr(el('circle',{cx:820,cy:400,r:330,...fillS('ink',.05,10)},g));dr(el('path',{d:'M560,190 C420,260 420,540 560,610',fill:TH.a1,'fill-opacity':.12,stroke:TH.a1,'stroke-width':8},g));
  dr(el('path',{d:'M1060,180 A330,330 0 0 1 1060,620',fill:'none',stroke:TH.a3,'stroke-width':14},g));dr(el('path',{d:'M545,250 L585,330 M545,550 L585,470',stroke:TH.a5,'stroke-width':16,'stroke-linecap':'round'},g));
  dr(el('ellipse',{cx:640,cy:400,rx:48,ry:100,fill:TH.a2,'fill-opacity':.35,stroke:TH.a2,'stroke-width':5},g));dr(el('path',{d:'M1140,360 L1400,330 M1140,440 L1400,470',stroke:TH.a2,'stroke-width':10},g));el('rect',{x:1140,y:360,width:260,height:80,fill:TH.a2,'fill-opacity':.25},g);
  const rays=[-1,0,1].map(k=>el('path',{fill:'none',stroke:'#FFE066','stroke-width':4,filter:'url(#glowS)'},g));const obj=lbl(g,'↑',80,400,{size:120,color:'a4'});
  Object.assign(A,{cornea:[470,300],iris:[565,280],pupil:[560,400],lens:[640,300],vitreous:[820,500],retina:[1140,300],opticNerve:[1300,340],sclera:[820,75]});
  return {anchors:A,update(lt,p,st){const q=E.inOutCubic(prog(lt,st+1,st+2.5));rays.forEach((r,i)=>{const k=i-1,y0=320+k*0,sy=[290,400,510][i];const fx=1145,fy=470;r.setAttribute('d',`M110,320 L470,${sy} L640,${sy+(400-sy)*.3} L${f2(lerp(640,fx,q))},${f2(lerp(sy+(400-sy)*.3,fy,q))}`)})}}});
// ===== 12-cam.js — camera helper items: magnifier (lupa), spotlight =====
// magnifier: {type:'magnifier', on:'@cell.mitochondria' | x,y, lens:[x,y], r:170, zoom:2.6, text:'Mitoxondriya', color:'a2'}
// The lens is placed automatically in free space (never over text, never off-frame) by the layout guard.
SM.items.magnifier={build(it,ctx){const S=ctx.scene;const g=el('g');let r=(it.r||210)*SU;const z=it.zoom||2.6;const tx=it.x??SW/2,ty=it.y??SH/2;
  let lx,ly;if(Array.isArray(it.lens)){lx=it.lens[0];ly=it.lens[1]}else{lx=tx<SW/2?Math.max(SW*.68,tx+r*2.4):Math.min(SW*.32,tx-r*2.4);ly=clamp(ty,r+120*SU,SH-r-110*SU)}
  const c=col(it.color||'a2');const id='mg'+Math.round(rnd(tx+ty*7+DEFS.childNodes.length)*1e9);const cp=el('clipPath',{id},DEFS);const cc=el('circle',{},cp);
  const con=el('line',{stroke:c,'stroke-width':f2(2.5*SU),'stroke-dasharray':`${6*SU} ${6*SU}`,opacity:.8},g);const tr=el('circle',{cx:f2(tx),cy:f2(ty),fill:'none',stroke:c,'stroke-width':f2(3*SU)},g);
  const inner=el('g',{'clip-path':`url(#${id})`},g);const bgc=el('circle',{fill:TH.bg2},inner);const use=el('use',{href:'#'+S.cam.id},inner);const glass=el('circle',{fill:'#fff',opacity:.06},inner);
  const ring=el('circle',{fill:'none',stroke:c,'stroke-width':f2(7*SU),filter:'url(#glowS)'},g);const hd=el('line',{stroke:c,'stroke-width':f2(16*SU),'stroke-linecap':'round'},g);
  let tl=null;const tlG=el('g',{},g);
  function place(nx,ny,nr){lx=nx;ly=ny;r=nr;[cc,bgc].forEach(e=>at(e,{cx:f2(lx),cy:f2(ly),r:f2(r)}));at(glass,{cx:f2(lx-r*.35),cy:f2(ly-r*.4),r:f2(r*.5)});at(ring,{cx:f2(lx),cy:f2(ly),r:f2(r)});at(tr,{r:f2(r/z)});
    // handle points away from the target so it never crosses the connector
    const ang=Math.atan2(ty-ly,tx-lx);const cand=[Math.PI*.25,Math.PI*.75,-Math.PI*.25,-Math.PI*.75].map(a=>{const ex=lx+Math.cos(a)*r*1.6,ey=ly+Math.sin(a)*r*1.6;const off=Math.max(0,-ex,ex-SW,-ey,ey-SH);const d=Math.abs(Math.atan2(Math.sin(a-ang),Math.cos(a-ang)));return {a,v:off*10-d*100+(Math.sin(a)<0?40:0)}}).sort((p,q)=>p.v-q.v);const ha=cand[0].a;at(hd,{x1:f2(lx+Math.cos(ha)*r*1.02),y1:f2(ly+Math.sin(ha)*r*1.02),x2:f2(lx+Math.cos(ha)*r*1.55),y2:f2(ly+Math.sin(ha)*r*1.55)});
    at(con,{x1:f2(lx+Math.cos(ang)*r),y1:f2(ly+Math.sin(ang)*r),x2:f2(tx-Math.cos(ang)*r/z),y2:f2(ty-Math.sin(ang)*r/z)});
    tlG.textContent='';if(it.text){const below=ly+r+70*SU<SH-24*SU;tl=lbl(tlG,it.text,lx,below?ly+r+46*SU:ly-r-22*SU,{size:(it.size||34)*SU,color:it.color||'a2',weight:800})}}
  place(lx,ly,r);
  return {g,overlay:true,noDraw:true,anchors:{get lens(){return [lx,ly]},target:[tx,ty]},setLens:place,lens:()=>({lx,ly,r,tx,ty,z,label:!!it.text,lw:it.text?tw(it.text,(it.size||34)*SU,800)+16*SU:0,auto:!Array.isArray(it.lens)}),update(lt,p,st){const q=E.outBack(prog(lt,st,st+.7));const s=Math.max(.01,q);
      g.setAttribute('transform',`translate(${f2(lx)} ${f2(ly)}) scale(${f2(s)}) translate(${f2(-lx)} ${f2(-ly)})`);
      const C=S.cs||{cx:SW/2,cy:SH/2,z:1,rot:0,sx:0,sy:0};const zz=z*(1+.04*Math.sin((lt-st)*1.3));
      const X=SW/2+C.sx+(tx-C.cx)*C.z,Y=SH/2+C.sy+(ty-C.cy)*C.z;use.setAttribute('transform',`translate(${f2(lx)} ${f2(ly)}) scale(${f2(zz)}) translate(${f2(-X)} ${f2(-Y)})`);
      tlG.setAttribute('opacity',f2(prog(lt,st+.5,st+1)))}}}};
// spotlight: dark overlay with a soft hole on target. {type:'spotlight', on:'@heart.lv', r:160, dim:.7}
SM.items.spotlight={build(it){const g=el('g');const r=(it.r||170)*SU;const tx=it.x??SW/2,ty=it.y??SH/2;const id='sp'+Math.round(rnd(tx*3+ty+DEFS.childNodes.length)*1e9);
  const m=el('mask',{id,maskUnits:'userSpaceOnUse',x:0,y:0,width:SW,height:SH},DEFS);el('rect',{x:0,y:0,width:SW,height:SH,fill:'#fff'},m);const gg=gradient([[0,'#000',1],[.7,'#000',1],[1,'#000',0]],{radial:true});
  const hole=el('circle',{cx:f2(tx),cy:f2(ty),r:f2(r),fill:gg},m);const rc=el('rect',{x:0,y:0,width:SW,height:SH,fill:'#000',mask:`url(#${id})`},g);
  return {g,overlay:true,noDraw:true,update(lt,p,st){const q=E.outCubic(prog(lt,st,st+.8));rc.setAttribute('opacity',f2(q*(it.dim??.68)));hole.setAttribute('r',f2(r*(1.8-.8*q)))}}}};
// ===== 13-3d.js — pseudo-3D engine (pure SVG): projection, view keyframes, spin, depth sort, shaded spheres =====
// common keys: yaw (deg, default -30), pitch (deg, default 18), spin (deg/s), view:[{t,dur,yaw,pitch,zoom}], persp (camera distance, 0=orthographic), zoom
const D2R=Math.PI/180;
function view3(it,box,Rm,{yaw=-30,pitch=18,spin=0}={}){const [bx,by,bw,bh]=box;const cx=bx+bw/2,cy=by+bh/2+(it.dy||0)*SU;const base=Math.min(bw,bh)*.42/(Rm||1);
  return (lt,st)=>{let Y=it.yaw??yaw,P=it.pitch??pitch,Z=it.zoom??1;(it.view||[]).forEach(k=>{const t0=(k.t??k.at??0),d=k.dur??1.5;const u=E.inOutCubic(prog(lt-st,t0,t0+d));if(k.yaw!=null)Y=lerp(Y,k.yaw,u);if(k.pitch!=null)P=lerp(P,k.pitch,u);if(k.zoom!=null)Z=lerp(Z,k.zoom,u)});
    Y+=(it.spin??spin)*(lt-st);const cY=Math.cos(Y*D2R),sY=Math.sin(Y*D2R),cP=Math.cos(P*D2R),sP=Math.sin(P*D2R);const D=(it.persp??6)*(Rm||1);const s=base*Z;
    const rot=([x,y,z])=>{const x1=x*cY+z*sY,z1=-x*sY+z*cY;return [x1,y*cP-z1*sP,y*sP+z1*cP]};
    const pr=v=>{const [x,y,z]=rot(v);const f=D>0?D/(D-z):1;return [cx+x*s*f,cy-y*s*f,z,f*s]};return {pr,rot,s,cx,cy,Y,P}}}
const SPH={};function sphereFill(c){c=col(c);if(SPH[c])return SPH[c];const id='sph'+Object.keys(SPH).length+'_'+Math.round(rnd(Object.keys(SPH).length+3.3)*1e6);const g=el('radialGradient',{id,cx:'36%',cy:'32%',r:'72%',fx:'30%',fy:'26%'},DEFS);
  [[0,'#ffffff',.95],[.18,mixColor(c,'#ffffff',.35),1],[.55,c,1],[1,mixColor(c,'#000000',.62),1]].forEach(([o,cc,a])=>el('stop',{offset:o,'stop-color':cc,'stop-opacity':a},g));return SPH[c]=`url(#${id})`}
const hexOf=c=>{c=col(c);if(c[0]==='#')return c.length===4?'#'+[1,2,3].map(i=>c[i]+c[i]).join(''):c;const m=c.match(/\d+/g);return m?'#'+m.slice(0,3).map(v=>(+v).toString(16).padStart(2,'0')).join(''):'#888888'};
const shade=(c,b)=>b>=.5?mixColor(hexOf(c),'#ffffff',(b-.5)*.7):mixColor(hexOf(c),'#000000',(.5-b)*1.3);
const LIGHT=(()=>{const v=[-.45,.65,.62];const n=Math.hypot(...v);return v.map(x=>x/n)})();
const sub2=s=>String(s).replace(/(\d+)/g,m=>[...m].map(d=>'₀₁₂₃₄₅₆₇₈₉'[d]).join(''));
function depthSort(parent,prims){prims.sort((a,b)=>a.z-b.z);prims.forEach(p=>parent.appendChild(p.el))}
function tag3(g,text,{size=28,color='ink',weight=800}={}){const t=el('text',{'text-anchor':'middle','font-size':f2(size*SU),'font-family':FONT,'font-weight':weight,fill:col(color),'paint-order':'stroke',stroke:TH.bg,'stroke-width':f2(5*SU),'stroke-linejoin':'round'},g);t.textContent=text;return t}

// ---------- mol3d ----------
const CPK3={H:['#F2F4F8',.31,1.1],C:['#5C6578',.76,1.7],O:['#FF4D4D',.66,1.52],N:['#4F7BFF',.71,1.55],Cl:['#3FD46B',1.0,1.75],S:['#FFD23F',1.05,1.8],P:['#FF9A3C',1.07,1.8],Na:['#A26BFF',1.66,2.27],F:['#9BE564',.57,1.47],Br:['#B5523B',1.2,1.85],K:['#8F40D4',2.03,2.75],Ca:['#3DFF8F',1.76,2.31],Fe:['#E07A3A',1.32,2.0],Mg:['#8AFF00',1.41,1.73],I:['#940094',1.39,1.98]};
const MOL3={H2O:{a:[['O',0,.12,0],['H',.757,-.47,0],['H',-.757,-.47,0]],name:'Suv'},
  CO2:{a:[['C',0,0,0],['O',-1.16,0,0],['O',1.16,0,0]],ord:{'0-1':2,'0-2':2},name:'Karbonat angidrid'},
  CH4:{a:[['C',0,0,0],['H',.629,.629,.629],['H',-.629,-.629,.629],['H',-.629,.629,-.629],['H',.629,-.629,-.629]],name:'Metan'},
  NH3:{a:[['N',0,.27,0],['H',.94,-.1,0],['H',-.47,-.1,.814],['H',-.47,-.1,-.814]],name:'Ammiak'},
  C2H4:{a:[['C',-.667,0,0],['C',.667,0,0],['H',-1.23,.92,0],['H',-1.23,-.92,0],['H',1.23,.92,0],['H',1.23,-.92,0]],ord:{'0-1':2},name:'Etilen'},
  C2H2:{a:[['C',-.6,0,0],['C',.6,0,0],['H',-1.66,0,0],['H',1.66,0,0]],ord:{'0-1':3},name:'Atsetilen'},
  C6H6:{a:(()=>{const a=[];for(let i=0;i<6;i++){const t=i*60*D2R;a.push(['C',1.39*Math.cos(t),1.39*Math.sin(t),0])}for(let i=0;i<6;i++){const t=i*60*D2R;a.push(['H',2.47*Math.cos(t),2.47*Math.sin(t),0])}return a})(),ord:{'0-1':2,'2-3':2,'4-5':2},name:'Benzol'},
  H2:{a:[['H',-.37,0,0],['H',.37,0,0]],name:'Vodorod'},O2:{a:[['O',-.6,0,0],['O',.6,0,0]],ord:{'0-1':2},name:'Kislorod'},N2:{a:[['N',-.55,0,0],['N',.55,0,0]],ord:{'0-1':3},name:'Azot'},
  HCl:{a:[['H',-.64,0,0],['Cl',.64,0,0]],name:'Vodorod xlorid'},Cl2:{a:[['Cl',-1,0,0],['Cl',1,0,0]],name:'Xlor'},
  C2H5OH:{a:[['C',-1.2,-.35,0],['C',.05,.5,0],['O',1.2,-.3,0],['H',1.95,.3,0],['H',-2.1,.25,0],['H',-1.2,-1,.88],['H',-1.2,-1,-.88],['H',.05,1.15,.88],['H',.05,1.15,-.88]],name:'Etil spirti'},
  CH3OH:{a:[['C',-.7,0,0],['O',.7,0,0],['H',1.05,.88,0],['H',-1.05,.52,.9],['H',-1.05,.52,-.9],['H',-1.05,-1.02,0]],name:'Metanol'},
  H2SO4:{a:[['S',0,0,0],['O',0,1.43,0],['O',0,-.6,1.3],['O',1.25,-.6,-.6],['O',-1.25,-.6,-.6],['H',1.6,-1.4,-.4],['H',-1.6,-1.4,-.4]],ord:{'0-1':2,'0-2':2},name:'Sulfat kislota'},
  C6H12O6:{a:(()=>{const a=[];const ring=[['O',0],['C',60],['C',120],['C',180],['C',240],['C',300]];ring.forEach(([e,d],i)=>a.push([e,1.45*Math.cos(d*D2R),(i%2?.25:-.25),1.45*Math.sin(d*D2R)]));[[1,1],[2,-1],[3,1],[4,-1]].forEach(([i,s])=>{const [_,x,y,z]=a[i];a.push(['O',x*1.75,y+s*1.2,z*1.75])});const c5=a[5];a.push(['C',c5[1]*1.9,c5[2]+.8,c5[3]*1.9]);a.push(['O',c5[1]*2.6,c5[2]+1.6,c5[3]*2.2]);return a})(),name:'Glyukoza'}};
SM.items.mol3d={build(it){const g=el('g');const B=boxOf(it);let P=MOL3[it.preset||it.formula||'H2O'];if(it.atoms)P={a:it.atoms,ord:it.orders||{},name:it.name};if(!P){SERR.push(`mol3d: unknown preset "${it.preset}" → ${Object.keys(MOL3).join(', ')}`);P=MOL3.H2O}
  const A=P.a.map(([e,x,y,z])=>({e,p:[x,y,z],c:(CPK3[e]||['#C9C9C9',.8,1.6])}));const fill=it.style==='fill'||it.style==='spacefill';
  const cen=[0,1,2].map(k=>A.reduce((s,a)=>s+a.p[k],0)/A.length);A.forEach(a=>a.p=a.p.map((v,k)=>v-cen[k]));
  const Rm=Math.max(1.2,...A.map(a=>Math.hypot(...a.p)+(fill?a.c[2]*.75:a.c[1]*.6)));const V=view3(it,[B[0],B[1],B[2],B[3]-(it.name!==false?60*SU:0)],Rm,{spin:it.spin??24});
  const bonds=[];const ORD={...(P.ord||{}),...(it.orders||{})};if(!fill)for(let i=0;i<A.length;i++)for(let j=i+1;j<A.length;j++){const d=Math.hypot(...[0,1,2].map(k=>A[i].p[k]-A[j].p[k]));const lim=(A[i].c[1]+A[j].c[1])*1.22;if(d<lim&&!(A[i].e==='H'&&A[j].e==='H'&&A.length>2)){const o=ORD[i+'-'+j]||ORD[j+'-'+i]||1;bonds.push({i,j,o,els:[]})}}
  const lay=el('g',{},g);const prims=[];const bw=(it.bond||.16);
  bonds.forEach(b=>{for(let k=0;k<b.o;k++)for(let h=0;h<2;h++){const l=el('line',{'stroke-linecap':'round',stroke:shade(A[h?b.j:b.i].c[0],.42)},lay);b.els.push(l);prims.push({el:l,z:0,b,k,h})}});
  A.forEach((a,i)=>{const gg=el('g',{},lay);const c=el('circle',{fill:sphereFill(a.c[0]),stroke:'rgba(0,0,0,.35)','stroke-width':f2(1.5*SU)},gg);let t=null;if(it.symbols!==false&&!fill){t=tag3(gg,a.e,{size:26,color:a.e==='H'?'#1C1B22':'#fff',weight:800});t.setAttribute('stroke','none')}a.g=gg;a.ci=c;a.t=t;prims.push({el:gg,z:0,a})});
  let nm=null;if(it.name!==false){nm=el('g',{},g);const t1=tag3(nm,sub2(it.label||it.preset||'')+(P.name&&it.name!==''?'  —  '+(it.name||P.name):''),{size:44,color:'ink'});at(t1,{x:f2(B[0]+B[2]/2),y:f2(B[1]+B[3]-14*SU)})}
  let ang=null;if(it.angle){ang=el('path',{fill:'none',stroke:col('a2'),'stroke-width':f2(3*SU)},g);ang.t=tag3(g,typeof it.angle==='string'?it.angle:(it.preset==='H2O'?'104,5°':it.preset==='CH4'?'109,5°':it.preset==='NH3'?'107°':it.preset==='CO2'?'180°':'120°'),{size:30,color:'a2'})}
  return {g,noDraw:true,len:()=>1.2+A.length*.08,anchors:{},update(lt,p,st){const v=V(lt,st);const S=A.map(a=>v.pr(a.p));const n=A.length;
      A.forEach((a,i)=>{const q=E.outBack(prog(lt,st+i*.07,st+i*.07+.5));const [x,y,z,sc]=S[i];const r=(fill?a.c[2]*.78:a.c[1]*.62+.12)*sc*Math.max(.01,q);at(a.ci,{cx:f2(x),cy:f2(y),r:f2(r)});if(a.t){at(a.t,{x:f2(x),y:f2(y+9*SU),'font-size':f2(Math.min(30,Math.max(14,r*.75)))});a.t.setAttribute('opacity',f2(q))}});
      prims.forEach(pm=>{if(pm.a){pm.z=S[A.indexOf(pm.a)][2];return}const b=pm.b;const [x1,y1,z1,s1]=S[b.i],[x2,y2,z2]=S[b.j];const q=prog(lt,st+.25+b.i*.05,st+.8+b.i*.05);let dx=x2-x1,dy=y2-y1;const L=Math.hypot(dx,dy)||1;const nx=-dy/L,ny=dx/L;const off=(pm.k-(b.o-1)/2)*bw*1.25*s1;
        const mx=(x1+x2)/2,my=(y1+y2)/2;const [ax,ay,bx,by]=pm.h?[mx,my,lerp(mx,x2,q),lerp(my,y2,q)]:[x1,y1,lerp(x1,mx,q*2>1?1:q*2),lerp(y1,my,q*2>1?1:q*2)];
        at(pm.el,{x1:f2(ax+nx*off),y1:f2(ay+ny*off),x2:f2(bx+nx*off),y2:f2(by+ny*off),'stroke-width':f2(bw*(b.o>1?.62:1)*s1)});pm.z=(pm.h?(z1+3*z2)/4:(3*z1+z2)/4)-.4});
      depthSort(lay,prims);if(nm)nm.setAttribute('opacity',f2(prog(lt,st+.6,st+1.2)));
      if(ang&&n>=3){const [cx,cy,,s0]=S[0],[ax,ay]=S[1],[bx,by]=S[2];const r=Math.max(60*SU,A[0].c[1]*.62*s0*1.35);let a1=Math.atan2(ay-cy,ax-cx),a2=Math.atan2(by-cy,bx-cx);let d=a2-a1;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;const q=prog(lt,st+1,st+1.6);
        ang.setAttribute('d',`M${f2(cx+Math.cos(a1)*r)},${f2(cy+Math.sin(a1)*r)} A${f2(r)},${f2(r)} 0 0 ${d>0?1:0} ${f2(cx+Math.cos(a1+d*q)*r)},${f2(cy+Math.sin(a1+d*q)*r)}`);const am=a1+d/2;at(ang.t,{x:f2(cx+Math.cos(am)*r*1.9),y:f2(cy+Math.sin(am)*r*1.9+10*SU),opacity:f2(q)})}}}}};

// ---------- lattice: NaCl / sc / bcc / fcc unit cells ----------
SM.items.lattice={build(it){const g=el('g');const B=boxOf(it);const kind=it.kind||'nacl';const n=it.n||(kind==='nacl'?3:2);const pts=[];const ed=[];
  const h=(n-1)/2;for(let i=0;i<n;i++)for(let j=0;j<n;j++)for(let k=0;k<n;k++){const p=[i-h,j-h,k-h];pts.push({p,e:kind==='nacl'?((i+j+k)%2?'Na':'Cl'):(it.element||'Fe')})}
  const key=p=>p.map(v=>v.toFixed(2)).join(',');const idx={};pts.forEach((o,i)=>idx[key(o.p)]=i);
  pts.forEach((o,i)=>[[1,0,0],[0,1,0],[0,0,1]].forEach(d=>{const j=idx[key(o.p.map((v,k)=>v+d[k]))];if(j!=null)ed.push([i,j])}));
  if(kind==='bcc')pts.push({p:[0,0,0],e:it.element||'Fe',c:true});if(kind==='fcc'){[[0,0,-h],[0,0,h],[0,-h,0],[0,h,0],[-h,0,0],[h,0,0]].forEach(p=>pts.push({p,e:it.element||'Cu',c:true}))}
  const Rm=Math.hypot(h,h,h)+.6;const V=view3(it,B,Rm,{spin:it.spin??16,pitch:22});const lay=el('g',{},g);const prims=[];
  ed.forEach(([i,j])=>{const l=el('line',{stroke:col('dim'),'stroke-width':f2(3*SU),'stroke-opacity':.7},lay);prims.push({el:l,i,j,z:0})});
  pts.forEach(o=>{const c=el('circle',{fill:sphereFill(it.colors&&it.colors[o.e]||(CPK3[o.e]||['#E8A33D'])[0])},lay);prims.push({el:c,o,z:0})});
  const rr=e=>kind==='nacl'?(e==='Cl'?.36:.22):.26;let lg=null;if(kind==='nacl'&&it.legend!==false){lg=el('g',{},g);const y=B[1]+B[3]-20*SU;[['Na⁺','Na'],['Cl⁻','Cl']].forEach(([t,e],k)=>{const x=B[0]+B[2]/2+(k?90:-130)*SU;el('circle',{cx:x,cy:y-12*SU,r:f2(16*SU),fill:sphereFill(CPK3[e][0])},lg);const tt=tag3(lg,t,{size:30});at(tt,{x:f2(x+40*SU),y:f2(y-2*SU)})})}
  return {g,noDraw:true,len:()=>2,update(lt,p,st){const v=V(lt,st);const S=pts.map(o=>v.pr(o.p));
    prims.forEach((pm,k)=>{if(pm.o){const i=pts.indexOf(pm.o);const [x,y,z,s]=S[i];const q=E.outBack(prog(lt,st+i*.03,st+i*.03+.45));at(pm.el,{cx:f2(x),cy:f2(y),r:f2(Math.max(.01,rr(pm.o.e)*s*q))});pm.z=z}else{const a=S[pm.i],b=S[pm.j];const q=prog(lt,st+.6,st+1.4);at(pm.el,{x1:f2(a[0]),y1:f2(a[1]),x2:f2(lerp(a[0],b[0],q)),y2:f2(lerp(a[1],b[1],q))});pm.z=(a[2]+b[2])/2-.3}});depthSort(lay,prims);lg&&lg.setAttribute('opacity',f2(prog(lt,st+1,st+1.6)))}}}};

// ---------- dna3d: rotating double helix ----------
SM.items.dna3d={build(it){const g=el('g');const B=boxOf(it);const N=it.pairs||20,tw=(it.turn??36)*D2R,rise=.34,R=1;const H=N*rise;const seq=(it.seq||'ATGCGTACCGTAGCTAGCTA').toUpperCase();
  const vert=it.vertical!==false;const Rm=Math.max(H/2,R)+.3;const V=view3(it,B,Rm,{spin:it.spin??30,pitch:it.pitch??8,yaw:0});const lay=el('g',{},g);const prims=[];
  const PC={A:col('a3'),T:col('a2'),G:col('a4'),C:col('a1')};const comp={A:'T',T:'A',G:'C',C:'G'};
  const P=(i,s)=>{const a=i*tw+(s?Math.PI*.8:0);const y=i*rise-H/2;return vert?[R*Math.cos(a),y,R*Math.sin(a)]:[y,R*Math.cos(a),R*Math.sin(a)]};
  for(let i=0;i<N;i++){const b=seq[i%seq.length]||'A';const c2=comp[b]||'T';
    const l1=el('line',{stroke:PC[b],'stroke-width':f2(10*SU),'stroke-linecap':'round'},lay),l2=el('line',{stroke:PC[c2],'stroke-width':f2(10*SU),'stroke-linecap':'round'},lay);prims.push({el:l1,i,k:'b1'},{el:l2,i,k:'b2'});
    if(i<N-1)[0,1].forEach(s=>{const l=el('line',{stroke:s?col('a5'):col('a1'),'stroke-width':f2(14*SU),'stroke-linecap':'round'},lay);prims.push({el:l,i,s,k:'bb'})});
    [0,1].forEach(s=>{const c=el('circle',{fill:sphereFill(s?'a5':'a1')},lay);prims.push({el:c,i,s,k:'n'})})}
  let lg=null;if(it.legend!==false){lg=el('g',{},g);[['A','T'],['G','C']].forEach(([a,b],k)=>{const x=B[0]+(vert?B[2]*.84:B[2]*.5+(k-.5)*300*SU),y=vert?B[1]+B[3]*.4+k*70*SU:B[1]+B[3]-12*SU;const t=tag3(lg,`${a} — ${b}`,{size:34,color:PC[a]});at(t,{x:f2(x),y:f2(y)})})}
  return {g,noDraw:true,len:()=>2.4,update(lt,p,st){const v=V(lt,st);const sh=(it.unzip?prog(lt,st+(it.unzip===true?2:it.unzip),st+(it.unzip===true?2:it.unzip)+3):0);
    prims.forEach(pm=>{const q=prog(lt,st+pm.i*.05,st+pm.i*.05+.5);if(pm.k==='n'){const [x,y,z,s]=v.pr(P(pm.i,pm.s));at(pm.el,{cx:f2(x),cy:f2(y),r:f2(Math.max(.01,.17*s*E.outBack(q)))});pm.z=z+.05}
      else if(pm.k==='bb'){const a=v.pr(P(pm.i,pm.s)),b=v.pr(P(pm.i+1,pm.s));at(pm.el,{x1:f2(a[0]),y1:f2(a[1]),x2:f2(lerp(a[0],b[0],q)),y2:f2(lerp(a[1],b[1],q)),'stroke-width':f2(.1*a[3])});pm.z=(a[2]+b[2])/2-.02}
      else{const A=P(pm.i,0),Bp=P(pm.i,1);const m=[0,1,2].map(k=>(A[k]+Bp[k])/2);const gap=sh*(1-pm.i/N*0)*.5;const fr=pm.k==='b1'?A:Bp;const to=m.map((v2,k)=>lerp(v2,fr[k],gap*1.6));const a=v.pr(fr),b=v.pr(to);const qq=prog(lt,st+.8+pm.i*.04,st+1.2+pm.i*.04);
        at(pm.el,{x1:f2(a[0]),y1:f2(a[1]),x2:f2(lerp(a[0],b[0],qq)),y2:f2(lerp(a[1],b[1],qq)),'stroke-width':f2(.09*a[3])});pm.z=(a[2]+b[2])/2-.1}});depthSort(lay,prims);lg&&lg.setAttribute('opacity',f2(prog(lt,st+1.5,st+2)))}}}};

// ---------- solid: geometric bodies (stereometriya) ----------
function solidGeo(kind,it){const a=it.a||2,b=it.b||a,c=it.c||it.h||a;let V=[],F=[],round=false;const ngon=(n,r,y)=>Array.from({length:n},(_,i)=>{const t=i/n*2*Math.PI;return [r*Math.cos(t),y,r*Math.sin(t)]});
  if(kind==='cube'||kind==='cuboid'){const [x,y,z]=kind==='cube'?[a,a,a]:[a,c,b];V=[[-1,-1,1],[1,-1,1],[1,-1,-1],[-1,-1,-1],[-1,1,1],[1,1,1],[1,1,-1],[-1,1,-1]].map(([i,j,k])=>[i*x/2,j*y/2,k*z/2]);F=[[0,1,2,3],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]]}
  else if(kind==='pyramid'){const n=it.n||4;V=ngon(n,a/Math.SQRT2*(n===4?1:1),-c/2);if(n===4)V=[[-a/2,-c/2,-a/2],[a/2,-c/2,-a/2],[a/2,-c/2,a/2],[-a/2,-c/2,a/2]];V.push([0,c/2,0]);F=[V.slice(0,n).map((_,i)=>n-1-i)];for(let i=0;i<n;i++)F.push([i,(i+1)%n,n])}
  else if(kind==='tetra'){const s=a/Math.sqrt(8/3)*1.2;V=[[1,1,1],[-1,-1,1],[-1,1,-1],[1,-1,-1]].map(p=>p.map(v=>v*s/1.6));F=[[0,1,2],[0,3,1],[0,2,3],[1,3,2]]}
  else if(kind==='octa'){const s=a*.75;V=[[s,0,0],[-s,0,0],[0,s,0],[0,-s,0],[0,0,s],[0,0,-s]];F=[[2,4,0],[2,0,5],[2,5,1],[2,1,4],[3,0,4],[3,5,0],[3,1,5],[3,4,1]]}
  else if(kind==='prism'){const n=it.n||3;const r=a*.62;V=[...ngon(n,r,-c/2),...ngon(n,r,c/2)];F=[Array.from({length:n},(_,i)=>i),Array.from({length:n},(_,i)=>2*n-1-i)];for(let i=0;i<n;i++)F.push([i,(i+1)%n,n+(i+1)%n,n+i].reverse())}
  else if(kind==='cylinder'||kind==='cone'||kind==='frustum'){const n=36;const r=a*.6,r2=kind==='cone'?0.0001:kind==='frustum'?r*(it.k??.5):r;V=[...ngon(n,r,-c/2),...ngon(n,r2,c/2)];F=[Array.from({length:n},(_,i)=>i)];if(kind!=='cone')F.push(Array.from({length:n},(_,i)=>2*n-1-i));for(let i=0;i<n;i++)F.push([i,(i+1)%n,n+(i+1)%n,n+i].reverse());round=true}
  return {V,F,round}}
SM.items.solid={build(it){const g=el('g');const B=boxOf(it);const kind=it.shape||it.kind||'cube';const c0=it.color||'a1';
  if(kind==='sphere'){const Rr=1;const V=view3(it,B,1.25,{spin:it.spin??20,pitch:20});const ball=el('circle',{fill:sphereFill(c0),opacity:.9},g);const lines=el('g',{fill:'none',stroke:'#fff','stroke-width':f2(1.6*SU)},g);const ls=[];
    for(let k=-2;k<=2;k++)ls.push({el:el('path',{},lines),f:t=>{const la=k*30*D2R;return [Math.cos(la)*Math.cos(t),Math.sin(la),Math.cos(la)*Math.sin(t)]}});for(let k=0;k<6;k++)ls.push({el:el('path',{},lines),f:t=>{const lo=k*30*D2R;return [Math.cos(t)*Math.cos(lo),Math.sin(t),Math.cos(t)*Math.sin(lo)]}});
    const rad=it.radius!==false?el('g',{},g):null;let rl,rt;if(rad){rl=el('line',{stroke:col('a2'),'stroke-width':f2(4*SU),'stroke-dasharray':`${10*SU} ${7*SU}`},rad);el('circle',{r:f2(7*SU),fill:col('a2')},rad).classList.add('c0');rt=tag3(rad,it.rLabel||'R',{size:40,color:'a2'})}
    return {g,noDraw:true,len:()=>2,update(lt,p,st){const v=V(lt,st);const q=E.outBack(prog(lt,st,st+.7));const s=v.s;at(ball,{cx:f2(v.cx),cy:f2(v.cy),r:f2(Math.max(.01,s*q))});
      ls.forEach(L=>{let d='',pen=false;for(let i=0;i<=72;i++){const P=L.f(i/72*2*Math.PI);const [x,y,z]=v.pr(P.map(w=>w*q));if(z>=-0.02){d+=(pen?'L':'M')+f2(x)+','+f2(y);pen=true}else pen=false}L.el.setAttribute('d',d)});lines.setAttribute('opacity',f2(.35*prog(lt,st+.4,st+1)));
      if(rad){const a=v.pr([0,0,0]),b=v.pr([Math.cos(.6),0,Math.sin(.6)]);const qq=prog(lt,st+1,st+1.6);at(rl,{x1:f2(a[0]),y1:f2(a[1]),x2:f2(lerp(a[0],b[0],qq)),y2:f2(lerp(a[1],b[1],qq))});rad.querySelector('.c0').setAttribute('cx',f2(a[0]));rad.querySelector('.c0').setAttribute('cy',f2(a[1]));at(rt,{x:f2((a[0]+b[0])/2),y:f2((a[1]+b[1])/2-14*SU),opacity:f2(qq)})}}}}
  const G=solidGeo(kind,it);const Rm=Math.max(...G.V.map(p=>Math.hypot(...p)))*1.08;const V=view3(it,B,Rm,{spin:it.spin??18,pitch:22});const lay=el('g',{},g);const fop=it.fillOpacity??.82;
  const faces=G.F.map(f=>({f,el:el('polygon',{'stroke-linejoin':'round'},lay),z:0}));
  const edges=[];const ek={};G.F.forEach((f,fi)=>f.forEach((v,k)=>{const w=f[(k+1)%f.length];const key=v<w?v+'-'+w:w+'-'+v;if(!ek[key]){ek[key]={a:Math.min(v,w),b:Math.max(v,w),fs:[]};edges.push(ek[key])}ek[key].fs.push(fi)}));
  const eg=el('g',{},g);edges.forEach(e=>{e.el=el('line',{stroke:col(it.edge||'ink'),'stroke-linecap':'round'},eg)});
  const vl=[];if(it.labels){const L=Array.isArray(it.labels)?it.labels:'ABCDEFGHKLMNOPQRS'.split('').map((ch,i)=>G.V.length===8?(i<4?ch:'ABCD'[i-4]+'₁'):ch);G.V.forEach((p,i)=>{if(G.round||!L[i])return;vl.push({i,t:tag3(g,L[i],{size:34,color:'a2'})})})}
  const ver=G.round?null:G.V.map(()=>el('circle',{r:f2(5*SU),fill:col('a2')},g));
  return {g,noDraw:true,len:()=>2.2,update(lt,p,st){const v=V(lt,st);const q=E.outCubic(prog(lt,st,st+.9));const S=G.V.map(P=>v.pr(P.map(w=>w*(.6+.4*q))));const RV=G.V.map(P=>v.rot(P));const OC=[0,1,2].map(k=>RV.reduce((s2,P)=>s2+P[k],0)/RV.length);
    const front=faces.map(fc=>{const [a,b,c]=fc.f.slice(0,3).map(i=>RV[i]);const u=[0,1,2].map(k=>b[k]-a[k]),w=[0,1,2].map(k=>c[k]-a[k]);let n=[u[1]*w[2]-u[2]*w[1],u[2]*w[0]-u[0]*w[2],u[0]*w[1]-u[1]*w[0]];const nl=Math.hypot(...n)||1;n=n.map(x=>x/nl);
      const sx=fc.f.map(i=>S[i]);const fcn=[0,1,2].map(k=>fc.f.reduce((s2,i)=>s2+RV[i][k],0)/fc.f.length);if(n[0]*(fcn[0]-OC[0])+n[1]*(fcn[1]-OC[1])+n[2]*(fcn[2]-OC[2])<0)n=n.map(x=>-x);const EYE=[0,0,(it.persp??6)*Rm];const fr=n[0]*(EYE[0]-fcn[0])+n[1]*(EYE[1]-fcn[1])+n[2]*(EYE[2]-fcn[2])>0;
      const br=.5+.5*(n[0]*LIGHT[0]+n[1]*LIGHT[1]+n[2]*LIGHT[2]);fc.el.setAttribute('points',sx.map(P=>f2(P[0])+','+f2(P[1])).join(' '));
      at(fc.el,{fill:shade(c0,clamp(br*.9+.1)),'fill-opacity':f2((fr?fop:fop*.35)*prog(lt,st+.3,st+1.1)),stroke:G.round?shade(c0,clamp(br*.9+.1)):'none','stroke-width':G.round?f2(1*SU):0});fc.z=fc.f.reduce((s2,i)=>s2+S[i][2],0)/fc.f.length+(fr?100:0);return fr});
    depthSort(lay,faces);const dq=prog(lt,st+.2,st+1.2);
    edges.forEach(e=>{const vis=e.fs.some(fi=>front[fi]);const sil=G.round?(e.fs.length<2||front[e.fs[0]]!==front[e.fs[1]]||(e.fs.length>1&&G.F[e.fs[0]].length>4)):true;const a=S[e.a],b=S[e.b];
      const isCap=G.round&&e.fs.some(fi=>G.F[fi].length>4);const show=G.round?(isCap||sil):true;at(e.el,{x1:f2(a[0]),y1:f2(a[1]),x2:f2(lerp(a[0],b[0],dq)),y2:f2(lerp(a[1],b[1],dq)),'stroke-width':f2((vis?3.2:2)*SU),'stroke-dasharray':vis?'none':`${9*SU} ${8*SU}`,opacity:show?(vis?.95:.55):0})});
    if(ver)ver.forEach((c,i)=>at(c,{cx:f2(S[i][0]),cy:f2(S[i][1]),opacity:f2(prog(lt,st+.8,st+1.2))}));
    vl.forEach(({i,t})=>{const [x,y]=S[i];const dx=x-v.cx,dy=y-v.cy;const L=Math.hypot(dx,dy)||1;at(t,{x:f2(x+dx/L*34*SU),y:f2(y+dy/L*34*SU+12*SU),opacity:f2(prog(lt,st+1,st+1.5))})})}}}};
// ===== 14-3d-world.js — globe, solar3d, axes3d (uses 13-3d.js helpers) =====
const CONT={africa:[[37,10],[31,32],[12,44],[11,51],[-4,40],[-26,33],[-34,20],[-17,12],[5,9],[4,-8],[15,-17],[28,-13],[35,-6]],
 eurasia:[[36,-9],[43,-9],[48,-4],[54,8],[58,6],[71,26],[69,60],[73,80],[77,105],[70,140],[66,180],[60,165],[53,142],[40,130],[31,122],[22,114],[10,106],[1,104],[14,98],[22,90],[8,77],[24,68],[25,57],[13,45],[30,32],[37,27],[41,20],[38,15],[44,9],[43,3]],
 namerica:[[70,-160],[71,-125],[68,-95],[63,-80],[52,-56],[45,-62],[41,-70],[30,-81],[25,-80],[30,-89],[19,-96],[15,-88],[8,-78],[17,-102],[32,-117],[48,-125],[58,-136],[60,-147],[55,-163]],
 samerica:[[11,-73],[8,-60],[-5,-35],[-23,-41],[-34,-54],[-52,-68],[-54,-71],[-40,-73],[-18,-71],[-5,-81]],
 australia:[[-11,132],[-12,142],[-25,153],[-38,147],[-35,137],[-34,115],[-22,114],[-14,127]],
 greenland:[[60,-44],[70,-22],[82,-30],[80,-65],[76,-70],[68,-53]]};
const ll3=(la,lo,r=1)=>[r*Math.cos(la*D2R)*Math.sin(lo*D2R),r*Math.sin(la*D2R),r*Math.cos(la*D2R)*Math.cos(lo*D2R)];
SM.items.globe={build(it){const g=el('g');const B=boxOf(it);const tilt=(it.tilt??23.4)*D2R;const V=view3(it,B,1.18,{spin:0,pitch:it.pitch??8,yaw:0});const rotSp=it.rotate??20;
  const tl=([x,y,z])=>[x*Math.cos(tilt)+y*Math.sin(tilt),-x*Math.sin(tilt)+y*Math.cos(tilt),z];
  const ring=el('circle',{fill:'none',stroke:'rgba(140,200,255,.35)','stroke-width':f2(10*SU),filter:'url(#glowS)'},g);
  const oc=el('circle',{fill:sphereFill(it.ocean||'#2E7BD6')},g);const land=el('g',{fill:col(it.land||'#5BC27A'),'fill-opacity':.92,stroke:'#2f8f52','stroke-width':f2(1.5*SU)},g);const cps=Object.values(CONT).map(c=>({c,el:el('path',{},land)}));
  const grid=el('g',{fill:'none',stroke:'#fff','stroke-width':f2(1.3*SU),'stroke-opacity':.28},g);const GL=[];for(let la=-60;la<=60;la+=30)GL.push({la,el:el('path',{},grid)});for(let lo=0;lo<180;lo+=30)GL.push({lo,el:el('path',{},grid)});
  const eq=it.equator!==false?el('path',{fill:'none',stroke:col('a2'),'stroke-width':f2(3*SU)},g):null;
  const ax=it.axis!==false?el('line',{stroke:col('ink'),'stroke-width':f2(3*SU),'stroke-dasharray':`${10*SU} ${8*SU}`},g):null;
  const night=it.night!==false?el('circle',{fill:gradient([[0,'#000',0],[.5,'#000',0],[.64,'#000',.7],[1,'#000',.85]],{x1:0,y1:0,x2:1,y2:0})},g):null;
  const pins=(it.pins||[]).map(pn=>{const pg=el('g',{},g);const c=el('circle',{r:f2(9*SU),fill:col(pn.color||'a3'),stroke:'#fff','stroke-width':f2(3*SU)},pg);const t=pn.text?tag3(pg,pn.text,{size:28}):null;return {pn,pg,c,t}});
  let cap=null;if(it.text){cap=tag3(g,it.text,{size:38});at(cap,{x:f2(B[0]+B[2]/2),y:f2(B[1]+B[3]-10*SU)})}
  return {g,noDraw:true,len:()=>2,update(lt,p,st){const v=V(lt,st);const sp=(it.lon??0)+rotSp*(lt-st);const q=E.outBack(prog(lt,st,st+.8));const R=Math.max(.01,v.s*q);
    const P=(la,lo)=>v.pr(tl(ll3(la,lo+sp)));const path=pts=>{let d='',pen=false;pts.forEach(([la,lo])=>{const [x,y,z]=P(la,lo);if(z>-.02){d+=(pen?'L':'M')+f2(x)+','+f2(y);pen=true}else pen=false});return d};
    at(oc,{cx:f2(v.cx),cy:f2(v.cy),r:f2(R)});at(ring,{cx:f2(v.cx),cy:f2(v.cy),r:f2(R*1.02)});
    cps.forEach(o=>{const pts=[];const c=o.c;for(let i=0;i<c.length;i++){const a=c[i],b=c[(i+1)%c.length];let db=b[1]-a[1];if(db>180)db-=360;if(db<-180)db+=360;for(let k=0;k<4;k++)pts.push([lerp(a[0],b[0],k/4),a[1]+db*k/4])}
      const proj=pts.map(([la,lo])=>P(la,lo));let d='';if(proj.some(p=>p[2]>0))d='M'+proj.map(([x,y,z])=>{if(z>=0)return f2(x)+','+f2(y);const dx=x-v.cx,dy=y-v.cy,L=Math.hypot(dx,dy)||1;return f2(v.cx+dx/L*R)+','+f2(v.cy+dy/L*R)}).join('L')+'Z';o.el.setAttribute('d',d)});
    land.setAttribute('opacity',f2(prog(lt,st+.3,st+1)));
    GL.forEach(o=>{const pts=[];if(o.la!=null)for(let i=0;i<=72;i++)pts.push([o.la,i*5]);else{for(let i=0;i<=72;i++)pts.push([-90+i*2.5,o.lo]);for(let i=0;i<=72;i++)pts.push([90-i*2.5,o.lo+180])}o.el.setAttribute('d',path(pts))});
    if(eq){const pts=[];for(let i=0;i<=72;i++)pts.push([0,i*5]);eq.setAttribute('d',path(pts));eq.setAttribute('opacity',f2(prog(lt,st+.8,st+1.4)))}
    if(ax){const a=v.pr(tl([0,1.3,0])),b=v.pr(tl([0,-1.3,0]));at(ax,{x1:f2(a[0]),y1:f2(a[1]),x2:f2(b[0]),y2:f2(b[1]),opacity:f2(prog(lt,st+.6,st+1.2))})}
    if(night)at(night,{cx:f2(v.cx),cy:f2(v.cy),r:f2(R)});
    pins.forEach(({pn,pg,c,t})=>{const [x,y,z]=P(pn.lat,pn.lon);pg.setAttribute('opacity',f2((z>.05?1:0)*prog(lt,st+1,st+1.4)));at(c,{cx:f2(x),cy:f2(y)});if(t)at(t,{x:f2(x),y:f2(y-20*SU)})});cap&&cap.setAttribute('opacity',f2(prog(lt,st+.6,st+1.2)))}}}};

const PLAN=[['Merkuriy','#B9B2A8',.38,.24],['Venera','#E8C27A',.95,.62],['Yer','#3F8CFF',1,1],['Mars','#E0603A',.53,1.88],['Yupiter','#D9A066',2.4,11.9],['Saturn','#E9CF8F',2.1,29.5],['Uran','#8FE3E8',1.4,84],['Neptun','#4E6CFF',1.35,165]];
SM.items.solar3d={build(it){const g=el('g');const B=boxOf(it);const n=Math.min(8,it.planets||8);const PL=PLAN.slice(0,n);const Rm=1.1+(n-1)*.55;const V=view3(it,B,Rm,{spin:it.spin??0,pitch:it.pitch??24,yaw:0});
  const orb=el('g',{fill:'none',stroke:col('dim'),'stroke-width':f2(1.6*SU),'stroke-opacity':.45},g);const lay=el('g',{},g);const prims=[];
  const sun={el:el('g',{},lay),z:0};const sc=el('circle',{fill:sphereFill('#FFC23D'),filter:'url(#glow2)'},sun.el);prims.push(sun);
  const P=PL.map(([nm0,c,sz,T],i)=>{const o={nm:nm0,c,sz,T,r:1.1+i*.55,ph:seeded(i,5)*6.28,el:el('g',{},lay),z:0,orb:el('path',{},orb)};o.ci=el('circle',{fill:sphereFill(c)},o.el);if(nm0==='Saturn')o.ring=el('ellipse',{fill:'none',stroke:'#E9CF8F','stroke-width':f2(4*SU),opacity:.8},o.el);if(it.labels!==false)o.t=tag3(o.el,nm0,{size:22,color:'dim',weight:700});prims.push(o);return o});
  return {g,noDraw:true,len:()=>2,update(lt,p,st){const v=V(lt,st);const t=lt-st;const sp=it.speed??1;
    const c0=v.pr([0,0,0]);at(sc,{cx:f2(c0[0]),cy:f2(c0[1]),r:f2(Math.max(.01,.55*c0[3]*E.outBack(prog(lt,st,st+.8))))});sun.z=c0[2];
    P.forEach((o,i)=>{const q=prog(lt,st+.3+i*.12,st+.9+i*.12);let d='';for(let k=0;k<=96*q;k++){const a=k/96*2*Math.PI;const [x,y]=v.pr([o.r*Math.cos(a),0,o.r*Math.sin(a)]);d+=(k?'L':'M')+f2(x)+','+f2(y)}o.orb.setAttribute('d',d);
      const a=o.ph+t*sp*2.2/Math.sqrt(o.T);const [x,y,z,f]=v.pr([o.r*Math.cos(a),0,o.r*Math.sin(a)]);const rr=Math.max(.01,(.07+.05*Math.sqrt(o.sz))*f*E.outBack(q));at(o.ci,{cx:f2(x),cy:f2(y),r:f2(rr)});
      if(o.ring)at(o.ring,{cx:f2(x),cy:f2(y),rx:f2(rr*2),ry:f2(Math.max(.01,rr*2*Math.abs(Math.sin((v.P+12)*D2R))))});if(o.t)at(o.t,{x:f2(x),y:f2(y-rr-12*SU),opacity:f2(q)});o.z=z;o.lr={x:x-tw(o.nm,22*SU,700)/2,y:y-rr-34*SU,w:tw(o.nm,22*SU,700),h:26*SU}});
    P.forEach(a=>P.forEach(b=>{if(a!==b&&a.t&&b.t&&a.z<b.z&&TL.hits(a.lr,b.lr,4*SU))a.t.setAttribute('opacity',0)}));depthSort(lay,prims)}}}};

SM.items.axes3d={build(it){const g=el('g');const B=boxOf(it);const L=it.size||3;const V=view3(it,B,L*1.25,{spin:it.spin??10,pitch:it.pitch??22,yaw:-35});
  const map=([x,y,z])=>[x,z,-y];
  const grid=it.grid!==false?el('g',{stroke:col('dim'),'stroke-width':f2(1*SU),'stroke-opacity':.35},g):null;const GL=[];if(grid)for(let k=-L;k<=L;k++){GL.push({el:el('line',{},grid),a:[k,-L,0],b:[k,L,0]});GL.push({el:el('line',{},grid),a:[-L,k,0],b:[L,k,0]})}
  let surf=null,SF=null;if(it.fn){try{SF=new Function('x','y','with(Math){return '+String(it.fn).replace(/\^/g,'**')+'}')}catch(e){SERR.push('axes3d fn: '+e.message)}surf=el('g',{fill:'none','stroke-width':f2(2*SU)},g)}
  const AX=[['x',[L,0,0],'a3'],['y',[0,L,0],'a4'],['z',[0,0,L],'a1']].map(([n,v,c])=>({n,v,c,l:el('line',{stroke:col(c),'stroke-width':f2(4*SU),'marker-end':arrowMarker(c)},g),t:tag3(g,n,{size:36,color:c})}));
  const SL=[];const N=it.res||16;if(surf)for(let i=0;i<=N;i++){SL.push({el:el('path',{},surf),i,dir:0});SL.push({el:el('path',{},surf),i,dir:1})}
  const VC=['a2','a5','a3'];const vecs=(it.vectors||[]).map((vc,i)=>{const c=vc.color||VC[i%3];return {vc,l:el('line',{stroke:col(c),'stroke-width':f2(6*SU),'marker-end':arrowMarker(c)},g),t:vc.text?tag3(g,vc.text,{size:32,color:c}):null,pp:vc.proj!==false?el('path',{fill:'none',stroke:col('dim'),'stroke-width':f2(2*SU),'stroke-dasharray':`${6*SU} ${6*SU}`},g):null}});
  const pts=(it.points||[]).map(pt=>({pt,c:el('circle',{r:f2(10*SU),fill:sphereFill(pt.color||'a2')},g),t:pt.text?tag3(g,pt.text,{size:28}):null}));
  return {g,noDraw:true,len:()=>2+vecs.length*.5,update(lt,p,st){const v=V(lt,st);const pr=q=>v.pr(map(q));const o=pr([0,0,0]);
    AX.forEach((a,i)=>{const q=E.outCubic(prog(lt,st+i*.15,st+i*.15+.7));const e=pr(a.v.map(w=>w*q));at(a.l,{x1:f2(o[0]),y1:f2(o[1]),x2:f2(e[0]),y2:f2(e[1])});const e2=pr(a.v.map(w=>w*1.12));at(a.t,{x:f2(e2[0]),y:f2(e2[1]+12*SU),opacity:f2(q)})});
    GL.forEach(l=>{const a=pr(l.a),b=pr(l.b);at(l.el,{x1:f2(a[0]),y1:f2(a[1]),x2:f2(b[0]),y2:f2(b[1])})});grid&&grid.setAttribute('opacity',f2(prog(lt,st,st+.8)));
    if(surf&&SF){const R=it.range||L*.9;const q=prog(lt,st+.8,st+2.2);const Z=(x,y)=>{let z=0;try{z=SF(x,y)}catch(e){}return isFinite(z)?z:0};
      SL.forEach(s=>{let d='';for(let k=0;k<=N;k++){const u=-R+2*R*s.i/N,w=-R+2*R*k/N;const [x,y]=s.dir?[w,u]:[u,w];const P=pr([x,y,Z(x,y)*q]);d+=(k?'L':'M')+f2(P[0])+','+f2(P[1])}s.el.setAttribute('d',d);const u=-R+2*R*s.i/N;const zc=s.dir?Z(0,u):Z(u,0);s.el.setAttribute('stroke',mixColor(hexOf('a1'),hexOf('a3'),clamp((zc+1)/2)))});surf.setAttribute('opacity',f2(.9*prog(lt,st+.8,st+1.2)))}
    vecs.forEach(({vc,l,t,pp},i)=>{const t0=st+1+i*.5;const q=E.outCubic(prog(lt,t0,t0+.8));const from=vc.from||[0,0,0];const to=from.map((w,k)=>lerp(w,vc.to[k],q));const a=pr(from),b=pr(to);at(l,{x1:f2(a[0]),y1:f2(a[1]),x2:f2(b[0]),y2:f2(b[1]),opacity:f2(clamp(q*3))});
      if(t){const b2=pr(vc.to.map((w,k)=>w+(w-from[k])*.12));at(t,{x:f2(b2[0]),y:f2(b2[1]),opacity:f2(q)})}if(pp){const [x,y,z]=vc.to;const A=pr([x,y,0]),X=pr([x,0,0]),Y=pr([0,y,0]),T=pr([x,y,z]);pp.setAttribute('d',`M${f2(T[0])},${f2(T[1])}L${f2(A[0])},${f2(A[1])}M${f2(X[0])},${f2(X[1])}L${f2(A[0])},${f2(A[1])}L${f2(Y[0])},${f2(Y[1])}`);pp.setAttribute('opacity',f2(.8*prog(lt,t0+.6,t0+1)))}});
    pts.forEach(({pt,c,t},i)=>{const P=pr(pt.at||pt.p||[0,0,0]);const q=prog(lt,st+1.2+i*.2,st+1.5+i*.2);at(c,{cx:f2(P[0]),cy:f2(P[1]),opacity:f2(q)});if(t)at(t,{x:f2(P[0]),y:f2(P[1]-18*SU),opacity:f2(q)})})}}}};/* ===== 15-typo.js — TYPO: 68 text effects. Every text runs IN → EMPHASIS → OUT, in this order, once (never replayed).
   in (32): fade rise drop slide-left slide-right zoom-in zoom-out pop blur-in typewriter scramble wave cascade flip-up tracking-in
            mask-up mask-down wipe-right highlight-in split-center rotate-in bounce elastic glitch-in skew-in random spin swing stretch rise-blur counter ink
   emph (18): pulse shake wiggle jump wave color glow highlight underline circle box heartbeat tilt rubber flash color-wave swell focus
   out (18): fade sink lift slide-out-left slide-out-right shrink blow blur-out typewriter-back scatter wave-out wipe-out flip-down collapse dissolve mask-out spin-out drop-out
   Units: 'l' line, 'w' word, 'c' character (chosen automatically from the effects used). */
const TYPO=(()=>{
const R=(i,k)=>{const x=Math.sin(i*127.1+k*311.7)*43758.5453;return x-Math.floor(x)};
const GL='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@$';const bump=k=>Math.sin(Math.PI*clamp(k));
let BLR=null,CID=0;function blurF(lv){if(!BLR)BLR=[1.2,2.6,4.5,7].map((d,i)=>{const id='tyb'+i;const f=el('filter',{id,x:'-40%',y:'-80%',width:'180%',height:'260%'},DEFS);el('feGaussianBlur',{stdDeviation:f2(d*SU)},f);return id});return `url(#${BLR[Math.min(3,lv-1)]})`}
const ec=E.outCubic;
// ---------- IN ----------
const I={
 fade:{m:'l',d:.6,sp:0,f:(s,k)=>{s.o*=ec(k)}},
 rise:{m:'l',d:.7,sp:.15,f:(s,k,u)=>{const e=ec(k);s.o*=e;s.y+=(1-e)*u.h*.6}},
 drop:{m:'w',d:.6,sp:.5,f:(s,k,u)=>{const e=ec(k);s.o*=e;s.y-=(1-e)*u.h*.7}},
 'slide-left':{m:'l',d:.7,sp:.12,f:(s,k,u)=>{const e=E.outExpo(k);s.o*=Math.min(1,k*2.5);s.x-=(1-e)*u.h*2.2}},
 'slide-right':{m:'l',d:.7,sp:.12,f:(s,k,u)=>{const e=E.outExpo(k);s.o*=Math.min(1,k*2.5);s.x+=(1-e)*u.h*2.2}},
 'zoom-in':{m:'w',d:.55,sp:.4,f:(s,k)=>{const e=ec(k);s.o*=e;s.s*=.3+.7*e}},
 'zoom-out':{m:'w',d:.6,sp:.4,f:(s,k)=>{const e=ec(k);s.o*=e;s.s*=1+(1-e)*1.2}},
 pop:{m:'w',d:.55,sp:.45,f:(s,k)=>{s.s*=Math.max(.01,E.outBack(k));s.o*=Math.min(1,k*3)}},
 'blur-in':{m:'w',d:.7,sp:.4,f:(s,k)=>{const e=ec(k);s.o*=e;s.bl=Math.round((1-e)*4)}},
 typewriter:{m:'c',d:.01,sp:'tw',caret:1,f:()=>{}},
 scramble:{m:'c',d:.5,sp:.7,f:(s,k,u,t)=>{s.o*=Math.min(1,k*5);if(u.ch.trim())s.txt=GL[Math.floor(R(u.i,Math.floor(t*24))*GL.length)]}},
 wave:{m:'c',d:.6,sp:.6,f:(s,k,u)=>{const e=E.outBack(k);s.o*=Math.min(1,k*2.5);s.y+=(1-e)*u.h*.7}},
 cascade:{m:'w',d:.7,sp:.6,f:(s,k,u)=>{const e=ec(k);s.o*=e;s.y-=(1-e)*u.h*.9;s.r-=(1-e)*12}},
 'flip-up':{m:'w',d:.6,sp:.45,f:(s,k)=>{s.sy*=Math.max(.01,E.outBack(k));s.o*=Math.min(1,k*2)}},
 'tracking-in':{m:'c',d:.9,sp:.1,f:(s,k,u)=>{const e=E.outExpo(k);s.o*=ec(k);s.x+=(u.cx-u.L.cx)*(1-e)*.6}},
 'mask-up':{m:'l',d:.75,sp:.18,x:'clip',f:(s,k,u)=>{s.y+=(1-E.outExpo(k))*u.h*1.2}},
 'mask-down':{m:'l',d:.75,sp:.18,x:'clip',f:(s,k,u)=>{s.y-=(1-E.outExpo(k))*u.h*1.2}},
 'wipe-right':{m:'l',d:.8,sp:.15,x:'clip',f:()=>{},L:(Ln,k)=>{Ln.cr.setAttribute('width',f2(Ln.cw*E.inOutCubic(k)))}},
 'highlight-in':{m:'w',d:.9,sp:.3,x:'mk0',f:(s,k)=>{s.o*=prog(k,.3,1)},L:(Ln,k)=>{const m=Ln.ex.mk0;m.setAttribute('width',f2(m.__w*ec(prog(k,0,.6))))}},
 'split-center':{m:'c',d:.7,sp:.15,f:(s,k,u)=>{const e=ec(k);s.o*=e;s.x+=(u.L.cx-u.cx)*(1-e)}},
 'rotate-in':{m:'w',d:.7,sp:.5,f:(s,k,u)=>{const e=E.outBack(k);s.r-=(1-e)*35;s.o*=Math.min(1,k*2);s.y+=(1-e)*u.h*.3}},
 bounce:{m:'w',d:.9,sp:.5,f:(s,k,u)=>{s.o*=Math.min(1,k*4);s.y-=(1-E.outBounce(k))*u.h*1.1}},
 elastic:{m:'w',d:1,sp:.4,f:(s,k)=>{s.s*=Math.max(.01,E.outElastic(k));s.o*=Math.min(1,k*4)}},
 'glitch-in':{m:'c',d:.6,sp:.5,f:(s,k,u,t)=>{const j=Math.floor(t*30);s.o*=R(u.i,j)<k*1.4?1:0;s.x+=(R(u.i,j+7)-.5)*u.h*.5*(1-k);if(R(u.i,j+3)>.7)s.fill='a3'}},
 'skew-in':{m:'w',d:.7,sp:.4,f:(s,k,u)=>{const e=E.outExpo(k);s.sk-=(1-e)*30;s.x-=(1-e)*u.h;s.o*=ec(k)}},
 random:{m:'c',d:.4,sp:.9,rnd:1,f:(s,k)=>{s.o*=ec(k)}},
 spin:{m:'c',d:.7,sp:.6,f:(s,k)=>{const e=E.outBack(k);s.r-=(1-e)*200;s.s*=Math.max(.01,ec(k));s.o*=Math.min(1,k*2)}},
 swing:{m:'w',d:1,sp:.5,f:(s,k)=>{s.r+=(1-E.outElastic(k))*50;s.o*=Math.min(1,k*3)}},
 stretch:{m:'w',d:.7,sp:.4,f:(s,k)=>{const e=E.outExpo(k);s.sx*=1+(1-e)*1.6;s.sy*=Math.max(.05,e);s.o*=ec(k)}},
 'rise-blur':{m:'w',d:.8,sp:.45,f:(s,k,u)=>{const e=ec(k);s.o*=e;s.y+=(1-e)*u.h*.5;s.bl=Math.round((1-e)*3)}},
 counter:{m:'w',d:1.4,sp:0,f:(s,k,u)=>{s.o*=Math.min(1,k*4);if(u.num)s.txt=u.num(E.outCubic(k))}},
 ink:{m:'w',d:1.1,sp:.5,f:(s,k)=>{s.dash=k}}
};
// ---------- EMPHASIS (only *accent* words when the text has them, otherwise all) ----------
const M={
 pulse:{m:'l',d:.8,sp:0,f:(s,k)=>{s.s*=1+.14*bump(k)}},
 shake:{m:'l',d:.7,sp:0,f:(s,k,u)=>{s.x+=Math.sin(k*TAU*5)*u.h*.08*(1-k)}},
 wiggle:{m:'w',d:.8,sp:.2,f:(s,k)=>{s.r+=Math.sin(k*TAU*4)*7*(1-k)}},
 jump:{m:'w',d:.5,sp:.5,f:(s,k,u)=>{s.y-=bump(k)*u.h*.4}},
 wave:{m:'c',d:.5,sp:.8,f:(s,k,u)=>{s.y-=bump(k)*u.h*.3}},
 color:{m:'w',d:1.4,sp:.2,f:(s,k)=>{if(k>.02&&k<.98)s.fill='a3'}},
 glow:{m:'l',d:1.4,sp:0,f:(s,k)=>{if(bump(k)>.08)s.glow=1}},
 highlight:{m:'w',d:.7,sp:0,keep:1,x:'mk',f:()=>{},L:(Ln,k)=>{const m=Ln.ex.mk;m.setAttribute('width',f2(m.__w*ec(k)))}},
 underline:{m:'w',d:.6,sp:0,keep:1,x:'ul',f:()=>{},L:(Ln,k)=>{const m=Ln.ex.ul;m.setAttribute('width',f2(m.__w*E.inOutCubic(k)))}},
 circle:{m:'w',d:.8,sp:0,keep:1,x:'ci',f:()=>{},L:(Ln,k)=>{Ln.ex.ci.style.strokeDashoffset=f2(1-E.inOutCubic(k))}},
 box:{m:'w',d:.8,sp:0,keep:1,x:'bx',f:()=>{},L:(Ln,k)=>{Ln.ex.bx.style.strokeDashoffset=f2(1-E.inOutCubic(k))}},
 heartbeat:{m:'l',d:1,sp:0,f:(s,k)=>{s.s*=1+.12*(bump(k/.4)+.8*bump((k-.45)/.4))}},
 tilt:{m:'w',d:.8,sp:.2,f:(s,k)=>{s.r-=5*bump(k)}},
 rubber:{m:'w',d:.7,sp:.1,f:(s,k)=>{const b=bump(k);s.sx*=1+.25*b;s.sy*=1-.18*b}},
 flash:{m:'l',d:.9,sp:0,f:(s,k)=>{s.o*=1-.75*Math.abs(Math.sin(k*Math.PI*3))}},
 'color-wave':{m:'c',d:.5,sp:.8,f:(s,k)=>{if(k>.05&&k<.95)s.fill='a2'}},
 swell:{m:'w',d:.9,sp:.1,f:(s,k,u)=>{const b=bump(k);s.s*=1+.08*b;s.y-=b*u.h*.05}},
 focus:{m:'w',d:2,sp:0,all:1,f:(s,k,u)=>{const b=Math.min(1,bump(k)*2.2);if(u.tg)s.s*=1+.06*b;else s.o*=1-.6*b}}
};
// ---------- OUT ----------
const O={
 fade:{m:'l',d:.5,sp:0,f:(s,k)=>{s.o*=1-E.inOutCubic(k)}},
 sink:{m:'l',d:.55,sp:.1,f:(s,k,u)=>{s.y+=E.inCubic(k)*u.h*.7;s.o*=1-k}},
 lift:{m:'l',d:.55,sp:.1,f:(s,k,u)=>{s.y-=E.inCubic(k)*u.h*.7;s.o*=1-k}},
 'slide-out-left':{m:'l',d:.6,sp:.1,f:(s,k,u)=>{s.x-=E.inExpo(k)*u.h*3;s.o*=1-prog(k,.5,1)}},
 'slide-out-right':{m:'l',d:.6,sp:.1,f:(s,k,u)=>{s.x+=E.inExpo(k)*u.h*3;s.o*=1-prog(k,.5,1)}},
 shrink:{m:'w',d:.5,sp:.3,f:(s,k)=>{s.s*=Math.max(.01,1-E.inCubic(k));s.o*=1-prog(k,.6,1)}},
 blow:{m:'w',d:.5,sp:.3,f:(s,k)=>{s.s*=1+E.inCubic(k)*1.2;s.o*=1-k}},
 'blur-out':{m:'w',d:.6,sp:.3,f:(s,k)=>{s.bl=Math.round(k*4);s.o*=1-E.inCubic(k)}},
 'typewriter-back':{m:'c',d:.01,sp:'tw',rev:1,f:()=>{}},
 scatter:{m:'c',d:.7,sp:.3,f:(s,k,u)=>{const e=E.inCubic(k);s.x+=(R(u.i,1)-.5)*u.h*6*e;s.y+=(R(u.i,2)-.5)*u.h*4*e;s.r+=(R(u.i,3)-.5)*360*k;s.o*=1-k}},
 'wave-out':{m:'c',d:.5,sp:.6,f:(s,k,u)=>{s.y+=E.inBack(k)*u.h*.9;s.o*=1-prog(k,.4,1)}},
 'wipe-out':{m:'l',d:.6,sp:.1,x:'clip',f:()=>{},L:(Ln,k)=>{const e=E.inOutCubic(k);Ln.cr.setAttribute('x',f2(Ln.cx0+Ln.cw*e));Ln.cr.setAttribute('width',f2(Ln.cw*(1-e)))}},
 'flip-down':{m:'w',d:.5,sp:.3,f:(s,k)=>{s.sy*=Math.max(.01,1-E.inCubic(k));s.o*=1-prog(k,.7,1)}},
 collapse:{m:'c',d:.6,sp:.1,f:(s,k,u)=>{s.x+=(u.L.cx-u.cx)*E.inCubic(k);s.o*=1-prog(k,.5,1)}},
 dissolve:{m:'c',d:.4,sp:.9,rnd:1,f:(s,k)=>{s.o*=1-E.inOutCubic(k)}},
 'mask-out':{m:'l',d:.6,sp:.12,x:'clip',f:(s,k,u)=>{s.y-=E.inExpo(k)*u.h*1.2}},
 'spin-out':{m:'c',d:.6,sp:.5,f:(s,k)=>{const e=E.inCubic(k);s.r+=e*200;s.s*=Math.max(.01,1-e)}},
 'drop-out':{m:'w',d:.8,sp:.4,f:(s,k,u)=>{s.y+=E.inQuad(k)*u.h*4;s.r+=k*(R(u.i,1)-.5)*60;s.o*=1-prog(k,.6,1)}}
};
const POOL={title:['mask-up','tracking-in','wave','blur-in','split-center','typewriter','cascade','rise-blur','skew-in','flip-up','slide-left','ink'],
  text:['rise','mask-up','rise-blur','slide-left','wipe-right','blur-in','cascade','fade'],emph:['highlight','underline','highlight','box','circle'],
  out:['fade','sink','lift','blur-out','mask-out','wipe-out','dissolve','slide-out-left']};
const pick=(pool,seed)=>{const P=POOL[pool]||pool;return P[Math.floor(R(seed+1,9)*P.length)%P.length]};
const rank={l:0,w:1,c:2};
function numFmt(word){if(!/\d/.test(word))return null;return e=>word.replace(/\d+(?:[.,]\d+)?/g,m=>{const dec=(m.split(/[.,]/)[1]||'').length;const sep=m.includes(',')?',':'.';const v=parseFloat(m.replace(',','.'))*e;return dec?v.toFixed(dec).replace('.',sep):String(Math.round(v))})}
function split(lg,L,mode){const toks=[];let a=false;String(L.s).split(/(\*)/).forEach(t=>{if(t==='*'){a=!a;return}if(t)toks.push({s:t,a})});
  const plain=toks.map(t=>t.s).join('');const ms=str=>tw(str,L.size,L.weight,L.fam||FONT);const W=ms(plain);const x0=L.anchor==='middle'?L.x-W/2:L.anchor==='end'?L.x-W:L.x;const out=[];
  const o={size:L.size,weight:L.weight,fam:L.fam||FONT,italic:L.italic};
  if(mode==='l'){if(plain.trim())out.push({el:textEl(lg,L.s,x0,L.y,{...o,color:L.color,accent:L.accent}),x:x0,w:W,acc:toks.some(t=>t.a)})}
  else{let pos=0;toks.forEach(tk=>{(mode==='c'?[...tk.s]:tk.s.split(/(\s+)/)).forEach(p=>{if(!p)return;if(/^\s+$/.test(p)){pos+=p.length;return}
    const px=ms(plain.slice(0,pos)),pw=ms(p);out.push({el:textEl(lg,p,x0+px,L.y,{...o,color:tk.a?(L.accent||'a1'):L.color}),x:x0+px,w:pw,ch:p,acc:tk.a,num:mode==='w'?numFmt(p):null});pos+=p.length})})}
  return {out,x0,W}}
function exEl(Ln,key,tg){const us=tg?Ln.units.filter(u=>u.tg):Ln.units;if(!us.length)return null;const x1=Math.min(...us.map(u=>u.x)),x2=Math.max(...us.map(u=>u.x+u.w));const sz=Ln.size,pad=sz*.14;let e;
  if(key==='mk'||key==='mk0'){e=el('rect',{x:f2(x1-pad),y:f2(Ln.y-sz*.84),height:f2(sz*1.04),width:0,rx:f2(sz*.14),fill:col(Ln.mark||'a2'),'fill-opacity':.24});Ln.lg.insertBefore(e,Ln.lg.firstChild);e.__w=x2-x1+pad*2}
  else if(key==='ul'){e=el('rect',{x:f2(x1),y:f2(Ln.y+sz*.14),height:f2(sz*.09),width:0,rx:f2(sz*.045),fill:col(Ln.mark||'a2')},Ln.lg);e.__w=x2-x1}
  else if(key==='ci'){const cx=(x1+x2)/2,cy=Ln.y-sz*.33,rx=(x2-x1)/2+sz*.45,ry=sz*.78;e=el('path',{d:`M${f2(cx-rx)},${f2(cy)} A${f2(rx)},${f2(ry)} 0 1 1 ${f2(cx+rx)},${f2(cy)} A${f2(rx)},${f2(ry)} 0 1 1 ${f2(cx-rx+sz*.35)},${f2(cy-sz*.16)}`,fill:'none',stroke:col(Ln.ring||'a3'),'stroke-width':f2(sz*.06),'stroke-linecap':'round',pathLength:1,'stroke-dasharray':'1 1'},Ln.lg);e.style.strokeDashoffset=1}
  else if(key==='bx'){e=el('rect',{x:f2(x1-pad*1.6),y:f2(Ln.y-sz*.9),width:f2(x2-x1+pad*3.2),height:f2(sz*1.2),rx:f2(sz*.2),fill:'none',stroke:col(Ln.ring||'a1'),'stroke-width':f2(sz*.055),pathLength:1,'stroke-dasharray':'1 1'},Ln.lg);e.style.strokeDashoffset=1}
  Ln.ex[key]=e;return e}
/* block(parent, lines, spec) → {g, len, update(lt, st, dur)}
   lines: [{s, x, y, size, weight, color, accent, anchor, fam, p(paragraph)}]
   spec: {in, emph, out, step (s between paragraphs), emphAt (s after start, default: after the reveal), outAt (s after start | 'end'), mark, ring} */
function block(parent,lines,sp={}){const warn=(k,n,T)=>{if(n&&!T[n])SERR_WARN.push(`typo: unknown ${k} effect "${n}" → ${Object.keys(T).join(', ')}`)};warn('in',sp.in,I);warn('emph',sp.emph,M);warn('out',sp.out,O);
  const EI=I[sp.in]||null,EM=M[sp.emph]||null,EO=O[sp.out]||null;const hasAcc=lines.some(l=>/\*[^*]+\*/.test(l.s));
  let mode=[EI,EM,EO].filter(Boolean).reduce((m,e)=>rank[e.m]>rank[m]?e.m:m,'l');if(EM&&hasAcc&&mode==='l')mode='w';
  const U={units:[],lines:[],g:el('g',{},parent)};
  lines.forEach((L,li)=>{const lg=el('g',{},U.g);const r=split(lg,L,mode);const Ln={...L,mark:L.mark||sp.mark,ring:L.ring||sp.ring,li,lg,ex:{},units:[],x0:r.x0,W:r.W,cx:r.x0+r.W/2};
    r.out.forEach(u=>{u.L=Ln;u.p=L.p||0;u.cx=u.x+u.w/2;u.cy=L.y-L.size*.35;u.h=L.size;u.i=U.units.length;u.fill0=u.el.getAttribute('fill');u.s0=u.el.textContent;u.ct=u.s0;u.cf=u.fill0;Ln.units.push(u);U.units.push(u)});U.lines.push(Ln)});
  const tgAll=!(hasAcc&&mode!=='l');U.units.forEach(u=>u.tg=tgAll||!!u.acc);
  const keys=[[EI,false],[EM,true],[EO,false]];U.lines.forEach(Ln=>{keys.forEach(([X,tg])=>{if(X&&X.x&&X.x!=='clip')exEl(Ln,X.x,tg)});
    if([EI,EO].some(X=>X&&X.x==='clip')&&Ln.units.length){const id='tyc'+(CID++);const cp=el('clipPath',{id},DEFS);Ln.cx0=Ln.x0-Ln.size*.4;Ln.cw=Ln.W+Ln.size*.8;Ln.cr=el('rect',{x:f2(Ln.cx0),y:f2(Ln.y-Ln.size*1.05),width:f2(Ln.cw),height:f2(Ln.size*1.5)},cp);Ln.cid=id}});
  const P={};U.units.forEach(u=>{(P[u.p]=P[u.p]||[]).push(u)});const pk=Object.keys(P).map(Number).sort((a,b)=>a-b);const step=sp.step??.45;
  const spT=(X,n)=>!X?0:X.sp==='tw'?Math.min(4,n*.045):X.sp*clamp(n/(X.m==='c'?14:X.m==='w'?5:2),.5,2.6);
  let inEnd=0,outLen=0,emLen=0;pk.forEach((p,pi)=>{const us=P[p],n=us.length,sI=spT(EI,n),sO=spT(EO,n),sM=spT(EM,n);
    us.forEach((u,k)=>{const f=n>1?k/(n-1):0,r=R(u.i,5);u.dIn=pi*step+(EI&&EI.rnd?r:f)*sI;u.dOut=(EO&&EO.rnd?r:EO&&EO.rev?1-f:f)*sO;u.dEm=(EM&&EM.rnd?r:f)*sM;
      inEnd=Math.max(inEnd,u.dIn+(EI?EI.d:0));if(EO)outLen=Math.max(outLen,u.dOut+EO.d);if(EM&&(u.tg||EM.all))emLen=Math.max(emLen,u.dEm+EM.d)})});
  let caret=null;if(EI&&EI.caret&&U.units.length){const L0=U.lines[0];caret=el('rect',{x:f2(L0.x0),y:f2(L0.y-L0.size*.8),width:f2(L0.size*.07),height:f2(L0.size*.95),fill:col(L0.accent||'a1'),opacity:0},U.g)}
  const kl=(us,base,X,key,lt)=>{if(!X||!us.length)return 0;let a=Infinity,b=-Infinity;us.forEach(u=>{a=Math.min(a,u[key]);b=Math.max(b,u[key])});return clamp((lt-base-a)/(b-a+X.d))};
  function apply(u,s,hide){const e=u.el;if(hide){if(u.vis!==0){e.setAttribute('opacity',0);u.vis=0}return}u.vis=1;e.setAttribute('opacity',f2(clamp(s.o)));
    if(s.x===0&&s.y===0&&s.s===1&&s.sx===1&&s.sy===1&&s.r===0&&s.sk===0){if(u.tf){e.removeAttribute('transform');u.tf=0}}
    else{e.setAttribute('transform',`translate(${f2(u.cx+s.x)} ${f2(u.cy+s.y)})${s.r?` rotate(${f2(s.r)})`:''}${s.sk?` skewX(${f2(s.sk)})`:''} scale(${f2(Math.max(.001,s.s*s.sx))} ${f2(Math.max(.001,s.s*s.sy))}) translate(${f2(-u.cx)} ${f2(-u.cy)})`);u.tf=1}
    const fl=s.bl>0?blurF(s.bl):s.glow?'url(#glowS)':null;if(fl!==(u.flt||null)){fl?e.setAttribute('filter',fl):e.removeAttribute('filter');u.flt=fl}
    const fill=s.fill?col(s.fill):u.fill0;if(fill!==u.cf){e.setAttribute('fill',fill);u.cf=fill}
    if(u.ch!=null){const tx=s.txt??u.s0;if(tx!==u.ct){e.textContent=tx;u.ct=tx}}
    if(s.dash!=null){const Lg=u.w*2.2+u.h;at(e,{stroke:u.cf,'stroke-width':f2(u.h*.03),'stroke-dasharray':`${f2(Lg)} ${f2(Lg)}`,'stroke-dashoffset':f2(Lg*(1-E.inOutCubic(clamp(s.dash*1.4)))),'fill-opacity':f2(prog(s.dash,.5,1))});u.ink=1}
    else if(u.ink){['stroke','stroke-width','stroke-dasharray','stroke-dashoffset','fill-opacity'].forEach(a=>e.removeAttribute(a));u.ink=0}}
  return {g:U.g,len:inEnd+(EM?emLen+.5:0),inEnd,spec:sp,update(lt,st,dur){
    const te=st+(sp.emphAt??(inEnd+.45));let to=Infinity;
    if(EO){to=(sp.outAt==null||sp.outAt==='end')?(dur??99)-outLen-.35:st+sp.outAt;to=Math.max(to,(EM?te+emLen:st+inEnd)+.3)}
    U.units.forEach(u=>{const s={o:1,x:0,y:0,s:1,sx:1,sy:1,r:0,sk:0,bl:0,fill:null,txt:null,dash:null,glow:0};let hide=false;
      if(EI){const k=clamp((lt-st-u.dIn)/EI.d);if(k<=0)hide=true;else if(k<1)EI.f(s,k,u,lt)}
      if(!hide&&EM&&(u.tg||EM.all)){const k=clamp((lt-te-u.dEm)/EM.d);if(k>0&&k<1)EM.f(s,k,u,lt)}
      if(!hide&&EO){const k=clamp((lt-to-u.dOut)/EO.d);if(k>=1)hide=true;else if(k>0)EO.f(s,k,u,lt)}
      apply(u,s,hide)});
    U.lines.forEach(Ln=>{if(!Ln.units.length)return;const kI=EI?kl(Ln.units,st,EI,'dIn',lt):1,kO=EO?kl(Ln.units,to,EO,'dOut',lt):0;
      if(Ln.cr){at(Ln.cr,{x:f2(Ln.cx0),width:f2(Ln.cw)});const on=(EI&&EI.x==='clip'&&kI<1)||(EO&&EO.x==='clip'&&kO>0);if(on!==!!Ln.con){on?Ln.lg.setAttribute('clip-path',`url(#${Ln.cid})`):Ln.lg.removeAttribute('clip-path');Ln.con=on}}
      if(EI&&EI.L)EI.L(Ln,kI);if(EM&&EM.L&&Ln.units.some(u=>u.tg))EM.L(Ln,kl(Ln.units.filter(u=>u.tg),te,EM,'dEm',lt));if(EO&&EO.L)EO.L(Ln,kO);
      for(const k in Ln.ex)if(Ln.ex[k])Ln.ex[k].setAttribute('opacity',f2(1-kO))});
    if(caret){const vis=U.units.filter(u=>lt-st-u.dIn>0);const t=lt-st;if(!vis.length||t>inEnd+.9)caret.setAttribute('opacity',0);else{const u=vis[vis.length-1];at(caret,{x:f2(u.x+u.w+u.h*.05),y:f2(u.L.y-u.h*.8),opacity:t>inEnd?(Math.floor(t*3)%2?0:1):1})}}}}}
return {I,M,O,POOL,pick,block,split,names:()=>({in:Object.keys(I),emph:Object.keys(M),out:Object.keys(O)})}})();
SM.typo=TYPO;
