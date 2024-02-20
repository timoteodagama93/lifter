<?php

use App\Http\Controllers\ArtistController;
use App\Http\Controllers\CampaignController;
use App\Http\Controllers\ComunicacaoController;
use App\Http\Controllers\ContestController;
use App\Http\Controllers\EstanteController;
use App\Http\Controllers\ExpositionsController;
use App\Http\Controllers\InteragirController;
use App\Http\Controllers\JuradoController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfissionalController;
use App\Http\Controllers\SocialMediaController;
use App\Http\Controllers\SongsController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\VideoController;
use App\Models\Artist;
use App\Models\Contest;
use App\Models\FestivalUser;
use App\Models\Notification;
use App\Models\Post;
use App\Models\Profissional;
use App\Models\ServicesRequest;
use App\Models\Song;
use App\Models\User;
use App\Models\Valuation;
use Illuminate\Foundation\Application;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return Inertia::render('Home/Welcome', [
        'songs' => DB::select('SELECT * FROM songs ORDER BY created_at'),
        'posts' => DB::select('SELECT * FROM posts ORDER BY created_at DESC')
    ]);
})->name('/');

Route::get('/get-welcome-destaques-audios', function () {
    return DB::select("SELECT * FROM `songs` WHERE active=true AND destaque=true and mime_type LIKE '%audio/%' ORDER BY reprodution_time DESC LIMIT 5");
})->name('/get-welcome-destaques-audios');

Route::get('/get-welcome-destaques-videos',  function () {
    return DB::select("SELECT * FROM `songs` WHERE active=true AND destaque=true and mime_type LIKE '%video/%' ORDER BY reprodution_time DESC LIMIT 5");
})->name('get-welcome-destaques-videos');

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {

    /**
     * ROUTAS PRINCIPAIS
     */
    Route::get('/home', function () {
        return Inertia::render('Home/Home', [
            'songs' => DB::select('SELECT * FROM songs ORDER BY created_at'),
            'posts' => DB::select('SELECT * FROM posts ORDER BY created_at DESC')
        ]);
    })->name('/home');

    Route::post('/participar-ascensao', function () {
        $user_id = auth()->id();
        $as = Request::get('as');
        $inserted = FestivalUser::updateOrCreate(['festival_id' => 1, 'user_id' => $user_id], ['as' => $as]);
        return $inserted;
    })->name('/participar-ascensao');

    Route::get('/musicas', function () {
        return Inertia::render('Musicas/Musicas', []);
    })->name('musicas');

    Route::get('/gospel', function () {
        return Inertia::render('Gospel/Index', []);
    })->name('gospel');

    Route::get('/arts', function () {
        return Inertia::render('Arts/Index', []);
    })->name('arts');

    Route::get('/vozactiva', function () {
        $vozactiva = DB::select('SELECT * FROM artists WHERE active =' . true);
        if (sizeof($vozactiva) > 0)
            return Inertia::render('VozActiva', [
                'activeVoiceArtist' => $vozactiva[0]
            ]);
        return Inertia::render('VozActiva', [
            'activeVoiceArtist' => []
        ]);
    })->name('vozactiva');

    Route::get('/concursos', function () {
        return Inertia::render('Concursos/Index', [
            'contests' => Contest::all()
        ]);
    })->name('concursos');


    Route::get('/comunidade', function () {
        return Inertia::render('CommunityDiscussion', [
            'contests' => Contest::all()
        ]);
    })->name('comunidade');

    Route::get('/noticias', function () {
        return Inertia::render('Noticias', []);
    })->name('noticias');

    //ROUTAS DO SIDEBAR
    Route::get('/eventos', function () {
        return Inertia::render('Eventos', []);
    })->name('eventos');

    Route::get('/discover', function () {
        return Inertia::render('Discover', []);
    })->name('discover');

    Route::get('/livertv', function () {
        return Inertia::render('LiveTV/LiverTV', []);
    })->name('livertv');

    Route::get('/artistas', function () {
        return Inertia::render('Artistas/Artistas', ['artists' => DB::select("SELECT * FROM artists")]);
    })->name('artistas');

    Route::get('/produtoras', function () {
        return Inertia::render('Produtoras', ['produtoras' => DB::select("SELECT * FROM  profissionals WHERE category='Produtor'")]);
    })->name('produtoras');

    Route::get('/djs', function () {
        return Inertia::render('DJs', ['djs' => DB::select("SELECT * FROM profissionals WHERE category='DJ'")]);
    })->name('djs');

    Route::get('/avaliacoes', function () {
        return Inertia::render('Avaliacoes/Avaliacoes', []);
    })->name('avaliacoes');

    Route::get('/ranking', function () {
        return Inertia::render('Ranking', []);
    })->name('ranking');

    Route::get('/services', function () {
        return Inertia::render('Services', []);
    })->name('services');

    Route::post('/request-services', function () {
        $user_id = auth()->id();
        $name = Request::input('name');
        $service = Request::input('service');
        $title = Request::input('title');
        $phone = Request::input('contact');
        $email = Request::input('email');
        $problem = Request::input('problem');
        ServicesRequest::create(
            [
                'user_id' => $user_id,
                'service' => $service,
                'name' => $name,
                'title' => $title,
                'phone' => $phone,
                'email' => $email,
                'problem' => $problem,
            ]
        );
        return;
    })->name('request-services');



    /**Uploading files */
    Route::controller(UploadController::class)->group(function () {
        Route::post('/upload', [UploadController::class, 'store'])->name('upload');
        Route::post('/upload.song', [UploadController::class, 'song'])->name('upload.song');
        Route::put('/upload.cover', [UploadController::class, 'cover'])->name('upload.cover');
        Route::put('/upload.payment', [UploadController::class, 'payment'])->name('upload.payment');
    });


    Route::get('/patrocinar', function (User $user) {
        return Inertia::render('Patrocinar', []);
    })->name('patrocinar');

    Route::get('/parceiros', function (User $user) {
        return Inertia::render('parceiros', []);
    })->name('parceiros');


    Route::controller(VideoController::class)->group(function () {
        Route::get('/video', 'index')->name('video');
        Route::post('/add-video', 'store')->name('add-video');


        Route::post('/search-videos',  'search_videos')->name('search-videos');
        Route::get('/get-videos/{category}',  'get_videos')->name('get-videos/{category}');
        Route::get('/get-videos-destaques/{category}',  'get_destaques_videos')->name('get-videos-destaques/{category}');


        //Actualiza quantidade de reproduções
        Route::post("new-video-play", "new_play")->name("new-video-play");
        //Actualiza o tempo de reprodução toda vez que finaliza uma reprodução.
        Route::post("update-video-reprodution-time", "update_reprodution_time")->name("update-video-reprodution-time");
    });

    /**
     * INTERAGIR CONTROLLER
     * Controller responsável em gerenciar todas as interações do aplicativo: curtir, partilhar, comentar, gostar, feedbacks, etc.
     */
    Route::controller(InteragirController::class)->group(function () {
        Route::post('like-collection', 'like_collection')->name('like-collection');
        Route::post('/get-my-valluation',  'minha_avaliacao')->name('get-my-valluation');
        Route::post('/stars-to-collection',  'stars_to_collection')->name('stars-to-collection');

        Route::post('/get-comments', 'get_comments')->name('get-comments');
        Route::post('/get-feedbacks', 'get_feedbacks')->name('get-feedbacks');
        Route::post('/get-comment-user', 'get_comments')->name('get-comment-user');
        Route::post('/save-to-collection', 'save_to_collection')->name('save-to-collection');
        Route::post('/valuate-colletion', 'valuate_colletion')->name('valuate-colletion');
        Route::post('/share-feedback', 'share_feedback')->name('share-feedback');
        Route::post('/share-comment', 'share_comment')->name('share-comment');

        Route::get('/download-collection/{collectionId}/{collectionType}',  'download')->name('download-collection/{collectionId}/{collectionType}');
    });
    /**
     * SONGSC CONTROLLER
     *  Routas das Músicas
     */
    Route::controller(SongsController::class)->group(function () {
        Route::post('/search-songs',  'search_songs')->name('search-songs');

        Route::post('/i-liked',  'i_liked')->name('i-liked');
        Route::post('/collect-song',  'collect_song')->name('collect-song');
        Route::post('/like-song',  'like_song')->name('like-song');

        Route::post('/feedback',  'store_feedback')->name('feedback');
        Route::post('/feedbacks',  'get_feedbacks')->name('feedbacks');

        Route::post('/get-song',  'get_list_songs')->name('get-song');

        Route::get('/get-songs',  'get_songs')->name('get-songs');
        Route::get('/get-songs-audios/{query}',  'get_audios')->name('get-songs-audios/{query}');
        Route::get('/get-songs-videos/{query}',  'get_videos')->name('get-songs-videos/{query}');

        Route::get('/get-songs-destaques',  'get_destaques_songs')->name('get-songs-destaques');

        Route::post('/get-songs',  'get_songs')->name('get-songs');
        Route::post('/add-song',  'store')->name('add-song');
        Route::post('/add-song-cover',  'add_cover')->name('add-song-cover');
        Route::post('/update-song',  'update_info')->name('update-song');

        Route::get('/download/song/{songId}',  'download')->name('download/song/{songId}');

        Route::post('upload.new', 'store')->name('upload.new');
        Route::get('songs/{id}', 'list');
        Route::post('/songs', 'store');

        //Actualiza quantidade de reproduções
        Route::post("new-play", "new_play")->name("new-play");
        //Actualiza o tempo de reprodução toda vez que finaliza uma reprodução.
        Route::post("update-reprodution-time", "update_reprodution_time")->name("update-reprodution-time");

        Route::get('get-valuations-requests', 'get_valuations_requests')->name('get-valuations-requests');
    });
    Route::post('/get-valluations', function () {
        return response()->json(Valuation::where('song_id', Request::get('song_id'))->count());
    })->name('get-valluations');

    Route::get('/get-artist-songs/{artistId}', function ($artistId) {
        $data = Request::all();
        return response()->json(
            DB::select(
                'SELECT * FROM songs WHERE artist_id = "' . $artistId . '"'
            ),
        );
    })->name('get-artist-songs');



    /**
     * CONTESTCONTROLLER
     */
    Route::controller(ContestController::class)->group(function () {
        Route::get('contest-details/{contestId}', 'details')->name('contest-details');
        Route::put('update-contest', 'update')->name('update-contest');
        Route::put('create-contest', 'store')->name('create-contest');
        Route::post('add-contest-schedule', 'add_schedule')->name('add-contest-schedule');
        Route::post('add-contest-premios', 'add_premios')->name('add-contest-premios');

        Route::post('add-participant', 'contest_new_participant')->name('add-participant');
        Route::post('vote-on-participant', 'new_vote_on_participante')->name('vote-on-participant');

        Route::post('get-user-collections-for-contest', 'get_user_collections_for_contest')->name('get-user-collections-for-contest');


        Route::post('get-contestant-details', 'get_contestant_details')->name('get-contestant-details');
        Route::post('participant-votes', 'participant_votes')->name('participant-votes');
        Route::post('am-I-participant', 'am_I_participant')->name('am-I-participant');
        Route::post('i-voted-on-this', 'i_voted_on_this')->name('i-voted-on-this');

        Route::post('filter-contest', 'filter_contest')->name('filter-contest');
        Route::post('contest-participants', 'contest_participants')->name('contest-participants');

        Route::post('get-my-contests', 'get_my_contests')->name('get-my-contests');
        Route::post('get-active-contests', 'ge_active_contests')->name('get-active-contests');

        Route::post('ascensao-artists', 'get_ascensao_artists')->name('ascensao-artists');
        Route::get('get-contest-images/{contestId}', 'contest_images')->name('get-contest-images/{contestId}');
        Route::get('get-contest-videos/{contestId}', 'contest_videos')->name('get-contest-videos/{contestId}');
    });


    Route::controller(ComunicacaoController::class)->group(function () {
        Route::post('get-unread', 'get_unread')->name('get-unread');
    });

    Route::get('/bibliotecas', function () {
        return Inertia::render('Biblioteca/Biblioteca');
    })->name('bibliotecas');

    Route::get('/explorar', function () {
        return Inertia::render('Biblioteca/Biblioteca');
    })->name('explorar');


    /**
     * MOSTRAR PERFIS
     */

    Route::get('/perfil', function () {
        return Inertia::render('Perfil/UserFeed');
    })->name('perfil');


    Route::get('/perfis', function () {
        return Inertia::render('PerfilProfissional/Index', ["artist" => Artist::all()->where('user_id', auth()->id())->first(), 'profissional' => Profissional::all()->where('user_id', auth()->id())->first()]);
    })->name('perfis');


    /** JURADOS */
    Route::controller(JuradoController::class)->group(function () {
        Route::get('/jurados', 'index')->name('jurados');
        Route::post('/jurados', 'get_jury')->name('jurados');
        Route::post('/jury-requisition', 'store')->name('jury-requisition');
        Route::get('/get-requisition', 'store')->name('jury-requisition');
    });


    /**
     * Enviar FEEDBACK À LIFTER
     */
    Route::post('/notification-to-lifter', function () {

        $notification = Notification::create([
            'user_id' => auth()->id(),
            'title' => Request::get('type'),
            'summary' => Request::get('error_page'),
            'message' => Request::get('message'),
        ]);
        return response()->json($notification);
    })->name('notification-to-lifter');


    Route::controller(ExpositionsController::class)->group(function () {
        Route::post('save-exposition-room', 'store')->name('save-exposition-room');
        Route::post('save-room-item', 'store_item')->name('save-room-item');


        Route::get('get-expositions-rooms', 'get_expositions_rooms')->name('get-expositions-rooms');
        Route::get('get-room-items/{roomId}', 'get_room_items')->name('get-room-items/{roomId}');
    });


    Route::controller(EstanteController::class)->group(function () {
        Route::post('save-estante', 'store')->name('save-estante');
        Route::post('save-estante-book', 'store_book')->name('save-estante-book');

        Route::get('get-estantes', 'get_estantes')->name('get-estantes');
        Route::get('get-estante-books/{estanteId}', 'get_estante_books')->name('get-estante-books/{estanteId}');
    });








    Route::get('/profile', function () {
        return Inertia::render('Profile/Musico');
    })->name('profile');
    Route::get('/settings', function () {
        return Inertia::render('Profile/Musico');
    })->name('settings');

    Route::get('/uploads', function () {
        return Inertia::render('Profile/Musico');
    })->name('uploads');


    Route::get('/contactos', function () {
        return Inertia::render('Contactos');
    })->name('contactos');

    Route::get('/chats', function () {
        return Inertia::render('ChatsNotificacoes');
    })->name('chats');


    /**
     * POST CONTROLLER
     */

    Route::controller(PostController::class)->group(function () {
        Route::post('/post', 'store');
        Route::post('/post-like/{postId}', 'like');
        Route::post('/comment', 'comment');
        Route::post('/comment-on-post', 'comment_on_post');
        Route::post('/comments', 'comments');
        Route::post('/posts/{filter?}',  'get');
    });

    Route::post('get-user', function () {
        return User::all()->where('id', Request::get('user_id'))->first();
    })->name('get-user');



    /**
     * COMUNICAÇÕES
     * 1. Notificações
     * 2. Mensagens
     */
    Route::get('/comunicar', function () {
        return Inertia::render('Comunicar/Comunicar');
    })->name('comunicar');

    Route::get('/notifaicacoes', function () {
        return Inertia::render('ChatsNotificacoes');
    })->name('notificacoes');

    Route::get('/about', function () {
        return Inertia::render('Inicio');
    })->name('about');

    /**SONGS DETAILS */
    Route::get('/song-details/{songId}', function ($songId) {
        return Inertia::render('SongDetails', ['songId' => $songId, 'song' => Song::where('id', $songId)->first()]);
    })->name('song-details');
    Route::get('/tracks/details/{songId}', function ($songId) {
        return response()->json(Song::where('id', $songId)->first());
    })->name('tracks/details/');
    Route::get('/tracks/related/{songId}', function ($songId) {
        return response()->json([Song::where('genre', Song::where('id', $songId)->first()->genre)->first()]);
    })->name('tracks/related/');



    /**ARTIST DETAILS AND RELATED SONGS*/
    Route::get('/artists-details/{artistId}', function ($artistId) {
        return Inertia::render('ArtistDetails', ['artistId' => $artistId, 'artist' => Artist::where('id', $artistId)->first()]);
    })->name('artists-details');
    Route::get('/artists/details/{artistId}', function ($artistId) {
        return response()->json(Artist::where('id', $artistId)->first());
    })->name('artists/details/');
    Route::get('/artists/related/{artistId}', function ($artistId) {
        return response()->json([Song::where('artist_id', $artistId)]);
    })->name('artists/related/');

    /**ARTIST ROUTES */
    Route::get('get-activevoice-songs/{artistId}', function ($artistId) {
        return response()->json(
            DB::select('SELECT * FROM songs WHERE artist_id=?  AND mime_type LIKE ? ', [$artistId, '%audio%'])
        );
    })->name('get-activevoice-songs/{artistId}');

    Route::get('get-activevoice-images/{artistId}', function ($artistId) {
        return response()->json(
            Storage::allFiles("public/artists/$artistId/covers")
        );
    })->name('get-activevoice-images/{artistId}');

    Route::get('get-activevoice-videos/{artistId}', function ($artistId) {
        return response()->json(
            DB::select('SELECT * FROM songs WHERE artist_id=?  AND mime_type LIKE ? ', [$artistId, '%video%'])
        );
    })->name('get-activevoice-videos/{artistId}');


    Route::controller(ProfissionalController::class)->group(function () {
        Route::post('register-profissional', 'store')->name("register-profissional");
        Route::post('add-profissional-cover', 'save_cover')->name("add-profissional-cover");
    });

    Route::controller(ArtistController::class)->group(function () {
        Route::post('get-artist', 'get_artist')->name('get-artist');

        Route::get('artistas/{pagina}/{id}', 'index');
        Route::get('/artist-stats/{artistId}', 'artist_stats')->name('/artist-stats/${artistId}');
        Route::get('artistas/{pagina}/{id}', 'index')->name('index');
        Route::post('/new-artist', 'store')->name('new-artist');
        Route::post('/covers-artist', 'get_covers')->name('covers-artist');
        Route::post('/add-cover',  'save_cover')->name('add-cover');
        Route::post('/update-artist',  'update_info')->name('update-artist');
    });
    Route::get('/artist-details/{id}', function ($id) {
        return Inertia::render('Artistas/Detalhar', [
            'artist' =>
            Artist::where('id', $id)->first()
        ]);
    })->name('artist-details');
    Route::get('/get-top-artists', function () {
        return response()->json(Artist::paginate(5));
    })->name('get-top-artists');
});




/**
 * CAMPAIGN ROUTES
 */
Route::controller(CampaignController::class)->group(function () {
    Route::post('new-campaign', 'store')->name('new-campaign');
    Route::post('get-campaigns', 'get_mines')->name('get-campaigns');
});


/**
 * Social Medias COntroller: Facebook, Google, TikTok
 */
Route::controller(SocialMediaController::class)->group(function () {
    Route::get('auth/facebook', 'facebookpage')->name('auth/facebook');
    Route::get('auth/facebook/callback', 'facebookredirect')->name('auth/facebook/callback');
});
