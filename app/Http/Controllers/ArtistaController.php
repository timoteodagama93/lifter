<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Models\Comment;
use App\Models\Song;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

use function PHPUnit\Framework\stringContains;

class ArtistaController extends Controller
{
    //
    function index(Request $request)
    {
        return Inertia::render('Artistas/Index', [
            'data' => $request,
            'routas' => [
                'detalhes' => Route::has('detalhes'),
                'todos' => Route::has('todos'),
                'filtro' => Route::has('filtrar'),
            ]
        ]);
    }
    function store()
    {
        $user = User::where('id', auth()->id())->first();

        $artist = Artist::updateOrCreate(
            [
                'user_id' => $user->id,
            ],
            [
                'name' => Request::get('name'),
                'contact' => Request::get('contact'),
                'genres' => Request::get('genre'),
                'country' => Request::get('country'),
                'about' => Request::get('about'),
                'city' => Request::get('city'),

            ]
        );

        if (Request::file('cover')) {
            $file = Request::file('cover')->store("storage/artists/{$artist->id}/covers");
            $artist->url_cover = Storage::url($file);
        }
        $artist->save();

        $user->is_artist = true;
        $user->save();
        return;
    }

    function update_info(Request $request)
    {
        $data = Request::get('data');
        $artist = Artist::where('id', $data['id'])->first();

        $artist->name = $data['name'];
        $artist->genres = $data['genre'];
        $artist->contact = $data['contact'];
        $artist->about = $data['about'];
        $artist->country = $data['country'];
        $artist->city = $data['city'];
        $artist->save();
        return response()->json($artist);
    }

    /**
     * @param artist_id
     * @param cover
     */
    public function save_cover()
    {

        $artist = Artist::where('id', Request::get('artist_id'))->first();
        $file = Request::file('cover')->store("storage/artists/$artist->id/covers");
        $artist->url_cover = $file;
        $artist->save();
        return  response()->json($artist);
    }

    function artist_stats($artistId)
    {
        $qtd_comentarios = 0;
        $qtd_feedbacks = 0;
        $qtd_likes = 0;
        $qtd_avaliacoes = 0;
        $qtd_collections = 0;

        $songs = DB::select(
            "SELECT id, mime_type FROM `songs` COUNT WHERE artist_id = ? ",
            [$artistId]
        );

        foreach ($songs as $song) {
            $comments = db::select(
                "SELECT * FROM comments COUNT WHERE song_id = ? ",
                [$song->id]
            );
            $likes = db::select(
                "SELECT * FROM likes COUNT WHERE song_id = ? ",
                [$song->id]
            );
            $valuations = db::select(
                "SELECT * FROM valuations COUNT WHERE song_id = ? ",
                [$song->id]
            );
            $collections = db::select(
                "SELECT * FROM colletions COUNT WHERE song_id = ? ",
                [$song->id]
            );
            $feedbacks = db::select(
                "SELECT * FROM feedbacks COUNT WHERE song_id = ? ",
                [$song->id]
            );
            $qtd_comentarios += sizeof($comments);
            $qtd_likes += sizeof($likes);
            $qtd_avaliacoes += sizeof($valuations);
            $qtd_feedbacks += sizeof($feedbacks);
            $qtd_collections += sizeof($collections);
            $qtd_feedbacks += sizeof($comments);
        }
        return response()->json([
            'quantidade_musicas' =>  DB::select(
                "SELECT id FROM `songs` COUNT WHERE artist_id = ? AND mime_type LIKE '%audio%'",
                [$artistId]
            ),
            'quantidade_videos' => DB::select(
                "SELECT id FROM `songs` COUNT WHERE artist_id = ? AND mime_type LIKE '%video%'",
                [$artistId]
            ),
            'quantidade_comentarios' => $qtd_comentarios,
            'quantidade_gostos' => $qtd_likes,
            'quantidade_avaliacoes' => $qtd_avaliacoes,
            'quantidade_feedbacks' => $qtd_feedbacks,
            'quantidade_colecoes' => $qtd_collections,
            'quantidade_feedbacks' => $qtd_feedbacks,
        ]);
    }
}
