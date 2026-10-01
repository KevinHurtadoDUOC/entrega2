import cilindro5kg from '../assets/cilindro_5kg.png';
import cilindro11kg from '../assets/cilindro_11kg.png';
import cilindro15kg from '../assets/cilindro_15kg.png';
import cilindro45kg from '../assets/cilindro_45kg.png';
import reguladorDomestico from '../assets/regulador_domestico.png';
import reguladorAltaPresion from '../assets/regulador_alta_presion.png';
import reguladorDual from '../assets/regulador_dual.png';
import manguera15 from '../assets/manguera_1.5.png';
import mangueraReforzada3m from '../assets/Manguera_reforzada_3m.png';
import kitInstalacion from '../assets/Kit_instalación_gas.png';

import type { Product } from '../types';

export const IMAGE_PATHS: Record<string, string> = {
  CL001: cilindro5kg,
  CL002: cilindro11kg,
  CL003: cilindro15kg,
  CL004: cilindro45kg,
  RG001: reguladorDomestico,
  RG002: reguladorAltaPresion,
  RG003: reguladorDual,
  MG001: manguera15,
  MG002: mangueraReforzada3m,
  KT001: kitInstalacion,
};

export const SEED_PRODUCTS: Product[] = [
  { id: 'CL001', nombre: 'Cilindro GLP 5 kg', categoria: 'Cilindros de Gas', precio: 6500, precioOferta: 6000, stock: 80, descripcion: 'Para uso residencial pequeño.', imagen: IMAGE_PATHS.CL001 },
  { id: 'CL002', nombre: 'Cilindro GLP 11 kg', categoria: 'Cilindros de Gas', precio: 12000, precioOferta: 11000, stock: 200, descripcion: 'Cilindro estándar doméstico.', imagen: IMAGE_PATHS.CL002 },
  { id: 'CL003', nombre: 'Cilindro GLP 15 kg', categoria: 'Cilindros de Gas', precio: 16000, precioOferta: 14500, stock: 90, descripcion: 'Mayor capacidad, alto consumo.', imagen: IMAGE_PATHS.CL003 },
  { id: 'CL004', nombre: 'Cilindro GLP 45 kg', categoria: 'Cilindros de Gas', precio: 45000, precioOferta: 40000, stock: 30, descripcion: 'Uso comercial, restaurantes.', imagen: IMAGE_PATHS.CL004 },
  { id: 'RG001', nombre: 'Regulador doméstico', categoria: 'Reguladores', precio: 8990, precioOferta: 8200, stock: 45, descripcion: 'Presión salida 28 mbar.', imagen: IMAGE_PATHS.RG001 },
  { id: 'RG002', nombre: 'Regulador alta presión', categoria: 'Reguladores', precio: 18990, precioOferta: 17000, stock: 12, descripcion: 'Cocinas industriales.', imagen: IMAGE_PATHS.RG002 },
  { id: 'RG003', nombre: 'Regulador dual', categoria: 'Reguladores', precio: 14990, precioOferta: 13500, stock: 18, descripcion: 'Permite 2 artefactos simultáneos.', imagen: IMAGE_PATHS.RG003 },
  { id: 'MG001', nombre: 'Manguera gas 1.5 m', categoria: 'Mangueras y Conexiones', precio: 3990, precioOferta: 3500, stock: 80, descripcion: 'Homologada 9mm.', imagen: IMAGE_PATHS.MG001 },
  { id: 'MG002', nombre: 'Manguera reforzada 3.0 m', categoria: 'Mangueras y Conexiones', precio: 6500, precioOferta: 6000, stock: 30, descripcion: 'Mayor alcance y durabilidad.', imagen: IMAGE_PATHS.MG002 },
  { id: 'KT001', nombre: 'Kit instalación gas', categoria: 'Mangueras y Conexiones', precio: 12000, precioOferta: 11000, stock: 25, descripcion: 'Incluye abrazaderas y teflón.', imagen: IMAGE_PATHS.KT001 },
];
