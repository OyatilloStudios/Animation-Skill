/* ================= v2.6 SHELF: INFECTIOUS AGENTS — microbe–host interactions (v2.6)
   Academic style; sources: Murray Medical Microbiology, Sherris, Robbins, WHO. Simplifications written on screen. */
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
/* ---------- H. pylori · tuberculosis granuloma · cholera toxin ---------- */
const comma=(g,c,len)=>{const G=el('g',{},g);el('path',{d:`M${-len/2},0 Q0,${-len*.35} ${len/2},0`,stroke:c,'stroke-width':len*.32,'stroke-linecap':'round',fill:'none'},G);el('path',{d:`M${len/2},0 q ${len*.4} ${len*.2} ${len*.8} 0`,stroke:c,'stroke-width':2,fill:'none'},G);return G};
KIT.names(NAMES.uz,{lumen:'Oshqozon bo‘shlig‘i (pH 1–2)',mucus:'Shilliq qavat (pH gradienti → ~7)',hp:'H. pylori (spiral, 4–6 xivchin, ~3 µm)',urease:'Ureaza: siydikchil → NH₃ + CO₂',caga:'CagA (IV tip sekretsiya tizimi)',vaca:'VacA → vakuolalar',neut:'Neytrofillar (gastrit)',ep:'Epiteliy',ulcer:'Yara (o‘n ikki barmoq ichak > oshqozon)',
  drop:'Tomchi yadrolari (1–5 µm)',am:'Alveolyar makrofag',mtb:'M. tuberculosis (kislotaga chidamli tayoqcha)',cas:'Kazeoz nekroz (markaz)',epi:'Epiteloid makrofaglar',lang:'Langhans gigant hujayrasi',lym:'Limfotsitlar halqasi (Th1, IFN-γ)',fib:'Fibroz kapsula',
  vc:'Vibrio cholerae (vergulsimon, 1 xivchin)',ct:'Xolera toksini (AB₅)',gm1:'GM1 retseptori',gs:'Gsα ADF-ribozillanadi → doim faol',ac:'Adenilatsiklaza → cAMP ↑',cftr:'CFTR: Cl⁻ chiqadi, Na⁺ va suv ergashadi',sglt:'SGLT1 ishlaydi → ORS samarali'});
KIT.names(NAMES.en,{lumen:'Gastric lumen (pH 1–2)',mucus:'Mucus layer (pH gradient → ~7)',hp:'H. pylori (spiral, 4–6 flagella, ~3 µm)',urease:'Urease: urea → NH₃ + CO₂',caga:'CagA (type IV secretion system)',vaca:'VacA → vacuoles',neut:'Neutrophils (gastritis)',ep:'Epithelium',ulcer:'Ulcer (duodenal > gastric)',
  drop:'Droplet nuclei (1–5 µm)',am:'Alveolar macrophage',mtb:'M. tuberculosis (acid-fast bacillus)',cas:'Caseous necrosis (centre)',epi:'Epithelioid macrophages',lang:'Langhans giant cell',lym:'Lymphocyte cuff (Th1, IFN-γ)',fib:'Fibrous capsule',
  vc:'Vibrio cholerae (comma-shaped, 1 flagellum)',ct:'Cholera toxin (AB₅)',gm1:'GM1 receptor',gs:'Gsα ADP-ribosylated → always on',ac:'Adenylate cyclase → cAMP ↑',cftr:'CFTR: Cl⁻ out, Na⁺ and water follow',sglt:'SGLT1 intact → ORS works'});
SM.items.hpylori=preset(1700,900,(g,it)=>{const A={},TT=it.cycle||12;if(it.kind&&it.kind!=='mechanism')SERR.push(`hpylori: kind "${it.kind}" → mechanism`);
  const X0=70,X1=1100,YL=160,YM=330,YE=520;el('rect',{x:X0,y:YL,width:X1-X0,height:YM-YL,fill:'#33691E',opacity:.25},g);
  const mg=el('linearGradient',{id:uid('hpm'),x1:0,y1:0,x2:0,y2:1},DEFS);el('stop',{offset:0,'stop-color':'#E1F5FE','stop-opacity':.25},mg);el('stop',{offset:1,'stop-color':'#B3E5FC','stop-opacity':.7},mg);
  el('rect',{x:X0,y:YM,width:X1-X0,height:YE-YM,fill:`url(#${mg.id})`},g);
  const cells=[];for(let i=0;i<12;i++){const x=X0+i*(X1-X0)/12;const G=el('g',{},g);el('rect',{x:x+3,y:YE,width:(X1-X0)/12-6,height:180,rx:8,fill:'#F8BBD0',stroke:'#EC407A','stroke-width':2},G);el('circle',{cx:x+(X1-X0)/24,cy:YE+130,r:13,fill:'#AD1457'},G);const v=el('g',{opacity:0},G);for(let j=0;j<3;j++)el('circle',{cx:x+20+j*22,cy:YE+60+(j%2)*20,r:9,fill:'#fff',stroke:'#F48FB1'},v);cells.push({G,v})}
  txt(g,'pH 1–2',X1+20,YL+90,{size:18,color:'#FF8A80',weight:800,anchor:'start'});txt(g,'pH ~7',X1+20,YE-10,{size:18,color:'#81C784',weight:800,anchor:'start'});
  const HP=[...Array(6)].map((_,i)=>{const G=el('g',{},g);el('path',{d:'M-30,0 C-20,-12 -10,12 0,0 C10,-12 20,12 30,0',stroke:'#FFB300','stroke-width':9,'stroke-linecap':'round',fill:'none'},G);for(let f=0;f<4;f++)el('path',{d:`M-30,0 q -14 ${-8+f*5} -30 ${-6+f*4}`,stroke:'#FFE082','stroke-width':1.5,fill:'none'},G);const cl=el('circle',{r:26,fill:'#B3E5FC',opacity:.0},G);G.insertBefore(cl,G.firstChild);return {G,cl}});
  const nh3=[...Array(14)].map(()=>el('circle',{r:4,fill:'#B3E5FC'},g));const neu=[...Array(4)].map(()=>{const G=el('g',{},g);el('circle',{r:18,fill:'#CE93D8',stroke:'#7B1FA2','stroke-width':2},G);for(let j=0;j<3;j++)el('circle',{cx:-8+j*8,cy:(j%2?-4:4),r:5,fill:'#6A1B9A'},G);return G});
  const pin=el('path',{d:'',stroke:'#FF7043','stroke-width':3,fill:'none'},g);
  sbar(g,X0+10,YE+215,60,'~5 µm');
  const OX=1250;txt(g,T(U('Oqibatlar','Outcomes')),OX,190,{size:21,color:'ink',weight:800,anchor:'start'});
  const OUT=[[U('Surunkali gastrit','Chronic gastritis'),'~100%','#FFD54F'],[U('Peptik yara','Peptic ulcer'),'~10%','#FF8A65'],[U('Oshqozon adenokarsinomasi','Gastric adenocarcinoma'),'~1–3%','#EF5350'],[U('MALT limfoma','MALT lymphoma'),'<0,1%','#CE93D8']];
  const oB=OUT.map(([a,b,c],i)=>{const y=240+i*62;const G=el('g',{},g);el('rect',{x:OX,y,width:400,height:50,rx:10,fill:'#0D1B2A',stroke:c,'stroke-width':3},G);txt(G,T(a),OX+14,y+31,{size:18,color:'ink',weight:700,anchor:'start'});txt(G,typeof b==='string'?b:T(b),OX+386,y+31,{size:16,color:c,weight:800,anchor:'end'});return G});
  lines(g,OX,540,[U('Dunyo aholisining ~43% i yuqtirgan','~43% of the world population infected'),U('Tashxis: ¹³C-siydikchil nafas testi','Diagnosis: ¹³C-urea breath test'),U('Davolash: PPI + 2 antibiotik (yoki vismut','Treatment: PPI + 2 antibiotics (or bismuth'),U('kvadroterapiya) 14 kun','quadruple therapy) 14 days'),U('Nobel 2005: Marshall va Warren','Nobel 2005: Marshall & Warren')],{size:17,dy:30});
  const st=steps(g,X0,130,[[0,U('Xivchinlar bilan shilliqqa suzib kiradi','Swims into mucus with flagella')],[3,U('Ureaza NH₃ “bulut” hosil qilib, kislotani neytrallaydi','Urease makes an NH₃ “cloud”, neutralising acid')],[6,U('Epiteliyga yopishadi, CagA kiritadi, VacA ajratadi','Adheres, injects CagA, secretes VacA')],[9,U('Neytrofillar → surunkali gastrit','Neutrophils → chronic gastritis')]],{size:22});
  note(g,U('Sxema; bakteriya va hujayra o‘lchamlari taxminiy nisbatda','Schematic; bacterium and cell sizes in approximate proportion'),850,880,{size:18});
  Object.assign(A,{lumen:[X0+80,YL+40],mucus:[X0+60,YM+60],hp:{el:HP[2].G,fx:.5,fy:0},urease:{el:HP[4].G,fx:.5,fy:1},caga:()=>{const b=HP[1];return null},vaca:{el:cells[8].v,fx:.5,fy:.5},neut:{el:neu[1],fx:.5,fy:0},ep:[X0+30,YE+90],ulcer:{el:oB[1],fx:0,fy:.5}});A.caga=[X0+3*(X1-X0)/12,YE];
  const R0={anchors:A,core:['lumen','mucus','hp','urease','caga','vaca','neut','ep','ulcer'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;
    HP.forEach((h,i)=>{const tx=X0+90+i*165,q=Math.min(1,t/3);const y=lerp(YL+30,YE-40-(i%2)*30,q)+Math.sin(lt*3+i)*6;const x=tx+Math.sin(lt*.8+i)*20;at(h.G,{transform:`translate(${f2(x)},${f2(y)}) rotate(${f2(70-60*q+Math.sin(lt*4+i)*8)})`});at(h.cl,{opacity:t>=3?.45:0})});
    nh3.forEach((n,i)=>{const h=i%6;const q=(lt*.6+i/14)%1;const tx=X0+90+h*165;at(n,{cx:f2(tx+Math.cos(i*2.1)*q*40),cy:f2(YE-50+Math.sin(i*2.1)*q*40),opacity:t>=3?f2(1-q):0})});
    at(pin,{d:t>=6?`M${X0+90+165*1},${YE-40} L${X0+3*(X1-X0)/12+30},${YE+40}`:''});cells.forEach((c,i)=>at(c.v,{opacity:t>=6.5&&i%3===2?1:0}));
    neu.forEach((n,i)=>{const q=Math.min(1,Math.max(0,(t-9)/2));at(n,{transform:`translate(${f2(X0+150+i*240)},${f2(lerp(YE+260,YE+100,q))})`,opacity:t>=9?1:0})});oB.forEach((b,i)=>at(b,{opacity:t>=9?1:.4}));st(t)}};
  R0.update(0);return R0});
SM.items.tuberculosis=preset(1700,900,(g,it)=>{const A={},TT=it.cycle||14;if(it.kind&&it.kind!=='granuloma')SERR.push(`tuberculosis: kind "${it.kind}" → granuloma`);
  const GX=560,GY=480;const fib=el('circle',{cx:GX,cy:GY,r:0,fill:'none',stroke:'#BCAAA4','stroke-width':14,opacity:.8},g);
  const lymG=el('g',{},g),epG=el('g',{},g);const lym=[...Array(60)].map((_,i)=>el('circle',{r:9,fill:'#5C6BC0',stroke:'#C5CAE9','stroke-width':1.5},lymG));const ep=[...Array(32)].map(()=>el('ellipse',{rx:22,ry:12,fill:'#F48FB1',stroke:'#C2185B','stroke-width':2},epG));
  const giant=el('g',{},g);el('circle',{r:44,fill:'#F8BBD0',stroke:'#AD1457','stroke-width':3},giant);for(let i=0;i<12;i++){const a=Math.PI*.15+i*Math.PI*.7/11;el('ellipse',{cx:f2(Math.cos(a)*32),cy:f2(Math.sin(a)*32),rx:6,ry:4,fill:'#6A1B9A'},giant)}
  const cas=el('circle',{cx:GX,cy:GY,r:0,fill:'#FFF8E1',stroke:'#D7CCC8','stroke-width':3},g);const casT=el('g',{},g);for(let i=0;i<20;i++)el('circle',{cx:GX+Math.cos(i*2.4)*Math.sqrt(i)*12,cy:GY+Math.sin(i*2.4)*Math.sqrt(i)*12,r:3,fill:'#BCAAA4'},casT);
  const am=el('g',{},g);el('circle',{r:40,fill:'#F48FB1',stroke:'#C2185B','stroke-width':3},am);el('circle',{cx:-10,cy:-6,r:12,fill:'#AD1457'},am);const bac=[...Array(8)].map(()=>el('rect',{width:16,height:5,rx:2.5,fill:'#E53935'},g));
  sbar(g,140,800,100,'~100 µm');
  // left inset: airway
  txt(g,T(U('Yo‘l: yo‘tal → havo → alveola','Route: cough → air → alveolus')),160,190,{size:18,color:'ink',weight:700});const drops=[...Array(6)].map(()=>el('circle',{r:6,fill:'#90CAF9',opacity:.8},g));
  const C=axes(g,1150,200,470,260,{x:[0,100],y:[0,100],xt:[0,25,50,75,100],yt:[0,50,100],xl:U('Yuqtirganlar, %','Of those infected, %'),yl:U('Infeksiya natijasi','Infection outcome')});
  [[0,30,U('tozalanadi?','cleared?'),'#81C784'],[30,95,U('latent (simptomsiz)','latent (asymptomatic)'),'#FFD54F'],[95,100,U('faol sil 5–10%','active TB 5–10%'),'#EF5350']].forEach(([a,b,l,c],i)=>{el('rect',{x:C.px(a),y:270,width:C.px(b)-C.px(a),height:60,fill:c,opacity:.8},g);txt(g,T(l),(C.px(a)+C.px(b))/2,i===2?255:310,{size:15,color:i===2?c:'#0D1B2A',weight:800})});
  txt(g,T(U('Faol silning yarmi ilk 2 yilda','Half of active TB within 2 years')),C.px(50),380,{size:15,color:'dim',weight:700});txt(g,T(U('OIV: xavf ~20 baravar ↑','HIV: risk ~20× ↑')),C.px(50),410,{size:15,color:'#FF8A80',weight:700});
  lines(g,1150,530,[U('Dunyo aholisining ~¼ i latent yuqtirgan','~¼ of the world has latent infection'),U('2023: 10,8 mln yangi holat, 1,25 mln o‘lim (JSST)','2023: 10.8 M new cases, 1.25 M deaths (WHO)'),U('Bo‘yash: Sil–Nilsen (kislotaga chidamli)','Stain: Ziehl–Neelsen (acid-fast)'),U('Davolash: 2 oy HRZE + 4 oy HR','Treatment: 2 months HRZE + 4 months HR'),U('Mikolat kislotali devor; bo‘linish ~20 soat','Mycolic-acid wall; doubling ~20 h')],{size:17,dy:30});
  const st=steps(g,300,140,[[0,U('Tomchi yadrosi alveolaga yetadi','Droplet nucleus reaches the alveolus')],[2,U('Makrofag yutadi, lekin fagolizosoma hosil bo‘lmaydi','Macrophage engulfs, but phagolysosome fusion blocked')],[4.5,U('Th1 → IFN-γ: makrofaglar epiteloid va gigant hujayraga','Th1 → IFN-γ: macrophages become epithelioid and giant cells')],[8,U('Markazda kazeoz nekroz, chetida limfotsitlar','Caseous centre, lymphocyte cuff')],[11,U('Fibroz kapsula → latent sil (yoki kalsifikatsiya)','Fibrous capsule → latent TB (or calcification)')]],{size:21});
  note(g,U('Granulyoma kesimi, sxematik; Ø ~0,1–1 mm; foizlar taxminiy','Granuloma section, schematic; Ø ~0.1–1 mm; percentages approximate'),850,880,{size:18});
  Object.assign(A,{drop:[160,230],am:{el:am,fx:.5,fy:0},mtb:{el:bac[0],fx:.5,fy:.5},cas:{el:cas,fx:.5,fy:.5},epi:{el:ep[3],fx:.5,fy:0},lang:{el:giant,fx:.5,fy:0},lym:{el:lym[8],fx:.5,fy:1},fib:()=>[GX+285,GY+40]});
  const R0={anchors:A,core:['drop','am','mtb','cas','epi','lang','lym','fib'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;const c=x=>Math.max(0,Math.min(1,x));
    drops.forEach((d,i)=>{const q=(lt*.4+i/6)%1;at(d,{cx:f2(120+q*80),cy:f2(240+q*120+Math.sin(i)*20),opacity:t<4?f2(Math.sin(Math.PI*q)):0})});
    const g1=c((t-4.5)/3),g2=c((t-8)/2),g3=c((t-11)/2);const amx=t<2?lerp(260,GX,c(t/2)):GX;at(am,{transform:`translate(${f2(amx)},${GY})`,opacity:t<4.8?1:f2(1-c((t-4.8)/1))});
    bac.forEach((b,i)=>{const a=i*.8+lt*.2;const r=t<2?60:t<4.5?12+i:20+g1*60;const cx=(t<2?260+t*60:GX)+Math.cos(a)*r,cy=GY+Math.sin(a)*r;at(b,{x:f2(cx-8),y:f2(cy-2.5),opacity:t<9?1:.4})});
    ep.forEach((e,i)=>{const a=i/32*2*Math.PI,r=100+(i%2)*42;at(e,{transform:`translate(${f2(GX+Math.cos(a)*r*(.6+.4*g1))},${f2(GY+Math.sin(a)*r*(.6+.4*g1))}) rotate(${f2(a*57+90)})`,opacity:f2(g1)})});
    at(giant,{transform:`translate(${GX+165},${GY-130})`,opacity:f2(g1)});lym.forEach((l,i)=>{const a=i/60*2*Math.PI,r=210+(i%3)*22;at(l,{cx:f2(GX+Math.cos(a)*r),cy:f2(GY+Math.sin(a)*r),opacity:f2(c((t-5.5)/2))})});
    at(cas,{r:f2(80*g2)});at(casT,{opacity:f2(g2)});at(fib,{r:f2(285),opacity:f2(g3*.9)});st(t)}};
  R0.update(0);return R0});
SM.items.cholera=preset(1700,900,(g,it)=>{const A={},TT=it.cycle||12;if(it.kind&&it.kind!=='toxin')SERR.push(`cholera: kind "${it.kind}" → toxin`);
  const X0=80,X1=1080,YT=360,YB=640;el('rect',{x:X0,y:150,width:X1-X0,height:YT-150,fill:'#0D47A1',opacity:.15},g);txt(g,T(U('Ichak bo‘shlig‘i','Intestinal lumen')),X0+10,175,{size:17,color:'dim',weight:700,anchor:'start'});
  const cells=[];for(let i=0;i<5;i++){const x=X0+i*(X1-X0)/5,w=(X1-X0)/5;const G=el('g',{},g);el('rect',{x:x+4,y:YT,width:w-8,height:YB-YT,rx:10,fill:'#F8BBD0',stroke:'#EC407A','stroke-width':2},G);for(let m=0;m<10;m++)el('rect',{x:x+10+m*(w-20)/10,y:YT-16,width:6,height:16,rx:3,fill:'#F48FB1'},G);el('circle',{cx:x+w/2,cy:YB-50,r:18,fill:'#AD1457'},G);cells.push({G,x,w})}
  txt(g,T(U('Qon / interstitsiy','Blood / interstitium')),X0+10,YB+40,{size:17,color:'dim',weight:700,anchor:'start'});
  const cx=X0+(X1-X0)*.5,cw=(X1-X0)/5;const c0=cx-cw/2;// focus cell = index 2
  const vc=comma(g,'#FFB300',54);const ct=el('g',{},g);el('circle',{r:16,fill:'#EF5350'},ct);for(let i=0;i<5;i++)el('circle',{cx:Math.cos(i*1.256)*20,cy:16+Math.sin(i*1.256)*6,r:7,fill:'#FFAB91'},ct);
  const gm1=el('path',{d:`M${c0+40},${YT-16} l0,-14 M${c0+60},${YT-16} l0,-14 M${c0+80},${YT-16} l0,-14`,stroke:'#81C784','stroke-width':4},g);
  const gsB=box(g,cx,YT+60,170,40,'Gsα',  '#FFB74D',{size:17}),acB=box(g,cx,YT+120,170,40,'AC → cAMP','#FFD54F',{size:17}),pkB=box(g,cx,YT+180,170,40,'PKA','#AED581',{size:17});
  const cftr=el('rect',{x:c0+cw-50,y:YT-12,width:26,height:30,rx:6,fill:'#4FC3F7',stroke:'#E1F5FE','stroke-width':2},g);const sg=el('rect',{x:c0+10,y:YT-12,width:22,height:28,rx:6,fill:'#9575CD',stroke:'#EDE7F6','stroke-width':2},g);
  const cl=[...Array(10)].map(()=>el('circle',{r:6,fill:'#4FC3F7'},g)),wa=[...Array(16)].map(()=>el('circle',{r:5,fill:'#B3E5FC',opacity:.8},g));
  sbar(g,X0,YB+80,100,'~10 µm');
  const C=axes(g,1200,200,420,250,{x:[0,24],y:[0,1.2],xt:[0,6,12,18,24],yt:[0,.5,1],xl:U('soat','hours'),yl:U('Suyuqlik yo‘qotish, L/soat','Fluid loss, L/h')});
  const FL=h=>h<4?0:1.0*(1-Math.exp(-(h-4)/3));el('path',{d:pth(h=>[C.px(h),C.py(FL(h))],0,24,80),stroke:'#4FC3F7','stroke-width':4,fill:'none'},g);const cur=el('circle',{r:7,fill:TH.ink},g);
  lines(g,1200,540,[U('Najas “guruch suvi”, kuniga 10–20 L gacha','“Rice-water” stool, up to 10–20 L/day'),U('Davolanmasa o‘lim 25–50%; ORS bilan <1%','Untreated mortality 25–50%; with ORS <1%'),U('JSST ORS: Na⁺ 75, glyukoza 75 mmol/L, 245 mOsm/L','WHO ORS: Na⁺ 75, glucose 75 mmol/L, 245 mOsm/L'),U('Yuqumli doza ~10⁸–10¹¹ (kislota bakteriyani o‘ldiradi)','Infectious dose ~10⁸–10¹¹ (acid kills bacteria)')],{size:17,dy:30});
  const st=steps(g,X0,130,[[0,U('V. cholerae ingichka ichak shilliqiga yopishadi','V. cholerae colonises small-bowel mucus')],[2,U('Toksin B-subbirliklari GM1 ga bog‘lanadi, A1 kiradi','Toxin B subunits bind GM1, A1 enters')],[4,U('Gsα doim faol → cAMP ↑ → PKA','Gsα locked on → cAMP ↑ → PKA')],[6,U('CFTR orqali Cl⁻, ortidan Na⁺ va suv chiqadi','Cl⁻ out via CFTR, Na⁺ and water follow')],[9,U('SGLT1 buzilmagan: Na⁺–glyukoza suvni qaytaradi (ORS)','SGLT1 intact: Na⁺–glucose pulls water back (ORS)')]],{size:22});
  note(g,U('Sxema; hujayralar va toksin o‘lchami taxminiy nisbatda','Schematic; cell and toxin sizes approximate'),850,880,{size:18});
  Object.assign(A,{vc:{el:vc,fx:.5,fy:0},ct:{el:ct,fx:.5,fy:0},gm1:{el:gm1,fx:.5,fy:0},gs:{el:gsB.G,fx:0,fy:.5},ac:{el:acB.G,fx:1,fy:.5},cftr:{el:cftr,fx:.5,fy:0},sglt:{el:sg,fx:.5,fy:1}});
  const R0={anchors:A,core:['vc','ct','gm1','gs','ac','cftr','sglt'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;const c=x=>Math.max(0,Math.min(1,x));
    at(vc,{transform:`translate(${f2(c0-150+Math.sin(lt)*20)},${f2(lerp(200,300,c(t/2)))}) rotate(${f2(-20+Math.sin(lt*3)*10)})`});
    const q=c((t-1.5)/1.5);at(ct,{transform:`translate(${f2(lerp(c0-80,c0+60,q))},${f2(lerp(260,YT-50,q))})`,opacity:t<4?1:.5});
    lit(gsB,t>=4);lit(acB,t>=4.5);lit(pkB,t>=5.2);const sec=t>=6,ors=t>=9;
    cl.forEach((p,i)=>{const u=(lt*.6+i/10)%1;at(p,{cx:f2(c0+cw-37),cy:f2(YT+60-u*200),opacity:sec?f2(Math.sin(Math.PI*u)):0})});
    wa.forEach((p,i)=>{const u=(lt*.5+i/16)%1;const down=ors&&i%2===0;at(p,{cx:f2(c0+cw-60+((i*17)%60)-(down?cw-60:0)),cy:f2(down?YT-140+u*200:YT+60-u*200),opacity:sec?f2(Math.sin(Math.PI*u)):0,fill:down?'#B39DDB':'#B3E5FC'})});
    at(sg,{'stroke-width':ors?5:2});const h=24*t/TT;at(cur,{cx:f2(C.px(h)),cy:f2(C.py(FL(h)))});st(t)}};
  R0.update(0);return R0});
/* ---------- PYOGENIC COCCI: S. aureus (abscess, coagulase, MRSA) · S. pyogenes (spreading, M protein, sequelae) ---------- */
KIT.names(NAMES.uz,{sa:'S. aureus: to‘p-to‘p (uzum) koklar, Gram+',coag:'Koagulaza → fibrin qobiq',abs:'Absess: yiring (neytrofillar)',caps:'Fibrin/granulyatsion kapsula',prA:'A oqsil (IgG Fc ni bog‘laydi)',mrsa:'MRSA: mecA → PBP2a',
  sp:'S. pyogenes: zanjir koklar, Gram+',mprot:'M oqsil (fagotsitozga qarshi)',spread:'Gialuronidaza, streptokinaza → tarqaladi (flegmona)',hem:'β-gemoliz (qonli agar)',rf:'Revmatik isitma: molekulyar o‘xshashlik',gn:'Glomerulonefrit (immun kompleks)'});
KIT.names(NAMES.en,{sa:'S. aureus: clustered (grape) cocci, Gram+',coag:'Coagulase → fibrin shield',abs:'Abscess: pus (neutrophils)',caps:'Fibrin/granulation capsule',prA:'Protein A (binds IgG Fc)',mrsa:'MRSA: mecA → PBP2a',
  sp:'S. pyogenes: chained cocci, Gram+',mprot:'M protein (antiphagocytic)',spread:'Hyaluronidase, streptokinase → spreads (cellulitis)',hem:'β-haemolysis (blood agar)',rf:'Rheumatic fever: molecular mimicry',gn:'Glomerulonephritis (immune complex)'});
SM.items.pyogenic=preset(1700,900,(g,it)=>{const k=it.kind||'staph',A={};if(!['staph','strep'].includes(k))SERR.push(`pyogenic: kind "${k}" → staph, strep`);const TT=it.cycle||12;let R0;const st6=k==='staph';
  // micro inset
  const MX=200,MY=330;el('circle',{cx:MX,cy:MY,r:130,fill:'#F3E5F5',stroke:'#9E9E9E','stroke-width':6},g);const cocci=el('g',{},g);
  if(st6){for(let i=0;i<24;i++){const cl=Math.floor(i/8),j=i%8;const cx=MX-60+cl*60+(j%3)*14,cy=MY-50+cl*40+Math.floor(j/3)*14;el('circle',{cx,cy,r:7,fill:'#6A1B9A'},cocci)}}
  else{for(let c=0;c<3;c++)for(let j=0;j<10;j++){const a=c*1.1+j*.15;el('circle',{cx:MX-90+j*17+c*10,cy:MY-60+c*55+Math.sin(j*.7+c)*12,r:7,fill:'#6A1B9A'},cocci)}}
  txt(g,T(U('Gram bo‘yash, ×1000 (Ø ~1 µm)','Gram stain, ×1000 (Ø ~1 µm)')),MX,MY+160,{size:16,color:'ink',weight:700});
  // tissue
  const TX=420,TY=200,TW=680,TH2=480;el('rect',{x:TX,y:TY,width:TW,height:TH2,rx:14,fill:'#F8BBD0',opacity:.35},g);el('rect',{x:TX,y:TY,width:TW,height:40,fill:'#D7A9A0',opacity:.6},g);txt(g,T(U('Epidermis','Epidermis')),TX+10,TY+26,{size:15,color:'#3E2723',weight:700,anchor:'start'});
  for(let i=0;i<6;i++)el('path',{d:`M${TX+60+i*110},${TY+60} q 30 120 -10 400`,stroke:'#E57373','stroke-width':4,fill:'none',opacity:.6},g);
  const CX=TX+TW/2,CY=TY+260;const les=el('path',{d:'',fill:st6?'#FFF59D':'#EF9A9A',opacity:.85},g);const cap=el('path',{d:'',fill:'none',stroke:'#8D6E63','stroke-width':10,opacity:0},g);
  const neu=[...Array(30)].map(()=>el('circle',{r:7,fill:'#CE93D8',stroke:'#7B1FA2','stroke-width':1.5},g));const bac=[...Array(24)].map(()=>el('circle',{r:4,fill:'#6A1B9A'},g));
  sbar(g,TX+20,TY+TH2+30,100,'~1 mm');
  const blob=(r,irr)=>{let d='';for(let i=0;i<=40;i++){const a=i/40*2*Math.PI;const rr=r*(1+(irr?.35*Math.sin(5*a)+.2*Math.sin(9*a+1):.06*Math.sin(4*a)));d+=(i?'L':'M')+f2(CX+Math.cos(a)*rr*1.3)+','+f2(CY+Math.sin(a)*rr*.8)}return d+'Z'};
  const RX=1180;
  if(st6){
    const rows=[[U('Koagulaza +','Coagulase +'),U('fibrin bilan o‘zini o‘raydi','walls itself off with fibrin')],[U('Toksinlar','Toxins'),U('TSST-1, enterotoksin, PVL, eksfoliatin','TSST-1, enterotoxin, PVL, exfoliatin')],[U('Kasalliklar','Diseases'),U('furunkul, absess, osteomielit, endokardit, sepsis','boil, abscess, osteomyelitis, endocarditis, sepsis')],['MRSA',U('mecA → PBP2a: β-laktamlar ta’sir qilmaydi','mecA → PBP2a: β-lactams ineffective')],[U('Davolash','Treatment'),U('drenaj + MSSA: oksatsillin; MRSA: vankomitsin','drainage + MSSA: oxacillin; MRSA: vancomycin')]];
    rows.forEach(([a,b],i)=>{txt(g,typeof a==='string'?a:T(a),RX,230+i*70,{size:19,color:'#FFD54F',weight:800,anchor:'start'});txt(g,T(b),RX,256+i*70,{size:16,color:'ink',weight:600,anchor:'start'})});
    const st=steps(g,TX,160,[[0,U('Bakteriya teri teshigi/follikula orqali kiradi','Bacteria enter via a break/follicle')],[3,U('Koagulaza fibrin to‘r hosil qiladi','Coagulase forms a fibrin mesh')],[6,U('Neytrofillar to‘planadi → yiring','Neutrophils accumulate → pus')],[9,U('Kapsula o‘raydi → chegaralangan absess','Capsule forms → localised abscess')]],{size:22});
    Object.assign(A,{sa:{el:cocci,fx:.5,fy:0},coag:()=>[CX+150,CY-40],abs:[CX,CY],caps:()=>[CX,CY+150],prA:{el:bac[3],fx:.5,fy:.5},mrsa:[RX,440]});
    R0={anchors:A,core:['sa','coag','abs','caps','prA','mrsa'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;const gr=Math.min(1,t/9);const r=30+110*gr;
      at(les,{d:blob(r,false)});at(cap,{d:blob(r+8,false),opacity:t>=9?f2(Math.min(1,(t-9)/1.5)):t>=3?.35:0,stroke:t>=9?'#8D6E63':'#FFE082'});
      neu.forEach((n,i)=>{const a=i*2.4,rr=Math.sqrt((i+1)/30)*r*.9;const on=t>=6||i<4;at(n,{cx:f2(CX+Math.cos(a)*rr*1.3),cy:f2(CY+Math.sin(a)*rr*.8),opacity:on?1:0})});
      bac.forEach((b,i)=>{const a=i*1.7+lt*.1,rr=(i%5)*r*.18;at(b,{cx:f2(CX+Math.cos(a)*rr*1.2),cy:f2(CY+Math.sin(a)*rr*.7)})});st(t)}};
  }else{
    const C=axes(g,RX,220,440,200,{x:[0,6],y:[0,1],xt:[0,1,2,3,4,5,6],xl:U('hafta (tomoq infeksiyasidan keyin)','weeks after pharyngitis'),yl:U('Asoratlar vaqti','Timing of sequelae')});
    el('rect',{x:C.px(0),y:250,width:C.px(1)-C.px(0),height:36,fill:'#EF5350'},g);txt(g,T(U('angina','pharyngitis')),C.px(.5),274,{size:14,color:'ink',weight:800});
    el('rect',{x:C.px(2),y:300,width:C.px(4)-C.px(2),height:36,fill:'#FFB74D'},g);txt(g,T(U('revmatik isitma','rheumatic fever')),C.px(3),324,{size:14,color:'#0D1B2A',weight:800});
    el('rect',{x:C.px(1),y:350,width:C.px(3)-C.px(1),height:36,fill:'#4FC3F7'},g);txt(g,T(U('glomerulonefrit','glomerulonephritis')),C.px(2),374,{size:14,color:'#0D1B2A',weight:800});
    const cur=el('line',{y1:220,y2:420,stroke:TH.ink,'stroke-width':2},g);
    lines(g,RX,500,[U('M oqsil ↔ yurak miozini: o‘xshash epitoplar','M protein ↔ cardiac myosin: shared epitopes'),U('→ mitral qopqoq shikasti (revmatik yurak kasalligi)','→ mitral valve damage (rheumatic heart disease)'),U('Angina 10 kun penitsillin bilan → isitma oldi olinadi','10-day penicillin for pharyngitis prevents fever'),U('Invaziv: nekrozlovchi fassiit, toksik shok','Invasive: necrotising fasciitis, toxic shock'),U('Tashxis: ASO titri, tezkor antigen testi','Diagnosis: ASO titre, rapid antigen test')],{size:17,dy:30});
    const st=steps(g,TX,160,[[0,U('Zanjir koklar to‘qimaga kiradi','Chained cocci enter tissue')],[2.5,U('M oqsil fagotsitozdan himoya qiladi','M protein blocks phagocytosis')],[5,U('Fermentlar to‘qimani eritadi → chegarasiz tarqalish','Enzymes dissolve tissue → borderless spread')],[8.5,U('2–4 haftadan keyin immun asoratlar','Immune sequelae after 2–4 weeks')]],{size:22});
    Object.assign(A,{sp:{el:cocci,fx:.5,fy:0},mprot:{el:bac[5],fx:.5,fy:.5},spread:()=>[CX+250,CY],hem:[MX,MY+130],rf:[C.px(3),300],gn:[C.px(2),386]});
    R0={anchors:A,core:['sp','mprot','spread','hem','rf','gn'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;const gr=Math.min(1,t/8);const r=30+150*gr;
      at(les,{d:blob(r,true),opacity:f2(.4+.4*gr)});at(cap,{opacity:0});
      neu.forEach((n,i)=>{const a=i*2.4,rr=Math.sqrt((i+1)/30)*r;at(n,{cx:f2(CX+Math.cos(a)*rr*1.3),cy:f2(CY+Math.sin(a)*rr*.8),opacity:i%3===0?1:0})});
      bac.forEach((b,i)=>{const ch=Math.floor(i/6),j=i%6;const a=ch*1.57+.3,rr=r*.85-j*9;at(b,{cx:f2(CX+Math.cos(a)*rr*1.3+j*3),cy:f2(CY+Math.sin(a)*rr*.8)})});
      at(cur,{x1:f2(C.px(6*t/TT)),x2:f2(C.px(6*t/TT))});st(t)}};
  }
  note(g,U('Sxema; teri kesimi va mikroskop ko‘rinishi turli masshtabda','Schematic; skin section and microscopy at different scales'),850,880,{size:18});
  R0.update(0);return R0});
/* ---------- HEPATITIS B (life cycle · serology) · SARS-CoV-2 (entry & replication · course) ---------- */
KIT.names(NAMES.uz,{dane:'Deyn zarrasi (Ø 42 nm)',hbsag:'HBsAg qobig‘i',ntcp:'NTCP retseptori',ccc:'cccDNK (yadroda, uzoq saqlanadi)',pg:'pgRNK → kapsidda teskari transkripsiya',sub:'Bo‘sh HBsAg zarralari (10³–10⁵ marta ko‘p)',nuc:'Yadro',hep:'Gepatotsit',
  spike:'S oqsil (spike) trimeri',ace2:'ACE2 retseptori',tmp:'TMPRSS2 S2′ ni kesadi → membrana qo‘shilishi',rna:'(+)RNK genom (~30 kb)',rdrp:'RdRp (remdesivir nishoni)',mpro:'Mpro (nirmatrelvir nishoni)',dmv:'Ikki membranali pufakchalar',erg:'ERGIC: yig‘ilish',exo:'Ekzotsitoz'});
KIT.names(NAMES.en,{dane:'Dane particle (Ø 42 nm)',hbsag:'HBsAg envelope',ntcp:'NTCP receptor',ccc:'cccDNA (nuclear, persistent)',pg:'pgRNA → reverse transcription in capsid',sub:'Empty HBsAg particles (10³–10⁵× excess)',nuc:'Nucleus',hep:'Hepatocyte',
  spike:'Spike (S) trimer',ace2:'ACE2 receptor',tmp:'TMPRSS2 cleaves S2′ → membrane fusion',rna:'(+)RNA genome (~30 kb)',rdrp:'RdRp (remdesivir target)',mpro:'Mpro (nirmatrelvir target)',dmv:'Double-membrane vesicles',erg:'ERGIC: assembly',exo:'Exocytosis'});
const vcyc=(g,cell,nucD,steps6)=>{};
SM.items.hepatitis=preset(1700,900,(g,it)=>{const k=it.kind||'hbv',A={};if(!['hbv','serology'].includes(k))SERR.push(`hepatitis: kind "${k}" → hbv, serology`);const TT=it.cycle||12;let R0;
  if(k==='hbv'){
    const CX=600,CY=500;const cell=el('path',{d:`M${CX-440},${CY-260} L${CX+440},${CY-260} L${CX+440},${CY+300} L${CX-440},${CY+300} Z`,fill:'#F8BBD0',opacity:.3,stroke:'#EC407A','stroke-width':4},g);
    const nuc=el('ellipse',{cx:CX+150,cy:CY+90,rx:170,ry:130,fill:'#CE93D8',opacity:.45,stroke:'#8E24AA','stroke-width':4},g);
    const ntcp=[CX-300,CX-200].map(x=>el('rect',{x:x-8,y:CY-280,width:16,height:40,rx:5,fill:'#4DB6AC'},g));
    const dane=()=>{const G=el('g',{},g);el('circle',{r:22,fill:'#FFB74D',stroke:'#E65100','stroke-width':3},G);el('polygon',{points:'0,-12 11,-6 11,6 0,12 -11,6 -11,-6',fill:'#4FC3F7'},G);el('path',{d:'M-5,-4 a6,6 0 1 0 6,-2',stroke:'#0D47A1','stroke-width':2,fill:'none'},G);return G};
    const V=[dane(),dane(),dane()];const subs=[...Array(10)].map((_,i)=>el(i%2?'circle':'rect',i%2?{r:9,fill:'#FFB74D'}:{width:30,height:10,rx:5,fill:'#FFB74D'},g));
    const ccc=el('circle',{cx:CX+150,cy:CY+90,r:20,fill:'none',stroke:'#1565C0','stroke-width':5},g);const rnas=[...Array(6)].map(()=>el('path',{d:'M0,0 q10,-8 20,0 t20,0',stroke:'#E53935','stroke-width':3,fill:'none'},g));
    const er=el('path',{d:`M${CX-380},${CY+50} q 40 -40 80 0 t 80 0 t 80 0`,stroke:'#90A4AE','stroke-width':10,fill:'none',opacity:.6},g);
    sbar(g,CX-430,CY+325,84,U('~1 µm (hujayra); virus kattalashtirilgan','~1 µm (cell); virus enlarged'),true);
    const RX=1150;lines(g,RX,200,[U('Genom: qisman qo‘sh zanjirli DNK, 3,2 kb','Genome: partially dsDNA, 3.2 kb'),U('Revers transkriptaza bor → NRTI (tenofovir, entekavir)','Has reverse transcriptase → NRTIs (tenofovir, entecavir)'),U('cccDNK tufayli to‘liq davolash qiyin','cccDNA makes cure difficult'),U('Surunkalashish: chaqaloqlarda ~90%, kattalarda <5%','Chronicity: ~90% in neonates, <5% in adults'),U('Dunyoda ~254 mln surunkali (JSST 2022)','~254 M chronically infected (WHO 2022)'),U('Vaksina: rekombinant HBsAg, ~95% himoya','Vaccine: recombinant HBsAg, ~95% protection'),U('Asorat: sirroz, gepatotsellyulyar karsinoma','Complications: cirrhosis, hepatocellular carcinoma')],{size:17,dy:34,color:'ink'});
    const st=steps(g,160,150,[[0,U('Virion NTCP ga bog‘lanib kiradi','Virion binds NTCP and enters')],[2.5,U('Kapsid yadroga → cccDNK hosil bo‘ladi','Capsid to nucleus → cccDNA forms')],[5,U('Transkripsiya: pgRNK va mRNK lar','Transcription: pgRNA and mRNAs')],[7.5,U('Kapsidda teskari transkripsiya → DNK','Reverse transcription in capsid → DNA')],[9.5,U('ER da qobiq olib chiqadi; bo‘sh HBsAg ham','Enveloped at ER and secreted; plus empty HBsAg')]],{size:22});
    Object.assign(A,{dane:{el:V[0],fx:.5,fy:0},ntcp:{el:ntcp[1],fx:.5,fy:0},ccc:{el:ccc,fx:.5,fy:1},pg:{el:rnas[2],fx:.5,fy:0},sub:{el:subs[4],fx:.5,fy:1},nuc:{el:nuc,fx:.9,fy:.9},hep:[CX-420,CY+250],hbsag:{el:V[2],fx:1,fy:.5}});
    const path=[[CX-200,CY-330],[CX-200,CY-230],[CX-50,CY-60],[CX+120,CY+60]];
    R0={anchors:A,core:['dane','ntcp','ccc','pg','sub','nuc','hep','hbsag'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;const c=x=>Math.max(0,Math.min(1,x));
      const q=c(t/3);const [x,y]=along(path,q);at(V[0],{transform:`translate(${f2(x)},${f2(y)})`,opacity:t<3?1:0});at(ccc,{opacity:t>=2.5?1:.15});
      rnas.forEach((r,i)=>{const u=(lt*.3+i/6)%1;const on=t>=5;const rx=lerp(CX+150,CX-320+i*30,u),ry=lerp(CY+90,CY+40,u);at(r,{transform:`translate(${f2(rx)},${f2(ry)})`,opacity:on?f2(Math.sin(Math.PI*u)):0})});
      [V[1],V[2]].forEach((v,i)=>{const u=c((t-7.5-i*.8)/2.5);const p2=[[CX-260,CY+40],[CX-100,CY-120],[CX+100,CY-330]];const [vx,vy]=along(p2,u);at(v,{transform:`translate(${f2(vx+i*80)},${f2(vy)})`,opacity:t>=7.5?1:0})});
      subs.forEach((s,i)=>{const u=c((t-9.5)/2.5);const sx=CX+120+i*30,sy=lerp(CY-120,CY-330-((i*13)%40),u);at(s,s.tagName==='circle'?{cx:f2(sx),cy:f2(sy),opacity:t>=9.5?1:0}:{x:f2(sx-15),y:f2(sy-5),opacity:t>=9.5?1:0})});st(t)}};
  }else{
    const C=axes(g,120,200,1000,520,{x:[0,52],y:[0,1],xt:[0,4,8,12,16,20,24,28,32,36,40,44,48,52],xl:U('Yuqtirgandan keyin, hafta','Weeks after exposure'),yl:U('Nisbiy daraja (o‘tkir, tuzaladigan HBV)','Relative level (acute, resolving HBV)')});
    const bump=(a,p,b,h)=>w=>w<a||w>b?0:h*(w<p?Math.sin(Math.PI/2*(w-a)/(p-a)):Math.cos(Math.PI/2*(w-p)/(b-p)));const rise=(a,p,h)=>w=>w<a?0:h*Math.min(1,(w-a)/(p-a));
    const S=[[bump(2,10,20,.95),'#E53935','HBV DNA'],[bump(4,12,24,.85),'#FFB74D','HBsAg'],[bump(5,11,18,.6),'#FFD54F','HBeAg'],[w=>rise(18,24,.7)(w),'#81C784','anti-HBe'],[bump(8,16,40,.75),'#BA68C8','anti-HBc IgM'],[w=>rise(10,22,.9)(w),'#8D6E63','anti-HBc IgG'],[w=>rise(26,34,1)(w),'#4FC3F7','anti-HBs']];
    const cvs=S.map(([f,c,l],i)=>{const p=el('path',{d:pth(w=>[C.px(w),C.py(f(w))],0,52,200),stroke:c,'stroke-width':4,fill:'none'},g);return p});
    S.forEach(([f,c,l],i)=>{const y=210+i*30;el('line',{x1:1180,x2:1220,y1:y,y2:y,stroke:c,'stroke-width':5},g);txt(g,l,1230,y+6,{size:18,color:c,weight:800,anchor:'start'})});
    el('rect',{x:C.px(24),y:200,width:C.px(27)-C.px(24),height:520,fill:'#FFF',opacity:.08},g);txt(g,T(U('“oyna” davri','“window” period')),C.px(25.5),190,{size:15,color:'#FFD54F',weight:800});
    const sym=el('rect',{x:C.px(8),y:705,width:C.px(20)-C.px(8),height:12,fill:'#EF9A9A'},g);txt(g,T(U('simptomlar, ALT ↑','symptoms, ALT ↑')),C.px(14),698,{size:15,color:'#EF9A9A',weight:700});
    const cur=el('line',{y1:200,y2:720,stroke:TH.ink,'stroke-width':2},g);const tx=el('text',{x:1180,y:470,'font-size':20,'font-weight':800,fill:TH.ink},g);
    lines(g,1180,520,[U('Oyna davrida faqat anti-HBc IgM musbat','In the window only anti-HBc IgM is positive'),U('anti-HBs = immunitet (vaksina ham beradi)','anti-HBs = immunity (also from vaccine)'),U('HBsAg >6 oy → surunkali infeksiya','HBsAg >6 months → chronic infection'),U('HBeAg = faol replikatsiya, yuqumlilik ↑','HBeAg = active replication, high infectivity')],{size:17,dy:30});
    const st=steps(g,120,150,[[0,U('Inkubatsiya: HBV DNK va HBsAg ko‘tariladi','Incubation: HBV DNA and HBsAg rise')],[3,U('Simptomlar: anti-HBc IgM paydo bo‘ladi','Symptoms: anti-HBc IgM appears')],[6,U('HBsAg yo‘qoladi, anti-HBs hali yo‘q — oyna','HBsAg gone, anti-HBs not yet — window')],[8,U('anti-HBs → tuzalish va immunitet','anti-HBs → recovery and immunity')]],{size:22});
    Object.assign(A,{});
    R0={anchors:A,core:[],update(lt){const t=((lt%TT)+TT)%TT;const w=52*t/TT;at(cur,{x1:f2(C.px(w)),x2:f2(C.px(w))});tx.textContent=`${Math.round(w)} ${T(U('hafta','weeks'))}`;st(t)}};
  }
  if(k==='hbv')note(g,U('Sxema; virion va organellalar kattalashtirilgan','Schematic; virion and organelles enlarged'),850,880,{size:18});
  else note(g,U('Sxema; vaqt va darajalar taxminiy (CDC/JSST sxemalari bo‘yicha)','Schematic; timing and levels approximate (after CDC/WHO diagrams)'),850,880,{size:18});
  R0.update(0);return R0});
SM.items.sarscov2=preset(1700,900,(g,it)=>{const k=it.kind||'entry',A={};if(!['entry','course'].includes(k))SERR.push(`sarscov2: kind "${k}" → entry, course`);const TT=it.cycle||12;let R0;
  if(k==='entry'){
    const MY=300;el('rect',{x:80,y:MY,width:1040,height:480,fill:'#F8BBD0',opacity:.22},g);el('line',{x1:80,x2:1120,y1:MY,y2:MY,stroke:'#EC407A','stroke-width':8},g);txt(g,T(U('Nafas yo‘li epiteliy hujayrasi','Airway epithelial cell')),100,MY+30,{size:16,color:'dim',weight:700,anchor:'start'});
    const ace=[260,420].map(x=>{const G=el('g',{},g);el('path',{d:`M${x},${MY} l0,-34 l-12,-14 m12,14 l12,-14`,stroke:'#4DB6AC','stroke-width':7,fill:'none'},G);return G});const tm=el('rect',{x:330,y:MY-26,width:20,height:30,rx:6,fill:'#FFB74D'},g);
    const vir=()=>{const G=el('g',{},g);el('circle',{r:46,fill:'#B0BEC5',stroke:'#78909C','stroke-width':3},G);for(let i=0;i<12;i++){const a=i/12*2*Math.PI;el('path',{d:`M${f2(Math.cos(a)*46)},${f2(Math.sin(a)*46)} L${f2(Math.cos(a)*64)},${f2(Math.sin(a)*64)}`,stroke:'#EF5350','stroke-width':5},G);el('circle',{cx:f2(Math.cos(a)*66),cy:f2(Math.sin(a)*66),r:6,fill:'#EF5350'},G)}el('path',{d:'M-20,-10 q10,-10 20,0 t20,0 M-20,10 q10,-10 20,0 t20,0',stroke:'#FFD54F','stroke-width':3,fill:'none'},G);return G};
    const V=vir();const rna=el('path',{d:'',stroke:'#FFD54F','stroke-width':4,fill:'none'},g);
    const rib=[...Array(5)].map(()=>el('circle',{r:9,fill:'#7986CB'},g));const pp=el('path',{d:'',stroke:'#AED581','stroke-width':6,fill:'none'},g);
    const dmv=[...Array(4)].map((_,i)=>{const G=el('g',{},g);el('circle',{cx:740+i*60,cy:470+(i%2)*40,r:24,fill:'none',stroke:'#90A4AE','stroke-width':4},G);el('circle',{cx:740+i*60,cy:470+(i%2)*40,r:16,fill:'none',stroke:'#90A4AE','stroke-width':3},G);return G});
    const erg=el('path',{d:'M900,640 q40,-30 80,0 t80,0',stroke:'#B0BEC5','stroke-width':12,fill:'none'},g);const kids=[0,1,2].map(()=>{const G=el('g',{},g);el('circle',{r:20,fill:'#B0BEC5',stroke:'#EF5350','stroke-width':4},G);return G});
    const rd=box(g,560,560,200,44,'RdRp (nsp12)','#FFD54F',{size:17}),mp=box(g,560,500,200,44,'Mpro (nsp5)','#AED581',{size:17});
    sbar(g,90,820,100,'~100 nm (virus)');
    const RX=1180;lines(g,RX,200,[U('Virion Ø ~100 nm; spike ~20 nm','Virion Ø ~100 nm; spike ~20 nm'),U('Genom: (+)RNK ~30 kb (eng katta RNK viruslardan)','Genome: (+)RNA ~30 kb (among largest RNA viruses)'),U('Kirish: ACE2 + TMPRSS2 (yoki endosomada katepsin L)','Entry: ACE2 + TMPRSS2 (or endosomal cathepsin L)'),U('pp1a/pp1ab → Mpro va PLpro bilan kesiladi','pp1a/pp1ab cleaved by Mpro and PLpro'),U('Remdesivir: RdRp; nirmatrelvir: Mpro','Remdesivir: RdRp; nirmatrelvir: Mpro'),U('Bir hujayradan ~10³ virion','~10³ virions per cell')],{size:17,dy:34,color:'ink'});
    const st=steps(g,100,150,[[0,U('Spike RBD ACE2 ga bog‘lanadi','Spike RBD binds ACE2')],[2,U('TMPRSS2 kesadi → membranalar qo‘shiladi','TMPRSS2 cleaves → membranes fuse')],[4,U('(+)RNK ribosomada pp1a/pp1ab ga tarjima','(+)RNA translated to pp1a/pp1ab')],[6.5,U('Ikki membranali pufakchalarda RdRp replikatsiyasi','RdRp replication in double-membrane vesicles')],[9,U('ERGIC da yig‘ilish → ekzotsitoz','Assembly in ERGIC → exocytosis')]],{size:22});
    Object.assign(A,{spike:{el:V,fx:.5,fy:0},ace2:{el:ace[1],fx:.5,fy:0},tmp:{el:tm,fx:.5,fy:0},rna:()=>[480,420],rdrp:{el:rd.G,fx:.5,fy:1},mpro:{el:mp.G,fx:0,fy:.5},dmv:{el:dmv[2],fx:.5,fy:0},erg:{el:erg,fx:.5,fy:1},exo:()=>[1060,MY]});
    R0={anchors:A,core:['spike','ace2','tmp','rna','rdrp','mpro','dmv','erg','exo'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;const c=x=>Math.max(0,Math.min(1,x));
      const q=c(t/2);at(V,{transform:`translate(${f2(420)},${f2(lerp(MY-260,MY-110,q))})`,opacity:t<3.2?1:f2(Math.max(0,1-(t-3.2)))});
      at(rna,{d:t>=2.8?`M420,${MY+10} q 30 60 60 80 t 80 40`:'',opacity:t<9?1:.4});
      rib.forEach((r,i)=>{const on=t>=4;at(r,{cx:470+i*35,cy:MY+150+Math.sin(lt*2+i)*4,opacity:on?1:0})});at(pp,{d:t>=4.5?`M470,${MY+175} L${f2(470+Math.min(1,(t-4.5)/1.5)*160)},${MY+175}`:''});
      dmv.forEach((d,i)=>at(d,{opacity:t>=6.5?1:.15}));lit(rd,t>=6.5&&t<9);lit(mp,t>=4.5&&t<6.5);
      kids.forEach((v,i)=>{const u=c((t-9-i*.5)/2);at(v,{transform:`translate(${f2(lerp(960,1000+i*40,u))},${f2(lerp(620,MY-60,u))})`,opacity:t>=9?1:0})});st(t)}};
  }else{
    const C=axes(g,120,200,1000,500,{x:[-5,30],y:[0,1],xt:[-5,0,5,10,15,20,25,30],xl:U('Simptom boshlanishidan, kun','Days from symptom onset'),yl:U('Nisbiy daraja','Relative level')});
    const vl=d=>d<-3?0:Math.exp(-((d-1)**2)/(2*(d<1?2.2:4.5)**2));const igm=d=>d<5?0:.7*Math.exp(-((d-14)**2)/50);const igg=d=>d<7?0:.9*Math.min(1,(d-7)/14);
    [[vl,'#E53935',U('Virus yuki (RNK)','Viral load (RNA)')],[igm,'#BA68C8',U('IgM','IgM')],[igg,'#4FC3F7',U('IgG','IgG')]].forEach(([f,c,l],i)=>{el('path',{d:pth(d=>[C.px(d),C.py(f(d))],-5,30,140),stroke:c,'stroke-width':4,fill:'none'},g);const y=210+i*30;el('line',{x1:1180,x2:1220,y1:y,y2:y,stroke:c,'stroke-width':5},g);txt(g,T(l),1230,y+6,{size:18,color:c,weight:800,anchor:'start'})});
    el('rect',{x:C.px(-2),y:640,width:C.px(8)-C.px(-2),height:14,fill:'#FFD54F',opacity:.8},g);txt(g,T(U('yuqumli davr (~2 kun oldin → ~8 kun)','infectious (~2 days before → ~8 days)')),C.px(3),632,{size:15,color:'#FFD54F',weight:700});
    el('rect',{x:C.px(-1),y:664,width:C.px(20)-C.px(-1),height:14,fill:'#E57373',opacity:.6},g);txt(g,T(U('PZR musbat (uzoq qolishi mumkin)','PCR positive (may persist)')),C.px(20.5),676,{anchor:'start',size:15,color:'#EF9A9A',weight:700});
    el('rect',{x:C.px(7),y:220,width:C.px(14)-C.px(7),height:400,fill:'#FF5252',opacity:.08},g);txt(g,T(U('og‘ir holatda: 7–14-kun yallig‘lanish, ARDS','severe: day 7–14 inflammation, ARDS')),C.px(10.5),240,{size:15,color:'#FF8A80',weight:700});
    const cur=el('line',{y1:200,y2:700,stroke:TH.ink,'stroke-width':2},g);
    lines(g,1180,340,[U('Inkubatsiya ~5 kun (Omikron ~3 kun)','Incubation ~5 days (Omicron ~3)'),U('Yuqishning ~40–50% i simptomsiz davrda','~40–50% of transmission presymptomatic'),U('Tezkor antigen test — virus yuki yuqori paytda','Rapid antigen test — sensitive at high load'),U('Antiviral: ilk 5 kunda (nirmatrelvir)','Antivirals: within first 5 days (nirmatrelvir)'),U('Og‘ir faza: deksametazon (yallig‘lanish)','Severe phase: dexamethasone (inflammation)')],{size:17,dy:30});
    const st=steps(g,120,150,[[0,U('Virus yuki simptomdan oldin ko‘tariladi','Viral load rises before symptoms')],[4,U('Cho‘qqi ~0–2-kun → yuqumlilik eng yuqori','Peak ~day 0–2 → most infectious')],[7,U('IgM, keyin IgG; virus kamayadi','IgM, then IgG; virus declines')]],{size:22});
    R0={anchors:A,core:[],update(lt){const t=((lt%TT)+TT)%TT;const d=-5+35*t/TT;at(cur,{x1:f2(C.px(d)),x2:f2(C.px(d))});st(t)}};
    note(g,U('Sxema; egri chiziqlar o‘rtacha bemor uchun, katta individual farq bor','Schematic; curves for an average patient, large individual variation'),850,880,{size:18});
  }
  if(k==='entry')note(g,U('Sxema; virus va organellalar turli masshtabda','Schematic; virus and organelles at different scales'),850,880,{size:18});
  R0.update(0);return R0});
/* ---------- Candida albicans: morphotypes, invasion, biofilm, antifungal targets ---------- */
KIT.names(NAMES.uz,{yeast:'Achitqi hujayra (Ø 4–6 µm, kurtaklanadi)',pseudo:'Psevdogifa (bo‘g‘imlari siqilgan)',hypha:'Haqiqiy gifa (parallel devor, septalar)',als3:'Als3 adgezini (epiteliyga yopishish, invaziya)',clys:'Kandidalizin (gifa toksini → membrana teshiladi)',biofilm:'Biofilm (kateterda; dorilarga chidamli)',erg:'Ergosterol (zamburug‘ membranasi)',glucan:'β-1,3-glukan (hujayra devori)'});
KIT.names(NAMES.en,{yeast:'Yeast cell (Ø 4–6 µm, budding)',pseudo:'Pseudohypha (constricted joints)',hypha:'True hypha (parallel walls, septa)',als3:'Als3 adhesin (adhesion, invasion)',clys:'Candidalysin (hyphal toxin → membrane pores)',biofilm:'Biofilm (on catheters; drug-tolerant)',erg:'Ergosterol (fungal membrane)',glucan:'β-1,3-glucan (cell wall)'});
SM.items.candida=preset(1700,900,(g,it)=>{const A={},TT=it.cycle||12;if(it.kind&&it.kind!=='morphology')SERR.push(`candida: kind "${it.kind}" → morphology`);
  // --- morphotype strip (10 µm ≈ 56 px)
  const MY=290;el('rect',{x:80,y:215,width:980,height:150,rx:14,fill:'#0D1B2A',stroke:TH.faint,'stroke-width':2},g);
  const yG=el('g',{},g);el('ellipse',{cx:190,cy:MY,rx:15,ry:12,fill:'#FFF59D',stroke:'#F9A825','stroke-width':3},yG);const bud=el('ellipse',{cx:210,cy:MY-10,rx:7,ry:6,fill:'#FFF59D',stroke:'#F9A825','stroke-width':3},yG);
  const pG=el('g',{},g);for(let i=0;i<5;i++)el('ellipse',{cx:360+i*42,cy:MY,rx:22,ry:10,fill:'#FFE082',stroke:'#F9A825','stroke-width':3},pG);
  const hG=el('g',{},g);el('rect',{x:640,y:MY-8,width:360,height:16,rx:8,fill:'#FFD54F',stroke:'#F9A825','stroke-width':3},hG);for(let i=1;i<6;i++)el('line',{x1:640+i*60,x2:640+i*60,y1:MY-8,y2:MY+8,stroke:'#E65100','stroke-width':2},hG);el('ellipse',{cx:628,cy:MY,rx:15,ry:12,fill:'#FFF59D',stroke:'#F9A825','stroke-width':3},hG);
  [[190,U('achitqi','yeast')],[444,U('psevdogifa','pseudohypha')],[820,U('gifa','hypha')]].forEach(([x,l])=>txt(g,T(l),x,MY+50,{size:16,color:'dim',weight:700}));
  sbar(g,100,350,56,'10 µm');txt(g,'→',300,MY+6,{size:26,color:'dim',weight:800});txt(g,'→',575,MY+6,{size:26,color:'dim',weight:800});
  // --- epithelium & invasion (tissue scale)
  const EX=80,EW=980,EY=560;el('rect',{x:EX,y:EY-150,width:EW,height:150,fill:'#B3E5FC',opacity:.12},g);txt(g,T(U('Shilliq qavat yuzasi (og‘iz, qin)','Mucosal surface (mouth, vagina)')),EX+10,EY-125,{size:15,color:'dim',weight:700,anchor:'start'});
  const cells=[];for(let i=0;i<10;i++){const x=EX+i*EW/10;const r=el('rect',{x:x+3,y:EY,width:EW/10-6,height:200,rx:8,fill:'#F8BBD0',stroke:'#EC407A','stroke-width':2},g);el('circle',{cx:x+EW/20,cy:EY+140,r:13,fill:'#AD1457',opacity:.6},g);cells.push(r)}
  const SX=430;const ye=el('ellipse',{cx:SX,cy:EY-14,rx:15,ry:12,fill:'#FFF59D',stroke:'#F9A825','stroke-width':3},g);
  const hyp=el('path',{d:'',stroke:'#FFD54F','stroke-width':14,'stroke-linecap':'round',fill:'none'},g);const hypE=el('path',{d:'',stroke:'#F9A825','stroke-width':2,fill:'none','stroke-dasharray':'2 28'},g);
  const als=[...Array(6)].map(()=>el('line',{stroke:'#4DB6AC','stroke-width':4,'stroke-linecap':'round'},g));const tox=[...Array(10)].map(()=>el('circle',{r:4,fill:'#E53935'},g));
  const hp=q=>{const L=240*q;const P=[];for(let i=0;i<=20;i++){const s=L*i/20;P.push([SX+18*Math.sin(s/40),EY-2+s])}return P};
  // biofilm on catheter
  const BX=860,BY=EY-60;el('rect',{x:BX-110,y:BY+20,width:240,height:26,rx:13,fill:'#B0BEC5',opacity:.8},g);txt(g,T(U('kateter','catheter')),BX+10,BY+40,{size:14,color:'#263238',weight:800});
  const bfm=el('path',{d:`M${BX-100},${BY+20} q 20 -70 60 -60 q 30 -40 70 -10 q 40 -30 70 20 q 20 20 20 50 Z`,fill:'#A5D6A7',opacity:.35,stroke:'#66BB6A','stroke-width':2},g);
  const bfc=[];for(let i=0;i<14;i++){const a=i*2.3;bfc.push(el('ellipse',{cx:BX-70+(i*37)%190,cy:BY+5-(i*23)%55,rx:8,ry:6,fill:'#FFF59D',stroke:'#F9A825','stroke-width':2},g))}
  for(let i=0;i<4;i++)el('path',{d:`M${BX-60+i*45},${BY+15} q 10 -35 -5 -60`,stroke:'#FFD54F','stroke-width':6,fill:'none','stroke-linecap':'round'},g);
  // --- antifungal targets
  const RX=1150,RW=480;txt(g,T(U('Dori nishonlari (devor → membrana)','Drug targets (wall → membrane)')),RX,215,{size:19,color:'ink',weight:800,anchor:'start'});
  const LY=[[U('mannoproteinlar','mannoproteins'),'#CE93D8',236],[U('β-1,3-glukan','β-1,3-glucan'),'#FFB74D',270],[U('xitin','chitin'),'#A1887F',304]];
  LY.forEach(([l,c,y])=>{el('rect',{x:RX,y,width:RW,height:30,fill:c,opacity:.7},g);txt(g,T(l),RX+RW-10,y+21,{size:14,color:'#0D1B2A',weight:800,anchor:'end'})});
  el('rect',{x:RX,y:340,width:RW,height:36,fill:'#4FC3F7',opacity:.4},g);for(let i=0;i<24;i++)el('circle',{cx:RX+10+i*20,cy:346,r:5,fill:'#4FC3F7'},g),el('circle',{cx:RX+10+i*20,cy:370,r:5,fill:'#4FC3F7'},g);
  const ergs=[...Array(8)].map((_,i)=>el('rect',{x:RX+25+i*58,y:349,width:8,height:18,fill:'#FFEB3B'},g));txt(g,T(U('membrana','membrane')),RX+RW-10,396,{size:14,color:'dim',weight:800,anchor:'end'});
  const D=[[U('Exinokandinlar (kaspofungin) → glukan sintazasi','Echinocandins (caspofungin) → glucan synthase'),'#FFB74D'],[U('Azollar (flukonazol) → Erg11: ergosterol sintezi ↓','Azoles (fluconazole) → Erg11: ergosterol synthesis ↓'),'#FFEB3B'],[U('Amfoteritsin B ergosterolga bog‘lanib teshik ochadi','Amphotericin B binds ergosterol, forms pores'),'#EF5350']];
  D.forEach(([l,c],i)=>{const y=440+i*34;el('rect',{x:RX,y:y-14,width:14,height:14,fill:c},g);txt(g,T(l),RX+24,y,{size:16,color:'ink',weight:700,anchor:'start'})});
  lines(g,RX,580,[U('Kommensal: sog‘lom kattalarning ~30–60% ida og‘izda','Commensal: oral carriage in ~30–60% of healthy adults'),U('Xavf: antibiotiklar, diabet, OIV (CD4 <200), kateter','Risk: antibiotics, diabetes, HIV (CD4 <200), catheters'),U('Kandidemiyada o‘lim ~25–40%','Candidaemia mortality ~25–40%'),U('C. auris: ko‘p dorilarga chidamli (JSST 2022: kritik guruh)','C. auris: multidrug-resistant (WHO 2022: critical group)')],{size:16,dy:30});
  const st=steps(g,80,150,[[0,U('Achitqi shakl: kommensal, kurtaklanib ko‘payadi','Yeast form: commensal, buds')],[3,U('Achitqi → gifa o‘tishi (37 °C, pH, zardob)','Yeast → hypha switch (37 °C, pH, serum)')],[6,U('Gifa Als3 bilan yopishib hujayraga kiradi','Hypha adheres via Als3 and invades')],[8.5,U('Kandidalizin hujayrani shikastlaydi → yallig‘lanish','Candidalysin damages cells → inflammation')]],{size:22});
  note(g,U('Sxema; yuqori qator 10 µm masshtabda, pastki to‘qima soddalashtirilgan','Schematic; top row to 10 µm scale, tissue below simplified'),600,880,{size:18});
  Object.assign(A,{yeast:{el:yG,fx:.5,fy:0},pseudo:{el:pG,fx:.5,fy:0},hypha:{el:hG,fx:.7,fy:0},als3:()=>{const P=hp(Math.min(1,Math.max(0,(lt0-3)/4)));return P[6]},clys:()=>{const P=hp(Math.min(1,Math.max(0,(lt0-3)/4)));const e=P[P.length-1];return [e[0]+30,e[1]]},biofilm:[BX+20,BY-50],erg:{el:ergs[3],fx:.5,fy:1},glucan:[RX+60,285]});
  let lt0=0;
  const R0={anchors:A,core:['yeast','pseudo','hypha','als3','clys','biofilm','erg','glucan'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;lt0=t;
    at(bud,{rx:f2(3+4*((lt*.5)%1)),ry:f2(3+3*((lt*.5)%1))});
    [yG,pG,hG].forEach((G,i)=>at(G,{opacity:(i===0&&t<3)||(i===1&&t>=3&&t<5)||(i===2&&t>=5)?1:.45}));
    const q=Math.min(1,Math.max(0,(t-3)/4));const P=hp(q);const d=P.map((p,i)=>(i?'L':'M')+f2(p[0])+','+f2(p[1])).join('');at(hyp,{d:q>0?d:''});at(hypE,{d:q>0?d:''});
    als.forEach((a,i)=>{const p=P[Math.min(P.length-1,3+i*3)];const on=q>0.15*(i+1)&&t>=6;at(a,{x1:f2(p[0]-8),y1:f2(p[1]),x2:f2(p[0]-18),y2:f2(p[1]-6),opacity:on?1:0})});
    const tip=P[P.length-1];tox.forEach((c,i)=>{const u=(lt*.7+i/10)%1;const a=i*0.63;at(c,{cx:f2(tip[0]+Math.cos(a)*u*60),cy:f2(tip[1]+Math.sin(a)*u*40),opacity:t>=8.5?f2(1-u):0})});
    cells.forEach((c,i)=>at(c,{fill:t>=8.5&&(i===3||i===4)?'#EF9A9A':'#F8BBD0'}));
    st(t)}};
  R0.update(0);return R0});
/* ---------- Helminths: Ascaris lumbricoides life cycle · Taenia solium (taeniasis / cysticercosis) ---------- */
KIT.names(NAMES.uz,{egg:'Tuxum tuproqda yetiladi (2–4 hafta)',ingest:'Yutiladi (iflos qo‘l, sabzavot)',liver:'Lichinka → darvoza venasi → jigar',lung:'O‘pka: Löffler sindromi (yo‘tal, eozinofiliya)',swallow:'Traxeya orqali ko‘tarilib, qayta yutiladi',adult:'Ingichka ichakda voyaga yetadi (≤35 cm)',feces:'~200 000 tuxum/kun najas bilan',
  pork:'Chala pishgan cho‘chqa go‘shti (sistitserklar)',scolex:'Skoleks: 4 so‘rg‘ich + ilmoqlar toji',tworm:'Voyaga yetgan gijja ichakda (2–7 m) — tenioz',prog:'Yetilgan proglottidlar/tuxumlar najas bilan',pig:'Cho‘chqa tuxumni yeydi → mushakda sistitserk',fecor:'Odam tuxumni yutadi (najas–og‘iz yo‘li)',ncc:'Neyrosistitserkoz → epilepsiya'});
KIT.names(NAMES.en,{egg:'Egg embryonates in soil (2–4 weeks)',ingest:'Ingested (dirty hands, vegetables)',liver:'Larva → portal vein → liver',lung:'Lungs: Löffler syndrome (cough, eosinophilia)',swallow:'Ascends trachea, swallowed again',adult:'Matures in small intestine (≤35 cm)',feces:'~200,000 eggs/day in faeces',
  pork:'Undercooked pork (cysticerci)',scolex:'Scolex: 4 suckers + crown of hooks',tworm:'Adult worm in gut (2–7 m) — taeniasis',prog:'Gravid proglottids/eggs in faeces',pig:'Pig eats eggs → cysticerci in muscle',fecor:'Human swallows eggs (faecal–oral)',ncc:'Neurocysticercosis → epilepsy'});
const hBody=(g,cx,top)=>{const G=el('g',{},g);const c='#FFE0B2';el('circle',{cx,cy:top+55,r:50,fill:c,opacity:.25,stroke:'#FFCC80','stroke-width':3},G);
  el('path',{d:`M${cx-40},${top+110} L${cx+40},${top+110} Q${cx+150},${top+130} ${cx+140},${top+300} L${cx+120},${top+600} L${cx-120},${top+600} L${cx-140},${top+300} Q${cx-150},${top+130} ${cx-40},${top+110} Z`,fill:c,opacity:.18,stroke:'#FFCC80','stroke-width':3},G);return G};
SM.items.helminth=preset(1700,900,(g,it)=>{const k=it.kind||'ascaris',A={},TT=it.cycle||14;if(!['ascaris','tapeworm'].includes(k))SERR.push(`helminth: kind "${k}" → ascaris, tapeworm`);let R0;
  const RX=1180;
  if(k==='ascaris'){
    const CX=620,TOP=170;hBody(g,CX,TOP);
    const lungL=el('ellipse',{cx:CX-55,cy:TOP+250,rx:45,ry:75,fill:'#F48FB1',opacity:.45},g),lungR=el('ellipse',{cx:CX+55,cy:TOP+250,rx:45,ry:75,fill:'#F48FB1',opacity:.45},g);
    el('path',{d:`M${CX},${TOP+95} L${CX},${TOP+180}`,stroke:'#90A4AE','stroke-width':10},g);
    const liv=el('path',{d:`M${CX-110},${TOP+350} q 60 -40 140 -10 q -20 50 -140 45 Z`,fill:'#8D6E63',opacity:.75},g);
    const gut=el('path',{d:`M${CX-80},${TOP+430} q 40 -20 80 0 t 80 0 M${CX-80},${TOP+470} q 40 -20 80 0 t 80 0 M${CX-80},${TOP+510} q 40 -20 80 0 t 80 0`,stroke:'#FFAB91','stroke-width':16,fill:'none',opacity:.7,'stroke-linecap':'round'},g);
    const worm=el('path',{d:`M${CX-70},${TOP+470} q 35 -18 70 0 t 70 0`,stroke:'#FFF3E0','stroke-width':6,fill:'none','stroke-linecap':'round',opacity:0},g);
    el('rect',{x:80,y:TOP+560,width:330,height:80,rx:10,fill:'#6D4C41',opacity:.5},g);txt(g,T(U('Tuproq','Soil')),400,TOP+590,{size:16,color:'#FFE0B2',weight:800,anchor:'end'});
    const P=[[200,TOP+620],[CX-30,TOP+60],[CX,TOP+430],[CX-40,TOP+360],[CX-55,TOP+250],[CX,TOP+140],[CX+10,TOP+70],[CX+30,TOP+470],[CX+60,TOP+600],[300,TOP+620]];
    el('path',{d:P.map((p,i)=>(i?'L':'M')+p[0]+','+p[1]).join(''),stroke:'#FFD54F','stroke-width':2.5,fill:'none','stroke-dasharray':'7 7',opacity:.7},g);
    const tok=el('g',{},g);const egg=el('ellipse',{rx:12,ry:9,fill:'#D7CCC8',stroke:'#5D4037','stroke-width':3},tok);const lar=el('path',{d:'M-14,0 q7,-8 14,0 t14,0',stroke:'#FFF3E0','stroke-width':4,fill:'none',opacity:0},tok);
    const eggs=[...Array(12)].map(()=>el('ellipse',{rx:6,ry:4.5,fill:'#D7CCC8',stroke:'#5D4037','stroke-width':1.5},g));
    // scale comparison panel
    txt(g,T(U('O‘lchamlar (masshtab ikki xil)','Sizes (two scales)')),RX,200,{size:19,color:'ink',weight:800,anchor:'start'});
    el('path',{d:`M${RX},250 q 100 -24 200 0 t 200 0`,stroke:'#FFF3E0','stroke-width':9,fill:'none','stroke-linecap':'round'},g);sbar(g,RX,290,400,U('urg‘ochi gijja: 20–35 cm (bu chiziq ≈ 35 cm)','female worm: 20–35 cm (bar ≈ 35 cm)'),true);
    el('ellipse',{cx:RX+40,cy:370,rx:30,ry:22,fill:'#D7CCC8',stroke:'#5D4037','stroke-width':4},g);txt(g,T(U('tuxum 45–75 µm (kattalashtirilgan)','egg 45–75 µm (enlarged)')),RX+85,376,{size:16,color:'ink',weight:700,anchor:'start'});
    lines(g,RX,450,[U('Dunyoda ~800 mln yuqtirgan (asosan bolalar)','~800 million infected worldwide (mostly children)'),U('Asorat: ichak tutilishi, o‘t yo‘li tiqilishi','Complications: bowel obstruction, biliary blockage'),U('Davolash: albendazol 400 mg bir marta','Treatment: albendazole 400 mg single dose'),U('Oldini olish: qo‘l yuvish, sanitariya, sabzavotni yuvish','Prevention: handwashing, sanitation, washing produce'),U('Odamdan odamga bevosita yuqmaydi: tuxum tuproqda yetilishi kerak','Not directly contagious: eggs must mature in soil')],{size:16,dy:30});
    const sch=[[0,U('Tuxum tuproqda yetiladi','Egg matures in soil')],[2,U('Yetilgan tuxum yutiladi','Embryonated egg swallowed')],[3.5,U('Ichakda lichinka chiqadi, devorni teshib qonga o‘tadi','Larva hatches, penetrates gut wall into blood')],[5,U('Jigar → yurak → o‘pka (~10–14-kun)','Liver → heart → lungs (~day 10–14)')],[7,U('Alveolalardan traxeyaga ko‘tarilib yutiladi','Climbs to trachea and is swallowed')],[9,U('Ichakda voyaga yetadi (2–3 oy)','Matures in the intestine (2–3 months)')],[11,U('Urg‘ochi kuniga ~200 000 tuxum qo‘yadi','Female lays ~200,000 eggs per day')]];
    const st=steps(g,80,150,sch,{size:22});
    const KQ=[0,.1,.2,.3,.45,.6,.7,.8,.9,1];const TQ=[0,2,3.5,4.2,5,7,8,9,11,14];
    const pos=t=>{let i=0;while(i<TQ.length-2&&t>TQ[i+1])i++;const u=Math.min(1,Math.max(0,(t-TQ[i])/(TQ[i+1]-TQ[i])));return [lerp(P[i][0],P[i+1][0],u),lerp(P[i][1],P[i+1][1],u)]};
    note(g,U('Sxema; odam tanasi va ko‘chish yo‘li soddalashtirilgan','Schematic; body and migration route simplified'),850,880,{size:18});
    Object.assign(A,{egg:[150,TOP+625],ingest:[CX-30,TOP+60],liver:{el:liv,fx:.2,fy:.5},lung:{el:lungL,fx:0,fy:.4},swallow:[CX,TOP+140],adult:{el:gut,fx:1,fy:.5},feces:[300,TOP+620]});
    R0={anchors:A,core:['egg','ingest','liver','lung','swallow','adult','feces'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;const p=pos(Math.min(t,9));
      at(tok,{transform:`translate(${f2(p[0])},${f2(p[1])})`,opacity:t<9?1:0});const isL=t>=3.5;at(egg,{opacity:isL?0:1});at(lar,{opacity:isL?1:0});
      at(lungL,{opacity:t>=5&&t<7?.85:.45});at(lungR,{opacity:t>=5&&t<7?.85:.45});at(liv,{opacity:t>=3.5&&t<5?1:.7});at(worm,{opacity:t>=9?1:0});
      eggs.forEach((e,i)=>{const u=((lt*.25+i/12)%1);const a=[CX+30,TOP+480],b=[110+i*24,TOP+615];at(e,{cx:f2(lerp(a[0],b[0],u)),cy:f2(lerp(a[1],b[1],u)),opacity:t>=11?f2(Math.min(1,u*4)):0})});st(t)}};
  }else{
    const nodes={pork:[260,330],hum:[640,330],gut:[640,560],eggs:[640,780],pig:[260,620],brain:[980,420]};
    const B={};const mk=(k2,l,c,w)=>{B[k2]=box(g,nodes[k2][0],nodes[k2][1],w||260,64,T(l),c,{size:18})};
    mk('pork',U('Go‘shtdagi sistitserk','Cysticercus in meat'),'#FF8A65');mk('hum',U('Odam (asosiy xo‘jayin)','Human (definitive host)'),'#4FC3F7');mk('gut',U('Ichakda tasma gijja','Tapeworm in gut'),'#FFD54F');
    mk('eggs',U('Tuxumlar muhitga','Eggs into environment'),'#BCAAA4');mk('pig',U('Cho‘chqa (oraliq xo‘jayin)','Pig (intermediate host)'),'#F48FB1');mk('brain',U('Odamda sistitserkoz','Human cysticercosis'),'#EF5350',280);
    const E=[['pork','hum'],['hum','gut'],['gut','eggs'],['eggs','pig'],['pig','pork']];
    const ed=(a,b)=>{const A1=nodes[a],B1=nodes[b];const dx=B1[0]-A1[0],dy=B1[1]-A1[1],L=Math.hypot(dx,dy);const o=dx?140:38;const ux=dx/L,uy=dy/L;return [[A1[0]+ux*(dx?140:0),A1[1]+uy*(dx?0:34)],[B1[0]-ux*(dx?140:0),B1[1]-uy*(dx?0:34)]]};
    E.forEach(([a,b])=>{const [p,q]=ed(a,b);arw(g,p,q,'#FFD54F',4)});
    const by=[[770,780],[980,780],[980,455]];el('path',{d:`M${by[0][0]},${by[0][1]} L${by[1][0]},${by[1][1]} L${by[2][0]},${by[2][1]}`,stroke:'#EF5350','stroke-width':4,fill:'none','stroke-dasharray':'10 7','marker-end':arrowMarker('#EF5350')},g);
    // brain with cysts
    const br=el('ellipse',{cx:980,cy:560,rx:110,ry:75,fill:'#F8BBD0',opacity:.35,stroke:'#EC407A','stroke-width':3},g);const cy=[[-50,-20],[20,-35],[45,20],[-15,30]].map(([dx,dy])=>{const G=el('g',{},g);el('circle',{cx:980+dx,cy:560+dy,r:13,fill:'#FFFDE7',stroke:'#8D6E63','stroke-width':2},G);el('circle',{cx:980+dx+3,cy:560+dy,r:3.5,fill:'#5D4037'},G);return G});
    // scolex & strobila
    txt(g,T(U('Skoleks va strobila (kattalashtirilgan)','Scolex and strobila (enlarged)')),RX,200,{size:19,color:'ink',weight:800,anchor:'start'});
    const SCX=RX+60,SCY=290;el('circle',{cx:SCX,cy:SCY,r:42,fill:'#FFF8E1',stroke:'#FFB300','stroke-width':3},g);[[-22,-12],[22,-12],[-22,16],[22,16]].forEach(([dx,dy])=>el('circle',{cx:SCX+dx,cy:SCY+dy,r:11,fill:'none',stroke:'#8D6E63','stroke-width':3},g));
    const hook=el('g',{},g);for(let i=0;i<14;i++){const a=-Math.PI/2+(i-6.5)*.18;el('path',{d:`M${f2(SCX+Math.cos(a)*42)},${f2(SCY+Math.sin(a)*42)} l ${f2(Math.cos(a)*12)} ${f2(Math.sin(a)*12)}`,stroke:'#5D4037','stroke-width':3},hook)}
    for(let i=0;i<9;i++){const w=20+i*5,h=10+i*3;el('rect',{x:SCX+50+i*(w*0.0)+i*38,y:SCY-h/2,width:34,height:h,rx:3,fill:'#FFF8E1',stroke:'#FFB300','stroke-width':2},g)}
    txt(g,T(U('… 1000 tagacha proglottid, 2–7 m','… up to 1000 proglottids, 2–7 m')),RX,370,{size:16,color:'dim',weight:700,anchor:'start'});
    lines(g,RX,440,[U('Neyrosistitserkoz: endemik hududlarda','Neurocysticercosis: in endemic areas'),U('  epilepsiya holatlarining ~30% i (JSST)','  ~30% of epilepsy cases (WHO)'),U('Tenioz: prazikvantel yoki niklozamid','Taeniasis: praziquantel or niclosamide'),U('NSK: albendazol + kortikosteroid (individual)','NCC: albendazole + corticosteroid (case-by-case)'),U('Oldini olish: go‘shtni to‘liq pishirish (≥63 °C),','Prevention: cook pork thoroughly (≥63 °C),'),U('  qo‘l gigiyenasi, go‘sht nazorati','  hand hygiene, meat inspection')],{size:16,dy:30});
    const tok=el('circle',{r:12,fill:'#FFF59D',stroke:'#F57F17','stroke-width':3},g);
    const R=[nodes.pork,nodes.hum,nodes.gut,nodes.eggs,nodes.pig,nodes.pork];const TQ=[0,2,4,6.5,8.5,10];const R2=[nodes.eggs,[980,780],[980,560]];
    const st=steps(g,80,150,[[0,U('Odam sistitserkli go‘shtni yeydi','Human eats cysticercus-laden pork')],[2,U('Skoleks ichak devoriga yopishadi','Scolex attaches to intestinal wall')],[4,U('Gijja o‘sadi; proglottidlar tuxum bilan chiqadi','Worm grows; egg-filled proglottids shed')],[6.5,U('Cho‘chqa tuxumni yeydi → mushakda sistitserk','Pig eats eggs → cysticerci in muscle')],[10,U('Xavfli yo‘l: odam tuxumni yutsa → miyada kista','Danger: human swallows eggs → brain cysts')]],{size:22});
    note(g,U('Sxema; xo‘jayinlar va organlar masshtabsiz','Schematic; hosts and organs not to scale'),600,880,{size:18});
    Object.assign(A,{pork:{el:B.pork.r,fx:.5,fy:0},scolex:[SCX,SCY-42],tworm:{el:B.gut.r,fx:0,fy:.5},prog:{el:B.eggs.r,fx:0,fy:.5},pig:{el:B.pig.r,fx:.5,fy:1},fecor:[980,700],ncc:{el:br,fx:1,fy:.5}});
    R0={anchors:A,core:['pork','scolex','tworm','prog','pig','fecor','ncc'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;let p;
      if(t<10){let i=0;while(i<TQ.length-2&&t>TQ[i+1])i++;const u=Math.min(1,Math.max(0,(t-TQ[i])/(TQ[i+1]-TQ[i])));p=[lerp(R[i][0],R[i+1][0],u),lerp(R[i][1],R[i+1][1],u)]}
      else{const q=Math.min(1,(t-10)/3);const s=q*2;const i=Math.min(1,Math.floor(s)),u=s-i;p=[lerp(R2[i][0],R2[i+1][0],u),lerp(R2[i][1],R2[i+1][1],u)]}
      at(tok,{cx:f2(p[0]),cy:f2(p[1])});const ph=t<2?'pork':t<4?'hum':t<6.5?'gut':t<8.5?'eggs':t<10?'pig':'brain';Object.keys(B).forEach(k2=>lit(B[k2],k2===ph));
      cy.forEach((c,i)=>at(c,{opacity:t>=12?1:.25}));st(t)}};
  }
  R0.update(0);return R0});
/* ---------- Gut microbiota: density along GI tract, mucus & SCFA · antibiotic disruption, C. difficile, FMT ---------- */
KIT.names(NAMES.uz,{stom:'Me’da: 10¹–10³/ml (kislota)',jej:'Och ichak: 10⁴–10⁷/ml',ileum:'Yonbosh ichak: 10⁷–10⁸/ml',colon:'Yo‘g‘on ichak: 10¹¹–10¹²/g',inner:'Ichki zich shilliq (deyarli steril)',outer:'Tashqi bo‘sh shilliq (bakteriyalar)',scfa:'QZYK: butirat, propionat, atsetat',colono:'Kolonotsit (energiyasining ko‘p qismi butiratdan)',
  abx:'Antibiotik kursi (7 kun)',div:'Xilma-xillik keskin kamayadi',cdiff:'C. difficile ko‘payadi (toksin A/B)',fmt:'FMT: donor mikrobiotasi ko‘chiriladi',rec:'O‘z-o‘zidan tiklanish sekin va to‘liq emas',cr:'Kolonizatsiyaga qarshilik'});
KIT.names(NAMES.en,{stom:'Stomach: 10¹–10³/ml (acid)',jej:'Jejunum: 10⁴–10⁷/ml',ileum:'Ileum: 10⁷–10⁸/ml',colon:'Colon: 10¹¹–10¹²/g',inner:'Inner dense mucus (nearly sterile)',outer:'Outer loose mucus (bacteria)',scfa:'SCFA: butyrate, propionate, acetate',colono:'Colonocyte (much of its energy from butyrate)',
  abx:'Antibiotic course (7 days)',div:'Diversity drops sharply',cdiff:'C. difficile expands (toxins A/B)',fmt:'FMT: donor microbiota transferred',rec:'Spontaneous recovery slow and incomplete',cr:'Colonisation resistance'});
SM.items.microbiota=preset(1700,900,(g,it)=>{const k=it.kind||'gut',A={},TT=it.cycle||12;if(!['gut','antibiotic'].includes(k))SERR.push(`microbiota: kind "${k}" → gut, antibiotic`);let R0;
  const RX=1180;const rnd=(i,s)=>{const x=Math.sin(i*12.9898+s*78.233)*43758.5453;return x-Math.floor(x)};
  if(k==='gut'){
    const C=axes(g,110,230,500,460,{x:[0,4],y:[1,1e13],ylog:true,yt:[],xl:U('Oshqozon-ichak bo‘limi','GI segment'),yl:U('Bakteriyalar soni / ml yoki g (log)','Bacteria per ml or g (log)')});
    [1,1e3,1e6,1e9,1e12].forEach(v=>txt(g,'10'+({1:'⁰',1e3:'³',1e6:'⁶',1e9:'⁹',1e12:'¹²'})[v],100,C.py(v)+6,{size:16,color:'dim',weight:600,anchor:'end'}));
    const SEG=[[U('me’da','stomach'),1e1,1e3,'#FFB74D'],[U('och ich.','jejunum'),1e4,1e7,'#FFD54F'],[U('yonbosh','ileum'),1e7,1e8,'#AED581'],[U('yo‘g‘on','colon'),1e11,1e12,'#4DB6AC']];
    const bars=SEG.map(([l,a,b,c],i)=>{const x=C.px(i+.5);txt(g,T(l),x,C.py(1)+24,{size:16,color:'ink',weight:700});const r=el('rect',{x:x-40,width:80,y:C.py(1),height:0,rx:6,fill:c,opacity:.85},g);return {r,a,b,x}});
    // colon cross-section
    const X0=680,X1=1120,YE=640;el('rect',{x:X0,y:220,width:X1-X0,height:200,fill:'#4DB6AC',opacity:.08},g);txt(g,T(U('Ichak bo‘shlig‘i: kletchatka bijg‘iydi','Lumen: fibre fermented')),X0+10,245,{size:15,color:'dim',weight:700,anchor:'start'});
    const outer=el('rect',{x:X0,y:420,width:X1-X0,height:110,fill:'#B3E5FC',opacity:.18},g);const inner=el('rect',{x:X0,y:530,width:X1-X0,height:110,fill:'#B3E5FC',opacity:.45},g);
    const cells=[];for(let i=0;i<8;i++){const x=X0+i*(X1-X0)/8;cells.push(el('rect',{x:x+3,y:YE,width:(X1-X0)/8-6,height:150,rx:8,fill:'#F8BBD0',stroke:'#EC407A','stroke-width':2},g));el('circle',{cx:x+(X1-X0)/16,cy:YE+105,r:11,fill:'#AD1457',opacity:.6},g)}
    const bac=[...Array(46)].map((_,i)=>el(i%3?'ellipse':'circle',i%3?{rx:9,ry:4.5,fill:['#7E57C2','#26A69A','#FF7043'][i%3]}:{r:5,fill:'#FFCA28'},g));
    const fib=[...Array(6)].map((_,i)=>el('path',{d:`M${X0+40+i*70},${280+(i%2)*40} q 15 -10 30 0 t 30 0`,stroke:'#AED581','stroke-width':5,fill:'none'},g));
    const sc=[...Array(18)].map(()=>el('circle',{r:4,fill:'#FFEB3B'},g));
    lines(g,RX,220,[U('Odam tanasida ~3,8×10¹³ bakteriya','~3.8×10¹³ bacteria in the human body'),U('  ≈ odam hujayralari soniga teng (~1,3 : 1)','  ≈ number of human cells (~1.3 : 1)'),U('  massasi ~0,2 kg (Sender va b., 2016)','  mass ~0.2 kg (Sender et al., 2016)'),U('Asosiy guruhlar: Bacillota, Bacteroidota','Main phyla: Bacillota, Bacteroidota'),U('Vazifalar: kletchatkani hazm qilish, K vitamini,','Roles: fibre digestion, vitamin K,'),U('  immun tizimni “o‘rgatish” (Treg)','  immune “training” (Treg)'),U('Kolonizatsiyaga qarshilik: joy va ozuqa','Colonisation resistance: niche and nutrients'),U('  uchun raqobat patogenlarni to‘xtatadi','  competition blocks pathogens')],{size:17,dy:31});
    const st=steps(g,110,150,[[0,U('Bakteriyalar zichligi oshqozondan yo‘g‘on ichakka ~10⁹ marta oshadi','Bacterial density rises ~10⁹-fold from stomach to colon')],[4,U('Yo‘g‘on ichakda kletchatka bijg‘iydi → QZYK','In the colon fibre ferments → SCFA')],[7.5,U('Butirat kolonotsitlarni oziqlantiradi, to‘siqni mustahkamlaydi','Butyrate feeds colonocytes, strengthens the barrier')]],{size:22});
    note(g,U('QZYK — qisqa zanjirli yog‘ kislotalari. Log shkala; qiymatlar oraliq (adabiyotlar bo‘yicha)','SCFA — short-chain fatty acids. Log scale; ranges from literature'),850,880,{size:18});
    Object.assign(A,{stom:()=>[bars[0].x,C.py(1e3)],jej:()=>[bars[1].x,C.py(1e7)],ileum:()=>[bars[2].x,C.py(1e8)],colon:()=>[bars[3].x,C.py(1e12)],inner:[X1-30,600],outer:[X1-30,450],scfa:{el:sc[4],fx:.5,fy:.5},colono:{el:cells[6],fx:.5,fy:1}});
    R0={anchors:A,core:['stom','jej','ileum','colon','inner','outer','scfa','colono'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;const q=Math.min(1,t/3);
      bars.forEach(b=>{const yb=C.py(Math.pow(10,Math.log10(b.b)*q)),ya=C.py(Math.pow(10,Math.log10(b.a)*q));at(b.r,{y:f2(yb),height:f2(Math.max(0,C.py(1)-yb))});at(b.r,{opacity:.85})});
      bac.forEach((b,i)=>{const x=X0+15+rnd(i,1)*(X1-X0-30)+Math.sin(lt*.6+i)*8,y=270+rnd(i,2)*240+Math.cos(lt*.5+i)*5;at(b,i%3?{cx:f2(x),cy:f2(y),transform:`rotate(${f2(rnd(i,3)*180)} ${f2(x)} ${f2(y)})`}:{cx:f2(x),cy:f2(y)})});
      fib.forEach((f,i)=>at(f,{opacity:t<4?1:f2(Math.max(.2,1-(t-4)/3))}));
      sc.forEach((c,i)=>{const u=(lt*.35+i/18)%1;const x=X0+20+rnd(i,4)*(X1-X0-40);at(c,{cx:f2(x),cy:f2(lerp(300,YE+20,u)),opacity:t>=4?f2(Math.min(1,(1-u)*3)):0})});
      cells.forEach(c=>at(c,{'stroke-width':t>=7.5?4:2}));st(t)}};
  }else{
    const C=axes(g,110,230,640,420,{x:[-10,90],y:[0,1],xt:[-10,0,7,20,30,60,90],yt:[0,.5,1],xl:U('Kun (antibiotik boshlanishidan)','Day (from antibiotic start)'),yl:U('Nisbiy qiymat','Relative value')});
    el('rect',{x:C.px(0),y:230,width:C.px(7)-C.px(0),height:420,fill:'#EF5350',opacity:.12},g);txt(g,T(U('antibiotik','antibiotic')),C.px(3.5),252,{size:15,color:'#EF9A9A',weight:800});
    const dv=d=>d<0?1:d<7?1-.6*(1-Math.exp(-d/2.5))/(1-Math.exp(-7/2.5)):.4+.42*(1-Math.exp(-(d-7)/25));
    const dvF=d=>d<20?dv(d):.4+.42*(1-Math.exp(-13/25))+(.92-(.4+.42*(1-Math.exp(-13/25))))*(1-Math.exp(-(d-20)/3));
    const cd=d=>d<3?.03:d<20?.03+.62*Math.exp(-Math.pow((d-12)/5,2)):.03+.62*Math.exp(-Math.pow((d-12)/5,2));const cdF=d=>d<20?cd(d):cd(20)*Math.exp(-(d-20)/2)+.02;
    const pD=el('path',{d:pth(d=>[C.px(d),C.py(dv(d))],-10,90,200),stroke:'#90A4AE','stroke-width':4,fill:'none','stroke-dasharray':'8 6'},g);
    const pF=el('path',{d:pth(d=>[C.px(d),C.py(dvF(d))],-10,90,200),stroke:'#66BB6A','stroke-width':5,fill:'none'},g);
    const pC=el('path',{d:pth(d=>[C.px(d),C.py(cdF(d))],-10,90,200),stroke:'#FF7043','stroke-width':4,fill:'none'},g);
    el('line',{x1:C.px(20),x2:C.px(20),y1:230,y2:650,stroke:'#66BB6A','stroke-width':2,'stroke-dasharray':'4 4'},g);txt(g,'FMT',C.px(20)+6,252,{anchor:'start',size:15,color:'#A5D6A7',weight:800});
    [[U('xilma-xillik (FMT bilan)','diversity (with FMT)'),'#66BB6A'],[U('xilma-xillik (FMT siz)','diversity (no FMT)'),'#90A4AE'],[U('C. difficile ulushi','C. difficile share'),'#FF7043']].forEach(([l,c],i)=>{const y=700+i*0;el('line',{x1:110+i*230,x2:140+i*230,y1:750,y2:750,stroke:c,'stroke-width':5},g);txt(g,T(l),148+i*230,756,{size:15,color:c,weight:800,anchor:'start'})});
    const cur=el('line',{y1:230,y2:650,stroke:TH.ink,'stroke-width':2},g);
    // community grid
    const GX=820,GY=240,N=12,M=10,S=26;txt(g,T(U('Jamoa (har nuqta ≈ bir tur guruhi)','Community (each dot ≈ a taxon group)')),GX,225,{size:15,color:'dim',weight:700,anchor:'start'});
    const cols=['#7E57C2','#26A69A','#42A5F5','#FFCA28','#EC407A','#8D6E63','#9CCC65','#5C6BC0'];
    const dots=[];for(let j=0;j<M;j++)for(let i=0;i<N;i++){const id=j*N+i;dots.push({e:el('circle',{cx:GX+12+i*S,cy:GY+12+j*S,r:9,fill:cols[id%8]},g),r:rnd(id,7),cd:rnd(id,9)<.32})}
    const cnt=el('text',{x:GX,y:GY+M*S+30,'font-size':17,'font-weight':800,fill:TH.ink},g);
    lines(g,RX,250,[U('Xavfli antibiotiklar: klindamitsin, ftorxinolonlar,','High-risk antibiotics: clindamycin, fluoroquinolones,'),U('  3-avlod sefalosporinlar','  3rd-gen cephalosporins'),U('C. difficile: sporalar, toksin A/B → kolit','C. difficile: spores, toxins A/B → colitis'),U('Davolash: fidaksomitsin yoki per os vankomitsin','Treatment: fidaxomicin or oral vancomycin'),U('Qaytalanishda FMT: ~85–90% tuzalish','Recurrent CDI: FMT cures ~85–90%'),U('Spirt antiseptigi sporani o‘ldirmaydi →','Alcohol rub does not kill spores →'),U('  qo‘lni sovun bilan yuvish','  wash hands with soap')],{size:17,dy:31});
    const st=steps(g,110,150,[[0,U('Me’yorda: yuzlab turlar, kolonizatsiyaga qarshilik','Baseline: hundreds of species, colonisation resistance')],[2,U('Antibiotik sezgir turlarni yo‘q qiladi','Antibiotic wipes out susceptible species')],[5,U('Bo‘sh joyni C. difficile egallaydi','C. difficile fills the empty niche')],[8,U('FMT: tanlov tiklanadi, C. difficile siqiladi','FMT: diversity restored, C. difficile suppressed')]],{size:22});
    note(g,U('Sxema; egri chiziqlar sifat jihatdan (individual farq katta)','Schematic; qualitative curves (large individual variation)'),850,880,{size:18});
    const dOf=t=>t<2?-10+5*t:t<5?0+(t-2)*7/3:t<8?7+(t-5)*13/3:20+(t-8)*70/4;
    Object.assign(A,{abx:[C.px(3.5),262],div:()=>[C.px(7),C.py(dv(7))],cdiff:()=>[C.px(12),C.py(cd(12))],fmt:()=>[C.px(30),C.py(dvF(30))],rec:()=>[C.px(60),C.py(dv(60))],cr:[GX+N*S/2,GY]});
    R0={anchors:A,core:['abx','div','cdiff','fmt','rec','cr'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;const d=Math.min(90,dOf(t));at(cur,{x1:f2(C.px(d)),x2:f2(C.px(d))});
      const dvv=dvF(d),cv=cdF(d);let n=0;dots.forEach((o,i)=>{const alive=o.r<dvv;let fill=cols[i%8],op=alive?1:.12;if(!alive&&o.cd&&cv>.15){fill='#FF7043';op=Math.min(1,cv*1.5)}if(fill==='#FF7043'||alive)n++;at(o.e,{fill,opacity:f2(op)})});
      cnt.textContent=T(U('Kun ','Day '))+Math.round(d)+' · '+T(U('xilma-xillik ','diversity '))+Math.round(dvv*100)+'%';st(t)}};
  }
  R0.update(0);return R0});
/* ---------- Antimicrobial resistance: mechanisms in a Gram-negative cell · selection of resistant mutants ---------- */
KIT.names(NAMES.uz,{om:'Tashqi membrana (Gram–)',porin:'Porin yo‘qolishi → kirish kamayadi',blac:'β-laktamaza antibiotikni parchalaydi',efflux:'Efflyuks nasosi chiqarib tashlaydi',target:'Nishon o‘zgarishi (PBP2a, rRNK metillanishi)',plasmid:'Plazmida (qarshilik genlari)',conj:'Konyugatsiya: gen boshqa bakteriyaga o‘tadi',ab:'Antibiotik molekulalari',
  mut:'Tasodifiy chidamli mutant (~1/10⁷–10⁸)',kill:'Sezgirlar nobud bo‘ladi',regrow:'Chidamlilar ko‘payib populyatsiyani egallaydi',msw:'Mutant seleksiya oynasi: MIC–MPC'});
KIT.names(NAMES.en,{om:'Outer membrane (Gram–)',porin:'Porin loss → less entry',blac:'β-lactamase destroys the drug',efflux:'Efflux pump expels it',target:'Target change (PBP2a, rRNA methylation)',plasmid:'Plasmid (resistance genes)',conj:'Conjugation: gene passes to another cell',ab:'Antibiotic molecules',
  mut:'Random resistant mutant (~1/10⁷–10⁸)',kill:'Susceptible cells die',regrow:'Resistant cells take over',msw:'Mutant selection window: MIC–MPC'});
SM.items.resistance=preset(1700,900,(g,it)=>{const k=it.kind||'mechanisms',A={},TT=it.cycle||12;if(!['mechanisms','selection'].includes(k))SERR.push(`resistance: kind "${k}" → mechanisms, selection`);let R0;
  const RX=1180;const rnd=(i,s)=>{const x=Math.sin(i*91.17+s*31.7)*43758.5453;return x-Math.floor(x)};
  if(k==='mechanisms'){
    const CX=560,CY=500,RXc=400,RYc=230;
    el('ellipse',{cx:CX,cy:CY,rx:RXc,ry:RYc,fill:'none',stroke:'#80CBC4','stroke-width':10},g);el('ellipse',{cx:CX,cy:CY,rx:RXc-26,ry:RYc-26,fill:'#B2DFDB',opacity:.1},g);
    el('ellipse',{cx:CX,cy:CY,rx:RXc-30,ry:RYc-30,fill:'#263238',opacity:.6,stroke:'#4DB6AC','stroke-width':6},g);txt(g,T(U('periplazma','periplasm')),CX-RXc+70,CY-RYc+70,{size:14,color:'dim',weight:700,anchor:'start'});
    const por=[[-.7,-1],[.3,-1]].map(([fx,fy],i)=>{const x=CX+fx*RXc*.82,y=CY-RYc+4;const G=el('g',{},g);el('rect',{x:x-14,y:y-14,width:28,height:30,rx:5,fill:i?'#546E7A':'#26A69A'},G);el('rect',{x:x-5,y:y-14,width:10,height:30,fill:i?'#546E7A':'#0D1B2A'},G);return {G,x,y,open:!i}});
    [[-9,-9,9,9],[-9,9,9,-9]].forEach(([a,b,c,d])=>el('line',{x1:por[1].x+a,y1:por[1].y-28+b,x2:por[1].x+c,y2:por[1].y-28+d,stroke:'#EF5350','stroke-width':4},g));
    const PX=CX+RXc-40,PY=CY+20;const pump=el('g',{},g);el('rect',{x:PX-18,y:PY-60,width:36,height:120,rx:8,fill:'#FFB74D',stroke:'#E65100','stroke-width':3},pump);el('rect',{x:PX+18,y:PY-14,width:40,height:28,rx:6,fill:'#FFE0B2',stroke:'#E65100','stroke-width':2},pump);
    const bl=[[CX-180,CY-150],[CX+40,CY-140]].map(([x,y])=>{const G=el('g',{},g);el('path',{d:`M${x-16},${y} a16,16 0 1 1 32,0 l -16 6 Z`,fill:'#EC407A'},G);return G});
    const rib=el('g',{},g);el('ellipse',{cx:CX-120,cy:CY+90,rx:34,ry:22,fill:'#9575CD'},rib);el('ellipse',{cx:CX-120,cy:CY+60,rx:24,ry:16,fill:'#B39DDB'},rib);el('circle',{cx:CX-92,cy:CY+52,r:6,fill:'#FFEB3B'},rib);
    const pbp=el('rect',{x:CX+80,y:CY+RYc-46,width:50,height:22,rx:6,fill:'#4FC3F7',stroke:'#0277BD','stroke-width':2},g);txt(g,'PBP2a',CX+105,CY+RYc-58,{size:13,color:'#81D4FA',weight:800});
    const chrom=el('path',{d:`M${CX-60},${CY+20} c 40 -60 120 -40 140 10 s -40 90 -120 60 s -60 -40 -20 -70`,stroke:'#90A4AE','stroke-width':4,fill:'none'},g);
    const pl=el('g',{},g);el('circle',{cx:CX+180,cy:CY+60,r:34,fill:'none',stroke:'#FFD54F','stroke-width':5},pl);el('path',{d:`M${CX+180},${CY+26} a34,34 0 0 1 32,22`,stroke:'#EF5350','stroke-width':7,fill:'none'},pl);
    // recipient + pilus
    const NX=1050,NY=760;el('ellipse',{cx:NX,cy:NY,rx:90,ry:55,fill:'#263238',stroke:'#80CBC4','stroke-width':6},g);const pil=el('path',{d:`M${CX+RXc-60},${CY+RYc-80} Q ${NX-120} ${NY-80} ${NX-80} ${NY-20}`,stroke:'#80CBC4','stroke-width':4,fill:'none'},g);
    const pl2=el('circle',{cx:NX,cy:NY,r:22,fill:'none',stroke:'#FFD54F','stroke-width':4},g);const pmv=el('circle',{r:8,fill:'#FFD54F'},g);
    const ab=[...Array(16)].map(()=>el('polygon',{points:'0,-8 7,-4 7,4 0,8 -7,4 -7,-4',fill:'#E3F2FD',stroke:'#1E88E5','stroke-width':2},g));
    lines(g,RX,220,[U('1  Fermentli parchalash: ESBL, karbapenemazalar','1  Enzymatic destruction: ESBL, carbapenemases'),U('     (KPC, NDM, OXA-48)','     (KPC, NDM, OXA-48)'),U('2  Efflyuks: tetrasiklin, ftorxinolonlar (AcrAB-TolC)','2  Efflux: tetracyclines, fluoroquinolones (AcrAB-TolC)'),U('3  Nishon: MRSA (mecA→PBP2a), VRE (D-Ala-D-Lac)','3  Target: MRSA (mecA→PBP2a), VRE (D-Ala-D-Lac)'),U('4  Kirish ↓: OprD yo‘qolishi (Pseudomonas)','4  Less entry: OprD loss (Pseudomonas)'),U('5  Gorizontal o‘tish: plazmida, transpozon','5  Horizontal transfer: plasmid, transposon')],{size:16,dy:30});
    lines(g,RX,440,[U('Dunyoda 2021 yil (GBD, Lancet 2024):','Worldwide in 2021 (GBD, Lancet 2024):')],{size:17,color:'ink'});
    [[U('bevosita AMR sabab','directly attributable'),1.14,'#EF5350'],[U('AMR bilan bog‘liq','associated with AMR'),4.71,'#FFB74D']].forEach(([l,v,c],i)=>{const y=480+i*62;el('rect',{x:RX,y,width:v/5*420,height:30,rx:6,fill:c,opacity:.85},g);txt(g,String(v).replace('.',',')+T(U(' mln o‘lim',' M deaths')),RX+v/5*420+10,y+22,{size:16,color:'ink',weight:800,anchor:'start'});txt(g,T(l),RX,y+50,{size:14,color:'dim',weight:700,anchor:'start'})});
    lines(g,RX,640,[U('2050 prognozi: 1,91 mln bevosita, 8,22 mln bog‘liq','2050 forecast: 1.91 M attributable, 8.22 M associated')],{size:15});
    const st=steps(g,120,150,[[0,U('Antibiotik porinlar orqali kirishga urinadi','Drug tries to enter through porins')],[3,U('β-laktamaza periplazmada parchalaydi','β-lactamase cleaves it in the periplasm')],[6,U('Kirganlarini nasos tashqariga chiqaradi','Pump expels what got in')],[9,U('Plazmida konyugatsiya orqali qo‘shniga o‘tadi','Plasmid passes to a neighbour by conjugation')]],{size:22});
    note(g,U('Sxema; mexanizmlar bitta hujayrada birlashtirilgan, masshtabsiz','Schematic; mechanisms combined in one cell, not to scale'),600,880,{size:18});
    const abPos=(i,t)=>{const ph=(t*.35+i/16)%1;const p0=por[0];const ent=[p0.x+(i%4-1.5)*14,p0.y-120+((i*37)%60)];const inn=[p0.x+(i%5)*40,p0.y+60+(i%3)*30];
      if(ph<.4)return {x:lerp(ent[0],p0.x,ph/.4),y:lerp(ent[1],p0.y,ph/.4),f:'#E3F2FD',o:1};const u=(ph-.4)/.6;const fate=i%3;
      if(fate===0){const b=[CX-180,CY-150];return {x:lerp(p0.x,b[0],Math.min(1,u*2)),y:lerp(p0.y,b[1],Math.min(1,u*2)),f:u>.5?'#616161':'#E3F2FD',o:u>.5?f2(1.5-u):1}}
      if(fate===1){const a=[PX,PY],b=[PX+90,PY-80];return u<.6?{x:lerp(p0.x,a[0],u/.6),y:lerp(p0.y,a[1],u/.6),f:'#E3F2FD',o:1}:{x:lerp(a[0],b[0],(u-.6)/.4),y:lerp(a[1],b[1],(u-.6)/.4),f:'#E3F2FD',o:1}}
      return {x:lerp(p0.x,inn[0],u),y:lerp(p0.y,inn[1],u),f:'#E3F2FD',o:1}};
    Object.assign(A,{om:[CX-RXc,CY],porin:{el:por[1].G,fx:.5,fy:0},blac:{el:bl[0],fx:.5,fy:0},efflux:{el:pump,fx:1,fy:.5},target:{el:pbp,fx:.5,fy:1},plasmid:{el:pl,fx:.5,fy:1},conj:[NX,NY+55],ab:()=>{const p=abPos(5,lt0);return [p.x,p.y]}});
    let lt0=0;
    R0={anchors:A,core:['om','porin','blac','efflux','target','plasmid','conj','ab'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;lt0=lt;
      ab.forEach((a,i)=>{const p=abPos(i,lt);at(a,{transform:`translate(${f2(p.x)},${f2(p.y)}) rotate(${f2(lt*40+i*20)})`,fill:p.f,opacity:p.o})});
      bl.forEach(b=>at(b,{opacity:t>=3?1:.5}));at(pump,{opacity:t>=6?1:.6});
      const q=Math.max(0,Math.min(1,(t-9)/2.5));const P0=[CX+RXc-60,CY+RYc-80],P1=[NX-80,NY-20];at(pmv,{cx:f2(lerp(P0[0],P1[0],q)),cy:f2(lerp(P0[1],P1[1],q)+(-60*Math.sin(q*Math.PI))),opacity:t>=9&&q<1?1:0});at(pl2,{opacity:q>=1?1:.15});at(pil,{opacity:t>=9?1:.3});st(t)}};
  }else{
    const GX=100,GY=230,N=22,M=16,S=22;el('rect',{x:GX-10,y:GY-10,width:N*S+20,height:M*S+20,rx:12,fill:'#0D1B2A',stroke:TH.faint,'stroke-width':2},g);
    const cells=[];for(let j=0;j<M;j++)for(let i=0;i<N;i++){const id=j*N+i;cells.push({e:el('ellipse',{cx:GX+S/2+i*S,cy:GY+S/2+j*S,rx:8,ry:5,fill:'#4FC3F7'},g),i,j,r:rnd(id,3)})}
    const MI=7,MJ=9;const mutD=(c)=>Math.hypot(c.i-MI,c.j-MJ);
    const cnt=el('text',{x:GX,y:GY+M*S+40,'font-size':17,'font-weight':800,fill:TH.ink},g);
    const C=axes(g,680,230,440,380,{x:[0,14],y:[1,1e10],ylog:true,xt:[0,2,4,6,8,10,12,14],xl:U('Kun','Day'),yl:U('Bakteriyalar (KHB/ml, log)','Bacteria (CFU/ml, log)')});
    [1,1e2,1e4,1e6,1e8,1e10].forEach(v=>txt(g,'10'+({1:'⁰',1e2:'²',1e4:'⁴',1e6:'⁶',1e8:'⁸',1e10:'¹⁰'})[v],670,C.py(v)+6,{size:15,color:'dim',weight:600,anchor:'end'}));
    el('rect',{x:C.px(2),y:230,width:C.px(9)-C.px(2),height:380,fill:'#EF5350',opacity:.1},g);txt(g,T(U('antibiotik','antibiotic')),C.px(5.5),252,{size:15,color:'#EF9A9A',weight:800});
    const sus=d=>d<2?1e9:Math.max(1,1e9*Math.pow(10,-(d-2)*1.4));const sus2=d=>d<9?sus(d):Math.min(1e9,sus(9)*Math.pow(10,(d-9)*1.2));
    const res=d=>d<2?10:Math.min(1e9,10*Math.pow(10,(d-2)*1.25));
    el('path',{d:pth(d=>[C.px(d),C.py(Math.max(1,sus(d)))],0,14,140),stroke:'#4FC3F7','stroke-width':4,fill:'none'},g);el('path',{d:pth(d=>[C.px(d),C.py(res(d))],0,14,140),stroke:'#EF5350','stroke-width':4,fill:'none'},g);
    el('line',{x1:680,x2:710,y1:690,y2:690,stroke:'#4FC3F7','stroke-width':5},g);txt(g,T(U('sezgir','susceptible')),716,696,{size:15,color:'#4FC3F7',weight:800,anchor:'start'});el('line',{x1:820,x2:850,y1:690,y2:690,stroke:'#EF5350','stroke-width':5},g);txt(g,T(U('chidamli','resistant')),856,696,{size:15,color:'#EF5350',weight:800,anchor:'start'});
    const cur=el('line',{y1:230,y2:610,stroke:TH.ink,'stroke-width':2},g);
    // MSW mini chart
    const W=axes(g,RX,250,440,170,{x:[0,10],y:[0,1],xl:U('Dori konsentratsiyasi →','Drug concentration →'),yl:U('Seleksiya xavfi','Selection risk')});
    el('rect',{x:W.px(3),y:250,width:W.px(7)-W.px(3),height:170,fill:'#FFB74D',opacity:.25},g);[[3,'MIC'],[7,'MPC']].forEach(([v,l])=>{el('line',{x1:W.px(v),x2:W.px(v),y1:250,y2:420,stroke:'#FFB74D','stroke-width':2,'stroke-dasharray':'5 4'},g);txt(g,l,W.px(v),442,{size:15,color:'#FFB74D',weight:800})});
    el('path',{d:pth(x=>[W.px(x),W.py(x<3?.1+.1*x/3:x<7?.2+.75*Math.sin((x-3)/4*Math.PI):.05)],0,10,100),stroke:'#FFB74D','stroke-width':4,fill:'none'},g);
    lines(g,RX,520,[U('MIC — o‘sishni to‘xtatuvchi eng kam konsentratsiya','MIC — minimum inhibitory concentration'),U('MPC — mutantlarni ham to‘xtatuvchi konsentratsiya','MPC — mutant prevention concentration'),U('Seleksiyani kuchaytiradi: past doza, keraksiz','Selection is driven by: low dose, unnecessary'),U('  antibiotik (virusli infeksiyada), chorvachilik','  antibiotics (viral infections), livestock use'),U('Oldini olish: aniq tashxis, to‘g‘ri doza va muddat,','Prevention: accurate diagnosis, right dose and duration,'),U('  emlash, infeksiya nazorati (qo‘l gigiyenasi)','  vaccination, infection control (hand hygiene)')],{size:16,dy:30});
    const st=steps(g,100,150,[[0,U('Katta populyatsiyada tasodifiy chidamli mutant bor','A large population already holds a rare resistant mutant')],[2,U('Antibiotik: sezgirlar nobud bo‘ladi','Antibiotic: susceptible cells die')],[5.5,U('Chidamli klon raqobatsiz ko‘payadi','Resistant clone grows without competition')],[9,U('Natija: infeksiya chidamli shtamm bilan qaytadi','Result: infection returns with a resistant strain')]],{size:22});
    note(g,U('Sxema; mutant chastotasi va egri chiziqlar taxminiy, panjara masshtabsiz','Schematic; mutant frequency and curves approximate, grid not to scale'),850,880,{size:18});
    const dOf=t=>t*14/TT;
    Object.assign(A,{mut:[GX+S/2+MI*S,GY+S/2+MJ*S],kill:[GX+S/2+18*S,GY+S/2+3*S],regrow:()=>[C.px(10),C.py(res(10))],msw:[W.px(5),250]});
    R0={anchors:A,core:['mut','kill','regrow','msw'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;const d=dOf(t);at(cur,{x1:f2(C.px(d)),x2:f2(C.px(d))});
      const rad=d<2?0:Math.min(30,Math.pow(Math.max(0,d-2),1.6)*1.1);const kf=d<2?0:Math.min(1,(d-2)/4);let nr=0,ns=0;
      cells.forEach(c=>{const isR=mutD(c)<=rad+.01;const dead=!isR&&c.r<kf;if(isR)nr++;else if(!dead)ns++;at(c.e,{fill:isR?'#EF5350':'#4FC3F7',opacity:dead?.1:1})});
      cnt.textContent=T(U('Kun ','Day '))+d.toFixed(1).replace('.',',')+' · '+T(U('sezgir ','susceptible '))+ns+' · '+T(U('chidamli ','resistant '))+nr;st(t)}};
  }
  R0.update(0);return R0});

KIT.bind();
})();
