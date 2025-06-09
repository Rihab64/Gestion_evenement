<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'client_id' => $this->client_id,
            'category_id' => $this->category_id,
            'name' => $this->name,
            'description' => $this->description,
            'event_date' => $this->event_date?->format('Y-m-d'),
            'event_time' => $this->event_time?->format('H:i'),
            'event_datetime' => $this->event_date && $this->event_time 
                ? $this->event_date->format('Y-m-d') . ' ' . $this->event_time->format('H:i:s')
                : null,
            'location' => $this->location,
            'address' => $this->address,
            'coordinates' => $this->when($this->latitude && $this->longitude, [
                'latitude' => $this->latitude,
                'longitude' => $this->longitude,
            ]),
            'guest_count' => $this->guest_count,
            'budget' => [
                'amount' => $this->budget,
                'currency' => $this->currency ?? 'MAD',
                'formatted' => number_format($this->budget, 2) . ' ' . ($this->currency ?? 'MAD'),
            ],
            'status' => $this->status,
            'status_label' => $this->getStatusLabel(),
            'progress' => $this->progress,
            'progress_percentage' => $this->progress . '%',
            'is_urgent' => $this->event_date ? $this->event_date->diffInDays(now()) <= 7 : false,
            'days_until_event' => $this->event_date ? $this->event_date->diffInDays(now()) : null,
            'requirements' => $this->when($this->requirements, json_decode($this->requirements, true)),
            'images' => $this->when($this->images, function () {
                return collect(json_decode($this->images, true))->map(function ($image) {
                    return [
                        'url' => asset('storage/' . $image),
                        'thumbnail' => asset('storage/thumbnails/' . $image),
                    ];
                });
            }),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            'created_at_human' => $this->created_at->diffForHumans(),
            'updated_at_human' => $this->updated_at->diffForHumans(),
            
            // Relations
            'client' => new ClientResource($this->whenLoaded('client')),
            'category' => new CategoryResource($this->whenLoaded('category')),
            'providers' => ProviderResource::collection($this->whenLoaded('providers')),
            'requests' => RequestResource::collection($this->whenLoaded('requests')),
            'requests_count' => $this->when($this->relationLoaded('requests'), $this->requests->count()),
            'accepted_requests_count' => $this->when($this->relationLoaded('requests'), 
                $this->requests->where('status', 'accepted')->count()
            ),
        ];
    }

    /**
     * Get additional data that should be returned with the resource array.
     *
     * @param Request $request
     * @return array<string, mixed>
     */
    public function with(Request $request): array
    {
        return [
            'meta' => [
                'version' => '1.0',
                'timestamp' => now()->toISOString(),
            ],
        ];
    }

    /**
     * Get the status label for display
     */
    private function getStatusLabel(): string
    {
        return match ($this->status) {
            'draft' => 'Brouillon',
            'published' => 'Publié',
            'in_progress' => 'En cours',
            'completed' => 'Terminé',
            'cancelled' => 'Annulé',
            default => 'Inconnu',
        };
    }
}