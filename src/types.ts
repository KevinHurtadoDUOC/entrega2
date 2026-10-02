export type UserRole = 'admin' | 'operador' | 'repartidor' | 'cliente';
export type View = 'home' | 'catalog' | 'product' | 'cart' | 'login' | 'register';
export type NoticeType = 'success' | 'error' | 'info';
export type OrderStatus = 'pendiente' | 'asignado' | 'en camino' | 'entregado';

export type Product = {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  precioOferta: number;
  stock: number;
  descripcion: string;
  imagen: string;
};

export type CartItem = {
  id: string;
  cantidad: number;
};

export type User = {
  email: string;
  nombre: string;
  apellido: string;
  role: UserRole;
  token?: string;
};

export type Notice = {
  message: string;
  type: NoticeType;
};

export type OrderItem = {
  productId: string;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
};

export type Order = {
  id: string;
  cliente: string;
  clienteNombre: string;
  direccion: string;
  estado: OrderStatus;
  repartidor?: string;
  items: OrderItem[];
  total: number;
  fecha: string;
};
