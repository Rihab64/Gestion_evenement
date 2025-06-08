<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRequestRequest;
use App\Http\Requests\UpdateRequestRequest;
use App\Http\Resources\RequestResource;
use App\Models\Request as ServiceRequest;
use Illuminate\Http\Request;

class RequestController extends Controller
{
    // store() : client envoie une demande
    public function store(StoreRequestRequest $request)
    {
        $data = $request->validated();
        $data['client_id'] = $request->user()->client->id;
        $serviceRequest = ServiceRequest::create($data);
        return new RequestResource($serviceRequest);
    }

    // index() : liste des demandes (côté prestataire)
    public function index(Request $request)
    {
        $requests = ServiceRequest::where('provider_id', $request->user()->provider->id)->get();
        return RequestResource::collection($requests);
    }

    // show() : détail d'une demande
    public function show(ServiceRequest $requestModel, Request $request)
    {
        // Vérifie si le prestataire est bien le destinataire
        if ($requestModel->provider_id !== $request->user()->provider->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }
        return new RequestResource($requestModel);
    }

    // update() : prestataire répond à la demande
    public function update(UpdateRequestRequest $request, ServiceRequest $requestModel)
    {
        if ($requestModel->provider_id !== $request->user()->provider->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }
        $requestModel->update($request->validated());
        return new RequestResource($requestModel);
    }

    // accept() : accepter une demande
    public function accept(ServiceRequest $requestModel, Request $request)
    {
        if ($requestModel->provider_id !== $request->user()->provider->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }
        $requestModel->status = 'accepted';
        $requestModel->save();
        return new RequestResource($requestModel);
    }

    // reject() : refuser une demande
    public function reject(ServiceRequest $requestModel, Request $request)
    {
        if ($requestModel->provider_id !== $request->user()->provider->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }
        $requestModel->status = 'rejected';
        $requestModel->save();
        return new RequestResource($requestModel);
    }
}