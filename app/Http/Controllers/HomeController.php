<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page with featured products and categories.
     */
    public function index()
    {
        // Get featured products
        $featuredProducts = Product::with('category')
            ->active()
            ->featured()
            ->limit(8)
            ->get();

        // Get latest products
        $latestProducts = Product::with('category')
            ->active()
            ->latest()
            ->limit(8)
            ->get();

        // Get all categories
        $categories = Category::withCount(['products' => function ($query) {
            $query->active();
        }])->get();

        return Inertia::render('welcome', [
            'featuredProducts' => $featuredProducts,
            'latestProducts' => $latestProducts,
            'categories' => $categories,
        ]);
    }
}