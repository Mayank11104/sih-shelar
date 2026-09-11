// ─── Language ────────────────────────────────────────────────────────────────
export type Language = 'en' | 'hi' | 'mr';

// ─── Crop ────────────────────────────────────────────────────────────────────
export type QualityGrade = 'A' | 'B' | 'C';

export interface Crop {
  id: string;
  nameKey: string; // i18n key
  emoji: string;
  unit: 'kg' | 'quintal';
}

export interface ProduceInput {
  crop: Crop;
  quantity: number;
  unit: 'kg' | 'quintal';
  quality: QualityGrade;
}

// ─── Trader ──────────────────────────────────────────────────────────────────
export interface Trader {
  id: string;
  name: string;
  offerPrice: number; // ₹/kg
  distanceKm: number;
  rating: number;
  verified: boolean;
  transportCost: number; // ₹ total
  otherCosts: number;    // ₹ total
}

// ─── Market / Mandi ──────────────────────────────────────────────────────────
export interface MandiPrice {
  market: string;
  location: string;
  crop: string;
  date: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  arrivalQuantity: number; // quintals
  distanceKm: number;
  transportCost: number;
  otherCosts: number;
}

// ─── FPO ─────────────────────────────────────────────────────────────────────
export interface FPO {
  id: string;
  name: string;
  offerPrice: number;
  distanceKm: number;
  verified: boolean;
  transportCost: number;
  otherCosts: number;
  rating: number;
}

// ─── Buyer ───────────────────────────────────────────────────────────────────
export interface Buyer {
  id: string;
  name: string;
  offerPrice: number;
  distanceKm: number;
  verified: boolean;
  rating: number;
  crops: string[];
  minQuantityKg: number;
  maxQuantityKg: number;
  transportCost: number;
  otherCosts: number;
  offerValidUntil: string;
}

// ─── Price History & Prediction ──────────────────────────────────────────────
export interface PricePoint {
  date: string;
  price: number;
  isPrediction?: boolean;
}

export interface PricePrediction {
  crop: string;
  market: string;
  history: PricePoint[];
  predictions: PricePoint[];
  reliabilityPercent: number;
}

// ─── Decision Engine ─────────────────────────────────────────────────────────
export type SellingOptionType = 'trader' | 'mandi' | 'fpo' | 'buyer';
export type TimingOptionType = 'now' | 'wait' | 'store';

export interface NetReturnBreakdown {
  grossRevenue: number;
  transportCost: number;
  storageCost: number;
  spoilageCost: number;
  otherCosts: number;
  netReturn: number;
}

export interface SellingOption {
  type: SellingOptionType;
  label: string;
  pricePerKg: number;
  distanceKm: number;
  verified?: boolean;
  rating?: number;
  breakdown: NetReturnBreakdown;
  rank: 1 | 2 | 3 | 4;
  isBest: boolean;
}

export interface TimingOption {
  type: TimingOptionType;
  label: string;
  pricePerKg: number;
  breakdown: NetReturnBreakdown;
  isBest: boolean;
  dayLabel?: string;
}

export interface Recommendation {
  recommendedTiming: TimingOptionType;
  recommendedOption: SellingOptionType;
  expectedEarnings: number;
  differenceFromSellNow: number;
  risk: 'low' | 'medium' | 'high';
  reliabilityPercent: number;
  reasons: string[]; // i18n keys
}

// ─── Notification ────────────────────────────────────────────────────────────
export type NotificationType = 'price_update' | 'better_buyer' | 'prediction' | 'reminder' | 'decision_alert';

export interface Notification {
  id: string;
  type: NotificationType;
  titleKey: string;
  bodyKey: string;
  timestamp: string;
  read: boolean;
  route: string; // navigation target
}

// ─── Farmer ──────────────────────────────────────────────────────────────────
export interface Farmer {
  id: string;
  name: string;
  mobile: string;
  location: string;
  language: Language;
  regularTraderId?: string;
}

// ─── App State ───────────────────────────────────────────────────────────────
export interface AppState {
  farmer: Farmer;
  language: Language;
  trader: Trader | null;
  produce: ProduceInput | null;
  decision: {
    confirmed: boolean;
    timing: TimingOptionType | null;
    option: SellingOptionType | null;
    expectedEarnings: number | null;
  };
}
