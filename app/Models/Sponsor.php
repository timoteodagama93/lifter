<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Sponsor extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'about',
        'phone',
        'email',
        'address',
        'url_logo',
    ];
    /**
     * Um concurso musical vai ter muitos patrocinadores.
     */
    public function sponsor(): BelongsToMany
    {
        return $this->belongsToMany(ContestSong::class)

            ->withTimestamps();
    }
}
