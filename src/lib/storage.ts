import { SEED_PRODUCTS } from '../data/products';
import { SEED_USERS } from '../data/users';
import type { CartItem, Order, Product, User } from '../types';

export const STORAGE_KEYS = {
  products: 'ev_products',
  cart: 'ev_cart',
  users: 'ev_users',
  currentUser: 'ev_currentUser',
  orders: 'ev_orders',
} as const;

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function normalizeProducts(products: Product[]): Product[] {
  return products.map((product) => ({
    ...product,
    imagen: product.imagen || SEED_PRODUCTS.find((seed) => seed.id === product.id)?.imagen || product.imagen,
  }));
}

export function ensureSeedProducts() {
  const existing = safeParse<Product[]>(localStorage.getItem(STORAGE_KEYS.products));

  if (!existing || existing.length === 0) {
    localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(SEED_PRODUCTS));
    return;
  }

  const normalizedProducts = normalizeProducts(existing);
  const hasUpdatedImages = JSON.stringify(existing) !== JSON.stringify(normalizedProducts);

  if (hasUpdatedImages) {
    localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(normalizedProducts));
  }
}

export function ensureSeedUsers() {
  const existing = safeParse<Array<Record<string, string | boolean | undefined>>>(localStorage.getItem(STORAGE_KEYS.users));

  if (!existing || existing.length === 0) {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(SEED_USERS));
    return;
  }

  let hasChanges = false;
  const merged = [...existing];

  for (const seed of SEED_USERS) {
    const exists = merged.some((u) => String(u.email ?? '').toLowerCase() === seed.email.toLowerCase());
    if (!exists) {
      merged.push(seed);
      hasChanges = true;
    }
  }

  if (hasChanges) {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(merged));
  }
}

export function getProducts(): Product[] {
  ensureSeedProducts();
  return safeParse<Product[]>(localStorage.getItem(STORAGE_KEYS.products)) ?? [];
}

export function saveProducts(products: Product[]) {
  localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
}

export function getCart(): CartItem[] {
  return safeParse<CartItem[]>(localStorage.getItem(STORAGE_KEYS.cart)) ?? [];
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
}

export function getUsers(): Array<Record<string, string | boolean | undefined>> {
  ensureSeedUsers();
  return safeParse<Array<Record<string, string | boolean | undefined>>>(localStorage.getItem(STORAGE_KEYS.users)) ?? [];
}

export function saveUsers(users: Array<Record<string, string | boolean | undefined>>) {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
}

export function getCurrentUser(): User | null {
  return safeParse<User>(localStorage.getItem(STORAGE_KEYS.currentUser));
}

export function setCurrentUser(user: User) {
  localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
  window.dispatchEvent(new Event('ev_auth_change'));
}

export function removeCurrentUser() {
  localStorage.removeItem(STORAGE_KEYS.currentUser);
  window.dispatchEvent(new Event('ev_auth_change'));
}

export function getProductById(productId: string | null): Product | undefined {
  return getProducts().find((item) => item.id === productId);
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(value);
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.cantidad, 0);
}

export function queueNotice(message: string, type: 'success' | 'error' | 'info' = 'info') {
  sessionStorage.setItem('ev_notice', JSON.stringify({ message, type }));
}

// --- Orders ---

export function getOrders(): Order[] {
  return safeParse<Order[]>(localStorage.getItem(STORAGE_KEYS.orders)) ?? [];
}

export function saveOrders(orders: Order[]) {
  localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
}

export function addOrder(order: Order) {
  const orders = getOrders();
  orders.push(order);
  saveOrders(orders);
}

export function updateOrderStatus(orderId: string, estado: Order['estado'], repartidor?: string) {
  const orders = getOrders();
  const order = orders.find((o) => o.id === orderId);
  if (!order) return;
  order.estado = estado;
  if (repartidor !== undefined) order.repartidor = repartidor;
  saveOrders(orders);
}
