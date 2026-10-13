/* ================= v2.7 STAGE 1 — REDRAWS of old items in academic realism (same type names & anchors; overrides older versions)
   Redraws keep old type names, kinds and anchor names (old lessons still work). Sources: Gray’s Anatomy, Netter, Guyton & Hall, Junqueira, Trenberth 2007. Simplifications written on screen. */
(()=>{
const {mix,dark,light,vol,txt,T}=KIT;
const U=(uz,en,ru)=>({uz,en,ru:ru||en});
const uid=p=>p+(SM._m25=(SM._m25||0)+1);
const clipTo=(g,shape)=>{const id=uid('mc');const cp=el('clipPath',{id},DEFS);el(shape[0],shape[1],cp);return el('g',{'clip-path':`url(#${id})`},g)};
const note=(g,s,x,y,o={})=>txt(g,T(s),x,y,{size:20,color:'dim',weight:600,...o});
const sbar=(g,x,y,len,lab,below)=>{el('line',{x1:x,y1:y,x2:x+len,y2:y,stroke:TH.ink,'stroke-width':4},g);[x,x+len].forEach(v=>el('line',{x1:v,y1:y-7,x2:v,y2:y+7,stroke:TH.ink,'stroke-width':2},g));txt(g,typeof lab==='string'?lab:T(lab),x+len/2,below?y+30:y-14,{size:18,color:'ink',weight:600})};
const sim=(TT,dt,step,init)=>{const n=Math.ceil(TT/dt)+1,out=new Array(n);let s=init;for(let i=0;i<n;i++){out[i]=s;s=step(s,i*dt,dt)}return t=>{const u=((t%TT)+TT)%TT/dt,i=Math.floor(u);return out[Math.min(n-1,i)]}};
const sig=x=>1/(1+Math.exp(-x));
const box=(g,x,y,w,h,lab,c,o={})=>{const G=el('g',{},g);const r=el('rect',{x:x-w/2,y:y-h/2,width:w,height:h,rx:12,fill:'#0D1B2A',stroke:c,'stroke-width':3},G);txt(G,lab,x,y+7,{size:o.size||20,color:'ink',weight:700});return {G,r,c,x,y,w,h}};
const lit=(b,on)=>at(b.r,{fill:on?b.c:'#0D1B2A','fill-opacity':on?.35:1,'stroke-width':on?5:3});
const steps=(g,x,y,arr,o={})=>{const t=el('text',{x,y,'font-size':o.size||22,'font-weight':800,fill:TH.ink,'text-anchor':o.anchor||'start'},g);return tt=>{let s=arr[0][1];arr.forEach(([t0,l])=>{if(tt>=t0)s=l});t.textContent=T(s)}};
const gauge=(g,x,y,w,lab,c)=>{txt(g,T(lab),x,y-10,{size:18,color:'ink',weight:700,anchor:'start'});el('rect',{x,y,width:w,height:22,rx:7,fill:'#0D1B2A',stroke:TH.faint},g);const b=el('rect',{x,y,width:0,height:22,rx:7,fill:c},g);const v=el('text',{x:x+w+10,y:y+18,'font-size':18,'font-weight':700,fill:TH.ink},g);return (q,s)=>{at(b,{width:f2(w*Math.max(0,Math.min(1,q)))});v.textContent=s||''}};
const lines=(g,x,y,arr,o={})=>{const G0=el('g',{class:o.keep?'':'uni'},g);arr.forEach((l,i)=>txt(G0,T(l),x,y+i*(o.dy||30),{size:o.size||18,color:o.color||'dim',weight:600,anchor:o.anchor||'start'}))};
const axes=(g,x,y,w,h,o)=>{const [xa,xb]=o.x,[ya,yb]=o.y;const lg=!!o.ylog;const px=v=>x+(v-xa)/(xb-xa)*w;const py=v=>lg?y+h-(Math.log10(v)-Math.log10(ya))/(Math.log10(yb)-Math.log10(ya))*h:y+h-(v-ya)/(yb-ya)*h;
  el('rect',{x,y,width:w,height:h,fill:'#0D1B2A',stroke:TH.faint,'stroke-width':2},g);
  (o.xt||[]).forEach(v=>{el('line',{x1:px(v),y1:y,x2:px(v),y2:y+h,stroke:TH.faint,'stroke-width':1,opacity:.5},g);txt(g,String(v),px(v),y+h+24,{size:16,color:'dim',weight:600})});
  (o.yt||[]).forEach(v=>{el('line',{x1:x,y1:py(v),x2:x+w,y2:py(v),stroke:TH.faint,'stroke-width':1,opacity:.5},g);txt(g,String(v),x-10,py(v)+6,{size:16,color:'dim',weight:600,anchor:'end'})});
  if(o.xl)txt(g,T(o.xl),x+w/2,y+h+50,{size:17,color:'ink',weight:700});if(o.yl)txt(g,T(o.yl),x,y-14,{size:17,color:'ink',weight:700,anchor:'start'});return {px,py}};
const pth=(fn,a,b,n)=>{let d='';for(let i=0;i<=n;i++){const v=a+(b-a)*i/n;const [X,Y]=fn(v);d+=(i?'L':'M')+f2(X)+','+f2(Y)}return d};
const along=(P,q)=>{const L=[];let tot=0;for(let i=1;i<P.length;i++){const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);L.push(d);tot+=d}let s=Math.max(0,Math.min(1,q))*tot;for(let i=0;i<L.length;i++){if(s<=L[i]){const u=L[i]?s/L[i]:0;return [lerp(P[i][0],P[i+1][0],u),lerp(P[i][1],P[i+1][1],u),i]}s-=L[i]}const e=P[P.length-1];return [e[0],e[1],L.length-1]};
const arw=(g,a,b,c,w,d)=>el('path',{d:`M${a[0]},${a[1]} L${b[0]},${b[1]}`,stroke:c||TH.ink,'stroke-width':w||4,'marker-end':arrowMarker(c||'ink'),fill:'none','stroke-dasharray':d||'none'},g);
/* ---------- heart: frontal section, real wall thickness ratio, valves, flow, Wiggers-lite pressure chart ---------- */
KIT.names(NAMES.uz,{h_tri:'Uch tavaqali klapan',h_mit:'Mitral (ikki tavaqali) klapan',h_aov:'Aorta klapani',h_ivc:'Pastki kovak vena',h_lvw:'Chap qorincha devori (8–12 mm)',h_rvw:'O‘ng qorincha devori (3–5 mm)'});
KIT.names(NAMES.en,{h_tri:'Tricuspid valve',h_mit:'Mitral valve',h_aov:'Aortic valve',h_ivc:'Inferior vena cava',h_lvw:'LV wall (8–12 mm)',h_rvw:'RV wall (3–5 mm)'});
SM.items.heart=preset(1600,900,(g,it)=>{const A={};const bpm=it.bpm||70,per=60/bpm;const flow=it.flow!==false;
  const OUT='M190,300 C160,380 170,520 230,600 C300,700 520,820 700,850 C760,780 800,640 790,520 C780,420 740,340 690,300 C640,270 560,280 520,300 C440,270 300,250 190,300 Z';
  // great vessels behind
  const desc=el('path',{d:'M560,130 C660,90 760,120 770,220 L770,330',stroke:'#C62828','stroke-width':46,fill:'none',opacity:.55,'stroke-linecap':'round'},g);
  el('path',{d:'M265,110 L265,330',stroke:'#3949AB','stroke-width':52,fill:'none','stroke-linecap':'round'},g);el('path',{d:'M250,560 L250,760',stroke:'#3949AB','stroke-width':58,fill:'none','stroke-linecap':'round'},g);
  [[720,370,840,350],[720,430,840,450]].forEach(([a,b,c,d])=>el('path',{d:`M${a},${b} L${c},${d}`,stroke:'#C62828','stroke-width':26,fill:'none','stroke-linecap':'round'},g));
  const ao=el('path',{d:'M560,560 C560,450 550,360 520,260 C500,170 520,125 580,125',stroke:'#E53935','stroke-width':42,fill:'none'},g);
  const pt=el('path',{d:'M470,330 C490,250 560,205 640,200',stroke:'#3F51B5','stroke-width':40,fill:'none'},g);
  el('path',{d:'M640,200 L800,190',stroke:'#3F51B5','stroke-width':24,fill:'none','stroke-linecap':'round'},g);el('path',{d:'M610,205 C560,215 430,225 330,232',stroke:'#3F51B5','stroke-width':22,fill:'none',opacity:.5,'stroke-linecap':'round'},g);
  el('path',{d:OUT,fill:'#8E3B46',stroke:'#5D1F28','stroke-width':4},g);
  const cav=(d,c)=>el('path',{d,fill:c,stroke:'#5D1F28','stroke-width':2},g);
  const RA=cav('M210,330 C200,400 210,500 260,560 L360,560 C380,480 380,380 360,320 C310,300 250,305 210,330 Z','#5C6BC0');
  const LA=cav('M560,330 C620,310 690,330 720,380 C730,430 700,480 640,500 C600,500 570,470 560,430 Z','#E57373');
  const RVg=el('g',{},g);const RV=el('path',{d:'M280,600 L385,565 C400,460 420,360 440,318 L510,318 C522,420 530,520 538,600 C528,690 560,760 630,812 C510,785 360,715 280,600 Z',fill:'#5C6BC0',stroke:'#5D1F28','stroke-width':2},RVg);
  const LVg=el('g',{},g);const LV=el('path',{d:'M590,560 C640,545 690,560 715,615 C728,690 705,760 680,795 C640,750 605,680 590,560 Z',fill:'#E57373',stroke:'#5D1F28','stroke-width':2},LVg);
  // valves
  const leaf=(x,y,a)=>{const G=el('g',{transform:`translate(${x},${y})`},g);const L1=el('line',{x1:-24,y1:0,x2:0,y2:0,stroke:'#FFF3E0','stroke-width':5,'stroke-linecap':'round'},G),L2=el('line',{x1:24,y1:0,x2:0,y2:0,stroke:'#FFF3E0','stroke-width':5,'stroke-linecap':'round'},G);at(G,{transform:`translate(${x},${y}) rotate(${a})`});return {G,L1,L2}};
  const vT=leaf(318,578,-8),vM=leaf(615,528,30),vA=leaf(572,532,70),vP=leaf(475,322,0);
  const septum=el('path',{d:'M545,560 C552,650 600,740 650,805',stroke:'none',fill:'none'},g);
  // particles
  const PB=[[265,130],[265,320],[290,450],[318,578],[400,690],[470,560],[470,330],[540,230],[640,200],[790,190]],PR=[[840,350],[700,400],[615,528],[670,720],[620,640],[572,532],[545,330],[520,230],[560,130],[680,120],[760,200],[770,300]];
  const pb=[...Array(12)].map(()=>el('circle',{r:7,fill:'#9FA8DA',stroke:'#1A237E','stroke-width':1.5},g)),pr=[...Array(12)].map(()=>el('circle',{r:7,fill:'#FFCDD2',stroke:'#B71C1C','stroke-width':1.5},g));
  // Wiggers-lite
  const C=axes(g,1000,200,520,240,{x:[0,1],y:[0,140],yt:[0,40,80,120],xl:U('Yurak sikli (bir urish)','Cardiac cycle (one beat)'),yl:U('Bosim, mmHg','Pressure, mmHg')});
  const sysE=.38;const lvp=u=>u<sysE?8+112*Math.pow(Math.sin(Math.PI*u/sysE),1.2):8+2*Math.sin(u*9);const uc=sysE*.82,Ac=8+112*Math.pow(Math.sin(Math.PI*uc/sysE),1.2)-3;const dec=x=>80+(Ac-74)*Math.exp(-x*3.2);const aop=u=>u>=uc?dec(u-uc)-(u<uc+.04?6*Math.sin((u-uc)/.04*Math.PI):0):Math.max(dec(1+u-uc),lvp(u)-3);
  const lap=u=>6+4*Math.sin(u*2*Math.PI*2)+(u>.85?5*Math.sin((u-.85)/.15*Math.PI):0);
  [[aop,'#FFB74D',U('aorta','aorta')],[lvp,'#E57373',U('chap qorincha','left ventricle')],[lap,'#90CAF9',U('chap bo‘lmacha','left atrium')]].forEach(([f,c,l],i)=>{el('path',{d:pth(u=>[C.px(u),C.py(f(u))],0,1,160),stroke:c,'stroke-width':4,fill:'none'},g);el('line',{x1:1000+i*175,x2:1030+i*175,y1:500,y2:500,stroke:c,'stroke-width':5},g);txt(g,T(l),1036+i*175,506,{size:15,color:c,weight:800,anchor:'start'})});
  el('rect',{x:C.px(0),y:200,width:C.px(sysE)-C.px(0),height:240,fill:'#FFF',opacity:.05},g);txt(g,T(U('sistola','systole')),C.px(sysE/2),222,{size:15,color:'dim',weight:800});txt(g,T(U('diastola','diastole')),C.px((1+sysE)/2),222,{size:15,color:'dim',weight:800});
  const cur=el('line',{y1:200,y2:440,stroke:TH.ink,'stroke-width':2},g);const bt=el('text',{x:1000,y:560,'font-size':19,'font-weight':800,fill:TH.ink},g);
  lines(g,1000,610,[U('Massa 250–350 g; o‘lchami ~12 × 8,5 × 6 cm','Mass 250–350 g; size ~12 × 8.5 × 6 cm'),U('Bosim: O‘Q 25/5, ChQ 120/10 mmHg','Pressure: RV 25/5, LV 120/10 mmHg'),U('Zarb hajmi ~70 ml × 70/min ≈ 5 l/min','Stroke volume ~70 ml × 70/min ≈ 5 l/min'),U('Chap qorincha devori o‘ngdan ~3 marta qalin','LV wall ~3× thicker than RV')],{size:17,dy:31});
  note(g,U('Frontal kesim, sxema: o‘pka arteriyasi va aorta kesishuvi soddalashtirilgan','Frontal section, schematic: aorta–pulmonary trunk crossing simplified'),800,885,{size:17});
  Object.assign(A,{ra:{el:RA,fx:.3,fy:.4},la:{el:LA,fx:.6,fy:.4},rv:{el:RV,fx:.4,fy:.5},lv:{el:LV,fx:.5,fy:.5},aorta:[512,190],pulmonary:[740,194],vena:[265,160],pveins:[830,355],septum:[560,640],valve:{el:vA.G,fx:.5,fy:.5},h_tri:{el:vT.G,fx:.5,fy:.5},h_mit:{el:vM.G,fx:.5,fy:.5},h_aov:{el:vA.G,fx:.5,fy:.5},h_ivc:[250,740],h_lvw:[760,650],h_rvw:[260,640]});
  const R0={anchors:A,core:['ra','la','rv','lv','aorta','pulmonary','vena','pveins','septum','h_tri','h_mit','h_lvw'],coreSchool:['ra','la','rv','lv','aorta'],labelLayout:'tb',update(lt){const u=((lt/per)%1+1)%1;const sys=u<sysE?Math.sin(Math.PI*u/sysE):0;const s=1-.07*sys;
    at(LVg,{transform:`translate(${f2(650*(1-s))},${f2(680*(1-s))}) scale(${f2(s)})`});at(RVg,{transform:`translate(${f2(420*(1-s))},${f2(680*(1-s))}) scale(${f2(s)})`});
    const av=u<sysE?18:70,sl=u<sysE?75:5;[vT,vM].forEach(v=>{at(v.L1,{x1:f2(-24*Math.cos(av*Math.PI/180)),y1:f2(24*Math.sin(av*Math.PI/180))});at(v.L2,{x1:f2(24*Math.cos(av*Math.PI/180)),y1:f2(24*Math.sin(av*Math.PI/180))})});
    [vA,vP].forEach(v=>{at(v.L1,{x1:f2(-24*Math.cos(sl*Math.PI/180)),y1:f2(-24*Math.sin(sl*Math.PI/180))});at(v.L2,{x1:f2(24*Math.cos(sl*Math.PI/180)),y1:f2(-24*Math.sin(sl*Math.PI/180))})});
    const mv=(arr,P,off)=>arr.forEach((c,i)=>{const q=((lt*.18+i/arr.length+off)%1);const p=along(P,q);at(c,{cx:f2(p[0]),cy:f2(p[1]),opacity:flow?1:0})});mv(pb,PB,0);mv(pr,PR,.5);
    at(cur,{x1:f2(C.px(u)),x2:f2(C.px(u))});bt.textContent=bpm+T(U(' urish/min · ',' bpm · '))+(u<sysE?T(U('sistola','systole')):T(U('diastola','diastole')))}};
  R0.update(0);return R0});
/* ---------- kidney: coronal section (cortex, pyramids, columns, calyces, pelvis, hilum V-A-P), flow numbers ---------- */
KIT.names(NAMES.uz,{k_caps:'Fibroz kapsula',k_col:'Buyrak ustunlari (Bertin)',k_min:'Kichik kosacha',k_maj:'Katta kosacha',k_pap:'Buyrak so‘rg‘ichi (papilla)',k_arc:'Yoysimon arteriyalar (po‘stloq–mag‘iz chegarasi)'});
KIT.names(NAMES.en,{k_caps:'Fibrous capsule',k_col:'Renal columns (Bertin)',k_min:'Minor calyx',k_maj:'Major calyx',k_pap:'Renal papilla',k_arc:'Arcuate arteries (cortico-medullary junction)'});
SM.items.kidney=preset(1600,900,(g,it)=>{const A={};const TT=it.cycle||10;const cx=400,cy=470,rx=170,ry=300;
  const P=(a,s)=>{const c=Math.cos(a),q=Math.max(0,c);return [cx+rx*s*c*(1-.45*Math.pow(q,6)),cy+ry*s*Math.sin(a)]};const outl=s=>{let d='';for(let i=0;i<=120;i++){const p=P(i/120*2*Math.PI,s);d+=(i?'L':'M')+f2(p[0])+','+f2(p[1])}return d+'Z'};
  // hilum vessels (behind)
  el('path',{d:`M${cx+140},${cy-75} L900,${cy-120}`,stroke:'#3949AB','stroke-width':34,fill:'none'},g);const ra=el('path',{d:`M${cx+140},${cy-30} L900,${cy-50}`,stroke:'#E53935','stroke-width':22,fill:'none'},g);
  const ur=el('path',{d:`M${cx+165},${cy+70} C${cx+200},${cy+160} ${cx+190},${cy+300} ${cx+210},880`,stroke:'#FBC02D','stroke-width':22,fill:'none','stroke-linecap':'round'},g);
  const caps=el('path',{d:outl(1.02),fill:'none',stroke:'#D7CCC8','stroke-width':4},g);
  const cort=el('path',{d:outl(1),fill:'#A1574F'},g);const med=el('path',{d:outl(.8),fill:'#7B3B36'},g);
  const sinus=el('ellipse',{cx:cx+95,cy,rx:95,ry:150,fill:'#F3E0C0',opacity:.9},g);
  // pyramids + columns
  const pyr=[],cal=[];const AN=[-1.3,-.95,-.55,-.15,.2,.6,1.0,1.35].map(v=>Math.PI+v*1.05);
  AN.forEach((a,i)=>{const b1=P(a-.17,.86),b2=P(a+.17,.86);const bm=P(a,.86);const ap=[lerp(bm[0],cx+80,.55),lerp(bm[1],cy,.55)];
    pyr.push(el('path',{d:`M${f2(b1[0])},${f2(b1[1])} Q${f2((b1[0]+b2[0])/2)},${f2((b1[1]+b2[1])/2)} ${f2(b2[0])},${f2(b2[1])} L${f2(ap[0])},${f2(ap[1])} Z`,fill:'#5E2A2A',stroke:'#4E2121','stroke-width':2},g));
    for(let k=0;k<5;k++){const u=(k+1)/6;const s=[lerp(b1[0],b2[0],u),lerp(b1[1],b2[1],u)];el('line',{x1:f2(s[0]),y1:f2(s[1]),x2:f2(ap[0]),y2:f2(ap[1]),stroke:'#8D4B45','stroke-width':1.2,opacity:.8},g)}
    const c=el('path',{d:`M${f2(ap[0]-14)},${f2(ap[1]-10)} Q${f2(ap[0]+10)},${f2(ap[1])} ${f2(ap[0]-14)},${f2(ap[1]+10)}`,stroke:'#FBC02D','stroke-width':6,fill:'none'},g);cal.push({c,ap})});
  // calyces → pelvis → ureter
  const PV=[cx+110,cy+30];const maj=[[cx+60,cy-130],[cx+40,cy+150]];
  cal.forEach(({ap},i)=>el('path',{d:`M${f2(ap[0])},${f2(ap[1])} Q${f2(lerp(ap[0],PV[0],.5))},${f2(lerp(ap[1],PV[1],.3))} ${f2(i<4?maj[0][0]:maj[1][0])},${f2(i<4?maj[0][1]:maj[1][1])}`,stroke:'#FBC02D','stroke-width':9,fill:'none','stroke-linecap':'round',opacity:.9},g));
  maj.forEach(m=>el('path',{d:`M${m[0]},${m[1]} Q${f2((m[0]+PV[0])/2+20)},${f2((m[1]+PV[1])/2)} ${PV[0]},${PV[1]}`,stroke:'#FBC02D','stroke-width':18,fill:'none','stroke-linecap':'round'},g));
  const pel=el('path',{d:`M${PV[0]-30},${PV[1]-50} Q${PV[0]+60},${PV[1]-20} ${cx+165},${cy+70} Q${PV[0]+10},${PV[1]+60} ${PV[0]-30},${PV[1]+50} Z`,fill:'#FBC02D'},g);
  // arterial tree: segmental → interlobar (in columns) → arcuate (along boundary)
  const arc=el('path',{d:'',stroke:'#FF5252','stroke-width':3,fill:'none'},g);let dA='';
  AN.slice(0,-1).forEach((a,i)=>{const m=(a+AN[i+1])/2;const q=P(m,.82);dA+=`M${cx+130},${cy-30} Q${f2(lerp(cx+130,q[0],.5))},${f2(lerp(cy-30,q[1],.5)+10)} ${f2(q[0])},${f2(q[1])} `;
    let s='';for(let j=0;j<=10;j++){const p=P(m-.25+.5*j/10,.81);s+=(j?'L':'M')+f2(p[0])+','+f2(p[1])}dA+=s+' '});at(arc,{d:dA});
  const rbc=[...Array(16)].map(()=>el('circle',{r:4.5,fill:'#FF8A80'},g));const uri=[...Array(14)].map(()=>el('circle',{r:5,fill:'#FFF59D',stroke:'#F9A825','stroke-width':1.5},g));
  sbar(g,140,830,92,U('~2 cm','~2 cm'));
  // numbers
  const RX=1000;txt(g,T(U('Bir sutkada (ikki buyrak)','Per day (both kidneys)')),RX,210,{size:19,color:'ink',weight:800,anchor:'start'});
  [[U('qon plazmasi oqimi','renal plasma flow'),900,'#EF9A9A','~900 l'],[U('filtrat (KFT 125 ml/min)','filtrate (GFR 125 ml/min)'),180,'#FFE082','~180 l'],[U('siydik','urine'),1.5,'#FBC02D','1–2 l']].forEach(([l,v,c,s],i)=>{const y=240+i*70;el('rect',{x:RX,y,width:Math.max(4,v/900*480),height:28,rx:6,fill:c,opacity:.85},g);txt(g,s,RX+Math.max(4,v/900*480)+10,y+21,{size:17,color:'ink',weight:800,anchor:'start'});txt(g,T(l),RX,y+48,{size:15,color:'dim',weight:700,anchor:'start'})});
  lines(g,RX,480,[U('O‘lchami ~11 × 6 × 3 cm, massasi ~150 g','Size ~11 × 6 × 3 cm, mass ~150 g'),U('Har buyrakda ~1 mln nefron','~1 million nephrons per kidney'),U('Qon oqimi ~1,1 l/min (yurak haydashining 20–25%)','Blood flow ~1.1 l/min (20–25% of cardiac output)'),U('Filtratning ~99% i qayta so‘riladi','~99% of filtrate is reabsorbed'),U('Darvoza (yuqoridan): vena – arteriya – jom','Hilum (top→down): vein – artery – pelvis'),U('Piramidalar 8–18 ta; ustunlar orasida','8–18 pyramids, separated by columns')],{size:17,dy:31});
  note(g,U('Koronal kesim, sxema; nefronlar ko‘rsatilmagan (alohida nephron elementi)','Coronal section, schematic; nephrons not shown (see nephron item)'),800,885,{size:17});
  const RP=[[900,cy-50],[cx+140,cy-30]];
  Object.assign(A,{renalArtery:[860,cy-49],renalVein:[860,cy-117],ureter:[cx+205,820],cortex:()=>P(Math.PI*.82,.93),medulla:{el:pyr[2],fx:.5,fy:.5},pelvis:{el:pel,fx:.5,fy:.5},k_caps:()=>P(-Math.PI*.6,1.02),k_col:()=>P(Math.PI+(-.15+.2)/2*1.05,.75),k_min:()=>{const a=cal[5].ap;return [a[0],a[1]]},k_maj:[maj[0][0]+20,maj[0][1]+20],k_pap:()=>{const a=cal[1].ap;return [a[0]-6,a[1]]},k_arc:()=>P(Math.PI*1.25,.81)});
  const R0={anchors:A,core:['cortex','medulla','pelvis','ureter','renalArtery','renalVein','k_caps','k_col','k_min','k_maj','k_pap'],coreSchool:['cortex','medulla','pelvis','ureter','renalArtery'],labelLayout:'tb',update(lt){
    rbc.forEach((c,i)=>{const q=((lt*.25+i/16)%1);const m=(AN[i%7]+AN[i%7+1])/2;const tgt=P(m,.82);const p=q<.4?[lerp(900,cx+140,q/.4),lerp(cy-50,cy-30,q/.4)]:[lerp(cx+140,tgt[0],(q-.4)/.6),lerp(cy-30,tgt[1],(q-.4)/.6)];at(c,{cx:f2(p[0]),cy:f2(p[1])})});
    uri.forEach((c,i)=>{const q=((lt*.2+i/14)%1);const ap=cal[i%8].ap;const m=i%8<4?maj[0]:maj[1];const pts=[ap,m,PV,[cx+165,cy+70],[cx+200,cy+250],[cx+210,880]];const p=along(pts,q);at(c,{cx:f2(p[0]),cy:f2(p[1])})})}};
  R0.update(0);return R0});
/* ---------- brain: lateral view of left hemisphere (lobes, central & lateral sulci, functional areas, cerebellum, brainstem) ---------- */
KIT.names(NAMES.uz,{b_cs:'Markaziy egat (Rolando)',b_ls:'Lateral egat (Silviy)',b_m1:'Markaziy oldi pushta: harakat po‘stlog‘i',b_s1:'Markaziy orqa pushta: sezgi po‘stlog‘i',b_broca:'Broka sohasi (nutq ishlab chiqarish)',b_wern:'Vernike sohasi (nutqni tushunish)',b_vis:'Ko‘rish po‘stlog‘i (17-maydon)',b_aud:'Eshitish po‘stlog‘i (Gesl pushtalari)'});
KIT.names(NAMES.en,{b_cs:'Central sulcus (Rolando)',b_ls:'Lateral sulcus (Sylvian)',b_m1:'Precentral gyrus: primary motor cortex',b_s1:'Postcentral gyrus: primary somatosensory cortex',b_broca:'Broca area (speech production)',b_wern:'Wernicke area (language comprehension)',b_vis:'Primary visual cortex (area 17)',b_aud:'Auditory cortex (Heschl gyri)'});
SM.items.brain=preset(1600,900,(g,it)=>{const A={};
  const OUT='M150,430 C140,280 300,140 520,128 C720,122 880,230 905,400 C915,470 885,520 845,540 C800,560 760,600 700,618 C600,648 440,640 360,600 C318,580 300,545 318,512 C296,522 248,540 202,520 C165,502 150,470 150,430 Z';
  const CS=[...Array(13)].map((_,i)=>{const u=i/12;return [565-85*u+10*Math.sin(u*Math.PI*4),135+315*u]});const csD=CS.map((p,i)=>(i?'L':'M')+f2(p[0])+','+f2(p[1])).join(' ');
  const LS=[[318,508],[420,478],[540,455],[650,410],[690,360]];const lsD='M318,508 C420,476 560,452 650,410 L690,362';
  const pol=a=>'M'+a.map(p=>f2(p[0])+','+f2(p[1])).join(' L')+' Z';
  // brainstem + cerebellum behind cerebrum
  const bs=el('path',{d:'M600,590 C610,660 640,700 630,780 C625,820 628,850 630,890 L690,890 C690,850 694,820 700,790 C720,720 700,660 700,600 Z',fill:'#C7A497',stroke:'#8D6E63','stroke-width':3},g);
  el('path',{d:'M612,690 C640,670 690,670 712,690 C716,730 690,760 660,760 C630,760 610,730 612,690 Z',fill:'#BCA092',stroke:'#8D6E63','stroke-width':2},g);
  const cb=el('path',{d:'M690,600 C760,560 890,560 920,630 C940,690 870,730 790,728 C730,726 690,700 680,660 Z',fill:'#D49A8C',stroke:'#8E5A50','stroke-width':3},g);
  const cbg=clipTo(g,['path',{d:'M690,600 C760,560 890,560 920,630 C940,690 870,730 790,728 C730,726 690,700 680,660 Z'}]);
  for(let k=0;k<12;k++)el('path',{d:`M${660+k*6},${590+k*12} C${760},${575+k*13} ${880},${585+k*12} ${940},${615+k*10}`,fill:'none',stroke:'#8E5A50','stroke-width':1.6,opacity:.8},cbg);
  // cerebrum
  el('path',{d:OUT,fill:'#E3AFA4'},g);const R=clipTo(g,['path',{d:OUT}]);
  const LOB={frontal:[pol([[0,0],[565,0],...CS,[318,508],[0,560]]),'#64B5F6'],parietal:[pol([[565,0],[835,0],[822,222],[772,470],[690,362],[650,410],...CS.slice().reverse()]),'#81C784'],
    temporal:[pol([[0,560],[318,508],[420,478],[540,455],[650,410],[690,362],[772,470],[762,700],[0,700]]),'#FFB74D'],occipital:[pol([[835,0],[1000,0],[1000,700],[762,700],[772,470],[822,222]]),'#BA68C8']};
  const RE={};for(const k in LOB)RE[k]=el('path',{d:LOB[k][0],fill:LOB[k][1],'fill-opacity':.3},R);
  // procedural gyri: wiggly sulci
  for(let k=0;k<46;k++){const x0=170+seeded(k,1)*720,y0=150+seeded(k,2)*470,a=seeded(k,3)*Math.PI,L=50+seeded(k,4)*90;let d='';for(let j=0;j<=10;j++){const u=j/10;const x=x0+Math.cos(a)*L*u+Math.sin(u*9+k)*9*Math.sin(a),y=y0+Math.sin(a)*L*u-Math.sin(u*9+k)*9*Math.cos(a);d+=(j?'L':'M')+f2(x)+','+f2(y)}
    el('path',{d,fill:'none',stroke:'#9E5B52','stroke-width':3,'stroke-linecap':'round',opacity:.55},R)}
  const M1=el('path',{d:CS.map((p,i)=>(i?'L':'M')+f2(p[0]-26)+','+f2(p[1])).join(' '),stroke:'#1E88E5','stroke-width':34,fill:'none',opacity:.0,'stroke-linecap':'round'},R);
  const S1=el('path',{d:CS.map((p,i)=>(i?'L':'M')+f2(p[0]+26)+','+f2(p[1]-4)).join(' '),stroke:'#43A047','stroke-width':34,fill:'none',opacity:.0,'stroke-linecap':'round'},R);
  const AR={broca:el('ellipse',{cx:372,cy:462,rx:52,ry:32,fill:'#E53935',opacity:.0},R),wern:el('ellipse',{cx:705,cy:448,rx:58,ry:36,fill:'#8E24AA',opacity:.0},R),aud:el('ellipse',{cx:560,cy:482,rx:52,ry:20,fill:'#FB8C00',opacity:.0},R),vis:el('ellipse',{cx:885,cy:440,rx:40,ry:70,fill:'#5E35B1',opacity:.0},R)};
  el('path',{d:csD,stroke:'#5D2E2A','stroke-width':6,fill:'none','stroke-linecap':'round'},R);el('path',{d:lsD,stroke:'#5D2E2A','stroke-width':7,fill:'none','stroke-linecap':'round'},R);
  el('path',{d:'M822,222 L772,470',stroke:'#FFFFFF','stroke-width':2,'stroke-dasharray':'8 8',fill:'none',opacity:.5},R);
  el('path',{d:OUT,fill:'none',stroke:'#8E4F46','stroke-width':4},g);
  const sp=[...Array(20)].map(()=>el('circle',{r:6,fill:'#FFFFFF',opacity:0},g));
  sbar(g,180,800,100,U('~2 cm','~2 cm'));
  lines(g,1040,200,[U('Massasi 1,3–1,4 kg (tana massasining ~2%)','Mass 1.3–1.4 kg (~2% of body mass)'),U('Tinch holatdagi O₂ va glyukozaning ~20% i (~20 W)','~20% of resting O₂ and glucose (~20 W)'),U('~86 mlrd neyron; ulardan ~69 mlrd — miyachada','~86 billion neurons; ~69 billion in the cerebellum'),U('Po‘stloq qalinligi 2–4 mm; yuzasi ~2400 cm² (burmalar)','Cortex 2–4 mm thick; ~2400 cm² (folded)'),U('Nutq sohalari ~95% o‘ng qo‘llilarda chap yarim sharda','Language areas left-sided in ~95% of right-handers'),U('Harakat/sezgi po‘stlog‘i qarama-qarshi tomonni boshqaradi','Motor/sensory cortex controls the opposite side')],{size:18,dy:34});
  note(g,U('Chap yarim shar, lateral ko‘rinish (old — chapda). Ko‘rish po‘stlog‘i asosan medial yuzada.','Left hemisphere, lateral view (anterior left). Visual cortex lies mostly on the medial surface.'),800,870,{size:17});
  const ACT={motor:[M1,'b_m1'],sensory:[S1,'b_s1'],speech:[AR.broca],language:[AR.wern],hearing:[AR.aud],vision:[AR.vis]};
  Object.assign(A,{frontal:[300,300],parietal:[690,230],occipital:[860,400],temporal:[520,560],cerebellum:[830,670],brainstem:[660,840],b_cs:()=>CS[3],b_ls:[540,456],b_m1:()=>[CS[6][0]-26,CS[6][1]],b_s1:()=>[CS[5][0]+26,CS[5][1]],b_broca:[372,462],b_wern:[705,448],b_vis:[885,440],b_aud:[560,482]});
  return {anchors:A,core:['frontal','parietal','temporal','occipital','cerebellum','brainstem','b_cs','b_ls','b_m1','b_s1','b_broca','b_wern'],coreSchool:['frontal','parietal','temporal','occipital','cerebellum','brainstem'],labelLayout:'tb',update(lt,p,st){
    const h=it.highlight;for(const k in RE){const on=h===k||(Array.isArray(h)&&h.includes(k));at(RE[k],{'fill-opacity':f2(on?.5+.2*Math.sin(lt*4):h?.1:.3)})}
    const a=it.activity;const L=Array.isArray(a)?a:typeof a==='string'?[a]:[];at(M1,{opacity:f2(L.includes('motor')?.45+.2*Math.sin(lt*5):0)});at(S1,{opacity:f2(L.includes('sensory')?.45+.2*Math.sin(lt*5):0)});
    at(AR.broca,{opacity:f2(L.includes('speech')?.6+.2*Math.sin(lt*5):0)});at(AR.wern,{opacity:f2(L.includes('language')||L.includes('speech')?.6+.2*Math.sin(lt*5+1):0)});at(AR.aud,{opacity:f2(L.includes('hearing')?.6+.2*Math.sin(lt*5):0)});at(AR.vis,{opacity:f2(L.includes('vision')?.6+.2*Math.sin(lt*5):0)});
    sp.forEach((s,i)=>{const n=Math.floor(lt*.7+seeded(i,1)*3),u=(lt*.7+seeded(i,1)*3)%1;const x=200+seeded(i+n*7,2)*650,y=170+seeded(i+n*7,3)*380;at(s,{cx:f2(x),cy:f2(y),opacity:f2(a===false?0:Math.sin(Math.PI*u)*.85)})})}}});
/* ---------- eye: horizontal section of right eye to scale (25 px = 1 mm), refraction, accommodation/refraction errors ---------- */
KIT.names(NAMES.uz,{e_ac:'Old kamera (suyuqlik, ~3 mm)',e_cil:'Kiprikli tana (akkomodatsiya mushagi)',e_zon:'Sinn boylamlari (zonulalar)',e_chor:'Tomirli parda (xoroid)',e_fov:'Markaziy chuqurcha (fovea, faqat kolbachalar)',e_disc:'Ko‘ruv nervi diski (ko‘r dog‘)'});
KIT.names(NAMES.en,{e_ac:'Anterior chamber (aqueous, ~3 mm)',e_cil:'Ciliary body (accommodation muscle)',e_zon:'Zonular fibres',e_chor:'Choroid',e_fov:'Fovea (cones only)',e_disc:'Optic disc (blind spot)'});
SM.items.eye=preset(1600,900,(g,it)=>{const A={};const S=25,X0=260,CY=450,GC=X0+24*S-300;const def=it.defect||'normal';if(!['normal','myopia','hyperopia'].includes(def))SERR.push(`eye: defect "${def}" → normal, myopia, hyperopia`);
  const arcP=(cx,cy,r,a0,a1,n=60)=>{let d='';for(let i=0;i<=n;i++){const a=a0+(a1-a0)*i/n;d+=(i?'L':'M')+f2(cx+r*Math.cos(a))+','+f2(cy+r*Math.sin(a))}return d};
  const aL=Math.PI-Math.asin(150/300);// limbus angle on sclera
  const disc=-15*Math.PI/180;// nasal = up in this view
  // optic nerve
  const on=el('path',{d:`M${f2(GC+290*Math.cos(disc)-12)},${f2(CY+290*Math.sin(disc)-55)} L1150,${f2(CY+290*Math.sin(disc)-110)} L1150,${f2(CY+290*Math.sin(disc)+10)} L${f2(GC+290*Math.cos(disc)-12)},${f2(CY+290*Math.sin(disc)+55)} Z`,fill:'#F5E6C8',stroke:'#BCAAA4','stroke-width':3},g);
  // sclera, choroid, retina
  const ring=(r,a0,a1)=>arcP(GC,CY,r,a0,a1,120);const rg=(r1,r2,d)=>ring(r1,-aL+d,aL-d)+' '+ring(r2,aL-d,-aL+d).replace('M','L')+'Z';
  el('path',{d:rg(300,282,0),fill:'#F4F1EC',stroke:'#BDBDBD','stroke-width':2},g);
  el('path',{d:rg(282,272,.06),fill:'#6D2E2E'},g);
  const ret=el('path',{d:rg(272,262,.22),fill:'#F48FB1'},g);
  el('circle',{cx:GC,cy:CY,r:262,fill:'#0E2236',opacity:.9},g);
  el('path',{d:`M${f2(GC+262)},${CY-16} Q${GC+250},${CY} ${f2(GC+262)},${CY+16}`,stroke:'#0E2236','stroke-width':8,fill:'none'},g);
  const dx=GC+272*Math.cos(disc),dy=CY+272*Math.sin(disc);el('ellipse',{cx:f2(dx),cy:f2(dy),rx:10,ry:38,transform:`rotate(${-15} ${f2(dx)} ${f2(dy)})`,fill:'#FFF3E0'},g);
  // cornea (r 7.8 mm) and anterior chamber
  const cR=7.8*S,cC=X0+cR,ya=Math.asin(150/cR);
  const cor=el('path',{d:arcP(cC,CY,cR,Math.PI-ya,Math.PI+ya,50)+` L${f2(cC+cR*Math.cos(Math.PI+ya)+14)},${CY-150} `+arcP(cC,CY,cR-14,Math.PI+ya,Math.PI-ya,50).replace('M','L')+'Z',fill:'#B3E5FC',stroke:'#4FC3F7','stroke-width':2,opacity:.9},g);
  const ac=el('path',{d:arcP(cC,CY,cR-14,Math.PI-ya+.02,Math.PI+ya-.02,50)+` L${X0+78},${CY-60} L${X0+78},${CY+60} Z`,fill:'#E1F5FE',opacity:.25},g);
  [-1,1].forEach(s=>el('path',{d:`M${X0+38},${CY+s*150} L${X0+72},${CY+s*150} L${X0+60},${CY+s*168} Z`,fill:'#F4F1EC'},g));
  // iris + pupil (2 mm radius default)
  const pr=(it.pupil||2)*S;const irU=el('path',{d:'',fill:'#6D4C41',stroke:'#4E342E','stroke-width':2},g),irD=el('path',{d:'',fill:'#6D4C41',stroke:'#4E342E','stroke-width':2},g);
  const setIris=r=>{at(irU,{d:`M${X0+68},${CY-150} L${X0+80},${CY-r} L${X0+92},${CY-r} L${X0+96},${CY-150} Z`});at(irD,{d:`M${X0+68},${CY+150} L${X0+80},${CY+r} L${X0+92},${CY+r} L${X0+96},${CY+150} Z`})};setIris(pr);
  // ciliary body + zonules + lens (4 mm thick, 9.5 mm wide)
  [-1,1].forEach(s=>el('path',{d:`M${X0+96},${CY+s*152} L${X0+150},${CY+s*168} L${X0+176},${CY+s*150} L${X0+120},${CY+s*132} Z`,fill:'#8D3F3F'},g));
  const lens=el('path',{d:'',fill:'#FFF8E1',stroke:'#FFE082','stroke-width':3,opacity:.92},g);const zon=el('path',{d:'',stroke:'#E0E0E0','stroke-width':1.5,fill:'none',opacity:.7},g);
  const setLens=q=>{const th=(4+0.6*q)*S,hw=(4.75-.25*q)*S,xa=X0+90,xb=xa+th,xm=xa+th*.4;at(lens,{d:`M${f2(xm)},${f2(CY-hw)} Q${f2(xa-th*.25)},${CY} ${f2(xm)},${f2(CY+hw)} Q${f2(xb+th*.25)},${CY} ${f2(xm)},${f2(CY-hw)} Z`});
    let d='';for(let k=-2;k<=2;k++)[-1,1].forEach(s=>{d+=`M${f2(xm+k*6)},${f2(CY+s*hw)} L${X0+150+k*6},${CY+s*150} `});at(zon,{d})};setLens(0);
  // rays
  const rays=[-1,-.5,.5,1].map(k=>el('path',{d:'',stroke:'#FFEE58','stroke-width':3,fill:'none',opacity:.9},g));const fp=el('circle',{r:8,fill:'#FFEE58'},g);
  sbar(g,320,820,250,U('10 mm','10 mm'));
  lines(g,1180,210,[U('O‘q uzunligi ~24 mm (miqyos: 1 mm = 25 px)','Axial length ~24 mm (scale 1 mm = 25 px)'),U('Optik kuch ~60 D: shox parda ~43 D, gavhar ~17–20 D','Power ~60 D: cornea ~43 D, lens ~17–20 D'),U('Shox parda egriligi r ≈ 7,8 mm, qalinligi ~0,55 mm','Corneal radius ≈ 7.8 mm, thickness ~0.55 mm'),U('Gavhar ~4 × 9,5 mm; yoshlikda akkomodatsiya +10 D gacha','Lens ~4 × 9.5 mm; young accommodation up to +10 D'),U('~120 mln tayoqcha, ~6 mln kolbacha','~120 million rods, ~6 million cones'),U('Disk foveadan ~15° burun tomonda (ko‘r dog‘)','Disc ~15° nasal to the fovea (blind spot)')],{size:18,dy:34});
  const lab=steps(g,1180,470,[[0,def==='myopia'?U('Miopiya: fokus to‘r pardadan oldinda (ko‘z uzun)','Myopia: focus in front of retina (long eye)'):def==='hyperopia'?U('Gipermetropiya: fokus to‘r pardadan orqada','Hyperopia: focus behind the retina'):U('Uzoqqa qarash: nurlar foveada yig‘iladi','Distance vision: rays focus on the fovea')]],{size:20});
  note(g,U('O‘ng ko‘zning gorizontal kesimi, yuqoridan; burun tomoni — tepada','Horizontal section of right eye, from above; nasal side up'),800,880,{size:17});
  const F=def==='myopia'?GC+170:def==='hyperopia'?GC+380:GC+262;
  Object.assign(A,{cornea:[X0+10,CY-90],iris:[X0+84,CY-110],pupil:[X0+86,CY],lens:[X0+150,CY+60],vitreous:[GC+60,CY+150],retina:()=>[GC+267*Math.cos(.7),CY+267*Math.sin(.7)],sclera:()=>[GC+291*Math.cos(-1.1),CY+291*Math.sin(-1.1)],opticNerve:[1100,f2(CY+290*Math.sin(disc)-50)],
    e_ac:[X0+45,CY+60],e_cil:[X0+150,CY-162],e_zon:[X0+140,CY+140],e_chor:()=>[GC+277*Math.cos(1.2),CY+277*Math.sin(1.2)],e_fov:[GC+258,CY],e_disc:[f2(dx),f2(dy)]});
  return {anchors:A,core:['cornea','iris','pupil','lens','vitreous','retina','sclera','opticNerve','e_ac','e_cil','e_fov','e_disc'],coreSchool:['cornea','iris','pupil','lens','retina','opticNerve'],labelLayout:'tb',update(lt,p,st){
    const q=E.inOutCubic(prog(lt,st+.6,st+2.4));const xl=X0+150;
    rays.forEach((r,i)=>{const k=[-1,-.5,.5,1][i],y0=CY+k*95;const ex=Math.min(F,GC+262),u=(ex-xl)/(F-xl),ye=y0+(CY-y0)*u;const xs=lerp(40,xl,q);
      let d=`M40,${f2(y0)} L${f2(xs)},${f2(y0)}`;if(q>=1){const q2=prog(lt,st+2.4,st+3.6);const xe=lerp(xl,ex,q2);d+=` L${f2(xe)},${f2(y0+(CY-y0)*(xe-xl)/(F-xl))}`;if(def==='myopia'&&q2>=1){const yr=y0+(CY-y0)*((GC+262)-xl)/(F-xl);d+=` L${GC+258},${f2(yr)}`}}at(r,{d})});
    at(fp,{cx:f2(F<GC+262?F:GC+262),cy:CY,opacity:f2(prog(lt,st+3.4,st+3.8)*(.6+.4*Math.sin(lt*5)))})}}});
/* ---------- vessel: longitudinal flow (RBC) + artery/vein/capillary cross-sections (tunics) + pressure & velocity along circulation ---------- */
KIT.names(NAMES.uz,{vessel:'Qon tomiri (oqim)',v_int:'Ichki qavat (endoteliy)',v_med:'O‘rta qavat (silliq mushak, elastin)',v_adv:'Tashqi qavat (biriktiruvchi to‘qima)',v_art:'Arteriya: qalin o‘rta qavat',v_vein:'Vena: yupqa devor, keng bo‘shliq, klapanlar',v_cap:'Kapillyar: bir qavat endoteliy (5–10 µm)',v_rbc:'Eritrotsit (Ø 7,5 µm, ikki botiq)'});
KIT.names(NAMES.en,{vessel:'Blood vessel (flow)',v_int:'Tunica intima (endothelium)',v_med:'Tunica media (smooth muscle, elastin)',v_adv:'Tunica adventitia (connective tissue)',v_art:'Artery: thick media',v_vein:'Vein: thin wall, wide lumen, valves',v_cap:'Capillary: single endothelial layer (5–10 µm)',v_rbc:'Red blood cell (Ø 7.5 µm, biconcave)'});
SM.items.vessel=preset(1600,900,(g,it)=>{const A={};
  // longitudinal segment
  const Y1=70,Y2=300;el('rect',{x:40,y:Y1-26,width:1520,height:26,fill:'#C62828'},g);el('rect',{x:40,y:Y2,width:1520,height:26,fill:'#C62828'},g);
  el('rect',{x:40,y:Y1-34,width:1520,height:8,fill:'#8D6E63'},g);el('rect',{x:40,y:Y2+26,width:1520,height:8,fill:'#8D6E63'},g);
  el('rect',{x:40,y:Y1,width:1520,height:Y2-Y1,fill:'#FFE0B2',opacity:.18},g);el('line',{x1:40,y1:Y1,x2:1560,y2:Y1,stroke:'#FFCDD2','stroke-width':3},g);el('line',{x1:40,y1:Y2,x2:1560,y2:Y2,stroke:'#FFCDD2','stroke-width':3},g);
  const cg=clipTo(g,['rect',{x:40,y:Y1,width:1520,height:Y2-Y1}]);
  const cells=[...Array(it.cells||26)].map((_,i)=>{const c=el('g',{},cg);el('ellipse',{rx:30,ry:30*.32+8,fill:'#D32F2F'},c);el('ellipse',{rx:14,ry:5,fill:'#8E0000',opacity:.45},c);return c});
  const wb=el('g',{},cg);el('circle',{r:26,fill:'#ECEFF1',opacity:.9},wb);el('path',{d:'M-10,-6 C-2,-14 8,-8 4,0 C10,6 0,14 -8,8',stroke:'#7E57C2','stroke-width':6,fill:'none'},wb);
  const plt=[...Array(8)].map(()=>el('ellipse',{rx:7,ry:3,fill:'#FFCC80'},cg));
  // parabolic profile arrows
  const prof=el('g',{},g);for(let k=0;k<=8;k++){const y=Y1+12+(Y2-Y1-24)*k/8,u=1-Math.pow((y-(Y1+Y2)/2)/((Y2-Y1)/2),2);arw(prof,[1380,y],[1380+150*u+8,y],'#FFFFFF',2)}
  txt(g,T(U('Laminar oqim: markazda tezroq','Laminar flow: fastest at centre')),1460,Y2-12,{size:16,color:'ink',weight:700});
  // cross-sections
  const cs=(cx,cy,R,wall,med,lab,valve)=>{const G=el('g',{},g);el('circle',{cx,cy,r:R,fill:'#A1887F'},G);el('circle',{cx,cy,r:R-wall*(1-med),fill:'#C62828'},G);el('circle',{cx,cy,r:R-wall+3,fill:'#FFCDD2'},G);el('circle',{cx,cy,r:R-wall,fill:'#3E1F1F'},G);
    if(valve)el('path',{d:`M${cx-(R-wall)},${cy} Q${cx},${cy+30} ${cx+(R-wall)},${cy}`,stroke:'#FFCDD2','stroke-width':4,fill:'none'},G);txt(G,T(lab),cx,cy+R+34,{size:18,color:'ink',weight:800});return G};
  cs(170,560,120,56,.75,U('Arteriya','Artery'));cs(460,560,130,22,.5,U('Vena','Vein'),true);
  const cap=el('g',{},g);el('circle',{cx:690,cy:560,r:30,fill:'#FFCDD2'},cap);el('circle',{cx:690,cy:560,r:24,fill:'#3E1F1F'},cap);el('ellipse',{cx:690,cy:560,rx:20,ry:10,fill:'#D32F2F'},cap);el('ellipse',{cx:676,cy:533,rx:9,ry:5,fill:'#5C6BC0'},cap);txt(cap,T(U('Kapillyar','Capillary')),690,624,{size:18,color:'ink',weight:800});
  note(g,U('Kesimlar miqyossiz: aorta Ø ~25 mm, kapillyar Ø 5–10 µm','Sections not to scale: aorta Ø ~25 mm, capillary Ø 5–10 µm'),420,762,{size:16});
  lines(g,60,800,[U('Arteriya: devor/bo‘shliq nisbati katta, bosimga chidamli','Artery: high wall/lumen ratio, withstands pressure'),U('Vena: qonning ~65–70% i venalarda (sig‘im tomirlari)','Veins hold ~65–70% of blood (capacitance)'),U('Kapillyarlarda oqim eng sekin → modda almashinuvi','Slowest flow in capillaries → exchange')],{size:17,dy:28});
  // chart: pressure + velocity along circulation
  const X=[0,1,2,3,4,5,6],xs=['Ao','A','a','Kap','v','V','KV'];const {px,py}=axes(g,900,430,600,300,{x:[0,6],y:[0,130],yt:[0,40,80,120],yl:U('Bosim, mmHg · tezlik (nisbiy)','Pressure, mmHg · velocity (relative)')});
  xs.forEach((s,i)=>txt(g,s,px(i),760,{size:16,color:'dim',weight:700}));
  let dS='',dD='';const sys=[120,110,60,35,15,8,2],dia=[80,78,40,15,12,6,0];X.forEach(i=>{dS+=(i?'L':'M')+f2(px(i))+','+f2(py(sys[i]));dD+=(i?'L':'M')+f2(px(i))+','+f2(py(dia[i]))});
  el('path',{d:dS+X.slice().reverse().map(i=>'L'+f2(px(i))+','+f2(py(dia[i]))).join('')+'Z',fill:'#EF5350',opacity:.25},g);el('path',{d:dS,stroke:'#EF5350','stroke-width':3,fill:'none'},g);el('path',{d:dD,stroke:'#EF5350','stroke-width':3,fill:'none'},g);
  const vel=[100,60,20,1,8,30,45];el('path',{d:X.map(i=>(i?'L':'M')+f2(px(i))+','+f2(py(vel[i]))).join(' '),stroke:'#4FC3F7','stroke-width':4,fill:'none','stroke-dasharray':'10 6'},g);
  txt(g,T(U('— bosim (sistola–diastola)   - - tezlik','— pressure (systolic–diastolic)   - - velocity')),1200,800,{size:15,color:'dim',weight:700});
  lines(g,900,830,[U('Ko‘ndalang kesim: aorta ~4 cm², kapillyarlar jami ~4500 cm² → tezlik ~0,03 cm/s','Cross-section: aorta ~4 cm², capillaries ~4500 cm² total → ~0.03 cm/s')],{size:15});
  const mark=el('circle',{r:9,fill:'#FFEE58'},g);
  Object.assign(A,{vessel:[800,Y1-40],v_rbc:()=>{const c=cells[3].getAttribute('transform')||'';const m=/translate\(([-\d.]+) ([-\d.]+)/.exec(c);return m?[+m[1],+m[2]]:[600,180]},v_int:[170,560-62],v_med:[170,560-90],v_adv:[170-112,560-40],v_art:[170,440],v_vein:[460,430],v_cap:[690,530]});
  return {anchors:A,core:['vessel','v_rbc','v_int','v_med','v_adv','v_art','v_vein','v_cap'],coreSchool:['vessel','v_art','v_vein','v_cap'],labelLayout:'tb',update(lt){const sp=it.speed||1;
    cells.forEach((c,i)=>{const yy=Y1+30+seeded(i,3)*(Y2-Y1-60),u=1-Math.pow((yy-(Y1+Y2)/2)/((Y2-Y1)/2),2);const v=sp*(80+180*u),x=((seeded(i,2)*1700+lt*v)%1700)-60;at(c,{transform:`translate(${f2(x)} ${f2(yy+Math.sin(lt*2+i)*4)}) rotate(${f2(Math.sin(lt+i)*35)})`})});
    at(wb,{transform:`translate(${f2(((lt*sp*60)%1700)-60)} ${Y2-34})`});plt.forEach((c,i)=>at(c,{cx:f2(((seeded(i,7)*1700+lt*sp*90)%1700)-40),cy:Y2-12-seeded(i,8)*20}));
    const q=(lt*.25)%1*6;const i0=Math.floor(q),fr=q-i0;at(mark,{cx:f2(px(q)),cy:f2(py(lerp(sys[i0],sys[Math.min(6,i0+1)],fr)))})}}});
/* ---------- transport kind 'pump': Na⁺/K⁺-ATPase Post–Albers cycle (3 Na⁺ out, 2 K⁺ in per ATP), real gradients; other kinds unchanged ---------- */
KIT.names(NAMES.uz,{t_e1:'E1 holat: ichkariga ochiq (3 Na⁺ bog‘lanadi)',t_atp:'ATP → ADP + P (fosforlanish)',t_e2:'E2 holat: tashqariga ochiq (2 K⁺ bog‘lanadi)',t_leak:'K⁺ sizib chiqish kanali',t_mv:'Tinchlik potensiali ~ −70 mV'});
KIT.names(NAMES.en,{t_e1:'E1: open to inside (binds 3 Na⁺)',t_atp:'ATP → ADP + Pi (phosphorylation)',t_e2:'E2: open to outside (binds 2 K⁺)',t_leak:'K⁺ leak channel',t_mv:'Resting potential ~ −70 mV'});
{const OLD=SM.items.transport;
const PUMP=preset(1600,900,(g,it)=>{const A={};const TT=it.cycle||8,yc=430,px=700;
  el('rect',{x:0,y:0,width:1600,height:yc-60,fill:'#0E2A3F',opacity:.6},g);el('rect',{x:0,y:yc+60,width:1600,height:900-yc-60,fill:'#2A1B3A',opacity:.6},g);
  for(let x=20;x<1600;x+=26){if(Math.abs(x-px)<110||Math.abs(x-1250)<50)continue;[-1,1].forEach(s=>{el('circle',{cx:x,cy:yc+s*48,r:11,fill:'#FFCC80'},g);el('path',{d:`M${x-4},${yc+s*37} L${x-4},${yc+s*6} M${x+4},${yc+s*37} L${x+4},${yc+s*6}`,stroke:'#FFE0B2','stroke-width':2.5},g)})}
  txt(g,T(U('Hujayradan tashqari: Na⁺ 145 mM · K⁺ 4 mM','Extracellular: Na⁺ 145 mM · K⁺ 4 mM')),40,70,{size:24,color:'ink',weight:800,anchor:'start'});
  txt(g,T(U('Sitoplazma: Na⁺ 12 mM · K⁺ 140 mM','Cytoplasm: Na⁺ 12 mM · K⁺ 140 mM')),40,860,{size:24,color:'ink',weight:800,anchor:'start'});
  // static ion clouds
  for(let i=0;i<40;i++)el('circle',{cx:f2(40+seeded(i,1)*1500),cy:f2(110+seeded(i,2)*230),r:9,fill:'#42A5F5',opacity:.7},g);for(let i=0;i<3;i++)el('circle',{cx:f2(40+seeded(i,3)*1500),cy:f2(110+seeded(i,4)*230),r:9,fill:'#AB47BC',opacity:.8},g);
  for(let i=0;i<4;i++)el('circle',{cx:f2(40+seeded(i,5)*1500),cy:f2(530+seeded(i,6)*280),r:9,fill:'#42A5F5',opacity:.7},g);for(let i=0;i<38;i++)el('circle',{cx:f2(40+seeded(i,7)*1500),cy:f2(530+seeded(i,8)*280),r:9,fill:'#AB47BC',opacity:.8},g);
  // K leak channel
  [-1,1].forEach(s=>el('rect',{x:1250+s*26-14,y:yc-70,width:28,height:140,rx:12,fill:'#26A69A'},g));const kl=el('circle',{r:9,fill:'#AB47BC'},g);
  // pump: two halves forming alternating-access cavity
  const L=el('path',{fill:'#5C6BC0',stroke:'#3949AB','stroke-width':3},g),R=el('path',{fill:'#5C6BC0',stroke:'#3949AB','stroke-width':3},g);
  const setP=f=>{// f 0 = open inside (E1), 1 = open outside (E2)
    const ti=lerp(30,4,f),to=lerp(4,30,f);at(L,{d:`M${px-110},${yc-90} L${px-to},${yc-90} L${px-ti},${yc+90} L${px-110},${yc+90} Z`});at(R,{d:`M${px+110},${yc-90} L${px+to},${yc-90} L${px+ti},${yc+90} L${px+110},${yc+90} Z`})};
  const na=[0,1,2].map(()=>el('circle',{r:12,fill:'#42A5F5',stroke:'#E3F2FD','stroke-width':2},g)),k=[0,1].map(()=>el('circle',{r:12,fill:'#AB47BC',stroke:'#F3E5F5','stroke-width':2},g));
  const atp=el('g',{},g);el('rect',{x:-36,y:-16,width:72,height:32,rx:10,fill:'#FFCA28'},atp);const atpT=txt(atp,'ATP',0,8,{size:18,color:'#000',weight:800});const pi=el('circle',{r:10,fill:'#FF7043'},g);
  const st=steps(g,1000,170,[[0,U('1. E1: 3 Na⁺ ichkaridan bog‘lanadi','1. E1: 3 Na⁺ bind from inside')],[.2,U('2. ATP → ADP; nasos fosforlanadi','2. ATP → ADP; pump phosphorylated')],[.33,U('3. E2: tashqariga ochiladi, 3 Na⁺ chiqadi','3. E2: opens outward, 3 Na⁺ released')],[.5,U('4. 2 K⁺ tashqaridan bog‘lanadi','4. 2 K⁺ bind from outside')],[.62,U('5. Fosfat ajraladi → E1 ga qaytadi','5. Dephosphorylation → back to E1')],[.8,U('6. 2 K⁺ ichkariga chiqariladi','6. 2 K⁺ released inside')]],{size:22});
  lines(g,1000,620,[U('Bir sikl: 3 Na⁺ tashqariga, 2 K⁺ ichkariga, 1 ATP','Per cycle: 3 Na⁺ out, 2 K⁺ in, 1 ATP'),U('Elektrogen: har siklda +1 zaryad tashqariga','Electrogenic: net +1 charge out per cycle'),U('Tezlik ~100 sikl/s; dam olishda ATP ning ~20–25% i','~100 cycles/s; ~20–25% of resting ATP'),U('Ouabain/digoksin E2 holatni bloklaydi','Ouabain/digoxin block the E2 state')],{size:18,dy:30});
  const mv=txt(g,'',1000,760,{size:22,color:'#FFCA28',weight:800,anchor:'start'});mv.textContent=T(U('Membrana potensiali ~ −70 mV (ichkari manfiy)','Membrane potential ~ −70 mV (inside negative)'));
  Object.assign(A,{outside:[1500,140],inside:[1500,800],membrane:[300,yc-48],protein:[px-90,yc],molecule:()=>{const b=na[0].getAttribute('cx');return [+b||px,+na[0].getAttribute('cy')||yc]},t_e1:[px,yc+110],t_atp:()=>[+atp.dataset.x||px+160,+atp.dataset.y||yc+150],t_e2:[px,yc-110],t_leak:[1250,yc-80],t_mv:[1000,752]});
  return {anchors:A,core:['outside','inside','membrane','protein','t_atp','t_leak'],coreSchool:['outside','inside','membrane','protein'],labelLayout:'tb',update(lt,p,s0){const u=(((lt-s0-.5)/TT)%1+1)%1;st(u);
    const f=u<.25?0:u<.33?E.inOutCubic((u-.25)/.08):u<.62?1:u<.72?1-E.inOutCubic((u-.62)/.1):0;setP(f);
    na.forEach((c,i)=>{const sx=px-40+i*40;let x,y;if(u<.2){const q=E.inOutCubic(u/.2);x=lerp(sx-150,px-18+i*18,q);y=lerp(yc+250,yc+30,q)}else if(u<.33){x=px-18+i*18;y=lerp(yc+30,yc-10,(u-.2)/.13)}else if(u<.5){const q=E.inOutCubic((u-.33)/.17);x=lerp(px-18+i*18,sx+120*(i-1),q);y=lerp(yc-10,yc-260,q)}else{x=sx+120*(i-1);y=yc-260;}
      at(c,{cx:f2(x),cy:f2(y),opacity:u>.5?f2(1-(u-.5)/.1):1})});
    k.forEach((c,i)=>{let x,y,o=1;if(u<.45){o=0;x=px;y=yc-250}else if(u<.6){const q=E.inOutCubic((u-.45)/.15);x=lerp(px-160+i*320,px-10+i*20,q);y=lerp(yc-250,yc-30,q)}else if(u<.8){x=px-10+i*20;y=lerp(yc-30,yc+20,(u-.6)/.2)}else{const q=E.inOutCubic((u-.8)/.2);x=lerp(px-10+i*20,px-120+i*240,q);y=lerp(yc+20,yc+240,q);o=1-q*.6}at(c,{cx:f2(x),cy:f2(y),opacity:f2(o)})});
    const ax=u<.2?lerp(px+300,px+130,u/.2):px+130,ay=yc+150;at(atp,{transform:`translate(${f2(ax)} ${ay})`,opacity:f2(u<.33?1:.35)});atpT.textContent=u<.25?'ATP':'ADP';atp.dataset.x=ax;atp.dataset.y=ay;
    at(pi,{cx:px+90,cy:f2(u<.25?yc+130:u<.62?yc+70:lerp(yc+70,yc+200,(u-.62)/.2)),opacity:f2(u<.25?0:u<.82?1:0)});
    const kq=(lt*.35)%1;at(kl,{cx:1250,cy:f2(lerp(yc+180,yc-180,kq)),opacity:f2(Math.sin(Math.PI*kq))})}}});
SM.items.transport={...OLD,build(it,ctx){return ((it.kind||'simple')==='pump'?PUMP:OLD).build(it,ctx)}};}
/* ---------- enzyme: induced fit (Koshland), E+S ⇌ ES → E+P, activation energy diagram, T/pH dependence via SM.param ---------- */
KIT.names(NAMES.uz,{z_es:'Ferment–substrat kompleksi (ES)',z_fit:'Induksiyalangan moslashuv (Koshland)',z_ea:'Faollanish energiyasi (Ea) pasayadi',z_dg:'ΔG o‘zgarmaydi (muvozanat siljimaydi)',z_vm:'Tezlik: harorat va pH ga bog‘liq'});
KIT.names(NAMES.en,{z_es:'Enzyme–substrate complex (ES)',z_fit:'Induced fit (Koshland)',z_ea:'Activation energy (Ea) lowered',z_dg:'ΔG unchanged (equilibrium not shifted)',z_vm:'Rate depends on temperature and pH'});
SM.items.enzyme=preset(1600,900,(g,it)=>{const A={};const ex=420,ey=520,TT=it.cycle||8;
  const Tc=SM.param?SM.param('T',it):37,pH=SM.param?SM.param('pH',it):7.4,opt=it.optpH||7.4;
  const fT=Tc>45?Math.max(0,Math.pow(2,(45-37)/10)*(1-(Tc-45)/15)):Math.pow(2,(Tc-37)/10),fp=Math.exp(-Math.pow((pH-opt)/1.2,2)),act=Math.max(0,fT*fp);
  // enzyme body with cleft whose jaws close (induced fit)
  const body=el('path',{fill:'#5C6BC0',stroke:'#3949AB','stroke-width':4},g);const site=el('path',{fill:'none',stroke:'#FFCA28','stroke-width':5,'stroke-dasharray':'8 6'},g);
  const setB=c=>{const w=lerp(80,52,c);at(body,{d:`M${ex-250},${ey+170} C${ex-310},${ey} ${ex-230},${ey-150} ${ex-w-40},${ey-170} L${ex-w},${ey-60} Q${ex},${ey-10} ${ex+w},${ey-60} L${ex+w+40},${ey-170} C${ex+230},${ey-150} ${ex+310},${ey} ${ex+250},${ey+170} Z`});at(site,{d:`M${ex-w},${ey-64} Q${ex},${ey-14} ${ex+w},${ey-64}`})};
  const sub=el('g',{},g);const pa=el('path',{d:'M-46,0 L-46,-60 L0,-60 L0,-16 Q-24,6 -46,0Z',fill:'#66BB6A',stroke:'#2E7D32','stroke-width':3},sub),pb=el('path',{d:'M0,-60 L46,-60 L46,0 Q24,6 0,-16Z',fill:'#26C6DA',stroke:'#00838F','stroke-width':3},sub);
  const bond=el('line',{x1:0,y1:-60,x2:0,y2:-16,stroke:'#FFFFFF','stroke-width':4},sub);
  txt(g,T(U('E + S ⇌ ES → E + P','E + S ⇌ ES → E + P')),ex,180,{size:30,color:'ink',weight:800});
  // energy diagram
  const {px,py}=axes(g,900,200,600,340,{x:[0,1],y:[0,100],yl:U('Erkin energiya G','Free energy G'),xl:U('Reaksiya koordinatasi','Reaction coordinate')});
  const prof=(h)=>pth(x=>{const base=lerp(55,25,1/(1+Math.exp(-(x-.5)*14)));return [px(x),py(base+h*Math.exp(-Math.pow((x-.5)/.12,2)))]},0,1,80);
  el('path',{d:prof(40),stroke:'#EF5350','stroke-width':4,fill:'none'},g);el('path',{d:prof(14),stroke:'#66BB6A','stroke-width':4,fill:'none'},g);
  txt(g,T(U('fermentsiz','uncatalysed')),px(.5),py(98),{size:17,color:'#EF5350',weight:800});txt(g,T(U('ferment bilan','catalysed')),px(.72),py(62),{size:17,color:'#66BB6A',weight:800});
  arw(g,[px(.32),py(55)],[px(.32),py(93)],'#EF5350',3);arw(g,[px(.4),py(55)],[px(.4),py(67)],'#66BB6A',3);txt(g,'Ea',px(.28),py(76),{size:18,color:'#EF5350',weight:800});
  arw(g,[px(.95),py(55)],[px(.95),py(26)],'#FFCA28',3);txt(g,'ΔG',px(.9),py(40),{size:18,color:'#FFCA28',weight:800});
  const dot=el('circle',{r:9,fill:'#FFEE58'},g);
  // activity gauge from params
  const gg=gauge(g,900,650,420,U('Nisbiy faollik (T, pH bo‘yicha)','Relative activity (T, pH)'),'#66BB6A');gg(Math.min(1,act/1.8),f2(act)+'×');
  lines(g,900,720,[U(`Hozir: T = ${Tc} °C, pH = ${pH} (optimum pH ~${opt})`,`Now: T = ${Tc} °C, pH = ${pH} (optimum pH ~${opt})`),U('Q₁₀ ≈ 2: har 10 °C da tezlik ~2 marta; >45 °C — denaturatsiya','Q₁₀ ≈ 2: ×2 per 10 °C; >45 °C — denaturation'),U('Ferment tezlikni 10⁶–10¹⁷ marta oshiradi','Enzymes accelerate reactions 10⁶–10¹⁷-fold'),U('Michaelis: v = Vmax·[S]/(Km + [S])','Michaelis: v = Vmax·[S]/(Km + [S])')],{size:18,dy:30,keep:true});
  const ES={s:null,p:null};
  Object.assign(A,{enzyme:[ex-200,ey+100],activesite:[ex,ey-50],substrate:()=>ES.s||[ex,ey-90],products:()=>ES.p||[ex+300,ey-260],z_es:[ex+70,ey-100],z_fit:[ex+70,ey-150],z_ea:[px(.4),py(70)],z_dg:[px(.95),py(40)],z_vm:[1110,662]});
  return {anchors:A,core:['enzyme','activesite','substrate','products','z_fit','z_ea','z_dg'],coreSchool:['enzyme','activesite','substrate','products'],labelLayout:'tb',update(lt,p,st){const sp=Math.max(.25,Math.min(2,act));const u=(((lt-st-.6)*sp/TT)%1+1)%1;
    const inP=E.inOutCubic(prog(u,0,.3)),cl=prog(u,.3,.42)-prog(u,.62,.72),out=E.inOutCubic(prog(u,.62,1));setB(Math.max(0,cl));
    const sx=lerp(ex+420,ex,inP),sy=lerp(ey-330,ey-60,inP);at(sub,{transform:`translate(${f2(sx)} ${f2(sy)})`});at(bond,{opacity:f2(u<.55?1:0)});
    at(pa,{transform:`translate(${f2(-out*300)} ${f2(-out*240)}) rotate(${f2(-out*30)})`});at(pb,{transform:`translate(${f2(out*300)} ${f2(-out*240)}) rotate(${f2(out*30)})`});
    ES.s=u<.6?[sx,sy-60]:null;ES.p=u>.66?[sx+out*300,sy-out*240-60]:null;
    const x=prog(u,.2,.8);const base=lerp(55,25,1/(1+Math.exp(-(x-.5)*14)));at(dot,{cx:f2(px(x)),cy:f2(py(base+14*Math.exp(-Math.pow((x-.5)/.12,2))))})}}});
/* ---------- digestive: anterior view, organs in anatomical position (patient's right = viewer's left), proportional lengths, transit ---------- */
KIT.names(NAMES.uz,{d_sal:'So‘lak bezlari (~1–1,5 l/sutka)',d_duo:'O‘n ikki barmoqli ichak (~25 cm)',d_cec:'Ko‘richak',d_app:'Chuvalchangsimon o‘simta (appendiks)',d_anus:'Orqa chiqaruv teshigi',d_pyl:'Pilorus (sfinkter)'});
KIT.names(NAMES.en,{d_sal:'Salivary glands (~1–1.5 l/day)',d_duo:'Duodenum (~25 cm)',d_cec:'Caecum',d_app:'Vermiform appendix',d_anus:'Anus',d_pyl:'Pylorus (sphincter)'});
SM.items.digestive=preset(1600,1000,(g,it)=>{const A={};const cx=430;
  // torso silhouette
  el('path',{d:`M${cx-60},20 C${cx-80},80 ${cx-70},120 ${cx-40},150 L${cx-40},190 C${cx-200},210 ${cx-260},260 ${cx-270},380 L${cx-280},700 C${cx-290},820 ${cx-250},900 ${cx-200},980 L${cx+200},980 C${cx+250},900 ${cx+290},820 ${cx+280},700 L${cx+270},380 C${cx+260},260 ${cx+200},210 ${cx+40},190 L${cx+40},150 C${cx+70},120 ${cx+80},80 ${cx+60},20 Z`,fill:'#1B2B3E',stroke:'#2F4A66','stroke-width':3},g);
  [-1,1].forEach(s=>el('ellipse',{cx:cx+s*48,cy:120,rx:16,ry:10,fill:'#F48FB1',opacity:.8},g));
  // oesophagus (25 cm ≈ 270 px) behind
  const oes=[[cx,95],[cx+4,200],[cx+10,300],[cx+40,370]];el('path',{d:'M'+oes.map(p=>p.join(',')).join(' L'),stroke:'#E57373','stroke-width':16,fill:'none','stroke-linecap':'round'},g);
  // large intestine frame (behind small intestine)
  const LI=[[cx-150,830],[cx-160,700],[cx-165,580],[cx-140,545],[cx-40,560],[cx+60,555],[cx+160,530],[cx+180,560],[cx+185,700],[cx+180,820],[cx+120,860],[cx+60,850],[cx+20,880],[cx,930],[cx,965]];
  const liD='M'+LI.map(p=>p.join(',')).join(' L');el('path',{d:liD,stroke:'#8D6E63','stroke-width':46,fill:'none','stroke-linejoin':'round','stroke-linecap':'round'},g);
  for(let i=0;i<LI.length-4;i++){const [x,y]=LI[i],[x2,y2]=LI[i+1];for(let k=1;k<3;k++){const u=k/3,px=lerp(x,x2,u),py=lerp(y,y2,u),dx=y2-y,dy=-(x2-x),L=Math.hypot(dx,dy)||1;el('line',{x1:f2(px-dx/L*22),y1:f2(py-dy/L*22),x2:f2(px+dx/L*22),y2:f2(py+dy/L*22),stroke:'#6D4C41','stroke-width':3},g)}}
  el('path',{d:`M${cx-150},835 Q${cx-150},870 ${cx-130},880`,stroke:'#8D6E63','stroke-width':12,fill:'none','stroke-linecap':'round'},g);
  // liver (viewer's left) + gallbladder
  el('path',{d:`M${cx-250},330 C${cx-240},270 ${cx-60},260 ${cx+100},300 C${cx+150},315 ${cx+120},350 ${cx+40},380 C${cx-60},420 ${cx-180},480 ${cx-240},470 C${cx-265},440 ${cx-260},380 ${cx-250},330 Z`,fill:'#8E3B30',stroke:'#5D2420','stroke-width':3},g);
  el('ellipse',{cx:cx-110,cy:470,rx:22,ry:34,fill:'#7CB342',stroke:'#33691E','stroke-width':2,transform:`rotate(-20 ${cx-110} 470)`},g);
  // stomach J-shape (viewer's right)
  const st=el('path',{d:`M${cx+40},370 C${cx+80},330 ${cx+200},330 ${cx+220},400 C${cx+240},480 ${cx+180},540 ${cx+90},540 L${cx+40},545 L${cx+40},515 L${cx+80},510 C${cx+140},505 ${cx+160},460 ${cx+140},430 C${cx+120},400 ${cx+80},400 ${cx+60},410 Z`,fill:'#E57373',stroke:'#B71C1C','stroke-width':3},g);
  // pancreas behind stomach, duodenum C-loop around head
  el('path',{d:`M${cx-30},560 C${cx+40},520 ${cx+140},520 ${cx+210},500 L${cx+215},520 C${cx+140},545 ${cx+60},560 ${cx},595 Z`,fill:'#FFCC80',stroke:'#F57C00','stroke-width':2},g);
  const duo=[[cx+40,530],[cx-20,535],[cx-50,580],[cx-30,630],[cx+30,630],[cx+60,610]];el('path',{d:'M'+duo.map(p=>p.join(',')).join(' L'),stroke:'#F06292','stroke-width':20,fill:'none','stroke-linejoin':'round','stroke-linecap':'round'},g);
  // small intestine coils (~6–7 m)
  const SI=[[cx+60,610]];for(let r=0;r<7;r++){const y=640+r*28,a=r%2?cx+120:cx-100,b=r%2?cx-100:cx+120;SI.push([a,y],[b,y+14])}SI.push([cx-120,820],[cx-145,815]);
  el('path',{d:'M'+SI.map(p=>p.join(',')).join(' L'),stroke:'#F48FB1','stroke-width':22,fill:'none','stroke-linejoin':'round','stroke-linecap':'round',opacity:.95},g);
  el('path',{d:'M'+SI.map(p=>p.join(',')).join(' L'),stroke:'#C2185B','stroke-width':2,fill:'none',opacity:.5},g);
  const ROUTE=[[cx,70],...oes,[cx+130,420],[cx+120,500],[cx+40,530],...duo.slice(1),...SI.slice(1),...LI];
  const food=el('circle',{r:12,fill:'#FFE066',stroke:'#F9A825','stroke-width':2},g);const stg=steps(g,1100,110,[[0,U('Og‘iz: chaynash, amilaza (soniyalar)','Mouth: chewing, amylase (seconds)')],[.06,U('Qizilo‘ngach: peristaltika ~8 s','Oesophagus: peristalsis ~8 s')],[.12,U('Oshqozon: pH 1,5–3,5; pepsin; 2–4 soat','Stomach: pH 1.5–3.5; pepsin; 2–4 h')],[.22,U('O‘n ikki barmoq: o‘t + pankreas shirasi','Duodenum: bile + pancreatic juice')],[.3,U('Ingichka ichak: so‘rilish, 3–5 soat','Small intestine: absorption, 3–5 h')],[.62,U('Yo‘g‘on ichak: suv so‘riladi, 12–48 soat','Large intestine: water absorption, 12–48 h')]],{size:22});
  lines(g,1100,200,[U('Qizilo‘ngach ~25 cm; oshqozon hajmi ~1–1,5 l','Oesophagus ~25 cm; stomach volume ~1–1.5 l'),U('Ingichka ichak ~6–7 m:','Small intestine ~6–7 m:'),U('  o‘n ikki barmoq 0,25 · och 2,5 · yonbosh 3,5 m','  duodenum 0.25 · jejunum 2.5 · ileum 3.5 m'),U('So‘rish yuzasi ~30 m² (burma, vorsinka)','Absorptive area ~30 m² (folds, villi)'),U('Yo‘g‘on ichak ~1,5 m','Large intestine ~1.5 m'),U('Mikrobiota ~3,8·10¹³ bakteriya','Microbiota ~3.8·10¹³ bacteria'),U('Jigar ~1,5 kg; o‘t 0,5–1 l/sutka','Liver ~1.5 kg; bile 0.5–1 l/day'),U('Pankreas shirasi ~1,5 l/sutka (pH ~8)','Pancreatic juice ~1.5 l/day (pH ~8)')],{size:18,dy:34});
  note(g,U('Old ko‘rinish: bemorning o‘ng tomoni — tomoshabinning chapida; ingichka ichak qisqartirilgan','Anterior view: patient’s right on viewer’s left; small intestine coils shortened'),1000,985,{size:16});
  Object.assign(A,{mouth:[cx,70],esophagus:[cx+6,250],liver:[cx-170,360],gallbladder:[cx-110,480],stomach:[cx+190,420],pancreas:[cx+150,520],smallIntestine:[cx+10,720],largeIntestine:[cx+182,680],rectum:[cx,930],d_sal:[cx-48,120],d_duo:[cx-48,590],d_cec:[cx-152,820],d_app:[cx-132,880],d_anus:[cx,968],d_pyl:[cx+42,528]});
  return {anchors:A,core:['mouth','esophagus','liver','gallbladder','stomach','pancreas','smallIntestine','largeIntestine','rectum','d_duo','d_app'],coreSchool:['mouth','esophagus','liver','stomach','smallIntestine','largeIntestine'],labelLayout:'lr',update(lt,p,s0){const u=(((lt-s0-.8)/(it.cycle||12))%1+1)%1;stg(u);const q=along(ROUTE,u);at(food,{cx:f2(q[0]),cy:f2(q[1]),opacity:f2(prog(lt,s0+.8,s0+1.2))})}}});

KIT.bind();
})();
