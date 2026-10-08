import { useState } from 'react';
import { getUsers, saveUsers } from '../../lib/storage';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';
import { UserRow } from '../molecules/UserRow';

export interface AdminUsersPanelProps {
  users: Array<Record<string, string | boolean | undefined>>;
  onRefresh: () => void;
}

export function AdminUsersPanel({ users, onRefresh }: AdminUsersPanelProps) {
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

  const handleSaveEdit = (index: number, data: { nombre: string; apellido: string; direccion: string }) => {
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

    all.push({
      nombre,
      apellido,
      email,
      password,
      role,
      direccion,
      region: '',
      genero: '',
      terms: true,
      activo: true,
    });
    saveUsers(all);
    setShowAdd(false);
    onRefresh();
  };

  const roleOptions = [
    { value: 'cliente', label: 'Cliente' },
    { value: 'operador', label: 'Operador' },
    { value: 'repartidor', label: 'Repartidor' },
    { value: 'admin', label: 'Administrador' },
  ];

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-0 fw-bold text-dark">
            <i className="bi bi-people me-2 text-primary" />
            Gestión de Usuarios ({users.length})
          </h5>
          <small className="text-muted">Administra credenciales, roles y estados de cuenta</small>
        </div>
        <Button
          variant={showAdd ? 'outline-secondary' : 'primary'}
          size="sm"
          icon={showAdd ? 'bi bi-x-lg' : 'bi bi-plus-lg'}
          onClick={() => setShowAdd(!showAdd)}
        >
          {showAdd ? 'Cancelar' : 'Crear usuario'}
        </Button>
      </div>

      <div className="card-body p-0">
        {showAdd && (
          <div className="p-4 bg-light border-bottom">
            <h6 className="fw-bold mb-3 text-dark">Nuevo Usuario</h6>
            <form onSubmit={handleAddUser}>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <Input label="Nombre" name="nombre" required placeholder="Ej: Juan" />
                </div>
                <div className="col-12 col-md-6">
                  <Input label="Apellido" name="apellido" required placeholder="Ej: Pérez" />
                </div>
                <div className="col-12 col-md-6">
                  <Input
                    label="Correo electrónico"
                    name="email"
                    type="email"
                    required
                    placeholder="correo@duocuc.cl"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <Input
                    label="Contraseña"
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <Select label="Rol de usuario" name="role" options={roleOptions} />
                </div>
                <div className="col-12 col-md-6">
                  <Input
                    label="Dirección de entrega"
                    name="direccion"
                    placeholder="Av. Los Aromos 123"
                  />
                </div>
                <div className="col-12">
                  <Button type="submit" variant="primary" icon="bi bi-check2-circle">
                    Guardar usuario
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
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
                <UserRow
                  key={i}
                  user={u}
                  index={i}
                  isEditing={editIdx === i}
                  onStartEdit={setEditIdx}
                  onCancelEdit={() => setEditIdx(null)}
                  onSaveEdit={handleSaveEdit}
                  onToggleActive={handleToggleActive}
                  onRoleChange={handleRoleChange}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
