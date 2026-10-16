const fs = require('fs');

const text = fs.readFileSync('assets/index-BsFwCvkF.js', 'utf8');
const matches = text.match(/['"][^'"]+\.svg['"]/g);
if (matches) {
  console.log([...new Set(matches)]);
} else {
  console.log('No SVGs found');
}
