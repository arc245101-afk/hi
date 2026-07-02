import React from 'react';
import { Wifi, Droplets, Utensils, Sparkles, Activity, Car, Users, LucideIcon } from 'lucide-react';
import { Facility, Language } from '../types';
import { FACILITIES, TRANSLATIONS } from '../data';
import { motion } from 'motion/react';

interface FacilitiesSectionProps {
  language: Language;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Wifi: Wifi,
  Droplets: Droplets,
  Utensils: Utensils,
  Sparkles: Sparkles,
  Activity: Activity,
  Car: Car,
  Users: Users
};

export default function FacilitiesSection({ language }: FacilitiesSectionProps) {
  const t = (key: string) => TRANSLATIONS[language]?.[key] || TRANSLATIONS['en'][key] || key;

  const isRTL = language === 'ar';

  return (
    <section id="facilities-section" className="py-24 bg-luxury-100 dark:bg-luxury-900 transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Title */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] tracking-[0.3em] font-sans font-bold text-gold-500 uppercase flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Unrivaled Refinement
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-luxury-900 dark:text-luxury-100 leading-tight italic">
            {t('facilities_title')}
          </h2>
          <p className="text-sm font-sans font-light text-luxury-800/60 dark:text-luxury-200/65 max-w-xl mx-auto leading-relaxed">
            {t('facilities_subtitle')}
          </p>
        </div>

        {/* Facilities Bento-style Grid Layout */}
        <div id="facilities-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FACILITIES.map((facility, idx) => {
            const IconComponent = ICON_MAP[facility.iconName] || Wifi;
            return (
              <motion.div
                id={`facility-card-${facility.id}`}
                key={facility.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white dark:bg-luxury-900 p-8 rounded-2xl border border-gold-200/10 hover:border-gold-400 transition-all duration-500 group relative flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl luxury-shadow"
              >
                {/* Background decorative luxury circle */}
                <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-gold-500/5 group-hover:bg-gold-500/10 transition-colors duration-500" />
                
                <div className="space-y-6 relative z-10">
                  {/* Icon Shield */}
                  <div className="w-12 h-12 rounded-xl bg-gold-500/15 text-gold-500 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-white transition-all duration-500">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-lg text-luxury-900 dark:text-luxury-100 group-hover:text-gold-500 transition-colors">
                      {facility.name}
                    </h3>
                    <p className="text-xs text-luxury-800/60 dark:text-luxury-200/60 leading-relaxed font-light">
                      {facility.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 relative z-10">
                  <span className="text-[10px] font-sans font-semibold tracking-widest text-gold-600 dark:text-gold-400 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Complimentary Service
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
