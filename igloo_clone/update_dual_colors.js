const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldColorsStr = `const colors = [
                { L: '#a0d8f1', D: '#0077b5' }, // 0: LinkedIn (Ice Blue)
                { L: '#ffb3ba', D: '#d62976' }, // 1: Instagram (Light Pink / Insta Pink)
                { L: '#fff9aa', D: '#fffc00' }, // 2: Snapchat (Light Yellow)
                { L: '#a8c7fa', D: '#1877F2' }  // 3: Facebook (Light Blue)
            ];
            const c = colors[index];
            if(c) {
                targetMesh.material.uniforms.uColorLight.value.set(c.L);
                targetMesh.material.uniforms.uColorDark.value.set(c.D);
                targetMesh.material.uniforms.uColorFast.value.set('#ffffff');
            }`;

const newColorsStr = `const colors = [
                { L: '#0077b5', D: '#003355', F: '#00d2ff' }, // LinkedIn: Light Blue Surface & Deep Dark Blue Shadow (Cyan Fast)
                { L: '#fd1d1d', D: '#833ab4', F: '#fcb045' }, // Instagram: Pink Surface & Purple Shadow (Orange Fast)
                { L: '#fffc00', D: '#666500', F: '#ffffff' }, // Snapchat: Yellow Surface & Dark Gold Shadow (White Fast)
                { L: '#1877f2', D: '#061d4a', F: '#89b4f8' }  // Facebook: FB Blue Surface & Very Deep Navy Shadow (Light Blue Fast)
            ];
            const c = colors[index];
            if(c) {
                targetMesh.material.uniforms.uColorLight.value.set(c.L);
                targetMesh.material.uniforms.uColorDark.value.set(c.D);
                targetMesh.material.uniforms.uColorFast.value.set(c.F);
            }`;

if (html.includes("{ L: '#a0d8f1', D: '#0077b5' }")) {
    html = html.replace(oldColorsStr, newColorsStr);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log("Updated colors in index.html");
} else {
    console.log("Could not find the target block to replace");
}
