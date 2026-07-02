import React, { useState } from 'react';
import { FAQS, TRANSLATIONS } from '../data';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqSectionProps {
  language: string;
}

export default function FaqSection({ language }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const t = (key: string) => {
    const dict = (TRANSLATIONS as any)[language] || TRANSLATIONS['en'];
    return dict[key] || TRANSLATIONS['en'][key] || key;
  };

  const handleToggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const isRTL = language === 'ar';

  return (
    <section id="faq-section" className="py-24 bg-luxury-100 dark:bg-luxury-950 transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] tracking-[0.3em] font-sans font-bold text-gold-500 uppercase flex items-center justify-center gap-2">
            <HelpCircle className="w-4 h-4 text-gold-500" />
            Curated Wisdom
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-luxury-900 dark:text-luxury-100 leading-tight italic">
            {t('faq_title')}
          </h2>
          <p className="text-sm font-sans font-light text-luxury-800/60 dark:text-luxury-200/65 max-w-xl mx-auto leading-relaxed">
            Essential operational insights and assistance details designed to make your upcoming stay at Aurelia effortless and pristine.
          </p>
        </div>

        {/* Accordions Container */}
        <div id="faq-accordions" className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                id={`faq-item-${idx}`}
                key={idx}
                className="bg-white dark:bg-luxury-900 border border-gold-200/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all luxury-shadow"
              >
                {/* Trigger Button */}
                <button
                  id={`faq-trigger-${idx}`}
                  onClick={() => handleToggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-6 cursor-pointer text-luxury-900 dark:text-luxury-100 font-serif font-bold text-base md:text-lg group"
                >
                  <span className="group-hover:text-gold-500 transition-colors leading-snug">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full bg-gold-500/10 text-gold-500 flex items-center justify-center shrink-0 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-300 ${isOpen ? 'rotate-180 bg-gold-500 text-white' : ''}`}>
                    <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                  </div>
                </button>

                {/* Animated Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-body-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden border-t border-gold-200/5 bg-gold-500/[0.01]"
                    >
                      <div className="p-6 text-xs md:text-sm text-luxury-800/70 dark:text-luxury-200/75 leading-relaxed font-light">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Dynamic CTA Footer in FAQ */}
        <div className="mt-12 text-center bg-gold-500/5 border border-gold-200/10 rounded-2xl p-6 text-xs max-w-2xl mx-auto font-medium text-luxury-900 dark:text-luxury-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-500 shrink-0" />
            Have custom reservation requirements or executive plans?
          </span>
          <button
            id="faq-contact-btn"
            onClick={() => {
              const el = document.getElementById('contact-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-gold-500 hover:bg-gold-600 text-white font-sans text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 rounded transition-all cursor-pointer shadow-sm"
          >
            Direct Inquiry
          </button>
        </div>

      </div>
    </section>
  );
}
