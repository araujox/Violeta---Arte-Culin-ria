import { EventBistro, HeroBanner, WhatsAppConfig, RomanticThemeConfig, SpecialCampaignConfig, MenuItem } from '../types';
import { HERO_IMG, VIOLETA_MENU } from '../data';

const STORAGE_KEYS = {
  EVENTS: 'violeta_bistro_events',
  HERO: 'violeta_bistro_hero',
  WHATSAPP: 'violeta_bistro_whatsapp',
  ROMANTIC: 'violeta_bistro_romantic',
  NATAL: 'violeta_bistro_natal',
  PASCOA: 'violeta_bistro_pascoa',
  ANO_NOVO: 'violeta_bistro_anonovo',
  MENU: 'violeta_bistro_menu',
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
    // Self-healing check: check if any event image is a massive data URL and try to compress
    const eventWithDataUrl = events.find(evt => evt.image && evt.image.startsWith('data:image'));
    if (eventWithDataUrl) {
      console.log('Found event image as data URL, attempting auto-compression to resolve quota issue...');
      const compressionPromises = events.map(evt => {
        return new Promise<EventBistro>((resolve) => {
          if (evt.image && evt.image.startsWith('data:image')) {
            compressImage(
              evt.image,
              (compressed) => resolve({ ...evt, image: compressed }),
              () => resolve(evt)
            );
          } else {
            resolve(evt);
          }
        });
      });

      Promise.all(compressionPromises).then(optimizedEvents => {
        try {
          localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(optimizedEvents));
          console.log('Successfully optimized and saved all event images after quota auto-compression!');
        } catch (retryError) {
          console.error('Save events failed even after image optimization', retryError);
          handleStorageQuotaExceeded('violeta_bistro_events', retryError);
        }
      });
    } else {
      handleStorageQuotaExceeded('violeta_bistro_events', e);
    }
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
    const loadedHero = { ...DEFAULT_HERO_BANNER, ...val };
    if (loadedHero.image && (loadedHero.image.includes('viva_veneto_hero') || loadedHero.image === '')) {
      loadedHero.image = '/cardapio/banner violeta.png';
      localStorage.setItem(STORAGE_KEYS.HERO, JSON.stringify(loadedHero));
    }
    return loadedHero;
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
    // Self-healing check: check if hero image is a massive data URL and try to compress
    if (hero.image && hero.image.startsWith('data:image')) {
      console.log('Hero image is a data URL, attempting auto-compression to resolve quota issue...');
      compressImage(
        hero.image,
        (compressedImage) => {
          try {
            const optimizedHero = { ...hero, image: compressedImage };
            localStorage.setItem(STORAGE_KEYS.HERO, JSON.stringify(optimizedHero));
            console.log('Successfully optimized and saved hero banner after quota auto-compression!');
          } catch (retryError) {
            console.error('Save failed even after image optimization', retryError);
            handleStorageQuotaExceeded('violeta_bistro_hero', retryError);
          }
        },
        () => {
          handleStorageQuotaExceeded('violeta_bistro_hero', e);
        }
      );
    } else {
      handleStorageQuotaExceeded('violeta_bistro_hero', e);
    }
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

// Helper function to compress images using a hidden HTML canvas
export function compressImage(
  base64Str: string,
  onSuccess: (compressedBase64: string) => void,
  onError: (errMsg: string) => void
) {
  // Check if it is a base64 image
  if (!base64Str || !base64Str.startsWith('data:image')) {
    onSuccess(base64Str);
    return;
  }

  const img = new Image();
  img.onload = () => {
    try {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 1200; // Optimal resolutions for hero & previews
      const MAX_HEIGHT = 1200;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width = Math.round((width * MAX_HEIGHT) / height);
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        onSuccess(base64Str);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Compress to high performance, sharp JPEG representation with 0.7 quality
      // This will easily bring a multi-megabyte image down to 80KB-190KB
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
      onSuccess(compressedDataUrl);
    } catch (err) {
      console.error('Image compression failed, fallback to original', err);
      onSuccess(base64Str);
    }
  };
  img.onerror = () => {
    onError('Erro ao processar imagem para compressão.');
  };
  img.src = base64Str;
}

function handleStorageQuotaExceeded(key: string, error: any) {
  const isQuotaError = 
    (error && error instanceof DOMException && (
      // everything except Firefox
      error.code === 22 ||
      // Firefox
      error.code === 1014 ||
      // test name field too
      error.name === 'QuotaExceededError' ||
      error.name === 'NS_ERROR_DOM_QUOTA_REACHED'
    )) || (error && (String(error).toLowerCase().includes('quota') || String(error).toLowerCase().includes('setitem')));

  if (isQuotaError) {
    alert(
      "⚠️ Limite de Armazenamento Excedido!\n\n" +
      "A imagem que você tentou adicionar contém muitos dados e ultrapassou a capacidade máxima de salvamento local do navegador.\n\n" +
      "Como Corrigir:\n" +
      "1. Recomendamos usar um link padrão de imagem da internet (ex: do Unsplash).\n" +
      "2. Ou, então, faça o upload da imagem local usando o botão \"Carregar Arquivo\", que reduz e otimiza o peso da imagem automaticamente de forma inteligente.\n\n" +
      "As alterações foram aplicadas visualmente na página mas não puderam ser gravadas na memória permanente do navegador até você carregar uma imagem otimizada."
    );
  }
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
      const resultStr = e.target.result as string;
      if (isImage) {
        compressImage(
          resultStr,
          (compressed) => onSuccess(compressed),
          (err) => onError(err)
        );
      } else {
        onSuccess(resultStr);
      }
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

const DEFAULT_NATAL_THEME: SpecialCampaignConfig = {
  active: false,
  popupText: 'Ho ho ho! O Natal chegou ao Bistrô Violeta. Venha celebrar a magia da época mais iluminada do ano com um banquete inesquecível feito sob medida para sua família!',
  popupDuration: 5,
  popupFrequency: 'session',
  elementPosition: 'right',
  bannerTitle: 'Natal Mágico no Violeta',
  bannerSlogan: 'Viva o espírito de luz e partilha com pratos autorais, vinhos finos e decorações acolhedoras.',
  waMessage: 'Olá! Gostaria de fazer uma reserva especial para as comemorações ou ceia de Natal no Bistrô Violeta.',
  enableEffect: true,
};

export function loadNatalTheme(): SpecialCampaignConfig {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.NATAL);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.NATAL, JSON.stringify(DEFAULT_NATAL_THEME));
      return DEFAULT_NATAL_THEME;
    }
    const val = JSON.parse(data);
    return { ...DEFAULT_NATAL_THEME, ...val };
  } catch (e) {
    console.error('Failed to load natal theme from storage', e);
    return DEFAULT_NATAL_THEME;
  }
}

export function saveNatalTheme(config: SpecialCampaignConfig): void {
  try {
    localStorage.setItem(STORAGE_KEYS.NATAL, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save natal theme to storage', e);
  }
}

const DEFAULT_PASCOA_THEME: SpecialCampaignConfig = {
  active: false,
  popupText: 'Uma Páscoa doce e sofisticada! Descubra nossos bacalhaus artesanais e as sobremesas gourmet de chocolate belga preparadas exclusivamente por nossa chef.',
  popupDuration: 5,
  popupFrequency: 'session',
  elementPosition: 'left',
  bannerTitle: 'Páscoa de Sabores no Bistrô',
  bannerSlogan: 'Celebração com a alta gastronomia rústica e sobremesas especiais de puro chocolate belga.',
  waMessage: 'Olá! Gostaria de solicitar informações de disponibilidade e reservar mesa para almoço especial de Páscoa.',
  enableEffect: true,
};

export function loadPascoaTheme(): SpecialCampaignConfig {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PASCOA);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.PASCOA, JSON.stringify(DEFAULT_PASCOA_THEME));
      return DEFAULT_PASCOA_THEME;
    }
    const val = JSON.parse(data);
    return { ...DEFAULT_PASCOA_THEME, ...val };
  } catch (e) {
    console.error('Failed to load pascoa theme from storage', e);
    return DEFAULT_PASCOA_THEME;
  }
}

export function savePascoaTheme(config: SpecialCampaignConfig): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PASCOA, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save pascoa theme to storage', e);
  }
}

const DEFAULT_ANO_NOVO_THEME: SpecialCampaignConfig = {
  active: false,
  popupText: 'Um brinde ao amanhã! Venha celebrar o Réveillon e a chegada de um fascinante Ano Novo no Bistrô Violeta. Espumantes finos, boa música e energia brilhante.',
  popupDuration: 5,
  popupFrequency: 'session',
  elementPosition: 'top-right',
  bannerTitle: 'Réveillon Dourado Violeta',
  bannerSlogan: 'Brinde às conquistas futuras com haute cuisine de autoria e espumantes gelados em clima festivo.',
  waMessage: 'Olá! Gostaria de reservar nossa mesa ou checar o cardápio da virada especial de Ano Novo no bistrô.',
  enableEffect: true,
};

export function loadAnoNovoTheme(): SpecialCampaignConfig {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ANO_NOVO);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.ANO_NOVO, JSON.stringify(DEFAULT_ANO_NOVO_THEME));
      return DEFAULT_ANO_NOVO_THEME;
    }
    const val = JSON.parse(data);
    return { ...DEFAULT_ANO_NOVO_THEME, ...val };
  } catch (e) {
    console.error('Failed to load ano novo theme from storage', e);
    return DEFAULT_ANO_NOVO_THEME;
  }
}

export function saveAnoNovoTheme(config: SpecialCampaignConfig): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ANO_NOVO, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save ano novo theme to storage', e);
  }
}

export function loadMenu(): MenuItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.MENU);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(VIOLETA_MENU));
      return VIOLETA_MENU;
    }
    const val = JSON.parse(data);
    if (!Array.isArray(val)) {
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(VIOLETA_MENU));
      return VIOLETA_MENU;
    }
    
    // Smart Migration: Check if any default seeds need update or if we have missing defaults
    let changed = false;
    const seedMap = new Map<string, MenuItem>();
    const seedByName = new Map<string, MenuItem>();
    
    for (const item of VIOLETA_MENU) {
      seedMap.set(item.id, item);
      seedByName.set(item.name.toLowerCase(), item);
    }

    const updatedVal: MenuItem[] = [];
    
    for (const item of val) {
      const seedItem = seedMap.get(item.id) || seedByName.get(item.name.toLowerCase());
      if (seedItem) {
        // Update images from Unsplash to pristine local ones, or fill missing pairings/anecdotes
        const isLegacyUnsplash = item.image && item.image.includes('unsplash.com') && seedItem.image.startsWith('/cardapio/');
        const isMissingFields = !item.pairing || !item.anecdote;
        
        if (isLegacyUnsplash || isMissingFields) {
          updatedVal.push({
            ...item,
            image: isLegacyUnsplash ? seedItem.image : item.image,
            description: item.description || seedItem.description,
            pairing: item.pairing || seedItem.pairing || '',
            anecdote: item.anecdote || seedItem.anecdote || '',
            isChefRecommended: item.isChefRecommended !== undefined ? item.isChefRecommended : seedItem.isChefRecommended
          });
          changed = true;
        } else {
          updatedVal.push(item);
        }
      } else {
        // Preserve any custom items the user created
        updatedVal.push(item);
      }
    }

    // Insert any missing default seed items
    const currentNames = new Set(updatedVal.map(i => i.name.toLowerCase()));
    
    for (const seedItem of VIOLETA_MENU) {
      if (!currentNames.has(seedItem.name.toLowerCase())) {
        updatedVal.push(seedItem);
        changed = true;
      }
    }

    if (changed) {
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(updatedVal));
      return updatedVal;
    }
    
    return val;
  } catch (e) {
    console.error('Failed to load menu from storage', e);
    return VIOLETA_MENU;
  }
}

export function saveMenu(menuItems: MenuItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(menuItems));
  } catch (e) {
    console.error('Failed to save menu to storage', e);
    // Auto-compress menu pictures if any of them are oversized data URL
    const oversizedItem = menuItems.find(item => item.image && item.image.startsWith('data:image'));
    if (oversizedItem) {
      console.log('Oversized menu image base64, compressing to prevent quota overflow...');
      const compressionPromises = menuItems.map(item => {
        return new Promise<MenuItem>((resolve) => {
          if (item.image && item.image.startsWith('data:image')) {
            compressImage(
              item.image,
              (compressed) => resolve({ ...item, image: compressed }),
              () => resolve(item)
            );
          } else {
            resolve(item);
          }
        });
      });

      Promise.all(compressionPromises).then(optimizedMenu => {
        try {
          localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(optimizedMenu));
          console.log('Successfully saved menu after quota handling and compression.');
        } catch (retryErr) {
          console.error('Failed to save menu even after compression', retryErr);
          handleStorageQuotaExceeded('violeta_bistro_menu', retryErr);
        }
      });
    } else {
      handleStorageQuotaExceeded('violeta_bistro_menu', e);
    }
  }
}


