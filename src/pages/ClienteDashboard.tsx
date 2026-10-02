import { getOrders, getCurrentUser, formatCurrency } from '../lib/storage';

export function ClienteDashboard() {
  const currentUser = getCurrentUser();
  const allOrders = getOrders();
  const myOrders = allOrders.filter((o) => o.cliente === currentUser?.email);

  return (
    <section className="dashboard-section">
      <div className="container">
        <span className="eyebrow accent">Cliente</span>
        <h1>Mi Cuenta</h1>
        <p className="dashboard-subtitle">Bienvenido, {currentUser?.nombre}. Aquí puedes ver tus pedidos y su estado en tiempo real.</p>

        <div className="panel-header">
          <h2>Mis Pedidos ({myOrders.length})</h2>
        </div>

        {myOrders.length === 0 ? (
          <div className="empty-cart"><p>Aún no has realizado ningún pedido.</p></div>
        ) : (
          <div className="orders-list">
            {myOrders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div>
                    <span className="mono order-id">{order.id}</span>
                    <span className={`status-badge status-${order.estado.replace(' ', '-')}`}>{order.estado}</span>
                  </div>
                  <span className="order-total">{formatCurrency(order.total)}</span>
                </div>
                <div className="order-card-body">
                  <div className="order-info-row"><strong>Dirección:</strong> {order.direccion}</div>
                  <div className="order-info-row"><strong>Fecha:</strong> {new Date(order.fecha).toLocaleString('es-CL')}</div>
                  {order.repartidor && (
                    <div className="order-info-row"><strong>Repartidor asignado:</strong> {order.repartidor}</div>
                  )}
                  <div className="order-items-mini">
                    <strong>Productos:</strong>
                    <ul>
                      {order.items.map((item, idx) => (
                        <li key={idx}>{item.nombre} x{item.cantidad} — {formatCurrency(item.precioUnitario * item.cantidad)}</li>
                      ))}
                    </ul>
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
