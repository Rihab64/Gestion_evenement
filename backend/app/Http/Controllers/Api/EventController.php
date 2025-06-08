<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'client']);
    }

    // Liste des événements du client connecté
    public function index(Request $request)
    {
        $events = Event::where('client_id', $request->user()->client->id)->get();
        return EventResource::collection($events);
    }

    // Création d'un nouvel événement
    public function store(StoreEventRequest $request)
    {
        $data = $request->validated();
        $data['client_id'] = $request->user()->client->id;
        $event = Event::create($data);
        return new EventResource($event);
    }

    // Détail d'un événement
    public function show(Event $event, Request $request)
    {
        if ($event->client_id !== $request->user()->client->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }
        return new EventResource($event);
    }

    // Modification d'un événement
    public function update(UpdateEventRequest $request, Event $event)
    {
        if ($event->client_id !== $request->user()->client->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }
        $event->update($request->validated());
        return new EventResource($event);
    }

    // Suppression (soft delete)
    public function destroy(Event $event, Request $request)
    {
        if ($event->client_id !== $request->user()->client->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }
        $event->delete();
        return response()->json(['message' => 'Événement supprimé.']);
    }
}