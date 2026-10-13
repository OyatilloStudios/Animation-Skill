/* ---------- ITEM SYSTEM ---------- */
SM.items={};
const DEF_ANIM={text:'rise',formula:'write',label:'pop',image:'fade',arrow:'draw',shape:'draw',svg:'draw'};
// mark element as drawable (stroke draw-on)
function dr(e,len=1){e.setAttribute('pathLength',len);e.classList.add('dr');return e}
function textEl(parent,s,x,y,{size=34,weight=600,color,anchor='start',fam=FONT,accent,italic=false,ls=0}={}){
  const t=el('text',{x:f2(x),y:f2(y),'font-size':f2(size),'font-weight':weight,'font-family':fam,fill:col(color),'text-anchor':anchor,'font-style':italic?'italic':'normal','letter-spacing':ls||undefined},parent);richT(t,s,col(accent||'a1'));return t}
function panel(parent,x,y,w,h,{r=14,fill,stroke,sw=1.5}={}){return el('rect',{x:f2(x),y:f2(y),width:f2(w),height:f2(h),rx:f2(r*SU),fill:fill||TH.panel,stroke:stroke?col(stroke):TH.faint,'stroke-width':f2(sw*SU)},parent)}
// TEXT — paragraph / bullets; auto-wrap + auto-fit inside its area, hanging indent for bullets,
// typography from TYPO (fx / emph / fxOut), paragraphs reveal in reading order, pinned to the screen (camera never cuts it)
const TX_ANIM={fade:'fade',rise:'rise',pop:'pop',zoom:'zoom-in',grow:'zoom-in','slide-left':'slide-left','slide-right':'slide-right',draw:'ink',lines:null};
SM.items.text={build(it,ctx){const [x,y,w,h]=boxOf(it);let size=(it.size||42)*SU;const weight=it.weight||(size>60*SU?800:500);const lhK=it.lh||1.3;const al=it.align||'left';
  const pars=String(it.text||'').split('\n');const isB=p=>/^\s*[-•]\s+/.test(p);const bul=it.bullets||pars.filter(p=>p.trim()).every(isB)&&pars.some(isB);
  const lay=sz=>{const out=[];const ind=al==='left'?tw('• ',sz,weight):0;pars.forEach((par,pi)=>{const b=bul&&isB(par);const body=b?par.replace(/^\s*[-•]\s+/,''):par;if(!body.trim()){out.push({s:'',p:pi,gap:1});return}
    const ww=wrapText(body,sz,b?w-ind:w,weight);let open=false;ww.forEach((l,k)=>{let s=(open?'*':'')+l;const n=(s.match(/\*/g)||[]).length;open=n%2===1;if(open)s+='*';out.push({s:(b&&k===0?'• ':'')+s,p:pi,ind:b&&k>0?ind:0})})});return out};
  const hOf=ls=>ls.reduce((a,l)=>a+(l.gap?.45:1),0)*size*lhK;let lines=lay(size);
  if(it.fit!==false){const minS=(it.minSize||20)*SU;while(size>minS&&(hOf(lines)>h||lines.some(l=>tw(l.s.replace(/\*/g,''),size,weight)+l.ind>w+1))){size*=.94;lines=lay(size)}if(hOf(lines)>h)SERR_WARN.push(`text '${String(it.text).slice(0,30)}...' does not fit its area even at ${Math.round(size)} px: shorten it or use a bigger area`)}
  const lh=size*lhK,ax=al==='center'?x+w/2:al==='right'?x+w:x,anchor=al==='center'?'middle':al==='right'?'end':'start';const total=hOf(lines);
  let yy=it.valign==='top'?y+size:it.valign==='bottom'?y+h-total+size:y+h/2-total/2+size*.8;const g=el('g');
  const L=[];lines.forEach(l=>{if(!l.gap)L.push({s:l.s,x:ax+(l.ind||0),y:yy,size,weight,color:it.color,accent:it.accent,anchor,p:l.p});yy+=(l.gap?.45:1)*lh});
  const S=ctx&&ctx.scene||{};const T={...(typeof LSN.typo==='object'?LSN.typo:{}),...(typeof S.typo==='object'?S.typo:{})};const auto=LSN.typo!==false&&S.typo!==false;
  const legacy=it.anim&&it.anim in TX_ANIM?TX_ANIM[it.anim]:undefined;
  const fin=it.fx||it.in||(it.anim==='none'?null:legacy)||T.text||(auto?TYPO.pick('text',(S.i||0)*7+3):'rise');
  const hasAcc=/\*[^*]+\*/.test(it.text||'');const fem=it.emph||(T.emph)||(auto&&hasAcc&&it.emph!==false?TYPO.pick('emph',(S.i||0)*5+1):null);
  const fout=it.fxOut||it.outFx||T.out||null;
  const B=TYPO.block(g,L,{in:fin,emph:fem||undefined,out:fout||undefined,step:it.step??(bul?.55:.4),emphAt:it.emphAt,outAt:fout?(it.out!=null?'abs':'end'):undefined,mark:it.mark,ring:it.ring});
  return {g,selfAnim:true,selfOut:!!fout,pin:it.pin!==false,noDraw:true,len:()=>B.len,update(lt,p,st,dur){if(B.spec.outAt==='abs')B.spec.outAt=it.out-st;B.update(lt,st,dur)}}}};
// FORMULA — TeX subset, "write" reveals left→right
SM.items.formula={build(it){const box=boxOf(it);const size=(it.size||64)*SU;const B=mathBox(it.tex,size,{chem:it.chem});const g=el('g');
  let s=1;if(B.w>box[2]*.96)s=box[2]*.96/B.w;const al=it.align||'center';const x=al==='left'?box[0]:al==='right'?box[0]+box[2]-B.w*s:box[0]+box[2]/2-B.w*s/2,y=box[1]+box[3]/2+(B.a-B.d)/2*s;
  const inner=el('g',{transform:`translate(${f2(x)} ${f2(y)}) scale(${f2(s)})`},g);
  if(it.panel!==false&&it.boxed){const pb=panel(g,x-30*SU,y-B.a*s-24*SU,B.w*s+60*SU,(B.a+B.d)*s+48*SU,{stroke:it.color||'a1'});g.insertBefore(pb,inner)}
  const id='clip'+Math.round(rnd(box[0]+box[1]+B.w)*1e9);const cp=el('clipPath',{id},DEFS);const cr=el('rect',{x:-10,y:-B.a-20,width:0,height:B.a+B.d+40},cp);
  const content=el('g',{'clip-path':`url(#${id})`},inner);B.draw(content,0,0,col(it.color||'ink'));
  g.setAttribute('data-tl-ignore','');return {g,anchor:[x+B.w*s/2,y],update(lt,p){cr.setAttribute('width',f2((B.w+20)*(it.anim==='write'||!it.anim?E.inOutCubic(p):1)))},noDraw:true}}};
// SHAPES — circle/rect/line/path/polygon/ellipse (stage coords) with draw-on
SM.items.shape={build(it){const g=el('g');const c=col(it.color||'a1'),sw=(it.width||4)*SU,fill=it.fill?col(it.fill):'none';const k=it.shape||'circle';let e;
  const st={stroke:c,'stroke-width':f2(sw),fill,'fill-opacity':it.fillOpacity??(it.fill?.9:undefined),'stroke-linecap':'round','stroke-linejoin':'round','stroke-dasharray':it.dashed?`${12*SU} ${10*SU}`:undefined};
  if(k==='circle')e=el('circle',{cx:it.x,cy:it.y,r:it.r||60,...st},g);else if(k==='ellipse')e=el('ellipse',{cx:it.x,cy:it.y,rx:it.rx||80,ry:it.ry||50,...st},g);
  else if(k==='rect')e=el('rect',{x:it.x,y:it.y,width:it.w||200,height:it.h||120,rx:it.rx||0,...st},g);else if(k==='line')e=el('line',{x1:it.x1,y1:it.y1,x2:it.x2,y2:it.y2,...st},g);
  else if(k==='polygon')e=el('polygon',{points:(it.points||[]).map(p=>p.join(',')).join(' '),...st},g);else e=el('path',{d:it.d||'',...st},g);
  if(!it.dashed)dr(e);if(it.glow)g.setAttribute('filter','url(#glow)');return {g}}};
// ARROW — straight or curved (curve: -1..1), optional label, flowing dots
SM.items.arrow={build(it){const g=el('g');const [x1,y1]=it.from,[x2,y2]=it.to,c=col(it.color||'ink'),cv=it.curve||0;const mx=(x1+x2)/2-(y2-y1)*cv*.5,my=(y1+y2)/2+(x2-x1)*cv*.5;
  const d=`M${x1},${y1} Q${f2(mx)},${f2(my)} ${x2},${y2}`;const p=dr(el('path',{d,fill:'none',stroke:c,'stroke-width':f2((it.width||4)*SU),'stroke-linecap':'round','marker-end':arrowMarker(it.color||'ink'),'marker-start':it.both?arrowMarker(it.color||'ink'):undefined},g));
  if(it.text){const t=textEl(g,it.text,mx,my-16*SU,{size:(it.size||28)*SU,anchor:'middle',color:it.textColor||it.color||'ink'});}
  let fl=null;if(it.flow){fl=flowDots(g,p,{color:it.flowColor||it.color||'a1',n:it.flowN||6,speed:it.flowSpeed||.5,r:6*SU})}
  if(it.glow)g.setAttribute('filter','url(#glowS)');return {g,update(lt,pp){fl&&fl(lt,pp)}}}};
// dots moving along a path (blood, current, energy). Returns update(lt,p)
function flowDots(g,path,{color='a1',n=8,speed=.4,r=6,glow=true,size}={}){let L=null;const dots=[];for(let i=0;i<n;i++)dots.push(el('circle',{r:f2(size||r),fill:col(color),filter:glow?'url(#glowS)':undefined,opacity:0},g));
  return (lt,p)=>{if(L===null){try{L=path.getTotalLength()}catch(e){return}}dots.forEach((d,i)=>{const u=((lt*speed+i/n)%1+1)%1;const pt=path.getPointAtLength(u*L);d.setAttribute('cx',f2(pt.x));d.setAttribute('cy',f2(pt.y));d.setAttribute('opacity',f2(p>=1?Math.sin(Math.PI*u)**.4:0))})}}
// RAW SVG markup (custom shapes from the AI), placed at x,y with scale
SM.items.svg={build(it){const g=el('g',{transform:`translate(${it.x||0} ${it.y||0}) scale(${it.scale||1})`});g.innerHTML=it.markup||'';g.querySelectorAll('path,line,polyline,polygon,circle,ellipse,rect').forEach(e=>{if(e.getAttribute('stroke')&&e.getAttribute('stroke')!=='none')dr(e)});if(it.glow)g.setAttribute('filter','url(#glow)');return {g}}};
// IMAGE — user photo/diagram; labels with x,y in 0..1 of the image; focus ring
SM.items.image={build(it){const box0=boxOf(it);const im=SIMG[it.src];const g=el('g');let iw=im?im.naturalWidth:1600,ih=im?im.naturalHeight:1000;const LB=(it.labels||[]).filter(l=>l&&l.text!=null);const ls=(it.labelSize||28)*SU;
  const mw=LB.length?Math.min(box0[2]*.28,Math.max(...LB.map(l=>tw(String(l.text),ls,600)))+70*SU):0;const box=[box0[0]+mw,box0[1],box0[2]-2*mw,box0[3]];const F=fitIn(box,iw,ih);const w=iw*F.s,h=ih*F.s;
  const cid='ic'+Math.round(rnd(box[0]*3+box[1])*1e9);const cp=el('clipPath',{id:cid},DEFS);el('rect',{x:F.x,y:F.y,width:w,height:h,rx:f2(18*SU)},cp);
  if(im)el('image',{href:im.src,x:F.x,y:F.y,width:w,height:h,'clip-path':`url(#${cid})`,preserveAspectRatio:'xMidYMid slice'},g);
  else{panel(g,F.x,F.y,w,h,{});textEl(g,'IMAGE · '+(it.src||'?'),F.x+w/2,F.y+h/2,{anchor:'middle',color:'dim',size:28*SU,fam:MONOF})}
  el('rect',{x:F.x,y:F.y,width:w,height:h,rx:f2(18*SU),fill:'none',stroke:TH.faint,'stroke-width':2},g);
  if(SGRID){for(let k=1;k<10;k++){el('line',{x1:F.x+w*k/10,y1:F.y,x2:F.x+w*k/10,y2:F.y+h,stroke:'#0f0','stroke-opacity':.5},g);el('line',{x1:F.x,y1:F.y+h*k/10,x2:F.x+w,y2:F.y+h*k/10,stroke:'#0f0','stroke-opacity':.5},g);
    textEl(g,(k/10).toFixed(1),F.x+w*k/10+4,F.y+18,{size:16,color:'#0f0'});textEl(g,(k/10).toFixed(1),F.x+4,F.y+h*k/10-4,{size:16,color:'#0f0'})}}
  const anchors={};LB.forEach((l,i)=>{anchors[l.id||('p'+i)]=[F.x+l.x*w,F.y+l.y*h]});
  const upL=LB.length?placeLabels(g,LB.map(l=>({x:F.x+l.x*w,y:F.y+l.y*h,text:String(l.text),color:l.color,at:l.at,side:l.side})),[F.x,F.y,w,h],{size:it.labelSize||28,start:0}):null;
  const rings=(it.focus?[].concat(it.focus):[]).map(fc=>{const c=el('circle',{cx:F.x+fc.x*w,cy:F.y+fc.y*h,r:(fc.r||.08)*Math.min(w,h),fill:'none',stroke:col(fc.color||'a2'),'stroke-width':f2(5*SU),filter:'url(#glowS)',opacity:0},g);return [c,fc]});
  return {g,anchors,frame:[F.x,F.y,w,h],len:()=>LB.length?(it.dur||1)+.3+LB.length*.35+.9:(it.dur||1),update(lt,p,st){upL&&upL(lt-(it.labelsAt??(st+(it.dur||1)+.3)));rings.forEach(([c,fc])=>{const t0=fc.at??st+1;const q=E.outBack(prog(lt,t0,t0+.6));c.setAttribute('opacity',f2(prog(lt,t0,t0+.2)*(.75+.25*Math.sin(lt*5))));c.setAttribute('stroke-dasharray','');c.style.transformOrigin=`${c.getAttribute('cx')}px ${c.getAttribute('cy')}px`;c.style.transform=`scale(${f2(Math.max(.01,q))})`})}}}};
// HIGHLIGHT ring / pulse at a point
SM.items.pulse={build(it){const g=el('g');const c=col(it.color||'a2');const rs=[0,1,2].map(()=>el('circle',{cx:it.x,cy:it.y,r:1,fill:'none',stroke:c,'stroke-width':f2(4*SU)},g));el('circle',{cx:it.x,cy:it.y,r:(it.r||14)*SU*.6,fill:c,filter:'url(#glowS)'},g);
  return {g,update(lt){rs.forEach((r,i)=>{const u=((lt*.7+i/3)%1);r.setAttribute('r',f2((it.r||14)*SU*(1+u*4)));r.setAttribute('opacity',f2((1-u)*.8))})}}}};
/* ---------- callout labels (auto columns, leader lines, no overlaps) ---------- */
function placeLabels(parent,list,frame,{size=28,color,start=0,gap=.35,side='auto',lineColor}={}){
  // list: [{x,y,text}] anchor points (stage coords). frame: [x,y,w,h] of the drawing → labels go to left/right columns outside it
  size*=SU;const [fx,fy,fw,fh]=frame,cxm=fx+fw/2;const L=[],R=[];
  const amb=[];list.forEach(o=>{const s=o.side||side;if(s==='auto'&&Math.abs(o.x-cxm)<fw*.08){amb.push(o);return}((s==='left')||(s==='auto'&&o.x<cxm)?L:R).push(o)});amb.forEach(o=>(L.length<=R.length?L:R).push(o));
  const out=[];const pad=36*SU;
  [[L,'left'],[R,'right']].forEach(([arr,sd])=>{arr.sort((a,b)=>a.y-b.y);const n=arr.length;if(!n)return;const minG=size*1.9;
    let ys=arr.map(o=>o.y);for(let k=1;k<n;k++)ys[k]=Math.max(ys[k],ys[k-1]+minG);const over=ys[n-1]-(fy+fh);if(over>0)ys=ys.map(v=>v-over);for(let k=n-2;k>=0;k--)ys[k]=Math.min(ys[k],ys[k+1]-minG);
    const lx=sd==='left'?fx-pad:fx+fw+pad;
    arr.forEach((o,k)=>{const g=el('g',{},parent);const ty=ys[k];const c=col(o.color||color||'a2');
      const ln=dr(el('path',{d:`M${f2(o.x)},${f2(o.y)} L${f2(sd==='left'?lx+12*SU:lx-12*SU)},${f2(ty)} L${f2(lx)},${f2(ty)}`,fill:'none',stroke:col(lineColor||o.color||color||'a2'),'stroke-width':f2(2.5*SU),'stroke-opacity':.9},g));
      const dot=el('circle',{cx:f2(o.x),cy:f2(o.y),r:f2(7*SU),fill:c,stroke:TH.bg,'stroke-width':f2(2.5*SU)},g);
      const room=sd==='left'?lx-10*SU-40*SU:SW-40*SU-(lx+10*SU);let ls=size;const tw0=tw(String(o.text).replace(/\*/g,''),ls,600);if(tw0>room){ls=Math.max(16*SU,size*room/tw0);if(tw(String(o.text),ls,600)>room+1)SERR_WARN.push(`label '${o.text}' is cut at the frame edge: use a smaller drawing area or a shorter label`)}
      const tx=textEl(g,o.text,sd==='left'?lx-10*SU:lx+10*SU,ty+size*.35,{size:ls,anchor:sd==='left'?'end':'start',color:o.textColor||'ink',weight:600});
      const t0=o.at??start+k*gap+(sd==='right'?.15:0);const rec={g,ln,dot,tx,t0,ty,move(ny){if(Math.abs(ny-ty)<.5)return;tx.setAttribute('y',f2(ny+size*.35));ln.setAttribute('d',`M${f2(o.x)},${f2(o.y)} L${f2(sd==='left'?lx+12*SU:lx-12*SU)},${f2(ny)} L${f2(lx)},${f2(ny)}`)}};out.push(rec);LBLREC.push(rec)})});
  return lt=>out.forEach(({ln,dot,tx,t0})=>{const p=prog(lt,t0,t0+.7);ln.style.strokeDashoffset=f2(1-E.inOutCubic(p));dot.setAttribute('opacity',f2(prog(lt,t0,t0+.15)));
    tx.setAttribute('opacity',f2(prog(lt,t0+.35,t0+.75)));tx.setAttribute('transform',`translate(${f2((1-E.outCubic(prog(lt,t0+.35,t0+.8)))*(tx.getAttribute('text-anchor')==='end'?14:-14)*SU)} 0)`)})}
// single callout pointing to (x,y)
SM.items.label={build(it){const g=el('g');const lx=it.tx??it.x+(it.dx??160)*SU,ly=it.ty??it.y+(it.dy??-80)*SU,c=col(it.color||'a2'),size=(it.size||30)*SU;const right=lx>=it.x;
  const ln=dr(el('path',{d:`M${it.x},${it.y} L${f2(lx)},${f2(ly)} L${f2(lx+(right?30:-30)*SU)},${f2(ly)}`,fill:'none',stroke:c,'stroke-width':f2(2.5*SU)},g));el('circle',{cx:it.x,cy:it.y,r:f2(7*SU),fill:c,stroke:TH.bg,'stroke-width':f2(2.5*SU)},g);
  const tx=textEl(g,it.text||'',lx+(right?40:-40)*SU,ly+size*.35,{size,anchor:right?'start':'end',color:it.textColor||'ink'});
  if(it.guard!==false)LBLREC.push({tx,ty:ly,move(ny){tx.setAttribute('y',f2(ny+size*.35));ln.setAttribute('d',`M${it.x},${it.y} L${f2(lx)},${f2(ny)} L${f2(lx+(right?30:-30)*SU)},${f2(ny)}`)}});return {g}}};
