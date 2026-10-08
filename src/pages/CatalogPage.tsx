import type { Product } from '../types';
import { SectionHeader } from '../components/atoms/SectionHeader';
import { FilterBar } from '../components/molecules/FilterBar';
import { ProductGrid } from '../components/organisms/ProductGrid';

export interface CatalogPageProps {
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
}

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
  const handleResetFilters = () => {
    onCategoryChange('all');
    onPriceMinChange('');
    onPriceMaxChange('');
  };

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        {/* Section Header Atom */}
        <SectionHeader
          eyebrow="Catálogo Oficial"
          title="Nuestros Cilindros y Accesorios"
          subtitle={`Mostrando ${filteredProducts.length} productos disponibles con stock inmediato.`}
        />

        {/* FilterBar Molecule */}
        <FilterBar
          category={categoryFilter}
          categoryOptions={categoryOptions}
          priceMin={priceMin}
          priceMax={priceMax}
          onCategoryChange={onCategoryChange}
          onPriceMinChange={onPriceMinChange}
          onPriceMaxChange={onPriceMaxChange}
          onResetFilters={handleResetFilters}
        />

        {/* ProductGrid Organism */}
        <ProductGrid
          products={filteredProducts}
          onAddToCart={onAddToCart}
          onOpenProduct={(id) => onNavigate(`/product/${id}`)}
          emptyMessage="No se encontraron productos que coincidan con los filtros seleccionados."
        />
      </div>
    </div>
  );
}
