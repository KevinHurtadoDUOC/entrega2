import { formatCurrency } from '../../lib/storage';
import { Button } from '../atoms/Button';

export interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  itemCount: number;
  onCheckout: () => void;
  onClearCart: () => void;
}

export function CartSummary({
  subtotal,
  shipping,
  total,
  itemCount,
  onCheckout,
  onClearCart,
}: CartSummaryProps) {
  const isCartEmpty = itemCount === 0;

  return (
    <div className="card shadow-sm border-0 sticky-top" style={{ top: '100px' }}>
      <div className="card-header bg-white border-bottom py-3">
        <h5 className="mb-0 fw-bold text-dark">
          <i className="bi bi-receipt me-2 text-primary" />
          Resumen de compra
        </h5>
      </div>

      <div className="card-body p-4">
        <div className="d-flex justify-content-between mb-2 text-muted">
          <span>Subtotal ({itemCount} {itemCount === 1 ? 'artículo' : 'artículos'})</span>
          <span className="fw-semibold text-dark">{formatCurrency(subtotal)}</span>
        </div>

        <div className="d-flex justify-content-between mb-3 text-muted">
          <span>Costo de envío</span>
          <span className="fw-semibold text-dark">
            {shipping === 0 ? (
              <span className="badge bg-success-subtle text-success">Gratis</span>
            ) : (
              formatCurrency(shipping)
            )}
          </span>
        </div>

        <hr className="my-3" />

        <div className="d-flex justify-content-between align-items-center mb-4">
          <span className="fs-5 fw-bold text-dark">Total</span>
          <span className="fs-4 fw-bold text-primary">{formatCurrency(total)}</span>
        </div>

        <div className="d-grid gap-2">
          <Button
            variant="primary"
            size="lg"
            icon="bi bi-credit-card-2-front"
            disabled={isCartEmpty}
            onClick={onCheckout}
          >
            Finalizar compra
          </Button>

          <Button
            variant="outline-danger"
            size="sm"
            icon="bi bi-trash"
            disabled={isCartEmpty}
            onClick={onClearCart}
          >
            Vaciar carrito
          </Button>
        </div>
      </div>

      <div className="card-footer bg-light border-top p-3 text-center">
        <small className="text-muted d-flex align-items-center justify-content-center gap-1">
          <i className="bi bi-shield-lock-fill text-success" />
          Compra segura y garantizada
        </small>
      </div>
    </div>
  );
}
