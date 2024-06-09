<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Colletion;
use App\Models\Comment;
use App\Models\Exposition;
use App\Models\ExpositionsItems;
use App\Models\Feedback;
use App\Models\Like;
use App\Models\Song;
use App\Models\User;
use App\Models\Valuation;
use App\Models\Video;
use Faker\Provider\Lorem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;

class InteragirController extends Controller
{
    //
    /**
     * CURTIR UMA COLEÇÂO, Músca, Vídeo, Livro, fotografia, etc.
     */
    public function like_collection()
    {
        $userId = Auth::user()->id;
        $collectionId = Request::get('collection_id');
        $collectionType = Request::get('collection_type');

        if ($collectionType == 'arte_visual') {
            $collection = ExpositionsItems::find($collectionId);

            $liked = Like::where(['collection_id' => $collection->id, 'user_id' => $userId]);
            if (!$liked) {
                $collection->likes = $collection->likes + 1;
                $collection->save();
            } else {
                //TODO: Quando implementar o descurtir deve reduzir aqui os likes
            }

            $like = Like::updateOrCreate(
                [
                    'user_id' => $userId,
                    'collection_id' => $collection->id,
                    'collection_type' => $collectionType,
                ]
            );
        }

        if ($collectionType == 'video') {
            $collection = Video::find($collectionId);

            $liked = Like::where(['collection_id' => $collection->id, 'user_id' => $userId]);
            if (!$liked) {
                $collection->likes = $collection->likes + 1;
                $collection->save();
            } else {
                //TODO: Quando implementar o descurtir deve reduzir aqui os likes
            }

            $like = Like::updateOrCreate(
                [
                    'user_id' => $userId,
                    'collection_id' => $collection->id,
                    'collection_type' => $collectionType
                ],
            );
        }

        if ($collectionType == 'literatura') {
            $collection = Book::find($collectionId);

            $liked = Like::where(['collection_id' => $collection->id, 'user_id' => $userId]);
            if (!$liked) {
                $collection->likes = $collection->likes + 1;
                $collection->save();
            } else {
                //TODO: Quando implementar o descurtir deve reduzir aqui os likes
            }

            $like = Like::updateOrCreate(
                [
                    'user_id' => $userId,
                    'collection_id' => $collection->id,
                    'collection_type' => $collectionType
                ],
            );
        }

        return response()->json($like);
    }

    /**
     * Obtém a avaliação do usuário em uma música
     */
    public function minha_avaliacao()
    {
        $stars = 0;
        $userId = Auth::user()->id;
        $collectionId = Request::get('collection_id');
        $collectionType = Request::get('collection_type');

        //Retorna zero como quantidade de estrelas dadas caso o usuário ainda não tenha votado na música.
        if (Valuation::where(['user_id' => $userId, 'collection_id' => $collectionId])->count() <= 0) {
            return response()->json($stars);
        }

        //Obtém a quantidade de estrelas que o usuário deu a música.
        $stars = Valuation::where(
            [
                'user_id' => $userId,
                'collection_id' => $collectionId,
                'collection_type' => $collectionType,
            ]
        )->first()->stars;

        return response()->json($stars);
    }
    /**
     * Obtém a avaliação do usuário em uma música
     */
    public function song_valuations()
    {
        $totalStars = 0;
        $collectionId = Request::get('collection_id');
        $collectionType = Request::get('collection_type');

        //Obtém a quantidade de estrelas que o usuário deu a música.
        $vals = DB::select("SELECT * FROM valuations COUNT WHERE     
            collection_id =?  AND
            collection_type =?", [$collectionId, $collectionType]);

        foreach ($vals as $val) {
            $totalStars += $val->stars;
        }
        return response()->json($totalStars);
    }


    /**
     * Salva uma avaliação musiical
     */
    public function stars_to_collection()
    {

        $stars = Request::get('stars');
        $userId = Auth::user()->id;
        $collectionId = Request::get('collection_id');
        $collectionType = Request::get('collection_type');
        //Obter a coleção
        $collection = null;
        if ($collectionType == 'song') {
            $collection = Song::where('id', $collectionId)->first();
        } else if ($collectionType == 'video') {
            $collection = Video::where('id', $collectionId)->first();
        } else if ($collectionType == 'literatura') {
            $collection = Book::where('id', $collectionId)->first();
        } else if ($collectionType == '') {
            $collection = Video::where('id', $collectionId)->first();
        }

        //Verifica se é uma avaliação que ira actualizar uma antiga, para subtrair a quantidade de estrelas.
        if (Valuation::where(['user_id' => $userId, 'collection_id' => $collectionId])->count() > 0) {
            $older_val = Valuation::where(['user_id' => $userId, 'collection_id' => $collectionId])->first()->stars;
            $collection->stars = $collection->stars - $older_val;
        }

        $collection->save();
        $collection->stars = $collection->stars + $stars;

        $val = DB::update("UPDATE valuations SET collection_id='$collection->id', user_id=$userId, collection_type='$collectionType', stars=$stars WHERE collection_id='$collection->id' AND user_id=$userId AND collection_type='$collectionType' ");
        if ($val <= 0) {
            $val = DB::insert("INSERT INTO valuations (collection_id,user_id,collection_type,stars) VALUES ('$collection->id', $userId, '$collectionType', $stars)");
            return response()->json($val);
        }
        return response()->json($val);
    }

    /**
     * Avalia o conteúdo: Pontos, emojis, positivo ou negativo.
     */
    public function valuate_colletion()
    {
        $userId = Auth::user()->id;
        $collectionId = Request::input('collection_id');
        $collectionType = Request::input('collection_type');
        $emotions = Request::input('emotions');
        $points = Request::input('points');
        $negative = Request::input('negative') == true ? 1 : 0;
        $why_negative = Request::input('why_negative');

        //Obter a coleção
        $collection = null;
        if ($collectionType == 'song') {
            $collection = Song::where('id', $collectionId)->first();
        } else if ($collectionType == 'video') {
            $collection = Video::where('id', $collectionId)->first();
        } else if ($collectionType == 'literatura') {
            $collection = Book::where('id', $collectionId)->first();
        } else if ($collectionType == '') {
            $collection = Video::where('id', $collectionId)->first();
        }

        $val = DB::update("UPDATE valuations SET collection_id='$collection->id', user_id=$userId, collection_type='$collectionType', emotion='$emotions',
        points=$points, negative=$negative, why_negative='$why_negative' WHERE collection_id='$collection->id' AND user_id=$userId AND collection_type='$collectionType' ");
        if ($val <= 0) {
            $val =
                DB::insert("INSERT INTO valuations (
                collection_id,user_id,collection_type, emotion,
                points,
                negative,
                why_negative
            ) VALUES (
                '$collection->id', $userId, '$collectionType', '$emotions',
                $points,
                $negative,
                '$why_negative' )");
            return response('');
        }
        return response('');
    }


    /**
     * Avalia o conteúdo: Pontos, emojis, positivo ou negativo.
     */
    public function share_feedback()
    {
        $feedback = Feedback::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'collection_id' => Request::input('collection_id'),
                'collection_type' => Request::input('collection_type'),
            ],
            [
                'message' => Request::input('feedback'),
                'public' => Request::input('public'),
            ]
        );
        return response('');
    }

    /**
     * Avalia o conteúdo: Pontos, emojis, positivo ou negativo.
     */
    public function share_comment()
    {
        $comment = Comment::create(
            [
                'user_id' => '' . auth()->id(),
                'collection_id' => Request::get('collection_id'),
                'collection_type' => Request::get('collection_type'),
                'comment' => Request::get('comment'),
                'public' => Request::get('public'),
            ]
        );
        return  response('');
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

        return DB::select('SELECT * FROM  comments WHERE collection_id=? AND collection_type=? ORDER BY updated_at DESC', [$collectionId, $collectionType]);
    }

    /**
     * Obtém os feedbacks de uma música
     */
    public function get_feedbacks()
    {
        $collectionId = Request::get('collection_id');
        $collectionType = Request::get('collection_type');

        return DB::select('SELECT * FROM  feedbacks WHERE collection_id=? AND collection_type=? ORDER BY updated_at DESC', [$collectionId, $collectionType]);
    }

    /**
     * Obtém o usuário de um comentario em uma musica
     */
    public function get_comment_user()
    {
        return response()->json(User::all()->where('id', Request::get('id')));
    }

    public function download($collectionId, $collectionType)
    {
        if ($collectionType == 'video') {
            $collection = Video::find($collectionId);

            if (!$collection)
                abort(404, 'Música não encontrada');

            $collection->downloads = $collection->downloads + 1;
            $collection->save();
            $path = storage_path("app\\public\\users\\$collection->user_id\\videos\\$collection->saved_name");

            $headers = [
                'Content-Type' => $collection->mime_type,
                'Content-Disposition' => 'attach; filename="' . $collection->original_name . '"'
            ];
            return response()->download($path, $collection->original_name, $headers);
        }

        if ($collectionType == 'literatura') {
            $collection = Book::find($collectionId);

            if (!$collection)
                abort(404, 'Música não encontrada');

            $collection->downloads = $collection->downloads + 1;
            $collection->save();
            $path = storage_path("app\\public\\users\\$collection->user_id\\estantes\\$collection->estante_id\\books\\$collection->saved_name");

            $headers = [
                'Content-Type' => $collection->mime_type,
                'Content-Disposition' => 'attach; filename="' . $collection->original_name . '"'
            ];
            return response()->download($path, $collection->original_name, $headers);
        } else {
            $collection = Book::find($collectionId);

            if (!$collection)
                abort(404, 'Música não encontrada');

            $collection->downloads = $collection->downloads + 1;
            $collection->save();
            $path = storage_path("app\\public\\users\\$collection->user_id\\expositions\\$collection->room_id\\books\\$collection->saved_name");

            $headers = [
                'Content-Type' => $collection->mime_type,
                'Content-Disposition' => 'attach; filename="' . $collection->original_name . '"'
            ];
            return response()->download($path, $collection->original_name, $headers);
        }
    }
}
