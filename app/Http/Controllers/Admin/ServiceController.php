<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        $services = Service::with('category')
            ->orderBy('sort_order')
            ->get();

        $categories = Category::where('is_active', true)
            ->orderBy('sort_order')
            ->get(['id', 'name']);

        return Inertia::render('admin/services/index', [
            'services' => $services,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'short_description' => 'required|string|max:500',
            'long_description' => 'nullable|string',
            'price' => 'nullable|integer|min:0',
            'category_id' => 'nullable|exists:categories,id',
            'sort_order' => 'integer|min:0',
        ]);

        Service::create($validated);

        return back();
    }

    public function update(Request $request, Service $service): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'short_description' => 'required|string|max:500',
            'long_description' => 'nullable|string',
            'price' => 'nullable|integer|min:0',
            'category_id' => 'nullable|exists:categories,id',
            'sort_order' => 'integer|min:0',
        ]);

        $service->update($validated);

        return back();
    }

    public function destroy(Service $service): RedirectResponse
    {
        $service->delete();

        return back();
    }

    public function toggle(Service $service): RedirectResponse
    {
        $service->update(['is_active' => ! $service->is_active]);

        return back();
    }
}
