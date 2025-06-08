<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
{
    \App\Models\User::factory()->count(5)->create(); // Utilise la factory si elle existe

    // Ou manuellement
    \App\Models\User::create([
        'name' => 'Client Test',
        'email' => 'client@test.com',
        'password' => bcrypt('password'),
        'user_type' => 'client',
        'status' => 'active',
    ]);
}
}
