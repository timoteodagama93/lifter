<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
