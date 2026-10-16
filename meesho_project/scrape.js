const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set user agent to real browser
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  
  console.log('Navigating to meesho...');
  await page.goto('https://www.meesho.com/', { waitUntil: 'networkidle2', timeout: 60000 });
  
  console.log('Extracting HTML...');
  // Strip script tags so React doesn't ruin it later
  await page.evaluate(() => {
    document.querySelectorAll('script').forEach(s => s.remove());
  });
  
  let html = await page.content();
  
  console.log('Saving...');
  
  // Fix relative URLs
  html = html.replace(/src="\//g, 'src="https://www.meesho.com/');
  html = html.replace(/href="\/(?!\/)/g, 'href="https://www.meesho.com/');
  
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('Done!');
  await browser.close();
})();
