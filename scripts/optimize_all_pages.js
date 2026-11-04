const fs = require('fs');

const allHtmlFiles = [
  'index.html',
  'admin.html',
  'contact.html',
  'privacy.html',
  'refund.html',
  'terms.html',
  'sitemap.html',
  'library.html',
  'library/index.html',
  'library/admission.html',
  'library/dashboard.html',
  'library/facilities.html',
  'library/login.html',
  'library/shifts.html'
];

allHtmlFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');
  let modified = false;

  // 1. Defer external script tags in <head>
  // exams.js
  if (html.includes('<script src="exams.js"></script>')) {
    html = html.replace('<script src="exams.js"></script>', '<script src="exams.js" defer></script>');
    modified = true;
  }
  // app.js
  if (html.includes('<script src="app.js"></script>')) {
    html = html.replace('<script src="app.js"></script>', '<script src="app.js" defer></script>');
    modified = true;
  }
  // library.js
  if (html.includes('<script src="../library.js"></script>')) {
    html = html.replace('<script src="../library.js"></script>', '<script src="../library.js" defer></script>');
    modified = true;
  }
  if (html.includes('<script src="library.js"></script>')) {
    html = html.replace('<script src="library.js"></script>', '<script src="library.js" defer></script>');
    modified = true;
  }
  // admin.js
  if (html.includes('<script src="admin.js"></script>')) {
    html = html.replace('<script src="admin.js"></script>', '<script src="admin.js" defer></script>');
    modified = true;
  }

  // 2. Ensure Google Fonts has &display=swap
  if (html.includes('fonts.googleapis.com/css2') && !html.includes('&display=swap')) {
    html = html.replace(/fonts\.googleapis\.com\/css2\?family=([^"']+)/g, (match, p1) => {
      if (p1.includes('&display=swap')) return match;
      return `fonts.googleapis.com/css2?family=${p1}&display=swap`;
    });
    modified = true;
  }

  // 3. Add Preconnect & dns-prefetch for fonts if missing
  if (html.includes('fonts.googleapis.com') && !html.includes('rel="dns-prefetch" href="https://fonts.googleapis.com"')) {
    const preconnectBlock = `  <link rel="dns-prefetch" href="https://fonts.googleapis.com">\n  <link rel="preconnect" href="https://fonts.googleapis.com">\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n`;
    if (html.includes('<link rel="preconnect" href="https://fonts.googleapis.com">')) {
      html = html.replace('<link rel="preconnect" href="https://fonts.googleapis.com">', '<link rel="dns-prefetch" href="https://fonts.googleapis.com">\n  <link rel="preconnect" href="https://fonts.googleapis.com">');
    } else {
      // insert before <link rel="stylesheet"
      html = html.replace('<link rel="stylesheet"', preconnectBlock + '  <link rel="stylesheet"');
    }
    modified = true;
  }

  // 4. In contact.html, terms.html, privacy.html, refund.html: ensure fonts are preconnected
  if (['contact.html', 'terms.html', 'privacy.html', 'refund.html'].includes(file)) {
    if (!html.includes('fonts.googleapis.com')) {
      const fontInsert = `  <link rel="dns-prefetch" href="https://fonts.googleapis.com">\n  <link rel="preconnect" href="https://fonts.googleapis.com">\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">\n`;
      html = html.replace('<link rel="stylesheet" href="styles.css">', fontInsert + '  <link rel="stylesheet" href="styles.css">');
      modified = true;
    }
  }

  // 5. Add decoding="async" to img tags that don't have it
  html = html.replace(/<img\b(?![^>]*decoding=)([^>]*?)>/gi, '<img$1 decoding="async">');

  if (modified) {
    fs.writeFileSync(file, html, 'utf8');
    console.log(`✓ Optimized ${file}`);
  } else {
    console.log(`- Already optimal: ${file}`);
  }
});

console.log('\nAll pages optimized for speed and high-performance rendering!');

