<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ContestSong extends Model
{
    use HasFactory;

    protected $fillable = [
        'contest_name',
        'start_date',
        'end_date',
        'url_cover',
        'url_terms',
        'url_conditions',
    ];
    /**
     * Um concurso tem muitos artistas. E um artista pode estar em muitos concursos 
     * Relação muitos para muitos.
     */
    public function artists(): BelongsToMany
    {
        return $this->belongsToMany(Artist::class)
            ->withPivot('active')
            ->as('competition')
            ->withTimestamps();
    }

    /** 
     * Um usuário vai ter muitos votos
     */
    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class);
    }

    /**
     * Um concurso musical vai ter muitos patrocinadores.
     */
    public function sponsor(): BelongsToMany
    {
        return $this->belongsToMany(Sponsor::class)

            ->withTimestamps();
    }
}
