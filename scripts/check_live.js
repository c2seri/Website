const https = require('https');

https.get('https://www.c2seri.com/library', (res) => {
  console.log('Status:', res.statusCode, 'Location:', res.headers['location']);
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('Length:', d.length);
    const m = d.match(/<script[^>]*src=["'][^"']+["'][^>]*>/g);
    console.log('Scripts:', m);
    // Check if hero image is present
    const imgs = d.match(/<img[^>]*src=["'][^"']+["'][^>]*>/g);
    console.log('Images (first 5):', (imgs || []).slice(0, 5));
  });
}).on('error', err => console.log('Error:', err.message));
