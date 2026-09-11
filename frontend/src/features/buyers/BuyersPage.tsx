import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/layout/TopBar';
import PageWrapper from '../../components/layout/PageWrapper';
import { SkeletonCard } from '../../components/ui/Skeleton';
import { useApp } from '../../store/AppContext';
import { BUYERS } from '../../mockData/data';
import { fetchMockData } from '../../mockData/api';
import type { Buyer } from '../../types';

function BuyerCard({ buyer, onView }: { buyer: Buyer; onView: () => void }) {
  const { t } = useApp();
  return (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-primary-deep)', marginBottom: '4px' }}>{buyer.name}</div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {buyer.verified && <span className="badge badge-verified">{t('options.verified')}</span>}
            <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>{buyer.distanceKm} {t('buyers.distance')}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>⭐ {buyer.rating}</span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="price-numeral">₹{buyer.offerPrice}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{t('common.per.kg')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '0.75rem' }}>
        <span>{t('buyers.required')}: {buyer.minQuantityKg}–{buyer.maxQuantityKg} {t('common.kg')}</span>
        <span>{buyer.crops.join(', ')}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
        <button className="btn btn-primary" style={{ minHeight: '44px', fontSize: '0.9rem' }} onClick={onView} id={`btn-view-offer-${buyer.id}`}>
          {t('buyers.view')}
        </button>
        <button className="btn btn-secondary" style={{ minHeight: '44px', fontSize: '0.9rem' }} id={`btn-contact-${buyer.id}`}>
          {t('buyers.contact')}
        </button>
      </div>
    </div>
  );
}

export default function BuyersPage() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [buyers, setBuyers] = useState<Buyer[]>([]);

  useEffect(() => {
    fetchMockData(BUYERS, 1000).then((data) => { setBuyers(data); setLoading(false); });
  }, []);

  if (loading) return <PageWrapper><TopBar title={t('buyers.title')} /><div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}><SkeletonCard lines={4} /><SkeletonCard lines={4} /><SkeletonCard lines={4} /></div></PageWrapper>;

  return (
    <PageWrapper>
      <TopBar title={t('buyers.title')} />
      <h2 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>{t('buyers.title')}</h2>
      {buyers.map((buyer) => (
        <BuyerCard key={buyer.id} buyer={buyer} onView={() => navigate(`/buyers/offer/${buyer.id}`)} />
      ))}
    </PageWrapper>
  );
}
