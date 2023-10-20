<?php

use App\Http\Controllers\ArtistaController;
use App\Http\Controllers\ComunicacaoController;
use App\Http\Controllers\ContestController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SongsController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\ValuationFeedbackCommentController;
use App\Models\Artist;
use App\Models\Contest;
use App\Models\Notification;
use App\Models\Post;
use App\Models\Song;
use App\Models\User;
use App\Models\Valuation;
use Illuminate\Foundation\Application;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
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

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {

    /**
     * ROUTAS PRINCIPAIS
     */
    Route::get('/', function () {
        return Inertia::render('Home/Home', [
            'songs' => DB::select('SELECT * FROM songs ORDER BY created_at'),
            'posts' => DB::select('SELECT * FROM posts ORDER BY created_at DESC')
        ]);
    })->name('/');
    Route::get('/discover', function () {
        return Inertia::render('Discover', []);
    })->name('discover');

    Route::get('/musicas', function () {
        return Inertia::render('Musicas/Musicas', []);
    })->name('musicas');

    Route::get('/concursos', function () {
        return Inertia::render('Concursos/Concursos', [
            'contests' => Contest::all()
        ]);
    })->name('concursos');

    Route::get('/noticias', function () {
        return Inertia::render('Noticias', []);
    })->name('noticias');



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


    /**
     * SONGSC CONTROLLER
     *  Routas das Músicas
     */
    Route::controller(SongsController::class)->group(function () {
        Route::post('/feedback',  'store_feedback')->name('feedback');
        Route::post('/feedbacks',  'get_feedbacks')->name('feedbacks');
        Route::post('/get-my-valluation',  'minha_avaliacao')->name('get-my-valluation');
        Route::post('/get-song',  'get_list_songs')->name('get-song');
        Route::get('/get-songs',  'get_songs')->name('get-songs');
        Route::get('/get-videos',  'get_videos')->name('get-videos');
        Route::post('/get-songs',  'get_songs')->name('get-songs');
        Route::post('/avaliar',  'avaliar')->name('avaliar');
        Route::post('/add-song',  'store')->name('add-song');
        Route::post('/add-song-cover',  'add_cover')->name('add-song-cover');
        Route::post('/update-song',  'update_info')->name('update-song');

        Route::post('upload.new', 'store')->name('upload.new');
        Route::get('songs/{id}', 'list');
        Route::post('/songs', 'store');
    });
    Route::post('/get-valluations', function () {
        return response()->json(Valuation::where('song_id', Request::get('song_id'))->count());
    })->name('get-valluations');

    Route::post('/get-artist-songs', function () {
        $data = Request::all();
        return response()->json([
            'artist_songs' => DB::select(
                'SELECT * FROM songs WHERE artist_id = "' . $data['id'] .'"'
            ),
            'all_songs' => Song::all(),
        ]);
    })->name('get-artist-songs');

    /**
     * VALUATIONFEEDBACKCOMMENT CONTROLLER
     */
    Route::controller(ValuationFeedbackCommentController::class)->group(function () {
        Route::post('/get-comments', 'get_comments')->name('get-comments');
        Route::post('/get-comment-user', 'get_comments')->name('get-comment-user');
        Route::post('/save-to-collection', 'save_to_collection')->name('save-to-collection');
        Route::post('/share-opinion', 'share_opinion')->name('share-opinion');
        Route::post('/share-feedback', 'share_feedback')->name('share-feedback');
        Route::post('/share-comment', 'share_comment')->name('share-comment');
    });

    /**
     * CONTESTCONTROLLER
     */
    Route::controller(ContestController::class)->group(function () {
        Route::get('contest-details/{contestId}', 'details')->name('contest-details');
        Route::put('update-contest', 'update')->name('update-contest');
        Route::put('create-contest', 'store')->name('create-contest');
        Route::post('add-contest-schedule', 'add_schedule')->name('add-contest-schedule');
        Route::post('add-contest-premios', 'add_premios')->name('add-contest-premios');
        Route::post('get-my-contests', 'get_my_contests')->name('get-my-contests');
    });


    Route::controller(ComunicacaoController::class)->group(function () {
        Route::post('get-unread', 'get_unread')->name('get-unread');
    });




    Route::get('/som_emocao', function () {
        return Inertia::render('Videos/Videos');
    })->name('som_emocao');


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
        return Inertia::render('Perfil/Perfil');
    })->name('perfil');

    Route::get('/perfil-artista', function () {
        return Inertia::render('Perfil/Artista/Perfl');
    })->name('perfil-artista');


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
    Route::get('artistas/{pagina}/{id}', [ArtistaController::class, 'index'])->name('index');
    Route::get('artistas/{pagina}/{id}', [ArtistaController::class, 'index'])->name('index');
    Route::post('/new-artist', [ArtistaController::class, 'store'])->name('new-artist');
    Route::post('/covers-artist', [ArtistaController::class, 'get_covers'])->name('covers-artist');
    Route::post('/add-cover', [ArtistaController::class, 'save_cover'])->name('add-cover');
    Route::post('/update-artist', [ArtistaController::class, 'update_info'])->name('update-artist');
    Route::get('/artist-details/{id}', function ($id) {
        return Inertia::render('Profile/Artist/DetalhesMusico', [
            'artist' =>
            Artist::where('id', $id)->first()
        ]);
    })->name('artist-details');
    Route::get('/get-top-artists', function () {
        return response()->json(Artist::paginate(5));
    })->name('get-top-artists');

    /**
     * CONTESTS ROUTES
     */
    Route::post('ascensao-artists', [SongsController::class, 'get_ascensao_artists'])->name('ascensao-artists');
});
