// StudyPat, part B: finance and billing, parents and students, e-learning, website and branding, platform admin, higher education.
import { spShell, tabs, sw, chk, radio, sel, search, pager, kpi, paper, heading, table } from './kit.mjs';

const S = (slug, cat, title, draw, W = 1440, H = 900) => ({ slug, project: 'studypat', cat, pal: 'studypat', W, H, title, draw });
const C4 = '04-finance-and-billing', C5 = '05-parents-and-students', C6 = '06-e-learning-and-exams', C7 = '07-school-website-and-branding', C8 = '08-platform-admin', C9 = '09-higher-education';

function line(d, x, y, w, h, vals, f = 'primary') {
  const max = Math.max(...vals), step = w / (vals.length - 1);
  d.Ln(x, y + h, x + w, y + h);
  [0.33, 0.66, 1].forEach((g) => d.Ln(x, y + h - h * g, x + w, y + h - h * g, { s: 'soft', dash: '3 4' }));
  const pts = vals.map((v, i) => `${x + i * step},${y + h - (v / max) * h}`).join(' ');
  d.out.push(`<polyline points="${pts}" fill="none" stroke="${d.col(f)}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`);
  vals.forEach((v, i) => d.C(x + i * step, y + h - (v / max) * h, 4, { f: 'surface', s: f, sw: 2 }));
}

export const B = [
  /* ───────── 04 finance ───────── */
  S('fee-setup', C4, 'Fee setup', (d) => {
    spShell(d, { active: 'Finance', title: 'Fees', sub: 'What each student owes this term.', action: { label: '+ Add fee', w: 140 } });
    table(d, 284, 156, 740, [{ h: 'FEE', x: 0 }, { h: 'WHO PAYS', x: 260 }, { h: 'AMOUNT', x: 470, a: 'end' }, { h: 'TERM', x: 540 }], [[{ b: 'Tuition' }, { chip: 'All students', k: 'info' }, '₦ 45,000', 'Every term'], [{ b: 'Development levy' }, { chip: 'All students', k: 'info' }, '₦ 10,000', 'First term'], [{ b: 'Uniform' }, { chip: 'New students', k: 'good' }, '₦ 18,000', 'First term'], [{ b: 'Textbook pack' }, { chip: 'Selected', k: 'warn' }, '₦ 22,500', 'First term'], [{ b: 'Excursion' }, { chip: 'Selected', k: 'warn' }, '₦ 5,000', 'Second term']].map((r) => [r[0], r[1], r[2], r[3]]), { rowH: 62, title: 'Fees this term', sub: 'Sample amounts' });
    d.Card(1050, 156, 354, 560, { r: 16 }); heading(d, 1074, 194, 'Add a fee'); d.Input(1074, 226, 306, 'Name', 'Sports wear'); d.Input(1074, 318, 306, 'Amount (₦)', '8,500');
    d.T(1074, 424, 'Who pays this fee?', { z: 12, w: 600, f: 'muted' }); [['Everyone', 0], ['New students only', 1], ['Selected students', 0]].forEach(([t, on], i) => { radio(d, 1088, 456 + i * 36, !!on); d.T(1108, 461 + i * 36, t, { z: 14, w: on ? 700 : 500 }); });
    d.R(1074, 574, 306, 52, { f: 'infoSoft', r: 10 }); d.T(1090, 596, '“New” means joined this term.', { z: 12.5, f: 'info' }); d.T(1090, 614, 'They are not charged again next term.', { z: 12.5, f: 'info' }); d.Btn(1074, 646, 306, 50, 'Save fee');
    d.Note(1360, 474, 'Audience choices spelled out in plain words', { dx: -330, dy: 190 });
  }),

  S('record-payment', C4, 'Record a payment', (d) => {
    spShell(d, { active: 'Finance', title: 'Student fees', sub: 'Ada Okafor · JSS 2A · First Term' });
    d.Card(284, 156, 380, 250, { r: 16 }); d.Avatar(330, 214, 30, 'A'); d.T(376, 208, 'Ada Okafor', { z: 20, w: 800 }); d.T(376, 230, 'SA/26/108 · JSS 2A', { z: 13, f: 'muted' }); d.T(312, 300, 'Balance', { z: 13, f: 'muted' }); d.T(312, 346, '₦ 20,000', { z: 38, w: 800, f: 'bad' }); d.Chip(312, 368, 'Part paid', { k: 'warn' });
    table(d, 690, 156, 714, [{ h: 'FEE', x: 0 }, { h: 'CHARGED', x: 400, a: 'end' }, { h: 'PAID', x: 520, a: 'end' }, { h: 'STATUS', x: 560 }], [['Tuition', '₦ 45,000', '₦ 25,000', { chip: 'Part', k: 'warn' }], ['Development levy', '₦ 10,000', '₦ 10,000', { chip: 'Paid', k: 'good' }], ['Uniform', '₦ 18,000', '₦ 18,000', { chip: 'Paid', k: 'good' }]], { rowH: 56 });
    d.Card(284, 430, 520, 420, { r: 16 }); heading(d, 308, 468, 'Record a payment', 'Paid = recorded. Credit is a payment with no fee.'); d.Input(308, 540, 220, 'Amount (₦)', '20,000'); sel(d, 552, 532, 228, 'Method', 'Bank transfer'); d.Input(308, 630, 220, 'Date', '18 Nov 2026'); d.Input(552, 630, 228, 'Reference', 'TRF-88213'); chk(d, 308, 724, false); d.T(340, 739, 'This is credit (not for a fee)', { z: 14 }); d.Btn(308, 776, 220, 50, 'Save payment', { k: 'gold' }); d.Btn(544, 776, 200, 50, 'Save and print receipt', { k: 'ghost', z: 13.5 });
    table(d, 830, 404, 574, [{ h: 'DATE', x: 0 }, { h: 'AMOUNT', x: 240, a: 'end' }, { h: 'REF', x: 280 }], [['02 Sep', '₦ 25,000', 'POS-4421'], ['11 Oct', '₦ 10,000', 'TRF-7710']], { rowH: 52, title: 'Payments so far' });
    d.R(830, 660, 574, 92, { f: 'infoSoft', r: 14 }); d.T(854, 696, 'Unpaid fees can lock a report card.', { z: 14, w: 700, f: 'info' }); d.T(854, 720, 'You decide in settings. Scratch cards still work.', { z: 13, f: 'info' });
  }),

  S('invoice-receipt', C4, 'Invoice / receipt (A4)', (d) => {
    d.R(0, 0, d.W, d.H, { f: 'soft', r: 0 }); paper(d, 40, 30, 800, 1100);
    d.R(70, 60, 56, 56, { f: 'primary', r: 14 }); d.T(140, 92, 'StudyPat', { z: 22, w: 800 }); d.T(140, 114, 'Sample Academy', { z: 13, f: 'muted' }); d.T(810, 90, 'RECEIPT', { z: 28, w: 800, f: 'primary', a: 'end' }); d.T(810, 114, 'No. R-2026-00418', { z: 13, f: 'muted', a: 'end' });
    d.Ln(70, 150, 810, 150); d.T(70, 190, 'Received from', { z: 12, f: 'muted' }); d.T(70, 214, 'Mr Okafor (parent of Ada Okafor, JSS 2A)', { z: 15, w: 700 }); d.T(810, 190, 'Date', { z: 12, f: 'muted', a: 'end' }); d.T(810, 214, '18 November 2026', { z: 15, w: 700, a: 'end' });
    d.R(70, 256, 740, 38, { f: 'soft', r: 6, s: d.wire ? 'line' : null }); [['Description', 86], ['Amount', 790]].forEach(([h, x], i) => d.T(x, 280, h, { z: 12, w: 800, f: 'muted', a: i ? 'end' : 'start' }));
    [['Tuition: First Term 2026/2027', '₦ 20,000'], ['Balance brought forward', '₦ 0']].forEach(([t, a], i) => { const y = 294 + i * 48; d.Ln(70, y + 48, 810, y + 48, { s: 'soft' }); d.T(86, y + 30, t, { z: 14.5 }); d.T(790, y + 30, a, { z: 14.5, a: 'end' }); });
    d.T(790, 440, 'Paid  ₦ 20,000', { z: 20, w: 800, a: 'end', f: 'good' }); d.T(790, 466, 'Balance  ₦ 0', { z: 14, a: 'end', f: 'muted' });
    d.R(70, 520, 200, 80, { f: 'goodSoft', s: 'good', r: 10, sw: 2, dash: '6 4' }); d.T(170, 570, 'PAID', { z: 30, w: 800, f: 'good', a: 'middle' });
    d.T(70, 680, 'Payment method: Bank transfer · Reference TRF-88213', { z: 13, f: 'muted' }); d.Ln(540, 1000, 800, 1000); d.T(670, 1022, 'Bursar', { z: 12, f: 'muted', a: 'middle' }); d.T(70, 1090, 'Computer generated. Thank you.', { z: 12, f: 'muted' });
    d.Card(870, 30, 330, 200, { r: 16 }); d.T(894, 70, 'Automatic PDF', { z: 17, w: 800 }); d.T(894, 98, 'Every payment makes a receipt', { z: 13, f: 'muted' }); d.T(894, 118, 'that can be emailed or printed.', { z: 13, f: 'muted' }); d.Btn(894, 144, 282, 46, 'Download PDF');
  }, 1240, 1160),

  S('accounting-overview', C4, 'Accounting overview (directors)', (d) => {
    spShell(d, { active: 'Finance', title: 'Accounting overview', sub: 'For directors: what was expected, what came in, what is owed.' });
    [['Expected', '₦ 21.6M', '482 students', 'info'], ['Collected', '₦ 16.8M', '78%', 'good'], ['Outstanding', '₦ 4.8M', '96 owing', 'warn'], ['Inactive owing', '₦ 0.9M', '12 students', 'bad']].forEach(([l, v, s, k], i) => kpi(d, 284 + i * 285, 150, 265, l, v, s, k));
    d.Card(284, 278, 700, 330, { r: 16 }); heading(d, 308, 316, 'Collections by month', '₦ millions, sample figures'); line(d, 330, 360, 620, 190, [1.2, 3.1, 2.4, 4.6, 3.8, 5.9]); ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'].forEach((m, i) => d.T(330 + i * 124, 580, m, { z: 11.5, f: 'muted', a: 'middle' }));
    d.Card(1010, 278, 394, 330, { r: 16 }); heading(d, 1034, 316, 'Owing by class'); [['JSS 1', 70], ['JSS 2', 52], ['JSS 3', 38], ['SS 1', 61], ['SS 2', 28]].forEach(([c, v], i) => { const y = 360 + i * 46; d.T(1034, y + 14, c, { z: 13.5, w: 600 }); d.Prog(1100, y + 4, 230, v, { h: 12, f: 'accent' }); d.T(1380, y + 15, v + '%', { z: 12.5, f: 'muted', a: 'end' }); });
    table(d, 284, 630, 1120, [{ h: 'STUDENT', x: 0 }, { h: 'CLASS', x: 320 }, { h: 'OWES', x: 470, a: 'end' }, { h: 'STATE', x: 540 }, { h: 'LAST PAYMENT', x: 700 }], [[{ av: 'Zainab Musa' }, 'SS 3A', '₦ 52,500', { chip: 'Inactive', k: 'bad' }, '02 Sep'], [{ av: 'Peace Udo' }, 'PRY 5', '₦ 25,000', { chip: 'Active', k: 'warn' }, '11 Oct']], { rowH: 56 });
  }),

  S('subscription-billing', C4, 'Subscription and billing', (d) => {
    spShell(d, { active: 'Billing', title: 'Billing', sub: 'Terms start Inactive until paid. Pay a whole session and save 5%.' });
    d.T(284, 160, 'Sample prices shown. Real prices are set per plan.', { z: 12.5, f: 'muted' });
    [['Free', 'For trying StudyPat', '₦ 0', ['Up to 30 students', 'Results and fees']], ['Standard', 'Most schools', '₦ XXX per student', ['All school features', 'Parent portal', 'CBT exams']], ['Enterprise', 'Large schools', '₦ XXX per student', ['Everything', 'Own domain', 'White label']]].forEach(([n, s, p, f], i) => {
      const x = 284 + i * 380, a = i === 1; d.Card(x, 180, 360, 300, { r: 18, s: a ? 'accent' : 'line' }); if (a) d.Chip(x + 232, 198, 'Current plan', { k: 'warn' });
      d.T(x + 26, 226, n, { z: 22, w: 800 }); d.T(x + 26, 248, s, { z: 13, f: 'muted' }); d.T(x + 26, 300, p, { z: 24, w: 800, f: 'primary' }); f.forEach((t, j) => { d.C(x + 34, 340 + j * 28, 6, { f: 'good', s: d.wire ? 'line' : null }); d.T(x + 50, 345 + j * 28, t, { z: 13.5 }); });
    });
    d.Card(284, 504, 1120, 150, { r: 16, f: 'soft' }); d.T(308, 546, 'Pay this term or the whole session', { z: 18, w: 800 }); d.T(308, 572, 'A whole session is 3 terms paid at once, with 5% off.', { z: 13.5, f: 'muted' }); radio(d, 330, 616, false); d.T(350, 621, 'This term only', { z: 14 }); radio(d, 520, 616, true); d.T(540, 621, 'Whole session (save 5%)', { z: 14, w: 800 }); d.Btn(1180, 560, 200, 54, 'Pay with card', { k: 'gold', z: 15 });
    table(d, 284, 676, 1120, [{ h: 'INVOICE', x: 0 }, { h: 'PERIOD', x: 220 }, { h: 'AMOUNT', x: 560, a: 'end' }, { h: 'STATUS', x: 640 }, { h: '', x: 880 }], [['INV-2026-0112', 'First Term 2026/2027', '₦ XXX,XXX', { chip: 'Paid', k: 'good' }, { btn: 'PDF', w: 70 }]], { rowH: 58 });
  }),

  /* ───────── 05 parents and students ───────── */
  S('parent-fees-mobile', C5, 'Parent: fees and pay (phone)', (d) => {
    d.R(0, 0, 390, 150, { f: 'primary', r: 0 }); d.T(20, 34, '9:41', { z: 13, w: 700, f: 'onPrimary' }); d.T(20, 74, 'Fees', { z: 22, w: 800, f: 'onPrimary' }); d.T(20, 100, 'Ada Okafor · JSS 2A', { z: 13.5, f: 'onPrimary', op: 0.85 });
    d.Card(16, 128, 358, 130, { r: 18 }); d.T(34, 164, 'Balance this term', { z: 12.5, f: 'muted' }); d.T(34, 210, '₦ 20,000', { z: 38, w: 800, f: 'bad' }); d.Chip(34, 222, 'Part paid', { k: 'warn' }); d.Prog(220, 196, 130, 69, { h: 8 }); d.T(220, 218, '69% paid', { z: 12, f: 'muted' });
    [['Tuition', '₦ 45,000', 'Part'], ['Development levy', '₦ 10,000', 'Paid'], ['Uniform', '₦ 18,000', 'Paid']].forEach(([t, a, s], i) => { const y = 286 + i * 64; d.Card(16, y, 358, 56, { r: 12 }); d.T(32, y + 24, t, { z: 14, w: 600 }); d.T(32, y + 44, a, { z: 12, f: 'muted' }); d.Chip(300, y + 17, s, { k: s === 'Paid' ? 'good' : 'warn' }); });
    d.Btn(16, 500, 358, 56, 'Pay ₦ 20,000 now', { k: 'gold', z: 16 }); d.T(195, 584, 'Secure card or bank transfer', { z: 12, f: 'muted', a: 'middle' });
    d.T(20, 630, 'Receipts', { z: 16, w: 800 }); [['02 Sep · ₦ 25,000'], ['11 Oct · ₦ 10,000']].forEach(([t], i) => { const y = 646 + i * 56; d.Card(16, y, 358, 48, { r: 12 }); d.T(32, y + 29, t, { z: 13.5 }); d.T(350, y + 29, 'PDF ›', { z: 13, w: 700, f: 'info', a: 'end' }); });
    d.R(0, 796, 390, 48, { f: 'surface', s: 'line', r: 0 }); ['Results', 'Fees', 'Notices', 'Profile'].forEach((l, i) => { const x = 49 + i * 97; d.Icon(x - 8, 804, 16, { f: i === 1 ? 'primary' : 'soft' }); d.T(x, 836, l, { z: 10.5, a: 'middle', f: i === 1 ? 'primary' : 'muted', w: 600 }); });
  }, 390, 844),

  S('student-dashboard', C5, 'Student dashboard', (d) => {
    spShell(d, { active: 'Dashboard', title: 'My dashboard', chip: 'JSS 2A', user: 'AO', nav: ['Dashboard', 'My results', 'Timetable', 'E-Class', 'Quizzes', 'Notices', 'Profile'] });
    d.T(284, 122, 'Hello, Ada', { z: 27, w: 800 }); d.T(284, 146, 'Here is your day.', { z: 14, f: 'muted' });
    d.Card(284, 176, 560, 330, { r: 16 }); heading(d, 308, 214, 'Today’s timetable', 'Wednesday'); [['08:00', 'Mathematics', 'Mr Bello'], ['09:20', 'English Language', 'Mrs Okafor'], ['11:00', 'Basic Science', 'Mrs Adebayo'], ['12:30', 'Computer Studies', 'Mr Eze']].forEach(([t, s, p], i) => { const y = 256 + i * 60; d.R(308, y, 512, 50, { f: 'bg', s: 'line', r: 12 }); d.T(326, y + 31, t, { z: 14, w: 800, f: 'primary' }); d.T(400, y + 31, s, { z: 14.5, w: 600 }); d.T(800, y + 31, p, { z: 12.5, f: 'muted', a: 'end' }); });
    d.Card(870, 176, 534, 330, { r: 16 }); heading(d, 894, 214, 'To do', 'Assignments and quizzes'); [['Mathematics assignment', 'Due Friday', 'warn'], ['Basic Science quiz', 'Opens Monday', 'info'], ['English essay', 'Submitted to teacher', 'good']].forEach(([t, s, k], i) => { const y = 256 + i * 76; d.R(894, y, 486, 64, { f: 'bg', s: 'line', r: 12 }); d.T(914, y + 28, t, { z: 14.5, w: 700 }); d.T(914, y + 48, s, { z: 12.5, f: 'muted' }); d.Chip(1280, y + 20, k === 'warn' ? 'Due soon' : k === 'info' ? 'Upcoming' : 'Done', { k }); });
    d.Card(284, 530, 1120, 190, { r: 16, f: 'soft' }); heading(d, 308, 568, 'Latest result', 'First Term 2026/2027'); d.T(308, 650, '78.4%', { z: 44, w: 800, f: 'primary' }); d.T(308, 676, 'Average', { z: 13, f: 'muted' }); d.T(520, 650, '3rd', { z: 44, w: 800 }); d.T(520, 676, 'of 42 in class', { z: 13, f: 'muted' }); d.Btn(1180, 590, 200, 50, 'See full result');
  }),

  /* ───────── 06 e-learning and exams ───────── */
  S('e-class-hub', C6, 'E-Class hub', (d) => {
    spShell(d, { active: 'E-Class', title: 'E-Class', sub: 'Lessons, assignments, quizzes and live classes for your classes.', action: { label: '+ New lesson', w: 160 } });
    tabs(d, 284, 160, ['Lessons', 'Assignments', 'Quizzes', 'Live classes', 'Attendance'], 0);
    [['Fractions and decimals', 'Mathematics · JSS 2A', 'Published'], ['The water cycle', 'Basic Science · JSS 2A', 'Published'], ['Essay writing', 'English · JSS 2A', 'Draft'], ['Photosynthesis', 'Biology · SS 1A', 'Published'], ['Intro to spreadsheets', 'Computer · JSS 3A', 'Draft'], ['Map reading', 'Social Studies · JSS 2A', 'Published']].forEach(([t, s, st], i) => {
      const x = 284 + (i % 3) * 380, y = 206 + Math.floor(i / 3) * 250; d.Card(x, y, 360, 230, { r: 16 }); d.Img(x + 16, y + 16, 328, 100, 'lesson cover', { r: 10, op: 0.8 }); d.T(x + 20, y + 146, t, { z: 16, w: 800 }); d.T(x + 20, y + 168, s, { z: 12.5, f: 'muted' }); d.Chip(x + 20, y + 184, st, { k: st === 'Published' ? 'good' : 'warn' }); d.T(x + 340, y + 202, 'Edit ›', { z: 13, w: 700, f: 'info', a: 'end' });
    });
    d.Note(1150, 230, 'Draft and Published always visible', { dx: -250, dy: -20 });
  }),

  S('question-bank-editor', C6, 'Question bank editor (teachers)', (d) => {
    spShell(d, { active: 'CBT exams', title: 'New question', sub: 'Teachers write. The admin approves. The exam software downloads approved sets.', action: { label: 'Submit for approval', w: 210, k: 'gold' } });
    d.Card(284, 160, 700, 690, { r: 16 }); sel(d, 308, 190, 200, 'Subject', 'Mathematics'); sel(d, 528, 190, 200, 'Topic', 'Linear equations'); sel(d, 748, 190, 212, 'Difficulty', 'Medium');
    d.T(308, 292, 'Question', { z: 12, w: 600, f: 'muted' }); d.R(308, 300, 652, 120, { f: 'surface', s: 'line', r: 10, sw: d.wire ? 1.5 : 1 }); d.T(330, 336, 'Solve for x:', { z: 15 }); d.R(330, 352, 300, 44, { f: 'infoSoft', r: 8, s: d.wire ? 'line' : null }); d.T(480, 382, '3x + 5 = 20', { z: 22, w: 600, a: 'middle', mono: true }); d.T(660, 380, '∑  √  π  ÷', { z: 14, f: 'muted' });
    d.T(308, 458, 'Options (tick the right one)', { z: 12, w: 600, f: 'muted' }); [['A', 'x = 3', 0], ['B', 'x = 5', 1], ['C', 'x = 15', 0], ['D', 'x = 25', 0]].forEach(([k, t, on], i) => { const y = 470 + i * 56; d.R(308, y, 652, 46, { f: on ? 'goodSoft' : 'surface', s: on ? 'good' : 'line', r: 10, sw: on ? 2 : 1 }); d.C(336, y + 23, 13, { f: on ? 'good' : 'soft' }); d.T(336, y + 28, k, { z: 12, w: 800, a: 'middle', f: on ? 'onPrimary' : 'ink' }); d.T(364, y + 29, t, { z: 14.5 }); if (on) d.T(940, y + 29, '✓ Correct', { z: 12.5, w: 700, f: 'good', a: 'end' }); });
    d.Btn(308, 710, 160, 44, '+ Add image', { k: 'ghost', z: 13 }); d.T(308, 790, 'Status:', { z: 13, f: 'muted' }); d.Chip(364, 774, 'Draft', { k: 'warn' }); d.T(440, 790, 'Saved a moment ago', { z: 12.5, f: 'muted' });
    d.Card(1010, 160, 394, 690, { r: 16, f: 'soft' }); heading(d, 1034, 198, 'What the candidate sees'); d.R(1034, 236, 346, 300, { f: 'surface', s: 'line', r: 12 }); d.T(1054, 276, 'Question 1 of 40', { z: 12, f: 'muted', w: 700 }); d.T(1054, 312, 'Solve for x: 3x + 5 = 20', { z: 15, w: 700 }); ['x = 3', 'x = 5', 'x = 15', 'x = 25'].forEach((t, i) => { d.R(1054, 336 + i * 44, 306, 36, { f: i === 1 ? 'infoSoft' : 'surface', s: i === 1 ? 'info' : 'line', r: 8 }); d.T(1070, 360 + i * 44, t, { z: 13 }); });
    d.T(1034, 580, 'Review path', { z: 14, w: 800 }); [['Teacher writes', 1], ['Admin approves', 0], ['Exam software downloads', 0]].forEach(([t, a], i) => { d.C(1048, 614 + i * 40, 8, { f: a ? 'accent' : 'soft', s: d.wire ? 'line' : null }); d.T(1068, 619 + i * 40, t, { z: 13.5, w: a ? 800 : 500 }); });
  }),

  /* ───────── 07 website and branding ───────── */
  S('website-builder', C7, 'School website builder', (d) => {
    spShell(d, { active: 'School website', title: 'Your school website', sub: 'Choose sections, colours and pictures. Your site updates when you save.', action: { label: 'Publish', w: 130, k: 'gold' } });
    d.Card(284, 156, 380, 700, { r: 16 }); heading(d, 308, 194, 'Sections'); [['Welcome banner', 1], ['About us', 1], ['Programmes', 1], ['Admission', 1], ['Gallery', 0], ['Testimonials', 0], ['Contact', 1]].forEach(([t, on], i) => { const y = 226 + i * 52; d.R(308, y, 332, 42, { f: 'bg', s: 'line', r: 10 }); d.T(326, y + 27, t, { z: 14, w: on ? 600 : 400, f: on ? 'ink' : 'muted' }); sw(d, 586, y + 9, !!on); });
    d.T(308, 618, 'Brand colour', { z: 13, w: 700 }); ['primary', 'info', 'good', 'accent', 'bad'].forEach((c, i) => d.C(324 + i * 44, 658, 16, { f: c, s: i === 0 ? 'ink' : null, sw: 2 })); d.T(308, 716, 'Logo', { z: 13, w: 700 }); d.R(308, 728, 332, 70, { f: 'soft', r: 10, s: 'line', dash: '5 4' }); d.T(474, 770, 'Upload a logo', { z: 13.5, f: 'muted', a: 'middle' });
    d.Note(640, 250, 'Switches, not code', { dx: 20, dy: -30 });
    d.R(690, 156, 714, 700, { f: 'soft', r: 16 }); d.T(716, 190, 'Preview', { z: 13, w: 700, f: 'muted' });
    d.R(716, 204, 662, 628, { f: 'surface', s: 'line', r: 10 }); d.R(716, 204, 662, 52, { f: 'primary', r: 10 }); d.T(740, 237, 'Sample Academy', { z: 17, w: 800, f: 'onPrimary' }); d.R(716, 246, 662, 10, { f: 'primary', r: 0 });
    d.Img(716, 256, 662, 240, 'welcome banner', { showLabel: false }); d.T(748, 400, 'Raising confident learners', { z: 26, w: 800, f: 'onDark' }); d.Btn(748, 420, 170, 44, 'Apply for admission', { k: 'gold', z: 13 });
    ['Primary', 'Junior secondary', 'Senior secondary'].forEach((t, i) => { const x = 740 + i * 212; d.Card(x, 520, 196, 130, { r: 12 }); d.T(x + 16, 556, t, { z: 14, w: 800 }); d.T(x + 16, 578, 'Ages and subjects', { z: 12, f: 'muted' }); });
  }),

  S('install-app-pwa', C7, 'Install as an app (PWA)', (d) => {
    d.R(0, 0, 390, 844, { f: 'surface', r: 0 }); d.T(20, 34, '9:41', { z: 13, w: 700 }); d.R(16, 56, 358, 44, { f: 'soft', r: 22 }); d.T(195, 84, 'sample-academy.studypat.com', { z: 12.5, f: 'muted', a: 'middle' });
    d.R(0, 120, 390, 110, { f: 'primary', r: 0 }); d.T(20, 168, 'Sample Academy', { z: 22, w: 800, f: 'onPrimary' }); d.T(20, 194, 'Parent portal', { z: 13.5, f: 'onPrimary', op: 0.85 });
    d.Card(16, 252, 358, 250, { r: 18 }); d.R(34, 272, 56, 56, { f: 'primary', r: 14 }); d.T(62, 308, 'SA', { z: 20, w: 800, f: 'onPrimary', a: 'middle' }); d.T(104, 296, 'Install Sample Academy', { z: 16, w: 800 }); d.T(104, 318, 'Open it like any app. Works on a slow line.', { z: 12.5, f: 'muted' });
    d.Btn(34, 354, 322, 50, 'Install app', { k: 'gold', z: 15 }); d.T(195, 430, 'On iPhone: tap Share, then “Add to Home Screen”', { z: 12.5, f: 'muted', a: 'middle' }); d.T(195, 452, 'No app store needed', { z: 12.5, f: 'muted', a: 'middle' });
    d.T(20, 560, 'After installing', { z: 15, w: 800 }); [0, 1, 2, 3].forEach((i) => { const x = 40 + i * 84; d.R(x, 590, 60, 60, { f: i === 0 ? 'primary' : 'soft', r: 16, s: d.wire ? 'line' : null }); d.T(x + 30, 674, ['Sample', 'Phone', 'Camera', 'Notes'][i], { z: 11, f: 'muted', a: 'middle' }); });
    d.R(0, 700, 390, 144, { f: 'bg', r: 0 }); d.T(195, 744, 'Pages always load fresh.', { z: 13.5, w: 700, a: 'middle' }); d.T(195, 768, 'Personal data is never kept offline by mistake.', { z: 12.5, f: 'muted', a: 'middle' });
    d.Note(30, 330, 'Install prompt in the school’s own name and colour', { dx: 20, dy: 220 });
  }, 390, 844),

  S('custom-domain-white-label', C7, 'Custom domain and white label', (d) => {
    spShell(d, { active: 'Billing', title: 'Your own domain', sub: 'Show your school’s name everywhere. Available on the Enterprise plan.' });
    d.Card(284, 156, 700, 360, { r: 16 }); heading(d, 308, 194, 'Domain', 'Point your domain to StudyPat, then press Check'); d.Input(308, 250, 460, 'Your domain', 'portal.sampleacademy.example'); d.Btn(784, 258, 170, 40, 'Check DNS', { k: 'ghost', z: 13.5 });
    d.T(308, 346, 'Add these two records at your domain company', { z: 13, w: 700 }); table(d, 308, 370, 652, [{ h: 'TYPE', x: 0 }, { h: 'NAME', x: 90 }, { h: 'VALUE', x: 220 }], [['A', '@', '203.0.113.10'], ['A', 'www', '203.0.113.10']], { rowH: 36 });
    d.Card(1010, 156, 394, 360, { r: 16 }); heading(d, 1034, 194, 'Progress'); [['DNS points to us', 1], ['Certificate issued', 1], ['Domain active', 0]].forEach(([t, on], i) => { const y = 238 + i * 58; d.C(1048, y + 14, 14, { f: on ? 'good' : 'soft', s: d.wire ? 'line' : null }); d.T(1048, y + 19, on ? '✓' : String(i + 1), { z: 13, w: 800, a: 'middle', f: on ? 'onPrimary' : 'muted' }); d.T(1076, y + 20, t, { z: 14.5, w: on ? 700 : 500 }); if (i < 2) d.Ln(1048, y + 30, 1048, y + 58, { sw: 2 }); });
    d.Card(284, 540, 1120, 230, { r: 16 }); heading(d, 308, 578, 'White label', 'Hide StudyPat from your parents and staff'); sw(d, 1320, 560, true); ['“Powered by StudyPat” footers', 'Report-card footer wording', 'Support wording and email sender', 'Old studypat.com address redirects here'].forEach((t, i) => { d.C(322, 626 + i * 32, 7, { f: 'good', s: d.wire ? 'line' : null }); d.T(342, 631 + i * 32, t, { z: 14 }); });
    d.R(284, 794, 1120, 60, { f: 'infoSoft', r: 14 }); d.T(308, 830, 'White label needs: the switch on, the Enterprise plan, and an active domain. If one is missing, normal branding shows.', { z: 13.5, f: 'info' });
  }),

  /* ───────── 08 platform admin ───────── */
  S('control-centre', C8, 'Control centre (platform owner)', (d) => {
    spShell(d, { active: 'Dashboard', title: 'Control centre', chip: 'All schools', user: 'CI', nav: ['Dashboard', 'Schools', 'Payments', 'Plans', 'Broadcast email', 'Blog', 'School health', 'Settings'] });
    [['Schools', '22', '+3 this week', 'good'], ['Students', '1,840', '+212', 'good'], ['Revenue (month)', '₦ X.XM', 'sample', 'info'], ['Awaiting payment', '5', 'follow up', 'warn']].forEach(([l, v, s, k], i) => kpi(d, 284 + i * 285, 100, 265, l, v, s, k));
    d.Card(284, 226, 700, 320, { r: 16 }); heading(d, 308, 264, 'New schools per week'); line(d, 330, 300, 620, 200, [1, 2, 2, 4, 3, 5, 6, 4, 7]);
    d.Card(1010, 226, 394, 320, { r: 16 }); heading(d, 1034, 264, 'Quick actions'); ['Send broadcast email', 'Review pending payments', 'Open school health', 'Publish a blog post'].forEach((t, i) => d.Btn(1034, 296 + i * 54, 346, 44, t, { k: i ? 'ghost' : 'primary', z: 13.5 }));
    table(d, 284, 570, 1120, [{ h: 'SCHOOL', x: 0 }, { h: 'PLAN', x: 330 }, { h: 'STUDENTS', x: 470 }, { h: 'STATUS', x: 600 }, { h: 'JOINED', x: 760 }], [[{ av: 'Sample Academy' }, 'Standard', '482', { chip: 'Active', k: 'good' }, '2 days ago'], [{ av: 'Bright Future College' }, 'Free', '24', { chip: 'Setup 3/7', k: 'warn' }, '4 days ago'], [{ av: 'Oak Hill School' }, 'Enterprise', '320', { chip: 'Active', k: 'good' }, '6 days ago']], { rowH: 56 });
  }),

  S('schools-list', C8, 'Schools list', (d) => {
    spShell(d, { active: 'Schools', title: 'Schools', chip: 'All schools', user: 'CI', sub: '22 schools registered', nav: ['Dashboard', 'Schools', 'Payments', 'Plans', 'Broadcast email', 'Blog', 'School health', 'Settings'] });
    search(d, 284, 150, 380, 'Search schools'); ['All', 'Active', 'Inactive', 'Free', 'Paid'].forEach((t, i) => d.Chip(690 + i * 86, 160, t, { k: i === 0 ? 'info' : 'muted' }));
    table(d, 284, 212, 1120, [{ h: 'SCHOOL', x: 0 }, { h: 'ADDRESS', x: 300 }, { h: 'PLAN', x: 560 }, { h: 'STUDENTS', x: 680 }, { h: 'TERM', x: 790 }, { h: 'LAST LOGIN', x: 910 }, { h: '', x: 1010 }],
      [['Sample Academy', 'sample-academy', 'Standard', '482', { chip: 'Active', k: 'good' }, 'Today'], ['Bright Future College', 'bright-future', 'Free', '24', { chip: 'Inactive', k: 'warn' }, '3 days ago'], ['Oak Hill School', 'oak-hill', 'Enterprise', '320', { chip: 'Active', k: 'good' }, 'Today'], ['Green Valley Nursery', 'green-valley', 'Free', '41', { chip: 'Active', k: 'good' }, 'Yesterday'], ['St Mark’s College', 'st-marks', 'Standard', '205', { chip: 'Active', k: 'good' }, 'Today'], ['Hope Academy', 'hope-academy', 'Free', '18', { chip: 'Inactive', k: 'warn' }, '9 days ago']].map((r) => [{ av: r[0] }, r[1] + '.studypat.com', r[2], r[3], r[4], r[5], { btn: 'Open', w: 72 }]), { rowH: 58 });
  }),

  S('school-health', C8, 'School health inspection', (d) => {
    spShell(d, { active: 'School health', title: 'School health', chip: 'Sample Academy', user: 'CI', sub: 'Is this school set up well, and what did it do recently?', nav: ['Dashboard', 'Schools', 'Payments', 'Plans', 'Broadcast email', 'Blog', 'School health', 'Settings'] });
    d.Card(284, 150, 540, 420, { r: 16 }); heading(d, 308, 188, 'Checks'); [['Classes created', 'Pass', 'good'], ['Students added', 'Pass', 'good'], ['Subjects linked to teachers', '3 missing', 'warn'], ['Grading scale has no gaps', 'Pass', 'good'], ['Score divisions add up to 100', 'Pass', 'good'], ['Class sizes entered', 'Not set', 'muted'], ['Signed in this week', 'Yes', 'good']].forEach(([t, s, k], i) => { const y = 226 + i * 48; d.Ln(308, y + 40, 800, y + 40, { s: 'soft' }); d.T(308, y + 26, t, { z: 14.5 }); d.Chip(700, y + 8, s, { k }); });
    d.Card(850, 150, 554, 420, { r: 16 }); heading(d, 874, 188, 'Fix what is safe'); d.T(874, 232, '3 subjects have no teacher linked.', { z: 14 }); d.T(874, 254, 'A repair can link them to the class teacher.', { z: 13, f: 'muted' }); d.Btn(874, 280, 200, 46, 'Repair (with undo)', { k: 'gold', z: 14 }); d.R(874, 360, 506, 74, { f: 'infoSoft', r: 12 }); d.T(894, 390, 'Every repair is saved so it can be undone.', { z: 13.5, w: 700, f: 'info' }); d.T(894, 412, 'Automatic repair is off until you switch it on.', { z: 12.5, f: 'info' }); d.T(874, 480, 'Automatic repair', { z: 14.5 }); sw(d, 1336, 462, false);
    table(d, 284, 594, 1120, [{ h: 'TIME', x: 0 }, { h: 'WHO', x: 160 }, { h: 'WHAT', x: 360 }], [['09:12', 'Mrs Eze (Bursar)', 'Recorded a payment of ₦ 20,000'], ['09:05', 'Mr Bello (Teacher)', 'Saved scores for JSS 2A Mathematics'], ['08:51', 'Admin', 'Added 3 students']], { rowH: 46, title: 'Recent activity' });
  }),

  /* ───────── 09 higher education ───────── */
  S('course-registration', C9, 'Course registration', (d) => {
    spShell(d, { active: 'Courses', title: 'Course registration', chip: 'First Semester', nav: ['Dashboard', 'Courses', 'Results', 'Fees', 'Transcript', 'Profile'], sub: 'Mathematics and Computer Science · 200 level' });
    d.R(284, 150, 1120, 56, { f: 'infoSoft', r: 14 }); d.T(308, 184, 'Units chosen: 18 of 24 allowed', { z: 15, w: 800, f: 'info' }); d.Prog(560, 176, 260, 75, { h: 10 });
    table(d, 284, 226, 1120, [{ h: '', x: 0 }, { h: 'CODE', x: 50 }, { h: 'COURSE', x: 180 }, { h: 'UNITS', x: 640 }, { h: 'TYPE', x: 740 }, { h: 'LECTURER', x: 860 }], [[{ chk: true }, 'MTH 201', 'Linear Algebra I', '3', { chip: 'Core', k: 'info' }, 'Dr Okoro'], [{ chk: true }, 'MTH 203', 'Real Analysis I', '3', { chip: 'Core', k: 'info' }, 'Prof Bello'], [{ chk: true }, 'CSC 201', 'Data Structures', '3', { chip: 'Core', k: 'info' }, 'Dr Eze'], [{ chk: true }, 'CSC 203', 'Computer Architecture', '3', { chip: 'Core', k: 'info' }, 'Dr Musa'], [{ chk: true }, 'STA 201', 'Statistics I', '3', { chip: 'Core', k: 'info' }, 'Dr Udo'], [{ chk: false }, 'GST 201', 'Entrepreneurship', '2', { chip: 'Elective', k: 'muted' }, 'Mrs Ade'], [{ chk: true }, 'MTH 205', 'Numerical Methods', '3', { chip: 'Elective', k: 'muted' }, 'Dr Nwosu']], { rowH: 54 });
    d.Btn(1224, 790, 180, 54, 'Submit registration', { k: 'gold', z: 14.5 });
  }),

  S('transcript-gpa', C9, 'Transcript with GPA / CGPA', (d) => {
    d.R(0, 0, d.W, d.H, { f: 'soft', r: 0 }); paper(d, 40, 30, 840, 1100);
    d.T(460, 84, 'SAMPLE UNIVERSITY', { z: 26, w: 800, a: 'middle', f: 'primary' }); d.T(460, 110, 'OFFICIAL ACADEMIC TRANSCRIPT', { z: 13, w: 700, f: 'muted', a: 'middle' }); d.Ln(70, 130, 850, 130);
    d.T(70, 166, 'Name:  Ada Okafor', { z: 14, w: 700 }); d.T(70, 190, 'Matric no.:  SU/22/0148', { z: 13.5, f: 'muted' }); d.T(850, 166, 'Programme:  B.Sc Mathematics and Computer Science', { z: 13.5, a: 'end' }); d.T(850, 190, 'Scale:  5-point', { z: 13.5, f: 'muted', a: 'end' });
    ['2025/2026 · First Semester', '2025/2026 · Second Semester'].forEach((sm, k) => { const y0 = 230 + k * 300; d.R(70, y0, 780, 34, { f: 'soft', r: 6, s: d.wire ? 'line' : null }); d.T(86, y0 + 23, sm, { z: 13, w: 800 }); [['CODE', 86], ['COURSE', 190], ['UNITS', 560], ['SCORE', 640], ['GRADE', 720], ['GP', 800]].forEach(([h, x]) => d.T(x, y0 + 56, h, { z: 11, w: 800, f: 'muted' })); [['MTH 201', 'Linear Algebra I', '3', '78', 'A', '5.0'], ['CSC 201', 'Data Structures', '3', '71', 'A', '5.0'], ['STA 201', 'Statistics I', '3', '64', 'B', '4.0'], ['GST 201', 'Entrepreneurship', '2', '58', 'C', '3.0']].forEach((r, i) => r.forEach((t, j) => d.T([86, 190, 560, 640, 720, 800][j], y0 + 82 + i * 28, t, { z: 13 }))); d.T(850, y0 + 218, k ? 'GPA 4.46   CGPA 4.52' : 'GPA 4.58   CGPA 4.58', { z: 14, w: 800, a: 'end', f: 'primary' }); });
    d.R(70, 860, 780, 70, { f: 'bg', s: 'line', r: 10 }); d.T(90, 890, 'Cumulative GPA: 4.52', { z: 17, w: 800 }); d.T(90, 912, 'Class of degree so far: First Class (on track)', { z: 13, f: 'muted' }); d.Ln(540, 1060, 800, 1060); d.T(670, 1082, 'Registrar', { z: 12, f: 'muted', a: 'middle' });
    d.Card(900, 30, 320, 180, { r: 16 }); d.T(924, 70, 'GPA done for you', { z: 17, w: 800 }); d.T(924, 98, '5-point, 4-point and other scales,', { z: 13, f: 'muted' }); d.T(924, 118, 'with class and standing.', { z: 13, f: 'muted' });
  }, 1260, 1160),
];
