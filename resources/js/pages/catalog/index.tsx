import { Head } from '@inertiajs/react';
import { useState } from 'react';

interface Service {
    id: number;
    title: string;
    subtitle: string | null;
    short_description: string;
    long_description: string | null;
    price: number | null;
    image_path: string | null;
}

interface Props {
    services: Service[];
    whatsappNumber: string;
}

const SERVICE_EMOJIS: Record<string, string> = {
    'Máquina de Algodón de Azúcar': '🍭',
    'Máquina de Palomitas': '🍿',
    'Máquina de Granizado': '🧊',
    'Máquina de Helados Soft': '🍦',
    'Máquina de Hot Dogs': '🌭',
    'Máquina de Papas Fritas': '🍟',
};

export default function CatalogIndex({ services, whatsappNumber }: Props) {
    const [selected, setSelected] = useState<Set<number>>(new Set());
    const [clientName, setClientName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [showForm, setShowForm] = useState(false);

    const toggle = (id: number) => {
        setSelected((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const selectedServices = services.filter((s) => selected.has(s.id));

    const buildWhatsAppMessage = () => {
        const lines = [
            `Hola Carmen! Me gustaría cotizar el arriendo de las siguientes máquinas:`,
            '',
            ...selectedServices.map((s, i) => `${i + 1}. ${s.title}`),
            '',
        ];

        if (clientName.trim()) lines.push(`Nombre: ${clientName.trim()}`);
        if (eventDate) lines.push(`Fecha del evento: ${eventDate}`);
        if (eventLocation.trim()) lines.push(`Lugar: ${eventLocation.trim()}`);

        lines.push('', 'Quedo atento/a a tu respuesta. Gracias! 😊');

        return encodeURIComponent(lines.join('\n'));
    };

    const handleCotizar = () => {
        if (selected.size === 0) return;
        setShowForm(true);
        setTimeout(() => {
            document.getElementById('cotizador-form')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleSendWhatsApp = () => {
        const msg = buildWhatsAppMessage();
        window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
    };

    return (
        <>
            <Head title="Catálogo de Servicios - Carmen Saa Eventos" />

            <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white">
                {/* Header */}
                <header className="bg-gradient-to-r from-sky-500 to-blue-600 py-10 text-center text-white shadow-lg">
                    <div className="mx-auto max-w-4xl px-4">
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Carmen Saa Eventos
                        </h1>
                        <p className="mt-2 text-lg text-sky-100">
                            Catálogo de Máquinas para Eventos Infantiles
                        </p>
                        <p className="mt-1 text-sm text-sky-200">
                            Selecciona los servicios que te interesan y cotiza directo por WhatsApp
                        </p>
                    </div>
                </header>

                <main className="mx-auto max-w-5xl px-4 py-10">
                    {/* Servicios */}
                    <section>
                        <h2 className="mb-6 text-xl font-semibold text-gray-700">
                            Nuestros Servicios
                        </h2>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {services.map((service) => {
                                const isSelected = selected.has(service.id);
                                const emoji = SERVICE_EMOJIS[service.title] ?? '🎉';

                                return (
                                    <button
                                        key={service.id}
                                        onClick={() => toggle(service.id)}
                                        className={`group relative flex flex-col rounded-2xl border-2 p-5 text-left transition-all duration-200 ${
                                            isSelected
                                                ? 'border-blue-500 bg-blue-50 shadow-md'
                                                : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
                                        }`}
                                    >
                                        {/* Checkmark */}
                                        <div
                                            className={`absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                                                isSelected
                                                    ? 'border-blue-500 bg-blue-500 text-white'
                                                    : 'border-gray-300 bg-white'
                                            }`}
                                        >
                                            {isSelected && (
                                                <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            )}
                                        </div>

                                        {/* Emoji */}
                                        <span className="mb-3 text-4xl">{emoji}</span>

                                        {/* Contenido */}
                                        <h3 className="pr-6 font-semibold text-gray-800">{service.title}</h3>
                                        {service.subtitle && (
                                            <p className="mt-0.5 text-sm text-blue-600">{service.subtitle}</p>
                                        )}
                                        <p className="mt-2 text-sm leading-relaxed text-gray-500">
                                            {service.short_description}
                                        </p>

                                        {service.price !== null && (
                                            <p className="mt-3 font-semibold text-blue-700">
                                                ${service.price.toLocaleString('es-CL')}
                                            </p>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    {/* Barra flotante de selección */}
                    {selected.size > 0 && !showForm && (
                        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
                            <div className="flex items-center gap-3 rounded-full bg-blue-600 px-6 py-3 shadow-xl text-white">
                                <span className="text-sm font-medium">
                                    {selected.size} {selected.size === 1 ? 'servicio seleccionado' : 'servicios seleccionados'}
                                </span>
                                <button
                                    onClick={handleCotizar}
                                    className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                                >
                                    Cotizar →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Formulario de cotización */}
                    {showForm && (
                        <section id="cotizador-form" className="mt-12">
                            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-md sm:p-8">
                                <h2 className="mb-1 text-xl font-bold text-gray-800">
                                    Completa tu cotización
                                </h2>
                                <p className="mb-6 text-sm text-gray-500">
                                    Estos datos son opcionales pero ayudan a Carmen a prepararte una mejor respuesta.
                                </p>

                                {/* Resumen de selección */}
                                <div className="mb-6 rounded-xl bg-blue-50 p-4">
                                    <p className="mb-2 text-sm font-semibold text-blue-700">Servicios seleccionados:</p>
                                    <ul className="space-y-1">
                                        {selectedServices.map((s) => (
                                            <li key={s.id} className="flex items-center gap-2 text-sm text-gray-700">
                                                <span>{SERVICE_EMOJIS[s.title] ?? '🎉'}</span>
                                                <span>{s.title}</span>
                                                <button
                                                    onClick={() => toggle(s.id)}
                                                    className="ml-auto text-xs text-red-400 hover:text-red-600"
                                                >
                                                    quitar
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => setShowForm(false)}
                                        className="mt-3 text-xs text-blue-500 hover:underline"
                                    >
                                        + Agregar más servicios
                                    </button>
                                </div>

                                {/* Campos opcionales */}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Tu nombre
                                        </label>
                                        <input
                                            type="text"
                                            value={clientName}
                                            onChange={(e) => setClientName(e.target.value)}
                                            placeholder="Ej: María González"
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Fecha del evento
                                        </label>
                                        <input
                                            type="date"
                                            value={eventDate}
                                            onChange={(e) => setEventDate(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Lugar del evento
                                        </label>
                                        <input
                                            type="text"
                                            value={eventLocation}
                                            onChange={(e) => setEventLocation(e.target.value)}
                                            placeholder="Ej: Santiago, Providencia"
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                                        />
                                    </div>
                                </div>

                                {/* Botón WhatsApp */}
                                <button
                                    onClick={handleSendWhatsApp}
                                    className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] px-6 py-3.5 font-semibold text-white shadow-md transition hover:bg-[#1ebe5d] active:scale-[0.98]"
                                >
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Enviar cotización por WhatsApp
                                </button>
                            </div>
                        </section>
                    )}
                </main>

                {/* Footer */}
                <footer className="mt-16 border-t border-gray-100 py-6 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} Carmen Saa Eventos · Arriendo de máquinas para eventos
                </footer>
            </div>
        </>
    );
}
