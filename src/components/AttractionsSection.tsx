import { useState } from 'react';
import { Attraction, Language } from '../types';
import { ATTRACTIONS, TRANSLATIONS } from '../data';
import { Compass, MapPin, Sparkles, Navigation } from 'lucide-react';

interface AttractionsSectionProps {
  language: Language;
}

export default function AttractionsSection({ language }: AttractionsSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'nature' | 'culture' | 'adventure'>('all');
  const t = (key: string) => TRANSLATIONS[language]?.[key] || TRANSLATIONS['en'][key] || key;

  const filteredAttractions = ATTRACTIONS.filter(
    (att) => activeTab === 'all' || att.category === activeTab
  );

  const isRTL = language === 'ar';

  return (
    <section id="attractions-section" className="py-24 bg-luxury-100 dark:bg-luxury-950 transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Title */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] tracking-[0.3em] font-sans font-bold text-gold-500 uppercase flex items-center justify-center gap-2">
            <Compass className="w-3.5 h-3.5" />
            Coastal Curated Guide
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-luxury-900 dark:text-luxury-100 max-w-2xl mx-auto leading-tight italic">
            {t('attractions_title')}
          </h2>
          <p className="text-sm font-sans font-light text-luxury-800/60 dark:text-luxury-200/65 max-w-2xl mx-auto leading-relaxed">
            {t('attractions_subtitle')}
          </p>
        </div>

        {/* Tab Filters */}
        <div id="attraction-filters" className="flex items-center justify-center gap-3 mb-12 flex-wrap">
          {['all', 'nature', 'culture', 'adventure'].map((cat) => (
            <button
              id={`attraction-tab-${cat}`}
              key={cat}
              onClick={() => setActiveTab(cat as any)}
              className={`font-sans text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-none border transition-all cursor-pointer ${
                activeTab === cat
                  ? 'bg-gold-400 text-white border-gold-400 shadow-md'
                  : 'bg-transparent text-luxury-800 dark:text-luxury-200 border-gold-200/10 hover:border-gold-400'
              }`}
            >
              {cat === 'all' ? 'All Attractions' : cat}
            </button>
          ))}
        </div>

        {/* Attractions Grid List */}
        <div id="attractions-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredAttractions.map((att) => (
            <div
              id={`attraction-card-${att.id}`}
              key={att.id}
              className="bg-white dark:bg-luxury-900 border border-gold-200/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all flex flex-col group h-full luxury-shadow"
            >
              {/* Image box */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={att.image}
                  alt={att.name}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-103 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                
                {/* Float Distance Badge */}
                <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md text-white font-sans text-[10px] font-semibold tracking-wider px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5">
                  <Navigation className="w-3 h-3 text-gold-400" />
                  <span>{att.distance}</span>
                </div>
              </div>

              {/* Text Description Box */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-sans font-semibold text-gold-500 uppercase tracking-widest">{att.category}</span>
                  <h3 className="font-serif font-bold text-lg text-luxury-900 dark:text-luxury-100 group-hover:text-gold-500 transition-colors">
                    {att.name}
                  </h3>
                  <p className="text-xs text-luxury-800/60 dark:text-luxury-200/60 leading-relaxed font-light line-clamp-3">
                    {att.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gold-200/10 flex items-center gap-1.5 text-xs text-gold-500 font-medium">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>Complimentary Private Resort Shuttles Available</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
