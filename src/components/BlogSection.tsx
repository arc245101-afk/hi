import React, { useState } from 'react';
import { BlogPost, Language } from '../types';
import { BLOG_POSTS, TRANSLATIONS } from '../data';
import { Sparkles, Calendar, BookOpen, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BlogSectionProps {
  language: Language;
}

export default function BlogSection({ language }: BlogSectionProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const t = (key: string) => TRANSLATIONS[language]?.[key] || TRANSLATIONS['en'][key] || key;

  const isRTL = language === 'ar';

  return (
    <section id="blog-section" className="py-24 bg-luxury-100 dark:bg-luxury-900 transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] tracking-[0.3em] font-sans font-bold text-gold-500 uppercase flex items-center justify-center gap-2">
            <BookOpen className="w-3.5 h-3.5" />
            The Aurelia Journal
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-luxury-900 dark:text-luxury-100 max-w-2xl mx-auto leading-tight italic">
            Resort Stories & Diaries
          </h2>
          <p className="text-sm font-sans font-light text-luxury-800/60 dark:text-luxury-200/65 max-w-2xl mx-auto leading-relaxed">
            Delve into Aurelia's carefully curated lifestyle chronicles, master chef culinary insights, coastal excursions, and spa ritual reviews.
          </p>
        </div>

        {/* Blog Post Cards Grid */}
        <div id="blog-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              id={`blog-card-${post.id}`}
              key={post.id}
              className="bg-white dark:bg-luxury-900 border border-gold-200/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all flex flex-col group h-full luxury-shadow cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              {/* Image Banner */}
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-103 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                
                {/* Float Category Tag */}
                <div className="absolute bottom-4 left-4 bg-gold-500/90 text-white font-sans text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded">
                  {post.category}
                </div>
              </div>

              {/* Text Description Box */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gold-500 font-mono text-[10px] font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>By {post.author}</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-luxury-900 dark:text-luxury-100 group-hover:text-gold-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-luxury-800/60 dark:text-luxury-200/60 leading-relaxed font-light line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-gold-200/10 flex items-center gap-1.5 text-xs text-gold-500 font-semibold uppercase tracking-widest text-[10px]">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expanded Blog Modal Overlay */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              id="blog-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-55 flex items-center justify-center p-4 backdrop-blur-sm"
              onClick={() => setSelectedPost(null)}
            >
              <motion.div
                id="blog-modal-container"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                className="bg-white dark:bg-luxury-900 max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl border border-gold-200/20 text-luxury-900 dark:text-luxury-100 relative max-h-[85vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header Big Image display */}
                <div className="relative aspect-video">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white space-y-2">
                    <span className="bg-gold-500 text-white text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded">
                      {selectedPost.category}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold">{selectedPost.title}</h3>
                  </div>
                </div>

                {/* Article Content details */}
                <div className="p-8 space-y-6">
                  <div className="flex items-center gap-4 text-gold-500 font-mono text-xs border-b border-gold-200/10 pb-4">
                    <span>{selectedPost.date}</span>
                    <span>•</span>
                    <span>By {selectedPost.author}</span>
                  </div>

                  <p className="font-serif italic text-sm text-luxury-800/80 dark:text-luxury-200/85 bg-gold-500/5 p-4 rounded-xl border-l-2 border-gold-400">
                    "{selectedPost.summary}"
                  </p>

                  <div className="text-xs md:text-sm font-light text-luxury-800/70 dark:text-luxury-200/75 leading-relaxed space-y-4">
                    <p>
                      At Aurelia Luxury Peninsula Resort, we believe that travel is an art form. Every sunrise brings with it a sensory overture of crashing waves, marine breeze, and local pine fragrances. Our master architects have laid down clean horizons that perfectly frame the raw majesty of the California coastline.
                    </p>
                    <p>
                      In this chapter of the Aurelia Privilege Journal, we explored the curated rituals designed to return equilibrium to body and spirit. From dawn sound immersion baths at the Aura Sanctum Spa to signature tables prepared under the direct stewardship of Michelin chef Julian Vance, every touchpoint builds a tapestry of deep comfort and trust.
                    </p>
                    <p>
                      We invite our esteemed circle to reserve accommodations in advance to secure customized arrival preparations, tailored culinary calendars, and curated local guide excursions.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-gold-200/10 text-right">
                    <button
                      id="close-blog-btn"
                      onClick={() => setSelectedPost(null)}
                      className="bg-gold-500 hover:bg-gold-600 text-white font-sans text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded cursor-pointer"
                    >
                      Close Journal
                    </button>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
