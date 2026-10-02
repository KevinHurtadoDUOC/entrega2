import { getUsers, queueNotice, saveUsers, setCurrentUser } from './storage';

const getFormValues = (formData: FormData) => {
  const data: Record<string, string> = {};
  formData.forEach((value, key) => {
    data[key] = String(value);
  });
  return data;
};

export function registerUser(event: React.FormEvent<HTMLFormElement>): boolean {
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
    return false;
  }

  if (!validateRegistration(data)) {
    return false;
  }

  if (!/^[^\s@]+@duocuc\.cl$/i.test(email)) {
    queueNotice('El correo debe tener dominio @duocuc.cl', 'error');
    return false;
  }

  if (password !== confirmPassword) {
    queueNotice('Las contraseñas no coinciden.', 'error');
    return false;
  }

  if (!passwordIsSecure(password)) {
    queueNotice('La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números.', 'error');
    return false;
  }

  const existingUser = users.find((user) => String(user.email ?? '').toLowerCase() === email);
  if (existingUser) {
    queueNotice('Este correo ya está registrado.', 'error');
    return false;
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
  return true;
}

export function loginUser(event: React.FormEvent<HTMLFormElement>): boolean {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');


  const users = getUsers();
  const user = users.find((item) => String(item.email ?? '').toLowerCase() === email);

  if (!user) {
    queueNotice('Correo o contraseña incorrectos.', 'error');
    return false;
  }

  if (String(user.password ?? '') !== password) {
    queueNotice('Correo o contraseña incorrectos.', 'error');
    return false;
  }
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
  return true;
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
