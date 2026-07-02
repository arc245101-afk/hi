import React, { useState, useEffect } from 'react';
import { Calendar, Users, Sparkles, ChevronRight, Home } from 'lucide-react';
import { Language, ActivePage } from '../types';
import { TRANSLATIONS, ROOMS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface HeroProps {
  language: Language;
  setActivePage: (page: ActivePage) => void;
  setBookingDraft: (draft: { checkIn: string; checkOut: string; guests: number; roomId: string }) => void;
}

const BACKGROUND_SLIDES = [
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=80'
];

export default function Hero({ language, setActivePage, setBookingDraft }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const t = (key: string) => TRANSLATIONS[language]?.[key] || TRANSLATIONS['en'][key] || key;

  // Search Draft State
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0].id);

  // Auto-slide transition
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BACKGROUND_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingDraft({
      checkIn: checkIn || new Date().toISOString().split('T')[0],
      checkOut: checkOut || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      guests,
      roomId: selectedRoom
    });
    setActivePage('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isRTL = language === 'ar';

  return (
    <section id="hero-banner" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-16" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background Slides */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${BACKGROUND_SLIDES[currentSlide]})` }}
          />
        </AnimatePresence>
        {/* Shadow overlays */}
        <div className="absolute inset-0 bg-black/45 z-10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-luxury-100 dark:from-luxury-950 to-transparent z-15" />
      </div>

      {/* Main Hero Text Content */}
      <div id="hero-main-content" className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white mt-12 md:mt-20">
        {/* Little Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="font-sans text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-gold-400 block">
            {t('tagline_luxury')}
          </span>
        </motion.div>

        {/* Big Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight max-w-5xl mx-auto italic text-white drop-shadow-md"
        >
          {t('hero_title')}
        </motion.h1>

        {/* Short Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-sans text-xs sm:text-sm md:text-base font-light text-white/95 max-w-3xl mx-auto leading-relaxed mb-12 drop-shadow-sm"
        >
          {t('hero_desc')}
        </motion.p>
      </div>

      {/* Direct Quick Search Booking Bar */}
      <motion.div
        id="quick-booking-bar"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative z-30 w-full max-w-6xl px-6 mb-16"
      >
        <form
          onSubmit={handleSearchSubmit}
          className="bg-white dark:bg-luxury-900 shadow-2xl border border-gray-100 dark:border-luxury-800 p-6 md:p-8 flex flex-col lg:flex-row items-center gap-6 lg:gap-4 justify-between"
        >
          {/* Check-In */}
          <div className="w-full flex-1 flex flex-col gap-1.5">
            <label className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gold-400 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 shrink-0 text-gold-400" />
              {t('check_in')}
            </label>
            <input
              id="hero-check-in-input"
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-luxury-800 bg-white dark:bg-luxury-950 focus:outline-none focus:border-gold-400 font-serif text-sm text-luxury-900 dark:text-luxury-100 font-semibold tracking-wide"
            />
          </div>

          {/* Check-Out */}
          <div className="w-full flex-1 flex flex-col gap-1.5">
            <label className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gold-400 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 shrink-0 text-gold-400" />
              {t('check_out')}
            </label>
            <input
              id="hero-check-out-input"
              type="date"
              required
              min={checkIn || new Date().toISOString().split('T')[0]}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-luxury-800 bg-white dark:bg-luxury-950 focus:outline-none focus:border-gold-400 font-serif text-sm text-luxury-900 dark:text-luxury-100 font-semibold tracking-wide"
            />
          </div>

          {/* Guests */}
          <div className="w-full lg:w-44 flex flex-col gap-1.5">
            <label className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gold-400 flex items-center gap-2">
              <Users className="w-3.5 h-3.5 shrink-0 text-gold-400" />
              {t('guests')}
            </label>
            <select
              id="hero-guests-select"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 dark:border-luxury-800 bg-white dark:bg-luxury-950 focus:outline-none focus:border-gold-400 font-serif text-sm text-luxury-900 dark:text-luxury-100 font-semibold tracking-wide"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>

          {/* Room Selection */}
          <div className="w-full lg:w-64 flex flex-col gap-1.5">
            <label className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gold-400 flex items-center gap-2">
              <Home className="w-3.5 h-3.5 shrink-0 text-gold-400" />
              {t('select_room')}
            </label>
            <select
              id="hero-room-select"
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-luxury-800 bg-white dark:bg-luxury-950 focus:outline-none focus:border-gold-400 font-serif text-sm text-luxury-900 dark:text-luxury-100 font-semibold tracking-wide"
            >
              {ROOMS.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name} (${room.price}/n)
                </option>
              ))}
            </select>
          </div>

          {/* Booking Button */}
          <button
            id="hero-book-submit-btn"
            type="submit"
            className="w-full lg:w-auto self-end bg-gold-400 hover:bg-gold-500 text-white font-sans text-xs font-bold uppercase tracking-[0.25em] px-10 py-4.5 rounded-none transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer h-[50px] mt-2 lg:mt-0"
          >
            <span>{t('book_button')}</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </form>
      </motion.div>
    </section>
  );
}
