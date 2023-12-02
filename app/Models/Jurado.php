<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jurado extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'user_id',
        'contest_id',
        'name',
        'ocupation',
        'active',
        'contact',
        'bio',
        'given_votes',
    ];
}
