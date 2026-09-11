import { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import TopBar from '../../components/layout/TopBar';
import PageWrapper from '../../components/layout/PageWrapper';
import { SkeletonCard } from '../../components/ui/Skeleton';
import { useApp } from '../../store/AppContext';
import { MANDI_PRICES } from '../../mockData/data';
import { fetchMockData } from '../../mockData/api';
import type { MandiPrice } from '../../types';

const CROP_OPTIONS = [
  { value: 'All',    label: 'All Crops' },
  { value: 'tomato', label: 'Tomato' },
  { value: 'onion',  label: 'Onion' },
  { value: 'potato', label: 'Potato' },
  { value: 'wheat',  label: 'Wheat' },
];

export default function PricesPage() {
  const { t } = useApp();
  const [loading, setLoading] = useState(true);
  const [prices, setPrices] = useState<MandiPrice[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchMockData(MANDI_PRICES, 1000).then((data) => { setPrices(data); setLoading(false); });
  }, []);

  const filtered = filter === 'All' ? prices : prices.filter((p) => p.crop === filter);

  return (
    <PageWrapper>
      <TopBar
        title={t('prices.title')}
        showBack={false}
        actions={
          <span className="badge badge-demo" style={{ marginRight: 8 }}>Demo Data</span>
        }
      />

      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">{t('prices.title')}</h1>
          <p className="page-subtitle">Maharashtra APMC markets · Last updated: Today, 12 Sep 2026</p>
        </div>

        {/* Filter row */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <Filter size={14} color="var(--text-muted)" />
          {CROP_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              id={`filter-${opt.value}`}
              style={{
                padding: '5px 14px',
                borderRadius: 'var(--radius-sm)',
                border: `1px solid ${filter === opt.value ? 'var(--primary)' : 'var(--border)'}`,
                background: filter === opt.value ? 'var(--primary)' : 'var(--surface)',
                color: filter === opt.value ? '#fff' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.12s',
              }}
            >
              {t(`crop.${opt.value.toLowerCase()}` as Parameters<typeof t>[0]) || opt.label}
            </button>
          ))}
        </div>

        {/* Table — desktop */}
        {loading ? (
          <div className="stack stack-12">
            <SkeletonCard lines={2} />
            <SkeletonCard lines={2} />
            <SkeletonCard lines={2} />
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'none' }} id="price-table-desktop"
              style={{ display: 'block' }}
            >
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>{t('prices.market')}</th>
                      <th>Crop</th>
                      <th style={{ textAlign: 'right' }}>{t('prices.min')} (₹/kg)</th>
                      <th style={{ textAlign: 'right' }}>{t('prices.modal')} (₹/kg)</th>
                      <th style={{ textAlign: 'right' }}>{t('prices.max')} (₹/kg)</th>
                      <th style={{ textAlign: 'right' }}>{t('prices.arrival')} (q)</th>
                      <th style={{ textAlign: 'right' }}>Distance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((row, i) => (
                      <tr key={i}>
                        <td>
                          <div style={{ fontWeight: 600 }}>{row.market}</div>
                          <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>{row.location}</div>
                        </td>
                        <td>
                          <span style={{ fontWeight: 500 }}>
                            {t(`crop.${row.crop}` as Parameters<typeof t>[0])}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>₹{row.minPrice}</td>
                        <td style={{ textAlign: 'right' }}>
                          <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1rem' }}>₹{row.modalPrice}</span>
                        </td>
                        <td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>₹{row.maxPrice}</td>
                        <td style={{ textAlign: 'right' }}>{row.arrivalQuantity}</td>
                        <td style={{ textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.8rem' }}>{row.distanceKm} km</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Disclaimer */}
            <p style={{ marginTop: 12, fontSize: '0.775rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              {t('prices.disclaimer')}
            </p>
          </>
        )}
      </div>
    </PageWrapper>
  );
}
