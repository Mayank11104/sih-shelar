import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, TrendingDown, Minus, Bell, ShoppingBasket,
  BarChart2, Users, ClipboardList, Sprout, MapPin,
} from 'lucide-react';
import TopBar from '../../components/layout/TopBar';
import PageWrapper from '../../components/layout/PageWrapper';
import { useApp } from '../../store/AppContext';
import { useNotifications } from '../../store/NotificationContext';
import { HOME_SNAPSHOT } from '../../mockData/data';
import { formatCurrency } from '../../utils/decisionEngine';

const TREND_ICON = {
  up:     <TrendingUp  size={14} color="var(--success)" />,
  down:   <TrendingDown size={14} color="var(--error)" />,
  stable: <Minus        size={14} color="var(--text-muted)" />,
};

const TREND_COLOR = {
  up:     'var(--success)',
  down:   'var(--error)',
  stable: 'var(--text-muted)',
};

export default function HomePage() {
  const { t, state } = useApp();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  const quickActions = [
    { label: t('home.cta.markets'),   Icon: BarChart2,     route: '/prices'       },
    { label: t('home.cta.buyers'),    Icon: Users,          route: '/buyers'       },
    { label: t('home.cta.decisions'), Icon: ClipboardList,  route: '/my-decisions' },
  ];

  return (
    <PageWrapper>
      <TopBar
        title={`${t('app.name')} — ${t('home.snapshot.title')}`}
        showBack={false}
        actions={
          unreadCount > 0 ? undefined : undefined
        }
      />

      <div className="page-content">
        {/* Header row */}
        <div className="flex-between" style={{ marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <MapPin size={14} color="var(--text-muted)" />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>{state.farmer.location}</span>
            </div>
            <h1 className="page-title">{t('home.greeting')}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{state.farmer.name} &nbsp;·&nbsp; {t('app.demo.label')}</p>
          </div>
          <span className="badge badge-demo">Demo Data — SIH26132</span>
        </div>

        {/* Primary CTA */}
        <button
          className="btn btn-primary btn-lg btn-full"
          onClick={() => navigate('/sell')}
          id="btn-sell-crop"
          style={{ marginBottom: 24, justifyContent: 'center', gap: 10 }}
        >
          <ShoppingBasket size={18} />
          {t('home.cta.sell')}
        </button>

        {/* Market Snapshot */}
        <div style={{ marginBottom: 24 }}>
          <p className="section-label">{t('home.snapshot.title')}</p>
          <div className="grid-3">
            {HOME_SNAPSHOT.map((item) => (
              <div key={item.cropKey} className="stat-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/prices')}>
                <div className="flex-between">
                  <span className="stat-label">{t(item.cropKey as Parameters<typeof t>[0])}</span>
                  <span style={{ color: TREND_COLOR[item.trend], display: 'flex', alignItems: 'center', gap: 3, fontSize: '0.75rem', fontWeight: 600 }}>
                    {TREND_ICON[item.trend]}
                    {t(`home.price.${item.trend}` as Parameters<typeof t>[0])}
                  </span>
                </div>
                <div className="price-big" style={{ color: 'var(--primary)' }}>₹{item.price}</div>
                <div className="stat-sub">
                  <span>per kg · Pune APMC</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <p className="section-label">Quick Access</p>
          <div className="grid-3">
            {quickActions.map(({ label, Icon, route }) => (
              <button
                key={route}
                className="card"
                onClick={() => navigate(route)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', border: 'none', background: 'var(--surface)', textAlign: 'left', width: '100%', padding: '16px' }}
              >
                <div className="icon-box icon-box-primary">
                  <Icon size={16} />
                </div>
                <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text)' }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Trader status bar */}
        {state.trader && (
          <div className="card card-sm flex-between" style={{ marginTop: 24 }}>
            <div className="flex-gap-8">
              <div className="icon-box icon-box-accent">
                <Users size={15} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{state.trader.name}</div>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Regular Trader · ₹{state.trader.offerPrice}/kg</div>
              </div>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => navigate('/profile/add-trader')}>Edit</button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
