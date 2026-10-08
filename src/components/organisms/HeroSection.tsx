import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
import { formatCurrency } from '../../lib/storage';

export interface HeroSectionProps {
  onExploreCatalog: () => void;
  onRequestContact: () => void;
}

export function HeroSection({ onExploreCatalog, onRequestContact }: HeroSectionProps) {
  return (
    <section className="py-5 bg-gradient-light border-bottom">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-12 col-lg-7">
            <span className="badge bg-warning-subtle text-warning-emphasis text-uppercase px-3 py-2 mb-3 fw-semibold">
              <i className="bi bi-shield-check me-1" />
              Calidez y seguridad en cada hogar
            </span>
            <h1 className="display-5 fw-bold text-dark lh-tight mb-3">
              Gas para tu casa, negocio y proyectos.
            </h1>
            <p className="lead text-muted mb-4">
              En Distribuidora de Gas El Volcán entregamos cilindros, reguladores,
              mangueras y kits de instalación con atención rápida y precios competitivos.
            </p>

            <div className="d-flex flex-wrap gap-3 mb-4">
              <Button
                variant="primary"
                size="lg"
                icon="bi bi-grid"
                onClick={onExploreCatalog}
              >
                Ver catálogo
              </Button>
              <Button
                variant="outline-secondary"
                size="lg"
                icon="bi bi-chat-dots"
                onClick={onRequestContact}
              >
                Solicitar asesoría
              </Button>
            </div>

            <div className="row g-3 pt-3 border-top">
              <div className="col-auto d-flex align-items-center gap-2">
                <i className="bi bi-check-circle-fill text-success fs-5" />
                <span className="small fw-semibold text-dark">Entrega inmediata</span>
              </div>
              <div className="col-auto d-flex align-items-center gap-2">
                <i className="bi bi-check-circle-fill text-success fs-5" />
                <span className="small fw-semibold text-dark">Productos certificados</span>
              </div>
              <div className="col-auto d-flex align-items-center gap-2">
                <i className="bi bi-check-circle-fill text-success fs-5" />
                <span className="small fw-semibold text-dark">Soporte experto</span>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="position-relative">
              <div className="card shadow border-0 bg-dark text-white p-4 rounded-4 mb-3">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <Badge variant="warning" pill>
                    Oferta Destacada
                  </Badge>
                  <i className="bi bi-fire fs-3 text-warning" />
                </div>
                <h3 className="h4 fw-bold mb-1">Cilindro 15 kg</h3>
                <p className="text-white-50 small mb-3">
                  Ideal para hogares con alto consumo, calefacción y cocina diaria.
                </p>
                <div className="d-flex justify-content-between align-items-baseline">
                  <span className="fs-3 fw-bold text-warning">
                    {formatCurrency(14500)}
                  </span>
                  <span className="text-white-50 text-decoration-line-through small">
                    {formatCurrency(18000)}
                  </span>
                </div>
              </div>

              <div className="card shadow-sm border-0 bg-white p-3 rounded-4 ms-lg-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="p-3 bg-primary-subtle text-primary rounded-3">
                    <i className="bi bi-lightning-charge-fill fs-4" />
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">Regulador Dual & Manguera</h6>
                    <small className="text-success fw-semibold">
                      <i className="bi bi-dot" />
                      Disponible con despacho hoy
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
