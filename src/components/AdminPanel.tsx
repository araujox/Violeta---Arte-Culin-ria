import React, { useState, useEffect, useRef } from 'react';
import { 
  Lock, Eye, EyeOff, Save, LogOut, Plus, Trash2, Edit3, 
  Upload, X, Check, AlertCircle, RefreshCw, Smartphone, 
  Calendar, Clock, FileText, Image, Video, HelpCircle, ArrowLeft, ToggleLeft, ToggleRight, Heart,
  Sparkles, Gift, Search
} from 'lucide-react';
import { EventBistro, HeroBanner, WhatsAppConfig, RomanticThemeConfig, SpecialCampaignConfig, MenuItem } from '../types';
import { handleFileUpload, getEmbedUrl } from '../utils/adminStorage';

interface AdminPanelProps {
  onLightMode?: boolean; // backwards compatibility if any
  onClose: () => void;
  events: EventBistro[];
  onSaveEvents: (events: EventBistro[]) => void;
  hero: HeroBanner;
  onSaveHero: (hero: HeroBanner) => void;
  whatsAppConfig: WhatsAppConfig;
  onSaveWhatsApp: (config: WhatsAppConfig) => void;
  romanticTheme: RomanticThemeConfig;
  onSaveRomanticTheme: (config: RomanticThemeConfig) => void;
  natalTheme: SpecialCampaignConfig;
  onSaveNatalTheme: (config: SpecialCampaignConfig) => void;
  pascoaTheme: SpecialCampaignConfig;
  onSavePascoaTheme: (config: SpecialCampaignConfig) => void;
  anoNovoTheme: SpecialCampaignConfig;
  onSaveAnoNovoTheme: (config: SpecialCampaignConfig) => void;
  menuItems: MenuItem[];
  onSaveMenuItems: (items: MenuItem[]) => void;
  onNotify: (msg: string) => void;
}

export default function AdminPanel({
  onClose,
  events,
  onSaveEvents,
  hero,
  onSaveHero,
  whatsAppConfig,
  onSaveWhatsApp,
  romanticTheme,
  onSaveRomanticTheme,
  natalTheme,
  onSaveNatalTheme,
  pascoaTheme,
  onSavePascoaTheme,
  anoNovoTheme,
  onSaveAnoNovoTheme,
  menuItems,
  onSaveMenuItems,
  onNotify
}: AdminPanelProps) {
  // Authentication states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Active Admin tab
  const [activeTab, setActiveTab] = useState<'events' | 'banner' | 'whatsapp' | 'romantic' | 'natal' | 'pascoa' | 'anonovo' | 'menu'>('events');

  // Hero form inputs
  const [heroTitle, setHeroTitle] = useState(hero?.title ?? '');
  const [heroSubtitle, setHeroSubtitle] = useState(hero?.subtitle ?? '');
  const [heroImage, setHeroImage] = useState(hero?.image ?? '');
  const [heroBtnText, setHeroBtnText] = useState(hero?.buttonText ?? '');
  const [heroBtnLink, setHeroBtnLink] = useState(hero?.buttonLink ?? '');

  // WhatsApp form inputs
  const [waNumber, setWaNumber] = useState(whatsAppConfig?.number ?? '');
  const [waDefaultMsg, setWaDefaultMsg] = useState(whatsAppConfig?.defaultMessage ?? '');
  const [waBtnText, setWaBtnText] = useState(whatsAppConfig?.defaultButtonText ?? '');

  // Romantic Campaign form inputs
  const [romanticActive, setRomanticActive] = useState(romanticTheme?.active ?? true);
  const [romanticPopupText, setRomanticPopupText] = useState(romanticTheme?.popupText ?? '');
  const [romanticPopupDuration, setRomanticPopupDuration] = useState(romanticTheme?.popupDuration ?? 5);
  const [romanticPopupFrequency, setRomanticPopupFrequency] = useState(romanticTheme?.popupFrequency ?? 'session');
  const [romanticCupidPosition, setRomanticCupidPosition] = useState(romanticTheme?.cupidPosition ?? 'right');
  const [romanticBannerTitle, setRomanticBannerTitle] = useState(romanticTheme?.bannerRomanticTitle ?? '');
  const [romanticBannerSlogan, setRomanticBannerSlogan] = useState(romanticTheme?.bannerRomanticSlogan ?? '');
  const [romanticWaMessage, setRomanticWaMessage] = useState(romanticTheme?.waRomanticMessage ?? '');
  const [romanticHeartRain, setRomanticHeartRain] = useState(romanticTheme?.enableHeartRain ?? true);
  const [romanticStartDate, setRomanticStartDate] = useState(romanticTheme?.startDate ?? '2026-06-01');
  const [romanticEndDate, setRomanticEndDate] = useState(romanticTheme?.endDate ?? '2026-06-15');

  // Natal Campaign form inputs
  const [natalActive, setNatalActive] = useState(natalTheme?.active ?? false);
  const [natalPopupText, setNatalPopupText] = useState(natalTheme?.popupText ?? '');
  const [natalPopupDuration, setNatalPopupDuration] = useState(natalTheme?.popupDuration ?? 5);
  const [natalPopupFrequency, setNatalPopupFrequency] = useState(natalTheme?.popupFrequency ?? 'session');
  const [natalPosition, setNatalPosition] = useState(natalTheme?.elementPosition ?? 'right');
  const [natalBannerTitle, setNatalBannerTitle] = useState(natalTheme?.bannerTitle ?? '');
  const [natalBannerSlogan, setNatalBannerSlogan] = useState(natalTheme?.bannerSlogan ?? '');
  const [natalWaMessage, setNatalWaMessage] = useState(natalTheme?.waMessage ?? '');
  const [natalEnableEffect, setNatalEnableEffect] = useState(natalTheme?.enableEffect ?? true);

  // Pascoa Campaign form inputs
  const [pascoaActive, setPascoaActive] = useState(pascoaTheme?.active ?? false);
  const [pascoaPopupText, setPascoaPopupText] = useState(pascoaTheme?.popupText ?? '');
  const [pascoaPopupDuration, setPascoaPopupDuration] = useState(pascoaTheme?.popupDuration ?? 5);
  const [pascoaPopupFrequency, setPascoaPopupFrequency] = useState(pascoaTheme?.popupFrequency ?? 'session');
  const [pascoaPosition, setPascoaPosition] = useState(pascoaTheme?.elementPosition ?? 'left');
  const [pascoaBannerTitle, setPascoaBannerTitle] = useState(pascoaTheme?.bannerTitle ?? '');
  const [pascoaBannerSlogan, setPascoaBannerSlogan] = useState(pascoaTheme?.bannerSlogan ?? '');
  const [pascoaWaMessage, setPascoaWaMessage] = useState(pascoaTheme?.waMessage ?? '');
  const [pascoaEnableEffect, setPascoaEnableEffect] = useState(pascoaTheme?.enableEffect ?? true);

  // Ano Novo Campaign form inputs
  const [anoNovoActive, setAnoNovoActive] = useState(anoNovoTheme?.active ?? false);
  const [anoNovoPopupText, setAnoNovoPopupText] = useState(anoNovoTheme?.popupText ?? '');
  const [anoNovoPopupDuration, setAnoNovoPopupDuration] = useState(anoNovoTheme?.popupDuration ?? 5);
  const [anoNovoPopupFrequency, setAnoNovoPopupFrequency] = useState(anoNovoTheme?.popupFrequency ?? 'session');
  const [anoNovoPosition, setAnoNovoPosition] = useState(anoNovoTheme?.elementPosition ?? 'top-right');
  const [anoNovoBannerTitle, setAnoNovoBannerTitle] = useState(anoNovoTheme?.bannerTitle ?? '');
  const [anoNovoBannerSlogan, setAnoNovoBannerSlogan] = useState(anoNovoTheme?.bannerSlogan ?? '');
  const [anoNovoWaMessage, setAnoNovoWaMessage] = useState(anoNovoTheme?.waMessage ?? '');
  const [anoNovoEnableEffect, setAnoNovoEnableEffect] = useState(anoNovoTheme?.enableEffect ?? true);

  // Event editing state
  const [isEditingEvent, setIsEditingEvent] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  
  // Event form inputs
  const [evtTitle, setEvtTitle] = useState('');
  const [evtDate, setEvtDate] = useState('');
  const [evtTime, setEvtTime] = useState('');
  const [evtDescription, setEvtDescription] = useState('');
  const [evtImage, setEvtImage] = useState('');
  const [evtVideo, setEvtVideo] = useState('');
  const [evtVideoType, setEvtVideoType] = useState<'file' | 'link'>('link');
  const [evtActive, setEvtActive] = useState(true);
  const [evtButtonText, setEvtButtonText] = useState('Quero fazer minha reserva');
  const [evtWhatsappMessage, setEvtWhatsappMessage] = useState('');
  const [evtIsRomanticSpecial, setEvtIsRomanticSpecial] = useState(false);

  // Menu Item editing state
  const [isEditingMenu, setIsEditingMenu] = useState(false);
  const [editingMenuItemId, setEditingMenuItemId] = useState<string | null>(null);
  const [menuSearchQuery, setMenuSearchQuery] = useState('');
  const [menuFilterCategory, setMenuFilterCategory] = useState<'all' | 'entradas' | 'risotos' | 'massas' | 'parmegiana' | 'saladas' | 'sobremesas' | 'almoco' | 'kids' | 'drinks'>('all');

  // Menu Item form inputs
  const [menuItemName, setMenuItemName] = useState('');
  const [menuItemPrice, setMenuItemPrice] = useState('');
  const [menuItemDescription, setMenuItemDescription] = useState('');
  const [menuItemCategory, setMenuItemCategory] = useState<'entradas' | 'risotos' | 'massas' | 'parmegiana' | 'saladas' | 'sobremesas' | 'almoco' | 'kids' | 'drinks'>('entradas');
  const [menuItemImage, setMenuItemImage] = useState('');
  const [menuItemPairing, setMenuItemPairing] = useState('');
  const [menuItemAnecdote, setMenuItemAnecdote] = useState('');
  const [menuItemIsChefRecommended, setMenuItemIsChefRecommended] = useState(false);

  const menuFileInputRef = useRef<HTMLInputElement>(null);

  // Upload progress simulation or states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // File input refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);

  // Session check on mount
  useEffect(() => {
    const sessionToken = sessionStorage.getItem('violeta_admin_token');
    if (sessionToken === 'authorized_session_bistro') {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle Login authentication
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    // Secure default credentials (ideal to verify with server backend API in future)
    if (username.trim() === 'admin' && password === 'violeta2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('violeta_admin_token', 'authorized_session_bistro');
      onNotify('Painel Administrativo: Login efetuado com sucesso.');
    } else {
      setAuthError('Credenciais incorretas. Usuário ou senha de administrador inválidos.');
      onNotify('Tentativa de acesso negada ao Painel Administrativo.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('violeta_admin_token');
    // Clear URL hashes cleanly to return to plain state
    window.location.hash = '';
    onNotify('Logout efetuado. Retornando ao site público.');
    onClose();
  };

  // Banner Actions
  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveHero({
      title: heroTitle,
      subtitle: heroSubtitle,
      image: heroImage,
      buttonText: heroBtnText,
      buttonLink: heroBtnLink
    });
    onNotify('Banner Principal atualizado e salvo com sucesso.');
  };

  // WhatsApp config Actions
  const handleSaveWhatsAppConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveWhatsApp({
      number: waNumber,
      defaultMessage: waDefaultMsg,
      defaultButtonText: waBtnText,
    });
    onNotify('Configurações de canal de atendimento do WhatsApp atualizadas.');
  };

  // File upload processing function
  const startFileUpload = (file: File, type: 'image' | 'video' | 'hero' | 'menuItem') => {
    setIsUploading(true);
    setUploadProgress(15);
    setUploadError(null);

    // Simulate progressive network loader feeling
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 85) {
          clearInterval(interval);
          return 85;
        }
        return prev + 15;
      });
    }, 100);

    // Read local file safely with validations
    setTimeout(() => {
      // High limit of 100MB for premium video formats, 20MB for images
      const maxLimitMB = type === 'video' ? 100 : 20;

      handleFileUpload(
        file,
        (base64Data) => {
          clearInterval(interval);
          setUploadProgress(100);
          setTimeout(() => {
            setIsUploading(false);
            if (type === 'image') {
              setEvtImage(base64Data);
              onNotify('Miniatura do evento carregada com sucesso.');
            } else if (type === 'video') {
              setEvtVideo(base64Data);
              setEvtVideoType('file');
              onNotify('Arquivo de vídeo anexado localmente.');
            } else if (type === 'hero') {
              setHeroImage(base64Data);
              onNotify('Nova imagem principal do banner importada.');
            } else if (type === 'menuItem') {
              setMenuItemImage(base64Data);
              onNotify('Imagem do prato carregada e otimizada.');
            }
          }, 300);
        },
        (errorMsg) => {
          clearInterval(interval);
          setIsUploading(false);
          setUploadError(errorMsg);
          onNotify(`Falha no upload: ${errorMsg}`);
        },
        maxLimitMB
      );
    }, 600);
  };

  // Event list Actions
  const handleCreateNewClick = () => {
    setIsEditingEvent(true);
    setEditingEventId(null);
    setEvtTitle('');
    setEvtDate('');
    setEvtTime('');
    setEvtDescription('');
    setEvtImage('');
    setEvtVideo('');
    setEvtVideoType('link');
    setEvtActive(true);
    setEvtButtonText('Quero fazer minha reserva');
    setEvtWhatsappMessage('');
    setEvtIsRomanticSpecial(false);
    setUploadError(null);
  };

  const handleEditClick = (evt: EventBistro) => {
    setIsEditingEvent(true);
    setEditingEventId(evt.id);
    setEvtTitle(evt.title);
    setEvtDate(evt.date);
    setEvtTime(evt.time);
    setEvtDescription(evt.description);
    setEvtImage(evt.image || '');
    setEvtVideo(evt.video || '');
    setEvtVideoType(evt.videoType || 'link');
    setEvtActive(evt.active);
    setEvtButtonText(evt.buttonText || 'Quero fazer minha reserva');
    setEvtWhatsappMessage(evt.whatsappMessage || '');
    setEvtIsRomanticSpecial(evt.isRomanticSpecial || false);
    setUploadError(null);
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm('Tem certeza absoluta de que deseja excluir este evento? Todos os dados associados serão perdidos.')) {
      const filtered = events.filter(e => e.id !== id);
      onSaveEvents(filtered);
      onNotify('O evento selecionado foi excluído definitivamente.');
    }
  };

  const handleToggleEventActive = (id: string) => {
    const updated = events.map(e => e.id === id ? { ...e, active: !e.active } : e);
    onSaveEvents(updated);
    onNotify('Visibilidade pública do evento alterada.');
  };

  const handleSaveEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!evtTitle.trim() || !evtDate || !evtTime || !evtDescription.trim()) {
      onNotify('Por favor preencha os campos obrigatórios (Título, Data, Horário e Descrição).');
      return;
    }

    const prefilledMsg = evtWhatsappMessage.trim() || `Olá! Gostaria de reservar para o evento: ${evtTitle}`;

    if (editingEventId) {
      // Edit existing event
      const updated = events.map(evt => {
        if (evt.id === editingEventId) {
          return {
            ...evt,
            title: evtTitle,
            date: evtDate,
            time: evtTime,
            description: evtDescription,
            image: evtImage,
            video: evtVideo,
            videoType: evtVideoType,
            active: evtActive,
            buttonText: evtButtonText,
            whatsappMessage: prefilledMsg,
            isRomanticSpecial: evtIsRomanticSpecial
          };
        }
        return evt;
      });
      onSaveEvents(updated);
      onNotify('Evento atualizado e sincronizado com sucesso!');
    } else {
      // Add new event
      const newEvent: EventBistro = {
        id: 'evt-' + Date.now(),
        title: evtTitle,
        date: evtDate,
        time: evtTime,
        description: evtDescription,
        image: evtImage,
        video: evtVideo,
        videoType: evtVideoType,
        active: evtActive,
        buttonText: evtButtonText,
        whatsappMessage: prefilledMsg,
        isRomanticSpecial: evtIsRomanticSpecial
      };
      onSaveEvents([...events, newEvent]);
      onNotify('Novo evento adicionado com sucesso!');
    }

    setIsEditingEvent(false);
  };

  // Menu list actions
  const handleCreateNewMenuItemClick = () => {
    setIsEditingMenu(true);
    setEditingMenuItemId(null);
    setMenuItemName('');
    setMenuItemPrice('');
    setMenuItemDescription('');
    setMenuItemCategory('principais');
    setMenuItemImage('');
    setMenuItemPairing('');
    setMenuItemAnecdote('');
    setMenuItemIsChefRecommended(false);
    setUploadError(null);
  };

  const handleEditMenuItemClick = (item: MenuItem) => {
    setIsEditingMenu(true);
    setEditingMenuItemId(item.id);
    setMenuItemName(item.name);
    setMenuItemPrice(String(item.price));
    setMenuItemDescription(item.description);
    setMenuItemCategory(item.category);
    setMenuItemImage(item.image || '');
    setMenuItemPairing(item.pairing || '');
    setMenuItemAnecdote(item.anecdote || '');
    setMenuItemIsChefRecommended(!!item.isChefRecommended);
    setUploadError(null);
  };

  const handleDeleteMenuItem = (id: string) => {
    if (confirm('Tem certeza de que deseja excluir este prato?')) {
      const filtered = menuItems.filter(item => item.id !== id);
      onSaveMenuItems(filtered);
      onNotify('O prato selecionado foi removido.');
    }
  };

  const handleSaveMenuItemForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!menuItemName.trim()) {
      alert('Por favor, informe o nome do prato.');
      return;
    }
    const priceNum = parseFloat(menuItemPrice.replace(',', '.'));
    if (isNaN(priceNum) || priceNum <= 0) {
      alert('Por favor, informe um valor numérico válido.');
      return;
    }

    if (editingMenuItemId) {
      // Edit existing
      const updated = menuItems.map(item => 
        item.id === editingMenuItemId 
          ? { 
              ...item, 
              name: menuItemName, 
              price: priceNum, 
              description: menuItemDescription, 
              category: menuItemCategory, 
              image: menuItemImage || '/cardapio/camarão crocante.jpeg', // fallback if empty
              pairing: menuItemPairing, 
              anecdote: menuItemAnecdote, 
              isChefRecommended: menuItemIsChefRecommended 
            } 
          : item
      );
      onSaveMenuItems(updated);
      onNotify('Prato atualizado com sucesso!');
    } else {
      // Create new
      const newItem: MenuItem = {
        id: `menu-custom-${Date.now()}`,
        name: menuItemName,
        price: priceNum,
        description: menuItemDescription,
        category: menuItemCategory,
        image: menuItemImage || '/cardapio/camarão crocante.jpeg',
        pairing: menuItemPairing,
        anecdote: menuItemAnecdote,
        isChefRecommended: menuItemIsChefRecommended
      };
      onSaveMenuItems([...menuItems, newItem]);
      onNotify('Novo prato adicionado ao cardápio!');
    }
    setIsEditingMenu(false);
  };

  // Security Gate UI (Login page)
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center p-4">
        <div className="absolute inset-0 bg-[#0a0a0a]/50 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violeta-wine/10 to-transparent"></div>
        
        <div className="max-w-md w-full bg-[#0c0c0c] border border-gold-800/10 rounded-2xl p-8 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-violeta-wine/30 border border-gold-500/20 mx-auto flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-gold-400" />
            </div>
            <h1 className="font-serif text-2xl tracking-widest text-white uppercase font-bold">VIOLETA</h1>
            <p className="text-[10px] text-gold-400 tracking-[0.2em] uppercase mt-1">Gestão Administrativa</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            {authError && (
              <div className="p-3 bg-red-950/40 border border-red-500/20 rounded flex items-start gap-2.5 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{authError}</p>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">Nome de Usuário</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ex: admin"
                required
                className="w-full bg-[#121212] border border-gold-800/20 focus:border-gold-400 rounded p-3 text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5 relative">
              <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold col-span-2 block">Digite a Senha</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ex: ••••••••"
                  required
                  className="w-full bg-[#121212] border border-gold-800/20 focus:border-gold-400 rounded p-3 pr-10 text-sm text-white focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[9px] text-[#8E8376] italic mt-1 leading-relaxed">
                * Senha padrão seeded no código para o gerente da casa: <span className="text-gold-200">violeta2026</span>
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-neutral-800 hover:border-gold-800 text-neutral-400 py-3 text-xs uppercase tracking-widest font-medium rounded transition-colors cursor-pointer"
              >
                Voltar
              </button>
              <button
                type="submit"
                className="flex-1 bg-gold-500 hover:bg-gold-400 text-neutral-950 font-bold py-3 text-xs uppercase tracking-widest rounded transition-all cursor-pointer shadow-md"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Admin Dashboard UI (Authenticated)
  return (
    <div className="fixed inset-0 z-50 bg-[#060606] flex flex-col md:flex-row overflow-hidden">
      
      {/* 1. Left Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0a0a0a] border-b md:border-b-0 md:border-r border-gold-800/10 p-4 md:p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-4 md:space-y-8">
          <div className="hidden md:block">
            <h2 className="font-serif text-xl tracking-[0.2em] text-[#FCFBF8] font-bold">VIOLETA</h2>
            <p className="text-[9px] font-sans text-gold-400 tracking-[0.3em] uppercase mt-0.5">Painel de Controle</p>
          </div>

          <nav className="flex md:flex-col gap-1.5 md:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
            <button
              onClick={() => { setActiveTab('menu'); setIsEditingMenu(false); }}
              className={`flex items-center gap-2 md:gap-3 px-3.5 py-2 md:px-4 md:py-3 rounded-full md:rounded-lg text-[10px] md:text-xs uppercase tracking-wider font-semibold md:font-medium shrink-0 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'menu' ? 'bg-gold-500 text-neutral-950 font-bold' : 'text-gold-200 hover:bg-[#121212] border border-gold-500/20 md:border-transparent'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0" /> Cardápio Principal
            </button>
            <button
              onClick={() => { setActiveTab('events'); setIsEditingEvent(false); }}
              className={`flex items-center gap-2 md:gap-3 px-3.5 py-2 md:px-4 md:py-3 rounded-full md:rounded-lg text-[10px] md:text-xs uppercase tracking-wider font-semibold md:font-medium shrink-0 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'events' ? 'bg-gold-500 text-neutral-950 font-bold' : 'text-[#CCBEA3] hover:bg-[#121212] border border-gold-800/10 md:border-transparent'
              }`}
            >
              <Calendar className="w-4 h-4 shrink-0" /> Gerenciar Eventos
            </button>
            <button
              onClick={() => { setActiveTab('banner'); setIsEditingEvent(false); }}
              className={`flex items-center gap-2 md:gap-3 px-3.5 py-2 md:px-4 md:py-3 rounded-full md:rounded-lg text-[10px] md:text-xs uppercase tracking-wider font-semibold md:font-medium shrink-0 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'banner' ? 'bg-gold-500 text-neutral-950 font-bold' : 'text-[#CCBEA3] hover:bg-[#121212] border border-gold-800/10 md:border-transparent'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0" /> Editar Banner
            </button>
            <button
              onClick={() => { setActiveTab('whatsapp'); setIsEditingEvent(false); }}
              className={`flex items-center gap-2 md:gap-3 px-3.5 py-2 md:px-4 md:py-3 rounded-full md:rounded-lg text-[10px] md:text-xs uppercase tracking-wider font-semibold md:font-medium shrink-0 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'whatsapp' ? 'bg-gold-500 text-neutral-950 font-bold' : 'text-[#CCBEA3] hover:bg-[#121212] border border-gold-800/10 md:border-transparent'
              }`}
            >
              <Smartphone className="w-4 h-4 shrink-0" /> Canal WhatsApp
            </button>
            <button
              onClick={() => { setActiveTab('romantic'); setIsEditingEvent(false); }}
              className={`flex items-center gap-2 md:gap-3 px-3.5 py-2 md:px-4 md:py-3 rounded-full md:rounded-lg text-[10px] md:text-xs uppercase tracking-wider font-semibold md:font-medium shrink-0 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'romantic' ? 'bg-red-600 text-white font-bold' : 'text-[#CCBEA3] hover:bg-[#121212] border border-gold-800/10 md:border-transparent'
              }`}
            >
              <Heart className="w-4 h-4 shrink-0" /> Dia dos Namorados
            </button>
            <button
              onClick={() => { setActiveTab('natal'); setIsEditingEvent(false); }}
              className={`flex items-center gap-2 md:gap-3 px-3.5 py-2 md:px-4 md:py-3 rounded-full md:rounded-lg text-[10px] md:text-xs uppercase tracking-wider font-semibold md:font-medium shrink-0 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'natal' ? 'bg-[#0e7490] text-white font-bold' : 'text-[#CCBEA3] hover:bg-[#121212] border border-gold-800/10 md:border-transparent'
              }`}
            >
              <Gift className="w-4 h-4 shrink-0" /> Tema Natal
            </button>
            <button
              onClick={() => { setActiveTab('pascoa'); setIsEditingEvent(false); }}
              className={`flex items-center gap-2 md:gap-3 px-3.5 py-2 md:px-4 md:py-3 rounded-full md:rounded-lg text-[10px] md:text-xs uppercase tracking-wider font-semibold md:font-medium shrink-0 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'pascoa' ? 'bg-[#b45309] text-white font-bold' : 'text-[#CCBEA3] hover:bg-[#121212] border border-gold-800/10 md:border-transparent'
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0" /> Tema Páscoa
            </button>
            <button
              onClick={() => { setActiveTab('anonovo'); setIsEditingEvent(false); }}
              className={`flex items-center gap-2 md:gap-3 px-3.5 py-2 md:px-4 md:py-3 rounded-full md:rounded-lg text-[10px] md:text-xs uppercase tracking-wider font-semibold md:font-medium shrink-0 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'anonovo' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-[#CCBEA3] hover:bg-[#121212] border border-gold-800/10 md:border-transparent'
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0" /> Tema Ano Novo
            </button>
          </nav>
        </div>

        <div className="hidden md:block pt-6 border-t border-gold-800/10 mt-6 md:mt-0 space-y-4">
          <div className="bg-[#121212] p-3.5 rounded border border-gold-800/5">
            <span className="text-[8px] text-neutral-500 block uppercase tracking-widest font-semibold">Sessão Segura</span>
            <span className="text-[10px] text-gold-400">Usuário: Gerente Violeta</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-between px-4 py-2.5 w-full bg-red-950/20 hover:bg-red-950/40 border border-red-900/10 hover:border-red-500/30 text-red-400 text-xs uppercase tracking-widest font-bold rounded transition-all cursor-pointer"
          >
            Sair do Painel <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* 2. Main Content Board Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-10 relative">
        {/* Loader Overlay */}
        {isUploading && (
          <div className="absolute inset-0 bg-[#050505]/90 z-40 flex flex-col items-center justify-center">
            <RefreshCw className="w-12 h-12 text-gold-400 animate-spin mb-4" />
            <h4 className="text-sm font-semibold uppercase tracking-widest text-[#FCFBF8]">Processando Arquivo Local...</h4>
            <div className="w-64 h-1.5 bg-[#121212] rounded-full overflow-hidden mt-3 border border-gold-800/10">
              <div 
                className="h-full bg-gold-400 transition-all duration-150" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-neutral-500 mt-2 uppercase tracking-wide">Higienizando nome e prevenindo ameaças ({uploadProgress}%)</p>
          </div>
        )}

        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Header Title with quick back site toggle */}
          <div className="flex justify-between items-center pb-4 border-b border-gold-800/10 gap-2">
            <div>
              <h1 className="font-serif text-lg md:text-2xl text-[#FCFBF8] tracking-wider md:tracking-widest uppercase">
                {activeTab === 'menu' && 'Cardápio Digital Violeta'}
                {activeTab === 'events' && 'Gestão de Próximos Eventos'}
                {activeTab === 'banner' && 'Personalizar Front Banner'}
                {activeTab === 'whatsapp' && 'Configurações de Integração WhatsApp'}
                {activeTab === 'romantic' && 'Tema Especial: Dia dos Namorados'}
                {activeTab === 'natal' && 'Tema Especial: Natal no Bistrô'}
                {activeTab === 'pascoa' && 'Tema Especial: Páscoa do Chefe'}
                {activeTab === 'anonovo' && 'Tema Especial: Réveillon Dourado'}
              </h1>
              <p className="text-[10px] md:text-xs text-[#8E8376] mt-1">Configure o site em tempo real sem conhecimento de código.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleLogout}
                className="md:hidden flex items-center justify-center p-2 rounded border border-red-900/30 text-red-400 hover:bg-red-950/20 transition-all cursor-pointer shrink-0"
                title="Sair do Painel"
                type="button"
              >
                <LogOut className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-gold-800/20 text-[#CCBEA3] text-xs uppercase tracking-widest font-semibold hover:border-gold-400 transition-colors cursor-pointer whitespace-nowrap"
                type="button"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Ver Site</span>
              </button>
            </div>
          </div>

          {/* TAB: CARDÁPIO MANAGEMENT */}
          {activeTab === 'menu' && (
            <div className="space-y-6">
              {!isEditingMenu ? (
                /* list view */
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-[#121212] p-4 rounded-xl border border-gold-800/15">
                    <span className="text-xs font-semibold text-[#CCBEA3] uppercase">Gestão Fina de Pratos</span>
                    <button
                      onClick={handleCreateNewMenuItemClick}
                      className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-neutral-950 font-bold text-xs uppercase tracking-widest py-2 px-4 rounded transition-all cursor-pointer"
                      type="button"
                    >
                      <Plus className="w-4 h-4" /> Novo Prato
                    </button>
                  </div>

                  {/* Search and Category Filters */}
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-500" />
                      <input
                        type="text"
                        placeholder="Buscar pratos por nome..."
                        value={menuSearchQuery}
                        onChange={(e) => setMenuSearchQuery(e.target.value)}
                        className="w-full bg-[#121212]/60 border border-gold-800/15 focus:border-gold-500/50 rounded-lg p-3 pl-10 text-sm text-[#FCFBF8] focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="flex overflow-x-auto gap-2 pb-1 md:pb-0 scrollbar-hide max-w-full">
                      {(['all', 'entradas', 'risotos', 'massas', 'parmegiana', 'saladas', 'sobremesas', 'almoco', 'kids', 'drinks'] as const).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setMenuFilterCategory(cat)}
                          className={`text-[9px] uppercase tracking-wider font-semibold px-2.5 py-2.5 rounded-lg border transition-colors shrink-0 cursor-pointer ${
                            menuFilterCategory === cat
                              ? 'bg-gold-500 text-neutral-950 border-gold-400 font-bold'
                              : 'bg-neutral-950/20 text-[#CCBEA3] border-gold-800/10 hover:border-gold-500/30'
                          }`}
                          type="button"
                        >
                          {cat === 'all' && 'Todos'}
                          {cat === 'entradas' && 'Entradas'}
                          {cat === 'risotos' && 'Risotos'}
                          {cat === 'massas' && 'Massas'}
                          {cat === 'parmegiana' && 'Parmegianas'}
                          {cat === 'saladas' && 'Saladas'}
                          {cat === 'sobremesas' && 'Sobremesas'}
                          {cat === 'almoco' && 'Almoço'}
                          {cat === 'kids' && 'Kids'}
                          {cat === 'drinks' && 'Drinks'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dishes Cards Grid / List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {menuItems
                      .filter(item => {
                        const matchesCategory = menuFilterCategory === 'all' || item.category === menuFilterCategory;
                        const matchesSearch = item.name.toLowerCase().includes(menuSearchQuery.toLowerCase()) || 
                                              item.description.toLowerCase().includes(menuSearchQuery.toLowerCase());
                        return matchesCategory && matchesSearch;
                      })
                      .map((item) => (
                        <div
                          key={item.id}
                          className="bg-[#0b0b0b] border border-gold-800/10 hover:border-gold-500/20 p-4 rounded-xl flex items-start gap-4 transition-colors relative group"
                        >
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-neutral-950 border border-gold-800/10 shadow relative">
                            {item.isChefRecommended && (
                              <span className="absolute top-1 left-1 bg-gold-500 text-neutral-950 text-[7px] font-bold px-1 py-0.5 rounded uppercase tracking-wider shadow z-10">
                                Chef
                              </span>
                            )}
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          <div className="flex-1 space-y-1">
                            <div className="flex justify-between items-start gap-2">
                              <div>
                                <h4 className="font-serif text-[#FCFBF8] text-sm tracking-wide font-medium">{item.name}</h4>
                                <span className="inline-block bg-neutral-900 border border-gold-800/10 text-neutral-400 text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded-md mt-0.5 font-bold">
                                  {item.category}
                                </span>
                              </div>
                              <span className="font-mono text-xs font-bold text-gold-400 min-w-fit">R$ {item.price},00</span>
                            </div>

                            <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">{item.description}</p>

                            {item.pairing && (
                              <p className="text-[9px] text-[#A69B85] italic mt-1 line-clamp-1">🍷 Harmonização: {item.pairing}</p>
                            )}

                            <div className="flex gap-2 justify-end pt-3 mt-1 border-t border-gold-800/5">
                              <button
                                onClick={() => handleEditMenuItemClick(item)}
                                className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-[#CCBEA3] hover:text-gold-400 font-semibold p-1 transition-colors cursor-pointer border border-transparent"
                                type="button"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-[#CCBEA3]" /> Editar
                              </button>
                              <button
                                onClick={() => handleDeleteMenuItem(item.id)}
                                className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-red-500 hover:text-red-300 font-semibold p-1 transition-colors cursor-pointer border border-transparent"
                                type="button"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-red-500" /> Excluir
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  {menuItems.filter(item => {
                    const matchesCategory = menuFilterCategory === 'all' || item.category === menuFilterCategory;
                    const matchesSearch = item.name.toLowerCase().includes(menuSearchQuery.toLowerCase()) || 
                                          item.description.toLowerCase().includes(menuSearchQuery.toLowerCase());
                    return matchesCategory && matchesSearch;
                  }).length === 0 && (
                    <div className="bg-[#121212]/30 border border-gold-800/5 rounded-xl p-8 text-center text-neutral-500">
                      Nenhum prato correspondente encontrado para os filtros selecionados.
                    </div>
                  )}
                </div>
              ) : (
                /* Edit Form view */
                <form onSubmit={handleSaveMenuItemForm} className="space-y-6 bg-[#0a0a0a] border border-gold-800/10 rounded-xl p-5 md:p-6 text-justify">
                  <div className="flex justify-between items-center pb-4 border-b border-gold-800/10">
                    <h3 className="font-serif text-sm text-[#FCFBF8] tracking-widest uppercase font-semibold">
                      {editingMenuItemId ? 'Modificar Detalhes do Prato' : 'Adicionar Novo Prato Primoroso'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsEditingMenu(false)}
                      className="text-[#CCBEA3] hover:text-[#FCFBF8] text-xs uppercase tracking-widest font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" /> Cancelar
                    </button>
                  </div>

                  {/* Form fields layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* General properties */}
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Nome do Prato *</label>
                        <input
                          type="text"
                          value={menuItemName}
                          onChange={(e) => setMenuItemName(e.target.value)}
                          placeholder="Ex: Wellington de Mignon Violeta"
                          required
                          className="w-full bg-[#121212] border border-gold-800/15 focus:border-gold-500/50 rounded-lg p-3 text-sm text-white focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Preço (R$) *</label>
                          <input
                            type="text"
                            value={menuItemPrice}
                            onChange={(e) => setMenuItemPrice(e.target.value)}
                            placeholder="Ex: 89"
                            required
                            className="w-full bg-[#121212] border border-gold-800/15 focus:border-gold-500/50 rounded-lg p-3 text-sm text-white focus:outline-none transition-colors"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Categoria *</label>
                          <select
                            value={menuItemCategory}
                            onChange={(e) => setMenuItemCategory(e.target.value as any)}
                            className="w-full bg-[#121212] border border-gold-800/15 focus:border-gold-500/50 rounded-lg p-3 text-sm text-white focus:outline-none transition-colors"
                          >
                            <option value="entradas">Entradas</option>
                            <option value="risotos">Risotos</option>
                            <option value="massas">Massas (Fettuccine, Tagliatelle)</option>
                            <option value="parmegiana">Parmegianas</option>
                            <option value="saladas">Saladas</option>
                            <option value="sobremesas">Sobremesas</option>
                            <option value="almoco">Almoço Executivo</option>
                            <option value="kids">Kids</option>
                            <option value="drinks">Drinks e Coquetéis</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Descrição *</label>
                        <textarea
                          rows={3}
                          value={menuItemDescription}
                          onChange={(e) => setMenuItemDescription(e.target.value)}
                          placeholder="Ex: Filezinho mignon grelhado ao molho madeira denso com crosta de pistaches..."
                          required
                          className="w-full bg-[#121212] border border-gold-800/15 focus:border-gold-500/50 rounded-lg p-3 text-sm text-white focus:outline-none transition-colors resize-none"
                        ></textarea>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Harmonização sugerida</label>
                        <input
                          type="text"
                          value={menuItemPairing}
                          onChange={(e) => setMenuItemPairing(e.target.value)}
                          placeholder="Ex: Cabernet Sauvignon Envelhecido em Carvalho"
                          className="w-full bg-[#121212] border border-gold-800/15 focus:border-gold-500/50 rounded-lg p-3 text-sm text-white focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Anedota / História de Origem do Prato</label>
                        <input
                          type="text"
                          value={menuItemAnecdote}
                          onChange={(e) => setMenuItemAnecdote(e.target.value)}
                          placeholder="Ex: Desenvolvida na Toscana com tomates marinados por 24 horas..."
                          className="w-full bg-[#121212] border border-gold-800/15 focus:border-gold-500/50 rounded-lg p-3 text-sm text-white focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="flex items-center gap-3 bg-neutral-950 border border-gold-800/10 p-3 rounded-lg">
                        <input
                          type="checkbox"
                          id="chef_rec"
                          checked={menuItemIsChefRecommended}
                          onChange={(e) => setMenuItemIsChefRecommended(e.target.checked)}
                          className="w-4 h-4 rounded text-gold-500 focus:ring-0 bg-[#121212] border-gold-800/20 cursor-pointer"
                        />
                        <label htmlFor="chef_rec" className="text-xs text-[#FCFBF8] font-bold select-none cursor-pointer">
                          ⭐ Recomendado pelo Chef (Destacar no Cardápio)
                        </label>
                      </div>
                    </div>

                    {/* Image handling & custom upload gallery picker */}
                    <div className="space-y-4">
                      
                      {/* Image Preview Box */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Imagem Escolhida (Preview)</label>
                        <div className="w-full h-44 bg-neutral-950 border border-gold-800/15 rounded-xl overflow-hidden relative flex items-center justify-center">
                          {menuItemImage ? (
                            <>
                              <img
                                src={menuItemImage}
                                alt="Previa"
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              <button
                                type="button"
                                onClick={() => setMenuItemImage('')}
                                className="absolute top-2 right-2 bg-black/65 hover:bg-black/90 p-1.5 rounded-full text-[#CCBEA3] transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <div className="text-center p-4">
                              <Image className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
                              <span className="text-neutral-500 text-xs">Selecione uma imagem de alta definição abaixo ou faça upload</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* File upload inputs */}
                      <div className="grid grid-cols-1 gap-4">
                        
                        {/* Device File selection */}
                        <div className="space-y-1">
                          <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-bold block">1. Carregar Foto do Celular ou Computador</span>
                          <input
                            type="file"
                            ref={menuFileInputRef}
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) startFileUpload(file, 'menuItem');
                            }}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => menuFileInputRef.current?.click()}
                            className="w-full flex items-center justify-center gap-2 border border-dashed border-gold-800/20 bg-neutral-950 hover:bg-neutral-900 border-[#CCBEA3]/40 text-[#CCBEA3] py-2 px-4 rounded-lg text-xs uppercase tracking-wider font-semibold hover:border-gold-400 transition-all cursor-pointer"
                          >
                            <Upload className="w-3.5 h-3.5 font-bold" /> Fazer Upload Local (Garantia de Qualidade)
                          </button>
                        </div>

                        {/* Paste Direct URL */}
                        <div className="space-y-1">
                          <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-bold block">2. Inserir Link Direto (URL Web)</span>
                          <input
                            type="text"
                            value={menuItemImage}
                            onChange={(e) => setMenuItemImage(e.target.value)}
                            placeholder="Ex: https://images.unsplash.com/photo-..."
                            className="w-full bg-[#121212] border border-gold-800/15 focus:border-gold-500/50 rounded-lg p-2.5 text-xs text-white focus:outline-none transition-colors"
                          />
                        </div>

                        {/* Classic Bistro Imagery list combo dropdown picker */}
                        <div className="space-y-1">
                          <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-bold block">3. Usar Clássico do Acervo Violeta (Imagens Pré-Carregadas)</span>
                          <div className="grid grid-cols-4 gap-1.5 max-h-28 overflow-y-auto border border-gold-800/10 p-2 rounded-lg bg-neutral-950/40 scrollbar-hide">
                            {[
                              { path: '/cardapio/camarão crocante.jpeg', label: 'Camarão Crocante' },
                              { path: '/cardapio/parmegiana.jpeg', label: 'Parmegiana' },
                              { path: '/cardapio/brusqueta.jpeg', label: 'Brusquetta' },
                              { path: '/cardapio/risoto de camarão.jpeg', label: 'Risoto de Camarão' },
                              { path: '/cardapio/risoto de limão siciliano.jpeg', label: 'Risoto de Limão' },
                              { path: '/cardapio/risoto gorgonzola.jpeg', label: 'Risoto Gorgonzola' },
                              { path: '/cardapio/risoto parmesão.jpeg', label: 'Risoto Parmesão' },
                              { path: '/cardapio/risoto alcafrão.jpeg', label: 'Risoto Açafrão' },
                              { path: '/cardapio/polvo ao arroz negro.jpeg', label: 'Polvo Negro' },
                              { path: '/cardapio/salada file.jpeg', label: 'Salada de Filé' },
                              { path: '/cardapio/sonho salgado.jpeg', label: 'Sonho Salgado' },
                              { path: '/cardapio/tagliate.jpeg', label: 'Tagliata' },
                              { path: '/cardapio/torta basca.jpeg', label: 'Torta Basca' },
                              { path: '/cardapio/vinagrete de polvo.jpeg', label: 'Vinagrete Polvo' },
                              { path: '/cardapio/queijadinha.jpeg', label: 'Queijadinha' },
                              { path: '/cardapio/cocada.jpeg', label: 'Cocada' },
                              { path: '/cardapio/Fetuccine Cogumelo.jpeg', label: 'Fettuccine Cogumelo' },
                              { path: '/cardapio/alfredo.jpeg', label: 'Alfredo' },
                              { path: '/cardapio/cracker de ceviche.jpeg', label: 'Cracker Ceviche' },
                              { path: '/cardapio/mousseline.jpeg', label: 'Mousseline' },
                              { path: '/cardapio/VLT - Risoto de Gorgonzola - 02.png', label: 'Gorgonzola VLT' }
                            ].map((img) => (
                              <button
                                key={img.path}
                                type="button"
                                onClick={() => setMenuItemImage(img.path)}
                                className={`h-11 rounded-md overflow-hidden relative cursor-pointer border-2 transition-all ${
                                  menuItemImage === img.path ? 'border-gold-500 scale-95 shadow-md shadow-gold-500/20' : 'border-transparent opacity-65 hover:opacity-100'
                                }`}
                                title={img.label}
                              >
                                <img
                                  src={img.path}
                                  alt={img.label}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                                <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[6px] text-white truncate px-1 block text-center">
                                  {img.label}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>

                  {/* Submit button layout */}
                  <div className="flex gap-4 justify-end pt-4 border-t border-gold-800/10">
                    <button
                      type="button"
                      onClick={() => setIsEditingMenu(false)}
                      className="border border-neutral-800 hover:border-gold-800/30 text-neutral-400 font-semibold px-6 py-2.5 text-xs uppercase tracking-widest rounded transition-all cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-gold-500 hover:bg-gold-400 text-neutral-950 font-bold px-8 py-2.5 text-xs uppercase tracking-widest rounded shadow transition-all cursor-pointer"
                    >
                      Salvar Prato
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 1: EVENTS MANAGEMENT */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              
              {!isEditingEvent ? (
                /* 1.1 List of events */
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-[#121212] p-4 rounded-xl border border-gold-800/15">
                    <span className="text-xs font-semibold text-[#CCBEA3] uppercase">Seus Eventos Cadastrados</span>
                    <button
                      onClick={handleCreateNewClick}
                      className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-neutral-950 font-bold text-xs uppercase tracking-widest py-2 px-4 rounded transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Novo Evento
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {events.map((evt) => (
                      <div 
                        key={evt.id}
                        className={`p-5 rounded-xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors ${
                          evt.active ? 'bg-[#0d0d0d] border-gold-800/15' : 'bg-neutral-950/40 border-neutral-900/60 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          {/* Thumbnail */}
                          <div className="w-16 h-12 rounded overflow-hidden shrink-0 bg-neutral-900 border border-gold-800/10">
                            {evt.image ? (
                              <img src={evt.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[8px] text-neutral-600 font-bold uppercase tracking-wide">S/ IMAGEM</div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-serif text-base text-[#FCFBF8] font-bold truncate">{evt.title}</h4>
                            <div className="flex items-center gap-3 text-[10px] text-neutral-500 mt-1 uppercase tracking-wider font-semibold">
                              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {evt.date}</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {evt.time}</span>
                              <span className={`px-1.5 py-0.5 rounded ${evt.active ? 'bg-gold-500/10 text-gold-300' : 'bg-neutral-800 text-neutral-500'}`}>
                                {evt.active ? 'Ativo' : 'Oculto'}
                              </span>
                              {evt.isRomanticSpecial && (
                                <span className="px-1.5 py-0.5 rounded bg-red-600/15 text-red-400 border border-red-500/10 flex items-center gap-0.5 font-bold">
                                  <Heart className="w-2.5 h-2.5 fill-red-400 stroke-none" /> Namorados
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Event list actions */}
                        <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0">
                          <button
                            onClick={() => handleToggleEventActive(evt.id)}
                            className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-gold-800/40 text-[10px] uppercase font-bold py-1.5 px-3 rounded tracking-widest text-[#B5AE9E] transition-all flex items-center gap-1 cursor-pointer"
                            title="Alternar visibilidade pública"
                          >
                            {evt.active ? <ToggleRight className="w-4 h-4 text-gold-400" /> : <ToggleLeft className="w-4 h-4 text-neutral-600" />}
                            {evt.active ? 'Ocultar' : 'Exibir'}
                          </button>
                          <button
                            onClick={() => handleEditClick(evt)}
                            className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-gold-800/40 text-[10px] uppercase font-bold py-1.5 px-3 rounded tracking-widest text-gold-300 transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Editar
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(evt.id)}
                            className="bg-red-950/20 hover:bg-red-950/40 border border-red-950 hover:border-red-500/30 text-red-400 text-[10px] uppercase font-bold py-1.5 px-3 rounded tracking-widest transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Excluir
                          </button>
                        </div>
                      </div>
                    ))}
                    {events.length === 0 && (
                      <div className="text-center p-12 bg-[#0c0c0c] rounded-xl border border-gold-800/5">
                        <Calendar className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                        <h5 className="font-serif text-base text-neutral-400">Nenhum evento registrado</h5>
                        <p className="text-xs text-neutral-600 mt-1">Clique em "Novo Evento" para começar a divulgar jantares especiais.</p>
                      </div>
                    )}
                  </div>

                </div>
              ) : (
                /* 1.2 Interactive build/edit event form */
                <form onSubmit={handleSaveEventSubmit} className="space-y-6 bg-[#0c0c0c] border border-gold-800/15 rounded-xl p-6 lg:p-8">
                  <div className="flex items-center justify-between pb-3 border-b border-gold-800/10">
                    <h3 className="font-serif text-lg text-white font-bold">
                      {editingEventId ? 'Editando Evento Registrado' : 'Criando Novo Evento Gastronômico'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsEditingEvent(false)}
                      className="text-neutral-500 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {uploadError && (
                    <div className="p-3 bg-red-950/40 border border-red-500/20 rounded flex items-center gap-2.5 text-xs text-red-300">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <p>{uploadError}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Event Title */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">Nome/Título do Evento *</label>
                      <input 
                        type="text" 
                        value={evtTitle}
                        onChange={(e) => setEvtTitle(e.target.value)}
                        placeholder="Ex: Noite Gourmet do Vinho & Piano"
                        required
                        className="w-full bg-[#121212] border border-gold-800/20 focus:border-gold-400 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Date and Time */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">Data do Evento *</label>
                      <input 
                        type="date" 
                        value={evtDate}
                        onChange={(e) => setEvtDate(e.target.value)}
                        required
                        className="w-full bg-[#121212] border border-gold-800/20 focus:border-gold-400 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">Horário das Atividades *</label>
                      <input 
                        type="text" 
                        value={evtTime}
                        onChange={(e) => setEvtTime(e.target.value)}
                        placeholder="Ex: 20:00"
                        required
                        className="w-full bg-[#121212] border border-gold-800/20 focus:border-gold-400 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Description text area */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">Descrição Detalhada do Evento *</label>
                      <textarea 
                        value={evtDescription}
                        onChange={(e) => setEvtDescription(e.target.value)}
                        placeholder="Conte os detalhes poéticos da gastronomia, pratos, bebidas, música ao vivo e preços..."
                        rows={4}
                        required
                        className="w-full bg-[#121212] border border-gold-800/20 focus:border-gold-400 rounded p-3 text-sm text-white focus:outline-none transition-colors font-light"
                      />
                    </div>

                    {/* Custom button text */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold col-span-2 block">Texto do Botão de Reserva</label>
                      <input 
                        type="text" 
                        value={evtButtonText}
                        onChange={(e) => setEvtButtonText(e.target.value)}
                        placeholder="Ex: Fazer Minha Reserva"
                        className="w-full bg-[#121212] border border-gold-800/20 focus:border-gold-400 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Custom pre-filled whatsapp message */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">Mensagem Customizada do WhatsApp</label>
                      <input 
                        type="text" 
                        value={evtWhatsappMessage}
                        onChange={(e) => setEvtWhatsappMessage(e.target.value)}
                        placeholder="Olá! Gostaria de reservar para Noite do Vinho..."
                        className="w-full bg-[#121212] border border-gold-800/20 focus:border-gold-400 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                      />
                      <span className="text-[8px] text-neutral-500 block">Deixe em branco para usar a mensagem automatizada elegante baseada no título.</span>
                    </div>

                    {/* Event Banner Image Selection */}
                    <div className="p-4 bg-[#121212] rounded border border-gold-800/20 md:col-span-2 space-y-3">
                      <div>
                        <h4 className="text-[10px] text-gold-300 uppercase tracking-widest font-bold">1. Banner/Miniatura do Evento</h4>
                        <p className="text-[9px] text-neutral-500 mt-0.5">Informe um link público ou suba um arquivo em alta definição.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        <div className="md:col-span-8 space-y-2">
                          <input 
                            type="text" 
                            value={evtImage}
                            onChange={(e) => setEvtImage(e.target.value)}
                            placeholder="Saboroso URL de imagem (ex: https://images.unsplash.com/...)"
                            className="w-full bg-[#0a0a0a] border border-gold-800/10 focus:border-gold-400 rounded p-2.5 text-xs text-white focus:outline-none"
                          />
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] text-[#8E8376] uppercase tracking-wider font-semibold">Ou Importe Arquivo Local</span>
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="bg-neutral-900 border border-gold-800/10 flex items-center gap-1.5 px-3 py-1 rounded text-[9px] text-gold-300 uppercase font-semibold tracking-wider hover:border-gold-400 transition-colors cursor-pointer"
                            >
                              <Upload className="w-3 h-3" /> Escolher Foto
                            </button>
                            <input 
                              type="file"
                              ref={fileInputRef}
                              accept="image/*"
                              onChange={(e) => {
                                const selected = e.target.files?.[0];
                                if (selected) startFileUpload(selected, 'image');
                              }}
                              className="hidden"
                            />
                          </div>
                        </div>

                        {/* Preview panel */}
                        <div className="md:col-span-4 flex justify-center">
                          <div className="w-24 h-16 rounded overflow-hidden border border-gold-800/20 bg-black flex items-center justify-center">
                            {evtImage ? (
                              <img src={evtImage} alt="Previa" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <span className="text-[8px] text-[#8E8376] uppercase tracking-wider">Sem Prévia</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Event Video integration */}
                    <div className="p-4 bg-[#121212] rounded border border-gold-800/20 md:col-span-2 space-y-4">
                      <div>
                        <h4 className="text-[10px] text-gold-300 uppercase tracking-widest font-bold">2. Integração de Vídeo do Evento</h4>
                        <p className="text-[9px] text-neutral-500 mt-0.5">Insira um link do YouTube/Vimeo, ou carregue um arquivo local de até 100MB.</p>
                      </div>

                      <div className="flex gap-4 border-b border-gold-800/10 pb-2">
                        <button
                          type="button"
                          onClick={() => setEvtVideoType('link')}
                          className={`text-[9px] uppercase tracking-widest py-1 px-2.5 transition-all rounded font-medium cursor-pointer ${
                            evtVideoType === 'link' ? 'bg-gold-500/25 text-gold-300 font-bold border border-gold-400/20' : 'text-neutral-500 hover:text-neutral-300'
                          }`}
                        >
                          Usar Link Externo (YouTube / Vimeo / iframe)
                        </button>
                        <button
                          type="button"
                          onClick={() => setEvtVideoType('file')}
                          className={`text-[9px] uppercase tracking-widest py-1 px-2.5 transition-all rounded font-medium cursor-pointer ${
                            evtVideoType === 'file' ? 'bg-gold-500/25 text-gold-300 font-bold border border-gold-400/20' : 'text-neutral-500 hover:text-neutral-300'
                          }`}
                        >
                          Enviar Vídeo Local (MP4, WEBM, MOV)
                        </button>
                      </div>

                      <div className="space-y-3">
                        {evtVideoType === 'link' ? (
                          <div className="space-y-1.5">
                            <label className="text-[9px] text-neutral-400 uppercase tracking-widest">Link do Vídeo</label>
                            <input 
                              type="text" 
                              value={evtVideoType === 'link' ? evtVideo : ''}
                              onChange={(e) => {
                                setEvtVideo(e.target.value);
                                setEvtVideoType('link');
                              }}
                              placeholder="Insira o link (Ex: https://www.youtube.com/watch?v=... ou iframe)"
                              className="w-full bg-[#0a0a0a] border border-gold-800/10 focus:border-gold-400 rounded p-2.5 text-xs text-white focus:outline-none font-light"
                            />
                            {evtVideo && (
                              <div className="text-[8px] text-[#8E8376] uppercase tracking-wider block bg-black/40 p-1.5 rounded truncate">
                                Código de incorporação detectado: {getEmbedUrl(evtVideo)}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <label className="text-[9px] text-neutral-400 uppercase tracking-widest block">Anexo de Mídia Local</label>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => videoInputRef.current?.click()}
                                className="bg-neutral-900 border border-gold-800/20 flex items-center gap-1.5 py-2 px-4 rounded text-[10px] text-gold-300 uppercase font-bold tracking-wider hover:border-gold-400 transition-colors cursor-pointer"
                              >
                                <Upload className="w-3.5 h-3.5" /> Fazer Upload de Vídeo
                              </button>
                              <input 
                                type="file"
                                ref={videoInputRef}
                                accept="video/*"
                                onChange={(e) => {
                                  const selected = e.target.files?.[0];
                                  if (selected) startFileUpload(selected, 'video');
                                }}
                                className="hidden"
                              />
                              {evtVideo.startsWith('data:video') ? (
                                <span className="text-[10px] text-green-400 bg-green-500/10 border border-green-500/20 py-1.5 px-3 rounded flex items-center gap-1.5 uppercase font-medium">
                                  <Check className="w-3.5 h-3.5" /> Arquivo de Vídeo Anexado ({Math.round(evtVideo.length / 1024 / 1024)}MB)
                                </span>
                              ) : (
                                <span className="text-[10px] text-neutral-500 uppercase tracking-wide">Nenhum vídeo local carregado</span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Video fallback test */}
                        {!evtVideo && (
                          <div className="text-[9px] text-gold-300/60 leading-relaxed max-w-lg mt-1 font-sans italic">
                            * Se nenhum vídeo for configurado, o site renderizará um elegante banner gráfico de cortesia no lugar do player.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Toggle Event active */}
                    <div className="flex items-center justify-between p-4 bg-[#121212] rounded border border-gold-800/20 md:col-span-2">
                      <div>
                        <span className="text-[10px] text-gold-300 font-bold uppercase tracking-widest block">Ativar Evento no Site</span>
                        <span className="text-[9px] text-[#8E8376] mt-0.5 block">Se desativado, o evento ficará temporariamente oculto para os clientes comuns.</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEvtActive(!evtActive)}
                        className="transition-all cursor-pointer focus:outline-none"
                      >
                        {evtActive ? (
                          <ToggleRight className="w-10 h-10 text-gold-400" />
                        ) : (
                          <ToggleLeft className="w-10 h-10 text-neutral-600" />
                        )}
                      </button>
                    </div>

                    {/* Toggle Event Romantic Special */}
                    <div className="flex items-center justify-between p-4 bg-[#180a0d] rounded border border-red-500/25 md:col-span-2">
                      <div>
                        <span className="text-[10px] text-red-300 font-bold uppercase tracking-widest flex items-center gap-1.5">
                          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> Marcar como Evento de Dia dos Namorados
                        </span>
                        <span className="text-[9px] text-zinc-400 mt-0.5 block font-light">
                          Habilita um destaque ultra-elegante em degradê rubi, partículas de corações flutuantes e botões especiais inspirados no amor.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEvtIsRomanticSpecial(!evtIsRomanticSpecial)}
                        className="transition-all cursor-pointer focus:outline-none"
                      >
                        {evtIsRomanticSpecial ? (
                          <ToggleRight className="w-10 h-10 text-red-500" />
                        ) : (
                          <ToggleLeft className="w-10 h-10 text-neutral-600" />
                        )}
                      </button>
                    </div>

                  </div>

                  {/* Submission buttons */}
                  <div className="flex gap-4 justify-end pt-4 border-t border-gold-800/10">
                    <button
                      type="button"
                      onClick={() => setIsEditingEvent(false)}
                      className="border border-neutral-800 hover:border-gold-800 text-neutral-400 px-6 py-2.5 text-xs uppercase tracking-widest font-semibold rounded cursor-pointer transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-gold-500 hover:bg-gold-400 text-neutral-950 font-bold px-8 py-2.5 text-xs uppercase tracking-widest rounded shadow px-6 cursor-pointer transition-all"
                    >
                      Salvar Cadastro
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}

          {/* TAB 2: HERO BANNER MANAGEMENT */}
          {activeTab === 'banner' && (
            <form onSubmit={handleSaveBanner} className="space-y-6 bg-[#0c0c0c] border border-gold-800/15 rounded-xl p-6 lg:p-8">
              <div className="grid grid-cols-1 gap-6">
                
                {/* Banner title / slogan */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">Título Principal do Banner</label>
                  <input 
                    type="text" 
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                    required
                    className="w-full bg-[#121212] border border-gold-800/20 focus:border-gold-400 rounded p-3 text-sm text-white focus:outline-none transition-colors font-serif text-lg tracking-wider"
                  />
                </div>

                {/* Banner Subtitle / Quote */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">Subtítulo/Slogan do Banner</label>
                  <textarea 
                    value={heroSubtitle}
                    onChange={(e) => setHeroSubtitle(e.target.value)}
                    required
                    rows={3}
                    className="w-full bg-[#121212] border border-gold-800/20 focus:border-gold-400 rounded p-3 text-sm text-white focus:outline-none transition-colors font-light"
                  />
                </div>

                {/* Banner buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">Texto do Botão Principal</label>
                    <input 
                      type="text" 
                      value={heroBtnText}
                      onChange={(e) => setHeroBtnText(e.target.value)}
                      required
                      className="w-full bg-[#121212] border border-gold-800/20 focus:border-gold-400 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">Link de Direcionamento do Botão</label>
                    <input 
                      type="text" 
                      value={heroBtnLink}
                      onChange={(e) => setHeroBtnLink(e.target.value)}
                      required
                      placeholder="Ex: #menu ou #booking ou link externo"
                      className="w-full bg-[#121212] border border-gold-800/20 focus:border-gold-400 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Banner Image Customization with local file upload support */}
                <div className="p-4 bg-[#121212] rounded border border-gold-800/20 space-y-3">
                  <div>
                    <h4 className="text-[10px] text-gold-300 uppercase tracking-widest font-bold">Imagem de Fundo Principal</h4>
                    <p className="text-[9px] text-neutral-500 mt-0.5 font-light">Informe um link público ou carregue um arquivo gráfico local em alta definição do seu bistrô.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-8 space-y-2">
                      <input 
                        type="text" 
                        value={heroImage}
                        onChange={(e) => setHeroImage(e.target.value)}
                        placeholder="Insira o URL (ex: https://images.unsplash.com/...)"
                        className="w-full bg-[#0a0a0a] border border-gold-800/10 focus:border-gold-400 rounded p-2.5 text-xs text-white focus:outline-none font-light"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-[#8E8376] uppercase tracking-wider font-semibold">Ou Suba uma Foto Local</span>
                        <button
                          type="button"
                          onClick={() => heroInputRef.current?.click()}
                          className="bg-neutral-900 border border-gold-800/10 flex items-center gap-1.5 px-3 py-1 rounded text-[9px] text-gold-300 uppercase font-bold tracking-wider hover:border-gold-400 transition-colors cursor-pointer"
                        >
                          <Upload className="w-3 h-3" /> Carregar Arquivo
                        </button>
                        <input 
                          type="file"
                          ref={heroInputRef}
                          accept="image/*"
                          onChange={(e) => {
                            const selected = e.target.files?.[0];
                            if (selected) startFileUpload(selected, 'hero');
                          }}
                          className="hidden"
                        />
                      </div>
                    </div>

                    {/* Image thumb preview */}
                    <div className="md:col-span-4 flex justify-center">
                      <div className="w-full h-24 rounded overflow-hidden border border-gold-800/20 bg-black flex items-center justify-center relative shadow-inner">
                        {heroImage ? (
                          <img src={heroImage} alt="Banner" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <span className="text-[8px] text-[#8E8376] uppercase tracking-wider">Sem Imagem</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Submission buttons */}
              <div className="flex gap-4 justify-end pt-4 border-t border-gold-800/10">
                <button
                  type="submit"
                  className="bg-gold-500 hover:bg-gold-400 text-neutral-950 font-bold px-8 py-3 text-xs uppercase tracking-widest rounded shadow cursor-pointer transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Salvar Alterações do Banner
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: WHATSAPP SETTINGS */}
          {activeTab === 'whatsapp' && (
            <form onSubmit={handleSaveWhatsAppConfig} className="space-y-6 bg-[#0c0c0c] border border-gold-800/15 rounded-xl p-6 lg:p-8">
              <div className="grid grid-cols-1 gap-6">
                
                {/* Phone number */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    Número de Atendimento do WhatsApp * <HelpCircle className="w-3.5 h-3.5 text-neutral-600" title="Formato completo: Código do Pais (55) + DDD + Telefone" />
                  </label>
                  <input 
                    type="text" 
                    value={waNumber}
                    onChange={(e) => setWaNumber(e.target.value)}
                    required
                    placeholder="Ex: 5581999999999"
                    className="w-full bg-[#121212] border border-gold-800/20 focus:border-gold-400 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                  />
                  <span className="text-[8px] text-[#8E8376] italic block">
                    * Digite apenas números sem parênteses ou traços. Exemplo nacional: 5581999998888 (55 do Brasil + 81 de Pernambuco + 999998888 do celular).
                  </span>
                </div>

                {/* Default greeting */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">Mensagem Padrão de Contato</label>
                  <textarea 
                    value={waDefaultMsg}
                    onChange={(e) => setWaDefaultMsg(e.target.value)}
                    required
                    rows={3}
                    placeholder="Olá! Gostaria de consultar reservas..."
                    className="w-full bg-[#121212] border border-gold-800/20 focus:border-gold-400 rounded p-3 text-sm text-white focus:outline-none transition-colors font-light"
                  />
                  <span className="text-[8px] text-neutral-500 block">Esta mensagem preencherá automaticamente o chat quando o cliente clicar em botões gerais de WhatsApp do cardápio/site.</span>
                </div>

                {/* Default button custom text */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">Texto Padrão dos Botões de Atendimento</label>
                  <input 
                    type="text" 
                    value={waBtnText}
                    onChange={(e) => setWaBtnText(e.target.value)}
                    required
                    placeholder="Ex: Reservar pelo WhatsApp"
                    className="w-full bg-[#121212] border border-gold-800/20 focus:border-gold-400 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

              </div>

              {/* Submission buttons */}
              <div className="flex gap-4 justify-end pt-4 border-t border-gold-800/10">
                <button
                  type="submit"
                  className="bg-gold-500 hover:bg-gold-400 text-neutral-950 font-bold px-8 py-3 text-xs uppercase tracking-widest rounded shadow cursor-pointer transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Salvar Configurações de Atendimento
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: ROMANTIC VALENTINE CAMPAIGN */}
          {activeTab === 'romantic' && (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                onSaveRomanticTheme({
                  active: romanticActive,
                  popupText: romanticPopupText,
                  popupDuration: Number(romanticPopupDuration),
                  popupFrequency: romanticPopupFrequency,
                  cupidPosition: romanticCupidPosition,
                  bannerRomanticTitle: romanticBannerTitle,
                  bannerRomanticSlogan: romanticBannerSlogan,
                  waRomanticMessage: romanticWaMessage,
                  enableHeartRain: romanticHeartRain,
                  startDate: romanticStartDate,
                  endDate: romanticEndDate,
                });
                onNotify('Campanha de Dia dos Namorados sincronizada e atualizada com sucesso!');
              }} 
              className="space-y-6 bg-[#0c0c0c] border border-red-500/20 rounded-xl p-6 lg:p-8 relative"
            >
              {/* Floating aesthetic heart in card corner */}
              <div className="absolute top-4 right-4 text-red-500/10 text-5xl font-serif pointer-events-none select-none">♥</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Master Theme Toggle */}
                <div className="flex items-center justify-between p-4 bg-[#180a0d] border border-red-500/25 md:col-span-2 rounded-xl">
                  <div>
                    <span className="text-xs text-red-100 font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <Heart className="w-4 h-4 text-red-500 fill-red-500" /> Ativar Campanha Temática de Dia dos Namorados
                    </span>
                    <span className="text-[10px] text-[#A89895] block mt-1 font-light">
                      Quando ativado, exibe um belíssimo pop-up de entrada, aplica overlays com climas mais quentes, e estiliza sutilmente o banner e os eventos românticos da casa.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRomanticActive(!romanticActive)}
                    className="transition-all cursor-pointer focus:outline-none"
                  >
                    {romanticActive ? (
                      <ToggleRight className="w-12 h-12 text-red-500" />
                    ) : (
                      <ToggleLeft className="w-12 h-12 text-neutral-600" />
                    )}
                  </button>
                </div>

                {/* Subtitle/Text customizable configurations */}
                {romanticActive && (
                  <>
                    <div className="space-y-1.5 md:col-span-2 border-b border-red-950/20 pb-4">
                      <h4 className="text-[11px] font-bold text-red-400 uppercase tracking-widest flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5" /> 1. Configurações do Pop-up Inicial de Entrada
                      </h4>
                    </div>

                    {/* Pop-up Text */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Frase do Pop-up Romântico *</label>
                      <textarea 
                        value={romanticPopupText}
                        onChange={(e) => setRomanticPopupText(e.target.value)}
                        placeholder="Ex: Cupido passou por aqui! O Dia dos Namorados chegou..."
                        required
                        rows={2}
                        className="w-full bg-[#121212] border border-red-950/20 focus:border-red-500/50 rounded p-3 text-sm text-white focus:outline-none transition-colors font-light"
                      />
                    </div>

                    {/* Duration and Frequency */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Tempo Exposição do Pop-up (segundos)</label>
                      <input 
                        type="number" 
                        min={3}
                        max={20}
                        value={romanticPopupDuration}
                        onChange={(e) => setRomanticPopupDuration(Number(e.target.value))}
                        className="w-full bg-[#121212] border border-red-950/20 focus:border-red-500/50 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Frequência de Exibição</label>
                      <select 
                        value={romanticPopupFrequency}
                        onChange={(e) => setRomanticPopupFrequency(e.target.value as any)}
                        className="w-full bg-[#121212] border border-red-950/20 focus:border-red-500/50 rounded p-3 text-sm text-white focus:outline-none cursor-pointer transition-colors"
                      >
                        <option value="session" className="bg-[#121212] text-white">Uma vez por sessão (Recomendado - Menos intrusivo)</option>
                        <option value="always" className="bg-[#121212] text-white">Sempre (A cada recarregamento de página)</option>
                      </select>
                    </div>

                    {/* Cupid alignment and Heart Shower toggle */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Alinhamento Ilustração do Cupido</label>
                      <select 
                        value={romanticCupidPosition}
                        onChange={(e) => setRomanticCupidPosition(e.target.value as any)}
                        className="w-full bg-[#121212] border border-red-950/20 focus:border-red-500/50 rounded p-3 text-sm text-white focus:outline-none cursor-pointer transition-colors"
                      >
                        <option value="right">Canto Direito Inferior (Excelente)</option>
                        <option value="left">Canto Esquerda Inferior</option>
                        <option value="top-right">Canto Superior</option>
                      </select>
                      <span className="text-[8px] text-neutral-500 block">Uma linda representação em vetor dourada de cupido com asas batendo será exibida.</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#121212] border border-red-950/10 rounded-xl">
                      <div>
                        <span className="text-[10px] text-red-300 font-bold uppercase tracking-widest block">Chuva Sutil de Corações</span>
                        <span className="text-[8px] text-[#8E8376] mt-0.5 block font-light">Habilita uma queda ocasional e elegante de corações soltos descendo bem devagar.</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setRomanticHeartRain(!romanticHeartRain)}
                        className="transition-all cursor-pointer focus:outline-none"
                      >
                        {romanticHeartRain ? (
                          <ToggleRight className="w-10 h-10 text-red-500" />
                        ) : (
                          <ToggleLeft className="w-10 h-10 text-neutral-600" />
                        )}
                      </button>
                    </div>

                    {/* Campaign active Dates */}
                    <div className="space-y-1.5 md:col-span-2 border-b border-red-950/20 pt-4 pb-4">
                      <h4 className="text-[11px] font-bold text-red-400 uppercase tracking-widest flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> 2. Período/Vigência da Campanha (Data Início e Fim)
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-neutral-400 uppercase tracking-widest block font-semibold">Início da Campanha</label>
                        <input 
                          type="date" 
                          value={romanticStartDate}
                          onChange={(e) => setRomanticStartDate(e.target.value)}
                          className="w-full bg-[#121212] border border-red-950/20 focus:border-red-500/50 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-neutral-400 uppercase tracking-widest block font-semibold">Encerramento da Campanha</label>
                        <input 
                          type="date" 
                          value={romanticEndDate}
                          onChange={(e) => setRomanticEndDate(e.target.value)}
                          className="w-full bg-[#121212] border border-red-950/20 focus:border-red-500/50 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Customized Banner Content */}
                    <div className="space-y-1.5 md:col-span-2 border-b border-red-950/20 pt-4 pb-4">
                      <h4 className="text-[11px] font-bold text-red-400 uppercase tracking-widest flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" /> 3. Textos Personalizados para o Banner Principal
                      </h4>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Título Romântico Alternativo</label>
                      <input 
                        type="text" 
                        value={romanticBannerTitle}
                        onChange={(e) => setRomanticBannerTitle(e.target.value)}
                        placeholder="Ex: Dia dos Namorados no Bistrô"
                        className="w-full bg-[#121212] border border-red-950/20 focus:border-red-500/50 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Slogan/Frase Romântica Alternativa</label>
                      <input 
                        type="text" 
                        value={romanticBannerSlogan}
                        onChange={(e) => setRomanticBannerSlogan(e.target.value)}
                        placeholder="Ex: Uma noite especial para celebrar o amor..."
                        className="w-full bg-[#121212] border border-red-950/20 focus:border-red-500/50 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Customized Booking WhatsApp Message Campaign */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Mensagem WhatsApp Reserva Namorados</label>
                      <input 
                        type="text" 
                        value={romanticWaMessage}
                        onChange={(e) => setRomanticWaMessage(e.target.value)}
                        placeholder="Olá! Gostaria de falar com o restaurante para reservar minha mesa especial para Dia dos Namorados..."
                        className="w-full bg-[#121212] border border-red-950/20 focus:border-red-500/50 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                      />
                      <span className="text-[8px] text-neutral-500 block">Esta mensagem se aplicará automaticamente para cliques em botões de reserva de Dia dos Namorados.</span>
                    </div>
                  </>
                )}

              </div>

              {/* Submission buttons */}
              <div className="flex gap-4 justify-end pt-4 border-t border-red-950/20">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3 text-xs uppercase tracking-widest rounded shadow cursor-pointer transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-white fill-white" /> Salvar Sincronização Tema Romance
                </button>
              </div>
            </form>
          )}

          {/* TAB 5: CHRISTMAS (NATAL) CAMPAIGN */}
          {activeTab === 'natal' && (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                onSaveNatalTheme({
                  active: natalActive,
                  popupText: natalPopupText,
                  popupDuration: Number(natalPopupDuration),
                  popupFrequency: natalPopupFrequency,
                  elementPosition: natalPosition,
                  bannerTitle: natalBannerTitle,
                  bannerSlogan: natalBannerSlogan,
                  waMessage: natalWaMessage,
                  enableEffect: natalEnableEffect,
                });
                onNotify('Campanha de Natal sincronizada e atualizada com sucesso!');
              }} 
              className="space-y-6 bg-[#0c0c0c] border border-emerald-500/20 rounded-xl p-6 lg:p-8 relative"
            >
              {/* Floating aesthetic pine in card corner */}
              <div className="absolute top-4 right-4 text-emerald-500/10 text-5xl font-serif pointer-events-none select-none">🎄</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Master Theme Toggle */}
                <div className="flex items-center justify-between p-4 bg-[#0a1811] border border-emerald-500/25 md:col-span-2 rounded-xl">
                  <div>
                    <span className="text-xs text-emerald-100 font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <Gift className="w-4 h-4 text-emerald-500 fill-emerald-500" /> Ativar Campanha Temática de Natal
                    </span>
                    <span className="text-[10px] text-[#A89895] block mt-1 font-light">
                      Quando ativado, exibe um acolhedor pop-up natalino, aplica overlays com tons de verde pinho e ouro, ativa uma chuva festiva de neve, e muda os dizeres do banner.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNatalActive(!natalActive)}
                    className="transition-all cursor-pointer focus:outline-none"
                  >
                    {natalActive ? (
                      <ToggleRight className="w-12 h-12 text-emerald-500" />
                    ) : (
                      <ToggleLeft className="w-12 h-12 text-neutral-600" />
                    )}
                  </button>
                </div>

                {natalActive && (
                  <>
                    <div className="space-y-1.5 md:col-span-2 border-b border-emerald-950/20 pb-2">
                      <h4 className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> 1. Pop-up Inicial e Efeitos de Neve
                      </h4>
                    </div>

                    {/* Pop-up Text */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Frase do Pop-up de Natal *</label>
                      <textarea 
                        value={natalPopupText}
                        onChange={(e) => setNatalPopupText(e.target.value)}
                        placeholder="Ex: Ho ho ho! Desfrute do melhor menu de festas e viva o espírito natalino..."
                        required
                        rows={2}
                        className="w-full bg-[#121212] border border-emerald-950/20 focus:border-emerald-500/50 rounded p-3 text-sm text-white focus:outline-none transition-colors font-light"
                      />
                    </div>

                    {/* Duration and Frequency */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Tempo Exposição do Pop-up (segundos)</label>
                      <input 
                        type="number" 
                        min={3}
                        max={20}
                        value={natalPopupDuration}
                        onChange={(e) => setNatalPopupDuration(Number(e.target.value))}
                        className="w-full bg-[#121212] border border-emerald-950/20 focus:border-emerald-500/50 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Frequência de Exibição</label>
                      <select 
                        value={natalPopupFrequency}
                        onChange={(e) => setNatalPopupFrequency(e.target.value as any)}
                        className="w-full bg-[#121212] border border-emerald-950/20 focus:border-emerald-500/50 rounded p-3 text-sm text-white focus:outline-none cursor-pointer transition-colors"
                      >
                        <option value="session" className="bg-[#121212] text-white">Uma vez por sessão (Recomendado)</option>
                        <option value="always" className="bg-[#121212] text-white">Sempre (A cada carregamento de página)</option>
                      </select>
                    </div>

                    {/* Mascot alignment and Snow toggle */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Alinhamento do Papai Noel Flutuante</label>
                      <select 
                        value={natalPosition}
                        onChange={(e) => setNatalPosition(e.target.value as any)}
                        className="w-full bg-[#121212] border border-emerald-950/20 focus:border-emerald-500/50 rounded p-3 text-sm text-white focus:outline-none cursor-pointer transition-colors"
                      >
                        <option value="right">Canto Direito Inferior</option>
                        <option value="left">Canto Esquerdo Inferior</option>
                        <option value="top-right">Canto Superior Direito</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#121212] border border-emerald-950/10 rounded-xl">
                      <div>
                        <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest block">Chuva Festiva de Neve</span>
                        <span className="text-[8px] text-[#8E8376] mt-0.5 block font-light">Ativa flocos de neve elegantes caindo suavemente pela tela.</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setNatalEnableEffect(!natalEnableEffect)}
                        className="transition-all cursor-pointer focus:outline-none"
                      >
                        {natalEnableEffect ? (
                          <ToggleRight className="w-10 h-10 text-emerald-500" />
                        ) : (
                          <ToggleLeft className="w-10 h-10 text-neutral-600" />
                        )}
                      </button>
                    </div>

                    {/* Customized Banner Content */}
                    <div className="space-y-1.5 md:col-span-2 border-b border-emerald-950/20 pt-4 pb-2">
                      <h4 className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" /> 2. Textos do Banner Natalino
                      </h4>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Título Natalino Alternativo</label>
                      <input 
                        type="text" 
                        value={natalBannerTitle}
                        onChange={(e) => setNatalBannerTitle(e.target.value)}
                        placeholder="Ex: Natal Mágico no Violeta"
                        className="w-full bg-[#121212] border border-emerald-950/20 focus:border-emerald-500/50 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Slogan de Natal Alternativo</label>
                      <input 
                        type="text" 
                        value={natalBannerSlogan}
                        onChange={(e) => setNatalBannerSlogan(e.target.value)}
                        placeholder="Ex: Saboreie as festas com quem você mais ama..."
                        className="w-full bg-[#121212] border border-emerald-950/20 focus:border-emerald-500/50 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Customized Booking WhatsApp Message Campaign */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Mensagem WhatsApp para Ceia/Reservas de Natal</label>
                      <input 
                        type="text" 
                        value={natalWaMessage}
                        onChange={(e) => setNatalWaMessage(e.target.value)}
                        placeholder="Ex: Olá! Gostaria de reservar nossa mesa especial de Natal..."
                        className="w-full bg-[#121212] border border-emerald-950/20 focus:border-emerald-500/50 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>
                  </>
                )}

              </div>

              {/* Submission buttons */}
              <div className="flex gap-4 justify-end pt-4 border-t border-emerald-950/15">
                <button
                  type="submit"
                  className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-8 py-3 text-xs uppercase tracking-widest rounded shadow cursor-pointer transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-white fill-white" /> Salvar Sincronização Tema Natal
                </button>
              </div>
            </form>
          )}

          {/* TAB 6: EASTER (PÁSCOA) CAMPAIGN */}
          {activeTab === 'pascoa' && (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                onSavePascoaTheme({
                  active: pascoaActive,
                  popupText: pascoaPopupText,
                  popupDuration: Number(pascoaPopupDuration),
                  popupFrequency: pascoaPopupFrequency,
                  elementPosition: pascoaPosition,
                  bannerTitle: pascoaBannerTitle,
                  bannerSlogan: pascoaBannerSlogan,
                  waMessage: pascoaWaMessage,
                  enableEffect: pascoaEnableEffect,
                });
                onNotify('Campanha de Páscoa sincronizada e atualizada com sucesso!');
              }} 
              className="space-y-6 bg-[#0c0c0c] border border-amber-600/25 rounded-xl p-6 lg:p-8 relative"
            >
              {/* Floating aesthetic egg/bunny icon in corner */}
              <div className="absolute top-4 right-4 text-amber-500/10 text-5xl font-serif pointer-events-none select-none">🥚</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Master Theme Toggle */}
                <div className="flex items-center justify-between p-4 bg-[#1e130a] border border-amber-600/30 md:col-span-2 rounded-xl">
                  <div>
                    <span className="text-xs text-amber-100 font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" /> Ativar Campanha Temática de Páscoa
                    </span>
                    <span className="text-[10px] text-[#A89895] block mt-1 font-light">
                      Quando ativado, exibe um belo pop-up sobre os prazeres doces e salgados da data, ativa a queda sutil de ovos decorados e flores, e aplica tons quentes de terra e chocolate ao site.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPascoaActive(!pascoaActive)}
                    className="transition-all cursor-pointer focus:outline-none"
                  >
                    {pascoaActive ? (
                      <ToggleRight className="w-12 h-12 text-amber-500" />
                    ) : (
                      <ToggleLeft className="w-12 h-12 text-neutral-600" />
                    )}
                  </button>
                </div>

                {pascoaActive && (
                  <>
                    <div className="space-y-1.5 md:col-span-2 border-b border-amber-950/20 pb-2">
                      <h4 className="text-[11px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> 1. Pop-up Inicial e Decorações Flutuantes
                      </h4>
                    </div>

                    {/* Pop-up Text */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Frase do Pop-up de Páscoa *</label>
                      <textarea 
                        value={pascoaPopupText}
                        onChange={(e) => setPascoaPopupText(e.target.value)}
                        placeholder="Ex: Uma Páscoa de delícias! Venha conferir nossa receita autoral de bacalhau e sobremesas belgas..."
                        required
                        rows={2}
                        className="w-full bg-[#121212] border border-amber-950/20 focus:border-amber-500/50 rounded p-3 text-sm text-white focus:outline-none transition-colors font-light"
                      />
                    </div>

                    {/* Duration and Frequency */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Tempo Exposição do Pop-up (segundos)</label>
                      <input 
                        type="number" 
                        min={3}
                        max={20}
                        value={pascoaPopupDuration}
                        onChange={(e) => setPascoaPopupDuration(Number(e.target.value))}
                        className="w-full bg-[#121212] border border-amber-950/20 focus:border-amber-500/50 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Frequência de Exibição</label>
                      <select 
                        value={pascoaPopupFrequency}
                        onChange={(e) => setPascoaPopupFrequency(e.target.value as any)}
                        className="w-full bg-[#121212] border border-amber-950/20 focus:border-amber-500/50 rounded p-3 text-sm text-white focus:outline-none cursor-pointer transition-colors"
                      >
                        <option value="session" className="bg-[#121212] text-white">Uma vez por sessão</option>
                        <option value="always" className="bg-[#121212] text-white">Sempre (A cada carregamento)</option>
                      </select>
                    </div>

                    {/* Mascot alignment and egg rain toggle */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Alinhamento do Coelhinho Flutuante</label>
                      <select 
                        value={pascoaPosition}
                        onChange={(e) => setPascoaPosition(e.target.value as any)}
                        className="w-full bg-[#121212] border border-amber-950/20 focus:border-amber-500/50 rounded p-3 text-sm text-white focus:outline-none cursor-pointer transition-colors"
                      >
                        <option value="left">Canto Esquerdo Inferior</option>
                        <option value="right">Canto Direito Inferior</option>
                        <option value="top-right">Canto Superior Direito</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#121212] border border-amber-950/10 rounded-xl">
                      <div>
                        <span className="text-[10px] text-amber-300 font-bold uppercase tracking-widest block">Chuva de Ovos e Flores</span>
                        <span className="text-[8px] text-[#8E8376] mt-0.5 block font-light">Ativa flores e ovos de chocolate estilizados descendo muito sutilmente.</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPascoaEnableEffect(!pascoaEnableEffect)}
                        className="transition-all cursor-pointer focus:outline-none"
                      >
                        {pascoaEnableEffect ? (
                          <ToggleRight className="w-10 h-10 text-amber-500" />
                        ) : (
                          <ToggleLeft className="w-10 h-10 text-neutral-600" />
                        )}
                      </button>
                    </div>

                    {/* Customized Banner Content */}
                    <div className="space-y-1.5 md:col-span-2 border-b border-amber-950/20 pt-4 pb-2">
                      <h4 className="text-[11px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" /> 2. Textos do Almoço de Páscoa
                      </h4>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Título Pascoal Alternativo</label>
                      <input 
                        type="text" 
                        value={pascoaBannerTitle}
                        onChange={(e) => setPascoaBannerTitle(e.target.value)}
                        placeholder="Ex: Páscoa de Sabores no Bistrô"
                        className="w-full bg-[#121212] border border-amber-950/20 focus:border-amber-500/50 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Slogan de Páscoa Alternativo</label>
                      <input 
                        type="text" 
                        value={pascoaBannerSlogan}
                        onChange={(e) => setPascoaBannerSlogan(e.target.value)}
                        placeholder="Ex: Pratos de bacalhau e sobremesas irresistíveis de chocolate belga..."
                        className="w-full bg-[#121212] border border-amber-950/20 focus:border-amber-500/50 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Customized Booking WhatsApp Message Campaign */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Mensagem WhatsApp para Almoço de Páscoa</label>
                      <input 
                        type="text" 
                        value={pascoaWaMessage}
                        onChange={(e) => setPascoaWaMessage(e.target.value)}
                        placeholder="Ex: Olá! Gostaria de consultar os horários e reservar uma mesa para a Páscoa..."
                        className="w-full bg-[#121212] border border-amber-950/20 focus:border-amber-500/50 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>
                  </>
                )}

              </div>

              {/* Submission buttons */}
              <div className="flex gap-4 justify-end pt-4 border-t border-amber-950/15">
                <button
                  type="submit"
                  className="bg-amber-700 hover:bg-amber-600 text-white font-bold px-8 py-3 text-xs uppercase tracking-widest rounded shadow cursor-pointer transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-white fill-white" /> Salvar Sincronização Tema Páscoa
                </button>
              </div>
            </form>
          )}

          {/* TAB 7: NEW YEAR (ANO NOVO) CAMPAIGN */}
          {activeTab === 'anonovo' && (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                onSaveAnoNovoTheme({
                  active: anoNovoActive,
                  popupText: anoNovoPopupText,
                  popupDuration: Number(anoNovoPopupDuration),
                  popupFrequency: anoNovoPopupFrequency,
                  elementPosition: anoNovoPosition,
                  bannerTitle: anoNovoBannerTitle,
                  bannerSlogan: anoNovoBannerSlogan,
                  waMessage: anoNovoWaMessage,
                  enableEffect: anoNovoEnableEffect,
                });
                onNotify('Campanha de Ano Novo sincronizada e atualizada com sucesso!');
              }} 
              className="space-y-6 bg-[#0c0c0c] border border-amber-400/20 rounded-xl p-6 lg:p-8 relative"
            >
              {/* Floating aesthetic sparkles in corner */}
              <div className="absolute top-4 right-4 text-amber-300/10 text-5xl font-serif pointer-events-none select-none">✨</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Master Theme Toggle */}
                <div className="flex items-center justify-between p-4 bg-[#0a0a18] border border-amber-400/25 md:col-span-2 rounded-xl">
                  <div>
                    <span className="text-xs text-amber-100 font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" /> Ativar Campanha Temática de Ano Novo (2027)
                    </span>
                    <span className="text-[10px] text-[#A89895] block mt-1 font-light">
                      Quando ativado, exibe um festivo pop-up focado nas celebrações de réveillon e no brinde à chegada de 2027. Ativa uma elegante animação dourada de faíscas brilhantes que mimetiza fogos, e muda o slogan do banner.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAnoNovoActive(!anoNovoActive)}
                    className="transition-all cursor-pointer focus:outline-none"
                  >
                    {anoNovoActive ? (
                      <ToggleRight className="w-12 h-12 text-amber-400" />
                    ) : (
                      <ToggleLeft className="w-12 h-12 text-neutral-600" />
                    )}
                  </button>
                </div>

                {anoNovoActive && (
                  <>
                    <div className="space-y-1.5 md:col-span-2 border-b border-gold-800/20 pb-2">
                      <h4 className="text-[11px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> 1. Pop-up Inicial e Estrelas Brilhantes (Efeito de Fogos)
                      </h4>
                    </div>

                    {/* Pop-up Text */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Frase do Pop-up de Ano Novo *</label>
                      <textarea 
                        value={anoNovoPopupText}
                        onChange={(e) => setAnoNovoPopupText(e.target.value)}
                        placeholder="Ex: Tim-tim! O Bistrô Violeta convida você para celebrar o Réveillon e brindar a chegada brilhante de 2027..."
                        required
                        rows={2}
                        className="w-full bg-[#121212] border border-gold-800/20 focus:border-amber-400/50 rounded p-3 text-sm text-white focus:outline-none transition-colors font-light"
                      />
                    </div>

                    {/* Duration and Frequency */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Tempo Exposição do Pop-up (segundos)</label>
                      <input 
                        type="number" 
                        min={3}
                        max={20}
                        value={anoNovoPopupDuration}
                        onChange={(e) => setAnoNovoPopupDuration(Number(e.target.value))}
                        className="w-full bg-[#121212] border border-gold-800/20 focus:border-amber-400/50 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Frequência de Exibição</label>
                      <select 
                        value={anoNovoPopupFrequency}
                        onChange={(e) => setAnoNovoPopupFrequency(e.target.value as any)}
                        className="w-full bg-[#121212] border border-gold-800/20 focus:border-amber-400/50 rounded p-3 text-sm text-white focus:outline-none cursor-pointer transition-colors"
                      >
                        <option value="session" className="bg-[#121212] text-white">Uma vez por sessão</option>
                        <option value="always" className="bg-[#121212] text-white">Sempre (A cada carregamento)</option>
                      </select>
                    </div>

                    {/* Mascot alignment and sparks toggle */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Alinhamento das Taças de Brinde Flutuantes</label>
                      <select 
                        value={anoNovoPosition}
                        onChange={(e) => setAnoNovoPosition(e.target.value as any)}
                        className="w-full bg-[#121212] border border-gold-800/20 focus:border-amber-400/50 rounded p-3 text-sm text-white focus:outline-none cursor-pointer transition-colors"
                      >
                        <option value="top-right">Canto Superior Direito</option>
                        <option value="right">Canto Direito Inferior</option>
                        <option value="left">Canto Esquerdo Inferior</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#121212] border border-gold-800/10 rounded-xl">
                      <div>
                        <span className="text-[10px] text-amber-200 font-bold uppercase tracking-widest block">Efeito de Faíscas Brilhantes / Estrelas</span>
                        <span className="text-[8px] text-[#8E8376] mt-0.5 block font-light">Ativa estrelas e faíscas douradas que mimetizam o brilho e elegância dos fogos silenciosos de Réveillon.</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAnoNovoEnableEffect(!anoNovoEnableEffect)}
                        className="transition-all cursor-pointer focus:outline-none"
                      >
                        {anoNovoEnableEffect ? (
                          <ToggleRight className="w-10 h-10 text-amber-400" />
                        ) : (
                          <ToggleLeft className="w-10 h-10 text-neutral-600" />
                        )}
                      </button>
                    </div>

                    {/* Customized Banner Content with upcoming year indicator */}
                    <div className="space-y-1.5 md:col-span-2 border-b border-gold-800/20 pt-4 pb-2">
                      <h4 className="text-[11px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" /> 2. Textos do Réveillon e Indicador do Ano de Chegada (2027)
                      </h4>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Título Réveillon Alternativo</label>
                      <input 
                        type="text" 
                        value={anoNovoBannerTitle}
                        onChange={(e) => setAnoNovoBannerTitle(e.target.value)}
                        placeholder="Ex: Réveillon Dourado Violeta"
                        className="w-full bg-[#121212] border border-gold-800/20 focus:border-amber-400/50 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Slogan de Réveillon (Informando o ano de 2027) *</label>
                      <input 
                        type="text" 
                        value={anoNovoBannerSlogan}
                        onChange={(e) => setAnoNovoBannerSlogan(e.target.value)}
                        placeholder="Ex: Brinde o amanhã e celebre a fabulosa chegada de 2027..."
                        className="w-full bg-[#121212] border border-gold-800/20 focus:border-amber-400/50 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                      />
                      <span className="text-[8px] text-amber-400/80 block mt-1">Conforme instrução de design, informe de forma elegante a chegada do ano 2027 para sintonizar a festa!</span>
                    </div>

                    {/* Customized Booking WhatsApp Message Campaign */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">Mensagem WhatsApp para virada de Ano Novo</label>
                      <input 
                        type="text" 
                        value={anoNovoWaMessage}
                        onChange={(e) => setAnoNovoWaMessage(e.target.value)}
                        placeholder="Ex: Olá! Vim pelo site e gostaria de saber as mesas disponíveis para comemorarmos o Réveillon 2027 no bistrô..."
                        className="w-full bg-[#121212] border border-gold-800/20 focus:border-amber-400/50 rounded p-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>
                  </>
                )}

              </div>

              {/* Submission buttons */}
              <div className="flex gap-4 justify-end pt-4 border-t border-gold-800/15">
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-8 py-3 text-xs uppercase tracking-widest rounded shadow cursor-pointer transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-neutral-950" /> Salvar Sincronização Tema Ano Novo
                </button>
              </div>
            </form>
          )}

        </div>
      </main>

    </div>
  );
}

