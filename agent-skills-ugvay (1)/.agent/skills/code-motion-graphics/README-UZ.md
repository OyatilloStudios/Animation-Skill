# Code Motion Graphics — skill paketi

## v3.2 da yangi
- FILM dvigatelida 18 ta o‘tish effekti: iris, blinds (jalyuzi), split, shutter, circle, glitch, spin, flip, whip, drop, blur, push-up + eski zoom/wipe/slide/fade/flash/cut. Standart holatda 16 xili navbat bilan almashadi — bir xil o‘tish ketma-ket takrorlanmaydi.
- Matnli o‘quv darslari uchun SVG Master Ugvay v2.2 (68 tipografiya effekti, 26 o‘tish, matn hajmiga bog‘liq sahna uzunligi) tavsiya etiladi.

Bu paket istalgan AI'ga (Claude, Gemini, ChatGPT) kod orqali motion graphics qilishni o'rgatadi.

## Ichida nima bor
- `SKILL.md` — asosiy ko'rsatma (ish tartibi, oltin qoidalar)
- `references/` — 11 ta bilim fayli: tamoyillar, texnikalar, render, ovoz (+ o'z SFX kutubxonangiz), promptlar, QA, rasm/video so'rash va AI rasm promptlari, tipografiya (+ scramble/crypto matn), SVG, zarrachalar va silliqlik
- `assets/template-pro.html` — PRO shablon (motionkit + audiokit ichida). Har doim shundan boshlang
- `assets/template.html` — oddiy shablon
- `assets/motionkit.js`, `assets/audiokit.js` — kod kutubxonalari
- `examples/showreel.html` — to'liq 15 soniyalik namuna
- `scripts/frames.mjs`, `scripts/render_mp4.mjs` — HTML'ni kadrma-kadr MP4'ga aylantiruvchi skriptlar

## Gemini bilan ishlatish
1. gemini.google.com → **Gems** → **New Gem**.
2. "Instructions" maydoniga `SKILL.md` matnini to'liq joylang.
3. "Knowledge" bo'limiga `references/` ichidagi 11 ta faylni, `assets/template-pro.html`, `assets/motionkit.js`, `assets/audiokit.js` va `examples/showreel.html` fayllarini yuklang.
   Gemini'ga birinchi xabarda ayting: "Har doim SKILL.md dagi PROTOCOL bo'yicha ishla, avval beat sheet jadvalini yoz, keyin template-pro.html asosida bitta HTML ber".
4. Gem'dan so'rang: "15 soniyalik logo reveal qil, bitta HTML fayl, template.html asosida".
5. Javobdagi HTML'ni `.html` qilib saqlang, Chrome'da oching.

## ⭐ YANGI: Motion Engine — Gemini bilan 90% sifat
Endi Gemini animatsiya kodini yozmaydi. U faqat 10–40 qatorlik **ssenariy** (`FILM({...})`) yozadi, qolganini tayyor, sinalgan `engine/motion-engine.js` qiladi: matn o'lchami, chetdan chiqmaslik, easing, o'tishlar, musiqa va ovoz effektlari.

### Gem sozlash (bir marta)
1. gemini.google.com → **Gems** → **New Gem**.
2. **Instructions** ga `GEMINI-GEM.md` matnini to'liq joylang.
3. **Knowledge** ga `engine/ENGINE.md`, `engine/example-animotion.html`, `engine/example-reel.html` ni yuklang.

### Ishlash tartibi
1. Gem'ga yozing: *"Instagram Reels uchun 15 soniyalik video: mavzu — …, matnlar — …, ranglar — …"*.
2. U jadval (reja) va bitta HTML beradi → uni `engine/` papkasiga `film.html` deb saqlang (`motion-engine.js` yonida).
3. Chrome'da oching → **▶ Sound**. Tugmalar: `Space` pauza, `←/→` sahnalar, `G` xavfsiz chegara.
4. Tekshirish: `node scripts/qa-sheet.mjs engine/film.html sheet.png` → `sheet.png` ni Gem'ga yuboring: *"Shu kadrlarni ko'r va tuzat"*.
5. Qizil xato chiqsa — matnini nusxalab Gem'ga yuboring.
6. MP4: `node scripts/render-lite.mjs engine/film.html film.mp4`.
7. Bitta faylga jamlash (do'stga yuborish uchun): `node scripts/bundle.mjs engine/film.html film-bitta.html`.

### 16 xil sahna
title (sarlavha) · words (so'zma-so'z) · scramble (shifr) · particles (zarrachalar → so'z) · counter (raqam sanash) · bars (grafik) · list (ro'yxat) · quote (iqtibos) · image (rasm + Ken Burns) · split (oldin/keyin) · shape3d (3D shakl) · wave (to'lqin) · grid (nuqtalar to'ri) · lower (ism-familiya plashkasi) · cta (obuna tugmasi) · logo (logo reveal).
Mavzular: dark, light, neon, navy, warm, mono. Musiqa: tech, epic, calm, dark, pop yoki o'z faylingiz (`music:{file:'music.mp3'}`).

## O'z kompyuteringizda MP4 qilish
```bash
npm i playwright && npx playwright install chromium   # bir marta
# FFmpeg o'rnatilgan bo'lishi kerak (ffmpeg.org)
node scripts/render-lite.mjs film.html film.mp4 --fps 30
```
`render-lite.mjs` — ekranda hech narsa ochmaydi, GPU'ni ishlatmaydi, eng past prioritetda ishlaydi:
- **Kompyuter qizib ketsa (eng yumshoq rejim):**
  - Windows: `start /low /b node scripts/render-lite.mjs film.html film.mp4 --max-fps 5 --threads 1 --pause-every 150 --pause-sec 10`
  - Mac/Linux: `nice -n 19 node scripts/render-lite.mjs film.html film.mp4 --max-fps 5 --threads 1 --pause-every 150 --pause-sec 10`
- **Tez ko'rib chiqish (yarim o'lcham):** `--draft`
- **To'xtab qolsa / o'chib qolsa:** xuddi shu buyruqni qayta ishga tushiring — tayyor kadrlardan davom etadi (`film_frames` papkasi).
- **Tashqi fayllar** (`anim.js`, `style.css`, `music.mp3`, rasmlar, shriftlar) HTML bilan bitta papkada (yoki ichki papkalarda) bo'lsin — skript o'zi kichik lokal server ochadi.
- **`__seek` yo'q oddiy HTML** uchun davomiylikni yozing: `--duration 12 --width 1920 --height 1080`. Musiqa `<audio src>` dan yoki `--audio music.mp3` dan olinadi.
- Faqat bitta elementni yozish: `--selector "#stage"`.
Yoki oddiy usul: HTML'ni Chrome'da to'liq ekranda oching va ekranni yozib oling (Windows: Win+Alt+R, Mac: Cmd+Shift+5).

## O'z ovozlaringizni (SFX) ulash
1. Ovozlarni `assets/sfx/` papkasiga qo'ying (WAV yoki MP3).
2. Har biriga teg yozing: `references/04-sound.md` → 7-bo'limdagi namunadek (`whoosh`, `impact`, `click`, `riser`...).
3. Agar ovozning asosiy zarbasi boshida bo'lmasa, `hitAt` ga necha soniyada ekanini yozing.
4. Ro'yxatni `template-pro.html` dagi `SFX_MANIFEST` ga joylang yoki AI'ga yuboring. U ovozlarni kerakli kadrlarga o'zi qo'yadi.
5. HTML'ni oddiy ochganda brauzer fayllarni bloklashi mumkin: papkada `npx serve .` ishga tushirib, `http://localhost:3000` orqali oching.
