// ===== 12-cam.js — camera helper items: magnifier (lupa), spotlight =====
// magnifier: {type:'magnifier', on:'@cell.mitochondria' | x,y, lens:[x,y], r:170, zoom:2.6, text:'Mitoxondriya', color:'a2'}
// The lens is placed automatically in free space (never over text, never off-frame) by the layout guard.
SM.items.magnifier={build(it,ctx){const S=ctx.scene;const g=el('g');let r=(it.r||210)*SU;const z=it.zoom||2.6;const tx=it.x??SW/2,ty=it.y??SH/2;
  let lx,ly;if(Array.isArray(it.lens)){lx=it.lens[0];ly=it.lens[1]}else{lx=tx<SW/2?Math.max(SW*.68,tx+r*2.4):Math.min(SW*.32,tx-r*2.4);ly=clamp(ty,r+120*SU,SH-r-110*SU)}
  const c=col(it.color||'a2');const id='mg'+Math.round(rnd(tx+ty*7+DEFS.childNodes.length)*1e9);const cp=el('clipPath',{id},DEFS);const cc=el('circle',{},cp);
  const con=el('line',{stroke:c,'stroke-width':f2(2.5*SU),'stroke-dasharray':`${6*SU} ${6*SU}`,opacity:.8},g);const tr=el('circle',{cx:f2(tx),cy:f2(ty),fill:'none',stroke:c,'stroke-width':f2(3*SU)},g);
  const inner=el('g',{'clip-path':`url(#${id})`},g);const bgc=el('circle',{fill:TH.bg2},inner);const use=el('use',{href:'#'+S.cam.id},inner);const glass=el('circle',{fill:'#fff',opacity:.06},inner);
  const ring=el('circle',{fill:'none',stroke:c,'stroke-width':f2(7*SU),filter:'url(#glowS)'},g);const hd=el('line',{stroke:c,'stroke-width':f2(16*SU),'stroke-linecap':'round'},g);
  let tl=null;const tlG=el('g',{},g);
  function place(nx,ny,nr){lx=nx;ly=ny;r=nr;[cc,bgc].forEach(e=>at(e,{cx:f2(lx),cy:f2(ly),r:f2(r)}));at(glass,{cx:f2(lx-r*.35),cy:f2(ly-r*.4),r:f2(r*.5)});at(ring,{cx:f2(lx),cy:f2(ly),r:f2(r)});at(tr,{r:f2(r/z)});
    // handle points away from the target so it never crosses the connector
    const ang=Math.atan2(ty-ly,tx-lx);const cand=[Math.PI*.25,Math.PI*.75,-Math.PI*.25,-Math.PI*.75].map(a=>{const ex=lx+Math.cos(a)*r*1.6,ey=ly+Math.sin(a)*r*1.6;const off=Math.max(0,-ex,ex-SW,-ey,ey-SH);const d=Math.abs(Math.atan2(Math.sin(a-ang),Math.cos(a-ang)));return {a,v:off*10-d*100+(Math.sin(a)<0?40:0)}}).sort((p,q)=>p.v-q.v);const ha=cand[0].a;at(hd,{x1:f2(lx+Math.cos(ha)*r*1.02),y1:f2(ly+Math.sin(ha)*r*1.02),x2:f2(lx+Math.cos(ha)*r*1.55),y2:f2(ly+Math.sin(ha)*r*1.55)});
    at(con,{x1:f2(lx+Math.cos(ang)*r),y1:f2(ly+Math.sin(ang)*r),x2:f2(tx-Math.cos(ang)*r/z),y2:f2(ty-Math.sin(ang)*r/z)});
    tlG.textContent='';if(it.text){const below=ly+r+70*SU<SH-24*SU;tl=lbl(tlG,it.text,lx,below?ly+r+46*SU:ly-r-22*SU,{size:(it.size||34)*SU,color:it.color||'a2',weight:800})}}
  place(lx,ly,r);
  return {g,overlay:true,noDraw:true,anchors:{get lens(){return [lx,ly]},target:[tx,ty]},setLens:place,lens:()=>({lx,ly,r,tx,ty,z,label:!!it.text,lw:it.text?tw(it.text,(it.size||34)*SU,800)+16*SU:0,auto:!Array.isArray(it.lens)}),update(lt,p,st){const q=E.outBack(prog(lt,st,st+.7));const s=Math.max(.01,q);
      g.setAttribute('transform',`translate(${f2(lx)} ${f2(ly)}) scale(${f2(s)}) translate(${f2(-lx)} ${f2(-ly)})`);
      const C=S.cs||{cx:SW/2,cy:SH/2,z:1,rot:0,sx:0,sy:0};const zz=z*(1+.04*Math.sin((lt-st)*1.3));
      const X=SW/2+C.sx+(tx-C.cx)*C.z,Y=SH/2+C.sy+(ty-C.cy)*C.z;use.setAttribute('transform',`translate(${f2(lx)} ${f2(ly)}) scale(${f2(zz)}) translate(${f2(-X)} ${f2(-Y)})`);
      tlG.setAttribute('opacity',f2(prog(lt,st+.5,st+1)))}}}};
// spotlight: dark overlay with a soft hole on target. {type:'spotlight', on:'@heart.lv', r:160, dim:.7}
SM.items.spotlight={build(it){const g=el('g');const r=(it.r||170)*SU;const tx=it.x??SW/2,ty=it.y??SH/2;const id='sp'+Math.round(rnd(tx*3+ty+DEFS.childNodes.length)*1e9);
  const m=el('mask',{id,maskUnits:'userSpaceOnUse',x:0,y:0,width:SW,height:SH},DEFS);el('rect',{x:0,y:0,width:SW,height:SH,fill:'#fff'},m);const gg=gradient([[0,'#000',1],[.7,'#000',1],[1,'#000',0]],{radial:true});
  const hole=el('circle',{cx:f2(tx),cy:f2(ty),r:f2(r),fill:gg},m);const rc=el('rect',{x:0,y:0,width:SW,height:SH,fill:'#000',mask:`url(#${id})`},g);
  return {g,overlay:true,noDraw:true,update(lt,p,st){const q=E.outCubic(prog(lt,st,st+.8));rc.setAttribute('opacity',f2(q*(it.dim??.68)));hole.setAttribute('r',f2(r*(1.8-.8*q)))}}}};
