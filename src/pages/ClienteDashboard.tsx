import { useMemo } from 'react';
import type { Order, User } from '../types';
import { getOrders, getCurrentUser } from '../lib/storage';
import { SectionHeader } from '../components/atoms/SectionHeader';
import { OrderCard } from '../components/molecules/OrderCard';
import { Button } from '../components/atoms/Button';

export interface ClienteDashboardProps {
  currentUser?: User | null;
  orders?: Order[];
  onNavigate?: (path: string) => void;
}

export function ClienteDashboard({
  currentUser: propUser,
  orders: propOrders,
  onNavigate,
}: ClienteDashboardProps) {
  const currentUser = propUser ?? getCurrentUser();
  const allOrders = propOrders ?? getOrders();

  const myOrders = useMemo(() => {
    return allOrders.filter((o) => o.cliente === currentUser?.email);
  }, [allOrders, currentUser?.email]);

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        <SectionHeader
          eyebrow="Portal del Cliente"
          title="Mi Cuenta y Pedidos"
          subtitle={`Bienvenido, ${currentUser?.nombre ?? 'Cliente'}. Aquí puedes revisar el estado de tus compras en tiempo real.`}
          action={
            onNavigate
              ? {
                  label: 'Comprar cilindros',
                  onClick: () => onNavigate('/catalog'),
                  icon: 'bi bi-cart-plus',
                }
              : undefined
          }
        />

        <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
          <h4 className="fw-bold mb-0 text-dark">
            <i className="bi bi-clock-history me-2 text-primary" />
            Historial de Pedidos ({myOrders.length})
          </h4>
        </div>

        {myOrders.length === 0 ? (
          <div className="card shadow-sm border-0 text-center py-5 px-3">
            <div className="card-body">
              <i className="bi bi-bag-x fs-1 text-muted d-block mb-3" />
              <h5 className="fw-bold text-dark mb-2">Aún no has realizado pedidos</h5>
              <p className="text-muted mb-4">
                Explora nuestro catálogo para encargar cilindros de gas o accesorios con entrega a domicilio.
              </p>
              {onNavigate && (
                <Button variant="primary" icon="bi bi-shop" onClick={() => onNavigate('/catalog')}>
                  Ir al catálogo
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="row g-3">
            {myOrders.map((order) => (
              <div className="col-12" key={order.id}>
                <OrderCard order={order} role="cliente" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
