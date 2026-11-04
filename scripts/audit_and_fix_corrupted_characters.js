const fs = require('fs');

function fixCorruptedRupee(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. In JS function arguments: 'arg1'₹'arg2' or 'arg1'₹ 'arg2'
  content = content.replace(/['"]₹\s*['"]/g, match => match.replace('₹', ', '));
  content = content.replace(/['"]₹/g, match => match.replace('₹', ', '));
  content = content.replace(/₹\s*['"]/g, match => match.replace('₹', ', '));

  // 2. In numbers/dates/functions: calcFees₹0 -> calcFees, 0; slice(0₹ 10) -> slice(0, 10)
  content = content.replace(/(\w+)\s*₹\s*(\d+)/g, '$1, $2');
  content = content.replace(/(\d+)\s*₹\s*(\d+)/g, (match, p1, p2) => {
    // Check if it was geo coordinates like 20.2458₹ 85.7686
    return `${p1}, ${p2}`;
  });

  // 3. In CSS: repeat(4₹ 1fr) -> repeat(4, 1fr)
  content = content.replace(/repeat\((\d+)₹\s*([^)]+)\)/g, 'repeat($1, $2)');
  // In rgba(r₹ g₹ b₹ a)
  content = content.replace(/rgba\(([^)]+)\)/g, (match, inner) => {
    return 'rgba(' + inner.split('₹').join(', ') + ')';
  });
  // linear-gradient(135deg₹ #ffffff 0%₹ #fff7ed 100%)
  content = content.replace(/linear-gradient\(([^)]+)\)/g, (match, inner) => {
    return 'linear-gradient(' + inner.split('₹').join(', ') + ')';
  });

  // 4. In JS calls: gtag('js'₹ new Date())
  content = content.replace(/gtag\(([^)]+)\)/g, (match, inner) => {
    return 'gtag(' + inner.split('₹').join(', ') + ')';
  });
  content = content.replace(/addEventListener\(([^)]+)\)/g, (match, inner) => {
    return 'addEventListener(' + inner.split('₹').join(', ') + ')';
  });

  // 5. In JSON schemas: ]₹ or }₹ or "val"₹
  content = content.replace(/\]₹/g, '],');
  content = content.replace(/\}₹/g, '},');
  content = content.replace(/"₹/g, '",');

  // 6. In text lists: e.g. "BANK₹ SSC₹ Railway" -> "BANK, SSC, Railway"
  // If ₹ is followed by a space and capital letter or word
  content = content.replace(/([a-zA-Z0-9\)])₹\s*([a-zA-Z0-9\(])/g, '$1, $2');

  // 7. Specifically check filterExam and show calls:
  content = content.replace(/filterExam\(([^)]+)\)/g, (match, inner) => {
    return 'filterExam(' + inner.split('₹').join(', ') + ')';
  });
  content = content.replace(/onclick="([^"]+)"/g, (match, inner) => {
    return 'onclick="' + inner.split('₹').join(', ') + '"';
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed corrupted ₹ in ${filePath}`);
  } else {
    console.log(`No changes needed in ${filePath}`);
  }
}

fixCorruptedRupee('index.html');
fixCorruptedRupee('library/index.html');
fixCorruptedRupee('library/admission.html');
fixCorruptedRupee('library/shifts.html');
fixCorruptedRupee('library/facilities.html');
fixCorruptedRupee('library/dashboard.html');
fixCorruptedRupee('styles.css');

