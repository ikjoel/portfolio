// Chuvor CBT, CBT licence shop, Chuvor Client and Virtual Lab: the remaining functions. All data is sample data.
import { topShell, tabs, sw, chk, radio, sel, search, kpi, heading, table } from './kit.mjs';

const X = (project, slug, cat, title, draw, W = 1440, H = 900, pal = 'chuvor') => ({ slug, project, cat, pal, W, H, title, draw });
const cbt = (...a) => X('chuvor-cbt', ...a), shop = (...a) => X('cbt-licence-shop', ...a), cli = (...a) => X('chuvor-client', ...a), lab = (...a) => X('virtual-lab', ...a);

function bars(d, x, y, w, h, vals, labels) {
  const max = Math.max(...vals), gap = w / vals.length, bw = gap * 0.62;
  d.Ln(x, y + h, x + w, y + h);
  vals.forEach((v, i) => { const bh = (v / max) * h; d.R(x + i * gap + (gap - bw) / 2, y + h - bh, bw, bh, { f: i === 3 ? 'accent' : 'primary', r: 4, op: 0.9 }); d.T(x + i * gap + gap / 2, y + h + 18, labels[i], { z: 11, f: 'muted', a: 'middle' }); });
}
const centreCard = (d, w, h, y = 120) => { d.Card((d.W - w) / 2, y, w, h, { r: 20 }); return (d.W - w) / 2; };

export const C = [
  /* ═════════ Chuvor CBT ═════════ */
  cbt('candidate-login', '01-candidate', 'Candidate sign-in and photo check', (d) => {
    d.R(0, 0, 1440, 72, { f: 'dark', r: 0 }); d.T(32, 45, 'CHUVOR', { z: 20, w: 800, f: 'onDark' }); d.T(124, 45, 'CBT', { z: 20, w: 800, f: 'accent' });
    const x = centreCard(d, 640, 700, 110); d.T(720, 180, 'Welcome, candidate', { z: 30, w: 800, a: 'middle' }); d.T(720, 208, 'Enter your details to start. Ask the invigilator if you need help.', { z: 13.5, f: 'muted', a: 'middle' });
    d.Input(x + 56, 250, 528, 'Exam code', 'MTH-JSS3-MOCK'); d.Input(x + 56, 346, 528, 'Candidate number', '2026/0143'); d.Btn(x + 56, 446, 528, 52, 'Find me', { z: 15 });
    d.Ln(x + 56, 530, x + 584, 530); d.T(720, 570, 'Is this you?', { z: 16, w: 800, a: 'middle' }); d.Img(x + 230, 590, 120, 140, 'photo', { r: 10 }); d.T(x + 400, 640, 'Chinedu Obi', { z: 18, w: 800 }); d.T(x + 400, 664, 'JSS 3 · Seat B-01', { z: 13, f: 'muted' });
    d.Btn(x + 56, 764, 250, 50, 'No, tell the invigilator', { k: 'ghost', z: 13.5 }); d.Btn(x + 334, 764, 250, 50, 'Yes, that is me', { k: 'gold', z: 14.5 });
    d.Note(x + 350, 660, 'Photo check stops one candidate sitting for another', { dx: 20, dy: 44 });
  }),
  cbt('exam-instructions', '01-candidate', 'Exam instructions', (d) => {
    d.R(0, 0, 1440, 72, { f: 'dark', r: 0 }); d.T(32, 45, 'CHUVOR CBT', { z: 20, w: 800, f: 'accent' }); d.T(1408, 45, 'Chinedu Obi · 2026/0143', { z: 14, f: 'onDark', a: 'end' });
    const x = centreCard(d, 900, 740, 100); d.T(x + 48, 160, 'Mathematics · JSS 3 Mock', { z: 30, w: 800 });
    [['Questions', '40'], ['Time', '60 minutes'], ['Marks', '40']].forEach(([l, v], i) => { const cx = x + 48 + i * 270; d.R(cx, 186, 250, 78, { f: 'soft', r: 14, s: d.wire ? 'line' : null }); d.T(cx + 20, 216, l, { z: 12.5, f: 'muted', w: 600 }); d.T(cx + 20, 246, v, { z: 22, w: 800, f: 'primary' }); });
    d.T(x + 48, 318, 'Please read carefully', { z: 18, w: 800 }); ['Choose one answer for each question. Click it, and it is saved.', 'Use Next and Previous. Flag a question to come back to it.', 'The timer is at the top. When it ends, your exam is submitted for you.', 'If the computer stops, tell the invigilator. Your answers are kept.', 'Do not leave the exam screen. The invigilator is told if you do.'].forEach((t, i) => { d.C(x + 56, 358 + i * 52, 12, { f: 'accent', s: d.wire ? 'line' : null }); d.T(x + 56, 363 + i * 52, String(i + 1), { z: 12, w: 800, a: 'middle' }); d.T(x + 84, 363 + i * 52, t, { z: 15 }); });
    chk(d, x + 48, 640, true); d.T(x + 80, 656, 'I have read the instructions and I am ready.', { z: 15, w: 600 }); d.Btn(x + 48, 690, 804, 56, 'Start exam', { k: 'gold', z: 17 }); d.Note(x + 300, 314, 'Plain, numbered rules in everyday words', { dx: 20, dy: 0 });
  }),
  cbt('submit-review', '01-candidate', 'Review before submitting', (d) => {
    d.R(0, 0, 1440, 72, { f: 'dark', r: 0 }); d.T(32, 45, 'CHUVOR CBT', { z: 20, w: 800, f: 'accent' }); d.R(1052, 18, 128, 36, { f: 'accent', r: 18 }); d.T(1116, 42, '00:08:41', { z: 17, w: 800, a: 'middle', mono: true });
    const x = centreCard(d, 980, 740, 100); d.T(x + 48, 160, 'Before you submit', { z: 30, w: 800 }); d.T(x + 48, 190, 'You cannot change answers after this.', { z: 14, f: 'muted' });
    [['Answered', '36', 'good'], ['Not answered', '3', 'bad'], ['Flagged', '1', 'warn']].forEach(([l, v, k], i) => { const cx = x + 48 + i * 292; d.R(cx, 220, 272, 90, { f: k + 'Soft', r: 14, s: d.wire ? 'line' : null }); d.T(cx + 22, 252, l, { z: 13, w: 700, f: k }); d.T(cx + 22, 292, v, { z: 32, w: 800, f: k }); });
    d.T(x + 48, 356, 'Questions not answered', { z: 15, w: 800 }); [12, 19, 27].forEach((n, i) => { d.R(x + 48 + i * 70, 372, 58, 52, { f: 'badSoft', s: 'bad', r: 10, sw: 2 }); d.T(x + 77 + i * 70, 406, String(n), { z: 17, w: 800, a: 'middle', f: 'bad' }); });
    d.T(x + 48, 470, 'Flagged for review', { z: 15, w: 800 }); d.R(x + 48, 486, 58, 52, { f: 'warnSoft', s: 'warn', r: 10, sw: 2 }); d.T(x + 77, 520, '31', { z: 17, w: 800, a: 'middle', f: 'warn' });
    d.R(x + 48, 580, 884, 64, { f: 'infoSoft', r: 14 }); d.T(x + 72, 618, 'Tip: click a number to go back to that question, then return here.', { z: 14, f: 'info' });
    d.Btn(x + 48, 672, 300, 56, '← Go back to questions', { k: 'ghost', z: 15 }); d.Btn(x + 632, 672, 300, 56, 'Submit my exam', { k: 'gold', z: 16 }); d.Note(x + 500, 560, 'Counts first, then the exact questions to fix', { dx: 20, dy: 0 });
  }),
  cbt('result-slip', '01-candidate', 'Result slip', (d) => {
    d.R(0, 0, 1440, 72, { f: 'dark', r: 0 }); d.T(32, 45, 'CHUVOR CBT', { z: 20, w: 800, f: 'accent' });
    const x = centreCard(d, 640, 740, 100); d.C(720, 190, 34, { f: 'goodSoft', s: d.wire ? 'line' : null }); d.T(720, 202, '✓', { z: 36, w: 800, f: 'good', a: 'middle' }); d.T(720, 266, 'Exam submitted', { z: 28, w: 800, a: 'middle' }); d.T(720, 292, 'Chinedu Obi · 2026/0143', { z: 14, f: 'muted', a: 'middle' });
    d.R(x + 56, 326, 528, 150, { f: 'soft', r: 16, s: d.wire ? 'line' : null }); d.T(720, 400, '34 / 40', { z: 54, w: 800, f: 'primary', a: 'middle' }); d.T(720, 432, '85%  ·  Grade A', { z: 17, w: 700, a: 'middle' }); d.T(720, 456, 'Mathematics · JSS 3 Mock', { z: 13, f: 'muted', a: 'middle' });
    d.R(x + 56, 504, 160, 160, { f: 'surface', s: 'line', r: 10 }); for (let i = 0; i < 49; i++) if ((i * 7 + i % 5) % 3) d.R(x + 66 + (i % 7) * 20, 514 + Math.floor(i / 7) * 20, 16, 16, { f: 'ink', r: 2 }); d.T(x + 240, 560, 'Scan to check this slip', { z: 15, w: 800 }); d.T(x + 240, 584, 'Valid with the school stamp.', { z: 13, f: 'muted' }); d.T(x + 240, 608, 'Slip no. CBT-2026-0143-M', { z: 12.5, f: 'muted', mono: true });
    d.Btn(x + 56, 700, 250, 50, 'Print slip', { k: 'ghost', z: 14.5 }); d.Btn(x + 334, 700, 250, 50, 'Finish', { z: 14.5 });
  }),
  cbt('exam-setup', '02-exam-centre-admin', 'Exam setup', (d) => {
    topShell(d, { links: ['Exams', 'Question sets', 'Candidates', 'Results', 'Licence'], active: 0, tail: 'Exam officer ▾' });
    d.T(32, 120, 'New exam', { z: 28, w: 800 }); d.T(32, 146, 'Choose what, who and when. You can change it until the exam starts.', { z: 14, f: 'muted' });
    d.Card(32, 176, 860, 660, { r: 16 }); d.Input(60, 214, 804, 'Exam title', 'Mathematics · JSS 3 Mock'); sel(d, 60, 310, 260, 'Class', 'JSS 3'); sel(d, 340, 310, 260, 'Subject', 'Mathematics'); d.Input(620, 306, 244, 'Duration (minutes)', '60');
    sel(d, 60, 406, 400, 'Question set', 'Maths JSS 3 · Term 1 (approved)'); d.Input(480, 402, 384, 'Questions to use', '40 of 120', { help: 'Random pick, different for each candidate' }); sel(d, 60, 502, 260, 'Hall', 'Hall B (120 seats)'); d.Input(340, 498, 260, 'Date', '02 Dec 2026'); d.Input(620, 498, 244, 'Start time', '09:00');
    d.Btn(60, 750, 220, 54, 'Save and schedule', { k: 'gold', z: 15 }); d.Btn(296, 750, 160, 54, 'Cancel', { k: 'ghost', z: 15 });
    d.Card(920, 176, 456, 660, { r: 16 }); heading(d, 944, 214, 'Fairness options'); [['Shuffle questions for each candidate', 1], ['Shuffle the answer options', 1], ['Show one question at a time', 1], ['Allow going back', 1], ['Warn if candidate leaves the tab', 1], ['Show the score at the end', 0]].forEach(([t, on], i) => { const y = 250 + i * 66; d.T(944, y + 22, t, { z: 14 }); sw(d, 1300, y + 4, !!on); d.Ln(944, y + 44, 1352, y + 44, { s: 'soft' }); });
  }),
  cbt('question-import', '02-exam-centre-admin', 'Question import and check', (d) => {
    topShell(d, { links: ['Exams', 'Question sets', 'Candidates', 'Results', 'Licence'], active: 1, tail: 'Exam officer ▾' });
    d.T(32, 120, 'Import questions', { z: 28, w: 800 }); d.T(32, 146, 'Upload a Word or Excel file. We check every row before saving.', { z: 14, f: 'muted' });
    d.R(32, 176, 1376, 120, { f: 'soft', s: 'primary', r: 16, dash: '8 6', sw: 2 }); d.T(720, 232, 'Drop your file here, or click to choose', { z: 18, w: 800, a: 'middle', f: 'primary' }); d.T(720, 260, 'maths-jss3.xlsx · 120 rows found', { z: 13.5, f: 'muted', a: 'middle' });
    d.R(32, 320, 1376, 52, { f: 'warnSoft', r: 12 }); d.T(56, 352, '118 questions are ready. 2 need a fix before they can be saved.', { z: 14.5, w: 700, f: 'warn' }); d.Btn(1208, 326, 180, 40, 'Save 118 good ones', { k: 'gold', z: 13 });
    table(d, 32, 392, 1376, [{ h: 'ROW', x: 0 }, { h: 'QUESTION', x: 70 }, { h: 'CORRECT', x: 660 }, { h: 'CHECK', x: 760 }, { h: '', x: 1180 }], [['14', 'If 3x + 5 = 20, find x', 'B', { chip: 'Ready', k: 'good' }, { btn: 'Preview', w: 90 }], ['15', 'A rectangle has length 12 and width 5…', 'C', { chip: 'Ready', k: 'good' }, { btn: 'Preview', w: 90 }], ['16', 'Simplify 2(x + 3) − x', '—', { chip: 'No correct answer marked', k: 'bad' }, { btn: 'Fix', w: 90, k: 'primary' }], ['17', 'The mean of 4, 8 and 12 is…', 'E', { chip: 'Answer E does not exist (A–D)', k: 'bad' }, { btn: 'Fix', w: 90, k: 'primary' }], ['18', 'Convert 0.75 to a fraction', 'A', { chip: 'Ready', k: 'good' }, { btn: 'Preview', w: 90 }]], { rowH: 56 });
    d.Note(760, 608, 'Errors are named in plain words, per row', { dx: 40, dy: 70 });
  }),
  cbt('theory-marking', '03-results-and-marking', 'Theory marking workspace', (d) => {
    topShell(d, { links: ['Exams', 'Question sets', 'Candidates', 'Results', 'Licence'], active: 3, tail: 'Marker ▾' });
    d.T(32, 118, 'Theory marking · English Essay · JSS 3', { z: 22, w: 800 }); d.Prog(560, 104, 360, 28, { h: 10 }); d.T(940, 114, '34 of 120 marked', { z: 13, f: 'muted' });
    d.Card(32, 150, 860, 690, { r: 16 }); d.Avatar(70, 190, 20, 'C'); d.T(104, 188, 'Candidate 2026/0143', { z: 16, w: 800 }); d.T(104, 208, 'Question 2 · 20 marks', { z: 12.5, f: 'muted' }); d.Chip(780, 176, 'Anonymous mode', { k: 'info' });
    d.T(60, 262, 'Write a letter to your principal asking for a school library.', { z: 15, w: 700 }); d.R(60, 280, 804, 430, { f: 'bg', s: 'line', r: 12 }); ['Dear Sir,', '', 'I am writing to ask that our school builds a', 'library. Many of us have no books at home and', 'a library would help us read and do better in', 'our exams…'].forEach((t, i) => d.T(84, 322 + i * 34, t, { z: 15 })); d.Btn(60, 740, 150, 48, '← Previous', { k: 'ghost', z: 13.5 }); d.Btn(714, 740, 150, 48, 'Save and next →', { z: 13.5 });
    d.Card(918, 150, 490, 690, { r: 16 }); heading(d, 942, 188, 'Marking scheme'); [['Content and ideas', 8], ['Organisation', 4], ['Language and grammar', 6], ['Spelling and punctuation', 2]].forEach(([t, m], i) => { const y = 232 + i * 74; d.T(942, y + 18, t, { z: 14, w: 600 }); d.T(1384, y + 18, '/' + m, { z: 13, f: 'muted', a: 'end' }); d.R(942, y + 30, 442, 34, { f: 'surface', s: 'line', r: 8 }); d.T(962, y + 53, String([6, 3, 4, 1][i]), { z: 15, w: 800 }); });
    d.R(942, 540, 442, 90, { f: 'soft', r: 14, s: d.wire ? 'line' : null }); d.T(962, 574, 'Total', { z: 13, f: 'muted' }); d.T(962, 612, '14 / 20', { z: 30, w: 800, f: 'primary' }); d.Btn(942, 700, 442, 54, 'Save mark', { k: 'gold', z: 15 }); d.T(942, 790, 'Keys: Tab = next box · Ctrl+Enter = save and next', { z: 12.5, f: 'muted' });
  }),
  cbt('results-analysis', '03-results-and-marking', 'Results analysis', (d) => {
    topShell(d, { links: ['Exams', 'Question sets', 'Candidates', 'Results', 'Licence'], active: 3, tail: 'Exam officer ▾' });
    d.T(32, 118, 'Results · Mathematics JSS 3 Mock', { z: 24, w: 800 }); d.Btn(1180, 94, 100, 40, 'Excel', { k: 'ghost', z: 13 }); d.Btn(1296, 94, 112, 40, 'Print', { k: 'ghost', z: 13 });
    [['Candidates', '118'], ['Average score', '61%'], ['Pass rate', '82%'], ['Highest', '97%']].forEach(([l, v], i) => kpi(d, 32 + i * 345, 150, 325, l, v));
    d.Card(32, 276, 700, 300, { r: 16 }); heading(d, 56, 314, 'Score spread', 'How many candidates in each band'); bars(d, 70, 350, 620, 170, [4, 12, 28, 41, 22, 11], ['0–39', '40–49', '50–59', '60–69', '70–79', '80+']);
    table(d, 756, 276, 652, [{ h: 'HARDEST QUESTIONS', x: 0 }, { h: 'CORRECT', x: 460, a: 'end' }, { h: '', x: 500 }], [['Q23 · Simultaneous equations', '31%', { chip: 'Review', k: 'warn' }], ['Q31 · Sets and Venn diagrams', '38%', { chip: 'Review', k: 'warn' }], ['Q09 · Fractions', '94%', { chip: 'Easy', k: 'good' }]], { rowH: 56 });
    table(d, 32, 600, 1376, [{ h: 'CANDIDATE', x: 0 }, { h: 'NUMBER', x: 320 }, { h: 'SCORE', x: 500 }, { h: 'GRADE', x: 640 }, { h: 'POSITION', x: 780 }], [[{ av: 'Amina Yusuf' }, '2026/0112', '39 / 40', { chip: 'A', k: 'good' }, '1st'], [{ av: 'Chinedu Obi' }, '2026/0143', '34 / 40', { chip: 'A', k: 'good' }, '2nd'], [{ av: 'Tobi Adeyemi' }, '2026/0120', '33 / 40', { chip: 'A', k: 'good' }, '3rd']], { rowH: 56 });
  }),
  cbt('licence-activation', '04-setup', 'Licence activation', (d) => {
    topShell(d, { links: ['Exams', 'Question sets', 'Candidates', 'Results', 'Licence'], active: 4, tail: 'Exam officer ▾' });
    d.T(32, 120, 'Licence', { z: 28, w: 800 }); d.T(32, 146, 'Your licence is tied to this computer. Activate it once, even without internet.', { z: 14, f: 'muted' });
    d.Card(32, 176, 700, 330, { r: 16 }); d.T(56, 214, 'This computer', { z: 13, w: 700, f: 'muted' }); d.R(56, 226, 652, 56, { f: 'soft', r: 12, s: d.wire ? 'line' : null }); d.T(76, 262, 'PC-ID  8F21-C07A-5D93', { z: 20, w: 800, mono: true, f: 'primary' }); d.Btn(560, 236, 128, 36, 'Copy', { k: 'ghost', z: 13 });
    d.T(56, 318, 'Licence file', { z: 13, w: 700, f: 'muted' }); d.R(56, 330, 652, 64, { f: 'surface', s: 'primary', r: 12, dash: '6 5', sw: 2 }); d.T(382, 368, 'Choose centre-2026-8f21.lic', { z: 15, w: 700, f: 'primary', a: 'middle' }); d.Btn(56, 424, 240, 52, 'Activate', { k: 'gold', z: 15 });
    d.Card(756, 176, 652, 330, { r: 16 }); heading(d, 780, 214, 'Status'); [['Licence', 'Valid', 'good'], ['Valid until', '31 Dec 2026', 'info'], ['Computers allowed', '150', 'info'], ['Clock check', 'OK', 'good']].forEach(([l, v, k], i) => { const y = 250 + i * 52; d.Ln(780, y + 42, 1384, y + 42, { s: 'soft' }); d.T(780, y + 26, l, { z: 14.5 }); d.Chip(1384 - Math.round(v.length * 6.6 + 22), y + 8, v, { k }); });
    d.R(32, 530, 1376, 64, { f: 'infoSoft', r: 14 }); d.T(56, 568, 'No internet needed. If the licence is for another computer, it will say so and show the PC-ID to send us.', { z: 14, f: 'info' });
  }),

  /* ═════════ CBT licence shop ═════════ */
  shop('requirements-page', '01-storefront', 'Requirements: pick the server PC', (d) => {
    d.R(0, 0, 1440, 76, { f: 'surface', s: 'line', r: 0 }); d.R(40, 22, 32, 32, { f: 'primary', r: 9 }); d.R(48, 30, 16, 16, { f: 'accent', r: 8 }); d.T(84, 46, 'Chuvor CBT Licences', { z: 19, w: 800 }); d.Btn(1240, 17, 160, 44, 'Buy a licence', { z: 14 });
    d.T(120, 150, 'Choosing the right server PC', { z: 38, w: 800 }); d.T(120, 184, 'Pick the number of candidates writing at the same time.', { z: 16, f: 'muted' });
    table(d, 120, 214, 1200, [{ h: 'CANDIDATES AT ONCE', x: 0 }, { h: 'PROCESSOR', x: 280 }, { h: 'MEMORY', x: 560 }, { h: 'STORAGE', x: 700 }], [['1 – 10', 'Core i3, 6th gen', '4 GB', '120 GB SSD'], ['11 – 25', 'Core i3, 6th gen', '8 GB', '120 GB SSD'], ['26 – 50', 'Core i3, 8th gen', '8 GB', '256 GB SSD'], ['51 – 100', 'Core i5, 8th gen', '16 GB', '256 GB SSD'], ['101 – 300', 'Core i7, 11th gen', '16 GB', '512 GB SSD'], ['301 – 500', 'Core i7, 12th gen', '32 GB', '1 TB SSD']].map((r) => [{ b: r[0] }, r[1], r[2], r[3]]), { rowH: 56 });
    d.Card(120, 640, 1200, 150, { r: 16, f: 'soft' }); d.T(150, 676, 'Every size also needs', { z: 18, w: 800 }); ['Windows 10 or 11 (64-bit)', 'A UPS for power cuts', 'A wired Gigabit connection to the server'].forEach((t, i) => { d.C(166, 706 + i * 28, 7, { f: 'good', s: d.wire ? 'line' : null }); d.T(186, 711 + i * 28, t, { z: 15 }); });
    d.Btn(1060, 700, 230, 52, 'Ask on WhatsApp', { k: 'gold', z: 14.5 }); d.Note(300, 270, 'One question answers the whole table', { dx: 60, dy: -44 });
  }),
  shop('checkout-form', '01-storefront', 'Checkout', (d) => {
    d.R(0, 0, 1440, 76, { f: 'surface', s: 'line', r: 0 }); d.R(40, 22, 32, 32, { f: 'primary', r: 9 }); d.R(48, 30, 16, 16, { f: 'accent', r: 8 }); d.T(84, 46, 'Chuvor CBT Licences', { z: 19, w: 800 });
    d.T(180, 150, 'Checkout', { z: 34, w: 800 }); d.Card(180, 180, 700, 640, { r: 18 }); d.Input(212, 224, 636, 'Centre or school name', 'Sample Exam Centre'); d.Input(212, 318, 636, 'Email (we send the licence here)', 'you@example.com'); d.Input(212, 412, 306, 'Phone (WhatsApp)', '0803 000 0000'); d.Input(542, 412, 306, 'Computer ID', '8F21-C07A-5D93', { help: 'Shown in the software under Licence' });
    chk(d, 212, 540, true); d.T(244, 555, 'I understand the licence works on this one computer.', { z: 14 }); chk(d, 212, 580, true); d.T(244, 595, 'I accept the terms and refund policy.', { z: 14 }); d.Btn(212, 650, 636, 58, 'Pay securely', { k: 'gold', z: 17 }); d.T(530, 740, 'Card or bank transfer · verified by the server before delivery', { z: 12.5, f: 'muted', a: 'middle' });
    d.Card(920, 180, 340, 340, { r: 18, f: 'soft' }); heading(d, 944, 218, 'Your order'); d.T(944, 270, 'Centre licence', { z: 16, w: 700 }); d.T(944, 292, 'Up to 150 computers · 1 term', { z: 13, f: 'muted' }); d.Ln(944, 330, 1236, 330); d.T(944, 366, 'Total', { z: 14, f: 'muted' }); d.T(1236, 372, '₦ XX,000', { z: 28, w: 800, f: 'primary', a: 'end' }); d.T(944, 410, 'Sample price', { z: 12, f: 'muted' }); d.R(944, 440, 292, 56, { f: 'goodSoft', r: 12 }); d.T(962, 474, 'Delivered by email in minutes', { z: 13.5, w: 700, f: 'good' });
    d.Note(660, 502, 'Computer ID asked for here, with help, so the licence fits first time', { dx: 20, dy: -70 });
  }),
  shop('orders-admin', '02-owner-admin', 'Orders (owner admin)', (d) => {
    d.R(0, 0, 1440, 72, { f: 'dark', r: 0 }); d.T(32, 45, 'CHUVOR', { z: 20, w: 800, f: 'onDark' }); d.T(124, 45, 'SHOP ADMIN', { z: 20, w: 800, f: 'accent' }); ['Orders', 'Price list', 'Installer', 'Reconcile'].forEach((l, i) => d.T(560 + i * 130, 45, l, { z: 14.5, w: i === 0 ? 800 : 500, f: i === 0 ? 'accent' : 'onDark' }));
    [['Orders today', '6'], ['Paid', '5'], ['Awaiting', '1'], ['Needs a look', '0']].forEach(([l, v], i) => kpi(d, 32 + i * 345, 100, 325, l, v));
    d.R(32, 226, 1376, 52, { f: 'goodSoft', r: 12 }); d.T(56, 258, '✓ Reconciliation ran at 03:00. Every paid order was delivered.', { z: 14, w: 700, f: 'good' }); d.Btn(1228, 232, 160, 40, 'Run now', { k: 'ghost', z: 13 });
    table(d, 32, 298, 1376, [{ h: 'ORDER', x: 0 }, { h: 'CENTRE', x: 170 }, { h: 'PLAN', x: 540 }, { h: 'AMOUNT', x: 760, a: 'end' }, { h: 'PAYMENT', x: 830 }, { h: 'DELIVERY', x: 980 }, { h: '', x: 1140 }], [['CBT-10482', 'Sample Exam Centre', 'Centre', '₦ XX,000', { chip: 'Paid', k: 'good' }, { chip: 'Sent', k: 'good' }, { btn: 'Resend', w: 90 }], ['CBT-10481', 'Bright Future College', 'Starter', '₦ XX,000', { chip: 'Paid', k: 'good' }, { chip: 'Sent', k: 'good' }, { btn: 'Resend', w: 90 }], ['CBT-10480', 'Oak Hill School', 'Large', '₦ XX,000', { chip: 'Awaiting', k: 'warn' }, { chip: 'Not yet', k: 'muted' }, { btn: 'Check', w: 90 }], ['CBT-10479', 'Hope Academy', 'Starter', '₦ XX,000', { chip: 'Paid', k: 'good' }, { chip: 'Sent', k: 'good' }, { btn: 'Resend', w: 90 }]], { rowH: 58 });
  }),

  /* ═════════ Chuvor Client ═════════ */
  cli('enrol-computer', '01-staff-app', 'Enrol this computer', (d) => {
    d.R(0, 0, d.W, d.H, { f: 'bg', r: 0 }); const x = 220, y = 24, w = 560, h = 790; d.R(x, y, w, h, { f: 'surface', s: 'line', r: 12, sh: true }); d.R(x, y, w, 44, { f: 'dark', r: 12 }); d.R(x, y + 24, w, 20, { f: 'dark', r: 0 }); d.T(x + 16, y + 28, 'Chuvor Client', { z: 13, w: 600, f: 'onDark' });
    d.R(x + 36, y + 70, 44, 44, { f: 'primary', r: 12 }); d.C(x + 58, y + 92, 12, { f: 'bg', s: 'accent', sw: 3 }); d.T(x + 96, y + 98, 'CHUVOR', { z: 24, w: 800, f: 'primary' }); d.T(x + 216, y + 98, 'CLIENT', { z: 24, w: 800, f: 'accent' });
    d.T(x + 36, y + 166, 'Connect this computer', { z: 24, w: 800 }); d.T(x + 36, y + 192, 'Ask your company administrator for a one-time code.', { z: 13.5, f: 'muted' });
    d.Input(x + 36, y + 226, w - 72, 'Enrolment code', 'K7Q4-M2XD-9PTA', { help: 'The code works once and expires in 24 hours.' }); d.Input(x + 36, y + 330, w - 72, 'Name of this computer', 'ADA-LAPTOP', { help: 'Shown to your administrator when approving.' });
    d.Btn(x + 36, y + 440, w - 72, 58, 'Connect', { k: 'gold', z: 17 });
    [['1', 'Enter the code', 1], ['2', 'Wait for approval', 0], ['3', 'Open your program', 0]].forEach(([n, t, a], i) => { const cy = y + 560 + i * 54; d.C(x + 52, cy, 14, { f: a ? 'accent' : 'soft', s: d.wire ? 'line' : null }); d.T(x + 52, cy + 5, n, { z: 13, w: 800, a: 'middle' }); d.T(x + 78, cy + 5, t, { z: 14.5, w: a ? 800 : 500, f: a ? 'ink' : 'muted' }); });
    d.T(x + 36, y + 772, 'Help · Version 0.9.0', { z: 12, f: 'info' });
  }, 1000, 840),
  cli('settings-page', '02-company-admin', 'Company settings', (d) => {
    d.R(0, 0, 1440, 72, { f: 'dark', r: 0 }); d.T(32, 45, 'CHUVOR', { z: 20, w: 800, f: 'onDark' }); d.T(122, 45, 'CLIENT', { z: 20, w: 800, f: 'accent' }); d.T(250, 45, 'Sample Trading Ltd', { z: 15, f: 'onDark', op: 0.8 }); ['Computers', 'Enrolment codes', 'Settings', 'Subscription'].forEach((l, i) => d.T(560 + i * 150, 45, l, { z: 14.5, w: i === 2 ? 800 : 500, f: i === 2 ? 'accent' : 'onDark' }));
    d.T(32, 126, 'Settings', { z: 28, w: 800 }); d.T(32, 152, 'Every setting has a short explanation underneath.', { z: 14, f: 'muted' });
    d.Card(32, 180, 700, 330, { r: 16 }); heading(d, 56, 218, 'Your program'); d.Input(56, 246, 652, 'Name of your program', 'Accounting'); d.Input(56, 340, 652, 'Program to start', 'C:\\Program Files\\Accounts\\accounts.exe', { help: 'Copy it from the program’s shortcut > Properties > Target.' }); d.Btn(56, 442, 200, 46, 'Test with Notepad', { k: 'ghost', z: 13.5 });
    d.Card(32, 534, 700, 300, { r: 16 }); heading(d, 56, 572, 'Picture quality'); [['Speed', 'Smoothest on a slow line', 0], ['Balanced', 'Good for most offices', 1], ['Quality', 'Sharpest picture', 0]].forEach(([t, s, on], i) => { const y = 606 + i * 70; d.R(56, y, 652, 60, { f: on ? 'infoSoft' : 'surface', s: on ? 'info' : 'line', r: 12, sw: on ? 2 : 1 }); radio(d, 84, y + 30, !!on); d.T(108, y + 27, t, { z: 15, w: 800 }); d.T(108, y + 46, s, { z: 12.5, f: 'muted' }); });
    d.Card(756, 180, 652, 654, { r: 16 }); heading(d, 780, 218, 'Printing and sharing'); [['Fast receipt and document printing', 'Prints go straight to each person’s own printer.', 1], ['Allow clipboard (copy and paste)', 'Off keeps company data in the company computer.', 0], ['Allow drives and files', 'Off stops files leaving the company computer.', 0], ['Direct connection when possible', 'Can make the screen faster. Try it on one person first.', 0]].forEach(([t, s, on], i) => { const y = 252 + i * 100; d.T(780, y + 20, t, { z: 15, w: 700 }); d.T(780, y + 42, s, { z: 12.5, f: 'muted' }); sw(d, 1332, y + 4, !!on); d.Ln(780, y + 74, 1384, y + 74, { s: 'soft' }); });
    d.Btn(780, 700, 604, 54, 'Save settings', { z: 15.5 }); d.Note(1330, 290, 'Every switch says what it does and what “off” means', { dx: -380, dy: 410 });
  }),
  cli('platform-customers', '03-platform-owner', 'Platform: customers (owner)', (d) => {
    d.R(0, 0, 1440, 72, { f: 'dark', r: 0 }); d.T(32, 45, 'CHUVOR', { z: 20, w: 800, f: 'onDark' }); d.T(122, 45, 'PLATFORM', { z: 20, w: 800, f: 'accent' }); ['Customers', 'Plans', 'Payments', 'Hub'].forEach((l, i) => d.T(560 + i * 130, 45, l, { z: 14.5, w: i === 0 ? 800 : 500, f: i === 0 ? 'accent' : 'onDark' })); d.T(1408, 45, 'Owner ▾', { z: 14, f: 'onDark', a: 'end' });
    [['Customers', '14'], ['Active', '11'], ['Ending in 14 days', '2'], ['In grace', '1']].forEach(([l, v], i) => kpi(d, 32 + i * 345, 100, 325, l, v));
    d.Btn(1228, 226, 180, 44, '+ Add a customer', { z: 14 }); d.T(32, 252, 'Customers', { z: 22, w: 800 });
    table(d, 32, 282, 1376, [{ h: 'COMPANY', x: 0 }, { h: 'PLAN', x: 340 }, { h: 'COMPUTERS', x: 480 }, { h: 'PAID UNTIL', x: 640 }, { h: 'STATE', x: 810 }, { h: '', x: 1180 }], [['Sample Trading Ltd', 'Business', '9 of 15', '30 Nov 2026', { chip: 'Ending soon', k: 'warn' }, { btn: 'Open', w: 80 }], ['Greenfield Pharmacy', 'Starter', '4 of 5', '14 Jan 2027', { chip: 'Active', k: 'good' }, { btn: 'Open', w: 80 }], ['Lagos Logistics', 'Enterprise', '32 of 50', '02 Feb 2027', { chip: 'Active', k: 'good' }, { btn: 'Open', w: 80 }], ['City Stores', 'Starter', '5 of 5', '10 Nov 2026', { chip: 'Grace (3 days)', k: 'bad' }, { btn: 'Open', w: 80 }]].map((r) => [{ av: r[0] }, ...r.slice(1)]), { rowH: 60 });
    d.Note(900, 540, 'State is computed from dates, so it is always right', { dx: 30, dy: 90 });
  }),
  cli('platform-plans', '03-platform-owner', 'Platform: plans and pricing', (d) => {
    d.R(0, 0, 1440, 72, { f: 'dark', r: 0 }); d.T(32, 45, 'CHUVOR', { z: 20, w: 800, f: 'onDark' }); d.T(122, 45, 'PLATFORM', { z: 20, w: 800, f: 'accent' }); ['Customers', 'Plans', 'Payments', 'Hub'].forEach((l, i) => d.T(560 + i * 130, 45, l, { z: 14.5, w: i === 1 ? 800 : 500, f: i === 1 ? 'accent' : 'onDark' }));
    d.T(32, 126, 'Plans and pricing', { z: 28, w: 800 }); d.T(32, 152, 'A plan with no price is not for sale online. Sample values shown.', { z: 14, f: 'muted' });
    [['Starter', 'up to 5 computers'], ['Business', 'up to 15 computers'], ['Enterprise', 'up to 50 computers']].forEach(([n, s], i) => { const x = 32 + i * 460; d.Card(x, 184, 440, 450, { r: 18 }); d.T(x + 28, 228, n, { z: 24, w: 800 }); d.T(x + 28, 252, s, { z: 13.5, f: 'muted' }); d.Input(x + 28, 280, 384, 'Price per month (₦)', 'XX,XXX'); d.Input(x + 28, 374, 184, 'Computers', String([5, 15, 50][i])); d.Input(x + 228, 374, 184, 'Grace days', '7'); sw(d, x + 340, 482, i < 2); d.T(x + 28, 500, 'For sale online', { z: 14 }); d.Btn(x + 28, 548, 384, 50, 'Save ' + n, { k: 'ghost', z: 14 }); });
    d.R(32, 660, 1376, 60, { f: 'warnSoft', r: 14 }); d.T(56, 696, 'Changing a price never changes what current customers already paid.', { z: 14, w: 700, f: 'warn' });
  }),
  cli('order-page', '04-ordering', 'Order page (new customer)', (d) => {
    d.R(0, 0, 1440, 76, { f: 'dark', r: 0 }); d.T(40, 48, 'CHUVOR', { z: 21, w: 800, f: 'onDark' }); d.T(136, 48, 'CLIENT', { z: 21, w: 800, f: 'accent' });
    d.T(720, 160, 'Secure access to your company computer', { z: 36, w: 800, a: 'middle' }); d.T(720, 194, 'Choose a plan, pay, and start the same day.', { z: 16, f: 'muted', a: 'middle' });
    [['Starter', 'up to 5', '₦ XX,XXX'], ['Business', 'up to 15', '₦ XX,XXX'], ['Enterprise', 'up to 50', '₦ XX,XXX']].forEach(([n, c, p], i) => { const x = 180 + i * 380, a = i === 1; d.Card(x, 240, 360, 360, { r: 18, s: a ? 'accent' : 'line' }); d.T(x + 28, 284, n, { z: 22, w: 800 }); d.T(x + 28, 308, c + ' computers', { z: 13.5, f: 'muted' }); d.T(x + 28, 370, p, { z: 34, w: 800, f: 'primary' }); d.T(x + 28, 394, 'per month (sample)', { z: 12.5, f: 'muted' }); ['Secure private tunnel', 'Fast receipt printing', 'Approved computers only'].forEach((t, j) => { d.C(x + 36, 436 + j * 28, 6, { f: 'good', s: d.wire ? 'line' : null }); d.T(x + 52, 441 + j * 28, t, { z: 13.5 }); }); d.Btn(x + 28, 540, 304, 46, 'Choose ' + n, { k: a ? 'gold' : 'ghost', z: 14 }); });
    d.T(720, 650, 'Not sure? Start with a 14-day trial. Ask us on WhatsApp.', { z: 15, f: 'muted', a: 'middle' }); d.Btn(590, 676, 260, 52, 'Message us', { k: 'ghost', z: 14.5 });
    d.R(180, 770, 1080, 70, { f: 'infoSoft', r: 14 }); d.T(210, 812, 'After payment you get your administrator login on screen once. Save it. We also help you set up.', { z: 14, f: 'info' });
  }),

  /* ═════════ Virtual Lab ═════════ */
  lab('ohms-law-desktop', '01-student', 'Ohm’s law practical (desktop)', (d) => {
    d.R(0, 0, 1440, 72, { f: 'surface', s: 'line', r: 0 }); d.T(32, 45, 'Virtual Lab', { z: 20, w: 800, f: 'primary' }); d.T(170, 45, 'Ohm’s law · SS 2 Physics', { z: 15, f: 'muted' }); d.Chip(1180, 25, 'Time 12:05', { k: 'info' }); d.Btn(1290, 16, 118, 40, 'Submit', { k: 'gold', z: 14 });
    if (d.wire) d.Img(32, 96, 800, 400, '3D bench: battery, resistor, ammeter, voltmeter'); else { d.R(32, 96, 800, 400, { f: 'dark', r: 16 }); d.R(120, 240, 620, 8, { f: '#cfe3f7', r: 4, op: 0.6 }); d.R(120, 240, 8, 160, { f: '#cfe3f7', r: 4, op: 0.6 }); d.R(120, 392, 620, 8, { f: '#cfe3f7', r: 4, op: 0.6 }); d.R(732, 240, 8, 160, { f: '#cfe3f7', r: 4, op: 0.6 }); d.R(190, 214, 70, 54, { f: 'accent', r: 8 }); d.T(225, 246, 'Cell', { z: 13, w: 700, a: 'middle', f: 'ink' }); d.R(420, 220, 120, 40, { f: '#ffb26b', r: 8 }); d.T(480, 246, 'R = ? Ω', { z: 14, w: 800, a: 'middle', f: 'ink' }); d.C(330, 396, 34, { f: '#ffffff', op: 0.92 }); d.T(330, 402, 'A', { z: 22, w: 800, a: 'middle', f: 'ink' }); d.C(640, 320, 34, { f: '#ffffff', op: 0.92 }); d.T(640, 326, 'V', { z: 22, w: 800, a: 'middle', f: 'ink' }); d.T(56, 134, 'Physics · Ohm’s law', { z: 15, w: 700, f: 'onDark' }); }
    d.Card(32, 516, 800, 340, { r: 16 }); heading(d, 56, 554, 'Voltage against current', 'Plot as you record. The slope is the resistance.'); d.Ln(100, 600, 100, 810); d.Ln(100, 810, 780, 810); [[1, 0.5], [2, 1.0], [3, 1.4], [4, 2.1], [5, 2.5]].forEach(([v, i]) => d.C(100 + v * 130, 810 - i * 80, 6, { f: 'primary', s: d.wire ? 'line' : null })); d.Ln(100, 810, 750, 590, { s: 'accent', sw: 2, dash: '6 4' }); d.T(440, 840, 'Current I (A)', { z: 12, f: 'muted', a: 'middle' });
    d.Card(856, 96, 552, 360, { r: 16 }); heading(d, 880, 134, 'Controls'); d.T(880, 182, 'Voltage', { z: 13, w: 600, f: 'muted' }); d.R(880, 194, 504, 8, { f: 'soft', r: 4 }); d.R(880, 194, 220, 8, { f: 'primary', r: 4 }); d.C(1100, 198, 11, { f: 'accent', s: 'primary', sw: 2 }); d.T(1384, 182, '3.0 V', { z: 15, w: 800, a: 'end', mono: true }); d.Btn(880, 240, 240, 52, 'Record reading'); d.Btn(1136, 240, 248, 52, 'Clear last', { k: 'ghost' }); d.Btn(880, 314, 180, 46, '💡 Hint', { k: 'soft', z: 14 }); d.T(1080, 342, 'Formulas appear after a hint', { z: 12.5, f: 'muted' });
    table(d, 856, 476, 552, [{ h: 'V (volts)', x: 0 }, { h: 'I (amps)', x: 220 }, { h: 'V ÷ I', x: 420 }], [['1.0', '0.50', '—'], ['2.0', '1.00', '—'], ['3.0', '1.40', '—']], { rowH: 44 });
  }),
  lab('practical-marking', '01-student', 'Practical marking breakdown', (d) => {
    d.R(0, 0, 1440, 72, { f: 'surface', s: 'line', r: 0 }); d.T(32, 45, 'Virtual Lab', { z: 20, w: 800, f: 'primary' }); d.T(170, 45, 'Result · Titration', { z: 15, f: 'muted' });
    d.Card(320, 110, 800, 740, { r: 20 }); d.T(720, 200, 'Your mark', { z: 16, f: 'muted', a: 'middle' }); d.T(720, 280, '16 / 20', { z: 64, w: 800, f: 'primary', a: 'middle' }); d.Chip(660, 306, 'Well done', { k: 'good' });
    [['Readings recorded', 5, 6], ['Gradient / calculation', 5, 6], ['Final answer', 4, 5], ['Conclusion', 2, 3]].forEach(([t, s, m], i) => { const y = 380 + i * 82; d.T(360, y + 20, t, { z: 15, w: 600 }); d.T(1080, y + 20, `${s} / ${m}`, { z: 15, w: 800, a: 'end' }); d.Prog(360, y + 34, 720, (s / m) * 100, { h: 10, f: s === m ? 'good' : 'primary' }); });
    d.R(360, 720, 720, 80, { f: 'infoSoft', r: 14 }); d.T(384, 752, 'Each student gets different hidden values,', { z: 13.5, w: 700, f: 'info' }); d.T(384, 774, 'so answers cannot be copied from a friend.', { z: 13.5, f: 'info' });
  }),
  lab('assign-practical', '02-teacher', 'Teacher: assign a practical', (d) => {
    d.R(0, 0, 1440, 72, { f: 'surface', s: 'line', r: 0 }); d.T(32, 45, 'Virtual Lab', { z: 20, w: 800, f: 'primary' }); d.T(170, 45, 'Teacher', { z: 15, f: 'muted' });
    d.T(32, 126, 'Assign a practical', { z: 28, w: 800 }); d.T(32, 152, 'Pick the experiment, the class and the due date.', { z: 14, f: 'muted' });
    [['Titration', 'Chemistry · SS 2', 1], ['Ohm’s law', 'Physics · SS 2', 0], ['Simple pendulum', 'Physics · SS 1', 0]].forEach(([t, s, on], i) => { const x = 32 + i * 330; d.Card(x, 184, 310, 170, { r: 16, s: on ? 'accent' : 'line' }); d.Img(x + 16, 200, 278, 70, 'experiment', { r: 10, op: 0.8 }); d.T(x + 20, 304, t, { z: 17, w: 800 }); d.T(x + 20, 326, s, { z: 12.5, f: 'muted' }); if (on) d.Chip(x + 218, 290, 'Selected', { k: 'warn' }); });
    d.Card(32, 378, 980, 360, { r: 16 }); sel(d, 56, 404, 300, 'Class', 'SS 2A (36 students)'); d.Input(376, 400, 300, 'Due date', '05 Dec 2026'); d.Input(696, 400, 292, 'Time allowed (minutes)', '30'); chk(d, 56, 520, true); d.T(88, 535, 'Give each student different hidden values', { z: 14.5, w: 600 }); chk(d, 56, 566, true); d.T(88, 581, 'Mark automatically out of 20', { z: 14.5, w: 600 }); chk(d, 56, 612, false); d.T(88, 627, 'Send the mark to CA myself, after checking', { z: 14.5, w: 600 }); d.Btn(56, 670, 220, 50, 'Assign to class', { k: 'gold', z: 15 });
    d.Card(1036, 184, 372, 554, { r: 16, f: 'soft' }); heading(d, 1060, 222, 'What students see'); d.T(1060, 262, 'Titration · due 05 Dec', { z: 15, w: 700 }); d.T(1060, 284, '30 minutes · 20 marks', { z: 13, f: 'muted' }); d.Btn(1060, 310, 324, 46, 'Start practical', { z: 14 });
  }),
  lab('class-practical-results', '02-teacher', 'Teacher: class practical results', (d) => {
    d.R(0, 0, 1440, 72, { f: 'surface', s: 'line', r: 0 }); d.T(32, 45, 'Virtual Lab', { z: 20, w: 800, f: 'primary' }); d.T(170, 45, 'Teacher', { z: 15, f: 'muted' });
    d.T(32, 126, 'Titration · SS 2A', { z: 28, w: 800 }); d.Btn(1180, 100, 228, 46, 'Send marks to CA', { k: 'gold', z: 14 });
    [['Submitted', '33 of 36'], ['Average mark', '14.2 / 20'], ['Highest', '19 / 20'], ['Not started', '3']].forEach(([l, v], i) => kpi(d, 32 + i * 345, 164, 325, l, v));
    table(d, 32, 292, 1376, [{ h: 'STUDENT', x: 0 }, { h: 'READINGS /6', x: 330 }, { h: 'CALCULATION /6', x: 480 }, { h: 'ANSWER /5', x: 660 }, { h: 'CONCLUSION /3', x: 790 }, { h: 'TOTAL /20', x: 940 }, { h: '', x: 1180 }], [['Ada Okafor', '5', '5', '4', '2', { b: '16' }, { btn: 'View', w: 80 }], ['Tolu Bello', '6', '4', '3', '2', { b: '15' }, { btn: 'View', w: 80 }], ['Emeka Eze', '6', '6', '5', '2', { b: '19' }, { btn: 'View', w: 80 }], ['Peace Udo', '3', '2', '2', '1', { b: '8' }, { btn: 'View', w: 80 }]].map((r) => [{ av: r[0] }, ...r.slice(1)]), { rowH: 58 });
    d.T(32, 640, 'You choose when marks move to continuous assessment. Nothing is sent automatically.', { z: 13.5, f: 'muted' });
  }),
];
