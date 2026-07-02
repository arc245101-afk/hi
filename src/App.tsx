import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import RoomsSection from './components/RoomsSection';
import FacilitiesSection from './components/FacilitiesSection';
import DiningSection from './components/DiningSection';
import GallerySection from './components/GallerySection';
import OffersSection from './components/OffersSection';
import AttractionsSection from './components/AttractionsSection';
import ContactSection from './components/ContactSection';
import FaqSection from './components/FaqSection';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import LiveChat from './components/LiveChat';
import BookingSystem from './components/BookingSystem';
import BlogSection from './components/BlogSection';
import LegalDocs from './components/LegalDocs';
import { ActivePage, Language } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [bookingDraft, setBookingDraft] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    roomId: '',
    promoCode: ''
  });

  // Dark Mode side effects
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const isRTL = language === 'ar';

  return (
    <div className="min-h-screen bg-luxury-100 dark:bg-luxury-950 text-luxury-900 dark:text-luxury-100 transition-colors duration-500 flex flex-col font-sans" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Sticky Header */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Pages Switcher Content Container with AnimatePresence */}
      <main className="flex-1 pt-0">
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero Banner Slider with search */}
              <Hero
                language={language}
                setBookingDraft={setBookingDraft}
                setActivePage={setActivePage}
              />
              
              {/* About Our Hotel */}
              <AboutSection language={language} />

              {/* Luxury Rooms & Suites Selection */}
              <RoomsSection
                language={language}
                setActivePage={setActivePage}
                setBookingDraft={setBookingDraft}
              />

              {/* Hotel Facilities Grid */}
              <FacilitiesSection language={language} />

              {/* Michelin Dining Restaurant Showcase */}
              <DiningSection language={language} />

              {/* Photo Lightbox Gallery */}
              <GallerySection language={language} />

              {/* Special Offers Packages */}
              <OffersSection
                language={language}
                setActivePage={setActivePage}
                setBookingDraft={setBookingDraft}
              />

              {/* Local Curated Attractions */}
              <AttractionsSection language={language} />

              {/* Contact Inquiry & Transit Map simulation */}
              <ContactSection language={language} />

              {/* FAQ Accordion list */}
              <FaqSection language={language} />

              {/* Newsletter subscription panel */}
              <Newsletter language={language} />
            </motion.div>
          )}

          {activePage === 'rooms' && (
            <motion.div
              key="rooms-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="pt-20"
            >
              <RoomsSection
                language={language}
                setActivePage={setActivePage}
                setBookingDraft={setBookingDraft}
              />
            </motion.div>
          )}

          {activePage === 'restaurant' && (
            <motion.div
              key="restaurant-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="pt-20"
            >
              <DiningSection language={language} />
            </motion.div>
          )}

          {activePage === 'gallery' && (
            <motion.div
              key="gallery-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="pt-20"
            >
              <GallerySection language={language} />
            </motion.div>
          )}

          {activePage === 'about' && (
            <motion.div
              key="about-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="pt-20"
            >
              <AboutSection language={language} />
            </motion.div>
          )}

          {activePage === 'blog' && (
            <motion.div
              key="blog-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="pt-20"
            >
              <BlogSection language={language} />
            </motion.div>
          )}

          {activePage === 'contact' && (
            <motion.div
              key="contact-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="pt-20"
            >
              <ContactSection language={language} />
            </motion.div>
          )}

          {activePage === 'book' && (
            <motion.div
              key="book-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="pt-20"
            >
              <BookingSystem
                language={language}
                bookingDraft={bookingDraft}
                setBookingDraft={setBookingDraft}
              />
            </motion.div>
          )}

          {activePage === 'privacy' && (
            <motion.div
              key="privacy-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="pt-20"
            >
              <LegalDocs
                language={language}
                pageType="privacy"
                setActivePage={setActivePage}
              />
            </motion.div>
          )}

          {activePage === 'terms' && (
            <motion.div
              key="terms-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="pt-20"
            >
              <LegalDocs
                language={language}
                pageType="terms"
                setActivePage={setActivePage}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating 5-star Concierge Digital Chat Assistant */}
      <LiveChat />

      {/* Premium Multi-lingual Footer */}
      <Footer language={language} setActivePage={setActivePage} />

    </div>
  );
}
