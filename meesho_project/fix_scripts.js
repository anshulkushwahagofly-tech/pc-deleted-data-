const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Strip all script tags that load from /_next/
html = html.replace(/<script[^>]*src="[^"]*\/_next\/[^"]*"[^>]*><\/script>/gi, '');

// Also remove next data script if any
html = html.replace(/<script id="__NEXT_DATA__"[^>]*>[\s\S]*?<\/script>/gi, '');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Stripped Next.js scripts to prevent React hydration crash');
