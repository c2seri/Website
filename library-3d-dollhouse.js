/* ==========================================================================
   C2S 24-HOUR PREMIUM STUDY LIBRARY — 3D ARCHITECTURAL FLOOR MODEL
   Interactive Isometric 3D Cutaway Dollhouse Engine (Three.js)
   Replaces panoramic sphere with authentic, clean 3D physical floor layout.
   ========================================================================== */

(function() {
  'use strict';

  let scene, camera, renderer;
  let floor1Group, floor2Group, buildingGroup;
  let animFrameId = null;
  let isAutoSpinning = true;
  let isNightMode = false;
  let currentFloor = 1; // 1 = Floor 1, 2 = Floor 2, 'both' = Both
  let canvas, container;

  // Interaction & Raycasting
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let interactiveObjects = [];
  let hoveredObject = null;
  let tooltipEl = null;

  // Orbit Camera State
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let cameraTheta = Math.PI / 4;      // Azimuth angle
  let cameraPhi = Math.PI / 3.4;      // Polar angle (elevation)
  let cameraRadius = 68;              // Distance from target
  const cameraTarget = new THREE.Vector3(0, 2, 0);

  // Materials Cache
  let mats = {};

  function init3DDollhouse() {
    container = document.getElementById('c2s360Container');
    canvas = document.getElementById('c2s360Canvas');
    if (!container || !canvas || typeof THREE === 'undefined') return;

    // Remove any previous tooltips or UI
    const oldTip = document.getElementById('c2sDollhouseTooltip');
    if (oldTip) oldTip.remove();

    // Create Floating Glass Tooltip
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'c2sDollhouseTooltip';
    tooltipEl.style.cssText = 'position:absolute;display:none;z-index:30;background:rgba(15,23,42,0.92);backdrop-filter:blur(10px);border:1.5px solid rgba(56,189,248,0.5);border-radius:12px;padding:12px 16px;color:#f8fafc;pointer-events:auto;box-shadow:0 12px 30px rgba(0,0,0,0.6);font-family:inherit;min-width:200px;transition:opacity 0.15s ease;';
    container.appendChild(tooltipEl);

    // Setup Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a1128);
    scene.fog = new THREE.FogExp2(0x0a1128, 0.007);

    // Setup Camera
    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(40, aspect, 0.5, 500);
    updateCameraPosition();

    // Setup Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    if (renderer.outputEncoding !== undefined) {
      renderer.outputEncoding = THREE.sRGBEncoding;
    }

    initMaterials();
    initLighting();
    buildGroundPedestal();
    buildFloor1();
    buildFloor2();
    buildAmenities();

    // Build Floating Zone Beacons
    buildZoneBeacons();

    // Add HUD Overlay Controls
    setupDollhouseHUD();

    // Event Listeners
    setupControls();

    // Start Render Loop
    if (animFrameId) cancelAnimationFrame(animFrameId);
    animate();

    // Initial Floor 1 View
    setFloorView(1);
  }

  function initMaterials() {
    mats.floorTile = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.6,
      metalness: 0.2
    });

    mats.floorTileL2 = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.5,
      metalness: 0.3
    });

    mats.aislePath = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.4,
      metalness: 0.3
    });

    mats.pedestal = new THREE.MeshStandardMaterial({
      color: 0x020617,
      roughness: 0.9,
      metalness: 0.1
    });

    mats.glassWall = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.7,
      ior: 1.5
    });

    mats.woodDesk = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.45,
      metalness: 0.05
    });

    mats.execDesk = new THREE.MeshStandardMaterial({
      color: 0x92400e,
      roughness: 0.35,
      metalness: 0.1
    });

    mats.partition = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.7,
      metalness: 0.1
    });

    mats.chair = new THREE.MeshStandardMaterial({
      color: 0x020617,
      roughness: 0.5,
      metalness: 0.4
    });

    mats.lampStem = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.8,
      roughness: 0.2
    });

    mats.lampBulbDay = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xfbbf24,
      emissiveIntensity: 0.6
    });

    mats.lampBulbNight = new THREE.MeshStandardMaterial({
      color: 0xffedd5,
      emissive: 0xf97316,
      emissiveIntensity: 2.2
    });

    mats.acUnit = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.3,
      metalness: 0.2
    });

    mats.acGlow = new THREE.MeshBasicMaterial({
      color: 0x38bdf8
    });

    mats.plantPot = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.8
    });

    mats.plantLeaves = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.6
    });

    mats.reception = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      roughness: 0.3,
      metalness: 0.3
    });
  }

  let hemiLight, dirLight, ambientLampLights = [];

  function initLighting() {
    hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x0f172a, 0.7);
    scene.add(hemiLight);

    dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(30, 45, 25);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 120;
    const d = 35;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.bias = -0.001;
    scene.add(dirLight);

    // Subtle blue architectural accent point light
    const bluePoint = new THREE.PointLight(0x38bdf8, 0.8, 80);
    bluePoint.position.set(-15, 12, -10);
    scene.add(bluePoint);
  }

  function buildGroundPedestal() {
    buildingGroup = new THREE.Group();
    scene.add(buildingGroup);

    // Architectural Ground Slab
    const slabGeo = new THREE.BoxGeometry(46, 2, 28);
    const slab = new THREE.Mesh(slabGeo, mats.pedestal);
    slab.position.y = -1;
    slab.receiveShadow = true;
    buildingGroup.add(slab);

    // Grid line accents on pedestal perimeter
    const grid = new THREE.GridHelper(44, 22, 0x1e293b, 0x0f172a);
    grid.position.y = 0.02;
    buildingGroup.add(grid);
  }

  function buildFloor1() {
    floor1Group = new THREE.Group();
    buildingGroup.add(floor1Group);

    // Main Floor Slab (38m x 22m)
    const floorGeo = new THREE.BoxGeometry(40, 0.6, 24);
    const floorMesh = new THREE.Mesh(floorGeo, mats.floorTile);
    floorMesh.position.y = 0.3;
    floorMesh.receiveShadow = true;
    floor1Group.add(floorMesh);

    // Central Walking Aisle Carpeting (Dual Corridors)
    const aisleGeo = new THREE.BoxGeometry(38, 0.05, 2.4);
    const aisle1 = new THREE.Mesh(aisleGeo, mats.aislePath);
    aisle1.position.set(0, 0.63, -3.2);
    aisle1.receiveShadow = true;
    floor1Group.add(aisle1);

    const aisle2 = new THREE.Mesh(aisleGeo, mats.aislePath);
    aisle2.position.set(0, 0.63, 3.2);
    aisle2.receiveShadow = true;
    floor1Group.add(aisle2);

    // Exterior Glass Perimeter Half-Walls (Modern Architectural Look)
    buildPerimeterWalls(floor1Group, 40, 24, 0.6, 2.4);

    // -------------------------------------------------------------
    // ZONE B: Left Wall Bay (43 Seats S-25 to S-67)
    // -------------------------------------------------------------
    // Outer Row S-25 to S-46 (along z = -9.2)
    buildCubicleRow(floor1Group, {
      zone: 'Zone B: Left Wall Bay',
      sub: 'Outer A/C Row',
      startSeat: 25,
      count: 22,
      startX: -17,
      spacingX: 1.6,
      z: -9.2,
      facing: 1, // Facing south
      accentColor: 0x10b981
    });

    // Inner Row S-47 to S-67 (along z = -5.8)
    buildCubicleRow(floor1Group, {
      zone: 'Zone B: Left Wall Bay',
      sub: 'Inner Corridor Row',
      startSeat: 47,
      count: 21,
      startX: -16.2,
      spacingX: 1.6,
      z: -5.8,
      facing: -1, // Facing north
      accentColor: 0x10b981
    });

    // -------------------------------------------------------------
    // ZONE C: Center Dual-Row Sanctuary (42 Seats S-68 to S-109)
    // -------------------------------------------------------------
    // Row 1 (S-68 to S-88) along z = -0.9
    buildCubicleRow(floor1Group, {
      zone: 'Zone C: Center Sanctuary',
      sub: 'Central Row 1',
      startSeat: 68,
      count: 21,
      startX: -16.2,
      spacingX: 1.6,
      z: -0.9,
      facing: 1,
      accentColor: 0xa855f7
    });

    // Row 2 (S-89 to S-109) along z = 0.9
    buildCubicleRow(floor1Group, {
      zone: 'Zone C: Center Sanctuary',
      sub: 'Central Row 2',
      startSeat: 89,
      count: 21,
      startX: -16.2,
      spacingX: 1.6,
      z: 0.9,
      facing: -1,
      accentColor: 0xa855f7
    });

    // -------------------------------------------------------------
    // ZONE D: Right Wall Bay (40 Seats S-110 to S-149)
    // -------------------------------------------------------------
    // Aisle Row S-110 to S-130 along z = 5.8
    buildCubicleRow(floor1Group, {
      zone: 'Zone D: Right Wall Bay',
      sub: 'Aisle Focus Row',
      startSeat: 110,
      count: 21,
      startX: -16.2,
      spacingX: 1.6,
      z: 5.8,
      facing: 1,
      accentColor: 0xf97316
    });

    // Right Wall Row S-131 to S-149 along z = 9.2
    buildCubicleRow(floor1Group, {
      zone: 'Zone D: Right Wall Bay',
      sub: 'Right Wall A/C Row',
      startSeat: 131,
      count: 19,
      startX: -14.6,
      spacingX: 1.6,
      z: 9.2,
      facing: -1,
      accentColor: 0xf97316
    });

    // Wall-Mounted Split Inverter A/Cs along perimeter walls
    buildACUnits(floor1Group, -11.8, 11.8);
  }

  function buildFloor2() {
    floor2Group = new THREE.Group();
    buildingGroup.add(floor2Group);

    // Elevate Floor 2 slightly above or in stacked architectural mode
    floor2Group.position.y = 8;
    floor2Group.visible = false; // Shown when Floor 2 or Both is toggled

    // Floor 2 Slab (Zone A Executive Sanctuary: 28m x 18m)
    const floorGeo = new THREE.BoxGeometry(30, 0.6, 20);
    const floorMesh = new THREE.Mesh(floorGeo, mats.floorTileL2);
    floorMesh.position.y = 0.3;
    floorMesh.receiveShadow = true;
    floor2Group.add(floorMesh);

    buildPerimeterWalls(floor2Group, 30, 20, 0.6, 2.6);

    // Executive Aisle Carpet
    const aisleGeo = new THREE.BoxGeometry(26, 0.05, 3.2);
    const aisleMesh = new THREE.Mesh(aisleGeo, mats.aislePath);
    aisleMesh.position.set(0, 0.63, 0);
    aisleMesh.receiveShadow = true;
    floor2Group.add(aisleMesh);

    // -------------------------------------------------------------
    // ZONE A: Upper Floor Executive Sanctuary (24 Seats S-1 to S-24)
    // -------------------------------------------------------------
    // Executive Row 1: S-1 to S-12 (z = -3.8)
    buildCubicleRow(floor2Group, {
      zone: 'Zone A: Executive Sanctuary',
      sub: 'Upper 2nd Floor Executive Row 1',
      startSeat: 1,
      count: 12,
      startX: -11,
      spacingX: 2.0, // Wider executive spacing
      z: -3.8,
      facing: 1,
      accentColor: 0x38bdf8,
      isExec: true
    });

    // Executive Row 2: S-13 to S-24 (z = 3.8)
    buildCubicleRow(floor2Group, {
      zone: 'Zone A: Executive Sanctuary',
      sub: 'Upper 2nd Floor Executive Row 2',
      startSeat: 13,
      count: 12,
      startX: -11,
      spacingX: 2.0,
      z: 3.8,
      facing: -1,
      accentColor: 0x38bdf8,
      isExec: true
    });

    // Decorative Plants & Lounge Couches on Floor 2
    addPlant(floor2Group, -13, 0.6, -7);
    addPlant(floor2Group, 13, 0.6, -7);
    addPlant(floor2Group, -13, 0.6, 7);
    addPlant(floor2Group, 13, 0.6, 7);
  }

  function buildCubicleRow(parentGroup, opts) {
    const deskW = opts.isExec ? 1.6 : 1.25;
    const deskD = opts.isExec ? 0.9 : 0.75;
    const deskH = 0.85;
    const partH = 1.35;

    for (let i = 0; i < opts.count; i++) {
      const seatNo = opts.startSeat + i;
      const x = opts.startX + i * opts.spacingX;
      const z = opts.z;

      const cubicleGroup = new THREE.Group();
      cubicleGroup.position.set(x, 0.6, z);

      // Desk Tabletop
      const deskGeo = new THREE.BoxGeometry(deskW, 0.06, deskD);
      const deskMat = opts.isExec ? mats.execDesk : mats.woodDesk;
      const deskMesh = new THREE.Mesh(deskGeo, deskMat);
      deskMesh.position.y = deskH;
      deskMesh.castShadow = true;
      deskMesh.receiveShadow = true;
      cubicleGroup.add(deskMesh);

      // Desk Legs (2 metal side frames)
      const legGeo = new THREE.BoxGeometry(0.04, deskH, deskD - 0.1);
      const leftLeg = new THREE.Mesh(legGeo, mats.chair);
      leftLeg.position.set(-deskW / 2 + 0.05, deskH / 2, 0);
      cubicleGroup.add(leftLeg);

      const rightLeg = new THREE.Mesh(legGeo, mats.chair);
      rightLeg.position.set(deskW / 2 - 0.05, deskH / 2, 0);
      cubicleGroup.add(rightLeg);

      // Acoustic Privacy Partition (Back Screen)
      const backPartGeo = new THREE.BoxGeometry(deskW, partH, 0.05);
      const backPart = new THREE.Mesh(backPartGeo, mats.partition);
      const backZ = (opts.facing === 1) ? -deskD / 2 : deskD / 2;
      backPart.position.set(0, partH / 2, backZ);
      backPart.castShadow = true;
      cubicleGroup.add(backPart);

      // Side Divider Screen
      const sidePartGeo = new THREE.BoxGeometry(0.04, partH - 0.2, deskD);
      const sidePart = new THREE.Mesh(sidePartGeo, mats.partition);
      sidePart.position.set(deskW / 2, (partH - 0.2) / 2, 0);
      cubicleGroup.add(sidePart);

      // Attached Steel Locker underneath/behind desk
      const lockerGeo = new THREE.BoxGeometry(0.35, 0.55, 0.45);
      const lockerMesh = new THREE.Mesh(lockerGeo, mats.chair);
      lockerMesh.position.set(deskW / 2 - 0.22, 0.3, backZ + (opts.facing === 1 ? 0.25 : -0.25));
      cubicleGroup.add(lockerMesh);

      // Office Ergonomic Chair
      const chairGroup = buildChair(opts.facing);
      chairGroup.position.set(0, 0, opts.facing === 1 ? 0.65 : -0.65);
      cubicleGroup.add(chairGroup);

      // Warm Personal LED Desk Lamp
      const lampBulb = buildDeskLamp(cubicleGroup, deskW / 2 - 0.2, deskH + 0.03, backZ + (opts.facing === 1 ? 0.18 : -0.18));

      // Interactive Click Target (Invisible Bounding Box for easy click/hover)
      const hitBoxGeo = new THREE.BoxGeometry(deskW + 0.2, partH + 0.3, deskD + 0.8);
      const hitBoxMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitBox = new THREE.Mesh(hitBoxGeo, hitBoxMat);
      hitBox.position.set(0, partH / 2, 0);
      hitBox.userData = {
        seatId: 'S-' + seatNo,
        lockerId: 'L-' + seatNo,
        zone: opts.zone,
        sub: opts.sub,
        price: opts.isExec ? '₹2,000 / mo' : '₹1,000 / mo',
        floor: opts.isExec ? 2 : 1,
        cubicleGroup: cubicleGroup,
        lampBulb: lampBulb,
        accentColor: opts.accentColor
      };
      cubicleGroup.add(hitBox);
      interactiveObjects.push(hitBox);

      parentGroup.add(cubicleGroup);
    }
  }

  function buildChair(facing) {
    const chairGroup = new THREE.Group();

    // Seat cushion
    const seatGeo = new THREE.BoxGeometry(0.48, 0.08, 0.48);
    const seatMesh = new THREE.Mesh(seatGeo, mats.chair);
    seatMesh.position.y = 0.48;
    chairGroup.add(seatMesh);

    // Curved backrest
    const backGeo = new THREE.BoxGeometry(0.44, 0.48, 0.05);
    const backMesh = new THREE.Mesh(backGeo, mats.chair);
    const backZ = (facing === 1) ? 0.22 : -0.22;
    backMesh.position.set(0, 0.72, backZ);
    chairGroup.add(backMesh);

    // Central stand & wheeled star base
    const poleGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.44, 8);
    const pole = new THREE.Mesh(poleGeo, mats.lampStem);
    pole.position.y = 0.24;
    chairGroup.add(pole);

    return chairGroup;
  }

  function buildDeskLamp(parent, x, y, z) {
    const lampGroup = new THREE.Group();
    lampGroup.position.set(x, y, z);

    // Stem
    const stemGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.4, 8);
    const stem = new THREE.Mesh(stemGeo, mats.lampStem);
    stem.position.y = 0.2;
    lampGroup.add(stem);

    // Hood / Shade
    const shadeGeo = new THREE.ConeGeometry(0.08, 0.08, 12);
    shadeGeo.rotateX(Math.PI);
    const shade = new THREE.Mesh(shadeGeo, mats.lampStem);
    shade.position.y = 0.4;
    lampGroup.add(shade);

    // Emissive Light Bulb
    const bulbGeo = new THREE.SphereGeometry(0.03, 8, 8);
    const bulb = new THREE.Mesh(bulbGeo, mats.lampBulbDay);
    bulb.position.y = 0.38;
    lampGroup.add(bulb);

    parent.add(lampGroup);
    return bulb;
  }

  function buildPerimeterWalls(parentGroup, width, depth, baseH, wallH) {
    // Low Glass Architectural Boundary Walls
    const halfW = width / 2;
    const halfD = depth / 2;
    const t = 0.15; // wall thickness

    // North wall
    const wallN = new THREE.Mesh(new THREE.BoxGeometry(width, wallH, t), mats.glassWall);
    wallN.position.set(0, baseH + wallH / 2, -halfD);
    parentGroup.add(wallN);

    // South wall
    const wallS = new THREE.Mesh(new THREE.BoxGeometry(width, wallH, t), mats.glassWall);
    wallS.position.set(0, baseH + wallH / 2, halfD);
    parentGroup.add(wallS);

    // West wall
    const wallW = new THREE.Mesh(new THREE.BoxGeometry(t, wallH, depth), mats.glassWall);
    wallW.position.set(-halfW, baseH + wallH / 2, 0);
    parentGroup.add(wallW);

    // East wall (Main Entrance with doorway gap)
    const wallE1 = new THREE.Mesh(new THREE.BoxGeometry(t, wallH, depth * 0.38), mats.glassWall);
    wallE1.position.set(halfW, baseH + wallH / 2, -depth * 0.31);
    parentGroup.add(wallE1);

    const wallE2 = new THREE.Mesh(new THREE.BoxGeometry(t, wallH, depth * 0.38), mats.glassWall);
    wallE2.position.set(halfW, baseH + wallH / 2, depth * 0.31);
    parentGroup.add(wallE2);
  }

  function buildACUnits(parentGroup, zNorth, zSouth) {
    const acXPositions = [-12, -4, 4, 12];
    acXPositions.forEach(x => {
      // North Wall A/C
      const acN = createACMesh();
      acN.position.set(x, 2.5, zNorth + 0.15);
      parentGroup.add(acN);

      // South Wall A/C
      const acS = createACMesh();
      acS.position.set(x, 2.5, zSouth - 0.15);
      acS.rotation.y = Math.PI;
      parentGroup.add(acS);
    });
  }

  function createACMesh() {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.45, 0.3), mats.acUnit);
    body.castShadow = true;
    g.add(body);

    const led = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.04, 0.02), mats.acGlow);
    led.position.set(0.6, -0.1, 0.16);
    g.add(led);
    return g;
  }

  function buildAmenities() {
    // Reception Counter (East Entrance Lobby, Floor 1)
    const recepGroup = new THREE.Group();
    recepGroup.position.set(17.5, 0.6, 0);

    const desk = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.05, 3.8), mats.reception);
    desk.position.y = 0.52;
    desk.castShadow = true;
    recepGroup.add(desk);

    // Biometric Turnstiles (2 lanes)
    const turn1 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.95, 0.2), mats.chair);
    turn1.position.set(-1.2, 0.48, -1.2);
    recepGroup.add(turn1);

    const turn2 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.95, 0.2), mats.chair);
    turn2.position.set(-1.2, 0.48, 1.2);
    recepGroup.add(turn2);

    floor1Group.add(recepGroup);

    // Passenger Elevator Shaft (West End Lobby)
    const liftGeo = new THREE.BoxGeometry(2.4, 3.6, 2.4);
    const liftMesh = new THREE.Mesh(liftGeo, mats.pedestal);
    liftMesh.position.set(-18.5, 2.2, 0);
    floor1Group.add(liftMesh);

    // Decorative Plants along corridors
    addPlant(floor1Group, -18.5, 0.6, -7);
    addPlant(floor1Group, -18.5, 0.6, 7);
    addPlant(floor1Group, 18.5, 0.6, -7);
    addPlant(floor1Group, 18.5, 0.6, 7);
    addPlant(floor1Group, 0, 0.6, -3.2);
    addPlant(floor1Group, 0, 0.6, 3.2);
  }

  function addPlant(parent, x, y, z) {
    const g = new THREE.Group();
    g.position.set(x, y, z);

    // Ceramic pot
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.22, 0.55, 12), mats.plantPot);
    pot.position.y = 0.28;
    pot.castShadow = true;
    g.add(pot);

    // Lush plant foliage (2 spheres)
    const foliage = new THREE.Mesh(new THREE.DodecahedronGeometry(0.48, 1), mats.plantLeaves);
    foliage.position.y = 0.72;
    foliage.castShadow = true;
    g.add(foliage);

    parent.add(g);
  }

  function buildZoneBeacons() {
    // 3D Floating Zone Pin Markers
    const zones = [
      { name: 'Zone B: Left Bay', seats: '43 Seats (S-25–67)', pos: new THREE.Vector3(-6, 3.8, -7.5), color: 0x10b981 },
      { name: 'Zone C: Center Sanctuary', seats: '42 Seats (S-68–109)', pos: new THREE.Vector3(-6, 3.8, 0), color: 0xa855f7 },
      { name: 'Zone D: Right Bay', seats: '40 Seats (S-110–149)', pos: new THREE.Vector3(-6, 3.8, 7.5), color: 0xf97316 },
      { name: 'Grand Reception & Entry', seats: 'Biometric Access', pos: new THREE.Vector3(16.5, 3.8, 0), color: 0x38bdf8 }
    ];

    zones.forEach(z => {
      const beaconGroup = new THREE.Group();
      beaconGroup.position.copy(z.pos);

      // Outer pulsing ring
      const ringGeo = new THREE.RingGeometry(0.35, 0.48, 24);
      ringGeo.rotateX(-Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({ color: z.color, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      beaconGroup.add(ring);

      // Core sphere pin
      const sphereGeo = new THREE.SphereGeometry(0.22, 12, 12);
      const sphereMat = new THREE.MeshBasicMaterial({ color: z.color });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      beaconGroup.add(sphere);

      floor1Group.add(beaconGroup);
    });
  }

  function setupDollhouseHUD() {
    // Remove existing HUD if present
    const oldHUD = document.getElementById('c2sDollhouseHUD');
    if (oldHUD) oldHUD.remove();

    const hud = document.createElement('div');
    hud.id = 'c2sDollhouseHUD';
    hud.style.cssText = 'position:absolute;top:16px;left:16px;right:16px;display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;z-index:20;pointer-events:none;';

    // Left Title Badge & Floor Switcher
    hud.innerHTML = `
      <div style="background:rgba(15,23,42,0.9);backdrop-filter:blur(8px);border:1.5px solid rgba(56,189,248,0.4);border-radius:14px;padding:12px 18px;color:#f8fafc;pointer-events:auto;box-shadow:0 8px 24px rgba(0,0,0,0.5);">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
          <span style="display:inline-block;width:9px;height:9px;background:#10b981;border-radius:50%;box-shadow:0 0 10px #10b981;"></span>
          <strong style="font-size:14.5px;color:#ffffff;letter-spacing:-0.01em;">3D Architectural Floor Model (Sanctuary Cutaway)</strong>
        </div>
        <div style="font-size:12px;color:#94a3b8;margin-bottom:10px;">
          149 Private Air-Conditioned Cubicles &bull; Drag to rotate &bull; Click desks to inspect
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <button type="button" id="btnDhFloor1" class="btn" onclick="window.setDollhouseFloor(1)" style="padding:6px 14px;font-size:12px;font-weight:800;background:#2563eb;color:#fff;border-radius:8px;border:none;cursor:pointer;">
            🏢 1st Floor (125 Seats)
          </button>
          <button type="button" id="btnDhFloor2" class="btn" onclick="window.setDollhouseFloor(2)" style="padding:6px 14px;font-size:12px;font-weight:800;background:rgba(30,41,59,0.8);color:#94a3b8;border-radius:8px;border:1px solid #334155;cursor:pointer;">
            🏢 2nd Floor (24 Seats)
          </button>
          <button type="button" id="btnDhBoth" class="btn" onclick="window.setDollhouseFloor('both')" style="padding:6px 14px;font-size:12px;font-weight:800;background:rgba(30,41,59,0.8);color:#94a3b8;border-radius:8px;border:1px solid #334155;cursor:pointer;">
            🌟 Both Floors (Stacked 3D)
          </button>
        </div>
      </div>

      <!-- Right Toolbar Controls -->
      <div style="display:flex;gap:8px;flex-wrap:wrap;pointer-events:auto;">
        <button type="button" id="btnDhAutoSpin" onclick="window.toggleDollhouseSpin()" class="btn" style="background:rgba(15,23,42,0.88);color:#ffffff;border:1px solid rgba(255,255,255,0.2);padding:7px 14px;border-radius:9px;font-size:12.5px;font-weight:750;backdrop-filter:blur(8px);cursor:pointer;" title="Toggle 360 Auto Rotation">
          🔄 Auto-Spin: ON
        </button>
        <button type="button" id="btnDhNight" onclick="window.toggleDollhouseNight()" class="btn" style="background:rgba(15,23,42,0.88);color:#ffffff;border:1px solid rgba(255,255,255,0.2);padding:7px 14px;border-radius:9px;font-size:12.5px;font-weight:750;backdrop-filter:blur(8px);cursor:pointer;" title="Toggle Cozy Night Lamp Glow">
          🌙 Night Lamp Mode
        </button>
        <div style="display:flex;background:rgba(15,23,42,0.88);border:1px solid rgba(255,255,255,0.2);border-radius:9px;overflow:hidden;backdrop-filter:blur(8px);">
          <button type="button" onclick="window.resetDollhouseCamera('iso')" style="background:none;border:none;color:#fff;padding:7px 12px;font-size:12px;font-weight:750;cursor:pointer;" title="Isometric 3D Angle">📐 3D</button>
          <button type="button" onclick="window.resetDollhouseCamera('top')" style="background:none;border:none;color:#fff;padding:7px 12px;font-size:12px;font-weight:750;cursor:pointer;border-left:1px solid rgba(255,255,255,0.15);" title="Top-Down CAD View">🔝 Top</button>
          <button type="button" onclick="window.resetDollhouseCamera('entry')" style="background:none;border:none;color:#fff;padding:7px 12px;font-size:12px;font-weight:750;cursor:pointer;border-left:1px solid rgba(255,255,255,0.15);" title="Entrance Angle">🚪 Front</button>
        </div>
        <button type="button" onclick="window.toggle360Fullscreen()" class="btn" style="background:rgba(15,23,42,0.88);color:#fff;border:1px solid rgba(255,255,255,0.2);padding:7px 12px;border-radius:9px;font-size:12.5px;font-weight:750;backdrop-filter:blur(8px);cursor:pointer;" title="Fullscreen">
          🔲
        </button>
      </div>
    `;

    container.appendChild(hud);

    // Bottom Help Banner
    const bottomHelp = document.createElement('div');
    bottomHelp.style.cssText = 'position:absolute;bottom:14px;left:16px;background:rgba(15,23,42,0.85);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.15);padding:6px 14px;border-radius:8px;font-size:12px;color:#cbd5e1;pointer-events:none;z-index:20;';
    bottomHelp.innerHTML = '👆 <strong>Drag to rotate 3D floor</strong> &bull; Scroll to zoom &bull; Click any desk to inspect details';
    container.appendChild(bottomHelp);
  }

  function setupControls() {
    canvas.addEventListener('mousedown', onMouseDown, { passive: false });
    window.addEventListener('mousemove', onMouseMove, { passive: false });
    window.addEventListener('mouseup', onMouseUp, { passive: false });

    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: false });

    canvas.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', onWindowResize);
  }

  function onMouseDown(e) {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
    isAutoSpinning = false;
    updateSpinButton();
  }

  function onMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (isDragging) {
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      cameraTheta -= deltaX * 0.007;
      cameraPhi = Math.max(0.15, Math.min(Math.PI / 2.05, cameraPhi + deltaY * 0.006));
      updateCameraPosition();
    } else {
      checkHover(e.clientX - rect.left, e.clientY - rect.top);
    }
  }

  function onMouseUp(e) {
    if (isDragging) {
      isDragging = false;
    }
    // Check click on cubicle
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    handleClick(clickX, clickY);
  }

  let touchDist = 0;

  function onTouchStart(e) {
    if (e.touches.length === 1) {
      isDragging = true;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
      isAutoSpinning = false;
      updateSpinButton();
    } else if (e.touches.length === 2) {
      touchDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  }

  function onTouchMove(e) {
    if (e.touches.length === 1 && isDragging) {
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;

      cameraTheta -= deltaX * 0.007;
      cameraPhi = Math.max(0.15, Math.min(Math.PI / 2.05, cameraPhi + deltaY * 0.006));
      updateCameraPosition();
      e.preventDefault();
    } else if (e.touches.length === 2) {
      const newDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const diff = newDist - touchDist;
      cameraRadius = Math.max(25, Math.min(110, cameraRadius - diff * 0.1));
      updateCameraPosition();
      touchDist = newDist;
      e.preventDefault();
    }
  }

  function onTouchEnd(e) {
    isDragging = false;
  }

  function onWheel(e) {
    e.preventDefault();
    cameraRadius = Math.max(25, Math.min(110, cameraRadius + e.deltaY * 0.04));
    updateCameraPosition();
  }

  function onWindowResize() {
    if (!container || !camera || !renderer) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  function updateCameraPosition() {
    if (!camera) return;
    camera.position.x = cameraTarget.x + cameraRadius * Math.sin(cameraPhi) * Math.sin(cameraTheta);
    camera.position.y = cameraTarget.y + cameraRadius * Math.cos(cameraPhi);
    camera.position.z = cameraTarget.z + cameraRadius * Math.sin(cameraPhi) * Math.cos(cameraTheta);
    camera.lookAt(cameraTarget);
  }

  function checkHover(screenX, screenY) {
    if (!camera || interactiveObjects.length === 0) return;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactiveObjects, false);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      if (hoveredObject !== hit) {
        hoveredObject = hit;
        canvas.style.cursor = 'pointer';
      }
    } else {
      if (hoveredObject) {
        hoveredObject = null;
        canvas.style.cursor = 'grab';
      }
    }
  }

  function handleClick(screenX, screenY) {
    if (!camera || interactiveObjects.length === 0) return;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactiveObjects, false);

    if (intersects.length > 0) {
      const data = intersects[0].object.userData;
      showTooltip(data, screenX, screenY);
    } else {
      hideTooltip();
    }
  }

  function showTooltip(data, screenX, screenY) {
    if (!tooltipEl) return;
    tooltipEl.style.display = 'block';

    // Clamp coordinates inside container
    const cWidth = container.clientWidth;
    const cHeight = container.clientHeight;
    let posX = Math.min(cWidth - 240, Math.max(16, screenX - 110));
    let posY = Math.max(16, screenY - 140);

    tooltipEl.style.left = posX + 'px';
    tooltipEl.style.top = posY + 'px';

    tooltipEl.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
        <strong style="font-size:15px;color:#38bdf8;">💺 Desk ${data.seatId}</strong>
        <span style="font-size:11px;font-weight:800;background:#0c4a6e;color:#38bdf8;padding:2px 8px;border-radius:6px;">Locker #${data.lockerId}</span>
      </div>
      <div style="font-size:12px;color:#cbd5e1;margin-bottom:2px;"><strong>${data.zone}</strong></div>
      <div style="font-size:11px;color:#94a3b8;margin-bottom:8px;">${data.sub} &bull; Attached 230V Socket &bull; LED Lamp</div>
      <div style="display:flex;justify-content:space-between;align-items:center;padding-top:6px;border-top:1px solid rgba(255,255,255,0.12);">
        <span style="font-size:13px;font-weight:900;color:#10b981;">${data.price}</span>
        <button type="button" onclick="window.bookFromDollhouse('${data.seatId}', ${data.floor})" style="background:#ea580c;color:#fff;border:none;padding:5px 12px;border-radius:6px;font-size:11.5px;font-weight:850;cursor:pointer;">
          Book Seat &rarr;
        </button>
      </div>
    `;
  }

  function hideTooltip() {
    if (tooltipEl) tooltipEl.style.display = 'none';
  }

  // Global Function for Booking from 3D Dollhouse
  window.bookFromDollhouse = function(seatId, floor) {
    if (typeof toggleTourMode === 'function') toggleTourMode('2d');
    if (typeof setLibraryFloor === 'function') setLibraryFloor(floor);
    setTimeout(() => {
      const seatBtn = document.querySelector(`[data-seat-id="${seatId}"]`);
      if (seatBtn) {
        seatBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        seatBtn.click();
      }
    }, 200);
  };

  // Global Controls
  window.setDollhouseFloor = function(floor) {
    currentFloor = floor;
    const b1 = document.getElementById('btnDhFloor1');
    const b2 = document.getElementById('btnDhFloor2');
    const bBoth = document.getElementById('btnDhBoth');

    [b1, b2, bBoth].forEach(b => {
      if (b) {
        b.style.background = 'rgba(30,41,59,0.8)';
        b.style.color = '#94a3b8';
        b.style.border = '1px solid #334155';
      }
    });

    if (floor === 1) {
      if (floor1Group) floor1Group.visible = true;
      if (floor2Group) floor2Group.visible = false;
      cameraTarget.set(0, 2, 0);
      if (b1) { b1.style.background = '#2563eb'; b1.style.color = '#fff'; b1.style.border = 'none'; }
    } else if (floor === 2) {
      if (floor1Group) floor1Group.visible = false;
      if (floor2Group) {
        floor2Group.visible = true;
        floor2Group.position.y = 0; // Bring Floor 2 to ground view
      }
      cameraTarget.set(0, 2, 0);
      if (b2) { b2.style.background = '#2563eb'; b2.style.color = '#fff'; b2.style.border = 'none'; }
    } else { // 'both'
      if (floor1Group) floor1Group.visible = true;
      if (floor2Group) {
        floor2Group.visible = true;
        floor2Group.position.y = 5.2; // Stack above Floor 1
      }
      cameraTarget.set(0, 4.5, 0);
      if (bBoth) { bBoth.style.background = '#2563eb'; bBoth.style.color = '#fff'; bBoth.style.border = 'none'; }
    }
    updateCameraPosition();
  };

  window.toggleDollhouseSpin = function() {
    isAutoSpinning = !isAutoSpinning;
    updateSpinButton();
  };

  function updateSpinButton() {
    const btn = document.getElementById('btnDhAutoSpin');
    if (btn) {
      btn.textContent = isAutoSpinning ? '🔄 Auto-Spin: ON' : '⏸️ Auto-Spin: OFF';
      btn.style.color = isAutoSpinning ? '#38bdf8' : '#ffffff';
    }
  }

  window.toggleDollhouseNight = function() {
    isNightMode = !isNightMode;
    const btn = document.getElementById('btnDhNight');

    if (isNightMode) {
      scene.background.set(0x030712);
      scene.fog.color.set(0x030712);
      hemiLight.intensity = 0.2;
      dirLight.intensity = 0.25;
      mats.lampBulbDay.emissive.set(0xf97316);
      mats.lampBulbDay.emissiveIntensity = 2.4;
      if (btn) {
        btn.textContent = '☀️ Day Natural Mode';
        btn.style.color = '#fbbf24';
      }
    } else {
      scene.background.set(0x0a1128);
      scene.fog.color.set(0x0a1128);
      hemiLight.intensity = 0.7;
      dirLight.intensity = 0.9;
      mats.lampBulbDay.emissive.set(0xfbbf24);
      mats.lampBulbDay.emissiveIntensity = 0.6;
      if (btn) {
        btn.textContent = '🌙 Night Lamp Mode';
        btn.style.color = '#ffffff';
      }
    }
  };

  window.resetDollhouseCamera = function(viewPreset) {
    isAutoSpinning = false;
    updateSpinButton();

    if (viewPreset === 'top') {
      cameraTheta = 0;
      cameraPhi = 0.05; // Almost straight down
      cameraRadius = 65;
    } else if (viewPreset === 'entry') {
      cameraTheta = Math.PI / 2;
      cameraPhi = Math.PI / 3.0;
      cameraRadius = 55;
    } else { // 'iso'
      cameraTheta = Math.PI / 4;
      cameraPhi = Math.PI / 3.4;
      cameraRadius = 68;
    }
    updateCameraPosition();
  };

  // Main Render Loop
  function animate() {
    animFrameId = requestAnimationFrame(animate);

    if (isAutoSpinning && !isDragging) {
      cameraTheta += 0.0035;
      updateCameraPosition();
    }

    renderer.render(scene, camera);
  }

  // Initialize when container is visible
  window.init3DDollhouse = init3DDollhouse;

  // Auto-init on page load if container exists
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3DDollhouse);
  } else {
    setTimeout(init3DDollhouse, 100);
  }

})();
