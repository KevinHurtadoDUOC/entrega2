import { useState } from 'react';
import type { Product } from '../../types';
import { getProducts, saveProducts } from '../../lib/storage';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { ProductRow } from '../molecules/ProductRow';

export interface AdminProductsPanelProps {
  products: Product[];
  onRefresh: () => void;
}

export function AdminProductsPanel({ products, onRefresh }: AdminProductsPanelProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const existingCategories = [...new Set(products.map((p) => p.categoria))];

  const handleAddProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const nombre = String(fd.get('nombre') ?? '').trim();
    const categoria = String(fd.get('categoria') ?? '').trim();
    const precio = Number(fd.get('precio') ?? 0);
    const precioOferta = Number(fd.get('precioOferta') ?? 0);
    const stock = Number(fd.get('stock') ?? 0);
    const descripcion = String(fd.get('descripcion') ?? '').trim();

    if (!nombre) {
      alert('El nombre del producto no puede estar vacío.');
      return;
    }
    if (!categoria) {
      alert('La categoría no puede estar vacía.');
      return;
    }
    if (precio <= 0) {
      alert('El precio debe ser mayor a cero.');
      return;
    }
    if (precioOferta <= 0) {
      alert('El precio oferta debe ser mayor a cero.');
      return;
    }
    if (precioOferta > precio) {
      alert('El precio oferta no puede ser mayor al precio normal.');
      return;
    }
    if (stock < 0) {
      alert('El stock no puede ser negativo.');
      return;
    }

    const all = getProducts();
    const id = `PRD-${Date.now()}`;
    all.push({ id, nombre, categoria, precio, precioOferta, stock, descripcion, imagen: '' });
    saveProducts(all);
    setShowAdd(false);
    onRefresh();
  };

  const handleSaveEdit = (id: string, data: Partial<Product>) => {
    if (!data.nombre?.trim()) {
      alert('El nombre no puede estar vacío.');
      return;
    }
    if (!data.categoria?.trim()) {
      alert('La categoría no puede estar vacía.');
      return;
    }
    if ((data.precio ?? 0) <= 0) {
      alert('El precio debe ser mayor a cero.');
      return;
    }
    if ((data.precioOferta ?? 0) <= 0) {
      alert('El precio oferta debe ser mayor a cero.');
      return;
    }
    if ((data.precioOferta ?? 0) > (data.precio ?? 0)) {
      alert('El precio oferta no puede ser mayor al precio normal.');
      return;
    }

    const all = getProducts();
    const idx = all.findIndex((p) => p.id === id);
    if (idx === -1) return;
    all[idx] = { ...all[idx], ...data };
    saveProducts(all);
    setEditId(null);
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
            <form onSubmit={handleAddProduct}>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <Input label="Nombre del producto" name="nombre" required placeholder="Ej: Cilindro 11 kg" />
                </div>
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Categoría</label>
                    <input
                      name="categoria"
                      className="form-control"
                      list="cat-add-list"
                      placeholder="Escriba o elija categoría"
                      required
                    />
                    <datalist id="cat-add-list">
                      {existingCategories.map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                    <small className="form-text text-muted">
                      Si la categoría no existe, se creará automáticamente.
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
                <div className="col-12">
                  <Input
                    label="Descripción"
                    name="descripcion"
                    placeholder="Descripción detallada del producto..."
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
                  categories={existingCategories}
                  onStartEdit={setEditId}
                  onCancelEdit={() => setEditId(null)}
                  onSaveEdit={handleSaveEdit}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
