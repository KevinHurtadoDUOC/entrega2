# Manual de Usuario: Gestión de Credenciales y Roles
**Distribuidora de Gas El Volcán — React + TypeScript**

---

## 1. Resumen Ejecutivo y Arquitectura de Usuarios

En la aplicación existen **4 tipos de usuario (roles)** con dashboards funcionales completos:

| Rol | Dashboard | Ruta | Funcionalidades |
| :--- | :--- | :--- | :--- |
| **`admin`** | `AdminDashboard` | `/admin` | CRUD usuarios, asignar roles, activar/desactivar cuentas. CRUD productos con auto-creación de categorías. Ver todos los pedidos y reportes del sistema. |
| **`operador`** | `OperadorDashboard` | `/operador` | Ver todos los pedidos del día. Asignar repartidores. Cambiar estado de pedidos. No puede gestionar usuarios. |
| **`repartidor`** | `RepartidorDashboard` | `/repartidor` | Ver solo sus pedidos asignados. Cambiar estado a "en camino" o "entregado". No ve pedidos de otros. |
| **`cliente`** | `ClienteDashboard` | `/cliente` | Ver sus propios pedidos y estado en tiempo real. Comprar desde el catálogo. |

---

## 2. Usuarios Incorporados por Defecto (Seed Users)

Los 4 tipos de usuario **ya se encuentran incorporados de forma automática en el código fuente** (`src/data/users.ts`).

* **Carga Automática:** Al abrir la aplicación, la función `ensureSeedUsers()` carga automáticamente estos usuarios en `localStorage` si aún no existen.
* **Sin Consola:** **No es necesario ejecutar scripts en la consola del navegador.**
* **Registro de nuevos clientes:** El formulario `/register` permite registrar clientes adicionales (siempre con rol `cliente`).

---

## 3. Tabla Maestra de Credenciales de Acceso

| Rol | Correo de Acceso | Contraseña | Panel Asignado | Botón en Header |
| :--- | :--- | :--- | :--- | :--- |
| **Administrador** | `admin@duocuc.cl` | `Admin123` | `/admin` | `Panel Admin` |
| **Operador** | `operador@duocuc.cl` | `Operador123` | `/operador` | `Panel Operador` |
| **Repartidor** | `repartidor@duocuc.cl` | `Repartidor123` | `/repartidor` | `Mis Entregas` |
| **Cliente** | `cliente@duocuc.cl` | `Cliente123` | `/cliente` | `Mi Cuenta` |

---

## 4. Políticas y Validación de Credenciales

1. **Dominio de correo obligatorio:** `@duocuc.cl`
2. **Requisitos de la contraseña:** Mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número.
3. **Edad mínima:** 14 años.
4. **Bloqueo por intentos fallidos:** 3 intentos consecutivos bloquean la cuenta.

---

## 5. Funcionalidades por Rol

### 5.1 Administrador (`/admin`)

**Pestaña Usuarios:**
- Ver lista completa de usuarios con nombre, email, rol y estado.
- **Crear usuario:** Formulario con nombre, apellido, email, contraseña, rol y dirección.
- **Editar usuario:** Modificar nombre, apellido y dirección inline.
- **Asignar roles:** Selector desplegable para cambiar entre cliente, operador, repartidor y admin.
- **Activar/Desactivar:** Botón para desactivar cuentas sin eliminarlas.

**Pestaña Productos:**
- Ver tabla de todos los productos con ID, nombre, categoría, precios y stock.
- **Agregar producto:** Formulario con validación:
  - Nombre no vacío.
  - Categoría no vacía (si no existe, se crea automáticamente).
  - Precio y precio oferta mayores a cero.
  - Precio oferta no puede ser mayor al precio normal.
  - Stock no negativo.
- **Editar producto:** Modificar cualquier campo inline con las mismas validaciones.

**Pestaña Pedidos:**
- Tabla con todos los pedidos del sistema (ID, cliente, dirección, total, estado, repartidor, fecha).

**Pestaña Reportes:**
- Métricas del sistema: total ventas, pedidos totales/pendientes/en camino/entregados, cantidad de usuarios, productos, categorías, productos con stock bajo.

### 5.2 Operador / Despachador (`/operador`)

- Ve **todos los pedidos** con detalle (cliente, dirección, productos, fecha).
- **Asignar repartidor:** Selector desplegable con repartidores activos del sistema.
- **Cambiar estado:** Puede cambiar entre pendiente, asignado, en camino y entregado.
- **No puede** gestionar usuarios ni productos del sistema.

### 5.3 Repartidor (`/repartidor`)

- Ve **solo los pedidos asignados a él** (filtrado por email del repartidor logueado).
- **No puede ver** pedidos de otros repartidores.
- Puede cambiar estado solo a:
  - **"En camino"**: Botón "📦 Marcar En Camino".
  - **"Entregado"**: Botón "✓ Marcar Entregado".
- Sección separada de "Entregas Completadas" para ver su historial.

### 5.4 Cliente (`/cliente`)

- Ve **sus propios pedidos** con estado en tiempo real.
- Detalle de cada pedido: dirección, fecha, repartidor asignado, productos y total.
- Al hacer checkout desde el carrito, se crea automáticamente un pedido con estado "pendiente".

---

## 6. Filtro de Catálogo por Precio

El filtro de precio en la sección de **Catálogo** (`/catalog`) ahora permite al usuario definir un **rango personalizado**:

- **Precio mínimo:** Campo numérico donde el usuario ingresa el valor mínimo.
- **Precio máximo:** Campo numérico donde el usuario ingresa el valor máximo.
- Si ambos campos están vacíos, se muestran todos los productos.
- Los filtros se combinan con el filtro de categoría.

---

## 7. Flujo de Compra y Pedidos

1. **Cliente** agrega productos al carrito desde el catálogo.
2. Al hacer **"Finalizar compra"** en el carrito:
   - Se valida stock disponible.
   - Se crea un **Pedido** con estado `pendiente`.
   - Se descuenta el stock de los productos.
   - Se redirige al dashboard del cliente.
3. **Operador** ve el pedido y lo asigna a un repartidor → estado cambia a `asignado`.
4. **Repartidor** marca el pedido como `en camino` y luego `entregado`.
5. **Admin** ve todo el flujo completo en su panel.

---

## 8. Mantenimiento

* **Desbloquear cuenta:** Abrir consola (`F12`) y ejecutar:
  ```javascript
  localStorage.removeItem('ev_blocked_<email>');
  localStorage.removeItem('ev_attempts_<email>');
  ```

* **Restablecer datos a valores de fábrica:**
  ```javascript
  localStorage.clear();
  location.reload();
  ```
