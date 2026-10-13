/* ---------- PHYSICS: deterministic simulations (RK4 / analytic), live readouts, graphs, custom objects ---------- */
function rk4(f,y,t,dt){const k1=f(t,y),k2=f(t+dt/2,y.map((v,i)=>v+k1[i]*dt/2)),k3=f(t+dt/2,y.map((v,i)=>v+k2[i]*dt/2)),k4=f(t+dt,y.map((v,i)=>v+k3[i]*dt));return y.map((v,i)=>v+dt/6*(k1[i]+2*k2[i]+2*k3[i]+k4[i]))}
function simulate(f,y0,T,dt=1/240){const out=[y0.slice()];let y=y0.slice();for(let t=0;t<T;t+=dt){y=rk4(f,y,t,dt);out.push(y.slice())}return {at(t){const i=clamp(t/dt,0,out.length-1),a=Math.floor(i),b=Math.min(a+1,out.length-1),u=i-a;return out[a].map((v,k)=>lerp(v,out[b][k],u))},dt,out}}
function readout(g,x,y,rows,{size=28}={}){size*=SU;const w=Math.max(...rows.map(r=>tw(r[0]+' = 0000.00 '+(r[2]||''),size,600,MONOF)))+40*SU,h=rows.length*size*1.45+30*SU;panel(g,x-w,y,w,h,{});
  const ts=rows.map((r,i)=>{const t=el('text',{x:f2(x-w+20*SU),y:f2(y+24*SU+size*.95+i*size*1.45),'font-size':f2(size),'font-family':MONOF,'font-weight':600,fill:col(r[3]||'ink')},g);return t});
  return vals=>ts.forEach((t,i)=>{const r=rows[i];t.textContent=`${r[0]} = ${typeof vals[i]==='number'?vals[i].toFixed(r[1]??2):vals[i]} ${r[2]||''}`})}
function graphStrip(g,box,{label='',ylabel='',T=10,ymin=-1,ymax=1,color='a1'}={}){const [x,y,w,h]=box;panel(g,x,y,w,h,{r:12});const px=x+70*SU,py=y+20*SU,pw=w-90*SU,ph=h-55*SU;
  el('line',{x1:px,y1:py+ph/2*(ymax>0&&ymin<0?1:0)+(ymin>=0?ph:0),x2:px+pw,y2:py+ph/2*(ymax>0&&ymin<0?1:0)+(ymin>=0?ph:0),stroke:TH.dim,'stroke-width':1.5},g);el('line',{x1:px,y1:py,x2:px,y2:py+ph,stroke:TH.dim,'stroke-width':1.5},g);
  textEl(g,ylabel,px-14*SU,py+16*SU,{size:22*SU,anchor:'end',color:'dim',fam:MONOF});textEl(g,label,px+pw,py+ph+30*SU,{size:22*SU,anchor:'end',color:'dim',fam:MONOF});
  const pl=el('polyline',{fill:'none',stroke:col(color),'stroke-width':f2(3.5*SU),'stroke-linejoin':'round'},g);const dot=el('circle',{r:f2(7*SU),fill:col(color),filter:'url(#glowS)'},g);
  const map=(t,v)=>[px+t/T*pw,py+ph*(1-(v-ymin)/(ymax-ymin))];
  return (fn,t)=>{const pts=[];const n=Math.max(2,Math.floor(Math.min(t,T)/T*200));for(let i=0;i<=n;i++){const tt=Math.min(t,T)*i/n;pts.push(map(tt,fn(tt)).map(f2).join(','))}pl.setAttribute('points',pts.join(' '));const [a,b]=map(Math.min(t,T),fn(Math.min(t,T)));at(dot,{cx:f2(a),cy:f2(b)})}}
function body(g,it,r,color){if(it.object&&SIMG[it.object.src||it.object]){const src=it.object.src||it.object,s=(it.object.size||r*2.4);const im=el('image',{href:SIMG[src].src,width:s,height:s,x:-s/2,y:-s/2},g);return im}
  const gr=gradient([[0,'#ffffff',.9],[.35,color,1],[1,color,1]],{radial:true});return el('circle',{r,fill:gr,filter:'url(#glowS)'},g)}
const splitGraph=(it,box)=>it.graph?[[box[0],box[1],box[2],box[3]*.68],[box[0],box[1]+box[3]*.72,box[2],box[3]*.28]]:[box,null];
const simT=(lt,st,it)=>Math.max(0,(lt-st-(it.delay??.8))*(it.speed||1));
// PENDULUM
SM.items.pendulum={build(it){const g=el('g');const [B,GB]=splitGraph(it,boxOf(it));const L=it.L||1.5,g0=it.g||9.81,c=it.damping||0,th0=(it.angle??30)*Math.PI/180;const T=60;
  const S=simulate((t,[th,w])=>[w,-(g0/L)*Math.sin(th)-c*w],[th0,0],T);const scale=Math.min(B[3]*.78/L,B[2]*.4/(L*Math.sin(Math.min(Math.abs(th0),1.4))+.2));
  const px=B[0]+B[2]/2,py=B[1]+B[3]*.08,Lp=L*scale;el('rect',{x:px-140*SU,y:py-14*SU,width:280*SU,height:14*SU,rx:4,fill:TH.dim},g);
  el('line',{x1:px,y1:py,x2:px,y2:py+Lp*1.05,stroke:TH.dim,'stroke-dasharray':`${8*SU} ${8*SU}`,'stroke-width':2},g);const arc=el('path',{fill:'none',stroke:col('a2'),'stroke-width':f2(3*SU)},g);const thT=textEl(g,'θ',px,py+90*SU,{size:30*SU,color:'a2',fam:MATHF,italic:true});
  const trail=el('polyline',{fill:'none',stroke:col('a1'),'stroke-width':f2(3*SU),'stroke-opacity':.5},g);const rod=el('line',{stroke:TH.ink,'stroke-width':f2(4*SU)},g);const bg=el('g',{},g);body(bg,it,34*SU,col(it.color||'a2'));
  const vA=el('line',{stroke:col('a4'),'stroke-width':f2(5*SU),'marker-end':arrowMarker('a4'),'stroke-linecap':'round'},g);el('circle',{cx:px,cy:py,r:8*SU,fill:TH.ink},g);
  const ro=it.readout!==false?readout(g,B[0]+B[2],B[1],[['θ',1,'°','a2'],['ω',2,'rad/s','a4'],['T',2,'s','a1']]):null;const gr=GB?graphStrip(g,GB,{label:'t, s',ylabel:'θ',T:Math.min(T,it.graphT||10),ymin:-th0*1.1*180/Math.PI,ymax:th0*1.1*180/Math.PI,color:'a2'}):null;
  return {g,update(lt,p,st){const t=simT(lt,st,it);const [th,w]=S.at(t);const bx=px+Math.sin(th)*Lp,by=py+Math.cos(th)*Lp;g.__tk=[bx,by];at(rod,{x1:px,y1:py,x2:f2(bx),y2:f2(by)});bg.setAttribute('transform',`translate(${f2(bx)} ${f2(by)}) rotate(${f2(-th*180/Math.PI)})`);
    const ar=90*SU;arc.setAttribute('d',`M${px},${py+ar} A${ar},${ar} 0 0 ${th>0?0:1} ${f2(px+Math.sin(th)*ar)},${f2(py+Math.cos(th)*ar)}`);at(thT,{x:f2(px+Math.sin(th/2)*(ar+30*SU)-8*SU),y:f2(py+Math.cos(th/2)*(ar+30*SU)+10*SU)});
    const vs=w*Lp*.18;at(vA,{x1:f2(bx),y1:f2(by),x2:f2(bx+Math.cos(th)*vs),y2:f2(by-Math.sin(th)*vs),opacity:Math.abs(vs)>6?1:0});
    const pts=[];for(let k=0;k<40;k++){const tt=t-k*.03;if(tt<0)break;const [a]=S.at(tt);pts.push(f2(px+Math.sin(a)*Lp)+','+f2(py+Math.cos(a)*Lp))}trail.setAttribute('points',pts.join(' '));
    ro&&ro([th*180/Math.PI,w,2*Math.PI*Math.sqrt(L/g0)]);gr&&gr(tt=>S.at(tt)[0]*180/Math.PI,t)},noDraw:true}}};
// SPRING (mass on a spring, horizontal) with energy bars
SM.items.spring={build(it){const g=el('g');const [B,GB]=splitGraph(it,boxOf(it));const k=it.k||20,m=it.m||1,x0=it.x0??.3,c=it.damping||0;const S=simulate((t,[x,v])=>[v,(-k*x-c*v)/m],[x0,0],60);
  const wall=B[0]+40*SU,eqx=B[0]+B[2]*.45,sc=(B[2]*.25)/Math.max(.05,Math.abs(x0)),y=B[1]+B[3]*.45,bs=110*SU;el('rect',{x:wall-30*SU,y:y-120*SU,width:30*SU,height:200*SU,fill:TH.dim},g);el('line',{x1:wall,y1:y+bs/2+4*SU,x2:B[0]+B[2]*.9,y2:y+bs/2+4*SU,stroke:TH.dim,'stroke-width':3},g);
  el('line',{x1:eqx,y1:y-90*SU,x2:eqx,y2:y+80*SU,stroke:TH.dim,'stroke-dasharray':'6 6'},g);textEl(g,'x = 0',eqx,y-100*SU,{size:22*SU,anchor:'middle',color:'dim',fam:MONOF});
  const sp=el('polyline',{fill:'none',stroke:col('a1'),'stroke-width':f2(4*SU),'stroke-linejoin':'round'},g);const blk=el('g',{},g);if(it.object)body(blk,it,bs/2,col('a2'));else{el('rect',{x:-bs/2,y:-bs/2,width:bs,height:bs,rx:12*SU,fill:col('a2'),filter:'url(#glowS)'},blk);textEl(blk,`${m} kg`,0,10*SU,{size:28*SU,anchor:'middle',color:'#111',weight:800})}
  const eb=el('g',{},g);const ebx=B[0]+B[2]*.92,eby=B[1]+B[3]*.2,ebh=B[3]*.55;const keR=el('rect',{x:ebx-70*SU,width:40*SU,fill:col('a3')},eb),peR=el('rect',{x:ebx-20*SU,width:40*SU,fill:col('a1')},eb);textEl(eb,'Eₖ',ebx-50*SU,eby+ebh+32*SU,{size:24*SU,anchor:'middle',color:'a3'});textEl(eb,'Eₚ',ebx,eby+ebh+32*SU,{size:24*SU,anchor:'middle',color:'a1'});
  const ro=it.readout!==false?readout(g,B[0]+B[2]*.8,B[1],[['x',2,'m','a2'],['v',2,'m/s','a4'],['T',2,'s','a1']]):null;const gr=GB?graphStrip(g,GB,{label:'t, s',ylabel:'x',T:it.graphT||10,ymin:-Math.abs(x0)*1.1,ymax:Math.abs(x0)*1.1,color:'a2'}):null;const E0=.5*k*x0*x0;
  return {g,update(lt,p,st){const t=simT(lt,st,it);const [x,v]=S.at(t);const bx=eqx+x*sc;g.__tk=[bx,y];blk.setAttribute('transform',`translate(${f2(bx)} ${f2(y)})`);const n=14,pts=[[wall,y]];const L=bx-bs/2-wall;for(let i=1;i<n;i++)pts.push([wall+L*i/n,y+(i%2?-30:30)*SU]);pts.push([bx-bs/2,y]);sp.setAttribute('points',pts.map(q=>q.map(f2).join(',')).join(' '));
    const ke=.5*m*v*v/E0,pe=.5*k*x*x/E0;at(keR,{y:f2(eby+ebh*(1-ke)),height:f2(ebh*ke)});at(peR,{y:f2(eby+ebh*(1-pe)),height:f2(ebh*pe)});ro&&ro([x,v,2*Math.PI*Math.sqrt(m/k)]);gr&&gr(tt=>S.at(tt)[0],t)},noDraw:true}}};
// PROJECTILE (optional air drag), trace, velocity components, apex & range
SM.items.projectile={build(it){const g=el('g');const B=boxOf(it);const v0=it.v0||20,a=(it.angle??45)*Math.PI/180,g0=it.g||9.81,h0=it.h0||0,kd=it.drag||0;
  const S=simulate((t,[x,y,vx,vy])=>{const v=Math.hypot(vx,vy);return [vx,vy,-kd*v*vx,-g0-kd*v*vy]},[0,h0,v0*Math.cos(a),v0*Math.sin(a)],40,1/480);let tf=0;for(let i=1;i<S.out.length;i++){if(S.out[i][1]<0){tf=i*S.dt;break}}if(!tf)tf=40;
  let R=0,H=h0;for(let i=0;i<tf/S.dt;i++){R=Math.max(R,S.out[i][0]);H=Math.max(H,S.out[i][1])}const sc=Math.min(B[2]*.86/Math.max(R,1),B[3]*.7/Math.max(H,1));const ox=B[0]+B[2]*.06,oy=B[1]+B[3]*.88;const P=(x,y)=>[ox+x*sc,oy-y*sc];
  el('line',{x1:B[0],y1:oy,x2:B[0]+B[2],y2:oy,stroke:TH.dim,'stroke-width':3},g);for(let k=0;k<=10;k++){const gx=ox+R*sc*k/10;el('line',{x1:gx,y1:oy,x2:gx,y2:oy+10*SU,stroke:TH.dim},g)}
  if(h0>0)el('rect',{x:ox-60*SU,y:oy-h0*sc,width:60*SU,height:h0*sc,fill:TH.faint,stroke:TH.dim},g);
  const path=el('polyline',{fill:'none',stroke:col('a1'),'stroke-width':f2(4*SU),'stroke-dasharray':`${2*SU} ${10*SU}`,'stroke-linecap':'round'},g);const ghosts=el('g',{},g);
  const pre=dr(el('polyline',{fill:'none',stroke:TH.faint,'stroke-width':f2(2*SU),points:[...Array(61)].map((_,i)=>P(...S.at(tf*i/60).slice(0,2)).map(f2).join(',')).join(' ')},g));
  const ap=S.out.reduce((b,s)=>s[1]>b[1]?s:b,S.out[0]);const [apx,apy]=P(ap[0],ap[1]);const apG=el('g',{opacity:0},g);el('line',{x1:apx,y1:apy,x2:apx,y2:oy,stroke:col('a2'),'stroke-dasharray':'6 6','stroke-width':2},apG);textEl(apG,`h max = ${H.toFixed(1)} m`,apx+14*SU,apy-16*SU,{size:26*SU,color:'a2',fam:MONOF});
  const rG=el('g',{opacity:0},g);const [rx]=P(R,0);el('line',{x1:ox,y1:oy+34*SU,x2:rx,y2:oy+34*SU,stroke:col('a4'),'stroke-width':3,'marker-end':arrowMarker('a4'),'marker-start':arrowMarker('a4')},rG);textEl(rG,`L = ${R.toFixed(1)} m`,(ox+rx)/2,oy+70*SU,{size:26*SU,anchor:'middle',color:'a4',fam:MONOF});
  const vx=el('line',{stroke:col('a4'),'stroke-width':f2(4*SU),'marker-end':arrowMarker('a4')},g),vy=el('line',{stroke:col('a3'),'stroke-width':f2(4*SU),'marker-end':arrowMarker('a3')},g);const bg=el('g',{},g);body(bg,it,22*SU,col(it.color||'a2'));
  const ro=it.readout!==false?readout(g,B[0]+B[2],B[1],[['t',2,'s','ink'],['x',1,'m','a4'],['y',1,'m','a3'],['v',1,'m/s','a1']]):null;
  return {g,update(lt,p,st){const t=Math.min(simT(lt,st,it),tf);const s=S.at(t);const [bx,by]=P(s[0],Math.max(0,s[1]));g.__tk=[bx,by];bg.setAttribute('transform',`translate(${f2(bx)} ${f2(by)})`);
    const pts=[];const n=Math.max(2,Math.floor(t/tf*120));for(let i=0;i<=n;i++){const q=S.at(t*i/n);pts.push(P(q[0],Math.max(0,q[1])).map(f2).join(','))}path.setAttribute('points',pts.join(' '));
    while(ghosts.childNodes.length<Math.floor(t/(tf/12)))  {const q=S.at(ghosts.childNodes.length*(tf/12));const [gx,gy]=P(q[0],q[1]);el('circle',{cx:f2(gx),cy:f2(gy),r:f2(7*SU),fill:col('a1'),'fill-opacity':.4},ghosts)}
    while(ghosts.childNodes.length>Math.floor(t/(tf/12)))ghosts.lastChild.remove();
    const vs=sc*.35*(it.vectorScale||1);at(vx,{x1:f2(bx),y1:f2(by),x2:f2(bx+s[2]*vs),y2:f2(by),opacity:t<tf?1:0});at(vy,{x1:f2(bx),y1:f2(by),x2:f2(bx),y2:f2(by-s[3]*vs),opacity:t<tf&&Math.abs(s[3])>.5?1:0});
    const tap=ap?S.out.indexOf(ap)*S.dt:0;apG.setAttribute('opacity',f2(prog(t,tap,tap+.3)));rG.setAttribute('opacity',f2(prog(t,tf-.01,tf+.0)));ro&&ro([t,s[0],Math.max(0,s[1]),Math.hypot(s[2],s[3])])},noDraw:true}}};
// COLLISION 1D (elastic e=1 … inelastic e=0)
SM.items.collision={build(it){const g=el('g');const B=boxOf(it);const m1=it.m1||2,m2=it.m2||1,u1=it.v1??3,u2=it.v2??-1,e=it.e??1;const w1=90*SU*Math.cbrt(m1),w2=90*SU*Math.cbrt(m2);
  const v1=((m1-e*m2)*u1+(1+e)*m2*u2)/(m1+m2),v2=((m2-e*m1)*u2+(1+e)*m1*u1)/(m1+m2);const L=10,sc=B[2]/L,x10=2,x20=7;const gap=(x20-x10)*sc-(w1+w2)/2;const tc=gap/((u1-u2)*sc);
  const y=B[1]+B[3]*.6;el('line',{x1:B[0],y1:y,x2:B[0]+B[2],y2:y,stroke:TH.dim,'stroke-width':3},g);
  const mk=(w,c,m)=>{const b=el('g',{},g);el('rect',{x:-w/2,y:-w,width:w,height:w,rx:10*SU,fill:col(c),filter:'url(#glowS)'},b);textEl(b,`${m} kg`,0,-w/2+10*SU,{size:26*SU,anchor:'middle',color:'#111',weight:800});return b};
  const b1=mk(w1,'a2',m1),b2=mk(w2,'a1',m2);const a1=el('line',{stroke:col('a4'),'stroke-width':f2(5*SU),'marker-end':arrowMarker('a4')},g),a2=el('line',{stroke:col('a4'),'stroke-width':f2(5*SU),'marker-end':arrowMarker('a4')},g);
  const fl=el('circle',{r:60*SU,fill:col('a2'),filter:'url(#blur24)',opacity:0},g);
  const ro=readout(g,B[0]+B[2],B[1],[['v₁',2,'m/s','a2'],['v₂',2,'m/s','a1'],['p',2,'kg·m/s','a4'],['Eₖ',2,'J','a3']]);
  return {g,update(lt,p,st){const t=simT(lt,st,it);const before=t<tc;const x1=B[0]+x10*sc+(before?u1*t:u1*tc+v1*(t-tc))*sc,x2=B[0]+x20*sc+(before?u2*t:u2*tc+v2*(t-tc))*sc;
    b1.setAttribute('transform',`translate(${f2(x1)} ${y})`);b2.setAttribute('transform',`translate(${f2(x2)} ${y})`);const inb=(x,w)=>f2(clamp(1-Math.max(B[0]+w/2-x,x-(B[0]+B[2]-w/2),0)/(w*.8)));b1.setAttribute('opacity',inb(x1,w1));b2.setAttribute('opacity',inb(x2,w2));const va=before?u1:v1,vb=before?u2:v2;
    at(a1,{x1:f2(x1),y1:f2(y-w1-30*SU),x2:f2(x1+va*40*SU),y2:f2(y-w1-30*SU),opacity:Math.abs(va)>.05?1:0});at(a2,{x1:f2(x2),y1:f2(y-w2-30*SU),x2:f2(x2+vb*40*SU),y2:f2(y-w2-30*SU),opacity:Math.abs(vb)>.05?1:0});
    at(fl,{cx:f2(x1+w1/2),cy:f2(y-w1/2),opacity:f2(Math.max(0,1-Math.abs(t-tc)/.25)*.9)});ro([va,vb,m1*va+m2*vb,.5*m1*va*va+.5*m2*vb*vb])},noDraw:true}}};
// ORBIT (Kepler ellipse with equal-area sectors) or circular multi-planet system
function kepler(M,e){let E=M;for(let i=0;i<8;i++)E=E-(E-e*Math.sin(E)-M)/(1-e*Math.cos(E));return E}
SM.items.orbit={build(it){const g=el('g');const B=boxOf(it);const cx=B[0]+B[2]/2,cy=B[1]+B[3]/2;
  const sunR=(it.sunSize||46)*SU;const sun=el('g',{},g);el('circle',{cx:0,cy:0,r:sunR*2.2,fill:col('a2'),filter:'url(#blur24)',opacity:.6},sun);el('circle',{cx:0,cy:0,r:sunR,fill:gradient([[0,'#fff'],[.4,'a2'],[1,'#ff7a1a']],{radial:true})},sun);
  if(it.planets){sun.setAttribute('transform',`translate(${cx} ${cy})`);const maxA=Math.max(...it.planets.map(p=>p.a||1));const sc=Math.min(B[2],B[3])*.46/maxA;
    const ps=it.planets.map((p,i)=>{const r=(p.a||1)*sc;dr(el('ellipse',{cx,cy,rx:r,ry:r*(it.tilt??1),fill:'none',stroke:TH.faint,'stroke-width':2},g));const b=el('g',{},g);if(p.src&&SIMG[p.src])el('image',{href:SIMG[p.src].src,width:(p.size||24)*2*SU,height:(p.size||24)*2*SU,x:-(p.size||24)*SU,y:-(p.size||24)*SU},b);else el('circle',{r:(p.size||14)*SU,fill:col(p.color||['a1','a4','a3','a5'][i%4]),filter:'url(#glowS)'},b);
      if(p.name)textEl(b,p.name,0,-(p.size||14)*SU-12*SU,{size:22*SU,anchor:'middle',color:'dim'});return {b,r,T:p.period||(Math.pow(p.a||1,1.5)*(it.yearSec||6)),ph:seeded(i,9)*TAU}});
    return {g,update(lt){ps.forEach(o=>{const a=o.ph+lt/o.T*TAU;o.b.setAttribute('transform',`translate(${f2(cx+Math.cos(a)*o.r)} ${f2(cy+Math.sin(a)*o.r*(it.tilt??1))})`)})},noDraw:true}}
  const e=it.e??.5,T=it.period||6;const aPx=Math.min(B[2]*.42,B[3]*.46/Math.sqrt(1-e*e)),bPx=aPx*Math.sqrt(1-e*e),cf=aPx*e;const fx=cx+cf;sun.setAttribute('transform',`translate(${fx} ${cy})`);
  dr(el('ellipse',{cx,cy,rx:aPx,ry:bPx,fill:'none',stroke:col('a1'),'stroke-width':f2(3*SU),'stroke-opacity':.7},g));const pos=tt=>{const M=(tt/T)*TAU,E2=kepler(M,e);return [cx+aPx*Math.cos(E2),cy+bPx*Math.sin(E2)]};
  const sectors=el('g',{},g);const N=it.areas?6:0;const sec=[];for(let k=0;k<N;k++){const pts=[[fx,cy]];for(let j=0;j<=12;j++)pts.push(pos((k+j/12/2)*T/N*1));sec.push(el('polygon',{points:pts.map(q=>q.map(f2).join(',')).join(' '),fill:col(k%2?'a1':'a5'),'fill-opacity':.25,opacity:0},sectors))}
  const rv=el('line',{stroke:TH.dim,'stroke-width':2,'stroke-dasharray':'6 6'},g);const vv=el('line',{stroke:col('a4'),'stroke-width':f2(4*SU),'marker-end':arrowMarker('a4')},g);const pb=el('g',{},g);body(pb,it,20*SU,col(it.color||'a1'));
  const ro=it.readout!==false?readout(g,B[0]+B[2],B[1],[['r',2,'a','a5'],['v',2,'v₀','a4']]):null;
  return {g,update(lt,p,st){const t=simT(lt,st,it);const [x,y]=pos(t);g.__tk=[x,y];pb.setAttribute('transform',`translate(${f2(x)} ${f2(y)})`);at(rv,{x1:fx,y1:cy,x2:f2(x),y2:f2(y)});const [x2,y2]=pos(t+.02);const sp=Math.hypot(x2-x,y2-y)/.02;
    at(vv,{x1:f2(x),y1:f2(y),x2:f2(x+(x2-x)/.02*.25),y2:f2(y+(y2-y)/.02*.25)});sec.forEach((s,k)=>s.setAttribute('opacity',f2(prog(t,k*T/N*1+T/N/2*0,(k*T/N)+.4)*(t>=k*T/N?1:0))));
    const r=Math.hypot(x-fx,y-cy)/aPx;ro&&ro([r,sp/(TAU*aPx/T)])},noDraw:true}}};
// WAVES: transverse | longitudinal | standing | superposition
SM.items.wave={build(it){const g=el('g');const B=boxOf(it);const k=it.kind||'transverse';const A=(it.A||1),lam=it.wavelength||1,f=it.f||.5;const x0=B[0]+20*SU,W=B[2]-40*SU,cy=B[1]+B[3]/2,Ap=Math.min(B[3]*.3,130*SU)*A/Math.max(1,A);
  const nW=it.waves||2.5,kk=TAU*nW/W,om=TAU*f;el('line',{x1:x0,y1:cy,x2:x0+W,y2:cy,stroke:TH.faint,'stroke-width':2},g);
  const mkLine=(c,w=5)=>el('path',{fill:'none',stroke:col(c),'stroke-width':f2(w*SU),'stroke-linecap':'round',filter:'url(#glowS)'},g);
  const main=mkLine(it.color||'a1');const l2=k==='superposition'?mkLine('a3',3):null,l3=k==='superposition'?mkLine('a5',3):null;if(l2){l2.setAttribute('stroke-opacity',.6);l3.setAttribute('stroke-opacity',.6);g.appendChild(main)}
  const N=k==='longitudinal'?60:24;const parts=[...Array(N)].map((_,i)=>el(k==='longitudinal'?'line':'circle',k==='longitudinal'?{stroke:col('a2'),'stroke-width':f2(4*SU)}:{r:f2(7*SU),fill:col('a2')},g));
  const nodes=k==='standing'?[...Array(Math.floor(nW*2)+1)].map((_,i)=>el('circle',{cx:f2(x0+i*Math.PI/kk),cy,r:f2(9*SU),fill:'none',stroke:col('a3'),'stroke-width':3},g)):[];
  if(it.annotate!==false&&(k==='transverse')){const lg=el('g',{},g);const xa=x0+W*.1,xb=xa+TAU/kk;el('line',{x1:xa,y1:cy-Ap-40*SU,x2:xb,y2:cy-Ap-40*SU,stroke:col('a4'),'stroke-width':3,'marker-end':arrowMarker('a4'),'marker-start':arrowMarker('a4')},lg);textEl(lg,'λ',(xa+xb)/2,cy-Ap-55*SU,{size:36*SU,anchor:'middle',color:'a4',fam:MATHF,italic:true});
    el('line',{x1:x0+W*.92,y1:cy,x2:x0+W*.92,y2:cy-Ap,stroke:col('a3'),'stroke-width':3,'marker-end':arrowMarker('a3')},lg);textEl(lg,'A',x0+W*.92+14*SU,cy-Ap/2,{size:36*SU,color:'a3',fam:MATHF,italic:true})}
  return {g,update(lt,p,st){const t=lt-st;const rev=E.outCubic(prog(lt,st,st+1.2));const y=(x,tt)=>{const u=x-x0;if(k==='standing')return 2*Ap*.5*Math.sin(kk*u)*Math.cos(om*tt);if(k==='superposition')return Ap*.5*Math.sin(kk*u-om*tt)+Ap*.5*Math.sin(kk*1.5*u+om*.6*tt);return Ap*Math.sin(kk*u-om*tt)};
    const path=fn=>{let d='';for(let x=x0;x<=x0+W*rev;x+=6*SU)d+=(d?'L':'M')+f2(x)+','+f2(cy-fn(x));return d};
    if(k==='longitudinal'){main.setAttribute('d','');parts.forEach((l,i)=>{const xe=x0+i*W/(N-1),dx=Ap*.35*Math.sin(kk*(xe-x0)-om*t);at(l,{x1:f2(xe+dx),y1:f2(cy-60*SU),x2:f2(xe+dx),y2:f2(cy+60*SU),opacity:f2(xe<=x0+W*rev?1:0)})});return}
    main.setAttribute('d',path(x=>y(x,t)));if(l2){l2.setAttribute('d',path(x=>Ap*.5*Math.sin(kk*(x-x0)-om*t)));l3.setAttribute('d',path(x=>Ap*.5*Math.sin(kk*1.5*(x-x0)+om*.6*t)))}
    parts.forEach((c,i)=>{const xe=x0+i*W/(N-1);at(c,{cx:f2(xe),cy:f2(cy-y(xe,t)),opacity:f2(it.particles===false?0:(xe<=x0+W*rev?1:0))})})},noDraw:true}}};
// ELECTRIC FIELD lines from point charges (x,y in 0..1 of the area)
SM.items.field={build(it){const g=el('g');const B=boxOf(it);const Q=(it.charges||[{q:1,x:.35,y:.5},{q:-1,x:.65,y:.5}]).map(c=>({q:c.q,x:B[0]+c.x*B[2],y:B[1]+c.y*B[3]}));
  const Ef=(x,y)=>{let ex=0,ey=0;Q.forEach(c=>{const dx=x-c.x,dy=y-c.y,r2=dx*dx+dy*dy+1,r=Math.sqrt(r2);ex+=c.q*dx/(r2*r);ey+=c.q*dy/(r2*r)});return [ex,ey]};
  const lines=[];const nl=it.lines||16;Q.filter(c=>c.q>0||Q.every(q=>q.q<0)).forEach(c=>{for(let i=0;i<nl;i++){const a=i/nl*TAU;let x=c.x+Math.cos(a)*24*SU,y=c.y+Math.sin(a)*24*SU;const pts=[[x,y]];const sgn=c.q>0?1:-1;
    for(let s=0;s<900;s++){const [ex,ey]=Ef(x,y),m=Math.hypot(ex,ey)||1;x+=sgn*ex/m*6*SU;y+=sgn*ey/m*6*SU;pts.push([x,y]);if(x<B[0]||x>B[0]+B[2]||y<B[1]||y>B[1]+B[3])break;if(Q.some(o=>o!==c&&Math.hypot(x-o.x,y-o.y)<20*SU))break}
    if(pts.length>3)lines.push(pts)}});
  const ls=lines.map(pts=>{const pa=dr(el('path',{d:smoothOpen(pts.filter((_,i)=>i%2===0||i===pts.length-1)),fill:'none',stroke:col('a1'),'stroke-width':f2(2.5*SU),'stroke-opacity':.75},g));return pa});
  const flows=ls.map(pa=>flowDots(g,pa,{color:'a2',n:3,speed:.25,size:5*SU,glow:true}));
  Q.forEach(c=>{const cc=c.q>0?'a3':'a1';el('circle',{cx:c.x,cy:c.y,r:34*SU,fill:col(cc),filter:'url(#glowS)'},g);textEl(g,c.q>0?'+':'−',c.x,c.y+14*SU,{size:46*SU,anchor:'middle',color:'#fff',weight:800})});
  return {g,update(lt,p,st){flows.forEach(f=>f(lt,p))}}}};
// REFRACTION (Snell) with reflection & total internal reflection
SM.items.refraction={build(it){const g=el('g');const B=boxOf(it);const n1=it.n1||1,n2=it.n2||1.5;const cx=B[0]+B[2]/2,cy=B[1]+B[3]/2,R=Math.min(B[2],B[3])*.46;
  el('rect',{x:B[0],y:cy,width:B[2],height:B[3]/2,fill:col('a1'),'fill-opacity':.12},g);el('line',{x1:B[0],y1:cy,x2:B[0]+B[2],y2:cy,stroke:col('a1'),'stroke-width':3},g);el('line',{x1:cx,y1:cy-R,x2:cx,y2:cy+R,stroke:TH.dim,'stroke-dasharray':'8 8','stroke-width':2},g);
  textEl(g,`n₁ = ${n1}`,B[0]+20*SU,cy-24*SU,{size:28*SU,color:'dim',fam:MONOF});textEl(g,`n₂ = ${n2}`,B[0]+20*SU,cy+44*SU,{size:28*SU,color:'a1',fam:MONOF});
  const inc=el('line',{stroke:col('a2'),'stroke-width':f2(6*SU),filter:'url(#glowS)','marker-end':arrowMarker('a2')},g),ref=el('line',{stroke:col('a2'),'stroke-width':f2(3*SU),'stroke-opacity':.5},g),tr=el('line',{stroke:col('a2'),'stroke-width':f2(6*SU),filter:'url(#glowS)'},g);
  const arc1=el('path',{fill:'none',stroke:col('a4'),'stroke-width':3},g),arc2=el('path',{fill:'none',stroke:col('a3'),'stroke-width':3},g);const t1=textEl(g,'',0,0,{size:28*SU,color:'a4',fam:MONOF}),t2=textEl(g,'',0,0,{size:28*SU,color:'a3',fam:MONOF});
  return {g,update(lt,p,st){const sweep=it.sweep?lerp(it.angle??30,it.sweep,E.inOutCubic(prog(lt,st+1.5,st+1.5+(it.sweepDur||5)))):(it.angle??30);const a=sweep*Math.PI/180;
    const sx=cx-Math.sin(a)*R,sy=cy-Math.cos(a)*R;const q=E.outCubic(prog(lt,st,st+.8));at(inc,{x1:f2(sx),y1:f2(sy),x2:f2(lerp(sx,cx,q)),y2:f2(lerp(sy,cy,q))});const s2=n1/n2*Math.sin(a),on=prog(lt,st+.8,st+1.2);
    at(ref,{x1:cx,y1:cy,x2:f2(cx+Math.sin(a)*R*on),y2:f2(cy-Math.cos(a)*R*on),'stroke-opacity':Math.abs(s2)>1?1:.45});
    if(Math.abs(s2)<=1){const b=Math.asin(s2);at(tr,{x1:cx,y1:cy,x2:f2(cx+Math.sin(b)*R*on),y2:f2(cy+Math.cos(b)*R*on),opacity:1});const r2=70*SU;arc2.setAttribute('d',`M${cx},${cy+r2} A${r2},${r2} 0 0 0 ${f2(cx+Math.sin(b)*r2)},${f2(cy+Math.cos(b)*r2)}`);at(t2,{x:f2(cx+Math.sin(b/2)*(r2+20*SU)+6*SU),y:f2(cy+Math.cos(b/2)*(r2+20*SU)+24*SU)});t2.textContent=`θ₂ = ${(b*180/Math.PI).toFixed(1)}°`}
    else{at(tr,{opacity:0});arc2.setAttribute('d','');t2.textContent='to‘liq ichki qaytish';at(t2,{x:f2(cx+30*SU),y:f2(cy+60*SU)})}
    const r1=80*SU;arc1.setAttribute('d',`M${cx},${cy-r1} A${r1},${r1} 0 0 0 ${f2(cx-Math.sin(a)*r1)},${f2(cy-Math.cos(a)*r1)}`);at(t1,{x:f2(cx-Math.sin(a/2)*(r1+30*SU)-150*SU),y:f2(cy-Math.cos(a/2)*(r1+30*SU))});t1.textContent=`θ₁ = ${sweep.toFixed(1)}°`},noDraw:true}}};
// LENS (thin convex/concave lens, parallel rays → focus)
SM.items.lens={build(it){const g=el('g');const B=boxOf(it);const cx=B[0]+B[2]/2,cy=B[1]+B[3]/2,h=B[3]*.38,f=(it.f||.25)*B[2],cv=it.kind!=='concave';
  el('line',{x1:B[0],y1:cy,x2:B[0]+B[2],y2:cy,stroke:TH.dim,'stroke-width':2},g);dr(el('path',{d:cv?`M${cx},${cy-h} Q${cx+60*SU},${cy} ${cx},${cy+h} Q${cx-60*SU},${cy} ${cx},${cy-h}`:`M${cx-30*SU},${cy-h} L${cx+30*SU},${cy-h} Q${cx},${cy} ${cx+30*SU},${cy+h} L${cx-30*SU},${cy+h} Q${cx},${cy} ${cx-30*SU},${cy-h}`,fill:col('a1'),'fill-opacity':.2,stroke:col('a1'),'stroke-width':3},g));
  [[cx+f,'F′'],[cx-f,'F']].forEach(([x,l])=>{el('circle',{cx:x,cy,r:8*SU,fill:col('a3')},g);textEl(g,l,x,cy+40*SU,{size:30*SU,anchor:'middle',color:'a3',fam:MATHF,italic:true})});
  const rays=[...Array(it.rays||5)].map((_,i)=>{const yy=cy-h*.8+i*(h*1.6)/((it.rays||5)-1);const pts=cv?`M${B[0]},${yy} L${cx},${yy} L${B[0]+B[2]},${f2(yy+(cy-yy)/f*(B[0]+B[2]-cx))}`:`M${B[0]},${yy} L${cx},${yy} L${B[0]+B[2]},${f2(yy-(cy-yy)/f*(B[0]+B[2]-cx))}`;
    const pa=dr(el('path',{d:pts,fill:'none',stroke:col('a2'),'stroke-width':f2(3.5*SU),filter:'url(#glowS)'},g));if(!cv)dr(el('path',{d:`M${cx},${yy} L${cx-f},${cy}`,fill:'none',stroke:col('a2'),'stroke-width':2,'stroke-dasharray':'6 8','stroke-opacity':.6},g));return pa});
  return {g}}};
// INCLINED PLANE with friction and force vectors
SM.items.incline={build(it){const g=el('g');const B=boxOf(it);const th=(it.angle??30)*Math.PI/180,mu=it.mu??.2,g0=it.g||9.81,m=it.m||2;const a=Math.max(0,g0*(Math.sin(th)-mu*Math.cos(th)));const Lm=it.length||5;
  const W=B[2]*.8,Hh=Math.min(B[3]*.75,W*Math.tan(th));const W2=Hh/Math.tan(th);const x0=B[0]+B[2]*.08,y0=B[1]+B[3]*.92;dr(el('polygon',{points:`${x0},${y0} ${f2(x0+W2)},${y0} ${x0},${f2(y0-Hh)}`,fill:TH.faint,stroke:TH.dim,'stroke-width':3},g));
  textEl(g,`α = ${(th*180/Math.PI).toFixed(0)}°`,x0+W2-150*SU,y0-20*SU,{size:28*SU,color:'a2',fam:MONOF});const Lpx=Math.hypot(W2,Hh),sc=Lpx/Lm;const bs=90*SU;const ux=Math.cos(th),uy=Math.sin(th);
  const blk=el('g',{},g);if(it.object)body(blk,it,bs/2,col('a2'));else{el('rect',{x:-bs/2,y:-bs,width:bs,height:bs,rx:10*SU,fill:col('a2')},blk);textEl(blk,`${m} kg`,0,-bs/2+10*SU,{size:24*SU,anchor:'middle',color:'#111',weight:800})}
  const vec=(c)=>el('line',{stroke:col(c),'stroke-width':f2(5*SU),'marker-end':arrowMarker(c),'stroke-linecap':'round'},g);const vg=vec('a3'),vn=vec('a1'),vf=vec('a4');const lg=textEl(g,'mg',0,0,{size:26*SU,color:'a3',fam:MATHF,italic:true}),ln=textEl(g,'N',0,0,{size:26*SU,color:'a1',fam:MATHF,italic:true}),lf=textEl(g,'F_ish',0,0,{size:26*SU,color:'a4',fam:MATHF,italic:true});lf.textContent='Fₛ';
  const ro=readout(g,B[0]+B[2],B[1],[['a',2,'m/s²','a2'],['v',2,'m/s','a4'],['s',2,'m','ink']]);
  return {g,update(lt,p,st){const t=simT(lt,st,it);let s=.5*a*t*t;if(s>Lm-.6)s=Lm-.6;const v=Math.sqrt(2*a*s);const px=x0+s*sc*ux,py=y0-Hh+s*sc*uy;g.__tk=[px,py];blk.setAttribute('transform',`translate(${f2(px)} ${f2(py)}) rotate(${f2(th*180/Math.PI)})`);
    const cxb=px+Math.sin(th)*bs/2,cyb=py-Math.cos(th)*bs/2,F=110*SU;at(vg,{x1:f2(cxb),y1:f2(cyb),x2:f2(cxb),y2:f2(cyb+F)});at(lg,{x:f2(cxb+10*SU),y:f2(cyb+F+30*SU)});const nx=Math.sin(th),ny=-Math.cos(th);at(vn,{x1:f2(cxb),y1:f2(cyb),x2:f2(cxb+nx*F*Math.cos(th)),y2:f2(cyb+ny*F*Math.cos(th))});at(ln,{x:f2(cxb+nx*F+10*SU),y:f2(cyb+ny*F)});
    const ff=F*mu*Math.cos(th)*1.6;at(vf,{x1:f2(cxb),y1:f2(cyb),x2:f2(cxb-ux*ff),y2:f2(cyb-uy*ff),opacity:mu>0?1:0});at(lf,{x:f2(cxb-ux*ff-40*SU),y:f2(cyb-uy*ff-10*SU),opacity:mu>0?1:0});ro([a,v,s])},noDraw:true}}};
// SIMPLE CIRCUIT: battery + resistor + bulb, electron flow ∝ current
SM.items.circuit={build(it){const g=el('g');const B=boxOf(it);const V=it.V||9,R=it.R||3,I=V/R;const x=B[0]+B[2]*.15,y=B[1]+B[3]*.15,w=B[2]*.7,h=B[3]*.7;
  const loop=dr(el('rect',{x,y,width:w,height:h,rx:30*SU,fill:'none',stroke:TH.ink,'stroke-width':f2(6*SU)},g));
  el('rect',{x:x-30*SU,y:y+h/2-60*SU,width:60*SU,height:120*SU,fill:TH.bg},g);el('line',{x1:x-40*SU,y1:y+h/2-20*SU,x2:x+40*SU,y2:y+h/2-20*SU,stroke:TH.ink,'stroke-width':f2(8*SU)},g);el('line',{x1:x-22*SU,y1:y+h/2+20*SU,x2:x+22*SU,y2:y+h/2+20*SU,stroke:TH.ink,'stroke-width':f2(8*SU)},g);textEl(g,`${V} V`,x-60*SU,y+h/2+10*SU,{size:30*SU,anchor:'end',color:'a2',fam:MONOF});
  el('rect',{x:x+w/2-90*SU,y:y-20*SU,width:180*SU,height:40*SU,fill:TH.bg},g);el('polyline',{points:[...Array(9)].map((_,i)=>`${f2(x+w/2-90*SU+i*22.5*SU)},${f2(y+(i===0||i===8?0:(i%2?-18:18)*SU))}`).join(' '),fill:'none',stroke:col('a1'),'stroke-width':f2(6*SU)},g);textEl(g,`${R} Ω`,x+w/2,y-40*SU,{size:30*SU,anchor:'middle',color:'a1',fam:MONOF});
  const bx=x+w,by=y+h/2;el('circle',{cx:bx,cy:by,r:46*SU,fill:TH.bg,stroke:TH.ink,'stroke-width':f2(5*SU)},g);const bulb=el('circle',{cx:bx,cy:by,r:40*SU,fill:col('a2'),filter:'url(#glow2)',opacity:0},g);el('path',{d:`M${bx-20*SU},${by+20*SU} L${bx-8*SU},${by-14*SU} L${bx+8*SU},${by+14*SU} L${bx+20*SU},${by-20*SU}`,fill:'none',stroke:TH.ink,'stroke-width':3},g);
  const fl=flowDots(g,loop,{color:'a4',n:18,speed:.06*I,size:7*SU});const ro=readout(g,B[0]+B[2],B[1],[['U',1,'V','a2'],['R',1,'Ω','a1'],['I',2,'A','a4'],['P',1,'W','a3']]);
  return {g,update(lt,p,st){fl(lt,p);bulb.setAttribute('opacity',f2(p>=1?Math.min(1,I*V/40)*(.85+.15*Math.sin(lt*20)):0));ro([V,R,I,V*I])}}}};
