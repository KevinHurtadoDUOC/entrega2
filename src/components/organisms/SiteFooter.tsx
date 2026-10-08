export interface SiteFooterProps {
  brandName?: string;
  year?: number;
  onNavigate?: (path: string) => void;
}

export function SiteFooter({
  brandName = 'Distribuidora de Gas El Volcán',
  year = 2026,
  onNavigate,
}: SiteFooterProps) {
  return (
    <footer className="bg-dark text-white-50 pt-5 pb-4 mt-auto border-top">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-5">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div
                className="rounded bg-warning text-dark d-flex align-items-center justify-content-center fw-bold"
                style={{ width: '36px', height: '36px' }}
              >
                <i className="bi bi-fire text-danger" />
              </div>
              <h5 className="text-white mb-0 fw-bold">{brandName}</h5>
            </div>
            <p className="small mb-3">
              Venta y distribución segura de gas licuado, cilindros de 5kg, 11kg, 15kg y 45kg,
              reguladores certificados y accesorios para todo el hogar y comercio.
            </p>
            {onNavigate && (
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm"
                  onClick={() => onNavigate('/catalog')}
                >
                  Ver Catálogo
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm"
                  onClick={() => onNavigate('/contact')}
                >
                  Contáctanos
                </button>
              </div>
            )}
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <h6 className="text-white text-uppercase fw-bold mb-3 small">Integrantes del Equipo</h6>
            <ul className="list-unstyled small mb-0">
              <li className="mb-2 d-flex align-items-center gap-2">
                <i className="bi bi-person text-warning" /> Kevin Hurtado
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <i className="bi bi-person text-warning" /> Sofia Muñoz
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <i className="bi bi-person text-warning" /> Nicolas Angulo
              </li>
            </ul>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <h6 className="text-white text-uppercase fw-bold mb-3 small">Información de Contacto</h6>
            <ul className="list-unstyled small mb-0">
              <li className="mb-2 d-flex align-items-center gap-2">
                <i className="bi bi-envelope text-warning" /> contacto@elvolcan.cl
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <i className="bi bi-telephone text-warning" /> +56 9 1234 5678
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <i className="bi bi-geo-alt text-warning" /> Santiago, Chile
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4 border-secondary" />

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center small">
          <span>&copy; {year} {brandName}. Todos los derechos reservados.</span>
          <span className="badge bg-secondary-subtle text-light mt-2 mt-sm-0">
            DSY1104 — Duoc UC {year}
          </span>
        </div>
      </div>
    </footer>
  );
}
