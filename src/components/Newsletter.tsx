import React, { useState } from 'react';
import { Mail, Check, Star, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface NewsletterProps {
  language: Language;
}

export default function Newsletter({ language }: NewsletterProps) {
  const t = (key: string) => TRANSLATIONS[language]?.[key] || TRANSLATIONS['en'][key] || key;
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  const isRTL = language === 'ar';

  return (
    <section id="newsletter-section" className="py-20 relative bg-luxury-950 text-white overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Decorative luxury backgrounds */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="w-[600px] h-[600px] rounded-full border-2 border-dashed border-gold-400 absolute -top-40 -left-40 animate-spin" style={{ animationDuration: '120s' }} />
        <div className="w-[600px] h-[600px] rounded-full border-2 border-dashed border-gold-400 absolute -bottom-40 -right-40" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
        
        {/* Little badge icon */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-500/10 border border-gold-400/30 rounded-none text-[9px] md:text-xs tracking-[0.3em] text-gold-300 uppercase font-bold">
          <Star className="w-3.5 h-3.5 animate-pulse" />
          <span>The Aurelia Privilege</span>
        </div>

        {/* Headlines */}
        <div className="space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight italic">
            {t('newsletter_title')}
          </h2>
          <p className="text-xs md:text-sm text-luxury-200/60 font-light max-w-xl mx-auto leading-relaxed">
            {t('newsletter_subtitle')}
          </p>
        </div>

        {/* Input box form */}
        <div className="max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-gold-500/10 border border-gold-400/30 p-5 rounded-none text-center space-y-2 py-8"
              >
                <div className="w-10 h-10 rounded-full bg-gold-500/15 text-gold-400 flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-base text-gold-400">Welcome to the Circle</h4>
                <p className="text-[11px] text-luxury-200/60 font-light leading-relaxed">
                  Your registration is complete. A complimentary invitation and seasonal journal has been dispatched to your inbox.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 w-full">
                <div className="relative w-full">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400" />
                  <input
                    id="newsletter-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for private journals..."
                    className="w-full pl-11 pr-4 py-4 rounded-none bg-white/5 border border-white/10 text-xs focus:outline-none focus:border-gold-400 focus:bg-white/10 transition-all font-light placeholder:text-white/30 text-white"
                  />
                </div>
                <button
                  id="newsletter-submit-btn"
                  type="submit"
                  className="w-full sm:w-auto bg-gold-400 hover:bg-gold-500 text-white font-sans text-xs font-bold uppercase tracking-[0.25em] px-8 py-4 rounded-none transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2 shrink-0 transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t('subscribe')}</span>
                </button>
              </form>
            )}
          </AnimatePresence>
        </div>

        {/* Small disclosure */}
        <p className="text-[10px] text-luxury-200/40 font-light max-w-xs mx-auto">
          We honor your privacy with absolute discretion. Unsubscribe safely at any time with a single click.
        </p>

      </div>
    </section>
  );
}
