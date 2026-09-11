import { useNavigate } from 'react-router-dom';
import { Bell, TrendingUp, Users, BarChart2, AlertTriangle, Clock } from 'lucide-react';
import TopBar from '../../components/layout/TopBar';
import PageWrapper from '../../components/layout/PageWrapper';
import { useApp } from '../../store/AppContext';
import { useNotifications } from '../../store/NotificationContext';
import type { Notification, NotificationType } from '../../types';

const TYPE_ICON: Record<NotificationType, React.ReactNode> = {
  price_update:   <TrendingUp size={18} />,
  better_buyer:   <Users size={18} />,
  prediction:     <BarChart2 size={18} />,
  reminder:       <Clock size={18} />,
  decision_alert: <AlertTriangle size={18} />,
};

const TYPE_BG: Record<NotificationType, string> = {
  price_update:   '#D1FAE5',
  better_buyer:   '#DBEAFE',
  prediction:     '#EDE9FE',
  reminder:       '#FEF3C7',
  decision_alert: '#FFE4E6',
};

const TYPE_COLOR: Record<NotificationType, string> = {
  price_update:   'var(--color-success)',
  better_buyer:   '#2563EB',
  prediction:     '#7C3AED',
  reminder:       '#D97706',
  decision_alert: 'var(--color-error)',
};

function NotifItem({ notif, onClick }: { notif: Notification; onClick: () => void }) {
  const { t } = useApp();
  return (
    <button
      onClick={onClick}
      id={`notif-${notif.id}`}
      style={{
        width: '100%', textAlign: 'left', cursor: 'pointer', background: 'none', border: 'none', padding: 0,
      }}
    >
      <div className="card" style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start', opacity: notif.read ? 0.65 : 1, borderLeft: notif.read ? undefined : `3px solid ${TYPE_COLOR[notif.type]}` }}>
        <div style={{ width: 38, height: 38, borderRadius: '10px', background: TYPE_BG[notif.type], color: TYPE_COLOR[notif.type], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {TYPE_ICON[notif.type]}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: notif.read ? 600 : 700, fontSize: '0.95rem', marginBottom: '2px' }}>
            {t(notif.titleKey as Parameters<typeof t>[0])}
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-muted)' }}>
            {t(notif.bodyKey as Parameters<typeof t>[0])}
          </div>
        </div>
        {!notif.read && (
          <div style={{ width: 8, height: 8, borderRadius: '999px', background: 'var(--color-error)', flexShrink: 0, marginTop: 6 }} />
        )}
      </div>
    </button>
  );
}

export default function NotificationsPage() {
  const { t } = useApp();
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();

  const handleClick = (notif: Notification) => {
    markAsRead(notif.id);
    navigate(notif.route);
  };

  return (
    <PageWrapper>
      <TopBar title={t('notif.title')} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.05rem' }}>{t('notif.title')}</h2>
        <button
          className="btn btn-secondary"
          style={{ minHeight: '36px', padding: '0 0.875rem', fontSize: '0.8rem' }}
          onClick={markAllAsRead}
          id="btn-mark-all-read"
        >
          {t('notif.mark.all')}
        </button>
      </div>

      {notifications.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <Bell size={40} color="var(--color-muted)" style={{ marginBottom: '1rem' }} />
          <p style={{ color: 'var(--color-muted)' }}>{t('notif.empty')}</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {notifications.map((notif) => (
            <NotifItem key={notif.id} notif={notif} onClick={() => handleClick(notif)} />
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
