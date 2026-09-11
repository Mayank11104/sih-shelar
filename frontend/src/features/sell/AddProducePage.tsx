import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/layout/TopBar';
import PageWrapper from '../../components/layout/PageWrapper';
import { SkeletonCard } from '../../components/ui/Skeleton';
import ErrorState from '../../components/ui/ErrorState';
import { useApp } from '../../store/AppContext';
import { CROPS, DEMO_TRADER } from '../../mockData/data';
import { fetchMockData } from '../../mockData/api';
import type { Crop, QualityGrade, ProduceInput } from '../../types';

export default function AddProducePage() {
  const { t, state, setProduce, setTrader } = useApp();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(state.produce?.crop ?? null);
  const [quantity, setQuantity] = useState<string>(state.produce?.quantity?.toString() ?? '500');
  const [unit, setUnit] = useState<'kg' | 'quintal'>(state.produce?.unit ?? 'kg');
  const [quality, setQuality] = useState<QualityGrade>(state.produce?.quality ?? 'A');

  useEffect(() => {
    // Load demo trader if not already set
    if (!state.trader) setTrader(DEMO_TRADER);

    fetchMockData(CROPS)
      .then((data) => { setCrops(data); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  const handleSubmit = () => {
    if (!selectedCrop || !quantity) return;
    const produce: ProduceInput = {
      crop: selectedCrop,
      quantity: parseFloat(quantity),
      unit,
      quality,
    };
    setProduce(produce);
    navigate('/sell/options');
  };

  if (loading) return <PageWrapper><TopBar title={t('sell.title')} /><div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}><SkeletonCard lines={3} /><SkeletonCard lines={4} /></div></PageWrapper>;
  if (error)   return <PageWrapper><TopBar title={t('sell.title')} /><ErrorState onRetry={() => { setError(false); setLoading(true); }} /></PageWrapper>;

  return (
    <PageWrapper>
      <TopBar title={t('sell.title')} />

      {/* Crop Selection */}
      <section style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>{t('sell.title')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
          {crops.map((crop) => (
            <button
              key={crop.id}
              onClick={() => setSelectedCrop(crop)}
              style={{
                padding: '1rem',
                borderRadius: '12px',
                border: `2px solid ${selectedCrop?.id === crop.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                background: selectedCrop?.id === crop.id ? '#E8F5EE' : 'var(--color-surface)',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'border-color 0.15s',
              }}
              id={`crop-${crop.id}`}
            >
              <div style={{ fontSize: '2rem', marginBottom: '6px' }}>{crop.emoji}</div>
              <div style={{ fontWeight: 700, color: 'var(--color-primary-deep)', fontSize: '0.95rem' }}>
                {t(crop.nameKey as Parameters<typeof t>[0])}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Quantity */}
      <section className="card" style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.95rem' }}>
          {t('sell.quantity')}
        </label>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            style={{ flex: 1, padding: '0.75rem', border: '1.5px solid var(--color-border)', borderRadius: '10px', fontSize: '1.1rem', fontWeight: 700, fontFamily: 'inherit', color: 'var(--color-primary-deep)', background: 'var(--color-bg)' }}
            id="input-quantity"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as 'kg' | 'quintal')}
            style={{ padding: '0.75rem', border: '1.5px solid var(--color-border)', borderRadius: '10px', fontFamily: 'inherit', fontSize: '0.95rem', background: 'var(--color-bg)', color: 'var(--color-primary-deep)', fontWeight: 600 }}
            id="select-unit"
          >
            <option value="kg">{t('sell.unit.kg')}</option>
            <option value="quintal">{t('sell.unit.quintal')}</option>
          </select>
        </div>
      </section>

      {/* Quality */}
      <section className="card" style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.95rem' }}>
          {t('sell.quality')}
        </label>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {(['A', 'B', 'C'] as QualityGrade[]).map((g) => (
            <button
              key={g}
              onClick={() => setQuality(g)}
              style={{
                flex: 1, padding: '0.625rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem',
                border: `2px solid ${quality === g ? 'var(--color-primary)' : 'var(--color-border)'}`,
                background: quality === g ? '#E8F5EE' : 'var(--color-surface)',
                color: quality === g ? 'var(--color-primary)' : 'var(--color-muted)',
              }}
              id={`quality-${g}`}
            >
              {g}
            </button>
          ))}
        </div>
        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--color-muted)' }}>
          {t(`quality.${quality}` as Parameters<typeof t>[0])}
        </p>
      </section>

      {/* Trader Offer Preview */}
      {state.trader && (
        <div className="card" style={{ marginBottom: '1rem', borderColor: 'var(--color-accent-light)', background: '#FFF8F0' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '4px' }}>{t('sell.trader.offer')}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, color: 'var(--color-primary-deep)' }}>{state.trader.name}</span>
            <span className="price-numeral">₹{state.trader.offerPrice}/{t('common.kg')}</span>
          </div>
        </div>
      )}

      {/* Photo (optional) */}
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <button className="btn btn-secondary" style={{ fontSize: '0.9rem', minHeight: '44px' }} id="btn-photo">
          {t('sell.photo')}
          <span style={{ color: 'var(--color-muted)', fontWeight: 400, marginLeft: '4px' }}>({t('sell.photo.optional')})</span>
        </button>
      </div>

      {/* CTA */}
      <button
        className="btn btn-primary btn-full"
        onClick={handleSubmit}
        disabled={!selectedCrop}
        id="btn-check-options"
        style={{ fontSize: '1.1rem', opacity: selectedCrop ? 1 : 0.5 }}
      >
        {t('sell.cta')}
      </button>
    </PageWrapper>
  );
}
