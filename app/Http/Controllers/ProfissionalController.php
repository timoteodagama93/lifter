<?php

namespace App\Http\Controllers;

use App\Models\Profissional;
use App\Models\User;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;

class ProfissionalController extends Controller
{
    //

    public function store()

    {


        $user = User::where('id', auth()->id())->first();

        $pro = Profissional::updateOrCreate(
            [
                'user_id' => $user->id,
            ],
            [
                'name' => Request::get('name'),
                'category' => Request::get('category'),
                'contact' => Request::get('contact'),
                'genres' => Request::get('genre'),
                'country' => Request::get('country'),
                'about' => Request::get('about'),
                'city' => Request::get('city'),

            ]
        );

        $user->is_profissional = true;
        $user->save();

        if (Request::file('cover')) {
            $file = Request::file('cover')->store("public/profissionals/{$pro->id}/covers");
            $pro->url_cover = Storage::url($file);
            $pro->save();
        }

        return response()->redirectTo('/perfis');
    }
}
