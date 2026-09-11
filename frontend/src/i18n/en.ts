import type { TranslationKey } from './index';

const en: Record<TranslationKey, string> = {
  // ─── App ───────────────────────────────────────────────────────────────────
  'app.name': 'Agriverse',
  'app.tagline': 'Sell at the right place. Sell at the right time.',
  'app.tagline.sub': 'Compare your trader, nearby markets and buyers before you sell.',
  'app.demo.label': 'Demo Data — Not live market data',

  // ─── Welcome ───────────────────────────────────────────────────────────────
  'welcome.start': 'Start',
  'welcome.demo': 'Continue as Demo Farmer',
  'welcome.lang.en': 'English',
  'welcome.lang.hi': 'हिंदी',
  'welcome.lang.mr': 'मराठी',

  // ─── Navigation ────────────────────────────────────────────────────────────
  'nav.home': 'Home',
  'nav.markets': 'Markets',
  'nav.sell': 'Sell',
  'nav.buyers': 'Buyers',
  'nav.profile': 'Profile',

  // ─── Home ──────────────────────────────────────────────────────────────────
  'home.greeting': 'Good morning 👋',
  'home.location': 'Pune',
  'home.snapshot.title': "Today's Market Snapshot",
  'home.cta.sell': '🌾 Sell My Crop',
  'home.cta.markets': '📊 Market Prices',
  'home.cta.buyers': '🤝 My Traders & Buyers',
  'home.cta.decisions': '📋 My Decisions',
  'home.price.up': 'Rising',
  'home.price.down': 'Falling',
  'home.price.stable': 'Stable',

  // ─── Crops ─────────────────────────────────────────────────────────────────
  'crop.tomato': 'Tomato',
  'crop.onion': 'Onion',
  'crop.potato': 'Potato',
  'crop.wheat': 'Wheat',
  'crop.more': 'More Crops',

  // ─── Quality ───────────────────────────────────────────────────────────────
  'quality.A': 'Grade A — Premium',
  'quality.B': 'Grade B — Good',
  'quality.C': 'Grade C — Average',

  // ─── Add Produce ───────────────────────────────────────────────────────────
  'sell.title': 'What are you selling?',
  'sell.quantity': 'Quantity',
  'sell.unit': 'Unit',
  'sell.unit.kg': 'Kilogram (kg)',
  'sell.unit.quintal': 'Quintal',
  'sell.quality': 'Quality Grade',
  'sell.trader.offer': "Your trader's current offer",
  'sell.photo': '📷 Add Crop Photo',
  'sell.photo.optional': 'Optional',
  'sell.cta': 'Check My Options',

  // ─── Selling Options ───────────────────────────────────────────────────────
  'options.title': 'My Selling Options',
  'options.best': '🥇 Best expected return',
  'options.second': '🥈 Second best',
  'options.third': '🥉 Third best',
  'options.trader': 'My Regular Trader',
  'options.mandi': 'Nearby Mandi',
  'options.fpo': 'FPO',
  'options.buyer': 'Verified Buyer',
  'options.earnings': 'Expected Earnings',
  'options.gross': 'Gross Revenue',
  'options.transport': 'Transport Cost',
  'options.storage': 'Storage Cost',
  'options.spoilage': 'Spoilage Cost',
  'options.other': 'Other Costs',
  'options.verified': '✓ Verified',
  'options.view': 'View Details',

  // ─── Comparison ────────────────────────────────────────────────────────────
  'compare.title': "Let's compare your current offer.",
  'compare.your.trader': 'Your Regular Trader',
  'compare.best.alt': 'Best Alternative',
  'compare.difference': 'Difference',
  'compare.msg.better': 'Your current trader is convenient, but another option may give you a higher expected return.',
  'compare.msg.best': 'Your current trader is a good option based on expected earnings.',

  // ─── Price Prediction ──────────────────────────────────────────────────────
  'predict.title': 'Price Prediction',
  'predict.current': 'Current Price',
  'predict.tomorrow': 'Tomorrow',
  'predict.day2': 'In 2 Days',
  'predict.historical': 'Historical Prices',
  'predict.disclaimer': 'Prediction is an estimate based on recent market trends.',
  'predict.reliability': 'How reliable is this prediction?',

  // ─── Sell / Wait / Store ───────────────────────────────────────────────────
  'timing.title': 'Should you sell today?',
  'timing.now': 'Sell Now',
  'timing.wait': 'Wait 2 Days',
  'timing.store': 'Store and Sell Later',
  'timing.storage.cost': 'Storage Cost',
  'timing.spoilage': 'Expected Spoilage',
  'timing.estimate': 'Future values are estimates',

  // ─── Recommendation ────────────────────────────────────────────────────────
  'rec.title': 'Your Best Option',
  'rec.additional': 'Expected additional return',
  'rec.vs.now': 'compared with selling today',
  'rec.reliability': 'Prediction Reliability',
  'rec.risk': 'Risk',
  'rec.risk.low': 'Low',
  'rec.risk.medium': 'Medium',
  'rec.risk.high': 'High',
  'rec.disclaimer': 'Recommended based on current available data.',
  'rec.cta.options': 'See Selling Options',
  'rec.cta.now': 'Sell Today Instead',
  'rec.reason.price_rising': 'Expected market price is increasing',
  'rec.reason.storage_manageable': 'Storage cost is manageable',
  'rec.reason.low_spoilage': 'Expected spoilage is low',
  'rec.reason.higher_earnings': 'Higher expected earnings',
  'rec.reason.price_stable': 'Price is stable — selling now avoids storage risk',
  'rec.reason.buyer_offer': 'A verified buyer is offering a competitive price',

  // ─── Buyers ────────────────────────────────────────────────────────────────
  'buyers.title': 'Verified Buyers Near You',
  'buyers.required': 'Required',
  'buyers.offer': 'Offer',
  'buyers.view': 'View Offer',
  'buyers.contact': 'Contact',
  'buyers.distance': 'km away',

  // ─── Digital Offer ─────────────────────────────────────────────────────────
  'offer.title': 'Digital Offer',
  'offer.crop': 'Crop',
  'offer.quantity': 'Quantity',
  'offer.quality': 'Quality',
  'offer.price': 'Offer Price',
  'offer.valid': 'Valid until',
  'offer.earnings': 'Expected Earnings',
  'offer.accept': 'Accept Offer',
  'offer.reject': 'Reject',
  'offer.compare': 'Compare Again',
  'offer.accepted': 'Offer Accepted!',
  'offer.rejected': 'Offer Rejected',

  // ─── My Decision ───────────────────────────────────────────────────────────
  'decision.title': 'My Selling Decision',
  'decision.recommended': 'Recommended',
  'decision.buyer': 'Recommended Buyer/Market',
  'decision.earnings': 'Expected Earnings',
  'decision.status': 'Status',
  'decision.status.pending': 'Decision not yet confirmed',
  'decision.status.confirmed': 'Decision Confirmed ✓',
  'decision.confirm': 'Confirm Decision',
  'decision.change': 'Change Decision',

  // ─── Profile ───────────────────────────────────────────────────────────────
  'profile.welcome': 'Welcome, Farmer 👋',
  'profile.language': 'Language',
  'profile.my.trader': 'My Regular Trader',
  'profile.trader.msg': "Already have a trusted trader? Add them and we'll help you compare their offer.",
  'profile.add.trader': 'Add My Trader',
  'profile.add.crop': 'Add My Crop',
  'profile.edit.trader': 'Edit Trader',
  'profile.change.trader': 'Change Trader',

  // ─── Add Trader ────────────────────────────────────────────────────────────
  'trader.title': 'My Regular Trader',
  'trader.name': 'Trader Name',
  'trader.offer': 'Offer Price (₹/kg)',
  'trader.distance': 'Distance (km)',
  'trader.rating': 'Rating (optional)',
  'trader.transport': 'Transport Cost (₹)',
  'trader.other': 'Other Costs (₹)',
  'trader.save': 'Save Trader',
  'trader.cancel': 'Cancel',
  'trader.example': 'Example: Shree Traders',

  // ─── Notifications ─────────────────────────────────────────────────────────
  'notif.title': 'Notifications',
  'notif.mark.all': 'Mark all as read',
  'notif.empty': 'No new notifications',
  'notif.type.price_update': 'Price Update',
  'notif.type.better_buyer': 'Better Buyer',
  'notif.type.prediction': 'Price Prediction',
  'notif.type.reminder': 'Selling Reminder',
  'notif.type.decision_alert': 'Decision Alert',
  'notif.1.title': 'Tomato price increased',
  'notif.1.body': 'Tomato price increased to ₹30/kg at Pune APMC.',
  'notif.2.title': 'Better buyer found',
  'notif.2.body': 'FreshMart is offering ₹29/kg for your tomato.',
  'notif.3.title': 'Price may rise tomorrow',
  'notif.3.body': 'Tomato prices are predicted to increase tomorrow.',
  'notif.4.title': 'Offer expires today',
  'notif.4.body': 'Your buyer offer from FreshMart is valid until 6 PM today.',
  'notif.5.title': 'Waiting may earn more',
  'notif.5.body': 'Waiting 2 days may give a better expected return of ₹13,200.',

  // ─── Prices Page ───────────────────────────────────────────────────────────
  'prices.title': 'Market Prices',
  'prices.filter': 'Filter by crop',
  'prices.market': 'Market',
  'prices.min': 'Min',
  'prices.max': 'Max',
  'prices.modal': 'Modal',
  'prices.arrival': 'Arrival',
  'prices.date': 'Date',
  'prices.disclaimer': 'Demo Market Data — Not live Agmarknet data',

  // ─── Common ────────────────────────────────────────────────────────────────
  'common.loading': 'Loading...',
  'common.error': 'Something went wrong. Please try again.',
  'common.retry': 'Retry',
  'common.back': 'Back',
  'common.save': 'Save',
  'common.cancel': 'Cancel',
  'common.per.kg': '₹/kg',
  'common.km': 'km',
  'common.kg': 'kg',
  'common.quintal': 'quintal',
  'common.verified': 'Verified',
  'common.rating': 'Rating',
  'common.settings': 'Settings',
  'common.notifications': 'Notifications',
};

export default en;
