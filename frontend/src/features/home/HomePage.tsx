import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Minus, Bell } from 'lucide-react';
import TopBar from '../../components/layout/TopBar';
import PageWrapper from '../../components/layout/PageWrapper';
import { useApp } from '../../store/AppContext';
import { useNotifications } from '../../store/NotificationContext';
import { HOME_SNAPSHOT } from '../../mockData/data';

const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
  if (trend === 'up')     return <TrendingUp size={16} color="var(--color-success)" />;
  if (trend === 'down')   return <TrendingDown size={16} color="var(--color-error)" />;
  return <Minus size={16} color="var(--color-muted)" />;
};

export default function HomePage() {
  const { t, state } = useApp();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  return (
    <PageWrapper>
      {/* Custom Home Top Bar with logo */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '2px' }}>
            🌱 {t('app.name')}
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>
            📍 {t('home.location')}
          </p>
        </div>
        <button
          onClick={() => navigate('/notifications')}
          aria-label="Notifications"
          style={{ position: 'relative', background: 'none', border: '1.5px solid var(--color-border)', borderRadius: '12px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--color-primary-deep)' }}
        >
          <Bell size={22} />
          {unreadCount > 0 && (
            <span style={{ position: 'absolute', top: -4, right: -4, background: 'var(--color-error)', color: '#fff', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 800, minWidth: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px' }}>
              {unreadCount}
            </span>
          )}
        </button>
      </header>

      {/* Greeting */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{t('home.greeting')}</h2>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>{state.farmer.name}</p>
      </div>

      {/* Demo badge */}
      <div style={{ marginBottom: '1rem' }}>
        <span className="badge badge-demo">🔬 {t('app.demo.label')}</span>
      </div>

      {/* Market Snapshot */}
      <section aria-labelledby="snapshot-title" style={{ marginBottom: '1.5rem' }}>
        <h3 id="snapshot-title" style={{ marginBottom: '0.75rem', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-muted)' }}>
          {t('home.snapshot.title')}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          {HOME_SNAPSHOT.map((item) => (
            <div key={item.cropKey} className="card" style={{ textAlign: 'center', padding: '0.875rem 0.5rem' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '4px' }}>{item.emoji}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '4px' }}>{t(item.cropKey as Parameters<typeof t>[0])}</div>
              <div className="price-numeral" style={{ fontSize: '1.1rem' }}>₹{item.price}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px', marginTop: '4px', fontSize: '0.75rem', color: item.trend === 'up' ? 'var(--color-success)' : item.trend === 'down' ? 'var(--color-error)' : 'var(--color-muted)' }}>
                <TrendIcon trend={item.trend} />
                {t(`home.price.${item.trend}` as Parameters<typeof t>[0])}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main CTA */}
      <button
        className="btn btn-primary btn-full"
        onClick={() => navigate('/sell')}
        id="btn-sell-crop"
        style={{ fontSize: '1.15rem', marginBottom: '1rem' }}
      >
        {t('home.cta.sell')}
      </button>

      {/* Secondary Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        {([
          { key: 'home.cta.markets'   as const, route: '/prices'       },
          { key: 'home.cta.buyers'    as const, route: '/buyers'       },
          { key: 'home.cta.decisions' as const, route: '/my-decisions' },
        ]).map(({ key, route }) => (
          <button
            key={key}
            className="btn btn-secondary"
            onClick={() => navigate(route)}
            style={{ fontSize: '0.875rem', minHeight: '52px', padding: '0 0.75rem', textAlign: 'center', lineHeight: '1.3' }}
          >
            {t(key)}
          </button>
        ))}
      </div>
    </PageWrapper>
  );
}
