/* ==========================================================================
   C2S 24-HOUR PREMIUM STUDY LIBRARY — 360° GOOGLE STREET VIEW ENGINE
   High-Performance 360 Panorama Tour with Hotspot Desks & Radar Minimap
   ========================================================================== */

(function() {
  'use strict';

  // 5 Viewpoints in the Study Sanctuary: Upper Floor Zone A, Lower Floor Zones B, C, D, and Reception
  const VIEWPOINTS = {
    zone_a: {
      name: "Upper Floor (2nd Floor) • Zone A: Executive Sanctuary",
      tag: "24 Seats (S-1 to S-24) • Attached Lockers L-1 to L-24 • 5G Ultra Wi-Fi",
      desks: Array.from({length: 24}, (_, i) => "S-" + (i + 1)),
      initialYaw: 0,
      initialPitch: -4,
      navArrows: [
        { target: "zone_b", yaw: 90, pitch: -15, label: "Take Stairs to 1st Floor (Zone B) →" },
        { target: "reception", yaw: 180, pitch: -12, label: "← Walk to Reception & Entry" }
      ]
    },
    zone_b: {
      name: "Lower Floor (1st Floor) • Zone B: Left Wall Bay",
      tag: "43 Seats (S-25 to S-67) • Split Inverter A/C • Lockers L-25 to L-67",
      desks: Array.from({length: 43}, (_, i) => "S-" + (i + 25)),
      initialYaw: 90,
      initialPitch: -4,
      navArrows: [
        { target: "zone_a", yaw: 270, pitch: -15, label: "← Take Stairs to 2nd Floor (Zone A)" },
        { target: "zone_c", yaw: 90, pitch: -15, label: "Walk to Zone C (Center Sanctuary) →" }
      ]
    },
    zone_c: {
      name: "Lower Floor (1st Floor) • Zone C: Center Dual-Row Sanctuary",
      tag: "42 Seats (S-68 to S-109) • Dual Corridor Aisle • Lockers L-68 to L-109",
      desks: Array.from({length: 42}, (_, i) => "S-" + (i + 68)),
      initialYaw: 180,
      initialPitch: -4,
      navArrows: [
        { target: "zone_b", yaw: 270, pitch: -15, label: "← Walk to Zone B (Left Bay)" },
        { target: "zone_d", yaw: 90, pitch: -15, label: "Walk to Zone D (Right Bay) →" }
      ]
    },
    zone_d: {
      name: "Lower Floor (1st Floor) • Zone D: Right Wall Bay & Reception",
      tag: "40 Seats (S-110 to S-149) • Proximity to Biometrics & Lockers L-110 to L-149",
      desks: Array.from({length: 40}, (_, i) => "S-" + (i + 110)),
      initialYaw: 270,
      initialPitch: -4,
      navArrows: [
        { target: "zone_c", yaw: 270, pitch: -15, label: "← Walk to Zone C (Center)" },
        { target: "reception", yaw: 0, pitch: -12, label: "Walk to Reception & RO Water →" }
      ]
    },
    reception: {
      name: "Main Reception & Entry Sanctuary (1st Floor)",
      tag: "Biometric Punch • RO Hot/Cold Water • Help Desk (9777481909)",
      desks: [],
      initialYaw: 0,
      initialPitch: 0,
      navArrows: [
        { target: "zone_b", yaw: 0, pitch: -10, label: "Enter Zone B & C (1st Floor) →" },
        { target: "zone_a", yaw: 180, pitch: -10, label: "Take Stairs to 2nd Floor (Zone A) →" }
      ]
    }
  };

  // State
  let currentViewpoint = 'zone_a';
  let yaw = 0;       // Horizontal rotation in degrees [0..360]
  let pitch = -4;    // Vertical tilt in degrees [-60..60]
  let targetYaw = 0;
  let targetPitch = -4;
  let fov = 75;       // Field of view in degrees [45..95]
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let autoRotate = true;
  let nightMode = false;
  let selectedDesk = "S-25";

  // Pre-seeded occupied desks matching active student enrollments
  const occupiedDesks = new Set(["S-05", "S-14", "S-25", "S-36", "S-70", "S-85", "S-112", "S-135"]);

  let canvas, ctx, panoramaCache = {};
  let libraryPhoto = null;

  // Load Authentic Photorealistic Image Plate
  function preloadPhotorealisticPlate() {
    try {
      const img = new Image();
      img.onload = function() {
        libraryPhoto = img;
        panoramaCache = {}; // Invalidate cache so texture updates with real photo
      };
      img.onerror = function() {
        if (!img._retried) {
          img._retried = true;
          img.src = '../images/hero-library-desktop.jpg';
        }
      };
      img.src = '/images/hero-library-desktop.jpg';
    } catch (e) {}
  }

  // Safe RoundRect Helper that works in all browsers
  function drawSafeRoundRect(c, x, y, w, h, r) {
    if (typeof c.roundRect === 'function') {
      try {
        c.roundRect(x, y, w, h, r);
        return;
      } catch (e) {}
    }
    const radius = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
    c.moveTo(x + radius, y);
    c.lineTo(x + w - radius, y);
    c.quadraticCurveTo(x + w, y, x + w, y + radius);
    c.lineTo(x + w, y + h - radius);
    c.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    c.lineTo(x + radius, y + h);
    c.quadraticCurveTo(x, y + h, x, y + h - radius);
    c.lineTo(x, y + radius);
    c.quadraticCurveTo(x, y, x + radius, y);
    c.closePath();
  }

  // Generate High-Res 360 Panorama Texture
  function generatePanoramaTexture(vpKey, isNight) {
    try {
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 2560;
      pCanvas.height = 1280;
      const pCtx = pCanvas.getContext('2d');
      if (!pCtx) return null;
      const w = pCanvas.width;
      const h = pCanvas.height;

      // Base Wall & Carpet Colors
      const ceilingColor = isNight ? '#030712' : '#0a192f';
      const wallColor = isNight ? '#0b1329' : '#1e293b';
      const floorColor = isNight ? '#111827' : '#1a2333';

      // 1. Ceiling Linear Gradient
      const ceilingGrad = pCtx.createLinearGradient(0, 0, 0, h * 0.46);
      ceilingGrad.addColorStop(0, ceilingColor);
      ceilingGrad.addColorStop(1, wallColor);
      pCtx.fillStyle = ceilingGrad;
      pCtx.fillRect(0, 0, w, h * 0.46);

      // 2. Floor Carpet with Acoustic Depth
      const floorGrad = pCtx.createLinearGradient(0, h * 0.46, 0, h);
      floorGrad.addColorStop(0, wallColor);
      floorGrad.addColorStop(0.12, floorColor);
      floorGrad.addColorStop(1, isNight ? '#020617' : '#0f172a');
      pCtx.fillStyle = floorGrad;
      pCtx.fillRect(0, h * 0.46, w, h * 0.54);

      // 3. Composite Real Photorealistic Image Plate if loaded
      if (libraryPhoto && libraryPhoto.complete && libraryPhoto.naturalWidth > 0) {
        try {
          pCtx.save();
          pCtx.globalAlpha = isNight ? 0.65 : 0.85;
          pCtx.drawImage(libraryPhoto, 0, h * 0.22, w * 0.5, h * 0.62);
          pCtx.drawImage(libraryPhoto, w * 0.5, h * 0.22, w * 0.5, h * 0.62);
          pCtx.restore();
        } catch (pe) {}
      }

      // 4. Perspective Floor Grid Lines
      pCtx.strokeStyle = isNight ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.10)';
      pCtx.lineWidth = 1.5;
      for (let x = 0; x < w; x += 80) {
        pCtx.beginPath();
        pCtx.moveTo(x, h * 0.48);
        pCtx.lineTo(x, h);
        pCtx.stroke();
      }
      for (let y = h * 0.48; y < h; y += 36) {
        pCtx.beginPath();
        pCtx.moveTo(0, y);
        pCtx.lineTo(w, y);
        pCtx.stroke();
      }

      // 5. Ceiling Recessed Warm LED Spotlights
      for (let x = 40; x < w; x += 140) {
        try {
          const lampGrad = pCtx.createRadialGradient(x, h * 0.20, 2, x, h * 0.20, 50);
          lampGrad.addColorStop(0, isNight ? 'rgba(251, 191, 36, 0.95)' : 'rgba(255, 255, 255, 0.98)');
          lampGrad.addColorStop(0.35, isNight ? 'rgba(245, 158, 11, 0.4)' : 'rgba(224, 242, 254, 0.45)');
          lampGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          pCtx.fillStyle = lampGrad;
          pCtx.beginPath();
          pCtx.arc(x, h * 0.20, 50, 0, Math.PI * 2);
          pCtx.fill();
        } catch (le) {}
      }

      // 6. Architectural Header Signs
      pCtx.save();
      pCtx.fillStyle = isNight ? '#38bdf8' : '#93c5fd';
      pCtx.font = 'bold 24px system-ui, -apple-system, sans-serif';
      pCtx.textAlign = 'center';
      pCtx.shadowColor = isNight ? '#0284c7' : '#2563eb';
      pCtx.shadowBlur = 14;

      pCtx.fillText('🏛️ C2S 24-HOUR PREMIUM STUDY SANCTUARY • PATRAPADA', w * 0.25, h * 0.32);
      pCtx.fillText('⚡ 100% DG POWER BACKUP • 300 MBPS DUAL FIBER WI-FI', w * 0.75, h * 0.32);

      pCtx.fillStyle = '#f59e0b';
      pCtx.font = 'bold 16px system-ui, -apple-system, sans-serif';
      pCtx.fillText('ZONE A: SILENT CUBICLES | ZONE B: DIGITAL POWER HUB | ZONE C: ACOUSTIC PODS', w * 0.5, h * 0.37);
      pCtx.restore();

      // 7. Individual Wooden Study Cubicles with Warm Gooseneck Lamps
      for (let i = 0; i < 16; i++) {
        const dx = (w / 16) * i + 18;
        const dy = h * 0.53 + (i % 2 === 0 ? 0 : 20);
        const dw = (w / 16) - 36;
        const dh = 120;

        // Wooden Desk Surface
        pCtx.fillStyle = isNight ? '#1e293b' : '#334155';
        pCtx.fillRect(dx, dy, dw, dh);
        pCtx.strokeStyle = isNight ? '#0ea5e9' : '#64748b';
        pCtx.lineWidth = 1.5;
        pCtx.strokeRect(dx, dy, dw, dh);

        // Acoustic Soundproofing Wall Partition
        pCtx.fillStyle = isNight ? 'rgba(15, 23, 42, 0.95)' : 'rgba(51, 65, 85, 0.95)';
        pCtx.fillRect(dx + 4, dy - 50, dw - 8, 50);

        // Warm Desk Lamp Amber Cone
        try {
          const deskLampGrad = pCtx.createRadialGradient(dx + dw / 2, dy - 24, 2, dx + dw / 2, dy - 24, 40);
          deskLampGrad.addColorStop(0, isNight ? 'rgba(253, 224, 71, 0.9)' : 'rgba(255, 255, 255, 0.8)');
          deskLampGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          pCtx.fillStyle = deskLampGrad;
          pCtx.beginPath();
          pCtx.arc(dx + dw / 2, dy - 24, 40, 0, Math.PI * 2);
          pCtx.fill();
        } catch (de) {}

        // Ergonomic High-Back Mesh Chair
        pCtx.fillStyle = isNight ? '#0a0f1d' : '#1e293b';
        pCtx.fillRect(dx + dw * 0.28, dy + dh - 10, dw * 0.44, 32);
      }

      return pCanvas;
    } catch (e) {
      console.warn("Panorama generation error:", e);
      return null;
    }
  }

  // Retrieve cached texture
  function getPanorama() {
    const key = currentViewpoint + '_' + (nightMode ? 'night' : 'day') + '_' + (libraryPhoto ? 'photo' : 'proc');
    if (!panoramaCache[key]) {
      panoramaCache[key] = generatePanoramaTexture(currentViewpoint, nightMode);
    }
    return panoramaCache[key];
  }

  // Spherical Coordinates (yaw, pitch) to Screen (x, y)
  function sphericalToScreen(tYaw, tPitch, screenW, screenH) {
    let diffYaw = (tYaw - yaw) % 360;
    if (diffYaw < -180) diffYaw += 360;
    if (diffYaw > 180) diffYaw -= 360;

    const hFov = fov * (screenW / screenH);
    if (Math.abs(diffYaw) > hFov * 0.72) return null;

    const diffPitch = tPitch - pitch;
    if (Math.abs(diffPitch) > fov * 0.72) return null;

    const x = screenW / 2 + (diffYaw / (hFov / 2)) * (screenW / 2);
    const y = screenH / 2 - (diffPitch / (fov / 2)) * (screenH / 2);

    return { x, y };
  }

  // Main 360 Render Loop (60 FPS)
  function render360() {
    // Schedule next frame FIRST so the loop never halts
    requestAnimationFrame(render360);

    if (!canvas || !ctx) return;

    // Dynamically maintain canvas dimensions
    resizeCanvas();

    const w = canvas.width;
    const h = canvas.height;
    if (w <= 0 || h <= 0) return;

    try {
      // Smooth camera interpolation
      yaw += (targetYaw - yaw) * 0.12;
      pitch += (targetPitch - pitch) * 0.12;
      if (yaw < 0) { yaw += 360; targetYaw += 360; }
      if (yaw >= 360) { yaw -= 360; targetYaw -= 360; }

      // Auto-rotation when not interacting
      if (autoRotate && !isDragging) {
        targetYaw += 0.08;
      }

      // 1. Guaranteed Visible Study Environment Backdrop (Instant, Never Black!)
      const ceilGrad = ctx.createLinearGradient(0, 0, 0, h * 0.48);
      ceilGrad.addColorStop(0, nightMode ? '#020617' : '#0a192f');
      ceilGrad.addColorStop(1, nightMode ? '#0f172a' : '#1e293b');
      ctx.fillStyle = ceilGrad;
      ctx.fillRect(0, 0, w, h * 0.48);

      const flrGrad = ctx.createLinearGradient(0, h * 0.48, 0, h);
      flrGrad.addColorStop(0, nightMode ? '#0b1329' : '#1e293b');
      flrGrad.addColorStop(1, nightMode ? '#020617' : '#0f172a');
      ctx.fillStyle = flrGrad;
      ctx.fillRect(0, h * 0.48, w, h * 0.52);

      // Perspective horizon line
      ctx.strokeStyle = nightMode ? 'rgba(56, 189, 248, 0.4)' : 'rgba(147, 197, 253, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.48);
      ctx.lineTo(w, h * 0.48);
      ctx.stroke();

      // 2. Seamless 360 Panorama Projection
      try {
        const pano = getPanorama();
        if (pano) {
          const fullWidth = (360 / fov) * w;
          const fullHeight = (180 / fov) * h;
          const startX = (w / 2) - (yaw / 360) * fullWidth;
          const startY = (h / 2) - (fullHeight / 2) + (pitch / 90) * (fullHeight * 0.4);

          const firstTile = Math.floor((0 - startX) / fullWidth);
          for (let i = firstTile - 1; i <= firstTile + 2; i++) {
            const tileX = startX + i * fullWidth;
            if (tileX + fullWidth > 0 && tileX < w) {
              ctx.drawImage(pano, tileX, startY, fullWidth, fullHeight);
            }
          }
        }
      } catch (panoErr) {}

      // 3. Subtle Cinematic Radial Vignette
      try {
        const vigGrad = ctx.createRadialGradient(w / 2, h / 2, h * 0.35, w / 2, h / 2, h * 0.85);
        vigGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        vigGrad.addColorStop(1, nightMode ? 'rgba(2, 6, 23, 0.70)' : 'rgba(10, 25, 47, 0.40)');
        ctx.fillStyle = vigGrad;
        ctx.fillRect(0, 0, w, h);
      } catch (ve) {}

      // 4. Render Desk Pins in Current Viewpoint
      const vp = VIEWPOINTS[currentViewpoint] || VIEWPOINTS.zone_a;
      const desks = vp.desks || [];

      desks.forEach((deskId, idx) => {
        try {
          const deskYaw = ((idx - 7.5) / 16) * 150 + vp.initialYaw;
          const deskPitch = -11 + (idx % 2 === 0 ? 0 : 3.5);

          const pt = sphericalToScreen(deskYaw, deskPitch, w, h);
          if (pt) {
            drawDeskHotspot(pt.x, pt.y, deskId);
          }
        } catch (de) {}
      });

      // 5. Render Floor Navigation Arrows
      (vp.navArrows || []).forEach(nav => {
        try {
          const pt = sphericalToScreen(nav.yaw, nav.pitch, w, h);
          if (pt) {
            drawNavigationArrow(pt.x, pt.y, nav);
          }
        } catch (ne) {}
      });

      // 6. Synchronize Compass Needle
      try {
        updateCompassUi(yaw);
      } catch (ce) {}

      // 7. Synchronize Real-time Radar Minimap
      try {
        drawRadarMinimap(yaw);
      } catch (re) {}

    } catch (err) {
      console.warn("Render 360 loop error:", err);
    }
  }

  // Draw Interactive Desk Pin
  function drawDeskHotspot(x, y, deskId) {
    const isSelected = selectedDesk === deskId;
    const isOccupied = occupiedDesks.has(deskId);

    ctx.save();

    // Animated Pulse Ring
    const now = performance.now() * 0.003;
    const pulse = (Math.sin(now + parseInt(deskId.replace(/\D/g, '') || 1)) + 1) * 0.5;

    ctx.beginPath();
    ctx.arc(x, y, 16 + pulse * 6, 0, Math.PI * 2);
    ctx.fillStyle = isSelected ? 'rgba(37, 99, 235, 0.32)' : (isOccupied ? 'rgba(148, 163, 184, 0.18)' : 'rgba(16, 185, 129, 0.32)');
    ctx.fill();

    // Outer Pin Body
    ctx.beginPath();
    ctx.arc(x, y, 14, 0, Math.PI * 2);
    ctx.fillStyle = isSelected ? '#2563eb' : (isOccupied ? '#64748b' : '#10b981');
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Center Icon / Dot
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Desk Label Pill with Verified Price
    const labelText = `Desk ${deskId}`;
    const priceText = isOccupied ? 'Occupied' : '₹1000/mo';
    ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
    const textW = Math.max(76, (ctx.measureText ? ctx.measureText(labelText).width : 40) + 24);
    const pillH = 34;
    const pillX = x - textW / 2;
    const pillY = y - 46;

    // Badge Background
    ctx.fillStyle = isSelected ? 'rgba(15, 23, 42, 0.94)' : 'rgba(15, 23, 42, 0.88)';
    ctx.strokeStyle = isSelected ? '#3b82f6' : (isOccupied ? '#475569' : '#10b981');
    ctx.lineWidth = isSelected ? 2 : 1.2;

    ctx.beginPath();
    drawSafeRoundRect(ctx, pillX, pillY, textW, pillH, 8);
    ctx.fill();
    ctx.stroke();

    // Desk Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(labelText, x, pillY + 11);

    // Subtext: Status & Price
    ctx.fillStyle = isSelected ? '#60a5fa' : (isOccupied ? '#94a3b8' : '#34d399');
    ctx.font = 'bold 9.5px system-ui, -apple-system, sans-serif';
    ctx.fillText(priceText, x, pillY + 24);

    ctx.restore();
  }

  // Draw Floor Walking Navigation Arrow
  function drawNavigationArrow(x, y, nav) {
    ctx.save();

    const now = performance.now() * 0.003;
    const bounce = Math.sin(now) * 4;

    // Arrow Circle Base
    ctx.beginPath();
    ctx.arc(x, y + bounce, 18, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(234, 88, 12, 0.92)';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Directional Triangle
    ctx.beginPath();
    ctx.moveTo(x - 5, y + bounce + 6);
    ctx.lineTo(x, y + bounce - 6);
    ctx.lineTo(x + 5, y + bounce + 6);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Navigation Label Pill
    ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
    const textW = (ctx.measureText ? ctx.measureText(nav.label).width : 90) + 18;
    const pillX = x - textW / 2;
    const pillY = y + bounce + 24;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.90)';
    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    drawSafeRoundRect(ctx, pillX, pillY, textW, 22, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(nav.label, x, pillY + 11);

    ctx.restore();
  }

  // Synchronize Compass Needle Needle
  function updateCompassUi(currentYaw) {
    const needle = document.getElementById('c2sCompassNeedle');
    if (needle) {
      needle.style.transform = `rotate(${-currentYaw}deg)`;
    }
  }

  // Real-time Top-Down Radar Minimap
  function drawRadarMinimap(currentYaw) {
    const radar = document.getElementById('c2sRadarCanvas');
    if (!radar) return;
    const rCtx = radar.getContext('2d');
    if (!rCtx) return;
    const rw = radar.width;
    const rh = radar.height;
    const cx = rw / 2;
    const cy = rh / 2;
    const radius = rw * 0.44;

    rCtx.clearRect(0, 0, rw, rh);

    // Radar Dial Background
    rCtx.fillStyle = 'rgba(15, 23, 42, 0.94)';
    rCtx.beginPath();
    rCtx.arc(cx, cy, radius, 0, Math.PI * 2);
    rCtx.fill();
    rCtx.strokeStyle = '#334155';
    rCtx.lineWidth = 1.5;
    rCtx.stroke();

    // Range Ring
    rCtx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
    rCtx.beginPath();
    rCtx.arc(cx, cy, radius * 0.52, 0, Math.PI * 2);
    rCtx.stroke();

    // 4 Zone Nodes
    const zones = [
      { name: "A", angle: 0, color: "#10b981", active: currentViewpoint === 'zone_a' },
      { name: "B", angle: 90, color: "#3b82f6", active: currentViewpoint === 'zone_b' },
      { name: "C", angle: 180, color: "#a855f7", active: currentViewpoint === 'zone_c' },
      { name: "Ent", angle: 270, color: "#f97316", active: currentViewpoint === 'reception' }
    ];

    zones.forEach(z => {
      const rad = (z.angle - 90) * (Math.PI / 180);
      const zx = cx + Math.cos(rad) * (radius * 0.72);
      const zy = cy + Math.sin(rad) * (radius * 0.72);

      rCtx.fillStyle = z.active ? z.color : 'rgba(255, 255, 255, 0.4)';
      rCtx.beginPath();
      rCtx.arc(zx, zy, z.active ? 6 : 4, 0, Math.PI * 2);
      rCtx.fill();

      rCtx.font = 'bold 9px system-ui, -apple-system, sans-serif';
      rCtx.fillStyle = z.active ? '#ffffff' : '#94a3b8';
      rCtx.textAlign = 'center';
      rCtx.textBaseline = 'middle';
      rCtx.fillText(z.name, zx, zy);
    });

    // Dynamic FOV Viewing Cone
    const radYaw = (currentYaw - 90) * (Math.PI / 180);
    const halfFovRad = (fov / 2) * (Math.PI / 180);

    rCtx.save();
    rCtx.beginPath();
    rCtx.moveTo(cx, cy);
    rCtx.arc(cx, cy, radius * 0.95, radYaw - halfFovRad, radYaw + halfFovRad);
    rCtx.closePath();

    try {
      const coneGrad = rCtx.createRadialGradient(cx, cy, 2, cx, cy, radius);
      coneGrad.addColorStop(0, 'rgba(56, 189, 248, 0.75)');
      coneGrad.addColorStop(1, 'rgba(14, 165, 233, 0.08)');
      rCtx.fillStyle = coneGrad;
      rCtx.fill();
    } catch (e) {
      rCtx.fillStyle = 'rgba(56, 189, 248, 0.35)';
      rCtx.fill();
    }
    rCtx.restore();

    // Center User Dot
    rCtx.fillStyle = '#ffffff';
    rCtx.beginPath();
    rCtx.arc(cx, cy, 3.5, 0, Math.PI * 2);
    rCtx.fill();
  }

  // Pointer & Drag Interaction Handlers
  function setupPointerEvents() {
    if (!canvas) return;

    // Desktop Mouse Drag
    canvas.addEventListener('mousedown', e => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      autoRotate = false;
      canvas.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;

      targetYaw -= dx * 0.35;
      targetPitch += dy * 0.25;
      targetPitch = Math.max(-55, Math.min(55, targetPitch));
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        if (canvas) canvas.style.cursor = 'grab';
      }
    });

    // Touch Support for Mobile / Tablet Drag
    canvas.addEventListener('touchstart', e => {
      if (e.touches.length === 1) {
        isDragging = true;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
        autoRotate = false;
      }
    }, { passive: true });

    window.addEventListener('touchmove', e => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - lastMouseX;
      const dy = e.touches[0].clientY - lastMouseY;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;

      targetYaw -= dx * 0.45;
      targetPitch += dy * 0.35;
      targetPitch = Math.max(-55, Math.min(55, targetPitch));
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Mouse Wheel Zoom
    canvas.addEventListener('wheel', e => {
      e.preventDefault();
      fov += e.deltaY * 0.05;
      fov = Math.max(45, Math.min(95, fov));
    }, { passive: false });

    // Click on Hotspots or Navigation Arrows
    canvas.addEventListener('click', e => {
      const rect = canvas.getBoundingClientRect();
      const clickX = (e.clientX - rect.left) * (canvas.width / rect.width);
      const clickY = (e.clientY - rect.top) * (canvas.height / rect.height);
      check360Click(clickX, clickY);
    });
  }

  // Handle Clicks in 360 Space
  function check360Click(clickX, clickY) {
    const vp = VIEWPOINTS[currentViewpoint] || VIEWPOINTS.zone_a;
    const w = canvas.width;
    const h = canvas.height;

    // 1. Navigation Arrows
    for (const nav of (vp.navArrows || [])) {
      const pt = sphericalToScreen(nav.yaw, nav.pitch, w, h);
      if (pt) {
        const dist = Math.hypot(clickX - pt.x, clickY - pt.y);
        if (dist <= 30) {
          switch360Viewpoint(nav.target);
          return;
        }
      }
    }

    // 2. Desk Hotspots
    for (let idx = 0; idx < (vp.desks || []).length; idx++) {
      const deskId = vp.desks[idx];
      const deskYaw = ((idx - 7.5) / 16) * 150 + vp.initialYaw;
      const deskPitch = -11 + (idx % 2 === 0 ? 0 : 3.5);

      const pt = sphericalToScreen(deskYaw, deskPitch, w, h);
      if (pt) {
        const dist = Math.hypot(clickX - pt.x, clickY - pt.y);
        if (dist <= 26) {
          onSelect360Desk(deskId);
          return;
        }
      }
    }
  }

  // Switch Viewpoint (Zone A, B, C, Reception)
  window.switch360Viewpoint = function(vpKey) {
    if (!VIEWPOINTS[vpKey]) return;
    currentViewpoint = vpKey;
    const vp = VIEWPOINTS[vpKey];
    targetYaw = vp.initialYaw;
    targetPitch = vp.initialPitch;

    // Update buttons
    document.querySelectorAll('.c2s-360-vp-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.vp === vpKey);
    });

    const titleEl = document.getElementById('c2s360VpTitle');
    const tagEl = document.getElementById('c2s360VpTag');
    if (titleEl) titleEl.textContent = vp.name;
    if (tagEl) tagEl.textContent = vp.tag;
  };

  // Desk Selection & Bottom HUD Update
  window.onSelect360Desk = function(deskId) {
    selectedDesk = deskId;
    const isOcc = occupiedDesks.has(deskId);

    const hudDeskName = document.getElementById('hudDeskName');
    const hudZoneName = document.getElementById('hudZoneName');
    const hudStatus = document.getElementById('hudDeskStatus');
    const hudCta = document.getElementById('hudBookCta');

    if (hudDeskName) hudDeskName.textContent = `Seat ${deskId}`;
    if (hudZoneName) {
      const num = parseInt(deskId.replace(/\D/g, ''), 10) || 1;
      if (num >= 1 && num <= 24) {
        hudZoneName.textContent = 'Upper Floor (2nd Fl) • Zone A (Executive Sanctuary)';
      } else if (num >= 25 && num <= 67) {
        hudZoneName.textContent = 'Lower Floor (1st Fl) • Zone B (Left Wall Bay)';
      } else if (num >= 68 && num <= 109) {
        hudZoneName.textContent = 'Lower Floor (1st Fl) • Zone C (Center Dual-Row)';
      } else {
        hudZoneName.textContent = 'Lower Floor (1st Fl) • Zone D (Right Wall Bay & Reception)';
      }
    }

    if (hudStatus) {
      hudStatus.innerHTML = isOcc ?
        `<span style="color:#ef4444;font-weight:800;">🔴 Occupied by Aspirant</span>` :
        `<span style="color:#10b981;font-weight:800;">🟢 Vacant & Available (₹1000/mo)</span>`;
    }

    if (hudCta) {
      if (isOcc) {
        hudCta.disabled = true;
        hudCta.textContent = "Seat Already Occupied";
        hudCta.style.background = "#64748b";
        hudCta.style.cursor = "not-allowed";
      } else {
        hudCta.disabled = false;
        hudCta.textContent = `Reserve Seat ${deskId} Online (₹1000/mo) →`;
        hudCta.style.background = "#ea580c";
        hudCta.style.cursor = "pointer";
        hudCta.onclick = function() {
          window.location.href = `admission.html?seat=${deskId}&shift=FullDay`;
        };
      }
    }
  };

  // Toggle Auto-Rotate
  window.toggle360AutoRotate = function() {
    autoRotate = !autoRotate;
    const btn = document.getElementById('btn360AutoRotate');
    if (btn) {
      btn.style.background = autoRotate ? '#1e3a8a' : 'rgba(15,23,42,0.85)';
      btn.innerHTML = autoRotate ? '🔄 Spinning' : '⏸️ Auto Spin';
    }
  };

  // Zoom In / Out
  window.zoom360 = function(delta) {
    fov += delta;
    fov = Math.max(45, Math.min(95, fov));
  };

  // Reset Camera View
  window.reset360Camera = function() {
    const vp = VIEWPOINTS[currentViewpoint] || VIEWPOINTS.zone_a;
    targetYaw = vp.initialYaw;
    targetPitch = vp.initialPitch;
    fov = 75;
  };

  // Day / Night Ambiance Toggle
  window.toggle360Ambiance = function() {
    nightMode = !nightMode;
    const btn = document.getElementById('btn360Ambiance');
    if (btn) {
      btn.innerHTML = nightMode ? '☀️ Daylight Mode' : '🌙 Night Lamp Mode';
    }
    panoramaCache = {}; // Invalidate cache
  };

  // Fullscreen 360
  window.toggle360Fullscreen = function() {
    const container = document.getElementById('c2s360Container');
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Resize Canvas to Match Element Dimensions
  function resizeCanvas() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.max(300, Math.floor((rect.width || 800) * dpr));
    const targetH = Math.max(200, Math.floor((rect.height || 540) * dpr));
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
  }

  // Initialize on DOM Ready
  function init360Tour() {
    canvas = document.getElementById('c2s360Canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    setupPointerEvents();
    preloadPhotorealisticPlate();
    render360();

    console.log('✓ C2S 360° Google Street View Sanctuary Engine Initialized');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init360Tour);
  } else {
    init360Tour();
  }

})();
