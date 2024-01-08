<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exposition extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'title',
        'expositor',
        'category',
        'description',
        'cover',
        'mime_type',
        'extension',
    ];
}
