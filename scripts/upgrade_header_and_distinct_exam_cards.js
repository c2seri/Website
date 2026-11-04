// scripts/upgrade_header_and_distinct_exam_cards.js
// 1. Fixes header overflow so NOTHING gets cut off on any screen size.
// 2. Gives all 204+ exams authentic unique board logos, distinct color-coded badges, and deep details.

const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, '..', 'index.html');
const stylesCssPath = path.join(__dirname, '..', 'styles.css');
const appJsPath = path.join(__dirname, '..', 'app.js');

let html = fs.readFileSync(indexHtmlPath, 'utf8');
let css = fs.readFileSync(stylesCssPath, 'utf8');
let appJs = fs.readFileSync(appJsPath, 'utf8');

console.log('Streamlining Header and upgrading 204+ Exam Cards to distinct board identities...');

// 1. STREAMLINE HEADER IN index.html
// Replace messy 14-item navigation with clean, structured 5-dropdown navigation (Adda247 / PW standard)
const headerNavRegex = /<nav class="topnav" id="topnav">[\s\S]*?<\/header>/;

const cleanHeaderHtml = `<nav class="topnav" id="topnav">
        <!-- 1. Exams (Mega-Menu) -->
        <div class="nav-item has-mega">
          <button class="nav-link" data-nav="exams" onclick="toggleDropdown(this)">
            Exams <span class="nav-arrow">▾</span>
          </button>
          <div class="mega-menu">
            <div class="mega-grid" style="grid-template-columns: repeat(4, 1fr) 1.2fr; gap: 16px;">
              <!-- Col 1: Banking & Insurance -->
              <div>
                <div class="mega-col-title">🏦 Banking &amp; Insurance</div>
                <div class="mega-link-list">
                  <button class="mega-link" onclick="filterExam('All India','BANK');closeMobileNav();">
                    <span class="mega-link-icon">🏛️</span>
                    <div><strong>SBI PO &amp; Clerk</strong><span class="mega-link-desc">Probationary Officer &amp; JA</span></div>
                  </button>
                  <button class="mega-link" onclick="filterExam('All India','BANK');closeMobileNav();">
                    <span class="mega-link-icon">💳</span>
                    <div><strong>IBPS PO &amp; Clerk</strong><span class="mega-link-desc">11 Participating Banks</span></div>
                  </button>
                  <button class="mega-link" onclick="filterExam('All India','BANK');closeMobileNav();">
                    <span class="mega-link-icon">🌾</span>
                    <div><strong>IBPS RRB Officer &amp; Assistant</strong><span class="mega-link-desc">Gramin Banks (Odisha)</span></div>
                  </button>
                  <button class="mega-link" onclick="filterExam('All India','BANK');closeMobileNav();">
                    <span class="mega-link-icon">🪙</span>
                    <div><strong>RBI Grade B &amp; Assistant</strong><span class="mega-link-desc">Apex Central Bank</span></div>
                  </button>
                </div>
              </div>

              <!-- Col 2: SSC -->
              <div>
                <div class="mega-col-title">🛡️ Staff Selection (SSC)</div>
                <div class="mega-link-list">
                  <button class="mega-link" onclick="filterExam('All India','SSC');closeMobileNav();">
                    <span class="mega-link-icon">⭐</span>
                    <div><strong>SSC CGL (Tier 1 &amp; 2)</strong><span class="mega-link-desc">ASO, Income Tax, Excise</span></div>
                  </button>
                  <button class="mega-link" onclick="filterExam('All India','SSC');closeMobileNav();">
                    <span class="mega-link-icon">📑</span>
                    <div><strong>SSC CHSL (10+2)</strong><span class="mega-link-desc">LDC, DEO, PA/SA</span></div>
                  </button>
                  <button class="mega-link" onclick="filterExam('All India','SSC');closeMobileNav();">
                    <span class="mega-link-icon">🛡️</span>
                    <div><strong>SSC GD Constable &amp; CPO SI</strong><span class="mega-link-desc">Central Armed Police</span></div>
                  </button>
                  <button class="mega-link" onclick="filterExam('All India','SSC');closeMobileNav();">
                    <span class="mega-link-icon">📝</span>
                    <div><strong>SSC MTS &amp; Havaldar</strong><span class="mega-link-desc">Non-Technical Staff</span></div>
                  </button>
                </div>
              </div>

              <!-- Col 3: Railways, UPSC & Defence -->
              <div>
                <div class="mega-col-title">🚆 Railway, UPSC &amp; Defence</div>
                <div class="mega-link-list">
                  <button class="mega-link" onclick="filterExam('All India','RAILWAY');closeMobileNav();">
                    <span class="mega-link-icon">🚆</span>
                    <div><strong>RRB NTPC, ALP &amp; Group D</strong><span class="mega-link-desc">Station Master, Loco Pilot</span></div>
                  </button>
                  <button class="mega-link" onclick="filterExam('All India','UPSC');closeMobileNav();">
                    <span class="mega-link-icon">🏛️</span>
                    <div><strong>UPSC Civil Services</strong><span class="mega-link-desc">IAS, IPS, IFS (GS + CSAT)</span></div>
                  </button>
                  <button class="mega-link" onclick="filterExam('All India','DEFENCE');closeMobileNav();">
                    <span class="mega-link-icon">⚔️</span>
                    <div><strong>NDA, CDS &amp; AFCAT</strong><span class="mega-link-desc">Army, Navy, Air Force + SSB</span></div>
                  </button>
                  <button class="mega-link" onclick="filterExam('All India','TEACHING');closeMobileNav();">
                    <span class="mega-link-icon">📚</span>
                    <div><strong>CTET, KVS &amp; NVS</strong><span class="mega-link-desc">PRT, TGT, PGT Teaching</span></div>
                  </button>
                </div>
              </div>

              <!-- Col 4: Odisha State Recruitments -->
              <div>
                <div class="mega-col-title">🏛️ Odisha State Exams</div>
                <div class="mega-link-list">
                  <button class="mega-link" onclick="filterExam('Odisha State','OSSC');closeMobileNav();">
                    <span class="mega-link-icon">📝</span>
                    <div><strong>OSSC CGL &amp; Group B/C</strong><span class="mega-link-desc">Auditor, Supplies, Excise</span></div>
                  </button>
                  <button class="mega-link" onclick="filterExam('Odisha State','OSSSC');closeMobileNav();">
                    <span class="mega-link-icon">📋</span>
                    <div><strong>OSSSC CRE (RI, ARI, Amin)</strong><span class="mega-link-desc">Forester &amp; Forest Guard</span></div>
                  </button>
                  <button class="mega-link" onclick="filterExam('Odisha State','OPSC');closeMobileNav();">
                    <span class="mega-link-icon">🏛️</span>
                    <div><strong>OPSC OAS (Odisha Civil Services)</strong><span class="mega-link-desc">OAS, OFS, OPS Group A/B</span></div>
                  </button>
                  <button class="mega-link" onclick="filterExam('Odisha State','ODISHA-POLICE');closeMobileNav();">
                    <span class="mega-link-icon">👮</span>
                    <div><strong>Odisha Police Constable &amp; SI</strong><span class="mega-link-desc">Written + 1.6km PET Prep</span></div>
                  </button>
                </div>
              </div>

              <!-- Col 5: Featured Authority Card -->
              <div class="mega-featured-card" style="background:linear-gradient(135deg, #0a2540 0%, #1e3a8a 100%);color:#fff;border-radius:14px;padding:20px;">
                <h4 style="color:#fdba74;font-size:16px;margin:0 0 8px;">🎯 All India &amp; Odisha Exam Directory</h4>
                <p style="font-size:13px;color:#cbd5e1;line-height:1.5;margin:0 0 16px;">204 Central &amp; State exam syllabi, multi-stage selection patterns &amp; eligibility.</p>
                <button class="btn orange" style="width:100%;padding:10px;font-size:13px;font-weight:750;" onclick="show('exams');closeMobileNav();">
                  Explore Complete 204 Directory →
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Test Series (Mega Dropdown) -->
        <div class="nav-item has-mega">
          <button class="nav-link" data-nav="tests" onclick="toggleDropdown(this)">
            Test Series <span class="nav-arrow">▾</span>
          </button>
          <div class="mega-menu">
            <div class="mega-grid" style="grid-template-columns: repeat(3, 1fr) 1.2fr; gap: 16px;">
              <div>
                <div class="mega-col-title">📋 Live &amp; Full Mock Tests</div>
                <div class="mega-link-list">
                  <button class="mega-link" onclick="show('tests');closeMobileNav();">
                    <span class="mega-link-icon">⚡</span>
                    <div><strong>All-India Full Length Mocks</strong><span class="mega-link-desc">Timer + Negative Marking</span></div>
                  </button>
                  <button class="mega-link" onclick="show('tests');closeMobileNav();">
                    <span class="mega-link-icon">📊</span>
                    <div><strong>Sectional &amp; Topic Tests</strong><span class="mega-link-desc">Quant, Reasoning, English, GS</span></div>
                  </button>
                </div>
              </div>
              <div>
                <div class="mega-col-title">🔒 CBT Exam Simulation</div>
                <div class="mega-link-list">
                  <button class="mega-link" onclick="show('tests');closeMobileNav();">
                    <span class="mega-link-icon">🖥️</span>
                    <div><strong>Locked TCS/NTA Interface</strong><span class="mega-link-desc">Fullscreen Anti-Cheat Engine</span></div>
                  </button>
                  <button class="mega-link" onclick="show('tests');closeMobileNav();">
                    <span class="mega-link-icon">📝</span>
                    <div><strong>Given Tests &amp; Analysis</strong><span class="mega-link-desc">Marks, percentile &amp; solutions</span></div>
                  </button>
                </div>
              </div>
              <div>
                <div class="mega-col-title">📚 Solved PYQ Papers</div>
                <div class="mega-link-list">
                  <button class="mega-link" onclick="show('pyq');closeMobileNav();">
                    <span class="mega-link-icon">📑</span>
                    <div><strong>5 Years Solved PYQ Papers</strong><span class="mega-link-desc">OSSC, SSC, Bank &amp; Police</span></div>
                  </button>
                </div>
              </div>
              <div class="mega-featured-card" style="background:linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);color:#fff;border-radius:14px;padding:20px;">
                <h4 style="color:#a5b4fc;font-size:16px;margin:0 0 8px;">⚡ C2S CBT Mock Pass</h4>
                <p style="font-size:13px;color:#cbd5e1;line-height:1.5;margin:0 0 16px;">100+ locked mock tests with All-India ranking and step-by-step solutions.</p>
                <button class="btn" style="background:#4f46e5;color:#fff;width:100%;padding:10px;font-size:13px;font-weight:750;" onclick="show('tests');closeMobileNav();">
                  Open CBT Test Engine →
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Classroom Batches & Courses -->
        <button class="nav-link" data-nav="batches" onclick="show('batches');closeMobileNav();">Classroom Batches</button>

        <!-- 4. Study Material Dropdown (Groups Books, Notes, Current Affairs & PYQs) -->
        <div class="nav-item">
          <button class="nav-link" onclick="toggleDropdown(this)">
            Study Material <span class="nav-arrow">▾</span>
          </button>
          <div class="dropdown-menu">
            <div class="dropdown-item" onclick="show('books');closeMobileNav();">
              <span>📚</span>
              <div><strong>Printed Books &amp; Formula Compendiums</strong><span class="small" style="display:block">Doorstep delivery &amp; desk pickup</span></div>
            </div>
            <div class="dropdown-item" onclick="show('notes');closeMobileNav();">
              <span>✍️</span>
              <div><strong>Smart Board Handwritten Class Notes</strong><span class="small" style="display:block">Theory summaries by 10+ yrs faculty</span></div>
            </div>
            <div class="dropdown-item" onclick="show('current-affairs');closeMobileNav();">
              <span>📰</span>
              <div><strong>Weekly Odisha &amp; National Current Affairs</strong><span class="small" style="display:block">Digest + 25 weekly MCQs (PDF download)</span></div>
            </div>
            <div class="dropdown-item" onclick="show('pyq');closeMobileNav();">
              <span>📑</span>
              <div><strong>Previous Year Solved Papers (PYQ)</strong><span class="small" style="display:block">Official question papers with solutions</span></div>
            </div>
          </div>
        </div>

        <!-- 5. Patrapada Centre & Library -->
        <div class="nav-item">
          <button class="nav-link" onclick="toggleDropdown(this)">
            Patrapada Centre <span class="nav-arrow">▾</span>
          </button>
          <div class="dropdown-menu">
            <div class="dropdown-item" onclick="window.location.href='library.html'">
              <span>📖</span>
              <div><strong>24h Study Library Sanctuary</strong><span class="small" style="display:block">4 AC Shifts • Ergonomic Desks • Wi-Fi</span></div>
            </div>
            <div class="dropdown-item" onclick="show('notices');closeMobileNav();">
              <span>📢</span>
              <div><strong>Official Recruitment Notices</strong><span class="small" style="display:block">Live updates from OSSC, SSC, Banking</span></div>
            </div>
            <div class="dropdown-item" onclick="show('help');closeMobileNav();">
              <span>📍</span>
              <div><strong>Centre Location &amp; Academic Help</strong><span class="small" style="display:block">NH-16 Opp. Sani Mandir, Bhubaneswar</span></div>
            </div>
          </div>
        </div>
      </nav>

      <!-- Header Actions (Student Login Button & Helpline) -->
      <div class="header-actions">
        <a href="tel:9777481909" class="header-helpline-desktop" title="Call Academic Desk">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>9777481909</span>
        </a>
        <button class="btn orange header-login-btn" onclick="show('login')">Student Login</button>
      </div>
    </div>
  </header>`;

if (headerNavRegex.test(html)) {
  html = html.replace(headerNavRegex, cleanHeaderHtml);
  console.log('✓ Successfully streamlined Header Navigation in index.html');
} else {
  console.error('Could not match headerNavRegex in index.html');
}

// 2. UPGRADE renderExamCardHtml IN app.js WITH DISTINCT BOARD IDENTITY & EMBLEM
const examCardFunction = `
function renderExamCardHtml(e) {
  const cat = (e.category || '').toUpperCase();
  const board = (e.board || '').toUpperCase();
  const id = (e.id || '').toUpperCase();
  const isOdisha = e.stateCode === 'ODISHA' || (e.state && e.state.includes('Odisha'));
  const isCentral = e.stateCode === 'CENTRAL' || (e.state && e.state.includes('Central')) || e.level === 'All India';

  // Distinct Color & Cadre Branding per Board
  let themeClass = 'theme-central';
  let cadreTag = '🇮🇳 All India Recruitment';
  let badgeStyle = 'background:#eff6ff;color:#1e40af;border:1px solid #bfdbfe;';

  if (isOdisha || id.includes('OSSC') || id.includes('OSSSC') || id.includes('OPSC') || id.includes('ODISHA')) {
    themeClass = 'theme-odisha';
    cadreTag = '🏛️ Odisha Govt Official';
    badgeStyle = 'background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;';
  } else if (cat.includes('BANK') || id.includes('SBI') || id.includes('IBPS') || id.includes('RBI')) {
    themeClass = 'theme-bank';
    cadreTag = '🏦 Banking & Finance Cadre';
    badgeStyle = 'background:#eff6ff;color:#1d4ed8;border:1px solid #93c5fd;';
  } else if (cat.includes('SSC') || id.includes('SSC')) {
    themeClass = 'theme-ssc';
    cadreTag = '🛡️ SSC Central Staff (Pay L4–L8)';
    badgeStyle = 'background:#fff7ed;color:#c2410c;border:1px solid #fed7aa;';
  } else if (cat.includes('RAILWAY') || id.includes('RRB')) {
    themeClass = 'theme-railway';
    cadreTag = '🚆 Indian Railways Cadre';
    badgeStyle = 'background:#fef2f2;color:#b91c1c;border:1px solid #fecaca;';
  } else if (cat.includes('POLICE') || id.includes('POLICE')) {
    themeClass = 'theme-police';
    cadreTag = '👮 Police & Law Enforcement';
    badgeStyle = 'background:#fefce8;color:#854d0e;border:1px solid #fef08a;';
  } else if (cat.includes('DEFENCE') || id.includes('NDA') || id.includes('CDS')) {
    themeClass = 'theme-defence';
    cadreTag = '⚔️ Armed Forces Officer';
    badgeStyle = 'background:#f0fdf4;color:#15803d;border:1px solid #bbf7d0;';
  } else if (cat.includes('TEACHING') || id.includes('TET')) {
    themeClass = 'theme-teaching';
    cadreTag = '📚 Teaching Cadre (PRT/TGT/PGT)';
    badgeStyle = 'background:#faf5ff;color:#7e22ce;border:1px solid #e9d5ff;';
  } else if (cat.includes('CIVIL') || id.includes('UPSC') || id.includes('PSC')) {
    themeClass = 'theme-civil';
    cadreTag = '⚖️ State / Union Civil Services';
    badgeStyle = 'background:#fdf4ff;color:#a21caf;border:1px solid #f5d0fe;';
  }

  const emblemSvg = getExamEmblem(e, 52);

  return \`
    <div class="pan-exam-card \${themeClass}">
      <div>
        <!-- Top Board Strip with Distinct Board Logo & Authority Badge -->
        <div class="pan-exam-card-header">
          <div class="pan-exam-logo-wrap" title="\${e.board || 'Official Board'}">
            \${emblemSvg}
          </div>
          <div style="flex:1;min-width:0;">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
              <span class="pan-board-badge" style="\${badgeStyle}">\${e.board || 'Govt Board'}</span>
              <span class="pan-state-badge">\${cadreTag}</span>
            </div>
            <h4 class="pan-exam-title" title="\${e.name}">\${e.name}</h4>
          </div>
        </div>

        <!-- 4-Pillar Information Grid (Clear Eligibility, Age, Posts & Stages) -->
        <div class="pan-exam-meta-grid">
          <div class="pan-exam-meta-item">
            <span class="pan-exam-meta-label">🎓 Qualification</span>
            <span class="pan-exam-meta-val" title="\${e.qualification}">\${e.qualification || 'Graduation in any stream'}</span>
          </div>
          <div class="pan-exam-meta-item">
            <span class="pan-exam-meta-label">⏳ Age Limit</span>
            <span class="pan-exam-meta-val" title="\${e.age}">\${e.age || '18 - 32 Yrs'}</span>
          </div>
          <div class="pan-exam-meta-item">
            <span class="pan-exam-meta-label">💼 Domain Cadre</span>
            <span class="pan-exam-meta-val" title="\${e.category}">\${e.category || 'Govt Service'}</span>
          </div>
          <div class="pan-exam-meta-item">
            <span class="pan-exam-meta-label">📋 Selection Pattern</span>
            <span class="pan-exam-meta-val">\${e.subExams && e.subExams.length ? e.subExams.length + ' Sub-Stages' : 'Prelims + Mains'}</span>
          </div>
        </div>

        <!-- Designated Target Posts -->
        <div class="pan-exam-posts-box">
          <strong style="color:#0f172a;display:block;margin-bottom:2px;font-size:11.5px;text-transform:uppercase;letter-spacing:0.4px;">
            Target Posts:
          </strong>
          <span class="posts-clamp-text" title="\${e.posts}">
            \${e.posts || 'Multiple Central & State Govt vacancies'}
          </span>
        </div>

        <!-- Exam Pattern & Negative Marking Box -->
        <div class="pan-exam-pattern-box">
          <div style="font-weight:750;color:#1e3a8a;margin-bottom:4px;display:flex;align-items:center;justify-content:space-between;font-size:11.5px;">
            <span>📋 Pattern &amp; Negative Marking</span>
            <span style="font-size:10.5px;color:#dc2626;font-weight:800;background:#fee2e2;padding:1px 6px;border-radius:4px;">-0.25 Mark</span>
          </div>
          <div style="font-size:11.5px;color:#475569;line-height:1.4;margin-bottom:4px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
            \${e.pattern ? e.pattern.replace(/•/g, '').trim() : 'Objective multiple-choice CBT examination followed by descriptive paper and skill verification.'}
          </div>
        </div>
      </div>

      <!-- Action Strip: Deep Syllabus Modal + Direct CBT Mock Test + Patrapada Batch -->
      <div class="pan-exam-actions">
        <button type="button" class="btn ghost btn-view-exam-details" onclick="openExamModal('\${e.id}')">
          📋 Full Syllabus &amp; Details
        </button>
        <button type="button" class="btn orange btn-start-mock-cta" onclick="startOrFilterMock('\${e.id}')">
          🎯 CBT Mock →
        </button>
      </div>
    </div>
  \`;
}
`;

// Replace renderExamCardHtml in app.js
const appCardRegex = /function renderExamCardHtml\(e\) {[\s\S]*?return `[\s\S]*?<\/div>\s*`;\s*}/;
if (appCardRegex.test(appJs)) {
  appJs = appJs.replace(appCardRegex, examCardFunction.trim());
  console.log('✓ Replaced renderExamCardHtml in app.js with board-themed generator');
} else {
  console.error('Could not match appCardRegex in app.js');
}

// 3. ADD CSS FOR CLEAN HEADER & DISTINCT BOARD THEMED EXAM CARDS
const distinctCardsCss = `
/* ==========================================================================
   CLEAN NON-OVERFLOWING HEADER (Adda247 / PW Standard)
   ========================================================================== */

.site-header {
  min-height: 72px;
  height: auto !important;
  background: #ffffff !important;
  border-bottom: 1.5px solid #e2e8f0 !important;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.04) !important;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap !important;
  width: 100%;
  max-width: 1260px;
  margin: 0 auto;
  padding: 10px 20px;
  gap: 16px;
}

.brand-cluster {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 14px;
}

.topnav {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 1;
  flex-wrap: nowrap !important;
}

.nav-link {
  font-size: 13.5px;
  font-weight: 750;
  color: #334155 !important;
  padding: 8px 12px;
  border-radius: 8px;
  white-space: nowrap !important;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: all 0.15s ease;
}

.nav-link:hover, .nav-link.active {
  color: #ea580c !important;
  background: #fff7ed !important;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.header-helpline-desktop {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 800;
  color: #ea580c;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  padding: 6px 12px;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.15s ease;
}

.header-helpline-desktop:hover {
  background: #ea580c;
  color: #ffffff;
}

.header-login-btn {
  padding: 8px 18px !important;
  font-size: 13.5px !important;
  font-weight: 800 !important;
  border-radius: 10px !important;
}

/* ==========================================================================
   DISTINCT COLOR-CODED BOARD THEMING FOR ALL 204+ EXAMS
   ========================================================================== */

.pan-exam-card {
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 18px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.pan-exam-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px -4px rgba(15, 23, 42, 0.1);
}

/* Distinct Top Color Bars per Board */
.pan-exam-card.theme-odisha {
  border-top: 4.5px solid #059669 !important;
}
.pan-exam-card.theme-bank {
  border-top: 4.5px solid #1d4ed8 !important;
}
.pan-exam-card.theme-ssc {
  border-top: 4.5px solid #ea580c !important;
}
.pan-exam-card.theme-railway {
  border-top: 4.5px solid #b91c1c !important;
}
.pan-exam-card.theme-police {
  border-top: 4.5px solid #d97706 !important;
}
.pan-exam-card.theme-defence {
  border-top: 4.5px solid #16a34a !important;
}
.pan-exam-card.theme-teaching {
  border-top: 4.5px solid #7c3aed !important;
}
.pan-exam-card.theme-civil {
  border-top: 4.5px solid #c026d3 !important;
}
.pan-exam-card.theme-central {
  border-top: 4.5px solid #2563eb !important;
}

.pan-exam-card-header {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 14px;
}

.pan-exam-logo-wrap {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05);
  transition: transform 0.2s ease;
}

.pan-exam-card:hover .pan-exam-logo-wrap {
  transform: scale(1.06);
}

.pan-board-badge {
  font-size: 11px;
  font-weight: 850;
  padding: 2px 8px;
  border-radius: 6px;
  letter-spacing: 0.3px;
  white-space: nowrap;
}

.pan-state-badge {
  font-size: 11px;
  font-weight: 750;
  color: #64748b;
  white-space: nowrap;
}

.pan-exam-title {
  font-size: 16px;
  font-weight: 850;
  color: #0f172a;
  margin: 0;
  line-height: 1.3;
}

.pan-exam-meta-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  background: #f8fafc;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  margin-bottom: 12px;
}

.pan-exam-meta-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pan-exam-meta-label {
  font-size: 10.5px;
  font-weight: 750;
  color: #64748b;
  text-transform: uppercase;
}

.pan-exam-meta-val {
  font-size: 12px;
  font-weight: 800;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pan-exam-posts-box {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 8px 12px;
  margin-bottom: 10px;
}

.posts-clamp-text {
  font-size: 12px;
  color: #334155;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pan-exam-pattern-box {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 8px 12px;
  margin-bottom: 16px;
}

.pan-exam-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #f1f5f9;
}

.btn-view-exam-details {
  flex: 1.2;
  padding: 9px 12px !important;
  font-size: 12.5px !important;
  font-weight: 800 !important;
  border-radius: 10px !important;
}

.btn-start-mock-cta {
  flex: 1;
  padding: 9px 12px !important;
  font-size: 12.5px !important;
  font-weight: 850 !important;
  border-radius: 10px !important;
}
`;

css += '\n' + distinctCardsCss;

fs.writeFileSync(indexHtmlPath, html, 'utf8');
fs.writeFileSync(stylesCssPath, css, 'utf8');
fs.writeFileSync(appJsPath, appJs, 'utf8');

console.log('✓ Successfully upgraded Header and 204+ Exam Cards!');
