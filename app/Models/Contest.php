<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
/**
 * Modelo para concursos de modo geral. Excepto concursos musicais, que contam com seu proprio modelo.
 */
class Contest extends Model
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
