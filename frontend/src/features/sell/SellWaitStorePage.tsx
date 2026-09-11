import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/layout/TopBar';
import PageWrapper from '../../components/layout/PageWrapper';
import { SkeletonCard } from '../../components/ui/Skeleton';
import { useApp } from '../../store/AppContext';
import { TOMATO_PREDICTION, BUYERS } from '../../mockData/data';
import { fetchMockData } from '../../mockData/api';
import { calcNetReturn, calcWaitReturn, formatCurrency } from '../../utils/decisionEngine';

export default function SellWaitStorePage() {
  const { t, state } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchMockData(null, 1000).then(() => setLoading(false)); }, []);

  if (loading) return <PageWrapper><TopBar title={t('timing.title')} /><div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}><SkeletonCard lines={4} /><SkeletonCard lines={4} /><SkeletonCard lines={4} /></div></PageWrapper>;

  const produce = state.produce;
  if (!produce) { navigate('/sell'); return null; }

  const qty = produce.unit === 'quintal' ? produce.quantity * 100 : produce.quantity;
  const buyer = BUYERS[0];

  const sellNow = calcNetReturn({ pricePerKg: 28, quantityKg: qty, transportCost: buyer.transportCost, otherCosts: buyer.otherCosts });
  const wait2   = calcWaitReturn({ predictedPricePerKg: TOMATO_PREDICTION.predictions[1].price, quantityKg: qty, transportCost: buyer.transportCost, waitDays: 2, otherCosts: buyer.otherCosts });
  const store   = calcWaitReturn({ predictedPricePerKg: TOMATO_PREDICTION.predictions[1].price, quantityKg: qty, transportCost: buyer.transportCost, waitDays: 3, otherCosts: buyer.otherCosts });

  const best = [sellNow.netReturn, wait2.netReturn, store.netReturn];
  const maxEarning = Math.max(...best);

  const options = [
    {
      id: 'now', emoji: '⚡', titleKey: 'timing.now' as const, price: 28, earns: sellNow.netReturn, isBest: sellNow.netReturn === maxEarning,
      items: [
        { label: t('options.gross'), val: formatCurrency(sellNow.grossRevenue) },
        { label: t('options.transport'), val: `−${formatCurrency(sellNow.transportCost)}` },
        { label: t('options.spoilage'), val: `−${formatCurrency(sellNow.spoilageCost)}` },
      ],
    },
    {
      id: 'wait', emoji: '⏳', titleKey: 'timing.wait' as const, price: TOMATO_PREDICTION.predictions[1].price, earns: wait2.netReturn, isBest: wait2.netReturn === maxEarning,
      items: [
        { label: t('timing.storage.cost'), val: `−${formatCurrency(wait2.storageCost)}` },
        { label: t('timing.spoilage'), val: '5%' },
        { label: t('options.earnings'), val: formatCurrency(wait2.netReturn) },
      ],
    },
    {
      id: 'store', emoji: '🏭', titleKey: 'timing.store' as const, price: TOMATO_PREDICTION.predictions[1].price, earns: store.netReturn, isBest: store.netReturn === maxEarning,
      items: [
        { label: t('timing.storage.cost'), val: `−${formatCurrency(store.storageCost)}` },
        { label: t('timing.spoilage'), val: '5%' },
        { label: t('options.earnings'), val: formatCurrency(store.netReturn) },
      ],
    },
  ];

  return (
    <PageWrapper>
      <TopBar title={t('timing.title')} />

      <div style={{ marginBottom: '1rem' }}>
        <span className="badge badge-demo" style={{ marginRight: '0.5rem' }}>🔬 {t('app.demo.label')}</span>
        <span className="badge badge-accent">⚠️ {t('timing.estimate')}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {options.map((opt) => (
          <div key={opt.id} className={`card${opt.isBest ? ' card-best' : ''}`} style={{ position: 'relative' }}>
            {opt.isBest && (
              <div style={{ position: 'absolute', top: '-10px', left: '1rem' }}>
                <span className="badge badge-best">🥇 {t('options.best')}</span>
              </div>
            )}
            <div style={{ marginTop: opt.isBest ? '0.5rem' : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>{opt.emoji}</span>
                  {t(opt.titleKey)}
                </h3>
                <div style={{ textAlign: 'right' }}>
                  <div className="price-numeral">₹{opt.price}/{t('common.kg')}</div>
                  {opt.id !== 'now' && <div style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>{t('predict.title')}</div>}
                </div>
              </div>
              {opt.items.map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '0.3rem 0', borderBottom: '1px solid var(--color-border)' }}>
                  <span style={{ color: 'var(--color-muted)' }}>{item.label}</span>
                  <span style={{ fontWeight: 600 }}>{item.val}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.625rem' }}>
                <span style={{ fontWeight: 700 }}>{t('options.earnings')}</span>
                <span className="price-numeral" style={{ color: opt.isBest ? 'var(--color-primary)' : 'var(--color-primary-deep)' }}>{formatCurrency(opt.earns)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-primary btn-full" onClick={() => navigate('/sell/recommendation')} id="btn-see-recommendation">
        ✅ {t('rec.title')}
      </button>
    </PageWrapper>
  );
}
