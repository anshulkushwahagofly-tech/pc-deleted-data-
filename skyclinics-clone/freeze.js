const fs = require('fs');
let html = fs.readFileSync('rendered.html', 'utf8');

// Remove React JS bundles to freeze the UI
html = html.replace(/<script type="module" crossorigin src="[^"]+"><\/script>/g, '');
html = html.replace(/<link rel="modulepreload" crossorigin href="[^"]+">/g, '');

// Also remove the CORS proxy interceptor I added earlier (if it's in there somehow, though it shouldn't be in the original skyclinics.al)
html = html.replace(/<script>\s*const originalFetch = window\.fetch;[\s\S]*?<\/script>/g, '');

// Update paths to be relative for assets
html = html.replace(/href="\/assets\//g, 'href="./assets/');
html = html.replace(/src="\/assets\//g, 'src="./assets/');
html = html.replace(/href="\/images\//g, 'href="./images/');
html = html.replace(/src="\/images\//g, 'src="./images/');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Generated static editable index.html');
