import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_CATEGORIES, FULL_MENU_ITEMS, FullMenuItem } from '../utils/menuAndWineData';
import { WhatsAppConfig } from '../types';
import { Send, FileText, ChevronRight, Sparkles, Compass, Utensils } from 'lucide-react';

interface FullMenuSectionProps {
  whatsAppConfig?: WhatsAppConfig;
}

export default function FullMenuSection({ whatsAppConfig }: FullMenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('entradas');
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const activeCategoryInfo = MENU_CATEGORIES.find(c => c.id === activeCategory);
  const filteredItems = FULL_MENU_ITEMS.filter(item => item.category === activeCategory);

  const handleWhatsAppCTA = () => {
    const phone = whatsAppConfig?.number || "5581988070000";
    const cleanPhone = phone.replace(/\D/g, '');
    const message = "Olá! Gostei muito do cardápio completo do Violeta. Gostaria de verificar a disponibilidade e fazer uma reserva para viver essa experiência gastronômica.";
    const url = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleItemClick = (item: FullMenuItem) => {
    const phone = whatsAppConfig?.number || "5581988070000";
    const cleanPhone = phone.replace(/\D/g, '');
    const message = `Olá! Gostaria de fazer uma reserva de mesa e incluir este prato em nossa noite: *${item.name}* (R$ ${item.price.toFixed(2)})!`;
    const url = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="cardapio-completo" className="py-24 bg-[#080808] relative border-t border-b border-gold-800/15 overflow-hidden">
      {/* Dynamic Background Blur Glows */}
      <div className="absolute top-1/3 left-1/10 w-96 h-96 bg-violeta-wine/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/10 w-96 h-96 bg-gold-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-px w-8 bg-gold-500/40"></span>
            <span className="text-xs uppercase tracking-[0.3em] text-[#B59C66] font-bold">Il Cardápio Completo</span>
            <span className="h-px w-8 bg-gold-500/40"></span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#FCFBF8] tracking-wide mt-2 mb-4">
            Menu Gastronômico Completo
          </h2>
          <p className="text-sm text-[#8E8376] leading-relaxed">
            Navegue pelas nossas requintadas criações gastronômicas. Ingredientes frescos cuidadosamente cultivados e técnicas contemporâneas que despertam aromas nobres.
          </p>
        </div>

        {/* Categories Tab Bar - Mobile Responsive Horizontal Scroll */}
        <div className="relative mb-12 max-w-5xl mx-auto">
          {/* Faded edges indicators for overflow */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#080808] to-transparent pointer-events-none z-15 md:hidden"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none z-15 md:hidden"></div>

          <div 
            ref={tabsContainerRef}
            className="flex items-center overflow-x-auto md:overflow-visible md:flex-wrap gap-2 md:gap-4 pt-4 pb-5 px-4 scrollbar-hide snap-x select-none border-b border-gold-800/10 justify-start md:justify-center"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`snap-center shrink-0 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 border cursor-pointer ${
                    isActive 
                      ? 'bg-gold-400 text-neutral-950 border-gold-400 shadow-md shadow-gold-500/10' 
                      : 'bg-[#0f0f0f] text-[#8E8376] border-gold-800/10 hover:border-gold-500/20 hover:text-[#FCFBF8]'
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Category Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in">
          {activeCategoryInfo && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-[#FCFBF8]/45 text-[10px] font-mono tracking-widest uppercase mb-1">
                {activeCategoryInfo.title}
              </p>
              <p className="text-xs text-[#8E8376] italic font-serif">
                "{activeCategoryInfo.description}"
              </p>
            </motion.div>
          )}
        </div>

        {/* Grid Area */}
        <div className="min-h-[300px] mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-6xl mx-auto"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -12 : 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  onClick={() => handleItemClick(item)}
                  className="group flex flex-col justify-between p-5 rounded-lg border border-gold-800/10 bg-[#0c0c0c]/80 hover:bg-[#0c0c0c] hover:border-gold-500/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <h4 className="font-serif text-[15px] md:text-base text-[#FCFBF8] tracking-wide group-hover:text-gold-300 font-medium transition-colors">
                      {item.name}
                    </h4>
                    <span className="font-serif text-sm md:text-base text-gold-400 font-bold tracking-tight whitespace-nowrap pt-0.5">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <p className="text-[11px] md:text-xs text-[#8E8376] leading-relaxed group-hover:text-[#A89F8F] transition-colors mb-4">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between text-[9px] text-[#555] group-hover:text-gold-500/65 border-t border-gold-800/5 pt-3 uppercase tracking-widest transition-colors font-medium">
                    <span>Menu Violeta</span>
                    <span className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Solicitar Prato <Compass className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Call To Action (Gostou do nosso cardápio?) */}
        <div className="max-w-3xl mx-auto mt-20">
          <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-[#0e0e0e] to-[#070707] border border-gold-500/15 relative overflow-hidden text-center gold-gradient-border shadow-xl">
            <div className="absolute inset-0 bg-violeta-wine/5 pointer-events-none"></div>

            <div className="relative z-10 space-y-5">
              <div className="w-12 h-12 rounded-full border border-gold-500/30 bg-[#121212] flex items-center justify-center mx-auto shadow-lg shadow-gold-500/5">
                <Utensils className="w-5 h-5 text-gold-400" />
              </div>

              <h3 className="font-serif text-2xl md:text-3xl text-[#FCFBF8] tracking-wide">
                Gostou do nosso cardápio?
              </h3>
              
              <p className="text-xs md:text-sm text-[#8E8376] max-w-lg mx-auto leading-relaxed">
                Reserve sua mesa e viva uma experiência gastronômica completa sob a iluminação de velas de nossa charmosa atmosfera contemporânea.
              </p>

              <div className="pt-4">
                <button
                  onClick={handleWhatsAppCTA}
                  className="px-8 py-3.5 bg-gold-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:bg-gold-500 transition-all shadow-lg shadow-gold-500/10 active:scale-95 mx-auto cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Reservar pelo WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
