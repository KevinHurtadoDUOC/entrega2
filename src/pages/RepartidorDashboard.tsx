export function RepartidorDashboard() {
  return (
    <section className="page-hero small-hero">
      <div className="container">
        <span className="eyebrow accent">Reparto</span>
        <h1>Mis entregas</h1>
        <div className="product-grid">
          <article className="product-card">
            <div className="product-body">
              <h3>Pedidos asignados</h3>
              <p>Solo puedes ver los pedidos que te fueron asignados.</p>
            </div>
          </article>
          <article className="product-card">
            <div className="product-body">
              <h3>Actualizar estado</h3>
              <p>Marca un pedido como "en camino" o "entregado".</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
