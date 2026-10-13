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
