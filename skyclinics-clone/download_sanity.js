const fs = require('fs');
const https = require('https');
const path = require('path');

const queries = [
  { name: 'translations', query: '*[_type=="translations"]{key,value}' },
  { name: 'siteSettings', query: '*[_type=="siteSettings"][0]' },
  { name: 'hero', query: '*[_type=="hero"][0]' },
  { name: 'clinicServices', query: '*[_type=="clinicServices"][0]' },
  { name: 'reviews', query: '*[_type=="reviews"][0]' },
  { name: 'journey', query: '*[_type=="journey"][0]' },
  { name: 'footer', query: '*[_type=="footer"][0]' },
  { name: 'locations', query: '*[_type=="locations"][0]' },
  { name: 'dentalTourism', query: '*[_type=="dentalTourism"][0]' }
];

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

async function fetchQuery(q) {
  const sanityUrl = `https://0280s5p0.apicdn.sanity.io/v2023-08-01/data/query/production?query=${encodeURIComponent(q.query)}`;
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(sanityUrl)}`;
  
  return new Promise((resolve) => {
    console.log('Fetching', q.name);
    https.get(proxyUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          fs.writeFileSync(path.join(dataDir, `${q.name}.json`), JSON.stringify(json, null, 2));
          console.log(`Saved ${q.name}.json`);
          resolve();
        } catch(e) {
          console.error(`Failed parsing ${q.name}:`, e.message);
          resolve();
        }
      });
    }).on('error', (e) => {
      console.error(`Failed fetching ${q.name}:`, e.message);
      resolve();
    });
  });
}

async function run() {
  for (let q of queries) {
    await fetchQuery(q);
  }
}
run();
