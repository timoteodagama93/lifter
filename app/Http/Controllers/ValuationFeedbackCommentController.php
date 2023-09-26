<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Feedback;
use App\Models\Playlist;
use App\Models\User;
use App\Models\Valuation;
use Illuminate\Support\Facades\Request;

class ValuationFeedbackCommentController extends Controller
{
    //



    /**
     * Avalia o conteúdo: Pontos, emojis, positivo ou negativo.
     */
    public function share_opinion()
    {
        $valuation = Valuation::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'song_id' => Request::get('song_id'),
            ],
            [
                'points' => Request::get('points'),
                'emotion' => Request::get('emotions'),
                'negative' => Request::get('negative'),
                'why_negative' => Request::get('why_negative'),
            ]
        );
        return response()->json($valuation);
    }


    /**
     * Avalia o conteúdo: Pontos, emojis, positivo ou negativo.
     */
    public function share_feedback()
    {
        $feedback = Feedback::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'song_id' => Request::get('song_id'),
            ],
            [
                'message' => Request::get('feedback'),
                'public' => Request::get('public'),
            ]
        );
        return response()->json($feedback);
    }

    /**
     * Avalia o conteúdo: Pontos, emojis, positivo ou negativo.
     */
    public function share_comment()
    {
        $valuation = Comment::create(
            [
                'user_id' => auth()->id(),
                'song_id' => Request::get('song_id'),
                'comment' => Request::get('comment'),
                'public' => Request::get('public'),
            ]
        );
        return response()->json($valuation);
    }


    /**
     * Avalia o conteúdo: Pontos, emojis, positivo ou negativo.
     */
    public function save_to_collection()
    {
        $playlist = Playlist::create(
            [
                'user_id' => auth()->id(),
                'song_id' => Request::get('song_id'),
                'comment' => Request::get('comment'),
                'public' => Request::get('public'),
            ]
        );
        return response()->json($playlist);
    }

    /**
     * Obtém os comentários de uma música
     */
    public function get_comments()
    {
        return response()->json(Comment::all()->where('song_id', Request::get('song_id'))); 
    }

    /**
     * Obtém o usuário de um comentario em uma musica
     */
    public function get_comment_user()
    {
        return response()->json(User::all()->where('id', Request::get('id')));
    }
}
