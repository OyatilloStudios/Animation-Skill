/* ================= SHELF: PHYSICS — prism · spectrum · raydiagram · wavecompare · shock · spacetime (analogy) · material (rope|rigid|soft|fluid|gas) =================
   Geometry is computed (Snell's law with dispersion, lens/mirror equations, Mach angle) — never hand-placed. */
(()=>{
const {mix,dark,light,vol,txt,cyc,T,badge}=KIT;
KIT.names(NAMES.uz,{pivotP:'Osilish nuqtasi',white:'Oq yorug‘lik',prismG:'Shisha prizma',spectrumS:'Spektr',red:'Qizil — eng kam sinadi',violet:'Binafsha — eng ko‘p sinadi',normal:'Normal (perpendikulyar)',
  object:'Buyum',image:'Tasvir',focus:'Fokus (F)',lensL:'Linza',mirror:'Ko‘zgu',axis:'Bosh optik o‘q',
  efield:'Elektr maydon (E)',bfield:'Magnit maydon (B)',compression:'Siqilish',rarefaction:'Siyraklanish',source:'Manba',cone:'Mach konusi',wavefront:'To‘lqin fronti',
  mass:'Massa (yulduz)',planet:'Sayyora',grid:'Fazo-vaqt to‘ri',lightPath:'Yorug‘lik yo‘li'});
KIT.names(NAMES.en,{pivotP:'Pivot',white:'White light',prismG:'Glass prism',spectrumS:'Spectrum',red:'Red — bends least',violet:'Violet — bends most',normal:'Normal',
  object:'Object',image:'Image',focus:'Focal point (F)',lensL:'Lens',mirror:'Mirror',axis:'Principal axis',efield:'Electric field (E)',bfield:'Magnetic field (B)',compression:'Compression',rarefaction:'Rarefaction',source:'Source',cone:'Mach cone',wavefront:'Wavefront',
  mass:'Mass (star)',planet:'Planet',grid:'Space-time grid',lightPath:'Light path'});
KIT.names(NAMES.ru,{pivotP:'Точка подвеса',white:'Белый свет',prismG:'Призма',spectrumS:'Спектр',object:'Предмет',image:'Изображение',focus:'Фокус',compression:'Сжатие',rarefaction:'Разрежение',planet:'Планета'});
const WL=[[700,'#FF2A2A'],[620,'#FF8A00'],[580,'#FFE600'],[530,'#3CDC3C'],[470,'#2F7BFF'],[445,'#4B3BFF'],[405,'#9B30FF']];
const nGlass=lam=>1.5046+4200/(lam*lam); // Cauchy, crown glass (λ in nm)
const refr=(d,nv,n1,n2)=>{let c=-(d[0]*nv[0]+d[1]*nv[1]);let N=nv;if(c<0){N=[-nv[0],-nv[1]];c=-c}const r=n1/n2,k=1-r*r*(1-c*c);if(k<0)return null;const s=r*c-Math.sqrt(k);return [r*d[0]+s*N[0],r*d[1]+s*N[1]]};
const hit=(p,d,a,b)=>{const ex=b[0]-a[0],ey=b[1]-a[1];const den=d[0]*ey-d[1]*ex;if(Math.abs(den)<1e-9)return null;const t=((a[0]-p[0])*ey-(a[1]-p[1])*ex)/den,u=((a[0]-p[0])*d[1]-(a[1]-p[1])*d[0])/den;return t>1e-6&&u>=0&&u<=1?[p[0]+d[0]*t,p[1]+d[1]*t,t]:null};
const nrm=(a,b)=>{const ex=b[0]-a[0],ey=b[1]-a[1],L=Math.hypot(ex,ey);return [ey/L,-ex/L]};
/* ---------- PRISM dispersion ---------- */
SM.items.prism=preset(1500,820,(g,it)=>{const AP=[700,170],BL=[440,620],BR=[960,620],A={};el('polygon',{points:[AP,BL,BR].map(p=>p.join(',')).join(' '),fill:KIT.lin('#B3E5FC','#4FC3F7',{o1:.35,o2:.18}),stroke:'#B3E5FC','stroke-width':4},g);
  const P0=[60,520],d0=(()=>{const v=[1,-.2];const L=Math.hypot(...v);return [v[0]/L,v[1]/L]})();const h1=hit(P0,d0,BL,AP);const n1=nrm(BL,AP);
  const EX=it.exaggerate??8,nM=nGlass(560);const rays=WL.map(([lam,c])=>{const n=nM+(nGlass(lam)-nM)*EX;const d1=refr(d0,n1,1,n);const h2=hit(h1,d1,AP,BR)||hit(h1,d1,BR,BL);const d2=refr(d1,nrm(AP,BR),n,1)||d1;const end=[h2[0]+d2[0]*900,h2[1]+d2[1]*900];return {c,h2,end,lam}});
  const beam=el('line',{x1:P0[0],y1:P0[1],x2:P0[0],y2:P0[1],stroke:'#fff','stroke-width':10,filter:'url(#glowS)'},g);const inside=rays.map(r=>el('line',{stroke:r.c,'stroke-width':5,opacity:.85},g));const out=rays.map(r=>el('line',{stroke:r.c,'stroke-width':9,filter:'url(#glowS)'},g));
  dr(el('line',{x1:h1[0]-n1[0]*120,y1:h1[1]-n1[1]*120,x2:h1[0]+n1[0]*120,y2:h1[1]+n1[1]*120,stroke:TH.dim,'stroke-width':2,'stroke-dasharray':'8 6'},g));
  const sx=1440;el('rect',{x:sx,y:150,width:24,height:620,fill:'#ECEFF1',opacity:.9},g);if(EX>1)txt(g,T({uz:`Ranglar ajralishi ko‘rinishi uchun ${EX}× kattalashtirilgan`,en:`Colour spread exaggerated ${EX}× for visibility`,ru:`Разложение увеличено в ${EX}×`}),700,790,{size:22,color:'dim',weight:600});
  const yAt=r=>{const t=(sx-r.h2[0])/(r.end[0]-r.h2[0]);return r.h2[1]+(r.end[1]-r.h2[1])*t};
  Object.assign(A,{white:[200,495],prismG:[700,560],normal:[h1[0]+n1[0]*110,h1[1]+n1[1]*110],red:[sx-20,yAt(rays[0])],violet:[sx-20,yAt(rays[6])],spectrumS:[sx+12,(yAt(rays[0])+yAt(rays[6]))/2]});
  return {anchors:A,labelLayout:'side',sides:{white:'left',normal:'left',prismG:'left',red:'right',violet:'right',spectrumS:'right'},update(lt,p,st){const q=prog(lt,st+.3,st+1.3),q2=prog(lt,st+1.3,st+1.8),q3=E.outCubic(prog(lt,st+1.8,st+3));at(beam,{x2:f2(lerp(P0[0],h1[0],q)),y2:f2(lerp(P0[1],h1[1],q))});
    rays.forEach((r,i)=>{at(inside[i],{x1:h1[0],y1:h1[1],x2:f2(lerp(h1[0],r.h2[0],q2)),y2:f2(lerp(h1[1],r.h2[1],q2)),opacity:q2>0?.85:0});const ex=lerp(r.h2[0],sx,q3),ey=lerp(r.h2[1],yAt(r),q3);at(out[i],{x1:r.h2[0],y1:r.h2[1],x2:f2(ex),y2:f2(ey),opacity:q3>0?1:0})})}}});
/* ---------- ELECTROMAGNETIC SPECTRUM ---------- */
SM.items.spectrum=preset(1700,820,(g,it)=>{const R=[['radio',{uz:'Radio to‘lqinlar',en:'Radio'},{uz:'radio, TV',en:'radio, TV'},'#90A4AE'],['micro',{uz:'Mikroto‘lqin',en:'Microwave'},{uz:'pech, Wi-Fi',en:'oven, Wi-Fi'},'#A1887F'],['ir',{uz:'Infraqizil',en:'Infrared'},{uz:'issiqlik, pult',en:'heat, remote'},'#E57373'],
  ['vis',{uz:'Ko‘rinadigan',en:'Visible'},{uz:'ko‘z ko‘radi',en:'we see it'},'#FFF'],['uv',{uz:'Ultrabinafsha',en:'Ultraviolet'},{uz:'quyosh kuydiradi',en:'sunburn'},'#B388FF'],['x',{uz:'Rentgen',en:'X-rays'},{uz:'suyak surati',en:'bone images'},'#80DEEA'],['gamma',{uz:'Gamma nurlar',en:'Gamma rays'},{uz:'radioaktiv yadro',en:'nuclear decay'},'#69F0AE']];
  const x0=60,W=1580,y0=330,h=110,w=W/R.length,A={};R.forEach(([k,n,ex,c],i)=>{const x=x0+i*w;el('rect',{x,y:y0,width:w-4,height:h,rx:12,fill:k==='vis'?KIT.lin('#FF0000','#8F00FF',{x2:1,y2:0}):c,opacity:k==='vis'?1:.75},g);
    txt(g,T(n),x+w/2,y0+h/2+4,{size:24,color:'#111'});txt(g,T(ex),x+w/2,y0+h/2+34,{size:20,color:'#222',weight:600});A[k]=[x+w/2,y0]});
  const wave=el('path',{fill:'none',stroke:TH.a1,'stroke-width':4},g);const lam=['>1 m','1 mm–1 m','700 nm–1 mm','380–700 nm','10–380 nm','0.01–10 nm','<0.01 nm'];lam.forEach((s,i)=>txt(g,s,x0+i*w+w/2,y0+h+40,{size:20,color:'dim'}));
  const ar=(y,s,rev)=>{el('line',{x1:rev?x0+W:x0,y1:y,x2:rev?x0:x0+W,y2:y,stroke:TH.dim,'stroke-width':3,'marker-end':arrowMarker('dim')},g);txt(g,s,x0+W/2,y-12,{size:24,color:'dim'})};
  ar(560,T({uz:'Chastota va energiya ortadi →',en:'Frequency and energy increase →'}),false);ar(620,T({uz:'← To‘lqin uzunligi ortadi',en:'← Wavelength increases'}),true);
  const vx=x0+3*w,vz=el('g',{},g);el('path',{d:`M${vx},${y0+h} L${x0+300},700 L${x0+W-300},700 L${vx+w-4},${y0+h}`,fill:'none',stroke:TH.faint,'stroke-width':2},vz);el('rect',{x:x0+300,y:700,width:W-600,height:44,rx:8,fill:KIT.lin('#FF0000','#8F00FF',{x2:1,y2:0})},vz);
  [400,500,600,700].forEach(n=>{const x=x0+300+(750-n)/(750-380)*(W-600);el('line',{x1:x,y1:744,x2:x,y2:758,stroke:TH.ink,'stroke-width':2},vz);txt(vz,n+' nm',x,790,{size:20,color:'dim'})});
  const k0=TAU/220,aa=Math.log(220/7);return {anchors:A,core:[],update(lt){let d='';for(let x=0;x<=W;x+=1.5){const u=x/W;const ph=k0*W/aa*(Math.exp(aa*u)-1);d+=(d?' L':'M')+f2(x0+x)+','+f2(220+Math.sin(ph-lt*4)*60)}wave.setAttribute('d',d)}}});
/* ---------- RAY DIAGRAMS (lens & mirror equations) ---------- */
const RK={convex:1,concave:1,concavemirror:1,convexmirror:1,plane:1};
SM.items.raydiagram=preset(1600,800,(g,it)=>{const k=it.kind||'convex';if(!RK[k])SERR.push(`raydiagram: kind "${k}" → ${Object.keys(RK).join(', ')}`);const mir=k.includes('mirror')||k==='plane';const X=mir?1100:800,Y=420,F=it.f||180,h=it.h||110,A={};
  el('line',{x1:30,y1:Y,x2:1570,y2:Y,stroke:TH.dim,'stroke-width':2},g);const fS=k==='concave'||k==='convexmirror'?-1:1;
  if(!mir){const c=k==='convex';dr(el('path',{d:c?`M${X},${Y-300} Q${X+60},${Y} ${X},${Y+300} Q${X-60},${Y} ${X},${Y-300}Z`:`M${X-34},${Y-300} L${X+34},${Y-300} Q${X+6},${Y} ${X+34},${Y+300} L${X-34},${Y+300} Q${X-6},${Y} ${X-34},${Y-300}Z`,fill:'#81D4FA','fill-opacity':.3,stroke:'#4FC3F7','stroke-width':4},g));
    [[X-F,'F'],[X+F,'F′'],[X-2*F,'2F'],[X+2*F,'2F′']].forEach(([x,s])=>{el('circle',{cx:x,cy:Y,r:7,fill:TH.a2},g);txt(g,s,x,Y+36,{size:26,color:'a2'})})}
  else{if(k==='plane'){el('line',{x1:X,y1:Y-300,x2:X,y2:Y+300,stroke:'#B0BEC5','stroke-width':8},g)}else{const cv=k==='concavemirror',e=cv?X-60:X+60;dr(el('path',{d:`M${e},${Y-300} Q${2*X-e},${Y} ${e},${Y+300}`,fill:'none',stroke:'#B0BEC5','stroke-width':8},g))}
    {const sg=k==='concavemirror'?-60:k==='plane'?0:60;for(let y=Y-290;y<Y+300;y+=24){const q=Math.pow((y-Y)/300,2)*sg;el('line',{x1:X+8+q,y1:y,x2:X+30+q,y2:y+14,stroke:'#78909C','stroke-width':3},g)}}
    if(k!=='plane'){const fx=k==='concavemirror'?X-F:X+F;[[fx,'F'],[k==='concavemirror'?X-2*F:X+2*F,'C']].forEach(([x,s])=>{el('circle',{cx:x,cy:Y,r:7,fill:TH.a2},g);txt(g,s,x,Y+36,{size:26,color:'a2'})})}}
  const obj=el('line',{stroke:'#66BB6A','stroke-width':10,'marker-end':arrowMarker('#66BB6A')},g),img=el('line',{stroke:'#FF7043','stroke-width':10,'marker-end':arrowMarker('#FF7043')},g);
  const R=[...Array(3)].map((_,i)=>({s:el('path',{fill:'none',stroke:['#FFD54F','#4FC3F7','#F06292'][i],'stroke-width':4},g),v:el('path',{fill:'none',stroke:['#FFD54F','#4FC3F7','#F06292'][i],'stroke-width':3,'stroke-dasharray':'10 8',opacity:.8},g)}));
  const info=txt(g,'',800,780,{size:30,color:'a2'});
  const clipEnd=(p,d)=>{let t=4000;if(d[0]>0)t=Math.min(t,(1570-p[0])/d[0]);if(d[0]<0)t=Math.min(t,(30-p[0])/d[0]);if(d[1]>0)t=Math.min(t,(Y+360-p[1])/d[1]);if(d[1]<0)t=Math.min(t,(Y-380-p[1])/d[1]);return [p[0]+d[0]*t,p[1]+d[1]*t]};
  const L=(...P)=>P.map((p,i)=>(i?'L':'M')+f2(p[0])+','+f2(p[1])).join(' ');const un=(a,b)=>{const dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy);return [dx/l,dy/l]};
  {const u0=(it.move?3.2:(it.u||2.5))*F,f0=fS*F;let v0,m0;if(!mir){v0=1/(1/f0-1/u0);m0=v0/(-u0)}else if(k==='plane'){v0=-u0;m0=1}else{v0=1/(1/f0-1/u0);m0=-v0/u0}
    var CUR={o:[X-u0,Y-h],i:[mir?X-v0:X+v0,Y-h*m0]};Object.assign(A,{object:()=>CUR.o,image:()=>CUR.i,focus:[k==='concavemirror'?X-F:mir?X+F:X-F,Y],axis:[mir?120:1480,Y]});if(k==='plane')delete A.focus;if(mir)A.mirror=[X+(k==='concavemirror'?-60:k==='plane'?0:60),Y-300];else A.lensL=[X,Y-300]}
  return {anchors:A,labelLayout:'side',core:['object','image',mir?'mirror':'lensL'],sides:{object:'left',image:'right',lensL:'right',mirror:'right'},update(lt,p,st){const uu=it.move?lerp(3.2,.55,E.inOutSine(cyc(lt,st,it.cycle||12,0)<.5?cyc(lt,st,it.cycle||12,0)*2:2-cyc(lt,st,it.cycle||12,0)*2)):(it.u||2.5);const u=uu*F,xo=X-u,top=[xo,Y-h];
    at(obj,{x1:xo,y1:Y,x2:xo,y2:Y-h});CUR.o=[xo,Y-h*.6];const f=fS*F;let v,m;
    if(!mir){v=1/(1/f-1/u);m=v/(-u)}else if(k==='plane'){v=-u;m=1}else{v=1/(1/f-1/u);m=-v/u}
    const ix=mir?X-v:X+v,ih=-h*m*(mir?1:1);const real=k==='plane'?false:(mir?v>0:v>0);const hI=mir?h*m:h*m;// image top y
    const iy=Y-hI;at(img,{x1:f2(ix),y1:Y,x2:f2(ix),y2:f2(iy),opacity:Math.abs(v)>6000?0:1});img.setAttribute('stroke-dasharray',real?'none':'10 7');CUR.i=Math.abs(v)>6000?null:[ix,Y-hI*.6];
    const draw=q=>prog(lt,st+.5+q*.6,st+1.1+q*.6);
    if(!mir){const p1=[X,Y-h];let d1=f>0?un(p1,[X+f,Y]):un([X+f,Y],p1);R[0].s.setAttribute('d',L(top,p1,clipEnd(p1,d1)));R[0].v.setAttribute('d',f<0?L(p1,[X+f,Y]):v<0?L(p1,[ix,iy]):'');
      const d2=un(top,[X,Y]);R[1].s.setAttribute('d',L(top,clipEnd(top,d2)));R[1].v.setAttribute('d',v<0?L([X,Y],[ix,iy]):'');
      const fp=f>0?[X-f,Y]:[X-f,Y];const d3=un(top,fp);const tt=(X-top[0])/d3[0];const p3=[X,top[1]+d3[1]*tt];if(Math.abs(p3[1]-Y)<360&&Math.abs(u-Math.abs(f))>4){R[2].s.setAttribute('d',L(top,p3,clipEnd(p3,[1,0])));R[2].v.setAttribute('d',v<0?L(p3,[ix,p3[1]]):'')}else{R[2].s.setAttribute('d','');R[2].v.setAttribute('d','')}}
    else{const p1=[X+(k==='concavemirror'?-60:k==='plane'?0:60)*Math.pow(h/300,2),Y-h];let d1;if(k==='plane')d1=[-1,0];else d1=f>0?un(p1,[X-f,Y]):un([X+Math.abs(f),Y],p1);R[0].s.setAttribute('d',L(top,p1,clipEnd(p1,d1)));R[0].v.setAttribute('d',(!real)?L(p1,[ix,iy]):'');
      const d2=un(top,[X,Y]);const r2=[-d2[0],d2[1]];R[1].s.setAttribute('d',L(top,[X,Y],clipEnd([X,Y],r2)));R[1].v.setAttribute('d',!real?L([X,Y],[ix,iy]):'');R[2].s.setAttribute('d','');R[2].v.setAttribute('d','')}
    R.forEach((r,i)=>{const q=draw(i);[r.s,r.v].forEach(e=>{e.setAttribute('pathLength',1);e.setAttribute('stroke-dasharray',e===r.v?'0.012 0.01':`${f2(q)} 1`)})});
    const sz=Math.abs(m)>1.02?T({uz:'kattalashgan',en:'magnified'}):Math.abs(m)<.98?T({uz:'kichraygan',en:'diminished'}):T({uz:'teng',en:'same size'});
    info.textContent=Math.abs(v)>6000?T({uz:'Buyum fokusda — tasvir hosil bo‘lmaydi (cheksizlikda)',en:'Object at F — no image (at infinity)'}):T({uz:'Tasvir: ',en:'Image: '})+(real?T({uz:'haqiqiy, teskari',en:'real, inverted'}):T({uz:'mavhum, to‘g‘ri',en:'virtual, upright'}))+', '+sz+` (d = ${(uu).toFixed(1)}F)`}}});
/* ---------- LIGHT vs SOUND ---------- */
SM.items.wavecompare=preset(1600,860,(g,it)=>{const A={};txt(g,T({uz:'Yorug‘lik — ko‘ndalang elektromagnit to‘lqin',en:'Light — transverse electromagnetic wave'}),40,50,{anchor:'start',size:30,color:'a1'});
  txt(g,T({uz:'Vakuumda ham tarqaladi · c ≈ 300 000 km/s',en:'Travels through vacuum · c ≈ 300 000 km/s'}),40,88,{anchor:'start',size:24,color:'dim',weight:600});
  const Ey=230,E1=el('path',{fill:'none',stroke:'#FF5252','stroke-width':5},g),B1=el('path',{fill:'none',stroke:'#448AFF','stroke-width':5},g);el('line',{x1:60,y1:Ey,x2:1560,y2:Ey,stroke:TH.dim,'stroke-width':2,'marker-end':arrowMarker('dim')},g);
  const vecs=[...Array(30)].map((_,i)=>el('line',{stroke:'#FF5252','stroke-width':2,opacity:.5},g));
  const bvecs=[...Array(30)].map((_,i)=>el('line',{stroke:'#448AFF','stroke-width':2,opacity:.45},g));
  el('line',{x1:0,y1:430,x2:1600,y2:430,stroke:TH.faint,'stroke-width':2},g);txt(g,T({uz:'Tovush — bo‘ylama mexanik to‘lqin',en:'Sound — longitudinal mechanical wave'}),40,490,{anchor:'start',size:30,color:'a2'});
  txt(g,T({uz:'Muhit kerak (havoda ≈ 343 m/s) · vakuumda tarqalmaydi',en:'Needs a medium (≈ 343 m/s in air) · no sound in vacuum'}),40,528,{anchor:'start',size:24,color:'dim',weight:600});
  const sp=el('g',{},g);el('rect',{x:40,y:580,width:60,height:200,rx:8,fill:vol('#546E7A')},sp);const cone=el('path',{fill:vol('#90A4AE'),stroke:'#37474F','stroke-width':3},sp);
  const parts=[];for(let r=0;r<9;r++)for(let c=0;c<64;c++)parts.push([160+c*22,600+r*22,el('circle',{r:5,fill:TH.a2},g)]);
  let CX=430;Object.assign(A,{efield:{el:vecs[7],fx:.5,fy:0},bfield:{el:bvecs[11],fx:.5,fy:1},compression:()=>[CX,590],rarefaction:()=>[CX+90,590],source:[70,580]});
  const k=TAU/420,w=TAU*.6;return {anchors:A,update(lt){let e='',b='';for(let x=60;x<=1560;x+=6){const s=Math.sin(k*x-w*lt);e+=(e?' L':'M')+x+','+f2(Ey-s*120);b+=(b?' L':'M')+f2(x-s*24)+','+f2(Ey+s*48)}E1.setAttribute('d',e);B1.setAttribute('d',b);
    vecs.forEach((v,i)=>{const x=60+i*50;const s=Math.sin(k*x-w*lt);at(v,{x1:x,y1:Ey,x2:x,y2:f2(Ey-s*120)})});bvecs.forEach((v,i)=>{const x=60+i*50;const s=Math.sin(k*x-w*lt);at(v,{x1:x,y1:Ey,x2:f2(x-s*24),y2:f2(Ey+s*48)})});
    const ks=TAU/180,ws=TAU*.9;parts.forEach(([x,y,e])=>{const dx=-Math.cos(ks*x-ws*lt)*9;e.setAttribute('cx',f2(x+dx));e.setAttribute('cy',y)});const cx=100+Math.sin(ws*lt)*8;cone.setAttribute('d',`M100,600 L${f2(cx+40)},560 L${f2(cx+40)},800 L100,760Z`);
    // density ∝ −∂(dx)/∂x → compression where sin(ks·x−ws·t)=−1
    let xc=((ws*lt-Math.PI/2)/ks)%180;if(xc<0)xc+=180;while(xc<250)xc+=180;CX=xc}}});
/* ---------- SHOCK / DOPPLER (Mach) ---------- */
SM.items.shock=preset(1500,800,(g,it)=>{const k=it.kind||'supersonic';const M=it.mach??(k==='subsonic'?.6:k==='sonic'?1:2);const c=180,v=M*c,cy=400,TT=it.cycle||Math.max(3,1250/v),A={};const N=28,DT=.25;const cid='shc'+Math.round(rnd(M+3.3)*1e7);const cp=el('clipPath',{id:cid},DEFS);el('rect',{x:0,y:0,width:1500,height:740},cp);const g0=g;g=el('g',{'clip-path':`url(#${cid})`},g0);
  const rings=[...Array(N)].map(()=>el('circle',{fill:'none',stroke:TH.a1,'stroke-width':3},g));const cone=[el('line',{stroke:TH.a3,'stroke-width':5},g),el('line',{stroke:TH.a3,'stroke-width':5},g)];
  const jet=el('g',{},g);el('path',{d:'M40,0 L-30,-12 L-50,-34 L-60,-34 L-46,-10 L-70,-8 L-80,-22 L-88,-22 L-82,0 L-88,22 L-80,22 L-70,8 L-46,10 L-60,34 L-50,34 L-30,12 Z',fill:vol('#CFD8DC'),stroke:'#455A64','stroke-width':2},jet);
  const info=txt(g0,'',750,775,{size:30,color:'a2'});const th=M>1?Math.asin(1/M):0;
  Object.assign(A,{source:jet,wavefront:{el:rings[3],fx:.5,fy:0}});if(M>1)A.cone={el:cone[0],fx:.5,fy:.5};
  return {anchors:A,update(lt,p,st){const t=cyc(lt,st,TT,0)*TT;const x0=M>1?120:200;const xs=t2=>x0+v*Math.min(t2,TT);const X=xs(t);jet.setAttribute('transform',`translate(${f2(X)} ${cy})`);
    rings.forEach((r,i)=>{const te=t-(i+1)*DT;if(te<0||t-te>4.5){r.setAttribute('opacity',0);return}const R=c*(t-te);const ex=x0+v*te;at(r,{cx:f2(ex),cy,r:f2(R),opacity:f2(1-(t-te)/4.5)})});
    if(M>1){const L=Math.min(t,4.5)*Math.sqrt(v*v-c*c);/* tangent from the jet to the oldest still-drawn wavefront */cone.forEach((e,i)=>{const s=i?1:-1;at(e,{x1:f2(X),y1:cy,x2:f2(X-Math.cos(th)*L),y2:f2(cy+s*Math.sin(th)*L),opacity:L>20?1:0})})}else cone.forEach(e=>e.setAttribute('opacity',0));
    info.textContent=`M = v/c = ${M}`+(M>1?` · sin θ = 1/M → θ ≈ ${Math.round(th*180/Math.PI)}°`:M===1?T({uz:' · to‘lqinlar oldinda to‘planadi (tovush to‘sig‘i)',en:' · waves pile up (sound barrier)'}):T({uz:' · oldinda to‘lqinlar zich → ovoz balandroq (Doppler)',en:' · waves bunch up ahead → higher pitch (Doppler)'}))}}});
/* ---------- SPACE-TIME CURVATURE (rubber-sheet ANALOGY, always badged) ---------- */
SM.items.spacetime=preset(1500,900,(g,it)=>{const A={},cx=750,cy=430,TT=it.cycle||8;const mass=it.mass??1;const depth=r=>-260*mass/Math.sqrt(1+(r/120)**2);
  const proj=(x,z,y)=>{const s=900/(900+z);return [cx+x*s,cy+(y*-1+z*.0)*s*.9+z*.35*s]};const grid=el('g',{},g);const lines=[];
  for(let i=-10;i<=10;i++){lines.push(el('path',{fill:'none',stroke:TH.a1,'stroke-width':2,opacity:.55},grid));lines.push(el('path',{fill:'none',stroke:TH.a1,'stroke-width':2,opacity:.55},grid))}
  const star=el('g',{},g);el('circle',{r:90,fill:'#FFB300',filter:'url(#blur24)',opacity:.6},star);el('circle',{r:62,fill:vol('#FFCA28',{hi:.6}),stroke:'#FF8F00','stroke-width':3},star);
  const pl=el('circle',{r:24,fill:vol('#42A5F5'),stroke:'#0D47A1','stroke-width':2},g);const lp=el('path',{fill:'none',stroke:'#FFF59D','stroke-width':4,'stroke-dasharray':'12 8'},g);
  badge(g,40,40);txt(g,T({uz:'Haqiqatda fazo-vaqt 4 o‘lchamli. “Rezina choyshab” faqat tasavvur uchun model.',en:'Real space-time is 4-dimensional. The “rubber sheet” is only a picture to help imagine it.',ru:'Реальное пространство-время 4-мерно; «резиновый лист» — лишь модель.'}),750,880,{size:24,color:'dim',weight:600});
  Object.assign(A,{grid:[cx-500,cy+120],mass:[cx,cy+depth(0)*-.9-60],planet:[cx+300,cy],lightPath:[cx-600,cy-150]});
  return {anchors:A,update(lt,p,st){const m=E.outCubic(prog(lt,st+.5,st+2));const D=r=>depth(r)*m;let k=0;
    for(let i=-10;i<=10;i++){let d1='',d2='';for(let j=-10;j<=10;j+=.5){const x=i*60,z=j*40;const r=Math.hypot(x,z*1.5);const P=proj(x,z,D(r));d1+=(d1?' L':'M')+f2(P[0])+','+f2(P[1]);const x2=j*60,z2=i*40;const r2=Math.hypot(x2,z2*1.5);const Q=proj(x2,z2,D(r2));d2+=(d2?' L':'M')+f2(Q[0])+','+f2(Q[1])}
      lines[k++].setAttribute('d',d1);lines[k++].setAttribute('d',d2)}
    const S=proj(0,0,D(0)+60);star.setAttribute('transform',`translate(${f2(S[0])} ${f2(S[1])})`);const a=lt/TT*TAU,R=300;const px=Math.cos(a)*R,pz=Math.sin(a)*R/1.5;const P=proj(px,pz,D(R)+24);at(pl,{cx:f2(P[0]),cy:f2(P[1])});
    pl.parentNode.insertBefore(pl,Math.sin(a)<0?star:lp);A.planet=[P[0],P[1]];let d='';for(let x=-640;x<=640;x+=16){const z=-260;const r=Math.hypot(x,z*1.5);const bend=40*m*Math.exp(-((x/260)**2));const Q=proj(x,z+bend*3,D(r)+40);d+=(d?' L':'M')+f2(Q[0])+','+f2(Q[1])}lp.setAttribute('d',d)}}});
/* ---------- MATERIALS: rope | rigid | soft | fluid | gas ---------- */
const MK={rope:1,rigid:1,soft:1,fluid:1,gas:1};
const MN={rope:{uz:'Arqon: to‘lqin uchiga borib, teskari qaytadi',en:'Rope: a pulse travels and reflects inverted'},rigid:{uz:'Qattiq jism: nuqtalar orasidagi masofa o‘zgarmaydi',en:'Rigid body: distances between points never change'},soft:{uz:'Yumshoq jism: eziladi va qaytadi (elastik)',en:'Soft body: squashes and springs back (elastic)'},
  fluid:{uz:'Suyuqlik: idish shaklini oladi, hajmi o‘zgarmaydi',en:'Liquid: takes the shape of its container, keeps its volume'},gas:{uz:'Gaz: butun idishni to‘ldiradi, zarralar tez va tartibsiz harakatlanadi',en:'Gas: fills the whole container; particles move fast and randomly'}};
SM.items.material=preset(1400,820,(g,it)=>{const k=it.kind||'gas';if(!MK[k])SERR.push(`material: kind "${k}" → ${Object.keys(MK).join(', ')}`);const A={};txt(g,T(MN[k]||{uz:k}),700,800,{size:28,color:'a2'});let up=()=>{};
  if(k==='rope'){const x0=120,x1=1280,y=400,L=x1-x0,vv=420,TT=(2*L)/vv+1;el('rect',{x:x1,y:y-160,width:40,height:320,fill:'#78909C'},g);const hand=el('circle',{r:26,fill:vol(NAT.skin2)},g);
    const rope=el('path',{fill:'none',stroke:'#8D6E63','stroke-width':16,'stroke-linecap':'round'},g),rope2=el('path',{fill:'none',stroke:'#D7CCC8','stroke-width':4,'stroke-dasharray':'10 12'},g);
    const gp=s=>140*Math.exp(-((s/70)**2));A.source=[x0,y-40];up=(lt,st)=>{const t=cyc(lt,st,TT,.5)*TT;let d='';for(let x=x0;x<=x1;x+=8){const s=x-x0;const yy=gp(s-vv*t+0)-gp((2*L-s)-vv*t);d+=(d?' L':'M')+x+','+f2(y-yy)}rope.setAttribute('d',d);rope2.setAttribute('d',d);at(hand,{cx:x0,cy:f2(y-gp(-vv*t))})}}
  if(k==='rigid'){const piv=[700,170];const pts=[];for(let i=0;i<=6;i++)for(let j=0;j<=1;j++)pts.push([-40+j*80,40+i*80]);const G=el('g',{},g);el('rect',{x:-50,y:20,width:100,height:530,rx:16,fill:vol('#90A4AE'),stroke:'#37474F','stroke-width':4},G);
    for(let i=0;i<6;i++){el('line',{x1:-40,y1:40+i*80,x2:40,y2:120+i*80,stroke:'#263238','stroke-width':2,opacity:.6},G);el('line',{x1:-40,y1:120+i*80,x2:40,y2:120+i*80,stroke:'#263238','stroke-width':2,opacity:.6},G)}pts.forEach(([x,y])=>el('circle',{cx:x,cy:y,r:8,fill:'#FFCA28'},G));
    el('circle',{cx:piv[0],cy:piv[1],r:16,fill:'#263238'},g);A.pivotP=piv;up=(lt,st)=>{const t=Math.max(0,lt-st-.5);const a=50*Math.exp(-.12*t)*Math.cos(1.9*t);G.setAttribute('transform',`translate(${piv[0]} ${piv[1]}) rotate(${f2(a)})`)}}
  if(k==='soft'){const N=6,S=60,FY=700,TT=4;const sim=KIT.sim(TT,120,()=>{const P=[];for(let i=0;i<N;i++)for(let j=0;j<N;j++)P.push({x:550+i*S,y:120+j*S,vx:0,vy:0});return P},(P,dt)=>{const kS=900,damp=2.2,gr=900;const F=P.map(()=>[0,gr]);
      const link=(a,b,L)=>{const p=P[a],q=P[b];const dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy)||1;const f=kS*(d-L)/d;F[a][0]+=f*dx;F[a][1]+=f*dy;F[b][0]-=f*dx;F[b][1]-=f*dy};
      for(let i=0;i<N;i++)for(let j=0;j<N;j++){const a=i*N+j;if(i<N-1)link(a,a+N,S);if(j<N-1)link(a,a+1,S);if(i<N-1&&j<N-1){link(a,a+N+1,S*Math.SQRT2);link(a+1,a+N,S*Math.SQRT2)}}
      return P.map((p,i)=>{let vx=(p.vx+F[i][0]*dt)*(1-damp*dt),vy=(p.vy+F[i][1]*dt)*(1-damp*dt);let x=p.x+vx*dt,y=p.y+vy*dt;if(y>FY){y=FY;vy=-vy*.3;vx*=.8}return {x,y,vx,vy}})});
    el('rect',{x:200,y:FY,width:1000,height:16,fill:TH.dim},g);const body=el('path',{fill:vol('#EC407A',{hi:.4}),'fill-opacity':.85,stroke:'#AD1457','stroke-width':4},g);const mesh=el('path',{fill:'none',stroke:'#F8BBD0','stroke-width':1.5,opacity:.8},g);
    up=(lt,st)=>{const {a,b,f}=sim(cyc(lt,st,TT,0)*TT);const P=a.map((p,i)=>[lerp(p.x,b[i].x,f),lerp(p.y,b[i].y,f)]);const id=(i,j)=>P[i*N+j];const ring=[];for(let i=0;i<N;i++)ring.push(id(i,0));for(let j=1;j<N;j++)ring.push(id(N-1,j));for(let i=N-2;i>=0;i--)ring.push(id(i,N-1));for(let j=N-2;j>0;j--)ring.push(id(0,j));
      body.setAttribute('d',smoothClosed(ring));let d='';for(let i=0;i<N;i++){d+='M'+P.slice(i*N,i*N+N).map(p=>f2(p[0])+','+f2(p[1])).join(' L')}for(let j=0;j<N;j++){d+=' M'+[...Array(N)].map((_,i)=>id(i,j)).map(p=>f2(p[0])+','+f2(p[1])).join(' L')}mesh.setAttribute('d',d)}}
  if(k==='fluid'){const n=150,TT=6,W0=420,W1=980,FY=720;const sim=KIT.sim(TT,60,()=>[...Array(n)].map((_,i)=>({x:640+(i%10)*12+(Math.floor(i/10)%2)*6,y:-40-Math.floor(i/10)*26,vx:0,vy:0})),(P,dt)=>{const R=26,gr=1400;
      return P.map((p,i)=>{let ax=0,ay=gr;for(let j=0;j<n;j++){if(j===i)continue;const q=P[j];const dx=p.x-q.x,dy=p.y-q.y;const d2=dx*dx+dy*dy;if(d2<R*R&&d2>1e-4){const d=Math.sqrt(d2),f=(R-d)/R*5200;ax+=dx/d*f;ay+=dy/d*f}}
        let vx=(p.vx+ax*dt)*.985,vy=(p.vy+ay*dt)*.985;let x=p.x+vx*dt,y=p.y+vy*dt;if(y>FY-12){y=FY-12;vy=-vy*.2}if(y>360&&x<W0+12){x=W0+12;vx=-vx*.3}if(y>360&&x>W1-12){x=W1-12;vx=-vx*.3}return {x,y,vx,vy}})});
    const fid='goo'+Math.round(rnd(9.1)*1e6);const fl=el('filter',{id:fid},DEFS);el('feGaussianBlur',{in:'SourceGraphic',stdDeviation:9,result:'b'},fl);el('feColorMatrix',{in:'b',mode:'matrix',values:'1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10'},fl);
    el('path',{d:`M${W0},360 L${W0},${FY} L${W1},${FY} L${W1},360`,fill:'#B3E5FC',opacity:.12,stroke:'#B3E5FC','stroke-width':8},g);const G=el('g',{filter:`url(#${fid})`},g);const D=[...Array(n)].map(()=>el('circle',{r:16,fill:'#29B6F6'},G));
    up=(lt,st)=>{const {a,b,f}=sim(cyc(lt,st,TT+2,0)*(TT+2));a.forEach((p,i)=>at(D[i],{cx:f2(lerp(p.x,b[i].x,f)),cy:f2(lerp(p.y,b[i].y,f))}))}}
  if(k==='gas'){const x0=300,y0=150,W=800,H=520;el('rect',{x:x0,y:y0,width:W,height:H,fill:'none',stroke:'#B0BEC5','stroke-width':8,rx:8},g);const n=it.particles||70;
    const P=[...Array(n)].map((_,i)=>{const sp=160+seeded(i,3)*260,a=seeded(i,4)*TAU;return {x:seeded(i,1)*W,y:seeded(i,2)*H,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,e:el('circle',{r:11,fill:mix('#4FC3F7','#FF7043',clamp((sp-160)/260))},g)}});
    const tri=(s,L)=>{const m=((s%(2*L))+2*L)%(2*L);return m<L?m:2*L-m};up=lt=>P.forEach(p=>at(p.e,{cx:f2(x0+11+tri(p.x+p.vx*lt,W-22)),cy:f2(y0+11+tri(p.y+p.vy*lt,H-22))}))}
  return {anchors:A,update(lt,p,st){up(lt,st)}}});
KIT.bind();
})();
