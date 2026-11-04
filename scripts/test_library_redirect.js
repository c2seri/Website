const https = require('https');

function check(url, depth = 0) {
  if (depth > 10) {
    console.log('STOPPED: Too many redirects (Infinite loop detected!)');
    return;
  }
  https.get(url, (res) => {
    console.log(`[${depth}] ${url} -> Status ${res.statusCode}`);
    if (res.headers.location) {
      console.log(`     Redirecting to: ${res.headers.location}`);
      const nextUrl = new URL(res.headers.location, url).toString();
      check(nextUrl, depth + 1);
    } else {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        console.log(`     Final page received, length: ${body.length}`);
        const titleMatch = body.match(/<title>(.*?)<\/title>/i);
        console.log(`     Title: ${titleMatch ? titleMatch[1] : 'none'}`);
        if (body.includes('window.location.replace')) {
          console.log('     FOUND JS REDIRECT IN BODY: window.location.replace!');
        }
      });
    }
  });
}

check('https://c2seri.com/library');
