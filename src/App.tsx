import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Wine, BookOpen, Award, Star, 
  MapPin, Heart, ChevronRight, MessageSquare, Instagram, ExternalLink, Lock 
} from 'lucide-react';

import { MenuItem, EventBistro, HeroBanner, WhatsAppConfig } from './types';
import { VIOLETA_MENU, HERO_IMG } from './data';

import AudioAmbiance from './components/AudioAmbiance';
import ReservationForm from './components/ReservationForm';
import ReviewSection from './components/ReviewSection';
import MapsSection from './components/MapsSection';

import { 
  loadEvents, saveEvents, 
  loadHero, saveHero, 
  loadWhatsApp, saveWhatsApp,
  loadRomanticTheme, saveRomanticTheme
} from './utils/adminStorage';
import EventsSection from './components/EventsSection';
import AdminPanel from './components/AdminPanel';
import RomanticPopup from './components/RomanticPopup';

export function VioletaLogo({ className = "w-6 h-6", strokeWidth = 2.2 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Circle */}
      <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth={strokeWidth} />
      
      {/* Inner Circle */}
      <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth={strokeWidth - 0.7} opacity="0.9" />
      
      {/* Stem */}
      <line x1="50" y1="52" x2="50" y2="76" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      
      {/* Bottom Leaves */}
      {/* Left Leaf */}
      <path 
        d="M50 76 C42 76 33 70 33 65 C33 65 42 65 50 76Z" 
        stroke="currentColor" 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Right Leaf */}
      <path 
        d="M50 76 C58 76 67 70 67 65 C67 65 58 65 50 76Z" 
        stroke="currentColor" 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* Outer Petals */}
      <path 
        d="M37 40 C37 54 44 64 50 64" 
        stroke="currentColor" 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
      />
      <path 
        d="M63 40 C63 54 56 64 50 64" 
        stroke="currentColor" 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
      />
      
      {/* Small side petal peaks */}
      <path 
        d="M37 40 C41 42 45 44 45 48" 
        stroke="currentColor" 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
      />
      <path 
        d="M63 40 C59 42 55 44 55 48" 
        stroke="currentColor" 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
      />

      {/* Inner Cup */}
      <path 
        d="M44 48 C44 57 56 57 56 48" 
        stroke="currentColor" 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Center Petal Diamond Peak */}
      <path 
        d="M50 35 L45 41 L50 47 L55 41 Z" 
        stroke="currentColor" 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}

function HeartRain() {
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    const heartList = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      size: 8 + Math.random() * 14,
      duration: 8 + Math.random() * 12,
    }));
    setHearts(heartList);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
      <style>{`
        @keyframes heartFall {
          0% {
            transform: translateY(-5vh) rotate(0deg) scale(0.5);
            opacity: 0;
          }
          15% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(105vh) rotate(320deg) scale(1);
            opacity: 0;
          }
        }
        .animate-heart-fall {
          animation: heartFall linear infinite;
        }
      `}</style>
      {hearts.map((h) => (
        <Heart 
          key={h.id}
          className="absolute text-red-500/25 fill-red-500/15 animate-heart-fall"
          style={{
            left: `${h.left}%`,
            width: `${h.size}px`,
            height: `${h.size}px`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            top: `-20px`
          }}
        />
      ))}
    </div>
  );
}

function FixedCupid({ position }: { position: 'left' | 'right' | 'top-right' }) {
  const [hovered, setHovered] = useState(false);
  const posClasses = {
    'left': 'left-6 bottom-24',
    'right': 'right-6 bottom-24',
    'top-right': 'right-6 top-24'
  };

  return (
    <div 
      className={`fixed ${posClasses[position] || 'right-6 bottom-24'} z-40 bg-[#150508]/90 p-2.5 rounded-full border border-red-500/20 shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="Cupido Violeta"
    >
      {hovered && (
        <div className="absolute right-full mr-3 bg-[#0d0406] border border-red-500/20 text-[10px] text-red-300 px-3 py-1.5 rounded-lg whitespace-nowrap animate-slide-left tracking-wide font-sans italic shadow-lg">
          Celebre o amor no Violeta! 🌹
        </div>
      )}
      <svg viewBox="0 0 100 100" className="w-9 h-9 animate-bounce" style={{ animationDuration: '4s' }}>
        {/* Simple wings */}
        <path d="M 35,45 C 10,30 5,60 35,55 Z" fill="#fbcfe8" className="opacity-80 animate-pulse" />
        <path d="M 65,45 C 90,30 95,60 65,55 Z" fill="#fbcfe8" className="opacity-80 animate-pulse" />
        {/* Bow and Arrow */}
        <path d="M 40,40 L 60,60" stroke="#fbcfe8" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 45,60 L 40,65 L 35,60 Z" fill="#ef4444" />
        {/* Head and Halo */}
        <circle cx="50" cy="35" r="8" fill="#fbcfe8" />
        <circle cx="50" cy="22" r="10" fill="none" stroke="#f0abfc" strokeWidth="1.5" className="animate-pulse" />
        {/* Body heart */}
        <path d="M 50,60 C 45,52 35,48 35,40 C 35,32 45,32 50,38 C 55,32 65,32 65,40 C 65,48 55,52 50,60 Z" fill="#ef4444" className="scale-75 origin-center translate-y-3" />
      </svg>
    </div>
  );
}

export default function App() {
  const [activeMenuTab, setActiveMenuTab] = useState<'entradas' | 'principais' | 'drinks' | 'sobremesas'>('principais');
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  
  // Custom global notification banners
  const [notification, setNotification] = useState<string | null>(null);

  // Persistent customizable states
  const [events, setEvents] = useState<EventBistro[]>(() => loadEvents());
  const [hero, setHero] = useState<HeroBanner>(() => loadHero());
  const [whatsAppConfig, setWhatsAppConfig] = useState<WhatsAppConfig>(() => loadWhatsApp());
  const [romanticTheme, setRomanticTheme] = useState(() => loadRomanticTheme());
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Monitor location hashes for hidden navigation entries
  useEffect(() => {
    const handleLocationHash = () => {
      const hash = window.location.hash;
      if (hash === '#painel-bistro' || hash === '#admin-eventos' || hash === '#gestao-bistro') {
        setIsAdminOpen(true);
      }
    };

    handleLocationHash();
    window.addEventListener('hashchange', handleLocationHash);
    return () => window.removeEventListener('hashchange', handleLocationHash);
  }, []);

  const handleSaveEvents = (newEvents: EventBistro[]) => {
    setEvents(newEvents);
    saveEvents(newEvents);
  };

  const handleSaveHero = (newHero: HeroBanner) => {
    setHero(newHero);
    saveHero(newHero);
  };

  const handleSaveWhatsApp = (newConfig: WhatsAppConfig) => {
    setWhatsAppConfig(newConfig);
    saveWhatsApp(newConfig);
  };

  const handleSaveRomanticTheme = (newConfig: any) => {
    setRomanticTheme(newConfig);
    saveRomanticTheme(newConfig);
  };

  const triggerNotification = (text: string) => {
    setNotification(text);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isRomanticCampaignActive = (() => {
    if (!romanticTheme || !romanticTheme.active) return false;
    
    const todayStr = new Date().toISOString().split('T')[0];
    const { startDate, endDate } = romanticTheme;
    
    if (startDate && todayStr < startDate) return false;
    if (endDate && todayStr > endDate) return false;
    
    return true;
  })();

  const currentHeroTitle = (isRomanticCampaignActive && romanticTheme?.bannerRomanticTitle) 
    ? romanticTheme.bannerRomanticTitle 
    : hero.title;

  const currentHeroSubtitle = (isRomanticCampaignActive && romanticTheme?.bannerRomanticSlogan) 
    ? romanticTheme.bannerRomanticSlogan 
    : hero.subtitle;

  return (
    <div className={`min-h-screen text-[#ECE6D9] font-sans antialiased selection:bg-violeta-bright/40 selection:text-gold-100 ${
      isRomanticCampaignActive ? 'bg-[#090405] theme-romantic' : 'bg-violeta-deep'
    }`}>
      
      {/* Premium Ambient Notification Display */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 animate-fade-in gold-gradient-border bg-[#0a0a0a]/95 text-[#f5ebd6] px-5 py-3.5 rounded-lg shadow-xl flex items-center gap-3 backdrop-blur max-w-sm">
          <Sparkles className="w-5 h-5 text-gold-400 shrink-0" />
          <p className="text-xs font-medium tracking-wide leading-relaxed">{notification}</p>
        </div>
      )}

      {/* Floating Header */}
      <header className="sticky top-0 z-40 bg-[#050505]/95 border-b border-gold-800/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-white/20 p-2.5 bg-violeta-wine shadow-lg shadow-violeta-wine/30 transition-all hover:scale-105">
              <VioletaLogo className="w-6 h-6 text-[#FCFBF8]" strokeWidth={2.4} />
            </div>
            <div>
              <h1 className="font-serif text-xl tracking-[0.2em] text-[#FCFBF8] font-bold transition-colors hover:text-gold-300">VIOLETA</h1>
              <p className="text-[9px] font-sans text-gold-400 tracking-[0.3em] uppercase">Arte Culinária</p>
            </div>
          </div>

          {/* Minimalist Navigation */}
          <nav className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-[#B5AE9E]">
            <button onClick={() => scrollToId('experiencia')} className="hover:text-gold-300 transition-colors cursor-pointer">L'Espresso</button>
            <button onClick={() => scrollToId('menu')} className="hover:text-gold-300 transition-colors cursor-pointer">Il Cardápio</button>
            {events.some(evt => evt.active) && (
              <button onClick={() => scrollToId('eventos')} className="hover:text-gold-300 transition-colors cursor-pointer text-gold-200">Próximos Eventos</button>
            )}
            <button onClick={() => scrollToId('booking')} className="hover:text-gold-300 transition-colors cursor-pointer">Tabelas & Reservas</button>
            <button onClick={() => scrollToId('avaliacoes')} className="hover:text-gold-300 transition-colors cursor-pointer">Avaliações</button>
            <button onClick={() => scrollToId('localizacao')} className="hover:text-gold-300 transition-colors cursor-pointer">Como Chegar</button>
          </nav>

          {/* Action button inside navbar */}
          <button 
            onClick={() => scrollToId('booking')}
            className="border-b-2 border-gold-400 text-gold-300 font-serif tracking-widest text-xs py-1 hover:text-[#fff] hover:border-[#fff] transition-all cursor-pointer"
          >
            RESERVAR MESA
          </button>
        </div>
      </header>

      {/* 1. Immersive Hero Area with soundwaves */}
      <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden py-16 px-4">
        {/* Cinematic dark gradients */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-violeta-dark/60 via-violeta-deep/95 to-violeta-deep"></div>
        
        {/* Generated premium high-end table image decoration */}
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src={hero.image} 
            alt="Violeta Interior Atmospheric View" 
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">
          
          <div className="flex items-center gap-2 border border-gold-400/20 px-3.5 py-1.5 rounded-full mb-6 bg-violeta-wine/40 backdrop-blur-sm shadow-md shadow-violeta-wine/10">
            <Award className="w-3.5 h-3.5 text-gold-300 animate-pulse" />
            <span className="text-[10px] tracking-widest text-[#FFFdfa] uppercase font-sans font-medium">Sabor, Arte & Contemporaneidade</span>
          </div>

          <h2 className="font-serif text-5xl md:text-8xl tracking-[0.1em] text-[#FCFBF8] leading-tight mb-4 select-none uppercase">
            {currentHeroTitle}
          </h2>
          <p className="font-serif italic text-lg md:text-2xl text-gold-200 tracking-wide max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            {currentHeroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 mb-12">
            <button 
              onClick={() => hero.buttonLink.startsWith('#') ? scrollToId(hero.buttonLink.substring(1)) : window.open(hero.buttonLink, '_blank')}
              className="px-8 py-3.5 bg-gold-500 text-neutral-950 text-xs font-semibold uppercase tracking-widest transition-all hover:bg-gold-400 hover:scale-105 shadow-md cursor-pointer rounded-lg"
            >
              {hero.buttonText}
            </button>
            <button 
              onClick={() => window.open('https://www.instagram.com/violetabstr/', '_blank')}
              className="px-8 py-3.5 border border-[#CCBEA3]/40 text-xs font-semibold uppercase tracking-widest transition-all hover:bg-[#CCBEA3]/10 hover:border-gold-300 hover:scale-105 cursor-pointer flex items-center gap-1.5"
            >
              <Instagram className="w-4 h-4 text-gold-300" /> INSTAGRAM <ExternalLink className="w-3 h-3 text-gold-300" />
            </button>
          </div>

          {/* Child Synthesized audio ambiance */}
          <AudioAmbiance onNotify={triggerNotification} />
        </div>

        {/* Framing lines */}
        <div className="absolute left-8 bottom-0 top-0 w-[1px] bg-gold-800/5 hidden lg:block"></div>
        <div className="absolute right-8 bottom-0 top-0 w-[1px] bg-gold-800/5 hidden lg:block"></div>
      </section>

      {/* 2. Philosophy Area (L'Espresso e a Arte Culinária) */}
      <section id="experiencia" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gold-800/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#B59C66] font-semibold">01 / Conceito de Autoria</span>
            <h3 className="font-serif text-3xl md:text-5xl text-[#FCFBF8] tracking-wide leading-tight">
              A Fusão do Clássico <br />com a Sensibilidade
            </h3>
            <p className="text-[#BCAFA3] text-sm leading-relaxed text-justify">
              O <strong>Violeta - Arte Culinária</strong> nasce da paixão de traduzir ingredientes regionais nobres em quadros comestíveis. Em nosso espaço acolhedor e intimista, cada prato é uma expressão poética inspirada em técnicas de redução e caramelização contemporâneas.
            </p>
            <p className="text-[#8E8376] text-xs italic leading-relaxed">
              Trabalhamos com cortes nobres como o Ancho Angus, risotos emulsificados com queijo mascarpone e flores comestíveis que homenageiam o tom violeta de nossa marca. Em harmonia com as luzes de velas e o silêncio suntuoso, sua visita se torna inesquecível.
            </p>
            
            <div className="pt-4 flex gap-8">
              <div>
                <h4 className="font-serif text-2xl text-gold-400 font-bold">100%</h4>
                <p className="text-[10px] text-[#A89F8F] uppercase tracking-wider">Ingredientes Frescos</p>
              </div>
              <div className="border-l border-gold-800/30 pl-8">
                <h4 className="font-serif text-2xl text-gold-400 font-bold">Autoral</h4>
                <p className="text-[10px] text-[#A89F8F] uppercase tracking-wider">Menu Sazonal</p>
              </div>
              <div className="border-l border-gold-800/30 pl-8">
                <h4 className="font-serif text-2xl text-gold-400 font-bold">VIP</h4>
                <p className="text-[10px] text-[#A89F8F] uppercase tracking-wider">Atendimento Reservado</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-6 relative">
            
            <div className="hidden lg:flex absolute -top-8 -left-8 z-20 w-24 h-24 rounded-full bg-violeta-wine border border-white/20 items-center justify-center flex-col shadow-lg shadow-violeta-wine/30 hover:scale-110 transition-transform">
              <VioletaLogo className="w-8 h-8 text-[#FCFBF8]" strokeWidth={2.4} />
              <span className="text-[7px] font-bold text-gold-300 tracking-wider text-center block mt-1 font-sans">VIOLETA ARTE</span>
            </div>

            <div className="md:col-span-8 group relative overflow-hidden rounded-lg gold-gradient-border shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=900" 
                alt="Chef preparing signature plates" 
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <p className="text-[9px] text-[#CCBEA3] uppercase tracking-widest font-semibold">Atendimento Concierge</p>
                <p className="font-serif text-sm text-[#FCFBF8]">Alta Gastronomia Surubim</p>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col gap-6">
              <div className="p-5 rounded-lg bg-neutral-900 border border-gold-800/10">
                <Award className="w-6 h-6 text-gold-400 mb-3" />
                <h5 className="font-serif text-sm text-[#FCFBF8] mb-1">Qualidade Michelin</h5>
                <p className="text-[10px] text-[#8E8376] leading-relaxed">Em termos de apresentação visual, ingredientes requintados e sabores que emocionam.</p>
              </div>

              <div className="p-5 rounded-lg bg-neutral-900 border border-gold-800/10 flex-1 flex flex-col justify-between">
                <div>
                  <Sparkles className="w-6 h-6 text-gold-400 mb-3" />
                  <h5 className="font-serif text-sm text-[#FCFBF8] mb-1">Sabor Violeta</h5>
                  <p className="text-[10px] text-[#8E8376] leading-relaxed">Infusões florais exclusivas e drinks alquímicos de Clitória que reagem ao sommelier.</p>
                </div>
                <div className="pt-4 border-t border-gold-800/10 mt-4">
                  <p className="text-[9px] text-gold-400 tracking-widest uppercase">Pétalas Comestíveis</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Cardapio Area (Menu Explorer) */}
      <section id="menu" className="py-24 bg-violeta-dark/30 relative border-t border-b border-gold-800/10">
        
        <div className="absolute top-1/4 left-1/2 w-96 h-96 bg-violeta-wine/15 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B59C66] font-semibold">02 / Il Cardápio</span>
            <h3 className="font-serif text-4xl md:text-5xl text-[#FCFBF8] tracking-wide mt-2 mb-4">
              Nossas Criações de Assinatura
            </h3>
            <p className="text-sm text-[#8E8376]">
              Explore nosso menu dividido entre belas entradas, robustos pratos principais, drinks aromáticos e requintadas sobremesas sob luz de velas.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex justify-center flex-wrap gap-4 md:gap-8 mb-16 border-b border-gold-800/10 pb-4 max-w-3xl mx-auto">
            {(['entradas', 'principais', 'drinks', 'sobremesas'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveMenuTab(cat);
                  triggerNotification(`Visualizando categoria: ${cat}`);
                }}
                className={`text-xs tracking-[0.2em] uppercase py-2 transition-all border-b-2 font-medium cursor-pointer ${
                  activeMenuTab === cat 
                    ? 'border-gold-400 text-gold-300 font-bold scale-105' 
                    : 'border-transparent text-neutral-500 hover:text-neutral-200'
                }`}
              >
                {cat === 'entradas' && "Entradas"}
                {cat === 'principais' && "Pratos Principais"}
                {cat === 'drinks' && "Drinks autorais"}
                {cat === 'sobremesas' && "I Dolci (Sobremesas)"}
              </button>
            ))}
          </div>

          {/* Grid Layout Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {VIOLETA_MENU
              .filter(item => item.category === activeMenuTab)
              .map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedMenuItem(item)}
                  className="group bg-[#0d0d0d] rounded-lg overflow-hidden border border-gold-800/5 hover:border-gold-400/20 transition-all duration-300 gold-glow-hover flex flex-col sm:flex-row cursor-pointer"
                >
                  
                  {/* Item Image Thumbnail Wrapper */}
                  <div className="sm:w-44 h-48 sm:h-full relative overflow-hidden shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[#050505]/20 group-hover:bg-transparent"></div>
                  </div>

                  {/* Text card details content */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h4 className="font-serif text-base text-[#FCFBF8] tracking-wide group-hover:text-gold-300 transition-colors">
                          {item.name}
                        </h4>
                        <span className="font-serif text-base text-gold-400 font-bold shrink-0">
                          R$ {item.price}
                        </span>
                      </div>
                      
                      <p className="text-xs text-[#8E8376] leading-relaxed line-clamp-3 mb-4">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-gold-400 border-t border-gold-800/10 pt-3">
                      <Wine className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">Sugerido com: {item.pairing}</span>
                    </div>
                  </div>

                </div>
              ))}
          </div>

          <div className="mt-16 gold-gradient-border p-6 rounded-lg bg-violeta-dark/75 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-white/10 bg-violeta-wine flex items-center justify-center shrink-0 shadow-md shadow-violeta-wine/20">
                <VioletaLogo className="w-7 h-7 text-[#FCFBF8]" strokeWidth={2.4} />
              </div>
              <div className="text-left">
                <p className="text-xs text-[#FCFBF8] font-bold tracking-wider">SAFRAS ESPECIAIS & DRINKS DE AUTORIA</p>
                <p className="text-[11px] text-[#8E8376]">Nossa adega conta com rótulos especiais para harmonizar as notas ricas e cítricas de cada prato.</p>
              </div>
            </div>
            <button 
              onClick={() => scrollToId('booking')}
              className="px-6 py-2 border border-gold-500/30 text-[10px] uppercase font-bold tracking-widest text-[#FCFBF8] hover:bg-gold-500 hover:text-neutral-950 rounded transition-all shrink-0 cursor-pointer"
            >
              Fazer Reserva
            </button>
          </div>

        </div>
      </section>

      {/* 4. Próximos Eventos Section */}
      <EventsSection 
        events={events} 
        whatsAppConfig={whatsAppConfig} 
        romanticConfig={romanticTheme || undefined}
        onNotify={triggerNotification} 
      />

      {/* 4. Detail Dish modal overlay */}
      {selectedMenuItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c0c0c] border border-gold-400/30 max-w-3xl w-full rounded-xl overflow-hidden shadow-2xl animate-slide-up flex flex-col md:flex-row max-h-[90vh]">
            
            {/* Left Image wrapper */}
            <div className="md:w-1/2 relative bg-neutral-950 h-56 md:h-auto shrink-0">
              <img 
                src={selectedMenuItem.image} 
                alt={selectedMenuItem.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 border border-gold-400/40 p-2.5 bg-neutral-950/80 rounded">
                <span className="text-[8px] font-sans tracking-widest text-gold-300 block uppercase">Nível Sensorial</span>
                <span className="font-serif text-base text-white font-bold leading-none">Arte Culinária Premium</span>
              </div>
            </div>

            {/* Content info wrapper */}
            <div className="p-8 flex-1 overflow-y-auto space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="font-serif text-xl text-[#FCFBF8] tracking-wide">{selectedMenuItem.name}</h4>
                  <p className="text-[10px] uppercase text-gold-400 tracking-wider font-semibold mt-0.5">{selectedMenuItem.category}</p>
                </div>
                <span className="font-serif text-lg text-gold-400 font-bold shrink-0">R$ {selectedMenuItem.price}</span>
              </div>

              <div className="border-t border-b border-gold-800/10 py-3">
                <p className="text-xs text-[#ECE6D9] leading-relaxed">{selectedMenuItem.description}</p>
              </div>

              {/* Culinary details and pairing option */}
              <div className="bg-[#121212] p-4 rounded border border-gold-800/5 space-y-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gold-400" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold-300">Crônicas do Prato</span>
                </div>
                <p className="text-[11px] text-[#A89F8F] leading-relaxed italic">
                  "{selectedMenuItem.anecdote}"
                </p>
              </div>

              <div className="bg-gold-900/10 p-4 rounded border border-gold-300/10 space-y-1">
                <h6 className="text-[9px] uppercase text-gold-400 font-bold tracking-widest flex items-center gap-1.5">
                  <Wine className="w-3.5 h-3.5" /> SUGERIDO PARA COMPANHIA
                </h6>
                <p className="text-xs text-white mt-1">{selectedMenuItem.pairing}</p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  onClick={() => {
                    setSelectedMenuItem(null);
                    scrollToId('booking');
                    triggerNotification(`Preencha a ficha para assentar-se e saborear o ${selectedMenuItem.name}!`);
                  }}
                  className="px-6 py-2 bg-gold-400 text-neutral-950 text-xs uppercase font-bold tracking-widest rounded hover:bg-gold-300 transition-colors cursor-pointer"
                >
                  Pedir no WhatsApp
                </button>
                <button 
                  onClick={() => setSelectedMenuItem(null)}
                  className="px-6 py-2 bg-neutral-900 text-white text-xs uppercase font-bold tracking-widest border border-gold-800/20 rounded hover:border-gold-300 transition-colors cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 5. Booking area (Interactive Booking System) */}
      <section id="booking" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gold-800/10">
        <ReservationForm whatsAppConfig={whatsAppConfig} onNotify={triggerNotification} />
      </section>

      {/* 6. Guest Reviews area */}
      <section id="avaliacoes" className="py-24 bg-violeta-dark/20 border-t border-gold-800/10 relative">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violeta-wine/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B59C66] font-semibold">04 / Depoimentos Reais</span>
            <h3 className="font-serif text-3xl md:text-5xl text-[#FCFBF8] tracking-wide mt-2 mb-4">
              Assinaturas de Paladar no Google
            </h3>
            <p className="text-sm text-[#8E8376]">
              Abaixo compilamos algumas das avaliações que hóspedes reais depositaram carinhosamente no Google Maps. Assine nosso livro de visitas você também.
            </p>
          </div>

          <ReviewSection onNotify={triggerNotification} />
        </div>
      </section>

      {/* 7. Maps & Location Section */}
      <section id="localizacao" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gold-800/10">
        <MapsSection whatsAppConfig={whatsAppConfig} />
      </section>

      {/* 8. Luxury Footer */}
      <footer className="bg-violeta-dark border-t border-gold-800/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center gap-3 text-center md:text-left justify-center md:justify-start">
            <div className="rounded-full border border-white/10 p-2 bg-violeta-wine shadow-md shadow-violeta-wine/20">
              <VioletaLogo className="w-5 h-5 text-[#FCFBF8]" strokeWidth={2.4} />
            </div>
            <div>
              <h5 className="font-serif text-xl tracking-[0.2em] text-[#FCFBF8] font-bold">VIOLETA</h5>
              <p className="text-[9px] font-sans text-gold-400 tracking-[0.3em] uppercase mt-0.5">Arte Culinária</p>
            </div>
          </div>

          <div className="text-center text-xs text-[#8E8376] space-y-1">
            <p className="flex items-center justify-center gap-1.5 flex-wrap">
              © 2026 Violeta - Arte Culinária. Todos os direitos de etiqueta reservados.
              <button 
                onClick={() => {
                  setIsAdminOpen(true);
                  triggerNotification('Solicitando autenticação para o Painel Administrativo...');
                }}
                className="text-neutral-800 hover:text-gold-400 transition-colors cursor-pointer p-1"
                title="Área Administrativa Violeta"
                id="footer-admin-lock"
              >
                <Lock className="w-3 h-3" />
              </button>
            </p>
            <p>E-mail Oficial de Contato: <span className="text-gold-400">atendimento@violetarestaurante.com.br</span></p>
            <p>Roteado com carinho por Surubim - PE, Pernambuco.</p>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => window.open('https://www.instagram.com/violetabstr/', '_blank')}
              className="w-10 h-10 rounded-full border border-gold-800/20 flex items-center justify-center text-[#B5AE9E] hover:text-gold-400 hover:border-gold-400 transition-all cursor-pointer"
              title="Instagram @violetabstr"
            >
              <Instagram className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scrollToId('hero')}
              className="px-4 py-2 border border-gold-800/20 text-[9px] uppercase tracking-widest text-[#B5AE9E] hover:text-gold-400 hover:border-gold-400 transition-all cursor-pointer"
              title="Ir para o topo"
            >
              Voltar ao Topo
            </button>
          </div>

        </div>
      </footer>

      {/* 9. Portal Administrativo Violeta Overlay */}
      {isAdminOpen && (
        <AdminPanel 
          onClose={() => {
            setIsAdminOpen(false);
            window.location.hash = ''; // Clear Hash parameters to return cleanly
          }}
          events={events}
          onSaveEvents={handleSaveEvents}
          hero={hero}
          onSaveHero={handleSaveHero}
          whatsAppConfig={whatsAppConfig}
          onSaveWhatsApp={handleSaveWhatsApp}
          romanticTheme={romanticTheme || undefined}
          onSaveRomanticTheme={handleSaveRomanticTheme}
          onNotify={triggerNotification}
        />
      )}

      {/* 10. Romantic Campaign Overlays & Portals */}
      {isRomanticCampaignActive && romanticTheme && (
        <>
          <RomanticPopup config={romanticTheme} />
          {romanticTheme.enableHeartRain && <HeartRain />}
          <FixedCupid position={romanticTheme.cupidPosition} />
        </>
      )}


    </div>
  );
}
