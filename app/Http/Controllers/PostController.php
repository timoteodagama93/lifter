<?php

namespace App\Http\Controllers;

use App\Models\Media;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{

    //


    public function store()
    {
        $file = Request::file('file')->store('posts', 'public');
        $user_id = Auth::id();
        $post = Post::create(
            [
                'post_text' => Request::input('text'),
                'mime_type' => Request::file('file')->extension(),
                'file_url' => Storage::url($file),
                'file_path' => $file,
                'user_id' => $user_id,
            ]
        );

        return;  //response()->json($post);// $post;
    }

    public function store_media(Request $request)
    {
        Gate::authorize('upload-files');
        $file = $request->file('file');
        $name = $file->hashName();
        $upload = Storage::put("posts/{$name}", $file);
        $media_file = Media::query()->create([
            'attributes' => [
                'name' => "$name",
                'file_name' => $file->hashName(),
                'mime_type' => $file->extension(),
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

        dd($media_file);

        return redirect()->back();
    }
    public function post_song()
    {
        $file = Request::file('file')->store('posts/songs', 'public');
        $post = Post::create(
            [
                'post_text' => Request::input('text'),
                'mime_type' => Request::file('file')->getClientMimeType(),
                'file_url' => $file,
                'file_path' => $file
            ]
        );

        return $post;
    }

    public function get()
    {
        return response()->json(Post::all());
    }
}
