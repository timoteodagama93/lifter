<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Song extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'artist',
        'cover',
        'url',
        'path',
        'downloads',
        'shares',
    ];

    /**
     * Uma música pertence a um artista
     */
    public function artist(): BelongsTo
    {
        return $this->belongsTo(Artist::class);
    }

    /**
     * Uma música tem muitas avaliações
     */
    public function valuations(): HasMany
    {
        return $this->hasMany(Valuation::class);
    }

    /**
     * Uma música tem muitos feedbacks.
     */
    public function feedbacks(): HasMany
    {
        return $this->hasMany(Feedback::class);
    }

    /** 
     * Uma música vai ter muitos votos
     */
    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class);
    }
    /** 
     * Uma música vai ter um arquivo de mídia associado
     */
    public function media():HasOne 
    {
        return $this->hasOne(Media::class);
    }

    /**
     * Playlist vai ter muitas canções
     */
    public function playlists(): BelongsToMany
    {
        return $this->belongsToMany(Playlist::class)->withTimestamps();
    }
}
