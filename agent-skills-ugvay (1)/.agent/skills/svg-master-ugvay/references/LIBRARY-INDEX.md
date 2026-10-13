# SVG MASTER v2.8 — KUTUBXONA INDEKSI (Library index)

Har bir element (item) javon (shelf) bo‘yicha. **v** ustuni: `old` = v1–v2.2 dan beri bor, `2.3` … `2.8` = shu versiyada qo‘shilgan (v2.8: 4 yangi javon — Fiziologiya, Hujayra va molekulyar biologiya II, Genetika va evolyutsiya, Botanika; 26 element).
Kodda: `SM.catalog`, `SM.list("infect")`, `SM.find("gijja")`, `SM.missing()` (bo‘sh massiv = hamma element javonda). `type`/`kind` identifikatorlari kod uchun inglizcha qoladi; ekranda ko‘rinadigan yozuvlar o‘zbekcha.

Umumiy kalitlar (hamma elementda): `analogy:true|"matn"` → ≈ O‘xshatish (model) belgisi · `warn:"matn"` → ⚠ ehtiyot chipi · `labels:true` · `area` · `at`.

| # | Javon | id | elementlar | v2.3 | v2.4 | v2.5 | v2.6 | v2.7 | v2.8 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Asos: matn, formula, shakl | `base` | 11 | 0 | 0 | 0 | 0 | 0 | 0 |
| 2 | Hujayra | `cell` | 11 | 0 | 1 | 0 | 0 | 1 | 0 |
| 3 | Molekulyar biologiya | `molbio` | 11 | 8 | 0 | 0 | 0 | 1 | 0 |
| 4 | Gistologiya (to‘qimalar) | `histo` | 9 | 7 | 0 | 0 | 0 | 0 | 0 |
| 5 | Anatomiya va fiziologiya | `anatomy` | 16 | 3 | 0 | 0 | 0 | 6 | 0 |
| 6 | Mikrobiologiya va immunologiya | `micro` | 8 | 6 | 0 | 0 | 0 | 0 | 0 |
| 7 | Patologiya | `patho` | 4 | 4 | 0 | 0 | 0 | 0 | 0 |
| 8 | Tibbiyot I: a’zolar tuzilishi | `med1` | 9 | 0 | 0 | 7 | 2 | 0 | 0 |
| 9 | Tibbiyot II: patologik jarayonlar | `med2` | 8 | 0 | 0 | 7 | 1 | 0 | 0 |
| 10 | Kimyoviy moddalar ta’siri | `tox` | 8 | 0 | 0 | 6 | 2 | 0 | 0 |
| 11 | Mikroorganizmlar ta’siri | `infect` | 10 | 0 | 0 | 0 | 10 | 0 | 0 |
| 12 | Ilmiy generatorlar (v2.7) | `gen` | 10 | 0 | 0 | 0 | 0 | 10 | 0 |
| 13 | Immunologiya va farmakologiya (v2.7) | `immuno` | 7 | 0 | 0 | 0 | 0 | 7 | 0 |
| 14 | Fiziologiya (v2.8) | `physio` | 7 | 0 | 0 | 0 | 0 | 0 | 7 |
| 15 | Hujayra va molekulyar biologiya II (v2.8) | `cellbio` | 8 | 0 | 0 | 0 | 0 | 0 | 8 |
| 16 | Genetika va evolyutsiya (v2.8) | `genetics` | 5 | 0 | 0 | 0 | 0 | 0 | 5 |
| 17 | Botanika (v2.8) | `botany` | 6 | 0 | 0 | 0 | 0 | 0 | 6 |
| 18 | Zoologiya va evolyutsiya | `zoo` | 3 | 3 | 0 | 0 | 0 | 0 | 0 |
| 19 | Kimyo va genetika | `chem` | 8 | 3 | 0 | 0 | 0 | 0 | 0 |
| 20 | Fizika (mexanika, elektr) | `physics` | 11 | 2 | 1 | 0 | 0 | 0 | 0 |
| 21 | Optika va to‘lqinlar | `optics` | 7 | 4 | 0 | 0 | 0 | 0 | 0 |
| 22 | Materiallar | `matter` | 3 | 1 | 1 | 0 | 0 | 0 | 0 |
| 23 | Kosmos va atom fizikasi | `space` | 8 | 5 | 0 | 0 | 0 | 0 | 0 |
| 24 | Yer haqidagi fanlar va astronomiya | `earth` | 11 | 0 | 11 | 0 | 0 | 0 | 0 |
| 25 | Fon va maskot | `scene` | 2 | 2 | 0 | 0 | 0 | 0 | 0 |
| 26 | Diagrammalar | `diagram` | 9 | 0 | 0 | 0 | 0 | 0 | 0 |
| 27 | Effektlar | `fx` | 11 | 0 | 0 | 0 | 0 | 0 | 0 |
| 28 | Kamera | `camera` | 2 | 0 | 0 | 0 | 0 | 0 | 0 |
| | **Jami** | | **223** |  |  |  |  |  |  |

## 1. Asos: matn, formula, shakl — Basics (`base`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `text` | old | Matn (typo animatsiya) | — |
| `formula` | old | LaTeX formula | — |
| `shape` | old | Shakl | `circle` `rect` `line` `...` |
| `arrow` | old | Strelka | — |
| `label` | old | Yorliq | — |
| `pulse` | old | Puls nuqta | — |
| `svg` | old | Xom SVG | — |
| `image` | old | Rasm + yorliqlar | — |
| `titleCard` | old | Sarlavha kartasi | — |
| `summary` | old | Xulosa | — |
| `quiz` | old | Test savol | — |

## 2. Hujayra — Cell biology (`cell`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `photosynthesis` | 2.4 | Fotosintez (yorug‘lik bosqichi + Kalvin sikli) | — |
| `cell` | old | Hujayra | `animal` `plant` |
| `nucleus` | old | Yadro | — |
| `mitochondrion` | old | Mitoxondriya | — |
| `chloroplast` | old | Xloroplast | — |
| `membrane` | old | Membrana | — |
| `transport` | 2.7 | Membrana transporti (v2.7: pump = Na⁺/K⁺-ATPaza 3Na/2K) | — |
| `mitosis` | old | Mitoz fazalari | — |
| `signal` | old | Hujayra signali | — |
| `synapse` | old | Sinaps | — |
| `neuron` | old | Neyron | — |

## 3. Molekulyar biologiya — Molecular biology (`molbio`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `dna` | old | DNK (2D) | — |
| `dna3d` | old | DNK (3D) | — |
| `enzyme` | 2.7 | Ferment (v2.7: induced fit, Ea diagramma, T/pH faollik) | — |
| `replication` | 2.3 | DNK replikatsiyasi (helikaza, polimeraza, Okazaki) | — |
| `transcription` | 2.3 | Transkripsiya DNK→mRNK | `sequence:"TACGGA…"` |
| `translation` | 2.3 | Translyatsiya (ribosoma, tRNK, haqiqiy genetik kod) | `codons:"AUG…"` |
| `protein` | 2.3 | Oqsil tuzilish darajalari | `all` `primary` `secondary` `tertiary` `quaternary` |
| `hemoglobin` | 2.3 | Gemoglobin 2α2β, 4 gem, O₂ kooperativ | — |
| `aminoacid` | 2.3 | Aminokislota / peptid bog‘ | `peptide` |
| `receptor` | 2.3 | Retseptorlar | `rtk` `ion` `nuclear` `gpcr` |
| `signalway` | 2.3 | Signal yo‘llari | `all` `endocrine` `paracrine` `autocrine` `juxtacrine` `synaptic` |

## 4. Gistologiya (to‘qimalar) — Histology (`histo`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `tissue` | 2.3 | To‘qima, H&E mikroskop ko‘rinishi | `squamous` `cuboidal` `columnar` `stratified` `ciliated` `loose` `dense` `adipose` `cartilage` `bone` `blood` `skeletal` `cardiac` `smooth` `nervous` |
| `celltype` | 2.3 | Hujayra turlari (16) | `neuron` `rbc` `neutrophil` `lymphocyte` `platelet` `skeletal` `smooth` `epithelial` `adipocyte` `osteocyte` `sperm` `egg` `fibroblast` `stem` `plant` `rod` |
| `cellgallery` | 2.3 | Hujayralar galereyasi | `cells:[…]` |
| `epithelium` | old | Epiteliy | — |
| `skin` | 2.3 | Teri qavatlari (“g‘oz terisi”) | — |
| `hair` | 2.3 | Soch follikulasi | — |
| `sarcomere` | 2.3 | Sarkomer qisqarishi | — |
| `musclezoom` | 2.3 | Muskul: organ→tola→miofibrilla | — |
| `muscle` | old | Muskul | — |

## 5. Anatomiya va fiziologiya — Anatomy & physiology (`anatomy`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `walker` | 2.3 | Yurish sikli (60% tayanch / 40% siltanish) | — |
| `skeleton` | 2.3 | Skelet | — |
| `armlever` | 2.3 | Qo‘l richagi (ikki va uch boshli mushak) | — |
| `heart` | 2.7 | Yurak (v2.7 qayta chizilgan: kameralar, klapanlar, qon yo‘li) | — |
| `vessel` | 2.7 | Qon tomir (v2.7: laminar oqim, arteriya/vena/kapillyar devori, bosim–tezlik) | — |
| `lungs` | old | O‘pka | — |
| `alveolus` | old | Alveola | — |
| `brain` | 2.7 | Miya (v2.7: bo‘laklar, M1/S1, Broka/Vernike; activity) | — |
| `digestive` | 2.7 | Hazm tizimi (v2.7: proporsional, ovqat yo‘li) | — |
| `kidney` | 2.7 | Buyrak (v2.7 qayta chizilgan) | — |
| `nephron` | old | Nefron | — |
| `eye` | 2.7 | Ko‘z (v2.7: 25 px/mm kesim; defect) | `normal` `myopia` `hyperopia` |
| `rbc` | old | Eritrotsit | — |
| `wbc` | old | Leykotsit | — |
| `egg` | old | Tuxum hujayra | — |
| `sperm` | old | Spermatozoid | — |

## 6. Mikrobiologiya va immunologiya — Microbiology & immunology (`micro`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `virus` | old | Virus (umumiy) | — |
| `virion` | 2.3 | Virion turlari | `phage` `corona` `influenza` `hiv` `adeno` `tmv` |
| `phagecycle` | 2.3 | Bakteriofag litik sikli | — |
| `bacteria` | old | Bakteriya | — |
| `bactshapes` | 2.3 | Bakteriya shakllari | — |
| `fission` | 2.3 | Binar bo‘linish | — |
| `antibody` | 2.3 | Antitelo (Y, Fab/Fc) | — |
| `phagocytosis` | 2.3 | Fagotsitoz | — |

## 7. Patologiya — Pathology (`patho`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `cellinjury` | 2.3 | Hujayra shikastlanishi | `all` `necrosis` `apoptosis` |
| `atherosclerosis` | 2.3 | Ateroskleroz | `rupture` |
| `inflammation` | 2.3 | Yallig‘lanish | — |
| `neoplasia` | 2.3 | O‘sma (neoplaziya) | — |

## 8. Tibbiyot I: a’zolar tuzilishi — Medicine I: organ structure (`med1`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `ear` | 2.5 | Quloq: tuzilish, chig‘anoq, Korti a’zosi, muvozanat | `structure` `cochlea` `corti` `balance` |
| `liver` | 2.5 | Jigar: bo‘lakcha, atsinus (zonalar), gepatotsit | `lobule` `acinus` `hepatocyte` |
| `islet` | 2.5 | Langergans orolchasi, glyukoza–insulin | `histology` `glucose` |
| `retina` | 2.5 | To‘r parda 10 qavati; fototransduksiya | `layers` `photo` |
| `stomach` | 2.5 | Oshqozon devori; parietal hujayra H⁺/K⁺-ATFaza (drug:none|ppi|h2) | `wall` `parietal` |
| `villus` | 2.5 | Ichak vorsinkasi: tuzilish; so‘rilish (SGLT1, xilomikron) | `structure` `absorption` |
| `cardio` | 2.5 | Yurak o‘tkazuvchi tizimi + EKG; harakat potensiali | `conduction` `ap` |
| `osteon` | 2.6 | Osteon (Gavers tizimi) va suyak remodellanishi (BMU) | `structure` `remodeling` |
| `chemosense` | 2.6 | Hid bilish (ORN, glomerula) va ta’m (5 ta’m, retseptorlar) | `olfaction` `taste` |

## 9. Tibbiyot II: patologik jarayonlar — Medicine II: pathological processes (`med2`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `hemostasis` | 2.5 | Gemostaz: trombotsit tiqini; koagulyatsiya kaskadi (PT/aPTT) | `plug` `cascade` |
| `thrombosis` | 2.5 | Virxov triadasi, TELA; miokard infarkti (troponin) | `virchow` `infarct` |
| `healing` | 2.5 | Yara bitishi 4 faza; suyak sinishi bitishi | `wound` `fracture` |
| `adaptation` | 2.5 | Hujayra adaptatsiyasi | `all` `atrophy` `hypertrophy` `hyperplasia` `metaplasia` `dysplasia` |
| `edema` | 2.5 | Starling kuchlari (cause:none|heart|albumin|inflammation|lymph); shish sabablari | `starling` `causes` |
| `metastasis` | 2.5 | Metastaz kaskadi (EMT → koloniya) | `cascade` |
| `apoptosis` | 2.5 | Apoptoz yo‘llari (kaspazalar); autofagiya | `pathways` `autophagy` |
| `stroke` | 2.6 | Insult: ishemik (yadro/penumbra, tPA/trombektomiya oynasi); gemorragik | `ischemic` `hemorrhagic` |

## 10. Kimyoviy moddalar ta’siri — Chemical injury & toxicology (`tox`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `toxin` | 2.5 | Zaharlar mexanizmi: CO, sianid, FOS, botulotoksin/tetanus, qo‘rg‘oshin | `co` `cyanide` `organophosphate` `botulinum` `lead` |
| `livertox` | 2.5 | Jigar toksikologiyasi: paratsetamol (dose), alkogol | `paracetamol` `alcohol` |
| `burn` | 2.5 | Kimyoviy kuyish: kislota vs ishqor, yuvish | `compare` |
| `radical` | 2.5 | Erkin radikallar: ROS va himoya; lipid peroksidlanishi (vitE:false) | `ros` `peroxidation` |
| `radiation` | 2.5 | Ionlovchi nurlanish: DNK shikasti/tuzatish; yashovchanlik egri chizig‘i va doza shkalasi | `dna` `survival` |
| `caries` | 2.5 | Tish kariyesi: Stephan egri chizig‘i; shikast bosqichlari | `stephan` `lesion` |
| `smoking` | 2.6 | Chekish: o‘pka (kiprikchalar, KOAH, saraton); nikotin farmakokinetikasi | `lung` `nicotine` |
| `metals` | 2.6 | Og‘ir metallar: simob, mishyak, kadmiy (–SH bog‘lanish, a’zolar) | `mercury` `arsenic` `cadmium` |

## 11. Mikroorganizmlar ta’siri — Infectious agents (`infect`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `hpylori` | 2.6 | H. pylori: ureaza, shilliqda yashash, CagA/VacA, yara | `mechanism` |
| `tuberculosis` | 2.6 | Sil: granuloma (kazeoz, Langhans), latent/faol | `granuloma` |
| `cholera` | 2.6 | Vabo: AB₅ toksin → cAMP → CFTR; ORS | `toxin` |
| `pyogenic` | 2.6 | Yiringli koklar: S. aureus (absess, MRSA), S. pyogenes (flegmona, asoratlar) | `staph` `strep` |
| `hepatitis` | 2.6 | Gepatit B: hayot sikli (cccDNK); serologiya (oyna davri) | `hbv` `serology` |
| `sarscov2` | 2.6 | SARS-CoV-2: kirish (ACE2/TMPRSS2), replikatsiya; kasallik kechishi | `entry` `course` |
| `candida` | 2.6 | Kandida: achitqi→gifa, invaziya, biofilm, antifungal nishonlar | `morphology` |
| `helminth` | 2.6 | Gijjalar: askarida hayot sikli; tasma gijja (tenioz/sistitserkoz) | `ascaris` `tapeworm` |
| `microbiota` | 2.6 | Ichak mikrobiotasi: zichlik, shilliq, QZYK; antibiotik → C. difficile, FMT | `gut` `antibiotic` |
| `resistance` | 2.6 | Antibiotiklarga chidamlilik: mexanizmlar; seleksiya (MIC–MPC) | `mechanisms` `selection` |

## 12. Ilmiy generatorlar (v2.7) — Scientific generators (`gen`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `ode` | 2.7 | ODE modellar (RK4): SIR, yirtqich–o‘lja, Mixaelis, farmakokinetika, logistik, yemirilish, Hodgkin–Huxley | `sir` `predator` `michaelis` `pk` `logistic` `decay` `hh` |
| `nucleic` | 2.7 | Nuklein kislotalar: spiral, mutatsiya (kodon jadvali), restriksiya + gel, PZR | `helix` `mutation` `restriction` `pcr` |
| `vsepr` | 2.7 | VSEPR molekula shakli (AXE, 3D, juftlar) | `formula:"H2O"` |
| `econfig` | 2.7 | Elektron konfiguratsiya (Madelung + istisnolar, Hund) | `element:"Fe"` |
| `balance` | 2.7 | Kimyoviy tenglama tenglash (Gauss), atom jadvali | `equation:"C3H8 + O2 -> CO2 + H2O"` |
| `crystal` | 2.7 | Kristall panjaralar (CN, qadoqlanish hisoblangan) | `sc` `bcc` `fcc` `hcp` `nacl` `diamond` |
| `superpose` | 2.7 | To‘lqinlar superpozitsiyasi | `sum` `beats` `standing` |
| `pedigree` | 2.7 | Shajara: irsiylanish turlari | `AD` `AR` `XLR` `XLD` `mt` |
| `section` | 2.7 | Mikroskop kesimi: qon surtmasi + leykoformula | `bloodsmear` |
| `assembly` | 2.7 | Makromolekula yig‘ilishi | `actin` `microtubule` `collagen` `capsid` `channel` |

## 13. Immunologiya va farmakologiya (v2.7) — Immunology & pharmacology (`immuno`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `lymphocyte` | 2.7 | Limfotsitlar: B (klon seleksiya, plazmotsit), T (MHC I/II, CD4/CD8) | `bcell` `tcell` |
| `vaccine` | 2.7 | Vaksina: birlamchi/ikkilamchi javob, platformalar, jamoa immuniteti (R0) | — |
| `allergy` | 2.7 | Allergiya: sensibilizatsiya, IgE, mast hujayra, erta/kech faza | — |
| `autoimmune` | 2.7 | Autoimmun kasalliklar | `t1d` `graves` `myasthenia` |
| `transplant` | 2.7 | Transplantatsiya: HLA moslik, rad etish turlari, immunosupressiya | — |
| `adme` | 2.7 | Farmakokinetika ADME: IV vs og‘iz, AUC, F, CL | — |
| `agonist` | 2.7 | Farmakodinamika: agonist/antagonist doza–javob (Hill, Schild) | `full` `partial` `competitive` `noncompetitive` `inverse` |

## 14. Fiziologiya (v2.8) — Physiology (`physio`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `reflex` | 2.8 | Refleks yoyi: tizza (monosinaptik), og‘riqdan chekinish; latentlik hisoblanadi | `stretch` `withdrawal` |
| `circulation` | 2.8 | Qon aylanish: bosimlar, MO = YUCH × UH, a’zolarga taqsimlanish | — |
| `endocrine` | 2.8 | Endokrin teskari aloqa: qalqonsimon bez, kortizol, glyukoza–insulin (ODE) | `thyroid` `cortisol` `glucose` |
| `breathing` | 2.8 | Nafas: mexanika (diafragma, bosimlar), spirogramma (TV, IRV, ERV, RV) | `mechanics` `spirogram` |
| `autonomic` | 2.8 | Vegetativ nerv tizimi: simpatik / parasimpatik ta’sirlar | — |
| `thermoreg` | 2.8 | Termoregulyatsiya: sovuq, issiq, isitma (o‘rnatish nuqtasi) | `cold` `heat` `fever` |
| `acidbase` | 2.8 | Kislota–ishqor: Henderson–Hasselbalch, Davenport, Winter formulasi | `normal` `racid` `ralk` `macid` `malk` |

## 15. Hujayra va molekulyar biologiya II (v2.8) — Cell & molecular biology II (`cellbio`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `meiosis` | 2.8 | Meyoz I/II: krossingover, gametalar | — |
| `respiration` | 2.8 | Hujayra nafasi: glikoliz, Krebs, ETZ (~32 ATF hisoblanadi, sianid) | `overview` `etc` |
| `cellcycle` | 2.8 | Hujayra sikli: G1/S/G2/M, siklinlar; DNK shikasti va p53 | `normal` `damage` |
| `dnarepair` | 2.8 | DNK reparatsiyasi: mismatch, BER, NER, qo‘sh zanjir uzilishi | `mismatch` `ber` `ner` `dsb` |
| `sorting` | 2.8 | Oqsil sortirovkasi: EPT → Golji → manzillar | — |
| `cytoskeleton` | 2.8 | Sitoskelet: aktin, mikrotubula, oraliq filamentlar; kinezin/dinein | `overview` `motors` |
| `junctions` | 2.8 | Hujayra birikmalari: zich, adgeziv, desmosoma, tirqishli | — |
| `metabolism` | 2.8 | Metabolizm integratsiyasi: to‘yinish va och qolish | `fed` `fasting` |

## 16. Genetika va evolyutsiya (v2.8) — Genetics & evolution (`genetics`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `karyotype` | 2.8 | Kariotip: norma, Daun, Terner, Klaynfelter, Edvards, Patau | `normal` `down` `turner` `klinefelter` `edwards` `patau` |
| `operon` | 2.8 | Gen regulyatsiyasi: lac va trp operon, epigenetika | `lac` `trp` `epigenetics` |
| `hardy` | 2.8 | Xardi–Vaynberg muvozanati va genetik dreyf (simulyatsiya) | `equilibrium` `drift` |
| `selection` | 2.8 | Tabiiy tanlanish: yo‘naltiruvchi, stabillashtiruvchi, dizruptiv | `directional` `stabilizing` `disruptive` |
| `hominin` | 2.8 | Odam evolyutsiyasi: gomininlar vaqt shkalasi, miya hajmi | — |

## 17. Botanika (v2.8) — Botany (`botany`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `plantsection` | 2.8 | O‘simlik anatomiyasi: ildiz, poya (ikki/bir pallali), barg kesimi | `root` `stem` `monocot` `leaf` |
| `transpiration` | 2.8 | Transpiratsiya: suv potensiali gradienti (Ψ havo hisoblanadi), kogeziya | — |
| `flower` | 2.8 | Gul tuzilishi va qo‘sh urug‘lanish | `structure` `fertilization` |
| `altgen` | 2.8 | Nasllar gallanishi: mox, qirqquloq, gulli o‘simlik | `moss` `fern` `angiosperm` |
| `planthormone` | 2.8 | O‘simlik gormonlari: fototropizm (auksin), gormonlar jadvali | `phototropism` `overview` |
| `nitrogen` | 2.8 | Azot: tuganak (nitrogenaza) va global azot aylanishi | `nodule` `cycle` |

## 18. Zoologiya va evolyutsiya — Zoology & evolution (`zoo`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `taxonomy` | 2.3 | Sistematika darajalari | `human` `dog` `cat` `lion` `wolf` `horse` `honeybee` |
| `evotree` | 2.3 | Evolyutsiya daraxti | — |
| `animal` | 2.3 | Hayvon anatomiyasi | `fish` `insect` `bird` |

## 19. Kimyo va genetika — Chemistry & genetics (`chem`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `atom` | old | Atom (Bor) | — |
| `molecule` | old | Molekula | — |
| `mol3d` | old | Molekula 3D | — |
| `lattice` | old | Kristall panjara | — |
| `reaction` | old | Reaksiya | — |
| `periodic` | 2.3 | Davriy jadval (118) | `highlight` `category` |
| `orbital` | 2.3 | Orbitallar | `all` `s` `p` `d` |
| `punnett` | 2.3 | Punnet katagi (hisoblangan nisbat) | `"Aa x Aa"` `"AaBb x AaBb"` |

## 20. Fizika (mexanika, elektr) — Physics (`physics`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `induction` | 2.4 | Elektromagnit induksiya (Faradey, Lens) | — |
| `pendulum` | old | Mayatnik | — |
| `spring` | old | Prujina | — |
| `projectile` | old | Otilgan jism | — |
| `collision` | old | To‘qnashuv | — |
| `incline` | old | Qiya tekislik | — |
| `orbit` | old | Orbita | — |
| `field` | old | Elektr maydon | — |
| `circuit` | old | Elektr zanjir | — |
| `shock` | 2.3 | Tovush to‘sig‘i / Max konusi | `subsonic` `sonic` `supersonic` |
| `spacetime` | 2.3 | Fazo-vaqt egriligi (o‘xshatish) | — |

## 21. Optika va to‘lqinlar — Optics & waves (`optics`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `wave` | old | To‘lqin | `transverse` `longitudinal` |
| `refraction` | old | Sinish | — |
| `lens` | old | Linza | `convex` `concave` |
| `prism` | 2.3 | Prizma, dispersiya (Snell+Koshi) | — |
| `spectrum` | 2.3 | Elektromagnit spektr | — |
| `raydiagram` | 2.3 | Nur chizmasi (linza/ko‘zgu formulasi) | `convex` `concave` `concavemirror` `convexmirror` `plane` |
| `wavecompare` | 2.3 | To‘lqinlarni solishtirish | — |

## 22. Materiallar — Materials (`matter`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `material` | 2.3 | Material xossalari | `rope` `rigid` `soft` `fluid` `gas` |
| `statesofmatter` | 2.4 | Moddaning agregat holatlari, isish egri chizig‘i | `heating` `compare` |
| `solid` | old | 3D jism | — |

## 23. Kosmos va atom fizikasi — Space & atomic (`space`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `planet` | 2.3 | Sayyora (real presetlar yoki generator) | `mercury` `venus` `earth` `mars` `jupiter` `saturn` `uranus` `neptune` `pluto` `moon` `rocky` `desert` `ice` `lava` `ocean` `gas` `toxic` |
| `exoplanet` | 2.3 | Ekzosayyora + tranzit egri chizig‘i | `O` `B` `A` `F` `G` `K` `M` |
| `starlife` | 2.3 | Yulduz hayoti (mass, end) | `low` `high` `end:neutron` `blackhole` |
| `atommodel` | 2.3 | Atom modellari tarixi | `all` `dalton` `thomson` `rutherford` `bohr` `quantum` |
| `decay` | 2.3 | Radioaktiv yemirilish | `alpha` `beta` `gamma` `penetration` |
| `solar3d` | old | Quyosh tizimi 3D | — |
| `globe` | old | Globus 3D | — |
| `axes3d` | old | 3D o‘qlar | — |

## 24. Yer haqidagi fanlar va astronomiya — Earth science & astronomy (`earth`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `earthlayers` | 2.4 | Yerning ichki tuzilishi (PREM chuqurliklari, konveksiya, geoterma) | — |
| `plates` | 2.4 | Litosfera plitalari | `divergent` `convergent` `collision` `transform` |
| `volcano` | 2.4 | Vulqon otilishi (magma o‘chog‘i, kanal, lava, kul) | — |
| `earthquake` | 2.4 | Zilzila: P/S to‘lqinlar, seysmogramma | — |
| `thunderstorm` | 2.4 | Momaqaldiroq va chaqmoq (zaryadlar, lider, qaytuvchi zarba) | — |
| `watercycle` | 2.4 | Suvning tabiatda aylanishi | — |
| `seasons` | 2.4 | Fasllar (o‘q og‘ishi 23,44°) | — |
| `moonphases` | 2.4 | Oy fazalari | — |
| `eclipse` | 2.4 | Quyosh/Oy tutilishi (umbra, penumbra) | `solar` `lunar` |
| `solarsystem` | 2.4 | Quyosh tizimi (real davr nisbatlari) | — |
| `atmosphere` | 2.4 | Atmosfera qatlamlari va harorat profili | — |

## 25. Fon va maskot — Scenery & mascot (`scene`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `scenery` | 2.3 | To‘liq ekran fon | `forest` `mountains` `desert` `ocean` `underwater` `night` `city` `field` `arctic` `savanna` `space` `lab` |
| `mascot` | 2.3 | Maskot (gapiradi) | `wave` `point` `think` `happy` `idea` `warn` |

## 26. Diagrammalar — Diagrams (`diagram`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `chart` | old | Grafik | — |
| `barchart` | old | Ustunli diagramma | — |
| `pie` | old | Doiraviy diagramma | — |
| `timeline` | old | Vaqt chizig‘i | — |
| `flow` | old | Oqim sxemasi | — |
| `mindmap` | old | Aql xaritasi | — |
| `compare` | old | Solishtirish | — |
| `number` | old | Raqam hisoblagich | — |
| `emoji` | old | Emoji | — |

## 27. Effektlar — Effects (`fx`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `fire` | old | Olov | — |
| `smoke` | old | Tutun | — |
| `water` | old | Suv | — |
| `rain` | old | Yomg‘ir | — |
| `snow` | old | Qor | — |
| `bubbles` | old | Pufakchalar | — |
| `sparks` | old | Uchqun | — |
| `lightning` | old | Chaqmoq | — |
| `rays` | old | Nurlar | — |
| `explosion` | old | Portlash | — |
| `glowOrb` | old | Nur shar | — |

## 28. Kamera — Camera (`camera`)
| type | v | nima | kind / variantlar |
|---|---|---|---|
| `magnifier` | old | Lupa (kattalashtirish) | — |
| `spotlight` | old | Yoritish | — |
