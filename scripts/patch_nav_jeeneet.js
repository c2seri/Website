const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix the School featured card button
const wrongBtn = `<button class="btn" style="background:#4f46e5;color:#fff;width:100%;padding:10px;font-size:13px;font-weight:750;" onclick="openSchoolCourseDetail('jeeneet-explore');">Apply for JEE / NEET Batch →</button>`;
const correctSchoolBtn = `<button class="btn" style="background:#10b981;color:#fff;width:100%;padding:10px;font-size:13px;font-weight:750;" onclick="openSchoolCourseDetail('school-explore');">Explore C2S School Batches →</button>`;

if (html.includes(wrongBtn)) {
  html = html.replace(wrongBtn, correctSchoolBtn);
  console.log('Fixed School featured card button');
}

// 2. Add JEE / NEET dropdown if not present
const jeeNeetDropdown = `
            <!-- 4. C2S JEE / NEET (IIT-JEE & NEET-UG Foundation & Dropper Batches) -->
            <div class="nav-item has-mega">
              <button class="nav-link" data-nav="jeeneet" onclick="toggleDropdown(this, event)">
                <span>🎯 C2S JEE / NEET</span>
                <span class="nav-arrow">&#9662;</span>
              </button>
              <div class="mega-menu">
                <div class="mega-grid" style="grid-template-columns: repeat(3, 1fr) 1.25fr; gap: 16px;">
                  <!-- Col 1: IIT-JEE (Main + Advanced) -->
                  <div>
                    <div class="mega-col-title">⚡ IIT-JEE (Main &amp; Advanced)</div>
                    <div class="mega-subgroup">
                      <div class="mega-subgroup-title mega-subgroup-blue">📐 Engineering Foundation</div>
                      <div class="mega-link-list">
                        <button class="mega-link" onclick="openSchoolCourseDetail('jee-2yr');">
                          <span class="mega-link-icon">⚡</span>
                          <div><strong>JEE 2-Year Integrated (11th + JEE)</strong><span class="mega-link-desc">Physics, Chem, Math deep concept</span></div>
                        </button>
                        <button class="mega-link" onclick="openSchoolCourseDetail('jee-1yr');">
                          <span class="mega-link-icon">🎯</span>
                          <div><strong>JEE 1-Year Target (12th + JEE)</strong><span class="mega-link-desc">Syllabus completion + Rank booster</span></div>
                        </button>
                        <button class="mega-link" onclick="openSchoolCourseDetail('jee-dropper');">
                          <span class="mega-link-icon">🚀</span>
                          <div><strong>JEE Dropper / Repeater Batch</strong><span class="mega-link-desc">Intensive 8-hr daily test &amp; doubt prep</span></div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Col 2: NEET-UG Medical -->
                  <div>
                    <div class="mega-col-title">🩺 NEET-UG Medical</div>
                    <div class="mega-subgroup">
                      <div class="mega-subgroup-title mega-subgroup-emerald">🌱 Medical Foundation</div>
                      <div class="mega-link-list">
                        <button class="mega-link" onclick="openSchoolCourseDetail('neet-2yr');">
                          <span class="mega-link-icon">🩺</span>
                          <div><strong>NEET 2-Year Integrated (11th + NEET)</strong><span class="mega-link-desc">NCERT Biology, Chem &amp; Physics</span></div>
                        </button>
                        <button class="mega-link" onclick="openSchoolCourseDetail('neet-1yr');">
                          <span class="mega-link-icon">🧬</span>
                          <div><strong>NEET 1-Year Target (12th + NEET)</strong><span class="mega-link-desc">Strict 720-mark speed &amp; accuracy drills</span></div>
                        </button>
                        <button class="mega-link" onclick="openSchoolCourseDetail('neet-dropper');">
                          <span class="mega-link-icon">💊</span>
                          <div><strong>NEET Repeater / Achiever Batch</strong><span class="mega-link-desc">Kota / Hyderabad top faculty guidance</span></div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Col 3: Research & Aptitude -->
                  <div>
                    <div class="mega-col-title">🔬 Science Aptitude &amp; Research</div>
                    <div class="mega-subgroup">
                      <div class="mega-subgroup-title mega-subgroup-purple">🔭 NISER / IISER / CUET</div>
                      <div class="mega-link-list">
                        <button class="mega-link" onclick="openSchoolCourseDetail('nest-research');">
                          <span class="mega-link-icon">🔭</span>
                          <div><strong>NEST (NISER &amp; UM-DAE CEBS)</strong><span class="mega-link-desc">Integrated MSc Research Aptitude</span></div>
                        </button>
                        <button class="mega-link" onclick="openSchoolCourseDetail('iiser-cuet');">
                          <span class="mega-link-icon">🧪</span>
                          <div><strong>IISER IAT &amp; CUET-UG Science</strong><span class="mega-link-desc">Central University Science Admissions</span></div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Col 4: Featured Card -->
                  <div class="mega-featured-card"
                    style="background:linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);color:#fff;border-radius:14px;padding:20px;display:flex;flex-direction:column;justify-content:space-between;">
                    <div>
                      <div
                        style="display:inline-block;background:rgba(129, 140, 248, 0.2);color:#c7d2fe;font-size:11px;font-weight:800;padding:3px 10px;border-radius:20px;border:1px solid rgba(129,140,248,0.4);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px;">
                        PRE-ENGINEERING &amp; MEDICAL</div>
                      <h4 style="color:#a5b4fc;font-size:16px;margin:0 0 8px;font-weight:800;">C2S JEE &amp; NEET Wing
                      </h4>
                      <p style="font-size:12.5px;color:#cbd5e1;line-height:1.5;margin:0 0 14px;">Daily DPP sheets, 100+
                        OMR &amp; CBT tests, personalized performance analytics, and senior faculty mentoring.</p>
                      <div style="font-size:12px;color:#94a3b8;font-weight:600;margin-bottom:12px;">📍 Patrapada Classroom Centre</div>
                    </div>
                    <button class="btn"
                      style="background:#4f46e5;color:#fff;width:100%;padding:10px;font-size:13px;font-weight:750;"
                      onclick="openSchoolCourseDetail('jeeneet-explore');">
                      Apply for JEE / NEET Batch →
                    </button>
                  </div>
                </div>
              </div>
            </div>
`;

const targetAnchor = '<!-- 5. Books & Study Materials';
if (!html.includes('data-nav="jeeneet"') && html.includes(targetAnchor)) {
  html = html.replace(targetAnchor, jeeNeetDropdown + '\n            ' + targetAnchor);
  console.log('Inserted C2S JEE / NEET mega menu into navbar');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated successfully!');

