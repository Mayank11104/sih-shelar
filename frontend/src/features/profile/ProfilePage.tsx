import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/layout/TopBar';
import PageWrapper from '../../components/layout/PageWrapper';
import { useApp } from '../../store/AppContext';
import type { Language } from '../../types';

export default function ProfilePage() {
  const { t, state, setLanguage } = useApp();
  const navigate = useNavigate();
  const { farmer, trader, language } = state;

  return (
    <PageWrapper>
      <TopBar title={t('nav.profile')} showBack={false} />

      {/* Farmer Info */}
      <div className="card" style={{ marginBottom: '1rem', textAlign: 'center', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#E8F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 0.75rem' }}>
          👨‍🌾
        </div>
        <h2 style={{ marginBottom: '4px' }}>{t('profile.welcome')}</h2>
        <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-primary)', marginBottom: '4px' }}>{farmer.name}</div>
        <div style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>📍 {farmer.location}</div>
      </div>

      {/* Language Selector */}
      <div className="card" style={{ marginBottom: '1rem' }}>
        <h3 style={{ marginBottom: '0.75rem' }}>{t('profile.language')}</h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['en', 'hi', 'mr'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              id={`profile-lang-${lang}`}
              style={{
                flex: 1, padding: '0.625rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem',
                border: `2px solid ${language === lang ? 'var(--color-primary)' : 'var(--color-border)'}`,
                background: language === lang ? '#E8F5EE' : 'var(--color-surface)',
                color: language === lang ? 'var(--color-primary)' : 'var(--color-muted)',
                fontFamily: 'inherit',
              }}
            >
              {t(`welcome.lang.${lang}` as Parameters<typeof t>[0])}
            </button>
          ))}
        </div>
      </div>

      {/* My Regular Trader */}
      <div className="card" style={{ marginBottom: '1rem' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>{t('profile.my.trader')}</h3>

        {trader ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{trader.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                  {trader.distanceKm} {t('common.km')} · ⭐ {trader.rating}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="price-numeral">₹{trader.offerPrice}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>{t('common.per.kg')}</div>
              </div>
            </div>
            {trader.verified && <span className="badge badge-verified">{t('options.verified')}</span>}
            <button
              className="btn btn-secondary btn-full"
              style={{ marginTop: '0.75rem', fontSize: '0.9rem', minHeight: '44px' }}
              onClick={() => navigate('/profile/add-trader')}
              id="btn-edit-trader"
            >
              {t('profile.edit.trader')}
            </button>
          </div>
        ) : (
          <div>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
              {t('profile.trader.msg')}
            </p>
            <button
              className="btn btn-primary btn-full"
              onClick={() => navigate('/profile/add-trader')}
              id="btn-add-trader"
            >
              {t('profile.add.trader')}
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <button className="btn btn-secondary btn-full" onClick={() => navigate('/sell')} id="btn-add-crop" style={{ marginBottom: '0.75rem' }}>
        {t('profile.add.crop')}
      </button>
    </PageWrapper>
  );
}
