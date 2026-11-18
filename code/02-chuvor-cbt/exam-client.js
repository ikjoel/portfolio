// Chuvor CBT: the candidate's exam page script (verbatim excerpt of Pages/StudentExam.cshtml).
// Values injected by the server (Razor) and used below:  rawQuestions, rawAnswers, examId, attemptId, serverRemaining
// Shown here: one shape for every question, the save queue, the timer, keep-alive ping, violation reporting, keep-screen-on.

            const $ = id => document.getElementById(id);
            const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
            const pick = (o, a, b) => (o[a] !== undefined ? o[a] : o[b]);

            // One clean shape for every question, whatever the letter case of the server data
            const questions = rawQuestions.map(q => ({
                id: pick(q, 'Id', 'id'),
                text: pick(q, 'QuestionText', 'questionText') || '',
                image: pick(q, 'ImagePath', 'imagePath') || null,
                type: String(pick(q, 'QuestionType', 'questionType') || 'Objective'),
                options: {
                    A: pick(q, 'OptionA', 'optionA'),
                    B: pick(q, 'OptionB', 'optionB'),
                    C: pick(q, 'OptionC', 'optionC'),
                    D: pick(q, 'OptionD', 'optionD')
                },
                // The student's own arrangement of the options. A, B, C, D on screen are positions; the answer that is
                // saved and marked is always the option's original letter.
                order: String(pick(q, 'OptionOrder', 'optionOrder') || 'ABCD').split(''),
                groupId: pick(q, 'GroupId', 'groupId') || null,
                isReference: !!pick(q, 'IsReference', 'isReference')
            }));

            // answers[questionId] = { selectedOption, answerText }  (the one place answers live)
            const answers = {};
            rawAnswers.forEach(a => {
                answers[pick(a, 'QuestionId', 'questionId')] = {
                    selectedOption: pick(a, 'SelectedOption', 'selectedOption') || null,
                    answerText: pick(a, 'AnswerText', 'answerText') || null
                };
            });

            const hasContent = a => !!a && (!!(a.selectedOption && String(a.selectedOption).trim()) || !!(a.answerText && String(a.answerText).trim()));
            const totalQuestions = questions.filter(q => !q.isReference).length;

            let currentIndex = 0;
            let finished = false;   // true once we are leaving this page (submit, time up, or attempt already finished)

            // ---------------------------------------------------------------
            // Banner + "saved / not saved" indicator
            // ---------------------------------------------------------------
            function showBanner(msg) {
                const b = $('netBanner');
                if (!msg) { b.style.display = 'none'; return; }
                b.textContent = msg;
                b.style.display = 'block';
            }

            function updateSaveStatus() {
                const el = $('saveStatus');
                if (el) {
                    if (dirty.size === 0) {
                        el.className = 'save-status ok';
                        el.innerHTML = '<i class="bi bi-cloud-check"></i> All answers saved';
                    } else if (failCount > 0) {
                        el.className = 'save-status bad';
                        el.innerHTML = '<i class="bi bi-cloud-slash"></i> ' + dirty.size + ' not saved - retrying';
                    } else {
                        el.className = 'save-status busy';
                        el.innerHTML = '<i class="bi bi-cloud-arrow-up"></i> Saving...';
                    }
                }
                renderNavGrid(currentIndex);
            }

            function leave(url) {
                finished = true;
                window.location.href = url || '/StudentDashboard';
            }

            // Reads a JSON answer from the server. Anything else (login page, licence page, error page)
            // counts as a failure, so the answer is kept and sent again.
            async function readJson(resp) {
                const type = resp.headers.get('content-type') || '';
                if (resp.redirected && /login/i.test(resp.url)) {
                    showBanner('Your login has ended. Tell your teacher. Do NOT close this page - your answers are still here.');
                    throw new Error('login expired');
                }
                if (!resp.ok || type.indexOf('json') < 0) throw new Error('HTTP ' + resp.status);
                return resp.json();
            }

            const token = () => document.querySelector('#antiforgeryForm input[name="__RequestVerificationToken"]').value;

            // ---------------------------------------------------------------
            // Saving answers: every change goes into a queue and is sent until the server says "saved".
            // ---------------------------------------------------------------
            const dirty = new Map();   // questionId -> version of the answer that still has to be saved
            let version = 0;
            let sending = false;
            let failCount = 0;
            let retryTimer = null;
            let flushTimer = null;

            function setAnswer(qid, selectedOption, answerText, delayMs) {
                answers[qid] = { selectedOption: selectedOption, answerText: answerText };
                dirty.set(qid, ++version);
                updateSaveStatus();
                clearTimeout(flushTimer);
                if (delayMs > 0) flushTimer = setTimeout(flush, delayMs); else flush();
            }

            async function sendAnswer(qid, a) {
                const resp = await fetch('/StudentExam?handler=SaveAnswer&examId=' + examId, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'RequestVerificationToken': token() },
                    body: JSON.stringify({
                        questionId: parseInt(qid, 10),
                        selectedOption: a.selectedOption,
                        answerText: a.answerText,
                        examId: parseInt(examId, 10)
                    })
                });
                const data = await readJson(resp);

                if (data.success) return 'ok';
                if (data.code === 'FINISHED') { leave(data.redirect); return 'finished'; }
                // The server will never accept this one: do not retry it forever
                if (data.code === 'BAD_QUESTION' || data.code === 'BAD_OPTION') { console.warn('Answer rejected:', data.code); return 'ok'; }
                throw new Error(data.code || 'save failed');
            }

            async function flush() {
                if (sending || finished) return;
                sending = true;
                try {
                    while (dirty.size > 0 && !finished) {
                        const first = dirty.entries().next().value;
                        const qid = first[0];
                        const ver = first[1];
                        const a = answers[qid] || { selectedOption: null, answerText: null };

                        const result = await sendAnswer(qid, a);
                        if (result === 'finished') return;

                        // If the student changed this answer again while it was being sent, the newer version stays queued.
                        if (dirty.get(qid) === ver) dirty.delete(qid);

                        failCount = 0;
                        showBanner(null);
                        updateSaveStatus();
                    }
                } catch (err) {
                    failCount++;
                    showBanner('Connection problem: your latest answers are NOT saved yet. Keep this page open - it keeps trying.');
                    clearTimeout(retryTimer);
                    retryTimer = setTimeout(flush, Math.min(15000, 2000 * Math.pow(2, failCount - 1)));
                } finally {
                    sending = false;
                    updateSaveStatus();
                }

                // Something was typed while we were busy
                if (dirty.size > 0 && failCount === 0 && !finished) flush();
            }

            // ---------------------------------------------------------------
            // Timer: counts down to a deadline, and is re-synchronised with the server clock every 20 seconds
            // ---------------------------------------------------------------
            let deadline = performance.now() + Math.max(1, serverRemaining) * 1000;

            const secondsLeft = () => Math.max(0, Math.ceil((deadline - performance.now()) / 1000));

            function updateTimerDisplay() {
                const left = secondsLeft();
                const display = $('timerDisplay');
                if (display) {
                    display.textContent = String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0');
                    display.classList.toggle('warning', left < 300);
                }
            }

            function startTimer() {
                updateTimerDisplay();
                setInterval(() => {
                    updateTimerDisplay();
                    if (secondsLeft() <= 0) submitExam(true);
                }, 500);
            }

            async function ping() {
                if (finished) return;
                try {
                    const resp = await fetch('/StudentExam?handler=Ping&examId=' + examId, {
                        method: 'POST',
                        headers: { 'RequestVerificationToken': token() }
                    });
                    const data = await readJson(resp);
                    if (data.success) deadline = performance.now() + data.remainingSeconds * 1000;
                    else if (data.code === 'FINISHED') leave(data.redirect);
                } catch (err) { /* the next ping tries again */ }
            }
            setInterval(ping, 20000);

// ---- reporting that the candidate left the exam page, and keeping a phone awake ----
            function logViolation(type, details) {
                if (!attemptId || finished) return;
                fetch('/StudentExam?handler=LogViolation&examId=' + examId, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'RequestVerificationToken': token() },
                    body: JSON.stringify({ violationType: type, details: details, examId: parseInt(examId, 10) })
                })
                    .then(readJson)
                    .then(data => {
                        if (data.autoSubmitted) {
                            finished = true;
                            alert('Too many violations. Your exam was submitted automatically.');
                            window.location.href = data.redirect || ('/StudentExamResults?attemptId=' + attemptId);
                        } else if (data.code === 'FINISHED') {
                            leave(data.redirect);
                        }
                    })
                    .catch(() => { /* a lost violation report must never break the exam */ });
            }

            document.addEventListener('visibilitychange', () => { if (document.hidden) logViolation('TabSwitch', 'Student switched tab'); });

            // Keep a phone's screen awake during the exam. A screen that locks by itself would count as leaving the exam.

            async function keepScreenOn() {
                try {
                    if (finished || !('wakeLock' in navigator) || document.hidden) return;
                    wakeLock = await navigator.wakeLock.request('screen');
                    wakeLock.addEventListener('release', () => { wakeLock = null; });
                } catch (e) { /* not supported or refused: the exam works the same, the screen may just dim */ }
            }
            keepScreenOn();
            document.addEventListener('visibilitychange', () => { if (!document.hidden && !wakeLock) keepScreenOn(); });
