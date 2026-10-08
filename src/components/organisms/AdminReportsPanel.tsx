import { useMemo } from 'react';
import type { Order, Product } from '../../types';
import { formatCurrency } from '../../lib/storage';
import { StatBox } from '../atoms/StatBox';

export interface AdminReportsPanelProps {
  orders: Order[];
  products: Product[];
  users: Array<Record<string, string | boolean | undefined>>;
}

export function AdminReportsPanel({ orders, products, users }: AdminReportsPanelProps) {
  const stats = useMemo(() => {
    const totalVentas = orders.reduce((s, o) => s + o.total, 0);
    const pedidosPendientes = orders.filter((o) => o.estado === 'pendiente').length;
    const pedidosEntregados = orders.filter((o) => o.estado === 'entregado').length;
    const pedidosEnCamino = orders.filter((o) => o.estado === 'en camino').length;
    const totalProductos = products.length;
    const totalUsuarios = users.length;
    const stockBajo = products.filter((p) => p.stock <= 5).length;
    const categorias = [...new Set(products.map((p) => p.categoria))].length;
    return {
      totalVentas,
      pedidosPendientes,
      pedidosEntregados,
      pedidosEnCamino,
      totalProductos,
      totalUsuarios,
      stockBajo,
      categorias,
    };
  }, [orders, products, users]);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white border-bottom py-3">
        <h5 className="mb-0 fw-bold text-dark">
          <i className="bi bi-graph-up-arrow me-2 text-primary" />
          Reportes y Métricas del Sistema
        </h5>
        <small className="text-muted">Resumen ejecutivo y control de inventario en tiempo real</small>
      </div>

      <div className="card-body p-4">
        <div className="row g-3">
          <div className="col-12 col-md-6 col-lg-4">
            <StatBox
              label="Total Ventas"
              value={formatCurrency(stats.totalVentas)}
              variant="success"
              icon="bi bi-cash-stack"
              subtext="Monto acumulado"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <StatBox
              label="Pedidos Totales"
              value={orders.length}
              variant="primary"
              icon="bi bi-bag-check"
              subtext="Histórico completo"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <StatBox
              label="Pendientes Despacho"
              value={stats.pedidosPendientes}
              variant="warning"
              icon="bi bi-hourglass-split"
              subtext="Requieren asignación"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <StatBox
              label="En Camino"
              value={stats.pedidosEnCamino}
              variant="info"
              icon="bi bi-truck"
              subtext="En tránsito con repartidor"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <StatBox
              label="Entregados con Éxito"
              value={stats.pedidosEntregados}
              variant="success"
              icon="bi bi-check2-all"
              subtext="Entregas completadas"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <StatBox
              label="Usuarios Registrados"
              value={stats.totalUsuarios}
              variant="dark"
              icon="bi bi-people"
              subtext="Clientes y personal"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <StatBox
              label="Total Productos"
              value={stats.totalProductos}
              variant="primary"
              icon="bi bi-boxes"
              subtext="Catálogo activo"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <StatBox
              label="Categorías"
              value={stats.categorias}
              variant="secondary"
              icon="bi bi-tags"
              subtext="Tipos de gas y accesorios"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <StatBox
              label="Stock Crítico (≤ 5)"
              value={stats.stockBajo}
              variant="danger"
              icon="bi bi-exclamation-octagon"
              subtext="Requieren reposición"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
