<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    @viteReactRefresh
    @vite(['resources/js/app.jsx', 'resources/css/app.css', 'resources/css/fonts.css'])
    @inertiaHead
</head>

<body>
    @inertia

    {{-- <pre>{{ print_r(json_decode(file_get_contents(public_path('build/manifest.json')), true), true) }}</pre> --}}
</body>

</html>
