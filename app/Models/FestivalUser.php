<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FestivalUser extends Model
{
    use HasFactory;
    protected $fillable = [
        'festival_id',
        'user_id',
        'as',
        'how_much',
        'suggestion',
    ];
}
