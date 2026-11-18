{{-- A page with nothing on it yet. <x-ux.empty icon="fa-file" title="No question sets yet">What to do about it.<x-slot:action>button</x-slot:action></x-ux.empty> --}}
@props(['title', 'icon' => 'fa-inbox'])
<div class="card"><div class="card-body ux-empty">
    <div class="ux-empty-ic"><i class="fas {{ $icon }}"></i></div>
    <h5>{{ $title }}</h5>
    <p>{{ $slot }}</p>
    @isset($action)
        <div>{{ $action }}</div>
    @endisset
</div></div>
