<?php

namespace App\Http\Controllers;

use App\Models\Contest;
use App\Models\ContestUser;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ContestController extends Controller
{

    public function store()
    {
        Validator::make(Request::all(), [
            'cover' => ['required', 'mimes:jpg,jpeg,png'], //TODO: Delimitar tamanho
            'designacao' => ['required'],
            'estilo' => ['required'],
            'descricao' => ['required'],
        ])->validate();

        $user_id = Auth::id();
        $contest = Contest::create(
            [
                'user_id' => $user_id,
                'designacao' => Request::get('designacao'),
                'descricao' => Request::get('descricao'),
                'estilo_musical' => Request::get('estilo'),
            ]
        );

        $file = Request::file('cover')->store("public/contests/$contest->id/covers");
        $contest->url_cover = Storage::url($file);
        $contest->save();
        echo response(['new_contest' => $contest]);
    }

    public function update()
    {
        if (Request::file('cover') != null) {

            Validator::make(Request::all(), [
                'cover' => ['nullable', 'mimes:jpg,jpeg,png, mp4', 'max:5120'],
                'designacao' => ['required'],
                'estilo' => ['required'],
                'descricao' => ['required'],
            ])->validateWithBag('contestCreationCoverFails');

            $user_id = Auth::id();
            $contest = Contest::updateOrCreate(
                [
                    'user_id' => $user_id,
                    'id' => Request::input('id'),
                ],
                [
                    'cover_mime_type' => Request::file('cover')->getMimeType(),
                    'designacao' => Request::input('designacao'),
                    'descricao' => Request::input('descricao'),
                    'estilo_musical' => Request::input('estilo'),
                ]
            );

            $file = Request::file('cover')->store("contests/$contest->id/covers");
            $url_cover = Storage::url($file);
            $contest->url_cover = $url_cover;
            $contest->save();
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
                    'id' => Request::input('id'),
                ],
                [
                    'designacao' => Request::input('designacao'),
                    'descricao' => Request::get('descricao'),
                    'estilo_musical' => Request::input('estilo'),
                ]
            );
        }
        return;
    }

    public function add_schedule()
    {
        $isUpdating = false;

        Validator::make(Request::all(), [
            'url_schedule' => ['required', 'mimes:jpg,jpeg,png'], //TODO: Size limitation
        ])->validateWithBag('contestCreationCoverFails');

        $file = Request::file('url_schedule')->store('public/contests');
        $contest = Contest::where('id', Request::get('id'))->first();

        $contest->inicio_inscricoes = Request::get('inicio_inscricoes');
        $contest->inicio_votacoes = Request::get('inicio_votacoes');
        $contest->termino_inscricoes = Request::get('termino_inscricoes');
        $contest->termino_votacoes = Request::get('termino_votacoes');
        $contest->url_schedule = Storage::url($file);
        $contest->save();

        return to_route('perfil', ['contest_edition' => true]); //  response()->json($contest);
    }

    public function add_premios()
    {

        Validator::make(Request::all(), [
            'photo' => ['required', 'mimes:jpg,jpeg,png', 'max:5120'],
        ])->validateWithBag('contestCreationCoverFails');

        $file = Request::file('photo')->store('public/contests');
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

    public function ge_active_contests()
    {
        return response()->json(Contest::all()->where('activo', true));
    }

    public function details($contestId)
    {
        return Inertia::render('Concursos/Details', ['contest' => Contest::all()->where('id', $contestId)->first()]);
    }

    public function contest_images($contestId)
    {
        return response()->json(
            Storage::allFiles("public/contests/$contestId")
        );
    }

    public function contest_videos($contestId)
    {
        return response()->json(
            DB::select('SELECT * FROM contests WHERE id= ? ', [$contestId])
        );
    }

    public function contest_new_participant()
    {
        $contestId = Request::input('contest_id');
        $artistId = Request::input('artist_id');
        $songId = Request::input('song_id');
        $userId = auth()->id();

        $registration = ContestUser::updateOrCreate([
            'contest_id' => $contestId,
            'artist_id' => $artistId,
            'user_id' => $userId
        ], [
            'song_id' => $songId,
        ]);
        return to_route('concursos');
    }

    public function am_I_participant()
    {
        $artistId = Request::get('artist_id');
        $contestId = Request::get('contest_id');
        $userId = auth()->id();

        $sql = "SELECT * FROM contest_users WHERE artist_id='$artistId' AND contest_id='$contestId' AND user_id=$userId";

        $participants =  DB::select($sql);
        return response()->json($participants);
    }

    public function filter_contest(Request $request)
    {
        $data = [];
        $filter = $request::get('filter');
        if ($filter == 'songs') {

            $data = DB::select("SELECT * FROM songs Join contest_users WHERE songs.id=contest_users.song_id AND songs.mime_type LIKE '%audio%' ");
        } else if ($filter == 'videos') {
            $data = DB::select("SELECT * FROM songs Join contest_users WHERE songs.id=contest_users.song_id AND songs.mime_type LIKE '%video%' ");
        } else if ($filter == 'artists') {
            $data = DB::select("SELECT * FROM `artists` JOIN contest_users WHERe contest_users.artist_id=artists.id");
        } else if ($filter == 'jury') {
            $data = DB::select("SELECT * FROM users JOIN contest_users WHERE contest_users.user_id=users.id;
            ");
        }

        return response()->json($data);
    }
}
