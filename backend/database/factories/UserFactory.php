<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $fname = str_replace(' ', '', strtolower($this->faker->firstName()));
        static $id = 2;

        return [
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'avatar' => "https://api.multiavatar.com/$fname&id=" . $id++ . ".png",
            'email' => $this->faker->unique()->safeEmail(),
            'password' => bcrypt('password123'),
            'email_verified_at' => date('Y-M-d H:i:s'),
            'is_admin' => false
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }
}
