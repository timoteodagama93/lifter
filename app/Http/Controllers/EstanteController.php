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

        $coverUrl = Request::file('cover')->store("public/users/estantes/$estante->id/covers");


        if ($coverUrl) {
            $saved_name = Request::file('cover')->hashName();
            $original_name = Request::file('cover')->getClientOriginalName();
            $estante->cover = Storage::url($coverUrl);
            $estante->mime_type = Request::file('cover')->getClientMimeType();
            $estante->extension = Request::file('cover')->getClientOriginalExtension();
            $estante->saved_name = $saved_name;
            $estante->original_name = $original_name;
            $estante->save();
        }

        return to_route('arts', ['has' => 'estante']);
    }

    public function store_book()
    {

        var_dump(Request::all());


        Validator::make(Request::all(), [
            'pdf' => ['mimes:pdf,doc,docx, epub, html'],
            'title' => ['required'],
            'category' => ['required'],
            'resume' => ['required'],
        ])->validate();
        $userId = auth()->id();
        $estante = Estante::find(Request::input('estante_id'));

        if (Request::file('pdf')) {
            $itemUrl = Request::file('pdf')->store("public/users/estantes/$estante->id/books");
            $mimeType = Request::file('pdf')->getClientMimeType();
            $extension = Request::file('pdf')->getClientOriginalExtension();

            $saved_name = Request::file('pdf')->hashName();
            $original_name = Request::file('pdf')->getClientOriginalName();

            $book = Book::create([
                'estante_id' => $estante->id,
                'title' => Request::input('title'),
                'category' => Request::input('category'),
                'resume' => Request::input('resume'),
                'book_url' => Storage::url($itemUrl),
                'mime_type' => $mimeType,
                'saved_name' => $saved_name,
                'original_name' => $original_name,
                'extension' => $extension,
            ]);

            if (Request::file('cover')) {
                $coverUrl = Request::file('cover')->store("public/users/estantes/$estante->id/books/covers");
                $mimeType = Request::file('cover')->getClientMimeType();
                $cover_saved_name = Request::file('cover')->hashName();

                $book->cover = $coverUrl;
                $book->cover_mime_type = $mimeType;
                $book->cover_saved_name = $cover_saved_name;
                $book->has_cover = true;
                $book->save();
            }
            return 1;
        } else {
            $book = Book::create([
                'estante_id' => $estante->id,
                'title' => Request::input('title'),
                'category' => Request::input('category'),
                'resume' => Request::input('resume'),
                'html' => true,
            ]);

            return;
        }
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
