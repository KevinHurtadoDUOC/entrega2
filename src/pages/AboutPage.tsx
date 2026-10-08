import { SectionHeader } from '../components/atoms/SectionHeader';
import { StatBox } from '../components/atoms/StatBox';
import { Button } from '../components/atoms/Button';

export interface AboutPageProps {
  onNavigate?: (path: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        <SectionHeader
          eyebrow="Nuestra Historia"
          title="Quiénes Somos — Gas El Volcán"
          subtitle="Una empresa local comprometida con la seguridad y el confort de las familias chilenas."
        />

        <div className="row g-4 align-items-center mb-5">
          <div className="col-12 col-lg-7">
            <div className="card shadow-sm border-0 p-4 p-md-5">
              <h3 className="h4 fw-bold text-dark mb-3">Compromiso, Calidad y Cercanía</h3>
              <p className="text-secondary mb-3">
                Distribuidora de Gas El Volcán nace con la firme misión de entregar soluciones
                energéticas confiables y seguras para hogares, restaurantes y pequeños negocios.
              </p>
              <p className="text-secondary mb-4">
                Nuestro equipo combina amplia experiencia técnica con un servicio humano y
                cercano, garantizando que cada entrega cumpla con los más rigurosos estándares
                de la Superintendencia de Electricidad y Combustibles (SEC).
              </p>
              {onNavigate && (
                <div>
                  <Button
                    variant="primary"
                    icon="bi bi-shop"
                    onClick={() => onNavigate('/catalog')}
                  >
                    Explorar productos disponibles
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="row g-3">
              <div className="col-12 col-sm-6">
                <StatBox
                  value="+10 años"
                  label="Experiencia"
                  variant="primary"
                  icon="bi bi-clock-history"
                  subtext="En distribución"
                />
              </div>
              <div className="col-12 col-sm-6">
                <StatBox
                  value="2.500+"
                  label="Clientes"
                  variant="success"
                  icon="bi bi-emoji-smile"
                  subtext="Hogares satisfechos"
                />
              </div>
              <div className="col-12 col-sm-6">
                <StatBox
                  value="Norma SEC"
                  label="Seguridad"
                  variant="warning"
                  icon="bi bi-shield-check"
                  subtext="100% Certificado"
                />
              </div>
              <div className="col-12 col-sm-6">
                <StatBox
                  value="24/7"
                  label="Atención"
                  variant="info"
                  icon="bi bi-headset"
                  subtext="Canal de contacto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
