const fs = require('fs');

function checkHtmlLinks(file) {
  const content = fs.readFileSync(file, 'utf8');
  console.log('--- Checking links in:', file, '---');
  const hrefRegex = /href="([^"#][^"]*)"/g;
  let match;
  const links = new Set();
  while ((match = hrefRegex.exec(content)) !== null) {
    links.add(match[1]);
  }
  for (const link of links) {
    if (link.startsWith('http://') || link.startsWith('https://') || link.startsWith('tel:') || link.startsWith('mailto:') || link.startsWith('javascript:')) {
      continue;
    }
    // local file check
    const cleanLink = link.split('?')[0].split('#')[0];
    const basePath = file.includes('/') || file.includes('\\') ? file.substring(0, Math.max(file.lastIndexOf('/'), file.lastIndexOf('\\'))) : '.';
    const targetPath = basePath + '/' + cleanLink;
    if (!fs.existsSync(targetPath) && !fs.existsSync(cleanLink)) {
      console.log('  [BROKEN LINK]:', link, '-> target missing at', targetPath);
    }
  }
}

checkHtmlLinks('index.html');
checkHtmlLinks('library/index.html');
checkHtmlLinks('library/admission.html');
checkHtmlLinks('library/dashboard.html');
checkHtmlLinks('library/facilities.html');
checkHtmlLinks('library/shifts.html');

