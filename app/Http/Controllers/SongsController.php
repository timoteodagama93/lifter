<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;

class SongsController extends Controller
{
    //

    public function index()
    {
        return Inertia::render('Inicio/Inicio', []);
    }

    public function list()
    {
        return Inertia::render('Inicio/Inicio', [
            ['song']
        ]);
    }

    public function upload(Request $request)
    {
        return Inertia::render('Artistas/SongUpload', ['data' => $request]);
    }

    public function store()
    {
        $image = Request::file('avatar')->store('img', 'public');
        return Redirect::route('upload.form',['image'=>$image]);
    }

    public function song_validator()
    {
        return [
            'required',
            File::types(['mp3', 'mp4'])->max(1024),
        ];
    }
}
