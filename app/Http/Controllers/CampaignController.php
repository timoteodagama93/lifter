<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;

class CampaignController extends Controller
{
    //

    public function store()
    {
        $c = Campaign::updateOrCreate(
            [
                'song_id' => Request::input('song_id'),
                'codigo' => Request::input('codigo'),
            ],
            [
                'numero' => Request::input('numero'),
                'age' => Request::input('age'),
                'gender' => Request::input('gender'),
                'ocupation' => Request::input('ocupation'),
                'formation' => Request::input('formation'),
                'location' => Request::input('location'),
                'goals' => Request::input('goals'),
                'goal_size' => Request::input('goal_size'),
                'days' => Request::input('days'),
                'lifter' => Request::input('lifter'),
                'produtoras' => Request::input('produtoras'),
                'djs' => Request::input('djs'),
                'influencers' => Request::input('influencers'),
                'agentes' => Request::input('agentes'),
                'prmotores' => Request::input('prmotores'),
                'blogueiros' => Request::input('blogueiros'),
                'interna' => Request::input('interna'),
                'facebook' => Request::input('facebook'),
                'tiktok' => Request::input('tiktok'),
                'instagram' => Request::input('instagram'),
                'youtube' => Request::input('youtube'),
                'budget' => Request::input('budget'),
                'notes' => Request::input('notes'),
            ]
        );

        return;
    }

    public function get_mines()
    {
        $songId = Request::get('song_id');
        $c = DB::select('SELECT * FROM campaigns WHERE song_id=?', [$songId]);
        return response()->json($c);
    }
}
