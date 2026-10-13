# Text Layout Ugvay — matnlar ustma-ust tushmasligi uchun skill

**v1.1:** harakatdagi matn qoidalari (§5b): bullet bo‘laklab emas, butun chiqadi; kamera matnni kesmaydi; lupa/obyektlar matnni to‘smaydi; sahna vaqti matn hajmidan hisoblanadi; ramka o‘lchami harf oralig‘i bilan o‘lchanadi.

**Nima qiladi?** Har qanday animatsiya, dars, slayd yoki videoda matnlar bir-birining ustiga chiqmasligi, kadrdan chiqib ketmasligi va o‘qiladigan bo‘lishini ta’minlaydi. Matn so‘zlari o‘zgarmaydi — faqat o‘lchami, qator bo‘linishi va joyi.

## Ichida
- `TEXT-LAYOUT.md` — 10 ta qoida, zonalar (sarlavha · asosiy qism · subtitr), API, tuzatish retseptlari (AI uchun asosiy bilim).
- `textlayout.js` — kutubxona: matnni qutiga sig‘dirish (`TL.fit`), chiroyli qatorlarga bo‘lish, yorliqlarni to‘qnashmaydigan joyga qo‘yish (`TL.place`), o‘zbek apostroflari (`TL.uz`: o‘ g‘ ʼ).
- `scripts/text-qa.mjs` — tekshiruvchi: ustma-ust matnlarni qizil, kadrdan chiqqanlarni to‘q sariq ramka bilan ko‘rsatadi.
- `examples/` — SVG va Canvas namunalar.

## Ishlatish
```
node scripts/text-qa.mjs dars.html hisobot.png --every 0.5
```
`text OK` chiqsa — hammasi joyida. Aks holda hisobot rasmini AI’ga yuboring: "shu matnlarni tuzat".

## Boshqa skillar bilan
- **SVG Master Ugvay** (v2.1) ichiga allaqachon o‘rnatilgan: matnlar avtomatik sig‘adi, yorliqlar sarlavha/subtitr/boshqa matnlardan qochadi, `qa-sheet.mjs` qizil ramka bilan ko‘rsatadi.
- **Code Motion Graphics** — `textlayout.js` ni ulang va matnni `TL.drawFit` bilan chizing.
- Uchalasini birga ishlatish — `LIBRARY.md`.
