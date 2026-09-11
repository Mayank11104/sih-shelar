import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, TrendingDown, Minus, ShoppingBasket,
  BarChart2, Users, ClipboardList, MapPin, ArrowRight,
} from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';
import TopBar from '../../components/layout/TopBar';
import { useApp } from '../../store/AppContext';
import { HOME_SNAPSHOT } from '../../mockData/data';


/* ─── Animated Section ───────────────────────────────────────────────────────── */
function AnimatedSection({ children, delay = 0, style = {} }: {
  children: React.ReactNode; delay?: number; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Animated Price Counter ─────────────────────────────────────────────────── */
function AnimatedPrice({ target, started }: { target: number; started: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    const steps = 36;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = 1 - Math.pow(1 - step / steps, 3);
      setVal(Math.round(target * progress));
      if (step >= steps) clearInterval(timer);
    }, 25);
    return () => clearInterval(timer);
  }, [started, target]);
  return <span>₹{val}</span>;
}

/* ─── Trend badge ────────────────────────────────────────────────────────────── */
const TREND_ICON = {
  up:     <TrendingUp   size={13} color="var(--success)" />,
  down:   <TrendingDown size={13} color="var(--error)" />,
  stable: <Minus        size={13} color="var(--text-muted)" />,
};
const TREND_COLOR = { up: 'var(--success)', down: 'var(--error)', stable: 'var(--text-muted)' };
const TREND_BG    = { up: '#D1FAE5', down: '#FEE2E2', stable: 'var(--bg)' };

/* ─── Main ───────────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const { t, state } = useApp();
  const navigate = useNavigate();

  const [countersStarted, setCountersStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setCountersStarted(true), 300);
    return () => clearTimeout(t);
  }, []);

  const quickActions = [
    { label: t('home.cta.markets'),   Icon: BarChart2,    route: '/prices'       },
    { label: t('home.cta.buyers'),    Icon: Users,         route: '/buyers'       },
    { label: t('home.cta.decisions'), Icon: ClipboardList, route: '/my-decisions' },
  ];

  return (
    <PageWrapper>
        <TopBar title="Dashboard" showBack={false} />
        <div className="page-content">

          {/* Hero heading */}
          <AnimatedSection delay={0} style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <MapPin size={13} color="var(--text-muted)" />
                  <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', fontWeight: 500 }}>{state.farmer.location}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 55%, var(--primary-light) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.1,
                    }}
                  >
                    Agriverse
                  </span>
                  <span style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.15 }}>
                    {t('home.greeting')}
                  </span>
                </div>
                <p style={{ marginTop: 6, color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  {state.farmer.name} &nbsp;·&nbsp; {t('home.snapshot.title')}
                </p>
              </div>
              <span className="badge badge-demo">Demo · SIH26132</span>
            </div>
          </AnimatedSection>

          {/* Primary CTA */}
          <AnimatedSection delay={80} style={{ marginBottom: 28 }}>
            <button
              className="btn btn-primary btn-lg btn-full"
              onClick={() => navigate('/sell')}
              id="btn-sell-crop"
              style={{ justifyContent: 'center', gap: 10, position: 'relative', overflow: 'hidden' }}
            >
              <ShoppingBasket size={18} />
              {t('home.cta.sell')}
              <ArrowRight size={16} style={{ marginLeft: 'auto' }} />
              <span aria-hidden="true" style={{ position: 'absolute', top: 0, left: '-60%', width: '40%', height: '100%', background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)', animation: 'btnShimmer 2.8s ease-in-out infinite' }} />
            </button>
          </AnimatedSection>

          {/* Market Snapshot */}
          <AnimatedSection delay={160} style={{ marginBottom: 28 }}>
            <p className="section-label">{t('home.snapshot.title')}</p>
            <div className="grid-3">
              {HOME_SNAPSHOT.map((item, idx) => (
                <AnimatedSection key={item.cropKey} delay={200 + idx * 80}>
                  <div
                    className="stat-card"
                    onClick={() => navigate('/prices')}
                    style={{ cursor: 'pointer', transition: 'box-shadow 0.2s, transform 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-md)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = ''; }}
                  >
                    <div className="flex-between">
                      <span className="stat-label">{t(item.cropKey as Parameters<typeof t>[0])}</span>
                      <span style={{ color: TREND_COLOR[item.trend], background: TREND_BG[item.trend], display: 'flex', alignItems: 'center', gap: 3, fontSize: '0.7rem', fontWeight: 700, padding: '2px 7px', borderRadius: 4 }}>
                        {TREND_ICON[item.trend]}
                        {t(`home.price.${item.trend}` as Parameters<typeof t>[0])}
                      </span>
                    </div>
                    <div className="price-big" style={{ color: 'var(--primary)', fontVariantNumeric: 'tabular-nums' }}>
                      <AnimatedPrice target={item.price} started={countersStarted} />
                    </div>
                    <div className="stat-sub">per kg · Pune APMC</div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>

          {/* Quick Actions */}
          <AnimatedSection delay={380} style={{ marginBottom: 28 }}>
            <p className="section-label">Quick Access</p>
            <div className="grid-3">
              {quickActions.map(({ label, Icon, route }, idx) => (
                <AnimatedSection key={route} delay={400 + idx * 60}>
                  <button
                    className="card"
                    onClick={() => navigate(route)}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', width: '100%', padding: '16px', textAlign: 'left', transition: 'box-shadow 0.2s, transform 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = 'var(--shadow-md)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = ''; }}
                  >
                    <div className="icon-box icon-box-primary"><Icon size={16} /></div>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text)', flex: 1 }}>{label}</span>
                    <ArrowRight size={14} color="var(--text-muted)" />
                  </button>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>

          {/* Trader status */}
          {state.trader && (
            <AnimatedSection delay={520}>
              <div className="card card-sm flex-between">
                <div className="flex-gap-8">
                  <div className="icon-box icon-box-accent"><Users size={15} /></div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{state.trader.name}</div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Regular Trader · ₹{state.trader.offerPrice}/kg · {state.trader.distanceKm} km</div>
                  </div>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={() => navigate('/profile/add-trader')}>Edit</button>
              </div>
            </AnimatedSection>
          )}

        </div>
      </PageWrapper>
  );
}
