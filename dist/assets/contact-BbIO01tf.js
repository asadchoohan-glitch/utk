import{i as m,a as d}from"./footer-BC_FgAKb.js";m("contact");d();window.handleContactSubmit=function(e){e.preventDefault();const t=document.getElementById("contact-name").value,n=document.getElementById("contact-email").value,o=document.getElementById("contact-subject").value,c=document.getElementById("contact-message").value,a=`Name: ${t}
Email: ${n}

${c}`;return window.location.href=`mailto:contact@onlinekeyboards.com?subject=${encodeURIComponent(o)}&body=${encodeURIComponent(a)}`,!1};
