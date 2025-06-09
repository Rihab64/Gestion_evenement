<?php


namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * @var array
     */
    protected $middleware = [
        // Pour CORS (déjà présent normalement)
      
            \Illuminate\Http\Middleware\HandleCors::class,
        // Ajoutez d'autres middleware globaux ici
        
        'api' => [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    \Fruitcake\Cors\HandleCors::class,
    'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],

   
    ];
    

    /**
     * The application's route middleware groups.
     *
     * @var array
     */
    protected $middlewareGroups = [
        'web' => [
            // Pour Sanctum
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            // Ajoutez d'autres middleware pour le groupe web ici
        ],

        'api' => [
            // Ajoutez d'autres middleware pour le groupe api ici
        ],
    ];

 


    /**
     * The application's route middleware.
     *
     * @var array
     */
    protected $routeMiddleware = [
        // ...existing code...
        'client'   => \App\Http\Middleware\EnsureUserIsClient::class,
        'provider' => \App\Http\Middleware\EnsureUserIsProvider::class,
        'admin'    => \App\Http\Middleware\EnsureUserIsAdmin::class,
    ];
}