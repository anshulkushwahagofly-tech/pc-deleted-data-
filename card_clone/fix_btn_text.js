const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace 'Sending...' with 'Checking...'
html = html.replace("btn.innerText = 'Sending...';", "btn.innerText = 'Checking...';");

fs.writeFileSync('index.html', html, 'utf8');
console.log('Changed button text during submit');
