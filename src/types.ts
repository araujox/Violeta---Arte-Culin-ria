export interface MenuItem {
  id: string;
  name: string;
  category: 'entradas' | 'risotos' | 'massas' | 'parmegiana' | 'saladas' | 'sobremesas' | 'almoco' | 'kids' | 'drinks';
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

export interface SpecialCampaignConfig {
  active: boolean;
  popupText: string;
  popupDuration: number; // in seconds, default 5
  popupFrequency: 'session' | 'always';
  elementPosition: 'left' | 'right' | 'top-right';
  bannerTitle?: string;
  bannerSlogan?: string;
  waMessage?: string;
  enableEffect: boolean;
  startDate?: string;
  endDate?: string;
}

export interface ExperienceConfig {
  tag: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  image: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  tagFontSize?: string;
  titleFontSize?: string;
  paragraph1FontSize?: string;
  paragraph2FontSize?: string;
}


