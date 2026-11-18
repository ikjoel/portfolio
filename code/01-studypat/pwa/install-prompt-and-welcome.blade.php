{{-- Makes every page installable as an app: manifest, colours, home-screen icon, service worker and the "Install app" prompt.
     Include once inside <head>. Works on a school's own address and on StudyPat's main site. --}}
@php
    // Only a school's own address is branded as that school (master-admin pages that happen to hold a $school stay StudyPat)
    $pwaSub = request()->route('subdomain');
    $pwaSchool = null;
    if ($pwaSub) {
        $pwaSchool = (isset($school) && $school instanceof \App\Models\School && $school->subdomain === $pwaSub)
            ? $school
            : \App\Models\School::where('subdomain', $pwaSub)->first();
    }
    $pwaB = \App\Support\PwaBranding::for($pwaSchool);
    // Where the first-run "welcome" card sends a signed-in person using the installed app
    $pwaHelpUrl = ($pwaSchool && auth()->check()) ? route('tenant.help', ['subdomain' => $pwaSchool->subdomain, 'welcome' => 1]) : null;
@endphp
<link rel="manifest" href="/manifest.webmanifest">
<style>@media (display-mode: standalone) { [data-install-app] { display: none !important; } }</style>
<meta name="theme-color" content="{{ $pwaB['theme'] }}">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="{{ $pwaB['short'] }}">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<link rel="apple-touch-icon" href="/pwa/icon-180.png">
<script>
(function () {
    var APP = @json($pwaB['name']), BRAND = @json($pwaB['theme']);
    var standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

    if ('serviceWorker' in navigator && location.protocol === 'https:') {
        window.addEventListener('load', function () { navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(function () {}); });
    }
    if (standalone) {
        // The first time the installed app is opened by a signed-in person, offer the help guide once
        var HELP = @json($pwaHelpUrl), SEEN = 'sp-app-welcomed';
        var seen = false;
        try { seen = !!localStorage.getItem(SEEN); } catch (e) {}
        if (HELP && !seen && location.pathname.indexOf('/help-guide') !== 0) {
            window.addEventListener('load', function () {
                setTimeout(function () {
                    var w = document.createElement('div');
                    w.setAttribute('role', 'dialog');
                    w.style.cssText = 'position:fixed;left:12px;right:12px;bottom:84px;max-width:440px;margin:0 auto;z-index:2147483000;background:#fff;color:#1D1D1F;border-radius:18px;box-shadow:0 14px 44px rgba(0,0,0,.28);padding:16px;font:14px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;border-top:4px solid ' + BRAND;
                    w.innerHTML = '<strong style="display:block;font-size:15px;margin-bottom:4px">Welcome to the ' + APP.replace(/</g, '&lt;') + ' app</strong><span style="color:#5F6368">New here? The help guide shows what to do first, step by step.</span>' +
                        '<div style="display:flex;gap:8px;margin-top:12px"><a data-go href="' + HELP + '" style="flex:1;text-align:center;text-decoration:none;border-radius:11px;padding:11px;font-weight:700;color:#fff;background:' + BRAND + '">Open the help guide</a>' +
                        '<button type="button" data-x style="border:1px solid #D6D6DA;background:#fff;border-radius:11px;padding:11px 14px;font-weight:600;color:#5F6368;cursor:pointer">Not now</button></div>';
                    document.body.appendChild(w);
                    function done() { try { localStorage.setItem(SEEN, '1'); } catch (e) {} }
                    w.querySelector('[data-x]').addEventListener('click', function () { done(); w.remove(); });
                    w.querySelector('[data-go]').addEventListener('click', done);
                }, 1500);
            });
        }
        return;
    }

    var KEY = 'sp-install-dismissed';
    function dismissedRecently() {
        try { var t = parseInt(localStorage.getItem(KEY) || '0', 10); return t && (Date.now() - t) < 14 * 86400000; } catch (e) { return false; }
    }
    function remember() { try { localStorage.setItem(KEY, String(Date.now())); } catch (e) {} }

    var deferred = null, card = null;
    var isIos = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
    var isSafari = /safari/i.test(navigator.userAgent) && !/crios|fxios|edgios|opios/i.test(navigator.userAgent);

    function build(html) {
        if (card || dismissedRecently()) { return; }
        card = document.createElement('div');
        card.setAttribute('role', 'dialog');
        card.style.cssText = 'position:fixed;left:12px;right:12px;bottom:84px;max-width:440px;margin:0 auto;z-index:2147483000;background:#fff;color:#1D1D1F;border-radius:18px;box-shadow:0 14px 44px rgba(0,0,0,.28);padding:16px;font:14px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;border-top:4px solid ' + BRAND;
        card.innerHTML = html;
        document.body.appendChild(card);
        card.querySelector('[data-x]').addEventListener('click', function () { remember(); card.remove(); card = null; });
        var go = card.querySelector('[data-go]');
        if (go) { go.addEventListener('click', install); }
    }
    function install() {
        if (!deferred) { return; }
        deferred.prompt();
        deferred.userChoice.then(function () { deferred = null; if (card) { card.remove(); card = null; } });
    }
    var head = '<div style="display:flex;gap:12px;align-items:center"><img src="/pwa/icon-192.png" alt="" width="46" height="46" style="border-radius:11px;flex:none"><div style="flex:1;min-width:0"><strong style="display:block;font-size:15px">Install the ' + APP.replace(/</g, '&lt;') + ' app</strong>';
    var close = '<button type="button" data-x aria-label="Close" style="border:0;background:none;font-size:22px;line-height:1;color:#8A8D93;padding:4px;cursor:pointer">&times;</button></div>';
    var installBody = head + '<span style="color:#5F6368">Open it from your home screen like any app - faster and full screen.</span></div>' + close +
        '<button type="button" data-go style="margin-top:12px;width:100%;border:0;border-radius:11px;padding:12px;font-size:15px;font-weight:700;color:#fff;background:' + BRAND + ';cursor:pointer">Install app</button>';

    window.addEventListener('beforeinstallprompt', function (e) {
        e.preventDefault();
        deferred = e;
        if (document.readyState === 'complete') { build(installBody); }
        else { window.addEventListener('load', function () { build(installBody); }); }
    });
    window.addEventListener('appinstalled', function () { if (card) { card.remove(); card = null; } remember(); });

    // iPhone / iPad have no install button: show the two taps instead (only in Safari, where "Add to Home Screen" exists)
    if (isIos && isSafari) {
        window.addEventListener('load', function () {
            setTimeout(function () {
                build(head + '<span style="color:#5F6368">Tap <strong>Share</strong> at the bottom of Safari, then <strong>Add to Home Screen</strong>.</span></div>' + close);
            }, 2500);
        });
    }

    // a small hook so a menu link can offer the same thing: <a href="#" data-install-app>Install app</a>
    document.addEventListener('click', function (e) {
        var t = e.target.closest && e.target.closest('[data-install-app]');
        if (!t) { return; }
        e.preventDefault();
        if (deferred) { install(); return; }
        try { localStorage.removeItem(KEY); } catch (err) {}
        if (card) { card.remove(); card = null; }
        build(head + '<span style="color:#5F6368">' + (isIos ? 'Tap <strong>Share</strong>, then <strong>Add to Home Screen</strong>.' : 'Open your browser menu and choose <strong>Install app</strong> or <strong>Add to Home screen</strong>.') + '</span></div>' + close);
    });
})();
</script>
