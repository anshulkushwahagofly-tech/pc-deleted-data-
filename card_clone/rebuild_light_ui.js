const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Re-write .card-container to match light theme
html = html.replace(/<div class="card-container".*?>/, 
  '<div class="card-container" style="width:100%; max-width:580px; display:flex; flex-direction:column; background:#fff; border-radius:12px; box-shadow:0 10px 30px rgba(18,60,115,0.13); border:1px solid #e2e8ef; overflow:hidden; margin:auto;">'
);

// 2. Re-write .balance-tabs CSS
const tabsCss = `.balance-tabs{
  width:100%;
  height:55px;
  display:grid;
  grid-template-columns:repeat(4,1fr);
  background:#fff;
  border-bottom:1px solid #e2e8ef;
}`;
html = html.replace(/\.balance-tabs\{[^}]*\}/, tabsCss);

// 3. Re-write .balance-tab CSS
const tabCss = `.balance-tab{
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
  text-align:center;
  font-size:14px;
  color:#667085; /* light theme inactive text */
  cursor:pointer;
  border:none;
  background:transparent;
  font-family:inherit;
  padding:0 5px;
  outline:none;
  transition: 0.2s all;
  line-height:1.2;
}`;
html = html.replace(/\.balance-tab\{[^}]*\}/, tabCss);

// 4. Re-write .balance-tab.active CSS
const activeCss = `.balance-tab.active{
  color:#155eef;
  font-weight:600;
  background: transparent;
}`;
html = html.replace(/\.balance-tab\.active\{[^}]*\}/, activeCss);

// Fix the active indicator (bottom blue border)
const indicatorCss = `.balance-tab.active::after{
  content:"";
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  height:2px;
  background:#155eef;
}`;
html = html.replace(/\.balance-tab\.active::after\{[^}]*\}/, indicatorCss);

// 5. Re-write Panel H2 to center it exactly like screenshot
html = html.replace(/\.panel h2\{[^}]*\}/, `.panel h2{\n  margin:0 0 8px;\n  color:var(--text);\n  font-size:18px;\n  text-align:center;\n  font-weight:600;\n  margin-bottom:24px;\n}`);

// 6. Inject JS formatters before the closing script tag
const jsInject = `
    // Card Formatters
    const numInput = document.getElementById('number');
    if(numInput) {
      numInput.addEventListener('input', function(e) {
        let val = this.value.replace(/\\D/g, '');
        let formatted = val.match(/.{1,4}/g)?.join(' ') || '';
        this.value = formatted.substring(0, 19);
      });
    }

    const expInput = document.getElementById('expiry');
    if(expInput) {
      expInput.addEventListener('input', function(e) {
        let val = this.value.replace(/\\D/g, '');
        if (val.length > 2) {
          val = val.substring(0, 2) + '/' + val.substring(2, 4);
        }
        this.value = val;
      });
    }

    const cvvInput = document.getElementById('code');
    if(cvvInput) {
      cvvInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/\\D/g, '').substring(0, 4);
      });
    }

    // Existing selectTab function
`;

// Replace the start of the JS to inject our formatters safely
html = html.replace('function selectTab(btn) {', jsInject + 'function selectTab(btn) {');


fs.writeFileSync('index.html', html, 'utf8');
console.log('Light UI rebuilt & JS formatters added');
