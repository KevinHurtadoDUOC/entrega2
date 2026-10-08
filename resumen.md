# Informe de Resultados — Distribuidora de Gas El Volcán
**Asignatura:** DSY1104 — Desarrollo de Aplicaciones Web  
**Entrega:** Entrega 2 / Final  
**Integrantes:** Kevin Hurtado, Sofia Muñoz, Nicolas Angulo  
**Tecnologías:** React 19, TypeScript, Vite, Bootstrap 5, Bootstrap Icons  

---

## 1. Resumen Ejecutivo

En esta iteración se completaron las tres metas principales solicitadas para el proyecto:
1. **Implementación de Bootstrap 5**: Incorporación del framework CSS oficial y librería de íconos para toda la interfaz responsiva, layout, tarjetas, tablas, formularios, botones y badges.
2. **Atomización de Componentes (Atomic Design)**: Reestructuración modular separando el código en **Átomos**, **Moléculas** y **Organismos**, eliminando bloques monolíticos.
3. **Uso y Verificación Estricta de Props**: Tipado exhaustivo con TypeScript de interfaces de `props` en el 100% de los componentes y páginas, asegurando el flujo unidireccional de datos y callbacks.
4. **Validación de Calidad**: 0 errores en `npm run build` (`tsc`) y 0 errores/warnings en `npm run lint` (`eslint`).

---

## 2. Aplicación de Bootstrap 5

### Dependencias instaladas
- `bootstrap`: versión 5.3+
- `bootstrap-icons`: versión 1.11+

### Integración global (`src/main.tsx`)
```tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
```

### Componentes y utilidades Bootstrap aplicadas
- **Sistema de rejilla**: `container`, `row`, `col-12`, `col-md-6`, `col-lg-4`, `g-3`, `g-4`.
- **Botones**: `btn btn-primary`, `btn-outline-primary`, `btn-outline-secondary`, `btn-outline-danger`, `btn-success`, `btn-sm`, `btn-lg`.
- **Tarjetas**: `card`, `card-header`, `card-body`, `card-footer`, `shadow-sm`, `border-0`.
- **Tablas**: `table table-hover align-middle table-responsive`, cabeceras `table-light`.
- **Formularios**: `form-control`, `form-select`, `form-label`, `form-check`, `input-group`, estados de validación `is-invalid`.
- **Insignias y Alertas**: `badge rounded-pill`, `alert alert-success`, `alert-danger`, `alert-info`.
- **Navegación**: `navbar navbar-expand-lg bg-white shadow-sm sticky-top`, `nav nav-pills nav-fill`.

---

## 3. Arquitectura Atómica de Componentes (Atomic Design)

Se adoptó la metodología de diseño atómico para garantizar reusabilidad, escalabilidad y separación de responsabilidades:

```
src/
├── components/
│   ├── atoms/                     # Átomos: Componentes visuales básicos
│   │   ├── Button.tsx             # Botón configurable con variantes, tamaños, spinner e ícono
│   │   ├── Badge.tsx              # Insignia de estado, categoría y stock
│   │   ├── Input.tsx              # Input de formulario con label, error e ícono
│   │   ├── Select.tsx             # Dropdown con opciones tipadas
│   │   ├── StatBox.tsx            # Tarjeta de KPI/métrica estadística
│   │   ├── SectionHeader.tsx      # Encabezado reutilizable de sección
│   │   └── index.ts
│   │
│   ├── molecules/                 # Moléculas: Combinación de átomos para un fin concreto
│   │   ├── ProductCard.tsx        # Ficha de producto con imagen, precio, badges y botones
│   │   ├── CartItemRow.tsx        # Fila individual de la tabla del carrito (+ / -)
│   │   ├── CartSummary.tsx        # Resumen de totales y finalización de compra
│   │   ├── FilterBar.tsx          # Barra con select de categorías y filtros de precio
│   │   ├── OrderCard.tsx          # Tarjeta de pedido según rol (cliente, operador, repartidor)
│   │   ├── ContactForm.tsx        # Formulario de contacto
│   │   ├── UserRow.tsx            # Fila de usuario con modos lectura/edición
│   │   ├── ProductRow.tsx         # Fila de producto con modos lectura/edición
│   │   └── index.ts
│   │
│   ├── organisms/                 # Organismos: Secciones complejas de la interfaz
│   │   ├── SiteHeader.tsx         # Barra de navegación principal y accesos por rol
│   │   ├── SiteFooter.tsx         # Pie de página institucional y créditos
│   │   ├── Notice.tsx             # Banner de notificaciones toast/alerta
│   │   ├── ProductGrid.tsx        # Grilla responsiva de productos
│   │   ├── CartTable.tsx          # Tabla completa de productos en el carrito
│   │   ├── HeroSection.tsx        # Banner principal de inicio con llamadas a la acción
│   │   ├── AdminUsersPanel.tsx    # Panel de administración de usuarios (CRUD)
│   │   ├── AdminProductsPanel.tsx # Panel de administración de inventario (CRUD)
│   │   ├── AdminOrdersPanel.tsx   # Panel de historial global de pedidos
│   │   ├── AdminReportsPanel.tsx  # Panel ejecutivo de estadísticas y stock crítico
│   │   └── index.ts
│   │
│   └── index.ts                   # Exportación unificada de todos los componentes
```

---

## 4. Matriz de Verificación del Uso de Props

A continuación se detalla la verificación de props en cada componente y página del proyecto:

### 4.1. Átomos (`src/components/atoms`)
| Componente | Tipo de Props | Propiedades recibidas vía Props |
| :--- | :--- | :--- |
| `Button` | `ButtonProps` | `variant`, `size`, `icon`, `isLoading`, `onClick`, `children`, `disabled`, `type` |
| `Badge` | `BadgeProps` | `variant`, `pill`, `children`, `className`, `icon` |
| `Input` | `InputProps` | `label`, `helperText`, `error`, `icon`, `value`, `onChange`, `required`, `placeholder` |
| `Select` | `SelectProps` | `label`, `options: SelectOption[]`, `value`, `onChange`, `error`, `helperText` |
| `StatBox` | `StatBoxProps` | `value`, `label`, `icon`, `variant`, `subtext` |
| `SectionHeader` | `SectionHeaderProps` | `eyebrow`, `title`, `subtitle`, `action: { label, onClick, icon }`, `center` |

### 4.2. Moléculas (`src/components/molecules`)
| Componente | Tipo de Props | Propiedades recibidas vía Props |
| :--- | :--- | :--- |
| `ProductCard` | `ProductCardProps` | `product: Product`, `onAddToCart: (id) => void`, `onViewDetail: (id) => void` |
| `CartItemRow` | `CartItemRowProps` | `item: CartItem`, `product: Product`, `onIncrease: (id) => void`, `onDecrease: (id) => void` |
| `CartSummary` | `CartSummaryProps` | `subtotal`, `shipping`, `total`, `itemCount`, `onCheckout: () => void`, `onClearCart: () => void` |
| `FilterBar` | `FilterBarProps` | `category`, `categoryOptions`, `priceMin`, `priceMax`, `onCategoryChange`, `onPriceMinChange`, `onPriceMaxChange`, `onResetFilters` |
| `OrderCard` | `OrderCardProps` | `order: Order`, `role: UserRole`, `availableRepartidores`, `onAssignRepartidor`, `onUpdateStatus` |
| `ContactForm` | `ContactFormProps` | `onSubmit: (data) => void` |
| `UserRow` | `UserRowProps` | `user`, `index`, `isEditing`, `onStartEdit`, `onCancelEdit`, `onSaveEdit`, `onToggleActive`, `onRoleChange` |
| `ProductRow` | `ProductRowProps` | `product`, `isEditing`, `categories`, `onStartEdit`, `onCancelEdit`, `onSaveEdit` |

### 4.3. Organismos (`src/components/organisms`)
| Componente | Tipo de Props | Propiedades recibidas vía Props |
| :--- | :--- | :--- |
| `SiteHeader` | `SiteHeaderProps` | `cartCount: number`, `currentUser: User \| null`, `onNavigate: (path) => void`, `onLogout: () => void` |
| `SiteFooter` | `SiteFooterProps` | `brandName?: string`, `year?: number`, `onNavigate?: (path) => void` |
| `Notice` | `NoticeProps` | `notice: Notice \| null`, `onClose?: () => void` |
| `ProductGrid` | `ProductGridProps` | `products: Product[]`, `onAddToCart: (id) => void`, `onOpenProduct: (id) => void`, `emptyMessage?: string` |
| `CartTable` | `CartTableProps` | `cart: CartItem[]`, `products: Product[]`, `onIncrease`, `onDecrease`, `onExploreCatalog` |
| `HeroSection` | `HeroSectionProps` | `onExploreCatalog: () => void`, `onRequestContact: () => void` |
| `AdminUsersPanel` | `AdminUsersPanelProps` | `users`, `onRefresh: () => void` |
| `AdminProductsPanel` | `AdminProductsPanelProps` | `products`, `onRefresh: () => void` |
| `AdminOrdersPanel` | `AdminOrdersPanelProps` | `orders: Order[]` |
| `AdminReportsPanel` | `AdminReportsPanelProps` | `orders: Order[]`, `products: Product[]`, `users` |

### 4.4. Páginas (`src/pages`)
| Página | Tipo de Props | Propiedades recibidas vía Props |
| :--- | :--- | :--- |
| `HomePage` | `HomePageProps` | `products: Product[]`, `onNavigate`, `onAddToCart`, `onSetNotice` |
| `CatalogPage` | `CatalogPageProps` | `categoryFilter`, `priceMin`, `priceMax`, `categoryOptions`, `filteredProducts`, callbacks de filtrado y agregación |
| `CartPage` | `CartPageProps` | `cart`, `products`, `subtotal`, `shipping`, `total`, callbacks de cantidad, checkout y limpieza |
| `ProductPage` | `ProductPageProps` | `onAddToCart: (id) => void`, `onNavigate: (path) => void` |
| `AuthPage` | `AuthPageProps` | `mode: 'login' \| 'register'`, `onNavigate`, `onSubmit` |
| `AboutPage` | `AboutPageProps` | `onNavigate?: (path) => void` |
| `ContactPage` | `ContactPageProps` | `onSetNotice?: (notice) => void` |
| `ClienteDashboard` | `ClienteDashboardProps` | `currentUser`, `orders?`, `onNavigate` |
| `OperadorDashboard` | `OperadorDashboardProps` | `currentUser`, `onRefresh?` |
| `RepartidorDashboard` | `RepartidorDashboardProps` | `currentUser`, `onRefresh?` |
| `AdminDashboard` | `AdminDashboardProps` | `currentUser`, `onNavigate?` |

---

## 5. Control de Calidad y Pruebas

### 5.1. Verificación de Compilación TypeScript + Vite
```bash
$ npm run build
> entrega2@0.0.0 build
> tsc -b && vite build

vite v8.3.2 building client environment for production...
transforming...
✓ 79 modules transformed.
rendering chunks...
dist/index.html                                    0.48 kB
dist/assets/index-CfPvEA15.css                   328.33 kB
dist/assets/index-C__GmEhq.js                    424.44 kB
✓ built in 218ms
```
**Resultado:** Exitoso (código de salida `0`). Tipado estricto sin discrepancias.

### 5.2. Verificación de Linter (ESLint)
```bash
$ npm run lint
> entrega2@0.0.0 lint
> eslint .
```
**Resultado:** Exitoso (código de salida `0`). 0 errores, 0 advertencias.

### 5.3. Verificación de Ejecución en Servidor Local
- Servidor Vite corriendo en `http://localhost:5174/`.
- Verificación por petición HTTP: Código `200 OK`.

---

## 6. Cómo Ejecutar el Proyecto

1. **Instalar dependencias:**
   ```bash
   npm install
   ```
2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
3. **Compilar para producción:**
   ```bash
   npm run build
   ```
4. **Verificar linter de código:**
   ```bash
   npm run lint
   ```
