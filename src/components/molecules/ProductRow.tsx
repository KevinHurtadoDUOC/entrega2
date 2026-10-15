import { useState } from 'react';
import type { Product } from '../../types';
import { formatCurrency } from '../../lib/storage';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';

export interface ProductRowProps {
  product: Product;
  isEditing: boolean;
  categories: string[];
  deleteConfirmId: string | null;
  onStartEdit: (id: string) => void;
  onCancelEdit: () => void;
  onSaveEdit: (id: string, data: Partial<Product>) => void;
  onDeleteRequest: (id: string) => void;
  onDeleteConfirm: (id: string) => void;
  onDeleteCancel: () => void;
}

export function ProductRow({
  product,
  isEditing,
  categories,
  deleteConfirmId,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDeleteRequest,
  onDeleteConfirm,
  onDeleteCancel,
}: ProductRowProps) {
  const [nombre, setNombre] = useState(product.nombre);
  const [categoria, setCategoria] = useState(product.categoria);
  const [precio, setPrecio] = useState(product.precio);
  const [precioOferta, setPrecioOferta] = useState(product.precioOferta);
  const [stock, setStock] = useState(product.stock);

  if (isEditing) {
    return (
      <tr className="table-warning align-middle">
        <td className="font-monospace small">{product.id}</td>
        <td>
          <input
            className="form-control form-control-sm"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </td>
        <td>
          <select
            className="form-select form-select-sm"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </td>
        <td>
          <input
            type="number"
            className="form-control form-control-sm"
            value={precio}
            onChange={(e) => setPrecio(Number(e.target.value))}
            style={{ width: '90px' }}
          />
        </td>
        <td>
          <input
            type="number"
            className="form-control form-control-sm"
            value={precioOferta}
            onChange={(e) => setPrecioOferta(Number(e.target.value))}
            style={{ width: '90px' }}
          />
        </td>
        <td>
          <input
            type="number"
            className="form-control form-control-sm"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            style={{ width: '80px' }}
          />
        </td>
        <td>
          <div className="d-flex gap-1">
            <Button
              variant="success"
              size="sm"
              icon="bi bi-check-lg"
              onClick={() => onSaveEdit(product.id, { nombre, categoria, precio, precioOferta, stock })}
            >
              Guardar
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              icon="bi bi-x-lg"
              onClick={onCancelEdit}
            >
              Cancelar
            </Button>
          </div>
        </td>
      </tr>
    );
  }

  const isDeleting = deleteConfirmId === product.id;

  return (
    <tr className={`align-middle ${isDeleting ? 'table-danger' : ''}`}>
      <td className="font-monospace small text-muted">{product.id}</td>
      <td className="fw-semibold text-dark">{product.nombre}</td>
      <td>
        <Badge variant="secondary" pill>
          {product.categoria}
        </Badge>
      </td>
      <td className="text-muted">{formatCurrency(product.precio)}</td>
      <td className="fw-bold text-primary">{formatCurrency(product.precioOferta)}</td>
      <td>
        <span className={`badge ${product.stock <= 5 ? 'bg-danger' : 'bg-light text-dark border'}`}>
          {product.stock}
        </span>
      </td>
      <td>
        {isDeleting ? (
          <div className="d-flex gap-1 align-items-center">
            <span className="text-danger small fw-semibold me-1">¿Eliminar?</span>
            <Button
              variant="danger"
              size="sm"
              icon="bi bi-trash"
              onClick={() => onDeleteConfirm(product.id)}
            >
              Sí
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={onDeleteCancel}
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
              onClick={() => onStartEdit(product.id)}
            >
              Editar
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              icon="bi bi-trash"
              onClick={() => onDeleteRequest(product.id)}
            >
              Eliminar
            </Button>
          </div>
        )}
      </td>
    </tr>
  );
}
