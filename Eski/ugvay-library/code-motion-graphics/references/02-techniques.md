# Techniques cookbook

All snippets assume the template toolkit: `W,H,ctx,clamp,lerp,prog,E,spring,rnd,bg,dot,text`. Every function takes local time `lt` (seconds) and is pure.

Contents: 1 Bounce with squash & stretch · 2 Per-letter slam · 3 Mask line reveal · 4 Stagger · 5 Counter roll-up · 6 Typewriter · 7 3D point cloud + morph · 8 Flipping grid wave · 9 Line ribbon · 10 Ring tunnel · 11 Iris wipe · 12 Particles (seeded) · 13 SVG path draw · 14 Camera shake & zoom punch · 15 Light sweep · 16 Motion blur ghosts · 17 Seamless loops · 18 Bar/line chart build · 19 UI mockup motion · 20 Grain & vignette · 21 Parallax layers · 22 Liquid/blob morph · 23 Accent lands on a letter

## 1. Bounce with squash & stretch
```js
function bounceY(lt,floor,r){ // returns {y,sx,sy}
  const B=[[0,.6,520],[.6,1.0,240],[1.0,1.28,100],[1.28,1.46,36]]; // [start,end,height]
  for(const [a,b,h] of B){ if(lt>=a&&lt<b){ const p=(lt-a)/(b-a), y=floor-r-h*Math.sin(p*Math.PI);
      const v=Math.abs(Math.cos(p*Math.PI))*h/520; return {y,sx:1-v*.12,sy:1+v*.25}; } }
  for(const [a,,h] of B){ const d=Math.abs(lt-a); if(d<.06){ const k=(1-d/.06)*(.15+.35*h/520); return {y:floor-r*(1-k),sx:1+k,sy:1-k}; } }
  return {y:floor-r,sx:1,sy:1};
}
```

## 2. Per-letter slam (kinetic type)
```js
function slam(word,lt,cx,baseY,size,step=.12){
  ctx.font=`900 ${size}px ${FONT}`;
  const ws=[...word].map(c=>ctx.measureText(c).width), tot=ws.reduce((a,b)=>a+b,0);
  let x=cx-tot/2;
  [...word].forEach((ch,i)=>{ const p=prog(lt,i*step,i*step+.32);
    if(p>0){ const s=lerp(3.2,1,E.outExpo(p)), rot=lerp((i%2?1:-1)*.5,0,E.outBack(p));
      ctx.save(); ctx.translate(x+ws[i]/2,baseY-size*.35); ctx.rotate(rot); ctx.scale(s,s);
      ctx.globalAlpha=clamp(p*4); text(ch,0,size*.35,size,900); ctx.restore(); }
    x+=ws[i]; });
}
```
Add camera shake (14) peaking 0.12 s after each letter hit.

## 3. Mask line reveal
```js
function maskRise(str,lt,x,y,size,delay=0){
  const p=E.outExpo(prog(lt,delay,delay+.7));
  ctx.save(); ctx.beginPath(); ctx.rect(0,y-size*1.05,W,size*1.3); ctx.clip();
  text(str,x,y+lerp(size*1.2,0,p),size,800); ctx.restore();
}
```
Multi-line: call per line with delay `i*0.08`.

## 4. Stagger
```js
items.forEach((it,i)=>{ const d=i*0.06, p=E.outBack(prog(lt,d,d+.5)); /* use p for y, scale, alpha */ });
// from-center stagger: d = Math.abs(i-(n-1)/2)*0.05 ; radial: d = Math.hypot(i-ci,j-cj)*0.04
```

## 5. Counter roll-up
```js
const v=Math.round(target*E.outCubic(prog(lt,.1,1.0)));
text(v.toLocaleString('en-US')+'%',x,y,200,900);
// rolling digits: draw each digit column clipped, offset y by (digitValue+frac)*lineHeight
```

## 6. Typewriter / type-on
```js
const n=Math.floor(prog(lt,0,1.6)*str.length);
text(str.slice(0,n),x,y,64,600,C.ink,'left');
const cw=ctx.measureText(str.slice(0,n)).width;
if(Math.floor(lt*2)%2===0) ctx.fillRect(x+cw+6,y-56,4,64); // blinking cursor
```

## 7. 3D point cloud + morph (no 3D engine)
```js
const N=900, P=[];
for(let i=0;i<N;i++){ // sphere (fibonacci) and torus (30x30 grid), paired by index
  const k=i+.5, phi=Math.acos(1-2*k/N), th=Math.PI*(1+Math.sqrt(5))*k;
  const u=(i%30)/30*2*Math.PI, v=Math.floor(i/30)/30*2*Math.PI, R=.72, r=.3;
  P.push({a:[Math.cos(th)*Math.sin(phi),Math.cos(phi),Math.sin(th)*Math.sin(phi)],
          b:[(R+r*Math.cos(u))*Math.cos(v),r*Math.sin(u),(R+r*Math.cos(u))*Math.sin(v)]});
}
function cloud(lt){
  const m=E.inOutCubic(prog(lt,.25,1.2)), ay=lt*1.4, ax=.45, cy=Math.cos(ay), sy=Math.sin(ay), cx=Math.cos(ax), sx=Math.sin(ax);
  const out=P.map(({a,b})=>{ let x=lerp(a[0],b[0],m), y=lerp(a[1],b[1],m), z=lerp(a[2],b[2],m);
    const x1=x*cy-z*sy, z1=x*sy+z*cy, y1=y*cx-z1*sx, z2=y*sx+z1*cx, f=3.2/(3.2+z2);
    return [960+x1*400*f, 540+y1*400*f, z2, f]; }).sort((p,q)=>q[2]-p[2]); // painter's order
  for(const [x,y,z,f] of out){ const d=clamp((1.2-z)/2.4); ctx.globalAlpha=.15+.85*d;
    ctx.beginPath(); ctx.arc(x,y,1.4+2.6*f*d,0,7); ctx.fillStyle=C.ink; ctx.fill(); }
  ctx.globalAlpha=1;
}
```
Other targets: cube (`[sign*1,...]` on faces), helix, text points (sample a text bitmap from an offscreen canvas and use opaque pixels as targets), logo points.

## 8. Flipping grid wave
```js
const cols=14, rows=7, cell=112, ox=(W-cols*cell)/2, oy=(H-rows*cell)/2;
for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){
  const d=Math.hypot(i,j-rows+1)/15, p=E.inOutQuint(prog(lt,d,d+.55)), f=Math.cos(p*Math.PI);
  const w=(cell-14)*Math.abs(f); ctx.fillStyle=f>0?'#18181B':(rnd(i*31+j)<.16?C.acc:C.ink);
  ctx.beginPath(); ctx.roundRect(ox+i*cell+cell/2-w/2, oy+j*cell+7, w, cell-14, Math.min(8,w/2)); ctx.fill();
}
```

## 9. Line ribbon (phase-offset sines)
```js
for(let k=0;k<28;k++){ const f=k/27; ctx.beginPath();
  for(let x=0;x<=W;x+=12){ const u=x/W;
    const y=540+Math.sin(u*6+lt*3+f*1.6)*170*Math.sin(u*Math.PI)+(f-.5)*220*Math.cos(u*3+lt*1.5);
    x?ctx.lineTo(x,y):ctx.moveTo(x,y); }
  ctx.strokeStyle=`rgba(244,241,234,${.12+.5*Math.sin(f*Math.PI)})`; ctx.lineWidth=1.6; ctx.stroke(); }
```

## 10. Ring tunnel
```js
for(let i=0;i<26;i++){ let z=((i/26)-lt*.55)%1; if(z<0)z+=1; z=1-z; const r=40/(z+.02); if(r>1600)continue;
  ctx.save(); ctx.translate(960,540); ctx.rotate(lt*.8+i*.25); ctx.setLineDash([r*.35,r*.12]);
  ctx.strokeStyle=`rgba(244,241,234,${(1-z)*.6})`; ctx.lineWidth=Math.max(1,6*(1-z));
  ctx.beginPath(); ctx.arc(0,0,r,0,7); ctx.stroke(); ctx.restore(); }
ctx.setLineDash([]);
```

## 11. Iris wipe (grow / shrink)
```js
// grow: hero dot swallows the frame
dot(960,540,lerp(18,1300,E.inExpo(prog(lt,1.0,1.8))));
// shrink: new background closes into a point (even-odd hole)
const s=E.inOutCubic(prog(lt,1.4,1.9)); ctx.fillStyle=C.bg; ctx.beginPath(); ctx.rect(0,0,W,H);
ctx.arc(960,540,lerp(1300,30,s),0,7,true); ctx.fill('evenodd');
```

## 12. Particles (deterministic, closed-form)
```js
for(let i=0;i<400;i++){ const born=rnd(i)*2, age=lt-born; if(age<0||age>1.6)continue;
  const a=rnd(i+1)*Math.PI*2, sp=200+rnd(i+2)*600, g=900;
  const x=960+Math.cos(a)*sp*age, y=540+Math.sin(a)*sp*age+.5*g*age*age;
  ctx.globalAlpha=1-age/1.6; dot(x,y,2+rnd(i+3)*4,1,1,C.ink); }
ctx.globalAlpha=1;
```
Never integrate physics with `dt` from the real clock; use closed-form motion or a fixed-step simulation precomputed once for all frames.

## 13. SVG path draw (line-art, signatures, icons)
```js
// HTML: <path id="p" d="..."/>  JS in render(t):
const el=document.getElementById('p'), L=el.getTotalLength();
el.style.strokeDasharray=L; el.style.strokeDashoffset=L*(1-E.inOutCubic(prog(t,0,1.5)));
// Canvas equivalent: new Path2D(d) with setLineDash([L,L]) and lineDashOffset
```

## 14. Camera shake & zoom punch
```js
let shake=0; hits.forEach(h=>{ const d=lt-h; if(d>0&&d<.18) shake=Math.max(shake,(1-d/.18)*14); });
ctx.translate(Math.sin(lt*90)*shake, Math.cos(lt*77)*shake);         // deterministic shake
const punch = lt<.18 ? 1+(1-lt/.18)*.035 : 1;                        // on every cut
ctx.translate(960,540); ctx.scale(punch,punch); ctx.translate(-960,-540);
```

## 15. Light sweep across type
```js
const gx=lerp(x0-300,x1+300,prog(lt,.8,1.3)); ctx.save(); ctx.globalCompositeOperation='overlay';
const g=ctx.createLinearGradient(gx-160,0,gx+160,0); g.addColorStop(0,'#fff0'); g.addColorStop(.5,'#ffffffe6'); g.addColorStop(1,'#fff0');
ctx.fillStyle=g; ctx.fillRect(0,y0,W,h); ctx.restore();
```
For a clean sweep only on letters: draw the text to an offscreen canvas, then `source-atop` the gradient.

## 16. Motion blur ghosts
```js
for(let k=6;k>=0;k--){ const tt=lt-k*(1/240); ctx.globalAlpha=k?0.12:1; drawHero(tt); } ctx.globalAlpha=1;
```

## 17. Seamless loops
- Make every motion periodic in the loop length `L`: use `Math.sin(2*Math.PI*t/L)` etc., rotations by whole turns over `L`.
- Morph chains must end on the first shape. Noise: sample on a circle (`noise(cos(θ)*r, sin(θ)*r)`, θ=2πt/L).
- Export exactly `L*fps` frames, starting at t=0 and stopping before t=L.

## 18. Chart build (bars / line)
```js
data.forEach((v,i)=>{ const p=E.outCubic(prog(lt,i*.08,i*.08+.6)), h=v/max*600*p;
  ctx.fillStyle=i===hl?C.acc:C.ink; ctx.fillRect(x0+i*bw, 860-h, bw*.7, h); });
// line: build a Path2D through points, draw with setLineDash([len,len]) and lineDashOffset=len*(1-p)
```
Label values directly; axis lines thin and dim; numbers from the user only.

## 19. UI mockup motion (product videos)
- Draw rounded cards (`roundRect`, radius 12–20), soft shadow (`shadowBlur 30, shadowColor #0003`), fake cursor (arrow path) moving on `inOutCubic` arcs, click = 0.9 scale press + ripple circle.
- Sequence: cursor moves (0.5 s) → press (0.1 s) → UI responds (0.3 s outBack) → hold.
- Scroll: translate content with `inOutCubic`; mask to the device frame.

## 20. Grain & vignette
```js
const vg=ctx.createRadialGradient(960,540,400,960,540,1150); vg.addColorStop(0,'#0000'); vg.addColorStop(1,'#00000059');
ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);
// grain: pre-render 4 noise tiles (256px) once with seeded rnd; each frame draw tile[(frame%4)] with alpha .04 as a pattern
```

## 21. Parallax layers
```js
const cam=lerp(0,-400,E.inOutCubic(prog(lt,0,3)));
layers.forEach(L=>{ ctx.save(); ctx.translate(cam*L.depth,0); L.draw(lt); ctx.restore(); }); // depth: 1 fg, .6 mid, .3 bg
```

## 22. Liquid / blob morph
```js
ctx.beginPath(); for(let a=0;a<=64;a++){ const th=a/64*Math.PI*2;
  const r=220+40*Math.sin(th*3+lt*2)+25*Math.sin(th*5-lt*3);
  const x=960+Math.cos(th)*r, y=540+Math.sin(th)*r; a?ctx.lineTo(x,y):ctx.moveTo(x,y); }
ctx.closePath(); ctx.fill();
// gooey merge: draw circles to an offscreen canvas, apply ctx.filter='blur(20px)', then threshold via a contrast filter
```

## 23. Accent lands on a letter (match-cut logo)
```js
ctx.font=`800 ${size}px ${FONT}`; ctx.letterSpacing='-2px';
const shown=word.replace('i','ı');                    // dotless i, the accent becomes its dot
const pre=ctx.measureText(shown.slice(0,idx)).width, iw=ctx.measureText('ı').width; ctx.letterSpacing='0px';
const ix=x0+pre+iw/2, iy=baseline-size*.8;          // then animate dot from (sx,sy) to (ix,iy) on an arc and squash on landing
```
