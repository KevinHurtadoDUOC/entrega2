import { useState } from 'react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';

export interface ContactFormProps {
  onSubmit: (formData: { nombre: string; email: string; mensaje: string }) => void;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ nombre, email, mensaje });
    setNombre('');
    setEmail('');
    setMensaje('');
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <Input
            label="Nombre"
            placeholder="Tu nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            icon="bi bi-person"
          />
        </div>
        <div className="col-12 col-md-6">
          <Input
            label="Correo electrónico"
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            icon="bi bi-envelope"
          />
        </div>
        <div className="col-12">
          <div className="mb-3">
            <label htmlFor="contact-mensaje" className="form-label fw-semibold">
              Mensaje
            </label>
            <textarea
              id="contact-mensaje"
              className="form-control"
              rows={4}
              placeholder="¿En qué te podemos ayudar? Escribe tu consulta aquí..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-12">
          <Button
            type="submit"
            variant="primary"
            icon="bi bi-send"
            className="w-100 py-2"
          >
            Enviar mensaje
          </Button>
        </div>
      </div>
    </form>
  );
}
