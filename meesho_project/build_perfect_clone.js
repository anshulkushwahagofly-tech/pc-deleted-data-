const fs = require('fs');

// Read the perfect 155KB raw HTML from the previous successful clone attempt
let html = fs.readFileSync('../meesho_clone/index.html', 'utf8');

// 1. STRIP NEXT.JS REACT HYDRATION SCRIPTS
// These scripts run on page load and crash because they are on a different domain, destroying the DOM.
// We remove them to keep the static, pre-rendered DOM intact.
html = html.replace(/<script[^>]*src="[^"]*\/_next\/[^"]*"[^>]*><\/script>/gi, '');
html = html.replace(/<script defer="" src="\/_next[^>]+><\/script>/gi, '');
html = html.replace(/<script defer="" nomodule="" src="\/_next[^>]+><\/script>/gi, '');
html = html.replace(/<script src="\/_next[^>]+ defer=""><\/script>/gi, '');

// Also strip inline scripts that contain React data which might cause issues
html = html.replace(/<script id="__NEXT_DATA__"[^>]*>[\s\S]*?<\/script>/gi, '');

// 2. FIX RELATIVE ASSET URLS
// Make all relative paths point to the absolute live Meesho domain.
html = html.replace(/src="\/(?!\/)/g, 'src="https://www.meesho.com/');
html = html.replace(/href="\/(?!\/)/g, 'href="https://www.meesho.com/');
html = html.replace(/srcset="\/(?!\/)/g, 'srcset="https://www.meesho.com/');

// Save it
fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully generated the perfect static SSR clone!');
