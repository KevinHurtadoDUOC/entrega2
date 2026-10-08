import { useState } from 'react';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';

export interface UserRowProps {
  user: Record<string, string | boolean | undefined>;
  index: number;
  isEditing: boolean;
  onStartEdit: (index: number) => void;
  onCancelEdit: () => void;
  onSaveEdit: (index: number, data: { nombre: string; apellido: string; direccion: string }) => void;
  onToggleActive: (index: number) => void;
  onRoleChange: (index: number, role: string) => void;
}

export function UserRow({
  user,
  index,
  isEditing,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onToggleActive,
  onRoleChange,
}: UserRowProps) {
  const [nombre, setNombre] = useState(String(user.nombre ?? ''));
  const [apellido, setApellido] = useState(String(user.apellido ?? ''));
  const [direccion, setDireccion] = useState(String(user.direccion ?? ''));

  const isActive = user.activo !== false;

  if (isEditing) {
    return (
      <tr className="table-warning align-middle">
        <td>
          <input
            className="form-control form-control-sm mb-1"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
          />
          <input
            className="form-control form-control-sm"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Apellido"
          />
        </td>
        <td>
          <span className="small text-muted">{String(user.email ?? '')}</span>
        </td>
        <td>
          <input
            className="form-control form-control-sm"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Dirección"
          />
        </td>
        <td>
          <span className="badge bg-secondary">{String(user.role ?? 'cliente')}</span>
        </td>
        <td>
          <div className="d-flex gap-1">
            <Button
              variant="success"
              size="sm"
              icon="bi bi-check-lg"
              onClick={() => onSaveEdit(index, { nombre, apellido, direccion })}
            >
              Guardar
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              icon="bi bi-x-lg"
              onClick={onCancelEdit}
            >
              Cancelar
            </Button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className={`align-middle ${!isActive ? 'table-light text-muted' : ''}`}>
      <td>
        <strong>
          {String(user.nombre ?? '')} {String(user.apellido ?? '')}
        </strong>
      </td>
      <td>
        <span className="font-monospace small">{String(user.email ?? '')}</span>
      </td>
      <td>
        <select
          value={String(user.role ?? 'cliente')}
          onChange={(e) => onRoleChange(index, e.target.value)}
          className="form-select form-select-sm"
          style={{ width: '130px' }}
        >
          <option value="cliente">Cliente</option>
          <option value="operador">Operador</option>
          <option value="repartidor">Repartidor</option>
          <option value="admin">Admin</option>
        </select>
      </td>
      <td>
        <Badge variant={isActive ? 'success' : 'secondary'} pill>
          {isActive ? 'Activo' : 'Inactivo'}
        </Badge>
      </td>
      <td>
        <div className="d-flex gap-1">
          <Button
            variant="outline-primary"
            size="sm"
            icon="bi bi-pencil"
            onClick={() => onStartEdit(index)}
          >
            Editar
          </Button>
          <Button
            variant={isActive ? 'outline-danger' : 'outline-success'}
            size="sm"
            icon={isActive ? 'bi bi-person-x' : 'bi bi-person-check'}
            onClick={() => onToggleActive(index)}
          >
            {isActive ? 'Desactivar' : 'Activar'}
          </Button>
        </div>
      </td>
    </tr>
  );
}
