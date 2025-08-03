<?php

use App\Models\Category;
use App\Models\Product;

beforeEach(function () {
    // Create test data
    $this->category = Category::factory()->create([
        'name' => 'Running Shoes',
        'slug' => 'running-shoes',
    ]);
    
    $this->products = Product::factory()
        ->count(5)
        ->for($this->category)
        ->create();
});

test('home page displays shoe products', function () {
    // Create featured products
    Product::factory()
        ->count(3)
        ->featured()
        ->for($this->category)
        ->create();

    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('welcome')
            ->has('featuredProducts')
            ->has('latestProducts')
            ->has('categories')
    );
});

test('products listing page works', function () {
    $response = $this->get('/products');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('products/index')
            ->has('products.data', 5)
            ->has('categories')
            ->has('brands')
            ->has('colors')
    );
});

test('individual product page works', function () {
    $product = $this->products->first();
    
    $response = $this->get("/products/{$product->slug}");

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('products/show')
            ->where('product.id', $product->id)
            ->has('relatedProducts')
    );
});

test('shoe search functionality works', function () {
    $product = Product::factory()
        ->for($this->category)
        ->create(['name' => 'UniqueTestShoe12345']);

    $response = $this->get('/products?search=UniqueTestShoe12345');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->has('products.data', 1)
            ->where('products.data.0.name', $product->name)
    );
});

test('category filtering works', function () {
    $response = $this->get("/products?category={$this->category->id}");

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->has('products.data', 5)
    );
});

test('brand filtering works', function () {
    $brand = $this->products->first()->brand;
    $expectedCount = $this->products->where('brand', $brand)->count();

    $response = $this->get("/products?brand={$brand}");

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->has('products.data', $expectedCount)
    );
});

test('price sorting works', function () {
    $response = $this->get('/products?sort=price&order=asc');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->has('products.data')
    );
});

test('shoe price display is correct', function () {
    $product = Product::factory()
        ->for($this->category)
        ->create([
            'price' => 100.00,
            'sale_price' => 80.00,
        ]);

    $response = $this->get("/products/{$product->slug}");

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->where('product.price', '100.00')
            ->where('product.sale_price', '80.00')
            ->where('product.is_on_sale', true)
    );
});