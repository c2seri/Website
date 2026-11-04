const fs = require('fs');

// =============================================================================
// STEP 1: Add getExamEmblem to exams.js and make getExamSvg an alias
// =============================================================================
let examsCode = fs.readFileSync('exams.js', 'utf8');

const emblemCode = `
// ==========================================================================
// HIGH-DEFINITION OFFICIAL EXAM EMBLEMS & LOGO ENGINE (204+ PAN-INDIA EXAMS)
// ==========================================================================
function getExamEmblem(examOrId, size = 48) {
  let e = examOrId;
  if (typeof examOrId === 'string') {
    if (typeof EXAMS !== 'undefined' && Array.isArray(EXAMS)) {
      e = EXAMS.find(x => x.id === examOrId || x.code === examOrId);
    }
    if (!e) {
      e = { id: examOrId, code: examOrId, name: examOrId, board: examOrId, category: 'Govt Exam', state: 'All India' };
    }
  }
  if (!e) e = { id: 'GOVT', code: 'GOVT', board: 'Govt Board', category: 'Govt Exam', state: 'All India' };

  const id = (e.id || '').toUpperCase();
  const code = (e.code || '').toUpperCase();
  const name = (e.name || '').toUpperCase();
  const board = (e.board || '').toUpperCase();
  const cat = (e.category || '').toUpperCase();
  const state = (e.state || '').toUpperCase();
  const stateCode = (e.stateCode || '').toUpperCase();

  // 1. SBI (State Bank of India) - Iconic blue circle with white keyhole
  if (id.includes('SBI') || board.includes('STATE BANK OF INDIA') || name.includes('SBI ')) {
    return '<svg class="c2s-emblem" viewBox="0 0 48 48" width="' + size + '" height="' + size + '">' +
      '<defs><linearGradient id="sbiGrad_' + size + '" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="#0080d7"/><stop offset="100%" stop-color="#005a9e"/></linearGradient></defs>' +
      '<circle cx="24" cy="24" r="23" fill="url(#sbiGrad_' + size + ')"/>' +
      '<circle cx="24" cy="24" r="21" fill="none" stroke="#93c5fd" stroke-width="1" stroke-dasharray="2,2"/>' +
      '<circle cx="24" cy="20" r="7.5" fill="#ffffff"/>' +
      '<rect x="22" y="20" width="4" height="15" fill="#ffffff"/>' +
      '<circle cx="24" cy="20" r="3.2" fill="#005a9e"/>' +
      '<text x="24" y="44" font-size="7" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">SBI</text>' +
    '</svg>';
  }

  // 2. IBPS (Institute of Banking Personnel Selection)
  if (id.includes('IBPS') || board.includes('IBPS') || board.includes('INSTITUTE OF BANKING')) {
    return '<svg class="c2s-emblem" viewBox="0 0 48 48" width="' + size + '" height="' + size + '">' +
      '<defs><linearGradient id="ibpsGrad_' + size + '" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="#1e3a8a"/><stop offset="100%" stop-color="#0f172a"/></linearGradient></defs>' +
      '<rect x="2" y="2" width="44" height="44" rx="12" fill="url(#ibpsGrad_' + size + ')"/>' +
      '<rect x="4" y="4" width="40" height="40" rx="10" fill="none" stroke="#f59e0b" stroke-width="1.2"/>' +
      '<path d="M24 10c0 4-3 5-3 8 0 2 1.5 3.5 3 3.5s3-1.5 3-3.5c0-3-3-4-3-8z" fill="#f59e0b"/>' +
      '<path d="M15 28c3-1 6-1 9 1 3-2 6-2 9-1v7c-3-1-6-1-9 1-3-2-6-2-9-1v-7z" fill="#ffffff"/>' +
      '<line x1="24" y1="29" x2="24" y2="37" stroke="#1e3a8a" stroke-width="1.5"/>' +
      '<text x="24" y="44" font-size="7" font-weight="900" fill="#f59e0b" text-anchor="middle" letter-spacing="1">IBPS</text>' +
    '</svg>';
  }

  // 3. RBI / Regulatory (Reserve Bank of India, NABARD, SEBI)
  if (id.includes('RBI') || board.includes('RESERVE BANK') || name.includes('RBI ') || id.includes('NABARD') || id.includes('SEBI') || id.includes('LIC')) {
    const label = id.includes('NABARD') ? 'NABARD' : (id.includes('SEBI') ? 'SEBI' : (id.includes('LIC') ? 'LIC' : 'RBI'));
    return '<svg class="c2s-emblem" viewBox="0 0 48 48" width="' + size + '" height="' + size + '">' +
      '<defs><linearGradient id="rbiGrad_' + size + '" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient></defs>' +
      '<circle cx="24" cy="24" r="23" fill="url(#rbiGrad_' + size + ')"/>' +
      '<circle cx="24" cy="24" r="20" fill="none" stroke="#eab308" stroke-width="1.8"/>' +
      '<path d="M23 15c0-3 3-4 6-2-1 2-2 3-2 5h-4z" fill="#eab308"/>' +
      '<path d="M25 15c0-3-3-4-6-2 1 2 2 3 2 5h4z" fill="#eab308"/>' +
      '<path d="M16 26c1-2 4-3 7-3 4 0 7 2 9 4v2H16v-3z" fill="#fbbf24"/>' +
      '<rect x="23" y="16" width="2" height="11" fill="#eab308"/>' +
      '<text x="24" y="42" font-size="6.5" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="0.8">' + label + '</text>' +
    '</svg>';
  }

  // 4. SSC (Staff Selection Commission)
  if (id.includes('SSC') || board.includes('STAFF SELECTION COMMISSION') || board === 'SSC') {
    return '<svg class="c2s-emblem" viewBox="0 0 48 48" width="' + size + '" height="' + size + '">' +
      '<defs><linearGradient id="sscShield_' + size + '" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="#1e3a8a"/><stop offset="100%" stop-color="#091e42"/></linearGradient></defs>' +
      '<path d="M24 3 L42 9 V25 C42 35 24 45 24 45 C24 45 6 35 6 25 V9 Z" fill="url(#sscShield_' + size + ')"/>' +
      '<path d="M24 5 L40 10.5 V24 C40 33 24 42 24 42 C24 42 8 33 8 24 V10.5 Z" fill="none" stroke="#f59e0b" stroke-width="1.5"/>' +
      '<path d="M14 11 H34 V13 H14 Z" fill="#f97316"/>' +
      '<path d="M14 13 H34 V15 H14 Z" fill="#ffffff"/>' +
      '<path d="M14 15 H34 V17 H14 Z" fill="#16a34a"/>' +
      '<circle cx="24" cy="22" r="4.5" fill="#f59e0b"/>' +
      '<path d="M20 28 C20 24 28 24 28 28 Z" fill="#fbbf24"/>' +
      '<text x="24" y="38" font-size="7.5" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">SSC</text>' +
    '</svg>';
  }

  // 5. RAILWAYS / RRB
  if (id.includes('RRB') || id.includes('RAILWAY') || board.includes('RAILWAY') || name.includes('RRB') || cat.includes('RAILWAY')) {
    return '<svg class="c2s-emblem" viewBox="0 0 48 48" width="' + size + '" height="' + size + '">' +
      '<defs><linearGradient id="railGrad_' + size + '" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="#991b1b"/><stop offset="100%" stop-color="#450a0a"/></linearGradient></defs>' +
      '<circle cx="24" cy="24" r="23" fill="url(#railGrad_' + size + ')"/>' +
      '<circle cx="24" cy="24" r="20" fill="none" stroke="#fbbf24" stroke-width="2"/>' +
      '<circle cx="24" cy="24" r="17" fill="none" stroke="#ffffff" stroke-width="1" stroke-dasharray="2,2"/>' +
      '<rect x="17" y="14" width="14" height="13" rx="3" fill="#ffffff"/>' +
      '<circle cx="24" cy="18" r="2.5" fill="#991b1b"/>' +
      '<rect x="15" y="27" width="18" height="4" rx="1.5" fill="#fbbf24"/>' +
      '<circle cx="18" cy="31" r="2" fill="#ffffff"/>' +
      '<circle cx="30" cy="31" r="2" fill="#ffffff"/>' +
      '<line x1="12" y1="35" x2="36" y2="35" stroke="#fbbf24" stroke-width="2"/>' +
      '<text x="24" y="44" font-size="6.5" font-weight="900" fill="#fbbf24" text-anchor="middle" letter-spacing="0.8">RAILWAY</text>' +
    '</svg>';
  }

  // 6. UPSC / Civil Services Central
  if (id.includes('UPSC') || board.includes('UPSC') || board.includes('UNION PUBLIC SERVICE')) {
    return '<svg class="c2s-emblem" viewBox="0 0 48 48" width="' + size + '" height="' + size + '">' +
      '<defs><linearGradient id="upscGrad_' + size + '" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="#831843"/><stop offset="100%" stop-color="#500724"/></linearGradient></defs>' +
      '<circle cx="24" cy="24" r="23" fill="url(#upscGrad_' + size + ')"/>' +
      '<circle cx="24" cy="24" r="20.5" fill="none" stroke="#fcd34d" stroke-width="1.8"/>' +
      '<path d="M21 11 H27 V14 H21 Z" fill="#fcd34d"/>' +
      '<circle cx="24" cy="17" r="4" fill="#fcd34d"/>' +
      '<path d="M19 25 C19 20 29 20 29 25 Z" fill="#fbbf24"/>' +
      '<rect x="17" y="26" width="14" height="3" fill="#fcd34d"/>' +
      '<circle cx="24" cy="31" r="2.5" fill="none" stroke="#fcd34d" stroke-width="1"/>' +
      '<text x="24" y="42" font-size="7" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="1">UPSC</text>' +
    '</svg>';
  }

  // 7. ODISHA BOARDS (OSSC, OSSSC, OPSC, Odisha Police) - Konark Warrior Horse Crest
  if (state.includes('ODISHA') || id.includes('OSSC') || id.includes('OSSSC') || id.includes('OPSC') || board.includes('ODISHA')) {
    const isOpsc = id.includes('OPSC') || board.includes('OPSC');
    const isOsssc = id.includes('OSSSC') || board.includes('OSSSC');
    const isPolice = id.includes('POLICE') || board.includes('POLICE');
    const badgeLabel = isPolice ? 'POLICE' : (isOpsc ? 'OPSC' : (isOsssc ? 'OSSSC' : 'OSSC'));
    const bgCol1 = isPolice ? '#0f172a' : (isOpsc ? '#7c2d12' : '#047857');
    const bgCol2 = isPolice ? '#1e293b' : (isOpsc ? '#431407' : '#064e3b');

    return '<svg class="c2s-emblem" viewBox="0 0 48 48" width="' + size + '" height="' + size + '">' +
      '<defs><linearGradient id="odishaGrad_' + badgeLabel + '_' + size + '" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="' + bgCol1 + '"/><stop offset="100%" stop-color="' + bgCol2 + '"/></linearGradient></defs>' +
      '<circle cx="24" cy="24" r="23" fill="url(#odishaGrad_' + badgeLabel + '_' + size + ')"/>' +
      '<circle cx="24" cy="24" r="20" fill="none" stroke="#fbbf24" stroke-width="1.8"/>' +
      '<path d="M18 15 C20 12 25 12 27 15 C28 17 26 19 24 20 L28 27 H23 L21 22 L18 24 Z" fill="#fbbf24"/>' +
      '<circle cx="24" cy="26" r="6" fill="none" stroke="#ffffff" stroke-width="1.2"/>' +
      '<circle cx="24" cy="26" r="2" fill="#fbbf24"/>' +
      '<text x="24" y="42" font-size="6.5" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="0.8">' + badgeLabel + '</text>' +
    '</svg>';
  }

  // 8. POLICE & DEFENCE (State Police / NDA / CDS / AFCAT / CAPF)
  if (cat.includes('POLICE') || cat.includes('DEFENCE') || name.includes('POLICE') || name.includes('CONSTABLE') || name.includes('SI ') || id.includes('DEFENCE')) {
    const isDefence = name.includes('NDA') || name.includes('CDS') || name.includes('AFCAT') || name.includes('CAPF') || id.includes('DEFENCE');
    const bgCol = isDefence ? '#365314' : '#0f172a';
    const tag = isDefence ? 'DEFENCE' : 'POLICE';
    return '<svg class="c2s-emblem" viewBox="0 0 48 48" width="' + size + '" height="' + size + '">' +
      '<path d="M24 3 L42 9 V25 C42 35 24 45 24 45 C24 45 6 35 6 25 V9 Z" fill="' + bgCol + '"/>' +
      '<path d="M24 6 L39 11 V24 C39 33 24 42 24 42 C24 42 9 33 9 24 V11 Z" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>' +
      '<polygon points="24,14 26,19 31,19 27,22 28.5,27 24,24 19.5,27 21,22 17,19 22,19" fill="#fbbf24"/>' +
      '<path d="M16 30 L32 30" stroke="#fbbf24" stroke-width="1.5"/>' +
      '<text x="24" y="38" font-size="6" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">' + tag + '</text>' +
    '</svg>';
  }

  // 9. TEACHING & EDUCATION (CTET, KVS, NVS, State TET)
  if (cat.includes('TEACHING') || cat.includes('EDUCATION') || name.includes('TET') || name.includes('TEACHER') || name.includes('KVS')) {
    return '<svg class="c2s-emblem" viewBox="0 0 48 48" width="' + size + '" height="' + size + '">' +
      '<defs><linearGradient id="teachGrad_' + size + '" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="#b45309"/><stop offset="100%" stop-color="#78350f"/></linearGradient></defs>' +
      '<circle cx="24" cy="24" r="23" fill="url(#teachGrad_' + size + ')"/>' +
      '<circle cx="24" cy="24" r="20" fill="none" stroke="#fde68a" stroke-width="1.5"/>' +
      '<circle cx="24" cy="16" r="4.5" fill="#fde68a"/>' +
      '<path d="M15 24 C18 22 21 22 24 24 C27 22 30 22 33 24 V32 C30 30 27 30 24 32 C21 30 18 30 15 32 Z" fill="#ffffff"/>' +
      '<line x1="24" y1="24" x2="24" y2="32" stroke="#b45309" stroke-width="1.5"/>' +
      '<text x="24" y="42" font-size="6.5" font-weight="900" fill="#fde68a" text-anchor="middle" letter-spacing="0.8">TEACHING</text>' +
    '</svg>';
  }

  // 10. STATE COMMISSIONS (UP, Bihar, Rajasthan, MP, WB, etc.)
  let stateInitials = 'STATE';
  let stateTheme = '#1e3a8a';
  if (stateCode === 'UP' || state.includes('UTTAR PRADESH')) { stateInitials = 'UP'; stateTheme = '#047857'; }
  else if (stateCode === 'BIHAR' || state.includes('BIHAR')) { stateInitials = 'BPSC'; stateTheme = '#0f172a'; }
  else if (stateCode === 'RAJASTHAN' || state.includes('RAJASTHAN')) { stateInitials = 'RAJ'; stateTheme = '#b45309'; }
  else if (stateCode === 'MP' || state.includes('MADHYA PRADESH')) { stateInitials = 'MP'; stateTheme = '#1d4ed8'; }
  else if (stateCode === 'WB' || state.includes('WEST BENGAL')) { stateInitials = 'WB'; stateTheme = '#0f766e'; }
  else if (stateCode === 'MAHARASHTRA' || state.includes('MAHARASHTRA')) { stateInitials = 'MPSC'; stateTheme = '#c2410c'; }

  return '<svg class="c2s-emblem" viewBox="0 0 48 48" width="' + size + '" height="' + size + '">' +
    '<rect x="2" y="2" width="44" height="44" rx="12" fill="' + stateTheme + '"/>' +
    '<rect x="4" y="4" width="40" height="40" rx="10" fill="none" stroke="#fbbf24" stroke-width="1.5"/>' +
    '<path d="M19 12 H29 V15 H19 Z" fill="#fbbf24"/>' +
    '<circle cx="24" cy="19" r="4.5" fill="#ffffff"/>' +
    '<path d="M18 29 C18 24 30 24 30 29 Z" fill="#fbbf24"/>' +
    '<rect x="16" y="29" width="16" height="3" fill="#ffffff"/>' +
    '<text x="24" y="41" font-size="7" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="1">' + stateInitials + '</text>' +
  '</svg>';
}

function getExamSvg(id) {
  return getExamEmblem(id, 24);
}
`;

// Replace old getExamSvg in exams.js
const oldSvgFunc = /function getExamSvg\(id\) \{[\s\S]*?return icons\[id\] \|\| '<svg[\s\S]*?<\/svg>';\s*\}/;
if (oldSvgFunc.test(examsCode)) {
  examsCode = examsCode.replace(oldSvgFunc, emblemCode);
  fs.writeFileSync('exams.js', examsCode, 'utf8');
  console.log('Updated exams.js with high-definition getExamEmblem & getExamSvg!');
} else {
  console.log('Could not find old getExamSvg in exams.js, appending instead');
  examsCode += '\n' + emblemCode;
  fs.writeFileSync('exams.js', examsCode, 'utf8');
}
