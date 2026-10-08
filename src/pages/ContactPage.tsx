import type { Notice } from '../types';
import { SectionHeader } from '../components/atoms/SectionHeader';
import { ContactForm } from '../components/molecules/ContactForm';

export interface ContactPageProps {
  onSetNotice?: (notice: Notice) => void;
}

export function ContactPage({ onSetNotice }: ContactPageProps) {
  const handleContactSubmit = () => {
    if (onSetNotice) {
      onSetNotice({
        message: '¡Gracias por contactarnos! Tu mensaje fue recibido y te responderemos a la brevedad.',
        type: 'success',
      });
    } else {
      alert('¡Gracias por contactarnos! Tu mensaje fue recibido.');
    }
  };

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        <SectionHeader
          eyebrow="Canales de Comunicación"
          title="Contáctanos — Estamos para Ayudarte"
          subtitle="Déjanos tus consultas sobre cilindros, instalaciones o cotizaciones comerciales."
        />

        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <div className="card shadow-sm border-0 h-100 p-4 p-md-5">
              <h4 className="fw-bold text-dark mb-3">Envíanos un mensaje</h4>
              <p className="text-muted small mb-4">
                Completa el siguiente formulario y un ejecutivo técnico se pondrá en contacto contigo.
              </p>
              <ContactForm onSubmit={handleContactSubmit} />
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="card shadow-sm border-0 h-100 p-4 p-md-5 d-flex flex-column">
              <h4 className="fw-bold text-dark mb-3">Nuestra Ubicación y Contacto Directo</h4>
              <ul className="list-unstyled text-muted mb-4">
                <li className="mb-2 d-flex align-items-center gap-2">
                  <i className="bi bi-geo-alt-fill text-danger fs-5" />
                  <span>Av. Concha y Toro #1234, Puente Alto, Santiago</span>
                </li>
                <li className="mb-2 d-flex align-items-center gap-2">
                  <i className="bi bi-telephone-fill text-primary fs-5" />
                  <span>+56 9 1234 5678 / (02) 2890 0000</span>
                </li>
                <li className="mb-2 d-flex align-items-center gap-2">
                  <i className="bi bi-envelope-fill text-warning fs-5" />
                  <span>contacto@elvolcan.cl</span>
                </li>
              </ul>

              <div className="flex-grow-1 rounded-3 overflow-hidden border" style={{ minHeight: '260px' }}>
                <iframe
                  src="https://www.google.com/maps?q=Santiago%20Chile&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa de ubicación"
                  className="w-100 h-100 border-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
