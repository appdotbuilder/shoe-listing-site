<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Category>
     */
    protected $model = Category::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'Running Shoes' => 'High-performance athletic footwear designed for running and jogging.',
            'Casual Sneakers' => 'Comfortable everyday shoes perfect for casual wear and lifestyle activities.',
            'Dress Shoes' => 'Elegant formal footwear suitable for business and special occasions.',
            'Boots' => 'Sturdy and durable footwear for various weather conditions and outdoor activities.',
            'Sandals' => 'Open-toe footwear perfect for warm weather and casual occasions.',
            'High Heels' => 'Stylish elevated footwear for formal events and fashion statements.',
        ];

        $name = $this->faker->randomElement(array_keys($categories));
        $description = $categories[$name];

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => $description,
            'image' => null,
        ];
    }
}