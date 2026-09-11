import type { TranslationKey } from './index';

const mr: Record<TranslationKey, string> = {
  // ─── App ───────────────────────────────────────────────────────────────────
  'app.name': 'अॅग्रीव्हर्स',
  'app.tagline': 'योग्य ठिकाणी विका. योग्य वेळी विका.',
  'app.tagline.sub': 'विकण्यापूर्वी तुमचा व्यापारी, जवळचे बाजार आणि खरेदीदारांची तुलना करा.',
  'app.demo.label': 'डेमो डेटा — थेट बाजार डेटा नाही',

  // ─── Welcome ───────────────────────────────────────────────────────────────
  'welcome.start': 'सुरू करा',
  'welcome.demo': 'डेमो शेतकरी म्हणून सुरू ठेवा',
  'welcome.lang.en': 'English',
  'welcome.lang.hi': 'हिंदी',
  'welcome.lang.mr': 'मराठी',

  // ─── Navigation ────────────────────────────────────────────────────────────
  'nav.home': 'मुख्यपृष्ठ',
  'nav.markets': 'बाजार',
  'nav.sell': 'विका',
  'nav.buyers': 'खरेदीदार',
  'nav.profile': 'प्रोफाइल',

  // ─── Home ──────────────────────────────────────────────────────────────────
  'home.greeting': 'शुभ सकाळ 👋',
  'home.location': 'पुणे',
  'home.snapshot.title': 'आजचे बाजारभाव',
  'home.cta.sell': '🌾 माझी शेतमाल विका',
  'home.cta.markets': '📊 बाजारभाव',
  'home.cta.buyers': '🤝 माझे व्यापारी आणि खरेदीदार',
  'home.cta.decisions': '📋 माझे निर्णय',
  'home.price.up': 'वाढत आहे',
  'home.price.down': 'घसरत आहे',
  'home.price.stable': 'स्थिर',

  // ─── Crops ─────────────────────────────────────────────────────────────────
  'crop.tomato': 'टोमॅटो',
  'crop.onion': 'कांदा',
  'crop.potato': 'बटाटा',
  'crop.wheat': 'गहू',
  'crop.more': 'अधिक पिके',

  // ─── Quality ───────────────────────────────────────────────────────────────
  'quality.A': 'ग्रेड A — उत्कृष्ट',
  'quality.B': 'ग्रेड B — चांगला',
  'quality.C': 'ग्रेड C — साधारण',

  // ─── Add Produce ───────────────────────────────────────────────────────────
  'sell.title': 'तुम्ही काय विकत आहात?',
  'sell.quantity': 'प्रमाण',
  'sell.unit': 'एकक',
  'sell.unit.kg': 'किलोग्राम (kg)',
  'sell.unit.quintal': 'क्विंटल',
  'sell.quality': 'दर्जा ग्रेड',
  'sell.trader.offer': 'तुमच्या व्यापाऱ्याचा सध्याचा भाव',
  'sell.photo': '📷 पिकाचा फोटो जोडा',
  'sell.photo.optional': 'ऐच्छिक',
  'sell.cta': 'माझे पर्याय तपासा',

  // ─── Selling Options ───────────────────────────────────────────────────────
  'options.title': 'माझे विक्री पर्याय',
  'options.best': '🥇 सर्वोत्तम अपेक्षित उत्पन्न',
  'options.second': '🥈 दुसरा सर्वोत्तम',
  'options.third': '🥉 तिसरा सर्वोत्तम',
  'options.trader': 'माझा नियमित व्यापारी',
  'options.mandi': 'जवळची मंडी',
  'options.fpo': 'एफपीओ',
  'options.buyer': 'प्रमाणित खरेदीदार',
  'options.earnings': 'अपेक्षित उत्पन्न',
  'options.gross': 'एकूण उत्पन्न',
  'options.transport': 'वाहतूक खर्च',
  'options.storage': 'साठवणूक खर्च',
  'options.spoilage': 'नासाडी खर्च',
  'options.other': 'इतर खर्च',
  'options.verified': '✓ प्रमाणित',
  'options.view': 'तपशील पाहा',

  // ─── Comparison ────────────────────────────────────────────────────────────
  'compare.title': 'चला तुमच्या सध्याच्या भावाची तुलना करूया.',
  'compare.your.trader': 'तुमचा नियमित व्यापारी',
  'compare.best.alt': 'सर्वोत्तम पर्याय',
  'compare.difference': 'फरक',
  'compare.msg.better': 'तुमचा सध्याचा व्यापारी सोयीचा आहे, परंतु दुसऱ्या पर्यायातून तुमचे अपेक्षित उत्पन्न जास्त असू शकते.',
  'compare.msg.best': 'अपेक्षित उत्पन्नाच्या आधारे तुमचा सध्याचा व्यापारी एक चांगला पर्याय आहे.',

  // ─── Price Prediction ──────────────────────────────────────────────────────
  'predict.title': 'किंमत अंदाज',
  'predict.current': 'सध्याची किंमत',
  'predict.tomorrow': 'उद्या',
  'predict.day2': '२ दिवसांत',
  'predict.historical': 'ऐतिहासिक भाव',
  'predict.disclaimer': 'अंदाज हे अलीकडील बाजार ट्रेंडवर आधारित आहे.',
  'predict.reliability': 'हा अंदाज किती विश्वासार्ह आहे?',

  // ─── Sell / Wait / Store ───────────────────────────────────────────────────
  'timing.title': 'तुम्ही आज विकावे का?',
  'timing.now': 'आत्ता विका',
  'timing.wait': '२ दिवस थांबा',
  'timing.store': 'साठवणूक करा आणि नंतर विका',
  'timing.storage.cost': 'साठवणूक खर्च',
  'timing.spoilage': 'अपेक्षित नासाडी',
  'timing.estimate': 'भविष्यातील मूल्ये अंदाज आहेत',

  // ─── Recommendation ────────────────────────────────────────────────────────
  'rec.title': 'तुमचा सर्वोत्तम पर्याय',
  'rec.additional': 'अपेक्षित अतिरिक्त उत्पन्न',
  'rec.vs.now': 'आज विकण्याच्या तुलनेत',
  'rec.reliability': 'अंदाज विश्वासार्हता',
  'rec.risk': 'धोका',
  'rec.risk.low': 'कमी',
  'rec.risk.medium': 'मध्यम',
  'rec.risk.high': 'जास्त',
  'rec.disclaimer': 'सध्या उपलब्ध डेटाच्या आधारे शिफारस केलेले.',
  'rec.cta.options': 'विक्री पर्याय पाहा',
  'rec.cta.now': 'आज विका',
  'rec.reason.price_rising': 'बाजारभाव वाढण्याची अपेक्षा आहे',
  'rec.reason.storage_manageable': 'साठवणूक खर्च परवडण्याजोगा आहे',
  'rec.reason.low_spoilage': 'अपेक्षित नासाडी कमी आहे',
  'rec.reason.higher_earnings': 'अपेक्षित उत्पन्न जास्त आहे',
  'rec.reason.price_stable': 'भाव स्थिर आहे — आत्ता विकल्यास साठवणूक धोका टाळता येतो',
  'rec.reason.buyer_offer': 'एक प्रमाणित खरेदीदार स्पर्धात्मक भाव देत आहे',

  // ─── Buyers ────────────────────────────────────────────────────────────────
  'buyers.title': 'तुमच्या जवळचे प्रमाणित खरेदीदार',
  'buyers.required': 'आवश्यक प्रमाण',
  'buyers.offer': 'भाव',
  'buyers.view': 'ऑफर पाहा',
  'buyers.contact': 'संपर्क करा',
  'buyers.distance': 'km दूर',

  // ─── Digital Offer ─────────────────────────────────────────────────────────
  'offer.title': 'डिजिटल ऑफर',
  'offer.crop': 'पीक',
  'offer.quantity': 'प्रमाण',
  'offer.quality': 'दर्जा',
  'offer.price': 'ऑफर भाव',
  'offer.valid': 'वैध तारखेपर्यंत',
  'offer.earnings': 'अपेक्षित उत्पन्न',
  'offer.accept': 'ऑफर स्वीकारा',
  'offer.reject': 'नाकारा',
  'offer.compare': 'पुन्हा तुलना करा',
  'offer.accepted': 'ऑफर स्वीकारले!',
  'offer.rejected': 'ऑफर नाकारले',

  // ─── My Decision ───────────────────────────────────────────────────────────
  'decision.title': 'माझा विक्री निर्णय',
  'decision.recommended': 'शिफारस केलेले',
  'decision.buyer': 'शिफारस केलेला खरेदीदार/बाजार',
  'decision.earnings': 'अपेक्षित उत्पन्न',
  'decision.status': 'स्थिती',
  'decision.status.pending': 'निर्णय अद्याप पुष्टी केलेला नाही',
  'decision.status.confirmed': 'निर्णय पुष्टी झाला ✓',
  'decision.confirm': 'निर्णय पुष्टी करा',
  'decision.change': 'निर्णय बदला',

  // ─── Profile ───────────────────────────────────────────────────────────────
  'profile.welcome': 'स्वागत आहे, शेतकरी 👋',
  'profile.language': 'भाषा',
  'profile.my.trader': 'माझा नियमित व्यापारी',
  'profile.trader.msg': 'तुमचा एखादा विश्वासू व्यापारी आहे का? त्यांना जोडा आणि आम्ही त्यांच्या भावाची तुलना करण्यात मदत करू.',
  'profile.add.trader': 'माझा व्यापारी जोडा',
  'profile.add.crop': 'माझे पीक जोडा',
  'profile.edit.trader': 'व्यापारी संपादित करा',
  'profile.change.trader': 'व्यापारी बदला',

  // ─── Add Trader ────────────────────────────────────────────────────────────
  'trader.title': 'माझा नियमित व्यापारी',
  'trader.name': 'व्यापाऱ्याचे नाव',
  'trader.offer': 'भाव (₹/kg)',
  'trader.distance': 'अंतर (km)',
  'trader.rating': 'रेटिंग (ऐच्छिक)',
  'trader.transport': 'वाहतूक खर्च (₹)',
  'trader.other': 'इतर खर्च (₹)',
  'trader.save': 'व्यापारी जतन करा',
  'trader.cancel': 'रद्द करा',
  'trader.example': 'उदाहरण: श्री ट्रेडर्स',

  // ─── Notifications ─────────────────────────────────────────────────────────
  'notif.title': 'सूचना',
  'notif.mark.all': 'सर्व वाचलेले म्हणून चिन्हांकित करा',
  'notif.empty': 'नवीन सूचना नाहीत',
  'notif.type.price_update': 'भाव अपडेट',
  'notif.type.better_buyer': 'चांगला खरेदीदार',
  'notif.type.prediction': 'किंमत अंदाज',
  'notif.type.reminder': 'विक्री स्मरणपत्र',
  'notif.type.decision_alert': 'निर्णय सूचना',
  'notif.1.title': 'टोमॅटोचा भाव वाढला',
  'notif.1.body': 'पुणे APMC मध्ये टोमॅटोचा भाव ₹30/kg झाला.',
  'notif.2.title': 'चांगला खरेदीदार सापडला',
  'notif.2.body': 'FreshMart तुमच्या टोमॅटोसाठी ₹29/kg देत आहे.',
  'notif.3.title': 'भाव उद्या वाढू शकतो',
  'notif.3.body': 'टोमॅटोचा भाव उद्या वाढण्याचा अंदाज आहे.',
  'notif.4.title': 'ऑफर आज संपेल',
  'notif.4.body': 'FreshMart चा तुमचा खरेदीदार ऑफर आज संध्याकाळी ६ वाजेपर्यंत वैध आहे.',
  'notif.5.title': '२ दिवस थांबल्यास जास्त मिळू शकते',
  'notif.5.body': '२ दिवस थांबल्यास ₹13,200 चे चांगले अपेक्षित उत्पन्न मिळू शकते.',

  // ─── Prices Page ───────────────────────────────────────────────────────────
  'prices.title': 'बाजारभाव',
  'prices.filter': 'पिकानुसार फिल्टर करा',
  'prices.market': 'बाजार',
  'prices.min': 'किमान',
  'prices.max': 'कमाल',
  'prices.modal': 'मोडल',
  'prices.arrival': 'आवक',
  'prices.date': 'तारीख',
  'prices.disclaimer': 'डेमो बाजार डेटा — थेट Agmarknet डेटा नाही',

  // ─── Common ────────────────────────────────────────────────────────────────
  'common.loading': 'लोड होत आहे...',
  'common.error': 'काहीतरी चुकले. कृपया पुन्हा प्रयत्न करा.',
  'common.retry': 'पुन्हा प्रयत्न करा',
  'common.back': 'मागे',
  'common.save': 'जतन करा',
  'common.cancel': 'रद्द करा',
  'common.per.kg': '₹/kg',
  'common.km': 'km',
  'common.kg': 'kg',
  'common.quintal': 'क्विंटल',
  'common.verified': 'प्रमाणित',
  'common.rating': 'रेटिंग',
  'common.settings': 'सेटिंग्ज',
  'common.notifications': 'सूचना',
};

export default mr;
