import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { Notice } from './components/Notice';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
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
import { getCartCount, getCurrentUser, getProducts, queueNotice, removeCurrentUser } from './lib/storage';
import { canAccessRoute, isAuthenticated } from './lib/rbac';
import type { Notice as NoticeType, User } from './types';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [notice, setNotice] = useState<NoticeType | null>(null);
  const [cartCount, setCartCount] = useState<number>(getCartCount);
  const [currentUser, setCurrentUserState] = useState<User | null>(() => getCurrentUser());
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  useEffect(() => {
    const rawNotice = sessionStorage.getItem('ev_notice');
    if (!rawNotice) return;

    try {
      setNotice(JSON.parse(rawNotice));
    } catch {
      sessionStorage.removeItem('ev_notice');
    }

    sessionStorage.removeItem('ev_notice');
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(null), 2800);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === 'ev_cart') setCartCount(getCartCount());
      if (event.key === 'ev_currentUser') setCurrentUserState(getCurrentUser());
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    setCartCount(getCartCount());
  }, [location.pathname, currentUser]);

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

  const products = useMemo(() => getProducts(), [location.pathname]);
  const categoryOptions = useMemo(() => [...new Set(products.map((item) => item.categoria))], [products]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((item) => item.categoria === categoryFilter);
    }

    if (priceFilter !== 'all') {
      const [min, max] = priceFilter.split('-').map(Number);
      filtered = filtered.filter((item) => item.precioOferta >= min && item.precioOferta <= max);
    }

    return filtered;
  }, [products, categoryFilter, priceFilter]);

  const { cart, subtotal, shipping, total } = useMemo(() => getCartSnapshot(), [location.pathname, cartCount]);

  const handleAddToCart = (productId: string) => {
    addToCart(productId);
    setCartCount(getCartCount());
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
    checkoutCart();
    setCartCount(getCartCount());
  };

  const handleLogout = () => {
    removeCurrentUser();
    setCurrentUserState(null);
    queueNotice('Sesión cerrada.', 'info');
    navigate('/');
  };

  return (
    <>
      <Notice notice={notice} />
      <SiteHeader cartCount={cartCount} currentUser={currentUser} onNavigate={navigate} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage products={products} onNavigate={navigate} onAddToCart={handleAddToCart} onSetNotice={setNotice} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/catalog" element={<CatalogPage categoryFilter={categoryFilter} priceFilter={priceFilter} categoryOptions={categoryOptions} filteredProducts={filteredProducts} onCategoryChange={setCategoryFilter} onPriceChange={setPriceFilter} onNavigate={navigate} onAddToCart={handleAddToCart} />} />
          <Route path="/product/:id" element={<ProductPage onAddToCart={handleAddToCart} onNavigate={navigate} />} />
          <Route path="/cart" element={<CartPage cart={cart} products={products} subtotal={subtotal} shipping={shipping} total={total} onNavigate={navigate} onDecrease={handleDecreaseQty} onIncrease={handleIncreaseQty} onCheckout={handleCheckout} onClearCart={() => { clearCartItems(); setCartCount(getCartCount()); }} />} />
          <Route path="/login" element={<AuthPage mode="login" onNavigate={navigate} onSubmit={loginUser} />} />
          <Route path="/register" element={<AuthPage mode="register" onNavigate={navigate} onSubmit={registerUser} />} />
          <Route path="/admin" element={currentUser?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" replace />} />
          <Route path="/operador" element={currentUser?.role === 'operador' ? <OperadorDashboard /> : <Navigate to="/login" replace />} />
          <Route path="/repartidor" element={currentUser?.role === 'repartidor' ? <RepartidorDashboard /> : <Navigate to="/login" replace />} />
          <Route path="/cliente" element={currentUser?.role === 'cliente' ? <ClienteDashboard /> : <Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  );
}

export default App;
