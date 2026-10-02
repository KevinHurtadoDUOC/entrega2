import type { UserRole } from '../types';

export type StoredUser = {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  role: UserRole;
  direccion: string;
  region: string;
  genero: string;
  fechaNacimiento?: string;
  terms: boolean;
};

export const SEED_USERS: StoredUser[] = [
  {
    nombre: 'Admin',
    apellido: 'Principal',
    email: 'admin@duocuc.cl',
    password: 'Admin123',
    role: 'admin',
    direccion: 'Av. Central 123',
    region: 'Metropolitana',
    genero: 'Prefiero no decir',
    fechaNacimiento: '1990-01-01',
    terms: true,
  },
  {
    nombre: 'Carlos',
    apellido: 'Operador',
    email: 'operador@duocuc.cl',
    password: 'Operador123',
    role: 'operador',
    direccion: 'Planta de Distribución',
    region: 'Metropolitana',
    genero: 'Masculino',
    fechaNacimiento: '1992-05-15',
    terms: true,
  },
  {
    nombre: 'Pedro',
    apellido: 'Repartidor',
    email: 'repartidor@duocuc.cl',
    password: 'Repartidor123',
    role: 'repartidor',
    direccion: 'Base de Reparto',
    region: 'Metropolitana',
    genero: 'Masculino',
    fechaNacimiento: '1995-08-20',
    terms: true,
  },
  {
    nombre: 'Juan',
    apellido: 'Cliente',
    email: 'cliente@duocuc.cl',
    password: 'Cliente123',
    role: 'cliente',
    direccion: 'Pasaje Los Álamos 45',
    region: 'Metropolitana',
    genero: 'Masculino',
    fechaNacimiento: '1998-12-10',
    terms: true,
  },
];
