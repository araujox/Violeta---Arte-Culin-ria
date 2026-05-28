import React from 'react';
import { Calendar, Clock, MessageSquare, Play, Sparkles, Heart, Gift } from 'lucide-react';
import { EventBistro, WhatsAppConfig, RomanticThemeConfig, SpecialCampaignConfig } from '../types';
import { getEmbedUrl, getWhatsAppLink } from '../utils/adminStorage';

interface EventsSectionProps {
  events: EventBistro[];
  whatsAppConfig: WhatsAppConfig;
  romanticConfig?: RomanticThemeConfig;
  natalConfig?: SpecialCampaignConfig;
  pascoaConfig?: SpecialCampaignConfig;
  anoNovoConfig?: SpecialCampaignConfig;
  onNotify: (msg: string) => void;
}

function FloatingHeartsBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-50">
      {[...Array(8)].map((_, i) => (
        <svg
          key={i}
          className="absolute text-red-500/25 fill-red-500/15 animate-float-heart"
          style={{
            left: `${10 + i * 12 + Math.random() * 5}%`,
            bottom: `-20px`,
            width: `${10 + (i % 4) * 5}px`,
            height: `${10 + (i % 4) * 5}px`,
            animationDelay: `${i * 1.2}s`,
            animationDuration: `${7 + (i % 3) * 3}s`,
          }}
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ))}
    </div>
  );
}

function FloatingSnowBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
      {[...Array(10)].map((_, i) => (
        <span
          key={i}
          className="absolute text-emerald-400/20 text-lg animate-float-heart"
          style={{
            left: `${5 + i * 10 + Math.random() * 5}%`,
            bottom: `-20px`,
            animationDelay: `${i * 0.9}s`,
            animationDuration: `${8 + (i % 3) * 4}s`,
          }}
        >
          ❄️
        </span>
      ))}
    </div>
  );
}

function FloatingEggsBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
      {[...Array(8)].map((_, i) => (
        <span
          key={i}
          className="absolute text-amber-500/20 text-lg animate-float-heart"
          style={{
            left: `${8 + i * 12 + Math.random() * 5}%`,
            bottom: `-20px`,
            animationDelay: `${i * 1.5}s`,
            animationDuration: `${10 + (i % 4) * 3}s`,
          }}
        >
          🥚
        </span>
      ))}
    </div>
  );
}

function FloatingSparklesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-55">
      {[...Array(10)].map((_, i) => (
        <span
          key={i}
          className="absolute text-amber-400/30 text-lg animate-float-heart"
          style={{
            left: `${10 + i * 10 + Math.random() * 5}%`,
            bottom: `-20px`,
            animationDelay: `${i * 1.1}s`,
            animationDuration: `${6 + (i % 3) * 3}s`,
          }}
        >
          ✨
        </span>
      ))}
    </div>
  );
}

export default function EventsSection({ 
  events, 
  whatsAppConfig, 
  romanticConfig, 
  natalConfig,
  pascoaConfig,
  anoNovoConfig,
  onNotify 
}: EventsSectionProps) {
  // Only display active events
  const activeEvents = events.filter(evt => evt.active);

  if (activeEvents.length === 0) {
    return null; // Don't render anything if no events are active
  }

  const isRomanticActive = romanticConfig?.active === true || String(romanticConfig?.active) === 'true';
  const isNatalActive = natalConfig?.active === true || String(natalConfig?.active) === 'true';
  const isPascoaActive = pascoaConfig?.active === true || String(pascoaConfig?.active) === 'true';
  const isAnoNovoActive = anoNovoConfig?.active === true || String(anoNovoConfig?.active) === 'true';

  return (
    <section id="eventos" className="py-24 bg-[#080808]/40 border-t border-b border-gold-800/10 relative overflow-hidden">
      {/* Styles for campaigns */}
      <style>{`
        @keyframes floatHeart {
          0% {
            transform: translateY(0) scale(0.8) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-160px) scale(1.2) rotate(15deg);
            opacity: 0;
          }
        }
        .animate-float-heart {
          animation: floatHeart 10s infinite linear;
        }
        @keyframes romanticPulse {
          0%, 100% {
            box-shadow: 0 0 15px rgba(220, 38, 38, 0.08);
            border-color: rgba(220, 38, 38, 0.15);
          }
          50% {
            box-shadow: 0 0 30px rgba(220, 38, 38, 0.22);
            border-color: rgba(220, 38, 38, 0.35);
          }
        }
        .animate-romantic-pulse {
          animation: romanticPulse 4s infinite ease-in-out;
        }
        @keyframes natalPulse {
          0%, 100% {
            box-shadow: 0 0 15px rgba(16, 185, 129, 0.08);
            border-color: rgba(16, 185, 129, 0.15);
          }
          50% {
            box-shadow: 0 0 30px rgba(16, 185, 129, 0.22);
            border-color: rgba(16, 185, 129, 0.35);
          }
        }
        .animate-natal-pulse {
          animation: natalPulse 4s infinite ease-in-out;
        }
        @keyframes pascoaPulse {
          0%, 100% {
            box-shadow: 0 0 15px rgba(217, 119, 6, 0.08);
            border-color: rgba(217, 119, 6, 0.15);
          }
          50% {
            box-shadow: 0 0 30px rgba(217, 119, 6, 0.22);
            border-color: rgba(217, 119, 6, 0.35);
          }
        }
        .animate-pascoa-pulse {
          animation: pascoaPulse 4s infinite ease-in-out;
        }
        @keyframes anoNovoPulse {
          0%, 100% {
            box-shadow: 0 0 15px rgba(251, 191, 36, 0.1);
            border-color: rgba(251, 191, 36, 0.18);
          }
          50% {
            box-shadow: 0 0 30px rgba(251, 191, 36, 0.28);
            border-color: rgba(251, 191, 36, 0.4);
          }
        }
        .animate-anonovo-pulse {
          animation: anoNovoPulse 4s infinite ease-in-out;
        }
        @keyframes subtleHeartBeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-beat {
          animation: subtleHeartBeat 2s infinite ease-in-out;
        }
      `}</style>

      {/* Visual Ambient Blur based on active theme */}
      {isRomanticActive && (
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-red-950/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      )}
      {isNatalActive && (
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-emerald-950/25 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      )}
      {isPascoaActive && (
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-amber-950/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      )}
      {isAnoNovoActive && (
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-amber-900/15 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      )}
      {!isRomanticActive && !isNatalActive && !isPascoaActive && !isAnoNovoActive && (
        <div className="absolute top-1/2 left-10 w-80 h-80 bg-violeta-wine/10 rounded-full blur-[100px] pointer-events-none"></div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[#B59C66] font-semibold flex items-center justify-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full animate-ping ${
              isRomanticActive ? 'bg-red-500' : 
              isNatalActive ? 'bg-emerald-500' :
              isPascoaActive ? 'bg-amber-500' :
              isAnoNovoActive ? 'bg-amber-400' : 'bg-gold-400'
            }`}></span>
            03 / Próximos Eventos
          </span>
          <h3 className="font-serif text-3xl md:text-5xl text-[#FCFBF8] tracking-wide mt-2 mb-4">
            {isRomanticActive ? "Experiências e Eventos de Romance" : 
             isNatalActive ? "Atmosfera e Jantares de Natal" :
             isPascoaActive ? "Comemorações e Pratos de Páscoa" :
             isAnoNovoActive ? "Brindes e Ceia de Réveillon 2027" :
             "Eventos no Bistrô Violeta"}
          </h3>
          <p className="text-sm text-[#8E8376]">
            {isRomanticActive && "Celebre a época mais romântica do ano com cardápios de autoria exclusivos e noites inesquecíveis sob a luz de velas."}
            {isNatalActive && "Traga toda a família para saborear clássicos reeditados pelo Chefe, em noites preenchidas com as mais doces canções de natal."}
            {isPascoaActive && "Encante-se com nossa receita autoral de bacalhau confitado harmonizado com vinhos brancos premiados, além de texturas doces de cacau."}
            {isAnoNovoActive && "Prepare suas melhores expectativas para a grande virada de 2027. Jantar premium, fogos silenciosos elegantes e vinhos de prestígio."}
            {!isRomanticActive && !isNatalActive && !isPascoaActive && !isAnoNovoActive && 
             "Reserve o seu assento para jantares harmonizados, noites musicais sob a luz de velas e masterclasses de culinária artística em Surubim."}
          </p>
        </div>

        {/* List of events */}
        <div className="space-y-16">
          {activeEvents.map((evt, idx) => {
            const embedUrl = getEmbedUrl(evt.video);
            const isEven = idx % 2 === 0;
            const isRomanticSpecial = isRomanticActive && evt.isRomanticSpecial === true;

            // Determine if campaign is active and choose appropriate reservation message
            const customBookingMsg = (() => {
              if (isRomanticSpecial && romanticConfig?.waRomanticMessage) return romanticConfig.waRomanticMessage;
              if (isNatalActive && natalConfig?.waMessage) return natalConfig.waMessage;
              if (isPascoaActive && pascoaConfig?.waMessage) return pascoaConfig.waMessage;
              if (isAnoNovoActive && anoNovoConfig?.waMessage) return anoNovoConfig.waMessage;
              return evt.whatsappMessage || `Olá! Gostaria de reservar para o evento: ${evt.title}`;
            })();

            const waLink = getWhatsAppLink(whatsAppConfig.number, customBookingMsg);

            // Styling variables depending on theme state
            const getCardStyles = () => {
              if (isRomanticSpecial) {
                return 'bg-gradient-to-br from-[#120508] via-[#09090c] to-[#0c0406] border-red-500/20 shadow-xl animate-romantic-pulse';
              }
              if (isNatalActive) {
                return 'bg-gradient-to-br from-[#041009] via-[#060c07] to-[#030d07] border-emerald-500/20 shadow-xl animate-natal-pulse';
              }
              if (isPascoaActive) {
                return 'bg-gradient-to-br from-[#100905] via-[#0b0806] to-[#120a06] border-amber-600/20 shadow-xl animate-pascoa-pulse';
              }
              if (isAnoNovoActive) {
                return 'bg-gradient-to-br from-[#06060c] via-[#08080f] to-[#030307] border-amber-400/15 shadow-xl animate-anonovo-pulse';
              }
              return 'bg-[#0d0d0d] border-gold-800/10 shadow-xl hover:border-gold-400/20';
            };

            const getBadge = () => {
              if (isRomanticSpecial) {
                return (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-900/20 border border-red-500/30 text-red-300 text-[10px] uppercase font-bold tracking-widest leading-none animate-beat">
                    <Heart className="w-3 h-3 text-red-500 fill-red-500" /> Especial Dia dos Namorados
                  </span>
                );
              }
              if (isNatalActive) {
                return (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/20 border border-emerald-500/30 text-emerald-300 text-[10px] uppercase font-bold tracking-widest leading-none">
                    <Gift className="w-3 h-3 text-emerald-500 fill-emerald-500" /> Cardápio de Natal
                  </span>
                );
              }
              if (isPascoaActive) {
                return (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-900/25 border border-amber-500/20 text-amber-300 text-[10px] uppercase font-bold tracking-widest leading-none">
                    🥚 Especial de Páscoa
                  </span>
                );
              }
              if (isAnoNovoActive) {
                return (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-950/30 border border-amber-400/20 text-amber-200 text-[10px] uppercase font-bold tracking-widest leading-none animate-pulse">
                    ✨ Brinde da Virada 2027
                  </span>
                );
              }
              return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-900/10 border border-gold-400/20 text-gold-300 text-[10px] uppercase font-bold tracking-widest leading-none">
                  <Sparkles className="w-3 h-3" /> Evento Exclusivo
                </span>
              );
            };

            const getBtnStyles = () => {
              if (isRomanticSpecial) {
                return 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-950/60';
              }
              if (isNatalActive) {
                return 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white shadow-emerald-950/40';
              }
              if (isPascoaActive) {
                return 'bg-gradient-to-r from-amber-700 to-yellow-700 hover:from-amber-600 hover:to-yellow-600 text-white shadow-amber-950/40';
              }
              if (isAnoNovoActive) {
                return 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold shadow-amber-950/40';
              }
              return 'bg-gold-500 hover:bg-gold-400 text-neutral-950';
            };

            const getBorderClass = () => {
              if (isRomanticSpecial) return 'border-red-500/20';
              if (isNatalActive) return 'border-emerald-500/20';
              if (isPascoaActive) return 'border-amber-500/20';
              if (isAnoNovoActive) return 'border-amber-400/20';
              return 'gold-gradient-border';
            };

            return (
              <div 
                key={evt.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 lg:p-10 rounded-2xl border transition-all duration-300 relative group ${getCardStyles()}`}
              >
                {/* Float elements of background */}
                {isRomanticSpecial && <FloatingHeartsBackground />}
                {isNatalActive && <FloatingSnowBackground />}
                {isPascoaActive && <FloatingEggsBackground />}
                {isAnoNovoActive && <FloatingSparklesBackground />}

                {/* Visual accent corner */}
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-tr-2xl pointer-events-none bg-gradient-to-br
                  ${isRomanticSpecial ? 'from-red-500/5 to-transparent' : 
                    isNatalActive ? 'from-emerald-500/5 to-transparent' :
                    isPascoaActive ? 'from-amber-500/5 to-transparent' :
                    isAnoNovoActive ? 'from-amber-400/5 to-transparent' :
                    'from-gold-500/5 to-transparent'}`}
                ></div>

                {/* Left column: Video or banner image */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'} space-y-4 relative z-10`}>
                  {/* Video Box */}
                  <div className={`relative aspect-video rounded-xl overflow-hidden bg-[#050505] shadow-inner group-hover:scale-[1.01] transition-transform duration-500 border ${getBorderClass()}`}
                  >
                    {evt.video ? (
                      evt.video.startsWith('data:video') || evt.video.endsWith('.mp4') || evt.video.endsWith('.webm') || evt.video.endsWith('.mov') ? (
                        /* Local HTML5 Video Player */
                        <video 
                          src={evt.video} 
                          controls 
                          className="w-full h-full object-cover"
                          preload="metadata"
                        />
                      ) : (
                        /* Iframe Embedded YouTube/Vimeo code */
                        <iframe
                          src={embedUrl}
                          title={evt.title}
                          className="w-full h-full object-cover border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                        />
                      )
                    ) : (
                      /* Fallback elegant static image/concept if no video of event is defined */
                      <div className="relative w-full h-full select-none">
                        <img 
                          src={evt.image || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800'} 
                          alt="Atmosfera Gastronômica Violeta" 
                          className="w-full h-full object-cover brightness-[0.4]"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/40">
                          <div className={`w-12 h-12 rounded-full border flex items-center justify-center bg-neutral-900/80 mb-3 shadow-md shadow-neutral-950/50
                            ${isRomanticSpecial ? 'border-red-500/30' : 
                              isNatalActive ? 'border-emerald-500/30' :
                              isPascoaActive ? 'border-amber-500/30' :
                              isAnoNovoActive ? 'border-amber-400/30' :
                              'border-gold-400/30'}`}
                          >
                            <Play className={`w-5 h-5 ml-0.5 ${
                              isRomanticSpecial ? 'text-red-400 animate-pulse' : 
                              isNatalActive ? 'text-emerald-400 animate-pulse' :
                              isPascoaActive ? 'text-amber-400 animate-pulse' :
                              isAnoNovoActive ? 'text-amber-300 animate-pulse' :
                              'text-gold-400 animate-pulse'}`} />
                          </div>
                          <span className={`text-xs tracking-widest font-serif uppercase ${
                            isRomanticSpecial ? 'text-red-300' : 
                            isNatalActive ? 'text-emerald-300' :
                            isPascoaActive ? 'text-amber-300' :
                            isAnoNovoActive ? 'text-amber-200' :
                            'text-gold-200'}`}
                          >
                            {isRomanticSpecial ? 'VIOLETA AMOUR' : 
                             isNatalActive ? 'VIOLETA CELEBRAÇÃO' :
                             isPascoaActive ? 'VIOLETA PÁSCOA' :
                             isAnoNovoActive ? 'VIOLETA 2027' :
                             'VIOLETA EXPERIENCE'}
                          </span>
                          <span className="text-[10px] text-neutral-400 mt-1 uppercase max-w-xs leading-relaxed">Vídeo indisponível • Reserve para viver esta atmosfera ao vivo</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tiny caption under video */}
                  {evt.image && evt.video && (
                    <div className={`flex items-center gap-3 p-2.5 rounded-lg border ${
                      isRomanticSpecial ? 'bg-red-950/5 border-red-950/20' : 
                      isNatalActive ? 'bg-emerald-950/5 border-emerald-950/20' :
                      isPascoaActive ? 'bg-amber-950/5 border-amber-950/20' :
                      isAnoNovoActive ? 'bg-amber-400/5 border-amber-400/20' :
                      'bg-neutral-900/40 border-gold-800/5'}`}
                    >
                      <img 
                        src={evt.image} 
                        alt="Thumbnail" 
                        className="w-10 h-7 object-cover rounded border border-white/10 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-[10px] text-[#8E8376] italic font-serif truncate">Atmosfera visual do evento: {evt.title}</span>
                    </div>
                  )}
                </div>

                {/* Right column: Content Details */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-6 relative z-10`}>
                  <div className="space-y-2">
                    {getBadge()}
                    <h4 className={`font-serif text-2xl md:text-3xl tracking-wide transition-colors
                      ${isRomanticSpecial ? 'text-red-100 group-hover:text-red-300' : 
                        isNatalActive ? 'text-emerald-100 group-hover:text-emerald-300' :
                        isPascoaActive ? 'text-amber-100 group-hover:text-amber-300' :
                        isAnoNovoActive ? 'text-amber-100 group-hover:text-amber-200' :
                        'text-[#FCFBF8] group-hover:text-gold-300'
                      }`}
                    >
                      {evt.title}
                    </h4>
                  </div>

                  {/* Dates / Times */}
                  <div className="flex flex-wrap gap-4 text-xs font-serif">
                    <div className={`flex items-center gap-2 py-2 px-3.5 rounded-md border
                      ${isRomanticSpecial ? 'bg-[#150a0d] border-red-950/30 text-red-300' : 
                        isNatalActive ? 'bg-[#041009] border-emerald-950/30 text-emerald-300' :
                        isPascoaActive ? 'bg-[#100905] border-amber-950/30 text-amber-300' :
                        isAnoNovoActive ? 'bg-[#06060c] border-amber-450/20 text-amber-200' :
                        'bg-[#121212] border-gold-800/10 text-gold-400'}`}>
                      <Calendar className={`w-4 h-4 ${
                        isRomanticSpecial ? 'text-red-400' : 
                        isNatalActive ? 'text-emerald-450' :
                        isPascoaActive ? 'text-amber-400' :
                        isAnoNovoActive ? 'text-amber-300' :
                        'text-gold-400'}`} />
                      <span>{new Date(evt.date + 'T00:00:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className={`flex items-center gap-2 py-2 px-3.5 rounded-md border
                      ${isRomanticSpecial ? 'bg-[#150a0d] border-red-950/30 text-red-300' : 
                        isNatalActive ? 'bg-[#041009] border-emerald-950/30 text-emerald-300' :
                        isPascoaActive ? 'bg-[#100905] border-amber-950/30 text-amber-300' :
                        isAnoNovoActive ? 'bg-[#06060c] border-amber-450/20 text-amber-200' :
                        'bg-[#121212] border-gold-800/10 text-gold-400'}`}>
                      <Clock className={`w-4 h-4 ${
                        isRomanticSpecial ? 'text-red-400' : 
                        isNatalActive ? 'text-emerald-450' :
                        isPascoaActive ? 'text-amber-400' :
                        isAnoNovoActive ? 'text-amber-300' :
                        'text-gold-400'}`} />
                      <span>{evt.time}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-[#C2B7A8] leading-relaxed text-left font-light">
                    {evt.description}
                  </p>

                  {/* Custom Pre-filled WhatsApp Reservation Button */}
                  <div className="pt-2">
                    <a 
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => onNotify(`Abertura do canal WhatsApp para reserva do evento: ${evt.title}`)}
                      className={`inline-flex items-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest transition-all hover:scale-105 shadow-md cursor-pointer rounded-lg ${getBtnStyles()}`}
                    >
                      {isRomanticSpecial ? <Heart className="w-4 h-4 text-white fill-white" /> : <MessageSquare className="w-4 h-4" />}
                      {isRomanticSpecial ? (evt.buttonText || 'Quero reservar essa experiência') : 
                       isNatalActive ? (evt.buttonText || 'Reservar Ceia de Natal') :
                       isPascoaActive ? (evt.buttonText || 'Reservar Almoço de Páscoa') :
                       isAnoNovoActive ? (evt.buttonText || 'Reservar Réveillon 2027') :
                       (evt.buttonText || 'Reservar para este evento')}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


