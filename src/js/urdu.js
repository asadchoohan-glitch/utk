// ═══════════════════════════════════════════
//  URDU KEYBOARD — Page Entry
// ═══════════════════════════════════════════

import '../styles/main.css';
import { initHeader } from './header.js';
import { initFooter } from './footer.js';
import { initTextActions } from './text-actions.js';
import { initKeyboard } from './keyboard-core.js';
import { KEYS_STANDARD, KEYS_PHONETIC } from './urdu-keys.js';

// Init header & footer
initHeader('urdu');
initFooter();

// Get elements
const output = document.getElementById('output');
const keyboardEl = document.getElementById('keyboard');

// Init text actions
const actions = initTextActions(output, {
  lang: 'ur',
  filename: 'urdu-text.txt'
});

// Init keyboard
const kb = initKeyboard({
  output,
  keyboardEl,
  keySets: [
    { name: 'standard', label: 'Urdu Standard Keyboard', keys: KEYS_STANDARD },
    { name: 'phonetic', label: 'Phonetic Keyboard', keys: KEYS_PHONETIC },
  ],
  langLabel: 'Urdu',
  fontClass: '',
  saveUndo: actions.saveUndo,
});

// Radio switcher
document.querySelectorAll('input[name="kb-type"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const idx = radio.value === 'phonetic' ? 1 : 0;
    kb.switchLayout(idx);
  });
});
