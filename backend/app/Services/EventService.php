<?php

namespace App\Services;

use App\Models\Event;

class EventService
{
    public function calculateProgress(Event $event): int
    {
        // Exemple : calcule la progression selon des critères métier
        $steps = 5;
        $done = 0;
        if ($event->name) $done++;
        if ($event->event_date) $done++;
        if ($event->location) $done++;
        if ($event->budget) $done++;
        if ($event->services()->count() > 0) $done++;
        return intval(($done / $steps) * 100);
    }

    public function updateProgress(Event $event): void
    {
        $event->progress = $this->calculateProgress($event);
        $event->save();
    }
}