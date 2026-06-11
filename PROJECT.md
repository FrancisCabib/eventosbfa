# Carmen Saa Eventos — Catálogo y Cotizador

> Plataforma web para que los clientes de Carmen Saa puedan ver el catálogo de máquinas para arriendo y cotizar directamente por WhatsApp.

---

## Contexto del negocio

**Carmen Saa Eventos** es un negocio de arriendo de máquinas para fiestas y eventos infantiles ubicado en Coquimbo, Chile. Su oferta inicial son 6 máquinas:

| # | Servicio                         | Emoji |
|---|----------------------------------|-------|
| 1 | Máquina de Algodón de Azúcar     | 🍭    |
| 2 | Máquina de Palomitas             | 🍿    |
| 3 | Máquina de Granizado             | 🧊    |
| 4 | Máquina de Helados Soft          | 🍦    |
| 5 | Máquina de Hot Dogs              | 🌭    |
| 6 | Máquina de Papas Fritas          | 🍟    |

**Objetivo del proyecto:** que un cliente potencial pueda visitar el catálogo, seleccionar una o varias máquinas y enviar una solicitud de cotización por WhatsApp al teléfono `+56953111533` con el detalle ya armado.

El proyecto se construyó tomando como referencia "Floreria Mi Jardín" (otro proyecto del mismo dueño) replicando su patrón de arquitectura desacoplada y su flujo de pedido individual / múltiple por WhatsApp.

---

## Arquitectura

Arquitectura **desacoplada** con backend y frontend separados:

```
eventos-carmen-saa/                 ← raíz del proyecto (Laravel)
│
├── [Backend Laravel]               ← API JSON + Panel Admin (Inertia + React)
│   ├── app/                        Modelos, Controladores
│   ├── routes/                     web.php, api.php, settings.php
│   ├── database/                   Migraciones, Seeders, SQLite
│   ├── resources/js/               Admin panel (Inertia + React + shadcn)
│   ├── config/                     CORS, Inertia, etc.
│   └── ...                         (resto Laravel estándar)
│
└── catalog-front/                  ← Frontend público (Vite + React + GSAP)
    ├── src/
    │   ├── App.tsx                 Punto de entrada, fetch al API
    │   ├── components/
    │   │   ├── Hero.tsx            Cartel de feria
    │   │   ├── Marquee.tsx         Ticker scrolling
    │   │   ├── PartyBackground.tsx Confeti + estrellas + grano
    │   │   ├── ServiceCard.tsx     Tarjetas tipo ticket de rifa
    │   │   ├── ServicesGrid.tsx    Grid + animaciones scroll
    │   │   ├── OrderFab.tsx        Botón flotante con badge
    │   │   ├── OrderDrawer.tsx     Drawer lateral con carrito + form
    │   │   └── decorations/        SVG ornamentos (estrellas, etc.)
    │   ├── lib/
    │   │   └── cart.ts             localStorage + WhatsApp helpers
    │   └── index.css               Tailwind v4 + tema custom
    └── .env                        VITE_API_URL, VITE_WHATSAPP_NUMBER
```

**Comunicación:**
- El frontend hace `fetch` a `http://eventos-carmen-saa.test/api/catalog` (Laravel)
- Laravel responde JSON con servicios + categorías activas
- CORS configurado en `config/cors.php` (permite `*` en local, ajustar para producción)

---

## Stack técnico

### Backend
- **PHP 8.3+ / Laravel 13**
- **Inertia.js + React 19 + TypeScript** (panel admin SSR)
- **Tailwind CSS v4** + **shadcn/ui** (componentes)
- **SQLite** (base de datos local, archivo único)
- **Laravel Fortify + Sanctum** (auth + 2FA)
- **Laravel Wayfinder** (genera tipos TypeScript desde rutas PHP)
- **Vite 8** + Laravel Vite Plugin

### Frontend público
- **Vite 8 + React 19 + TypeScript**
- **GSAP + @gsap/react** (animaciones, ScrollTrigger)
- **Tailwind CSS v4** (con `@theme` directive y CSS variables)
- **Google Fonts:** Fraunces (variable serif display) + Bricolage Grotesque (variable sans)
- Sin librerías de UI — todo custom para sostener la identidad visual

### Entorno local
- **Laravel Herd** maneja el dominio `.test` automáticamente:
  - Backend: `http://eventos-carmen-saa.test`
  - No requiere editar `hosts` ni levantar `php artisan serve`
- Frontend Vite dev server: `http://localhost:5173`

---

## Backend en detalle

### Base de datos

Migraciones (en `database/migrations/`):

```
0001_01_01_000000_create_users_table.php
0001_01_01_000001_create_cache_table.php
0001_01_01_000002_create_jobs_table.php
2025_03_12_000001_create_tags_table.php
2025_03_12_000002_create_services_table.php
2025_03_12_000003_create_service_tag_table.php
2025_08_14_170933_add_two_factor_columns_to_users_table.php
2026_03_16_000005_create_categories_table.php
2026_03_16_000006_add_category_id_to_services_table.php
2026_03_16_000007_add_sort_and_status_to_categories_table.php
2026_03_16_000008_create_catalog_sections_table.php
2026_03_16_000009_create_catalog_section_category_table.php
2026_03_16_000010_create_catalog_section_service_table.php
2026_03_16_000011_drop_legacy_category_from_services_table.php
2026_03_16_000012_drop_catalog_section_service_table.php
```

Tablas principales en uso para el catálogo:
- `services` — title, subtitle, short_description, long_description, price, image_path, is_active, sort_order, category_id
- `categories` — name, slug, sort_order, is_active
- `catalog_sections` y `catalog_section_category` — agrupación opcional por secciones (no usadas aún)

**Seeder:** `database/seeders/CatalogSeeder.php` — crea la categoría "Máquinas para Eventos" y las 6 máquinas iniciales (sin precio, "por cotizar").

```bash
php artisan migrate
php artisan db:seed --class=CatalogSeeder
```

### Modelos Eloquent

`app/Models/`:
- `Service.php` — relación `belongsTo(Category::class)`
- `Category.php` — relación `hasMany(Service::class)`
- `User.php` — auth con Fortify

### Rutas

**`routes/api.php`** (público, JSON):
```
GET  /api/catalog          → Api\CatalogController@index
```

**`routes/web.php`** (admin, requiere auth):
```
GET  /                                          → redirect a login/dashboard
GET  /dashboard                                 → Inertia dashboard
GET  /admin/services                            → Admin\ServiceController@index
POST /admin/services                            → store
PUT  /admin/services/{service}                  → update
DELETE /admin/services/{service}                → destroy
PATCH /admin/services/{service}/toggle          → toggle is_active
GET  /admin/categories                          → Admin\CategoryController@index
POST /admin/categories                          → store
PUT  /admin/categories/{category}               → update
DELETE /admin/categories/{category}             → destroy
PATCH /admin/categories/{category}/toggle       → toggle is_active
```

`routes/settings.php` agrega rutas de Fortify (login, register, 2FA, profile, etc.).

### API pública

**`GET /api/catalog`** devuelve:
```json
{
  "categories": [
    {
      "id": 2,
      "name": "Máquinas para Eventos",
      "slug": "maquinas-eventos",
      "sort_order": 0,
      "services": [
        {
          "id": 1,
          "title": "Máquina de Algodón de Azúcar",
          "subtitle": "El clásico favorito de los niños",
          "short_description": "...",
          "long_description": "...",
          "price": null,
          "is_active": 1,
          "sort_order": 1,
          "image_path": null
        }
        // ...
      ]
    }
  ],
  "whatsapp_number": "56953111533"
}
```

### Panel admin

Páginas en `resources/js/pages/admin/`:
- `services/index.tsx` — tabla con título, categoría, precio, orden, estado activo y acciones (crear/editar/eliminar via modal)
- `categories/index.tsx` — tabla similar para categorías

El sidebar (`resources/js/components/app-sidebar.tsx`) tiene tres entradas:
- Dashboard
- Servicios → `/admin/services`
- Categorías → `/admin/categories`

### Configuración relevante

**`.env`** (raíz del proyecto):
```env
APP_URL=http://eventos-carmen-saa.test
DB_CONNECTION=sqlite
CORS_ALLOWED_ORIGINS=*
```

**`config/cors.php`**: aplica a `paths: ['api/*']` con `allowed_origins` desde el `.env`.

**`bootstrap/app.php`**: registra `routes/api.php` además de `web.php`.

### Credenciales de prueba
Usuario seedeado por `DatabaseSeeder`:
- Email: `test@example.com`
- Password: `password`

---

## Frontend público (`catalog-front/`)

### Identidad visual

**Dirección estética: "Festival Boulevard"** — cartel vintage de feria/carnaval.

- **Paleta:** cream/ivory base (`#f5ead0`) + cherry red (`#c8323c`) + sun yellow (`#f0a83a`) + vintage mint (`#3f9b8a`) + hot pink (`#e85a85`) + plum (`#5a3470`) + ink (`#1d1a2f`)
- **Tipografía:**
  - Display: **Fraunces** (variable, axes opsz/SOFT/WONK/wght/ital)
  - Body: **Bricolage Grotesque** (variable)
- **Composición:** asimétrica, tickets con notches, hard-shadows tipo poster, marquees, ornamentos vintage

### Background "fiesta" (capas)

`PartyBackground.tsx` + `index.css` componen 4 capas continuas:
1. Candy stripes diagonales sutiles (CSS gradient)
2. Grano de papel vintage (SVG turbulence)
3. 18 piezas de confeti drift desde arriba (CSS animation con drift horizontal aleatorio)
4. 14 estrellas dispersas con twinkle continuo (CSS animation)

### Componentes principales

| Archivo                             | Rol                                                                        |
|-------------------------------------|----------------------------------------------------------------------------|
| `App.tsx`                           | Estado global (cart, drawer), fetch al API, integración                    |
| `components/Hero.tsx`               | Cartel de feria con título "Carmen & Saa" + marquee abajo                  |
| `components/Marquee.tsx`            | Ticker infinito con CSS animation                                          |
| `components/PartyBackground.tsx`    | Capas decorativas globales (confeti + estrellas)                           |
| `components/ServicesGrid.tsx`       | Grid con stagger animation por scroll                                      |
| `components/ServiceCard.tsx`        | Tarjeta tipo ticket de rifa con notches, banda de color, stamp "agregado"  |
| `components/OrderFab.tsx`           | Botón flotante con badge de contador y hard-shadow                         |
| `components/OrderDrawer.tsx`        | Drawer lateral con lista, subtotal, formulario, confetti burst             |
| `components/decorations/Ornaments.tsx` | StarBurst, Sparkle, DiamondDivider, Squiggle, TicketIcon (SVG)          |
| `lib/cart.ts`                       | localStorage + builders de mensajes WhatsApp                               |

### Flujo de cotización

**Persistencia:** `localStorage` con clave `carmen_saa_order_draft`.

**Dos modos:**

1. **Pedido individual (un solo servicio):**
   - Botón verde de WhatsApp en cada card (al lado del "Agregar")
   - Abre `wa.me/56953111533?text=...` directamente con ese servicio

2. **Pedido múltiple (varios servicios):**
   - Botón "Agregar" en cada card → suma al carrito (persistente)
   - FAB "Tu pedido" aparece con animación back-out cuando hay items
   - Click → drawer lateral con lista, subtotal y formulario opcional (nombre, fecha, lugar, notas)
   - Botón verde "Enviar por WhatsApp" → confetti burst + abre WhatsApp con todo el mensaje armado

**Formato de mensajes** (`lib/cart.ts`):

Individual:
```
Hola Carmen! Me interesa este servicio para mi evento:

Servicio: Máquina de Algodón de Azúcar
Detalle: El clásico favorito de los niños

Quedo atento/a a más información. Gracias!
```

Múltiple:
```
Hola Carmen! Quisiera cotizar las siguientes máquinas para mi evento:

1. Máquina de Algodón de Azúcar
2. Máquina de Palomitas

Nombre: Juan Pérez
Fecha del evento: 2026-06-15
Lugar: La Serena
Detalles: 30 invitados, fiesta a las 16h

¡Quedo atento/a! 😊
```

### Animaciones GSAP destacadas

- **Hero:** stagger del título por palabra con rotation, "&" entrando con back-out, estrellas en rotación continua infinita
- **Cards:** entrada con scrollTrigger (stagger + leve rotación aleatoria), hover con tilt sutil (par/impar), stamp diagonal "AGREGADO" con back-out
- **FAB:** entrada bouncy back-out, badge pulse al cambiar contador
- **Drawer:** slide-in desde derecha (expo.out), items con stagger, botón send con pulse box-shadow infinito
- **Confetti burst** al enviar pedido (24 piezas DOM creadas dinámicamente y animadas con GSAP)

### Variables de entorno

`catalog-front/.env`:
```env
VITE_API_URL=http://eventos-carmen-saa.test/api/catalog
VITE_WHATSAPP_NUMBER=56953111533
```

---

## Cómo correr el proyecto en local

### Requisitos
- PHP 8.3+
- Node.js 20+
- Laravel Herd (o Valet) para el dominio `.test`
- Composer

### Backend

```bash
# Desde la raíz del proyecto (eventos-carmen-saa/)
composer install
php artisan migrate
php artisan db:seed --class=CatalogSeeder
npm install
npm run build      # Compila el admin (Inertia + React)
```

Con Herd activo, el backend queda servido en `http://eventos-carmen-saa.test`.

Para desarrollar el panel admin con HMR:
```bash
npm run dev        # Vite dev server en :5174 (puerto auto)
```

### Frontend público

```bash
cd catalog-front
npm install
npm run dev        # Vite dev server en http://localhost:5173
```

Build de producción:
```bash
npm run build
npm run preview
```

---

## Lo que se ha construido

### Backend
- [x] Modelos Eloquent: `Service`, `Category`
- [x] Seeder con las 6 máquinas iniciales
- [x] API REST pública: `GET /api/catalog`
- [x] CORS configurado vía `config/cors.php` y `.env`
- [x] Bootstrap con `routes/api.php` registrado
- [x] Panel admin completo:
  - [x] CRUD de servicios (modal de crear/editar, toggle activo, eliminar)
  - [x] CRUD de categorías (igual)
  - [x] Sidebar con navegación a Servicios/Categorías
- [x] Auth con Fortify + 2FA (heredado del starter kit)
- [x] Redirect inteligente en `/`

### Frontend público
- [x] Proyecto Vite + React + TypeScript en `catalog-front/`
- [x] Tailwind CSS v4 con tema custom (CSS vars + paleta cream/cherry/sun/mint/etc.)
- [x] Google Fonts: Fraunces + Bricolage Grotesque
- [x] Background "fiesta" con 4 capas (stripes + grano + confeti + estrellas)
- [x] Hero estilo cartel vintage con marquee infinito
- [x] 6 ServiceCards con estética de ticket (notches, banda de color, stamp "agregado")
- [x] FAB flotante con badge contador
- [x] Drawer lateral con:
  - [x] Lista numerada de items + remover individual
  - [x] Subtotal estimado (sumando solo los con precio)
  - [x] Formulario opcional (nombre, fecha, lugar, notas)
  - [x] Botón WhatsApp con pulse animation
  - [x] Confetti burst al enviar
- [x] Persistencia en localStorage (clave `carmen_saa_order_draft`)
- [x] Pedido individual desde card (botón verde de WhatsApp)
- [x] Pedido múltiple desde drawer
- [x] Animaciones GSAP en hero, cards, FAB, drawer
- [x] Footer estilo cartel con typography display
- [x] Responsive (mobile + desktop)

---

## Pendientes / próximos pasos

- [ ] Asignar precios reales a las 6 máquinas (actualmente todas "por cotizar")
- [ ] Subir imágenes reales de cada máquina (campo `image_path` está nullable, hoy se usa solo emoji)
- [ ] Sección de upload de imágenes en el admin
- [ ] Reorder drag-and-drop en el admin de servicios y categorías
- [ ] SEO: meta tags Open Graph, sitemap, favicon definitivo
- [ ] Analytics (Plausible o GA4) para medir conversión
- [ ] Deploy: Laravel a un VPS / hosting PHP, frontend a Vercel/Netlify
- [ ] Cambiar `CORS_ALLOWED_ORIGINS=*` por el dominio real en producción
- [ ] Validación frontend del formulario antes de enviar (mínimo nombre + teléfono)
- [ ] Confirmación visual antes de abrir WhatsApp (preview del mensaje)
- [ ] Posible: integración con email para fallback si no usan WhatsApp
- [ ] Posible: catálogo PDF descargable

---

## Datos de contacto del negocio

- **WhatsApp:** +56 9 5311 1533
- **Localización:** Coquimbo, Chile (configurable en footer/hero)
