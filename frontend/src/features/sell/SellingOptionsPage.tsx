import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, MapPin, Star, ArrowRight, Info } from 'lucide-react';
import TopBar from '../../components/layout/TopBar';
import PageWrapper from '../../components/layout/PageWrapper';
import { SkeletonCard } from '../../components/ui/Skeleton';
import ErrorState from '../../components/ui/ErrorState';
import { useApp } from '../../store/AppContext';
import { DEMO_MANDI, DEMO_FPO, BUYERS } from '../../mockData/data';
import { fetchMockData } from '../../mockData/api';
import { rankSellingOptions, formatCurrency } from '../../utils/decisionEngine';
import type { SellingOption } from '../../types';

const RANK_LABELS = ['Best Return', '2nd Best', '3rd Best', '4th'];
const RANK_STYLES = [
  { bg: '#D1FAE5', color: 'var(--success)', border: 'var(--primary-light)' },
  { bg: '#DBEAFE', color: '#2563EB',        border: '#93C5FD' },
  { bg: '#FEF3C7', color: 'var(--warning)', border: '#FDE68A' },
  { bg: 'var(--bg)', color: 'var(--text-muted)', border: 'var(--border)' },
];

function OptionCard({ opt, onDetails }: { opt: SellingOption; onDetails: () => void }) {
  const rankStyle = RANK_STYLES[opt.rank - 1];
  const isTopRank = opt.rank === 1;

  return (
    <div
      className={`card${isTopRank ? ' card-highlighted' : ''}`}
      style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'relative' }}
    >
      {/* Rank pill */}
      <div style={{ position: 'absolute', top: -1, right: 16 }}>
        <span style={{
          padding: '3px 10px',
          borderRadius: '0 0 6px 6px',
          background: rankStyle.bg,
          color: rankStyle.color,
          fontSize: '0.7rem',
          fontWeight: 700,
          border: `1px solid ${rankStyle.border}`,
          borderTop: 'none',
        }}>
          {RANK_LABELS[opt.rank - 1]}
        </span>
      </div>

      {/* Top row */}
      <div className="flex-between" style={{ paddingTop: 8 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>{opt.label}</div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
            {opt.verified && <span className="badge badge-green"><CheckCircle2 size={10} /> Verified</span>}
            <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 2 }}>
              <MapPin size={11} /> {opt.distanceKm} km
            </span>
            {opt.rating && <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 2 }}><Star size={11} /> {opt.rating}</span>}
            <span className="badge badge-gray" style={{ textTransform: 'capitalize' }}>{opt.type}</span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="price-md">₹{opt.pricePerKg}/kg</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Offer price</div>
        </div>
      </div>

      {/* Net return */}
      <div style={{ background: isTopRank ? 'var(--primary-bg)' : 'var(--bg)', borderRadius: 'var(--radius-md)', padding: '10px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, fontSize: '0.8rem' }}>
        <div>
          <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>Gross</div>
          <div style={{ fontWeight: 600 }}>₹{opt.breakdown.grossRevenue.toLocaleString('en-IN')}</div>
        </div>
        <div>
          <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>Costs</div>
          <div style={{ fontWeight: 600, color: 'var(--error)' }}>
            −₹{(opt.breakdown.transportCost + opt.breakdown.spoilageCost + opt.breakdown.otherCosts).toLocaleString('en-IN')}
          </div>
        </div>
        <div>
          <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>Net Return</div>
          <div style={{ fontWeight: 800, color: isTopRank ? 'var(--primary)' : 'var(--text)', fontSize: '0.95rem' }}>
            {formatCurrency(opt.breakdown.netReturn)}
          </div>
        </div>
      </div>

      <button
        className={`btn ${isTopRank ? 'btn-primary' : 'btn-secondary'}`}
        onClick={onDetails}
        id={`view-${opt.type}`}
        style={{ width: '100%' }}
      >
        View Breakdown <ArrowRight size={14} />
      </button>
    </div>
  );
}

export default function SellingOptionsPage() {
  const { t, state } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [options, setOptions] = useState<SellingOption[]>([]);

  const load = () => {
    setLoading(true); setError(false);
    const produce = state.produce;
    if (!produce) { navigate('/sell'); return; }

    fetchMockData(null, 1000)
      .then(() => {
        setOptions(rankSellingOptions(produce, state.trader, DEMO_MANDI, DEMO_FPO, BUYERS[0]));
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  if (loading) return (
    <PageWrapper>
      <TopBar title={t('options.title')} />
      <div className="page-content grid-2">
        <SkeletonCard lines={4} /><SkeletonCard lines={4} />
        <SkeletonCard lines={4} /><SkeletonCard lines={4} />
      </div>
    </PageWrapper>
  );
  if (error) return <PageWrapper><TopBar title={t('options.title')} /><ErrorState onRetry={load} /></PageWrapper>;

  return (
    <PageWrapper>
      <TopBar title={t('options.title')} />
      <div className="page-content">
        <div className="page-header">
          <div className="flex-between" style={{ flexWrap: 'wrap', gap: 8 }}>
            <div>
              <h1 className="page-title">{t('options.title')}</h1>
              <p className="page-subtitle">
                {state.produce && t(state.produce.crop.nameKey as Parameters<typeof t>[0])} ·{' '}
                {state.produce?.quantity} {state.produce?.unit} · Grade {state.produce?.quality} ·{' '}
                Ranked by expected net return
              </p>
            </div>
            <span className="badge badge-blue">
              <Info size={10} /> Net return after transport &amp; costs
            </span>
          </div>
        </div>

        <div className="grid-2" style={{ marginBottom: 24 }}>
          {options.map((opt) => (
            <OptionCard key={opt.type} opt={opt} onDetails={() => navigate('/sell/compare')} />
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => navigate('/sell/prediction')} id="btn-see-prediction">
            View Price Prediction
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/sell/decision')} id="btn-sell-wait">
            Sell vs Wait Analysis
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}
