import type { Notice as NoticeType } from '../../types';

export interface NoticeProps {
  notice: NoticeType | null;
  onClose?: () => void;
}

export function Notice({ notice, onClose }: NoticeProps) {
  if (!notice) return null;

  const alertVariant =
    notice.type === 'success'
      ? 'alert-success'
      : notice.type === 'error'
        ? 'alert-danger'
        : 'alert-info';

  const iconClass =
    notice.type === 'success'
      ? 'bi-check-circle-fill'
      : notice.type === 'error'
        ? 'bi-exclamation-triangle-fill'
        : 'bi-info-circle-fill';

  const title =
    notice.type === 'success'
      ? 'Éxito'
      : notice.type === 'error'
        ? 'Atención'
        : 'Información';

  return (
    <div
      className="position-fixed top-0 start-50 translate-middle-x mt-3 z-3"
      style={{ minWidth: '320px', maxWidth: '90vw' }}
    >
      <div
        className={`alert ${alertVariant} alert-dismissible shadow fade show d-flex align-items-center gap-3 py-2 px-3 border`}
        role="alert"
      >
        <i className={`bi ${iconClass} fs-4 flex-shrink-0`} />
        <div className="flex-grow-1">
          <strong className="d-block">{title}</strong>
          <span className="small">{notice.message}</span>
        </div>
        {onClose && (
          <button
            type="button"
            className="btn-close ms-auto"
            aria-label="Cerrar notificación"
            onClick={onClose}
          />
        )}
      </div>
    </div>
  );
}
