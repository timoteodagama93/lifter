<?php

namespace App\Http\Controllers;

use App\Models\ContestsSong;
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
        info($request->all());
        //        $url = \Illuminate\Support\Facades\Storage::disk('public')->files('img/jp1MmVJ7qMdpA6dazdoXsAI9YpxAW6LFpYNl1HR1.jpg');
        //      return Inertia::render('Artistas/SongUpload', [$request, $url]);
    }

    public function store(Request $request)
    {

        $file = Request::file('avatar');
        $file_extension = Request::file('avatar')->getClientOriginalExtension();
        $file_name = Request::file('avatar')->getFilename();
        $file_mime = Request::file('avatar')->getMTime();
        $file_path = Request::file('avatar')->getPath();
        $file_pathname = Request::file('avatar')->getPathname();
        $image = Request::file('avatar')->store('img', 'public');


        $data = [$file_extension, $file_name, $file_mime, $file_path, $file_pathname, $image];
        //dd($image);
        //dd($file);
        //dd($data);
        return Redirect::route('upload.form', $data);
    }

    public function update(Request $request)
    {

        $file = Request::file('avatar');
        $file_extension = Request::file('avatar')->getClientOriginalExtension();
        $file_name = Request::file('avatar')->getFilename();
        $file_mime = Request::file('avatar')->getMTime();
        $file_path = Request::file('avatar')->getPath();
        $file_pathname = Request::file('avatar')->getPathname();
        $image = Request::file('avatar')->store('img', 'public');


        $data = [$file_extension, $file_name, $file_mime, $file_path, $file_pathname, $image];
        //dd($image);
        //dd($file);
        //dd($data);
        return Redirect::route('upload.form', $data);
    }

    public function song_validator()
    {
        return [
            'required',
            File::types(['mp3', 'mp4'])->max(1024),
        ];
    }

    public function get_ascensao_artists()
    {
        return response()->json(
            ContestsSong::where('contest_name', 'ASCENSAO')
        );
    }
}
