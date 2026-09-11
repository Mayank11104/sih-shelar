import { NavLink } from 'react-router-dom';
import { Home, TrendingUp, ShoppingBasket, Users, User } from 'lucide-react';
import { useApp } from '../../store/AppContext';

const NAV_ITEMS = [
  { to: '/home',    iconComp: Home,           labelKey: 'nav.home'    as const },
  { to: '/prices',  iconComp: TrendingUp,     labelKey: 'nav.markets' as const },
  { to: '/sell',    iconComp: ShoppingBasket, labelKey: 'nav.sell'    as const },
  { to: '/buyers',  iconComp: Users,          labelKey: 'nav.buyers'  as const },
  { to: '/profile', iconComp: User,           labelKey: 'nav.profile' as const },
];

export default function BottomNav() {
  const { t } = useApp();

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
      {NAV_ITEMS.map(({ to, iconComp: Icon, labelKey }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `bottom-nav-item${isActive ? ' active' : ''}`
          }
        >
          <Icon size={22} className="nav-icon" aria-hidden="true" />
          <span>{t(labelKey)}</span>
        </NavLink>
      ))}
    </nav>
  );
}
