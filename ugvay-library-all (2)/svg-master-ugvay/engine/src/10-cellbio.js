/* ================= CELL BIOLOGY ATLAS: membrane transport, signalling, synapse, organelle close-ups ================= */
Object.assign(NAMES.uz,{protein:'Tashuvchi oqsil',pump:'Na⁺/K⁺ nasos',atp:'ATF',vesicle:'Pufakcha (vezikula)',solute:'Erigan modda',water:'Suv molekulalari',gradient:'Konsentratsiya gradienti',
  ligand:'Signal molekulasi (gormon)',receptor:'Retseptor',relay:'G-oqsil (uzatuvchi)',effector:'Effektor ferment',messenger:'Ikkilamchi vositachi (sAMF)',cascade:'Kinazalar kaskadi',response:'Hujayra javobi (gen faollashuvi)',
  presynaptic:'Presinaptik uch',neurotransmitter:'Neyromediator',cleft:'Sinaptik yoriq',postsynaptic:'Postsinaptik membrana',ion:'Ionlar (Na⁺)',
  outerMembrane:'Tashqi membrana',innerMembrane:'Ichki membrana',cristae:'Kristalar',matrix:'Matriks',atpSynthase:'ATF-sintaza',mtDNA:'Halqasimon DNK',
  thylakoid:'Tilakoid',granum:'Grana',stroma:'Stroma',lamella:'Lamella',starch:'Kraxmal donachasi',
  nuclearEnvelope:'Yadro qobig‘i (2 membrana)',pore:'Yadro teshigi',chromatin:'Xromatin',mrna:'iRNK'});
Object.assign(NAMES.en,{protein:'Carrier protein',pump:'Na⁺/K⁺ pump',atp:'ATP',vesicle:'Vesicle',solute:'Solute',water:'Water molecules',gradient:'Concentration gradient',
  ligand:'Signal molecule (hormone)',receptor:'Receptor',relay:'G protein (relay)',effector:'Effector enzyme',messenger:'Second messenger (cAMP)',cascade:'Kinase cascade',response:'Cell response (gene activation)',
  presynaptic:'Presynaptic terminal',neurotransmitter:'Neurotransmitter',cleft:'Synaptic cleft',postsynaptic:'Postsynaptic membrane',ion:'Ions (Na⁺)',
  outerMembrane:'Outer membrane',innerMembrane:'Inner membrane',cristae:'Cristae',matrix:'Matrix',atpSynthase:'ATP synthase',mtDNA:'Circular DNA',
  thylakoid:'Thylakoid',granum:'Granum',stroma:'Stroma',lamella:'Lamella',starch:'Starch grain',
  nuclearEnvelope:'Nuclear envelope (2 membranes)',pore:'Nuclear pore',chromatin:'Chromatin',mrna:'mRNA'});
Object.assign(NAMES.ru,{protein:'Белок-переносчик',pump:'Na⁺/K⁺-насос',atp:'АТФ',vesicle:'Везикула',solute:'Растворённое вещество',water:'Молекулы воды',gradient:'Градиент концентрации',
  ligand:'Сигнальная молекула',receptor:'Рецептор',relay:'G-белок',effector:'Фермент-эффектор',messenger:'Вторичный посредник (цАМФ)',cascade:'Каскад киназ',response:'Ответ клетки',
  presynaptic:'Пресинаптическое окончание',neurotransmitter:'Нейромедиатор',cleft:'Синаптическая щель',postsynaptic:'Постсинаптическая мембрана',ion:'Ионы (Na⁺)',
  outerMembrane:'Наружная мембрана',innerMembrane:'Внутренняя мембрана',cristae:'Кристы',matrix:'Матрикс',atpSynthase:'АТФ-синтаза',mtDNA:'Кольцевая ДНК',
  thylakoid:'Тилакоид',granum:'Грана',stroma:'Строма',lamella:'Ламелла',starch:'Зерно крахмала',nuclearEnvelope:'Ядерная оболочка',pore:'Ядерная пора',chromatin:'Хроматин',mrna:'иРНК'});
// phospholipid bilayer (horizontal), gaps = [[x0,x1],…] left free for proteins
function bilayer(g,x0,x1,yc,{gaps=[],sp=44,hr=15,len=56,draw=true}={}){for(let x=x0;x<=x1;x+=sp){if(gaps.some(([a,b])=>x>a-hr&&x<b+hr))continue;
  [[-1],[1]].forEach(([d])=>{const hy=yc+d*(len+hr+4);el('circle',{cx:x,cy:hy,r:hr,fill:TH.a1,'fill-opacity':.85},g);
    [-5,5].forEach(o=>{const p=el('path',{d:wavy(x+o,hy-d*hr,x+o,yc+d*4,3,2),fill:'none',stroke:TH.a2,'stroke-width':3.5,'stroke-opacity':.85},g);if(draw)dr(p)})})}}
const lbl=(g,s,x,y,{size=30,color,anchor='middle',weight=700}={})=>{const t=el('text',{x,y,'text-anchor':anchor,'font-size':size,'font-family':FONT,'font-weight':weight,fill:col(color||'dim')},g);t.textContent=s;return t};
const dot=(g,r,c,glow=true)=>el('circle',{r,fill:col(c),filter:glow?'url(#glowS)':undefined},g);
const mv=(e,x,y,o)=>{e.setAttribute('cx',f2(x));e.setAttribute('cy',f2(y));if(o!=null)e.setAttribute('opacity',f2(o))};
/* ---------- TRANSPORT across membrane: kind simple|channel|carrier|pump|endocytosis|exocytosis|osmosis ---------- */
SM.items.transport=preset(1500,760,(g,it)=>{const k=it.kind||'simple',yc=380,A={outside:[1380,90],inside:[1380,690],membrane:[120,yc-75]};const T=it.cycle||(k==='pump'?6:k==='simple'||k==='channel'?7:5);
  const tag=t=>lbl(g,t,40,60,{anchor:'start',size:30,color:'dim'});
  if(k==='osmosis'){const L=el('rect',{x:80,width:660,fill:TH.a1,'fill-opacity':.22},g),R=el('rect',{x:760,width:660,fill:TH.a1,'fill-opacity':.22},g);
    dr(el('path',{d:'M80,60 L80,700 L1420,700 L1420,60',fill:'none',stroke:TH.ink,'stroke-width':5},g));dr(el('line',{x1:750,y1:120,x2:750,y2:700,stroke:TH.a5,'stroke-width':8,'stroke-dasharray':'18 12'},g));
    const S=[...Array(12)].map(()=>dot(g,22,'a2',false)),W=[...Array(46)].map(()=>dot(g,8,'a1',false));A.solute=[1000,560];A.water=[400,560];A.membrane=[750,200];
    return {anchors:A,update(lt,p,st){const q=E.inOutCubic(prog(lt,st+1,st+(it.dur2||9)));const lL=300+110*q,lR=300-110*q;at(L,{y:lL,height:700-lL});at(R,{y:lR,height:700-lR});
      S.forEach((s,i)=>mv(s,800+seeded(i,1)*560+Math.sin(lt+i)*14,Math.max(lR+40,420+seeded(i,2)*250)+Math.cos(lt*.8+i)*10));
      W.forEach((w,i)=>{const cross=i%3===0;const u=((lt-st)/T+seeded(i,3))%1;let x,y;if(cross){x=lerp(120+seeded(i,4)*560,800+seeded(i,5)*560,E.inOutCubic(u));y=lerp(Math.max(lL+30,500),Math.max(lR+30,480),u)+Math.sin(u*TAU*2)*20+seeded(i,6)*120}
        else{const left=i%2===0;x=(left?120:800)+seeded(i,4)*560+Math.sin(lt*1.3+i)*10;y=(left?lL:lR)+40+seeded(i,6)*Math.max(60,(700-(left?lL:lR))-70)}mv(w,x,y,prog(lt,st+.3,st+.9))})}}}
  if(k==='endocytosis'||k==='exocytosis'){const band=[el('path',{fill:'none',stroke:TH.a1,'stroke-width':76,'stroke-opacity':.9,'stroke-linejoin':'round'},g),el('path',{fill:'none',stroke:TH.bg2,'stroke-width':48,'stroke-linejoin':'round'},g),el('path',{fill:'none',stroke:TH.a2,'stroke-width':40,'stroke-dasharray':'3 9','stroke-opacity':.8,'stroke-linejoin':'round'},g)];
    const ves=[el('circle',{r:100,fill:'none',stroke:TH.a1,'stroke-width':30},g),el('circle',{r:100,fill:'none',stroke:TH.a2,'stroke-width':16,'stroke-dasharray':'3 9'},g)];
    const cargo=[...Array(k==='endocytosis'?1:9)].map((_,i)=>dot(g,k==='endocytosis'?52:13,k==='endocytosis'?'a3':'a4'));A.vesicle=[750,600];A.molecule=[750,150];
    const cx=750;return {anchors:A,update(lt,p,st){const u=((lt-st-.6)/T%1+1)%1;const v=k==='endocytosis'?u:1-u;// v: 0 outside →1 inside
      const depth=v<.5?E.inOutCubic(v/.5)*230:v<.62?230*(1-E.inOutCubic((v-.5)/.12)):0;const w=100+depth*.25;
      let d='M0,'+yc;for(let x=0;x<=1500;x+=20){const g2=Math.exp(-(((x-cx)/w)**2));d+=` L${x},${f2(yc+depth*g2)}`}band.forEach(b=>b.setAttribute('d',d));
      const vy=v<.5?yc+depth-90:v<.62?yc+230-80:lerp(yc+150,640,E.outCubic((v-.62)/.38));const vo=v<.5?0:clamp((v-.5)/.06);ves.forEach(c=>{mv(c,cx,vy);c.setAttribute('opacity',f2(vo))});
      cargo.forEach((c,i)=>{if(k==='endocytosis'){const y=v<.3?lerp(70,yc-40,E.inOutCubic(v/.3)):v<.5?yc+depth-90:vy;mv(c,cx,y,1)}else{const a=i/9*TAU;let x=cx+Math.cos(a)*45,y=vy+Math.sin(a)*45;
        if(u>.38){const q=E.outCubic(clamp((u-.38)/.6));x=cx+Math.cos(a)*(45+q*360);y=lerp(yc-40,90,q)+Math.sin(a)*60*q}mv(c,x,y,u>.38?1-clamp((u-.9)/.1):1)}})}}}
  // membrane-based kinds
  const px=750,gap=k==='simple'?[]:[[px-110,px+110]];bilayer(g,60,1440,yc,{gaps:gap});
  const hi=lbl(g,nm('gradient')+' ↓',1440,200,{anchor:'end',size:28,color:'a2'});
  if(k==='simple'||k==='channel'){if(k==='channel'){[-1,1].forEach(s=>dr(el('rect',{x:px+s*55-30,y:yc-120,width:60,height:240,rx:30,fill:TH.a5,'fill-opacity':.55,stroke:TH.a5,'stroke-width':4},g)));A.protein=[px+30,yc-110]}
    const M=[...Array(34)].map((_,i)=>dot(g,k==='channel'?13:11,k==='channel'?'a4':'a3'));A.molecule=[300,140];
    return {anchors:A,update(lt,p,st){M.forEach((m,i)=>{const cross=i%2===0,u=((lt-st)/T+seeded(i,1))%1;const hx=100+seeded(i,2)*1300,hy=60+seeded(i,3)*190;let x,y;
      if(cross){const ex=k==='channel'?px:hx+(seeded(i,4)-.5)*200,bx=100+seeded(i,5)*1300,by=500+seeded(i,6)*220;if(u<.4){const q=E.inOutCubic(u/.4);x=lerp(hx,ex,q);y=lerp(hy,yc-110,q)}else if(u<.6){x=ex+Math.sin(u*40)*4;y=lerp(yc-110,yc+110,(u-.4)/.2)}else{const q=E.outCubic((u-.6)/.4);x=lerp(ex,bx,q);y=lerp(yc+110,by,q)}}
      else{x=hx+Math.sin(lt*.8+i)*25;y=hy+Math.cos(lt*.6+i)*16}mv(m,x,y,prog(lt,st+.4,st+1)*(cross&&u>.92?1-(u-.92)/.08:1))})}}}
  // carrier & pump: two lobes that rock open-out ↔ open-in
  const lobes=[-1,1].map(s=>{const e=dr(el('rect',{x:-36,y:-130,width:72,height:260,rx:34,fill:k==='pump'?TH.a5:TH.a4,'fill-opacity':.55,stroke:k==='pump'?TH.a5:TH.a4,'stroke-width':4},g));return {e,s}});
  const setL=f=>lobes.forEach(({e,s})=>e.setAttribute('transform',`translate(${px+s*50} ${yc}) rotate(${f2(s*lerp(14,-14,f))})`));A.protein=[px+50,yc-120];
  if(k==='carrier'){const gl=el('polygon',{points:[0,1,2,3,4,5].map(i=>`${f2(Math.cos(i/6*TAU)*24)},${f2(Math.sin(i/6*TAU)*24)}`).join(' '),fill:TH.a2,filter:'url(#glowS)'},g);A.molecule=[px,120];
    return {anchors:A,update(lt,p,st){const u=((lt-st-.5)/T%1+1)%1;const f=u<.3?0:u<.5?E.inOutCubic((u-.3)/.2):u<.7?1:1-E.inOutCubic((u-.7)/.3);setL(f);
      const y=u<.3?lerp(90,yc-40,E.inOutCubic(u/.3)):u<.5?lerp(yc-40,yc+40,(u-.3)/.2):u<.72?lerp(yc+40,680,E.outCubic((u-.5)/.22)):680;gl.setAttribute('transform',`translate(${px} ${f2(y)})`);gl.setAttribute('opacity',f2(u<.72?1:1-(u-.72)/.08<0?0:1-(u-.72)/.08))}}}
  // pump: 3 Na+ out, 2 K+ in, ATP
  const na=[0,1,2].map(()=>dot(g,16,'a2')),kk=[0,1].map(()=>dot(g,18,'a5')),atp=dot(g,20,'#FFE066');const tA=lbl(g,'ATF → ADF + F',px+150,yc+40,{anchor:'start',size:28,color:'#FFE066'});
  lbl(g,'3 Na⁺',150,140,{anchor:'start',size:34,color:'a2'});lbl(g,'2 K⁺',150,650,{anchor:'start',size:34,color:'a5'});A.atp=[px+30,yc+120];A.pump=A.protein;
  return {anchors:A,update(lt,p,st){const u=((lt-st-.5)/T%1+1)%1;// 0-.2 Na bind from inside, .2-.3 ATP, .3-.45 flip out, .45-.6 Na leave/K bind, .6-.75 flip in, .75-.9 K leave
    const f=u<.3?0:u<.45?E.inOutCubic((u-.3)/.15):u<.6?1:u<.75?1-E.inOutCubic((u-.6)/.15):0;setL(1-f);
    na.forEach((n,i)=>{const sx=420+i*80,ox=px-30+i*30;let x,y;if(u<.2){const q=E.inOutCubic(u/.2);x=lerp(sx,ox,q);y=lerp(640,yc+30,q)}else if(u<.45){x=ox;y=lerp(yc+30,yc-30,clamp((u-.3)/.15))}else{const q=E.outCubic(clamp((u-.45)/.2));x=lerp(ox,ox+(i-1)*260,q);y=lerp(yc-30,110+i*20,q)}mv(n,x,y,u>.9?1-(u-.9)/.1:1)});
    kk.forEach((n,i)=>{const sx=1000+i*90,ox=px-15+i*30;let x,y;if(u<.45){x=sx+Math.sin(lt+i)*10;y=120+i*30}else if(u<.6){const q=E.inOutCubic((u-.45)/.15);x=lerp(sx,ox,q);y=lerp(120+i*30,yc-30,q)}else if(u<.75){x=ox;y=lerp(yc-30,yc+30,(u-.6)/.15)}else{const q=E.outCubic(clamp((u-.75)/.2));x=lerp(ox,ox+(i?200:-200),q);y=lerp(yc+30,640,q)}mv(n,x,y,1)});
    const ua=clamp((u-.18)/.12);mv(atp,lerp(px+260,px+40,E.inOutCubic(ua)),yc+120,u<.18?0:u<.4?1:1-clamp((u-.4)/.1));tA.setAttribute('opacity',f2(u>.22&&u<.5?1:0))}}});
/* ---------- SIGNAL transduction: ligand → receptor → G protein → effector → cAMP → kinase cascade → nucleus ---------- */
SM.items.signal=preset(1500,880,(g,it)=>{const yc=230,A={};bilayer(g,40,1460,yc,{gaps:[[420,520],[780,900]]});
  const rec=[-1,1].map(s=>dr(el('rect',{x:470+s*26-22,y:yc-160,width:44,height:280,rx:22,fill:TH.a5,'fill-opacity':.6,stroke:TH.a5,'stroke-width':4},g)));
  const eff=dr(el('path',{d:blob(840,yc,60,120,{seed:3}),fill:TH.a4,'fill-opacity':.45,stroke:TH.a4,'stroke-width':4},g));
  const lig=el('polygon',{points:'0,-26 24,0 0,26 -24,0',fill:TH.a2,filter:'url(#glowS)'},g);const gp=el('ellipse',{rx:46,ry:30,fill:TH.a3,'fill-opacity':.75,stroke:TH.a3,'stroke-width':3},g);
  const msg=[...Array(16)].map(()=>dot(g,9,'a1'));const nx=1220,ny=700;dr(el('circle',{cx:nx,cy:ny,r:150,fill:TH.a5,'fill-opacity':.12,stroke:TH.a5,'stroke-width':5},g));
  const dna=dr(el('path',{d:wavy(nx-90,ny,nx+90,ny,16,4),fill:'none',stroke:TH.a5,'stroke-width':5},g));const K=[[700,520],[900,620],[1060,700]].map(([x,y],i)=>{const c=el('g',{},g);el('circle',{cx:x,cy:y,r:42,fill:TH.panel,stroke:TH.a2,'stroke-width':4},c);lbl(c,'K'+(i+1),x,y+11,{size:30,color:'a2'});return {c,x,y}});
  const ar=[[[840,350],[700,470]],[[742,540],[858,600]],[[942,640],[1018,680]],[[1102,700],[1068+2,700]]].slice(0,3).map(([a,b])=>dr(el('path',{d:`M${a[0]},${a[1]} L${b[0]},${b[1]}`,stroke:TH.ink,'stroke-width':4,'marker-end':arrowMarker('ink'),fill:'none',opacity:.25},g)));
  const mr=el('path',{d:'',fill:'none',stroke:TH.a4,'stroke-width':7,'stroke-linecap':'round',filter:'url(#glowS)'},g);
  const step=lbl(g,'',1460,60,{anchor:'end',size:32,color:'a2'});
  Object.assign(A,{ligand:{el:lig},receptor:{el:rec[1],fx:.5,fy:0},relay:{el:gp,fx:.5,fy:1},effector:{el:eff,fx:.6,fy:0},messenger:{el:msg[5]},cascade:{el:K[1].c,fx:.5,fy:1},nucleus:[nx-110,ny-105],response:{el:mr,fx:1,fy:0}});
  const T=it.cycle||10;const names=[nm('ligand'),nm('relay'),nm('messenger'),nm('cascade'),nm('response')];
  return {anchors:A,labelLayout:'side',update(lt,p,st){const u=((lt-st-.4)/T%1+1)%1,s=u*T;// seconds in cycle
    const lq=E.inOutCubic(clamp(s/1.6));lig.setAttribute('transform',`translate(${f2(lerp(220,470,lq))} ${f2(lerp(60,yc-150,lq))}) rotate(${f2(s*60)})`);
    const on=clamp((s-1.6)/.4);rec.forEach(r=>r.setAttribute('fill-opacity',f2(.6+.35*on)));
    const gq=E.inOutCubic(clamp((s-2)/1.4));gp.setAttribute('transform',`translate(${f2(lerp(560,780,gq))} ${yc+95})`);gp.setAttribute('opacity',f2(clamp((s-1.8)/.3)*(1-clamp((s-8.8)/.5))));
    eff.setAttribute('fill-opacity',f2(.45+.4*clamp((s-3.3)/.4)));
    msg.forEach((m,i)=>{const q=E.outCubic(clamp((s-3.6-i*.05)/1.6));const a=seeded(i,1)*Math.PI*.9+Math.PI*.05;mv(m,840+Math.cos(a)*q*260*(.6+seeded(i,2)*.5),yc+120+Math.sin(a)*q*220,q>0?1-clamp((s-8.5)/.6):0)});
    K.forEach((k2,i)=>{const t0=5+i*.8;const q=clamp((s-t0)/.4);k2.c.setAttribute('opacity',f2(.35+.65*q));k2.c.setAttribute('filter',q>.5&&s<t0+1.5?'url(#glowS)':'')});ar.forEach((a,i)=>a.setAttribute('opacity',f2(.25+.75*clamp((s-4.7-i*.8)/.3))));
    dna.setAttribute('stroke',s>7.4?TH.a4:TH.a5);const mq=clamp((s-7.6)/1.2);mr.setAttribute('d',mq>0?wavy(nx+20,ny-20,nx+20+mq*280,ny-20-mq*160,8,3):'');mr.setAttribute('opacity',f2(1-clamp((s-9.3)/.5)));
    const si=s<2?0:s<3.6?1:s<5?2:s<7.4?3:4;step.textContent=(si+1)+'. '+names[si];step.setAttribute('opacity',f2(prog(lt,st+.5,st+1)))}}});
/* ---------- SYNAPSE: impulse → vesicles fuse → neurotransmitter → receptors → ion flow ---------- */
SM.items.synapse=preset(1200,900,(g,it)=>{const A={};const top=dr(el('path',{d:'M380,0 L380,180 C380,300 260,330 260,400 C260,450 330,470 600,470 C870,470 940,450 940,400 C940,330 820,300 820,180 L820,0',fill:TH.a1,'fill-opacity':.14,stroke:TH.a1,'stroke-width':6},g));
  const post=dr(el('path',{d:'M120,900 L120,600 C120,560 200,545 600,545 C1000,545 1080,560 1080,600 L1080,900',fill:TH.a4,'fill-opacity':.1,stroke:TH.a4,'stroke-width':6},g));
  const R=[380,500,600,700,820].map(x=>el('rect',{x:x-22,y:540,width:44,height:46,rx:10,fill:TH.a5,'fill-opacity':.6,stroke:TH.a5,'stroke-width':3},g));
  const V=[[420,330],[540,380],[660,350],[780,330],[480,240],[720,240]].map(([x,y],i)=>{const c=el('g',{},g);el('circle',{r:40,fill:TH.panel,stroke:TH.a2,'stroke-width':4},c);for(let k=0;k<6;k++)el('circle',{cx:Math.cos(k)*18,cy:Math.sin(k*1.7)*18,r:6,fill:TH.a2},c);return {c,x,y}});
  const NT=[...Array(30)].map(()=>dot(g,7,'a2'));const ION=[...Array(14)].map(()=>dot(g,8,'a3'));const imp=el('circle',{r:24,fill:'#fff',filter:'url(#glow2)'},g);
  Object.assign(A,{presynaptic:[380,120],vesicle:[420,330],neurotransmitter:[600,505],cleft:[1000,508],receptor:[820,560],postsynaptic:[1080,640],ion:[600,760]});
  const T=it.cycle||5;return {anchors:A,update(lt,p,st){const u=((lt-st-.5)/T%1+1)%1;
    mv(imp,600,lerp(-20,300,E.inCubic(clamp(u/.25))),u<.28?Math.sin(Math.PI*clamp(u/.28)):0);
    V.forEach((v,i)=>{const near=i<4;const q=near?E.inOutCubic(clamp((u-.25-i*.02)/.15)):0;const y=lerp(v.y,452,q);const fus=near?clamp((u-.4)/.08):0;v.c.setAttribute('transform',`translate(${v.x} ${f2(y)}) scale(${f2(1-fus*.7)})`);v.c.setAttribute('opacity',f2(1-fus+(u>.95?0:0)+(near&&u>.9?clamp((u-.9)/.1):0)))});
    NT.forEach((n,i)=>{const sx=420+(i%4)*120,tx=380+(i%5)*110+(seeded(i,1)-.5)*30;const q=clamp((u-.45-seeded(i,2)*.08)/.2);const back=clamp((u-.82)/.15);
      mv(n,lerp(sx,tx,q)+(seeded(i,3)-.5)*40*Math.sin(q*3),lerp(470,535,E.inOutCubic(q))-back*70,q>0?1-back:0)});
    R.forEach((r,i)=>{const on=clamp((u-.6)/.05)*(1-clamp((u-.85)/.1));r.setAttribute('fill-opacity',f2(.6+.4*on));r.setAttribute('filter',on>.5?'url(#glowS)':'')});
    ION.forEach((n,i)=>{const x=[380,500,600,700,820][i%5];const q=clamp((u-.65-seeded(i,1)*.1)/.25);mv(n,x+(seeded(i,2)-.5)*20,lerp(520,840,E.inCubic(q)),q>0&&q<1?1:0)})}}});
/* ---------- ORGANELLE close-ups ---------- */
SM.items.mitochondrion=preset(1400,800,(g,it)=>{const A={};dr(el('path',{d:blob(700,400,640,330,{seed:2,amp:.02}),fill:TH.a2,'fill-opacity':.12,stroke:TH.a2,'stroke-width':10},g));
  const inner=dr(el('path',{d:blob(700,400,600,290,{seed:2,amp:.02}),fill:TH.a3,'fill-opacity':.14,stroke:TH.a3,'stroke-width':6},g));const n=9,syn=[];
  for(let i=0;i<n;i++){const x=230+i*118,top=i%2===0,ye=400+(top?-1:1)*290*Math.sqrt(Math.max(0,1-((x-700)/600)**2))*.97,dep=top?470:330;
    dr(el('path',{d:`M${x-24},${f2(ye)} L${x-24},${dep} A24,24 0 0 ${top?0:1} ${x+24},${dep} L${x+24},${f2(ye)}`,fill:TH.a3,'fill-opacity':.28,stroke:TH.a3,'stroke-width':7,'stroke-linejoin':'round'},g));
    for(let k=0;k<3;k++){const y=lerp(ye,dep,(k+.6)/3.4);syn.push(el('circle',{cx:x+(k%2?-36:36),cy:f2(y),r:9,fill:TH.a4},g))}}
  dr(el('path',{d:blob(1120,250,46,36,{seed:5,amp:.15}),fill:'none',stroke:TH.a5,'stroke-width':4},g));for(let k=0;k<14;k++)el('circle',{cx:260+seeded(k,1)*880,cy:200+seeded(k,2)*400,r:6,fill:TH.dim},g);
  const atp=[...Array(14)].map(()=>dot(g,10,'#FFE066'));Object.assign(A,{outerMembrane:[700,72],innerMembrane:[300,180],cristae:[348,420],matrix:[650,620],atpSynthase:[214,330],mtDNA:[1120,250],ribosome:[260+seeded(3,1)*880,200+seeded(3,2)*400]});
  return {anchors:A,update(lt,p,st){atp.forEach((a,i)=>{const u=((lt-st)/3+seeded(i,1))%1;const s=syn[(i*5)%syn.length];const x=+s.getAttribute('cx'),y=+s.getAttribute('cy');mv(a,x+(seeded(i,2)-.5)*120*u,y+(y<400?1:-1)*u*90,prog(lt,st+1,st+1.5)*Math.sin(Math.PI*u))})}}});
SM.items.chloroplast=preset(1400,800,(g,it)=>{const A={};dr(el('path',{d:blob(700,400,640,320,{seed:4,amp:.02}),fill:TH.a4,'fill-opacity':.12,stroke:TH.a4,'stroke-width':10},g));dr(el('path',{d:blob(700,400,612,292,{seed:4,amp:.02}),fill:'none',stroke:TH.a4,'stroke-width':5},g));
  const G=[[300,330],[520,470],[740,330],[960,470],[1140,330]];G.forEach(([x,y],i)=>{for(let k=0;k<6;k++)dr(el('rect',{x:x-70,y:y-90+k*30,width:140,height:24,rx:12,fill:TH.a4,'fill-opacity':.55,stroke:'#2E8B57','stroke-width':3},g));if(i<G.length-1){const [x2,y2]=G[i+1];dr(el('path',{d:`M${x+70},${y} C${x+130},${y} ${x2-130},${y2} ${x2-70},${y2}`,fill:'none',stroke:TH.a4,'stroke-width':8,'stroke-opacity':.6},g))}});
  el('ellipse',{cx:640,cy:640,rx:60,ry:34,fill:'#F3E9C8','fill-opacity':.8},g);const O=[...Array(12)].map(()=>el('circle',{r:12,fill:'none',stroke:TH.a1,'stroke-width':3},g));
  const rays=[0,1,2,3].map(i=>dr(el('path',{d:`M${150+i*80},-10 L${300+i*120},300`,stroke:'#FFE066','stroke-width':6,'stroke-dasharray':'20 14',opacity:.8},g)));
  Object.assign(A,{thylakoid:[300,240],granum:[740,250],stroma:[1100,640],lamella:[630,400],starch:[640,640],outerMembrane:[700,80],innerMembrane:[1300,400]});
  return {anchors:A,update(lt,p,st){rays.forEach((r,i)=>r.setAttribute('stroke-dashoffset',f2(-lt*60)));O.forEach((o,i)=>{const u=((lt-st)/4+seeded(i,1))%1;const [x,y]=G[i%5];mv(o,x+(seeded(i,2)-.5)*120+Math.sin(u*9)*10,y-100-u*300,prog(lt,st+1,st+1.5)*(1-u))})}}});
SM.items.nucleus=preset(1200,1000,(g,it)=>{const A={};const c=[600,500];dr(el('circle',{cx:600,cy:500,r:420,fill:TH.a5,'fill-opacity':.1,stroke:TH.a5,'stroke-width':10},g));dr(el('circle',{cx:600,cy:500,r:392,fill:'none',stroke:TH.a5,'stroke-width':6},g));
  const pores=[];for(let k=0;k<10;k++){const a=k/10*TAU+.2;pores.push([600+Math.cos(a)*406,500+Math.sin(a)*406]);el('circle',{cx:600+Math.cos(a)*406,cy:500+Math.sin(a)*406,r:17,fill:TH.bg,stroke:TH.a2,'stroke-width':5},g)}
  for(let k=0;k<7;k++)dr(el('path',{d:wavy(320+seeded(k,1)*300,300+seeded(k,2)*400,560+seeded(k,3)*300,320+seeded(k,4)*380,14,5),fill:'none',stroke:TH.a1,'stroke-width':5,'stroke-opacity':.75},g));
  el('circle',{cx:680,cy:560,r:95,fill:TH.a3,'fill-opacity':.45,filter:'url(#glowS)'},g);const M=[...Array(5)].map(()=>el('path',{fill:'none',stroke:TH.a4,'stroke-width':6,'stroke-linecap':'round'},g));
  Object.assign(A,{nuclearEnvelope:[600,80],pore:pores[2],chromatin:[420,380],nucleolus:[680,560],mrna:pores[0]});
  return {anchors:A,update(lt,p,st){M.forEach((m,i)=>{const u=((lt-st)/3.5+i/5)%1;const P=pores[(i*2)%10],a=Math.atan2(P[1]-500,P[0]-600);const r0=300+u*260;const x=600+Math.cos(a)*r0,y=500+Math.sin(a)*r0;
    m.setAttribute('d',wavy(x-Math.cos(a)*30,y-Math.sin(a)*30,x+Math.cos(a)*30,y+Math.sin(a)*30,6,2));m.setAttribute('opacity',f2(prog(lt,st+1,st+1.5)*Math.sin(Math.PI*u)))})}}});
