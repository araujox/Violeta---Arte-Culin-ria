import React, { useEffect, useState } from 'react';
import { X, Sparkles, Gift, Star, Calendar, Music } from 'lucide-react';
import { SpecialCampaignConfig } from '../types';

// ==========================================
// 1. SNOW FALL OVERLAY (Natal)
// ==========================================
export function SnowRain() {
  const [snowflakes, setSnowflakes] = useState<{ id: number; left: number; delay: number; size: number; duration: number; drift: number }[]>([]);

  useEffect(() => {
    const list = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      size: 4 + Math.random() * 8,
      duration: 6 + Math.random() * 12,
      drift: -15 + Math.random() * 30, // side-to-side drift
    }));
    setSnowflakes(list);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
      <style>{`
        @keyframes snowFall {
          0% {
            transform: translateY(-5vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(105vh) translateX(var(--drift)) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-snow-fall {
          animation: snowFall linear infinite;
        }
      `}</style>
      {snowflakes.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white animate-snow-fall filter blur-[0.4px] shadow-sm shadow-white/50"
          style={{
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            top: `-20px`,
            // @ts-ignore
            '--drift': `${s.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

// ==========================================
// 2. EASTER EGG & FLOWERS OVERLAY (Páscoa)
// ==========================================
export function EasterEggRain() {
  const [items, setItems] = useState<{ id: number; left: number; delay: number; size: number; duration: number; type: 'egg' | 'flower'; color: string }[]>([]);

  const colors = ['#fbcfe8', '#cbd5e1', '#fde047', '#fed7aa', '#c084fc', '#a7f3d0'];

  useEffect(() => {
    const list = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      size: 14 + Math.random() * 12,
      duration: 7 + Math.random() * 10,
      type: Math.random() > 0.4 ? 'egg' : ('flower' as 'egg' | 'flower'),
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setItems(list);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
      <style>{`
        @keyframes itemFall {
          0% {
            transform: translateY(-5vh) rotate(0deg) scale(0.6);
            opacity: 0;
          }
          15% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(105vh) rotate(270deg) scale(1);
            opacity: 0;
          }
        }
        .animate-item-fall {
          animation: itemFall linear infinite;
        }
      `}</style>
      {items.map((it) => (
        <div
          key={it.id}
          className="absolute animate-item-fall flex items-center justify-center"
          style={{
            left: `${it.left}%`,
            width: `${it.size}px`,
            height: `${it.size}px`,
            animationDelay: `${it.delay}s`,
            animationDuration: `${it.duration}s`,
            top: `-30px`,
          }}
        >
          {it.type === 'egg' ? (
            <svg viewBox="0 0 100 130" className="w-full h-full opacity-35" style={{ filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.15))` }}>
              <path d="M 50,0 C 78,0 95,50 95,85 C 95,115 75,130 50,130 C 25,130 5,115 5,85 C 5,50 22,0 50,0 Z" fill={it.color} />
              {/* Zigzag decoration lines */}
              <path d="M 12,70 Q 25,60 38,70 Q 50,80 62,70 Q 75,60 88,70" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.4" />
              <path d="M 15,90 Q 25,85 38,90 Q 50,95 62,90 Q 75,85 85,90" stroke="#78350f" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.25" />
            </svg>
          ) : (
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-40">
              {/* Simple Daisy Flower */}
              <circle cx="50" cy="50" r="16" fill="#fcd34d" />
              {/* Petals */}
              <circle cx="50" cy="22" r="12" fill="#ffffff" />
              <circle cx="50" cy="78" r="12" fill="#ffffff" />
              <circle cx="22" cy="50" r="12" fill="#ffffff" />
              <circle cx="78" cy="50" r="12" fill="#ffffff" />
              <circle cx="31" cy="31" r="12" fill="#ffffff" />
              <circle cx="69" cy="31" r="12" fill="#ffffff" />
              <circle cx="31" cy="69" r="12" fill="#ffffff" />
              <circle cx="69" cy="69" r="12" fill="#ffffff" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

// ==========================================
// 3. NEW YEAR SPARKLES OVERLAY (Ano Novo)
// ==========================================
export function NewYearSparklesRain() {
  const [sparkles, setSparkles] = useState<{ id: number; left: number; top: number; delay: number; size: number; duration: number; color: string }[]>([]);

  const colors = ['#fcd34d', '#facc15', '#eab308', '#ffffff', '#fbbf24', '#cbd5e1'];

  useEffect(() => {
    const list = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 6,
      size: 6 + Math.random() * 10,
      duration: 3 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setSparkles(list);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
      <style>{`
        @keyframes shimmerSparkle {
          0%, 100% {
            transform: scale(0.3) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1) rotate(180deg);
          }
        }
        .animate-shimmer-sparkle {
          animation: shimmerSparkle linear infinite;
        }
      `}</style>
      {sparkles.map((sp) => (
        <svg
          key={sp.id}
          viewBox="0 0 100 100"
          className="absolute animate-shimmer-sparkle"
          style={{
            left: `${sp.left}%`,
            top: `${sp.top}%`,
            width: `${sp.size}px`,
            height: `${sp.size}px`,
            animationDelay: `${sp.delay}s`,
            animationDuration: `${sp.duration}s`,
          }}
        >
          {/* Simple star shape */}
          <path d="M 50,0 Q 50,50 100,50 Q 50,50 50,100 Q 50,50 0,50 Q 50,50 50,0 Z" fill={sp.color} />
        </svg>
      ))}
    </div>
  );
}

// ==========================================
// 4. FLOATING CAMPAIGN MASCOT (Natal, Páscoa, Ano Novo)
// ==========================================
interface FixedMascotProps {
  type: 'natal' | 'pascoa' | 'anonovo';
  position: 'left' | 'right' | 'top-right';
}

export function FixedMascot({ type, position }: FixedMascotProps) {
  const [hovered, setHovered] = useState(false);

  const posClasses = {
    'left': 'left-6 bottom-24',
    'right': 'right-6 bottom-24',
    'top-right': 'right-6 top-24'
  };

  const getMascotSettings = () => {
    switch (type) {
      case 'natal':
        return {
          title: "Papai Noel Violeta",
          bubbleText: "Feliz Natal! Reservas abertas para a ceia em família. 🎄🎅",
          bgClass: "bg-[#051c11]/90 border-emerald-500/30 text-emerald-300",
          glowing: "rgba(16,185,129,0.3)",
          svg: (
            <svg viewBox="0 0 100 100" className="w-10 h-10 animate-bounce" style={{ animationDuration: '3.5s' }}>
              {/* White Beard backing */}
              <circle cx="50" cy="55" r="23" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))" />
              <path d="M 30,50 C 30,70 70,70 70,50 Z" fill="#ffffff" />
              {/* Skin */}
              <circle cx="50" cy="42" r="16" fill="#fecdd3" />
              {/* Cheeks */}
              <circle cx="42" cy="45" r="3" fill="#fda4af" opacity="0.6" />
              <circle cx="58" cy="45" r="3" fill="#fda4af" opacity="0.6" />
              {/* Sleeping eyes */}
              <path d="M 40,41 Q 43,43 45,41" stroke="#451a03" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <path d="M 55,41 Q 57,43 60,41" stroke="#451a03" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              {/* Nose */}
              <circle cx="50" cy="46" r="4.5" fill="#f43f5e" />
              {/* Red Hat */}
              <path d="M 33,37 Q 50,15 67,37" fill="#ef4444" />
              <path d="M 67,37 Q 76,46 72,50" stroke="#ef4444" strokeWidth="5" fill="none" strokeLinecap="round" />
              {/* Hat fluff & pom-pom */}
              <rect x="30" y="32" width="40" height="6" rx="3" fill="#ffffff" />
              <circle cx="73" cy="50" r="5" fill="#ffffff" />
              {/* Little gold collar ribbon */}
              <path d="M 45,63 L 50,68 L 55,63" stroke="#fbbf24" strokeWidth="2" fill="none" />
            </svg>
          )
        };
      case 'pascoa':
        return {
          title: "Coelhinho da Páscoa Violeta",
          bubbleText: "Uma Páscoa cheia de encantos e sabores doces! 🐰🥚",
          bgClass: "bg-[#1f1207]/90 border-amber-600/30 text-amber-300",
          glowing: "rgba(217,119,6,0.3)",
          svg: (
            <svg viewBox="0 0 100 100" className="w-10 h-10 animate-bounce" style={{ animationDuration: '4s' }}>
              {/* Bunny Ears */}
              {/* Left ear */}
              <ellipse cx="38" cy="25" rx="7" ry="20" fill="#ffffff" transform="rotate(-10 38 25)" />
              <ellipse cx="38" cy="27" rx="3.5" ry="14" fill="#fbcfe8" transform="rotate(-10 38 27)" />
              {/* Right ear */}
              <ellipse cx="62" cy="25" rx="7" ry="20" fill="#ffffff" transform="rotate(10 62 25)" />
              <ellipse cx="62" cy="27" rx="3.5" ry="14" fill="#fbcfe8" transform="rotate(10 62 27)" />

              {/* Head / Body assembly */}
              <circle cx="50" cy="55" r="22" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))" />

              {/* Cheeks */}
              <circle cx="40" cy="58" r="4.5" fill="#fda4af" opacity="0.4" />
              <circle cx="60" cy="58" r="4.5" fill="#fda4af" opacity="0.4" />

              {/* Bunny Nose and Whiskers */}
              <polygon points="46,55 54,55 50,59" fill="#f43f5e" />
              <path d="M 48,59 Q 50,62 52,59 Q 50,62 48,59" stroke="#555" strokeWidth="1.2" fill="none" />
              {/* Sleeping cute eyes */}
              <path d="M 37,51 Q 41,53 43,50" stroke="#451a03" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <path d="M 57,51 Q 59,53 63,50" stroke="#451a03" strokeWidth="1.8" fill="none" strokeLinecap="round" />

              {/* Whiskers */}
              <line x1="28" y1="58" x2="18" y2="56" stroke="#999" strokeWidth="1" />
              <line x1="28" y1="61" x2="19" y2="62" stroke="#999" strokeWidth="1" />
              <line x1="72" y1="58" x2="82" y2="56" stroke="#999" strokeWidth="1" />
              <line x1="72" y1="61" x2="81" y2="62" stroke="#999" strokeWidth="1" />

              {/* Cute pastel easter egg held */}
              <path d="M 50,63 C 58,63 65,75 65,85 C 65,92 58,97 50,97 C 42,97 35,92 35,85 C 35,75 42,63 50,63 Z" fill="url(#miniEgg)" />
              <defs>
                <radialGradient id="miniEgg" cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="60%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#b45309" />
                </radialGradient>
              </defs>
            </svg>
          )
        };
      case 'anonovo':
      default:
        return {
          title: "Réveillon Bistrô Violeta",
          bubbleText: "Tim-tim! Brinde o recomeço com alta gastronomia. 🥂✨",
          bgClass: "bg-[#090b10]/95 border-amber-400/30 text-amber-200",
          glowing: "rgba(245,158,11,0.35)",
          svg: (
            <svg viewBox="0 0 100 100" className="w-10 h-10 animate-bounce" style={{ animationDuration: '3s' }}>
              {/* Two champagne clinking glasses */}
              {/* Glass L */}
              <polygon points="32,45 42,45 37,70" fill="url(#sparkleChampGrad)" opacity="0.95" transform="rotate(-15 37 55)" />
              <line x1="37" y1="68" x2="37" y2="85" stroke="#fbbf24" strokeWidth="3" transform="rotate(-15 37 55)" />
              <ellipse cx="37" cy="85" rx="6" ry="2" fill="#fbbf24" transform="rotate(-15 37 55)" />

              {/* Glass R */}
              <polygon points="68,45 58,45 63,70" fill="url(#sparkleChampGrad)" opacity="0.95" transform="rotate(15 63 55)" />
              <line x1="63" y1="68" x2="63" y2="85" stroke="#fbbf24" strokeWidth="3" transform="rotate(15 63 55)" />
              <ellipse cx="63" cy="85" rx="6" ry="2" fill="#fbbf24" transform="rotate(15 63 55)" />

              {/* Golden liquid glow bubbles */}
              <circle cx="50" cy="40" r="2.5" fill="#ffffff" className="animate-ping" style={{ animationDuration: '1.5s' }} />
              <circle cx="44" cy="36" r="1.5" fill="#fef08a" className="animate-pulse" />
              <circle cx="56" cy="36" r="1.5" fill="#fef08a" className="animate-pulse" />

              {/* Rising bubbles path */}
              <path d="M 46,35 Q 50,22 53,16" stroke="#fef08a" strokeWidth="1" strokeDasharray="3,3" fill="none" opacity="0.7" />

              {/* Golden sparkles */}
              <path d="M 50,30 L 52,38 L 60,40 L 52,42 L 50,50 L 48,42 L 40,40 L 48,38 Z" fill="#ffffff" filter="drop-shadow(0 0 4px #fbbf24)" />

              <defs>
                <linearGradient id="sparkleChampGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fff9db" />
                  <stop offset="45%" stopColor="#fef08a" stopOpacity="0.8" />
                  <stop offset="90%" stopColor="#d97706" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#78350f" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          )
        };
    }
  };

  const settings = getMascotSettings();

  return (
    <div
      className={`fixed ${posClasses[position] || 'right-6 bottom-24'} z-40 p-2 rounded-full border shadow-2xl transition-all duration-300 hover:scale-115 flex items-center justify-center cursor-pointer ${settings.bgClass}`}
      style={{ boxShadow: `0 0 25px ${settings.glowing}` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={settings.title}
    >
      {hovered && (
        <div
          className="absolute right-full mr-3 bg-[#050304] border border-gold-800/20 text-[10px] text-gold-200 px-3 py-2 rounded-xl whitespace-nowrap animate-slide-left tracking-wide font-sans italic shadow-xl"
          style={{ animationDuration: '0.2s' }}
        >
          {settings.bubbleText}
        </div>
      )}
      {settings.svg}
    </div>
  );
}

// ==========================================
// 5. THEMATIC ENTRY EVENT POPUPS (SeasonalPopup)
// ==========================================
interface ChildrenPopupProps {
  type: 'natal' | 'pascoa' | 'anonovo';
  config: SpecialCampaignConfig;
}

export function SeasonalThematicPopup({ type, config }: ChildrenPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  const storageKey = `violeta_${type}_popup_dismissed`;

  useEffect(() => {
    const isActive = config.active === true || String(config.active) === 'true';
    if (!isActive) return;

    if (config.popupFrequency === 'session') {
      const alreadyShown = sessionStorage.getItem(storageKey);
      if (alreadyShown === 'true') {
        return;
      }
    }

    const entryTimer = setTimeout(() => {
      setIsRendered(true);
      setTimeout(() => setIsVisible(true), 50);
    }, 1200);

    const durationMs = (config.popupDuration || 5) * 1000;
    const autoCloseTimer = setTimeout(() => {
      handleDismiss();
    }, 1200 + durationMs);

    return () => {
      clearTimeout(entryTimer);
      clearTimeout(autoCloseTimer);
    };
  }, [config.active, config.popupFrequency, config.popupDuration, type]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (config.popupFrequency === 'session') {
      sessionStorage.setItem(storageKey, 'true');
    }
    setTimeout(() => {
      setIsRendered(false);
    }, 500);
  };

  const isActiveCheck = config.active === true || String(config.active) === 'true';
  if (!isActiveCheck || !isRendered) return null;

  const renderLayoutDetails = () => {
    switch (type) {
      case 'natal':
        return {
          headerTag: "Natal no Violeta",
          headerTitle: "Ceia & Magia Especial",
          badgeColor: "bg-emerald-950/40 border-emerald-500/20 text-emerald-400",
          cardBacking: "from-emerald-700/30 via-red-650/15 to-[#052b12]/60 shadow-[0_0_50px_rgba(16,185,129,0.2)]",
          btnColor: "from-emerald-700 to-[#105e35] hover:from-emerald-600 hover:to-emerald-700 hover:shadow-emerald-900/30",
          btnLabel: "Celebrar com a Família",
          bgOverlayGradient: "from-emerald-600/15 to-amber-500/10",
          sparks: (
            <>
              <div className="absolute animate-spark-heart text-red-500 text-xs" style={{ top: '10%', left: '20%', animationDelay: '0s' }}>🎁</div>
              <div className="absolute animate-spark-heart text-amber-400 text-sm" style={{ top: '15%', right: '15%', animationDelay: '0.8s' }}>✨</div>
              <div className="absolute animate-spark-heart text-white text-xs" style={{ bottom: '20%', left: '10%', animationDelay: '1.4s' }}>❄️</div>
            </>
          ),
          svg: (
            <svg viewBox="0 0 100 100" className="w-32 h-32 animate-cupid-3d select-none z-10" style={{ transformStyle: 'preserve-3d' }}>
              <circle cx="50" cy="55" r="28" fill="url(#santa3dBody)" />
              <path d="M 22,50 C 22,79 78,79 78,50 Z" fill="#ffffff" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))" />
              <circle cx="50" cy="40" r="19" fill="#fecdd3" />
              {/* Sleep cute eyes */}
              <path d="M 39,39 Q 42,42 44,39" stroke="#451a03" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M 56,39 Q 58,42 61,39" stroke="#451a03" strokeWidth="2" fill="none" strokeLinecap="round" />
              {/* Cheeks */}
              <circle cx="36" cy="43" r="3.5" fill="#fca5a5" opacity="0.4" />
              <circle cx="64" cy="43" r="3.5" fill="#fca5a5" opacity="0.4" />
              {/* Nose */}
              <circle cx="50" cy="45" r="5" fill="#e11d48" />
              {/* Mustache */}
              <path d="M 42,50 Q 50,54 58,50 M 42,50 Q 50,46 58,50" fill="#ffffff" stroke="#ddd" strokeWidth="0.5" />
              {/* Cozy Santa Red Hat */}
              <path d="M 28,34 Q 50,5 72,34" fill="#dc2626" />
              <rect x="25" y="29" width="50" height="7" rx="3.5" fill="#ffffff" />
              <circle cx="75" cy="40" r="6" fill="#ffffff" />
              <defs>
                <radialGradient id="santa3dBody" cx="35%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#fca5a5" />
                  <stop offset="40%" stopColor="#dc2626" />
                  <stop offset="100%" stopColor="#7f1d1d" />
                </radialGradient>
              </defs>
            </svg>
          )
        };
      case 'pascoa':
        return {
          headerTag: "Páscoa no Violeta",
          headerTitle: "Harmonia de Chocolates",
          badgeColor: "bg-amber-950/40 border-amber-500/20 text-amber-400",
          cardBacking: "from-amber-705/30 via-amber-600/15 to-[#241305]/60 shadow-[0_0_50px_rgba(217,119,6,0.2)]",
          btnColor: "from-amber-700 to-[#6b21a8] hover:from-amber-650 hover:to-purple-700 hover:shadow-amber-900/30",
          btnLabel: "Saborear Páscoa",
          bgOverlayGradient: "from-amber-600/10 to-yellow-500/10",
          sparks: (
            <>
              <div className="absolute animate-spark-heart text-amber-500 text-xs" style={{ top: '10%', left: '20%', animationDelay: '0s' }}>🥚</div>
              <div className="absolute animate-spark-heart text-purple-400 text-sm" style={{ top: '15%', right: '15%', animationDelay: '0.8s' }}>🌸</div>
              <div className="absolute animate-spark-heart text-yellow-300 text-xs" style={{ bottom: '20%', left: '10%', animationDelay: '1.4s' }}>✨</div>
            </>
          ),
          svg: (
            <svg viewBox="0 0 100 100" className="w-32 h-32 animate-cupid-3d select-none z-10" style={{ transformStyle: 'preserve-3d' }}>
              {/* Glossy Clay Easter Egg */}
              <path d="M 50,8 C 76,8 92,50 92,80 C 92,106 74,118 50,118 C 26,118 8,106 8,80 C 8,50 24,8 50,8 Z" fill="url(#eggShade)" transform="scale(0.85) translate(8, 8)" filter="drop-shadow(0 5px 10px rgba(0,0,0,0.3))" />
              {/* Cute ribbon wrapper around the egg */}
              <ellipse cx="50" cy="62" rx="35" ry="6" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
              <circle cx="50" cy="62" r="7" fill="#fbbf24" stroke="#ffffff" strokeWidth="1.5" />
              {/* Golden stars on egg */}
              <path d="M 50,30 L 52,34 L 56,34 L 53,37 L 54,41 L 50,39 L 46,41 L 47,37 L 44,34 L 48,34 Z" fill="#ffffff" opacity="0.8" />
              <path d="M 32,50 L 33.5,53 L 37,53 L 34,55 L 35,59 L 32,57 L 29,59 L 30,55 L 27,53 L 30.5,53 Z" fill="#fef08a" opacity="0.6" />
              <path d="M 68,50 L 69.5,53 L 73,53 L 70,55 L 71,59 L 68,57 L 65,59 L 66,55 L 63,53 L 66.5,53 Z" fill="#fef08a" opacity="0.6" />
              <defs>
                <radialGradient id="eggShade" cx="35%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#ecd5c5" />
                  <stop offset="30%" stopColor="#b45309" />
                  <stop offset="90%" stopColor="#451a03" />
                  <stop offset="100%" stopColor="#1c0d02" />
                </radialGradient>
              </defs>
            </svg>
          )
        };
      case 'anonovo':
      default:
        return {
          headerTag: "Réveillon no Violeta",
          headerTitle: "Celebre o Recomeço",
          badgeColor: "bg-amber-950/40 border-amber-400/20 text-amber-300",
          cardBacking: "from-amber-600/30 via-slate-800/25 to-[#080a0f]/80 shadow-[0_0_50px_rgba(245,158,11,0.22)]",
          btnColor: "from-amber-600 to-[#b45309] hover:from-amber-500 hover:to-amber-600 hover:shadow-amber-500/20",
          btnLabel: "Brindar no Violeta",
          bgOverlayGradient: "from-amber-500/10 to-slate-500/10",
          sparks: (
            <>
              <div className="absolute animate-spark-heart text-amber-300 text-xs" style={{ top: '10%', left: '20%', animationDelay: '0s' }}>🥂</div>
              <div className="absolute animate-spark-heart text-yellow-400 text-sm" style={{ top: '15%', right: '15%', animationDelay: '0.8s' }}>❇️</div>
              <div className="absolute animate-spark-heart text-white text-xs" style={{ bottom: '20%', left: '10%', animationDelay: '1.4s' }}>✨</div>
            </>
          ),
          svg: (
            <svg viewBox="0 0 100 100" className="w-32 h-32 animate-cupid-3d select-none z-10" style={{ transformStyle: 'preserve-3d' }}>
              {/* Clinking Champagnes */}
              <g transform="translate(0, 0)">
                <polygon points="18,30 38,30 28,75" fill="url(#toastChamp)" opacity="0.95" transform="rotate(-15 28 50)" />
                <line x1="28" y1="72" x2="28" y2="92" stroke="#ea580c" strokeWidth="3" transform="rotate(-15 28 50)" />
                <ellipse cx="28" cy="92" rx="9" ry="2" fill="#ea580c" transform="rotate(-15 28 50)" />
              </g>
              <g transform="translate(34, 0)">
                <polygon points="48,30 28,30 38,75" fill="url(#toastChamp)" opacity="0.95" transform="rotate(15 38 50)" />
                <line x1="38" y1="72" x2="38" y2="92" stroke="#ea580c" strokeWidth="3" transform="rotate(15 38 50)" />
                <ellipse cx="38" cy="92" rx="9" ry="2" fill="#ea580c" transform="rotate(15 38 50)" />
              </g>

              {/* Sparkling star bursts */}
              <path d="M 50,30 L 52,38 L 60,40 L 52,42 L 50,50 L 48,42 L 40,40 L 48,38 Z" fill="#ffffff" filter="drop-shadow(0 0 6px #fba91c)" />
              <circle cx="50" cy="40" r="4" fill="#ffffff" className="animate-ping" />
              
              <defs>
                <linearGradient id="toastChamp" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fffbeb" />
                  <stop offset="35%" stopColor="#fef08a" />
                  <stop offset="85%" stopColor="#d97706" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#451a03" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          )
        };
    }
  };

  const layout = renderLayoutDetails();

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ease-out 
        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      id={`${type}-popup-overlay`}
    >
      <div
        className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-all duration-700
          ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleDismiss}
        id={`${type}-popup-backdrop`}
      />

      <div
        className={`relative max-w-md w-full p-0.5 rounded-3xl bg-gradient-to-br ${layout.cardBacking} backdrop-blur-xl transition-all duration-500 ease-out
          ${isVisible ? 'translate-y-0 scale-100 rotate-0' : 'translate-y-12 scale-95 pointer-events-none'}`}
        id={`${type}-popup-container`}
      >
        <div className="bg-[#050304] rounded-[22px] p-6 md:p-8 overflow-hidden relative border border-gold-800/10">
          
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-[65px] pointer-events-none"></div>

          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold-800/10 rounded-tl-[20px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold-800/10 rounded-br-[20px] pointer-events-none"></div>

          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-all p-1.5 rounded-full hover:bg-white/5 cursor-pointer z-20 hover:scale-110 active:scale-95"
            title="Fechar mensagem especial"
            id={`btn-close-${type}-popup`}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center space-y-6 pt-2">
            
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0 mb-2">
              <div className="absolute w-28 h-28 bg-gradient-to-tr from-amber-500/20 to-orange-500/10 rounded-full blur-2xl animate-pulse -z-10"></div>
              {layout.sparks}
              {layout.svg}
            </div>

            <div className="space-y-2">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-inner ${layout.badgeColor}`}>
                <Sparkles className="w-3.5 h-3.5 animate-pulse" /> {layout.headerTag}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-gold-200 tracking-wide select-none">
                {layout.headerTitle}
              </h3>
            </div>

            <p className="text-sm md:text-base text-[#F4EFE6] font-serif italic leading-relaxed px-2 select-none max-w-sm">
              “{config.popupText}”
            </p>

            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>

            <div className="pt-2 w-full">
              <button
                onClick={handleDismiss}
                className={`w-full bg-gradient-to-r text-white font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-xl shadow-lg active:scale-98 transition-all cursor-pointer font-sans ${layout.btnColor}`}
                id={`btn-understand-${type}`}
              >
                {layout.btnLabel}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
