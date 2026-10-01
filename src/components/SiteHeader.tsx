import type { NavigateFunction } from 'react-router-dom';
import type { User } from '../types';

type SiteHeaderProps = {
  cartCount: number;
  currentUser: User | null;
  onNavigate: NavigateFunction;
  onLogout: () => void;
};

export function SiteHeader({ cartCount, currentUser, onNavigate, onLogout }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <button type="button" className="brand button-brand" onClick={() => onNavigate('/')} aria-label="Distribuidora de Gas El Volcán">
          <div className="brand-mark">EV</div>
          <div className="brand-text">
            <span>Distribuidora de Gas</span>
            <strong>El Volcán</strong>
          </div>
        </button>

        <nav className="main-nav" aria-label="Navegación principal">
          <button type="button" className="nav-link" onClick={() => onNavigate('/')}>Inicio</button>
          <button type="button" className="nav-link" onClick={() => onNavigate('/catalog')}>Catálogo</button>
          <button type="button" className="nav-link" onClick={() => onNavigate('/about')}>Quiénes somos</button>
          <button type="button" className="nav-link" onClick={() => onNavigate('/contact')}>Contáctanos</button>
        </nav>

        <div className="nav-actions">
          <button type="button" className="cart-link" onClick={() => onNavigate('/cart')} aria-label="Ver carrito">
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{cartCount}</span>
          </button>

          {currentUser ? (
            <>
              <div className="user-badge">Hola, {currentUser.nombre}</div>
              <button type="button" className="btn btn-light logout-btn" onClick={onLogout}>Cerrar sesión</button>
            </>
          ) : (
            <>
              <button type="button" className="btn btn-light" onClick={() => onNavigate('/login')}>Iniciar sesión</button>
              <button type="button" className="btn btn-primary" onClick={() => onNavigate('/register')}>Registrarse</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
