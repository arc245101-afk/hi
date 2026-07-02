import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Phone, Compass, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Welcome to Aurelia Luxury Hotel & Spa. I am Lady Aurelia, your digital concierge. It is my absolute privilege to assist you. Would you like to hear about our majestic ocean-view residences, Michelin-starred culinary dining, or bespoke wellness escape packages?"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: inputText };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'model', text: data.text }]);
    } catch (err) {
      console.warn('Live chat server connection failed, using elegant local concierge response.', err);
      
      // Luxury elegant local rule fallback answers
      setTimeout(() => {
        let fallbackText = "I would be absolutely delighted to coordinate that for you. Our guest relations managers can be reached at reservations@aureliahotel.com or directly at +1 (800) AURELIA to ensure your preferences are meticulously catered for.\n\nAt your service, Lady Aurelia.";
        const normalizedInput = inputText.toLowerCase();

        if (normalizedInput.includes('room') || normalizedInput.includes('suite') || normalizedInput.includes('villa') || normalizedInput.includes('price') || normalizedInput.includes('cost')) {
          fallbackText = "Aurelia offers four signature residencies: the Garden Signature Suite ($450), the Imperial Overwater Villa ($950) with its private infinity plunge pool, our Grand Deluxe Horizon Room ($320), and the Royal Penthouse Suite ($1800) featuring 360-degree views, gym, sauna, and butler. You can search live availability and book securely by clicking the 'Book Now' button at the top of your screen.\n\nAt your service, Lady Aurelia.";
        } else if (normalizedInput.includes('dining') || normalizedInput.includes('restaurant') || normalizedInput.includes('menu') || normalizedInput.includes('food') || normalizedInput.includes('chef')) {
          fallbackText = "We are honored to house L'Ambrosia, a Michelin-starred sanctuary guided by Executive Chef Julian Vance. It features our iconic Pacific Bluefin Tuna Tartare, hand-diver coastal scallops with truffles, and aged cask spirits. We recommend booking dinner tables 48 hours in advance through our guest desk.\n\nWith warm regards, Lady Aurelia, your concierge.";
        } else if (normalizedInput.includes('spa') || normalizedInput.includes('massage') || normalizedInput.includes('wellness') || normalizedInput.includes('pool')) {
          fallbackText = "Our Aurelia Sanctum Spa offers holistic wellness diagnostics, sensory sound baths, organic lavender facial clinics, and geothermal hot spring pools. We also offer three temperature-controlled saltwater lagoons. May I coordinate an afternoon appointment for you?\n\nAt your service, Lady Aurelia.";
        }

        setMessages((prev) => [...prev, { role: 'model', text: fallbackText }]);
      }, 1500);

    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div id="live-chat-widget" className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-window"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-luxury-900 border border-gold-200/20 rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden flex flex-col h-[500px] mb-4 luxury-glow"
          >
            {/* Chat Header */}
            <div className="bg-luxury-950 text-white p-4 flex items-center justify-between border-b border-gold-400/20">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-gold-400 bg-white/5 flex items-center justify-center text-gold-400">
                  <Sparkles className="w-4.5 h-4.5 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm tracking-wide text-white">Lady Aurelia</h4>
                  <p className="text-[9px] text-gold-400 uppercase tracking-widest font-medium">Digital Concierge</p>
                </div>
              </div>
              <button
                id="close-chat"
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick action bar */}
            <div className="bg-gold-500/5 px-4 py-2 flex items-center justify-between border-b border-gold-200/10 text-[10px] text-gold-600 dark:text-gold-400 font-semibold uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                Timeless Sanctuary Guide
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                Line: Speed Dial 0
              </span>
            </div>

            {/* Messages Scroll Area */}
            <div id="chat-messages" className="flex-1 p-4 overflow-y-auto space-y-4 bg-luxury-100 dark:bg-luxury-950/40">
              {messages.map((msg, idx) => {
                const isModel = msg.role === 'model';
                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-2.5 ${isModel ? 'justify-start' : 'justify-end'}`}
                  >
                    {isModel && (
                      <div className="w-7 h-7 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20 flex items-center justify-center shrink-0 text-[10px] font-bold">
                        A
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] rounded-2xl p-3.5 text-xs leading-relaxed font-light ${
                        isModel
                          ? 'bg-white dark:bg-luxury-900 border border-gold-200/10 text-luxury-900 dark:text-luxury-200 shadow-sm rounded-tl-none'
                          : 'bg-gold-500 text-white shadow-md rounded-tr-none'
                      }`}
                    >
                      {msg.text.split('\n').map((para, pIdx) => (
                        <p key={pIdx} className={pIdx > 0 ? 'mt-2' : ''}>{para}</p>
                      ))}
                    </div>
                    {!isModel && (
                      <div className="w-7 h-7 rounded-full bg-luxury-950 text-gold-400 border border-gold-200/20 flex items-center justify-center shrink-0">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Blinking Typing Indicator */}
              {isTyping && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20 flex items-center justify-center shrink-0 text-[10px] font-bold">
                    A
                  </div>
                  <div className="bg-white dark:bg-luxury-900 border border-gold-200/10 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-1.5 text-xs text-luxury-800/60 dark:text-luxury-200/60 font-light">
                    <span className="animate-pulse">Lady Aurelia is typing</span>
                    <div className="flex items-center gap-1 shrink-0 ml-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Form Input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-luxury-900 border-t border-gold-200/10 flex items-center gap-2">
              <input
                id="chat-text-input"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Lady Aurelia about our resort..."
                className="flex-1 bg-luxury-100 dark:bg-luxury-950 px-4 py-3 rounded-xl text-xs focus:outline-none focus:border-gold-400 border border-transparent transition-all font-light placeholder:text-luxury-800/40 text-luxury-900 dark:text-white"
              />
              <button
                id="send-chat-message"
                type="submit"
                className="w-10 h-10 rounded-xl bg-gold-500 hover:bg-gold-600 text-white flex items-center justify-center shadow-md cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button Launcher */}
      <button
        id="chat-launcher"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-luxury-950 dark:bg-gold-500 hover:bg-gold-600 hover:scale-105 transition-all rounded-full flex items-center justify-center text-gold-400 dark:text-white shadow-2xl border border-gold-400/30 cursor-pointer group"
        title="Speak with Lady Aurelia"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />}
      </button>
    </div>
  );
}
