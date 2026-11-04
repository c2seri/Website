const fs = require('fs');

function replaceInFile(file, replaces) {
  let content = fs.readFileSync(file, 'utf8');
  let count = 0;
  for (const [from, to] of replaces) {
    if (content.includes(from)) {
      content = content.replaceAll(from, to);
      count++;
    } else {
      console.log(`[WARN] Not found in ${file}:`, from.substring(0, 40));
    }
  }
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file} (${count} replacements)`);
}

// 1. index.html
replaceInFile('index.html', [
  [
    '<strong>C2S &mdash; College to Service</strong>₹ we strive',
    '<strong>C2S &mdash; College to Service</strong>, we strive'
  ],
  [
    '<strong>Classroom Foundation Batches</strong>₹ <strong>24h Study Library Seats</strong>₹ or <strong>CBT Mock Test Passes</strong> at Patrapada centre&bull;',
    '<strong>Classroom Foundation Batches</strong>, <strong>24h Study Library Seats</strong>, or <strong>CBT Mock Test Passes</strong> at Patrapada centre.'
  ]
]);

// 2. library/index.html
replaceInFile('library/index.html', [
  [
    '<a href="/" class="btn ghost" style="padding:7px 14px;font-size:13px;text-decoration:none;border-color:#cbd5e1;">Coaching Portal ↗</a>',
    '<a href="../" class="btn ghost" style="padding:7px 14px;font-size:13px;text-decoration:none;border-color:#cbd5e1;">Coaching Portal ↗</a>'
  ],
  [
    '<a href="/" class="c2s-back-to-coaching-btn"',
    '<a href="../" class="c2s-back-to-coaching-btn"'
  ],
  [
    '<strong>Classroom Foundation Batches</strong>₹ <strong>24h Study Library Seats</strong>₹ or <strong>CBT Mock Test Passes</strong> at Patrapada centre&bull;',
    '<strong>Classroom Foundation Batches</strong>, <strong>24h Study Library Seats</strong>, or <strong>CBT Mock Test Passes</strong> at Patrapada centre.'
  ]
]);

// 3. library/admission.html
replaceInFile('library/admission.html', [
  [
    '<a href="/" class="btn ghost" style="color:#fff;border-color:rgba(255, 255, 255, 0.3);text-decoration:none;">← Library Home</a>',
    '<a href="index.html" class="btn ghost" style="color:#fff;border-color:rgba(255, 255, 255, 0.3);text-decoration:none;">← Library Home</a>'
  ],
  [
    '<strong style="color:var(--c2s-orange-600);">Registration Fee: ₹200 (Non-refundable)</strong>₹ separate from monthly shift payment.',
    '<strong style="color:var(--c2s-orange-600);">Registration Fee: ₹200 (Non-refundable)</strong>, separate from monthly shift payment.'
  ],
  [
    '<strong>Classroom Foundation Batches</strong>₹ <strong>24h Study Library Seats</strong>₹ or <strong>CBT Mock Test Passes</strong> at Patrapada centre&bull;',
    '<strong>Classroom Foundation Batches</strong>, <strong>24h Study Library Seats</strong>, or <strong>CBT Mock Test Passes</strong> at Patrapada centre.'
  ]
]);

// 4. library/dashboard.html
replaceInFile('library/dashboard.html', [
  [
    '<a href="/" class="btn ghost" style="color:#cbd5e1;text-decoration:none;">← Library Home</a>',
    '<a href="index.html" class="btn ghost" style="color:#cbd5e1;text-decoration:none;">← Library Home</a>'
  ]
]);

// 5. library/facilities.html
replaceInFile('library/facilities.html', [
  [
    '<a href="/" style="display:flex;align-items:center;gap:12px;text-decoration:none;">',
    '<a href="index.html" style="display:flex;align-items:center;gap:12px;text-decoration:none;">'
  ],
  [
    '<a href="/" class="btn ghost" style="text-decoration:none;">← Library Overview</a>',
    '<a href="index.html" class="btn ghost" style="text-decoration:none;">← Library Overview</a>'
  ],
  [
    '<strong>Classroom Foundation Batches</strong>₹ <strong>24h Study Library Seats</strong>₹ or <strong>CBT Mock Test Passes</strong> at Patrapada centre&bull;',
    '<strong>Classroom Foundation Batches</strong>, <strong>24h Study Library Seats</strong>, or <strong>CBT Mock Test Passes</strong> at Patrapada centre.'
  ]
]);

// 6. library/shifts.html
replaceInFile('library/shifts.html', [
  [
    '<a href="/" style="display:flex;align-items:center;gap:12px;text-decoration:none;">',
    '<a href="index.html" style="display:flex;align-items:center;gap:12px;text-decoration:none;">'
  ],
  [
    '<a href="/" class="btn ghost" style="text-decoration:none;">← Library Overview</a>',
    '<a href="index.html" class="btn ghost" style="text-decoration:none;">← Library Overview</a>'
  ],
  [
    'Registration Fee: <strong style="color:#0a192f;">₹200 (One-time, non-refundable)</strong>₹ kept separate from monthly payment. Zero unconfirmed fees.',
    'Registration Fee: <strong style="color:#0a192f;">₹200 (One-time, non-refundable)</strong>, kept separate from monthly payment. Zero unconfirmed fees.'
  ],
  [
    '<strong>Classroom Foundation Batches</strong>₹ <strong>24h Study Library Seats</strong>₹ or <strong>CBT Mock Test Passes</strong> at Patrapada centre&bull;',
    '<strong>Classroom Foundation Batches</strong>, <strong>24h Study Library Seats</strong>, or <strong>CBT Mock Test Passes</strong> at Patrapada centre.'
  ]
]);
