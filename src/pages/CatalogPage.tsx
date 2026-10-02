import type { Product } from '../types';
import { ProductGrid } from '../components/ProductGrid';

type CatalogPageProps = {
  categoryFilter: string;
  priceMin: string;
  priceMax: string;
  categoryOptions: string[];
  filteredProducts: Product[];
  onCategoryChange: (value: string) => void;
  onPriceMinChange: (value: string) => void;
  onPriceMaxChange: (value: string) => void;
  onNavigate: (path: string) => void;
  onAddToCart: (id: string) => void;
};

export function CatalogPage({
  categoryFilter,
  priceMin,
  priceMax,
  categoryOptions,
  filteredProducts,
  onCategoryChange,
  onPriceMinChange,
  onPriceMaxChange,
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
        <div className="container filters-wrap filters-three">
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
            <label htmlFor="price-min">Precio mínimo</label>
            <input
              id="price-min"
              type="number"
              min="0"
              placeholder="Ej: 3000"
              value={priceMin}
              onChange={(event) => onPriceMinChange(event.target.value)}
            />
          </div>

          <div className="filter-card">
            <label htmlFor="price-max">Precio máximo</label>
            <input
              id="price-max"
              type="number"
              min="0"
              placeholder="Ej: 50000"
              value={priceMax}
              onChange={(event) => onPriceMaxChange(event.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="catalog-section">
        <div className="container">
          {filteredProducts.length === 0 ? (
            <div className="empty-cart">
              <p>No se encontraron productos en este rango de precio.</p>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} onAddToCart={onAddToCart} onOpenProduct={(id) => onNavigate(`/product/${id}`)} />
          )}
        </div>
      </section>
    </>
  );
}
