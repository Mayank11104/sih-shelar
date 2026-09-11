import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Wheat, Leaf } from 'lucide-react';
import type { Language } from '../../types';
import { useApp } from '../../store/AppContext';

const LANG_OPTIONS: { value: Language; native: string }[] = [
  { value: 'en', native: 'English' },
  { value: 'hi', native: 'हिंदी'  },
  { value: 'mr', native: 'मराठी'  },
];

/* ─── Splash Loader ──────────────────────────────────────────────────────────── */
function SplashLoader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'done'>('loading');

  useEffect(() => {
    const STEPS = 30;
    const INTERVAL_MS = 48;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      // ease-in-out via cosine curve
      const pct = Math.round(((1 - Math.cos((step / STEPS) * Math.PI)) / 2) * 100);
      setProgress(Math.min(pct, 100));
      if (step >= STEPS) {
        clearInterval(timer);
        setPhase('done');
        setTimeout(onDone, 400);
      }
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'var(--primary-dark)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        opacity: phase === 'done' ? 0 : 1,
        transition: 'opacity 0.4s ease',
        pointerEvents: phase === 'done' ? 'none' : 'all',
      }}
    >
      {/* Decorative background leaves */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.06 }}>
        {[
          { top: '10%', left: '5%',  rotate: 20,  size: 130, dur: 4   },
          { top: '60%', left: '70%', rotate: -30, size: 110, dur: 5   },
          { top: '30%', left: '40%', rotate: 45,  size: 90,  dur: 3.5 },
          { top: '75%', left: '15%', rotate: -15, size: 120, dur: 4.5 },
          { top: '5%',  left: '80%', rotate: 60,  size: 100, dur: 3   },
          { top: '50%', left: '55%', rotate: -45, size: 140, dur: 5.5 },
        ].map((l, i) => (
          <Leaf
            key={i}
            size={l.size}
            color="#fff"
            style={{
              position: 'absolute',
              top: l.top, left: l.left,
              transform: `rotate(${l.rotate}deg)`,
              animation: `leafFloat ${l.dur}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Logo icon */}
      <div
        style={{
          width: 68, height: 68, borderRadius: 18,
          background: 'var(--primary-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 22,
          animation: 'splashPulse 1.6s ease-in-out infinite',
          boxShadow: '0 0 40px rgba(64,145,108,0.4)',
        }}
      >
        <Wheat size={34} color="#fff" />
      </div>

      {/* Brand name — gradient animated reveal */}
      <h1
        style={{
          fontSize: 'clamp(2.25rem, 6vw, 3.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          marginBottom: 10,
          lineHeight: 1,
          background: 'linear-gradient(135deg, #ffffff 0%, #A8D5B5 45%, #DDA15E 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'brandReveal 0.9s cubic-bezier(0.22,1,0.36,1) forwards',
        }}
      >
        Agriverse
      </h1>

      <p style={{
        color: 'rgba(255,255,255,0.45)',
        fontSize: '0.82rem',
        marginBottom: 48,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        fontWeight: 600,
        animation: 'brandReveal 1.1s cubic-bezier(0.22,1,0.36,1) forwards',
        animationDelay: '0.15s',
        opacity: 0,
      }}>
        Market Linkage &amp; Price Discovery
      </p>

      {/* Progress bar */}
      <div style={{ width: 200, height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 999 }}>
        <div
          style={{
            height: '100%', borderRadius: 999,
            background: 'linear-gradient(90deg, var(--primary-light), var(--accent-light))',
            width: `${progress}%`,
            transition: 'width 0.05s linear',
            boxShadow: '0 0 8px rgba(64,145,108,0.6)',
          }}
        />
      </div>
      <p style={{ marginTop: 12, fontSize: '0.7rem', color: 'rgba(255,255,255,0.28)', fontWeight: 500, letterSpacing: '0.06em' }}>
        {progress < 100 ? 'Preparing market data…' : 'Ready'}
      </p>
    </div>
  );
}

/* ─── Animated entry section ─────────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, style = {} }: {
  children: React.ReactNode; delay?: number; style?: React.CSSProperties;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Welcome Page ───────────────────────────────────────────────────────────── */
export default function WelcomePage() {
  const { t, state, setLanguage, loadDemoData } = useApp();
  const navigate = useNavigate();

  const [splashDone, setSplashDone] = useState(false);

  const handleStart = () => {
    loadDemoData();
    navigate('/home');
  };

  return (
    <>
      {/* Splash — always plays fresh on the welcome/root page */}
      {!splashDone && (
        <SplashLoader onDone={() => setSplashDone(true)} />
      )}

      {/* Actual welcome UI — visible after splash fades */}
      <div
        style={{
          minHeight: '100dvh',
          display: 'flex',
          background: 'var(--bg-page)',
          opacity: splashDone ? 1 : 0,
          transition: 'opacity 0.45s ease 0.05s',
        }}
      >
        {/* Left panel — branding (desktop only) */}
        <div
          id="welcome-left-panel"
          style={{
            display: 'none', // shown via CSS media query
            width: '44%',
            background: 'var(--primary-dark)',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '48px 40px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background leaf */}
          <div aria-hidden="true" style={{ position: 'absolute', right: -40, bottom: -40, opacity: 0.05 }}>
            <Leaf size={320} color="#fff" style={{ transform: 'rotate(20deg)' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, background: 'var(--primary-light)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wheat size={18} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#fff' }}>Agriverse</span>
          </div>

          <div>
            <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 18 }}>
              Smart India Hackathon 2026
            </p>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
              {t('app.tagline')}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem', lineHeight: 1.65 }}>
              {t('app.tagline.sub')}
            </p>
          </div>

          <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', fontWeight: 500 }}>
            PS Sponsor: Government of Maharashtra · SIH26132
          </p>
        </div>

        {/* Right panel — form */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '40px 32px',
            maxWidth: 480,
            margin: '0 auto',
            width: '100%',
          }}
        >
          {/* Mobile logo (hidden on desktop where left panel shows) */}
          <FadeIn delay={60}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
              <div style={{ width: 36, height: 36, background: 'var(--primary)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wheat size={20} color="#fff" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text)' }}>Agriverse</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Market Linkage & Price Discovery</div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={130}>
            <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 800, color: 'var(--text)', marginBottom: 8, lineHeight: 1.2 }}>
              {t('app.tagline')}
            </h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: 36, lineHeight: 1.65, fontSize: '0.9rem' }}>
              {t('app.tagline.sub')}
            </p>
          </FadeIn>

          {/* Language selector */}
          <FadeIn delay={210}>
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                Select Language / भाषा चुनें / भाषा निवडा
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                {LANG_OPTIONS.map(({ value, native }) => (
                  <button
                    key={value}
                    onClick={() => setLanguage(value)}
                    id={`lang-${value}`}
                    style={{
                      flex: 1, padding: '10px 8px',
                      border: `1.5px solid ${state.language === value ? 'var(--primary)' : 'var(--border)'}`,
                      background: state.language === value ? 'var(--primary-bg)' : 'var(--surface)',
                      color: state.language === value ? 'var(--primary)' : 'var(--text-secondary)',
                      fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer',
                      borderRadius: 'var(--radius-md)', fontFamily: 'inherit',
                      transition: 'all 0.12s',
                    }}
                  >
                    {native}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* CTAs */}
          <FadeIn delay={290}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                className="btn btn-primary btn-lg btn-full"
                onClick={handleStart}
                id="btn-start"
                style={{ justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}
              >
                <span>{t('welcome.start')}</span>
                <ArrowRight size={16} />
                <span aria-hidden="true" style={{ position: 'absolute', top: 0, left: '-60%', width: '40%', height: '100%', background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)', animation: 'btnShimmer 3s ease-in-out infinite' }} />
              </button>
              <button
                className="btn btn-secondary btn-full"
                style={{ height: 44 }}
                onClick={handleStart}
                id="btn-demo"
              >
                {t('welcome.demo')}
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={380}>
            <p style={{ marginTop: 32, fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
              Government of Maharashtra · SIH26132 · Demo prototype, not live data
            </p>
          </FadeIn>
        </div>
      </div>
    </>
  );
}
