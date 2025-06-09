<?php
return [
   'paths' => ['api/*', 'auth/*', 'sanctum/csrf-cookie'],

'allowed_origins' => [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:8000',
    'http://127.0.0.1:8000',
],

'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => true,

];
