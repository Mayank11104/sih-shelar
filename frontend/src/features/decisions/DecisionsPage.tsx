import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/layout/TopBar';
import PageWrapper from '../../components/layout/PageWrapper';
import { useApp } from '../../store/AppContext';
import { BUYERS } from '../../mockData/data';
import { formatCurrency } from '../../utils/decisionEngine';

const TIMING_EMOJI: Record<string, string> = { now: '⚡', wait: '⏳', store: '🏭' };
const OPTION_LABEL: Record<string, string> = { trader: 'My Regular Trader', mandi: 'Nearby Mandi', fpo: 'FPO', buyer: 'Verified Buyer' };

export default function DecisionsPage() {
  const { t, state, confirmDecision, resetDecision } = useApp();
  const navigate = useNavigate();
  const { decision, produce, trader } = state;

  const buyerName = decision.option === 'buyer' ? BUYERS[0].name : decision.option === 'trader' ? trader?.name : decision.option === 'mandi' ? 'Pune APMC' : 'Pune FPO';

  return (
    <PageWrapper>
      <TopBar title={t('decision.title')} />

      {produce ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Produce Summary */}
          <div className="card">
            <h3 style={{ marginBottom: '0.75rem' }}>{produce.crop.emoji} {t(produce.crop.nameKey as Parameters<typeof t>[0])}</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge badge-accent">{produce.quantity} {t(`common.${produce.unit}` as Parameters<typeof t>[0])}</span>
              <span className="badge badge-accent">{t(`quality.${produce.quality}` as Parameters<typeof t>[0])}</span>
            </div>
          </div>

          {/* Decision Card */}
          <div className={`card${decision.timing ? ' card-best' : ''}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3>{t('decision.recommended')}</h3>
              {decision.timing && <span style={{ fontSize: '1.5rem' }}>{TIMING_EMOJI[decision.timing]}</span>}
            </div>

            {decision.timing ? (
              <>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: '0.25rem' }}>{t('decision.recommended')}</div>
                <div style={{ fontWeight: 700, marginBottom: '0.75rem' }}>
                  {decision.timing === 'now' ? t('timing.now') : decision.timing === 'wait' ? t('timing.wait') : t('timing.store')}
                </div>

                <div style={{ fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: '0.25rem' }}>{t('decision.buyer')}</div>
                <div style={{ fontWeight: 700, marginBottom: '0.75rem' }}>{buyerName}</div>

                <div style={{ fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: '0.25rem' }}>{t('decision.earnings')}</div>
                <div className="price-large" style={{ marginBottom: '0.75rem' }}>{decision.expectedEarnings ? formatCurrency(decision.expectedEarnings) : '—'}</div>

                {/* Status */}
                <div style={{
                  padding: '0.75rem', borderRadius: '10px', textAlign: 'center', fontWeight: 700,
                  background: decision.confirmed ? '#D1FAE5' : '#FEF9C3',
                  color: decision.confirmed ? 'var(--color-success)' : '#92400E',
                  border: `1.5px solid ${decision.confirmed ? 'var(--color-success)' : '#DDA15E'}`,
                }}>
                  {decision.confirmed ? t('decision.status.confirmed') : t('decision.status.pending')}
                </div>
              </>
            ) : (
              <p style={{ color: 'var(--color-muted)', textAlign: 'center', padding: '1rem' }}>
                No decision made yet. <br />
                <button className="btn btn-primary" style={{ marginTop: '0.75rem' }} onClick={() => navigate('/sell/recommendation')} id="btn-get-recommendation">
                  Get Recommendation
                </button>
              </p>
            )}
          </div>

          {/* Action Buttons */}
          {decision.timing && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {!decision.confirmed && (
                <button className="btn btn-primary btn-full" onClick={() => confirmDecision(decision.timing, decision.option, decision.expectedEarnings ?? 0)} id="btn-confirm-decision">
                  {t('decision.confirm')}
                </button>
              )}
              <button className="btn btn-secondary btn-full" onClick={resetDecision} id="btn-change-decision">
                {t('decision.change')}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌾</div>
          <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>Add your crop to get a selling decision.</p>
          <button className="btn btn-primary" onClick={() => navigate('/sell')} id="btn-add-crop">{t('home.cta.sell')}</button>
        </div>
      )}
    </PageWrapper>
  );
}
