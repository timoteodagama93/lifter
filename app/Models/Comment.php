<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'collection_id',
        'collection_type',
        'comment',
        'public',
        'status_saw',
        'likes',
        'dislikes',
        'answers',
    ];

    /**
     * Post a que o comentário pertence.
     */
    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }

    /**
     * Respostas aos comentários
     */
    public function answers(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
