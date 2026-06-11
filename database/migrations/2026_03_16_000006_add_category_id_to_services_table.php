<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->foreignId('category_id')
                ->nullable()
                ->after('id')
                ->constrained('categories')
                ->nullOnDelete();
        });

        $defaultCategoryName = 'General';
        $defaultCategorySlug = Str::slug($defaultCategoryName);

        $defaultCategoryId = DB::table('categories')
            ->where('slug', $defaultCategorySlug)
            ->value('id');

        if (! $defaultCategoryId) {
            $defaultCategoryId = DB::table('categories')->insertGetId([
                'name' => $defaultCategoryName,
                'slug' => $defaultCategorySlug,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $services = Schema::hasColumn('services', 'category')
            ? DB::table('services')->select('id', 'category')->get()
            : DB::table('services')->select('id')->get()->map(function ($service) use ($defaultCategoryName) {
                $service->category = $defaultCategoryName;

                return $service;
            });

        foreach ($services as $service) {
            $categoryName = trim((string) ($service->category ?? ''));
            $categoryName = $categoryName !== '' ? $categoryName : $defaultCategoryName;
            $categorySlug = Str::slug($categoryName);

            $categoryId = DB::table('categories')->where('slug', $categorySlug)->value('id');

            if (! $categoryId) {
                $categoryId = DB::table('categories')->insertGetId([
                    'name' => $categoryName,
                    'slug' => $categorySlug,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            DB::table('services')
                ->where('id', $service->id)
                ->update(['category_id' => $categoryId]);
        }
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropConstrainedForeignId('category_id');
        });
    }
};
