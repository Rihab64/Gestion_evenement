<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
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
        'sender_id'  => $this->sender_id,
        'receiver_id'=> $this->receiver_id,
        'request_id' => $this->request_id,
        'content'    => $this->content,
        'read_at'    => $this->read_at,
        'created_at' => $this->created_at,
        'sender'     => new UserResource($this->whenLoaded('sender')),
        'receiver'   => new UserResource($this->whenLoaded('receiver')),
    ];
}
}
