/* ================= v2.5 SHELF: MEDICINE I — organ microstructure & mechanisms: ear (structure · cochlea · corti · balance) · liver (lobule · hepatocyte) · islet (histology · glucose)
   Academic style: proportions/numbers from standard histology & physiology texts (Junqueira, Guyton, Kandel). Where a size is exaggerated it is written on screen. No randomness. */
(()=>{
const {mix,dark,light,vol,txt,T}=KIT;
const U=(uz,en,ru)=>({uz,en,ru:ru||en});
const uid=p=>p+(SM._m25=(SM._m25||0)+1);
const clipTo=(g,shape)=>{const id=uid('mc');const cp=el('clipPath',{id},DEFS);el(shape[0],shape[1],cp);return el('g',{'clip-path':`url(#${id})`},g)};
const note=(g,s,x,y,o={})=>txt(g,T(s),x,y,{size:20,color:'dim',weight:600,...o});
const sbar=(g,x,y,len,lab)=>{el('line',{x1:x,y1:y,x2:x+len,y2:y,stroke:TH.ink,'stroke-width':4},g);[x,x+len].forEach(v=>el('line',{x1:v,y1:y-7,x2:v,y2:y+7,stroke:TH.ink,'stroke-width':2},g));txt(g,lab,x+len/2,y-14,{size:18,color:'ink',weight:600})};
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
/* ---------- EAR ---------- */
KIT.names(NAMES.uz,{pinna:'Quloq suprasi',canal:'Tashqi eshituv yo‘li (~2,5 sm)',tympanic:'Nog‘ora parda',malleus:'Bolg‘acha',incus:'Sandon',stapes:'Uzangi',middleEar:'O‘rta quloq (nog‘ora bo‘shlig‘i, havo)',eustachian:'Eshituv (Yevstaxiy) nayi',
  ovalW:'Oval darcha',roundW:'Yumaloq darcha',vestibule:'Dahliz',semicanals:'Yarim doira kanallar',cochlea:'Chig‘anoq (2¾ o‘ram)',nerve8:'Dahliz-chig‘anoq nervi (VIII)',
  scalaV:'Dahliz narvoni (perilimfa)',scalaT:'Nog‘ora narvoni (perilimfa)',scalaMedia:'Chig‘anoq yo‘li (endolimfa, K⁺ ≈150 mM, +80 mV)',basilar:'Bazilyar membrana',helicotrema:'Gelikotrema',
  reissner:'Reysner membranasi',tectorial:'Qoplovchi (tektorial) membrana',ihc:'Ichki tukli hujayra (1 qator)',ohc:'Tashqi tukli hujayralar (3 qator)',tunnel:'Korti tunneli (ustun hujayralar)',stria:'Tomirli yo‘l (stria vascularis)',
  spiralG:'Spiral tugun (ganglion)',lamina:'Suyak spiral plastinkasi',kplus:'K⁺ kirishi → depolyarizatsiya',afferent:'Afferent nerv tolasi',
  canalSC:'Gorizontal yarim doira kanal',ampulla:'Ampula',cupula:'Kupula',endolymph:'Endolimfa',crista:'Ampula qirrasi (tukli hujayralar)',nerveV:'Dahliz nervi tolalari',headRot:'Boshning burchak tezligi'});
KIT.names(NAMES.en,{pinna:'Auricle (pinna)',canal:'External auditory canal (~2.5 cm)',tympanic:'Tympanic membrane',malleus:'Malleus',incus:'Incus',stapes:'Stapes',middleEar:'Middle ear (tympanic cavity, air)',eustachian:'Auditory (Eustachian) tube',
  ovalW:'Oval window',roundW:'Round window',vestibule:'Vestibule',semicanals:'Semicircular canals',cochlea:'Cochlea (2¾ turns)',nerve8:'Vestibulocochlear nerve (VIII)',
  scalaV:'Scala vestibuli (perilymph)',scalaT:'Scala tympani (perilymph)',scalaMedia:'Cochlear duct (endolymph, K⁺ ≈150 mM, +80 mV)',basilar:'Basilar membrane',helicotrema:'Helicotrema',
  reissner:'Reissner’s membrane',tectorial:'Tectorial membrane',ihc:'Inner hair cell (1 row)',ohc:'Outer hair cells (3 rows)',tunnel:'Tunnel of Corti (pillar cells)',stria:'Stria vascularis',
  spiralG:'Spiral tugun (ganglion)',lamina:'Osseous spiral lamina',kplus:'K⁺ influx → depolarisation',afferent:'Afferent nerve fibre',
  canalSC:'Horizontal semicircular canal',ampulla:'Ampulla',cupula:'Cupula',endolymph:'Endolymph',crista:'Crista ampullaris (hair cells)',nerveV:'Vestibular nerve fibres',headRot:'Head angular velocity'});
SM.items.ear=preset(1700,900,(g,it)=>{const k=it.kind||'structure',A={};if(!['structure','cochlea','corti','balance'].includes(k))SERR.push(`ear: kind "${k}" → structure, cochlea, corti, balance`);
  const BONE='#E6D9C2',BONE2='#CDBB9C',AIR='#15110F',PERI='#BFD6E6',ENDO='#8FB8D8',NERVE='#E8C55A',SKIN='#E2B49A';
  if(k==='structure'){
    el('path',{d:'M300,90 C620,55 1180,70 1570,120 C1620,330 1610,640 1565,830 C1180,875 620,865 300,845Z',fill:BONE},g);el('path',{d:'M840,200 C980,170 1160,230 1220,360 C1260,470 1230,620 1110,680 C980,730 860,650 840,560Z',fill:BONE2,opacity:.55},g);
    el('rect',{x:260,y:60,width:60,height:800,fill:SKIN},g);
    el('path',{d:'M290,300 C230,170 120,150 95,250 C70,350 120,420 165,470 C150,520 130,600 175,640 C215,670 270,620 290,560Z',fill:SKIN,stroke:dark(SKIN,.25),'stroke-width':3},g);
    el('path',{d:'M270,330 C220,240 150,230 140,300 C135,360 175,400 230,420',fill:'none',stroke:dark(SKIN,.3),'stroke-width':5},g);
    el('path',{d:'M290,392 C420,372 520,368 636,384 L668,498 C520,512 420,506 290,488Z',fill:AIR},g);el('path',{d:'M290,392 C420,372 520,368 636,384 M290,488 C420,506 520,512 668,498',fill:'none',stroke:dark(SKIN,.3),'stroke-width':4},g);
    el('path',{d:'M668,330 L692,226 L830,218 L872,290 L874,600 C820,640 720,632 668,590Z',fill:'#2A211C'},g);
    el('path',{d:'M700,600 C770,670 860,750 990,850',fill:'none',stroke:'#2A211C','stroke-width':26,'stroke-linecap':'round'},g);
    const tm=el('path',{fill:'none',stroke:'#D9A7A0','stroke-width':5},g);
    const lab=el('g',{transform:'translate(40 0)'},g);
    el('ellipse',{cx:885,cy:445,rx:52,ry:40,fill:PERI,stroke:dark(PERI,.35),'stroke-width':3},lab);
    [['M860,410 C820,300 860,220 920,230 C985,240 975,340 925,410',16],['M905,420 C960,330 1060,330 1070,380 C1080,430 1010,450 930,445',16],['M920,420 C1000,410 1060,300 1010,260 C960,230 930,300 935,400',16]].forEach(([d,w])=>{el('path',{d,fill:'none',stroke:dark(PERI,.35),'stroke-width':w+6,'stroke-linecap':'round'},lab);el('path',{d,fill:'none',stroke:PERI,'stroke-width':w,'stroke-linecap':'round'},lab)});
    let sp='';for(let i=0;i<=200;i++){const a=Math.PI+i/200*2.75*2*Math.PI,r=88-i/200*72;sp+=(i?' L':'M')+f2(1060+Math.cos(a)*r)+','+f2(530+Math.sin(a)*r*.82)}
    [[30,dark(PERI,.35)],[22,PERI]].forEach(([w,c])=>el('path',{d:'M905,470 C930,520 950,545 975,540',fill:'none',stroke:c,'stroke-width':w,'stroke-linecap':'round'},lab));
    el('path',{d:sp,fill:'none',stroke:dark(PERI,.35),'stroke-width':30,'stroke-linecap':'round'},lab);const coch=el('path',{d:sp,fill:'none',stroke:PERI,'stroke-width':22,'stroke-linecap':'round'},lab);
    const wave=el('path',{d:sp,fill:'none',stroke:'#3F7FB5','stroke-width':4,'stroke-dasharray':'10 30'},lab);
    el('path',{d:'M1100,530 C1240,500 1330,470 1600,440 M970,410 C1140,380 1330,420 1600,430',fill:'none',stroke:NERVE,'stroke-width':18,'stroke-linecap':'round'},g);
    const rw=el('ellipse',{cx:872,cy:515,rx:6,ry:16,fill:'#F4D0C8',stroke:'#B37B70','stroke-width':2},g);
    const oss=el('g',{},g);
    el('path',{d:'M722,250 C722,226 760,224 764,250 C766,272 752,290 742,296 L738,318 L664,454 L650,448 L716,312 C712,296 722,280 722,250Z M716,320 L700,330 L708,338Z',fill:'#F6EEDD',stroke:'#8C7A5C','stroke-width':2.5},oss);
    el('path',{d:'M764,246 C772,232 806,234 812,250 L846,258 L812,270 C810,282 806,290 804,300 C806,340 808,390 810,420 L824,428 L818,436 L800,428 C796,390 790,330 786,300 C772,292 762,272 764,246Z',fill:'#F6EEDD',stroke:'#8C7A5C','stroke-width':2.5},oss);
    const stp=el('g',{},g);el('path',{d:'M818,424 L834,424 L866,402 M834,436 L866,466 M818,424 L818,436 L834,436',fill:'none',stroke:'#8C7A5C','stroke-width':9,'stroke-linecap':'round','stroke-linejoin':'round'},stp);el('path',{d:'M818,424 L834,424 L866,402 M834,436 L866,466',fill:'none',stroke:'#F6EEDD','stroke-width':4,'stroke-linecap':'round'},stp);el('rect',{x:864,y:398,width:9,height:72,rx:3,fill:'#F6EEDD',stroke:'#8C7A5C','stroke-width':2},stp);
    const sw=[...Array(5)].map(()=>el('path',{fill:'none',stroke:'#9CC9E8','stroke-width':4,opacity:0},g));
    note(g,U('Bosim kuchayishi: S(nog‘ora parda)/S(uzangi asosi) ≈ 55/3,2 ≈ 17 × richag ≈1,3 → ~22 marta (~27 dB)','Pressure gain: area 55/3.2 mm² ≈ 17 × lever ≈1.3 → ~22× (~27 dB)'),950,40);
    note(g,U('O‘rta va ichki quloq kattalashtirilgan (masshtab saqlanmagan)','Middle & inner ear enlarged (not to scale)'),950,890);
    Object.assign(A,{pinna:[140,270],canal:[460,445],tympanic:[650,440],malleus:[742,240],incus:[812,252],stapes:[845,432],middleEar:[760,580],eustachian:[880,760],ovalW:[872,420],roundW:[872,515],vestibule:[925,480],semicanals:[945,226],cochlea:[1190,540],nerve8:[1400,460]});
    const R={anchors:A,core:['pinna','canal','tympanic','malleus','incus','stapes','eustachian','ovalW','roundW','cochlea','semicanals','nerve8'],update(lt){const s=Math.sin(lt*TAU*.8);
      tm.setAttribute('d',`M634,382 Q${f2(660+s*6)},445 668,500`);oss.setAttribute('transform',`rotate(${f2(-2.2*s)} 790 252)`);stp.setAttribute('transform',`translate(${f2(3.5*s)} 0)`);rw.setAttribute('cx',f2(872-3*s));
      wave.setAttribute('stroke-dashoffset',f2(-lt*80));sw.forEach((p,i)=>{const q=((lt*.35+i/5)%1),x=60+q*560,h=x<290?150:44;p.setAttribute('d',`M${f2(x)},${440-h} Q${f2(x+18)},440 ${f2(x)},${440+h}`);p.setAttribute('opacity',f2(Math.sin(Math.PI*q)*.85))})}};R.update(0);return R}
  if(k==='cochlea'){
    const x0=300,x1=1450,yM=450,hS=150;const L=35;// mm
    el('path',{d:`M${x0},${yM-hS} L${x1},${yM-hS} Q${x1+80},${yM} ${x1},${yM+hS} L${x0},${yM+hS}Z`,fill:PERI,stroke:dark(PERI,.4),'stroke-width':3},g);
    const bm=el('path',{fill:'none',stroke:'#C0392B','stroke-width':5},g);el('rect',{x:x0-60,y:yM-hS-10,width:60,height:2*hS+20,fill:BONE},g);
    const ow=el('ellipse',{cx:x0,cy:yM-hS/2,rx:8,ry:40,fill:'#F4D0C8',stroke:'#B37B70','stroke-width':2},g),rw=el('ellipse',{cx:x0,cy:yM+hS/2,rx:8,ry:40,fill:'#F4D0C8',stroke:'#B37B70','stroke-width':2},g);
    const st=el('g',{},g);el('path',{d:`M${x0-120},${yM-hS/2} L${x0-20},${yM-hS/2-30} M${x0-120},${yM-hS/2} L${x0-20},${yM-hS/2+30}`,stroke:'#8C7A5C','stroke-width':7,fill:'none'},st);el('rect',{x:x0-22,y:yM-hS/2-36,width:10,height:72,fill:'#F6EEDD',stroke:'#8C7A5C','stroke-width':2},st);
    const gx=f=>{const xa=Math.log10(f/165.4+.88)/2.1;return x0+(1-xa)*(x1-x0)};// Greenwood (human): f=165.4(10^(2.1x)−0.88), x from apex
    [20000,8000,4000,2000,1000,500,200,50].forEach(f=>{const x=gx(f);el('line',{x1:x,y1:yM+hS+14,x2:x,y2:yM+hS+30,stroke:TH.dim,'stroke-width':2},g);txt(g,f>=1000?`${f/1000} kHz`:`${f} Hz`,x,yM+hS+56,{size:18,color:'dim',weight:600})});
    note(g,U('← asos: tor va qattiq (yuqori chastota)','← base: narrow & stiff (high frequency)'),x0+240,yM-hS-30);note(g,U('cho‘qqi: keng va yumshoq (past chastota) →','apex: wide & floppy (low frequency) →'),x1-280,yM-hS-30);
    sbar(g,x0,yM+hS+110,(x1-x0)*5/L,'5 mm');const info=txt(g,'',(x0+x1)/2,yM+hS+150,{size:24,color:'a2'});
    note(g,U('Yugurik to‘lqin (Bekesi): cho‘qqi joyi chastotaga bog‘liq — Grinvud funksiyasi, odam chig‘anog‘i ≈35 mm','Travelling wave (Békésy): peak place depends on frequency — Greenwood function, human cochlea ≈35 mm'),(x0+x1)/2,60);
    const FS=it.freq?[it.freq]:[8000,4000,2000,1000,500,250];const ST={pk:[gx(FS[0]),yM]};
    Object.assign(A,{stapesH:[x0-60,yM-hS/2-30],ovalW:[x0,yM-hS/2-40],roundW:[x0,yM+hS/2+40],scalaV:[x0+500,yM-hS+40],scalaT:[x0+500,yM+hS-40],basilar:()=>ST.pk,helicotrema:[x1+40,yM]});
    KIT.names(NAMES.uz,{stapesH:'Uzangi (porshen)'});KIT.names(NAMES.en,{stapesH:'Stapes (piston)'});
    const R={anchors:A,core:['stapesH','ovalW','roundW','scalaV','scalaT','basilar','helicotrema'],update(lt){const per=3,fi=Math.floor(lt/per)%FS.length,f=FS[fi],xp=gx(f);const w=TAU*1.4,ph=lt*w;let d='';
      for(let x=x0;x<=x1;x+=4){const r=(x-x0)/(xp-x0);const env=r<=1?Math.pow(r,2.2)*.92+.08:Math.exp(-Math.pow((x-xp)/40,2));const phi=r<=1?r*3*TAU:3*TAU+(x-xp)/30;d+=(d?' L':'M')+x+','+f2(yM+env*60*Math.sin(ph-phi))}bm.setAttribute('d',d);
      const s=Math.sin(ph);st.setAttribute('transform',`translate(${f2(4*s)} 0)`);ow.setAttribute('cx',f2(x0+4*s));rw.setAttribute('cx',f2(x0-4*s));ST.pk=[xp,yM-62];
      const dist=(xp-x0)/(x1-x0)*L;info.textContent=T(U(`f = ${f>=1000?f/1000+' kHz':f+' Hz'} → maksimal tebranish asosdan ≈ ${dist.toFixed(1)} mm da`,`f = ${f>=1000?f/1000+' kHz':f+' Hz'} → peak ≈ ${dist.toFixed(1)} mm from the base`))}};R.update(0);return R}
  if(k==='corti'){
    el('path',{d:'M180,120 L1420,120 C1520,120 1560,200 1560,300 L1560,780 C1560,830 1520,860 1470,860 L180,860Z',fill:BONE},g);
    el('path',{d:'M260,150 L1300,150 L1420,170 L1420,520 L260,520Z',fill:PERI},g);el('path',{d:'M640,528 L1420,528 L1420,820 L260,820 L260,560Z',fill:PERI},g);
    el('path',{d:'M600,445 L1320,150 L1420,150 L1420,520 L640,520Z',fill:ENDO},g);
    const strip=el('path',{d:'M1330,175 C1380,200 1405,300 1400,515 L1420,515 L1420,170Z',fill:'#C0504D',opacity:.75},g);
    el('line',{x1:600,y1:445,x2:1320,y2:150,stroke:'#6A8CA8','stroke-width':3},g);
    el('path',{d:'M180,505 L560,490 C600,488 630,500 645,520 L645,540 L180,560Z',fill:BONE2,stroke:dark(BONE2,.3),'stroke-width':2},g);
    el('path',{d:'M480,470 C520,440 590,440 620,470 L620,492 L480,498Z',fill:'#E7C9C0',stroke:'#A88','stroke-width':2},g);
    const fib=el('path',{d:'M760,470 C700,500 660,520 600,522 C470,525 380,540 330,560',fill:'none',stroke:NERVE,'stroke-width':6},g);
    [[330,560],[300,600],[350,610],[310,520]].forEach(([x,y])=>el('circle',{cx:x,cy:y,r:16,fill:'#F3DFA0',stroke:'#B89A3A','stroke-width':2},g));
    const org=el('g',{},g);const bm=el('path',{fill:'none',stroke:'#7B4A3A','stroke-width':6},g);
    el('path',{d:'M800,520 L850,400 L866,400 L820,520Z M930,520 L880,400 L866,400 L912,520Z',fill:'#D9C7E8',stroke:'#7E6A96','stroke-width':2},org);
    [[950,'o'],[1000,'o'],[1050,'o']].forEach(([x])=>{el('path',{d:`M${x-14},520 L${x-14},460 L${x+14},460 L${x+14},520Z`,fill:'#E9DDF2',stroke:'#7E6A96','stroke-width':1.5},org)});
    el('path',{d:'M1080,520 C1090,430 1150,400 1200,420 L1230,520Z',fill:'#E9DDF2',stroke:'#7E6A96','stroke-width':2},org);
    el('path',{d:'M700,520 L700,450 C700,420 735,400 760,400 C790,400 800,420 800,450 L800,520Z',fill:'#E9DDF2',stroke:'#7E6A96','stroke-width':1.5},org);
    const hc=[[760,395,'i'],[950,380,'o'],[1000,378,'o'],[1050,376,'o']].map(([x,y,t])=>{const G=el('g',{},org);const body=el('path',{d:t==='i'?`M${x-24},${y} C${x-30},${y+40} ${x-26},${y+70} ${x},${y+78} C${x+26},${y+70} ${x+30},${y+40} ${x+24},${y}Z`:`M${x-12},${y} L${x-12},${y+80} L${x+12},${y+80} L${x+12},${y}Z`,fill:'#F2C6A0',stroke:'#A0603A','stroke-width':2},G);
      el('circle',{cx:x,cy:y+(t==='i'?42:56),r:9,fill:'#7A4E8A'},G);const st=el('g',{},G);[-10,-3,4,11].forEach((dx,j)=>el('line',{x1:x+dx,y1:y,x2:x+dx,y2:y-10-j*5,stroke:'#5D4037','stroke-width':3,'stroke-linecap':'round'},st));return {G,body,st,x,y,t}});
    const tect=el('path',{fill:'#D8EAD0',stroke:'#6E9A63','stroke-width':2,opacity:.95},g);
    const kp=[...Array(16)].map(()=>el('circle',{r:5,fill:'#7E57C2'},g));const glu=[...Array(6)].map(()=>el('circle',{r:4,fill:'#FFB300'},g));const spk=[...Array(4)].map(()=>el('circle',{r:8,fill:'#FFEB3B',opacity:0,filter:'url(#glowS)'},g));
    const info=txt(g,'',870,890,{size:22,color:'a2'});note(g,U('~3500 ichki va ~12000 tashqi tukli hujayra; afferent tolalarning ~95% ichki tukli hujayradan','~3,500 inner & ~12,000 outer hair cells; ~95% of afferent fibres come from inner hair cells'),870,60);
    const ST={u:0};Object.assign(A,{scalaV:[700,250],scalaMedia:[1100,300],scalaT:[900,700],reissner:[1000,281],basilar:[1150,530],tectorial:()=>[900,372-ST.u*.5],ihc:{el:hc[0].body,fx:0,fy:.5},ohc:{el:hc[2].body,fx:.5,fy:1},tunnel:[866,480],stria:[1390,330],spiralG:[320,590],lamina:[400,520],kplus:()=>[760,386-ST.u],afferent:[640,522]});
    const R={anchors:A,core:['scalaV','scalaMedia','scalaT','reissner','basilar','tectorial','ihc','ohc','stria','spiralG','kplus'],update(lt){const s=Math.sin(lt*TAU*.6),u=14*s;ST.u=u;
      let d='';for(let x=645;x<=1420;x+=10){const y=520-u*Math.sin(Math.PI*(x-645)/775);d+=(d?' L':'M')+x+','+f2(y)}bm.setAttribute('d',d);
      const rot=-Math.atan(u*Math.PI/775*Math.cos(Math.PI*(900-645)/775))*180/Math.PI;org.setAttribute('transform',`translate(0 ${f2(-u*Math.sin(Math.PI*(900-645)/775))}) rotate(${f2(rot)} 645 520)`);
      const tu=-u*.55;tect.setAttribute('d',`M610,440 C700,420 820,${f2(372+tu*.6)} 1090,${f2(366+tu)} L1095,${f2(392+tu)} C900,${f2(398+tu*.6)} 760,${f2(410+tu*.3)} 620,470Z`);
      const def=u/14,P=sig((def-.1)/.25);hc.forEach(h=>{h.st.setAttribute('transform',`rotate(${f2(def*14)} ${h.x} ${h.y})`);h.body.setAttribute('fill',mix('#F2C6A0','#FF7043',Math.max(0,P-.15)))});
      kp.forEach((c,i)=>{const q=(lt*1.2+i/16)%1,h=hc[i%4];at(c,{cx:f2(h.x+((i*7)%9-4)),cy:f2(h.y-30+q*50-u*.8),opacity:f2(P*Math.sin(Math.PI*q))})});
      glu.forEach((c,i)=>{const q=(lt*1.5+i/6)%1;at(c,{cx:f2(760-10+i*4),cy:f2(470+q*20-u*.9),opacity:f2(P>.5?Math.sin(Math.PI*q):0)})});
      spk.forEach((c,i)=>{const q=((lt*.6+i/4)%1);const t=q;const x=760-t*430,y=470+t*90;at(c,{cx:f2(x),cy:f2(y),opacity:f2(P>.5?.9:0)})});
      info.textContent=T(U(`Bazilyar membrana ${u>0?'yuqoriga':'pastga'} → tukchalar ${u>0?'baland tomonga':'past tomonga'} egiladi → kanallar ochiq ≈${Math.round(P*100)}%`,`Basilar membrane ${u>0?'up':'down'} → stereocilia toward ${u>0?'tallest':'shortest'} → channels open ≈${Math.round(P*100)}%`))}};R.update(0);return R}
  // balance
  const cx=480,cy=460,Rr=230,TT=it.cycle||24,w0=100,tau=6;const om=t=>{t=((t%TT)+TT)%TT;return t<2?w0*t/2:t<12?w0:t<13?w0*(13-t):0};
  const LP=sim(TT,.01,(s,t,dt)=>s+(om(t)-s)/tau*dt,0),PH=sim(TT,.01,(s,t,dt)=>s+om(t)*dt,0);
  const ring=el('g',{},g);el('circle',{cx,cy,r:Rr,fill:'none',stroke:dark(PERI,.35),'stroke-width':54},ring);el('circle',{cx,cy,r:Rr,fill:'none',stroke:ENDO,'stroke-width':44},ring);
  el('ellipse',{cx:cx+Rr,cy,rx:55,ry:42,fill:ENDO,stroke:dark(PERI,.35),'stroke-width':5},ring);for(let i=0;i<12;i++){const a=i/12*TAU;el('line',{x1:f2(cx+Math.cos(a)*(Rr+27)),y1:f2(cy+Math.sin(a)*(Rr+27)),x2:f2(cx+Math.cos(a)*(Rr+40)),y2:f2(cy+Math.sin(a)*(Rr+40)),stroke:dark(BONE2,.3),'stroke-width':4},ring)}
  const crista=el('path',{d:`M${cx+Rr+30},${cy+38} Q${cx+Rr},${cy+14} ${cx+Rr-30},${cy+38}Z`,fill:'#C9897B'},ring);const cup=el('path',{fill:'#EDE4F6',stroke:'#8E7AA8','stroke-width':2,opacity:.95},ring);
  const nv=el('path',{d:`M${cx+Rr},${cy+40} C${cx+Rr+20},${cy+120} ${cx+Rr+80},${cy+200} ${cx+Rr+160},${cy+260}`,fill:'none',stroke:NERVE,'stroke-width':8},ring);
  const fl=[...Array(18)].map(()=>el('circle',{r:6,fill:'#1F4E79',opacity:.7},ring));
  const c0=930,c1=1620,ya=[220,360],yb=[470,610];const tX=t=>c0+t/TT*(c1-c0);el('line',{x1:c0,y1:ya[1],x2:c1,y2:ya[1],stroke:TH.faint,'stroke-width':2},g);el('line',{x1:c0,y1:(yb[0]+yb[1])/2,x2:c1,y2:(yb[0]+yb[1])/2,stroke:TH.faint,'stroke-width':2},g);
  let d1='',d2='';for(let i=0;i<=300;i++){const t=i/300*TT;d1+=(i?' L':'M')+f2(tX(t))+','+f2(ya[1]-om(t)/w0*(ya[1]-ya[0]));d2+=(i?' L':'M')+f2(tX(t))+','+f2((yb[0]+yb[1])/2-(om(t)-LP(t))/w0*(yb[1]-yb[0])/2)}
  const pw=el('path',{d:d1,fill:'none',stroke:'#4FC3F7','stroke-width':4},g);el('path',{d:d2,fill:'none',stroke:'#FFA726','stroke-width':4},g);const cur=el('line',{y1:ya[0]-10,y2:yb[1]+80,stroke:'#fff','stroke-width':2,opacity:.6},g);
  txt(g,T(U('ω bosh','ω head')),c0-60,ya[0]+20,{size:20,color:'#4FC3F7'});txt(g,T(U('kupula','cupula')),c0-60,yb[0]+20,{size:20,color:'#FFA726'});
  const ras=el('g',{},g);const rr=[...Array(40)].map(()=>el('line',{y1:yb[1]+40,y2:yb[1]+70,stroke:'#FFEB3B','stroke-width':2},ras));txt(g,T(U('nerv impulslari','nerve spikes')),c0-60,yb[1]+60,{size:18,color:'#FFEB3B'});
  const info=txt(g,'',(c0+c1)/2,yb[1]+120,{size:24,color:'a2'});note(g,U('Chap quloq gorizontal kanali, yuqoridan ko‘rinish; bosh chapga buriladi. Kupula ≈ ω ning “yuqori chastotali filtri” (τ ≈ 6 s)','Left horizontal canal, top view; head turns left. Cupula ≈ high-pass of ω (τ ≈ 6 s)'),850,60);
  const ST={a:0};Object.assign(A,{canalSC:[cx-Rr,cy],ampulla:()=>{const a=ST.a;return [cx+Math.cos(a)*(Rr+50),cy+Math.sin(a)*(Rr+50)]},cupula:()=>{const a=ST.a;return [cx+Math.cos(a)*Rr,cy+Math.sin(a)*Rr]},endolymph:()=>{const a=ST.a+Math.PI*.75;return [cx+Math.cos(a)*Rr,cy+Math.sin(a)*Rr]},crista:()=>{const a=ST.a;return [cx+Math.cos(a)*(Rr-20)-Math.sin(a)*30,cy+Math.sin(a)*(Rr-20)+Math.cos(a)*30]},headRot:{el:pw,fx:.25,fy:0}});
  const R={anchors:A,core:['canalSC','ampulla','cupula','endolymph','headRot'],update(lt,p,st){const t=((lt-(st||0))%TT+TT)%TT;const phi=-PH(t)*Math.PI/180;ST.a=phi;ring.setAttribute('transform',`rotate(${f2(phi*180/Math.PI)} ${cx} ${cy})`);
    const th=(om(t)-LP(t))/w0;const bend=th*28;cup.setAttribute('d',`M${cx+Rr-22},${cy+20} Q${f2(cx+Rr-22+bend*.5)},${cy-10} ${f2(cx+Rr-22+bend)},${cy-22} L${f2(cx+Rr+22+bend)},${cy-22} Q${f2(cx+Rr+22+bend*.5)},${cy-10} ${cx+Rr+22},${cy+20}Z`);
    fl.forEach((c,i)=>{const a=i/18*TAU+th*.35;const r=Rr+((i%3)-1)*10;at(c,{cx:f2(cx+Math.cos(a)*r),cy:f2(cy+Math.sin(a)*r)})});
    const rate=Math.max(5,90+80*th);let n=0;rr.forEach((l,i)=>{const x=c1-i*16;const tt=t-(c1-x)/(c1-c0)*TT;const th2=(om(tt)-LP(tt))/w0;const rt=Math.max(5,90+80*th2);const on=((Math.sin(i*12.9898)*43758.5453)%1+1)%1<rt/200;at(l,{x1:f2(x),x2:f2(x),opacity:on&&tt>=0?1:0})});
    at(cur,{x1:f2(tX(t)),x2:f2(tX(t))});
    info.textContent=T(t<2?U(`Tezlanish: endolimfa inersiya bilan orqada qoladi → kupula egiladi · ~${Math.round(rate)} impuls/s`,`Acceleration: endolymph lags → cupula bends · ~${Math.round(rate)} spikes/s`):t<12?U(`Doimiy aylanish: kupula asta qaytadi → aylanish sezgisi so‘nadi · ~${Math.round(rate)} impuls/s`,`Constant rotation: cupula relaxes → sensation fades · ~${Math.round(rate)} spikes/s`):t<16?U(`To‘xtash: kupula teskari egiladi → teskari aylanish illyuziyasi (bosh aylanishi) · ~${Math.round(rate)} impuls/s`,`Stop: cupula bends the other way → illusion of opposite rotation (vertigo) · ~${Math.round(rate)} spikes/s`):U('Tinch holat: ~90 impuls/s (bazal faollik)','Rest: ~90 spikes/s (resting discharge)'))}};R.update(0,0,0);return R});
/* ---------- LIVER (classic lobule ≈1–2 mm; hepatocyte ≈20–30 µm) ---------- */
KIT.names(NAMES.uz,{lobuleL:'Jigar bo‘lakchasi (klassik, ~1,5 mm)',centralV:'Markaziy vena',triad:'Portal triada',portalV:'Darvoza vena tarmog‘i',hepArt:'Jigar arteriyasi tarmog‘i',bileDuct:'O‘t yo‘lchasi',cords:'Gepatotsit plastinkalari',sinusoid:'Sinusoid (aralash qon)',
  bloodFlow:'Qon: chetdan markazga',bileFlow:'O‘t: markazdan chetga',zone1:'1-zona (periportal, O₂ ko‘p)',zone3:'3-zona (markaz atrofi, O₂ kam — ishemiya va toksinlarga sezgir)',
  hepatocyteC:'Gepatotsit (~25 µm)',endothelium:'Teshikli endoteliy (fenestralar)',disse:'Disse bo‘shlig‘i',kupffer:'Kupffer hujayrasi (makrofag)',stellate:'Yulduzsimon (Ito) hujayra — A vitamini',canaliculus:'O‘t kapillyari',nucleusH:'Yadro (ba’zan 2 ta)',mitoH:'Mitoxondriyalar',glycogen:'Glikogen donachalari',rerH:'Donador EPT',microvilliH:'Mikrovorsinkalar',rbcL:'Eritrotsit'});
KIT.names(NAMES.en,{lobuleL:'Hepatic lobule (classic, ~1.5 mm)',centralV:'Central vein',triad:'Portal triad',portalV:'Portal vein branch',hepArt:'Hepatic artery branch',bileDuct:'Bile ductule',cords:'Hepatocyte plates',sinusoid:'Sinusoid (mixed blood)',
  bloodFlow:'Blood: periphery → centre',bileFlow:'Bile: centre → periphery',zone1:'Zone 1 (periportal, high O₂)',zone3:'Zone 3 (centrilobular, low O₂ — sensitive to ischaemia & toxins)',
  hepatocyteC:'Hepatocyte (~25 µm)',endothelium:'Fenestrated endothelium',disse:'Space of Disse',kupffer:'Kupffer cell (macrophage)',stellate:'Stellate (Ito) cell — vitamin A',canaliculus:'Bile canaliculus',nucleusH:'Nucleus (sometimes 2)',mitoH:'Mitochondria',glycogen:'Glycogen granules',rerH:'Rough ER',microvilliH:'Microvilli',rbcL:'Red blood cell'});
SM.items.liver=preset(1700,900,(g,it)=>{const k=it.kind||'lobule',A={};if(!['lobule','acinus','hepatocyte'].includes(k))SERR.push(`liver: kind "${k}" → lobule, acinus, hepatocyte`);
  const HEP='#E8B4AE',HEPd='#C98A86',NUC='#5B3F8C',SIN='#F5D7D2',RBC='#C62828',BILE='#7CB342';
  if(k!=='hepatocyte'){const cx=640,cy=450,R=340,ap=R*Math.cos(Math.PI/6);const V=[...Array(6)].map((_,i)=>{const a=i*Math.PI/3;return [cx+Math.cos(a)*R,cy+Math.sin(a)*R]});
    const edge=a=>{const m=((a%(Math.PI/3))+Math.PI/3)%(Math.PI/3);return ap/Math.cos(m-Math.PI/6)};
    V.forEach(([x,y],i)=>{const a=i*Math.PI/3;const ox=cx+Math.cos(a)*R*Math.sqrt(3)*Math.cos(Math.PI/6)*0+Math.cos(a+Math.PI/6)*ap*2*0;});
    const FLD=clipTo(g,['circle',{cx,cy,r:R*1.32}]);el('circle',{cx,cy,r:R*1.32,fill:'#3A2A2E'},FLD);for(let j=0;j<6;j++){const a=j*Math.PI/3+Math.PI/6,nx=cx+Math.cos(a)*2*ap,ny=cy+Math.sin(a)*2*ap;el('path',{d:[...Array(6)].map((_,i)=>{const b=i*Math.PI/3;return (i?'L':'M')+f2(nx+Math.cos(b)*R)+','+f2(ny+Math.sin(b)*R)}).join(' ')+'Z',fill:HEP,opacity:.45,stroke:'#D8C3BE','stroke-width':3},FLD)}el('circle',{cx,cy,r:R*1.32,fill:'none',stroke:TH.faint,'stroke-width':4},g);
    const hex=el('path',{d:V.map((p,i)=>(i?'L':'M')+f2(p[0])+','+f2(p[1])).join(' ')+'Z',fill:HEP,stroke:'#EADBD5','stroke-width':4},g);
    const C=clipTo(g,['path',{d:V.map((p,i)=>(i?'L':'M')+f2(p[0])+','+f2(p[1])).join(' ')+'Z'}]);const NR=40,rays=[];
    for(let i=0;i<NR;i++){const a=i/NR*TAU+.04;const e=edge(a);rays.push([a,e]);const x2=cx+Math.cos(a)*(e+5),y2=cy+Math.sin(a)*(e+5);el('line',{x1:f2(cx+Math.cos(a)*30),y1:f2(cy+Math.sin(a)*30),x2:f2(x2),y2:f2(y2),stroke:SIN,'stroke-width':9},C);
      const b=a+Math.PI/NR;const eb=edge(b);for(let r=48;r<eb-10;r+=30){el('circle',{cx:f2(cx+Math.cos(b)*r),cy:f2(cy+Math.sin(b)*r),r:4.2,fill:NUC,opacity:.85},C)}}
    let zl=null,z3=null;if(k==='acinus'){z3=el('circle',{cx,cy,r:ap*.36,fill:'#5E35B1',opacity:.22},C);el('circle',{cx,cy,r:ap*.68,fill:'none',stroke:'#fff','stroke-width':2,'stroke-dasharray':'8 8',opacity:.8},C);el('circle',{cx,cy,r:ap*.36,fill:'none',stroke:'#fff','stroke-width':2,'stroke-dasharray':'8 8',opacity:.8},C);
      V.forEach(([x,y])=>el('circle',{cx:x,cy:y,r:ap*.34,fill:'#E53935',opacity:.16},C));txt(g,'1',cx+ap*.84,cy+8,{size:30,color:'#fff'});txt(g,'2',cx+ap*.52,cy+8,{size:30,color:'#fff'});txt(g,'3',cx+ap*.18,cy+8,{size:30,color:'#fff'})}
    el('circle',{cx,cy,r:30,fill:'#F7E1DC',stroke:'#B07A74','stroke-width':3},g);const cv=el('circle',{cx,cy,r:24,fill:'#8E3B46'},g);
    const tri=V.map(([x,y])=>{const G=el('g',{transform:`translate(${f2(x)} ${f2(y)})`},g);el('circle',{r:44,fill:'#F3E6DF',stroke:'#D2BDB4','stroke-width':2},G);const pv=el('ellipse',{cx:-6,cy:4,rx:22,ry:16,fill:'#6D4C8E',stroke:'#4A3366','stroke-width':3},G);
      const ha=el('circle',{cx:20,cy:-18,r:8,fill:'#B71C1C',stroke:'#7F0000','stroke-width':4},G);const bd=el('circle',{cx:16,cy:22,r:9,fill:'#FFF',stroke:BILE,'stroke-width':5},G);return {G,pv,ha,bd}});
    const rb=[...Array(60)].map(()=>el('circle',{r:4,fill:RBC},C)),bl=[...Array(36)].map(()=>el('circle',{r:3.6,fill:BILE},C));
    sbar(g,cx-113,cy+R+40,2*R*(.5/1.5),'0,5 mm'.replace(',',T(U(',','.'))));
    note(g,U('Odamda bo‘lakcha chegaralari aniq emas (cho‘chqada aniq) · qon va o‘t qarama-qarshi yo‘nalishda oqadi','Human lobule borders are indistinct (clear in pig) · blood and bile flow in opposite directions'),850,40);
    const L0=1100;el('rect',{x:L0,y:180,width:520,height:540,rx:14,fill:'#0D1B2A',stroke:TH.faint,'stroke-width':2},g);
    [[U('Qon kiradi: darvoza vena (~75%) + jigar arteriyasi (~25%)','Blood in: portal vein (~75%) + hepatic artery (~25%)'),'#6D4C8E'],[U('Sinusoidlar → markaziy vena → jigar venalari → pastki kovak vena','Sinusoids → central vein → hepatic veins → IVC'),'#C62828'],[U('O‘t: gepatotsit → o‘t kapillyari → o‘t yo‘lchasi','Bile: hepatocyte → canaliculus → bile ductule'),BILE],[U('Bitta bo‘lakchada ~10⁵ gepatotsit (taxminiy)','~10⁵ hepatocytes per lobule (approx.)'),'#BDBDBD']].forEach(([s,c],i)=>{el('circle',{cx:L0+34,cy:240+i*120,r:10,fill:c},g);const tt=T(s);const words=tt.split(' ');let line='',ln=0;words.forEach(w=>{if((line+w).length>36){txt(g,line,L0+60,248+i*120+ln*30,{size:22,color:'ink',weight:600,anchor:'start'});line='';ln++}line+=w+' '});txt(g,line,L0+60,248+i*120+ln*30,{size:22,color:'ink',weight:600,anchor:'start'})});
    Object.assign(A,{lobuleL:[cx-ap*.7,cy-R*.5],centralV:{el:cv,fx:.5,fy:0},triad:[V[5][0],V[5][1]-44],portalV:{el:tri[0].pv,fx:.5,fy:1},hepArt:{el:tri[0].ha,fx:1,fy:.5},bileDuct:{el:tri[0].bd,fx:.5,fy:1},cords:[cx+Math.cos(2.2)*180,cy+Math.sin(2.2)*180],sinusoid:[cx+Math.cos(rays[30][0])*150,cy+Math.sin(rays[30][0])*150],bloodFlow:{el:rb[5]},bileFlow:{el:bl[3]}});
    if(k==='acinus')Object.assign(A,{zone1:[V[1][0]-30,V[1][1]-60],zone3:[cx-40,cy+60]});
    const R0={anchors:A,core:k==='acinus'?['centralV','triad','zone1','zone3','sinusoid']:['lobuleL','centralV','triad','portalV','hepArt','bileDuct','cords','sinusoid','bloodFlow','bileFlow'],update(lt){
      rb.forEach((c,i)=>{const [a,e]=rays[(i*7)%NR];const q=((lt*.12+i*.137)%1);const r=e-q*(e-30);at(c,{cx:f2(cx+Math.cos(a)*r),cy:f2(cy+Math.sin(a)*r),opacity:f2(q<.95?1:0)})});
      bl.forEach((c,i)=>{const [a0,e0]=rays[(i*11+3)%NR];const a=a0+Math.PI/NR,e=edge(a);const q=((lt*.08+i*.173)%1);const r=40+q*(e-40);at(c,{cx:f2(cx+Math.cos(a)*r),cy:f2(cy+Math.sin(a)*r)})})}};R0.update(0);return R0}
  // ---- hepatocyte (≈11 px/µm) ----
  const sy0=410,sy1=520,pxu=11;
  el('rect',{x:120,y:sy0,width:1460,height:sy1-sy0,fill:'#FBE3DF'},g);const J=[[0,6],[8,-5],[-6,4],[5,-7],[-4,5],[7,3]];
  const cellRow=(y0,y1,flip)=>[0,1,2,3,4].map(i=>{const x0=130+i*290,x1=x0+282;const j1=J[i%6],j2=J[(i+2)%6];const d=`M${x0+j1[0]},${y0} L${x0+140+j2[1]},${y0+(flip?0:-6)} L${x1+j2[0]},${y0} L${x1-j1[1]},${(y0+y1)/2} L${x1+j2[0]},${y1} L${x0+140+j1[1]},${y1+(flip?6:0)} L${x0+j1[0]},${y1} L${x0-j2[1]},${(y0+y1)/2}Z`;const G=el('g',{},g);const c=el('path',{d,fill:HEP,stroke:HEPd,'stroke-width':3},G);
    const ny=(y0+y1)/2;const n=el('circle',{cx:x0+(i===2?175:141),cy:ny,r:44,fill:'#8E6FB8',stroke:NUC,'stroke-width':3},G);el('circle',{cx:x0+150,cy:ny-6,r:9,fill:NUC},G);if(i===2){el('circle',{cx:x0+80,cy:ny+30,r:40,fill:'#8E6FB8',stroke:NUC,'stroke-width':3},G)}
    const mito=[];for(let j=0;j<40;j++){const mx=x0+22+((j*67)%240),my=y0+18+((j*41)%(y1-y0-36));if(Math.hypot(mx-x0-141,my-ny)<60||(i===2&&Math.hypot(mx-x0-80,my-ny-30)<50))continue;mito.push(el('ellipse',{cx:mx,cy:my,rx:8,ry:4,fill:'#E57373',stroke:'#B71C1C','stroke-width':1.5,transform:`rotate(${(j*37)%180} ${mx} ${my})`},G))}
    const gly=[];for(let j=0;j<18;j++){const gx=x0+40+((j*53)%200),gy=y0+20+((j*29)%(y1-y0-40));if(Math.hypot(gx-x0-141,gy-ny)<48)continue;gly.push(el('circle',{cx:gx,cy:gy,r:3.5,fill:'#5D4037',opacity:.7},G))}
    const rer=el('path',{d:`M${x0+200},${ny-40} q20,10 0,20 q-20,10 0,20 q20,10 0,20`,fill:'none',stroke:'#7E57C2','stroke-width':3},G);
    const mv=[];const ye=flip?y1:y0;for(let x=x0+10;x<x1-6;x+=14)mv.push(el('line',{x1:x,y1:ye,x2:x,y2:ye+(flip?14:-14),stroke:HEPd,'stroke-width':3,'stroke-linecap':'round'},G));
    return {G,c,n,mito,gly,rer,x0,x1,y0,y1}});
  const top=cellRow(150,sy0-22,true),bot=cellRow(sy1+22,780,false);
  const endo=[];[[sy0-6],[sy1+6]].forEach(([y])=>{for(let x=120;x<1580;x+=60)endo.push(el('line',{x1:x,y1:y,x2:x+44,y2:y,stroke:'#9E5A5A','stroke-width':5,'stroke-linecap':'round'},g))});
  const can=[top,bot].map(row=>row.slice(0,4).map(c=>{const x=c.x1+4,y=(c.y0+c.y1)/2;el('ellipse',{cx:x,cy:y,rx:6,ry:12,fill:'#C5E1A5',stroke:BILE,'stroke-width':2},g);[y-16,y+16].forEach(yy=>el('line',{x1:x-6,y1:yy,x2:x+6,y2:yy,stroke:'#263238','stroke-width':3},g));return [x,y]}));
  const kup=el('path',{d:'M700,440 C730,428 790,436 800,452 C830,450 840,470 812,482 C800,498 740,496 728,484 C700,486 690,460 700,440Z',fill:'#A1887F',stroke:'#5D4037','stroke-width':2},g);el('circle',{cx:760,cy:462,r:12,fill:NUC},g);
  const stel=el('path',{d:'M1150,404 C1180,396 1230,398 1250,406 L1252,414 C1220,418 1180,418 1150,412Z',fill:'#FFF8E1',stroke:'#BCAAA4','stroke-width':2},g);[1170,1195,1222].forEach(x=>el('circle',{cx:x,cy:409,r:5,fill:'#FFE082',stroke:'#FFB300','stroke-width':1},g));
  const rbc=[...Array(7)].map(()=>{const G=el('g',{},g);el('ellipse',{rx:40,ry:16,fill:RBC},G);el('ellipse',{rx:22,ry:6,fill:'#E57373'},G);return G});
  const mol=[...Array(14)].map(()=>el('circle',{r:4,fill:'#FFD54F'},g)),bil=[...Array(8)].map(()=>el('circle',{r:3.5,fill:'#33691E'},g));
  sbar(g,1380,830,10*pxu,'10 µm');note(g,U('Qon portal triadadan markaziy venaga oqadi →','Blood flows from portal triad to central vein →'),850,128);note(g,U('Elektron mikroskop sxemasi (TEM uslubi); o‘lchamlar real nisbatda, Disse bo‘shlig‘i (~0,2–0,5 µm) kattalashtirilgan','EM schematic (TEM style); true proportions except the space of Disse (~0.2–0.5 µm), enlarged'),700,870);
  Object.assign(A,{hepatocyteC:{el:top[1].c,fx:.2,fy:0},sinusoid:[400,465],endothelium:[300,sy0-6],disse:[560,sy0-14],kupffer:{el:kup,fx:.5,fy:1},stellate:{el:stel,fx:.6,fy:0},canaliculus:can[0][1],nucleusH:{el:top[2].n,fx:.5,fy:0},mitoH:{el:top[3].mito[0]},glycogen:{el:top[0].gly[2]},rerH:{el:top[4].rer},microvilliH:[1000,sy0-26],rbcL:{el:rbc[2]}});
  const R0={anchors:A,core:['hepatocyteC','sinusoid','endothelium','disse','kupffer','stellate','canaliculus','nucleusH','mitoH','glycogen'],update(lt){rbc.forEach((G,i)=>{const x=120+((lt*90+i*230)%1460);G.setAttribute('transform',`translate(${f2(x)} ${f2(465+Math.sin(i*2.1)*14)})`);G.setAttribute('opacity',x<160||x>1540?0:1)});
    mol.forEach((c,i)=>{const q=(lt*.25+i/14)%1,x=180+(i*97)%1300,up=i%2;const y=up?lerp(465,330,q):lerp(465,600,q);at(c,{cx:f2(x),cy:f2(y),opacity:f2(Math.sin(Math.PI*q))})});
    bil.forEach((c,i)=>{const row=i%2?can[1]:can[0],p=row[i%4];const q=(lt*.4+i/8)%1;at(c,{cx:f2(p[0]),cy:f2(p[1]-14+q*28),opacity:f2(Math.sin(Math.PI*q))})})}};R0.update(0);return R0});
/* ---------- PANCREATIC ISLET (human: β ≈ 50–60 %, α ≈ 30–40 %, δ < 10 %, PP < 5 %; islet ≈ 100–200 µm) ---------- */
KIT.names(NAMES.uz,{isletI:'Langergans orolchasi (~150 µm)',acinus:'Atsinus (ekzokrin qism, ferment ishlab chiqaradi)',zymogen:'Zimogen donachalari (ferment oldi)',ductI:'Interkalyar yo‘lcha',capI:'Teshikli kapillyar',betaC:'β-hujayra — insulin',alphaC:'α-hujayra — glyukagon',deltaC:'δ-hujayra — somatostatin',ppC:'PP-hujayra — pankreatik polipeptid',
  glut:'GLUT1 (odamda; kemiruvchilarda GLUT2)',glycol:'Glikoliz → ATF↑',katp:'K-ATF kanali yopiladi',depol:'Depolyarizatsiya',cachan:'Ca²⁺ kanali ochiladi',granule:'Insulin donachasi → ekzotsitoz',glucoseL:'Qonda glyukoza',insulinL:'Insulin',glucagonL:'Glyukagon'});
KIT.names(NAMES.en,{isletI:'Islet of Langerhans (~150 µm)',acinus:'Acinus (exocrine, makes enzymes)',zymogen:'Zymogen granules',ductI:'Intercalated duct',capI:'Fenestrated capillary',betaC:'β-cell — insulin',alphaC:'α-cell — glucagon',deltaC:'δ-cell — somatostatin',ppC:'PP-cell — pancreatic polypeptide',
  glut:'GLUT1 (human; GLUT2 in rodents)',glycol:'Glycolysis → ATP↑',katp:'K-ATP channel closes',depol:'Depolarisation',cachan:'Ca²⁺ channel opens',granule:'Insulin granule → exocytosis',glucoseL:'Blood glucose',insulinL:'Insulin',glucagonL:'Glucagon'});
SM.items.islet=preset(1700,900,(g,it)=>{const k=it.kind||'histology',A={};if(!['histology','glucose'].includes(k))SERR.push(`islet: kind "${k}" → histology, glucose`);
  const rnd=KIT.rng(77);
  if(k==='histology'){const cx=760,cy=450,FR=430,IR=210;// 2.8 px/µm
    const F=clipTo(g,['circle',{cx,cy,r:FR}]);el('circle',{cx,cy,r:FR,fill:'#F3D9E6'},F);
    const acini=[];for(let y=cy-FR;y<cy+FR+60;y+=104)for(let x=cx-FR-60;x<cx+FR+60;x+=118){const ox=x+((Math.round((y-cy)/104)%2)?59:0)+(rnd()-.5)*18,oy=y+(rnd()-.5)*14;if(Math.hypot(ox-cx,oy-cy)<IR+48)continue;const G=el('g',{},F);const n=6+Math.floor(rnd()*3),rot=rnd()*TAU,sz=46+rnd()*14;
      for(let i=0;i<n;i++){const a=i/n*TAU+rot+(rnd()-.5)*.25;const w=TAU/n/2*.92,r1=sz*(.9+rnd()*.2);const p=[[0,0],[Math.cos(a-w)*r1,Math.sin(a-w)*r1],[Math.cos(a+w)*r1,Math.sin(a+w)*r1]];el('path',{d:`M${f2(ox+p[0][0])},${f2(oy+p[0][1])} L${f2(ox+p[1][0])},${f2(oy+p[1][1])} L${f2(ox+p[2][0])},${f2(oy+p[2][1])}Z`,fill:'#9C5BA8',stroke:'#E9C9DD','stroke-width':2},G);
        el('path',{d:`M${f2(ox)},${f2(oy)} L${f2(ox+Math.cos(a-.3)*24)},${f2(oy+Math.sin(a-.3)*24)} L${f2(ox+Math.cos(a+.3)*24)},${f2(oy+Math.sin(a+.3)*24)}Z`,fill:'#E46A8A'},G);el('circle',{cx:f2(ox+Math.cos(a)*40),cy:f2(oy+Math.sin(a)*40),r:6,fill:'#3B1F5C'},G)}
      el('circle',{cx:ox,cy:oy,r:5,fill:'#FFF'},G);acini.push(G)}
    const isl=el('circle',{cx,cy,r:IR,fill:'#EED9E4',stroke:'#D7B6C8','stroke-width':3},F);const thin=el('circle',{cx,cy,r:IR+6,fill:'none',stroke:'#C9A7BA','stroke-width':3},F);
    const cap=el('path',{d:`M${cx-IR},${cy-40} C${cx-100},${cy-120} ${cx-20},${cy+40} ${cx+60},${cy-60} S${cx+170},${cy+30} ${cx+IR},${cy+20} M${cx-60},${cy+IR} C${cx-50},${cy+80} ${cx+40},${cy+120} ${cx+90},${cy+20}`,fill:'none',stroke:'#F8BBD0','stroke-width':16},F);
    [[cx-130,cy-62],[cx+60,cy-58],[cx+150,cy+12],[cx-40,cy+110]].forEach(([x,y])=>el('ellipse',{cx:x,cy:y,rx:10,ry:5,fill:'#D32F2F'},F));
    const cells=[];const sp=34;for(let y=cy-IR+16;y<cy+IR;y+=sp*.87)for(let x=cx-IR+16;x<cx+IR;x+=sp){const ox=x+((Math.round((y-cy)/(sp*.87))%2)?sp/2:0);const r=Math.hypot(ox-cx,y-cy);if(r>IR-18)continue;const u=rnd();cells.push({x:ox+(rnd()-.5)*6,y:y+(rnd()-.5)*6,u,r})}
    const CT=cells.map((c,i)=>{const t=c.u<.58?'b':c.u<.92?'a':c.u<.985?'d':'p';c.t=t;const G=el('g',{},F);const b=el('circle',{cx:f2(c.x),cy:f2(c.y),r:15,fill:'#E7C6D8',stroke:'#C99CB4','stroke-width':1.5},G);el('circle',{cx:f2(c.x),cy:f2(c.y),r:6,fill:'#5E3B78'},G);return {G,b,t}});
    const pick=t=>CT.findIndex(c=>c.t===t);const sb=el('g',{},g);sbar(sb,cx-70,cy+FR+30,140,'50 µm');
    const leg=el('g',{opacity:0},g);[['#43A047',U('insulin (β)','insulin (β)')],['#E53935',U('glyukagon (α)','glucagon (α)')],['#1E88E5',U('somatostatin (δ)','somatostatin (δ)')],['#FDD835',U('PP','PP')]].forEach(([c,s],i)=>{el('circle',{cx:1290,cy:300+i*50,r:12,fill:c},leg);txt(leg,T(s),1312,308+i*50,{size:22,color:'ink',weight:600,anchor:'start'})});
    txt(leg,T(U('Immunoflüoressensiya','Immunofluorescence')),1380,250,{size:24,color:'ink'});const mode=note(g,'',cx,40);
    note(g,U('Odam orolchasida α va β hujayralar aralash joylashadi (kemiruvchida β markazda); orolchalar bez massasining ~1–2 %','In human islets α and β cells are intermixed (β-core in rodents); islets ≈ 1–2 % of pancreatic mass'),cx,880);
    Object.assign(A,{isletI:[cx+IR*.7,cy-IR*.7],acinus:{el:acini[3],fx:.5,fy:.5},zymogen:{el:acini[5],fx:.5,fy:.5},capI:{el:cap,fx:.6,fy:.3},betaC:{el:CT[pick('b')].b},alphaC:{el:CT[pick('a')].b},deltaC:{el:CT[pick('d')].b}});
    const R0={anchors:A,core:['isletI','acinus','zymogen','capI','betaC','alphaC','deltaC'],update(lt,p,st){const t=((lt-(st||0))%12+12)%12,f=Math.max(0,Math.min(1,(t-4)/1.5))*(t<10.5?1:Math.max(0,1-(t-10.5)/1.5));
      const C={b:'#43A047',a:'#E53935',d:'#1E88E5',p:'#FDD835'};CT.forEach(c=>{c.b.setAttribute('fill',mix('#E7C6D8',C[c.t],f));c.b.setAttribute('stroke',mix('#C99CB4',dark(C[c.t],.3),f))});
      acini.forEach(a=>a.setAttribute('opacity',f2(1-f*.75)));leg.setAttribute('opacity',f2(f));mode.textContent=T(f>.5?U('Immunoflüoressensiya: gormonlar bo‘yicha bo‘yalgan','Immunofluorescence: stained by hormone'):U('Gematoksilin–eozin (H&E): orolcha och rangli','Haematoxylin–eosin (H&E): islet stains pale'))}};R0.update(0,0,0);return R0}
  // ---- glucose: stimulus–secretion coupling + feedback over a meal ----
  const bx=380,by=470,br=260;const cell=el('path',{d:`M${bx-br},${by} C${bx-br},${by-br*.9} ${bx+br},${by-br*.9} ${bx+br},${by} C${bx+br},${by+br*.85} ${bx-br},${by+br*.85} ${bx-br},${by}Z`,fill:'#E8F5E9',stroke:'#43A047','stroke-width':6},g);
  el('circle',{cx:bx-40,cy:by+20,r:70,fill:'#C5CAE9',stroke:'#5C6BC0','stroke-width':3},g);
  const mem=(x,y,a,c)=>{const G=el('g',{transform:`translate(${x} ${y}) rotate(${a})`},g);el('rect',{x:-16,y:-26,width:14,height:52,rx:5,fill:c},G);el('rect',{x:2,y:-26,width:14,height:52,rx:5,fill:c},G);return G};
  const gl=mem(bx-br+4,by-30,0,'#8D6E63'),ka=mem(bx-50,by-br*.66,90,'#7E57C2'),ca=mem(bx+br-4,by+40,0,'#26A69A');
  const kGate=el('rect',{x:bx-58,y:by-br*.66-6,width:16,height:12,fill:'#311B92'},g);
  const glu=[...Array(8)].map(()=>el('circle',{r:9,fill:'#FFA000'},g)),atp=[...Array(6)].map(()=>txt(g,'ATF',0,0,{size:16,color:'#6A1B9A'})),kI=[...Array(4)].map(()=>txt(g,'K⁺',0,0,{size:18,color:'#4527A0'})),caI=[...Array(6)].map(()=>txt(g,'Ca²⁺',0,0,{size:18,color:'#00796B'}));
  const gran=[...Array(14)].map((_,i)=>{const a=i/14*TAU,r=110+(i%3)*40;return {x0:bx+60+Math.cos(a)*r*.7,y0:by+Math.sin(a)*r*.6,el:el('circle',{r:13,fill:'#FFF',stroke:'#2E7D32','stroke-width':3},g),core:el('circle',{r:6,fill:'#2E7D32'},g)}});
  const vm=txt(g,'',bx,by+br*.95,{size:24,color:'a2'});
  const c0=900,c1=1620,ys=[[160,330],[400,520],[590,710]];const H=6,TT=it.cycle||18;const tX=h=>c0+h/H*(c1-c0);
  // minimal-model style kinetics (mmol/L, minutes); meal at 60 min
  const Ra=m=>{const t=m-60;return t>0?10*t/(25*25)*Math.exp(-t/25)*25:0};const S=sim(H*60,.5,(s,m,dt)=>{const [G,I]=s;const dG=Ra(m)/6-(0.012+0.005*I)*(G-4.8);const dI=1.4*Math.max(0,G-4.8)-0.12*(I-6);return [G+dG*dt,I+dI*dt]},[4.8,6]);
  const gc=m=>{const G=S(m)[0];return 60*(1-0.55*Math.tanh((G-4.8)/1.4))};
  const plot=(fn,[y0,y1],lo,hi,col)=>{let d='';for(let i=0;i<=240;i++){const h=i/240*H;const v=fn(h*60);d+=(i?' L':'M')+f2(tX(h))+','+f2(y1-(v-lo)/(hi-lo)*(y1-y0))}return el('path',{d,fill:'none',stroke:col,'stroke-width':4},g)};
  [[ys[0],[3,10]],[ys[1],[0,60]],[ys[2],[20,90]]].forEach(([[y0,y1]])=>{el('rect',{x:c0,y:y0,width:c1-c0,height:y1-y0,fill:'#0D1B2A',stroke:TH.faint,'stroke-width':1.5},g)});
  el('rect',{x:c0,y:ys[0][1]-(5.6-3)/7*(ys[0][1]-ys[0][0]),width:c1-c0,height:(5.6-3.9)/7*(ys[0][1]-ys[0][0]),fill:'#43A047',opacity:.12},g);
  const pG=plot(m=>S(m)[0],ys[0],3,10,'#FFA000'),pI=plot(m=>S(m)[1],ys[1],0,60,'#43A047'),pC=plot(gc,ys[2],20,90,'#E53935');
  txt(g,T(U('glyukoza, mmol/L (och yashil — och qoringa me’yor 3,9–5,6)','glucose, mmol/L (band — fasting normal 3.9–5.6)')),c0+8,ys[0][0]-12,{size:20,color:'#FFA000',anchor:'start'});txt(g,T(U('insulin, mkU/mL','insulin, µU/mL')),c0+8,ys[1][0]-12,{size:20,color:'#43A047',anchor:'start'});txt(g,T(U('glyukagon, pg/mL','glucagon, pg/mL')),c0+8,ys[2][0]-12,{size:20,color:'#E53935',anchor:'start'});
  for(let h=0;h<=H;h++)txt(g,`${h} ${T(U('soat','h'))}`,tX(h),ys[2][1]+30,{size:18,color:'dim',weight:600});el('path',{d:`M${tX(1)},${ys[0][0]-4} l0,-24`,stroke:'#fff','stroke-width':3,'marker-end':arrowMarker('ink')},g);txt(g,T(U('ovqat','meal')),tX(1),ys[0][0]-34,{size:20,color:'ink'});
  const cur=el('line',{y1:ys[0][0],y2:ys[2][1],stroke:'#fff','stroke-width':2,opacity:.6},g);
  note(g,U('Model: soddalashtirilgan minimal model (Bergman uslubida); sonlar sog‘lom odam uchun taxminiy','Model: simplified minimal model (Bergman-type); values approximate for a healthy adult'),1260,870);
  const ST={g:[0,0]};Object.assign(A,{betaC:{el:cell,fx:.15,fy:.2},glut:{el:gl,fx:0,fy:.5},glycol:[bx+40,by-60],katp:{el:ka,fx:.5,fy:0},cachan:{el:ca,fx:1,fy:.5},granule:()=>ST.g,glucoseL:{el:pG,fx:.35,fy:.1},insulinL:{el:pI,fx:.4,fy:.1},glucagonL:{el:pC,fx:.7,fy:.1},depol:[bx+br*.6,by-br*.55]});
  const R0={anchors:A,core:['glut','glycol','katp','cachan','granule','glucoseL','insulinL','glucagonL'],sides:{glucoseL:'right',insulinL:'right',glucagonL:'right'},update(lt,p,st){const t=((lt-(st||0))%TT+TT)%TT,h=t/TT*H,m=h*60;const [G,I]=S(m);const ex=Math.max(0,Math.min(1,(G-5)/2.2));
    at(cur,{x1:f2(tX(h)),x2:f2(tX(h))});kGate.setAttribute('opacity',f2(ex));
    glu.forEach((c,i)=>{const q=(lt*.5+i/8)%1;const n=Math.round(2+G);at(c,{cx:f2(bx-br-60+q*180),cy:f2(by-30+(i%3-1)*14),opacity:f2(i<n?Math.sin(Math.PI*q):0)})});
    atp.forEach((c,i)=>{const q=(lt*.4+i/6)%1;at(c,{x:f2(bx-60+i*22),y:f2(by-40-q*90),opacity:f2(ex*Math.sin(Math.PI*q))})});
    kI.forEach((c,i)=>{const q=(lt*.6+i/4)%1;at(c,{x:f2(bx-50+(i-1.5)*10),y:f2(by-br*.66-q*70),opacity:f2((1-ex)*Math.sin(Math.PI*q))})});
    caI.forEach((c,i)=>{const q=(lt*.5+i/6)%1;at(c,{x:f2(bx+br+50-q*120),y:f2(by+40+(i%3-1)*18),opacity:f2(ex*Math.sin(Math.PI*q))})});
    gran.forEach((o,i)=>{const q=(lt*.35+i/14)%1;const go=ex>i/14*1.2;const x=go?lerp(o.x0,bx+(o.x0-bx)*1.6,q):o.x0,y=go?lerp(o.y0,by+(o.y0-by)*1.75,q):o.y0;at(o.el,{cx:f2(x),cy:f2(y),opacity:f2(go?1-q:1)});at(o.core,{cx:f2(x),cy:f2(y),opacity:f2(go?1-q:1)});if(i===0)ST.g=[x,y-13]});
    vm.textContent=T(U(`Glyukoza ${G.toFixed(1)} mmol/L → membrana potensiali ≈ ${Math.round(-70+30*ex)} mV · insulin ${Math.round(I)} mkU/mL`,`Glucose ${G.toFixed(1)} mmol/L → membrane ≈ ${Math.round(-70+30*ex)} mV · insulin ${Math.round(I)} µU/mL`))}};R0.update(0,0,0);return R0});
/* ---------- RETINA (≈0.2–0.25 mm thick outside fovea; light passes inner layers first) ---------- */
KIT.names(NAMES.uz,{rodR:'Tayoqcha (qorong‘ida ko‘rish)',coneR:'Kolbacha (rang, o‘tkirlik)',bipolarR:'Bipolyar hujayra',ganglionR:'Ganglioz hujayra (akson → ko‘ruv nervi)',horizR:'Gorizontal hujayra',amacR:'Amakrin hujayra',mullerR:'Myuller gliyasi',rpeR:'Pigment epiteliy (melanin)',choroidR:'Tomirli parda (xorioidea)',lightR:'Yorug‘lik (shishasimon tana tomondan)',signalR:'Signal — teskari yo‘nalishda',foveaR:'Markaziy chuqurcha (fovea)',
  rhodo:'Rodopsin (opsin + retinal)',retinal:'Retinal: 11-cis → all-trans',transducin:'Transdutsin (Gα·GTP)',pde:'Fosfodiesteraza PDE6',cgmp:'cGMF (sikl. GMF)',cng:'cGMF bilan ochiluvchi kanal (Na⁺, Ca²⁺)',discM:'Disk membranasi',plasmaM:'Plazmatik membrana',vmR:'Membrana potensiali',gluR:'Glutamat ajralishi'});
KIT.names(NAMES.en,{rodR:'Rod (scotopic vision)',coneR:'Cone (colour, acuity)',bipolarR:'Bipolar cell',ganglionR:'Ganglion cell (axon → optic nerve)',horizR:'Horizontal cell',amacR:'Amacrine cell',mullerR:'Müller glia',rpeR:'Pigment epithelium (melanin)',choroidR:'Choroid',lightR:'Light (from vitreous side)',signalR:'Signal — opposite direction',foveaR:'Fovea centralis',
  rhodo:'Rhodopsin (opsin + retinal)',retinal:'Retinal: 11-cis → all-trans',transducin:'Transducin (Gα·GTP)',pde:'Phosphodiesterase PDE6',cgmp:'cGMP',cng:'cGMP-gated channel (Na⁺, Ca²⁺)',discM:'Disc membrane',plasmaM:'Plasma membrane',vmR:'Membrane potential',gluR:'Glutamate release'});
SM.items.retina=preset(1700,900,(g,it)=>{const k=it.kind||'layers',A={};if(!['layers','photo'].includes(k))SERR.push(`retina: kind "${k}" → layers, photo`);
  const ROD='#B39DDB',CONE='#4FC3F7',NUC='#5E35B1',BIP='#81C784',GAN='#FFB74D',PIG='#4E342E',YEL='#FFE082',SIGC='#00E5FF';
  if(k==='layers'){const X0=60,X1=860;
    const LY=[['ilm',118,122],['nfl',122,160],['gcl',160,215],['ipl',215,295],['inl',295,385],['opl',385,420],['onl',420,530],['olm',529,532],['seg',532,700],['rpe',700,740],['cho',744,810]];
    const LN={nfl:U('Nerv tolalari qavati','Nerve fibre layer'),gcl:U('Ganglioz hujayralar qavati','Ganglion cell layer'),ipl:U('Ichki to‘rsimon qavat','Inner plexiform layer'),inl:U('Ichki yadroli qavat','Inner nuclear layer'),opl:U('Tashqi to‘rsimon qavat','Outer plexiform layer'),onl:U('Tashqi yadroli qavat','Outer nuclear layer'),seg:U('Fotoretseptor segmentlari','Photoreceptor segments'),rpe:U('Pigment epiteliy','Pigment epithelium'),cho:U('Xorioidea','Choroid'),ilm:U('Ichki chegara membrana','Inner limiting membrane'),olm:U('Tashqi chegara membrana','Outer limiting membrane')};
    const BG={nfl:'#3B4A6B',gcl:'#2E3A57',ipl:'#3A3550',inl:'#2E3A57',opl:'#3A3550',onl:'#2E3A57',seg:'#28304A',rpe:'#3E2C26',cho:'#4A2230'};
    LY.forEach(([id,y0,y1])=>{if(BG[id])el('rect',{x:X0,y:y0,width:X1-X0,height:y1-y0,fill:BG[id]},g)});
    el('line',{x1:X0,y1:120,x2:X1,y2:120,stroke:'#90A4AE','stroke-width':3},g);el('line',{x1:X0,y1:531,x2:X1,y2:531,stroke:'#90A4AE','stroke-width':2,'stroke-dasharray':'6 4'},g);el('line',{x1:X0,y1:742,x2:X1,y2:742,stroke:'#BCAAA4','stroke-width':3},g);
    const C=clipTo(g,['rect',{x:X0,y:100,width:X1-X0,height:720}]);
    // choroid vessels
    [[150,778,38],[400,780,30],[640,776,40],[820,782,26]].forEach(([x,y,r])=>{el('ellipse',{cx:x,cy:y,rx:r*1.9,ry:r*.75,fill:'#7F1D2D',stroke:'#B71C1C','stroke-width':3},C);for(let j=-1;j<=1;j++)el('ellipse',{cx:x+j*r*.9,cy:y,rx:9,ry:5,fill:'#E53935'},C)});
    // RPE cells
    for(let x=X0;x<X1;x+=56){el('rect',{x:x+2,y:702,width:52,height:37,rx:6,fill:'#6D4C41',stroke:'#3E2723','stroke-width':2},C);el('ellipse',{cx:x+28,cy:726,rx:9,ry:6,fill:'#3E2723'},C);for(let j=0;j<6;j++)el('circle',{cx:x+8+j*8,cy:708+(j%2)*5,r:2.6,fill:'#1B0F0B'},C)}
    // photoreceptors
    const PR=[];let col=0;for(let x=X0+12;x<X1-6;x+=22,col++){const cone=col%5===2;const ny=430+((col*37)%86);
      el('line',{x1:x,y1:ny,x2:x,y2:400,stroke:cone?CONE:ROD,'stroke-width':2.5},C);el('line',{x1:x,y1:ny,x2:x,y2:532,stroke:cone?CONE:ROD,'stroke-width':2.5},C);
      const n=el('ellipse',{cx:x,cy:ny,rx:cone?9:7,ry:cone?10:8,fill:NUC,stroke:'#9575CD','stroke-width':1.5},C);
      const term=el(cone?'path':'circle',cone?{d:`M${x-9},${398} L${x+9},${398} L${x+6},${410} L${x-6},${410}Z`,fill:cone?CONE:ROD}:{cx:x,cy:404,r:5,fill:ROD},C);
      let os;if(cone){el('rect',{x:x-8,y:532,width:16,height:78,rx:6,fill:'#29B6F6',opacity:.85},C);os=el('path',{d:`M${x-8},610 L${x+8},610 L${x+1.5},672 L${x-1.5},672Z`,fill:CONE},C)}
      else{el('rect',{x:x-5,y:532,width:10,height:70,rx:4,fill:'#9575CD',opacity:.85},C);os=el('rect',{x:x-5,y:602,width:10,height:100,rx:3,fill:ROD},C);for(let yy=610;yy<700;yy+=10)el('line',{x1:x-4,y1:yy,x2:x+4,y2:yy,stroke:'#7E57C2','stroke-width':1.2},C)}
      PR.push({x,cone,ny,n,os})}
    // Müller glia
    const mul=[220,640].map(x=>el('path',{d:`M${x-6},121 C${x-2},200 ${x+5},300 ${x},400 C${x-4},470 ${x+4},500 ${x},531`,fill:'none',stroke:'#B0BEC5','stroke-width':5,opacity:.7},C));
    // horizontal & amacrine
    const hor=[[180,372],[560,374]].map(([x,y])=>{el('path',{d:`M${x-110},404 C${x-60},392 ${x-30},380 ${x},${y} C${x+30},380 ${x+60},392 ${x+110},404`,fill:'none',stroke:'#F48FB1','stroke-width':3},C);return el('ellipse',{cx:x,cy:y,rx:16,ry:10,fill:'#F06292',stroke:'#AD1457','stroke-width':2},C)});
    const ama=[[360,306],[760,306]].map(([x,y])=>{el('path',{d:`M${x},${y} C${x-30},250 ${x-80},250 ${x-120},262 M${x},${y} C${x+30},250 ${x+80},250 ${x+120},262 M${x},${y} L${x},240`,fill:'none',stroke:'#CE93D8','stroke-width':3},C);return el('ellipse',{cx:x,cy:y,rx:15,ry:11,fill:'#BA68C8',stroke:'#6A1B9A','stroke-width':2},C)});
    // IPL / OPL synaptic texture
    for(let i=0;i<70;i++){const x=X0+((i*53)%(X1-X0)),y=225+((i*31)%62);el('circle',{cx:x,cy:y,r:2,fill:'#9FA8DA',opacity:.5},C)}
    for(let i=0;i<40;i++){const x=X0+((i*71)%(X1-X0)),y=390+((i*17)%26);el('circle',{cx:x,cy:y,r:2,fill:'#9FA8DA',opacity:.5},C)}
    // bipolar & ganglion chains
    const CH=[];for(let j=0;j<12;j++){const p=PR[j*3+1]||PR[PR.length-1],bx=p.x+8,by=338+((j*23)%30);
      el('path',{d:`M${bx},${by} L${bx-8},400 M${bx},${by} L${bx+10},400 M${bx},${by} L${bx},250`,fill:'none',stroke:BIP,'stroke-width':3},C);const bc=el('ellipse',{cx:bx,cy:by,rx:9,ry:13,fill:BIP,stroke:'#2E7D32','stroke-width':2},C);
      const gx=bx+(j%2?14:-10),gy=188;el('path',{d:`M${gx},${gy} C${gx-10},230 ${bx-20},250 ${bx},255 M${gx},${gy} C${gx+10},230 ${bx+30},250 ${bx+40},262`,fill:'none',stroke:GAN,'stroke-width':3},C);
      el('path',{d:`M${gx},${gy-14} C${gx},150 ${gx+20},${142+j%3*5} ${gx+60},${142+j%3*5} L${X1+10},${142+j%3*5}`,fill:'none',stroke:'#FFCC80','stroke-width':2.5,opacity:.8},C);
      const gc=el('circle',{cx:gx,cy:gy,r:17,fill:GAN,stroke:'#E65100','stroke-width':2},C);el('circle',{cx:gx,cy:gy,r:6,fill:'#6D4C41'},C);CH.push({p,bx,by,gx,gy,bc,gc,ay:142+j%3*5})}
    // light & signal sprites
    const ph=[...Array(8)].map(()=>el('path',{d:'M0,-22 q6,5.5 0,11 q-6,5.5 0,11',fill:'none',stroke:YEL,'stroke-width':3.5,'stroke-linecap':'round'},g));
    const sg=[...Array(8)].map(()=>el('circle',{r:7,fill:SIGC,stroke:'#fff','stroke-width':2},g));
    // layer captions
    LY.forEach(([id,y0,y1])=>{const ym=(y0+y1)/2,isM=id==='ilm'||id==='olm';const yy=id==='ilm'?104:id==='olm'?ym:ym;if(id==='ilm'){txt(g,T(LN.ilm),X1+14,108,{size:18,color:'dim',weight:600,anchor:'start'});return}
      if(!isM)el('path',{d:`M${X1+6},${y0+3} l8,0 l0,${y1-y0-6} l-8,0`,fill:'none',stroke:TH.faint,'stroke-width':2},g);txt(g,T(LN[id]),X1+22,ym+6,{size:isM?18:23,color:isM?'dim':'ink',weight:600,anchor:'start'})});
    sbar(g,X0+10,860,140,'50 µm');
    note(g,U('Fovea tashqarisidagi to‘r parda (~0,25 mm). Hujayralar soni kamaytirilgan; kolbachalar ulushi ko‘paytirib ko‘rsatilgan (periferiyada ~1:20)','Retina outside the fovea (~0.25 mm). Cell numbers reduced; cone share exaggerated (periphery ~1:20)'),700,895,{size:19});
    // fovea inset
    const fx0=1410,fx1=1650,fy=440;el('rect',{x:fx0-20,y:fy-90,width:fx1-fx0+40,height:230,rx:14,fill:'#0D1B2A',stroke:TH.faint,'stroke-width':1.5},g);
    const prof=(x,top)=>{const u=(x-(fx0+fx1)/2)/34;const pit=Math.exp(-u*u);return top?fy-55+48*pit+(Math.abs(u)<3?-8*Math.exp(-((Math.abs(u)-1.4)**2)):0):fy+55};let dT='',dB='';for(let x=fx0;x<=fx1;x+=4){dT+=(x===fx0?'M':'L')+x+','+f2(prof(x,1))}
    const fov=el('path',{d:dT+` L${fx1},${fy+30} L${fx0},${fy+30}Z`,fill:'#3A3550',stroke:'#90A4AE','stroke-width':2},g);el('rect',{x:fx0,y:fy+30,width:fx1-fx0,height:22,fill:'#28304A'},g);
    for(let x=fx0+4;x<fx1;x+=8){const u=(x-(fx0+fx1)/2)/34;el('line',{x1:x,y1:fy+31,x2:x,y2:fy+51,stroke:Math.abs(u)<.9?CONE:(x%24===4?CONE:ROD),'stroke-width':3},g)}el('rect',{x:fx0,y:fy+52,width:fx1-fx0,height:10,fill:'#6D4C41'},g);
    [U('Fovea (~1,5 mm):','Fovea (~1.5 mm):'),U('ichki qavatlar chetga surilgan,','inner layers displaced,'),U('markazda faqat kolbachalar','only cones at the centre')].forEach((l,i)=>txt(g,T(l),(fx0+fx1)/2,fy-160+i*26,{size:20,color:'dim',weight:600}));
    [U('Odamda: tayoqcha ~92 mln','Human: rods ~92 M'),U('kolbacha ~4,6 mln','cones ~4.6 M'),U('ganglioz aksonlari ~1,2 mln','ganglion axons ~1.2 M')].forEach((l,i)=>txt(g,T(l),(fx0+fx1)/2,fy+178+i*28,{size:20,color:'dim',weight:600}));
    Object.assign(A,{rodR:{el:PR[0].os,fx:.5,fy:.5},coneR:{el:PR[2].os,fx:.5,fy:.4},bipolarR:{el:CH[4].bc},ganglionR:{el:CH[6].gc},horizR:{el:hor[0]},amacR:{el:ama[1]},mullerR:[640,470],rpeR:[480,720],choroidR:[400,780],lightR:()=>ST.l,signalR:()=>ST.s,foveaR:{el:fov,fx:.5,fy:.3}});
    const ST={l:[300,150],s:[300,300]};const TT=6;
    const path=(c,q)=>{const P=[[c.p.x,650],[c.p.x,c.p.ny],[c.p.x,402],[c.bx,c.by],[c.bx,252],[c.gx,c.gy],[c.gx,c.ay],[X1,c.ay]];const L=[0];for(let i=1;i<P.length;i++)L.push(L[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]));const s=q*L[L.length-1];let i=1;while(i<L.length-1&&L[i]<s)i++;const u=(s-L[i-1])/(L[i]-L[i-1]||1);return [lerp(P[i-1][0],P[i][0],u),lerp(P[i-1][1],P[i][1],u)]};
    const R0={anchors:A,core:['rodR','coneR','bipolarR','ganglionR','horizR','amacR','rpeR','lightR','signalR','foveaR'],update(lt){ph.forEach((p,i)=>{const c=CH[(i*3+1)%CH.length],t=((lt+i*.75)%TT+TT)%TT;const q=Math.min(1,t/2);const y=lerp(70,640,q);p.setAttribute('transform',`translate(${f2(c.p.x)} ${f2(y)})`);p.setAttribute('opacity',f2(t<2?1:0));if(i===2)ST.l=[c.p.x,Math.min(y,200)]});
      sg.forEach((s,i)=>{const c=CH[(i*3+1)%CH.length],t=((lt+i*.75)%TT+TT)%TT;const on=t>2&&t<5.8;const [x,y]=path(c,Math.max(0,Math.min(1,(t-2)/3.6)));at(s,{cx:f2(x),cy:f2(y),opacity:on?1:0});if(i===2&&on)ST.s=[x,y];
        c.p.os.setAttribute('opacity',f2(t>1.9&&t<2.6?1:.85));c.gc.setAttribute('stroke-width',t>4.2&&t<4.8?6:2)})}};R0.update(0);return R0}
  // ---- phototransduction in rod outer segment ----
  const DY=520,PX=900,TT=it.cycle||12;
  el('rect',{x:60,y:110,width:PX-60,height:DY-110,fill:'#1E2A40'},g);el('rect',{x:60,y:DY+30,width:PX-60,height:250,fill:'#2A2140'},g);
  txt(g,T(U('Sitozol (tashqi segment)','Cytosol (outer segment)')),90,140,{size:20,color:'dim',weight:600,anchor:'start'});txt(g,T(U('Disk ichi','Disc lumen')),90,DY+70,{size:20,color:'dim',weight:600,anchor:'start'});txt(g,T(U('Hujayradan tashqari','Extracellular')),PX+50,770,{size:20,color:'dim',weight:600,anchor:'start'});
  const disc=el('rect',{x:60,y:DY,width:PX-120,height:30,fill:'#7E57C2',opacity:.6},g);for(let x=66;x<PX-60;x+=12){el('circle',{cx:x,cy:DY+4,r:4,fill:'#B39DDB'},g);el('circle',{cx:x,cy:DY+26,r:4,fill:'#B39DDB'},g)}
  const pm=el('rect',{x:PX,y:110,width:30,height:670,fill:'#7E57C2',opacity:.6},g);for(let y=116;y<780;y+=12){el('circle',{cx:PX+4,cy:y,r:4,fill:'#B39DDB'},g);el('circle',{cx:PX+26,cy:y,r:4,fill:'#B39DDB'},g)}
  // rhodopsin: 7 TM helices
  const RX=200;const rh=el('g',{},g);for(let i=0;i<7;i++)el('rect',{x:RX-52+i*15,y:DY-16,width:12,height:62,rx:6,fill:'#9575CD',stroke:'#4527A0','stroke-width':2},rh);
  const ret=el('path',{d:`M${RX-30},${DY+16} l14,-8 l14,8 l14,-8 l14,8`,fill:'none',stroke:'#FFB300','stroke-width':5,'stroke-linecap':'round'},g);
  // transducin & PDE
  const td=el('g',{},g);el('ellipse',{cx:0,cy:0,rx:34,ry:24,fill:'#26A69A',stroke:'#00695C','stroke-width':2},td);const gtp=el('circle',{cx:22,cy:-14,r:10,fill:'#FFEE58',stroke:'#F9A825','stroke-width':2},td);
  const tbg=el('ellipse',{cx:360,cy:DY-20,rx:28,ry:16,fill:'#4DB6AC',opacity:.7},g);
  const PDX=600;const pde=el('path',{d:`M${PDX-50},${DY} C${PDX-50},${DY-70} ${PDX+50},${DY-70} ${PDX+50},${DY}Z`,fill:'#EF6C00',stroke:'#BF360C','stroke-width':3},g);const pdeA=el('circle',{cx:PDX,cy:DY-40,r:12,fill:'#FFF',opacity:0},g);
  // CNG channel
  const CY=330;const ch1=el('rect',{x:PX-4,y:CY-60,width:38,height:46,rx:8,fill:'#00897B',stroke:'#004D40','stroke-width':2},g),ch2=el('rect',{x:PX-4,y:CY+14,width:38,height:46,rx:8,fill:'#00897B',stroke:'#004D40','stroke-width':2},g);const pore=el('rect',{x:PX,y:CY-14,width:30,height:28,fill:'#1E2A40'},g);
  const cg=[...Array(22)].map(()=>el('path',{d:'M0,-7 L6,-3.5 L6,3.5 L0,7 L-6,3.5 L-6,-3.5Z',fill:'#29B6F6',stroke:'#01579B','stroke-width':1.5},g));
  const gm=[...Array(10)].map(()=>el('path',{d:'M0,-6 L5,-3 L5,3 L0,6 L-5,3 L-5,-3Z',fill:'#78909C'},g));
  const ion=[...Array(8)].map((_,i)=>{const G=el('g',{},g);el('circle',{r:11,fill:i%3?'#FFCA28':'#66BB6A'},G);txt(G,i%3?'Na⁺':'Ca²⁺',0,5,{size:11,color:'#000'});return G});
  const phot=el('path',{d:'M0,0 q8,10 0,20 q-8,10 0,20 q8,10 0,20 q-8,10 0,20',fill:'none',stroke:'#FFF59D','stroke-width':5},g);
  // chart
  const c0=1080,c1=1640,y0=170,y1=470;el('rect',{x:c0,y:y0,width:c1-c0,height:y1-y0,fill:'#0D1B2A',stroke:TH.faint,'stroke-width':1.5},g);
  const cG=t=>{if(t<3.2)return 1;if(t<6)return lerp(1,.12,1-Math.exp(-(t-3.2)/.6));return .12+(1-.12)*(1-Math.exp(-(t-6)/1.4))};const vm=t=>-70+30*Math.pow(cG(t),1.5);const vy=v=>y1-(v+75)/40*(y1-y0);
  [-40,-55,-70].forEach(v=>{el('line',{x1:c0,y1:vy(v),x2:c1,y2:vy(v),stroke:TH.faint,'stroke-dasharray':'4 6'},g);txt(g,v+' mV',c0-10,vy(v)+6,{size:17,color:'dim',weight:600,anchor:'end'})});
  let d='';for(let i=0;i<=200;i++){const t=i/200*TT;d+=(i?'L':'M')+f2(c0+t/TT*(c1-c0))+','+f2(vy(vm(t)))}const vp=el('path',{d,fill:'none',stroke:SIGC,'stroke-width':4},g);
  txt(g,T(U('Tayoqcha membrana potensiali: qorong‘ida ≈ −40 mV, yorug‘da giperpolyarizatsiya','Rod membrane potential: ≈ −40 mV in dark, hyperpolarises in light')),c0,y0-16,{size:19,color:'ink',weight:600,anchor:'start'});
  const cur=el('line',{y1:y0,y2:y1,stroke:'#fff','stroke-width':2,opacity:.7},g);const fl=el('path',{d:`M${c0+3.2/TT*(c1-c0)},${y0-2} l0,-10`,stroke:YEL,'stroke-width':4},g);
  // glutamate bar
  txt(g,T(U('Sinapsdan glutamat ajralishi','Synaptic glutamate release')),c0,560,{size:19,color:'ink',weight:600,anchor:'start'});el('rect',{x:c0,y:580,width:c1-c0,height:30,rx:6,fill:'#0D1B2A',stroke:TH.faint},g);const gb=el('rect',{x:c0,y:580,width:c1-c0,height:30,rx:6,fill:'#AED581'},g);
  const stx=el('text',{x:c0,y:680,'font-size':21,'font-weight':700,fill:TH.ink},g);
  const STP=[[0,U('Qorong‘i: cGMF ko‘p → kanallar ochiq, “qorong‘ulik toki” (~20–35 pA)','Dark: high cGMP → channels open, “dark current” (~20–35 pA)')],[3.2,U('Foton → retinal 11-cis → all-trans, rodopsin faollashadi','Photon → retinal 11-cis → all-trans, rhodopsin activated')],[3.8,U('Transdutsin α·GTP → PDE6 ni faollashtiradi','Transducin α·GTP activates PDE6')],[4.6,U('PDE6: cGMF → GMF, kanallar yopiladi → giperpolyarizatsiya','PDE6: cGMP → GMP, channels close → hyperpolarisation')],[6.2,U('Tiklanish: arrestin, RGS9, guanilatsiklaza (Ca²⁺ ↓ teskari aloqa)','Recovery: arrestin, RGS9, guanylyl cyclase (Ca²⁺↓ feedback)')]];
  note(g,U('Kuchaytirish: 1 faol rodopsin → yuzlab transdutsin; 1 foton ≈ 1 mV javob. Sxema; molekulalar o‘lchami shartli','Amplification: 1 active rhodopsin → hundreds of transducins; 1 photon ≈ 1 mV response. Schematic; molecule sizes not to scale'),850,870,{size:18});
  const ST={c:[400,300]};
  Object.assign(A,{rhodo:{el:rh,fx:.5,fy:1},retinal:{el:ret,fx:.5,fy:.5},transducin:{el:td,fx:.5,fy:0},pde:{el:pde,fx:.7,fy:0},cgmp:()=>ST.c,cng:{el:ch1,fx:.5,fy:0},discM:[760,DY+30],plasmaM:[PX+15,700],vmR:{el:vp,fx:.15,fy:.1},gluR:{el:gb,fx:.8,fy:1}});
  const R0={anchors:A,core:['rhodo','retinal','transducin','pde','cgmp','cng','vmR','gluR'],sides:{vmR:'right',gluR:'right'},update(lt,p,st){const t=((lt-(st||0))%TT+TT)%TT,c=cG(t),act=t>3.2&&t<6.5;
    const pq=Math.max(0,Math.min(1,(t-2.4)/.8));phot.setAttribute('transform',`translate(${RX-40+pq*30} ${lerp(110,DY-90,pq)})`);phot.setAttribute('opacity',t>2.4&&t<3.3?1:0);
    at(ret,{d:t>3.2&&t<7?`M${RX-30},${DY+16} l14,-8 l14,8 l14,-8 l30,0`:`M${RX-30},${DY+16} l14,-8 l14,8 l14,-8 l14,8`,stroke:t>3.2&&t<7?'#FF7043':'#FFB300'});rh.setAttribute('opacity',act?1:.75);
    const tq=Math.max(0,Math.min(1,(t-3.8)/.8));const tx=t<3.8?360:t<6.5?lerp(360,PDX-70,tq):360;td.setAttribute('transform',`translate(${f2(tx)} ${DY-24-(t>3.8&&t<6.5?10:0)})`);at(gtp,{fill:t>3.6&&t<6.5?'#FFEE58':'#B0BEC5'});tbg.setAttribute('opacity',t>3.8&&t<6.5?.35:.7);
    at(pdeA,{opacity:f2(t>4.6&&t<6.5?.6+.4*Math.sin(lt*12):0)});pde.setAttribute('fill',t>4.6&&t<6.5?'#FF9800':'#EF6C00');
    cg.forEach((h,i)=>{const on=i/22<c;const x=120+((i*67+lt*30*(i%2?1:-1))%700+700)%700,y=170+((i*53)%300)+Math.sin(lt+i)*8;h.setAttribute('transform',`translate(${f2(x)} ${f2(y)})`);h.setAttribute('opacity',on?1:0);if(i===3)ST.c=[x,y]});
    gm.forEach((h,i)=>{const on=i/10<(1-c)*1.1;const x=PDX-90+((i*41)%180),y=DY-90-((i*29)%120)+Math.sin(lt*2+i)*5;h.setAttribute('transform',`translate(${f2(x)} ${f2(y)})`);h.setAttribute('opacity',on?.9:0)});
    const op=c>.5;at(pore,{fill:op?'#1E2A40':'#004D40'});ion.forEach((G,i)=>{const q=(lt*.6+i/8)%1;G.setAttribute('transform',`translate(${f2(lerp(PX+150,PX-120,q))} ${f2(CY+(i%3-1)*6+(q>.4&&q<.6?0:(i%3-1)*30))})`);G.setAttribute('opacity',f2(op?Math.sin(Math.PI*q):0))});
    at(cur,{x1:f2(c0+t/TT*(c1-c0)),x2:f2(c0+t/TT*(c1-c0))});at(gb,{width:f2((c1-c0)*Math.max(.05,Math.pow(c,1.5)))});
    let s=STP[0][1];STP.forEach(([t0,l])=>{if(t>=t0)s=l});stx.textContent=T(s)}};R0.update(0,0,0);return R0});
/* ---------- STOMACH (fundic mucosa ≈0.8–1 mm; parietal cell HCl secretion) ---------- */
KIT.names(NAMES.uz,{surfaceS:'Yuza shilliq hujayralar (shilliq + HCO₃⁻)',pitS:'Oshqozon chuqurchasi (foveola)',neckS:'Bo‘yin shilliq hujayralari va o‘zak hujayralar',parietalS:'Qoplovchi (parietal) hujayra — HCl, ichki omil',chiefS:'Bosh hujayra — pepsinogen',eecS:'Enteroendokrin hujayra (ECL — gistamin)',meissnerS:'Shilliq osti (Meyssner) chigali',myentericS:'Mushaklararo (Auerbax) chigali',hclS:'H⁺ (xlorid kislota)',pepS:'Pepsinogen donachalari',mucusS:'Shilliq-bikarbonat to‘siq',
  canal:'Hujayra ichi kanalchasi (mikrovorsinkali)',pump:'H⁺/K⁺-ATFaza (proton nasosi)',tubv:'Tubulovezikulalar (nasos zaxirasi)',mitoP:'Mitoxondriyalar (~34% hajm)',caP:'Karboangidraza: CO₂+H₂O → H⁺+HCO₃⁻',ae2:'Cl⁻/HCO₃⁻ almashtirgich',h2r:'H2-retseptor (gistamin)',m3r:'M3-retseptor (atsetilxolin)',cck2:'CCK2-retseptor (gastrin)',clch:'Cl⁻ va K⁺ kanallari',bloodP:'Kapillyar: “ishqoriy to‘lqin” (HCO₃⁻)'});
KIT.names(NAMES.en,{surfaceS:'Surface mucous cells (mucus + HCO₃⁻)',pitS:'Gastric pit (foveola)',neckS:'Mucous neck cells & stem cells',parietalS:'Parietal (oxyntic) cell — HCl, intrinsic factor',chiefS:'Chief cell — pepsinogen',eecS:'Enteroendocrine cell (ECL — histamine)',meissnerS:'Submucosal (Meissner) plexus',myentericS:'Myenteric (Auerbach) plexus',hclS:'H⁺ (hydrochloric acid)',pepS:'Pepsinogen granules',mucusS:'Mucus–bicarbonate barrier',
  canal:'Intracellular canaliculus (microvilli)',pump:'H⁺/K⁺-ATPase (proton pump)',tubv:'Tubulovesicles (pump reserve)',mitoP:'Mitochondria (~34% of volume)',caP:'Carbonic anhydrase: CO₂+H₂O → H⁺+HCO₃⁻',ae2:'Cl⁻/HCO₃⁻ exchanger',h2r:'H2 receptor (histamine)',m3r:'M3 receptor (acetylcholine)',cck2:'CCK2 receptor (gastrin)',clch:'Cl⁻ and K⁺ channels',bloodP:'Capillary: “alkaline tide” (HCO₃⁻)'});
SM.items.stomach=preset(1700,900,(g,it)=>{const k=it.kind||'wall',A={};if(!['wall','parietal'].includes(k))SERR.push(`stomach: kind "${k}" → wall, parietal`);
  const PAR='#F48FB1',PARd='#C2185B',CHF='#7E57C2',MUC='#E3F2FD',LP='#F3D1D6',NUC='#4A2C6F',HC='#FF5252',PEP='#B388FF';
  if(k==='wall'){const X0=60,X1=900,M0=180,M1=560;
    el('rect',{x:X0,y:96,width:X1-X0,height:54,fill:'#2B3A55'},g);txt(g,T(U('Oshqozon bo‘shlig‘i (pH ≈ 1–2)','Gastric lumen (pH ≈ 1–2)')),X0+16,130,{size:22,color:'ink',weight:600,anchor:'start'});
    const mucus=el('rect',{x:X0,y:150,width:X1-X0,height:30,fill:'#B3E5FC',opacity:.45},g);
    el('rect',{x:X0,y:M0,width:X1-X0,height:M1-M0,fill:LP},g);
    const C=clipTo(g,['rect',{x:X0,y:96,width:X1-X0,height:760}]);
    for(let i=0;i<34;i++){const x=X0+20+((i*97)%(X1-X0-40)),y=300+((i*61)%240);el('ellipse',{cx:x,cy:y,rx:6,ry:3,fill:'#8D6E63',opacity:.6},C)}
    const GX=[];for(let x=120;x<X1-40;x+=118)GX.push(x);
    // surface epithelium between pits
    for(let x=X0;x<X1;x+=16){if(GX.some(gx=>Math.abs(x+8-gx)<18))continue;el('rect',{x:x+1,y:M0,width:14,height:40,fill:MUC,stroke:'#90A4AE','stroke-width':1},C);el('ellipse',{cx:x+8,cy:M0+32,rx:4,ry:5,fill:NUC},C)}
    const glands=GX.map((gx,j)=>{const lum=el('path',{d:`M${gx},${M0} L${gx},${M1-18}`,stroke:'#FFF8F8','stroke-width':6},C);const cells={par:[],chf:[],eec:null,neck:[]};
      for(let y=M0;y<M1-14;y+=24){[-1,1].forEach(sd=>{let col,rx=13,ry=11,ox=15,nx=0,typ;
        if(y<280){col=MUC;rx=8;ry=12;ox=12;typ='pit'}else if(y<330){col='#E1F5FE';typ='neck'}else if(y<470){typ=((y/24|0)+sd+j)%4===0?'chf':'par'}else typ=((y/24|0)+sd+j)%5===0?'par':'chf';
        if(typ==='par'){col=PAR;rx=17;ry=14;ox=20}if(typ==='chf'){col=CHF;rx=13;ry=11;ox=16;nx=sd*6}
        const cx=gx+sd*ox,e=el('ellipse',{cx,cy:y+12,rx,ry,fill:col,stroke:typ==='par'?PARd:'#5E35B1','stroke-width':typ==='pit'||typ==='neck'?1:1.5,opacity:typ==='pit'||typ==='neck'?.95:1},C);
        el('circle',{cx:cx+nx,cy:y+12+(typ==='pit'?6:0),r:typ==='par'?5.5:4.5,fill:NUC},C);if(cells[typ])cells[typ].push(e)})}
      if(j%2===0){const ey=505,e=el('path',{d:`M${gx+10},${ey-10} L${gx+24},${ey} L${gx+10},${ey+12}Z`,fill:'#FFD54F',stroke:'#F57F17','stroke-width':1.5},C);cells.eec=e}
      return {gx,lum,cells}});
    // capillaries in lamina propria
    GX.forEach(gx=>{const x=gx+59;el('path',{d:`M${x},${M1-10} C${x-8},460 ${x+8},380 ${x},${M0+50}`,fill:'none',stroke:'#E53935','stroke-width':4,opacity:.6},C)});
    // muscularis mucosae, submucosa, externa, serosa
    el('rect',{x:X0,y:M1,width:X1-X0,height:24,fill:'#D98A8A'},C);for(let x=X0;x<X1;x+=22)el('ellipse',{cx:x+11,cy:M1+12,rx:8,ry:2.4,fill:'#7B3F3F'},C);
    el('rect',{x:X0,y:M1+24,width:X1-X0,height:106,fill:'#F7E4E1'},C);for(let i=0;i<26;i++){const x=X0+((i*83)%(X1-X0)),y=M1+34+((i*37)%86);el('path',{d:`M${x},${y} q20,-8 40,0`,fill:'none',stroke:'#E3B9B2','stroke-width':3},C)}
    [[260,M1+78,22,'#C62828'],[330,M1+80,30,'#3949AB'],[690,M1+72,20,'#C62828'],[760,M1+76,28,'#3949AB']].forEach(([x,y,r,c])=>{el('circle',{cx:x,cy:y,r,fill:'#FFEBEE',stroke:c,'stroke-width':c==='#C62828'?7:3},C)});
    const meis=el('ellipse',{cx:520,cy:M1+70,rx:26,ry:14,fill:'#FFF59D',stroke:'#F9A825','stroke-width':2},C);[510,522,534].forEach(x=>el('circle',{cx:x,cy:M1+70,r:4,fill:'#795548'},C));
    const E0=M1+130;el('rect',{x:X0,y:E0,width:X1-X0,height:28,fill:'#C97B7B'},C);for(let x=X0-40;x<X1;x+=20)el('line',{x1:x,y1:E0+26,x2:x+24,y2:E0+2,stroke:'#8E4B4B','stroke-width':3},C);
    el('rect',{x:X0,y:E0+28,width:X1-X0,height:60,fill:'#D08A8A'},C);for(let x=X0+6;x<X1;x+=14)for(let y=E0+36;y<E0+84;y+=12)el('circle',{cx:x+((y/12|0)%2)*7,cy:y,r:3,fill:'#8E4B4B'},C);
    const mye=el('ellipse',{cx:600,cy:E0+96,rx:30,ry:9,fill:'#FFF59D',stroke:'#F9A825','stroke-width':2},C);
    el('rect',{x:X0,y:E0+104,width:X1-X0,height:46,fill:'#C97B7B'},C);for(let y=E0+110;y<E0+148;y+=8)el('line',{x1:X0,y1:y,x2:X1,y2:y,stroke:'#8E4B4B','stroke-width':2},C);
    el('rect',{x:X0,y:E0+150,width:X1-X0,height:8,fill:'#ECEFF1'},C);
    // captions
    const LC=[[150,180,U('Shilliq (gel) qavati','Mucus gel layer')],[M0,M1,U('Shilliq qavat (mukoza, ~0,8–1 mm)','Mucosa (~0.8–1 mm)')],[M1,M1+24,U('Mukozaning mushak plastinkasi','Muscularis mucosae')],[M1+24,M1+130,U('Shilliq osti qavat','Submucosa')],[E0,E0+28,U('Qiyshiq mushak','Oblique muscle')],[E0+28,E0+88,U('Halqasimon mushak','Circular muscle')],[E0+104,E0+150,U('Bo‘ylama mushak','Longitudinal muscle')],[E0+150,E0+158,U('Seroza','Serosa')]];
    LC.forEach(([y0,y1,l])=>{el('path',{d:`M${X1+6},${y0+2} l8,0 l0,${Math.max(2,y1-y0-4)} l-8,0`,fill:'none',stroke:TH.faint,'stroke-width':2},g);txt(g,T(l),X1+22,(y0+y1)/2+7,{size:22,color:'ink',weight:600,anchor:'start'})});
    [[M0,280,U('chuqurcha','pit')],[280,330,U('bo‘yin','neck')],[330,470,U('tana','body')],[470,M1,U('asos','base')]].forEach(([y0,y1,l])=>{el('line',{x1:X0+4,y1:y0+3,x2:X0+4,y2:y1-3,stroke:'#5D4037','stroke-width':3},g);txt(g,T(l),X0+12,(y0+y1)/2+6,{size:16,color:'#3E2723',weight:700,anchor:'start'})});
    sbar(g,X0+10,872,84,'200 µm');note(g,U('Fundus shilliq qavati masshtabda; shilliq osti va mushak qavatlari qisqartirilgan (real ~1–2 mm)','Fundic mucosa to scale; submucosa and muscle layers shortened (real ~1–2 mm)'),620,895,{size:19});
    // pH inset
    const px=1430;el('rect',{x:px-30,y:150,width:250,height:300,rx:14,fill:'#0D1B2A',stroke:TH.faint,'stroke-width':1.5},g);const gr=uid('phg');const lg=el('linearGradient',{id:gr,x1:0,y1:0,x2:0,y2:1},DEFS);[['0','#E53935'],['.55','#FFB300'],['1','#43A047']].forEach(([o,c])=>el('stop',{offset:o,'stop-color':c},lg));
    el('rect',{x:px,y:190,width:40,height:220,fill:`url(#${gr})`,rx:6},g);[[190,'pH ≈ 1–2',U('bo‘shliq','lumen')],[300,'',U('shilliq gel','mucus gel')],[410,'pH ≈ 7',U('epiteliy yuzasi','epithelial surface')]].forEach(([y,a,b])=>{txt(g,a,px+56,y+6,{size:20,color:'ink',weight:700,anchor:'start'});txt(g,T(b),px+56,y+(a?30:6),{size:18,color:'dim',weight:600,anchor:'start'})});
    txt(g,T(U('Shilliq-bikarbonat to‘sig‘i','Mucus–bicarbonate barrier')),px+95,175,{size:19,color:'ink',weight:700});
    const hs=[...Array(16)].map(()=>el('circle',{r:4.5,fill:HC},g)),ps=[...Array(10)].map(()=>el('circle',{r:4,fill:PEP,stroke:'#4527A0','stroke-width':1},g));
    const ST={h:[400,200],p:[400,400]};const gl=glands[3];
    Object.assign(A,{surfaceS:[X0+200,M0+16],pitS:[gl.gx,240],neckS:{el:gl.cells.neck[1]},parietalS:{el:gl.cells.par[2]},chiefS:{el:glands[4].cells.chf[glands[4].cells.chf.length-1]},eecS:{el:glands[2].cells.eec},meissnerS:{el:meis},myentericS:{el:mye},hclS:()=>ST.h,pepS:()=>ST.p,mucusS:{el:mucus,fx:.85,fy:.5}});
    const R0={anchors:A,core:['surfaceS','pitS','neckS','parietalS','chiefS','eecS','meissnerS','myentericS','hclS','mucusS'],update(lt){hs.forEach((c,i)=>{const G=glands[i%glands.length],q=(lt*.22+i/16)%1;const y0=350+(i*37)%110;const y=lerp(y0,140,q);const x=G.gx+(y>y0-20?(1-(y0-y)/20)*14*(i%2?1:-1):0)+(y<M0?((i*13)%40-20)*(M0-y)/40:0);at(c,{cx:f2(x),cy:f2(y),opacity:f2(Math.min(1,Math.sin(Math.PI*q)*2))});if(i===3)ST.h=[x,y]});
      ps.forEach((c,i)=>{const G=glands[(i*2+1)%glands.length],q=(lt*.15+i/10)%1;const y=lerp(520,M0+10,q);at(c,{cx:f2(G.gx),cy:f2(y),opacity:f2(Math.sin(Math.PI*q))});if(i===0)ST.p=[G.gx,y]})}};R0.update(0);return R0}
  // ---- parietal cell ----
  const drug=it.drug||'none',TT=it.cycle||12;
  el('rect',{x:60,y:96,width:1000,height:60,fill:'#2B3A55'},g);txt(g,T(U('Bez bo‘shlig‘i → oshqozon','Gland lumen → stomach')),80,135,{size:22,color:'ink',weight:600,anchor:'start'});
  const cellD='M200,156 L920,156 C980,300 990,560 940,740 L180,740 C130,560 140,300 200,156Z';el('path',{d:cellD,fill:'#F8BBD0',stroke:PARd,'stroke-width':5},g);
  el('rect',{x:60,y:770,width:1000,height:90,fill:'#4A2230'},g);txt(g,T(U('Kapillyar (qon)','Capillary (blood)')),80,850,{size:20,color:'ink',weight:600,anchor:'start'});const rbc=[...Array(5)].map(()=>{const G=el('g',{},g);el('ellipse',{rx:34,ry:13,fill:'#C62828'},G);el('ellipse',{rx:18,ry:5,fill:'#E57373'},G);return G});
  // canaliculus (branched) from apex
  const CAN=[[560,156,560,330],[560,330,420,450],[560,330,700,450],[420,450,340,380],[700,450,800,380],[560,330,560,520]];const canG=el('g',{},g);
  CAN.forEach(([x1,y1,x2,y2])=>{el('line',{x1,y1,x2,y2,stroke:PARd,'stroke-width':34,'stroke-linecap':'round'},canG);el('line',{x1,y1,x2,y2,stroke:'#2B3A55','stroke-width':24,'stroke-linecap':'round'},canG)});
  const mv=[];CAN.forEach(([x1,y1,x2,y2])=>{const L=Math.hypot(x2-x1,y2-y1),nx=-(y2-y1)/L,ny=(x2-x1)/L;for(let s=16;s<L-6;s+=18){const x=lerp(x1,x2,s/L),y=lerp(y1,y2,s/L);[-1,1].forEach(sd=>mv.push(el('line',{x1:f2(x+nx*sd*17),y1:f2(y+ny*sd*17),x2:f2(x+nx*sd*8),y2:f2(y+ny*sd*8),stroke:'#F8BBD0','stroke-width':3,'stroke-linecap':'round'},g)))}});
  const pumpPos=[];CAN.forEach(([x1,y1,x2,y2],ci)=>{const L=Math.hypot(x2-x1,y2-y1),nx=-(y2-y1)/L,ny=(x2-x1)/L;for(let s=30;s<L-10;s+=58){const sd=(s/58|0)%2?1:-1;pumpPos.push([lerp(x1,x2,s/L)+nx*sd*19,lerp(y1,y2,s/L)+ny*sd*19,sd,nx,ny])}});
  const pumps=pumpPos.map(([x,y],i)=>{const G=el('g',{transform:`translate(${f2(x)} ${f2(y)})`},g);el('circle',{r:10,fill:'#FFB300',stroke:'#E65100','stroke-width':2.5},G);if(drug==='ppi')el('path',{d:'M-8,-8 L8,8 M8,-8 L-8,8',stroke:'#D50000','stroke-width':3.5},G);return G});
  // mitochondria & nucleus & tubulovesicles
  const mito=[[260,260],[300,560],[250,420],[860,280],[880,520],[820,640],[360,660],[700,640],[480,250],[660,250],[300,330],[850,420],[420,600],[760,560]].map(([x,y],i)=>{const G=el('g',{transform:`translate(${x} ${y}) rotate(${(i*47)%180})`},g);el('ellipse',{rx:38,ry:16,fill:'#EF9A9A',stroke:'#B71C1C','stroke-width':2},G);el('path',{d:'M-26,0 q6,-10 12,0 q6,10 12,0 q6,-10 12,0 q6,10 12,0',fill:'none',stroke:'#B71C1C','stroke-width':1.6},G);return G});
  const nuc=el('ellipse',{cx:560,cy:640,rx:80,ry:58,fill:'#9575CD',stroke:'#4527A0','stroke-width':3},g);el('circle',{cx:580,cy:630,r:14,fill:'#4527A0'},g);
  const TV=[...Array(18)].map((_,i)=>{const x=250+((i*151)%640),y=230+((i*97)%420);return {x,y,e:el('ellipse',{rx:13,ry:7,fill:'#FFE0B2',stroke:'#FFB300','stroke-width':2},g)}});
  // basolateral transporters & receptors
  const BY=740;const rec=[[300,'h2r','#26A69A'],[420,'m3r','#5C6BC0'],[540,'cck2','#8D6E63']].map(([x,id,c])=>{const G=el('g',{transform:`translate(${x} ${BY})`},g);el('path',{d:'M-14,-22 L-14,10 Q0,22 14,10 L14,-22',fill:c,stroke:'#263238','stroke-width':2},G);if(drug==='h2'&&id==='h2r')el('rect',{x:-10,y:6,width:20,height:16,fill:'#D50000'},G);return {x,id,G}});
  const ae=el('rect',{x:720,y:BY-18,width:40,height:36,rx:10,fill:'#AB47BC',stroke:'#4A148C','stroke-width':2},g);const cl=el('rect',{x:440,y:156-14,width:34,height:30,rx:8,fill:'#29B6F6',stroke:'#01579B','stroke-width':2},g);
  const lig=[...Array(9)].map((_,i)=>el('path',{d:i%3===0?'M0,-8 L7,4 L-7,4Z':i%3===1?'M-7,-7 L7,-7 L7,7 L-7,7Z':'M0,-8 L8,0 L0,8 L-8,0Z',fill:['#26A69A','#5C6BC0','#8D6E63'][i%3]},g));
  const hp=[...Array(14)].map(()=>{const G=el('g',{},g);el('circle',{r:10,fill:HC},G);txt(G,'H⁺',0,5,{size:12,color:'#fff'});return G}),kp=[...Array(8)].map(()=>{const G=el('g',{},g);el('circle',{r:10,fill:'#7E57C2'},G);txt(G,'K⁺',0,5,{size:12,color:'#fff'});return G}),bc=[...Array(6)].map(()=>{const G=el('g',{},g);el('rect',{x:-24,y:-11,width:48,height:22,rx:11,fill:'#66BB6A'},G);txt(G,'HCO₃⁻',0,5,{size:12,color:'#000'});return G});
  const caT=el('text',{x:560,y:430,'text-anchor':'middle','font-size':0,fill:'none'},g);
  // chart
  const c0=1150,c1=1640,y0=200,y1=430,MAXA=25;el('rect',{x:c0,y:y0,width:c1-c0,height:y1-y0,fill:'#0D1B2A',stroke:TH.faint,'stroke-width':1.5},g);
  const stim=t=>t<3?0:t<5?(t-3)/2:t<9.5?1:Math.max(0,1-(t-9.5)/2);const eff=drug==='ppi'?.05:drug==='h2'?.45:1;const acid=t=>3+(22*eff)*stim(t)*(drug==='ppi'?0:1)+(drug==='ppi'?-2.5:0);
  const ay=v=>y1-v/MAXA*(y1-y0);[0,10,20].forEach(v=>{el('line',{x1:c0,y1:ay(v),x2:c1,y2:ay(v),stroke:TH.faint,'stroke-dasharray':'4 6'},g);txt(g,String(v),c0-10,ay(v)+6,{size:17,color:'dim',weight:600,anchor:'end'})});
  let d='';for(let i=0;i<=200;i++){const t=i/200*TT;d+=(i?'L':'M')+f2(c0+t/TT*(c1-c0))+','+f2(ay(Math.max(.4,acid(t))))}const ap=el('path',{d,fill:'none',stroke:HC,'stroke-width':4},g);
  txt(g,T(U('Kislota ajralishi, mmol H⁺/soat','Acid output, mmol H⁺/h')),c0,y0-16,{size:20,color:'ink',weight:700,anchor:'start'});const cur=el('line',{y1:y0,y2:y1,stroke:'#fff','stroke-width':2,opacity:.7},g);
  txt(g,T(U('bazal ~2–5 · maksimal ~20–25','basal ~2–5 · maximal ~20–25')),c0,y1+30,{size:18,color:'dim',weight:600,anchor:'start'});
  const DL={none:U('Dori yo‘q','No drug'),ppi:U('Omeprazol (PPI): nasosni qaytmas bloklaydi','Omeprazole (PPI): irreversibly blocks the pump'),h2:U('Famotidin (H2-bloker): gistamin yo‘li yopiq','Famotidine (H2 blocker): histamine path blocked')};
  txt(g,T(DL[drug]||DL.none),c0,y1+64,{size:20,color:drug==='none'?'dim':'#FF8A80',weight:700,anchor:'start'});
  const stx=el('text',{x:c0,y:560,'font-size':21,'font-weight':700,fill:TH.ink},g);
  const STP=[[0,U('Tinch holat: nasoslar tubulovezikulalarda','Resting: pumps stored in tubulovesicles')],[3,U('Gistamin + atsetilxolin + gastrin retseptorlarga','Histamine + ACh + gastrin bind receptors')],[4.5,U('Tubulovezikulalar kanalchaga qo‘shiladi','Tubulovesicles fuse with canaliculus')],[5.5,U('H⁺ chiqadi, K⁺ kiradi (ATF sarflanadi); Cl⁻ ergashadi','H⁺ out, K⁺ in (ATP used); Cl⁻ follows')],[9.5,U('Stimul tugaydi → nasoslar qayta ichkariga','Stimulus ends → pumps retrieved')]];
  [U('Ajralgan sekretda H⁺ ≈ 150 mM (pH ≈ 0,8) —','Secreted H⁺ ≈ 150 mM (pH ≈ 0.8) —'),U('qondagidan ~3–4 mln marta ko‘p','~3–4 million times blood level')].forEach((l,i)=>txt(g,T(l),c0,640+i*28,{size:19,color:'dim',weight:600,anchor:'start'}));
  note(g,U('Sxema: bitta qoplovchi hujayra (~25 µm); kanalcha va molekulalar kattalashtirilgan','Schematic: one parietal cell (~25 µm); canaliculus and molecules enlarged'),600,890,{size:19});
  const ST={h:[560,200],t:[0,0]};
  Object.assign(A,{canal:[560,240],pump:{el:pumps[1]},tubv:()=>ST.t,mitoP:{el:mito[3]},caP:[330,470],ae2:{el:ae,fx:.5,fy:1},h2r:{el:rec[0].G},m3r:{el:rec[1].G},cck2:{el:rec[2].G},clch:{el:cl,fx:.5,fy:0},bloodP:[860,820],hclS:()=>ST.h});
  const R0={anchors:A,core:['canal','pump','tubv','mitoP','caP','ae2','h2r','m3r','cck2','clch','hclS'],update(lt,p,st){const t=((lt-(st||0))%TT+TT)%TT,s=stim(t),on=s*(drug==='ppi'?0:drug==='h2'?.5:1);
    at(cur,{x1:f2(c0+t/TT*(c1-c0)),x2:f2(c0+t/TT*(c1-c0))});
    TV.forEach((o,i)=>{const tg=pumpPos[i%pumpPos.length];const f=Math.min(1,s*1.2);at(o.e,{cx:f2(lerp(o.x,tg[0],f)),cy:f2(lerp(o.y,tg[1],f)),opacity:f2(1-f*.85)});if(i===4)ST.t=[lerp(o.x,tg[0],f),lerp(o.y,tg[1],f)]});
    pumps.forEach((G,i)=>G.setAttribute('opacity',f2(i<4?1:.15+.85*s)));
    lig.forEach((G,i)=>{const r=rec[i%3];const q=Math.max(0,Math.min(1,(t-2.2-i*.12)/1));const blocked=drug==='h2'&&r.id==='h2r';const y=lerp(860,BY+(blocked?40:22),q);G.setAttribute('transform',`translate(${r.x+(i/3|0)*10-10} ${f2(y)})`);G.setAttribute('opacity',f2(t>2.2&&t<10.5?1:0))});
    hp.forEach((G,i)=>{const P=pumpPos[(i*3)%pumpPos.length],q=(lt*.45+i/14)%1;const ci=(i*3)%pumpPos.length;const x=lerp(P[0],560,q*q),y=lerp(P[1],110,q);G.setAttribute('transform',`translate(${f2(q<.25?P[0]-P[3]*P[2]*q*20:x)} ${f2(q<.25?P[1]-P[4]*P[2]*q*20:y)})`);G.setAttribute('opacity',f2(on>i/14?Math.sin(Math.PI*q):0));if(i===0)ST.h=[x,y]});
    kp.forEach((G,i)=>{const P=pumpPos[(i*5+1)%pumpPos.length],q=(lt*.6+i/8)%1;G.setAttribute('transform',`translate(${f2(P[0]-P[3]*P[2]*(1-q)*30)} ${f2(P[1]-P[4]*P[2]*(1-q)*30)})`);G.setAttribute('opacity',f2(on>i/8?Math.sin(Math.PI*q):0))});
    bc.forEach((G,i)=>{const q=(lt*.35+i/6)%1;G.setAttribute('transform',`translate(${f2(740+(i%3-1)*40)} ${f2(lerp(600,800,q))})`);G.setAttribute('opacity',f2(on>i/6?Math.sin(Math.PI*q):0))});
    rbc.forEach((G,i)=>{const x=60+((lt*70+i*220)%1000);G.setAttribute('transform',`translate(${f2(x)} 812)`)});
    let sx=STP[0][1];STP.forEach(([t0,l])=>{if(t>=t0)sx=l});stx.textContent=T(sx)}};R0.update(0,0,0);return R0});
/* ---------- SMALL INTESTINE: villus (0.5–1 mm) & enterocyte absorption ---------- */
KIT.names(NAMES.uz,{enterocyteV:'Enterotsit (so‘ruvchi hujayra)',gobletV:'Qadahsimon hujayra (shilliq)',brushV:'Hoshiyali qavat (mikrovorsinkalar)',lactealV:'Markaziy limfa kapillyari (laktal)',capV:'Qon kapillyarlari tarmog‘i',cryptV:'Liberkyun kriptasi',panethV:'Panet hujayralari (lizotsim, defensinlar)',stemV:'O‘zak hujayralar (Lgr5⁺)',migrateV:'Hujayra yangilanishi: kriptadan uchga 3–5 kun',chyloV:'Xilomikronlar (limfaga)',
  sglt:'SGLT1: 2 Na⁺ + glyukoza (galaktoza)',glut5:'GLUT5: fruktoza',pept:'PepT1: H⁺ + di/tripeptidlar',glut2:'GLUT2: monosaxaridlar qonga',nak:'Na⁺/K⁺-ATFaza (3 Na⁺ chiqadi, 2 K⁺ kiradi)',micelle:'Mitsella (o‘t kislotalari + yog‘ kislotalari, MG)',serV:'Silliq EPT: triglitseridlar qayta sintezi',golgiV:'Golji: xilomikron yig‘iladi',tjV:'Zich birikma',capA:'Kapillyar → darvoza vena → jigar',lactA:'Laktal → limfa → ko‘krak yo‘li'});
KIT.names(NAMES.en,{enterocyteV:'Enterocyte (absorptive cell)',gobletV:'Goblet cell (mucus)',brushV:'Brush border (microvilli)',lactealV:'Central lacteal (lymphatic)',capV:'Capillary network',cryptV:'Crypt of Lieberkühn',panethV:'Paneth cells (lysozyme, defensins)',stemV:'Stem cells (Lgr5⁺)',migrateV:'Cell renewal: crypt → tip in 3–5 days',chyloV:'Chylomicrons (to lymph)',
  sglt:'SGLT1: 2 Na⁺ + glucose (galactose)',glut5:'GLUT5: fructose',pept:'PepT1: H⁺ + di/tripeptides',glut2:'GLUT2: monosaccharides to blood',nak:'Na⁺/K⁺-ATPase (3 Na⁺ out, 2 K⁺ in)',micelle:'Micelle (bile acids + fatty acids, MG)',serV:'Smooth ER: triglyceride resynthesis',golgiV:'Golgi: chylomicron assembly',tjV:'Tight junction',capA:'Capillary → portal vein → liver',lactA:'Lacteal → lymph → thoracic duct'});
SM.items.villus=preset(1700,900,(g,it)=>{const k=it.kind||'structure',A={};if(!['structure','absorption'].includes(k))SERR.push(`villus: kind "${k}" → structure, absorption`);
  const ENT='#F8C9C4',ENTd='#C9827C',NUC='#5B3F8C',LPc='#F3D9D2',LAC='#FFF8E1',CAPc='#E53935',GOB='#FAFAFA';
  if(k==='structure'){const VX=[170,390,610,830],KX=[60,280,500,720,940],SY=570,TY=210,W=60,KW=25,KB=715;
    const surf=d=>{let p=`M60,${SY+d}`;VX.forEach((cx,i)=>{const w=W-d,kl=KX[i],kr=KX[i+1];
        // crypt to the left of the villus (only the first is a half)
        if(i===0)p=`M${kl+KW+d},${SY+d}`;p+=` L${cx-w},${SY+d} L${cx-w},${TY} A${w},${w} 0 0 1 ${cx+w},${TY} L${cx+w},${SY+d} L${kr-KW-d},${SY+d} L${kr-KW-d},${KB} A${KW+d},${KW+d} 0 0 0 ${kr+KW+d},${KB} L${kr+KW+d},${SY+d}`});return p};
    el('rect',{x:60,y:96,width:900,height:670,fill:'#22304A'},g);const C=clipTo(g,['rect',{x:60,y:96,width:900,height:770}]);
    el('path',{d:surf(0)+` L960,${SY} L960,760 L60,760 L60,${SY}Z`,fill:LPc},C);el('rect',{x:60,y:600,width:900,height:160,fill:LPc},C);
    KX.forEach(kx=>el('path',{d:`M${kx-KW},${SY} L${kx-KW},${KB} A${KW},${KW} 0 0 0 ${kx+KW},${KB} L${kx+KW},${SY}Z`,fill:'#22304A'},C));
    VX.forEach(cx=>{el('path',{d:`M${cx-9},600 L${cx-9},${TY+6} A9,9 0 0 1 ${cx+9},${TY+6} L${cx+9},600Z`,fill:LAC,stroke:'#E6D8A8','stroke-width':2},C);[-20,20].forEach(o=>el('path',{d:`M${cx+o},590 C${cx+o*.7},450 ${cx+o*.9},330 ${cx+o*.6},240`,fill:'none',stroke:'#C98A86','stroke-width':2.5},C));
      el('path',{d:`M${cx-36},620 L${cx-36},${TY} A36,36 0 0 1 ${cx+36},${TY} L${cx+36},620`,fill:'none',stroke:CAPc,'stroke-width':4,opacity:.75},C)});
    const ep=el('path',{d:surf(11),fill:'none',stroke:ENT,'stroke-width':22},C);el('path',{d:surf(11),fill:'none',stroke:ENTd,'stroke-width':22,'stroke-dasharray':'1.5 11'},C);el('path',{d:surf(15),fill:'none',stroke:NUC,'stroke-width':7,'stroke-dasharray':'0 12.5','stroke-linecap':'round'},C);
    const bb=el('path',{d:surf(-1.5),fill:'none',stroke:'#FFE0E0','stroke-width':3,'stroke-dasharray':'1 1.5'},C);
    const gob=[];VX.forEach((cx,i)=>[[-1,300],[1,380],[-1,470],[1,250],[1,520]].forEach(([sd,y],j)=>{if((i+j)%2)return;gob.push(el('ellipse',{cx:cx+sd*(W-11),cy:y,rx:8,ry:13,fill:GOB,stroke:'#B0BEC5','stroke-width':1.5},C))}));
    const pan=[],stem=[];KX.forEach((kx,i)=>{[-60,0,60,180,240].forEach((a,j)=>{const r=(KW+11),ang=(90+a)*Math.PI/180;const x=kx+Math.cos(ang)*r,y=KB+Math.sin(ang)*r;if(j<3){const e=el('circle',{cx:f2(x),cy:f2(y),r:9,fill:'#EF9A9A',stroke:'#B71C1C','stroke-width':1.5},C);for(let q=0;q<3;q++)el('circle',{cx:f2(x+(q-1)*4),cy:f2(y-3),r:2.2,fill:'#B71C1C'},C);pan.push(e)}else stem.push(el('circle',{cx:f2(x),cy:f2(y-10),r:7,fill:'#80CBC4',stroke:'#00695C','stroke-width':1.5},C))})});
    el('rect',{x:60,y:760,width:900,height:22,fill:'#D98A8A'},C);for(let x=60;x<960;x+=22)el('ellipse',{cx:x+11,cy:771,rx:8,ry:2.4,fill:'#7B3F3F'},C);el('rect',{x:60,y:782,width:900,height:84,fill:'#F7E4E1'},C);
    [[330,820,18,'#C62828'],[380,822,24,'#3949AB'],[780,818,16,'#C62828'],[825,822,22,'#3949AB']].forEach(([x,y,r,c])=>el('circle',{cx:x,cy:y,r,fill:'#FFEBEE',stroke:c,'stroke-width':c==='#C62828'?6:3},C));
    const LC=[[96,150,U('Ichak bo‘shlig‘i','Intestinal lumen')],[150,SY,U('Vorsinkalar (~0,5–1 mm)','Villi (~0.5–1 mm)')],[SY,760,U('Kriptalar va xususiy plastinka','Crypts & lamina propria')],[760,782,U('Mukozaning mushak plastinkasi','Muscularis mucosae')],[782,866,U('Shilliq osti qavat','Submucosa')]];
    LC.forEach(([y0,y1,l])=>{el('path',{d:`M966,${y0+2} l8,0 l0,${y1-y0-4} l-8,0`,fill:'none',stroke:TH.faint,'stroke-width':2},g);txt(g,T(l),982,(y0+y1)/2+7,{size:22,color:'ink',weight:600,anchor:'start'})});
    // amplification panel
    const bx=1330,by0=170;txt(g,T(U('So‘rish yuzasining kattalashuvi','Surface amplification')),bx+150,by0-20,{size:21,color:'ink',weight:700});
    [[1,U('silliq naycha','plain tube')],[3,U('+ halqa burmalar','+ circular folds')],[30,U('+ vorsinkalar','+ villi')],[600,U('+ mikrovorsinkalar','+ microvilli')]].forEach(([m,l],i)=>{const y=by0+20+i*62,w=20+Math.log10(m)/Math.log10(600)*260;el('rect',{x:bx,y,width:f2(w),height:30,rx:6,fill:['#78909C','#4FC3F7','#81C784','#FFB74D'][i]},g);txt(g,`×${m}`,bx+w+10,y+23,{size:20,color:'ink',weight:700,anchor:'start'});txt(g,T(l),bx,y+52,{size:17,color:'dim',weight:600,anchor:'start'})});
    [U('Odam ingichka ichagi shilliq yuzasi ≈ 30 m²','Human small-intestinal mucosa ≈ 30 m²'),U('(Helander & Fändriks, 2014); grafik log-shkala','(Helander & Fändriks, 2014); log-scale bars')].forEach((l,i)=>txt(g,T(l),bx-20,by0+290+i*26,{size:17,color:'dim',weight:600,anchor:'start'}));
    // microvilli inset
    const mx=1320,my=610;el('rect',{x:mx-10,y:my-40,width:340,height:230,rx:14,fill:'#0D1B2A',stroke:TH.faint,'stroke-width':1.5},g);el('rect',{x:mx+10,y:my+60,width:300,height:110,fill:ENT},g);for(let x=mx+18;x<mx+306;x+=16){el('rect',{x,y:my,width:8,height:62,rx:4,fill:ENT,stroke:ENTd,'stroke-width':1.5},g);el('line',{x1:x+4,y1:my+6,x2:x+4,y2:my+90,stroke:'#8D6E63','stroke-width':1.5},g)}
    for(let x=mx+14;x<mx+310;x+=9)el('line',{x1:x,y1:my-2,x2:x+3,y2:my-14,stroke:'#A5D6A7','stroke-width':1.5},g);el('rect',{x:mx+10,y:my+82,width:300,height:10,fill:'#BCAAA4',opacity:.6},g);
    [U('Mikrovorsinka: ~1 µm × 0,1 µm, aktin o‘zagi;','Microvillus: ~1 µm × 0.1 µm, actin core;'),U('ustida glikokaliks (hazm fermentlari)','glycocalyx on top (digestive enzymes)')].forEach((l,i)=>txt(g,T(l),mx+160,my+218+i*26,{size:18,color:'dim',weight:600}));
    sbar(g,70,892,105,'200 µm');note(g,U('Och ichak shilliq qavati sxemasi; o‘lchamlar real nisbatda, hujayralar soni kamaytirilgan','Jejunal mucosa schematic; proportions to scale, cell numbers reduced'),620,895,{size:19});
    const mig=[...Array(4)].map(()=>el('circle',{r:9,fill:'#FFEB3B',stroke:'#F57F17','stroke-width':2.5},C));const rbc=[...Array(16)].map(()=>el('circle',{r:4,fill:'#FF8A80'},C));const chy=[...Array(16)].map(()=>el('circle',{r:4,fill:'#FFFDE7',stroke:'#FBC02D','stroke-width':1.5},C));const nut=[...Array(20)].map((_,i)=>el('circle',{r:3.5,fill:i%2?'#FFD54F':'#80DEEA'},C));
    const ST={m:[0,0],c:[0,0]};
    Object.assign(A,{enterocyteV:[VX[1]-W+11,420],gobletV:{el:gob[1]},brushV:[VX[2],TY-W-2],lactealV:[VX[2],420],capV:[VX[3]+36,330],cryptV:[KX[2],660],panethV:{el:pan[7]},stemV:{el:stem[5]},migrateV:()=>ST.m,chyloV:()=>ST.c});
    const route=(cx,kx,q)=>{// crypt base (kx) → side of villus (cx-w) → tip
      const w=W-11,P=[[kx+KW+11,KB],[kx+KW+11,SY+11],[cx-w,SY+11],[cx-w,TY],[cx,TY-w]];const L=[0];for(let i=1;i<P.length;i++)L.push(L[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]));const s=q*L[L.length-1];let i=1;while(i<L.length-1&&L[i]<s)i++;const u=(s-L[i-1])/(L[i]-L[i-1]||1);return [lerp(P[i-1][0],P[i][0],u),lerp(P[i-1][1],P[i][1],u)]};
    const R0={anchors:A,core:['enterocyteV','gobletV','brushV','lactealV','capV','cryptV','panethV','stemV','migrateV','chyloV'],update(lt){mig.forEach((c,i)=>{const q=(lt/10+i*.25)%1;const [x,y]=route(VX[i],KX[i],q);at(c,{cx:f2(x),cy:f2(y),opacity:f2(q>.97?0:1)});if(i===1)ST.m=[x,y]});
      rbc.forEach((c,i)=>{const cx=VX[i%4],q=(lt*.18+i/16)%1;let x,y;const r=36;if(q<.4){x=cx-r;y=lerp(620,TY,q/.4)}else if(q<.6){const a=Math.PI+(q-.4)/.2*Math.PI;x=cx+Math.cos(a)*r;y=TY+Math.sin(a)*r}else{x=cx+r;y=lerp(TY,620,(q-.6)/.4)}at(c,{cx:f2(x),cy:f2(y)})});
      chy.forEach((c,i)=>{const cx=VX[i%4],q=(lt*.12+i/16)%1;const y=lerp(TY,600,q);at(c,{cx:cx,cy:f2(y)});if(i===2)ST.c=[cx,y]});
      nut.forEach((c,i)=>{const q=(lt*.2+i/20)%1;const x=80+((i*137)%860),y=lerp(110,170,q);at(c,{cx:x,cy:f2(y),opacity:f2(Math.sin(Math.PI*q))})})}};R0.update(0);return R0}
  // ---- enterocyte absorption ----
  const AY=210,BY=720,MX=600,TT=it.cycle||8;
  el('rect',{x:60,y:96,width:1040,height:AY-96,fill:'#22304A'},g);txt(g,T(U('Ichak bo‘shlig‘i','Intestinal lumen')),80,130,{size:22,color:'ink',weight:600,anchor:'start'});
  el('rect',{x:60,y:BY,width:1040,height:146,fill:LPc},g);txt(g,T(U('Xususiy plastinka','Lamina propria')),560,BY+40,{size:20,color:'#5D4037',weight:700});
  [[140,MX-4],[MX+4,1060]].forEach(([x0,x1])=>{el('rect',{x:x0,y:AY,width:x1-x0,height:BY-AY,rx:10,fill:ENT,stroke:ENTd,'stroke-width':3},g);for(let x=x0+8;x<x1-6;x+=14)el('rect',{x,y:AY-30,width:8,height:32,rx:4,fill:ENT,stroke:ENTd,'stroke-width':1.5},g);el('ellipse',{cx:(x0+x1)/2,cy:BY-110,rx:70,ry:50,fill:'#9575CD',stroke:'#4527A0','stroke-width':3},g)});
  const tj=el('rect',{x:MX-8,y:AY-4,width:16,height:26,fill:'#37474F'},g);
  const lac=el('path',{d:`M150,${BY+70} L520,${BY+70} Q540,${BY+100} 520,${BY+130} L150,${BY+130}Z`,fill:LAC,stroke:'#E6D8A8','stroke-width':3},g);const cap=el('rect',{x:680,y:BY+70,width:380,height:60,rx:30,fill:'#7F1D2D',stroke:CAPc,'stroke-width':4},g);
  // left cell: lipid route
  const mic=el('g',{transform:`translate(300 ${AY-60})`},g);for(let i=0;i<12;i++){const a=i/12*TAU;el('line',{x1:f2(Math.cos(a)*14),y1:f2(Math.sin(a)*14),x2:f2(Math.cos(a)*30),y2:f2(Math.sin(a)*30),stroke:'#FFB300','stroke-width':3},mic);el('circle',{cx:f2(Math.cos(a)*30),cy:f2(Math.sin(a)*30),r:5,fill:'#26A69A'},mic)}
  const ser=el('path',{d:'M200,330 q30,-20 60,0 t60,0 t60,0 t60,0 M210,360 q30,-20 60,0 t60,0 t60,0',fill:'none',stroke:'#FFB74D','stroke-width':6,'stroke-linecap':'round'},g);
  const gol=el('g',{},g);[0,1,2,3].forEach(i=>el('path',{d:`M${260+i*4},${450+i*16} q110,-${24-i*3} 220,0`,fill:'none',stroke:'#AB47BC','stroke-width':7,'stroke-linecap':'round'},gol));
  // right cell transporters
  const TR=(x,y,c,lab)=>{const G=el('g',{transform:`translate(${x} ${y})`},g);el('rect',{x:-20,y:-24,width:40,height:48,rx:12,fill:c,stroke:'#263238','stroke-width':2},G);txt(G,lab,0,6,{size:12,color:'#000',weight:700});return G};
  const sg=TR(700,AY,'#4FC3F7','SGLT1'),g5=TR(840,AY,'#AED581','GLUT5'),pt=TR(980,AY,'#FFB74D','PepT1'),g2=TR(760,BY,'#81C784','GLUT2'),nk=TR(940,BY,'#FFD54F','Na/K');
  const P={glc:[],fru:[],pep:[],na:[],lip:[],chy:[]};
  for(let i=0;i<6;i++)P.glc.push(el('path',{d:'M0,-8 L7,-4 L7,4 L0,8 L-7,4 L-7,-4Z',fill:'#29B6F6'},g));for(let i=0;i<5;i++)P.fru.push(el('path',{d:'M0,-8 L7.6,-2.5 L4.7,6.5 L-4.7,6.5 L-7.6,-2.5Z',fill:'#9CCC65'},g));
  for(let i=0;i<5;i++){const G=el('g',{},g);[-9,0,9].forEach(x=>el('circle',{cx:x,cy:0,r:5,fill:'#FF8A65'},G));P.pep.push(G)}for(let i=0;i<8;i++){const G=el('g',{},g);el('circle',{r:9,fill:'#FFCA28'},G);txt(G,'Na⁺',0,4,{size:10,color:'#000'});P.na.push(G)}
  for(let i=0;i<8;i++)P.lip.push(el('circle',{r:4,fill:'#FFB300'},g));for(let i=0;i<5;i++)P.chy.push(el('circle',{r:13,fill:'#FFFDE7',stroke:'#FBC02D','stroke-width':3},g));
  const poly=(Pp,q)=>{const L=[0];for(let i=1;i<Pp.length;i++)L.push(L[i-1]+Math.hypot(Pp[i][0]-Pp[i-1][0],Pp[i][1]-Pp[i-1][1]));const s=Math.max(0,Math.min(1,q))*L[L.length-1];let i=1;while(i<L.length-1&&L[i]<s)i++;const u=(s-L[i-1])/(L[i]-L[i-1]||1);return [lerp(Pp[i-1][0],Pp[i][0],u),lerp(Pp[i-1][1],Pp[i][1],u)]};
  const RT={glc:[[700,120],[700,AY],[730,420],[760,BY],[790,BY+100]],fru:[[840,120],[840,AY],[800,430],[760,BY],[740,BY+100]],pep:[[980,120],[980,AY],[960,400],[880,BY-140]],na:[[680,120],[690,AY],[880,480],[940,BY],[960,BY+60]],lip:[[300,AY-60],[300,AY],[300,330]],chy:[[360,360],[370,460],[380,BY-10],[360,BY+100]]};
  const pan=1150;[[U('Glyukoza, galaktoza → SGLT1 (ikkilamchi faol: Na⁺ gradiyenti)','Glucose, galactose → SGLT1 (secondary active: Na⁺ gradient)'),'#4FC3F7'],[U('Fruktoza → GLUT5 (yengillashgan diffuziya)','Fructose → GLUT5 (facilitated diffusion)'),'#9CCC65'],[U('Di/tripeptidlar → PepT1 (H⁺ bilan); hujayrada → aminokislotalar','Di/tripeptides → PepT1 (with H⁺); → amino acids inside'),'#FF8A65'],[U('Yog‘lar: mitsella → EPT → Golji → xilomikron → limfa','Fats: micelle → ER → Golgi → chylomicron → lymph'),'#FFB300'],[U('Na⁺/K⁺-ATFaza Na⁺ gradiyentini ushlab turadi','Na⁺/K⁺-ATPase maintains the Na⁺ gradient'),'#FFD54F']].forEach(([l,c],i)=>{el('rect',{x:pan,y:180+i*86,width:16,height:16,rx:3,fill:c},g);const w=T(l).split(/(?<=[;:)]) /);const s=T(l);const cut=s.length>40?s.lastIndexOf(' ',40):-1;txt(g,cut>0?s.slice(0,cut):s,pan+28,195+i*86,{size:19,color:'ink',weight:600,anchor:'start'});if(cut>0)txt(g,s.slice(cut+1),pan+28,222+i*86,{size:19,color:'ink',weight:600,anchor:'start'})});
  [U('Og‘iz orqali regidratatsiya (ORS) shu yo‘lga asoslangan:','Oral rehydration (ORS) relies on this:'),U('Na⁺ + glyukoza birga so‘rilib, suvni tortadi','Na⁺ + glucose co-absorbed, water follows')].forEach((l,i)=>txt(g,T(l),pan,640+i*28,{size:18,color:'dim',weight:600,anchor:'start'}));
  note(g,U('Sxema: ikki qo‘shni enterotsit (~25 µm balandlik); mikrovorsinkalar va molekulalar kattalashtirilgan','Schematic: two adjacent enterocytes (~25 µm tall); microvilli and molecules enlarged'),620,895,{size:19});
  const ST={c:[0,0]};
  Object.assign(A,{sglt:{el:sg,fx:.5,fy:0},glut5:{el:g5,fx:.5,fy:0},pept:{el:pt,fx:.5,fy:0},glut2:{el:g2,fx:.5,fy:1},nak:{el:nk,fx:.5,fy:1},micelle:{el:mic,fx:.5,fy:0},serV:{el:ser,fx:.8,fy:.2},golgiV:{el:gol,fx:.9,fy:.5},chyloV:()=>ST.c,tjV:{el:tj,fx:.5,fy:0},capA:{el:cap,fx:.8,fy:1},lactA:{el:lac,fx:.3,fy:1},brushV:[450,AY-20]});
  const R0={anchors:A,core:['sglt','glut5','pept','glut2','nak','micelle','serV','golgiV','chyloV','capA','lactA'],sides:{},update(lt){Object.keys(P).forEach(key=>{const arr=P[key];arr.forEach((e,i)=>{const sp=key==='chy'?.1:.16;const q=(lt*sp+i/arr.length)%1;const [x,y]=poly(RT[key],q);const off=key==='lip'?((i*17)%60-30)*(1-q):0;e.setAttribute('transform',`translate(${f2(x+off)} ${f2(y)})`);e.setAttribute('opacity',f2(Math.min(1,Math.sin(Math.PI*q)*2.5)));if(key==='chy'&&i===1)ST.c=[x,y]})})}};R0.update(0);return R0});
/* ---------- HEART CONDUCTION SYSTEM + ECG (lead II, 75/min) & cardiac action potentials ---------- */
KIT.names(NAMES.uz,{saN:'SA (sinus) tuguni — 60–100/min',avN:'AV tuguni — kechikish ~0,1 s',his:'His tutami',rbb:'O‘ng oyoqcha',lbb:'Chap oyoqcha',purk:'Purkinye tolalari (2–4 m/s)',bach:'Baxman tutami (chap bo‘lmachaga)',raC:'O‘ng bo‘lmacha',laC:'Chap bo‘lmacha',rvC:'O‘ng qorincha',lvC:'Chap qorincha',fibr:'Fibroz halqa (elektr izolyator)',
  ecgP:'P — bo‘lmachalar qo‘zg‘alishi',ecgQRS:'QRS — qorinchalar qo‘zg‘alishi',ecgT:'T — qorinchalar repolyarizatsiyasi',
  saAP:'SA tugun potensiali (ritm yetakchisi)',venAP:'Qorincha kardiomiotsiti potensiali',ph0:'0-faza: Na⁺ kiradi (tez)',ph2:'2-faza: plato (Ca²⁺ kiradi, K⁺ chiqadi)',ph3:'3-faza: repolyarizatsiya (K⁺)',ph4:'4-faza: tinchlik (−90 mV)',slow4:'Sekin diastolik depolyarizatsiya (If, Ca²⁺)',thr:'Bo‘sag‘a ≈ −40 mV',erp:'Effektiv refrakter davr',ecgL:'EKG (II tarmoq)'});
KIT.names(NAMES.en,{saN:'SA (sinus) node — 60–100/min',avN:'AV node — delay ~0.1 s',his:'Bundle of His',rbb:'Right bundle branch',lbb:'Left bundle branch',purk:'Purkinje fibres (2–4 m/s)',bach:'Bachmann bundle (to left atrium)',raC:'Right atrium',laC:'Left atrium',rvC:'Right ventricle',lvC:'Left ventricle',fibr:'Fibrous annulus (electrical insulator)',
  ecgP:'P wave — atrial depolarisation',ecgQRS:'QRS — ventricular depolarisation',ecgT:'T wave — ventricular repolarisation',
  saAP:'SA node potential (ritm yetakchisi)',venAP:'Ventricular myocyte potential',ph0:'Phase 0: Na⁺ influx (fast)',ph2:'Phase 2: plateau (Ca²⁺ in, K⁺ out)',ph3:'Phase 3: repolarisation (K⁺)',ph4:'Phase 4: rest (−90 mV)',slow4:'Slow diastolic depolarisation (If, Ca²⁺)',thr:'Threshold ≈ −40 mV',erp:'Effective refractory period',ecgL:'ECG (lead II)'});
SM.items.cardio=preset(1700,900,(g,it)=>{const k=it.kind||'conduction',A={};if(!['conduction','ap'].includes(k))SERR.push(`cardio: kind "${k}" → conduction, ap`);
  const CY=800,gs=(t,m,s)=>Math.exp(-(((t-m)/s)**2)/2);
  const ecg=t=>{t=((t%CY)+CY)%CY;return .15*gs(t,50,20)-.1*gs(t,178,7)+1.2*gs(t,195,8)-.3*gs(t,212,8)+.32*(t<400?gs(t,400,42):gs(t,400,30))};
  const ECGP=(x0,x1,y0,y1,win)=>{// grid 1 mm = 40 ms = 0.1 mV
    const pxms=(x1-x0)/win,mm=40*pxms,mv=(y1-y0)/18,vy=v=>y0+(1.4-v)*10*mv;el('rect',{x:x0,y:y0,width:x1-x0,height:y1-y0,fill:'#FFF4F2'},g);
    for(let x=x0,i=0;x<=x1+.1;x+=mm,i++)el('line',{x1:f2(x),y1:y0,x2:f2(x),y2:y1,stroke:'#F4B6B0','stroke-width':i%5?0.8:2},g);
    for(let i=0;i<=18;i++){const y=y1-i*mv;el('line',{x1:x0,y1:f2(y),x2:x1,y2:f2(y),stroke:'#F4B6B0','stroke-width':(i-4)%5?0.8:2},g)}
    let d='';for(let i=0;i<=600;i++){const t=i/600*win;d+=(i?'L':'M')+f2(x0+t*pxms)+','+f2(vy(ecg(t)))}const p=el('path',{d,fill:'none',stroke:'#212121','stroke-width':3.5,'stroke-linejoin':'round'},g);return {p,pxms,vy,tx:t=>x0+t*pxms}};
  if(k==='conduction'){const slow=it.slow||6,TT=CY/1000*slow;
    const outer='M250,190 C170,250 150,400 205,510 C270,650 390,780 515,858 C640,770 770,630 795,470 C815,330 765,215 660,195 C600,185 540,205 470,215 C400,205 320,175 250,190Z';
    el('path',{d:'M245,100 L245,230 L320,230 L320,100Z',fill:'#5C6BC0'},g);el('path',{d:'M430,230 C430,120 470,96 540,96 C620,96 660,130 680,190 L630,200 C620,150 590,140 545,140 C500,140 480,160 480,230Z',fill:'#C62828'},g);el('path',{d:'M500,240 C500,180 520,150 600,140 L610,180 C560,190 545,210 545,240Z',fill:'#5C6BC0',opacity:.9},g);
    const myo=el('path',{d:outer,fill:'#B5473F',stroke:'#7F1D1D','stroke-width':4},g);
    const CH={ra:'M222,255 C205,330 222,402 290,420 L428,420 L432,245 C360,226 268,224 222,255Z',la:'M470,240 L468,420 L648,420 C716,402 742,326 720,262 C652,222 548,224 470,240Z',rv:'M228,462 L430,462 L462,750 C392,712 282,602 228,462Z',lv:'M492,462 L705,462 C728,568 652,700 525,792Z'};
    const cav={};Object.entries(CH).forEach(([kk,d])=>cav[kk]=el('path',{d,fill:'#4A1820',stroke:'#7F1D1D','stroke-width':2},g));
    const fib=el('path',{d:'M200,441 L800,441',stroke:'#F5E6C8','stroke-width':9,opacity:.9},g);
    // activation overlays: wavefront circles clipped to atrial / ventricular myocardium
    const atrD='M150,180 L820,180 L820,441 L150,441Z',venD='M150,441 L820,441 L820,870 L150,870Z';
    const cA=clipTo(g,['path',{d:outer}]);const AA=clipTo(cA,['path',{d:atrD}]),VV=clipTo(cA,['path',{d:venD}]);
    const wa=el('circle',{cx:270,cy:235,r:0,fill:'#FFB74D',opacity:.45},AA),wv=el('circle',{cx:470,cy:600,r:0,fill:'#FFB74D',opacity:.45},VV);
    Object.values(CH).forEach(d=>el('path',{d,fill:'#4A1820',opacity:.85},cA));
    // conduction system
    const CS='#FFF176',cs=(d,w)=>el('path',{d,fill:'none',stroke:CS,'stroke-width':w||6,'stroke-linecap':'round','stroke-linejoin':'round'},g);
    const intern=[cs('M275,240 C330,250 400,330 438,430',3),cs('M275,240 C300,320 360,400 436,432',3),cs('M275,240 C350,240 420,300 440,428',3)].map(p=>(p.setAttribute('stroke-dasharray','8 6'),p));const bachP=cs('M290,230 C380,214 520,214 640,250',4);bachP.setAttribute('stroke-dasharray','8 6');
    const sa=el('ellipse',{cx:275,cy:238,rx:20,ry:12,fill:'#FFEB3B',stroke:'#F57F17','stroke-width':3},g);const av=el('ellipse',{cx:440,cy:432,rx:16,ry:11,fill:'#FFEB3B',stroke:'#F57F17','stroke-width':3},g);
    const hisP=cs('M440,432 L462,486',7),rbbP=cs('M458,486 C440,560 450,660 470,740 C430,710 330,620 262,500',5),lbbP=cs('M466,486 C490,560 505,670 520,770 C600,700 680,600 700,480',5);
    const purk=[];[[470,740,[[420,700],[360,650],[300,590]]],[520,770,[[580,720],[640,640],[690,560]]],[470,740,[[430,640],[380,600]]],[505,700,[[570,640],[620,560]]]].forEach(([x,y,P])=>P.forEach(([px,py])=>purk.push(cs(`M${x},${y} Q${(x+px)/2+10},${(y+py)/2+18} ${px},${py}`,2.5))));
    [[330,350,U('O‘ng bo‘lmacha','Right atrium')],[600,330,U('Chap bo‘lmacha','Left atrium')],[320,520,U('O‘ng qorincha','Right ventricle')],[610,560,U('Chap qorincha','Left ventricle')]].forEach(([x,y,l])=>txt(g,T(l),x,y,{size:22,color:'#F8D7D3',weight:700}));
    const pulse=el('circle',{r:11,fill:'#FFFFFF',stroke:'#FFEB3B','stroke-width':4},g);
    // ECG
    const E=ECGP(900,1620,170,476,1600);const cur=el('line',{y1:170,y2:476,stroke:'#1565C0','stroke-width':3},g);const curD=el('circle',{r:8,fill:'#1565C0'},g);
    txt(g,T(U('EKG, II tarmoq · 25 mm/s · 10 mm/mV · 75 urish/min','ECG lead II · 25 mm/s · 10 mm/mV · 75 bpm')),900,150,{size:20,color:'ink',weight:700,anchor:'start'});
    const brk=(t0,t1,y,lab)=>{const a=E.tx(t0),b=E.tx(t1);el('path',{d:`M${a},${y-8} L${a},${y} L${b},${y} L${b},${y-8}`,fill:'none',stroke:TH.ink,'stroke-width':2},g);txt(g,lab,(a+b)/2,y+24,{size:18,color:'ink',weight:600})};
    brk(30,190,500,'PQ 0,16 s'.replace(',',T(U(',','.'))));brk(170,260,540,'QRS 0,09 s'.replace(',',T(U(',','.'))));brk(170,470,580,'QT 0,40 s'.replace(',',T(U(',','.'))));
    const stx=el('text',{x:900,y:650,'font-size':24,'font-weight':700,fill:TH.ink},g);
    const PH=[[0,U('SA tugunda impuls hosil bo‘ladi','Impulse generated in the SA node')],[20,U('Bo‘lmachalar qo‘zg‘aladi (~1 m/s) → P tishi','Atria depolarise (~1 m/s) → P wave')],[100,U('AV tugunda kechikish (~0,05 m/s) → PQ segment','AV-node delay (~0.05 m/s) → PQ segment')],[150,U('His tutami → oyoqchalar → Purkinye (2–4 m/s)','His bundle → branches → Purkinje (2–4 m/s)')],[175,U('Qorinchalar qo‘zg‘aladi (septumdan uchga, ichdan tashqariga) → QRS','Ventricles depolarise (septum → apex, endo → epi) → QRS')],[270,U('ST segment: qorinchalar to‘liq qo‘zg‘algan (plato)','ST segment: ventricles fully depolarised (plateau)')],[330,U('Qorinchalar repolyarizatsiyasi → T tishi','Ventricular repolarisation → T wave')],[480,U('Diastola: SA tugun keyingi impulsga tayyorlanadi','Diastole: SA node prepares the next impulse')]];
    [U('Ichki ritm: SA 60–100 · AV 40–60 · Purkinye 20–40 /min','Intrinsic rates: SA 60–100 · AV 40–60 · Purkinje 20–40 /min'),U(`Animatsiya ×${slow} sekinlashtirilgan (1 sikl = 0,8 s)`,`Animation slowed ×${slow} (1 cycle = 0.8 s)`)].forEach((l,i)=>txt(g,T(l),900,720+i*32,{size:20,color:'dim',weight:600,anchor:'start'}));
    note(g,U('Yurakning frontal kesimi (sxema); o‘tkazuvchi tizim qalinlashtirib ko‘rsatilgan','Frontal section of the heart (schematic); conduction system drawn thicker'),480,892,{size:19});
    const ST={};Object.assign(A,{saN:{el:sa,fx:0,fy:.5},avN:{el:av,fx:1,fy:.5},his:{el:hisP,fx:.6,fy:.6},rbb:[452,600],lbb:[497,620],purk:{el:purk[4]},bach:{el:bachP,fx:.7,fy:0},raC:{el:cav.ra,fx:.3,fy:.6},laC:{el:cav.la,fx:.6,fy:.5},rvC:{el:cav.rv,fx:.4,fy:.4},lvC:{el:cav.lv,fx:.6,fy:.4},fibr:[740,441],
      ecgP:[E.tx(50),E.vy(.15)],ecgQRS:[E.tx(195),E.vy(1.2)],ecgT:[E.tx(400),E.vy(.32)]});
    const segs=[[0,40,[[275,238],[440,432]]],[40,120,[[440,432],[440,432]]],[120,135,[[440,432],[462,486]]],[135,165,[[462,486],[470,600],[470,740]]],[165,180,[[470,740],[360,650]]]];
    const R0={anchors:A,core:['saN','avN','his','rbb','lbb','purk','bach','ecgP','ecgQRS','ecgT'],labelLayout:'tb',update(lt){const ms=((lt/TT*CY)%CY+CY)%CY;
      const ra=ms<100?ms/90*620:620;at(wa,{r:f2(Math.max(0,ra)),opacity:f2(ms<100?.45:ms<260?.45*(1-(ms-100)/160):0)});
      const rv=ms>=170&&ms<260?(ms-170)/85*480:ms>=260?480:0;at(wv,{r:f2(rv),opacity:f2(ms<170?0:ms<330?.45:ms<470?.45*(1-(ms-330)/140):0)});
      let pos=null;segs.forEach(([a,b,P])=>{if(ms>=a&&ms<b){const q=(ms-a)/(b-a);const n=P.length-1,j=Math.min(n-1,Math.floor(q*n)),u=q*n-j;pos=[lerp(P[j][0],P[j+1][0],u),lerp(P[j][1],P[j+1][1],u)]}});at(pulse,{cx:pos?f2(pos[0]):0,cy:pos?f2(pos[1]):0,opacity:pos?1:0});
      sa.setAttribute('fill',ms<30?'#FFFFFF':'#FFEB3B');av.setAttribute('fill',ms>=40&&ms<120?'#FFFFFF':'#FFEB3B');[hisP,rbbP,lbbP].forEach(p=>p.setAttribute('stroke',ms>=120&&ms<190?'#FFFFFF':CS));purk.forEach(p=>p.setAttribute('stroke',ms>=160&&ms<200?'#FFFFFF':CS));
      const x=E.tx(ms+CY*0)+0;at(cur,{x1:f2(x),x2:f2(x)});at(curD,{cx:f2(x),cy:f2(E.vy(ecg(ms)))});
      let s=PH[0][1];PH.forEach(([t0,l])=>{if(ms>=t0)s=l});stx.textContent=T(s)}};R0.update(0);return R0}
  // ---- action potentials ----
  const slow=it.slow||4,TT=2*CY/1000*slow,X0=230,X1=1290,WIN=1600,px=(X1-X0)/WIN,tx=t=>X0+t*px;
  const sa=t=>{const u=((t+30)%CY+CY)%CY;if(u<40)return -40+50*(u/40);if(u<170)return 10-70*(1-Math.cos(Math.PI*(u-40)/130))/2;return -60+20*Math.pow((u-170)/(CY-170),1.4)};
  const ven=t=>{const u=((t-180)%CY+CY)%CY;if(u<3)return -90+110*u/3;if(u<15)return 20-15*(u-3)/12;if(u<200)return 5-10*(u-15)/185;if(u<290)return -5-85*(1-Math.cos(Math.PI*(u-200)/90))/2;return -90};
  const panel=(fn,y0,y1,lo,hi,col,ticks)=>{el('rect',{x:X0,y:y0,width:X1-X0,height:y1-y0,fill:'#0D1B2A',stroke:TH.faint,'stroke-width':1.5},g);const vy=v=>y1-(v-lo)/(hi-lo)*(y1-y0);
    ticks.forEach(v=>{el('line',{x1:X0,y1:vy(v),x2:X1,y2:vy(v),stroke:TH.faint,'stroke-dasharray':'4 6'},g);txt(g,v+' mV',X0-10,vy(v)+6,{size:17,color:'dim',weight:600,anchor:'end'})});
    let d='';for(let i=0;i<=800;i++){const t=i/800*WIN;d+=(i?'L':'M')+f2(tx(t))+','+f2(vy(fn(t)))}return {p:el('path',{d,fill:'none',stroke:col,'stroke-width':4},g),vy}};
  const P1=panel(sa,130,330,-70,20,'#FFB74D',[-60,-40,0]),P2=panel(ven,390,650,-100,30,'#4FC3F7',[-90,-40,0]);
  el('line',{x1:X0,y1:P1.vy(-40),x2:X1,y2:P1.vy(-40),stroke:'#FF8A80','stroke-width':2,'stroke-dasharray':'10 6'},g);
  const erp=el('rect',{x:tx(180),y:392,width:250*px,height:256,fill:'#FFFFFF',opacity:.07},g);el('rect',{x:tx(980),y:392,width:250*px,height:256,fill:'#FFFFFF',opacity:.07},g);
  [[0,2,'0'],[8,1,'1'],[110,-3,'2'],[250,-50,'3'],[500,-90,'4']].forEach(([u,v,l])=>{const x=tx(180+u),y=P2.vy(v);el('circle',{cx:x+18,cy:y-22,r:14,fill:'#0D1B2A',stroke:'#4FC3F7','stroke-width':2},g);txt(g,l,x+18,y-16,{size:17,color:'#4FC3F7'})});
  const E=ECGP(X0,X1,700,860,WIN);el('rect',{x:X0,y:700,width:X1-X0,height:160,fill:'none',stroke:TH.faint},g);
  const cur=el('line',{y1:130,y2:860,stroke:'#fff','stroke-width':2.5,opacity:.8},g);
  for(let i=0;i<=8;i++)txt(g,`${i*200}`,tx(i*200),885,{size:16,color:'dim',weight:600});txt(g,'ms',X1+30,885,{size:16,color:'dim',weight:600});
  // ion current indicators
  const IX=1360;txt(g,T(U('Ion toklari (hozir)','Ionic currents (now)')),IX,150,{size:21,color:'ink',weight:700,anchor:'start'});
  const IC=[['If (HCN, Na⁺/K⁺ →)',U('SA: sekin depolyarizatsiya','SA: slow depolarisation'),'#FFB74D'],['INa (Na⁺ →)',U('qorincha 0-faza','ventricle phase 0'),'#FFCA28'],['ICa,L (Ca²⁺ →)',U('SA ko‘tarilishi; qorincha platosi','SA upstroke; ventricular plateau'),'#66BB6A'],['IK (K⁺ ←)',U('repolyarizatsiya','repolarisation'),'#AB47BC']].map(([n,l,c],i)=>{const y=200+i*110;txt(g,n,IX,y,{size:20,color:'ink',weight:700,anchor:'start'});txt(g,T(l),IX,y+26,{size:17,color:'dim',weight:600,anchor:'start'});el('rect',{x:IX,y:y+38,width:280,height:20,rx:6,fill:'#0D1B2A',stroke:TH.faint},g);return el('rect',{x:IX,y:y+38,width:0,height:20,rx:6,fill:c},g)});
  [U('Plato tufayli refrakter davr uzun —','Long refractory period due to plateau —'),U('yurak mushagida tetanus bo‘lmaydi','so cardiac muscle cannot tetanise')].forEach((l,i)=>txt(g,T(l),IX,680+i*28,{size:18,color:'dim',weight:600,anchor:'start'}));
  [U('Ikki sikl (75/min), umumiy vaqt o‘qi;','Two cycles (75 bpm), shared time axis;'),U(`animatsiya ×${slow} sekinlashtirilgan`,`animation slowed ×${slow}`)].forEach((l,i)=>txt(g,T(l),IX,780+i*26,{size:17,color:'dim',weight:600,anchor:'start'}));
  const ST={};Object.assign(A,{saAP:{el:P1.p,fx:.03,fy:.5},venAP:{el:P2.p,fx:.6,fy:.05},ph0:[tx(181),P2.vy(-30)],ph2:[tx(300),P2.vy(2)],ph3:[tx(440),P2.vy(-50)],ph4:[tx(700),P2.vy(-90)],slow4:[tx(500),P1.vy(sa(500))],thr:[tx(1300),P1.vy(-40)],erp:{el:erp,fx:.5,fy:1},ecgL:[tx(995),E.vy(1.2)]});
  const R0={anchors:A,core:['saAP','venAP','ph0','ph2','ph3','ph4','slow4','thr','erp','ecgL'],update(lt){const ms=((lt/TT*WIN)%WIN+WIN)%WIN,u=((ms-180)%CY+CY)%CY,s=((ms+30)%CY+CY)%CY;at(cur,{x1:f2(tx(ms)),x2:f2(tx(ms))});
    const lv=[s>=170?.4+.6*(s-170)/(CY-170):0,u<4?1:0,(s<40?1:0)*.8+(u>=8&&u<210?.7:0),(u>=200&&u<290?1:0)+(s>=40&&s<170?.6:0)+(u>=3&&u<15?.4:0)];IC.forEach((r,i)=>at(r,{width:f2(280*Math.min(1,lv[i]))}))}};R0.update(0);return R0});
/* ---------- OSTEON: compact bone microstructure · bone remodelling (BMU, RANKL/OPG) ---------- */
KIT.names(NAMES.uz,{ost:'Osteon (Gavers tizimi, Ø ~200–250 µm)',hav:'Gavers kanali (Ø ~50 µm: tomir, nerv)',lam:'Konsentrik plastinkalar (3–7 µm)',ocyt:'Osteotsit (lakunada)',canal:'Kanalchalar (osteotsitlar aloqasi)',volk:'Folkman kanali',cement:'Sement chizig‘i',inter:'Oraliq plastinkalar',
  peri:'Suyak usti pardasi (periost)',compact:'Kompakt modda',spongy:'G‘ovak modda (trabekulalar)',marrow:'Suyak ko‘migi',
  oclast:'Osteoklast (ko‘p yadroli, Ø 40–100 µm)',oblast:'Osteoblastlar (osteoid ishlab chiqaradi)',osteoid:'Osteoid (mineralsiz matriks)',rev:'Qaytish zonasi',cap:'Kapillyar',cone:'Kesuvchi konus',newost:'Yangi osteon'});
KIT.names(NAMES.en,{ost:'Osteon (Haversian system, Ø ~200–250 µm)',hav:'Haversian canal (Ø ~50 µm: vessel, nerve)',lam:'Concentric lamellae (3–7 µm)',ocyt:'Osteocyte (in lacuna)',canal:'Canaliculi (osteocyte network)',volk:'Volkmann canal',cement:'Cement line',inter:'Interstitial lamellae',
  peri:'Periosteum',compact:'Compact bone',spongy:'Spongy bone (trabeculae)',marrow:'Bone marrow',
  oclast:'Osteoclast (multinucleated, Ø 40–100 µm)',oblast:'Osteoblasts (secrete osteoid)',osteoid:'Osteoid (unmineralised matrix)',rev:'Reversal zone',cap:'Capillary',cone:'Cutting cone',newost:'New osteon'});
SM.items.osteon=preset(1700,900,(g,it)=>{const k=it.kind||'structure',A={};if(!['structure','remodeling'].includes(k))SERR.push(`osteon: kind "${k}" → structure, remodeling`);const TT=it.cycle||12;let R0;
  if(k==='structure'){
    const UM=1.8;// 1 µm = 1.8 px
    const area=clipTo(g,['rect',{x:60,y:150,width:900,height:640,rx:16}]);el('rect',{x:60,y:150,width:900,height:640,fill:'#D9C7A3'},area);
    for(let i=0;i<14;i++)el('path',{d:`M60,${170+i*48} q 450 ${(i%2?18:-18)} 900 0`,stroke:'#C4AF86','stroke-width':3,fill:'none'},area);// interstitial lamellae
    const osteon=(cx,cy,R,main)=>{const G=el('g',{},area);el('circle',{cx,cy,r:R+5,fill:'#CDB78F',stroke:'#8D6E63','stroke-width':4},G);const n=main?9:7;const hc=25*UM;
      for(let j=0;j<n;j++){const r=hc+(R-hc)*(j+1)/n;el('circle',{cx,cy,r:f2(r),fill:j%2?'#E6D6B4':'#DCC9A1',stroke:'#B39A70','stroke-width':1.5},G)}
      for(let j=n-1;j>=0;j--){}const ocs=[];
      for(let j=1;j<n;j+=2){const r=hc+(R-hc)*(j+.5)/n;const m=Math.round(r/32);for(let q=0;q<m;q++){const a=q/m*2*Math.PI+j;const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;
        if(main)for(let c=-2;c<=2;c++){const a2=a+Math.PI/2*0;el('path',{d:`M${f2(x)},${f2(y)} L${f2(x+Math.cos(a)*(14+c*0))+','+f2(y+Math.sin(a)*14)}`,stroke:'#6D4C41','stroke-width':.8},G)}
        const e=el('ellipse',{cx:f2(x),cy:f2(y),rx:7,ry:3.5,fill:'#5D4037',transform:`rotate(${f2(a*180/Math.PI+90)} ${f2(x)} ${f2(y)})`},G);ocs.push({e,x,y,a,r})}}
      if(main)ocs.forEach(o=>{for(const s of[-1,1]){el('path',{d:`M${f2(o.x)},${f2(o.y)} L${f2(o.x-Math.cos(o.a)*22+Math.cos(o.a+Math.PI/2)*s*3)},${f2(o.y-Math.sin(o.a)*22+Math.sin(o.a+Math.PI/2)*s*3)}`,stroke:'#6D4C41','stroke-width':1},G);el('path',{d:`M${f2(o.x)},${f2(o.y)} L${f2(o.x+Math.cos(o.a)*22+Math.cos(o.a+Math.PI/2)*s*3)},${f2(o.y+Math.sin(o.a)*22+Math.sin(o.a+Math.PI/2)*s*3)}`,stroke:'#6D4C41','stroke-width':1},G)}});
      const hv=el('circle',{cx,cy,r:hc,fill:'#2B1B17',stroke:'#8D6E63','stroke-width':3},G);el('circle',{cx:cx-hc*.35,cy,r:hc*.32,fill:'#C62828'},G);el('circle',{cx:cx+hc*.35,cy:cy-4,r:hc*.25,fill:'#1565C0'},G);el('circle',{cx:cx+hc*.1,cy:cy+hc*.5,r:hc*.14,fill:'#FDD835'},G);
      return {G,hv,ocs,cx,cy,R,hc}};
    const others=[[150,260,95],[860,250,105],[170,700,110],[880,700,100],[560,180,80],[540,780,85]].map(([x,y,r])=>osteon(x,y,r*UM*.62,false));
    const M=osteon(500,470,112*UM,true);
    const vk=el('path',{d:`M${M.cx+M.hc},${M.cy} L${others[1].cx-20},${others[1].cy+20}`,stroke:'#2B1B17','stroke-width':22,'stroke-linecap':'round'},area);el('path',{d:`M${M.cx+M.hc},${M.cy} L${others[1].cx-20},${others[1].cy+20}`,stroke:'#C62828','stroke-width':6},area);
    M.G.parentNode.appendChild(M.G);
    sbar(g,90,830,100*UM,'100 µm');
    const pulses=[...Array(12)].map(()=>el('circle',{r:5,fill:'#FFD54F'},g));
    // inset: long bone
    const IX=1060;txt(g,T(U('Uzun suyak diafizi (kesim)','Long-bone diaphysis (section)')),IX+270,170,{size:20,color:'ink',weight:800});
    el('rect',{x:IX,y:200,width:540,height:300,rx:30,fill:'#BCAAA4'},g);const cmp=el('rect',{x:IX+12,y:212,width:516,height:276,rx:24,fill:'#E6D6B4'},g);
    const spg=el('rect',{x:IX+80,y:272,width:380,height:156,rx:20,fill:'#F3E5C8'},g);for(let i=0;i<18;i++){const x=IX+95+(i*41)%350,y=285+(i*29)%130;el('path',{d:`M${x},${y} l${20+(i%3)*8},${(i%2?14:-12)}`,stroke:'#CDB78F','stroke-width':6,'stroke-linecap':'round'},g)}
    const mar=el('ellipse',{cx:IX+270,cy:350,rx:120,ry:40,fill:'#C62828',opacity:.7},g);
    for(let i=0;i<12;i++){const x=IX+30+i*44;[230,470].forEach(y=>el('circle',{cx:x,cy:y,r:9,fill:'none',stroke:'#8D6E63','stroke-width':2},g))}
    const sel=el('rect',{x:IX+150,y:216,width:46,height:34,fill:'none',stroke:'#FFD54F','stroke-width':3},g);arw(g,[IX+150,233],[970,300],'#FFD54F',2,'6 5');
    lines(g,IX,560,[U('Kompakt suyak: skelet massasining ~80%','Compact bone: ~80% of skeletal mass'),U('Matriks: ~65% mineral (gidroksiapatit), ~25% organik (I tip kollagen), ~10% suv','Matrix: ~65% mineral (hydroxyapatite), ~25% organic (type I collagen), ~10% water'),U('Qo‘shni plastinkalarda kollagen yo‘nalishi almashadi (mustahkamlik)','Collagen direction alternates between lamellae (strength)'),U('Osteotsit hech qachon kapillyardan ~0,2 mm dan uzoq emas','No osteocyte is farther than ~0.2 mm from a capillary')],{size:17,dy:30});
    note(g,U('Ko‘ndalang kesim, masshtab 1 µm = 1,8 px; kanalchalar sxematik kamaytirilgan','Cross-section, scale 1 µm = 1.8 px; canaliculi schematically reduced'),1150,860,{size:18});
    const oc=M.ocs[4];Object.assign(A,{ost:{el:M.G,fx:.15,fy:.1},hav:{el:M.hv,fx:.5,fy:.5},lam:[M.cx-M.R*.7,M.cy-M.R*.55],ocyt:[oc.x,oc.y],canal:[M.ocs[9].x,M.ocs[9].y],volk:{el:vk,fx:.6,fy:.5},cement:[M.cx,M.cy+M.R+5],inter:[100,560],peri:[IX+400,200],compact:[IX+40,350],spongy:[IX+140,300],marrow:{el:mar,fx:.6,fy:.5}});
    R0={anchors:A,core:['ost','hav','lam','ocyt','canal','volk','cement','inter','peri','compact','spongy','marrow'],labelLayout:'tb',update(lt){pulses.forEach((p,i)=>{const o=M.ocs[(i*5)%M.ocs.length];const q=(lt*.4+i/12)%1;const a=o.a;const r=M.hc+(o.r-M.hc)*q;at(p,{cx:f2(M.cx+Math.cos(a)*r),cy:f2(M.cy+Math.sin(a)*r),opacity:f2(Math.sin(Math.PI*q))})});at(sel,{opacity:f2(.6+.4*Math.sin(lt*3))})}};
  }else{
    const Y0=240,Y1=640,YC=440,X0=100,X1=1250;el('rect',{x:X0,y:Y0-60,width:X1-X0,height:Y1-Y0+120,fill:'#D9C7A3'},g);
    const tun=el('path',{d:'',fill:'#2B1B17'},g);const ost=el('path',{d:'',fill:'#F6E7C1'},g);const lamG=el('g',{},g);
    const cap=el('path',{d:`M${X0},${YC} L${X1},${YC}`,stroke:'#C62828','stroke-width':10},g);
    const ocl=[...Array(3)].map((_,i)=>{const G=el('g',{},g);el('ellipse',{rx:46,ry:30,fill:'#AB47BC',stroke:'#E1BEE7','stroke-width':3},G);for(let n=0;n<5;n++)el('circle',{cx:-24+n*12,cy:(n%2?-6:6),r:5,fill:'#4A148C'},G);return G});
    const obl=[...Array(16)].map(()=>el('rect',{width:22,height:18,rx:5,fill:'#26A69A',stroke:'#B2DFDB','stroke-width':2},g));
    const Ccut=t=>X0+180+(X1-X0-260)*Math.min(1,t/10);// tip x
    const shape=(t,front,r0)=>{const tip=front;const R=150;const tail=X0;return `M${tail},${YC-r0} L${f2(tip-R)},${YC-r0} Q${f2(tip)},${YC-r0} ${f2(tip+30)},${YC} Q${f2(tip)},${YC+r0} ${f2(tip-R)},${YC+r0} L${tail},${YC+r0} Z`};
    const RAN=box(g,1460,300,300,60,'RANKL ↑ → osteoklast','#AB47BC'),OPG=box(g,1460,400,300,60,'OPG (aldamchi retseptor)','#26A69A'),PTH=box(g,1460,500,300,60,T(U('PTG, kalsitriol, estrogen ↓','PTH, calcitriol, oestrogen ↓')),'#FFB74D');
    const C=axes(g,1320,640,300,120,{x:[0,4],y:[0,1],xt:[0,1,2,3,4],xl:U('oy','months'),yl:U('Bitta BMU sikli','One BMU cycle')});
    el('rect',{x:C.px(0),y:670,width:C.px(.7)-C.px(0),height:30,fill:'#AB47BC'},g);el('rect',{x:C.px(.7),y:670,width:C.px(1)-C.px(.7),height:30,fill:'#78909C'},g);el('rect',{x:C.px(1),y:670,width:C.px(4)-C.px(1),height:30,fill:'#26A69A'},g);
    txt(g,T(U('rezorbsiya ~3 hafta','resorption ~3 wk')),C.px(.35),725,{size:14,color:'#E1BEE7',weight:700});txt(g,T(U('hosil bo‘lish ~3 oy','formation ~3 mo')),C.px(2.5),725,{size:14,color:'#B2DFDB',weight:700});
    const cur=el('line',{y1:660,y2:710,stroke:TH.ink,'stroke-width':3},g);
    sbar(g,X0+20,Y1+90,100,'~100 µm');
    const st=steps(g,100,130,[[0,U('Osteoklastlar tunnel qazadi (~20–40 µm/sutka)','Osteoclasts bore a tunnel (~20–40 µm/day)')],[3,U('Orqasidan kapillyar o‘sadi, qaytish zonasi','Capillary follows; reversal zone')],[5,U('Osteoblastlar osteoid qatlamlarini yotqizadi','Osteoblasts lay down osteoid layers')],[8,U('Osteoid 10–15 kunda mineralizatsiyalanadi → yangi osteon','Osteoid mineralises in 10–15 days → new osteon')]],{size:22});
    lines(g,1320,170,[U('Kattalarda skeletning ~10% i yiliga yangilanadi','Adults renew ~10% of the skeleton per year'),U('Bir vaqtda ~1–2 mln BMU faol','~1–2 million BMUs active at once')],{size:17,dy:28});
    note(g,U('Bo‘ylama kesim, sxematik; tezliklar va muddatlar Parfitt bo‘yicha taxminiy','Longitudinal section, schematic; rates and durations approximate (Parfitt)'),850,880,{size:18});
    Object.assign(A,{oclast:{el:ocl[0],fx:.5,fy:0},oblast:{el:obl[3],fx:.5,fy:1},osteoid:[X0+70,YC-140],rev:()=>[Ccut(((window.__lt||0)%TT))-260,YC-140],cap:[X0+120,YC],cone:()=>[Ccut(((window.__lt||0)%TT))-40,YC+150],newost:[X0+60,YC+120]});
    R0={anchors:A,core:['oclast','oblast','osteoid','rev','cap','cone','newost'],labelLayout:'tb',update(lt){window.__lt=lt;const t=((lt%TT)+TT)%TT;const tip=Ccut(t+2);
      at(tun,{d:shape(t,tip,150)});const fill=Math.min(1,Math.max(0,(t-4)/6));const r1=150-130*fill;
      // osteoid ring grows behind: drawn as band from tail to tip-350
      const bx=Math.max(X0,tip-420);at(ost,{d:`M${X0},${YC-150} L${f2(bx)},${YC-150} L${f2(bx)},${YC-r1} L${X0},${YC-r1} Z M${X0},${YC+r1} L${f2(bx)},${YC+r1} L${f2(bx)},${YC+150} L${X0},${YC+150} Z`});
      ocl.forEach((o,i)=>{const a=(-.75+i*.75);at(o,{transform:`translate(${f2(tip-25-Math.abs(Math.sin(a))*70)},${f2(YC+Math.sin(a)*170)}) rotate(${f2(a*57+90)})`})});
      obl.forEach((b,i)=>{const s=i<8?-1:1;const x=X0+30+((i%8)*(bx-X0-60)/8);at(b,{x:f2(x),y:f2(YC+s*(r1+(s<0?2:-20))-(s<0?18:0)),opacity:bx-X0>80?1:0})});
      at(cap,{d:`M${X0},${YC} L${f2(Math.max(X0,tip-260))},${YC}`});at(cur,{x1:f2(C.px(t/TT*4)),x2:f2(C.px(t/TT*4))});
      lit(RAN,t<4);lit(OPG,t>=4&&t<8);lit(PTH,false);st(t)}};
  }
  R0.update(0);return R0});
/* ---------- CHEMICAL SENSES: olfaction (OR → Golf → cAMP → CNG; glomerular convergence) · taste (bud cell types & transduction) ---------- */
KIT.names(NAMES.uz,{oep:'Hid bilish epiteliysi (~5 cm² har tomonda)',orn:'Hid retseptor neyronlari (~6 mln har tomonda)',cilia:'Kiprikchalar shilliqda',sus:'Tayanch hujayralar',basal:'Bazal (o‘zak) hujayralar — 30–60 kunda yangilanish',crib:'G‘alvirsimon plastinka',bulb:'Hid piyozchasi',glom:'Glomerulalar (~5500)',mitral:'Mitral hujayralar → hid yo‘li',odor:'Hidli molekulalar',
  bud:'Ta’m kurtagi (50–150 hujayra, Ø ~50 µm)',pore:'Ta’m teshigi',t1:'I tip (tayanch, sho‘r ENaC?)',t2:'II tip: shirin/umami/achchiq (T1R, T2R)',t3:'III tip: nordon (OTOP1, H⁺)',nerve:'Afferent tola (VII, IX, X nervlar)',pap:'So‘rg‘ichlar: qo‘ziqorinsimon, bargsimon, novsimon'});
KIT.names(NAMES.en,{oep:'Olfactory epithelium (~5 cm² per side)',orn:'Olfactory receptor neurons (~6 M per side)',cilia:'Cilia in mucus',sus:'Supporting cells',basal:'Basal (stem) cells — renewal 30–60 days',crib:'Cribriform plate',bulb:'Olfactory bulb',glom:'Glomeruli (~5500)',mitral:'Mitral cells → olfactory tract',odor:'Odorant molecules',
  bud:'Taste bud (50–150 cells, Ø ~50 µm)',pore:'Taste pore',t1:'Type I (support, salt ENaC?)',t2:'Type II: sweet/umami/bitter (T1R, T2R)',t3:'Type III: sour (OTOP1, H⁺)',nerve:'Afferent fibre (CN VII, IX, X)',pap:'Papillae: fungiform, foliate, circumvallate'});
SM.items.chemosense=preset(1700,900,(g,it)=>{const k=it.kind||'olfaction',A={};if(!['olfaction','taste'].includes(k))SERR.push(`chemosense: kind "${k}" → olfaction, taste`);const TT=it.cycle||12;let R0;
  const COL=['#FF7043','#66BB6A','#42A5F5','#AB47BC'];
  if(k==='olfaction'){
    el('rect',{x:60,y:560,width:860,height:200,fill:'#F8BBD0',opacity:.25},g);el('rect',{x:60,y:735,width:860,height:40,fill:'#B3E5FC',opacity:.35},g);txt(g,T(U('shilliq qavat (~30 µm)','mucus (~30 µm)')),880,760,{size:15,color:'dim',weight:600,anchor:'end'});
    const crib=el('g',{},g);for(let i=0;i<9;i++)el('rect',{x:60+i*100,y:460,width:70,height:24,fill:'#D7CCC8'},crib);
    const bulbG=el('g',{},g);el('ellipse',{cx:490,cy:290,rx:420,ry:120,fill:'#4E342E',opacity:.45,stroke:'#A1887F','stroke-width':3},bulbG);
    const GX=[200,390,580,770];GX.forEach((x,i)=>el('circle',{cx:x,cy:330,r:42,fill:'none',stroke:COL[i],'stroke-width':4,'stroke-dasharray':'3 3'},bulbG));
    const mit=GX.map((x,i)=>{const G=el('g',{},g);el('path',{d:`M${x},${300} L${x},250 L${x+60},${190-i*6} L1000,${190-i*6}`,stroke:COL[i],'stroke-width':3,fill:'none',opacity:.8},G);el('path',{d:`M${x-10},250 l10,-14 l10,14 z`,fill:COL[i]},G);return G});
    txt(g,T(U('→ piriform po‘stloq (talamussiz!)','→ piriform cortex (no thalamic relay!)')),1000,170,{size:16,color:'dim',weight:700,anchor:'start'});
    const N=16,neu=[];for(let i=0;i<N;i++){const x=95+i*52,ty=(i*7)%4;const G=el('g',{},g);const col=COL[ty];
      el('path',{d:`M${x},620 C${x},520 ${GX[ty]},420 ${GX[ty]},350`,stroke:col,'stroke-width':2.5,fill:'none',opacity:.85},G);
      el('ellipse',{cx:x,cy:640,rx:10,ry:16,fill:col},G);el('path',{d:`M${x},656 L${x},735`,stroke:col,'stroke-width':4},G);el('circle',{cx:x,cy:738,r:6,fill:col},G);
      for(let c=-2;c<=2;c++)el('path',{d:`M${x},740 q ${c*8} 14 ${c*16} 22`,stroke:col,'stroke-width':1.5,fill:'none'},G);neu.push({G,x,ty})}
    for(let i=0;i<N-1;i++){const x=121+i*52;el('rect',{x:x-9,y:590,width:18,height:140,rx:7,fill:'#F48FB1',opacity:.55},g)}
    for(let i=0;i<8;i++)el('circle',{cx:120+i*105,cy:585,r:9,fill:'#CE93D8'},g);
    sbar(g,80,810,50,'~10 µm*');
    const od=[...Array(14)].map((_,i)=>{const ty=i%4;const G=el('g',{},g);if(ty===0)el('polygon',{points:'0,-9 8,6 -8,6',fill:COL[0]},G);else if(ty===1)el('rect',{x:-7,y:-7,width:14,height:14,fill:COL[1]},G);else if(ty===2)el('circle',{r:8,fill:COL[2]},G);else el('path',{d:'M-9,0 L0,-9 L9,0 L0,9 Z',fill:COL[3]},G);return {G,ty}});
    // cascade
    const CX=1300;const B=[box(g,CX,300,300,52,T(U('Hidli modda + OR (~400 gen)','Odorant + OR (~400 genes)')),'#FF7043'),box(g,CX,380,300,52,'Gαolf → AC III','#FFB74D'),box(g,CX,460,300,52,'cAMP ↑','#FFD54F'),box(g,CX,540,300,52,T(U('CNG kanal: Na⁺, Ca²⁺ kiradi','CNG channel: Na⁺, Ca²⁺ in')),'#81C784'),box(g,CX,620,300,52,T(U('Ca²⁺ → Cl⁻ chiqadi (ANO2)','Ca²⁺ → Cl⁻ out (ANO2)')),'#4FC3F7'),box(g,CX,700,300,52,T(U('Depolyarizatsiya → AP','Depolarisation → AP')),'#CE93D8')];
    for(let i=0;i<5;i++)arw(g,[CX,326+i*80],[CX,350+i*80],TH.ink,3);
    lines(g,1100,770,[U('1 neyron = 1 retseptor turi; bir xil turdagi','1 neuron = 1 receptor type; all neurons of'),U('neyronlar 1–2 glomerulaga yig‘iladi','one type converge on 1–2 glomeruli')],{size:16,dy:24});
    const st=steps(g,1100,230,[[0,U('Hidli molekula shilliqda eriydi','Odorant dissolves in mucus')],[3,U('Kiprikchadagi retseptor faollashadi','Ciliary receptor activates')],[6,U('Signal aksonlar orqali piyozchaga','Signal travels along axons to the bulb')],[9,U('Glomerula xaritasi → hid “kodi”','Glomerular map → odour “code”')]],{size:21});
    note(g,U('Sxema: 4 retseptor turi rang bilan; haqiqiyda ~400 tur. *Masshtab hujayralar uchun taxminiy','Schematic: 4 receptor types colour-coded; ~400 in reality. *Scale approximate for cells'),850,880,{size:18});
    Object.assign(A,{oep:[80,660],orn:{el:neu[5].G,fx:.5,fy:.9},cilia:[neu[9].x,752],sus:[121+52*11,600],basal:[120+105*6,585],crib:{el:crib,fx:.5,fy:.5},bulb:[490,180],glom:[GX[2]+40,330],mitral:{el:mit[3],fx:.9,fy:.1},odor:[600,800]});
    R0={anchors:A,core:['oep','orn','cilia','sus','basal','crib','bulb','glom','mitral','odor'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;const act=[0,1,2,3].map(i=>Math.max(0,Math.sin(Math.PI*(((lt*.25)+i*.25)%1))));
      od.forEach((o,i)=>{const q=(lt*.3+i/14)%1;const x=100+((i*131)%780);at(o.G,{transform:`translate(${f2(x)},${f2(850-q*100)})`,opacity:f2(Math.sin(Math.PI*q))})});
      neu.forEach(n=>at(n.G,{opacity:f2(.35+.65*act[n.ty])}));mit.forEach((m,i)=>at(m,{opacity:f2(.3+.7*act[i])}));
      const s=Math.floor((t/TT)*6);B.forEach((b,i)=>lit(b,i===s));st(t)}};
  }else{
    // tongue inset
    const tg=el('g',{},g);el('path',{d:'M120,520 C120,300 200,200 300,200 C400,200 480,300 480,520 C480,640 420,700 300,700 C180,700 120,640 120,520 Z',fill:'#E57373',stroke:'#FFCDD2','stroke-width':3},tg);
    for(let i=0;i<40;i++){const a=i*2.4,r=Math.sqrt(i/40)*150;el('circle',{cx:f2(300+Math.cos(a)*r*.9),cy:f2(500+Math.sin(a)*r*1.1),r:4,fill:'#FFCDD2'},tg)}
    [[200,300],[250,265],[300,255],[350,265],[400,300]].forEach(([x,y])=>el('circle',{cx:x,cy:y,r:13,fill:'#EF9A9A',stroke:'#B71C1C','stroke-width':3},tg));
    [130,470].forEach(x=>{for(let j=0;j<4;j++)el('line',{x1:x,x2:x+(x<300?14:-14),y1:380+j*16,y2:380+j*16,stroke:'#B71C1C','stroke-width':3},tg)});
    txt(g,T(U('Til (kurtaklar ~2000–5000)','Tongue (~2000–5000 buds)')),300,740,{size:18,color:'ink',weight:700});sbar(g,240,780,120,'~1 cm');
    txt(g,T(U('“Til xaritasi” — afsona: barcha ta’mlar hamma joyda seziladi','“Tongue map” is a myth: all tastes everywhere')),300,820,{size:15,color:'#FF8A80',weight:700});
    // bud
    const BX=820,BY=480;el('rect',{x:560,y:240,width:520,height:500,fill:'#F8BBD0',opacity:.3},g);el('rect',{x:560,y:240,width:520,height:40,fill:'#FCE4EC',opacity:.5},g);
    const budG=el('g',{},g);el('ellipse',{cx:BX,cy:BY+30,rx:120,ry:200,fill:'#F48FB1',stroke:'#AD1457','stroke-width':3},budG);
    const cells=[];const TY=[0,1,0,2,1,0,1,2,0];TY.forEach((ty,i)=>{const x=BX-96+i*24;const c=['#CE93D8','#4FC3F7','#FFB74D'][ty];const e=el('path',{d:`M${x},${BY+210} Q${x-6},${BY+30} ${BX+(x-BX)*.25},${BY-160}`,stroke:c,'stroke-width':18,'stroke-linecap':'round',fill:'none'},g);cells.push({e,ty,x,c})});
    const pore=el('circle',{cx:BX,cy:BY-172,r:12,fill:'#3E2723'},g);
    const nv=el('path',{d:`M${BX-60},${BY+250} C${BX-40},${BY+200} ${BX+40},${BY+200} ${BX+60},${BY+250} M${BX},${BY+215} L${BX},${BY+300}`,stroke:'#FFD54F','stroke-width':5,fill:'none'},g);
    sbar(g,600,800,90,'~20 µm');
    const stim=[...Array(12)].map((_,i)=>el('circle',{r:6,fill:['#FFF59D','#FF8A65','#A5D6A7','#90CAF9','#CE93D8'][i%5]},g));
    // table
    const TX=1150;const ROWS=[[U('Shirin','Sweet'),'T1R2+T1R3','II'],[U('Umami','Umami'),'T1R1+T1R3','II'],[U('Achchiq','Bitter'),U('T2R (~25 tur)','T2R (~25 types)'),'II'],[U('Nordon','Sour'),'OTOP1 (H⁺)','III'],[U('Sho‘r','Salty'),'ENaC (Na⁺)','I?']];
    txt(g,T(U('Ta’m · retseptor · hujayra','Taste · receptor · cell')),TX,250,{size:20,color:'ink',weight:800,anchor:'start'});
    const rT=ROWS.map(([a,b,c],i)=>{const y=295+i*44;const G=el('g',{},g);el('rect',{x:TX-10,y:y-28,width:500,height:38,rx:8,fill:'#0D1B2A',stroke:TH.faint},G);txt(G,T(a),TX,y,{size:18,color:'ink',weight:700,anchor:'start'});txt(G,typeof b==='string'?b:T(b),TX+150,y,{size:17,color:'dim',weight:600,anchor:'start'});txt(G,c,TX+440,y,{size:17,color:'#FFD54F',weight:800,anchor:'start'});return G});
    lines(g,TX,560,[U('II tip: G-oqsil (gustdusin) → PLCβ2 → IP₃ → Ca²⁺','Type II: G protein (gustducin) → PLCβ2 → IP₃ → Ca²⁺'),U('→ TRPM5 → ATF CALHM1 kanali orqali chiqadi','→ TRPM5 → ATP released via CALHM1'),U('III tip: klassik sinaps (serotonin)','Type III: conventional synapse (serotonin)'),U('Kurtak hujayralari ~10 kunda yangilanadi','Bud cells renew every ~10 days')],{size:17,dy:30});
    const st=steps(g,560,200,[[0,U('Ta’mli modda so‘lakda eriydi, teshikka kiradi','Tastant dissolves in saliva, enters the pore')],[4,U('Mos hujayra turi faollashadi','Matching cell type activates')],[8,U('Afferent tola → yakka yo‘l yadrosi → talamus → insula','Afferent → solitary nucleus → thalamus → insula')]],{size:21});
    note(g,U('Sxema; sho‘r ta’m mexanizmi hali to‘liq aniqlanmagan (ENaC + boshqalar)','Schematic; salt transduction not fully resolved (ENaC + others)'),850,880,{size:18});
    Object.assign(A,{bud:{el:budG,fx:.9,fy:.6},pore:{el:pore,fx:.5,fy:0},t1:{el:cells[0].e,fx:.3,fy:.7},t2:{el:cells[1].e,fx:.5,fy:.5},t3:{el:cells[3].e,fx:.6,fy:.75},nerve:{el:nv,fx:.5,fy:1},pap:[300,255]});
    R0={anchors:A,core:['bud','pore','t1','t2','t3','nerve','pap'],labelLayout:'tb',update(lt){const t=((lt%TT)+TT)%TT;const row=Math.floor(lt/2.4)%5;const tyAct=row<3?1:row===3?2:0;
      stim.forEach((s,i)=>{const q=(lt*.35+i/12)%1;at(s,{cx:f2(BX-80+((i*37)%160)*(1-q)),cy:f2(BY-260+q*90),fill:['#FFF59D','#FF8A65','#A5D6A7','#90CAF9','#CE93D8'][row],opacity:f2(Math.sin(Math.PI*q))})});
      cells.forEach(c=>at(c.e,{'stroke-width':c.ty===tyAct?22:16,opacity:c.ty===tyAct?1:.45}));rT.forEach((r,i)=>at(r,{opacity:i===row?1:.45}));at(nv,{opacity:f2(.5+.5*Math.sin(lt*6)**2)});st(t)}};
  }
  R0.update(0);return R0});

KIT.bind();
})();
