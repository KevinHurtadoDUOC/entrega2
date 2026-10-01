import { useParams } from 'react-router-dom';
import { formatCurrency, getProductById } from '../lib/storage';

type ProductPageProps = {
  onNavigate: (path: string) => void;
  onAddToCart: (productId: string) => void;
};

export function ProductPage({ onNavigate, onAddToCart }: ProductPageProps) {
  const { id } = useParams();
  const product = getProductById(id ?? null);

  if (!product) {
    return (
      <section className="featured-section">
        <div className="container">
          <div className="empty-cart">
            <h3>Producto no encontrado</h3>
            <button type="button" className="btn btn-primary" onClick={() => onNavigate('/catalog')}>Volver al catálogo</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="product-detail-page">
      <div className="container">
        <button type="button" className="btn btn-secondary back-link" onClick={() => onNavigate('/catalog')}>← Volver</button>
        <div className="product-detail-grid">
          <div className="detail-image">
            <img src={product.imagen} alt={product.nombre} />
          </div>
          <div className="detail-copy">
            <span className="eyebrow accent">{product.categoria}</span>
            <h2>{product.nombre}</h2>
            <div className="detail-price">
              <span className="price-current">{formatCurrency(product.precioOferta)}</span>
              <span className="price-old">{formatCurrency(product.precio)}</span>
            </div>
            <div className="detail-meta">
              <span>Stock: {product.stock}</span>
              <span>ID: {product.id}</span>
            </div>
            <p>{product.descripcion}</p>
            <div className="product-actions">
              <button type="button" className="btn btn-primary" onClick={() => onAddToCart(product.id)}>Añadir al carrito</button>
              <button type="button" className="btn btn-secondary" onClick={() => onNavigate('/catalog')}>Volver</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
