import type { Notice as NoticeType } from '../../types';
import { useAppContext } from '../../lib/AppContext';

export interface NoticeProps {
  notice?: NoticeType | null;
  onClose?: () => void;
}

export function Notice(props: NoticeProps) {
  const context = useAppContext();
  const notice = props.notice !== undefined ? props.notice : context.notice;
  const onClose = props.onClose ?? (() => context.setNotice(null));

  if (!notice) return null;

  const config = {
    success: {
      defaultTitle: 'Operación Exitosa',
      icon: 'bi-check-circle-fill',
      accentColor: '#10b981',
      iconBg: '#dcfce7',
      iconColor: '#15803d',
      borderColor: '#bbf7d0',
      badgeBg: '#f0fdf4',
      badgeText: '#166534',
      label: 'Éxito',
    },
    error: {
      defaultTitle: 'Acción No Permitida',
      icon: 'bi-exclamation-octagon-fill',
      accentColor: '#ef4444',
      iconBg: '#fee2e2',
      iconColor: '#b91c1c',
      borderColor: '#fecaca',
      badgeBg: '#fef2f2',
      badgeText: '#991b1b',
      label: 'Error',
    },
    warning: {
      defaultTitle: 'Aviso Importante',
      icon: 'bi-exclamation-triangle-fill',
      accentColor: '#f59e0b',
      iconBg: '#fef3c7',
      iconColor: '#b45309',
      borderColor: '#fde68a',
      badgeBg: '#fffbeb',
      badgeText: '#92400e',
      label: 'Atención',
    },
    info: {
      defaultTitle: 'Información',
      icon: 'bi-info-circle-fill',
      accentColor: '#3b82f6',
      iconBg: '#dbeafe',
      iconColor: '#1d4ed8',
      borderColor: '#bfdbfe',
      badgeBg: '#eff6ff',
      badgeText: '#1e40af',
      label: 'Información',
    },
  }[notice.type || 'info'];

  const title = notice.title || config.defaultTitle;

  return (
    <>
      <style>{`
        @keyframes noticeSlideDown {
          0% {
            opacity: 0;
            transform: translate3d(-50%, -18px, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(-50%, 0, 0);
          }
        }
        .ev-notice-wrapper {
          position: fixed !important;
          top: 76px !important;
          left: 50% !important;
          transform: translate3d(-50%, 0, 0) !important;
          z-index: 999999 !important;
          width: calc(100% - 32px) !important;
          max-width: 540px !important;
          animation: noticeSlideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
          pointer-events: auto !important;
        }
        .ev-notice-card {
          background: #ffffff !important;
          border-radius: 12px !important;
          box-shadow: 0 14px 34px -4px rgba(15, 23, 42, 0.22), 0 4px 12px -2px rgba(15, 23, 42, 0.08) !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          border-left: 6px solid ${config.accentColor} !important;
          overflow: hidden !important;
        }
      `}</style>

      <div className="ev-notice-wrapper" role="alert" aria-live="assertive">
        <div className="ev-notice-card p-3 p-sm-3.5 d-flex align-items-start gap-3">
          {/* Status Icon Badge */}
          <div
            className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
            style={{
              width: '38px',
              height: '38px',
              backgroundColor: config.iconBg,
              color: config.iconColor,
            }}
          >
            <i className={`bi ${config.icon} fs-5`} />
          </div>

          {/* Alert Content */}
          <div className="flex-grow-1 min-w-0 pe-2">
            <div className="d-flex align-items-center gap-2 mb-1">
              <strong className="text-dark fs-6 lh-sm fw-bold">{title}</strong>
              <span
                className="badge rounded-pill fw-semibold px-2 py-0.5"
                style={{
                  backgroundColor: config.badgeBg,
                  color: config.badgeText,
                  border: `1px solid ${config.borderColor}`,
                  fontSize: '0.68rem',
                  letterSpacing: '0.02em',
                }}
              >
                {config.label}
              </span>
            </div>
            <div
              className="small fw-normal lh-base"
              style={{ color: '#334155', wordBreak: 'break-word', fontSize: '0.875rem' }}
            >
              {notice.message}
            </div>
          </div>

          {/* Close Action */}
          {onClose && (
            <button
              type="button"
              className="btn btn-sm btn-light rounded-circle p-1 d-flex align-items-center justify-content-center text-secondary border-0 flex-shrink-0 ms-auto"
              style={{ width: '28px', height: '28px', background: '#f1f5f9' }}
              aria-label="Cerrar notificación"
              onClick={onClose}
            >
              <i className="bi bi-x-lg" style={{ fontSize: '0.75rem' }} />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
