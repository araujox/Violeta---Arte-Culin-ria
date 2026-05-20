import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface AudioAmbianceProps {
  onNotify: (text: string) => void;
}

export default function AudioAmbiance({ onNotify }: AudioAmbianceProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0.2);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorIntervalRef = useRef<number | null>(null);
  const [soundwaveHeights, setSoundwaveHeights] = useState([12, 18, 10, 24, 28, 16, 11, 20, 8, 14]);

  useEffect(() => {
    let interval: any;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setSoundwaveHeights(prev => prev.map(() => Math.floor(Math.random() * 32) + 8));
      }, 150);
    } else {
      setSoundwaveHeights([4, 4, 4, 4, 4, 4, 4, 4, 4, 4]);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const toggleAmbianceSound = () => {
    try {
      if (!isPlayingAudio) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(audioVolume, ctx.currentTime);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Extremely soft and warm background pad (pure sines, incredibly quiet, no hum/buzz)
        const pad1 = ctx.createOscillator();
        const padGain1 = ctx.createGain();
        pad1.type = 'sine';
        pad1.frequency.setValueAtTime(130.81, ctx.currentTime); // C3
        padGain1.gain.setValueAtTime(0.04, ctx.currentTime);
        pad1.connect(padGain1);
        padGain1.connect(masterGain);
        pad1.start();

        const pad2 = ctx.createOscillator();
        const padGain2 = ctx.createGain();
        pad2.type = 'sine';
        pad2.frequency.setValueAtTime(196.00, ctx.currentTime); // G3 (perfect fifth)
        padGain2.gain.setValueAtTime(0.03, ctx.currentTime);
        pad2.connect(padGain2);
        padGain2.connect(masterGain);
        pad2.start();

        // 16-step elegant cinematic melody in C Minor (harmonized)
        const melodySteps = [
          { m: 523.25, h: 261.63 }, // C5 + C4
          { m: 0,      h: 0 },
          { m: 622.25, h: 311.13 }, // Eb5 + Eb4
          { m: 587.33, h: 0 },      // D5
          { m: 392.00, h: 196.00 }, // G4 + G3
          { m: 0,      h: 0 },
          { m: 466.16, h: 233.08 }, // Bb4 + Bb3
          { m: 523.25, h: 0 },      // C5
          { m: 783.99, h: 392.00 }, // G5 + G4
          { m: 0,      h: 0 },
          { m: 622.25, h: 311.13 }, // Eb5 + Eb4
          { m: 932.33, h: 0 },      // Bb5
          { m: 783.99, h: 523.25 }, // G5 + C5
          { m: 0,      h: 0 },
          { m: 587.33, h: 293.66 }, // D5 + D4
          { m: 466.16, h: 0 }       // Bb4
        ];

        // Function to synthesize a single beautiful crystal-clear organic bell note
        const playBellNode = (freq: number, velocity: number = 0.08, duration: number = 2.8) => {
          if (!audioCtxRef.current) return;
          const currentCtx = audioCtxRef.current;
          
          const oscNode = currentCtx.createOscillator();
          const noteGainNode = currentCtx.createGain();
          
          // Pure sine wave for crystal clear glass bell chime timbre (zero buzz/ruído)
          oscNode.type = 'sine';
          oscNode.frequency.setValueAtTime(freq, currentCtx.currentTime);
          
          noteGainNode.gain.setValueAtTime(0, currentCtx.currentTime);
          // Very rapid beautiful attack
          noteGainNode.gain.linearRampToValueAtTime(velocity, currentCtx.currentTime + 0.012);
          // Smooth bell decay
          noteGainNode.gain.exponentialRampToValueAtTime(0.0001, currentCtx.currentTime + duration);
          
          oscNode.connect(noteGainNode);
          noteGainNode.connect(masterGain);
          
          oscNode.start(currentCtx.currentTime);
          oscNode.stop(currentCtx.currentTime + duration + 0.2);
        };

        // Trigger first note immediately
        playBellNode(523.25, 0.08, 2.8);
        playBellNode(261.63, 0.04, 2.8);

        let currentStep = 1;
        const intervalId = window.setInterval(() => {
          if (!audioCtxRef.current) return;
          
          const step = melodySteps[currentStep];
          if (step.m > 0) {
            playBellNode(step.m, 0.08, 2.8);
          }
          if (step.h > 0) {
            playBellNode(step.h, 0.03, 3.2); // Harmony note is slightly softer and decays longer
          }
          
          currentStep = (currentStep + 1) % melodySteps.length;
        }, 1400); // 1.4 seconds per step for a relaxed, breathing tempo

        oscillatorIntervalRef.current = intervalId;
        setIsPlayingAudio(true);
        onNotify("Harmonias de piano de cristal e sinos ativadas. Desfrute da melodia do Violeta.");
      } else {
        if (oscillatorIntervalRef.current) {
          clearInterval(oscillatorIntervalRef.current);
          oscillatorIntervalRef.current = null;
        }
        if (audioCtxRef.current) {
          audioCtxRef.current.close();
          audioCtxRef.current = null;
        }
        setIsPlayingAudio(false);
        onNotify("Ambiência desligada.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(audioVolume, audioCtxRef.current.currentTime);
    }
  }, [audioVolume]);

  useEffect(() => {
    return () => {
      if (oscillatorIntervalRef.current) {
        clearInterval(oscillatorIntervalRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="gold-gradient-border p-4 rounded-xl bg-neutral-900/40 backdrop-blur max-w-md w-full flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button 
          onClick={toggleAmbianceSound}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-gold-400 text-neutral-950 hover:bg-gold-300 transition-transform active:scale-95 cursor-pointer shrink-0"
          title="Ativar Música de Fundo"
        >
          {isPlayingAudio ? <VolumeX className="w-5 h-5 animate-pulse" /> : <Volume2 className="w-5 h-5" />}
        </button>
        <div className="text-left">
          <p className="text-[11px] font-bold text-gold-300 tracking-wider">SOM AMBIENTE VIRTUAL</p>
          <p className="text-[9px] text-[#A89F8F]">Swell melódico instrumental e intimista</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-end gap-1 h-6 px-2 shrink-0">
          {soundwaveHeights.map((h, i) => (
            <span 
              key={i} 
              className="w-0.5 bg-gold-400 rounded-t transition-all duration-150" 
              style={{ height: `${h}px` }}
            />
          ))}
        </div>

        {isPlayingAudio && (
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[9px] text-[#A89F8F]">Vol:</span>
            <input 
              type="range"
              min="0.05"
              max="0.4"
              step="0.05"
              value={audioVolume}
              onChange={(e) => setAudioVolume(parseFloat(e.target.value))}
              className="w-12 h-1 accent-gold-400 cursor-pointer bg-neutral-800"
            />
          </div>
        )}
      </div>
    </div>
  );
}
