<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_text',
        'mime_type',
        'file_url',
        'user_id',
        'file_path',
        'likes',
        'dislikes',
    ];

    /**
     * Recupera os comentários de um usuário
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Um post pertence a usuário
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Um poste tem um ficheiro: image, video, música
     */
    public function medias(): HasMany
    {
        return $this->hasMany(Media::class);
    }
}
