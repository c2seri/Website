const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const appJs = fs.readFileSync('app.js', 'utf8');
const examsJs = fs.readFileSync('exams.js', 'utf8');

// Combine JS code to inspect defined functions and window properties
const combinedJs = appJs + '\n' + examsJs;

// Extract all function calls from onclick="..."
const onclickRegex = /onclick="([^"]+)"/g;
let match;
const calledFunctions = new Set();

while ((match = onclickRegex.exec(indexHtml)) !== null) {
  const handler = match[1];
  // extract function names before '('
  const fnMatches = handler.matchAll(/([a-zA-Z0-9_]+)\s*\(/g);
  for (const fn of fnMatches) {
    const fnName = fn[1];
    if (!['return', 'if', 'typeof', 'alert', 'confirm', 'close', 'event'].includes(fnName)) {
      calledFunctions.add(fnName);
    }
  }
}

console.log("All function names called in onclick handlers:");
const missingFns = [];
const foundFns = [];

calledFunctions.forEach(fn => {
  const isDefinedInJs = 
    combinedJs.includes(`function ${fn}`) || 
    combinedJs.includes(`function ${fn} `) || 
    combinedJs.includes(`window.${fn}`) ||
    combinedJs.includes(`const ${fn} =`) ||
    combinedJs.includes(`let ${fn} =`) ||
    combinedJs.includes(`var ${fn} =`);

  const isDefinedInHtml = 
    indexHtml.includes(`function ${fn}`) || 
    indexHtml.includes(`window.${fn}`);

  if (!isDefinedInJs && !isDefinedInHtml) {
    missingFns.push(fn);
  } else {
    foundFns.push(fn);
  }
});

console.log("\nFound functions (" + foundFns.length + "):", foundFns);
console.log("\nMISSING / UNDEFINED FUNCTIONS (" + missingFns.length + "):", missingFns);
