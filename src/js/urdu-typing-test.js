import { initTypingTestPage } from './typing-test-page.js';
import { KEYS_STANDARD, KEYS_PHONETIC } from './urdu-keys.js';

initTypingTestPage({
  pageId: 'typing-test',
  langCode: 'ur',
  pageTitle: 'Urdu Typing Test - Fast Online Speed Test',
  keySets: [
    { name: 'standard', label: 'Urdu Standard Keyboard', keys: KEYS_STANDARD },
    { name: 'phonetic', label: 'Urdu Phonetic Keyboard', keys: KEYS_PHONETIC }
  ],
  keyboardLabel: 'Urdu',
  textFontVar: 'var(--font-urdu)'
});
