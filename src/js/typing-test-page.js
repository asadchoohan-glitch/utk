import '../styles/main.css';
import { initHeader } from './header.js';
import { initFooter } from './footer.js';
import { initKeyboard } from './keyboard-core.js';
import { TypingEngine } from './typing-engine.js';
import { generateExercise } from './text-generator.js';

const MODE_TO_DIFFICULTY = {
  basic: 'simple',
  advanced: 'intermediate',
  expert: 'expert'
};

const SETTINGS_KEY = 'typing-test-settings';

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function pickExerciseType(mode) {
  return mode === 'expert' ? 'paragraph' : 'words';
}

export function initTypingTestPage(config) {
  const {
    pageId,
    langCode,
    pageTitle,
    keySets,
    keyboardLabel,
    fontClass = '',
    textFontVar = 'var(--font-urdu)'
  } = config;

  initHeader(pageId);
  initFooter();

  const modeEl = document.getElementById('test-mode');
  const timeEl = document.getElementById('test-time');
  const startPauseBtn = document.getElementById('btn-start-pause');
  const restartBtn = document.getElementById('btn-restart');
  const retryBtn = document.getElementById('btn-retry');
  const keyboardToggleEl = document.getElementById('toggle-keyboard');
  const keyboardEl = document.getElementById('keyboard');
  const textDisplayEl = document.getElementById('text-display');
  const hiddenInputEl = document.getElementById('user-input');
  const testBoxEl = document.getElementById('typing-test-box');
  const testPanelEl = document.getElementById('typing-test-panel');
  const resultPanelEl = document.getElementById('result-panel');
  const activeModeLabelEl = document.getElementById('active-mode-label');
  const activeTimeLabelEl = document.getElementById('active-time-label');

  const statTimeEl = document.getElementById('stat-time');
  const statWpmEl = document.getElementById('stat-wpm');
  const statAccEl = document.getElementById('stat-acc');
  const statErrEl = document.getElementById('stat-errors');
  const statCharsEl = document.getElementById('stat-chars');

  const resWpmEl = document.getElementById('res-wpm');
  const resAccEl = document.getElementById('res-acc');
  const resErrEl = document.getElementById('res-err');
  const resCharsEl = document.getElementById('res-chars');

  textDisplayEl.style.fontFamily = textFontVar;
  hiddenInputEl.style.fontFamily = textFontVar;
  testBoxEl.setAttribute('dir', 'rtl');
  hiddenInputEl.setAttribute('dir', 'rtl');

  const savedSettings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
  if (savedSettings[langCode]?.mode) modeEl.value = savedSettings[langCode].mode;
  if (savedSettings[langCode]?.time) timeEl.value = savedSettings[langCode].time;
  if (typeof savedSettings[langCode]?.showKeyboard === 'boolean') {
    keyboardToggleEl.checked = savedSettings[langCode].showKeyboard;
  }
  keyboardEl.style.display = keyboardToggleEl.checked ? 'block' : 'none';

  const kb = initKeyboard({
    output: hiddenInputEl,
    keyboardEl,
    keySets,
    langLabel: keyboardLabel,
    fontClass,
    saveUndo: () => {}
  });
  kb.switchLayout(0);

  const engine = new TypingEngine({
    textDisplayEl,
    hiddenInputEl,
    statTimeEl,
    statWpmEl,
    statAccEl,
    onFinish: (stats) => {
      updateResults(stats);
      testPanelEl.hidden = true;
      resultPanelEl.hidden = false;
      startPauseBtn.textContent = 'Start';
      startPauseBtn.disabled = false;
      hiddenInputEl.readOnly = true;
    }
  });

  let hasStarted = false;
  let isPaused = false;
  let activeTime = Number(timeEl.value);

  function persistSettings() {
    const existing = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
    existing[langCode] = {
      mode: modeEl.value,
      time: timeEl.value,
      showKeyboard: keyboardToggleEl.checked
    };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(existing));
  }

  function updateLiveSecondaryStats(stats) {
    statErrEl.textContent = String(stats.errors);
    statCharsEl.textContent = String(stats.totalTyped);
    statTimeEl.textContent = formatTime(engine.timeLeft);
  }

  function updateResults(stats) {
    resWpmEl.textContent = String(stats.wpm);
    resAccEl.textContent = `${stats.accuracy}%`;
    resErrEl.textContent = String(stats.errors);
    resCharsEl.textContent = String(stats.totalTyped);
  }

  function resetLiveStats() {
    statWpmEl.textContent = '0';
    statAccEl.textContent = '100%';
    statErrEl.textContent = '0';
    statCharsEl.textContent = '0';
    statTimeEl.textContent = formatTime(activeTime);
  }

  function createText() {
    const mode = modeEl.value;
    const difficulty = MODE_TO_DIFFICULTY[mode];
    const type = pickExerciseType(mode);
    const baseWords = Math.max(140, Math.ceil((activeTime / 60) * 150));
    return generateExercise(langCode, difficulty, type, baseWords);
  }

  function prepareAttempt() {
    persistSettings();
    activeTime = Number(timeEl.value);
    activeModeLabelEl.textContent = modeEl.options[modeEl.selectedIndex].textContent;
    activeTimeLabelEl.textContent = `${activeTime / 60} Minutes`;
    testPanelEl.hidden = false;
    resultPanelEl.hidden = true;
    startPauseBtn.textContent = 'Pause';
    hasStarted = true;
    isPaused = false;
    hiddenInputEl.readOnly = false;
    const text = createText();
    engine.startTest(text, activeTime, false);
    resetLiveStats();
    hiddenInputEl.focus();
  }

  function startOrTogglePause() {
    isPaused = engine.togglePause();
    hiddenInputEl.readOnly = isPaused;
    startPauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
    if (!isPaused) hiddenInputEl.focus();
  }

  hiddenInputEl.addEventListener('input', () => {
    const stats = engine.getStats();
    updateLiveSecondaryStats(stats);
  });

  modeEl.addEventListener('change', prepareAttempt);
  timeEl.addEventListener('change', prepareAttempt);
  keyboardToggleEl.addEventListener('change', () => {
    keyboardEl.style.display = keyboardToggleEl.checked ? 'block' : 'none';
    persistSettings();
  });

  startPauseBtn.addEventListener('click', startOrTogglePause);
  restartBtn.addEventListener('click', prepareAttempt);
  retryBtn.addEventListener('click', prepareAttempt);

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key.toLowerCase() === 'enter') {
      event.preventDefault();
      startOrTogglePause();
    }
    if (event.ctrlKey && event.key.toLowerCase() === 'r') {
      event.preventDefault();
      prepareAttempt();
    }
  });

  testBoxEl.addEventListener('click', () => hiddenInputEl.focus());

  // keep display updated each second for timer + secondary stats
  window.setInterval(() => {
    if (!engine.isFinished) {
      const stats = engine.getStats();
      updateLiveSecondaryStats(stats);
    }
  }, 250);

  document.title = pageTitle;
  prepareAttempt();
}
