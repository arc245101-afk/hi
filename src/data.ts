import { Room, Facility, Review, Offer, Attraction, BlogPost, Language } from './types';

export const ROOMS: Room[] = [
  {
    id: 'signature-suite',
    name: 'Aurelia Signature Suite',
    type: 'suite',
    price: 450,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
    description: 'A masterpiece of contemporary luxury. The Signature Suite features a grand living room, exquisite marble fireplace, a private butler service, and an expansive balcony overlooking our tranquil gardens.',
    size: '85 m²',
    view: 'Panoramic Garden & Ocean View',
    occupancy: 'Up to 3 Guests',
    rating: 4.9,
    reviewsCount: 124,
    amenities: ['Private Butler', 'Walk-in Closet', 'Espresso Atelier', 'Teak Wood Terrace', 'Bespoke Bath Amenities', 'Complimentary Champagne']
  },
  {
    id: 'presidential-villa',
    name: 'The Imperial Overwater Villa',
    type: 'villa',
    price: 950,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    description: 'Hovering gracefully above pristine turquoise waters, this palatial villa offers complete seclusion. Features an infinity-edge private plunge pool, outdoor rain shower, glass floor viewing panel, and customized wellness pavilion.',
    size: '180 m²',
    view: 'Unobstructed Open Ocean Horizon',
    occupancy: 'Up to 4 Guests',
    rating: 5.0,
    reviewsCount: 42,
    amenities: ['Private Plunge Pool', 'Infinity Deck', 'Outdoor Hot Tub', 'Private Chef Available', 'iPad Home Controls', 'Ocean-level Swim Platform']
  },
  {
    id: 'grand-deluxe',
    name: 'Grand Deluxe Horizon Room',
    type: 'room',
    price: 320,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    description: 'Sophisticated aesthetics meets supreme comfort. Our Grand Deluxe room boasts floor-to-ceiling windows, an executive writing desk crafted from French walnut, and a lavish spa bathroom with a soaking tub.',
    size: '55 m²',
    view: 'Skyline & Ocean Sunrise View',
    occupancy: '2 Guests',
    rating: 4.8,
    reviewsCount: 238,
    amenities: ['Soaking Bathtub', 'King-size Pillowtop', 'Smart Entertainment System', 'Nespresso Coffee Bar', 'Silk Bathrobes', 'Valet Pressing Service']
  },
  {
    id: 'royal-penthouse',
    name: 'The Royal Penthouse Suite',
    type: 'suite',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    description: 'Occupying the entire top tier, the Royal Penthouse represents the pinnacle of high life. Includes a private 360-degree rooftop terrace, personal fitness studio, hand-crafted cocktail lounge, and 24-hour dedicated chauffeur.',
    size: '320 m²',
    view: '360° Ocean & Mountains Panorama',
    occupancy: 'Up to 6 Guests',
    rating: 5.0,
    reviewsCount: 15,
    amenities: ['360° Rooftop Deck', 'Personal Gym & Sauna', 'Hand-crafted Wet Bar', 'Private Elevator In-Suite', 'Steinway Grand Piano', 'Chauffeur-Driven Limousine']
  }
];

export const FACILITIES: Facility[] = [
  {
    id: 'wifi',
    name: 'High-Speed Fiber Wi-Fi',
    iconName: 'Wifi',
    description: 'Seamless ultra-fast connectivity throughout the entire resort grounds and beachfront.'
  },
  {
    id: 'pool',
    name: 'Infinity Lagoon Pools',
    iconName: 'Droplets',
    description: 'Three distinct temperature-controlled saltwater pools with submerged lounges and swim-up cocktail bars.'
  },
  {
    id: 'dining',
    name: 'Michelin-Starred Dining',
    iconName: 'Utensils',
    description: 'Four culinary journeys guided by award-winning masterchefs, offering organic farm-to-table cuisine.'
  },
  {
    id: 'spa',
    name: 'Aurelia Sanctum Spa',
    iconName: 'Sparkles',
    description: 'Holistic wellness rituals, sensory sound baths, thermal hot springs, and personalized skincare clinics.'
  },
  {
    id: 'gym',
    name: 'Elite Health & Fitness Club',
    iconName: 'Activity',
    description: 'State-of-the-art cardiovascular suite, custom strength gear, personal training, and sunrise beach yoga.'
  },
  {
    id: 'parking',
    name: 'Valet & Charging Oasis',
    iconName: 'Car',
    description: 'Complimentary 24/7 white-glove valet parking and ultra-fast universal EV charging stations.'
  },
  {
    id: 'conference',
    name: 'The Grand Atelier Hall',
    iconName: 'Users',
    description: 'Bespoke conference pavilions, boardrooms, and outdoor beachfront banquet areas with peak audio-visual setups.'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Lady Alessandra Montgomery',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'An absolutely ethereal stay. The attention to detail from the second our chauffeur picked us up was divine. The Overwater Villa feels like a dream floating in pure heaven. Lady Aurelia, the concierge service, guided our dining experiences flawlessly.',
    date: 'June 18, 2026',
    roomType: 'The Imperial Overwater Villa'
  },
  {
    id: 'r2',
    name: 'Sir Charles Sterling',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'Exquisite service, breathtaking sunset views, and arguably the finest wellness spa I have visited globally. The Signature Suite layout was wonderfully thought through, and the organic farm-to-table restaurant is a culinary masterwork.',
    date: 'May 29, 2026',
    roomType: 'Aurelia Signature Suite'
  },
  {
    id: 'r3',
    name: 'Dr. Yuki Tanaka',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'Aurelia is the blueprint of luxury hospitality. Modern conveniences operate in perfect, quiet harmony with nature. Exceptionally fast Wi-Fi, incredibly comfortable premium bedding, and a peaceful ambiance that resets the soul.',
    date: 'April 14, 2026',
    roomType: 'Grand Deluxe Horizon Room'
  }
];

export const OFFERS: Offer[] = [
  {
    id: 'wellness-escape',
    title: 'Aura Sanctum Wellness Escape',
    tagline: 'Soulful Rejuvenation',
    discount: 'Save 20%',
    description: 'Immerse in a curated wellness retreat. Includes luxury suite accommodations, a private wellness consultation, daily customized organic meals, unlimited thermal spa access, and a signature 90-minute aromatherapy body massage.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    amenities: ['90-Min Massage', 'Daily Cold Press Juices', 'Unlimited Hydrotherapy', 'Sunrise Yoga Access'],
    code: 'AURAWELL'
  },
  {
    id: 'epicurean-voyage',
    title: 'The Master Chef Epicurean Voyage',
    tagline: 'Gourmet Masterpieces',
    discount: 'Complimentary Dinner',
    description: 'Designed for global gourmands. Book a minimum of 3 nights in any suite and receive a complimentary 7-course chef tasting menu with rare vintage wine pairings at our Michelin-starred restaurant, and an interactive private cooking atelier.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    amenities: ['7-Course Wine Pairing', 'Cooking Masterclass', 'Gourmet Daily Breakfast', 'Late Checkout (3 PM)'],
    code: 'EPICURE'
  },
  {
    id: 'ocean-seclusion',
    title: 'Private Overwater Seclusion',
    tagline: 'Romantic Hideaway',
    discount: 'Free 4th Night',
    description: 'Celebrate love in total serenity. Stay 4 nights in our Imperial Overwater Villa and pay only for 3. Includes private airport transit via luxury limousine, daily champagne breakfast on your terrace, and a romantic sunset catamaran tour.',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80',
    amenities: ['Limo Transfers', 'Catamaran Cruise', 'Champagne On Arrival', 'In-Villa Butler'],
    code: 'ROMANCE'
  }
];

export const ATTRACTIONS: Attraction[] = [
  {
    id: 'a1',
    name: 'The Emerald Sea Caves',
    distance: '2.5 km (15 mins by private boat)',
    category: 'nature',
    description: 'A mesmerizing marine sanctuary of natural limestone caves and bioluminescent emerald waters, ideal for customized luxury private snorkeling expeditions.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'a2',
    name: 'Monastery of St. Helena',
    distance: '6.0 km (10 mins by resort car)',
    category: 'culture',
    description: 'A serene 12th-century monument nested upon direct coastal cliffs, featuring exquisite Byzantine frescos, lush internal citrus gardens, and quiet ocean overlook walls.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'a3',
    name: 'Aurelia Marina & Yacht Club',
    distance: '1.2 km (5 mins stroll)',
    category: 'adventure',
    description: 'A prestige harbor catering to global mega-yachts. Offers exclusive high-end boutique shopping, private sailing charters, and luxury waterfront culinary terraces.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=600&q=80'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Art of Holistic Bathing and Spa Sanctuaries',
    summary: 'Discover how ancient thermal water rituals are being reimagined for modern mental clarity and physiological recovery.',
    content: 'In the rush of the modern century, true sanctuary is increasingly found in absolute stillness. Our lead practitioner at Aurelia Sanctum Spa details the deep science of hydrotherapy, explaining how specific thermal fluctuations, mineral infusions, and sensory sound baths reset the central nervous system...',
    date: 'June 25, 2026',
    author: 'Elena Rostova, Wellness Director',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    readTime: '5 min read',
    category: 'Wellness & Spa'
  },
  {
    id: 'b2',
    title: 'A Sourcing Journey: Behind Our Farm-to-Table Gastronomy',
    summary: 'Executive Chef Julian Vance takes us deep into the local organic farms and ocean currents that shape our daily menu.',
    content: 'A plate at Aurelia tells a geographic story. By partnering directly with artisan growers, micro-dairies, and sustainable fishermen within 30 miles of the resort, Chef Julian Vance translates soil and seawater into sophisticated culinary art. Learn about our native heirloom tomatoes, cold-pressed olive groves...',
    date: 'May 12, 2026',
    author: 'Chef Julian Vance',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    readTime: '7 min read',
    category: 'Culinary Philosophy'
  },
  {
    id: 'b3',
    title: 'Secluded Coastal Wonders: The Hidden Gems of Aurelia Coast',
    summary: 'Embark on a curated coastal guide to secret bays, private beaches, and historical ruins unknown to common travelers.',
    content: 'Beyond the manicured comfort of our beach bungalows lies a rugged coast of ancient historical mysteries and quiet, untouched sands. In this exclusive travelogue, we share coordinates of three secret bays that can only be reached via private boat or hidden, pine-scented mountain trails...',
    date: 'April 05, 2026',
    author: 'Antoine Moreau, Head Concierge',
    image: 'https://images.unsplash.com/photo-1473116763269-25541579ff6f?auto=format&fit=crop&w=600&q=80',
    readTime: '4 min read',
    category: 'Local Discovery'
  }
];

export const FAQS = [
  {
    q: 'What are the standard check-in and check-out times?',
    a: 'Our standard check-in is at 3:00 PM, and check-out is at 12:00 PM. Early check-in or late check-out can be requested upon booking or via our Concierge, subject to availability. Suite guests receive priority flexibility.'
  },
  {
    q: 'Is there an airport shuttle service available?',
    a: 'Yes, we provide luxury private Mercedes S-Class or Bentley airport transfers for all our guests. Villa and Royal Penthouse bookings include complimentary round-trip private limousine transit. Please contact our concierge to schedule.'
  },
  {
    q: 'Can I request organic, vegan, or gluten-free menu items?',
    a: 'Absolutely. All our culinary venues cater fully to specialized dietary requirements. Our masterchefs prepare custom menus daily, prioritizing organic, locally harvested, allergen-free, vegan, and gluten-free ingredients of absolute peak quality.'
  },
  {
    q: 'Are children and pets welcome at the Aurelia Resort?',
    a: 'Yes, we welcome families and offer elegant, secure child-friendly amenities, including a kids wellness pavilion. We also have dedicated pet-friendly suites and villas with custom bedding, pet menus, and curated beach walking guides.'
  },
  {
    q: 'Do you offer custom events, weddings, or conference bookings?',
    a: 'Yes, our dedicated events curators organize world-class beach weddings, elegant private banquets, and high-security executive retreats in our Grand Atelier Hall or coastal terraces. Please contact our corporate events office.'
  }
];

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    nav_home: 'Home',
    nav_rooms: 'Rooms & Suites',
    nav_restaurant: 'Dining',
    nav_gallery: 'Gallery',
    nav_about: 'About Us',
    nav_contact: 'Contact',
    nav_book: 'Book Now',
    nav_blog: 'Blog',
    tagline_luxury: 'Experience the Pinnacle of Luxury & Serenity',
    hero_title: 'A Sanctuary of Refined Elegance',
    hero_desc: 'Escape to a world where golden shorelines meet sophisticated design. Aurelia Luxury Hotel offers an unparalleled sensory journey with bespoke butler services, Michelin-starred gastronomy, and holistic oceanfront wellness.',
    check_in: 'Check-In Date',
    check_out: 'Check-Out Date',
    guests: 'Guests',
    select_room: 'Select Room',
    book_button: 'Search & Reserve',
    reserve_now: 'Reserve Now',
    view_details: 'View Details',
    facilities_title: 'Unrivaled Facilities & Services',
    facilities_subtitle: 'Catering to your every desire with absolute precision and warm hospitality.',
    about_title: 'The Aurelia Heritage',
    about_desc1: 'Born out of a vision to blend pristine coastal beauty with master-class architecture, Aurelia Luxury Hotel represents a timeless escape for the refined global traveler. Every corner has been curated to echo a mood of graceful peace.',
    about_desc2: 'From our hand-woven silk draperies to our customized geothermal temperature controls, we pride ourselves on invisible, ultra-personalized service that anticipates your presence and guarantees absolute peace of mind.',
    rooms_title: 'Our Palatial Rooms & Residences',
    rooms_subtitle: 'Each space represents a bespoke haven designed with hand-selected materials, rich textures, and dramatic landscape outlooks.',
    dining_title: 'Sensory Culinary Masterpieces',
    dining_subtitle: 'Four award-winning venues under the stewardship of Michelin-starred chef Julian Vance.',
    testimonials_title: 'Voices of Refinement',
    testimonials_subtitle: 'What our distinguished guests have experienced at Aurelia.',
    special_offers: 'Special Experiences & Packages',
    special_offers_sub: 'Enhance your escape with curated activities designed around luxury, dining, and wellness.',
    attractions_title: 'Local Excursions & Gems',
    attractions_subtitle: 'Step beyond our sanctuary and explore hand-picked historical monuments and natural wonders.',
    contact_title: 'Begin Your Journey',
    contact_subtitle: 'Reach out to our reservation ambassadors to craft your bespoke escape.',
    faq_title: 'Frequently Asked Questions',
    newsletter_title: 'Join The Aurelia Circle',
    newsletter_subtitle: 'Subscribe to receive private invitations, exclusive seasonal packages, and resort journals.',
    subscribe: 'Subscribe',
    rights_reserved: 'All rights reserved.'
  },
  fr: {
    nav_home: 'Accueil',
    nav_rooms: 'Chambres & Suites',
    nav_restaurant: 'Restauration',
    nav_gallery: 'Galerie',
    nav_about: 'À Propos',
    nav_contact: 'Contact',
    nav_book: 'Réserver',
    nav_blog: 'Blog',
    tagline_luxury: 'Découvrez le summum du luxe et de la sérénité',
    hero_title: 'Un Sanctuaire d’Élégance Raffinée',
    hero_desc: 'Évadez-vous dans un monde où les plages dorées rencontrent un design sophistiqué. L’Aurelia Luxury Hotel propose un voyage sensoriel inégalé avec majordomes privés, gastronomie étoilée et bien-être holistique.',
    check_in: 'Date d’Arrivée',
    check_out: 'Date de Départ',
    guests: 'Voyageurs',
    select_room: 'Sélectionner une Chambre',
    book_button: 'Rechercher & Réserver',
    reserve_now: 'Réserver Maintenant',
    view_details: 'Voir les Détails',
    facilities_title: 'Prestations & Services Inégalés',
    facilities_subtitle: 'Répondre à chacun de vos désirs avec une précision absolue et une hospitalité chaleureuse.',
    about_title: 'L’Héritage Aurelia',
    about_desc1: 'Né d’une vision visant à marier la beauté côtière sauvage à une architecture d’exception, l’Aurelia Luxury Hotel est un havre intemporel pour le voyageur esthète.',
    about_desc2: 'De nos draperies en soie tissées main à nos systèmes de climatisation géothermique sur mesure, nous offrons un service invisible et ultra-personnalisé qui garantit une tranquillité totale.',
    rooms_title: 'Nos Chambres & Résidences Palatiales',
    rooms_subtitle: 'Chaque espace est un havre de paix conçu avec des matériaux d’exception et des vues imprenables sur l’horizon.',
    dining_title: 'Chefs-d’œuvre Culinaires',
    dining_subtitle: 'Quatre adresses gastronomiques sous la direction du chef étoilé Julian Vance.',
    testimonials_title: 'Témoignages de Prestige',
    testimonials_subtitle: 'Le ressenti de nos hôtes distingués lors de leur séjour.',
    special_offers: 'Expériences & Offres Privées',
    special_offers_sub: 'Sublimez votre séjour avec nos formules thématiques axées sur le luxe et le bien-être.',
    attractions_title: 'Excursions Locales',
    attractions_subtitle: 'Explorez des monuments historiques et des sanctuaires naturels sélectionnés par nos soins.',
    contact_title: 'Commencer l’Expérience',
    contact_subtitle: 'Contactez nos ambassadeurs de réservation pour concevoir votre séjour sur mesure.',
    faq_title: 'Questions Fréquentes',
    newsletter_title: 'Rejoignez le Cercle Aurelia',
    newsletter_subtitle: 'Abonnez-vous pour recevoir nos invitations exclusives, offres de saison et carnets de voyage.',
    subscribe: 'S’abonner',
    rights_reserved: 'Tous droits réservés.'
  },
  es: {
    nav_home: 'Inicio',
    nav_rooms: 'Habitaciones',
    nav_restaurant: 'Restaurante',
    nav_gallery: 'Galería',
    nav_about: 'Nosotros',
    nav_contact: 'Contacto',
    nav_book: 'Reservar',
    nav_blog: 'Blog',
    tagline_luxury: 'Experimente la cumbre del lujo y la serenidad',
    hero_title: 'Un Santuario de Elegancia Refinada',
    hero_desc: 'Escape a un mundo donde las costas doradas se fusionan con un diseño sofisticado. Aurelia Luxury Hotel ofrece un viaje sensorial incomparable con mayordomos privados, alta cocina Michelin y bienestar frente al mar.',
    check_in: 'Fecha de Entrada',
    check_out: 'Fecha de Salida',
    guests: 'Huéspedes',
    select_room: 'Elegir Habitación',
    book_button: 'Buscar y Reservar',
    reserve_now: 'Reservar Ahora',
    view_details: 'Ver Detalles',
    facilities_title: 'Instalaciones y Servicios Incomparables',
    facilities_subtitle: 'Atendiendo todos sus deseos con absoluta precisión y una cálida hospitalidad.',
    about_title: 'El Legado Aurelia',
    about_desc1: 'Nacido del deseo de fusionar la belleza natural costera con una arquitectura magistral, Aurelia Luxury Hotel representa un escape atemporal para el viajero exigente.',
    about_desc2: 'Cuidamos cada detalle, desde cortinas de seda hechas a mano hasta controles de climatización inteligentes, proporcionando un servicio invisible y personalizado que garantiza paz mental.',
    rooms_title: 'Nuestras Habitaciones y Residencias',
    rooms_subtitle: 'Cada habitación representa un refugio de diseño exclusivo con ricas texturas e impresionantes vistas panorámicas.',
    dining_title: 'Obras Maestras Gastronómicas',
    dining_subtitle: 'Cuatro restaurantes galardonados bajo la dirección del chef estrella Michelin Julian Vance.',
    testimonials_title: 'Voces de Distinción',
    testimonials_subtitle: 'Las vivencias de nuestros distinguidos huéspedes en el resort.',
    special_offers: 'Experiencias y Paquetes Especiales',
    special_offers_sub: 'Mejore su escapada con actividades diseñadas en torno al lujo, la gastronomía y el bienestar.',
    attractions_title: 'Excursiones Locales',
    attractions_subtitle: 'Descubra los monumentos históricos y las maravillas naturales que rodean nuestro hotel.',
    contact_title: 'Inicie Su Viaje',
    contact_subtitle: 'Póngase en contacto con nuestros embajadores de reservas para planificar su estancia.',
    faq_title: 'Preguntas Frecuentes',
    newsletter_title: 'Únase al Círculo Aurelia',
    newsletter_subtitle: 'Suscríbase para recibir invitaciones privadas, paquetes de temporada y diarios del resort.',
    subscribe: 'Suscribirse',
    rights_reserved: 'Todos los derechos reservados.'
  },
  ja: {
    nav_home: 'ホーム',
    nav_rooms: '客室とスイート',
    nav_restaurant: 'お食事',
    nav_gallery: 'ギャラリー',
    nav_about: '当館について',
    nav_contact: 'お問い合わせ',
    nav_book: '今すぐ予約',
    nav_blog: 'ブログ',
    tagline_luxury: '極上の贅沢と静寂を体験する',
    hero_title: '洗練された美学が息づく聖域',
    hero_desc: '黄金の海岸線と洗練されたデザインが融合する至高の世界へ。オーレリア・ラグジュアリー・ホテルは、専属のバトラーサービス、ミシュラン星付きの美食、ホリスティックなスパで、五感を満たす比類なき旅をお届けします。',
    check_in: 'ごチェックイン日',
    check_out: 'ごチェックアウト日',
    guests: 'ご人数',
    select_room: '客室を選択',
    book_button: '空室検索と予約',
    reserve_now: '今すぐ予約',
    view_details: '詳細を見る',
    facilities_title: '至高のファシリティとサービス',
    facilities_subtitle: '行き届いた最高のおもてなしと細部へのこだわりで、すべての想いにお応えします。',
    about_title: 'オーレリアの伝統と起源',
    about_desc1: '手つかずの自然の美しさと最高峰の建築技術を融合させるビジョンから誕生したオーレリアは、本物志向の世界の旅人のための永遠の隠れ家です。',
    about_desc2: '手織りのシルクのドレープから、カスタマイズされた地熱式温度管理に至るまで、お客様のプライバシーを守り、完璧な安心をお約束するパーソナルなサービスを提供いたします。',
    rooms_title: '宮殿のような客室と邸宅',
    rooms_subtitle: '厳選された極上の素材と豊かな質感、そしてドラマチックな眺望を誇る、静寂の別世界。',
    dining_title: '五感を揺さぶる美食の芸術',
    dining_subtitle: 'ミシュランシェフ、ジュリアン・ヴァンス率いる4つの珠玉のレストラン。',
    testimonials_title: '一流のゲストからのお声',
    testimonials_subtitle: 'オーレリアで過ごした至福の時間と体験。',
    special_offers: '特別な体験と限定プラン',
    special_offers_sub: '贅沢な美食、ウェルネス、アクティビティを織り交ぜた、極上のパッケージ。',
    attractions_title: '近隣の観光・歴史名所',
    attractions_subtitle: '当リゾートの周辺に位置する、素晴らしい大自然や由緒ある文化財。',
    contact_title: '至福の旅をここから',
    contact_subtitle: 'お客様だけのカスタムプランを構築するため、当館の予約コンシェルジュへご相談ください。',
    faq_title: 'よくあるご質問',
    newsletter_title: 'オーレリア・サークルへのご招待',
    newsletter_subtitle: '会員限定イベントの特別招待、季節限定プラン、リゾートジャーナルをお届けします。',
    subscribe: '登録する',
    rights_reserved: '無断転載を禁じます。'
  },
  ar: {
    nav_home: 'الرئيسية',
    nav_rooms: 'الغرف والأجنحة',
    nav_restaurant: 'المطعم',
    nav_gallery: 'المعرض',
    nav_about: 'من نحن',
    nav_contact: 'اتصل بنا',
    nav_book: 'احجز الآن',
    nav_blog: 'المدونة',
    tagline_luxury: 'جرب ذروة الفخامة والسكينة الهادئة',
    hero_title: 'ملاذ الأناقة والرفاهية الراقية',
    hero_desc: 'اهرب إلى عالم تلتقي فيه الشواطئ الذهبية بالتصميم الراقي. يقدم فندق أوريليا خدمات كونسيرج وخادم خاص، ومأكولات فاخرة حائزة على نجمة ميشلان، وعلاجات سبا مذهلة.',
    check_in: 'تاريخ الوصول',
    check_out: 'تاريخ المغادرة',
    guests: 'الضيوف',
    select_room: 'اختر الغرفة',
    book_button: 'البحث والحجز',
    reserve_now: 'احجز الآن',
    view_details: 'عرض التفاصيل',
    facilities_title: 'مرافق وخدمات لا تضاهى',
    facilities_subtitle: 'نلبي كل تطلعاتكم بدقة متناهية وضيافة عربية دافئة وراقية.',
    about_title: 'تراث أوريليا العريق',
    about_desc1: 'وُلد من رؤية تمزج بين جمال السواحل الطبيعي والتصميم المعماري الفخم، ليكون ملاذاً خالداً للرحالة الباحثين عن التفرد.',
    about_desc2: 'من الستائر الحريرية المغزولة يدوياً إلى أنظمة التدفئة المخصصة، نفخر بتقديم خدمة مخصصة تحافظ على خصوصيتكم وتضمن لكم راحة البال المطلقة.',
    rooms_title: 'أجنحتنا وإقامتنا الفخمة',
    rooms_subtitle: 'كل مساحة تمثل ملاذاً خاصاً تم تصميمه بمواد مختارة بعناية وإطلالات ساحرة على الأفق.',
    dining_title: 'روائع الطهي الاستثنائي',
    dining_subtitle: 'أربع وجهات فاخرة تحت إشراف الطاهي العالمي الحائز على نجمة ميشلان جوليان فانس.',
    testimonials_title: 'آراء ضيوفنا المتميزين',
    testimonials_subtitle: 'تجارب حقيقية لضيوفنا الكرام في منتجع أوريليا.',
    special_offers: 'الخبرات والعروض الخاصة',
    special_offers_sub: 'عزز عطلتك بمجموعة من الأنشطة المنسقة بعناية حول الفخامة والعافية والطهي.',
    attractions_title: 'الرحلات والمعالم المحلية',
    attractions_subtitle: 'استكشف المعالم التاريخية الساحرة والعجائب الطبيعية المحيطة بالمنتجع.',
    contact_title: 'ابدأ رحلتك الفاخرة',
    contact_subtitle: 'تواصل مع سفراء الحجز لدينا لصياغة عطلتك المخصصة والفريدة.',
    faq_title: 'الأسئلة الشائعة',
    newsletter_title: 'انضم إلى دائرة أوريليا الخاصة',
    newsletter_subtitle: 'اشترك لتلقي دعوات خاصة، باقات موسمية حصرية، وأخبار المنتجع الدورية.',
    subscribe: 'اشترك الآن',
    rights_reserved: 'جميع الحقوق محفوظة.'
  }
};
