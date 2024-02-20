<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialMediaController extends Controller
{
    //

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
