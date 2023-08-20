<?php

use App\Http\Controllers\SongsController;
use App\Models\Song;
use Illuminate\Foundation\Application;
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

Route::get('/', function () {
    return Inertia::render('Welcome/Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


/*
Route::get('/inicio', function () {
})->name('inicio');
Route::prefix('inicio')->group(function () {
});
Route::get('/inicio/{page}', [SongsController::class, 'index'])->name('inicio.index')->middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified'
]);
*/

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('inicio', function () {
        return  Inertia::render('Inicio/Inicio');
    })->name('inicio');

    Route::get('avaliar', function () {
        return  Inertia::render('Inicio/Inicio');
    })->name('avaliar');

    Route::get('/musicas', function () {
        return Inertia::render('Musicas/Musicas');
    })->name('musicas');


    Route::get('/videos', function () {
        return Inertia::render('Musicas/Musicas');
    })->name('videos');

    Route::get('/ascensao', function () {
        return Inertia::render('Ascensao/Ascensao');
    })->name('ascensao');
    Route::get('/bibliotecas', function () {
        return Inertia::render('Biblioteca/Biblioteca');
    })->name('bibliotecas');

    Route::controller(SongsController::class)->group(function () {
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
    Route::get('/top-artists', function () {
        return Inertia::render('Inicio');
    })->name('top-artists');
});
