<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();
        $user = User::firstOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(), 'google_id' => $googleUser->getId(),
            ]
        );

        Auth::login($user);

        return redirect()->intended('/avaliacoes');
    }
    public function facebookpage()
    {

        return Socialite::driver('facebook')->redirect();
    }
    public function facebookredirect()
    {
        try {
            $user = Socialite::driver('facebook')->user();
            $findUser = User::where('facebook_id', $user->id)->first();
            if ($findUser) {
                Auth::login($findUser);
                return redirect()->intended('/avaliacoes');
            } else {
                $findUser = User::updateOrCreate(['email' => $user->email]);
            }
        } catch (Exception) {
        }
    }
}
