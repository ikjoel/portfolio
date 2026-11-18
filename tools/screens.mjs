// Ten screens, five projects. Each function draws ONE screen; build.mjs renders it twice (wireframe + mockup).
// All names, numbers and prices are SAMPLE data. No real school, student, customer or price is shown.

const chips = (d, x, y, items) => { let cx = x; for (const [l, k] of items) cx += d.Chip(cx, y, l, { k }) + 8; };

function barChart(d, x, y, w, h, vals, labels) {
  const max = Math.max(...vals), base = y + h;
  d.Ln(x, base, x + w, base, { s: 'line' });
  for (const g of [0.25, 0.5, 0.75, 1]) d.Ln(x, base - h * g, x + w, base - h * g, { s: 'soft', dash: '3 4' });
  const bw = (w / vals.length) * 0.56, gap = w / vals.length;
  vals.forEach((v, i) => {
    const bh = (v / max) * h;
    d.R(x + i * gap + (gap - bw) / 2, base - bh, bw, bh, { f: i === vals.length - 1 ? 'accent' : 'primary', r: 5, op: i === vals.length - 1 ? 1 : 0.85 });
    d.T(x + i * gap + gap / 2, base + 20, labels[i], { z: 11, f: 'muted', a: 'middle' });
  });
}

/* ───────────────────────── 1. StudyPat: admin dashboard ───────────────────────── */
export const studypatAdmin = {
  slug: 'studypat-admin-dashboard', project: 'studypat', pal: 'studypat', W: 1440, H: 900, title: 'StudyPat admin dashboard',
  draw(d) {
    d.R(0, 0, 248, 900, { f: 'surface', s: 'line', r: 0 });
    d.R(28, 24, 34, 34, { f: 'primary', r: 10 }); d.T(76, 49, 'StudyPat', { z: 21, w: 800 });
    const nav = [['Dashboard', 1], ['Start here  3/7', 0], ['Students', 0], ['Academics', 0], ['Results', 0], ['Finance', 0], ['E-Class', 0], ['CBT exams', 0], ['School website', 0], ['Billing', 0], ['Help', 0]];
    nav.forEach(([l, a], i) => {
      const y = 92 + i * 46;
      if (a) d.R(14, y - 4, 220, 40, { f: 'soft', r: 10 });
      d.Icon(30, y + 5, 18, { f: a ? 'primary' : 'soft' }); d.T(62, y + 19, l, { z: 14.5, w: a ? 700 : 500, f: a ? 'primary' : 'ink' });
    });
    d.R(14, 820, 220, 56, { f: 'infoSoft', r: 12 }); d.T(30, 845, 'Need help?', { z: 13, w: 700, f: 'info' }); d.T(30, 863, 'Chat with us on WhatsApp', { z: 12, f: 'info' });
    d.R(248, 0, 1192, 72, { f: 'surface', s: 'line', r: 0 }); d.T(284, 45, 'Dashboard', { z: 22, w: 800 });
    d.Chip(1090, 25, '2026/2027 · First Term', { k: 'info' }); d.Avatar(1368, 36, 18, 'MO'); d.T(1332, 41, '', {});
    d.T(284, 122, 'Good morning, Mrs Okafor', { z: 27, w: 800 }); d.T(284, 146, 'Sample Academy · here is what needs you today', { z: 14, f: 'muted' });
    // get started card
    d.Card(284, 168, 1120, 150, { r: 16 });
    d.T(312, 202, 'Get started: 3 of 7 steps done', { z: 17, w: 800 }); d.Prog(312, 216, 640, 43, { h: 10 });
    d.T(312, 252, 'Next step: add the subjects your school teaches. It takes about 2 minutes.', { z: 13.5, f: 'muted' });
    d.Btn(1168, 196, 208, 46, 'Add subjects  →'); d.T(1272, 266, 'I will set up later', { z: 12.5, f: 'muted', a: 'middle' });
    ['Classes', 'Students', 'Subjects', 'Staff', 'Grading', 'Score parts', 'Sessions'].forEach((l, i) => {
      const cx = 312 + i * 138, done = i < 2, cur = i === 2;
      d.C(cx + 9, 292, 9, { f: done ? 'good' : cur ? 'primary' : 'soft', s: d.wire ? 'line' : null });
      d.T(cx + 24, 296, l, { z: 12.5, w: cur ? 700 : 500, f: cur ? 'primary' : done ? 'ink' : 'muted' });
    });
    d.Note(960, 221, 'One clear next step', { dx: 20, dy: 34 });
    // stats
    const stats = [['Students', '482', '+12 this term', 'good'], ['Staff', '36', 'all signed in', 'muted'], ['Fees collected', '₦4.2M', '78% of target', 'info'], ['Attendance', '91%', '−2% this week', 'warn']];
    stats.forEach(([l, v, s, k], i) => {
      const x = 284 + i * 285, cw = Math.round(s.length * 6.6 + 22);
      d.Card(x, 342, 265, 104, { r: 14 }); d.T(x + 22, 376, l, { z: 13, f: 'muted', w: 600 }); d.T(x + 22, 416, v, { z: 30, w: 800 }); d.Chip(x + 265 - 20 - cw, 392, s, { k });
    });
    // chart + payments
    d.Card(284, 470, 690, 400, { r: 16 }); d.T(312, 506, 'Fees collected this term', { z: 16, w: 800 }); d.T(312, 526, 'Weekly, in ₦ thousands (sample figures)', { z: 12.5, f: 'muted' });
    barChart(d, 316, 566, 626, 230, [210, 340, 280, 460, 390, 520, 410, 610, 560, 700], ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10']);
    d.Card(994, 470, 410, 400, { r: 16 }); d.T(1022, 506, 'Recent payments', { z: 16, w: 800 });
    [['Ada Okafor', 'JSS 2A', '₦45,000', 'Paid', 'good'], ['Tolu Bello', 'SS 1B', '₦30,000', 'Part', 'warn'], ['Emeka Eze', 'JSS 1A', '₦45,000', 'Paid', 'good'], ['Zainab Musa', 'SS 3A', '₦52,500', 'Paid', 'good'], ['Peace Udo', 'PRY 5', '₦25,000', 'Part', 'warn']].forEach(([n, c, a, st, k], i) => {
      const y = 532 + i * 62; d.Ln(1022, y, 1376, y);
      d.Avatar(1042, y + 32, 16, n[0]); d.T(1070, y + 28, n, { z: 13.5, w: 700 }); d.T(1070, y + 46, c + ' · ' + a, { z: 12, f: 'muted' }); d.Chip(1320, y + 20, st, { k });
    });
  },
};

/* ───────────────────────── 2. StudyPat: parent result view (phone) ───────────────────────── */
export const studypatParent = {
  slug: 'studypat-parent-results-mobile', project: 'studypat', pal: 'studypat', W: 390, H: 844, title: 'StudyPat parent result view (phone)',
  draw(d) {
    d.R(0, 0, 390, 168, { f: 'primary', r: 0 });
    d.T(20, 34, '9:41', { z: 13, w: 700, f: 'onPrimary' }); d.T(370, 34, '●●●', { z: 11, f: 'onPrimary', a: 'end' });
    d.T(20, 74, 'Sample Academy', { z: 19, w: 800, f: 'onPrimary' });
    d.R(20, 92, 250, 40, { f: 'surface', r: 20, op: d.wire ? 1 : 0.18, s: d.wire ? 'line' : null }); d.Avatar(40, 112, 14, 'A'); d.T(62, 117, 'Ada Okafor · JSS 2A  ▾', { z: 13.5, w: 600, f: 'onPrimary' });
    d.Card(16, 146, 358, 150, { r: 18 });
    d.T(34, 178, 'First Term · 2026/2027', { z: 12.5, f: 'muted', w: 600 });
    d.T(34, 226, '78.4%', { z: 44, w: 800, f: 'primary' }); d.T(34, 248, 'Average score', { z: 12.5, f: 'muted' });
    d.Ln(206, 186, 206, 276); d.T(228, 214, '3rd', { z: 30, w: 800 }); d.T(228, 236, 'Position in class', { z: 12, f: 'muted' }); d.T(228, 262, 'of 42 pupils', { z: 12.5, w: 600 });
    d.Note(96, 326, 'Clear summary first, detail second', { dx: 14, dy: 0 });
    d.T(20, 330, 'Subjects', { z: 16, w: 800 });
    [['Mathematics', 86, 'A1', 'good'], ['English Language', 78, 'B2', 'good'], ['Basic Science', 81, 'A1', 'good'], ['Civic Education', 72, 'B3', 'info'], ['Computer Studies', 90, 'A1', 'good'], ['Agricultural Sci.', 64, 'C4', 'warn']].forEach(([s, v, g, k], i) => {
      const y = 344 + i * 60; d.Card(16, y, 358, 52, { r: 12 });
      d.T(32, y + 22, s, { z: 13.5, w: 600 }); d.Prog(32, y + 34, 190, v, { h: 6, f: k === 'warn' ? 'accent' : 'primary' });
      d.T(300, y + 31, String(v), { z: 18, w: 800, a: 'end' }); d.Chip(310, y + 15, g, { k });
    });
    d.Btn(16, 716, 358, 52, 'Print report card');
    d.T(195, 788, 'Tip: in the print window choose “Save as PDF”', { z: 12, f: 'muted', a: 'middle' });
    d.R(0, 796, 390, 48, { f: 'surface', s: 'line', r: 0 });
    ['Results', 'Fees', 'Notices', 'Profile'].forEach((l, i) => { const x = 49 + i * 97; d.Icon(x - 8, 804, 16, { f: i === 0 ? 'primary' : 'soft' }); d.T(x, 836, l, { z: 10.5, a: 'middle', f: i === 0 ? 'primary' : 'muted', w: 600 }); });
  },
};

/* ───────────────────────── 3. Chuvor CBT: candidate exam screen ───────────────────────── */
export const cbtExam = {
  slug: 'cbt-candidate-exam-screen', project: 'chuvor-cbt', pal: 'chuvor', W: 1440, H: 900, title: 'Chuvor CBT candidate exam screen',
  draw(d) {
    d.R(0, 0, 1440, 72, { f: 'dark', r: 0 });
    d.T(32, 45, 'CHUVOR CBT', { z: 21, w: 800, f: 'accent' }); d.T(720, 45, 'Mathematics · JSS 3 Mock Examination', { z: 17, w: 700, f: 'onDark', a: 'middle' });
    d.R(1052, 18, 128, 36, { f: 'accent', r: 18 }); d.T(1116, 42, '00:42:18', { z: 17, w: 800, f: 'ink', a: 'middle', mono: true });
    d.Avatar(1230, 36, 18, 'CO'); d.T(1256, 33, 'Chinedu Obi', { z: 13, w: 700, f: 'onDark' }); d.T(1256, 50, '2026/0143', { z: 11.5, f: 'onDark', op: 0.75 });
    d.Card(32, 96, 960, 700, { r: 16 });
    d.T(64, 140, 'Question 7 of 40', { z: 14, w: 700, f: 'muted' }); d.Chip(900, 124, '1 mark', { k: 'info' });
    d.T(64, 210, 'If 3x + 5 = 20, what is the value of x?', { z: 28, w: 700 });
    d.Note(570, 200, 'Large readable question text, one question per screen', { dx: 24, dy: 0 });
    [['A', 'x = 3'], ['B', 'x = 5'], ['C', 'x = 15'], ['D', 'x = 25']].forEach(([k, t], i) => {
      const y = 262 + i * 92, sel = i === 1;
      d.R(64, y, 896, 72, { f: sel ? 'infoSoft' : 'surface', s: sel ? 'info' : 'line', sw: sel ? 2 : 1, r: 14 });
      d.C(104, y + 36, 18, { f: sel ? 'info' : 'soft' }); d.T(104, y + 42, k, { z: 16, w: 800, f: sel ? 'onPrimary' : 'ink', a: 'middle' });
      d.T(144, y + 43, t, { z: 20, w: sel ? 700 : 500 });
    });
    d.Note(400, 356, 'Selected answer is obvious, not only colour (thicker border + filled letter)', { dx: 20, dy: 0 });
    d.Btn(64, 700, 150, 52, '← Previous', { k: 'ghost' }); d.Btn(236, 700, 190, 52, '⚑ Flag for review', { k: 'ghost' }); d.Btn(810, 700, 150, 52, 'Next →');
    d.Card(1024, 96, 384, 700, { r: 16 }); d.T(1052, 140, 'Question palette', { z: 17, w: 800 }); d.Chip(1290, 124, 'Saved', { k: 'good' });
    for (let i = 0; i < 40; i++) {
      const c = i % 8, r = Math.floor(i / 8), x = 1052 + c * 42, y = 168 + r * 46;
      const st = i === 6 ? 'cur' : [2, 11, 19].includes(i) ? 'flag' : i < 12 ? 'ans' : 'no';
      d.R(x, y, 36, 36, { f: st === 'ans' ? 'primary' : st === 'flag' ? 'warnSoft' : st === 'cur' ? 'surface' : 'soft', s: st === 'cur' ? 'accent' : st === 'flag' ? 'warn' : null, sw: 3, r: 8 });
      d.T(x + 18, y + 24, String(i + 1), { z: 13, w: 700, a: 'middle', f: st === 'ans' ? 'onPrimary' : 'ink' });
    }
    [['Answered', 'primary'], ['Flagged', 'warnSoft'], ['Not answered', 'soft']].forEach(([l, f], i) => { d.R(1052, 424 + i * 30, 18, 18, { f, r: 5 }); d.T(1080, 438 + i * 30, l, { z: 13, f: 'muted' }); });
    d.T(1052, 540, '12 answered · 28 left', { z: 14, w: 700 }); d.Prog(1052, 552, 328, 30, { h: 10 });
    d.Btn(1052, 700, 328, 56, 'Submit exam', { k: 'gold', z: 16 }); d.T(1216, 780, 'You can review before submitting', { z: 12, f: 'muted', a: 'middle' });
  },
};

/* ───────────────────────── 4. Chuvor CBT: live monitor ───────────────────────── */
export const cbtMonitor = {
  slug: 'cbt-live-exam-monitor', project: 'chuvor-cbt', pal: 'chuvor', W: 1440, H: 900, title: 'Chuvor CBT live exam monitor',
  draw(d) {
    d.R(0, 0, 1440, 72, { f: 'surface', s: 'line', r: 0 }); d.T(32, 45, 'CHUVOR CBT', { z: 20, w: 800, f: 'primary' }); d.T(190, 45, 'Live monitor · Mathematics JSS 3 Mock · Hall B', { z: 16, w: 600, f: 'muted' });
    d.Chip(1230, 25, '● Live', { k: 'good' }); d.Btn(1300, 16, 108, 40, 'End exam', { k: 'danger', z: 13 });
    [['Connected', '118 / 120', 'info'], ['Writing now', '112', 'good'], ['Submitted', '6', 'muted'], ['Alerts', '2', 'warn']].forEach(([l, v, k], i) => {
      const x = 32 + i * 252; d.Card(x, 96, 232, 92, { r: 14 }); d.T(x + 20, 128, l, { z: 13, f: 'muted', w: 600 }); d.T(x + 20, 168, v, { z: 30, w: 800, f: k === 'warn' ? 'warn' : 'ink' });
    });
    d.T(1060, 126, 'Time left', { z: 13, f: 'muted', w: 600 }); d.T(1060, 168, '00:42:18', { z: 36, w: 800, mono: true }); d.Prog(1230, 150, 178, 62, { h: 10, f: 'accent' });
    const names = ['Chinedu O.', 'Amina Y.', 'Tobi A.', 'Grace E.', 'Ibrahim S.', 'Ngozi U.', 'Femi D.', 'Halima B.', 'Kelechi N.', 'Sade O.', 'Musa K.', 'Joy P.', 'Uche M.', 'Bisi L.', 'Dayo F.', 'Rita C.'];
    names.forEach((n, i) => {
      const c = i % 4, r = Math.floor(i / 4), x = 32 + c * 248, y = 212 + r * 140;
      const st = i === 5 ? 'warn' : i === 9 ? 'sub' : i === 13 ? 'off' : 'ok';
      d.Card(x, y, 232, 124, { r: 14 }); d.Avatar(x + 30, y + 32, 16, n[0]); d.T(x + 54, y + 30, n, { z: 14, w: 700 }); d.T(x + 54, y + 47, `Seat B-${String(i + 1).padStart(2, '0')}`, { z: 12, f: 'muted' });
      const k = { ok: 'good', warn: 'warn', sub: 'muted', off: 'bad' }[st], l = { ok: 'Writing', warn: 'Tab left', sub: 'Submitted', off: 'Offline' }[st];
      d.Chip(x + 140, y + 18, l, { k });
      const p = [62, 45, 71, 38, 55, 29, 80, 66, 100, 51, 74, 43, 0, 58, 69, 35][i]; d.Prog(x + 20, y + 78, 192, p, { h: 8, f: st === 'warn' ? 'accent' : 'primary' });
      d.T(x + 20, y + 106, `${Math.round(p * 0.4)} of 40 answered`, { z: 12, f: 'muted' });
    });
    d.Note(480, 200, 'Status is a word + colour, never colour alone', { dx: 30, dy: 0 });
    d.Card(1040, 212, 368, 548, { r: 16 }); d.T(1068, 250, 'Alerts', { z: 17, w: 800 });
    [['Ngozi U. left the exam tab', '2 min ago', 'warn'], ['Bisi L. went offline', '5 min ago', 'bad'], ['Kelechi N. submitted', '9 min ago', 'good']].forEach(([t, w, k], i) => {
      const y = 276 + i * 84; d.R(1068, y, 312, 70, { f: k + 'Soft', r: 12, s: d.wire ? 'line' : null }); d.T(1084, y + 30, t, { z: 13.5, w: 700, f: k }); d.T(1084, y + 52, w, { z: 12, f: 'muted' });
    });
    d.Btn(1068, 560, 312, 46, '+ Add 10 minutes', { k: 'ghost' }); d.Btn(1068, 618, 312, 46, 'Pause all candidates', { k: 'ghost' }); d.Btn(1068, 676, 312, 46, 'Message the hall', { k: 'soft' });
  },
};

/* ───────────────────────── 5. CBT licence shop: pricing ───────────────────────── */
export const shopPricing = {
  slug: 'licence-shop-pricing', project: 'cbt-licence-shop', pal: 'chuvor', W: 1440, H: 900, title: 'CBT licence shop pricing page',
  draw(d) {
    d.R(0, 0, 1440, 76, { f: 'surface', s: 'line', r: 0 }); d.R(40, 22, 32, 32, { f: 'primary', r: 9 }); d.R(48, 30, 16, 16, { f: 'accent', r: 8 }); d.T(84, 46, 'Chuvor CBT Licences', { z: 19, w: 800 });
    ['Prices', 'Requirements', 'Download', 'Support'].forEach((l, i) => d.T([660, 770, 920, 1030][i], 45, l, { z: 14.5, w: 600, f: i === 0 ? 'primary' : 'muted' })); d.Btn(1240, 17, 160, 44, 'Buy a licence', { z: 14 });
    d.T(120, 190, 'Licences for your', { z: 44, w: 800 }); d.T(120, 244, 'computer-based exam centre', { z: 44, w: 800, f: 'primary' });
    d.T(120, 296, 'Pay online, get your licence file and installer by email in minutes.', { z: 18, f: 'muted' }); d.T(120, 324, 'Works offline in your exam hall. Tied to your computer.', { z: 18, f: 'muted' });
    d.Btn(120, 366, 190, 56, 'See prices', { z: 16 }); d.Btn(326, 366, 210, 56, 'How it works', { k: 'ghost', z: 16 });
    d.Img(820, 112, 520, 340, 'exam hall photo');
    d.Note(160, 396, 'One primary action, one quiet alternative', { dx: 40, dy: 54 });
    [['Starter', 'up to 50 computers', '₦ XX,000', ['Offline exams', 'Auto-marking', 'Email support']], ['Centre', 'up to 150 computers', '₦ XX,000', ['Everything in Starter', 'Live monitor', 'Result reports', 'Priority support']], ['Large', 'up to 500 computers', '₦ XX,000', ['Everything in Centre', 'Multi-hall setup', 'Phone support']]].forEach(([n, s, p, f], i) => {
      const x = 150 + i * 400, mid = i === 1;
      d.Card(x, 500, 360, 350, { r: 18, s: mid ? 'accent' : 'line' }); if (mid) { d.R(x, 500, 360, 8, { f: 'accent', r: 4 }); d.Chip(x + 232, 524, 'Most popular', { k: 'warn' }); }
      d.T(x + 28, 548, n, { z: 22, w: 800 }); d.T(x + 28, 572, s, { z: 13.5, f: 'muted' }); d.T(x + 28, 626, p, { z: 34, w: 800, f: 'primary' }); d.T(x + 28, 650, 'sample price · per term', { z: 12, f: 'muted' });
      f.forEach((t, j) => { d.C(x + 36, 684 + j * 26, 7, { f: 'good', s: d.wire ? 'line' : null }); d.T(x + 52, 689 + j * 26, t, { z: 14 }); });
      d.Btn(x + 28, 790, 304, 44, 'Choose ' + n, { k: mid ? 'gold' : 'ghost', z: 14 });
    });
  },
};

/* ───────────────────────── 6. CBT licence shop: order confirmation ───────────────────────── */
export const shopConfirm = {
  slug: 'licence-shop-order-confirmation', project: 'cbt-licence-shop', pal: 'chuvor', W: 1440, H: 900, title: 'CBT licence shop order confirmation',
  draw(d) {
    d.R(0, 0, 1440, 76, { f: 'surface', s: 'line', r: 0 }); d.R(40, 22, 32, 32, { f: 'primary', r: 9 }); d.R(48, 30, 16, 16, { f: 'accent', r: 8 }); d.T(84, 46, 'Chuvor CBT Licences', { z: 19, w: 800 });
    d.Card(300, 110, 840, 740, { r: 20 });
    d.C(720, 190, 36, { f: 'goodSoft', s: d.wire ? 'line' : null }); d.T(720, 204, '✓', { z: 40, w: 800, f: 'good', a: 'middle' });
    d.T(720, 268, 'Payment confirmed', { z: 30, w: 800, a: 'middle' }); d.T(720, 296, 'Order #CBT-10482 · Centre licence · sample data', { z: 14, f: 'muted', a: 'middle' });
    [['Payment received', 'Verified with the bank'], ['Licence file created', 'Signed and tied to your computer'], ['Email sent', 'to you@example.com']].forEach(([t, s], i) => {
      const y = 340 + i * 64; d.C(360, y + 20, 14, { f: 'good', s: d.wire ? 'line' : null }); d.T(360, y + 26, '✓', { z: 15, w: 800, f: 'onPrimary', a: 'middle' }); if (i < 2) d.Ln(360, y + 36, 360, y + 70, { s: 'line', sw: 2 });
      d.T(390, y + 18, t, { z: 15, w: 700 }); d.T(390, y + 38, s, { z: 13, f: 'muted' });
    });
    d.R(340, 546, 760, 84, { f: 'soft', r: 14, s: d.wire ? 'line' : null }); d.T(366, 580, 'Your licence file', { z: 14, w: 700 }); d.T(366, 604, 'centre-2026-8f21.lic · 2 KB', { z: 13, f: 'muted', mono: true }); d.Btn(900, 566, 176, 44, '⬇ Download', { k: 'primary', z: 14 });
    d.R(340, 644, 760, 84, { f: 'soft', r: 14, s: d.wire ? 'line' : null }); d.T(366, 678, 'Installer · version 2.1', { z: 14, w: 700 }); d.T(366, 702, 'Windows 10/11 · 41 MB', { z: 13, f: 'muted' }); d.Btn(900, 664, 176, 44, '⬇ Download', { k: 'gold', z: 14 });
    d.R(340, 746, 760, 66, { f: 'infoSoft', r: 14 }); d.T(366, 774, 'Need help installing?', { z: 14, w: 700, f: 'info' }); d.T(366, 796, 'Message us on WhatsApp. We reply in working hours.', { z: 13, f: 'info' }); d.Btn(950, 758, 126, 42, 'WhatsApp', { k: 'ghost', z: 13 });
    d.Note(860, 350, 'Progress shown as finished steps', { dx: 14, dy: 0 });
  },
};

/* ───────────────────────── 7. Chuvor Client: desktop app window ───────────────────────── */
export const clientWindow = {
  slug: 'chuvor-client-app-window', project: 'chuvor-client', pal: 'chuvor', W: 1000, H: 840, title: 'Chuvor Client Windows app',
  draw(d) {
    const x = 220, y = 24, w = 560, h = 790;
    d.R(x, y, w, h, { f: 'surface', s: 'line', r: 12, sh: true });
    d.R(x, y, w, 44, { f: 'dark', r: 12 }); d.R(x, y + 24, w, 20, { f: 'dark', r: 0 }); d.T(x + 16, y + 28, 'Chuvor Client', { z: 13, w: 600, f: 'onDark' }); d.T(x + w - 24, y + 29, '—   ☐   ✕', { z: 13, f: 'onDark', a: 'end' });
    d.R(x + 36, y + 70, 44, 44, { f: 'primary', r: 12 }); d.C(x + 58, y + 92, 12, { f: 'bg', s: 'accent', sw: 3 });
    d.T(x + 96, y + 98, 'CHUVOR', { z: 24, w: 800, f: 'primary' }); d.T(x + 216, y + 98, 'CLIENT', { z: 24, w: 800, f: 'accent' });
    d.R(x + 36, y + 138, w - 72, 74, { f: 'goodSoft', r: 14, s: d.wire ? 'line' : null }); d.C(x + 62, y + 175, 8, { f: 'good' });
    d.T(x + 82, y + 170, 'Connected to your company computer', { z: 16, w: 800, f: 'good' }); d.T(x + 82, y + 192, 'Connection quality: Excellent · delay 18 ms', { z: 13, f: 'good' });
    d.T(x + 36, y + 246, 'Subscription active until 30 November 2026 (12 days left)', { z: 13, f: 'muted' }); d.Chip(x + 36, y + 256, 'Renew before it ends', { k: 'warn' });
    d.Btn(x + 36, y + 298, w - 72, 70, 'Open your program', { k: 'gold', z: 19 });
    d.T(x + 36, y + 394, 'Opens your company’s program full screen. When you close it,', { z: 12.5, f: 'muted' }); d.T(x + 36, y + 412, 'the connection ends and nothing stays open on this computer.', { z: 12.5, f: 'muted' });
    d.Note(x + w - 70, y + 335, 'One obvious action', { dx: 100, dy: 0 });
    d.Card(x + 36, y + 440, w - 72, 190, { r: 14 }); d.T(x + 58, y + 474, 'Printing', { z: 16, w: 800 }); d.Chip(x + w - 206, y + 458, 'Fast printing ready', { k: 'good' });
    d.Input(x + 58, y + 500, w - 116, 'Printer on this computer', 'Xprinter XP-80 (receipt)');
    d.Btn(x + 58, y + 574, 190, 42, 'Print a test page', { k: 'ghost', z: 13 }); d.Btn(x + 262, y + 574, 170, 42, 'Check speed', { k: 'ghost', z: 13 });
    d.T(x + 36, y + 668, 'Activity', { z: 13, w: 700, f: 'muted' }); ['09:12  Tunnel up, handshake 4 s ago', '09:12  Company computer reachable', '09:41  Test page printed in 0.4 s'].forEach((t, i) => d.T(x + 36, y + 692 + i * 22, t, { z: 12, f: 'muted', mono: true }));
    d.T(x + 36, y + 772, 'Help · Version 0.9.0', { z: 12, f: 'info' });
  },
};

/* ───────────────────────── 8. Chuvor Client: control panel ───────────────────────── */
export const clientPanel = {
  slug: 'chuvor-client-control-panel', project: 'chuvor-client', pal: 'chuvor', W: 1440, H: 900, title: 'Chuvor Client control panel',
  draw(d) {
    d.R(0, 0, 1440, 72, { f: 'dark', r: 0 }); d.T(32, 45, 'CHUVOR', { z: 20, w: 800, f: 'onDark' }); d.T(122, 45, 'CLIENT', { z: 20, w: 800, f: 'accent' }); d.T(250, 45, 'Sample Trading Ltd', { z: 15, f: 'onDark', op: 0.8 });
    ['Computers', 'Enrolment codes', 'Settings', 'Subscription'].forEach((l, i) => { d.T(560 + i * 150, 45, l, { z: 14.5, w: i === 0 ? 800 : 500, f: i === 0 ? 'accent' : 'onDark' }); }); d.T(1400, 45, 'Admin ▾', { z: 14, f: 'onDark', a: 'end' });
    d.R(32, 96, 1376, 64, { f: 'goodSoft', r: 14, s: d.wire ? 'line' : null }); d.T(56, 124, 'Service active', { z: 16, w: 800, f: 'good' }); d.T(190, 124, 'Paid until 30 Nov 2026 · 12 days left · Business plan · 9 of 15 computers used', { z: 14, f: 'good' }); d.Btn(1252, 108, 132, 40, 'Renew', { z: 14 });
    d.Note(1236, 128, 'Subscription state is always visible, so nothing expires by surprise', { dx: -24, dy: 0 });
    d.Card(32, 190, 940, 660, { r: 16 }); d.T(60, 228, 'Computers', { z: 20, w: 800 }); d.T(60, 250, 'Only approved computers can connect. Revoke one and it is cut off in seconds.', { z: 13, f: 'muted' });
    ['Name', 'Type', 'Status', 'Connects to', 'Last seen', ''].forEach((h, i) => d.T([60, 250, 340, 470, 640, 800][i], 292, h, { z: 12, w: 700, f: 'muted' })); d.Ln(60, 304, 944, 304);
    [['OFFICE-HQ', 'Company', 'Online', 'good', '—', '1 min ago', 'Revoke'], ['ADA-LAPTOP', 'Staff', 'Online', 'good', 'OFFICE-HQ', 'now', 'Revoke'], ['TUNDE-PC', 'Staff', 'Offline', 'muted', 'OFFICE-HQ', '2 h ago', 'Revoke'], ['BRANCH-2', 'Staff', 'Waiting', 'warn', 'OFFICE-HQ', 'just now', 'Approve'], ['KEMI-LAPTOP', 'Staff', 'Online', 'good', 'OFFICE-HQ', 'now', 'Revoke'], ['STORE-PC', 'Staff', 'Revoked', 'bad', '—', '3 d ago', 'Remove']].forEach(([n, t, st, k, c, ls, a], i) => {
      const y = 316 + i * 70; if (i) d.Ln(60, y - 6, 944, y - 6, { s: 'soft' });
      d.T(60, y + 30, n, { z: 14.5, w: 700 }); d.T(250, y + 30, t, { z: 14 }); d.Chip(340, y + 14, st, { k }); d.T(470, y + 30, c, { z: 13.5, f: 'muted' }); d.T(640, y + 30, ls, { z: 13.5, f: 'muted' });
      d.Btn(800, y + 8, 120, 38, a, { k: a === 'Approve' ? 'good' : 'ghost', z: 13 });
    });
    d.Card(1000, 190, 408, 300, { r: 16 }); d.T(1028, 228, 'Add a computer', { z: 18, w: 800 }); d.T(1028, 252, 'Create a one-time code, then type it into', { z: 13, f: 'muted' }); d.T(1028, 270, 'Chuvor Client on the new computer.', { z: 13, f: 'muted' });
    d.R(1028, 292, 352, 62, { f: 'soft', r: 12, s: d.wire ? 'line' : null }); d.T(1204, 333, 'K7Q4-M2XD-9PTA', { z: 24, w: 800, a: 'middle', f: 'primary', mono: true }); d.Btn(1028, 372, 168, 44, 'New staff code', { z: 13 }); d.Btn(1212, 372, 168, 44, 'New company code', { k: 'ghost', z: 13 });
    d.T(1028, 450, 'The code works once and expires in 24 hours.', { z: 12.5, f: 'muted' });
    d.Card(1000, 514, 408, 336, { r: 16 }); d.T(1028, 552, 'Next step', { z: 18, w: 800 }); d.T(1028, 580, 'Set the program your staff open.', { z: 13.5, f: 'muted' });
    d.Input(1028, 612, 352, 'Program to start', 'C:\\Windows\\System32\\notepad.exe', { help: 'Test with Notepad first, then use your real program.' }); d.Btn(1028, 724, 352, 46, 'Save settings');
  },
};

/* ───────────────────────── 9. Virtual lab: desktop ───────────────────────── */
function labScene(d, x, y, w, h) {
  if (d.wire) { d.Img(x, y, w, h, '3D lab viewport (Three.js, render on demand)'); return; }
  d.R(x, y, w, h, { f: 'dark', r: 16 });
  const s = Math.min(1, h / 760), vw = w / s, cx = vw / 2;
  d.out.push(`<g transform="translate(${x},${y}) scale(${s})">`);
  d.R(24, 640, vw - 48, 14, { f: '#8aa0bf', r: 7, op: 0.55 });                                              // bench
  d.R(cx - 9, 80, 18, 380, { f: '#cfe3f7', r: 9, op: 0.9 }); d.R(cx - 9, 250, 18, 210, { f: '#9ecbff', r: 9, op: 0.95 });   // burette + acid
  for (let i = 0; i < 13; i++) d.Ln(cx + 9, 100 + i * 28, cx + (i % 2 ? 20 : 28), 100 + i * 28, { s: '#e8f1fb', sw: 2 });
  d.R(cx - 14, 462, 28, 12, { f: '#e8f1fb', r: 4 }); d.R(cx - 3, 474, 6, 22, { f: '#cfe3f7', r: 3 }); d.C(cx, 512, 5, { f: '#9ecbff' });  // tap, tip, drop
  const fy = 640;                                                                                         // conical flask
  d.out.push(`<path d="M ${cx - 20} ${fy - 150} L ${cx - 20} ${fy - 100} L ${cx - 110} ${fy} L ${cx + 110} ${fy} L ${cx + 20} ${fy - 100} L ${cx + 20} ${fy - 150} Z" fill="#cfe3f7" opacity="0.26" stroke="#cfe3f7" stroke-width="3"/>`);
  d.out.push(`<path d="M ${cx - 66} ${fy - 44} L ${cx + 66} ${fy - 44} L ${cx + 110} ${fy} L ${cx - 110} ${fy} Z" fill="#ff7aa8" opacity="0.85"/>`);
  d.T(cx + 44, 130, 'Burette (50 mL)', { z: 18, f: 'onDark', op: 0.8 }); d.T(cx, fy + 52, 'Conical flask with indicator', { z: 18, f: 'onDark', a: 'middle', op: 0.8 });
  d.out.push('</g>');
  d.T(x + 24, y + 38, 'Chemistry · Titration', { z: 15, w: 700, f: 'onDark' }); d.R(x + w - 168, y + 18, 144, 34, { f: '#ffffff', r: 17, op: 0.12 }); d.T(x + w - 96, y + 41, 'Low graphics  ○', { z: 12.5, w: 600, f: 'onDark', a: 'middle' });
}
export const labDesktop = {
  slug: 'virtual-lab-titration-desktop', project: 'virtual-lab', pal: 'chuvor', W: 1440, H: 900, title: 'Virtual lab titration (desktop)',
  draw(d) {
    d.R(0, 0, 1440, 72, { f: 'surface', s: 'line', r: 0 }); d.T(32, 45, 'Virtual Lab', { z: 20, w: 800, f: 'primary' }); d.T(170, 45, 'Titration: HCl against NaOH · SS 2 Chemistry', { z: 15, f: 'muted' }); d.Chip(1180, 25, 'Time 08:24', { k: 'info' }); d.Btn(1290, 16, 118, 40, 'Submit', { k: 'gold', z: 14 });
    labScene(d, 32, 96, 880, 760);
    d.Note(472, 170, 'Phone-first: one scene, simple controls, a switch for older devices', { dx: 40, dy: -56 });
    d.Card(936, 96, 472, 330, { r: 16 }); d.T(964, 134, 'Steps', { z: 17, w: 800 });
    [['Rinse the burette', 'done'], ['Fill the burette with acid', 'done'], ['Add 25 mL of base to the flask', 'now'], ['Add indicator, then titrate drop by drop', ''], ['Record the readings', '']].forEach(([t, s], i) => {
      const y = 160 + i * 50; d.C(978, y + 16, 12, { f: s === 'done' ? 'good' : s === 'now' ? 'accent' : 'soft', s: d.wire ? 'line' : null }); d.T(978, y + 21, s === 'done' ? '✓' : String(i + 1), { z: 12, w: 800, a: 'middle', f: s === 'done' ? 'onPrimary' : 'ink' });
      d.T(1002, y + 21, t, { z: 14, w: s === 'now' ? 800 : 500, f: s ? 'ink' : 'muted' });
    });
    d.Card(936, 446, 472, 410, { r: 16 }); d.T(964, 484, 'Controls and readings', { z: 17, w: 800 });
    d.T(964, 522, 'Tap speed', { z: 13, w: 600, f: 'muted' }); d.R(964, 534, 416, 8, { f: 'soft', r: 4 }); d.R(964, 534, 150, 8, { f: 'primary', r: 4 }); d.C(1114, 538, 11, { f: 'accent', s: 'primary', sw: 2 });
    d.Btn(964, 570, 200, 50, 'Add a drop'); d.Btn(1180, 570, 200, 50, 'Open tap', { k: 'ghost' });
    [['Initial reading', '0.00 mL'], ['Final reading', '—'], ['Volume used', '—']].forEach(([l, v], i) => { const y = 650 + i * 44; d.Ln(964, y - 8, 1380, y - 8, { s: 'soft' }); d.T(964, y + 14, l, { z: 14 }); d.T(1380, y + 14, v, { z: 15, w: 800, a: 'end', mono: true }); });
    d.Btn(964, 790, 190, 44, '💡 Hint', { k: 'soft', z: 14 }); d.T(1180, 818, 'Formulas appear after a hint', { z: 12, f: 'muted' });
  },
};

/* ───────────────────────── 10. Virtual lab: phone ───────────────────────── */
export const labPhone = {
  slug: 'virtual-lab-titration-mobile', project: 'virtual-lab', pal: 'chuvor', W: 390, H: 844, title: 'Virtual lab titration (phone)',
  draw(d) {
    d.R(0, 0, 390, 64, { f: 'surface', s: 'line', r: 0 }); d.T(20, 40, 'Titration · 08:24', { z: 16, w: 800 }); d.Btn(290, 14, 80, 36, 'Submit', { k: 'gold', z: 13 });
    labScene(d, 12, 76, 366, 430);
    d.Card(0, 520, 390, 324, { r: 22, f: 'surface' });
    d.R(165, 530, 60, 5, { f: 'line', r: 3 }); d.T(20, 570, 'Step 3 of 5', { z: 12.5, w: 700, f: 'muted' }); d.T(20, 594, 'Add 25 mL of base to the flask', { z: 17, w: 800 }); d.Prog(20, 606, 350, 60, { h: 8 });
    d.Btn(20, 636, 168, 54, 'Add a drop'); d.Btn(202, 636, 168, 54, 'Open tap', { k: 'ghost' });
    d.R(20, 706, 350, 56, { f: 'soft', r: 12, s: d.wire ? 'line' : null }); d.T(36, 730, 'Initial', { z: 11.5, f: 'muted' }); d.T(36, 750, '0.00 mL', { z: 15, w: 800, mono: true }); d.T(150, 730, 'Final', { z: 11.5, f: 'muted' }); d.T(150, 750, '—', { z: 15, w: 800 }); d.T(264, 730, 'Volume', { z: 11.5, f: 'muted' }); d.T(264, 750, '—', { z: 15, w: 800 });
    d.Btn(20, 776, 168, 44, '💡 Hint', { k: 'soft', z: 14 }); d.T(280, 804, 'Low graphics  ○', { z: 12.5, w: 600, f: 'muted', a: 'middle' });
    d.Note(30, 552, 'Thumb-reachable controls in a bottom sheet', { dx: 14, dy: 0 });
  },
};

export const SCREENS = [studypatAdmin, studypatParent, cbtExam, cbtMonitor, shopPricing, shopConfirm, clientWindow, clientPanel, labDesktop, labPhone];
