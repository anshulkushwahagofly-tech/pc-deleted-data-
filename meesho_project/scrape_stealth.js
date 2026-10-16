const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs');

(async () => {
  console.log('Launching stealth browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  console.log('Navigating to meesho...');
  await page.setViewport({ width: 1920, height: 1080 });
  
  // Go to site and wait for it to load completely
  await page.goto('https://www.meesho.com/', { waitUntil: 'networkidle0', timeout: 60000 });
  
  console.log('Scrolling to load lazy images...');
  await page.evaluate(async () => {
      await new Promise((resolve) => {
          let totalHeight = 0;
          let distance = 300;
          let timer = setInterval(() => {
              let scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;
              if(totalHeight >= scrollHeight - window.innerHeight || totalHeight > 10000){
                  clearInterval(timer);
                  resolve();
              }
          }, 100);
      });
  });
  
  // Wait a bit more for images to load
  await new Promise(r => setTimeout(r, 2000));
  
  console.log('Extracting HTML...');
  // Strip ALL script tags so React doesn't ruin it when served from GitHub Pages
  await page.evaluate(() => {
    document.querySelectorAll('script').forEach(s => s.remove());
    // Also remove noscript which sometimes has fallbacks that mess up layout
    document.querySelectorAll('noscript').forEach(s => s.remove());
  });
  
  let html = await page.content();
  
  console.log('Saving...');
  
  // Fix relative URLs so images/icons load from live site
  html = html.replace(/src="\//g, 'src="https://www.meesho.com/');
  html = html.replace(/href="\/(?!\/)/g, 'href="https://www.meesho.com/');
  html = html.replace(/srcset="\//g, 'srcset="https://www.meesho.com/');
  
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('Done! HTML size:', html.length);
  await browser.close();
})();
