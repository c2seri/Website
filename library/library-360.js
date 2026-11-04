/* ==========================================================================
   C2S 24-HOUR PREMIUM STUDY LIBRARY — 360° GOOGLE STREET VIEW ENGINE
   High-Performance 360 Panorama Tour with Hotspot Desks & Radar Minimap
   ========================================================================== */

(function() {
  'use strict';

  // 4 Pre-rendered Photorealistic 360 Equirectangular Panoramas (Generated via Procedural Canvas)
  // Viewpoints: Zone A (Silent Cubicles), Zone B (Digital Hub), Zone C (Acoustic Pods), Reception
  const VIEWPOINTS = {
    zone_a: {
      name: "Zone A: Silent Study Cubicles",
      tag: "Pinpoint Silence • Warm LED Lamps",
      desks: ["A-01", "A-02", "A-03", "A-04", "A-05", "A-06", "A-07", "A-08", "A-09", "A-10", "A-11", "A-12", "A-13", "A-14", "A-15", "A-16"],
      initialYaw: 0,
      initialPitch: -5,
      navArrows: [
        { target: "zone_b", yaw: 90, pitch: -15, label: "Walk to Zone B (Digital Hub) →" },
        { target: "reception", yaw: 180, pitch: -12, label: "← Walk to Reception & Entry" }
      ]
    },
    zone_b: {
      name: "Zone B: Digital Laptop & Power Hub",
      tag: "Dual 230V Sockets • 300 Mbps Wi-Fi",
      desks: ["B-01", "B-02", "B-03", "B-04", "B-05", "B-06", "B-07", "B-08", "B-09", "B-10", "B-11", "B-12", "B-13", "B-14", "B-15", "B-16"],
      initialYaw: 90,
      initialPitch: -5,
      navArrows: [
        { target: "zone_a", yaw: 270, pitch: -15, label: "← Walk to Zone A (Silent)" },
        { target: "zone_c", yaw: 90, pitch: -15, label: "Walk to Zone C (Silent Pods) →" }
      ]
    },
    zone_c: {
      name: "Zone C: Executive Acoustic Silent Pods",
      tag: "Soundproof Glass • Lumbar Mesh Chairs",
      desks: ["C-01", "C-02", "C-03", "C-04", "C-05", "C-06", "C-07", "C-08", "C-09", "C-10", "C-11", "C-12", "C-13", "C-14", "C-15", "C-16"],
      initialYaw: 180,
      initialPitch: -5,
      navArrows: [
        { target: "zone_b", yaw: 270, pitch: -15, label: "← Walk to Zone B (Digital Hub)" },
        { target: "reception", yaw: 0, pitch: -12, label: "Walk to Reception & RO Water →" }
      ]
    },
    reception: {
      name: "Main Reception & Entry Sanctuary",
      tag: "Biometric Punch • RO Water Cooler • Help Desk",
      desks: [],
      initialYaw: 0,
      initialPitch: 0,
      navArrows: [
        { target: "zone_a", yaw: 0, pitch: -10, label: "Enter Zone A (Cubicles) →" },
        { target: "zone_c", yaw: 180, pitch: -10, label: "Enter Zone C (Pods) →" }
      ]
    }
  };

  // State
  let currentViewpoint = 'zone_a';
  let yaw = 0;       // Horizontal degrees [0..360]
  let pitch = -5;    // Vertical degrees [-80..80]
  let targetYaw = 0;
  let targetPitch = -5;
  let fov = 75;       // Field of view in degrees [40..95]
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let autoRotate = true;
  let nightMode = false;
  let selectedDesk = "B-04";

  // Occupied Desks Seed
  const occupiedDesks = new Set(["A-03", "A-07", "A-11", "A-14", "B-02", "B-06", "B-09", "B-12", "C-05", "C-08", "C-11", "C-15"]);

  let canvas, ctx, panoramaImages = {};

  // Build Procedural 360 Panorama Texture for each viewpoint
  function generatePanoramaTexture(vpKey, isNight) {
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 2048;
    pCanvas.height = 1024;
    const pCtx = pCanvas.getContext('2d');
    const w = pCanvas.width;
    const h = pCanvas.height;

    // Background Gradient (Ceiling, Walls, Floor)
    const ceilingColor = isNight ? '#030712' : '#0f172a';
    const wallColor = isNight ? '#0b1329' : '#1e293b';
    const floorColor = isNight ? '#111827' : '#1f2937';

    // Sky / Ceiling
    const ceilingGrad = pCtx.createLinearGradient(0, 0, 0, h * 0.45);
    ceilingGrad.addColorStop(0, ceilingColor);
    ceilingGrad.addColorStop(1, wallColor);
    pCtx.fillStyle = ceilingGrad;
    pCtx.fillRect(0, 0, w, h * 0.45);

    // Floor Carpet with acoustic wood texture
    const floorGrad = pCtx.createLinearGradient(0, h * 0.45, 0, h);
    floorGrad.addColorStop(0, wallColor);
    floorGrad.addColorStop(0.15, floorColor);
    floorGrad.addColorStop(1, isNight ? '#030712' : '#111827');
    pCtx.fillStyle = floorGrad;
    pCtx.fillRect(0, h * 0.45, w, h * 0.55);

    // Grid Perspective Floor Lines
    pCtx.strokeStyle = isNight ? 'rgba(56, 189, 248, 0.08)' : 'rgba(255, 255, 255, 0.06)';
    pCtx.lineWidth = 1.5;
    for (let x = 0; x < w; x += 64) {
      pCtx.beginPath();
      pCtx.moveTo(x, h * 0.45);
      pCtx.lineTo(x, h);
      pCtx.stroke();
    }
    for (let y = h * 0.45; y < h; y += 32) {
      pCtx.beginPath();
      pCtx.moveTo(0, y);
      pCtx.lineTo(w, y);
      pCtx.stroke();
    }

    // Ceiling Recessed Acoustic Spotlights & LED Track Lighting
    for (let x = 30; x < w; x += 120) {
      const lampGrad = pCtx.createRadialGradient(x, h * 0.22, 2, x, h * 0.22, 45);
      lampGrad.addColorStop(0, isNight ? 'rgba(251, 191, 36, 0.9)' : 'rgba(255, 255, 255, 0.95)');
      lampGrad.addColorStop(0.3, isNight ? 'rgba(245, 158, 11, 0.35)' : 'rgba(224, 242, 254, 0.4)');
      lampGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      pCtx.fillStyle = lampGrad;
      pCtx.beginPath();
      pCtx.arc(x, h * 0.22, 45, 0, Math.PI * 2);
      pCtx.fill();
    }

    // Modern Library Wall Signboards & LED Slogans
    pCtx.save();
    pCtx.fillStyle = isNight ? '#38bdf8' : '#60a5fa';
    pCtx.font = 'bold 22px system-ui, sans-serif';
    pCtx.textAlign = 'center';
    pCtx.shadowColor = isNight ? '#0284c7' : '#3b82f6';
    pCtx.shadowBlur = 12;

    pCtx.fillText('🏛️ C2S SILENT STUDY SANCTUARY • 24 HOURS • PATRAPADA', w * 0.25, h * 0.35);
    pCtx.fillText('⚡ HIGH-SPEED OPTICAL FIBER 5G • 100% DG POWER BACKUP', w * 0.75, h * 0.35);

    pCtx.fillStyle = '#f59e0b';
    pCtx.font = 'bold 15px system-ui, sans-serif';
    pCtx.fillText('ZONE A: SILENT CUBICLES | ZONE B: DIGITAL HUB | ZONE C: ACOUSTIC PODS', w * 0.5, h * 0.39);
    pCtx.restore();

    // Cubicle Partitions and Wooden Study Desks on Panorama
    pCtx.fillStyle = isNight ? 'rgba(30, 41, 59, 0.85)' : 'rgba(51, 65, 85, 0.9)';
    for (let i = 0; i < 16; i++) {
      const dx = (w / 16) * i + 15;
      const dy = h * 0.52 + (i % 2 === 0 ? 0 : 25);
      const dw = (w / 16) - 30;
      const dh = 110;

      // Desk Table Top
      pCtx.fillStyle = isNight ? '#1e293b' : '#334155';
      pCtx.fillRect(dx, dy, dw, dh);
      pCtx.strokeStyle = isNight ? '#0ea5e9' : '#94a3b8';
      pCtx.lineWidth = 1.5;
      pCtx.strokeRect(dx, dy, dw, dh);

      // Acoustic Divider Partition
      pCtx.fillStyle = isNight ? 'rgba(15, 23, 42, 0.95)' : 'rgba(71, 85, 105, 0.95)';
      pCtx.fillRect(dx + 5, dy - 45, dw - 10, 45);

      // Warm Desk Study Lamp Glow on each cubicle
      const deskLampGrad = pCtx.createRadialGradient(dx + dw / 2, dy - 20, 2, dx + dw / 2, dy - 20, 35);
      deskLampGrad.addColorStop(0, isNight ? 'rgba(253, 224, 71, 0.8)' : 'rgba(255, 255, 255, 0.7)');
      deskLampGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      pCtx.fillStyle = deskLampGrad;
      pCtx.beginPath();
      pCtx.arc(dx + dw / 2, dy - 20, 35, 0, Math.PI * 2);
      pCtx.fill();

      // Ergonomic Mesh Chair Outline
      pCtx.fillStyle = isNight ? '#0f172a' : '#1e293b';
      pCtx.fillRect(dx + dw * 0.3, dy + dh - 15, dw * 0.4, 30);
    }

    return pCanvas;
  }

  // Generate all panorama caches
  function ensurePanoramaCaches() {
    const key = currentViewpoint + '_' + (nightMode ? 'night' : 'day');
    if (!panoramaImages[key]) {
      panoramaImages[key] = generatePanoramaTexture(currentViewpoint, nightMode);
    }
    return panoramaImages[key];
  }

  // Convert Spherical Angles (yaw, pitch in degrees) to Screen Coordinates
  function sphericalToScreen(targetYaw, targetPitch, screenW, screenH) {
    // Relative yaw
    let diffYaw = (targetYaw - yaw) % 360;
    if (diffYaw < -180) diffYaw += 360;
    if (diffYaw > 180) diffYaw -= 360;

    // Check if within FOV (+/- half FOV)
    const hFov = fov * (screenW / screenH);
    if (Math.abs(diffYaw) > hFov * 0.75) return null; // Behind camera or out of view

    const diffPitch = targetPitch - pitch;
    if (Math.abs(diffPitch) > fov * 0.75) return null;

    const x = screenW / 2 + (diffYaw / (hFov / 2)) * (screenW / 2);
    const y = screenH / 2 - (diffPitch / (fov / 2)) * (screenH / 2);

    return { x, y };
  }

  // Render 360 Viewport
  function render360() {
    if (!canvas || !ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) return;

    // Smooth inertia interpolation
    yaw += (targetYaw - yaw) * 0.12;
    pitch += (targetPitch - pitch) * 0.12;
    if (yaw < 0) { yaw += 360; targetYaw += 360; }
    if (yaw >= 360) { yaw -= 360; targetYaw -= 360; }

    // Auto-rotate if enabled
    if (autoRotate && !isDragging) {
      targetYaw += 0.08;
    }

    const pano = ensurePanoramaCaches();
    const panoW = pano.width;
    const panoH = pano.height;

    // Clear Screen
    ctx.fillStyle = nightMode ? '#020617' : '#0f172a';
    ctx.fillRect(0, 0, w, h);

    // Draw Equirectangular Panorama Section with Yaw & Pitch Offset
    // Source X on pano: yaw / 360 * panoW
    const centerSourceX = (yaw / 360) * panoW;
    const sourceFovW = (fov / 180) * (panoW * (w / h) * 0.5);
    const sourceFovH = (fov / 180) * panoH;
    const centerSourceY = panoH / 2 - (pitch / 90) * (panoH * 0.35);

    // Draw spliced panorama seamlessly handling 360 wrap-around
    const sx1 = centerSourceX - sourceFovW / 2;
    const sy1 = centerSourceY - sourceFovH / 2;

    try {
      // Draw 2 slices to handle wrap-around effortlessly
      for (let offset of [-panoW, 0, panoW]) {
        const sliceX = sx1 - offset;
        ctx.drawImage(
          pano,
          Math.max(0, sliceX), Math.max(0, sy1),
          sourceFovW, sourceFovH,
          0, 0, w, h
        );
      }
    } catch (e) {}

    // Subtle Vignette and Room Lighting Effect
    const vigGrad = ctx.createRadialGradient(w / 2, h / 2, h * 0.35, w / 2, h / 2, h * 0.8);
    vigGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vigGrad.addColorStop(1, nightMode ? 'rgba(2, 6, 23, 0.75)' : 'rgba(15, 23, 42, 0.45)');
    ctx.fillStyle = vigGrad;
    ctx.fillRect(0, 0, w, h);

    // Render Hotspots for Desks in Active Viewpoint
    const vp = VIEWPOINTS[currentViewpoint];
    const desks = vp.desks || [];

    desks.forEach((deskId, idx) => {
      // Distribute desks in a semi-circle around the camera (-70 deg to +70 deg)
      const deskYaw = ((idx - 7.5) / 16) * 150 + vp.initialYaw;
      const deskPitch = -12 + (idx % 2 === 0 ? 0 : 4);

      const pt = sphericalToScreen(deskYaw, deskPitch, w, h);
      if (pt) {
        drawDeskHotspot(pt.x, pt.y, deskId);
      }
    });

    // Render Navigation Arrows ("Walk forward")
    (vp.navArrows || []).forEach(nav => {
      const pt = sphericalToScreen(nav.yaw, nav.pitch, w, h);
      if (pt) {
        drawNavigationArrow(pt.x, pt.y, nav);
      }
    });

    // Update Compass Indicator
    updateCompassUi(yaw);

    // Update Radar Minimap
    drawRadarMinimap(yaw);

    // Next frame
    requestAnimationFrame(render360);
  }

  // Draw Glowing Desk Hotspot Pin in 360 Space
  function drawDeskHotspot(x, y, deskId) {
    const isSelected = selectedDesk === deskId;
    const isOccupied = occupiedDesks.has(deskId);

    ctx.save();

    // Pulse Ring Animation
    const now = performance.now() * 0.003;
    const pulse = (Math.sin(now + parseInt(deskId.replace(/\D/g, ''))) + 1) * 0.5;

    ctx.beginPath();
    ctx.arc(x, y, 16 + pulse * 6, 0, Math.PI * 2);
    ctx.fillStyle = isSelected ? 'rgba(37, 99, 235, 0.25)' : (isOccupied ? 'rgba(148, 163, 184, 0.15)' : 'rgba(16, 185, 129, 0.25)');
    ctx.fill();

    // Solid Pin Body
    ctx.beginPath();
    ctx.arc(x, y, 14, 0, Math.PI * 2);
    ctx.fillStyle = isSelected ? '#1d4ed8' : (isOccupied ? '#64748b' : '#10b981');
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Pin Label (Desk ID)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(deskId, x, y);

    // Mini Status Pill below Pin
    const pillText = isSelected ? '★ SELECTED' : (isOccupied ? 'Occupied' : '🟢 VACANT');
    ctx.font = '750 9.5px system-ui, sans-serif';
    const textWidth = ctx.measureText(pillText).width;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.beginPath();
    ctx.roundRect(x - textWidth / 2 - 6, y + 18, textWidth + 12, 18, 5);
    ctx.fill();
    ctx.strokeStyle = isSelected ? '#3b82f6' : (isOccupied ? '#94a3b8' : '#34d399');
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = isSelected ? '#93c5fd' : (isOccupied ? '#cbd5e1' : '#a7f3d0');
    ctx.fillText(pillText, x, y + 27);

    ctx.restore();
  }

  // Draw 360 Floor Walk Navigation Arrow
  function drawNavigationArrow(x, y, nav) {
    ctx.save();
    const now = performance.now() * 0.004;
    const bounce = Math.sin(now) * 4;

    ctx.beginPath();
    ctx.arc(x, y + bounce, 20, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(234, 88, 12, 0.88)';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Chevron Icon
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(x - 6, y + bounce + 4);
    ctx.lineTo(x, y + bounce - 5);
    ctx.lineTo(x + 6, y + bounce + 4);
    ctx.stroke();

    // Floating Target Label
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    const tw = ctx.measureText(nav.label).width;
    ctx.beginPath();
    ctx.roundRect(x - tw / 2 - 8, y + bounce + 26, tw + 16, 20, 6);
    ctx.fill();
    ctx.fillStyle = '#fdba74';
    ctx.fillText(nav.label, x, y + bounce + 39);

    ctx.restore();
  }

  // Compass UI Rotation
  function updateCompassUi(currentYaw) {
    const needle = document.getElementById('c2sCompassNeedle');
    if (needle) {
      needle.style.transform = `rotate(${-currentYaw}deg)`;
    }
  }

  // Radar Minimap (Bottom-Right Corner with Real-Time Field of View Cone)
  function drawRadarMinimap(currentYaw) {
    const radar = document.getElementById('c2sRadarCanvas');
    if (!radar) return;
    const rCtx = radar.getContext('2d');
    const rw = radar.width;
    const rh = radar.height;
    const cx = rw / 2;
    const cy = rh / 2;
    const radius = rw * 0.44;

    rCtx.clearRect(0, 0, rw, rh);

    // Radar Background Circle
    rCtx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    rCtx.beginPath();
    rCtx.arc(cx, cy, radius, 0, Math.PI * 2);
    rCtx.fill();
    rCtx.strokeStyle = '#334155';
    rCtx.lineWidth = 1.5;
    rCtx.stroke();

    // Concentric Rings
    rCtx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
    rCtx.beginPath();
    rCtx.arc(cx, cy, radius * 0.5, 0, Math.PI * 2);
    rCtx.stroke();

    // 4 Zone Indicators
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

      rCtx.fillStyle = z.active ? z.color : 'rgba(255,255,255,0.4)';
      rCtx.beginPath();
      rCtx.arc(zx, zy, z.active ? 6 : 4, 0, Math.PI * 2);
      rCtx.fill();

      rCtx.font = 'bold 9px system-ui, sans-serif';
      rCtx.fillStyle = z.active ? '#ffffff' : '#94a3b8';
      rCtx.textAlign = 'center';
      rCtx.textBaseline = 'middle';
      rCtx.fillText(z.name, zx, zy);
    });

    // Dynamic FOV Viewing Cone (Points in direction camera is facing)
    const radYaw = (currentYaw - 90) * (Math.PI / 180);
    const halfFovRad = (fov / 2) * (Math.PI / 180);

    rCtx.save();
    rCtx.beginPath();
    rCtx.moveTo(cx, cy);
    rCtx.arc(cx, cy, radius * 0.95, radYaw - halfFovRad, radYaw + halfFovRad);
    rCtx.closePath();

    const coneGrad = rCtx.createRadialGradient(cx, cy, 2, cx, cy, radius);
    coneGrad.addColorStop(0, 'rgba(56, 189, 248, 0.7)');
    coneGrad.addColorStop(1, 'rgba(14, 165, 233, 0.05)');
    rCtx.fillStyle = coneGrad;
    rCtx.fill();
    rCtx.restore();

    // Center Camera Dot
    rCtx.fillStyle = '#ffffff';
    rCtx.beginPath();
    rCtx.arc(cx, cy, 3.5, 0, Math.PI * 2);
    rCtx.fill();
  }

  // Pointer Event Handlers for 360 Drag & Look Around
  function setupPointerEvents() {
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
      targetPitch = Math.max(-65, Math.min(65, targetPitch));
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        canvas.style.cursor = 'grab';
      }
    });

    // Touch Support for Mobile Drag
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
      targetPitch = Math.max(-65, Math.min(65, targetPitch));
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Mouse Wheel Zoom (FOV)
    canvas.addEventListener('wheel', e => {
      e.preventDefault();
      fov += e.deltaY * 0.05;
      fov = Math.max(45, Math.min(95, fov));
    }, { passive: false });

    // Click Detection on Desks or Navigation Arrows
    canvas.addEventListener('click', e => {
      const rect = canvas.getBoundingClientRect();
      const clickX = (e.clientX - rect.left) * (canvas.width / rect.width);
      const clickY = (e.clientY - rect.top) * (canvas.height / rect.height);

      check360Click(clickX, clickY);
    });
  }

  // Check if user clicked a desk hotspot or nav arrow
  function check360Click(clickX, clickY) {
    const vp = VIEWPOINTS[currentViewpoint];
    const w = canvas.width;
    const h = canvas.height;

    // 1. Check Navigation Arrows
    for (const nav of (vp.navArrows || [])) {
      const pt = sphericalToScreen(nav.yaw, nav.pitch, w, h);
      if (pt) {
        const dist = Math.hypot(clickX - pt.x, clickY - pt.y);
        if (dist <= 28) {
          switch360Viewpoint(nav.target);
          return;
        }
      }
    }

    // 2. Check Desk Hotspots
    for (let idx = 0; idx < (vp.desks || []).length; idx++) {
      const deskId = vp.desks[idx];
      const deskYaw = ((idx - 7.5) / 16) * 150 + vp.initialYaw;
      const deskPitch = -12 + (idx % 2 === 0 ? 0 : 4);

      const pt = sphericalToScreen(deskYaw, deskPitch, w, h);
      if (pt) {
        const dist = Math.hypot(clickX - pt.x, clickY - pt.y);
        if (dist <= 22) {
          onSelect360Desk(deskId);
          return;
        }
      }
    }
  }

  // Viewpoint Switcher (Smooth transition)
  window.switch360Viewpoint = function(vpKey) {
    if (!VIEWPOINTS[vpKey]) return;
    currentViewpoint = vpKey;
    const vp = VIEWPOINTS[vpKey];
    targetYaw = vp.initialYaw;
    targetPitch = vp.initialPitch;

    // Update Viewpoint Selector UI
    document.querySelectorAll('.c2s-360-vp-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.vp === vpKey);
    });

    const titleEl = document.getElementById('c2s360VpTitle');
    if (titleEl) titleEl.textContent = vp.name;
    const tagEl = document.getElementById('c2s360VpTag');
    if (tagEl) tagEl.textContent = vp.tag;
  };

  // Select Desk from 360 Tour
  window.onSelect360Desk = function(deskId) {
    selectedDesk = deskId;
    const isOcc = occupiedDesks.has(deskId);

    const hudDeskName = document.getElementById('hudDeskName');
    const hudZoneName = document.getElementById('hudZoneName');
    const hudStatus = document.getElementById('hudDeskStatus');
    const hudCta = document.getElementById('hudBookCta');

    if (hudDeskName) hudDeskName.textContent = `Desk ${deskId}`;
    if (hudZoneName) {
      const zoneLetter = deskId.charAt(0);
      hudZoneName.textContent = zoneLetter === 'A' ? 'Zone A • Silent Cubicle' : (zoneLetter === 'B' ? 'Zone B • Digital Power Hub' : 'Zone C • Silent Pod');
    }

    if (hudStatus) {
      hudStatus.innerHTML = isOcc ?
        `<span style="color:#ef4444;font-weight:800;">🔴 Occupied by Aspirant</span>` :
        `<span style="color:#10b981;font-weight:800;">🟢 Vacant & Available</span>`;
    }

    if (hudCta) {
      if (isOcc) {
        hudCta.disabled = true;
        hudCta.textContent = "Seat Already Occupied";
        hudCta.style.background = "#64748b";
        hudCta.style.cursor = "not-allowed";
      } else {
        hudCta.disabled = false;
        hudCta.textContent = `Reserve Desk ${deskId} Online →`;
        hudCta.style.background = "#ea580c";
        hudCta.style.cursor = "pointer";
        hudCta.onclick = function() {
          window.location.href = `admission.html?seat=${deskId}&shift=Afternoon`;
        };
      }
    }

    // Floating Toast Alert
    if (typeof window.showToast === 'function') {
      window.showToast(`Selected Desk ${deskId} in 360 Tour!`, 'info');
    }
  };

  // Toggle Auto-Rotate
  window.toggle360AutoRotate = function() {
    autoRotate = !autoRotate;
    const btn = document.getElementById('btn360AutoRotate');
    if (btn) {
      btn.innerHTML = autoRotate ? '⏸ Pause Spin' : '🔄 Auto Spin';
      btn.classList.toggle('active', autoRotate);
    }
  };

  // Zoom In / Out
  window.zoom360 = function(delta) {
    fov += delta;
    fov = Math.max(45, Math.min(95, fov));
  };

  // Reset 360 Camera Pitch/Yaw to Front
  window.reset360Camera = function() {
    const vp = VIEWPOINTS[currentViewpoint];
    targetYaw = vp.initialYaw;
    targetPitch = vp.initialPitch;
    fov = 75;
  };

  // Toggle Day / Night Study Lamp Lighting
  window.toggle360Ambiance = function() {
    nightMode = !nightMode;
    const btn = document.getElementById('btn360Ambiance');
    if (btn) {
      btn.innerHTML = nightMode ? '☀️ Daylight Mode' : '🌙 Night Lamp Mode';
    }
    // Invalidate pano cache to re-render lighting
    panoramaImages = {};
  };

  // Fullscreen 360 Experience
  window.toggle360Fullscreen = function() {
    const container = document.getElementById('c2s360Container');
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Resize Canvas to Match Retina Displays
  function resizeCanvas() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
  }

  // Initialize 360 Tour on DOM Ready
  function init360Tour() {
    canvas = document.getElementById('c2s360Canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    setupPointerEvents();
    render360();

    console.log('✓ C2S 360° Google Street View Sanctuary Engine Initialized');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init360Tour);
  } else {
    init360Tour();
  }

})();
