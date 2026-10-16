const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const mobileCSS = `
  /* Mobile Tab fixes */
  @media (max-width: 600px) {
    .balance-tabs {
      display: flex !important;
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
      border-bottom: 1px solid #e2e8ef;
    }
    .balance-tabs::-webkit-scrollbar {
      display: none; /* hide scrollbar */
    }
    .balance-tab {
      flex: 0 0 auto;
      padding: 0 15px !important;
      font-size: 13px !important;
    }
    .panel {
      padding: 20px !important;
    }
    .hero {
      padding: 30px 15px !important;
    }
    h1 {
      font-size: 28px !important;
    }
    .lead {
      font-size: 15px !important;
    }
  }
</style>`;

html = html.replace('</style>', mobileCSS);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed mobile responsive CSS');
