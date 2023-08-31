<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VoteContest extends Model
{
    use HasFactory;

    protected $fillable = [
        'positive',
        'contest_id',
    ];

    /**
     * Um voto pertence a um concurso
     */
    public function user():BelongsTo{
        return $this->belongsTo(User::class);
    }
}
