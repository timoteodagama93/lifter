<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Wallet extends Model
{
    use HasFactory;

    protected $fillable = [
        'saldo',
        'total_ganho',
        'total_recebido',
        'total_transferido',
        'total_investido',
        'total_doado',
    ];

    /**
     * Usuário dono da carteira
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
