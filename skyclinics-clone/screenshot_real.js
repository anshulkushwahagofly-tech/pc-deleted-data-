const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://skyclinics.al/', { waitUntil: 'networkidle0', timeout: 60000 });
  
  await new Promise(r => setTimeout(r, 8000));
  
  await page.screenshot({ path: 'real_skyclinics.png' });
  await browser.close();
  process.exit(0);
})();
