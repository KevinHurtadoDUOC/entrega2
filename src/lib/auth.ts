import { getUsers, queueNotice, saveUsers, setCurrentUser } from './storage';

const getFormValues = (formData: FormData) => {
  const data: Record<string, string> = {};
  formData.forEach((value, key) => {
    data[key] = String(value);
  });
  return data;
};

export function registerUser(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const data = getFormValues(formData);
  const users = getUsers();
  const password = String(data.password ?? '');
  const confirmPassword = String(data.confirmPassword ?? '');
  const nombre = String(data.nombre ?? '').trim();
  const apellido = String(data.apellido ?? '').trim();
  const direccion = String(data.direccion ?? '').trim();
  const email = String(data.email ?? '').trim().toLowerCase();

  if (!nombre || !apellido || !direccion) {
    queueNotice('Nombre, apellido y dirección no pueden estar vacíos.', 'error');
    window.location.hash = '#/register';
    return;
  }

  if (!validateRegistration(data)) {
    return;
  }

  if (!/^[^\s@]+@duocuc\.cl$/i.test(email)) {
    queueNotice('El correo debe tener dominio @duocuc.cl', 'error');
    window.location.hash = '#/register';
    return;
  }

  if (password !== confirmPassword) {
    queueNotice('Las contraseñas no coinciden.', 'error');
    window.location.hash = '#/register';
    return;
  }

  if (!passwordIsSecure(password)) {
    queueNotice('La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números.', 'error');
    window.location.hash = '#/register';
    return;
  }

  const existingUser = users.find((user) => String(user.email ?? '').toLowerCase() === email);
  if (existingUser) {
    queueNotice('Este correo ya está registrado.', 'error');
    window.location.hash = '#/register';
    return;
  }

  users.push({
    nombre,
    apellido,
    fechaNacimiento: String(data.fechaNacimiento ?? ''),
    email,
    password,
    direccion,
    region: String(data.region ?? ''),
    genero: String(data.genero ?? ''),
    terms: Boolean(data.terms),
    role: 'cliente',
  });

  saveUsers(users);
  queueNotice('Registro exitoso. Ahora puedes iniciar sesión.', 'success');
  window.location.hash = '#/login';
}

export function loginUser(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');
  const blockKey = `ev_blocked_${email}`;

  if (localStorage.getItem(blockKey) === 'locked') {
    queueNotice('Cuenta bloqueada por 3 intentos fallidos.', 'error');
    window.location.hash = '#/login';
    return;
  }

  const users = getUsers();
  const user = users.find((item) => String(item.email ?? '').toLowerCase() === email);

  if (!user) {
    handleFailedAttempt(email);
    queueNotice('Correo o contraseña incorrectos.', 'error');
    window.location.hash = '#/login';
    return;
  }

  if (String(user.password ?? '') !== password) {
    handleFailedAttempt(email);
    queueNotice('Correo o contraseña incorrectos.', 'error');
    window.location.hash = '#/login';
    return;
  }

  localStorage.removeItem(blockKey);
  localStorage.removeItem(`ev_attempts_${email}`);

  const normalizedRole = String(user.role ?? 'cliente') as 'admin' | 'operador' | 'repartidor' | 'cliente';
  const token = `token_${btoa(email + ':' + Date.now())}`;

  setCurrentUser({
    email: String(user.email ?? ''),
    nombre: String(user.nombre ?? ''),
    apellido: String(user.apellido ?? ''),
    role: normalizedRole,
    token,
  });

  queueNotice('Inicio de sesión exitoso.', 'success');
  window.location.hash = '#/';
}

export function handleFailedAttempt(email: string) {
  const blockKey = `ev_blocked_${email}`;
  const attemptsKey = `ev_attempts_${email}`;
  const attempts = Number(localStorage.getItem(attemptsKey) ?? 0) + 1;
  localStorage.setItem(attemptsKey, String(attempts));

  if (attempts >= 3) {
    localStorage.setItem(blockKey, 'locked');
    localStorage.setItem(attemptsKey, '0');
    queueNotice('Cuenta bloqueada por 3 intentos fallidos.', 'error');
  }
}

export function passwordIsSecure(password: string) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

export function validateRegistration(data: Record<string, string>) {
  const birthDate = new Date(String(data.fechaNacimiento ?? ''));
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  if (Number.isNaN(birthDate.getTime()) || age < 14) {
    queueNotice('Debes tener al menos 14 años para registrarte.', 'error');
    return false;
  }

  if (data.terms !== 'on') {
    queueNotice('Debes aceptar los términos y condiciones.', 'error');
    return false;
  }

  return true;
}
