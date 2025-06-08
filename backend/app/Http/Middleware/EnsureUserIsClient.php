<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureUserIsClient
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->user()?->user_type !== 'client') {
            return response()->json(['message' => 'Accès réservé aux clients.'], 403);
        }
        return $next($request);
    }
}