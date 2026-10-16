const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace the success message
html = html.replace('alert("Information submitted securely!");', 'alert("this survise this time not avlable");');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Changed success message');
