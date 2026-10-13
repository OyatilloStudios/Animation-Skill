// ===== 14-3d-world.js — globe, solar3d, axes3d (uses 13-3d.js helpers) =====
const CONT={africa:[[37,10],[31,32],[12,44],[11,51],[-4,40],[-26,33],[-34,20],[-17,12],[5,9],[4,-8],[15,-17],[28,-13],[35,-6]],
 eurasia:[[36,-9],[43,-9],[48,-4],[54,8],[58,6],[71,26],[69,60],[73,80],[77,105],[70,140],[66,180],[60,165],[53,142],[40,130],[31,122],[22,114],[10,106],[1,104],[14,98],[22,90],[8,77],[24,68],[25,57],[13,45],[30,32],[37,27],[41,20],[38,15],[44,9],[43,3]],
 namerica:[[70,-160],[71,-125],[68,-95],[63,-80],[52,-56],[45,-62],[41,-70],[30,-81],[25,-80],[30,-89],[19,-96],[15,-88],[8,-78],[17,-102],[32,-117],[48,-125],[58,-136],[60,-147],[55,-163]],
 samerica:[[11,-73],[8,-60],[-5,-35],[-23,-41],[-34,-54],[-52,-68],[-54,-71],[-40,-73],[-18,-71],[-5,-81]],
 australia:[[-11,132],[-12,142],[-25,153],[-38,147],[-35,137],[-34,115],[-22,114],[-14,127]],
 greenland:[[60,-44],[70,-22],[82,-30],[80,-65],[76,-70],[68,-53]]};
const ll3=(la,lo,r=1)=>[r*Math.cos(la*D2R)*Math.sin(lo*D2R),r*Math.sin(la*D2R),r*Math.cos(la*D2R)*Math.cos(lo*D2R)];
SM.items.globe={build(it){const g=el('g');const B=boxOf(it);const tilt=(it.tilt??23.4)*D2R;const V=view3(it,B,1.18,{spin:0,pitch:it.pitch??8,yaw:0});const rotSp=it.rotate??20;
  const tl=([x,y,z])=>[x*Math.cos(tilt)+y*Math.sin(tilt),-x*Math.sin(tilt)+y*Math.cos(tilt),z];
  const ring=el('circle',{fill:'none',stroke:'rgba(140,200,255,.35)','stroke-width':f2(10*SU),filter:'url(#glowS)'},g);
  const oc=el('circle',{fill:sphereFill(it.ocean||'#2E7BD6')},g);const land=el('g',{fill:col(it.land||'#5BC27A'),'fill-opacity':.92,stroke:'#2f8f52','stroke-width':f2(1.5*SU)},g);const cps=Object.values(CONT).map(c=>({c,el:el('path',{},land)}));
  const grid=el('g',{fill:'none',stroke:'#fff','stroke-width':f2(1.3*SU),'stroke-opacity':.28},g);const GL=[];for(let la=-60;la<=60;la+=30)GL.push({la,el:el('path',{},grid)});for(let lo=0;lo<180;lo+=30)GL.push({lo,el:el('path',{},grid)});
  const eq=it.equator!==false?el('path',{fill:'none',stroke:col('a2'),'stroke-width':f2(3*SU)},g):null;
  const ax=it.axis!==false?el('line',{stroke:col('ink'),'stroke-width':f2(3*SU),'stroke-dasharray':`${10*SU} ${8*SU}`},g):null;
  const night=it.night!==false?el('circle',{fill:gradient([[0,'#000',0],[.5,'#000',0],[.64,'#000',.7],[1,'#000',.85]],{x1:0,y1:0,x2:1,y2:0})},g):null;
  const pins=(it.pins||[]).map(pn=>{const pg=el('g',{},g);const c=el('circle',{r:f2(9*SU),fill:col(pn.color||'a3'),stroke:'#fff','stroke-width':f2(3*SU)},pg);const t=pn.text?tag3(pg,pn.text,{size:28}):null;return {pn,pg,c,t}});
  let cap=null;if(it.text){cap=tag3(g,it.text,{size:38});at(cap,{x:f2(B[0]+B[2]/2),y:f2(B[1]+B[3]-10*SU)})}
  return {g,noDraw:true,len:()=>2,update(lt,p,st){const v=V(lt,st);const sp=(it.lon??0)+rotSp*(lt-st);const q=E.outBack(prog(lt,st,st+.8));const R=Math.max(.01,v.s*q);
    const P=(la,lo)=>v.pr(tl(ll3(la,lo+sp)));const path=pts=>{let d='',pen=false;pts.forEach(([la,lo])=>{const [x,y,z]=P(la,lo);if(z>-.02){d+=(pen?'L':'M')+f2(x)+','+f2(y);pen=true}else pen=false});return d};
    at(oc,{cx:f2(v.cx),cy:f2(v.cy),r:f2(R)});at(ring,{cx:f2(v.cx),cy:f2(v.cy),r:f2(R*1.02)});
    cps.forEach(o=>{const pts=[];const c=o.c;for(let i=0;i<c.length;i++){const a=c[i],b=c[(i+1)%c.length];let db=b[1]-a[1];if(db>180)db-=360;if(db<-180)db+=360;for(let k=0;k<4;k++)pts.push([lerp(a[0],b[0],k/4),a[1]+db*k/4])}
      const proj=pts.map(([la,lo])=>P(la,lo));let d='';if(proj.some(p=>p[2]>0))d='M'+proj.map(([x,y,z])=>{if(z>=0)return f2(x)+','+f2(y);const dx=x-v.cx,dy=y-v.cy,L=Math.hypot(dx,dy)||1;return f2(v.cx+dx/L*R)+','+f2(v.cy+dy/L*R)}).join('L')+'Z';o.el.setAttribute('d',d)});
    land.setAttribute('opacity',f2(prog(lt,st+.3,st+1)));
    GL.forEach(o=>{const pts=[];if(o.la!=null)for(let i=0;i<=72;i++)pts.push([o.la,i*5]);else{for(let i=0;i<=72;i++)pts.push([-90+i*2.5,o.lo]);for(let i=0;i<=72;i++)pts.push([90-i*2.5,o.lo+180])}o.el.setAttribute('d',path(pts))});
    if(eq){const pts=[];for(let i=0;i<=72;i++)pts.push([0,i*5]);eq.setAttribute('d',path(pts));eq.setAttribute('opacity',f2(prog(lt,st+.8,st+1.4)))}
    if(ax){const a=v.pr(tl([0,1.3,0])),b=v.pr(tl([0,-1.3,0]));at(ax,{x1:f2(a[0]),y1:f2(a[1]),x2:f2(b[0]),y2:f2(b[1]),opacity:f2(prog(lt,st+.6,st+1.2))})}
    if(night)at(night,{cx:f2(v.cx),cy:f2(v.cy),r:f2(R)});
    pins.forEach(({pn,pg,c,t})=>{const [x,y,z]=P(pn.lat,pn.lon);pg.setAttribute('opacity',f2((z>.05?1:0)*prog(lt,st+1,st+1.4)));at(c,{cx:f2(x),cy:f2(y)});if(t)at(t,{x:f2(x),y:f2(y-20*SU)})});cap&&cap.setAttribute('opacity',f2(prog(lt,st+.6,st+1.2)))}}}};

const PLAN=[['Merkuriy','#B9B2A8',.38,.24],['Venera','#E8C27A',.95,.62],['Yer','#3F8CFF',1,1],['Mars','#E0603A',.53,1.88],['Yupiter','#D9A066',2.4,11.9],['Saturn','#E9CF8F',2.1,29.5],['Uran','#8FE3E8',1.4,84],['Neptun','#4E6CFF',1.35,165]];
SM.items.solar3d={build(it){const g=el('g');const B=boxOf(it);const n=Math.min(8,it.planets||8);const PL=PLAN.slice(0,n);const Rm=1.1+(n-1)*.55;const V=view3(it,B,Rm,{spin:it.spin??0,pitch:it.pitch??24,yaw:0});
  const orb=el('g',{fill:'none',stroke:col('dim'),'stroke-width':f2(1.6*SU),'stroke-opacity':.45},g);const lay=el('g',{},g);const prims=[];
  const sun={el:el('g',{},lay),z:0};const sc=el('circle',{fill:sphereFill('#FFC23D'),filter:'url(#glow2)'},sun.el);prims.push(sun);
  const P=PL.map(([nm0,c,sz,T],i)=>{const o={nm:nm0,c,sz,T,r:1.1+i*.55,ph:seeded(i,5)*6.28,el:el('g',{},lay),z:0,orb:el('path',{},orb)};o.ci=el('circle',{fill:sphereFill(c)},o.el);if(nm0==='Saturn')o.ring=el('ellipse',{fill:'none',stroke:'#E9CF8F','stroke-width':f2(4*SU),opacity:.8},o.el);if(it.labels!==false)o.t=tag3(o.el,nm0,{size:22,color:'dim',weight:700});prims.push(o);return o});
  return {g,noDraw:true,len:()=>2,update(lt,p,st){const v=V(lt,st);const t=lt-st;const sp=it.speed??1;
    const c0=v.pr([0,0,0]);at(sc,{cx:f2(c0[0]),cy:f2(c0[1]),r:f2(Math.max(.01,.55*c0[3]*E.outBack(prog(lt,st,st+.8))))});sun.z=c0[2];
    P.forEach((o,i)=>{const q=prog(lt,st+.3+i*.12,st+.9+i*.12);let d='';for(let k=0;k<=96*q;k++){const a=k/96*2*Math.PI;const [x,y]=v.pr([o.r*Math.cos(a),0,o.r*Math.sin(a)]);d+=(k?'L':'M')+f2(x)+','+f2(y)}o.orb.setAttribute('d',d);
      const a=o.ph+t*sp*2.2/Math.sqrt(o.T);const [x,y,z,f]=v.pr([o.r*Math.cos(a),0,o.r*Math.sin(a)]);const rr=Math.max(.01,(.07+.05*Math.sqrt(o.sz))*f*E.outBack(q));at(o.ci,{cx:f2(x),cy:f2(y),r:f2(rr)});
      if(o.ring)at(o.ring,{cx:f2(x),cy:f2(y),rx:f2(rr*2),ry:f2(Math.max(.01,rr*2*Math.abs(Math.sin((v.P+12)*D2R))))});if(o.t)at(o.t,{x:f2(x),y:f2(y-rr-12*SU),opacity:f2(q)});o.z=z;o.lr={x:x-tw(o.nm,22*SU,700)/2,y:y-rr-34*SU,w:tw(o.nm,22*SU,700),h:26*SU}});
    P.forEach(a=>P.forEach(b=>{if(a!==b&&a.t&&b.t&&a.z<b.z&&TL.hits(a.lr,b.lr,4*SU))a.t.setAttribute('opacity',0)}));depthSort(lay,prims)}}}};

SM.items.axes3d={build(it){const g=el('g');const B=boxOf(it);const L=it.size||3;const V=view3(it,B,L*1.25,{spin:it.spin??10,pitch:it.pitch??22,yaw:-35});
  const map=([x,y,z])=>[x,z,-y];
  const grid=it.grid!==false?el('g',{stroke:col('dim'),'stroke-width':f2(1*SU),'stroke-opacity':.35},g):null;const GL=[];if(grid)for(let k=-L;k<=L;k++){GL.push({el:el('line',{},grid),a:[k,-L,0],b:[k,L,0]});GL.push({el:el('line',{},grid),a:[-L,k,0],b:[L,k,0]})}
  let surf=null,SF=null;if(it.fn){try{SF=new Function('x','y','with(Math){return '+String(it.fn).replace(/\^/g,'**')+'}')}catch(e){SERR.push('axes3d fn: '+e.message)}surf=el('g',{fill:'none','stroke-width':f2(2*SU)},g)}
  const AX=[['x',[L,0,0],'a3'],['y',[0,L,0],'a4'],['z',[0,0,L],'a1']].map(([n,v,c])=>({n,v,c,l:el('line',{stroke:col(c),'stroke-width':f2(4*SU),'marker-end':arrowMarker(c)},g),t:tag3(g,n,{size:36,color:c})}));
  const SL=[];const N=it.res||16;if(surf)for(let i=0;i<=N;i++){SL.push({el:el('path',{},surf),i,dir:0});SL.push({el:el('path',{},surf),i,dir:1})}
  const VC=['a2','a5','a3'];const vecs=(it.vectors||[]).map((vc,i)=>{const c=vc.color||VC[i%3];return {vc,l:el('line',{stroke:col(c),'stroke-width':f2(6*SU),'marker-end':arrowMarker(c)},g),t:vc.text?tag3(g,vc.text,{size:32,color:c}):null,pp:vc.proj!==false?el('path',{fill:'none',stroke:col('dim'),'stroke-width':f2(2*SU),'stroke-dasharray':`${6*SU} ${6*SU}`},g):null}});
  const pts=(it.points||[]).map(pt=>({pt,c:el('circle',{r:f2(10*SU),fill:sphereFill(pt.color||'a2')},g),t:pt.text?tag3(g,pt.text,{size:28}):null}));
  return {g,noDraw:true,len:()=>2+vecs.length*.5,update(lt,p,st){const v=V(lt,st);const pr=q=>v.pr(map(q));const o=pr([0,0,0]);
    AX.forEach((a,i)=>{const q=E.outCubic(prog(lt,st+i*.15,st+i*.15+.7));const e=pr(a.v.map(w=>w*q));at(a.l,{x1:f2(o[0]),y1:f2(o[1]),x2:f2(e[0]),y2:f2(e[1])});const e2=pr(a.v.map(w=>w*1.12));at(a.t,{x:f2(e2[0]),y:f2(e2[1]+12*SU),opacity:f2(q)})});
    GL.forEach(l=>{const a=pr(l.a),b=pr(l.b);at(l.el,{x1:f2(a[0]),y1:f2(a[1]),x2:f2(b[0]),y2:f2(b[1])})});grid&&grid.setAttribute('opacity',f2(prog(lt,st,st+.8)));
    if(surf&&SF){const R=it.range||L*.9;const q=prog(lt,st+.8,st+2.2);const Z=(x,y)=>{let z=0;try{z=SF(x,y)}catch(e){}return isFinite(z)?z:0};
      SL.forEach(s=>{let d='';for(let k=0;k<=N;k++){const u=-R+2*R*s.i/N,w=-R+2*R*k/N;const [x,y]=s.dir?[w,u]:[u,w];const P=pr([x,y,Z(x,y)*q]);d+=(k?'L':'M')+f2(P[0])+','+f2(P[1])}s.el.setAttribute('d',d);const u=-R+2*R*s.i/N;const zc=s.dir?Z(0,u):Z(u,0);s.el.setAttribute('stroke',mixColor(hexOf('a1'),hexOf('a3'),clamp((zc+1)/2)))});surf.setAttribute('opacity',f2(.9*prog(lt,st+.8,st+1.2)))}
    vecs.forEach(({vc,l,t,pp},i)=>{const t0=st+1+i*.5;const q=E.outCubic(prog(lt,t0,t0+.8));const from=vc.from||[0,0,0];const to=from.map((w,k)=>lerp(w,vc.to[k],q));const a=pr(from),b=pr(to);at(l,{x1:f2(a[0]),y1:f2(a[1]),x2:f2(b[0]),y2:f2(b[1]),opacity:f2(clamp(q*3))});
      if(t){const b2=pr(vc.to.map((w,k)=>w+(w-from[k])*.12));at(t,{x:f2(b2[0]),y:f2(b2[1]),opacity:f2(q)})}if(pp){const [x,y,z]=vc.to;const A=pr([x,y,0]),X=pr([x,0,0]),Y=pr([0,y,0]),T=pr([x,y,z]);pp.setAttribute('d',`M${f2(T[0])},${f2(T[1])}L${f2(A[0])},${f2(A[1])}M${f2(X[0])},${f2(X[1])}L${f2(A[0])},${f2(A[1])}L${f2(Y[0])},${f2(Y[1])}`);pp.setAttribute('opacity',f2(.8*prog(lt,t0+.6,t0+1)))}});
    pts.forEach(({pt,c,t},i)=>{const P=pr(pt.at||pt.p||[0,0,0]);const q=prog(lt,st+1.2+i*.2,st+1.5+i*.2);at(c,{cx:f2(P[0]),cy:f2(P[1]),opacity:f2(q)});if(t)at(t,{x:f2(P[0]),y:f2(P[1]-18*SU),opacity:f2(q)})})}}}};