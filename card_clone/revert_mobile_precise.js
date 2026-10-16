const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The exact string in the media query
const mediaString = `
    /* Mobile Tab fixes */
  @media (max-width: 600px) {
    .balance-tabs {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      height: auto !important;
    }
    
    .balance-tab {
      height: 48px !important;
      padding: 0 5px !important;
      font-size: 13px !important;
    }
`;

const replacedString = `
    /* Mobile Tab fixes */
  @media (max-width: 600px) {
`;

// Replace it precisely
html = html.replace(mediaString, replacedString);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed precisely');
