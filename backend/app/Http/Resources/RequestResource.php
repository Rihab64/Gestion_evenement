<?php
// backend/app/Http/Resources/RequestResource.php


namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RequestResource extends JsonResource
{
    public function toArray($request)
    {
        return [
           'id'          => $this->id,
        'client_id'   => $this->client_id,
        'provider_id' => $this->provider_id,
        'event_id'    => $this->event_id,
        'service_id'  => $this->service_id,
        'message'     => $this->message,
        'budget_range'=> $this->budget_range,
        'status'      => $this->status,
        'created_at'  => $this->created_at,
        'client'      => new ClientResource($this->whenLoaded('client')),
        'provider'    => new ProviderResource($this->whenLoaded('provider')),
        'event'       => $this->whenLoaded('event'),
        'service'     => $this->whenLoaded('service'),
        ];
    }
}