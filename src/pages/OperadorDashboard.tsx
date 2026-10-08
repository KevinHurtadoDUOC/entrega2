import { useState, useMemo } from 'react';
import type { OrderStatus, User } from '../types';
import { getOrders, saveOrders, getUsers } from '../lib/storage';
import { SectionHeader } from '../components/atoms/SectionHeader';
import { StatBox } from '../components/atoms/StatBox';
import { OrderCard } from '../components/molecules/OrderCard';

export interface OperadorDashboardProps {
  currentUser?: User | null;
  onRefresh?: () => void;
}

export function OperadorDashboard({ currentUser: propUser, onRefresh }: OperadorDashboardProps) {
  const [orders, setOrders] = useState(() => getOrders());
  const [users, setUsers] = useState(() => getUsers());

  const refresh = () => {
    setOrders(getOrders());
    setUsers(getUsers());
    if (onRefresh) onRefresh();
  };

  const repartidores = useMemo(() => {
    return users
      .filter((u) => String(u.role ?? '') === 'repartidor' && u.activo !== false)
      .map((u) => ({
        email: String(u.email ?? ''),
        nombre: String(u.nombre ?? ''),
        apellido: String(u.apellido ?? ''),
      }));
  }, [users]);

  const handleAssign = (orderId: string, repartidorEmail: string) => {
    const all = getOrders();
    const order = all.find((o) => o.id === orderId);
    if (!order) return;
    order.repartidor = repartidorEmail;
    order.estado = 'asignado';
    saveOrders(all);
    refresh();
  };

  const handleStatusChange = (orderId: string, estado: OrderStatus) => {
    const all = getOrders();
    const order = all.find((o) => o.id === orderId);
    if (!order) return;
    order.estado = estado;
    saveOrders(all);
    refresh();
  };

  const stats = useMemo(() => {
    return {
      pendientes: orders.filter((o) => o.estado === 'pendiente').length,
      asignados: orders.filter((o) => o.estado === 'asignado').length,
      enCamino: orders.filter((o) => o.estado === 'en camino').length,
      entregados: orders.filter((o) => o.estado === 'entregado').length,
    };
  }, [orders]);

  const todayStr = new Date().toLocaleDateString('es-CL');

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        <SectionHeader
          eyebrow="Operaciones y Logística"
          title="Panel de Recepción y Despacho"
          subtitle={`Operador: ${propUser?.nombre ?? 'Central'}. Gestiona pedidos del día y asigna personal de entrega.`}
        />

        {/* Operational Stats Grid */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-sm-6 col-md-3">
            <StatBox
              label="Pendientes"
              value={stats.pendientes}
              variant="warning"
              icon="bi bi-clock"
              subtext="Requieren asignación"
            />
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <StatBox
              label="Asignados"
              value={stats.asignados}
              variant="primary"
              icon="bi bi-person-check"
              subtext="Listos para ruta"
            />
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <StatBox
              label="En Camino"
              value={stats.enCamino}
              variant="info"
              icon="bi bi-truck"
              subtext="En tránsito a destino"
            />
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <StatBox
              label="Entregados"
              value={stats.entregados}
              variant="success"
              icon="bi bi-check2-all"
              subtext="Completados con éxito"
            />
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
          <h4 className="fw-bold mb-0 text-dark">
            <i className="bi bi-list-check me-2 text-primary" />
            Pedidos del Día — {todayStr} ({orders.length} totales)
          </h4>
        </div>

        {orders.length === 0 ? (
          <div className="card shadow-sm border-0 text-center py-5">
            <div className="card-body">
              <i className="bi bi-inbox fs-1 text-muted d-block mb-3" />
              <h5 className="text-muted fw-normal">No hay pedidos registrados para la jornada.</h5>
            </div>
          </div>
        ) : (
          <div className="row g-3">
            {orders.map((order) => (
              <div className="col-12" key={order.id}>
                <OrderCard
                  order={order}
                  role="operador"
                  availableRepartidores={repartidores}
                  onAssignRepartidor={handleAssign}
                  onUpdateStatus={handleStatusChange}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
