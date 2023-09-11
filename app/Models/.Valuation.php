<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Valuation extends Model
{
    use HasFactory;
    protected $fillable = [
        'stars',
        'emotion',
    ];

    /**
     * Uma avaliação pertence a uma música
     */
    public function song(): BelongsTo
    {
        return $this->belongsTo(Song::class);
    }
}
