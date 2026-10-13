/* ---------- ATOM (Bohr model, orbiting electrons) ---------- */
const ELEM={H:1,He:2,Li:3,Be:4,B:5,C:6,N:7,O:8,F:9,Ne:10,Na:11,Mg:12,Al:13,Si:14,P:15,S:16,Cl:17,Ar:18,K:19,Ca:20};
function shellsOf(Z){const cap=[2,8,8,18,18,32],out=[];let r=Z;for(const c of cap){if(r<=0)break;out.push(Math.min(c,r));r-=c}return out}
SM.items.atom=preset(800,800,(g,it)=>{const cx=400,cy=400;const Z=it.Z||ELEM[it.symbol]||6;const sh=it.shells||shellsOf(Z);const N=Math.round(it.neutrons??Z*1.1);
  const rmax=360,r0=110;const rings=sh.map((_,k)=>r0+(rmax-r0)*(sh.length===1?.5:k/(sh.length-1)));
  rings.forEach(r=>dr(el('circle',{cx,cy,r,fill:'none',stroke:TH.a1,'stroke-width':3,'stroke-opacity':.45},g)));
  const nuc=el('g',{filter:'url(#glowS)'},g);const n=Math.min(Z+N,40);for(let k=0;k<n;k++){const a=k*2.399,rr=Math.sqrt(k+.5)*10.5;el('circle',{cx:cx+Math.cos(a)*rr,cy:cy+Math.sin(a)*rr,r:13,fill:k%2?TH.a3:TH.dim,stroke:TH.bg,'stroke-width':2},nuc)}
  if(it.symbol){const t=el('text',{x:cx,y:cy+22,'text-anchor':'middle','font-size':62,'font-weight':800,'font-family':FONT,fill:'#fff',stroke:TH.bg,'stroke-width':6,'paint-order':'stroke'},g);t.textContent=it.symbol}
  const es=[];sh.forEach((c,k)=>{for(let j=0;j<c;j++)es.push({k,j,c,e:el('circle',{r:14,fill:TH.a2,filter:'url(#glowS)'},g)})});
  return {anchors:{nucleusAtom:[cx-60,cy+50],electron:[cx+rings[rings.length-1],cy],shell:[cx,cy-rings[Math.max(0,rings.length-2)]]},update(lt){es.forEach(o=>{const w=(it.speed??1)*1.6/(o.k+1)**.8,a=o.j/o.c*TAU+lt*w+o.k*.7;at(o.e,{cx:f2(cx+Math.cos(a)*rings[o.k]),cy:f2(cy+Math.sin(a)*rings[o.k])})})}}});
/* ---------- MOLECULES (ball & stick, CPK colours) ---------- */
const CPK={H:['#F2F4F8',26],C:['#8A93A6',38],O:['#FF4D4D',36],N:['#4D7CFF',36],Cl:['#3DDC84',42],Na:['#B07CFF',44],S:['#FFD23F',42],P:['#FF9A3D',42],F:['#9BE564',30],K:['#8F5CFF',48],Ca:['#7A8B99',46]};
const MOL={H2:{a:[['H',-.5,0],['H',.5,0]],b:[[0,1,1]]},O2:{a:[['O',-.6,0],['O',.6,0]],b:[[0,1,2]]},N2:{a:[['N',-.6,0],['N',.6,0]],b:[[0,1,3]]},Cl2:{a:[['Cl',-.7,0],['Cl',.7,0]],b:[[0,1,1]]},HCl:{a:[['H',-.6,0],['Cl',.6,0]],b:[[0,1,1]]},
  H2O:{a:[['O',0,0],['H',-.8,.6],['H',.8,.6]],b:[[0,1,1],[0,2,1]]},CO2:{a:[['C',0,0],['O',-1.2,0],['O',1.2,0]],b:[[0,1,2],[0,2,2]]},CO:{a:[['C',-.6,0],['O',.6,0]],b:[[0,1,3]]},
  NH3:{a:[['N',0,0],['H',-.85,.55],['H',.85,.55],['H',0,-1]],b:[[0,1,1],[0,2,1],[0,3,1]]},CH4:{a:[['C',0,0],['H',-.9,-.9],['H',.9,-.9],['H',-.9,.9],['H',.9,.9]],b:[[0,1,1],[0,2,1],[0,3,1],[0,4,1]]},
  C2H5OH:{a:[['C',-1.2,0],['C',0,0],['O',1.2,0],['H',1.8,.7],['H',-1.6,-.9],['H',-1.9,.6],['H',-1.0,1],['H',0,-1.05],['H',.1,1.05]],b:[[0,1,1],[1,2,1],[2,3,1],[0,4,1],[0,5,1],[0,6,1],[1,7,1],[1,8,1]]},
  C6H6:{a:[...[...Array(6)].map((_,k)=>['C',Math.cos(k/6*TAU+Math.PI/6)*1.2,Math.sin(k/6*TAU+Math.PI/6)*1.2]),...[...Array(6)].map((_,k)=>['H',Math.cos(k/6*TAU+Math.PI/6)*2.2,Math.sin(k/6*TAU+Math.PI/6)*2.2])],b:[...[...Array(6)].map((_,k)=>[k,(k+1)%6,k%2?1:2]),...[...Array(6)].map((_,k)=>[k,k+6,1])]},
  NaCl:{a:(()=>{const o=[];for(let i=0;i<4;i++)for(let j=0;j<4;j++)o.push([(i+j)%2?'Cl':'Na',(i-1.5)*1.1,(j-1.5)*1.1]);return o})(),b:(()=>{const o=[];for(let i=0;i<4;i++)for(let j=0;j<4;j++){if(i<3)o.push([i*4+j,(i+1)*4+j,0]);if(j<3)o.push([i*4+j,i*4+j+1,0])}return o})()},
  H2SO4:{a:[['S',0,0],['O',0,-1.2],['O',0,1.2],['O',-1.2,0],['O',1.2,0],['H',-2,0],['H',2,0]],b:[[0,1,2],[0,2,2],[0,3,1],[0,4,1],[3,5,1],[4,6,1]]}};
function drawMol(g,spec,U=100,{letters=true}={}){const m=typeof spec==='string'?MOL[spec]:spec;if(!m){SERR.push('molecule: unknown preset "'+spec+'". Presets: '+Object.keys(MOL).join(', '));return {w:100,h:100,atoms:[]}}
  const A=m.a||m.atoms,B=m.b||m.bonds||[];const xs=A.map(a=>a[1]),ys=A.map(a=>a[2]);const pad=.9;const minx=Math.min(...xs)-pad,miny=Math.min(...ys)-pad;const w=(Math.max(...xs)+pad-minx)*U,h=(Math.max(...ys)+pad-miny)*U;
  const P=A.map(a=>[(a[1]-minx)*U,(a[2]-miny)*U]);const bg=el('g',{},g);
  B.forEach(([i,j,o])=>{const [x1,y1]=P[i],[x2,y2]=P[j];const L=Math.hypot(x2-x1,y2-y1)||1,nx=-(y2-y1)/L,ny=(x2-x1)/L;const offs=o===0?[0]:o===2?[-7,7]:o===3?[-11,0,11]:[0];
    offs.forEach(d=>dr(el('line',{x1:f2(x1+nx*d),y1:f2(y1+ny*d),x2:f2(x2+nx*d),y2:f2(y2+ny*d),stroke:o===0?TH.dim:TH.ink,'stroke-opacity':o===0?.4:.8,'stroke-width':o===0?3:6,'stroke-linecap':'round','stroke-dasharray':o===0?'6 8':undefined},bg)))});
  const atoms=A.map((a,k)=>{const [c,r]=CPK[a[0]]||['#ccc',36];const gr=gradient([[0,'#ffffff',.95],[.35,c,1],[1,c,1]],{radial:true});const ag=el('g',{},g);
    el('circle',{cx:f2(P[k][0]),cy:f2(P[k][1]),r:r*U/100,fill:gr,stroke:TH.bg,'stroke-width':3},ag);
    if(letters){const t=el('text',{x:f2(P[k][0]),y:f2(P[k][1]+r*U/100*.36),'text-anchor':'middle','font-size':f2(r*U/100*.95),'font-weight':800,'font-family':FONT,fill:a[0]==='H'?'#1b1b22':'#fff'},ag);t.textContent=a[0]}return ag});
  return {w,h,P,atoms,A}}
SM.items.molecule={build(it){const box=boxOf(it);const m=typeof it.preset==='string'||!it.atoms?it.preset||'H2O':{a:it.atoms,b:it.bonds};const g=el('g');const probe=el('g');const M=drawMol(probe,m,100,it);
  let inner=box;const names=(it.labels||[]);if(names.length){const mw=Math.min(box[2]*.28,Math.max(...names.map(l=>tw(l.text||'',28*SU)))+70*SU);inner=[box[0]+mw,box[1],box[2]-2*mw,box[3]]}
  const F=fitIn(inner,M.w,M.h,10*SU);const gi=el('g',{transform:`translate(${f2(F.x)} ${f2(F.y)}) scale(${f2(Math.min(F.s,it.maxScale||2.2))})`},g);const sc=Math.min(F.s,it.maxScale||2.2);
  const ox=F.cx-M.w*sc/2,oy=F.cy-M.h*sc/2;gi.setAttribute('transform',`translate(${f2(ox)} ${f2(oy)}) scale(${f2(sc)})`);while(probe.firstChild)gi.appendChild(probe.firstChild);
  let upL=null;if(names.length){upL=placeLabels(g,names.map(l=>({x:ox+M.P[l.atom||0][0]*sc,y:oy+M.P[l.atom||0][1]*sc,text:l.text,color:l.color})),[ox,oy,M.w*sc,M.h*sc],{start:0})}
  if(it.formula){const fb=mathBox(it.formula,48*SU,{chem:true});const fg=el('g',{transform:`translate(${f2(F.cx-fb.w/2)} ${f2(Math.min(box[1]+box[3]-10*SU,oy+M.h*sc+70*SU))})`},g);fb.draw(fg,0,0,TH.ink)}
  return {g,update(lt,p,st){const w=it.wobble===false?0:1;gi.setAttribute('transform',`translate(${f2(ox)} ${f2(oy)}) rotate(${f2(w*Math.sin(lt*.8)*3)} ${f2(M.w/2)} ${f2(M.h/2)}) scale(${f2(sc)})`);upL&&upL(lt-st-(it.dur||1)-.2)}}}};
/* ---------- REACTION: reactant molecules collide → products appear ---------- */
SM.items.reaction={build(it){const box=boxOf(it);const g=el('g');const [x,y,w,h]=box;const dflt=!it.left&&!it.right;const L=[].concat(it.left||(dflt?['2 H2','O2']:[])),R=[].concat(it.right||(dflt?['2 H2O']:[]));
  const parse=s=>{const m=String(s).match(/^(\d*)\s*(.+)$/);return {n:+m[1]||1,f:m[2]}};const Lp=L.map(parse),Rp=R.map(parse);
  const U=it.molSize?it.molSize*SU:Math.min(105*SU,h*.2);const side=(list,x0,x1)=>{const items=[];list.forEach(o=>{for(let k=0;k<Math.min(o.n,3);k++)items.push(o.f)});const gs=items.map(f=>{const gg=el('g',{},g);const M=drawMol(gg,f,U);return {gg,M}});
    const tot=gs.reduce((a,b)=>a+b.M.w,0)+(gs.length-1)*30*SU;const sc=Math.min(1,(x1-x0)/tot);let cx=(x0+x1)/2-tot*sc/2;gs.forEach(o=>{o.x=cx;o.y=y+h*.42-o.M.h*sc/2;o.sc=sc;cx+=(o.M.w+30*SU)*sc});return gs};
  const GL=side(Lp,x,x+w*.4),GR=side(Rp,x+w*.6,x+w);const ar=dr(el('path',{d:`M${f2(x+w*.43)},${f2(y+h*.42)} L${f2(x+w*.57)},${f2(y+h*.42)}`,stroke:TH.ink,'stroke-width':f2(5*SU),'marker-end':arrowMarker('ink'),fill:'none'},g));
  const eq=it.equation||`${L.join(' + ')} \\rightarrow ${R.join(' + ')}`.replace(/([A-Z][a-z]?)(\d+)/g,'$1_{$2}');const fb=mathBox(eq,(it.size||64)*SU,{chem:true});const fg=el('g',{transform:`translate(${f2(x+w/2-fb.w/2)} ${f2(y+h*.86)})`},g);fb.draw(fg,0,0,TH.ink);
  if(it.condition){const t=textEl(g,it.condition,x+w/2,y+h*.42-26*SU,{anchor:'middle',size:26*SU,color:'a2'})}
  const flash=el('circle',{cx:x+w/2,cy:y+h*.42,r:120*SU,fill:TH.a2,filter:'url(#blur24)',opacity:0},g);
  return {g,update(lt,p,st){const t1=st+.8,t2=t1+1.2;GL.forEach((o,i)=>{const q=E.inCubic(prog(lt,t1,t2)),cxm=x+w/2-o.M.w*o.sc/2;const sh=Math.sin(lt*30+i)*3*SU*prog(lt,t1-.3,t1);
      o.gg.setAttribute('transform',`translate(${f2(lerp(o.x,cxm,q)+sh)} ${f2(o.y)}) scale(${f2(o.sc*(1-q*.4))})`);o.gg.setAttribute('opacity',f2(1-prog(lt,t2-.3,t2)*(it.keep?0:.0)-0))});
    GL.forEach(o=>{if(lt<t2){o.gg.setAttribute('opacity',1);return}const q2=E.outCubic(prog(lt,t2+.5,t2+1.3));if(it.keep===false||q2<=0){o.gg.setAttribute('opacity',0);return}o.gg.setAttribute('transform',`translate(${f2(o.x)} ${f2(o.y)}) scale(${f2(o.sc)})`);o.gg.setAttribute('opacity',f2(.35*q2))});flash.setAttribute('opacity',f2(Math.max(0,1-Math.abs(lt-t2)/.35)*.8));
    GR.forEach((o,i)=>{const q=E.outBack(prog(lt,t2+i*.12,t2+.6+i*.12));o.gg.setAttribute('transform',`translate(${f2(o.x)} ${f2(o.y+(1-q)*30*SU)}) scale(${f2(o.sc*Math.max(.001,q))})`);o.gg.setAttribute('opacity',f2(prog(lt,t2+i*.12,t2+.2+i*.12)))});
    ar.style.strokeDashoffset=f2(1-E.inOutCubic(prog(lt,st,st+.8)))},noDraw:true}}};
/* ---------- HEART (schematic, 4 chambers, blood flow, beating) ---------- */
SM.items.heart=preset(900,900,(g,it)=>{const B=TH.a1==='#FFFFFF'?'#7FB8FF':'#4D8DFF',Rr=TH.a3;
  const vessel=(d,c,w)=>dr(el('path',{d,fill:'none',stroke:c,'stroke-width':w,'stroke-linecap':'round','stroke-opacity':.85},g));
  vessel('M255,40 L262,300',B,50);vessel('M200,860 C210,700 230,560 250,440',B,50);vessel('M520,330 C520,150 520,90 610,80 C700,72 735,140 735,330',Rr,56);
  vessel('M390,380 C390,250 410,190 430,160 M430,160 C380,120 300,120 230,150 M430,160 C500,140 560,160 600,190',B,44);vessel('M890,280 L700,320 M890,370 L700,350',Rr,30);
  const hb=el('g',{},g);
  dr(el('path',{d:'M450,840 C230,700 120,560 130,400 C140,260 250,200 340,215 C400,225 440,250 450,285 C470,240 520,215 580,210 C690,205 780,280 775,420 C770,580 650,720 450,840 Z',fill:TH.bg2,'fill-opacity':.9,stroke:TH.a3,'stroke-width':8},hb));
  const ch=(cx,cy,rx,ry,c,sw=4)=>dr(el('ellipse',{cx,cy,rx,ry,fill:c,'fill-opacity':.3,stroke:c,'stroke-width':sw},hb));
  ch(285,345,105,85,B);ch(615,335,105,80,Rr);ch(315,585,115,150,B);ch(595,600,120,175,Rr,14);
  dr(el('path',{d:'M455,290 C475,420 465,600 475,800',fill:'none',stroke:TH.ink,'stroke-opacity':.6,'stroke-width':10,'stroke-linecap':'round'},hb));
  [[290,445],[600,440]].forEach(([x,y])=>{el('path',{d:`M${x-40},${y} Q${x-20},${y+28} ${x},${y} Q${x+20},${y+28} ${x+40},${y}`,fill:'none',stroke:TH.a2,'stroke-width':6,'stroke-linecap':'round'},hb)});
  const pb=el('path',{d:'M262,60 L270,320 C290,420 300,520 330,660 C360,560 380,420 395,330 L410,200 L430,160 L300,130',fill:'none'},g),pr=el('path',{d:'M880,300 L660,330 C620,420 600,520 600,700 C580,560 540,420 525,330 L520,150 C530,90 600,75 660,85 C720,100 735,200 735,330',fill:'none'},g);
  const fb=flowDots(g,pb,{color:B,n:14,speed:.22,size:9}),fr=flowDots(g,pr,{color:Rr,n:14,speed:.22,size:9});
  return {anchors:{ra:[240,330],la:[660,320],rv:[300,640],lv:[620,660],aorta:[615,82],pulmonary:[300,128],vena:[255,90],pveins:[820,330],septum:[468,560],valve:[600,445]},
    update(lt,p,st){const bpm=it.bpm||70,ph=(lt*bpm/60)%1,beat=1+.035*Math.exp(-(((ph-.08)*14)**2))+.02*Math.exp(-(((ph-.3)*14)**2));hb.setAttribute('transform',`translate(450 470) scale(${f2(beat)}) translate(-450 -470)`);
      if(it.flow!==false){fb(lt,lt>st+1?1:0);fr(lt,lt>st+1?1:0)}}}});
/* ---------- BLOOD VESSEL with flowing red cells ---------- */
SM.items.vessel=preset(1500,420,(g,it)=>{dr(el('path',{d:'M0,90 C400,60 1100,120 1500,90',fill:'none',stroke:TH.a3,'stroke-width':14},g));dr(el('path',{d:'M0,330 C400,360 1100,300 1500,330',fill:'none',stroke:TH.a3,'stroke-width':14},g));
  el('rect',{x:0,y:100,width:1500,height:220,fill:TH.a3,'fill-opacity':.08},g);const vid='vsl'+(SM._vsl=(SM._vsl||0)+1);el('rect',{x:0,y:0,width:1500,height:420},el('clipPath',{id:vid},DEFS));const cg=el('g',{'clip-path':`url(#${vid})`},g);const cells=[...Array(it.cells||22)].map((_,i)=>{const c=el('g',{},cg);el('ellipse',{rx:38,ry:24,fill:TH.a3,'fill-opacity':.9},c);el('ellipse',{rx:16,ry:8,fill:'#000','fill-opacity':.25},c);return c});
  return {anchors:{vessel:[750,80]},update(lt){cells.forEach((c,i)=>{const sp=(it.speed||1)*(140+seeded(i,1)*90),x=((seeded(i,2)*1700+lt*sp)%1700)-100,y=150+seeded(i,3)*120+Math.sin(lt*2+i)*8;c.setAttribute('transform',`translate(${f2(x)} ${f2(y)}) rotate(${f2(Math.sin(lt+i)*25)})`)})}}});
