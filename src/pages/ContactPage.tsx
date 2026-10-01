export function ContactPage() {
  return (
    <section className="contact-section" id="contact">
      <div className="container contact-grid">
        <div className="contact-form-wrap">
          <span className="eyebrow accent">Contáctanos</span>
          <h2>Déjanos tu consulta</h2>
          <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
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
  );
}
