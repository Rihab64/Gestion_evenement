<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProviderResource;
use App\Models\Provider;
use Illuminate\Http\Request;

class ProviderController extends Controller
{
    // Liste des prestataires avec filtres et pagination
    public function index(Request $request)
    {
        $query = Provider::query()->with('user');

        // Filtres
        if ($request->filled('location')) {
            $query->where('address', 'like', '%' . $request->location . '%');
        }
        if ($request->filled('category_id')) {
            $query->whereHas('services', function ($q) use ($request) {
                $q->where('category_id', $request->category_id);
            });
        }
        if ($request->filled('min_price')) {
            $query->whereHas('services', function ($q) use ($request) {
                $q->where('base_price', '>=', $request->min_price);
            });
        }
        if ($request->filled('max_price')) {
            $query->whereHas('services', function ($q) use ($request) {
                $q->where('base_price', '<=', $request->max_price);
            });
        }
        if ($request->filled('min_rating')) {
            $query->where('rating', '>=', $request->min_rating);
        }

        $providers = $query->paginate(10);

        return ProviderResource::collection($providers);
    }

    // Profil public d'un prestataire
    public function show($id)
    {
        $provider = Provider::with(['user', 'services', 'portfolioItems'])->findOrFail($id);
        return new ProviderResource($provider);
    }

    // Recherche de prestataires
    public function search(Request $request)
    {
        $query = Provider::query()->with('user');

        if ($request->filled('q')) {
            $q = $request->q;
            $query->where(function ($sub) use ($q) {
                $sub->where('company_name', 'like', "%$q%")
                    ->orWhere('business_type', 'like', "%$q%");
            });
        }

        return ProviderResource::collection($query->paginate(10));
    }

    // Prestataires par catégorie
    public function byCategory($categoryId)
    {
        $providers = Provider::whereHas('services', function ($q) use ($categoryId) {
            $q->where('category_id', $categoryId);
        })->with('user')->paginate(10);

        return ProviderResource::collection($providers);
    }
}