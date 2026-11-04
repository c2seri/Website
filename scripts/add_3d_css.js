const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

// Check if 3D styles already exist
if (!css.includes('/* 3D LIBRARY SEAT SANCTUARY ENGINE */')) {
  const new3dCss = `
/* ==========================================================================
   3D LIBRARY SEAT SANCTUARY ENGINE (HARDWARE-ACCELERATED ISOMETRIC 3D)
   ========================================================================== */

/* 3D Stage & Floor Wrapper */
.c2s-3d-stage {
  perspective: 1400px;
  perspective-origin: 50% 30%;
  padding: 30px 20px 40px;
  background: radial-gradient(ellipse at 50% 20%, #ffffff 0%, #f1f5f9 100%);
  border-radius: 20px;
  border: 1.5px solid #cbd5e1;
  overflow: hidden;
  position: relative;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.c2s-3d-stage.night-mode {
  background: radial-gradient(ellipse at 50% 30%, #0f172a 0%, #020617 100%);
  border-color: #334155;
  box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.6);
}

.c2s-3d-stage.night-mode .c2s-zone-title {
  color: #f8fafc !important;
}

.c2s-3d-floor {
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* View Mode 1: 3D Isometric View */
.c2s-3d-floor.view-isometric {
  transform: rotateX(32deg) rotateZ(-8deg);
}

/* View Mode 2: 3D Cinema Theatre View */
.c2s-3d-floor.view-cinema {
  transform: rotateX(48deg) rotateZ(0deg) scale(0.95);
}

/* View Mode 3: 2D Tactical Blueprint */
.c2s-3d-floor.view-2d {
  transform: rotateX(0deg) rotateZ(0deg) scale(1);
}

/* 3D Seat Grid */
.c2s-3d-desk-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 16px;
  transform-style: preserve-3d;
}

@media (max-width: 992px) {
  .c2s-3d-desk-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }
}

@media (max-width: 580px) {
  .c2s-3d-desk-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}

/* 3D Desk Item */
.c2s-3d-desk {
  position: relative;
  background: #ffffff;
  border-radius: 12px;
  border: 1.5px solid #10b981;
  padding: 12px 10px 10px;
  min-height: 84px;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: all 0.22s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  user-select: none;
}

/* 3D Layering & Shadows */
.view-isometric .c2s-3d-desk,
.view-cinema .c2s-3d-desk {
  box-shadow: 0 10px 18px rgba(15, 23, 42, 0.12), 0 3px 6px rgba(15, 23, 42, 0.08);
}

/* 3D Ergonomic Mesh Chair Simulation Behind Desk */
.c2s-3d-desk::before {
  content: '';
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 26px;
  height: 12px;
  background: #334155;
  border-radius: 6px 6px 0 0;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease;
  z-index: -1;
}

/* 3D LED Study Lamp at Top-Right Corner */
.c2s-3d-desk::after {
  content: '';
  position: absolute;
  top: 6px;
  right: 8px;
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 8px #10b981;
  transition: all 0.2s ease;
}

/* Hover Lift Effect */
.c2s-3d-desk:hover {
  transform: translateY(-8px) translateZ(12px) scale(1.04);
  border-color: #059669;
  box-shadow: 0 16px 28px -4px rgba(16, 185, 129, 0.25), 0 8px 12px -2px rgba(16, 185, 129, 0.15);
  z-index: 10;
}

.c2s-3d-desk:hover::after {
  transform: scale(1.4);
  box-shadow: 0 0 14px #10b981, 0 0 24px #10b981;
}

/* Occupied Desk State */
.c2s-3d-desk.occupied {
  background: #f1f5f9;
  border-color: #cbd5e1;
  cursor: not-allowed;
  opacity: 0.65;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.c2s-3d-desk.occupied::after {
  background: #94a3b8;
  box-shadow: none;
}

.c2s-3d-desk.occupied:hover {
  transform: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

/* Selected Desk State */
.c2s-3d-desk.selected {
  background: linear-gradient(135deg, #1d4ed8, #0f2a5c) !important;
  border-color: #3b82f6 !important;
  color: #ffffff !important;
  transform: translateY(-10px) translateZ(18px) scale(1.06);
  box-shadow: 0 20px 35px -5px rgba(29, 78, 216, 0.5), 0 0 20px rgba(59, 130, 246, 0.6) !important;
  z-index: 20;
}

.c2s-3d-desk.selected .c2s-desk-num,
.c2s-3d-desk.selected .c2s-desk-type,
.c2s-3d-desk.selected .c2s-desk-status {
  color: #ffffff !important;
}

.c2s-3d-desk.selected::after {
  background: #60a5fa;
  box-shadow: 0 0 16px #60a5fa, 0 0 30px #3b82f6;
  animation: c2sPulse 1.5s infinite alternate;
}

@keyframes c2sPulse {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(1.6); opacity: 1; }
}

/* Desk Content Typography */
.c2s-desk-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.c2s-desk-num {
  font-size: 15px;
  font-weight: 850;
  color: #0f172a;
}

.c2s-desk-type {
  font-size: 11px;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 6px;
}

.c2s-desk-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px dashed rgba(0, 0, 0, 0.1);
  padding-top: 5px;
  font-size: 11px;
}

.c2s-desk-status {
  font-weight: 800;
  color: #059669;
}

.c2s-3d-desk.occupied .c2s-desk-status {
  color: #64748b;
}

/* Floating 3D Desk Inspector HUD */
.c2s-desk-inspector-hud {
  position: sticky;
  bottom: 20px;
  z-index: 100;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1.5px solid #334155;
  border-radius: 16px;
  padding: 16px 22px;
  color: #ffffff;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(29, 78, 216, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 24px;
  transition: all 0.3s ease;
}
`;

  css += new3dCss;
  fs.writeFileSync('styles.css', css, 'utf8');
  console.log('Added 3D Sanctuary Engine styles to styles.css!');
}
