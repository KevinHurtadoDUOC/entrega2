import type { Product } from '../types';
import { formatCurrency } from '../lib/storage';

type ProductGridProps = {
  products: Product[];
  onAddToCart: (id: string) => void;
  onOpenProduct: (id: string) => void;
};

export function ProductGrid({ products, onAddToCart, onOpenProduct }: ProductGridProps) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <article className="product-card" key={product.id}>
          <div className="product-image">
            <img src={product.imagen} alt={product.nombre} />
          </div>
          <div className="product-body">
            <p className="product-category">{product.categoria}</p>
            <h3 className="product-title">{product.nombre}</h3>
            <p className="product-description">{product.descripcion}</p>
            <div className="price-row">
              <span className="price-current">{formatCurrency(product.precioOferta)}</span>
              <span className="price-old">{formatCurrency(product.precio)}</span>
            </div>
            <div className="stock-meta">Stock disponible: {product.stock}</div>
            <div className="product-actions">
              <button type="button" className="btn btn-primary" onClick={() => onAddToCart(product.id)}>
                Añadir al carrito
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => onOpenProduct(product.id)}>
                Ver detalle
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
