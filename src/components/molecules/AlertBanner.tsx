import type { NoticeType } from '../../types';

export interface AlertBannerProps {
  variant?: NoticeType;
  message: string;
  title?: string;
  onClose?: () => void;
  className?: string;
}

export function AlertBanner({
  variant = 'warning',
  message,
  title,
  onClose,
  className = '',
}: AlertBannerProps) {
  const config = {
    success: {
      defaultTitle: 'Éxito',
      icon: 'bi-check-circle-fill',
      bg: '#ecfdf5',
      border: '#a7f3d0',
      text: '#065f46',
      iconColor: '#10b981',
    },
    error: {
      defaultTitle: 'Error',
      icon: 'bi-x-circle-fill',
      bg: '#fef2f2',
      border: '#fecaca',
      text: '#991b1b',
      iconColor: '#ef4444',
    },
    warning: {
      defaultTitle: 'Atención',
      icon: 'bi-exclamation-triangle-fill',
      bg: '#fffbeb',
      border: '#fde68a',
      text: '#92400e',
      iconColor: '#f59e0b',
    },
    info: {
      defaultTitle: 'Información',
      icon: 'bi-info-circle-fill',
      bg: '#eff6ff',
      border: '#bfdbfe',
      text: '#1e40af',
      iconColor: '#3b82f6',
    },
  }[variant];

  return (
    <div
      className={`rounded-3 p-3 border d-flex align-items-start gap-2.5 shadow-sm ${className}`}
      style={{
        backgroundColor: config.bg,
        borderColor: config.border,
        color: config.text,
      }}
      role="alert"
    >
      <i
        className={`bi ${config.icon} fs-5 flex-shrink-0 mt-0.5`}
        style={{ color: config.iconColor }}
      />
      <div className="flex-grow-1">
        {title && <strong className="d-block lh-sm mb-0.5">{title}</strong>}
        <span className="small lh-sm d-block">{message}</span>
      </div>
      {onClose && (
        <button
          type="button"
          className="btn-close btn-close-sm ms-auto opacity-75"
          style={{ fontSize: '0.75rem' }}
          aria-label="Cerrar alerta"
          onClick={onClose}
        />
      )}
    </div>
  );
}
