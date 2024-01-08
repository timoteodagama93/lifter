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
        'collection_id',
        'owner_collection_id',
        'user_id',
    ];
}
