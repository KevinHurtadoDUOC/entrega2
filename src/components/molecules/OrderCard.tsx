import type { Order, OrderStatus, UserRole } from '../../types';
import { formatCurrency } from '../../lib/storage';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';

export interface OrderCardProps {
  order: Order;
  role?: UserRole;
  availableRepartidores?: Array<{ email: string; nombre: string; apellido: string }>;
  onAssignRepartidor?: (orderId: string, repartidorEmail: string) => void;
  onUpdateStatus?: (orderId: string, newStatus: OrderStatus) => void;
}

export function OrderCard({
  order,
  role = 'cliente',
  availableRepartidores = [],
  onAssignRepartidor,
  onUpdateStatus,
}: OrderCardProps) {
  const getStatusBadgeVariant = (status: OrderStatus) => {
    switch (status) {
      case 'entregado':
        return 'success';
      case 'en camino':
        return 'info';
      case 'asignado':
        return 'primary';
      case 'pendiente':
      default:
        return 'warning';
    }
  };

  const formattedDate = new Date(order.fecha).toLocaleString('es-CL');

  return (
    <div className="card shadow-sm border-0 mb-3">
      <div className="card-header bg-white border-bottom d-flex flex-wrap justify-content-between align-items-center py-3 gap-2">
        <div className="d-flex align-items-center gap-2">
          <span className="font-monospace fw-bold text-dark">{order.id}</span>
          <Badge variant={getStatusBadgeVariant(order.estado)} pill>
            {order.estado}
          </Badge>
        </div>
        <div className="text-end">
          <span className="fs-5 fw-bold text-primary">{formatCurrency(order.total)}</span>
        </div>
      </div>

      <div className="card-body">
        <div className="row g-2 mb-3 small text-muted">
          <div className="col-12 col-md-6">
            <strong>Cliente:</strong> {order.clienteNombre} ({order.cliente})
          </div>
          <div className="col-12 col-md-6">
            <strong>Dirección:</strong> {order.direccion}
          </div>
          <div className="col-12 col-md-6">
            <strong>Fecha:</strong> {formattedDate}
          </div>
          {order.repartidor && (
            <div className="col-12 col-md-6">
              <strong>Repartidor:</strong> {order.repartidor}
            </div>
          )}
        </div>

        <div className="bg-light p-3 rounded mb-3">
          <h6 className="fw-bold mb-2 small text-uppercase text-muted">Productos:</h6>
          <ul className="list-unstyled mb-0 small">
            {order.items.map((item, idx) => (
              <li key={idx} className="d-flex justify-content-between py-1 border-bottom border-light-subtle">
                <span>
                  {item.nombre} <span className="text-muted">× {item.cantidad}</span>
                </span>
                <span className="fw-semibold">
                  {formatCurrency(item.precioUnitario * item.cantidad)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Operador Controls */}
        {role === 'operador' && (
          <div className="row g-2 pt-2 border-top align-items-center">
            <div className="col-12 col-sm-6">
              <label className="form-label small fw-semibold mb-1">Repartidor:</label>
              <select
                className="form-select form-select-sm"
                value={order.repartidor || ''}
                onChange={(e) => onAssignRepartidor?.(order.id, e.target.value)}
              >
                <option value="">Sin asignar</option>
                {availableRepartidores.map((r) => (
                  <option key={r.email} value={r.email}>
                    {r.nombre} {r.apellido}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-sm-6">
              <label className="form-label small fw-semibold mb-1">Estado del pedido:</label>
              <select
                className="form-select form-select-sm"
                value={order.estado}
                onChange={(e) => onUpdateStatus?.(order.id, e.target.value as OrderStatus)}
              >
                <option value="pendiente">Pendiente</option>
                <option value="asignado">Asignado</option>
                <option value="en camino">En camino</option>
                <option value="entregado">Entregado</option>
              </select>
            </div>
          </div>
        )}

        {/* Repartidor Controls */}
        {role === 'repartidor' && order.estado !== 'entregado' && (
          <div className="pt-2 border-top d-flex gap-2 justify-content-end">
            {order.estado !== 'en camino' && (
              <Button
                variant="primary"
                size="sm"
                icon="bi bi-box-seam"
                onClick={() => onUpdateStatus?.(order.id, 'en camino')}
              >
                Marcar En Camino
              </Button>
            )}
            <Button
              variant="success"
              size="sm"
              icon="bi bi-check-circle"
              onClick={() => onUpdateStatus?.(order.id, 'entregado')}
            >
              Marcar Entregado
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
