import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/layout/TopBar';
import PageWrapper from '../../components/layout/PageWrapper';
import { SkeletonCard } from '../../components/ui/Skeleton';
import { useApp } from '../../store/AppContext';
import { MANDI_PRICES } from '../../mockData/data';
import { fetchMockData } from '../../mockData/api';
import type { MandiPrice } from '../../types';

const CROP_OPTIONS = ['All', 'tomato', 'onion', 'potato', 'wheat'] as const;
const CROP_EMOJI: Record<string, string> = { tomato: '🍅', onion: '🧅', potato: '🥔', wheat: '🌾' };

export default function PricesPage() {
  const { t } = useApp();
  const [loading, setLoading] = useState(true);
  const [prices, setPrices] = useState<MandiPrice[]>([]);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    fetchMockData(MANDI_PRICES, 1100).then((data) => { setPrices(data); setLoading(false); });
  }, []);

  const filtered = filter === 'All' ? prices : prices.filter((p) => p.crop === filter);

  if (loading) return <PageWrapper><TopBar title={t('prices.title')} /><div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}><SkeletonCard lines={3} /><SkeletonCard lines={3} /><SkeletonCard lines={3} /></div></PageWrapper>;

  return (
    <PageWrapper>
      <TopBar title={t('prices.title')} />

      {/* Demo Badge */}
      <div style={{ marginBottom: '1rem' }}>
        <span className="badge badge-demo">🔬 {t('prices.disclaimer')}</span>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {CROP_OPTIONS.map((crop) => (
          <button
            key={crop}
            onClick={() => setFilter(crop)}
            style={{
              padding: '6px 14px', borderRadius: '999px', border: `1.5px solid ${filter === crop ? 'var(--color-primary)' : 'var(--color-border)'}`,
              background: filter === crop ? 'var(--color-primary)' : 'var(--color-surface)',
              color: filter === crop ? '#fff' : 'var(--color-muted)',
              fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit',
            }}
            id={`filter-${crop}`}
          >
            {crop === 'All' ? 'All' : `${CROP_EMOJI[crop]} ${t(`crop.${crop}` as Parameters<typeof t>[0])}`}
          </button>
        ))}
      </div>

      {/* Price Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filtered.map((price, idx) => (
          <div key={idx} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem' }}>
                  {CROP_EMOJI[price.crop]} {t(`crop.${price.crop}` as Parameters<typeof t>[0])}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>{price.market} · {price.location}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="price-numeral" style={{ color: 'var(--color-primary)' }}>₹{price.modalPrice}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>Modal</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', fontSize: '0.82rem', textAlign: 'center' }}>
              <div style={{ background: 'var(--color-bg)', borderRadius: '8px', padding: '6px' }}>
                <div style={{ color: 'var(--color-muted)', marginBottom: '2px' }}>{t('prices.min')}</div>
                <div style={{ fontWeight: 700 }}>₹{price.minPrice}</div>
              </div>
              <div style={{ background: 'var(--color-bg)', borderRadius: '8px', padding: '6px' }}>
                <div style={{ color: 'var(--color-muted)', marginBottom: '2px' }}>{t('prices.max')}</div>
                <div style={{ fontWeight: 700 }}>₹{price.maxPrice}</div>
              </div>
              <div style={{ background: 'var(--color-bg)', borderRadius: '8px', padding: '6px' }}>
                <div style={{ color: 'var(--color-muted)', marginBottom: '2px' }}>{t('prices.arrival')}</div>
                <div style={{ fontWeight: 700 }}>{price.arrivalQuantity}q</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
