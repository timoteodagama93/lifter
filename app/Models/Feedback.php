<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Feedback extends Model
{
    use HasFactory;

    protected $fillable = [
        'message',
        'public',
        'status_read',
        'likes',
        'dislikes',
    ];
    /**
     * Um feedback pertence a uma música.
     */
    public function song(): BelongsTo
    {
        return $this->belongsTo(Song::class);
    }
}
