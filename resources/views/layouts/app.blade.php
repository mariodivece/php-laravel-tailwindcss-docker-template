<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <title>@yield('title', config('app.name', 'Single Page Web App'))</title>
    
    <link rel="icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml">
    
    @if(app()->environment('local'))
        {{-- React Refresh preamble script for development --}}
        <script type="module">
            import RefreshRuntime from 'http://localhost:5173/@react-refresh'
            RefreshRuntime.injectIntoGlobalHook(window)
            window.$RefreshReg$ = () => {}
            window.$RefreshSig$ = () => (type) => type
            window.__vite_plugin_react_preamble_installed__ = true
        </script>
    @endif
    
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
</head>
<body class="bg-gray-50 text-gray-900">
    <div id="app">
        @yield('content')
    </div>
</body>
</html>
