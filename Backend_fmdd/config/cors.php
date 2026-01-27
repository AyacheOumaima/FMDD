<?php



    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

//     'paths' => [
//         'api/*', 
//         'sanctum/csrf-cookie', 
//         'login', 
//         'logout', 
//         'register',
//         'insertions',       // السماح بالمسار POST /insertions
//         'insertions/*',     // السماح بأي sub-paths
//     ],

//     'allowed_methods' => ['*'],

//     // Allow common local dev origins (Vite default ports and 127.0.0.1 variants)
//     'allowed_origins' => [
//         'http://localhost:3000',
//         'http://127.0.0.1:3000',
//         'http://localhost:5173',
//         'http://127.0.0.1:5173',
//     ],

//     'allowed_origins_patterns' => [],

//     'allowed_headers' => ['*'],

//     'exposed_headers' => [],

//     'max_age' => 0,

//     'supports_credentials' => true,

// ];




return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    // Khaso ycover kol route li katbda b v1
    'paths' => [
        'api/*',               // routes API Laravel
        'v1/*',                // routes li f frontend /v1/...
        'sanctum/csrf-cookie', // CSRF pour Sanctum
    ],

    'allowed_methods' => ['*'], // allow all HTTP methods (GET, POST, PUT, DELETE)

    // Allowed origins (React localhost)
    'allowed_origins' => [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:5173',
        'http://127.0.0.1:5173',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'], // allow all headers

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true, // allow cookies/auth credentials
];
