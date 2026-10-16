const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix 1: Stop button:hover from ruining the tabs
// We add an explicit hover state for balance-tab
const hoverCss = `.balance-tab:hover {
  background: transparent !important;
  color: #155eef;
}`;

// Fix 2: Force button height and remove any stray margins
html = html.replace('.balance-tab{', '.balance-tab{\n  height:100%;\n  margin:0;\n  padding:0;');

// Append hover css after .balance-tab
html = html.replace(/\.balance-tab\.active\{/, hoverCss + '\n\n.balance-tab.active{');

// Fix 3: Ensure tabs container stretches children
html = html.replace('.balance-tabs{', '.balance-tabs{\n  align-items: stretch;\n  padding:0;\n  margin:0;');

fs.writeFileSync('index.html', html, 'utf8');
console.log('UI centering and hover fixed');
