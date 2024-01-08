<?php

namespace App\Http\Controllers;

use App\Models\Exposition;
use App\Models\ExpositionsItems;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ExpositionsController extends Controller
{
    //

    public function store()
    {
        Validator::make(Request::all(), [
            'cover' => ['required', 'mimes:png,jpg,jpeg'],
            'title' => ['required'],
            'expositor' => ['required'],
            'category' => ['required'],
            'description' => ['required'],
        ])->validate();
        $userId = auth()->id();

        $exposition = Exposition::create([
            'user_id' => $userId,
            'title' => Request::input('title'),
            'expositor' => Request::input('expositor'),
            'category' => Request::input('category'),
            'description' => Request::input('description'),
        ]);

        $coverUrl = Request::file('cover')->store("public/users/$userId/expositions/$exposition->id/covers");
        if ($coverUrl) {
            $exposition->cover = Storage::url($coverUrl);
            $exposition->mime_type = Request::file('cover')->getClientMimeType();
            $exposition->extension = Request::file('cover')->getClientOriginalExtension();
            $exposition->save();
        }

        return to_route('arts', ['has' => 'expositions']);
    }

    public function store_item()
    {
        Validator::make(Request::all(), [
            'item' => ['required', 'mimes:png,jpg,jpeg,mp4'],
            'title' => ['required'],
            'category' => ['required'],
            'description' => ['required'],
        ])->validate();
        $userId = auth()->id();
        $room = Exposition::find(Request::input('room_id'));
        $itemUrl = Request::file('item')->store("public/users/$userId/expositions/$room->id/items");

        if ($itemUrl) {
            $mimeType = Request::file('item')->getClientMimeType();
            $extension = Request::file('item')->getClientOriginalExtension();

            $expositionItem = ExpositionsItems::create([
                'exposition_id' => $room->id,
                'title' => Request::input('title'),
                'category' => Request::input('category'),
                'description' => Request::input('description'),
                'item_url' => Storage::url($itemUrl),
                'mime_type' => $mimeType,
                'extension' => $extension,
            ]);
        }

        return to_route('arts', ['has' => 'expositions']);
    }

    public function get_expositions_rooms()
    {
        return Exposition::all();
    }

    public function get_room_items($roomId)
    {
        return DB::select("SELECT * FROM expositions_items WHERE exposition_id=$roomId");
    }
}
