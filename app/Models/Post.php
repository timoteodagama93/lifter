<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_text',
        'img_url',
        'video_url',
    ];


        /**
     * Recupera os comentários de um usuário
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

}
