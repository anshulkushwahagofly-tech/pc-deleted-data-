const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('request', req => {
    if (req.url().includes('sanity') || req.url().includes('api')) {
      console.log('API REQ:', req.url());
    }
  });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await browser.close();
  process.exit(0);
})();
