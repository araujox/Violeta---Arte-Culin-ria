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
    const isActive = config.active === true || String(config.active) === 'true';
    if (!isActive) return;

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

  const isActiveCheck = config.active === true || String(config.active) === 'true';
  if (!isActiveCheck || !isRendered) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ease-out 
        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      id="valentine-popup-overlay"
    >
      {/* Premium Backdrop Overlay with Dynamic Blur */}
      <div 
        className={`absolute inset-0 bg-black/75 backdrop-blur-md transition-all duration-700
          ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleDismiss}
        id="valentine-popup-backdrop"
      />

      {/* Centered Modal Card Container with dynamic 3D scales */}
      <div 
        className={`relative max-w-md w-full p-0.5 rounded-3xl bg-gradient-to-br from-red-600/30 via-amber-500/20 to-[#4a121a]/60 shadow-[0_0_50px_rgba(239,68,68,0.2)] backdrop-blur-xl transition-all duration-500 ease-out
          ${isVisible ? 'translate-y-0 scale-100 rotate-0' : 'translate-y-12 scale-95 -rotate-1 pointer-events-none'}`}
        id="valentine-popup-container"
      >
        <style>{`
          @keyframes cupidFloat3D {
            0% {
              transform: perspective(800px) rotateY(-18deg) rotateX(12deg) translateY(0px) translateZ(10px);
              filter: drop-shadow(0 15px 20px rgba(0,0,0,0.6));
            }
            50% {
              transform: perspective(800px) rotateY(18deg) rotateX(-8deg) translateY(-14px) translateZ(40px);
              filter: drop-shadow(0 25px 30px rgba(239,68,68,0.25));
            }
            100% {
              transform: perspective(800px) rotateY(-18deg) rotateX(12deg) translateY(0px) translateZ(10px);
              filter: drop-shadow(0 15px 20px rgba(0,0,0,0.6));
            }
          }
          @keyframes leftWingFlutter3D {
            0%, 100% {
              transform: perspective(800px) rotateY(15deg) rotateZ(-10deg) rotateX(-5deg);
            }
            50% {
              transform: perspective(800px) rotateY(65deg) rotateZ(5deg) rotateX(10deg) scaleX(0.7);
            }
          }
          @keyframes rightWingFlutter3D {
            0%, 100% {
              transform: perspective(800px) rotateY(-15deg) rotateZ(10deg) rotateX(-5deg);
            }
            50% {
              transform: perspective(800px) rotateY(-65deg) rotateZ(-5deg) rotateX(10deg) scaleX(0.7);
            }
          }
          @keyframes haloGlow3D {
            0%, 100% { filter: drop-shadow(0 0 4px #f59e0b) brightness(1); }
            50% { filter: drop-shadow(0 0 12px #fbcfe8) brightness(1.3); }
          }
          @keyframes floatingHearts3D {
            0% { transform: translateY(0) scale(0.8) rotate(0deg); opacity: 0; }
            20% { opacity: 0.8; }
            100% { transform: translateY(-40px) scale(1.1) rotate(20deg); opacity: 0; }
          }
          .animate-cupid-3d {
            animation: cupidFloat3D 4.5s infinite ease-in-out;
            transform-style: preserve-3d;
          }
          .animate-wing-l-3d {
            animation: leftWingFlutter3D 0.5s infinite ease-in-out;
            transform-origin: 42px 50px;
          }
          .animate-wing-r-3d {
            animation: rightWingFlutter3D 0.5s infinite ease-in-out;
            transform-origin: 58px 50px;
          }
          .animate-halo-3d {
            animation: haloGlow3D 3s infinite ease-in-out;
          }
          .animate-spark-heart {
            animation: floatingHearts3D 2.5s infinite ease-out;
          }
        `}</style>

        {/* Inside Card Body */}
        <div className="bg-[#0b0507] rounded-[22px] p-6 md:p-8 overflow-hidden relative">
          
          {/* Volumetric Radial Red & Gold Backlighting */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-600/15 rounded-full blur-[60px] pointer-events-none"></div>
          <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-amber-500/10 rounded-full blur-[70px] pointer-events-none"></div>

          {/* Golden Corner Curvature Accent lines */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-500/10 rounded-tl-[20px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-500/10 rounded-br-[20px] pointer-events-none"></div>

          {/* Close button manual override */}
          <button 
            onClick={handleDismiss}
            className="absolute top-4 right-4 text-neutral-400 hover:text-red-400 transition-all p-1.5 rounded-full hover:bg-white/5 cursor-pointer z-20 hover:scale-110 active:scale-95"
            title="Fechar mensagem romântica"
            id="btn-close-romantic-popup"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Volumetric Content Presentation Setup */}
          <div className="flex flex-col items-center text-center space-y-6 pt-2">
            
            {/* Extremely detailed Volume/Shaded 3D Gold & Clay Golden Cupid */}
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0 mb-2">
              
              {/* Pulsing Back Glow behind 3D Cupid */}
              <div className="absolute w-28 h-28 bg-gradient-to-tr from-red-600/20 to-amber-500/15 rounded-full blur-2xl animate-pulse -z-10"></div>
              
              {/* Sparks emitting from Cupid */}
              <div className="absolute animate-spark-heart text-red-500 text-xs" style={{ top: '10%', left: '20%', animationDelay: '0s' }}>❤️</div>
              <div className="absolute animate-spark-heart text-rose-400 text-sm" style={{ top: '15%', right: '15%', animationDelay: '0.8s' }}>💖</div>
              <div className="absolute animate-spark-heart text-amber-300 text-xs" style={{ bottom: '20%', left: '10%', animationDelay: '1.4s' }}>✨</div>
              
              <svg 
                viewBox="0 0 100 100" 
                className="w-32 h-32 animate-cupid-3d select-none z-10"
                id="cupid-3d-svg"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <defs>
                  {/* Glossy Clay 3D Pink Wings Radial Gradient */}
                  <radialGradient id="wing3dGrad" cx="50%" cy="30%" r="70%" fx="30%" fy="20%">
                    <stop offset="0%" stopColor="#fff1f3" />
                    <stop offset="40%" stopColor="#fbcfe8" />
                    <stop offset="85%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#9d174d" />
                  </radialGradient>

                  {/* Volumetric Gold Skin & Body Shader */}
                  <radialGradient id="gold3dBody" cx="35%" cy="30%" r="65%" fx="30%" fy="25%">
                    <stop offset="0%" stopColor="#fff8e7" />
                    <stop offset="25%" stopColor="#fcd34d" />
                    <stop offset="75%" stopColor="#d97706" />
                    <stop offset="95%" stopColor="#78350f" />
                    <stop offset="100%" stopColor="#451a03" />
                  </radialGradient>

                  {/* Shimmery Metallic Gold Bow & Halo */}
                  <linearGradient id="gold3dMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="30%" stopColor="#fffbeb" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="80%" stopColor="#b45309" />
                    <stop offset="100%" stopColor="#78350f" />
                  </linearGradient>

                  {/* Volumetric Ruby Heart Gradient */}
                  <radialGradient id="heart3dGrad" cx="35%" cy="30%" r="55%">
                    <stop offset="0%" stopColor="#ff8a9a" />
                    <stop offset="45%" stopColor="#ef4444" />
                    <stop offset="85%" stopColor="#991b1b" />
                    <stop offset="100%" stopColor="#4c0519" />
                  </radialGradient>
                </defs>

                {/* Left 3D Wing Layer with Flutter rotate */}
                <g className="animate-wing-l-3d">
                  {/* Subtly offset backing shadow wing for 3D bounce */}
                  <path 
                    d="M 42,42 C 22,32 10,48 42,52 C 34,47 32,41 42,42 Z" 
                    fill="#4c0519" 
                    opacity="0.4"
                    transform="translate(-2, 2)"
                  />
                  <path 
                    d="M 42,42 C 22,32 10,48 42,52 C 34,47 32,41 42,42 Z" 
                    fill="url(#wing3dGrad)" 
                  />
                </g>

                {/* Right 3D Wing Layer with Flutter rotate */}
                <g className="animate-wing-r-3d">
                  {/* Wing Shadow */}
                  <path 
                    d="M 58,42 C 78,32 90,48 58,52 C 66,47 68,41 58,42 Z" 
                    fill="#4c0519" 
                    opacity="0.4"
                    transform="translate(2, 2)"
                  />
                  <path 
                    d="M 58,42 C 78,32 90,48 58,52 C 66,47 68,41 58,42 Z" 
                    fill="url(#wing3dGrad)" 
                  />
                </g>

                {/* 3D Halo Rings above head */}
                <ellipse 
                  cx="50" 
                  cy="17" 
                  rx="14" 
                  ry="4" 
                  fill="none" 
                  stroke="url(#gold3dMetallic)" 
                  strokeWidth="3.5" 
                  className="animate-halo-3d"
                />
                <ellipse 
                  cx="50" 
                  cy="17" 
                  rx="14" 
                  ry="4" 
                  fill="none" 
                  stroke="#fffbeb" 
                  strokeWidth="1" 
                  opacity="0.7"
                />

                {/* Torso & Chubby Legs (Volumetric shapes mimicking 3D clay) */}
                <path 
                  d="M 44,50 Q 50,53 56,50 Q 59,62 50,71 Q 41,62 44,50 Z" 
                  fill="url(#gold3dBody)" 
                />
                
                {/* 3D Left Thigh & Leg sphere */}
                <circle cx="43" cy="65" r="7" fill="url(#gold3dBody)" />
                <circle cx="41" cy="71" r="5" fill="url(#gold3dBody)" />
                
                {/* 3D Right Thigh & Leg sphere */}
                <circle cx="57" cy="65" r="7" fill="url(#gold3dBody)" />
                <circle cx="59" cy="71" r="5" fill="url(#gold3dBody)" />

                {/* Rounded Glossy Head Sphere */}
                <circle 
                  cx="50" 
                  cy="32" 
                  r="13" 
                  fill="url(#gold3dBody)" 
                  filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))"
                />

                {/* Chubby cheeks specular circles */}
                <circle cx="44" cy="34" r="2.5" fill="#fca5a5" opacity="0.35" />
                <circle cx="56" cy="34" r="2.5" fill="#fca5a5" opacity="0.35" />

                {/* Cute sleeping golden eyes */}
                <path d="M 42,31 Q 45,34 47,31" stroke="#451a03" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M 53,31 Q 55,34 58,31" stroke="#451a03" strokeWidth="1.5" fill="none" strokeLinecap="round" />

                {/* 3D Curved Arms holding Bow */}
                {/* Left Arm */}
                <path 
                  d="M 38,40 C 32,45 35,53 45,49" 
                  stroke="url(#gold3dBody)" 
                  strokeWidth="6" 
                  strokeLinecap="round" 
                  fill="none" 
                />
                {/* Right Arm */}
                <path 
                  d="M 62,40 C 68,45 65,53 55,49" 
                  stroke="url(#gold3dBody)" 
                  strokeWidth="6" 
                  strokeLinecap="round" 
                  fill="none" 
                />

                {/* Volumetric Gold Bow */}
                <path 
                  d="M 66,35 C 60,37 59,48 64,56 C 65,58 64,62 61,64" 
                  stroke="url(#gold3dMetallic)" 
                  strokeWidth="3.5" 
                  fill="none" 
                  strokeLinecap="round" 
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
                />
                
                {/* Bowstring */}
                <line x1="66" y1="35" x2="61" y2="64" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />

                {/* Golden Arrow targeting Heart */}
                <path 
                  d="M 52,48 L 72,48" 
                  stroke="url(#gold3dMetallic)" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                />
                <path 
                  d="M 72,45 L 77,48 L 72,51 Z" 
                  fill="url(#gold3dMetallic)" 
                />

                {/* Volumetric Shiny 3D Ruby Heart dangling near bow */}
                <path 
                  d="M 50,60 C 50,60 44,54 44,49 C 44,45 47,43 50,46 C 53,43 56,45 56,49 C 56,54 50,60 50,60 Z" 
                  fill="url(#heart3dGrad)" 
                  transform="translate(18, 14) scale(0.65)"
                  filter="drop-shadow(0 3px 6px rgba(153,27,27,0.4))"
                />
              </svg>

              {/* Glossy ambient reflection on the Cupid cover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 rounded-full pointer-events-none"></div>
            </div>

            {/* Campaign Header Details */}
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/20 text-xs font-bold text-red-400 tracking-widest uppercase shadow-inner">
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" /> Amor no Violeta
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-gold-200 tracking-wide select-none">
                Celebre Conosco
              </h3>
            </div>

            {/* Main Interactive Customizable Text */}
            <p className="text-sm md:text-base text-[#F4EFE6] font-serif italic leading-relaxed px-2 select-none max-w-sm">
              “{config.popupText}”
            </p>

            {/* Divider */}
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>

            {/* Elegantly Crafted Closing Button CTA */}
            <div className="pt-2 w-full">
              <button 
                onClick={handleDismiss} 
                className="w-full bg-gradient-to-r from-red-700 to-[#a3222e] hover:from-red-600 hover:to-red-700 text-white font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-xl shadow-lg hover:shadow-red-900/30 active:scale-98 transition-all cursor-pointer font-sans"
                id="btn-understand-cupid"
              >
                Encantar-se & Reservar
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
