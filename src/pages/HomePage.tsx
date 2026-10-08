import type { Notice, Product } from '../types';
import { HeroSection } from '../components/organisms/HeroSection';
import { ProductGrid } from '../components/organisms/ProductGrid';
import { ContactForm } from '../components/molecules/ContactForm';
import { SectionHeader } from '../components/atoms/SectionHeader';
import { StatBox } from '../components/atoms/StatBox';

export interface HomePageProps {
  products: Product[];
  onNavigate: (path: string) => void;
  onAddToCart: (productId: string) => void;
  onSetNotice: (notice: Notice) => void;
}

export function HomePage({ products, onNavigate, onAddToCart, onSetNotice }: HomePageProps) {
  const goToSection = (targetId: 'about' | 'contact') => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleContactSubmit = () => {
    onSetNotice({
      message: '¡Gracias por contactarnos! Tu consulta ha sido enviada con éxito.',
      type: 'success',
    });
  };

  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      {/* Hero Section Organism */}
      <HeroSection
        onExploreCatalog={() => onNavigate('/catalog')}
        onRequestContact={() => goToSection('contact')}
      />

      {/* Featured Products Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <SectionHeader
            eyebrow="Productos destacados"
            title="Lo más vendido de El Volcán"
            subtitle="Cilindros de gas y reguladores con disponibilidad de entrega inmediata."
            action={{
              label: 'Ver catálogo completo',
              onClick: () => onNavigate('/catalog'),
              icon: 'bi bi-arrow-right',
            }}
          />

          <ProductGrid
            products={featuredProducts}
            onAddToCart={onAddToCart}
            onOpenProduct={(id) => onNavigate(`/product/${id}`)}
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5 bg-light border-top border-bottom">
        <div className="container">
          <div className="row g-4 align-items-center mb-4">
            <div className="col-12 col-lg-6">
              <span className="badge bg-warning-subtle text-warning-emphasis text-uppercase px-3 py-1.5 mb-2 fw-semibold">
                Quiénes somos
              </span>
              <h2 className="display-6 fw-bold text-dark mb-3">
                Una empresa local comprometida con la seguridad y la puntualidad.
              </h2>
              <p className="text-muted lead fs-6 mb-3">
                Distribuidora de Gas El Volcán nace con la misión de entregar soluciones
                confiables para hogares, restaurantes y pequeños negocios.
              </p>
              <p className="text-muted fs-6">
                Nuestro equipo combina experiencia técnica con un servicio cercano, asegurando
                que cada cliente reciba la mejor asesoría en el uso seguro del gas licuado.
              </p>
            </div>

            <div className="col-12 col-lg-6">
              <div className="row g-3">
                <div className="col-12 col-sm-6">
                  <StatBox
                    value="+10 años"
                    label="Experiencia"
                    variant="primary"
                    icon="bi bi-clock-history"
                    subtext="En el rubro del gas"
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <StatBox
                    value="2.500+"
                    label="Clientes"
                    variant="success"
                    icon="bi bi-emoji-smile"
                    subtext="Hogares atendidos"
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <StatBox
                    value="100%"
                    label="Certificado"
                    variant="warning"
                    icon="bi bi-shield-check"
                    subtext="Normativa SEC"
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <StatBox
                    value="24/7"
                    label="Atención"
                    variant="info"
                    icon="bi bi-headset"
                    subtext="Soporte y contacto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5 bg-white">
        <div className="container">
          <SectionHeader
            eyebrow="Contáctanos"
            title="Déjanos tu consulta o pedido especial"
            subtitle="¿Tienes dudas sobre compatibilidad o necesitas cotización para empresas? Escríbenos."
          />

          <div className="row g-4 align-items-stretch">
            <div className="col-12 col-lg-6">
              <div className="card shadow-sm border-0 h-100 p-4">
                <ContactForm onSubmit={handleContactSubmit} />
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="card shadow-sm border-0 h-100 overflow-hidden" style={{ minHeight: '350px' }}>
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
      </section>
    </div>
  );
}
