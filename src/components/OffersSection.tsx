import React, { useState } from 'react';
import { Offer, ActivePage } from '../types';
import { OFFERS, TRANSLATIONS } from '../data';
import { Tag, Sparkles, Copy, Check, Calendar, Gift } from 'lucide-react';
import { motion } from 'motion/react';

interface OffersSectionProps {
  language: string;
  setActivePage: (page: ActivePage) => void;
  setBookingDraft: (draft: any) => void;
}

export default function OffersSection({ language, setActivePage, setBookingDraft }: OffersSectionProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const t = (key: string) => {
    const dict = (TRANSLATIONS as any)[language] || TRANSLATIONS['en'];
    return dict[key] || TRANSLATIONS['en'][key] || key;
  };

  const handleCopyCode = (e: React.MouseEvent, code: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleClaimOffer = (offer: Offer) => {
    // Map offers to room drafts
    let roomId = 'signature-suite';
    if (offer.id === 'ocean-seclusion') roomId = 'presidential-villa';
    if (offer.id === 'wellness-escape') roomId = 'grand-deluxe';

    setBookingDraft({
      roomId,
      checkIn: new Date().toISOString().split('T')[0],
      checkOut: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      guests: 2,
      promoCode: offer.code
    });
    setActivePage('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isRTL = language === 'ar';

  return (
    <section id="offers-section" className="py-24 bg-luxury-100 dark:bg-luxury-900 transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] tracking-[0.3em] font-sans font-bold text-gold-500 uppercase flex items-center justify-center gap-2">
            <Gift className="w-3.5 h-3.5" />
            Curated Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-luxury-900 dark:text-luxury-100 max-w-2xl mx-auto leading-tight italic">
            {t('special_offers')}
          </h2>
          <p className="text-sm font-sans font-light text-luxury-800/60 dark:text-luxury-200/65 max-w-2xl mx-auto leading-relaxed">
            {t('special_offers_sub')}
          </p>
        </div>

        {/* Offers Grid */}
        <div id="offers-list" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {OFFERS.map((offer, idx) => (
            <div
              id={`offer-card-${offer.id}`}
              key={offer.id}
              className="bg-white dark:bg-luxury-900 border border-gold-200/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all flex flex-col group h-full luxury-shadow"
            >
              {/* Image Banner */}
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-103 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                
                {/* Float Discount Flag */}
                <div className="absolute top-4 left-4 bg-gold-500 text-white font-sans text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-gold-400">
                  <Tag className="w-3 h-3" />
                  <span>{offer.discount}</span>
                </div>
              </div>

              {/* Offer Text Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-sans font-semibold text-gold-500 uppercase tracking-widest">{offer.tagline}</p>
                    <h3 className="font-serif font-bold text-lg text-luxury-900 dark:text-luxury-100 group-hover:text-gold-500 transition-colors">
                      {offer.title}
                    </h3>
                  </div>

                  <p className="text-xs text-luxury-800/60 dark:text-luxury-200/60 leading-relaxed font-light">
                    {offer.description}
                  </p>

                  {/* Amenities Checklist tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {offer.amenities.map((tag, keyIdx) => (
                      <span
                        key={keyIdx}
                        className="bg-gold-500/5 text-gold-600 dark:text-gold-400 font-sans text-[9px] font-semibold uppercase px-2.5 py-1 rounded border border-gold-500/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Promo Codes & Reserve CTAs */}
                <div className="space-y-4 pt-4 border-t border-gold-200/10">
                  {/* Promo Copy Box */}
                  <div className="flex items-center justify-between bg-luxury-100 dark:bg-luxury-950 p-3 rounded-lg border border-gold-200/10 text-xs">
                    <span className="font-mono text-gold-600 dark:text-gold-400 font-bold tracking-wider">{offer.code}</span>
                    <button
                      id={`copy-code-${offer.id}`}
                      onClick={(e) => handleCopyCode(e, offer.code)}
                      className="text-gold-500 hover:text-gold-600 flex items-center gap-1 cursor-pointer font-semibold uppercase text-[9px]"
                    >
                      {copiedCode === offer.code ? (
                        <>
                          <Check className="w-3 h-3 text-green-500" />
                          <span className="text-green-500">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    id={`claim-offer-${offer.id}`}
                    onClick={() => handleClaimOffer(offer)}
                    className="w-full bg-gold-500 hover:bg-gold-600 text-white font-sans text-[11px] font-semibold uppercase tracking-widest py-3 rounded transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Claim Experience Offer</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
