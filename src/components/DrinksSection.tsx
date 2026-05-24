import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DRINK_ITEMS, DrinkItem } from '../utils/menuAndWineData';
import { WhatsAppConfig } from '../types';
import { GlassWater, Coffee, Sparkles, Send, Flame, Compass, Beer } from 'lucide-react';

interface DrinksSectionProps {
  whatsAppConfig?: WhatsAppConfig;
}

export default function DrinksSection({ whatsAppConfig }: DrinksSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'classicos' | 'caipiroscas' | 'cervejas_licores'>('classicos');

  const filteredDrinks = DRINK_ITEMS.filter(drink => drink.category === activeCategory);

  const handleOrderDrink = (drink: DrinkItem) => {
    const phone = whatsAppConfig?.number || "5581988070000";
    const cleanPhone = phone.replace(/\D/g, '');
    const message = `Olá! Gostaria de reservar uma mesa e incluir em nosso atendimento o drink: *${drink.name}* (R$ ${drink.price.toFixed(2).replace('.', ',')})!`;
    const url = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="drinks" className="py-24 bg-[#0a0607] relative border-t border-b border-gold-800/15 overflow-hidden">
      
      {/* Decorative Neon Ambience Glows - Bar Atmospheric Look */}
      <div className="absolute top-1/4 right-5 w-80 h-80 bg-orange-700/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-5 w-80 h-80 bg-[#a21caf]/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-px w-8 bg-orange-500/30"></span>
            <span className="text-xs uppercase tracking-[0.3em] text-orange-400 font-bold">Mixologia Violeta</span>
            <span className="h-px w-8 bg-orange-500/30"></span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#FCFBF8] tracking-wide mt-2 mb-4">
            Coquetelaria & Bar Premium
          </h2>
          <p className="text-sm text-[#8E8376] leading-relaxed">
            Nossos mixologistas combinam destilados nobres com infusões frescas de ervas e xaropes artesanais para criar experiências sensoriais inesquecíveis.
          </p>
        </div>

        {/* Local Section Navigation Tab Bar (Classicos | Caipiroscas | Cervejas_licores) */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex flex-wrap justify-center p-1 bg-[#120a0c] border border-gold-800/15 rounded-xl gap-1 max-w-full">
            <button
              onClick={() => setActiveCategory('classicos')}
              className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeCategory === 'classicos'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md'
                  : 'text-[#8E8376] hover:text-[#FCFBF8]'
              }`}
            >
              <GlassWater className="w-4.5 h-4.5 text-orange-300" />
              Cocktails Tradicionais
            </button>
            <button
              onClick={() => setActiveCategory('caipiroscas')}
              className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeCategory === 'caipiroscas'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md'
                  : 'text-[#8E8376] hover:text-[#FCFBF8]'
              }`}
            >
              <Coffee className="w-4.5 h-4.5 text-amber-300" />
              Caipiroscas & Cafés
            </button>
            <button
              onClick={() => setActiveCategory('cervejas_licores')}
              className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeCategory === 'cervejas_licores'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md'
                  : 'text-[#8E8376] hover:text-[#FCFBF8]'
              }`}
            >
              <Beer className="w-4.5 h-4.5 text-orange-300" />
              Cervejas & Licores
            </button>
          </div>
        </div>

        {/* Selected Category Explanatory */}
        <div className="text-center max-w-xl mx-auto mb-12">
          {activeCategory === 'caipiroscas' ? (
            <div className="bg-[#140b0e]/80 border border-orange-500/20 rounded-2xl p-5 shadow-lg max-w-2xl mx-auto text-left space-y-3">
              <div className="flex items-center gap-2 text-orange-400 font-semibold text-xs uppercase tracking-wider">
                <Flame className="w-4 h-4 animate-pulse" /> Sabores de Frutas Disponíveis
              </div>
              <p className="text-xs text-[#8E8376] leading-relaxed">
                Todas as nossas caipiroscas artesanais são preparadas na hora com frutas frescas de sua preferência. Escolha seu sabor favorito para harmonizar:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Morango 🍓', 'Maracujá 🍋‍', 'Limão 🍋'].map((sabor) => (
                  <span key={sabor} className="bg-[#1c0f13] border border-orange-400/15 text-[11px] text-amber-200 font-medium px-3.5 py-1.5 rounded-lg">
                    {sabor}
                  </span>
                ))}
              </div>
            </div>
          ) : activeCategory === 'cervejas_licores' ? (
            <p className="text-xs text-[#8E8376] italic font-serif">
              "Para refrescar ou finalizar a noite com requinte: cervejas long neck selecionadas de marcas consagradas e licores finos."
            </p>
          ) : (
            <p className="text-xs text-[#8E8376] italic font-serif">
              "Equilíbrio precioso de notas cítricas, adocicadas e amargas para abrir o paladar."
            </p>
          )}
        </div>

        {/* Drinks Grid Area */}
        <div className="min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
              {filteredDrinks.map((drink, index) => {
                return (
                  <motion.div
                    key={drink.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04, duration: 0.4 }}
                    onClick={() => handleOrderDrink(drink)}
                    className="group bg-[#0f0a0c] rounded-xl overflow-hidden border border-gold-800/10 hover:border-orange-500/20 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  >
                    {/* Visual Card Image Cover with dark overlay */}
                    <div className="h-48 relative overflow-hidden bg-black">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a0c] via-transparent to-transparent z-10"></div>
                      <img
                        src={drink.image}
                        alt={drink.name}
                        className="w-full h-full object-cover opacity-45 group-hover:opacity-65 group-hover:scale-105 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Signature drink Badge */}
                      <span className="absolute top-4 left-4 bg-orange-950/80 border border-orange-400/20 text-[9px] uppercase tracking-widest text-orange-200 px-2.5 py-1.5 rounded-md font-mono z-15">
                        {drink.category === 'caipiroscas' ? 'Coquetel e Café' : drink.category === 'cervejas_licores' ? (drink.name === 'Peachtree' || drink.name === 'Licor 43' ? 'Licor Fino' : 'Cerveja Long Neck') : 'Cocktail Clássico'}
                      </span>
                    </div>

                    {/* Content Detail */}
                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="font-serif text-base text-[#FCFBF8] group-hover:text-orange-300 transition-colors">
                            {drink.name}
                          </h4>
                          <span className="font-serif text-sm text-orange-400 font-bold tracking-tight whitespace-nowrap">
                            R$ {drink.price.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                        <p className="text-xs text-[#8E8376] leading-relaxed group-hover:text-[#A89F8F] transition-colors">
                          {drink.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gold-800/5 flex justify-between items-center text-[10px] uppercase tracking-widest text-[#555] group-hover:text-orange-400 transition-colors font-medium">
                        <span>Cantina Violeta</span>
                        <span className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                          Solicitar Drink <Compass className="w-3 h-3" />
                        </span>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Call to Action bar for Drinks */}
        <div className="mt-16 text-center max-w-md mx-auto">
          <p className="text-xs text-[#8E8376] italic mb-4">Deseja um coquetel personalizado ou quer fazer reservas?</p>
          <button
            onClick={() => {
              const phone = whatsAppConfig?.number || "5581988070000";
              const cleanPhone = phone.replace(/\D/g, '');
              const url = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent("Olá! Gostaria de fazer uma reserva de mesa e ver as opções de drinks do bar!")}`;
              window.open(url, '_blank');
            }}
            className="inline-flex items-center gap-2 px-6 py-3 border border-orange-500/20 rounded-lg text-xs font-semibold uppercase tracking-widest text-[#FCFBF8] hover:bg-orange-600/10 hover:border-orange-500/45 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <Send className="w-4 h-4 text-orange-400" /> Fazer Pedido pelo WhatsApp
          </button>
        </div>

      </div>
    </section>
  );
}
