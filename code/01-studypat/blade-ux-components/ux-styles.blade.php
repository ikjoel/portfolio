{{-- Shared "easy to use" building blocks: callouts, step trackers, empty states, tooltips, toasts.
     Used through the <x-ux.*> components in resources/views/components/ux. --}}
<style>
    /* ---------- Callout (tip / info / warning / success) ---------- */
    .ux-help { display: flex; gap: 12px; align-items: flex-start; border-radius: 12px; padding: 12px 14px; margin-bottom: 14px; font-size: 14px; line-height: 1.5; border: 1px solid transparent; }
    .ux-help .ux-ic { flex: 0 0 32px; height: 32px; width: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; background: #fff; }
    .ux-help .ux-body { flex: 1; min-width: 0; }
    .ux-help .ux-title { font-weight: 700; margin-bottom: 2px; }
    .ux-help .ux-body p:last-child, .ux-help .ux-body ul:last-child { margin-bottom: 0; }
    .ux-help .ux-x { margin-left: auto; background: none; border: 0; opacity: .55; font-size: 18px; line-height: 1; padding: 0 4px; cursor: pointer; }
    .ux-help .ux-x:hover { opacity: 1; }
    .ux-help.ux-tip  { background: var(--sp-purple-soft); border-color: var(--sp-lilac); }  .ux-tip .ux-ic  { color: var(--sp-purple); }
    .ux-help.ux-info { background: var(--sp-blue-soft); border-color: #B5D4F4; }            .ux-info .ux-ic { color: var(--sp-blue); }
    .ux-help.ux-warn { background: var(--sp-amber-soft); border-color: #FAC775; }           .ux-warn .ux-ic { color: var(--sp-amber); }
    .ux-help.ux-ok   { background: var(--sp-green-soft); border-color: #C0DD97; }           .ux-ok .ux-ic   { color: var(--sp-green); }
    .ux-help.ux-bad  { background: var(--sp-coral-soft); border-color: #F5C4B3; }           .ux-bad .ux-ic  { color: var(--sp-coral); }

    /* ---------- Step tracker ---------- */
    .ux-steps { display: flex; list-style: none; padding: 0; margin: 0 0 18px; counter-reset: uxstep; }
    .ux-steps li { flex: 1 1 0; position: relative; text-align: center; font-size: 12px; color: var(--sp-muted); padding: 0 4px; min-width: 0; }
    .ux-steps li::before { content: ''; position: absolute; top: 14px; left: -50%; width: 100%; height: 2px; background: var(--sp-border); z-index: 0; }
    .ux-steps li:first-child::before { display: none; }
    .ux-steps .ux-dot { position: relative; z-index: 1; width: 30px; height: 30px; border-radius: 50%; margin: 0 auto 6px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; background: #fff; border: 2px solid var(--sp-border); color: var(--sp-muted); }
    .ux-steps li.ux-done { color: var(--sp-green); }
    .ux-steps li.ux-done::before, .ux-steps li.ux-current::before { background: var(--sp-green); }
    .ux-steps li.ux-done .ux-dot { background: var(--sp-green); border-color: var(--sp-green); color: #fff; }
    .ux-steps li.ux-current { color: var(--sp-purple); font-weight: 700; }
    .ux-steps li.ux-current .ux-dot { background: var(--sp-purple); border-color: var(--sp-purple); color: #fff; box-shadow: 0 0 0 4px var(--sp-purple-soft); }
    .ux-steps li.ux-stop .ux-dot { background: var(--sp-coral); border-color: var(--sp-coral); color: #fff; }
    .ux-steps li.ux-stop { color: var(--sp-coral); font-weight: 700; }
    @media (max-width: 576px) { .ux-steps li { font-size: 11px; } .ux-steps .ux-dot { width: 26px; height: 26px; font-size: 12px; } .ux-steps li::before { top: 12px; } }

    /* ---------- "Do this next" banner ---------- */
    .ux-next { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; background: var(--sp-ink); color: #fff; border-radius: 14px; padding: 14px 18px; margin-bottom: 16px; }
    .ux-next .ux-next-ic { width: 38px; height: 38px; border-radius: 50%; background: rgba(255,255,255,.14); display: flex; align-items: center; justify-content: center; flex: 0 0 38px; }
    .ux-next .ux-next-body { flex: 1; min-width: 200px; }
    .ux-next .ux-next-label { font-size: 11px; text-transform: uppercase; letter-spacing: .06em; opacity: .7; }
    .ux-next .ux-next-title { font-weight: 700; font-size: 16px; }
    .ux-next .ux-next-text { font-size: 13px; opacity: .85; }
    .ux-next.ux-done { background: var(--sp-green); }

    /* ---------- Empty state ---------- */
    .ux-empty { text-align: center; padding: 36px 18px; }
    .ux-empty .ux-empty-ic { width: 64px; height: 64px; border-radius: 50%; background: var(--sp-purple-soft); color: var(--sp-purple-mid); font-size: 26px; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; }
    .ux-empty h5 { margin-bottom: 6px; }
    .ux-empty p { color: var(--sp-muted); max-width: 460px; margin: 0 auto 14px; }

    /* ---------- "?" tooltip ---------- */
    .ux-q { display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; border-radius: 50%; background: var(--sp-purple-soft); color: var(--sp-purple); font-size: 11px; font-weight: 700; cursor: help; margin-left: 6px; vertical-align: middle; border: 0; padding: 0; }
    .ux-q:hover, .ux-q:focus { background: var(--sp-purple); color: #fff; outline: none; }

    /* ---------- Small helper line under a field ---------- */
    .ux-hint { font-size: 12.5px; color: var(--sp-muted); margin-top: 4px; }

    /* ---------- Brief highlight when a link jumps you to a card ---------- */
    .ux-flash { animation: uxFlash 1.8s ease-out; }
    @keyframes uxFlash { 0% { box-shadow: 0 0 0 4px var(--sp-lilac); } 100% { box-shadow: 0 0 0 0 transparent; } }
    .nav-tabs .nav-link { white-space: nowrap; }
    #cbtTabs .nav-link { padding: .5rem .6rem; font-size: 14px; }
    #cbtTabs { scrollbar-width: thin; }

    /* ---------- Save indicator for pages that save as you type ---------- */
    .ux-savestate { position: fixed; left: 16px; bottom: 16px; z-index: 1900; background: #fff; border-radius: 999px; padding: 8px 14px; font-size: 13px; font-weight: 600; box-shadow: 0 6px 24px rgba(38,33,92,.18); border: 1px solid var(--sp-border); transition: opacity .4s; }
    @media (min-width: 769px) { .ux-savestate { left: 280px; } }
    .ux-savestate.ux-busy { color: var(--sp-purple); } .ux-savestate.ux-ok { color: var(--sp-green); } .ux-savestate.ux-bad { color: var(--sp-coral); border-color: #F5C4B3; }
    .ux-savestate.ux-fade { opacity: 0; pointer-events: none; }
    .ux-savestate button { margin-left: 8px; border: 0; background: var(--sp-coral); color: #fff; border-radius: 999px; padding: 2px 10px; font-size: 12px; }
    input.ux-invalid { border-color: #dc3545 !important; background: #fff5f5; }
    .ux-sticky-cols tbody td:nth-child(2) { position: sticky; left: 0; background: #fff; z-index: 2; box-shadow: 1px 0 0 var(--sp-border); }
    .ux-sticky-cols thead tr:first-child th:nth-child(2) { position: sticky; left: 0; background: #212529; z-index: 3; }

    /* ---------- Toast messages (replace browser pop-ups) ---------- */
    #uxToasts { position: fixed; right: 16px; bottom: 16px; z-index: 2000; display: flex; flex-direction: column; gap: 8px; max-width: calc(100vw - 32px); }
    .ux-toast { background: #fff; border-left: 4px solid var(--sp-purple); border-radius: 10px; box-shadow: 0 6px 24px rgba(38,33,92,.18); padding: 10px 14px; font-size: 14px; min-width: 240px; max-width: 380px; animation: uxIn .2s ease-out; }
    .ux-toast.ux-ok { border-color: var(--sp-green); } .ux-toast.ux-bad { border-color: var(--sp-coral); }
    @keyframes uxIn { from { transform: translateY(8px); opacity: 0; } to { transform: none; opacity: 1; } }
</style>
