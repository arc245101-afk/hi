import React from 'react';
import { Award, Compass, Star, Users, MapPin, Check } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';
import { motion } from 'motion/react';

interface AboutSectionProps {
  language: Language;
}

export default function AboutSection({ language }: AboutSectionProps) {
  const t = (key: string) => TRANSLATIONS[language]?.[key] || TRANSLATIONS['en'][key] || key;

  const isRTL = language === 'ar';

  const stats = [
    { icon: Award, label: 'Global 5-Star Awards', value: '14+' },
    { icon: Star, label: 'Michelin Star Guides', value: '4' },
    { icon: Compass, label: 'Secluded Private Beach', value: '1.5km' },
    { icon: Users, label: 'Satisfied Guests Year', value: '9k+' }
  ];

  return (
    <section id="about-section" className="py-24 bg-luxury-100 dark:bg-luxury-900 transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text Column */}
          <div id="about-text" className="space-y-8">
            <div className="space-y-3">
              <span className="text-[10px] md:text-xs tracking-[0.3em] font-sans font-bold text-gold-500 uppercase flex items-center gap-2">
                <span className="w-8 h-[1px] bg-gold-400" />
                Timeless Sanctuary
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-luxury-900 dark:text-luxury-100 leading-tight italic">
                {t('about_title')}
              </h2>
            </div>

            <p className="text-sm font-sans font-light text-luxury-800/80 dark:text-luxury-200/85 leading-relaxed">
              {t('about_desc1')}
            </p>

            <p className="text-sm font-sans font-light text-luxury-800/80 dark:text-luxury-200/85 leading-relaxed">
              {t('about_desc2')}
            </p>

            {/* Custom checkmarks to build trust */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                '24-Hour Bespoke Butler Services',
                'Private Beach Helicopter Pad',
                'Complimentary High-End Chauffeurs',
                'Carbon-Neutral Certified Resort'
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-luxury-900 dark:text-luxury-200 font-medium">
                  <div className="w-5 h-5 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            {/* Quick resort coordinate signature */}
            <div className="flex items-center gap-3 pt-4 border-t border-gold-200/20">
              <MapPin className="w-5 h-5 text-gold-400 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-luxury-900 dark:text-luxury-200">Resort Latitude & Coordinates</p>
                <p className="text-[11px] text-gold-500 font-mono">34.0522° N, 118.2437° W (Gold Coast Peninsula)</p>
              </div>
            </div>
          </div>

          {/* Right Visual Image & Stats Grid */}
          <div id="about-visual" className="relative">
            <div className="grid grid-cols-12 gap-4">
              {/* Primary elegant image */}
              <div className="col-span-8 rounded-2xl overflow-hidden shadow-2xl relative aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
                  alt="Aurelia Lobby Entrance"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white space-y-1">
                  <p className="text-[10px] tracking-[0.2em] uppercase font-sans font-semibold text-gold-400">Main Entrance</p>
                  <p className="font-serif text-lg font-bold">The Grand Lobby Hall</p>
                </div>
              </div>

              {/* Secondary offset image */}
              <div className="col-span-4 self-end space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-xl aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80"
                    alt="Aurelia Spa Ritual"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-xl aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=400&q=80"
                    alt="Aurelia Dining"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Float Stats Badge Card */}
            <div className="absolute -bottom-8 -left-6 sm:left-12 bg-white dark:bg-luxury-900 border border-gold-200/20 p-6 rounded-2xl shadow-2xl max-w-xs text-luxury-900 dark:text-luxury-100 luxury-glow">
              <h4 className="font-serif font-bold text-sm tracking-widest text-gold-500 uppercase mb-4">Aurelia Credentials</h4>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, sIdx) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={sIdx} className="space-y-1">
                      <div className="flex items-center gap-1.5 text-gold-500">
                        <IconComponent className="w-4 h-4" />
                        <span className="text-base font-serif font-bold">{stat.value}</span>
                      </div>
                      <p className="text-[9px] text-luxury-800/60 dark:text-luxury-200/60 uppercase font-medium tracking-wider">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
