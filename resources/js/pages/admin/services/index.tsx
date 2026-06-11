import { Head, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { registerServicesOnboardingHandlers } from '@/lib/admin-onboarding';
import type { BreadcrumbItem } from '@/types';

interface Category {
    id: number;
    name: string;
}

interface Service {
    id: number;
    title: string;
    subtitle: string | null;
    short_description: string;
    long_description: string | null;
    price: number | null;
    is_active: boolean;
    sort_order: number;
    category_id: number | null;
    category: Category | null;
}

interface Props {
    services: Service[];
    categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Servicios', href: '/admin/services' },
];

const emptyForm = {
    title: '',
    subtitle: '',
    short_description: '',
    long_description: '',
    price: '',
    category_id: '',
    sort_order: '0',
};

export default function ServicesIndex({ services, categories }: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Service | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);

    const openCreate = () => {
        setEditing(null);
        setForm(emptyForm);
        setOpen(true);
    };

    useEffect(() => {
        registerServicesOnboardingHandlers({
            openCreateModal: () => {
                setEditing(null);
                setForm(emptyForm);
                setOpen(true);
            },
            closeServiceModal: () => {
                setOpen(false);
            },
        });

        return () => registerServicesOnboardingHandlers(null);
    }, []);

    const openEdit = (service: Service) => {
        setEditing(service);
        setForm({
            title: service.title,
            subtitle: service.subtitle ?? '',
            short_description: service.short_description,
            long_description: service.long_description ?? '',
            price: service.price?.toString() ?? '',
            category_id: service.category_id?.toString() ?? '',
            sort_order: service.sort_order.toString(),
        });
        setOpen(true);
    };

    const handleSubmit = () => {
        const data = {
            ...form,
            price: form.price !== '' ? Number(form.price) : null,
            category_id: form.category_id !== '' ? Number(form.category_id) : null,
            sort_order: Number(form.sort_order),
        };

        if (editing) {
            router.put(`/admin/services/${editing.id}`, data, { onSuccess: () => setOpen(false) });
        } else {
            router.post('/admin/services', data, { onSuccess: () => setOpen(false) });
        }
    };

    const handleToggle = (service: Service) => {
        router.patch(`/admin/services/${service.id}/toggle`);
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        router.delete(`/admin/services/${deleteTarget.id}`, { onSuccess: () => setDeleteTarget(null) });
    };

    return (
        <>
            <Head title="Servicios" />

            <div className="p-6">
                <div
                    className="mb-6 flex items-center justify-between"
                    data-tour="services-page-header"
                >
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Servicios</h1>
                        <p className="text-sm text-gray-500">{services.length} servicios registrados</p>
                    </div>
                    <Button onClick={openCreate} data-tour="services-create-button">
                        <Plus className="mr-2 h-4 w-4" />
                        Nuevo servicio
                    </Button>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white" data-tour="services-table">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                            <tr>
                                <th className="px-4 py-3 text-left">Servicio</th>
                                <th className="px-4 py-3 text-left">Categoría</th>
                                <th className="px-4 py-3 text-left">Precio</th>
                                <th className="px-4 py-3 text-left">Orden</th>
                                <th
                                    className="px-4 py-3 text-left"
                                    {...(services.length === 0 ? { 'data-tour': 'services-toggle-button' } : {})}
                                >
                                    Estado
                                </th>
                                <th className="px-4 py-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {services.map((service, index) => (
                                <tr key={service.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-gray-900">{service.title}</p>
                                        {service.subtitle && (
                                            <p className="text-xs text-gray-400">{service.subtitle}</p>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">
                                        {service.category?.name ?? <span className="text-gray-300">—</span>}
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">
                                        {service.price !== null
                                            ? `$${service.price.toLocaleString('es-CL')}`
                                            : <span className="text-gray-300">—</span>
                                        }
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">{service.sort_order}</td>
                                    <td className="px-4 py-3">
                                        <button
                                            type="button"
                                            onClick={() => handleToggle(service)}
                                            {...(index === 0 ? { 'data-tour': 'services-toggle-button' } : {})}
                                            aria-label={`Cambiar estado de ${service.title}`}
                                        >
                                            <Badge variant={service.is_active ? 'default' : 'secondary'}>
                                                {service.is_active ? 'Activo' : 'Inactivo'}
                                            </Badge>
                                        </button>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openEdit(service)}
                                                aria-label={`Editar ${service.title}`}
                                                {...(index === 0 ? { 'data-tour': 'services-edit-button' } : {})}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => setDeleteTarget(service)}
                                                aria-label={`Eliminar ${service.title}`}
                                                {...(index === 0 ? { 'data-tour': 'services-delete-button' } : {})}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal crear / editar */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-lg" data-tour="service-form-dialog">
                    <DialogHeader>
                        <DialogTitle>{editing ? 'Editar servicio' : 'Nuevo servicio'}</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-2">
                        <div className="grid gap-1.5" data-tour="service-form-title">
                            <Label htmlFor="service-title">Nombre *</Label>
                            <Input
                                id="service-title"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-1.5" data-tour="service-form-subtitle">
                            <Label htmlFor="service-subtitle">Subtítulo</Label>
                            <Input
                                id="service-subtitle"
                                value={form.subtitle}
                                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-1.5" data-tour="service-form-short-description">
                            <Label htmlFor="service-short-description">Descripción corta *</Label>
                            <Input
                                id="service-short-description"
                                value={form.short_description}
                                onChange={(e) => setForm({ ...form, short_description: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-1.5" data-tour="service-form-long-description">
                            <Label htmlFor="service-long-description">Descripción larga</Label>
                            <textarea
                                id="service-long-description"
                                value={form.long_description}
                                onChange={(e) => setForm({ ...form, long_description: e.target.value })}
                                rows={3}
                                className="w-full rounded-md border border-input px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-1.5" data-tour="service-form-price">
                                <Label htmlFor="service-price">Precio (CLP)</Label>
                                <Input
                                    id="service-price"
                                    type="number"
                                    value={form.price}
                                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                                    placeholder="Sin precio"
                                />
                            </div>
                            <div className="grid gap-1.5" data-tour="service-form-sort-order">
                                <Label htmlFor="service-sort-order">Orden</Label>
                                <Input
                                    id="service-sort-order"
                                    type="number"
                                    value={form.sort_order}
                                    onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="grid gap-1.5" data-tour="service-form-category">
                            <Label htmlFor="service-category">Categoría</Label>
                            <Select
                                value={form.category_id}
                                onValueChange={(v) => setForm({ ...form, category_id: v })}
                            >
                                <SelectTrigger id="service-category">
                                    <SelectValue placeholder="Sin categoría" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id.toString()}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                        <Button onClick={handleSubmit} data-tour="service-form-submit">
                            {editing ? 'Guardar' : 'Crear'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal confirmar eliminación */}
            <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>¿Eliminar servicio?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-gray-500">
                        Se eliminará <strong>{deleteTarget?.title}</strong>. Esta acción no se puede deshacer.
                    </p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancelar</Button>
                        <Button variant="destructive" onClick={handleDelete}>Eliminar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

ServicesIndex.layout = {
    breadcrumbs,
};
