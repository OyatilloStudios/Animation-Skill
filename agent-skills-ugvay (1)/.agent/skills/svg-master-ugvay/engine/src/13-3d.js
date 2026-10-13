// ===== 13-3d.js — pseudo-3D engine (pure SVG): projection, view keyframes, spin, depth sort, shaded spheres =====
// common keys: yaw (deg, default -30), pitch (deg, default 18), spin (deg/s), view:[{t,dur,yaw,pitch,zoom}], persp (camera distance, 0=orthographic), zoom
const D2R=Math.PI/180;
function view3(it,box,Rm,{yaw=-30,pitch=18,spin=0}={}){const [bx,by,bw,bh]=box;const cx=bx+bw/2,cy=by+bh/2+(it.dy||0)*SU;const base=Math.min(bw,bh)*.42/(Rm||1);
  return (lt,st)=>{let Y=it.yaw??yaw,P=it.pitch??pitch,Z=it.zoom??1;(it.view||[]).forEach(k=>{const t0=(k.t??k.at??0),d=k.dur??1.5;const u=E.inOutCubic(prog(lt-st,t0,t0+d));if(k.yaw!=null)Y=lerp(Y,k.yaw,u);if(k.pitch!=null)P=lerp(P,k.pitch,u);if(k.zoom!=null)Z=lerp(Z,k.zoom,u)});
    Y+=(it.spin??spin)*(lt-st);const cY=Math.cos(Y*D2R),sY=Math.sin(Y*D2R),cP=Math.cos(P*D2R),sP=Math.sin(P*D2R);const D=(it.persp??6)*(Rm||1);const s=base*Z;
    const rot=([x,y,z])=>{const x1=x*cY+z*sY,z1=-x*sY+z*cY;return [x1,y*cP-z1*sP,y*sP+z1*cP]};
    const pr=v=>{const [x,y,z]=rot(v);const f=D>0?D/(D-z):1;return [cx+x*s*f,cy-y*s*f,z,f*s]};return {pr,rot,s,cx,cy,Y,P}}}
const SPH={};function sphereFill(c){c=col(c);if(SPH[c])return SPH[c];const id='sph'+Object.keys(SPH).length+'_'+Math.round(rnd(Object.keys(SPH).length+3.3)*1e6);const g=el('radialGradient',{id,cx:'36%',cy:'32%',r:'72%',fx:'30%',fy:'26%'},DEFS);
  [[0,'#ffffff',.95],[.18,mixColor(c,'#ffffff',.35),1],[.55,c,1],[1,mixColor(c,'#000000',.62),1]].forEach(([o,cc,a])=>el('stop',{offset:o,'stop-color':cc,'stop-opacity':a},g));return SPH[c]=`url(#${id})`}
const hexOf=c=>{c=col(c);if(c[0]==='#')return c.length===4?'#'+[1,2,3].map(i=>c[i]+c[i]).join(''):c;const m=c.match(/\d+/g);return m?'#'+m.slice(0,3).map(v=>(+v).toString(16).padStart(2,'0')).join(''):'#888888'};
const shade=(c,b)=>b>=.5?mixColor(hexOf(c),'#ffffff',(b-.5)*.7):mixColor(hexOf(c),'#000000',(.5-b)*1.3);
const LIGHT=(()=>{const v=[-.45,.65,.62];const n=Math.hypot(...v);return v.map(x=>x/n)})();
const sub2=s=>String(s).replace(/(\d+)/g,m=>[...m].map(d=>'₀₁₂₃₄₅₆₇₈₉'[d]).join(''));
function depthSort(parent,prims){prims.sort((a,b)=>a.z-b.z);prims.forEach(p=>parent.appendChild(p.el))}
function tag3(g,text,{size=28,color='ink',weight=800}={}){const t=el('text',{'text-anchor':'middle','font-size':f2(size*SU),'font-family':FONT,'font-weight':weight,fill:col(color),'paint-order':'stroke',stroke:TH.bg,'stroke-width':f2(5*SU),'stroke-linejoin':'round'},g);t.textContent=text;return t}

// ---------- mol3d ----------
const CPK3={H:['#F2F4F8',.31,1.1],C:['#5C6578',.76,1.7],O:['#FF4D4D',.66,1.52],N:['#4F7BFF',.71,1.55],Cl:['#3FD46B',1.0,1.75],S:['#FFD23F',1.05,1.8],P:['#FF9A3C',1.07,1.8],Na:['#A26BFF',1.66,2.27],F:['#9BE564',.57,1.47],Br:['#B5523B',1.2,1.85],K:['#8F40D4',2.03,2.75],Ca:['#3DFF8F',1.76,2.31],Fe:['#E07A3A',1.32,2.0],Mg:['#8AFF00',1.41,1.73],I:['#940094',1.39,1.98]};
const MOL3={H2O:{a:[['O',0,.12,0],['H',.757,-.47,0],['H',-.757,-.47,0]],name:'Suv'},
  CO2:{a:[['C',0,0,0],['O',-1.16,0,0],['O',1.16,0,0]],ord:{'0-1':2,'0-2':2},name:'Karbonat angidrid'},
  CH4:{a:[['C',0,0,0],['H',.629,.629,.629],['H',-.629,-.629,.629],['H',-.629,.629,-.629],['H',.629,-.629,-.629]],name:'Metan'},
  NH3:{a:[['N',0,.27,0],['H',.94,-.1,0],['H',-.47,-.1,.814],['H',-.47,-.1,-.814]],name:'Ammiak'},
  C2H4:{a:[['C',-.667,0,0],['C',.667,0,0],['H',-1.23,.92,0],['H',-1.23,-.92,0],['H',1.23,.92,0],['H',1.23,-.92,0]],ord:{'0-1':2},name:'Etilen'},
  C2H2:{a:[['C',-.6,0,0],['C',.6,0,0],['H',-1.66,0,0],['H',1.66,0,0]],ord:{'0-1':3},name:'Atsetilen'},
  C6H6:{a:(()=>{const a=[];for(let i=0;i<6;i++){const t=i*60*D2R;a.push(['C',1.39*Math.cos(t),1.39*Math.sin(t),0])}for(let i=0;i<6;i++){const t=i*60*D2R;a.push(['H',2.47*Math.cos(t),2.47*Math.sin(t),0])}return a})(),ord:{'0-1':2,'2-3':2,'4-5':2},name:'Benzol'},
  H2:{a:[['H',-.37,0,0],['H',.37,0,0]],name:'Vodorod'},O2:{a:[['O',-.6,0,0],['O',.6,0,0]],ord:{'0-1':2},name:'Kislorod'},N2:{a:[['N',-.55,0,0],['N',.55,0,0]],ord:{'0-1':3},name:'Azot'},
  HCl:{a:[['H',-.64,0,0],['Cl',.64,0,0]],name:'Vodorod xlorid'},Cl2:{a:[['Cl',-1,0,0],['Cl',1,0,0]],name:'Xlor'},
  C2H5OH:{a:[['C',-1.2,-.35,0],['C',.05,.5,0],['O',1.2,-.3,0],['H',1.95,.3,0],['H',-2.1,.25,0],['H',-1.2,-1,.88],['H',-1.2,-1,-.88],['H',.05,1.15,.88],['H',.05,1.15,-.88]],name:'Etil spirti'},
  CH3OH:{a:[['C',-.7,0,0],['O',.7,0,0],['H',1.05,.88,0],['H',-1.05,.52,.9],['H',-1.05,.52,-.9],['H',-1.05,-1.02,0]],name:'Metanol'},
  H2SO4:{a:[['S',0,0,0],['O',0,1.43,0],['O',0,-.6,1.3],['O',1.25,-.6,-.6],['O',-1.25,-.6,-.6],['H',1.6,-1.4,-.4],['H',-1.6,-1.4,-.4]],ord:{'0-1':2,'0-2':2},name:'Sulfat kislota'},
  C6H12O6:{a:(()=>{const a=[];const ring=[['O',0],['C',60],['C',120],['C',180],['C',240],['C',300]];ring.forEach(([e,d],i)=>a.push([e,1.45*Math.cos(d*D2R),(i%2?.25:-.25),1.45*Math.sin(d*D2R)]));[[1,1],[2,-1],[3,1],[4,-1]].forEach(([i,s])=>{const [_,x,y,z]=a[i];a.push(['O',x*1.75,y+s*1.2,z*1.75])});const c5=a[5];a.push(['C',c5[1]*1.9,c5[2]+.8,c5[3]*1.9]);a.push(['O',c5[1]*2.6,c5[2]+1.6,c5[3]*2.2]);return a})(),name:'Glyukoza'}};
SM.items.mol3d={build(it){const g=el('g');const B=boxOf(it);let P=MOL3[it.preset||it.formula||'H2O'];if(it.atoms)P={a:it.atoms,ord:it.orders||{},name:it.name};if(!P){SERR.push(`mol3d: unknown preset "${it.preset}" → ${Object.keys(MOL3).join(', ')}`);P=MOL3.H2O}
  const A=P.a.map(([e,x,y,z])=>({e,p:[x,y,z],c:(CPK3[e]||['#C9C9C9',.8,1.6])}));const fill=it.style==='fill'||it.style==='spacefill';
  const cen=[0,1,2].map(k=>A.reduce((s,a)=>s+a.p[k],0)/A.length);A.forEach(a=>a.p=a.p.map((v,k)=>v-cen[k]));
  const Rm=Math.max(1.2,...A.map(a=>Math.hypot(...a.p)+(fill?a.c[2]*.75:a.c[1]*.6)));const V=view3(it,[B[0],B[1],B[2],B[3]-(it.name!==false?60*SU:0)],Rm,{spin:it.spin??24});
  const bonds=[];const ORD={...(P.ord||{}),...(it.orders||{})};if(!fill)for(let i=0;i<A.length;i++)for(let j=i+1;j<A.length;j++){const d=Math.hypot(...[0,1,2].map(k=>A[i].p[k]-A[j].p[k]));const lim=(A[i].c[1]+A[j].c[1])*1.22;if(d<lim&&!(A[i].e==='H'&&A[j].e==='H'&&A.length>2)){const o=ORD[i+'-'+j]||ORD[j+'-'+i]||1;bonds.push({i,j,o,els:[]})}}
  const lay=el('g',{},g);const prims=[];const bw=(it.bond||.16);
  bonds.forEach(b=>{for(let k=0;k<b.o;k++)for(let h=0;h<2;h++){const l=el('line',{'stroke-linecap':'round',stroke:shade(A[h?b.j:b.i].c[0],.42)},lay);b.els.push(l);prims.push({el:l,z:0,b,k,h})}});
  A.forEach((a,i)=>{const gg=el('g',{},lay);const c=el('circle',{fill:sphereFill(a.c[0]),stroke:'rgba(0,0,0,.35)','stroke-width':f2(1.5*SU)},gg);let t=null;if(it.symbols!==false&&!fill){t=tag3(gg,a.e,{size:26,color:a.e==='H'?'#1C1B22':'#fff',weight:800});t.setAttribute('stroke','none')}a.g=gg;a.ci=c;a.t=t;prims.push({el:gg,z:0,a})});
  let nm=null;if(it.name!==false){nm=el('g',{},g);const t1=tag3(nm,sub2(it.label||it.preset||'H2O')+(P.name&&it.name!==''?'  —  '+(it.name||P.name):''),{size:44,color:'ink'});at(t1,{x:f2(B[0]+B[2]/2),y:f2(B[1]+B[3]-14*SU)})}
  let ang=null;if(it.angle){ang=el('path',{fill:'none',stroke:col('a2'),'stroke-width':f2(3*SU)},g);ang.t=tag3(g,typeof it.angle==='string'?it.angle:(it.preset==='H2O'?'104,5°':it.preset==='CH4'?'109,5°':it.preset==='NH3'?'107°':it.preset==='CO2'?'180°':'120°'),{size:30,color:'a2'})}
  return {g,noDraw:true,len:()=>1.2+A.length*.08,anchors:{},update(lt,p,st){const v=V(lt,st);const S=A.map(a=>v.pr(a.p));const n=A.length;
      A.forEach((a,i)=>{const q=E.outBack(prog(lt,st+i*.07,st+i*.07+.5));const [x,y,z,sc]=S[i];const r=(fill?a.c[2]*.78:a.c[1]*.62+.12)*sc*Math.max(.01,q);at(a.ci,{cx:f2(x),cy:f2(y),r:f2(r)});if(a.t){at(a.t,{x:f2(x),y:f2(y+9*SU),'font-size':f2(Math.min(30,Math.max(14,r*.75)))});a.t.setAttribute('opacity',f2(q))}});
      prims.forEach(pm=>{if(pm.a){pm.z=S[A.indexOf(pm.a)][2];return}const b=pm.b;const [x1,y1,z1,s1]=S[b.i],[x2,y2,z2]=S[b.j];const q=prog(lt,st+.25+b.i*.05,st+.8+b.i*.05);let dx=x2-x1,dy=y2-y1;const L=Math.hypot(dx,dy)||1;const nx=-dy/L,ny=dx/L;const off=(pm.k-(b.o-1)/2)*bw*1.25*s1;
        const mx=(x1+x2)/2,my=(y1+y2)/2;const [ax,ay,bx,by]=pm.h?[mx,my,lerp(mx,x2,q),lerp(my,y2,q)]:[x1,y1,lerp(x1,mx,q*2>1?1:q*2),lerp(y1,my,q*2>1?1:q*2)];
        at(pm.el,{x1:f2(ax+nx*off),y1:f2(ay+ny*off),x2:f2(bx+nx*off),y2:f2(by+ny*off),'stroke-width':f2(bw*(b.o>1?.62:1)*s1)});pm.z=(pm.h?(z1+3*z2)/4:(3*z1+z2)/4)-.4});
      depthSort(lay,prims);if(nm)nm.setAttribute('opacity',f2(prog(lt,st+.6,st+1.2)));
      if(ang&&n>=3){const [cx,cy,,s0]=S[0],[ax,ay]=S[1],[bx,by]=S[2];const r=Math.max(60*SU,A[0].c[1]*.62*s0*1.35);let a1=Math.atan2(ay-cy,ax-cx),a2=Math.atan2(by-cy,bx-cx);let d=a2-a1;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;const q=prog(lt,st+1,st+1.6);
        ang.setAttribute('d',`M${f2(cx+Math.cos(a1)*r)},${f2(cy+Math.sin(a1)*r)} A${f2(r)},${f2(r)} 0 0 ${d>0?1:0} ${f2(cx+Math.cos(a1+d*q)*r)},${f2(cy+Math.sin(a1+d*q)*r)}`);const am=a1+d/2;at(ang.t,{x:f2(cx+Math.cos(am)*r*1.9),y:f2(cy+Math.sin(am)*r*1.9+10*SU),opacity:f2(q)})}}}}};

// ---------- lattice: NaCl / sc / bcc / fcc unit cells ----------
SM.items.lattice={build(it){const g=el('g');const B=boxOf(it);const kind=it.kind||'nacl';const n=it.n||(kind==='nacl'?3:2);const pts=[];const ed=[];
  const h=(n-1)/2;for(let i=0;i<n;i++)for(let j=0;j<n;j++)for(let k=0;k<n;k++){const p=[i-h,j-h,k-h];pts.push({p,e:kind==='nacl'?((i+j+k)%2?'Na':'Cl'):(it.element||'Fe')})}
  const key=p=>p.map(v=>v.toFixed(2)).join(',');const idx={};pts.forEach((o,i)=>idx[key(o.p)]=i);
  pts.forEach((o,i)=>[[1,0,0],[0,1,0],[0,0,1]].forEach(d=>{const j=idx[key(o.p.map((v,k)=>v+d[k]))];if(j!=null)ed.push([i,j])}));
  if(kind==='bcc')pts.push({p:[0,0,0],e:it.element||'Fe',c:true});if(kind==='fcc'){[[0,0,-h],[0,0,h],[0,-h,0],[0,h,0],[-h,0,0],[h,0,0]].forEach(p=>pts.push({p,e:it.element||'Cu',c:true}))}
  const Rm=Math.hypot(h,h,h)+.6;const V=view3(it,B,Rm,{spin:it.spin??16,pitch:22});const lay=el('g',{},g);const prims=[];
  ed.forEach(([i,j])=>{const l=el('line',{stroke:col('dim'),'stroke-width':f2(3*SU),'stroke-opacity':.7},lay);prims.push({el:l,i,j,z:0})});
  pts.forEach(o=>{const c=el('circle',{fill:sphereFill(it.colors&&it.colors[o.e]||(CPK3[o.e]||['#E8A33D'])[0])},lay);prims.push({el:c,o,z:0})});
  const rr=e=>kind==='nacl'?(e==='Cl'?.36:.22):.26;let lg=null;if(kind==='nacl'&&it.legend!==false){lg=el('g',{},g);const y=B[1]+B[3]-20*SU;[['Na⁺','Na'],['Cl⁻','Cl']].forEach(([t,e],k)=>{const x=B[0]+B[2]/2+(k?90:-130)*SU;el('circle',{cx:x,cy:y-12*SU,r:f2(16*SU),fill:sphereFill(CPK3[e][0])},lg);const tt=tag3(lg,t,{size:30});at(tt,{x:f2(x+40*SU),y:f2(y-2*SU)})})}
  return {g,noDraw:true,len:()=>2,update(lt,p,st){const v=V(lt,st);const S=pts.map(o=>v.pr(o.p));
    prims.forEach((pm,k)=>{if(pm.o){const i=pts.indexOf(pm.o);const [x,y,z,s]=S[i];const q=E.outBack(prog(lt,st+i*.03,st+i*.03+.45));at(pm.el,{cx:f2(x),cy:f2(y),r:f2(Math.max(.01,rr(pm.o.e)*s*q))});pm.z=z}else{const a=S[pm.i],b=S[pm.j];const q=prog(lt,st+.6,st+1.4);at(pm.el,{x1:f2(a[0]),y1:f2(a[1]),x2:f2(lerp(a[0],b[0],q)),y2:f2(lerp(a[1],b[1],q))});pm.z=(a[2]+b[2])/2-.3}});depthSort(lay,prims);lg&&lg.setAttribute('opacity',f2(prog(lt,st+1,st+1.6)))}}}};

// ---------- dna3d: rotating double helix ----------
SM.items.dna3d={build(it){const g=el('g');const B=boxOf(it);const N=it.pairs||20,tw=(it.turn??36)*D2R,rise=.34,R=1;const H=N*rise;const seq=(it.seq||'ATGCGTACCGTAGCTAGCTA').toUpperCase();
  const vert=it.vertical!==false;const Rm=Math.max(H/2,R)+.3;const V=view3(it,B,Rm,{spin:it.spin??30,pitch:it.pitch??8,yaw:0});const lay=el('g',{},g);const prims=[];
  const PC={A:col('a3'),T:col('a2'),G:col('a4'),C:col('a1')};const comp={A:'T',T:'A',G:'C',C:'G'};
  const P=(i,s)=>{const a=i*tw+(s?Math.PI*.8:0);const y=i*rise-H/2;return vert?[R*Math.cos(a),y,R*Math.sin(a)]:[y,R*Math.cos(a),R*Math.sin(a)]};
  for(let i=0;i<N;i++){const b=seq[i%seq.length]||'A';const c2=comp[b]||'T';
    const l1=el('line',{stroke:PC[b],'stroke-width':f2(10*SU),'stroke-linecap':'round'},lay),l2=el('line',{stroke:PC[c2],'stroke-width':f2(10*SU),'stroke-linecap':'round'},lay);prims.push({el:l1,i,k:'b1'},{el:l2,i,k:'b2'});
    if(i<N-1)[0,1].forEach(s=>{const l=el('line',{stroke:s?col('a5'):col('a1'),'stroke-width':f2(14*SU),'stroke-linecap':'round'},lay);prims.push({el:l,i,s,k:'bb'})});
    [0,1].forEach(s=>{const c=el('circle',{fill:sphereFill(s?'a5':'a1')},lay);prims.push({el:c,i,s,k:'n'})})}
  let lg=null;if(it.legend!==false){lg=el('g',{},g);[['A','T'],['G','C']].forEach(([a,b],k)=>{const x=B[0]+(vert?B[2]*.84:B[2]*.5+(k-.5)*300*SU),y=vert?B[1]+B[3]*.4+k*70*SU:B[1]+B[3]-12*SU;const t=tag3(lg,`${a} — ${b}`,{size:34,color:PC[a]});at(t,{x:f2(x),y:f2(y)})})}
  return {g,noDraw:true,len:()=>2.4,update(lt,p,st){const v=V(lt,st);const sh=(it.unzip?prog(lt,st+(it.unzip===true?2:it.unzip),st+(it.unzip===true?2:it.unzip)+3):0);
    prims.forEach(pm=>{const q=prog(lt,st+pm.i*.05,st+pm.i*.05+.5);if(pm.k==='n'){const [x,y,z,s]=v.pr(P(pm.i,pm.s));at(pm.el,{cx:f2(x),cy:f2(y),r:f2(Math.max(.01,.17*s*E.outBack(q)))});pm.z=z+.05}
      else if(pm.k==='bb'){const a=v.pr(P(pm.i,pm.s)),b=v.pr(P(pm.i+1,pm.s));at(pm.el,{x1:f2(a[0]),y1:f2(a[1]),x2:f2(lerp(a[0],b[0],q)),y2:f2(lerp(a[1],b[1],q)),'stroke-width':f2(.1*a[3])});pm.z=(a[2]+b[2])/2-.02}
      else{const A=P(pm.i,0),Bp=P(pm.i,1);const m=[0,1,2].map(k=>(A[k]+Bp[k])/2);const gap=sh*(1-pm.i/N*0)*.5;const fr=pm.k==='b1'?A:Bp;const to=m.map((v2,k)=>lerp(v2,fr[k],gap*1.6));const a=v.pr(fr),b=v.pr(to);const qq=prog(lt,st+.8+pm.i*.04,st+1.2+pm.i*.04);
        at(pm.el,{x1:f2(a[0]),y1:f2(a[1]),x2:f2(lerp(a[0],b[0],qq)),y2:f2(lerp(a[1],b[1],qq)),'stroke-width':f2(.09*a[3])});pm.z=(a[2]+b[2])/2-.1}});depthSort(lay,prims);lg&&lg.setAttribute('opacity',f2(prog(lt,st+1.5,st+2)))}}}};

// ---------- solid: geometric bodies (stereometriya) ----------
function solidGeo(kind,it){const a=it.a||2,b=it.b||a,c=it.c||it.h||a;let V=[],F=[],round=false;const ngon=(n,r,y)=>Array.from({length:n},(_,i)=>{const t=i/n*2*Math.PI;return [r*Math.cos(t),y,r*Math.sin(t)]});
  if(kind==='cube'||kind==='cuboid'){const [x,y,z]=kind==='cube'?[a,a,a]:[a,c,b];V=[[-1,-1,1],[1,-1,1],[1,-1,-1],[-1,-1,-1],[-1,1,1],[1,1,1],[1,1,-1],[-1,1,-1]].map(([i,j,k])=>[i*x/2,j*y/2,k*z/2]);F=[[0,1,2,3],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]]}
  else if(kind==='pyramid'){const n=it.n||4;V=ngon(n,a/Math.SQRT2*(n===4?1:1),-c/2);if(n===4)V=[[-a/2,-c/2,-a/2],[a/2,-c/2,-a/2],[a/2,-c/2,a/2],[-a/2,-c/2,a/2]];V.push([0,c/2,0]);F=[V.slice(0,n).map((_,i)=>n-1-i)];for(let i=0;i<n;i++)F.push([i,(i+1)%n,n])}
  else if(kind==='tetra'){const s=a/Math.sqrt(8/3)*1.2;V=[[1,1,1],[-1,-1,1],[-1,1,-1],[1,-1,-1]].map(p=>p.map(v=>v*s/1.6));F=[[0,1,2],[0,3,1],[0,2,3],[1,3,2]]}
  else if(kind==='octa'){const s=a*.75;V=[[s,0,0],[-s,0,0],[0,s,0],[0,-s,0],[0,0,s],[0,0,-s]];F=[[2,4,0],[2,0,5],[2,5,1],[2,1,4],[3,0,4],[3,5,0],[3,1,5],[3,4,1]]}
  else if(kind==='prism'){const n=it.n||3;const r=a*.62;V=[...ngon(n,r,-c/2),...ngon(n,r,c/2)];F=[Array.from({length:n},(_,i)=>i),Array.from({length:n},(_,i)=>2*n-1-i)];for(let i=0;i<n;i++)F.push([i,(i+1)%n,n+(i+1)%n,n+i].reverse())}
  else if(kind==='cylinder'||kind==='cone'||kind==='frustum'){const n=36;const r=a*.6,r2=kind==='cone'?0.0001:kind==='frustum'?r*(it.k??.5):r;V=[...ngon(n,r,-c/2),...ngon(n,r2,c/2)];F=[Array.from({length:n},(_,i)=>i)];if(kind!=='cone')F.push(Array.from({length:n},(_,i)=>2*n-1-i));for(let i=0;i<n;i++)F.push([i,(i+1)%n,n+(i+1)%n,n+i].reverse());round=true}
  return {V,F,round}}
SM.items.solid={build(it){const g=el('g');const B=boxOf(it);const kind=it.shape||it.kind||'cube';const c0=it.color||'a1';
  if(kind==='sphere'){const Rr=1;const V=view3(it,B,1.25,{spin:it.spin??20,pitch:20});const ball=el('circle',{fill:sphereFill(c0),opacity:.9},g);const lines=el('g',{fill:'none',stroke:'#fff','stroke-width':f2(1.6*SU)},g);const ls=[];
    for(let k=-2;k<=2;k++)ls.push({el:el('path',{},lines),f:t=>{const la=k*30*D2R;return [Math.cos(la)*Math.cos(t),Math.sin(la),Math.cos(la)*Math.sin(t)]}});for(let k=0;k<6;k++)ls.push({el:el('path',{},lines),f:t=>{const lo=k*30*D2R;return [Math.cos(t)*Math.cos(lo),Math.sin(t),Math.cos(t)*Math.sin(lo)]}});
    const rad=it.radius!==false?el('g',{},g):null;let rl,rt;if(rad){rl=el('line',{stroke:col('a2'),'stroke-width':f2(4*SU),'stroke-dasharray':`${10*SU} ${7*SU}`},rad);el('circle',{r:f2(7*SU),fill:col('a2')},rad).classList.add('c0');rt=tag3(rad,it.rLabel||'R',{size:40,color:'a2'})}
    return {g,noDraw:true,len:()=>2,update(lt,p,st){const v=V(lt,st);const q=E.outBack(prog(lt,st,st+.7));const s=v.s;at(ball,{cx:f2(v.cx),cy:f2(v.cy),r:f2(Math.max(.01,s*q))});
      ls.forEach(L=>{let d='',pen=false;for(let i=0;i<=72;i++){const P=L.f(i/72*2*Math.PI);const [x,y,z]=v.pr(P.map(w=>w*q));if(z>=-0.02){d+=(pen?'L':'M')+f2(x)+','+f2(y);pen=true}else pen=false}L.el.setAttribute('d',d)});lines.setAttribute('opacity',f2(.35*prog(lt,st+.4,st+1)));
      if(rad){const a=v.pr([0,0,0]),b=v.pr([Math.cos(.6),0,Math.sin(.6)]);const qq=prog(lt,st+1,st+1.6);at(rl,{x1:f2(a[0]),y1:f2(a[1]),x2:f2(lerp(a[0],b[0],qq)),y2:f2(lerp(a[1],b[1],qq))});rad.querySelector('.c0').setAttribute('cx',f2(a[0]));rad.querySelector('.c0').setAttribute('cy',f2(a[1]));at(rt,{x:f2((a[0]+b[0])/2),y:f2((a[1]+b[1])/2-14*SU),opacity:f2(qq)})}}}}
  const G=solidGeo(kind,it);const Rm=Math.max(...G.V.map(p=>Math.hypot(...p)))*1.08;const V=view3(it,B,Rm,{spin:it.spin??18,pitch:22});const lay=el('g',{},g);const fop=it.fillOpacity??.82;
  const faces=G.F.map(f=>({f,el:el('polygon',{'stroke-linejoin':'round'},lay),z:0}));
  const edges=[];const ek={};G.F.forEach((f,fi)=>f.forEach((v,k)=>{const w=f[(k+1)%f.length];const key=v<w?v+'-'+w:w+'-'+v;if(!ek[key]){ek[key]={a:Math.min(v,w),b:Math.max(v,w),fs:[]};edges.push(ek[key])}ek[key].fs.push(fi)}));
  const eg=el('g',{},g);edges.forEach(e=>{e.el=el('line',{stroke:col(it.edge||'ink'),'stroke-linecap':'round'},eg)});
  const vl=[];if(it.labels){const L=Array.isArray(it.labels)?it.labels:'ABCDEFGHKLMNOPQRS'.split('').map((ch,i)=>G.V.length===8?(i<4?ch:'ABCD'[i-4]+'₁'):ch);G.V.forEach((p,i)=>{if(G.round||!L[i])return;vl.push({i,t:tag3(g,L[i],{size:34,color:'a2'})})})}
  const ver=G.round?null:G.V.map(()=>el('circle',{r:f2(5*SU),fill:col('a2')},g));
  return {g,noDraw:true,len:()=>2.2,update(lt,p,st){const v=V(lt,st);const q=E.outCubic(prog(lt,st,st+.9));const S=G.V.map(P=>v.pr(P.map(w=>w*(.6+.4*q))));const RV=G.V.map(P=>v.rot(P));const OC=[0,1,2].map(k=>RV.reduce((s2,P)=>s2+P[k],0)/RV.length);
    const front=faces.map(fc=>{const [a,b,c]=fc.f.slice(0,3).map(i=>RV[i]);const u=[0,1,2].map(k=>b[k]-a[k]),w=[0,1,2].map(k=>c[k]-a[k]);let n=[u[1]*w[2]-u[2]*w[1],u[2]*w[0]-u[0]*w[2],u[0]*w[1]-u[1]*w[0]];const nl=Math.hypot(...n)||1;n=n.map(x=>x/nl);
      const sx=fc.f.map(i=>S[i]);const fcn=[0,1,2].map(k=>fc.f.reduce((s2,i)=>s2+RV[i][k],0)/fc.f.length);if(n[0]*(fcn[0]-OC[0])+n[1]*(fcn[1]-OC[1])+n[2]*(fcn[2]-OC[2])<0)n=n.map(x=>-x);const EYE=[0,0,(it.persp??6)*Rm];const fr=n[0]*(EYE[0]-fcn[0])+n[1]*(EYE[1]-fcn[1])+n[2]*(EYE[2]-fcn[2])>0;
      const br=.5+.5*(n[0]*LIGHT[0]+n[1]*LIGHT[1]+n[2]*LIGHT[2]);fc.el.setAttribute('points',sx.map(P=>f2(P[0])+','+f2(P[1])).join(' '));
      at(fc.el,{fill:shade(c0,clamp(br*.9+.1)),'fill-opacity':f2((fr?fop:fop*.35)*prog(lt,st+.3,st+1.1)),stroke:G.round?shade(c0,clamp(br*.9+.1)):'none','stroke-width':G.round?f2(1*SU):0});fc.z=fc.f.reduce((s2,i)=>s2+S[i][2],0)/fc.f.length+(fr?100:0);return fr});
    depthSort(lay,faces);const dq=prog(lt,st+.2,st+1.2);
    edges.forEach(e=>{const vis=e.fs.some(fi=>front[fi]);const sil=G.round?(e.fs.length<2||front[e.fs[0]]!==front[e.fs[1]]||(e.fs.length>1&&G.F[e.fs[0]].length>4)):true;const a=S[e.a],b=S[e.b];
      const isCap=G.round&&e.fs.some(fi=>G.F[fi].length>4);const show=G.round?(isCap||sil):true;at(e.el,{x1:f2(a[0]),y1:f2(a[1]),x2:f2(lerp(a[0],b[0],dq)),y2:f2(lerp(a[1],b[1],dq)),'stroke-width':f2((vis?3.2:2)*SU),'stroke-dasharray':vis?'none':`${9*SU} ${8*SU}`,opacity:show?(vis?.95:.55):0})});
    if(ver)ver.forEach((c,i)=>at(c,{cx:f2(S[i][0]),cy:f2(S[i][1]),opacity:f2(prog(lt,st+.8,st+1.2))}));
    vl.forEach(({i,t})=>{const [x,y]=S[i];const dx=x-v.cx,dy=y-v.cy;const L=Math.hypot(dx,dy)||1;at(t,{x:f2(x+dx/L*34*SU),y:f2(y+dy/L*34*SU+12*SU),opacity:f2(prog(lt,st+1,st+1.5))})})}}}};
