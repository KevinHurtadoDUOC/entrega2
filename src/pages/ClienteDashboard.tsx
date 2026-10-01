export function ClienteDashboard() {
  return (
    <section className="page-hero small-hero">
      <div className="container">
        <span className="eyebrow accent">Cliente</span>
        <h1>Mi cuenta</h1>
        <div className="product-grid">
          <article className="product-card">
            <div className="product-body">
              <h3>Hacer pedido</h3>
              <p>Realiza compras directamente desde la plataforma.</p>
            </div>
          </article>
          <article className="product-card">
            <div className="product-body">
              <h3>Estado de entrega</h3>
              <p>Consulta en tiempo real el estado del pedido asignado.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
