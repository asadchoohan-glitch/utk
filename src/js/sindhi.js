// ═══════════════════════════════════════════
//  SINDHI KEYBOARD — Page Entry
// ═══════════════════════════════════════════

import '../styles/main.css';
import { initHeader } from './header.js';
import { initFooter } from './footer.js';
import { initTextActions } from './text-actions.js';
import { initKeyboard } from './keyboard-core.js';
import { KEYS_SINDHI } from './sindhi-keys.js';

// Init header & footer
initHeader('sindhi');
initFooter();

// Get elements
const output = document.getElementById('output');
const keyboardEl = document.getElementById('keyboard');

// Init text actions
const actions = initTextActions(output, {
  lang: 'sd',
  filename: 'sindhi-text.txt'
});

// Init keyboard
initKeyboard({
  output,
  keyboardEl,
  keySets: [
    { name: 'sindhi', label: 'Sindhi Keyboard', keys: KEYS_SINDHI },
  ],
  langLabel: 'Sindhi',
  fontClass: 'font-arabic',
  saveUndo: actions.saveUndo,
});
