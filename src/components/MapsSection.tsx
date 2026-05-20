import React from 'react';
import { MapPin, Compass, Clock, Phone, Mail } from 'lucide-react';

export default function MapsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      
      {/* Map Details Card */}
      <div className="lg:col-span-5 p-8 rounded-xl bg-neutral-900/60 border border-gold-800/5 flex flex-col justify-between">
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#B59C66] font-semibold">Local & Horários</span>
            <h4 className="font-serif text-3xl text-white tracking-wide mt-2">Visite-nos com Reservas</h4>
            <p className="text-xs text-[#8E8376] mt-1 leading-relaxed">
              O espaço físico do Violeta fica localizado bem no coração do agreste pernambucano, em Surubim - PE, oferecendo refúgio reservado e alta cozinha artística.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Endereço Nobre</p>
                <p className="text-xs text-[#A89F8F] mt-0.5 leading-relaxed">
                  Surubim - PE, Brasil (Consulte o rotas no mapa ao lado)
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Clock className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Altos Horários de Cozinha</p>
                <p className="text-xs text-[#A89F8F] mt-0.5 leading-relaxed">
                  Quarta a Sábado: 19:00h – 23:30h (Jantares) <br />
                  Domingos: 12:00h – 16:30h (Almoço de Autoria)
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Phone className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">WhatsApp Concierge</p>
                <p className="text-[11px] text-[#A89F8F] mt-0.5 font-mono">
                  +55 (81) 98807-0000
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Mail className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">E-mail de Suporte</p>
                <p className="text-[11px] text-gold-300 mt-0.5 font-mono">
                  atendimento@violetarestaurante.com.br
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gold-800/10 text-justify">
          <p className="text-[10px] text-[#8E8376] italic leading-relaxed">
            Recomendamos formalizar sua solicitação de reserva com pelo menos 24 horas de antecedência para garantir a melhor climatização acústica e decorativa de sua mesa seleccionada.
          </p>
        </div>
      </div>

      {/* Embedded Maps Code inside premium border framed div */}
      <div className="lg:col-span-7 rounded-xl overflow-hidden gold-gradient-border relative min-h-[350px] shadow-2xl flex">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.4619067362437!2d-35.7590573!3d-7.846628599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7abdbeaef3b58e7%3A0x74fe999095791e54!2sVioleta%20-%20Arte%20Culin%C3%A1ria!5e0!3m2!1spt-BR!2sbr!4v1779296487062!5m2!1spt-BR!2sbr" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true}
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full min-h-[400px]"
          title="Google Maps Location - Violeta"
        />
      </div>

    </div>
  );
}
