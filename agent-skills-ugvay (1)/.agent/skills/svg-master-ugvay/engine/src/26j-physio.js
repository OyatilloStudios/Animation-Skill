/* ================= v2.8 SHELF: PHYSIOLOGY — reflex · circulation · endocrine · breathing · autonomic · thermoreg · acidbase
   Sources: Guyton & Hall, Boron & Boulpaep, Ganong. Numbers on screen are textbook values; drawings schematic where stated. */
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
const cellC=(g,x,y,r,fill,nuc,o={})=>{const G=el('g',{},g);el('circle',{cx:x,cy:y,r,fill,stroke:o.stroke||'#ECEFF1','stroke-width':2.5,opacity:o.op||.95},G);if(nuc)el('circle',{cx:x+(o.nx||0),cy:y+(o.ny||0),r:r*(o.nr||.55),fill:nuc,opacity:.95},G);return G};
const leg=(g,x,y,arr,o={})=>arr.forEach(([c,l],i)=>{el('rect',{x,y:y+i*(o.dy||30)-14,width:18,height:18,rx:4,fill:c},g);txt(g,T(l),x+28,y+i*(o.dy||30)+2,{size:o.size||17,color:'ink',weight:600,anchor:'start'})});
const ttl=(g,s,x,y,o={})=>txt(g,T(s),x,y,{size:o.size||24,color:o.color||'ink',weight:800,anchor:o.anchor||'start'});
const kindOf=(it,ty,list)=>{const k=it.kind||list[0];if(!list.includes(k)){SERR.push(`${ty}: kind "${k}" unknown → ${list.join(', ')}`);return list[0]}return k};
const dot=(g,c,r)=>el('circle',{r:r||9,fill:c,stroke:'#fff','stroke-width':2},g);
const poly=(g,P,c,w,o={})=>el('path',{d:P.map((p,i)=>(i?'L':'M')+f2(p[0])+','+f2(p[1])).join(' '),stroke:c,'stroke-width':w||4,fill:'none','stroke-linejoin':'round','stroke-linecap':'round','stroke-dasharray':o.dash||'none',opacity:o.op||1,'marker-end':o.arrow?arrowMarker(c):'none'},g);
/* ---------- reflex: knee-jerk (monosynaptic stretch reflex) and withdrawal (polysynaptic, crossed extensor) ---------- */
KIT.names(NAMES.uz,{rf_sp:'Mushak duki (cho‘zilish retseptori)',rf_noc:'Notsiseptor (og‘riq retseptori)',rf_drg:'Orqa ildiz tuguni (sezuvchi neyron tanasi)',rf_syn:'Sinaps orqa miya kulrang moddasida',rf_mn:'α-motoneyron (oldingi shox)',rf_in:'Tormozlovchi oraliq neyron',rf_q:'Effektor: to‘rt boshli mushak qisqaradi',rf_h:'Antagonist: son orqa mushaklari bo‘shashadi',rf_f:'Effektor: bukuvchi mushaklar qisqaradi',rf_x:'Kesishgan yozuvchi refleks (qarama-qarshi oyoq)'});
KIT.names(NAMES.en,{rf_sp:'Muscle spindle (stretch receptor)',rf_noc:'Nociceptor (pain receptor)',rf_drg:'Dorsal root ganglion (sensory cell body)',rf_syn:'Synapse in spinal grey matter',rf_mn:'α-motor neuron (ventral horn)',rf_in:'Inhibitory interneuron',rf_q:'Effector: quadriceps contracts',rf_h:'Antagonist: hamstrings relax',rf_f:'Effector: flexors contract',rf_x:'Crossed extensor reflex (opposite leg)'});
SM.items.reflex=preset(1700,900,(g,it)=>{const k=kindOf(it,'reflex',['stretch','withdrawal']);const W=k==='withdrawal';const A={},TT=it.cycle||8;
  const hip=[200,330],kn=[560,330],L=300;
  // thigh + muscles
  el('path',{d:`M${hip[0]},${hip[1]-55} L${kn[0]},${kn[1]-45} Q${kn[0]+45},${kn[1]} ${kn[0]},${kn[1]+45} L${hip[0]},${hip[1]+55} Z`,fill:'#F2C9A0',stroke:'#8D6E63','stroke-width':3},g);
  const quad=el('ellipse',{cx:390,cy:300,rx:150,ry:22,fill:'#E57373',stroke:'#B71C1C','stroke-width':2},g);const ham=el('ellipse',{cx:380,cy:362,rx:140,ry:20,fill:'#E57373',stroke:'#B71C1C','stroke-width':2},g);
  el('rect',{x:120,y:250,width:80,height:160,rx:14,fill:'#B0BEC5',opacity:.5},g);txt(g,T(U('o‘rindiq','seat')),160,440,{size:16,color:'dim',weight:600});
  const sh=el('g',{},g);el('path',{d:`M-34,0 L-26,${L} L30,${L} L34,0 Z`,fill:'#F2C9A0',stroke:'#8D6E63','stroke-width':3},sh);el('path',{d:`M-26,${L} L-26,${L+40} L90,${L+40} Q100,${L+20} 30,${L} Z`,fill:'#F2C9A0',stroke:'#8D6E63','stroke-width':3},sh);
  el('line',{x1:38,y1:5,x2:30,y2:60,stroke:'#FFF3E0','stroke-width':6},sh);
  // stimulus
  const ham2=el('g',{},g);el('rect',{x:-8,y:-90,width:16,height:90,rx:4,fill:'#90A4AE'},ham2);el('rect',{x:-30,y:-110,width:60,height:26,rx:8,fill:'#607D8B'},ham2);
  const pin=el('g',{},g);el('polygon',{points:'-6,0 6,0 0,40',fill:'#CFD8DC',stroke:'#455A64','stroke-width':2},pin);
  // spinal cord section
  const cx=1000,cy=330;el('ellipse',{cx,cy,rx:150,ry:110,fill:'#ECEFF1',stroke:'#90A4AE','stroke-width':3},g);
  el('path',{d:`M${cx-20},${cy} C${cx-60},${cy-20} ${cx-110},${cy-90} ${cx-70},${cy-95} C${cx-40},${cy-90} ${cx-30},${cy-40} ${cx},${cy-25} C${cx+30},${cy-40} ${cx+40},${cy-90} ${cx+70},${cy-95} C${cx+110},${cy-90} ${cx+60},${cy-20} ${cx+20},${cy} C${cx+80},${cy+20} ${cx+110},${cy+80} ${cx+60},${cy+85} C${cx+30},${cy+80} ${cx+20},${cy+40} ${cx},${cy+30} C${cx-20},${cy+40} ${cx-30},${cy+80} ${cx-60},${cy+85} C${cx-110},${cy+80} ${cx-80},${cy+20} ${cx-20},${cy} Z`,fill:'#B0A8B9',opacity:.85},g);
  el('circle',{cx,cy,r:6,fill:'#546E7A'},g);txt(g,T(U('orqa','dorsal')),cx,cy-120,{size:16,color:'dim',weight:600});txt(g,T(U('old','ventral')),cx,cy+135,{size:16,color:'dim',weight:600});
  const drg=[850,190];el('ellipse',{cx:drg[0],cy:drg[1],rx:30,ry:20,fill:'#FFD54F',stroke:'#F57F17','stroke-width':2},g);
  const rec=W?[560+20,330+L+30]:[400,300];
  const aff=W?[rec,[610,640],[612,420],[700,250],drg,[930,250],[955,300]]:[rec,[520,280],[700,200],drg,[930,250],[955,330],[955,385]];
  const mnQ=[955,395],mnH=[1030,405],inn=[995,330];
  const eff=W?[mnH,[900,470],[700,470],[470,385],[380,362]]:[mnQ,[900,460],[700,460],[520,300],[420,300]];
  const effI=W?[mnQ,[880,440],[680,440],[500,320],[400,300]]:[mnH,[880,480],[690,480],[470,385],[380,362]];
  poly(g,aff,'#42A5F5',5);poly(g,eff,'#EF5350',5);poly(g,effI,'#EF9A9A',3,{dash:'8 6'});
  [mnQ,mnH].forEach(p=>el('circle',{cx:p[0],cy:p[1],r:12,fill:'#E53935',stroke:'#fff','stroke-width':2},g));
  el('circle',{cx:inn[0],cy:inn[1],r:9,fill:'#AB47BC',stroke:'#fff','stroke-width':2},g);poly(g,[aff[aff.length-1],inn,W?mnQ:mnH],'#CE93D8',3,{arrow:true});
  if(W){poly(g,[inn,[cx+80,cy+10],[cx+110,cy+60]],'#CE93D8',3,{arrow:true});el('circle',{cx:cx+115,cy:cy+65,r:11,fill:'#E53935',stroke:'#fff','stroke-width':2},g);poly(g,[[cx+115,cy+65],[cx+230,cy+150],[cx+260,cy+240]],'#EF5350',4,{arrow:true});txt(g,T(U('qarama-qarshi oyoqning yozuvchilariga','to opposite-leg extensors')),cx+260,cy+275,{size:16,color:'ink',weight:700})}
  const sA=dot(g,'#64B5F6',10),sE=dot(g,'#FF8A80',10),sI=dot(g,'#CE93D8',8);
  // right panel: latency calculation
  const v=it.velocity||(W?20:75),len=it.length||.65,syn=W?3:1;const lat=2*len/(W?v:75)*1000*(W?1:1)+syn*.8+5;
  const latT=W?len/v*1000+len/75*1000+syn*.8+5:2*len/v*1000+syn*.8+5;
  const st=steps(g,1240,170,W?[[0,U('Og‘riqli ta’sir (igna)','Painful stimulus (pin)')],[.1,U('Aδ-tola, ~20 m/s','Aδ fibre, ~20 m/s')],[.38,U('2–3 ta oraliq neyron (polisinaptik)','2–3 interneurons (polysynaptic)')],[.5,U('Bukuvchilar qisqaradi, yozuvchilar tormozlanadi','Flexors contract, extensors inhibited')],[.75,U('Oyoq tortib olinadi','Limb withdrawn')]]:[[0,U('Bolg‘acha tizza paylarini uradi','Hammer taps the patellar tendon')],[.1,U('Mushak duki cho‘ziladi → Ia-tola','Spindle stretched → Ia fibre')],[.38,U('Bitta sinaps (monosinaptik)','Single synapse (monosynaptic)')],[.45,U('α-motoneyron → to‘rt boshli mushak','α-motor neuron → quadriceps')],[.62,U('Boldir oldinga siltanadi','Lower leg kicks forward')]],{size:26});
  lines(g,1240,250,W?[U(`Afferent Aδ: ${v} m/s · efferent Aα: 75 m/s`,`Afferent Aδ: ${v} m/s · efferent Aα: 75 m/s`),U(`Yo‘l uzunligi ≈ 2 × ${len} m`,`Path length ≈ 2 × ${len} m`),U(`Hisoblangan latentlik ≈ ${latT.toFixed(0)} ms (sinapslar ${syn} × 0,8 ms)`,`Computed latency ≈ ${latT.toFixed(0)} ms (synapses ${syn} × 0.8 ms)`),U('Kesishgan yozuvchi refleks muvozanatni saqlaydi','Crossed extensor keeps balance'),U('Refleks bosh miyasiz ham ishlaydi (orqa miya darajasi)','Works without the brain (spinal level)')]:[U(`Ia va Aα tolalar: ${v} m/s`,`Ia and Aα fibres: ${v} m/s`),U(`Yo‘l uzunligi ≈ 2 × ${len} m (L2–L4 segmentlar)`,`Path length ≈ 2 × ${len} m (segments L2–L4)`),U(`Hisoblangan latentlik ≈ ${latT.toFixed(0)} ms (o‘lchangan ~20–25 ms)`,`Computed latency ≈ ${latT.toFixed(0)} ms (measured ~20–25 ms)`),U('Reflekslarning yo‘qligi yoki kuchayishi — nevrologik belgi','Absent or brisk reflex — neurological sign'),U('Antagonistlar o‘zaro tormozlanadi (Sherrington)','Reciprocal inhibition of antagonists (Sherrington)')],{size:22,dy:38});
  const gL=el('g',{},g);const eL=el('text',{x:1240,y:500,'font-size':24,'font-weight':800,fill:TH.ink},gL);
  Object.assign(A,W?{rf_noc:()=>[rec[0],rec[1]],rf_drg:drg,rf_syn:[955,300],rf_in:inn,rf_mn:mnH,rf_f:[380,362],rf_x:[cx+260,cy+240]}:{rf_sp:rec,rf_drg:drg,rf_syn:[955,370],rf_mn:mnQ,rf_in:inn,rf_q:[300,290],rf_h:[300,372]});
  const aK=Object.keys(A);
  return {anchors:A,core:aK,coreSchool:W?['rf_noc','rf_drg','rf_in','rf_f']:['rf_sp','rf_drg','rf_mn','rf_q'],labelLayout:'tb',update(lt,p,st0){const u=(((lt-st0-.3)/TT)%1+1)%1;st(u);
    const hit=prog(u,0,.1);
    if(W){at(ham2,{opacity:0});at(pin,{transform:`translate(${rec[0]} ${f2(rec[1]-70+30*E.inOutCubic(hit)-40*prog(u,.12,.2))})`});}else{at(pin,{opacity:0});const a=lerp(-50,0,E.inCubic(hit))+(-50)*prog(u,.12,.3);at(ham2,{transform:`translate(640 390) rotate(${f2(a+40)} 0 0) translate(0 0)`})}
    const qa=prog(u,.1,.38),qe=prog(u,.42,.6);const [ax,ay]=along(aff,qa);const [ex,ey]=along(eff,qe);const [ix,iy]=along(effI,qe);
    at(sA,{cx:f2(ax),cy:f2(ay),opacity:qa>0&&qa<1?1:0});at(sE,{cx:f2(ex),cy:f2(ey),opacity:qe>0&&qe<1?1:0});at(sI,{cx:f2(ix),cy:f2(iy),opacity:qe>0&&qe<1?.6:0});
    const c=Math.sin(Math.PI*prog(u,.58,.9));const ang=W?-c*0:-c*38,kneeFlex=W?c*35:0;
    at(sh,{transform:`translate(${kn[0]} ${kn[1]}) rotate(${f2(ang+kneeFlex)})`});
    at(W?ham:quad,{ry:f2(W?20+8*c:22+9*c),fill:c>.05?'#D32F2F':'#E57373'});at(W?quad:ham,{ry:f2(W?22-4*c:20-4*c)});
    eL.textContent=T(U(`t = ${(u*latT*1.6).toFixed(0)} ms`,`t = ${(u*latT*1.6).toFixed(0)} ms`))}}});
/* ---------- circulation: pulmonary + systemic circuits, pressures (mmHg), SaO2, blood volume distribution (Guyton) ---------- */
KIT.names(NAMES.uz,{ci_ra:'O‘ng bo‘lmacha (2–6 mmHg)',ci_rv:'O‘ng qorincha (25/4 mmHg)',ci_pa:'O‘pka arteriyasi (25/10) — vena qoni',ci_lu:'O‘pka kapillyarlari: gaz almashinuvi',ci_pv:'O‘pka venalari — arterial qon (SaO₂ ~98%)',ci_la:'Chap bo‘lmacha (8–10 mmHg)',ci_lv:'Chap qorincha (120/8 mmHg)',ci_ao:'Aorta (120/80 mmHg)',ci_ti:'To‘qima kapillyarlari: O₂ beriladi',ci_vc:'Kovak venalar — vena qoni (SvO₂ ~75%)'});
KIT.names(NAMES.en,{ci_ra:'Right atrium (2–6 mmHg)',ci_rv:'Right ventricle (25/4 mmHg)',ci_pa:'Pulmonary artery (25/10) — venous blood',ci_lu:'Pulmonary capillaries: gas exchange',ci_pv:'Pulmonary veins — arterial blood (SaO₂ ~98%)',ci_la:'Left atrium (8–10 mmHg)',ci_lv:'Left ventricle (120/8 mmHg)',ci_ao:'Aorta (120/80 mmHg)',ci_ti:'Tissue capillaries: O₂ delivered',ci_vc:'Venae cavae — venous blood (SvO₂ ~75%)'});
SM.items.circulation=preset(1700,900,(g,it)=>{const A={},TT=it.cycle||10;const BL='#5C6BC0',RD='#E53935';
  const HR=it.HR||70,SV=it.SV||70,CO=HR*SV/1000;
  // lungs (top) and body (bottom)
  [[640,140],[880,140]].forEach(([x,y])=>{el('ellipse',{cx:x,cy:y,rx:110,ry:70,fill:'#F48FB1',opacity:.35,stroke:'#F48FB1','stroke-width':3},g);for(let i=0;i<5;i++)el('path',{d:`M${x-90},${y-40+i*20} Q${x},${y-60+i*20} ${x+90},${y-40+i*20}`,stroke:'#EC407A',fill:'none','stroke-width':1.5,opacity:.6},g)});
  txt(g,T(U('O‘PKALAR (kichik doira)','LUNGS (pulmonary circuit)')),760,60,{size:20,color:'ink',weight:800});
  el('rect',{x:540,y:730,width:440,height:120,rx:24,fill:'#FFCCBC',opacity:.25,stroke:'#FF8A65','stroke-width':3},g);for(let i=0;i<9;i++)el('path',{d:`M${560+i*48},750 q20,40 0,80`,stroke:'#FF7043',fill:'none','stroke-width':2,opacity:.6},g);
  txt(g,T(U('TANA A’ZOLARI (katta doira)','BODY ORGANS (systemic circuit)')),760,880,{size:20,color:'ink',weight:800});
  // heart chambers
  const ch=[['RA',660,390,BL],['RV',660,520,BL],['LA',860,390,RD],['LV',860,520,RD]];const CH={};
  ch.forEach(([n,x,y,c])=>{CH[n]=el('rect',{x:x-75,y:y-55,width:150,height:110,rx:20,fill:c,opacity:.55,stroke:c,'stroke-width':3},g);txt(g,n==='RA'?T(U('O‘B','RA')):n==='RV'?T(U('O‘Q','RV')):n==='LA'?T(U('ChB','LA')):T(U('ChQ','LV')),x,y+8,{size:24,color:'#fff',weight:800})});
  el('line',{x1:760,y1:330,x2:760,y2:590,stroke:'#ECEFF1','stroke-width':6},g);
  // loop: RV → PA → lungs → PV → LA → LV → Ao → body → VC → RA → RV
  const P=[[660,520],[540,520],[540,140],[640,140],[880,140],[980,140],[980,390],[860,390],[860,520],[1000,520],[1000,790],[760,790],[520,790],[520,580],[600,470],[660,390],[660,520]];
  const segCol=i=>(i>=4&&i<=10)?RD:BL;
  for(let i=0;i<P.length-1;i++)el('line',{x1:P[i][0],y1:P[i][1],x2:P[i+1][0],y2:P[i+1][1],stroke:segCol(i),'stroke-width':14,opacity:.45,'stroke-linecap':'round'},g);
  const N=46;const dots=[...Array(N)].map(()=>dot(g,BL,8));
  // right panel
  ttl(g,U('Yurak minutlik hajmi','Cardiac output'),1150,200);txt(g,`CO = HR × SV = ${HR} × ${SV} mL = ${CO.toFixed(1)} L/min`,1150,240,{size:26,color:"#FFCA28",weight:800,anchor:'start'});
  const bv=it.volume||5;txt(g,T(U(`Qon hajmi ${bv} L → to‘liq aylanish ≈ ${(bv/CO*60).toFixed(0)} s`,`Blood volume ${bv} L → full circuit ≈ ${(bv/CO*60).toFixed(0)} s`)),1150,276,{size:22,color:"ink",weight:700,anchor:"start"});
  const dist=[[U('venalar','veins'),64,BL],[U('arteriyalar','arteries'),13,RD],[U('arteriola+kapillyar','arterioles+capillaries'),7,'#FF8A65'],[U('yurak','heart'),7,'#AB47BC'],[U('o‘pka doirasi','pulmonary'),9,'#F48FB1']];
  ttl(g,U('Qonning taqsimlanishi (Guyton)','Blood distribution (Guyton)'),1150,340,{size:20});dist.forEach(([l,v,c],i)=>{const y=370+i*40;el('rect',{x:1150,y,width:v*5,height:26,rx:6,fill:c,opacity:.8},g);txt(g,`${v}% — ${T(l)}`,1160+v*5,y+20,{size:21,color:'ink',weight:700,anchor:'start'})});
  lines(g,1150,600,[U('Ikkala qorincha bir xil hajm haydaydi, bosim esa 5 marta farq qiladi','Both ventricles eject equal volumes; pressures differ ~5×'),U('Kichik doira qarshiligi katta doiradan ~10 marta past','Pulmonary resistance ~10× lower than systemic'),U('O‘pka arteriyasida vena qoni, o‘pka venalarida arterial qon','Pulmonary artery carries venous blood, pulmonary veins arterial')],{size:21,dy:30});
  Object.assign(A,{ci_ra:[600,390],ci_rv:[600,540],ci_pa:[540,300],ci_lu:[640,170],ci_pv:[980,260],ci_la:[920,390],ci_lv:[920,540],ci_ao:[1000,650],ci_ti:[760,790],ci_vc:[520,690]});
  return {anchors:A,core:Object.keys(A),coreSchool:['ci_rv','ci_lu','ci_lv','ci_ti','ci_pa'],labelLayout:'tb',update(lt,p,st0){const u=((lt-st0)/TT)%1;
    dots.forEach((d,i)=>{const q=((i/N+u)%1);const [x,y,si]=along(P,q);at(d,{cx:f2(x),cy:f2(y),fill:segCol(si)})});
    const beat=(lt*HR/60)%1;const sys=beat<.35;at(CH.RV,{opacity:sys?.85:.5});at(CH.LV,{opacity:sys?.85:.5});at(CH.RA,{opacity:!sys?.85:.5});at(CH.LA,{opacity:!sys?.85:.5})}}});
/* ---------- endocrine: negative feedback axes — thyroid (HPT), cortisol (HPA, circadian), glucose (insulin) ---------- */
KIT.names(NAMES.uz,{et_h:'Gipotalamus: TRG (tireoliberin)',et_p:'Gipofiz oldingi bo‘lagi: TTG (TSH)',et_g:'Qalqonsimon bez: T₄ va T₃',et_t:'Nishon to‘qimalar: metabolizm, issiqlik ↑',et_f:'Manfiy teskari aloqa (T₄/T₃ → TTG ↓)',et_c:'TTG–FT₄ log-chiziqli bog‘liqligi',
 ec_h:'Gipotalamus: KRG (CRH)',ec_p:'Gipofiz: AKTG (ACTH)',ec_g:'Buyrak usti bezi po‘stlog‘i: kortizol',ec_t:'Nishonlar: glyukoza ↑, yallig‘lanish ↓',ec_f:'Kortizol → KRG va AKTG ↓',ec_c:'Kortizolning sutkalik ritmi (cho‘qqi ~8:00)',
 eg_h:'Qonda glyukoza ↑ (ovqatdan keyin)',eg_p:'β-hujayralar: insulin ajraladi',eg_g:'Jigar, mushak, yog‘: glyukoza qabul qilinadi (GLUT4)',eg_t:'Glyukoza me’yorga qaytadi; α-hujayralar: glyukagon',eg_f:'Glyukoza pasayishi insulin ajralishini kamaytiradi',eg_c:'Glyukoza va insulin egri chiziqlari (model)'});
KIT.names(NAMES.en,{et_h:'Hypothalamus: TRH',et_p:'Anterior pituitary: TSH',et_g:'Thyroid: T₄ and T₃',et_t:'Target tissues: metabolism, heat ↑',et_f:'Negative feedback (T₄/T₃ → TSH ↓)',et_c:'Log-linear TSH–FT₄ relation',
 ec_h:'Hypothalamus: CRH',ec_p:'Pituitary: ACTH',ec_g:'Adrenal cortex: cortisol',ec_t:'Targets: glucose ↑, inflammation ↓',ec_f:'Cortisol → CRH and ACTH ↓',ec_c:'Circadian cortisol rhythm (peak ~08:00)',
 eg_h:'Blood glucose ↑ (after a meal)',eg_p:'β cells: insulin released',eg_g:'Liver, muscle, fat take up glucose (GLUT4)',eg_t:'Glucose returns to normal; α cells: glucagon',eg_f:'Falling glucose reduces insulin secretion',eg_c:'Glucose and insulin curves (model)'});
SM.items.endocrine=preset(1700,900,(g,it)=>{const k=kindOf(it,'endocrine',['thyroid','cortisol','glucose']);const A={},TT=it.cycle||12;const P=k[0]==='t'?'et':k==='cortisol'?'ec':'eg';
  const C={thyroid:['#4FC3F7','#81C784','#FFB74D','#E57373'],cortisol:['#4FC3F7','#81C784','#FFD54F','#E57373'],glucose:['#FFB74D','#64B5F6','#81C784','#A5D6A7']}[k];
  const L={thyroid:[U('Gipotalamus','Hypothalamus'),U('Gipofiz','Pituitary'),U('Qalqonsimon bez','Thyroid'),U('To‘qimalar','Tissues')],cortisol:[U('Gipotalamus','Hypothalamus'),U('Gipofiz','Pituitary'),U('Buyrak usti bezi','Adrenal cortex'),U('To‘qimalar','Tissues')],glucose:[U('Glyukoza ↑','Glucose ↑'),U('Oshqozon osti bezi','Pancreas'),U('Jigar · mushak · yog‘','Liver · muscle · fat'),U('Glyukoza ↓','Glucose ↓')]}[k];
  const H={thyroid:['TRG','TTG','T₄ / T₃'],cortisol:['KRG','AKTG',U('kortizol','cortisol')],glucose:[U('glyukoza','glucose'),U('insulin','insulin'),U('qabul','uptake')]}[k];
  const bx=360,ys=[170,350,530,710];const B=ys.map((y,i)=>box(g,bx,y,320,90,T(L[i]),C[i],{size:22}));
  const pulses=[];for(let i=0;i<3;i++){arw(g,[bx,ys[i]+48],[bx,ys[i+1]-50],C[i],5);txt(g,typeof H[i]==='string'?H[i]:T(H[i]),bx+20,(ys[i]+ys[i+1])/2+8,{size:20,color:C[i],weight:800,anchor:'start'});pulses.push(dot(g,C[i],9))}
  const fb1=el('path',{d:`M${bx-160},${ys[2]} C${bx-280},${ys[2]} ${bx-280},${ys[1]} ${bx-165},${ys[1]}`,stroke:'#EF5350','stroke-width':4,fill:'none','stroke-dasharray':'10 8','marker-end':arrowMarker('#EF5350')},g);
  if(k!=='glucose')el('path',{d:`M${bx-160},${ys[2]+20} C${bx-330},${ys[2]} ${bx-330},${ys[0]} ${bx-165},${ys[0]}`,stroke:'#EF5350','stroke-width':4,fill:'none','stroke-dasharray':'10 8','marker-end':arrowMarker('#EF5350')},g);
  txt(g,'−',bx-300,ys[1]+60,{size:44,color:'#EF5350',weight:900});
  // chart (right)
  let ax,cur,mk=[],rd;const CX=820,CY=170,CW=760,CH=420;
  if(k==='thyroid'){ax=axes(g,CX,CY,CW,CH,{x:[5,40],y:[.01,100],ylog:true,xt:[5,10,15,20,25,30,35,40],yt:[.01,.1,1,10,100],xl:U('erkin T₄, pmol/L','free T₄, pmol/L'),yl:U('TTG, mIU/L (log)','TSH, mIU/L (log)')});
    const f=x=>1.5*Math.pow(10,-(x-16)/6.5);el('rect',{x:ax.px(12),y:ax.py(4),width:ax.px(22)-ax.px(12),height:ax.py(.4)-ax.py(4),fill:'#81C784',opacity:.18},g);
    el('path',{d:pth(x=>[ax.px(x),ax.py(Math.min(100,Math.max(.01,f(x))))],5,40,200),stroke:'#4FC3F7','stroke-width':4,fill:'none'},g);
    const S=[[16,f(16),U('eutireoz','euthyroid'),'#81C784'],[8,f(8),U('birlamchi gipotireoz','primary hypothyroidism'),'#FFB74D'],[34,.02,U('gipertireoz (Bazedov)','hyperthyroidism (Graves)'),'#E57373'],[8,.8,U('ikkilamchi (gipofizar)','secondary (pituitary)'),'#BA68C8']];
    S.forEach(([x,y,l,c])=>{el('circle',{cx:ax.px(x),cy:ax.py(y),r:9,fill:c},g);txt(g,T(l),ax.px(x)+14,ax.py(y)-12,{size:17,color:c,weight:800,anchor:'start'})});mk=S;cur=dot(g,'#fff',11);
    lines(g,CX,CY+CH+90,[U('Me’yor: TTG 0,4–4,0 mIU/L, erkin T₄ 12–22 pmol/L','Normal: TSH 0.4–4.0 mIU/L, free T₄ 12–22 pmol/L'),U('FT₄ 2 marta pasaysa, TTG ~100 marta oshadi (log-chiziqli)','FT₄ halves → TSH rises ~100-fold (log-linear)'),U('T₃ ning ~80% i to‘qimalarda T₄ dan deyodinaza orqali hosil bo‘ladi','~80% of T₃ comes from T₄ via deiodinases in tissues')],{size:18,dy:30})}
  else if(k==='cortisol'){ax=axes(g,CX,CY,CW,CH,{x:[0,24],y:[0,700],xt:[0,4,8,12,16,20,24],yt:[0,140,350,550,700],xl:U('sutka soati','hour of day'),yl:U('kortizol, nmol/L','cortisol, nmol/L')});
    const f=h=>50+450*Math.exp(-Math.pow((h-8.5)/(h<8.5?2.2:5.2),2));el('rect',{x:ax.px(6),y:ax.py(690),width:ax.px(10)-ax.px(6),height:ax.py(140)-ax.py(690),fill:'#81C784',opacity:.15},g);txt(g,T(U('ertalabki me’yor 140–690','morning range 140–690')),ax.px(10.3),ax.py(660),{size:16,color:'#81C784',weight:700,anchor:'start'});
    el('path',{d:pth(h=>[ax.px(h),ax.py(f(h))],0,24,240),stroke:'#FFD54F','stroke-width':4,fill:'none'},g);mk=f;cur=dot(g,'#fff',11);
    lines(g,CX,CY+CH+90,[U('Yarim tunda eng past (<50 nmol/L); stressda AKTG va kortizol tez oshadi','Lowest at midnight (<50 nmol/L); stress raises ACTH and cortisol fast'),U('Kushing sindromi: ritm yo‘qoladi, kechki kortizol yuqori','Cushing’s: rhythm lost, late-night cortisol high'),U('Addison kasalligi: kortizol ↓, AKTG ↑ (teri qorayishi)','Addison’s: cortisol ↓, ACTH ↑ (skin darkening)')],{size:18,dy:30})}
  else{const dm=!!it.diabetes;const Gb=dm?7.5:5,k2=dm?.00012:.0005,s=dm?.35:1.2,Aa=dm?14:13;let G=Gb,I=8;const D=[];for(let t=0;t<=240;t+=.5){D.push([t,G,I]);const Ra=Aa*t/900*Math.exp(-t/30);const dG=Ra-.01*(G-Gb)-k2*Math.max(0,I-8)*G;const dI=-.05*(I-8)+s*Math.max(0,G-Gb);G+=dG*.5;I+=dI*.5}
    ax=axes(g,CX,CY,CW,CH,{x:[0,240],y:[0,14],xt:[0,30,60,90,120,180,240],yt:[0,4,7.8,11.1,14],xl:U('ovqatdan keyin, daqiqa','minutes after meal'),yl:U('glyukoza, mmol/L','glucose, mmol/L')});
    [[7.8,'#FFB74D'],[11.1,'#E57373']].forEach(([v,c])=>el('line',{x1:CX,y1:ax.py(v),x2:CX+CW,y2:ax.py(v),stroke:c,'stroke-width':2,'stroke-dasharray':'8 6'},g));
    el('path',{d:pth(i=>[ax.px(D[i][0]),ax.py(D[i][1])],0,D.length-1,D.length-1).replace(/(\.\d)\d+/g,'$1'),stroke:'#FFB74D','stroke-width':4,fill:'none'},g);el('path',{d:pth(i=>[ax.px(D[i][0]),ax.py(D[i][2]/6)],0,D.length-1,D.length-1),stroke:'#64B5F6','stroke-width':3,fill:'none','stroke-dasharray':'2 0'},g);
    const pk=D.reduce((a,b)=>b[1]>a[1]?b:a),g2=D.find(d=>d[0]===120);txt(g,T(U('insulin (÷6, µU/mL)','insulin (÷6, µU/mL)')),ax.px(150),ax.py(D[300][2]/6)-12,{size:16,color:'#64B5F6',weight:800,anchor:'start'});
    mk=D;cur=dot(g,'#fff',11);
    lines(g,CX,CY+CH+90,[U(`Model: cho‘qqi ${pk[1].toFixed(1)} mmol/L (${pk[0].toFixed(0)}-daqiqa), 2 soatda ${g2[1].toFixed(1)} mmol/L`,`Model: peak ${pk[1].toFixed(1)} mmol/L (min ${pk[0].toFixed(0)}), 2 h value ${g2[1].toFixed(1)} mmol/L`),U(dm?'2-tip diabet (insulinga rezistentlik): 2 soatda ≥11,1 mmol/L':'Me’yor: och qoringa 3,9–5,5; 2 soatda <7,8 mmol/L',dm?'Type 2 diabetes (insulin resistance): 2 h ≥11.1 mmol/L':'Normal: fasting 3.9–5.5; 2 h <7.8 mmol/L'),U('Glyukagon (α-hujayralar) och qolganda glikogenolizni kuchaytiradi','Glucagon (α cells) drives glycogenolysis when fasting')],{size:18,dy:30})}
  const sts=steps(g,CX,CY-50,k==='thyroid'?[[0,U('Eutireoz → gipotireoz → gipertireoz → ikkilamchi','Euthyroid → hypo → hyper → secondary')]]:k==='cortisol'?[[0,U('Sutkalik ritm: tunda past, ertalab cho‘qqi','Daily rhythm: low at night, morning peak')]]:[[0,U(it.diabetes?'Ovqatdan keyin: 2-tip diabet':'Ovqatdan keyin: sog‘lom odam',it.diabetes?'After a meal: type 2 diabetes':'After a meal: healthy person')]],{size:22});
  Object.assign(A,{[P+'_h']:[bx+160,ys[0]],[P+'_p']:[bx+160,ys[1]],[P+'_g']:[bx+160,ys[2]],[P+'_t']:[bx+160,ys[3]],[P+'_f']:[bx-265,(ys[1]+ys[2])/2],[P+'_c']:[CX+CW*.5,CY+CH*.3]});
  return {anchors:A,core:Object.keys(A),coreSchool:[P+'_h',P+'_p',P+'_g',P+'_f'],labelLayout:'tb',update(lt,p,st0){const u=(((lt-st0)/TT)%1+1)%1;sts(u);
    pulses.forEach((d,i)=>{const q=((u*3-i*.33)%1+1)%1;at(d,{cx:bx,cy:f2(lerp(ys[i]+50,ys[i+1]-52,q)),opacity:.95})});
    B.forEach((b,i)=>lit(b,Math.floor(u*4)%4===i));
    if(k==='thyroid'){const i=Math.floor(u*4)%4,j=(i+1)%4,q=E.inOutCubic(prog((u*4)%1,.6,1));const x=lerp(mk[i][0],mk[j][0],q),y=Math.exp(lerp(Math.log(mk[i][1]),Math.log(mk[j][1]),q));at(cur,{cx:f2(ax.px(x)),cy:f2(ax.py(y))})}
    else if(k==='cortisol'){const h=u*24;at(cur,{cx:f2(ax.px(h)),cy:f2(ax.py(mk(h)))})}
    else{const i=Math.min(mk.length-1,Math.floor(u*mk.length));at(cur,{cx:f2(ax.px(mk[i][0])),cy:f2(ax.py(mk[i][1]))})}}}});
/* ---------- breathing: mechanics (diaphragm, pleural/alveolar pressure, volume — Guyton) and spirogram (lung volumes) ---------- */
KIT.names(NAMES.uz,{br_d:'Diafragma: qisqarib pastga tushadi (nafas olish)',br_r:'Qovurg‘alararo tashqi mushaklar ko‘krakni kengaytiradi',br_pl:'Plevra bo‘shlig‘i: bosim −5 → −7,5 sm H₂O',br_al:'Alveolalar: bosim −1 sm H₂O → havo kiradi',br_ch:'Hajm, alveolyar va plevral bosim grafigi',br_tr:'Traxeya',
 sp_tv:'Nafas hajmi (TV) ~500 mL',sp_irv:'Nafas olish zaxira hajmi ~3000 mL',sp_erv:'Nafas chiqarish zaxira hajmi ~1100 mL',sp_rv:'Qoldiq hajm ~1200 mL (spirometrda ko‘rinmaydi)',sp_vc:'O‘pkaning tiriklik sig‘imi ~4600 mL',sp_tlc:'O‘pkaning umumiy sig‘imi ~5800 mL'});
KIT.names(NAMES.en,{br_d:'Diaphragm contracts and descends (inspiration)',br_r:'External intercostals expand the chest',br_pl:'Pleural space: pressure −5 → −7.5 cm H₂O',br_al:'Alveoli: pressure −1 cm H₂O → air flows in',br_ch:'Volume, alveolar and pleural pressure',br_tr:'Trachea',
 sp_tv:'Tidal volume ~500 mL',sp_irv:'Inspiratory reserve ~3000 mL',sp_erv:'Expiratory reserve ~1100 mL',sp_rv:'Residual volume ~1200 mL (not on spirometer)',sp_vc:'Vital capacity ~4600 mL',sp_tlc:'Total lung capacity ~5800 mL'});
SM.items.breathing=preset(1700,900,(g,it)=>{const k=kindOf(it,'breathing',['mechanics','spirogram']);const A={};
  if(k==='spirogram'){const TV=it.TV||500,IRV=it.IRV||3000,ERV=it.ERV||1100,RV=it.RV||1200;const FRC=ERV+RV,TLC=RV+ERV+TV+IRV,VC=TLC-RV,IC=TV+IRV;
    const ax=axes(g,200,140,1000,640,{x:[0,40],y:[0,6000],xt:[0,10,20,30,40],yt:[0,1200,2300,2800,5800],xl:U('vaqt, s','time, s'),yl:U('o‘pkadagi hajm, mL','lung volume, mL')});
    const V=t=>t<12?FRC+TV/2*(1-Math.cos(2*Math.PI*t/4)):t<16?FRC+(IC)*(1-Math.cos(Math.PI*(t-12)/4))/2:t<20?TLC-(VC)*(1-Math.cos(Math.PI*(t-16)/4))/2:t<24?RV+ERV*(1-Math.cos(Math.PI*(t-20)/4))/2:FRC+TV/2*(1-Math.cos(2*Math.PI*(t-24)/4));
    const tr=el('path',{d:pth(t=>[ax.px(t),ax.py(V(t))],0,40,600),stroke:'#4FC3F7','stroke-width':4,fill:'none'},g);const Ln=tr.getTotalLength?1:1;at(tr,{'stroke-dasharray':'4000','stroke-dashoffset':'4000'});
    el('rect',{x:200,y:ax.py(RV),width:1000,height:ax.py(0)-ax.py(RV),fill:'#90A4AE',opacity:.18},g);
    const br=(x,a,b,l,c)=>{el('path',{d:`M${x},${ax.py(a)} h-12 V${ax.py(b)} h12`,stroke:c,'stroke-width':3,fill:'none'},g);txt(g,`${l} ${b-a}`,x+12,(ax.py(a)+ax.py(b))/2+6,{size:17,color:c,weight:800,anchor:'start'})};
    br(1250,FRC+TV,TLC,'IRV','#81C784');br(1250,FRC,FRC+TV,'TV','#4FC3F7');br(1250,RV,FRC,'ERV','#FFB74D');br(1250,0,RV,'RV','#90A4AE');br(1420,RV,TLC,'VC','#BA68C8');br(1560,0,TLC,'TLC','#E57373');br(1420,0,FRC,'FRC','#FFCA28');
    const pen=dot(g,'#fff',9);
    lines(g,200,860,[U(`Hisoblangan: VC = TV + IRV + ERV = ${VC} mL; FRC = ERV + RV = ${FRC} mL; TLC = ${TLC} mL (yosh erkak, Guyton)`,`Computed: VC = TV + IRV + ERV = ${VC} mL; FRC = ERV + RV = ${FRC} mL; TLC = ${TLC} mL (young man, Guyton)`)],{size:18});
    Object.assign(A,{sp_tv:[ax.px(6),ax.py(FRC+TV)],sp_irv:[ax.px(14),ax.py(FRC+TV+IRV*.7)],sp_erv:[ax.px(21),ax.py(RV+ERV*.4)],sp_rv:[ax.px(32),ax.py(RV*.5)],sp_vc:[1420,ax.py((RV+TLC)/2)],sp_tlc:[1560,ax.py(TLC*.75)]});
    return {anchors:A,core:Object.keys(A),coreSchool:['sp_tv','sp_vc','sp_rv','sp_tlc'],labelLayout:'tb',update(lt,p,st0){const q=Math.min(1,Math.max(0,(lt-st0-.3)/(it.draw||12)));at(tr,{'stroke-dashoffset':f2(4000*(1-q))});const t=q*40;at(pen,{cx:f2(ax.px(t)),cy:f2(ax.py(V(t)))})}}}
  // mechanics
  const TT=it.cycle||5,Ti=2;const cx=480,cy=470;
  const Vf=t=>t<Ti?.25*(1-Math.cos(Math.PI*t/Ti)):.25*(1+Math.cos(Math.PI*(t-Ti)/(TT-Ti)));const Vt=t=>2*Vf(t);
  const dV=t=>(Vt(t+.01)-Vt(t-.01))/.02;const Palv=t=>-dV(t)*2.55,Ppl=t=>-5-2.5*Vf(t)/.5*2-.4*dV(t);
  const ribs=el('g',{},g);const rr=[...Array(6)].map((_,i)=>el('path',{fill:'none',stroke:'#ECEFF1','stroke-width':6,opacity:.7},ribs));
  const plL=el('path',{fill:'#F48FB1',opacity:.18,stroke:'#90CAF9','stroke-width':3},g),plR=el('path',{fill:'#F48FB1',opacity:.18,stroke:'#90CAF9','stroke-width':3},g);
  const luL=el('path',{fill:'#F48FB1',opacity:.75,stroke:'#AD1457','stroke-width':3},g),luR=el('path',{fill:'#F48FB1',opacity:.75,stroke:'#AD1457','stroke-width':3},g);
  el('rect',{x:cx-14,y:120,width:28,height:170,rx:10,fill:'#B0BEC5'},g);el('path',{d:`M${cx},280 L${cx-80},340 M${cx},280 L${cx+80},340`,stroke:'#B0BEC5','stroke-width':16,'stroke-linecap':'round'},g);
  const dia=el('path',{fill:'none',stroke:'#E57373','stroke-width':12,'stroke-linecap':'round'},g);
  const air=[...Array(10)].map(()=>dot(g,'#B3E5FC',6));
  const ax=axes(g,980,150,620,170,{x:[0,TT],y:[0,.6],xt:[0,1,2,3,4,5],yt:[0,.5],yl:U('hajm o‘zgarishi, L','volume change, L')});
  const ax2=axes(g,980,400,620,130,{x:[0,TT],y:[-1.2,1.2],xt:[],yt:[-1,0,1],yl:U('alveolyar bosim, sm H₂O','alveolar pressure, cm H₂O')});
  const ax3=axes(g,980,630,620,130,{x:[0,TT],y:[-8,-4.5],xt:[0,1,2,3,4,5],yt:[-7.5,-5],yl:U('plevral bosim, sm H₂O','pleural pressure, cm H₂O'),xl:U('vaqt, s','time, s')});
  [[ax,Vt,'#4FC3F7'],[ax2,Palv,'#81C784'],[ax3,Ppl,'#FFB74D']].forEach(([a,f,c])=>el('path',{d:pth(t=>[a.px(t),a.py(f(t))],0,TT,200),stroke:c,'stroke-width':4,fill:'none'},g));
  const cur=[ax,ax2,ax3].map(()=>el('line',{stroke:'#fff','stroke-width':2,opacity:.7},g));
  const sts=steps(g,cx-300,830,[[0,U('Nafas olish: diafragma qisqaradi (aktiv)','Inspiration: diaphragm contracts (active)')],[Ti/TT,U('Nafas chiqarish: o‘pka elastikligi (passiv)','Expiration: lung recoil (passive)')]],{size:22});
  lines(g,980,870,[U('Tinch nafas: ~12–16 marta/daq × 500 mL ≈ 6–8 L/daq','Quiet breathing: ~12–16/min × 500 mL ≈ 6–8 L/min')],{size:17});
  const lung=(s,e)=>{const w=150*e,h=260*e;const x0=cx+s*40;return `M${x0},${300} C${x0+s*w*.9},${300-20} ${x0+s*w*1.15},${470} ${x0+s*w},${300+h} C${x0+s*w*.6},${310+h} ${x0+s*20},${300+h*.95} ${x0},${300+h*.8} Z`};
  Object.assign(A,{br_tr:[cx,180],br_d:()=>[cx+150,dyN],br_r:[cx-245,420],br_pl:[cx-200,330],br_al:[cx+120,450],br_ch:[1290,240]});let dyN=640;
  return {anchors:A,core:Object.keys(A),coreSchool:['br_d','br_r','br_al','br_ch'],labelLayout:'tb',update(lt,p,st0){const t=(((lt-st0)%TT)+TT)%TT;sts(t/TT);const v=Vf(t)/.25;
    const ex=1+.06*v;rr.forEach((r,i)=>{const y=330+i*55,w=(200+i*14)*ex;at(r,{d:`M${cx-30},${y-10} C${cx-w},${y-30-8*v} ${cx-w},${y+40} ${cx-w*.6},${y+60} M${cx+30},${y-10} C${cx+w},${y-30-8*v} ${cx+w},${y+40} ${cx+w*.6},${y+60}`})});
    const e=.98+.1*v;at(plL,{d:lung(-1,e+.06)});at(plR,{d:lung(1,e+.06)});at(luL,{d:lung(-1,e)});at(luR,{d:lung(1,e)});
    const dy=600+60*v;dyN=dy;at(dia,{d:`M${cx-250*ex},${dy+70} Q${cx-130},${dy-60} ${cx},${dy-30} Q${cx+130},${dy-60} ${cx+250*ex},${dy+70}`});
    const fl=dV(t);air.forEach((a,i)=>{const ph=((lt*1.2+i/10)%1);const y=fl>0?lerp(110,330,ph):lerp(330,110,ph);at(a,{cx:cx+(i%2?6:-6),cy:f2(y),opacity:f2(Math.min(1,Math.abs(fl)*1.2))})});
    [[ax,0,.6],[ax2,-1.2,1.2],[ax3,-8,-4.5]].forEach(([a,y0,y1],i)=>at(cur[i],{x1:f2(a.px(t)),x2:f2(a.px(t)),y1:f2(a.py(y1)),y2:f2(a.py(y0))}))}}});
/* ---------- autonomic: sympathetic (thoracolumbar, T1–L2) vs parasympathetic (craniosacral) — neurons, transmitters, organ effects ---------- */
KIT.names(NAMES.uz,{an_sc:'Orqa miya: T1–L2 — simpatik markazlar',an_bs:'Miya ustuni: III, VII, IX, X nervlar (parasimpatik)',an_s:'Dumg‘aza S2–S4 (parasimpatik)',an_ch:'Simpatik zanjir tugunlari (umurtqa yonida)',an_pre:'Preganglionar tola: ACh (N-xolinoretseptor)',an_post:'Postganglionar simpatik: noradrenalin (α, β)',an_pp:'Postganglionar parasimpatik: ACh (M-xolinoretseptor)',an_ad:'Buyrak usti bezi mag‘zi: adrenalin qonga',an_va:'Adashgan nerv (X) — parasimpatik tolalarning ~75%'});
KIT.names(NAMES.en,{an_sc:'Spinal cord T1–L2 — sympathetic centres',an_bs:'Brainstem: nerves III, VII, IX, X (parasympathetic)',an_s:'Sacral S2–S4 (parasympathetic)',an_ch:'Sympathetic chain ganglia (paravertebral)',an_pre:'Preganglionic fibre: ACh (nicotinic)',an_post:'Sympathetic postganglionic: noradrenaline (α, β)',an_pp:'Parasympathetic postganglionic: ACh (muscarinic)',an_ad:'Adrenal medulla: adrenaline into blood',an_va:'Vagus (X) — ~75% of parasympathetic fibres'});
SM.items.autonomic=preset(1700,900,(g,it)=>{const A={},TT=it.cycle||10;const mode=it.mode||'both';const SY='#EF5350',PA='#42A5F5';const sx=850;
  el('ellipse',{cx:sx,cy:110,rx:110,ry:60,fill:'#B39DDB',opacity:.5,stroke:'#9575CD','stroke-width':3},g);txt(g,T(U('bosh miya','brain')),sx,118,{size:18,color:'ink',weight:800});
  el('rect',{x:sx-24,y:165,width:48,height:640,rx:22,fill:'#D1C4E9',opacity:.55,stroke:'#9575CD','stroke-width':3},g);
  const segY=s=>{const m={C:[180,300],T:[300,620],L:[620,720],S:[720,800]};const [a,b]=m[s[0]];const n={C:8,T:12,L:5,S:5}[s[0]];return a+(b-a)*(+s.slice(1)-.5)/n};
  el('rect',{x:sx-24,y:segY('T1')-12,width:48,height:segY('L2')-segY('T1')+24,fill:SY,opacity:.45},g);el('rect',{x:sx-24,y:segY('S2')-10,width:48,height:segY('S4')-segY('S2')+20,fill:PA,opacity:.5},g);el('rect',{x:sx-24,y:150,width:48,height:30,fill:PA,opacity:.5},g);
  [['C1',U('bo‘yin','cervical')],['T1',U('ko‘krak','thoracic')],['L1',U('bel','lumbar')],['S1',U('dumg‘aza','sacral')]].forEach(([s,l])=>txt(g,T(l),sx,segY(s)+6,{size:14,color:'#311B92',weight:800}));
  const org=[[U('Ko‘z qorachig‘i','Pupil'),U('kengayadi','dilates'),U('toraytiradi','constricts'),'III'],[U('So‘lak bezlari','Salivary glands'),U('quyuq, kam','thick, scant'),U('suyuq, ko‘p','watery, profuse'),'VII, IX'],[U('Yurak','Heart'),U('urish ↑ (β1)','rate ↑ (β1)'),U('urish ↓','rate ↓'),'X'],[U('Bronxlar','Bronchi'),U('kengayadi (β2)','dilate (β2)'),U('torayadi','constrict'),'X'],[U('Oshqozon-ichak','Gut'),U('harakat ↓','motility ↓'),U('harakat ↑, sekretsiya ↑','motility ↑, secretion ↑'),'X'],[U('Siydik pufagi','Bladder'),U('bo‘shashadi (ushlab turish)','relaxes (retention)'),U('qisqaradi (siyish)','contracts (voiding)'),'S2–S4']];
  const oy=i=>180+i*120,LX=230,RX=1470;const sig=[];
  const chain=[];for(let i=0;i<10;i++){const y=segY('T1')+i*(segY('L2')-segY('T1'))/9;chain.push([sx-120,y]);el('circle',{cx:sx-120,cy:y,r:11,fill:'#FFCDD2',stroke:SY,'stroke-width':2},g)}poly(g,chain,SY,2,{op:.6});
  org.forEach(([n,s,p,nv],i)=>{const y=oy(i);[[LX,s,SY],[RX,p,PA]].forEach(([x,e,c])=>{el('rect',{x:x-110,y:y-40,width:220,height:80,rx:14,fill:'#0D1B2A',stroke:c,'stroke-width':3},g);txt(g,T(n),x,y-8,{size:19,color:'ink',weight:800});txt(g,T(e),x,y+22,{size:17,color:c,weight:700})});
    const sy=i===5?segY('L1'):Math.min(segY('L2'),Math.max(segY('T1'),segY('T1')+i*55));const gy=sy;const P1=[[sx-24,sy],[sx-120,gy]],P2=[[sx-120,gy],[LX+110,y]];if(mode!=='parasympathetic'){poly(g,P1,SY,3);poly(g,P2,SY,3,{dash:'10 6',arrow:true})}
    const src=i<4?[sx+24,i<2?170:200]:i<5?[sx+24,210]:[sx+24,segY('S3')];const gp=[RX-160,y];const P3=i===5?[src,[sx+120,src[1]],gp]:[src,[sx+90+i*14,src[1]],[sx+90+i*14,y],gp];const P4=[gp,[RX-110,y]];
    if(mode!=='sympathetic'){poly(g,P3,PA,3);el('circle',{cx:gp[0],cy:gp[1],r:9,fill:'#BBDEFB',stroke:PA,'stroke-width':2},g);poly(g,P4,PA,3,{dash:'10 6',arrow:true})}
    sig.push({a:[...P1,...P2.slice(1)],b:[...P3,...P4.slice(1)],da:dot(g,SY,8),db:dot(g,PA,8)})});
  const adr=[sx-260,segY('T10')+40];el('ellipse',{cx:adr[0],cy:adr[1],rx:45,ry:28,fill:'#FFE082',stroke:'#FFA000','stroke-width':3},g);poly(g,[[sx-24,segY('T9')],[sx-110,segY('T9')+20],[adr[0]+40,adr[1]]],SY,3,{arrow:true});
  txt(g,T(U('SIMPATIK — “jang yoki qoch”','SYMPATHETIC — “fight or flight”')),LX,90,{size:22,color:SY,weight:900});txt(g,T(U('PARASIMPATIK — “dam ol va hazm qil”','PARASYMPATHETIC — “rest and digest”')),RX,90,{size:22,color:PA,weight:900});
  lines(g,sx-230,870,[U('Simpatik: preganglionar qisqa, postganglionar uzun · Parasimpatik: aksincha','Sympathetic: short pre-, long postganglionic · Parasympathetic: the reverse')],{size:17});
  Object.assign(A,{an_sc:[sx+24,segY('T6')],an_bs:[sx+60,170],an_s:[sx+24,segY('S3')],an_ch:chain[5],an_pre:[sx-70,segY('T3')],an_post:[(sx-120+LX+110)/2,(segY('T3')+oy(2))/2],an_pp:[RX-135,oy(3)],an_ad:adr,an_va:[sx+90+2*14,oy(2)-40]});
  return {anchors:A,core:Object.keys(A),coreSchool:['an_sc','an_bs','an_ch','an_ad','an_va'],labelLayout:'tb',update(lt,p,st0){const u=(((lt-st0)/TT)%1+1)%1;
    sig.forEach((s,i)=>{const q=((u*2+i*.08)%1);const [x1,y1]=along(s.a,q),[x2,y2]=along(s.b,q);at(s.da,{cx:f2(x1),cy:f2(y1),opacity:mode==='parasympathetic'?0:1});at(s.db,{cx:f2(x2),cy:f2(y2),opacity:mode==='sympathetic'?0:1})})}}});
/* ---------- thermoreg: hypothalamic set point; cold / heat responses; fever (PGE2 raises set point) ---------- */
KIT.names(NAMES.uz,{th_hy:'Gipotalamus (preoptik soha): “termostat” 37 °C',th_sk:'Teri termoretseptorlari',th_v:'Teri tomirlari',th_e:'Effektor javob',th_c:'Tana harorati va belgilangan nuqta grafigi',th_py:'Pirogenlar (IL-1, IL-6) → PGE₂ → belgilangan nuqta ↑'});
KIT.names(NAMES.en,{th_hy:'Hypothalamus (preoptic area): “thermostat” 37 °C',th_sk:'Skin thermoreceptors',th_v:'Skin blood vessels',th_e:'Effector response',th_c:'Core temperature vs set point',th_py:'Pyrogens (IL-1, IL-6) → PGE₂ → set point ↑'});
SM.items.thermoreg=preset(1700,900,(g,it)=>{const k=kindOf(it,'thermoreg',['cold','heat','fever']);const A={},TT=it.cycle||12;const bx=420;
  // body
  el('circle',{cx:bx,cy:170,r:70,fill:'#F2C9A0',stroke:'#8D6E63','stroke-width':3},g);const body=el('path',{d:`M${bx-120},260 Q${bx},230 ${bx+120},260 L${bx+150},560 L${bx+90},560 L${bx+80},820 L${bx+10},820 L${bx},600 L${bx-10},820 L${bx-80},820 L${bx-90},560 L${bx-150},560 Z`,fill:'#F2C9A0',stroke:'#8D6E63','stroke-width':3},g);
  const hy=el('circle',{cx:bx,cy:165,r:18,fill:'#FFCA28',stroke:'#fff','stroke-width':2},g);
  const ves=[...Array(6)].map((_,i)=>el('path',{d:`M${bx-110+i*44},300 q12,120 -6,240`,stroke:'#E53935','stroke-width':4,fill:'none',opacity:.8},g));
  const drops=[...Array(14)].map(()=>el('path',{d:'M0,-9 Q7,2 0,8 Q-7,2 0,-9 Z',fill:'#4FC3F7',opacity:0},g));const shiv=[...Array(4)].map((_,i)=>el('path',{stroke:'#90CAF9','stroke-width':3,fill:'none',opacity:0},g));
  const env=it.env??(k==='cold'?5:k==='heat'?38:22);
  // ODE: core T relaxes to set point (body) with environment load
  const SP=t=>k==='fever'?(t<1?37:t<6?39:t<9?39:37):37;const D=[];let Tc=k==='fever'?37:37;const load=k==='cold'?-.9:k==='heat'?.9:0;
  for(let t=0;t<=12;t+=.02){D.push([t,Tc,SP(t)]);const er=SP(t)-Tc;const dT=.9*er+load*Math.exp(-t/2.5)*(.8);Tc+=dT*.02}
  const ax=axes(g,860,170,720,380,{x:[0,12],y:[35.5,40],xt:[0,2,4,6,8,10,12],yt:[36,37,38,39,40],xl:U(k==='fever'?'soat':'daqiqa ×10',k==='fever'?'hours':'minutes ×10'),yl:U('harorat, °C','temperature, °C')});
  el('path',{d:pth(i=>[ax.px(D[i][0]),ax.py(D[i][2])],0,D.length-1,D.length-1),stroke:'#FFCA28','stroke-width':3,fill:'none','stroke-dasharray':'10 6'},g);el('path',{d:pth(i=>[ax.px(D[i][0]),ax.py(D[i][1])],0,D.length-1,D.length-1),stroke:'#EF5350','stroke-width':4,fill:'none'},g);
  leg(g,860,620,[['#FFCA28',U('belgilangan nuqta (gipotalamus)','set point (hypothalamus)')],['#EF5350',U('tana ichki harorati','core temperature')]]);
  const sts=steps(g,860,120,k==='cold'?[[0,U(`Sovuq muhit (${env} °C): issiqlikni saqlash va hosil qilish`,`Cold (${env} °C): conserve and produce heat`)]]:k==='heat'?[[0,U(`Issiq muhit (${env} °C): issiqlik chiqarish`,`Heat (${env} °C): lose heat`)]]:[[0,U('Isitma: belgilangan nuqta ko‘tariladi','Fever: set point rises')],[1/12,U('Et uvishishi, titrash — harorat ko‘tariladi','Chills, shivering — temperature rises')],[6/12,U('Plato: harorat yangi nuqtada','Plateau at new set point')],[9/12,U('Nuqta tushadi: terlash, teri qizarishi','Set point falls: sweating, flushing')]],{size:22});
  lines(g,860,700,k==='cold'?[U('Teri tomirlari torayadi (simpatik, α1) — issiqlik yo‘qotish ↓','Skin vasoconstriction (sympathetic α1) — heat loss ↓'),U('Titrash: issiqlik hosil bo‘lishi 4–5 marta ↑','Shivering raises heat production 4–5×'),U('Qo‘ng‘ir yog‘ (chaqaloqlarda): UCP1 termogenezi','Brown fat (infants): UCP1 thermogenesis'),U('Gipotermiya: ichki harorat <35 °C','Hypothermia: core <35 °C')]:k==='heat'?[U('Teri tomirlari kengayadi — teri qon oqimi 8 L/daq gacha','Skin vasodilation — skin blood flow up to 8 L/min'),U('Ter: 1–2 L/soat; 1 L bug‘lanishi ≈ 2,4 MJ (~670 W·soat)','Sweat 1–2 L/h; evaporating 1 L ≈ 2.4 MJ (~670 W·h)'),U('Muhit > teri harorati bo‘lsa, faqat bug‘lanish ishlaydi','If air > skin temperature, only evaporation works'),U('Issiq urishi: ichki harorat >40 °C, terlash to‘xtaydi','Heat stroke: core >40 °C, sweating may stop')]:[U('Pirogenlar → COX-2 → PGE₂ → preoptik soha','Pyrogens → COX-2 → PGE₂ → preoptic area'),U('Paratsetamol/ibuprofen PGE₂ ni kamaytiradi','Paracetamol/ibuprofen lower PGE₂'),U('Isitma ≠ gipertermiya (unda nuqta o‘zgarmaydi)','Fever ≠ hyperthermia (set point unchanged)'),U('Isitma: ichki harorat >38 °C','Fever: core >38 °C')],{size:18,dy:30});
  const cur=dot(g,'#fff',10);const tv=el('text',{x:bx,y:880,'font-size':26,'font-weight':900,fill:TH.ink,'text-anchor':'middle'},g);
  Object.assign(A,{th_hy:[bx,165],th_sk:[bx+140,440],th_v:[bx-66,420],th_e:k==='heat'?[bx-100,520]:[bx+60,700],th_c:[ax.px(6),ax.py(39)]});if(k==='fever')A.th_py=[bx+50,120];
  return {anchors:A,core:Object.keys(A),coreSchool:['th_hy','th_v','th_e','th_c'],labelLayout:'tb',update(lt,p,st0){const u=(((lt-st0)/TT)%1+1)%1;sts(u);const i=Math.min(D.length-1,Math.floor(u*D.length));const [t,Tc,sp]=D[i];
    at(cur,{cx:f2(ax.px(t)),cy:f2(ax.py(Tc))});tv.textContent=`${Tc.toFixed(1)} °C`;
    const cold=k==='cold'||(k==='fever'&&Tc<sp-.3),hot=k==='heat'||(k==='fever'&&t>9&&Tc>sp+.2);
    ves.forEach(v=>at(v,{'stroke-width':cold?1.5:hot?7:4,opacity:cold?.4:.9}));at(body,{fill:hot?'#F4A98A':cold?'#E3D3C3':'#F2C9A0'});
    drops.forEach((d,j)=>{const ph=(lt*.6+j/14)%1;at(d,{transform:`translate(${f2(bx-120+(j*37)%240)} ${f2(300+ph*400)})`,opacity:hot?f2(1-ph):0})});
    shiv.forEach((s,j)=>{const x=j<2?bx-170:bx+170,y=320+(j%2)*140,w=Math.sin(lt*40)*6;at(s,{d:`M${x},${y} q${f2(w)},20 0,40 q${f2(-w)},20 0,40`,opacity:cold?.9:0})})}}});
/* ---------- acidbase: Henderson–Hasselbalch (pK 6.1, s 0.03), Davenport diagram, primary disorders + expected compensation ---------- */
KIT.names(NAMES.uz,{ab_eq:'Bikarbonat bufer: CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻',ab_lu:'O‘pka: pCO₂ ni boshqaradi (daqiqalar)',ab_ki:'Buyrak: HCO₃⁻ va H⁺ ni boshqaradi (kunlar)',ab_dv:'Davenport diagrammasi: pH – HCO₃⁻, pCO₂ izobaralari',ab_pt:'Bemorning holati (hisoblangan pH)',ab_n:'Me’yor: pH 7,40 · pCO₂ 40 · HCO₃⁻ 24'});
KIT.names(NAMES.en,{ab_eq:'Bicarbonate buffer: CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻',ab_lu:'Lungs set pCO₂ (minutes)',ab_ki:'Kidneys set HCO₃⁻ and H⁺ (days)',ab_dv:'Davenport diagram: pH – HCO₃⁻ with pCO₂ isobars',ab_pt:'Patient state (computed pH)',ab_n:'Normal: pH 7.40 · pCO₂ 40 · HCO₃⁻ 24'});
SM.items.acidbase=preset(1700,900,(g,it)=>{const K=['normal','racid','ralk','macid','malk'];const k=kindOf(it,'acidbase',K);const A={},TT=it.cycle||10;
  const pH=(h,c)=>6.1+Math.log10(h/(.03*c));
  const D={normal:[[40,24],[40,24]],racid:[[60,26],[60,31]],ralk:[[25,21],[25,18]],macid:[[40,12],[1.5*12+8,12]],malk:[[40,36],[40+.7*12,36]]};const S=D[k];
  const name={normal:U('Me’yor','Normal'),racid:U('Respirator atsidoz (gipoventilyatsiya)','Respiratory acidosis (hypoventilation)'),ralk:U('Respirator alkaloz (giperventilyatsiya)','Respiratory alkalosis (hyperventilation)'),macid:U('Metabolik atsidoz (masalan, ketoatsidoz)','Metabolic acidosis (e.g. ketoacidosis)'),malk:U('Metabolik alkaloz (masalan, qusish)','Metabolic alkalosis (e.g. vomiting)')}[k];
  const ax=axes(g,820,150,760,560,{x:[7.0,7.7],y:[0,45],xt:[7.0,7.1,7.2,7.3,7.4,7.5,7.6,7.7],yt:[0,12,24,36,45],xl:'pH',yl:U('HCO₃⁻, mmol/L','HCO₃⁻, mmol/L')});
  el('rect',{x:ax.px(7.35),y:ax.py(26),width:ax.px(7.45)-ax.px(7.35),height:ax.py(22)-ax.py(26),fill:'#81C784',opacity:.3},g);
  [20,30,40,60,80].forEach(c=>{const hp=x=>.03*c*Math.pow(10,x-6.1);el('path',{d:pth(x=>[ax.px(x),ax.py(Math.min(45,hp(x)))],7.0,7.7,120),stroke:c===40?'#FFCA28':'#78909C','stroke-width':c===40?3:2,fill:'none',opacity:.9},g);const xe=Math.min(7.7,6.1+Math.log10(44/(.03*c)));txt(g,`${c}`,ax.px(xe)+(xe<7.69?6:-24),ax.py(Math.min(44,.03*c*Math.pow(10,xe-6.1)))+ (xe<7.69?0:18),{size:15,color:c===40?'#FFCA28':'#B0BEC5',weight:800,anchor:'start'})});
  txt(g,T(U('pCO₂ izobaralari, mmHg','pCO₂ isobars, mmHg')),ax.px(7.02),ax.py(42),{size:16,color:'#B0BEC5',weight:700,anchor:'start'});
  const pts=[[40,24],...S];const P=pts.map(([c,h])=>[ax.px(pH(h,c)),ax.py(h)]);poly(g,P,'#fff',2,{dash:'6 6',op:.6});
  P.forEach((q,i)=>el('circle',{cx:q[0],cy:q[1],r:i?8:7,fill:['#81C784','#EF5350','#FFB74D'][i]},g));const cur=dot(g,'#fff',12);
  // left: buffer equation, lungs, kidneys
  txt(g,'CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻',380,170,{size:28,color:'ink',weight:800});txt(g,T(U('(karboangidraza)','(carbonic anhydrase)')),380,205,{size:17,color:'dim',weight:600});
  txt(g,'pH = 6,1 + log ( [HCO₃⁻] / (0,03 × pCO₂) )',380,260,{size:24,color:'#FFCA28',weight:800});
  const lu=box(g,230,370,260,90,T(U('O‘pka: CO₂','Lungs: CO₂')),'#4FC3F7',{size:22}),ki=box(g,530,370,260,90,T(U('Buyrak: HCO₃⁻, H⁺','Kidney: HCO₃⁻, H⁺')),'#FFB74D',{size:22});
  const R=S.map(([c,h])=>({c,h,p:pH(h,c)}));const row=(y,l,[c,h,p],col)=>{txt(g,T(l),110,y,{size:19,color:col,weight:800,anchor:'start'});txt(g,`pH ${p.toFixed(2)} · pCO₂ ${c.toFixed(0)} · HCO₃⁻ ${h.toFixed(0)}`,110,y+30,{size:20,color:'ink',weight:700,anchor:'start'})};
  ttl(g,name,110,500,{size:22});row(550,U('1) Birlamchi buzilish','1) Primary disorder'),[R[0].c,R[0].h,R[0].p],'#EF5350');row(630,U('2) Kompensatsiyadan keyin','2) After compensation'),[R[1].c,R[1].h,R[1].p],'#FFB74D');
  const rule={normal:U('Kompensatsiya kerak emas','No compensation needed'),racid:U('Surunkali: HCO₃⁻ +3,5 / 10 mmHg pCO₂ (buyrak)','Chronic: HCO₃⁻ +3.5 per 10 mmHg pCO₂ (kidney)'),ralk:U('Surunkali: HCO₃⁻ −5 / 10 mmHg pCO₂','Chronic: HCO₃⁻ −5 per 10 mmHg pCO₂'),macid:U(`Vinter formulasi: pCO₂ = 1,5 × HCO₃⁻ + 8 = ${(1.5*12+8).toFixed(0)} (Kussmaul nafasi)`,`Winter’s formula: pCO₂ = 1.5 × HCO₃⁻ + 8 = ${(1.5*12+8).toFixed(0)} (Kussmaul breathing)`),malk:U('pCO₂ ≈ 40 + 0,7 × ΔHCO₃⁻ (gipoventilyatsiya)','pCO₂ ≈ 40 + 0.7 × ΔHCO₃⁻ (hypoventilation)')}[k];
  lines(g,110,720,[rule,k==='macid'?U('Anion oralig‘i: Na⁺ − (Cl⁻ + HCO₃⁻) = 140 − (104 + 12) = 24 (yuqori)','Anion gap: Na⁺ − (Cl⁻ + HCO₃⁻) = 140 − (104 + 12) = 24 (high)'):U('Kompensatsiya pH ni me’yorga yaqinlashtiradi, lekin to‘liq tiklamaydi','Compensation brings pH toward, not fully to, normal'),U('Me’yor: pH 7,35–7,45; pCO₂ 35–45 mmHg; HCO₃⁻ 22–26 mmol/L','Normal: pH 7.35–7.45; pCO₂ 35–45 mmHg; HCO₃⁻ 22–26 mmol/L')],{size:18,dy:32,keep:true});
  if(R.some(r=>Math.abs(r.p-7.4)>.5))SERR.push('acidbase: pH out of range');
  Object.assign(A,{ab_eq:[380,160],ab_lu:[230,410],ab_ki:[530,410],ab_dv:[ax.px(7.6),ax.py(30)],ab_pt:()=>curP,ab_n:P[0]});let curP=P[0];
  return {anchors:A,core:Object.keys(A),coreSchool:['ab_eq','ab_lu','ab_ki','ab_pt'],labelLayout:'tb',update(lt,p,st0){const u=(((lt-st0)/TT)%1+1)%1;const a=E.inOutCubic(prog(u,.1,.4)),b=E.inOutCubic(prog(u,.55,.85));
    const x=lerp(lerp(P[0][0],P[1][0],a),P[2][0],b),y=lerp(lerp(P[0][1],P[1][1],a),P[2][1],b);curP=[x,y];at(cur,{cx:f2(x),cy:f2(y)});
    lit(lu,(k[0]==='r'&&a>.5&&b<.5)||(k[0]==='m'&&b>.3));lit(ki,(k[0]==='m'&&a>.5&&b<.5)||(k[0]==='r'&&b>.3))}}});

KIT.bind();
})();
