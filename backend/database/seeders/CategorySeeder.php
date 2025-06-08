<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {   
      DB::table('events')->delete();      // Supprime d'abord les événements
DB::table('categories')->delete();  // Puis supprime les catégories
        $categories = [
            ['name' => 'Mariage', 'slug' => Str::slug('Mariage'), 'description' => 'Organisation de mariages', 'icon' => 'wedding', 'is_active' => true],
            ['name' => 'Anniversaire', 'slug' => Str::slug('Anniversaire'), 'description' => 'Fêtes d\'anniversaire', 'icon' => 'birthday', 'is_active' => true],
            ['name' => 'Entreprise', 'slug' => Str::slug('Entreprise'), 'description' => 'Événements d\'entreprise', 'icon' => 'business', 'is_active' => true],
            ['name' => 'Baptême', 'slug' => Str::slug('Baptême'), 'description' => 'Cérémonies de baptême', 'icon' => 'baptism', 'is_active' => true],
            ['name' => 'Soirée privée', 'slug' => Str::slug('Soirée privée'), 'description' => 'Soirées privées', 'icon' => 'party', 'is_active' => true],
        ];

        DB::table('categories')->insert($categories);
    }
}