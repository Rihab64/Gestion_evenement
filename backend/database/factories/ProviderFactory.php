<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Provider>
 */
class ProviderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
{
    return [
        'user_id' => \App\Models\User::factory(),
        'company_name' => $this->faker->company,
        'business_type' => $this->faker->word,
        'description' => $this->faker->sentence, 
         'address' => $this->faker->address, 
        'phone' => $this->faker->phoneNumber,
        'status' => 'approved',
    ];
}
}
