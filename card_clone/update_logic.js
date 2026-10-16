const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Update Expiry Logic
const newExpLogic = `const expInput = document.getElementById('expiry');
    if(expInput) {
      expInput.addEventListener('input', function(e) {
        let val = this.value.replace(/\\D/g, '');
        let month = val.substring(0, 2);
        let year = val.substring(2, 4);
        
        let isInvalidMonth = (month.length === 2 && (parseInt(month) > 12 || parseInt(month) === 0));
        let isInvalidYear = (year.length === 2 && parseInt(year) < 26);

        if (isInvalidMonth || isInvalidYear) {
          this.parentElement.style.borderColor = 'red';
          this.style.color = 'red';
          if (isInvalidMonth) {
             val = month; // block year typing if month is bad
          } else {
             val = month + '/' + year; // keep showing the invalid year so they can correct it
          }
        } else {
          this.parentElement.style.borderColor = '';
          this.style.color = '';
          if (val.length > 2) {
            val = month + '/' + year;
          } else {
            val = month;
          }
        }
        this.value = val;
      });
    }`;

// Find existing expInput block and replace it
const regex = /const expInput = document\.getElementById\('expiry'\);[\s\S]*?this\.value = val;\n\s*\}\);\n\s*\}/;
html = html.replace(regex, newExpLogic);

// 2. Update Alert Message
html = html.replace('alert("this survise this time not avlable");', 'alert("This site is currently under maintenance. Please check back later.");');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed expiry year and alert message');
