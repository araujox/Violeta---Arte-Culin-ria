import React, { useState, useEffect, useRef } from 'react';
import { 
  Lock, Eye, EyeOff, Save, LogOut, Plus, Trash2, Edit3, 
  Upload, X, Check, AlertCircle, RefreshCw, Smartphone, 
  Calendar, Clock, FileText, Image, Video, HelpCircle, ArrowLeft, ToggleLeft, ToggleRight, Heart
} from 'lucide-react';
import { EventBistro, HeroBanner, WhatsAppConfig, RomanticThemeConfig } from '../types';
import { handleFileUpload, getEmbedUrl } from '../utils/adminStorage';

interface AdminPanelProps {
  onClose: () => void;
  events: EventBistro[];
  onSaveEvents: (events: EventBistro[]) => void;
  hero: HeroBanner;
  onSaveHero: (hero: HeroBanner) => void;
  whatsAppConfig: WhatsAppConfig;
  onSaveWhatsApp: (config: WhatsAppConfig) => void;
  romanticTheme: RomanticThemeConfig;
  onSaveRomanticTheme: (config: RomanticThemeConfig) => void;
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
  onNotify
}: AdminPanelProps) {
  // Authentication states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Active Admin tab
  const [activeTab, setActiveTab] = useState<'events' | 'banner' | 'whatsapp' | 'romantic'>('events');

  // Hero form inputs
  const [heroTitle, setHeroTitle] = useState(hero.title);
  const [heroSubtitle, setHeroSubtitle] = useState(hero.subtitle);
  const [heroImage, setHeroImage] = useState(hero.image);
  const [heroBtnText, setHeroBtnText] = useState(hero.buttonText);
  const [heroBtnLink, setHeroBtnLink] = useState(hero.buttonLink);

  // WhatsApp form inputs
  const [waNumber, setWaNumber] = useState(whatsAppConfig.number);
  const [waDefaultMsg, setWaDefaultMsg] = useState(whatsAppConfig.defaultMessage);
  const [waBtnText, setWaBtnText] = useState(whatsAppConfig.defaultButtonText);

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
  const startFileUpload = (file: File, type: 'image' | 'video' | 'hero') => {
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
    <div className="fixed inset-0 z-50 bg-[#060606] flex flex-col md:flex-row">
      
      {/* 1. Left Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0a0a0a] border-b md:border-b-0 md:border-r border-gold-800/10 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div>
            <h2 className="font-serif text-xl tracking-[0.2em] text-[#FCFBF8] font-bold">VIOLETA</h2>
            <p className="text-[9px] font-sans text-gold-400 tracking-[0.3em] uppercase mt-0.5">Painel de Controle</p>
          </div>

          <nav className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={() => { setActiveTab('events'); setIsEditingEvent(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs uppercase tracking-wider font-medium shrink-0 transition-colors w-full text-justify cursor-pointer ${
                activeTab === 'events' ? 'bg-gold-500 text-neutral-950 font-bold' : 'text-[#CCBEA3] hover:bg-[#121212]'
              }`}
            >
              <Calendar className="w-4 h-4 shrink-0" /> Gerenciar Eventos
            </button>
            <button
              onClick={() => { setActiveTab('banner'); setIsEditingEvent(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs uppercase tracking-wider font-medium shrink-0 transition-colors w-full text-justify cursor-pointer ${
                activeTab === 'banner' ? 'bg-gold-500 text-neutral-950 font-bold' : 'text-[#CCBEA3] hover:bg-[#121212]'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0" /> Editar Banner Principal
            </button>
            <button
              onClick={() => { setActiveTab('whatsapp'); setIsEditingEvent(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs uppercase tracking-wider font-medium shrink-0 transition-colors w-full text-justify cursor-pointer ${
                activeTab === 'whatsapp' ? 'bg-gold-500 text-neutral-950 font-bold' : 'text-[#CCBEA3] hover:bg-[#121212]'
              }`}
            >
              <Smartphone className="w-4 h-4 shrink-0" /> Canal WhatsApp
            </button>
            <button
              onClick={() => { setActiveTab('romantic'); setIsEditingEvent(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs uppercase tracking-wider font-medium shrink-0 transition-colors w-full text-justify cursor-pointer ${
                activeTab === 'romantic' ? 'bg-red-600 text-white font-bold' : 'text-[#CCBEA3] hover:bg-[#121212]'
              }`}
            >
              <Heart className="w-4 h-4 shrink-0" /> Tema Especial (Namorados)
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-gold-800/10 mt-6 md:mt-0 space-y-4">
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
      <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
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
          <div className="flex justify-between items-center pb-4 border-b border-gold-800/10">
            <div>
              <h1 className="font-serif text-2xl text-[#FCFBF8] tracking-widest uppercase">
                {activeTab === 'events' && 'Gestão de Próximos Eventos'}
                {activeTab === 'banner' && 'Personalizar Front Banner'}
                {activeTab === 'whatsapp' && 'Configurações de Integração WhatsApp'}
                {activeTab === 'romantic' && 'Tema Especial: Dia dos Namorados'}
              </h1>
              <p className="text-xs text-[#8E8376] mt-1">Configure o site em tempo real sem conhecimento técnico de código.</p>
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-gold-800/20 text-[#CCBEA3] text-xs uppercase tracking-widest font-semibold hover:border-gold-400 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Ver Site
            </button>
          </div>

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


        </div>
      </main>

    </div>
  );
}
