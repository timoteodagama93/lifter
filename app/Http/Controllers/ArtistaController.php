<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ArtistaController extends Controller
{
    //
    function index(Request $request)
    {
        return Inertia::render('Artistas/Index', [
            'data' => $request,
            'routas' => [
                'detalhes' => Route::has('detalhes'),
                'todos' => Route::has('todos'),
                'filtro' => Route::has('filtrar'),
            ]
        ]);
    }
    function store()
    {
        $user = User::where('id', auth()->id())->first();
        
        $artist = Artist::updateOrCreate(
            [
                'user_id' => $user->id,
            ],
            [
                'name' => Request::get('name'),
                'contact' => Request::get('contact'),
                'genres' => Request::get('genre'),
                'country' => Request::get('country'),
                'about' => Request::get('about'),
                'city' => Request::get('city'),

            ]
        );

        $file = Request::file('cover')->store("artists/{$artist->id}/covers", 'public');

        $user->is_artist = true;
        $user->save();

        $artist->url_cover = Storage::url($file);
        $artist->save();
        return $artist;
    }

    function update_info(Request $request)
    {
        $data = Request::get('data');
        $artist = Artist::where('id', $data['id'])->first();

        $artist->name = $data['name'];
        $artist->genres = $data['genre'];
        $artist->contact = $data['contact'];
        $artist->about = $data['about'];
        $artist->country = $data['country'];
        $artist->city = $data['city'];
        $artist->save();
        return response()->json($artist);
    }

    /**
     * @param artist_id
     * @param cover
     */
    public function save_cover()
    {

        $artist = Artist::where('id', Request::get('artist_id'))->first();
        $file = Request::file('cover')->store("artists/covers/{$artist->id}", 'public');
        $artist->url_cover = $file;
        $artist->save();
        return  response()->json($artist);
    }
}
