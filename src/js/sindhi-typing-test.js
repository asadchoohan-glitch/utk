import { initTypingTestPage } from './typing-test-page.js';
import { KEYS_SINDHI } from './sindhi-keys.js';

initTypingTestPage({
  pageId: 'typing-test',
  langCode: 'sd',
  pageTitle: 'Sindhi Typing Test - Fast Online Speed Test',
  keySets: [{ name: 'sindhi', label: 'Sindhi Keyboard', keys: KEYS_SINDHI }],
  keyboardLabel: 'Sindhi',
  fontClass: 'font-arabic',
  textFontVar: 'var(--font-arabic)'
});
