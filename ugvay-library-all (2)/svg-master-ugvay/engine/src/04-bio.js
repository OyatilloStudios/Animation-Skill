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
let NMSCOPE=null; // v2.3: names of the item being built (new shelves) — checked first, never leaks into old items
const nm=k=>{const S=NMSCOPE;if(S){const v=(S[LANG]||{})[k]||(LANG!=='uz'&&LANG!=='en'?(S.en||{})[k]:null)||(LANG==='en'?null:(S.uz||{})[k]);if(v)return v}const g=(NAMES[LANG]||NAMES.uz)[k]||NAMES.en[k];if(g)return g;if(typeof KIT!=='undefined'){const a=(KIT.ALL[LANG]||{})[k]||KIT.ALL.uz[k];if(a)return a}return k};
// v2.4: anchors may be [x,y] | fn()→[x,y] | SVG element | {el,fx,fy,dx,dy} — element anchors are measured live (bbox through transforms)
function APt(a,ref){if(!a)return null;if(Array.isArray(a))return a;if(typeof a==='function')return APt(a(),ref);const e=a.el||(a.nodeType?a:null);if(!e)return null;
  try{const b=e.getBBox();if(b.width+b.height<.5)return null;const fx=a.fx??.5,fy=a.fy??.5;let x=b.x+b.width*fx,y=b.y+b.height*fy;const m=ref.getCTM().inverse().multiply(e.getCTM());return [m.a*x+m.c*y+m.e+(a.dx||0),m.b*x+m.d*y+m.f+(a.dy||0)]}catch(_){return null}}
function AVis(a,ref){const e=a&&(a.el||(a.nodeType?a:null));if(!e)return 1;try{const b=e.getBBox();if(b.width+b.height<.5)return 0}catch(_){return 0}let v=1;for(let n=e;n&&n!==ref;n=n.parentNode){if(!n.getAttribute)break;if(n.getAttribute('display')==='none'||n.style&&n.style.display==='none')return 0;const o=n.getAttribute('opacity');if(o!=null&&o!=='')v*=+o;const so=n.style&&n.style.opacity;if(so!==''&&so!=null)v*=+so;if(v<=.02)return 0}return clamp(v*4)}
const isEl=a=>!!(a&&(a.nodeType||a.el));
function preset(dw,dh,make){return {build(it,ctx){const box=boxOf(it);let labs=it.labels===true?null:(it.labels||[]);const g=el('g');
  let inner=box;const P0={};
  const wantAll=it.labels===true;
  const tmp=el('g');const P=make(tmp,it,P0);const LV=it.level||SM._SL||SM.LEVEL||'university';if(LV==='school')tmp.querySelectorAll('.uni').forEach(e=>e.remove());let names=wantAll?(P.core||Object.keys(P.anchors||{})):labs.map(l=>typeof l==='string'?l:l.part);if(wantAll&&LV==='school')names=(P.coreSchool||names).slice(0,it.schoolLabels||5);
  const texts=names.map((n,i)=>{const l=wantAll?n:labs[i];return typeof l==='object'&&l.text?l.text:nm(n)});
  const V0=P.view||[0,0,dw,dh];const SIDE={};let TBL=null;const AP0={};
  if(names.length){const ls=(it.labelSize||28)*SU;const Ls=[],Rs=[],Am=[];// v2.4: live anchors → choose label side from the AVERAGE position over the animation (sampled), not the first frame
    {const dyn=names.some(n=>{const a=(P.anchors||{})[n];return a&&!Array.isArray(a)});const ts=P.sideAt!=null?[P.sideAt]:(dyn&&P.update?[.6,1.6,2.6,3.6,4.6,5.6,6.6,7.6,8.6,9.6]:[]);const acc={};
      ts.forEach(t=>{try{P.update(t,1,0,1)}catch(_){return}names.forEach(n=>{const a=(P.anchors||{})[n];const q=APt(a,tmp);if(!q||AVis(a,tmp)<.05)return;const r=acc[n]||(acc[n]=[0,0,0]);r[0]+=q[0];r[1]+=q[1];r[2]++})});
      names.forEach(n=>{const r=acc[n];AP0[n]=r&&r[2]?[r[0]/r[2],r[1]/r[2]]:APt((P.anchors||{})[n],tmp)});if(ts.length&&P.update)try{P.update(0,0,0,1)}catch(_){}}
    names.forEach((n,i)=>{const a=AP0[n];if(!a)return;const l=wantAll?{}:(typeof labs[i]==='object'?labs[i]:{});const sd=l.side||(P.sides&&P.sides[n]);
      const o={i,n,x:a[0],fx:!!sd};if(sd==='left')Ls.push(o);else if(sd==='right')Rs.push(o);else if(Math.abs(a[0]-(V0[0]+V0[2]/2))<V0[2]*.08)Am.push(o);else (a[0]<V0[0]+V0[2]/2?Ls:Rs).push(o)});
    Am.forEach(o=>(Ls.length<=Rs.length?Ls:Rs).push(o));
    // balance the two columns (a crowded column makes long crossing leaders)
    for(let k=0;k<20&&Math.abs(Ls.length-Rs.length)>1;k++){const big=Ls.length>Rs.length?Ls:Rs,small=big===Ls?Rs:Ls;const mv=big.filter(o=>!o.fx).sort((a,b)=>big===Ls?b.x-a.x:a.x-b.x)[0];if(!mv)break;big.splice(big.indexOf(mv),1);small.push(mv)}
    Ls.forEach(o=>SIDE[o.i]='left');Rs.forEach(o=>SIDE[o.i]='right');
    const mwOf=arr=>arr.length?Math.min(box[2]*.3,Math.max(...arr.map(o=>tw(texts[o.i],ls,600)))+70*SU):24*SU;const mL=mwOf(Ls),mR=mwOf(Rs);inner=[box[0]+mL,box[1],box[2]-mL-mR,box[3]];
    // v2.4: alternative — label rows above/below (wins for wide drawings)
    const all=[...Ls,...Rs].map(o=>({...o,y:AP0[o.n][1]}));const cy=V0[1]+V0[3]/2;const T=[],B=[];all.sort((a,b)=>a.y-b.y).forEach(o=>{const f=P.sides&&P.sides[o.n];(f==='top'?T:f==='bottom'?B:o.y<cy?T:B).push(o)});
    const fxd=o=>P.sides&&/top|bottom/.test(P.sides[o.n]||'');for(let k=0;k<20&&(T.length>B.length+3||B.length>T.length+3);k++){if(T.length>B.length){const c=[...T].reverse().find(o=>!fxd(o));if(!c)break;T.splice(T.indexOf(c),1);B.unshift(c)}else{const c=B.find(o=>!fxd(o));if(!c)break;B.splice(B.indexOf(c),1);T.push(c)}}
    const rowsOf=arr=>{const w=arr.reduce((a,o)=>a+tw(texts[o.i],ls,600)+40*SU,0);return w<box[2]*.92?1:w<box[2]*1.8?2:3};const rT=T.length?rowsOf(T):0,rB=B.length?rowsOf(B):0;const bh=r=>r?r*ls*1.55+26*SU:0;
    const innerT=[box[0],box[1]+bh(rT),box[2],box[3]-bh(rT)-bh(rB)];const sS=Math.min(inner[2]/V0[2],inner[3]/V0[3]),sT=Math.min(innerT[2]/V0[2],innerT[3]/V0[3]);
    const lay=it.labelLayout||P.labelLayout||'auto';if(lay==='tb'||(lay==='auto'&&sT>sS*1.12&&rT<3&&rB<3)){inner=innerT;TBL={rows:{top:rT,bottom:rB}};T.forEach(o=>SIDE[o.i]='top');B.forEach(o=>SIDE[o.i]='bottom')}}
  const V=P.view||[0,0,dw,dh];const F0=fitIn(inner,V[2],V[3]);const F={...F0,x:F0.x-V[0]*F0.s,y:F0.y-V[1]*F0.s};const gi=el('g',{transform:`translate(${f2(F.x)} ${f2(F.y)}) scale(${f2(F.s)})`},g);while(tmp.firstChild)gi.appendChild(tmp.firstChild);
  let upL=null;if(names.length){const list=names.map((n,i)=>{const a=(P.anchors||{})[n];if(!a){SERR.push(`labels: part "${n}" not found in ${it.type}. Parts: ${Object.keys(P.anchors||{}).join(', ')}`);return null}
      const a0=AP0[n]||APt(a,gi)||[0,0];const l=wantAll?{}:(typeof labs[i]==='object'?labs[i]:{});return {x:F.x+a0[0]*F.s,y:F.y+a0[1]*F.s,text:texts[i],color:l.color,at:l.at,side:SIDE[i]||l.side||(P.sides&&P.sides[n]),get:()=>{const q=APt((P.anchors||{})[n],gi);return q?[F.x+q[0]*F.s,F.y+q[1]*F.s]:null},vis:(P.show&&P.show[n])||isEl((P.anchors||{})[n])||typeof (P.anchors||{})[n]==='function'?(lt=>{const a=(P.anchors||{})[n];return Math.min(P.show&&P.show[n]?P.show[n](lt):1,typeof a==='function'?(APt(a,gi)?1:0):AVis(a,gi))}):null}}).filter(Boolean);
    upL=TBL?placeLabelsTB(g,list.map(o=>({...o,band:o.side})),[F0.x,F0.y,V[2]*F.s,V[3]*F.s],{size:it.labelSize||28,start:0,rows:TBL.rows}):placeLabels(g,list,[F0.x,F0.y,V[2]*F.s,V[3]*F.s],{size:it.labelSize||28,start:0})}
  const anchorsStage={};for(const k in (P.anchors||{})){const q=APt(P.anchors[k],gi);if(q)anchorsStage[k]=[F.x+q[0]*F.s,F.y+q[1]*F.s]}
  if(it.glow)gi.setAttribute('filter','url(#glowS)');
  return {g,anchors:anchorsStage,frame:[F0.x,F0.y,V[2]*F.s,V[3]*F.s],len:()=>Math.max(P.len?P.len():0,names.length?(it.labelsAt!=null?it.labelsAt-0:(it.dur||1.4)+.2)+names.length*.35+.9:(it.dur||1.4)),update(lt,p,st,d){P.update&&P.update(lt,p,st,d);upL&&upL(lt-(it.labelsAt??(st+(it.dur||1.4)+.2)),lt)}}}}}
// organic closed blob path through n points (deterministic wobble)
function blob(cx,cy,rx,ry,{n=28,amp=.04,seed=1,t=0,speed=1}={}){const pts=[];for(let i=0;i<n;i++){const a=i/n*TAU,r=1+amp*(Math.sin(a*3+seed+t*speed)*.6+Math.sin(a*5+seed*2-t*speed*.7)*.4);pts.push([cx+Math.cos(a)*rx*r,cy+Math.sin(a)*ry*r])}return smoothClosed(pts)}
function smoothClosed(P){const n=P.length;let d=`M${f2(P[0][0])},${f2(P[0][1])}`;for(let i=0;i<n;i++){const p0=P[(i-1+n)%n],p1=P[i],p2=P[(i+1)%n],p3=P[(i+2)%n];
  d+=` C${f2(p1[0]+(p2[0]-p0[0])/6)},${f2(p1[1]+(p2[1]-p0[1])/6)} ${f2(p2[0]-(p3[0]-p1[0])/6)},${f2(p2[1]-(p3[1]-p1[1])/6)} ${f2(p2[0])},${f2(p2[1])}`}return d+'Z'}
function smoothOpen(P){let d=`M${f2(P[0][0])},${f2(P[0][1])}`;for(let i=0;i<P.length-1;i++){const p0=P[Math.max(0,i-1)],p1=P[i],p2=P[i+1],p3=P[Math.min(P.length-1,i+2)];
  d+=` C${f2(p1[0]+(p2[0]-p0[0])/6)},${f2(p1[1]+(p2[1]-p0[1])/6)} ${f2(p2[0]-(p3[0]-p1[0])/6)},${f2(p2[1]-(p3[1]-p1[1])/6)} ${f2(p2[0])},${f2(p2[1])}`}return d}
function wavy(x1,y1,x2,y2,amp,waves){const pts=[];const n=Math.max(8,waves*8);for(let i=0;i<=n;i++){const u=i/n,x=lerp(x1,x2,u),y=lerp(y1,y2,u);const nx=-(y2-y1),ny=x2-x1,L=Math.hypot(nx,ny)||1;const o=Math.sin(u*waves*TAU)*amp;pts.push([x+nx/L*o,y+ny/L*o])}return smoothOpen(pts)}
/* ---------- CELL (animal | plant) ---------- */
SM.items.cell=preset(1000,720,(g,it)=>{const plant=it.kind==='plant';const A={};const sw=5;
  let wall=null;if(plant){wall=dr(el('rect',{x:30,y:30,width:940,height:660,rx:60,fill:'none',stroke:TH.a4,'stroke-width':14,'stroke-opacity':.85},g));A.wall=[30,220]}
  const cyto=el('path',{fill:gradient([[0,'a1',.16],[1,'a1',.05]],{radial:true}),stroke:TH.a1,'stroke-width':sw,filter:'url(#glowS)'},g);dr(cyto);A.membrane=plant?[48,420]:[90,520];A.cytoplasm=[300,560];
  const parts=el('g',{},g);
  let vac=null;if(plant){vac=el('path',{d:blob(560,380,270,190,{seed:3,amp:.05}),fill:TH.a1,'fill-opacity':.12,stroke:TH.a1,'stroke-width':3,'stroke-opacity':.7},parts);dr(vac);A.vacuole=[600,380]}
  const nx=plant?240:440,ny=plant?230:340,nr=plant?95:125;
  const nuc=dr(el('circle',{cx:nx,cy:ny,r:nr,fill:TH.a5,'fill-opacity':.2,stroke:TH.a5,'stroke-width':5},parts));el('circle',{cx:nx+nr*.25,cy:ny-nr*.15,r:nr*.32,fill:TH.a5,'fill-opacity':.6},parts);
  for(let k=0;k<5;k++)dr(el('path',{d:wavy(nx-nr*.6,ny-nr*.4+k*nr*.22,nx+nr*.3,ny-nr*.3+k*nr*.22,6,3),fill:'none',stroke:TH.a5,'stroke-width':2.5,'stroke-opacity':.55},parts));
  for(let k=0;k<10;k++){const a=k/10*TAU;el('circle',{cx:nx+Math.cos(a)*nr,cy:ny+Math.sin(a)*nr,r:4,fill:TH.bg},parts)}
  A.nucleus=[nx-nr*.7,ny+nr*.55];A.nucleolus=[nx+nr*.25,ny-nr*.15];
  const mito=(x,y,rot,s=1)=>{const m=el('g',{transform:`translate(${x} ${y}) rotate(${rot}) scale(${s})`},parts);dr(el('rect',{x:-75,y:-32,width:150,height:64,rx:32,fill:TH.a2,'fill-opacity':.18,stroke:TH.a2,'stroke-width':4},m));
    dr(el('path',{d:'M-58,0 '+[...Array(7)].map((_,i)=>`L${-50+i*16},${i%2?-20:20}`).join(' ')+' L58,0',fill:'none',stroke:TH.a2,'stroke-width':3,'stroke-linejoin':'round'},m));return m};
  const ms=plant?[[800,170,20],[160,540,-30],[860,560,40]]:[[770,175,25],[230,520,-20],[760,520,60]];ms.forEach(([x,y,r])=>mito(x,y,r,plant?.8:1));A.mitochondria=[ms[1][0],ms[1][1]+30];
  if(!plant||true){const ex=plant?380:600,ey=plant?240:330;for(let k=0;k<4;k++)dr(el('path',{d:wavy(ex+k*26,ey-150+k*10,ex+40+k*26,ey+140-k*10,10,4),fill:'none',stroke:TH.a4,'stroke-width':4,'stroke-opacity':.8},parts));A.er=[ex+46,ey-5];
    let rb=null,rbd=1e9;for(let k=0;k<26;k++){const u=seeded(k,1),v=seeded(k,2),X=ex-10+u*120,Y=ey-140+v*280;const c=el('circle',{cx:X,cy:Y,r:4,fill:TH.ink,'fill-opacity':.7},parts);const dd=Math.hypot(X-(ex+95),Y-(ey+110));if(dd<rbd){rbd=dd;rb=[X,Y]}}A.ribosome=rb}
  const gx=plant?720:770,gy=plant?560:380;for(let k=0;k<4;k++)dr(el('path',{d:`M${gx-70+k*6},${gy-40+k*24} Q${gx},${gy-70+k*24} ${gx+70-k*6},${gy-40+k*24}`,fill:'none',stroke:TH.a3,'stroke-width':12,'stroke-linecap':'round','stroke-opacity':.85},parts));
  for(let k=0;k<3;k++)el('circle',{cx:gx+90+k*20,cy:gy-30+k*30,r:9,fill:TH.a3,'fill-opacity':.7},parts);A.golgi=[gx,gy+50];
  if(!plant){[[300,170,30],[560,600,24],[880,330,20]].forEach(([x,y,r])=>{dr(el('circle',{cx:x,cy:y,r,fill:TH.a3,'fill-opacity':.25,stroke:TH.a3,'stroke-width':3},parts));for(let k=0;k<4;k++)el('circle',{cx:x+Math.cos(k*1.7)*r*.45,cy:y+Math.sin(k*1.7)*r*.45,r:3,fill:TH.a3},parts)});A.lysosome=[300,170]}
  if(plant){[[180,400,-20],[880,300,70],[420,600,10],[700,120,-10]].forEach(([x,y,r])=>{const c=el('g',{transform:`translate(${x} ${y}) rotate(${r})`},parts);dr(el('ellipse',{rx:70,ry:34,fill:TH.a4,'fill-opacity':.35,stroke:TH.a4,'stroke-width':4},c));
    for(let k=-2;k<=2;k++)for(let j=0;j<3;j++)el('rect',{x:k*24-8,y:-18+j*12,width:16,height:8,rx:3,fill:TH.a4,'fill-opacity':.9},c)});A.chloroplast=[180,430]}
  const dots=[...Array(28)].map((_,i)=>el('circle',{r:2.5,fill:TH.ink,'fill-opacity':.35},parts));
  return {anchors:A,update(lt){cyto.setAttribute('d',plant?`M98,48 H902 Q952,48 952,98 V622 Q952,672 902,672 H98 Q48,672 48,622 V98 Q48,48 98,48Z`:blob(500,360,470,330,{amp:.035,seed:1,t:lt,speed:.9,n:32}));
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
  A.myelin=[axon.getPointAtLength(.31*AL).x,axon.getPointAtLength(.31*AL).y-20];A.node=[axon.getPointAtLength(.495*AL).x,axon.getPointAtLength(.495*AL).y+6];A.axon=[axon.getPointAtLength(.95*AL).x-60,axon.getPointAtLength(.95*AL).y];
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
  const rods=[];CH.forEach((ch,i)=>{for(let s=0;s<2;s++)rods.push({el:el('path',{fill:'none',stroke:ch.c,'stroke-width':14,'stroke-linecap':'round','stroke-linejoin':'round'},g),ch:i,s})});
  const fib=rods.map(()=>el('line',{stroke:TH.ink,'stroke-opacity':.35,'stroke-width':2},spG));
  const lbl=el('text',{x:cx,y:735,'text-anchor':'middle','font-size':44,'font-weight':800,'font-family':FONT,fill:TH.a2},g);
  const MS={m:[cx-382,cy+120],n:[cx+150,cy-120],c:[cx-60,cy-60]};const A={membrane:()=>MS.m,nucleus:()=>MS.n,chromosome:()=>MS.c,centrosome:{el:cs[0]},spindle:{el:fib[2],fx:.5,fy:.5}};
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
      const Cx=tx+dir*(7+sp*260),Cy=ty,V=clamp(sp*3),ax=dir*lerp(9,-34,V),ay=lerp(40,30,V);// sister chromatids: X at the plate → V-shapes dragged by the centromere to the poles
      r.el.setAttribute('d',`M${f2(Cx+ax)},${f2(Cy-ay)} L${f2(Cx)},${f2(Cy)} L${f2(Cx+ax)},${f2(Cy+ay)}`);at(r.el,{opacity:f2(chr),'stroke-width':f2(lerp(5,14,chr))});const x=Cx,y=Cy;if(k===0)MS.c=chr>.3?[Cx,Cy-ay]:null;
      at(fib[k],{x1:cs[r.s].getAttribute('cx'),y1:cs[r.s].getAttribute('cy'),x2:f2(x),y2:f2(y),opacity:f2(v('spin'))})});
    MS.n=v('env')>.3?[cx+150,cy-120]:v('newEnv')>.4?[cx+260*sp+90,cy-80]:null;MS.m=pinch<.97?[cx-rx*.91,cy+120]:[cx-250-200,cy+120];
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
  const ES={s:[ex+460,ey-370],p:null};const glowc=el('ellipse',{cx:ex,cy:ey-110,rx:120,ry:70,fill:TH.a2,filter:'url(#blur24)',opacity:0},g);g.appendChild(sub);
  return {anchors:{enzyme:[ex-200,ey+100],activesite:[ex,ey-60],substrate:()=>ES.s,products:()=>ES.p},update(lt,p,st,d){const c=it.cycle||Math.max(4,d-st-1),u=((lt-st-.8)/c);const q=clamp(u,0,1);
    const inP=E.inOutCubic(prog(q,0,.35)),bind=prog(q,.35,.6),out=E.inOutCubic(prog(q,.6,1));const sx=lerp(ex+460,ex,inP),sy=lerp(ey-330,ey-75,inP);
    sub.setAttribute('transform',`translate(${f2(sx)} ${f2(sy)})`);ES.s=q<.6?[sx,sy-70]:null;ES.p=q>.66?[sx+out*360+30,sy-out*260-70]:null;glowc.setAttribute('opacity',f2(Math.sin(Math.PI*bind)*.6));
    pa.setAttribute('transform',`translate(${f2(-out*360)} ${f2(-out*260)}) rotate(${f2(-out*30)})`);pb.setAttribute('transform',`translate(${f2(out*360)} ${f2(-out*260)}) rotate(${f2(out*30)})`);
    enz.setAttribute('transform',`translate(0 ${f2(Math.sin(Math.PI*bind)*-6)})`)}}});
