<?php

namespace App\Actions\Fortify;

use Laravel\Fortify\Rules\Password;

trait PhoneValidationRules
{
    /**
     * Get the validation rules used to validate passwords.
     *
     * @return array<int, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    protected function passwordRules(): array
    {
        return [
            'required', 
            'string', 
            new Password, 
            (new Password)->requireUppercase(),
            (new Password)->requireNumeric(),
            (new Password)->requireSpecialCharacter(),
            (new Password)->length(8),
            'confirmed'];
    }
}
