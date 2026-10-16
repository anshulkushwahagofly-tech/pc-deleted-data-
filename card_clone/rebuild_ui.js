const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix .card-container to hold the border and shadow
html = html.replace('<div class="card-container" style="width:100%; max-width:580px; display:flex; flex-direction:column;">', 
  '<div class="card-container" style="width:100%; max-width:580px; display:flex; flex-direction:column; background:#fff; border-radius:12px; box-shadow:0 10px 30px rgba(18,60,115,0.13); border:1px solid #e2e8ef; overflow:hidden;">'
);

// 2. Remove inline border-radius/border from balance-tabs html (we'll do it in css)
html = html.replace('<div class="balance-tabs" style="max-width:100%; border-bottom:none; border-radius:12px 12px 0 0;">', '<div class="balance-tabs">');

// 3. Fix CSS for .balance-tabs
const tabsCss = `.balance-tabs{
  width:100%;
  height:55px;
  display:grid;
  grid-template-columns:repeat(4,1fr);
  background:var(--blue); /* Slightly lighter than blue2 for the tabs */
  border-bottom:1px solid var(--blue2);
}`;
html = html.replace(/\.balance-tabs\{[^}]*\}/, tabsCss);

// 4. Fix CSS for .balance-tab
const tabCss = `.balance-tab{
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
  text-align:center;
  font-size:14px;
  color:#d7dee8;
  cursor:pointer;
  border:none;
  border-right: 1px solid rgba(255,255,255,0.15);
  background:transparent;
  font-family:inherit;
  padding:0 5px;
  outline:none;
  transition: 0.2s all;
  line-height:1.2;
}`;
html = html.replace(/\.balance-tab\{[^}]*\}/, tabCss);

// 5. Fix CSS for .panel
const panelCss = `.panel{
  width:100%;
  background:#fff;
  padding:30px;
}`;
html = html.replace(/\.panel\{[^}]*\}/, panelCss);

// 6. Fix active state
const activeCss = `.balance-tab.active{
  color:#fff;
  font-weight:bold;
  background: var(--blue2); /* Active tab is darker! */
}`;
html = html.replace(/\.balance-tab\.active\{[^}]*\}/, activeCss);


fs.writeFileSync('index.html', html, 'utf8');
console.log('UI rebuilt');
