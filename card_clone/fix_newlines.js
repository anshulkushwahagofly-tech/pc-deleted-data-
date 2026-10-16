const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace literal "\n" string with a real newline
html = html.replace(/\\n/g, '\n');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Done');
