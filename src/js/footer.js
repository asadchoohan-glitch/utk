// ═══════════════════════════════════════════════════════
//  FOOTER — Injected into all pages
// ═══════════════════════════════════════════════════════

/**
 * Creates and appends the site footer.
 */
export function initFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.id = 'site-footer';

  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-about">
        <div class="footer-brand"><span>⌨️</span> Online Keyboards</div>
        <p class="footer-desc">Free online keyboards for Urdu, Sindhi, and Arabic. Type in your language using your computer keyboard or mouse — no installation required.</p>
      </div>
      <div class="footer-col">
        <h4>Keyboards</h4>
        <ul>
          <li><a href="/">🇵🇰 Urdu Keyboard</a></li>
          <li><a href="/sindhi">🕌 Sindhi Keyboard</a></li>
          <li><a href="/arabic">🇸🇦 Arabic Keyboard</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Pages</h4>
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      &copy; ${new Date().getFullYear()} Online Keyboards. All rights reserved.
    </div>
  `;

  document.body.appendChild(footer);
}
