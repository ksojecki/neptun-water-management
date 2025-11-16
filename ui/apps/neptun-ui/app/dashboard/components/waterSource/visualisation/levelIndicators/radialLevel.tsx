import { JSX } from 'react';

export function RadialLevel(properties: {
  percentage: number;
  label?: string;
}): JSX.Element {
  const label = properties.label || `${Math.round(properties.percentage)}%`;
  return (
    <div
      className="radial-progress"
      style={
        {
          '--value': properties.percentage,
          '--size': '7rem',
        } as React.CSSProperties
      }
      aria-valuenow={properties.percentage}
      role="progressbar"
    >
      {label}
    </div>
  );
}
