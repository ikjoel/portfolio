<script>
(function () {
    // "?" tooltips: hover on a laptop, tap on a phone
    function initTips(root) {
        if (!window.bootstrap) { return; }
        (root || document).querySelectorAll('[data-ux-tip]:not([data-ux-ready])').forEach(function (el) {
            el.setAttribute('data-ux-ready', '1');
            new bootstrap.Popover(el, { trigger: 'hover focus click', placement: 'top', html: false, content: el.getAttribute('data-ux-tip'), container: 'body' });
        });
    }
    document.addEventListener('DOMContentLoaded', function () { initTips(); });

    // Callouts that can be closed and stay closed
    function seen(key) { try { return localStorage.getItem('ux-hide-' + key) === '1'; } catch (e) { return false; } }
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.ux-help[data-ux-key]').forEach(function (box) {
            if (seen(box.getAttribute('data-ux-key'))) { box.remove(); }
        });
    });
    document.addEventListener('click', function (e) {
        var x = e.target.closest('.ux-x');
        if (!x) { return; }
        var box = x.closest('.ux-help');
        try { localStorage.setItem('ux-hide-' + box.getAttribute('data-ux-key'), '1'); } catch (err) {}
        box.remove();
    });

    // "Saving... / All changes saved / 2 not saved" for pages that save as you type.
    // uxSave.begin() when a save starts; uxSave.ok(key) when it worked; uxSave.fail(key, message, retryFunction) when it did not.
    var saveEl = null, saveFade = null, savePending = 0, saveFailed = new Map();
    function renderSave() {
        if (!saveEl) { saveEl = document.createElement('div'); saveEl.id = 'uxSaveState'; saveEl.setAttribute('role', 'status'); document.body.appendChild(saveEl); }
        clearTimeout(saveFade);
        if (savePending > 0) {
            saveEl.className = 'ux-savestate ux-busy'; saveEl.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Saving...';
        } else if (saveFailed.size > 0) {
            saveEl.className = 'ux-savestate ux-bad';
            saveEl.innerHTML = '<i class="fas fa-triangle-exclamation"></i> ' + saveFailed.size + ' not saved <button type="button" data-ux-retry>Try again</button>';
        } else {
            saveEl.className = 'ux-savestate ux-ok'; saveEl.innerHTML = '<i class="fas fa-check"></i> All changes saved';
            saveFade = setTimeout(function () { saveEl.classList.add('ux-fade'); }, 2500);
        }
    }
    window.uxSave = {
        begin: function () { savePending++; renderSave(); },
        ok: function (key) { savePending = Math.max(0, savePending - 1); if (key !== undefined) { saveFailed.delete(key); } renderSave(); },
        fail: function (key, message, retry) {
            savePending = Math.max(0, savePending - 1);
            saveFailed.set(key, retry || null);
            if (message) { uxToast(message, 'bad'); }
            renderSave();
        },
        retryAll: function () { var fns = Array.from(saveFailed.values()); saveFailed.clear(); renderSave(); fns.forEach(function (f) { if (f) { f(); } }); }
    };
    document.addEventListener('click', function (e) { if (e.target.closest('[data-ux-retry]')) { window.uxSave.retryAll(); } });
    window.addEventListener('beforeunload', function (e) {
        if (savePending > 0 || saveFailed.size > 0) { e.preventDefault(); e.returnValue = ''; }
    });

    // Friendly messages instead of browser pop-ups: uxToast('Saved', 'ok') or uxToast('Could not save', 'bad')
    window.uxToast = function (message, tone) {
        var wrap = document.getElementById('uxToasts');
        if (!wrap) { wrap = document.createElement('div'); wrap.id = 'uxToasts'; document.body.appendChild(wrap); }
        var t = document.createElement('div');
        t.className = 'ux-toast' + (tone ? ' ux-' + tone : '');
        t.setAttribute('role', 'status');
        t.textContent = message;
        wrap.appendChild(t);
        setTimeout(function () { t.remove(); }, tone === 'bad' ? 7000 : 3500);
    };
})();
</script>
