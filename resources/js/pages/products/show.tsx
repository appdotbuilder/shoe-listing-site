import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    sale_price: number | null;
    brand: string;
    color: string;
    sizes: string[];
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

interface Props {
    product: Product;
    relatedProducts: Product[];
    [key: string]: unknown;
}

export default function ProductShow({ product, relatedProducts }: Props) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string>('');

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size first!');
            return;
        }
        alert(`Added ${product.name} (Size: ${selectedSize}) to cart!`);
    };

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
                                href="/products"
                                className="text-gray-600 hover:text-gray-900 font-medium"
                            >
                                ← Back to Products
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="flex text-sm text-gray-600 mb-8">
                    <Link href="/" className="hover:text-gray-900">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/products" className="hover:text-gray-900">Products</Link>
                    <span className="mx-2">/</span>
                    <Link 
                        href={`/products?category=${product.category.id}`} 
                        className="hover:text-gray-900"
                    >
                        {product.category.name}
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 font-medium">{product.name}</span>
                </nav>

                {/* Product Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Product Images */}
                    <div>
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        {/* Image Thumbnails */}
                        {product.images.length > 1 && (
                            <div className="flex space-x-2">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                                            selectedImage === index 
                                                ? 'border-blue-500' 
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="mb-4">
                            <Badge variant="secondary" className="mb-2">
                                {product.category.name}
                            </Badge>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {product.name}
                            </h1>
                            <p className="text-lg text-gray-600 mb-4">by {product.brand}</p>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <div className="flex items-center space-x-3">
                                <span className="text-3xl font-bold text-gray-900">
                                    ${product.display_price}
                                </span>
                                {product.is_on_sale && (
                                    <>
                                        <span className="text-xl text-gray-500 line-through">
                                            ${product.price}
                                        </span>
                                        <Badge variant="destructive">
                                            Save ${(product.price - product.display_price).toFixed(2)}
                                        </Badge>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Product Details */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Details</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium text-gray-700">Brand:</span>
                                    <span className="ml-2 text-gray-600">{product.brand}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Color:</span>
                                    <span className="ml-2 text-gray-600">{product.color}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Category:</span>
                                    <span className="ml-2 text-gray-600">{product.category.name}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Stock:</span>
                                    <span className={`ml-2 font-medium ${
                                        product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {product.stock_quantity > 0 
                                            ? `${product.stock_quantity} available` 
                                            : 'Out of stock'
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Size</h3>
                            <div className="grid grid-cols-6 gap-2">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`py-2 px-3 text-sm font-medium rounded-lg border transition-colors ${
                                            selectedSize === size
                                                ? 'border-blue-500 bg-blue-50 text-blue-600'
                                                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <div className="mb-6">
                            <Button
                                onClick={handleAddToCart}
                                disabled={product.stock_quantity === 0}
                                size="lg"
                                className="w-full mb-3"
                            >
                                {product.stock_quantity > 0 ? (
                                    <>🛒 Add to Cart</>
                                ) : (
                                    <>😔 Out of Stock</>
                                )}
                            </Button>
                            <Button variant="outline" size="lg" className="w-full">
                                ❤️ Add to Wishlist
                            </Button>
                        </div>

                        {/* Features */}
                        <div className="border-t pt-6">
                            <div className="grid grid-cols-1 gap-3 text-sm">
                                <div className="flex items-center space-x-2">
                                    <span>🚚</span>
                                    <span className="text-gray-600">Free shipping on orders over $75</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span>↩️</span>
                                    <span className="text-gray-600">30-day return policy</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span>🔒</span>
                                    <span className="text-gray-600">Secure checkout</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span>📞</span>
                                    <span className="text-gray-600">24/7 customer support</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            🔗 Related Products
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    <Link href={`/products/${relatedProduct.slug}`}>
                                        <div className="aspect-square bg-gray-100 relative">
                                            <img
                                                src={relatedProduct.images[0]}
                                                alt={relatedProduct.name}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                                            />
                                            {relatedProduct.is_on_sale && (
                                                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                                    Sale
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                    <div className="p-4">
                                        <Link href={`/products/${relatedProduct.slug}`}>
                                            <h3 className="font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
                                                {relatedProduct.name}
                                            </h3>
                                        </Link>
                                        <p className="text-sm text-gray-600 mb-2">{relatedProduct.category.name}</p>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-lg font-bold text-gray-900">
                                                    ${relatedProduct.display_price}
                                                </span>
                                                {relatedProduct.is_on_sale && (
                                                    <span className="text-sm text-gray-500 line-through ml-2">
                                                        ${relatedProduct.price}
                                                    </span>
                                                )}
                                            </div>
                                            <Link href={`/products/${relatedProduct.slug}`}>
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
                )}
            </div>
        </div>
    );
}