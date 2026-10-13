/* TextLayout UGVAY v1 — matn joylashuvi kutubxonasi (Canvas · SVG · HTML).
   Fit text into boxes, balanced wrapping, safe areas, layout templates, non-overlapping label placement,
   DOM overlap guard (auto-fix) and QA reports. No dependencies. Global: TL.  Never changes the words. */
(function(G){'use strict';
const TL={version:'1.0'};const C=(typeof document!=='undefined')?document.createElement('canvas').getContext('2d'):null;
TL.font='Inter, "Segoe UI", Arial, sans-serif';
// ---------- measuring ----------
TL.measure=(s,size,weight=600,family=TL.font,track=0)=>{if(!C)return String(s).length*size*.55;C.font=`${weight} ${size}px ${family}`;const t=String(s).replace(/\*/g,'');return C.measureText(t).width+Math.max(0,t.length-1)*track};
// ---------- Uzbek typography ----------
TL.uz=s=>String(s).replace(/([OoGg])['‘’`ʼ]/g,'$1ʻ').replace(/([a-zA-Zʻ])['’`](?=[a-zA-Z])/g,'$1ʼ');
// ---------- wrapping ----------
function greedy(words,size,maxW,o){const lines=[];let line='';for(const w of words){const t=line?line+' '+w:w;if(!line||TL.measure(t,size,o.weight,o.family,o.track)<=maxW)line=t;else{lines.push(line);line=w}}if(line)lines.push(line);return lines}
TL.wrap=(text,size,maxW,o={})=>{o={weight:600,family:TL.font,track:0,balance:true,...o};const out=[];String(text).split('\n').forEach(par=>{const words=par.split(/\s+/).filter(Boolean);if(!words.length){out.push('');return}
  let lines=greedy(words,size,maxW,o);if(o.balance&&lines.length>1){let lo=maxW*.45,hi=maxW;for(let k=0;k<14;k++){const mid=(lo+hi)/2;const l2=greedy(words,size,mid,o);if(l2.length<=lines.length&&l2.every(l=>TL.measure(l,size,o.weight,o.family,o.track)<=mid+.5))hi=mid;else lo=mid}lines=greedy(words,size,hi,o)}
  // no orphan: last line of one short word → pull a word down
  if(lines.length>1){const L=lines[lines.length-1];if(!/\s/.test(L)&&L.length<8){const p=lines[lines.length-2].split(' ');if(p.length>2){const w=p.pop();const cand=w+' '+L;if(TL.measure(cand,size,o.weight,o.family,o.track)<=maxW){lines[lines.length-2]=p.join(' ');lines[lines.length-1]=cand}}}}
  out.push(...lines)});return out};
// ---------- fit: biggest size where wrapped text fits w×h ----------
TL.fit=(text,o={})=>{const w=o.w||600,h=o.h||200,lh=o.lineHeight||1.22,max=o.max||120,min=o.min||16;let best=null;let lo=min,hi=max;
  const ok=s=>{const lines=TL.wrap(text,s,w,o);if(o.maxLines&&lines.length>o.maxLines)return null;const wd=Math.max(0,...lines.map(l=>TL.measure(l,s,o.weight,o.family,o.track)));if(wd>w+.5)return null;const ht=(lines.length-1)*s*lh+s;return ht<=h?{size:s,lines,width:wd,height:ht,lineHeight:s*lh}:null};
  for(let k=0;k<18;k++){const m=(lo+hi)/2;const r=ok(m);if(r){best=r;lo=m}else hi=m}const s0=Math.floor(lo);best=ok(s0)||best;
  if(!best){const lines=TL.wrap(text,min,w,o);best={size:min,lines,width:w,height:lines.length*min*lh,lineHeight:min*lh,overflow:true}}return best};
// ---------- safe areas & layout templates ----------
TL.safe=(W=1920,H=1080,m)=>{const mm=m??Math.round(Math.min(W,H)*.06);return {x:mm,y:mm,w:W-2*mm,h:H-2*mm}};
TL.layout=(name,W=1920,H=1080,o={})=>{const S=TL.safe(W,H,o.margin);const v=H>W;const top=o.header??Math.round(H*(v?.11:.13));const cap=o.caption??Math.round(H*(v?.12:.14));const body={x:S.x,y:S.y+top,w:S.w,h:S.h-top-cap};const g=Math.round(W*.03);
  const R={safe:S,header:{x:S.x,y:S.y,w:S.w,h:top-g*.3},caption:{x:S.x+S.w*.1,y:S.y+S.h-cap+g*.3,w:S.w*.8,h:cap-g*.3},body};
  const split=(f)=>v?[{...body,h:body.h*f-g/2},{...body,y:body.y+body.h*f+g/2,h:body.h*(1-f)-g/2}]:[{...body,w:body.w*f-g/2},{...body,x:body.x+body.w*f+g/2,w:body.w*(1-f)-g/2}];
  if(name==='two-col'){const [a,b]=split(.5);R.left=a;R.right=b}else if(name==='media-left'||name==='media-right'){const [a,b]=split(.55);R.media=name==='media-left'?a:b;R.text=name==='media-left'?b:a}
  else if(name==='title'){R.kicker={x:S.x,y:H*.3,w:S.w,h:H*.06};R.title={x:S.x+S.w*.08,y:H*.37,w:S.w*.84,h:H*.22};R.sub={x:S.x+S.w*.15,y:H*.62,w:S.w*.7,h:H*.08}}
  else if(name==='lower-third'){R.lower={x:S.x,y:S.y+S.h-H*.2,w:S.w*.6,h:H*.16}}else if(name==='grid'){const n=o.n||4,c=o.cols||(v?1:2),r=Math.ceil(n/c);R.cells=[];for(let i=0;i<n;i++){const cw=(body.w-g*(c-1))/c,ch=(body.h-g*(r-1))/r;R.cells.push({x:body.x+(i%c)*(cw+g),y:body.y+Math.floor(i/c)*(ch+g),w:cw,h:ch})}}
  return R};
// ---------- rectangles ----------
TL.overlap=(a,b,p=0)=>Math.max(0,Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x)+p)*Math.max(0,Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y)+p);
TL.hits=(a,b,p=0)=>a.x-p<b.x+b.w&&b.x-p<a.x+a.w&&a.y-p<b.y+b.h&&b.y-p<a.y+a.h;
TL.inside=(a,B)=>a.x>=B.x-.5&&a.y>=B.y-.5&&a.x+a.w<=B.x+B.w+.5&&a.y+a.h<=B.y+B.h+.5;
// ---------- label placement (anchor points → non-overlapping text boxes) ----------
// items:[{x,y (anchor), w,h (text box), id, priority}] ; o:{bounds, obstacles:[rects], gap, dist}
TL.place=(items,o={})=>{const B=o.bounds||TL.safe(),gap=o.gap??8,d=o.dist??28;const placed=[...(o.obstacles||[]).map(r=>({...r,_obs:true}))];const out=[];
  const order=[...items].map((it,i)=>({...it,_i:i})).sort((a,b)=>(b.priority||0)-(a.priority||0));
  order.forEach(it=>{const {w,h}=it;const C=[];const dirs=[[1,0],[-1,0],[0,-1],[0,1],[1,-1],[-1,-1],[1,1],[-1,1]];for(let ring=1;ring<=6;ring++)dirs.forEach(([dx,dy])=>{const r=d*ring;let x=it.x+(dx>0?r:dx<0?-r-w:-w/2),y=it.y+(dy>0?r:dy<0?-r-h:-h/2);C.push({x,y,w,h,ring})});
    let best=null,bs=Infinity;C.forEach(c=>{let s=c.ring*40;if(!TL.inside(c,B))s+=1e6;placed.forEach(p=>{s+=TL.overlap(c,p,gap)*(p._obs?3:10)});if(s<bs){bs=s;best=c}});
    const r={...best,id:it.id,i:it._i,ok:bs<1e5&&placed.every(p=>!TL.hits(best,p,gap/2))};placed.push(r);out[it._i]=r});return out};
// ---------- relax: push movable rectangles apart (vertical first, keeps x) ----------
TL.relax=(rects,o={})=>{const B=o.bounds,gap=o.gap??6;const R=rects.map(r=>({...r}));for(let it=0;it<(o.iterations||60);it++){let moved=false;
  for(let i=0;i<R.length;i++)for(let j=i+1;j<R.length;j++){const a=R[i],b=R[j];if(!TL.hits(a,b,gap)||(a.fixed&&b.fixed))continue;const ov=Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y)+gap;const dir=(a.y+a.h/2)<=(b.y+b.h/2)?-1:1;
    if(a.fixed){b.y-=dir*ov}else if(b.fixed){a.y+=dir*ov}else{a.y+=dir*ov/2;b.y-=dir*ov/2}moved=true}
  if(B)R.forEach(r=>{if(r.fixed)return;r.y=Math.min(Math.max(r.y,B.y),B.y+B.h-r.h);r.x=Math.min(Math.max(r.x,B.x),B.x+B.w-r.w)});if(!moved)break}return R};
// ---------- captions: split narration into readable chunks ----------
TL.chunks=(text,o={})=>{const maxW=o.maxWords||12;const out=[];String(text).split(/(?<=[.!?…])\s+/).forEach(s=>{const w=s.split(/\s+/).filter(Boolean);if(w.length<=maxW){if(w.length)out.push(s.trim());return}
  const parts=s.split(/(?<=[,;:—])\s+/);let cur=[];parts.forEach(p=>{const pw=p.split(/\s+/);if(cur.length+pw.length>maxW&&cur.length){out.push(cur.join(' '));cur=[]}cur.push(...pw);while(cur.length>maxW){out.push(cur.splice(0,Math.ceil(cur.length/Math.ceil(cur.length/maxW))).join(' '))}});if(cur.length)out.push(cur.join(' '))});return out};
TL.readTime=s=>.6+String(s).split(/\s+/).filter(Boolean).length*.32;
// ---------- DOM (SVG/HTML) scan & guard ----------
const vis=e=>{if(e.checkVisibility&&!e.checkVisibility({opacityProperty:true,visibilityProperty:true}))return false;let n=e,op=1;while(n&&n.nodeType===1){const cs=getComputedStyle(n);if(cs.display==='none'||cs.visibility==='hidden')return false;op*=parseFloat(cs.opacity||1)*(n.getAttribute&&n.getAttribute('opacity')!=null?parseFloat(n.getAttribute('opacity')):1);n=n.parentNode}return op>.15};
TL.scan=(root=document.body,o={})=>{const els=[...root.querySelectorAll(o.selector||'text, [data-tl], h1,h2,h3,p,li,span.tl')].filter(e=>(e.textContent||'').trim()&&vis(e)&&!e.closest('[data-tl-ignore]'));
  const ref=(o.frame||root.closest&&root.closest('svg')||root).getBoundingClientRect();const sx=o.W?o.W/ref.width:1,sy=o.H?o.H/ref.height:1;
  const boxes=els.filter(e=>!els.some(p=>p!==e&&p.contains(e))).map(e=>{const r=e.getBoundingClientRect();return {el:e,text:e.textContent.trim().slice(0,40),x:(r.left-ref.left)*sx,y:(r.top-ref.top)*sy,w:r.width*sx,h:r.height*sy}}).filter(b=>b.w>1&&b.h>1);
  const issues=[];const pad=o.pad??-2;for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++){const a=boxes[i],b=boxes[j];const ov=TL.overlap(a,b,pad);if(ov>Math.min(a.w*a.h,b.w*b.h)*(o.tol??.04))issues.push({type:'overlap',a:a.text,b:b.text,area:Math.round(ov),A:a,B:b})}
  if(o.W){const S=o.safe||{x:0,y:0,w:o.W,h:o.H};boxes.forEach(b=>{if(!TL.inside(b,S))issues.push({type:'outside',a:b.text,A:b})})}return {boxes,issues}};
// guard: move elements marked movable (data-tl-move or o.movable(el)) so they stop overlapping; returns remaining issues
TL.guard=(root=document.body,o={})=>{const W=o.W,H=o.H;const res=TL.scan(root,o);const mv=o.movable||(e=>e.closest('[data-tl-move]'));const R=res.boxes.map(b=>({...b,fixed:!mv(b.el)}));const R2=TL.relax(R,{gap:o.gap??6,bounds:o.bounds});
  R2.forEach((r,i)=>{const dy=r.y-R[i].y;if(Math.abs(dy)<.5)return;const tgt=mv(r.el);if(!tgt)return;const k=o.H?(tgt.ownerSVGElement||tgt).getBoundingClientRect().height/o.H:1;const cur=tgt.getAttribute('data-tl-dy')*1||0;const ndy=cur+dy;tgt.setAttribute('data-tl-dy',ndy);
    if(tgt.namespaceURI&&tgt.namespaceURI.includes('svg')){if(!tgt.hasAttribute('data-tl-base'))tgt.setAttribute('data-tl-base',tgt.getAttribute('transform')||'');tgt.setAttribute('transform',`${tgt.getAttribute('data-tl-base')} translate(0 ${ndy.toFixed(1)})`.trim())}else tgt.style.translate=`0 ${ndy}px`});
  return TL.scan(root,o).issues};
// ---------- canvas helpers (motion engines) ----------
TL.frame=[];TL.track=(x,y,w,h,text='')=>{TL.frame.push({x,y,w,h,text});return {x,y,w,h}};TL.resetFrame=()=>{TL.frame=[]};
TL.frameIssues=()=>{const f=TL.frame,out=[];for(let i=0;i<f.length;i++)for(let j=i+1;j<f.length;j++)if(TL.overlap(f[i],f[j],-2)>4)out.push({type:'overlap',a:f[i].text,b:f[j].text});return out};
// drawFit: fitted + wrapped multi-line text inside box (align left|center|right, valign top|middle|bottom). Returns the fit.
TL.drawFit=(ctx,text,box,o={})=>{const F=TL.fit(text,{w:box.w,h:box.h,...o});const fam=o.family||TL.font,wt=o.weight||700;ctx.save();ctx.font=`${wt} ${F.size}px ${fam}`;ctx.textBaseline='alphabetic';ctx.fillStyle=o.color||ctx.fillStyle;const al=o.align||'left';ctx.textAlign=al;
  const top=box.y+(o.valign==='middle'?(box.h-F.height)/2:o.valign==='bottom'?box.h-F.height:0);const x=al==='center'?box.x+box.w/2:al==='right'?box.x+box.w:box.x;F.lines.forEach((l,i)=>ctx.fillText(l,x,top+F.size*.8+i*F.lineHeight));ctx.restore();
  const bw=F.width,bx=al==='center'?box.x+(box.w-bw)/2:al==='right'?box.x+box.w-bw:box.x;TL.track(bx,top,bw,F.height,text);return F};
// svgText: fitted multi-line <text> inside box
TL.svgText=(parent,text,box,o={})=>{const NS='http://www.w3.org/2000/svg';const F=TL.fit(text,{w:box.w,h:box.h,...o});const t=document.createElementNS(NS,'text');const al=o.align||'start';const x=al==='middle'?box.x+box.w/2:al==='end'?box.x+box.w:box.x;
  const top=box.y+(o.valign==='middle'?(box.h-F.height)/2:o.valign==='bottom'?box.h-F.height:0);t.setAttribute('font-size',F.size);t.setAttribute('font-weight',o.weight||700);t.setAttribute('font-family',o.family||TL.font);t.setAttribute('text-anchor',al);if(o.color)t.setAttribute('fill',o.color);
  F.lines.forEach((l,i)=>{const s=document.createElementNS(NS,'tspan');s.setAttribute('x',x);s.setAttribute('y',top+F.size*.8+i*F.lineHeight);s.textContent=l;t.appendChild(s)});parent.appendChild(t);return {el:t,...F}};
TL.report=(issues)=>{const k=issues||[];if(typeof window!=='undefined'){window.__textIssues=k}return k.map(i=>i.type==='overlap'?`overlap: "${i.a}" × "${i.b}"`:`outside safe area: "${i.a}"`)};
G.TL=TL;if(typeof module!=='undefined')module.exports=TL})(typeof window!=='undefined'?window:globalThis);
