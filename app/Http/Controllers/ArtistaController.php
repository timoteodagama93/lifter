<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class ArtistaController extends Controller
{
    //
    function index(Request $request)
    {
        return Inertia::render('Artistas/Index', [
            'data' => $request,
            'id' => $request['id'],
            'pagina' => $request['pagina'],
            'routas' => [
                'detalhes' => Route::has('detalhes'),
                'todos' => Route::has('todos'),
                'filtro' => Route::has('filtrar'),
            ]
        ]);
    }
    function store(Request $request)
    {
        $artist = Artist::create([
            'user_id' => Auth::user()->getAuthIdentifier(),
            'name' => $request->input('name'),
            'genres' => $request->input('genre'),
            'contact' => $request->input('contact'),
            'country' => $request->input('country'),
            'about' => $request->input('about'),
            'city' => $request->input('city'),
        ]);
        return response()->json($artist);
    }

    function update_info(Request $request)
    {
        $artist = Artist::where('id', Request::get('id'))->first();

        $artist->name = Request::get('name');
        $artist->genres = Request::get('genre');
        $artist->contact = Request::get('contact');
        $artist->about = Request::get('about');
        $artist->country = Request::get('country');
        $artist->city = Request::get('city');
        $artist->save();
        return response()->json($artist);
    }

    public function save_cover()
    {

        $artist = Artist::where('id', Request::get('id'))->first();
        $file = Request::file('cover')->store("artists/covers/{$artist->id}", 'public');
        $artist->url_cover = $file;
        $artist->save();
        return; // response()->json($artist);
    }
}
