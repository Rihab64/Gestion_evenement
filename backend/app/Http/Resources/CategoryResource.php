<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
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
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'icon' => $this->icon,
            'color' => $this->color,
            'image' => $this->when($this->image, [
                'url' => asset('storage/' . $this->image),
                'thumbnail' => asset('storage/thumbnails/' . $this->image),
            ]),
            'status' => $this->status,
            'status_label' => $this->status ? 'Actif' : 'Inactif',
            'is_featured' => $this->is_featured,
            'sort_order' => $this->sort_order,
            'meta' => [
                'services_count' => $this->when($this->services_count !== null, $this->services_count),
                'active_services_count' => $this->when($this->active_services_count !== null, $this->active_services_count),
                'providers_count' => $this->when($this->providers_count !== null, $this->providers_count),
                'events_count' => $this->when($this->events_count !== null, $this->events_count),
            ],
            'seo' => $this->when($this->meta_title || $this->meta_description, [
                'title' => $this->meta_title,
                'description' => $this->meta_description,
                'keywords' => $this->meta_keywords ? explode(',', $this->meta_keywords) : null,
            ]),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            'created_at_human' => $this->created_at->diffForHumans(),
            'updated_at_human' => $this->updated_at->diffForHumans(),
            
            // Relations conditionnelles
            'parent' => new CategoryResource($this->whenLoaded('parent')),
            'children' => CategoryResource::collection($this->whenLoaded('children')),
            'services' => ServiceResource::collection($this->whenLoaded('services')),
            'events' => EventResource::collection($this->whenLoaded('events')),
            'providers' => ProviderResource::collection($this->whenLoaded('providers')),
            
            // Relations avec limitation pour éviter la surcharge
            'featured_services' => $this->when($this->relationLoaded('services'), function () {
                return ServiceResource::collection(
                    $this->services->where('is_featured', true)->take(3)
                );
            }),
            'top_providers' => $this->when($this->relationLoaded('providers'), function () {
                return ProviderResource::collection(
                    $this->providers->sortByDesc('rating')->take(3)
                );
            }),
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
            'links' => [
                'self' => route('api.categories.show', $this->id),
                'services' => route('api.services.index', ['category' => $this->id]),
                'providers' => route('api.providers.index', ['category' => $this->id]),
            ],
        ];
    }

    /**
     * Customize the outgoing response for the resource.
     *
     * @param Request $request
     * @param \Illuminate\Http\JsonResponse $response
     * @return void
     */
    public function withResponse(Request $request, $response): void
    {
        if ($request->route()->getName() === 'api.categories.show') {
            $response->header('Cache-Control', 'public, max-age=3600');
        }
    }
}