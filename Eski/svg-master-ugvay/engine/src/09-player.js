/* ---------- built-in scene kinds: title card, summary, quiz ---------- */
var BPM=76,BEAT=60/BPM,BAR=BEAT*4; // audiokit globals
const L10N={uz:{summary:'Xulosa',quiz:'Savol',answer:'Javob',thanks:'E’tiboringiz uchun rahmat!',think:'O‘ylab ko‘ring…'},
  en:{summary:'Summary',quiz:'Question',answer:'Answer',thanks:'Thanks for watching!',think:'Think about it…'},
  ru:{summary:'Итоги',quiz:'Вопрос',answer:'Ответ',thanks:'Спасибо за внимание!',think:'Подумайте…'}};
const tr=k=>(L10N[LANG]||L10N.uz)[k]||L10N.en[k];
SM.items.titleCard={build(it){const g=el('g');const cx=SW/2,cy=SH*(SH>SW?.42:.46);const v=SH>SW;
  const orb=el('circle',{cx,cy,r:f2(360*SU),fill:gradient([[0,'a1',.28],[1,'a1',0]],{radial:true})},g);
  const rings=[0,1,2].map(i=>{const rg=el('g',{},g);el('ellipse',{cx:0,cy:0,rx:f2((470+i*120)*SU),ry:f2((150+i*44)*SU),fill:'none',stroke:col(['a1','a2','a5'][i]),'stroke-opacity':.22,'stroke-width':f2(2*SU)},rg);
    const d=el('circle',{r:f2(8*SU),fill:col(['a1','a2','a5'][i]),filter:'url(#glowS)'},rg);return {rg,d,i}});
  const chipT=(it.subject||LSN.subject||'').toUpperCase();let chip=null;
  if(chipT){chip=el('g',{},g);const cs=26*SU,lsp=4*SU,w=tw(chipT,cs,800)+lsp*chipT.length+56*SU;panel(chip,cx-w/2,cy-(v?330:250)*SU,w,54*SU,{r:27,fill:'none',stroke:'a1'});textEl(chip,chipT,cx+lsp/2,cy-(v?330:250)*SU+36*SU,{size:cs,weight:800,anchor:'middle',color:'a1',ls:4*SU})}
  const size=(it.size||(v?92:104))*SU;const lines=wrapText(it.text||LSN.title||'',size,SW*(v?.84:.78),800);const lh=size*1.12;const y0=cy-(lines.length-1)*lh/2+size*.3-(it.subtitle||LSN.subtitle?30*SU:0);
  const TFX=it.fx||(typeof LSN.typo==='object'&&LSN.typo.title)||(LSN.typo===false?'rise':TYPO.pick(['mask-up','tracking-in','rise-blur','split-center','wave','blur-in'],String(it.text||LSN.title||'').length));const TB=TYPO.block(g,lines.map((l,i)=>({s:l,x:cx,y:y0+i*lh,size,weight:800,anchor:'middle',accent:'a2',p:i})),{in:TFX,step:.25});
  const ul=dr(el('path',{d:`M${f2(cx-160*SU)},${f2(y0+(lines.length-1)*lh+46*SU)} L${f2(cx+160*SU)},${f2(y0+(lines.length-1)*lh+46*SU)}`,stroke:col('a2'),'stroke-width':f2(6*SU),'stroke-linecap':'round'},g));
  const subT=it.subtitle??LSN.subtitle;const sub=subT?wrapText(subT,40*SU,SW*.7,500).map((l,i)=>textEl(g,l,cx,y0+(lines.length-1)*lh+120*SU+i*54*SU,{size:40*SU,weight:500,anchor:'middle',color:'dim'})):[];
  const au=(it.author??LSN.author)?textEl(g,it.author??LSN.author,cx,SH-(v?420:210)*SU,{size:30*SU,anchor:'middle',color:'dim',weight:600,ls:2*SU}):null;
  return {g,noDraw:true,update(lt){rings.forEach(({rg,d,i})=>{rg.setAttribute('transform',`translate(${cx} ${cy}) rotate(${-8+i*9})`);const a=lt*(.35+i*.12)+i*2;at(d,{cx:f2(Math.cos(a)*(470+i*120)*SU),cy:f2(Math.sin(a)*(150+i*44)*SU)});rg.setAttribute('opacity',f2(E.outCubic(prog(lt,.2+i*.2,1.2+i*.2))))});
    orb.setAttribute('opacity',f2(prog(lt,0,1.2)*(.85+.15*Math.sin(lt*1.3))));if(chip)chip.setAttribute('opacity',f2(prog(lt,.2,.7)));
    TB.update(lt,.35,99);
    ul.style.strokeDashoffset=f2(1-E.inOutCubic(prog(lt,1,1.8)));sub.forEach((s,i)=>s.setAttribute('opacity',f2(prog(lt,1.3+i*.15,2+i*.15))));au&&au.setAttribute('opacity',f2(prog(lt,1.8,2.5)))}}}};
SM.items.summary={build(it){const box=boxOf(it);const g=el('g');const pts=it.points||[];const size=(it.size||44)*SU;const head=textEl(g,it.heading||tr('summary'),box[0]+box[2]/2,box[1]+60*SU,{size:64*SU,weight:800,anchor:'middle',color:'a1'});
  const rows=[];const w=Math.min(box[2],1300*SU),x=box[0]+box[2]/2-w/2;let y=box[1]+140*SU;const lh=size*1.25;
  pts.forEach((p,i)=>{const ls=wrapText(p,size,w-110*SU,600);const rg=el('g',{},g);const h=ls.length*lh+30*SU;panel(rg,x,y,w,h,{r:18});
    const ck=el('g',{transform:`translate(${f2(x+48*SU)} ${f2(y+h/2)})`},rg);el('circle',{r:f2(24*SU),fill:col(['a1','a2','a4','a5','a3'][i%5]),'fill-opacity':.18,stroke:col(['a1','a2','a4','a5','a3'][i%5]),'stroke-width':f2(3*SU)},ck);
    const tick=dr(el('path',{d:`M${f2(-10*SU)},0 L${f2(-2*SU)},${f2(9*SU)} L${f2(12*SU)},${f2(-9*SU)}`,fill:'none',stroke:col(['a1','a2','a4','a5','a3'][i%5]),'stroke-width':f2(4*SU),'stroke-linecap':'round','stroke-linejoin':'round'},ck));
    ls.forEach((l,k)=>textEl(rg,l,x+96*SU,y+15*SU+lh*(k+.78),{size,weight:600,accent:'a2'}));rows.push({rg,tick});y+=h+22*SU});
  const th=it.text!==false?textEl(g,it.text||tr('thanks'),box[0]+box[2]/2,Math.min(box[1]+box[3],y+90*SU),{size:46*SU,weight:700,anchor:'middle',color:'a2'}):null;
  const gap=it.gap||1.1;return {g,noDraw:true,update(lt,p,st){head.setAttribute('opacity',f2(prog(lt,st,st+.6)));rows.forEach((r,i)=>{const t0=st+.6+i*gap,q=E.outCubic(prog(lt,t0,t0+.6));r.rg.setAttribute('opacity',f2(q));r.rg.setAttribute('transform',`translate(${f2((1-q)*-40*SU)} 0)`);r.tick.style.strokeDashoffset=f2(1-prog(lt,t0+.35,t0+.8))});
    th&&th.setAttribute('opacity',f2(prog(lt,st+.6+rows.length*gap+.3,st+.6+rows.length*gap+1)))},len:()=>.6+pts.length*gap+1.5}}};
SM.items.quiz={build(it){const box=boxOf(it);const g=el('g');const v=SH>SW;const opts=it.options||[];const ans=it.answer??0;const think=it.think??5;
  const chip=textEl(g,'❓ '+tr('quiz'),box[0]+box[2]/2,box[1]+30*SU,{size:32*SU,weight:800,anchor:'middle',color:'a2',ls:3*SU});
  const qs=(it.size||54)*SU;const ql=wrapText(it.question||'',qs,box[2]*.9,700);const qT=ql.map((l,i)=>textEl(g,l,box[0]+box[2]/2,box[1]+110*SU+i*qs*1.2,{size:qs,weight:700,anchor:'middle',accent:'a1'}));
  const top=box[1]+110*SU+ql.length*qs*1.2+30*SU;const cols=v||opts.length<3?1:2,rowsN=Math.ceil(opts.length/cols),gp=26*SU;const cw=(box[2]*(cols===1?.8:.96)-gp*(cols-1))/cols,ch=Math.min(130*SU,(box[1]+box[3]-top-100*SU-gp*(rowsN-1))/rowsN);
  const x0=box[0]+box[2]/2-(cw*cols+gp*(cols-1))/2;const cards=opts.map((o,i)=>{const c=i%cols,r=Math.floor(i/cols);const x=x0+c*(cw+gp),y=top+r*(ch+gp);const cg=el('g',{},g);
    const rc=panel(cg,x,y,cw,ch,{r:20,stroke:'faint',sw:2.5});const L='ABCDEF'[i];el('circle',{cx:f2(x+50*SU),cy:f2(y+ch/2),r:f2(28*SU),fill:col('a1'),'fill-opacity':.15,stroke:col('a1'),'stroke-width':f2(2.5*SU)},cg);
    textEl(cg,L,x+50*SU,y+ch/2+11*SU,{size:30*SU,weight:800,anchor:'middle',color:'a1'});const fs=Math.min(40*SU,ch*.36);const ls=wrapText(o,fs,cw-120*SU,600).slice(0,2);ls.forEach((l,k)=>textEl(cg,l,x+100*SU,y+ch/2+fs*.35+(k-(ls.length-1)/2)*fs*1.15,{size:fs,weight:600}));return {cg,rc,i}});
  const ry=Math.min(box[1]+box[3]-40*SU,top+rowsN*(ch+gp)+50*SU),R=34*SU,cx=box[0]+box[2]/2;const ringBg=el('circle',{cx,cy:ry,r:R,fill:'none',stroke:TH.faint,'stroke-width':f2(7*SU)},g);
  const ring=el('circle',{cx,cy:ry,r:R,fill:'none',stroke:col('a2'),'stroke-width':f2(7*SU),'stroke-linecap':'round',transform:`rotate(-90 ${cx} ${ry})`,'stroke-dasharray':f2(TAU*R),'stroke-dashoffset':0},g);
  const num=textEl(g,'',cx,ry+12*SU,{size:32*SU,weight:800,anchor:'middle',color:'a2',fam:MONOF});
  const exp=it.explain?wrapText(it.explain,34*SU,box[2]*.85,500).map((l,i)=>textEl(g,l,cx,ry-6*SU+i*44*SU,{size:34*SU,weight:500,anchor:'middle',color:'dim',accent:'a4'})):[];
  return {g,noDraw:true,update(lt,p,st){chip.setAttribute('opacity',f2(prog(lt,st,st+.4)));qT.forEach((t,i)=>t.setAttribute('opacity',f2(prog(lt,st+.2+i*.15,st+.7+i*.15))));
    const t1=st+1+opts.length*.25,tr0=t1+.3,tr1=tr0+think;cards.forEach(({cg,rc,i})=>{const q=E.outBack(prog(lt,st+.9+i*.25,st+1.4+i*.25));cg.setAttribute('opacity',f2(clamp(q)));
      const rv=prog(lt,tr1,tr1+.5);const ok=i===ans;cg.setAttribute('opacity',f2(clamp(q)*(ok?1:1-.6*rv)));at(rc,{stroke:ok&&rv>0?col('a4'):TH.faint,'stroke-width':f2((2.5+3*rv*(ok?1:0))*SU),filter:ok&&rv>.5?'url(#glowS)':''});
      const s=ok?1+.04*Math.sin(clamp(rv)*Math.PI):1;const bb=[+rc.getAttribute('x')+ +rc.getAttribute('width')/2,+rc.getAttribute('y')+ +rc.getAttribute('height')/2];cg.setAttribute('transform',`translate(${f2(bb[0])} ${f2(bb[1])}) scale(${f2(s*(.9+.1*clamp(q)))}) translate(${f2(-bb[0])} ${f2(-bb[1])})`)});
    const u=prog(lt,tr0,tr1);const vis=lt>=tr0-.2&&lt<tr1+.6?1:0;[ringBg,ring,num].forEach(e=>e.setAttribute('opacity',f2(vis*prog(lt,tr0-.2,tr0)*(1-prog(lt,tr1+.2,tr1+.6)))));ring.setAttribute('stroke-dashoffset',f2(TAU*R*u));num.textContent=lt<tr1?String(Math.ceil(think*(1-u))):'✓';
    exp.forEach((e,i)=>e.setAttribute('opacity',f2(prog(lt,tr1+.8+i*.2,tr1+1.4+i*.2))))},len:()=>1.3+opts.length*.25+think+(it.explain?4:2.2)}}};

/* ================= PLAYER ================= */
const ENT={text:.8,formula:1.8,label:.7,arrow:.9,shape:1.2,image:1,svg:1.4,pulse:.4,number:1.6,emoji:.6,titleCard:2.2,summary:1,quiz:1};
const ANIM_DEF={text:'rise',formula:'write',label:'draw',arrow:'draw',shape:'draw',svg:'draw',image:'fade',emoji:'pop',pulse:'fade',number:'fade',titleCard:'none',summary:'none',quiz:'none',fire:'fade',smoke:'fade',water:'fade',rain:'fade',snow:'fade',bubbles:'fade',sparks:'fade',rays:'fade',glowOrb:'fade',explosion:'none',lightning:'fade'};
const SCENE_KEYS=['shake','dive','title','say','dur','kind','camera','items','transition','audio','focus','hold','notes','id','subtitle','question','options','answer','think','explain','points','text'];
const ITEM_COMMON=['type','id','at','with','dur','out','anim','wait','area','box','x','y','color','glow','opacity','scale','rotate','on','z'];
function lev(a,b){const d=[...Array(b.length+1).keys()];for(let i=1;i<=a.length;i++){let p=d[0];d[0]=i;for(let j=1;j<=b.length;j++){const t=d[j];d[j]=Math.min(d[j]+1,d[j-1]+1,p+(a[i-1]===b[j-1]?0:1));p=t}}return d[b.length]}
const near=(k,list)=>list.map(x=>[x,lev(k.toLowerCase(),x.toLowerCase())]).sort((a,b)=>a[1]-b[1])[0];
function resolvePt(v,REG,where){if(typeof v!=='string'||v[0]!=='@')return v;const [id,part]=v.slice(1).split('.');const r=REG[id];if(!r){SERR.push(`${where}: unknown reference "${v}" (give the target item an id:"${id}" and define it earlier)`);return [SW/2,SH/2]}
  if(part){const a=r.anchors&&r.anchors[part];if(!a){SERR.push(`${where}: "${id}" has no part "${part}". Parts: ${Object.keys(r.anchors||{}).join(', ')||'(none – use @'+id+')'}`);return r.center}return a}return r.center}
function alias(it){const t=it.type;const A=(k,...o)=>{if(it[k]==null)for(const x of o)if(it[x]!=null){it[k]=it[x];break}};
  if(t==='flow')A('nodes','steps','items','stages');if(t==='formula')A('tex','formula','text','latex');if(t==='text')A('text','content','value');if(t==='image')A('src','image','file','url');
  if(t==='mindmap'){A('center','text','title','topic');A('branches','children','items');if(Array.isArray(it.branches))it.branches=it.branches.map(b=>typeof b==='string'?b:{...b,text:b.text??b.title??b.name})}
  if(t==='timeline'){A('events','items','points');if(Array.isArray(it.events))it.events=it.events.map(e=>{if(typeof e==='string')return {title:e};const o={...e};o.date=o.date??o.year??o.time??o.when;if(o.title==null){o.title=o.text??o.label??o.name;if(o.title===o.text)delete o.text}return o})}
  if(t==='compare'&&Array.isArray(it.columns))it.columns=it.columns.map(c=>({...c,items:c.items??c.points??c.rows,title:c.title??c.name}));
  if(t==='barchart'||t==='pie')A('data','values','items');if(t==='chart')A('fns','functions','fn','f');if(typeof it.fns==='string')it.fns=[it.fns];
  if(t==='emoji')A('char','emoji','text');if(t==='number')A('value','to','number');if(t==='label')A('text','label');return it}
function sayChunks(say){if(!say)return [];return String(say).match(/[^.!?…]+[.!?…]*\s*/g).map(s=>s.trim()).filter(Boolean)}
let IRIS=null,IRIS2=null,TZC=null,TZM=null,TZB=null;
// ---- 26 scene transitions (default 'auto' = a different one every scene) ----
const TZ_DUR={fade:.6,zoom:.6,slide:.6,whip:.45,dive:1.1,iris:.9,'push-left':.75,'push-right':.75,'push-up':.75,'push-down':.75,'wipe-left':.8,'wipe-right':.8,'wipe-up':.8,'wipe-down':.8,split:.8,barn:.8,blinds:.95,venetian:.95,diagonal:.85,grid:1.05,radial:.9,blur:.8,flip:.8,spin:.8,page:.95,'zoom-out':.7,cut:.001};
const TZ_ALL=Object.keys(TZ_DUR);const TZ_CLIP=new Set(['wipe-left','wipe-right','wipe-up','wipe-down','split','barn','blinds','venetian','diagonal','grid','radial']);const TZ_KEEP=new Set(['push-left','push-right','push-up','push-down','flip','page']);
const TZ_POOL=['push-left','wipe-right','iris','blinds','zoom','split','push-up','diagonal','blur','slide','flip','grid','page','barn','radial','venetian','spin','zoom-out','wipe-down','push-right'];let TZ_LAST=null;
function autoTz(si){if(si===0)return 'fade';const P=Array.isArray(LSN.transitions)?LSN.transitions:TZ_POOL;let k=Math.floor(seeded(si,17)*P.length)%P.length;let n=P[k];if(n===TZ_LAST)n=P[(k+1)%P.length];TZ_LAST=n;return n}
function tzSetup(HUD){const cp=el('clipPath',{id:'tzclip',clipPathUnits:'userSpaceOnUse'},DEFS);TZC=el('g',{},cp);const m=el('mask',{id:'tzmask',maskUnits:'userSpaceOnUse',x:-SW,y:-SH,width:SW*3,height:SH*3},DEFS);el('rect',{x:-SW,y:-SH,width:SW*3,height:SH*3,fill:'#fff'},m);TZM=el('g',{},m);
  [6,14,26].forEach((d,i)=>{const f=el('filter',{id:'tzb'+(i+1),x:'-10%',y:'-10%',width:'120%',height:'120%'},DEFS);el('feGaussianBlur',{stdDeviation:f2(d*SU)},f)});
  const ps=el('filter',{id:'pageSh',x:'-10%',y:'-10%',width:'120%',height:'130%'},DEFS);el('feDropShadow',{dx:0,dy:f2(18*SU),stdDeviation:f2(26*SU),'flood-color':'#000','flood-opacity':.35},ps);
  TZB=el('path',{fill:'none',stroke:col('a1'),'stroke-width':f2(6*SU),'stroke-linecap':'round'},HUD);TZB.style.display='none'}
function tzClip(n,p){TZC.textContent='';TZM.textContent='';const sh=[];const R=(x,y,w,h)=>sh.push(['rect',{x:f2(x),y:f2(y),width:f2(Math.max(0,w)),height:f2(Math.max(0,h))}]);let edge=null;
  if(n==='wipe-right'){R(0,0,SW*p,SH);edge=`M${f2(SW*p)},0 L${f2(SW*p)},${SH}`}else if(n==='wipe-left'){R(SW*(1-p),0,SW*p,SH);edge=`M${f2(SW*(1-p))},0 L${f2(SW*(1-p))},${SH}`}
  else if(n==='wipe-down'){R(0,0,SW,SH*p);edge=`M0,${f2(SH*p)} L${SW},${f2(SH*p)}`}else if(n==='wipe-up'){R(0,SH*(1-p),SW,SH*p);edge=`M0,${f2(SH*(1-p))} L${SW},${f2(SH*(1-p))}`}
  else if(n==='split')R(SW/2*(1-p),0,SW*p,SH);else if(n==='barn')R(0,SH/2*(1-p),SW,SH*p);
  else if(n==='blinds'){const N=8;for(let i=0;i<N;i++){const q=E.inOutCubic(prog(p,i*.05,i*.05+.65));R(0,i*SH/N,SW,SH/N*q+.5)}}
  else if(n==='venetian'){const N=12,w=SW/N;for(let i=0;i<N;i++){const q=E.inOutCubic(prog(p,i*.03,i*.03+.67));R(i*w+w/2*(1-q),0,w*q+.5,SH)}}
  else if(n==='diagonal'){const X=-SH*.4+(SW+SH*.8)*p;sh.push(['polygon',{points:`0,0 ${f2(X+SH*.35)},0 ${f2(X-SH*.35)},${SH} 0,${SH}`}]);edge=`M${f2(X+SH*.35)},0 L${f2(X-SH*.35)},${SH}`}
  else if(n==='grid'){const C=8,Rr=5,w=SW/C,h=SH/Rr;for(let a=0;a<C;a++)for(let b=0;b<Rr;b++){const d=(a+b)/(C+Rr-2)*.55,q=E.outCubic(prog(p,d,d+.45));R(a*w+w/2*(1-q),b*h+h/2*(1-q),w*q+.6,h*q+.6)}}
  else if(n==='radial')sh.push(['circle',{cx:0,cy:SH,r:f2(Math.hypot(SW,SH)*p)}]);
  sh.forEach(([t,a])=>{el(t,a,TZC);el(t,{...a,fill:'#000'},TZM)});
  if(edge&&p>0&&p<1){TZB.style.display='';at(TZB,{d:edge,opacity:f2(Math.sin(Math.PI*p))})}}
// ---- camera presets: camera:'push-in' | {preset:'focus', on:'@heart', zoom:1.6} | keyframes as before. No camera → a gentle, different move each scene ----
function camPreset(c,S,si){const d=S.dur;
  if(c==null||c==='auto'){if(LSN.drift===false||LSN.camera===false)return null;const P=['soft-in','soft-out','soft-right','soft-left','soft-up','soft-rot'];c=(typeof LSN.camera==='string'&&LSN.camera!=='auto')?LSN.camera:P[Math.floor(seeded(si,13)*P.length)%P.length]}
  if(c===false||c==='none'||c==='static')return null;if(Array.isArray(c))return c;if(typeof c==='object'&&!c.preset)return c;
  const o=typeof c==='string'?{preset:c}:c;const n=o.preset,z=o.zoom,on=o.on,t0=o.at??o.t??0;const cx=SW/2,cy=SH/2,X=SW*.075,Y=SH*.07;
  if(n==='tour'){const L=[].concat(on||[]);if(!L.length){SERR_WARN.push(`scene ${si+1}: camera tour needs on:['@a','@b']`);return null}const seg=(d-1.6)/L.length;return [...L.map((p,k)=>({on:p,t:.5+k*seg,dur:Math.min(1.3,seg*.6),zoom:z??1.5})),{t:d-1.4,dur:1.1,zoom:1,x:cx,y:cy}]}
  const A={'soft-in':[{t:0,dur:d,zoom:1.04,ease:'linear'}],'soft-out':[{t:0,dur:.001,zoom:1.04},{t:0,dur:d,zoom:1,ease:'linear'}],
    'soft-right':[{t:0,dur:.001,x:cx-22*SU,zoom:1.03},{t:0,dur:d,x:cx+22*SU,ease:'linear'}],'soft-left':[{t:0,dur:.001,x:cx+22*SU,zoom:1.03},{t:0,dur:d,x:cx-22*SU,ease:'linear'}],
    'soft-up':[{t:0,dur:.001,y:cy+16*SU,zoom:1.03},{t:0,dur:d,y:cy-16*SU,ease:'linear'}],'soft-rot':[{t:0,dur:.001,zoom:1.03,rotate:-.5},{t:0,dur:d,rotate:.5,ease:'linear'}],
    'push-in':[{on,t:t0+.3,dur:o.dur??Math.max(1.5,d*.7),zoom:z??1.2}],'pull-out':[{on,t:0,dur:.001,zoom:z??1.35},{t:t0+.3,dur:o.dur??2.6,zoom:1,x:cx,y:cy}],
    'ken-burns':[{t:0,dur:.001,zoom:1.06,x:cx-X*.6,y:cy+Y*.4},{t:0,dur:d,zoom:z??1.16,x:cx+X*.6,y:cy-Y*.4,ease:'inOutQuad'}],
    'pan-right':[{t:0,dur:.001,zoom:z??1.15,x:cx-X},{t:t0,dur:o.dur??d,x:cx+X,ease:'inOutQuad'}],'pan-left':[{t:0,dur:.001,zoom:z??1.15,x:cx+X},{t:t0,dur:o.dur??d,x:cx-X,ease:'inOutQuad'}],
    'pan-down':[{t:0,dur:.001,zoom:z??1.15,y:cy-Y},{t:t0,dur:o.dur??d,y:cy+Y,ease:'inOutQuad'}],'pan-up':[{t:0,dur:.001,zoom:z??1.15,y:cy+Y},{t:t0,dur:o.dur??d,y:cy-Y,ease:'inOutQuad'}],
    orbit:[{t:0,dur:.001,zoom:z??1.08,rotate:-2},{t:0,dur:d}],dolly:[{on,t:t0+.2,dur:o.dur??d*.8,zoom:z??1.25,rotate:1,ease:'inOutQuad'}],
    crane:[{t:0,dur:.001,y:cy-SH*.11,zoom:1.12},{t:t0,dur:o.dur??Math.min(d,3.5),y:cy,zoom:1.04,ease:'outCubic'}],
    reveal:[{on,t:0,dur:.001,zoom:z??1.8},{t:o.hold??.9,dur:o.dur??1.8,zoom:1,x:cx,y:cy}],
    focus:[{on,t:t0||d*.3,dur:1.2,zoom:z??1.6},{t:Math.max((t0||d*.3)+2.2,d-1.6),dur:1.2,zoom:1,x:cx,y:cy}]};
  A.orbit[1].rotate=2;
  if(!A[n]){SERR.push(`scene ${si+1}: unknown camera preset "${n}" → ${[...Object.keys(A),'tour'].join(', ')}`);return null}
  return A[n].map(k=>{const q={...k};if(q.on==null)delete q.on;return q})}

async function LESSON(cfg){
  LSN=cfg||{};window.__errors=SERR;window.__warnings=SERR_WARN;window.__ready=false;const q=new URLSearchParams(location.search);
  const fmt=LSN.format||'16:9';[SW,SH]=fmt==='9:16'?[1080,1920]:fmt==='1:1'?[1080,1080]:fmt==='4:5'?[1080,1350]:[1920,1080];SU=Math.min(SW,SH)/1080;
  LANG=LSN.lang||'uz';TH={...(STHEMES[LSN.theme]||STHEMES.night),...(LSN.colors||{})};if(LSN.theme&&!STHEMES[LSN.theme])SERR.push(`theme "${LSN.theme}" unknown → ${Object.keys(STHEMES).join(', ')}`);
  FONT=LSN.font||'Inter,"Segoe UI",Roboto,Arial,"Liberation Sans",sans-serif';MATHF=LSN.mathFont||'"Cambria Math","STIX Two Math","Times New Roman","Liberation Serif",serif';MONOF='"JetBrains Mono",Consolas,"Liberation Mono",monospace';
  SGRID=q.has('grid');const FPS=LSN.fps||30;
  const st=document.createElement('style');st.textContent=`html,body{margin:0;height:100%;background:${TH.bg};overflow:hidden}#stage{display:block;width:100vw;height:100vh}
  .dr{stroke-dasharray:1 1}#ui{position:fixed;left:0;right:0;bottom:0;display:flex;gap:8px;align-items:center;padding:8px 12px;background:linear-gradient(transparent,rgba(0,0,0,.65));font:13px system-ui;opacity:.15;transition:opacity .3s}#ui:hover{opacity:1}
  #ui button{background:rgba(255,255,255,.14);color:#fff;border:0;border-radius:6px;padding:6px 10px;cursor:pointer}#bar{flex:1;height:6px;background:rgba(255,255,255,.2);border-radius:3px;position:relative;cursor:pointer}#fill{position:absolute;left:0;top:0;bottom:0;background:${TH.a1};border-radius:3px}
  .mk{position:absolute;top:-3px;width:2px;height:12px;background:rgba(255,255,255,.6)}#tc{color:#fff;font:12px ui-monospace,monospace;min-width:92px}body.capture #ui{display:none}
  #err{position:fixed;left:10px;top:10px;right:10px;background:#B00020;color:#fff;font:14px/1.45 ui-monospace,monospace;padding:10px 14px;border-radius:8px;white-space:pre-wrap;z-index:9;max-height:45vh;overflow:auto}`;document.head.appendChild(st);
  if(LSN.fontUrl){try{const ff=await new FontFace(FONT.split(',')[0].replace(/"/g,''),`url(${LSN.fontUrl})`).load();document.fonts.add(ff)}catch(e){SERR.push('fontUrl failed: '+e.message)}}
  await document.fonts.ready;
  SVG=el('svg',{id:'stage',viewBox:`0 0 ${SW} ${SH}`,xmlns:NS,'font-family':FONT},document.body);makeDefs();
  // background
  const BG=el('g',{},SVG);el('rect',{width:SW,height:SH,fill:'url(#bgg)'},BG);
  if(LSN.grid!==false){const pid='bgp';const pt=el('pattern',{id:pid,width:f2(60*SU),height:f2(60*SU),patternUnits:'userSpaceOnUse'},DEFS);
    if(LSN.theme==='blueprint'||LSN.theme==='paper')el('path',{d:`M${f2(60*SU)},0 L0,0 0,${f2(60*SU)}`,fill:'none',stroke:TH.faint,'stroke-width':1},pt);else el('circle',{cx:f2(30*SU),cy:f2(30*SU),r:f2(1.6*SU),fill:TH.faint},pt);el('rect',{width:SW,height:SH,fill:`url(#${pid})`,opacity:.8},BG)}
  const dust=[];if(LSN.dust!==false&&LSN.theme!=='paper')for(let i=0;i<26;i++)dust.push(el('circle',{r:f2((1+seeded(i,1)*2.4)*SU),fill:i%3?TH.a1:TH.a5,opacity:f2(.08+seeded(i,2)*.14)},BG));
  {const wf=el('filter',{id:'whipblur',x:'-20%',y:'-5%',width:'140%',height:'110%'},DEFS);el('feGaussianBlur',{stdDeviation:`${40*SU} 0`},wf);const ic=el('clipPath',{id:'irisclip'},DEFS);IRIS=el('circle',{cx:SW/2,cy:SH/2,r:10},ic);const im=el('mask',{id:'irismask',maskUnits:'userSpaceOnUse',x:-SW,y:-SH,width:SW*3,height:SH*3},DEFS);el('rect',{x:-SW,y:-SH,width:SW*3,height:SH*3,fill:'#fff'},im);IRIS2=el('circle',{cx:SW/2,cy:SH/2,r:10,fill:'#000'},im)}
  ROOTG=el('g',{},SVG);const HUD=el('g',{},SVG);tzSetup(HUD);el('rect',{width:SW,height:SH,fill:'url(#vig)','pointer-events':'none'},SVG);const TOP=el('g',{},SVG);
  // ---- images & audio preload ----
  const srcs=new Set();const scan=o=>{if(!o||typeof o!=='object')return;for(const k in o){const v=o[k];if((k==='src'||k==='object'||k==='image')&&typeof v==='string'&&!/^(@|#)/.test(v))srcs.add(v);else if(typeof v==='object')scan(v)}};scan(LSN.scenes);
  await Promise.all([...srcs].map(src=>new Promise(res=>{const im=new Image();im.onload=()=>{SIMG[src]=im;res()};im.onerror=()=>{SERR.push('image not found: '+src+' (put the file next to the HTML or use a data: URI)');res()};im.src=src})));
  const AUD={};const dec=new OfflineAudioContext(2,48000,48000);const afiles=new Set([LSN.voice&&LSN.voice.file,LSN.music&&LSN.music.file,...(LSN.scenes||[]).map(s=>s.audio&&(s.audio.file||s.audio))].filter(x=>typeof x==='string'));
  await Promise.all([...afiles].map(async f=>{try{const ab=await (await fetch(f)).arrayBuffer();AUD[f]={ab,buf:await dec.decodeAudioData(ab.slice(0))}}catch(e){SERR.push('audio not found/decodable: '+f)}}));
  // ---- scenes ----
  if(!Array.isArray(LSN.scenes)||!LSN.scenes.length){SERR.push('LESSON needs scenes:[…]');LSN.scenes=[{kind:'title'}]}
  const REG={};let T0=0;const TRANS=.6;
  SCN=LSN.scenes.map((s,si)=>{const where=`scene ${si+1}${s.title?' "'+s.title+'"':''}`;Object.keys(s).forEach(k=>{if(!SCENE_KEYS.includes(k)){const n=near(k,SCENE_KEYS);SERR.push(`${where}: unknown key "${k}"${n&&n[1]<=3?' – did you mean "'+n[0]+'"?':''}`)}});
    LBLREC.length=0;const S={...s,i:si,g:el('g',{},ROOTG),cam:null,items:[],chunks:sayChunks(s.say)};S.cam=el('g',{id:'cam'+si},S.g);S.over=el('g',{},S.g);S.pin=el('g',{},S.g);S.cards=el('g',{},S.pin);
    let items=(s.items||[]).slice();
    if(s.kind==='title')items.unshift({type:'titleCard',text:s.title||LSN.title,subtitle:s.subtitle,_t:1});
    if(s.kind==='end')items.unshift({type:'summary',points:s.points||[],text:s.text,area:'full',at:.3,_t:1});
    if(s.kind==='quiz')items.unshift({type:'quiz',question:s.question,options:s.options,answer:s.answer,think:s.think,explain:s.explain,area:'full',at:.3,_t:1});
    const header=s.title&&!s.kind;let cursor=header?.8:.4,prevStart=cursor,end=0;
    if(header){const hg=el('g',{},S.g);S.hg=hg;if(LSN.headerScrim!==false)el('rect',{x:0,y:0,width:SW,height:f2((SH>SW?260:170)*SU),fill:gradient([[0,TH.bg,.92],[.6,TH.bg,.7],[1,TH.bg,0]])},hg);const hs=(SH>SW?58:52)*SU,hx=(SH>SW?96:96)*SU,hy=(SH>SW?190:108)*SU;const num=String(SCN_COUNT(si)).padStart(2,'0');
      const nb=el('g',{},hg);el('rect',{x:f2(hx),y:f2(hy-hs*.82),width:f2(hs*1.25),height:f2(hs*1.05),rx:f2(10*SU),fill:col('a1'),'fill-opacity':.16,stroke:col('a1'),'stroke-width':f2(2*SU)},nb);textEl(nb,num,hx+hs*.625,hy-hs*.06,{size:hs*.55,weight:800,anchor:'middle',color:'a1',fam:MONOF});
      let hs2=hs;const hmax=SW-hx*2-hs*1.6-(LSN.brand?160*SU:0);while(hs2>hs*.62&&tw(String(s.title).replace(/\*/g,''),hs2,800)>hmax)hs2*=.95;let ht=String(s.title);if(tw(ht.replace(/\*/g,''),hs2,800)>hmax){SERR_WARN.push(`scene ${si+1}: title too long for one line — shorten it (max ~${Math.round(hmax/(hs2*.55))} characters)`);while(ht.length>8&&tw(ht.replace(/\*/g,'')+'…',hs2,800)>hmax)ht=ht.replace(/\s*\S+\s*$/,'');ht+='…'}const TT=typeof s.typo==='object'&&s.typo.title||typeof LSN.typo==='object'&&LSN.typo.title||(LSN.typo===false||s.typo===false?'slide-left':TYPO.pick('title',si*3+1));const HB=TYPO.block(hg,[{s:ht,x:hx+hs*1.6,y:hy,size:hs2,weight:800,accent:'a2',p:0}],{in:TT});S.titleFx=TT;
      const ul=el('rect',{x:f2(hx+hs*1.6),y:f2(hy+16*SU),width:0,height:f2(4*SU),rx:f2(2*SU),fill:col('a1')},hg);const hw=Math.min(tw(ht.replace(/\*/g,''),hs2,800),SW-hx*2-hs*1.6);
      S.header=lt=>{HB.update(lt,.05,S.dur);nb.setAttribute('opacity',f2(prog(lt,0,.4)));ul.setAttribute('width',f2(hw*.22*E.inOutCubic(prog(lt,.4,1.1))))}}
    items.forEach((it0,ii)=>{const iw=`${where} item ${ii+1} (${it0.type})`;const it=alias({...it0});const B=SM.items[it.type];
      if(!B){const n=near(String(it.type),Object.keys(SM.items));SERR.push(`${iw}: unknown type "${it.type}"${n?' – did you mean "'+n[0]+'"?':''}`);return}
      if(it.area&&!Array.isArray(it.box)&&!areas()[it.area])SERR.push(`${iw}: unknown area "${it.area}" → ${Object.keys(areas()).join(', ')}`);
      ['from','to'].forEach(k=>{it[k]=resolvePt(it[k],REG,iw)});if(it.on){const p=resolvePt(it.on,REG,iw);if(Array.isArray(p)){it.x=p[0];it.y=p[1]}}
      if(typeof it.at==='string'&&it.at[0]==='@'){const p=resolvePt(it.at,REG,iw);it.x=p[0];it.y=p[1];delete it.at}
      let start;if(typeof it.at==='number')start=it.at;else if(typeof it.at==='string'&&/^[+-]/.test(it.at))start=prevStart+parseFloat(it.at);else if(it.with)start=prevStart;else start=cursor;
      const wrap=el('g',{},S.cam);let R;BUILDHOST=wrap;try{R=B.build(it,{scene:S,REG})}catch(e){BUILDHOST=null;wrap.remove();SERR.push(`${iw}: ${e.message}`);console.error(e);return}BUILDHOST=null;
      wrap.appendChild(R.g);if(R.overlay)S.over.appendChild(wrap);else if(R.pin&&LSN.pinText!==false)S.pin.appendChild(wrap);let bb={x:SW/2,y:SH/2,width:0,height:0};try{bb=wrap.getBBox()}catch(e){}
      const center=R.anchor||[bb.x+bb.width/2,bb.y+bb.height/2];if(it.id)REG[it.id]={anchors:R.anchors||{},center,frame:R.frame,R};
      const ent=it.dur??ENT[it.type]??1.4;const anim=it.anim||ANIM_DEF[it.type]||'grow';const drs=R.noDraw?[]:[...wrap.querySelectorAll('.dr')];
      const len=R.len?R.len():ent;const o={it,wrap,R,start,ent,anim,drs,center,where:iw,errd:false,pinned:wrap.parentNode===S.pin};S.items.push(o);
      prevStart=start;cursor=Math.max(cursor,start+(it.wait??(len*.8+.45)));end=Math.max(end,start+len)});
    // ---- layout guard: floating objects (magnifier, formulas, pictures, small diagrams) never cover text and never leave the frame ----
    if(LSN.layoutGuard!==false){try{const inv=S.cam.getScreenCTM().inverse();const bxo=e=>{const r=e.getBBox();const m=inv.multiply(e.getScreenCTM());const P=[[r.x,r.y],[r.x+r.width,r.y],[r.x,r.y+r.height],[r.x+r.width,r.y+r.height]].map(([x,y])=>[m.a*x+m.c*y+m.e,m.b*x+m.d*y+m.f]);const xs=P.map(p=>p[0]),ys=P.map(p=>p[1]);return {x:Math.min(...xs),y:Math.min(...ys),w:Math.max(...xs)-Math.min(...xs),h:Math.max(...ys)-Math.min(...ys)}};
      const V=SH>SW,top=(header?(V?230:150):24)*SU,bot=(s.say&&LSN.captions!==false?(V?360:140):24)*SU,SAFE={x:24*SU,y:top,w:SW-48*SU,h:SH-top-bot};
      const ov=(a,b,g=0)=>Math.max(0,Math.min(a.x+a.w,b.x+b.w)+g-Math.max(a.x,b.x))*Math.max(0,Math.min(a.y+a.h,b.y+b.h)+g-Math.max(a.y,b.y));
      const inside=(b,t=1)=>b.x>=SAFE.x-t&&b.y>=SAFE.y-t&&b.x+b.w<=SAFE.x+SAFE.w+t&&b.y+b.h<=SAFE.y+SAFE.h+t;
      const TXT=[];S.items.forEach(o=>{if(o.pinned){const b=bxo(o.wrap);if(b.w){TXT.push(b);o.tb=b}}});
      TXT.forEach((a,i)=>TXT.forEach((b,j)=>{if(j>i&&ov(a,b)>.05*Math.min(a.w*a.h,b.w*b.h))SERR_WARN.push(`scene ${si+1}: two text blocks overlap — give them different areas`)}));
      const IJ=JSON.stringify(s.items||[]);const refd=id=>id&&IJ.includes('"@'+id);
      const FIXED=new Set(['text','arrow','label','pulse','shape','spotlight','titleCard','summary','quiz','fire','smoke','water','rain','snow','bubbles','sparks','lightning','rays','explosion','glowOrb']);
      const soft=[];S.items.forEach(o=>{if(!o.pinned&&o.it.type!=='magnifier'){try{const b=bxo(o.wrap);if(b.w*b.h<SW*SH*.6)soft.push({o,b})}catch(e){}}});
      const placed=TXT.slice();
      const spot=(b,avoidSoft,self)=>{for(let rr=0;rr<=Math.max(SW,SH);rr+=24*SU){const n=rr?Math.max(8,Math.round(rr/(18*SU))):1;for(let k=0;k<n;k++){const a=k/n*TAU;const c={x:b.x+Math.cos(a)*rr,y:b.y+Math.sin(a)*rr,w:b.w,h:b.h};if(!inside(c))continue;if(placed.some(p=>ov(p,c,14*SU)>0))continue;if(avoidSoft&&soft.some(q=>q.o!==self&&ov(q.b,c,8*SU)>0))continue;return c}}return null};
      const move=(o,dx,dy)=>{if(!o.fix){o.fix=el('g',{},o.wrap);o.fix.appendChild(o.R.g)}o.fix.setAttribute('transform',`translate(${f2(dx)} ${f2(dy)})`);o.center=[o.center[0]+dx,o.center[1]+dy];const r=o.it.id&&REG[o.it.id];if(r){r.center=[r.center[0]+dx,r.center[1]+dy];for(const k in r.anchors){const v=r.anchors[k];if(Array.isArray(v))r.anchors[k]=[v[0]+dx,v[1]+dy]}}};
      const lenses=[];[...S.items.filter(o=>o.it.type!=='magnifier'),...S.items.filter(o=>o.it.type==='magnifier')].forEach(o=>{const t=o.it.type;
        if(t==='magnifier'&&o.R.setLens){const hard=TXT.concat(lenses);const L=o.R.lens();const lb=(x,y,r)=>{const w=Math.max(r*2,L.lw||0);return {x:x-w/2,y:y-r,w,h:r*2+(L.label?70*SU:0)}};const tg={x:L.tx-L.r/L.z-30*SU,y:L.ty-L.r/L.z-30*SU,w:2*L.r/L.z+60*SU,h:2*L.r/L.z+60*SU};
          const sc=c=>soft.reduce((a,q)=>a+ov(q.b,c),0)+ov(tg,c)*6;let cur=lb(L.lx,L.ly,L.r);
          if(!inside(cur,4)||hard.some(p=>ov(p,cur,10*SU)>0)||(L.auto&&sc(cur)>cur.w*cur.h*.25)){let best=null;
            for(const k of [1,.86,.74,.62,.52]){const r=L.r*k;const hw=Math.max(r,(L.lw||0)/2);for(let x=SAFE.x+hw;x<=SAFE.x+SAFE.w-hw;x+=30*SU)for(let y=SAFE.y+r;y<=SAFE.y+SAFE.h-r-(L.label?70*SU:0);y+=30*SU){const c=lb(x,y,r);if(hard.some(p=>ov(p,c,12*SU)>0))continue;const v=sc(c)/(c.w*c.h)*4+Math.hypot(x-L.tx,y-L.ty)/SW*.6+(1-k)*1.5;if(!best||v<best.v)best={v,x,y,r}}}
            if(best){o.R.setLens(best.x,best.y,best.r);cur=lb(best.x,best.y,best.r)}else SERR_WARN.push(`scene ${si+1}: no free place for the magnifier — text would be covered; use a smaller r or less text`)}
          lenses.push(cur);placed.push(cur)}
        else if(!o.pinned&&!FIXED.has(t)&&!o.it.lock&&!refd(o.it.id)){let b;try{b=bxo(o.wrap)}catch(e){return}if(!b.w||b.w*b.h>SW*SH*.35)return;
          const hit=placed.some(p=>ov(p,b)>.04*b.w*b.h);const fits=b.w<=SAFE.w&&b.h<=SAFE.h;
          if((hit||!inside(b,6))&&fits){const c=spot(b,true,o)||spot(b,false,o);if(c){move(o,c.x-b.x,c.y-b.y);b=c}else SERR_WARN.push(`scene ${si+1}: ${t} covers text and no free place was found — use another area`)}
          placed.push(b)}});
      if(s.camera&&s.camera!=='auto'){S.hasCards=true;S.items.forEach(o=>{if(o.tb){const b=o.tb,px=30*SU,py=24*SU;o.card=el('rect',{x:f2(b.x-px),y:f2(b.y-py),width:f2(b.w+px*2),height:f2(b.h+py*2),rx:f2(22*SU),fill:TH.bg,'fill-opacity':.94,stroke:TH.faint,'stroke-width':f2(1.5*SU),opacity:0},S.cards)}})}
    }catch(e){console.warn('layoutGuard',e)}}
    // ---- text guard: labels never overlap other texts, the header band or the caption band ----
    if(LSN.textGuard!==false&&LBLREC.length){try{const inv=S.cam.getScreenCTM().inverse();const bbx=e=>{const r=e.getBBox();const m=inv.multiply(e.getScreenCTM());const P=[[r.x,r.y],[r.x+r.width,r.y],[r.x,r.y+r.height],[r.x+r.width,r.y+r.height]].map(([x,y])=>[m.a*x+m.c*y+m.e,m.b*x+m.d*y+m.f]);const xs=P.map(p=>p[0]),ys=P.map(p=>p[1]);return {x:Math.min(...xs),y:Math.min(...ys),w:Math.max(...xs)-Math.min(...xs),h:Math.max(...ys)-Math.min(...ys)}};
      const mine=new Set(LBLREC.map(r=>r.tx));const obs=[...S.cam.querySelectorAll('text')].filter(t=>!mine.has(t)&&t.textContent.trim()).map(t=>({...bbx(t),fixed:true}));S.items.forEach(o=>{if(o.pinned){try{const b=bbx(o.wrap);if(b.w)obs.push({...b,fixed:true})}catch(e){}}});
      if(header)obs.push({x:0,y:0,w:SW,h:(SH>SW?230:150)*SU,fixed:true});if(LSN.captions!==false&&s.say)obs.push({x:SW*.12,y:SH-(SH>SW?360:135)*SU,w:SW*.76,h:(SH>SW?360:135)*SU,fixed:true});
      const L=LBLREC.map(r=>({...bbx(r.tx),rec:r}));const out=TL.relax([...obs,...L],{gap:8*SU,bounds:{x:0,y:(header?(SH>SW?230:150):20)*SU,w:SW,h:SH-(header?(SH>SW?230:150):20)*SU-(s.say?(SH>SW?360:135):20)*SU},iterations:80});
      out.slice(obs.length).forEach((r,k)=>{const o0=L[k];const dy=r.y-o0.y;if(Math.abs(dy)>.5)o0.rec.move(o0.rec.ty+dy)});
      const rest=TL.relax([],{});const left=[];out.forEach((a,i)=>out.forEach((b,j)=>{if(j>i&&TL.hits(a,b,-2)&&!(a.fixed&&b.fixed))left.push(1)}));if(left.length)SERR_WARN.push(`scene ${si+1}: ${left.length} label(s) still crowded — use fewer labels or a bigger area`)}catch(e){console.warn('textGuard',e)}}
    if(LBLREC.length){try{const inv=S.cam.getScreenCTM().inverse();S.lbls=LBLREC.filter(r=>r.g).map(r=>{const b=r.tx.getBBox(),m=inv.multiply(r.tx.getScreenCTM());const P=[[b.x,b.y],[b.x+b.width,b.y+b.height]].map(([x,y])=>[m.a*x+m.c*y+m.e,m.b*x+m.d*y+m.f]);return {rec:r,x1:Math.min(P[0][0],P[1][0]),x2:Math.max(P[0][0],P[1][0]),y1:Math.min(P[0][1],P[1][1]),y2:Math.max(P[0][1],P[1][1])}})}catch(e){}}
    LBLREC.length=0;
    const wc=x=>String(x||'').replace(/[*]/g,' ').split(/\s+/).filter(Boolean).length;const pace=s.pace??LSN.pace??1;const capW=wc(s.say);const scrW=(s.items||[]).reduce((a,it)=>a+(it.type==='text'?wc(it.text??it.content??it.value):0),0)+(s.kind==='end'?wc((s.points||[]).join(' ')):0);const sayNeed=capW?(capW/2.3+S.chunks.length*.3+1)*pace:0,readNeed=scrW?(scrW/3+1)*pace:0;const sayDur=capW?sayNeed+readNeed*.45:readNeed;S.need=sayDur;const ad=s.audio&&AUD[s.audio.file||s.audio]?AUD[s.audio.file||s.audio].buf.duration+.9:0;
    S.dur=s.dur??Math.max(end+(s.hold??2.2),sayDur,ad?ad+readNeed*.25:0,s.kind==='title'?4.5:2.5);if(s.dur!=null&&s.dur<sayDur*.8)SERR_WARN.push(`scene ${si+1}: dur ${s.dur}s is too short for its text/subtitles (needs ~${Math.ceil(sayDur)}s) — remove dur, the engine times scenes from the text`);
    {const want=s.transition||(s.dive?'dive':null)||LSN.transition||'auto';S.tz=(want==='auto'||want==='random')?autoTz(si):want;if(!TZ_ALL.includes(S.tz)){SERR.push(`scene ${si+1}: unknown transition "${S.tz}" → ${TZ_ALL.join(', ')}`);S.tz='fade'}S.camK=camPreset(s.camera,S,si)}S.start=T0;T0+=S.dur;
    // focus windows
    S.focus=[].concat(s.focus||[]).map(f=>({...f,ids:[].concat(f.on||f.id||[])}));
    // captions schedule
    let tot=S.chunks.reduce((a,c)=>a+c.length,0),acc=0;S.cap=S.chunks.map(c=>{const a=.25+acc/tot*(S.dur-.5);acc+=c.length;return {text:c,a,b:.25+acc/tot*(S.dur-.5)}});
    return S});
  SCN.forEach(S=>S.g.style.display='none');
  function SCN_COUNT(si){let n=0;for(let k=0;k<=si;k++)if(LSN.scenes[k].title&&!LSN.scenes[k].kind)n++;return n}
  SDUR=Math.max(1,T0);const DUR=SDUR;
  // ---- captions + progress (HUD, outside camera) ----
  const capOn=LSN.captions!==false&&!q.has('nocap');const capG=el('g',{},HUD);const capBg=el('rect',{rx:f2(16*SU),fill:'rgba(0,0,0,.55)'},capG);const capT=[0,1,2].map(()=>el('text',{'font-size':f2(36*SU),'font-weight':600,fill:'#fff','text-anchor':'middle','font-family':FONT},capG));
  const capY=SH-(SH>SW?300:70)*SU;let lastCap=null;
  const setCap=(txt,op)=>{if(!capOn||!txt){capG.setAttribute('opacity',0);return}if(txt!==lastCap){lastCap=txt;const ls=wrapText(txt,36*SU,SW*(SH>SW?.84:.7),600).slice(0,3);const lh=46*SU;
      capT.forEach((t,i)=>{richT(t,ls[i]||'',TH.a2);at(t,{x:SW/2,y:f2(capY-(ls.length-1-i)*lh)})});const w=Math.max(...ls.map(l=>tw(l.replace(/\*/g,''),36*SU,600)))+60*SU;at(capBg,{x:f2(SW/2-w/2),y:f2(capY-(ls.length-1)*lh-40*SU),width:f2(w),height:f2((ls.length-1)*lh+60*SU)})}capG.setAttribute('opacity',f2(op))};
  const progG=el('g',{},HUD);const pOn=LSN.progress!==false;el('rect',{x:0,y:f2(SH-5*SU),width:SW,height:f2(5*SU),fill:TH.faint},progG);const pFill=el('rect',{x:0,y:f2(SH-5*SU),width:0,height:f2(5*SU),fill:col('a1')},progG);
  SCN.forEach(s=>{if(s.i)el('rect',{x:f2(s.start/DUR*SW-1.5*SU),y:f2(SH-5*SU),width:f2(3*SU),height:f2(5*SU),fill:TH.bg},progG)});if(!pOn)progG.style.display='none';
  const brand=LSN.brand?textEl(HUD,LSN.brand,SW-40*SU,(SH>SW?100:58)*SU,{size:24*SU,weight:700,anchor:'end',color:'dim',ls:2*SU}):null;
  // ---- guides overlay (G key / ?guides=1): stage grid + named areas so coordinates are never guessed ----
  const GU=el('g',{opacity:.9},TOP);GU.style.display=q.has('guides')?'':'none';{const step=100;for(let x=0;x<=SW;x+=step){el('line',{x1:x,y1:0,x2:x,y2:SH,stroke:'#ff0',opacity:x%500?.15:.4},GU);if(x%200===0)textEl(GU,String(x),x+4,16,{size:14,color:'#ff0',fam:MONOF})}
    for(let y=0;y<=SH;y+=step){el('line',{x1:0,y1:y,x2:SW,y2:y,stroke:'#ff0',opacity:y%500?.15:.4},GU);if(y%200===0)textEl(GU,String(y),4,y-4,{size:14,color:'#ff0',fam:MONOF})}
    const A=areas();['full','left','right','top','bottom'].forEach((k,i)=>{const [x,y,w,h]=A[k];el('rect',{x,y,width:w,height:h,fill:'none',stroke:['#0ff','#f0f','#0f0','#fa0','#f55'][i],'stroke-dasharray':'8 6','stroke-width':2},GU);textEl(GU,k,x+8,y+22+i*20,{size:18,color:['#0ff','#f0f','#0f0','#fa0','#f55'][i],fam:MONOF})})}
  // ---- render(t) ----
  const sceneAt=t=>{for(let i=SCN.length-1;i>=0;i--)if(t>=SCN[i].start)return i;return 0};
  function camAt(S,lt){let cx=SW/2,cy=SH/2,z=1,rot=0,tilt=0;const C=S.camK;const pt=v=>{if(Array.isArray(v))return v;if(typeof v==='string'&&v[0]==='@'){const r=REG[v.slice(1).split('.')[0]];if(r&&r.R&&!v.includes('.')){const k=r.R.track?r.R.track():r.R.g&&r.R.g.__tk;if(k)return k}}return resolvePt(v,REG,`scene ${S.i+1} camera`)};
    if(C){const K=Array.isArray(C)?C:[C];let cur={x:SW/2,y:SH/2,z:1,r:0,tl:0};K.forEach(k=>{const p=(k.on||k.follow)?pt(k.on||k.follow):[k.x??cur.x,k.y??cur.y];const t0=k.t??k.at??0,d=k.dur??1.2;const u=(E[k.ease]||E.inOutCubic)(prog(lt,t0,t0+d));
        cur={x:lerp(cur.x,p[0],u),y:lerp(cur.y,p[1],u),z:lerp(cur.z,k.zoom??cur.z,u),r:lerp(cur.r,k.rotate??cur.r,u),tl:lerp(cur.tl,k.tilt??cur.tl,u)}});cx=cur.x;cy=cur.y;z=cur.z;rot=cur.r;tilt=cur.tl}
    
    let sx=0,sy=0;const hh=(LSN.handheld===true?6:LSN.handheld||0)*SU;if(hh){sx+=noise3(lt*.6,1.3)*hh;sy+=noise3(lt*.6,7.1)*hh}
    (S.shake||[]).forEach(k=>{const t0=k.t??k.at??0,d=k.dur??.6;if(lt>=t0&&lt<t0+d){const a=(k.amp??18)*SU*(1-(lt-t0)/d)**2;sx+=noise3(lt*25,3)*a;sy+=noise3(lt*25,9)*a}});return {cx,cy,z,rot,tilt,sx,sy}}
  function drawScene(S,lt,op,dir,tz0,pp){S.g.style.display='';S.g.setAttribute('opacity',f2(op));S.g.removeAttribute('filter');S.g.removeAttribute('clip-path');S.g.removeAttribute('mask');
    const tz=tz0||S.tz||'fade';let tf='';
    if(op<1){const u=1-op;if(tz==='zoom')tf=`translate(${SW/2} ${SH/2}) scale(${f2(1+dir*u*.08)}) translate(${-SW/2} ${-SH/2})`;else if(tz==='slide')tf=`translate(${f2(dir*-u*120*SU)} 0)`;
      else if(tz==='whip'){tf=`translate(${f2(dir*-u*SW*.6)} 0)`;S.g.setAttribute('filter','url(#whipblur)');S.g.setAttribute('opacity',f2(Math.min(1,op*1.6)))}
      else if(tz==='dive'){if(dir<0){const D=SCN[S.i+1]&&SCN[S.i+1].dive;const p=D?(Array.isArray(D)?D:resolvePt(D,REG,'dive')):[SW/2,SH/2];const k=1+u*u*7;tf=`translate(${f2(p[0])} ${f2(p[1])}) scale(${f2(k)}) translate(${f2(-p[0])} ${f2(-p[1])})`;S.g.setAttribute('opacity',f2(clamp(op*1.4)))}
        else{const k=.25+.75*(1-u);tf=`translate(${SW/2} ${SH/2}) scale(${f2(k)}) translate(${-SW/2} ${-SH/2})`}}
      else if(tz==='iris'&&dir>0){S.g.setAttribute('opacity',1);S.g.setAttribute('clip-path','url(#irisclip)')}
      else if(tz==='iris'){S.g.setAttribute('opacity',1);S.g.setAttribute('mask','url(#irismask)')}
      else if(TZ_CLIP.has(tz)){S.g.setAttribute('opacity',1);S.g.setAttribute(dir>0?'clip-path':'mask',dir>0?'url(#tzclip)':'url(#tzmask)')}
      else if(tz.startsWith('push-')){S.g.setAttribute('opacity',1);const P_=pp??(dir>0?op:1-op);const k=dir>0?1-P_:-P_;const D={'push-left':[SW,0],'push-right':[-SW,0],'push-up':[0,SH],'push-down':[0,-SH]}[tz]||[SW,0];tf=`translate(${f2(D[0]*k)} ${f2(D[1]*k)})`}
      else if(tz==='flip'){const P_=pp??(dir>0?op:1-op);let sx=dir<0?1-P_*2:P_*2-1;S.g.setAttribute('opacity',sx>0?1:0);sx=Math.max(.001,E.outCubic(clamp(sx)));tf=`translate(${SW/2} ${SH/2}) scale(${f2(sx)} ${f2(1-.06*(1-sx))}) translate(${-SW/2} ${-SH/2})`}
      else if(tz==='spin'){const P_=dir>0?op:1-op;const a=dir>0?(1-P_)*-10:P_*10,sc=dir>0?.8+.2*P_:1+.25*P_;tf=`translate(${SW/2} ${SH/2}) rotate(${f2(a)}) scale(${f2(sc)}) translate(${-SW/2} ${-SH/2})`}
      else if(tz==='zoom-out'){const P_=dir>0?op:1-op;const sc=dir>0?1.3-.3*P_:1-.15*P_;tf=`translate(${SW/2} ${SH/2}) scale(${f2(sc)}) translate(${-SW/2} ${-SH/2})`}
      else if(tz==='blur'){const n=Math.round(u*3);if(n>0)S.g.setAttribute('filter',`url(#tzb${n})`)}
      else if(tz==='page'){const P_=pp??(dir>0?op:1-op);S.g.setAttribute('opacity',1);if(dir<0){if(!S.sheet){S.sheet=el('g',{});el('rect',{width:SW,height:SH,fill:'url(#bgg)'},S.sheet);if(document.getElementById('bgp'))el('rect',{width:SW,height:SH,fill:'url(#bgp)',opacity:.8},S.sheet);S.g.insertBefore(S.sheet,S.g.firstChild)}S.sheet.style.display='';const e=E.inCubic(P_);tf=`translate(${f2(-SW*.04*e)} ${f2(-SH*1.12*e)}) rotate(${f2(-5*e)} ${SW/2} ${SH})`;S.g.setAttribute('filter','url(#pageSh)')}else{const sc=.95+.05*P_;tf=`translate(${SW/2} ${SH/2}) scale(${f2(sc)}) translate(${-SW/2} ${-SH/2})`}}
      else tf=`translate(0 ${f2(dir*-u*18*SU)})`}
    if(S.sheet&&!(op<1&&tz==='page'&&dir<0))S.sheet.style.display='none';

    S.g.setAttribute('transform',tf);S.cs=camAt(S,lt);
    S.header&&S.header(lt);if(S.hg)S.hg.setAttribute('opacity',dir<0?0:1);
    S.items.forEach(o=>{const {it,wrap,R,start,ent,anim}=o;if(lt<start-.001&&anim!=='none'){wrap.style.display='none';return}wrap.style.display='';
      const p=clamp((lt-start)/ent);const e=E.outCubic(p);let opa=1,tfm='';const [ax,ay]=o.center;
      if(R.selfAnim){}else if(anim==='fade')opa=e;else if(anim==='rise'){opa=e;tfm=`translate(0 ${f2((1-e)*36*SU)})`}else if(anim==='pop'){const s=E.outBack(p);opa=clamp(p*3);tfm=`translate(${f2(ax)} ${f2(ay)}) scale(${f2(Math.max(.01,s))}) translate(${f2(-ax)} ${f2(-ay)})`}
      else if(anim==='grow'){opa=e;const s=.92+.08*e;tfm=`translate(${f2(ax)} ${f2(ay)}) scale(${f2(s)}) translate(${f2(-ax)} ${f2(-ay)})`}else if(anim==='zoom'){opa=e;const s=1.25-.25*e;tfm=`translate(${f2(ax)} ${f2(ay)}) scale(${f2(s)}) translate(${f2(-ax)} ${f2(-ay)})`}
      else if(anim==='slide-left'||anim==='slide-right'){opa=e;tfm=`translate(${f2((1-e)*(anim==='slide-left'?-1:1)*120*SU)} 0)`}else if(anim==='draw'){opa=o.drs.length?clamp(p*5):e}
      if(o.drs.length){const dp=anim==='draw'?E.inOutCubic(p):1;o.drs.forEach(d=>{if(dp>=1){d.style.strokeDasharray='none';d.style.strokeDashoffset=0}else{d.style.strokeDasharray='1 1';d.style.strokeDashoffset=f2(1-dp)}})}
      if(it.out!=null&&!R.selfOut)opa*=1-prog(lt,it.out,it.out+.5);
      // focus: dim items not in focus
      let blurIt=false;S.focus.forEach(f=>{const a=f.at??0,b=f.to??S.dur;const k=prog(lt,a,a+.4)*(1-prog(lt,b,b+.4));if(k>0&&!f.ids.includes(it.id)&&!it._t){opa*=1-(f.blur?.45:.72)*k;if(f.blur&&k>.3)blurIt=true}});wrap.setAttribute('filter',blurIt?'url(#blur10)':'');
      if(it.opacity!=null)opa*=it.opacity;wrap.setAttribute('opacity',f2(opa));wrap.setAttribute('transform',tfm);
      if(R.update&&!o.errd){try{R.update(lt,p,start,S.dur)}catch(e){o.errd=true;SERR.push(`${o.where} update: ${e.message}`);console.error(e);showErr()}}});
    {const c2=S.cs=camAt(S,lt);if(S.hasCards){const mv=clamp(Math.max((c2.z-1.06)/.08,(Math.hypot(c2.cx-SW/2,c2.cy-SH/2)-50*SU)/(80*SU)));S.items.forEach(o=>{if(o.card)o.card.setAttribute('opacity',f2(o.wrap.style.display==='none'?0:mv*.95*(+o.wrap.getAttribute('opacity')||0)))})}S.cam.setAttribute('transform',`translate(${f2(SW/2+c2.sx)} ${f2(SH/2+c2.sy)}) rotate(${f2(c2.rot)}) scale(${f2(c2.z)},${f2(c2.z*Math.cos(c2.tilt*Math.PI/180))}) translate(${f2(-c2.cx)} ${f2(-c2.cy)})`);{const moved=Math.abs(c2.z-1)>.03||Math.abs(c2.cx-SW/2)>4*SU||Math.abs(c2.cy-SH/2)>4*SU||Math.abs(c2.rot)>.5;if(!S.allT)S.allT=[...S.cam.querySelectorAll('text')].filter(t=>!(S.lbls||[]).some(o=>o.rec.tx===t));
      if(moved&&LSN.edgeFade!==false){const R0=SVG.getBoundingClientRect(),k=SW/R0.width,m=16*SU;S.allT.forEach(t=>{const r=t.getBoundingClientRect();if(!r.width){return}const X1=(r.left-R0.left)*k,X2=(r.right-R0.left)*k,Y1=(r.top-R0.top)*k,Y2=(r.bottom-R0.top)*k;const out=Math.max(0,m-X1,X2-(SW-m),m-Y1,Y2-(SH-m));t.style.opacity=out>0?f2(clamp(1-out/(24*SU))):'';S._ef=true})}
      else if(S._ef){S.allT.forEach(t=>t.style.opacity='');S._ef=false}}if(S.lbls){const m=24*SU,zy=c2.z*Math.cos(c2.tilt*Math.PI/180);S.lbls.forEach(o=>{const X1=SW/2+c2.sx+(o.x1-c2.cx)*c2.z,X2=SW/2+c2.sx+(o.x2-c2.cx)*c2.z,Y1=SH/2+c2.sy+(o.y1-c2.cy)*zy,Y2=SH/2+c2.sy+(o.y2-c2.cy)*zy;const out=Math.max(0,m-X1,X2-(SW-m),(S.header?150*SU:m)-Y1,Y2-(SH-m));o.rec.g.setAttribute('opacity',f2(clamp(1-out/(30*SU))))})}}
    // captions
    const c=S.cap.find(c=>lt>=c.a&&lt<c.b);if(c&&op>.5)setCap(c.text,Math.min(prog(lt,c.a,c.a+.25),1-prog(lt,c.b-.2,c.b))*1);else if(op>.5)setCap(null)}
  function render(t){t=clamp(t,0,DUR-1e-4);TZB.style.display='none';const i=sceneAt(t);SCN.forEach(s=>s.g.style.display='none');const S=SCN[i],lt=t-S.start;
    const TZ=S.tz||'fade';const TR=TZ_DUR[TZ]||TRANS;
    if(i>0&&lt<TR){const P=SCN[i-1];if(TZ==='iris'){const r=f2(Math.hypot(SW,SH)*.56*E.inOutCubic(clamp(lt/TR)));IRIS.setAttribute('r',r);IRIS2.setAttribute('r',r)}if(TZ_CLIP.has(TZ))tzClip(TZ,E.inOutCubic(clamp(lt/TR)));drawScene(P,P.dur+lt,TZ==='iris'||TZ_CLIP.has(TZ)||TZ_KEEP.has(TZ)?.999:1-E.inOutCubic(lt/TR),-1,TZ,E.inOutCubic(clamp(lt/TR)))}
    drawScene(S,lt,i>0?E.inOutCubic(clamp(lt/TR)):1,1,TZ);
    if(LSN.parallax!==false&&S.cs){const c=S.cs;BG.setAttribute('transform',`translate(${f2(SW/2)} ${f2(SH/2)}) scale(${f2(1+(c.z-1)*.12)}) translate(${f2(-SW/2-(c.cx-SW/2)*.12+c.sx*.3)} ${f2(-SH/2-(c.cy-SH/2)*.12+c.sy*.3)})`)}if(i===0&&S.kind!=='title')S.g.setAttribute('opacity',f2(clamp(t/.5)));
    if(i>0&&lt<TR){ROOTG.appendChild(TZ==='page'?SCN[i-1].g:S.g)}
    dust.forEach((d,k)=>{const sp=.004+seeded(k,3)*.008;at(d,{cx:f2(((seeded(k,4)+t*sp*(k%2?1:-1))%1+1)%1*SW),cy:f2(((seeded(k,5)-t*sp*.6)%1+1)%1*SH)})});
    pFill.setAttribute('width',f2(t/DUR*SW));if(!S.cap.length)setCap(null)}
  // ---- audio score (deterministic; WebAudio live + OfflineAudioContext export) ----
  const MUS=LSN.music===undefined?'calm':LSN.music;const SFX=LSN.sfx!==false;
  function scheduleAudio(t0,ac,from=0){const A=makeMixer(ac);const tt=x=>t0+x-from;const ok=x=>x>=from-.01;
    if(AUD.__voice);const vf=LSN.voice&&LSN.voice.file;const hasVoice=!!vf||SCN.some(s=>s.audio);
    if(MUS&&typeof MUS==='string'&&PROG[MUS]){const pr=PROG[MUS];const nb=Math.ceil((DUR+1)/BAR);const vol=(LSN.musicVolume??1)*(hasVoice?.55:1);
      for(let b=0;b<nb;b++){const at0=b*BAR;if(at0+BAR<from)continue;const [r,ty]=pr[b%pr.length];const fade=Math.min(1,(DUR-at0)/BAR);
        if(ok(at0))A.pad(tt(at0),chord(r,ty,3),BAR*1.02,.06*vol*fade);
        for(let k=0;k<8;k++){const x=at0+k*BEAT/2;if(!ok(x)||x>DUR-1)continue;if(seeded(b*8+k,7)<.55){const ch=chord(r,ty,4);A.pluck(tt(x),ch[(k*2+b)%ch.length],.055*vol,(seeded(k,3)-.5)*.6)}}
        if(ok(at0)&&b%2===0)A.bass(tt(at0),chord(r,ty,1)[0]*1,BAR*.9,.09*vol)}}
    const mf=LSN.music&&LSN.music.file;if(mf&&AUD[mf]){const off=Math.max(0,from);A.sample(tt(Math.max(from,0)),AUD[mf].buf,{gain:LSN.music.gain??.5,bus:'music',offset:off,dur:Math.max(.1,DUR-off),fadeOut:1.5})}
    if(vf&&AUD[vf]){const off=Math.max(0,from-(LSN.voice.at||0));if(off<AUD[vf].buf.duration)A.sample(tt(Math.max(from,LSN.voice.at||0)),AUD[vf].buf,{gain:LSN.voice.gain??1,bus:'fx',offset:off})}
    SCN.forEach(S=>{const af=S.audio&&(S.audio.file||S.audio);if(af&&AUD[af]){const a0=S.start+(S.audio.at??.4);const off=Math.max(0,from-a0);if(off<AUD[af].buf.duration)A.sample(tt(Math.max(from,a0)),AUD[af].buf,{gain:S.audio.gain??1,bus:'fx',offset:off})}
      if(!SFX)return;if(S.i>0&&ok(S.start))A.whoosh(tt(S.start+.15),.12,.4);
      S.items.forEach((o,k)=>{const x=S.start+o.start;if(!ok(x)||o.it._t||o.it.sfx===false)return;const big=['explosion','lightning'].includes(o.it.type);if(big){A.impact(tt(x+(o.it.type==='explosion'?0:0)),.35);return}
        A.blip(tt(x),scaleNote('C','penta',(k*2+S.i)%7,5),.025,(seeded(k,9)-.5)*.5)});
      if(S.kind==='quiz'){const qi=S.items.find(o=>o.it.type==='quiz');if(qi){const th=qi.it.think??5,t1=S.start+qi.start+1.3+(qi.it.options||[]).length*.25;for(let k=0;k<Math.floor(th);k++)if(ok(t1+k))A.tick(tt(t1+k),.05);if(ok(t1+th))A.blip(tt(t1+th),1568,.07)}}});
    return A}
  // ---- hooks for render-lite / qa-sheet ----
  window.__DUR=DUR;window.__FPS=FPS;window.__W=SW;window.__H=SH;window.__seek=t=>{playing=false;render(t)};
  window.__scenes=SCN.map(s=>({title:s.title||s.kind||'',start:+s.start.toFixed(3),dur:+s.dur.toFixed(3),items:s.items.map(o=>o.it.type+'@'+o.start.toFixed(1))}));
  window.__qa=SCN.map(s=>+(s.start+Math.min(s.dur*.72,s.dur-.2)).toFixed(3));
  window.__renderAudio=async()=>{const sr=48000,oac=new OfflineAudioContext(2,Math.ceil(sr*(DUR+.5)),sr);scheduleAudio(0,oac);
    const buf=await oac.startRendering(),n=buf.length,ch=[buf.getChannelData(0),buf.getChannelData(1)];
    const dv=new DataView(new ArrayBuffer(44+n*4)),w=(o,s)=>[...s].forEach((c,i)=>dv.setUint8(o+i,c.charCodeAt(0)));
    w(0,'RIFF');dv.setUint32(4,36+n*4,true);w(8,'WAVEfmt ');dv.setUint32(16,16,true);dv.setUint16(20,1,true);dv.setUint16(22,2,true);dv.setUint32(24,sr,true);dv.setUint32(28,sr*4,true);dv.setUint16(32,4,true);dv.setUint16(34,16,true);w(36,'data');dv.setUint32(40,n*4,true);
    for(let i=0;i<n;i++)for(let c=0;c<2;c++)dv.setInt16(44+i*4+c*2,clamp(ch[c][i],-1,1)*32767,true);
    let bin='';const u8=new Uint8Array(dv.buffer);for(let i=0;i<u8.length;i+=32768)bin+=String.fromCharCode(...u8.subarray(i,i+32768));return btoa(bin)};
  // ---- UI ----
  function showErr(){let b=document.getElementById('err');if(!SERR.length){b&&b.remove();return}if(!b){b=document.createElement('div');b.id='err';document.body.appendChild(b)}b.textContent='⚠ LESSON errors ('+SERR.length+'):\n• '+[...new Set(SERR)].join('\n• ')}
  const ui=document.createElement('div');ui.id='ui';ui.innerHTML=`<button id="pp">▶ Sound</button><button id="pv">⏮</button><button id="nx">⏭</button><button id="cc">CC</button><button id="gd">Grid</button><div id="bar"><div id="fill"></div></div><span id="tc"></span>`;document.body.appendChild(ui);
  const bar=ui.querySelector('#bar');SCN.forEach(s=>{const m=document.createElement('div');m.className='mk';m.style.left=(s.start/DUR*100)+'%';m.title=s.title||s.kind||'';bar.appendChild(m)});
  let AC=null,start=performance.now(),playing=true,audioClock=null,cur=0,src=null;
  const stopAudio=()=>{if(src)try{src.master.disconnect()}catch(e){}src=null;audioClock=null};
  const tick=now=>{if(!playing)return;let t=audioClock!=null?AC.currentTime-audioClock:(now-start)/1000;if(t>=DUR+.8){stopAudio();start=now;t=0}
    cur=Math.min(t,DUR-1e-4);render(cur);ui.querySelector('#fill').style.width=(cur/DUR*100)+'%';ui.querySelector('#tc').textContent=cur.toFixed(1)+' / '+DUR.toFixed(1)+'s';requestAnimationFrame(tick)};
  async function play(from,sound){stopAudio();if(sound){AC=AC||new AudioContext();await AC.resume();audioClock=AC.currentTime+.08-from;src=scheduleAudio(AC.currentTime+.08,AC,from)}start=performance.now()-from*1000;cur=from;playing=true;requestAnimationFrame(tick)}
  const jump=d=>{const i=clamp(sceneAt(cur)+d,0,SCN.length-1);play(SCN[i].start+.001,!!src)};
  ui.querySelector('#pp').onclick=()=>play(cur>=DUR-.5?0:cur,true);ui.querySelector('#pv').onclick=()=>jump(-1);ui.querySelector('#nx').onclick=()=>jump(1);
  ui.querySelector('#cc').onclick=()=>{capG.style.display=capG.style.display?'':'none'};ui.querySelector('#gd').onclick=()=>{GU.style.display=GU.style.display?'':'none';if(!playing)render(cur)};
  bar.onclick=e=>{const r=bar.getBoundingClientRect();const t=(e.clientX-r.left)/r.width*DUR;if(playing)play(t,!!src);else{cur=t;render(cur)}};
  addEventListener('keydown',e=>{if(e.key==='g'||e.key==='G'){GU.style.display=GU.style.display?'':'none';if(!playing)render(cur)}
    if(e.key===' '){e.preventDefault();if(playing){playing=false;stopAudio()}else play(cur,!!AC)}if(e.key==='ArrowRight')jump(1);if(e.key==='ArrowLeft')jump(-1)});
  showErr();if(SERR.length)console.warn('LESSON errors:\n'+SERR.join('\n'));
  if(q.has('t')){document.body.classList.add('capture');playing=false;render(+q.get('t'))}else requestAnimationFrame(tick);
  window.__ready=true;
}
window.LESSON=LESSON;
