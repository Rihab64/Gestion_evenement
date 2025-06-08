<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

// backend/app/Http/Resources/ServiceResource.php
class ServiceResource extends JsonResource
{
   
public function toArray($request)
{
    return [
        'id'          => $this->id,
        'provider_id' => $this->provider_id,
        'category_id' => $this->category_id,
        'name'        => $this->name,
        'description' => $this->description,
        'price_type'  => $this->price_type,
        'base_price'  => $this->base_price,
        'is_active'   => $this->is_active,
        'created_at'  => $this->created_at,
        'updated_at'  => $this->updated_at,
        'provider'    => new ProviderResource($this->whenLoaded('provider')),
        'category'    => $this->whenLoaded('category'),
    ];
}
}