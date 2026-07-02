import React from 'react';
import { Shield, Lock, FileText, ArrowLeft } from 'lucide-react';
import { ActivePage, Language } from '../types';

interface LegalDocsProps {
  language: Language;
  pageType: 'privacy' | 'terms';
  setActivePage: (page: ActivePage) => void;
}

export default function LegalDocs({ language, pageType, setActivePage }: LegalDocsProps) {
  const isPrivacy = pageType === 'privacy';
  const isRTL = language === 'ar';

  return (
    <section id="legal-docs-section" className="py-24 bg-luxury-100 dark:bg-luxury-950 text-luxury-900 dark:text-luxury-100 transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        
        {/* Back Link Button */}
        <div>
          <button
            id="back-to-home-btn"
            onClick={() => {
              setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold-500 hover:text-gold-600 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Resort Lobby</span>
          </button>
        </div>

        {/* Header Block */}
        <div className="space-y-4 border-b border-gold-200/20 pb-8">
          <div className="w-12 h-12 rounded-full bg-gold-500/10 text-gold-500 flex items-center justify-center">
            {isPrivacy ? <Lock className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            {isPrivacy ? 'Aurelia Resort Privacy Policy & Disclosures' : 'Aurelia Resort General Terms & Conditions'}
          </h1>
          <p className="text-[11px] font-mono text-gold-500 uppercase tracking-widest">
            Last Updated: July 2026 • Official Executive Document
          </p>
        </div>

        {/* Legal Text content with elegant markdown/bullet layout */}
        <div className="text-xs sm:text-sm font-light text-luxury-800/70 dark:text-luxury-200/70 leading-relaxed space-y-8">
          {isPrivacy ? (
            <>
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-lg text-luxury-900 dark:text-white">1. Executive Discretion & Disclosures</h3>
                <p>
                  Aurelia Luxury Peninsula Resort operates under strict protocols to secure the privacy and absolute confidentiality of all our esteemed guests, dignitaries, and visitors. Personal reservation coordinates, vehicle transfer charts, and specific dietary/wellness preferences are accessed solely by certified resort ambassadors to prepare your arrival custom configurations.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif font-bold text-lg text-luxury-900 dark:text-white">2. SSL & PCI-DSS Encrypted Data Retention</h3>
                <p>
                  All transactional information is fully processed using triple-security SSL encryption certified endpoints. We strictly retain zero permanent credit card metrics inside local servers post check-out. Credit records used during pre-authorizations are instantly expunged from the active operational pipeline within 48 hours of guest departure.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif font-bold text-lg text-luxury-900 dark:text-white">3. Discretionary Cookies & Metrics</h3>
                <p>
                  We utilize minimal state preferences and premium browser cache parameters purely to configure responsive multi-language toggles, layout sliders, and draft booking details. No metrics are shared or sold to third-party advertisers or databases.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-lg text-luxury-900 dark:text-white">1. Arrival & Check-In Mandates</h3>
                <p>
                  Dignitaries and guests are welcomed starting at 3:00 PM on the date of check-in. Early checks can be arranged in advance under butler coordination. Proper state identifiers and a matching credit instrument are requested upon physical reception to authorize discretionary incidental configurations.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif font-bold text-lg text-luxury-900 dark:text-white">2. Discretionary Incidentals & Cancellation Protocols</h3>
                <p>
                  Cancellations or changes can be accommodated without any fee penalty up to 48 hours prior to 12:00 PM of the scheduled check-in. Any cancellations within 48 hours will incur a single night stay standard room charge plus tax.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif font-bold text-lg text-luxury-900 dark:text-white">3. Resort Standards & Refined Attire</h3>
                <p>
                  To secure the refined ecosystem of Aurelia's public salons and Michelin restaurant (L'Ambrosia), formal or elegant smart-casual attire is respectfully requested. Public saltwater lagoons are supervised by certified marine lifeguards for safety.
                </p>
              </div>
            </>
          )}
        </div>

        {/* CTA */}
        <div className="pt-8 border-t border-gold-200/10 text-center">
          <p className="text-xs text-luxury-800/50 dark:text-luxury-200/50 font-light mb-4">
            If you require direct clarifications regarding our legal protocols, please contact our Guest Relations office.
          </p>
          <button
            id="legal-contact-btn"
            onClick={() => {
              setActivePage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-gold-500 hover:bg-gold-600 text-white font-sans text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded transition-all cursor-pointer shadow-md"
          >
            Contact Guest Relations
          </button>
        </div>

      </div>
    </section>
  );
}
