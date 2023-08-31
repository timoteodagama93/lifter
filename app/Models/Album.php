<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Album extends Model
{
    use HasFactory;
    protected $table = 'albuns';
    protected $fillable = [
        'title',
        'year',
        'likes',
        'dislikes',
        'downloads',
        'shares',
        'participations',
    ];

    /**
     * Um album pertence a um artista
     */
    public function artist(): BelongsTo
    {
        return $this->belongsTo(Artist::class);
    }

    /**
     * Um album vai ter muitas músicas
     */
    public function songs():HasMany{
        return $this->hasMany(Song::class);
    }


}
