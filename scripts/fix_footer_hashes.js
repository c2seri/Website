const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace href="#" in footer
const oldCol2 = `<div class="footer-links">
          <a href="#" onclick="filterExam('All India', 'BANK');return false;">BANK (PO / Clerk / SO)</a>
          <a href="#" onclick="filterExam('All India', 'SSC');return false;">SSC (CGL / CHSL / GD / MTS)</a>
          <a href="#" onclick="filterExam('All India', 'RAILWAY');return false;">Railway (NTPC / ALP / Group D)</a>
          <a href="#" onclick="filterExam('All India', 'UPSC');return false;">UPSC Civil Services (IAS / IPS)</a>
          <a href="#" onclick="filterExam('All India', 'DEFENCE');return false;">Defence (NDA / CDS / AFCAT)</a>
          <a href="#" onclick="filterExam('All India', 'TEACHING');return false;">Teaching (CTET / TGT / PGT)</a>
        </div>`;

const newCol2 = `<div class="footer-links">
          <a href="#exams" onclick="filterExam('All India', 'BANK');return false;">BANK (PO / Clerk / SO)</a>
          <a href="#exams" onclick="filterExam('All India', 'SSC');return false;">SSC (CGL / CHSL / GD / MTS)</a>
          <a href="#exams" onclick="filterExam('All India', 'RAILWAY');return false;">Railway (NTPC / ALP / Group D)</a>
          <a href="#exams" onclick="filterExam('All India', 'UPSC');return false;">UPSC Civil Services (IAS / IPS)</a>
          <a href="#exams" onclick="filterExam('All India', 'DEFENCE');return false;">Defence (NDA / CDS / AFCAT)</a>
          <a href="#exams" onclick="filterExam('All India', 'TEACHING');return false;">Teaching (CTET / TGT / PGT)</a>
        </div>`;

html = html.replace(oldCol2.replace(/\r?\n/g, '\r\n'), newCol2.replace(/\r?\n/g, '\r\n'));
html = html.replace(oldCol2.replace(/\r?\n/g, '\n'), newCol2.replace(/\r?\n/g, '\n'));

const oldCol3 = `<a href="#" onclick="filterExam('Odisha State', 'OSSC');return false;">OSSC (Group B / C Posts)</a>
          <a href="#" onclick="filterExam('Odisha State', 'OSSSC');return false;">OSSSC (Subordinate Posts)</a>
          <a href="#" onclick="filterExam('Odisha State', 'OPSC');return false;">OPSC (OAS / Group A/B)</a>
          <a href="#" onclick="filterExam('Odisha State', 'ODISHA-POLICE');return false;">Odisha Police (Constable /
            SI)</a>
          <a href="#" onclick="show('exams');return false;">All 10 Exam Tracks</a>`;

const newCol3 = `<a href="#exams" onclick="filterExam('Odisha State', 'OSSC');return false;">OSSC (Group B / C Posts)</a>
          <a href="#exams" onclick="filterExam('Odisha State', 'OSSSC');return false;">OSSSC (Subordinate Posts)</a>
          <a href="#exams" onclick="filterExam('Odisha State', 'OPSC');return false;">OPSC (OAS / Group A/B)</a>
          <a href="#exams" onclick="filterExam('Odisha State', 'ODISHA-POLICE');return false;">Odisha Police (Constable / SI)</a>
          <a href="#exams" onclick="show('exams');return false;">All 10 Exam Tracks</a>`;

html = html.replace(oldCol3.replace(/\r?\n/g, '\r\n'), newCol3.replace(/\r?\n/g, '\r\n'));
html = html.replace(oldCol3.replace(/\r?\n/g, '\n'), newCol3.replace(/\r?\n/g, '\n'));

const oldCol4 = `<a href="#" onclick="show('tests');return false;">Weekly Test Series</a>
          <a href="library/">24-Hour Premium Library</a>
          <a href="#" onclick="show('batches');return false;">Batches &amp; Smart Classes</a>
          <a href="#" onclick="show('notices');return false;">Official Notices</a>
          <a href="#" onclick="show('blog');return false;">Student Blog</a>
          <a href="#" onclick="show('help');return false;">Help &amp; Contact</a>
          <a href="#" onclick="show('login');return false;">Main Student Login</a>`;

const newCol4 = `<a href="#tests" onclick="show('tests');return false;">Weekly Test Series</a>
          <a href="library/">24-Hour Premium Library</a>
          <a href="#batches" onclick="show('batches');return false;">Batches &amp; Smart Classes</a>
          <a href="#notices" onclick="show('notices');return false;">Official Notices</a>
          <a href="#blog" onclick="show('blog');return false;">Student Blog</a>
          <a href="#help" onclick="show('help');return false;">Help &amp; Contact</a>
          <a href="#login" onclick="show('login');return false;">Main Student Login</a>`;

html = html.replace(oldCol4.replace(/\r?\n/g, '\r\n'), newCol4.replace(/\r?\n/g, '\r\n'));
html = html.replace(oldCol4.replace(/\r?\n/g, '\n'), newCol4.replace(/\r?\n/g, '\n'));

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed footer links in index.html!');

