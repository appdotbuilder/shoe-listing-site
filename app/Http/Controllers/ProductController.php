<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index(Request $request)
    {
        $query = Product::with('category')->active();

        // Search functionality
        if ($request->filled('search')) {
            $searchTerm = $request->get('search');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                  ->orWhere('brand', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        // Category filter
        if ($request->filled('category')) {
            $query->where('category_id', $request->get('category'));
        }

        // Brand filter
        if ($request->filled('brand')) {
            $query->where('brand', $request->get('brand'));
        }

        // Color filter
        if ($request->filled('color')) {
            $query->where('color', $request->get('color'));
        }

        // Price range filter
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->get('min_price'));
        }
        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->get('max_price'));
        }

        // Sorting
        $sortBy = $request->get('sort', 'created_at');
        $sortOrder = $request->get('order', 'desc');
        
        if ($sortBy === 'price') {
            $query->orderByRaw('COALESCE(sale_price, price) ' . $sortOrder);
        } else {
            $query->orderBy($sortBy, $sortOrder);
        }

        $products = $query->paginate(12)->withQueryString();

        // Get filter options
        $categories = Category::orderBy('name')->get();
        $brands = Product::distinct()->pluck('brand')->sort()->values();
        $colors = Product::distinct()->pluck('color')->sort()->values();

        return Inertia::render('products/index', [
            'products' => $products,
            'categories' => $categories,
            'brands' => $brands,
            'colors' => $colors,
            'filters' => $request->only(['search', 'category', 'brand', 'color', 'min_price', 'max_price', 'sort', 'order']),
        ]);
    }

    /**
     * Display the specified product.
     */
    public function show(Product $product)
    {
        $product->load('category');
        
        // Get related products from the same category
        $relatedProducts = Product::with('category')
            ->active()
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->limit(4)
            ->get();

        return Inertia::render('products/show', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]);
    }
}