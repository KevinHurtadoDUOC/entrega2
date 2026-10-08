import React from 'react';
import { Button } from '../components/atoms/Button';

export interface AuthPageProps {
  mode: 'login' | 'register';
  onNavigate: (path: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function AuthPage({ mode, onNavigate, onSubmit }: AuthPageProps) {
  const isLogin = mode === 'login';

  return (
    <div className="py-5 bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow border-0 rounded-4 overflow-hidden">
              <div className="card-header bg-primary text-white text-center py-4 border-0">
                <div
                  className="rounded-circle bg-white text-primary mx-auto mb-2 d-flex align-items-center justify-content-center shadow-sm"
                  style={{ width: '56px', height: '56px' }}
                >
                  <i className={`bi ${isLogin ? 'bi-box-arrow-in-right' : 'bi-person-plus'} fs-3`} />
                </div>
                <h3 className="h4 fw-bold mb-1">
                  {isLogin ? 'Bienvenido nuevamente' : 'Crea tu cuenta oficial'}
                </h3>
                <p className="small text-white-50 mb-0">
                  {isLogin
                    ? 'Ingresa tus credenciales institucionales'
                    : 'Regístrate con tu correo @duocuc.cl'}
                </p>
              </div>

              <div className="card-body p-4 p-md-5">
                <form onSubmit={onSubmit}>
                  {!isLogin ? (
                    <>
                      <div className="row g-3 mb-3">
                        <div className="col-12 col-sm-6">
                          <label className="form-label fw-semibold">Nombre</label>
                          <input
                            type="text"
                            name="nombre"
                            className="form-control"
                            placeholder="Tu nombre"
                            required
                          />
                        </div>
                        <div className="col-12 col-sm-6">
                          <label className="form-label fw-semibold">Apellido</label>
                          <input
                            type="text"
                            name="apellido"
                            className="form-control"
                            placeholder="Tu apellido"
                            required
                          />
                        </div>
                      </div>

                      <div className="row g-3 mb-3">
                        <div className="col-12 col-sm-6">
                          <label className="form-label fw-semibold">Fecha de nacimiento</label>
                          <input
                            type="date"
                            name="fechaNacimiento"
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="col-12 col-sm-6">
                          <label className="form-label fw-semibold">Género</label>
                          <select name="genero" className="form-select" required defaultValue="">
                            <option value="" disabled>Selecciona</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="No binario">No binario</option>
                            <option value="Prefiero no decir">Prefiero no decir</option>
                          </select>
                        </div>
                      </div>

                      <div className="row g-3 mb-3">
                        <div className="col-12 col-sm-6">
                          <label className="form-label fw-semibold">Correo institucional</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="usuario@duocuc.cl"
                            required
                          />
                        </div>
                        <div className="col-12 col-sm-6">
                          <label className="form-label fw-semibold">Región</label>
                          <select name="region" className="form-select" required defaultValue="">
                            <option value="" disabled>Selecciona</option>
                            <option value="Metropolitana">Metropolitana</option>
                            <option value="Valparaíso">Valparaíso</option>
                            <option value="Biobío">Biobío</option>
                            <option value="La Araucanía">La Araucanía</option>
                            <option value="Otra">Otra</option>
                          </select>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">Dirección</label>
                        <input
                          type="text"
                          name="direccion"
                          className="form-control"
                          placeholder="Calle, número, depto / comuna"
                          required
                        />
                      </div>

                      <div className="row g-3 mb-3">
                        <div className="col-12 col-sm-6">
                          <label className="form-label fw-semibold">Contraseña</label>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Mínimo 8 caracteres"
                            required
                          />
                        </div>
                        <div className="col-12 col-sm-6">
                          <label className="form-label fw-semibold">Confirmar contraseña</label>
                          <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            placeholder="Repite tu contraseña"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-check mb-4">
                        <input
                          type="checkbox"
                          name="terms"
                          className="form-check-input"
                          id="terms-check"
                          required
                        />
                        <label className="form-check-label small text-muted" htmlFor="terms-check">
                          Acepto los términos y condiciones de servicio.
                        </label>
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        icon="bi bi-person-check"
                        className="w-100"
                      >
                        Crear cuenta
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Correo institucional</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light text-muted">
                            <i className="bi bi-envelope" />
                          </span>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="usuario@duocuc.cl"
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="form-label fw-semibold">Contraseña</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light text-muted">
                            <i className="bi bi-lock" />
                          </span>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Tu contraseña"
                            required
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        icon="bi bi-box-arrow-in-right"
                        className="w-100"
                      >
                        Ingresar a la plataforma
                      </Button>
                    </>
                  )}
                </form>

                <div className="text-center mt-4 pt-3 border-top">
                  <p className="text-muted small mb-0">
                    {isLogin ? '¿Aún no tienes una cuenta?' : '¿Ya tienes una cuenta registrada?'}{' '}
                    <button
                      type="button"
                      className="btn btn-link p-0 text-decoration-none fw-semibold"
                      onClick={() => onNavigate(isLogin ? '/register' : '/login')}
                    >
                      {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
