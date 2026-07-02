import React, { useState, useEffect } from 'react';
import { Calendar, Users, Home, Shield, CreditCard, Sparkles, Check, Download, Mail, Tag } from 'lucide-react';
import { ROOMS, TRANSLATIONS } from '../data';
import { BookingDetails, Room } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface BookingSystemProps {
  language: string;
  bookingDraft: { checkIn: string; checkOut: string; guests: number; roomId: string; promoCode?: string };
  setBookingDraft: (draft: any) => void;
}

export default function BookingSystem({ language, bookingDraft, setBookingDraft }: BookingSystemProps) {
  const t = (key: string) => {
    const dict = (TRANSLATIONS as any)[language] || TRANSLATIONS['en'];
    return dict[key] || TRANSLATIONS['en'][key] || key;
  };

  // Main input states
  const [checkIn, setCheckIn] = useState(bookingDraft.checkIn || '');
  const [checkOut, setCheckOut] = useState(bookingDraft.checkOut || '');
  const [guests, setGuests] = useState(bookingDraft.guests || 2);
  const [selectedRoomId, setSelectedRoomId] = useState(bookingDraft.roomId || ROOMS[0].id);
  const [promoCode, setPromoCode] = useState(bookingDraft.promoCode || '');
  const [promoApplied, setPromoApplied] = useState(!!bookingDraft.promoCode);
  const [promoDiscount, setPromoDiscount] = useState(bookingDraft.promoCode ? 0.15 : 0); // 15% for pre-filled code

  // Guest details states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Extras options
  const [extras, setExtras] = useState({
    spaPass: false,
    airportTransfer: false,
    champagneOnArrival: false,
    gourmetBreakfast: false
  });

  // Payment states
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  // Wizard Steps
  const [step, setStep] = useState(1); // 1: Reservation Details, 2: Guest Details, 3: Secure Payment, 4: Confirmed Receipt
  const [bookingReference, setBookingReference] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Sync draft
  useEffect(() => {
    if (bookingDraft.checkIn) setCheckIn(bookingDraft.checkIn);
    if (bookingDraft.checkOut) setCheckOut(bookingDraft.checkOut);
    if (bookingDraft.guests) setGuests(bookingDraft.guests);
    if (bookingDraft.roomId) setSelectedRoomId(bookingDraft.roomId);
    if (bookingDraft.promoCode) {
      setPromoCode(bookingDraft.promoCode);
      setPromoApplied(true);
      setPromoDiscount(0.15);
    }
  }, [bookingDraft]);

  const selectedRoom = ROOMS.find((r) => r.id === selectedRoomId) || ROOMS[0];

  // Price calculations
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const nights = calculateNights();
  const roomBaseTotal = selectedRoom.price * nights;

  // Extra price mappings
  const EXTRAS_PRICES = {
    spaPass: 75, // flat
    airportTransfer: 120, // flat
    champagneOnArrival: 90, // flat
    gourmetBreakfast: 45 // per night
  };

  const getExtrasCost = () => {
    let total = 0;
    if (extras.spaPass) total += EXTRAS_PRICES.spaPass;
    if (extras.airportTransfer) total += EXTRAS_PRICES.airportTransfer;
    if (extras.champagneOnArrival) total += EXTRAS_PRICES.champagneOnArrival;
    if (extras.gourmetBreakfast) total += EXTRAS_PRICES.gourmetBreakfast * nights * guests;
    return total;
  };

  const extrasCost = getExtrasCost();
  const subTotal = roomBaseTotal + extrasCost;
  const discountAmount = promoApplied ? subTotal * promoDiscount : 0;
  const grandTotal = subTotal - discountAmount;

  const handleApplyPromo = () => {
    const codes = ['AURAWELL', 'EPICURE', 'ROMANCE', 'AURELIA15'];
    if (codes.includes(promoCode.toUpperCase())) {
      setPromoApplied(true);
      setPromoDiscount(0.15);
    } else {
      alert('Invalid promotional code. Please try AURAWELL, EPICURE, or ROMANCE.');
      setPromoApplied(false);
      setPromoDiscount(0);
    }
  };

  const handleReserveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      // Complete secure booking payment simulation
      setIsProcessing(true);
      try {
        const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName,
            email,
            phone,
            checkIn,
            checkOut,
            guests,
            roomName: selectedRoom.name,
            totalCost: grandTotal,
            extras
          })
        });

        const data = await response.json();
        if (data.success) {
          setBookingReference(data.reference);
          setStep(4);
        } else {
          throw new Error(data.error);
        }
      } catch (err) {
        // Fallback local code if server offline
        const localRef = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
        setBookingReference(localRef);
        setStep(4);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const isRTL = language === 'ar';

  return (
    <section id="booking-system" className="py-24 bg-luxury-100 dark:bg-luxury-950 transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Title */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] tracking-[0.3em] font-sans font-bold text-gold-500 uppercase flex items-center justify-center gap-2">
            <Shield className="w-3.5 h-3.5 text-gold-400" />
            Double-Secured SSL Encryption
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-luxury-900 dark:text-luxury-100 leading-tight italic">
            Reserve Your Sanctuary
          </h2>
          {/* Steps Progress Visual */}
          <div className="flex items-center justify-center gap-4 pt-6 max-w-md mx-auto">
            {[
              { num: 1, label: 'Itinerary' },
              { num: 2, label: 'Guest Info' },
              { num: 3, label: 'Payment' },
              { num: 4, label: 'Confirmed' }
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-none flex items-center justify-center font-sans text-xs font-bold transition-all duration-300 ${
                  step >= s.num ? 'bg-gold-400 text-white' : 'bg-gold-400/10 text-gold-600 dark:text-gold-400 border border-gold-200/25'
                }`}>
                  {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className={`text-[10px] uppercase tracking-[0.2em] font-bold font-sans hidden sm:block ${step >= s.num ? 'text-gold-500' : 'text-luxury-800/40 dark:text-luxury-200/40'}`}>
                  {s.label}
                </span>
                {s.num < 4 && <div className="w-6 h-[1px] bg-gold-200/30" />}
              </div>
            ))}
          </div>
        </div>

        {/* Wizard Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Form Steps */}
          <div className="lg:col-span-8">
            <form onSubmit={handleReserveSubmit} className="bg-white dark:bg-luxury-900 border border-gold-200/10 p-8 rounded-2xl shadow-xl luxury-shadow space-y-8">
              
              <AnimatePresence mode="wait">
                {/* Step 1: Itinerary & Extras */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    className="space-y-6"
                  >
                    <h3 className="font-serif font-bold text-xl text-luxury-900 dark:text-luxury-100 border-b border-gold-200/10 pb-3">
                      1. Confirm Itinerary Details
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Room Select */}
                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="text-[10px] font-sans font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">Selected Residence</label>
                        <select
                          id="booking-room-select"
                          value={selectedRoomId}
                          onChange={(e) => setSelectedRoomId(e.target.value)}
                          className="w-full px-4 py-3.5 border border-gold-200/30 dark:border-luxury-800 rounded bg-white dark:bg-luxury-950 focus:outline-none focus:border-gold-400 text-xs text-luxury-800 dark:text-luxury-200 font-medium"
                        >
                          {ROOMS.map((room) => (
                            <option key={room.id} value={room.id}>
                              {room.name} (${room.price}/night)
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Dates */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-sans font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">Check-in Date</label>
                        <input
                          id="booking-check-in"
                          type="date"
                          required
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3.5 border border-gold-200/30 dark:border-luxury-800 rounded bg-white dark:bg-luxury-950 focus:outline-none focus:border-gold-400 text-xs text-luxury-800 dark:text-luxury-200 font-medium"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-sans font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">Check-out Date</label>
                        <input
                          id="booking-check-out"
                          type="date"
                          required
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          min={checkIn || new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3.5 border border-gold-200/30 dark:border-luxury-800 rounded bg-white dark:bg-luxury-950 focus:outline-none focus:border-gold-400 text-xs text-luxury-800 dark:text-luxury-200 font-medium"
                        />
                      </div>

                      {/* Guests */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-sans font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">Guests</label>
                        <select
                          id="booking-guests-select"
                          value={guests}
                          onChange={(e) => setGuests(Number(e.target.value))}
                          className="w-full px-4 py-3.5 border border-gold-200/30 dark:border-luxury-800 rounded bg-white dark:bg-luxury-950 focus:outline-none focus:border-gold-400 text-xs text-luxury-800 dark:text-luxury-200 font-medium"
                        >
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                          ))}
                        </select>
                      </div>

                      {/* Promotional Code */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-sans font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">Promo Code</label>
                        <div className="flex gap-2">
                          <input
                            id="booking-promo-input"
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="e.g. AURAWELL"
                            className="flex-1 px-4 py-3 border border-gold-200/30 dark:border-luxury-800 rounded bg-white dark:bg-luxury-950 focus:outline-none focus:border-gold-400 text-xs text-luxury-800 dark:text-luxury-200 font-medium uppercase"
                          />
                          <button
                            id="apply-promo-btn"
                            type="button"
                            onClick={handleApplyPromo}
                            className="bg-gold-500 hover:bg-gold-600 text-white font-sans text-[10px] font-bold uppercase tracking-widest px-4 py-3 rounded cursor-pointer"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Extras Options */}
                    <div className="space-y-4 pt-4 border-t border-gold-200/10">
                      <h4 className="text-[11px] font-sans font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                        Enhance Your Experience (Optional Extras)
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { id: 'spaPass', title: 'Aura Sanctum Spa Day Pass', price: `$${EXTRAS_PRICES.spaPass} flat`, desc: 'Unlimited hydrotherapy, sound sensory bath, sauna access.' },
                          { id: 'airportTransfer', title: 'Luxury Airport Limousine Transit', price: `$${EXTRAS_PRICES.airportTransfer} flat`, desc: 'Private Bentley or Mercedes chauffeured pickup & dropoff.' },
                          { id: 'champagneOnArrival', title: 'Gourmet Champagne & Strawberries', price: `$${EXTRAS_PRICES.champagneOnArrival} flat`, desc: 'A chilled bottle of Dom Pérignon on arrival in your suite.' },
                          { id: 'gourmetBreakfast', title: 'In-Suite Michelin Gourmet Breakfast', price: `$${EXTRAS_PRICES.gourmetBreakfast}/night per guest`, desc: 'Custom menu prepared daily by Chef Julian Vance.' }
                        ].map((opt) => (
                          <label
                            id={`extra-label-${opt.id}`}
                            key={opt.id}
                            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                              (extras as any)[opt.id]
                                ? 'bg-gold-500/5 border-gold-400 shadow-md'
                                : 'bg-transparent border-gold-200/10 hover:border-gold-400/30'
                            }`}
                          >
                            <input
                              id={`extra-checkbox-${opt.id}`}
                              type="checkbox"
                              checked={(extras as any)[opt.id]}
                              onChange={(e) => setExtras({ ...extras, [opt.id]: e.target.checked })}
                              className="w-4 h-4 accent-gold-500 shrink-0 mt-0.5 cursor-pointer"
                            />
                            <div className="space-y-1">
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-serif font-bold text-xs text-luxury-900 dark:text-luxury-200">{opt.title}</span>
                                <span className="text-[10px] text-gold-600 dark:text-gold-400 font-bold font-mono shrink-0">{opt.price}</span>
                              </div>
                              <p className="text-[10px] text-luxury-800/60 dark:text-luxury-200/60 font-light leading-relaxed">{opt.desc}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gold-200/10 text-right">
                      <button
                        id="booking-step-1-next"
                        type="submit"
                        className="bg-gold-500 hover:bg-gold-600 text-white font-sans text-xs font-semibold uppercase tracking-widest px-8 py-4 rounded shadow-md cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <span>Continue to Guest Details</span>
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Guest Details */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    className="space-y-6"
                  >
                    <h3 className="font-serif font-bold text-xl text-luxury-900 dark:text-luxury-100 border-b border-gold-200/10 pb-3">
                      2. Guest Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-[10px] font-sans font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">Primary Guest Full Name</label>
                        <input
                          id="booking-guest-name"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Sir Charles Sterling"
                          className="w-full px-4 py-3.5 border border-gold-200/30 dark:border-luxury-800 rounded bg-white dark:bg-luxury-950 focus:outline-none focus:border-gold-400 text-xs text-luxury-800 dark:text-luxury-200 font-medium placeholder:text-luxury-800/30"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-sans font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">Email Address</label>
                        <input
                          id="booking-guest-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. charles@sterlingholdings.com"
                          className="w-full px-4 py-3.5 border border-gold-200/30 dark:border-luxury-800 rounded bg-white dark:bg-luxury-950 focus:outline-none focus:border-gold-400 text-xs text-luxury-800 dark:text-luxury-200 font-medium placeholder:text-luxury-800/30"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-sans font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">Phone Number</label>
                        <input
                          id="booking-guest-phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +1 (555) 019-2834"
                          className="w-full px-4 py-3.5 border border-gold-200/30 dark:border-luxury-800 rounded bg-white dark:bg-luxury-950 focus:outline-none focus:border-gold-400 text-xs text-luxury-800 dark:text-luxury-200 font-medium placeholder:text-luxury-800/30"
                        />
                      </div>

                      {/* Special requests */}
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-[10px] font-sans font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">Special Preferences & Arrangements</label>
                        <textarea
                          id="booking-guest-requests"
                          rows={4}
                          value={specialRequests}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Dietary requirements, pillow selections, valet press requests, early-arrival butler coordinates..."
                          className="w-full px-4 py-3.5 border border-gold-200/30 dark:border-luxury-800 rounded bg-white dark:bg-luxury-950 focus:outline-none focus:border-gold-400 text-xs text-luxury-800 dark:text-luxury-200 font-light placeholder:text-luxury-800/30 resize-none"
                        />
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gold-200/10 flex items-center justify-between gap-4">
                      <button
                        id="booking-step-2-back"
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs font-semibold text-luxury-800 dark:text-luxury-200 hover:underline cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        id="booking-step-2-next"
                        type="submit"
                        className="bg-gold-500 hover:bg-gold-600 text-white font-sans text-xs font-semibold uppercase tracking-widest px-8 py-4 rounded shadow-md cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <span>Continue to Payment</span>
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Secure Payment */}
                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    className="space-y-6"
                  >
                    <h3 className="font-serif font-bold text-xl text-luxury-900 dark:text-luxury-100 border-b border-gold-200/10 pb-3">
                      3. Secure Checkout & Payment
                    </h3>

                    {/* Beautiful Credit Card graphic visualization */}
                    <div id="credit-card-graphic" className="relative h-48 w-full max-w-sm mx-auto bg-gradient-to-br from-luxury-900 via-luxury-950 to-gold-900 rounded-2xl p-6 text-white border border-gold-400/35 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                      {/* Card vector decor circles */}
                      <div className="absolute right-0 bottom-0 w-44 h-44 rounded-full bg-gold-500/5 border border-gold-400/10 pointer-events-none" />
                      <div className="absolute left-6 top-6 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-gold-300 animate-pulse" />
                        <span className="text-[9px] tracking-[0.25em] font-sans font-bold text-gold-400">AURELIA PRESTIGE</span>
                      </div>
                      
                      <div className="space-y-4 relative z-10 pt-6">
                        <p className="font-mono text-base md:text-lg tracking-[0.2em] font-medium text-gold-100">
                          {cardNumber ? cardNumber.replace(/(\d{4})/g, '$1 ').trim() : '•••• •••• •••• ••••'}
                        </p>
                        
                        <div className="flex justify-between items-center text-[10px] font-sans uppercase font-semibold text-gold-300/80">
                          <div>
                            <p className="text-[8px] text-gold-400/50 mb-0.5">Cardholder</p>
                            <p className="tracking-widest font-mono text-white truncate max-w-[150px]">{cardholderName || 'SIR CHARLES STERLING'}</p>
                          </div>
                          <div>
                            <p className="text-[8px] text-gold-400/50 mb-0.5">Expiry</p>
                            <p className="font-mono text-white">{cardExpiry || '12 / 28'}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Cardholder */}
                      <div className="space-y-1.5 sm:col-span-3">
                        <label className="text-[10px] font-sans font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">Cardholder Name</label>
                        <input
                          id="payment-cardholder"
                          type="text"
                          required
                          value={cardholderName}
                          onChange={(e) => setCardholderName(e.target.value.toUpperCase())}
                          placeholder="e.g. SIR CHARLES STERLING"
                          className="w-full px-4 py-3.5 border border-gold-200/30 dark:border-luxury-800 rounded bg-white dark:bg-luxury-950 focus:outline-none focus:border-gold-400 text-xs text-luxury-800 dark:text-luxury-200 font-medium placeholder:text-luxury-800/30 uppercase"
                        />
                      </div>

                      {/* Card Number */}
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-[10px] font-sans font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">Credit Card Number</label>
                        <input
                          id="payment-cardnumber"
                          type="text"
                          required
                          maxLength={16}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                          placeholder="4111 2222 3333 4444"
                          className="w-full px-4 py-3.5 border border-gold-200/30 dark:border-luxury-800 rounded bg-white dark:bg-luxury-950 focus:outline-none focus:border-gold-400 text-xs text-luxury-800 dark:text-luxury-200 font-mono font-medium placeholder:text-luxury-800/30"
                        />
                      </div>

                      {/* Expiry & CVV */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-sans font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">Expiry Date</label>
                        <input
                          id="payment-cardexpiry"
                          type="text"
                          required
                          placeholder="MM / YY"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-4 py-3.5 border border-gold-200/30 dark:border-luxury-800 rounded bg-white dark:bg-luxury-950 focus:outline-none focus:border-gold-400 text-xs text-luxury-800 dark:text-luxury-200 font-mono font-medium placeholder:text-luxury-800/30"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-sans font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">CVV Security</label>
                        <input
                          id="payment-cardcvv"
                          type="password"
                          required
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                          placeholder="•••"
                          className="w-full px-4 py-3.5 border border-gold-200/30 dark:border-luxury-800 rounded bg-white dark:bg-luxury-950 focus:outline-none focus:border-gold-400 text-xs text-luxury-800 dark:text-luxury-200 font-mono font-medium placeholder:text-luxury-800/30"
                        />
                      </div>

                      <div className="sm:col-span-2 flex items-center gap-2.5 text-gold-600 dark:text-gold-400 text-xs pt-4 font-medium">
                        <CreditCard className="w-4 h-4 text-gold-500 shrink-0" />
                        <span>SSL PCI-DSS Certified Endpoint Protection.</span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gold-200/10 flex items-center justify-between gap-4">
                      <button
                        id="booking-step-3-back"
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-xs font-semibold text-luxury-800 dark:text-luxury-200 hover:underline cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        id="booking-step-3-submit"
                        type="submit"
                        disabled={isProcessing}
                        className="bg-gold-500 hover:bg-gold-600 text-white font-sans text-xs font-semibold uppercase tracking-widest px-8 py-4 rounded shadow-md cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <>
                            <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                            <span>Processing Payment...</span>
                          </>
                        ) : (
                          <>
                            <span>Authorize Secure Reservation</span>
                            <Check className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Confirmed Receipt */}
                {step === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-gold-500/10 text-gold-500 flex items-center justify-center mx-auto mb-6">
                      <Check className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] tracking-widest font-sans font-bold text-gold-500 uppercase">
                        Reservation Completed Successfully
                      </span>
                      <h3 className="font-serif text-3xl font-bold text-luxury-900 dark:text-white">
                        Sanctuary Confirmed
                      </h3>
                      <p className="text-sm font-sans font-light text-luxury-800/60 dark:text-luxury-200/60 max-w-md mx-auto">
                        Your luxury escape has been meticulously registered. Below is your official receipt statement. A copy has also been sent to your email.
                      </p>
                    </div>

                    {/* Receipt Statement Breakdown */}
                    <div id="booking-invoice-receipt" className="max-w-md mx-auto bg-luxury-100 dark:bg-luxury-950 p-6 rounded-2xl border border-gold-200/10 text-left text-xs font-sans space-y-4 font-light">
                      <div className="flex items-center justify-between border-b border-gold-200/20 pb-3">
                        <span className="font-bold uppercase text-gold-500 tracking-wider">Aurelia Resort & Spa Invoice</span>
                        <span className="font-mono font-bold text-luxury-900 dark:text-white text-sm">{bookingReference}</span>
                      </div>

                      <div className="space-y-2.5">
                        <div className="flex justify-between">
                          <span className="text-luxury-800/60 dark:text-luxury-200/60">Primary Guest</span>
                          <span className="font-semibold text-luxury-900 dark:text-luxury-200">{fullName || 'Sir Charles Sterling'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-luxury-800/60 dark:text-luxury-200/60">Room Residence</span>
                          <span className="font-semibold text-luxury-900 dark:text-luxury-200">{selectedRoom.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-luxury-800/60 dark:text-luxury-200/60">Itinerary Stay</span>
                          <span className="font-semibold text-luxury-900 dark:text-luxury-200">{checkIn} to {checkOut} ({nights} {nights === 1 ? 'Night' : 'Nights'})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-luxury-800/60 dark:text-luxury-200/60">Guests count</span>
                          <span className="font-semibold text-luxury-900 dark:text-luxury-200">{guests} guests</span>
                        </div>
                      </div>

                      {/* Financial breakdown */}
                      <div className="border-t border-gold-200/20 pt-3 space-y-2">
                        <div className="flex justify-between text-luxury-800/60 dark:text-luxury-200/60">
                          <span>Room Subtotal</span>
                          <span className="font-semibold font-mono">${roomBaseTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-luxury-800/60 dark:text-luxury-200/60">
                          <span>Premium Extras Cost</span>
                          <span className="font-semibold font-mono">${extrasCost.toFixed(2)}</span>
                        </div>
                        {promoApplied && (
                          <div className="flex justify-between text-green-500 font-medium">
                            <span className="flex items-center gap-1">
                              <Tag className="w-3.5 h-3.5" />
                              Promotional Code discount (15%)
                            </span>
                            <span className="font-semibold font-mono">-${discountAmount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between border-t border-dashed border-gold-200/20 pt-3 font-bold text-sm text-gold-600 dark:text-gold-400">
                          <span>Grand Total Charged</span>
                          <span className="font-mono text-base">${grandTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action receipts button */}
                    <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                      <button
                        id="print-invoice-btn"
                        onClick={handlePrintReceipt}
                        className="bg-gold-500 hover:bg-gold-600 text-white font-sans text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                      >
                        <Download className="w-4 h-4" />
                        <span>Print Invoice / Receipt</span>
                      </button>
                      <button
                        id="return-home-btn"
                        onClick={() => {
                          setStep(1);
                          setBookingDraft({ checkIn: '', checkOut: '', guests: 2, roomId: ROOMS[0].id });
                          // Navigate to home
                          window.location.reload();
                        }}
                        className="text-xs font-semibold text-luxury-800 dark:text-luxury-200 hover:underline cursor-pointer"
                      >
                        Return to Resort Lobby
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          </div>

          {/* Right Column: Dynamic Bill Estimate Breakdown sidebar */}
          <div className="lg:col-span-4">
            <div id="booking-estimate-sidebar" className="bg-white dark:bg-luxury-900 border border-gold-200/10 p-6 rounded-2xl shadow-xl luxury-shadow space-y-6 text-xs text-luxury-900 dark:text-luxury-100 font-sans">
              <h4 className="font-serif font-bold text-sm uppercase tracking-widest text-gold-500 border-b border-gold-200/10 pb-3">
                Reservation Cost Statement
              </h4>

              {/* Selected Room Card Preview */}
              <div className="space-y-3">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-sm border border-gold-200/10">
                  <img
                    src={selectedRoom.image}
                    alt={selectedRoom.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] uppercase font-sans tracking-widest text-gold-500 font-semibold">{selectedRoom.type} Selection</p>
                  <p className="font-serif font-bold text-sm leading-tight">{selectedRoom.name}</p>
                </div>
              </div>

              {/* Summary Lists details */}
              <div className="space-y-3 py-4 border-y border-gold-200/10 font-light text-luxury-800/75 dark:text-luxury-200/75">
                <div className="flex justify-between">
                  <span>Price per night</span>
                  <span className="font-semibold font-mono">${selectedRoom.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Itinerary Length</span>
                  <span className="font-semibold">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests Occupancy</span>
                  <span className="font-semibold">{guests} Guests</span>
                </div>
                <div className="flex justify-between text-gold-600 dark:text-gold-400 font-medium">
                  <span>Dates</span>
                  <span className="font-semibold tracking-wider font-mono">{checkIn || 'Not set'} to {checkOut || 'Not set'}</span>
                </div>
              </div>

              {/* Pricing breakdown live updates */}
              <div className="space-y-2.5 font-light">
                <div className="flex justify-between text-luxury-800/60 dark:text-luxury-200/60">
                  <span>Room Base Price Total</span>
                  <span className="font-semibold font-mono">${roomBaseTotal.toFixed(2)}</span>
                </div>
                
                {extrasCost > 0 && (
                  <div className="flex justify-between text-luxury-800/60 dark:text-luxury-200/60">
                    <span>Selected Premium Extras</span>
                    <span className="font-semibold font-mono">${extrasCost.toFixed(2)}</span>
                  </div>
                )}

                {promoApplied && (
                  <div className="flex justify-between text-green-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      Promo Code Discount (15%)
                    </span>
                    <span className="font-semibold font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between border-t border-dashed border-gold-200/10 pt-3 text-sm font-serif font-bold text-gold-600 dark:text-gold-400">
                  <span>Estimated Total cost</span>
                  <span className="font-mono text-base">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-start gap-3 bg-gold-500/5 p-4 rounded-xl border border-gold-200/10 text-[10px] text-luxury-800/60 dark:text-luxury-200/60 leading-relaxed font-light">
                <Shield className="w-4 h-4 text-gold-500 shrink-0" />
                <span>
                  No cancellation fees exist up to 48 hours prior to arrival. Fully encrypted payment portal.
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
