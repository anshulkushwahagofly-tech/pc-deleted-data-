const fs = require('fs');
let html = fs.readFileSync('card_clone/index.html', 'utf8');

// 1. Add borders to balance-tabs
html = html.replace('.balance-tab{', '.balance-tab{\n  border-right: 1px solid rgba(255,255,255,0.15);');
html = html.replace('.balance-tab.active{', '.balance-tab:last-child { border-right: none; }\n\n.balance-tab.active{');

// 2. Add data-targets to tabs
html = html.replace('<button type="button" class="balance-tab" onclick="selectTab(this)">Register Card</button>', '<button type="button" class="balance-tab" onclick="selectTab(this)" data-target="content-register">Register Card</button>');
html = html.replace('<button type="button" class="balance-tab active" onclick="selectTab(this)">Check</button>', '<button type="button" class="balance-tab active" onclick="selectTab(this)" data-target="content-check">Check</button>');
html = html.replace('<button type="button" class="balance-tab" onclick="selectTab(this)">Track Disputes</button>', '<button type="button" class="balance-tab" onclick="selectTab(this)" data-target="content-disputes">Track Disputes</button>');
html = html.replace('<button type="button" class="balance-tab" onclick="selectTab(this)">Personalize PIN</button>', '<button type="button" class="balance-tab" onclick="selectTab(this)" data-target="content-pin">Personalize PIN</button>');

// 3. Extract the inner HTML of the panel.
// The panel starts at `<div class="panel" id="manage">` and ends at `</form>\n          </div>\n</div>\n    </section>` or something similar.
// Actually, it's easier to just wrap the existing content inside `<div id="content-check" class="tab-content" style="display:block;">`
// We will look for the first `<h2>` inside `.panel` and prepend the wrappers.

const panelStart = '<div class="panel" id="manage">';
html = html.replace(panelStart, panelStart + '\n\n' +
  '<!-- Register Card Content -->\n' +
  '<div id="content-register" class="tab-content" style="display:none; text-align:center; padding: 40px 0;">\n' +
  '  <h2>Register your Card</h2>\n' +
  '  <p>Enter your card details to register a new account.</p>\n' +
  '  <button class="btn" style="background:var(--blue2); color:#fff; border:none; padding:10px 20px; border-radius:5px; cursor:pointer; margin-top:20px;">Start Registration</button>\n' +
  '</div>\n\n' +
  '<!-- Track Disputes Content -->\n' +
  '<div id="content-disputes" class="tab-content" style="display:none; text-align:center; padding: 40px 0;">\n' +
  '  <h2>Track Disputes</h2>\n' +
  '  <p>Enter your claim reference number to track your dispute status.</p>\n' +
  '  <input type="text" placeholder="Reference Number" style="padding:10px; width:100%; max-width:300px; margin:20px 0; border:1px solid #ccc; border-radius:5px;" />\n' +
  '  <button class="btn" style="background:var(--blue2); color:#fff; border:none; padding:10px 20px; border-radius:5px; cursor:pointer; display:block; margin:auto;">Track Status</button>\n' +
  '</div>\n\n' +
  '<!-- Personalize PIN Content -->\n' +
  '<div id="content-pin" class="tab-content" style="display:none; text-align:center; padding: 40px 0;">\n' +
  '  <h2>Personalize PIN</h2>\n' +
  '  <p>Enter your card details securely to update your PIN.</p>\n' +
  '  <button class="btn" style="background:var(--blue2); color:#fff; border:none; padding:10px 20px; border-radius:5px; cursor:pointer; margin-top:20px;">Change PIN</button>\n' +
  '</div>\n\n' +
  '<!-- Check Balance Content (Default) -->\n' +
  '<div id="content-check" class="tab-content" style="display:block;">\n'
);

// Close the #content-check wrapper before the closing of .panel.
// Find the end of the form.
html = html.replace('</form>\n          </div>\n</div>\n    </section>', '</form>\n</div>\n          </div>\n</div>\n    </section>');

// 4. Update the JavaScript function
const jsCode = `
    function selectTab(btn) {
      // Remove active from all tabs
      document.querySelectorAll('.balance-tab').forEach(t => t.classList.remove('active'));
      
      // Hide all contents
      document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
      
      // Add active to clicked
      btn.classList.add('active');
      
      // Show target content
      const targetId = btn.getAttribute('data-target');
      if(targetId) {
          const targetEl = document.getElementById(targetId);
          if(targetEl) targetEl.style.display = 'block';
      }
    }
`;

html = html.replace(/function selectTab\(btn\) \{[\s\S]*?btn\.classList\.add\('active'\);\n      \}/, jsCode);


fs.writeFileSync('card_clone/index.html', html, 'utf8');
console.log('Done fixing contents');
