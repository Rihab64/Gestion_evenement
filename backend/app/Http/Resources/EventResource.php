<?php
// backend/app/Http/Resources/EventResource.php

class EventResource
{
public function toArray($request)
{
    return [
        'id'          => $this->id,
        'client_id'   => $this->client_id,
        'category_id' => $this->category_id,
        'name'        => $this->name,
        'description' => $this->description,
        'event_date'  => $this->event_date,
        'event_time'  => $this->event_time,
        'location'    => $this->location,
        'address'     => $this->address,
        'guest_count' => $this->guest_count,
        'budget'      => $this->budget,
        'status'      => $this->status,
        'progress'    => $this->progress,
        'created_at'  => $this->created_at,
        'updated_at'  => $this->updated_at,
        'client'      => new ClientResource($this->whenLoaded('client')),
        'category'    => $this->whenLoaded('category'),
    ];
}
}