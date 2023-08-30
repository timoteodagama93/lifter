<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOneOrMany;

class Artist extends Model
{
    use HasFactory;

    /**
     * Cada artist belongsTo one user. Significando que cada user pode gerenciar um artista.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    /**
     * Feedbacks: cada artista terá zero ou muitos feedbacks.
     */
    public function feedback(): HasMany
    {
        return $this->HasMany(Feedback::class);
    }
    
}
