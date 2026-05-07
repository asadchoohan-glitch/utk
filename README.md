# Online Keyboard — Urdu, Sindhi & Arabic

A fully functional, responsive online keyboard website with **Urdu Standard**, **Urdu Phonetic**, **Sindhi**, and **Arabic** (Standard + AZERTY) keyboards. All key mappings sourced directly from branah.com source code — 100% accurate.

---

## ✅ Completed Features

### Urdu Keyboard (index.html)
- **Two keyboard layouts** selectable via radio buttons (below keyboard, exactly like branah.com):
  - ◉ **Urdu Keyboard** (Standard NLA layout)
  - ○ **Phonetic Keyboard**
- Switching between layouts rebuilds keyboard instantly, resets shift state
- All normal keys + shift keys from branah.com (exact match)
- Capslock: no effect on Standard; XOR-shift logic on Phonetic caps-sensitive keys
- Esc toggles Urdu ↔ QWERTY passthrough
- Physical keyboard fully supported
- Shift auto-releases after one character (like branah.com)
- Shift chars shown in **blue**, normal chars in **red** (exact branah.com colors)

### Sindhi Keyboard (sindhi.html)
- Complete Arabic Sindhi layout (exact from branah.com/sindhi source)
- All Sindhi-specific chars: ڄ ڃ ڇ ڊ ڌ ڏ ڙ ڦ ڪ ڱ ڻ ڳ ٻ ٽ ئ
- Same UI, colors, and behavior as Urdu keyboard
- Completely independent — unaffected by Urdu changes

### Arabic Keyboard (arabic.html)
- **Two keyboard layouts** selectable via radio buttons:
  - ◉ **Standard** (Arabic 102 — Windows standard Arabic layout)
  - ○ **Azerty** (Arabic 102 AZERTY — French AZERTY-based Arabic layout)
- All normal + shift keys from branah.com/arabic (exact match)
- Esc toggles Arabic ↔ QWERTY passthrough
- Physical keyboard fully supported
- Shift chars shown in **blue**, normal chars in **red**
- RTL textarea with Noto Naskh Arabic font

### All Keyboards Share
- Navigation bar linking all three pages (active page highlighted)
- Select All, Copy, Undo, Redo, Clear All, Save Text buttons
- Font size − / + controls
- External: Send Email, Tweet, Google Search, Google Translate
- RTL textarea with Noto Nastaliq Urdu / Noto Naskh Arabic fonts
- 3D key press animation, hover effects
- Responsive design: Desktop / Tablet / Mobile
- Zero JavaScript errors

---

## 📄 Pages

| Page | URL | Description |
|------|-----|-------------|
| Urdu Keyboard | `index.html` | Standard + Phonetic with radio switcher |
| Sindhi Keyboard | `sindhi.html` | Arabic Sindhi keyboard |
| Arabic Keyboard | `arabic.html` | Standard + AZERTY with radio switcher |

---

## 🗝️ Arabic Standard Key Mappings (Normal / Shift)

| Key | Normal | Shift | Key | Normal | Shift |
|-----|--------|-------|-----|--------|-------|
| q | ض | َ | a | ش | \\ |
| w | ص | ً | s | س | — |
| e | ث | ُ | d | ي | ] |
| r | ق | ٌ | f | ب | [ |
| t | ف | — | g | ل | — |
| y | غ | إ | h | ا | أ |
| u | ع | ' | j | ت | ـ |
| i | ه | ÷ | k | ن | ، |
| o | خ | × | l | م | / |
| p | ح | ؛ | ; | ك | : |
| [ | ج | } | ' | ط | " |
| ] | د | { | z | ئ | ~ |
| \\ | ذ | ّ | x | ء | ْ |
| n | ى | آ | c | ؤ | ِ |
| m | ة | ' | v | ر | ٍ |
| , | و | , | . | ز | . |
| / | ظ | ؟ | | | |

---

## 🗝️ Urdu Standard Key Mappings (Normal / Shift)

| Key | Normal | Shift | Key | Normal | Shift |
|-----|--------|-------|-----|--------|-------|
| q | ط | ظ | a | م | ژ |
| w | ص | ض | s | و | ز |
| e | ھ | ذ | d | ر | ڑ |
| r | د | ڈ | f | ن | ں |
| t | ٹ | ث | g | ل | ۂ |
| y | پ | ّ | h | ہ | ء |
| u | ت | ۃ | j | ا | آ |
| i | ب | ـ | k | ک | گ |
| o | ج | چ | l | ی | ي |
| p | ح | خ | ; | ؛ | : |
| z | ق | ZWJ | c | ے | ۓ |
| x | ف | ZWNJ | b | ش | ؤ |
| v | س | — | n | غ | ئ |
| m | ع | — | , | ، | > |
| . | ۔ | < | / | / | ؟ |

## 🗝️ Urdu Phonetic Key Mappings (Normal / Shift)

| Key | Normal | Shift | Key | Normal | Shift |
|-----|--------|-------|-----|--------|-------|
| q | ق | ْ | a | ا | آ |
| w | و | ٔ | s | س | ص |
| e | ع | ٰ | d | د | ڈ |
| r | ر | ڑ | f | ف | أ |
| t | ت | ٹ | g | گ | غ |
| y | ے | َ | h | ح | ھ |
| u | ء | ئ | j | ج | ض |
| i | ی | ِ | k | ک | خ |
| o | ہ | ۃ | l | ل | ٖ |
| p | پ | ُ | [ | ﷽ | ﷺ |
| ] | ﷲ | ﷻ | z | ز | ذ |
| x | ش | ژ | c | چ | ث |
| v | ط | ظ | b | ب | ً |
| n | ن | ں | m | م | ّ |
| , | ، | ٗ | . | ۔ | . |
| / | / | ؟ | | | |

---

## 🛠️ Technology Stack
- **HTML5 / CSS3 / Vanilla JavaScript** — zero dependencies
- **Google Fonts**: Noto Nastaliq Urdu, Noto Naskh Arabic, Roboto
- **Static site** — works offline, no backend

## 📱 Responsive Breakpoints
| Screen | Key Size |
|--------|----------|
| Desktop >768px | 44×52px full layout |
| Tablet ≤768px | 32×44px scaled |
| Mobile ≤520px | 25×38px compact |
