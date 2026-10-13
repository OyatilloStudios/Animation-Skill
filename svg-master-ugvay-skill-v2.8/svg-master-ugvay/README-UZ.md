# SVG Master Ugvay — o‘rnatish va foydalanish (o‘zbekcha)

**Nima bu?** Gemini (yoki boshqa AI) faqat qisqa `LESSON({...})` skript yozadi, `svgmaster.js` dvigateli esa uni professional SVG-animatsion dars videosiga aylantiradi: hujayra, yurak, DNK, atom, reaksiya, fizika simulyatsiyalari, formulalar, mind map, vaqt chizig‘i, grafiklar, olov/suv/chaqmoq effektlari, rasm ustiga yorliqlar, kamera zoom, subtitr, musiqa, test (quiz) va xulosa.

## v2.3 da yangi — KUTUBXONA (eskilar o‘zgarmadi)
- **48 ta yangi element**, jami **131 ta**, **17 ta javon**ga tartiblangan: Molekulyar biologiya, Gistologiya, Anatomiya, Mikrobiologiya, Patologiya, Zoologiya, Kimyo-genetika, Fizika, Optika, Materiallar, Kosmos, Fon & maskot va boshqalar. To‘liq ro‘yxat: `references/LIBRARY-INDEX.md`.
- Eski 83 element va 11 ta misol avvalgidek ishlaydi — yangi kod alohida fayllarda (`engine/src/16…27`).
- Yangi: DNK replikatsiya/transkripsiya/translyatsiya (haqiqiy genetik kod), oqsil darajalari, gemoglobin, retseptorlar; 15 xil to‘qima (H&E mikroskop), teri, soch, sarkomer; yurish sikli, skelet, qo‘l richagi; viruslar, fag sikli, antitelo, fagotsitoz; ateroskleroz, yallig‘lanish, o‘sma; prizma, spektr, linza/ko‘zgu nur chizmasi, Max konusi, fazo-vaqt; sayyoralar (real + generator), ekzosayyora, yulduz hayoti, atom modellari, radioaktivlik; davriy jadval, orbitallar, Punnet katagi; sistematika, evolyutsiya daraxti; 12 xil fon va maskot.
- `analogy:true` → “≈ O‘xshatish (model)” belgisi; `warn:'…'` → ⚠ ehtiyot belgisi. Aniq va soddalashtirilgan faktlar: `references/FACTS.md`.
- Misollar: `examples/v23-library-showcase.html`, `examples/v23-kids-mascot.html`.

## v2.2 da yangi (tartib, tushib qolishlar, xilma-xillik)
- **Matn endi tushib qolmaydi:** `text` bloklari ekranga mahkamlanadi — kamera yaqinlashsa ham kesilmaydi, yarmi yo‘qolmaydi; har bir bullet **to‘liq** va tartib bilan chiqadi, uzun qatorlar osma chekinish (hanging indent) bilan.
- **Hech narsa matnni to‘smaydi:** lupa, formula, rasm va kichik diagrammalar matn ustiga yoki kadrdan tashqariga tushsa, dvigatel ularni eng yaqin bo‘sh joyga ko‘chiradi (layout guard). Lupa o‘z nishonini ham to‘smaydi.
- **Ramkalar to‘g‘ri:** sarlavha kartasidagi fan nomi pill ramkasiga sig‘adi (harf oralig‘i hisobga olinadi).
- **Video uzunligi matnga bog‘liq:** sahna davomiyligi = subtitr (~2,3 so‘z/s) + ekrandagi matn (~3 so‘z/s) o‘qish vaqti. `pace:1.2` — bolalar uchun sekinroq. `dur` ni majburlamang.
- **68 ta tipografiya effekti:** 32 kirish, 18 urg‘u, 18 chiqish — har doim tartib bilan: kirish → urg‘u → chiqish, oxirida boshidan qaytmaydi. `typo:'auto'` har sahnaga boshqa effekt beradi.
- **26 ta o‘tish effekti:** push, wipe, blinds, venetian, diagonal, grid, radial, split, barn, page (varaq), flip, spin, blur, iris, zoom… `transition:'auto'` — har sahnada boshqasi, ketma-ket takrorlanmaydi.
- **Kamera presetlari:** push-in, pull-out, ken-burns, pan, orbit, dolly, crane, reveal, focus, tour; kamera berilmasa har sahnada boshqa yumshoq harakat. Kamera yaqinlashganda matn ortida qog‘oz kartochka paydo bo‘ladi.
- Namuna: `examples/typo-showcase.html` (barcha effektlar), `examples/nerv-tizimi.html` (nerv tizimi darsi).

## v2.1 da yangi
- **Matn himoyasi:** matnlar o‘z joyiga avtomatik sig‘adi, yorliqlar sarlavha, subtitr va boshqa matnlardan qochadi, uzun sarlavha bir qatorga sig‘diriladi; `qa-sheet.mjs` ustma-ust matnlarni qizil ramka bilan ko‘rsatadi va ogohlantirishlar (WARNINGS) chiqaradi.
- UGVAY kutubxonasining bir qismi: `LIBRARY.md` qaysi ishga qaysi skill kerakligini aytadi.

## v2 da yangi
- **Bio/Med atlas:** membrana transporti (diffuziya, kanal, tashuvchi, Na⁺/K⁺-nasos, endo/ekzotsitoz, osmos), signalizatsiya, sinaps, mitoxondriya, xloroplast, yadro, bakteriya, eritrotsit, leykotsit (fagotsitoz), muskul sarkomeri, epiteliy, spermatozoid, tuxum hujayra, o‘pka (nafas), alveola (gaz almashinuvi), buyrak, nefron, bosh miya bo‘laklari, hazm tizimi, ko‘z.
- **Camera Master:** obyektni kuzatish (`follow`), qismga zoom, burish/qiyalatish, qo‘lda ushlangan kamera, silkinish, lupa (`magnifier`), projektor (`spotlight`), rack-focus (xiralashtirish), o‘tishlar: whip, iris, **dive** (organ → hujayra → organoid ichiga sho‘ng‘ish).
- **3D:** aylanuvchi molekulalar (haqiqiy bog‘ burchaklari), kristall panjara (NaCl), 3D DNK, geometrik jismlar (kub, piramida, prizma, silindr, konus, shar — uchlari harflangan), Yer globusi (o‘q og‘ishi 23,4°, kun/tun), Quyosh tizimi, 3D koordinatalar va z=f(x,y) sirtlar.

## 1. Gemini Gem yaratish
1. gemini.google.com → **Gems** → **New Gem** → nomi: *SVG Master Ugvay*.
2. **Instructions** maydoniga `GEMINI-GEM.md` matnini to‘liq joylang.
3. **Knowledge** ga yuklang: `SVGMASTER.md`, `references/SUBJECTS.md`, `references/DESIGN.md`, `references/BIO-ATLAS.md`, `references/CAMERA.md`, `examples/showcase-all-subjects.html`, `examples/v2-bio-camera-3d.html`, `examples/nerv-tizimi.html`.
4. Saqlang. Endi yozing: *"9-sinf uchun fotosintez haqida 1 daqiqalik dars, 16:9"*.

## 2. Darsni ko‘rish
1. Bitta papka oching, ichiga `engine/svgmaster.js` ni qo‘ying.
2. Gemini bergan kodni shu papkaga `lesson.html` deb saqlang (rasm/ovoz fayllari ham shu yerda).
3. Chrome’da oching → **▶ Sound**. Tugmalar: ⏮ ⏭ sahnalar, CC subtitr, Grid (koordinatalar), Space pauza.
4. Qizil xato oynasi chiqsa — matnini Gemini’ga yuboring, u tuzatadi.

## 3. MP4 ga eksport (bir marta o‘rnatiladi)
```
npm i playwright && npx playwright install chromium     (ffmpeg ham kerak)
node scripts/render-lite.mjs lesson.html lesson.mp4
```
Kompyuter qotmaydi: GPU o‘chiq, past ustuvorlik, to‘xtatsangiz keyin davom etadi. Kuchsiz kompyuter: `--max-fps 5 --threads 1`.

## 4. Sifat nazorati (QA)
```
node scripts/qa-sheet.mjs lesson.html sheet.png
```
Har sahnadan bitta kadr + xatolar ro‘yxati bo‘lgan rasm chiqadi. Uni Gemini’ga yuborib "shu kadrlarni tekshir va tuzat" deng.

## 5. Rasm bilan ishlash
Rasmni Gemini’ga yuklang va "shu rasm asosida mexanizmni tushuntir" deng. Rasmni `lesson.html` yoniga Gemini aytgan nom bilan saqlang. Yorliq joyi noto‘g‘ri bo‘lsa, `lesson.html?grid=1` ochib, skrinshotni yuboring.

## 6. Ovoz (diktor)
O‘z ovozingizni yozib `voice.mp3` qilib qo‘ying va Gemini’ga ayting: `voice:{file:'voice.mp3'}` yoki har sahnaga `audio:'s2.mp3'` — sahna uzunligi ovozga moslashadi.

## Papka tuzilishi
- `SVGMASTER.md` — dvigatel API (AI uchun asosiy bilim)
- `GEMINI-GEM.md` — Gem ko‘rsatmasi
- `references/` — fanlar bo‘yicha aniqlik qoidalari, dizayn tamoyillari, BIO-ATLAS (biologiya/tibbiyot faktlari), CAMERA (kamera, o‘tishlar, 3D)
- `references/LIBRARY-INDEX.md` — kutubxona katalogi (javonlar), `references/FACTS.md` — aniqlik eslatmalari
- `examples/` — tayyor ishlaydigan darslar (barcha fanlar, reels 9:16, rasm bilan)
- `engine/svgmaster.js` — dvigatel (`engine/src/` — manba kodi)
- `scripts/` — render-lite.mjs (MP4), qa-sheet.mjs (QA)
