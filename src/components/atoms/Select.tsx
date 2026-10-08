import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  helperText?: string;
  error?: string;
  wrapperClassName?: string;
}

export function Select({
  label,
  options,
  helperText,
  error,
  wrapperClassName = '',
  className = '',
  id,
  ...rest
}: SelectProps) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`mb-3 ${wrapperClassName}`.trim()}>
      {label && (
        <label htmlFor={selectId} className="form-label fw-semibold">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`form-select ${error ? 'is-invalid' : ''} ${className}`.trim()}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback d-block">{error}</div>}
      {!error && helperText && <small className="form-text text-muted">{helperText}</small>}
    </div>
  );
}
