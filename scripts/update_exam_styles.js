const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

const newExamStyles = `
/* ==========================================================================
   OFFICIAL EXAM SHOWCASE & EMBLEM SYSTEM (204+ PAN-INDIA EXAMS)
   ========================================================================== */
.pan-india-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  margin-bottom: 36px;
}

@media (max-width: 1080px) {
  .pan-india-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 18px;
  }
}

@media (max-width: 680px) {
  .pan-india-grid {
    grid-template-columns: 1fr !important;
    gap: 14px;
  }
}

.pan-exam-card {
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);
  transition: all 0.22s ease-in-out;
  position: relative;
  overflow: hidden;
}

.pan-exam-card:hover {
  transform: translateY(-4px);
  border-color: #cbd5e1;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.09);
}

.pan-exam-card-header {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 12px;
}

.pan-exam-logo-wrap {
  width: 50px;
  height: 50px;
  min-width: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.03);
  overflow: hidden;
}

.pan-board-badge {
  font-size: 11px;
  font-weight: 800;
  padding: 2.5px 8px;
  border-radius: 6px;
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.pan-state-badge {
  font-size: 11px;
  font-weight: 750;
  padding: 2.5px 8px;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #475569;
}

.pan-state-badge.state-odisha {
  background: #ecfdf5;
  color: #047857;
  border-color: #a7f3d0;
}

.pan-state-badge.state-central {
  background: #f8fafc;
  color: #1e3a8a;
  border-color: #cbd5e1;
}

.pan-exam-title {
  font-size: 16px;
  font-weight: 850;
  color: #0f172a;
  line-height: 1.3;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pan-exam-meta-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px 12px;
  margin-bottom: 12px;
}

.pan-exam-meta-item {
  display: flex;
  flex-direction: column;
}

.pan-exam-meta-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #64748b;
  margin-bottom: 2px;
}

.pan-exam-meta-val {
  font-size: 12px;
  font-weight: 750;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pan-exam-posts-box {
  font-size: 11.5px;
  color: #475569;
  line-height: 1.45;
  margin-bottom: 12px;
  background: #f8fafc;
  border-left: 3px solid #3b82f6;
  padding: 6px 10px;
  border-radius: 0 8px 8px 0;
}

.pan-exam-pattern-box {
  background: #f1f5f9;
  border-radius: 8px;
  padding: 8px 10px;
  margin-bottom: 14px;
  font-size: 11.5px;
  color: #334155;
  line-height: 1.4;
}

.pan-exam-actions {
  display: flex;
  gap: 8px;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #f1f5f9;
}

/* Modal Details Styling */
.exam-modal-wrapper {
  background: #ffffff;
  border-radius: 18px;
  max-width: 760px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 28px;
  box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.4);
  position: relative;
}

.exam-modal-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding-bottom: 18px;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 20px;
}

.exam-modal-grid-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

@media (max-width: 600px) {
  .exam-modal-grid-stats {
    grid-template-columns: 1fr !important;
  }
}

.exam-modal-stat-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px;
}

.exam-modal-section-title {
  font-size: 14px;
  font-weight: 800;
  color: #0f172a;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin: 18px 0 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}
`;

if (!css.includes('OFFICIAL EXAM SHOWCASE & EMBLEM SYSTEM')) {
  css += '\n' + newExamStyles;
  fs.writeFileSync('styles.css', css, 'utf8');
  console.log('Appended official exam showcase styles to styles.css!');
} else {
  console.log('Exam showcase styles already present in styles.css');
}
