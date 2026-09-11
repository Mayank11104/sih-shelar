import type { TranslationKey } from './index';

const hi: Record<TranslationKey, string> = {
  // ─── App ───────────────────────────────────────────────────────────────────
  'app.name': 'एग्रीवर्स',
  'app.tagline': 'सही जगह बेचें। सही समय पर बेचें।',
  'app.tagline.sub': 'बेचने से पहले अपने व्यापारी, पास के बाज़ार और खरीदारों की तुलना करें।',
  'app.demo.label': 'डेमो डेटा — लाइव बाज़ार डेटा नहीं',

  // ─── Welcome ───────────────────────────────────────────────────────────────
  'welcome.start': 'शुरू करें',
  'welcome.demo': 'डेमो किसान के रूप में जारी रखें',
  'welcome.lang.en': 'English',
  'welcome.lang.hi': 'हिंदी',
  'welcome.lang.mr': 'मराठी',

  // ─── Navigation ────────────────────────────────────────────────────────────
  'nav.home': 'होम',
  'nav.markets': 'बाज़ार',
  'nav.sell': 'बेचें',
  'nav.buyers': 'खरीदार',
  'nav.profile': 'प्रोफाइल',

  // ─── Home ──────────────────────────────────────────────────────────────────
  'home.greeting': 'शुभ प्रभात 👋',
  'home.location': 'पुणे',
  'home.snapshot.title': 'आज का बाज़ार भाव',
  'home.cta.sell': '🌾 अपनी फसल बेचें',
  'home.cta.markets': '📊 बाज़ार भाव',
  'home.cta.buyers': '🤝 मेरे व्यापारी और खरीदार',
  'home.cta.decisions': '📋 मेरे निर्णय',
  'home.price.up': 'बढ़ रहा है',
  'home.price.down': 'घट रहा है',
  'home.price.stable': 'स्थिर',

  // ─── Crops ─────────────────────────────────────────────────────────────────
  'crop.tomato': 'टमाटर',
  'crop.onion': 'प्याज़',
  'crop.potato': 'आलू',
  'crop.wheat': 'गेहूँ',
  'crop.more': 'और फसलें',

  // ─── Quality ───────────────────────────────────────────────────────────────
  'quality.A': 'ग्रेड A — प्रीमियम',
  'quality.B': 'ग्रेड B — अच्छा',
  'quality.C': 'ग्रेड C — साधारण',

  // ─── Add Produce ───────────────────────────────────────────────────────────
  'sell.title': 'आप क्या बेच रहे हैं?',
  'sell.quantity': 'मात्रा',
  'sell.unit': 'इकाई',
  'sell.unit.kg': 'किलोग्राम (kg)',
  'sell.unit.quintal': 'क्विंटल',
  'sell.quality': 'गुणवत्ता ग्रेड',
  'sell.trader.offer': 'आपके व्यापारी का वर्तमान भाव',
  'sell.photo': '📷 फसल की फ़ोटो जोड़ें',
  'sell.photo.optional': 'वैकल्पिक',
  'sell.cta': 'मेरे विकल्प देखें',

  // ─── Selling Options ───────────────────────────────────────────────────────
  'options.title': 'मेरे बिक्री विकल्प',
  'options.best': '🥇 सबसे ज़्यादा अपेक्षित कमाई',
  'options.second': '🥈 दूसरा सबसे अच्छा',
  'options.third': '🥉 तीसरा सबसे अच्छा',
  'options.trader': 'मेरा नियमित व्यापारी',
  'options.mandi': 'नज़दीकी मंडी',
  'options.fpo': 'एफपीओ',
  'options.buyer': 'सत्यापित खरीदार',
  'options.earnings': 'अपेक्षित कमाई',
  'options.gross': 'सकल आय',
  'options.transport': 'परिवहन लागत',
  'options.storage': 'भंडारण लागत',
  'options.spoilage': 'खराबी लागत',
  'options.other': 'अन्य लागत',
  'options.verified': '✓ सत्यापित',
  'options.view': 'विवरण देखें',

  // ─── Comparison ────────────────────────────────────────────────────────────
  'compare.title': 'आइए आपके वर्तमान भाव की तुलना करें।',
  'compare.your.trader': 'आपका नियमित व्यापारी',
  'compare.best.alt': 'सबसे अच्छा विकल्प',
  'compare.difference': 'अंतर',
  'compare.msg.better': 'आपका वर्तमान व्यापारी सुविधाजनक है, लेकिन किसी अन्य विकल्प से आपकी अपेक्षित कमाई अधिक हो सकती है।',
  'compare.msg.best': 'अपेक्षित कमाई के आधार पर आपका वर्तमान व्यापारी एक अच्छा विकल्प है।',

  // ─── Price Prediction ──────────────────────────────────────────────────────
  'predict.title': 'मूल्य पूर्वानुमान',
  'predict.current': 'वर्तमान मूल्य',
  'predict.tomorrow': 'कल',
  'predict.day2': '2 दिनों में',
  'predict.historical': 'ऐतिहासिक मूल्य',
  'predict.disclaimer': 'पूर्वानुमान हालिया बाज़ार रुझानों पर आधारित एक अनुमान है।',
  'predict.reliability': 'यह पूर्वानुमान कितना विश्वसनीय है?',

  // ─── Sell / Wait / Store ───────────────────────────────────────────────────
  'timing.title': 'क्या आपको आज बेचना चाहिए?',
  'timing.now': 'अभी बेचें',
  'timing.wait': '2 दिन रुकें',
  'timing.store': 'भंडारण करें और बाद में बेचें',
  'timing.storage.cost': 'भंडारण लागत',
  'timing.spoilage': 'अपेक्षित खराबी',
  'timing.estimate': 'भविष्य के मूल्य अनुमान हैं',

  // ─── Recommendation ────────────────────────────────────────────────────────
  'rec.title': 'आपका सबसे अच्छा विकल्प',
  'rec.additional': 'अपेक्षित अतिरिक्त आय',
  'rec.vs.now': 'आज बेचने की तुलना में',
  'rec.reliability': 'पूर्वानुमान विश्वसनीयता',
  'rec.risk': 'जोखिम',
  'rec.risk.low': 'कम',
  'rec.risk.medium': 'मध्यम',
  'rec.risk.high': 'अधिक',
  'rec.disclaimer': 'वर्तमान उपलब्ध डेटा के आधार पर अनुशंसित।',
  'rec.cta.options': 'बिक्री विकल्प देखें',
  'rec.cta.now': 'आज ही बेचें',
  'rec.reason.price_rising': 'बाज़ार मूल्य बढ़ने की उम्मीद है',
  'rec.reason.storage_manageable': 'भंडारण लागत उचित है',
  'rec.reason.low_spoilage': 'अपेक्षित खराबी कम है',
  'rec.reason.higher_earnings': 'अपेक्षित कमाई अधिक है',
  'rec.reason.price_stable': 'मूल्य स्थिर है — अभी बेचने से भंडारण जोखिम से बचा जा सकता है',
  'rec.reason.buyer_offer': 'एक सत्यापित खरीदार प्रतिस्पर्धी मूल्य दे रहा है',

  // ─── Buyers ────────────────────────────────────────────────────────────────
  'buyers.title': 'आपके पास के सत्यापित खरीदार',
  'buyers.required': 'आवश्यक मात्रा',
  'buyers.offer': 'भाव',
  'buyers.view': 'ऑफर देखें',
  'buyers.contact': 'संपर्क करें',
  'buyers.distance': 'km दूर',

  // ─── Digital Offer ─────────────────────────────────────────────────────────
  'offer.title': 'डिजिटल ऑफर',
  'offer.crop': 'फसल',
  'offer.quantity': 'मात्रा',
  'offer.quality': 'गुणवत्ता',
  'offer.price': 'ऑफर मूल्य',
  'offer.valid': 'वैध तिथि तक',
  'offer.earnings': 'अपेक्षित कमाई',
  'offer.accept': 'ऑफर स्वीकार करें',
  'offer.reject': 'अस्वीकार करें',
  'offer.compare': 'फिर से तुलना करें',
  'offer.accepted': 'ऑफर स्वीकृत!',
  'offer.rejected': 'ऑफर अस्वीकृत',

  // ─── My Decision ───────────────────────────────────────────────────────────
  'decision.title': 'मेरा बिक्री निर्णय',
  'decision.recommended': 'अनुशंसित',
  'decision.buyer': 'अनुशंसित खरीदार/बाज़ार',
  'decision.earnings': 'अपेक्षित कमाई',
  'decision.status': 'स्थिति',
  'decision.status.pending': 'निर्णय अभी तक पुष्टि नहीं हुई',
  'decision.status.confirmed': 'निर्णय की पुष्टि हो गई ✓',
  'decision.confirm': 'निर्णय की पुष्टि करें',
  'decision.change': 'निर्णय बदलें',

  // ─── Profile ───────────────────────────────────────────────────────────────
  'profile.welcome': 'स्वागत है, किसान भाई 👋',
  'profile.language': 'भाषा',
  'profile.my.trader': 'मेरा नियमित व्यापारी',
  'profile.trader.msg': 'क्या आपका कोई भरोसेमंद व्यापारी है? उन्हें जोड़ें और हम उनके भाव की तुलना करने में मदद करेंगे।',
  'profile.add.trader': 'मेरा व्यापारी जोड़ें',
  'profile.add.crop': 'अपनी फसल जोड़ें',
  'profile.edit.trader': 'व्यापारी संपादित करें',
  'profile.change.trader': 'व्यापारी बदलें',

  // ─── Add Trader ────────────────────────────────────────────────────────────
  'trader.title': 'मेरा नियमित व्यापारी',
  'trader.name': 'व्यापारी का नाम',
  'trader.offer': 'भाव (₹/kg)',
  'trader.distance': 'दूरी (km)',
  'trader.rating': 'रेटिंग (वैकल्पिक)',
  'trader.transport': 'परिवहन लागत (₹)',
  'trader.other': 'अन्य लागत (₹)',
  'trader.save': 'व्यापारी सहेजें',
  'trader.cancel': 'रद्द करें',
  'trader.example': 'उदाहरण: श्री ट्रेडर्स',

  // ─── Notifications ─────────────────────────────────────────────────────────
  'notif.title': 'सूचनाएँ',
  'notif.mark.all': 'सभी पढ़ी हुई के रूप में चिह्नित करें',
  'notif.empty': 'कोई नई सूचना नहीं',
  'notif.type.price_update': 'मूल्य अपडेट',
  'notif.type.better_buyer': 'बेहतर खरीदार',
  'notif.type.prediction': 'मूल्य पूर्वानुमान',
  'notif.type.reminder': 'बिक्री अनुस्मारक',
  'notif.type.decision_alert': 'निर्णय अलर्ट',
  'notif.1.title': 'टमाटर का भाव बढ़ा',
  'notif.1.body': 'पुणे APMC में टमाटर का भाव ₹30/kg हो गया।',
  'notif.2.title': 'बेहतर खरीदार मिला',
  'notif.2.body': 'FreshMart आपके टमाटर के लिए ₹29/kg दे रहा है।',
  'notif.3.title': 'भाव कल बढ़ सकता है',
  'notif.3.body': 'टमाटर का भाव कल बढ़ने का अनुमान है।',
  'notif.4.title': 'ऑफर आज समाप्त होगा',
  'notif.4.body': 'FreshMart का आपका खरीदार ऑफर आज शाम 6 बजे तक मान्य है।',
  'notif.5.title': '2 दिन रुकने से ज़्यादा मिल सकता है',
  'notif.5.body': '2 दिन रुकने से ₹13,200 की बेहतर अपेक्षित कमाई हो सकती है।',

  // ─── Prices Page ───────────────────────────────────────────────────────────
  'prices.title': 'बाज़ार भाव',
  'prices.filter': 'फसल के अनुसार फ़िल्टर करें',
  'prices.market': 'बाज़ार',
  'prices.min': 'न्यूनतम',
  'prices.max': 'अधिकतम',
  'prices.modal': 'मॉडल',
  'prices.arrival': 'आवक',
  'prices.date': 'तिथि',
  'prices.disclaimer': 'डेमो बाज़ार डेटा — लाइव Agmarknet डेटा नहीं',

  // ─── Common ────────────────────────────────────────────────────────────────
  'common.loading': 'लोड हो रहा है...',
  'common.error': 'कुछ गलत हो गया। कृपया पुनः प्रयास करें।',
  'common.retry': 'पुनः प्रयास करें',
  'common.back': 'वापस',
  'common.save': 'सहेजें',
  'common.cancel': 'रद्द करें',
  'common.per.kg': '₹/kg',
  'common.km': 'km',
  'common.kg': 'kg',
  'common.quintal': 'क्विंटल',
  'common.verified': 'सत्यापित',
  'common.rating': 'रेटिंग',
  'common.settings': 'सेटिंग्स',
  'common.notifications': 'सूचनाएँ',
};

export default hi;
