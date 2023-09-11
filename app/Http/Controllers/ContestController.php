<?php

namespace App\Http\Controllers;

use App\Models\Contest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class ContestController extends Controller
{

    public function store()
    {
        $file = Request::file('file')->store('posts', 'public');
        $user_id = Auth::id();
        $post = Contest::create(
            [
                'post_text' => Request::input('text'),
                'mime_type' => Request::file('file')->extension(),
                'file_url' => $file,
                'file_path' => $file,
                'user_id' => $user_id,
            ]
        );

        return;  //response()->json($post);// $post;
    }

    public function get()
    {
        return response()->json(Contest::all());
    }
}
