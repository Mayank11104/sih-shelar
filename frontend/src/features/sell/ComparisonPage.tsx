import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/layout/TopBar';
import PageWrapper from '../../components/layout/PageWrapper';
import { SkeletonCard } from '../../components/ui/Skeleton';
import { useApp } from '../../store/AppContext';
import { BUYERS } from '../../mockData/data';
import { fetchMockData } from '../../mockData/api';
import { calcNetReturn, formatCurrency } from '../../utils/decisionEngine';

const BreakdownRow = ({ label, value, isNegative = false }: { label: string; value: number; isNegative?: boolean }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
    <span style={{ color: 'var(--text-muted)' }}>{label}</span>
    <span style={{ fontWeight: 600, color: isNegative ? 'var(--error)' : 'var(--primary)' }}>
      {isNegative ? '−' : ''}{formatCurrency(Math.abs(value))}
    </span>
  </div>
);

export default function ComparisonPage() {
  const { t, state } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMockData(null, 800).then(() => setLoading(false));
  }, []);

  if (loading) return <PageWrapper><TopBar title={t('compare.title')} /><div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}><SkeletonCard lines={5} /><SkeletonCard lines={5} /></div></PageWrapper>;

  const produce = state.produce;
  const trader = state.trader;
  if (!produce || !trader) { navigate('/sell'); return null; }

  const qty = produce.unit === 'quintal' ? produce.quantity * 100 : produce.quantity;
  const traderBreak = calcNetReturn({ pricePerKg: trader.offerPrice, quantityKg: qty, transportCost: trader.transportCost, otherCosts: trader.otherCosts });
  const buyerBreak  = calcNetReturn({ pricePerKg: BUYERS[0].offerPrice, quantityKg: qty, transportCost: BUYERS[0].transportCost, otherCosts: BUYERS[0].otherCosts });

  const diff = buyerBreak.netReturn - traderBreak.netReturn;

  return (
    <PageWrapper>
      <TopBar title={t('compare.title')} />

      <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        {t('compare.title')}
      </p>

      {/* Trader Card */}
      <div className="card" style={{ marginBottom: '1rem' }}>
        <h3 style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          🤝 {t('compare.your.trader')}
        </h3>
        <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>{trader.name}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '0.75rem' }}>₹{trader.offerPrice}/{t('common.kg')} · {produce.quantity}{t(`common.${produce.unit}` as Parameters<typeof t>[0])}</div>
        <BreakdownRow label={t('options.gross')} value={traderBreak.grossRevenue} />
        <BreakdownRow label={t('options.transport')} value={traderBreak.transportCost} isNegative />
        <BreakdownRow label={t('options.spoilage')} value={traderBreak.spoilageCost} isNegative />
        <BreakdownRow label={t('options.other')} value={traderBreak.otherCosts} isNegative />
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
          <span style={{ fontWeight: 700 }}>{t('options.earnings')}</span>
          <span className="price-numeral" style={{ color: 'var(--color-primary)' }}>{formatCurrency(traderBreak.netReturn)}</span>
        </div>
      </div>

      {/* Best Alternative Card */}
      <div className="card card-best" style={{ marginBottom: '1rem' }}>
        <h3 style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          🥇 {t('compare.best.alt')}
        </h3>
        <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>{BUYERS[0].name}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '0.75rem' }}>₹{BUYERS[0].offerPrice}/{t('common.kg')} · {BUYERS[0].distanceKm} {t('common.km')}</div>
        <BreakdownRow label={t('options.gross')} value={buyerBreak.grossRevenue} />
        <BreakdownRow label={t('options.transport')} value={buyerBreak.transportCost} isNegative />
        <BreakdownRow label={t('options.spoilage')} value={buyerBreak.spoilageCost} isNegative />
        <BreakdownRow label={t('options.other')} value={buyerBreak.otherCosts} isNegative />
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
          <span style={{ fontWeight: 700 }}>{t('options.earnings')}</span>
          <span className="price-numeral" style={{ color: 'var(--color-primary)' }}>{formatCurrency(buyerBreak.netReturn)}</span>
        </div>
      </div>

      {/* Difference Banner */}
      <div style={{
        background: traderIsBetter ? '#E8F5EE' : '#FEF3C7',
        border: `1.5px solid ${traderIsBetter ? 'var(--color-primary-light)' : 'var(--color-accent-light)'}`,
        borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem', textAlign: 'center',
      }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '4px' }}>{t('compare.difference')}</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: traderIsBetter ? 'var(--color-primary)' : 'var(--color-accent)' }}>
          {diff > 0 ? '+' : ''}{formatCurrency(Math.abs(diff))}
        </div>
        <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--color-primary-deep)' }}>
          {traderIsBetter ? t('compare.msg.best') : t('compare.msg.better')}
        </p>
      </div>

      <button className="btn btn-primary btn-full" onClick={() => navigate('/sell/prediction')} id="btn-see-prediction">
        📊 {t('predict.title')}
      </button>
    </PageWrapper>
  );
}
