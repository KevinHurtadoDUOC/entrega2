import React from 'react';

export interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  pill?: boolean;
  children: React.ReactNode;
  className?: string;
  icon?: string;
}

export function Badge({
  variant = 'primary',
  pill = false,
  children,
  className = '',
  icon,
}: BadgeProps) {
  const bgClass = variant === 'warning' ? 'bg-warning text-dark' : `bg-${variant}`;
  const pillClass = pill ? 'rounded-pill' : '';

  return (
    <span className={`badge ${bgClass} ${pillClass} ${className}`.trim()}>
      {icon && <i className={`${icon} me-1`} />}
      {children}
    </span>
  );
}
