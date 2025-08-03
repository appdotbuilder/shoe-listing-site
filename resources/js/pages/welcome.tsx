import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    sale_price: number | null;
    brand: string;
    color: string;
    images: string[];
    category: {
        id: number;
        name: string;
        slug: string;
    };
    is_on_sale: boolean;
    display_price: number;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    products_count: number;
}

interface Props {
    featuredProducts: Product[];
    latestProducts: Product[];
    categories: Category[];
    [key: string]: unknown;
}

export default function Welcome({ featuredProducts, latestProducts, categories }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div className="text-2xl">👟</div>
                            <h1 className="text-2xl font-bold text-gray-900">SoleStore</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/products"
                                className="text-gray-600 hover:text-gray-900 font-medium"
                            >
                                Browse Products
                            </Link>
                            <Link href="/login">
                                <Button variant="outline" size="sm">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        👟 Step Into Style
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Discover the perfect pair from our curated collection of premium footwear. 
                        From athletic performance to everyday comfort, find your ideal shoes today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/products">
                            <Button size="lg" className="w-full sm:w-auto">
                                🛍️ Shop Now
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg" className="w-full sm:w-auto">
                            📱 Download App
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose SoleStore?</h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Experience the best in footwear shopping with our premium features and services
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="text-4xl mb-4">🔍</div>
                            <h4 className="text-xl font-semibold mb-2">Smart Search & Filters</h4>
                            <p className="text-gray-600">
                                Find exactly what you're looking for with our advanced search and filtering system
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="text-4xl mb-4">🏆</div>
                            <h4 className="text-xl font-semibold mb-2">Premium Brands</h4>
                            <p className="text-gray-600">
                                Shop from top brands like Nike, Adidas, Puma, and more with authentic products
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="text-4xl mb-4">🚚</div>
                            <h4 className="text-xl font-semibold mb-2">Fast Delivery</h4>
                            <p className="text-gray-600">
                                Get your shoes delivered quickly with our reliable shipping partners
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            {featuredProducts.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-3xl font-bold text-gray-900">⭐ Featured Products</h3>
                            <Link href="/products" className="text-blue-600 hover:text-blue-800 font-medium">
                                View All →
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.slice(0, 4).map((product) => (
                                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="aspect-square bg-gray-100 relative">
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                        {product.is_on_sale && (
                                            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                                Sale
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
                                        <p className="text-sm text-gray-600 mb-2">{product.category.name}</p>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-lg font-bold text-gray-900">
                                                    ${product.display_price}
                                                </span>
                                                {product.is_on_sale && (
                                                    <span className="text-sm text-gray-500 line-through ml-2">
                                                        ${product.price}
                                                    </span>
                                                )}
                                            </div>
                                            <Link href={`/products/${product.slug}`}>
                                                <Button size="sm" variant="outline">
                                                    View
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Categories */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">🗂️ Shop by Category</h3>
                        <p className="text-gray-600">
                            Browse our extensive collection organized by shoe types
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/products?category=${category.id}`}
                                className="group"
                            >
                                <div className="bg-gray-100 rounded-lg p-6 text-center hover:bg-gray-200 transition-colors">
                                    <div className="text-3xl mb-2">
                                        {category.name === 'Running Shoes' && '🏃'}
                                        {category.name === 'Casual Sneakers' && '👟'}
                                        {category.name === 'Dress Shoes' && '👔'}
                                        {category.name === 'Boots' && '🥾'}
                                        {category.name === 'Sandals' && '🩴'}
                                        {category.name === 'High Heels' && '👠'}
                                    </div>
                                    <h4 className="font-medium text-gray-900 mb-1">{category.name}</h4>
                                    <p className="text-sm text-gray-600">{category.products_count} products</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest Products */}
            {latestProducts.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-3xl font-bold text-gray-900">🆕 Latest Arrivals</h3>
                            <Link href="/products?sort=created_at&order=desc" className="text-blue-600 hover:text-blue-800 font-medium">
                                View All →
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {latestProducts.slice(0, 4).map((product) => (
                                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="aspect-square bg-gray-100 relative">
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                        {product.is_on_sale && (
                                            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                                Sale
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
                                        <p className="text-sm text-gray-600 mb-2">{product.category.name}</p>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-lg font-bold text-gray-900">
                                                    ${product.display_price}
                                                </span>
                                                {product.is_on_sale && (
                                                    <span className="text-sm text-gray-500 line-through ml-2">
                                                        ${product.price}
                                                    </span>
                                                )}
                                            </div>
                                            <Link href={`/products/${product.slug}`}>
                                                <Button size="sm" variant="outline">
                                                    View
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-16 bg-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Pair? 👟</h3>
                    <p className="text-xl mb-8 opacity-90">
                        Join thousands of satisfied customers who found their ideal shoes with us
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/products">
                            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                                🛍️ Start Shopping
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-blue-600">
                                📝 Create Account
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="text-2xl">👟</div>
                                <h4 className="text-xl font-bold">SoleStore</h4>
                            </div>
                            <p className="text-gray-400">
                                Your premier destination for quality footwear from top brands worldwide.
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold mb-4">Quick Links</h5>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/products" className="hover:text-white">All Products</Link></li>
                                <li><Link href="/products?sort=created_at" className="hover:text-white">New Arrivals</Link></li>
                                <li><Link href="/products?sale=true" className="hover:text-white">Sale Items</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-semibold mb-4">Categories</h5>
                            <ul className="space-y-2 text-gray-400">
                                {categories.slice(0, 4).map((category) => (
                                    <li key={category.id}>
                                        <Link 
                                            href={`/products?category=${category.id}`} 
                                            className="hover:text-white"
                                        >
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-semibold mb-4">Support</h5>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white">Size Guide</a></li>
                                <li><a href="#" className="hover:text-white">Returns</a></li>
                                <li><a href="#" className="hover:text-white">FAQ</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 SoleStore. All rights reserved. Made with ❤️ for shoe lovers.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}