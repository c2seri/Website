const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');
appJs = appJs.replace("price: '₹800 / month (Screenshot Ref)'", "price: '₹1000 / month'");
appJs = appJs.replace("time: '24-Hour Unlimited Access'", "time: '07:00 AM – 09:00 PM (14 Hours)'");
appJs = appJs.replace("price: 'Staff Configurable'", "price: '₹1000 / month'");
appJs = appJs.replace("Shift 3: Full Day (24-Hour Access)", "Shift 3: Full Day (07:00 AM – 09:00 PM • 14 Hours)");
fs.writeFileSync('app.js', appJs, 'utf8');

console.log('✅ app.js shift timings updated successfully');
