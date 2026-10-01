import type { CartItem, Product } from '../types';
import { formatCurrency } from '../lib/storage';

type CartPageProps = {
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
};

export function CartPage({ cart, products, subtotal, shipping, total, onNavigate, onDecrease, onIncrease, onCheckout, onClearCart }: CartPageProps) {
  return (
    <>
      <section className="page-hero small-hero">
        <div className="container">
          <span className="eyebrow accent">Carrito</span>
          <h1>Tu compra en progreso</h1>
        </div>
      </section>

      <section className="featured-section">
        <div className="container cart-layout">
          <div className="cart-card">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <h3>Tu carrito está vacío</h3>
                <p>Agrega productos desde el catálogo.</p>
                <button type="button" className="btn btn-primary" onClick={() => onNavigate('/catalog')}>Ir al catálogo</button>
              </div>
            ) : (
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const product = products.find((storedProduct) => storedProduct.id === item.id);
                    if (!product) return null;

                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="cart-product">
                            <div className="cart-product-thumb">
                              <img src={product.imagen} alt={product.nombre} />
                            </div>
                            <div>
                              <strong>{product.nombre}</strong><br />
                              <small>{product.categoria}</small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="qty-controls">
                            <button type="button" onClick={() => onDecrease(item.id)}>-</button>
                            <span>{item.cantidad}</span>
                            <button type="button" onClick={() => onIncrease(item.id)}>+</button>
                          </div>
                        </td>
                        <td>{formatCurrency(product.precioOferta)}</td>
                        <td>{formatCurrency(product.precioOferta * item.cantidad)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          <aside className="summary-box">
            <h3>Resumen</h3>
            <div className="summary-row"><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
            <div className="summary-row"><span>Envío</span><strong>{formatCurrency(shipping)}</strong></div>
            <div className="summary-total"><span>Total</span><span>{formatCurrency(total)}</span></div>
            <div className="summary-actions">
              <button type="button" className="btn btn-primary" onClick={onCheckout}>Finalizar compra</button>
              <button type="button" className="btn btn-secondary" onClick={onClearCart}>Vaciar carrito</button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
