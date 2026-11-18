{{-- The countdown pill shown on every page of a demo sandbox: time left, switch role, register, leave. --}}
@if(!empty($demoSandbox))
<div id="demoBar" style="position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:3000;max-width:calc(100vw - 20px);background:#1B1740;color:#fff;border-radius:18px;padding:10px 14px;box-shadow:0 14px 40px rgba(20,15,50,.45);border:1.5px solid rgba(239,159,39,.6);font:600 13.5px/1.35 'Plus Jakarta Sans',system-ui,sans-serif;display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;justify-content:center">
    <span style="background:#EF9F27;color:#2B1700;border-radius:999px;padding:3px 10px;font-weight:800;letter-spacing:.04em">DEMO</span>
    <span><span id="demoClock" style="font-variant-numeric:tabular-nums;font-weight:800;font-size:15px">--:--</span> left</span>
    <form method="POST" action="{{ route('tenant.demo.switch', ['subdomain' => $demoSandbox['subdomain']]) }}" style="margin:0;display:flex;gap:6px;align-items:center">
        @csrf
        <label for="demoRole" style="margin:0;color:#CFCBFA">View as</label>
        <select id="demoRole" name="role" onchange="this.form.submit()" style="border-radius:10px;border:0;padding:4px 8px;font-weight:700;color:#1B1740">
            @foreach(['admin' => 'School admin', 'teacher' => 'Teacher', 'parent' => 'Parent', 'student' => 'Student'] as $key => $label)
                <option value="{{ $key }}" @selected(strtolower((string) (auth()->user()->role ?? '')) === $key)>{{ $label }}</option>
            @endforeach
        </select>
    </form>
    <a href="{{ $demoSandbox['mainUrl'] }}/register" style="color:#FAC775;text-decoration:underline;font-weight:800" target="_top">Register your school free</a>
    <form method="POST" action="{{ route('tenant.demo.end', ['subdomain' => $demoSandbox['subdomain']]) }}" style="margin:0" onsubmit="return confirm('End this demo? Everything you added will be deleted.')">
        @csrf
        <button type="submit" style="background:transparent;border:1.5px solid rgba(255,255,255,.4);color:#fff;border-radius:10px;padding:3px 10px;font-weight:700">End demo</button>
    </form>
</div>
<script>
(function () {
    var left = {{ (int) $demoSandbox['seconds'] }}, el = document.getElementById('demoClock'), main = @json($demoSandbox['mainUrl']);
    function tick() {
        if (left <= 0) { location.href = main + '/demo?ended=1'; return; }
        var m = Math.floor(left / 60), s = left % 60;
        el.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
        if (left <= 300) { el.style.color = '#FF9A8A'; }
        left--; setTimeout(tick, 1000);
    }
    tick();
})();
</script>
@endif
