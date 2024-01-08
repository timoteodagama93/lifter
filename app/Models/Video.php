<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'category', //Dança, teatro, cinema, 
        'producer',
        'description',
        'saved_name',
        'original_name',
        'url',
        'mime_type',
        'extension',
        'stars',
        'plays',
        'likes',
        'reprodution_time',
        'downloads',
        'shares',
        'destaque',
        'active',
    ];
}
