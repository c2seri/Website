# -*- coding: utf-8 -*-
"""
Integrate Testbook-exact Solutions and Analysis screens into index.html and app.js
"""
import sys

# 1. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

target_start = '      <!-- 4. STUDENT PERFORMANCE ANALYSIS REPORT MODAL -->'
target_end = '    </div>\n  </div>\n\n  </div>'

idx1 = html.find(target_start)
idx2 = html.find(target_end)

if idx1 == -1 or idx2 == -1:
    print('Error: Target boundaries not found in index.html')
    sys.exit(1)

new_html_block = r'''      <!-- 4. STUDENT PERFORMANCE ANALYSIS (TESTBOOK EXACT REPLICA) -->
      <div id="analysisArea" class="hidden" style="display:flex;flex-direction:column;height:100vh;width:100vw;background:#f8fafc;color:#0f172a;overflow-y:auto;font-family:'Outfit','Plus Jakarta Sans',sans-serif;">
        <!-- Top Header Bar matching Testbook -->
        <header style="height:56px;background:#ffffff;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;padding:0 24px;position:sticky;top:0;z-index:100;flex-shrink:0;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="font-size:18px;font-weight:900;color:#0284c7;display:flex;align-items:center;gap:6px;">
              <span>testbook</span>
            </div>
            <span style="color:#cbd5e1;">|</span>
            <span id="analysisTestTitle" style="font-size:14.5px;font-weight:750;color:#0f172a;max-width:500px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
              Indian Economy &amp; Indian Financial System (IE &amp; IFS) FT 1
            </span>
          </div>

          <div style="display:flex;align-items:center;gap:16px;">
            <button type="button" onclick="reattemptCurrentTest()" style="background:#e0f2fe;color:#0284c7;border:1px solid #bae6fd;border-radius:20px;padding:5px 14px;font-size:12px;font-weight:750;cursor:pointer;display:flex;align-items:center;gap:4px;">
              Reattempt This Test ℹ
            </button>
            <div style="display:flex;align-items:center;gap:3px;font-size:12px;color:#64748b;">
              <span>Rate the Test:</span>
              <span style="color:#f59e0b;font-size:15px;cursor:pointer;">★★★★★</span>
            </div>
            <a href="javascript:void(0)" onclick="closeAnalysisAndGoHome()" style="font-size:12.5px;color:#64748b;text-decoration:none;font-weight:600;">Go to Tests</a>
            <button type="button" onclick="openDetailedSolutions()" style="background:#0284c7;color:#ffffff;border:none;border-radius:4px;padding:7px 18px;font-size:12.5px;font-weight:800;cursor:pointer;box-shadow:0 1px 3px rgba(2,132,199,0.3);">
              Solutions &rarr;
            </button>
            <button type="button" onclick="closeAnalysisAndGoHome()" style="background:none;border:none;font-size:18px;color:#64748b;cursor:pointer;line-height:1;padding:4px;" title="Close">&times;</button>
          </div>
        </header>

        <!-- Main Analysis Scrollable Content -->
        <main style="max-width:1200px;width:95%;margin:20px auto 40px;display:flex;flex-direction:column;gap:22px;">
          
          <!-- 1. Overall Performance Summary Card (5 Colorful Badges matching screenshot) -->
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:20px 24px;box-shadow:0 1px 4px rgba(15,23,42,0.03);">
            <h3 style="font-size:15px;font-weight:800;color:#0f172a;margin:0 0 16px;">Overall Performance Summary</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:12px;">
              
              <!-- Badge 1: Rank (Red) -->
              <div style="background:#fff1f2;border:1px solid #fecdd3;border-radius:8px;padding:12px 16px;display:flex;align-items:center;gap:12px;">
                <div style="width:38px;height:38px;border-radius:50%;background:#e11d48;color:#fff;display:flex;align-items:center;justify-content:center;font-size:16px;">🏆</div>
                <div>
                  <div id="testbookRankVal" style="font-size:16px;font-weight:900;color:#0f172a;">1006 / 1245</div>
                  <div style="font-size:11px;color:#e11d48;font-weight:700;">Rank</div>
                </div>
              </div>

              <!-- Badge 2: Score (Purple) -->
              <div style="background:#faf5ff;border:1px solid #f3e8ff;border-radius:8px;padding:12px 16px;display:flex;align-items:center;gap:12px;">
                <div style="width:38px;height:38px;border-radius:50%;background:#7e22ce;color:#fff;display:flex;align-items:center;justify-content:center;font-size:16px;">🏆</div>
                <div>
                  <div id="testbookScoreVal" style="font-size:16px;font-weight:900;color:#0f172a;">2 / 100</div>
                  <div style="font-size:11px;color:#7e22ce;font-weight:700;">Score</div>
                </div>
              </div>

              <!-- Badge 3: Attempted (Cyan) -->
              <div style="background:#f0f9ff;border:1px solid #e0f2fe;border-radius:8px;padding:12px 16px;display:flex;align-items:center;gap:12px;">
                <div style="width:38px;height:38px;border-radius:50%;background:#0284c7;color:#fff;display:flex;align-items:center;justify-content:center;font-size:16px;">📋</div>
                <div>
                  <div id="testbookAttemptedVal" style="font-size:16px;font-weight:900;color:#0f172a;">5 / 100</div>
                  <div style="font-size:11px;color:#0284c7;font-weight:700;">Attempted</div>
                </div>
              </div>

              <!-- Badge 4: Accuracy (Green) -->
              <div style="background:#f0fdf4;border:1px solid #dcfce7;border-radius:8px;padding:12px 16px;display:flex;align-items:center;gap:12px;">
                <div style="width:38px;height:38px;border-radius:50%;background:#16a34a;color:#fff;display:flex;align-items:center;justify-content:center;font-size:16px;">🎯</div>
                <div>
                  <div id="testbookAccuracyVal" style="font-size:16px;font-weight:900;color:#0f172a;">80%</div>
                  <div style="font-size:11px;color:#16a34a;font-weight:700;">Accuracy</div>
                </div>
              </div>

              <!-- Badge 5: Percentile (Violet) -->
              <div style="background:#eef2ff;border:1px solid #e0e7ff;border-radius:8px;padding:12px 16px;display:flex;align-items:center;gap:12px;">
                <div style="width:38px;height:38px;border-radius:50%;background:#4f46e5;color:#fff;display:flex;align-items:center;justify-content:center;font-size:16px;">⚡</div>
                <div>
                  <div id="testbookPercentileVal" style="font-size:16px;font-weight:900;color:#0f172a;">19.28%</div>
                  <div style="font-size:11px;color:#4f46e5;font-weight:700;">Percentile</div>
                </div>
              </div>

            </div>
          </div>

          <!-- 2. Sectional Summary Table matching Testbook -->
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:20px 24px;box-shadow:0 1px 4px rgba(15,23,42,0.03);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
              <h3 style="font-size:15px;font-weight:800;color:#0f172a;margin:0;">Sectional Summary</h3>
              <div style="font-size:12px;color:#64748b;display:flex;align-items:center;gap:6px;">
                <span>Estimated cutoff:</span>
                <span style="color:#0284c7;font-weight:700;">Select your category ▾</span>
              </div>
            </div>

            <div style="overflow-x:auto;">
              <table style="width:100%;border-collapse:collapse;font-size:13px;text-align:left;">
                <thead>
                  <tr style="border-bottom:1.5px solid #e2e8f0;color:#64748b;font-size:11.5px;font-weight:750;text-transform:uppercase;">
                    <th style="padding:10px 12px;">Section Name</th>
                    <th style="padding:10px 12px;">Score</th>
                    <th style="padding:10px 12px;">Attempted</th>
                    <th style="padding:10px 12px;">Accuracy</th>
                    <th style="padding:10px 12px;">Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom:1px solid #f1f5f9;">
                    <td style="padding:14px 12px;font-weight:700;color:#0f172a;" id="tblSectionName">Test</td>
                    <td style="padding:14px 12px;">
                      <div id="tblScore" style="font-weight:750;color:#0f172a;">2 / 100</div>
                      <div style="font-size:11px;color:#94a3b8;">N/A</div>
                    </td>
                    <td style="padding:14px 12px;color:#0f172a;" id="tblAttempted">5 / 100</td>
                    <td style="padding:14px 12px;">
                      <div style="display:flex;align-items:center;gap:8px;">
                        <span id="tblAccuracy" style="font-weight:750;color:#16a34a;min-width:32px;">80%</span>
                        <div style="width:80px;height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;">
                          <div id="tblAccuracyBar" style="width:80%;height:100%;background:#16a34a;border-radius:3px;"></div>
                        </div>
                      </div>
                    </td>
                    <td style="padding:14px 12px;color:#0f172a;" id="tblTime">04:46 / 120 min</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 3. Two-Column Layout: Left (Rank Predictor, Topper Compare, Supercoaching, Charts) + Right (Top Rankers) -->
          <div style="display:grid;grid-template-columns:1.8fr 1fr;gap:22px;align-items:start;">
            
            <!-- LEFT MAIN COLUMN -->
            <div style="display:flex;flex-direction:column;gap:22px;">
              
              <!-- Rank Predictor Slider -->
              <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:20px 24px;box-shadow:0 1px 4px rgba(15,23,42,0.03);">
                <h3 style="font-size:15px;font-weight:800;color:#0f172a;margin:0 0 16px;">Rank Predictor</h3>
                <div style="position:relative;padding:26px 12px 10px;">
                  <!-- Floating tooltip above slider -->
                  <div id="rankSliderTooltip" style="position:absolute;left:14%;top:0;transform:translateX(-50%);background:#1e293b;color:#fff;font-size:10.5px;font-weight:800;padding:3px 8px;border-radius:4px;box-shadow:0 2px 4px rgba(0,0,0,0.2);">
                    Rank: 1006
                  </div>
                  <!-- Slider Bar -->
                  <div style="height:6px;background:#e2e8f0;border-radius:3px;position:relative;">
                    <div style="position:absolute;left:14%;top:50%;transform:translate(-50%, -50%);width:14px;height:14px;background:#0284c7;border:2.5px solid #fff;border-radius:50%;box-shadow:0 1px 3px rgba(0,0,0,0.3);"></div>
                  </div>
                  <!-- Scale numbers matching screenshot -->
                  <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:10.5px;color:#94a3b8;">
                    <span>0</span><span>9</span><span>18</span><span>27</span><span>36</span><span>45</span><span>54</span><span>63</span><span>72</span><span>81</span>
                  </div>
                  <div style="text-align:center;font-size:11px;color:#64748b;margin-top:4px;font-weight:600;">Marks</div>
                </div>
              </div>

              <!-- Compare with Topper Table matching screenshot -->
              <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:20px 24px;box-shadow:0 1px 4px rgba(15,23,42,0.03);">
                <h3 style="font-size:15px;font-weight:800;color:#0f172a;margin:0 0 14px;">Compare with Topper</h3>
                <div style="overflow-x:auto;">
                  <table style="width:100%;border-collapse:collapse;font-size:12.5px;text-align:center;">
                    <thead>
                      <tr style="border-bottom:1.5px solid #e2e8f0;color:#64748b;font-size:11px;font-weight:750;text-transform:uppercase;">
                        <th style="padding:8px;text-align:left;"></th>
                        <th style="padding:8px;">Score</th>
                        <th style="padding:8px;">Accuracy</th>
                        <th style="padding:8px;">Correct</th>
                        <th style="padding:8px;">Wrong</th>
                        <th style="padding:8px;">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style="border-bottom:1px solid #f1f5f9;background:#f8fafc;">
                        <td style="padding:10px 8px;font-weight:800;color:#0f172a;text-align:left;">You</td>
                        <td style="padding:10px 8px;font-weight:800;color:#0284c7;" id="cmpYouScore">2 / 100</td>
                        <td style="padding:10px 8px;color:#16a34a;font-weight:700;" id="cmpYouAcc">80%</td>
                        <td style="padding:10px 8px;" id="cmpYouCorrect">4 / 100</td>
                        <td style="padding:10px 8px;color:#dc2626;" id="cmpYouWrong">1 / 100</td>
                        <td style="padding:10px 8px;" id="cmpYouTime">04:46 / 120m</td>
                      </tr>
                      <tr style="border-bottom:1px solid #f1f5f9;">
                        <td style="padding:10px 8px;font-weight:750;color:#0f172a;text-align:left;">Topper</td>
                        <td style="padding:10px 8px;font-weight:750;color:#16a34a;">88.5 / 100</td>
                        <td style="padding:10px 8px;font-weight:700;">87%</td>
                        <td style="padding:10px 8px;">87 / 100</td>
                        <td style="padding:10px 8px;color:#dc2626;">13 / 100</td>
                        <td style="padding:10px 8px;">37:51 / 120m</td>
                      </tr>
                      <tr>
                        <td style="padding:10px 8px;font-weight:750;color:#64748b;text-align:left;">Avg</td>
                        <td style="padding:10px 8px;color:#64748b;">36.86 / 100</td>
                        <td style="padding:10px 8px;color:#64748b;">54.67%</td>
                        <td style="padding:10px 8px;color:#64748b;">36 / 100</td>
                        <td style="padding:10px 8px;color:#64748b;">30 / 100</td>
                        <td style="padding:10px 8px;color:#64748b;">34:44 / 120m</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Recommended Supercoaching Cards matching screenshot -->
              <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:20px 24px;box-shadow:0 1px 4px rgba(15,23,42,0.03);">
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:14px;">
                  <span style="font-size:16px;color:#e11d48;font-weight:900;">Supercoaching</span>
                </div>
                <div style="font-size:13.5px;font-weight:700;color:#0f172a;margin-bottom:12px;">Recommended Supercoaching For You:</div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                  <div style="border:1px solid #e2e8f0;border-radius:8px;padding:12px;background:#f8fafc;display:flex;gap:10px;align-items:center;">
                    <div style="width:36px;height:36px;border-radius:6px;background:#1e3a8a;color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;">IE&amp;IFS</div>
                    <div>
                      <div style="font-size:12.5px;font-weight:750;color:#0f172a;">JAIIB - Indian Economy &amp; Financial System</div>
                      <div style="font-size:11.5px;color:#16a34a;font-weight:800;">₹999 <span style="color:#64748b;font-weight:500;">for 6 Months</span></div>
                    </div>
                  </div>
                  <div style="border:1px solid #e2e8f0;border-radius:8px;padding:12px;background:#f8fafc;display:flex;gap:10px;align-items:center;">
                    <div style="width:36px;height:36px;border-radius:6px;background:#065f46;color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;">AFM</div>
                    <div>
                      <div style="font-size:12.5px;font-weight:750;color:#0f172a;">JAIIB - Accounting &amp; Financial Management</div>
                      <div style="font-size:11.5px;color:#16a34a;font-weight:800;">₹999 <span style="color:#64748b;font-weight:500;">for 6 Months</span></div>
                    </div>
                  </div>
                  <div style="border:1px solid #e2e8f0;border-radius:8px;padding:12px;background:#f8fafc;display:flex;gap:10px;align-items:center;">
                    <div style="width:36px;height:36px;border-radius:6px;background:#7e22ce;color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;">SUPER</div>
                    <div>
                      <div style="font-size:12.5px;font-weight:750;color:#0f172a;">JAIIB Super Pack (All 4 Papers)</div>
                      <div style="font-size:11.5px;color:#16a34a;font-weight:800;">₹2699 <span style="color:#64748b;font-weight:500;">for 6 Months</span></div>
                    </div>
                  </div>
                  <div style="border:1px solid #e2e8f0;border-radius:8px;padding:12px;background:#f8fafc;display:flex;gap:10px;align-items:center;">
                    <div style="width:36px;height:36px;border-radius:6px;background:#b45309;color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;">PPB</div>
                    <div>
                      <div style="font-size:12.5px;font-weight:750;color:#0f172a;">JAIIB - Principles &amp; Practices of Banking</div>
                      <div style="font-size:11.5px;color:#16a34a;font-weight:800;">₹999 <span style="color:#64748b;font-weight:500;">for 6 Months</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Marks Distribution & Question Distribution Charts -->
              <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:20px 24px;box-shadow:0 1px 4px rgba(15,23,42,0.03);">
                <h3 style="font-size:15px;font-weight:800;color:#0f172a;margin:0 0 16px;">Marks Distribution (Bell Curve)</h3>
                <svg viewBox="0 0 600 160" style="width:100%;height:150px;background:#f8fafc;border-radius:8px;">
                  <line x1="40" y1="130" x2="560" y2="130" stroke="#cbd5e1" stroke-width="1.5"/>
                  <path d="M 60,130 Q 150,120 220,70 T 320,30 T 420,70 T 540,130" fill="none" stroke="#0ea5e9" stroke-width="2.5"/>
                  <circle cx="100" cy="125" r="4" fill="#0284c7"/>
                  <circle cx="320" cy="30" r="5" fill="#0284c7"/>
                  <text x="320" y="20" font-size="10" font-weight="bold" fill="#0284c7" text-anchor="middle">Median: 52</text>
                  <circle cx="100" cy="125" r="6" fill="#e11d48"/>
                  <text x="100" y="115" font-size="9.5" font-weight="bold" fill="#e11d48" text-anchor="middle">You: 2.0</text>
                  <text x="60" y="145" font-size="9" fill="#94a3b8">0</text>
                  <text x="180" y="145" font-size="9" fill="#94a3b8">24</text>
                  <text x="320" y="145" font-size="9" fill="#94a3b8">48</text>
                  <text x="440" y="145" font-size="9" fill="#94a3b8">72</text>
                  <text x="540" y="145" font-size="9" fill="#94a3b8">100</text>
                </svg>

                <div style="margin-top:20px;">
                  <h4 style="font-size:13.5px;font-weight:800;color:#0f172a;margin:0 0 12px;">Question Distribution</h4>
                  <div style="display:flex;align-items:center;gap:16px;font-size:11.5px;color:#64748b;margin-bottom:8px;">
                    <span style="display:flex;align-items:center;gap:4px;"><span style="width:10px;height:10px;background:#e11d48;border-radius:2px;"></span> Incorrect (1)</span>
                    <span style="display:flex;align-items:center;gap:4px;"><span style="width:10px;height:10px;background:#16a34a;border-radius:2px;"></span> Correct (4)</span>
                    <span style="display:flex;align-items:center;gap:4px;"><span style="width:10px;height:10px;background:#94a3b8;border-radius:2px;"></span> Skipped (95)</span>
                  </div>
                  <div style="height:12px;background:#f1f5f9;border-radius:6px;overflow:hidden;display:flex;">
                    <div style="width:1%;background:#e11d48;" title="1 Incorrect"></div>
                    <div style="width:4%;background:#16a34a;" title="4 Correct"></div>
                    <div style="width:95%;background:#cbd5e1;" title="95 Skipped"></div>
                  </div>
                </div>
              </div>

            </div>

            <!-- RIGHT SIDEBAR: Top Rankers Leaderboard matching screenshot -->
            <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:20px;box-shadow:0 1px 4px rgba(15,23,42,0.03);">
              <h3 style="font-size:15px;font-weight:800;color:#0f172a;margin:0 0 16px;">Top Rankers</h3>
              <div style="display:flex;flex-direction:column;gap:10px;">
                
                <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f8fafc;">
                  <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-size:13px;font-weight:800;color:#64748b;width:18px;">1.</span>
                    <div style="width:30px;height:30px;border-radius:50%;background:#0284c7;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;">👤</div>
                    <div style="font-size:13px;font-weight:750;color:#0f172a;">Shashwat Chat</div>
                  </div>
                  <span style="font-size:12.5px;font-weight:800;color:#16a34a;">88.5/100</span>
                </div>

                <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f8fafc;">
                  <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-size:13px;font-weight:800;color:#64748b;width:18px;">2.</span>
                    <div style="width:30px;height:30px;border-radius:50%;background:#16a34a;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;">A</div>
                    <div style="font-size:13px;font-weight:750;color:#0f172a;">Abhishek Mishra</div>
                  </div>
                  <span style="font-size:12.5px;font-weight:800;color:#16a34a;">83.5/100</span>
                </div>

                <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f8fafc;">
                  <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-size:13px;font-weight:800;color:#64748b;width:18px;">3.</span>
                    <div style="width:30px;height:30px;border-radius:50%;background:#0284c7;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;">👤</div>
                    <div style="font-size:13px;font-weight:750;color:#0f172a;">Pranith</div>
                  </div>
                  <span style="font-size:12.5px;font-weight:800;color:#16a34a;">81.5/100</span>
                </div>

                <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f8fafc;">
                  <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-size:13px;font-weight:800;color:#64748b;width:18px;">4.</span>
                    <div style="width:30px;height:30px;border-radius:50%;background:#0284c7;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;">👤</div>
                    <div style="font-size:13px;font-weight:750;color:#0f172a;">Rothangliana</div>
                  </div>
                  <span style="font-size:12.5px;font-weight:800;color:#16a34a;">80.5/100</span>
                </div>

                <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f8fafc;">
                  <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-size:13px;font-weight:800;color:#64748b;width:18px;">5.</span>
                    <div style="width:30px;height:30px;border-radius:50%;background:#0284c7;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;">👤</div>
                    <div style="font-size:13px;font-weight:750;color:#0f172a;">Utkarsh Tripathi</div>
                  </div>
                  <span style="font-size:12.5px;font-weight:800;color:#16a34a;">79/100</span>
                </div>

                <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f8fafc;">
                  <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-size:13px;font-weight:800;color:#64748b;width:18px;">6.</span>
                    <div style="width:30px;height:30px;border-radius:50%;background:#0284c7;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;">👤</div>
                    <div style="font-size:13px;font-weight:750;color:#0f172a;">Piyush Raj</div>
                  </div>
                  <span style="font-size:12.5px;font-weight:800;color:#16a34a;">79/100</span>
                </div>

                <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f8fafc;">
                  <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-size:13px;font-weight:800;color:#64748b;width:18px;">7.</span>
                    <div style="width:30px;height:30px;border-radius:50%;background:#f59e0b;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;">SK</div>
                    <div style="font-size:13px;font-weight:750;color:#0f172a;">Sharvan Kaushik</div>
                  </div>
                  <span style="font-size:12.5px;font-weight:800;color:#16a34a;">78/100</span>
                </div>

                <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;">
                  <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-size:13px;font-weight:800;color:#64748b;width:18px;">8.</span>
                    <div style="width:30px;height:30px;border-radius:50%;background:#0284c7;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;">👤</div>
                    <div style="font-size:13px;font-weight:750;color:#0f172a;">Shubham BPC...</div>
                  </div>
                  <span style="font-size:12.5px;font-weight:800;color:#16a34a;">78/100</span>
                </div>

              </div>
            </div>

          </div>

        </main>
      </div>

      <!-- 5. DETAILED SOLUTIONS VIEWER (TESTBOOK EXACT REPLICA) -->
      <div id="solutionsArea" class="hidden" style="display:flex;flex-direction:column;height:100vh;width:100vw;background:#ffffff;color:#0f172a;overflow:hidden;font-family:'Outfit','Plus Jakarta Sans',sans-serif;">
        <!-- Top Bar: Left Back arrow + Title, Right Stars + ANALYTICS button -->
        <header style="height:52px;background:#ffffff;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;padding:0 20px;flex-shrink:0;">
          <div style="display:flex;align-items:center;gap:12px;">
            <button type="button" onclick="closeSolutionsAndGoHome()" style="background:none;border:none;font-size:16px;color:#0284c7;cursor:pointer;display:flex;align-items:center;gap:4px;font-weight:750;">
              &larr; Tests
            </button>
            <span style="color:#cbd5e1;">|</span>
            <span id="solutionTestTitleHeader" style="font-size:14px;font-weight:750;color:#0f172a;max-width:520px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
              Indian Economy &amp; Indian Financial System (IE &amp; IFS) FT 1
            </span>
          </div>

          <div style="display:flex;align-items:center;gap:14px;">
            <div style="display:flex;align-items:center;gap:4px;font-size:12px;color:#64748b;">
              <span>Rate the Test:</span>
              <span style="color:#f59e0b;font-size:15px;cursor:pointer;">★★★★★</span>
            </div>
            <button type="button" onclick="backToAnalysis()" style="background:#0284c7;color:#ffffff;border:none;border-radius:4px;padding:6px 18px;font-size:12.5px;font-weight:800;cursor:pointer;letter-spacing:0.3px;">
              ANALYTICS &rarr;
            </button>
            <button type="button" onclick="closeSolutionsAndGoHome()" style="background:none;border:none;font-size:20px;color:#64748b;cursor:pointer;line-height:1;padding:4px;" title="Exit Solutions">&times;</button>
          </div>
        </header>

        <!-- Sections Bar: SECTIONS | [ Test ] -->
        <div style="height:38px;background:#f8fafc;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;padding:0 20px;gap:12px;font-size:12px;flex-shrink:0;">
          <span style="font-weight:800;color:#64748b;letter-spacing:0.5px;">SECTIONS |</span>
          <div style="display:flex;gap:6px;">
            <button type="button" style="padding:4px 14px;background:#0e7490;color:#ffffff;border:none;border-radius:4px;font-size:12px;font-weight:700;">
              Test
            </button>
          </div>
        </div>

        <!-- Main Workspace: Split Left (Question + Explanations) + Right (Testbook Solutions Sidebar) -->
        <div style="flex:1;display:flex;overflow:hidden;position:relative;">
          
          <!-- LEFT: QUESTION & SOLUTIONS DETAIL -->
          <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;background:#ffffff;">
            
            <!-- Question Top Bar: Question No. X, Correct/Incorrect, You/Avg Time, Marks, Accuracy % -->
            <div style="height:44px;background:#ffffff;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;padding:0 24px;flex-shrink:0;">
              <div style="display:flex;align-items:center;gap:10px;">
                <span id="solQNumberHeader" style="font-size:15px;font-weight:800;color:#0f172a;">Question No. 1</span>
                <span id="solStatusBadge" style="background:#16a34a;color:#fff;font-size:11px;font-weight:800;padding:2px 8px;border-radius:4px;">Correct</span>
                <span style="font-size:11.5px;color:#64748b;">⏰ You: <strong id="solUserTime" style="color:#0f172a;">01:05</strong></span>
                <span style="font-size:11.5px;color:#64748b;">Avg: <strong>00:22</strong></span>
                <span id="solMarksBadge" style="background:#dcfce7;color:#166534;font-size:11px;font-weight:800;padding:2px 6px;border-radius:4px;">Marks 1.0</span>
                <span style="background:#eff6ff;color:#1d4ed8;font-size:11px;font-weight:700;padding:2px 6px;border-radius:4px;">39.23% answered correctly</span>
              </div>
              <div style="display:flex;align-items:center;gap:12px;font-size:12px;color:#64748b;">
                <span style="cursor:pointer;">💾 Save</span>
                <span style="color:#dc2626;cursor:pointer;">▲ Report</span>
              </div>
            </div>

            <!-- Scrollable Content: Question Text, Radio Options with Green/Red highlights, Re-attempt Box, Explanation -->
            <div id="solQuestionScrollArea" style="flex:1;overflow-y:auto;padding:22px 28px;">
              <div id="solQuestionBody"></div>

              <!-- Re-attempt Mode Box matching Testbook screenshot -->
              <div style="background:#fffbeb;border:1px solid #fef3c7;border-radius:8px;padding:14px 18px;margin-top:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
                <div>
                  <div style="font-size:13px;font-weight:800;color:#b45309;">Re-attempt mode: ON</div>
                  <div style="font-size:12px;color:#92400e;">Now you can re-attempt the question or click to view complete faculty rationale.</div>
                </div>
                <button type="button" onclick="toggleSolutionExplanation()" id="btnToggleExplanation" style="border:1.5px solid #0284c7;background:#ffffff;color:#0284c7;font-weight:750;padding:6px 16px;border-radius:4px;font-size:12.5px;cursor:pointer;">
                  👁 View Solution
                </button>
              </div>

              <!-- Full Faculty Explanation Box (Expanded when View Solution clicked) -->
              <div id="solExplanationBox" style="margin-top:16px;background:#f0f9ff;border:1.5px solid #bae6fd;border-radius:8px;padding:18px 20px;">
                <div style="font-size:13.5px;font-weight:800;color:#0369a1;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
                  <span>💡</span> Detailed Solution &amp; Conceptual Walkthrough:
                </div>
                <div id="solExplanationText" style="font-size:13.5px;color:#1e293b;line-height:1.6;"></div>
              </div>
            </div>

            <!-- Bottom Navigation Footer Bar -->
            <footer style="height:54px;background:#f8fafc;border-top:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;padding:0 24px;flex-shrink:0;">
              <button type="button" onclick="moveSolution(-1)" class="btn ghost" style="padding:8px 18px;font-size:13px;font-weight:700;border:1px solid #cbd5e1;">
                &larr; Previous
              </button>
              <div style="display:flex;align-items:center;gap:8px;font-size:12.5px;color:#475569;font-weight:600;">
                <span>Re-attempt Questions</span>
                <span style="display:inline-block;width:34px;height:18px;background:#0284c7;border-radius:10px;position:relative;cursor:pointer;">
                  <span style="position:absolute;right:2px;top:2px;width:14px;height:14px;background:#fff;border-radius:50%;"></span>
                </span>
              </div>
              <button type="button" onclick="moveSolution(1)" style="background:#0284c7;color:#ffffff;border:none;border-radius:4px;padding:8px 24px;font-size:13px;font-weight:700;cursor:pointer;">
                Next &rarr;
              </button>
            </footer>
          </div>

          <!-- RIGHT: TESTBOOK SOLUTIONS SIDEBAR -->
          <aside style="width:310px;background:#f0f9ff;border-left:1px solid #e2e8f0;display:flex;flex-direction:column;overflow:hidden;flex-shrink:0;">
            <!-- Candidate info + Filter -->
            <div style="padding:12px 16px;background:#ffffff;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;">
              <div style="display:flex;align-items:center;gap:10px;">
                <div style="width:34px;height:34px;border-radius:50%;background:#0284c7;color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;">👤</div>
                <div style="font-size:13.5px;font-weight:750;color:#0f172a;" id="solSidebarCandidateName">Prakash</div>
              </div>
              <div style="font-size:12px;color:#0284c7;font-weight:700;cursor:pointer;">🝖 Filter</div>
            </div>

            <!-- Quick Counts: 4 Correct, 95 Unattempted, 1 Incorrect, 0 Partially Correct -->
            <div style="padding:10px 14px;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-size:11px;color:#334155;">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 10px;">
                <div style="display:flex;align-items:center;gap:6px;">
                  <span id="solCountCorrect" style="width:18px;height:18px;background:#16a34a;color:#fff;border-radius:3px;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:11px;">4</span>
                  <span>Correct</span>
                </div>
                <div style="display:flex;align-items:center;gap:6px;">
                  <span id="solCountUnattempted" style="width:18px;height:18px;background:#ffffff;border:1px solid #cbd5e1;color:#475569;border-radius:3px;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:11px;">95</span>
                  <span>Unattempted</span>
                </div>
                <div style="display:flex;align-items:center;gap:6px;">
                  <span id="solCountIncorrect" style="width:18px;height:18px;background:#dc2626;color:#fff;border-radius:3px;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:11px;">1</span>
                  <span>Incorrect</span>
                </div>
                <div style="display:flex;align-items:center;gap:6px;">
                  <span style="width:18px;height:18px;background:#eab308;color:#fff;border-radius:3px;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:11px;">0</span>
                  <span>Partially Correct</span>
                </div>
              </div>
            </div>

            <!-- Speed Indicators Bar -->
            <div style="padding:8px 14px;background:#ffffff;border-bottom:1px solid #e2e8f0;font-size:10.5px;color:#64748b;">
              <div style="font-weight:800;color:#0f172a;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.3px;">SPEED INDICATORS</div>
              <div style="display:flex;gap:10px;flex-wrap:wrap;">
                <span>🚀 Superfast</span>
                <span>⏱️ On Time</span>
                <span>🐢 Slow</span>
              </div>
            </div>

            <!-- Section banner -->
            <div style="background:#bae6fd;padding:6px 14px;font-size:12px;font-weight:800;color:#0369a1;text-transform:uppercase;letter-spacing:0.5px;">
              SECTION : <span id="solActiveSectionLabel">Test</span>
            </div>

            <!-- 5-Column Question Grid (Color coded: Green=Correct, Red=Incorrect, White=Unattempted) -->
            <div style="flex:1;overflow-y:auto;padding:12px;">
              <div id="solPaletteButtons" style="display:grid;grid-template-columns:repeat(5, 1fr);gap:8px;"></div>
            </div>

            <!-- Bottom action buttons: Question Paper & Summary -->
            <div style="padding:10px 14px;background:#ffffff;border-top:1px solid #e2e8f0;display:flex;gap:8px;">
              <button type="button" onclick="openCbtQuestionPaperModal()" style="flex:1;background:#bae6fd;color:#0369a1;border:none;border-radius:4px;padding:8px;font-size:12px;font-weight:700;cursor:pointer;">
                Question Paper
              </button>
              <button type="button" onclick="backToAnalysis()" style="flex:1;background:#0284c7;color:#ffffff;border:none;border-radius:4px;padding:8px;font-size:12px;font-weight:700;cursor:pointer;">
                Summary
              </button>
            </div>
          </aside>
        </div>
      </div>
'''

updated_html = html[:idx1] + new_html_block + '\n' + html[idx2:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(updated_html)

print('Successfully integrated Testbook Solutions and Analysis into index.html!')

