<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    use HasFactory;
    protected $fillable = [
        'message',
        'status_read',
        'urls_atachments',
    ];


    /**
     * Uma mensagem pertence a uma amizade
     */
    public function friendship(): BelongsTo
    {
        return $this->belongsTo(Friendship::class);
    }
}
