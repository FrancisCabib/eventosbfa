<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CatalogController extends Controller
{
    public function index(): JsonResponse
    {
        $categories = Category::where('is_active', true)
            ->with(['services' => function ($query) {
                $query->where('is_active', true)->orderBy('sort_order');
            }])
            ->orderBy('sort_order')
            ->get(['id', 'name', 'slug', 'sort_order']);

        return response()->json([
            'categories' => $categories,
            'whatsapp_number' => config('app.whatsapp_number', '56953111533'),
        ]);
    }
}
