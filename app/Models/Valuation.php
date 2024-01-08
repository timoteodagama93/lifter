<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Valuation extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'colletion_id',
        'colletion_type',
        'stars',
        'points',
        'negative',
        'why_negative',
        'emotion',
    ];


    /**
     * Uma avaliação pertence a uma música
     */
    public function song(): BelongsTo
    {
        return $this->belongsTo(Song::class);
    }

    /**
     * Uma avaliação pertence a um usuário
     */
    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }
}
