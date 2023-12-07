<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Media;
use App\Models\Post;
use App\Models\PostLike;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Mockery\Matcher\Type;

class PostController extends Controller
{

    //


    public function store()
    {
        if (Request::file('file') != null) {

            validator(Request::all(), [
                'file' => ['required', 'max:5120', 'mimes:jpg,png,jpeg,gif,mp3,mp4,webm'],
                'text' => ['required'],
                'community' => ['required'],
            ])->validate();

            $file = Request::file('file')->store('public/posts');

            $user = Auth::user();
            $user_id = $user->id;

            $community = Request::input('community');
            $from = 'comunidade';
            if ($user->is_manager == 1) {
                $from = 'lifter';
            }
            $post = Post::create(
                [
                    'post_text' => Request::input('text'),
                    'community' => $community,
                    'mime_type' => Request::file('file')->getMimeType(),
                    'file_url' => Storage::url($file),
                    'file_path' => $file,
                    'user_id' => $user_id,
                ]
            );
        } else {
            validator(Request::all(), [
                'text' => ['required'],
                'community' => ['required'],
            ])->validate();
            $user = Auth::user();
            $user_id = $user->id;
            $from = 'comunidade';
            if ($user->is_manager == 1) {
                $from = 'lifter';
            }

            $post = Post::create(
                [
                    'post_text' => Request::input('text'),
                    'community' => Request::input('community'),
                    'user_id' => $user_id,
                ]
            );
        }

        return;  //response()->json($post);// $post;
    }

    public function comment()
    {
        $valuation = Comment::create(
            [
                'user_id' => auth()->id(),
                'post_id' => Request::get('song_id'),
                'comment' => Request::get('comment'),
                'public' => Request::get('public'),
            ]
        );
        return response()->json($valuation);
    }
    public function comment_on_post()
    {
        $valuation = Comment::create(
            [
                'user_id' => auth()->id(),
                'post_id' => Request::get('post_id'),
                'comment' => Request::get('comment'),
                'public' => Request::get('public'),
            ]
        );
        return response()->json($valuation);
    }

     /**
     * Obtém os comentários de uma música
     */
    public function comments()
    {
        $postId = Request::get('post_id');

        return DB::select('SELECT * FROM  comments WHERE post_id=? ORDER BY created_at DESC', [$postId]);
    }

        /**
     * Obtém o usuário de um comentario em uma musica
     */
    public function get_comment_user()
    {
        return response()->json(User::all()->where('id', Request::get('id')));
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
        $file = Request::file('file')->store('public/posts/songs');
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

    public function get($filter = 'tudo')
    {
        if ($filter == 'tudo') {
            return response()->json(DB::select('select * from posts ORDER BY created_at DESC'));
        } else {
            return response()->json(DB::select('select * from posts where community =?  ORDER BY created_at DESC', [$filter]));
        }
    }
    public function like($postId)
    {
        $post = Post::all()->where('id', $postId)->first();
        PostLike::updateOrCreate(
            [
                'post_id' => $postId,
                'user_id' => auth()->id(),
            ],
            [
                'type' => 'like',
            ]
        );
        $post->likes = PostLike::where('post_id', $postId)->count();
        $post->save();
        return response()->json($post);
    }
}
