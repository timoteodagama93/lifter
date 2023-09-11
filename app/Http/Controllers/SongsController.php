<?php

namespace App\Http\Controllers;

use App\Models\ContestsSong;
use App\Models\Song;
use App\Models\Valuation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;
use Symfony\Component\Console\Input\Input;

class SongsController extends Controller
{
    //

    public function index()
    {
        return Inertia::render('Inicio/Inicio', []);
    }

    public function list()
    {
        return Inertia::render('Inicio/Inicio', [
            ['song']
        ]);
    }

    public function store()
    {
        $artist_id = Request::input('artist_id');
        $song_url = Request::file("song")->store("artists/{$artist_id}/songs", 'public');

        if ($song_url != false) {

            //$cover_url = Request::file("cover")->store("artists/{$artist_id}/songs/covers", 'public');

            $file_extension = Request::file('song')->getClientOriginalExtension();
            $file_name = Request::file('song')->getFilename();
            $file_mime = Request::file('song')->getMimeType();
            $file_path = Request::file('song')->getPath();
            $file_pathname = Request::file('song')->getPathname();

            $artist = Song::create([
                'artist_id' => $artist_id,
                'title' => Request::input('title'),
                'genre' => Request::input('genre'),
                'artist' => Request::input('artist'),
                'gravadora' => Request::input('gravadora'),
                'participacoes' => Request::input('participacoes'),
                'letra' => Request::input('letra'),
                'mime_type' => $file_mime,
                'extension' => $file_extension,
                'url' => $song_url,
                //'cover' => $cover_url,
            ]);
            return;
        } else {
            return 'Alguma coisa deu errado...';
        }
    }

    public function store_from_youtube()
    {
        $artist_id = Request::input('artist_id');
        $song_url = Request::file("song")->store("artists/{$artist_id}/songs", 'public');



        if ($song_url != false) {

            //$cover_url = Request::file("cover")->store("artists/{$artist_id}/songs/covers", 'public');

            $file_extension = Request::file('song')->getClientOriginalExtension();
            $file_name = Request::file('song')->getFilename();
            $file_mime = Request::file('song')->getMimeType();
            $file_path = Request::file('song')->getPath();
            $file_pathname = Request::file('song')->getPathname();

            $artist = Song::create([
                'artist_id' => $artist_id,
                'title' => Request::input('title'),
                'genre' => Request::input('genre'),
                'artist' => Request::input('artist'),
                'gravadora' => Request::input('gravadora'),
                'participacoes' => Request::input('participacoes'),
                'letra' => Request::input('letra'),
                'mime_type' => $file_mime,
                'extension' => $file_extension,
                'url' => $song_url,
                //'cover' => $cover_url,
            ]);
            return;
        } else {
            return 'Alguma coisa deu errado...';
        }
    }

    function update_info(Request $d)
    {

        $data = $d::all();
        $artist_id = $data['artist_id'];
        $cover = Request::file("cover")->store("artists/{$artist_id}/covers", 'public');


        $song = Song::where('id', $data['id'])->first();

        $song->title = $data['title'];
        $song->genre = $data['genre'];
        $song->artist = $data['artist'];
        $song->gravadora = $data['gravadora'];
        $song->participacoes = $data['participacoes'];
        $song->letra = $data['letra'];
        $song->cover = $cover;

        $song->save();
        return; // response()->json($song);
    }

    function add_cover(Request $d)
    {

        $data = $d::all();
        $artist_id = $data['artist_id'];
        $song_id = $data['id'];
        $cover = Request::file("cover")->store("artists/{$artist_id}/covers", 'public');

        $song = Song::where('id', $song_id)->first();

        $song->cover = $cover;

        $song->save();
        return response()->json($song);
    }

    public function song_validator()
    {
        return [
            'required',
            File::types(['mp3', 'mp4'])->max(1024),
        ];
    }

    /**
     * Obté os artistas inscritos especificamente no concurso ascensão
     */
    public function get_ascensao_artists()
    {
        return response()->json(
            ContestsSong::where('contest_name', 'ASCENSAO')
        );
    }

    /**
     * Obté os artistas inscritos especificamente no concurso ascensão
     */
    public function get_valuation_songs()
    {
        return response()->json(
            Song::paginate(1)
        );
    }

    /**
     * Obté os artistas inscritos especificamente no concurso ascensão
     */
    public function get_all_songs()
    {
        return response()->json( Song::all());
    }


    /**
     * Obté os artistas inscritos especificamente no concurso ascensão
     */
    public function get_songs()
    {
        return Song::paginate(1);
    }

    /**
     * Salva uma avaliação musiical
     */
    public function avaliar()
    {
        $stars = Request::get('stars');
        $user_id = Auth::user()->id;
        $song_id = Request::get('song_id');
        //Obtem a música
        $song = Song::where('id', $song_id)->first();

        //Verifica se é uma avaliação que ira actualizar uma antiga, para subtrair a quantidade de estrelas.
        if (Valuation::where(['user_id' => $user_id, 'song_id' => $song_id])->count() > 0) {
            $older_val = Valuation::where(['user_id' => $user_id, 'song_id' => $song_id])->first()->stars;
            $song->stars = $song->stars - $older_val;
        }

        $song->stars = $song->stars + $stars;
        $song->save();

        $val = Valuation::updateOrCreate(
            [
                'user_id' => $user_id,
                'song_id' => $song_id,
            ],
            [
                'stars' => $stars,
            ]
        );

        return response()->json($val);
    }

    /**
     * Obtém a avaliação do usuário em uma música
     */
    public function minha_avaliacao()
    {
        $stars = 0;
        $user_id = Auth::user()->id;
        $song_id = Request::get('song_id');

        //Retorna zero como quantidade de estrelas dadas caso o usuário ainda não tenha votado na música.
        if (Valuation::where(['user_id' => $user_id, 'song_id' => $song_id])->count() <= 0) {
            return response()->json($stars);
        }



        //Obtém a quantidade de estrelas que o usuário deu a música.
        $stars = Valuation::where(
            [
                'user_id' => $user_id,
                'song_id' => $song_id,
            ]
        )->first()->stars;

        return response()->json($stars);
    }

    public function store_feedback()
    {
    }
}
