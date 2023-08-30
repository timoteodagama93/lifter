<?php

use App\Http\Controllers\ArtistaController;
use App\Http\Controllers\SongsController;
use App\Models\Song;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
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
        return Inertia::render('Home/Home', [
            'pagina' => 'destaques',
        ]);
    })->name('/');

    Route::get('/patrocinar', function (User $user) {
        return Inertia::render('Patrocinar', []);
    })->name('patrocinar');

    Route::post('/', function (User $user) {
        DB::update('update users set verify_if_artist = 0');
        return to_route('/');
    })->name('/');

    Route::get('/artista', function (User $user) {
        return Inertia::render('Auth/RegisterArtist', [
            'canLogin' => Route::has('login'),
            'user' => $user,
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    })->name('artista');

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
        Route::get('/upload', 'upload')->name('upload.form');
        Route::post('upload', 'store')->name('upload.store');
        Route::get('songs/{id}', 'list');
        Route::post('/songs', 'store');
    });

    Route::get('/noticias', function () {
        return Inertia::render('Descobrir');
    })->name('noticias');
    Route::get('/explorar', function () {
        return Inertia::render('Biblioteca/Biblioteca');
    })->name('explorar');

    Route::get('/conta', function () {
        return Inertia::render('Profile/Musico');
    })->name('conta');
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

    Route::get('/notifaicacoes', function () {
        return Inertia::render('ChatsNotificacoes');
    })->name('notificacoes');

    Route::get('/about', function () {
        return Inertia::render('Inicio');
    })->name('about');

    Route::get('/song-details/{some}', function () {
        return Inertia::render('SongDetails');
    })->name('song-details');
    Route::get('artistas/{pagina}/{id}', [ArtistaController::class, 'index'])->name('index');
    /*
    Route::group('/artistas', function () {
        Route::get('/detalhes', [ArtistaController::class, 'index'])->name('index');
        Route::get('/detalhes/{id}', [ArtistaController::class, 'detalhes'])->name('detalhes');
    })->name('artistas');
*/
});
