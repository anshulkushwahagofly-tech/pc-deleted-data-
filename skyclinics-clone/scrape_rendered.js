const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set viewport to desktop
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log('Navigating to skyclinics.al...');
  await page.goto('https://skyclinics.al/', { waitUntil: 'networkidle0', timeout: 60000 });
  
  // Wait a bit for 3D and animations to settle
  await new Promise(r => setTimeout(r, 5000));
  
  console.log('Extracting HTML...');
  // Get the fully rendered HTML
  let html = await page.evaluate(() => document.documentElement.outerHTML);
  
  // Save the rendered HTML
  fs.writeFileSync('rendered.html', '<!DOCTYPE html>\n<html lang="en">\n' + html + '\n</html>');
  
  console.log('Saved rendered.html');
  await browser.close();
  process.exit(0);
})();
