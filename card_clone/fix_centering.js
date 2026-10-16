const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Un-center the form wrappers
html = html.replace(/<div id="content-register" class="tab-content" style="display:none; text-align:center; padding: 40px 0;">/g, 
  '<div id="content-register" class="tab-content" style="display:none; padding: 20px 0;">');
html = html.replace(/<div id="content-disputes" class="tab-content" style="display:none; text-align:center; padding: 40px 0;">/g, 
  '<div id="content-disputes" class="tab-content" style="display:none; padding: 20px 0;">');
html = html.replace(/<div id="content-pin" class="tab-content" style="display:none; text-align:center; padding: 40px 0;">/g, 
  '<div id="content-pin" class="tab-content" style="display:none; padding: 20px 0;">');
html = html.replace(/<div id="content-check" class="tab-content" style="display:block; text-align:center;">/g, 
  '<div id="content-check" class="tab-content" style="display:block;">');

// 2. Un-center the form inputs and buttons (restore default block widths)
html = html.replace(/<button class="btn" style="background:var\(--blue2\); color:#fff; border:none; padding:10px 20px; border-radius:5px; cursor:pointer; display:block; margin:20px auto 0;">Start Registration<\/button>/g,
  '<button class="btn" style="width:100%; background:var(--blue2); color:#fff; border:none; padding:12px 20px; border-radius:5px; cursor:pointer; margin-top:20px; font-weight:bold; font-size:16px;">Start Registration</button>');

html = html.replace(/<input type="text" placeholder="Reference Number" style="padding:10px; width:100%; max-width:300px; margin:20px 0; border:1px solid #ccc; border-radius:5px;" \/>/g,
  '<input type="text" placeholder="Reference Number" style="padding:10px; width:100%; margin:20px 0; border:1px solid #ccc; border-radius:5px;" />');

html = html.replace(/<button class="btn" style="background:var\(--blue2\); color:#fff; border:none; padding:10px 20px; border-radius:5px; cursor:pointer; display:block; margin:20px auto 0;">Track Status<\/button>/g,
  '<button class="btn" style="width:100%; background:var(--blue2); color:#fff; border:none; padding:12px 20px; border-radius:5px; cursor:pointer; font-weight:bold; font-size:16px;">Track Status</button>');

html = html.replace(/<button class="btn" style="background:var\(--blue2\); color:#fff; border:none; padding:10px 20px; border-radius:5px; cursor:pointer; display:block; margin:20px auto 0;">Change PIN<\/button>/g,
  '<button class="btn" style="width:100%; background:var(--blue2); color:#fff; border:none; padding:12px 20px; border-radius:5px; cursor:pointer; margin-top:20px; font-weight:bold; font-size:16px;">Change PIN</button>');

html = html.replace(/<button type="submit" style="display:block; margin:20px auto 0;">/g, 
  '<button type="submit">');


// 3. Center the Logo in the Header
// The nav currently has `justify-content: space-between`. I'll make it `justify-content: center` 
// and hide the `.links` so the logo is perfectly centered.
// Or just add CSS to center .brand and hide .links on all screens (since this is just a form portal).
// Let's just override .nav and .links.
const logoCenterCss = `
  .nav { justify-content: center !important; }
  .links { display: none !important; }
`;
html = html.replace('</style>', logoCenterCss + '\n</style>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Reverted form centering and centered logo');
