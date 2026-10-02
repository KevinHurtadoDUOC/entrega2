import { useState, useMemo } from 'react';
import { getUsers, saveUsers, getProducts, saveProducts, getOrders, formatCurrency } from '../lib/storage';
import type { Product } from '../types';

type AdminTab = 'usuarios' | 'productos' | 'pedidos' | 'reportes';

export function AdminDashboard() {
  const [tab, setTab] = useState<AdminTab>('usuarios');
  const [refreshKey, setRefreshKey] = useState(0);
  const refresh = () => setRefreshKey((k) => k + 1);

  return (
    <section className="dashboard-section">
      <div className="container">
        <span className="eyebrow accent">Administración</span>
        <h1>Panel del Administrador</h1>
        <div className="dashboard-tabs">
          {(['usuarios', 'productos', 'pedidos', 'reportes'] as AdminTab[]).map((t) => (
            <button key={t} type="button" className={`btn ${tab === t ? 'btn-primary' : 'btn-light'}`} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <div className="dashboard-content">
          {tab === 'usuarios' && <UsersPanel key={refreshKey} onRefresh={refresh} />}
          {tab === 'productos' && <ProductsPanel key={refreshKey} onRefresh={refresh} />}
          {tab === 'pedidos' && <OrdersPanel key={refreshKey} />}
          {tab === 'reportes' && <ReportsPanel key={refreshKey} />}
        </div>
      </div>
    </section>
  );
}

/* ─── Users Panel ─── */
function UsersPanel({ onRefresh }: { onRefresh: () => void }) {
  const users = getUsers();
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const handleToggleActive = (index: number) => {
    const all = getUsers();
    all[index].activo = all[index].activo === false ? true : false;
    saveUsers(all);
    onRefresh();
  };

  const handleRoleChange = (index: number, role: string) => {
    const all = getUsers();
    all[index].role = role;
    saveUsers(all);
    onRefresh();
  };

  const handleSaveEdit = (index: number, data: Record<string, string>) => {
    const all = getUsers();
    if (!data.nombre?.trim() || !data.apellido?.trim()) {
      alert('Nombre y apellido no pueden estar vacíos.');
      return;
    }
    all[index].nombre = data.nombre.trim();
    all[index].apellido = data.apellido.trim();
    all[index].direccion = data.direccion?.trim() || '';
    saveUsers(all);
    setEditIdx(null);
    onRefresh();
  };

  const handleAddUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const email = String(fd.get('email') ?? '').trim().toLowerCase();
    const nombre = String(fd.get('nombre') ?? '').trim();
    const apellido = String(fd.get('apellido') ?? '').trim();
    const password = String(fd.get('password') ?? '');
    const role = String(fd.get('role') ?? 'cliente');
    const direccion = String(fd.get('direccion') ?? '').trim();

    if (!nombre || !apellido || !email || !password) {
      alert('Todos los campos obligatorios deben estar completos.');
      return;
    }

    const all = getUsers();
    if (all.some((u) => String(u.email ?? '').toLowerCase() === email)) {
      alert('Este correo ya está registrado.');
      return;
    }

    all.push({ nombre, apellido, email, password, role, direccion, region: '', genero: '', terms: true, activo: true });
    saveUsers(all);
    setShowAdd(false);
    onRefresh();
  };

  return (
    <div>
      <div className="panel-header">
        <h2>Gestión de Usuarios ({users.length})</h2>
        <button type="button" className="btn btn-primary" onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? 'Cancelar' : '+ Crear usuario'}
        </button>
      </div>

      {showAdd && (
        <form className="dashboard-form" onSubmit={handleAddUser}>
          <div className="form-row two-columns">
            <label>Nombre <input name="nombre" required /></label>
            <label>Apellido <input name="apellido" required /></label>
          </div>
          <div className="form-row two-columns">
            <label>Email <input name="email" type="email" required /></label>
            <label>Contraseña <input name="password" type="password" required /></label>
          </div>
          <div className="form-row two-columns">
            <label>Rol
              <select name="role">
                <option value="cliente">Cliente</option>
                <option value="operador">Operador</option>
                <option value="repartidor">Repartidor</option>
                <option value="admin">Administrador</option>
              </select>
            </label>
            <label>Dirección <input name="direccion" /></label>
          </div>
          <button type="submit" className="btn btn-primary">Guardar usuario</button>
        </form>
      )}

      <div className="dashboard-table-wrap">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i} className={u.activo === false ? 'row-inactive' : ''}>
                {editIdx === i ? (
                  <EditUserRow user={u} onSave={(d) => handleSaveEdit(i, d)} onCancel={() => setEditIdx(null)} />
                ) : (
                  <>
                    <td>{String(u.nombre ?? '')} {String(u.apellido ?? '')}</td>
                    <td>{String(u.email ?? '')}</td>
                    <td>
                      <select value={String(u.role ?? 'cliente')} onChange={(e) => handleRoleChange(i, e.target.value)} className="role-select">
                        <option value="cliente">Cliente</option>
                        <option value="operador">Operador</option>
                        <option value="repartidor">Repartidor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      <span className={`status-badge ${u.activo === false ? 'status-inactive' : 'status-active'}`}>
                        {u.activo === false ? 'Inactivo' : 'Activo'}
                      </span>
                    </td>
                    <td className="action-cell">
                      <button type="button" className="btn btn-light btn-sm" onClick={() => setEditIdx(i)}>Editar</button>
                      <button type="button" className={`btn btn-sm ${u.activo === false ? 'btn-primary' : 'btn-danger'}`} onClick={() => handleToggleActive(i)}>
                        {u.activo === false ? 'Activar' : 'Desactivar'}
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EditUserRow({ user, onSave, onCancel }: {
  user: Record<string, string | boolean | undefined>;
  onSave: (data: Record<string, string>) => void;
  onCancel: () => void;
}) {
  const [nombre, setNombre] = useState(String(user.nombre ?? ''));
  const [apellido, setApellido] = useState(String(user.apellido ?? ''));
  const [direccion, setDireccion] = useState(String(user.direccion ?? ''));

  return (
    <>
      <td><input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" /></td>
      <td><input value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Apellido" /></td>
      <td><input value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Dirección" /></td>
      <td colSpan={2} className="action-cell">
        <button type="button" className="btn btn-primary btn-sm" onClick={() => onSave({ nombre, apellido, direccion })}>Guardar</button>
        <button type="button" className="btn btn-light btn-sm" onClick={onCancel}>Cancelar</button>
      </td>
    </>
  );
}

/* ─── Products Panel ─── */
function ProductsPanel({ onRefresh }: { onRefresh: () => void }) {
  const products = getProducts();
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const handleAddProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const nombre = String(fd.get('nombre') ?? '').trim();
    const categoria = String(fd.get('categoria') ?? '').trim();
    const precio = Number(fd.get('precio') ?? 0);
    const precioOferta = Number(fd.get('precioOferta') ?? 0);
    const stock = Number(fd.get('stock') ?? 0);
    const descripcion = String(fd.get('descripcion') ?? '').trim();

    if (!nombre) { alert('El nombre del producto no puede estar vacío.'); return; }
    if (!categoria) { alert('La categoría no puede estar vacía.'); return; }
    if (precio <= 0) { alert('El precio debe ser mayor a cero.'); return; }
    if (precioOferta <= 0) { alert('El precio oferta debe ser mayor a cero.'); return; }
    if (precioOferta > precio) { alert('El precio oferta no puede ser mayor al precio normal.'); return; }
    if (stock < 0) { alert('El stock no puede ser negativo.'); return; }

    const all = getProducts();
    const id = `PRD-${Date.now()}`;
    // Si la categoría no existe, se crea automáticamente al agregarla al producto
    all.push({ id, nombre, categoria, precio, precioOferta, stock, descripcion, imagen: '' });
    saveProducts(all);
    setShowAdd(false);
    onRefresh();
  };

  const handleSaveEdit = (id: string, data: Partial<Product>) => {
    if (!data.nombre?.trim()) { alert('El nombre no puede estar vacío.'); return; }
    if (!data.categoria?.trim()) { alert('La categoría no puede estar vacía.'); return; }
    if ((data.precio ?? 0) <= 0) { alert('El precio debe ser mayor a cero.'); return; }
    if ((data.precioOferta ?? 0) <= 0) { alert('El precio oferta debe ser mayor a cero.'); return; }
    if ((data.precioOferta ?? 0) > (data.precio ?? 0)) { alert('El precio oferta no puede ser mayor al precio normal.'); return; }

    const all = getProducts();
    const idx = all.findIndex((p) => p.id === id);
    if (idx === -1) return;
    all[idx] = { ...all[idx], ...data };
    saveProducts(all);
    setEditId(null);
    onRefresh();
  };

  // Obtener categorías existentes para sugerencia
  const existingCategories = [...new Set(products.map((p) => p.categoria))];

  return (
    <div>
      <div className="panel-header">
        <h2>Gestión de Productos ({products.length})</h2>
        <button type="button" className="btn btn-primary" onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? 'Cancelar' : '+ Agregar producto'}
        </button>
      </div>

      {showAdd && (
        <form className="dashboard-form" onSubmit={handleAddProduct}>
          <div className="form-row two-columns">
            <label>Nombre <input name="nombre" required /></label>
            <label>Categoría
              <input name="categoria" list="cat-list" placeholder="Escriba o seleccione" required />
              <datalist id="cat-list">
                {existingCategories.map((c) => <option key={c} value={c} />)}
              </datalist>
              <small className="form-hint">Si la categoría no existe, se creará automáticamente.</small>
            </label>
          </div>
          <div className="form-row two-columns">
            <label>Precio normal ($) <input name="precio" type="number" min="1" required /></label>
            <label>Precio oferta ($) <input name="precioOferta" type="number" min="1" required /></label>
          </div>
          <div className="form-row two-columns">
            <label>Stock <input name="stock" type="number" min="0" required /></label>
            <label>Descripción <input name="descripcion" /></label>
          </div>
          <button type="submit" className="btn btn-primary">Guardar producto</button>
        </form>
      )}

      <div className="dashboard-table-wrap">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Oferta</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              editId === p.id ? (
                <EditProductRow key={p.id} product={p} categories={existingCategories} onSave={(d) => handleSaveEdit(p.id, d)} onCancel={() => setEditId(null)} />
              ) : (
                <tr key={p.id}>
                  <td className="mono">{p.id}</td>
                  <td>{p.nombre}</td>
                  <td><span className="category-badge">{p.categoria}</span></td>
                  <td>{formatCurrency(p.precio)}</td>
                  <td>{formatCurrency(p.precioOferta)}</td>
                  <td>{p.stock}</td>
                  <td><button type="button" className="btn btn-light btn-sm" onClick={() => setEditId(p.id)}>Editar</button></td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EditProductRow({ product, categories, onSave, onCancel }: {
  product: Product;
  categories: string[];
  onSave: (data: Partial<Product>) => void;
  onCancel: () => void;
}) {
  const [nombre, setNombre] = useState(product.nombre);
  const [categoria, setCategoria] = useState(product.categoria);
  const [precio, setPrecio] = useState(product.precio);
  const [precioOferta, setPrecioOferta] = useState(product.precioOferta);
  const [stock, setStock] = useState(product.stock);
  const [descripcion] = useState(product.descripcion);

  return (
    <tr>
      <td className="mono">{product.id}</td>
      <td><input value={nombre} onChange={(e) => setNombre(e.target.value)} /></td>
      <td>
        <input value={categoria} onChange={(e) => setCategoria(e.target.value)} list={`cat-edit-${product.id}`} />
        <datalist id={`cat-edit-${product.id}`}>
          {categories.map((c) => <option key={c} value={c} />)}
        </datalist>
      </td>
      <td><input type="number" value={precio} onChange={(e) => setPrecio(Number(e.target.value))} style={{ width: '90px' }} /></td>
      <td><input type="number" value={precioOferta} onChange={(e) => setPrecioOferta(Number(e.target.value))} style={{ width: '90px' }} /></td>
      <td><input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} style={{ width: '70px' }} /></td>
      <td className="action-cell">
        <button type="button" className="btn btn-primary btn-sm" onClick={() => onSave({ nombre, categoria, precio, precioOferta, stock, descripcion })}>✓</button>
        <button type="button" className="btn btn-light btn-sm" onClick={onCancel}>✕</button>
      </td>
    </tr>
  );
}

/* ─── Orders Panel ─── */
function OrdersPanel(_props: { key?: number }) {
  const orders = getOrders();

  return (
    <div>
      <div className="panel-header"><h2>Todos los Pedidos ({orders.length})</h2></div>
      {orders.length === 0 ? (
        <div className="empty-cart"><p>No hay pedidos registrados aún.</p></div>
      ) : (
        <div className="dashboard-table-wrap">
          <table className="dashboard-table">
            <thead>
              <tr><th>ID</th><th>Cliente</th><th>Dirección</th><th>Total</th><th>Estado</th><th>Repartidor</th><th>Fecha</th></tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td className="mono">{o.id}</td>
                  <td>{o.clienteNombre}</td>
                  <td>{o.direccion}</td>
                  <td>{formatCurrency(o.total)}</td>
                  <td><span className={`status-badge status-${o.estado.replace(' ', '-')}`}>{o.estado}</span></td>
                  <td>{o.repartidor || '—'}</td>
                  <td>{new Date(o.fecha).toLocaleDateString('es-CL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ─── Reports Panel ─── */
function ReportsPanel(_props: { key?: number }) {
  const orders = getOrders();
  const products = getProducts();
  const users = getUsers();

  const stats = useMemo(() => {
    const totalVentas = orders.reduce((s, o) => s + o.total, 0);
    const pedidosPendientes = orders.filter((o) => o.estado === 'pendiente').length;
    const pedidosEntregados = orders.filter((o) => o.estado === 'entregado').length;
    const pedidosEnCamino = orders.filter((o) => o.estado === 'en camino').length;
    const totalProductos = products.length;
    const totalUsuarios = users.length;
    const stockBajo = products.filter((p) => p.stock <= 5).length;
    const categorias = [...new Set(products.map((p) => p.categoria))].length;
    return { totalVentas, pedidosPendientes, pedidosEntregados, pedidosEnCamino, totalProductos, totalUsuarios, stockBajo, categorias };
  }, [orders, products, users]);

  return (
    <div>
      <div className="panel-header"><h2>Reportes del Sistema</h2></div>
      <div className="stats-grid">
        <div className="stat-card"><span className="stat-label">Total Ventas</span><span className="stat-value accent">{formatCurrency(stats.totalVentas)}</span></div>
        <div className="stat-card"><span className="stat-label">Pedidos Totales</span><span className="stat-value">{orders.length}</span></div>
        <div className="stat-card"><span className="stat-label">Pendientes</span><span className="stat-value warn">{stats.pedidosPendientes}</span></div>
        <div className="stat-card"><span className="stat-label">En Camino</span><span className="stat-value info">{stats.pedidosEnCamino}</span></div>
        <div className="stat-card"><span className="stat-label">Entregados</span><span className="stat-value ok">{stats.pedidosEntregados}</span></div>
        <div className="stat-card"><span className="stat-label">Usuarios</span><span className="stat-value">{stats.totalUsuarios}</span></div>
        <div className="stat-card"><span className="stat-label">Productos</span><span className="stat-value">{stats.totalProductos}</span></div>
        <div className="stat-card"><span className="stat-label">Categorías</span><span className="stat-value">{stats.categorias}</span></div>
        <div className="stat-card"><span className="stat-label">Stock Bajo (≤5)</span><span className="stat-value warn">{stats.stockBajo}</span></div>
      </div>
    </div>
  );
}
