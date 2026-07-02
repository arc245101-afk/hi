import React from 'react';
import { Sparkles, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { ActivePage, Language } from '../types';
import { TRANSLATIONS } from '../data';

interface FooterProps {
  language: Language;
  setActivePage: (page: ActivePage) => void;
}

export default function Footer({ language, setActivePage }: FooterProps) {
  const t = (key: string) => TRANSLATIONS[language]?.[key] || TRANSLATIONS['en'][key] || key;

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const isRTL = language === 'ar';

  return (
    <footer
      id="main-footer"
      className="bg-luxury-950 text-luxury-200 pt-20 pb-10 border-t border-gold-200/10 font-sans"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Description */}
        <div id="footer-col-brand" className="space-y-6">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="w-10 h-10 rounded-full border border-gold-400 flex items-center justify-center bg-white/5">
              <Sparkles className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-lg tracking-[0.15em] uppercase text-white">
                AURELIA<span className="text-gold-400 font-sans mx-1">•</span>ESTATES
              </h1>
              <p className="text-[9px] tracking-[0.3em] text-gold-400 uppercase -mt-1 font-semibold">Timeless Elegance</p>
            </div>
          </div>
          <p className="text-xs text-luxury-200/60 leading-relaxed font-light">
            An award-winning sanctuary designed to offer timeless tranquility, absolute visual elegance, and deeply personalized service for global travelers.
          </p>
          {/* Socials */}
          <div className="flex items-center gap-3">
            {['Instagram', 'Facebook', 'Twitter', 'Pinterest'].map((social) => (
              <a
                id={`social-${social.toLowerCase()}`}
                key={social}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full border border-gold-200/15 flex items-center justify-center text-luxury-200 hover:border-gold-400 hover:text-gold-400 transition-colors duration-300 text-xs font-light"
              >
                {social[0]}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links Navigation */}
        <div id="footer-col-nav" className="space-y-5">
          <h3 className="font-serif font-bold text-sm tracking-widest text-white uppercase">Quick Links</h3>
          <ul className="space-y-3 text-xs font-light">
            {[
              { page: 'home', labelKey: 'nav_home' },
              { page: 'rooms', labelKey: 'nav_rooms' },
              { page: 'restaurant', labelKey: 'nav_restaurant' },
              { page: 'gallery', labelKey: 'nav_gallery' },
              { page: 'about', labelKey: 'nav_about' },
              { page: 'blog', labelKey: 'nav_blog' },
              { page: 'contact', labelKey: 'nav_contact' }
            ].map((link) => (
              <li key={link.page}>
                <button
                  id={`footer-nav-${link.page}`}
                  onClick={() => handleNavClick(link.page as ActivePage)}
                  className="hover:text-gold-400 transition-colors duration-300 text-left cursor-pointer"
                >
                  {t(link.labelKey)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal & Help */}
        <div id="footer-col-legal" className="space-y-5">
          <h3 className="font-serif font-bold text-sm tracking-widest text-white uppercase">Legal & Help</h3>
          <ul className="space-y-3 text-xs font-light">
            <li>
              <button
                id="footer-nav-privacy"
                onClick={() => handleNavClick('privacy')}
                className="hover:text-gold-400 transition-colors duration-300 text-left cursor-pointer"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                id="footer-nav-terms"
                onClick={() => handleNavClick('terms')}
                className="hover:text-gold-400 transition-colors duration-300 text-left cursor-pointer"
              >
                Terms & Conditions
              </button>
            </li>
            <li>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-gold-400 transition-colors duration-300 text-left">
                Cookie Preferences
              </a>
            </li>
            <li>
              <button
                id="footer-nav-faq"
                onClick={() => handleNavClick('contact')}
                className="hover:text-gold-400 transition-colors duration-300 text-left cursor-pointer"
              >
                Resort FAQs
              </button>
            </li>
          </ul>
        </div>

        {/* Direct Address */}
        <div id="footer-col-contact" className="space-y-5">
          <h3 className="font-serif font-bold text-sm tracking-widest text-white uppercase">Reservation Office</h3>
          <ul className="space-y-4 text-xs font-light">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <span className="text-luxury-200/60 leading-relaxed">
                Aurelia Peninsula Resort, Block 12, Gold Coast Peninsula, CA 90210
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gold-400 shrink-0" />
              <span className="text-luxury-200/60">+1 (800) AURELIA</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gold-400 shrink-0" />
              <span className="text-luxury-200/60">reservations@aureliahotel.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 border-t border-gold-200/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[11px] font-light text-luxury-200/40">
          &copy; {currentYear} Aurelia Luxury Hotel & Spa. {t('rights_reserved')}
        </p>
        <button
          id="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-10 h-10 rounded border border-gold-200/10 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-colors group cursor-pointer"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
