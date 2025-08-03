<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Product>
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $brands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance', 'Converse', 'Vans', 'ASICS'];
        $colors = ['Black', 'White', 'Blue', 'Red', 'Gray', 'Brown', 'Navy', 'Green'];
        $sizes = [
            ['6', '7', '8', '9', '10', '11'],
            ['5.5', '6.5', '7.5', '8.5', '9.5', '10.5'],
            ['UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
        ];

        $productNames = [
            'Air Max Runner',
            'Classic Comfort',
            'Urban Walker',
            'Sport Elite',
            'Street Style',
            'Performance Pro',
            'Casual Flex',
            'Dynamic Motion',
            'Premium Leather',
            'Lifestyle Essential',
        ];

        $name = $this->faker->randomElement($productNames);
        $brand = $this->faker->randomElement($brands);
        $fullName = $brand . ' ' . $name;
        
        $price = $this->faker->randomFloat(2, 49.99, 299.99);
        $salePrice = $this->faker->boolean(30) ? $this->faker->randomFloat(2, 29.99, $price - 10) : null;

        return [
            'name' => $fullName,
            'slug' => Str::slug($fullName . '-' . $this->faker->unique()->randomNumber(4)),
            'description' => $this->faker->paragraph(3),
            'price' => $price,
            'sale_price' => $salePrice,
            'brand' => $brand,
            'color' => $this->faker->randomElement($colors),
            'sizes' => $this->faker->randomElement($sizes),
            'images' => [
                'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
                'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400',
                'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400',
            ],
            'category_id' => Category::factory(),
            'is_featured' => $this->faker->boolean(20),
            'is_active' => true,
            'stock_quantity' => $this->faker->numberBetween(0, 50),
        ];
    }

    /**
     * Indicate that the product is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }

    /**
     * Indicate that the product is on sale.
     */
    public function onSale(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'sale_price' => $this->faker->randomFloat(2, 29.99, $attributes['price'] - 10),
            ];
        });
    }
}