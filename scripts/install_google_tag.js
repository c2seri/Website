const fs = require('fs');
const path = require('path');

const gtagSnippet = `  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-HJ59JX1P5N"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-HJ59JX1P5N');
  </script>`;

const htmlFiles = [
  'index.html',
  'sitemap.html',
  'library.html',
  'admin.html',
  'library/index.html',
  'library/shifts.html',
  'library/facilities.html',
  'library/admission.html',
  'library/login.html',
  'library/dashboard.html'
];

htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('G-HJ59JX1P5N')) {
      if (content.includes('<head>')) {
        content = content.replace('<head>', '<head>\n' + gtagSnippet);
      } else if (content.includes('<head ')) {
        content = content.replace(/<head[^>]*>/, '$&\n' + gtagSnippet);
      }
      fs.writeFileSync(file, content, 'utf8');
      console.log('Installed Google Tag in:', file);
    } else {
      console.log('Google Tag already present in:', file);
    }
  } else {
    console.warn('File not found:', file);
  }
});

console.log('Google Tag installation completed for all platform pages!');
