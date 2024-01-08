<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Estante;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class EstanteController extends Controller
{
    //

    public function store()
    {
        Validator::make(Request::all(), [
            'cover' => ['required', 'mimes:png,jpg,jpeg, mp4'],
            'title' => ['required'],
            'author' => ['required'],
            'category' => ['required'],
            'description' => ['required'],
            ])->validate();
            $userId = auth()->id();
            
        //    dd(Request::all());
        $estante = Estante::updateOrCreate(
            [
                'user_id' => $userId,
                'title' => Request::input('title'),
            ],
            [
                'author' => Request::input('author'),
                'category' => Request::input('category'),
                'description' => Request::input('description'),
            ]
        );

        $coverUrl = Request::file('cover')->store("public/users/$userId/estantes/$estante->id/covers");
        if ($coverUrl) {
            $estante->cover = Storage::url($coverUrl);
            $estante->mime_type = Request::file('cover')->getClientMimeType();
            $estante->extension = Request::file('cover')->getClientOriginalExtension();
            $estante->save();
        }

        return to_route('arts', ['has' => 'estante']);
    }

    public function store_book()
    {
        Validator::make(Request::all(), [
            'book' => ['mimes:png,jpg,jpeg'],
            'title' => ['required'],
            'category' => ['required'],
            'description' => ['required'],
        ])->validate();
        $userId = auth()->id();
        $estante = Estante::find(Request::input('estante_id'));

        if (Request::file('item')) {
            $itemUrl = Request::file('item')->store("public/users/$userId/estantes/$estante->id/books");
            $mimeType = Request::file('item')->getClientMimeType();
            $extension = Request::file('item')->getClientOriginalExtension();

            $book = Book::create([
                'estante_id' => $estante->id,
                'title' => Request::input('title'),
                'category' => Request::input('category'),
                'description' => Request::input('description'),
                'item_url' => Storage::url($itemUrl),
                'mime_type' => $mimeType,
                'extension' => $extension,
            ]);
        } else {
            $book = Book::create([
                'estante_id' => $estante->id,
                'title' => Request::input('title'),
                'category' => Request::input('category'),
                'description' => Request::input('description'),
            ]);
        }

        return to_route('arts', ['has' => 'estante']);
    }

    public function get_estantes()
    {
        return Estante::all();
    }

    public function get_estante_books($estanteId)
    {
        return DB::select("SELECT * FROM books WHERE estante_id=$estanteId");
    }
}
