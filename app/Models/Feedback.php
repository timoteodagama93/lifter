<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Feedback extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'song_id',
        'message',
        'public',
        'status_read',
        'likes',
        'dislikes',
    ];
    protected $table = 'feedbacks';
    /**
     * Um feedback pertence a uma música.
     */
    public function song(): BelongsTo
    {
        return $this->belongsTo(Song::class);
    }
}
