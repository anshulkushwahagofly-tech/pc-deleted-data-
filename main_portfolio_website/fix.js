const fs = require('fs');
let html = fs.readFileSync('card_clone/index.html', 'utf8');

// Wrap tabs and panel together
html = html.replace('<div class="balance-tabs">', '<div class="card-container" style="width:100%; max-width:580px; display:flex; flex-direction:column;">\n  <div class="balance-tabs" style="max-width:100%; border-bottom:none; border-radius:12px 12px 0 0;">');

// Add border-radius to bottom of panel and adjust styles
html = html.replace('.panel{', '.panel{\n      width:100%;\n      border-radius:0 0 12px 12px;\n      border-top:none;');

// Modify background and text colors of tabs if requested (user screenshot shows dark tabs)
// Let's add styles to make it look like the screenshot (dark blue tabs)
html = html.replace('.balance-tabs{', '.balance-tabs{\n      background: var(--blue2); /* match screenshot */\n');
html = html.replace('color:#667085;', 'color:var(--line); /* match screenshot text */');
html = html.replace('color:#155eef;', 'color:#007bff; /* bright blue active */\n      font-weight:bold;');
html = html.replace('background:#155eef;', 'background:#007bff;');

// We need to close the `card-container` div right after `.panel` ends.
// Let's find the closing tag of `.panel`. 
// .panel contains a form, which ends with </form>, then some help links, then </div>.
// We'll replace the exact block where it ends.
html = html.replace('</div>\n    </section>', '</div>\n</div>\n    </section>');

fs.writeFileSync('card_clone/index.html', html, 'utf8');
console.log('HTML updated');
