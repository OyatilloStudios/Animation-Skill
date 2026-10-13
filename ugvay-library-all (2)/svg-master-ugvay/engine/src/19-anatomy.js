/* ================= SHELF: ANATOMY & PHYSIOLOGY — walker (gait + muscle activity) · skeleton · armlever (biceps/triceps lever) =================
   Joint-angle curves and muscle timing follow standard gait-analysis data (stance ≈60 %, swing ≈40 %). */
(()=>{
const {mix,dark,light,vol,txt,cyc,T}=KIT;
KIT.names(NAMES.uz,{quadriceps:'To‘rt boshli mushak',hamstrings:'Son orqa mushaklari',gluteus:'Katta dumba mushagi',calf:'Boldir mushagi',tibialis:'Katta boldir old mushagi',stance:'Tayanch fazasi',swing:'Ko‘chirish fazasi',
  skull:'Bosh suyagi',mandible:'Pastki jag‘',clavicle:'O‘mrov suyagi',sternum:'To‘sh suyagi',ribs:'Qovurg‘alar',spine:'Umurtqa pog‘onasi',humerus:'Yelka suyagi',radius:'Bilak suyagi (tashqi)',ulna:'Tirsak suyagi',hand:'Kaft va barmoqlar',
  pelvis:'Chanoq suyagi',femur:'Son suyagi',patella:'Tizza qopqog‘i',tibia:'Katta boldir suyagi',fibula:'Kichik boldir suyagi',foot:'Oyoq panjasi',scapula:'Kurak suyagi',
  biceps:'Ikki boshli mushak (bukuvchi)',triceps:'Uch boshli mushak (yozuvchi)',elbow:'Tirsak bo‘g‘imi (tayanch nuqta)',effort:'Kuch qo‘yilgan nuqta',load:'Yuk',tendonA:'Pay'});
KIT.names(NAMES.en,{quadriceps:'Quadriceps',hamstrings:'Hamstrings',gluteus:'Gluteus maximus',calf:'Calf (gastrocnemius)',tibialis:'Tibialis anterior',stance:'Stance phase',swing:'Swing phase',
  skull:'Skull',mandible:'Mandible',clavicle:'Clavicle',sternum:'Sternum',ribs:'Ribs',spine:'Spine',humerus:'Humerus',radius:'Radius',ulna:'Ulna',hand:'Hand',pelvis:'Pelvis',femur:'Femur',patella:'Patella',tibia:'Tibia',fibula:'Fibula',foot:'Foot',scapula:'Scapula',
  biceps:'Biceps (flexor)',triceps:'Triceps (extensor)',elbow:'Elbow joint (fulcrum)',effort:'Effort',load:'Load',tendonA:'Tendon'});
KIT.names(NAMES.ru,{skull:'Череп',ribs:'Рёбра',spine:'Позвоночник',femur:'Бедренная кость',tibia:'Большеберцовая кость',humerus:'Плечевая кость',pelvis:'Таз',biceps:'Бицепс',triceps:'Трицепс',quadriceps:'Четырёхглавая мышца',calf:'Икроножная мышца'});
const bump=(x,c,w)=>{let d=x-c;d-=Math.round(d);return Math.exp(-((d/w)**2))};const D=Math.PI/180;const V=(b,L)=>[Math.sin(b)*L,Math.cos(b)*L];
// gait curves (degrees) — φ in [0,1), 0 = heel strike
const hipA=f=>11+21*Math.cos(TAU*(f-.9)),kneeA=f=>3+15*bump(f,.14,.08)+57*bump(f,.72,.12),ankleA=f=>-6*bump(f,.05,.035)+10*bump(f,.42,.12)-19*bump(f,.63,.06)+2*bump(f,.85,.1);
const ACT={gluteus:f=>bump(f,.03,.13),quadriceps:f=>bump(f,.06,.09),hamstrings:f=>bump(f,.95,.09),calf:f=>bump(f,.42,.11),tibialis:f=>Math.max(bump(f,.03,.05),bump(f,.8,.15)*.8)};
SM.items.walker=preset(1300,960,(g,it)=>{const TT=it.cycle||1.2,GY=830,L1=170,L2=168,AH=30,FL=104,A={},sk=it.skin||NAT.skin2,shirt=it.shirt||'#4FC3F7';const showM=it.muscles!==false;
  // adult proportions (body height ≈ 690 units ≈ 7.5 heads): hip height = L1+L2+ankle ≈ 0.53·H, shoulder ≈ 0.82·H
  const gr=el('g',{},g);el('rect',{x:0,y:GY,width:1300,height:14,fill:TH.dim,opacity:.5},gr);const ticks=[...Array(16)].map(()=>el('rect',{y:GY+22,width:50,height:6,rx:3,fill:TH.dim,opacity:.35},gr));
  const cap=(G,L,w1,w2,c,o,back=0)=>el('path',{d:`M${-w1},0 C${-w1-back},${L*.35} ${-w2-2},${L*.75} ${-w2},${L} L${w2},${L} C${w2+2},${L*.7} ${w1},${L*.3} ${w1},0 Z`,fill:c,stroke:o,'stroke-width':3,'stroke-linejoin':'round'},G);
  const legG=far=>{const G=el('g',{},g);const th=el('g',{},G),sh=el('g',{},G),ft=el('g',{},G);const c=far?dark(sk,.28):sk,o=dark(sk,.5);
    cap(th,L1,31,21,c,o);el('path',{d:`M-21,4 C-30,${L2*.25} -28,${L2*.45} -16,${L2*.7} L-13,${L2} L13,${L2} L18,${L2*.4} C20,${L2*.2} 21,8 21,4 Z`,fill:c,stroke:o,'stroke-width':3,'stroke-linejoin':'round'},sh);el('circle',{r:21,fill:c},sh);
    el('path',{d:`M-26,-6 C-26,-24 6,-24 12,-10 L${FL-30},6 Q${FL-14},12 ${FL-24},${AH} L-28,${AH} Q-34,12 -26,-6Z`,fill:far?'#37474F':'#546E7A',stroke:'#263238','stroke-width':3},ft);
    const M={};if(showM&&!far){const m=(p,d,G)=>M[p]=el('path',{d,fill:NAT.muscle,stroke:NAT.bloodD,'stroke-width':2},G);
      m('quadriceps',`M6,26 C34,60 32,${L1*.75} 12,${L1-10} C2,${L1*.7} 2,70 6,26Z`,th);m('hamstrings',`M-8,34 C-34,70 -32,${L1*.75} -12,${L1-12} C-3,${L1*.7} -3,74 -8,34Z`,th);
      m('gluteus','M-6,-34 C-50,-40 -56,30 -22,44 C-8,24 -2,-6 -6,-34Z',th);m('calf',`M-8,14 C-34,40 -30,${L2*.5} -12,${L2*.72} C-3,${L2*.5} -3,40 -8,14Z`,sh);m('tibialis',`M9,18 C19,55 17,${L2*.7} 7,${L2-14} C3,${L2*.65} 3,55 9,18Z`,sh)}return {G,th,sh,ft,M}};
  const arm=(far)=>{const G=el('g',{},g);const u=el('g',{},G),f=el('g',{},G);const c=far?dark(sk,.28):sk,o=dark(sk,.5);cap(u,125,17,13,c,o);el('path',{d:'M-17,-4 C-19,24 -18,40 -15,52 L15,52 C18,40 19,24 17,-4 Z',fill:far?dark(shirt,.3):shirt,stroke:dark(shirt),'stroke-width':3},u);
    cap(f,100,13,10,c,o);el('circle',{r:13,fill:c},f);el('ellipse',{cx:2,cy:118,rx:13,ry:22,fill:c,stroke:o,'stroke-width':3},f);return {G,u,f}};
  const aB=arm(true),legB=legG(true);
  const torso=el('g',{},g);el('path',{d:'M-34,0 C-46,-60 -46,-150 -36,-196 Q0,-212 34,-196 C48,-150 46,-80 36,0 Z',fill:vol(shirt,{hi:.3}),stroke:dark(shirt),'stroke-width':3},torso);
  el('path',{d:'M-38,-14 L38,-14 L44,34 L-42,34Z',fill:'#37474F',stroke:'#263238','stroke-width':2},torso);el('rect',{x:-10,y:-222,width:22,height:30,fill:sk},torso);
  const hd=el('g',{transform:'translate(6 -262)'},torso);el('ellipse',{rx:38,ry:45,fill:vol(sk,{hi:.25}),stroke:dark(sk,.45),'stroke-width':3},hd);el('path',{d:'M36,-6 L46,8 L36,12',fill:sk,stroke:dark(sk,.45),'stroke-width':2.5},hd);
  el('path',{d:'M-38,-6 Q-40,-50 0,-48 Q34,-48 38,-20 Q16,-34 -14,-28 Q-30,-22 -38,-6Z',fill:NAT.hair},hd);el('circle',{cx:22,cy:-8,r:4.5,fill:'#222'},hd);el('ellipse',{cx:-6,cy:2,rx:7,ry:11,fill:dark(sk,.2)},hd);el('path',{d:'M20,24 Q28,26 32,22',fill:'none',stroke:dark(sk,.5),'stroke-width':2.5},hd);
  const legF=legG(false),aF=arm(false);
  const bar=el('g',{},g);const BX=400,BW=560,BY=900;el('rect',{x:BX,y:BY-14,width:BW*.6,height:28,rx:8,fill:'#26A69A',opacity:.55},bar);el('rect',{x:BX+BW*.6,y:BY-14,width:BW*.4,height:28,rx:8,fill:'#FFA726',opacity:.55},bar);
  txt(bar,'60%',BX+BW*.3,BY+8,{size:22,color:'ink'});txt(bar,'40%',BX+BW*.8,BY+8,{size:22,color:'ink'});const mk=el('rect',{y:BY-24,width:6,height:48,fill:TH.ink},bar);
  txt(bar,T({uz:'O‘ng oyoq sikli',en:'Right-leg cycle',ru:'Цикл правой ноги'}),BX-12,BY+8,{size:20,color:'dim',anchor:'end'});
  const act=txt(g,'',650,952,{size:26,color:'a3',weight:700});
  if(showM)Object.assign(A,{gluteus:legF.M.gluteus,quadriceps:legF.M.quadriceps,hamstrings:legF.M.hamstrings,tibialis:legF.M.tibialis,calf:legF.M.calf});Object.assign(A,{stance:[BX+BW*.3,BY-16],swing:[BX+BW*.8,BY-16]});
  // forward kinematics: angle θ from the downward vertical, + = forward (+x)
  const pose=(f,hx,hy)=>{const h=hipA(f)*D,kn=kneeA(f)*D,an=ankleA(f)*D;const kx=hx+Math.sin(h)*L1,ky=hy+Math.cos(h)*L1;const sa=h-kn;const ax=kx+Math.sin(sa)*L2,ay=ky+Math.cos(sa)*L2;const fa=sa+an; // foot rotates with shank, dorsiflexion lifts toes
    const fw=[Math.cos(fa),-Math.sin(fa)],dn=[Math.sin(fa),Math.cos(fa)];const heel=[ax+dn[0]*AH-fw[0]*28,ay+dn[1]*AH-fw[1]*28],toe=[ax+dn[0]*AH+fw[0]*(FL-24),ay+dn[1]*AH+fw[1]*(FL-24)];return {h,sa,fa,kx,ky,ax,ay,low:Math.max(heel[1],toe[1])-hy}};
  const p1=pose(.15,0,0),p2=pose(.45,0,0);const vg=(p1.ax-p2.ax)/(.3*TT);
  return {anchors:A,sideAt:.3,view:[230,100,840,870],update(lt){const f=((lt/TT)%1+1)%1;const fF=f,fB=(f+.5)%1;const hx=640;const hy=GY-Math.max(pose(fF,hx,0).low,pose(fB,hx,0).low);const P=pose(fF,hx,hy),Q=pose(fB,hx,hy);
    const setLeg=(L,p,ff)=>{L.th.setAttribute('transform',`translate(${f2(hx)} ${f2(hy)}) rotate(${f2(-p.h/D)})`);L.sh.setAttribute('transform',`translate(${f2(p.kx)} ${f2(p.ky)}) rotate(${f2(-p.sa/D)})`);
      L.ft.setAttribute('transform',`translate(${f2(p.ax)} ${f2(p.ay)}) rotate(${f2(-p.fa/D)})`);for(const k in L.M){const a=ACT[k](ff);at(L.M[k],{opacity:f2(.28+.67*a),filter:a>.5?'url(#glowS)':''})}};
    setLeg(legF,P,fF);setLeg(legB,Q,fB);const lean=3;torso.setAttribute('transform',`translate(${f2(hx)} ${f2(hy)}) rotate(${lean})`);
    const sx=hx+Math.sin(lean*D)*190,sy=hy-Math.cos(lean*D)*190;
    // arms swing opposite to the leg of the same side (right arm ↔ left leg)
    const arms=(o,ffOpp)=>{const s=.9*(hipA(ffOpp)-11)*D,e=(14+22*clamp(s/(18*D)))*D;o.u.setAttribute('transform',`translate(${f2(sx)} ${f2(sy)}) rotate(${f2(-s/D)})`);o.f.setAttribute('transform',`translate(${f2(sx+Math.sin(s)*125)} ${f2(sy+Math.cos(s)*125)}) rotate(${f2(-(s+e)/D)})`)};
    arms(aF,fB);arms(aB,fF);ticks.forEach((t,i)=>t.setAttribute('x',f2(((i*90-lt*vg)%1440+1440)%1440-70)));mk.setAttribute('x',f2(BX+BW*fF-3));
    const on=showM?Object.keys(ACT).filter(k=>ACT[k](fF)>.5).map(k=>nm(k)):[];act.textContent=on.length?T({uz:'Faol: ',en:'Active: ',ru:'Активны: '})+on.join(', '):''}}});
/* ---------- SKELETON (front view, major bones) ---------- */
SM.items.skeleton=preset(760,1100,(g,it)=>{const A={},B=NAT.bone,O=NAT.boneD,cx=380;const bone=(G,x1,y1,x2,y2,w,e=1.25)=>{[[O,w+6,w*e+3],[B,w,w*e]].forEach(([c,sw,r])=>{el('line',{x1,y1,x2,y2,stroke:c,'stroke-width':sw,'stroke-linecap':'round'},G);el('circle',{cx:x1,cy:y1,r:r/2+2,fill:c},G);el('circle',{cx:x2,cy:y2,r:r/2+2,fill:c},G)})};
  const S=el('g',{},g);const side=s=>{const G=el('g',{transform:s<0?`translate(${2*cx} 0) scale(-1 1)`:''},S);
    bone(G,cx+18,210,cx+110,200,16,1.2);// clavicle
    el('path',{d:`M${cx+70},215 L${cx+125},215 L${cx+110},330 Z`,fill:B,stroke:O,'stroke-width':3,opacity:.85},G);// scapula hint
    bone(G,cx+124,225,cx+160,445,24,1.6);bone(G,cx+168,452,cx+204,640,13,1.5);bone(G,cx+150,455,cx+180,645,11,1.4);// humerus radius ulna
    for(let k=0;k<5;k++){const x=cx+170+k*11,y=670;el('rect',{x:x-6,y:y-12,width:12,height:24,rx:5,fill:B,stroke:O,'stroke-width':2},G);bone(G,x,y+18,x+(k-2)*4,y+70-(k===0?20:0),8,1.2)}
        el('path',{d:`M${cx+8},540 C${cx+60},500 ${cx+132},515 ${cx+116},610 C${cx+100},650 ${cx+56},660 ${cx+28},640 Z`,fill:B,stroke:O,'stroke-width':4},G);el('ellipse',{cx:cx+64,cy:612,rx:22,ry:17,fill:TH.bg,opacity:.8},G);// ilium & obturator
    bone(G,cx+92,640,cx+86,890,26,1.7);el('ellipse',{cx:cx+86,cy:892,rx:22,ry:20,fill:B,stroke:O,'stroke-width':3},G);bone(G,cx+80,910,cx+80,1050,22,1.6);bone(G,cx+110,915,cx+112,1045,9,1.3);// femur patella tibia fibula
    el('path',{d:`M${cx+60},1060 L${cx+120},1060 L${cx+150},1092 L${cx+56},1092 Z`,fill:B,stroke:O,'stroke-width':3},G);
    for(let r=0;r<12;r++){const y=250+r*24,w=lerp(70,120,Math.sin(Math.min(1,r/7)*Math.PI/2))*(r>9?.75:1);el('path',{d:`M${cx+14},${y} C${cx+w},${y-10} ${cx+w+10},${y+30} ${cx+w*.75},${y+44}`,fill:'none',stroke:O,'stroke-width':12,'stroke-linecap':'round'},G);
      el('path',{d:`M${cx+14},${y} C${cx+w},${y-10} ${cx+w+10},${y+30} ${cx+w*.75},${y+44}`,fill:'none',stroke:B,'stroke-width':7,'stroke-linecap':'round',class:'rib'},G)}return G};
  const ribsG=el('g',{},S);const L=side(-1),Rr=side(1);
  for(let v=0;v<24;v++){const y=190+v*15.5;el('rect',{x:cx-13,y,width:26,height:12,rx:4,fill:B,stroke:O,'stroke-width':2},S)}el('path',{d:`M${cx-40},540 L${cx+40},540 L${cx+18},610 L${cx-18},610Z`,fill:B,stroke:O,'stroke-width':3},S);// sacrum
  el('path',{d:`M${cx-16},225 L${cx+16},225 L${cx+12},370 L${cx-12},370Z`,fill:B,stroke:O,'stroke-width':3},S);// sternum
  el('path',{d:`M${cx-72},110 C${cx-80},20 ${cx+80},20 ${cx+72},110 C${cx+70},140 ${cx+56},150 ${cx+50},160 L${cx-50},160 C${cx-56},150 ${cx-70},140 ${cx-72},110Z`,fill:vol(B,{hi:.2,lo:.2}),stroke:O,'stroke-width':4},S);
  [-1,1].forEach(s=>el('ellipse',{cx:cx+s*28,cy:108,rx:20,ry:17,fill:'#2b2b2b'},S));el('path',{d:`M${cx-7},128 L${cx+7},128 L${cx},142Z`,fill:'#2b2b2b'},S);
  el('path',{d:`M${cx-50},158 Q${cx-46},196 ${cx},200 Q${cx+46},196 ${cx+50},158 Z`,fill:B,stroke:O,'stroke-width':3},S);for(let t=-3;t<=3;t++)el('rect',{x:cx+t*11-4,y:152,width:8,height:12,fill:'#fff',stroke:O,'stroke-width':1},S);
  Object.assign(A,{skull:[cx,60],mandible:[cx+32,186],clavicle:[cx+66,205],scapula:[cx+112,262],sternum:[cx,300],ribs:[cx+96,345],spine:[cx,480],humerus:[cx+144,340],radius:[cx+190,562],ulna:[cx+164,562],hand:[cx+196,722],pelvis:[cx+92,560],femur:[cx+90,760],patella:[cx+86,892],tibia:[cx+80,980],fibula:[cx+111,980],foot:[cx+110,1080]});
  return {anchors:A,update(lt){const b=1+.012*Math.sin(lt*1.6);S.querySelectorAll('.rib').forEach(r=>{});S.setAttribute('transform',`translate(${cx} 300) scale(${f2(b)} 1) translate(${-cx} -300)`)}}});
/* ---------- ARM LEVER: antagonistic biceps / triceps, 3rd-class lever ---------- */
SM.items.armlever=preset(1200,820,(g,it)=>{const A={},TT=it.cycle||6,sx=520,sy=120,ex=520,ey=470,FL=330;const B=NAT.bone,O=NAT.boneD;
  const arm=el('g',{},g);el('line',{x1:sx,y1:sy,x2:ex,y2:ey,stroke:O,'stroke-width':40,'stroke-linecap':'round'},arm);el('line',{x1:sx,y1:sy,x2:ex,y2:ey,stroke:B,'stroke-width':32,'stroke-linecap':'round'},arm);
  el('path',{d:`M${sx-60},${sy-50} L${sx+70},${sy-60} L${sx+20},${sy+60}Z`,fill:B,stroke:O,'stroke-width':4},arm);
  const fa=el('g',{},g);el('line',{x1:0,y1:-6,x2:FL,y2:-6,stroke:O,'stroke-width':26,'stroke-linecap':'round'},fa);el('line',{x1:0,y1:-6,x2:FL,y2:-6,stroke:B,'stroke-width':20,'stroke-linecap':'round'},fa);
  el('line',{x1:-18,y1:14,x2:FL-6,y2:14,stroke:O,'stroke-width':22,'stroke-linecap':'round'},fa);el('line',{x1:-18,y1:14,x2:FL-6,y2:14,stroke:dark(B,.06),'stroke-width':16,'stroke-linecap':'round'},fa);
  const ball=el('g',{},fa);el('circle',{cx:FL+40,cy:0,r:52,fill:vol('#546E7A'),stroke:'#263238','stroke-width':3},ball);txt(ball,'5 kg',FL+40,10,{size:26,color:'#fff'});el('circle',{cx:ex,cy:ey,r:24,fill:B,stroke:O,'stroke-width':4},g);
  const bic=el('path',{stroke:NAT.bloodD,'stroke-width':3},g),tri=el('path',{stroke:NAT.bloodD,'stroke-width':3},g);const tb=el('path',{fill:'none',stroke:'#ECEFF1','stroke-width':8},g),tt=el('path',{fill:'none',stroke:'#ECEFF1','stroke-width':8},g);
  const fulc=el('polygon',{fill:'#FFCA28',stroke:'#E65100','stroke-width':3},g);const eArr=el('line',{stroke:'#4FC3F7','stroke-width':7,'marker-end':arrowMarker('#4FC3F7')},g),lArr=el('line',{stroke:'#FF7043','stroke-width':7,'marker-end':arrowMarker('#FF7043')},g);
  const cap=txt(g,'',600,790,{size:30,color:'a2'});Object.assign(A,{humerus:[sx-20,300],biceps:[sx+90,300],triceps:[sx-90,300],elbow:[ex,ey+40],radius:[ex+200,ey],ulna:[ex+150,ey+30],load:[ex+FL+40,ey-60],effort:[ex+60,ey-30],tendonA:[sx+40,sy+20]});
  const ins=40;
  return {anchors:A,update(lt){const u=cyc(lt,0,TT);const fl=u<.5?E.inOutCubic(u/.5):1-E.inOutCubic((u-.5)/.5);const ang=lerp(42,-48,fl)*D;// forearm angle (0 = horizontal right, negative = up)
    fa.setAttribute('transform',`translate(${ex} ${ey}) rotate(${f2(ang/D)})`);const ix=ex+Math.cos(ang)*ins,iy=ey+Math.sin(ang)*ins;
    const flexing=u<.5;const bA=flexing?1:.15,tA=flexing?.15:1;
    const musc=(Ox,Oy,Ix,Iy,bul,front)=>{const L=Math.hypot(Ix-Ox,Iy-Oy);let px=-(Iy-Oy)/L,py=(Ix-Ox)/L;if((px>0)!==front){px=-px;py=-py}const mx=(Ox+Ix)/2,my=(Oy+Iy)/2;
      return {d:`M${f2(Ox)},${f2(Oy)} Q${f2(mx+px*bul*2)},${f2(my+py*bul*2)} ${f2(Ix)},${f2(Iy)} Q${f2(mx+px*bul*.25)},${f2(my+py*bul*.25)} ${f2(Ox)},${f2(Oy)}Z`,c:[mx+px*bul,my+py*bul]}};
    const mb=musc(sx+24,sy+90,ix,iy-8,lerp(34,70,fl),true);bic.setAttribute('d',mb.d);at(bic,{fill:mix('#B07A7A',NAT.muscle,bA),filter:bA>.5?'url(#glowS)':''});
    const ox=ex-Math.cos(ang)*26,oy=ey-Math.sin(ang)*26;const mt=musc(sx-24,sy+80,ox,oy-20,lerp(52,36,fl),false);tri.setAttribute('d',mt.d);at(tri,{fill:mix('#B07A7A',NAT.muscle,tA),filter:tA>.5?'url(#glowS)':''});
    const nx=0,mx=0,my=0,ny=0,bul=0;
tb.setAttribute('d',`M${sx+20},${sy+40} L${sx+20},${sy+90}`);tt.setAttribute('d',`M${f2(ox-6)},${f2(oy-24)} L${f2(ox)},${f2(oy)}`);
    fulc.setAttribute('points',`${ex},${ey+30} ${ex-26},${ey+70} ${ex+26},${ey+70}`);at(eArr,{x1:f2(ix-nx*0),y1:f2(iy+60),x2:f2(ix),y2:f2(iy+6),opacity:flexing?1:.25});
    const lx=ex+Math.cos(ang)*(FL+40),ly=ey+Math.sin(ang)*(FL+40);at(lArr,{x1:f2(lx),y1:f2(ly+60),x2:f2(lx),y2:f2(ly+130)});A.load=[lx,ly-60];A.effort=[ix+30,iy+30];A.biceps=mb.c;A.triceps=mt.c;
    cap.textContent=flexing?T({uz:'Bukish: biceps qisqaradi, triceps bo‘shashadi',en:'Flexion: biceps contracts, triceps relaxes',ru:'Сгибание: бицепс сокращается'}):T({uz:'Yozish: triceps qisqaradi, biceps bo‘shashadi',en:'Extension: triceps contracts, biceps relaxes',ru:'Разгибание: трицепс сокращается'})}}});
KIT.bind();
})();
