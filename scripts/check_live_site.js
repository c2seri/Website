const https = require('https');

https.get('https://c2seri.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Includes admin-pill?', data.includes('admin-pill'));
    console.log('Includes quickDemoStudentLogin?', data.includes('quickDemoStudentLogin'));
    console.log('Includes Super Admin & Staff?', data.includes('Super Admin &amp; Staff') || data.includes('Super Admin & Staff'));
  });
}).on('error', (e) => {
  console.error('Fetch error:', e);
});

