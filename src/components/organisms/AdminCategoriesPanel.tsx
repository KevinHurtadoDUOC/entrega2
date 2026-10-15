import { useState } from 'react';
import type { Category } from '../../types';
import { getCategories, saveCategories, deleteCategory as deleteCategoryStorage, getProducts } from '../../lib/storage';
import { useAppContext } from '../../lib/AppContext';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Badge } from '../atoms/Badge';
import { AlertBanner } from '../molecules/AlertBanner';

export interface AdminCategoriesPanelProps {
  categories: Category[];
  onRefresh: () => void;
}

export function AdminCategoriesPanel({ categories, onRefresh }: AdminCategoriesPanelProps) {
  const { showAlert } = useAppContext();
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editNombre, setEditNombre] = useState('');
  const [editDescripcion, setEditDescripcion] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [panelNotice, setPanelNotice] = useState<{ message: string; type: 'error' | 'warning' | 'info' | 'success'; title?: string } | null>(null);

  const handleAddCategory = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const nombre = String(fd.get('nombre') ?? '').trim();
    const descripcion = String(fd.get('descripcion') ?? '').trim();

    if (!nombre) {
      setFormError('El nombre de la categoría no puede estar vacío.');
      showAlert('El nombre de la categoría no puede estar vacío.', 'warning', 'Validación');
      return;
    }
    if (!descripcion) {
      setFormError('La descripción de la categoría no puede estar vacía.');
      showAlert('La descripción de la categoría no puede estar vacía.', 'warning', 'Validación');
      return;
    }

    const existing = getCategories();
    const duplicate = existing.some((c) => c.nombre.toLowerCase() === nombre.toLowerCase());
    if (duplicate) {
      setFormError('Ya existe una categoría con ese nombre.');
      showAlert('Ya existe una categoría con ese nombre.', 'error', 'Nombre Duplicado');
      return;
    }

    const id = `CAT-${Date.now()}`;
    existing.push({ id, nombre, descripcion });
    saveCategories(existing);
    setShowAdd(false);
    setFormError(null);
    showAlert(`Categoría "${nombre}" creada exitosamente.`, 'success', 'Categoría Creada');
    onRefresh();
  };

  const startEdit = (cat: Category) => {
    setEditId(cat.id);
    setEditNombre(cat.nombre);
    setEditDescripcion(cat.descripcion);
  };

  const handleSaveEdit = (id: string) => {
    if (!editNombre.trim()) {
      showAlert('El nombre no puede estar vacío.', 'warning', 'Edición');
      return;
    }
    if (!editDescripcion.trim()) {
      showAlert('La descripción no puede estar vacía.', 'warning', 'Edición');
      return;
    }

    const existing = getCategories();
    const duplicate = existing.some(
      (c) => c.id !== id && c.nombre.toLowerCase() === editNombre.trim().toLowerCase()
    );
    if (duplicate) {
      showAlert('Ya existe otra categoría con ese nombre.', 'error', 'Nombre Duplicado');
      return;
    }

    const idx = existing.findIndex((c) => c.id === id);
    if (idx === -1) return;
    existing[idx] = { ...existing[idx], nombre: editNombre.trim(), descripcion: editDescripcion.trim() };
    saveCategories(existing);
    setEditId(null);
    showAlert(`Categoría "${editNombre.trim()}" actualizada con éxito.`, 'success', 'Cambios Guardados');
    onRefresh();
  };

  const handleDelete = (id: string) => {
    const cat = categories.find((c) => c.id === id);
    const catName = cat ? cat.nombre : 'Categoría';
    const success = deleteCategoryStorage(id);
    if (!success) {
      const msg = `No se puede eliminar la categoría "${catName}" porque tiene productos asociados en el inventario. Elimina o reasigna los productos primero.`;
      showAlert(msg, 'error', 'Acción No Permitida');
      setPanelNotice({
        type: 'error',
        title: 'Categoría en Uso',
        message: msg,
      });
    } else {
      const msg = `Categoría "${catName}" eliminada correctamente del sistema.`;
      showAlert(msg, 'info', 'Categoría Eliminada');
      setPanelNotice({
        type: 'info',
        title: 'Categoría Eliminada',
        message: msg,
      });
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
            {formError && (
              <AlertBanner
                variant="warning"
                message={formError}
                onClose={() => setFormError(null)}
                className="mb-3"
              />
            )}
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

        {panelNotice && (
          <div className="p-3 bg-light border-bottom">
            <AlertBanner
              variant={panelNotice.type}
              title={panelNotice.title}
              message={panelNotice.message}
              onClose={() => setPanelNotice(null)}
            />
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

                const productCount = getProducts().filter(
                  (p) => p.categoria.trim().toLowerCase() === cat.nombre.trim().toLowerCase()
                ).length;

                return (
                  <tr key={cat.id} className="align-middle">
                    <td className="font-monospace small text-muted">{cat.id}</td>
                    <td className="fw-semibold text-dark">{cat.nombre}</td>
                    <td className="text-muted small" style={{ maxWidth: '320px' }}>
                      {cat.descripcion}
                    </td>
                    <td>
                      {productCount > 0 ? (
                        <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle rounded-pill px-2.5 py-1 fw-semibold">
                          <i className="bi bi-box-seam me-1" />
                          {productCount} {productCount === 1 ? 'producto' : 'productos'}
                        </span>
                      ) : (
                        <span className="badge bg-success-subtle text-success-emphasis border border-success-subtle rounded-pill px-2.5 py-1 fw-semibold">
                          <i className="bi bi-check-circle me-1" />
                          Sin uso
                        </span>
                      )}
                    </td>
                    <td>
                      {deleteConfirmId === cat.id ? (
                        <div className="d-flex gap-1 align-items-center">
                          <span className="text-danger small fw-semibold me-1">
                            {productCount > 0 ? '¿Eliminar (en uso)?' : '¿Eliminar?'}
                          </span>
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
