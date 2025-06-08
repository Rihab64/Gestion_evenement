<?php

namespace App\Services;

use App\Models\Request;
use App\Services\NotificationService;

class RequestService
{
    public function accept(Request $request)
    {
        $request->status = 'accepted';
        $request->save();
        app(NotificationService::class)->notifyProviderRequestStatus($request, 'accepted');
    }

    public function reject(Request $request)
    {
        $request->status = 'rejected';
        $request->save();
        app(NotificationService::class)->notifyProviderRequestStatus($request, 'rejected');
    }

    public function notifyClient(Request $request, string $message)
    {
        app(NotificationService::class)->notifyClient($request->client, $message);
    }
}