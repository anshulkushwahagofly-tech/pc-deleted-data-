const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/margin-top:20px;"/g, 'display:block; margin:20px auto 0;"');
// Also the check form button:
html = html.replace('<button type="submit">Check</button>', '<button type="submit" style="display:block; margin:20px auto 0;">Check</button>');

// Ensure tab-content text is centered
html = html.replace(/<div id="content-check" class="tab-content" style="display:block;">/g, '<div id="content-check" class="tab-content" style="display:block; text-align:center;">');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed button alignments');
