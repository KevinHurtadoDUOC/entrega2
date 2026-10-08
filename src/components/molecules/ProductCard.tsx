import type { Product } from '../../types';
import { formatCurrency } from '../../lib/storage';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';

export interface ProductCardProps {
  product: Product;
  onAddToCart: (id: string) => void;
  onViewDetail: (id: string) => void;
}

export function ProductCard({ product, onAddToCart, onViewDetail }: ProductCardProps) {
  const hasDiscount = product.precioOferta < product.precio;
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="card h-100 shadow-sm border-0 product-card-hover transition-all">
      <div className="position-relative bg-light rounded-top d-flex align-items-center justify-content-center p-3" style={{ height: '220px' }}>
        <img
          src={product.imagen}
          alt={product.nombre}
          className="img-fluid"
          style={{ maxHeight: '180px', objectFit: 'contain' }}
          loading="lazy"
        />
        <div className="position-absolute top-0 start-0 m-2 d-flex flex-column gap-1">
          <Badge variant="secondary" pill>
            {product.categoria}
          </Badge>
          {hasDiscount && (
            <Badge variant="danger" pill icon="bi bi-tag-fill">
              Oferta
            </Badge>
          )}
        </div>
        <div className="position-absolute bottom-0 end-0 m-2">
          {isOutOfStock ? (
            <Badge variant="danger">Sin stock</Badge>
          ) : (
            <Badge variant="light" className="text-muted border">
              Stock: {product.stock}
            </Badge>
          )}
        </div>
      </div>

      <div className="card-body d-flex flex-column p-3">
        <h5 className="card-title fw-bold fs-6 mb-1 text-dark" title={product.nombre}>
          {product.nombre}
        </h5>
        <p className="card-text text-muted small flex-grow-1 mb-3 line-clamp-2" style={{ minHeight: '38px' }}>
          {product.descripcion}
        </p>

        <div className="d-flex align-items-baseline gap-2 mb-3">
          <span className="fs-5 fw-bold text-primary">
            {formatCurrency(product.precioOferta)}
          </span>
          {hasDiscount && (
            <span className="text-muted text-decoration-line-through small">
              {formatCurrency(product.precio)}
            </span>
          )}
        </div>

        <div className="d-grid gap-2">
          <Button
            variant="primary"
            icon="bi bi-cart-plus"
            disabled={isOutOfStock}
            onClick={() => onAddToCart(product.id)}
          >
            Añadir al carrito
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => onViewDetail(product.id)}
          >
            Ver detalle
          </Button>
        </div>
      </div>
    </div>
  );
}
