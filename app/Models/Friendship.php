<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Friendship extends Model
{
    use HasFactory;
    protected $fillable = [
        'friendship_name',
    ];
    /**
     * Uma amizade pertence a muitos  usuários
     * Recupera os usuários de uma usuário. 
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
            ->as('friends')
            ->withTimestamps();
    }

    /**
     * Uma amizade tem muitas mensagens
     * Recupera as mensagens de uma amizade entre dois usuários. 
     */
    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }
}
