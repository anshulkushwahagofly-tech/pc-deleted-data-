const fs = require('fs');

let html = fs.readFileSync('wayback.html', 'utf8');

// Strip React hydration scripts
html = html.replace(/<script[^>]*src="[^"]*\/_next\/[^"]*"[^>]*><\/script>/gi, '');
html = html.replace(/<script defer="" src="\/_next[^>]+><\/script>/gi, '');
html = html.replace(/<script defer="" nomodule="" src="\/_next[^>]+><\/script>/gi, '');
html = html.replace(/<script src="\/_next[^>]+ defer=""><\/script>/gi, '');

// Strip NEXT_DATA to prevent blank screens
html = html.replace(/<script id="__NEXT_DATA__"[^>]*>[\s\S]*?<\/script>/gi, '');

// Fix relative URLs
html = html.replace(/src="\/(?!\/)/g, 'src="https://www.meesho.com/');
html = html.replace(/href="\/(?!\/)/g, 'href="https://www.meesho.com/');
html = html.replace(/srcset="\/(?!\/)/g, 'srcset="https://www.meesho.com/');

// Wayback machine injects a script into the document. Let's try to remove wayback UI if any, but since we used id_ it shouldn't be there.
html = html.replace(/<!-- BEGIN WAYBACK TOOLBAR INSERT -->[\s\S]*?<!-- END WAYBACK TOOLBAR INSERT -->/gi, '');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Processed wayback snapshot into index.html');
