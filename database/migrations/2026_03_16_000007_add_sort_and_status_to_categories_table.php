<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->unsignedInteger('sort_order')->default(0)->after('slug');
            $table->boolean('is_active')->default(true)->after('sort_order');
        });

        $categories = DB::table('categories')->select('id')->orderBy('id')->get();

        foreach ($categories as $index => $category) {
            DB::table('categories')
                ->where('id', $category->id)
                ->update(['sort_order' => $index]);
        }
    }

    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn(['sort_order', 'is_active']);
        });
    }
};
