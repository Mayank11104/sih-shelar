interface SkeletonProps {
  height?: string | number;
  width?: string | number;
  className?: string;
}

export function Skeleton({ height = 20, width = '100%', className = '' }: SkeletonProps) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ height, width }}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard({ lines = 3 }: { lines?: number }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Skeleton height={18} width="60%" />
      {Array.from({ length: lines - 1 }).map((_, i) => (
        <Skeleton key={i} height={14} width={i === lines - 2 ? '40%' : '90%'} />
      ))}
    </div>
  );
}
