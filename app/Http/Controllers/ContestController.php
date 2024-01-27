<?php

namespace App\Http\Controllers;

use App\Models\Contest;
use App\Models\ContestUser;
use App\Models\ContestUserVote;
use App\Models\User;
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
            'cover' => ['required', 'mimes:jpg,jpeg,png, mp4'], //TODO: Delimitar tamanho
            'categoria' => ['required'],
            'subcategoria' => ['required'],
            'designacao' => ['required'],
            'descricao' => ['required'],
        ])->validate();

        $user_id = Auth::id();
        $contest = Contest::create(
            [
                'user_id' => $user_id,
                'designacao' => Request::get('designacao'),
                'descricao' => Request::get('descricao'),
                'categoria' => Request::get('categoria'),
                'subcategoria' => Request::get('subcategoria'),
            ]
        );

        $file = Request::file('cover')->store("public/contests/$contest->id/covers");
        $contest->url_cover = Storage::url($file);
        $contest->cover_mime_type = Request::file('cover')->getClientMimeType();
        $contest->cover_extension = Request::file('cover')->getClientOriginalExtension();
        $contest->save();
        return  Inertia::render('Perfil/Perfil', ['contest' => $contest]); //->json(['new_contest' => $contest]);//to_route('perfil', ['new_contest' => $contest]); 
    }


    public function update()
    {
        if (Request::file('cover') != null) {

            Validator::make(Request::all(), [
                'cover' => ['nullable', 'mimes:jpg,jpeg,png, mp4'],
                'designacao' => ['required'],
                'categoria' => ['required'],
                'subcategoria' => ['required'],
                'descricao' => ['required'],
            ])->validateWithBag('contestCreationCoverFails');

            $user_id = Auth::id();
            $contest = Contest::updateOrCreate(
                [
                    'user_id' => $user_id,
                    'id' => Request::input('id'),
                ],
                [
                    'cover_mime_type' => Request::file('cover')->getClientMimeType(),
                    'cover_extension' => Request::file('cover')->getClientOriginalExtension(),
                    'designacao' => Request::input('designacao'),
                    'descricao' => Request::input('descricao'),
                    'categoria' => Request::input('categoria'),
                    'subcategoria' => Request::input('subcategoria'),
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
                    'descricao' => Request::input('descricao'),
                    'categoria' => Request::input('categoria'),
                    'subcategoria' => Request::input('subcategoria'),
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
        $ownerCollectionId = Request::input('owner_collection_id');
        $collectionId = Request::input('collection_id');
        $userId = auth()->id();

        $registration = ContestUser::updateOrCreate([
            'contest_id' => $contestId,
            'owner_collection_id' => $ownerCollectionId,
            'user_id' => $userId
        ], [
            'collection_id' => $collectionId,
        ]);
        return to_route('concursos');
    }

    public function new_vote_on_participante()
    {
        $userId = auth()->id();
        $contestId = Request::get('contest_id');
        $done = ContestUserVote::updateOrCreate(['user_id' => $userId,  'contest_id' => $contestId], ['collection_id' => Request::get('collection_id'),]);
        if ($done) {
            return to_route('concursos', [$done]); // Inertia::render('Concursos/Index', ['contest' => Contest::find($done)]); // response(true, 200);
        } else {
            return to_route('concursos', [$done]); // Inertia::render('Concursos/Index', ['contest' => Contest::find($contestId)]);
        }
    }

    public function am_I_participant()
    {
        $contestId = Request::get('contest_id');
        $userId = auth()->id();

        $sql = "SELECT * FROM contest_users WHERE  contest_id='$contestId' AND user_id=$userId";

        $participants =  DB::select($sql);
        return response()->json($participants);
    }

    public function participant_votes()
    {
        $songId = Request::get('song_id');
        $contestId = Request::get('contest_id');
        $userId = auth()->id();

        $sql = "SELECT id FROM contest_user_votes COUNT where collection_id='$songId' AND contest_id='$contestId'";
        return response()->json(DB::select($sql));
    }

    public function i_voted_on_this()
    {
        $collectionId = Request::get('collection_id');
        $contestId = Request::get('contest_id');
        $userId = auth()->id();

        $sql = "SELECT id FROM contest_user_votes COUNT where collection_id='$collectionId' AND user_id =$userId AND contest_id='$contestId'";
        $participant = DB::select($sql);
       return $participant;
        if ($participant) {
            return response($participant);
        } else {
            return response([]);
        }
    }

    public function contest_participants(Request $request)
    {
        $data = [];
        $contestId = $request::get('contest_id');
        $contest = Contest::find($contestId);

        $filter = $contest->categoria;

        if ($contest->categoria == 'Música') {

            $data = DB::select("SELECT songs.`id`, `artist_id`, `title`, `saved_name`, `original_name`, `likes`, `genre`, `artist`, `gravadora`, `destaque`, `active`, `mime_type`, `extension`, `participacoes`, `letra`, `cover`, `url`, `path`, `stars`, `reprodution_time`, `plays`, `downloads`, `shares`, songs.`created_at`, songs.`updated_at` FROM `songs` JOIN contest_users WHERE contest_users.collection_id=songs.id AND contest_users.contest_id= '$contest->id' ");
        } else if ($contest->categoria == 'Dança') {
            $data = DB::select("SELECT * FROM videos WHERE user_id = '$contest->id' AND  category='dance' ");
        } else if ($contest->categoria == 'Artes Mistas') {
            $data = DB::select("SELECT * FROM videos WHERE user_id = '$contest->id' AND category='teatro' OR category='cinema' OR category='humor' ");
        } else if ($contest->categoria == 'Literatura') {
            $data = DB::select("SELECT `id`, `estante_id`, `title`, `category`, `resume`, `likes`, `shares`, `downloads`, `comments`, `stars`, `views`, `mime_type`, `extension`, `book_url`, books.`created_at`, books.`updated_at`, contest_users.owner_collection_id FROM books JOIN contest_users WHERE contest_users.collection_id = books.id AND contest_users.contest_id = '$contest->id' ");
        } else if ($contest->categoria == 'Artes Visuais') {
            $data = DB::select("SELECT expositions_items.`id`, `exposition_id`, expositions_items.`title`, expositions_items.`category`, expositions_items.`description`, `likes`, `shares`, `downloads`, `comments`, `stars`, expositions_items.`mime_type`, expositions_items.`extension`, `item_url`, expositions_items.`created_at`, expositions_items.`updated_at`, expositions.user_id FROM expositions_items JOIN contest_users JOIN expositions WHERE contest_users.collection_id=expositions_items.id AND contest_users.contest_id='$contest->id' ");
        }

        return response()->json($data);
    }

    public function filter_contest(Request $request)
    {
        $data = [];
        $contestId = $request::get('contest_id');
        $contest = Contest::find($contestId);

        $filter = $contest->categoria;

        if ($filter == 'Música') {

            $data = DB::select("SELECT * FROM songs Join contest_users WHERE songs.id=contest_users.collection_id  AND contest_id= '$contestId' ");
        } else if ($filter == 'videos') {
            $data = DB::select("SELECT * FROM songs Join contest_users WHERE songs.id=contest_users.collection_id AND songs.mime_type LIKE '%video%'  AND contest_id= '$contestId' ");
        } else if ($filter == 'artists') {
            $data = DB::select("SELECT * FROM `artists` JOIN contest_users WHERe contest_users.owner_collection_id=artists.id  AND contest_id= '$contestId'");
        } else if ($filter == 'jury') {
            $data = DB::select("SELECT * FROM users JOIN contest_users WHERE contest_users.user_id=users.id  AND contest_id= '$contestId';
            ");
        }

        return response()->json($data);
    }

    public function get_user_collections_for_contest(Request $request)
    {
        $data = [];
        $contestId = $request::get('contest_id');
        $contest = Contest::find($contestId);

        if ($contest) {
            $userId = auth()->id();

            if ($contest->categoria == 'Música') {

                $data = DB::select("SELECT songs.id, songs.artist_id,songs.title, songs.genre,songs.artist,songs.active FROM songs Join artists WHERE songs.artist_id=artists.id AND artists.user_id= '$userId' ");
            } else if ($contest->categoria == 'Dança') {
                $data = DB::select("SELECT * FROM videos WHERE user_id = $userId AND  category='dance' ");
            } else if ($contest->categoria == 'Artes Mistas') {
                $data = DB::select("SELECT * FROM videos WHERE user_id = $userId AND category='teatro' OR category='cinema' OR category='humor' ");
            } else if ($contest->categoria == 'Literatura') {
                $data = DB::select("SELECT books.id, books.estante_id, books.title, books.category, books.resume FROM books JOIN estantes WHERE estantes.user_id = $userId AND books.estante_id=estantes.id ");
            } else if ($contest->categoria == 'Artes Visuais') {
                $data = DB::select("SELECT expositions_items.id,expositions_items.exposition_id, expositions_items.title, expositions_items.category FROM expositions_items JOIN expositions WHERE expositions.user_id = $userId AND expositions_items.exposition_id=expositions.id; ");
            }

            return response()->json($data);
        } else {
            return response()->json([]);
        }
    }

    public function get_contestant_details()
    {
        $userId = Request::get('user_id');

        return User::find($userId);
    }
}
