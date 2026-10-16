const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Center .lead text
html = html.replace('.lead{\n      font-size:18px;', '.lead{\n      text-align:center;\n      font-size:18px;');

// 2. Rewrite mobile media query for balance-tabs
const oldMobileTabsRegex = /\.balance-tabs\s*\{\s*display:\s*flex\s*!important;[\s\S]*?border-bottom:\s*1px\s*solid\s*#e2e8ef;\s*\}/;
const newMobileTabs = `.balance-tabs {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      height: auto !important;
    }`;

html = html.replace(oldMobileTabsRegex, newMobileTabs);

const oldMobileTabScrollbarRegex = /\.balance-tabs::-webkit-scrollbar\s*\{[\s\S]*?\}/;
html = html.replace(oldMobileTabScrollbarRegex, '');

const oldMobileTabRegex = /\.balance-tab\s*\{\s*flex:\s*0\s*0\s*auto;[\s\S]*?\}/;
const newMobileTab = `.balance-tab {
      height: 48px !important;
      padding: 0 5px !important;
      font-size: 13px !important;
    }`;
html = html.replace(oldMobileTabRegex, newMobileTab);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed mobile tabs and lead text alignment');
