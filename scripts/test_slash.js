const https = require('https');

https.get('https://www.c2seri.com/library/', (res) => {
  console.log('Status for /library/:', res.statusCode);
  console.log('Headers:', res.headers.location);
});

