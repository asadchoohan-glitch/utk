// ═══════════════════════════════════════════
//  ARABIC KEYBOARD — Page Entry
// ═══════════════════════════════════════════

import '../styles/main.css';
import { initHeader } from './header.js';
import { initFooter } from './footer.js';
import { initTextActions } from './text-actions.js';
import { initKeyboard } from './keyboard-core.js';
import { KEYS_STANDARD, KEYS_AZERTY } from './arabic-keys.js';

// Init header & footer
initHeader('arabic');
initFooter();

// Get elements
const output = document.getElementById('output');
const keyboardEl = document.getElementById('keyboard');

// Arabic textarea uses Arabic font
output.classList.add('font-arabic');

// Init text actions
const actions = initTextActions(output, {
  lang: 'ar',
  filename: 'arabic-text.txt'
});

// Init keyboard
const kb = initKeyboard({
  output,
  keyboardEl,
  keySets: [
    { name: 'standard', label: 'Arabic (102) Standard', keys: KEYS_STANDARD },
    { name: 'azerty', label: 'Arabic (102) AZERTY', keys: KEYS_AZERTY },
  ],
  langLabel: 'Arabic',
  fontClass: 'font-arabic',
  saveUndo: actions.saveUndo,
});

// Radio switcher
document.querySelectorAll('input[name="kb-layout"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const idx = radio.value === 'azerty' ? 1 : 0;
    kb.switchLayout(idx);
  });
});
