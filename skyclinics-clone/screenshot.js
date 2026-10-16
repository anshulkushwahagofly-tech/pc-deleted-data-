const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  
  // Wait a bit for animations
  await new Promise(r => setTimeout(r, 2000));
  
  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
  process.exit(0);
})();
