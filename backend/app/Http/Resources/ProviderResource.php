<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProviderResource extends JsonResource
{
    public function toArray($request)
{
    return [
        'id'            => $this->id,
        'user_id'       => $this->user_id,
        'company_name'  => $this->company_name,
        'business_type' => $this->business_type,
        'description'   => $this->description,
        'address'       => $this->address,
        'phone'         => $this->phone,
        'website'       => $this->website,
        'rating'        => $this->rating,
        'status'        => $this->status,
        'user'          => new UserResource($this->whenLoaded('user')),
    ];
}
}