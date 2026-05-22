import React from 'react';
import { Calendar, Clock, MessageSquare, Play, Sparkles, Heart } from 'lucide-react';
import { EventBistro, WhatsAppConfig, RomanticThemeConfig } from '../types';
import { getEmbedUrl, getWhatsAppLink } from '../utils/adminStorage';

interface EventsSectionProps {
  events: EventBistro[];
  whatsAppConfig: WhatsAppConfig;
  romanticConfig?: RomanticThemeConfig;
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

export default function EventsSection({ events, whatsAppConfig, romanticConfig, onNotify }: EventsSectionProps) {
  // Only display active events
  const activeEvents = events.filter(evt => evt.active);

  if (activeEvents.length === 0) {
    return null; // Don't render anything if no events are active
  }

  const isRomanticActive = romanticConfig?.active === true;

  return (
    <section id="eventos" className="py-24 bg-[#080808]/40 border-t border-b border-gold-800/10 relative overflow-hidden">
      {/* Styles for Valentine campaign */}
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
        @keyframes subtleHeartBeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-beat {
          animation: subtleHeartBeat 2s infinite ease-in-out;
        }
      `}</style>

      {/* Visual Ambient Blur */}
      {isRomanticActive ? (
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-red-950/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      ) : (
        <div className="absolute top-1/2 left-10 w-80 h-80 bg-violeta-wine/10 rounded-full blur-[100px] pointer-events-none"></div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[#B59C66] font-semibold flex items-center justify-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full animate-ping ${isRomanticActive ? 'bg-red-500' : 'bg-gold-400'}`}></span>
            03 / Próximos Eventos
          </span>
          <h3 className="font-serif text-3xl md:text-5xl text-[#FCFBF8] tracking-wide mt-2 mb-4">
            {isRomanticActive ? "Experiências e Eventos Especiais" : "Eventos no Bistrô Violeta"}
          </h3>
          <p className="text-sm text-[#8E8376]">
            {isRomanticActive 
              ? "Celebre a época mais romântica do ano com cardápios de autoria exclusivos e noites inesquecíveis sob a luz de velas."
              : "Reserve o seu assento para jantares harmonizados, noites musicais sob a luz de velas e masterclasses de culinária artística em Surubim."
            }
          </p>
        </div>

        {/* List of events */}
        <div className="space-y-16">
          {activeEvents.map((evt, idx) => {
            const embedUrl = getEmbedUrl(evt.video);
            const isEven = idx % 2 === 0;
            const isRomanticSpecial = isRomanticActive && evt.isRomanticSpecial === true;

            // Generate booking text and whatsapp redirect message
            const customBookingMsg = isRomanticSpecial && romanticConfig?.waRomanticMessage 
              ? romanticConfig.waRomanticMessage 
              : (evt.whatsappMessage || `Olá! Gostaria de reservar para o evento: ${evt.title}`);

            const waLink = getWhatsAppLink(whatsAppConfig.number, customBookingMsg);

            return (
              <div 
                key={evt.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 lg:p-10 rounded-2xl border transition-all duration-300 relative group
                  ${isRomanticSpecial 
                    ? 'bg-gradient-to-br from-[#120508] via-[#09090c] to-[#0c0406] border-red-500/20 shadow-xl animate-romantic-pulse' 
                    : 'bg-[#0d0d0d] border-gold-800/10 shadow-xl hover:border-gold-400/20'
                  }`}
              >
                {/* Float heart elements container */}
                {isRomanticSpecial && <FloatingHeartsBackground />}

                {/* Visual accent corner */}
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-tr-2xl pointer-events-none bg-gradient-to-br
                  ${isRomanticSpecial ? 'from-red-500/5 to-transparent' : 'from-gold-500/5 to-transparent'}`}
                ></div>

                {/* Left column: Video or banner image */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'} space-y-4 relative z-10`}>
                  {/* Video Box */}
                  <div className={`relative aspect-video rounded-xl overflow-hidden bg-[#050505] shadow-inner group-hover:scale-[1.01] transition-transform duration-500 border
                    ${isRomanticSpecial ? 'border-red-500/20' : 'gold-gradient-border'}`}
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
                            ${isRomanticSpecial ? 'border-red-500/30' : 'border-gold-400/30'}`}
                          >
                            <Play className={`w-5 h-5 ml-0.5 ${isRomanticSpecial ? 'text-red-400 animate-pulse' : 'text-gold-400 animate-pulse'}`} />
                          </div>
                          <span className={`text-xs tracking-widest font-serif uppercase ${isRomanticSpecial ? 'text-red-300' : 'text-gold-200'}`}>
                            {isRomanticSpecial ? 'VIOLETA AMOUR' : 'VIOLETA EXPERIENCE'}
                          </span>
                          <span className="text-[10px] text-neutral-400 mt-1 uppercase max-w-xs leading-relaxed">Vídeo indisponível • Reserve para viver esta atmosfera ao vivo</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tiny caption under video */}
                  {evt.image && evt.video && (
                    <div className={`flex items-center gap-3 p-2.5 rounded-lg border ${isRomanticSpecial ? 'bg-red-950/5 border-red-950/20' : 'bg-neutral-900/40 border-gold-800/5'}`}>
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
                    {isRomanticSpecial ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-900/20 border border-red-500/30 text-red-300 text-[10px] uppercase font-bold tracking-widest leading-none animate-beat">
                        <Heart className="w-3 h-3 text-red-500 fill-red-500" /> Especial Dia dos Namorados
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-900/10 border border-gold-400/20 text-gold-300 text-[10px] uppercase font-bold tracking-widest leading-none">
                        <Sparkles className="w-3 h-3" /> Evento Exclusivo
                      </span>
                    )}
                    <h4 className={`font-serif text-2xl md:text-3xl tracking-wide transition-colors
                      ${isRomanticSpecial 
                        ? 'text-red-100 group-hover:text-red-300' 
                        : 'text-[#FCFBF8] group-hover:text-gold-300'
                      }`}
                    >
                      {evt.title}
                    </h4>
                  </div>

                  {/* Dates / Times */}
                  <div className="flex flex-wrap gap-4 text-xs font-serif text-gold-400">
                    <div className={`flex items-center gap-2 py-2 px-3.5 rounded-md border
                      ${isRomanticSpecial ? 'bg-[#150a0d] border-red-950/30 text-red-300' : 'bg-[#121212] border-gold-800/10text-gold-400'}`}>
                      <Calendar className={`w-4 h-4 ${isRomanticSpecial ? 'text-red-400' : 'text-gold-400'}`} />
                      <span>{new Date(evt.date + 'T00:00:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className={`flex items-center gap-2 py-2 px-3.5 rounded-md border
                      ${isRomanticSpecial ? 'bg-[#150a0d] border-red-950/30 text-red-300' : 'bg-[#121212] border-gold-800/10 text-gold-400'}`}>
                      <Clock className={`w-4 h-4 ${isRomanticSpecial ? 'text-red-400' : 'text-gold-400'}`} />
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
                      className={`inline-flex items-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest transition-all hover:scale-105 shadow-md cursor-pointer rounded-lg
                        ${isRomanticSpecial 
                          ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-950/60' 
                          : 'bg-gold-500 hover:bg-gold-400 text-neutral-950'
                        }`}
                    >
                      {isRomanticSpecial ? <Heart className="w-4 h-4 text-white fill-white" /> : <MessageSquare className="w-4 h-4" />}
                      {isRomanticSpecial 
                        ? (evt.buttonText || 'Quero reservar essa experiência') 
                        : (evt.buttonText || 'Reservar para este evento')
                      }
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

