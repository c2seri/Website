# -*- coding: utf-8 -*-
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

m1 = html.find('id="instruct"')
# find enclosing div for instruct
start_idx = html.rfind('<div id="instruct"', 0, m1 + 20)
end_idx = html.find('<!-- 2. ACTIVE TEST AREA', m1)

if start_idx == -1 or end_idx == -1:
    print('Error: Could not find instruct boundaries')
    exit(1)

new_instruct_html = r'''<!-- 1. EXAM INSTRUCTIONS & REAL TESTBOOK TWO-STEP CBT SETUP -->
      <div id="instruct" style="display:flex;flex-direction:column;height:100vh;width:100vw;background:#ffffff;color:#0f172a;overflow:hidden;font-family:'Outfit','Plus Jakarta Sans',sans-serif;">
        <!-- Top Bar: Logo + Test Title -->
        <header style="height:52px;background:#ffffff;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;padding:0 24px;gap:12px;flex-shrink:0;">
          <div style="font-size:18px;font-weight:900;color:#0284c7;display:flex;align-items:center;gap:6px;">
            <span>testbook</span>
          </div>
          <span style="color:#cbd5e1;">|</span>
          <span id="instructHeaderTestTitle" style="font-size:14px;font-weight:700;color:#1e293b;max-width:650px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            Banking PO - English Language (Banking Battle): Mini Live Test
          </span>
        </header>

        <!-- Main Workspace: Split Left (Scrollable Content + Bottom Action Bar) + Right (Candidate Sidebar) -->
        <div style="flex:1;display:flex;overflow:hidden;">
          
          <!-- LEFT COLUMN -->
          <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;">
            
            <!-- STEP 1: GENERAL INSTRUCTIONS -->
            <div id="instructStep1" style="flex:1;overflow-y:auto;padding:26px 36px;">
              <h3 style="font-size:15.5px;font-weight:800;color:#0f172a;margin:0 0 14px;">General Instructions:</h3>
              <ol style="padding-left:20px;margin:0 0 16px;line-height:1.65;font-size:13px;color:#334155;">
                <li style="margin-bottom:10px;">The clock will be set at the server. The countdown timer at the top right corner of screen will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end by itself. You need not terminate the examination or submit your paper.</li>
                <li style="margin-bottom:10px;">
                  The Question Palette displayed on the right side of screen will show the status of each question using one of the following symbols:
                  <div style="margin:12px 0 12px 10px;display:flex;flex-direction:column;gap:8px;">
                    <div style="display:flex;align-items:center;gap:12px;">
                      <span style="width:20px;height:20px;background:#ffffff;border:1.5px solid #cbd5e1;border-radius:3px;display:inline-block;flex-shrink:0;"></span>
                      <span>You have not visited the question yet.</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:12px;">
                      <span style="width:20px;height:20px;background:#dc2626;border-radius:3px;display:inline-block;flex-shrink:0;"></span>
                      <span>You have not answered the question.</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:12px;">
                      <span style="width:20px;height:20px;background:#16a34a;border-radius:3px;display:inline-block;flex-shrink:0;"></span>
                      <span>You have answered the question.</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:12px;">
                      <span style="width:20px;height:20px;background:#7e22ce;border-radius:50%;display:inline-block;flex-shrink:0;"></span>
                      <span>You have NOT answered the question, but have marked the question for review.</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:12px;">
                      <span style="width:20px;height:20px;background:#7e22ce;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;color:#22c55e;font-size:11px;font-weight:900;flex-shrink:0;">✓</span>
                      <span>You have answered the question, but marked it for review.</span>
                    </div>
                  </div>
                  <p style="margin:8px 0 0;font-size:12.5px;color:#475569;">The <strong>Mark For Review</strong> status for a question simply indicates that you would like to look at that question again. If a question is answered, but marked for review, then the answer will be considered for evaluation unless the status is modified by the candidate.</p>
                </li>
              </ol>

              <h4 style="font-size:14px;font-weight:800;color:#0f172a;margin:16px 0 8px;">Navigating to a Question :</h4>
              <ol start="3" style="padding-left:20px;margin:0 0 16px;line-height:1.65;font-size:13px;color:#334155;">
                <li style="margin-bottom:10px;">
                  To answer a question, do the following:
                  <ol type="1" style="padding-left:20px;margin:6px 0;">
                    <li>Click on the question number in the Question Palette at the right of your screen to go to that numbered question directly. Note that using this option does NOT save your answer to the current question.</li>
                    <li>Click on <strong>Save &amp; Next</strong> to save your answer for the current question and then go to the next question.</li>
                    <li>Click on <strong>Mark for Review &amp; Next</strong> to save your answer for the current question and also mark it for review , and then go to the next question.</li>
                  </ol>
                  <p style="margin:6px 0;font-size:12.5px;color:#475569;">Note that your answer for the current question will not be saved, if you navigate to another question directly by clicking on a question number without saving the answer to the previous question.</p>
                  <p style="margin:6px 0;font-size:12.5px;color:#dc2626;">You can view all the questions by clicking on the <strong>Question Paper</strong> button. This feature is provided, so that if you want you can just see the entire question paper at a glance.</p>
                </li>
              </ol>

              <h4 style="font-size:14px;font-weight:800;color:#0f172a;margin:16px 0 8px;">Answering a Question :</h4>
              <ol start="4" style="padding-left:20px;margin:0 0 16px;line-height:1.65;font-size:13px;color:#334155;">
                <li style="margin-bottom:10px;">
                  Procedure for answering a multiple choice (MCQ) type question:
                  <ol type="1" style="padding-left:20px;margin:6px 0;">
                    <li>Choose one answer from the 4 options (A,B,C,D) given below the question, click on the bubble placed before the chosen option.</li>
                    <li>To deselect your chosen answer, click on the bubble of the chosen option again or click on the <strong>Clear Response</strong> button</li>
                    <li>To change your chosen answer, click on the bubble of another option.</li>
                    <li>To save your answer, you MUST click on the <strong>Save &amp; Next</strong></li>
                  </ol>
                </li>
                <li style="margin-bottom:10px;">
                  Procedure for answering a numerical answer type question :
                  <ol type="1" style="padding-left:20px;margin:6px 0;">
                    <li>To enter a number as your answer, use the virtual numerical keypad.</li>
                    <li>A fraction (e.g. -0.3 or -.3) can be entered as an answer with or without "0" before the decimal point. <span style="color:#dc2626;">As many as four decimal points, e.g. 12.5435 or 0.003 or -932.6711 or 12.82 can be entered.</span></li>
                    <li>To clear your answer, click on the <strong>Clear Response</strong> button</li>
                    <li>To save your answer, you MUST click on the <strong>Save &amp; Next</strong></li>
                  </ol>
                </li>
                <li style="margin-bottom:10px;">To mark a question for review, click on the <strong>Mark for Review &amp; Next</strong> button. If an answer is selected (for MCQ/MCAQ) entered (for numerical answer type) for a question that is <strong>Marked for Review</strong>, that answer will be considered in the evaluation unless the status is modified by the candidate.</li>
                <li style="margin-bottom:10px;">To change your answer to a question that has already been answered, first select that question for answering and then follow the procedure for answering that type of question.</li>
                <li style="margin-bottom:10px;">Note that <strong>ONLY Questions for which answers are saved or marked for review after answering</strong> will be considered for evaluation.</li>
                <li style="margin-bottom:10px;">Sections in this question paper are displayed on the top bar of the screen. Questions in a Section can be viewed by clicking on the name of that Section. The Section you are currently viewing will be highlighted.</li>
                <li style="margin-bottom:10px;">After clicking the <strong>Save &amp; Next</strong> button for the last question in a Section, you will automatically be taken to the first question of the next Section in sequence.</li>
                <li style="margin-bottom:10px;">You can move the mouse cursor over the name of a Section to view the answering status for that Section.</li>
              </ol>
            </div>

            <!-- STEP 2: SPECIFIC EXAM PATTERN & LANGUAGE SELECTION -->
            <div id="instructStep2" class="hidden" style="flex:1;overflow-y:auto;padding:26px 40px;">
              <div style="text-align:center;margin-bottom:24px;">
                <h2 id="step2TestTitle" style="font-size:21px;font-weight:800;color:#0f172a;margin:0 0 12px;">
                  Banking PO - English Language (Banking Battle): Mini Live Test
                </h2>
                <div style="display:flex;justify-content:space-between;max-width:820px;margin:0 auto;font-size:13.5px;font-weight:750;color:#334155;border-bottom:1px solid #e2e8f0;padding-bottom:10px;">
                  <span>Duration: <strong id="step2DurationVal" style="color:#0f172a;">12 Mins</strong></span>
                  <span>Maximum Marks: <strong id="step2MaxMarksVal" style="color:#0f172a;">20</strong></span>
                </div>
              </div>

              <div style="max-width:820px;margin:0 auto;">
                <p style="font-size:13.5px;font-weight:750;color:#0f172a;margin:0 0 14px;">Read the following instructions carefully.</p>
                <div id="step2ExamRulesList" style="line-height:1.75;font-size:13px;color:#334155;margin-bottom:24px;">
                  <!-- Dynamically populated with exact exam rules for that series -->
                </div>

                <!-- Choose default language & declaration box matching screenshot -->
                <div style="border-top:1.5px solid #e2e8f0;padding-top:20px;margin-top:20px;">
                  <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;flex-wrap:wrap;">
                    <strong style="font-size:13.5px;color:#0f172a;">Choose your default language:</strong>
                    <select id="instructLangSelect" onchange="onInstructLangSelect(this.value)" style="padding:6px 14px;font-size:13px;border:1.5px solid #94a3b8;border-radius:4px;outline:none;font-weight:600;background:#fff;color:#0f172a;cursor:pointer;">
                      <option value="">-- Select --</option>
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Odia">Odia</option>
                    </select>
                  </div>
                  <div style="font-size:12px;color:#dc2626;margin-bottom:18px;">
                    Please note all questions will appear in your default language. This language can be changed for a particular question later on
                  </div>

                  <div style="margin-bottom:10px;">
                    <div style="font-size:13.5px;font-weight:750;color:#0f172a;margin-bottom:8px;">Declaration:</div>
                    <label style="display:flex;align-items:flex-start;gap:10px;font-size:13px;color:#334155;cursor:pointer;line-height:1.45;">
                      <input type="checkbox" id="instructDeclarationCheck" onchange="validateReadyToBegin()" style="margin-top:2px;accent-color:#0284c7;cursor:pointer;width:16px;height:16px;">
                      <span>I have understood and agree to all the instructions.</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sticky Bottom Footer Bar -->
            <footer style="height:52px;background:#ffffff;border-top:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;padding:0 36px;flex-shrink:0;">
              <div id="footerBtnLeft">
                <button type="button" onclick="exitTestSetup()" style="background:none;border:none;color:#0284c7;font-size:13px;font-weight:750;cursor:pointer;display:flex;align-items:center;gap:4px;">
                  &larr; Go to Tests
                </button>
              </div>
              <div id="footerBtnRight">
                <button type="button" id="btnInstructNext" onclick="goToInstructionStep(2)" style="background:#58c0cf;color:#ffffff;border:none;border-radius:4px;padding:7px 24px;font-size:13px;font-weight:750;cursor:pointer;box-shadow:0 1px 3px rgba(88,192,207,0.3);">
                  Next
                </button>
              </div>
            </footer>
          </div>

          <!-- RIGHT COLUMN: Candidate Box -->
          <aside style="width:230px;background:#f8fafc;border-left:1px solid #e2e8f0;display:flex;flex-direction:column;align-items:center;padding-top:40px;flex-shrink:0;">
            <div style="width:84px;height:84px;border-radius:50%;background:#0284c7;color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:38px;box-shadow:0 2px 8px rgba(2,132,199,0.25);">
              👤
            </div>
            <div id="instructCandidateName" style="font-size:17px;font-weight:750;color:#0f172a;margin-top:14px;text-align:center;">
              Prakash
            </div>
          </aside>
        </div>
      </div>

      '''

updated_html = html[:start_idx] + new_instruct_html + html[end_idx:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(updated_html)

print('Successfully replaced instruct with Testbook two-step instruction flow!')

