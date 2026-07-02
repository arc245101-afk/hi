import React, { useState } from 'react';
import { Sparkles, Compass, Utensils, Award, Clock } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface DiningSectionProps {
  language: Language;
}

interface MenuItem {
  name: string;
  price: string;
  ingredients: string;
  tag?: string;
}

const MENU_CATEGORIES: Record<string, MenuItem[]> = {
  degustation: [
    {
      name: 'Pacific Bluefin Tuna Tartare',
      price: '$38',
      ingredients: 'With wild Ossetra caviar, organic cold-pressed avocado, ginger citrus infusion, and sea purslane.',
      tag: 'Chef Signature'
    },
    {
      name: 'Hand-Diver Coastal Scallops',
      price: '$45',
      ingredients: 'Pan-seared in grass-fed brown butter with sunchoke purée, sea-buckthorn reductions, and black summer truffles.',
      tag: 'Gluten-Free'
    },
    {
      name: 'A5 Miyazaki Wagyu Strip',
      price: '$110',
      ingredients: 'Grilled over premium Bincho-tan oak coals, with wild forest mushroom confit, charred spring leek, and bone marrow reduction.',
      tag: 'Rare Vintage'
    },
    {
      name: 'Aurelia Golden Hive Soufflé',
      price: '$22',
      ingredients: 'Warm grand-marnier soufflé infused with native wild lavender honey and organic vanilla bean gelato.'
    }
  ],
  cocktails: [
    {
      name: 'The Golden Aurelia',
      price: '$28',
      ingredients: 'Ultra-premium French Cognac, 24k gold leaf flakes, organic elderflower, custom wild orange bitters, and smoked rosemary.',
      tag: 'Signature'
    },
    {
      name: 'Secluded Lavender Drift',
      price: '$24',
      ingredients: 'Small-batch artisanal gin, fresh lavender sprigs from our garden, cold-pressed lemon nectar, and dry ocean-mist tonic.'
    },
    {
      name: 'Imperial Reserve Truffle Negroni',
      price: '$32',
      ingredients: 'White truffle-infused dry gin, sweet Vermouth, Campari liqueur, served over hand-carved ice sphere with burnt orange twist.',
      tag: 'Aged Cask'
    }
  ],
  breakfast: [
    {
      name: 'Imperial Caviar Benedict',
      price: '$42',
      ingredients: 'Soft-poached organic farm eggs over buttered brioche, with Scottish smoked salmon, chive hollandaise, and Siberian caviar.',
      tag: 'Most Popular'
    },
    {
      name: 'Organic Superfood Acai Atelier',
      price: '$26',
      ingredients: 'Pure Amazonian acai bowl blended with homemade almond butter, organic honey, wild local berries, and edible cornflower.',
      tag: 'Vegan'
    },
    {
      name: 'Vanilla Bean French Toast Flambé',
      price: '$30',
      ingredients: 'Thick sourdough brioche soaked in Madagascar vanilla custard, caramelized with local figs, and served with pure grade-A maple nectar.'
    }
  ]
};

export default function DiningSection({ language }: DiningSectionProps) {
  const [activeMenu, setActiveMenu] = useState<'degustation' | 'cocktails' | 'breakfast'>('degustation');
  const t = (key: string) => TRANSLATIONS[language]?.[key] || TRANSLATIONS['en'][key] || key;

  const isRTL = language === 'ar';

  return (
    <section id="dining-section" className="py-24 bg-luxury-100 dark:bg-luxury-900 transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] tracking-[0.3em] font-sans font-bold text-gold-500 uppercase flex items-center justify-center gap-2">
            <Compass className="w-3.5 h-3.5" />
            Gastronomic Masterclass
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-luxury-900 dark:text-luxury-100 max-w-2xl mx-auto leading-tight italic">
            {t('dining_title')}
          </h2>
          <p className="text-sm font-sans font-light text-luxury-800/60 dark:text-luxury-200/65 max-w-2xl mx-auto leading-relaxed">
            {t('dining_subtitle')}
          </p>
        </div>

        {/* Content Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Storytelling and Interactive Menu List */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-6 border-b border-gold-200/10 pb-4">
              {[
                { id: 'degustation', label: '7-Course Tasting' },
                { id: 'cocktails', label: 'Artisanal Cocktails' },
                { id: 'breakfast', label: 'Gourmet Breakfast' }
              ].map((menuItem) => (
                <button
                  id={`menu-tab-${menuItem.id}`}
                  key={menuItem.id}
                  onClick={() => setActiveMenu(menuItem.id as any)}
                  className={`font-sans text-[11px] md:text-xs font-semibold uppercase tracking-widest pb-3 relative cursor-pointer ${
                    activeMenu === menuItem.id
                      ? 'text-gold-500'
                      : 'text-luxury-800/60 dark:text-luxury-200/60 hover:text-gold-400'
                  }`}
                >
                  {menuItem.label}
                  {activeMenu === menuItem.id && (
                    <motion.span
                      layoutId="menuIndicator"
                      className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gold-400"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Dynamic Menu List Cards */}
            <div id="dining-menu-list" className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMenu}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {MENU_CATEGORIES[activeMenu].map((item, keyIdx) => (
                    <div
                      id={`menu-item-${keyIdx}`}
                      key={keyIdx}
                      className="group flex justify-between items-start gap-6 border-b border-dashed border-gold-200/20 pb-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-serif font-bold text-base text-luxury-900 dark:text-luxury-100 group-hover:text-gold-500 transition-colors">
                            {item.name}
                          </h4>
                          {item.tag && (
                            <span className="bg-gold-500/10 text-gold-600 dark:text-gold-400 font-sans text-[8px] font-semibold uppercase px-2 py-0.5 rounded border border-gold-500/20">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-luxury-800/60 dark:text-luxury-200/60 leading-relaxed font-light">
                          {item.ingredients}
                        </p>
                      </div>
                      <span className="font-serif font-bold text-base text-gold-500 shrink-0">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Fine Print Details */}
            <div className="grid grid-cols-2 gap-4 bg-gold-500/5 p-4 rounded-xl border border-gold-200/10 text-xs">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gold-500 shrink-0" />
                <div>
                  <p className="font-semibold text-luxury-900 dark:text-luxury-100">Dinner Service</p>
                  <p className="text-[10px] text-luxury-800/60 dark:text-luxury-200/60">6:30 PM - 10:30 PM Daily</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-4 h-4 text-gold-500 shrink-0" />
                <div>
                  <p className="font-semibold text-luxury-900 dark:text-luxury-100">Dress Attire</p>
                  <p className="text-[10px] text-luxury-800/60 dark:text-luxury-200/60">Elegant Formalwear Requested</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Beautiful Image Grid */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-2xl relative aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"
                alt="L'Ambrosia Restaurant Interior"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white space-y-1">
                <span className="text-[9px] font-sans tracking-[0.2em] font-bold uppercase text-gold-400">Michelin Guide ★★★</span>
                <h3 className="font-serif text-xl font-bold">L'Ambrosia Culinary Pavilion</h3>
                <p className="text-xs text-white/80 font-light">Under Stewardship of Masterchef Julian Vance</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
