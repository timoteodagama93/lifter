<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOneOrMany;

class Artist extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'genres',
        'contact',
        'country',
        'about',
        'city',
        'url_cover',
        'path_cover',
    ];

    /**
     * Cada artist belongsTo one user. Significando que cada user pode gerenciar um artista.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    /**
     * Feedbacks: cada artista terá zero ou muitos feedbacks.
     */
    public function feedback(): HasMany
    {
        return $this->HasMany(Feedback::class);
    }

    /**
     * Relação muitos para muitos entre Artista(artis) e Concurso(contest)
     */
    public function songsContests(): BelongsToMany
    {
        return $this->belongsToMany(SongsContest::class)
            ->withPivot('active')
            ->as('competition')
            ->withTimestamps();
    }

    /**
     * Um artista tem muitos albuns
     */


    /** 
     * Um artista vai ter muitos votos
     */
    public function votes(): HasMany
    {
        return $this->hasMany(VoteSongsContest::class);
    }

    /**
     * Um artista pode ter muitos albuns
     */
    public function albuns(): HasMany
    {
        return $this->hasMany(Album::class);
    }
}
