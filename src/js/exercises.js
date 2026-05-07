// ═══════════════════════════════════════════
//  EXERCISES PAGE — Entry
// ═══════════════════════════════════════════

import '../styles/main.css';
import { initHeader } from './header.js';
import { initFooter } from './footer.js';
import { initKeyboard } from './keyboard-core.js';
import { KEYS_STANDARD as UR_KEYS } from './urdu-keys.js';
import { TypingEngine } from './typing-engine.js';

const EN_KEYS = Array.from({length: 47}, (_, i) => ({ n: '', s: '' }));

initHeader('');
initFooter();

// Drills Dictionary
const drills = {
  en: {
    home: "asdf jkl; asdf jkl; a s d f j k l ; sad lad fad fall glass flask dash slash",
    top: "qwer uiop qwer uiop q w e r u i o p quiet pour require upper power rope wipe",
    bottom: "zxcv m,./ zxcv m,./ z x c v m , . / zoom came maze crave brave zero cover"
  },
  ur: {
    // Basic home row equivalents in standard Urdu keyboard layout
    home: "ش س ی ب ل ا ت ن م ش س ی ب ل ا ت ن م بات نام سال بیل مال",
    top: "ق و ع ر ت ے ء ا و ق و ع ر ت ے ء ا و رات اور وقت طاق",
    bottom: "ز ط ظ خ ح ج چ ز ط ظ خ ح ج چ حق خط حج تاج"
  }
};

// DOM Elements
const exLangEl = document.getElementById('exercise-lang');
const exTypeEl = document.getElementById('exercise-type');
const btnRestart = document.getElementById('btn-restart');
const btnFocus = document.getElementById('btn-focus');

const keyboardEl = document.getElementById('keyboard');
const hiddenInputEl = document.getElementById('hidden-input');
const textDisplayEl = document.getElementById('text-display');
const typingTestBox = document.getElementById('typing-test-box');

// Stats Elements (using dummy elements for unused engine features)
const statErrEl = document.getElementById('stat-err');
const statAccEl = document.getElementById('stat-acc');

const kb = initKeyboard({
  output: hiddenInputEl,
  keyboardEl: keyboardEl,
  keySets: [
    { name: 'en', label: 'English', keys: EN_KEYS },
    { name: 'ur', label: 'Urdu', keys: UR_KEYS }
  ],
  langLabel: 'English',
  fontClass: '',
  saveUndo: () => {}
});

function updateKeyboardLayout(lang) {
  kb.switchLayout(lang === 'ur' ? 1 : 0);
  if (lang === 'ur') {
    typingTestBox.setAttribute('dir', 'rtl');
    textDisplayEl.style.fontFamily = 'var(--font-urdu)';
  } else {
    typingTestBox.setAttribute('dir', 'ltr');
    textDisplayEl.style.fontFamily = 'var(--font-ui)';
  }
}

// Init Engine
const engine = new TypingEngine({
  textDisplayEl,
  hiddenInputEl,
  statTimeEl: { textContent: '' }, // mock element
  statWpmEl: statErrEl, // hijacking WPM display to show something else, but actually we'll just let engine run
  statAccEl,
  onFinish: (stats) => {
    alert(`Drill Complete!\nAccuracy: ${stats.accuracy}%\nErrors: ${stats.errors}\nGreat job!`);
    startDrill(); // restart
  }
});

// Override the engine's updateStats to show errors instead of WPM
const originalUpdate = engine._updateStats.bind(engine);
engine._updateStats = function() {
  originalUpdate();
  // Override what the engine wrote
  statErrEl.textContent = this.errors;
};

function startDrill() {
  const lang = exLangEl.value;
  const type = exTypeEl.value;
  
  updateKeyboardLayout(lang);
  
  const text = drills[lang][type];
  
  // Start with a massive time limit (untimed drill)
  engine.startTest(text, 9999);
}

// Focus Mode Toggle
btnFocus.addEventListener('click', () => {
  document.body.classList.toggle('focus-mode');
  if (document.body.classList.contains('focus-mode')) {
    btnFocus.textContent = 'Exit Focus Mode';
  } else {
    btnFocus.textContent = 'Focus Mode';
  }
});

btnRestart.addEventListener('click', startDrill);
exLangEl.addEventListener('change', startDrill);
exTypeEl.addEventListener('change', startDrill);

startDrill();
