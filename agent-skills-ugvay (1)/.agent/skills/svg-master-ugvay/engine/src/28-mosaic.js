/* ================= v2.7 STAGE 0 — MOSAIC: knowledge graph · shared parameters · recipes · academic style =================
   SM.graph.node(type)      → {type, shelf, in:[ports], out:[ports], part:[types], tags:[uz keywords]}
   SM.graph.links(type)     → [{to, via:'port'|'part', dir:'out'|'in'}]   (automatic: A.out ∩ B.in, plus part-of)
   SM.graph.path(a,b)       → shortest chain of types between two items (BFS)
   SM.recipe(text,{level,style,max}) → LESSON config assembled from the graph (cause → mechanism → effect → treatment)
   SM.lesson(text,opts)     → LESSON(SM.recipe(text,opts))
   SM.param(name,it)        → shared scene parameter (T °C, pH, C mM, P kPa, O2 kPa, CO2 kPa, dose mg, t h) — item.params > scene.params > lesson.params > default
   style:'academic' (lesson key) → muted 'academic' theme, no dust/music, calm transitions, playful items hidden (mascot, emoji, explosion, sparks, glowOrb)
   level:'school'|'university' (lesson / scene / item key) → school: ≤5 core labels, fact panels (class "uni") hidden */
SM.PDEF={T:37,pH:7.4,C:1,P:101.3,O2:13.3,CO2:5.3,dose:1,t:0};
SM.param=(k,it)=>{const o=it&&it.params;if(o&&o[k]!=null)return o[k];const P=SM._P||SM.PDEF;return P[k]!=null?P[k]:SM.PDEF[k]};
SM.ACAD_SKIP=new Set(['mascot','emoji','explosion','sparks','glowOrb']);
(()=>{
// type : in > out : part-of : uz tags      (ports: short English ids; tags: Uzbek search words/stems)
const D=`
cell:glc,O2,aa>CO2,protein,ATP::hujayra
nucleus:>mRNA,DNA:cell:yadro,genom
mitochondrion:glc,O2,cyanide>ATP,CO2,ROS:cell:mitoxondriya,energiya,nafas
chloroplast:light,CO2,H2O>glc,O2:cell:xloroplast,fotosintez
photosynthesis:light,CO2,H2O>glc,O2:chloroplast:fotosintez,o'simlik,barg,yorug'lik:mitochondrion
membrane:ion,glc>ion,signal:cell:membrana,lipid
transport:ion,glc,aa,H2O>ion,glc:membrane:transport,nasos,kanal,diffuziya,osmos
mitosis:DNA>cell:cell:mitoz,bo'linish
signal:hormone,ligand>signal:cell:signal,retseptor
synapse:signal,ion>signal,neurotransmitter:neuron:sinaps,mediator,asetilxolin
neuron:signal,ion,glc,O2>signal:brain:neyron,nerv,impuls
dna:>DNA:nucleus:dnk,gen
dna3d:>DNA:nucleus:dnk,spiral
enzyme:substrate>product:protein:ferment,enzim,katalizator
replication:DNA>DNA:nucleus:replikatsiya
transcription:DNA>mRNA:nucleus:transkripsiya,rnk
translation:mRNA,aa>protein:cell:translyatsiya,ribosoma,oqsil sintezi
protein:aa>protein::oqsil,protein
hemoglobin:O2,CO,CO2>O2:rbc:gemoglobin,kislorod,qon
aminoacid:>aa:protein:aminokislota,peptid
receptor:ligand,hormone,drug>signal:membrane:retseptor,agonist
signalway:signal,hormone>signal:cell:signal yo'li,kaskad
tissue:cell>tissue::to'qima,gistologiya
celltype:>cell::hujayra turlari
cellgallery:>cell::hujayralar
epithelium:cell>barrier:tissue:epiteliy
skin:heat,radiation,toxin>barrier,heat::teri,kuyish
hair:>barrier:skin:soch
sarcomere:ATP,Ca>force:muscle:sarkomer,qisqarish
musclezoom:ATP>force:muscle:muskul,tola
muscle:ATP,signal,glc,O2>force,heat,CO2,lactate::muskul,mushak
walker:force>motion:skeleton:yurish
skeleton:force,Ca>support::skelet,suyak
armlever:force>motion:skeleton:richag,qo'l
heart:blood,signal>blood::yurak,qon aylanish
vessel:blood>blood,fluid::qon tomir,arteriya,vena
lungs:O2,air,smoke>O2,CO2::o'pka,nafas
alveolus:O2,CO2>O2,CO2:lungs:alveola,gaz almashinuvi
brain:O2,glc,signal>signal::miya,bosh miya
digestive:food>nutrients,glc,aa,lipid::hazm,ovqat
kidney:blood,toxin,drug>urine,H2O::buyrak,siydik
nephron:blood>urine,ion,H2O:kidney:nefron,filtratsiya
eye:light>signal::ko'z,ko'rish
rbc:O2,CO2>O2,CO2:vessel:eritrotsit,qon
wbc:pathogen>immune:vessel:leykotsit,oq qon
egg:sperm>zygote::tuxum hujayra
sperm:>sperm::spermatozoid
virus:cell>virus,pathogen::virus
virion:>virus::virion
phagecycle:bacteria>virus::bakteriofag
bacteria:nutrients>pathogen,toxin::bakteriya,mikrob
bactshapes:>bacteria::bakteriya shakli
fission:nutrients>bacteria:bacteria:bo'linish,ko'payish
antibody:pathogen,antigen>immune:wbc:antitelo,immunoglobulin
phagocytosis:pathogen>immune:wbc:fagotsitoz,makrofag
cellinjury:toxin,injury,O2,ROS,radiation>necrosis,inflammation::hujayra shikastlanishi,nekroz:inflammation
atherosclerosis:lipid,blood>plaque,thrombus:vessel:ateroskleroz,xolesterin:thrombosis
inflammation:pathogen,necrosis,toxin>immune,fluid::yallig'lanish:healing
neoplasia:DNA,radiation,smoke>tumor::o'sma,saraton
ear:sound>signal::quloq,eshitish
liver:blood,toxin,drug,alcohol>bile,glc,protein::jigar
islet:glc>insulin,hormone:digestive:insulin,qand,diabet:signal
retina:light>signal:eye:to'r parda
stomach:food,acid>chyme,acid:digestive:oshqozon,me'da
villus:chyme,glc,aa,lipid>nutrients,glc,aa:digestive:ichak,so'rilish
cardio:signal,ion>signal,blood:heart:ekg,ritm,yurak
osteon:Ca>support:skeleton:osteon,suyak
chemosense:odor,taste>signal::hid,ta'm
hemostasis:blood,injury>thrombus:vessel:qon ivishi,gemostaz,koagulyatsiya:thrombosis
thrombosis:blood,plaque>thrombus,infarct:vessel:tromb,infarkt,tela:heart
healing:injury,inflammation>tissue::yara,bitish,sinish
adaptation:stress>tissue::adaptatsiya,atrofiya,gipertrofiya,metaplaziya
edema:fluid,blood>fluid:vessel:shish,edema
metastasis:tumor>tumor:neoplasia:metastaz
apoptosis:DNA,ROS,signal>death:cell:apoptoz,kaspaza,autofagiya
stroke:thrombus,blood>infarct,signal:brain:insult:neuron,cellinjury
toxin:toxin>CO,cyanide,injury,death::zahar,toksin,is gazi,sianid,fos,botulin,qo'rg'oshin:hemoglobin,mitochondrion,synapse
livertox:drug,alcohol>toxin,necrosis:liver:paratsetamol,alkogol,spirt:cellinjury
burn:acid,alkali,heat>necrosis:skin:kuyish,kislota,ishqor:healing
radical:O2,radiation>ROS:mitochondrion:erkin radikal,oksidlanish:cellinjury
radiation:radiation>DNA,ROS::nurlanish,radiatsiya:dna,neoplasia
caries:acid,sugar>lesion::tish,kariyes:inflammation
smoking:smoke>CO,toxin,tumor:lungs:chekish,sigaret,nikotin:alveolus,neoplasia
metals:metal>toxin:kidney:og'ir metall,simob,mishyak,kadmiy:kidney
hpylori:pathogen,acid>ulcer,inflammation:stomach:helikobakter,yara,gastrit:inflammation
tuberculosis:pathogen,air>inflammation:lungs:sil,tuberkulyoz:phagocytosis
cholera:pathogen,toxin>fluid,ion:villus:vabo,diareya,ich ketish,suvsizlanish:transport,kidney
pyogenic:pathogen>inflammation,toxin:skin:stafilokokk,streptokokk,yiring,absess:phagocytosis,inflammation
hepatitis:virus>inflammation:liver:gepatit,sariq:inflammation
sarscov2:virus,air>inflammation:lungs:koronavirus,covid:alveolus,antibody
candida:pathogen>inflammation:epithelium:kandida,zamburug':inflammation
helminth:pathogen,food>inflammation:digestive:gijja,parazit,askarida:wbc
microbiota:food,drug>nutrients,pathogen:digestive:mikrobiota,ichak bakteriyalari:resistance
resistance:drug,bacteria>bacteria:bacteria:antibiotik,chidamlilik:bacteria
lymphocyte:antigen,pathogen>antibody,immune:wbc:limfotsit,B hujayra,T hujayra,immunitet,MHC:antibody
vaccine:antigen>antibody,immune:lymphocyte:vaksina,emlash,jamoa immuniteti,revaksinatsiya:lymphocyte,antibody
allergy:antigen>histamine,inflammation:wbc:allergiya,anafilaksiya,IgE,gistamin,astma:inflammation
autoimmune:antigen>inflammation,necrosis:lymphocyte:autoimmun,1-tip diabet,bazedov,graves,miasteniya:lymphocyte
transplant:antigen>inflammation:lymphocyte:transplantatsiya,ko'chirib o'tkazish,HLA,rad etish:lymphocyte,kidney
adme:drug>drug,urine:liver:farmakokinetika,so'rilish,metabolizm,dori,biologik mavjudlik:kidney
agonist:drug,ligand>signal:receptor:agonist,antagonist,dori ta'siri,farmakodinamika:receptor
ode:>::differensial tenglama,model,epidemiya,yirtqich,populyatsiya,yemirilish,harakat potensiali,doza
nucleic:DNA>mRNA,protein:nucleus:DNK,mutatsiya,PZR,PCR,restriksiya,qo'sh spiral:nucleus
vsepr:>::molekula shakli,VSEPR,geometriya
econfig:>::elektron konfiguratsiya,orbital,Hund
balance:>::tenglama tenglash,kimyoviy reaksiya,stexiometriya
crystal:>::kristall panjara,kristall,qadoqlanish
superpose:wave>wave::interferensiya,tepkilar,turg'un to'lqin,superpozitsiya:wave
pedigree:DNA>::shajara,irsiyat,nasl,genetik kasallik
section:blood>::qon surtmasi,leykoformula,mikroskop:wbc
assembly:protein>::aktin,mikronaycha,kollagen,kapsid,oqsil yig'ilishi
reflex:signal,force>signal,motion:neuron:refleks,reflektor yoy,tizza refleksi,orqa miya:synapse
circulation:blood,O2>blood,O2:heart:qon aylanish,qon bosimi,yurak urish hajmi,gemodinamika:vessel
endocrine:hormone,glc,signal>hormone,insulin,glc::gormon,teskari aloqa,qalqonsimon bez,kortizol,glyukoza,endokrin:islet
breathing:air,O2>O2,CO2:lungs:nafas,nafas olish,spirogramma,o'pka hajmlari:alveolus
autonomic:signal,stress>signal,hormone:neuron:vegetativ,simpatik,parasimpatik,avtonom nerv:heart
thermoreg:heat,signal>heat::termoregulyatsiya,isitma,harorat,gipotermiya,issiq urishi:skin
acidbase:CO2,acid,alkali>acid,CO2:kidney:kislota-ishqor,ph,atsidoz,alkaloz,bikarbonat:lungs
meiosis:DNA>sperm,cell:cell:meyoz,krossingover,gameta,reduksion bo'linish:mitosis
respiration:glc,O2>ATP,CO2,H2O:mitochondrion:hujayra nafasi,glikoliz,krebs,elektron tashish,atf sintaza:cell
cellcycle:DNA,signal>cell,DNA:cell:hujayra sikli,p53,nazorat nuqtasi,siklin:mitosis
dnarepair:DNA,radiation,ROS>DNA:nucleus:dnk reparatsiyasi,reparatsiya,mutatsiya tuzatish:dna
sorting:protein,mRNA>protein:cell:oqsil sortirovkasi,golji,endoplazmatik to'r,vezikula:translation
cytoskeleton:protein,ATP>force,motion:cell:sitoskelet,kinezin,dinein,mikrotubula:assembly
junctions:protein>barrier:epithelium:hujayra birikmalari,zich birikma,desmosoma,tirqishli birikma:tissue
metabolism:glc,lipid,aa,insulin>ATP,glc:liver:metabolizm,atf,och qolish,to'yinish,glikogen:respiration
karyotype:DNA>trait:nucleus:kariotip,daun sindromi,xromosoma,trisomiya,terner,klaynfelter:pedigree
operon:DNA,signal>mRNA,protein:nucleus:operon,lac operon,gen regulyatsiyasi,epigenetika,metillanish:transcription
hardy:trait>trait::xardi-vaynberg,allel chastotasi,dreyf,populyatsiya genetikasi:punnett
selection:trait>trait::tabiiy tanlanish,tanlanish,moslanuvchanlik,evolyutsiya:evotree
hominin:trait>::odam evolyutsiyasi,gominid,antropogenez,avstralopitek:evotree
plantsection:H2O,sugar>H2O,sugar::ildiz kesimi,poya kesimi,barg kesimi,o'simlik anatomiyasi,ksilema,floema:photosynthesis
transpiration:H2O,heat>H2O::transpiratsiya,suv potensiali,og'izcha,kogeziya:plantsection
flower:sperm>zygote::gul,changlanish,urug'lanish,qo'sh urug'lanish:altgen
altgen:zygote>sperm::nasllar gallanishi,sporofit,gametofit,mox,qirqquloq:meiosis
planthormone:light,signal>motion,signal::o'simlik gormonlari,auksin,fototropizm,gibberellin:plantsection
nitrogen:bacteria,air>nutrients,protein::azot fiksatsiyasi,azot aylanishi,tuganak,rizobium,nitrifikatsiya:microbiota
taxonomy:>::sistematika
evotree:>::evolyutsiya
animal:>::hayvon
atom:>electron::atom
molecule:atom>molecule::molekula
mol3d:atom>molecule::molekula 3d
lattice:atom>solid::kristall,panjara
reaction:molecule>molecule,heat::reaksiya
periodic:>atom::davriy jadval,element
orbital:electron>electron:atom:orbital
punnett:DNA>trait::genetika,punnet,irsiyat
induction:magnet,motion>current::induksiya,generator
pendulum:gravity>motion::mayatnik
spring:force>motion::prujina
projectile:force,gravity>motion::otilgan jism
collision:motion>motion::to'qnashuv,impuls
incline:gravity,force>motion::qiya tekislik
orbit:gravity>motion::orbita
field:charge>force::elektr maydon
circuit:current>current,heat::elektr zanjiri,tok
shock:sound,motion>wave::tovush to'sig'i
spacetime:gravity>::fazo-vaqt
wave:energy>wave::to'lqin
refraction:light>light::sinish
lens:light>image::linza
prism:light>light::prizma,dispersiya
spectrum:light,radiation>::spektr
raydiagram:light>image::nur chizmasi
wavecompare:wave>::to'lqinlar
material:heat,force>::material
statesofmatter:heat>heat::agregat holat,erish,qaynash
solid:>::3d jism
planet:gravity>::sayyora
exoplanet:light>::ekzosayyora
starlife:gravity>light,radiation::yulduz
atommodel:>atom::atom modeli
decay:atom>radiation::radioaktiv,yemirilish
solar3d:gravity>light::quyosh tizimi
globe:>::globus
axes3d:>::o'qlar
earthlayers:heat>heat::yer qobig'i,mantiya
plates:heat>motion::plita,tektonika
volcano:heat>gas::vulqon
earthquake:motion>wave::zilzila
thunderstorm:charge>current,light::chaqmoq,momaqaldiroq
watercycle:heat,H2O>H2O::suv aylanishi
seasons:light>heat::fasl
moonphases:light>::oy fazasi
eclipse:light>::tutilish
solarsystem:gravity>::quyosh tizimi
atmosphere:light,radiation>heat::atmosfera,ozon
`;
const N={},PART={};
D.trim().split('\n').forEach(l=>{const [t,io,pt,tg,see]=l.split(':');const [a,b]=io.split('>');N[t]={type:t,in:a?a.split(','):[],out:b?b.split(','):[],part:pt?pt.split(','):[],tags:tg?tg.split(','):[],see:see?see.split(','):[]}});
const shelfOf=t=>{const s=(SM.catalog||[]).find(s=>s.items.some(i=>i.type===t));return s?s.id:null};
Object.values(N).forEach(n=>{n.shelf=shelfOf(n.type);n.part.forEach(p=>{(PART[p]=PART[p]||[]).push(n.type)})});
const links=t=>{const n=N[t];if(!n)return [];const L=[];Object.values(N).forEach(m=>{if(m===n)return;n.out.forEach(p=>{if(m.in.includes(p))L.push({to:m.type,via:p,dir:'out'})});n.in.forEach(p=>{if(m.out.includes(p))L.push({to:m.type,via:p,dir:'in'})})});
  n.part.forEach(p=>N[p]&&L.push({to:p,via:'part',dir:'up'}));(PART[t]||[]).forEach(c=>L.push({to:c,via:'part',dir:'down'}));return L};
const GENERIC=new Set(['signal','cell','blood','heat','motion','force','light','molecule','atom','energy','wave','tissue','fluid','immune','inflammation']);
const adj=t=>{const s=new Map();links(t).forEach(l=>{const w=l.via==='part'?1:GENERIC.has(l.via)?3:1.5;if(!s.has(l.to)||s.get(l.to)>w)s.set(l.to,w)});return s};
const path=(a,b)=>{if(!N[a]||!N[b])return null;const dist={[a]:0},prev={};const Q=[a];const done=new Set();while(Q.length){Q.sort((x,y)=>dist[x]-dist[y]);const u=Q.shift();if(done.has(u))continue;done.add(u);if(u===b)break;adj(u).forEach((w,v)=>{const d=dist[u]+w;if(dist[v]==null||d<dist[v]){dist[v]=d;prev[v]=u;Q.push(v)}})}
  if(dist[b]==null)return null;const P=[b];while(P[0]!==a)P.unshift(prev[P[0]]);return P};
SM.graph={nodes:N,node:t=>N[t]||null,links,path,parts:t=>PART[t]||[],
  check(){return Object.keys(SM.items).filter(t=>!N[t]&&!['text','formula','shape','arrow','label','pulse','svg','image','titleCard','summary','quiz','scenery','mascot','chart','barchart','pie','timeline','flow','mindmap','compare','number','emoji','fire','smoke','water','rain','snow','bubbles','sparks','lightning','rays','explosion','glowOrb','magnifier','spotlight'].includes(t)&&!/^(ode|assembly|nucleic|vsepr|econfig|balance|crystal|superpose|pedigree|section)$/.test(t)&&!SM.graph.extra[t])},extra:{}};
SM.graph.add=(t,o)=>{N[t]={type:t,in:o.in||[],out:o.out||[],part:o.part||[],tags:o.tags||[],shelf:shelfOf(t)};(o.part||[]).forEach(p=>{(PART[p]=PART[p]||[]).push(t)});SM.graph.extra[t]=1};
// ---- recipes: text → seeds (tags/catalog) → chain through the graph → LESSON
const norm=s=>String(s).toLowerCase().replace(/[‘’ʻʼ`]/g,"'").replace(/[^a-z0-9'а-яё\s-]/g,' ');
const PHR=()=>{const P=new Set();Object.values(N).forEach(n=>n.tags.forEach(t=>{if(t.includes(' '))P.add(t)}));return [...P]};
const pre=(a,b)=>{let i=0;while(i<a.length&&i<b.length&&a[i]===b[i])i++;return i};
const wm=(w,tg)=>w===tg||(tg.length>=4&&w.startsWith(tg))||(w.length>=5&&tg.startsWith(w))||(pre(w,tg)>=Math.max(5,tg.length-1));
const score=(t,words,txt)=>{const n=N[t];if(!n)return 0;const cat=(SM.list?SM.list():[]).find(i=>i.type===t);let s=0;const T=' '+txt+' ';
  const used=new Set();PHR().forEach(ph=>{if(T.includes(' '+ph))ph.split(' ').forEach(w=>words.forEach(x=>{if(wm(x,w))used.add(x)}))});
  n.tags.forEach(tg=>{if(tg.includes(' ')){if(T.includes(' '+tg))s+=4+tg.split(' ').length}else words.forEach(w=>{if(w.length<3||used.has(w))return;if(w===tg)s+=4;else if(wm(w,tg))s+=2})});
  if(words.includes(t))s+=4;return s};
const kindFor=(t,words)=>{const c=(SM.list?SM.list():[]).find(i=>i.type===t);if(!c||!c.kinds.length)return undefined;const k=c.kinds.find(k=>words.some(w=>w.length>=2&&(k===w||k.startsWith(w.slice(0,5))&&w.length>=4)));return k||c.kinds[0]};
const KTAG={co:['is','gazi','co'],cyanide:['sianid'],organophosphate:['fos','pestitsid'],botulinum:['botulin','botulizm'],lead:["qo'rg'oshin"],paracetamol:['paratsetamol'],alcohol:['alkogol','spirt'],ischemic:['ishemik'],hemorrhagic:['gemorragik','qon quyilish'],mercury:['simob'],arsenic:['mishyak'],cadmium:['kadmiy'],ascaris:['askarida'],tapeworm:['tasma','tenioz'],staph:['stafilokokk'],strep:['streptokokk'],antibiotic:['antibiotik'],sir:['epidemiya','sir'],pk:['doza','farmakokinetik'],hh:['harakat potensiali','hodgkin'],michaelis:['mixaelis','fermant kinetika'],predator:['yirtqich'],logistic:['populyatsiya'],decay:['radioaktiv','yemirilish'],t1d:['diabet'],graves:['bazedov','graves','tireo'],myasthenia:['miasteniya'],bcell:['b hujayra','antitelo'],tcell:['t hujayra','sitotoksik'],competitive:['raqobatli'],partial:['qisman'],inverse:['teskari'],pcr:['pzr','pcr'],mutation:['mutatsiya'],restriction:['restriksiya'],standing:["turg'un"],beats:['tepki'],down:['daun'],turner:['terner'],klinefelter:['klaynfelter'],edwards:['edvards'],patau:['patau'],fever:['isitma'],withdrawal:['og\'riq refleksi','chekinish'],stretch:['tizza'],sympathetic:['simpatik'],parasympathetic:['parasimpatik'],racid:['respirator atsidoz'],macid:['metabolik atsidoz'],dsb:['qo\'sh zanjir uzilishi'],lac:['lac'],epigenetics:['epigenetika','metillanish'],drift:['dreyf'],fertilization:['urug\'lanish'],phototropism:['fototropizm'],nodule:['tuganak'],cycle:['azot aylanishi'],fasting:['och qolish'],fed:['to\'yinish'],damage:['p53'],motors:['kinezin','dinein'],etc:['elektron tashish']};
const kindFor2=(t,words,txt)=>{const c=(SM.list?SM.list():[]).find(i=>i.type===t);if(!c||!c.kinds.length)return undefined;const hit=c.kinds.find(k=>(KTAG[k]||[]).some(w=>txt.includes(w)));return hit||kindFor(t,words)};
SM.recipe=(text,o={})=>{const txt=norm(text);const words=txt.split(/\s+/).filter(Boolean);const max=o.max||6;
  const S=Object.keys(N).filter(t=>SM.items[t]).map(t=>[t,score(t,words,txt)]).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]);
  let seeds=S.slice(0,Math.min(max,S.length)).filter((x,i,a)=>x[1]>=Math.max(2,a[0][1]*.34)).map(x=>x[0]);if(!seeds.length)return {error:'no match',title:text,scenes:[]};
  // order: follow graph (nearest-neighbour), insert ≤1 bridge node between distant seeds
  const order=[seeds[0]];const rest=seeds.slice(1);while(rest.length){const last=order[order.length-1];let best=null,bp=null;rest.forEach(r=>{const p=path(last,r)||path(r,last);const L=p?p.length:99;if(!best||L<bp.length){best=r;bp=p||[last,r]}});rest.splice(rest.indexOf(best),1);
    if(bp&&bp.length===3&&!order.includes(bp[1])&&order.length+rest.length<max+2)order.push(bp[1]);order.push(best)}
  // context: short chains get the organ they belong to (part-of) and the most specific downstream effect
  if(order.length<4){const ex=[];order.forEach(t=>{(N[t].part||[]).forEach(p=>{if(SM.items[p]&&!order.includes(p)&&!ex.includes(p))ex.push(p)})});
    const last=order[order.length-1];const kd=kindFor2(last,words,txt);const KS={co:'hemoglobin',cyanide:'mitochondrion',organophosphate:'synapse',botulinum:'synapse',lead:'hemoglobin',paracetamol:'cellinjury',alcohol:'cellinjury'};const sees=(KS[kd]?[KS[kd]]:(N[last].see||[])).filter(x=>SM.items[x]&&!order.includes(x));if(sees.length)ex.push(...sees.slice(0,2));const L=sees.length?[]:links(last).filter(l=>l.dir==='out'&&!GENERIC.has(l.via)&&SM.items[l.to]&&!order.includes(l.to)&&!ex.includes(l.to));if(L.length)ex.push(L[0].to);
    ex.slice(0,4-order.length+1).forEach(x=>{const pi=order.findIndex(t=>(N[t].part||[]).includes(x));if(pi>=0)order.splice(pi,0,x);else order.push(x)})}
  for(let k=0;k<6;k++)order.forEach((t,i)=>{(N[t].part||[]).forEach(p=>{const j=order.indexOf(p);if(j>i){order.splice(j,1);order.splice(i,0,p)}})});
  const chain=[...new Set(order)];const cat=t=>(SM.list().find(i=>i.type===t)||{});
  const danger=t=>['tox','infect','med2'].includes((N[t]||{}).shelf);
  const scenes=[{kind:'title',title:o.title||text,subtitle:(o.level==='school'?'Maktab darajasi':'Akademik dars')+' · SVG Master'}];
  chain.forEach(t=>{const c=cat(t);const it={type:t,area:'full',labels:true};const k=kindFor2(t,words,txt);if(k)it.kind=k;if(danger(t)&&o.warn!==false)it.warn='Faqat ta’limiy sxema — davolash uchun shifokorga murojaat qiling';
    scenes.push({title:String(c.uz||t).split(/[:(;]/)[0].trim().slice(0,46),items:[it]})});
  const links2=[];for(let i=1;i<chain.length;i++){const L=links(chain[i-1]).find(l=>l.to===chain[i]);links2.push(String(cat(chain[i-1]).uz||chain[i-1]).split(/[:(;]/)[0].trim()+' → '+String(cat(chain[i]).uz||chain[i]).split(/[:(;]/)[0].trim()+(L&&L.via!=='part'?' ('+L.via+')':''))}
  scenes.push({kind:'end',title:'Xulosa',points:links2.slice(0,5)});
  return {title:o.title||text,style:o.style||'academic',level:o.level||'university',theme:o.theme,music:false,chain,scenes:scenes.map(s=>s.kind?s:{...s,dur:o.dur||14})}};
SM._score=(t,q)=>{const txt=norm(q);return score(t,txt.split(/\s+/).filter(Boolean),txt)};
SM.lesson=(text,o)=>LESSON(SM.recipe(text,o));
})();
