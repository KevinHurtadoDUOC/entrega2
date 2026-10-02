import { addOrder, getCart, getCurrentUser, getProductById, getProducts, getCartCount, getUsers, queueNotice, saveCart, saveProducts } from './storage';
import type { Order, OrderItem } from '../types';

export function addToCart(productId: string, quantity = 1) {
  const products = getProducts();
  const cart = getCart();
  const product = products.find((item) => item.id === productId);

  if (!product) {
    queueNotice('Producto no encontrado.', 'error');
    return;
  }

  const existingItem = cart.find((item) => item.id === productId);
  const currentQty = existingItem ? existingItem.cantidad : 0;
  const availableQty = product.stock - currentQty;

  if (quantity > availableQty) {
    queueNotice(`No puedes agregar más de ${availableQty} unidades. Stock disponible: ${product.stock}`, 'error');
    return;
  }

  if (existingItem) {
    existingItem.cantidad += quantity;
  } else {
    cart.push({ id: productId, cantidad: quantity });
  }

  saveCart(cart);
  queueNotice('Producto agregado al carrito.', 'success');
}

export function increaseQty(productId: string) {
  const cart = getCart();
  const product = getProductById(productId);
  const item = cart.find((entry) => entry.id === productId);

  if (!item || !product) return;

  if (item.cantidad >= product.stock) {
    queueNotice('No hay más stock disponible para este producto.', 'error');
    return;
  }

  item.cantidad += 1;
  saveCart(cart);
}

export function decreaseQty(productId: string) {
  const cart = getCart();
  const itemIndex = cart.findIndex((entry) => entry.id === productId);

  if (itemIndex === -1) return;

  if (cart[itemIndex].cantidad > 1) {
    cart[itemIndex].cantidad -= 1;
    saveCart(cart);
    return;
  }

  cart.splice(itemIndex, 1);
  saveCart(cart);
}

export function clearCartItems() {
  saveCart([]);
}

export function checkoutCart(): boolean {
  const cart = getCart();
  const products = getProducts();
  const currentUser = getCurrentUser();

  if (!cart.length) {
    queueNotice('Tu carrito está vacío.', 'error');
    return false;
  }

  if (!currentUser) {
    queueNotice('Debes iniciar sesión para finalizar tu compra.', 'error');
    return false;
  }

  const orderItems: OrderItem[] = [];

  for (const item of cart) {
    const product = products.find((entry) => entry.id === item.id);
    if (!product) continue;

    const remainingStock = product.stock - item.cantidad;
    if (remainingStock < 0) {
      queueNotice(`No hay stock suficiente para ${product.nombre}.`, 'error');
      return false;
    }

    product.stock = remainingStock;
    orderItems.push({
      productId: product.id,
      nombre: product.nombre,
      cantidad: item.cantidad,
      precioUnitario: product.precioOferta,
    });
  }

  const subtotal = orderItems.reduce((sum, i) => sum + i.precioUnitario * i.cantidad, 0);
  const shipping = 2500;

  const users = getUsers();
  const storedUser = users.find((u) => String(u.email ?? '').toLowerCase() === currentUser.email.toLowerCase());
  const direccion = String(storedUser?.direccion ?? 'Sin dirección');

  const order: Order = {
    id: `ORD-${Date.now()}`,
    cliente: currentUser.email,
    clienteNombre: `${currentUser.nombre} ${currentUser.apellido}`,
    direccion,
    estado: 'pendiente',
    items: orderItems,
    total: subtotal + shipping,
    fecha: new Date().toISOString(),
  };

  saveProducts(products);
  saveCart([]);
  addOrder(order);
  queueNotice('Compra finalizada con éxito. Tu pedido está pendiente.', 'success');
  return true;
}

export function getCartSnapshot() {
  const cart = getCart();
  const products = getProducts();
  const subtotal = cart.reduce((sum: number, item) => {
    const product = products.find((storedProduct) => storedProduct.id === item.id);
    return sum + (product ? product.precioOferta * item.cantidad : 0);
  }, 0);

  return {
    cart,
    subtotal,
    shipping: subtotal > 0 ? 2500 : 0,
    total: subtotal + (subtotal > 0 ? 2500 : 0),
    count: getCartCount(),
  };
}
