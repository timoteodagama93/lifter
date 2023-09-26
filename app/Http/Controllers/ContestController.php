<?php

namespace App\Http\Controllers;

use App\Models\Contest;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ContestController extends Controller
{

    public function store()
    {

        Validator::make(Request::all(), [
            'cover' => ['required', 'mimes:jpg,jpeg,png', 'max:5120'],
            'designacao' => ['required'],
            'estilo' => ['required'],
            'descricao' => ['required'],
        ])->validateWithBag('contestCreationCoverFails');

        $file = Request::file('cover')->store('contests', 'public');
        $user_id = Auth::id();
        $contest = Contest::create(
            [
                'user_id' => $user_id,
                'designacao' => Request::get('designacao'),
                'descricao' => Request::get('descricao'),
                'estilo_musical' => Request::get('estilo'),
                'url_cover' => Storage::url($file),
            ]
        );

        echo response(['new_contest' => $contest]);
    }

    public function update()
    {
        if (Request::get('cover') != null) {

            Validator::make(Request::all(), [
                'cover' => ['nullable', 'mimes:jpg,jpeg,png', 'max:5120'],
                'designacao' => ['required'],
                'estilo' => ['required'],
                'descricao' => ['required'],
            ])->validateWithBag('contestCreationCoverFails');

            $file = Request::file('cover')->store('contests', 'public');


            $user_id = Auth::id();
            $contest = Contest::updateOrCreate(
                [
                    'user_id' => $user_id,
                    'id' => Request::get('id'),
                ],
                [
                    'designacao' => Request::get('designacao'),
                    'descricao' => Request::get('descricao'),
                    'estilo_musical' => Request::get('estilo'),
                ]
            );
            echo response(['new_contest' => $contest]);
        } else {

            Validator::make(Request::all(), [
                'designacao' => ['required'],
                'estilo' => ['required'],
                'descricao' => ['required'],
            ])->validateWithBag('contestCreationCoverFails');

            $user_id = Auth::id();
            $contest = Contest::updateOrCreate(
                [
                    'user_id' => $user_id,
                    'id' => Request::get('id'),
                ],
                [
                    'designacao' => Request::get('designacao'),
                    'descricao' => Request::get('descricao'),
                    'estilo_musical' => Request::get('estilo'),
                ]
            );
            echo response(['new_contest' => $contest]);
        }
        return;
    }

    public function add_schedule()
    {
        $isUpdating = false;

        Validator::make(Request::all(), [
            'url_schedule' => ['required', 'mimes:jpg,jpeg,png', 'max:5120'],
        ])->validateWithBag('contestCreationCoverFails');

        $file = Request::file('url_schedule')->store('contests', 'public');
        $contest = Contest::where('id', Request::get('id'))->first();

        $contest->inicio_inscricoes = Request::get('inicio_inscricoes');
        $contest->inicio_votacoes = Request::get('inicio_votacoes');
        $contest->termino_inscricoes = Request::get('termino_inscricoes');
        $contest->termino_votacoes = Request::get('termino_votacoes');
        $contest->url_schedule = Storage::url($file);
        $contest->save();

        return; //  response()->json($contest);
    }

    public function add_premios()
    {

        Validator::make(Request::all(), [
            'photo' => ['required', 'mimes:jpg,jpeg,png', 'max:5120'],
        ])->validateWithBag('contestCreationCoverFails');

        $file = Request::file('photo')->store('contests', 'public');
        $contest = Contest::where('id', Request::get('id'))->first();

        $contest->total_premios = Request::get('total_premios');
        $contest->lugar_1 = Request::get('lugar_1');
        $contest->lugar_2 = Request::get('lugar_2');
        $contest->lugar_3 = Request::get('lugar_3');
        $contest->premios_extras = Request::get('premios_extras');
        $contest->tipo_premio = Request::get('tipo_premio');
        $contest->url_beneficios = Storage::url($file);
        $contest->save();

        return; //  response()->json($contest);
    }

    public function get()
    {
        return response()->json(Contest::all());
    }

    public function get_my_contests()
    {
        return response()->json(Contest::all()->where('user_id', auth()->id()));
    }

    public function details($contestId)
    {
        return Inertia::render('Concursos/Details',['contest'=>Contest::all()->where('id', $contestId)->first()]);
    }
}
