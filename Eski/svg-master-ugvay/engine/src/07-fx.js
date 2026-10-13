/* ---------- EFFECTS (deterministic particles in SVG): fire, smoke, water, bubbles, rain, snow, sparks, lightning, rays, explosion ---------- */
const fxBox=it=>{if(it.x!=null)return [it.x-(it.w||200)/2,it.y-(it.h||300),it.w||200,it.h||300];return boxOf(it)};
SM.items.fire={build(it){const B=fxBox(it);const fw=Math.min(B[2],B[3]*.62)*(it.scale||1),fh=fw*1.45;const cx=B[0]+B[2]/2,base=B[1]+B[3]-(B[3]-Math.min(B[3],fh))*.15;const g=el('g',{style:'mix-blend-mode:screen'});
  const core=el('ellipse',{cx,cy:base-fh*.1,rx:fw*.55,ry:fh*.16,fill:'#FF6A1A',filter:'url(#blur24)',opacity:.7},g);
  const LAY=[['#E2401B',1,.55],['#FF7A22',.8,.8],['#FFB23F',.6,.9],['#FFF0B8',.36,1]];
  const tongues=[];LAY.forEach(([c,s,o],li)=>{for(let k=0;k<(li<2?3:2);k++)tongues.push({e:el('path',{fill:c,opacity:o,filter:li<3?'url(#blur4)':'url(#glowS)'},g),s:s*(k?(.62+seeded(li*7+k,2)*.25):1),off:k?(seeded(li*5+k,1)-.5)*fw*.45:0,li,k})});
  const N=it.n||28;const ps=[...Array(N)].map(()=>el('circle',{fill:'#FFD36E',filter:'url(#blur4)'},g));const embers=[...Array(16)].map(()=>el('circle',{r:f2(2.6*SU),fill:'#FFC36B',filter:'url(#glowS)'},g));
  const C=['#FFF3B0','#FFD36E','#FFA53D','#FF6A2A','#D7263D'];
  return {g,update(lt,p){const I=(it.intensity||1)*p;
    tongues.forEach((T,i)=>{const H=fh*T.s*(.9+.14*noise3(lt*2.2,i*3.1)),W=fw*T.s*.62;const n=18;let L=[],R=[];const bx=cx+T.off;
      for(let j=0;j<=n;j++){const u=j/n;const hw=W/2*Math.pow(1-u,.85)*Math.min(1,Math.sqrt(u*5+.25));const sway=noise3(lt*1.8-u*2.2,i*1.7)*fw*.22*u*u+noise3(lt*4-u*5,i+9)*fw*.04*u;const yy=base-u*H;L.push([bx+sway-hw,yy]);R.push([bx+sway+hw,yy])}
      const P=[...L,...R.reverse()];T.e.setAttribute('d',smoothClosed(P));T.e.setAttribute('opacity',f2(I*(T.li===3?1:.85)))});
    ps.forEach((c,i)=>{const life=.6+seeded(i,1)*.5,u=((lt/life+seeded(i,2))%1);const sx=cx+(seeded(i,3)-.5)*fw*.6;const xx=sx+(cx-sx)*u*.7+noise3(lt*3,i)*fw*.12*u,yy=base-fh*.15-u*fh*(.55+seeded(i,4)*.45);
      at(c,{cx:f2(xx),cy:f2(yy),r:f2(Math.max(.1,fw*.035*(1-u)*(.6+seeded(i,5)*.6))),fill:C[Math.min(4,1+Math.floor(u*4))],opacity:f2(I*(1-u)*.7)})});
    embers.forEach((c,i)=>{const life=1.4+seeded(i,6),u=((lt/life+seeded(i,7))%1);at(c,{cx:f2(cx+(seeded(i,8)-.5)*fw*.8+noise3(lt,i)*40*SU),cy:f2(base-fh*.3-u*fh*1.1),opacity:f2(I*(1-u)*(.5+.5*Math.sin(lt*9+i)))})});
    core.setAttribute('opacity',f2(I*(.55+.12*Math.sin(lt*13)+.08*Math.sin(lt*7.3))))}}}};
SM.items.smoke={build(it){const [x,y,w0,h]=fxBox(it);const w=Math.min(w0,h*.7);const g=el('g');const N=it.n||26,cx=x+w0/2,base=y+h;const ps=[...Array(N)].map(()=>el('circle',{fill:col(it.color||'#9AA3B5'),filter:'url(#blur10)'},g));
  return {g,update(lt,p){ps.forEach((c,i)=>{const life=3+seeded(i,1)*2,u=((lt/life+seeded(i,2))%1);at(c,{cx:f2(cx+(seeded(i,3)-.5)*w*.4+Math.sin(lt*.8+i)*w*.25*u+u*w*.2*(it.wind||0)),cy:f2(base-u*h),r:f2(w*.08+u*w*.28),opacity:f2(p*(it.density??.26)*Math.sin(Math.PI*u))})})}}}};
SM.items.water={build(it){const box=boxOf(it);const [x,y,w,h]=box;const lvl=y+h*(1-(it.level??.55));const g=el('g');const fill=gradient([[0,it.color||'a1',.55],[1,it.color||'a1',.15]]);
  const body=el('path',{fill},g),surf=el('path',{fill:'none',stroke:col(it.color||'a1'),'stroke-width':f2(4*SU),filter:'url(#glowS)'},g),surf2=el('path',{fill:'none',stroke:'#fff','stroke-opacity':.25,'stroke-width':f2(2*SU)},g);
  const bub=[...Array(it.bubbles??18)].map(()=>el('circle',{fill:'none',stroke:'#fff','stroke-opacity':.6,'stroke-width':2},g));const caus=[...Array(6)].map(()=>el('path',{fill:'none',stroke:'#fff','stroke-opacity':.08,'stroke-width':f2(10*SU),filter:'url(#blur4)'},g));
  return {g,update(lt){const A=(it.waves??1)*14*SU,yy=X=>lvl+A*(Math.sin(X/(120*SU)+lt*1.6)*.6+Math.sin(X/(57*SU)-lt*2.3)*.4);let d=`M${x},${f2(yy(x))}`,d2='';for(let X=x;X<=x+w;X+=12*SU){d+=` L${f2(X)},${f2(yy(X))}`;d2+=(d2?' L':'M')+f2(X)+','+f2(yy(X)+10*SU)}
    surf.setAttribute('d',d);surf2.setAttribute('d',d2);body.setAttribute('d',d+` L${x+w},${y+h} L${x},${y+h} Z`);
    bub.forEach((b,i)=>{const life=2.5+seeded(i,1)*2,u=((lt/life+seeded(i,2))%1);const bx=x+seeded(i,3)*w+Math.sin(lt*2+i)*8*SU,by=lerp(y+h-10*SU,lvl+10*SU,u);at(b,{cx:f2(bx),cy:f2(by),r:f2((4+seeded(i,4)*8)*SU),opacity:f2(Math.sin(Math.PI*u))})});
    caus.forEach((c,i)=>{const cy2=lvl+(h*(1-(it.level??.55)))*0+40*SU+i*((y+h-lvl)/6);let dd='';for(let X=x;X<=x+w;X+=40*SU)dd+=(dd?' L':'M')+f2(X)+','+f2(cy2+Math.sin(X/(90*SU)+lt*(1+i*.2)+i)*14*SU);c.setAttribute('d',dd)})}}}};
const precip=(kind)=>({build(it){const [x,y,w,h]=boxOf(it);const g=el('g');const N=it.n||(kind==='rain'?90:kind==='snow'?70:30);
  const ps=[...Array(N)].map(()=>kind==='rain'?el('line',{stroke:col(it.color||'a1'),'stroke-opacity':.6,'stroke-width':f2(2.5*SU),'stroke-linecap':'round'},g):el('circle',{fill:kind==='snow'?'#fff':'none',stroke:kind==='bubbles'?col(it.color||'a1'):'none','stroke-width':2},g));
  return {g,update(lt,p){ps.forEach((e,i)=>{const sp=kind==='rain'?1.1+seeded(i,1)*.6:kind==='snow'?.12+seeded(i,1)*.1:.2+seeded(i,1)*.2;let u=((lt*sp+seeded(i,2))%1);if(kind==='bubbles')u=1-u;
    const px=x+seeded(i,3)*w+(kind==='snow'?Math.sin(lt+i)*20*SU:0),py=y+u*h;if(kind==='rain')at(e,{x1:f2(px),y1:f2(py),x2:f2(px-6*SU),y2:f2(py+30*SU),opacity:f2(p)});else at(e,{cx:f2(px),cy:f2(py),r:f2((kind==='snow'?3:6+seeded(i,4)*10)*SU),opacity:f2(p*(kind==='snow'?.85:Math.sin(Math.PI*u)))})})}}}});
SM.items.rain=precip('rain');SM.items.snow=precip('snow');SM.items.bubbles=precip('bubbles');
SM.items.sparks={build(it){const cx=it.x??boxOf(it)[0]+boxOf(it)[2]/2,cy=it.y??boxOf(it)[1]+boxOf(it)[3]/2;const g=el('g',{style:'mix-blend-mode:screen'});const N=it.n||40;const ps=[...Array(N)].map(()=>el('line',{stroke:'#FFD36E','stroke-width':f2(3*SU),'stroke-linecap':'round',filter:'url(#glowS)'},g));
  return {g,update(lt,p){ps.forEach((l,i)=>{const life=.8+seeded(i,1)*.6,u=((lt/life+seeded(i,2))%1),a=-Math.PI/2+(seeded(i,3)-.5)*2.4,v=(300+seeded(i,4)*400)*SU;const tt=u*life;const x=cx+Math.cos(a)*v*tt,y=cy+Math.sin(a)*v*tt+.5*900*SU*tt*tt;const vx=Math.cos(a)*v,vy=Math.sin(a)*v+900*SU*tt;const L=.03;
    at(l,{x1:f2(x),y1:f2(y),x2:f2(x-vx*L),y2:f2(y-vy*L),opacity:f2(p*(1-u))})})}}}};
SM.items.lightning={build(it){const [x1,y1]=it.from||[960,100],[x2,y2]=it.to||[960,900];const g=el('g');const b=el('path',{fill:'none',stroke:'#fff','stroke-width':f2(4*SU),filter:'url(#glow2)'},g),b2=el('path',{fill:'none',stroke:col(it.color||'a1'),'stroke-width':f2(10*SU),'stroke-opacity':.5,filter:'url(#blur10)'},g);
  const flash=el('rect',{x:0,y:0,width:SW,height:SH,fill:'#fff',opacity:0},g);
  return {g,update(lt,p){const fr=Math.floor(lt*(it.rate||14));const n=18;let d=`M${x1},${y1}`;for(let k=1;k<=n;k++){const u=k/n,j=k===n?0:(seeded(fr*31+k,1)-.5)*(it.jitter||90)*SU;const nx=-(y2-y1),ny=x2-x1,L=Math.hypot(nx,ny);d+=` L${f2(lerp(x1,x2,u)+nx/L*j)},${f2(lerp(y1,y2,u)+ny/L*j)}`}
    const on=it.continuous?1:(seeded(fr,5)>.45?1:0);b.setAttribute('d',d);b2.setAttribute('d',d);b.setAttribute('opacity',f2(p*on));b2.setAttribute('opacity',f2(p*on));flash.setAttribute('opacity',f2(it.flash?p*on*.08:0))}}}};
SM.items.rays={build(it){const cx=it.x??SW/2,cy=it.y??SH/2;const g=el('g');const N=it.n||16,R=(it.r||900)*SU;const rays=[...Array(N)].map((_,i)=>el('path',{fill:col(it.color||'a2'),'fill-opacity':.07},g));el('circle',{cx,cy,r:(it.core||60)*SU,fill:col(it.color||'a2'),filter:'url(#blur24)'},g);
  return {g,update(lt){rays.forEach((r,i)=>{const a=i/N*TAU+lt*.08,da=TAU/N*.32;r.setAttribute('d',`M${cx},${cy} L${f2(cx+Math.cos(a-da)*R)},${f2(cy+Math.sin(a-da)*R)} L${f2(cx+Math.cos(a+da)*R)},${f2(cy+Math.sin(a+da)*R)} Z`)})}}}};
SM.items.explosion={build(it){const cx=it.x??SW/2,cy=it.y??SH/2;const g=el('g',{style:'mix-blend-mode:screen'});const N=it.n||60;const ring=el('circle',{cx,cy,fill:'none',stroke:'#FFD36E','stroke-width':f2(8*SU),filter:'url(#glowS)'},g);const core=el('circle',{cx,cy,fill:'#FFF3B0',filter:'url(#blur24)'},g);
  const ps=[...Array(N)].map(()=>el('circle',{fill:'#FFA53D',filter:'url(#glowS)'},g));
  return {g,update(lt,p,st){const t=lt-(it.at??st);if(t<0){g.setAttribute('opacity',0);return}g.setAttribute('opacity',1);const q=E.outExpo(clamp(t/1.2));at(ring,{r:f2(q*(it.r||420)*SU),opacity:f2(1-q)});at(core,{r:f2((1-q)*180*SU+20*SU),opacity:f2(1-clamp(t/.8))});
    ps.forEach((c,i)=>{const a=seeded(i,1)*TAU,v=(it.r||420)*SU*(.4+seeded(i,2)*.8);const d=E.outCubic(clamp(t/1.4))*v;at(c,{cx:f2(cx+Math.cos(a)*d),cy:f2(cy+Math.sin(a)*d+t*t*60*SU),r:f2((1-clamp(t/1.6))*10*SU+.1),opacity:f2(1-clamp(t/1.6))})})}}}};
SM.items.glowOrb={build(it){const g=el('g');const c=col(it.color||'a1');el('circle',{cx:it.x,cy:it.y,r:(it.r||60)*SU*2.2,fill:c,filter:'url(#blur24)',opacity:.5},g);const core=el('circle',{cx:it.x,cy:it.y,r:(it.r||60)*SU,fill:gradient([[0,'#fff'],[.5,c],[1,c,.2]],{radial:true})},g);
  return {g,update(lt){core.setAttribute('r',f2((it.r||60)*SU*(1+.05*Math.sin(lt*3))))}}}};
