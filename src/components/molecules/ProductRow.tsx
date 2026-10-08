import { useState } from 'react';
import type { Product } from '../../types';
import { formatCurrency } from '../../lib/storage';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';

export interface ProductRowProps {
  product: Product;
  isEditing: boolean;
  categories: string[];
  onStartEdit: (id: string) => void;
  onCancelEdit: () => void;
  onSaveEdit: (id: string, data: Partial<Product>) => void;
}

export function ProductRow({
  product,
  isEditing,
  categories,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
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
          <input
            className="form-control form-control-sm"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            list={`cat-list-${product.id}`}
          />
          <datalist id={`cat-list-${product.id}`}>
            {categories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
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

  return (
    <tr className="align-middle">
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
        <Button
          variant="outline-primary"
          size="sm"
          icon="bi bi-pencil"
          onClick={() => onStartEdit(product.id)}
        >
          Editar
        </Button>
      </td>
    </tr>
  );
}
