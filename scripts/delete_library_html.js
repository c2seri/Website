const fs = require('fs');

if (fs.existsSync('library.html')) {
  fs.unlinkSync('library.html');
  console.log('Deleted library.html from c:\\Users\\lenovo\\Website');
}
if (fs.existsSync('C:\\Users\\lenovo\\Downloads\\c2s\\Website\\library.html')) {
  fs.unlinkSync('C:\\Users\\lenovo\\Downloads\\c2s\\Website\\library.html');
  console.log('Deleted library.html from Downloads Website');
}
