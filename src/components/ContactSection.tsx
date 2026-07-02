import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Navigation, Award, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface ContactSectionProps {
  language: Language;
}

export default function ContactSection({ language }: ContactSectionProps) {
  const t = (key: string) => TRANSLATIONS[language]?.[key] || TRANSLATIONS['en'][key] || key;

  // Contact Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Map Simulation States
  const [routeStep, setRouteStep] = useState(0);
  const [isRouting, setIsRouting] = useState(false);

  const routeWaypoints = [
    { name: 'Los Angeles Int Airport (LAX)', info: 'Departure via private luxury chauffeur.' },
    { name: 'Coast Boulevard Highway 1', info: 'Panoramic sea-cliff views and pine breeze.' },
    { name: 'Bridge of Angels', info: 'Entering the private Gold Coast gated peninsula.' },
    { name: 'Aurelia Resort Gates', info: 'Arrival with champagne and welcome ritual.' }
  ];

  const handleSimulateRoute = () => {
    setIsRouting(true);
    setRouteStep(0);
    const interval = setInterval(() => {
      setRouteStep((prev) => {
        if (prev < routeWaypoints.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 4000);
  };

  const isRTL = language === 'ar';

  return (
    <section id="contact-section" className="py-24 bg-luxury-100 dark:bg-luxury-900 transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] tracking-[0.3em] font-sans font-bold text-gold-500 uppercase flex items-center justify-center gap-2">
            <Mail className="w-3.5 h-3.5" />
            Amicable Ambassadors
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-luxury-900 dark:text-luxury-100 max-w-2xl mx-auto leading-tight italic">
            {t('contact_title')}
          </h2>
          <p className="text-sm font-sans font-light text-luxury-800/60 dark:text-luxury-200/65 max-w-2xl mx-auto leading-relaxed">
            {t('contact_subtitle')}
          </p>
        </div>

        {/* Contact Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Details & Interactive Mock Map */}
          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Card 1 */}
              <div className="bg-white dark:bg-luxury-900 p-6 rounded-xl border border-gold-200/10 shadow-md luxury-shadow flex flex-col justify-between">
                <MapPin className="w-6 h-6 text-gold-500 mb-4" />
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-luxury-900 dark:text-luxury-100">Our Sanctuary</h4>
                  <p className="text-[11px] text-luxury-800/60 dark:text-luxury-200/60 leading-relaxed font-light">
                    Block 12, Gold Coast Peninsula, CA 90210
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white dark:bg-luxury-900 p-6 rounded-xl border border-gold-200/10 shadow-md luxury-shadow flex flex-col justify-between">
                <Phone className="w-6 h-6 text-gold-500 mb-4" />
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-luxury-900 dark:text-luxury-100">Concierge Desk</h4>
                  <p className="text-[11px] text-luxury-800/60 dark:text-luxury-200/60 font-light">+1 (800) AURELIA</p>
                  <p className="text-[10px] text-gold-500 font-medium">In-room Speed Dial: 0</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white dark:bg-luxury-900 p-6 rounded-xl border border-gold-200/10 shadow-md luxury-shadow flex flex-col justify-between">
                <Mail className="w-6 h-6 text-gold-500 mb-4" />
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-luxury-900 dark:text-luxury-100">Enquiries</h4>
                  <p className="text-[11px] text-luxury-800/60 dark:text-luxury-200/60 font-light">enquire@aureliahotel.com</p>
                  <p className="text-[10px] text-gold-500 font-medium">Response in 1 hour</p>
                </div>
              </div>

            </div>

            {/* Stylized Interactive Mock Map Component */}
            <div id="mock-map" className="bg-white dark:bg-luxury-900 rounded-2xl p-6 border border-gold-200/15 shadow-xl relative overflow-hidden h-80 flex flex-col justify-between luxury-glow">
              {/* Map Graphic Background (minimal beautiful representation of coast & resort pin) */}
              <div className="absolute inset-0 bg-gold-500/5 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-72 rounded-full border border-gold-500/10 absolute -top-12 -left-12 animate-pulse" />
                <div className="w-[500px] h-[500px] rounded-full border border-gold-500/5 absolute -bottom-20 -right-20" />
                
                {/* Coastal Wave Graphic representation */}
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gold-500/10 border-l border-gold-200/20" />
              </div>

              {/* Float Map Location Pointer pin */}
              <div className="absolute right-1/4 top-1/3 text-center pointer-events-none z-10">
                <div className="w-5 h-5 rounded-full bg-gold-500 text-white flex items-center justify-center animate-bounce shadow-lg border border-white">
                  <Sparkles className="w-3 h-3" />
                </div>
                <span className="bg-black/80 backdrop-blur-md text-[10px] text-white px-2.5 py-1 rounded border border-white/10 font-bold uppercase tracking-widest mt-1.5 block">
                  Aurelia Peninsula
                </span>
              </div>

              {/* Map Header details */}
              <div className="relative z-10 flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-luxury-900 dark:text-luxury-100 uppercase tracking-widest">Peninsula Chart Map</h4>
                  <p className="text-[11px] text-luxury-800/60 dark:text-luxury-200/60">Gated Secluded Private Resort Peninsula</p>
                </div>
                <button
                  id="simulate-route-btn"
                  onClick={handleSimulateRoute}
                  className="bg-gold-500 hover:bg-gold-600 text-white font-sans text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Simulate Transit Route</span>
                </button>
              </div>

              {/* Route Waypoints simulation visual panel */}
              <div className="relative z-10 bg-black/5 dark:bg-black/45 p-4 rounded-xl border border-gold-200/10">
                {isRouting ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-gold-500">Waypoint Transit Tracker</span>
                      <span className="text-gold-400 uppercase tracking-widest text-[9px]">
                        Step {routeStep + 1} of {routeWaypoints.length}
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 mt-1 shrink-0 animate-ping" />
                      <div>
                        <p className="text-xs font-bold text-luxury-900 dark:text-white">{routeWaypoints[routeStep].name}</p>
                        <p className="text-[11px] text-luxury-800/60 dark:text-luxury-200/60 font-light">{routeWaypoints[routeStep].info}</p>
                      </div>
                    </div>

                    {/* Progress Dots */}
                    <div className="flex items-center gap-2 pt-2">
                      {routeWaypoints.map((_, dotIdx) => (
                        <div
                          key={dotIdx}
                          className={`h-1.5 rounded-full flex-1 transition-colors ${
                            dotIdx <= routeStep ? 'bg-gold-500' : 'bg-gray-300 dark:bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-luxury-800/60 dark:text-luxury-200/60 font-light text-center py-4">
                    Click the transit route button to track the luxurious private transit coordinates from the airport.
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-5 bg-white dark:bg-luxury-900 p-8 rounded-2xl border border-gold-200/10 shadow-xl luxury-shadow flex flex-col justify-between">
            <div className="space-y-6">
              <div className="space-y-1.5">
                <h3 className="font-serif font-bold text-xl text-luxury-900 dark:text-luxury-100">Submit an Inquiry</h3>
                <p className="text-xs text-luxury-800/60 dark:text-luxury-200/60 font-light leading-relaxed">
                  Our reservation curators and guest relation ambassadors are honored to coordinate your itinerary.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 bg-gold-500/5 border border-gold-400/30 rounded-xl text-center space-y-4 py-12"
                  >
                    <div className="w-12 h-12 rounded-full bg-gold-500/10 text-gold-500 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-base text-luxury-900 dark:text-luxury-100">Message Received</h4>
                      <p className="text-xs text-luxury-800/60 dark:text-luxury-200/60 font-light leading-relaxed">
                        Thank you. An ambassador of Aurelia has been notified and will coordinate a personalized response shortly.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    {/* Guest Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-sans font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">Full Name</label>
                      <input
                        id="contact-name-input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sir Charles Sterling"
                        className="w-full px-4 py-3 border border-gold-200/30 dark:border-luxury-800 rounded bg-white dark:bg-luxury-950 focus:outline-none focus:border-gold-400 text-xs text-luxury-800 dark:text-luxury-200 font-medium placeholder:text-luxury-800/30"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-sans font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">Email Address</label>
                      <input
                        id="contact-email-input"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. charles@sterlingholdings.com"
                        className="w-full px-4 py-3 border border-gold-200/30 dark:border-luxury-800 rounded bg-white dark:bg-luxury-950 focus:outline-none focus:border-gold-400 text-xs text-luxury-800 dark:text-luxury-200 font-medium placeholder:text-luxury-800/30"
                      />
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-sans font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">Subject Category</label>
                      <select
                        id="contact-subject-select"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-3 border border-gold-200/30 dark:border-luxury-800 rounded bg-white dark:bg-luxury-950 focus:outline-none focus:border-gold-400 text-xs text-luxury-800 dark:text-luxury-200 font-medium"
                      >
                        <option value="General Enquiry">General Resort Enquiries</option>
                        <option value="Suite Booking">Suite & Villa Reservations</option>
                        <option value="Custom Events">Bespoke Weddings & Banquets</option>
                        <option value="Feedback">Guest Experience Feedback</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-sans font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">Your Message</label>
                      <textarea
                        id="contact-message-input"
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Please detail your desired booking dates, requested amenities, or coordinates for custom events..."
                        className="w-full px-4 py-3 border border-gold-200/30 dark:border-luxury-800 rounded bg-white dark:bg-luxury-950 focus:outline-none focus:border-gold-400 text-xs text-luxury-800 dark:text-luxury-200 font-light placeholder:text-luxury-800/30 resize-none"
                      />
                    </div>

                    <button
                      id="contact-submit-btn"
                      type="submit"
                      className="w-full bg-gold-500 hover:bg-gold-600 text-white font-sans text-xs font-semibold uppercase tracking-widest py-4 rounded transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Message</span>
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
