import type { Product } from '../../types';
import { ProductCard } from '../molecules/ProductCard';

export interface ProductGridProps {
  products: Product[];
  onAddToCart: (id: string) => void;
  onOpenProduct: (id: string) => void;
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  onAddToCart,
  onOpenProduct,
  emptyMessage = 'No se encontraron productos disponibles.',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-5 my-4 bg-light rounded-3 border">
        <i className="bi bi-inbox fs-1 text-muted d-block mb-2" />
        <h5 className="text-muted fw-normal">{emptyMessage}</h5>
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
      {products.map((product) => (
        <div className="col" key={product.id}>
          <ProductCard
            product={product}
            onAddToCart={onAddToCart}
            onViewDetail={onOpenProduct}
          />
        </div>
      ))}
    </div>
  );
}
