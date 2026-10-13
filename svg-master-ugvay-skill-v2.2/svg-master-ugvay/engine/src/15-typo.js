/* ===== 15-typo.js — TYPO: 68 text effects. Every text runs IN → EMPHASIS → OUT, in this order, once (never replayed).
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
