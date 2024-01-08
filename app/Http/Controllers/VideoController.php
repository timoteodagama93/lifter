<?php

namespace App\Http\Controllers;

use App\Models\Colletion;
use App\Models\ContestsSong;
use App\Models\Like;
use App\Models\Song;
use App\Models\Valuation;
use App\Models\Video;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class VideoController extends Controller
{
    //

    public function index()
    {
        return Inertia::render('Videos/Videos', []);
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
                'video' => ['required', 'mimes:mp4'], //, 'max:50120'
                'title' => ['required'],
                'category' => ['required'],
            ]
        )->validate();

        $userId = auth()->id();
        $video_url = Request::file("video")->store("public/users/$userId/videos");

        if ($video_url != false) {

            $file_extension = Request::file('video')->getClientOriginalExtension();
            $file_hasname = Request::file('video')->hashName();
            $file_originalname = Request::file('video')->getClientOriginalName();
            $file_mime = Request::file('video')->getMimeType();
            $file_path = Request::file('video')->getPath();
            $file_pathname = Request::file('video')->getPathname();

            $song = Video::create([
                'user_id' => $userId,
                'title' => Request::input('title'),
                'category' => Request::input('category'),
                'producer' => Request::input('peoducer'),
                'description' => Request::input('description'),
                'saved_name' => $file_hasname,
                'original_name' => $file_originalname,
                'mime_type' => $file_mime,
                'extension' => $file_extension,
                'url' => Storage::url($video_url),
                //'cover' => $cover_url,
            ]);
            return redirect('video');
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
    public function get_all_videos()
    {
        return response()->json(Video::all());
    }

    /**
     * Pesquisa Vídeos
     */
    public function search_videos()
    {
        $query = Request::get('searchTerm');
        return DB::select("SELECT * FROM `videos` WHERE `mime_type` LIKE '%video%' AND ( title LIKE '%$query%' OR artist LIKE '%$query%' OR category LIKE '%$query%'  ) ORDER BY reprodution_time DESC"); // where('mime_type', `%audio/%`)->paginate(1);
    }

    /**
     * Obté os vídeos
     */
    public function get_videos($category)
    {
        if ($category == 'all') {
            return DB::select("SELECT * FROM `videos` WHERE active=true AND destaque=false ORDER BY  reprodution_time DESC"); // where('mime_type', `%audio/%`)->paginate(1);
        } else if ($category == 'mistas') {
            return DB::select("SELECT * FROM `videos` WHERE active=true AND destaque=false AND category='cinema' OR category='teatro' OR category='humor' ORDER BY  reprodution_time DESC"); // where('mime_type', `%audio/%`)->paginate(1);
        } else {
            return DB::select("SELECT * FROM `videos` WHERE active=true AND destaque=false AND category='$category' ORDER BY  reprodution_time DESC"); // where('mime_type', `%audio/%`)->paginate(1);
        }
    }


    /**
     * Obté as músicas em destaques
     */
    public function get_destaques_videos($category)
    {

        if ($category == 'all') {
            return DB::select("SELECT * FROM `videos` WHERE `mime_type` LIKE '%video%' AND active=true AND destaque=true ORDER BY reprodution_time ASC LIMIT 15"); // where('mime_type', `%audio/%`)->paginate(1);    
        } else if ($category == 'mistas') {
            return DB::select("SELECT * FROM `videos` WHERE active=true AND destaque=false AND category='cinema' OR category='teatro' OR category='humor' ORDER BY  reprodution_time DESC");
        } else {
            return DB::select("SELECT * FROM `videos` WHERE `mime_type` LIKE '%video%' AND active=true AND destaque=true AND `category`=''$category ORDER BY reprodution_time DESC LIMIT 15"); // where('mime_type', `%audio/%`)->paginate(1);    
        }
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
        $result = DB::update("UPDATE videos SET plays=plays+1 WHERE id = '$song_id' ");
        return $result;
    }

    public function update_reprodution_time()
    {
        $song_id = Request::get('song_id');
        $duration = Request::get('duration');

        DB::update("UPDATE videos SET reprodution_time=reprodution_time+$duration WHERE id = '$song_id' ");
        return;
    }

    public function download($songId)
    {
        $song = Video::find($songId);
        if (!$song)
            abort(404, 'Música não encontrada');

        $song->downloads = $song->downloads + 1;
        $song->save();
        $path = storage_path("app\\public\\users\\$song->user_id\\videos\\$song->saved_name");

        //dd($path);

        $headers = [
            'Content-Type' => $song->mime_type,
            'Content-Disposition' => 'attach; filename="' . $song->original_name . '"'
        ];
        return response()->download($path, $song->original_name, $headers);
    }
}
