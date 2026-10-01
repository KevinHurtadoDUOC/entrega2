export function AdminDashboard() {
  return (
    <section className="page-hero small-hero">
      <div className="container">
        <span className="eyebrow accent">Administración</span>
        <h1>Panel del administrador</h1>
        <div className="product-grid">
          <article className="product-card">
            <div className="product-body">
              <h3>Usuarios</h3>
              <p>Crear, editar y desactivar usuarios del sistema.</p>
            </div>
          </article>
          <article className="product-card">
            <div className="product-body">
              <h3>Reportes</h3>
              <p>Visualiza métricas globales, ventas y estados del negocio.</p>
            </div>
          </article>
          <article className="product-card">
            <div className="product-body">
              <h3>Roles</h3>
              <p>Gestión completa de permisos y accesos por perfil.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
