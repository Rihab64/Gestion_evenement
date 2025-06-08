<?php

namespace App\Services;

use App\Models\User;
use App\Models\Request;

class NotificationService
{
    public function notifyClient(User $client, string $message)
    {
        // Exemple : notification Laravel, email, etc.
        // $client->notify(new CustomNotification($message));
    }

    public function notifyProviderRequestStatus(Request $request, string $status)
    {
        // Exemple : notification Laravel, email, etc.
        // $request->provider->user->notify(new RequestStatusNotification($status));
    }
}