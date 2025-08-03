<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create categories first
        $categories = [
            [
                'name' => 'Running Shoes',
                'slug' => 'running-shoes',
                'description' => 'High-performance athletic footwear designed for running and jogging.',
            ],
            [
                'name' => 'Casual Sneakers',
                'slug' => 'casual-sneakers',
                'description' => 'Comfortable everyday shoes perfect for casual wear and lifestyle activities.',
            ],
            [
                'name' => 'Dress Shoes',
                'slug' => 'dress-shoes',
                'description' => 'Elegant formal footwear suitable for business and special occasions.',
            ],
            [
                'name' => 'Boots',
                'slug' => 'boots',
                'description' => 'Sturdy and durable footwear for various weather conditions and outdoor activities.',
            ],
            [
                'name' => 'Sandals',
                'slug' => 'sandals',
                'description' => 'Open-toe footwear perfect for warm weather and casual occasions.',
            ],
            [
                'name' => 'High Heels',
                'slug' => 'high-heels',
                'description' => 'Stylish elevated footwear for formal events and fashion statements.',
            ],
        ];

        foreach ($categories as $categoryData) {
            $category = Category::create($categoryData);
            
            // Create 8-12 products for each category
            Product::factory()
                ->count(random_int(8, 12))
                ->for($category)
                ->create();
        }

        // Create some featured products
        Product::factory()
            ->count(6)
            ->featured()
            ->for(Category::inRandomOrder()->first())
            ->create();

        // Create a test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}