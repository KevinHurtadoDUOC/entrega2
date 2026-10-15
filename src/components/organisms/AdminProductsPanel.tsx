import { useState } from 'react';
import type { Category, Product } from '../../types';
import { getProducts, saveProducts, deleteProduct } from '../../lib/storage';
import { useAppContext } from '../../lib/AppContext';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { ProductRow } from '../molecules/ProductRow';
import { AlertBanner } from '../molecules/AlertBanner';

export interface AdminProductsPanelProps {
  products: Product[];
  categories: Category[];
  onRefresh: () => void;
}

export function AdminProductsPanel({ products, categories, onRefresh }: AdminProductsPanelProps) {
  const { showAlert } = useAppContext();
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const categoryNames = categories.map((c) => c.nombre);

  const handleAddProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const nombre = String(fd.get('nombre') ?? '').trim();
    const categoria = String(fd.get('categoria') ?? '').trim();
    const precio = Number(fd.get('precio') ?? 0);
    const precioOferta = Number(fd.get('precioOferta') ?? 0);
    const stock = Number(fd.get('stock') ?? 0);
    const descripcion = String(fd.get('descripcion') ?? '').trim();
    const imagen = String(fd.get('imagen') ?? '').trim();

    if (!nombre) {
      setFormError('El nombre del producto no puede estar vacío.');
      showAlert('El nombre del producto no puede estar vacío.', 'warning', 'Validación');
      return;
    }
    if (!categoria) {
      setFormError('Debes seleccionar una categoría.');
      showAlert('Debes seleccionar una categoría.', 'warning', 'Validación');
      return;
    }
    if (precio <= 0) {
      setFormError('El precio debe ser mayor a cero.');
      showAlert('El precio debe ser mayor a cero.', 'warning', 'Validación');
      return;
    }
    if (precioOferta <= 0) {
      setFormError('El precio oferta debe ser mayor a cero.');
      showAlert('El precio oferta debe ser mayor a cero.', 'warning', 'Validación');
      return;
    }
    if (precioOferta > precio) {
      setFormError('El precio oferta no puede ser mayor al precio normal.');
      showAlert('El precio oferta no puede ser mayor al precio normal.', 'warning', 'Validación');
      return;
    }
    if (stock < 0) {
      setFormError('El stock no puede ser negativo.');
      showAlert('El stock no puede ser negativo.', 'warning', 'Validación');
      return;
    }
    if (!imagen) {
      setFormError('La URL de la imagen del producto es obligatoria.');
      showAlert('La URL de la imagen del producto es obligatoria.', 'warning', 'Validación');
      return;
    }

    const all = getProducts();
    const id = `PRD-${Date.now()}`;
    all.push({ id, nombre, categoria, precio, precioOferta, stock, descripcion, imagen });
    saveProducts(all);
    setShowAdd(false);
    setFormError(null);
    showAlert(`Producto "${nombre}" agregado al inventario exitosamente.`, 'success', 'Producto Creado');
    onRefresh();
  };

  const handleSaveEdit = (id: string, data: Partial<Product>) => {
    if (!data.nombre?.trim()) {
      showAlert('El nombre no puede estar vacío.', 'warning', 'Edición');
      return;
    }
    if (!data.categoria?.trim()) {
      showAlert('La categoría no puede estar vacía.', 'warning', 'Edición');
      return;
    }
    if ((data.precio ?? 0) <= 0) {
      showAlert('El precio debe ser mayor a cero.', 'warning', 'Edición');
      return;
    }
    if ((data.precioOferta ?? 0) <= 0) {
      showAlert('El precio oferta debe ser mayor a cero.', 'warning', 'Edición');
      return;
    }
    if ((data.precioOferta ?? 0) > (data.precio ?? 0)) {
      showAlert('El precio oferta no puede ser mayor al precio normal.', 'warning', 'Edición');
      return;
    }

    const all = getProducts();
    const idx = all.findIndex((p) => p.id === id);
    if (idx === -1) return;
    all[idx] = { ...all[idx], ...data };
    saveProducts(all);
    setEditId(null);
    showAlert(`Producto "${all[idx].nombre}" actualizado exitosamente.`, 'success', 'Cambios Guardados');
    onRefresh();
  };

  const handleDeleteProduct = (id: string) => {
    const all = getProducts();
    const target = all.find((p) => p.id === id);
    const targetName = target ? target.nombre : 'Producto';
    deleteProduct(id);
    setDeleteConfirmId(null);
    showAlert(`"${targetName}" ha sido eliminado del catálogo.`, 'info', 'Producto Eliminado');
    onRefresh();
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-0 fw-bold text-dark">
            <i className="bi bi-box-seam me-2 text-primary" />
            Gestión de Productos ({products.length})
          </h5>
          <small className="text-muted">Administra stock, precios y catálogo de cilindros y accesorios</small>
        </div>
        <Button
          variant={showAdd ? 'outline-secondary' : 'primary'}
          size="sm"
          icon={showAdd ? 'bi bi-x-lg' : 'bi bi-plus-lg'}
          onClick={() => setShowAdd(!showAdd)}
        >
          {showAdd ? 'Cancelar' : 'Agregar producto'}
        </Button>
      </div>

      <div className="card-body p-0">
        {showAdd && (
          <div className="p-4 bg-light border-bottom">
            <h6 className="fw-bold mb-3 text-dark">Nuevo Producto</h6>
            {formError && (
              <AlertBanner
                variant="warning"
                message={formError}
                onClose={() => setFormError(null)}
                className="mb-3"
              />
            )}
            <form onSubmit={handleAddProduct}>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <Input label="Nombre del producto" name="nombre" required placeholder="Ej: Cilindro 11 kg" />
                </div>
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Categoría</label>
                    <select name="categoria" className="form-select" required>
                      <option value="">— Seleccionar categoría —</option>
                      {categoryNames.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <small className="form-text text-muted">
                      Selecciona una categoría existente. Puedes crear nuevas en la pestaña "Categorías".
                    </small>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <Input
                    label="Precio normal ($)"
                    name="precio"
                    type="number"
                    min="1"
                    required
                    placeholder="15000"
                  />
                </div>
                <div className="col-12 col-md-4">
                  <Input
                    label="Precio oferta ($)"
                    name="precioOferta"
                    type="number"
                    min="1"
                    required
                    placeholder="13500"
                  />
                </div>
                <div className="col-12 col-md-4">
                  <Input
                    label="Stock disponible"
                    name="stock"
                    type="number"
                    min="0"
                    required
                    placeholder="25"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <Input
                    label="Descripción"
                    name="descripcion"
                    placeholder="Descripción detallada del producto..."
                  />
                </div>
                <div className="col-12 col-md-6">
                  <Input
                    label="URL de imagen del producto"
                    name="imagen"
                    type="url"
                    required
                    placeholder="https://ejemplo.com/imagen.png"
                    helperText="Ingresa la URL completa de la imagen del producto."
                  />
                </div>
                <div className="col-12">
                  <Button type="submit" variant="primary" icon="bi bi-check2-circle">
                    Guardar producto
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
                <th>Categoría</th>
                <th>Precio</th>
                <th>Oferta</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <ProductRow
                  key={p.id}
                  product={p}
                  isEditing={editId === p.id}
                  categories={categoryNames}
                  deleteConfirmId={deleteConfirmId}
                  onStartEdit={setEditId}
                  onCancelEdit={() => setEditId(null)}
                  onSaveEdit={handleSaveEdit}
                  onDeleteRequest={(id) => setDeleteConfirmId(id)}
                  onDeleteConfirm={handleDeleteProduct}
                  onDeleteCancel={() => setDeleteConfirmId(null)}
                />
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-4">
                    <i className="bi bi-inbox fs-3 d-block mb-2" />
                    No hay productos registrados.
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
