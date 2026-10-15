import { useState } from 'react';
import type { User } from '../types';
import { getUsers, getProducts, getOrders, getCategories } from '../lib/storage';
import { useAppContext } from '../lib/AppContext';
import { SectionHeader } from '../components/atoms/SectionHeader';
import { AdminUsersPanel } from '../components/organisms/AdminUsersPanel';
import { AdminProductsPanel } from '../components/organisms/AdminProductsPanel';
import { AdminCategoriesPanel } from '../components/organisms/AdminCategoriesPanel';
import { AdminOrdersPanel } from '../components/organisms/AdminOrdersPanel';
import { AdminReportsPanel } from '../components/organisms/AdminReportsPanel';

export type AdminTab = 'usuarios' | 'productos' | 'categorias' | 'pedidos' | 'reportes';

export interface AdminDashboardProps {
  currentUser?: User | null;
  onNavigate?: (path: string) => void;
}

export function AdminDashboard({ currentUser }: AdminDashboardProps) {
  const { refreshCatalog } = useAppContext();
  const [tab, setTab] = useState<AdminTab>('usuarios');
  const [users, setUsers] = useState(() => getUsers());
  const [products, setProducts] = useState(() => getProducts());
  const [orders, setOrders] = useState(() => getOrders());
  const [categories, setCategories] = useState(() => getCategories());

  const refresh = () => {
    setUsers(getUsers());
    setProducts(getProducts());
    setOrders(getOrders());
    setCategories(getCategories());
    refreshCatalog();
  };

  const tabs: Array<{ id: AdminTab; label: string; icon: string }> = [
    { id: 'usuarios', label: 'Usuarios', icon: 'bi bi-people' },
    { id: 'categorias', label: 'Categorías', icon: 'bi bi-tags' },
    { id: 'productos', label: 'Productos', icon: 'bi bi-box-seam' },
    { id: 'pedidos', label: 'Pedidos', icon: 'bi bi-cart-check' },
    { id: 'reportes', label: 'Reportes y Métricas', icon: 'bi bi-graph-up' },
  ];

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        <SectionHeader
          eyebrow="Control Central"
          title="Panel de Administración General"
          subtitle={`Sesión activa: ${currentUser?.nombre ?? 'Administrador'}. Control global de usuarios, inventario, pedidos y reportes.`}
        />

        {/* Bootstrap Nav Tabs */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body p-2">
            <ul className="nav nav-pills nav-fill gap-2" role="tablist">
              {tabs.map((t) => (
                <li className="nav-item" key={t.id} role="presentation">
                  <button
                    type="button"
                    className={`nav-link fw-semibold d-flex align-items-center justify-content-center gap-2 py-2.5 ${
                      tab === t.id ? 'active' : 'text-dark'
                    }`}
                    onClick={() => setTab(t.id)}
                  >
                    <i className={t.icon} />
                    {t.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tab Panels */}
        <div className="tab-content">
          {tab === 'usuarios' && <AdminUsersPanel users={users} onRefresh={refresh} />}
          {tab === 'categorias' && <AdminCategoriesPanel categories={categories} onRefresh={refresh} />}
          {tab === 'productos' && <AdminProductsPanel products={products} categories={categories} onRefresh={refresh} />}
          {tab === 'pedidos' && <AdminOrdersPanel orders={orders} />}
          {tab === 'reportes' && (
            <AdminReportsPanel orders={orders} products={products} users={users} />
          )}
        </div>
      </div>
    </div>
  );
}
