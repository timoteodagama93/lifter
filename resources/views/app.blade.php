<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Timóteo Da Gama, Lifter CEO">
    <meta name="about" content="Lifter é uma plataforma de avaliação, sugestão e classificação musical.">
    <link rel="icon" type="image/x-icon" href="public/img/logo/lifter.png">

    <title inertia>{{ config('app.name', 'Lifter') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite('resources/js/app.tsx')
    @inertiaHead
</head>

<body class="font-sans antialiased">
    <div id="fb-root"></div>
    <!--<script async defer crossorigin="anonymous"
        src="https://connect.facebook.net/pt_PT/sdk.js#xfbml=1&version=v18.0&appId=1588022325068116" nonce="sLLYLydU">
    </script> -->

    <script>
        window.fbAsyncInit = function() {
            FB.init({
                appId: '1588022325068116',
                xfbml: true,
                version: 'v18.0'
            });
            FB.AppEvents.logPageView();
        };

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    </script>

    <script async src="https://cse.google.com/cse.js?cx=f629749d2e908476b"></script>


    <script async defer crossorigin="anonymous"
        src="https://connect.facebook.net/pt_PT/sdk.js#xfbml=1&version=v20.0&appId=1588022325068116" nonce="XjFc4yqc">
    </script>

    @inertia


</body>

</html>
