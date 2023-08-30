<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class ArtistaController extends Controller
{
    //
    function index(Request $request)
    {
        return Inertia::render('Artistas/Index', [
            'data' => $request,
            'id' => $request['id'],
            'pagina' => $request['pagina'],
            'routas' => [
                'detalhes' => Route::has('detalhes'),
                'todos' => Route::has('todos'),
                'filtro' => Route::has('filtrar'),
            ]
        ]);
    }
}
