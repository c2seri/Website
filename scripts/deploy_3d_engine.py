# -*- coding: utf-8 -*-
"""
Generate high-end, clean 3D Virtual Tour Engine for C2S Library
Eliminates artificial fake dark boxes and provides true photographic 360 panorama,
spaced-out 3D beacon hotspots, floating glassmorphism detail cards, and smooth navigation.
"""

code = r'''/* ==========================================================================
   C2S 24-HOUR PREMIUM STUDY LIBRARY — 3D VIRTUAL TOUR & STREET VIEW ENGINE
   Matterport & Google Street View Style High-Performance 360 Panorama Tour
   ========================================================================== */

(function() {
  'use strict';

  // 5 Authentic Viewpoints with Dedicated High-Resolution Campus Photos
  const VIEWPOINTS = {
    zone_a: {
      name: "Upper Floor (2nd Floor) • Zone A: Executive Sanctuary",
      tag: "24 Seats (S-1 to S-24) • Attached Lockers L-1 to L-24 • 5G Ultra Wi-Fi",
      imageSrc: "/images/hero-library-desktop.jpg",
      initialYaw: 20,
      initialPitch: -3,
      hotspots: [
        { deskId: "S-2", yaw: -48, pitch: -8 },
        { deskId: "S-6", yaw: -24, pitch: -6 },
        { deskId: "S-10", yaw: 0, pitch: -5 },
        { deskId: "S-12", yaw: 24, pitch: -6 },
        { deskId: "S-16", yaw: 48, pitch: -8 },
        { deskId: "S-20", yaw: 76, pitch: -10 }
      ],
      navArrows: [
        { target: "zone_b", yaw: 110, pitch: -16, label: "🚶 Step to 1st Floor (Zone B) →" },
        { target: "reception", yaw: -140, pitch: -15, label: "← Walk to Reception & Entry" }
      ]
    },
    zone_b: {
      name: "Lower Floor (1st Floor) • Zone B: Left Wall Bay",
      tag: "43 Seats (S-25 to S-67) • Split Inverter A/C • Lockers L-25 to L-67",
      imageSrc: "/images/library/c2s-library-aisle-hall.jpg",
      initialYaw: 90,
      initialPitch: -3,
      hotspots: [
        { deskId: "S-28", yaw: 50, pitch: -9 },
        { deskId: "S-35", yaw: 72, pitch: -7 },
        { deskId: "S-42", yaw: 90, pitch: -6 },
        { deskId: "S-50", yaw: 112, pitch: -7 },
        { deskId: "S-58", yaw: 135, pitch: -9 }
      ],
      navArrows: [
        { target: "zone_a", yaw: 240, pitch: -15, label: "← Take Stairs to 2nd Floor (Zone A)" },
        { target: "zone_c", yaw: 85, pitch: -16, label: "Walk to Zone C (Center Sanctuary) →" }
      ]
    },
    zone_c: {
      name: "Lower Floor (1st Floor) • Zone C: Center Dual-Row Sanctuary",
      tag: "42 Seats (S-68 to S-109) • Dual Corridor Aisle • Lockers L-68 to L-109",
      imageSrc: "/images/library/c2s-library-hall-panoramic.jpg",
      initialYaw: 0,
      initialPitch: -2,
      hotspots: [
        { deskId: "S-70", yaw: -42, pitch: -8 },
        { deskId: "S-78", yaw: -20, pitch: -6 },
        { deskId: "S-85", yaw: 0, pitch: -5 },
        { deskId: "S-94", yaw: 22, pitch: -6 },
        { deskId: "S-102", yaw: 46, pitch: -8 }
      ],
      navArrows: [
        { target: "zone_b", yaw: -110, pitch: -15, label: "← Walk to Zone B (Left Bay)" },
        { target: "zone_d", yaw: 95, pitch: -16, label: "Walk to Zone D (Right Bay) →" }
      ]
    },
    zone_d: {
      name: "Lower Floor (1st Floor) • Zone D: Right Wall Bay & Reception",
      tag: "40 Seats (S-110 to S-149) • Direct Access to Lockers L-110 to L-149",
      imageSrc: "/images/library/c2s-library-study-cabins.jpg",
      initialYaw: 90,
      initialPitch: -2,
      hotspots: [
        { deskId: "S-114", yaw: 55, pitch: -8 },
        { deskId: "S-122", yaw: 78, pitch: -7 },
        { deskId: "S-130", yaw: 95, pitch: -6 },
        { deskId: "S-138", yaw: 118, pitch: -7 },
        { deskId: "S-145", yaw: 140, pitch: -9 }
      ],
      navArrows: [
        { target: "zone_c", yaw: -90, pitch: -15, label: "← Walk to Zone C (Center)" },
        { target: "reception", yaw: 0, pitch: -12, label: "Walk to Reception & RO Water →" }
      ]
    },
    reception: {
      name: "Main Reception & Entry Sanctuary (1st Floor)",
      tag: "Biometric Punch • RO Hot/Cold Water • Help Desk (9777481909)",
      imageSrc: "/images/library/c2s-library-grand-entrance.jpg",
      initialYaw: 0,
      initialPitch: 0,
      hotspots: [],
      navArrows: [
        { target: "zone_b", yaw: 45, pitch: -10, label: "Enter Zone B & C (1st Floor) →" },
        { target: "zone_a", yaw: -45, pitch: -10, label: "Take Stairs to 2nd Floor (Zone A) →" }
      ]
    }
  };

  // State
  let currentViewpoint = 'zone_a';
  let yaw = 20;       // Horizontal rotation in degrees [0..360]
  let pitch = -3;     // Vertical tilt in degrees [-60..60]
  let targetYaw = 20;
  let targetPitch = -3;
  let fov = 75;        // Field of view in degrees [45..95]
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let autoRotate = true;
  let nightMode = false;
  let selectedDesk = "S-12";
  let hoveredDesk = null;
  let hoveredNav = null;

  // Pre-seeded occupied desks matching student register
  const occupiedDesks = new Set(["S-05", "S-14", "S-25", "S-36", "S-70", "S-85", "S-112", "S-135"]);

  let canvas, ctx;
  const imageCache = {};

  // Preload all 5 Authentic Campus Photographs
  function preloadAllPhotographs() {
    Object.keys(VIEWPOINTS).forEach(key => {
      const vp = VIEWPOINTS[key];
      const img = new Image();
      img.onload = function() {
        imageCache[key] = img;
      };
      img.onerror = function() {
        // Fallback to hero image if relative path issue
        if (!img._retried) {
          img._retried = true;
          img.src = '/images/hero-library-desktop.jpg';
        }
      };
      img.src = vp.imageSrc;
    });
  }

  // Helper for drawing smooth rounded rectangles
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

  // Convert 3D Spherical Coordinates (yaw, pitch) to 2D Screen Space
  function sphericalToScreen(targetYawDeg, targetPitchDeg, screenW, screenH) {
    let deltaYaw = targetYawDeg - yaw;
    while (deltaYaw > 180) deltaYaw -= 360;
    while (deltaYaw < -180) deltaYaw += 360;

    const deltaPitch = targetPitchDeg - pitch;
    const halfFovX = fov / 2;
    const halfFovY = (fov * (screenH / screenW)) / 2;

    if (Math.abs(deltaYaw) > halfFovX * 1.3 || Math.abs(deltaPitch) > halfFovY * 1.4) {
      return null;
    }

    const screenX = (screenW / 2) + (deltaYaw / halfFovX) * (screenW / 2);
    const screenY = (screenH / 2) - (deltaPitch / halfFovY) * (screenH / 2);

    return { x: screenX, y: screenY };
  }

  // Main 3D Animation & Render Loop
  function render() {
    requestAnimationFrame(render);
    if (!canvas || !ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) return;

    try {
      // Smooth camera interpolation
      yaw += (targetYaw - yaw) * 0.12;
      pitch += (targetPitch - pitch) * 0.12;
      if (yaw < 0) { yaw += 360; targetYaw += 360; }
      if (yaw >= 360) { yaw -= 360; targetYaw -= 360; }

      // Slow cinematic auto-rotation when user is not dragging
      if (autoRotate && !isDragging) {
        targetYaw += 0.06;
      }

      // 1. Clear Viewport
      ctx.clearRect(0, 0, w, h);

      // 2. Seamless 360 High-Res Photographic Panorama Projection
      const currentImg = imageCache[currentViewpoint] || imageCache['zone_a'];
      if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
        const fullWidth = (360 / fov) * w;
        const fullHeight = (180 / fov) * h;
        const startX = (w / 2) - (yaw / 360) * fullWidth;
        const startY = (h / 2) - (fullHeight / 2) + (pitch / 90) * (fullHeight * 0.45);

        const firstTile = Math.floor((0 - startX) / fullWidth);
        for (let i = firstTile - 1; i <= firstTile + 2; i++) {
          const tileX = startX + i * fullWidth;
          if (tileX + fullWidth > 0 && tileX < w) {
            ctx.drawImage(currentImg, tileX, startY, fullWidth, fullHeight);
          }
        }
      } else {
        // High-end fallback ambient gradient while image loads
        const ambientGrad = ctx.createLinearGradient(0, 0, 0, h);
        ambientGrad.addColorStop(0, '#0a192f');
        ambientGrad.addColorStop(0.5, '#1e293b');
        ambientGrad.addColorStop(1, '#0f172a');
        ctx.fillStyle = ambientGrad;
        ctx.fillRect(0, 0, w, h);
      }

      // 3. Cinematic Vignette (Subtle Day Depth / Cozy Night Lamp Ambiance)
      const vigGrad = ctx.createRadialGradient(w / 2, h / 2, h * 0.25, w / 2, h / 2, h * 0.85);
      vigGrad.addColorStop(0, nightMode ? 'rgba(251, 191, 36, 0.08)' : 'rgba(0, 0, 0, 0)');
      vigGrad.addColorStop(1, nightMode ? 'rgba(2, 6, 23, 0.65)' : 'rgba(15, 23, 42, 0.35)');
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, w, h);

      // 4. Render Spatial 3D Desk Beacon Hotspots
      const vp = VIEWPOINTS[currentViewpoint] || VIEWPOINTS.zone_a;
      const hotspots = vp.hotspots || [];

      hotspots.forEach(hp => {
        try {
          const pt = sphericalToScreen(hp.yaw, hp.pitch, w, h);
          if (pt) {
            draw3DBeaconHotspot(pt.x, pt.y, hp.deskId);
          }
        } catch (e) {}
      });

      // 5. Render Floating Detail Card if a Desk is Hovered or Active
      if (hoveredDesk || selectedDesk) {
        const activeId = hoveredDesk || selectedDesk;
        const activeHp = hotspots.find(h => h.deskId === activeId);
        if (activeHp) {
          const pt = sphericalToScreen(activeHp.yaw, activeHp.pitch, w, h);
          if (pt) {
            drawFloatingGlassCard(pt.x, pt.y, activeId);
          }
        }
      }

      // 6. Render Floor Navigation Chevrons (Google Street View Walking Arrows)
      (vp.navArrows || []).forEach(nav => {
        try {
          const pt = sphericalToScreen(nav.yaw, nav.pitch, w, h);
          if (pt) {
            drawNavigationChevron(pt.x, pt.y, nav);
          }
        } catch (ne) {}
      });

      // 7. Synchronize Compass Needle
      try {
        updateCompassUi(yaw);
      } catch (ce) {}

      // 8. Synchronize Real-Time Radar Minimap
      try {
        drawRadarMinimap(yaw);
      } catch (re) {}

    } catch (err) {
      console.warn("3D Render loop exception:", err);
    }
  }

  // Draw 3D Beacon Hotspot (Clean, Small, Elegant Circular Beacon)
  function draw3DBeaconHotspot(x, y, deskId) {
    const isSelected = selectedDesk === deskId;
    const isHovered = hoveredDesk === deskId;
    const isOccupied = occupiedDesks.has(deskId);

    ctx.save();

    // Animated Subtle Ripple Pulse
    const now = performance.now() * 0.003;
    const pulse = (Math.sin(now + parseInt(deskId.replace(/\D/g, '') || 1)) + 1) * 0.5;

    // Outer Aura Ring
    ctx.beginPath();
    ctx.arc(x, y, 14 + pulse * 5, 0, Math.PI * 2);
    ctx.fillStyle = isSelected 
      ? 'rgba(59, 130, 246, 0.35)' 
      : (isOccupied ? 'rgba(148, 163, 184, 0.18)' : 'rgba(16, 185, 129, 0.30)');
    ctx.fill();

    // Beacon Core Button
    const baseRadius = isHovered ? 14 : 12;
    ctx.beginPath();
    ctx.arc(x, y, baseRadius, 0, Math.PI * 2);
    ctx.fillStyle = isSelected ? '#2563eb' : (isOccupied ? '#64748b' : '#10b981');
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.2;
    ctx.stroke();

    // Center Indicator Dot
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Subtle Pill Tag below beacon
    ctx.font = 'bold 9.5px system-ui, -apple-system, sans-serif';
    const tagText = deskId;
    const tagW = ctx.measureText(tagText).width + 10;
    const tagH = 16;
    const tagX = x - tagW / 2;
    const tagY = y + 14;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.strokeStyle = isSelected ? '#3b82f6' : (isOccupied ? '#475569' : '#10b981');
    ctx.lineWidth = 1;
    ctx.beginPath();
    drawSafeRoundRect(ctx, tagX, tagY, tagW, tagH, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(tagText, x, tagY + 8);

    ctx.restore();
  }

  // Draw Floating Glassmorphism Detail Card on Hover / Active Selection
  function drawFloatingGlassCard(x, y, deskId) {
    const isOccupied = occupiedDesks.has(deskId);
    const cardW = 186;
    const cardH = 68;
    const cardX = x - cardW / 2;
    const cardY = y - cardH - 18;

    ctx.save();

    // Connecting Pin Stem
    ctx.strokeStyle = isOccupied ? '#94a3b8' : '#10b981';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 2]);
    ctx.beginPath();
    ctx.moveTo(x, y - 10);
    ctx.lineTo(x, cardY + cardH);
    ctx.stroke();
    ctx.setLineDash([]);

    // Card Glass Background
    ctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
    ctx.strokeStyle = isOccupied ? '#475569' : '#10b981';
    ctx.lineWidth = 1.5;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 12;

    ctx.beginPath();
    drawSafeRoundRect(ctx, cardX, cardY, cardW, cardH, 8);
    ctx.fill();
    ctx.stroke();

    // Header: Desk Number + Status Pill
    ctx.shadowColor = 'transparent';
    ctx.font = 'bold 12px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`💺 Seat ${deskId}`, cardX + 10, cardY + 10);

    // Status Badge
    const statusText = isOccupied ? 'Occupied' : '🟢 Free';
    ctx.font = 'bold 9.5px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = isOccupied ? '#94a3b8' : '#34d399';
    ctx.textAlign = 'right';
    ctx.fillText(statusText, cardX + cardW - 10, cardY + 12);

    // Specs Row
    ctx.font = '600 9.5px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'left';
    ctx.fillText(`⚡ Locker #${deskId.replace(/\D/g, '')} • 230V Socket & Lamp`, cardX + 10, cardY + 28);

    // Action CTA Row
    ctx.font = 'bold 10px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = isOccupied ? '#ef4444' : '#38bdf8';
    ctx.fillText(isOccupied ? 'Reserved by Aspirant' : '₹1000/mo • Click to Reserve →', cardX + 10, cardY + 46);

    ctx.restore();
  }

  // Draw Google Street View Navigation Chevron (Floor Direction Arrow)
  function drawNavigationChevron(x, y, nav) {
    ctx.save();

    const now = performance.now() * 0.003;
    const bounce = Math.sin(now) * 3;

    // Outer Circle Ring
    ctx.beginPath();
    ctx.arc(x, y + bounce, 16, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(234, 88, 12, 0.92)';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.2;
    ctx.stroke();

    // Chevron Arrow Icon
    ctx.beginPath();
    ctx.moveTo(x - 5, y + bounce + 5);
    ctx.lineTo(x, y + bounce - 5);
    ctx.lineTo(x + 5, y + bounce + 5);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Navigation Text Label Pill
    ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
    const textW = (ctx.measureText ? ctx.measureText(nav.label).width : 90) + 18;
    const pillX = x - textW / 2;
    const pillY = y + bounce + 22;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = 1.2;
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

  // Compass UI update
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
      const rect = canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
      const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);

      if (isDragging) {
        const dx = e.clientX - lastMouseX;
        const dy = e.clientY - lastMouseY;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;

        targetYaw -= dx * 0.35;
        targetPitch += dy * 0.25;
        targetPitch = Math.max(-55, Math.min(55, targetPitch));
      } else {
        // Detect Hover on Hotspots or Navigation Arrows
        checkHover(mouseX, mouseY);
      }
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

  // Detect Hover on Hotspots & Nav Arrows
  function checkHover(mouseX, mouseY) {
    const vp = VIEWPOINTS[currentViewpoint] || VIEWPOINTS.zone_a;
    const w = canvas.width;
    const h = canvas.height;
    let found = false;

    // Check nav arrows
    for (const nav of (vp.navArrows || [])) {
      const pt = sphericalToScreen(nav.yaw, nav.pitch, w, h);
      if (pt) {
        const dist = Math.hypot(mouseX - pt.x, mouseY - pt.y);
        if (dist <= 26) {
          canvas.style.cursor = 'pointer';
          hoveredNav = nav;
          found = true;
          break;
        }
      }
    }

    if (!found) hoveredNav = null;

    // Check desk beacons
    let foundDesk = null;
    for (const hp of (vp.hotspots || [])) {
      const pt = sphericalToScreen(hp.yaw, hp.pitch, w, h);
      if (pt) {
        const dist = Math.hypot(mouseX - pt.x, mouseY - pt.y);
        if (dist <= 22) {
          foundDesk = hp.deskId;
          break;
        }
      }
    }

    hoveredDesk = foundDesk;
    if (foundDesk || hoveredNav) {
      canvas.style.cursor = 'pointer';
    } else if (!isDragging) {
      canvas.style.cursor = 'grab';
    }
  }

  // Handle Clicks in 360 Space
  function check360Click(clickX, clickY) {
    const vp = VIEWPOINTS[currentViewpoint] || VIEWPOINTS.zone_a;
    const w = canvas.width;
    const h = canvas.height;

    // 1. Navigation Arrows Click
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

    // 2. Desk Hotspots Click
    for (const hp of (vp.hotspots || [])) {
      const pt = sphericalToScreen(hp.yaw, hp.pitch, w, h);
      if (pt) {
        const dist = Math.hypot(clickX - pt.x, clickY - pt.y);
        if (dist <= 26) {
          onSelect360Desk(hp.deskId);
          return;
        }
      }
    }
  }

  // Switch Viewpoint (Zone A, B, C, D, Reception)
  window.switch360Viewpoint = function(vpKey) {
    if (!VIEWPOINTS[vpKey]) return;
    currentViewpoint = vpKey;
    const vp = VIEWPOINTS[vpKey];
    targetYaw = vp.initialYaw;
    targetPitch = vp.initialPitch;

    // Update buttons in Viewpoint Bar
    document.querySelectorAll('.c2s-360-vp-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.vp === vpKey);
      if (b.dataset.vp === vpKey) {
        b.style.borderColor = '#2563eb';
        b.style.background = '#eff6ff';
        b.style.color = '#1d4ed8';
      } else {
        b.style.borderColor = '#cbd5e1';
        b.style.background = '#ffffff';
        b.style.color = '#0f2a5c';
      }
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
          window.location.href = `admission.html?desk=${encodeURIComponent(deskId)}&shift=FullDay`;
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

  // Toggle Ambiance (Day / Night Lamp Mode)
  window.toggle360Ambiance = function() {
    nightMode = !nightMode;
    const btn = document.getElementById('btn360Ambiance');
    if (btn) {
      btn.style.background = nightMode ? '#d97706' : 'rgba(15,23,42,0.85)';
      btn.innerHTML = nightMode ? '💡 Day Mode' : '🌙 Night Lamp Mode';
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

  // Fullscreen 360 Toggle
  window.toggle360Fullscreen = function() {
    const container = document.getElementById('c2s360Container');
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Canvas Resize Handler
  function resizeCanvas() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
  }

  // Initialization
  function init() {
    canvas = document.getElementById('c2s360Canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    if (!ctx) return;

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    preloadAllPhotographs();
    setupPointerEvents();
    render();

    // Default select initial desk
    onSelect360Desk("S-12");
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
'''

# Write to both files
with open('library/library-360.js', 'w', encoding='utf-8') as f:
    f.write(code)

with open('library-360.js', 'w', encoding='utf-8') as f:
    f.write(code)

print('Successfully generated and updated 3D virtual tour engine in both files!')
