<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureUserIsProvider
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->user()?->user_type !== 'provider') {
            return response()->json(['message' => 'Accès réservé aux prestataires.'], 403);
        }
        return $next($request);
    }
}