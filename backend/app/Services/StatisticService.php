<?php

namespace App\Services;

use App\Models\User;
use App\Models\Event;
use App\Models\Service;

class StatisticService
{
    public function countEventsForClient(User $user): int
    {
        return $user->client ? $user->client->events()->count() : 0;
    }

    public function totalRevenueForProvider(User $user): float
    {
        return $user->provider
            ? $user->provider->services()->sum('base_price')
            : 0;
    }

    public function averageRatingForProvider(User $user): float
    {
        return $user->provider
            ? $user->provider->reviews()->avg('rating')
            : 0;
    }
}