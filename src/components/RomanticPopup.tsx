import React, { useEffect, useState } from 'react';
import { X, Heart } from 'lucide-react';
import { RomanticThemeConfig } from '../types';

interface RomanticPopupProps {
  config: RomanticThemeConfig;
}

export default function RomanticPopup({ config }: RomanticPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (!config.active) return;

    // Direct configuration frequency check
    const storageKey = 'violeta_valentine_popup_dismissed';
    if (config.popupFrequency === 'session') {
      const alreadyShown = sessionStorage.getItem(storageKey);
      if (alreadyShown === 'true') {
        return; // Don't show again on this session
      }
    }

    // Delay slightly for extreme high-end entry smoothness
    const entryTimer = setTimeout(() => {
      setIsRendered(true);
      // Give a tiny tick for transition to apply
      setTimeout(() => setIsVisible(true), 50);
    }, 1200);

    // Auto-close duration (converting config.popupDuration seconds)
    const durationMs = (config.popupDuration || 5) * 1000;
    const autoCloseTimer = setTimeout(() => {
      handleDismiss();
    }, 1200 + durationMs);

    return () => {
      clearTimeout(entryTimer);
      clearTimeout(autoCloseTimer);
    };
  }, [config.active, config.popupFrequency, config.popupDuration]);

  const handleDismiss = () => {
    setIsVisible(false);
    // Mark as dismissed in session storage if frequency represents session
    if (config.popupFrequency === 'session') {
      sessionStorage.setItem('violeta_valentine_popup_dismissed', 'true');
    }
    // Remove from render after transition completes
    setTimeout(() => {
      setIsRendered(false);
    }, 500);
  };

  if (!config.active || !isRendered) return null;

  return (
    <div 
      className={`fixed bottom-6 right-6 md:right-8 md:bottom-8 z-50 max-w-sm w-full p-0.5 rounded-2xl bg-gradient-to-br from-red-600/30 via-gold-500/10 to-red-900/30 transition-all duration-500 ease-out shadow-2xl backdrop-blur-md
        ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95 pointer-events-none'}`}
      id="valentine-popup-container"
    >
      <style>{`
        @keyframes cupidFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(-2deg); }
        }
        @keyframes leftWingFlutter {
          0%, 100% { transform: scaleX(1) rotate(0deg); }
          50% { transform: scaleX(0.7) rotate(-6deg); }
        }
        @keyframes rightWingFlutter {
          0%, 100% { transform: scaleX(1) rotate(0deg); }
          50% { transform: scaleX(0.7) rotate(6deg); }
        }
        .animate-cupid-float {
          animation: cupidFloat 3.5s infinite ease-in-out;
        }
        .animate-wing-l {
          animation: leftWingFlutter 0.3s infinite ease-in-out;
          transform-origin: 35px 50px;
        }
        .animate-wing-r {
          animation: rightWingFlutter 0.3s infinite ease-in-out;
          transform-origin: 65px 50px;
        }
      `}</style>

      {/* Inside Card Body */}
      <div className="bg-[#0b0507] rounded-[14px] p-5 overflow-hidden relative">
        {/* Subtle Decorative Wine Backlight */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-red-600/10 rounded-full blur-[40px] pointer-events-none"></div>
        {/* Confetti tiny hearts decoration */}
        <div className="absolute top-2 left-6 text-red-500/10 fill-red-500/5 select-none text-xs rotate-12">❤️</div>
        <div className="absolute bottom-4 right-12 text-rose-500/10 fill-rose-500/5 select-none text-lg -rotate-12">❤️</div>

        {/* Close button manual override */}
        <button 
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-neutral-500 hover:text-red-300 transition-colors p-1 rounded-full hover:bg-white/5 cursor-pointer z-10"
          title="Fechar mensagem romântica"
          id="btn-close-romantic-popup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Cupid + Header Grid */}
        <div className="flex items-start gap-4">
          {/* Animated Gold Minimalist Cupid Vector */}
          <div className="shrink-0 bg-red-950/20 p-1.5 rounded-full border border-red-500/10 shadow-lg shadow-black/40 mt-1 relative">
            <svg 
              viewBox="0 0 100 100" 
              className="w-12 h-12 animate-cupid-float"
              id="cupid-wing-svg"
            >
              {/* Flutter Wing Left */}
              <path 
                d="M 35,45 C 18,36 10,54 35,58 C 28,52 28,45 35,45 Z" 
                fill="#ffdd99" 
                className="animate-wing-l opacity-90 fill-gold-300" 
              />
              {/* Flutter Wing Right */}
              <path 
                d="M 65,45 C 82,36 90,54 65,58 C 72,52 72,45 65,45 Z" 
                fill="#ffdd99" 
                className="animate-wing-r opacity-90 fill-gold-300" 
              />
              {/* Cupid Silhouette */}
              <path 
                d="M 46,38 C 42,42 42,48 48,50 L 46,55" 
                stroke="#d4af37" 
                strokeWidth="2.5" 
                fill="none" 
                strokeLinecap="round" 
              />
              <circle cx="50" cy="35" r="7" fill="none" stroke="#d4af37" strokeWidth="2.5" />
              {/* Cherub Bow & Arrow */}
              <path 
                d="M 62,56 C 58,54 58,49 62,47" 
                stroke="#ef4444" 
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round" 
              />
              <path 
                d="M 52,52 L 64,51 Q 65,51 68,51" 
                stroke="#EF4444" 
                strokeWidth="1.5" 
                fill="none" 
              />
              {/* Gold body curves */}
              <path 
                d="M 45,52 C 45,62 55,62 50,75 C 53,78 57,74 54,72" 
                stroke="#d4af37" 
                strokeWidth="2.5" 
                fill="none" 
                strokeLinecap="round" 
              />
              {/* Tiny Heart at tip of Arrow */}
              <path 
                d="M 68,48 C 68,48 72,51 68,54" 
                stroke="#ef4444" 
                strokeWidth="1.5" 
                fill="none" 
              />
            </svg>
            {/* Small floating heart next to bow */}
            <Heart className="w-2.5 h-2.5 absolute top-1 right-1 text-red-500 fill-red-500 animate-pulse" />
          </div>

          <div className="space-y-1.5 flex-1">
            <span className="text-[10px] font-bold text-red-400 tracking-widest uppercase flex items-center gap-1">
              <Heart className="w-2.5 h-2.5 text-red-500 fill-red-500 inline" /> Amor no Violeta
            </span>
            <p className="text-xs text-[#E6DCCF] font-serif italic leading-relaxed pr-3 select-none">
              “{config.popupText}”
            </p>
          </div>
        </div>

        {/* Action button inside the popup for instant engagement */}
        <div className="mt-4 pt-3 border-t border-red-950/20 flex justify-end">
          <button 
            onClick={handleDismiss} 
            className="text-[10px] uppercase tracking-widest text-[#B59C66] hover:text-red-300 font-bold transition-all"
            id="btn-understand-cupid"
          >
            Encantar-se
          </button>
        </div>
      </div>
    </div>
  );
}
