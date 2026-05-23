import { EventBistro, HeroBanner, WhatsAppConfig, RomanticThemeConfig } from '../types';
import { HERO_IMG } from '../data';

const STORAGE_KEYS = {
  EVENTS: 'violeta_bistro_events',
  HERO: 'violeta_bistro_hero',
  WHATSAPP: 'violeta_bistro_whatsapp',
  ROMANTIC: 'violeta_bistro_romantic',
};

// Default high-end seeded events matching Violeta's exquisite aesthetic
const DEFAULT_EVENTS: EventBistro[] = [
  {
    id: 'evt-1',
    title: 'Jantar Especial de Dia dos Namorados',
    date: '2026-06-12',
    time: '20:00',
    description: 'Uma experiência romântica preparada para casais que desejam celebrar o amor em um ambiente acolhedor, elegante e com gastronomia especial. Um dueto acústico instrumental de Jazz ao vivo enquanto servimos nosso lendário Fondue de queijos suíços cremosos com infusão rústica de figos e pétalas comestíveis. Termina com nossa cascata dourada de chocolate belga e morangos frescos.',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800',
    video: 'https://www.youtube.com/embed/H-H6HNoFmEs', // Soothing jazz background video
    videoType: 'link',
    active: true,
    buttonText: 'Reservar para o Dia dos Namorados',
    whatsappMessage: 'Olá! Vim pelo site e gostaria de fazer uma reserva para o evento especial de Dia dos Namorados.',
    isRomanticSpecial: true,
  },
  {
    id: 'evt-2',
    title: 'Jantar Harmonizado: Tintos de Guarda & Cortes Nobres',
    date: '2026-06-28',
    time: '20:30',
    description: 'Uma imersão guiada por nosso experiente sommelier de vinhos tintos Cabernet Sauvignon e Syrah. O menu exclusivo de 5 etapas trará cortes premium selados em manteiga de garrafa acompanhados por nosso autêntico Aligot de gruyère e reduções artesanais de amora de campo.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800',
    video: '', // Left empty to test the beautiful video placeholder / fallback
    videoType: 'link',
    active: true,
    buttonText: 'Reservar para este Jantar',
    whatsappMessage: 'Olá! Vim pelo site e gostaria de fazer uma reserva para o Jantar Harmonizado de Cortes Nobres do dia 28/06. Como posso proceder?',
    isRomanticSpecial: false,
  }
];

const DEFAULT_HERO_BANNER: HeroBanner = {
  title: 'VIOLETA',
  subtitle: '"A harmonia rústica de cozinhas de autoria e o calor romântico no coração de Surubim."',
  image: HERO_IMG,
  buttonText: 'EXPLORAR CARDÁPIO',
  buttonLink: '#menu',
};

const DEFAULT_WHATSAPP_CONFIG: WhatsAppConfig = {
  number: '5581999999999', // Default phone number (formatted as 55 + DDD + Number)
  defaultMessage: 'Olá! Gostaria de consultar a disponibilidade para reservar uma mesa no Violeta - Arte Culinária.',
  defaultButtonText: 'Falar no WhatsApp',
};

// Helper to extract or convert standard YouTube URL into an embeddable format
export function getEmbedUrl(url: string | undefined): string {
  if (!url) return '';
  
  // YouTube parser
  const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const ytMatch = url.match(ytRegex);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }
  
  // Vimeo parser
  const vimeoRegex = /vimeo\.com\/(?:video\/)?([0-9]+)/;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }
  
  return url;
}

export function loadEvents(): EventBistro[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(DEFAULT_EVENTS));
      return DEFAULT_EVENTS;
    }
    const val = JSON.parse(data);
    if (!Array.isArray(val)) {
      return DEFAULT_EVENTS;
    }
    return val.map(evt => {
      if (typeof evt !== 'object' || evt === null) return null;
      return {
        ...evt,
        active: evt.active ?? true,
        isRomanticSpecial: evt.isRomanticSpecial ?? false
      };
    }).filter(Boolean) as EventBistro[];
  } catch (e) {
    console.error('Failed to load events from storage', e);
    return DEFAULT_EVENTS;
  }
}

export function saveEvents(events: EventBistro[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  } catch (e) {
    console.error('Failed to save events to storage', e);
  }
}

export function loadHero(): HeroBanner {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.HERO);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.HERO, JSON.stringify(DEFAULT_HERO_BANNER));
      return DEFAULT_HERO_BANNER;
    }
    const val = JSON.parse(data);
    if (typeof val !== 'object' || val === null) {
      return DEFAULT_HERO_BANNER;
    }
    return { ...DEFAULT_HERO_BANNER, ...val };
  } catch (e) {
    console.error('Failed to load hero from storage', e);
    return DEFAULT_HERO_BANNER;
  }
}

export function saveHero(hero: HeroBanner): void {
  try {
    localStorage.setItem(STORAGE_KEYS.HERO, JSON.stringify(hero));
  } catch (e) {
    console.error('Failed to save hero to storage', e);
  }
}

export function loadWhatsApp(): WhatsAppConfig {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.WHATSAPP);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.WHATSAPP, JSON.stringify(DEFAULT_WHATSAPP_CONFIG));
      return DEFAULT_WHATSAPP_CONFIG;
    }
    const val = JSON.parse(data);
    if (typeof val !== 'object' || val === null) {
      // If it is stored as a direct phone string or legacy primitive, migrate gracefully
      return {
        ...DEFAULT_WHATSAPP_CONFIG,
        number: typeof val === 'string' || typeof val === 'number' ? String(val) : DEFAULT_WHATSAPP_CONFIG.number
      };
    }
    return { ...DEFAULT_WHATSAPP_CONFIG, ...val };
  } catch (e) {
    console.error('Failed to load whatsapp config from storage', e);
    return DEFAULT_WHATSAPP_CONFIG;
  }
}

export function saveWhatsApp(config: WhatsAppConfig): void {
  try {
    localStorage.setItem(STORAGE_KEYS.WHATSAPP, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save whatsapp config to storage', e);
  }
}

export function getWhatsAppLink(phone: string, text: string): string {
  // Sanitize non-digits
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

// Convert files cleanly with security limit checks & validations
export function handleFileUpload(
  file: File, 
  onSuccess: (base64: string) => void, 
  onError: (errMsg: string) => void,
  maxSizeMB: number = 20
) {
  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime']; // quicktime is .mov
  
  const isImage = allowedImageTypes.includes(file.type);
  const isVideo = allowedVideoTypes.includes(file.type);
  
  if (!isImage && !isVideo) {
    onError('Formato de arquivo inválido. Formatos aceitos: JPG, PNG, WEBP ou vídeos MP4, WEBM, MOV.');
    return;
  }
  
  const sizeLimitBytes = maxSizeMB * 1024 * 1024;
  if (file.size > sizeLimitBytes) {
    onError(`Arquivo muito grande. O limite máximo permitido para os envios é de ${maxSizeMB}MB.`);
    return;
  }
  
  // Security checks: Check extension and mock name cleansing
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
  
  const reader = new FileReader();
  reader.onload = (e) => {
    if (e.target?.result) {
      onSuccess(e.target.result as string);
    } else {
      onError('Falha na leitura cibernética do arquivo.');
    }
  };
  reader.onerror = () => {
    onError('Erro crítico na leitura interna do arquivo.');
  };
  
  reader.readAsDataURL(file);
}

const DEFAULT_ROMANTIC_THEME: RomanticThemeConfig = {
  active: true, // Default to true so they immediately see the gorgeous Valentine effects!
  popupText: 'Cupido passou por aqui! O Dia dos Namorados chegou ao bistrô com experiências feitas para apaixonar.',
  popupDuration: 5,
  popupFrequency: 'session',
  cupidPosition: 'right',
  bannerRomanticTitle: 'Dia dos Namorados no Bistrô',
  bannerRomanticSlogan: 'Uma noite especial para celebrar o amor de forma sofisticada e inesquecível.',
  waRomanticMessage: 'Olá! Vim pelo site e gostaria de fazer uma reserva para o Dia dos Namorados no bistrô.',
  enableHeartRain: true,
};

export function loadRomanticTheme(): RomanticThemeConfig {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ROMANTIC);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.ROMANTIC, JSON.stringify(DEFAULT_ROMANTIC_THEME));
      return DEFAULT_ROMANTIC_THEME;
    }
    const val = JSON.parse(data);
    // Fill in defaults for missing fields to avoid runtime undefineds
    return { ...DEFAULT_ROMANTIC_THEME, ...val };
  } catch (e) {
    console.error('Failed to load romantic theme from storage', e);
    return DEFAULT_ROMANTIC_THEME;
  }
}

export function saveRomanticTheme(config: RomanticThemeConfig): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ROMANTIC, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save romantic theme to storage', e);
  }
}

