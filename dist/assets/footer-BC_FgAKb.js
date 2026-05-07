(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function d(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=d(e);fetch(e.href,t)}})();const h=[{href:"/",label:"Urdu",flag:"🇵🇰",id:"urdu"},{href:"/sindhi",label:"Sindhi",flag:"🕌",id:"sindhi"},{href:"/arabic",label:"Arabic",flag:"🇸🇦",id:"arabic"},{label:"Typing Test",id:"typing-test",dropdown:[{href:"/urdu-typin-test",label:"Urdu Typing Test"},{href:"/sindhi-typing-test",label:"Sindhi Typing Test"},{href:"/arabic-typing-test",label:"Arabic Typing Test"}]},{href:"/about",label:"About",flag:"",id:"about"},{href:"/contact",label:"Contact",flag:"",id:"contact"}];function b(i){const l=document.createElement("nav");l.className="site-nav",l.id="site-nav";const d=document.createElement("div");d.className="nav-inner";const s=document.createElement("a");s.className="nav-brand",s.href="/",s.innerHTML='<span class="nav-brand-icon">⌨️</span> Online Keyboards';const e=document.createElement("button");e.className="nav-toggle",e.id="nav-toggle",e.setAttribute("aria-label","Toggle navigation"),e.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';const t=document.createElement("ul");t.className="nav-links",t.id="nav-links",h.forEach(n=>{const r=document.createElement("li");if(n.dropdown){r.className="nav-item-dropdown";const o=document.createElement("a");o.className="nav-link"+(n.id===i?" active":""),o.href="#",o.textContent=n.label+" ▼";const u=document.createElement("ul");u.className="nav-dropdown-menu",n.dropdown.forEach(p=>{const m=document.createElement("li"),c=document.createElement("a");c.className="nav-dropdown-link",c.href=p.href,c.textContent=p.label,m.appendChild(c),u.appendChild(m)}),r.appendChild(o),r.appendChild(u)}else{const o=document.createElement("a");o.className="nav-link"+(n.id===i?" active":""),o.href=n.href,n.flag?o.innerHTML=`<span class="flag">${n.flag}</span> ${n.label}`:o.textContent=n.label,r.appendChild(o)}t.appendChild(r)});const a=document.createElement("button");a.className="theme-toggle",a.id="theme-toggle",a.setAttribute("aria-label","Toggle dark mode");const f=localStorage.getItem("kb-theme")||"light";document.documentElement.setAttribute("data-theme",f),a.textContent=f==="dark"?"☀️":"🌙",a.addEventListener("click",()=>{const r=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",r),localStorage.setItem("kb-theme",r),a.textContent=r==="dark"?"☀️":"🌙"}),d.appendChild(s),d.appendChild(e),d.appendChild(t),d.appendChild(a),l.appendChild(d),document.body.insertBefore(l,document.body.firstChild),e.addEventListener("click",()=>{t.classList.toggle("open")}),t.addEventListener("click",n=>{n.target.closest(".nav-link")&&t.classList.remove("open")})}function g(){const i=document.createElement("footer");i.className="site-footer",i.id="site-footer",i.innerHTML=`
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
  `,document.body.appendChild(i)}export{g as a,b as i};
