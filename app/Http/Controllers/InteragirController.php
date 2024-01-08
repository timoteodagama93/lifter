<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Exposition;
use App\Models\ExpositionsItems;
use App\Models\Like;
use App\Models\Video;
use Illuminate\Support\Facades\Auth;
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
}
