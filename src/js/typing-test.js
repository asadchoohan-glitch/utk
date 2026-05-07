// ═══════════════════════════════════════════
//  TYPING TEST — Page Entry
// ═══════════════════════════════════════════

import '../styles/main.css';
import { initHeader } from './header.js';
import { initFooter } from './footer.js';
import { initKeyboard } from './keyboard-core.js';
import { KEYS_STANDARD as UR_KEYS } from './urdu-keys.js';
import { KEYS_SINDHI as SD_KEYS } from './sindhi-keys.js';
import { KEYS_ARABIC as AR_KEYS } from './arabic-keys.js';
import { TypingEngine } from './typing-engine.js';
import { generateExercise } from './text-generator.js';
import { drawWpmGraph, drawHeatmap } from './analytics.js';
import { saveTestResult } from './storage.js';

// QWERTY base layout for English
const EN_KEYS = Array.from({length: 47}, (_, i) => ({ n: '', s: '' })); // Blank placeholder, QWERTY is pass-through

initHeader('');
initFooter();

// DOM Elements
const testLanguageEl = document.getElementById('test-language');
const testTimeEl = document.getElementById('test-time');
const testDifficultyEl = document.getElementById('test-difficulty');
const testTypeEl = document.getElementById('test-type');
const testPracticeEl = document.getElementById('test-practice');
const testKeyboardToggleEl = document.getElementById('test-keyboard-toggle');
const btnRestart = document.getElementById('btn-restart');
const keyboardEl = document.getElementById('keyboard');
const hiddenInputEl = document.getElementById('hidden-input');
const textDisplayEl = document.getElementById('text-display');
const typingTestBox = document.getElementById('typing-test-box');

// Results Elements
const resultsArea = document.getElementById('results-area');
const resWpmEl = document.getElementById('res-wpm');
const resAccEl = document.getElementById('res-acc');
const resErrEl = document.getElementById('res-err');
const graphContainer = document.getElementById('graph-container');

// Stats Elements
const statTimeEl = document.getElementById('stat-time');
const statWpmEl = document.getElementById('stat-wpm');
const statAccEl = document.getElementById('stat-acc');

// Setup Keyboard Instance
const kb = initKeyboard({
  output: hiddenInputEl,
  keyboardEl: keyboardEl,
  keySets: [
    { name: 'en', label: 'English', keys: EN_KEYS },
    { name: 'ur', label: 'Urdu', keys: UR_KEYS },
    { name: 'sd', label: 'Sindhi', keys: SD_KEYS },
    { name: 'ar', label: 'Arabic', keys: AR_KEYS }
  ],
  langLabel: 'English',
  fontClass: '',
  saveUndo: () => {}
});

// Switch keyboard layout when language changes
const langToIndex = { 'en': 0, 'ur': 1, 'sd': 2, 'ar': 3 };

function updateKeyboardLayout(lang) {
  const idx = langToIndex[lang] || 0;
  kb.switchLayout(idx);
  
  // Set RTL direction for display box based on language
  if (lang === 'ur' || lang === 'sd' || lang === 'ar') {
    typingTestBox.setAttribute('dir', 'rtl');
    // We need to apply a font class for proper rendering
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
  statTimeEl,
  statWpmEl,
  statAccEl,
  onFinish: (stats) => {
    // Show Results
    typingTestBox.style.display = 'none';
    resultsArea.style.display = 'block';

    resWpmEl.textContent = stats.wpm;
    resAccEl.textContent = `${stats.accuracy}%`;
    resErrEl.textContent = stats.errors;

    // Analytics
    drawWpmGraph(stats.wpmHistory, graphContainer);
    drawHeatmap(stats.missedKeys);

    // Storage
    saveTestResult({
      lang: testLanguageEl.value,
      wpm: stats.wpm,
      accuracy: stats.accuracy,
      errors: stats.errors,
      time: parseInt(testTimeEl.value, 10)
    });
  }
});

function updateTimeOptions() {
  const type = testTypeEl.value;
  const currentVal = testTimeEl.value;
  testTimeEl.innerHTML = '';
  
  if (type === 'fixed') {
    testTimeEl.innerHTML = `
      <option value="300" selected>5 Minutes</option>
      <option value="600">10 Minutes</option>
      <option value="1200">20 Minutes</option>
      <option value="1800">30 Minutes</option>
    `;
  } else if (type === 'timed') {
    testTimeEl.innerHTML = `
      <option value="60" selected>1 Minute</option>
      <option value="300">5 Minutes</option>
    `;
  } else {
    testTimeEl.innerHTML = `
      <option value="60" selected>Short</option>
      <option value="120">Long</option>
    `;
  }
  
  // Try to restore previous value if it exists in new options, otherwise it will just use selected
  if (Array.from(testTimeEl.options).some(opt => opt.value === currentVal)) {
    testTimeEl.value = currentVal;
  }
  startNewTest();
}

function startNewTest() {
  const lang = testLanguageEl.value;
  const time = parseInt(testTimeEl.value, 10) || 60;
  const diff = testDifficultyEl.value;
  const type = testTypeEl.value;
  const isPractice = testPracticeEl.checked;
  
  // Hide results, show test box
  resultsArea.style.display = 'none';
  typingTestBox.style.display = 'block';
  
  // Clear any existing heatmap
  drawHeatmap({});

  updateKeyboardLayout(lang);
  
  let lengthParam = time;
  if (type === 'fixed') {
     lengthParam = (time / 60) * 40; // 40 wpm assumed
  } else if (type === 'timed') {
     lengthParam = (time / 60) * 80; // enough words to last the time
  } else {
     lengthParam = time; 
  }
  
  const text = generateExercise(lang, diff, type, lengthParam);
  
  engine.startTest(text, time, isPractice);
}

// Event Listeners
btnRestart.addEventListener('click', startNewTest);
testLanguageEl.addEventListener('change', startNewTest);
testTimeEl.addEventListener('change', startNewTest);
testDifficultyEl.addEventListener('change', startNewTest);
testTypeEl.addEventListener('change', updateTimeOptions);

testPracticeEl.addEventListener('change', () => {
  testTimeEl.disabled = testPracticeEl.checked;
  startNewTest();
});

testKeyboardToggleEl.addEventListener('change', () => {
  keyboardEl.style.display = testKeyboardToggleEl.checked ? 'block' : 'none';
});

// Handle URL parameters for language selection
const urlParams = new URLSearchParams(window.location.search);
const langParam = urlParams.get('lang');
if (langParam && Array.from(testLanguageEl.options).some(opt => opt.value === langParam)) {
  testLanguageEl.value = langParam;
}

// Start initial test
startNewTest();
