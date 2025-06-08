<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\Client;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    protected $model = Event::class;

    public function definition()
    {
        return [
            'client_id' => Client::factory(),
            'category_id' => Category::factory(),
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph,
            'event_date' => $this->faker->date(),
            'event_time' => $this->faker->time(),
            'location' => $this->faker->city,
            'address' => $this->faker->address,
            'guest_count' => $this->faker->numberBetween(10, 200),
            'budget' => $this->faker->randomFloat(2, 1000, 20000),
            'status' => 'confirmed',
            'progress' => $this->faker->numberBetween(0, 100),
        ];
    }
}