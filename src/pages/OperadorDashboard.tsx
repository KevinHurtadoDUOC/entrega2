export function OperadorDashboard() {
  return (
    <section className="page-hero small-hero">
      <div className="container">
        <span className="eyebrow accent">Operaciones</span>
        <h1>Recepción y despacho</h1>
        <div className="product-grid">
          <article className="product-card">
            <div className="product-body">
              <h3>Pedidos del día</h3>
              <p>Consulta todos los pedidos activos y asigna repartidores.</p>
            </div>
          </article>
          <article className="product-card">
            <div className="product-body">
              <h3>Estados</h3>
              <p>Actualiza el estado del pedido del cliente en tiempo real.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
