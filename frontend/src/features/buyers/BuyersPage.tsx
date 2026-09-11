import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CheckCircle2, Star, ArrowRight, Package } from 'lucide-react';
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
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Header */}
      <div className="flex-between">
        <div>
          <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)', marginBottom: 4 }}>{buyer.name}</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            {buyer.verified && (
              <span className="badge badge-green">
                <CheckCircle2 size={10} /> Verified
              </span>
            )}
            <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
              <MapPin size={11} />{buyer.distanceKm} km
            </span>
            <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
              <Star size={11} /> {buyer.rating}
            </span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="price-md" style={{ color: 'var(--primary)' }}>₹{buyer.offerPrice}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>per kg</div>
        </div>
      </div>

      {/* Meta */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius-sm)', padding: '8px 10px' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>Required</div>
          <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{buyer.minQuantityKg}–{buyer.maxQuantityKg} kg</div>
        </div>
        <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius-sm)', padding: '8px 10px' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>Crops</div>
          <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{buyer.crops.join(', ')}</div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          className="btn btn-primary"
          onClick={onView}
          id={`btn-view-offer-${buyer.id}`}
          style={{ flex: 1 }}
        >
          View Offer <ArrowRight size={14} />
        </button>
        <button
          className="btn btn-secondary"
          id={`btn-contact-${buyer.id}`}
        >
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

  return (
    <PageWrapper>
      <TopBar title={t('buyers.title')} showBack={false} />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">{t('buyers.title')}</h1>
          <p className="page-subtitle">Verified procurement partners near Pune</p>
        </div>

        {loading ? (
          <div className="stack stack-16">
            <SkeletonCard lines={4} />
            <SkeletonCard lines={4} />
            <SkeletonCard lines={4} />
          </div>
        ) : (
          <div className="grid-2">
            {buyers.map((buyer) => (
              <BuyerCard
                key={buyer.id}
                buyer={buyer}
                onView={() => navigate(`/buyers/offer/${buyer.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
