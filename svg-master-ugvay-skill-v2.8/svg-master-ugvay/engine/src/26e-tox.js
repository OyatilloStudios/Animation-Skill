/* ================= v2.5 SHELF: CHEMICAL INJURY & TOXICOLOGY — toxin (co · cyanide · organophosphate · botulinum · lead) · livertox · burn · radical · radiation · caries
   Academic style; values from Goldfrank’s Toxicologic Emergencies, Robbins, Katzung. Simplifications written on screen. */
(()=>{
const {mix,dark,light,vol,txt,T}=KIT;
const U=(uz,en,ru)=>({uz,en,ru:ru||en});
const uid=p=>p+(SM._m25=(SM._m25||0)+1);
const clipTo=(g,shape)=>{const id=uid('mc');const cp=el('clipPath',{id},DEFS);el(shape[0],shape[1],cp);return el('g',{'clip-path':`url(#${id})`},g)};
const note=(g,s,x,y,o={})=>txt(g,T(s),x,y,{size:20,color:'dim',weight:600,...o});
const sbar=(g,x,y,len,lab)=>{el('line',{x1:x,y1:y,x2:x+len,y2:y,stroke:TH.ink,'stroke-width':4},g);[x,x+len].forEach(v=>el('line',{x1:v,y1:y-7,x2:v,y2:y+7,stroke:TH.ink,'stroke-width':2},g));txt(g,lab,x+len/2,y-14,{size:18,color:'ink',weight:600})};
const sim=(TT,dt,step,init)=>{const n=Math.ceil(TT/dt)+1,out=new Array(n);let s=init;for(let i=0;i<n;i++){out[i]=s;s=step(s,i*dt,dt)}return t=>{const u=((t%TT)+TT)%TT/dt,i=Math.floor(u);return out[Math.min(n-1,i)]}};
const sig=x=>1/(1+Math.exp(-x));
const arw=(g,a,b,c,w,d)=>el('path',{d:`M${a[0]},${a[1]} L${b[0]},${b[1]}`,stroke:c||TH.ink,'stroke-width':w||4,'marker-end':arrowMarker(c||'ink'),fill:'none','stroke-dasharray':d||'none'},g);
const along=(P,q)=>{const L=[];let tot=0;for(let i=1;i<P.length;i++){const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);L.push(d);tot+=d}let s=Math.max(0,Math.min(1,q))*tot;for(let i=0;i<L.length;i++){if(s<=L[i]){const u=L[i]?s/L[i]:0;return [lerp(P[i][0],P[i+1][0],u),lerp(P[i][1],P[i+1][1],u),i]}s-=L[i]}const e=P[P.length-1];return [e[0],e[1],L.length-1]};
/* ---------- TOXIN mechanisms: CO · cyanide · organophosphate · botulinum/tetanus · lead ---------- */
const box=(g,x,y,w,h,lab,c,o={})=>{const G=el('g',{},g);const r=el('rect',{x:x-w/2,y:y-h/2,width:w,height:h,rx:12,fill:'#0D1B2A',stroke:c,'stroke-width':3},G);txt(G,lab,x,y+7,{size:o.size||20,color:'ink',weight:700});return {G,r,c,x,y,w,h}};
const lit=(b,on)=>at(b.r,{fill:on?b.c:'#0D1B2A','fill-opacity':on?.35:1,'stroke-width':on?5:3});
const steps=(g,x,y,arr,o={})=>{const t=el('text',{x,y,'font-size':o.size||22,'font-weight':800,fill:TH.ink,'text-anchor':o.anchor||'start'},g);return tt=>{let s=arr[0][1];arr.forEach(([t0,l])=>{if(tt>=t0)s=l});t.textContent=T(s)}};
const gauge=(g,x,y,w,lab,c)=>{txt(g,T(lab),x,y-10,{size:18,color:'ink',weight:700,anchor:'start'});el('rect',{x,y,width:w,height:22,rx:7,fill:'#0D1B2A',stroke:TH.faint},g);const b=el('rect',{x,y,width:0,height:22,rx:7,fill:c},g);const v=el('text',{x:x+w+10,y:y+18,'font-size':18,'font-weight':700,fill:TH.ink},g);return (q,s)=>{at(b,{width:f2(w*Math.max(0,Math.min(1,q)))});v.textContent=s||''}};
const lines=(g,x,y,arr,o={})=>{const G0=el('g',{class:o.keep?'':'uni'},g);arr.forEach((l,i)=>txt(G0,T(l),x,y+i*(o.dy||30),{size:o.size||18,color:o.color||'dim',weight:600,anchor:o.anchor||'start'}))};
KIT.names(NAMES.uz,{hbT:'Gemoglobin (4 gem)',coT:'CO — O₂ dan ~240 marta kuchli bog‘lanadi',o2T:'O₂',curveT:'O₂ dissotsiatsiya egri chizig‘i',cohbT:'COHb % va belgilar',
  c1:'I kompleks',c3:'III kompleks',c4:'IV kompleks (sitoxrom c oksidaza)',atpS:'ATF sintaza',cnT:'CN⁻ Fe³⁺ (a₃) ga bog‘lanadi',lacT:'Laktat ↑ (anaerob glikoliz)',antiT:'Gidroksokobalamin CN⁻ ni bog‘laydi',
  achT:'Atsetilxolin (ACh)',acheT:'Atsetilxolinesteraza (AChE)',opT:'Fosfororganik birikma AChE ni fosforlaydi',rcpT:'Nikotin retseptori',cleftT:'Sinaptik yoriq (~50 nm)',
  snareT:'SNARE: sinaptobrevin, SNAP-25, sintaksin',bontT:'Botulotoksin A: SNAP-25 ni kesadi',tetT:'Tetanus toksini: tormozlovchi neyronda sinaptobrevinni kesadi',
  alaT:'δ-ALK (ALA)',aladT:'ALK-degidrataza — Pb to‘sadi',fcT:'Ferroxelataza — Pb to‘sadi',hemeT:'Gem',pbT:'Qo‘rg‘oshin (Pb²⁺)',stipT:'Bazofil donadorlik (eritrotsit)'});
KIT.names(NAMES.en,{hbT:'Haemoglobin (4 haems)',coT:'CO binds ~240× more tightly than O₂',o2T:'O₂',curveT:'O₂ dissociation curve',cohbT:'COHb % and symptoms',
  c1:'Complex I',c3:'Complex III',c4:'Complex IV (cytochrome c oxidase)',atpS:'ATP synthase',cnT:'CN⁻ binds Fe³⁺ (a₃)',lacT:'Lactate ↑ (anaerobic glycolysis)',antiT:'Hydroxocobalamin binds CN⁻',
  achT:'Acetylcholine (ACh)',acheT:'Acetylcholinesterase (AChE)',opT:'Organophosphate phosphorylates AChE',rcpT:'Nicotinic receptor',cleftT:'Synaptic cleft (~50 nm)',
  snareT:'SNARE: synaptobrevin, SNAP-25, syntaxin',bontT:'Botulinum toxin A cleaves SNAP-25',tetT:'Tetanus toxin cleaves synaptobrevin in inhibitory neuron',
  alaT:'δ-ALA',aladT:'ALA dehydratase — blocked by Pb',fcT:'Ferrochelatase — blocked by Pb',hemeT:'Haem',pbT:'Lead (Pb²⁺)',stipT:'Basophilic stippling (RBC)'});
SM.items.toxin=preset(1700,900,(g,it)=>{const KS=['co','cyanide','organophosphate','botulinum','lead'];const k=it.kind||'co',A={};if(!KS.includes(k))SERR.push(`toxin: kind "${k}" → ${KS.join(', ')}`);const TT=it.cycle||14;let R0;
  if(k==='co'){const hx=330,hy=420;const hb=el('g',{},g);const sub=[[-80,-70,'#E57373'],[80,-70,'#EF9A9A'],[-80,70,'#EF9A9A'],[80,70,'#E57373']].map(([dx,dy,c])=>{el('ellipse',{cx:hx+dx,cy:hy+dy,rx:92,ry:72,fill:c,stroke:'#B71C1C','stroke-width':3},hb);const hm=el('rect',{x:hx+dx*1.3-14,y:hy+dy*1.3-14,width:28,height:28,rx:4,fill:'#8D6E63',stroke:'#3E2723','stroke-width':2,transform:`rotate(45 ${hx+dx*1.3} ${hy+dy*1.3})`},hb);return [hx+dx*1.3,hy+dy*1.3]});
    txt(g,'α₁',hx-80,hy-60,{size:22,color:'#4A0E0E'});txt(g,'β₁',hx+80,hy-60,{size:22,color:'#4A0E0E'});txt(g,'β₂',hx-80,hy+80,{size:22,color:'#4A0E0E'});txt(g,'α₂',hx+80,hy+80,{size:22,color:'#4A0E0E'});
    const lig=sub.map(([x,y])=>{const G=el('g',{transform:`translate(${f2(x)} ${f2(y)})`},g);const a=el('circle',{cx:-10,cy:0,r:13,fill:'#E53935',stroke:'#fff','stroke-width':2},G),b=el('circle',{cx:12,cy:0,r:13,fill:'#E53935',stroke:'#fff','stroke-width':2},G);return {G,a,b}});
    const c0=720,c1=1180,y0=170,y1=520,px=p=>c0+p/100*(c1-c0),sy=s=>y1-s*(y1-y0);el('rect',{x:c0,y:y0,width:c1-c0,height:y1-y0,fill:'#0D1B2A',stroke:TH.faint},g);
    [0,20,40,60,80,100].forEach(p=>txt(g,String(p),px(p),y1+26,{size:16,color:'dim',weight:600}));[0,.5,1].forEach(s=>txt(g,(s*100)+'%',c0-8,sy(s)+6,{size:16,color:'dim',weight:600,anchor:'end'}));txt(g,'PO₂, mm sim. ust.'.replace('mm sim. ust.',T(U('mm sim. ust.','mmHg'))),(c0+c1)/2,y1+52,{size:17,color:'dim',weight:600});
    const S=(p,f)=>{const P50=26.8*(1-.55*f),n=2.7-1.2*f;return (1-f)*Math.pow(p,n)/(Math.pow(p,n)+Math.pow(P50,n))};const curve=f=>{let d='';for(let i=0;i<=100;i++){const p=i;d+=(i?'L':'M')+f2(px(p))+','+f2(sy(S(p,f)))}return d};
    el('path',{d:curve(0),fill:'none',stroke:'#E57373','stroke-width':4},g);const cv=el('path',{d:curve(.5),fill:'none',stroke:'#90A4AE','stroke-width':4,'stroke-dasharray':'10 6'},g);el('line',{x1:px(40),y1:y0,x2:px(40),y2:y1,stroke:'#4FC3F7','stroke-dasharray':'4 6'},g);txt(g,T(U('to‘qima ~40','tissue ~40')),px(40)+6,y0+20,{size:16,color:'#4FC3F7',weight:600,anchor:'start'});
    txt(g,T(U('Hb·O₂ to‘yinishi (umumiy sig‘imdan)','Hb O₂ saturation (of total capacity)')),c0,y0-14,{size:19,color:'ink',weight:700,anchor:'start'});const cvl=el('text',{x:c1-10,y:sy(.25),'text-anchor':'end','font-size':17,'font-weight':700,fill:'#B0BEC5'},g);
    const lad=[[0,3,U('<3% — chekmaydigan','<3% non-smoker')],[3,10,U('≤10% — chekuvchi','≤10% smoker')],[10,20,U('bosh og‘rig‘i','headache')],[20,30,U('ko‘ngil aynishi, bosh aylanishi','nausea, dizziness')],[30,40,U('chalkashlik, taxikardiya','confusion, tachycardia')],[40,60,U('hushdan ketish, tutqanoq, koma','syncope, seizures, coma')],[60,80,U('o‘lim','death')]];
    const LX=1330,ly=v=>780-v/80*620;el('rect',{x:LX,y:160,width:34,height:620,fill:'#0D1B2A',stroke:TH.faint},g);lad.forEach(([a,b,l],i)=>{el('rect',{x:LX,y:ly(b),width:34,height:ly(a)-ly(b),fill:mix('#FFF59D','#B71C1C',i/6)},g);txt(g,T(l),LX+46,(ly(a)+ly(b))/2+6,{size:17,color:'ink',weight:600,anchor:'start'});txt(g,b+'%',LX-6,ly(b)+6,{size:15,color:'dim',weight:600,anchor:'end'})});
    const mk=el('path',{d:'',fill:'#fff'},g);txt(g,'COHb',LX+17,140,{size:19,color:'ink',weight:800});
    const ga=gauge(g,720,630,420,U('COHb, %','COHb, %'),'#90A4AE');const st=steps(g,720,712,[[0,U('Ta’sir: CO gem Fe²⁺ ga bog‘lanadi','Exposure: CO binds haem Fe²⁺')],[7,U('Davolash: 100% O₂ — T½ ~5 soat → ~75 min','Treatment: 100% O₂ — T½ ~5 h → ~75 min')]],{size:19});
    lines(g,720,762,[U('Giperbarik O₂: T½ ~20–30 min','Hyperbaric O₂: T½ ~20–30 min'),U('Puls-oksimetr COHb ni O₂Hb deb o‘qiydi (SpO₂ soxta normal)','Pulse oximetry reads COHb as O₂Hb (SpO₂ falsely normal)'),U('CO sitoxrom oksidaza va mioglobinni ham bog‘laydi','CO also binds cytochrome oxidase and myoglobin')],{size:17,dy:26});
    note(g,U('Sxema; egri chiziqlar Hill tenglamasi bilan taxminiy (P50 = 26,8 mm sim. ust.)','Schematic; curves approximated with the Hill equation (P50 = 26.8 mmHg)'),850,890,{size:18});
    Object.assign(A,{hbT:{el:hb,fx:.5,fy:0},coT:{el:lig[1].G},o2T:{el:lig[0].G},curveT:{el:cv,fx:.4,fy:.3},cohbT:[LX+17,ly(40)]});
    R0={anchors:A,core:['hbT','coT','o2T','curveT','cohbT'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;const f=t<7?.5*(1-Math.exp(-t/2.2)):.5*(1-Math.exp(-7/2.2))*Math.exp(-(t-7)/2.2);const nCO=Math.round(f*4/0.5*.5*2);
      lig.forEach((o,i)=>{const isCO=i<Math.round(f/.5*2);at(o.a,{fill:isCO?'#37474F':'#E53935'});at(o.b,{fill:'#E53935'})});at(cv,{d:curve(f)});cvl.textContent=`COHb ${Math.round(f*100)}%`;at(cvl,{y:f2(sy(S(90,f))+26)});
      const v=f*100;ga(v/80,Math.round(v)+'%');at(mk,{d:`M${LX+36},${f2(ly(v))} l16,-10 l0,20Z`});st(t)}}}
  if(k==='cyanide'){const MY=380;el('rect',{x:60,y:140,width:1100,height:MY-170,fill:'#2A3A55',opacity:.5},g);txt(g,T(U('Membranalararo bo‘shliq (H⁺ ko‘p)','Intermembrane space (high H⁺)')),80,175,{size:19,color:'dim',weight:700,anchor:'start'});txt(g,T(U('Matriks','Matrix')),80,640,{size:19,color:'dim',weight:700,anchor:'start'});
    el('rect',{x:60,y:MY-30,width:1100,height:60,fill:'#F48FB1',opacity:.45},g);for(let x=66;x<1160;x+=14){el('circle',{cx:x,cy:MY-24,r:5,fill:'#F8BBD0'},g);el('circle',{cx:x,cy:MY+24,r:5,fill:'#F8BBD0'},g)}
    const cx=[200,420,640,950],nm=['I','III','IV','ATF'.replace('ATF',T(U('ATF','ATP')))];const C=cx.map((x,i)=>{const G=el('g',{},g);el('rect',{x:x-55,y:MY-80,width:110,height:160,rx:20,fill:['#7986CB','#4DB6AC','#FFB74D','#BA68C8'][i],stroke:'#263238','stroke-width':3},G);txt(G,nm[i],x,MY+8,{size:26,color:'#000',weight:800});return G});
    const q=el('ellipse',{cx:310,cy:MY+5,rx:20,ry:12,fill:'#FFF176'},g),cc=el('circle',{cx:530,cy:MY-50,r:14,fill:'#EF5350'},g);txt(g,'Q',310,MY+11,{size:15,color:'#000'});txt(g,'c',530,MY-44,{size:15,color:'#fff'});
    const e=[...Array(6)].map(()=>el('circle',{r:7,fill:'#FFEB3B',stroke:'#F57F17','stroke-width':2},g));const hp=[...Array(12)].map(()=>{const G=el('g',{},g);el('circle',{r:10,fill:'#FF7043'},G);txt(G,'H⁺',0,4,{size:10,color:'#fff'});return G});const atp=[...Array(5)].map(()=>{const G=el('g',{},g);el('rect',{x:-22,y:-11,width:44,height:22,rx:11,fill:'#81C784'},G);txt(G,T(U('ATF','ATP')),0,5,{size:12,color:'#000'});return G});
    const o2=el('text',{x:640,y:MY+150,'text-anchor':'middle','font-size':20,'font-weight':700,fill:'#4FC3F7'},g);o2.textContent='O₂ + 4e⁻ + 4H⁺ → 2H₂O';
    const cn=[...Array(4)].map(()=>{const G=el('g',{},g);el('circle',{cx:-9,r:11,fill:'#424242'},G);el('circle',{cx:9,r:11,fill:'#1565C0'},G);txt(G,'C',-9,4,{size:11,color:'#fff'});txt(G,'N',9,4,{size:11,color:'#fff'});return G});const hc=el('g',{},g);el('circle',{r:26,fill:'#C2185B',stroke:'#fff','stroke-width':3},hc);txt(hc,'B₁₂a',0,6,{size:15,color:'#fff'});
    const ga=gauge(g,1220,250,330,U('ATF ishlab chiqarish','ATP production'),'#81C784'),gl=gauge(g,1220,340,330,U('Qonda laktat, mmol/L','Blood lactate, mmol/L'),'#FFB74D'),gv=gauge(g,1220,430,330,U('Venoz qonda O₂','Venous O₂'),'#E57373');
    const st=steps(g,1220,530,[[0,U('Me’yor: elektronlar O₂ ga, H⁺ gradiyenti → ATF','Normal: electrons to O₂, H⁺ gradient → ATP')],[3,U('CN⁻ IV kompleksga bog‘lanadi — zanjir to‘xtaydi','CN⁻ binds complex IV — chain stops')],[5,U('O₂ ishlatilmaydi; glikoliz → laktat; gistotoksik gipoksiya','O₂ unused; glycolysis → lactate; histotoxic hypoxia')],[9,U('Antidot: gidroksokobalamin, natriy tiosulfat','Antidote: hydroxocobalamin, sodium thiosulfate')]],{size:19});
    lines(g,1220,600,[U('Laktat > 8 mmol/L — sianid ehtimoli yuqori','Lactate > 8 mmol/L suggests cyanide'),U('Manbalar: yong‘in tutuni, nitroprussid,','Sources: fire smoke, nitroprusside,'),U('achchiq bodom/o‘rik danagi (amigdalin)','bitter almond/apricot kernels (amygdalin)')],{size:17});
    note(g,U('Mitoxondriya ichki membranasi sxemasi; komplekslar soddalashtirilgan (II kompleks ko‘rsatilmagan)','Inner mitochondrial membrane schematic; complexes simplified (complex II not shown)'),620,890,{size:18});
    const ST={};Object.assign(A,{c1:{el:C[0],fx:.5,fy:1},c3:{el:C[1],fx:.5,fy:1},c4:{el:C[2],fx:.5,fy:0},atpS:{el:C[3],fx:.5,fy:1},cnT:()=>ST.cn||[640,MY-120],lacT:[1300,352],antiT:{el:hc}});
    R0={anchors:A,core:['c1','c3','c4','atpS','cnT','lacT','antiT'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;const blk=t>=3&&t<10.5?Math.min(1,(t-3)/.8):t>=10.5?Math.max(0,1-(t-10.5)/1.5):0;const flow=1-blk;
      e.forEach((c,i)=>{const q=(lt*.4+i/6)%1;const x=lerp(200,640,q);const y=MY+(q<.25?0:q<.5?5:q<.75?-50:-10);at(c,{cx:f2(blk>.5&&x>560?560:x),cy:y,opacity:f2(flow>.2||x<560?1:.3)})});
      hp.forEach((G,i)=>{const src=cx[i%3],q=(lt*.5+i/12)%1;G.setAttribute('transform',`translate(${f2(src+((i*13)%40)-20)} ${f2(lerp(MY+80,MY-150,q))})`);G.setAttribute('opacity',f2(flow*Math.sin(Math.PI*q)))});
      atp.forEach((G,i)=>{const q=(lt*.4+i/5)%1;G.setAttribute('transform',`translate(${f2(950+((i*31)%60)-30)} ${f2(lerp(MY+90,MY+260,q))})`);G.setAttribute('opacity',f2(flow*Math.sin(Math.PI*q)))});
      cn.forEach((G,i)=>{const q=Math.max(0,Math.min(1,(t-2.4-i*.15)/.8));const bound=t<10;const x=i===0?lerp(700,640,q):lerp(760+i*60,700+i*30,q),y=i===0?lerp(MY+250,MY+60,q):MY+200+i*18;const sc=t>9&&t<10.5?Math.min(1,(t-9)/1):0;G.setAttribute('transform',`translate(${f2(lerp(x,1000,sc))} ${f2(lerp(y,MY+200,sc))})`);G.setAttribute('opacity',t>2.4&&t<11?1:0);if(i===0)ST.cn=[x,y]});
      hc.setAttribute('transform',`translate(${f2(lerp(1160,1000,Math.max(0,Math.min(1,(t-8.6)/.6))))} ${MY+200})`);hc.setAttribute('opacity',t>8.6&&t<12?1:0);o2.setAttribute('opacity',f2(.3+.7*flow));
      ga(flow*.95+.05,Math.round(flow*100)+'%');const la=1.2+blk*Math.min(1,Math.max(0,(t-3)/4))*10;gl(la/14,la.toFixed(1));gv(.45+.45*blk,blk>.5?T(U('yuqori (“arterial”)','high (“arterialised”)')):T(U('me’yor','normal')));st(t)}}}
  if(k==='organophosphate'){const PY=300,MY=560;
    el('path',{d:`M200,120 L200,${PY-60} C200,${PY+10} 330,${PY+30} 700,${PY+30} C1070,${PY+30} 1200,${PY+10} 1200,${PY-60} L1200,120Z`,fill:'#3949AB',opacity:.45,stroke:'#7986CB','stroke-width':5},g);txt(g,T(U('Presinaptik terminal (harakat nervi)','Presynaptic terminal (motor nerve)')),700,160,{size:20,color:'ink',weight:700});
    el('rect',{x:120,y:MY,width:1160,height:250,fill:'#C0392B',opacity:.45},g);el('line',{x1:120,y1:MY,x2:1280,y2:MY,stroke:'#E57373','stroke-width':6},g);txt(g,T(U('Mushak tolasi (oxirgi plastinka)','Muscle fibre (end plate)')),700,MY+210,{size:20,color:'ink',weight:700});
    const ves=[...Array(7)].map((_,i)=>{const x=330+i*120,y=PY-40;const G=el('g',{transform:`translate(${x} ${y})`},g);el('circle',{r:26,fill:'#9FA8DA',stroke:'#3949AB','stroke-width':2},G);for(let j=0;j<5;j++)el('circle',{cx:Math.cos(j*1.3)*12,cy:Math.sin(j*1.3)*12,r:4,fill:'#FFD54F'},G);return {G,x,y}});
    const rec=[...Array(8)].map((_,i)=>{const x=260+i*125;const G=el('g',{transform:`translate(${x} ${MY})`},g);el('path',{d:'M-16,0 L-16,-26 Q0,-36 16,-26 L16,0',fill:'#4DB6AC',stroke:'#004D40','stroke-width':2},G);const ch=el('rect',{x:-4,y:-26,width:8,height:26,fill:'#004D40'},G);return {G,ch,x}});
    const ache=[...Array(6)].map((_,i)=>{const x=320+i*160,y=MY-70;const G=el('g',{transform:`translate(${x} ${y})`},g);el('path',{d:'M-24,0 C-24,-22 24,-22 24,0 C24,16 -24,16 -24,0Z',fill:'#FFB74D',stroke:'#E65100','stroke-width':2},G);const op=el('g',{opacity:0},G);el('circle',{cx:0,cy:-16,r:9,fill:'#AB47BC'},op);txt(op,'P',0,-12,{size:12,color:'#fff'});return {G,op,x,y}});
    const ach=[...Array(40)].map(()=>el('circle',{r:5,fill:'#FFD54F'},g));
    const c0=1330,c1=1650,y0=200,y1=420;el('rect',{x:c0,y:y0,width:c1-c0,height:y1-y0,fill:'#0D1B2A',stroke:TH.faint},g);txt(g,T(U('Yoriqdagi ACh','ACh in the cleft')),c0,y0-14,{size:19,color:'ink',weight:700,anchor:'start'});const pth=el('path',{d:'',fill:'none',stroke:'#FFD54F','stroke-width':3.5},g);
    const st=steps(g,c0,480,[[0,U('Me’yor: AChE ACh ni ~1 ms da parchalaydi','Normal: AChE clears ACh in ~1 ms')],[4,U('FOB AChE serinini fosforlaydi','OP phosphorylates AChE serine')],[6,U('ACh to‘planadi → uzluksiz qo‘zg‘alish','ACh accumulates → continuous stimulation')]],{size:18});
    lines(g,c0,540,[U('Muskarin: so‘lak, ko‘z yoshi, bronxoreya,','Muscarinic: salivation, lacrimation, bronchorrhoea,'),U('bradikardiya, mioz (SLUDGE)','bradycardia, miosis (SLUDGE)'),U('Nikotin: fassikulyatsiya → falaj','Nicotinic: fasciculations → paralysis'),U('Davolash: atropin (M), pralidoksim','Treatment: atropine (M), pralidoxime'),U('(“qarish”dan oldin, AChE ni tiklaydi)','(before “ageing”, reactivates AChE)')],{size:17,dy:28});
    note(g,U('Nerv-mushak sinapsi sxemasi; molekulalar kattalashtirilgan','Neuromuscular junction schematic; molecules enlarged'),700,890,{size:18});
    const hist=[];Object.assign(A,{achT:{el:ach[3]},acheT:{el:ache[2].G,fx:.5,fy:0},opT:{el:ache[4].G,fx:.5,fy:1},rcpT:{el:rec[1].G,fx:.5,fy:1},cleftT:[1200,MY-40]});
    R0={anchors:A,core:['achT','acheT','opT','rcpT','cleftT'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT,op=t>=4;const ph=(lt%1.5)/1.5;const rel=ph<.15;
      ache.forEach((o,i)=>o.op.setAttribute('opacity',op&&t>4+i*.25?1:0));const acc=op?Math.min(1,(t-5)/3):0;
      ach.forEach((c,i)=>{const v=ves[i%7];const q=Math.min(1,ph*3+((i*7)%10)/40);const y=lerp(v.y+20,MY-30-((i*37)%140),q);const alive=!op?(ph<.4):(i/40<acc+.3*(ph<.4));at(c,{cx:f2(v.x+((i*29)%60)-30+Math.sin(lt*3+i)*6),cy:f2(y),opacity:alive?1:0})});
      rec.forEach(r=>at(r.ch,{fill:(ph<.4||acc>.3)?'#FFF59D':'#004D40'}));
      const level=tt=>{const p=(tt%1.5)/1.5;const base=tt>=5?Math.min(1,(tt-5)/3):0;return Math.max(base,p<.4?Math.exp(-p*12)*(1):0)};let d='';for(let i=0;i<=120;i++){const tt=i/120*TT;d+=(i?'L':'M')+f2(c0+i/120*(c1-c0))+','+f2(y1-level(tt)*(y1-y0-10))}at(pth,{d});st(t)}}}
  if(k==='botulinum'){const panel=(x0,title,tox,cut,eff)=>{const G=el('g',{},g);el('rect',{x:x0,y:110,width:780,height:640,rx:20,fill:'#0D1B2A',stroke:TH.faint},G);txt(G,T(title),x0+390,150,{size:24,color:'ink',weight:800});
      el('path',{d:`M${x0+120},170 L${x0+120},380 C${x0+120},440 ${x0+660},440 ${x0+660},380 L${x0+660},170Z`,fill:'#3949AB',opacity:.45,stroke:'#7986CB','stroke-width':4},G);el('rect',{x:x0+80,y:520,width:620,height:120,fill:eff==='flaccid'?'#C0392B':'#8E24AA',opacity:.4},G);
      const v=el('g',{},G);el('circle',{cx:x0+390,cy:330,r:42,fill:'#9FA8DA',stroke:'#3949AB','stroke-width':3},v);for(let j=0;j<6;j++)el('circle',{cx:x0+390+Math.cos(j)*20,cy:330+Math.sin(j)*20,r:5,fill:'#FFD54F'},v);
      const sn=[['#FF7043',-30],['#66BB6A',0],['#29B6F6',30]].map(([c,dx])=>el('path',{d:`M${x0+390+dx},372 L${x0+390+dx},420`,stroke:c,'stroke-width':8,'stroke-linecap':'round'},G));
      const tx=el('g',{},G);el('path',{d:'M-30,-14 L30,-14 L18,14 L-18,14Z',fill:'#212121',stroke:'#FF5252','stroke-width':3},tx);txt(tx,tox,0,6,{size:13,color:'#FF8A80'});
      const nt=[...Array(14)].map(()=>el('circle',{r:5,fill:'#FFD54F'},G));return {G,v,sn,tx,nt,x0,cut}};
    const P=[panel(60,U('Botulizm: nerv-mushak sinapsi','Botulism: neuromuscular junction'),'BoNT/A',0,'flaccid'),panel(860,U('Qoqshol: orqa miya tormozlovchi sinapsi','Tetanus: spinal inhibitory synapse'),'TeNT',2,'spastic')];
    txt(g,T(U('ACh chiqmaydi → SUST (flaksid) falaj','No ACh release → FLACCID paralysis')),450,700,{size:21,color:'#FF8A80',weight:800});txt(g,T(U('Glitsin/GAMK chiqmaydi → SPASTIK falaj (trizm)','No glycine/GABA → SPASTIC paralysis (trismus)')),1250,700,{size:21,color:'#CE93D8',weight:800});
    lines(g,80,790,[U('Ikkala toksin ham Zn²⁺-proteaza (yengil zanjir) — SNARE oqsillarini kesadi; BoNT — eng kuchli ma’lum zahar (LD₅₀ ~1 ng/kg)','Both toxins are Zn²⁺ proteases (light chain) cleaving SNARE proteins; BoNT is the most potent known toxin (LD₅₀ ~1 ng/kg)'),U('TeNT retrograd ravishda orqa miyaga ko‘chadi; tibbiyotda BoNT (Botox) distoniya, spastiklikda qo‘llanadi','TeNT travels retrogradely to the spinal cord; BoNT (Botox) is used for dystonia and spasticity')],{size:18});
    const st=steps(g,850,95,[[0,U('Me’yor: SNARE kompleksi pufakchani membranaga tortadi','Normal: SNARE complex pulls vesicle to membrane')],[4,U('Toksin endotsitoz bilan kiradi va SNARE ni kesadi','Toxin enters by endocytosis and cleaves SNARE')],[6.5,U('Ekzotsitoz to‘xtaydi','Exocytosis stops')]],{size:20,anchor:'middle'});
    Object.assign(A,{snareT:{el:P[0].sn[1],fx:.5,fy:1},bontT:{el:P[0].tx},tetT:{el:P[1].tx}});
    R0={anchors:A,core:['snareT','bontT','tetT'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT,cut=t>=5.5;P.forEach(p=>{const ph=(lt%2)/2;const q=Math.max(0,Math.min(1,(t-3.5)/2));p.tx.setAttribute('transform',`translate(${f2(lerp(p.x0+700,p.x0+390+(p.cut-1)*30,q))} ${f2(lerp(200,400,q))})`);p.tx.setAttribute('opacity',t>3.5?1:0);
      p.sn[p.cut].setAttribute('stroke-dasharray',cut?'14 10':'');const dock=!cut?Math.min(1,ph*2):0;p.v.setAttribute('transform',`translate(0 ${f2(dock*40)})`);
      p.nt.forEach((c,i)=>{const q2=Math.max(0,ph*2-1);at(c,{cx:f2(p.x0+300+(i*13)%180),cy:f2(lerp(430,540,q2)),opacity:!cut&&ph>.5?1:0})})});st(t)}}}
  if(k==='lead'){const nodes=[['gly','Glitsin + suksinil-KoA','Glycine + succinyl-CoA',200,200,'#90A4AE'],['ala','δ-ALK','δ-ALA',200,360,'#FFB74D'],['pbg','PBG','PBG',520,360,'#FFB74D'],['upo','Uroporfirinogen → koproporfirinogen','Uroporphyrinogen → coproporphyrinogen',850,360,'#FFB74D'],['pp','Protoporfirin IX','Protoporphyrin IX',850,560,'#E57373'],['heme','Gem','Haem',520,560,'#C62828']];const N={};
    el('rect',{x:60,y:120,width:440,height:520,rx:24,fill:'#5D4037',opacity:.25,stroke:'#8D6E63','stroke-width':3},g);txt(g,T(U('Mitoxondriya','Mitochondrion')),280,620,{size:19,color:'dim',weight:700});el('rect',{x:420,y:280,width:640,height:160,rx:24,fill:'#37474F',opacity:.3},g);txt(g,T(U('Sitozol','Cytosol')),960,430,{size:19,color:'dim',weight:700});
    nodes.forEach(([id,u,e,x,y,c])=>N[id]=box(g,x,y,id==='upo'?380:240,56,T(U(u,e)),c,{size:18}));
    const ar=(a,b)=>el('path',{d:`M${a[0]},${a[1]} L${b[0]},${b[1]}`,stroke:TH.ink,'stroke-width':4,'marker-end':arrowMarker('ink')},g);ar([200,230],[200,322]);ar([322,360],[392,360]);ar([642,360],[652,360]);ar([850,390],[850,522]);ar([728,560],[648,560]);
    txt(g,'ALAS',230,280,{size:17,color:'dim',weight:700,anchor:'start'});const alad=box(g,520,270,230,44,T(U('ALK-degidrataza','ALA dehydratase')),'#FF5252',{size:17}),fc=box(g,690,640,230,44,T(U('Ferroxelataza (+Fe²⁺)','Ferrochelatase (+Fe²⁺)')),'#FF5252',{size:17});
    const pb=[...Array(6)].map(()=>{const G=el('g',{},g);el('circle',{r:16,fill:'#546E7A',stroke:'#CFD8DC','stroke-width':2},G);txt(G,'Pb',0,5,{size:13,color:'#fff'});return G});
    const flow=[...Array(10)].map(()=>el('circle',{r:7,fill:'#FFF59D'},g));const accA=el('text',{x:200,y:440,'text-anchor':'middle','font-size':18,'font-weight':700,fill:'#FFB74D'},g),accZ=el('text',{x:850,y:620,'text-anchor':'middle','font-size':18,'font-weight':700,fill:'#E57373'},g);
    const rx=1350,ry=330;const rb=el('g',{},g);el('circle',{cx:rx,cy:ry,r:120,fill:'#EF9A9A',stroke:'#C62828','stroke-width':4},rb);el('circle',{cx:rx,cy:ry,r:50,fill:'#F8BBD0'},rb);const dots=[...Array(40)].map((_,i)=>el('circle',{cx:f2(rx+Math.cos(i*2.4)*(20+(i*7)%90)),cy:f2(ry+Math.sin(i*2.4)*(20+(i*7)%90)),r:4,fill:'#283593',opacity:0},g));
    txt(g,T(U('Eritrotsit (surtma)','Red cell (smear)')),rx,ry+150,{size:19,color:'ink',weight:700});
    const st=steps(g,1180,560,[[0,U('Gem sintezi: 8 bosqich, mitoxondriya ↔ sitozol','Haem synthesis: 8 steps, mitochondrion ↔ cytosol')],[3,U('Pb²⁺ ALK-degidratazani to‘sadi → ALK siydikda ↑','Pb²⁺ blocks ALA dehydratase → urinary ALA ↑')],[5.5,U('Ferroxelataza to‘siladi → Zn-protoporfirin ↑','Ferrochelatase blocked → Zn-protoporphyrin ↑')],[8,U('Mikrotsitar anemiya, bazofil donadorlik','Microcytic anaemia, basophilic stippling')]],{size:18});
    lines(g,1180,620,[U('Bolalarda xavfsiz daraja yo‘q: neyrokognitiv zarar','No safe level in children: neurocognitive harm'),U('CDC ma’lumot qiymati: 3,5 µg/dL','CDC reference value: 3.5 µg/dL'),U('Manbalar: eski bo‘yoq, quvurlar, akkumulyator,','Sources: old paint, pipes, batteries,'),U('ba’zi xalq dori-darmonlari va kosmetika','some folk remedies and cosmetics'),U('Davolash: manbani yo‘qotish, xelatorlar','Treatment: remove source, chelators')],{size:17,dy:28});
    note(g,U('Gem sintezi soddalashtirilgan (oraliq bosqichlar birlashtirilgan)','Haem synthesis simplified (intermediate steps merged)'),560,890,{size:18});
    Object.assign(A,{alaT:{el:N.ala.G,fx:0,fy:.5},aladT:{el:alad.G,fx:.5,fy:0},fcT:{el:fc.G,fx:.5,fy:1},hemeT:{el:N.heme.G,fx:.5,fy:1},pbT:{el:pb[0]},stipT:{el:rb,fx:.5,fy:0}});
    const path=[[200,230],[200,360],[520,360],[850,360],[850,560],[520,560]];
    R0={anchors:A,core:['alaT','aladT','fcT','hemeT','pbT','stipT'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;const b1=t>=3?Math.min(1,(t-3)/1):0,b2=t>=5.5?Math.min(1,(t-5.5)/1):0;lit(alad,b1>.5);lit(fc,b2>.5);
      pb.forEach((G,i)=>{const tg=i<3?[520+(i-1)*50,230]:[690+(i-4)*50,690];const t0=i<3?2.4:4.9;const q=Math.max(0,Math.min(1,(t-t0-i%3*.15)/.8));G.setAttribute('transform',`translate(${f2(lerp(1100,tg[0],q))} ${f2(lerp(120,tg[1],q))})`);G.setAttribute('opacity',t>t0?1:0)});
      flow.forEach((c,i)=>{const q=(lt*.15+i/10)%1;const n=path.length-1;let s=q*n;const j=Math.min(n-1,Math.floor(s)),u=s-j;const stop1=b1>.5&&j>=1,stop2=b2>.5&&j>=4;const P=stop1?[200,360]:stop2?[850,560]:[lerp(path[j][0],path[j+1][0],u),lerp(path[j][1],path[j+1][1],u)];at(c,{cx:f2(P[0]+(stop1||stop2?(i%3-1)*12:0)),cy:f2(P[1]+(stop1||stop2?((i*7)%3-1)*10:0)),opacity:1})});
      accA.textContent=b1>.5?T(U('ALK to‘planadi','ALA accumulates')):'';accZ.textContent=b2>.5?T(U('protoporfirin ↑ (ZPP)','protoporphyrin ↑ (ZPP)')):'';dots.forEach((d,i)=>d.setAttribute('opacity',t>8&&i/40<(t-8)/2?1:0));st(t)}}}
  R0.update(0);return R0});
/* ---------- LIVER TOXICOLOGY: paracetamol (NAPQI, zone 3) · alcohol (ADH/ALDH, NADH, steatosis → cirrhosis) ---------- */
KIT.names(NAMES.uz,{apap:'Paratsetamol',gluc:'Glyukuronidlash (~55%)',sulf:'Sulfatlash (~30%)',cyp:'CYP2E1 (~5–10%)',napqi:'NAPQI (reaktiv metabolit)',gsh:'Glutation (GSH)',merc:'Merkapturat → siydik (zararsiz)',adduct:'Oqsil adduktlari → mitoxondriya shikasti',zone3:'3-zona nekrozi (CYP2E1 ko‘p, O₂ kam)',nac:'N-atsetilsistein (GSH ni tiklaydi)',
  eth:'Etanol',adh:'Alkogoldegidrogenaza (sitozol)',acet:'Atsetaldegid (toksik)',aldh:'ALDH2 (mitoxondriya)',acetate:'Atsetat → atsetil-KoA',nadh:'NADH/NAD⁺ ↑',meos:'MEOS (CYP2E1) — surunkali ichishda ↑',steat:'Yog‘li jigar (qaytar)',hepat:'Alkogol gepatiti',cirr:'Sirroz (qaytmas)'});
KIT.names(NAMES.en,{apap:'Paracetamol',gluc:'Glucuronidation (~55%)',sulf:'Sulfation (~30%)',cyp:'CYP2E1 (~5–10%)',napqi:'NAPQI (reactive metabolite)',gsh:'Glutathione (GSH)',merc:'Mercapturate → urine (harmless)',adduct:'Protein adducts → mitochondrial injury',zone3:'Zone 3 necrosis (high CYP2E1, low O₂)',nac:'N-acetylcysteine (restores GSH)',
  eth:'Ethanol',adh:'Alcohol dehydrogenase (cytosol)',acet:'Acetaldehyde (toxic)',aldh:'ALDH2 (mitochondria)',acetate:'Acetate → acetyl-CoA',nadh:'NADH/NAD⁺ ↑',meos:'MEOS (CYP2E1) — ↑ with chronic use',steat:'Fatty liver (reversible)',hepat:'Alcoholic hepatitis',cirr:'Cirrhosis (irreversible)'});
SM.items.livertox=preset(1700,900,(g,it)=>{const k=it.kind||'paracetamol',A={};if(!['paracetamol','alcohol'].includes(k))SERR.push(`livertox: kind "${k}" → paracetamol, alcohol`);const TT=it.cycle||14;let R0;
  const ar=(a,b,c,w)=>el('path',{d:`M${a[0]},${a[1]} L${b[0]},${b[1]}`,stroke:c||TH.ink,'stroke-width':w||4,'marker-end':arrowMarker(c||'ink'),fill:'none'},g);
  if(k==='paracetamol'){const od=(it.dose||'overdose')==='overdose';const B={apap:box(g,180,420,220,60,T(U('Paratsetamol','Paracetamol')),'#90CAF9'),gl:box(g,560,200,280,56,T(U('Glyukuronid','Glucuronide')),'#81C784'),su:box(g,560,320,280,56,T(U('Sulfat','Sulfate')),'#81C784'),np:box(g,560,560,240,56,'NAPQI','#FF5252'),me:box(g,920,470,280,56,T(U('Merkapturat','Mercapturate')),'#81C784'),ad:box(g,920,680,300,56,T(U('Oqsil adduktlari','Protein adducts')),'#FF5252')};
    ar([290,405],[418,215]);ar([290,415],[418,320]);ar([290,435],[438,555]);ar([680,550],[778,485]);ar([680,575],[768,670],'#FF5252');txt(g,'UGT',350,280,{size:17,color:'dim',weight:700});txt(g,'SULT',370,360,{size:17,color:'dim',weight:700});txt(g,'CYP2E1',330,520,{size:17,color:'#FF8A80',weight:700});txt(g,'+ GSH',740,500,{size:18,color:'#FFD54F',weight:800});
    ar([700,200],[900,200]);ar([700,320],[900,320]);txt(g,T(U('siydikka (zararsiz)','to urine (harmless)')),1000,268,{size:18,color:'dim',weight:600});
    const pt=[...Array(24)].map(()=>el('circle',{r:6,fill:'#90CAF9'},g));const gg=gauge(g,1150,170,420,U('Jigardagi glutation (GSH)','Hepatic glutathione (GSH)'),'#FFD54F'),ga=gauge(g,1150,250,420,U('ALT (jigar shikasti)','ALT (liver injury)'),'#FF5252');
    // mini acinus
    const mx=1360,my=560,R=120;const hex=[...Array(6)].map((_,i)=>[mx+Math.cos(i*Math.PI/3)*R,my+Math.sin(i*Math.PI/3)*R]);el('path',{d:'M'+hex.map(p=>p.map(f2).join(',')).join(' L')+'Z',fill:'#E8B4AE',stroke:'#EADBD5','stroke-width':3},g);const z3=el('circle',{cx:mx,cy:my,r:0,fill:'#5D4037',opacity:.85},g);el('circle',{cx:mx,cy:my,r:12,fill:'#8E3B46'},g);hex.forEach(([x,y])=>el('circle',{cx:x,cy:y,r:10,fill:'#6D4C8E'},g));
    txt(g,T(U('Jigar bo‘lakchasi','Hepatic lobule')),mx,my+R+34,{size:18,color:'ink',weight:700});
    const st=steps(g,1150,330,od?[[0,U('Dozadan oshirib yuborish (>150 mg/kg)','Overdose (>150 mg/kg)')],[2.5,U('Glyukuronid/sulfat yo‘llari to‘yinadi → ko‘p NAPQI','Glucuronide/sulfate saturate → more NAPQI')],[5,U('GSH < ~30% → NAPQI oqsillarga bog‘lanadi','GSH < ~30% → NAPQI binds proteins')],[7.5,U('3-zona nekrozi; ALT 72–96 soatda cho‘qqi','Zone 3 necrosis; ALT peaks at 72–96 h')],[10,U('NAC: <8 soatda berilsa deyarli to‘liq himoya','NAC: near-complete protection if <8 h')]]:[[0,U('Terapevtik doza: ~90% xavfsiz konjugatlar','Therapeutic dose: ~90% safe conjugates')],[4,U('Oz NAPQI glutation bilan zararsizlanadi','Small NAPQI detoxified by glutathione')]],{size:19});
    lines(g,1150,400,[U('Xavf ↑: surunkali alkogol (CYP2E1 ↑),','Risk ↑: chronic alcohol (CYP2E1 ↑),'),U('ochlik (GSH ↓), izoniazid','fasting (GSH ↓), isoniazid'),U('Rumack–Matthew: 4 soatda 150 mg/L chizig‘i','Rumack–Matthew: 150 mg/L line at 4 h')],{size:17,dy:26});
    note(g,U('Sxema; foizlar terapevtik dozada. Kattalar uchun maksimal sutkalik doza 4 g','Schematic; percentages at therapeutic dose. Adult maximum daily dose 4 g'),620,880,{size:18});
    Object.assign(A,{apap:{el:B.apap.G,fx:.5,fy:1},gluc:{el:B.gl.G,fx:.5,fy:0},sulf:{el:B.su.G,fx:1,fy:.5},cyp:[330,500],napqi:{el:B.np.G,fx:.5,fy:1},gsh:[740,490],merc:{el:B.me.G,fx:.5,fy:0},adduct:{el:B.ad.G,fx:.5,fy:1},zone3:{el:z3,fx:.5,fy:0},nac:[1150,330]});
    const routes=[[[290,420],[560,200],[900,200]],[[290,420],[560,320],[900,320]],[[290,420],[560,560],[920,470]],[[290,420],[560,560],[920,680]]];
    R0={anchors:A,core:['apap','gluc','sulf','cyp','napqi','gsh','merc','adduct','zone3'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;const sat=od?Math.min(1,t/2.5):0;const gsh=od?(t<5?1-.75*(t/5):t<10?.25:Math.min(1,.25+(t-10)/3)):.95;const tox=od&&t>5&&t<11?Math.min(1,(t-5)/2.5):od&&t>=11?Math.max(.6,1-(t-11)/6):0;
      const fr=[.55-.25*sat,.30-.15*sat,(.15+.4*sat)*Math.min(1,gsh/.3),(.15+.4*sat)*(1-Math.min(1,gsh/.3))];const cum=[];fr.reduce((a,v,i)=>(cum[i]=a+v,a+v),0);const tot=cum[3];
      pt.forEach((c,i)=>{const u=((i*.618)%1)*tot;const r=cum.findIndex(v=>u<=v);const R=routes[Math.max(0,r)];const q=(lt*.25+i/24)%1;const s=q*2,j=s<1?0:1,v=s-j;const x=lerp(R[j][0],R[j+1][0],v),y=lerp(R[j][1],R[j+1][1],v);at(c,{cx:f2(x),cy:f2(y),fill:r>=2&&j===1?(r===3?'#FF5252':'#FFD54F'):'#90CAF9',opacity:f2(Math.sin(Math.PI*q))})});
      lit(B.np,sat>.5);lit(B.ad,tox>.3);gg(gsh,Math.round(gsh*100)+'%');const alt=od?(t<7?0:Math.min(1,(t-7)/3)):0;ga(alt,od&&alt>0?T(U('> 1000 U/L','> 1000 U/L')):T(U('me’yor','normal')));at(z3,{r:f2(R*.42*tox)});st(t)}}}
  else{const B={eth:box(g,170,330,200,60,T(U('Etanol','Ethanol')),'#90CAF9'),ac:box(g,560,330,280,60,T(U('Atsetaldegid','Acetaldehyde')),'#FF8A65'),at:box(g,950,330,260,60,T(U('Atsetat','Acetate')),'#81C784')};ar([272,330],[412,330]);ar([702,330],[812,330]);
    txt(g,'ADH',340,310,{size:18,color:'dim',weight:800});txt(g,'ALDH2',760,310,{size:18,color:'dim',weight:800});const nd1=txt(g,'NAD⁺ → NADH',340,370,{size:17,color:'#FFD54F',weight:700}),nd2=txt(g,'NAD⁺ → NADH',760,370,{size:17,color:'#FFD54F',weight:700});
    const meos=el('path',{d:'M170,365 C170,470 420,470 520,370',fill:'none',stroke:'#CE93D8','stroke-width':3,'stroke-dasharray':'8 6','marker-end':arrowMarker('#CE93D8')},g);txt(g,'MEOS (CYP2E1)',330,470,{size:17,color:'#CE93D8',weight:700});
    el('rect',{x:640,y:250,width:560,height:150,rx:24,fill:'none',stroke:'#EF9A9A','stroke-width':2,'stroke-dasharray':'4 8'},g);txt(g,T(U('mitoxondriya','mitochondrion')),1100,270,{size:16,color:'#EF9A9A',weight:600});
    const fx=[[U('Yog‘ kislota sintezi ↑, β-oksidlanish ↓ → steatoz','Fatty acid synthesis ↑, β-oxidation ↓ → steatosis')],[U('Glyukoneogenez ↓ → gipoglikemiya','Gluconeogenesis ↓ → hypoglycaemia')],[U('Laktat ↑, siydik kislotasi ↑','Lactate ↑, uric acid ↑')]];lines(g,90,560,fx.map(a=>a[0]),{size:18,color:'ink',dy:30});txt(g,T(U('NADH/NAD⁺ ↑ oqibatlari:','Consequences of NADH/NAD⁺ ↑:')),90,525,{size:20,color:'#FFD54F',weight:800,anchor:'start'});
    const mol=[...Array(14)].map(()=>el('circle',{r:7,fill:'#90CAF9'},g));
    // progression panels
    const pan=(x,title,draw)=>{const G=el('g',{},g);const cl=clipTo(G,['circle',{cx:x,cy:620,r:110}]);el('rect',{x:x-110,y:510,width:220,height:220,fill:'#F3E5F5'},cl);draw(cl,x,620);el('circle',{cx:x,cy:620,r:110,fill:'none',stroke:TH.faint,'stroke-width':4},G);txt(G,T(title),x,762,{size:19,color:'ink',weight:700});return G};
    const P1=pan(950,U('Steatoz','Steatosis'),(c,x,y)=>{for(let i=0;i<14;i++){const px=x-80+(i%4)*52+(i/4|0)%2*20,py=y-80+(i/4|0)*50;el('rect',{x:px-24,y:py-20,width:48,height:42,fill:'#F8BBD0',stroke:'#C48B9F'},c);el('circle',{cx:px+(i%3)*4,cy:py,r:i%2?15:9,fill:'#FFFFFF'},c);el('circle',{cx:px-14,cy:py-10,r:4,fill:'#6A4C93'},c)}}),
      P2=pan(1210,U('Gepatit (Mallori tanachalari)','Hepatitis (Mallory bodies)'),(c,x,y)=>{for(let i=0;i<14;i++){const px=x-80+(i%4)*52,py=y-80+(i/4|0)*50;el('rect',{x:px-24,y:py-20,width:48,height:42,fill:'#F48FB1',stroke:'#C48B9F'},c);el('circle',{cx:px,cy:py,r:5,fill:'#6A4C93'},c);if(i%4===1)el('path',{d:`M${px-10},${py+8} q10,-10 20,0`,stroke:'#AD1457','stroke-width':4,fill:'none'},c)}for(let i=0;i<12;i++)el('circle',{cx:x-90+(i*37)%180,cy:y-90+(i*53)%180,r:5,fill:'#3949AB'},c)}),
      P3=pan(1470,U('Sirroz (tugunlar + fibroz)','Cirrhosis (nodules + fibrosis)'),(c,x,y)=>{el('rect',{x:x-110,y:y-110,width:220,height:220,fill:'#90CAF9'},c);[[-50,-50,40],[40,-40,36],[-40,40,38],[45,50,34],[0,0,22]].forEach(([dx,dy,r])=>el('circle',{cx:x+dx,cy:y+dy,r,fill:'#F48FB1',stroke:'#C48B9F','stroke-width':2},c))});
    const pm=[P1,P2,P3];[[1065,620],[1325,620]].forEach(([x,y])=>txt(g,'→',x,y+10,{size:30,color:'ink',weight:800}));
    const st=steps(g,90,180,[[0,U('Etanol jigarda ~7–10 g/soat tezlikda parchalanadi (~1 standart ichimlik/soat)','Ethanol is cleared at ~7–10 g/h (~1 standard drink per hour)')],[5,U('Atsetaldegid oqsil va DNK bilan addukt hosil qiladi; ALDH2*2 → “qizarish”','Acetaldehyde forms protein/DNA adducts; ALDH2*2 → “flush”')],[9,U('Surunkali ichish: steatoz → gepatit → sirroz (10–20% ichuvchilarda)','Chronic use: steatosis → hepatitis → cirrhosis (10–20% of heavy drinkers)')]],{size:20});
    note(g,U('Gistologiya sxemasi: oq doiralar — yog‘ vakuolalari; ko‘k — fibroz; steatoz ichishni to‘xtatgach 4–6 haftada qaytadi','Histology schematic: white = fat vacuoles; blue = fibrosis; steatosis reverses 4–6 weeks after abstinence'),850,880,{size:18});
    Object.assign(A,{eth:{el:B.eth.G,fx:.5,fy:0},adh:[340,310],acet:{el:B.ac.G,fx:.5,fy:0},aldh:[760,300],acetate:{el:B.at.G,fx:.5,fy:0},nadh:{el:nd1,fx:.5,fy:1},meos:{el:meos,fx:.5,fy:1},steat:{el:P1,fx:.5,fy:0},hepat:{el:P2,fx:.5,fy:0},cirr:{el:P3,fx:.5,fy:0}});
    R0={anchors:A,core:['eth','adh','acet','aldh','acetate','nadh','meos','steat','hepat','cirr'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;mol.forEach((c,i)=>{const q=(lt*.18+i/14)%1;const x=lerp(170,950,q);at(c,{cx:f2(x),cy:330+Math.sin(i*1.7)*14,fill:x<420?'#90CAF9':x<810?'#FF8A65':'#81C784',opacity:f2(Math.sin(Math.PI*q))})});
      pm.forEach((p,i)=>p.setAttribute('opacity',t>=8+i*1.5?1:.25));lit(B.ac,t>4.5&&t<8);st(t)}}}
  R0.update(0);return R0});
/* ---------- CHEMICAL BURN: acid (coagulative, self-limiting) vs alkali (liquefactive, deep) · irrigation ---------- */
const axes=(g,x,y,w,h,o)=>{const [xa,xb]=o.x,[ya,yb]=o.y;const lg=!!o.ylog;const px=v=>x+(v-xa)/(xb-xa)*w;const py=v=>lg?y+h-(Math.log10(v)-Math.log10(ya))/(Math.log10(yb)-Math.log10(ya))*h:y+h-(v-ya)/(yb-ya)*h;
  el('rect',{x,y,width:w,height:h,fill:'#0D1B2A',stroke:TH.faint,'stroke-width':2},g);
  (o.xt||[]).forEach(v=>{el('line',{x1:px(v),y1:y,x2:px(v),y2:y+h,stroke:TH.faint,'stroke-width':1,opacity:.5},g);txt(g,String(v),px(v),y+h+24,{size:16,color:'dim',weight:600})});
  (o.yt||[]).forEach(v=>{el('line',{x1:x,y1:py(v),x2:x+w,y2:py(v),stroke:TH.faint,'stroke-width':1,opacity:.5},g);txt(g,String(v),x-10,py(v)+6,{size:16,color:'dim',weight:600,anchor:'end'})});
  if(o.xl)txt(g,T(o.xl),x+w/2,y+h+50,{size:17,color:'ink',weight:700});if(o.yl)txt(g,T(o.yl),x,y-14,{size:17,color:'ink',weight:700,anchor:'start'});return {px,py}};
const pth=(fn,a,b,n)=>{let d='';for(let i=0;i<=n;i++){const v=a+(b-a)*i/n;const [X,Y]=fn(v);d+=(i?'L':'M')+f2(X)+','+f2(Y)}return d};
KIT.names(NAMES.uz,{epid:'Epidermis (~0,1 mm)',derm:'Derma (~2 mm)',subq:'Teri osti yog‘ qavati',eschar:'Koagulyatsion nekroz (qobiq to‘siq bo‘ladi)',liquef:'Kollikvatsion nekroz (yog‘lar sovunlanadi)',front:'Shikastlanish chegarasi',irrig:'Suv bilan yuvish (15–30+ daq)'});
KIT.names(NAMES.en,{epid:'Epidermis (~0.1 mm)',derm:'Dermis (~2 mm)',subq:'Subcutaneous fat',eschar:'Coagulative necrosis (eschar acts as barrier)',liquef:'Liquefactive necrosis (lipid saponification)',front:'Injury front',irrig:'Water irrigation (15–30+ min)'});
SM.items.burn=preset(1700,900,(g,it)=>{const A={},TT=it.cycle||14;const k=it.kind||'compare';if(!['compare'].includes(k))SERR.push(`burn: kind "${k}" → compare`);
  const S0=230,MM=120,BOT=610;// 1 mm = 120 px
  const skin=(x0,w,title,sub,col)=>{const G=el('g',{},g);txt(G,T(title),x0+w/2,BOT+42,{size:24,color:col,weight:800});txt(G,T(sub),x0+w/2,BOT+72,{size:17,color:'dim',weight:600});
    const cg=clipTo(G,['rect',{x:x0,y:S0,width:w,height:BOT-S0,rx:10}]);
    el('rect',{x:x0,y:S0,width:w,height:BOT-S0,fill:'#F3D9A4'},cg);// fat
    for(let i=0;i<9;i++)for(let j=0;j<2;j++)el('circle',{cx:x0+30+i*w/8.5+(j?20:0),cy:S0+12+2*MM+30+j*55,r:24,fill:'#FBE7B5',stroke:'#E0C27A','stroke-width':2},cg);
    el('rect',{x:x0,y:S0,width:w,height:12+2*MM,fill:'#E9A9A0'},cg);// dermis
    el('rect',{x:x0,y:S0,width:w,height:12,fill:'#C98B6B'},cg);// epidermis
    el('rect',{x:x0,y:S0,width:w,height:3,fill:'#8D6E63'},cg);
    for(let i=0;i<5;i++){const cx=x0+50+i*w/5;el('path',{d:`M${cx},${S0+12+40} q -${30} ${60} 0 ${120} t 0 ${80}`,stroke:'#C62828','stroke-width':4,fill:'none',opacity:.7},cg)}
    const hx=x0+w*.72;el('path',{d:`M${hx},${S0-4} L${hx+8},${S0+2.1*MM}`,stroke:'#5D4037','stroke-width':4},cg);el('ellipse',{cx:hx+9,cy:S0+2.15*MM,rx:12,ry:18,fill:'#A1887F'},cg);
    const sx=x0+w*.3;el('path',{d:`M${sx},${S0} q 10 ${MM} 0 ${1.9*MM}`,stroke:'#7E57C2','stroke-width':3,fill:'none'},cg);el('circle',{cx:sx,cy:S0+2*MM+6,r:16,fill:'none',stroke:'#7E57C2','stroke-width':4},cg);
    const dmg=el('rect',{x:x0+w*.12,y:S0,width:w*.76,height:0,fill:col,opacity:.55},cg);const fr=el('line',{x1:x0+w*.12,x2:x0+w*.88,y1:S0,y2:S0,stroke:col,'stroke-width':4,'stroke-dasharray':'12 7'},cg);
    el('rect',{x:x0,y:S0,width:w,height:BOT-S0,rx:10,fill:'none',stroke:TH.faint,'stroke-width':2},G);
    const drops=[...Array(14)].map((_,i)=>el('circle',{r:6,cx:x0+w*.15+i*w*.05,cy:S0-40,fill:'#4FC3F7',opacity:0},G));return {G,dmg,fr,drops,cg}};
  const L=skin(70,480,U('Kislota (HCl, H₂SO₄)','Acid (HCl, H₂SO₄)'),U('oqsil denaturatsiyasi → qattiq qobiq','protein denaturation → firm eschar'),'#8D4E2A');
  const R=skin(640,480,U('Ishqor (NaOH, KOH, CaO)','Alkali (NaOH, KOH, CaO)'),U('sovunlanish + oqsil erishi → chuqur kirish','saponification + protein dissolution → deep penetration'),'#C0CA33');
  const bub=[...Array(18)].map((_,i)=>el('circle',{r:4+i%3*2,fill:'#F0F4C3',opacity:.8},R.cg));
  sbar(g,70,BOT+120,MM,'1 mm');[0,1,2,3].forEach(m=>txt(g,m+' mm',1140,S0+m*MM+6,{size:15,color:'dim',weight:600,anchor:'start'}));
  const C=axes(g,1300,210,340,330,{x:[0,14],y:[0,3],xt:[0,4,8,12],yt:[0,1,2,3],xl:U('vaqt (daqiqa, sxematik)','time (min, schematic)'),yl:U('Shikast chuqurligi, mm','Injury depth, mm')});
  const dA=t=>.55*(1-Math.exp(-t/1.1));const dK=t=>t<8?Math.min(2.9,.85*Math.sqrt(t)):Math.min(2.9,.85*Math.sqrt(8)+.03*(t-8));
  el('path',{d:pth(t=>[C.px(t),C.py(dA(t))],0,14,80),stroke:'#D7894F','stroke-width':4,fill:'none'},g);el('path',{d:pth(t=>[C.px(t),C.py(dK(t))],0,14,80),stroke:'#C0CA33','stroke-width':4,fill:'none'},g);
  el('path',{d:pth(t=>[C.px(t),C.py(Math.min(2.9,.85*Math.sqrt(t)))],8,14,30),stroke:'#C0CA33','stroke-width':3,fill:'none','stroke-dasharray':'8 6',opacity:.6},g);
  txt(g,T(U('kislota','acid')),C.px(12),C.py(.55)-12,{size:16,color:'#D7894F',weight:700});txt(g,T(U('ishqor','alkali')),C.px(4),C.py(2)-14,{size:16,color:'#C0CA33',weight:700});txt(g,T(U('yuvilmasa','no irrigation')),C.px(11.2),C.py(2.9)+22,{size:14,color:'dim',weight:600});
  el('line',{x1:C.px(8),x2:C.px(8),y1:210,y2:540,stroke:'#4FC3F7','stroke-width':3,'stroke-dasharray':'6 5'},g);
  const cur=el('line',{y1:210,y2:540,stroke:TH.ink,'stroke-width':2},g);const pA=el('circle',{r:7,fill:'#D7894F'},g),pK=el('circle',{r:7,fill:'#C0CA33'},g);
  const st=steps(g,1270,640,[[0,U('Kimyoviy modda teriga tegdi','Chemical contacts skin')],[2,U('Kislota: qobiq hosil bo‘lib, o‘zini cheklaydi','Acid: eschar forms, self-limiting')],[4.5,U('Ishqor: derma va yog‘ qavatiga kiradi','Alkali: penetrates dermis and fat')],[8,U('Yuvish: konsentratsiya ↓, chuqurlashish sekinlashadi','Irrigation: dilution slows progression')]],{size:20});
  lines(g,1270,690,[U('Ko‘z: pH 7,0–7,5 bo‘lguncha yuvish (litrlab)','Eye: irrigate (litres) until pH 7.0–7.5'),U('Neytrallash mumkin emas — ekzotermik','Do not neutralise — exothermic'),U('HF: Ca²⁺ glyukonat (F⁻ kalsiyni bog‘laydi)','HF: calcium gluconate (F⁻ binds Ca²⁺)')],{size:17,dy:28});
  note(g,U('Teri kesimi masshtabda (1 mm = 120 px); chuqurlik egri chiziqlari sxematik — konsentratsiya, pH va ta’sir vaqtiga bog‘liq','Skin section to scale (1 mm = 120 px); depth curves schematic — depend on concentration, pH and contact time'),850,880,{size:18});
  Object.assign(A,{epid:[320,S0+6],derm:[200,S0+90],subq:[150,S0+2*MM+60],eschar:{el:L.dmg,fx:.5,fy:1},liquef:{el:R.dmg,fx:.6,fy:1},front:{el:R.fr,fx:.85,fy:.5},irrig:[880,S0-40]});
  const R0={anchors:A,core:['epid','derm','subq','eschar','liquef','front','irrig'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;const a=dA(t)*MM,b=dK(t)*MM;
    at(L.dmg,{height:f2(a),fill:t>1.5?'#5D3A1A':'#8D4E2A',opacity:f2(.45+.4*Math.min(1,t/3))});at(L.fr,{y1:f2(S0+a),y2:f2(S0+a)});at(R.dmg,{height:f2(b)});at(R.fr,{y1:f2(S0+b),y2:f2(S0+b)});
    bub.forEach((c,i)=>{const q=(i*.37)%1;const yy=S0+((q+lt*.05)%1)*b;at(c,{cx:f2(640+480*.15+((i*53)%340)),cy:f2(yy),opacity:b>10?.75:0})});
    [L,R].forEach(P=>P.drops.forEach((d,i)=>{const on=t>=8;const q=(lt*1.2+i*.31)%1;at(d,{cy:f2(S0-70+q*68),opacity:on?f2(.9*(1-q*.6)):0})}));
    at(cur,{x1:f2(C.px(t)),x2:f2(C.px(t))});at(pA,{cx:f2(C.px(t)),cy:f2(C.py(dA(t)))});at(pK,{cx:f2(C.px(t)),cy:f2(C.py(dK(t)))});st(t)}};
  R0.update(0);return R0});
/* ---------- FREE RADICALS: ROS generation & defence · lipid peroxidation chain (initiation/propagation/termination) ---------- */
KIT.names(NAMES.uz,{mito:'Mitoxondriya (ETZ)',o2:'O₂',sup:'Superoksid O₂•⁻',h2o2:'Vodorod peroksid H₂O₂',oh:'Gidroksil radikal OH•',sod:'SOD',cat:'Katalaza / GPx',water:'H₂O + O₂',fe:'Fe²⁺ (Fenton)',dna:'DNK: 8-okso-dG',prot:'Oqsillar: karbonillanish',lip:'Lipidlar: peroksidlanish',
  memb:'Fosfolipid qo‘sh qavat',pufa:'PUFA dumi (LH)',lrad:'Lipid radikal L•',loo:'Peroksil radikal LOO•',looh:'Lipid gidroperoksid LOOH',vite:'Vitamin E (α-tokoferol)',vitc:'Vitamin C (suvli faza)',ini:'Boshlanish: OH• H atomini tortib oladi'});
KIT.names(NAMES.en,{mito:'Mitochondrion (ETC)',o2:'O₂',sup:'Superoxide O₂•⁻',h2o2:'Hydrogen peroxide H₂O₂',oh:'Hydroxyl radical OH•',sod:'SOD',cat:'Catalase / GPx',water:'H₂O + O₂',fe:'Fe²⁺ (Fenton)',dna:'DNA: 8-oxo-dG',prot:'Proteins: carbonylation',lip:'Lipids: peroxidation',
  memb:'Phospholipid bilayer',pufa:'PUFA tail (LH)',lrad:'Lipid radical L•',loo:'Peroxyl radical LOO•',looh:'Lipid hydroperoxide LOOH',vite:'Vitamin E (α-tocopherol)',vitc:'Vitamin C (aqueous phase)',ini:'Initiation: OH• abstracts an H atom'});
SM.items.radical=preset(1700,900,(g,it)=>{const k=it.kind||'ros',A={};if(!['ros','peroxidation'].includes(k))SERR.push(`radical: kind "${k}" → ros, peroxidation`);const TT=it.cycle||(k==='peroxidation'?11:14);let R0;
  const ar=(a,b,c,w)=>el('path',{d:`M${a[0]},${a[1]} L${b[0]},${b[1]}`,stroke:c||TH.ink,'stroke-width':w||4,'marker-end':arrowMarker(c||'ink'),fill:'none'},g);
  if(k==='ros'){
    const mx=190,my=300;el('ellipse',{cx:mx,cy:my,rx:130,ry:80,fill:'#C9714F',stroke:'#F2B38F','stroke-width':5},g);el('ellipse',{cx:mx,cy:my,rx:112,ry:62,fill:'#E9967A'},g);
    for(let i=0;i<6;i++){const x=mx-90+i*36;el('path',{d:`M${x},${my-62} q 14 45 0 ${(i%2?70:55)}`,stroke:'#F2B38F','stroke-width':6,fill:'none'},g)}
    sbar(g,mx-50,my+120,100,'~0,5 µm');
    const B={o2:box(g,440,200,120,56,'O₂','#90CAF9'),su:box(g,700,200,170,56,'O₂•⁻','#FF8A65'),hp:box(g,990,200,170,56,'H₂O₂','#FFD54F'),w:box(g,1300,200,190,56,'H₂O + O₂','#81C784'),oh:box(g,990,430,150,60,'OH•','#FF1744',{size:24}),
      dna:box(g,620,650,250,56,T(U('DNK','DNA')),'#CE93D8'),pr:box(g,990,650,250,56,T(U('Oqsillar','Proteins')),'#CE93D8'),li:box(g,1360,650,250,56,T(U('Lipidlar','Lipids')),'#CE93D8')};
    ar([500,200],[608,200]);ar([785,200],[898,200]);ar([1075,200],[1198,200]);ar([990,228],[990,392],'#FF1744');ar([960,460],[660,618],'#FF1744');ar([990,460],[990,615],'#FF1744');ar([1020,460],[1320,618],'#FF1744');
    ar([320,280],[380,215]);txt(g,'e⁻',345,236,{size:18,color:'#FFD54F',weight:800});
    
    const feb=el('g',{},g);el('circle',{cx:1180,cy:330,r:30,fill:'#8D6E63',stroke:'#FFAB91','stroke-width':3},feb);txt(feb,'Fe²⁺',1180,337,{size:18,color:'ink',weight:800});ar([1150,345],[1060,410],'#FFAB91',3);
    txt(g,'Fenton: Fe²⁺ + H₂O₂ → Fe³⁺ + OH⁻ + OH•',1230,300,{size:17,color:'#FFAB91',weight:700,anchor:'start'});
    [[620,U('8-okso-dG, uzilishlar','8-oxo-dG, strand breaks')],[990,U('karbonillanish, –SH oksidlanishi','carbonylation, –SH oxidation')],[1360,U('peroksidlanish → MDA, 4-HNE','peroxidation → MDA, 4-HNE')]].forEach(([x,s])=>txt(g,T(s),x,705,{size:16,color:'dim',weight:600}));
    lines(g,60,470,[U('Hayot davomiyligi:','Lifetime:'),U('O₂•⁻ ~10⁻⁶ s · H₂O₂ barqaror (membranadan o‘tadi)','O₂•⁻ ~10⁻⁶ s · H₂O₂ stable (crosses membranes)'),U('OH• ~10⁻⁹ s → bir necha nm ichida reaksiya','OH• ~10⁻⁹ s → reacts within a few nm'),U('SOD ~2×10⁹ M⁻¹s⁻¹ (diffuziya chegarasi)','SOD ~2×10⁹ M⁻¹s⁻¹ (diffusion-limited)')],{size:16,dy:26});
    const gox=gauge(g,60,640,300,U('ROS yuklamasi','ROS load'),'#FF5252'),gan=gauge(g,60,720,300,U('Antioksidant zaxirasi (GSH, vit C, E)','Antioxidant reserve (GSH, vit C, E)'),'#81C784');
    const st=steps(g,440,110,[[0,U('Me’yor: SOD va katalaza ROS ni zararsizlantiradi','Normal: SOD and catalase detoxify ROS')],[3.5,U('Stress (reperfuziya, nurlanish, yallig‘lanish): O₂•⁻ ↑','Stress (reperfusion, radiation, inflammation): O₂•⁻ ↑')],[6.5,U('Erkin Fe²⁺ → Fenton → OH• (eng reaktiv)','Free Fe²⁺ → Fenton → OH• (most reactive)')],[9,U('OH• DNK, oqsil va lipidlarni shikastlaydi','OH• damages DNA, proteins and lipids')],[12,U('Antioksidantlar muvozanatni tiklaydi','Antioxidants restore the balance')]],{size:22});
    note(g,U('Sxema; tezliklar Halliwell & Gutteridge bo‘yicha. O₂ ning ~0,2–2% i ETZ da O₂•⁻ ga aylanadi','Schematic; rates per Halliwell & Gutteridge. ~0.2–2% of O₂ becomes O₂•⁻ in the ETC'),850,880,{size:18});
    const pt=[...Array(26)].map(()=>el('circle',{r:7,fill:'#FF8A65'},g));
    const rt=[[[320,280],[440,200],[700,200],[990,200],[1300,200]],[[320,280],[440,200],[700,200],[990,200],[990,430],[620,650]],[[320,280],[440,200],[700,200],[990,200],[990,430],[990,650]],[[320,280],[440,200],[700,200],[990,200],[990,430],[1360,650]]];
    const along=(P,q)=>{const L=[];let tot=0;for(let i=1;i<P.length;i++){const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);L.push(d);tot+=d}let s=q*tot;for(let i=0;i<L.length;i++){if(s<=L[i]){const u=s/L[i];return [lerp(P[i][0],P[i+1][0],u),lerp(P[i][1],P[i+1][1],u),i]}s-=L[i]}const e=P[P.length-1];return [e[0],e[1],L.length-1]};
    Object.assign(A,{mito:[mx,my-80],o2:{el:B.o2.G,fx:.5,fy:0},sup:{el:B.su.G,fx:.5,fy:0},h2o2:{el:B.hp.G,fx:.5,fy:0},water:{el:B.w.G,fx:.5,fy:0},sod:[842,175],cat:[1137,175],oh:{el:B.oh.G,fx:0,fy:.5},fe:{el:feb,fx:.5,fy:1},dna:{el:B.dna.G,fx:.5,fy:1},prot:{el:B.pr.G,fx:.5,fy:1},lip:{el:B.li.G,fx:.5,fy:1}});
    R0={anchors:A,core:['mito','o2','sup','h2o2','water','sod','cat','oh','fe','dna','prot','lip'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;const str=t<3.5?0:t<6.5?(t-3.5)/3:t<12?1:Math.max(0,1-(t-12)/2);const fen=t>=6.5&&t<12.5?1:0;
      pt.forEach((c,i)=>{const bad=fen&&(i%3!==0)&&i<6+20*str;const r=bad?rt[1+i%3]:rt[0];const q=(lt*.11+i/26)%1;const [x,y,s]=along(r,q);const on=i<8+18*str;
        const col=s===0?'#FFD54F':s===1?'#90CAF9':s===2?'#FF8A65':s===3?(bad?'#FFD54F':'#81C784'):s===4?'#FF1744':'#CE93D8';at(c,{cx:f2(x),cy:f2(y),fill:col,opacity:on?.95:0})});
      lit(B.su,str>.3);lit(B.oh,fen);[B.dna,B.pr,B.li].forEach(b=>lit(b,t>=9&&t<13));at(feb,{opacity:fen?1:.35});gox(.15+.8*str,'');gan(1-.65*(t>=6.5&&t<12?Math.min(1,(t-6.5)/3):t>=12?Math.max(0,1-(t-12)/2):0),'');st(t)}};
  }else{
    const vE=it.vitE!==false,N=16,X0=120,DX=68,YH=330,YL=560;const L=[];
    el('rect',{x:80,y:YH-26,width:1120,height:YL-YH+52,rx:16,fill:'#13263A',opacity:.6},g);txt(g,T(U('suvli faza (hujayradan tashqari)','aqueous phase (extracellular)')),330,285,{size:17,color:'dim',weight:600});txt(g,T(U('sitozol','cytosol')),640,640,{size:17,color:'dim',weight:600});
    const tail=(x,y,dir,pufa)=>{let d=`M${x},${y}`;for(let j=1;j<=7;j++)d+=` L${x+(j%2?7:-7)+(pufa&&j>3?(j%2?6:0):0)},${y+dir*j*13}`;return el('path',{d,stroke:'#FFE082','stroke-width':4,fill:'none','stroke-linejoin':'round'},g)};
    for(let i=0;i<N;i++){const x=X0+i*DX;tail(x-8,YL-14,-1,false);tail(x+8,YL-14,-1,i%3===0);el('circle',{cx:x,cy:YL,r:15,fill:'#64B5F6',stroke:'#BBDEFB','stroke-width':2},g);if(vE&&i===9)continue;
      tail(x-8,YH+14,1,false);const t2=tail(x+8,YH+14,1,true);const h=el('circle',{cx:x,cy:YH,r:15,fill:'#64B5F6',stroke:'#BBDEFB','stroke-width':2},g);L[i]={x,t2,h}}
    let ve=null;if(vE){const x=X0+9*DX;ve=el('g',{},g);el('path',{d:`M${x},${YH+30} l0,90`,stroke:'#FBC02D','stroke-width':5},ve);el('path',{d:`M${x-16},${YH-6} l16,-12 l16,12 l0,22 l-16,12 l-16,-12 z`,fill:'#FBC02D',stroke:'#FFF59D','stroke-width':3},ve);txt(ve,'OH',x,YH-24,{size:15,color:'#FFF59D',weight:800});
      const vc=el('g',{},g);el('circle',{cx:x+50,cy:YH-80,r:20,fill:'#FF9800'},vc);txt(vc,'C',x+50,YH-73,{size:18,color:'ink',weight:800});A.vitc={el:vc,fx:.5,fy:0}}
    const oh=el('g',{},g);el('circle',{r:16,fill:'#FF1744'},oh);txt(oh,'OH•',0,-24,{size:16,color:'#FF8A80',weight:800});
    const rad=el('circle',{r:13,fill:'none',stroke:'#FF1744','stroke-width':5},g);const o2=el('g',{},g);el('circle',{cx:-8,r:9,fill:'#90CAF9'},o2);el('circle',{cx:8,r:9,fill:'#90CAF9'},o2);
    sbar(g,90,720,DX*1.25,'~1 nm');txt(g,T(U('qalinlik ~4–5 nm','thickness ~4–5 nm')),1215,450,{size:15,color:'dim',weight:600,anchor:'start'});
    const C=axes(g,1320,150,320,250,{x:[0,TT],y:[0,16],xt:[0,5,10],yt:[0,8,16],xl:U('vaqt (sxematik)','time (schematic)'),yl:U('Oksidlangan lipidlar soni','Oxidised lipids')});
    const tH=i=>1.2+i*.6;const nOx=t=>{let n=0;for(let i=0;i<N;i++){if(vE&&i>=9)break;if(t>=tH(i)+.4)n++}return n};
    el('path',{d:pth(t=>[C.px(t),C.py(nOx(t))],0,TT,140),stroke:vE?'#FBC02D':'#FF5252','stroke-width':4,fill:'none'},g);const cur=el('circle',{r:7,fill:TH.ink},g);
    txt(g,T(vE?U('vitamin E bilan: zanjir uziladi','with vitamin E: chain terminated'):U('vitamin E siz: zanjir davom etadi','without vitamin E: chain continues')),1480,465,{size:16,color:vE?'#FBC02D':'#FF8A80',weight:700});
    const EQ=['LH + OH• → L• + H₂O','L• + O₂ → LOO•','LOO• + LH → LOOH + L•','LOO• + TocOH → LOOH + TocO•','TocO• + Asc → TocOH + Asc•'];
    const eqT=EQ.map((s,i)=>txt(g,(i+1)+')  '+s,1320,530+i*34,{size:19,color:'dim',weight:700,anchor:'start'}));
    const st=steps(g,90,130,[[0,U('Boshlanish: OH• PUFA dan H atomini tortib oladi','Initiation: OH• abstracts H from a PUFA')],[1.8,U('Tarqalish: L• + O₂ → LOO• → qo‘shni lipidga hujum','Propagation: L• + O₂ → LOO• → attacks neighbour')],[vE?6.6:8,vE?U('To‘xtash: vitamin E radikalni ushlaydi; vit C uni tiklaydi','Termination: vitamin E traps the radical; vit C regenerates it'):U('Zanjir: bitta OH• → o‘nlab LOOH (membrana buziladi)','Chain: one OH• → dozens of LOOH (membrane breaks down)')]],{size:22});
    note(g,U('Sxema: zanjir bitta qatlamda ko‘rsatilgan. Mahsulotlar MDA va 4-HNE — oksidlovchi stress biomarkerlari','Schematic: chain shown in one leaflet. Products MDA and 4-HNE are oxidative-stress biomarkers'),850,880,{size:18});
    Object.assign(A,{memb:[X0+DX*14,YL+20],pufa:{el:L[2].t2,fx:.5,fy:.6},lrad:[X0+DX*4,YH+60],loo:[X0+DX*6,YH-30],looh:[X0+DX,YH+80],ini:[X0,YH-60]});if(vE)A.vite={el:ve,fx:.5,fy:0};
    R0={anchors:A,core:['memb','pufa','lrad','loo','looh','ini'].concat(vE?['vite','vitc']:[]),labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;
      const s0=Math.min(1,t/1.2);at(oh,{transform:`translate(${f2(lerp(X0-60,X0,s0))},${f2(lerp(YH-140,YH+40,s0))})`,opacity:t<1.4?1:0});
      let active=-1;for(let i=0;i<N;i++){if(!L[i])continue;const t0=tH(i);const on=t>=t0;at(L[i].t2,{stroke:!on?'#FFE082':t<t0+.4?'#FF1744':'#8D6E63','stroke-width':on?5:4});at(L[i].h,{fill:on&&t>=t0+.4?'#90A4AE':'#64B5F6'});if(on&&t<t0+.6)active=i}
      const stop=vE&&t>=tH(9)-.05;
      if(active>=0&&!stop){const u=(t-tH(active))/.6;at(rad,{cx:f2(L[active].x+8+(u>.5?DX*(u-.5)*2:0)),cy:YH+60,opacity:1,stroke:'#FF1744'});at(o2,{transform:`translate(${f2(L[active].x+30)},${f2(YH+60-30*(1-u))})`,opacity:u>.15&&u<.55?1:0})}
      else if(stop&&t<tH(9)+2){at(rad,{cx:X0+9*DX,cy:YH+10,opacity:f2(Math.max(0,1-(t-tH(9))/2)),stroke:'#FBC02D'});at(o2,{opacity:0})}else{at(rad,{opacity:0});at(o2,{opacity:0})}
      const e=t<1.4?0:stop?(t<tH(9)+1?3:4):(Math.floor((t-1.2)/.3)%2?2:1);eqT.forEach((n,i)=>at(n,{fill:i===e?'#FFD54F':TH.dim}));
      at(cur,{cx:f2(C.px(t)),cy:f2(C.py(nOx(t)))});st(t)}};
  }
  R0.update(0);return R0});
/* ---------- IONISING RADIATION: DNA damage (direct/indirect, SSB/DSB, repair) · cell survival (LQ) & dose ladder ---------- */
KIT.names(NAMES.uz,{helix:'DNK qo‘sh spirali (Ø 2 nm, 10,5 jp/aylana)',photon:'γ/rentgen fotoni (to‘g‘ridan-to‘g‘ri ta’sir ~⅓)',water:'Suv radiolizi: H₂O → OH• + e⁻aq + H•',ohr:'OH• (bilvosita ta’sir ~⅔)',ssb:'Bir zanjirli uzilish (SSB)',dsb:'Ikki zanjirli uzilish (DSB)',ku:'Ku70/80 → NHEJ (DNK-PKcs, ligaza IV)',
  lq:'Chiziqli-kvadratik model: S = e^(−αD−βD²)',early:'α/β ≈ 10 Gy (o‘sma, tez yangilanuvchi to‘qima)',late:'α/β ≈ 3 Gy (kech reaksiya beruvchi to‘qima)',cells:'Klonogen hujayralar (100 ta)',ladder:'Doza shkalasi (log)'});
KIT.names(NAMES.en,{helix:'DNA double helix (Ø 2 nm, 10.5 bp/turn)',photon:'γ/X-ray photon (direct action ~⅓)',water:'Water radiolysis: H₂O → OH• + e⁻aq + H•',ohr:'OH• (indirect action ~⅔)',ssb:'Single-strand break (SSB)',dsb:'Double-strand break (DSB)',ku:'Ku70/80 → NHEJ (DNA-PKcs, ligase IV)',
  lq:'Linear-quadratic model: S = e^(−αD−βD²)',early:'α/β ≈ 10 Gy (tumour, early-responding tissue)',late:'α/β ≈ 3 Gy (late-responding tissue)',cells:'Clonogenic cells (100)',ladder:'Dose ladder (log)'});
SM.items.radiation=preset(1700,900,(g,it)=>{const k=it.kind||'dna',A={};if(!['dna','survival'].includes(k))SERR.push(`radiation: kind "${k}" → dna, survival`);const TT=it.cycle||12;let R0;
  if(k==='dna'){
    const NM=40,X0=150,NB=66,BP=.34*NM,PER=10.5*BP,AMP=NM,Y=420;const yA=x=>Y+AMP*Math.sin(2*Math.PI*(x-X0)/PER),yB=x=>Y+AMP*Math.sin(2*Math.PI*(x-X0)/PER+2.4);
    const xb=i=>X0+i*BP;const cols=['#4FC3F7','#FFB74D','#81C784','#F06292'];
    for(let i=0;i<NB;i++){const x=xb(i)+BP/2;el('line',{x1:x,y1:yA(x),x2:x,y2:yB(x),stroke:cols[(i*7)%4],'stroke-width':4,opacity:.7},g)}
    const seg=(f,i,c)=>{let d='';for(let j=0;j<=4;j++){const x=xb(i)+BP*j/4;d+=(j?'L':'M')+f2(x)+','+f2(f(x))}return el('path',{d,stroke:c,'stroke-width':7,fill:'none','stroke-linecap':'round'},g)};
    const SA=[],SB=[];for(let i=0;i<NB;i++){SA.push(seg(yA,i,'#B0BEC5'));SB.push(seg(yB,i,'#78909C'))}
    sbar(g,X0,Y+110,2*NM,'2 nm');txt(g,T(U('1 aylana = 3,4 nm','1 turn = 3.4 nm')),X0+PER/2+200,Y+104,{size:16,color:'dim',weight:600});
    const W=[...Array(16)].map((_,i)=>{const x=X0+40+i*56,y=(i%2?Y-150:Y+150)+((i*37)%30);const G=el('g',{transform:`translate(${x},${y})`},g);el('circle',{r:9,fill:'#EF5350'},G);el('circle',{cx:-10,cy:8,r:6,fill:'#ECEFF1'},G);el('circle',{cx:10,cy:8,r:6,fill:'#ECEFF1'},G);return G});
    const wx=xb(30)+BP/2;const wat=el('g',{transform:`translate(${f2(wx)},${Y+170})`},g);el('circle',{r:10,fill:'#EF5350'},wat);el('circle',{cx:-11,cy:8,r:6,fill:'#ECEFF1'},wat);el('circle',{cx:11,cy:8,r:6,fill:'#ECEFF1'},wat);
    const trk=(x1,y1,x2,y2)=>{let d=`M${x1},${y1}`;const n=24;for(let j=1;j<=n;j++){const u=j/n,x=lerp(x1,x2,u),y=lerp(y1,y2,u);const o=(j%2?1:-1)*8;d+=` L${f2(x+o*.7)},${f2(y+o*.7)}`}return el('path',{d,stroke:'#FFF176','stroke-width':3,fill:'none',opacity:0},g)};
    const x12=xb(12)+BP/2,x51=xb(51)+BP/2;const T1=trk(x12-200,Y-300,x12,yA(x12)),T2=trk(wx-260,Y+340,wx,Y+170),T3=trk(x51-150,Y-300,x51+30,Y+300);
    const ohd=el('g',{},g);el('circle',{r:11,fill:'#FF1744'},ohd);txt(ohd,'OH•',0,-18,{size:15,color:'#FF8A80',weight:800});
    const flash=el('circle',{r:0,fill:'#FFF59D',opacity:0},g);const x50=xb(50)+BP/2;const ku=el('g',{opacity:0},g);el('ellipse',{cx:x50+BP,cy:Y,rx:38,ry:56,fill:'none',stroke:'#BA68C8','stroke-width':8},ku);el('ellipse',{cx:x50+BP,cy:Y,rx:20,ry:40,fill:'#BA68C8',opacity:.25},ku);
    const x30=xb(30)+BP/2;
    // right panel
    const RX=1230;txt(g,T(U('1 Gy (bir hujayraga):','Per 1 Gy (per cell):')),RX,170,{size:20,color:'ink',weight:800,anchor:'start'});
    lines(g,RX,205,[U('~1000 SSB','~1000 SSB'),U('~20–40 DSB','~20–40 DSB'),U('~2000 asos shikasti','~2000 base lesions')],{size:18,dy:28,color:'ink'});
    txt(g,T(U('Kam LET (γ, rentgen):','Low LET (γ, X-ray):')),RX,330,{size:18,color:'ink',weight:700,anchor:'start'});
    el('rect',{x:RX,y:345,width:130,height:26,fill:'#FFF176'},g);el('rect',{x:RX+130,y:345,width:260,height:26,fill:'#FF1744'},g);txt(g,T(U('to‘g‘ri ⅓','direct ⅓')),RX+65,364,{size:15,color:'#0D1B2A',weight:800});txt(g,T(U('bilvosita (OH•) ⅔','indirect (OH•) ⅔')),RX+260,364,{size:15,color:'ink',weight:800});
    const nh=box(g,RX+95,450,190,60,'NHEJ','#BA68C8'),hr=box(g,RX+310,450,190,60,'HR','#4DB6AC');
    lines(g,RX,510,[U('NHEJ: G₀/G₁, tez, xatoga moyil','NHEJ: G₀/G₁, fast, error-prone'),U('HR: S/G₂, opa-singil xromatida — aniq','HR: S/G₂, sister chromatid — accurate'),U('SSB: BER/SSBR, minutlarda','SSB: BER/SSBR, within minutes'),U('Tuzatilmagan DSB → aberratsiya, o‘lim','Unrepaired DSB → aberrations, death')],{size:17,dy:28});
    const st=steps(g,150,120,[[0,U('Foton DNK ga to‘g‘ridan-to‘g‘ri uriladi → SSB','Photon hits DNA directly → SSB')],[3,U('Suv radiolizi → OH• DNK ga diffuziyalanadi → SSB','Water radiolysis → OH• diffuses to DNA → SSB')],[5.8,U('Ikki uzilish ≤10 jp oralig‘ida → DSB (eng xavfli)','Two breaks ≤10 bp apart → DSB (most lethal)')],[8,U('Ku70/80 uchlarni ushlaydi → NHEJ; SSB lar BER bilan tuzaladi','Ku70/80 grabs ends → NHEJ; SSBs fixed by BER')]],{size:22});
    note(g,U('DNK masshtabda: 1 nm = 40 px (66 jp ≈ 22 nm). Suv molekulalari kattalashtirilgan; trek sxematik','DNA to scale: 1 nm = 40 px (66 bp ≈ 22 nm). Water molecules enlarged; tracks schematic'),850,880,{size:18});
    Object.assign(A,{helix:[xb(22),yA(xb(22))],photon:[x12-150,Y-225],water:{el:W[1],fx:.5,fy:0},ohr:[x30,Y+120],ssb:[x12,yA(x12)],dsb:[x51,Y],ku:[x50+BP,Y+56]});
    R0={anchors:A,core:['helix','photon','water','ohr','ssb','dsb','ku'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;
      at(T1,{opacity:t>.3&&t<1.6?1:0});at(T2,{opacity:t>3&&t<3.8?1:0});at(T3,{opacity:t>5.8&&t<6.6?1:0});
      const rep1=t>=9.2,repD=t>=10.3;const br=(arr,i,on)=>at(arr[i],{opacity:on?0:1,stroke:on?'#FF1744':(arr===SA?'#B0BEC5':'#78909C')});
      br(SA,12,t>=1.2&&!rep1);br(SB,30,t>=5&&!rep1);br(SA,51,t>=6.3&&!repD);br(SB,53,t>=6.3&&!repD);
      [SA[12],SB[30]].forEach(s=>{if(rep1&&t<10)at(s,{stroke:'#81C784'})});if(repD&&t<11.3){at(SA[51],{stroke:'#BA68C8'});at(SB[53],{stroke:'#BA68C8'})}
      at(wat,{opacity:t<3.6?1:0});
      if(t>=3.6&&t<5){const u=(t-3.6)/1.4;at(ohd,{transform:`translate(${f2(x30)},${f2(lerp(Y+170,yB(x30)+10,u))})`,opacity:1})}else at(ohd,{opacity:0});
      const fl=(t0,x,y)=>t>=t0&&t<t0+.6?[x,y,(t-t0)/.6]:null;const F=fl(1.2,x12,yA(x12))||fl(5,x30,yB(x30))||fl(6.3,x51,Y);if(F)at(flash,{cx:f2(F[0]),cy:f2(F[1]),r:f2(10+40*F[2]),opacity:f2(.8*(1-F[2]))});else at(flash,{opacity:0});
      at(ku,{opacity:t>=8&&t<11.3?1:0});lit(nh,t>=8&&t<11.3);W.forEach((w,i)=>at(w,{opacity:.55}));st(t)}};
  }else{
    const cA=[.35,.035],cB=[.15,.05];const S=(c,D)=>Math.exp(-c[0]*D-c[1]*D*D);
    const C=axes(g,150,170,560,440,{x:[0,10],y:[.001,1],ylog:true,xt:[0,2,4,6,8,10],yt:[1,.1,.01,.001],xl:U('Doza, Gy (bir martalik)','Dose, Gy (single fraction)'),yl:U('Yashab qolgan ulush (log)','Surviving fraction (log)')});
    const cv1=el('path',{d:pth(D=>[C.px(D),C.py(Math.max(.001,S(cA,D)))],0,10,100),stroke:'#FF8A65','stroke-width':5,fill:'none'},g);const cv2=el('path',{d:pth(D=>[C.px(D),C.py(Math.max(.001,S(cB,D)))],0,10,100),stroke:'#4FC3F7','stroke-width':5,fill:'none'},g);
    el('line',{x1:C.px(2),x2:C.px(2),y1:170,y2:610,stroke:'#81C784','stroke-width':2,'stroke-dasharray':'6 5'},g);txt(g,'SF2',C.px(2)+6,600,{size:15,color:'#81C784',weight:800,anchor:'start'});
    const cur=el('line',{y1:170,y2:610,stroke:TH.ink,'stroke-width':2},g);const p1=el('circle',{r:8,fill:'#FF8A65'},g),p2=el('circle',{r:8,fill:'#4FC3F7'},g);
    const GX=830,GY=200,GS=34,cells=[];const rk=[...Array(100).keys()].map(i=>(i*37+11)%100);for(let i=0;i<100;i++){const x=GX+(i%10)*GS,y=GY+Math.floor(i/10)*GS;cells.push(el('circle',{cx:x,cy:y,r:13,fill:'#FF8A65',stroke:'#FFCCBC','stroke-width':2},g))}
    const gcap=el('g',{},g);const gtx=el('text',{x:GX+150,y:GY+10*GS+20,'font-size':20,'font-weight':800,fill:TH.ink,'text-anchor':'middle'},gcap);
    const LX=1350,LY0=150,LY1=760;const ly=v=>LY1-(Math.log10(v)+2)/(Math.log10(20000)+2)*(LY1-LY0);el('line',{x1:LX,x2:LX,y1:LY0,y2:LY1,stroke:TH.faint,'stroke-width':4},g);
    const LAD=[[.02,U('Ko‘krak rentgeni ~0,02 mSv','Chest X-ray ~0.02 mSv')],[2.4,U('Yillik tabiiy fon ~2,4 mSv','Annual background ~2.4 mSv')],[10,U('KT (qorin) ~10 mSv','CT abdomen ~10 mSv')],[20,U('Kasbiy yillik limit 20 mSv','Occupational limit 20 mSv/yr')],[100,U('100 mSv: saraton xavfi ↑ aniqlanadi','100 mSv: detectable cancer risk ↑')],[1000,U('1 Gy: o‘tkir nur kasalligi chegarasi','1 Gy: acute radiation syndrome threshold')],[4500,U('LD50/60 ≈ 3,5–5 Gy (davolanmasa)','LD50/60 ≈ 3.5–5 Gy (untreated)')],[10000,U('≥10 Gy: oshqozon-ichak sindromi','≥10 Gy: gastrointestinal syndrome')]];
    LAD.forEach(([v,s],i)=>{const y=ly(v);el('circle',{cx:LX,cy:y,r:7,fill:v>=1000?'#FF5252':v>=100?'#FFB74D':'#81C784'},g);txt(g,T(s),LX+18,y+6,{size:16,color:'ink',weight:600,anchor:'start'})});
    txt(g,'mSv',LX,LY1+30,{size:16,color:'dim',weight:700});const lc=el('path',{d:'',fill:'#FFD54F'},g);
    const st=steps(g,150,120,[[0,U('Doza oshadi → klonogen hujayralar ulushi kamayadi','Dose rises → clonogenic fraction falls')],[4,U('Yelka (β·D²): kam dozada tuzatish ulguradi','Shoulder (β·D²): repair keeps pace at low dose')],[8,U('Fraksiyalash (2 Gy × n) kech to‘qimalarni ayaydi','Fractionation (2 Gy × n) spares late tissues')]],{size:22});
    note(g,U('LQ parametrlari tipik qiymatlar; γ-nurlar uchun 1 Gy ≈ 1 Sv. Dozalar ICRP/UNSCEAR bo‘yicha taxminiy','Typical LQ parameters; for γ-rays 1 Gy ≈ 1 Sv. Doses approximate per ICRP/UNSCEAR'),850,880,{size:18});
    Object.assign(A,{lq:{el:cv1,fx:.12,fy:.15},early:{el:cv1,fx:.75,fy:.8},late:{el:cv2,fx:.6,fy:.55},cells:{el:cells[4],fx:.5,fy:0},ladder:[LX,LY0]});
    R0={anchors:A,core:['lq','early','late','cells','ladder'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;const D=Math.min(10,10*t/(TT-2));
      at(cur,{x1:f2(C.px(D)),x2:f2(C.px(D))});at(p1,{cx:f2(C.px(D)),cy:f2(C.py(Math.max(.001,S(cA,D))))});at(p2,{cx:f2(C.px(D)),cy:f2(C.py(Math.max(.001,S(cB,D))))});
      const sv=S(cA,D)*100;cells.forEach((c,i)=>{const alive=rk[i]<sv||(rk[i]<1&&sv>.5);at(c,{fill:alive?'#FF8A65':'#37474F',r:alive?13:8,stroke:alive?'#FFCCBC':'#546E7A'})});
      gtx.textContent=`${D.toFixed(1)} Gy → ${sv>=1?sv.toFixed(0):sv.toFixed(2)}%`;
      const y=ly(Math.max(.01,D*1000));at(lc,{d:`M${LX-12},${f2(y)} l-18,-10 l0,20 z`});st(t)}};
  }
  R0.update(0);return R0});
/* ---------- DENTAL CARIES: Stephan curve & de-/remineralisation · lesion progression enamel → dentin → pulp ---------- */
KIT.names(NAMES.uz,{plaque:'Tish karashi (biofilm)',smut:'Streptococcus mutans (zanjir koklar)',sugar:'Saxaroza',lactic:'Sut kislotasi → H⁺',enamel:'Emal: gidroksiapatit (~96% mineral)',ca:'Ca²⁺, PO₄³⁻ chiqadi (demineralizatsiya)',fluor:'F⁻ → ftorapatit (kritik pH ~4,5)',saliva:'So‘lak: HCO₃⁻ bufer, Ca²⁺ qaytadi',
  dentin:'Dentin (~70% mineral, kanalchalar)',pulp:'Pulpa (nerv, tomirlar)',white:'Oq dog‘ (yuzaosti demineralizatsiya)',cavity:'Kavitatsiya',dles:'Dentin kariyesi (EDB bo‘ylab tarqaladi)',tub:'Dentin kanalchalari (Ø 1–2,5 µm)',absc:'Periapikal absess'});
KIT.names(NAMES.en,{plaque:'Dental plaque (biofilm)',smut:'Streptococcus mutans (chained cocci)',sugar:'Sucrose',lactic:'Lactic acid → H⁺',enamel:'Enamel: hydroxyapatite (~96% mineral)',ca:'Ca²⁺, PO₄³⁻ leave (demineralisation)',fluor:'F⁻ → fluorapatite (critical pH ~4.5)',saliva:'Saliva: HCO₃⁻ buffer, Ca²⁺ returns',
  dentin:'Dentin (~70% mineral, tubules)',pulp:'Pulp (nerves, vessels)',white:'White spot (subsurface demineralisation)',cavity:'Cavitation',dles:'Dentin caries (spreads along DEJ)',tub:'Dentinal tubules (Ø 1–2.5 µm)',absc:'Periapical abscess'});
SM.items.caries=preset(1700,900,(g,it)=>{const k=it.kind||'stephan',A={};if(!['stephan','lesion'].includes(k))SERR.push(`caries: kind "${k}" → stephan, lesion`);const TT=it.cycle||12;let R0;
  if(k==='stephan'){
    const pH=m=>m<2.5?6.8:6.8-1.9*(1-Math.exp(-(m-2.5)/2.5))*Math.exp(-Math.max(0,m-8)/14);const MIN=t=>t/TT*60;
    el('rect',{x:80,y:150,width:660,height:230,rx:14,fill:'#5D6B3A',opacity:.55},g);el('rect',{x:80,y:380,width:660,height:330,fill:'#ECE6D6'},g);
    const rods=[];for(let i=0;i<11;i++)for(let j=0;j<5;j++){const x=110+i*58,y=405+j*60;rods.push(el('path',{d:`M${x},${y} l22,-12 l22,12 l0,30 l-22,12 l-22,-12 z`,fill:'#FFFFFF',stroke:'#C9BFA6','stroke-width':2},g))}
    const chains=[];for(let c=0;c<7;c++){const x0=120+c*90,y0=200+(c%3)*50;const G=el('g',{},g);for(let j=0;j<5;j++)el('circle',{cx:x0+j*17,cy:y0+Math.sin(j+c)*6,r:8,fill:'#AED581',stroke:'#33691E','stroke-width':2},G);chains.push(G)}
    sbar(g,90,745,85,'~5 µm');
    const sug=[...Array(8)].map(()=>{const G=el('g',{},g);el('path',{d:'M-10,0 l5,-9 l10,0 l5,9 l-5,9 l-10,0 z',fill:'#FFF59D',stroke:'#F9A825','stroke-width':2},G);return G});
    const hp=[...Array(22)].map(()=>el('circle',{r:5,fill:'#FF5252'},g));const ca=[...Array(14)].map(()=>el('circle',{r:6,fill:'#FFFFFF',stroke:'#90A4AE','stroke-width':2},g));const fl=[...Array(8)].map(()=>el('circle',{r:6,fill:'#69F0AE'},g));
    txt(g,'Ca₁₀(PO₄)₆(OH)₂ + 8H⁺ ⇌ 10Ca²⁺ + 6HPO₄²⁻ + 2H₂O',410,760,{size:20,color:'ink',weight:700});
    const C=axes(g,920,170,700,380,{x:[0,60],y:[4,7.5],xt:[0,10,20,30,40,50,60],yt:[4,4.5,5,5.5,6,6.5,7],xl:U('Shakar iste’molidan keyin, daqiqa','Minutes after sugar intake'),yl:U('Karash pH (Stephan egri chizig‘i)','Plaque pH (Stephan curve)')});
    el('rect',{x:920,y:C.py(5.5),width:700,height:C.py(4)-C.py(5.5),fill:'#FF5252',opacity:.12},g);el('line',{x1:920,x2:1620,y1:C.py(5.5),y2:C.py(5.5),stroke:'#FF5252','stroke-width':2,'stroke-dasharray':'8 6'},g);el('line',{x1:920,x2:1620,y1:C.py(4.5),y2:C.py(4.5),stroke:'#69F0AE','stroke-width':2,'stroke-dasharray':'8 6'},g);
    txt(g,T(U('emal kritik pH 5,5','enamel critical pH 5.5')),1610,C.py(5.5)-8,{size:15,color:'#FF8A80',weight:700,anchor:'end'});txt(g,T(U('ftorapatit ~4,5','fluorapatite ~4.5')),1610,C.py(4.5)-8,{size:15,color:'#69F0AE',weight:700,anchor:'end'});
    const cv=el('path',{d:pth(m=>[C.px(m),C.py(pH(m))],0,60,120),stroke:'#FFD54F','stroke-width':5,fill:'none'},g);const cur=el('circle',{r:8,fill:TH.ink},g);const ptx=el('text',{x:0,y:0,'font-size':18,'font-weight':800,fill:TH.ink},g);
    const gm=gauge(g,920,650,420,U('Emal minerali (sirt osti)','Enamel mineral (subsurface)'),'#ECEFF1');
    lines(g,920,720,[U('Xavf shakar miqdoriga emas, chastotasiga bog‘liq','Risk depends on sugar frequency, not amount'),U('Kuniga 3 → 8 marta: pH<5,5 vaqti ~3 baravar ↑','3 → 8 times/day: time below pH 5.5 ~3× ↑')],{size:17,dy:28});
    const st=steps(g,80,110,[[0,U('Dam olish pH ~6,8','Resting pH ~6.8')],[.5,U('Saxaroza → S. mutans glikolizi → sut kislotasi','Sucrose → S. mutans glycolysis → lactic acid')],[2.2,U('pH < 5,5: gidroksiapatit eriydi','pH < 5.5: hydroxyapatite dissolves')],[6,U('So‘lak buferi pH ni tiklaydi → remineralizatsiya (F⁻ bilan)','Saliva buffers pH → remineralisation (with F⁻)')]],{size:22});
    note(g,U('Egri chiziq Stephan (1944) ga asoslangan sxema; kristallar va bakteriyalar kattalashtirilgan','Curve schematic after Stephan (1944); crystals and bacteria enlarged'),850,880,{size:18});
    Object.assign(A,{plaque:[90,170],smut:{el:chains[3],fx:.5,fy:0},sugar:[400,150],lactic:[300,370],enamel:{el:rods[54],fx:.5,fy:1},ca:{el:rods[22],fx:.5,fy:0},fluor:{el:rods[40],fx:1,fy:.5},saliva:{el:cv,fx:.8,fy:.2}});
    let mine=1;R0={anchors:A,core:['plaque','smut','sugar','lactic','enamel','ca','fluor','saliva'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT,m=MIN(t),p=pH(m);const acid=Math.max(0,Math.min(1,(6.8-p)/1.8));const dem=p<5.5,rem=p>5.5&&m>12;
      const mi=m<5?1:m<20?1-.35*Math.min(1,(m-5)/10):Math.min(1,.65+.35*(m-20)/40);
      sug.forEach((s,i)=>{const q=(t-.3-i*.12);const y=lerp(120,330,Math.max(0,Math.min(1,q/1.2)));at(s,{transform:`translate(${120+i*80},${f2(y)})`,opacity:q>0&&q<1.6?1:0})});
      hp.forEach((c,i)=>{const q=(lt*.5+i/22)%1;at(c,{cx:100+((i*61)%620),cy:f2(260+q*200),opacity:f2(acid*.9)})});
      ca.forEach((c,i)=>{const q=(lt*.4+i/14)%1;at(c,{cx:120+((i*47)%600),cy:f2(dem?470-q*180:290+q*180),opacity:dem||rem?.9:0})});
      fl.forEach((c,i)=>{const q=(lt*.35+i/8)%1;at(c,{cx:140+((i*83)%580),cy:f2(250+q*220),opacity:rem?.9:0})});
      rods.forEach((r,i)=>{const j=i%5;const loss=(1-mi)*(j<3?1:.4);at(r,{fill:rem&&j<2&&i%3===0?'#C8F7DC':'#FFFFFF','fill-opacity':f2(1-loss*1.4)})});
      chains.forEach((c,i)=>at(c,{transform:`translate(0,${f2(Math.sin(lt*1.3+i)*3)})`}));
      at(cur,{cx:f2(C.px(m)),cy:f2(C.py(p))});at(ptx,{x:f2(C.px(m)+12),y:f2(C.py(p)-14)});ptx.textContent=`pH ${p.toFixed(1)} · ${m.toFixed(0)} min`;gm(mi,`${Math.round(mi*100)}%`);st(t)}};
  }else{
    const outer='M400,420 C390,300 400,200 440,160 Q490,120 540,150 L600,185 L660,150 Q710,120 760,160 C800,200 810,300 800,420 L785,800 Q762,850 735,800 L670,480 Q600,445 530,480 L465,800 Q438,850 415,800 Z';
    const dent='M402,420 C410,330 435,270 470,245 Q510,225 545,250 L600,280 L655,250 Q690,225 730,245 C765,270 790,330 798,420 L783,798 Q762,842 737,798 L670,480 Q600,445 530,480 L463,798 Q438,842 417,798 Z';
    const pulpD='M505,470 C500,400 515,335 545,325 L600,350 L655,325 C685,335 700,400 695,470 L738,520 L764,812 L754,814 L724,525 L670,478 Q600,462 530,478 L476,525 L446,814 L436,812 L462,520 Z';
    el('rect',{x:300,y:420,width:600,height:440,fill:'#C48B7A',opacity:.35},g);txt(g,T(U('milk / suyak','gingiva / bone')),860,700,{size:16,color:'dim',weight:600,anchor:'end'});
    el('path',{d:outer,fill:'#F5F1E6',stroke:'#BDB49C','stroke-width':3},g);const D=el('path',{d:dent,fill:'#E8D49A',stroke:'#C9A85C','stroke-width':2},g);
    const tc=clipTo(g,['path',{d:dent}]);for(let i=0;i<16;i++){const x=470+i*17;el('path',{d:`M${x},${255+Math.abs(i-8)*3} Q${x+(x-600)*.15},330 ${600+(x-600)*.45},${360+Math.abs(i-8)*4}`,stroke:'#B08B3E','stroke-width':1.5,fill:'none',opacity:.6},tc)}
    const P=el('path',{d:pulpD,fill:'#F48FB1',stroke:'#C2185B','stroke-width':2},g);
    const ws=el('path',{d:'M578,188 L622,188 L646,268 L554,268 Z',fill:'#FFFFFF',opacity:0},g);
    const cav=el('path',{d:'M584,182 Q600,205 616,182 L632,250 Q600,262 568,250 Z',fill:'#5D4037',opacity:0},g);
    const dl=el('path',{d:'M520,262 Q600,292 680,262 Q660,330 600,352 Q540,330 520,262 Z',fill:'#8D6E63',stroke:'#FFE082','stroke-width':3,'stroke-dasharray':'6 4',opacity:0},g);
    const ab=[[441,842],[759,842]].map(([x,y])=>el('ellipse',{cx:x,cy:y,rx:0,ry:0,fill:'#3E2723',stroke:'#FF7043','stroke-width':3,opacity:.85},g));
    const bac=[...Array(16)].map(()=>el('circle',{r:4,fill:'#AED581'},g));
    sbar(g,330,140,40*1,'1 mm');txt(g,T(U('1 mm = 40 px; ildiz uzunligi ~13 mm (qisqartirilmagan)','1 mm = 40 px; root length ~13 mm')),330,105,{size:15,color:'dim',weight:600,anchor:'start'});
    const SX=1000,ST=[[U('1. Oq dog‘ — qaytar (ftor, gigiyena)','1. White spot — reversible (fluoride, hygiene)'),0],[U('2. Emal kavitatsiyasi — plomba','2. Enamel cavitation — filling'),3],[U('3. Dentin kariyesi — plomba','3. Dentin caries — filling'),5],[U('4. Pulpit (og‘riq) — endodontiya','4. Pulpitis (pain) — root canal'),8],[U('5. Periapikal absess — endodontiya/olib tashlash','5. Periapical abscess — root canal/extraction'),10]];
    const sT=ST.map(([s],i)=>txt(g,T(s),SX,200+i*56,{size:21,color:'dim',weight:800,anchor:'start'}));
    lines(g,SX,500,[U('Emal ~96% mineral; dentin ~70%','Enamel ~96% mineral; dentin ~70%'),U('Dentin kritik pH ~6,2–6,7 (emaldan yuqori)','Dentin critical pH ~6.2–6.7 (higher than enamel)'),U('Pulpa yaqinida ~45 000 kanalcha/mm²','Near pulp ~45,000 tubules/mm²'),U('Emal qaytadan o‘smaydi — oldini olish asosiy','Enamel does not regrow — prevention is key')],{size:18,dy:32});
    const st=steps(g,SX,140,[[0,U('Fissuradagi karash kislotasi emalni eritadi','Fissure plaque acid dissolves enamel')],[3,U('Yuza qulaydi → bakteriyalar ichkariga kiradi','Surface collapses → bacteria invade')],[5,U('EDB da yon tomonga tarqaladi, kanalchalar bo‘ylab pulpaga','Spreads at DEJ, along tubules toward pulp')],[8,U('Bakteriya toksinlari → pulpa yallig‘lanishi','Bacterial toxins → pulp inflammation')],[10,U('Infeksiya ildiz uchidan chiqadi','Infection exits at the root apex')]],{size:22});
    note(g,U('Oziq tish (moliar) bo‘ylama kesimi, sxema; bosqichlar oylar–yillar davom etadi','Molar longitudinal section, schematic; stages take months to years'),1260,880,{size:18});
    Object.assign(A,{enamel:[440,200],dentin:[470,400],pulp:{el:P,fx:.5,fy:.25},white:{el:ws,fx:1,fy:.6},cavity:[600,192],dles:{el:dl,fx:.15,fy:.5},tub:[700,320],absc:[759,850]});
    R0={anchors:A,core:['enamel','dentin','pulp','white','cavity','dles','tub','absc'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;const c=x=>Math.max(0,Math.min(1,x));
      at(ws,{opacity:f2(.75*c(t/1.5)*(t<5?1:.6))});at(cav,{opacity:f2(c((t-3)/1.2))});const dg=c((t-5)/2.5),dp=c((t-8)/1);
      at(dl,{opacity:f2(dg>0?.85:0),transform:`translate(600,262) scale(${f2(.3+.7*dg)},${f2(.3+.7*dg+.25*dp)}) translate(-600,-262)`});
      at(P,{fill:t>=8.6?'#E53935':'#F48FB1'});ab.forEach(e=>{const q=c((t-10)/1.5);at(e,{rx:f2(30*q),ry:f2(24*q)})});
      bac.forEach((b,i)=>{const q=(lt*.25+i/16)%1;const depth=t<3?0:t<5?.25:t<8?.25+.45*dg:t<10?.8:1;const y=lerp(190,190+190*depth,q);const x=600+Math.sin(i*2.3)*(10+70*depth*q);at(b,{cx:f2(x),cy:f2(y),opacity:t>=3?.9:0})});
      let cs=0;ST.forEach(([,t0],i)=>{if(t>=t0)cs=i});sT.forEach((n,i)=>at(n,{fill:i===cs?'#FFD54F':i<cs?TH.ink:TH.dim}));st(t)}};
  }
  R0.update(0);return R0});
/* ---------- SMOKING: airway & alveoli (metaplasia → carcinoma, emphysema, Fletcher–Peto) · nicotine dependence (α4β2, VTA → NAc dopamine, plasma kinetics) ---------- */
KIT.names(NAMES.uz,{cil:'Kiprikli epiteliy (me’yor)',gob:'Qadahsimon hujayralar giperplaziyasi',meta:'Yassi epiteliyli metaplaziya',dys:'Displaziya',ca:'Karsinoma (bazal membranani yorib o‘tadi)',bm:'Bazal membrana',alvN:'Me’yoriy alveolalar',emph:'Emfizema: devorlar yemirilgan',elast:'Neytrofil elastazasi ↔ α1-antitripsin',
  vta:'Ventral tegmental soha (VTA)',nac:'Accumbens yadrosi (mukofot)',pfc:'Prefrontal po‘stloq',nach:'α4β2 nikotin retseptori',da:'Dofamin ajralishi',nic:'Nikotin'});
KIT.names(NAMES.en,{cil:'Ciliated epithelium (normal)',gob:'Goblet-cell hyperplasia',meta:'Squamous metaplasia',dys:'Dysplasia',ca:'Carcinoma (breaches basement membrane)',bm:'Basement membrane',alvN:'Normal alveoli',emph:'Emphysema: walls destroyed',elast:'Neutrophil elastase ↔ α1-antitrypsin',
  vta:'Ventral tegmental area (VTA)',nac:'Nucleus accumbens (reward)',pfc:'Prefrontal cortex',nach:'α4β2 nicotinic receptor',da:'Dopamine release',nic:'Nicotine'});
SM.items.smoking=preset(1700,900,(g,it)=>{const k=it.kind||'lung',A={};if(!['lung','nicotine'].includes(k))SERR.push(`smoking: kind "${k}" → lung, nicotine`);const TT=it.cycle||14;let R0;
  if(k==='lung'){
    const EY=330,EX=70,EW=860;el('rect',{x:EX,y:EY+80,width:EW,height:60,fill:'#F8BBD0',opacity:.25},g);const bm=el('line',{x1:EX,x2:EX+EW,y1:EY+80,y2:EY+80,stroke:'#F06292','stroke-width':4},g);
    const SEG=['#80DEEA','#A5D6A7','#FFE082','#FFAB91','#EF5350'];const stg=[];
    for(let s=0;s<5;s++){const x0=EX+s*EW/5,w=EW/5;const G=el('g',{},g);
      for(let i=0;i<6;i++){const x=x0+8+i*(w-16)/6,cw=(w-16)/6-4;
        if(s===0){el('rect',{x,y:EY-20,width:cw,height:100,rx:4,fill:'#B3E5FC',stroke:'#4FC3F7'},G);for(let c=0;c<4;c++)el('line',{x1:x+3+c*cw/4,x2:x+3+c*cw/4,y1:EY-20,y2:EY-38,stroke:'#E1F5FE','stroke-width':2},G);el('circle',{cx:x+cw/2,cy:EY+50,r:6,fill:'#0277BD'},G)}
        else if(s===1){el('rect',{x,y:EY-20,width:cw,height:100,rx:4,fill:i%2?'#C8E6C9':'#B3E5FC',stroke:'#66BB6A'},G);if(i%2)el('ellipse',{cx:x+cw/2,cy:EY+10,rx:cw/2-2,ry:22,fill:'#F1F8E9'},G);el('circle',{cx:x+cw/2,cy:EY+55,r:6,fill:'#2E7D32'},G)}
        else if(s===2){for(let r=0;r<4;r++)el('rect',{x:x-2,y:EY-20+r*25+(r===0?8:0),width:cw+4,height:r===0?14:23,rx:3,fill:r===0?'#FFF8E1':'#FFE082',stroke:'#FFB300'},G)}
        else if(s===3){for(let r=0;r<4;r++){el('rect',{x:x-2,y:EY-20+r*25,width:cw+4,height:23,rx:3,fill:'#FFCCBC',stroke:'#FF7043'},G);el('circle',{cx:x+cw/2+((i+r)%3-1)*3,cy:EY-8+r*25,r:5+((i*r)%3)*2,fill:'#BF360C'},G)}}
        else{for(let r=0;r<5;r++)el('circle',{cx:x+cw/2+((i*r)%3-1)*5,cy:EY-10+r*24+(r>3?20:0),r:11,fill:'#E57373',stroke:'#B71C1C'},G)}}
      txt(G,['0','I','II','III','IV'][s],x0+w/2,EY-60,{size:18,color:SEG[s],weight:800});stg.push(G)}
    const inv=[...Array(5)].map((_,i)=>el('circle',{cx:EX+EW*.9+(i%2?14:-10),cy:EY+100+i*8,r:9,fill:'#E57373',stroke:'#B71C1C'},g));
    sbar(g,EX,EY+175,60,'~20 µm');
    // alveoli
    const AY=640;const alv=(cx,dam)=>{const G=el('g',{},g);for(let i=0;i<7;i++){const a=i/7*2*Math.PI;el('circle',{cx:cx+Math.cos(a)*70*(dam?1.2:1),cy:AY+Math.sin(a)*55,r:dam?(i%2?58:30):38,fill:'none',stroke:'#F48FB1','stroke-width':dam?3:6,'stroke-dasharray':dam?'40 18':'none'},G)}return G};
    const aN=alv(260,0),aE=alv(700,1);txt(g,T(U('Me’yor','Normal')),260,AY+120,{size:17,color:'ink',weight:700});txt(g,T(U('Sentroatsinar emfizema','Centriacinar emphysema')),700,AY+120,{size:17,color:'ink',weight:700});
    const neu=[...Array(5)].map(()=>el('circle',{r:9,fill:'#CE93D8',stroke:'#7B1FA2','stroke-width':2},g));sbar(g,420,AY+90,60,'~200 µm');
    const C=axes(g,1080,190,540,330,{x:[25,75],y:[0,100],xt:[25,35,45,55,65,75],yt:[0,25,50,75,100],xl:U('Yosh, yil','Age, years'),yl:U('FEV₁, 25 yoshdagiga nisbatan %','FEV₁, % of value at age 25')});
    const ns=a=>100-(a-25)*.55,sm=a=>100-(a-25)*1.25,qu=a=>a<45?sm(a):sm(45)-(a-45)*.6;
    [[ns,'#81C784',U('chekmaydigan','never smoked')],[sm,'#EF5350',U('chekuvchi (sezgir)','susceptible smoker')],[qu,'#FFD54F',U('45 yoshda tashlagan','quit at 45')]].forEach(([f,c,l],i)=>{el('path',{d:pth(a=>[C.px(a),C.py(f(a))],25,75,50),stroke:c,'stroke-width':4,fill:'none'},g);txt(g,T(l),C.px(75)-6,C.py(f(75))-8-(i===2?4:0),{size:15,color:c,weight:700,anchor:'end'})});
    el('line',{x1:C.px(25),x2:C.px(75),y1:C.py(25),y2:C.py(25),stroke:'#FF5252','stroke-dasharray':'6 5','stroke-width':2},g);txt(g,T(U('nogironlik / o‘lim','disability / death')),C.px(26),C.py(25)-8,{size:14,color:'#FF8A80',weight:700,anchor:'start'});
    const cur=el('line',{y1:190,y2:520,stroke:TH.ink,'stroke-width':2},g);
    lines(g,1080,600,[U('Tutunda ~7000 modda, ~70 tasi kanserogen','Smoke: ~7000 chemicals, ~70 carcinogens'),U('Benzpiren → BPDE → p53 da G→T mutatsiya','Benzo[a]pyrene → BPDE → G→T mutations in p53'),U('O‘pka saratonining ~85% i chekish bilan bog‘liq','~85% of lung cancer linked to smoking'),U('Chekuvchilarda COHb 3–10%','Smokers’ COHb 3–10%')],{size:17,dy:30});
    const st=steps(g,70,150,[[0,U('Me’yor: kiprikchalar shilliqni yuqoriga suradi','Normal: cilia clear mucus upward')],[2.5,U('Kiprikchalar yo‘qoladi, shilliq ko‘payadi','Cilia lost, mucus increases')],[5,U('Yassi metaplaziya (qaytar)','Squamous metaplasia (reversible)')],[7.5,U('Displaziya → karsinoma in situ','Dysplasia → carcinoma in situ')],[10,U('Invaziya: bazal membrana yorildi','Invasion: basement membrane breached')]],{size:22});
    note(g,U('Sxema; FEV₁ egri chiziqlari Fletcher & Peto (1977) bo‘yicha; bosqichlar yillar davom etadi','Schematic; FEV₁ curves after Fletcher & Peto (1977); stages take years'),850,880,{size:18});
    Object.assign(A,{cil:{el:stg[0],fx:.5,fy:.15},gob:{el:stg[1],fx:.5,fy:.3},meta:{el:stg[2],fx:.5,fy:.3},dys:{el:stg[3],fx:.5,fy:.3},ca:{el:stg[4],fx:.6,fy:.5},bm:[EX+30,EY+80],alvN:{el:aN,fx:.2,fy:.9},emph:{el:aE,fx:.85,fy:.9},elast:[480,AY]});
    R0={anchors:A,core:['cil','gob','meta','dys','ca','bm','alvN','emph','elast'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;const s=Math.min(4,Math.floor(t/2.5));
      stg.forEach((G,i)=>at(G,{opacity:i<=s?1:.25}));inv.forEach((c,i)=>at(c,{opacity:s>=4?1:0,cy:f2(EY+95+i*9+Math.sin(lt*2+i)*3)}));
      neu.forEach((n,i)=>{const q=(lt*.2+i/5)%1;at(n,{cx:f2(560+q*260),cy:f2(AY-40+i*20),opacity:f2(Math.sin(Math.PI*q))})});
      const a=25+50*t/TT;at(cur,{x1:f2(C.px(a)),x2:f2(C.px(a))});st(t)}};
  }else{
    // sagittal brain
    const bG=el('g',{},g);el('path',{d:'M140,520 C120,330 260,190 470,190 C680,190 820,310 830,450 C840,560 760,620 650,630 L560,640 C520,700 470,740 430,760 L400,740 C420,700 430,660 420,630 C300,640 160,620 140,520 Z',fill:'#BCAAA4',stroke:'#EFEBE9','stroke-width':4},bG);
    el('path',{d:'M640,630 C700,660 760,660 800,620 C790,590 740,600 700,600 Z',fill:'#A1887F'},bG);
    const vta=el('circle',{cx:470,cy:560,r:20,fill:'#7E57C2'},g),nac=el('circle',{cx:300,cy:480,r:22,fill:'#EC407A'},g),pfc=el('circle',{cx:220,cy:350,r:22,fill:'#26A69A'},g);
    el('path',{d:'M470,560 Q390,540 300,480',stroke:'#7E57C2','stroke-width':6,fill:'none','marker-end':arrowMarker('#7E57C2')},g);el('path',{d:'M470,560 Q330,420 220,350',stroke:'#7E57C2','stroke-width':4,fill:'none','stroke-dasharray':'8 6','marker-end':arrowMarker('#7E57C2')},g);
    const pul=[...Array(8)].map(()=>el('circle',{r:7,fill:'#FFD54F'},g));
    sbar(g,140,800,100,'~2 cm');
    // synapse inset
    const SX=900,SY=330;el('rect',{x:SX,y:SY-140,width:330,height:330,rx:16,fill:'#0D1B2A',stroke:TH.faint},g);
    el('path',{d:`M${SX+40},${SY-100} q125,-40 250,0 l0,90 q-125,40 -250,0 z`,fill:'#7E57C2',opacity:.5},g);txt(g,T(U('VTA neyroni','VTA neuron')),SX+165,SY-110,{size:15,color:'ink',weight:700});
    el('path',{d:`M${SX+40},${SY+150} q125,40 250,0 l0,-70 q-125,-40 -250,0 z`,fill:'#EC407A',opacity:.45},g);
    const rec=[0,1,2].map(i=>{const x=SX+90+i*80;const G=el('g',{},g);for(let j=0;j<5;j++)el('rect',{x:x-14+j*6,y:SY-12,width:5,height:24,fill:j%2?'#FFB74D':'#4FC3F7'},G);return G});
    const nicM=[...Array(6)].map(()=>el('path',{d:'M-7,-5 L7,-5 L0,8 Z',fill:'#FFD54F'},g));const daM=[...Array(14)].map(()=>el('circle',{r:5,fill:'#F48FB1'},g));
    const C=axes(g,1290,200,350,260,{x:[0,16],y:[0,40],xt:[0,4,8,12,16],yt:[0,20,40],xl:U('soat (uyg‘oq kun)','hours (waking day)'),yl:U('Plazmadagi nikotin, ng/ml','Plasma nicotine, ng/ml')});
    const cig=[...Array(20)].map((_,i)=>i*.8);const PN=h=>{let s=0;cig.forEach(c=>{if(h>=c){const d=h-c;s+=6*(d<.15?d/.15:Math.exp(-(d-.15)*Math.LN2/2))}});return s};
    el('path',{d:pth(h=>[C.px(h),C.py(PN(h))],0,16,320),stroke:'#FFD54F','stroke-width':3,fill:'none'},g);const cur=el('circle',{r:7,fill:TH.ink},g);
    lines(g,900,560,[U('Inhalatsiyadan miyaga ~10–20 soniyada yetadi','Reaches the brain ~10–20 s after inhalation'),U('T½ ~2 soat → kun davomida to‘planadi','T½ ~2 h → accumulates through the day'),U('Surunkali: α4β2 retseptorlar soni ↑ (tolerantlik)','Chronic: α4β2 receptor up-regulation (tolerance)'),U('Davolash: NZT, vareniklin (qisman agonist), bupropion','Treatment: NRT, varenicline (partial agonist), bupropion'),U('Kotinin (metabolit) T½ ~16 soat — test markeri','Cotinine (metabolite) T½ ~16 h — test marker')],{size:17,dy:30});
    const st=steps(g,140,150,[[0,U('Nikotin o‘pkadan qonga, so‘ng miyaga','Nicotine: lungs → blood → brain')],[3,U('VTA dagi α4β2 retseptorlarni faollashtiradi','Activates α4β2 receptors in the VTA')],[6,U('Accumbens yadrosida dofamin ↑ → mukofot','Dopamine ↑ in nucleus accumbens → reward')],[10,U('Daraja tushganda — tashlab qo‘yish belgilari','Falling level → withdrawal symptoms')]],{size:22});
    note(g,U('Miya sagittal kesimi va sinaps sxematik; plazma egri chizig‘i — 40 daqiqada 1 sigaret modeli','Brain sagittal section and synapse schematic; plasma curve models 1 cigarette per 40 min'),850,880,{size:18});
    Object.assign(A,{vta:{el:vta,fx:.5,fy:1},nac:{el:nac,fx:.5,fy:1},pfc:{el:pfc,fx:.5,fy:0},nach:{el:rec[2],fx:.5,fy:0},da:[SX+165,SY+60],nic:[SX+60,SY-30]});
    R0={anchors:A,core:['vta','nac','pfc','nach','da','nic'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;const on=t>=3&&t<10;const h=16*t/TT;
      pul.forEach((p,i)=>{const q=(lt*.6+i/8)%1;const x=470+(300-470)*q,y=560+(480-560)*q-Math.sin(Math.PI*q)*30;at(p,{cx:f2(x),cy:f2(y),opacity:on?f2(Math.sin(Math.PI*q)):0})});
      nicM.forEach((m,i)=>{const q=(lt*.4+i/6)%1;const tx=SX+90+(i%3)*80;at(m,{transform:`translate(${f2(tx+(1-q)*-40)},${f2(SY-60+q*45)})`,opacity:t>=1?f2(Math.sin(Math.PI*q)):0})});
      rec.forEach(r=>at(r,{opacity:on?1:.5}));daM.forEach((d,i)=>{const q=(lt*.5+i/14)%1;at(d,{cx:f2(SX+60+((i*53)%220)),cy:f2(SY-20+q*110),opacity:t>=5&&t<11?f2(Math.sin(Math.PI*q)):0})});
      at(cur,{cx:f2(C.px(h)),cy:f2(C.py(PN(h)))});st(t)}};
  }
  R0.update(0);return R0});
/* ---------- HEAVY METALS: mercury (MeHg, biomagnification, LAT1/BBB) · arsenic (lipoate –SH, arsenolysis) · cadmium (MT, proximal tubule, bone) ---------- */
KIT.names(NAMES.uz,{sh:'–SH guruhlari (sisteinlar)',chel:'Davolash (xelatorlar)',path:'Toksikokinetika: kirishdan nishongacha',body:'Nishon a’zolar'});
KIT.names(NAMES.en,{sh:'–SH groups (cysteines)',chel:'Treatment (chelators)',path:'Toxicokinetics: from exposure to target',body:'Target organs'});
SM.items.metals=preset(1700,900,(g,it)=>{const k=it.kind||'mercury',A={};const KS=['mercury','arsenic','cadmium'];if(!KS.includes(k))SERR.push(`metals: kind "${k}" → ${KS.join(', ')}`);const TT=it.cycle||12;
  const D={mercury:{c:'#B0BEC5',sym:'Hg',title:U('Simob: metilsimob (MeHg)','Mercury: methylmercury (MeHg)'),
      nodes:[U('Hg²⁺ suvda','Hg²⁺ in water'),U('Bakteriyalar metillaydi → MeHg','Bacteria methylate → MeHg'),U('Plankton → baliq: ~10⁶ marta to‘planadi','Plankton → fish: ~10⁶-fold biomagnification'),U('Ichakda ~95% so‘riladi','~95% absorbed in gut'),U('MeHg–Cys ≈ metionin → LAT1 → miya, yo‘ldosh','MeHg–Cys ≈ methionine → LAT1 → brain, placenta'),U('–SH ga bog‘lanadi: tubulin, glutamat ↑ → neyron o‘limi','Binds –SH: tubulin, glutamate ↑ → neuron death')],
      org:[['brain',U('Miya (ataksiya, ko‘rish maydoni torayishi)','Brain (ataxia, constricted vision)')],['fetus',U('Homila miyasi','Fetal brain')],['kidney',U('Buyrak (Hg²⁺, Hg⁰)','Kidney (Hg²⁺, Hg⁰)')]],
      facts:[U('Minamata (1956–68): >2000 rasmiy bemor','Minamata (1956–68): >2000 certified patients'),U('Hg⁰ bug‘i: o‘pkada ~80% so‘riladi','Hg⁰ vapour: ~80% absorbed by lung'),U('MeHg T½ ~50 kun; soch tahlili bilan o‘lchanadi','MeHg T½ ~50 days; measured in hair')],chel:U('DMSA / DMPS (MeHg da samarasi cheklangan)','DMSA / DMPS (limited for MeHg)')},
    arsenic:{c:'#AED581',sym:'As',title:U('Mishyak: As³⁺ (arsenit) va As⁵⁺ (arsenat)','Arsenic: As³⁺ (arsenite) and As⁵⁺ (arsenate)'),
      nodes:[U('Yer osti suvi, guruch','Groundwater, rice'),U('Ichakda >90% so‘riladi','>90% absorbed in gut'),U('Jigar: As⁵⁺ → As³⁺ → metillanish (DMA)','Liver: As⁵⁺ → As³⁺ → methylation (DMA)'),U('As³⁺ + lipoatning ikki –SH → PDH, α-KGDH to‘xtaydi','As³⁺ + lipoate’s two –SH → PDH, α-KGDH blocked'),U('As⁵⁺ fosfat o‘rnida → arsenoliz, ATF yo‘q','As⁵⁺ replaces phosphate → arsenolysis, no ATP'),U('Surunkali: giperkeratoz, Mees chiziqlari, saraton','Chronic: hyperkeratosis, Mees lines, cancer')],
      org:[['skin',U('Teri (giperkeratoz, saraton)','Skin (hyperkeratosis, cancer)')],['liver',U('Jigar','Liver')],['lung',U('O‘pka, siydik pufagi saratoni','Lung, bladder cancer')]],
      facts:[U('Bangladesh: ~35–77 mln kishi xavf ostida','Bangladesh: ~35–77 million exposed'),U('JSST chegarasi: suvda 10 µg/L','WHO limit: 10 µg/L in water'),U('O‘tkir: “guruch suvi” diareyasi, QT uzayishi','Acute: “rice-water” diarrhoea, QT prolongation')],chel:U('Dimerkaprol (BAL), DMSA','Dimercaprol (BAL), DMSA')},
    cadmium:{c:'#FFB74D',sym:'Cd',title:U('Kadmiy','Cadmium'),
      nodes:[U('Chekish (1–2 µg/sigaret), guruch','Smoking (1–2 µg/cigarette), rice'),U('Qonda albumin bilan → jigar','Albumin-bound in blood → liver'),U('Jigar: metallotionein (MT) bilan bog‘lanadi','Liver: bound to metallothionein (MT)'),U('Cd-MT koptokchada filtrlanadi','Cd-MT filtered by glomerulus'),U('Proksimal kanalcha: lizosomada Cd²⁺ ozod bo‘ladi','Proximal tubule: Cd²⁺ released in lysosomes'),U('β₂-mikroglobulinuriya; suyakdan Ca²⁺ yo‘qolishi','β₂-microglobulinuria; bone Ca²⁺ loss')],
      org:[['kidney',U('Buyrak (proksimal kanalcha)','Kidney (proximal tubule)')],['bone',U('Suyak (osteomalyatsiya)','Bone (osteomalacia)')],['lung',U('O‘pka (emfizema, saraton)','Lung (emphysema, cancer)')]],
      facts:[U('Itai-itai (Yaponiya, 1910–70-yillar)','Itai-itai disease (Japan, 1910s–70s)'),U('Organizmda T½ 10–30 yil','Body T½ 10–30 years'),U('Chekuvchilarda qondagi Cd ~2 baravar yuqori','Smokers’ blood Cd ~2× higher')],chel:U('Samarali xelator yo‘q — ta’sirni to‘xtatish','No effective chelator — stop exposure')}}[k];
  txt(g,T(D.title),80,150,{size:28,color:D.c,weight:800,anchor:'start'});
  // pathway: 6 nodes, 2 rows of 3
  const P=[[230,260],[590,260],[950,260],[950,440],[590,440],[230,440]];const nb=P.map((p,i)=>{const b=box(g,p[0],p[1],320,96,'',D.c);const words=T(D.nodes[i]).split(' ');let l1='',l2='',l3='';words.forEach(w=>{if((l1+' '+w).length<=26&&!l2)l1=(l1?l1+' ':'')+w;else if((l2+' '+w).length<=26&&!l3)l2=(l2?l2+' ':'')+w;else l3=(l3?l3+' ':'')+w});
    [l1,l2,l3].filter(Boolean).forEach((l,j,a)=>txt(b.G,l,p[0],p[1]+7+(j-(a.length-1)/2)*24,{size:18,color:'ink',weight:700}));txt(b.G,String(i+1),p[0]-148,p[1]-30,{size:16,color:D.c,weight:900,anchor:'start'});return b});
  [[0,1],[1,2],[2,3],[3,4],[4,5]].forEach(([a,b])=>{const [x1,y1]=P[a],[x2,y2]=P[b];if(y1===y2)arw(g,[x1+(x2>x1?165:-165),y1],[x2+(x2>x1?-170:170),y2],D.c,4);else arw(g,[x1,y1+50],[x2,y2-54],D.c,4)});
  const ion=el('g',{},g);el('circle',{r:16,fill:D.c,stroke:'#fff','stroke-width':2},ion);txt(ion,D.sym,0,6,{size:14,color:'#0D1B2A',weight:900});
  // –SH binding mini panel
  const MX=200,MY=640;el('rect',{x:70,y:560,width:500,height:190,rx:14,fill:'#0D1B2A',stroke:TH.faint},g);
  const prot=el('path',{d:`M${MX-90},${MY+20} C${MX-60},${MY-60} ${MX+60},${MY-60} ${MX+90},${MY+20} C${MX+60},${MY+90} ${MX-60},${MY+90} ${MX-90},${MY+20} Z`,fill:'#5C6BC0',opacity:.7},g);
  const shs=[[MX-35,MY-5],[MX+35,MY-5]].map(([x,y])=>{const G=el('g',{},g);el('circle',{cx:x,cy:y,r:16,fill:'#FFF176'},G);txt(G,'SH',x,y+5,{size:13,color:'#0D1B2A',weight:800});return G});
  const bi=el('g',{},g);el('circle',{r:18,fill:D.c,stroke:'#fff','stroke-width':2},bi);txt(bi,D.sym,0,6,{size:14,color:'#0D1B2A',weight:900});
  const act=el('text',{x:MX+130,y:MY,'font-size':20,'font-weight':800,fill:'#81C784'},g);txt(g,T(k==='arsenic'?U('Lipoamid (E2)','Lipoamide (E2)'):k==='cadmium'?U('Metallotionein: 20 Cys','Metallothionein: 20 Cys'):U('Ferment / tubulin','Enzyme / tubulin')),MX+130,MY+40,{size:16,color:'dim',weight:700,anchor:'start'});
  const ch=box(g,820,620,440,56,T(D.chel),'#4DB6AC',{size:17});lines(g,620,690,D.facts,{size:17,dy:28,color:'ink'});
  // body
  const BX=1440,bd=el('g',{},g);el('circle',{cx:BX,cy:220,r:46,fill:'#37474F'},bd);el('path',{d:`M${BX-70},280 L${BX+70},280 L${BX+90},530 L${BX+50},530 L${BX+45},780 L${BX+10},780 L${BX},550 L${BX-10},780 L${BX-45},780 L${BX-50},530 L${BX-90},530 Z`,fill:'#37474F'},bd);
  const O={brain:[BX,212,30,22],kidney:[BX,440,46,14],fetus:[BX,495,22,22],skin:[BX+82,400,10,70],liver:[BX-24,390,34,18],lung:[BX,330,50,28],bone:[BX-28,670,8,80]};
  const orgEl=D.org.map(([o,lab],i)=>{const [x,y,rx,ry]=O[o];const e=el('ellipse',{cx:x,cy:y,rx,ry,fill:'#FF5252',opacity:.8},g);const ly=[200,420,640][i];const side=i%2?-1:1;
    el('line',{x1:x+side*rx,y1:y,x2:BX+side*120,y2:ly,stroke:'#FF8A80','stroke-width':2},g);txt(g,T(lab),BX+side*126,ly+6,{size:16,color:'#FF8A80',weight:700,anchor:side>0?'start':'end'});return e});
  const st=steps(g,620,560,[[0,U('Kirish va tarqalish','Exposure and distribution')],[6,U('–SH ga bog‘lanish → oqsil faolligi yo‘qoladi','Binding to –SH → protein inactivated')],[9,U('Nishon a’zolarda to‘planadi','Accumulates in target organs')]],{size:21});
  note(g,U('Sxema; manbalar: Goldfrank, JSST, ATSDR; sonlar taxminiy','Schematic; sources: Goldfrank, WHO, ATSDR; numbers approximate'),850,880,{size:18});
  Object.assign(A,{sh:{el:shs[0],fx:.5,fy:0},chel:{el:ch.G,fx:.5,fy:0},path:{el:nb[1].G,fx:.5,fy:0},body:{el:bd,fx:.5,fy:1}});
  const R0={anchors:A,core:['path','sh','chel','body'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;const q=Math.min(1,t/9);const [x,y,s]=along(P,q);at(ion,{transform:`translate(${f2(x)},${f2(y-58)})`,opacity:t<9.5?1:0});
    nb.forEach((b,i)=>lit(b,i===s||(i===5&&q>=1)));const bq=Math.min(1,Math.max(0,(t-6)/2));at(bi,{transform:`translate(${f2(lerp(MX-200+40,MX,bq))},${f2(lerp(MY-60,MY-28,bq))})`});act.textContent=bq>=1?T(U('faol emas','inactive')):T(U('faol','active'));at(act,{fill:bq>=1?'#FF5252':'#81C784'});
    orgEl.forEach((o,i)=>at(o,{opacity:t>=9?f2(.55+.4*Math.sin(lt*3+i)):.2}));lit(ch,t>=10.5);st(t)}};
  R0.update(0);return R0});

KIT.bind();
})();
