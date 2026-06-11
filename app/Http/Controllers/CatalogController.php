<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    public function index(): Response
    {
        $services = Service::where('is_active', true)
            ->orderBy('sort_order')
            ->get(['id', 'title', 'subtitle', 'short_description', 'long_description', 'price', 'image_path']);

        return Inertia::render('catalog/index', [
            'services' => $services,
            'whatsappNumber' => config('app.whatsapp_number', '56953111533'),
        ]);
    }
}
