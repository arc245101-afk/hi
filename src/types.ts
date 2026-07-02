export interface Room {
  id: string;
  name: string;
  type: 'suite' | 'room' | 'villa';
  price: number;
  image: string;
  description: string;
  size: string;
  view: string;
  occupancy: string;
  rating: number;
  reviewsCount: number;
  amenities: string[];
}

export interface Facility {
  id: string;
  name: string;
  iconName: string;
  description: string;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  roomType?: string;
}

export interface Offer {
  id: string;
  title: string;
  tagline: string;
  discount: string;
  description: string;
  image: string;
  amenities: string[];
  code: string;
}

export interface Attraction {
  id: string;
  name: string;
  distance: string;
  category: 'nature' | 'culture' | 'shopping' | 'adventure';
  description: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  author: string;
  image: string;
  readTime: string;
  category: string;
}

export interface BookingDetails {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomId?: string;
  extras: {
    spaPass: boolean;
    airportTransfer: boolean;
    champagneOnArrival: boolean;
    gourmetBreakfast: boolean;
  };
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;
  promoCode: string;
}

export type Language = 'en' | 'fr' | 'es' | 'ja' | 'ar';

export type ActivePage = 
  | 'home' 
  | 'rooms' 
  | 'restaurant' 
  | 'gallery' 
  | 'about' 
  | 'contact' 
  | 'book' 
  | 'blog' 
  | 'privacy' 
  | 'terms';
