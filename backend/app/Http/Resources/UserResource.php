<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
{
    return [
        'id'        => $this->id,
        'name'      => $this->name,
        'email'     => $this->email,
        'user_type' => $this->user_type,
        'phone'     => $this->phone,
        'status'    => $this->status,
        'created_at'=> $this->created_at,
    ];
}
}
