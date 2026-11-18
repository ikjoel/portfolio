{{-- A friendly callout. <x-ux.help tone="tip|info|warn|ok|bad" title="..." dismiss="unique-id">text</x-ux.help>
     "dismiss" adds a close button that remembers (in the browser) that this person has read it. --}}
@props(['tone' => 'tip', 'title' => null, 'icon' => null, 'dismiss' => null])
@php
    $defaultIcons = ['tip' => 'fa-lightbulb', 'info' => 'fa-circle-info', 'warn' => 'fa-triangle-exclamation', 'ok' => 'fa-circle-check', 'bad' => 'fa-circle-exclamation'];
@endphp
<div class="ux-help ux-{{ $tone }}" role="note" @if($dismiss) data-ux-key="{{ $dismiss }}" @endif>
    <div class="ux-ic"><i class="fas {{ $icon ?? ($defaultIcons[$tone] ?? 'fa-lightbulb') }}"></i></div>
    <div class="ux-body">
        @if($title)
            <div class="ux-title">{{ $title }}</div>
        @endif
        {{ $slot }}
    </div>
    @if($dismiss)
        <button type="button" class="ux-x" aria-label="Hide this tip">&times;</button>
    @endif
</div>
