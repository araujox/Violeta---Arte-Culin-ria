import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WINE_ITEMS, WineItem } from '../utils/menuAndWineData';
import { WhatsAppConfig } from '../types';
import { Wine, Award, Star, Globe, Shield, Sparkles, Compass } from 'lucide-react';

interface WineCellarSectionProps {
  whatsAppConfig?: WhatsAppConfig;
}

const CATEGORIES = [
  { id: 'all', label: 'Toda a Coleção' },
  { id: 'chilenos', label: 'Chilenos 🇨🇱' },
  { id: 'portugueses', label: 'Portugueses 🇵🇹' },
  { id: 'argentinos', label: 'Argentinos 🇦🇷' },
  { id: 'espanhois', label: 'Espanhóis 🇪🇸' },
  { id: 'espumantes', label: 'Espumantes 🥂' }
];

export default function WineCellarSection({ whatsAppConfig }: WineCellarSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const filteredWines = WINE_ITEMS.filter(wine => {
    if (activeCategory === 'all') return true;
    return wine.category === activeCategory;
  });

  const handleOrderWine = (wine: WineItem) => {
    const phone = whatsAppConfig?.number || "5581988070000";
    const cleanPhone = phone.replace(/\D/g, '');
    const message = `Olá! Gostaria de reservar uma mesa e incluir em nosso jantar um rótulo especial de vinho: *${wine.name}* (${wine.country} ${wine.flag}) de R$ ${wine.price.toFixed(2)}!`;
    const url = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="adega" className="py-24 bg-gradient-to-b from-[#0b0809] to-[#040203] relative border-t border-gold-800/20 overflow-hidden">
      
      {/* Visual background atmospheric elements - Wine & cellar colored glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3a0a14]/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-80 h-80 bg-gold-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-px w-8 bg-amber-500/40"></span>
            <span className="text-xs uppercase tracking-[0.3em] text-[#C19A5B] font-bold">La Cantina</span>
            <span className="h-px w-8 bg-amber-500/40"></span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#FCFBF8] tracking-wide mt-2 mb-4">
            Adega de Vinhos Climatizada
          </h2>
          <p className="text-sm text-[#8E8376] leading-relaxed">
            Nossa adega subterrânea suspensa abriga safras raras chilenas, portuguesas, argentinas e espumantes nobres selecionados para acompanhar suas melhores noites e jantares.
          </p>
        </div>

        {/* Categories Tab Bar - Mobile Swipe Mode */}
        <div className="relative mb-14 max-w-5xl mx-auto">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0b0809] to-transparent pointer-events-none z-15 md:hidden"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0b0809] to-transparent pointer-events-none z-15 md:hidden"></div>

          <div 
            ref={tabsContainerRef}
            className="flex items-center overflow-x-auto md:overflow-visible md:flex-wrap gap-2 md:gap-3 pt-4 pb-5 px-4 scrollbar-hide snap-x select-none border-b border-gold-800/10 justify-start md:justify-center"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`snap-center shrink-0 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-widest transition-all duration-300 border cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#4a0e1c] to-[#721c29] text-white border-gold-500/30 shadow-lg shadow-red-950/20' 
                      : 'bg-[#120c0e]/80 text-[#8E8376] border-gold-800/10 hover:border-gold-500/20 hover:text-[#FCFBF8]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Vintage Wines Grid */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            >
              {filteredWines.map((wine, index) => {
                return (
                  <motion.div
                    key={wine.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04, duration: 0.35 }}
                    onClick={() => handleOrderWine(wine)}
                    className="group flex flex-col justify-between bg-[#0e0a0b]/90 rounded-xl overflow-hidden border border-gold-800/10 hover:border-gold-400/30 transition-all duration-500 hover:shadow-xl hover:shadow-[#2e0910]/20 cursor-pointer"
                  >
                    {/* Bottle Visual Area */}
                    <div className="h-64 relative bg-[#060405] overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a0b] via-transparent to-transparent z-10"></div>
                      
                      <img 
                        src={wine.image} 
                        alt={wine.name} 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />

                      {/* Flag Indicator badge */}
                      <span className="absolute top-4 right-4 bg-black/75 backdrop-blur-sm border border-gold-800/20 text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 z-20 font-mono text-white">
                        <span>{wine.flag}</span>
                        <span className="text-[10px] uppercase font-semibold tracking-wider">{wine.country}</span>
                      </span>

                      {/* Center subtle glowing emblem */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="w-12 h-12 rounded-full border border-gold-400/40 bg-black/80 flex items-center justify-center shadow-lg shadow-gold-500/10">
                          <Wine className="w-5 h-5 text-gold-400 animate-pulse" />
                        </div>
                      </div>
                    </div>

                    {/* Wine Information Header */}
                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <div className="space-y-2">
                        <p className="text-[#8E8376] text-[9px] font-mono tracking-[0.25em] uppercase">
                          {wine.category === 'espumantes' ? 'Élixir Espumante' : `Safra de Estima`}
                        </p>
                        
                        <h4 className="font-serif text-[14px] md:text-base text-[#FCFBF8] leading-snug group-hover:text-gold-300 transition-colors">
                          {wine.name}
                        </h4>
                      </div>

                      <div className="mt-5 pt-4 border-t border-gold-800/10 flex justify-between items-end">
                        <div>
                          <p className="text-[8px] text-[#555] uppercase tracking-wider">Garrafa</p>
                          <p className="font-mono text-sm md:text-[15px] font-semibold text-gold-400 mt-0.5">
                            R$ {wine.price.toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                        <span className="text-[10px] font-bold tracking-widest text-[#C19A5B] uppercase flex items-center gap-1 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                          Escolher <Compass className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Vintage Label Credentials */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-16 border-t border-gold-800/10 pt-10 text-center">
          <div className="flex items-center gap-3 text-left">
            <span className="text-[#C19A5B] bg-[#2d0911]/50 p-2.5 rounded-full border border-[#721c29]/25">
              <Shield className="w-5 h-5" />
            </span>
            <div>
              <p className="text-[11px] font-bold text-[#FCFBF8] uppercase tracking-wider">Armazenamento Nobre</p>
              <p className="text-[10px] text-[#8E8376]">Controle rígido de luz, umidade e temperatura.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-left">
            <span className="text-[#C19A5B] bg-[#2d0911]/50 p-2.5 rounded-full border border-[#721c29]/25">
              <Star className="w-5 h-5" />
            </span>
            <div>
              <p className="text-[11px] font-bold text-[#FCFBF8] uppercase tracking-wider">Origem Original</p>
              <p className="text-[10px] text-[#8E8376]">Bebidas importadas diretamente das cantinas produtoras.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
