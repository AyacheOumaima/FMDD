<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GalleryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'titre' => $this->titre,
            'slug' => $this->slug,
            'description' => $this->description,
            'image' => $this->image,
            'categories' => $this->categories,
            'type' => $this->type,
            'url_video' => $this->when($this->type === 'video', $this->url_video),
            'thumbnail' => $this->when($this->type === 'video', $this->thumbnail),
            'ordre' => $this->ordre,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
} 