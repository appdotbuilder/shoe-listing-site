import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

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
    stock_quantity: number;
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Pagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    data: Product[];
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    products: Pagination;
    categories: Category[];
    brands: string[];
    colors: string[];
    filters: {
        search?: string;
        category?: string;
        brand?: string;
        color?: string;
        min_price?: string;
        max_price?: string;
        sort?: string;
        order?: string;
    };
    [key: string]: unknown;
}

export default function ProductsIndex({ products, categories, brands, colors, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [showFilters, setShowFilters] = useState(false);

    const applyFilters = (newFilters: Record<string, string | undefined>) => {
        const params = new URLSearchParams();
        
        Object.entries({ ...filters, ...newFilters }).forEach(([key, value]) => {
            if (value && value !== '') {
                params.set(key, value);
            }
        });

        router.get('/products', Object.fromEntries(params), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters({ search: searchTerm });
    };

    const clearFilters = () => {
        setSearchTerm('');
        router.get('/products');
    };

    const activeFiltersCount = Object.values(filters).filter(Boolean).length;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="text-2xl">👟</div>
                            <h1 className="text-2xl font-bold text-gray-900">SoleStore</h1>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 font-medium"
                            >
                                ← Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        🛍️ All Products
                    </h1>
                    <p className="text-gray-600">
                        Discover our complete collection of premium footwear
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="mb-4">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <Input
                                    type="text"
                                    placeholder="🔍 Search products, brands, or colors..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                            <Button type="submit">
                                Search
                            </Button>
                        </div>
                    </form>

                    {/* Filter Toggle */}
                    <div className="flex justify-between items-center mb-4">
                        <Button
                            variant="outline"
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2"
                        >
                            🎛️ Filters
                            {activeFiltersCount > 0 && (
                                <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                                    {activeFiltersCount}
                                </span>
                            )}
                        </Button>
                        
                        {activeFiltersCount > 0 && (
                            <Button variant="ghost" onClick={clearFilters}>
                                Clear All Filters
                            </Button>
                        )}
                    </div>

                    {/* Filters */}
                    {showFilters && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
                            {/* Category Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <Select
                                    value={filters.category || ''}
                                    onValueChange={(value) => applyFilters({ category: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Categories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All Categories</SelectItem>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Brand Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Brand
                                </label>
                                <Select
                                    value={filters.brand || ''}
                                    onValueChange={(value) => applyFilters({ brand: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Brands" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All Brands</SelectItem>
                                        {brands.map((brand) => (
                                            <SelectItem key={brand} value={brand}>
                                                {brand}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Color Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Color
                                </label>
                                <Select
                                    value={filters.color || ''}
                                    onValueChange={(value) => applyFilters({ color: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Colors" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All Colors</SelectItem>
                                        {colors.map((color) => (
                                            <SelectItem key={color} value={color}>
                                                {color}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Price Range */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Min Price
                                </label>
                                <Input
                                    type="number"
                                    placeholder="$0"
                                    value={filters.min_price || ''}
                                    onChange={(e) => applyFilters({ min_price: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Max Price
                                </label>
                                <Input
                                    type="number"
                                    placeholder="$500"
                                    value={filters.max_price || ''}
                                    onChange={(e) => applyFilters({ max_price: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    {/* Sort Options */}
                    <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-gray-600">
                            Showing {products.data.length} of {products.total} products
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Sort by:</span>
                            <Select
                                value={`${filters.sort || 'created_at'}_${filters.order || 'desc'}`}
                                onValueChange={(value) => {
                                    const [sort, order] = value.split('_');
                                    applyFilters({ sort, order });
                                }}
                            >
                                <SelectTrigger className="w-48">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="created_at_desc">Newest First</SelectItem>
                                    <SelectItem value="created_at_asc">Oldest First</SelectItem>
                                    <SelectItem value="price_asc">Price: Low to High</SelectItem>
                                    <SelectItem value="price_desc">Price: High to Low</SelectItem>
                                    <SelectItem value="name_asc">Name: A to Z</SelectItem>
                                    <SelectItem value="name_desc">Name: Z to A</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {products.data.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        {products.data.map((product) => (
                            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <Link href={`/products/${product.slug}`}>
                                    <div className="aspect-square bg-gray-100 relative">
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                                        />
                                        {product.is_on_sale && (
                                            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                                Sale
                                            </div>
                                        )}
                                        {product.stock_quantity === 0 && (
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                <span className="text-white font-semibold">Out of Stock</span>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                                <div className="p-4">
                                    <Link href={`/products/${product.slug}`}>
                                        <h3 className="font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
                                            {product.name}
                                        </h3>
                                    </Link>
                                    <p className="text-sm text-gray-600 mb-1">{product.category.name}</p>
                                    <p className="text-sm text-gray-500 mb-2">{product.color}</p>
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
                                        <div className="text-xs text-gray-500">
                                            {product.stock_quantity > 0 ? (
                                                `${product.stock_quantity} in stock`
                                            ) : (
                                                'Out of stock'
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-4xl mb-4">😔</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-600 mb-4">
                            Try adjusting your search criteria or clearing filters
                        </p>
                        <Button onClick={clearFilters}>
                            Clear All Filters
                        </Button>
                    </div>
                )}

                {/* Pagination */}
                {products.last_page > 1 && (
                    <div className="flex justify-center items-center space-x-2">
                        {products.links.map((link, index) => (
                            <div key={index}>
                                {link.url ? (
                                    <Link
                                        href={link.url}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            link.active
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-50 border'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        className="px-3 py-2 rounded-md text-sm font-medium text-gray-400 cursor-not-allowed"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}