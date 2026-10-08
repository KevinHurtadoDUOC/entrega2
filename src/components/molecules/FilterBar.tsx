import { Select } from '../atoms/Select';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';

export interface FilterBarProps {
  category: string;
  categoryOptions: string[];
  priceMin: string;
  priceMax: string;
  onCategoryChange: (value: string) => void;
  onPriceMinChange: (value: string) => void;
  onPriceMaxChange: (value: string) => void;
  onResetFilters?: () => void;
}

export function FilterBar({
  category,
  categoryOptions,
  priceMin,
  priceMax,
  onCategoryChange,
  onPriceMinChange,
  onPriceMaxChange,
  onResetFilters,
}: FilterBarProps) {
  const options = [
    { value: 'all', label: 'Todas las categorías' },
    ...categoryOptions.map((cat) => ({ value: cat, label: cat })),
  ];

  const hasActiveFilters = category !== 'all' || priceMin !== '' || priceMax !== '';

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body p-3 p-md-4">
        <div className="row g-3 align-items-end">
          <div className="col-12 col-md-4">
            <Select
              label="Filtrar por categoría"
              value={category}
              options={options}
              onChange={(e) => onCategoryChange(e.target.value)}
              wrapperClassName="mb-0"
            />
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <Input
              label="Precio mínimo ($)"
              type="number"
              min="0"
              placeholder="Ej: 5000"
              value={priceMin}
              onChange={(e) => onPriceMinChange(e.target.value)}
              icon="bi bi-tag"
              wrapperClassName="mb-0"
            />
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <Input
              label="Precio máximo ($)"
              type="number"
              min="0"
              placeholder="Ej: 50000"
              value={priceMax}
              onChange={(e) => onPriceMaxChange(e.target.value)}
              icon="bi bi-tag"
              wrapperClassName="mb-0"
            />
          </div>

          <div className="col-12 col-md-2 d-grid">
            {hasActiveFilters && onResetFilters && (
              <Button
                variant="outline-secondary"
                icon="bi bi-arrow-counterclockwise"
                onClick={onResetFilters}
                className="w-100"
              >
                Limpiar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
