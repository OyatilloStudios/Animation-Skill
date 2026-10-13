/* ================= SHELF: MOLECULAR BIOLOGY — replication · transcription · translation · protein · hemoglobin · aminoacid · receptor · signalway ================= */
(()=>{
KIT.names(NAMES.uz,{helicase:'Helikaza',polymerase:'DNK-polimeraza',leading:'Yetakchi zanjir',lagging:'Kechikuvchi zanjir',okazaki:'Okazaki fragmenti',primer:'RNK-praymer',template:'Ona (shablon) zanjir',fork:'Replikatsiya vilkasi',
  rnap:'RNK-polimeraza',coding:'Kodlovchi zanjir',bubble:'Transkripsiya pufagi',ribosome:'Ribosoma',trna:'tRNK',codon:'Kodon',anticodon:'Antikodon',peptide:'Polipeptid zanjir',siteE:'E-sayt',siteP:'P-sayt',siteA:'A-sayt',small:'Kichik subbirlik',large:'Katta subbirlik',
  primary:'Birlamchi struktura',secondary:'Ikkilamchi struktura',tertiary:'Uchlamchi struktura',quaternary:'To‘rtlamchi struktura',helix:'α-spiral',sheet:'β-qatlam',hbond:'Vodorod bog‘lar',
  alpha:'α-zanjir',beta:'β-zanjir',heme:'Gem (Fe²⁺)',oxygen:'Kislorod (O₂)',iron:'Temir ioni',
  amino:'Aminoguruh (–NH₂)',carboxyl:'Karboksil guruh (–COOH)',radical:'Radikal (R-guruh)',calpha:'α-uglerod atomi',hydrogen:'Vodorod',peptideBond:'Peptid bog‘',waterOut:'Suv ajraladi (H₂O)',
  rtk:'Retseptor tirozin-kinaza',phosphate:'Fosfat guruh (P)',dock:'Signal oqsillari',channel:'Ion kanali',hormone:'Steroid gormon',nreceptor:'Ichki retseptor',dna:'DNK',gprotein:'G-oqsil',
  gland:'Bez hujayrasi',blood:'Qon tomir',target:'Nishon hujayra',neighbor:'Qo‘shni hujayra',neuron:'Neyron'});
KIT.names(NAMES.en,{helicase:'Helicase',polymerase:'DNA polymerase',leading:'Leading strand',lagging:'Lagging strand',okazaki:'Okazaki fragment',primer:'RNA primer',template:'Template strand',fork:'Replication fork',
  rnap:'RNA polymerase',coding:'Coding strand',bubble:'Transcription bubble',ribosome:'Ribosome',trna:'tRNA',codon:'Codon',anticodon:'Anticodon',peptide:'Polypeptide chain',siteE:'E site',siteP:'P site',siteA:'A site',small:'Small subunit',large:'Large subunit',
  primary:'Primary structure',secondary:'Secondary structure',tertiary:'Tertiary structure',quaternary:'Quaternary structure',helix:'α-helix',sheet:'β-sheet',hbond:'Hydrogen bonds',
  alpha:'α chain',beta:'β chain',heme:'Heme (Fe²⁺)',oxygen:'Oxygen (O₂)',iron:'Iron ion',
  amino:'Amino group (–NH₂)',carboxyl:'Carboxyl group (–COOH)',radical:'Side chain (R group)',calpha:'α-carbon',hydrogen:'Hydrogen',peptideBond:'Peptide bond',waterOut:'Water released (H₂O)',
  rtk:'Receptor tyrosine kinase',phosphate:'Phosphate (P)',dock:'Relay proteins',channel:'Ion channel',hormone:'Steroid hormone',nreceptor:'Intracellular receptor',dna:'DNA',gprotein:'G protein',
  gland:'Gland cell',blood:'Blood vessel',target:'Target cell',neighbor:'Neighbour cell',neuron:'Neuron'});
KIT.names(NAMES.ru,{helicase:'Геликаза',polymerase:'ДНК-полимераза',leading:'Лидирующая цепь',lagging:'Отстающая цепь',okazaki:'Фрагмент Оказаки',primer:'РНК-праймер',template:'Матричная цепь',fork:'Репликационная вилка',
  rnap:'РНК-полимераза',coding:'Кодирующая цепь',ribosome:'Рибосома',trna:'тРНК',codon:'Кодон',anticodon:'Антикодон',peptide:'Полипептид',primary:'Первичная структура',secondary:'Вторичная структура',tertiary:'Третичная структура',quaternary:'Четвертичная структура',
  helix:'α-спираль',sheet:'β-слой',alpha:'α-цепь',beta:'β-цепь',heme:'Гем (Fe²⁺)',oxygen:'Кислород (O₂)',amino:'Аминогруппа',carboxyl:'Карбоксильная группа',radical:'Радикал (R)',peptideBond:'Пептидная связь',rtk:'Рецепторная тирозинкиназа',hormone:'Стероидный гормон',target:'Клетка-мишень'});
const {mix,dark,light,vol,txt,cyc,T}=KIT;
const BC={A:NAT.dnaA,T:NAT.dnaT,G:NAT.dnaG,C:NAT.dnaC,U:NAT.dnaU};
const COMP={A:'T',T:'A',G:'C',C:'G'},RNA={A:'U',T:'A',G:'C',C:'G'}; // template base → RNA base
const SEQ='TACGGATTTAAGCCTACCGTAATCGGCATTACGGAT'; // template-ish fixed sequence (never random)
const legend=(g,x,y,rna)=>{const L=rna?[['A','U'],['G','C']]:[['A','T'],['G','C']];L.forEach(([a,b],i)=>{const yy=y+i*44;[a,b].forEach((s,k)=>{el('rect',{x:x+k*70,y:yy-18,width:56,height:34,rx:8,fill:BC[s]},g);txt(g,s,x+k*70+28,yy+8,{size:24,color:'#111',weight:800})});txt(g,i?'≡':'=',x+63,yy+8,{size:22,color:'dim'})})};
/* ---------- shared nucleic-acid helpers (v2.3.1) ----------
   purines (A, G: two rings) are drawn longer than pyrimidines (T, C, U: one ring) → every rung has the same total width;
   A=T / A=U have 2 H-bonds, G≡C has 3 (dashes in the middle). Colours: A green · T red · U orange · G yellow · C blue. */
const PUR={A:1,G:1};const hfrac=b=>PUR[b]?.58:.42;
const hb=(g,x,y1,y2,n)=>{const m=(y1+y2)/2;for(let k=0;k<n;k++)el('line',{x1:x-7+k*(14/(n-1||1)),y1:m-3,x2:x-7+k*(14/(n-1||1)),y2:m+3,stroke:'#fff','stroke-width':1.6,opacity:.75},g)};
const ntLegend=(g,x,y,rna)=>{const L=rna?[['A','U',2],['G','C',3]]:[['A','T',2],['G','C',3]];
  L.forEach(([a,b,n],i)=>{const yy=y+i*42;el('rect',{x,y:yy-17,width:58*1.16,height:32,rx:7,fill:BC[a]},g);txt(g,a,x+33,yy+8,{size:22,color:'#111',weight:800});
    el('rect',{x:x+78,y:yy-17,width:58*.84,height:32,rx:7,fill:BC[b]},g);txt(g,b,x+78+24,yy+8,{size:22,color:'#111',weight:800});txt(g,n===2?'=':'≡',x+72,yy+8,{size:20,color:'ink'});
    txt(g,T({uz:`${n} ta vodorod bog‘`,en:`${n} hydrogen bonds`,ru:`${n} водородные связи`}),x+140,yy+8,{size:24,color:'dim',anchor:'start',weight:600})});
  txt(g,T({uz:'Purin (A, G) — uzun, pirimidin ('+(rna?'U':'T')+', C) — qisqa',en:'Purines (A, G) long · pyrimidines ('+(rna?'U':'T')+', C) short',ru:'Пурины (A, G) длинные · пиримидины короткие'}),x,y+92,{size:22,color:'dim',anchor:'start',weight:600})};
const sstep=t=>{t=clamp(t);return t*t*(3-2*t)};

/* ---------- DNA REPLICATION — fork moves right; grey = old (parent) strands, cyan = new strands ----------
   top template 3′→5′ (left→right) → leading strand made continuously 5′→3′ toward the fork;
   bottom template 5′→3′ → lagging strand made in Okazaki fragments 5′→3′ away from the fork, each starting with an RNA primer;
   when a fragment reaches the previous one: primer replaced by DNA, ligase seals the nick. */
KIT.names(NAMES.uz,{parent:'Ona DNK (qo‘sh zanjir)',polLag:'DNK-polimeraza (kechikuvchi)',ligase:'Ligaza',ssb:'SSB oqsillar (bir zanjirni ushlab turadi)',primase:'Praymaza'});
KIT.names(NAMES.en,{parent:'Parent DNA (double helix)',polLag:'DNA polymerase (lagging)',ligase:'DNA ligase',ssb:'SSB proteins',primase:'Primase'});
KIT.names(NAMES.ru,{parent:'Материнская ДНК',polLag:'ДНК-полимераза (отстающая)',ligase:'Лигаза',ssb:'SSB-белки',primase:'Праймаза'});
SM.items.replication=preset(1500,800,(g,it)=>{const X0=90,X1=1330,SP=24,yT0=380,yB0=440,yT=210,yL=270,yB=610,yG=550,TR=170,TT=it.cycle||18,NEW='#4DD0E1',OLD='#B0BEC5',PRM='#FF9800';
  const xs=[];for(let x=X0;x<=X1;x+=SP)xs.push(x);const N=xs.length;const S='TACGGATTCAGCTAGGCATCGATTCCGAGCTAAGCTTGCAGTCCATGCATTAGC';const bT=xs.map((_,i)=>S[i%S.length]),bB=bT.map(b=>COMP[b]);
  const back=el('g',{},g),rungs=el('g',{},g),mid=el('g',{},g),front=el('g',{},g);
  const R=xs.map(()=>({t:el('line',{'stroke-width':9,'stroke-linecap':'round'},rungs),tn:el('line',{'stroke-width':9,'stroke-linecap':'round'},rungs),b:el('line',{'stroke-width':9,'stroke-linecap':'round'},rungs),bn:el('line',{'stroke-width':9,'stroke-linecap':'round'},rungs)}));
  R.forEach((r,i)=>{r.t.setAttribute('stroke',BC[bT[i]]);r.tn.setAttribute('stroke',BC[bB[i]]);r.b.setAttribute('stroke',BC[bB[i]]);r.bn.setAttribute('stroke',BC[bT[i]])});
  const bbT=el('path',{fill:'none',stroke:OLD,'stroke-width':12,'stroke-linecap':'round'},back),bbB=el('path',{fill:'none',stroke:OLD,'stroke-width':12,'stroke-linecap':'round'},back);
  const lead=el('path',{fill:'none',stroke:NEW,'stroke-width':12,'stroke-linecap':'round'},back);const P=[];for(let x=330;x<X1;x+=230)P.push(x);
  const frag=P.map(()=>el('path',{fill:'none',stroke:NEW,'stroke-width':12,'stroke-linecap':'round'},back)),prim=P.map(()=>el('path',{fill:'none',stroke:PRM,'stroke-width':15,'stroke-linecap':'round'},back));
  const arrows=P.map(()=>el('path',{fill:NEW},mid));const leadTip=el('path',{fill:NEW},mid);
  const ssb=[...Array(6)].map(()=>el('circle',{r:13,fill:'#E0F7FA',stroke:'#80DEEA','stroke-width':2,opacity:.9},mid));
  const hel=el('g',{},front);[0,1,2,3,4,5].forEach(k=>{const a=k/6*TAU;el('circle',{cx:f2(Math.cos(a)*34),cy:f2(Math.sin(a)*34),r:20,fill:vol('#F06292'),stroke:dark('#F06292'),'stroke-width':2.5},hel)});
  const pol=c=>{const q=el('g',{},front);el('path',{d:'M-62,-8 C-62,-52 62,-52 62,-8 L62,8 C62,52 -62,52 -62,8Z',fill:vol(c),stroke:dark(c),'stroke-width':3,opacity:.93},q);el('rect',{x:-50,y:-6,width:100,height:12,rx:6,fill:dark(c,.45),opacity:.5},q);return q};
  const polL=pol('#7E57C2'),polG=pol('#7E57C2');const pmase=el('ellipse',{rx:30,ry:20,fill:vol('#66BB6A'),stroke:dark('#66BB6A'),'stroke-width':2.5},front);const lig=el('circle',{r:16,fill:vol('#FFCA28'),stroke:dark('#FFCA28'),'stroke-width':2.5,opacity:0},front);
  const endT=[['3′',X0-34,yT],['5′',X1+34,yT0],['5′',X0-34,yB],['3′',X1+34,yB0],['5′',X0-34,yL],['3′',X0-34,yG]].map(([s,x,y])=>txt(front,s,x,y+9,{size:26,color:'ink',weight:800}));
  ntLegend(g,90,705,false);
  const lg=el('g',{},g);[[OLD,{uz:'Ona (eski) zanjir',en:'Parent (old) strand',ru:'Старая цепь'}],[NEW,{uz:'Yangi zanjir',en:'New strand',ru:'Новая цепь'}],[PRM,{uz:'RNK-praymer',en:'RNA primer',ru:'РНК-праймер'}]].forEach(([c,t],i)=>{el('rect',{x:560,y:684+i*34,width:46,height:12,rx:6,fill:c},lg);txt(lg,T(t),620,697+i*34,{size:24,color:'ink',anchor:'start',weight:600})});
  txt(g,T({uz:'Yarim konservativ: har bir yangi DNK = 1 eski + 1 yangi zanjir',en:'Semi-conservative: each new DNA = 1 old + 1 new strand',ru:'Полуконсервативно: 1 старая + 1 новая цепь'}),90,832,{size:22,color:'dim',anchor:'start'});
  const yTop=(x,F)=>x>=F?yT0:x<=F-TR?yT:lerp(yT0,yT,sstep((F-x)/TR)),yBot=(x,F)=>x>=F?yB0:x<=F-TR?yB:lerp(yB0,yB,sstep((F-x)/TR));
  const path=(f,a,b)=>{if(b-a<2)return '';let d='';const st=Math.max(4,Math.min(12,(b-a)/4));for(let x=a;x<=b+.01;x+=st)d+=(d?' L':'M')+f2(Math.min(x,b))+','+f2(f(Math.min(x,b)));return d};
  const tri=(x,y,dir)=>`M${f2(x+dir*16)},${f2(y)} L${f2(x)},${f2(y-11)} L${f2(x)},${f2(y+11)}Z`;
  const A={parent:[1200,410],helicase:[600,410],template:[300,yT],leading:[300,yL],polymerase:[500,yL],lagging:[200,yG],okazaki:[300,yG],primer:[400,yG],polLag:[400,yG],primase:[450,yG],ligase:[330,yG],ssb:[500,yB]};
  const show={ligase:lt=>+lig.getAttribute('opacity')>.2?1:0,primase:()=>+pmase.getAttribute('opacity')>.2?1:0};
  return {anchors:A,show,view:[20,150,1400,700],update(lt,p,st){const u=cyc(lt,st,TT,.3);const F=lerp(600,1060,sstep(u/.88));const fx=F-TR;
    bbT.setAttribute('d',path(x=>yTop(x,F),X0,X1));bbB.setAttribute('d',path(x=>yBot(x,F),X0,X1));
    const Lend=fx+30;lead.setAttribute('d',path(()=>yL,X0,Lend));leadTip.setAttribute('d',tri(Lend+4,yL,1));
    // lagging fragments
    const st2=P.map((pk,k)=>{const exposed=fx-pk-10;if(exposed<=0)return null;const bound=k?P[k-1]:X0;const left=Math.max(bound,pk-30-exposed*1.25);return {pk,left,done:left<=bound+.5,bound}});
    let newest=-1,growing=-1,lastDone=-1;st2.forEach((s,k)=>{if(!s)return;newest=k;if(!s.done)growing=k;else lastDone=k});
    st2.forEach((s,k)=>{if(!s){frag[k].setAttribute('d','');prim[k].setAttribute('d','');arrows[k].setAttribute('d','');return}
      const nextDone=st2[k+1]&&st2[k+1].done;frag[k].setAttribute('d',path(()=>yG,s.left,nextDone?s.pk:s.pk-30));prim[k].setAttribute('d',nextDone?'':path(()=>yG,s.pk-30,s.pk));arrows[k].setAttribute('d',s.done?'':tri(s.left-4,yG,-1))});
    if(st2[0]&&st2[0].done===false&&st2[0].left<=X0+1)st2[0].done=true;
    // rungs
    R.forEach((r,i)=>{const x=xs[i],ht=60*hfrac(bT[i]),hb2=60*hfrac(bB[i]);const yt=yTop(x,F),yb=yBot(x,F);
      if(x>=F){r.t.setAttribute('x1',x);r.t.setAttribute('x2',x);r.t.setAttribute('y1',f2(yt+6));r.t.setAttribute('y2',f2(yt+ht));r.b.setAttribute('x1',x);r.b.setAttribute('x2',x);r.b.setAttribute('y1',f2(yb-6));r.b.setAttribute('y2',f2(yt+ht+1));r.tn.setAttribute('opacity',0);r.bn.setAttribute('opacity',0);return}
      r.t.setAttribute('x1',x);r.t.setAttribute('x2',x);r.t.setAttribute('y1',f2(yt+6));r.t.setAttribute('y2',f2(yt+ht-2));
      r.b.setAttribute('x1',x);r.b.setAttribute('x2',x);r.b.setAttribute('y1',f2(yb-6));r.b.setAttribute('y2',f2(yb-hb2+2));
      const onLead=x<=Lend;r.tn.setAttribute('opacity',onLead?1:0);if(onLead){r.tn.setAttribute('x1',x);r.tn.setAttribute('x2',x);r.tn.setAttribute('y1',f2(yL-6));r.tn.setAttribute('y2',f2(yt+ht+1))}
      const onLag=st2.some(s=>s&&x>=s.left&&x<=s.pk);r.bn.setAttribute('opacity',onLag?1:0);if(onLag){r.bn.setAttribute('x1',x);r.bn.setAttribute('x2',x);r.bn.setAttribute('y1',f2(yG+6));r.bn.setAttribute('y2',f2(yb-hb2-1))}});
    hel.setAttribute('transform',`translate(${f2(F-10)} 410) rotate(${f2(lt*90)})`);polL.setAttribute('transform',`translate(${f2(Lend-40)} ${f2(yL-22)})`);
    const gr=growing>=0?st2[growing]:null;const gx=gr?gr.left+30:(newest>=0?st2[newest].left+30:X0+60);polG.setAttribute('transform',`translate(${f2(gx)} ${f2(yG+22)})`);
    const nw=newest>=0?st2[newest]:null;const fresh=nw&&(fx-nw.pk-10)<70;pmase.setAttribute('opacity',fresh?1:0);if(nw)pmase.setAttribute('transform',`translate(${f2(nw.pk-15)} ${f2(yG-30)})`);
    const ssbFrom=nw?nw.pk+20:X0,ssbTo=fx+40;ssb.forEach((c,k)=>{const x=ssbFrom+(k+.5)*(ssbTo-ssbFrom)/ssb.length;const ok=ssbTo-ssbFrom>60&&x<ssbTo;c.setAttribute('opacity',ok?.9:0);c.setAttribute('cx',f2(x));c.setAttribute('cy',f2(yBot(x,F)-4))});
    const jd=lastDone>=1?lastDone:-1;const ligOn=jd>=1&&st2[jd]&&(st2[jd].left<=st2[jd].bound+.5);lig.setAttribute('opacity',ligOn?.95:0);if(ligOn){lig.setAttribute('cx',f2(P[jd-1]));lig.setAttribute('cy',f2(yG))}
    endT[1].setAttribute('y',f2(yT0+9));endT[3].setAttribute('y',f2(yB0+9));
    A.parent=[f2((F+X1)/2)*1,410];A.helicase=[F-10,410-40];A.template=[X0+140,yT];A.leading=[X0+140,yL];A.polymerase=[Lend-40,yL-60];A.lagging=[X0+60,yG];
    const ok=lastDone>=0?st2[lastDone]:gr;if(ok)A.okazaki=[(ok.left+ok.pk)/2,yG];if(nw)A.primer=[nw.pk-15,yG];A.polLag=[gx,yG+60];if(nw)A.primase=[nw.pk-15,yG-50];if(ligOn)A.ligase=[P[jd-1],yG-16];A.ssb=[(ssbFrom+ssbTo)/2,yBot((ssbFrom+ssbTo)/2,F)-4]}}});
/* ---------- TRANSCRIPTION — RNA polymerase reads the TEMPLATE strand 3′→5′ and builds mRNA 5′→3′ (A→U, T→A, G→C, C→G) ----------
   coding strand (top) has the same sequence as the mRNA (T instead of U). Behind the bubble the DNA closes again; the mRNA 5′ end leaves first. */
KIT.names(NAMES.uz,{mrna:'iRNK (mRNK)',promoter:'Promotor',ntp:'Erkin nukleotidlar (NTP)',hybrid:'RNK–DNK gibridi'});
KIT.names(NAMES.en,{mrna:'mRNA',promoter:'Promoter',ntp:'Free nucleotides (NTP)',hybrid:'RNA–DNA hybrid'});
KIT.names(NAMES.ru,{mrna:'мРНК',promoter:'Промотор',ntp:'Нуклеотиды (НТФ)',hybrid:'Гибрид РНК–ДНК'});
SM.items.transcription=preset(1500,800,(g,it)=>{const X0=90,X1=1230,SP=30,yC=400,yTm=460,BW=120,TT=it.cycle||16,OLD='#B0BEC5',RB='#FFAB91';
  const tmpl=String(it.sequence||'TACCGGATTTAAGCCTACCGTAATCGGCATTACGGATCCA').toUpperCase().replace(/[^ACGT]/g,'');const xs=[];for(let x=X0;x<=X1;x+=SP)xs.push(x);
  const bTm=xs.map((_,i)=>tmpl[i%tmpl.length]),bC=bTm.map(b=>COMP[b]),bR=bTm.map(b=>RNA[b]);const START=6; // transcription starts after the promoter
  const back=el('g',{},g),rung=el('g',{},g),rnaG=el('g',{},g),front=el('g',{},g);
  el('rect',{x:X0-10,y:yC-34,width:(START-.5)*SP+10,height:yTm-yC+68,rx:14,fill:'#FFF59D',opacity:.12,stroke:'#FFF59D','stroke-opacity':.5,'stroke-dasharray':'8 6'},back);
  const bbC=el('path',{fill:'none',stroke:OLD,'stroke-width':12,'stroke-linecap':'round'},back),bbT=el('path',{fill:'none',stroke:OLD,'stroke-width':12,'stroke-linecap':'round'},back);
  const R=xs.map((x,i)=>({c:el('line',{stroke:BC[bC[i]],'stroke-width':9,'stroke-linecap':'round'},rung),t:el('line',{stroke:BC[bTm[i]],'stroke-width':9,'stroke-linecap':'round'},rung)}));
  const rbb=el('path',{fill:'none',stroke:RB,'stroke-width':10,'stroke-linecap':'round'},rnaG);
  const RN=xs.map((x,i)=>{const q=el('g',{opacity:0},rnaG);el('line',{x1:0,y1:0,x2:0,y2:26,stroke:BC[bR[i]],'stroke-width':9,'stroke-linecap':'round'},q);el('circle',{cx:0,cy:0,r:12,fill:BC[bR[i]],stroke:'#fff','stroke-width':1.5},q);txt(q,bR[i],0,7,{size:17,color:'#111',weight:800});return q});
  const ntps=[...Array(5)].map((_,k)=>{const b='AUGC'[k%4];const q=el('g',{},front);el('circle',{r:12,fill:BC[b],opacity:.9},q);txt(q,b,0,6,{size:15,color:'#111',weight:800});return q});
  const pol=el('ellipse',{rx:BW+20,ry:105,fill:'#5E35B1','fill-opacity':.62,stroke:'#B39DDB','stroke-width':4},front);
  const yCt=(x,P)=>yC-55*Math.exp(-Math.pow((x-P)/(BW*.55),4)),yTt=(x,P)=>yTm+45*Math.exp(-Math.pow((x-P)/(BW*.55),4));
  const path=(f,a,b)=>{let d='';for(let x=a;x<=b+.01;x+=8)d+=(d?' L':'M')+f2(x)+','+f2(f(x));return d};
  [['5′',X0-34,yC],['3′',X1+34,yC],['3′',X0-34,yTm],['5′',X1+34,yTm]].forEach(([s,x,y])=>txt(front,s,x,y+9,{size:26,color:'ink',weight:800}));
  const r5=txt(front,'5′',0,0,{size:26,color:RB,weight:800}),r3=txt(front,'3′',0,0,{size:26,color:RB,weight:800});
  ntLegend(g,90,705,true);const rd=el('g',{},g);txt(rd,T({uz:'DNK shablon 3′→5′:',en:'DNA template 3′→5′:',ru:'ДНК-матрица 3′→5′:'}),820,705,{size:26,color:'dim',anchor:'end',weight:700});txt(rd,T({uz:'iRNK 5′→3′:',en:'mRNA 5′→3′:',ru:'мРНК 5′→3′:'}),820,750,{size:26,color:RB,anchor:'end',weight:800});const l1=txt(rd,'',835,705,{size:30,color:'dim',anchor:'start',weight:700}),l2=txt(rd,'',835,750,{size:30,color:RB,anchor:'start',weight:800});[l1,l2].forEach(t=>t.setAttribute('font-family',MONOF));
  const A={rnap:[700,300],coding:[X0+60,yC],template:[X0+60,yTm],promoter:[X0+60,yC-34],bubble:[700,yC-50],mrna:[600,300],hybrid:[700,440],ntp:[800,560]};
  return {anchors:A,view:[10,130,1320,690],update(lt,p,st){const u=cyc(lt,st,TT,.3);const P=lerp(X0+START*SP+BW*.3,X1-BW*.6,sstep(u/.9));
    bbC.setAttribute('d',path(x=>yCt(x,P),X0,X1));bbT.setAttribute('d',path(x=>yTt(x,P),X0,X1));pol.setAttribute('cx',f2(P));pol.setAttribute('cy',f2((yC+yTm)/2));
    const act=P+BW*.25; // active site: nucleotides left of it are already made
    const made=[];xs.forEach((x,i)=>{if(i>=START&&x<=act)made.push(i)});
    // DNA rungs: paired outside the bubble, open inside
    R.forEach((r,i)=>{const x=xs[i],yc=yCt(x,P),yt=yTt(x,P),open=Math.abs(x-P)<BW*.75;const hc=60*hfrac(bC[i]);
      r.c.setAttribute('x1',x);r.c.setAttribute('x2',x);r.c.setAttribute('y1',f2(yc+6));r.c.setAttribute('y2',f2(open?yc+hc*.8:yc+hc));
      r.t.setAttribute('x1',x);r.t.setAttribute('x2',x);r.t.setAttribute('y1',f2(yt-6));r.t.setAttribute('y2',f2(open?yt-(60-hc)*.8:yc+hc+1))});
    // RNA: last ~8 nt paired with the template inside the bubble (hybrid), older nt peel away up-left
    const hyb=8;let pts=[];made.slice().reverse().forEach((i,k)=>{let x,y,ang=0;if(k<hyb){x=xs[i];y=yTt(x,P)-34;}else{const s=(k-hyb+1)*24;const ex=xs[made[made.length-hyb]]??xs[i],ey=yTt(ex,P)-34;x=ex-14-s*.82;y=ey-80-s*.5+Math.sin(s/60)*12;ang=180}
      pts.push([x,y]);RN[i].setAttribute('opacity',1);RN[i].setAttribute('transform',`translate(${f2(x)} ${f2(y)})${k<hyb?'':' rotate(-35)'}`)});
    RN.forEach((q,i)=>{if(!made.includes(i))q.setAttribute('opacity',0)});
    rbb.setAttribute('d',pts.length>1?'M'+pts.map(q=>f2(q[0])+','+f2(q[1]-12)).join(' L'):'');
    if(pts.length){const a=pts[pts.length-1],b=pts[0];r5.setAttribute('x',f2(a[0]-30));r5.setAttribute('y',f2(a[1]-18));r3.setAttribute('x',f2(b[0]+26));r3.setAttribute('y',f2(b[1]-20));r5.setAttribute('opacity',1);r3.setAttribute('opacity',1)}else{r5.setAttribute('opacity',0);r3.setAttribute('opacity',0)}
    ntps.forEach((q,k)=>{const c=((lt*.6+k/5)%1);const x=P+BW*.9-c*BW*.5+k*14,y=yTm+120-c*80;q.setAttribute('transform',`translate(${f2(x)} ${f2(y)})`);q.setAttribute('opacity',f2(Math.sin(c*Math.PI)*.9))});
    const last=made.slice(-12);l1.textContent=last.map(i=>bTm[i]).join('');l2.textContent=last.map(i=>bR[i]).join('');
    A.rnap=[P,(yC+yTm)/2-105];A.bubble=[P-BW*.4,yCt(P-BW*.4,P)];A.hybrid=[P-BW*.35,yTt(P-BW*.35,P)-34];A.ntp=[P+BW*.7,yTm+80];if(pts.length>hyb+2){const q=pts[Math.min(pts.length-1,hyb+4)];A.mrna=[q[0],q[1]]}else A.mrna=[P-BW*.2,yTm-34]}}});
/* ---------- TRANSLATION — the FULL standard genetic code (64 codons). Ribosome fixed, mRNA slides 5′→3′ through it (= ribosome moves toward 3′).
   step: aminoacyl-tRNA enters the A site (anticodon pairs antiparallel with the codon) → peptide bond: chain moves from P-site tRNA to A-site tRNA
   → translocation by one codon (A→P, P→E) → empty tRNA leaves from E. Stop codon (UAA/UAG/UGA) → release factor, chain released. */
const B4='UCAG',AA1='FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG';
const AA3={F:['Phe','Fenilalanin','Phenylalanine'],L:['Leu','Leytsin','Leucine'],S:['Ser','Serin','Serine'],Y:['Tyr','Tirozin','Tyrosine'],C:['Cys','Sistein','Cysteine'],W:['Trp','Triptofan','Tryptophan'],
  P:['Pro','Prolin','Proline'],H:['His','Gistidin','Histidine'],Q:['Gln','Glutamin','Glutamine'],R:['Arg','Arginin','Arginine'],I:['Ile','Izoleytsin','Isoleucine'],M:['Met','Metionin','Methionine'],T:['Thr','Treonin','Threonine'],
  N:['Asn','Asparagin','Asparagine'],K:['Lys','Lizin','Lysine'],V:['Val','Valin','Valine'],A:['Ala','Alanin','Alanine'],D:['Asp','Asparagin kislota','Aspartate'],E:['Glu','Glutamin kislota','Glutamate'],G:['Gly','Glitsin','Glycine'],'*':['STOP','Stop','Stop']};
const CODE={};for(let i=0;i<64;i++){const c=B4[i>>4]+B4[(i>>2)&3]+B4[i&3];CODE[c]=AA3[AA1[i]]}
SM.geneticCode=c=>CODE[String(c).toUpperCase().replace(/T/g,'U')];
const AAC={Met:'#26A69A',Ala:'#FFA726',Lys:'#42A5F5',Phe:'#EC407A',Gly:'#9CCC65',Trp:'#7E57C2',His:'#29B6F6',Glu:'#EF5350',Asp:'#E57373',Leu:'#FFCA28',Ile:'#FFD54F',Ser:'#8D6E63',Thr:'#A1887F',Val:'#66BB6A',Tyr:'#AB47BC',Cys:'#FFEE58',Pro:'#BCAAA4',Gln:'#4DB6AC',Asn:'#80CBC4',Arg:'#5C6BC0',};const ACOL=AAC;
KIT.names(NAMES.uz,{mrna:'iRNK (mRNK)',release:'Terminatsiya omili'});KIT.names(NAMES.en,{mrna:'mRNA',release:'Release factor'});KIT.names(NAMES.ru,{mrna:'мРНК',release:'Фактор терминации'});
SM.items.translation=preset(1500,820,(g,it)=>{let cod=it.codons||['AUG','GCU','AAA','UUC','GGA','UGG','CAU','UAA'];if(typeof cod==='string')cod=cod.toUpperCase().replace(/[^ACGUT]/g,'').replace(/T/g,'U').match(/.{3}/g)||[];
  cod=cod.map(c=>c.toUpperCase().replace(/T/g,'U'));if(cod[0]!=='AUG')SERR_WARN.push('translation: real translation starts at AUG (Met)');const si=cod.findIndex(c=>CODE[c]&&CODE[c][0]==='STOP');const n=si<0?cod.length:si+1;cod=cod.slice(0,n);
  const NT=38,CW=NT*3,RX=750,yM=500,TT=it.cycle||(n*2.6+2),cs=['#B0BEC5'];
  const sub=el('g',{},g),mrnaG=el('g',{},g),trnaG=el('g',{},g),chainG=el('g',{},g),large=el('g',{},g),txtG=el('g',{},g);
  // ribosome: large subunit above the mRNA (with tunnel), small subunit below
  el('path',{d:`M${RX-300},${yM-40} C${RX-330},${yM-250} ${RX-120},${yM-330} ${RX+40},${yM-320} C${RX+260},${yM-310} ${RX+340},${yM-200} ${RX+300},${yM-40} Z`,fill:'#5C6BC0','fill-opacity':.28,stroke:'#9FA8DA','stroke-width':4},large);
  el('path',{d:`M${RX-280},${yM+22} C${RX-300},${yM+120} ${RX+300},${yM+120} ${RX+280},${yM+22} Z`,fill:'#5C6BC0','fill-opacity':.35,stroke:'#9FA8DA','stroke-width':4},sub);
  ['E','P','A'].forEach((s,k)=>{const x=RX+(k-1)*CW;el('rect',{x:x-CW/2+6,y:yM-230,width:CW-12,height:212,rx:14,fill:'none',stroke:'#C5CAE9','stroke-opacity':.45,'stroke-dasharray':'7 6','stroke-width':2},large);txt(large,s,x,yM-240,{size:30,color:'#C5CAE9',weight:800})});
  // mRNA nucleotides (letters inside), codon brackets
  const seq=cod.join('')+'GCAUCC';const nts=[...seq].map((b,i)=>{const q=el('g',{},mrnaG);el('line',{x1:0,y1:0,x2:0,y2:-22,stroke:BC[b],'stroke-width':8,'stroke-linecap':'round'},q);el('circle',{cx:0,cy:0,r:14,fill:BC[b],stroke:'#fff','stroke-width':1.5},q);txt(q,b,0,6,{size:17,color:'#111',weight:800});return q});
  const brk=cod.map((c,i)=>{const q=el('g',{},mrnaG);el('path',{d:`M${-CW/2+8},24 L${-CW/2+8},32 L${CW/2-8},32 L${CW/2-8},24`,fill:'none',stroke:CODE[c][0]==='STOP'?'#EF5350':'#90A4AE','stroke-width':3},q);txt(q,CODE[c][0],0,58,{size:18,color:CODE[c][0]==='STOP'?'#EF5350':'dim',weight:700});return q});
  const mline=el('path',{fill:'none',stroke:'#FFAB91','stroke-width':7},mrnaG);mrnaG.insertBefore(mline,mrnaG.firstChild);const m5=txt(mrnaG,'5′',0,8,{size:26,color:'#FFAB91',weight:800}),m3=txt(mrnaG,'3′',0,8,{size:26,color:'#FFAB91',weight:800});
  const ACmp={A:'U',U:'A',G:'C',C:'G'};
  const tr=cod.map((c,i)=>{if(CODE[c][0]==='STOP')return null;const q=el('g',{opacity:0},trnaG);
    el('path',{d:`M-10,-30 L-10,-150 M10,-30 L10,-150`,stroke:'#CFD8DC','stroke-width':9,'stroke-linecap':'round',fill:'none'},q);
    [[-34,-118],[34,-118]].forEach(([x,y])=>el('circle',{cx:x,cy:y,r:17,fill:'none',stroke:'#CFD8DC','stroke-width':8},q));el('path',{d:'M-10,-118 L-17,-118 M10,-118 L17,-118',stroke:'#CFD8DC','stroke-width':8},q);
    el('path',{d:`M-${NT+10},-30 L${NT+10},-30`,stroke:'#CFD8DC','stroke-width':9,'stroke-linecap':'round'},q);
    [...c].forEach((b,k)=>{const a=ACmp[b];el('line',{x1:(k-1)*NT,y1:-30,x2:(k-1)*NT,y2:-6,stroke:BC[a],'stroke-width':8,'stroke-linecap':'round'},q);el('circle',{cx:(k-1)*NT,cy:-22,r:12,fill:BC[a],stroke:'#fff','stroke-width':1.2},q);txt(q,a,(k-1)*NT,-17,{size:15,color:'#111',weight:800})});
    return q});
  const aa=cod.map((c,i)=>{if(CODE[c][0]==='STOP')return null;const q=el('g',{opacity:0},chainG);const nm3=CODE[c][0];el('circle',{r:24,fill:vol(AAC[nm3]||'#90A4AE'),stroke:dark(AAC[nm3]||'#90A4AE'),'stroke-width':2.5},q);txt(q,nm3,0,6,{size:16,color:'#111',weight:800});return q});
  const bonds=el('path',{fill:'none',stroke:'#ECEFF1','stroke-width':5},chainG);chainG.insertBefore(bonds,chainG.firstChild);
  const rf=el('g',{opacity:0},trnaG);el('path',{d:'M-40,-10 L-40,-150 C-40,-190 40,-190 40,-150 L40,-10 Z',fill:vol('#EF5350'),stroke:dark('#EF5350'),'stroke-width':3},rf);txt(rf,'RF',0,-90,{size:26,color:'#fff',weight:800});
  const info=txt(txtG,'',RX,yM+175,{size:32,color:'ink',weight:800}),info2=txt(txtG,'',RX,yM+215,{size:24,color:'dim',weight:600});
  // chain path: from the P-site tRNA top up through the exit tunnel
  const cpath=(x0,y0,s)=>{const P=[[x0,y0],[x0+10,y0-60],[RX+40,yM-320],[RX+110,yM-385],[RX+210,yM-415],[RX+310,yM-400],[RX+380,yM-350],[RX+410,yM-280],[RX+420,yM-200]];let L=0;for(let k=1;k<P.length;k++){const d=Math.hypot(P[k][0]-P[k-1][0],P[k][1]-P[k-1][1]);if(L+d>=s){const t=(s-L)/d;return [lerp(P[k-1][0],P[k][0],t),lerp(P[k-1][1],P[k][1],t)]}L+=d}return P[P.length-1]};
  const A={ribosome:[RX+290,yM-140],large:[RX-250,yM-250],small:[RX,yM+95],siteE:[RX-CW,yM-230],siteP:[RX,yM-230],siteA:[RX+CW,yM-230],trna:[RX+CW,yM-150],anticodon:[RX+CW,yM-22],codon:[RX+CW,yM],mrna:[RX+380,yM],peptide:[RX+300,yM-385]};
  return {anchors:A,view:[290,50,920,740],update(lt,p,st){const u=cyc(lt,st,TT,.2);const tt=u*TT;const step=Math.min(n-1,Math.floor(Math.max(0,tt-1)/2.6)+1);const f=clamp(((tt-1)-(step-1)*2.6)/2.6);const fin=tt<1?0:f;
    const ph=x=>clamp((fin-x[0])/(x[1]-x[0]));const pIn=ph([0,.28]),pPep=ph([.32,.5]),pTr=ph([.55,.82]),pOut=ph([.82,1]);
    const k=step;const isStop=CODE[cod[k]]&&CODE[cod[k]][0]==='STOP';const shift=(k-1)+E.inOutCubic(isStop?0:pTr); // codon index sitting in the P site
    const cx=i=>RX+(i-shift)*CW;nts.forEach((q,i)=>{const ci=Math.floor(i/3),x=cx(ci)+((i%3)-1)*NT;q.setAttribute('transform',`translate(${f2(x)} ${yM})`);q.setAttribute('opacity',x<330||x>1170?0:1)});
    brk.forEach((q,i)=>{const x=cx(i);q.setAttribute('transform',`translate(${f2(x)} ${yM})`);q.setAttribute('opacity',x<340||x>1160?0:1)});
    const x5=cx(0)-NT*2,x3=cx(Math.floor((nts.length-1)/3))+NT*2;mline.setAttribute('d',`M${f2(Math.max(320,x5))},${yM} L${f2(Math.min(1180,x3))},${yM}`);m5.setAttribute('x',f2(Math.max(320,x5)-30));m3.setAttribute('x',f2(Math.min(1180,x3)+30));m5.setAttribute('y',yM+8);m3.setAttribute('y',yM+8);
    // tRNAs
    tr.forEach((q,i)=>{if(!q)return;let x=cx(i),y=yM,o=1;if(i<k-1){o=0}else if(i===k-1){ if(isStop){o=1}else{o=1-pOut;if(pOut>0){x-=pOut*140;y-=pOut*120}}}else if(i===k){if(!isStop){o=pIn;x+=(1-E.outCubic(pIn))*260;y-=(1-E.outCubic(pIn))*200}}else o=0;
      if(i===0&&k===1&&tt<1){o=1}q.setAttribute('opacity',f2(o));q.setAttribute('transform',`translate(${f2(x)} ${f2(y)})`);q._x=x;q._y=y});
    rf.setAttribute('opacity',isStop?f2(pIn):0);rf.setAttribute('transform',`translate(${f2(cx(k)+(1-pIn)*200)} ${yM-8-(1-pIn)*150})`);
    // chain: amino acids 0..k-1 (+k after the peptide bond). Attached to the P tRNA (k-1) or to the A tRNA (k) after transfer
    const onA=!isStop&&pPep>.5;const host=onA?tr[k]:tr[k-1];const hx=host?host._x:cx(k-1),hy=(host?host._y:yM)-170;const rel=isStop?E.inCubic(ph([.35,1])):0;
    const cnt=onA?k+1:k;const bp=[];for(let j=0;j<cod.length;j++){const q=aa[j];if(!q)continue;if(j>=cnt){q.setAttribute('opacity',j===k&&!isStop?f2(pIn):0);if(j===k&&tr[k]){q.setAttribute('transform',`translate(${f2(tr[k]._x)} ${f2(tr[k]._y-170)})`)}continue}
      const s=(cnt-1-j)*52;let [x,y]=cpath(hx,hy,s);x+=rel*60;y-=rel*260;q.setAttribute('opacity',f2(1-rel*.2));q.setAttribute('transform',`translate(${f2(x)} ${f2(y)})`);bp.push([x,y])}
    bonds.setAttribute('d',bp.length>1?'M'+bp.map(q=>f2(q[0])+','+f2(q[1])).join(' L'):'');
    const c=cod[k];const nmc=CODE[c];info.textContent=isStop?T({uz:`Kodon ${c} → STOP: zanjir ajraladi`,en:`Codon ${c} → STOP: chain released`,ru:`Кодон ${c} → СТОП`}):`${T({uz:'Kodon',en:'Codon',ru:'Кодон'})} 5′-${c}-3′ → ${nmc[0]}`;
    info2.textContent=isStop?T({uz:'Stop kodonga tRNK yo‘q — terminatsiya omili keladi',en:'No tRNA for a stop codon — release factor binds',ru:'Для стоп-кодона нет тРНК'}):`${LANG==='en'?nmc[2]:nmc[1]} · ${T({uz:'antikodon',en:'anticodon',ru:'антикодон'})} 3′-${[...c].map(b=>ACmp[b]).join('')}-5′`;
    const tA=isStop?null:tr[k];A.trna=tA?[tA._x+34,tA._y-118]:[cx(k),yM-150];A.anticodon=tA?[tA._x+NT+10,tA._y-22]:[cx(k),yM-22];A.codon=[cx(k)+NT,yM+16];
    if(bp.length)A.peptide=bp[Math.floor(bp.length/2)];else A.peptide=[hx,hy]}}});
/* ---------- PROTEIN structure levels ---------- */
KIT.names(NAMES.uz,{disulfide:'Disulfid ko‘prik (S–S)',subunit:'Subbirlik (polipeptid)',nterm:'N-uch (H₂N–)',cterm:'C-uch (–COOH)',pbond:'Peptid bog‘lar',hbondH:'H-bog‘ (spiral bo‘ylab)',hbondS:'H-bog‘ (zanjirlar orasida)',loop:'Halqa (burilish)',
  gland:'Bez hujayrasi (gormon chiqaradi)',selfcell:'Hujayra o‘z signalini qabul qiladi',contact:'Membranadagi signal oqsil',receptorJ:'Qo‘shni hujayra retseptori',targetE:'Nishon hujayra',targetS:'Nishon hujayra (muskul)',nmt:'Neyromediator',signal:'Signal molekulasi',vesicleS:'Pufakcha',
  adp:'ATF → ADF',gtp:'GTF (faol)',gdp:'GDF'});
KIT.names(NAMES.en,{disulfide:'Disulfide bridge (S–S)',subunit:'Subunit (polypeptide)',nterm:'N-terminus (H₂N–)',cterm:'C-terminus (–COOH)',pbond:'Peptide bonds',hbondH:'H-bond (along the helix)',hbondS:'H-bond (between strands)',loop:'Loop (turn)',
  gland:'Gland cell (secretes hormone)',selfcell:'Cell receives its own signal',contact:'Membrane-bound signal',receptorJ:'Neighbour’s receptor',targetE:'Target cell',targetS:'Target cell (muscle)',nmt:'Neurotransmitter',signal:'Signal molecule',vesicleS:'Vesicle',
  adp:'ATP → ADP',gtp:'GTP (active)',gdp:'GDP'});
KIT.names(NAMES.ru,{disulfide:'Дисульфидный мостик (S–S)',subunit:'Субъединица',nterm:'N-конец (H₂N–)',cterm:'C-конец (–COOH)',pbond:'Пептидные связи',hbondH:'H-связь (вдоль спирали)',hbondS:'H-связь (между цепями)',loop:'Петля',
  gland:'Железистая клетка',selfcell:'Клетка принимает свой сигнал',contact:'Мембранный сигнал',receptorJ:'Рецептор соседа',targetE:'Клетка-мишень',targetS:'Клетка-мишень (мышца)',nmt:'Нейромедиатор',signal:'Сигнальная молекула',vesicleS:'Пузырёк',adp:'АТФ → АДФ',gtp:'ГТФ',gdp:'ГДФ'});
/* ---------- PROTEIN structure levels — each panel 400 wide (view crops to the chosen kinds).
   primary: amino-acid sequence joined by peptide bonds, N-terminus (H₂N–) → C-terminus (–COOH)
   secondary: α-helix (3.6 residues/turn, H-bonds C=O(i)…H–N(i+4) run PARALLEL to the axis) + antiparallel β-sheet (H-bonds ACROSS strands)
   tertiary: one chain folds (helix + sheet + loops) held by S–S bridges, H-bonds, ionic and hydrophobic contacts
   quaternary: several chains (subunits) together, e.g. haemoglobin 2α+2β */
const coil=(pg,cx,y0,y1,R,c,turns)=>{const pts=[];const n=Math.round(turns*36);for(let i=0;i<=n;i++){const a=i/36*TAU;pts.push([cx+Math.sin(a)*R,lerp(y0,y1,i/n)+Math.cos(a)*R*.28,Math.cos(a)])}
  const back=el('g',{},pg),front=el('g',{},pg);let seg=[pts[0]],fr=pts[0][2]>0;const flush=()=>{if(seg.length>1)el('path',{d:smoothOpen(seg.map(p=>[p[0],p[1]])),fill:'none',stroke:fr?c:dark(c,.35),'stroke-width':fr?15:11,'stroke-linecap':'round'},fr?front:back)};
  for(let i=1;i<pts.length;i++){const f=pts[i][2]>0;seg.push(pts[i]);if(f!==fr){flush();seg=[pts[i]];fr=f}}flush();return {g:front,pts}};
const strand=(pg,x,y0,y1,c,w=34)=>{const up=y1<y0,h=up?-1:1,hy=y1-h*40;return el('path',{d:`M${x-w/2},${y0} L${x-w/2},${hy} L${x-w},${hy} L${x},${y1} L${x+w},${hy} L${x+w/2},${hy} L${x+w/2},${y0} Z`,fill:vol(c),stroke:dark(c),'stroke-width':2.5},pg)};
SM.items.protein=preset(1600,700,(g,it)=>{const k=it.kind||'all';const kinds=k==='all'?['primary','secondary','tertiary','quaternary']:[k];const W=400,A={};const parts=[];
  const AAS=['Met','Ala','Lys','Phe','Gly','Trp','His','Glu','Leu','Ser','Val','Tyr'];
  kinds.forEach((kd,i)=>{const ox=i*W,cx=ox+W/2,pg=el('g',{},g);parts.push(pg);txt(pg,nm(kd),cx,670,{size:26,color:'ink',weight:700});
    if(kd==='primary'){const n=9;const pts=[...Array(n)].map((_,j)=>[cx+(j%2?46:-46),120+j*56]);const ch=el('g',{},pg);
      for(let j=0;j<n-1;j++)el('line',{x1:pts[j][0],y1:pts[j][1],x2:pts[j+1][0],y2:pts[j+1][1],stroke:TH.ink,'stroke-width':5,opacity:.75},ch);
      const pb=el('circle',{cx:(pts[2][0]+pts[3][0])/2,cy:(pts[2][1]+pts[3][1])/2,r:6,fill:'#FFCA28'},pg);
      pts.forEach(([x,y],j)=>{const a=AAS[j%12];el('circle',{cx:x,cy:y,r:25,fill:vol(ACOL[a]),stroke:dark(ACOL[a]),'stroke-width':2},ch);txt(ch,a,x,y+6,{size:16,color:'#111',weight:800})});
      const nt=txt(pg,'H₂N–',pts[0][0]-34,pts[0][1]+8,{size:24,anchor:'end',color:'#64B5F6',weight:800});const ct=txt(pg,'–COOH',pts[n-1][0]+34,pts[n-1][1]+8,{size:24,anchor:'start',color:'#EF5350',weight:800});
      A.nterm=nt;A.cterm=ct;A.pbond=pb}
    if(kd==='secondary'){const hx=cx-80,bx=cx+85;const H=coil(pg,hx,110,590,48,'#EC407A',4.6);A.helix={el:H.g,fx:.15,fy:.25};
      const hb=el('g',{},pg);for(let t=0;t<4;t++){const y=110+(t+.5)*(480/4.6)+13;el('line',{x1:hx+6,y1:y,x2:hx+6,y2:y+480/4.6-6,stroke:'#FFF59D','stroke-width':3,'stroke-dasharray':'5 5'},hb)}A.hbondH={el:hb,fx:.5,fy:.4};
      const S=[-1,0,1].map((c,j)=>strand(pg,bx+c*52,j%2?120:590,j%2?590:120,'#FFCA28'));
      const hs=el('g',{},pg);for(let y=170;y<560;y+=64)[-1,0].forEach(c=>el('line',{x1:bx+c*52+18,y1:y,x2:bx+(c+1)*52-18,y2:y,stroke:'#FFF59D','stroke-width':3,'stroke-dasharray':'5 4'},hs));A.sheet={el:S[2],fx:.5,fy:.1};A.hbondS={el:hs,fx:.75,fy:.62}}
    if(kd==='tertiary'){const P=[[cx-120,560],[cx-130,470],[cx-60,420]];const ch=el('g',{},pg);const c='#26A69A';
      el('path',{d:smoothOpen([[cx-120,600],[cx-130,520],[cx-60,470],[cx-90,400],[cx-150,330]]),fill:'none',stroke:c,'stroke-width':11,'stroke-linecap':'round'},ch);
      const H=coil(ch,cx-120,170,330,34,c,2.2);el('path',{d:smoothOpen([[cx-120,170],[cx-60,120],[cx+20,140],[cx+30,200]]),fill:'none',stroke:c,'stroke-width':11,'stroke-linecap':'round'},ch);
      strand(ch,cx+30,200,470,'#4DB6AC',30);el('path',{d:`M${cx+30},470 C${cx+40},530 ${cx+110},530 ${cx+110},470`,fill:'none',stroke:c,'stroke-width':11},ch);const s2=strand(ch,cx+110,470,190,'#4DB6AC',30);
      el('path',{d:smoothOpen([[cx+110,190],[cx+130,130],[cx+170,160],[cx+160,260],[cx+150,330]]),fill:'none',stroke:c,'stroke-width':11,'stroke-linecap':'round'},ch);
      const ss=el('g',{},pg);el('line',{x1:cx-58,y1:470,x2:cx+16,y2:420,stroke:'#FFEB3B','stroke-width':5,'stroke-dasharray':'8 5'},ss);txt(ss,'S–S',cx-12,438,{size:20,color:'#FFEB3B',weight:800});
      txt(pg,'N',cx-120,630,{size:22,color:'#64B5F6',weight:800});txt(pg,'C',cx+150,360,{size:22,color:'#EF5350',weight:800});
      A.disulfide=ss;A.helix=A.helix||{el:H.g,fx:.5,fy:.3};A.sheet=A.sheet||s2}
    if(kd==='quaternary'){const C=['#E53935','#8E24AA','#8E24AA','#E53935'],nmS=['α','β','β','α'];let first;
      [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b],q)=>{const sg=el('g',{},pg);const x=cx+a*78,y=360+b*110;el('path',{d:blob(x,y,80,95,{seed:q+5,amp:.1}),fill:vol(C[q]),'fill-opacity':.55,stroke:dark(C[q],.2),'stroke-width':3},sg);
        const pts=[...Array(10)].map((_,j)=>[x+Math.cos(j*2.1+q)*(30+18*Math.sin(j*1.3)),y+Math.sin(j*2.1+q)*(40+20*Math.cos(j))]);el('path',{d:smoothOpen(pts),fill:'none',stroke:light(C[q],.35),'stroke-width':8,'stroke-linecap':'round'},sg);
        txt(sg,nmS[q],x+a*30,y+b*40+8,{size:28,color:'#fff',weight:800});if(!first)first=sg});A.subunit=first}});
  return {anchors:A,view:[0,0,W*kinds.length,700],update(lt,p,st){parts.forEach((pg,i)=>{const q=E.outCubic(prog(lt,st+i*.5,st+i*.5+.8));pg.setAttribute('opacity',f2(clamp(q)));pg.setAttribute('transform',`translate(0 ${f2((1-q)*30)})`)})}}});
/* ---------- HEMOGLOBIN — 2α + 2β globin chains (α diagonal), each with one heme (porphyrin ring + Fe²⁺) → max 4 O₂.
   Cooperative binding: each bound O₂ makes the next one bind more easily (T → R state) → S-shaped (sigmoid) curve, Hill n≈2.8, P50≈26 mmHg;
   myoglobin (1 chain) gives a hyperbola (P50≈2.8 mmHg). Deoxy-Hb dark red-purple → oxy-Hb bright red. */
KIT.names(NAMES.uz,{alpha:'α-globin zanjiri',beta:'β-globin zanjiri',heme:'Gem (porfirin halqasi)',iron:'Temir ioni (Fe²⁺)',oxygen:'Kislorod (O₂)',curve:'Dissotsiatsiya egri chizig‘i'});
KIT.names(NAMES.en,{alpha:'α-globin chain',beta:'β-globin chain',heme:'Heme (porphyrin ring)',iron:'Iron ion (Fe²⁺)',oxygen:'Oxygen (O₂)',curve:'Dissociation curve'});
KIT.names(NAMES.ru,{alpha:'α-цепь',beta:'β-цепь',heme:'Гем (порфирин)',iron:'Ион железа (Fe²⁺)',oxygen:'Кислород (O₂)',curve:'Кривая диссоциации'});
SM.items.hemoglobin=preset(1500,820,(g,it)=>{const cx=430,cy=430,TT=it.cycle||14;
  const sub=[{n:'alpha',l:'α₁',x:-150,y:-140},{n:'beta',l:'β₁',x:150,y:-140},{n:'beta',l:'β₂',x:-150,y:150},{n:'alpha',l:'α₂',x:150,y:150}];
  const deo={alpha:'#8E2430',beta:'#6A2A55'},oxy={alpha:'#E53935',beta:'#D81B60'};const body=el('g',{},g);
  const blob=(r,seed)=>{let d='';for(let k=0;k<=24;k++){const a=k/24*TAU,rr=r*(1+.07*Math.sin(a*3+seed)+.05*Math.cos(a*5+seed*2));d+=(k?' L':'M')+f2(Math.cos(a)*rr)+','+f2(Math.sin(a)*rr)}return d+'Z'};
  const S=sub.map((s,i)=>{const q=el('g',{},body);const sh=el('path',{d:blob(150,i*1.7),stroke:'#fff','stroke-opacity':.25,'stroke-width':3},q);
    for(let k=0;k<4;k++)el('path',{d:`M${-90+k*12},${-60+k*38} q25,-22 50,0 t50,0 t50,0`,fill:'none',stroke:'#fff','stroke-opacity':.22,'stroke-width':5},q);
    const hx=s.x>0?-35:35,hy=s.y>0?-30:30;const hm=el('g',{transform:`translate(${hx} ${hy})`},q);
    el('rect',{x:-34,y:-34,width:68,height:68,rx:18,fill:'#4E342E',stroke:'#FFCC80','stroke-width':4,transform:'rotate(45)'},hm);[[0,-24],[24,0],[0,24],[-24,0]].forEach(([x,y])=>{el('circle',{cx:x,cy:y,r:7,fill:'#90CAF9'},hm);txt(hm,'N',x,y+4,{size:10,color:'#0D47A1',weight:800})});
    el('circle',{r:12,fill:vol('#FF8F00'),stroke:'#FFE0B2','stroke-width':2},hm);txt(hm,'Fe',0,5,{size:12,color:'#111',weight:800});
    const o2=el('g',{opacity:0},q);[-11,11].forEach(x=>el('circle',{cx:x,cy:0,r:13,fill:vol('#F44336'),stroke:'#fff','stroke-width':1.5},o2));txt(o2,'O₂',0,-20,{size:18,color:'ink',weight:800});
    txt(q,s.l,s.x>0?55:-55,s.y>0?70:-60,{size:44,color:'#fff',weight:800});return {...s,q,sh,hx,hy,o2}});
  // incoming O2 (one per binding) and the curve inset
  const fly=el('g',{opacity:0},g);[-11,11].forEach(x=>el('circle',{cx:x,cy:0,r:13,fill:vol('#F44336'),stroke:'#fff','stroke-width':1.5},fly));
  const GX=880,GY=200,GW=520,GH=380;const gr=el('g',{},g);el('rect',{x:GX-70,y:GY-60,width:GW+110,height:GH+150,rx:20,fill:'#000','fill-opacity':.18,stroke:'#90A4AE','stroke-opacity':.3},gr);
  el('path',{d:`M${GX},${GY} L${GX},${GY+GH} L${GX+GW},${GY+GH}`,fill:'none',stroke:'#CFD8DC','stroke-width':3},gr);
  [0,20,40,60,80,100].forEach(v=>{const x=GX+v/100*GW;el('line',{x1:x,y1:GY+GH,x2:x,y2:GY+GH+8,stroke:'#CFD8DC','stroke-width':2},gr);txt(gr,String(v),x,GY+GH+32,{size:18,color:'dim'})});
  [0,50,100].forEach(v=>{const y=GY+GH-v/100*GH;el('line',{x1:GX-8,y1:y,x2:GX,y2:y,stroke:'#CFD8DC','stroke-width':2},gr);txt(gr,v+'%',GX-14,y+6,{size:18,color:'dim',anchor:'end'})});
  txt(gr,T({uz:'pO₂ (mm sim. ust.)',en:'pO₂ (mmHg)',ru:'pO₂ (мм рт. ст.)'}),GX+GW/2,GY+GH+64,{size:20,color:'ink',weight:700});txt(gr,T({uz:'O₂ bilan to‘yinish',en:'O₂ saturation',ru:'Насыщение O₂'}),GX,GY-24,{size:20,color:'ink',weight:700,anchor:'start'});
  const Hb=p=>Math.pow(p,2.8)/(Math.pow(26,2.8)+Math.pow(p,2.8)),Mb=p=>p/(2.8+p);const cur=(f,c,w)=>{let d='';for(let p=0;p<=100;p+=1)d+=(d?' L':'M')+f2(GX+p/100*GW)+','+f2(GY+GH-f(p)*GH);return el('path',{d,fill:'none',stroke:c,'stroke-width':w},gr)};
  cur(Mb,'#90CAF9',3).setAttribute('stroke-dasharray','8 6');cur(Hb,'#EF5350',5);txt(gr,T({uz:'Mioglobin',en:'Myoglobin',ru:'Миоглобин'}),GX+60,GY+40,{size:18,color:'#90CAF9',anchor:'start',weight:700});txt(gr,T({uz:'Gemoglobin (S-simon)',en:'Hemoglobin (sigmoid)',ru:'Гемоглобин (S-образная)'}),GX+GW*.42,GY+GH*.38,{size:18,color:'#EF5350',anchor:'start',weight:700});
  el('line',{x1:GX+26/100*GW,y1:GY+GH,x2:GX+26/100*GW,y2:GY+GH/2,stroke:'#EF5350','stroke-dasharray':'4 5','stroke-width':2},gr);txt(gr,'P50≈26',GX+26/100*GW+6,GY+GH-10,{size:16,color:'#EF5350',anchor:'start'});
  const dot=el('circle',{r:11,fill:'#FFEB3B',stroke:'#333','stroke-width':2},gr);const cnt=txt(g,'',cx,cy+360,{size:28,color:'ink',weight:800});
  // binding times shrink (cooperativity): 1st slow, then faster
  const tb=[.12,.42,.56,.66];
  const A={alpha:[cx-280,cy-160],beta:[cx+280,cy-160],heme:[cx-150+35+42,cy-140+30],iron:[cx-150+35,cy-140+30],oxygen:[cx+300,cy-300],curve:[GX+GW*.7,GY+GH-Hb(70)*GH]};
  return {anchors:A,sides:{oxygen:'left',heme:'left',iron:'left',alpha:'left',beta:'right',curve:'right'},view:[0,80,1500,740],update(lt,p,st){const u=cyc(lt,st,TT,.3);let nb=0;tb.forEach(t=>{if(u>t+.06)nb++});const R=clamp(nb/4);
    const order=[0,3,1,2];// α₁, α₂, β₁, β₂ (any order is possible; drawn this way)
    S.forEach((s,i)=>{const n=order.indexOf(i);const bound=u>tb[n]+.06;s.o2.setAttribute('opacity',bound?1:0);s.o2.setAttribute('transform',`translate(${s.hx} ${s.hy-30})`);
      const c=KIT.mix(deo[s.n],oxy[s.n],sstep(R*1.15));s.sh.setAttribute('fill',vol(c));
      const rot=(s.n==='alpha'?1:-1)*(i<2?1:-1)*7*sstep((nb-1)/2); // T→R: the αβ dimers rotate ~15° relative to each other
      s.q.setAttribute('transform',`translate(${f2(cx+s.x*(1-.04*R))} ${f2(cy+s.y*(1-.04*R))}) rotate(${f2(rot)})`)});
    const nx=tb.findIndex(t=>u<t+.06);let fx=cx+300,fy=cy-300,fo=0;if(nx>=0){const t0=nx?tb[nx-1]+.06:0,q=clamp((u-Math.max(t0,tb[nx]-.12))/(.12+.06));const s=S[order[nx]];const tx=cx+s.x+s.hx,ty=cy+s.y+s.hy-30;
      fx=lerp(cx+(s.x>0?330:-330),tx,E.inOutCubic(q));fy=lerp(cy-330,ty,E.inOutCubic(q));fo=q>0?1:0}
    fly.setAttribute('opacity',fo);fly.setAttribute('transform',`translate(${f2(fx)} ${f2(fy)})`);A.oxygen=fo?[fx,fy-14]:[cx+S[0].x+S[0].hx,cy+S[0].y+S[0].hy-44];
    const Sat=nb/4;let pp=0;if(Sat>0){let lo=0,hi=100;for(let k=0;k<30;k++){const m=(lo+hi)/2;Hb(m)<Math.min(Sat,.985)?lo=m:hi=m}pp=lo}dot.setAttribute('cx',f2(GX+pp/100*GW));dot.setAttribute('cy',f2(GY+GH-Hb(pp)*GH));
    cnt.textContent=T({uz:`Bog‘langan O₂: ${nb} / 4`,en:`Bound O₂: ${nb} / 4`,ru:`Связано O₂: ${nb} / 4`})+(nb===4?T({uz:' — oksigemoglobin',en:' — oxyhemoglobin',ru:' — оксигемоглобин'}):nb===0?T({uz:' — dezoksigemoglobin',en:' — deoxyhemoglobin',ru:' — дезоксигемоглобин'}):'')}}});

/* ---------- AMINO ACID general formula · kind:'peptide' = condensation of two amino acids ---------- */
/* ---------- AMINO ACID: H₂N–CαH(R)–COOH · peptide: condensation — OH of acid 1 + H of acid 2's amino group leave as H₂O → C–N peptide bond ---------- */
SM.items.aminoacid=preset(1400,700,(g,it)=>{const pep=it.kind==='peptide',A={};const CC='#455A64',NC='#1E88E5',OC='#E53935',HC='#ECEFF1',RC='#43A047';
  const atom=(pg,x,y,s,c,r=30)=>{const e=el('g',{},pg);el('circle',{cx:x,cy:y,r,fill:vol(c),stroke:dark(c),'stroke-width':2},e);txt(e,s,x,y+r*.33,{size:r*.95,color:c===HC?'#222':'#fff',weight:800});return e};
  const bond=(pg,a,b,dbl,w=6)=>{const dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy),nx=-dy/L*7,ny=dx/L*7;const e=el('g',{},pg);(dbl?[1,-1]:[0]).forEach(s=>el('line',{x1:a[0]+nx*s,y1:a[1]+ny*s,x2:b[0]+nx*s,y2:b[1]+ny*s,stroke:TH.dim,'stroke-width':w},e));return e};
  const mol=(ox,R,sc=1)=>{const m=el('g',{},g);const P={ca:[ox,350],n:[ox-150,350],h1:[ox-215,290],h2:[ox-215,410],c:[ox+150,350],o1:[ox+205,268],o2:[ox+225,415],ho:[ox+305,415],h:[ox,480],r:[ox,215]};
    const bk=el('g',{},m),fr=el('g',{},m);const oh=el('g',{},m),hn=el('g',{},m);
    bond(bk,P.ca,P.n);bond(hn,P.n,P.h1);bond(bk,P.n,P.h2);bond(bk,P.ca,P.c);bond(bk,P.c,P.o1,true);bond(oh,P.c,P.o2);bond(oh,P.o2,P.ho);bond(bk,P.ca,P.h);bond(bk,P.ca,P.r);
    const E={ca:atom(fr,...P.ca,'C',CC),n:atom(fr,...P.n,'N',NC),h1:atom(hn,...P.h1,'H',HC,24),h2:atom(fr,...P.h2,'H',HC,24),c:atom(fr,...P.c,'C',CC),o1:atom(fr,...P.o1,'O',OC),o2:atom(oh,...P.o2,'O',OC),ho:atom(oh,...P.ho,'H',HC,24),h:atom(fr,...P.h,'H',HC,24)};
    txt(fr,'α',P.ca[0]+30,P.ca[1]-26,{size:22,color:'a2',weight:800});
    const r=el('g',{},fr);el('circle',{cx:P.r[0],cy:P.r[1],r:42,fill:vol(RC),stroke:dark(RC),'stroke-width':3},r);txt(r,R,P.r[0],P.r[1]+10,{size:28,color:'#fff',weight:800});E.r=r;return {m,P,E,oh,hn}};
  if(!pep){const {E}=mol(700,'R');const box=(x,y,w,h,c)=>dr(el('rect',{x,y,width:w,height:h,rx:26,fill:c,'fill-opacity':.07,stroke:c,'stroke-width':4,'stroke-dasharray':'12 8'},g));
    const bA=box(455,250,225,200,NC),bC=box(820,225,370,240,OC),bR=box(640,155,120,120,RC);
    Object.assign(A,{amino:{el:bA,fx:.3,fy:0},carboxyl:{el:bC,fx:.7,fy:0},radical:{el:bR,fx:.5,fy:0},calpha:E.ca,hydrogen:E.h});return {anchors:A,sides:{amino:'left',calpha:'left',carboxyl:'right',hydrogen:'right'}}}
  const a=mol(330,'R₁'),b=mol(1070,'R₂');const w=el('g',{opacity:0},g);atom(w,0,0,'O',OC);atom(w,-46,28,'H',HC,24);atom(w,46,28,'H',HC,24);txt(w,'H₂O',0,-46,{size:28,color:'a1',weight:800});
  const ring=[a.oh,b.hn].map(x=>{const c=el('ellipse',{fill:'none',stroke:'#FFCA28','stroke-width':4,'stroke-dasharray':'8 6',opacity:0},g);return c});
  const pbG=el('g',{opacity:0},g);const pb=el('line',{stroke:'#FFCA28','stroke-width':14,'stroke-linecap':'round'},pbG);const cap=txt(g,'',700,650,{size:30,color:'a2',weight:700});
  A.amino=a.E.n;A.carboxyl={el:b.E.o1,fx:.5,fy:0};A.radical=a.E.r;A.peptideBond=pb;A.waterOut=w;
  return {anchors:A,sideAt:7,sides:{amino:'left',carboxyl:'right'},update(lt,p,st){const hl=prog(lt,st+1,st+1.6),mv=E.inOutCubic(prog(lt,st+2.2,st+4)),fm=prog(lt,st+4,st+4.6);const d=mv*155;
    a.m.setAttribute('transform',`translate(${f2(d)} 0)`);b.m.setAttribute('transform',`translate(${f2(-d)} 0)`);
    // leaving groups: OH (acid 1) and H (acid 2) slide to the middle and become one water molecule
    const lv=E.inOutCubic(prog(lt,st+2.2,st+3.4));a.oh.setAttribute('transform',`translate(${f2(lerp(0,105-d,lv))} ${f2(lerp(0,-265,lv))})`);b.hn.setAttribute('transform',`translate(${f2(lerp(0,700-855+d,lv))} ${f2(lerp(0,-140,lv))})`);
    const wq=prog(lt,st+3.2,st+3.6);a.oh.setAttribute('opacity',f2(1-wq));b.hn.setAttribute('opacity',f2(1-wq));w.setAttribute('opacity',f2(wq));w.setAttribute('transform',`translate(700 ${f2(lerp(150,110,prog(lt,st+3.4,st+6)))})`);
    at(ring[0],{cx:f2(330+265+d),cy:415,rx:110,ry:44,opacity:f2(hl*(1-lv))});at(ring[1],{cx:f2(1070-215-d),cy:290,rx:40,ry:40,opacity:f2(hl*(1-lv))});
    at(pb,{x1:f2(330+150+d),y1:350,x2:f2(1070-150-d),y2:350});pbG.setAttribute('opacity',f2(fm*.85));
    cap.textContent=lt<st+2.2?T({uz:'Karboksil guruhdagi OH va aminoguruhdagi H ajraladi',en:'OH of the carboxyl and H of the amino group leave',ru:'Уходят OH карбоксила и H аминогруппы'}):lt<st+4?T({uz:'Kondensatsiya: suv (H₂O) hosil bo‘ladi',en:'Condensation: water (H₂O) forms',ru:'Конденсация: образуется вода'}):T({uz:'C–N peptid bog‘ → dipeptid',en:'C–N peptide bond → dipeptide',ru:'Связь C–N → дипептид'})}}});
/* ---------- RECEPTOR types: gpcr | rtk | ion | nuclear ---------- */
SM.items.receptor=preset(1500,820,(g,it)=>{const k=it.kind||'rtk',yc=260,TT=it.cycle||9,A={};const memb=()=>{el('rect',{x:30,y:yc-60,width:1440,height:120,fill:NAT.fat,'fill-opacity':.25},g);for(let x=40;x<1460;x+=34){[-1,1].forEach(d=>{el('circle',{cx:x,cy:yc+d*50,r:13,fill:'#F48FB1'},g);el('line',{x1:x-4,y1:yc+d*36,x2:x-4,y2:yc+d*6,stroke:'#F8BBD0','stroke-width':3},g);el('line',{x1:x+4,y1:yc+d*36,x2:x+4,y2:yc+d*6,stroke:'#F8BBD0','stroke-width':3},g)})}};
  memb();txt(g,T({uz:'Hujayradan tashqari',en:'Outside the cell',ru:'Вне клетки'}),60,60,{anchor:'start',size:26,color:'dim'});txt(g,T({uz:'Sitoplazma',en:'Cytoplasm',ru:'Цитоплазма'}),60,yc+110,{anchor:'start',size:26,color:'dim'});
  const cap=txt(g,'',750,790,{size:30,color:'a2',weight:700});const lig=(c='#FFB300')=>{const e=el('polygon',{points:'0,-22 20,0 0,22 -20,0',fill:vol(c),stroke:dark(c),'stroke-width':2},g);return e};
  if(k==='rtk'){const mono=[-1,1].map(s=>{const m=el('g',{},g);el('rect',{x:-18,y:-170,width:36,height:150,rx:18,fill:vol('#5C6BC0'),stroke:dark('#5C6BC0'),'stroke-width':3},m);el('rect',{x:-8,y:-20,width:16,height:130,fill:'#7986CB'},m);
      el('rect',{x:-30,y:110,width:60,height:170,rx:24,fill:vol('#3949AB'),stroke:dark('#3949AB'),'stroke-width':3},m);const P=[0,1,2].map(q=>{const pp=el('g',{opacity:0},m);el('circle',{cx:s*-50,cy:140+q*55,r:20,fill:vol('#FFCA28'),stroke:'#F57F17','stroke-width':2},pp);txt(pp,'P',s*-50,148+q*55,{size:20,color:'#5D4037'});return pp});return {m,s,P}});
    const L=[lig(),lig()];const dk=[el('ellipse',{rx:46,ry:30,fill:vol('#26A69A'),stroke:dark('#26A69A'),'stroke-width':3},g),el('ellipse',{rx:46,ry:30,fill:vol('#66BB6A'),stroke:dark('#66BB6A'),'stroke-width':3},g)];
    Object.assign(A,{rtk:{el:mono[0].m,fx:.5,fy:.05},ligand:L[0],phosphate:mono[0].P[1],dock:dk[0]});const atp=txt(g,'ATF → ADF',1000,yc+190,{size:28,color:'#FFCA28',op:0});
    return {anchors:A,update(lt,p,st){const u=cyc(lt,st,TT,.3);const lq=E.outCubic(prog(u,0,.2)),dm=E.inOutCubic(prog(u,.2,.35)),ph=prog(u,.38,.6),dq=E.outCubic(prog(u,.62,.8)),rs=E.inOutCubic(prog(u,.9,1));const gap=lerp(170,46,dm*(1-rs));
      mono.forEach(({m,s,P},i)=>{m.setAttribute('transform',`translate(${f2(750+s*gap)} ${yc})`);P.forEach((pp,q)=>pp.setAttribute('opacity',f2(clamp(ph*3-q)*(1-rs))))});
      L.forEach((e,i)=>{const s=i?1:-1;e.setAttribute('transform',`translate(${f2(lerp(750+s*500,750+s*gap,lq))} ${f2(lerp(40,yc-190,lq)-rs*200)})`);e.setAttribute('opacity',f2(1-rs))});
      dk.forEach((e,i)=>{const s=i?1:-1;at(e,{cx:f2(lerp(750+s*600,750+s*(gap+110),dq)),cy:f2(lerp(780,yc+180+i*80,dq)),opacity:f2(dq*(1-rs))})});atp.setAttribute('opacity',f2(ph>0&&ph<1?1:0));
      cap.textContent=u<.2?T({uz:'1. Signal molekulalari bog‘lanadi',en:'1. Ligands bind',ru:'1. Связывание лигандов'}):u<.38?T({uz:'2. Retseptorlar juftlashadi (dimer)',en:'2. Receptors pair up (dimer)',ru:'2. Димеризация'}):u<.62?T({uz:'3. O‘zaro fosforlanish',en:'3. Cross-phosphorylation',ru:'3. Перекрёстное фосфорилирование'}):T({uz:'4. Signal oqsillari faollashadi',en:'4. Relay proteins activate',ru:'4. Активация белков-посредников'})}}}
  if(k==='ion'){const halves=[-1,1].map(s=>{const h=el('g',{},g);el('path',{d:`M${s*10},-110 C${s*70},-110 ${s*80},-60 ${s*60},0 C${s*80},60 ${s*70},110 ${s*10},110 L${s*30},0 Z`,fill:vol('#26A69A'),stroke:dark('#26A69A'),'stroke-width':3},h);return {h,s}});
    const L=[lig('#AB47BC'),lig('#AB47BC')];const ions=[...Array(14)].map(()=>el('circle',{r:12,fill:vol('#42A5F5'),stroke:'#0D47A1','stroke-width':2},g));Object.assign(A,{channel:halves[0].h,ligand:L[0],ion:ions[0]});
    return {anchors:A,update(lt,p,st){const u=cyc(lt,st,TT,.3);const lq=E.outCubic(prog(u,0,.2)),op=E.inOutCubic(prog(u,.2,.3))*(1-E.inOutCubic(prog(u,.85,.95)));
      halves.forEach(({h,s})=>h.setAttribute('transform',`translate(${f2(750+s*(20+op*40))} ${yc})`));L.forEach((e,i)=>{const s=i?1:-1;e.setAttribute('transform',`translate(${f2(lerp(750+s*400,750+s*95,lq))} ${f2(lerp(40,yc-120,lq))})`);e.setAttribute('opacity',f2(1-prog(u,.85,.95)))});
      ions.forEach((e,i)=>{const ph=(u*3+seeded(i,1))%1;const flow=op>.5;const hx=200+seeded(i,2)*1100,hy=60+seeded(i,3)*120;let x=hx,y=hy;if(flow&&i%2===0){const q=E.inOutSine(ph);x=lerp(hx,750,clamp(q*2));y=q<.5?lerp(hy,yc-60,q*2):lerp(yc-60,640,(q-.5)*2)}
        at(e,{cx:f2(x+Math.sin(lt+i)*8),cy:f2(y)})});cap.textContent=op>.5?T({uz:'Kanal ochiq — ionlar kiradi',en:'Channel open — ions flow in',ru:'Канал открыт — ионы входят'}):T({uz:'Kanal yopiq',en:'Channel closed',ru:'Канал закрыт'})}}}
  if(k==='nuclear'){const nuc=el('ellipse',{cx:1100,cy:620,rx:280,ry:160,fill:'#7E57C2','fill-opacity':.15,stroke:'#7E57C2','stroke-width':6,'stroke-dasharray':'26 8'},g);const dnaP=el('path',{d:wavy(900,650,1300,650,14,5),fill:'none',stroke:NAT.dnaC,'stroke-width':8},g);
    const H=el('g',{},g);el('path',{d:'M-30,-14 L-10,-26 L10,-14 L30,-26 L30,14 L10,26 L-10,14 L-30,26 Z',fill:vol('#FFB300'),stroke:'#E65100','stroke-width':2},H);const Rr=el('path',{d:'M-46,-30 C-10,-50 40,-40 50,0 C40,40 -10,50 -46,30 C-30,10 -30,-10 -46,-30 Z',fill:vol('#EC407A'),stroke:'#880E4F','stroke-width':3},g);
    const mr=el('path',{fill:'none',stroke:NAT.dnaU,'stroke-width':6},g);Object.assign(A,{hormone:H,nreceptor:Rr,nucleus:{el:nuc,fx:.85,fy:.1},dna:dnaP,mrna:mr});
    return {anchors:A,update(lt,p,st){const u=cyc(lt,st,TT+3,.3);const a=E.inOutSine(prog(u,0,.3)),b=E.inOutCubic(prog(u,.3,.42)),c=E.inOutCubic(prog(u,.42,.65)),m=prog(u,.68,.95);
      let hx=lerp(250,500,a),hy=lerp(60,450,a);let rx=500+Math.sin(lt)*10,ry=480;if(b>0){hx=lerp(hx,rx+20,b);hy=lerp(hy,ry,b)}if(c>0){rx=lerp(500,1080,c);ry=lerp(480,610,c);hx=rx+20;hy=ry}
      H.setAttribute('transform',`translate(${f2(hx)} ${f2(hy)})`);Rr.setAttribute('transform',`translate(${f2(rx)} ${f2(ry)})`);const L=m*260;mr.setAttribute('d',wavy(1060,600,1060-Math.max(L,4)*.8,600-Math.max(L,4)*.6,8,3));mr.setAttribute('opacity',m>0?1:0);
      cap.textContent=u<.3?T({uz:'Yog‘da eriydigan gormon membranadan o‘tadi',en:'Lipid-soluble hormone crosses the membrane',ru:'Гормон проходит через мембрану'}):u<.42?T({uz:'Ichki retseptorga bog‘lanadi',en:'Binds an intracellular receptor',ru:'Связывается с рецептором'}):u<.68?T({uz:'Kompleks yadroga kiradi',en:'Complex enters the nucleus',ru:'Комплекс входит в ядро'}):T({uz:'Gen faollashadi → iRNK',en:'Gene switched on → mRNA',ru:'Ген активирован → иРНК'})}}}
  // gpcr: 7 transmembrane helices + heterotrimeric G protein (α, βγ)
  const hel=el('g',{},g);for(let q=0;q<7;q++){const x=560+q*44;el('rect',{x:x-17,y:yc-80,width:34,height:160,rx:16,fill:vol('#5C6BC0'),stroke:dark('#5C6BC0'),'stroke-width':2},hel);if(q<6)el('path',{d:q%2?`M${x},${yc+80} Q${x+22},${yc+120} ${x+44},${yc+80}`:`M${x},${yc-80} Q${x+22},${yc-120} ${x+44},${yc-80}`,fill:'none',stroke:'#7986CB','stroke-width':6},hel)}
  const L=lig();const ga=el('g',{},g);el('ellipse',{rx:50,ry:36,fill:vol('#EF5350'),stroke:dark('#EF5350'),'stroke-width':2},ga);txt(ga,'α',0,9,{size:28,color:'#fff'});const gb=el('g',{},g);el('ellipse',{rx:44,ry:30,fill:vol('#FFA726'),stroke:dark('#FFA726'),'stroke-width':2},gb);txt(gb,'βγ',0,9,{size:24,color:'#fff'});
  const gd=el('g',{},g);const gt=el('text',{'text-anchor':'middle','font-size':22,'font-weight':800,'font-family':FONT,fill:'#fff'},gd);
  const eff=el('path',{d:blob(1150,yc+40,70,110,{seed:4}),fill:vol('#66BB6A'),stroke:dark('#66BB6A'),'stroke-width':3},g);const cam=[...Array(10)].map(()=>el('circle',{r:9,fill:'#4FC3F7'},g));
  Object.assign(A,{receptor:{el:hel,fx:.15,fy:.1},gprotein:ga,effector:eff,ligand:L,messenger:cam[3]});
  return {anchors:A,update(lt,p,st){const u=cyc(lt,st,TT,.3);const lq=E.outCubic(prog(u,0,.2)),sp=E.inOutCubic(prog(u,.28,.45)),mv2=E.inOutCubic(prog(u,.45,.65)),cm=prog(u,.65,1);
    L.setAttribute('transform',`translate(${f2(lerp(400,692,lq))} ${f2(lerp(40,yc-110,lq))}) rotate(${f2(lt*40)})`);
    ga.setAttribute('transform',`translate(${f2(lerp(lerp(760,840,sp),1080,mv2))} ${f2(yc+125)})`);gb.setAttribute('transform',`translate(${f2(lerp(840,780,sp))} ${f2(yc+125+sp*10)})`);
    gt.textContent=sp>.5?'GTF':'GDF';gd.setAttribute('transform',`translate(${f2(lerp(lerp(760,840,sp),1080,mv2))} ${f2(yc+180)})`);
    cam.forEach((c,i)=>{const q=clamp(cm*1.4-seeded(i,1)*.4);at(c,{cx:f2(1150+Math.cos(i*2.4)*q*260),cy:f2(yc+160+Math.abs(Math.sin(i*1.7))*q*300),opacity:f2(q>0?1-prog(u,.95,1):0)})});
    cap.textContent=u<.28?T({uz:'1. Signal retseptorga bog‘lanadi',en:'1. Ligand binds the receptor',ru:'1. Лиганд связывается'}):u<.45?T({uz:'2. G-oqsil: GDF → GTF almashadi',en:'2. G protein swaps GDP → GTP',ru:'2. G-белок: ГДФ → ГТФ'}):u<.65?T({uz:'3. α-subbirlik effektorni yoqadi',en:'3. α subunit activates the effector',ru:'3. α-субъединица активирует эффектор'}):T({uz:'4. Ikkilamchi vositachi (sAMF) ko‘payadi',en:'4. Second messenger (cAMP) multiplies',ru:'4. Вторичный посредник (цАМФ)'})}}});
/* ---------- SIGNALLING distance types: all | endocrine | paracrine | autocrine | juxtacrine | synaptic (panel 400 wide, view crops) ---------- */
SM.items.signalway=preset(2000,760,(g,it)=>{const k=it.kind||'all';const kinds=k==='all'?['endocrine','paracrine','autocrine','juxtacrine','synaptic']:[k];const W=400,A={};const ups=[];
  const NM={endocrine:{uz:'Endokrin (qon orqali, uzoqqa)',en:'Endocrine (via blood, far)',ru:'Эндокринная'},paracrine:{uz:'Parakrin (qo‘shnilarga)',en:'Paracrine (to neighbours)',ru:'Паракринная'},autocrine:{uz:'Autokrin (o‘ziga)',en:'Autocrine (to itself)',ru:'Аутокринная'},juxtacrine:{uz:'Kontakt (tegib turib)',en:'Juxtacrine (contact)',ru:'Юкстакринная'},synaptic:{uz:'Sinaptik (neyron)',en:'Synaptic (neuron)',ru:'Синаптическая'}};
  const cell=(pg,x,y,r,c,seed)=>{const e=el('g',{},pg);el('path',{d:blob(x,y,r,r*.85,{seed,amp:.07}),fill:vol(c,{hi:.5}),'fill-opacity':.9,stroke:dark(c),'stroke-width':3},e);el('circle',{cx:x+r*.15,cy:y,r:r*.3,fill:vol('#7E57C2'),opacity:.9},e);return e};
  const rec=(pg,x,y,ang)=>{const e=el('path',{d:'M-9,0 L-9,-10 Q0,-22 9,-10 L9,0',fill:'none',stroke:'#FFF59D','stroke-width':4,transform:`translate(${x} ${y}) rotate(${ang})`},pg);return e};
  kinds.forEach((kd,i)=>{const ox=i*W,pg=el('g',{},g);const cx=ox+W/2;txt(pg,T(NM[kd]),cx,725,{size:24,color:'ink',weight:700});const dots=[];let route;
    if(i)el('line',{x1:ox,y1:80,x2:ox,y2:690,stroke:TH.dim,'stroke-width':2,'stroke-dasharray':'6 8',opacity:.4},pg);
    const mk=n=>{for(let q=0;q<n;q++)dots.push(el('circle',{r:8,fill:vol('#FFB300'),stroke:'#E65100','stroke-width':1.5},pg))};
    if(kd==='endocrine'){const gl=cell(pg,cx-90,150,58,'#F06292',1);const bv=el('path',{d:`M${ox+20},330 C${cx-40},290 ${cx+40},470 ${ox+W-20},430`,fill:'none',stroke:NAT.blood,'stroke-width':52,'stroke-opacity':.55,'stroke-linecap':'round'},pg);
      const tg=cell(pg,cx+90,590,58,'#4DB6AC',2);rec(pg,cx+70,535,-15);rec(pg,cx+110,535,15);
      const P=[[cx-90,200],[cx-60,320],[cx,385],[cx+60,420],[cx+90,530]];route=q=>{const t=q*(P.length-1),j=Math.min(P.length-2,Math.floor(t));return lerpPt(P[j],P[j+1],t-j)};mk(8);A.gland=gl;A.blood={el:bv,fx:.15,fy:.3};A.targetE=tg;A.signal=dots[2]}
    if(kd==='paracrine'){const sc=cell(pg,cx-110,380,58,'#F06292',3);const TG=[[cx+90,200],[cx+110,380],[cx+90,560]];let nb;TG.forEach(([x,y],q)=>{const c=cell(pg,x,y,50,'#4DB6AC',4+q);rec(pg,x-52,y,-90);if(q===1)nb=c});
      route=(q,j)=>{const T2=TG[j%3];return lerpPt([cx-55,380],[T2[0]-50,T2[1]],q)};mk(9);A.neighbor=nb}
    if(kd==='autocrine'){const c=cell(pg,cx,390,95,'#9575CD',6);for(let q=0;q<8;q++){const a=q/8*TAU;rec(pg,cx+Math.cos(a)*95,390+Math.sin(a)*81,a*180/Math.PI+90)}
      route=(q,j)=>{const a=j/8*TAU+.2;const r=95+70*Math.sin(q*Math.PI);return [cx+Math.cos(a)*r,390+Math.sin(a)*r*.85]};mk(8);A.selfcell={el:c,fx:.5,fy:.15}}
    if(kd==='juxtacrine'){const c1=cell(pg,cx-82,390,85,'#F06292',7),c2=cell(pg,cx+82,390,85,'#4DB6AC',8);const ct=el('g',{},pg);let lg0,rc0;
      for(let q=0;q<4;q++){const y=335+q*36;const lg=el('g',{},ct);el('line',{x1:cx-12,y1:y,x2:cx-2,y2:y,stroke:'#FFB300','stroke-width':4},lg);el('circle',{cx:cx,cy:y,r:7,fill:'#FFB300'},lg);const r=rec(ct,cx+12,y,-90);if(!q){lg0=lg;rc0=r}}
      ups.push(lt=>ct.setAttribute('opacity',f2(.6+.4*Math.sin(lt*3))));A.contact=lg0;A.receptorJ=rc0}
    if(kd==='synaptic'){const ax=el('path',{d:`M${ox+40},180 L${cx-20},180 C${cx+20},180 ${cx+30},240 ${cx+30},300`,fill:'none',stroke:NAT.nerve,'stroke-width':18},pg);const so=el('circle',{cx:ox+50,cy:180,r:38,fill:vol(NAT.nerve)},pg);
      el('path',{d:`M${cx-40},300 Q${cx+30},280 ${cx+100},300 L${cx+100},350 L${cx-40},350 Z`,fill:vol(NAT.nerve)},pg);const ves=el('circle',{cx:cx+30,cy:325,r:10,fill:'none',stroke:'#fff','stroke-width':2},pg);
      const tg=el('rect',{x:cx-80,y:410,width:220,height:210,rx:40,fill:vol('#E57373'),stroke:dark('#E57373'),'stroke-width':3},pg);for(let q=0;q<5;q++)rec(pg,cx-20+q*28,412,0);
      route=(q,j)=>[cx-20+j*13,lerp(352,405,q)];mk(9);A.neuron=so;A.targetS=tg;A.nmt=dots[4]}
    if(route)ups.push(lt=>dots.forEach((d,j)=>{const q=((lt*.35+j/dots.length)%1);const [x,y]=route(q,j);at(d,{cx:f2(x),cy:f2(y),opacity:f2(Math.sin(q*Math.PI))})}))});
  return {anchors:A,view:[0,0,W*kinds.length,760],sideAt:2,update(lt){ups.forEach(f=>f(lt))}}});
KIT.bind();
})();
