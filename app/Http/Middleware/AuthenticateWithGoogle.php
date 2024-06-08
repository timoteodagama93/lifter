<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class AuthenticateWithGoogle
{
    public function handle($request, Closure $next)
    {
        if ($request->input('token')) {
            $token = $request->input('token');
            $googleUser = Socialite::driver('google')->stateless()->userFromToken($token);

            $user = User::firstOrCreate(
                ['email' => $googleUser->getEmail()],
                ['name' => $googleUser->getName(), 'google_id' => $googleUser->getId()]
            );

            Auth::login($user);
        }

        return $next($request);
    }
}
