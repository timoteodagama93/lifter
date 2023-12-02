<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Symfony\Component\Uid\Ulid;

class Campaign extends Model
{
    use HasFactory;
    use HasUlids;

    protected $fillable = [
        'id',
        'song_id',
        'numero',
        'codigo',
        'age',
        'gender',
        'ocupation',
        'formation',
        'location',
        'goals',
        'goal_size',
        'days',
        'lifter',
        'produtoras',
        'djs',
        'influencers',
        'agentes',
        'prmotores',
        'blogueiros',
        'interna',
        'facebook',
        'tiktok',
        'instagram',
        'youtube',
        'budget',
        'notes',
    ];

    public function uniqueIds()
    {
        return ['id'];
    }

    public function newUniqueId()
    {
        return Ulid::generate();
    }
}
