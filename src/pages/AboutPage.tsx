export function AboutPage() {
  return (
    <section className="about-section" id="about">
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
  );
}
