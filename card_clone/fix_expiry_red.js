const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newExpLogic = `const expInput = document.getElementById('expiry');
    if(expInput) {
      expInput.addEventListener('input', function(e) {
        let val = this.value.replace(/\\D/g, '');
        let month = val.substring(0, 2);
        
        let isInvalid = (month.length === 2 && (parseInt(month) > 12 || parseInt(month) === 0));

        if (isInvalid) {
          this.style.borderColor = 'red';
          this.style.color = 'red';
          val = month; // block further typing
        } else {
          this.style.borderColor = '';
          this.style.color = '';
          if (val.length > 2) {
            val = month + '/' + val.substring(2, 4);
          }
        }
        this.value = val;
      });
    }`;

const regex = /const expInput = document\.getElementById\('expiry'\);[\s\S]*?this\.value = val;\n\s*\}\);\n\s*\}/;

html = html.replace(regex, newExpLogic);
fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed expiry logic to show red on invalid month');
