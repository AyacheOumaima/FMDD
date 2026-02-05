<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GalleryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'titre' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|string|max:255',
            'categories' => 'nullable|array',
            'categories.*' => 'string',
            'type' => 'required|in:image,video',
            'url_video' => 'nullable|url|required_if:type,video',
            'thumbnail' => 'nullable|string|required_if:type,video',
            'actif' => 'boolean',
            'ordre' => 'integer'
        ];
    }

    public function messages(): array
    {
        return [
            'titre.required' => 'Le titre est obligatoire',
            'titre.max' => 'Le titre ne doit pas dépasser 255 caractères',
            'image.required' => 'L\'image est obligatoire',
            'type.in' => 'Le type doit être soit "image" soit "video"',
            'url_video.required_if' => 'L\'URL de la vidéo est obligatoire pour le type vidéo',
            'url_video.url' => 'L\'URL de la vidéo doit être une URL valide',
            'thumbnail.required_if' => 'La vignette est obligatoire pour le type vidéo'
        ];
    }
} 