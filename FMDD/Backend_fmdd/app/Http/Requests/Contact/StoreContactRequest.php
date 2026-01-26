<?php

namespace App\Http\Requests\Contact;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Tout le monde peut contacter
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nom_complet' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email'],
            'objet' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nom_complet.required' => 'Le nom complet est requis',
            'nom_complet.max' => 'Le nom complet ne doit pas dépasser 100 caractères',
            'email.required' => 'L\'email est requis',
            'email.email' => 'L\'email doit être une adresse valide',
            'objet.required' => 'L\'objet est requis',
            'objet.max' => 'L\'objet ne doit pas dépasser 255 caractères',
            'message.required' => 'Le message est requis',
        ];
    }
}
