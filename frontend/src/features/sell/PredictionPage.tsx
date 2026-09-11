import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Legend,
} from 'recharts';
import TopBar from '../../components/layout/TopBar';
import PageWrapper from '../../components/layout/PageWrapper';
import { SkeletonCard } from '../../components/ui/Skeleton';
import ErrorState from '../../components/ui/ErrorState';
import { useApp } from '../../store/AppContext';
import { TOMATO_PREDICTION } from '../../mockData/data';
import { fetchMockData } from '../../mockData/api';

export default function PredictionPage() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = () => {
    setLoading(true); setError(false);
    fetchMockData(null, 1200)
      .then(() => setLoading(false))
      .catch(() => { setError(true); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  if (loading) return <PageWrapper><TopBar title={t('predict.title')} /><div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}><SkeletonCard lines={2} /><div className="skeleton" style={{ height: 220 }} /><SkeletonCard lines={3} /></div></PageWrapper>;
  if (error)   return <PageWrapper><TopBar title={t('predict.title')} /><ErrorState onRetry={load} /></PageWrapper>;

  const { history, predictions, reliabilityPercent } = TOMATO_PREDICTION;
  const chartData = [...history, ...predictions].map((p) => ({
    date: p.date,
    [p.isPrediction ? 'predicted' : 'actual']: p.price,
  }));

  // Fill both keys for the "Today" point so lines connect
  const todayIdx = chartData.findIndex((d) => d.date === 'Today');
  if (todayIdx !== -1) {
    chartData[todayIdx] = { ...chartData[todayIdx], predicted: history[history.length - 1].price };
  }

  return (
    <PageWrapper>
      <TopBar title={t('predict.title')} />

      <div style={{ marginBottom: '1rem' }}>
        <span className="badge badge-demo">🔬 {t('app.demo.label')}</span>
      </div>

      {/* Current Price */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>{t('predict.current')}</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>🍅 Pune APMC</div>
        </div>
        <span className="price-large">₹{history[history.length - 1].price}</span>
      </div>

      {/* Prediction Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
        {predictions.map((p) => (
          <div key={p.date} className="card card-best" style={{ textAlign: 'center', padding: '0.875rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '4px' }}>{t(p.date === 'Tomorrow' ? 'predict.tomorrow' : 'predict.day2')}</div>
            <div className="price-large" style={{ color: 'var(--color-primary)' }}>₹{p.price}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600, marginTop: '4px' }}>
              +₹{p.price - history[history.length - 1].price}
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="card" style={{ marginBottom: '1rem', padding: '1rem 0.5rem' }}>
        <h3 style={{ padding: '0 0.5rem', marginBottom: '1rem' }}>{t('predict.historical')}</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData} margin={{ top: 5, right: 16, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8E2D0" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6B7566' }} />
            <YAxis tick={{ fontSize: 11, fill: '#6B7566' }} tickFormatter={(v) => `₹${v}`} domain={['dataMin - 2', 'dataMax + 2']} />
            <Tooltip formatter={(v) => [`₹${v}/kg`]} contentStyle={{ fontFamily: 'inherit', fontSize: '0.85rem', borderRadius: '8px', border: '1px solid #E8E2D0' }} />
            <ReferenceLine x="Today" stroke="#BC6C25" strokeDasharray="4 2" label={{ value: 'Today', fill: '#BC6C25', fontSize: 11 }} />
            <Line type="monotone" dataKey="actual"    stroke="#2D6A4F" strokeWidth={2.5} dot={{ r: 4, fill: '#2D6A4F' }} name="Actual" />
            <Line type="monotone" dataKey="predicted" stroke="#DDA15E" strokeWidth={2.5} strokeDasharray="6 3" dot={{ r: 4, fill: '#DDA15E' }} name="Predicted" />
            <Legend iconSize={12} wrapperStyle={{ fontSize: '0.8rem' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Reliability */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>{t('predict.reliability')}</span>
          <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-primary)' }}>{reliabilityPercent}%</span>
        </div>
        <div style={{ background: 'var(--color-border)', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
          <div style={{ background: 'var(--color-primary)', height: '100%', width: `${reliabilityPercent}%`, borderRadius: '999px' }} />
        </div>
        <p style={{ marginTop: '0.625rem', fontSize: '0.8rem', color: 'var(--color-muted)', fontStyle: 'italic' }}>
          {t('predict.disclaimer')}
        </p>
      </div>

      <button className="btn btn-primary btn-full" onClick={() => navigate('/sell/decision')} id="btn-sell-wait">
        ⚖️ {t('timing.title')}
      </button>
    </PageWrapper>
  );
}
