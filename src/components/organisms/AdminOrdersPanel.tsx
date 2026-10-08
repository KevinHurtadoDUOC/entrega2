import type { Order } from '../../types';
import { formatCurrency } from '../../lib/storage';
import { Badge } from '../atoms/Badge';

export interface AdminOrdersPanelProps {
  orders: Order[];
}

export function AdminOrdersPanel({ orders }: AdminOrdersPanelProps) {
  const getStatusVariant = (estado: string) => {
    switch (estado) {
      case 'entregado':
        return 'success';
      case 'en camino':
        return 'info';
      case 'asignado':
        return 'primary';
      default:
        return 'warning';
    }
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white border-bottom py-3">
        <h5 className="mb-0 fw-bold text-dark">
          <i className="bi bi-cart-check me-2 text-primary" />
          Todos los Pedidos ({orders.length})
        </h5>
        <small className="text-muted">Registro global de pedidos y estado de entregas</small>
      </div>

      <div className="card-body p-0">
        {orders.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-inbox fs-1 text-muted d-block mb-2" />
            <p className="text-muted mb-0">No hay pedidos registrados en el sistema aún.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Dirección</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Repartidor</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td className="font-monospace small fw-bold">{o.id}</td>
                    <td>{o.clienteNombre}</td>
                    <td>{o.direccion}</td>
                    <td className="fw-bold text-primary">{formatCurrency(o.total)}</td>
                    <td>
                      <Badge variant={getStatusVariant(o.estado)} pill>
                        {o.estado}
                      </Badge>
                    </td>
                    <td>
                      {o.repartidor ? (
                        <span className="small text-dark">{o.repartidor}</span>
                      ) : (
                        <span className="text-muted small">—</span>
                      )}
                    </td>
                    <td className="small text-muted">
                      {new Date(o.fecha).toLocaleDateString('es-CL')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
