// ═══════════════════════════════════════════
//  CONTACT PAGE — Entry
// ═══════════════════════════════════════════

import '../styles/main.css';
import { initHeader } from './header.js';
import { initFooter } from './footer.js';

initHeader('contact');
initFooter();

// Contact form handler — opens mailto
window.handleContactSubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const subject = document.getElementById('contact-subject').value;
  const message = document.getElementById('contact-message').value;
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  window.location.href = `mailto:contact@onlinekeyboards.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return false;
};
