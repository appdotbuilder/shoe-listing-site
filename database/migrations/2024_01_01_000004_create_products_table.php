<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Product name');
            $table->string('slug')->unique()->comment('URL-friendly product identifier');
            $table->text('description')->comment('Product description');
            $table->decimal('price', 10, 2)->comment('Product price');
            $table->decimal('sale_price', 10, 2)->nullable()->comment('Sale price if on discount');
            $table->string('brand')->comment('Product brand');
            $table->string('color')->comment('Product color');
            $table->json('sizes')->comment('Available sizes as JSON array');
            $table->json('images')->comment('Product images as JSON array');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->boolean('is_featured')->default(false)->comment('Whether product is featured');
            $table->boolean('is_active')->default(true)->comment('Whether product is active');
            $table->integer('stock_quantity')->default(0)->comment('Available stock quantity');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('name');
            $table->index('brand');
            $table->index('color');
            $table->index('price');
            $table->index('category_id');
            $table->index('is_featured');
            $table->index('is_active');
            $table->index(['is_active', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};