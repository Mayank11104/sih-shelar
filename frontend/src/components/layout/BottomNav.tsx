import { NavLink } from 'react-router-dom';
import {
  Home, TrendingUp, ShoppingBasket, Users, User,
  Sprout, BarChart2, Bell,
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { useNotifications } from '../../store/NotificationContext';
import { useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/home',         Icon: Home,           labelKey: 'nav.home'    as const },
  { to: '/prices',       Icon: TrendingUp,     labelKey: 'nav.markets' as const },
  { to: '/sell',         Icon: ShoppingBasket, labelKey: 'nav.sell'    as const },
  { to: '/buyers',       Icon: Users,          labelKey: 'nav.buyers'  as const },
  { to: '/profile',      Icon: User,           labelKey: 'nav.profile' as const },
];

// ─── Desktop Sidebar ─────────────────────────────────────────────────────────
export function Sidebar() {
  const { t } = useApp();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  return (
    <aside className="sidebar" role="navigation" aria-label="Main navigation">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-mark" aria-hidden="true">
          <Sprout size={18} color="#fff" />
        </div>
        <div>
          <div className="sidebar-logo-text">{t('app.name')}</div>
          <div className="sidebar-logo-sub">SIH 2026 · SIH26132</div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ to, Icon, labelKey }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-nav-item${isActive ? ' active' : ''}`
            }
          >
            <Icon size={16} aria-hidden="true" />
            {t(labelKey)}
          </NavLink>
        ))}

        {/* Notifications link */}
        <NavLink
          to="/notifications"
          className={({ isActive }) => `sidebar-nav-item${isActive ? ' active' : ''}`}
        >
          <span style={{ position: 'relative', display: 'inline-flex' }}>
            <Bell size={16} aria-hidden="true" />
            {unreadCount > 0 && (
              <span style={{ position: 'absolute', top: -4, right: -4, width: 8, height: 8, background: 'var(--error)', borderRadius: '50%', border: '1.5px solid var(--primary-dark)' }} />
            )}
          </span>
          {t('common.notifications')}
          {unreadCount > 0 && (
            <span style={{ marginLeft: 'auto', background: 'var(--error)', color: '#fff', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 800, padding: '1px 5px' }}>
              {unreadCount}
            </span>
          )}
        </NavLink>
      </nav>

      {/* Demo badge */}
      <div className="sidebar-footer">
        <div className="sidebar-demo-badge">
          <BarChart2 size={12} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />
          Demo prototype — SIH26132
        </div>
      </div>
    </aside>
  );
}

// ─── Mobile Bottom Nav ───────────────────────────────────────────────────────
export default function BottomNav() {
  const { t } = useApp();

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
      {NAV_ITEMS.map(({ to, Icon, labelKey }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `bottom-nav-item${isActive ? ' active' : ''}`
          }
        >
          <Icon size={20} aria-hidden="true" />
          <span>{t(labelKey)}</span>
        </NavLink>
      ))}
    </nav>
  );
}
