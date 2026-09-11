import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import TopBar from '../../components/layout/TopBar';
import PageWrapper from '../../components/layout/PageWrapper';
import { SkeletonCard } from '../../components/ui/Skeleton';
import { useApp } from '../../store/AppContext';
import { CROPS, DEMO_TRADER } from '../../mockData/data';
import { fetchMockData } from '../../mockData/api';
import type { Crop, QualityGrade } from '../../types';

const QUALITY_DESCRIPTIONS: Record<QualityGrade, string> = {
  A: 'Premium quality — uniform size, no defects',
  B: 'Good quality — minor blemishes acceptable',
  C: 'Average quality — mixed sizes',
};

export default function AddProducePage() {
  const { t, state, setProduce, setTrader } = useApp();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(state.produce?.crop ?? null);
  const [quantity, setQuantity] = useState(state.produce?.quantity?.toString() ?? '500');
  const [unit, setUnit] = useState<'kg' | 'quintal'>(state.produce?.unit ?? 'kg');
  const [quality, setQuality] = useState<QualityGrade>(state.produce?.quality ?? 'A');

  useEffect(() => {
    if (!state.trader) setTrader(DEMO_TRADER);
    fetchMockData(CROPS).then((data) => { setCrops(data); setLoading(false); });
  }, [state.trader, setTrader]);

  const handleSubmit = () => {
    if (!selectedCrop || !quantity) return;
    setProduce({ crop: selectedCrop, quantity: parseFloat(quantity), unit, quality });
    navigate('/sell/options');
  };

  if (loading) return (
    <PageWrapper>
      <TopBar title={t('sell.title')} />
      <div className="page-content stack stack-16">
        <SkeletonCard lines={3} />
        <SkeletonCard lines={3} />
      </div>
    </PageWrapper>
  );

  return (
    <PageWrapper>
      <TopBar title={t('sell.title')} />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">{t('sell.title')}</h1>
          <p className="page-subtitle">Select crop details to compare selling options</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>

          {/* Crop Selection */}
          <div className="card">
            <p className="section-label">Select Crop</p>
            <div className="grid-4" style={{ gap: 10 }}>
              {crops.map((crop) => (
                <button
                  key={crop.id}
                  onClick={() => setSelectedCrop(crop)}
                  id={`crop-${crop.id}`}
                  style={{
                    padding: '14px 8px',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${selectedCrop?.id === crop.id ? 'var(--primary)' : 'var(--border)'}`,
                    background: selectedCrop?.id === crop.id ? 'var(--primary-bg)' : 'var(--surface)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.12s',
                    fontFamily: 'inherit',
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{crop.emoji}</div>
                  <div style={{ fontWeight: 600, color: selectedCrop?.id === crop.id ? 'var(--primary)' : 'var(--text)', fontSize: '0.85rem' }}>
                    {t(crop.nameKey as Parameters<typeof t>[0])}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Quality */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }} className="card">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12 }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">{t('sell.quantity')}</label>
                <input
                  type="number"
                  className="form-input"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  id="input-quantity"
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">{t('sell.unit')}</label>
                <select
                  className="form-select"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as 'kg' | 'quintal')}
                  id="select-unit"
                >
                  <option value="kg">kg</option>
                  <option value="quintal">Quintal</option>
                </select>
              </div>
            </div>

            <div>
              <label className="form-label" style={{ display: 'block', marginBottom: 8 }}>{t('sell.quality')}</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['A', 'B', 'C'] as QualityGrade[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setQuality(g)}
                    id={`quality-${g}`}
                    style={{
                      flex: 1, padding: '10px 8px', borderRadius: 'var(--radius-md)', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem',
                      border: `1.5px solid ${quality === g ? 'var(--primary)' : 'var(--border)'}`,
                      background: quality === g ? 'var(--primary-bg)' : 'var(--surface)',
                      color: quality === g ? 'var(--primary)' : 'var(--text-muted)',
                      fontFamily: 'inherit', transition: 'all 0.12s',
                    }}
                  >
                    Grade {g}
                  </button>
                ))}
              </div>
              <p style={{ marginTop: 6, fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                {QUALITY_DESCRIPTIONS[quality]}
              </p>
            </div>
          </div>

          {/* Trader offer preview */}
          {state.trader && (
            <div className="card card-sm flex-between" style={{ background: 'var(--bg)' }}>
              <div>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginBottom: 2 }}>{t('sell.trader.offer')}</div>
                <div style={{ fontWeight: 700 }}>{state.trader.name}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="price-md" style={{ color: 'var(--accent)' }}>₹{state.trader.offerPrice}/kg</div>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>{state.trader.distanceKm} km away</div>
              </div>
            </div>
          )}

          <button
            className="btn btn-primary btn-lg btn-full"
            onClick={handleSubmit}
            disabled={!selectedCrop}
            id="btn-check-options"
          >
            {t('sell.cta')}
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}
