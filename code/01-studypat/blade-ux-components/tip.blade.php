{{-- A small "?" next to a label. Hover (laptop) or tap (phone) to read the explanation. <x-ux.tip text="..." /> --}}
@props(['text'])
<button type="button" class="ux-q" data-ux-tip="{{ $text }}" aria-label="What is this? {{ $text }}">?</button>
