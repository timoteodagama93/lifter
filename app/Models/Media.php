<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Media extends Model
{
    use HasFactory;
    protected $fillable = [
        'song_id',
        'post_id',
        'name',
        'file_name',
        'mime_type',
        'path',
        'disk',
        'file_has',
        'colletion',
        'size',
    ];

    /**
     * Um arquivo pertence a uma postagem
     */
    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
    /**
     * Um arquivo de mídeia pertence a uma mmúsica
     */
    public function song(): BelongsTo
    {
        return $this->belongsTo(Song::class);
    }
}
