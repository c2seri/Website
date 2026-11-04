const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const inlineScripts = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)];

console.log('Total inline scripts in index.html:', inlineScripts.length);
inlineScripts.forEach((s, i) => {
  const content = s[1].trim();
  const firstLine = content.split('\n')[0];
  console.log(`Script ${i+1} (${content.length} chars):`, firstLine.substring(0, 90));
});

