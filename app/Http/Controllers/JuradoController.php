<?php

namespace App\Http\Controllers;

use App\Models\Contest;
use App\Models\Jurado;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class JuradoController extends Controller
{
    //

    public function index()
    {
        $amIJury = "SELECT active FROM jurados where user_id=1;";

        return Inertia::render('Jurados', [
            'amIJury' => DB::select($amIJury),
        ]);
    }

    public function get_jury()
    {
        $contest_id = '';
        $sql = "SELECT jurados.id,jurados.name, jurados.ocupation, users.profile_photo_path FROM jurados JOIN users WHERE jurados.user_id=users.id AND jurados.active=true;";

        if (Request::get('contest_id')) {
            $contest_id = Request::get('contest_id');
            $sql = "SELECT jurados.id,jurados.name, jurados.ocupation, users.profile_photo_path FROM jurados JOIN users WHERE jurados.user_id=users.id AND jurados.active=true AND jurados.contest_id=$contest_id;";
        }
        $jurados = DB::select($sql);
        return response()->json($jurados);
    }


    public function store()
    {
        $contestId = Request::input('contest_id');
        $join = Jurado::updateOrCreate(
            [

                'user_id' => auth()->id(),
                'contest_id' => $contestId,
            ],
            [
                'name' => Request::input('name'),
                'contact' => Request::input('contact'),
                'ocupation' => Request::input('ocupation'),
                'bio' => Request::input('bio'),

            ]
        );
        return to_route('jurados', ['jury' => DB::select("SELECT * FROM jurados WHERE contest_id='$contestId'")]);
    }
}
