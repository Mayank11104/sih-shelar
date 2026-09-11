import type { ProduceInput, Trader } from '../types';

// ─── Constants ────────────────────────────────────────────────────────────────
const STORAGE_COST_PER_DAY = 250; // ₹ per day
const SPOILAGE_PERCENT = 0.05;    // 5%

// ─── Core Formula ─────────────────────────────────────────────────────────────

/**
 * Calculates net return for selling NOW.
 *
 * Net Return = (Price × Quantity) − Transport − Storage − Spoilage − Other
 */
export function calcNetReturn({
  pricePerKg,
  quantityKg,
  transportCost,
  storageCost = 0,
  otherCosts = 0,
}: {
  pricePerKg: number;
  quantityKg: number;
  transportCost: number;
  storageCost?: number;
  otherCosts?: number;
}) {
  const grossRevenue = pricePerKg * quantityKg;
  const spoilageCost = grossRevenue * SPOILAGE_PERCENT;
  const netReturn = grossRevenue - transportCost - storageCost - spoilageCost - otherCosts;

  return {
    grossRevenue: Math.round(grossRevenue),
    transportCost: Math.round(transportCost),
    storageCost: Math.round(storageCost),
    spoilageCost: Math.round(spoilageCost),
    otherCosts: Math.round(otherCosts),
    netReturn: Math.round(netReturn),
  };
}

/**
 * Calculates net return for WAITING (price may change; spoilage accumulates).
 *
 * Expected Sellable Quantity = Quantity × (1 − Spoilage %)
 * Future Net Return = (Predicted Price × Expected Qty) − Storage − Transport − Other
 */
export function calcWaitReturn({
  predictedPricePerKg,
  quantityKg,
  transportCost,
  waitDays = 2,
  otherCosts = 0,
}: {
  predictedPricePerKg: number;
  quantityKg: number;
  transportCost: number;
  waitDays?: number;
  otherCosts?: number;
}) {
  const storageCost = STORAGE_COST_PER_DAY * waitDays;
  const sellableQty = quantityKg * (1 - SPOILAGE_PERCENT);
  const grossRevenue = predictedPricePerKg * sellableQty;
  const spoilageCost = predictedPricePerKg * (quantityKg - sellableQty); // opportunity cost of lost kg
  const netReturn = grossRevenue - storageCost - transportCost - otherCosts;

  return {
    grossRevenue: Math.round(grossRevenue),
    transportCost: Math.round(transportCost),
    storageCost: Math.round(storageCost),
    spoilageCost: Math.round(spoilageCost),
    otherCosts: Math.round(otherCosts),
    netReturn: Math.round(netReturn),
    sellableQty: Math.round(sellableQty),
  };
}

/**
 * Ranks all selling options by net return descending.
 * Returns options tagged with rank (1 = best).
 */
export function rankSellingOptions(
  produce: ProduceInput,
  trader: Trader | null,
  mandi: { offerPrice: number; distanceKm: number; transportCost: number; otherCosts: number; name: string },
  fpo:   { offerPrice: number; distanceKm: number; transportCost: number; otherCosts: number; name: string },
  buyer: { offerPrice: number; distanceKm: number; transportCost: number; otherCosts: number; name: string },
) {
  const qty = produce.unit === 'quintal' ? produce.quantity * 100 : produce.quantity;

  const options = [
    trader && {
      type: 'trader' as const,
      label: trader.name,
      pricePerKg: trader.offerPrice,
      distanceKm: trader.distanceKm,
      verified: trader.verified,
      rating: trader.rating,
      breakdown: calcNetReturn({ pricePerKg: trader.offerPrice, quantityKg: qty, transportCost: trader.transportCost, otherCosts: trader.otherCosts }),
    },
    {
      type: 'mandi' as const,
      label: mandi.name,
      pricePerKg: mandi.offerPrice,
      distanceKm: mandi.distanceKm,
      breakdown: calcNetReturn({ pricePerKg: mandi.offerPrice, quantityKg: qty, transportCost: mandi.transportCost, otherCosts: mandi.otherCosts }),
    },
    {
      type: 'fpo' as const,
      label: fpo.name,
      pricePerKg: fpo.offerPrice,
      distanceKm: fpo.distanceKm,
      verified: true,
      breakdown: calcNetReturn({ pricePerKg: fpo.offerPrice, quantityKg: qty, transportCost: fpo.transportCost, otherCosts: fpo.otherCosts }),
    },
    {
      type: 'buyer' as const,
      label: buyer.name,
      pricePerKg: buyer.offerPrice,
      distanceKm: buyer.distanceKm,
      verified: true,
      breakdown: calcNetReturn({ pricePerKg: buyer.offerPrice, quantityKg: qty, transportCost: buyer.transportCost, otherCosts: buyer.otherCosts }),
    },
  ].filter(Boolean) as NonNullable<typeof options[number]>[];

  const sorted = [...options].sort((a, b) => b.breakdown.netReturn - a.breakdown.netReturn);
  return sorted.map((opt, i) => ({ ...opt, rank: (i + 1) as 1 | 2 | 3 | 4, isBest: i === 0 }));
}

// ─── Currency Formatter ───────────────────────────────────────────────────────
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}
