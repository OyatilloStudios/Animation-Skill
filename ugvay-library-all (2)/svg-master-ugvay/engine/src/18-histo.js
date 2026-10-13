/* ================= SHELF: HISTOLOGY & CYTOLOGY — tissue (15 kinds, H&E microscope look) · celltype · cellgallery · skin · hair · sarcomere · musclezoom =================
   Medical shapes are fixed drawings (no randomness); small irregularities use fixed seeds so every render is identical. */
(()=>{
const {mix,dark,light,vol,txt,cyc,T}=KIT;
KIT.names(NAMES.uz,{epithelium:'Epiteliy',basement:'Bazal membrana',connective:'Biriktiruvchi to‘qima',lumen:'Bo‘shliq (yo‘l)',goblet:'Qadahsimon hujayra',microvilli:'Mikrovorsinkalar',cilia:'Kiprikchalar',keratin:'Shox qavat',basal:'Bazal qavat',
  collagen:'Kollagen tolalar',elastic:'Elastik tolalar',fibroblast:'Fibroblast',adipocyte:'Yog‘ hujayrasi',chondrocyte:'Xondrotsit',lacuna:'Lakuna',matrixC:'Hujayralararo modda',osteon:'Osteon',haversian:'Gavers kanali',lamellae:'Plastinkalar',osteocyte:'Osteotsit',
  rbcs:'Eritrotsitlar',neutrophil:'Neytrofil',lymphocyte:'Limfotsit',platelets:'Trombotsitlar',fiber:'Mushak tolasi',striations:'Ko‘ndalang targ‘illik',nuclei:'Yadrolar',disc:'Interkalyar disk',branch:'Tarmoqlanish',spindle:'Duksimon hujayra',
  soma:'Neyron tanasi',nucleolus:'Yadrocha',nissl:'Nissl moddasi',glia:'Gliya hujayralari',process:'O‘simtalar',
  epidermis:'Epidermis',dermis:'Derma',hypodermis:'Gipoderma (yog‘ qavati)',corneum:'Shox qavat',melanocyte:'Melanotsit',hairShaft:'Soch tolasi',follicle:'Soch follikulasi',sebaceous:'Yog‘ bezi',arrector:'Sochni ko‘taruvchi mushak',
  sweatGland:'Ter bezi',pore:'Ter teshigi',capillary:'Kapillyarlar',artery:'Arteriya',vein:'Vena',meissner:'Meysner tanachasi (teginish)',pacinian:'Pachini tanachasi (bosim)',fat:'Yog‘ bo‘lakchalari',nerve:'Nerv',papilla:'Derma so‘rg‘ichi',
  bulb:'Soch piyozchasi',dpapilla:'Soch so‘rg‘ichi (qon bilan ta’minlaydi)',matrixH:'Matriks (o‘suvchi hujayralar)',innerSheath:'Ichki ildiz qini',outerSheath:'Tashqi ildiz qini',cuticle:'Kutikula',cortex:'Korteks (pigment)',medulla:'Medulla (o‘zak)',root:'Soch ildizi',
  zdisc:'Z-chiziq',mline:'M-chiziq',actin:'Aktin (ingichka filament)',myosin:'Miozin (yo‘g‘on filament)',aband:'A-disk (o‘zgarmaydi)',iband:'I-disk (qisqaradi)',hzone:'H-zona (qisqaradi)',sarcomere:'Sarkomer',
  muscleW:'Skelet mushagi',tendon:'Pay',fascicle:'Mushak tutami',myofibril:'Miofibrilla',epimysium:'Epimiziy',perimysium:'Perimiziy'});
KIT.names(NAMES.en,{epithelium:'Epithelium',basement:'Basement membrane',connective:'Connective tissue',lumen:'Lumen',goblet:'Goblet cell',microvilli:'Microvilli',cilia:'Cilia',keratin:'Keratin layer',basal:'Basal layer',
  collagen:'Collagen fibres',elastic:'Elastic fibres',fibroblast:'Fibroblast',adipocyte:'Fat cell (adipocyte)',chondrocyte:'Chondrocyte',lacuna:'Lacuna',matrixC:'Matrix',osteon:'Osteon',haversian:'Central (Haversian) canal',lamellae:'Lamellae',osteocyte:'Osteocyte',
  rbcs:'Red blood cells',neutrophil:'Neutrophil',lymphocyte:'Lymphocyte',platelets:'Platelets',fiber:'Muscle fibre',striations:'Striations',nuclei:'Nuclei',disc:'Intercalated disc',branch:'Branching',spindle:'Spindle-shaped cell',
  soma:'Cell body',nucleolus:'Nucleolus',nissl:'Nissl bodies',glia:'Glial cells',process:'Processes',
  epidermis:'Epidermis',dermis:'Dermis',hypodermis:'Hypodermis (fat)',corneum:'Stratum corneum',melanocyte:'Melanocyte',hairShaft:'Hair shaft',follicle:'Hair follicle',sebaceous:'Sebaceous gland',arrector:'Arrector pili muscle',
  sweatGland:'Sweat gland',pore:'Sweat pore',capillary:'Capillaries',artery:'Artery',vein:'Vein',meissner:'Meissner corpuscle (touch)',pacinian:'Pacinian corpuscle (pressure)',fat:'Fat lobules',nerve:'Nerve',papilla:'Dermal papilla',
  bulb:'Hair bulb',dpapilla:'Dermal papilla (blood supply)',matrixH:'Matrix (dividing cells)',innerSheath:'Inner root sheath',outerSheath:'Outer root sheath',cuticle:'Cuticle',cortex:'Cortex (pigment)',medulla:'Medulla',root:'Hair root',
  zdisc:'Z line',mline:'M line',actin:'Actin (thin filament)',myosin:'Myosin (thick filament)',aband:'A band (stays the same)',iband:'I band (shortens)',hzone:'H zone (shortens)',sarcomere:'Sarcomere',
  muscleW:'Skeletal muscle',tendon:'Tendon',fascicle:'Fascicle',myofibril:'Myofibril',epimysium:'Epimysium',perimysium:'Perimysium'});
KIT.names(NAMES.ru,{epidermis:'Эпидермис',dermis:'Дерма',hypodermis:'Гиподерма',sebaceous:'Сальная железа',sweatGland:'Потовая железа',follicle:'Волосяной фолликул',hairShaft:'Стержень волоса',sarcomere:'Саркомер',actin:'Актин',myosin:'Миозин',zdisc:'Z-линия',
  collagen:'Коллагеновые волокна',adipocyte:'Адипоцит',osteon:'Остеон',chondrocyte:'Хондроцит',neutrophil:'Нейтрофил',lymphocyte:'Лимфоцит',platelets:'Тромбоциты',cilia:'Реснички',goblet:'Бокаловидная клетка',basement:'Базальная мембрана'});
let CID=0;const clip=(cx,cy,r)=>{const id='hcl'+(++CID)+'_'+Math.round(rnd(CID+.7)*1e6);const c=el('clipPath',{id},DEFS);el('circle',{cx,cy,r},c);return `url(#${id})`};
const nuc=(g,x,y,rx,ry,rot=0,c=NAT.heN)=>el('ellipse',{cx:x,cy:y,rx,ry,transform:rot?`rotate(${rot} ${x} ${y})`:undefined,fill:vol(c,{hi:.25,lo:.3}),stroke:dark(c,.3),'stroke-width':1.5},g);
const R=(i,k)=>seeded(i+101,k+7); // fixed pseudo-irregularity (same every render)
/* ---------- TISSUE (microscope field, H&E) ---------- */
const TK={squamous:1,cuboidal:1,columnar:1,stratified:1,ciliated:1,loose:1,dense:1,adipose:1,cartilage:1,bone:1,blood:1,skeletal:1,cardiac:1,smooth:1,nervous:1};
SM.items.tissue=preset(900,800,(g,it)=>{const k=it.kind||'columnar';if(!TK[k])SERR.push(`tissue: kind "${k}" → ${Object.keys(TK).join(', ')}`);const cx=450,cy=400,r=370,A={};const anim=[];
  el('circle',{cx,cy,r:r+14,fill:'#111',opacity:.85},g);const F=el('g',{'clip-path':clip(cx,cy,r)},g);el('rect',{x:0,y:0,width:900,height:800,fill:NAT.heP2},F);
  const pinkBg=(y0,y1,c=NAT.heP)=>el('rect',{x:0,y:y0,width:900,height:y1-y0,fill:c},F);
  const looseCT=(y0,y1)=>{pinkBg(y0,y1,'#F3CFE1');for(let i=0;i<14;i++){const y=y0+20+R(i,1)*(y1-y0-40);el('path',{d:wavy(40,y,860,y+R(i,2)*60-30,8,5+Math.round(R(i,3)*3)),fill:'none',stroke:NAT.heP,'stroke-width':5+R(i,4)*6,opacity:.9},F)}for(let i=0;i<10;i++)nuc(F,60+R(i,5)*780,y0+30+R(i,6)*(y1-y0-60),14,5,R(i,7)*180)};
  const bm=(y)=>el('path',{d:`M0,${y} L900,${y}`,stroke:'#C2185B','stroke-width':5},F);
  if(k==='squamous'){bm(330);looseCT(334,800);el('rect',{x:0,y:0,width:900,height:300,fill:'#FBEFF5'},F);el('path',{d:'M0,316 Q450,306 900,316',stroke:NAT.heP,'stroke-width':26,fill:'none'},F);
    for(let x=60;x<900;x+=150)nuc(F,x,312,40,10);A.epithelium=[440,316];A.basement=[600,330];A.connective=[450,560];A.nuclei=[360,312]}
  if(k==='cuboidal'){looseCT(0,800);[[260,280,1],[640,540,.9],[680,170,.75]].forEach(([x,y,s],q)=>{const n=14,R1=150*s,R2=80*s;el('circle',{cx:x,cy:y,r:R1+6,fill:'none',stroke:'#C2185B','stroke-width':4},F);el('circle',{cx:x,cy:y,r:R1,fill:NAT.heP},F);el('circle',{cx:x,cy:y,r:R2,fill:'#FDF3F8'},F);
    for(let j=0;j<n;j++){const a=j/n*TAU;el('line',{x1:x+Math.cos(a)*R2,y1:y+Math.sin(a)*R2,x2:x+Math.cos(a)*R1,y2:y+Math.sin(a)*R1,stroke:dark(NAT.heP,.2),'stroke-width':2},F);const am=a+Math.PI/n;nuc(F,x+Math.cos(am)*(R1+R2)/2,y+Math.sin(am)*(R1+R2)/2,15*s,15*s)}});
    A.lumen=[260,280];A.epithelium=[260,155];A.basement=[260,124];A.connective=[450,700]}
  if(k==='columnar'||k==='ciliated'){bm(560);looseCT(564,800);el('rect',{x:0,y:0,width:900,height:150,fill:'#FBEFF5'},F);const w=60;
    for(let j=0,x=0;x<900;j++,x+=w){const gob=j%5===2;el('rect',{x:x+2,y:k==='ciliated'?170:180,width:w-4,height:k==='ciliated'?388:378,fill:gob?'#E8D6F0':NAT.heP,stroke:dark(NAT.heP,.25),'stroke-width':2},F);
      if(gob){el('path',{d:`M${x+8},200 Q${x+w/2},170 ${x+w-8},200 L${x+w-12},420 Q${x+w/2},450 ${x+12},420 Z`,fill:'#F5F0FA',stroke:'#B39DDB','stroke-width':2},F);nuc(F,x+w/2,500,14,10)}
      else nuc(F,x+w/2,k==='ciliated'?(j%3===0?470:j%3===1?400:520):480,15,30)}
    if(k==='columnar'){for(let x=4;x<900;x+=7)el('line',{x1:x,y1:180,x2:x,y2:164,stroke:'#C2185B','stroke-width':2.2},F);A.microvilli=[300,165]}
    else{const cil=[];for(let x=6;x<900;x+=10)if(Math.floor(x/60)%5!==2)cil.push([x,el('path',{fill:'none',stroke:'#AD1457','stroke-width':2.4},F)]);A.cilia=[300,140];
      anim.push(lt=>cil.forEach(([x,p])=>{const a=Math.sin(lt*7-x*.03)*14;p.setAttribute('d',`M${x},170 Q${x+a*.4},150 ${x+a},128`)}))}
    A.goblet=[450,320];A.epithelium=[570,330];A.basement=[620,560];A.connective=[450,700];A.nuclei=[390,k==='ciliated'?470:480]}
  if(k==='stratified'){bm(640);looseCT(644,800);pinkBg(0,640,'#F6D5E6');const rows=10;for(let rI=0;rI<rows;rI++){const y=630-rI*60,flat=rI/(rows-1),h=lerp(56,22,flat),w=lerp(52,140,flat);
      for(let x=(rI%2)*w/2-w;x<940;x+=w){el('rect',{x:x+2,y:y-h,width:w-4,height:h-3,rx:6,fill:rI>7?'#F8BBD0':NAT.heP,stroke:dark(NAT.heP,.25),'stroke-width':1.5},F);if(rI<9)nuc(F,x+w/2,y-h/2,lerp(14,24,flat),lerp(14,5,flat))}}
    for(let y=60;y<110;y+=12)el('path',{d:wavy(0,y,900,y+5,4,6),fill:'none',stroke:'#F48FB1','stroke-width':6},F);A.keratin=[450,80];A.basal=[450,600];A.basement=[300,640];A.epithelium=[450,350];A.connective=[450,730]}
  if(k==='loose'){pinkBg(0,800,'#FAE3EE');for(let i=0;i<16;i++){const y=R(i,1)*800,a=R(i,2)*Math.PI;el('path',{d:wavy(450-Math.cos(a)*600,y-Math.sin(a)*300,450+Math.cos(a)*600,y+Math.sin(a)*300,10,6),fill:'none',stroke:NAT.heP,'stroke-width':10+R(i,3)*8},F)}
    for(let i=0;i<14;i++){const y=R(i,4)*800;el('path',{d:wavy(0,y,900,y+R(i,5)*300-150,6,4),fill:'none',stroke:'#4A148C','stroke-width':2},F)}for(let i=0;i<16;i++)nuc(F,80+R(i,6)*740,80+R(i,7)*640,16,6,R(i,8)*180);
    A.collagen=[300,300];A.elastic=[600,500];A.fibroblast=[450,400];A.matrixC=[700,200]}
  if(k==='dense'){pinkBg(0,800,'#F3C1D9');for(let y=20;y<800;y+=34)el('path',{d:wavy(0,y,900,y,7,7),fill:'none',stroke:NAT.heP,'stroke-width':24},F);
    let bf=null,bd=1e9;for(let i=0;i<22;i++){const y=37+Math.floor(R(i,1)*23)*34,x=40+R(i,2)*820;const e=nuc(F,x,y,26,5);const d=Math.hypot(x-470,y-480);if(d<bd){bd=d;bf=e}}A.collagen=[450,292];A.fibroblast=bf}
  if(k==='adipose'){pinkBg(0,800,NAT.heP);const P=[];for(let yy=0;yy<9;yy++)for(let xx=0;xx<9;xx++)P.push([xx*110+(yy%2)*55-20+R(xx*9+yy,1)*24,yy*100-10+R(xx*9+yy,2)*24]);
    P.forEach(([x,y],i)=>{el('path',{d:blob(x,y,52,46,{seed:i,amp:.12,n:8}),fill:'#FFFDF7',stroke:'#E1A0C0','stroke-width':3},F);if(i%3===0)nuc(F,x+40,y+10,7,16,20)});{const near=(q,X,Y)=>P.filter((_,i)=>q(i)).sort((a,b)=>Math.hypot(a[0]-X,a[1]-Y)-Math.hypot(b[0]-X,b[1]-Y))[0];const c0=near(()=>1,360,330),n0=near(i=>i%3===0,520,420),m0=near(()=>1,420,560);A.adipocyte=[c0[0]-8,c0[1]];A.nuclei=[n0[0]+40,n0[1]+10];A.connective=[m0[0]+55,m0[1]]}}
  if(k==='cartilage'){pinkBg(0,800,'#C9B6E4');el('rect',{x:0,y:0,width:900,height:800,fill:'#B9D7E8',opacity:.35},F);
    const grp=[[180,200,2],[420,160,4],[680,240,2],[260,450,4],[560,460,2],[760,520,1],[160,660,2],[440,680,4],[680,720,2],[360,330,1]];
    grp.forEach(([x,y,n],q)=>{el('ellipse',{cx:x,cy:y,rx:n>2?70:52,ry:n>2?60:40,fill:'#9575CD',opacity:.35},F);for(let j=0;j<n;j++){const dx=n===1?0:n===2?(j?24:-24):(j%2?24:-24),dy=n===4?(j<2?-22:22):0;
      el('ellipse',{cx:x+dx,cy:y+dy,rx:22,ry:18,fill:'#FAFAFA',stroke:'#7E57C2','stroke-width':2},F);nuc(F,x+dx,y+dy,9,8)}});A.chondrocyte=[236,428];A.lacuna=[604,460];A.matrixC=[620,340]}
  if(k==='bone'){pinkBg(0,800,'#E7C9D9');const LC=[];const O=[[300,300,190],[640,520,170],[700,140,120],[180,640,130]];O.forEach(([x,y,rr],q)=>{for(let j=6;j>=1;j--)el('circle',{cx:x,cy:y,r:rr*j/6,fill:j%2?'#EBD3E0':'#DDB6CB',stroke:'#C48AAE','stroke-width':2},F);
      el('circle',{cx:x,cy:y,r:rr*.16,fill:'#FFF8F2',stroke:'#8D6E63','stroke-width':3},F);for(let j=1;j<6;j++){const n=6+j*4;for(let m=0;m<n;m++){const a=m/n*TAU+j;const rx=x+Math.cos(a)*rr*(j+.5)/6,ry=y+Math.sin(a)*rr*(j+.5)/6;
        if(q===0)LC.push([rx,ry]);el('ellipse',{cx:rx,cy:ry,rx:6,ry:3,transform:`rotate(${a*180/Math.PI+90} ${rx} ${ry})`,fill:'#4E342E'},F);el('line',{x1:rx,y1:ry,x2:x+Math.cos(a)*rr*(j-.2)/6,y2:y+Math.sin(a)*rr*(j-.2)/6,stroke:'#6D4C41','stroke-width':.8,opacity:.6},F)}}});
    A.osteon=[300,110];A.haversian=[300,300];A.lamellae=[300,180];A.osteocyte=LC.sort((a,b)=>Math.hypot(a[0]-390,a[1]-370)-Math.hypot(b[0]-390,b[1]-370))[0]}
  if(k==='blood'){pinkBg(0,800,'#FBEFF4');const cells=[];for(let i=0;i<60;i++){const c=el('g',{},F);el('circle',{r:34,fill:'#E57373',stroke:'#C62828','stroke-width':2},c);el('circle',{r:14,fill:'#F8BBD0',opacity:.8},c);cells.push([c,R(i,1)*900,R(i,2)*800])}
    const wb=el('g',{},F);el('circle',{cx:300,cy:380,r:58,fill:'#F3E5F5',stroke:'#BA68C8','stroke-width':2},wb);[[-20,-14],[8,-22],[24,8],[-8,18]].forEach(([dx,dy])=>nuc(wb,300+dx,380+dy,16,13,0,'#6A1B9A'));
    const ly=el('g',{},F);el('circle',{cx:620,cy:520,r:44,fill:'#E1F5FE',stroke:'#7986CB','stroke-width':2},ly);nuc(ly,620,520,38,36,0,'#4527A0');
    const pl=[];for(let i=0;i<9;i++)pl.push(el('circle',{r:7,fill:'#7B1FA2',cx:200+R(i,4)*500,cy:150+R(i,5)*500},F));const rb=cells.slice().sort((a,b)=>Math.hypot(a[1]-230,a[2]-560)-Math.hypot(b[1]-230,b[2]-560))[0][0];
    anim.push(lt=>cells.forEach(([c,x,y],i)=>c.setAttribute('transform',`translate(${f2((x+lt*14)%960-30)} ${f2(y+Math.sin(lt*.7+i)*4)})`)));A.rbcs=rb;A.neutrophil=[300,322];A.lymphocyte=[620,476];A.platelets=pl.slice().sort((a,b)=>Math.hypot(+a.getAttribute('cx')-520,+a.getAttribute('cy')-300)-Math.hypot(+b.getAttribute('cx')-520,+b.getAttribute('cy')-300))[0]}
  if(k==='skeletal'||k==='smooth'||k==='cardiac'){pinkBg(0,800,'#F7DDE9');}
  if(k==='skeletal'){for(let j=0;j<6;j++){const y=j*135+20;const fb=el('g',{},F);el('rect',{x:-10,y,width:920,height:118,rx:20,fill:'#E07A9F',stroke:'#AD1457','stroke-width':3},fb);
      for(let x=0;x<900;x+=12)el('line',{x1:x,y1:y+4,x2:x,y2:y+114,stroke:x%24?'#C2185B':'#F8BBD0','stroke-width':x%24?4:3,opacity:.75},fb);for(let q=0;q<4;q++)nuc(fb,80+q*230+j*30,y+(q%2?8:110),34,8)}
    A.fiber=[560,80];A.striations=[300,350];A.nuclei=[370,298]}
  if(k==='smooth'){for(let j=0;j<72;j++){const x=(j%8)*120+((j>>3)%2)*60-30,y=(j>>3)*92+30;el('path',{d:`M${x-90},${y} Q${x},${y-34} ${x+90},${y} Q${x},${y+34} ${x-90},${y}Z`,fill:'#E991B5',stroke:'#C2185B','stroke-width':2},F);nuc(F,x,y,30,7)}
    A.spindle=[525,398];A.nuclei=[450,398]}
  if(k==='cardiac'){const CN=[],CD=[];const P=[[[0,120],[300,140],[520,90],[900,130]],[[0,330],[260,300],[540,360],[900,320]],[[0,560],[320,540],[600,600],[900,560]],[[0,760],[420,730],[900,770]]];
    P.forEach((pts,j)=>{const d=smoothOpen(pts);el('path',{d,fill:'none',stroke:'#AD1457','stroke-width':118,'stroke-linecap':'round'},F);el('path',{d,fill:'none',stroke:'#E07A9F','stroke-width':110},F);
      const pe=el('path',{d},g);const L=pe.getTotalLength();for(let s=0;s<L;s+=12){const p=pe.getPointAtLength(s),p2=pe.getPointAtLength(Math.min(L,s+1));const a=Math.atan2(p2.y-p.y,p2.x-p.x)+Math.PI/2;
        el('line',{x1:p.x-Math.cos(a)*52,y1:p.y-Math.sin(a)*52,x2:p.x+Math.cos(a)*52,y2:p.y+Math.sin(a)*52,stroke:(s/12)%2?'#C2185B':'#F8BBD0','stroke-width':3,opacity:.6},F)}
      for(let s=150;s<L;s+=280){const p=pe.getPointAtLength(s);nuc(F,p.x,p.y,24,13);if(j===1&&!CN[1]&&s>=430)CN[1]=[p.x,p.y]}for(let s=290;s<L;s+=280){const p=pe.getPointAtLength(s),p2=pe.getPointAtLength(s+1);if(j===1&&!CD[1])CD[1]=[p.x,p.y];const a=Math.atan2(p2.y-p.y,p2.x-p.x)+Math.PI/2;
        el('path',{d:`M${f2(p.x-Math.cos(a)*55)},${f2(p.y-Math.sin(a)*55)} l8,10 l-8,10 l8,10 l-8,10 l8,10 l-8,10 l8,10 l-8,10 l8,10`,transform:`rotate(${f2(a*180/Math.PI-90)} ${f2(p.x)} ${f2(p.y)})`,fill:'none',stroke:'#4A148C','stroke-width':6},F)}pe.remove()});
    [[420,215],[400,445]].forEach(([x,y])=>el('path',{d:`M${x},${y-70} Q${x+30},${y} ${x},${y+70}`,stroke:'#E07A9F','stroke-width':70,fill:'none'},F));
    const bx=F;anim.push(lt=>{const s=1+.02*Math.max(0,Math.sin(lt*TAU*1.1));bx.setAttribute('transform',`translate(450 400) scale(${f2(s)}) translate(-450 -400)`)});A.disc=CD[1]||[290,120];A.branch=[420,215];A.nuclei=CN[1]||[300,140];A.striations=[650,330]}
  if(k==='nervous'){pinkBg(0,800,'#F3D7E6');let gl=null,gd=1e9;for(let i=0;i<40;i++){const x=R(i,1)*900,y=R(i,2)*800;const e=nuc(F,x,y,9,8,0,'#5E35B1');const d=Math.hypot(x-230,y-560);if(d<gd&&Math.hypot(x-450,y-400)>200){gd=d;gl=e}}const n=el('g',{},F);
    [[0,-1],[.9,-.5],[1,.6],[-.2,1],[-1,.3],[-.8,-.8]].forEach(([dx,dy],j)=>el('path',{d:`M450,400 Q${450+dx*160},${400+dy*130} ${450+dx*400+R(j,3)*40},${400+dy*360}`,fill:'none',stroke:'#C48AB7','stroke-width':j===2?16:24-j*2,'stroke-linecap':'round'},n));
    el('path',{d:blob(450,400,130,110,{seed:4,amp:.12,n:6}),fill:'#D7A6CC',stroke:'#8E4F86','stroke-width':3},n);for(let i=0;i<26;i++){const a=R(i,4)*TAU,rr=60+R(i,5)*50;el('ellipse',{cx:450+Math.cos(a)*rr,cy:400+Math.sin(a)*rr*.85,rx:12,ry:6,transform:`rotate(${a*57} ${450+Math.cos(a)*rr} ${400+Math.sin(a)*rr*.85})`,fill:'#6A1B9A',opacity:.75},n)}
    el('circle',{cx:450,cy:400,r:42,fill:'#F3E5F5',stroke:'#7B1FA2','stroke-width':3},n);el('circle',{cx:458,cy:396,r:13,fill:'#4A148C'},n);A.soma=[450,296];A.nucleus=[418,388];A.nucleolus=[458,396];A.nissl=[530,440];A.glia=gl;A.process=[612,322]}
  el('circle',{cx,cy,r,fill:'url(#vig)',opacity:.6},g);el('circle',{cx,cy,r,fill:'none',stroke:'#222','stroke-width':6},g);
  txt(g,T({uz:'Mikroskop · gematoksilin–eozin',en:'Microscope · H&E stain',ru:'Микроскоп · окраска Г–Э'}),450,795,{size:22,color:'dim',weight:600});
  return {anchors:A,update(lt){anim.forEach(f=>f(lt))}}});
/* ---------- CELL TYPES (single) & gallery ---------- */
const CT={neuron:1,rbc:1,neutrophil:1,lymphocyte:1,platelet:1,skeletal:1,smooth:1,epithelial:1,adipocyte:1,osteocyte:1,sperm:1,egg:1,fibroblast:1,stem:1,plant:1,rod:1};
const CTN={neuron:{uz:'Neyron',en:'Neuron'},rbc:{uz:'Eritrotsit',en:'Red blood cell'},neutrophil:{uz:'Neytrofil',en:'Neutrophil'},lymphocyte:{uz:'Limfotsit',en:'Lymphocyte'},platelet:{uz:'Trombotsitlar',en:'Platelets'},skeletal:{uz:'Skelet mushak tolasi',en:'Skeletal muscle fibre'},
  smooth:{uz:'Silliq mushak hujayrasi',en:'Smooth muscle cell'},epithelial:{uz:'Epiteliy hujayrasi',en:'Epithelial cell'},adipocyte:{uz:'Yog‘ hujayrasi',en:'Fat cell'},osteocyte:{uz:'Osteotsit (suyak)',en:'Osteocyte (bone)'},sperm:{uz:'Spermatozoid',en:'Sperm cell'},egg:{uz:'Tuxum hujayra',en:'Egg cell'},
  fibroblast:{uz:'Fibroblast',en:'Fibroblast'},stem:{uz:'Ildiz (o‘zak) hujayra',en:'Stem cell'},plant:{uz:'O‘simlik hujayrasi',en:'Plant cell'},rod:{uz:'Tayoqcha (ko‘z)',en:'Rod cell (eye)'}};
const SIZE={rbc:'≈ 7–8 µm',neutrophil:'≈ 12–15 µm',lymphocyte:'≈ 7–10 µm',platelet:'≈ 2–3 µm',egg:'≈ 120 µm',sperm:'≈ 55 µm',neuron:'tana ≈ 10–100 µm'};
function drawCell(g,k,cx,cy,s,lt0){const c=el('g',{transform:`translate(${cx} ${cy}) scale(${s})`},g);const P=(c2)=>vol(c2,{hi:.45});
  if(k==='neuron'){[[-1,-.6],[-.9,.5],[-.3,-1],[.1,1],[-1,0]].forEach(([dx,dy])=>el('path',{d:`M0,0 Q${dx*50},${dy*40} ${dx*110},${dy*95}`,fill:'none',stroke:'#F4D03F','stroke-width':9,'stroke-linecap':'round'},c));
    el('path',{d:'M20,0 L150,0',stroke:'#F4D03F','stroke-width':8},c);for(let x=40;x<150;x+=36)el('rect',{x,y:-10,width:28,height:20,rx:10,fill:'#FFF3C4',stroke:'#E0B000','stroke-width':2},c);[[160,-20],[165,0],[160,20]].forEach(([x,y])=>el('path',{d:`M150,0 L${x},${y}`,stroke:'#F4D03F','stroke-width':5},c));
    el('path',{d:blob(0,0,40,34,{seed:3,amp:.15,n:6}),fill:P('#F4D03F'),stroke:'#C9A400','stroke-width':3},c);el('circle',{r:13,fill:'#7E57C2'},c)}
  if(k==='rbc'){el('ellipse',{rx:80,ry:80,fill:P('#E53935'),stroke:'#B71C1C','stroke-width':3},c);el('ellipse',{rx:36,ry:36,fill:'#C62828',opacity:.55},c)}
  if(k==='neutrophil'){el('circle',{r:85,fill:P('#F3E5F5'),stroke:'#BA68C8','stroke-width':3},c);[[-30,-20],[5,-34],[32,0],[5,30],[-28,22]].slice(0,4).forEach(([x,y])=>nuc(c,x,y,22,18,0,'#7B1FA2'));for(let i=0;i<30;i++)el('circle',{cx:Math.cos(i*2.4)*60*R(i,1),cy:Math.sin(i*2.4)*60*R(i,2),r:3,fill:'#CE93D8'},c)}
  if(k==='lymphocyte'){el('circle',{r:68,fill:P('#E3F2FD'),stroke:'#7986CB','stroke-width':3},c);nuc(c,4,0,58,56,0,'#4527A0')}
  if(k==='platelet'){[[-50,-20],[30,-40],[10,40],[60,20],[-30,40]].forEach(([x,y],i)=>{el('path',{d:blob(x,y,22,16,{seed:i,amp:.2,n:6}),fill:P('#BA68C8'),stroke:'#6A1B9A','stroke-width':2},c)})}
  if(k==='skeletal'){el('rect',{x:-160,y:-40,width:320,height:80,rx:36,fill:P('#E57373'),stroke:'#B71C1C','stroke-width':3},c);for(let x=-150;x<155;x+=10)el('line',{x1:x,y1:-36,x2:x,y2:36,stroke:'#B71C1C','stroke-width':3,opacity:.45},c);[-110,-20,70].forEach((x,i)=>nuc(c,x,i%2?30:-30,22,6))}
  if(k==='smooth'){el('path',{d:'M-160,0 Q0,-48 160,0 Q0,48 -160,0Z',fill:P('#EF9A9A'),stroke:'#C62828','stroke-width':3},c);nuc(c,0,0,40,9)}
  if(k==='epithelial'){el('rect',{x:-50,y:-90,width:100,height:180,rx:14,fill:P('#F48FB1'),stroke:'#AD1457','stroke-width':3},c);for(let x=-44;x<48;x+=8)el('line',{x1:x,y1:-90,x2:x,y2:-106,stroke:'#AD1457','stroke-width':3},c);nuc(c,0,40,22,32)}
  if(k==='adipocyte'){el('circle',{r:90,fill:P('#FFF59D'),stroke:'#F9A825','stroke-width':4},c);el('circle',{r:76,fill:'#FFF9C4'},c);nuc(c,70,30,10,24,30)}
  if(k==='osteocyte'){for(let i=0;i<12;i++){const a=i/12*TAU;el('path',{d:`M0,0 Q${Math.cos(a+.3)*60},${Math.sin(a+.3)*40} ${Math.cos(a)*130},${Math.sin(a)*90}`,stroke:'#8D6E63','stroke-width':4,fill:'none'},c)}el('ellipse',{rx:60,ry:34,fill:P('#BCAAA4'),stroke:'#5D4037','stroke-width':3},c);nuc(c,0,0,26,16)}
  if(k==='sperm'){el('ellipse',{cx:-120,cy:0,rx:34,ry:22,fill:P('#90CAF9'),stroke:'#1565C0','stroke-width':3},c);el('ellipse',{cx:-130,cy:0,rx:20,ry:14,fill:'#5C6BC0',opacity:.6},c);el('rect',{x:-88,y:-8,width:44,height:16,rx:8,fill:'#64B5F6'},c);
    const tl=el('path',{fill:'none',stroke:'#64B5F6','stroke-width':5,'stroke-linecap':'round'},c);c.__up=lt=>tl.setAttribute('d',wavy(-44,0,170,0,10+4*Math.sin(lt*6),2.5))}
  if(k==='egg'){el('circle',{r:100,fill:'none',stroke:'#F8BBD0','stroke-width':14,opacity:.8},c);el('circle',{r:90,fill:P('#FFE0B2'),stroke:'#FB8C00','stroke-width':3},c);for(let i=0;i<14;i++){const a=i/14*TAU;el('circle',{cx:Math.cos(a)*118,cy:Math.sin(a)*118,r:9,fill:'#FFCC80',opacity:.8},c)}el('circle',{cx:20,cy:-10,r:28,fill:'#8D6E63',opacity:.8},c)}
  if(k==='fibroblast'){el('path',{d:'M-150,10 Q-60,-40 0,-30 Q80,-60 150,-20 Q60,10 20,30 Q-60,50 -150,10Z',fill:P('#F8BBD0'),stroke:'#C2185B','stroke-width':3},c);nuc(c,0,0,36,12,-10)}
  if(k==='stem'){el('circle',{r:70,fill:P('#B2DFDB'),stroke:'#00897B','stroke-width':3},c);nuc(c,0,0,42,40,0,'#00695C')}
  if(k==='plant'){el('rect',{x:-110,y:-80,width:220,height:160,rx:10,fill:P('#AED581'),stroke:'#33691E','stroke-width':8},c);el('rect',{x:-80,y:-55,width:120,height:110,rx:30,fill:'#E1F5FE',opacity:.8},c);[[70,-40],[75,40],[-90,60],[50,60]].forEach(([x,y])=>el('ellipse',{cx:x,cy:y,rx:16,ry:9,fill:'#2E7D32'},c));nuc(c,70,0,18,18)}
  if(k==='rod'){el('rect',{x:-26,y:-170,width:52,height:150,rx:12,fill:P('#CE93D8'),stroke:'#6A1B9A','stroke-width':3},c);for(let y=-160;y<-30;y+=10)el('line',{x1:-22,y1:y,x2:22,y2:y,stroke:'#6A1B9A','stroke-width':2,opacity:.5},c);el('rect',{x:-18,y:-20,width:36,height:110,rx:16,fill:P('#F8BBD0')},c);nuc(c,0,40,14,20);el('circle',{cx:0,cy:120,r:14,fill:'#F48FB1'},c)}
  return c}
KIT.names(NAMES.uz,{spHead:'Bosh (akrosoma + yadro)',midpiece:'O‘rta qism (mitoxondriyalar)',flagellum:'Dum (xivchin)',biconcave:'Ikki tomoni botiq disk (yadrosiz)',lobedNuc:'Segmentli yadro (3–5 bo‘lak)',granules:'Donachalar',zona:'Yaltiroq qobiq',corona:'Nurli toj',lipid:'Yog‘ tomchisi',canal:'O‘simtalar (kanalchalar)',discs:'Tashqi segment (rodopsinli disklar)',synapseR:'Sinaps',cytoplasm:'Sitoplazma',bigNuc:'Katta yadro (yupqa sitoplazma)',plateletF:'Trombotsit (hujayra bo‘lagi)',microvilli:'Mikrovorsinkalar'});
KIT.names(NAMES.en,{spHead:'Head (acrosome + nucleus)',midpiece:'Midpiece (mitochondria)',flagellum:'Tail (flagellum)',biconcave:'Biconcave disc (no nucleus)',lobedNuc:'Lobed nucleus (3–5 lobes)',granules:'Granules',zona:'Zona pellucida',corona:'Corona radiata',lipid:'Lipid droplet',canal:'Processes (canaliculi)',discs:'Outer segment (rhodopsin discs)',synapseR:'Synapse',cytoplasm:'Cytoplasm',bigNuc:'Large nucleus (thin cytoplasm)',plateletF:'Platelet (cell fragment)',microvilli:'Microvilli'});
const CA={neuron:{dendrite:[-62,-36],soma:[-22,-28],nucleus:[6,4],myelin:[54,-10],node:[72,0],terminal:[162,-18]},sperm:{spHead:[-138,-18],midpiece:[-66,0],flagellum:[110,0]},rbc:{biconcave:[0,0]},neutrophil:{lobedNuc:[8,-36],granules:[-50,40]},lymphocyte:{bigNuc:[4,-20],cytoplasm:[-62,20]},
  egg:{zona:[0,-100],corona:[118,0],nucleus:[20,-10],cytoplasm:[-40,40]},skeletal:{nuclei:[-110,-30],striations:[40,0]},smooth:{nuclei:[0,0],cytoplasm:[110,0]},epithelial:{microvilli:[0,-100],nucleus:[0,40]},adipocyte:{lipid:[-20,-10],nucleus:[70,30]},osteocyte:{canal:[100,62],nucleus:[0,0]},
  fibroblast:{nucleus:[0,0]},stem:{nucleus:[0,0]},plant:{wall:[-110,-20],vacuole:[-20,0],chloroplast:[70,-40],nucleus:[70,0]},rod:{discs:[0,-100],nucleus:[0,40],synapseR:[0,120]},platelet:{plateletF:[30,-40]}};
SM.items.celltype=preset(800,700,(g,it)=>{const k=it.kind||'neuron';if(!CT[k])SERR.push(`celltype: kind "${k}" → ${Object.keys(CT).join(', ')}`);const c=drawCell(g,k,400,330,1.8);txt(g,T(CTN[k]||{uz:k}),400,640,{size:36,color:'ink'});if(SIZE[k])txt(g,SIZE[k],400,684,{size:26,color:'dim',weight:600});
  let yb=330;const A={};for(const n in (CA[k]||{}))A[n]=()=>[400+CA[k][n][0]*1.8,yb+CA[k][n][1]*1.8];return {anchors:A,update(lt){c.__up&&c.__up(lt);yb=330+Math.sin(lt*1.3)*6;c.setAttribute('transform',`translate(400 ${f2(yb)}) scale(1.8)`)}}});
SM.items.cellgallery=preset(1600,860,(g,it)=>{const L=(it.cells||['neuron','rbc','neutrophil','lymphocyte','skeletal','smooth','epithelial','adipocyte','osteocyte','sperm','egg','plant']).filter(k=>CT[k]||(SERR.push(`cellgallery: "${k}" unknown → ${Object.keys(CT).join(', ')}`),0));
  const cols=Math.min(L.length,L.length>8?4:3),rows=Math.ceil(L.length/cols),cw=1600/cols,ch=860/rows;const items=L.map((k,i)=>{const x=(i%cols+.5)*cw,y=Math.floor(i/cols)*ch+ch*.42;const cg=el('g',{},g);
    el('rect',{x:x-cw/2+12,y:y-ch*.42+8,width:cw-24,height:ch-16,rx:22,fill:TH.panel,stroke:TH.faint,'stroke-width':2},cg);const c=drawCell(cg,k,x,y,Math.min(cw,ch)/520);txt(cg,T(CTN[k]),x,y+ch*.47,{size:Math.min(30,ch*.11),color:'ink'});return {cg,c,i}});
  return {anchors:{},update(lt,p,st){items.forEach(({cg,c,i})=>{const q=E.outBack(prog(lt,st+i*.18,st+i*.18+.6));cg.setAttribute('opacity',f2(clamp(q)));c.__up&&c.__up(lt)})}}});
/* ---------- SKIN cross-section ---------- */
SM.items.skin=preset(1500,940,(g,it)=>{const A={},EP=150,DE=250,HY=600,B=920;const surf=x=>EP+Math.sin(x/90)*6,dej=x=>DE+Math.sin(x/70)*26;
  const pth=(f,a=0,b=1500)=>{let d='';for(let x=a;x<=b;x+=10)d+=(d?' L':'M')+x+','+f2(f(x));return d};const band=(f1,f2b)=>{let d=pth(f1);for(let x=1500;x>=0;x-=10)d+=' L'+x+','+f2(f2b(x));return d+' Z'};
  el('path',{d:pth(x=>HY+Math.sin(x/120)*14)+` L1500,${B} L0,${B} Z`,fill:'#FBE7A1'},g);// hypodermis
  const fcl='skf'+(++CID);el('rect',{x:0,y:0,width:1500,height:B},el('clipPath',{id:fcl},DEFS));const FG=el('g',{'clip-path':`url(#${fcl})`},g);for(let i=0;i<26;i++){const x=(i%9)*175+((i/9|0)%2)*85+30,y=HY+70+(i/9|0)*95;el('path',{d:blob(x,y,78,42,{seed:i,amp:.1,n:8}),fill:vol(NAT.fat,{hi:.5}),stroke:'#E0B84E','stroke-width':3},FG)}
  el('path',{d:band(dej,x=>HY+Math.sin(x/120)*14),fill:'#F3C2B4'},g);
  el('rect',{x:0,y:DE-20,width:1500,height:HY-DE+30,fill:'#F0BBAA',opacity:.6},g);for(let i=0;i<22;i++){const y=DE+40+R(i,1)*(HY-DE-60);el('path',{d:wavy(0,y,1500,y+R(i,2)*30,6,9),fill:'none',stroke:'#E8A08F','stroke-width':6,opacity:.7},g)}
  // epidermis layers
  el('path',{d:band(surf,dej),fill:NAT.skin1},g);el('path',{d:band(surf,x=>surf(x)+26),fill:'#E9C9A6'},g);
  for(let x=0;x<1500;x+=24)el('circle',{cx:x+12,cy:dej(x+12)-12,r:10,fill:'#C98F6A'},g);for(let x=40;x<1500;x+=160){el('path',{d:`M${x},${dej(x)-12} l-14,-22 M${x},${dej(x)-12} l16,-20 M${x},${dej(x)-12} l0,-26`,stroke:NAT.melanin,'stroke-width':4},g);el('circle',{cx:x,cy:dej(x)-12,r:12,fill:NAT.melanin},g)}
  for(let y=0;y<4;y++)el('path',{d:pth(x=>surf(x)+5+y*6),fill:'none',stroke:'#D9B48E','stroke-width':2},g);
  // capillary loops in papillae
  const caps=[];for(let x=105;x<1500;x+=440){el('path',{d:`M${x-18},${DE+160} L${x-18},${DE-6} Q${x},${DE-30} ${x+18},${DE-6} L${x+18},${DE+160}`,fill:'none',stroke:NAT.blood,'stroke-width':8},g);caps.push(x)}
  // Meissner corpuscle in a papilla
  const mx=320;el('ellipse',{cx:mx,cy:DE+10,rx:16,ry:28,fill:vol('#F48FB1'),stroke:'#AD1457','stroke-width':2},g);for(let y=-20;y<24;y+=8)el('line',{x1:mx-12,y1:DE+10+y,x2:mx+12,y2:DE+14+y,stroke:'#AD1457','stroke-width':1.5},g);el('path',{d:`M${mx},${DE+38} C${mx+20},${DE+140} ${mx-40},${DE+260} ${mx+20},${HY+60}`,fill:'none',stroke:NAT.nerve,'stroke-width':6},g);
  // hair follicle (oblique) + sebaceous + arrector
  const hx=760,top=surf(760);el('path',{d:`M${hx-40},${top+20} L${hx-120},${HY+20} Q${hx-80},${HY+90} ${hx-20},${HY+40} L${hx+40},${top+20} Z`,fill:'#E4B79A',stroke:'#B07A5A','stroke-width':4},g);
  el('path',{d:`M${hx-110},${HY+30} Q${hx-80},${HY-20} ${hx-40},${HY+30} Q${hx-70},${HY+70} ${hx-110},${HY+30}Z`,fill:'#E57373'},g);
  const shaft=el('path',{fill:'none',stroke:NAT.hair,'stroke-width':16,'stroke-linecap':'round'},g);
  el('path',{d:blob(hx+60,top+170,60,40,{seed:5,amp:.18,n:8}),fill:vol('#FFE082'),stroke:'#E0A800','stroke-width':3},g);el('path',{d:blob(hx+90,top+120,40,28,{seed:8,amp:.18,n:8}),fill:vol('#FFE082'),stroke:'#E0A800','stroke-width':3},g);
  const arr=el('path',{fill:'none',stroke:'#D84343','stroke-width':16,'stroke-linecap':'round'},g);
  // sweat gland: coil in deep dermis + duct to pore
  const sx=1180,coil=[];for(let a=0;a<TAU*3;a+=.25)coil.push([sx+Math.cos(a*1.5)*50+a*4,HY-20+Math.sin(a)*30]);el('path',{d:smoothOpen(coil),fill:'none',stroke:'#4FC3F7','stroke-width':14},g);
  const duct=[[sx+60,HY-30],[sx+30,DE+200],[sx+60,DE+80],[sx+20,DE],[sx+50,EP+60],[sx+30,surf(sx+30)]];el('path',{d:smoothOpen(duct),fill:'none',stroke:'#4FC3F7','stroke-width':9},g);const dpe=el('path',{d:smoothOpen(duct),fill:'none',stroke:'none'},g);const dL=dpe.getTotalLength();
  const drops=[...Array(6)].map(()=>el('circle',{r:6,fill:'#E1F5FE'},g));const bead=el('ellipse',{cx:sx+30,cy:surf(sx+30)-4,rx:0,ry:0,fill:'#B3E5FC',stroke:'#4FC3F7','stroke-width':2},g);
  // Pacinian corpuscle (onion layers) deep
  const px=500,py=HY+140;for(let j=6;j>0;j--)el('ellipse',{cx:px,cy:py,rx:20+j*9,ry:12+j*6,fill:j%2?'#F8BBD0':'#FCE4EC',stroke:'#C2185B','stroke-width':1.5},g);el('path',{d:`M${px+70},${py} C${px+150},${py+40} ${px+200},${py-60} ${px+260},${py+80}`,fill:'none',stroke:NAT.nerve,'stroke-width':6},g);
  // vessels in hypodermis
  el('ellipse',{cx:1000,cy:HY+170,rx:40,ry:30,fill:vol(NAT.blood),stroke:NAT.bloodD,'stroke-width':4},g);el('ellipse',{cx:1080,cy:HY+170,rx:44,ry:32,fill:vol(NAT.vein),stroke:'#1A237E','stroke-width':4},g);
  const flow=[...Array(10)].map(()=>el('circle',{r:5,fill:'#FFCDD2'},g));
  Object.assign(A,{epidermis:[80,EP+40],corneum:[60,EP+4],basal:[200,DE-12],melanocyte:[200,dej(200)-14],dermis:[90,DE+190],papilla:[105,DE-10],capillary:[545,DE+40],meissner:[mx,DE+10],hypodermis:[60,HY+120],fat:[260,HY+170],
    hairShaft:[hx+30,top-80],follicle:[hx-80,HY-60],sebaceous:[hx+70,top+170],arrector:[hx+170,DE+40],sweatGland:[sx+60,HY-20],pore:[sx+30,surf(sx+30)],pacinian:[px,py],artery:[1000,HY+170],vein:[1080,HY+170],nerve:[mx+10,DE+200],bulb:[hx-80,HY+50]});
  const goose=!!it.goosebumps;
  return {anchors:A,core:['epidermis','corneum','dermis','papilla','hypodermis','hairShaft','follicle','sebaceous','arrector','sweatGland','pore','meissner','pacinian','nerve','artery','vein'],update(lt){const c=goose?(Math.sin(lt*1.2)*.5+.5):0;const ang=lerp(0,14,c);const bx=hx+40-c*10,by=top-170;
    shaft.setAttribute('d',`M${hx-80},${HY+40} L${hx},${top+10} Q${hx+20+ang},${top-70} ${bx+30+ang*2},${by}`);arr.setAttribute('d',`M${hx-30},${HY-60} Q${hx+90},${DE+110} ${hx+200-c*30},${DE+10}`);arr.setAttribute('stroke-width',f2(16+c*8));
    drops.forEach((d,i)=>{const q=(lt*.18+i/6)%1;const p=dpe.getPointAtLength(q*dL);at(d,{cx:f2(p.x),cy:f2(p.y),opacity:f2(Math.sin(q*Math.PI))})});const bq=(Math.sin(lt*.9)*.5+.5);at(bead,{rx:f2(6+bq*12),ry:f2(4+bq*8)});
    flow.forEach((d,i)=>{const q=(lt*.4+i/10)%1;const x=caps[i%caps.length];const y=q<.45?lerp(DE+160,DE,q/.45):q<.55?DE-12:lerp(DE,DE+160,(q-.55)/.45);at(d,{cx:f2(x+(q<.5?-18:18)),cy:f2(y)})})}}});
/* ---------- HAIR follicle (longitudinal) + shaft cross-section inset ---------- */
SM.items.hair=preset(1400,900,(g,it)=>{const A={},cx=420,S=170;el('rect',{x:0,y:S,width:900,height:730,fill:'#F3C2B4'},g);el('rect',{x:0,y:S,width:900,height:60,fill:NAT.skin1},g);
  el('path',{d:`M${cx-70},${S} L${cx-70},760 Q${cx},860 ${cx+70},760 L${cx+70},${S}Z`,fill:'#E0A98C',stroke:'#A86A4E','stroke-width':4},g);// outer root sheath
  el('path',{d:`M${cx-44},${S+40} L${cx-44},740 Q${cx},800 ${cx+44},740 L${cx+44},${S+40}`,fill:'#F7DCC8',stroke:'#C99273','stroke-width':3},g);// inner sheath
  el('path',{d:`M${cx-80},860 Q${cx-80},700 ${cx},690 Q${cx+80},700 ${cx+80},860 Z`,fill:'#E9967A',stroke:'#A84C34','stroke-width':4},g);// bulb
  el('path',{d:`M${cx-38},860 Q${cx-36},760 ${cx},750 Q${cx+36},760 ${cx+38},860 Z`,fill:'#F7B9A8',stroke:'#C25B44','stroke-width':3},g);// dermal papilla
  el('path',{d:`M${cx-10},860 L${cx-10},775 Q${cx},765 ${cx+10},775 L${cx+10},860`,fill:'none',stroke:NAT.blood,'stroke-width':6},g);
  for(let i=0;i<10;i++){const a=Math.PI+i/9*Math.PI;el('circle',{cx:cx+Math.cos(a)*58,cy:740+Math.sin(a)*-40+40,r:7,fill:NAT.melanin},g)}
  const shaftG=el('g',{},g);const sh=el('path',{d:`M${cx-26},720 L${cx-26},40 Q${cx},20 ${cx+26},40 L${cx+26},720 Z`,fill:vol(NAT.hair,{hi:.3}),stroke:'#1B120C','stroke-width':2},shaftG);
  const scales=[];for(let y=0;y<760;y+=22)scales.push(el('path',{fill:'none',stroke:'#7A5A44','stroke-width':2},shaftG));
  el('path',{d:blob(cx+130,S+180,70,48,{seed:3,amp:.18,n:8}),fill:vol('#FFE082'),stroke:'#E0A800','stroke-width':3},g);el('path',{d:`M${cx+70},${S+170} L${cx+44},${S+160}`,stroke:'#E0A800','stroke-width':10},g);
  el('path',{d:`M${cx+60},${S+330} Q${cx+200},${S+200} ${cx+300},${S+56}`,fill:'none',stroke:'#D84343','stroke-width':18,'stroke-linecap':'round'},g);
  // inset cross section
  const ix=1140,iy=420;el('line',{x1:cx+30,y1:S-40,x2:ix-170,y2:iy-100,stroke:TH.dim,'stroke-width':2,'stroke-dasharray':'8 6'},g);el('circle',{cx:ix,cy:iy,r:200,fill:'#3E2A1E',stroke:'#9E7B62','stroke-width':12},g);
  for(let i=0;i<40;i++){const a=i/40*TAU;el('path',{d:`M${ix+Math.cos(a)*200},${iy+Math.sin(a)*200} A200,200 0 0 1 ${ix+Math.cos(a+.2)*200},${iy+Math.sin(a+.2)*200}`,stroke:'#C9A68A','stroke-width':6,fill:'none'},g)}
  el('circle',{cx:ix,cy:iy,r:184,fill:'#5D4033'},g);for(let i=0;i<90;i++){const a=R(i,1)*TAU,rr=60+R(i,2)*115;el('ellipse',{cx:ix+Math.cos(a)*rr,cy:iy+Math.sin(a)*rr,rx:6,ry:3,fill:'#2B1A10'},g)}el('circle',{cx:ix,cy:iy,r:50,fill:'#8D6E63',stroke:'#3E2723','stroke-width':3},g);
  for(let i=0;i<12;i++)el('circle',{cx:ix+Math.cos(i)*25*R(i,4),cy:iy+Math.sin(i)*25*R(i,5),r:6,fill:'#D7CCC8',opacity:.6},g);
  Object.assign(A,{hairShaft:[cx,90],follicle:[cx-70,500],innerSheath:[cx-44,420],outerSheath:[cx-70,350],bulb:[cx-80,760],dpapilla:[cx,800],matrixH:[cx-55,720],melanocyte:[cx+58,720],sebaceous:[cx+130,S+180],arrector:[cx+220,S+150],cuticle:[ix+190,iy-90],cortex:[ix+110,iy+60],medulla:[ix,iy],root:[cx,600]});
  return {anchors:A,update(lt){const gy=(lt*6)%22;scales.forEach((s,i)=>{const y=720-i*22-gy;s.setAttribute('d',y>40?`M${cx-26},${f2(y)} Q${cx},${f2(y-12)} ${cx+26},${f2(y)}`:'')})}}});
/* ---------- SARCOMERE: sliding filaments (A band constant, I band & H zone shorten) ---------- */
SM.items.sarcomere=preset(1500,700,(g,it)=>{const cy=300,TT=it.cycle||5,A={};const zL=el('path',{fill:'none',stroke:'#263238','stroke-width':10},g),zR=el('path',{fill:'none',stroke:'#263238','stroke-width':10},g);
  const thick=[-90,0,90].map(dy=>{const t=el('g',{},g);el('rect',{x:-260,y:dy-10,width:520,height:20,rx:10,fill:vol('#7E57C2'),stroke:'#4527A0','stroke-width':2},t);const heads=[];for(let x=-240;x<=240;x+=34){if(Math.abs(x)<50)continue;[-1,1].forEach(s=>heads.push([x,s,el('path',{fill:'none',stroke:'#9575CD','stroke-width':7,'stroke-linecap':'round'},t)]))}return {t,dy,heads}});
  el('line',{x1:750,y1:cy-150,x2:750,y2:cy+150,stroke:'#4527A0','stroke-width':5,'stroke-dasharray':'10 6'},g);
  const thin=[-135,-45,45,135].map(dy=>[-1,1].map(s=>{const t=el('g',{},g);for(let x=0;x<380;x+=16)el('circle',{cx:s*x,cy:dy+Math.sin(x/16)*4,r:8,fill:x%32?'#EF5350':'#E57373',stroke:'#B71C1C','stroke-width':1},t);return {t,s,dy}}));
  const br=el('g',{},g);const mk=(c)=>({l:el('path',{fill:'none',stroke:col(c),'stroke-width':4},br),t:txt(br,'',0,0,{size:26,color:c})});const bA=mk('a5'),bI=mk('a2'),bH=mk('a4');const bS=mk('ink');
  const bracket=(o,x1,x2,y,s)=>{o.l.setAttribute('d',`M${f2(x1)},${y-12*s} L${f2(x1)},${y} L${f2(x2)},${y} L${f2(x2)},${y-12*s}`);at(o.t,{x:f2((x1+x2)/2),y:y+(s>0?36:-14)})};
  const st=txt(g,'',750,680,{size:30,color:'dim'});
  const TX=!it.labels;Object.assign(A,{zdisc:{el:zL,fx:.5,fy:.1},mline:[750,cy-150],actin:{el:thin[0][0].t,fx:.7,fy:.5},myosin:{el:thick[2].t,fx:.75,fy:.5},aband:{el:bA.l,fx:.5,fy:1},iband:{el:bI.l,fx:.5,fy:1},hzone:{el:bH.l,fx:.5,fy:0},sarcomere:{el:bS.l,fx:.7,fy:0}});
  return {anchors:A,update(lt,p,st0){const u=cyc(lt,st0,TT,.5);const c=u<.5?E.inOutCubic(u/.5):1-E.inOutCubic((u-.5)/.5);const half=lerp(560,400,c);// Z position from centre
    const zig=x=>{let d=`M${x},${cy-170}`;for(let y=cy-170;y<cy+170;y+=20)d+=` L${x+(y/20%2?10:-10)},${y+20}`;return d};zL.setAttribute('d',zig(750-half));zR.setAttribute('d',zig(750+half));
    thin.forEach(pair=>pair.forEach(({t,s,dy})=>t.setAttribute('transform',`translate(${f2(750-s*half)} ${cy})`)));
    thick.forEach(({t,dy,heads})=>{t.setAttribute('transform',`translate(750 ${cy})`);heads.forEach(([x,s,h])=>{const sgn=x<0?-1:1;const ph=Math.sin(lt*TAU*2+x*.1);const tilt=c>0&&c<1?ph*14:0;h.setAttribute('d',`M${x},${dy+s*10} l${f2(sgn*(-10+tilt))},${s*24}`)})});
    const aw=520,thinL=380;bracket(bA,750-aw/2,750+aw/2,cy+210,1);bA.t.textContent=TX?nm('aband').split('(')[0].trim():'';
    bracket(bI,750-half,750-aw/2,cy+210,1);bI.t.textContent=TX?'I':'';const hz=Math.max(0,2*(half-thinL));bracket(bH,750-hz/2,750+hz/2,cy-200,-1);bH.t.textContent=TX&&hz>20?'H':'';
    bracket(bS,750-half,750+half,cy-250,-1);bS.t.textContent=TX?nm('sarcomere'):'';st.textContent=c>.02&&c<.98?(u<.5?T({uz:'Qisqarish: aktin markazga sirpanadi',en:'Contraction: actin slides to the centre',ru:'Сокращение'}):T({uz:'Bo‘shashish',en:'Relaxation',ru:'Расслабление'})):''}}});
/* ---------- MUSCLE ZOOM hierarchy: muscle → fascicle → fibre → myofibril → sarcomere ---------- */
SM.items.musclezoom=preset(1700,640,(g,it)=>{const A={};const P=[[170,320],[510,320],[850,320],[1190,320],[1530,320]];const panes=[];const lab=[nm('muscleW'),nm('fascicle'),nm('fiber'),nm('myofibril'),nm('sarcomere')];
  P.forEach(([x,y],i)=>{const pg=el('g',{},g);panes.push(pg);txt(pg,lab[i],x,636,{size:28,color:'ink'});
    if(i===0){el('path',{d:`M${x},${y-260} C${x+120},${y-140} ${x+120},${y+140} ${x},${y+260} C${x-120},${y+140} ${x-120},${y-140} ${x},${y-260}Z`,fill:vol(NAT.muscle),stroke:NAT.bloodD,'stroke-width':4},pg);
      el('path',{d:`M${x},${y-260} L${x},${y-290} M${x},${y+260} L${x},${y+290}`,stroke:'#ECEFF1','stroke-width':22,'stroke-linecap':'round'},pg);for(let k=-3;k<=3;k++)el('path',{d:`M${x+k*12},${y-230} Q${x+k*26},${y} ${x+k*12},${y+230}`,fill:'none',stroke:'#E57373','stroke-width':2,opacity:.7},pg);A.muscleW=[x+80,y-120];A.tendon=[x,y-285];A.epimysium=[x-90,y]}
    if(i===1){el('circle',{cx:x,cy:y,r:130,fill:'#F5E6E8',stroke:'#ECEFF1','stroke-width':8},pg);for(let q=0;q<19;q++){const a=q<1?0:q<7?(q-1)/6*TAU:(q-7)/12*TAU,r=q<1?0:q<7?48:96;el('circle',{cx:x+Math.cos(a)*r,cy:y+Math.sin(a)*r,r:24,fill:vol(NAT.muscleL),stroke:'#F8E1E4','stroke-width':3},pg)}A.fascicle=[x,y-130];A.perimysium=[x+125,y+40]}
    if(i===2){el('rect',{x:x-130,y:y-60,width:260,height:120,rx:56,fill:vol(NAT.muscleL),stroke:NAT.bloodD,'stroke-width':3},pg);for(let xx=x-120;xx<x+124;xx+=9)el('line',{x1:xx,y1:y-54,x2:xx,y2:y+54,stroke:NAT.bloodD,'stroke-width':2.5,opacity:.4},pg);[-80,10,90].forEach((d,q)=>nuc(pg,x+d,y+(q%2?44:-44),20,7));A.fiber=[x,y-60];A.nuclei=[x-80,y-44]}
    if(i===3){for(let r=0;r<3;r++){const yy=y-70+r*70;el('rect',{x:x-140,y:yy-26,width:280,height:52,rx:26,fill:'#F8BBD0',stroke:'#AD1457','stroke-width':2},pg);for(let s=0;s<4;s++){const sx=x-140+s*70;el('rect',{x:sx+18,y:yy-24,width:34,height:48,fill:'#AD1457',opacity:.6},pg);el('line',{x1:sx,y1:yy-26,x2:sx,y2:yy+26,stroke:'#263238','stroke-width':3},pg)}}A.myofibril=[x,y-100];A.zdisc=[x-70,y-96]}
    if(i===4){el('line',{x1:x-150,y1:y-90,x2:x-150,y2:y+90,stroke:'#263238','stroke-width':6},pg);el('line',{x1:x+150,y1:y-90,x2:x+150,y2:y+90,stroke:'#263238','stroke-width':6},pg);[-60,0,60].forEach(d=>el('rect',{x:x-90,y:y+d-8,width:180,height:16,rx:8,fill:vol('#7E57C2')},pg));
      [-85,-30,30,85].forEach(d=>{el('line',{x1:x-150,y1:y+d,x2:x-40,y2:y+d,stroke:'#EF5350','stroke-width':8},pg);el('line',{x1:x+150,y1:y+d,x2:x+40,y2:y+d,stroke:'#EF5350','stroke-width':8},pg)});A.sarcomere=[x,y-110];A.actin=[x-110,y-85];A.myosin=[x,y+60]}
    if(i<4){const [nx]=P[i+1];el('path',{d:`M${x+(i===0?40:120)},${y-40} L${nx-150},${y-150} M${x+(i===0?40:120)},${y+40} L${nx-150},${y+150}`,stroke:TH.dim,'stroke-width':2,'stroke-dasharray':'8 6',fill:'none'},pg)}});
  return {anchors:A,core:['tendon','epimysium','perimysium','nuclei','zdisc','actin','myosin'],update(lt,p,st){panes.forEach((pg,i)=>{const q=E.outCubic(prog(lt,st+i*.6,st+i*.6+.7));pg.setAttribute('opacity',f2(q));pg.setAttribute('transform',`translate(${f2((1-q)*-40)} 0)`)})}}});
KIT.bind();
})();
