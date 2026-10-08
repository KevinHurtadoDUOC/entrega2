export interface StatBoxProps {
  value: string | number;
  label: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark';
  subtext?: string;
}

export function StatBox({
  value,
  label,
  icon,
  variant = 'primary',
  subtext,
}: StatBoxProps) {
  const borderVariant = `border-${variant}`;
  const textVariant = variant === 'warning' ? 'text-warning-emphasis' : `text-${variant}`;

  return (
    <div className={`card shadow-sm border-0 border-start border-4 ${borderVariant} h-100`}>
      <div className="card-body p-3 d-flex align-items-center justify-content-between">
        <div>
          <span className="text-muted small text-uppercase fw-bold d-block mb-1">
            {label}
          </span>
          <h3 className={`h4 fw-bold mb-0 ${textVariant}`}>{value}</h3>
          {subtext && <small className="text-muted">{subtext}</small>}
        </div>
        {icon && (
          <div
            className={`p-3 rounded-circle bg-${variant}-subtle ${textVariant} d-inline-flex align-items-center justify-content-center`}
            style={{ width: '48px', height: '48px' }}
          >
            <i className={`${icon} fs-4`} />
          </div>
        )}
      </div>
    </div>
  );
}
