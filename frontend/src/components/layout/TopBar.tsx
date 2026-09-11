import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell } from 'lucide-react';
import { useNotifications } from '../../store/NotificationContext';

interface TopBarProps {
  title: string;
  showBack?: boolean;
  showNotification?: boolean;
}

export default function TopBar({ title, showBack = true, showNotification = true }: TopBarProps) {
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();

  return (
    <header className="top-bar">
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="btn-icon"
          aria-label="Go back"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '8px', color: 'var(--color-primary-deep)', display: 'flex', alignItems: 'center' }}
        >
          <ArrowLeft size={22} />
        </button>
      )}

      <h1 style={{ flex: 1, fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary-deep)' }}>
        {title}
      </h1>

      {showNotification && (
        <button
          onClick={() => navigate('/notifications')}
          aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
          style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '8px', color: 'var(--color-primary-deep)', display: 'flex', alignItems: 'center' }}
        >
          <Bell size={22} />
          {unreadCount > 0 && (
            <span
              aria-hidden="true"
              style={{
                position: 'absolute', top: -2, right: -2,
                background: 'var(--color-error)', color: '#fff',
                borderRadius: '999px', fontSize: '0.65rem', fontWeight: 800,
                minWidth: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 4px',
              }}
            >
              {unreadCount}
            </span>
          )}
        </button>
      )}
    </header>
  );
}
