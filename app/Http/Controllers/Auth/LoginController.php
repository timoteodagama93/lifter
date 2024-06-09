<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

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
        Log::info('Facebook callback initiated.');
        try {
            $userFb = Socialite::driver('facebook')->user();
            Log::info('User retrieved from Facebook.', ['user' => $userFb]);

            $user = User::firstOrCreate(
                ['email' => $userFb->getEmail()],
                [
                    'name' => $userFb->getName(),
                    'facebook_id' => $userFb->getId(),
                    'password' => Hash::make($userFb->getId()),
                ]
            );

            Auth::login($user);
            Log::info('User logged in.', ['user' => $user]);

            return redirect()->intended('/avaliacoes');
        } catch (\Exception $e) {
            Log::error('Error during Facebook callback.', ['error' => $e->getMessage()]);
            return redirect('/login')->with('error', 'Unable to login using Facebook. Please try again.');
        }
    }
}
