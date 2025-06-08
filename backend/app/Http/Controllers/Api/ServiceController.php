<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'provider']);
    }

    // Liste des services du prestataire connecté
    public function index(Request $request)
    {
        $services = Service::where('provider_id', $request->user()->provider->id)->get();
        return ServiceResource::collection($services);
    }

    // Ajout d'un service
    public function store(StoreServiceRequest $request)
    {
        $data = $request->validated();
        $data['provider_id'] = $request->user()->provider->id;
        $service = Service::create($data);
        return new ServiceResource($service);
    }

    // Détail d'un service
    public function show(Service $service, Request $request)
    {
        if ($service->provider_id !== $request->user()->provider->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }
        return new ServiceResource($service);
    }

    // Modification d'un service
    public function update(UpdateServiceRequest $request, Service $service)
    {
        if ($service->provider_id !== $request->user()->provider->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }
        $service->update($request->validated());
        return new ServiceResource($service);
    }

    // Suppression d'un service
    public function destroy(Service $service, Request $request)
    {
        if ($service->provider_id !== $request->user()->provider->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }
        $service->delete();
        return response()->json(['message' => 'Service supprimé.']);
    }
}