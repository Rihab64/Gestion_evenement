<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
   public function run()
{
    \App\Models\Event::factory()->count(10)->create(); // Si tu as une factory

    // Ou manuellement
    \App\Models\Event::create([
    'client_id' => 1,
    'category_id' => 1,
    'name' => 'Mariage de test',
    'description' => 'Un bel événement de mariage.',
    'event_date' => now()->addMonth(),
    'event_time' => '14:00:00', // <-- Ajoute ce champ
    'location' => 'Paris',
     'address' => '123 rue de Paris, 75000 Paris',
     'guest_count' => 100,
    'budget' => 5000,
    'status' => 'confirmed',
]);
}
}
