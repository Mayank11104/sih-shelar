import { useNavigate } from 'react-router-dom';
import { Sprout, ArrowRight } from 'lucide-react';
import type { Language } from '../../types';
import { useApp } from '../../store/AppContext';

const LANG_OPTIONS: { value: Language; label: string; native: string }[] = [
  { value: 'en', label: 'English',  native: 'English' },
  { value: 'hi', label: 'Hindi',    native: 'हिंदी'  },
  { value: 'mr', label: 'Marathi',  native: 'मराठी'  },
];

export default function WelcomePage() {
  const { t, state, setLanguage, loadDemoData } = useApp();
  const navigate = useNavigate();

  const handleStart = () => {
    loadDemoData();
    navigate('/home');
  };

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', background: 'var(--bg-page)' }}>
      {/* Left panel — branding */}
      <div style={{
        display: 'none',
        width: '42%',
        background: 'var(--primary-dark)',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '48px 40px',
      }}
        className="welcome-left"
        id="welcome-left-panel"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, background: 'var(--primary-light)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sprout size={20} color="#fff" />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>{t('app.name')}</span>
        </div>

        <div>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
            Smart India Hackathon 2026
          </p>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', lineHeight: 1.25, marginBottom: 16 }}>
            {t('app.tagline')}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            {t('app.tagline.sub')}
          </p>
        </div>

        <div>
          <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
            PS Sponsor: Government of Maharashtra · SIH26132
          </p>
        </div>
      </div>

      {/* Right panel — actions */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '40px 32px',
        maxWidth: 480,
        margin: '0 auto',
        width: '100%',
      }}>
        {/* Mobile logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
          <div style={{ width: 36, height: 36, background: 'var(--primary)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sprout size={20} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text)' }}>{t('app.name')}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500 }}>Market Linkage & Price Discovery</div>
          </div>
        </div>

        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)', marginBottom: 8, lineHeight: 1.2 }}>
          {t('app.tagline')}
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 36, lineHeight: 1.6 }}>
          {t('app.tagline.sub')}
        </p>

        {/* Language */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: '0.775rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
            Select Language / भाषा चुनें / भाषा निवडा
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            {LANG_OPTIONS.map(({ value, native }) => (
              <button
                key={value}
                onClick={() => setLanguage(value)}
                id={`lang-${value}`}
                style={{
                  flex: 1, padding: '10px 8px', border: `1.5px solid ${state.language === value ? 'var(--primary)' : 'var(--border)'}`,
                  background: state.language === value ? 'var(--primary-bg)' : 'var(--surface)',
                  color: state.language === value ? 'var(--primary)' : 'var(--text-secondary)',
                  fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', borderRadius: 'var(--radius-md)',
                  fontFamily: 'inherit', transition: 'all 0.12s',
                }}
              >
                {native}
              </button>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            className="btn btn-primary btn-lg btn-full"
            onClick={handleStart}
            id="btn-start"
          >
            {t('welcome.start')} <ArrowRight size={16} />
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

        <p style={{ marginTop: 32, fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
          Government of Maharashtra · SIH26132 · Demo prototype, not live data
        </p>
      </div>
    </div>
  );
}
