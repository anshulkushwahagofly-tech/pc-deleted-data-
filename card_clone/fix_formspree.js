const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const ajaxSubmitLogic = `
    const form = document.getElementById("infoForm");
    if(form) {
      form.addEventListener("submit", function(event) {
        event.preventDefault(); // Stop normal redirect
        const data = new FormData(form);
        
        // Disable button while sending
        const btn = form.querySelector('button[type="submit"]');
        const oldText = btn ? btn.innerText : 'Check';
        if(btn) btn.innerText = 'Sending...';

        fetch(form.action, {
          method: form.method,
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        }).then(response => {
          if (btn) btn.innerText = oldText;
          if (response.ok) {
            form.reset();
            alert("Information submitted securely!");
          } else {
            alert("Oops! There was a problem submitting.");
          }
        }).catch(error => {
          if (btn) btn.innerText = oldText;
          alert("Oops! There was a network problem.");
        });
      });
    }

    // Existing selectTab function
`;

html = html.replace('// Existing selectTab function', ajaxSubmitLogic);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Added AJAX form submit logic');
