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

        // Violeta sound theme: soothing minor acoustic chord, warm organ swells
        const osc1 = ctx.createOscillator();
        const oscGain1 = ctx.createGain();
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(65.41, ctx.currentTime); // C2 (deep cello root)
        oscGain1.gain.setValueAtTime(0.25, ctx.currentTime);
        
        const osc2 = ctx.createOscillator();
        const oscGain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(130.81, ctx.currentTime); // C3
        oscGain2.gain.setValueAtTime(0.15, ctx.currentTime);

        const osc3 = ctx.createOscillator();
        const oscGain3 = ctx.createGain();
        osc3.type = 'sine';
        osc3.frequency.setValueAtTime(155.56, ctx.currentTime); // D#3 / Eb3 (minor third for mystic tone)
        oscGain3.gain.setValueAtTime(0.12, ctx.currentTime);

        const osc4 = ctx.createOscillator();
        const oscGain4 = ctx.createGain();
        osc4.type = 'sine';
        osc4.frequency.setValueAtTime(196.00, ctx.currentTime); // G3 (perfect fifth)
        oscGain4.gain.setValueAtTime(0.1, ctx.currentTime);

        osc1.connect(oscGain1);
        oscGain1.connect(masterGain);
        
        osc2.connect(oscGain2);
        oscGain2.connect(masterGain);

        osc3.connect(oscGain3);
        oscGain3.connect(masterGain);

        osc4.connect(oscGain4);
        oscGain4.connect(masterGain);

        osc1.start();
        osc2.start();
        osc3.start();
        osc4.start();

        let shift = 0;
        const intervalId = window.setInterval(() => {
          if (!audioCtxRef.current) return;
          const time = audioCtxRef.current.currentTime;
          const currentSwell = 0.12 + Math.sin(shift) * 0.04;
          oscGain2.gain.setTargetAtTime(currentSwell, time, 1.8);
          // Subtle pitch vibrato for organic feeling
          osc1.frequency.setTargetAtTime(65.41 + Math.sin(shift) * 0.2, time, 2.0);
          osc3.frequency.setTargetAtTime(155.56 + Math.cos(shift) * 0.3, time, 2.0);
          shift += 0.4;
        }, 2500);

        oscillatorIntervalRef.current = intervalId;
        setIsPlayingAudio(true);
        onNotify("Som ambiente sintonizado. Sinta as ondas instrumentais do Violeta.");
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
