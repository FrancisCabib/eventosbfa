<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('catalog_section_service');
    }

    public function down(): void
    {
        // Intentionally left empty: table originally created in prior migration.
    }
};
