<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRegistrationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // L'autorisation est gérée par le middleware d'authentification
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // Plus de champs requis côté frontend, tout est récupéré via l'utilisateur connecté
        ];
    }
    
    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [];
    }
}
