import type { User, UserRole } from '../types';

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: ['*'],
  operador: ['orders:read', 'orders:update', 'orders:assign'],
  repartidor: ['orders:own', 'orders:update-status'],
  cliente: ['orders:create', 'orders:own-read'],
};

export const PUBLIC_ROUTES = ['/', '/login', '/register', '/about', '/contact', '/catalog'];

export function isAuthenticated(user: User | null): boolean {
  return Boolean(user?.token && user.email);
}

export function hasRoleAccess(user: User | null, requiredRole: UserRole | UserRole[]): boolean {
  if (!user) return false;
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  return roles.includes(user.role);
}

export function canAccessRoute(user: User | null, pathname: string): boolean {
  if (PUBLIC_ROUTES.includes(pathname)) return true;
  if (!user || !user.token) return false;

  if (pathname.startsWith('/admin')) return user.role === 'admin';
  if (pathname.startsWith('/operador')) return user.role === 'operador';
  if (pathname.startsWith('/repartidor')) return user.role === 'repartidor';
  if (pathname.startsWith('/cliente')) return user.role === 'cliente';

  return true;
}
