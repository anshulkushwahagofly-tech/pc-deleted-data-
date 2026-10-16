const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const injection = `
<script>
  const originalFetch = window.fetch;
  window.fetch = async function() {
    let url = arguments[0];
    let urlStr = typeof url === 'string' ? url : (url instanceof Request ? url.url : '');
    
    if (urlStr.includes('sanity.io')) {
      const types = ['translations', 'siteSettings', 'hero', 'clinicServices', 'reviews', 'journey', 'footer', 'locations', 'dentalTourism'];
      for (let t of types) {
        if (urlStr.includes('%22' + t + '%22') || urlStr.includes('"' + t + '"')) {
          return originalFetch('./data/' + t + '.json');
        }
      }
      // Fallback
      arguments[0] = 'https://corsproxy.io/?' + encodeURIComponent(urlStr);
    } else if (url instanceof Request && url.url.includes('sanity.io')) {
      arguments[0] = new Request('https://corsproxy.io/?' + encodeURIComponent(url.url), url);
    }
    return originalFetch.apply(this, arguments);
  };
</script>
`;

// Remove the old interceptor
html = html.replace(/<script>\s*const originalFetch = window\.fetch;[\s\S]*?<\/script>/g, '');

html = html.replace('<head>', '<head>\n' + injection);
fs.writeFileSync('index.html', html, 'utf8');
console.log('Injected local JSON interceptor.');
