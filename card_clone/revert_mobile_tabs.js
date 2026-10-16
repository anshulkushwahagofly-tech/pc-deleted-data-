const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remove .balance-tabs and .balance-tab from @media (max-width: 600px)
const tabsRegex = /\.balance-tabs\s*\{[\s\S]*?\}/;
html = html.replace(tabsRegex, '');

const tabRegex = /\.balance-tab\s*\{[\s\S]*?\}/;
html = html.replace(tabRegex, '');

// Clean up any double empty spaces
html = html.replace(/\s*\n\s*\n\s*\n/g, '\n\n');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Reverted tabs to 4 columns on mobile');
