const fs = require('fs');
const text = fs.readFileSync('assets/index-BsFwCvkF.js', 'utf8');
const regex = /['"](\/[^'"]+\.(glb|gltf|woff2|woff|ttf|json|png|jpg|webp))['"]/g;
let match;
const urls = new Set();
while ((match = regex.exec(text)) !== null) {
  urls.add(match[1]);
}
console.log([...urls].join('\n'));
