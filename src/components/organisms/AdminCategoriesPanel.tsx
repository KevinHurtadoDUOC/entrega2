import { useState } from 'react';
import type { Category } from '../../types';
import { getCategories, saveCategories, deleteCategory as deleteCategoryStorage } from '../../lib/storage';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Badge } from '../atoms/Badge';

export interface AdminCategoriesPanelProps {
  categories: Category[];
  onRefresh: () => void;
}

export function AdminCategoriesPanel({ categories, onRefresh }: AdminCategoriesPanelProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editNombre, setEditNombre] = useState('');
  const [editDescripcion, setEditDescripcion] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleAddCategory = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const nombre = String(fd.get('nombre') ?? '').trim();
    const descripcion = String(fd.get('descripcion') ?? '').trim();

    if (!nombre) {
      alert('El nombre de la categoría no puede estar vacío.');
      return;
    }
    if (!descripcion) {
      alert('La descripción de la categoría no puede estar vacía.');
      return;
    }

    const existing = getCategories();
    const duplicate = existing.some((c) => c.nombre.toLowerCase() === nombre.toLowerCase());
    if (duplicate) {
      alert('Ya existe una categoría con ese nombre.');
      return;
    }

    const id = `CAT-${Date.now()}`;
    existing.push({ id, nombre, descripcion });
    saveCategories(existing);
    setShowAdd(false);
    onRefresh();
  };

  const startEdit = (cat: Category) => {
    setEditId(cat.id);
    setEditNombre(cat.nombre);
    setEditDescripcion(cat.descripcion);
  };

  const handleSaveEdit = (id: string) => {
    if (!editNombre.trim()) {
      alert('El nombre no puede estar vacío.');
      return;
    }
    if (!editDescripcion.trim()) {
      alert('La descripción no puede estar vacía.');
      return;
    }

    const existing = getCategories();
    const duplicate = existing.some(
      (c) => c.id !== id && c.nombre.toLowerCase() === editNombre.trim().toLowerCase()
    );
    if (duplicate) {
      alert('Ya existe otra categoría con ese nombre.');
      return;
    }

    const idx = existing.findIndex((c) => c.id === id);
    if (idx === -1) return;
    existing[idx] = { ...existing[idx], nombre: editNombre.trim(), descripcion: editDescripcion.trim() };
    saveCategories(existing);
    setEditId(null);
    onRefresh();
  };

  const handleDelete = (id: string) => {
    const success = deleteCategoryStorage(id);
    if (!success) {
      alert('No se puede eliminar esta categoría porque tiene productos asociados. Elimina o reasigna los productos primero.');
    }
    setDeleteConfirmId(null);
    onRefresh();
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-0 fw-bold text-dark">
            <i className="bi bi-tags me-2 text-primary" />
            Gestión de Categorías ({categories.length})
          </h5>
          <small className="text-muted">Administra las categorías disponibles para los productos</small>
        </div>
        <Button
          variant={showAdd ? 'outline-secondary' : 'primary'}
          size="sm"
          icon={showAdd ? 'bi bi-x-lg' : 'bi bi-plus-lg'}
          onClick={() => setShowAdd(!showAdd)}
        >
          {showAdd ? 'Cancelar' : 'Nueva categoría'}
        </Button>
      </div>

      <div className="card-body p-0">
        {showAdd && (
          <div className="p-4 bg-light border-bottom">
            <h6 className="fw-bold mb-3 text-dark">Nueva Categoría</h6>
            <form onSubmit={handleAddCategory}>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <Input
                    label="Nombre de la categoría"
                    name="nombre"
                    required
                    placeholder="Ej: Cilindros de Gas"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <Input
                    label="Descripción"
                    name="descripcion"
                    required
                    placeholder="Descripción detallada de la categoría..."
                  />
                </div>
                <div className="col-12">
                  <Button type="submit" variant="primary" icon="bi bi-check2-circle">
                    Guardar categoría
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Productos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => {
                if (editId === cat.id) {
                  return (
                    <tr key={cat.id} className="table-warning align-middle">
                      <td className="font-monospace small">{cat.id}</td>
                      <td>
                        <input
                          className="form-control form-control-sm"
                          value={editNombre}
                          onChange={(e) => setEditNombre(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className="form-control form-control-sm"
                          value={editDescripcion}
                          onChange={(e) => setEditDescripcion(e.target.value)}
                        />
                      </td>
                      <td>—</td>
                      <td>
                        <div className="d-flex gap-1">
                          <Button
                            variant="success"
                            size="sm"
                            icon="bi bi-check-lg"
                            onClick={() => handleSaveEdit(cat.id)}
                          >
                            Guardar
                          </Button>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            icon="bi bi-x-lg"
                            onClick={() => setEditId(null)}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={cat.id} className="align-middle">
                    <td className="font-monospace small text-muted">{cat.id}</td>
                    <td className="fw-semibold text-dark">{cat.nombre}</td>
                    <td className="text-muted small" style={{ maxWidth: '320px' }}>
                      {cat.descripcion}
                    </td>
                    <td>
                      <Badge variant="secondary" pill>
                        {/* count products in this category */}
                        Usada
                      </Badge>
                    </td>
                    <td>
                      {deleteConfirmId === cat.id ? (
                        <div className="d-flex gap-1 align-items-center">
                          <span className="text-danger small fw-semibold me-1">¿Eliminar?</span>
                          <Button
                            variant="danger"
                            size="sm"
                            icon="bi bi-trash"
                            onClick={() => handleDelete(cat.id)}
                          >
                            Sí
                          </Button>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setDeleteConfirmId(null)}
                          >
                            No
                          </Button>
                        </div>
                      ) : (
                        <div className="d-flex gap-1">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            icon="bi bi-pencil"
                            onClick={() => startEdit(cat)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            icon="bi bi-trash"
                            onClick={() => setDeleteConfirmId(cat.id)}
                          >
                            Eliminar
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-4">
                    <i className="bi bi-inbox fs-3 d-block mb-2" />
                    No hay categorías registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
