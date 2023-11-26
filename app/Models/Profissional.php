<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Symfony\Component\Uid\Ulid;

class Profissional extends Model
{
    use HasFactory;
    use HasUlids;
    protected $fillable = [
        'id',
        'ulid',
        'user_id',
        'name',
        'category',
        'contact',
        'country',
        'about',
        'city',
        'level',
        'points',
        'url_cover',
        'wallet_credit',
    ];

    public function uniqueIds(): array
    {
        return [ 'ulid'];
    }

    public function newUniqueId(): string
    {
        return Ulid::generate();
    }
}
