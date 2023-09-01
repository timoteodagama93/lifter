<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Playlist extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'public',
        'likes',
        'dislikes',
        'description',
    ];

    /**
     * Usuário dono da playlist
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Playlist vai ter muitas canções
     */
    public function songs(): BelongsToMany
    {
        return $this->belongsToMany(Song::class)->withTimestamps();
    }
}