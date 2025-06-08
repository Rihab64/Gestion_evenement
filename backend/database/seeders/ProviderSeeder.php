<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ProviderSeeder extends Seeder
{
    public function run()
    {
        \App\Models\Provider::factory()->count(3)->create();

        \App\Models\Provider::create([
            'user_id' => 2,
            'company_name' => 'Prestataire Exemple',
            'business_type' => 'Traiteur',
            'description' => 'Prestataire traiteur pour événements.',
            'address' => '123 rue de Paris, 75000 Paris',
            'phone' => '0600000000',
            'status' => 'approved',
        ]);
    }
}