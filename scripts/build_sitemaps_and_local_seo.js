const fs = require('fs');

// =============================================================================
// 1. UPDATE index.html (Main Website): Local SEO, Schema, Geo Tags, Footer Link
// =============================================================================
let indexHtml = fs.readFileSync('index.html', 'utf8');

// Fix any corrupted characters in title and meta
indexHtml = indexHtml.replace(/C2S \?" College to Service/g, 'C2S - College to Service');
indexHtml = indexHtml.replace(/C2S \?\? College to Service/g, 'C2S - College to Service');

// Add Geo Meta Tags & Enhanced Local SEO Schema to head
const localSeoHead = `  <!-- Comprehensive Local SEO & Geo-Targeting for Bhubaneswar, Odisha -->
  <meta name="geo.region" content="IN-OR">
  <meta name="geo.placename" content="Bhubaneswar, Patrapada, Odisha">
  <meta name="geo.position" content="20.2458;85.7686">
  <meta name="ICBM" content="20.2458, 85.7686">
  <meta name="keywords" content="C2S, College to Service, govt exam coaching Bhubaneswar, OSSC CGL coaching, Odisha Police SI coaching, Banking PO coaching Bhubaneswar, SSC CGL Patrapada, 24 hour study library Bhubaneswar, study library Patrapada, reading room near AIIMS Bhubaneswar, best coaching centre in Bhubaneswar">
  <meta property="og:locale" content="en_IN">
  <meta property="og:site_name" content="C2S - College to Service">
  <link rel="canonical" href="https://c2seri.com/">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": "https://c2seri.com/#organization",
    "name": "C2S - College to Service",
    "alternateName": "C2S Premier Govt Exam Coaching & 24h Study Library",
    "slogan": "Your Selection Our Mission",
    "url": "https://c2seri.com/",
    "logo": "https://c2seri.com/logo.jpg",
    "image": "https://c2seri.com/logo.jpg",
    "telephone": ["+91-9777481909", "+91-9658177712"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "NH-16, Opposite Sani Mandir, Patrapada",
      "addressLocality": "Bhubaneswar",
      "addressRegion": "Odisha",
      "postalCode": "751019",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 20.2458,
      "longitude": 85.7686
    },
    "hasMap": "https://www.google.com/maps/search/?api=1&query=Patrapada+Opposite+Sani+Mandir+Bhubaneswar+Odisha+751019",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "areaServed": ["Bhubaneswar", "Patrapada", "Khandagiri", "Cuttack", "Khordha", "Odisha", "India"]
  }
  </script>`;

// Replace existing JSON-LD or insert after <meta property="og:type" content="website">
const ogTypeStr = '<meta property="og:type" content="website">';
if (indexHtml.includes(ogTypeStr) && !indexHtml.includes('<!-- Comprehensive Local SEO & Geo-Targeting')) {
  indexHtml = indexHtml.replace(ogTypeStr, ogTypeStr + '\n' + localSeoHead);
  console.log('Added Local SEO and Geo-targeting to index.html <head>');
}

// Update Footer Quick Links to include sitemap.html and sitemap.xml
const oldFooterQuickLinks = `<div class="footer-links">
          <a href="#" onclick="show('tests');return false;">Weekly Test Series</a>
          <a href="library.html">24-Hour Premium Library</a>
          <a href="#" onclick="show('batches');return false;">Batches &amp; Smart Classes</a>
          <a href="#" onclick="show('notices');return false;">Official Notices</a>
          <a href="#" onclick="show('blog');return false;">Student Blog</a>
          <a href="#" onclick="show('help');return false;">Help &amp; Contact</a>
          <a href="#" onclick="show('login');return false;">Main Student Login</a>
        </div>`;

const newFooterQuickLinks = `<div class="footer-links">
          <a href="#" onclick="show('tests');return false;">Weekly CBT Test Series</a>
          <a href="library/index.html">24-Hour Premium Study Library</a>
          <a href="#" onclick="show('courses');return false;">Classroom Batches (Vidyapeeth)</a>
          <a href="#" onclick="show('books');return false;">Official Books &amp; Study Store</a>
          <a href="#" onclick="show('current-affairs');return false;">Weekly Current Affairs PDF</a>
          <a href="sitemap.html">Complete Platform Sitemap</a>
          <a href="sitemap.xml" target="_blank">XML Sitemap (Google SEO)</a>
          <a href="#" onclick="show('help');return false;">Help &amp; Patrapada Centre Location</a>
        </div>`;

if (indexHtml.includes(oldFooterQuickLinks)) {
  indexHtml = indexHtml.replace(oldFooterQuickLinks, newFooterQuickLinks);
  console.log('Updated footer quick links in index.html with sitemap links');
}

fs.writeFileSync('index.html', indexHtml, 'utf8');

// =============================================================================
// 2. UPDATE library/index.html: Local SEO, Geo Tags, and Local Seat/Route Finder
// =============================================================================
let libHtml = fs.readFileSync('library/index.html', 'utf8');

const libLocalSeoHead = `  <!-- Local SEO & Geo Meta Tags for Library (Patrapada, Bhubaneswar) -->
  <meta name="geo.region" content="IN-OR">
  <meta name="geo.placename" content="Bhubaneswar, Patrapada, Odisha">
  <meta name="geo.position" content="20.2458;85.7686">
  <meta name="ICBM" content="20.2458, 85.7686">
  <meta name="keywords" content="library near me, study library in Bhubaneswar, 24 hour library Patrapada, reading room near AIIMS Bhubaneswar, peaceful study space Khandagiri, AC study library Bhubaneswar, self study hall Bhubaneswar, C2S library, best library in Bhubaneswar for UPSC, OPSC library Bhubaneswar">
  <meta property="og:locale" content="en_IN">
  <link rel="canonical" href="https://c2seri.com/library/">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": ["Library", "EducationalOrganization", "LocalBusiness"],
    "@id": "https://c2seri.com/library/#localbusiness",
    "name": "C2S 24-Hour Premium Study Library",
    "alternateName": ["C2S Study Library Patrapada", "College to Service Library Bhubaneswar", "C2S Reading Hall"],
    "description": "Premier 24-Hour Air-Conditioned Study Sanctuary in Patrapada, Bhubaneswar. Equipped with ergonomic cubicles, personal power sockets, high-speed optical fiber Wi-Fi, RO hot & cold water, dining/discussion hall, and CCTV security.",
    "url": "https://c2seri.com/library/",
    "telephone": ["+91-9777481909", "+91-9658177712"],
    "email": "contact@c2seri.com",
    "priceRange": "₹800 - ₹2000",
    "image": "https://c2seri.com/logo.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "NH-16, Opposite Sani Mandir, Patrapada",
      "addressLocality": "Bhubaneswar",
      "addressRegion": "Odisha",
      "postalCode": "751019",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 20.2458,
      "longitude": 85.7686
    },
    "hasMap": "https://www.google.com/maps/search/?api=1&query=Patrapada+Opposite+Sani+Mandir+Bhubaneswar+Odisha+751019",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Fully Air-Conditioned Reading Hall", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Dual High-Speed Optical Fiber WiFi", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Personal Power Sockets at every Desk", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Ergonomic High-Back Cushioned Chairs", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "RO Purified Hot and Cold Drinking Water", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Separate Lunch and Discussion Lounge", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "24x7 CCTV & Biometric Security Access", "value": true }
    ]
  }
  </script>`;

if (!libHtml.includes('<!-- Local SEO & Geo Meta Tags for Library')) {
  libHtml = libHtml.replace('</head>', libLocalSeoHead + '\n</head>');
  console.log('Added Local SEO and Geo tags to library/index.html <head>');
}

// Add the Interactive Local Search & Distance Engine widget to library/index.html
const localSearchWidgetHtml = `
    <!-- SECTION: Local Study Centre & Distance Finder Engine (Bhubaneswar & Patrapada) -->
    <section id="localFinderSection" style="margin-top:48px;background:#ffffff;border:1.5px solid #cbd5e1;border-radius:18px;padding:32px;box-shadow:0 8px 24px rgba(15,23,42,0.04);">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px;margin-bottom:20px;">
        <div>
          <span style="display:inline-block;background:#eff6ff;color:#1d4ed8;font-size:11.5px;font-weight:800;padding:3px 10px;border-radius:999px;border:1px solid #bfdbfe;margin-bottom:8px;letter-spacing:0.04em;">
            LOCAL STUDY CENTRE FINDER &bull; BHUBANESWAR
          </span>
          <h2 style="font-size:26px;font-weight:900;color:#0a192f;margin:0 0 6px;letter-spacing:-0.02em;">
            Find C2S Library Distance From Your Locality
          </h2>
          <p style="font-size:14px;color:#475569;margin:0;max-width:720px;line-height:1.5;">
            Select or search your area in Bhubaneswar to see exact travel distance, fastest commute route via NH-16, and real-time available study desks.
          </p>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <a href="https://www.google.com/maps/search/?api=1&query=Patrapada+Opposite+Sani+Mandir+Bhubaneswar+Odisha+751019" target="_blank" class="btn orange" style="padding:9px 18px;font-size:13px;font-weight:800;text-decoration:none;">
            🗺️ Open Google Maps GPS &rarr;
          </a>
        </div>
      </div>

      <!-- Quick Locality Pills -->
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px;">
        <button type="button" class="btn ghost" style="padding:6px 14px;font-size:12.5px;font-weight:750;" onclick="selectLocalArea('patrapada')">📍 Patrapada (0.2 km)</button>
        <button type="button" class="btn ghost" style="padding:6px 14px;font-size:12.5px;font-weight:750;" onclick="selectLocalArea('aiims')">📍 AIIMS Campus (1.5 km)</button>
        <button type="button" class="btn ghost" style="padding:6px 14px;font-size:12.5px;font-weight:750;" onclick="selectLocalArea('khandagiri')">📍 Khandagiri (2.8 km)</button>
        <button type="button" class="btn ghost" style="padding:6px 14px;font-size:12.5px;font-weight:750;" onclick="selectLocalArea('dumduma')">📍 Dumduma / Jagamara (3.2 km)</button>
        <button type="button" class="btn ghost" style="padding:6px 14px;font-size:12.5px;font-weight:750;" onclick="selectLocalArea('iter')">📍 ITER / SOA (4.0 km)</button>
        <button type="button" class="btn ghost" style="padding:6px 14px;font-size:12.5px;font-weight:750;" onclick="selectLocalArea('baramunda')">📍 Baramunda ISBT (4.5 km)</button>
        <button type="button" class="btn ghost" style="padding:6px 14px;font-size:12.5px;font-weight:750;" onclick="selectLocalArea('nayapalli')">📍 Nayapalli / CRPF (7.2 km)</button>
      </div>

      <!-- Live Result Card -->
      <div id="localResultCard" style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:14px;padding:22px;display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:20px;">
        <!-- Left: Distance & Route -->
        <div>
          <div style="font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:4px;">COMMUTE ESTIMATE FROM PATRAPADA</div>
          <div id="localDistanceDisplay" style="font-size:24px;font-weight:900;color:#047857;margin-bottom:6px;">0.2 km &bull; 2 Mins Walking</div>
          <p id="localRouteDisplay" style="font-size:13px;color:#334155;line-height:1.5;margin:0 0 12px;">
            Located right on NH-16 highway service road, directly opposite Sani Mandir, Patrapada (751019). Walking distance from Patrapada square.
          </p>
          <div style="font-size:12px;color:#0f172a;font-weight:700;">
            🚗 Parking: <strong>Free Dedicated 2-Wheeler &amp; 4-Wheeler Parking on Premise</strong>
          </div>
        </div>

        <!-- Middle: Live Desk Vacancy -->
        <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:16px;">
          <div style="font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:8px;">LIVE SEAT STATUS TODAY</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-size:13px;">
            <span>Zone A (Executive Cubicles):</span>
            <span style="font-weight:800;color:#047857;background:#ecfdf5;padding:2px 8px;border-radius:4px;">7 Vacant</span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-size:13px;">
            <span>Zone B (Digital Power Desks):</span>
            <span style="font-weight:800;color:#047857;background:#ecfdf5;padding:2px 8px;border-radius:4px;">5 Vacant</span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;">
            <span>Zone C (Silent Pods):</span>
            <span style="font-weight:800;color:#047857;background:#ecfdf5;padding:2px 8px;border-radius:4px;">8 Vacant</span>
          </div>
        </div>

        <!-- Right: Action & Contact -->
        <div style="display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:4px;">AFTERNOON SPECIAL SHIFT</div>
            <div style="font-size:20px;font-weight:900;color:#0a192f;margin-bottom:4px;">₹800 / Month</div>
            <div style="font-size:12px;color:#047857;font-weight:750;margin-bottom:12px;">12:00 PM to 06:00 PM &bull; Full A/C &amp; Wi-Fi Included</div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <a href="admission.html" class="btn orange" style="padding:8px 14px;font-size:12.5px;font-weight:800;text-decoration:none;flex:1;text-align:center;">
              🎟️ Reserve Seat
            </a>
            <a href="tel:9777481909" class="btn ghost" style="padding:8px 14px;font-size:12.5px;font-weight:750;text-decoration:none;flex:1;text-align:center;">
              📞 Call Reception
            </a>
          </div>
        </div>
      </div>
    </section>
`;

if (!libHtml.includes('id="localFinderSection"')) {
  // Insert before the footer in library/index.html
  const footerMarker = '<footer style="background:#0a192f;';
  if (libHtml.includes(footerMarker)) {
    libHtml = libHtml.replace(footerMarker, localSearchWidgetHtml + '\n' + footerMarker);
    console.log('Added Local Study Centre Finder widget to library/index.html');
  }
}

// Update library footer to include sitemap.html and sitemap.xml
const libFooterSitemapLink = `<p style="margin:8px 0 0;font-size:12px;">
        <a href="../sitemap.html" style="color:#fdba74;text-decoration:none;font-weight:700;">Platform Sitemap</a>
        <span style="color:#475569;margin:0 8px;">&bull;</span>
        <a href="../sitemap.xml" target="_blank" style="color:#94a3b8;text-decoration:none;">XML Sitemap (SEO)</a>
        <span style="color:#475569;margin:0 8px;">&bull;</span>
        <a href="shifts.html" style="color:#94a3b8;text-decoration:none;">Shifts &amp; Pricing</a>
        <span style="color:#475569;margin:0 8px;">&bull;</span>
        <a href="facilities.html" style="color:#94a3b8;text-decoration:none;">Facilities</a>
      </p>`;

if (!libHtml.includes('Platform Sitemap')) {
  libHtml = libHtml.replace('Your Selection Our Mission • Helplines: 9777481909 / 9658177712</p>', 'Your Selection Our Mission • Helplines: 9777481909 / 9658177712</p>\n' + libFooterSitemapLink);
  console.log('Added sitemap links to library footer');
}

fs.writeFileSync('library/index.html', libHtml, 'utf8');

// =============================================================================
// 3. ADD selectLocalArea script to library.js
// =============================================================================
let libJs = fs.readFileSync('library.js', 'utf8');

const localFinderJs = `
// ==========================================================================
// LOCAL STUDY CENTRE & DISTANCE FINDER LOGIC (BHUBANESWAR LOCAL PACK)
// ==========================================================================
window.selectLocalArea = function(areaKey) {
  const data = {
    patrapada: {
      dist: '0.2 km • 2 Mins Walking',
      route: 'Located right on NH-16 highway service road, directly opposite Sani Mandir, Patrapada (751019). Walking distance from Patrapada square.'
    },
    aiims: {
      dist: '1.5 km • 4 Mins Ride / 15 Mins Walk',
      route: 'Head straight along Sijuha road towards NH-16 junction. Turn right onto NH-16 service road. C2S Library is right opposite Sani Mandir.'
    },
    khandagiri: {
      dist: '2.8 km • 6 Mins Direct Ride',
      route: 'Drive south on NH-16 towards Patrapada. Cross Jagamara flyover. C2S is on your right opposite Sani Mandir on the service lane.'
    },
    dumduma: {
      dist: '3.2 km • 7 Mins Ride',
      route: 'Take Dumduma Phase 1 / Jagamara main road to NH-16. Join the NH-16 service road heading south to Patrapada opposite Sani Mandir.'
    },
    iter: {
      dist: '4.0 km • 8 Mins Ride',
      route: 'From ITER campus, proceed via Jagamara road to NH-16 highway. 8-minute direct drive to C2S Patrapada centre.'
    },
    baramunda: {
      dist: '4.5 km • 9 Mins Ride',
      route: 'Direct straight drive down NH-16 from Baramunda Bus Terminal (ISBT) towards Khordha. C2S is 4.5 km down opposite Sani Mandir.'
    },
    nayapalli: {
      dist: '7.2 km • 14 Mins Direct Highway Commute',
      route: 'Take the fast NH-16 expressway from Nayapalli / CRPF square towards Patrapada. Smooth, signal-free 14-minute ride.'
    }
  };

  const item = data[areaKey] || data.patrapada;
  const distEl = document.getElementById('localDistanceDisplay');
  const routeEl = document.getElementById('localRouteDisplay');
  if (distEl) distEl.textContent = item.dist;
  if (routeEl) routeEl.textContent = item.route;
};
`;

if (!libJs.includes('selectLocalArea')) {
  libJs += '\n' + localFinderJs;
  fs.writeFileSync('library.js', libJs, 'utf8');
  console.log('Added selectLocalArea to library.js');
}

console.log('All Sitemap and Local Search Engine updates completed successfully!');

