{{-- The one thing to do now. <x-ux.next title="Add your first question" text="..." icon="fa-pen">buttons</x-ux.next>
     done="true" turns it green ("all set"). --}}
@props(['title', 'text' => null, 'icon' => 'fa-arrow-right', 'label' => 'Do this next', 'done' => false])
<div class="ux-next {{ $done ? 'ux-done' : '' }}">
    <div class="ux-next-ic"><i class="fas {{ $done ? 'fa-check' : $icon }}"></i></div>
    <div class="ux-next-body">
        <div class="ux-next-label">{{ $done ? 'All set' : $label }}</div>
        <div class="ux-next-title">{{ $title }}</div>
        @if($text)
            <div class="ux-next-text">{{ $text }}</div>
        @endif
    </div>
    @if(trim((string) $slot) !== '')
        <div class="d-flex flex-wrap gap-2">{{ $slot }}</div>
    @endif
</div>
