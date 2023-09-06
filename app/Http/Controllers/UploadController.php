<?php

namespace App\Http\Controllers;

use App\Models\Media;
use App\Models\Song;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;

class UploadController extends Controller
{
    /**
     * Handle the incoming request.
     */
    /*
    public function __invoke(Request $request)
    {
        //
        Gate::authorize('upload-files');
        $file = $request->file('file');
        $name = $file->hashName();
        $upload = Storage::put("posts/{$name}", $file);
        Media::query()->create([
            'attributes' => [
                'name' => "$name",
                'file_name' => $file->getClientOriginalName(),
                'mime_type' => $file->getClientMimeType(),
                'path' => "posts/{$name}",

                'disk' => config('app.uploads.disk'),
                'file_has' => hash_file(
                    config('app.uploads.hash'),
                    storage_path(
                        path: "posts/{$name}",
                    )
                ),
                'colletion' => $request->get(''),
                'size' => $file->getSize(),
            ],
        ]);

        return redirect()->back();
    }
    */
    public function song()
    {
        //Gate::authorize('upload-files');
        $request = Request::capture();
        $request->validateWithBag('AddingSongErrors', [
            'song' => 'required',
            'title' => ['required'],
            'artist_name' => ['required'],
        ]);
        $user_id = Request::user()->id;

        $file = Request::file('song');

        $song_file =  Request::file('song')->store("songs/{$user_id}", 'public');
        $song = Song::create([
            'title' => $request->input('title'),
            'artist' => $request->input('artist_name'),
            'cover' => '',
            'url' => '',
            'path' => '',
            'downloads' => 0,
            'shares' => 0,
        ]);

        Media::create([
            'song_id' => $song->id,
            'name' => $file->hashName(),
            'file_name' => $file->hashName(),
            'mime_type' => $file->extension(),
            'path' => $song_file,
            'file_has' => $file->hashName(),
        ]);

        return redirect("/edit.song/{$song->id}")->with('song', $song);
    }
    public function cover()
    {
        //
        //Gate::authorize('upload-files');
        //$request = Request::capture();
        $user_id = Request::user()->name;
        $song =  Request::file('song')->store("songs/{$user_id}", 'public');
        $cover = Request::file('cover')->store("songs/{$user_id}/covers", 'public');


        //$uploadS = Storage::put("songs/", $song);
        //$uploadC = Storage::put("songs/covers/", $cover);

        $media_file = Media::query()->create([
            [
                'name' => Request::input('title'),
                'file_name' => Request::file('song')->hashName(),
                'mime_type' => Request::file('song')->extension(),
                'path' => $song,

                'disk' => config('app.uploads.disk'),
                'file_has' => hash_file(
                    config('app.uploads.hash'),
                    storage_path(
                        path: "songs/{$user_id}",
                    )
                ),
                'colletion' => Request::file('song')->get(),
                'size' => Request::file('song')->getSize(),
            ],
        ]);


        dd($media_file);

        return redirect()->back();
    }
    public function payment()
    {
        //
        //Gate::authorize('upload-files');
        //$request = Request::capture();
        $user_id = Request::user()->name;
        $song =  Request::file('song')->store("songs/{$user_id}", 'public');
        $cover = Request::file('cover')->store("songs/{$user_id}/covers", 'public');


        //$uploadS = Storage::put("songs/", $song);
        //$uploadC = Storage::put("songs/covers/", $cover);

        $media_file = Media::query()->create([
            [
                'name' => Request::input('title'),
                'file_name' => Request::file('song')->hashName(),
                'mime_type' => Request::file('song')->extension(),
                'path' => $song,

                'disk' => config('app.uploads.disk'),
                'file_has' => hash_file(
                    config('app.uploads.hash'),
                    storage_path(
                        path: "songs/{$user_id}",
                    )
                ),
                'colletion' => Request::file('song')->get(),
                'size' => Request::file('song')->getSize(),
            ],
        ]);


        dd($media_file);

        return redirect()->back();
    }
    /**
     * Validação de imagens
     */
    public function mediaValidator()
    {
        return [
            'file' => [
                'required',
                File::types(['png', 'jpg', 'jpeg', 'mp3', 'mp4', 'webm'])->max(5 * 1024),
            ]
        ];
    }
}
