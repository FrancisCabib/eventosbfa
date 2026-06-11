import { Head, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { BreadcrumbItem } from '@/types';

interface Category {
    id: number;
    name: string;
    slug: string;
    sort_order: number;
    is_active: boolean;
    services_count: number;
}

interface Props {
    categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Categorías', href: '/admin/categories' },
];

const emptyForm = { name: '', sort_order: '0' };

export default function CategoriesIndex({ categories }: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Category | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

    const openCreate = () => {
        setEditing(null);
        setForm(emptyForm);
        setOpen(true);
    };

    const openEdit = (category: Category) => {
        setEditing(category);
        setForm({ name: category.name, sort_order: category.sort_order.toString() });
        setOpen(true);
    };

    const handleSubmit = () => {
        const data = { ...form, sort_order: Number(form.sort_order) };

        if (editing) {
            router.put(`/admin/categories/${editing.id}`, data, { onSuccess: () => setOpen(false) });
        } else {
            router.post('/admin/categories', data, { onSuccess: () => setOpen(false) });
        }
    };

    const handleToggle = (category: Category) => {
        router.patch(`/admin/categories/${category.id}/toggle`);
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        router.delete(`/admin/categories/${deleteTarget.id}`, { onSuccess: () => setDeleteTarget(null) });
    };

    return (
        <>
            <Head title="Categorías" />

            <div className="p-6">
                <div className="mb-6 flex items-center justify-between" data-tour="categories-page-header">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Categorías</h1>
                        <p className="text-sm text-gray-500">{categories.length} categorías registradas</p>
                    </div>
                    <Button onClick={openCreate} data-tour="categories-create-button">
                        <Plus className="mr-2 h-4 w-4" />
                        Nueva categoría
                    </Button>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white" data-tour="categories-table">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                            <tr>
                                <th className="px-4 py-3 text-left">Nombre</th>
                                <th className="px-4 py-3 text-left">Slug</th>
                                <th className="px-4 py-3 text-left">Servicios</th>
                                <th className="px-4 py-3 text-left">Orden</th>
                                <th
                                    className="px-4 py-3 text-left"
                                    {...(categories.length === 0 ? { 'data-tour': 'categories-toggle-button' } : {})}
                                >
                                    Estado
                                </th>
                                <th className="px-4 py-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {categories.map((category, index) => (
                                <tr key={category.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-900">{category.name}</td>
                                    <td className="px-4 py-3 font-mono text-xs text-gray-400">{category.slug}</td>
                                    <td className="px-4 py-3 text-gray-500">{category.services_count}</td>
                                    <td className="px-4 py-3 text-gray-500">{category.sort_order}</td>
                                    <td className="px-4 py-3">
                                        <button
                                            type="button"
                                            onClick={() => handleToggle(category)}
                                            {...(index === 0 ? { 'data-tour': 'categories-toggle-button' } : {})}
                                            aria-label={`Cambiar estado de ${category.name}`}
                                        >
                                            <Badge variant={category.is_active ? 'default' : 'secondary'}>
                                                {category.is_active ? 'Activa' : 'Inactiva'}
                                            </Badge>
                                        </button>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openEdit(category)}
                                                aria-label={`Editar ${category.name}`}
                                                {...(index === 0 ? { 'data-tour': 'categories-edit-button' } : {})}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => setDeleteTarget(category)}
                                                aria-label={`Eliminar ${category.name}`}
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
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>{editing ? 'Editar categoría' : 'Nueva categoría'}</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-2">
                        <div className="grid gap-1.5">
                            <Label>Nombre *</Label>
                            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        </div>
                        <div className="grid gap-1.5">
                            <Label>Orden</Label>
                            <Input
                                type="number"
                                value={form.sort_order}
                                onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                        <Button onClick={handleSubmit}>{editing ? 'Guardar' : 'Crear'}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal confirmar eliminación */}
            <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>¿Eliminar categoría?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-gray-500">
                        Se eliminará <strong>{deleteTarget?.name}</strong>. Los servicios asociados quedarán sin categoría.
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

CategoriesIndex.layout = {
    breadcrumbs,
};
