/* ================= v2.4 SHELF: EARTH SCIENCE & ASTRONOMY — earthlayers · plates · volcano · thunderstorm · earthquake · watercycle · seasons · moonphases · eclipse · solarsystem
   + statesofmatter · photosynthesis · induction.  Numbers are real (PREM depths, Kepler periods, δ = 23.44°·sin, Snell-free geometry of shadows); sizes are schematic where noted. */
(()=>{
const {mix,dark,light,vol,txt,cyc,T}=KIT;
const U=(uz,en,ru)=>({uz,en,ru:ru||en});
KIT.names(NAMES.uz,{crust:'Yer po‘sti (5–70 km)',upperMantle:'Yuqori mantiya va astenosfera',lowerMantle:'Quyi mantiya (qattiq, juda sekin oqadi)',outerCore:'Tashqi yadro (suyuq Fe–Ni)',innerCore:'Ichki yadro (qattiq Fe–Ni)',convection:'Mantiya konveksiyasi',
  ridge:'O‘rta okean tizmasi',magmaUp:'Magma ko‘tariladi',oceanPlate:'Okean plitasi',contPlate:'Materik plitasi',asthen:'Astenosfera',newCrust:'Yangi okean qobig‘i',trench:'Chuqur nov (xandaq)',slab:'Subduksiya (plita botadi)',volcanoV:'Vulqon',quakes:'Zilzila o‘choqlari',mountains:'Burmali tog‘lar',fault:'Transform yoriq',offset:'Siljigan daryo o‘zani',
  crater:'Krater',vent:'Asosiy kanal (jerlo)',chamber:'Magma o‘chog‘i',ash:'Kul va gaz buluti',lavaFlow:'Lava oqimi',strata:'Kul va lava qatlamlari',bombs:'Vulqon bombalari',dike:'Yon kanal (dayka)',
  cloudCb:'To‘p-yomg‘irli bulut (Cb)',posTop:'+ zaryad (muz kristallari)',negBase:'− zaryad (bulut tagi)',groundPos:'+ induksiyalangan zaryad',leader:'Pog‘onali lider',streamer:'Yerdan qarshi lider',stroke:'Qaytar zarba — chaqmoq',thunder:'Momaqaldiroq (tovush to‘lqini)',updraft:'Ko‘tariluvchi havo oqimi',
  focusQ:'Gipotsentr (o‘choq)',epicenter:'Episentr',pwave:'P to‘lqin (bo‘ylama, tez)',swave:'S to‘lqin (ko‘ndalang, sekinroq)',faultQ:'Tektonik yoriq',station:'Seysmograf',seismogram:'Seysmogramma'});
KIT.names(NAMES.en,{crust:'Crust (5–70 km)',upperMantle:'Upper mantle & asthenosphere',lowerMantle:'Lower mantle (solid, creeps slowly)',outerCore:'Outer core (liquid Fe–Ni)',innerCore:'Inner core (solid Fe–Ni)',convection:'Mantle convection',
  ridge:'Mid-ocean ridge',magmaUp:'Rising magma',oceanPlate:'Oceanic plate',contPlate:'Continental plate',asthen:'Asthenosphere',newCrust:'New ocean crust',trench:'Ocean trench',slab:'Subducting slab',volcanoV:'Volcano',quakes:'Earthquake foci',mountains:'Fold mountains',fault:'Transform fault',offset:'Offset river bed',
  crater:'Crater',vent:'Main vent',chamber:'Magma chamber',ash:'Ash & gas cloud',lavaFlow:'Lava flow',strata:'Ash & lava layers',bombs:'Volcanic bombs',dike:'Side vent (dike)',
  cloudCb:'Cumulonimbus cloud',posTop:'+ charge (ice crystals)',negBase:'− charge (cloud base)',groundPos:'Induced + charge',leader:'Stepped leader',streamer:'Upward streamer',stroke:'Return stroke — lightning',thunder:'Thunder (sound wave)',updraft:'Updraft',
  focusQ:'Hypocentre (focus)',epicenter:'Epicentre',pwave:'P wave (longitudinal, fast)',swave:'S wave (transverse, slower)',faultQ:'Fault',station:'Seismograph',seismogram:'Seismogram'});
KIT.names(NAMES.ru,{crust:'Земная кора',lowerMantle:'Нижняя мантия',outerCore:'Внешнее ядро (жидкое)',innerCore:'Внутреннее ядро (твёрдое)',ridge:'Срединно-океанический хребет',trench:'Глубоководный желоб',crater:'Кратер',chamber:'Магматический очаг',epicenter:'Эпицентр',focusQ:'Гипоцентр'});
const uid=p=>p+(SM._e24=(SM._e24||0)+1);
const clipTo=(g,shape)=>{const id=uid('ec');const cp=el('clipPath',{id},DEFS);el(shape[0],shape[1],cp);const c=el('g',{'clip-path':`url(#${id})`},g);return c};
const arc=(cx,cy,r,a0,a1)=>{const p=a=>[cx+Math.cos(a)*r,cy+Math.sin(a)*r];const [x0,y0]=p(a0),[x1,y1]=p(a1);return `M${f2(x0)},${f2(y0)} A${r},${r} 0 ${Math.abs(a1-a0)>Math.PI?1:0} ${a1>a0?1:0} ${f2(x1)},${f2(y1)}`};
const sector=(cx,cy,r,a0,a1)=>`M${cx},${cy} L`+arc(cx,cy,r,a0,a1).slice(1)+'Z';
const tri=(x,L)=>{const m=((x%(2*L))+2*L)%(2*L);return m<L?m:2*L-m}; // deterministic bounce in [0,L]

/* ---------- EARTH'S LAYERS (PREM radii: 6371 / 5701 (660 km) / 3480 / 1221 km) ---------- */
SM.items.earthlayers=preset(1600,900,(g,it)=>{const cx=600,cy=470,R=400,A={};const r=km=>R*km/6371;
  const Rc=R,Rum=r(6371-660),Roc=r(3480),Ric=r(1221);const a0=Math.PI,a1=Math.PI*1.5;// cut-away wedge = top-left quadrant
  el('circle',{cx,cy,r:R+18,fill:'#4FC3F7',opacity:.18,filter:'url(#blur10)'},g);
  const surf=el('path',{d:sector(cx,cy,R,a1-TAU,a0),fill:KIT.lin('#2E86C1','#0B3D6B'),stroke:'#81D4FA','stroke-width':3},g);
  const land=clipTo(g,['path',{d:sector(cx,cy,R,a1-TAU,a0)}]);[[700,640,120,70,1],[880,420,80,130,2],[470,760,90,45,3],[760,820,110,40,4],[960,600,40,70,5]].forEach(([x,y,rx,ry,s])=>el('path',{d:blob(x,y,rx,ry,{seed:s,amp:.25}),fill:'#5D9B4A',opacity:.9},land));
  const L=[[Rc,'#8D6E63','crust'],[Rc-12,'#E07B39','upperMantle'],[Rum,'#C0392B','lowerMantle'],[Roc,'#F5B041','outerCore'],[Ric,'#FFF3B0','innerCore']];// crust drawn 12 px (≈190 km) — exaggerated, real 5–70 km
  const secs=L.map(([rr,c])=>el('path',{d:sector(cx,cy,rr,a0,a1),fill:c,stroke:dark(c,.3),'stroke-width':2,opacity:0},g));
  const icg=el('circle',{cx,cy,r:Ric*.55,fill:'#fff',opacity:0,filter:'url(#blur10)'},g);
  // mantle convection: two cells in the lower-mantle band
  const rm=(Rum+Roc)/2,cr=(Rum-Roc)/2-14;const cells=[1.12*Math.PI,1.38*Math.PI].map((a,i)=>{const c=[cx+Math.cos(a)*rm,cy+Math.sin(a)*rm];el('circle',{cx:c[0],cy:c[1],r:cr,fill:'none',stroke:'#FFCCBC','stroke-width':2,'stroke-dasharray':'6 8',opacity:.5},g);
    return {c,dots:[0,1,2,3].map(k=>el('circle',{r:6,fill:'#FFE0B2'},g)),dir:i?-1:1}});
  const ocd=[...Array(14)].map(()=>el('circle',{r:4,fill:'#FFF8E1',opacity:.8},g));
  // depth scale along the horizontal radius
  [[0,'0'],[660,'660'],[2890,'2890'],[5150,'5150'],[6371,'6371 km']].forEach(([d,s],i)=>{const x=cx-R+r(d);el('line',{x1:x,y1:cy,x2:x,y2:cy+14,stroke:TH.ink,'stroke-width':2},g);txt(g,s,x+(i===4?40:0),cy+40,{size:20,color:'dim',weight:600})});
  txt(g,T(U('Chuqurlik, km','Depth, km')),cx-R/2,cy+70,{size:20,color:'dim',weight:600});
  txt(g,T(U('Po‘st qalinligi ko‘rinishi uchun kattalashtirilgan','Crust thickness exaggerated for visibility')),cx,cy+R+50,{size:20,color:'dim',weight:600});
  // temperature–depth chart (approx. geotherm)
  const gx=1110,gy=150,gw=430,gh=560;el('rect',{x:gx,y:gy,width:gw,height:gh,rx:14,fill:TH.panel,stroke:TH.faint,'stroke-width':2},g);
  txt(g,T(U('Harorat, °C','Temperature, °C')),gx+gw/2,gy-16,{size:22,color:'dim'});
  const X=t=>gx+40+t/6000*(gw-70),Y=d=>gy+30+d/6371*(gh-60);[0,2000,4000,6000].forEach(t=>{el('line',{x1:X(t),y1:gy+30,x2:X(t),y2:gy+gh-30,stroke:TH.faint,'stroke-width':1},g);txt(g,String(t),X(t),gy+gh-8,{size:18,color:'dim',weight:600})});
  [[35,'#8D6E63'],[660,'#E07B39'],[2890,'#C0392B'],[5150,'#F5B041'],[6371,'#FFF3B0']].reduce((p,[d,c])=>{el('rect',{x:gx+12,y:Y(p),width:14,height:Y(d)-Y(p),fill:c},g);return d},0);
  const GT=[[0,15],[35,500],[100,1300],[660,1900],[2890,3700],[5150,5000],[6371,5400]];const gp=GT.map(([d,t])=>`${f2(X(t))},${f2(Y(d))}`).join(' L');const curve=el('path',{d:'M'+gp,fill:'none',stroke:'#FF7043','stroke-width':5,'stroke-linejoin':'round'},g);curve.setAttribute('pathLength',1);
  const sts=[[330,U('qattiq','solid')],[3600,U('suyuq','liquid')],[5800,U('qattiq','solid')]].map(([d,s])=>txt(g,T(s),X(1000)+10,Y(d)+8,{size:20,color:'dim',weight:600,anchor:'start'}));
  const pa=a=>[cx+Math.cos(a)*1,cy+Math.sin(a)*1];const mid=a=>(a0+a1)/2;
  const ray=(rr,a=1.25*Math.PI)=>[cx+Math.cos(a)*rr,cy+Math.sin(a)*rr];Object.assign(A,{crust:ray(Rc-5),upperMantle:ray(Rc-30),lowerMantle:ray(Rum-25),outerCore:ray((Roc+Ric)/2),innerCore:ray(Ric*.5),convection:cells[0].c});
  txt(g,T(U('↓ chuqurlik','↓ depth')),gx+60,gy+20,{size:18,color:'dim',weight:600,anchor:'start'});
  return {anchors:A,labelLayout:'side',sides:{crust:'left',upperMantle:'left',lowerMantle:'left',outerCore:'left',innerCore:'left',convection:'left'},update(lt,p,st){
    secs.forEach((s,i)=>s.setAttribute('opacity',f2(E.outCubic(prog(lt,st+.3+i*.35,st+.8+i*.35)))));icg.setAttribute('opacity',f2(.25+.15*Math.sin(lt*2)));
    curve.setAttribute('stroke-dasharray',`${f2(prog(lt,st+1,st+3.5))} 1`);
    cells.forEach(o=>o.dots.forEach((d,k)=>{const a=o.dir*lt*.5+k*TAU/4;at(d,{cx:f2(o.c[0]+Math.cos(a)*cr),cy:f2(o.c[1]+Math.sin(a)*cr),opacity:f2(prog(lt,st+1.5,st+2))})}));
    ocd.forEach((d,k)=>{const rr=Ric+10+(k%3)*(Roc-Ric-20)/2.2,a=a0+((k*.37+lt*.12*(1+(k%3)*.3))%1)*(a1-a0);at(d,{cx:f2(cx+Math.cos(a)*rr),cy:f2(cy+Math.sin(a)*rr),opacity:f2(.8*prog(lt,st+1.8,st+2.2))})})}}});

/* ---------- PLATE TECTONICS (cross-sections; real rates 2–10 cm/yr) ---------- */
SM.items.plates=preset(1700,860,(g,it)=>{const k=it.kind||'convergent',A={};const KS=['divergent','convergent','collision','transform'];if(!KS.includes(k))SERR.push(`plates: kind "${k}" → ${KS.join(', ')}`);
  const sea=250,ast=470,up=[];const cap=(s)=>txt(g,T(s),850,830,{size:26,color:'a2'});
  const asth=()=>{el('rect',{x:0,y:ast-20,width:1700,height:860-ast+20,fill:KIT.lin('#E8743B','#8E2C10')},g)};
  const conv=(x,dir)=>{const P=[...Array(5)].map(()=>el('circle',{r:5,fill:'#FFE0B2',opacity:.8},g));up.push(lt=>P.forEach((d,i)=>{const a=dir*lt*.6+i*TAU/5;at(d,{cx:f2(x+Math.cos(a)*170),cy:f2(650+Math.sin(a)*110)})}));el('ellipse',{cx:x,cy:650,rx:170,ry:110,fill:'none',stroke:'#FFCCBC','stroke-width':2,'stroke-dasharray':'8 10',opacity:.45},g)};
  const arrowH=(x,y,dx)=>el('line',{x1:x,y1:y,x2:x+dx,y2:y,stroke:'#fff','stroke-width':6,'marker-end':arrowMarker('#ffffff')},g);
  if(k==='divergent'){asth();conv(560,-1);conv(1140,1);el('rect',{x:0,y:120,width:1700,height:sea-120,fill:'none'},g);
    el('rect',{x:0,y:sea,width:1700,height:200,fill:'#1F5F8B'},g);// ocean water
    const plate=clipTo(g,['path',{d:`M0,380 L780,340 Q850,300 920,340 L1700,380 L1700,470 L0,470Z`}]);el('rect',{x:0,y:300,width:1700,height:200,fill:'#5D4037'},plate);
    const stripes=[...Array(16)].map((_,i)=>el('rect',{y:300,width:24,height:200,fill:i%2?'#8D6E63':'#3E2723'},plate));
    const crack=el('path',{d:'M850,470 L850,320',stroke:'#FF5722','stroke-width':14,'stroke-linecap':'round',filter:'url(#glowS)'},g);
    const blobs=[...Array(6)].map(()=>el('circle',{r:16,fill:'#FF7043',filter:'url(#glowS)'},g));arrowH(650,410,-160);arrowH(1050,410,160);
    up.push(lt=>{stripes.forEach((s,i)=>{const side=i%2?1:-1;const off=((lt*30+Math.floor(i/2)*100)%800);at(s,{x:f2(850+side*off-(side<0?24:0))})});blobs.forEach((b,i)=>{const q=(lt*.35+i/6)%1;at(b,{cx:f2(850+Math.sin(q*9+i)*14),cy:f2(lerp(760,330,q)),opacity:f2(Math.sin(Math.PI*q))})})});
    Object.assign(A,{ridge:[850,318],magmaUp:{el:blobs[2]},oceanPlate:[400,400],newCrust:[880,360],asthen:[300,600]});cap(U('Ajraluvchi chegara: plitalar uzoqlashadi, magma yangi qobiq hosil qiladi (≈2–5 sm/yil)','Divergent boundary: plates move apart, magma forms new crust (≈2–5 cm/yr)'))}
  if(k==='convergent'||k==='collision'){asth();
    // slab centre-line: straight, then bends to 35° (oceanic) — for collision both are continental
    const C=[];let x=0,y=sea+90,th=0;for(let s=0;s<=1700;s+=10){C.push([x,y,th]);const bend=s>820?Math.min(1,(s-820)/260):0;th=bend*(k==='collision'?.25:.62);x+=10*Math.cos(th);y+=10*Math.sin(th)}
    const H=k==='collision'?60:44;const top=C.map(([x,y,t])=>[x+Math.sin(t)*H,y-Math.cos(t)*H]),bot=C.map(([x,y,t])=>[x-Math.sin(t)*H,y+Math.cos(t)*H]);
    const pl=pts=>pts.map((p,i)=>(i?'L':'M')+f2(p[0])+','+f2(p[1])).join(' ');
    const ocean=k==='convergent';if(ocean){el('path',{d:`M0,${sea} L1000,${sea} L1000,${f2(top[98][1])} `+pl(top.slice(0,99).reverse()).replace('M','L')+'Z',fill:'#1F5F8B'},g)}
    const slabG=clipTo(g,['path',{d:pl(top)+' '+pl(bot.slice().reverse()).replace('M','L')+'Z'}]);el('rect',{x:0,y:0,width:1700,height:860,fill:ocean?'#4E342E':'#8D6E63'},slabG);
    const marks=[...Array(22)].map(()=>el('line',{stroke:ocean?'#795548':'#A1887F','stroke-width':10},slabG));
    // overriding plate
    const ix=top.findIndex(p=>p[0]>1000);const edge=top.slice(ix-12,ix+28);const cTop=ocean?sea-30:sea-30;
    const mtn=el('path',{fill:'#A1887F',stroke:'#6D4C41','stroke-width':3},g);
    el('path',{d:`M${f2(edge[0][0])},${f2(edge[0][1])} L${f2(edge[0][0]+60)},${cTop} L1700,${cTop} L1700,${ast} L${f2(edge[edge.length-1][0])},${f2(edge[edge.length-1][1]+H*1.2)} `+pl(edge.slice().reverse()).replace('M','L')+'Z',fill:'#8D6E63',stroke:'#5D4037','stroke-width':3},g);
    el('line',{x1:0,y1:sea,x2:ocean?0:0,y2:sea,stroke:'#81D4FA'},g);
    up.push(lt=>{marks.forEach((m,i)=>{const s=Math.floor(((lt*4+i*8)%170));const a=C[s];if(!a)return;at(m,{x1:f2(a[0]+Math.sin(a[2])*H),y1:f2(a[1]-Math.cos(a[2])*H),x2:f2(a[0]-Math.sin(a[2])*H),y2:f2(a[1]+Math.cos(a[2])*H)})})});
    arrowH(300,sea+60,180);arrowH(1500,cTop+70,-180);
    const qk=[110,122,134,146].map((s,i)=>{const a=C[s];const c=el('circle',{cx:f2(a[0]+Math.sin(a[2])*H*.8),cy:f2(a[1]-Math.cos(a[2])*H*.8),r:10,fill:'#FFEB3B',opacity:0},g);up.push(lt=>c.setAttribute('opacity',f2(Math.max(0,Math.sin((lt*1.3+i*1.7)%TAU))**8)));return c});
    if(ocean){const vx=1250;el('path',{d:`M${vx-120},${cTop} L${vx-18},${cTop-120} L${vx+18},${cTop-120} L${vx+120},${cTop}Z`,fill:'#6D4C41',stroke:'#4E342E','stroke-width':3},g);
      const s0=C[140];const mg=[...Array(6)].map(()=>el('circle',{r:12,fill:'#FF7043',filter:'url(#glowS)'},g));const puff=[...Array(5)].map(()=>el('circle',{fill:'#9E9E9E',opacity:.6},g));
      up.push(lt=>{mg.forEach((b,i)=>{const q=(lt*.3+i/6)%1;at(b,{cx:f2(lerp(s0[0],vx,q)+Math.sin(q*12+i)*10),cy:f2(lerp(s0[1]-60,cTop-110,q)),opacity:f2(Math.sin(Math.PI*q))})});puff.forEach((c,i)=>{const q=(lt*.25+i/5)%1;at(c,{cx:f2(vx+q*80),cy:f2(cTop-130-q*120),r:f2(14+q*40),opacity:f2(.6*(1-q))})})});
      Object.assign(A,{oceanPlate:[400,sea+60],contPlate:[1500,cTop+40],trench:[f2(edge[10][0]),f2(edge[10][1])],slab:{el:marks[3]},volcanoV:[vx,cTop-120],magmaUp:{el:mg[3]},quakes:{el:qk[1]},asthen:[300,640]});
      cap(U('Yaqinlashuvchi chegara: og‘ir okean plitasi materik ostiga botadi → xandaq, vulqonlar, zilzilalar','Convergent boundary: dense oceanic plate sinks under the continent → trench, volcanoes, quakes'))}
    else{const mx=1080;up.push(lt=>{const q=E.outCubic(clamp((lt-.5)/6));let d=`M${mx-330},${cTop} `;for(let x2=mx-330;x2<=mx+330;x2+=30){const u=(x2-mx)/330;d+=`L${x2},${f2(cTop-q*230*Math.exp(-u*u*3)*(1+.18*Math.sin(x2*.09)))} `}mtn.setAttribute('d',d+`L${mx+330},${cTop}Z`)});
      Object.assign(A,{contPlate:[400,sea+60],mountains:[mx,cTop-150],quakes:{el:qk[1]},asthen:[300,640]});cap(U('To‘qnashuv: ikki materik — po‘st qalinlashib tog‘ ko‘tariladi (Himolay)','Collision: two continents — crust thickens into mountains (Himalaya)'))}}
  if(k==='transform'){// map (top) view, stick-slip
    const fx=850;el('rect',{x:80,y:80,width:1540,height:640,rx:20,fill:'#A5B86A'},g);el('rect',{x:fx,y:80,width:770,height:640,fill:'#C2B280',opacity:.6},g);
    const flt=el('line',{x1:fx,y1:60,x2:fx,y2:740,stroke:'#5D4037','stroke-width':8,'stroke-dasharray':'26 10'},g);
    const rL=el('path',{d:`M120,400 C400,380 600,420 ${fx},400`,fill:'none',stroke:'#1E88E5','stroke-width':16,'stroke-linecap':'round'},g);const RG=el('g',{},g);el('path',{d:`M${fx},400 C1100,380 1300,420 1580,400`,fill:'none',stroke:'#1E88E5','stroke-width':16,'stroke-linecap':'round'},RG);
    el('line',{x1:fx-200,y1:220,x2:fx-200,y2:120,stroke:'#fff','stroke-width':8,'marker-end':arrowMarker('#ffffff')},g);el('line',{x1:fx+200,y1:580,x2:fx+200,y2:680,stroke:'#fff','stroke-width':8,'marker-end':arrowMarker('#ffffff')},g);
    const star=el('circle',{cx:fx,cy:400,r:30,fill:'#FFEB3B',opacity:0,filter:'url(#glowS)'},g);
    up.push(lt=>{const ph=lt/3,n=Math.floor(ph),f=ph-n;const slip=Math.min(n,6)*22+(n<6&&f>.85?E.outCubic((f-.85)/.15)*22:0);RG.setAttribute('transform',`translate(0 ${f2(slip)})`);star.setAttribute('opacity',f2(n<6&&f>.85?Math.sin(Math.PI*(f-.85)/.15):0))});
    Object.assign(A,{fault:[fx,120],offset:[fx+60,410],quakes:{el:star}});cap(U('Transform chegara: plitalar yonma-yon siljiydi; kuchlanish to‘planib, zilzila bilan bo‘shaydi','Transform boundary: plates slide past; stress builds and releases in quakes'))}
  return {anchors:A,update(lt){up.forEach(f=>f(lt))}}});

/* ---------- VOLCANO (stratovolcano cross-section, eruption) ---------- */
SM.items.volcano=preset(1500,900,(g,it)=>{const A={},cx=700,base=700,top=230,hw=520,cw=60;const g0=9.8;
  el('rect',{x:0,y:base,width:1500,height:200,fill:'#5D4037'},g);el('rect',{x:0,y:base+60,width:1500,height:140,fill:'#4E342E'},g);
  const cone=`M${cx-hw},${base} L${cx-cw},${top} L${cx+cw},${top} L${cx+hw},${base}Z`;const C=clipTo(g,['path',{d:cone}]);
  for(let i=0;i<9;i++){const y=top+i*55;el('path',{d:`M0,${y+40} Q${cx},${y-10} 1500,${y+40} L1500,${y+80} Q${cx},${y+30} 0,${y+80}Z`,fill:i%2?'#8D6E63':'#6D4C41'},C)}
  el('path',{d:cone,fill:'none',stroke:'#3E2723','stroke-width':4},g);el('path',{d:`M${cx-cw},${top} Q${cx},${top+50} ${cx+cw},${top}`,fill:'#3E2723'},g);
  el('ellipse',{cx,cy:base+110,rx:260,ry:70,fill:'#E64A19',stroke:'#BF360C','stroke-width':4,filter:'url(#glowS)'},g);
  el('path',{d:`M${cx-22},${base+50} L${cx-16},${top+30} L${cx+16},${top+30} L${cx+22},${base+50}Z`,fill:'#FF5722'},g);
  el('path',{d:`M${cx+10},${base-80} Q${cx+180},${base-170} ${cx+300},${base-250}`,fill:'none',stroke:'#FF5722','stroke-width':16,'stroke-linecap':'round'},g);
  const sc=el('path',{d:`M${cx+260},${base-232} L${cx+300},${base-286} L${cx+340},${base-225}Z`,fill:'#6D4C41',stroke:'#3E2723','stroke-width':3},g);
  const glow=el('ellipse',{cx,cy:top+10,rx:70,ry:26,fill:'#FFAB40',filter:'url(#blur10)',opacity:0},g);
  const flow=el('path',{d:`M${cx+40},${top+8} C${cx+120},${top+160} ${cx+220},${top+300} ${cx+300},${base-20}`,fill:'none',stroke:'#FF6D00','stroke-width':22,'stroke-linecap':'round',filter:'url(#glowS)'},g);flow.setAttribute('pathLength',1);
  const ash=[...Array(16)].map(()=>el('circle',{fill:'#9E9E9E'},g));const bombs=[...Array(6)].map(()=>el('circle',{r:12,fill:'#3E2723',stroke:'#FF7043','stroke-width':4},g));
  const BV=[[-160,-520],[120,-560],[-60,-600],[220,-480],[-250,-430],[60,-640]];// px/s launch velocities (scaled g)
  {const G0=el('g',{class:'uni'},g);const yb=base+110;el('path',{d:`M60,${base} L60,${yb} M48,${base} L72,${base} M48,${yb} L72,${yb}`,stroke:'#FFCCBC','stroke-width':3,fill:'none'},G0);txt(G0,T(U('2–10 km','2–10 km')),80,(base+yb)/2+6,{size:17,color:'ink',weight:800,anchor:'start'});
   txt(G0,T(U('(chuqurlik miqyossiz)','(depth not to scale)')),80,(base+yb)/2+30,{size:14,color:'dim',weight:600,anchor:'start'});
   [U('Stratovulqon: kul va lava qatlamlari navbatlashadi','Stratovolcano: alternating ash and lava layers'),U('Magma 700–1200 °C; andezit/datsit — yopishqoq','Magma 700–1200 °C; andesite/dacite — viscous'),U('Yopishqoq magma + gaz → portlovchi otilish','Viscous magma + gas → explosive eruption'),U('Gazlar: H₂O, CO₂, SO₂; VEI 0–8 shkalasi','Gases: H₂O, CO₂, SO₂; VEI scale 0–8')].forEach((l,i)=>txt(G0,T(l),1070,250+i*28,{size:16,color:'dim',weight:700,anchor:'start'}))}
  Object.assign(A,{crater:[cx,top+4],vent:[cx,base-140],chamber:[cx-150,base+80],ash:{el:ash[5]},lavaFlow:{el:flow,fx:.8,fy:.7},strata:[cx-300,base-120],bombs:{el:bombs[1]},dike:[cx+180,base-170]});
  return {anchors:A,update(lt,p,st){const t=lt-st-1;const on=clamp(t/1.2);glow.setAttribute('opacity',f2(on*(.6+.3*Math.sin(lt*8))));flow.setAttribute('stroke-dasharray',`${f2(E.outCubic(clamp((t-.5)/5)))} 1`);
    ash.forEach((c,i)=>{const q=((t*.12+i/16)%1+1)%1;const live=t>0;at(c,{cx:f2(cx+Math.sin(i*2.3)*q*220+q*140),cy:f2(top-20-q*320),r:f2(20+q*90),opacity:f2(live?.55*(1-q)*on:0)})});
    bombs.forEach((b,i)=>{const T0=2.2,tt=((t+i*.37)%T0+T0)%T0;const [vx,vy]=BV[i];const gp=600;const x=cx+vx*tt*.55,y=top+vy*tt*.55+.5*gp*(tt*.55)**2;at(b,{cx:f2(x),cy:f2(y),opacity:t>0&&y<base?1:0})})}}});

/* ---------- THUNDERSTORM: charge separation → stepped leader → return stroke → thunder ---------- */
SM.items.thunderstorm=preset(1600,900,(g,it)=>{const A={},TT=it.cycle||9,gy=780,lx=760;
  el('rect',{x:0,y:gy,width:1600,height:120,fill:'#33691E'},g);
  const cl=`M300,520 C260,440 330,380 420,390 C430,300 540,260 620,300 C640,200 760,170 840,230 C900,160 1030,170 1060,260 C1180,250 1260,330 1220,420 C1300,450 1300,520 1220,540 Z`;
  el('path',{d:'M520,250 C700,150 1000,150 1300,170 L1340,200 C1050,210 800,230 640,300Z',fill:'#90A4AE',opacity:.9},g);// anvil
  el('path',{d:cl,fill:KIT.lin('#B0BEC5','#455A64'),stroke:'#CFD8DC','stroke-width':3},g);
  const upd=[0,1,2].map(i=>el('line',{x1:560+i*260,y1:500,x2:560+i*260,y2:330,stroke:'#E3F2FD','stroke-width':5,'marker-end':arrowMarker('#E3F2FD'),opacity:.6},g));
  const ch=(x,y,s,c)=>{const e=el('g',{},g);el('circle',{cx:x,cy:y,r:15,fill:c,opacity:.9},e);txt(e,s,x,y+9,{size:26,color:'#111',weight:900});return e};
  const P=[[600,300],[700,270],[820,250],[940,260],[1040,290],[760,320],[900,310]].map(([x,y])=>ch(x,y,'+','#FFCDD2'));
  const N=[[460,490],[560,505],[660,510],[760,512],[860,510],[960,505],[1060,495],[1160,480]].map(([x,y])=>ch(x,y,'−','#BBDEFB'));
  const G=[...Array(9)].map((_,i)=>ch(480+i*80,gy+30,'+','#FFCDD2'));
  const tree=el('g',{},g);el('rect',{x:lx-8,y:gy-70,width:16,height:70,fill:'#5D4037'},tree);el('circle',{cx:lx,cy:gy-100,r:44,fill:'#2E7D32'},tree);
  // leader path: deterministic zig-zag from cloud base to tree top
  const pts=[[720,520]];for(let i=1;i<=12;i++){const y=520+i*(gy-150-520)/12;pts.push([lx-40+Math.sin(i*2.7)*40+(i/12)*40,y])}
  const br=[[4,[-70,40]],[7,[60,50]],[9,[-50,45]]];const pth=p=>p.map((q,i)=>(i?'L':'M')+f2(q[0])+','+f2(q[1])).join(' ');
  const lead=el('path',{fill:'none',stroke:'#E1F5FE','stroke-width':4,opacity:.9},g);const brs=br.map(()=>el('path',{fill:'none',stroke:'#E1F5FE','stroke-width':2.5,opacity:.8},g));
  const strm=el('path',{d:`M${lx},${gy-144} L${lx-6},${gy-170} L${lx+4},${gy-196}`,fill:'none',stroke:'#FFF59D','stroke-width':4},g);
  const bolt=el('path',{d:pth([...pts,[lx,gy-144]]),fill:'none',stroke:'#fff','stroke-width':12,filter:'url(#glow2)',opacity:0},g);const flash=el('rect',{x:0,y:0,width:1600,height:900,fill:'#fff',opacity:0},g);
  const snd=[0,1,2].map(()=>el('circle',{cx:lx,cy:600,fill:'none',stroke:'#FFE082','stroke-width':4,opacity:0},g));
  const info=txt(g,'',1300,700,{size:26,color:'a2'});
  Object.assign(A,{cloudCb:[1220,420],posTop:{el:P[2]},negBase:{el:N[6]},groundPos:{el:G[7]},updraft:{el:upd[2],fx:.5,fy:.4},leader:{el:lead,fx:.3,fy:.6},streamer:{el:strm},stroke:{el:bolt,fx:.5,fy:.5},thunder:{el:snd[1],fx:1,fy:.5}});
  return {anchors:A,update(lt,p,st){const t=((lt-st)%TT+TT)%TT;const chg=clamp(t/2);[...P,...N].forEach((c,i)=>c.setAttribute('opacity',f2(clamp(chg*2-i*.06))));G.forEach((c,i)=>c.setAttribute('opacity',f2(clamp((t-1.5)/1))));
    const lq=clamp((t-2.5)/1.6),n=Math.floor(lq*12);lead.setAttribute('d',lq>0?pth(pts.slice(0,n+1)):'');br.forEach(([i,d],j)=>brs[j].setAttribute('d',n>i?pth([pts[i],[pts[i][0]+d[0],pts[i][1]+d[1]]]):''));
    strm.setAttribute('opacity',f2(t>3.6&&t<4.4?1:0));const s=t-4.1;bolt.setAttribute('opacity',f2(s>0&&s<.6?1-s/.6*.6:0));flash.setAttribute('opacity',f2(s>0&&s<.25?.35*(1-s/.25):0));
    if(s>0&&s<.4){lead.setAttribute('opacity',0)}else lead.setAttribute('opacity',.9);if(s>0)[...N].forEach(c=>c.setAttribute('opacity',f2(clamp(1-s*2))));
    snd.forEach((c,i)=>{const q=s-.2-i*.25;at(c,{r:f2(Math.max(0,q)*170),opacity:f2(q>0&&q<4?.8*(1-q/4):0)})});
    info.textContent=s>0?T(U(`Yorug‘lik ≈ bir zumda, tovush 343 m/s → ${(Math.max(0,s)).toFixed(1)} s ≈ ${(Math.max(0,s)*0.343).toFixed(2)} km`,`Light ≈ instant, sound 343 m/s → ${Math.max(0,s).toFixed(1)} s ≈ ${(Math.max(0,s)*0.343).toFixed(2)} km`)):''}}});
KIT.names(NAMES.uz,{evap:'Bug‘lanish',transp:'Transpiratsiya (o‘simliklar)',cond:'Kondensatsiya (bulut)',precip:'Yog‘in',runoff:'Yer usti oqimi (daryo)',infil:'Shimilish (infiltratsiya)',ground:'Yer osti suvlari',snowcap:'Qor va muzliklar',sunW:'Quyosh energiyasi',
  sunS:'Quyosh',earthS:'Yer',moonS:'Oy',axisS:'Yer o‘qi (23,4° og‘gan)',orbitS:'Orbita',umbra:'Soya (umbra) — to‘liq tutilish',penumbra:'Yarim soya (penumbra) — qisman',sunlight:'Quyosh nurlari',beltA:'Asteroidlar kamari',
  solid:'Qattiq: zarralar joyida tebranadi',liquid:'Suyuq: zarralar yaqin, sirpanadi',gas:'Gaz: zarralar uzoq, tez va tartibsiz',melt:'Erish (0 °C) — harorat o‘zgarmaydi',boil:'Qaynash (100 °C) — harorat o‘zgarmaydi',heater:'Isitgich',
  lightIn:'Yorug‘lik energiyasi',water:'Suv (H₂O)',oxygen:'Kislorod (O₂) ajraladi',co2:'Karbonat angidrid (CO₂)',glucose:'Glyukoza (C₆H₁₂O₆)',thylakoid:'Tilakoidlar — yorug‘lik bosqichi',calvin:'Kalvin sikli (stroma)',atp:'ATF + NADF·H',
  magnet:'Doimiy magnit',coil:'G‘altak (N o‘ram)',galv:'Galvanometr',fieldL:'Magnit maydon chiziqlari',current:'Induksion tok'});
KIT.names(NAMES.en,{evap:'Evaporation',transp:'Transpiration',cond:'Condensation (cloud)',precip:'Precipitation',runoff:'Surface runoff (river)',infil:'Infiltration',ground:'Groundwater',snowcap:'Snow & glaciers',sunW:'Solar energy',
  sunS:'Sun',earthS:'Earth',moonS:'Moon',axisS:'Earth’s axis (tilted 23.4°)',orbitS:'Orbit',umbra:'Umbra — total eclipse',penumbra:'Penumbra — partial',sunlight:'Sunlight',beltA:'Asteroid belt',
  solid:'Solid: particles vibrate in place',liquid:'Liquid: close, slide past',gas:'Gas: far apart, fast, random',melt:'Melting (0 °C) — temperature constant',boil:'Boiling (100 °C) — temperature constant',heater:'Heater',
  lightIn:'Light energy',water:'Water (H₂O)',oxygen:'Oxygen (O₂) released',co2:'Carbon dioxide (CO₂)',glucose:'Glucose (C₆H₁₂O₆)',thylakoid:'Thylakoids — light reactions',calvin:'Calvin cycle (stroma)',atp:'ATP + NADPH',
  magnet:'Bar magnet',coil:'Coil (N turns)',galv:'Galvanometer',fieldL:'Magnetic field lines',current:'Induced current'});
/* ---------- EARTHQUAKE: P & S waves from the focus, seismogram (vP ≈ 6 km/s, vS ≈ 3.5 km/s) ---------- */
SM.items.earthquake=preset(1600,900,(g,it)=>{const A={},sy=300,fx=620,fy=640,stx=1300,vp=150,vs=vp/1.73,TT=it.cycle||9;
  el('rect',{x:0,y:sy,width:1600,height:600,fill:KIT.lin('#8D6E63','#4E342E')},g);for(let i=1;i<6;i++)el('line',{x1:0,y1:sy+i*95,x2:1600,y2:sy+i*95+((i%2)?14:-10),stroke:'#3E2723','stroke-width':2,opacity:.5},g);
  el('line',{x1:fx-220,y1:900,x2:fx+120,y2:sy,stroke:'#212121','stroke-width':6,'stroke-dasharray':'20 10'},g);
  const W=clipTo(g,['rect',{x:0,y:sy,width:1600,height:600}]);const PW=[0,1,2].map(()=>el('circle',{cx:fx,cy:fy,fill:'none',stroke:'#4FC3F7','stroke-width':5,'stroke-dasharray':'4 10'},W)),SW=[0,1,2].map(()=>el('circle',{cx:fx,cy:fy,fill:'none',stroke:'#FF5252','stroke-width':5},W));
  const foc=el('circle',{cx:fx,cy:fy,r:14,fill:'#FFEB3B',filter:'url(#glowS)'},g);const epi=el('path',{d:`M${fx+18},${sy} l-18,-30 l-18,30Z`,fill:'#FF7043'},g);el('line',{x1:fx,y1:fy,x2:fx,y2:sy,stroke:'#FFEB3B','stroke-width':2,'stroke-dasharray':'6 6'},g);
  const stn=el('g',{},g);el('rect',{x:stx-40,y:sy-60,width:80,height:60,rx:8,fill:'#ECEFF1'},stn);el('circle',{cx:stx,cy:sy-30,r:12,fill:'#455A64'},stn);
  const px=1060,py=24,pw=500,ph=150;el('rect',{x:px,y:py,width:pw,height:ph,rx:12,fill:'#FAFAFA'},g);el('line',{x1:px+20,y1:py+ph/2,x2:px+pw-20,y2:py+ph/2,stroke:'#B0BEC5','stroke-width':1},g);
  const tr=el('path',{fill:'none',stroke:'#263238','stroke-width':2.5},g);const d0=Math.hypot(stx-fx,sy-fy),tp=d0/vp,ts=d0/vs;
  const mP=txt(g,'P',0,py+24,{size:20,color:'#0277BD'}),mS=txt(g,'S',0,py+24,{size:20,color:'#C62828'});txt(g,T(U('S − P kechikishi → masofa','S − P delay → distance')),px+pw/2,py+ph+30,{size:20,color:'dim',weight:600});
  const sec=pw-40;const tX=t=>px+20+t/TT*sec;at(mP,{x:f2(tX(tp+.6))});at(mS,{x:f2(tX(ts+.6))});
  Object.assign(A,{focusQ:{el:foc},epicenter:{el:epi,fx:.5,fy:0},pwave:{el:PW[0],fx:.85,fy:.5},swave:{el:SW[0],fx:.7,fy:.5},faultQ:[fx-160,820],station:{el:stn,fx:.5,fy:0},seismogram:[px+pw/2,py]});
  return {anchors:A,update(lt,p,st){const t=((lt-st-.6)%TT+TT)%TT;PW.forEach((c,i)=>{const q=t-i*.15;at(c,{r:f2(Math.max(0,q)*vp),opacity:f2(q>0?Math.max(0,1-q*vp/1500):0)})});SW.forEach((c,i)=>{const q=t-i*.15;at(c,{r:f2(Math.max(0,q)*vs),opacity:f2(q>0?Math.max(0,1-q*vs/1200):0)})});
    foc.setAttribute('r',f2(14+(t<.5?Math.sin(t*40)*4:0)));let d='';for(let tt=0;tt<=t;tt+=.02){const a=(tt>tp?.18*Math.exp(-(tt-tp)*1.2):0)+(tt>ts?.75*Math.exp(-(tt-ts)*.8):0);d+=(d?' L':'M')+f2(tX(tt))+','+f2(py+ph/2+Math.sin(tt*60)*a*ph*.45)}tr.setAttribute('d',d);
    stn.setAttribute('transform',`translate(${f2(t>tp&&t<ts+2?Math.sin(t*50)*(t>ts?5:2):0)} 0)`)}}});
/* ---------- WATER CYCLE ---------- */
SM.items.watercycle=preset(1700,900,(g,it)=>{const A={},up=[];
  el('rect',{x:0,y:0,width:1700,height:900,fill:KIT.lin('#81D4FA','#E1F5FE'),opacity:.25},g);
  const sun=el('circle',{cx:200,cy:150,r:70,fill:'#FFD54F',filter:'url(#glowS)'},g);
  el('path',{d:'M0,640 L620,640 C700,640 760,600 820,560 L1100,250 L1220,330 L1300,270 L1700,560 L1700,900 L0,900Z',fill:'#6D8B3A'},g);
  el('path',{d:'M1040,316 L1100,250 L1160,290 L1130,300 L1100,285 L1070,320Z',fill:'#FAFAFA'},g);
  el('rect',{x:0,y:640,width:640,height:260,fill:'#1E6FA8'},g);
  el('rect',{x:640,y:760,width:1060,height:140,fill:'#5D4037',opacity:.5},g);// soil/aquifer
  const river=el('path',{d:'M1180,320 C1100,420 980,470 900,560 C820,640 720,650 640,660',fill:'none',stroke:'#1E88E5','stroke-width':16,'stroke-linecap':'round','stroke-dasharray':'26 14'},g);
  [[880,600],[960,560],[1360,420],[1450,470]].forEach(([x,y])=>{el('rect',{x:x-6,y:y-50,width:12,height:50,fill:'#5D4037'},g);el('circle',{cx:x,cy:y-70,r:34,fill:'#2E7D32'},g)});
  const cloud=el('g',{},g);[[0,0,70],[70,10,60],[-70,12,55],[30,-40,60]].forEach(([dx,dy,r])=>el('circle',{cx:dx,cy:dy,r,fill:'#ECEFF1'},cloud));
  const vap=[...Array(14)].map(()=>el('path',{fill:'none',stroke:'#E3F2FD','stroke-width':4,'stroke-linecap':'round'},g));const tv=[...Array(6)].map(()=>el('circle',{r:5,fill:'#B3E5FC'},g));
  const rain=[...Array(26)].map(()=>el('line',{stroke:'#1565C0','stroke-width':4,'stroke-linecap':'round'},g));const inf=[...Array(10)].map(()=>el('circle',{r:6,fill:'#4FC3F7'},g));
  const gw=el('path',{d:'M1500,840 C1200,830 900,820 650,800',fill:'none',stroke:'#4FC3F7','stroke-width':6,'stroke-dasharray':'12 12',opacity:.8,'marker-end':arrowMarker('#4FC3F7')},g);
  const arr=(d)=>el('path',{d,fill:'none',stroke:'#fff','stroke-width':5,'stroke-dasharray':'2 12','stroke-linecap':'round','marker-end':arrowMarker('#ffffff'),opacity:.8},g);arr('M560,320 C700,220 820,200 960,190');
  {const G0=el('g',{class:'uni'},g);el('rect',{x:1270,y:24,width:420,height:206,rx:12,fill:'#0D1B2A',opacity:.78},G0);txt(G0,T(U('Oqimlar, ×10³ km³/yil (Trenberth 2007)','Fluxes, ×10³ km³/yr (Trenberth 2007)')),1285,54,{size:17,color:'ink',weight:800,anchor:'start'});
   [[U('Okeandan bug‘lanish','Ocean evaporation'),413],[U('Okeanga yog‘in','Ocean precipitation'),373],[U('Quruqlikka yog‘in','Land precipitation'),113],[U('Evapotranspiratsiya','Evapotranspiration'),73],[U('Daryo oqimi → okean','Runoff → ocean'),40]].forEach(([l,v],i)=>{txt(G0,T(l),1285,84+i*27,{size:16,color:'dim',weight:700,anchor:'start'});txt(G0,String(v),1675,84+i*27,{size:16,color:'ink',weight:800,anchor:'end'})});
   txt(G0,T(U('Atmosferada ~12,9 — bug‘ ~9 kun turadi','Atmosphere holds ~12.9 — residence ~9 days')),1285,220,{size:15,color:'dim',weight:600,anchor:'start'})}
  Object.assign(A,{sunW:{el:sun},evap:{el:vap[4]},transp:[1380,325],cond:{el:cloud,fx:.5,fy:0},precip:{el:rain[6]},snowcap:[1100,262],runoff:[900,560],infil:{el:inf[3]},ground:[1100,826]});
  return {anchors:A,update(lt){const cxp=1100+Math.sin(lt*.2)*30;cloud.setAttribute('transform',`translate(${f2(cxp)} 140) scale(${f2(1+.06*Math.sin(lt*.5))})`);
    vap.forEach((v,i)=>{const q=(lt*.25+i/14)%1,x=60+(i*41)%560,y=630-q*380;v.setAttribute('d',`M${x},${f2(y)} q8,-14 0,-28 q-8,-14 0,-28`);v.setAttribute('opacity',f2(Math.sin(Math.PI*q)*.9))});
    tv.forEach((c,i)=>{const q=(lt*.3+i/6)%1;const b=[[880,530],[960,490],[1360,350],[1450,400]][i%4];at(c,{cx:f2(b[0]+Math.sin(q*8)*10),cy:f2(b[1]-q*160),opacity:f2(Math.sin(Math.PI*q))})});
    rain.forEach((r,i)=>{const q=(lt*.9+i/26)%1,x=cxp-110+(i*37)%230,y=200+q*200;at(r,{x1:f2(x),y1:f2(y),x2:f2(x-5),y2:f2(y+22),opacity:f2(1-q*.3)})});
    river.setAttribute('stroke-dashoffset',f2(-lt*60));inf.forEach((c,i)=>{const q=(lt*.25+i/10)%1;at(c,{cx:f2(760+(i*83)%700),cy:f2(lerp(690,830,q)-Math.max(0,(760+(i*83)%700-820))*.0),opacity:f2(Math.sin(Math.PI*q))})});gw.setAttribute('stroke-dashoffset',f2(-lt*30))}}});
/* ---------- SEASONS (axis keeps its direction; δ = 23.44°·sin(λ)) ---------- */
SM.items.seasons=preset(1700,900,(g,it)=>{const A={},cx=850,cy=430,rx=560,ry=220,TT=it.year||12,tilt=23.44*Math.PI/180,er=48;
  el('ellipse',{cx,cy,rx,ry,fill:'none',stroke:TH.dim,'stroke-width':2,'stroke-dasharray':'8 8'},g);
  el('circle',{cx,cy,r:110,fill:'#FFB300',opacity:.35,filter:'url(#blur24)'},g);const sun=el('circle',{cx,cy,r:70,fill:vol('#FFC107')},g);
  const pos=a=>[cx+Math.cos(a)*rx,cy-Math.sin(a)*ry];// a measured CCW (top view) from +x
  const drawEarth=(par,x,y,sc=1)=>{const G=el('g',{transform:`translate(${f2(x)} ${f2(y)}) scale(${sc})`},par);el('circle',{r:er,fill:'#1E88E5'},G);el('path',{d:blob(0,0,er*.6,er*.4,{seed:3,amp:.3}),fill:'#43A047'},G);const night=el('path',{fill:'#000',opacity:.55},G);
    el('line',{x1:-Math.sin(tilt)*(er+26),y1:Math.cos(tilt)*(er+26),x2:Math.sin(tilt)*(er+26),y2:-Math.cos(tilt)*(er+26),stroke:'#fff','stroke-width':3},G);txt(G,'N',Math.sin(tilt)*(er+40),-Math.cos(tilt)*(er+40)+8,{size:20,color:'#fff'});
    const eq=el('ellipse',{rx:er,ry:er*.18,fill:'none',stroke:'#FFEB3B','stroke-width':1.5,opacity:.7,transform:`rotate(${f2(tilt*180/Math.PI)})`},G);
    const setN=(sx,sy)=>{const a=Math.atan2(sy,sx);night.setAttribute('d',`M${f2(Math.cos(a+Math.PI/2)*er)},${f2(Math.sin(a+Math.PI/2)*er)} A${er},${er} 0 0 1 ${f2(Math.cos(a-Math.PI/2)*er)},${f2(Math.sin(a-Math.PI/2)*er)}Z`)};return {G,setN}};
  const M=[[Math.PI,U('21-iyun: Shimolda yoz','21 June: northern summer')],[1.5*Math.PI,U('23-sentabr: tengkunlik','23 Sep: equinox')],[0,U('22-dekabr: Shimolda qish','22 Dec: northern winter')],[.5*Math.PI,U('20-mart: tengkunlik','20 Mar: equinox')]];
  M.forEach(([a,s])=>{const [x,y]=pos(a);const e=drawEarth(g,x,y,.75);e.G.setAttribute('opacity',.55);e.setN(cx-x,cy-y);txt(g,T(s),x,y+(y>cy?84:-70),{size:22,color:'dim',weight:600})});
  const me=drawEarth(g,0,0,1);const info=txt(g,'',cx,860,{size:26,color:'a2'});txt(g,T(U('Fasllar masofadan emas, o‘q og‘ishidan. Yer Quyoshga yanvarda eng yaqin.','Seasons come from the tilt, not distance. Earth is closest to the Sun in January.')),cx,40,{size:22,color:'dim',weight:600});
  const ST={p:pos(Math.PI)};Object.assign(A,{sunS:{el:sun,fx:.5,fy:0},earthS:()=>ST.p,orbitS:[cx+rx*.7,cy+ry*.72],axisS:()=>[ST.p[0]+Math.sin(tilt)*(er+20),ST.p[1]-Math.cos(tilt)*(er+20)]});
  return {anchors:A,core:['sunS','earthS','orbitS'],update(lt,p,st){const f=((lt-st)/TT%1+1)%1;const a=Math.PI+f*TAU;const [x,y]=pos(a);ST.p=[x,y];me.G.setAttribute('transform',`translate(${f2(x)} ${f2(y)})`);me.setN(cx-x,cy-y);
    const lam=(a-.5*Math.PI);const dec=23.44*Math.sin(lam);const d=Math.round(((f*365.25)+172)%365.25);
    const q=Math.floor(f*4)%4,MU=['yanvar','fevral','mart','aprel','may','iyun','iyul','avgust','sentabr','oktabr','noyabr','dekabr'],ME=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],ML=[31,28,31,30,31,30,31,31,30,31,30,31];let dd=d,mo=0;while(mo<11&&dd>=ML[mo]){dd-=ML[mo];mo++}
    const SU=['Shimolda yoz · Janubda qish','Shimolda kuz · Janubda bahor','Shimolda qish · Janubda yoz','Shimolda bahor · Janubda kuz'],SE=['N summer · S winter','N autumn · S spring','N winter · S summer','N spring · S autumn'];
    info.textContent=T(U(`≈${dd+1}-${MU[mo]}  ·  Quyosh tik tushadigan kenglik: ${Math.abs(dec).toFixed(1)}° ${dec>=0?'Sh':'J'}  ·  ${SU[q]}`,`≈${ME[mo]} ${dd+1}  ·  Sub-solar latitude: ${Math.abs(dec).toFixed(1)}° ${dec>=0?'N':'S'}  ·  ${SE[q]}`))}}});
/* ---------- MOON PHASES (illuminated fraction = (1 − cos e)/2) ---------- */
SM.items.moonphases=preset(1700,900,(g,it)=>{const A={},ex=1020,ey=450,R=290,TT=it.cycle||14,mr=34;
  for(let i=0;i<7;i++)el('line',{x1:1690,y1:150+i*100,x2:1390,y2:150+i*100,stroke:'#FFE082','stroke-width':3,opacity:.35,'marker-end':arrowMarker('#FFE082')},g);
  txt(g,T(U('Quyosh nuri →','Sunlight →')).replace('→','←'),1540,120,{size:22,color:'#FFE082'});
  el('circle',{cx:ex,cy:ey,r:R,fill:'none',stroke:TH.dim,'stroke-width':2,'stroke-dasharray':'8 8'},g);
  const earth=el('circle',{cx:ex,cy:ey,r:70,fill:vol('#1E88E5')},g);el('path',{d:`M${ex},${ey-70} A70,70 0 0 0 ${ex},${ey+70}Z`,fill:'#000',opacity:.5},g);
  const moonAt=(par,x,y)=>{const G=el('g',{transform:`translate(${f2(x)} ${f2(y)})`},par);el('circle',{r:mr,fill:'#ECEFF1'},G);el('path',{d:`M0,${-mr} A${mr},${mr} 0 0 0 0,${mr}Z`,fill:'#263238',opacity:.85},G);return G};
  for(let i=0;i<8;i++){const a=i/8*TAU;moonAt(g,ex+Math.cos(a)*R,ey-Math.sin(a)*R).setAttribute('opacity',.35)}
  const mm=moonAt(g,0,0);const vx=290,vy=450,vr=160;el('circle',{cx:vx,cy:vy,r:vr+6,fill:'none',stroke:TH.faint,'stroke-width':2},g);el('circle',{cx:vx,cy:vy,r:vr,fill:'#263238'},g);const lit=el('path',{fill:'#ECEFF1'},g);
  const pn=txt(g,'',vx,vy+vr+60,{size:30,color:'a2'}),dn=txt(g,'',vx,vy+vr+100,{size:22,color:'dim',weight:600});txt(g,T(U('Yerdan ko‘rinishi (Shimoliy yarimshar)','View from Earth (northern hemisphere)')),vx,vy-vr-30,{size:22,color:'dim',weight:600});
  const PH=[U('Yangi oy','New moon'),U('O‘sayotgan o‘roq','Waxing crescent'),U('Birinchi chorak','First quarter'),U('O‘sayotgan qavariq','Waxing gibbous'),U('To‘lin oy','Full moon'),U('Kamayayotgan qavariq','Waning gibbous'),U('Oxirgi chorak','Last quarter'),U('Kamayayotgan o‘roq','Waning crescent')];
  const ST={m:[ex+R,ey]};Object.assign(A,{earthS:{el:earth,fx:.5,fy:1},moonS:()=>ST.m,orbitS:[ex+R*.924,ey+R*.383]});
  return {anchors:A,labelLayout:'side',sides:{moonS:'right',orbitS:'right',earthS:'right'},update(lt,p,st){const f=((lt-st)/TT%1+1)%1,e=f*TAU;const x=ex+Math.cos(e)*R,y=ey-Math.sin(e)*R;ST.m=[x,y-mr];mm.setAttribute('transform',`translate(${f2(x)} ${f2(y)})`);
    const k=Math.cos(e),wax=e<Math.PI,rxT=Math.abs(k)*vr,cres=k>0;// k>0 → crescent (e<90° or e>270°)
    const top=`${vx},${vy-vr}`,bot=`${vx},${vy+vr}`;const outer=`M${top} A${vr},${vr} 0 0 ${wax?1:0} ${bot}`;const term=` A${f2(rxT)},${vr} 0 0 ${wax?(cres?0:1):(cres?1:0)} ${top}Z`;lit.setAttribute('d',outer+term);
    pn.textContent=T(PH[Math.round(f*8)%8]);dn.textContent=T(U(`${(f*29.53).toFixed(1)}-kun · yoritilgan ${Math.round((1-k)/2*100)}%`,`day ${(f*29.53).toFixed(1)} · ${Math.round((1-k)/2*100)}% lit`))}}});
/* ---------- ECLIPSE (exact tangent cones; sizes not to scale) ---------- */
SM.items.eclipse=preset(1700,800,(g,it)=>{const k=it.kind||'solar',A={};if(!['solar','lunar'].includes(k))SERR.push(`eclipse: kind "${k}" → solar, lunar`);
  const S={x:-60,y:400,r:260};const solar=k==='solar';const Oc=solar?{x:1100,y:400,r:38}:{x:1000,y:400,r:120};const Tg=solar?{x:1415,y:400,r:120}:{x:1460,y:400,r:33};
  const um=el('path',{fill:'#000',opacity:.55},g),pe=el('path',{fill:'#000',opacity:.25},g);
  el('circle',{cx:S.x,cy:S.y,r:S.r+40,fill:'#FFB300',opacity:.3,filter:'url(#blur24)'},g);const sun=el('circle',{cx:S.x,cy:S.y,r:S.r,fill:vol('#FFC107')},g);
  const tgt=el('circle',{cx:Tg.x,cy:Tg.y,r:Tg.r,fill:solar?vol('#1E88E5'):vol('#CFD8DC')},g);const occ=el('circle',{r:Oc.r,fill:solar?vol('#B0BEC5'):vol('#1E88E5')},g);
  const spot=el('ellipse',{fill:'#000',opacity:.8},g);txt(g,T(U('Masshtab saqlanmagan','Not to scale')),850,760,{size:22,color:'dim',weight:600});
  const cones=(O)=>{const dx=O.x-S.x,dy=O.y-S.y,d=Math.hypot(dx,dy),u=[dx/d,dy/d],v=[-u[1],u[0]];const P=(a,b)=>[S.x+u[0]*a+v[0]*b,S.y+u[1]*a+v[1]*b];
    const sa=(S.r-O.r)/d,ca=Math.sqrt(1-sa*sa),apex=d+O.r/sa;const tS=s=>P(S.r*sa,s*S.r*ca),tO=s=>P(d+O.r*sa,s*O.r*ca);
    const sg=(S.r+O.r)/d,cg=Math.sqrt(1-sg*sg);const iS=s=>P(S.r*sg,s*S.r*cg),iO=s=>P(d-O.r*sg,-s*O.r*cg);const far=2000;const ext=(a,b,L)=>{const ux=b[0]-a[0],uy=b[1]-a[1],l=Math.hypot(ux,uy);return [a[0]+ux/l*L,a[1]+uy/l*L]};
    const ap=P(apex,0);const umb=`M${tO(1).map(f2)} L${(apex<far?ap:ext(tS(1),tO(1),far)).map(f2)} L${tO(-1).map(f2)}Z`;
    const pen=`M${iO(1).map(f2)} L${ext(iS(1),iO(1),far).map(f2)} L${ext(iS(-1),iO(-1),far).map(f2)} L${iO(-1).map(f2)}Z`;return {umb,pen,apex,u,v,d}};
  const ST={o:[Oc.x,Oc.y]};Object.assign(A,{sunS:{el:sun,fx:.85,fy:.2},[solar?'moonS':'earthS']:{el:occ,fx:.5,fy:0},[solar?'earthS':'moonS']:{el:tgt,fx:.5,fy:1},umbra:()=>solar?[Tg.x-Tg.r+6,ST.o[1]]:[Oc.x+260,Oc.y],penumbra:()=>[solar?1240:1300,ST.o[1]+(solar?60:150)]});
  return {anchors:A,update(lt,p,st){const f=Math.sin(((lt-st)/(it.cycle||10))*TAU)*.5;const oy=solar?400+f*120:400;const ty=solar?400:400+f*200;const O={...Oc,y:oy};ST.o=[O.x,oy];at(occ,{cx:O.x,cy:f2(oy)});at(tgt,{cy:f2(ty)});
    const c=cones(O);um.setAttribute('d',c.umb);pe.setAttribute('d',c.pen);
    if(solar){const yHit=oy+(Tg.x-Tg.r-O.x)*c.u[1]/c.u[0];const inside=Math.abs(yHit-400)<Tg.r-6;at(spot,{cx:Tg.x-Tg.r+8,cy:f2(yHit),rx:6,ry:10,opacity:inside?.8:0})}
    else{const rU=O.r*(c.apex-(Tg.x-O.x))/c.apex;const dd=Math.abs(ty-400);tgt.setAttribute('fill',dd<rU-Tg.r?'#B23A1E':dd<rU+Tg.r?'#8D6E63':'#CFD8DC');at(spot,{opacity:0})}}}});
/* ---------- SOLAR SYSTEM (order & period ratios real; distances & sizes compressed) ---------- */
SM.items.solarsystem=preset(1800,860,(g,it)=>{const A={},cx=900,cy=430,YR=it.year||5;
  const PL=[[U('Merkuriy','Mercury'),.241,'#B0A79F',7],[U('Venera','Venus'),.615,'#E8C27A',11],[U('Yer','Earth'),1,'#3D8BEA',12],[U('Mars','Mars'),1.881,'#D2553A',9],[U('Yupiter','Jupiter'),11.86,'#D8B48A',26],[U('Saturn','Saturn'),29.46,'#E3D3A4',22],[U('Uran','Uranus'),84.01,'#9FE3E8',16],[U('Neptun','Neptune'),164.8,'#3F66D6',16]];
  const rxs=[150,205,260,315,470,590,700,805];const k=.45;
  rxs.forEach(r=>el('ellipse',{cx,cy,rx:r,ry:r*k,fill:'none',stroke:TH.faint,'stroke-width':2},g));
  const belt=[...Array(140)].map((_,i)=>{const a=seeded(i,1)*TAU,r=350+seeded(i,2)*55;return el('circle',{cx:f2(cx+Math.cos(a)*r),cy:f2(cy+Math.sin(a)*r*k),r:2,fill:'#9E9E9E',opacity:.7},g)});
  el('circle',{cx,cy,r:90,fill:'#FFB300',opacity:.35,filter:'url(#blur24)'},g);const sun=el('circle',{cx,cy,r:46,fill:vol('#FFC107')},g);
  const P=PL.map(([n,T0,c,r],i)=>{const G=el('g',{},g);el('circle',{r,fill:vol(c)},G);if(i===5)el('ellipse',{rx:r*2,ry:r*.6,fill:'none',stroke:'#E3D3A4','stroke-width':4},G);const t=txt(G,T(n),0,-r-10,{size:20,color:'ink',weight:700});return {G,t,T0,i,a0:seeded(i,9)*TAU}});
  txt(g,T(U('Tartib va aylanish davrlari nisbati haqiqiy · masofa va o‘lchamlar masshtabda emas','Order and period ratios are real · distances and sizes not to scale')),cx,830,{size:22,color:'dim',weight:600});
  Object.assign(A,{sunS:{el:sun,fx:.5,fy:0},beltA:belt[20]});
  return {anchors:A,core:['sunS','beltA'],update(lt){P.forEach(o=>{const a=o.a0+lt/YR/o.T0*TAU;const X=cx+Math.cos(a)*rxs[o.i],Y=cy-Math.sin(a)*rxs[o.i]*k;at(o.G,{transform:`translate(${f2(X)} ${f2(Y)})`});const behind=Math.sin(a)>0&&Math.abs(X-cx)<70;o.t.setAttribute('opacity',Math.hypot(X-cx,Y-28-cy)<75?0:1);o.G.setAttribute('opacity',behind&&Math.abs(X-cx)<46?0.25:1)})}}});
/* ---------- STATES OF MATTER (heating curve of water: c_ice 2.1, L_f 334, c_w 4.18, L_v 2257, c_steam 2.0 J/(g·K)) ---------- */
KIT.names(NAMES.uz,{solidB:'Qattiq holat',liquidB:'Suyuq holat',gasB:'Gaz holat',vessel:'Yopiq idish (zarralar modeli)',curve:'Isish egri chizig‘i'});
KIT.names(NAMES.en,{solidB:'Solid',liquidB:'Liquid',gasB:'Gas',vessel:'Sealed vessel (particle model)',curve:'Heating curve'});
SM.items.statesofmatter=preset(1700,900,(g,it)=>{const k=it.kind||'heating',A={},N=30,pr=17;if(!['heating','compare'].includes(k))SERR.push(`statesofmatter: kind "${k}" → heating, compare`);
  const lat=(i,ox,oy,s=44)=>{const c=i%6,r=Math.floor(i/6);return [ox+(c-2.5)*s,oy-r*s]};
  const solidP=(i,lt,ox,oy,amp)=>{const [x,y]=lat(i,ox,oy);return [x+amp*Math.sin(lt*23+i*1.9),y+amp*Math.cos(lt*19+i*2.7)]};
  const liquidP=(i,lt,ox,oy)=>{const c=i%6,r=Math.floor(i/6);return [ox+(c-2.5)*50+26*Math.sin(lt*.8*(1+(i%3)*.35)+i*1.7),oy-r*40+10*Math.sin(lt*1.3+i*2.3)]};
  const gasP=(i,lt,x0,y0,w,h,sp)=>[x0+pr+tri(sp*(90+(i*37)%70)*lt+i*131,w-2*pr),y0+pr+tri(sp*(80+(i*53)%60)*lt+i*71,h-2*pr)];
  const mk=(par)=>[...Array(N)].map((_,i)=>el('circle',{r:pr,fill:vol(i%7===3?'#4FC3F7':'#29B6F6')},par));
  if(k==='compare'){const B=[[60,'solidB'],[610,'liquidB'],[1160,'gasB']],bw=480,by=220,bh=480;const P=[];
    B.forEach(([x,n],j)=>{el('rect',{x,y:by,width:bw,height:bh,rx:16,fill:'#0D1B2A',stroke:TH.dim,'stroke-width':3},g);P.push(mk(g));A[n]={el:P[j][j===2?7:14]};});
    [[560,U('erish ⇄ qotish','melting ⇄ freezing')],[1110,U('qaynash ⇄ kondensatsiya','boiling ⇄ condensation')]].forEach(([x,s])=>{el('path',{d:`M${x-30},${by+bh/2} L${x+30},${by+bh/2}`,stroke:TH.ink,'stroke-width':4,'marker-end':arrowMarker('ink'),'marker-start':arrowMarker('ink')},g);txt(g,T(s),x,by+bh+60,{size:22,color:'dim',weight:600})});
    txt(g,T(U('Qizdirilsa zarralar tezroq harakatlanadi; bog‘lanishlar uziladi','Heating makes particles move faster and breaks the bonds between them')),850,150,{size:24,color:'dim',weight:600});
    const R={anchors:A,labelLayout:'tb',sides:{solidB:'top',liquidB:'top',gasB:'top'},update(lt){P[0].forEach((c,i)=>{const [x,y]=solidP(i,lt,300,by+bh-40,2.5);at(c,{cx:f2(x),cy:f2(y)})});P[1].forEach((c,i)=>{const [x,y]=liquidP(i,lt,850,by+bh-40);at(c,{cx:f2(x),cy:f2(y)})});P[2].forEach((c,i)=>{const [x,y]=gasP(i,lt,1160,by,bw,bh,1.6);at(c,{cx:f2(x),cy:f2(y)})})}};R.update(0);return R}
  // ---- heating curve ----
  const cx0=110,cx1=960,cy0=170,cy1=700,Tm=-20,TM=120,ty=T0=>cy1-(T0-Tm)/(TM-Tm)*(cy1-cy0);
  const SEG=[[42,-20,0],[334,0,0],[418,0,100],[600,100,100],[40,100,120]],tot=SEG.reduce((s,a)=>s+a[0],0),sx=(cx1-cx0)/tot;const X=[cx0];SEG.forEach(s=>X.push(X[X.length-1]+s[0]*sx));
  el('line',{x1:cx0,y1:cy1,x2:cx1+20,y2:cy1,stroke:TH.dim,'stroke-width':2,'marker-end':arrowMarker('dim')},g);el('line',{x1:cx0,y1:cy1,x2:cx0,y2:cy0-30,stroke:TH.dim,'stroke-width':2,'marker-end':arrowMarker('dim')},g);
  [-20,0,50,100,120].forEach(v=>{el('line',{x1:cx0-8,y1:ty(v),x2:cx1,y2:ty(v),stroke:TH.faint,'stroke-width':1,'stroke-dasharray':v===0||v===100?'6 6':'2 8'},g);txt(g,`${v}`,cx0-38,ty(v)+8,{size:20,color:'dim',weight:600})});
  txt(g,T(U('T, °C','T, °C')),cx0,cy0-44,{size:22,color:'dim',weight:600});txt(g,T(U('berilgan issiqlik (vaqt) →','heat supplied (time) →')),(cx0+cx1)/2,cy1+44,{size:22,color:'dim',weight:600});
  const curve=el('path',{d:`M${X.map((x,i)=>`${f2(x)},${f2(ty(i<5?SEG[i][1]:120))}`).join(' L')}`,fill:'none',stroke:TH.a1,'stroke-width':5,'stroke-linejoin':'round'},g);
  const bx=(X[3]+X[4])/2;el('path',{d:`M${bx-14},${ty(100)+16} l10,-32 M${bx+2},${ty(100)+16} l10,-32`,stroke:TH.ink,'stroke-width':3},g);
  txt(g,T(U('o‘q uzilgan: bug‘lanish issiqligi 2257 J/g ≈ erishnikidan 6,8 marta ko‘p','axis broken: heat of vaporisation 2257 J/g ≈ 6.8 × heat of fusion')),(cx0+cx1)/2,cy1+84,{size:20,color:'dim',weight:600});
  const dot=el('circle',{r:12,fill:TH.a2,stroke:'#fff','stroke-width':3},g);
  const vx=1080,vy=170,vw=480,vh=430;el('rect',{x:vx-14,y:vy-14,width:vw+28,height:vh+28,rx:20,fill:'none',stroke:'#B0BEC5','stroke-width':8},g);const ves=el('rect',{x:vx,y:vy,width:vw,height:vh,rx:10,fill:'#0D1B2A'},g);
  const liq=el('rect',{x:vx,width:vw,fill:'#1565C0',opacity:0},g);const P=mk(g);const bub=[...Array(8)].map(()=>el('circle',{r:9,fill:'none',stroke:'#E3F2FD','stroke-width':2.5,opacity:0},g));
  const hg=el('rect',{x:vx-20,y:vy+vh+40,width:vw+40,height:40,rx:10,fill:'#FF5722'},g);const glow=el('rect',{x:vx,y:vy+vh+22,width:vw,height:20,fill:'#FF9800',filter:'url(#blur24)',opacity:.6},g);
  const tT=txt(g,'',vx+vw/2,vy+vh+130,{size:30,color:'a2'}),tP=txt(g,'',vx+vw/2,vy+vh+170,{size:22,color:'dim',weight:600});
  const PHN=[U('Muz isiyapti (zarralar tebranishi kuchayadi)','Ice warming (vibrations grow)'),U('Erish: 0 °C da harorat o‘zgarmaydi','Melting: temperature stays at 0 °C'),U('Suv isiyapti','Water warming'),U('Qaynash: 100 °C da harorat o‘zgarmaydi','Boiling: temperature stays at 100 °C'),U('Bug‘ isiyapti','Steam warming')];
  const rank=[...Array(N).keys()].sort((a,b)=>Math.floor(b/6)-Math.floor(a/6)||a-b),rk=[];rank.forEach((v,j)=>rk[v]=j);
  const ST={dot:[X[0],ty(-20)]};Object.assign(A,{melt:[(X[1]+X[2])/2,ty(0)],boil:[(X[3]+X[4])/2-40,ty(100)],heater:{el:hg,fx:.5,fy:1},vessel:{el:ves,fx:1,fy:.3},curve:[(X[2]+X[3])/2,ty(50)]});
  const TT=it.cycle||18;
  const R={anchors:A,core:['melt','boil','heater','vessel'],sides:{melt:'top',boil:'top',heater:'bottom',vessel:'top',curve:'bottom'},update(lt,p,st){const q=Math.min(1,(((lt-st)%(TT+2))+(TT+2))%(TT+2)/TT);const xx=cx0+q*(cx1-cx0);
    let s=0;while(s<4&&xx>X[s+1])s++;const u=Math.max(0,Math.min(1,(xx-X[s])/(X[s+1]-X[s])));const Tc=lerp(SEG[s][1],SEG[s][2],u);ST.dot=[xx,ty(Tc)];at(dot,{cx:f2(xx),cy:f2(ty(Tc))});
    const m=s<1?0:s>1?1:u,b=s<3?0:s>3?1:u;const amp=1.2+3*(Math.min(Tc,0)+20)/20;const sp=.9*Math.sqrt((Tc+273)/373);
    P.forEach((c,i)=>{const wl=Math.max(0,Math.min(1,(m*N-rk[i])/1.5)),wg=Math.max(0,Math.min(1,(b*N-rk[i])/1.5));const S=solidP(i,lt,vx+vw/2,vy+vh-30,amp),L=liquidP(i,lt,vx+vw/2,vy+vh-30),G=gasP(i,lt,vx,vy,vw,vh,sp);
      const x=lerp(lerp(S[0],L[0],wl),G[0],wg),y=lerp(lerp(S[1],L[1],wl),G[1],wg);at(c,{cx:f2(x),cy:f2(y)})});
    const lvl=vh*(.5*(1-b));at(liq,{y:f2(vy+vh-lvl),height:f2(lvl),opacity:f2(.25*Math.min(1,m*1.2)*(1-b))});
    bub.forEach((c,i)=>{const qq=(lt*.7+i/8)%1,on=(s===3)||(s===2&&u>.9);at(c,{cx:f2(vx+40+(i*61)%(vw-80)),cy:f2(vy+vh-10-qq*lvl*.9),opacity:f2(on?Math.sin(Math.PI*qq)*.9:0)})});
    at(glow,{opacity:f2(.45+.2*Math.sin(lt*6))});tT.textContent=`T = ${Tc.toFixed(0)} °C`;tP.textContent=T(PHN[s])}};R.update(0,0,0);return R});
/* ---------- PHOTOSYNTHESIS (6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂; O₂ comes from water) ---------- */
SM.items.photosynthesis=preset(1700,900,(g,it)=>{const A={},TT=it.cycle||8;const qb=(a,c,b,t)=>[(1-t)*(1-t)*a[0]+2*(1-t)*t*c[0]+t*t*b[0],(1-t)*(1-t)*a[1]+2*(1-t)*t*c[1]+t*t*b[1]];
  const cx=860,cy=470;el('ellipse',{cx,cy,rx:700,ry:300,fill:'#1B5E20',opacity:.35,stroke:'#81C784','stroke-width':5},g);el('ellipse',{cx,cy,rx:684,ry:284,fill:'#2E7D32',opacity:.35,stroke:'#A5D6A7','stroke-width':3},g);
  txt(g,T(U('Stroma','Stroma')),1180,250,{size:22,color:'#C8E6C9',weight:600});
  const grana=[[420,500],[600,440],[780,500]];let disc=null;el('path',{d:`M420,470 L600,410 L780,470`,fill:'none',stroke:'#66BB6A','stroke-width':10},g);
  grana.forEach(([x,y],j)=>{for(let i=0;i<6;i++){const d=el('rect',{x:x-80,y:y-i*26,width:160,height:22,rx:11,fill:vol('#43A047'),stroke:'#A5D6A7','stroke-width':2},g);if(j===1&&i===3)disc=d}});
  const kx=1200,ky=480,kr=140;el('circle',{cx:kx,cy:ky,r:kr,fill:'none',stroke:'#FFE082','stroke-width':6,'stroke-dasharray':'30 16'},g);const kc=el('circle',{cx:kx,cy:ky,r:kr,fill:'none',stroke:'none'},g);
  const rot=el('g',{},g);for(let i=0;i<3;i++){const a=i*TAU/3;el('path',{d:`M${f2(kx+Math.cos(a)*kr)},${f2(ky+Math.sin(a)*kr)} l${f2(-Math.sin(a)*1)},${f2(Math.cos(a)*1)}`,stroke:'#FFE082','stroke-width':6,'marker-end':arrowMarker('#FFE082')},rot)}
  txt(g,T(U('Kalvin sikli','Calvin cycle')),kx,ky-6,{size:26,color:'#FFE082'});txt(g,T(U('CO₂ fiksatsiyasi (RuBisCO)','CO₂ fixation (RuBisCO)')),kx,ky+26,{size:18,color:'#FFF8E1',weight:600});
  const sun=el('circle',{cx:110,cy:100,r:60,fill:'#FFD54F',filter:'url(#glowS)'},g);
  const rays=[0,1,2].map(i=>el('path',{d:`M${170+i*40},${130+i*30} q40,40 80,40 t80,40 t80,40 t80,40`,fill:'none',stroke:'#FFEE58','stroke-width':5,'marker-end':arrowMarker('#FFEE58'),'stroke-dasharray':'16 10'},g));
  const PATHS={w:[[60,880],[300,760],[560,520]],o:[[560,420],[420,200],[300,40]],c:[[1660,110],[1450,220],[1240,350]],gl:[[1300,600],[1480,760],[1660,850]],atp:[[700,400],[900,330],[1080,400]],adp:[[1080,560],[900,640],[700,560]]};
  Object.entries(PATHS).forEach(([n,[a,c,b]])=>el('path',{d:`M${a} Q${c} ${b}`,fill:'none',stroke:'#fff','stroke-width':2,opacity:.25,'stroke-dasharray':'4 8'},g));
  const tok=(lab,col,n)=>[...Array(n)].map(()=>{const G=el('g',{opacity:0},g);el('rect',{x:-44,y:-20,width:88,height:40,rx:20,fill:col},G);txt(G,lab,0,8,{size:20,color:'#102027'});return G});
  const TK={w:tok('H₂O','#81D4FA',3),o:tok('O₂','#E1F5FE',3),c:tok('CO₂','#CFD8DC',3),gl:tok('C₆H₁₂O₆','#FFCC80',1),atp:tok('ATP','#FFF176',2),adp:tok('ADP','#BDBDBD',2)};
  TK.gl.forEach(G=>{G.firstChild.setAttribute('x',-70);G.firstChild.setAttribute('width',140)});TK.atp.forEach(G=>{G.firstChild.setAttribute('x',-74);G.firstChild.setAttribute('width',148);G.lastChild.textContent='ATP+NADPH'});TK.adp.forEach(G=>{G.firstChild.setAttribute('x',-74);G.firstChild.setAttribute('width',148);G.lastChild.textContent='ADP+NADP⁺'});
  txt(g,'6CO₂ + 6H₂O  —(yorug‘lik, xlorofill)→  C₆H₁₂O₆ + 6O₂'.replace('yorug‘lik, xlorofill',T(U('yorug‘lik, xlorofill','light, chlorophyll'))),cx,860,{size:28,color:'ink'});
  txt(g,T(U('Ajralgan O₂ suvdan keladi (CO₂ dan emas)','The O₂ released comes from water, not from CO₂')),1180,60,{size:20,color:'dim',weight:600});
  const pt=(n,t)=>{const [a,c,b]=PATHS[n];return qb(a,c,b,t)};
  Object.assign(A,{lightIn:{el:rays[0]},water:pt('w',.35),oxygen:pt('o',.6),co2:pt('c',.4),glucose:pt('gl',.6),thylakoid:{el:disc,fx:0,fy:.5},calvin:{el:kc,fx:1,fy:.5},atp:pt('atp',.5)});
  const R={anchors:A,core:['lightIn','water','oxygen','co2','glucose','thylakoid','calvin','atp'],update(lt){rot.setAttribute('transform',`rotate(${f2(lt*30)} ${kx} ${ky})`);rays.forEach(r=>r.setAttribute('stroke-dashoffset',f2(-lt*60)));
    Object.entries(TK).forEach(([n,arr])=>arr.forEach((G,i)=>{const q=((lt/TT)*(n==='gl'?.6:1)+i/arr.length)%1;const [x,y]=pt(n,q);at(G,{transform:`translate(${f2(x)} ${f2(y)})`,opacity:f2(Math.min(1,Math.sin(Math.PI*q)*2))})}))}};R.update(0);return R});
/* ---------- ELECTROMAGNETIC INDUCTION (ε = −N·dΦ/dt; Lenz) ---------- */
SM.items.induction=preset(1700,900,(g,it)=>{const A={},TT=it.cycle||6,cyM=300,coil0=900,coil1=1290,ccx=(coil0+coil1)/2,cr=110;
  const xc=t=>520-230*Math.cos(TAU*t/TT),a=230,Phi=t=>{const D=ccx-xc(t);return 1/Math.pow(1+(D/a)*(D/a),1.5)};const EM=t=>-(Phi(t+.005)-Phi(t-.005))/.01;
  let em=0;for(let t=0;t<TT;t+=TT/400)em=Math.max(em,Math.abs(EM(t)));const pm=Phi(TT/2),p0=Phi(0);
  const mg=el('g',{},g);[[80,'#90CAF9'],[150,'#90CAF9'],[230,'#90CAF9']].forEach(([h],i)=>{[1,-1].forEach(sg=>el('path',{d:`M150,0 C${300+i*60},${-sg*h} ${-300-i*60},${-sg*h} -150,0`,fill:'none',stroke:'#90CAF9','stroke-width':2.5,opacity:.55,'stroke-dasharray':'10 8'},mg))});
  el('path',{d:'M150,0 L520,0',stroke:'#90CAF9','stroke-width':2.5,opacity:.55,'stroke-dasharray':'10 8','marker-end':arrowMarker('#90CAF9')},mg);const fl=mg.childNodes[1];
  const mag=el('g',{},mg);el('rect',{x:-150,y:-40,width:150,height:80,fill:'#1E88E5'},mag);el('rect',{x:0,y:-40,width:150,height:80,fill:'#E53935'},mag);txt(mag,'S',-75,12,{size:36,color:'#fff'});txt(mag,'N',75,12,{size:36,color:'#fff'});
  const turns=10;for(let i=0;i<turns;i++){const x=coil0+20+i*(coil1-coil0-40)/(turns-1);el('path',{d:`M${x},${cyM-cr} A18,${cr} 0 0 0 ${x},${cyM+cr}`,fill:'none',stroke:'#8D6E63','stroke-width':6},g)}
  for(let i=0;i<turns;i++){const x=coil0+20+i*(coil1-coil0-40)/(turns-1);el('path',{d:`M${x},${cyM-cr} A18,${cr} 0 0 1 ${x},${cyM+cr}`,fill:'none',stroke:'#E0A060','stroke-width':8},g)}
  const coilHit=el('rect',{x:coil0,y:cyM-cr,width:coil1-coil0,height:2*cr,fill:'none'},g);
  const gx=1095,gy=700,gr=95;const wire=`M${coil0+20},${cyM+cr} L${coil0+20},${gy} L${gx-gr},${gy} M${gx+gr},${gy} L${coil1-20},${gy} L${coil1-20},${cyM+cr}`;el('path',{d:wire,fill:'none',stroke:'#B87333','stroke-width':6},g);
  const flow=el('path',{d:wire,fill:'none',stroke:'#FFEB3B','stroke-width':6,'stroke-dasharray':'6 26','stroke-linecap':'round'},g);
  const gv=el('circle',{cx:gx,cy:gy,r:gr,fill:'#ECEFF1',stroke:'#546E7A','stroke-width':6},g);for(let i=-4;i<=4;i++){const an=i*12*Math.PI/180;el('line',{x1:f2(gx+Math.sin(an)*68),y1:f2(gy+30-Math.cos(an)*68),x2:f2(gx+Math.sin(an)*80),y2:f2(gy+30-Math.cos(an)*80),stroke:'#37474F','stroke-width':i?2:4},g)}
  txt(g,'0',gx,gy-58,{size:18,color:'#37474F'});txt(g,'G',gx,gy+62,{size:24,color:'#37474F'});const ndl=el('line',{x1:gx,y1:gy+30,x2:gx,y2:gy-46,stroke:'#D32F2F','stroke-width':4,'stroke-linecap':'round'},g);el('circle',{cx:gx,cy:gy+30,r:7,fill:'#37474F'},g);
  const pole=txt(g,'',coil0-30,cyM-cr-20,{size:34,color:'#fff'});
  const c0=80,c1=760,ch=[[560,660],[730,850]];const tX=t=>c0+t/TT*(c1-c0);
  const pc=el('path',{fill:'none',stroke:'#4FC3F7','stroke-width':4},g),ec=el('path',{fill:'none',stroke:'#FFA726','stroke-width':4},g);let dp='',de='';for(let i=0;i<=200;i++){const t=i/200*TT;dp+=(i?' L':'M')+f2(tX(t))+','+f2(ch[0][1]-(Phi(t)-p0)/(pm-p0)*(ch[0][1]-ch[0][0]));de+=(i?' L':'M')+f2(tX(t))+','+f2((ch[1][0]+ch[1][1])/2-EM(t)/em*(ch[1][1]-ch[1][0])/2)}pc.setAttribute('d',dp);ec.setAttribute('d',de);
  el('line',{x1:c0,y1:(ch[1][0]+ch[1][1])/2,x2:c1,y2:(ch[1][0]+ch[1][1])/2,stroke:TH.faint,'stroke-width':2},g);el('line',{x1:c0,y1:ch[0][1],x2:c1,y2:ch[0][1],stroke:TH.faint,'stroke-width':2},g);
  txt(g,'Φ',c0-30,ch[0][0]+30,{size:26,color:'#4FC3F7'});txt(g,'ε = −N·ΔΦ/Δt',c0+90,ch[1][0]-6,{size:22,color:'#FFA726'});const cur=el('line',{y1:ch[0][0]-10,y2:ch[1][1],stroke:'#fff','stroke-width':2,opacity:.7},g);
  txt(g,T(U('Magnit yaqinlashsa — g‘altak uchi N (itaradi), uzoqlashsa — S (tortadi): Lens qoidasi','Approaching magnet → near coil face becomes N (repels); receding → S (attracts): Lenz’s law')),850,60,{size:22,color:'dim',weight:600});
  const ST={x:xc(0)};Object.assign(A,{magnet:()=>[ST.x,cyM-40],coil:{el:coilHit,fx:.6,fy:0},galv:{el:gv,fx:1,fy:.5},fieldL:{el:fl},current:[coil1-20,gy-90]});
  const R={anchors:A,core:['magnet','coil','galv','current'],sides:{magnet:'top',coil:'top',galv:'right',current:'right',fieldL:'top'},update(lt,p,st){const t=((lt-st)%TT+TT)%TT;const x=xc(t);ST.x=x;mg.setAttribute('transform',`translate(${f2(x)} ${cyM})`);
    const e=EM(t)/em;ndl.setAttribute('transform',`rotate(${f2(45*e)} ${gx} ${gy+30})`);flow.setAttribute('stroke-dashoffset',f2(-(Phi(t)-p0)/(pm-p0)*400));flow.setAttribute('opacity',f2(Math.min(1,Math.abs(e)*3)));
    pole.textContent=Math.abs(e)>.08?(e<0?'N':'S'):'';at(pole,{fill:e<0?'#EF5350':'#42A5F5',opacity:f2(Math.min(1,Math.abs(e)*2))});at(cur,{x1:f2(tX(t)),x2:f2(tX(t))})}};R.update(0,0,0);return R});
/* ---------- ATMOSPHERE LAYERS (US Standard Atmosphere 1976 temperature profile) ---------- */
KIT.names(NAMES.uz,{tropo:'Troposfera (0–12 km): ob-havo',strato:'Stratosfera (12–50 km)',meso:'Mezosfera (50–85 km): meteorlar yonadi',thermo:'Termosfera (85 km dan yuqori): qutb yog‘dusi',ozone:'Ozon qatlami (15–35 km)',karman:'Karman chizig‘i (100 km)',profile:'Harorat profili',plane:'Samolyot (~11 km)',everest:'Everest (8,8 km)',balloon:'Meteozond (~35 km gacha)'});
KIT.names(NAMES.en,{tropo:'Troposphere (0–12 km): weather',strato:'Stratosphere (12–50 km)',meso:'Mesosphere (50–85 km): meteors burn up',thermo:'Thermosphere (above 85 km): aurora',ozone:'Ozone layer (15–35 km)',karman:'Kármán line (100 km)',profile:'Temperature profile',plane:'Airliner (~11 km)',everest:'Everest (8.8 km)',balloon:'Weather balloon (up to ~35 km)'});
SM.items.atmosphere=preset(1260,900,(g,it)=>{const A={},x0=110,x1=760,y0=850,kmT=120,yk=h=>y0-h/kmT*(y0-90);
  const LY=[[0,12,'#4FC3F7','tropo'],[12,50,'#1E88E5','strato'],[50,85,'#283593','meso'],[85,120,'#1A0B3D','thermo']];
  LY.forEach(([a,b,c,n])=>{const r=el('rect',{x:x0,y:yk(b),width:x1-x0,height:yk(a)-yk(b),fill:c,opacity:.55},g);A[n]={el:r,fx:0,fy:.5}});
  const oz=el('rect',{x:x0,y:yk(35),width:x1-x0,height:yk(15)-yk(35),fill:'#B2FF59',opacity:.18},g);A.ozone={el:oz,fx:0,fy:.5};
  const km=el('line',{x1:x0,y1:yk(100),x2:x1,y2:yk(100),stroke:'#fff','stroke-width':2,'stroke-dasharray':'10 8',opacity:.8},g);A.karman={el:km,fx:0,fy:.5};
  for(let h=0;h<=120;h+=20){el('line',{x1:x0-10,y1:yk(h),x2:x0,y2:yk(h),stroke:TH.dim,'stroke-width':2},g);txt(g,`${h}`,x0-34,yk(h)+7,{size:20,color:'dim',weight:600})}txt(g,'km',x0-34,yk(120)-24,{size:20,color:'dim',weight:600});
  el('path',{d:`M${x0},${y0} L${x0+250},${yk(8.85)} L${x0+330},${yk(6)} L${x0+430},${y0}Z`,fill:'#6D4C41'},g);const ev=el('path',{d:`M${x0+225},${yk(7.6)} L${x0+250},${yk(8.85)} L${x0+275},${yk(7.6)}Z`,fill:'#fff'},g);A.everest={el:ev,fx:.5,fy:0};
  el('rect',{x:x0,y:y0,width:x1-x0,height:20,fill:'#2E7D32'},g);
  const cl=[...Array(4)].map((_,i)=>{const G=el('g',{},g);[[0,0,22],[24,4,18],[-22,5,16]].forEach(([dx,dy,r])=>el('circle',{cx:dx,cy:dy,r,fill:'#ECEFF1',opacity:.85},G));return G});
  const pl=el('g',{},g);el('path',{d:'M-30,0 L30,0 L38,-4 L30,-6 L-24,-6 Z M-4,-4 L-16,-18 L-8,-18 L10,-4Z M-26,-6 L-32,-16 L-26,-16 L-18,-6Z',fill:'#fff'},pl);
  const bal=el('g',{},g);el('circle',{r:14,fill:'#FAFAFA'},bal);el('line',{x1:0,y1:14,x2:0,y2:34,stroke:'#fff','stroke-width':1.5},bal);el('rect',{x:-5,y:34,width:10,height:8,fill:'#FFB74D'},bal);
  const met=[...Array(4)].map(()=>el('line',{stroke:'#FFE082','stroke-width':4,'stroke-linecap':'round'},g));
  const aur=[0,1].map(i=>el('path',{fill:'none',stroke:i?'#69F0AE':'#B388FF','stroke-width':16,opacity:.4,filter:'url(#blur24)'},g));
  // temperature profile
  const px0=860,px1=1230,tx=t=>px0+(t+100)/200*(px1-px0);const P=[[0,15],[11,-56.5],[20,-56.5],[32,-44.5],[47,-2.5],[51,-2.5],[71,-58.5],[85,-86.3],[95,-83],[100,-78],[110,-33],[120,87]];
  el('rect',{x:px0,y:yk(120),width:px1-px0,height:y0-yk(120),fill:'#0D1B2A',opacity:.6},g);[-100,-50,0,50,100].forEach(t=>{el('line',{x1:tx(t),y1:yk(0),x2:tx(t),y2:yk(120),stroke:TH.faint,'stroke-width':1,'stroke-dasharray':t?'2 8':'6 6'},g);txt(g,`${t}`,tx(t),y0+40,{size:18,color:'dim',weight:600})});
  txt(g,'T, °C',(px0+px1)/2,y0+72,{size:20,color:'dim',weight:600});LY.forEach(([a])=>a&&el('line',{x1:px0,y1:yk(a),x2:px1,y2:yk(a),stroke:'#fff','stroke-width':1,opacity:.3},g));
  const prof=el('path',{d:'M'+P.map(([h,t])=>`${f2(tx(t))},${f2(yk(h))}`).join(' L'),fill:'none',stroke:'#FF7043','stroke-width':4},g);A.profile=[tx(-83),yk(95)];
  const pdot=el('circle',{r:9,fill:'#FF7043',stroke:'#fff','stroke-width':2},g);const ptx=txt(g,'',px0,90,{size:20,color:'#FFAB91',anchor:'start'});
  const Tat=h=>{for(let i=1;i<P.length;i++)if(h<=P[i][0])return lerp(P[i-1][1],P[i][1],(h-P[i-1][0])/(P[i][0]-P[i-1][0]));return P[P.length-1][1]};
  txt(g,T(U('XKS ~408 km — grafikdan ancha yuqorida ↑','ISS ~408 km — far above this chart ↑')),(x0+x1)/2,70,{size:20,color:'dim',weight:600});
  const ST={pl:[x0+100,yk(11)],bl:[x0+600,yk(5)]};A.plane=()=>ST.pl;A.balloon=()=>ST.bl;
  const R={anchors:A,core:['tropo','strato','meso','thermo','ozone','profile'],labelLayout:'side',sides:{tropo:'left',strato:'left',meso:'left',thermo:'left',ozone:'left',karman:'left',profile:'right',plane:'left',everest:'left',balloon:'left'},update(lt){
    cl.forEach((G,i)=>G.setAttribute('transform',`translate(${f2(x0+((lt*14+i*190)%(x1-x0-60))+30)} ${f2(yk(2+i%3*2.2))})`));const px=x0+((lt*60)%(x1-x0+80))-40;ST.pl=[px,yk(11)-8];pl.setAttribute('transform',`translate(${f2(px)} ${f2(yk(11))})`);
    const bh=(lt*2.2)%36;ST.bl=[x0+520,yk(bh)-14];bal.setAttribute('transform',`translate(${x0+520} ${f2(yk(bh))}) scale(${f2(.7+bh/36*.8)})`);
    met.forEach((m,i)=>{const q=(lt*.5+i/4)%1,h=lerp(105,75,q),x=x0+120+(i*173)%(x1-x0-200)+q*120;at(m,{x1:f2(x-40),y1:f2(yk(h+5)),x2:f2(x),y2:f2(yk(h)),opacity:f2(q<.85?Math.sin(Math.PI*q/.85):0)})});
    aur.forEach((a,i)=>{let d='';for(let x=x0;x<=x1;x+=25){const y=yk(110+i*5)+Math.sin(x*.02+lt*(1+i*.4))*12;d+=(d?' L':'M')+x+','+f2(y)}a.setAttribute('d',d)});
    const hh=(lt*6)%120;at(pdot,{cx:f2(tx(Tat(hh))),cy:f2(yk(hh))});ptx.textContent=`${hh.toFixed(0)} km: ${Tat(hh).toFixed(0)} °C`}};R.update(0);return R});
KIT.bind();
})();
