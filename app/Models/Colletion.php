<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Colletion extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'collection_id',
        'collection_type',
    ];
}
