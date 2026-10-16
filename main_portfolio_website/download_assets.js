const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');

const baseURL = 'https://card-six-omega.vercel.app/';
const dir = 'card_clone';

async function download() {
  const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
  const assetRegex = /(?:src|href)=["']([^"']+)["']/g;
  let match;
  const assets = [];
  while ((match = assetRegex.exec(html)) !== null) {
    let url = match[1];
    if (url.startsWith('data:')) continue;
    if (url.startsWith('#')) continue;
    if (url.startsWith('http')) {
        if(!url.includes('card-six-omega')) continue; // Skip external for now, or maybe download them? Let's just focus on relative
    }
    
    if(!url.startsWith('http')) {
        url = new URL(url, baseURL).href;
    }
    assets.push(url);
  }
  
  const uniqueAssets = [...new Set(assets)];
  console.log('Found assets:', uniqueAssets);
  
  for (const assetUrl of uniqueAssets) {
    try {
      const u = new URL(assetUrl);
      const relativePath = u.pathname.substring(1);
      if (!relativePath) continue;
      
      const targetPath = path.join(dir, relativePath);
      const targetDir = path.dirname(targetPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      console.log('Downloading', assetUrl, 'to', targetPath);
      const res = await fetch(assetUrl);
      const buffer = await res.arrayBuffer();
      fs.writeFileSync(targetPath, Buffer.from(buffer));
    } catch (e) {
      console.error('Failed to download', assetUrl, e.message);
    }
  }
}

download();
