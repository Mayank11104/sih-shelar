import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import TopBar from '../../components/layout/TopBar';
import PageWrapper from '../../components/layout/PageWrapper';
import { SkeletonCard } from '../../components/ui/Skeleton';
import { useApp } from '../../store/AppContext';
import { TOMATO_PREDICTION, BUYERS } from '../../mockData/data';
import { fetchMockData } from '../../mockData/api';
import { calcWaitReturn, formatCurrency } from '../../utils/decisionEngine';

const REASONS = [
  'rec.reason.price_rising',
  'rec.reason.storage_manageable',
  'rec.reason.low_spoilage',
  'rec.reason.higher_earnings',
] as const;

export default function RecommendationPage() {
  const { t, state, confirmDecision } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [decided, setDecided] = useState(false);

  useEffect(() => { fetchMockData(null, 1400).then(() => setLoading(false)); }, []);

  if (loading) return <PageWrapper><TopBar title={t('rec.title')} /><div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}><div className="skeleton" style={{ height: 200 }} /><SkeletonCard lines={4} /></div></PageWrapper>;

  const produce = state.produce;
  if (!produce) { navigate('/sell'); return null; }

  const qty = produce.unit === 'quintal' ? produce.quantity * 100 : produce.quantity;
  const buyer = BUYERS[0];
  const waitCalc = calcWaitReturn({ predictedPricePerKg: TOMATO_PREDICTION.predictions[1].price, quantityKg: qty, transportCost: buyer.transportCost, waitDays: 2, otherCosts: buyer.otherCosts });
  const nowEarnings = (28 - buyer.transportCost / qty) * qty;
  const diff = waitCalc.netReturn - Math.round(nowEarnings);

  const handleConfirm = () => {
    confirmDecision('wait', 'buyer', waitCalc.netReturn);
    setDecided(true);
  };

  return (
    <PageWrapper>
      <TopBar title={t('rec.title')} />

      {/* Main Recommendation Banner */}
      <div className="rec-banner" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '2rem' }}>🟢</span>
          <h2 style={{ color: '#fff', fontSize: '1.3rem' }}>{t('timing.wait')}</h2>
        </div>

        <div style={{ marginBottom: '0.75rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2px' }}>{t('options.earnings')}</div>
          <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#fff' }}>{formatCurrency(waitCalc.netReturn)}</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '0.625rem 0.875rem', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>{t('rec.additional')}</span>
          <span style={{ fontWeight: 800, color: '#A7F3D0' }}>+{formatCurrency(diff)}</span>
        </div>

        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)', fontStyle: 'italic' }}>
          {t('rec.disclaimer')}
        </p>
      </div>

      {/* Reasons */}
      <div className="card" style={{ marginBottom: '1rem' }}>
        <h3 style={{ marginBottom: '0.75rem' }}>Why this recommendation?</h3>
        {REASONS.map((key) => (
          <div key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', padding: '0.4rem 0', borderBottom: '1px solid var(--color-border)' }}>
            <CheckCircle size={16} color="var(--color-success)" style={{ marginTop: 2, flexShrink: 0 }} />
            <span style={{ fontSize: '0.9rem' }}>{t(key)}</span>
          </div>
        ))}
      </div>

      {/* Reliability & Risk */}
      <div className="card" style={{ marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>{t('rec.reliability')}</div>
          <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-primary)' }}>{TOMATO_PREDICTION.reliabilityPercent}%</div>
        </div>
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>{t('rec.risk')}</div>
          <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-accent)' }}>{t('rec.risk.medium')}</div>
        </div>
      </div>

      {/* Decision Buttons */}
      {!decided ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button className="btn btn-primary btn-full" onClick={() => navigate('/buyers')} id="btn-see-options">{t('rec.cta.options')}</button>
          <button className="btn btn-secondary btn-full" onClick={() => { confirmDecision('now', 'buyer', Math.round(nowEarnings)); navigate('/my-decisions'); }} id="btn-sell-now-instead">{t('rec.cta.now')}</button>
          <button className="btn btn-accent btn-full" onClick={handleConfirm} id="btn-confirm-wait" style={{ fontSize: '1rem' }}>✅ Confirm: Wait 2 Days</button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', background: '#D1FAE5', border: '1.5px solid var(--color-success)', borderRadius: '12px', padding: '1.5rem' }}>
          <CheckCircle size={40} color="var(--color-success)" style={{ marginBottom: '0.5rem' }} />
          <div style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '1.1rem' }}>{t('decision.status.confirmed')}</div>
          <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/my-decisions')} id="btn-view-decision">📋 {t('decision.title')}</button>
        </div>
      )}
    </PageWrapper>
  );
}
