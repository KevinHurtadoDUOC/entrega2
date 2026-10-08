import { useParams } from 'react-router-dom';
import { formatCurrency, getProductById } from '../lib/storage';
import { Button } from '../components/atoms/Button';
import { Badge } from '../components/atoms/Badge';

export interface ProductPageProps {
  onNavigate: (path: string) => void;
  onAddToCart: (productId: string) => void;
}

export function ProductPage({ onNavigate, onAddToCart }: ProductPageProps) {
  const { id } = useParams();
  const product = getProductById(id ?? null);

  if (!product) {
    return (
      <div className="py-5 bg-light min-vh-100">
        <div className="container text-center py-5">
          <div className="card shadow-sm border-0 p-5 mx-auto" style={{ maxWidth: '480px' }}>
            <i className="bi bi-exclamation-circle fs-1 text-warning mb-3" />
            <h3 className="fw-bold mb-2">Producto no encontrado</h3>
            <p className="text-muted mb-4">
              El producto solicitado no existe en nuestro catálogo o fue retirado.
            </p>
            <Button variant="primary" icon="bi bi-arrow-left" onClick={() => onNavigate('/catalog')}>
              Volver al catálogo
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const hasDiscount = product.precioOferta < product.precio;
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="mb-4">
          <Button
            variant="outline-secondary"
            size="sm"
            icon="bi bi-arrow-left"
            onClick={() => onNavigate('/catalog')}
          >
            Volver al catálogo
          </Button>
        </div>

        <div className="card shadow-sm border-0 overflow-hidden">
          <div className="row g-0 align-items-center">
            {/* Product Image */}
            <div className="col-12 col-md-5 bg-white p-4 p-lg-5 text-center border-end">
              <div
                className="d-flex align-items-center justify-content-center p-3"
                style={{ height: '360px' }}
              >
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  className="img-fluid"
                  style={{ maxHeight: '320px', objectFit: 'contain' }}
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="col-12 col-md-7 p-4 p-lg-5">
              <div className="d-flex gap-2 mb-2">
                <Badge variant="secondary" pill>
                  {product.categoria}
                </Badge>
                {hasDiscount && (
                  <Badge variant="danger" pill icon="bi bi-tag-fill">
                    Oferta Especial
                  </Badge>
                )}
                <Badge variant={isOutOfStock ? 'danger' : 'success'} pill>
                  {isOutOfStock ? 'Sin stock' : `Stock: ${product.stock} unidades`}
                </Badge>
              </div>

              <h1 className="h2 fw-bold text-dark mb-3">{product.nombre}</h1>

              <div className="d-flex align-items-baseline gap-3 mb-4">
                <span className="display-6 fw-bold text-primary">
                  {formatCurrency(product.precioOferta)}
                </span>
                {hasDiscount && (
                  <span className="fs-5 text-muted text-decoration-line-through">
                    {formatCurrency(product.precio)}
                  </span>
                )}
              </div>

              <div className="bg-light p-3 rounded-3 mb-4">
                <h6 className="fw-bold text-uppercase small text-muted mb-2">Descripción del producto</h6>
                <p className="text-secondary mb-0">{product.descripcion}</p>
              </div>

              <div className="d-flex flex-wrap gap-2 text-muted small mb-4">
                <span className="badge bg-light text-dark border">
                  <i className="bi bi-shield-check text-success me-1" />
                  Certificación SEC al día
                </span>
                <span className="badge bg-light text-dark border">
                  <i className="bi bi-truck text-primary me-1" />
                  Despacho en el día
                </span>
                <span className="badge bg-light text-dark border">
                  <i className="bi bi-hash text-muted me-1" />
                  ID: {product.id}
                </span>
              </div>

              <div className="d-flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  icon="bi bi-cart-plus"
                  disabled={isOutOfStock}
                  onClick={() => onAddToCart(product.id)}
                >
                  Añadir al carrito
                </Button>
                <Button
                  variant="outline-secondary"
                  size="lg"
                  onClick={() => onNavigate('/catalog')}
                >
                  Seguir comprando
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
