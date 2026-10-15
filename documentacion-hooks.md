# Documentación de Hooks en el Proyecto
**Distribuidora de Gas El Volcán — React + TypeScript**

Este documento detalla todos los **Hooks de React** y **Hooks de React Router** utilizados en la aplicación, explicando su propósito, cómo funcionan, en qué archivos encontrarlos y con qué objetivo específico se implementaron en cada caso.

---

## Índice

1. [Resumen General](#1-resumen-general)
2. [Hooks Nativos de React](#2-hooks-nativos-de-react)
   - [useState](#21-usestate)
   - [useEffect](#22-useeffect)
   - [useContext (y createContext)](#23-usecontext-y-createcontext)
   - [useMemo](#24-usememo)
3. [Hooks Personalizados (Custom Hooks)](#3-hooks-personalizados-custom-hooks)
   - [useAppContext](#31-useappcontext)
4. [Hooks de Enrutamiento (React Router DOM)](#4-hooks-de-enrutamiento-react-router-dom)
   - [useNavigate](#41-usenavigate)
   - [useLocation](#42-uselocation)
   - [useParams](#43-useparams)
5. [Relación entre Hooks y Props](#5-relación-entre-hooks-y-props)
6. [Tabla Resumen de Archivos y Hooks](#6-tabla-resumen-de-archivos-y-hooks)

---

## 1. Resumen General

Los **Hooks** son funciones especiales de React introducidas en la versión 16.8 que permiten "enganchar" el estado y el ciclo de vida de los componentes funcionales sin necesidad de escribir componentes de clase. 

En este proyecto se utilizan para:
- Administrar el estado de formularios, carritos, sesiones y paneles CRUD.
- Sincronizar datos con `localStorage` y responder a eventos globales.
- Proveer y consumir información compartida mediante un contexto global.
- Optimizar cálculos y filtros en listados y reportes.
- Gestionar la navegación y lectura de parámetros en la SPA (Single Page Application).

---

## 2. Hooks Nativos de React

### 2.1 `useState`

#### ¿Qué es y para qué sirve?
Es el hook fundamental para manejar **estado local reactivo**. Declara una variable de estado y una función actualizadora (*setter*). Cuando se llama al setter con un nuevo valor, React vuelve a renderizar el componente con los datos actualizados.

```tsx
const [estado, setEstado] = useState(valorInicial);
```

#### Dónde se encuentra y cómo se usa en el código:

1. **[`src/App.tsx`](file:///c:/Users/Duoc/Desktop/entrega2/src/App.tsx#L28-L46)**:
   - `notice` / `setNotice`: Controla las notificaciones flotantes de éxito, error o advertencia.
   - `cartCount` / `setCartCount`: Controla el contador numérico de productos en el carrito.
   - `currentUser` / `setCurrentUserState`: Mantiene la sesión del usuario conectado (`admin`, `cliente`, `operador`, `repartidor` o `null`).
   - `categoryFilter` / `setCategoryFilter`: Almacena la categoría activa para el filtrado en el catálogo.
   - `priceMin` / `priceMax`: Almacenan los límites de precio mínimo y máximo para los filtros.

2. **[`src/pages/AdminDashboard.tsx`](file:///c:/Users/Duoc/Desktop/entrega2/src/pages/AdminDashboard.tsx#L19-L23)**:
   - `tab` / `setTab`: Controla la pestaña visible del panel (`'usuarios' | 'productos' | 'categorias' | 'ordenes' | 'reportes'`).
   - `users` / `setUsers`: Estado local con la lista de usuarios para su administración.
   - `products` / `setProducts`: Lista de productos sincronizada con `localStorage`.
   - `orders` / `setOrders`: Lista de órdenes registradas en el sistema.
   - `categories` / `setCategories`: Lista de categorías para el CRUD administrativo.

3. **[`src/components/organisms/AdminCategoriesPanel.tsx`](file:///c:/Users/Duoc/Desktop/entrega2/src/components/organisms/AdminCategoriesPanel.tsx#L14-L18)**:
   - `showAdd`: Booleano para mostrar/ocultar el modal/formulario de creación de categoría.
   - `editId`: ID de la categoría que actualmente está en modo de edición.
   - `editNombre` y `editDescripcion`: Campos controlados para la edición de categorías.
   - `deleteConfirmId`: ID de la categoría con confirmación de eliminación pendiente.

4. **[`src/components/organisms/AdminProductsPanel.tsx`](file:///c:/Users/Duoc/Desktop/entrega2/src/components/organisms/AdminProductsPanel.tsx#L15-L17)**:
   - `showAdd`: Controla el colapso del formulario de alta de nuevo producto.
   - `editId`: ID del producto en edición rápida.
   - `deleteConfirmId`: ID del producto que espera confirmación para ser borrado.

5. **[`src/components/organisms/AdminUsersPanel.tsx`](file:///c:/Users/Duoc/Desktop/entrega2/src/components/organisms/AdminUsersPanel.tsx#L14-L15)**:
   - `editIdx`: Índice del usuario en edición.
   - `showAdd`: Alterna el formulario para agregar nuevos usuarios administradores u operadores.

6. **[`src/components/molecules/ProductRow.tsx`](file:///c:/Users/Duoc/Desktop/entrega2/src/components/molecules/ProductRow.tsx#L32-L36)**:
   - `nombre`, `categoria`, `precio`, `precioOferta`, `stock`: Estados controlados por cada fila de producto para permitir la edición en línea antes de guardar cambios.

7. **[`src/components/molecules/UserRow.tsx`](file:///c:/Users/Duoc/Desktop/entrega2/src/components/molecules/UserRow.tsx#L26-L28)**:
   - `nombre`, `apellido`, `direccion`: Estados por fila para editar los datos personales de un usuario.

8. **[`src/components/molecules/ContactForm.tsx`](file:///c:/Users/Duoc/Desktop/entrega2/src/components/molecules/ContactForm.tsx#L10-L12)**:
   - `nombre`, `email`, `mensaje`: Estados locales vinculados a los campos del formulario de contacto.

9. **[`src/pages/OperadorDashboard.tsx`](file:///c:/Users/Duoc/Desktop/entrega2/src/pages/OperadorDashboard.tsx#L14-L15)**:
   - `orders`: Lista de órdenes para despachar y asignar a repartidores.
   - `users`: Lista de usuarios del sistema para identificar repartidores activos.

10. **[`src/pages/RepartidorDashboard.tsx`](file:///c:/Users/Duoc/Desktop/entrega2/src/pages/RepartidorDashboard.tsx#L14)**:
    - `allOrders`: Almacena la totalidad de pedidos para luego filtrar los correspondientes al repartidor logueado.

---

### 2.2 `useEffect`

#### ¿Qué es y para qué sirve?
Permite ejecutar **efectos secundarios** (*side effects*) en componentes funcionales. Se utiliza para tareas como peticiones asíncronas, temporizadores, suscripción a eventos de ventana y sincronización con APIs del navegador (`localStorage`).

```tsx
useEffect(() => {
  // Código del efecto
  return () => {
    // Función de limpieza opcional (cleanup)
  };
}, [dependencias]);
```

#### Dónde se encuentra y cómo se usa en el código:

Todos los efectos principales de sincronización y ciclo de vida de la aplicación residen en **[`src/App.tsx`](file:///c:/Users/Duoc/Desktop/entrega2/src/App.tsx)**:

1. **Semillado de datos iniciales ([`App.tsx:L48-L50`](file:///c:/Users/Duoc/Desktop/entrega2/src/App.tsx#L48-L50))**:
   ```tsx
   useEffect(() => {
     ensureSeedUsers();
   }, []);
   ```
   - **Propósito**: Se ejecuta **una sola vez** al montar la aplicación (arreglo de dependencias vacío `[]`). Verifica si existen los usuarios semilla (`admin`, `operador`, `repartidor`, `cliente`) en `localStorage`; si no existen, los crea.

2. **Temporizador de autodestrucción de alertas ([`App.tsx:L52-L56`](file:///c:/Users/Duoc/Desktop/entrega2/src/App.tsx#L52-L56))**:
   ```tsx
   useEffect(() => {
     if (!notice) return;
     const timer = window.setTimeout(() => setNotice(null), 3500);
     return () => window.clearTimeout(timer);
   }, [notice]);
   ```
   - **Propósito**: Cada vez que cambia `notice`, inicia un temporizador de 3.5 segundos. Cuando expira, limpia la notificación. Si el componente se desmonta o la notificación cambia antes, la función de limpieza (`clearTimeout`) evita fugas de memoria.

3. **Sincronización multi-pestaña con eventos de almacenamiento ([`App.tsx:L58-L71`](file:///c:/Users/Duoc/Desktop/entrega2/src/App.tsx#L58-L71))**:
   ```tsx
   useEffect(() => {
     const onStorage = () => {
       setCartCount(getCartCount());
       setCurrentUserState(getCurrentUser());
     };
     window.addEventListener('storage', onStorage);
     window.addEventListener('ev_cart_updated', onStorage);
     return () => {
       window.removeEventListener('storage', onStorage);
       window.removeEventListener('ev_cart_updated', onStorage);
     };
   }, []);
   ```
   - **Propósito**: Escucha el evento nativo `storage` y el evento personalizado `ev_cart_updated` para que el contador del carrito y el usuario logueado se actualicen al instante si otra pestaña o componente realiza compras o cambios.

4. **Protección de rutas / Route Guarding ([`App.tsx:L73-L82`](file:///c:/Users/Duoc/Desktop/entrega2/src/App.tsx#L73-L82))**:
   ```tsx
   useEffect(() => {
     const p = location.pathname;
     if ((p.startsWith('/admin') || p.startsWith('/operador') || p.startsWith('/repartidor')) && !currentUser) {
       setNotice({ message: 'Debes iniciar sesión para acceder al panel.', type: 'error' });
       navigate('/login');
     }
   }, [location.pathname, currentUser, navigate]);
   ```
   - **Propósito**: Monitorea cambios en la ruta actual y el estado de autenticación. Si un usuario no autenticado intenta acceder a paneles protegidos, lo expulsa a `/login` con un mensaje explicativo.

---

### 2.3 `useContext` (y `createContext`)

#### ¿Qué es y para qué sirve?
Proporciona una forma de pasar datos a través del árbol de componentes sin tener que pasar manualmente las `props` en cada nivel (*prop drilling*). Se compone de:
1. `createContext()`: Define el canal de datos.
2. `<Context.Provider value={...}>`: Emite los datos a todos los componentes hijos.
3. `useContext(Context)`: Consume los datos en cualquier componente descendiente.

#### Dónde se encuentra y cómo se usa en el código:

1. **Definición del Contexto ([`src/lib/AppContext.ts`](file:///c:/Users/Duoc/Desktop/entrega2/src/lib/AppContext.ts))**:
   ```tsx
   export interface AppContextValue {
     currentUser: User | null;
     products: Product[];
     categories: Category[];
     notice: Notice | null;
     setNotice: (notice: Notice | null) => void;
     showAlert: (message: string, type?: NoticeType, title?: string) => void;
   }

   export const AppContext = createContext<AppContextValue>(...);
   ```

2. **Proveedor en la raíz ([`src/App.tsx:L177-L198`](file:///c:/Users/Duoc/Desktop/entrega2/src/App.tsx#L177-L198))**:
   ```tsx
   const showAlert = (message: string, type: NoticeType = 'info', title?: string) => {
     setNotice({ message, type, title });
   };

   const contextValue = useMemo(
     () => ({ currentUser, products, categories, notice, setNotice, showAlert }),
     [currentUser, products, categories, notice]
   );

   return (
     <AppContext.Provider value={contextValue}>
       {/* Toda la aplicación tiene acceso a estos datos y funciones */}
     </AppContext.Provider>
   );
   ```

3. **Consumo en componentes**:
   - **[`src/components/organisms/Notice.tsx`](file:///c:/Users/Duoc/Desktop/entrega2/src/components/organisms/Notice.tsx)**:
     Consume directamente `notice` y `setNotice` desde el contexto cuando no se pasan como props para renderizar la alerta estética flotante con cuenta regresiva.
   - **[`src/components/organisms/SiteHeader.tsx`](file:///c:/Users/Duoc/Desktop/entrega2/src/components/organisms/SiteHeader.tsx)**:
     Consume `currentUser` globalmente para mostrar el nombre del usuario o el botón de inicio de sesión.
   - **Paneles Administrativos y Dashboards** ([`AdminProductsPanel.tsx`](file:///c:/Users/Duoc/Desktop/entrega2/src/components/organisms/AdminProductsPanel.tsx), [`AdminCategoriesPanel.tsx`](file:///c:/Users/Duoc/Desktop/entrega2/src/components/organisms/AdminCategoriesPanel.tsx), [`AdminUsersPanel.tsx`](file:///c:/Users/Duoc/Desktop/entrega2/src/components/organisms/AdminUsersPanel.tsx), [`OperadorDashboard.tsx`](file:///c:/Users/Duoc/Desktop/entrega2/src/pages/OperadorDashboard.tsx), [`RepartidorDashboard.tsx`](file:///c:/Users/Duoc/Desktop/entrega2/src/pages/RepartidorDashboard.tsx), [`ContactPage.tsx`](file:///c:/Users/Duoc/Desktop/entrega2/src/pages/ContactPage.tsx)):
     Consumen `showAlert` mediante `useAppContext()` para emitir alertas visuales personalizadas e inmediatas en validaciones y acciones exitosas, eliminando por completo los `alert()` nativos del navegador.

---

### 2.4 `useMemo`

#### ¿Qué es y para qué sirve?
Memoriza el resultado de un cálculo computacionalmente costoso o asegura la estabilidad referencial de un objeto/arreglo. Solo recalcula el valor cuando una de sus dependencias cambia.

```tsx
const valorMemorizado = useMemo(() => calcularAlgo(a, b), [a, b]);
```

#### Dónde se encuentra y cómo se usa en el código:

1. **Carga y filtrado de catálogo ([`src/App.tsx:L84-L105`](file:///c:/Users/Duoc/Desktop/entrega2/src/App.tsx#L84-L105))**:
   - `products = useMemo(() => getProducts(), [])`: Evita lecturas redundantes a `localStorage` en cada render de la raíz.
   - `categories = useMemo(() => getCategories(), [])`: Carga inicial memorizada de categorías.
   - `categoryOptions = useMemo(...)`: Genera la lista única de nombres de categorías basadas en los productos.
   - `filteredProducts = useMemo(...)`: Filtra eficientemente por categoría, precio mínimo y precio máximo. Si el usuario escribe en un campo no relacionado, los productos filtrados no se recalculan.
   - `contextValue = useMemo(...)`: Asegura que el objeto entregado al Provider mantenga la misma referencia a menos que cambie `currentUser`, `products`, `categories` o `notice`.

2. **Cálculo de estadísticas administrativas ([`src/components/organisms/AdminReportsPanel.tsx:L13-L37`](file:///c:/Users/Duoc/Desktop/entrega2/src/components/organisms/AdminReportsPanel.tsx#L13-L37))**:
   - `stats`: Calcula ventas totales, órdenes completadas, stock bajo y pedidos pendientes recorriendo las órdenes y productos una sola vez.

3. **Filtros en paneles de rol**:
   - **[`src/pages/ClienteDashboard.tsx:L22-L24`](file:///c:/Users/Duoc/Desktop/entrega2/src/pages/ClienteDashboard.tsx#L22-L24)**:
     `myOrders`: Filtra únicamente los pedidos que coinciden con el email del cliente logueado.
   - **[`src/pages/RepartidorDashboard.tsx:L23-L25`](file:///c:/Users/Duoc/Desktop/entrega2/src/pages/RepartidorDashboard.tsx#L23-L25)**:
     `myOrders`: Filtra las entregas asignadas al repartidor actual.
   - **[`src/pages/OperadorDashboard.tsx:L23-L60`](file:///c:/Users/Duoc/Desktop/entrega2/src/pages/OperadorDashboard.tsx#L23-L60)**:
     `repartidores`: Filtra usuarios con rol repartidor.
     `stats`: Consolida el resumen numérico de despachos.

---

## 3. Hooks Personalizados (Custom Hooks)

### 3.1 `useAppContext`

#### ¿Qué es y para qué sirve?
Es un hook creado a la medida para este proyecto en **[`src/lib/AppContext.ts:L20-L26`](file:///c:/Users/Duoc/Desktop/entrega2/src/lib/AppContext.ts#L20-L26)**. Encapsula la llamada a `useContext(AppContext)` y añade una validación defensiva: si se intenta usar fuera del `<AppContext.Provider>`, lanza un error descriptivo en consola.

```tsx
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe utilizarse dentro de un AppContext.Provider');
  }
  return context;
}
```

#### Beneficios:
- Evita importar `useContext` y `AppContext` por separado en cada componente.
- Ofrece autocompletado y tipado TypeScript estricto de `{ currentUser, products, categories, notice, setNotice }`.

---

## 4. Hooks de Enrutamiento (React Router DOM)

### 4.1 `useNavigate`

#### ¿Qué es y para qué sirve?
Proporciona una función para navegar programáticamente entre URLs sin recargar el navegador.

- **Ubicación**: [`src/App.tsx:L25`](file:///c:/Users/Duoc/Desktop/entrega2/src/App.tsx#L25)
- **Uso**:
  - `navigate('/admin')`: Redirige tras un login exitoso según el rol.
  - `navigate('/')`: Redirige a la portada al cerrar sesión.
  - `navigate('/cart')`: Redirige al carrito al presionar comprar.

---

### 4.2 `useLocation`

#### ¿Qué es y para qué sirve?
Devuelve el objeto con la ubicación actual (`pathname`, `search`, `hash`).

- **Ubicación**: [`src/App.tsx:L26`](file:///c:/Users/Duoc/Desktop/entrega2/src/App.tsx#L26)
- **Uso**:
  - En el `useEffect` de protección de rutas, se lee `location.pathname` para saber en qué vista está el navegador e impedir el acceso indebido.

---

### 4.3 `useParams`

#### ¿Qué es y para qué sirve?
Extrae los parámetros dinámicos definidos en la configuración de rutas de React Router (por ejemplo, `/producto/:id`).

- **Ubicación**: **[`src/pages/ProductPage.tsx:L12`](file:///c:/Users/Duoc/Desktop/entrega2/src/pages/ProductPage.tsx#L12)**
- **Uso**:
  ```tsx
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  ```
  Permite identificar cuál cilindro o accesorio se debe mostrar en la vista de detalle.

---

## 5. Relación entre Hooks y Props

En una arquitectura limpia con React y TypeScript, los **Hooks** y las **Props** se complementan mutuamente:

1. **Props (Entrada de datos y eventos)**:
   - Definen interfaces explícitas (`interface ProductRowProps`, `interface SiteHeaderProps`).
   - Mantienen los componentes moleculares y atómicos como componentes puramente presentacionales (*dumb components*).
2. **Hooks (Lógica interna y estado)**:
   - `useState` gestiona los valores temporales de entrada en formularios antes de emitirlos mediante callbacks de props (ejemplo: `onSave`, `onAddToCart`).
   - `useContext` provee los datos globales para evitar pasar props innecesarias a través de 5 o 6 niveles de profundidad.

---

## 6. Tabla Resumen de Archivos y Hooks

| Archivo | Hooks Utilizados | Propósito Principal |
| :--- | :--- | :--- |
| **`src/App.tsx`** | `useState`, `useEffect`, `useMemo`, `useNavigate`, `useLocation` | Estado global de la app, Provider de contexto, filtros de catálogo, sincronización de storage, protección de rutas y temporizador de alertas. |
| **`src/lib/AppContext.ts`** | `createContext`, `useContext` | Definición del contexto global y exportación del custom hook `useAppContext`. |
| **`src/pages/AdminDashboard.tsx`** | `useState` | Manejo de pestañas del panel y sincronización del CRUD de usuarios, productos, categorías y pedidos. |
| **`src/components/organisms/AdminCategoriesPanel.tsx`** | `useState` | Formulario para crear categorías, edición en línea y confirmación de eliminación con modal reactivo. |
| **`src/components/organisms/AdminProductsPanel.tsx`** | `useState` | Formulario de alta de productos con selector de categorías dinámico y control de eliminación. |
| **`src/components/organisms/AdminUsersPanel.tsx`** | `useState` | Control de edición y alta de usuarios administrativos. |
| **`src/components/organisms/AdminReportsPanel.tsx`** | `useMemo` | Cálculo memorizado de totales de ventas y métricas de inventario. |
| **`src/components/organisms/Notice.tsx`** | `useContext` (`useAppContext`) | Consumo del estado global de notificaciones para renderizar y auto-cerrar alertas. |
| **`src/components/organisms/SiteHeader.tsx`** | `useContext` (`useAppContext`) | Consumo del usuario autenticado para personalizar la barra de navegación. |
| **`src/components/molecules/ProductRow.tsx`** | `useState` | Estados locales para editar campos de productos en la tabla. |
| **`src/components/molecules/UserRow.tsx`** | `useState` | Estados locales para editar datos de un usuario en tabla. |
| **`src/components/molecules/ContactForm.tsx`** | `useState` | Control de campos de texto del formulario de contacto. |
| **`src/pages/ProductPage.tsx`** | `useParams` | Lectura del ID del producto en la URL para renderizar su ficha técnica. |
| **`src/pages/OperadorDashboard.tsx`** | `useState`, `useMemo` | Gestión de órdenes de despacho, asignación de repartidores y métricas de entrega. |
| **`src/pages/RepartidorDashboard.tsx`** | `useState`, `useMemo` | Filtrado de órdenes asignadas al repartidor y actualización de su estado de entrega. |
| **`src/pages/ClienteDashboard.tsx`** | `useMemo` | Filtrado de órdenes del cliente logueado para mostrar su historial de compras. |

---

*Documento generado para la Entrega 2 — Distribuidora de Gas El Volcán.*
