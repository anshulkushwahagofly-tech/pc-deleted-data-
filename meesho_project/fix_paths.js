const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace relative srcs
html = html.replace(/src="\//g, 'src="https://www.meesho.com/');
// Replace relative hrefs (except #)
html = html.replace(/href="\/(?!\/)/g, 'href="https://www.meesho.com/');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed relative paths');
