<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Symfony\Component\Uid\Ulid;

/**
 * Modelo para concursos de modo geral. Excepto concursos musicais, que contam com seu proprio modelo.
 */
class Contest extends Model
{
    use HasFactory;
    use HasUlids;

    protected $fillable = [
        'user_id',
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
     * Um concurso tem muitos usuários. E um usuário pode estar em muitos concursos 
     * Relação muitos para muitos.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
            ->withPivot('active')
            ->as('competition')
            ->withTimestamps();
    }
}
