const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldColor = "{ L: '#fd1d1d', D: '#833ab4', F: '#fcb045' }"; // Old Insta
const newColor = "{ L: '#c13584', D: '#400080', F: '#f56040' }"; // New darker Insta

if (html.includes(oldColor)) {
    html = html.replace(oldColor, newColor);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log("Updated Instagram colors");
} else {
    console.log("Could not find the old color string");
}
