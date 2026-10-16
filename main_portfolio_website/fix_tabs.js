const fs = require('fs');
let html = fs.readFileSync('card_clone/index.html', 'utf8');

// 1. Fix Button Styles
let buttonStyles = `.balance-tab{
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:14px;
  color:var(--white);
  cursor:pointer;
  border:none;
  background:transparent;
  font-family:inherit;
  padding:0;
  outline:none;
}`;
html = html.replace(/\.balance-tab\{[\s\S]*?cursor:pointer;\s*\}/, buttonStyles);

// 2. Fix the active state color
// In the user's screenshot, inactive tabs are white/grey text. Active is blue text? No, active is bright blue text.
html = html.replace('color:var(--line); /* match screenshot text */', ''); // cleanup my old hack if still there
html = html.replace('color:#007bff; /* bright blue active */', 'color:#00d2ff;');

// 3. Add JS for selectTab
const jsCode = `
  <script>
    function selectTab(btn) {
      // Remove active from all tabs
      document.querySelectorAll('.balance-tab').forEach(t => t.classList.remove('active'));
      // Add active to clicked
      btn.classList.add('active');
    }
    
    // Prevent selecting a future date of birth.
`;
html = html.replace('  <script>\n    // Prevent selecting a future date of birth.', jsCode);

fs.writeFileSync('card_clone/index.html', html, 'utf8');
console.log("Fixed button styles and added JS");
