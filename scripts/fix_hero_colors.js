const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

// Replace the old dark text colors on .hero-headline, .hero-subtitle, .hero-search-bar, .quick-tag-chip, .btn-hero-secondary, .hero-helpline-link
const oldHeroStylesRegex = /\/\* Headline \*\/[\s\S]*?\.hero-helpline-link:hover\s*\{\s*color:\s*#ffffff;\s*\}/;

const newHeroStyles = `/* Headline */
.hero-headline {
  font-size: 42px;
  font-weight: 950;
  line-height: 1.2;
  margin: 0;
  color: #0f172a !important; /* HIGH CONTRAST DEEP NAVY */
  letter-spacing: -0.03em;
}

@media (max-width: 768px) {
  .hero-headline {
    font-size: 30px;
  }
}

.hero-headline .highlight-orange {
  color: #ea580c !important; /* C2S BRAND ORANGE */
}

.hero-subtitle {
  font-size: 15.5px;
  line-height: 1.6;
  color: #475569 !important; /* READABLE CORPORATE SLATE */
  margin: 0;
  max-width: 580px;
}

.hero-subtitle strong {
  color: #0f172a !important;
}

/* Hero Search & Quick Chips */
.hero-search-wrapper {
  margin: 4px 0 6px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hero-search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8fafc !important;
  border: 1.5px solid #cbd5e1 !important;
  border-radius: 12px;
  padding: 6px 8px 6px 14px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.hero-search-bar:focus-within {
  border-color: #2563eb !important;
  background: #ffffff !important;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.search-icon-svg {
  color: #64748b !important;
  flex-shrink: 0;
}

.hero-search-bar input {
  flex: 1;
  background: transparent;
  border: 0;
  color: #0f172a !important; /* BLACK TEXT WHEN TYPING */
  font-size: 14px;
  padding: 8px 0;
  font-family: inherit;
  outline: none;
}

.hero-search-bar input::placeholder {
  color: #94a3b8 !important;
  font-size: 13.5px;
}

.hero-search-submit {
  background: #ea580c !important;
  color: #ffffff !important;
  border: 0;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 13.5px;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.15s, transform 0.15s;
  white-space: nowrap;
}

.hero-search-submit:hover {
  background: #c2410c !important;
}

.hero-quick-tags {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.tag-label {
  font-size: 11px;
  font-weight: 800;
  color: #64748b !important;
  letter-spacing: 0.6px;
  margin-right: 2px;
}

.quick-tag-chip {
  background: #f1f5f9 !important;
  border: 1px solid #cbd5e1 !important;
  color: #1e293b !important;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: inherit;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.quick-tag-chip:hover {
  background: #fff7ed !important;
  border-color: #fdba74 !important;
  color: #ea580c !important;
}

.quick-tag-chip.chip-library {
  background: #ecfdf5 !important;
  border-color: #a7f3d0 !important;
  color: #047857 !important;
}

.quick-tag-chip.chip-library:hover {
  background: #d1fae5 !important;
  color: #065f46 !important;
}

/* Hero Action CTAs */
.hero-cta-group {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.btn-hero-primary {
  background: #ea580c !important;
  color: #ffffff !important;
  border: 0;
  border-radius: 10px;
  padding: 12px 24px;
  font-size: 14.5px;
  font-weight: 850;
  cursor: pointer;
  transition: background 0.15s, transform 0.15s;
}

.btn-hero-primary:hover {
  background: #c2410c !important;
}

.btn-hero-secondary {
  background: #ffffff !important;
  color: #0f172a !important;
  border: 1.5px solid #cbd5e1 !important;
  border-radius: 10px;
  padding: 12px 22px;
  font-size: 14.5px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-hero-secondary:hover {
  background: #eff6ff !important;
  border-color: #93c5fd !important;
  color: #1d4ed8 !important;
}

.hero-helpline-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #475569 !important;
  font-size: 13px;
  padding: 8px 12px;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
}

.hero-helpline-link strong {
  color: #ea580c !important;
  font-weight: 800;
}

.hero-helpline-link:hover {
  color: #0f172a !important;
}`;

if (oldHeroStylesRegex.test(css)) {
  css = css.replace(oldHeroStylesRegex, newHeroStyles);
  fs.writeFileSync('styles.css', css, 'utf8');
  console.log('Successfully replaced old dark hero text styles with high-contrast corporate styles!');
} else {
  console.log('Regex did not match directly, appending high-specificity overrides');
  css += '\n' + newHeroStyles;
  fs.writeFileSync('styles.css', css, 'utf8');
}
