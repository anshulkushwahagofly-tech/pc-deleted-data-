const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newExpLogic = `const expInput = document.getElementById('expiry');
    if(expInput) {
      expInput.addEventListener('input', function(e) {
        let val = this.value.replace(/\\D/g, '');
        if (val.length > 0) {
          let month = val.substring(0, 2);
          if (month.length === 2) {
            if (parseInt(month) > 12) month = '12';
            if (parseInt(month) === 0) month = '01';
          }
          if (val.length > 2) {
            val = month + '/' + val.substring(2, 4);
          } else {
            val = month;
          }
        }
        this.value = val;
      });
    }`;

// Replace the old block. I need a robust regex to find the old expInput block.
const regex = /const expInput = document\.getElementById\('expiry'\);[\s\S]*?this\.value = val;\n\s*\}\);\n\s*\}/;

html = html.replace(regex, newExpLogic);
fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed expiry logic');
