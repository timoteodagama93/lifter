<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable //implements MustVerifyEmail
{
    use HasApiTokens;
    use HasFactory;
    use HasProfilePhoto;
    use Notifiable;
    use TwoFactorAuthenticatable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'faceboook_id',
        'tiktok_id',
        'google_id',
        'phone',
        'country',
        'password',
        'is_artist',
        'is_manager',
        'is_editor',
        'is_profissional',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url',
    ];

    /** */

    /**
     * Relacionamento com o Modelo de artista. User->hasMany->Artist
     * Um mesmo usuário pode criar e gerenciar várias contas de artistas. 
     */
    public function artists(): HasMany
    {
        return $this->hasMany(Artist::class);
    }

    /**
     * Um usuário tem muitas amizades.
     * Recupera as amizades de um usário
     */
    public function friendships(): BelongsToMany
    {
        return $this->belongsToMany(Friendship::class)
            ->withPivot('relation_name')
            ->as('friends')
            ->withTimestamps();
    }

    /**
     * Um usuário tem muitas playlists
     * Recupera as playlists do usuario
     */
    public function playlists(): HasMany
    {
        return $this->hasMany(Playlist::class);
    }

    /**
     * Um usuário uma conta de creditos. 
     */
    public function wallet(): HasOne
    {
        return $this->hasOne(Wallet::class);
    }

    /**
     * Um usuário tem muitos posts
     */
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    /**
     * Um usuário pode criar uitos concursos
     */
    public function contests(): HasMany
    {
        return $this->hasMany(Contest::class);
    }

    /** 
     * Um usuário vai ter muitos votos
     */
    public function votes(): HasMany
    {
        return $this->hasMany(VoteContest::class);
    }

    /** 
     * Um usuário pode fazer muitas avaliações 
     */
    public function valuations(): HasMany
    {
        return $this->hasMany(Valuation::class);
    }

    /**
     * Um usuário possui muitas notificações
     */
    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }
}
