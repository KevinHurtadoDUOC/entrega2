import type { User } from '../../types';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';

export interface SiteHeaderProps {
  cartCount: number;
  currentUser: User | null;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export function SiteHeader({ cartCount, currentUser, onNavigate, onLogout }: SiteHeaderProps) {
  return (
    <header className="navbar navbar-expand-lg bg-white shadow-sm sticky-top border-bottom py-2">
      <div className="container">
        {/* Brand */}
        <button
          type="button"
          className="navbar-brand d-flex align-items-center gap-2 border-0 bg-transparent p-0 text-start"
          onClick={() => onNavigate('/')}
          aria-label="Distribuidora de Gas El Volcán"
        >
          <div
            className="rounded-3 bg-warning text-dark d-flex align-items-center justify-content-center fw-bold shadow-sm"
            style={{ width: '42px', height: '42px' }}
          >
            <i className="bi bi-fire fs-4 text-danger" />
          </div>
          <div>
            <span className="small text-muted d-block lh-1 text-uppercase" style={{ fontSize: '0.72rem' }}>
              Distribuidora de Gas
            </span>
            <strong className="text-dark fs-5 fw-extrabold lh-1">El Volcán</strong>
          </div>
        </button>

        {/* Navigation items */}
        <nav className="d-none d-md-flex align-items-center gap-1 mx-auto" aria-label="Navegación principal">
          <Button variant="link" className="text-dark text-decoration-none px-3" onClick={() => onNavigate('/')}>
            Inicio
          </Button>
          <Button variant="link" className="text-dark text-decoration-none px-3" onClick={() => onNavigate('/catalog')}>
            Catálogo
          </Button>
          <Button variant="link" className="text-dark text-decoration-none px-3" onClick={() => onNavigate('/about')}>
            Quiénes somos
          </Button>
          <Button variant="link" className="text-dark text-decoration-none px-3" onClick={() => onNavigate('/contact')}>
            Contáctanos
          </Button>
        </nav>

        {/* User and Cart Actions */}
        <div className="d-flex align-items-center gap-2">
          {/* Cart button */}
          <button
            type="button"
            className="btn btn-outline-secondary position-relative me-1 d-flex align-items-center gap-1.5"
            onClick={() => onNavigate('/cart')}
            aria-label="Ver carrito"
          >
            <i className="bi bi-cart3 fs-5" />
            <span className="d-none d-sm-inline small fw-semibold">Carrito</span>
            {cartCount > 0 && (
              <Badge variant="primary" pill className="ms-1">
                {cartCount}
              </Badge>
            )}
          </button>

          {currentUser ? (
            <div className="d-flex align-items-center gap-2">
              {currentUser.role === 'admin' && (
                <Button variant="outline-primary" size="sm" icon="bi bi-speedometer2" onClick={() => onNavigate('/admin')}>
                  Admin
                </Button>
              )}
              {currentUser.role === 'operador' && (
                <Button variant="outline-primary" size="sm" icon="bi bi-sliders" onClick={() => onNavigate('/operador')}>
                  Operador
                </Button>
              )}
              {currentUser.role === 'repartidor' && (
                <Button variant="outline-primary" size="sm" icon="bi bi-truck" onClick={() => onNavigate('/repartidor')}>
                  Repartos
                </Button>
              )}
              {currentUser.role === 'cliente' && (
                <Button variant="outline-primary" size="sm" icon="bi bi-person-circle" onClick={() => onNavigate('/cliente')}>
                  Mi Cuenta
                </Button>
              )}

              <span className="badge bg-light text-dark border d-none d-lg-inline-block py-2 px-2.5">
                <i className="bi bi-person-fill text-muted me-1" />
                {currentUser.nombre} ({currentUser.role})
              </span>

              <Button variant="outline-danger" size="sm" icon="bi bi-box-arrow-right" onClick={onLogout}>
                Salir
              </Button>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <Button variant="outline-secondary" size="sm" onClick={() => onNavigate('/login')}>
                Ingresar
              </Button>
              <Button variant="primary" size="sm" onClick={() => onNavigate('/register')}>
                Registrarse
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
