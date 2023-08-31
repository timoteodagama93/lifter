<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VoteSongsContest extends Model
{
    use HasFactory;

    protected $fillable = [
        'positive',
        'contest_id',
    ];

    /**
     * Um voto pertence a um concurso
     */
    public function artist():BelongsTo{
        return $this->belongsTo(Artist::class);
    }
}
