import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import TopBar from '../../components/layout/TopBar';
import PageWrapper from '../../components/layout/PageWrapper';
import { SkeletonCard } from '../../components/ui/Skeleton';
import { useApp } from '../../store/AppContext';
import { BUYERS } from '../../mockData/data';
import { fetchMockData } from '../../mockData/api';
import { calcNetReturn, formatCurrency } from '../../utils/decisionEngine';
import type { Buyer } from '../../types';

const DetailRow = ({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.625rem 0', borderBottom: '1px solid var(--border)' }}>
    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{label}</span>
    <span style={{ fontWeight: bold ? 800 : 600, fontSize: bold ? '1.1rem' : '0.9rem', color: bold ? 'var(--primary)' : 'var(--text)' }}>{value}</span>
  </div>
);

export default function DigitalOfferPage() {
  const { t, state } = useApp();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [buyer, setBuyer] = useState<Buyer | null>(null);
  const [status, setStatus] = useState<'pending' | 'accepted' | 'rejected'>('pending');

  useEffect(() => {
    fetchMockData(BUYERS.find((b) => b.id === id) ?? BUYERS[0], 900)
      .then((b) => { setBuyer(b); setLoading(false); });
  }, [id]);

  if (loading) return <PageWrapper><TopBar title={t('offer.title')} /><div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}><SkeletonCard lines={6} /></div></PageWrapper>;
  if (!buyer) return null;

  const produce = state.produce;
  const qty = produce ? (produce.unit === 'quintal' ? produce.quantity * 100 : produce.quantity) : 500;
  const breakdown = calcNetReturn({ pricePerKg: buyer.offerPrice, quantityKg: qty, transportCost: buyer.transportCost, otherCosts: buyer.otherCosts });

  if (status === 'accepted') {
    return (
      <PageWrapper>
        <TopBar title={t('offer.title')} />
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <CheckCircle size={60} color="var(--color-success)" style={{ marginBottom: '1rem' }} />
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>{t('offer.accepted')}</h2>
          <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>{buyer.name}</p>
          <button className="btn btn-primary" onClick={() => navigate('/my-decisions')} id="btn-view-my-decision">📋 {t('decision.title')}</button>
        </div>
      </PageWrapper>
    );
  }

  if (status === 'rejected') {
    return (
      <PageWrapper>
        <TopBar title={t('offer.title')} />
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <XCircle size={60} color="var(--color-error)" style={{ marginBottom: '1rem' }} />
          <h2 style={{ marginBottom: '0.5rem' }}>{t('offer.rejected')}</h2>
          <button className="btn btn-secondary" style={{ marginTop: '1rem' }} onClick={() => navigate('/buyers')} id="btn-back-to-buyers">← {t('buyers.title')}</button>
        </div>
      </PageWrapper>
    );
  }
  return (
    <PageWrapper>
      <TopBar title={t('offer.title')} />

      <div className="card card-best" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ flex: 1 }}>
            <h2>{buyer.name}</h2>
            {buyer.verified && <span className="badge badge-verified">{t('options.verified')}</span>}
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="price-large">₹{buyer.offerPrice}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{t('common.per.kg')}</div>
          </div>
        </div>

        <DetailRow label={t('offer.crop')}     value={`🍅 ${produce ? t(produce.crop.nameKey as Parameters<typeof t>[0]) : 'Tomato'}`} />
        <DetailRow label={t('offer.quantity')} value={`${qty} ${t('common.kg')}`} />
        <DetailRow label={t('offer.quality')}  value={produce?.quality ?? 'A'} />
        <DetailRow label={t('offer.price')}    value={`₹${buyer.offerPrice}/${t('common.kg')}`} />
        <DetailRow label={t('offer.valid')}    value={buyer.offerValidUntil} />
        <DetailRow label={t('offer.earnings')} value={formatCurrency(breakdown.netReturn)} bold />
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <button className="btn btn-primary btn-full" onClick={() => setStatus('accepted')} id="btn-accept-offer">{t('offer.accept')}</button>
        <button className="btn btn-secondary btn-full" onClick={() => navigate('/sell/options')} id="btn-compare-again">{t('offer.compare')}</button>
        <button className="btn" style={{ background: '#FEE2E2', color: 'var(--color-error)', border: '1.5px solid #FECACA', width: '100%', minHeight: '48px' }} onClick={() => setStatus('rejected')} id="btn-reject-offer">{t('offer.reject')}</button>
      </div>
    </PageWrapper>
  );
}
