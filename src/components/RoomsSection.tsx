import React, { useState } from 'react';
import { Room, ActivePage } from '../types';
import { ROOMS, TRANSLATIONS } from '../data';
import { Star, Eye, Calendar, X, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RoomsSectionProps {
  language: string;
  setActivePage: (page: ActivePage) => void;
  setBookingDraft: (draft: any) => void;
}

export default function RoomsSection({ language, setActivePage, setBookingDraft }: RoomsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'room' | 'suite' | 'villa'>('all');
  const [selectedRoomModal, setSelectedRoomModal] = useState<Room | null>(null);

  const t = (key: string) => {
    const dict = (TRANSLATIONS as any)[language] || TRANSLATIONS['en'];
    return dict[key] || TRANSLATIONS['en'][key] || key;
  };

  const filteredRooms = ROOMS.filter(
    (room) => activeFilter === 'all' || room.type === activeFilter
  );

  const handleBookNowDirect = (room: Room) => {
    setBookingDraft({
      roomId: room.id,
      checkIn: new Date().toISOString().split('T')[0],
      checkOut: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      guests: room.type === 'villa' ? 4 : 2
    });
    setSelectedRoomModal(null);
    setActivePage('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isRTL = language === 'ar';

  return (
    <section id="rooms-section" className="py-24 bg-luxury-100 dark:bg-luxury-950 transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Titles */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] tracking-[0.3em] font-sans font-bold text-gold-500 uppercase flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Accoutrements of Distinction
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-luxury-900 dark:text-luxury-100 max-w-2xl mx-auto leading-tight italic">
            {t('rooms_title')}
          </h2>
          <p className="text-sm font-sans font-light text-luxury-800/60 dark:text-luxury-200/65 max-w-2xl mx-auto leading-relaxed">
            {t('rooms_subtitle')}
          </p>
        </div>

        {/* Filter Tab Menu */}
        <div id="rooms-filters" className="flex items-center justify-center gap-3 md:gap-4 mb-12 flex-wrap">
          {['all', 'room', 'suite', 'villa'].map((filter) => (
            <button
              id={`filter-${filter}`}
              key={filter}
              onClick={() => setActiveFilter(filter as any)}
              className={`font-sans text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] px-6 py-2.5 rounded-none border transition-all cursor-pointer ${
                activeFilter === filter
                  ? 'bg-gold-400 text-white border-gold-400 shadow-md'
                  : 'bg-transparent text-luxury-800 dark:text-luxury-200 border-gold-200/20 hover:border-gold-400'
              }`}
            >
              {filter === 'all' ? 'All Accommodations' : `${filter}s`}
            </button>
          ))}
        </div>

        {/* Rooms Cards Grid */}
        <div id="rooms-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredRooms.map((room) => (
              <motion.div
                id={`room-card-${room.id}`}
                key={room.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-luxury-900 border border-gold-200/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all flex flex-col group h-full luxury-shadow"
              >
                {/* Room Image with overlay indicators */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Shadow Cover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Price Tag */}
                  <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white font-serif font-bold text-sm px-4 py-2 rounded-full border border-white/25">
                    ${room.price} <span className="text-[10px] font-sans font-light text-luxury-200 uppercase tracking-widest">/ Night</span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-gold-500 text-white flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{room.rating.toFixed(1)}</span>
                  </div>

                  {/* Hover action bar overlays */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 duration-300">
                    <button
                      id={`view-details-${room.id}`}
                      onClick={() => setSelectedRoomModal(room)}
                      className="p-3 rounded-full bg-white/95 text-luxury-950 hover:bg-gold-500 hover:text-white transition-colors cursor-pointer shadow-lg"
                      title="View room details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Card description details */}
                <div className="p-6 flex-1 flex flex-col space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-sans font-semibold text-gold-500 uppercase tracking-widest">{room.type}</p>
                    <h3 className="font-serif font-bold text-xl text-luxury-900 dark:text-luxury-100 group-hover:text-gold-500 transition-colors">
                      {room.name}
                    </h3>
                  </div>

                  <p className="text-xs text-luxury-800/60 dark:text-luxury-200/60 line-clamp-3 leading-relaxed font-light">
                    {room.description}
                  </p>

                  {/* Room Quick stats */}
                  <div className="flex items-center justify-between text-[11px] font-medium text-luxury-800/80 dark:text-luxury-200/80 py-3 border-y border-gold-200/10">
                    <div>
                      <span className="text-gold-500">Size:</span> {room.size}
                    </div>
                    <div>
                      <span className="text-gold-500">View:</span> {room.view.split(' & ')[0]}
                    </div>
                    <div>
                      <span className="text-gold-500">Guests:</span> {room.occupancy.replace('Up to ', '')}
                    </div>
                  </div>

                  {/* Primary action CTA buttons */}
                  <div className="pt-2 flex items-center justify-between gap-4">
                    <button
                      id={`modal-open-${room.id}`}
                      onClick={() => setSelectedRoomModal(room)}
                      className="text-xs font-semibold text-luxury-800 dark:text-luxury-200 hover:text-gold-500 dark:hover:text-gold-400 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{t('view_details')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      id={`book-direct-${room.id}`}
                      onClick={() => handleBookNowDirect(room)}
                      className="bg-gold-500/10 hover:bg-gold-500 text-gold-500 hover:text-white border border-gold-500/30 font-sans text-[11px] font-semibold uppercase tracking-widest px-5 py-2.5 rounded transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{t('reserve_now')}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Room Detail Dynamic Modal Overlay */}
        <AnimatePresence>
          {selectedRoomModal && (
            <motion.div
              id="room-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-55 flex items-center justify-center p-4 backdrop-blur-sm"
            >
              <motion.div
                id="room-modal-container"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                className="bg-white dark:bg-luxury-900 max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl border border-gold-200/20 text-luxury-900 dark:text-luxury-100 relative max-h-[90vh] overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  id="close-room-modal"
                  onClick={() => setSelectedRoomModal(null)}
                  className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/40 text-white hover:bg-gold-500 hover:text-white transition-colors cursor-pointer border border-white/20"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Left Column: Big Image Display */}
                  <div className="relative aspect-video md:aspect-auto md:h-full">
                    <img
                      src={selectedRoomModal.image}
                      alt={selectedRoomModal.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white space-y-2">
                      <span className="text-[10px] uppercase font-sans tracking-widest font-bold text-gold-400">
                        {selectedRoomModal.type} Residence
                      </span>
                      <h3 className="font-serif text-2xl font-bold">{selectedRoomModal.name}</h3>
                    </div>
                  </div>

                  {/* Right Column: Key Details */}
                  <div className="p-8 space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-sans tracking-widest text-gold-500 font-semibold">Accommodation Details</span>
                        <div className="flex items-center gap-1.5 text-gold-500 font-semibold text-sm">
                          <Star className="w-4 h-4 fill-current" />
                          <span>{selectedRoomModal.rating.toFixed(1)} ({selectedRoomModal.reviewsCount} reviews)</span>
                        </div>
                      </div>
                      <p className="text-2xl font-serif font-bold text-luxury-950 dark:text-white">
                        ${selectedRoomModal.price} <span className="text-xs font-sans font-light uppercase tracking-widest text-luxury-800/60 dark:text-luxury-200/60">/ Night</span>
                      </p>
                    </div>

                    <p className="text-xs text-luxury-800/70 dark:text-luxury-200/75 leading-relaxed font-light">
                      {selectedRoomModal.description}
                    </p>

                    {/* Room Specs Checklist */}
                    <div className="grid grid-cols-3 gap-3 bg-gold-500/5 p-4 rounded-xl border border-gold-200/10 text-xs text-center font-medium">
                      <div>
                        <p className="text-gold-500 uppercase tracking-widest text-[9px] mb-1">Floor Area</p>
                        <p className="text-luxury-900 dark:text-luxury-200">{selectedRoomModal.size}</p>
                      </div>
                      <div>
                        <p className="text-gold-500 uppercase tracking-widest text-[9px] mb-1">Outlook View</p>
                        <p className="text-luxury-900 dark:text-luxury-200 line-clamp-1">{selectedRoomModal.view.split(' & ')[0]}</p>
                      </div>
                      <div>
                        <p className="text-gold-500 uppercase tracking-widest text-[9px] mb-1">Max Occupancy</p>
                        <p className="text-luxury-900 dark:text-luxury-200">{selectedRoomModal.occupancy.replace('Up to ', '')}</p>
                      </div>
                    </div>

                    {/* Rich Amenities Checklist */}
                    <div className="space-y-3">
                      <h4 className="text-[11px] font-sans font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">Premium In-Room Amenities</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs font-light text-luxury-800/80 dark:text-luxury-200/85">
                        {selectedRoomModal.amenities.map((amenity, keyIdx) => (
                          <div key={keyIdx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Direct book actions */}
                    <div className="pt-4 border-t border-gold-200/10 flex items-center justify-between gap-4">
                      <button
                        id="modal-cancel-btn"
                        onClick={() => setSelectedRoomModal(null)}
                        className="text-xs font-semibold text-luxury-800 dark:text-luxury-200 hover:underline cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        id="modal-confirm-book"
                        onClick={() => handleBookNowDirect(selectedRoomModal)}
                        className="flex-1 bg-gold-500 hover:bg-gold-600 text-white font-sans text-xs font-semibold uppercase tracking-widest py-3.5 rounded transition-all duration-300 shadow-md text-center cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Book Residence Now</span>
                      </button>
                    </div>

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
