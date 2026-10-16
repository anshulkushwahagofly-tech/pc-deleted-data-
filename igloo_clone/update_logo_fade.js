const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Update the inline style of the logo to include opacity:0 and a transition
const oldLogoStr = 'id="anshuu-logo" style="position:fixed; top:40px; left:40px; z-index:9999; color:white; font-family: monospace, sans-serif; font-size:2rem; font-weight:bold; letter-spacing:4px; pointer-events:none; text-shadow: 0 0 10px rgba(255,255,255,0.5);"';
const newLogoStr = 'id="anshuu-logo" style="position:fixed; top:40px; left:40px; z-index:9999; color:white; font-family: monospace, sans-serif; font-size:2rem; font-weight:bold; letter-spacing:4px; pointer-events:none; text-shadow: 0 0 10px rgba(255,255,255,0.5); opacity:0; transition:opacity 1.5s ease;"';

if(html.includes(oldLogoStr)) {
    html = html.replace(oldLogoStr, newLogoStr);
}

// Inject a script that checks for the loader element
const scriptAdd = `
    const loaderCheck = setInterval(() => {
        if(!document.getElementById('loader')) {
            const logo = document.getElementById('anshuu-logo');
            if(logo) logo.style.opacity = '1';
            clearInterval(loaderCheck);
        }
    }, 500);
`;

if(!html.includes('loaderCheck')) {
    html = html.replace('window.appMesh = null;', scriptAdd + '\n    window.appMesh = null;');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log("Updated logo fade logic");
