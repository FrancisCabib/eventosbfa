import { Head, Link } from '@inertiajs/react'
import { ArrowRight, Settings2, Tag } from 'lucide-react'
import { dashboard } from '@/routes'

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-4 md:p-6">
                <div
                    className="relative overflow-hidden rounded-2xl border-2 border-[#f0a83a]/40 bg-gradient-to-br from-[#c8323c]/10 via-card to-[#3f9b8a]/10 p-6 shadow-sm"
                    data-tour="dashboard-welcome"
                >
                    <div
                        className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-[#f0a83a]/20 blur-2xl"
                        aria-hidden="true"
                    />
                    <div
                        className="pointer-events-none absolute -bottom-10 left-1/3 size-28 rounded-full bg-[#e85a85]/15 blur-2xl"
                        aria-hidden="true"
                    />
                    <p className="text-sm font-semibold uppercase tracking-wide text-[#c8323c]">
                        Panel Carmen Saa
                    </p>
                    <h1 className="font-display mt-1 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                        Hola, Carmen 👋
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
                        Pulsa
                        {' '}
                        <strong className="font-semibold text-[#c8323c] dark:text-[#f0a83a]">Ver guía</strong>
                        {' '}
                        para un recorrido completo que te enseña a usar Servicios: editar, ocultar y agregar máquinas.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Link
                        href="/admin/services"
                        className="group rounded-2xl border-2 border-[#c8323c]/20 bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#c8323c]/45 hover:shadow-md"
                        data-tour="dashboard-quick-services"
                        aria-label="Ir a administrar servicios del catálogo"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#c8323c] to-[#e85a85] text-white shadow-sm">
                                <Settings2 className="size-5" aria-hidden="true" />
                            </div>
                            <ArrowRight
                                className="size-4 text-[#c8323c] transition-transform group-hover:translate-x-0.5"
                                aria-hidden="true"
                            />
                        </div>
                        <h2 className="font-display mt-4 text-lg font-semibold text-foreground">Servicios</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Agrega, edita o activa las máquinas de tu catálogo: algodón de azúcar, palomitas, granizado y más.
                        </p>
                    </Link>

                    <Link
                        href="/admin/categories"
                        className="group rounded-2xl border-2 border-[#3f9b8a]/25 bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#3f9b8a]/50 hover:shadow-md"
                        data-tour="dashboard-quick-categories"
                        aria-label="Ir a administrar categorías del catálogo"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#3f9b8a] to-[#f0a83a] text-white shadow-sm">
                                <Tag className="size-5" aria-hidden="true" />
                            </div>
                            <ArrowRight
                                className="size-4 text-[#3f9b8a] transition-transform group-hover:translate-x-0.5"
                                aria-hidden="true"
                            />
                        </div>
                        <h2 className="font-display mt-4 text-lg font-semibold text-foreground">Categorías</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Organiza tus servicios en grupos. Por ejemplo: &quot;Máquinas para Eventos&quot;.
                        </p>
                    </Link>
                </div>

                <p className="text-sm text-muted-foreground">
                    Siguiente paso: entra a Servicios y sigue la guía para practicar editar, ocultar y crear máquinas.
                </p>
            </div>
        </>
    )
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
}
