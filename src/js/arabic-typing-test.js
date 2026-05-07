import { initTypingTestPage } from './typing-test-page.js';
import { KEYS_STANDARD, KEYS_AZERTY } from './arabic-keys.js';

initTypingTestPage({
  pageId: 'typing-test',
  langCode: 'ar',
  pageTitle: 'Arabic Typing Test - Fast Online Speed Test',
  keySets: [
    { name: 'standard', label: 'Arabic Standard Keyboard', keys: KEYS_STANDARD },
    { name: 'azerty', label: 'Arabic AZERTY Keyboard', keys: KEYS_AZERTY }
  ],
  keyboardLabel: 'Arabic',
  fontClass: 'font-arabic',
  textFontVar: 'var(--font-arabic)'
});
