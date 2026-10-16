const fs = require('fs');
let html = fs.readFileSync('card_clone/index.html', 'utf8');

// The block currently looks like:
// .balance-tabs{
//       background: var(--blue2); /* match screenshot */
// 
//   width:100%;
// ...
//   background:#fff;

html = html.replace('.balance-tabs{\n      background: var(--blue2); /* match screenshot */\n\n  width:100%;\n  max-width:580px;\n  height:55px;\n\n  display:grid;\n  grid-template-columns:repeat(4,1fr);\n\n  background:#fff;\n  border:1px solid #e5e7eb;\n  border-radius:12px 12px 0 0;\n\n  overflow:hidden;\n  box-shadow:0 1px 4px rgba(16,24,40,.06);\n}', '.balance-tabs{\n  width:100%;\n  max-width:580px;\n  height:55px;\n  display:grid;\n  grid-template-columns:repeat(4,1fr);\n  background:var(--blue2);\n  border:1px solid #e5e7eb;\n  border-radius:12px 12px 0 0;\n  overflow:hidden;\n  box-shadow:0 1px 4px rgba(16,24,40,.06);\n}');

fs.writeFileSync('card_clone/index.html', html, 'utf8');
console.log('Fixed properly');
