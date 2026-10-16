const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace the text
html = html.replace('Secure Gift Card Information Portal', 'Manage Your Gift Cards, Securely');

// Replace text-align:right with text-align:center in .topbar
html = html.replace('text-align:right;', 'text-align:center;');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Updated topbar text and alignment');
