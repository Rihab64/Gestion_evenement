<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterProviderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'          => 'required|string|max:255',
            'email'         => 'required|email|unique:users,email',
            'password'      => 'required|string|min:8|confirmed',
            'phone'         => 'nullable|string|max:20',
            'company_name'  => 'required|string|max:255',
            'business_type' => 'required|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'         => 'Le nom est obligatoire.',
            'email.required'        => 'L\'adresse email est obligatoire.',
            'email.email'           => 'L\'adresse email doit être valide.',
            'email.unique'          => 'Cet email est déjà utilisé.',
            'password.required'     => 'Le mot de passe est obligatoire.',
            'password.min'          => 'Le mot de passe doit contenir au moins 8 caractères.',
            'password.confirmed'    => 'La confirmation du mot de passe ne correspond pas.',
            'company_name.required' => 'Le nom de l\'entreprise est obligatoire.',
            'business_type.required'=> 'Le secteur d\'activité est obligatoire.',
        ];
    }
}