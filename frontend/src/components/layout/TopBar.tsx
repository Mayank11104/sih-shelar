import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell } from 'lucide-react';
import { useNotifications } from '../../store/NotificationContext';

interface TopBarProps {
  title: string;
  showBack?: boolean;
  showNotification?: boolean;
  actions?: React.ReactNode;
}

export default function TopBar({
  title,
  showBack = true,
  showNotification = true,
  actions,
}: TopBarProps) {
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();

  return (
    <header className="topbar">
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="topbar-icon-btn"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>
      )}

      <span className="topbar-title">{title}</span>

      {actions}

      {showNotification && (
        <button
          onClick={() => navigate('/notifications')}
          className="topbar-icon-btn"
          aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
          style={{ position: 'relative' }}
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="notif-dot" aria-hidden="true">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      )}
    </header>
  );
}
