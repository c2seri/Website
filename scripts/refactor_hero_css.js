const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

// Replace dark hero styling with clean, prestigious light EdTech style
const oldHeroCss = `.hero-enterprise {
  position: relative;
  background: #0b1a30;
  background-image: 
    radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px);
  background-size: 24px 24px;
  color: #ffffff;
  border-radius: 16px;
  border: 1px solid #1e3a5f;
  padding: 44px 40px;
  box-shadow: 0 12px 36px -8px rgba(10, 25, 47, 0.45);
  margin-bottom: 28px;
  overflow: hidden;
}`;

const newHeroCss = `.hero-enterprise {
  position: relative;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
  color: #0a192f;
  border-radius: 18px;
  border: 1px solid #e2e8f0;
  padding: 44px 40px;
  box-shadow: 0 10px 30px -8px rgba(15, 23, 42, 0.06);
  margin-bottom: 28px;
  overflow: hidden;
}

/* Hero Feature Panel on Right */
.hero-feature-panel {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 30px -6px rgba(15, 23, 42, 0.07);
}

.feature-panel-header h3 {
  color: #0a192f;
  font-size: 18px;
  font-weight: 800;
  margin: 0 0 4px;
}

.feature-panel-header p {
  color: #64748b;
  font-size: 13px;
  margin: 0 0 16px;
}

.feature-item-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  transition: all 0.15s ease;
}

.feature-item:hover {
  background: #ffffff;
  border-color: #cbd5e1;
  box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.06);
}

.feature-icon-bubble {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: #eff6ff;
  color: #1d4ed8;
}

.feature-text-block {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.feature-text-block strong {
  font-size: 13.5px;
  font-weight: 750;
  color: #0a192f;
  background: transparent !important;
}

.feature-text-block span {
  font-size: 12px;
  color: #64748b;
  line-height: 1.4;
  background: transparent !important;
}`;

// Search bar in hero: make it light and crisp
const oldHeroSearch = `.hero-search-bar {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 10px;
  padding: 6px 8px 6px 14px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  margin-bottom: 12px;
}`;

const newHeroSearch = `.hero-search-bar {
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1.5px solid #cbd5e1;
  border-radius: 12px;
  padding: 6px 8px 6px 14px;
  box-shadow: 0 4px 16px -2px rgba(15, 23, 42, 0.08);
  margin-bottom: 12px;
  transition: border-color 0.15s ease;
}
.hero-search-bar:focus-within {
  border-color: #1d4ed8;
  box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.12);
}`;

// Kicker in hero
const oldKicker = `.hero-kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 750;
  letter-spacing: 0.4px;
  color: #93c5fd;
  margin-bottom: 16px;
}`;

const newKicker = `.hero-kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 750;
  letter-spacing: 0.4px;
  color: #1d4ed8;
  margin-bottom: 16px;
}`;

// Subtitle in hero
const oldSub = `.hero-subtitle {
  font-size: 16px;
  line-height: 1.6;
  color: #cbd5e1;
  margin-bottom: 24px;
  max-width: 580px;
}`;

const newSub = `.hero-subtitle {
  font-size: 15.5px;
  line-height: 1.6;
  color: #475569;
  margin-bottom: 24px;
  max-width: 580px;
}`;

// Quick tag chips in hero
const oldChip = `.quick-tag-chip {
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 650;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: inherit;
}`;

const newChip = `.quick-tag-chip {
  background: #f1f5f9;
  color: #334155;
  border: 1px solid #e2e8f0;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 650;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: inherit;
}
.quick-tag-chip:hover {
  background: #1d4ed8;
  color: #ffffff;
  border-color: #1d4ed8;
}`;

css = css.replace(oldHeroCss, newHeroCss);
css = css.replace(oldHeroSearch, newHeroSearch);
css = css.replace(oldKicker, newKicker);
css = css.replace(oldSub, newSub);
css = css.replace(oldChip, newChip);

// Fix text-decoration on brand
css = css.replace('.brand {\r\n  display: flex;', '.brand {\r\n  text-decoration: none;\r\n  display: flex;');
css = css.replace('.brand {\n  display: flex;', '.brand {\n  text-decoration: none;\n  display: flex;');

fs.writeFileSync('styles.css', css, 'utf8');
console.log('styles.css hero rules updated!');

