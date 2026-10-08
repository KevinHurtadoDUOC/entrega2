import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: string;
  wrapperClassName?: string;
}

export function Input({
  label,
  helperText,
  error,
  icon,
  wrapperClassName = '',
  className = '',
  id,
  ...rest
}: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`mb-3 ${wrapperClassName}`.trim()}>
      {label && (
        <label htmlFor={inputId} className="form-label fw-semibold">
          {label}
        </label>
      )}
      <div className={icon ? 'input-group' : ''}>
        {icon && (
          <span className="input-group-text bg-light text-muted">
            <i className={icon} />
          </span>
        )}
        <input
          id={inputId}
          className={`form-control ${error ? 'is-invalid' : ''} ${className}`.trim()}
          {...rest}
        />
      </div>
      {error && <div className="invalid-feedback d-block">{error}</div>}
      {!error && helperText && <small className="form-text text-muted">{helperText}</small>}
    </div>
  );
}
