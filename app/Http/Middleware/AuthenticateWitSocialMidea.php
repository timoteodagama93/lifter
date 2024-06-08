<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class AuthenticateWitSocialMidea
{
    public function handle($request, Closure $next)
    {
        return $next($request);
    }
}
