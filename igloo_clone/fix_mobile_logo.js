const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldScript = `    const loaderCheck = setInterval(() => {
        if(!document.getElementById('loader')) {
            const logo = document.getElementById('anshuu-logo');
            if(logo) logo.style.opacity = '1';
            clearInterval(loaderCheck);
        }
    }, 500);`;

const newScript = `    let loaderSeen = false;
    let checkCount = 0;
    const loaderCheck = setInterval(() => {
        checkCount++;
        const loader = document.getElementById('loader');
        if (loader) {
            loaderSeen = true;
        } else if (loaderSeen || checkCount > 20) {
            const logo = document.getElementById('anshuu-logo');
            if(logo) logo.style.opacity = '1';
            clearInterval(loaderCheck);
        }
    }, 500);`;

if (html.includes("if(!document.getElementById('loader')) {")) {
    html = html.replace(oldScript, newScript);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log("Updated loader logic");
} else {
    console.log("Could not find the script block");
}
