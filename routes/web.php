<?php

use App\Http\Controllers\ArtistaController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SongsController;
use App\Http\Controllers\UploadController;
use App\Models\Artist;
use App\Models\Post;
use App\Models\Song;
use App\Models\User;
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


    Route::get('/', function (User $user) {
        return Inertia::render('Lifter', []);
    })->name('/');
    Route::get('/home', function (User $user) {

        return Inertia::render('Home/Home', [
            'pagina' => 'destaques',
            'user' => $user,
            'APP_URL' => 'http://127.0.0.1:8000',
        ]);
    })->name('/home');

    /**Uploading files */
    Route::post('/upload', [UploadController::class, 'store'])->name('upload');
    Route::post('/upload.song', [UploadController::class, 'song'])->name('upload.song');
    Route::put('/upload.cover', [UploadController::class, 'cover'])->name('upload.cover');
    Route::put('/upload.payment', [UploadController::class, 'payment'])->name('upload.payment');
    Route::get('/upload.song', function () {
        return Inertia::render('Songs/Upload', ['artists' => Artist::all()->where(Auth::user()->id)]);
    })->name('upload.song');

    Route::get('/edit.song', function (Request $request) {
        $song = Song::all()->where('id', $request->get('song')->id);
        dd($song);
        return Inertia::render('Songs/Edit', ['song_id' => $song]);
    })->name('edit.song');

    Route::get('/patrocinar', function (User $user) {
        return Inertia::render('Patrocinar', []);
    })->name('patrocinar');

    Route::get('/parceiros', function (User $user) {
        return Inertia::render('parceiros', []);
    })->name('parceiros');

    Route::post('/', function (User $user) {
        DB::update('update users set verify_if_artist = 0');
        return to_route('/');
    })->name('/');

    Route::get('/artista', function (User $user) {
        return Inertia::render('Auth/RegisterArtist', [
            'user' => $user,
            'add_artist' => false,
        ]);
    })->name('artista');

    Route::post('/get-my-artist', function (User $user) {
        return response()->json([
            'artists' => Artist::all()->where(
                'user_id',
                auth()->id(),
            ),
            'all_artists' => Artist::all(),
        ]);
    })->name('get-my-artist');



    Route::get('inicio', function () {
        return  Inertia::render('Inicio/Inicio');
    })->name('inicio');

    Route::get('jurados', function () {
        return  Inertia::render('Jurados/Jurados', [
            'current_page' => 'destaques'
        ]);
    })->name('jurados');

    Route::get('/musicas', function () {
        return Inertia::render('Musicas/Musicas', ['start_page' => 'avaliar']);
    })->name('musicas');

    Route::get('/som_emocao', function () {
        return Inertia::render('Videos/Videos');
    })->name('som_emocao');

    Route::get('/ascensao', function () {
        return Inertia::render('Ascensao/Ascensao', [
            'start_page' => 'sobre'
        ]);
    })->name('ascensao');
    Route::get('/bibliotecas', function () {
        return Inertia::render('Biblioteca/Biblioteca');
    })->name('bibliotecas');

    Route::controller(SongsController::class)->group(function () {
        Route::get('/upload.new', function () {
            return Inertia::render('Musicas/Upload');
        })->name('upload.new');
        Route::post('upload.new', 'store')->name('upload.new');
        Route::get('songs/{id}', 'list');
        Route::post('/songs', 'store');
    });

    Route::get('/noticias', function () {
        return Inertia::render('Descobrir');
    })->name('noticias');
    Route::get('/explorar', function () {
        return Inertia::render('Biblioteca/Biblioteca');
    })->name('explorar');

    Route::get('/perfil', function () {
        return Inertia::render('Perfil/IndexPerfl');
    })->name('perfil');

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

    Route::post('/post', [PostController::class, 'store']);
    Route::post('/posts', [PostController::class, 'get']);

    Route::get('/comunicar', function () {
        return Inertia::render('Comunicar/Comunicar');
    })->name('comunicar');

    Route::get('/notifaicacoes', function () {
        return Inertia::render('ChatsNotificacoes');
    })->name('notificacoes');

    Route::get('/about', function () {
        return Inertia::render('Inicio');
    })->name('about');

    Route::get('/song-details/{some}', function () {
        return Inertia::render('SongDetails');
    })->name('song-details');

    /**ARTIST ROUTES */
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

    /**
     * CONTESTS ROUTES
     */
    Route::post('ascensao-artists', [SongsController::class, 'get_ascensao_artists'])->name('ascensao-artists');
});
