{{-- Progress through a task. <x-ux.steps :steps="[['Create', 'done'], ['Add questions', 'current'], ['Submit', 'todo']]" />
     States: done, current, todo, stop (something needs attention). --}}
@props(['steps'])
<ol class="ux-steps" aria-label="Progress">
    @foreach($steps as $i => $step)
        @php
            $label = $step[0];
            $state = $step[1] ?? 'todo';
        @endphp
        <li class="ux-{{ $state }}" @if($state === 'current') aria-current="step" @endif>
            <div class="ux-dot">
                @if($state === 'done')
                    <i class="fas fa-check"></i>
                @elseif($state === 'stop')
                    <i class="fas fa-exclamation"></i>
                @else
                    {{ $i + 1 }}
                @endif
            </div>
            {{ $label }}
        </li>
    @endforeach
</ol>
