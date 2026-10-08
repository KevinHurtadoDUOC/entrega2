import type { CartItem, Product } from '../../types';
import { CartItemRow } from '../molecules/CartItemRow';
import { Button } from '../atoms/Button';

export interface CartTableProps {
  cart: CartItem[];
  products: Product[];
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onExploreCatalog: () => void;
}

export function CartTable({
  cart,
  products,
  onIncrease,
  onDecrease,
  onExploreCatalog,
}: CartTableProps) {
  if (cart.length === 0) {
    return (
      <div className="card shadow-sm border-0 text-center py-5 px-3">
        <div className="card-body">
          <i className="bi bi-cart-x fs-1 text-muted d-block mb-3" />
          <h4 className="fw-bold text-dark">Tu carrito está vacío</h4>
          <p className="text-muted mb-4">
            Aún no has agregado cilindros o accesorios a tu pedido.
          </p>
          <Button
            variant="primary"
            icon="bi bi-shop"
            size="lg"
            onClick={onExploreCatalog}
          >
            Ir al catálogo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm border-0 overflow-hidden">
      <div className="table-responsive">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col" className="py-3">Producto</th>
              <th scope="col" className="py-3">Cantidad</th>
              <th scope="col" className="py-3">Precio Unitario</th>
              <th scope="col" className="py-3">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              const product = products.find((p) => p.id === item.id);
              if (!product) return null;

              return (
                <CartItemRow
                  key={item.id}
                  item={item}
                  product={product}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
