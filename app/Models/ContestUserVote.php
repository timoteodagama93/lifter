<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContestUserVote extends Model
{
    use HasFactory;

    protected $fillable = [
        'song_id',
        'contest_id',
        'user_id'
    ];
}
