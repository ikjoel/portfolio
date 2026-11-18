// Chuvor CBT: the invigilator's live monitor (verbatim excerpt of Pages/LiveMonitor.cshtml).
// One request at a time; refreshes every 3 s and slows to 8 s when the connection is bad, with a visible banner.
    // ---------- polling (one request at a time; slows down when the connection is bad) ----------
    async function poll() {
        if (state.busy) return;
        state.busy = true;
        try {
            const params = new URLSearchParams({
                handler: 'PollData',
                examId: cfg.examId,
                classFilter: cfg.classFilter || '',
                statusFilter: cfg.statusFilter || '',
                searchTerm: cfg.searchTerm || '',
                currentPage: state.page
            });
            const resp = await fetch(cfg.basePath + '?' + params.toString(), { cache: 'no-store' });
            if (!resp.ok) throw new Error('HTTP ' + resp.status);
            const data = await resp.json();
            if (!data.found) throw new Error('Exam not found');
            render(data);
            state.fails = 0;
            $('connectionBanner').classList.add('d-none');
        } catch (err) {
            state.fails++;
            const b = $('connectionBanner');
            b.classList.remove('d-none');
            b.textContent = 'Connection lost or session expired - what you see may be out of date. Retrying (' + state.fails + ')... If this keeps happening, reload the page and log in again.';
        } finally {
            state.busy = false;
            clearTimeout(state.timer);
            state.timer = setTimeout(poll, state.fails > 3 ? 8000 : 3000);
        }
    }

    // ---------- actions ----------
    async function post(handler, fields) {
        const token = document.querySelector('#monitorAntiforgeryForm input[name="__RequestVerificationToken"]').value;
        const body = new URLSearchParams();
        Object.keys(fields).forEach(k => {
            const v = fields[k];
            (Array.isArray(v) ? v : [v]).forEach(x => body.append(k, x));
        });
        const resp = await fetch(cfg.basePath + '?handler=' + handler, {
            method: 'POST',
            headers: { 'RequestVerificationToken': token, 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body.toString()
        });
        if (!resp.ok) throw new Error('HTTP ' + resp.status);
        return resp.json();
    }

    async function run(handler, fields) {
        try {
            const data = await post(handler, fields);
            alert(data.message || (data.success ? 'Done.' : 'That did not work.'));
        } catch (err) {
            alert('Could not reach the server, so nothing may have changed. Check the list and try again.');
        }
        poll();
    }

