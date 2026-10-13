/* ================= v2.3 LIBRARY KIT — shared helpers for the new shelves (additive; old items untouched) =================
   KIT.mix(a,b,t)  colour mix · KIT.vol(c) 3D-looking radial fill · KIT.lin(c1,c2) linear fill · KIT.rng(seed) seeded random (ONLY for space/nature)
   KIT.badge(g,x,y,text) "O‘xshatish" analogy badge · KIT.sim(steps,fn) cached deterministic simulation · KIT.lv(it) detail level 1..3 */
if(!E.inOutSine){E.inSine=t=>1-Math.cos(t*Math.PI/2);E.outSine=t=>Math.sin(t*Math.PI/2);E.inOutSine=t=>-(Math.cos(Math.PI*t)-1)/2}
const KIT=(()=>{
  const hx=c=>{c=col(c);if(c[0]!=='#')return [128,128,128];if(c.length===4)c='#'+[...c.slice(1)].map(x=>x+x).join('');return [1,3,5].map(i=>parseInt(c.slice(i,i+2),16))};
  const toHex=a=>'#'+a.map(v=>Math.round(clamp(v,0,255)).toString(16).padStart(2,'0')).join('');
  const mix=(a,b,t)=>{const A=hx(a),B=hx(b);return toHex(A.map((v,i)=>v+(B[i]-v)*t))};
  const dark=(c,t=.35)=>mix(c,'#000000',t),light=(c,t=.35)=>mix(c,'#ffffff',t);
  const vol=(c,{hi=.55,lo=.35,cx='38%',cy='34%'}={})=>{const id='kv'+Math.round(rnd(DEFS.childNodes.length+.31)*1e9);const g=el('radialGradient',{id,cx,cy,r:'70%'},DEFS);
    [[0,light(c,hi)],[.45,col(c)],[1,dark(c,lo)]].forEach(([o,s])=>el('stop',{offset:o,'stop-color':s},g));return `url(#${id})`};
  const lin=(c1,c2,{x1=0,y1=0,x2=0,y2=1,o1=1,o2=1}={})=>gradient([[0,col(c1),o1],[1,col(c2),o2]],{x1,y1,x2,y2});
  // mulberry32 — seeded PRNG, deterministic per seed (space, scenery). Medicine/anatomy NEVER uses it.
  const rng=seed=>{let a=(typeof seed==='string'?[...seed].reduce((h,c)=>Math.imul(h^c.charCodeAt(0),16777619)>>>0,2166136261):seed>>>0)||1;return ()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}};
  const ANALOGY={uz:'O‘xshatish (model)',en:'Analogy (model)',ru:'Аналогия (модель)'};
  const badge=(g,x,y,text,{color='#FFB547',size=24}={})=>{const s=text||ANALOGY[LANG]||ANALOGY.uz;const w=tw(s,size,700)+56;const b=el('g',{transform:`translate(${x} ${y})`},g);
    el('rect',{x:0,y:0,width:w,height:size*1.8,rx:size*.9,fill:color,'fill-opacity':.18,stroke:color,'stroke-width':2.5},b);
    el('circle',{cx:size*.95,cy:size*.9,r:size*.42,fill:color},b);const i=el('text',{x:size*.95,y:size*.9+size*.3,'text-anchor':'middle','font-size':size*.8,'font-weight':800,'font-family':FONT,fill:'#111'},b);i.textContent='≈';
    const t=el('text',{x:size*1.75,y:size*1.22,'font-size':size,'font-weight':700,'font-family':FONT,fill:color},b);t.textContent=s;return b};
  // deterministic simulation cache: fn(stepIndex, dt, state) → state ; frames stored so update(t) is a pure function of t
  const sim=(seconds,hz,init,step)=>{const dt=1/hz,N=Math.ceil(seconds*hz)+1,F=[];let s=init();for(let i=0;i<N;i++){F.push(JSON.parse(JSON.stringify(s)));for(let k=0;k<4;k++)s=step(s,dt/4,i*dt+k*dt/4)}
    return t=>{const x=clamp(t*hz,0,N-1.001),i=Math.floor(x);return {a:F[i],b:F[i+1]||F[i],f:x-i}}};
  const lv=it=>({kid:1,easy:1,school:2,pro:3,expert:3})[it.level||(LSN&&LSN.level)||'school']||2;
  const T=(o)=>o[LANG]||o.uz||o.en; // tiny i18n picker {uz,en,ru}
  const txt=(g,s,x,y,{size=28,color='ink',anchor='middle',weight=700,italic=false,op}={})=>{const t=el('text',{x,y,'text-anchor':anchor,'font-size':size,'font-family':FONT,'font-weight':weight,fill:col(color),'font-style':italic?'italic':undefined,opacity:op},g);t.textContent=s;return t};
  const cyc=(lt,st,T,off=0)=>((lt-st-off)/T%1+1)%1;
  // item-scoped label names: new shelves never overwrite the global NAMES used by old items
  const NS={},ALL={uz:{},en:{},ru:{}};let pend={},known=new Set(Object.keys(SM.items));
  const names=(target,obj)=>{const L=target===NAMES.uz?'uz':target===NAMES.en?'en':target===NAMES.ru?'ru':'uz';pend[L]=Object.assign(pend[L]||{},obj);Object.assign(ALL[L],obj)};
  const bind=()=>{Object.keys(SM.items).forEach(t=>{if(!known.has(t)){NS[t]=pend;known.add(t)}});pend={}};
  return {hx,mix,dark,light,vol,lin,rng,badge,sim,lv,T,txt,cyc,names,bind,NS,ALL};
})();
// realistic, theme-independent palette for medicine & nature ("atlas" look)
const NAT={blood:'#C62828',bloodD:'#7F1010',vein:'#3949AB',flesh:'#E8A598',muscle:'#C0392B',muscleL:'#E57373',fat:'#F6D776',bone:'#EFE6CF',boneD:'#BFAE88',cart:'#B9D7E8',
  skin1:'#F2C6A0',skin2:'#E0A47A',skin3:'#B9764B',melanin:'#5D3A1A',hair:'#3E2A1E',nerve:'#F4D03F',lymph:'#9CCC65',
  heP:'#E9A3C9',heP2:'#F4C6DF',heN:'#5B3A8C',heN2:'#7E57C2',heR:'#D81B60', // H&E stain: eosin pinks, haematoxylin purples, red cells
  dnaA:'#43A047',dnaT:'#E53935',dnaG:'#FDD835',dnaC:'#1E88E5',dnaU:'#FB8C00',sugar:'#90A4AE',
  leaf:'#3E8E41',leafD:'#245C2A',trunk:'#6D4C41',sky1:'#7EC8F2',sky2:'#D8F0FF',sand:'#E6C27A',water:'#2E86C1',snow:'#F4F8FB',rock:'#7D7F86'};
