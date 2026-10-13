/* ================= SHELF: SPACE & ATOM — planet (real presets + seeded procedural) · exoplanet (transit + light curve) · starlife · atommodel · decay =================
   Randomness is allowed ONLY here (space art): same seed → same planet, every render. */
(()=>{
const {mix,dark,light,vol,txt,cyc,T,rng}=KIT;
KIT.names(NAMES.uz,{star:'Yulduz',planetP:'Sayyora',lightcurve:'Yorqinlik grafigi',dip:'Tutilish (yorqinlik pasayadi)',atmosphere:'Atmosfera',rings:'Halqalar',
  nebula:'Tumanlik',protostar:'Protoyulduz',mainseq:'Bosh ketma-ketlik yulduzi',redgiant:'Qizil gigant',pnebula:'Sayyoraviy tumanlik',whitedwarf:'Oq mitti',supergiant:'Qizil o‘ta gigant',supernova:'O‘ta yangi yulduz',neutron:'Neytron yulduz',blackhole:'Qora tuynuk',
  protonP:'Proton (+)',neutronP:'Neytron',electronP:'Elektron (−)',alphaP:'Alfa zarra (²He)',betaP:'Beta zarra (e⁻)',gammaP:'Gamma nur',paper:'Qog‘oz',aluminium:'Alyuminiy',lead:'Qo‘rg‘oshin'});
KIT.names(NAMES.en,{star:'Star',planetP:'Planet',lightcurve:'Light curve',dip:'Transit dip',atmosphere:'Atmosphere',rings:'Rings',nebula:'Nebula',protostar:'Protostar',mainseq:'Main-sequence star',redgiant:'Red giant',pnebula:'Planetary nebula',whitedwarf:'White dwarf',
  supergiant:'Red supergiant',supernova:'Supernova',neutron:'Neutron star',blackhole:'Black hole',protonP:'Proton (+)',neutronP:'Neutron',electronP:'Electron (−)',alphaP:'Alpha particle (He nucleus)',betaP:'Beta particle (e⁻)',gammaP:'Gamma ray',paper:'Paper',aluminium:'Aluminium',lead:'Lead'});
KIT.names(NAMES.ru,{star:'Звезда',nebula:'Туманность',redgiant:'Красный гигант',whitedwarf:'Белый карлик',supernova:'Сверхновая',blackhole:'Чёрная дыра',neutron:'Нейтронная звезда'});
// real planets: band colours (approximate true colour), radius relative to Earth, rings
const PLAN={mercury:{c:['#9E9E9E','#7D7D7D','#BDBDBD'],r:.38,crat:1},venus:{c:['#E8D5A3','#D9BF7F','#F1E3BF'],r:.95,cloud:1},earth:{c:['#2E6FD8','#2E8B57','#F5F5F5'],r:1,earth:1},mars:{c:['#C1440E','#A0522D','#E07A4F'],r:.53,crat:1},
  jupiter:{c:['#D8CBB0','#B07F4F','#E9DFCB','#C49A6C'],r:3.2,bands:1,spot:1},saturn:{c:['#E3D3A4','#CDB884','#F0E4C2'],r:2.8,bands:1,ring:1},uranus:{c:['#9FE3E8','#86D2DA'],r:1.9,ring:.3},neptune:{c:['#3F66D6','#2C4FB8','#6A8DEB'],r:1.85,bands:1},
  moon:{c:['#BDBDBD','#9E9E9E','#E0E0E0'],r:.27,crat:1},pluto:{c:['#D8C3A5','#A88B6A'],r:.18,crat:1}};
const PNAME={mercury:{uz:'Merkuriy',en:'Mercury'},venus:{uz:'Venera',en:'Venus'},earth:{uz:'Yer',en:'Earth'},mars:{uz:'Mars',en:'Mars'},jupiter:{uz:'Yupiter',en:'Jupiter'},saturn:{uz:'Saturn',en:'Saturn'},uranus:{uz:'Uran',en:'Uranus'},neptune:{uz:'Neptun',en:'Neptune'},moon:{uz:'Oy',en:'Moon'},pluto:{uz:'Pluton (mitti sayyora)',en:'Pluto (dwarf planet)'}};
const PROC={rocky:['#8D6E63','#6D4C41','#A1887F'],desert:['#E0B070','#C28A48','#F2D19B'],ice:['#E3F2FD','#B3E5FC','#90CAF9'],lava:['#3E2723','#FF5722','#FFAB00'],ocean:['#1565C0','#1E88E5','#E3F2FD'],gas:['#FFCC80','#FF8A65','#FFE0B2','#A1887F'],toxic:['#C0CA33','#827717','#F0F4C3']};
let PID=0;
function drawPlanet(g,cx,cy,R,spec){const id='pl'+(++PID)+'_'+Math.round(rnd(PID+.123)*1e6);const cp=el('clipPath',{id},DEFS);el('circle',{cx,cy,r:R},cp);const P=el('g',{},g);const C=spec.c,r=rng(spec.seed||1);
  el('circle',{cx,cy,r:R*1.12,fill:C[0],opacity:.25,filter:'url(#blur10)'},P);if(spec.ring){el('ellipse',{cx,cy,rx:R*2.1,ry:R*.5*spec.ring/spec.ring,fill:'none',stroke:mix(C[0],'#fff',.2),'stroke-width':R*.32*(spec.ring<1?.25:1),opacity:.7,transform:`rotate(-14 ${cx} ${cy})`,'stroke-dasharray':spec.ring<1?'none':'none'},P)}
  const body=el('g',{'clip-path':`url(#${id})`},P);el('circle',{cx,cy,r:R,fill:C[0]},body);const tex=el('g',{},body);const W=R*4;
  const mk=(dx)=>{const G=el('g',{transform:`translate(${dx} 0)`},tex);
    if(spec.bands||spec.gas){for(let y=-R;y<R;y+=R*.12){const h=R*(.05+r()*.08);el('rect',{x:cx-R*2,y:cy+y,width:W,height:h,fill:C[1+Math.floor(r()*(C.length-1))],opacity:.55+r()*.4},G);el('path',{d:wavy(cx-R*2,cy+y+h,cx+R*2,cy+y+h,R*.02,8),fill:'none',stroke:C[C.length-1],'stroke-width':R*.02,opacity:.4},G)}
      if(spec.spot)el('ellipse',{cx:cx+R*.3,cy:cy+R*.35,rx:R*.22,ry:R*.12,fill:'#C1440E',opacity:.85},G)}
    if(spec.earth){[[-.5,-.2,.45,.35],[.25,.1,.3,.5],[.7,-.35,.25,.2],[-1.2,.3,.3,.25],[1.3,.2,.35,.3]].forEach(([x,y,w,h],i)=>el('path',{d:blob(cx+x*R,cy+y*R,w*R,h*R,{seed:i+2,amp:.25,n:12}),fill:i%2?'#3E8E41':'#7CB342'},G));el('ellipse',{cx,cy:cy-R*.95,rx:R*2,ry:R*.18,fill:'#fff'},G);el('ellipse',{cx,cy:cy+R*.97,rx:R*2,ry:R*.15,fill:'#fff'},G)}
    if(spec.crat||spec.rocky){for(let i=0;i<26;i++){const x=cx-R*2+r()*W,y=cy-R+r()*2*R,s=R*(.04+r()*.12);el('circle',{cx:x,cy:y,r:s,fill:dark(C[0],.25),opacity:.6},G);el('circle',{cx:x-s*.2,cy:y-s*.2,r:s*.75,fill:C[2]||C[0],opacity:.5},G)}}
    if(spec.lava){for(let i=0;i<14;i++){const x=cx-R*2+r()*W,y=cy-R+r()*2*R;el('path',{d:wavy(x,y,x+R*(.3+r()*.5),y+R*(r()-.5)*.4,R*.04,2),fill:'none',stroke:'#FF9100','stroke-width':R*.04,filter:'url(#glowS)'},G)}}
    if(spec.ocean){for(let i=0;i<6;i++)el('path',{d:blob(cx-R*2+r()*W,cy-R*.6+r()*1.2*R,R*(.15+r()*.25),R*(.1+r()*.2),{seed:i,amp:.3,n:10}),fill:'#8BC34A'},G)}
    if(spec.cloud||spec.ocean||spec.earth){for(let i=0;i<10;i++)el('ellipse',{cx:cx-R*2+r()*W,cy:cy-R+r()*2*R,rx:R*(.2+r()*.4),ry:R*.06,fill:'#fff',opacity:.45},G)}return G};
  const r0=rng(spec.seed||1);const g1=mk(0);const g2=mk(-W);// two copies for seamless scroll
  el('circle',{cx,cy,r:R,fill:`url(#${(()=>{const gid='sh'+id;const rg=el('radialGradient',{id:gid,cx:'35%',cy:'35%',r:'75%'},DEFS);[[0,'#fff',.25],[.5,'#000',0],[1,'#000',.75]].forEach(([o,c,a])=>el('stop',{offset:o,'stop-color':c,'stop-opacity':a},rg));return gid})()})`},body);
  if(spec.atm)el('circle',{cx,cy,r:R+4,fill:'none',stroke:spec.atm,'stroke-width':8,opacity:.6,filter:'url(#glowS)'},P);
  if(spec.ring&&spec.ring>=1){el('path',{d:`M${cx-R*2.1},${cy} A${R*2.1},${R*.5} 0 0 0 ${cx+R*2.1},${cy}`,fill:'none',stroke:mix(C[0],'#fff',.2),'stroke-width':R*.32,opacity:.8,transform:`rotate(-14 ${cx} ${cy})`},P)}
  return {P,spin:(t,sp=1)=>tex.setAttribute('transform',`translate(${f2(((t*sp*R*.15)%W))} 0)`)}}
SM.items.planet=preset(900,800,(g,it)=>{const nmK=(it.name||(PLAN[(it.kind||'').toLowerCase()]?it.kind:'')||'').toLowerCase();let spec,title;if(PLAN[nmK]){spec={...PLAN[nmK],seed:nmK.length*7+3};title=T(PNAME[nmK])}else{const k=it.kind||'rocky';if(!PROC[k])SERR.push(`planet: kind "${k}" → ${Object.keys(PROC).join(', ')} or name: ${Object.keys(PLAN).join(', ')}`);
    spec={c:PROC[k]||PROC.rocky,seed:it.seed??42,[k]:1,atm:k==='ocean'?'#81D4FA':k==='toxic'?'#C0CA33':k==='ice'?'#E1F5FE':null,ring:it.rings?1:0,bands:k==='gas'};title=it.title||T({uz:`Ekzosayyora · ${k} · seed ${spec.seed}`,en:`Exoplanet · ${k} · seed ${spec.seed}`})}
  const R=it.name&&PLAN[nmK]&&PLAN[nmK].ring?190:270;const pl=drawPlanet(g,450,370,R,spec);txt(g,title,450,760,{size:34,color:'ink'});if(!PLAN[nmK]&&it.name)SERR.push(`planet: name "${it.name}" → ${Object.keys(PLAN).join(', ')}`);
  const AN={};if(spec.atm||spec.earth||spec.cloud||spec.bands)AN.atmosphere=[450,370-R];if(spec.ring)AN.rings=[450+R*1.9,370];return {anchors:AN,update(lt){pl.spin(lt,it.spin||1)}}});
/* ---------- EXOPLANET transit + light curve ---------- */
const SCL={O:'#9BB0FF',B:'#AABFFF',A:'#CAD7FF',F:'#F8F7FF',G:'#FFF4EA',K:'#FFD2A1',M:'#FFB16D'};
SM.items.exoplanet=preset(1500,860,(g,it)=>{const cls=(it.star||'G').toUpperCase()[0];const sc=SCL[cls]||SCL.G;const TT=it.cycle||8,A={},R=200,cx=480,cy=330,pr=(it.size||.12)*R;
  el('circle',{cx,cy,r:R*1.5,fill:sc,opacity:.35,filter:'url(#blur24)'},g);el('circle',{cx,cy,r:R,fill:vol(sc,{hi:.2,lo:.15})},g);el('circle',{cx,cy,r:R,fill:'none',stroke:sc,'stroke-width':6,opacity:.5,filter:'url(#glowS)'},g);
  const r=rng(it.seed??7);for(let i=0;i<30;i++)el('circle',{cx:cx+(r()-.5)*R*1.6,cy:cy+(r()-.5)*R*1.6,r:R*.05*r(),fill:dark(sc,.15),opacity:.4},g);
  const P=el('circle',{r:pr,fill:'#1a1a1a',stroke:'#444','stroke-width':2},g);const gx=820,gy=120,gw=620,gh=380;el('rect',{x:gx,y:gy,width:gw,height:gh,rx:14,fill:TH.panel,stroke:TH.faint,'stroke-width':2},g);
  txt(g,T({uz:'Yorqinlik',en:'Brightness'}),gx+20,gy+40,{size:24,color:'dim',anchor:'start'});txt(g,T({uz:'vaqt →',en:'time →'}),gx+gw-20,gy+gh-14,{size:22,color:'dim',anchor:'end'});
  const depth=(pr/R)**2;const curve=el('path',{fill:'none',stroke:TH.a4,'stroke-width':4},g);const dot=el('circle',{r:9,fill:TH.a4},g);const info=txt(g,`${T({uz:'Yorqinlik pasayishi',en:'Depth'})} ≈ (Rp/R★)² = ${(depth*100).toFixed(2)}%`,gx+gw/2,gy+gh+50,{size:26,color:'a2'});
  txt(g,T({uz:`Yulduz sinfi: ${cls}`,en:`Star class: ${cls}`}),cx,cy+R+80,{size:28,color:'ink'});
  const flux=x=>{const d=Math.abs(x-cx);if(d>=R+pr)return 1;if(d<=R-pr)return 1-depth;return 1-depth*(R+pr-d)/(2*pr)};const yv=f=>gy+70+(1-f)/(Math.max(depth,.002)*1.6)*(gh-150);
  Object.assign(A,{star:[cx,cy-R],planetP:{el:P,fx:.5,fy:0},lightcurve:[gx+gw/2,gy],dip:[gx+gw/2,yv(1-depth)]});
  return {anchors:A,update(lt,p,st){const u=cyc(lt,st,TT,0);const x=lerp(cx-R*1.7,cx+R*1.7,u);at(P,{cx:f2(x),cy:cy+R*.15});let d='';for(let q=0;q<=u;q+=.004){const xx=lerp(cx-R*1.7,cx+R*1.7,q);d+=(d?' L':'M')+f2(gx+20+q*(gw-40))+','+f2(yv(flux(xx)))}
    curve.setAttribute('d',d);at(dot,{cx:f2(gx+20+u*(gw-40)),cy:f2(yv(flux(x)))})}}});
/* ---------- STAR LIFE CYCLE (mass: low | high) ---------- */
SM.items.starlife=preset(1700,760,(g,it)=>{const hi=it.mass==='high';const seq=hi?['nebula','protostar','mainseq','supergiant','supernova',it.end==='neutron'?'neutron':'blackhole']:['nebula','protostar','mainseq','redgiant','pnebula','whitedwarf'];
  const W=1700/seq.length,A={},panes=[];const r=rng(11);
  seq.forEach((k,i)=>{const x=W*(i+.5),y=330,pg=el('g',{},g);panes.push(pg);txt(pg,nm(k),x,640,{size:Math.min(28,W/9),color:'ink'});if(i<seq.length-1)el('line',{x1:x+W*.36,y1:y,x2:x+W*.6,y2:y,stroke:TH.dim,'stroke-width':4,'marker-end':arrowMarker('dim')},pg);
    const S=Math.min(1,W/280);const glow=(rr,c)=>{el('circle',{cx:x,cy:y,r:rr*1.6,fill:c,opacity:.35,filter:'url(#blur24)'},pg);el('circle',{cx:x,cy:y,r:rr,fill:vol(c,{hi:.5,lo:.2})},pg)};
    if(k==='nebula')for(let q=0;q<9;q++)el('path',{d:blob(x+(r()-.5)*90*S,y+(r()-.5)*80*S,60*S+r()*40*S,40*S+r()*30*S,{seed:q,amp:.3,n:10}),fill:['#7E57C2','#EC407A','#29B6F6'][q%3],opacity:.35,filter:'url(#blur10)'},pg);
    if(k==='protostar'){el('ellipse',{cx:x,cy:y,rx:110*S,ry:26*S,fill:'#FF8A65',opacity:.4,filter:'url(#blur10)'},pg);glow(34*S,'#FFAB40')}
    if(k==='mainseq')glow(hi?60*S:46*S,hi?'#90CAF9':'#FFE082');if(k==='redgiant')glow(100*S,'#FF7043');if(k==='supergiant')glow(124*S,'#E53935');
    if(k==='pnebula'){[90,70].forEach((rr,q)=>el('circle',{cx:x,cy:y,r:rr*S,fill:'none',stroke:q?'#4DD0E1':'#F06292','stroke-width':16*S,opacity:.6,filter:'url(#blur4)'},pg));glow(10*S,'#FFFFFF')}
    if(k==='whitedwarf')glow(16*S,'#E3F2FD');if(k==='neutron'){glow(12*S,'#B3E5FC');el('path',{d:`M${x},${y-150*S} L${x},${y+150*S}`,stroke:'#81D4FA','stroke-width':6,opacity:.7,filter:'url(#glowS)'},pg)}
    if(k==='supernova'){for(let q=0;q<16;q++){const a=q/16*TAU;el('line',{x1:x,y1:y,x2:x+Math.cos(a)*130*S,y2:y+Math.sin(a)*130*S,stroke:'#FFF59D','stroke-width':6,opacity:.8},pg)}glow(70*S,'#FFFDE7')}
    if(k==='blackhole'){el('ellipse',{cx:x,cy:y,rx:120*S,ry:30*S,fill:'none',stroke:'#FFB74D','stroke-width':14*S,opacity:.85,filter:'url(#glowS)'},pg);el('circle',{cx:x,cy:y,r:46*S,fill:'#000',stroke:'#FFB74D','stroke-width':3},pg)}A[k]=[x,y-130*S]});
  txt(g,hi?T({uz:'Massiv yulduz (Quyoshdan ~8 marta og‘irroq)',en:'Massive star (more than ~8 Suns)'}):T({uz:'Quyoshga o‘xshash yulduz',en:'Sun-like star'}),850,60,{size:30,color:'a2'});
  return {anchors:A,core:[],update(lt,p,st){panes.forEach((pg,i)=>{const q=E.outCubic(prog(lt,st+i*.7,st+i*.7+.7));pg.setAttribute('opacity',f2(q));pg.setAttribute('transform',`translate(0 ${f2(Math.sin(lt+i)*4)})`)})}}});
/* ---------- ATOM MODELS history ---------- */
SM.items.atommodel=preset(1700,700,(g,it)=>{const all=['dalton','thomson','rutherford','bohr','quantum'];const L=it.kind&&it.kind!=='all'?[it.kind]:all;const W=1700/L.length,A={},up=[];
  const N={dalton:{uz:'Dalton (1803): bo‘linmas shar',en:'Dalton (1803): solid sphere'},thomson:{uz:'Tomson (1904): “mayizli pirog”',en:'Thomson (1904): plum pudding'},rutherford:{uz:'Rezerford (1911): yadro + elektronlar',en:'Rutherford (1911): nucleus + electrons'},bohr:{uz:'Bor (1913): energiya sathlari',en:'Bohr (1913): energy levels'},quantum:{uz:'Kvant (1926): elektron buluti',en:'Quantum (1926): electron cloud'}};
  L.forEach((k,i)=>{const x=W*(i+.5),y=320,S=Math.min(1.4,W/300),pg=el('g',{},g);T(N[k]).split(': ').forEach((l,j)=>txt(pg,l+(j?'':':'),x,600+j*34,{size:Math.min(28,W/11),color:j?'dim':'ink'}));
    if(k==='dalton')el('circle',{cx:x,cy:y,r:110*S,fill:vol('#90A4AE',{hi:.5})},pg);
    if(k==='thomson'){el('circle',{cx:x,cy:y,r:110*S,fill:vol('#FFAB91',{hi:.4})},pg);txt(pg,'+',x-40*S,y-50*S,{size:30*S,color:'#BF360C'});for(let q=0;q<9;q++){const a=q*2.4,rr=25+q*9;el('circle',{cx:x+Math.cos(a)*rr*S,cy:y+Math.sin(a)*rr*S,r:10*S,fill:'#1E88E5'},pg)}}
    if(k==='rutherford'||k==='bohr'){el('circle',{cx:x,cy:y,r:14*S,fill:vol('#E53935')},pg);const orb=k==='bohr'?[50,85,120]:[0,60,120];const es=[];
      orb.forEach((o,q)=>{if(k==='bohr')el('circle',{cx:x,cy:y,r:o*S,fill:'none',stroke:TH.dim,'stroke-width':2},pg);else el('ellipse',{cx:x,cy:y,rx:120*S,ry:40*S,fill:'none',stroke:TH.dim,'stroke-width':2,transform:`rotate(${o} ${x} ${y})`},pg);es.push([el('circle',{r:8*S,fill:'#1E88E5'},pg),o,q])});
      up.push(lt=>es.forEach(([e,o,q])=>{const a=lt*(1.6-q*.3)+q*2;if(k==='bohr')at(e,{cx:f2(x+Math.cos(a)*o*S),cy:f2(y+Math.sin(a)*o*S)});else{const ex=Math.cos(a)*120*S,ey=Math.sin(a)*40*S,c=Math.cos(o*Math.PI/180),s2=Math.sin(o*Math.PI/180);at(e,{cx:f2(x+ex*c-ey*s2),cy:f2(y+ex*s2+ey*c)})}}))}
    if(k==='quantum'){const r=rng(5);for(let q=0;q<420;q++){const rr=Math.abs((r()+r()+r())/3-.5)*2*130*S,a=r()*TAU;el('circle',{cx:x+Math.cos(a)*rr,cy:y+Math.sin(a)*rr,r:2.4,fill:'#4FC3F7',opacity:.55},pg)}el('circle',{cx:x,cy:y,r:10*S,fill:'#E53935'},pg)}A[k]=[x,y-130*S]});
  return {anchors:A,core:[],update(lt){up.forEach(f=>f(lt))}}});
/* ---------- RADIOACTIVE DECAY: alpha | beta | gamma | penetration ---------- */
SM.items.decay=preset(1500,800,(g,it)=>{const k=it.kind||'alpha',TT=it.cycle||5,A={},cx=420,cy=380;  if(k==='penetration'){const src=el('g',{},g);el('rect',{x:80,y:300,width:120,height:160,rx:16,fill:vol('#546E7A')},src);txt(src,'☢',140,400,{size:60,color:'#FFEB3B'});
    const W=[[520,'#FFF8E1',30,'paper'],[820,'#B0BEC5',40,'aluminium'],[1120,'#455A64',80,'lead']];W.forEach(([x,c,w,n])=>{el('rect',{x,y:150,width:w,height:460,fill:c,stroke:'#263238','stroke-width':2},g);txt(g,nm(n),x+w/2,650,{size:26,color:'ink'});A[n]=[x+w/2,150]});
    const ray=(y,stop,c,lab)=>{const L=el('line',{x1:200,y1:y,x2:200,y2:y,stroke:c,'stroke-width':10,'stroke-linecap':'round'},g);txt(g,lab,230,y-14,{size:26,color:c,anchor:'start'});return [L,stop]};
    const R3=[ray(280,520,'#FF7043','α'),ray(380,820,'#42A5F5','β'),ray(480,1420,'#66BB6A','γ')];A.alphaP=[300,280];A.betaP=[300,380];A.gammaP=[300,480];const G2=el('line',{x1:1200,y1:480,x2:1200,y2:480,stroke:'#66BB6A','stroke-width':5,'stroke-linecap':'round',opacity:.45},g);
    txt(g,T({uz:'γ nurlar qo‘rg‘oshinda keskin susayadi (to‘liq to‘xtamaydi)',en:'γ rays are greatly reduced by lead (not fully stopped)'}),750,740,{size:24,color:'dim',weight:600});
    return {anchors:A,core:['alphaP','betaP','gammaP'],labelLayout:'side',sides:{alphaP:'left',betaP:'left',gammaP:'left'},update(lt,p,st){R3.forEach(([L,stop],i)=>{const q=E.outCubic(prog(lt,st+.6+i*.5,st+1.8+i*.5));const x=lerp(200,stop,q);L.setAttribute('x2',f2(i===2?Math.min(x,1120):x));if(i===2)G2.setAttribute('x2',f2(Math.max(1200,x)));})}}}
  const nuc=el('g',{},g);for(let i=0;i<34;i++){const a=i*2.4,rr=Math.sqrt(i)*17;el('circle',{cx:cx+Math.cos(a)*rr,cy:cy+Math.sin(a)*rr,r:15,fill:vol(i%2?'#E53935':'#90A4AE'),stroke:'#0004','stroke-width':1},nuc)}
  const out=el('g',{opacity:0},g);let lab='';if(k==='alpha'){[[-14,-10,'#E53935'],[14,-10,'#90A4AE'],[-14,14,'#90A4AE'],[14,14,'#E53935']].forEach(([x,y,c])=>el('circle',{cx:x,cy:y,r:15,fill:vol(c)},out));lab='²³⁸U → ²³⁴Th + ⁴He (α)'}
  if(k==='beta'){el('circle',{r:12,fill:vol('#1E88E5')},out);txt(out,'e⁻',0,-20,{size:24,color:'#90CAF9'});el('circle',{cx:-40,cy:30,r:6,fill:'#B0BEC5',opacity:.8},out);lab=T({uz:'n → p + e⁻ + ν̄ (masalan ¹⁴C → ¹⁴N)',en:'n → p + e⁻ + ν̄ (e.g. ¹⁴C → ¹⁴N)'})}
  if(k==='gamma'){el('path',{d:wavy(-80,0,80,0,16,4),fill:'none',stroke:'#66BB6A','stroke-width':6,filter:'url(#glowS)'},out);lab=T({uz:'Uyg‘ongan yadro energiya chiqaradi (γ foton)',en:'An excited nucleus releases energy (γ photon)'})}
  txt(g,lab,750,720,{size:30,color:'a2'});A.nucleusAtom=[cx,cy-110];A[k+'P']={el:out,fx:.5,fy:0};
  return {anchors:A,update(lt,p,st){const u=cyc(lt,st,TT,.3);const q=E.outCubic(prog(u,.3,.9));out.setAttribute('transform',`translate(${f2(lerp(cx,1350,q))} ${cy})`);out.setAttribute('opacity',f2(u>.28?1-prog(u,.9,1):0));
    nuc.setAttribute('transform',`translate(${f2(u<.3?Math.sin(lt*40)*3:0)} 0)`)}}});
KIT.bind();
})();
