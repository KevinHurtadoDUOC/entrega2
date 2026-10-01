type AuthPageProps = {
  mode: 'login' | 'register';
  onNavigate: (path: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function AuthPage({ mode, onNavigate, onSubmit }: AuthPageProps) {
  return (
    <section className="auth-section">
      <div className="container auth-shell">
        <div className="auth-card">
          <span className="eyebrow accent">{mode === 'login' ? 'Ingreso' : 'Registro'}</span>
          <h1>{mode === 'login' ? 'Bienvenido nuevamente' : 'Crea tu cuenta'}</h1>
          <form className="auth-form" onSubmit={onSubmit}>
            {mode === 'register' ? (
              <>
                <div className="form-row two-columns">
                  <label>
                    Nombre
                    <input type="text" name="nombre" placeholder="Tu nombre" required />
                  </label>
                  <label>
                    Apellido
                    <input type="text" name="apellido" placeholder="Tu apellido" required />
                  </label>
                </div>

                <div className="form-row two-columns">
                  <label>
                    Fecha de nacimiento
                    <input type="date" name="fechaNacimiento" required />
                  </label>
                  <label>
                    Género
                    <select name="genero" required>
                      <option value="">Selecciona</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                      <option value="No binario">No binario</option>
                      <option value="Prefiero no decir">Prefiero no decir</option>
                    </select>
                  </label>
                </div>

                <div className="form-row two-columns">
                  <label>
                    Correo
                    <input type="email" name="email" placeholder="nombre@duocuc.cl" required />
                  </label>
                  <label>
                    Región
                    <select name="region" required>
                      <option value="">Selecciona</option>
                      <option value="Metropolitana">Metropolitana</option>
                      <option value="Valparaíso">Valparaíso</option>
                      <option value="Biobío">Biobío</option>
                      <option value="La Araucanía">La Araucanía</option>
                      <option value="Otra">Otra</option>
                    </select>
                  </label>
                </div>

                <label>
                  Dirección
                  <input type="text" name="direccion" placeholder="Tu dirección" required />
                </label>

                <div className="form-row two-columns">
                  <label>
                    Contraseña
                    <input type="password" name="password" placeholder="Mínimo 8 caracteres" required />
                  </label>
                  <label>
                    Confirmar contraseña
                    <input type="password" name="confirmPassword" placeholder="Repite tu contraseña" required />
                  </label>
                </div>

                <label className="checkbox-wrap">
                  <input type="checkbox" name="terms" required />
                  <span>Acepto los términos y condiciones.</span>
                </label>
                <button type="submit" className="btn btn-primary full-width">Crear cuenta</button>
              </>
            ) : (
              <>
                <label>
                  Correo
                  <input type="email" name="email" placeholder="nombre@duocuc.cl" required />
                </label>
                <label>
                  Contraseña
                  <input type="password" name="password" placeholder="Tu contraseña" required />
                </label>
                <button type="submit" className="btn btn-primary full-width">Ingresar</button>
              </>
            )}

            <p className="auth-link">
              {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
              <button type="button" className="text-button" onClick={() => onNavigate(mode === 'login' ? '/register' : '/login')}>
                {mode === 'login' ? 'Regístrate aquí' : 'Inicia sesión'}
              </button>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
