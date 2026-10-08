import { Button } from './Button';

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: string;
  };
  center?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  action,
  center = false,
  className = '',
}: SectionHeaderProps) {
  return (
    <div
      className={`d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 ${center ? 'text-center' : ''} ${className}`.trim()}
    >
      <div>
        {eyebrow && (
          <span className="badge bg-warning-subtle text-warning-emphasis text-uppercase px-2.5 py-1 mb-2 fw-semibold">
            {eyebrow}
          </span>
        )}
        <h2 className="fw-bold mb-1 text-dark">{title}</h2>
        {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
      </div>
      {action && (
        <div className="mt-3 mt-md-0">
          <Button variant="outline-primary" size="sm" icon={action.icon} onClick={action.onClick}>
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
}
