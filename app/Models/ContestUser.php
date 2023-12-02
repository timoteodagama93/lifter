<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContestUser extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'contest_id',
        'song_id',
        'artist_id',
        'user_id',
    ];
}
