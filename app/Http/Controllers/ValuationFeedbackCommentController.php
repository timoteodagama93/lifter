<?php

namespace App\Http\Controllers;

use App\Models\Colletion;
use App\Models\Comment;
use App\Models\Feedback;
use App\Models\Playlist;
use App\Models\User;
use App\Models\Valuation;
use Illuminate\Support\Facades\DB;
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
                'collection_id' => Request::get('collection_id'),
                'collection_type' => Request::get('collection_type'),
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
                'collection_id' => Request::get('collection_id'),
                'collection_type' => Request::get('collection_type'),
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
        $collection = Colletion::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'collection_id' => Request::get('collection_id'),
                'collection_type' => Request::get('collection_type'),
            ]

        );
        return response()->json($collection);
    }

    /**
     * Obtém os comentários de uma música
     */
    public function get_comments()
    {
        $collectionId = Request::get('collection_id');
        $collectionType = Request::get('collection_type');

        return DB::select('SELECT * FROM  comments WHERE collection_id=? AND collection_type=? ORDER BY created_at DESC', [$collectionId, $collectionType]);
    }

    /**
     * Obtém o usuário de um comentario em uma musica
     */
    public function get_comment_user()
    {
        return response()->json(User::all()->where('id', Request::get('id')));
    }
}
