import { useState } from 'react';
import { getOrders, saveOrders, getCurrentUser, formatCurrency } from '../lib/storage';
import type { OrderStatus } from '../types';

export function RepartidorDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const refresh = () => setRefreshKey((k) => k + 1);

  const currentUser = getCurrentUser();
  const allOrders = getOrders();

  // Solo ver pedidos asignados a este repartidor
  const myOrders = allOrders.filter((o) => o.repartidor === currentUser?.email);

  // Void the lint warning for refreshKey
  void refreshKey;

  const handleStatusChange = (orderId: string, nuevoEstado: OrderStatus) => {
    // Repartidor solo puede cambiar a 'en camino' o 'entregado'
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
    <section className="dashboard-section">
      <div className="container">
        <span className="eyebrow accent">Reparto</span>
        <h1>Mis Entregas</h1>
        <p className="dashboard-subtitle">Solo puedes ver los pedidos asignados a ti. Actualiza el estado cuando corresponda.</p>

        <div className="panel-header">
          <h2>Pedidos Activos ({pendientes.length})</h2>
        </div>

        {pendientes.length === 0 ? (
          <div className="empty-cart"><p>No tienes pedidos activos asignados.</p></div>
        ) : (
          <div className="orders-list">
            {pendientes.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div>
                    <span className="mono order-id">{order.id}</span>
                    <span className={`status-badge status-${order.estado.replace(' ', '-')}`}>{order.estado}</span>
                  </div>
                  <span className="order-total">{formatCurrency(order.total)}</span>
                </div>
                <div className="order-card-body">
                  <div className="order-info-row"><strong>Cliente:</strong> {order.clienteNombre}</div>
                  <div className="order-info-row"><strong>Dirección:</strong> {order.direccion}</div>
                  <div className="order-info-row"><strong>Fecha:</strong> {new Date(order.fecha).toLocaleString('es-CL')}</div>
                  <div className="order-items-mini">
                    <strong>Productos:</strong>
                    <ul>
                      {order.items.map((item, idx) => (
                        <li key={idx}>{item.nombre} x{item.cantidad}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="order-card-actions">
                  <div className="action-group">
                    <label className="action-label">Actualizar estado:</label>
                    <div className="repartidor-btns">
                      {order.estado !== 'en camino' && (
                        <button type="button" className="btn btn-primary btn-sm" onClick={() => handleStatusChange(order.id, 'en camino')}>
                          📦 Marcar En Camino
                        </button>
                      )}
                      {(order.estado === 'en camino' || order.estado === 'asignado') && (
                        <button type="button" className="btn btn-sm btn-success" onClick={() => handleStatusChange(order.id, 'entregado')}>
                          ✓ Marcar Entregado
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {entregados.length > 0 && (
          <>
            <div className="panel-header" style={{ marginTop: '2rem' }}>
              <h2>Entregas Completadas ({entregados.length})</h2>
            </div>
            <div className="orders-list">
              {entregados.map((order) => (
                <div key={order.id} className="order-card order-card-done">
                  <div className="order-card-header">
                    <div>
                      <span className="mono order-id">{order.id}</span>
                      <span className="status-badge status-entregado">entregado</span>
                    </div>
                    <span className="order-total">{formatCurrency(order.total)}</span>
                  </div>
                  <div className="order-card-body">
                    <div className="order-info-row"><strong>Cliente:</strong> {order.clienteNombre}</div>
                    <div className="order-info-row"><strong>Dirección:</strong> {order.direccion}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
