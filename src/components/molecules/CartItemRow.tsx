import type { CartItem, Product } from '../../types';
import { formatCurrency } from '../../lib/storage';

export interface CartItemRowProps {
  item: CartItem;
  product: Product;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
}

export function CartItemRow({ item, product, onIncrease, onDecrease }: CartItemRowProps) {
  const lineSubtotal = product.precioOferta * item.cantidad;

  return (
    <tr className="align-middle">
      <td style={{ minWidth: '220px' }}>
        <div className="d-flex align-items-center gap-3">
          <div
            className="bg-light rounded p-1 border d-flex align-items-center justify-content-center"
            style={{ width: '64px', height: '64px', flexShrink: 0 }}
          >
            <img
              src={product.imagen}
              alt={product.nombre}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          </div>
          <div>
            <h6 className="mb-0 fw-semibold text-dark">{product.nombre}</h6>
            <span className="badge bg-light text-muted border">{product.categoria}</span>
          </div>
        </div>
      </td>

      <td>
        <div className="input-group input-group-sm" style={{ width: '110px' }}>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => onDecrease(item.id)}
            aria-label="Disminuir cantidad"
          >
            <i className="bi bi-dash" />
          </button>
          <span className="input-group-text bg-white fw-bold px-3 justify-content-center flex-grow-1">
            {item.cantidad}
          </span>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => onIncrease(item.id)}
            aria-label="Aumentar cantidad"
          >
            <i className="bi bi-plus" />
          </button>
        </div>
      </td>

      <td className="text-muted fw-semibold">
        {formatCurrency(product.precioOferta)}
      </td>

      <td className="fw-bold text-dark fs-6">
        {formatCurrency(lineSubtotal)}
      </td>
    </tr>
  );
}
