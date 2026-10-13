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
