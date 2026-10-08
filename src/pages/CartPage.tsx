import type { CartItem, Product } from '../types';
import { SectionHeader } from '../components/atoms/SectionHeader';
import { CartTable } from '../components/organisms/CartTable';
import { CartSummary } from '../components/molecules/CartSummary';

export interface CartPageProps {
  cart: CartItem[];
  products: Product[];
  subtotal: number;
  shipping: number;
  total: number;
  onNavigate: (path: string) => void;
  onDecrease: (id: string) => void;
  onIncrease: (id: string) => void;
  onCheckout: () => void;
  onClearCart: () => void;
}

export function CartPage({
  cart,
  products,
  subtotal,
  shipping,
  total,
  onNavigate,
  onDecrease,
  onIncrease,
  onCheckout,
  onClearCart,
}: CartPageProps) {
  const totalItemCount = cart.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        <SectionHeader
          eyebrow="Carrito de compras"
          title="Tu pedido en preparación"
          subtitle="Revisa las unidades de tus cilindros y accesorios antes de continuar."
        />

        <div className="row g-4 align-items-start">
          <div className="col-12 col-lg-8">
            <CartTable
              cart={cart}
              products={products}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              onExploreCatalog={() => onNavigate('/catalog')}
            />
          </div>

          <div className="col-12 col-lg-4">
            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              itemCount={totalItemCount}
              onCheckout={onCheckout}
              onClearCart={onClearCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
