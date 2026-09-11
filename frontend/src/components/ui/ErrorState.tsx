import { AlertCircle } from 'lucide-react';
import { useApp } from '../../store/AppContext';

interface ErrorStateProps {
  onRetry?: () => void;
}

export default function ErrorState({ onRetry }: ErrorStateProps) {
  const { t } = useApp();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '2rem 1rem', textAlign: 'center' }}>
      <AlertCircle size={40} color="var(--color-error)" />
      <p style={{ color: 'var(--color-muted)' }}>{t('common.error')}</p>
      {onRetry && (
        <button className="btn btn-secondary" onClick={onRetry}>
          {t('common.retry')}
        </button>
      )}
    </div>
  );
}
