<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProviderResource;
use App\Models\Provider;
use Illuminate\Http\Request;

class ProviderController extends Controller
{
    /**
     * Liste des prestataires avec filtres et pagination
     */
    public function index(Request $request)
    {
        $query = Provider::query()
            ->with('user')
            ->approved(); // Only show approved providers

        // Use the model's filter scope
        $query->filter($request->only(['q', 'location', 'min_rating']));

        // Additional filters for services (only if Service model exists)
        if ($request->filled('category_id') && class_exists('App\Models\Service')) {
            $query->whereHas('services', function ($q) use ($request) {
                $q->where('category_id', $request->category_id);
            });
        }

        if ($request->filled('min_price') && class_exists('App\Models\Service')) {
            $query->whereHas('services', function ($q) use ($request) {
                $q->where('base_price', '>=', $request->min_price);
            });
        }

        if ($request->filled('max_price') && class_exists('App\Models\Service')) {
            $query->whereHas('services', function ($q) use ($request) {
                $q->where('base_price', '<=', $request->max_price);
            });
        }

        // Sorting options
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        
        if (in_array($sortBy, ['rating', 'company_name', 'created_at'])) {
            $query->orderBy($sortBy, $sortOrder === 'asc' ? 'asc' : 'desc');
        }

        $perPage = min((int) $request->get('per_page', 10), 50); // Max 50 items per page
        $providers = $query->paginate($perPage);

        return ProviderResource::collection($providers);
    }

    /**
     * Profil public d'un prestataire
     */
    public function show($id)
    {
        $with = ['user'];
        
        // Only eager load services if the model exists
        if (class_exists('App\Models\Service')) {
            $with[] = 'services';
        }
        
        // Only eager load portfolio items if the relationship exists
        if (method_exists(Provider::class, 'portfolioItems')) {
            $with[] = 'portfolioItems';
        }
        
        $provider = Provider::with($with)
            ->approved()
            ->findOrFail($id);
            
        return new ProviderResource($provider);
    }

    /**
     * Recherche de prestataires
     */
    public function search(Request $request)
    {
        $request->validate([
            'q' => 'required|string|min:2|max:100',
            'location' => 'nullable|string|max:100',
            'min_rating' => 'nullable|numeric|min:0|max:5',
            'per_page' => 'nullable|integer|min:1|max:50'
        ]);

        $query = Provider::query()
            ->with('user')
            ->approved();

        // Use the model's filter scope
        $query->filter($request->only(['q', 'location', 'min_rating']));

        // Sorting by relevance (rating) for search results
        $query->orderBy('rating', 'desc')
              ->orderBy('company_name', 'asc');

        $perPage = min((int) $request->get('per_page', 10), 50);
        $providers = $query->paginate($perPage);

        return ProviderResource::collection($providers);
    }

    /**
     * Prestataires par catégorie
     */
    public function byCategory($categoryId)
    {
        if (!class_exists('App\Models\Service')) {
            return response()->json(['message' => 'Service filtering not available'], 404);
        }
        
        $providers = Provider::whereHas('services', function ($q) use ($categoryId) {
                $q->where('category_id', $categoryId);
            })
            ->with('user')
            ->approved()
            ->orderBy('rating', 'desc')
            ->paginate(10);

        return ProviderResource::collection($providers);
    }

    /**
     * Get top rated providers
     */
    public function topRated(Request $request)
    {
        $limit = min((int) $request->get('limit', 5), 20);
        
        $providers = Provider::query()
            ->with('user')
            ->approved()
            ->where('rating', '>', 0)
            ->orderBy('rating', 'desc')
            ->limit($limit)
            ->get();

        return ProviderResource::collection($providers);
    }

    /**
     * Get providers statistics
     */
    public function stats()
    {
        return response()->json([
            'total_providers' => Provider::approved()->count(),
            'average_rating' => Provider::approved()->where('rating', '>', 0)->avg('rating'),
            'top_business_types' => Provider::approved()
                ->selectRaw('business_type, COUNT(*) as count')
                ->groupBy('business_type')
                ->orderBy('count', 'desc')
                ->limit(5)
                ->get()
        ]);
    }
}