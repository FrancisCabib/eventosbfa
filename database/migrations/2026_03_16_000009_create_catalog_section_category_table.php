<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('catalog_section_category', function (Blueprint $table) {
            $table->id();
            $table->foreignId('catalog_section_id')
                ->constrained('catalog_sections')
                ->cascadeOnDelete();
            $table->foreignId('category_id')
                ->constrained('categories')
                ->cascadeOnDelete();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->unique(['catalog_section_id', 'category_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('catalog_section_category');
    }
};
