<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function redirectToGoogle()
    {

        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->user();

        $user = User::firstOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
                'password' => Hash::make($googleUser->getId()),
            ]
        );

        Auth::login($user);

        return redirect()->intended('/avaliacoes');
    }
    public function redirectToFacebook()
    {

        return Socialite::driver('facebook')->redirect();
    }

    public function handleFacebookCallback()
    {

        $userF = Socialite::driver('facebook')->user();
        $user = User::firstOrCreate(
            ['email' => $userF->getEmail()],
            [
                'name' => $userF->getName(),
                'facebook_id' => $userF->getId(),
                'password' => Hash::make($userF->getId()),
            ]
        );

        Auth::login($user);

        return redirect()->intended('/avaliacoes');
    }
}
