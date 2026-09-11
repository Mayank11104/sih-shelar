import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import TopBar from '../../components/layout/TopBar';
import PageWrapper from '../../components/layout/PageWrapper';
import { useApp } from '../../store/AppContext';
import type { Trader } from '../../types';
const InputField = ({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) => (
  <div style={{ marginBottom: '0.875rem' }}>
    <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.4rem', fontSize: '0.9rem', color: 'var(--color-primary-deep)' }}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ width: '100%', padding: '0.75rem', border: '1.5px solid var(--color-border)', borderRadius: '10px', fontSize: '1rem', fontFamily: 'inherit', color: 'var(--color-primary-deep)', background: 'var(--color-bg)', boxSizing: 'border-box' }}
    />
  </div>
);

export default function AddTraderPage() {
  const { t, state, setTrader } = useApp();
  const navigate = useNavigate();

  const existing = state.trader;
  const [name, setName]     = useState(existing?.name ?? '');
  const [price, setPrice]   = useState(existing?.offerPrice?.toString() ?? '25');
  const [dist, setDist]     = useState(existing?.distanceKm?.toString() ?? '12');
  const [rating, setRating] = useState(existing?.rating?.toString() ?? '4.5');
  const [transport, setTransport] = useState(existing?.transportCost?.toString() ?? '300');
  const [other, setOther]   = useState(existing?.otherCosts?.toString() ?? '400');
  const [saved, setSaved]   = useState(false);

  const handleSave = () => {
    const trader: Trader = {
      id: existing?.id ?? `trader-${Date.now()}`,
      name: name || 'My Trader',
      offerPrice: parseFloat(price) || 25,
      distanceKm: parseFloat(dist) || 10,
      rating: parseFloat(rating) || 4.0,
      verified: true,
      transportCost: parseFloat(transport) || 300,
      otherCosts: parseFloat(other) || 200,
    };
    setTrader(trader);
    setSaved(true);
    setTimeout(() => navigate('/profile'), 1200);
  };

  if (saved) {
    return (
      <PageWrapper>
        <TopBar title={t('trader.title')} />
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <CheckCircle size={60} color="var(--color-success)" style={{ marginBottom: '1rem' }} />
          <h2 style={{ color: 'var(--color-primary)' }}>{name || 'Trader'} {t('common.save')}d!</h2>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <TopBar title={t('trader.title')} />

      <div className="card" style={{ marginBottom: '1rem' }}>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
          {t('profile.trader.msg')}
        </p>
      </div>

      <div className="card">
        <InputField label={t('trader.name')} value={name} onChange={setName} placeholder={t('trader.example')} />
        <InputField label={t('trader.offer')} value={price} onChange={setPrice} type="number" placeholder="25" />
        <InputField label={t('trader.distance')} value={dist} onChange={setDist} type="number" placeholder="12" />
        <InputField label={t('trader.rating')} value={rating} onChange={setRating} type="number" placeholder="4.5" />
        <InputField label={t('trader.transport')} value={transport} onChange={setTransport} type="number" placeholder="300" />
        <InputField label={t('trader.other')} value={other} onChange={setOther} type="number" placeholder="400" />

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSave} id="btn-save-trader">
            {t('trader.save')}
          </button>
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => navigate(-1)} id="btn-cancel-trader">
            {t('trader.cancel')}
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}
