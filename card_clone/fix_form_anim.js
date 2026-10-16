const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove consent label
html = html.replace(/<label class="consent">[\s\S]*?<\/label>/, '');

// 2. Remove Formspree note
html = html.replace(/<p class="note">[\s\S]*?<\/p>/, '');

// 3. Add CSS Animation for Tab Content
const animationCSS = `
  @keyframes slideFadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .tab-content {
    animation: slideFadeIn 0.35s ease-out forwards;
  }
</style>
`;
html = html.replace('</style>', animationCSS);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Removed text and added animation');
