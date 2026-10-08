import { useState, useMemo } from 'react';
import type { OrderStatus, User } from '../types';
import { getOrders, saveOrders, getCurrentUser } from '../lib/storage';
import { SectionHeader } from '../components/atoms/SectionHeader';
import { StatBox } from '../components/atoms/StatBox';
import { OrderCard } from '../components/molecules/OrderCard';

export interface RepartidorDashboardProps {
  currentUser?: User | null;
  onRefresh?: () => void;
}

export function RepartidorDashboard({ currentUser: propUser, onRefresh }: RepartidorDashboardProps) {
  const [allOrders, setAllOrders] = useState(() => getOrders());
  const refresh = () => {
    setAllOrders(getOrders());
    if (onRefresh) onRefresh();
  };

  const currentUser = propUser ?? getCurrentUser();

  // Solo pedidos asignados a este repartidor
  const myOrders = useMemo(() => {
    return allOrders.filter((o) => o.repartidor === currentUser?.email);
  }, [allOrders, currentUser?.email]);

  const handleStatusChange = (orderId: string, nuevoEstado: OrderStatus) => {
    if (nuevoEstado !== 'en camino' && nuevoEstado !== 'entregado') return;

    const all = getOrders();
    const order = all.find((o) => o.id === orderId);
    if (!order) return;
    if (order.repartidor !== currentUser?.email) return;
    order.estado = nuevoEstado;
    saveOrders(all);
    refresh();
  };

  const pendientes = myOrders.filter((o) => o.estado !== 'entregado');
  const entregados = myOrders.filter((o) => o.estado === 'entregado');

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        <SectionHeader
          eyebrow="Ruta y Despacho"
          title="Mis Entregas Asignadas"
          subtitle={`Repartidor: ${currentUser?.nombre ?? 'Conductor'}. Revisa tus pedidos y actualiza el estado conforme avanzas en tu ruta.`}
        />

        <div className="row g-3 mb-4">
          <div className="col-12 col-sm-6">
            <StatBox
              label="Por Entregar"
              value={pendientes.length}
              variant="warning"
              icon="bi bi-box-seam"
              subtext="En ruta o asignados"
            />
          </div>
          <div className="col-12 col-sm-6">
            <StatBox
              label="Entregados Hoy"
              value={entregados.length}
              variant="success"
              icon="bi bi-check2-circle"
              subtext="Entregas completadas"
            />
          </div>
        </div>

        {/* Active deliveries */}
        <div className="mb-5">
          <h4 className="fw-bold mb-3 text-dark pb-2 border-bottom">
            <i className="bi bi-truck me-2 text-primary" />
            Pedidos Activos ({pendientes.length})
          </h4>

          {pendientes.length === 0 ? (
            <div className="card shadow-sm border-0 text-center py-4">
              <div className="card-body">
                <i className="bi bi-check-all fs-1 text-success d-block mb-2" />
                <p className="text-muted mb-0">No tienes pedidos pendientes de entrega asignados en este momento.</p>
              </div>
            </div>
          ) : (
            <div className="row g-3">
              {pendientes.map((order) => (
                <div className="col-12" key={order.id}>
                  <OrderCard
                    order={order}
                    role="repartidor"
                    onUpdateStatus={handleStatusChange}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed deliveries */}
        {entregados.length > 0 && (
          <div>
            <h4 className="fw-bold mb-3 text-dark pb-2 border-bottom">
              <i className="bi bi-check2-all me-2 text-success" />
              Entregas Completadas ({entregados.length})
            </h4>

            <div className="row g-3">
              {entregados.map((order) => (
                <div className="col-12" key={order.id}>
                  <OrderCard order={order} role="cliente" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
