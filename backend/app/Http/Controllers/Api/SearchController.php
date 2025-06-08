<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Provider;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\ProviderResource;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function services(Request $request)
    {
        $query = Service::query()->filter($request->all());

        // Tri
        if ($request->filled('sort')) {
            switch ($request->sort) {
                case 'price_asc':
                    $query->orderBy('base_price', 'asc');
                    break;
                case 'price_desc':
                    $query->orderBy('base_price', 'desc');
                    break;
                case 'rating':
                    $query->orderBy('rating', 'desc');
                    break;
                default: // pertinence ou autre
                    $query->orderBy('name');
            }
        }

        $services = $query->paginate(10);
        return ServiceResource::collection($services);
    }

    public function providers(Request $request)
    {
        $query = Provider::query()->filter($request->all());

        // Tri
        if ($request->filled('sort')) {
            switch ($request->sort) {
                case 'rating':
                    $query->orderBy('rating', 'desc');
                    break;
                default:
                    $query->orderBy('company_name');
            }
        }

        $providers = $query->paginate(10);
        return ProviderResource::collection($providers);
    }
}