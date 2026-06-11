<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CatalogSeeder extends Seeder
{
    public function run(): void
    {
        $category = Category::firstOrCreate(
            ['slug' => 'maquinas-eventos'],
            [
                'name' => 'Máquinas para Eventos',
                'slug' => 'maquinas-eventos',
                'sort_order' => 0,
                'is_active' => true,
            ]
        );

        $services = [
            [
                'title' => 'Máquina de Algodón de Azúcar',
                'subtitle' => 'El clásico favorito de los niños',
                'short_description' => 'Algodón de azúcar esponjoso y colorido para tus eventos.',
                'long_description' => 'Delicioso algodón de azúcar preparado al momento. Disponible en múltiples colores y sabores a elección. Ideal para cumpleaños, fiestas infantiles y eventos familiares.',
                'price' => null,
                'sort_order' => 1,
            ],
            [
                'title' => 'Máquina de Palomitas',
                'subtitle' => 'El sabor y olor clásico de siempre',
                'short_description' => 'Palomitas crujientes recién hechas en su olla clásica.',
                'long_description' => 'Palomitas de maíz preparadas al instante con el aroma irresistible que encanta a chicos y grandes. Perfectas para cine, eventos y celebraciones.',
                'price' => null,
                'sort_order' => 2,
            ],
            [
                'title' => 'Máquina de Granizado',
                'subtitle' => 'Refrescante en todos los sabores',
                'short_description' => 'Granizados fríos y refrescantes en múltiples sabores.',
                'long_description' => 'Granizados elaborados al momento con sabores a escoger. La opción perfecta para días calurosos y eventos al aire libre.',
                'price' => null,
                'sort_order' => 3,
            ],
            [
                'title' => 'Máquina de Helados Soft',
                'subtitle' => 'Suave y cremoso, ideal para el calor',
                'short_description' => 'Helado soft cremoso servido en cono clásico.',
                'long_description' => 'Helado de textura suave y cremosa, servido en cono o vaso. Disponible en vainilla, chocolate y sabor mixto. El favorito de niños y adultos.',
                'price' => null,
                'sort_order' => 4,
            ],
            [
                'title' => 'Máquina de Hot Dogs',
                'subtitle' => 'Rápidos, sabrosos y siempre populares',
                'short_description' => 'Hot dogs calientes listos para servir en tu evento.',
                'long_description' => 'Hot dogs preparados a la brasa, rápidos y deliciosos. Una opción infaltable en fiestas y eventos. Se pueden acompañar con salsas a elección.',
                'price' => null,
                'sort_order' => 5,
            ],
            [
                'title' => 'Máquina de Papas Fritas',
                'subtitle' => 'Crujientes y servidas al momento',
                'short_description' => 'Papas fritas crocantes preparadas en el momento.',
                'long_description' => 'Papas fritas preparadas al instante, crujientes por fuera y suaves por dentro. Servidas calientes directamente a los asistentes de tu evento.',
                'price' => null,
                'sort_order' => 6,
            ],
        ];

        foreach ($services as $data) {
            Service::firstOrCreate(
                ['title' => $data['title']],
                array_merge($data, [
                    'category_id' => $category->id,
                    'is_active' => true,
                    'image_path' => null,
                ])
            );
        }
    }
}
