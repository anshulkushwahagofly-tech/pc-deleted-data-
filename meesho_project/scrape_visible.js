const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs');

(async () => {
  console.log('Launching visible browser...');
  // Headless false bypasses 99% of bot detection
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log('Navigating to meesho...');
  await page.goto('https://www.meesho.com/', { waitUntil: 'networkidle0', timeout: 60000 });
  
  console.log('Scrolling...');
  await page.evaluate(async () => {
      await new Promise((resolve) => {
          let totalHeight = 0;
          let distance = 400;
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
  
  await new Promise(r => setTimeout(r, 2000));
  
  console.log('Extracting HTML...');
  await page.evaluate(() => {
    document.querySelectorAll('script').forEach(s => s.remove());
    document.querySelectorAll('noscript').forEach(s => s.remove());
  });
  
  let html = await page.content();
  
  html = html.replace(/src="\//g, 'src="https://www.meesho.com/');
  html = html.replace(/href="\/(?!\/)/g, 'href="https://www.meesho.com/');
  html = html.replace(/srcset="\//g, 'srcset="https://www.meesho.com/');
  
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('Done! HTML size:', html.length);
  await browser.close();
})();
