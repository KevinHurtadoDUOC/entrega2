import type { Notice as NoticeType } from '../types';

type NoticeProps = {
  notice: NoticeType | null;
};

export function Notice({ notice }: NoticeProps) {
  if (!notice) return null;

  return (
    <div className="inline-notice-container">
      <div className={`notice-card ${notice.type}`}>
        <div className="notice-icon">{notice.type === 'success' ? '✓' : notice.type === 'error' ? '!' : 'i'}</div>
        <div className="notice-text">
          <strong>{notice.type === 'success' ? 'Éxito' : notice.type === 'error' ? 'Atención' : 'Información'}</strong>
          <span>{notice.message}</span>
        </div>
      </div>
    </div>
  );
}
