import type { NavigateFunction } from 'react-router-dom';
import type { Notice, Product } from '../types';
import { ProductGrid } from '../components/ProductGrid';
import { formatCurrency } from '../lib/storage';

type HomePageProps = {
  products: Product[];
  onNavigate: NavigateFunction;
  onAddToCart: (productId: string) => void;
  onSetNotice: (notice: Notice) => void;
};

export function HomePage({ products, onNavigate, onAddToCart, onSetNotice }: HomePageProps) {
  const goToSection = (target: '/about' | '/contact') => {
    onNavigate(target);
    requestAnimationFrame(() => {
      const section = document.getElementById(target.slice(1));
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Calidez y seguridad en cada hogar</span>
            <h1>Gas para tu casa, negocio y proyectos.</h1>
            <p>
              En Distribuidora de Gas El Volcán entregamos cilindros, reguladores,
              mangueras y kits de instalación con atención rápida y precios competitivos.
            </p>
            <div className="hero-actions">
              <button type="button" className="btn btn-primary" onClick={() => onNavigate('/catalog')}>Ver catálogo</button>
              <button type="button" className="btn btn-secondary" onClick={() => goToSection('/contact')}>Solicitar asesoría</button>
            </div>
            <ul className="hero-features">
              <li>Entrega inmediata</li>
              <li>Productos certificados</li>
              <li>Soporte experto</li>
            </ul>
          </div>

          <div className="hero-visual">
            <div className="visual-card visual-card-large">
              <span className="card-badge">Oferta</span>
              <h3>Cilindro 15 kg</h3>
              <p>Ideal para hogares con mayor consumo.</p>
              <strong>{formatCurrency(14500)}</strong>
            </div>
            <div className="visual-card visual-card-small">
              <h4>Regulador dual</h4>
              <span>Disponible hoy</span>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="eyebrow accent">Productos destacados</span>
              <h2>Lo más vendido de El Volcán</h2>
            </div>
            <button type="button" className="text-link" onClick={() => onNavigate('/catalog')}>Ver todo</button>
          </div>
          <ProductGrid products={products.slice(0, 3)} onAddToCart={onAddToCart} onOpenProduct={(id) => onNavigate(`/product/${id}`)} />
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="container about-grid">
          <div className="about-copy">
            <span className="eyebrow accent">Quiénes somos</span>
            <h2>Una empresa local comprometida con la seguridad.</h2>
            <p>Distribuidora de Gas El Volcán nace con la misión de entregar soluciones confiables para hogares, restaurantes y pequeños negocios.</p>
            <p>Nuestro equipo combina experiencia técnica con un servicio cercano, para asegurar que cada cliente reciba la mejor recomendación según sus necesidades.</p>
          </div>
          <div className="about-stats">
            <div className="stat-box"><strong>+10 años</strong><span>de experiencia</span></div>
            <div className="stat-box"><strong>2.500+</strong><span>clientes atendidos</span></div>
            <div className="stat-box"><strong>24/7</strong><span>atención por contacto</span></div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container contact-grid">
          <div className="contact-form-wrap">
            <span className="eyebrow accent">Contáctanos</span>
            <h2>Déjanos tu consulta</h2>
            <form
              className="contact-form"
              onSubmit={(event) => {
                event.preventDefault();
                onSetNotice({ message: 'Gracias por contactarnos.', type: 'success' });
                event.currentTarget.reset();
              }}
            >
              <div className="form-row two-columns">
                <label>
                  Nombre
                  <input type="text" placeholder="Tu nombre" />
                </label>
                <label>
                  Correo
                  <input type="email" placeholder="correo@ejemplo.com" />
                </label>
              </div>
              <label>
                Mensaje
                <textarea rows={5} placeholder="Escribe tu consulta..." />
              </label>
              <button type="submit" className="btn btn-primary">Enviar mensaje</button>
            </form>
          </div>

          <div className="map-card">
            <iframe src="https://www.google.com/maps?q=Santiago%20Chile&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mapa de ubicación" />
          </div>
        </div>
      </section>
    </>
  );
}
