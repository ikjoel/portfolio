// StudyPat, part A: onboarding, people and academics, results and assessment. All data is sample data.
import { spShell, tabs, sw, chk, sel, search, pager, kpi, paper, heading, table } from './kit.mjs';

const S = (slug, cat, title, draw, W = 1440, H = 900) => ({ slug, project: 'studypat', cat, pal: 'studypat', W, H, title, draw });
const C1 = '01-onboarding-and-dashboard', C2 = '02-people-and-academics', C3 = '03-results-and-assessment';

export const A = [
  /* ───────── 01 onboarding ───────── */
  S('landing-page', C1, 'StudyPat landing page', (d) => {
    d.R(0, 0, 1440, 76, { f: 'surface', s: 'line', r: 0 }); d.R(40, 20, 34, 34, { f: 'primary', r: 10 }); d.T(86, 46, 'StudyPat', { z: 21, w: 800 });
    ['Features', 'Demo', 'Pricing', 'Blog', 'Help'].forEach((l, i) => d.T(560 + i * 100, 45, l, { z: 14.5, w: 600, f: 'muted' })); d.Btn(1160, 16, 100, 44, 'Sign in', { k: 'ghost', z: 14 }); d.Btn(1276, 16, 130, 44, 'Register', { z: 14 });
    d.T(100, 190, 'Run your whole school', { z: 48, w: 800 }); d.T(100, 248, 'from one place.', { z: 48, w: 800, f: 'primary' });
    d.T(100, 296, 'Results, fees, parents, teachers, exams and your own school website.', { z: 18, f: 'muted' }); d.T(100, 324, 'Works on any phone. No software to install.', { z: 18, f: 'muted' });
    d.Btn(100, 364, 250, 56, 'Try the demo (30 minutes, free)', { z: 15, k: 'gold' }); d.Btn(366, 364, 220, 56, 'Register your school', { k: 'ghost', z: 15 });
    d.Img(780, 110, 580, 340, 'product screenshot');
    d.Note(480, 392, 'Free demo lowers the risk of signing up', { dx: 30, dy: 50 });
    [['Results', 'CA, exams, report cards'], ['Fees', 'Invoices and receipts'], ['Parents', 'Results on their phone'], ['CBT exams', 'Computer-based tests']].forEach(([t, s], i) => {
      const x = 100 + i * 322; d.Card(x, 500, 300, 150, { r: 16 }); d.R(x + 22, 524, 40, 40, { f: 'soft', s: d.wire ? 'line' : null, r: 12 }); d.T(x + 22, 600, t, { z: 18, w: 800 }); d.T(x + 22, 626, s, { z: 13.5, f: 'muted' });
    });
    d.T(100, 700, 'Choose your path', { z: 20, w: 800 });
    [['Nursery, primary and secondary schools', 'Register your school'], ['Universities, polytechnics and colleges', 'Higher education portal']].forEach(([t, b], i) => {
      const x = 100 + i * 660; d.Card(x, 724, 630, 120, { r: 16 }); d.T(x + 28, 772, t, { z: 17, w: 700 }); d.Btn(x + 28, 790, 220, 38, b + '  →', { k: i ? 'ghost' : 'primary', z: 13 });
    });
  }),

  S('register-school', C1, 'Register a school', (d) => {
    d.R(0, 0, 1440, 76, { f: 'surface', s: 'line', r: 0 }); d.R(40, 20, 34, 34, { f: 'primary', r: 10 }); d.T(86, 46, 'StudyPat', { z: 21, w: 800 });
    d.T(120, 150, 'Register your school', { z: 34, w: 800 }); d.T(120, 182, 'It takes about 3 minutes. No card needed.', { z: 15, f: 'muted' });
    [['1', 'School', 1], ['2', 'You', 0], ['3', 'Done', 0]].forEach(([n, l, a], i) => { const x = 120 + i * 170; d.C(x + 14, 232, 14, { f: a ? 'primary' : 'soft', s: d.wire ? 'line' : null }); d.T(x + 14, 237, n, { z: 13, w: 800, a: 'middle', f: a ? 'onPrimary' : 'muted' }); d.T(x + 38, 237, l, { z: 14, w: a ? 800 : 500, f: a ? 'ink' : 'muted' }); });
    d.Card(120, 270, 720, 560, { r: 18 });
    d.Input(152, 320, 656, 'School name', 'Sample Academy'); d.Input(152, 414, 656, 'Your school address on StudyPat', 'sample-academy', { help: 'Your school will be at sample-academy.studypat.com' });
    d.Input(152, 534, 316, 'School type', 'Primary and secondary'); d.Input(492, 534, 316, 'Phone', '0803 000 0000'); d.Input(152, 628, 656, 'Email', 'principal@example.com');
    d.Btn(152, 740, 656, 54, 'Continue', { z: 16 }); d.T(480, 818, 'By continuing you accept the terms and privacy notice', { z: 12, f: 'muted', a: 'middle' });
    d.Card(880, 270, 440, 300, { r: 18, f: 'soft' }); d.T(912, 320, 'What you get', { z: 18, w: 800 });
    ['Free plan to start', 'Parents see results on their phone', 'Set up in minutes with presets', 'WhatsApp help when you are stuck'].forEach((t, i) => { d.C(924, 366 + i * 44, 8, { f: 'good', s: d.wire ? 'line' : null }); d.T(944, 372 + i * 44, t, { z: 14.5 }); });
    d.Note(808, 440, 'Address preview shown as they type', { dx: 40, dy: 44 });
  }),

  S('sign-in', C1, 'Sign in', (d) => {
    d.R(0, 0, 640, 900, { f: 'primary', r: 0 }); d.R(80, 90, 40, 40, { f: 'surface', r: 12, op: 0.9 }); d.T(134, 120, 'StudyPat', { z: 24, w: 800, f: 'onPrimary' });
    d.T(80, 360, 'Welcome back.', { z: 44, w: 800, f: 'onPrimary' }); d.T(80, 410, 'Results, fees and notices for your school.', { z: 18, f: 'onPrimary', op: 0.85 });
    d.T(800, 200, 'Sign in', { z: 34, w: 800 }); d.T(800, 232, 'Choose who you are', { z: 14, f: 'muted' });
    ['Admin', 'Teacher', 'Parent', 'Student'].forEach((t, i) => { const x = 800 + i * 134, a = i === 2; d.R(x, 256, 122, 44, { f: a ? 'soft' : 'surface', s: a ? 'primary' : 'line', r: 12, sw: a ? 2 : 1 }); d.T(x + 61, 284, t, { z: 14, w: a ? 800 : 500, a: 'middle', f: a ? 'primary' : 'ink' }); });
    d.Input(800, 346, 520, 'Email or phone', 'parent@example.com'); d.Input(800, 440, 520, 'Password', '••••••••••'); d.T(1320, 540, 'Forgot password?', { z: 13, f: 'info', a: 'end' });
    d.Btn(800, 566, 520, 54, 'Sign in', { z: 16 }); d.Ln(800, 660, 1320, 660); d.T(1060, 666, 'or', { z: 12, f: 'muted', a: 'middle' });
    d.Btn(800, 686, 520, 54, 'Continue with Google', { k: 'ghost', z: 15 }); d.T(800, 790, 'New school?  Register your school', { z: 14, f: 'info' });
    d.Note(1100, 282, 'Role picker removes a whole class of login mistakes', { dx: 30, dy: 130 });
  }),

  S('demo-sandbox', C1, 'Private 30-minute demo', (d) => {
    spShell(d, { active: 'Dashboard', title: 'Dashboard', chip: 'Demo school' });
    d.T(284, 122, 'Welcome to the demo', { z: 27, w: 800 }); d.T(284, 146, 'You are exploring a private sample school. Nothing you do here is kept.', { z: 14, f: 'muted' });
    [['Students', '25'], ['Teachers', '8'], ['Classes', '6'], ['Fees collected', '₦1.2M']].forEach(([l, v], i) => kpi(d, 284 + i * 285, 180, 265, l, v));
    d.Card(284, 310, 1120, 420, { r: 16 }); heading(d, 312, 348, 'Try these first', 'A short tour of the features most schools ask about');
    ['Enter scores for a class', 'Open a parent’s result page', 'Record a fee payment', 'Print a report card'].forEach((t, i) => { const y = 400 + i * 70; d.R(312, y, 1064, 58, { f: 'bg', r: 12, s: 'line' }); d.T(336, y + 36, t, { z: 15, w: 600 }); d.Btn(1250, y + 10, 110, 38, 'Open', { k: 'ghost', z: 13 }); });
    d.R(330, 800, 780, 56, { f: 'dark', r: 28, sh: true }); d.T(366, 834, '● Demo · 24:31 left', { z: 14, w: 700, f: 'onDark' }); d.T(560, 834, 'View as: Admin ▾', { z: 13.5, f: 'onDark' }); d.T(730, 834, 'Register your school', { z: 13.5, w: 700, f: 'accent' }); d.T(1000, 834, 'End demo', { z: 13.5, f: 'onDark' });
    d.Note(1112, 828, 'Always-visible countdown, role switcher and exit', { dx: -30, dy: -50 });
  }),

  /* ───────── 02 people and academics ───────── */
  S('students-list', C2, 'Students list', (d) => {
    spShell(d, { active: 'Students', title: 'Students', sub: '482 students in Sample Academy', action: { label: '+ Add student', w: 160 } });
    search(d, 284, 150, 380, 'Search by name or admission number'); sel(d, 684, 142, 200, '', 'All classes'); d.Chip(910, 160, 'Active 470', { k: 'good' }); d.Chip(1006, 160, 'Inactive 12', { k: 'warn' }); d.Chip(1112, 160, 'New this term 24', { k: 'info' });
    const rows = [['Ada Okafor', 'JSS 2A'], ['Tolu Bello', 'SS 1B'], ['Emeka Eze', 'JSS 1A'], ['Zainab Musa', 'SS 3A'], ['Peace Udo', 'PRY 5'], ['Femi Adeyemi', 'JSS 3B'], ['Halima Bala', 'SS 2A'], ['Chidi Nwosu', 'PRY 4']];
    table(d, 284, 212, 1120, [{ h: 'STUDENT', x: 0 }, { h: 'ADMISSION NO.', x: 300 }, { h: 'CLASS', x: 450 }, { h: 'PARENT', x: 550 }, { h: 'FEES', x: 760 }, { h: 'STATUS', x: 880 }, { h: '', x: 1000 }],
      rows.map(([n, c], i) => [{ av: n }, 'SA/26/' + String(101 + i * 7), c, ['Mr Okafor', 'Mrs Bello', 'Mr Eze', 'Mrs Musa', 'Mr Udo', 'Mrs Adeyemi', 'Mr Bala', 'Mrs Nwosu'][i], { chip: i % 3 === 1 ? 'Part paid' : 'Paid', k: i % 3 === 1 ? 'warn' : 'good' }, { chip: i === 6 ? 'Inactive' : 'Active', k: i === 6 ? 'muted' : 'good' }, { btn: 'Open', w: 72 }]), { rowH: 52 });
    pager(d, 308, 868);
  }),

  S('add-student', C2, 'Add a student', (d) => {
    spShell(d, { active: 'Students', title: 'Add student', sub: 'Fill in what you know. You can edit the rest later.' });
    d.Card(284, 156, 1120, 690, { r: 18 });
    d.R(320, 196, 160, 160, { f: 'soft', s: 'line', r: 18, dash: '6 5' }); d.T(400, 270, '+ Photo', { z: 15, w: 700, f: 'primary', a: 'middle' }); d.T(400, 296, 'Tap to upload', { z: 12, f: 'muted', a: 'middle' }); d.T(320, 384, 'Large photos are shrunk', { z: 11.5, f: 'muted' }); d.T(320, 400, 'automatically', { z: 11.5, f: 'muted' });
    d.Input(520, 200, 400, 'First name', 'Ada'); d.Input(944, 200, 400, 'Surname', 'Okafor'); d.Input(520, 296, 400, 'Date of birth', '14 / 03 / 2013'); sel(d, 944, 296, 400, 'Gender', 'Female');
    sel(d, 520, 392, 400, 'Class', 'JSS 2A'); d.Input(944, 392, 400, 'Admission number', 'SA/26/108', { help: 'Leave blank to number automatically' });
    d.Ln(320, 520, 1370, 520); d.T(320, 556, 'Parent or guardian', { z: 16, w: 800 }); d.Input(320, 580, 400, 'Parent name', 'Mr Okafor'); d.Input(744, 580, 300, 'Phone (WhatsApp)', '0803 000 0000'); d.Input(1068, 580, 276, 'Email (optional)', '');
    chk(d, 320, 690, true); d.T(352, 705, 'New student this term (the new-student fees apply)', { z: 14 }); chk(d, 320, 728, true); d.T(352, 743, 'Create a parent login and send the sign-in link', { z: 14 });
    d.Btn(320, 780, 200, 50, 'Save student'); d.Btn(536, 780, 220, 50, 'Save and add another', { k: 'ghost' });
    d.Note(700, 700, 'Tick-boxes explain the effect before saving', { dx: 20, dy: 0 });
  }),

  S('classes-and-subjects', C2, 'Classes and subjects', (d) => {
    spShell(d, { active: 'Academics', title: 'Classes and subjects', sub: 'Create classes first, then subjects, then link teachers.', action: { label: '+ Add class', w: 150 } });
    [['JSS 1', 'A', 42, 'Mrs Okafor'], ['JSS 1', 'B', 40, 'Mr Bello'], ['JSS 2', 'A', 38, 'Mrs Adebayo'], ['JSS 3', 'A', 41, 'Mr Nwosu'], ['SS 1', 'A', 36, 'Mrs Eze'], ['SS 2', 'A', 34, 'Mr Musa']].forEach(([n, a, c, t], i) => {
      const x = 284 + (i % 3) * 270, y = 156 + Math.floor(i / 3) * 190; d.Card(x, y, 250, 170, { r: 16 }); d.T(x + 22, y + 40, n + ' ' + a, { z: 20, w: 800 }); d.Chip(x + 140, y + 22, c + ' pupils', { k: 'info' });
      d.T(x + 22, y + 72, 'Class teacher', { z: 12, f: 'muted' }); d.T(x + 22, y + 92, t, { z: 14.5, w: 600 }); d.Prog(x + 22, y + 116, 206, 70 + i * 4, { h: 6 }); d.T(x + 22, y + 146, 'Subjects linked: ' + (9 + (i % 3)), { z: 12.5, f: 'muted' });
    });
    d.Card(1110, 156, 294, 360, { r: 16 }); heading(d, 1134, 194, 'Subjects', 'Shared by all classes'); ['Mathematics', 'English Language', 'Basic Science', 'Civic Education', 'Computer Studies', 'Agricultural Sci.', '+ Add subject'].forEach((t, i) => { const y = 242 + i * 38; const add = i === 6; d.R(1134, y, 246, 30, { f: add ? 'surface' : 'soft', s: add ? 'primary' : null, r: 15, dash: add ? '4 3' : null }); d.T(1156, y + 20, t, { z: 13, w: add ? 700 : 500, f: add ? 'primary' : 'ink' }); });
    d.Card(284, 548, 820, 300, { r: 16 }); heading(d, 308, 586, 'Teacher assignments', 'Who teaches what, in each class'); ['Mathematics · JSS 1A → Mr Bello', 'English · JSS 1A → Mrs Okafor', 'Basic Science · JSS 2A → Mrs Adebayo'].forEach((t, i) => { const y = 620 + i * 60; d.R(308, y, 772, 48, { f: 'bg', s: 'line', r: 12 }); d.T(330, y + 30, t, { z: 14 }); d.Btn(980, y + 7, 84, 34, 'Change', { k: 'ghost', z: 12.5 }); });
  }),

  S('staff-and-permissions', C2, 'Staff and permissions', (d) => {
    spShell(d, { active: 'Academics', title: 'Staff and permissions', sub: 'Give each person only what they need.', action: { label: '+ Add staff', w: 150 } });
    table(d, 284, 156, 640, [{ h: 'NAME', x: 0 }, { h: 'ROLE', x: 250 }, { h: 'LOGIN', x: 420 }], [[{ av: 'Mrs Okafor', sub: 'Class teacher JSS 1A' }, 'Teacher', { chip: 'Active', k: 'good' }], [{ av: 'Mr Bello', sub: 'Maths' }, 'Teacher', { chip: 'Active', k: 'good' }], [{ av: 'Mrs Eze', sub: 'Bursar' }, 'Sub-admin', { chip: 'Active', k: 'good' }], [{ av: 'Mr Musa', sub: 'Registrar' }, 'Sub-admin', { chip: 'Invited', k: 'warn' }], [{ av: 'Ms Udo', sub: 'Librarian' }, 'Staff', { chip: 'Active', k: 'good' }]], { rowH: 62, title: 'People', sub: 'Teachers, sub-admins and other staff' });
    d.Card(950, 156, 454, 560, { r: 16 }); heading(d, 974, 194, 'What Mrs Eze can do', 'Sub-admin · Bursar'); [['Students', 1], ['Results', 0], ['Finance', 1], ['Billing', 0], ['School website', 0], ['Staff and permissions', 0]].forEach(([t, on], i) => { const y = 252 + i * 62; d.T(974, y + 20, t, { z: 14.5, w: 600 }); sw(d, 1340, y, !!on); d.Ln(974, y + 38, 1380, y + 38, { s: 'soft' }); });
    d.R(974, 640, 406, 56, { f: 'infoSoft', r: 12 }); d.T(992, 664, 'Staff logins open nothing by default.', { z: 13, w: 700, f: 'info' }); d.T(992, 682, 'Switch on only the pages this person needs.', { z: 12.5, f: 'info' });
    d.Note(980, 238, 'Plain-language toggles, not a permissions matrix', { dx: 16, dy: 0 });
  }),

  /* ───────── 03 results and assessment ───────── */
  S('score-input', C3, 'Score input', (d) => {
    spShell(d, { active: 'Results', title: 'Score input', sub: 'JSS 2A · Mathematics · First Term', action: { label: 'Save scores', w: 150, k: 'gold' } });
    d.Chip(284, 150, 'Class: JSS 2A', { k: 'info' }); d.Chip(400, 150, 'Subject: Mathematics', { k: 'info' }); d.Chip(558, 150, 'Parts: ON', { k: 'good' }); d.T(650, 166, 'Type a score. The “/max” beside each box shows the most it can be.', { z: 12.5, f: 'muted' });
    const rows = [['Ada Okafor', 4, 14, 52], ['Tolu Bello', 5, 12, 47], ['Emeka Eze', 3, 15, 55], ['Zainab Musa', 5, 17, 58], ['Peace Udo', 2, 9, 38], ['Femi Adeyemi', 4, 13, 44], ['Halima Bala', 5, 16, 51]];
    table(d, 284, 196, 1120, [{ h: 'STUDENT', x: 0 }, { h: 'CRAFT WORK /5', x: 300 }, { h: 'COGNITIVE TEST /15', x: 450 }, { h: 'CA 2 /20', x: 640 }, { h: 'EXAM /60', x: 780 }, { h: 'TOTAL /100', x: 920 }, { h: 'GRADE', x: 1030 }],
      rows.map(([n, a, b, e], i) => [{ av: n }, { in: a, w: 70 }, { in: b, w: 70 }, { in: 16 - (i % 4), w: 70 }, { in: e, w: 70 }, { b: String(a + b + 16 - (i % 4) + e) }, { chip: ['A1', 'B2', 'A1', 'A1', 'C5', 'B3', 'A1'][i], k: i === 4 ? 'warn' : 'good' }]), { rowH: 58 });
    d.Note(780, 270, 'Each part is its own box, shown under its heading', { dx: -10, dy: -26 });
    d.T(284, 820, 'Excl: tick a student who did not sit this subject so they are left out of positions.', { z: 13, f: 'muted' });
  }),

  S('score-divisions', C3, 'Score divisions', (d) => {
    spShell(d, { active: 'Results', title: 'Score divisions', sub: 'Decide how marks are split between continuous assessment and exam.' });
    d.R(284, 150, 1120, 56, { f: 'goodSoft', r: 14, s: d.wire ? 'line' : null }); d.T(308, 184, '✓  Active divisions add up to 100', { z: 16, w: 800, f: 'good' }); d.T(1380, 184, 'CA 40 + Examination 60', { z: 14, f: 'good', a: 'end' });
    d.Card(284, 230, 540, 330, { r: 16 }); heading(d, 308, 268, 'Continuous assessment · 40', 'Split it into named parts if you like'); [['Craft work', 5], ['Cognitive test', 15], ['CA 2', 20]].forEach(([t, v], i) => { const y = 320 + i * 62; d.R(308, y, 492, 50, { f: 'bg', s: 'line', r: 12 }); d.T(330, y + 31, t, { z: 14.5, w: 600 }); d.R(700, y + 8, 80, 34, { f: 'surface', s: 'line', r: 8 }); d.T(740, y + 31, String(v), { z: 15, w: 800, a: 'middle' }); });
    d.Btn(308, 512, 160, 36, '+ Add a part', { k: 'ghost', z: 13 });
    d.Card(850, 230, 554, 330, { r: 16 }); heading(d, 874, 268, 'Examination · 60', 'One exam score'); d.R(874, 320, 506, 50, { f: 'bg', s: 'line', r: 12 }); d.T(896, 351, 'Examination', { z: 14.5, w: 600 }); d.R(1280, 328, 80, 34, { f: 'surface', s: 'line', r: 8 }); d.T(1320, 351, '60', { z: 15, w: 800, a: 'middle' });
    d.Card(284, 584, 1120, 150, { r: 16 }); d.T(308, 624, 'Switch parts on or off', { z: 16, w: 800 }); d.T(308, 648, 'Off keeps single-number scores and the parts you already set up.', { z: 13, f: 'muted' }); sw(d, 1320, 610, true);
    d.T(308, 696, 'Show a CA total column on the report card', { z: 14 }); sw(d, 1320, 676, false); d.Note(1306, 626, 'Switch with plain explanation, off by default', { dx: -20, dy: 0 });
  }),

  S('grading-scale', C3, 'Grading scale', (d) => {
    spShell(d, { active: 'Results', title: 'Grading', sub: 'Keep it customisable: use a preset, then change anything.', action: { label: 'Save grading', w: 160 } });
    d.Btn(284, 150, 240, 44, 'Use A1–F9 (WAEC style)', { k: 'ghost', z: 13.5 }); d.Btn(540, 150, 180, 44, 'Use A–F', { k: 'ghost', z: 13.5 }); d.R(740, 150, 664, 44, { f: 'goodSoft', r: 12 }); d.T(764, 178, '✓ No gaps: every mark from 0 to 100 has a grade', { z: 14, w: 700, f: 'good' });
    table(d, 284, 214, 740, [{ h: 'GRADE', x: 0 }, { h: 'FROM', x: 120 }, { h: 'TO', x: 240 }, { h: 'REMARK', x: 360 }, { h: 'POINT', x: 620 }], [[{ b: 'A1' }, { in: 75, w: 70 }, { in: 100, w: 70 }, 'Excellent', '1'], [{ b: 'B2' }, { in: 70, w: 70 }, { in: 74, w: 70 }, 'Very good', '2'], [{ b: 'B3' }, { in: 65, w: 70 }, { in: 69, w: 70 }, 'Good', '3'], [{ b: 'C4' }, { in: 60, w: 70 }, { in: 64, w: 70 }, 'Credit', '4'], [{ b: 'C5' }, { in: 55, w: 70 }, { in: 59, w: 70 }, 'Credit', '5'], [{ b: 'F9' }, { in: 0, w: 70 }, { in: 39, w: 70 }, 'Fail', '9']], { rowH: 60 });
    d.Card(1050, 214, 354, 330, { r: 16 }); heading(d, 1074, 252, 'Preview', 'How a score reads'); d.T(1074, 330, '72', { z: 56, w: 800, f: 'primary' }); d.Chip(1074, 350, 'B2 · Very good', { k: 'good' }); d.T(1074, 410, 'Different classes can use', { z: 13, f: 'muted' }); d.T(1074, 430, 'different scales if needed.', { z: 13, f: 'muted' });
  }),

  S('report-card', C3, 'Report card (A4, printable)', (d) => {
    d.R(0, 0, d.W, d.H, { f: 'soft', r: 0 }); paper(d, 40, 30, 840, 1180);
    d.R(40, 30, 840, 130, { f: 'primary', r: 4 }); d.R(70, 56, 70, 70, { f: 'surface', r: 35, op: 0.9 }); d.T(470, 80, 'SAMPLE ACADEMY', { z: 28, w: 800, f: 'onPrimary', a: 'middle' }); d.T(470, 106, '12 Example Road, Lagos · info@example.com', { z: 13, f: 'onPrimary', a: 'middle', op: 0.85 }); d.T(470, 140, 'REPORT CARD · FIRST TERM 2026/2027', { z: 14, w: 700, f: 'accent', a: 'middle' });
    d.R(70, 182, 780, 120, { f: 'bg', s: 'line', r: 10 }); d.Img(84, 192, 80, 100, 'photo', { r: 8 }); [['Name', 'Ada Okafor'], ['Class', 'JSS 2A'], ['Admission no.', 'SA/26/108'], ['Pupils in class', '42'], ['Position', '3rd'], ['Attendance', '58 / 60 days']].forEach(([l, v], i) => { const x = 190 + (i % 3) * 220, y = 214 + Math.floor(i / 3) * 52; d.T(x, y, l, { z: 11.5, f: 'muted' }); d.T(x, y + 20, v, { z: 15, w: 800 }); });
    const cols = [['SUBJECT', 70], ['CA 1', 330], ['CA 2', 390], ['CA TOTAL', 450], ['EXAM', 540], ['TOTAL', 610], ['GRADE', 690], ['REMARK', 760]];
    d.R(70, 326, 780, 36, { f: 'soft', r: 6, s: d.wire ? 'line' : null }); cols.forEach(([h, x]) => d.T(x, 349, h, { z: 11, w: 800, f: 'muted' }));
    ['Mathematics', 'English Language', 'Basic Science', 'Civic Education', 'Computer Studies', 'Agricultural Sci.', 'Social Studies', 'Business Studies', 'Cultural Arts'].forEach((s, i) => { const y = 362 + i * 40, v = [86, 78, 81, 72, 90, 64, 75, 69, 83][i]; if (i) d.Ln(70, y, 850, y, { s: 'soft' }); d.T(70, y + 26, s, { z: 13.5, w: 600 }); [[330, '18'], [390, '17'], [450, '35'], [540, String(v - 35)], [610, String(v)], [690, v >= 75 ? 'A1' : v >= 70 ? 'B2' : v >= 65 ? 'B3' : 'C4']].forEach(([x, t]) => d.T(x, y + 26, t, { z: 13.5, w: x === 610 ? 800 : 400 })); d.T(760, y + 26, v >= 75 ? 'Excellent' : 'Good', { z: 12.5, f: 'muted' }); });
    d.R(70, 740, 380, 92, { f: 'bg', s: 'line', r: 10 }); d.T(88, 770, 'Total 698 / 900', { z: 16, w: 800 }); d.T(88, 796, 'Average 77.6%  ·  Position 3rd', { z: 13.5, f: 'muted' }); d.R(470, 740, 380, 92, { f: 'bg', s: 'line', r: 10 }); d.T(488, 770, 'Grading key', { z: 13, w: 800 }); d.T(488, 794, 'A1 75–100 · B2 70–74 · B3 65–69 · C4 60–64', { z: 12, f: 'muted' }); d.T(488, 812, 'C5 55–59 · C6 50–54 · D7 45–49 · F9 0–39', { z: 12, f: 'muted' });
    d.T(70, 874, 'Class teacher’s comment', { z: 12, w: 700, f: 'muted' }); d.T(70, 898, 'Ada works hard and leads group tasks. Keep it up.', { z: 14 }); d.Ln(70, 930, 450, 930); d.T(70, 950, 'Principal’s comment', { z: 12, w: 700, f: 'muted' }); d.T(70, 974, 'A very good result. Congratulations.', { z: 14 }); d.Ln(70, 1008, 450, 1008);
    d.Ln(110, 1130, 330, 1130); d.T(220, 1150, 'Class teacher', { z: 12, f: 'muted', a: 'middle' }); d.Ln(580, 1130, 800, 1130); d.T(690, 1150, 'Principal', { z: 12, f: 'muted', a: 'middle' });
    d.Card(910, 30, 330, 250, { r: 16 }); d.T(934, 70, 'Print-ready', { z: 17, w: 800 }); d.T(934, 98, 'Parents print or “Save as PDF”', { z: 13, f: 'muted' }); d.T(934, 118, 'from their own browser.', { z: 13, f: 'muted' }); d.Btn(934, 144, 282, 46, 'Print report card'); d.T(934, 222, 'A4 portrait · print stylesheet', { z: 12, f: 'muted' });
  }, 1280, 1240),

  S('result-checker', C3, 'Result checker and print all', (d) => {
    spShell(d, { active: 'Results', title: 'Result checker', sub: 'Pick a class, check results, print the whole class in one click.', action: { label: '🖨 Print all results', w: 200, k: 'gold' } });
    sel(d, 284, 142, 240, 'Session', '2026/2027'); sel(d, 544, 142, 200, 'Term', 'First Term'); sel(d, 764, 142, 240, 'Class (required)', 'JSS 2A'); d.Chip(1030, 176, 'Class: 42 pupils', { k: 'info' });
    d.R(284, 210, 1120, 48, { f: 'infoSoft', r: 12 }); d.T(306, 240, 'Tip: choose a class first. In the print window, choose “Save as PDF” to keep a copy.', { z: 13.5, f: 'info' });
    table(d, 284, 276, 1120, [{ h: 'STUDENT', x: 0 }, { h: 'AVERAGE', x: 360 }, { h: 'POSITION', x: 500 }, { h: 'FEES', x: 640 }, { h: 'REPORT', x: 780 }, { h: '', x: 930 }], [['Ada Okafor', '77.6%', '3rd', { chip: 'Cleared', k: 'good' }, { chip: 'Ready', k: 'good' }, { btn: 'Print', w: 80 }], ['Tolu Bello', '71.2%', '9th', { chip: 'Cleared', k: 'good' }, { chip: 'Ready', k: 'good' }, { btn: 'Print', w: 80 }], ['Emeka Eze', '82.0%', '1st', { chip: 'Cleared', k: 'good' }, { chip: 'Ready', k: 'good' }, { btn: 'Print', w: 80 }], ['Zainab Musa', '64.8%', '17th', { chip: 'Owing', k: 'warn' }, { chip: 'Scratch card needed', k: 'warn' }, { btn: 'Print', w: 80 }], ['Peace Udo', '58.1%', '28th', { chip: 'Cleared', k: 'good' }, { chip: 'Ready', k: 'good' }, { btn: 'Print', w: 80 }]].map((r) => [{ av: r[0] }, ...r.slice(1)]), { rowH: 62 });
  }),
];
