const https = require('https');

function fetch(url) {
  https.get(url, (res) => {
    console.log(url, '--> Status:', res.statusCode);
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      console.log('Redirecting to:', res.headers.location);
      fetch(res.headers.location);
      return;
    }
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('Body length:', data.length);
      console.log('Includes admin-pill?', data.includes('admin-pill'));
      console.log('Includes quickDemoStudentLogin?', data.includes('quickDemoStudentLogin'));
      console.log('Includes Super Admin & Staff?', data.includes('Super Admin &amp; Staff') || data.includes('Super Admin & Staff'));
    });
  }).on('error', (e) => {
    console.error('Fetch error:', e);
  });
}

fetch('https://c2seri.com/');
