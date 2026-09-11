import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import TopBar from '../../components/layout/TopBar';
import PageWrapper from '../../components/layout/PageWrapper';
import { SkeletonCard } from '../../components/ui/Skeleton';
import ErrorState from '../../components/ui/ErrorState';
import { useApp } from '../../store/AppContext';
import { DEMO_MANDI, DEMO_FPO, BUYERS } from '../../mockData/data';
import { fetchMockData } from '../../mockData/api';
import { rankSellingOptions, formatCurrency } from '../../utils/decisionEngine';
import type { SellingOption } from '../../types';

const RANK_LABEL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉', 4: '' };

export default function SellingOptionsPage() {
  const { t, state } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [options, setOptions] = useState<SellingOption[]>([]);

  const load = () => {
    setLoading(true);
    setError(false);
    const produce = state.produce;
    if (!produce) { navigate('/sell'); return; }

    fetchMockData(null, 1100)
      .then(() => {
        const ranked = rankSellingOptions(
          produce,
          state.trader,
          DEMO_MANDI,
          DEMO_FPO,
          BUYERS[0],
        );
        setOptions(ranked);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  if (loading) return <PageWrapper><TopBar title={t('options.title')} /><div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}><SkeletonCard lines={4} /><SkeletonCard lines={4} /><SkeletonCard lines={4} /><SkeletonCard lines={4} /></div></PageWrapper>;
  if (error)   return <PageWrapper><TopBar title={t('options.title')} /><ErrorState onRetry={load} /></PageWrapper>;

  return (
    <PageWrapper>
      <TopBar title={t('options.title')} />

      <div style={{ marginBottom: '0.75rem' }}>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>
          {state.produce?.crop.emoji} {state.produce && t(state.produce.crop.nameKey as Parameters<typeof t>[0])} · {state.produce?.quantity}{t(`common.${state.produce?.unit}` as Parameters<typeof t>[0])} · {t(`quality.${state.produce?.quality}` as Parameters<typeof t>[0])}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {options.map((opt) => (
          <div
            key={opt.type}
            className={`card${opt.isBest ? ' card-best' : ''}`}
            style={{ position: 'relative' }}
          >
            {/* Rank Badge */}
            {opt.rank <= 3 && (
              <div style={{ position: 'absolute', top: '-10px', left: '1rem' }}>
                <span className="badge badge-best" style={{ background: opt.isBest ? '#D1FAE5' : '#F3F4F6', color: opt.isBest ? 'var(--color-primary)' : 'var(--color-muted)' }}>
                  {RANK_LABEL[opt.rank]} {opt.isBest ? t('options.best') : opt.rank === 2 ? t('options.second') : t('options.third')}
                </span>
              </div>
            )}

            <div style={{ marginTop: opt.rank <= 3 ? '0.5rem' : 0 }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-primary-deep)' }}>{opt.label}</div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '4px', flexWrap: 'wrap' }}>
                    {opt.verified && <span className="badge badge-verified">{t('options.verified')}</span>}
                    {opt.rating && <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>⭐ {opt.rating}</span>}
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>{opt.distanceKm} {t('common.km')}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="price-numeral">₹{opt.pricePerKg}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>/{t('common.kg')}</span>
                </div>
              </div>

              {/* Earnings */}
              <div style={{ background: opt.isBest ? '#E8F5EE' : 'var(--color-bg)', borderRadius: '10px', padding: '0.625rem 0.875rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>{t('options.earnings')}</span>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: opt.isBest ? 'var(--color-primary)' : 'var(--color-primary-deep)' }}>
                  {formatCurrency(opt.breakdown.netReturn)}
                </span>
              </div>

              {/* View Details */}
              <button
                className="btn btn-secondary"
                style={{ width: '100%', marginTop: '0.75rem', minHeight: '44px', fontSize: '0.9rem' }}
                onClick={() => navigate('/sell/compare')}
                id={`view-${opt.type}`}
              >
                {t('options.view')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <button className="btn btn-primary btn-full" onClick={() => navigate('/sell/prediction')} id="btn-see-prediction">
          📊 {t('predict.title')}
        </button>
        <button className="btn btn-secondary btn-full" onClick={() => navigate('/sell/decision')} id="btn-sell-wait">
          ⚖️ {t('timing.title')}
        </button>
      </div>
    </PageWrapper>
  );
}
