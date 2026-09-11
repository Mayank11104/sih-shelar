import { useNavigate } from 'react-router-dom';
import type { Language } from '../../types';
import { useApp } from '../../store/AppContext';

export default function WelcomePage() {
  const { t, setLanguage, loadDemoData } = useApp();
  const navigate = useNavigate();

  const handleLang = (lang: Language) => {
    setLanguage(lang);
  };

  const handleStart = () => {
    loadDemoData();
    navigate('/home');
  };

  return (
    <div
      style={{
        minHeight: '100dvh',
        backgroundColor: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        gap: '0',
      }}
    >
      {/* Logo & Tagline */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }} role="img" aria-label="Agriverse">
          🌱
        </div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
          {t('app.name')}
        </h1>
        <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary-deep)', marginBottom: '0.75rem', lineHeight: 1.35 }}>
          {t('app.tagline')}
        </p>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', maxWidth: '320px', margin: '0 auto' }}>
          {t('app.tagline.sub')}
        </p>
      </div>

      {/* Language Selector */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
        {(['en', 'hi', 'mr'] as Language[]).map((lang) => (
          <button
            key={lang}
            className="btn btn-secondary"
            style={{ minHeight: '44px', padding: '0 1.25rem', fontSize: '0.95rem' }}
            onClick={() => handleLang(lang)}
            id={`lang-${lang}`}
          >
            {t(`welcome.lang.${lang}` as Parameters<typeof t>[0])}
          </button>
        ))}
      </div>

      {/* CTA Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '360px' }}>
        <button
          className="btn btn-primary btn-full"
          onClick={handleStart}
          id="btn-start"
          style={{ fontSize: '1.1rem' }}
        >
          {t('welcome.start')}
        </button>

        <button
          className="btn btn-secondary btn-full"
          onClick={handleStart}
          id="btn-demo"
        >
          {t('welcome.demo')}
        </button>
      </div>

      {/* Demo Badge */}
      <div style={{ marginTop: '2rem' }}>
        <span className="badge badge-demo">🔬 {t('app.demo.label')}</span>
      </div>
    </div>
  );
}
