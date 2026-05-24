export interface MenuItem {
  id: string;
  name: string;
  category: 'entradas' | 'principais' | 'drinks' | 'sobremesas';
  price: number;
  description: string;
  image: string;
  pairing: string;
  anecdote: string;
  isChefRecommended?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  stars: number;
  dish: string;
}

export interface Table {
  id: number;
  seats: number;
  desc: string;
  location: string;
}

export interface EventBistro {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  image?: string;
  video?: string;
  videoType?: 'file' | 'link';
  active: boolean;
  buttonText?: string;
  whatsappMessage?: string;
  isRomanticSpecial?: boolean; // Flag to tag as Especial Dia dos Namorados
}

export interface HeroBanner {
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

export interface WhatsAppConfig {
  number: string;
  defaultMessage: string;
  defaultButtonText: string;
}

export interface RomanticThemeConfig {
  active: boolean;
  popupText: string;
  popupDuration: number; // in seconds, default 5
  popupFrequency: 'session' | 'always';
  cupidPosition: 'left' | 'right' | 'top-right';
  bannerRomanticTitle?: string;
  bannerRomanticSlogan?: string;
  waRomanticMessage?: string;
  enableHeartRain: boolean;
  startDate?: string;
  endDate?: string;
}
