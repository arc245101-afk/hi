import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Sun, Moon, Sparkles, Phone } from 'lucide-react';
import { ActivePage, Language } from '../types';
import { TRANSLATIONS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

const LANGUAGES: { code: Language; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'ja', name: '日本語' },
  { code: 'ar', name: 'العربية' }
];

export default function Header({
  activePage,
  setActivePage,
  language,
  setLanguage,
  darkMode,
  setDarkMode
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const t = (key: string) => TRANSLATIONS[language]?.[key] || TRANSLATIONS['en'][key] || key;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { page: ActivePage; labelKey: string }[] = [
    { page: 'home', labelKey: 'nav_home' },
    { page: 'rooms', labelKey: 'nav_rooms' },
    { page: 'restaurant', labelKey: 'nav_restaurant' },
    { page: 'gallery', labelKey: 'nav_gallery' },
    { page: 'about', labelKey: 'nav_about' },
    { page: 'blog', labelKey: 'nav_blog' },
    { page: 'contact', labelKey: 'nav_contact' }
  ];

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isRTL = language === 'ar';

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-luxury-100/95 dark:bg-luxury-950/95 backdrop-blur-md border-b border-gold-200/20 py-4 shadow-lg'
          : 'bg-gradient-to-b from-black/60 to-transparent py-6 text-white'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          id="logo"
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavClick('home')}
        >
          <div className="w-10 h-10 rounded-full border border-gold-400 flex items-center justify-center bg-black/10 dark:bg-white/5 transition-transform duration-500 group-hover:rotate-180">
            <Sparkles className="w-5 h-5 text-gold-400" />
          </div>
          <div>
            <h1 className={`font-serif font-bold text-lg tracking-[0.15em] uppercase ${scrolled ? 'text-luxury-900 dark:text-luxury-100' : 'text-white'}`}>
              AURELIA<span className="text-gold-400 font-sans mx-1">•</span>ESTATES
            </h1>
            <p className="text-[9px] font-sans tracking-[0.3em] text-gold-400 uppercase -mt-1 font-semibold">
              Timeless Elegance
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              id={`nav-${item.page}`}
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className={`font-sans text-xs font-medium uppercase tracking-widest transition-colors duration-300 relative py-1 cursor-pointer ${
                activePage === item.page
                  ? 'text-gold-500'
                  : scrolled
                  ? 'text-luxury-800 dark:text-luxury-200 hover:text-gold-500'
                  : 'text-white/90 hover:text-gold-300'
              }`}
            >
              {t(item.labelKey)}
              {activePage === item.page && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gold-400"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Utility Actions */}
        <div id="header-utilities" className="hidden lg:flex items-center gap-6">
          {/* Quick contact */}
          <div className={`flex items-center gap-2 text-xs font-medium ${scrolled ? 'text-luxury-800 dark:text-luxury-200' : 'text-white/90'}`}>
            <Phone className="w-4 h-4 text-gold-400" />
            <span>+1 (800) AURELIA</span>
          </div>

          {/* Theme toggle */}
          <button
            id="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full border transition-all duration-300 cursor-pointer ${
              scrolled
                ? 'border-gold-200/30 text-luxury-800 dark:text-luxury-200 hover:bg-gold-500/10 hover:text-gold-500'
                : 'border-white/20 text-white hover:bg-white/10'
            }`}
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Language selector */}
          <div className="relative">
            <button
              id="language-selector-btn"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className={`flex items-center gap-2 text-xs font-medium uppercase tracking-widest p-2 rounded border cursor-pointer ${
                scrolled
                  ? 'border-gold-200/30 text-luxury-800 dark:text-luxury-200 hover:bg-gold-500/10'
                  : 'border-white/20 text-white hover:bg-white/10'
              }`}
            >
              <Globe className="w-4 h-4 text-gold-400" />
              <span>{language}</span>
            </button>

            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  id="language-dropdown"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 bg-luxury-100 dark:bg-luxury-900 border border-gold-200/20 rounded shadow-xl py-2 w-36 overflow-hidden z-50 text-luxury-900 dark:text-luxury-100 text-xs"
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      id={`lang-${lang.code}`}
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-gold-500/10 hover:text-gold-500 transition-colors ${
                        language === lang.code ? 'text-gold-500 font-bold bg-gold-500/5' : ''
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Direct CTA */}
          <button
            id="book-now-header"
            onClick={() => handleNavClick('book')}
            className="bg-gold-500 hover:bg-gold-600 dark:bg-gold-600 dark:hover:bg-gold-500 text-white font-sans text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5"
          >
            {t('nav_book')}
          </button>
        </div>

        {/* Mobile Controls */}
        <div id="mobile-controls" className="flex lg:hidden items-center gap-4">
          {/* Quick Language change for mobile */}
          <button
            id="mobile-lang-btn"
            onClick={() => {
              const idx = LANGUAGES.findIndex((l) => l.code === language);
              const nextLang = LANGUAGES[(idx + 1) % LANGUAGES.length].code;
              setLanguage(nextLang);
            }}
            className={`p-2 rounded border cursor-pointer ${
              scrolled ? 'border-gold-200/30 text-luxury-800 dark:text-luxury-200' : 'border-white/20 text-white'
            }`}
            title="Toggle language"
          >
            <Globe className="w-4 h-4 text-gold-400" />
          </button>

          {/* Theme change mobile */}
          <button
            id="mobile-theme-btn"
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded border cursor-pointer ${
              scrolled ? 'border-gold-200/30 text-luxury-800 dark:text-luxury-200' : 'border-white/20 text-white'
            }`}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Menu Button */}
          <button
            id="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded cursor-pointer ${
              scrolled ? 'text-luxury-800 dark:text-luxury-200' : 'text-white'
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-luxury-100 dark:bg-luxury-900 border-b border-gold-200/20 overflow-hidden w-full text-luxury-900 dark:text-luxury-100"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navItems.map((item) => (
                <button
                  id={`mobile-nav-${item.page}`}
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`text-left text-sm font-semibold uppercase tracking-widest py-2 border-b border-gold-200/10 cursor-pointer ${
                    activePage === item.page ? 'text-gold-500 pl-2' : ''
                  }`}
                >
                  {t(item.labelKey)}
                </button>
              ))}
              <button
                id="mobile-book-now"
                onClick={() => handleNavClick('book')}
                className="w-full bg-gold-500 hover:bg-gold-600 text-white text-center font-sans text-xs font-bold uppercase tracking-widest py-4 rounded transition-all mt-2 cursor-pointer shadow-md"
              >
                {t('nav_book')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
