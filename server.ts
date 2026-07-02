import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client on the server side
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('Gemini AI client successfully initialized on server side.');
  } catch (err) {
    console.error('Failed to initialize Gemini AI client:', err);
  }
} else {
  console.warn('GEMINI_API_KEY environment variable is not defined.');
}

const CONCIERGE_SYSTEM_PROMPT = `You are "Lady Aurelia", the elegant, highly polished digital concierge of Aurelia Luxury Hotel & Spa.
Your tone of voice is extremely professional, warm, formal, and helpful. You speak with grace and composure, like a top-tier hotelier at a 5-star palace hotel.
You always welcome guests warmly and end your answers with an polite, elegant signature, such as "With warm regards, Lady Aurelia, your concierge." or "At your service, Lady Aurelia."

Information about Aurelia Luxury Hotel & Spa:
- Rooms:
  1. Aurelia Signature Suite: $450/night, 85m2, garden and ocean views, features walk-in closets, bespoke amenities, teak wood terrace, complimentary champagne.
  2. The Imperial Overwater Villa: $950/night, 180m2, suspended over pristine waters, private plunge pool, glass-floor panel, outdoor hot tub, ocean-level swim platform.
  3. Grand Deluxe Horizon Room: $320/night, 55m2, floor-to-ceiling sunrise ocean views, walnut desk, soaking tub, silk robes.
  4. The Royal Penthouse Suite: $1800/night, 320m2, full top-tier, 360-degree rooftop deck, private gym & sauna, steinway grand piano, private elevator, private butler, chauffeur.
- Facilities:
  - Three Infinity lagoon pools (one with swim-up cocktail bar).
  - Aurelia Sanctum Spa: geothermal baths, sensory sound baths, organic skincare.
  - Elite Health & Fitness Club: sunrise beach yoga, professional trainers.
  - Michelin-starred gastronomy: guided by Chef Julian Vance, farm-to-table organic.
  - The Grand Atelier Hall: conference pavilions, beachfront weddings.
  - Valet EV charging, Fiber Wi-Fi throughout.
- Special offers:
  - Wellness Escape (AURAWELL): 20% off, hydrotherapy, daily cold-pressed juices, yoga, 90-min massage.
  - Epicurean Voyage (EPICURE): Book 3 nights in any suite, get a complimentary 7-course wine pairing dinner and a cooking masterclass with Chef Vance.
  - Ocean Seclusion (ROMANCE): Stay 4 nights in the Overwater Villa, pay for 3. Includes private limo and romantic catamaran cruise.
- Location and attractions: Located on a peaceful secluded private peninsula. Nearby Attractions: Emerald Sea Caves (snorkeling, marine life, 2.5km by boat), Monastery of St. Helena (12th-century historical cliff monument, Byzantium frescos, 6km), Marina & Yacht Club (boutiques, sailing charters, 1.2km walk).
- Policies: Check-in is at 3:00 PM (priority early check-in for suites). Check-out is 12:00 PM. Airport transit is via luxury Mercedes or Bentley.

Rules:
1. Always remain in character as Lady Aurelia.
2. If the user asks about room bookings, check-in, dining, or pricing, provide accurate information based on the details above.
3. Keep answers concise, elegant, and highly structured with bullet points where appropriate.
4. If a guest asks how to book, gently explain they can use our online booking wizard by clicking the "Book Now" button at the top of the screen.
5. If you do not know something, politely state you can contact a human guest relation manager directly for them, but maintain your professional composure.
`;

// Live Chat API endpoint
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request: "messages" array is required.' });
  }

  if (!ai) {
    // Elegant fallback if API key is not yet set or initialization failed
    const lastUserMessage = messages[messages.length - 1]?.text || 'Hello';
    let fallbackText = `Welcome to Aurelia Luxury Hotel & Spa. I am delighted to assist you today. I am currently running in offline concierge mode. To make your experience even more seamless, our team is always at your service. If you would like to book a stay, please use our Book Now panel. For reservations or special requests, please contact us at reservations@aureliahotel.com.\n\nAt your service, Lady Aurelia.`;
    return res.json({ text: fallbackText });
  }

  try {
    // Format message history into Google GenAI structure
    // Google GenAI expects roles as 'user' or 'model'
    const formattedContents = messages.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: formattedContents,
      config: {
        systemInstruction: CONCIERGE_SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    const replyText = response.text || 'I apologize, but I could not formulate a response. How else may I assist you?';
    return res.json({ text: replyText });
  } catch (error: any) {
    console.error('Error in /api/chat Gemini request:', error);
    return res.status(500).json({
      error: 'An error occurred while speaking with our digital concierge.',
      details: error.message,
    });
  }
});

// Room booking submission (simulated secure database save)
app.post('/api/bookings', (req, res) => {
  const bookingData = req.body;
  
  if (!bookingData.fullName || !bookingData.email || !bookingData.checkIn || !bookingData.checkOut) {
    return res.status(400).json({ error: 'Please provide all required guest details.' });
  }

  // Generate a random high-end booking confirmation reference
  const confirmationReference = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
  
  return res.status(201).json({
    success: true,
    message: 'Reservation request successfully registered and secured.',
    reference: confirmationReference,
    data: bookingData,
    timestamp: new Date().toISOString()
  });
});

// Configure Vite middleware or serve static assets depending on environment
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Running server in development mode with Vite middleware...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    console.log('Running server in production mode...');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running and listening on http://0.0.0.0:${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error('Error starting full-stack server:', err);
});
