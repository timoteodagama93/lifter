<?php

namespace App\Actions\Fortify;

use App\Models\Artist;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Laravel\Jetstream\Jetstream;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): Artist
    {
        Validator::make($input, [
            'nome' => ['required', 'string', 'max:255', 'unique:artists'],
            'pais' => ['required', 'string', 'max:255',],
        ])->validate();

        $artist = Artist::create([
            'nome' => $input['nome'],
            'estilo' => $input['estilo'],
            'pais' => $input['pais'],
        ]);
        return $artist;

        //return to_route('artist', $user);
    }
}
