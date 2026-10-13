/* ================= SHELF: CHEMISTRY & GENETICS — periodic (118 elements, IUPAC layout) · orbital (s, p, d) · punnett (mono/dihybrid, computed ratios) ================= */
(()=>{
const {mix,dark,light,vol,txt,cyc,T}=KIT;
const SYM='H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og'.split(' ');
const CAT={alkali:[3,11,19,37,55,87],earth:[4,12,20,38,56,88],nonmetal:[1,6,7,8,15,16,34],halogen:[9,17,35,53,85,117],noble:[2,10,18,36,54,86,118],metalloid:[5,14,32,33,51,52],post:[13,31,49,50,81,82,83,84,113,114,115,116]};
const catOf=z=>{for(const k in CAT)if(CAT[k].includes(z))return k;if(z>=57&&z<=71)return 'lanth';if(z>=89&&z<=103)return 'actin';return 'transition'};
const CC={alkali:'#FF7043',earth:'#FFB74D',transition:'#F06292',post:'#90A4AE',metalloid:'#4DB6AC',nonmetal:'#81C784',halogen:'#4FC3F7',noble:'#B39DDB',lanth:'#FFD54F',actin:'#E57373'};
const CN={alkali:{uz:'Ishqoriy metallar',en:'Alkali metals'},earth:{uz:'Ishqoriy-yer metallar',en:'Alkaline earth metals'},transition:{uz:'O‘tish metallari',en:'Transition metals'},post:{uz:'Boshqa metallar',en:'Post-transition metals'},metalloid:{uz:'Yarimmetallar',en:'Metalloids'},
  nonmetal:{uz:'Nometallar',en:'Nonmetals'},halogen:{uz:'Galogenlar',en:'Halogens'},noble:{uz:'Inert gazlar',en:'Noble gases'},lanth:{uz:'Lantanoidlar',en:'Lanthanides'},actin:{uz:'Aktinoidlar',en:'Actinides'}};
const pos=z=>{if(z===1)return [0,0];if(z===2)return [0,17];const P=[[3,10,1],[11,18,2],[19,36,3],[37,54,4],[55,86,5],[87,118,6]];for(const [a,b,r] of P)if(z>=a&&z<=b){const i=z-a;if(r<=2)return i<2?[r,i]:[r,i+10];if(r<=4)return [r,i];
  if(i<2)return [r,i];if(i<17)return [r+3.4,i+1];return [r,i-14]}};
SM.items.periodic=preset(1900,1080,(g,it)=>{const cw=100,ch=104,x0=50,y0=40,A={};const hl=new Set((it.highlight||[]).map(s=>typeof s==='number'?SYM[s-1]:s));const hc=it.category;const cells=[];
  for(let z=1;z<=118;z++){const [r,c]=pos(z),k=catOf(z),x=x0+c*cw,y=y0+r*ch;const on=(!hl.size&&!hc)||hl.has(SYM[z-1])||hc===k;const G=el('g',{},g);
    el('rect',{x:x+3,y:y+3,width:cw-6,height:ch-6,rx:10,fill:vol(CC[k],{hi:.35,lo:.25}),stroke:hl.has(SYM[z-1])?'#fff':dark(CC[k],.3),'stroke-width':hl.has(SYM[z-1])?5:2},G);
    txt(G,String(z),x+12,y+28,{size:20,color:'#222',anchor:'start',weight:700});txt(G,SYM[z-1],x+cw/2,y+ch/2+18,{size:40,color:'#111',weight:800});cells.push([G,z,on?1:.25]);A[SYM[z-1]]=[x+cw/2,y+8]}
  [[5,2,'57–71'],[6,2,'89–103']].forEach(([r,c,s])=>{const x=x0+c*cw,y=y0+r*ch;el('rect',{x:x+3,y:y+3,width:cw-6,height:ch-6,rx:10,fill:'none',stroke:TH.dim,'stroke-width':2,'stroke-dasharray':'6 5'},g);txt(g,s,x+cw/2,y+ch/2+8,{size:20,color:'dim'})});
  for(let c=0;c<18;c++)txt(g,String(c+1),x0+c*cw+cw/2,y0-8,{size:18,color:'dim'});for(let r=0;r<7;r++)txt(g,String(r+1),x0-24,y0+r*ch+ch/2+8,{size:18,color:'dim'});
  Object.keys(CC).forEach((k,i)=>{const x=x0+235+(i%3)*300,y=y0+40+Math.floor(i/3)*44;el('rect',{x,y:y-20,width:26,height:26,rx:6,fill:CC[k]},g);txt(g,T(CN[k]),x+36,y,{size:22,color:'ink',anchor:'start',weight:600})});
  return {anchors:A,core:[...hl].filter(s=>A[s]).slice(0,12),update(lt,p,st){cells.forEach(([G,z,o])=>{const q=E.outBack(prog(lt,st+z*.012,st+z*.012+.5));G.setAttribute('transform',`translate(0 ${f2((1-clamp(q))*-30)})`);G.setAttribute('opacity',f2(clamp(q)*o))})}}});
/* ---------- ATOMIC ORBITALS ---------- */
SM.items.orbital=preset(1600,700,(g,it)=>{const k=it.kind||'all';const L=k==='all'?['s','p','d']:[k];const W=1600/L.length,A={},spin=[];
  const lobe=(G,cx,cy,ang,len,w,c)=>{const a=ang*Math.PI/180;const x=cx+Math.cos(a)*len/2,y=cy+Math.sin(a)*len/2;el('ellipse',{cx:x,cy:y,rx:len/2,ry:w,transform:`rotate(${ang} ${x} ${y})`,fill:vol(c,{hi:.5}),opacity:.82,stroke:dark(c,.3),'stroke-width':2},G)};
  L.forEach((o,i)=>{const cx=W*(i+.5),cy=320;const ax=el('g',{},g);const G=el('g',{},g);spin.push([G,cx,cy]);[0,90,-30].forEach(a=>{const r=a*Math.PI/180;el('line',{x1:cx-Math.cos(r)*230,y1:cy-Math.sin(r)*230,x2:cx+Math.cos(r)*230,y2:cy+Math.sin(r)*230,stroke:TH.dim,'stroke-width':2,'stroke-dasharray':'6 6'},ax)});
    txt(ax,'x',cx+240,cy+8,{size:22,color:'dim'});txt(ax,'z',cx,cy-240,{size:22,color:'dim'});txt(ax,'y',cx-200,cy+140,{size:22,color:'dim'});
    if(o==='s'){el('circle',{cx,cy,r:150,fill:vol('#4FC3F7',{hi:.55}),opacity:.85},G);txt(g,T({uz:'s-orbital: sharsimon (1 ta)',en:'s orbital: sphere (1)'}),cx,620,{size:28,color:'ink'})}
    if(o==='p'){lobe(G,cx,cy,0,190,62,'#EF5350');lobe(G,cx,cy,180,190,62,'#EF5350');lobe(G,cx,cy,-90,190,62,'#66BB6A');lobe(G,cx,cy,90,190,62,'#66BB6A');lobe(G,cx,cy,150,170,52,'#42A5F5');lobe(G,cx,cy,-30,170,52,'#42A5F5');txt(g,T({uz:'p-orbitallar: gantelsimon (3 ta)',en:'p orbitals: dumbbells (3)'}),cx,620,{size:28,color:'ink'})}
    if(o==='d'){[45,135,225,315].forEach(a=>lobe(G,cx,cy,a,180,52,'#AB47BC'));el('ellipse',{cx,cy,rx:70,ry:22,fill:'none',stroke:'#FFCA28','stroke-width':16,opacity:.8},G);lobe(G,cx,cy,-90,150,40,'#FFCA28');lobe(G,cx,cy,90,150,40,'#FFCA28');txt(g,T({uz:'d-orbitallar: 5 ta (bu yerda d_xy va d_z²)',en:'d orbitals: 5 (shown d_xy, d_z²)'}),cx,620,{size:28,color:'ink'})}
    el('circle',{cx,cy,r:9,fill:'#fff'},G);A[o]=[cx,cy-170]});
  return {anchors:A,core:[],update(lt){spin.forEach(([G,cx,cy],i)=>G.setAttribute('transform',`translate(${cx} ${cy}) scale(${f2(1+.03*Math.sin(lt*1.4+i))}) translate(${-cx} ${-cy})`))}}});
/* ---------- PUNNETT SQUARE ---------- */
SM.items.punnett=preset(1300,1000,(g,it)=>{const [p1,p2]=(it.cross||'Aa x Aa').split(/\s*[x×]\s*/i);if(!/^([A-Za-z]{2}){1,2}$/.test(p1||'')||!p2||p1.length!==p2.length){SERR.push(`punnett: cross "${it.cross}" → use "Aa x Aa" or "AaBb x AaBb"`);return {anchors:{}}}
  const genes=p1.length/2;const gam=s=>genes===1?[s[0],s[1]]:[s[0]+s[2],s[0]+s[3],s[1]+s[2],s[1]+s[3]];const G1=gam(p1),G2=gam(p2),n=G1.length;const S=Math.min(170,700/n),x0=650-S*n/2+40,y0=170,A={};
  const tr=it.traits||{A:[T({uz:'Sariq',en:'Yellow'}),T({uz:'Yashil',en:'Green'})],B:[T({uz:'Silliq',en:'Round'}),T({uz:'Burishgan',en:'Wrinkled'})]};
  const up=c=>c===c.toUpperCase();const geno=(a,b)=>{let o='';for(let i=0;i<genes;i++){const p=[a[i],b[i]].sort((x,y)=>(up(x)?0:1)-(up(y)?0:1));o+=p.join('')}return o};
  const pheno=gt=>{const o=[];for(let i=0;i<genes;i++){const L=gt.slice(i*2,i*2+2);const d=up(L[0])||up(L[1]);o.push((tr[L[0].toUpperCase()]||['+','−'])[d?0:1])}return o.join(', ')};
  const PC=['#FFD54F','#AED581','#4FC3F7','#F48FB1','#CE93D8'];const phs=[],cells=[];txt(g,`${p1} × ${p2}`,650,70,{size:44,color:'ink',weight:800});
  G1.forEach((a,i)=>cells.push([txt(g,a,x0-60,y0+S*i+S/2+14,{size:40,color:'a1',weight:800}),-1]));G2.forEach((b,j)=>cells.push([txt(g,b,x0+S*j+S/2,y0-24,{size:40,color:'a3',weight:800}),-1]));
  const cnt={},pc={};G1.forEach((a,i)=>G2.forEach((b,j)=>{const gt=geno(a,b),ph=pheno(gt);cnt[gt]=(cnt[gt]||0)+1;pc[ph]=(pc[ph]||0)+1;if(!phs.includes(ph))phs.push(ph);const c=PC[phs.indexOf(ph)%PC.length];const cg=el('g',{},g);
    el('rect',{x:x0+S*j+3,y:y0+S*i+3,width:S-6,height:S-6,rx:12,fill:c,'fill-opacity':.85,stroke:dark(c,.3),'stroke-width':3},cg);txt(cg,gt,x0+S*j+S/2,y0+S*i+S/2+(n>2?10:14),{size:n>2?30:44,color:'#111',weight:800});cells.push([cg,i*n+j])}));
  const gr=Object.entries(cnt).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`${k}: ${v}`).join(' · '),pr=Object.entries(pc).sort((a,b)=>b[1]-a[1]);
  const sum=el('g',{},g);txt(sum,T({uz:'Genotiplar: ',en:'Genotypes: '})+gr,650,y0+S*n+60,{size:26,color:'ink',weight:700});txt(sum,T({uz:'Fenotiplar: ',en:'Phenotypes: '})+pr.map(([k,v])=>`${k} ${v}`).join(' · ')+`  →  ${pr.map(x=>x[1]).join(' : ')}`,650,y0+S*n+105,{size:26,color:'a2',weight:800});
  return {anchors:A,update(lt,p,st){cells.forEach(([e,i])=>{const q=i<0?prog(lt,st,st+.6):E.outBack(prog(lt,st+.8+i*.12,st+1.3+i*.12));e.setAttribute('opacity',f2(clamp(q)))});sum.setAttribute('opacity',f2(prog(lt,st+1.4+n*n*.12,st+2+n*n*.12)))}}});
KIT.bind();
})();
