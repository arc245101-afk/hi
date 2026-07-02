import React, { useState } from 'react';
import { Camera, Eye, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface GallerySectionProps {
  language: Language;
}

interface GalleryImage {
  url: string;
  category: 'pool' | 'room' | 'dining' | 'spa';
  title: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    category: 'pool',
    title: 'The Grand Lobby Entrance'
  },
  {
    url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
    category: 'pool',
    title: 'Infinity Lagoon Sunset Pool'
  },
  {
    url: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80',
    category: 'pool',
    title: 'Overwater Bungalow Walkway'
  },
  {
    url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
    category: 'room',
    title: 'Signature Suite Living Salon'
  },
  {
    url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    category: 'room',
    title: 'Royal Penthouse Bed Chamber'
  },
  {
    url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
    category: 'dining',
    title: "L'Ambrosia Fine Dining Table"
  },
  {
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    category: 'spa',
    title: 'Aura Sanctum Hot Spring Bath'
  },
  {
    url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    category: 'dining',
    title: 'The Golden Aurelia Cocktail'
  }
];

export default function GallerySection({ language }: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'pool' | 'room' | 'dining' | 'spa'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const t = (key: string) => TRANSLATIONS[language]?.[key] || TRANSLATIONS['en'][key] || key;

  const filteredImages = GALLERY_IMAGES.filter(
    (img) => activeCategory === 'all' || img.category === activeCategory
  );

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredImages.length - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null && prev < filteredImages.length - 1 ? prev + 1 : 0));
    }
  };

  const isRTL = language === 'ar';

  return (
    <section id="gallery-section" className="py-24 bg-luxury-100 dark:bg-luxury-900 transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] tracking-[0.3em] font-sans font-bold text-gold-500 uppercase flex items-center justify-center gap-2">
            <Camera className="w-3.5 h-3.5" />
            Visual Splendor
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-luxury-900 dark:text-luxury-100 max-w-2xl mx-auto leading-tight italic">
            Our Pictorial Gallery
          </h2>
          <p className="text-sm font-sans font-light text-luxury-800/60 dark:text-luxury-200/65 max-w-2xl mx-auto leading-relaxed">
            Immerse yourself in a visual journey of Aurelia's dramatic oceanscapes, palatial interiors, and crafted dining encounters.
          </p>
        </div>

        {/* Tab Filters */}
        <div id="gallery-filters" className="flex items-center justify-center gap-3 mb-12 flex-wrap">
          {['all', 'pool', 'room', 'dining', 'spa'].map((cat) => (
            <button
              id={`gallery-filter-${cat}`}
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`font-sans text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-none border transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gold-400 text-white border-gold-400 shadow-md'
                  : 'bg-transparent text-luxury-800 dark:text-luxury-200 border-gold-200/10 hover:border-gold-400'
              }`}
            >
              {cat === 'all' ? 'All Visuals' : cat === 'pool' ? 'Resort & Pools' : `${cat}s`}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid */}
        <div id="gallery-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, idx) => (
              <motion.div
                id={`gallery-item-${idx}`}
                key={img.url}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-2xl aspect-square shadow-md hover:shadow-2xl transition-all cursor-pointer border border-gold-200/5 luxury-shadow"
                onClick={() => setLightboxIndex(idx)}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Shadow Cover and icon */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="flex items-center justify-between text-white">
                    <div className="space-y-1">
                      <p className="text-[9px] font-sans tracking-widest font-semibold uppercase text-gold-300">{img.category}</p>
                      <h4 className="font-serif font-bold text-sm">{img.title}</h4>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox full-screen overlay */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              id="gallery-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-55 flex flex-col justify-center items-center p-6 backdrop-blur-md"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Top Bar with title */}
              <div className="absolute top-4 inset-x-0 px-8 flex justify-between items-center text-white z-50">
                <div className="space-y-0.5">
                  <span className="text-[10px] tracking-widest font-sans font-bold text-gold-400 uppercase">
                    {filteredImages[lightboxIndex].category}
                  </span>
                  <h3 className="font-serif text-lg font-bold">{filteredImages[lightboxIndex].title}</h3>
                </div>
                <button
                  id="close-lightbox"
                  onClick={() => setLightboxIndex(null)}
                  className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-gold-500 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Photo Container */}
              <div className="relative max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center">
                {/* Prev Trigger */}
                <button
                  id="lightbox-prev"
                  onClick={handlePrev}
                  className="absolute left-4 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-gold-500 hover:border-gold-500 transition-colors z-50 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Big Image */}
                <motion.img
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  src={filteredImages[lightboxIndex].url}
                  alt="Aurelia Lightbox Display"
                  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                  referrerPolicy="no-referrer"
                  onClick={(e) => e.stopPropagation()}
                />

                {/* Next Trigger */}
                <button
                  id="lightbox-next"
                  onClick={handleNext}
                  className="absolute right-4 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-gold-500 hover:border-gold-500 transition-colors z-50 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Index indicator bottom */}
              <div className="absolute bottom-6 text-white/50 text-xs font-mono">
                {lightboxIndex + 1} / {filteredImages.length}
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
