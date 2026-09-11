import type { Crop, Trader, Buyer, FPO, MandiPrice, PricePrediction, Notification } from '../types';

// ─── Demo Crops ───────────────────────────────────────────────────────────────
export const CROPS: Crop[] = [
  { id: 'tomato', nameKey: 'crop.tomato', emoji: '🍅', unit: 'kg' },
  { id: 'onion',  nameKey: 'crop.onion',  emoji: '🧅', unit: 'kg' },
  { id: 'potato', nameKey: 'crop.potato', emoji: '🥔', unit: 'kg' },
  { id: 'wheat',  nameKey: 'crop.wheat',  emoji: '🌾', unit: 'quintal' },
];

// ─── Demo Farmer ──────────────────────────────────────────────────────────────
export const DEMO_FARMER = {
  id: 'farmer-1',
  name: 'Ramesh Patil',
  mobile: '9876543210',
  location: 'Pune',
  language: 'en' as const,
};

// ─── Demo Trader ─────────────────────────────────────────────────────────────
export const DEMO_TRADER: Trader = {
  id: 'trader-1',
  name: 'Shree Traders',
  offerPrice: 25,
  distanceKm: 12,
  rating: 4.5,
  verified: true,
  transportCost: 300,
  otherCosts: 400,
};

// ─── Demo Mandi ───────────────────────────────────────────────────────────────
export const DEMO_MANDI = {
  id: 'mandi-1',
  name: 'Pune APMC',
  offerPrice: 28,
  distanceKm: 35,
  transportCost: 700,
  otherCosts: 200,
  verified: true,
  rating: 4.2,
};

// ─── Demo FPO ────────────────────────────────────────────────────────────────
export const DEMO_FPO: FPO = {
  id: 'fpo-1',
  name: 'Pune Farmer Producer Organization',
  offerPrice: 27,
  distanceKm: 20,
  verified: true,
  transportCost: 400,
  otherCosts: 100,
  rating: 4.4,
};

// ─── Demo Buyers ─────────────────────────────────────────────────────────────
export const BUYERS: Buyer[] = [
  {
    id: 'buyer-1',
    name: 'FreshMart Procurement',
    offerPrice: 29,
    distanceKm: 18,
    verified: true,
    rating: 4.6,
    crops: ['tomato', 'onion'],
    minQuantityKg: 300,
    maxQuantityKg: 1000,
    transportCost: 360,
    otherCosts: 140,
    offerValidUntil: 'Today, 6 PM',
  },
  {
    id: 'buyer-2',
    name: 'Agro FPO Direct',
    offerPrice: 28,
    distanceKm: 20,
    verified: true,
    rating: 4.3,
    crops: ['tomato', 'potato', 'onion'],
    minQuantityKg: 500,
    maxQuantityKg: 2000,
    transportCost: 400,
    otherCosts: 100,
    offerValidUntil: 'Tomorrow, 5 PM',
  },
  {
    id: 'buyer-3',
    name: 'Kisan Direct Markets',
    offerPrice: 27,
    distanceKm: 25,
    verified: false,
    rating: 3.9,
    crops: ['tomato', 'onion'],
    minQuantityKg: 200,
    maxQuantityKg: 800,
    transportCost: 500,
    otherCosts: 150,
    offerValidUntil: 'Day after tomorrow',
  },
];

// ─── Demo Market Prices (Mandi Data) ─────────────────────────────────────────
export const MANDI_PRICES: MandiPrice[] = [
  { market: 'Pune APMC',     location: 'Pune',       crop: 'tomato', date: '2026-09-12', minPrice: 24, maxPrice: 32, modalPrice: 28, arrivalQuantity: 1200, distanceKm: 35, transportCost: 700, otherCosts: 200 },
  { market: 'Nashik APMC',   location: 'Nashik',     crop: 'tomato', date: '2026-09-12', minPrice: 22, maxPrice: 30, modalPrice: 26, arrivalQuantity: 980,  distanceKm: 75, transportCost: 1400, otherCosts: 300 },
  { market: 'Mumbai APMC',   location: 'Mumbai',     crop: 'tomato', date: '2026-09-12', minPrice: 26, maxPrice: 34, modalPrice: 30, arrivalQuantity: 2100, distanceKm: 150, transportCost: 2800, otherCosts: 500 },
  { market: 'Solapur APMC',  location: 'Solapur',   crop: 'tomato', date: '2026-09-12', minPrice: 20, maxPrice: 28, modalPrice: 24, arrivalQuantity: 650,  distanceKm: 120, transportCost: 2200, otherCosts: 350 },
  { market: 'Pune APMC',     location: 'Pune',       crop: 'onion',  date: '2026-09-12', minPrice: 18, maxPrice: 26, modalPrice: 22, arrivalQuantity: 800,  distanceKm: 35, transportCost: 700, otherCosts: 200 },
  { market: 'Lasalgaon APMC',location: 'Nashik',     crop: 'onion',  date: '2026-09-12', minPrice: 16, maxPrice: 24, modalPrice: 20, arrivalQuantity: 3200, distanceKm: 85, transportCost: 1600, otherCosts: 350 },
  { market: 'Pune APMC',     location: 'Pune',       crop: 'potato', date: '2026-09-12', minPrice: 16, maxPrice: 24, modalPrice: 20, arrivalQuantity: 600,  distanceKm: 35, transportCost: 700, otherCosts: 200 },
  { market: 'Pune APMC',     location: 'Pune',       crop: 'wheat',  date: '2026-09-12', minPrice: 22, maxPrice: 28, modalPrice: 25, arrivalQuantity: 450,  distanceKm: 35, transportCost: 700, otherCosts: 200 },
];

// ─── Price Prediction (Deterministic — same every load) ──────────────────────
export const TOMATO_PREDICTION: PricePrediction = {
  crop: 'tomato',
  market: 'Pune APMC',
  history: [
    { date: 'Sep 5',  price: 25 },
    { date: 'Sep 6',  price: 26 },
    { date: 'Sep 7',  price: 27 },
    { date: 'Sep 8',  price: 27 },
    { date: 'Sep 9',  price: 28 },
    { date: 'Today',  price: 28 },
  ],
  predictions: [
    { date: 'Tomorrow', price: 29, isPrediction: true },
    { date: 'Day 2',    price: 31, isPrediction: true },
  ],
  reliabilityPercent: 78,
};

// ─── Demo Notifications (Fixed — never randomized) ────────────────────────────
export const NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'price_update',
    titleKey: 'notif.1.title',
    bodyKey: 'notif.1.body',
    timestamp: '2026-09-12T06:00:00',
    read: false,
    route: '/prices',
  },
  {
    id: 'n2',
    type: 'better_buyer',
    titleKey: 'notif.2.title',
    bodyKey: 'notif.2.body',
    timestamp: '2026-09-12T06:30:00',
    read: false,
    route: '/buyers',
  },
  {
    id: 'n3',
    type: 'prediction',
    titleKey: 'notif.3.title',
    bodyKey: 'notif.3.body',
    timestamp: '2026-09-12T07:00:00',
    read: false,
    route: '/sell/prediction',
  },
  {
    id: 'n4',
    type: 'reminder',
    titleKey: 'notif.4.title',
    bodyKey: 'notif.4.body',
    timestamp: '2026-09-12T08:00:00',
    read: false,
    route: '/buyers/offer/buyer-1',
  },
  {
    id: 'n5',
    type: 'decision_alert',
    titleKey: 'notif.5.title',
    bodyKey: 'notif.5.body',
    timestamp: '2026-09-12T08:30:00',
    read: false,
    route: '/sell/recommendation',
  },
];

// ─── Home Snapshot Data ───────────────────────────────────────────────────────
export const HOME_SNAPSHOT = [
  { cropKey: 'crop.tomato', emoji: '🍅', price: 28, trend: 'up'     as const },
  { cropKey: 'crop.onion',  emoji: '🧅', price: 22, trend: 'stable' as const },
  { cropKey: 'crop.potato', emoji: '🥔', price: 20, trend: 'down'   as const },
];
