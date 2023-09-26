<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Symfony\Component\Uid\Ulid;

class ContestsSong extends Model
{
    use HasFactory;
    use HasUlids;

    protected $fillable = [
        'designacao',
        'descricao',
        'estilo_musical',
        'inicio_inscricoes',
        'inicio_votacoes',
        'termino_inscricoes',
        'termino_votacoes',
        'activo',
        'estado',
        'url_cover',
        'url_schedule',
        'url_beneficios',
        'url_terms',
        'url_conditions',
    ];

    public function uniqueIds()
    {
        return ['id'];
    }
    public function newUniqueId()
    {
        return Ulid::generate();
    }
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
