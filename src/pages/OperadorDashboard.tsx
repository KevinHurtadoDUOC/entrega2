import { useState } from 'react';
import { getOrders, saveOrders, getUsers, formatCurrency } from '../lib/storage';
import type { OrderStatus } from '../types';

export function OperadorDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const refresh = () => setRefreshKey((k) => k + 1);

  const orders = getOrders();
  const users = getUsers();
  const repartidores = users.filter((u) => String(u.role ?? '') === 'repartidor' && u.activo !== false);

  // Void the lint warning for refreshKey by referencing it
  void refreshKey;

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

  const todayStr = new Date().toLocaleDateString('es-CL');

  return (
    <section className="dashboard-section">
      <div className="container">
        <span className="eyebrow accent">Operaciones</span>
        <h1>Recepción y Despacho</h1>
        <p className="dashboard-subtitle">Gestiona los pedidos del día, asigna repartidores y actualiza estados.</p>

        <div className="panel-header">
          <h2>Pedidos del día — {todayStr} ({orders.length} total)</h2>
        </div>

        {orders.length === 0 ? (
          <div className="empty-cart"><p>No hay pedidos registrados aún.</p></div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div>
                    <span className="mono order-id">{order.id}</span>
                    <span className={`status-badge status-${order.estado.replace(' ', '-')}`}>{order.estado}</span>
                  </div>
                  <span className="order-total">{formatCurrency(order.total)}</span>
                </div>
                <div className="order-card-body">
                  <div className="order-info-row">
                    <strong>Cliente:</strong> {order.clienteNombre}
                  </div>
                  <div className="order-info-row">
                    <strong>Dirección:</strong> {order.direccion}
                  </div>
                  <div className="order-info-row">
                    <strong>Fecha:</strong> {new Date(order.fecha).toLocaleString('es-CL')}
                  </div>
                  <div className="order-items-mini">
                    <strong>Productos:</strong>
                    <ul>
                      {order.items.map((item, idx) => (
                        <li key={idx}>{item.nombre} x{item.cantidad} — {formatCurrency(item.precioUnitario * item.cantidad)}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="order-card-actions">
                  <div className="action-group">
                    <label className="action-label">Repartidor:</label>
                    <select
                      value={order.repartidor || ''}
                      onChange={(e) => handleAssign(order.id, e.target.value)}
                      className="action-select"
                    >
                      <option value="">Sin asignar</option>
                      {repartidores.map((r) => (
                        <option key={String(r.email)} value={String(r.email)}>{String(r.nombre)} {String(r.apellido)}</option>
                      ))}
                    </select>
                  </div>
                  <div className="action-group">
                    <label className="action-label">Estado:</label>
                    <select
                      value={order.estado}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className="action-select"
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="asignado">Asignado</option>
                      <option value="en camino">En camino</option>
                      <option value="entregado">Entregado</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
