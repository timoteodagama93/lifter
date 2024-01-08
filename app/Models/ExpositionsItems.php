<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpositionsItems extends Model
{
    use HasFactory;

    protected $fillable = [
        'exposition_id',
        'title',
        'category',
        'description',
        'likes',
        'shares',
        'downloads',
        'comments',
        'stars',
        'mime_type',
        'extension',
        'item_url',
    ];


    
}
