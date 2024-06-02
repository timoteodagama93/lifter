<?php

namespace App\Http\Controllers;

use App\Models\Article as ModelsArticle;
use App\Models\User;
use Illuminate\Support\Facades\Request;

class ArticleController extends Controller
{
    //

    function store(Request $request)
    {
        $user = User::where('id', auth()->id())->first();

        $article = ModelsArticle::updateOrCreate(
            [
                'user_id' => $user->id,
                'title' => Request::get("article_title"),
                'html' => Request::get("html"),
            ],
        );

        return $article;
    }
    function articles()
    {

        $articles = ModelsArticle::all();

        return $articles;
    }
}
