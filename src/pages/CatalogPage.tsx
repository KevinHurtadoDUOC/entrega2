import type { Product } from '../types';
import { ProductGrid } from '../components/ProductGrid';

type CatalogPageProps = {
  categoryFilter: string;
  priceFilter: string;
  categoryOptions: string[];
  filteredProducts: Product[];
  onCategoryChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onNavigate: (path: string) => void;
  onAddToCart: (id: string) => void;
};

export function CatalogPage({
  categoryFilter,
  priceFilter,
  categoryOptions,
  filteredProducts,
  onCategoryChange,
  onPriceChange,
  onNavigate,
  onAddToCart,
}: CatalogPageProps) {
  return (
    <>
      <section className="page-hero small-hero">
        <div className="container">
          <span className="eyebrow accent">Catálogo</span>
          <h1>Encuentra el producto ideal para tu proyecto.</h1>
        </div>
      </section>

      <section className="catalog-filters">
        <div className="container filters-wrap">
          <div className="filter-card">
            <label htmlFor="category-filter">Categoría</label>
            <select id="category-filter" value={categoryFilter} onChange={(event) => onCategoryChange(event.target.value)}>
              <option value="all">Todas</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="filter-card">
            <label htmlFor="price-filter">Precio</label>
            <select id="price-filter" value={priceFilter} onChange={(event) => onPriceChange(event.target.value)}>
              <option value="all">Todos</option>
              <option value="0-10000">Hasta $10.000</option>
              <option value="10001-20000">$10.001 - $20.000</option>
              <option value="20001-30000">$20.001 - $30.000</option>
              <option value="30001-999999">Más de $30.000</option>
            </select>
          </div>
        </div>
      </section>

      <section className="catalog-section">
        <div className="container">
          <ProductGrid products={filteredProducts} onAddToCart={onAddToCart} onOpenProduct={(id) => onNavigate(`/product/${id}`)} />
        </div>
      </section>
    </>
  );
}
