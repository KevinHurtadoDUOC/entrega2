import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Notice } from './components/organisms/Notice';
import { SiteFooter } from './components/organisms/SiteFooter';
import { SiteHeader } from './components/organisms/SiteHeader';
import { AboutPage } from './pages/AboutPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AuthPage } from './pages/AuthPage';
import { CartPage } from './pages/CartPage';
import { CatalogPage } from './pages/CatalogPage';
import { ClienteDashboard } from './pages/ClienteDashboard';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { OperadorDashboard } from './pages/OperadorDashboard';
import { ProductPage } from './pages/ProductPage';
import { RepartidorDashboard } from './pages/RepartidorDashboard';
import { loginUser, registerUser } from './lib/auth';
import { addToCart, checkoutCart, clearCartItems, decreaseQty, getCartSnapshot, increaseQty } from './lib/cart';
import { getCartCount, getCategories, getCurrentUser, getProducts, queueNotice, removeCurrentUser, ensureSeedUsers } from './lib/storage';
import { canAccessRoute, isAuthenticated } from './lib/rbac';
import { AppContext } from './lib/AppContext';
import type { Notice as NoticeState, NoticeType, User } from './types';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [notice, setNotice] = useState<NoticeState | null>(() => {
    const rawNotice = sessionStorage.getItem('ev_notice');
    if (!rawNotice) return null;
    try {
      const parsed = JSON.parse(rawNotice) as NoticeState;
      sessionStorage.removeItem('ev_notice');
      return parsed;
    } catch (e) {
      void e;
      sessionStorage.removeItem('ev_notice');
      return null;
    }
  });

  const [cartCount, setCartCount] = useState<number>(() => getCartCount());
  const [currentUser, setCurrentUserState] = useState<User | null>(() => getCurrentUser());
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  useEffect(() => {
    ensureSeedUsers();
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(null), 4500);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === 'ev_cart') setCartCount(getCartCount());
      if (event.key === 'ev_currentUser') setCurrentUserState(getCurrentUser());
    };
    const onAuthChange = () => setCurrentUserState(getCurrentUser());
    const onNoticeUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<NoticeState>;
      if (customEvent.detail) {
        setNotice(customEvent.detail);
      }
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener('ev_auth_change', onAuthChange);
    window.addEventListener('ev_notice_updated', onNoticeUpdate);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('ev_auth_change', onAuthChange);
      window.removeEventListener('ev_notice_updated', onNoticeUpdate);
    };
  }, []);

  useEffect(() => {
    if (!canAccessRoute(currentUser, location.pathname)) {
      if (isAuthenticated(currentUser)) {
        queueNotice('No tienes permisos para acceder a esta vista.', 'error');
      } else {
        queueNotice('Debes iniciar sesión para acceder.', 'error');
      }
      navigate('/login', { replace: true });
    }
  }, [currentUser, location.pathname, navigate]);

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  const [products, setProducts] = useState(() => getProducts());
  const [categories, setCategories] = useState(() => getCategories());
  const categoryOptions = useMemo(() => [...new Set(products.map((item) => item.categoria))], [products]);

  const refreshCatalog = () => {
    setProducts(getProducts());
    setCategories(getCategories());
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((item) => item.categoria === categoryFilter);
    }

    const min = priceMin ? Number(priceMin) : 0;
    const max = priceMax ? Number(priceMax) : Infinity;

    if (min > 0 || max < Infinity) {
      filtered = filtered.filter((item) => item.precioOferta >= min && item.precioOferta <= max);
    }

    return filtered;
  }, [products, categoryFilter, priceMin, priceMax]);

  const { cart, subtotal, shipping, total } = getCartSnapshot();

  const syncNoticeFromSession = () => {
    const rawNotice = sessionStorage.getItem('ev_notice');
    if (rawNotice) {
      try {
        setNotice(JSON.parse(rawNotice));
      } catch (e) {
        void e;
      }
      sessionStorage.removeItem('ev_notice');
    }
  };

  const handleAddToCart = (productId: string) => {
    addToCart(productId);
    setCartCount(getCartCount());
    syncNoticeFromSession();
  };

  const handleIncreaseQty = (productId: string) => {
    increaseQty(productId);
    setCartCount(getCartCount());
  };

  const handleDecreaseQty = (productId: string) => {
    decreaseQty(productId);
    setCartCount(getCartCount());
  };

  const handleCheckout = () => {
    const success = checkoutCart();
    syncNoticeFromSession();
    setCartCount(getCartCount());
    if (success) {
      navigate('/cliente');
    } else if (!getCurrentUser()) {
      navigate('/login');
    }
  };

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const success = loginUser(event);
    syncNoticeFromSession();

    if (success) {
      const user = getCurrentUser();
      setCurrentUserState(user);
      if (user?.role === 'admin') navigate('/admin');
      else if (user?.role === 'operador') navigate('/operador');
      else if (user?.role === 'repartidor') navigate('/repartidor');
      else if (user?.role === 'cliente') navigate('/cliente');
      else navigate('/');
    }
  };

  const handleRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const success = registerUser(event);
    syncNoticeFromSession();

    if (success) {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    removeCurrentUser();
    setCurrentUserState(null);
    setNotice({ message: 'Sesión cerrada con éxito.', type: 'info' });
    navigate('/');
  };

  const showAlert = (message: string, type: NoticeType = 'info', title?: string) => {
    setNotice({ message, type, title });
  };

  const contextValue = useMemo(
    () => ({
      currentUser,
      products,
      categories,
      notice,
      setNotice,
      showAlert,
      refreshCatalog,
    }),
    [currentUser, products, categories, notice]
  );

  // --- Repartidor: interfaz aislada sin navegación del sitio público ---
  if (currentUser?.role === 'repartidor') {
    return (
      <AppContext.Provider value={contextValue}>
        <div className="d-flex flex-column min-vh-100 bg-light">
          {/* Minimal header for repartidor */}
          <header className="navbar bg-white shadow-sm sticky-top border-bottom py-2">
            <div className="container d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <div
                  className="rounded-3 bg-warning text-dark d-flex align-items-center justify-content-center fw-bold shadow-sm"
                  style={{ width: '42px', height: '42px' }}
                >
                  <i className="bi bi-truck fs-4 text-primary" />
                </div>
                <div>
                  <span className="small text-muted d-block lh-1 text-uppercase" style={{ fontSize: '0.72rem' }}>
                    Panel Repartidor
                  </span>
                  <strong className="text-dark fs-5 fw-extrabold lh-1">El Volcán</strong>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-light text-dark border py-2 px-2">
                  <i className="bi bi-person-fill text-muted me-1" />
                  {currentUser.nombre} ({currentUser.role})
                </span>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right" />
                  Salir
                </button>
              </div>
            </div>
          </header>
          <main className="flex-grow-1">
            <RepartidorDashboard currentUser={currentUser} />
          </main>
          <Notice notice={notice} onClose={() => setNotice(null)} />
        </div>
      </AppContext.Provider>
    );
  }

  return (
    <AppContext.Provider value={contextValue}>
      <div className="d-flex flex-column min-vh-100 bg-light">
        <SiteHeader
          cartCount={cartCount}
          currentUser={currentUser}
          onNavigate={navigate}
          onLogout={handleLogout}
        />
        <main className="flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  products={products}
                  onNavigate={navigate}
                  onAddToCart={handleAddToCart}
                  onSetNotice={setNotice}
                />
              }
            />
            <Route path="/about" element={<AboutPage onNavigate={navigate} />} />
            <Route path="/contact" element={<ContactPage onSetNotice={setNotice} />} />
            <Route
              path="/catalog"
              element={
                <CatalogPage
                  categoryFilter={categoryFilter}
                  priceMin={priceMin}
                  priceMax={priceMax}
                  categoryOptions={categoryOptions}
                  filteredProducts={filteredProducts}
                  onCategoryChange={setCategoryFilter}
                  onPriceMinChange={setPriceMin}
                  onPriceMaxChange={setPriceMax}
                  onNavigate={navigate}
                  onAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              path="/product/:id"
              element={<ProductPage onAddToCart={handleAddToCart} onNavigate={navigate} />}
            />
            <Route
              path="/cart"
              element={
                <CartPage
                  cart={cart}
                  products={products}
                  subtotal={subtotal}
                  shipping={shipping}
                  total={total}
                  onNavigate={navigate}
                  onDecrease={handleDecreaseQty}
                  onIncrease={handleIncreaseQty}
                  onCheckout={handleCheckout}
                  onClearCart={() => {
                    clearCartItems();
                    setCartCount(getCartCount());
                  }}
                />
              }
            />
            <Route
              path="/login"
              element={<AuthPage mode="login" onNavigate={navigate} onSubmit={handleLoginSubmit} />}
            />
            <Route
              path="/register"
              element={
                <AuthPage mode="register" onNavigate={navigate} onSubmit={handleRegisterSubmit} />
              }
            />
            <Route
              path="/admin"
              element={
                currentUser?.role === 'admin' ? (
                  <AdminDashboard currentUser={currentUser} onNavigate={navigate} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/operador"
              element={
                currentUser?.role === 'operador' ? (
                  <OperadorDashboard currentUser={currentUser} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/repartidor"
              element={
                currentUser?.role === 'repartidor' ? (
                  <RepartidorDashboard currentUser={currentUser} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/cliente"
              element={
                currentUser?.role === 'cliente' ? (
                  <ClienteDashboard currentUser={currentUser} onNavigate={navigate} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <SiteFooter onNavigate={navigate} />
        <Notice notice={notice} onClose={() => setNotice(null)} />
      </div>
    </AppContext.Provider>
  );
}

export default App;
