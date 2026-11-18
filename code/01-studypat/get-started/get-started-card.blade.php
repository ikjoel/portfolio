{{-- The dashboard's first-time setup card: one clear next step, a progress bar and the whole checklist. Hidden once setup is
     finished or the admin chose "Skip setup". Needs $school; $setup (from SetupProgress) is optional. --}}
@php
    $setup = $setup ?? app(\App\Services\SetupProgress::class)->forSchool($school);
    $helpUrl = $school->isWhiteLabel() ? null : $school->supportWhatsAppUrl(\Illuminate\Support\Facades\Auth::user(), 'setting up my school');
    $nextStep = $setup['next'];
@endphp
@if($setup['incomplete'] && !$school->onboarding_dismissed_at && $nextStep)
    <div class="card border-0 shadow-sm mb-3" style="border-radius:16px;overflow:hidden" id="getStartedCard">
        <div class="p-3 p-md-4" style="background:linear-gradient(135deg,#534AB7,#7F77DD);color:#fff">
            <div class="d-flex justify-content-between flex-wrap gap-3 align-items-start">
                <div style="min-width:0;flex:1 1 320px">
                    <div class="small text-uppercase fw-semibold" style="letter-spacing:.08em;opacity:.85">Let's get your school ready</div>
                    <h4 class="mb-1 fw-bold" style="color:#fff">{{ $nextStep['title'] }}</h4>
                    <div style="opacity:.95;max-width:560px">{{ $nextStep['explain'] }}</div>
                </div>
                <div class="text-end" style="flex:none">
                    <div class="fw-bold" style="font-size:28px;line-height:1">{{ $setup['done'] }} / {{ $setup['total'] }}</div>
                    <div class="small" style="opacity:.85">steps done</div>
                </div>
            </div>
            <div class="my-3" style="height:8px;background:rgba(255,255,255,.28);border-radius:4px"><div style="height:100%;width:{{ max(4, $setup['percent']) }}%;background:#FAC775;border-radius:4px"></div></div>
            <div class="d-flex flex-wrap gap-2 align-items-center">
                <a href="{{ $nextStep['url'] }}" class="btn btn-light fw-bold px-4 py-2">Start: {{ $nextStep['title'] }} <i class="fas fa-arrow-right ms-1"></i></a>
                <span class="small" style="opacity:.92">This step takes about {{ $nextStep['minutes'] }} {{ $nextStep['minutes'] === 1 ? 'minute' : 'minutes' }}. About {{ $setup['minutesLeft'] }} minutes to finish the whole setup.</span>
            </div>
        </div>
        <div class="card-body">
            <div class="row g-2">
                @foreach($setup['steps'] as $step)
                    <div class="col-md-6">
                        <a href="{{ $step['url'] }}" class="d-flex align-items-center gap-2 text-decoration-none p-2 rounded-3" style="color:inherit;{{ !$step['done'] && $step['key'] === $nextStep['key'] ? 'background:#F1EFFF;font-weight:600' : '' }}">
                            <i class="fas {{ $step['done'] ? 'fa-circle-check' : 'fa-circle' }}" style="color:{{ $step['done'] ? '#2E9E6B' : '#C9C5E6' }};font-size:18px"></i>
                            <span style="{{ $step['done'] ? 'text-decoration:line-through;opacity:.6' : '' }}">{{ $step['title'] }}</span>
                        </a>
                    </div>
                @endforeach
            </div>
            <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-3 pt-3 border-top">
                @if($helpUrl)
                    <a href="{{ $helpUrl }}" target="_blank" rel="noopener" class="btn btn-sm btn-outline-success"><i class="fab fa-whatsapp me-1"></i> Stuck? Chat with us on WhatsApp</a>
                @else
                    <span></span>
                @endif
                <form action="{{ route('tenant.onboarding.dismiss', ['subdomain' => $school->subdomain]) }}" method="POST" class="d-inline">@csrf
                    <button type="submit" class="btn btn-link btn-sm text-muted text-decoration-none">I will set up later</button>
                </form>
            </div>
        </div>
    </div>
@endif
