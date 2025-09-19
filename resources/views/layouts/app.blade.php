<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <title>@yield('title', config('app.name', 'Single Page Web App'))</title>
    
    <link rel="icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml">
    
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
</head>
<body class="bg-gray-50 text-gray-900">
    <div id="app">
        @yield('content')
    </div>
</body>
</html>
