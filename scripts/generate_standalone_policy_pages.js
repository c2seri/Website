// generate_standalone_policy_pages.js
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const headerHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>{{TITLE}} | C2S &mdash; College to Service, Bhubaneswar</title>
  <meta name="description" content="{{DESCRIPTION}}">
  <link rel="icon" type="image/png" href="favicon.png">
  <link rel="stylesheet" href="styles.css">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-HJ59JX1P5N"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-HJ59JX1P5N');
  </script>
</head>
<body>

  <!-- Top Announcement & Contact Bar (Line 1: Utilities & Student Login) -->
  <div class="top-bar">
    <div class="container top-bar-inner">
      <div class="top-bar-left">
        <span class="top-bar-item"><span class="top-bar-icon">&#128205;</span> NH-16, Opp. Sani Mandir, Patrapada, Bhubaneswar, Odisha 751019</span>
        <span class="top-bar-item"><span class="top-bar-icon">&#128222;</span> Helplines: <a href="tel:9777481909">9777481909</a> / <a href="tel:9658177712">9658177712</a></span>
      </div>
      <div class="top-bar-right">
        <a href="library.html" class="top-bar-pill-link" title="Visit 24-Hour Study Library Hub">
          <span class="pill-dot"></span>
          <span>24h Study Library &bull; Patrapada</span>
        </a>
        <a href="index.html#login" class="top-bar-login-btn">Student Login</a>
      </div>
    </div>
  </div>

  <!-- Main Sticky Brand Header (Line 2: Logo + 5 Clean Navigation Menus) -->
  <header class="site-header">
    <div class="header-inner">
      <a href="index.html" class="brand" title="C2S &mdash; College to Service | Return to Home">
        <span class="logo-badge" role="img" aria-label="C2S official logo"></span>
        <div class="brand-text">
          <div class="brand-title">
            <span class="brand-blue">C2S</span>
            <span class="brand-sub">College to Service</span>
          </div>
          <span class="brand-tagline">YOUR SELECTION OUR MISSION</span>
        </div>
      </a>

      <nav class="topnav" id="topnav" aria-label="Main Navigation">
        <a href="index.html#exams">Exams</a>
        <a href="index.html#tests">Test Series</a>
        <a href="index.html#batches">Classroom Batches</a>
        <a href="library.html">24h Study Library</a>
        <a href="contact.html" class="active">Contact Us</a>
      </nav>
    </div>
  </header>

  <main class="page main-content" style="max-width:1080px;margin:28px auto;padding:0 20px;">
    {{CONTENT}}
  </main>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="footer-grid">
      <!-- Col 1: Brand & Contact -->
      <div class="footer-contact">
        <a href="index.html" class="brand" style="margin-bottom:12px;text-decoration:none;">
          <span class="logo-badge" role="img" aria-label="C2S official logo"></span>
          <div class="brand-text">
            <div class="brand-title">
              <span class="brand-blue" style="color:#fff;">C2S</span>
              <span class="brand-sub" style="color:#cbd5e1;">College to Service</span>
            </div>
            <span class="brand-tagline" style="color:#fdba74;">Your Selection Our Mission</span>
          </div>
        </a>
        <p>Competitive exams coaching for Central and Odisha State Govt jobs, weekly test series, and a 24-hour premium study library in Bhubaneswar.</p>
        <p>
          &#128205; NH-16, opposite Sani Mandir, Patrapada, Bhubaneswar, Odisha 751019<br>
          &#128222; Helplines: <strong>9777481909</strong> / <strong>9658177712</strong>
        </p>
      </div>

      <!-- Col 2: All India Exams -->
      <div>
        <h4>All India Exams</h4>
        <div class="footer-links">
          <a href="index.html#exams">BANK (PO / Clerk / SO)</a>
          <a href="index.html#exams">SSC (CGL / CHSL / GD / MTS)</a>
          <a href="index.html#exams">Railway (NTPC / ALP / Group D)</a>
          <a href="index.html#exams">UPSC Civil Services (IAS / IPS)</a>
          <a href="index.html#exams">Defence (NDA / CDS / AFCAT)</a>
          <a href="index.html#exams">Teaching (CTET / TGT / PGT)</a>
        </div>
      </div>

      <!-- Col 3: Odisha State Exams -->
      <div>
        <h4>Odisha State Exams</h4>
        <div class="footer-links">
          <a href="index.html#exams">OSSC (Group B / C Posts)</a>
          <a href="index.html#exams">OSSSC (Subordinate Posts)</a>
          <a href="index.html#exams">OPSC (OAS / Group A/B)</a>
          <a href="index.html#exams">Odisha Police (Constable / SI)</a>
          <a href="index.html#exams">All 10 Exam Tracks</a>
        </div>
      </div>

      <!-- Col 4: Quick Links -->
      <div>
        <h4>Quick Links</h4>
        <div class="footer-links">
          <a href="index.html#tests">Weekly Test Series</a>
          <a href="library.html">24-Hour Premium Library</a>
          <a href="index.html#batches">Batches &amp; Smart Classes</a>
          <a href="contact.html">Help &amp; Contact Desk</a>
          <a href="terms.html">Terms &amp; Conditions</a>
          <a href="privacy.html">Privacy Policy</a>
          <a href="refund.html">Refund &amp; Cancellation</a>
          <a href="index.html#login">Main Student Login</a>
        </div>
      </div>
    </div>

    <!-- Dedicated Legal Policy Bar -->
    <div class="footer-legal-bar" style="border-top:1px solid #1e293b;margin:28px 0 16px;padding-top:18px;display:flex;justify-content:center;align-items:center;gap:16px;flex-wrap:wrap;font-size:13px;color:#94a3b8;">
      <a href="terms.html" style="color:#cbd5e1;text-decoration:none;">Terms &amp; Conditions</a>
      <span style="color:#475569;">&bull;</span>
      <a href="privacy.html" style="color:#cbd5e1;text-decoration:none;">Privacy Policy</a>
      <span style="color:#475569;">&bull;</span>
      <a href="refund.html" style="color:#cbd5e1;text-decoration:none;">Refund Policy</a>
      <span style="color:#475569;">&bull;</span>
      <a href="contact.html" style="color:#cbd5e1;text-decoration:none;">Contact Us</a>
      <span style="color:#475569;">&bull;</span>
      <a href="sitemap.html" style="color:#cbd5e1;text-decoration:none;">Sitemap</a>
    </div>

    <p class="foot-base">
      &copy; C2S &mdash; College to Service &bull; &ldquo;Your Selection Our Mission&rdquo; &bull; NH-16, Opposite Sani Mandir, Patrapada, Bhubaneswar, Odisha 751019
    </p>
  </footer>

  <script src="app.js"></script>
</body>
</html>`;

// 1. terms.html
const termsContent = `
  <div class="card legal-content-card" style="padding:40px 36px;background:#fff;border-radius:18px;border:1px solid #e2e8f0;line-height:1.7;color:#334155;">
    <span class="section-tag" style="background:#eff6ff;color:#1d4ed8;font-weight:700;padding:4px 12px;border-radius:999px;font-size:12px;display:inline-block;margin-bottom:8px;">LEGAL FRAMEWORK</span>
    <h1 style="font-size:32px;color:#0f172a;margin:6px 0 10px;">Terms and Conditions</h1>
    <p style="color:#64748b;font-size:14px;margin:0 0 20px;">Last Updated: November 2026 &bull; Official Policy of C2S &mdash; College to Service</p>
    <div style="height:3px;background:linear-gradient(90deg,#1d4ed8,#f97316);width:80px;border-radius:2px;margin-bottom:28px;"></div>

    <p>Welcome to <strong>C2S &mdash; College to Service</strong> (&ldquo;C2S&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). These Terms and Conditions govern your access to and use of our website (<a href="https://c2seri.com" style="color:#2563eb;">c2seri.com</a>), our offline coaching centre, our 24-Hour Premium Study Library, and our online CBT mock test engine situated at NH-16, Opposite Sani Mandir, Patrapada, Bhubaneswar, Odisha 751019.</p>

    <h2 style="color:#0f172a;font-size:20px;margin:28px 0 12px;">1. Acceptance of Terms</h2>
    <p>By browsing our portal, registering for admission, booking library seats, enrolling in classroom programs, or accessing CBT test series, you confirm that you have read, understood, and agreed to be bound by these Terms and Conditions along with our Privacy Policy and Refund Policy.</p>

    <h2 style="color:#0f172a;font-size:20px;margin:28px 0 12px;">2. Nature of Educational Services &amp; No Employment Guarantee</h2>
    <p>C2S provides premium academic coaching, digital study material, locked CBT simulation tests, and high-discipline study library infrastructure for Central and State government competitive examinations (BANK, SSC, Railway, UPSC, Defence, Teaching, OSSC, OSSSC, OPSC, and Odisha Police). <strong>C2S does not guarantee selection, appointment, or employment in any government department.</strong> Final recruitment depends solely on the candidate&rsquo;s individual merit, dedication, and official performance in recruitment commission exams.</p>
    <p>All examination dates, fees, and syllabus outlines displayed on this platform are compiled from public gazette notifications issued by relevant recruitment bodies. C2S does not invent or modify official notification schedules.</p>

    <h2 style="color:#0f172a;font-size:20px;margin:28px 0 12px;">3. 24-Hour Premium Study Library Code of Conduct</h2>
    <p>Our study library at Patrapada is designed as an architectural sanctuary for serious aspirants. All members must adhere to the following rules:</p>
    <ul style="padding-left:24px;margin:8px 0 16px;">
      <li><strong>Strict Silence:</strong> Absolute pin-drop silence must be observed within all reading halls. Phone conversations, group discussions, and disruptive sounds are strictly prohibited.</li>
      <li><strong>Shift Discipline:</strong> Members must utilize desks only during their assigned shifts (Morning, Afternoon, Full Day, or Night). Overstaying beyond your allocated shift is not permitted.</li>
      <li><strong>Non-Transferability:</strong> Library seat allocations and access credentials are strictly personal and non-transferable.</li>
      <li><strong>Cleanliness &amp; Equipment Care:</strong> Members must take care of power sockets, ergonomic furniture, and air-conditioning units. Willful damage will attract full equipment replacement charges.</li>
    </ul>

    <h2 style="color:#0f172a;font-size:20px;margin:28px 0 12px;">4. Online CBT Mock Test Engine &amp; Intellectual Property</h2>
    <p>Our weekly CBT mock tests operate under strict examination simulation conditions, including fullscreen locks and violation counters (3 violations trigger automated test submission). All test questions, question papers, handwritten smart notes, explanations, and website content are the exclusive intellectual property of C2S. Any reproduction, screen capture, public redistribution, or commercial piracy without written authorization will invite civil and criminal copyright proceedings.</p>

    <h2 style="color:#0f172a;font-size:20px;margin:28px 0 12px;">5. Communication Consent (SMS, WhatsApp, RCS &amp; Email)</h2>
    <p>By providing your contact details on any form across this portal, you expressly authorize C2S to contact you via telephone call, SMS, WhatsApp, RCS (Rich Communication Services), and Email for transactional alerts, admission guidance, batch schedules, admit card updates, and important educational announcements.</p>

    <h2 style="color:#0f172a;font-size:20px;margin:28px 0 12px;">6. Governing Law &amp; Jurisdiction</h2>
    <p>These Terms shall be governed and interpreted in accordance with the laws of India. Any legal dispute, claim, or proceeding arising under or in connection with C2S services shall be subject to the exclusive jurisdiction of the competent courts in <strong>Bhubaneswar, Odisha</strong>.</p>
  </div>
`;

// 2. privacy.html
const privacyContent = `
  <div class="card legal-content-card" style="padding:40px 36px;background:#fff;border-radius:18px;border:1px solid #e2e8f0;line-height:1.7;color:#334155;">
    <span class="section-tag" style="background:#eff6ff;color:#1d4ed8;font-weight:700;padding:4px 12px;border-radius:999px;font-size:12px;display:inline-block;margin-bottom:8px;">DATA PROTECTION &amp; PRIVACY</span>
    <h1 style="font-size:32px;color:#0f172a;margin:6px 0 10px;">Privacy Policy</h1>
    <p style="color:#64748b;font-size:14px;margin:0 0 20px;">Compliant with Information Technology Act, 2000 &bull; DPDP Act, 2023 &bull; TRAI DLT Guidelines</p>
    <div style="height:3px;background:linear-gradient(90deg,#1d4ed8,#f97316);width:80px;border-radius:2px;margin-bottom:28px;"></div>

    <p>At <strong>C2S &mdash; College to Service</strong> (&ldquo;C2S&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;), we take your privacy and personal data seriously. This Privacy Policy details how we collect, use, store, and protect your information when you access <a href="https://c2seri.com" style="color:#2563eb;">c2seri.com</a> or visit our offline centre at NH-16 Patrapada, Bhubaneswar.</p>

    <h2 style="color:#0f172a;font-size:20px;margin:28px 0 12px;">1. Information We Collect</h2>
    <ul style="padding-left:24px;margin:8px 0 16px;">
      <li><strong>Contact Details:</strong> Full Name, Email Address, Mobile Number, Residential City/Address.</li>
      <li><strong>Academic Profile:</strong> Target examinations (e.g., OSSC CGL, Bank PO, SSC GD), chosen batch timings, and library shift preferences.</li>
      <li><strong>Test &amp; Performance Data:</strong> CBT mock test attempts, scores, question-level analytics, rank percentiles, and exam violation records.</li>
      <li><strong>Technical Analytics:</strong> Device type, browser user agent, IP address, and page interaction metrics captured anonymously via Google Tag (<code>gtag.js G-HJ59JX1P5N</code>).</li>
    </ul>

    <h2 style="color:#0f172a;font-size:20px;margin:28px 0 12px;">2. How We Use Your Information</h2>
    <ul style="padding-left:24px;margin:8px 0 16px;">
      <li>To process your admission inquiries, classroom enrollments, and library desk reservations.</li>
      <li>To issue secure One-Time Passwords (OTPs) for account access and CBT test validation.</li>
      <li>To generate All-India and Odisha State comparative scorecards and performance rank metrics.</li>
      <li>To transmit official recruitment notifications, exam date releases, syllabus changes, and batch timetable notifications.</li>
    </ul>

    <h2 style="color:#0f172a;font-size:20px;margin:28px 0 12px;">3. Direct Communication Consent (SMS, WhatsApp, RCS &amp; Calls)</h2>
    <p>Under TRAI DLT regulations and the Digital Personal Data Protection Act (DPDP), 2023, by checking the consent box on our contact/registration forms, you provide explicit consent to receive service updates, transactional OTPs, and educational announcements via SMS, WhatsApp, RCS, and automated phone calls from C2S. You may revoke promotional communication consent at any time by emailing us at <a href="mailto:contact@c2seri.com" style="color:#2563eb;">contact@c2seri.com</a>.</p>

    <div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:16px;border-radius:8px;margin:20px 0;">
      <strong style="color:#15803d;display:block;margin-bottom:4px;font-size:16px;">Our Absolute Promise:</strong>
      C2S <strong>never sells, rents, leases, or trades</strong> student contact numbers, emails, or academic records to third-party telemarketers, credit card issuers, or commercial aggregators. Your information stays strictly within C2S.
    </div>

    <h2 style="color:#0f172a;font-size:20px;margin:28px 0 12px;">4. Secure Cloud Data Storage &amp; Payments</h2>
    <p>Student credentials and database records are securely hosted on Supabase South Asia (ap-south-1 Mumbai) cloud infrastructure featuring row-level security and SSL encryption. Online fee payments are processed via PCI-DSS Level 1 compliant payment gateways (Cashfree). C2S does not store or process complete credit card numbers, CVV codes, or net banking passwords.</p>

    <h2 style="color:#0f172a;font-size:20px;margin:28px 0 12px;">5. Grievance Redressal Officer</h2>
    <p>For any queries, privacy concerns, or data deletion requests, contact our Grievance Desk:<br>
    <strong>C2S Privacy &amp; Grievance Cell</strong><br>
    NH-16, Opposite Sani Mandir, Patrapada, Bhubaneswar, Odisha 751019<br>
    Helplines: <strong>9777481909</strong> / <strong>9658177712</strong> &bull; Email: <a href="mailto:privacy@c2seri.com" style="color:#2563eb;">privacy@c2seri.com</a></p>
  </div>
`;

// 3. refund.html
const refundContent = `
  <div class="card legal-content-card" style="padding:40px 36px;background:#fff;border-radius:18px;border:1px solid #e2e8f0;line-height:1.7;color:#334155;">
    <span class="section-tag" style="background:#fef2f2;color:#dc2626;font-weight:700;padding:4px 12px;border-radius:999px;font-size:12px;display:inline-block;margin-bottom:8px;">TRANSPARENT REFUNDS</span>
    <h1 style="font-size:32px;color:#0f172a;margin:6px 0 10px;">Refund &amp; Cancellation Policy</h1>
    <p style="color:#64748b;font-size:14px;margin:0 0 20px;">Clear, fair, and transparent fee policies for Classroom Batches, Library, and Test Series.</p>
    <div style="height:3px;background:linear-gradient(90deg,#dc2626,#f97316);width:80px;border-radius:2px;margin-bottom:28px;"></div>

    <p>At <strong>C2S &mdash; College to Service</strong>, we strive to deliver the highest quality education, smart classroom teaching, and study library facilities. We believe in complete transparency regarding fees, cancellations, and refunds.</p>

    <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:16px;margin:20px 0;">
      <strong style="color:#1d4ed8;font-size:15px;display:block;margin-bottom:4px;">Quick Summary:</strong>
      Classroom batches have a 7-day refund window (less registration/material costs). 24h Study Library registration fee (&dollar;200) is non-refundable; shift fee refunds are pro-rata before shift start. Digital CBT mock test packages and PDF e-books are non-refundable once accessed. Double charges are 100% refunded.
    </div>

    <h2 style="color:#0f172a;font-size:20px;margin:28px 0 12px;">1. Offline Classroom Coaching Batches (Patrapada Centre)</h2>
    <ul style="padding-left:24px;margin:8px 0 16px;">
      <li><strong>Trial / Demo Classes:</strong> Aspirants are encouraged to attend designated demo/trial classes prior to formal fee payment to satisfy themselves with teaching quality and faculty pedagogy.</li>
      <li><strong>Withdrawal Within 7 Days:</strong> If an enrolled student wishes to cancel their admission within <strong>7 calendar days</strong> from the official batch commencement date, tuition fees paid will be refunded after deducting a nominal administrative registration fee (&dollar;500) and the cost of printed books/study kit if already issued.</li>
      <li><strong>After 7 Days:</strong> No refund requests or fee adjustments will be entertained after 7 calendar days from the batch start date, or once a student has attended more than 4 sessions.</li>
    </ul>

    <h2 style="color:#0f172a;font-size:20px;margin:28px 0 12px;">2. 24-Hour Premium Study Library Memberships</h2>
    <ul style="padding-left:24px;margin:8px 0 16px;">
      <li><strong>One-Time Registration Fee:</strong> The initial registration fee of <strong>&dollar;200</strong> is non-refundable and non-transferable under all circumstances, as it covers biometric profile generation and seat administrative setup.</li>
      <li><strong>Shift Membership Cancellation:</strong> If a student cancels their shift reservation before the shift start date or within the first 3 days due to verifiable medical/relocation emergency, a pro-rata refund for the unutilized period will be granted. No refund is applicable after 3 days of seat utilization.</li>
    </ul>

    <h2 style="color:#0f172a;font-size:20px;margin:28px 0 12px;">3. Online CBT Mock Tests, Test Passes &amp; Digital Study Notes</h2>
    <ul style="padding-left:24px;margin:8px 0 16px;">
      <li>Because digital products (CBT mock test engine access, detailed solutions, and downloadable PDF current affairs handbooks) are delivered immediately upon account activation, fees paid for online test series and e-books are <strong>strictly non-refundable</strong>.</li>
      <li>In the event of an inadvertent technical failure where a mock test cannot be initiated due to system errors, our technical team will reset your attempt or extend subscription validity at no charge.</li>
    </ul>

    <h2 style="color:#0f172a;font-size:20px;margin:28px 0 12px;">4. Accidental Duplicate Transactions</h2>
    <p>If an applicant is debited twice for the same transaction due to a payment gateway timeout or internet connectivity glitch, <strong>100% of the duplicate amount will be refunded</strong> to the original payment source immediately upon verification.</p>

    <h2 style="color:#0f172a;font-size:20px;margin:28px 0 12px;">5. Refund Mode &amp; Processing Timelines</h2>
    <p>All approved refunds are credited back to the original source instrument (Bank Account, UPI ID, or Credit/Debit Card) via our authorized payment gateway partner (Cashfree) within <strong>5 to 7 business working days</strong> from the date of refund approval.</p>

    <h2 style="color:#0f172a;font-size:20px;margin:28px 0 12px;">6. How to Apply for a Refund</h2>
    <p>To request a refund, submit a formal request with your Admission Receipt / Transaction ID, mobile number, and reason for withdrawal to:</p>
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:18px;margin:16px 0;">
      <strong>C2S Accounts &amp; Refunds Cell</strong><br>
      NH-16, Opposite Sani Mandir, Patrapada, Bhubaneswar, Odisha 751019<br>
      Email: <a href="mailto:refunds@c2seri.com" style="color:#2563eb;font-weight:700;">refunds@c2seri.com</a> or <a href="mailto:contact@c2seri.com" style="color:#2563eb;">contact@c2seri.com</a><br>
      Front Desk Helplines: <strong>9777481909</strong> / <strong>9658177712</strong>
    </div>
  </div>
`;

// 4. contact.html
const contactContent = `
  <div class="card" style="padding:36px 32px;background:#fff;border-radius:18px;border:1px solid #e2e8f0;">
    <span class="section-tag" style="background:#eff6ff;color:#1d4ed8;font-weight:700;padding:4px 12px;border-radius:999px;font-size:12px;display:inline-block;margin-bottom:8px;">OFFICIAL DESK &bull; PATRAPADA CENTRE</span>
    <h1 style="font-size:32px;color:#0f172a;margin:6px 0 10px;">Contact C2S &bull; Admission &amp; Academic Helpdesk</h1>
    <p style="color:#475569;font-size:15px;max-width:760px;margin:0 0 16px;">
      Get in touch with our senior academic counsellors for Classroom Batches, 24-Hour Study Library seats, and CBT Test Series at our NH-16 Patrapada centre.
    </p>
    <div style="height:3px;background:linear-gradient(90deg,#f97316,#1d4ed8);width:80px;border-radius:2px;margin-bottom:28px;"></div>

    <div class="grid2" style="display:grid;grid-template-columns:1fr 1.25fr;gap:32px;align-items:start;">
      <!-- Left: Centre Details & Direct Channels -->
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:24px;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:18px;">
          <div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#0f2a5c,#1d4ed8);color:#fff;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">
            &#127979;
          </div>
          <div>
            <h2 style="margin:0;font-size:18px;color:#0f172a;">C2S &mdash; College to Service</h2>
            <span style="font-size:12px;color:#f97316;font-weight:700;">&ldquo;Your Selection Our Mission&rdquo;</span>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:16px;font-size:14px;color:#334155;line-height:1.6;">
          <div style="display:flex;gap:12px;">
            <span style="font-size:18px;line-height:1;">&#128205;</span>
            <div>
              <strong style="color:#0f172a;display:block;margin-bottom:2px;">Offline Centre &amp; Library Address:</strong>
              NH-16, Opposite Sani Mandir, Patrapada,<br>
              Bhubaneswar, Odisha &mdash; 751019
              <div style="margin-top:6px;">
                <a href="https://maps.google.com/?q=NH-16+opposite+Sani+Mandir+Patrapada+Bhubaneswar+Odisha+751019" target="_blank" rel="noopener noreferrer" style="color:#2563eb;font-weight:700;text-decoration:none;font-size:13px;display:inline-flex;align-items:center;gap:4px;">
                  Open in Google Maps &rarr;
                </a>
              </div>
            </div>
          </div>

          <div style="display:flex;gap:12px;">
            <span style="font-size:18px;line-height:1;">&#128222;</span>
            <div>
              <strong style="color:#0f172a;display:block;margin-bottom:2px;">Official Helplines:</strong>
              <a href="tel:9777481909" style="color:#0f172a;font-weight:700;text-decoration:none;">9777481909</a> / 
              <a href="tel:9658177712" style="color:#0f172a;font-weight:700;text-decoration:none;">9658177712</a>
              <small style="display:block;color:#64748b;font-size:12px;">Available Mon &ndash; Sun (8:00 AM &ndash; 9:00 PM)</small>
            </div>
          </div>

          <div style="display:flex;gap:12px;">
            <span style="font-size:18px;line-height:1;">&#9993;</span>
            <div>
              <strong style="color:#0f172a;display:block;margin-bottom:2px;">Official Email:</strong>
              <a href="mailto:contact@c2seri.com" style="color:#2563eb;text-decoration:none;font-weight:600;">contact@c2seri.com</a>
            </div>
          </div>

          <div style="display:flex;gap:12px;">
            <span style="font-size:18px;line-height:1;">&#9200;</span>
            <div>
              <strong style="color:#0f172a;display:block;margin-bottom:2px;">Operational Hours:</strong>
              <span>&bull; Smart Classroom Batches: 7:00 AM &ndash; 8:30 PM</span><br>
              <span>&bull; Premium Air-Conditioned Library: <strong>Open 24 Hours (4 Shifts)</strong></span>
            </div>
          </div>
        </div>

        <div style="margin-top:20px;padding:14px;background:#fff;border:1px solid #e2e8f0;border-radius:12px;">
          <span style="font-size:11.5px;font-weight:700;text-transform:uppercase;color:#64748b;letter-spacing:0.5px;display:block;margin-bottom:8px;">Campus Facilities</span>
          <div style="display:flex;flex-wrap:wrap;gap:6px;">
            <span style="background:#eff6ff;color:#1e40af;font-size:11.5px;font-weight:600;padding:3px 8px;border-radius:6px;">Smart 4K Flat Panels</span>
            <span style="background:#ecfdf5;color:#065f46;font-size:11.5px;font-weight:600;padding:3px 8px;border-radius:6px;">10+ Yrs Teachers</span>
            <span style="background:#fef3c7;color:#92400e;font-size:11.5px;font-weight:600;padding:3px 8px;border-radius:6px;">Locked CBT Lab</span>
            <span style="background:#faf5ff;color:#6b21a8;font-size:11.5px;font-weight:600;padding:3px 8px;border-radius:6px;">High-Speed Wi-Fi</span>
          </div>
        </div>
      </div>

      <!-- Right: Interactive Contact Form -->
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:26px;box-shadow:0 4px 18px rgba(15,23,42,0.04);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <h2 style="margin:0;font-size:19px;color:#0f172a;">Send Enquiry / Request Callback</h2>
          <span style="font-size:11.5px;background:#f0fdf4;color:#166534;border:1px solid #bbf7d0;padding:3px 8px;border-radius:999px;font-weight:700;">Fast Response</span>
        </div>
        
        <form id="c2sContactForm" onsubmit="handleContactSubmit(event)" style="display:flex;flex-direction:column;gap:12px;">
          <div>
            <label for="contactName" style="font-size:13px;font-weight:700;color:#334155;display:block;margin-bottom:4px;">Full Name *</label>
            <input id="contactName" type="text" placeholder="e.g. Priyaranjan Mohanty" required style="margin:0;padding:11px 13px;font-size:14px;border:1.5px solid #cbd5e1;border-radius:8px;width:100%;">
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label for="contactMobile" style="font-size:13px;font-weight:700;color:#334155;display:block;margin-bottom:4px;">Mobile Number *</label>
              <input id="contactMobile" type="tel" pattern="[0-9]{10}" placeholder="10-digit number" required style="margin:0;padding:11px 13px;font-size:14px;border:1.5px solid #cbd5e1;border-radius:8px;width:100%;">
            </div>
            <div>
              <label for="contactEmail" style="font-size:13px;font-weight:700;color:#334155;display:block;margin-bottom:4px;">Email Address *</label>
              <input id="contactEmail" type="email" placeholder="name@example.com" required style="margin:0;padding:11px 13px;font-size:14px;border:1.5px solid #cbd5e1;border-radius:8px;width:100%;">
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label for="contactCity" style="font-size:13px;font-weight:700;color:#334155;display:block;margin-bottom:4px;">City / Address *</label>
              <input id="contactCity" type="text" placeholder="e.g. Patrapada, Bhubaneswar" required style="margin:0;padding:11px 13px;font-size:14px;border:1.5px solid #cbd5e1;border-radius:8px;width:100%;">
            </div>
            <div>
              <label for="contactGoal" style="font-size:13px;font-weight:700;color:#334155;display:block;margin-bottom:4px;">Interested In *</label>
              <select id="contactGoal" required style="margin:0;padding:11px 13px;font-size:14px;border:1.5px solid #cbd5e1;border-radius:8px;width:100%;background:#fff;">
                <option value="Classroom Batches">Classroom Foundation Batch (Patrapada)</option>
                <option value="24h Study Library">24-Hour Premium Study Library</option>
                <option value="CBT Mock Test Series">CBT Mock Test Engine Pass</option>
                <option value="OSSC / OSSSC Prep">OSSC / OSSSC Combined Prep</option>
                <option value="Odisha Police SI">Odisha Police SI &amp; Constable</option>
                <option value="Banking & SSC">Banking (SBI/IBPS) &amp; SSC CGL</option>
                <option value="General Counselling">General Career Counselling</option>
              </select>
            </div>
          </div>

          <div>
            <label for="contactMessage" style="font-size:13px;font-weight:700;color:#334155;display:block;margin-bottom:4px;">Your Message / Query *</label>
            <textarea id="contactMessage" rows="3" placeholder="Tell us about your target examination, timing preference or any questions you have..." required style="margin:0;padding:11px 13px;font-size:14px;border:1.5px solid #cbd5e1;border-radius:8px;width:100%;resize:vertical;"></textarea>
          </div>

          <!-- Mandatory Consent Checkbox for SMS / WhatsApp / RCS Updates -->
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;margin:2px 0 6px;">
            <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;font-size:12.5px;color:#334155;line-height:1.5;font-weight:500;">
              <input type="checkbox" id="contactConsent" checked required style="margin-top:2px;width:16px;height:16px;cursor:pointer;accent-color:#1d4ed8;flex-shrink:0;">
              <span>
                I agree to receive transactional and promotional updates, exam notifications, admission alerts, SMS, WhatsApp, and RCS messages from <strong>C2S &mdash; College to Service</strong> at the mobile number provided above.
              </span>
            </label>
          </div>

          <button type="submit" id="contactSubmitBtn" class="btn" style="background:linear-gradient(135deg,#f97316,#ea580c);color:#fff;font-weight:700;padding:12px 20px;border-radius:8px;border:none;cursor:pointer;font-size:15px;box-shadow:0 4px 14px rgba(249,115,22,0.3);transition:all 0.15s ease;">
            Submit Enquiry &rarr;
          </button>

          <div id="contactFeedback" style="display:none;margin-top:12px;"></div>
        </form>
      </div>
    </div>
  </div>
`;

function createPage(filename, title, description, content) {
  const fullHtml = headerHtml
    .replace('{{TITLE}}', title)
    .replace('{{DESCRIPTION}}', description)
    .replace('{{CONTENT}}', content);
  
  fs.writeFileSync(path.join(rootDir, filename), fullHtml, 'utf8');
  console.log(`✓ Created standalone page: ${filename}`);
}

createPage('terms.html', 'Terms & Conditions', 'Official Terms and Conditions for C2S College to Service, Bhubaneswar. Coaching, 24h Study Library, and CBT Mock Tests.', termsContent);
createPage('privacy.html', 'Privacy Policy', 'Official Privacy Policy of C2S College to Service, Patrapada, Bhubaneswar. Data privacy, DPDP Act 2023 compliance, and communication consent.', privacyContent);
createPage('refund.html', 'Refund & Cancellation Policy', 'Transparent Refund and Cancellation Policy for C2S College to Service classroom coaching batches, 24-hour study library, and CBT test series.', refundContent);
createPage('contact.html', 'Contact Us & Admission Desk', 'Contact C2S College to Service Patrapada Bhubaneswar. Helpline phone numbers, address, email, and online enquiry callback form.', contactContent);

console.log('✓ All 4 standalone policy and contact pages created successfully!');

