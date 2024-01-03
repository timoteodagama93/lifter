<?php

namespace App\Http\Controllers;

use App\Models\Coletion;
use App\Models\Colletion;
use App\Models\ContestsSong;
use App\Models\Like;
use App\Models\Song;
use App\Models\Valuation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;
use Symfony\Component\Console\Input\Input;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

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
        Validator::make(
            Request::all(),
            [
                'song' => ['required', 'mimes:mp3,mp4'], //, 'max:50120'
                'title' => ['required'],
                'genre' => ['required'],
            ]
        )->validate();

        $artist_id = Request::input('artist_id');
        $song_url = Request::file("song")->store("public/artists/$artist_id/songs");

        if ($song_url != false) {

            //$cover_url = Request::file("cover")->store("artists/{$artist_id}/songs/covers", 'public');

            $file_extension = Request::file('song')->getClientOriginalExtension();
            $file_hasname = Request::file('song')->hashName();
            $file_mime = Request::file('song')->getMimeType();
            $file_path = Request::file('song')->getPath();
            $file_pathname = Request::file('song')->getPathname();

            $song = Song::create([
                'artist_id' => $artist_id,
                'title' => Request::input('title'),
                'genre' => Request::input('genre'),
                'artist' => Request::input('artist'),
                'gravadora' => Request::input('gravadora'),
                'participacoes' => Request::input('participacoes'),
                'letra' => Request::input('letra'),
                'saved_name' => $file_hasname,
                'original_name' => Request::file('song')->getClientOriginalName(),
                'mime_type' => $file_mime,
                'extension' => $file_extension,
                'url' => Storage::url($song_url),
                //'cover' => $cover_url,
            ]);
            return; // to_route('musicas');
        } else {
            return response()->json(['Alguma coisa correu mal, não se preocupe que deve ser nossa culpa. Recarregue a página, se persistir reporte o problema. ']);
        }
    }

    public function store_from_youtube()
    {
        $artist_id = Request::input('artist_id');
        $song_url = Request::file("song")->store("public/artists/{$artist_id}/songs");



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
                'url' => Storage::url($song_url),
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

        $song = Song::where('id', $data['id'])->first();

        $song->title = $data['title'];
        $song->genre = $data['genre'];
        $song->artist = $data['artist'];
        $song->gravadora = $data['gravadora'];
        $song->participacoes = $data['participacoes'];
        $song->letra = $data['letra'];


        $song->save();
        return; // response()->json($song);
    }

    function add_cover(Request $d)
    {

        $data = $d::all();
        $artist_id = $data['artist_id'];
        $song_id = $data['id'];
        $cover = Request::file("cover")->store("public/artists/{$artist_id}/covers");

        $song = Song::where('id', $song_id)->first();

        $song->cover = Storage::url($cover);

        $song->save();
        return to_route("perfis", ["isArtist" => true]);
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
        return response()->json(Song::all());
    }


    /**
     * Obté as músicas
     */
    public function get_songs()
    {
        return DB::select("SELECT * FROM `songs` WHERE `mime_type` LIKE '%audio%' AND active=true AND destaque=false ORDER BY created_at DESC"); // where('mime_type', `%audio/%`)->paginate(1);
    }

    /**
     * Obté as músicas em destaques
     */
    public function get_destaques_songs()
    {
        return DB::select("SELECT * FROM `songs` WHERE `mime_type` LIKE '%audio%' AND active=true AND destaque=true ORDER BY created_at DESC LIMIT 5"); // where('mime_type', `%audio/%`)->paginate(1);
    }

    /**
     * Pesquisa músicas
     */
    public function get_valuations_requests()
    {
        $query = Request::get('category');
        return DB::select("SELECT * FROM `songs`"); // where('mime_type', `%audio/%`)->paginate(1);
    }

    /**
     * Pesquisa músicas
     */
    public function search_songs()
    {
        $query = Request::get('searchTerm');
        return DB::select("SELECT * FROM `songs` WHERE `mime_type` LIKE '%audio%' AND ( title LIKE '%$query%' OR artist LIKE '%$query%' OR genre LIKE '%$query%'  ) AND active=true ORDER BY created_at DESC"); // where('mime_type', `%audio/%`)->paginate(1);
    }
    /**
     * Pesquisa Vídeos
     */
    public function search_videos()
    {
        $query = Request::get('searchTerm');
        return DB::select("SELECT * FROM `songs` WHERE `mime_type` LIKE '%video%' AND ( title LIKE '%$query%' OR artist LIKE '%$query%' OR genre LIKE '%$query%'  ) ORDER BY created_at DESC"); // where('mime_type', `%audio/%`)->paginate(1);
    }

    /**
     * Obté os vídeos
     */
    public function get_videos()
    {
        return DB::select("SELECT * FROM `songs` WHERE `mime_type` LIKE '%video%' AND active=true AND destaque=false ORDER BY created_at DESC"); // where('mime_type', `%audio/%`)->paginate(1);
    }


    /**
     * Obté as músicas em destaques
     */
    public function get_destaques_videos()
    {
        return DB::select("SELECT * FROM `songs` WHERE `mime_type` LIKE '%video%' AND active=true AND destaque=true ORDER BY created_at DESC LIMIT 15"); // where('mime_type', `%audio/%`)->paginate(1);
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
     * Curtir musica
     */
    public function like_song()
    {
        $user_id = Auth::user()->id;
        $song_id = Request::get('song_id');
        $song = Song::find($song_id);

        $liked = Like::find([$song_id, $user_id]);
        if (!$liked) {
            $song->likes = $song->likes + 1;
            $song->save();
        } else {
            //TODO: Quando implementar o descurtir deve reduzir aqui os likes
        }

        $like = Like::updateOrCreate(
            [
                'user_id' => $user_id,
                'song_id' => $song_id,
            ]
        );

        return response()->json($like);
    }

    public function i_liked()
    {
        $user_id = Auth::user()->id;
        $song_id = Request::get('song_id');

        $like = DB::select(
            "SELECT * FROM likes WHERE user_id = '$user_id' AND song_id = '$song_id' "
        );

        return response()->json($like);
    }
    /**
     * Colecionar musica
     */
    public function collect_song()
    {
        $user_id = Auth::user()->id;
        $song_id = Request::get('song_id');

        $colecionar = Colletion::updateOrCreate(
            [
                'user_id' => $user_id,
                'song_id' => $song_id,
            ]
        );

        return response()->json($colecionar);
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

    public function get_feedbacks()
    {
        $songId = Request::get('song_id');
        return response()->json(DB::select("SELECT * FROM feedbacks WHERE song_id = ?", [$songId]));
    }

    public function new_play()
    {
        $song_id = Request::get('song_id');
        $result = DB::update("UPDATE songs SET plays=plays+1 WHERE id = '$song_id' ");
        return $result;
    }

    public function update_reprodution_time()
    {
        $song_id = Request::get('song_id');
        $duration = Request::get('duration');

        DB::update("UPDATE songs SET reprodution_time=reprodution_time+$duration WHERE id = '$song_id' ");
        return;
    }

    public function download($songId)
    {
        $song = Song::find($songId);

        if (!$song)
            abort(404, 'Música não encontrada');

        $song->downloads = $song->downloads + 1;
        $song->save();
        $path = storage_path("app\\public\\artists\\$song->artist_id\\songs\\$song->saved_name");

        //dd($path);

        $headers = [
            'Content-Type' => $song->mime_type,
            'Content-Disposition' => 'attach; filename="' . $song->original_name . '"'
        ];
        return response()->download($path, $song->original_name, $headers);
    }
}
