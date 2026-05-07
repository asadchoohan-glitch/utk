// ═══════════════════════════════════════════════════════
//  HEADER / NAVIGATION — Injected into all pages
// ═══════════════════════════════════════════════════════

const NAV_ITEMS = [
  { href: '/', label: 'Urdu', flag: '🇵🇰', id: 'urdu' },
  { href: '/sindhi', label: 'Sindhi', flag: '🕌', id: 'sindhi' },
  { href: '/arabic', label: 'Arabic', flag: '🇸🇦', id: 'arabic' },
  { 
    label: 'Typing Test', 
    id: 'typing-test',
    dropdown: [
      { href: '/urdu-typing-test', label: 'Urdu Typing Test' },
      { href: '/sindhi-typing-test', label: 'Sindhi Typing Test' },
      { href: '/arabic-typing-test', label: 'Arabic Typing Test' }
    ]
  },
  { href: '/about', label: 'About', flag: '', id: 'about' },
  { href: '/contact', label: 'Contact', flag: '', id: 'contact' },
];

/**
 * Creates and inserts the site header navigation.
 * @param {string} activeId - The ID of the currently active page
 */
export function initHeader(activeId) {
  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.id = 'site-nav';

  const inner = document.createElement('div');
  inner.className = 'nav-inner';

  // Brand
  const brand = document.createElement('a');
  brand.className = 'nav-brand';
  brand.href = '/';
  brand.innerHTML = '<span class="nav-brand-icon">⌨️</span> Online Keyboards';

  // Hamburger toggle
  const toggle = document.createElement('button');
  toggle.className = 'nav-toggle';
  toggle.id = 'nav-toggle';
  toggle.setAttribute('aria-label', 'Toggle navigation');
  toggle.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;

  // Nav links
  const ul = document.createElement('ul');
  ul.className = 'nav-links';
  ul.id = 'nav-links';

  NAV_ITEMS.forEach(item => {
    const li = document.createElement('li');
    
    if (item.dropdown) {
      li.className = 'nav-item-dropdown';
      const a = document.createElement('a');
      a.className = 'nav-link' + (item.id === activeId ? ' active' : '');
      a.href = '#';
      a.textContent = item.label + ' ▼';
      
      const dropUl = document.createElement('ul');
      dropUl.className = 'nav-dropdown-menu';
      item.dropdown.forEach(subItem => {
        const subLi = document.createElement('li');
        const subA = document.createElement('a');
        subA.className = 'nav-dropdown-link';
        subA.href = subItem.href;
        subA.textContent = subItem.label;
        subLi.appendChild(subA);
        dropUl.appendChild(subLi);
      });
      
      li.appendChild(a);
      li.appendChild(dropUl);
    } else {
      const a = document.createElement('a');
      a.className = 'nav-link' + (item.id === activeId ? ' active' : '');
      a.href = item.href;
      if (item.flag) {
        a.innerHTML = `<span class="flag">${item.flag}</span> ${item.label}`;
      } else {
        a.textContent = item.label;
      }
      li.appendChild(a);
    }
    
    ul.appendChild(li);
  });

  // Dark mode toggle
  const themeBtn = document.createElement('button');
  themeBtn.className = 'theme-toggle';
  themeBtn.id = 'theme-toggle';
  themeBtn.setAttribute('aria-label', 'Toggle dark mode');
  const savedTheme = localStorage.getItem('kb-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('kb-theme', next);
    themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
  });

  // Assemble
  inner.appendChild(brand);
  inner.appendChild(toggle);
  inner.appendChild(ul);
  inner.appendChild(themeBtn);
  nav.appendChild(inner);

  // Insert as first child of body
  document.body.insertBefore(nav, document.body.firstChild);

  // Hamburger toggle handler
  toggle.addEventListener('click', () => {
    ul.classList.toggle('open');
  });

  // Close menu when clicking a link (mobile)
  ul.addEventListener('click', (e) => {
    if (e.target.closest('.nav-link')) {
      ul.classList.remove('open');
    }
  });
}
