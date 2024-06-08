<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $fillable = [
        'estante_id',
        'title',
        'category',
        'html',
        'resume',
        'likes',
        'shares',
        'downloads',
        'comments',
        'stars',
        'views',
        'mime_type',
        'extension',
        'book_url',
        'original_name',
        'saved_name',


        'cover',
        'has_cover',
        'cover_mime_type',
        'cover_saved_name',
    ];
}
