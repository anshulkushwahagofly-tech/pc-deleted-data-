const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const injection = `
<script>
  const originalFetch = window.fetch;
  window.fetch = async function() {
    let url = arguments[0];
    if (typeof url === 'string' && url.includes('sanity.io')) {
      arguments[0] = 'https://corsproxy.io/?' + encodeURIComponent(url);
    } else if (url instanceof Request && url.url.includes('sanity.io')) {
      arguments[0] = new Request('https://corsproxy.io/?' + encodeURIComponent(url.url), url);
    }
    return originalFetch.apply(this, arguments);
  };
</script>
`;

html = html.replace('<head>', '<head>' + injection);
fs.writeFileSync('index.html', html, 'utf8');
console.log('Injected fetch interceptor.');
