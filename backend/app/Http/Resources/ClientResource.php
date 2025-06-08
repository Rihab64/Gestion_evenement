<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
{
    return [
        'id'         => $this->id,
        'user_id'    => $this->user_id,
        'first_name' => $this->first_name,
        'last_name'  => $this->last_name,
        'phone'      => $this->phone,
        'address'    => $this->address,
        'preferences'=> $this->preferences,
        'user'       => new UserResource($this->whenLoaded('user')),
    ];
}
}
