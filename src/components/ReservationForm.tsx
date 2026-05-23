import React, { useState } from 'react';
import { ATMOSPHERES_VIOLETA } from '../data';
import { Calendar, Clock, Users, Check, Sparkles, Send, Coffee } from 'lucide-react';
import { WhatsAppConfig } from '../types';

interface ReservationFormProps {
  whatsAppConfig?: WhatsAppConfig;
  onNotify: (text: string) => void;
}

function formatPhoneNumber(num: string) {
  if (!num) return '';
  const digits = num.replace(/\D/g, '');
  let local = digits;
  if (local.startsWith('55') && local.length > 10) {
    local = local.substring(2);
  }
  
  if (local.length === 11) {
    return `(${local.substring(0, 2)}) ${local.substring(2, 7)}-${local.substring(7)}`;
  } else if (local.length === 10) {
    return `(${local.substring(0, 2)}) ${local.substring(2, 6)}-${local.substring(6)}`;
  }
  
  // Format standard if not mobile
  if (digits.length >= 10) {
    return `+${digits.substring(0, 2)} (${digits.substring(2, 4)}) ${digits.substring(4, 9)}-${digits.substring(9)}`;
  }
  return num;
}

export default function ReservationForm({ whatsAppConfig, onNotify }: ReservationFormProps) {
  const [selectedAtmosphere] = useState<'salone'>('salone');
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [bookingPartySize, setBookingPartySize] = useState<number>(2);
  const [bookingDate, setBookingDate] = useState<string>('2026-05-25');
  const [bookingTime, setBookingTime] = useState<string>('20:00');
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');

  // Confirmed ticket state to render
  const [ticketIssued, setTicketIssued] = useState<any | null>(null);

  const activeAtmosphere = ATMOSPHERES_VIOLETA[selectedAtmosphere];

  const handlePartySizeChange = (newSize: number) => {
    setBookingPartySize(newSize);
    
    // Check if current selected table can accommodate the new size
    const currentTable = activeAtmosphere.tables.find(t => t.id === selectedTable);
    if (currentTable && currentTable.seats >= newSize) {
      // Current table is still perfectly fine! No need to auto-switch.
      return;
    }
    
    // Otherwise, find a table that can accommodate the new size
    const compatibleTable = activeAtmosphere.tables.find(t => t.seats >= newSize);
    if (compatibleTable) {
      setSelectedTable(compatibleTable.id);
      onNotify(`Sincronizado: ${newSize} pessoas. Mesa ${compatibleTable.id} (${compatibleTable.seats} lugares) selecionada.`);
    } else {
      setSelectedTable(null);
      if (newSize > 4) {
        onNotify(`Definido para ${newSize} pessoas. Reservas para grandes grupos (até 12 pessoas) serão coordenadas sob consulta via WhatsApp.`);
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestName.trim()) {
      onNotify("Por favor, preencha o seu nome completo.");
      return;
    }
    if (!guestEmail.trim()) {
      onNotify("Por favor, preencha o seu e-mail.");
      return;
    }

    const isGroupBooking = bookingPartySize > 4;

    if (selectedTable === null && !isGroupBooking) {
      onNotify("Selecione uma de nossas mesas artísticas no mapa virtual de assentos.");
      return;
    }

    const currentTable = selectedTable !== null
      ? activeAtmosphere.tables.find(t => t.id === selectedTable)
      : { id: "Especial", desc: "Arranjo especial para grandes grupos (sob consulta)", location: "Salão" };

    if (!currentTable) return;

    // Upgrades list - empty as upgrades are removed
    const upgrades: string[] = [];

    // Generate ticket info
    const bookingCode = `VIOLETA-${Math.floor(100000 + Math.random() * 900000)}`;

    const bookingObject = {
      code: bookingCode,
      name: guestName,
      email: guestEmail,
      date: bookingDate,
      time: bookingTime,
      partySize: bookingPartySize,
      atmosphere: activeAtmosphere.title,
      tableId: selectedTable !== null ? selectedTable : "Especial",
      tableDesc: currentTable.desc,
      upgrades,
      totalDepositEstimate: (50 * bookingPartySize)
    };

    setTicketIssued(bookingObject);
    onNotify("Informações geradas! Encaminhando a confirmação para o WhatsApp oficial...");

    // Format WhatsApp message text
    let whatsappText = `Olá Violeta - Arte Culinária! Gostaria de efetuar uma reserva:\n\n` +
      `💜 *SOLICITAÇÃO DE RESERVA REFINADA*\n` +
      `• *Código:* ${bookingCode}\n` +
      `• *Nome:* ${guestName}\n` +
      `• *E-mail:* ${guestEmail}\n` +
      `• *Data:* ${bookingDate}\n` +
      `• *Horário:* ${bookingTime}\n` +
      `• *Pessoas:* ${bookingPartySize} convidado(s)\n` +
      `• *Ambiente:* ${activeAtmosphere.title}\n` +
      (selectedTable !== null 
        ? `• *Mesa Selecionada:* Mesa ${selectedTable} (${currentTable.desc})\n` 
        : `• *Mesas:* Arranjo Imperial / Junção de Mesas para Grande Grupo (${bookingPartySize} convidados)\n`);

    if (upgrades.length > 0) {
      whatsappText += `\n✨ *Upgrades da Experiência selecionados:*\n` + upgrades.map(u => `  - ${u}`).join('\n') + `\n`;
    }

    whatsappText += `\nPor favor, validem a minha reserva de mesa. Obrigado(a)!`;

    const cleanPhone = whatsAppConfig?.number || "5581988070000";
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanPhone.replace(/\D/g, '')}&text=${encodeURIComponent(whatsappText)}`;
    
    // Redirect trigger
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      
      {/* Table Selector Box (7cols) */}
      <div className="lg:col-span-7 space-y-6">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#B59C66] font-semibold">Passo 1 / O Espaço</span>
          <h4 className="font-serif text-2xl text-[#FCFBF8] tracking-wide mt-1">Selecione seu Ambiente e Mesa</h4>
          <p className="text-xs text-[#8E8376] mt-1">Cada canto do Violeta é planejado para ser uma experiência contemplativa única.</p>
        </div>

        {/* Space description */}
        <p className="text-xs text-[#C2B7A8] italic bg-neutral-900/60 p-4 rounded border-l-2 border-gold-400">
          "{activeAtmosphere.desc}"
        </p>

        {/* 2D Seating Layout Blueprint */}
        <div className="mt-6">
          <label className="text-[10px] uppercase font-bold text-gold-400 tracking-widest block mb-3">MAPA DE DISPOSIÇÃO DE MESAS</label>
          
          <div className="bg-neutral-900 border border-gold-800/10 rounded-xl p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[220px]">
            {/* Visual Compass Grid Decor */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(197,168,92,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(197,168,92,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            {/* Layout representation to reflect room shapes */}
            <div className="w-full max-w-md grid grid-cols-5 gap-4 relative z-10">
              {/* Wine Cellar indicator placeholder (Piano removed) */}
              <div className="col-span-5 h-8 border border-dashed border-gold-500/10 rounded flex items-center justify-center mb-2 bg-[#090909]">
                <span className="text-[9px] text-[#8E8376] tracking-widest uppercase">🍷 Adega Suspensa Climatizada & Velas de Violeta</span>
              </div>
              {activeAtmosphere.tables.map((table) => {
                const isSelected = selectedTable === table.id;
                const fitsCapacity = table.seats >= bookingPartySize;
                const matchesExactly = table.seats === bookingPartySize;
                
                return (
                  <button
                    key={table.id}
                    type="button"
                    onClick={() => {
                      setSelectedTable(table.id);
                      setBookingPartySize(table.seats);
                      onNotify(`Mesa ${table.id} selecionada. Capacidade de ${table.seats} lugares ativada no formulário.`);
                    }}
                    className={`h-16 rounded-lg border flex flex-col items-center justify-center p-2 cursor-pointer transition-all relative overflow-hidden ${
                      isSelected 
                        ? 'bg-gold-400 text-neutral-950 border-white scale-105 shadow-md font-bold' 
                        : matchesExactly
                          ? 'bg-neutral-950 hover:bg-neutral-900 border-gold-400/50 text-gold-200 ring-1 ring-gold-400/10 scale-102 font-bold'
                          : fitsCapacity
                            ? 'bg-neutral-950 hover:bg-neutral-900 border-gold-800/50 text-[#FCFBF8]'
                            : 'bg-neutral-950/40 hover:bg-neutral-950/60 border-neutral-900/40 text-neutral-600 opacity-65'
                    }`}
                  >
                    {matchesExactly && !isSelected && (
                      <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse"></span>
                    )}
                    <span className="text-xs font-serif leading-none">Mesa {table.id}</span>
                    <span className="text-[8px] uppercase mt-1 tracking-widest font-sans opacity-70">{table.seats} Lugares</span>
                  </button>
                );
              })}
            </div>


          </div>
        </div>

        {/* Selected table info details panel */}
        {selectedTable !== null && (
          <div className="p-4 rounded-lg bg-gold-900/15 border border-gold-300/10 text-left animate-fade-in flex items-start gap-3">
            <span className="text-xl">✨</span>
            <div>
              <p className="text-[11px] font-bold text-gold-300 uppercase tracking-widest">VOCÊ ESCOLHEU A MESA {selectedTable}</p>
              <p className="text-xs text-white italic mt-1 font-serif">
                "{activeAtmosphere.tables.find(t => t.id === selectedTable)?.desc}" 
              </p>
              <p className="text-[9px] text-[#8E8376] mt-0.5 uppercase tracking-wider">
                Localização: {activeAtmosphere.tables.find(t => t.id === selectedTable)?.location} • {activeAtmosphere.tables.find(t => t.id === selectedTable)?.seats} lugares configurados.
              </p>
            </div>
          </div>
        )}

        {selectedTable === null && bookingPartySize > 4 && (
          <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-500/20 text-left animate-fade-in flex items-start gap-3">
            <span className="text-xl">✨</span>
            <div>
              <p className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">Arranjo Especial para Grande Grupo</p>
              <p className="text-xs text-[#FCFBF8] italic mt-1 font-serif">
                "Nosso restaurante providenciará uma mesa Imperial ou junção personalizada para acomodar confortavelmente seus {bookingPartySize} convidados."
              </p>
              <p className="text-[9px] text-[#8E8376] mt-1.5 uppercase tracking-wider">
                Localização: Salão Principal • Reservas para grupos de {bookingPartySize} pessoas coordenadas via canal direto do WhatsApp.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Guest Details & Experience upgrades form (5cols) */}
      <form onSubmit={handleFormSubmit} className="lg:col-span-5 space-y-6 bg-neutral-900/40 p-6 rounded-xl border border-gold-800/5 hover:border-gold-800/10 transition-all">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#B59C66] font-semibold">Passo 2 / Detalhes</span>
          <h4 className="font-serif text-2xl text-[#FCFBF8] tracking-wide mt-1">Agende Graciosamente</h4>
          <p className="text-[10px] text-[#8E8376] mt-1">Preencha o formulário refinado para que o concierge monte seu ticket de reserva.</p>
        </div>

        <div className="space-y-4">
          
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-[#FCFBF8] tracking-widest block">Seu Nome Inteiro</label>
            <input 
              type="text" 
              required
              placeholder="Ex: Clara de Albuquerque"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full bg-[#090909] border border-gold-800/20 rounded p-3 text-xs text-white focus:outline-none focus:border-gold-400 placeholder:text-neutral-700 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-[#FCFBF8] tracking-widest block">E-mail para Confirmação</label>
            <input 
              type="email" 
              required
              placeholder="Ex: clara@gmail.com"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="w-full bg-[#090909] border border-gold-800/20 rounded p-3 text-xs text-white focus:outline-none focus:border-gold-400 placeholder:text-neutral-700 font-medium"
            />
          </div>

          {/* Group date/time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-[#FCFBF8] tracking-widest block flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gold-400" /> Data
              </label>
              <input 
                type="date" 
                required
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full bg-[#090909] border border-gold-800/20 rounded p-3 text-xs text-white focus:outline-none focus:border-gold-400 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-[#FCFBF8] tracking-widest block flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gold-400" /> Horário
              </label>
              <select 
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                className="w-full bg-[#090909] border border-gold-800/20 rounded p-3 text-xs text-white focus:outline-none focus:border-gold-400 cursor-pointer"
              >
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="19:30">19:30</option>
                <option value="20:00">20:00 (Recomendado)</option>
                <option value="20:30">20:30</option>
                <option value="21:00">21:00</option>
                <option value="22:00">22:00</option>
              </select>
            </div>
          </div>

          {/* Group party size selector */}
          <div className="space-y-1 bg-[#090909] p-3 rounded border border-gold-800/10">
            <label className="text-[10px] uppercase font-bold text-[#FCFBF8] tracking-widest block mb-2 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-gold-400" /> NÚMERO DE VISITAS / ASSENTOS
            </label>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#A89F8F]">Assentos na mesa:</span>
              <div className="flex items-center gap-3">
                <button 
                  type="button"
                  onClick={() => handlePartySizeChange(Math.max(1, bookingPartySize - 1))}
                  className="w-8 h-8 rounded border border-gold-800/20 text-xs text-gold-300 hover:border-gold-400 transition-colors flex items-center justify-center cursor-pointer font-bold"
                >
                  -
                </button>
                <span className="text-sm font-serif font-bold text-white w-4 text-center">{bookingPartySize}</span>
                <button 
                  type="button"
                  onClick={() => handlePartySizeChange(Math.min(12, bookingPartySize + 1))}
                  className="w-8 h-8 rounded border border-gold-800/20 text-xs text-gold-300 hover:border-gold-400 transition-colors flex items-center justify-center cursor-pointer font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Submit handle triggers instant popup and redirects to Whatsapp */}
        <button
          type="submit"
          className="w-full py-4 bg-gold-400 text-neutral-950 text-xs font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:bg-gold-300 transition-colors shadow-lg shadow-gold-500/10 active:scale-95 cursor-pointer"
        >
          <Send className="w-4 h-4" /> CONFIRMAR VIA WHATSAPP {formatPhoneNumber(whatsAppConfig?.number || "5581988070000")}
        </button>

        <p className="text-[9px] text-[#8E8376] text-center italic leading-relaxed">
          O preenchimento destina as informações para o canal de atendimento no WhatsApp. Suporte: <span className="text-gold-400 font-sans">atendimento@violetarestaurante.com.br</span>
        </p>

        {/* Real Dynamic Issued luxury confirmation box on screen */}
        {ticketIssued && (
          <div className="mt-4 gold-gradient-border p-5 rounded bg-black border border-gold-400/40 text-left animate-slide-up space-y-3">
            <div className="flex justify-between items-center border-b border-gold-800/20 pb-2">
              <div>
                <h5 className="font-serif text-sm text-[#FCFBF8] leading-none uppercase">Ticket de Reserva</h5>
                <span className="text-[9px] text-gold-400 tracking-wider">
                  {ticketIssued.tableId === "Especial" ? "Arranjo de Grupo" : `Mesa nº ${ticketIssued.tableId}`}
                </span>
              </div>
              <span className="text-[10px] font-mono text-gold-400 font-bold">{ticketIssued.code}</span>
            </div>
            
            <p className="text-[10px] text-[#A89F8F]">
              Sr(a). <strong className="text-white">{ticketIssued.name}</strong>, seu ticket foi criado. Você está sendo redirecionado para o WhatsApp <strong>{formatPhoneNumber(whatsAppConfig?.number || "5581988070000")}</strong> para registrar data e hora oficiais (<strong>{ticketIssued.date} às {ticketIssued.time}</strong>).
            </p>

            <div className="bg-[#101010] p-2.5 rounded text-[9px] text-[#8E8376] space-y-1">
              <p>📍 Ambiente: {ticketIssued.atmosphere}</p>
              <p>🪑 Disposição: {ticketIssued.tableDesc}</p>
              {ticketIssued.upgrades.length > 0 && <p>✨ Upgrades: Sim</p>}
            </div>

            <p className="text-[8px] text-center text-gold-400 uppercase tracking-[0.2em] animate-pulse">
              Redirecionando...
            </p>
          </div>
        )}

      </form>

    </div>
  );
}
