import { supabase, isSupabaseConfigured } from './supabaseClient';
import { EventBistro, HeroBanner, WhatsAppConfig, RomanticThemeConfig, SpecialCampaignConfig, MenuItem, ExperienceConfig } from '../types';

// ==========================================
// 1. CONFIGURAÇÕES DO SITE (site_settings)
// ==========================================
export async function getSettingFromSupabase<T>(key: string): Promise<T | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', key)
      .maybeSingle();

    if (error) {
      console.warn(`[Supabase] Erro ao buscar setting '${key}':`, error.message);
      return null;
    }
    return (data?.value as T) ?? null;
  } catch (err) {
    console.error(`[Supabase] Falha de conexão em setting '${key}':`, err);
    return null;
  }
}

export async function saveSettingToSupabase(key: string, value: any): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const { error } = await supabase
      .from('site_settings')
      .upsert({ 
        key, 
        value, 
        updated_at: new Date().toISOString() 
      }, { onConflict: 'key' });

    if (error) {
      console.error(`[Supabase] Erro ao salvar setting '${key}':`, error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[Supabase] Falha de conexão ao salvar setting '${key}':`, err);
    return false;
  }
}

// ==========================================
// 2. EVENTOS (events)
// ==========================================
export async function getEventsFromSupabase(): Promise<EventBistro[] | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.warn('[Supabase] Erro ao buscar eventos:', error.message);
      return null;
    }
    if (!data || data.length === 0) return null;

    return data.map(item => ({
      id: item.id,
      title: item.title,
      date: item.date,
      time: item.time,
      description: item.description,
      image: item.image,
      video: item.video,
      videoType: item.video_type,
      active: item.active,
      buttonText: item.button_text,
      whatsappMessage: item.whatsapp_message,
      isRomanticSpecial: item.is_romantic_special
    }));
  } catch (err) {
    console.error('[Supabase] Falha ao carregar eventos:', err);
    return null;
  }
}

export async function saveEventsToSupabase(events: EventBistro[]): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const rows = events.map(evt => ({
      id: evt.id,
      title: evt.title,
      date: evt.date,
      time: evt.time,
      description: evt.description,
      image: evt.image,
      video_type: evt.videoType || 'link',
      video: evt.video || '',
      active: evt.active ?? true,
      button_text: evt.buttonText || '',
      whatsapp_message: evt.whatsappMessage || '',
      is_romantic_special: evt.isRomanticSpecial ?? false,
      updated_at: new Date().toISOString()
    }));

    const { error } = await supabase
      .from('events')
      .upsert(rows, { onConflict: 'id' });

    if (error) {
      console.error('[Supabase] Erro ao salvar eventos:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Supabase] Falha ao salvar eventos:', err);
    return false;
  }
}

// ==========================================
// 3. CARDÁPIO (menu_items)
// ==========================================
export async function getMenuFromSupabase(): Promise<MenuItem[] | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('[Supabase] Erro ao buscar cardápio:', error.message);
      return null;
    }
    if (!data || data.length === 0) return null;

    return data.map(item => ({
      id: item.id,
      name: item.name,
      category: item.category as MenuItem['category'],
      price: Number(item.price),
      description: item.description || '',
      image: item.image || '',
      pairing: item.pairing || '',
      anecdote: item.anecdote || '',
      isChefRecommended: item.is_chef_recommended ?? false
    }));
  } catch (err) {
    console.error('[Supabase] Falha ao carregar cardápio:', err);
    return null;
  }
}

export async function saveMenuToSupabase(menuItems: MenuItem[]): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const rows = menuItems.map((item, index) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      image: item.image,
      pairing: item.pairing || '',
      anecdote: item.anecdote || '',
      is_chef_recommended: item.isChefRecommended ?? false,
      sort_order: index,
      updated_at: new Date().toISOString()
    }));

    const { error } = await supabase
      .from('menu_items')
      .upsert(rows, { onConflict: 'id' });

    if (error) {
      console.error('[Supabase] Erro ao salvar cardápio:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Supabase] Falha ao salvar cardápio:', err);
    return false;
  }
}

// ==========================================
// 4. RESERVAS (reservations)
// ==========================================
export interface NewReservationPayload {
  code: string;
  name: string;
  email?: string;
  phone?: string;
  date: string;
  time: string;
  partySize: number;
  atmosphere?: string;
  tableId?: string | number;
  tableDesc?: string;
  upgrades?: string[];
  totalDepositEstimate?: number;
}

export async function createReservationInSupabase(payload: NewReservationPayload): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const { error } = await supabase
      .from('reservations')
      .insert({
        code: payload.code,
        guest_name: payload.name,
        guest_email: payload.email || '',
        guest_phone: payload.phone || '',
        booking_date: payload.date,
        booking_time: payload.time,
        party_size: payload.partySize,
        atmosphere: payload.atmosphere || '',
        table_id: String(payload.tableId ?? ''),
        table_desc: payload.tableDesc || '',
        upgrades: payload.upgrades || [],
        total_deposit_estimate: payload.totalDepositEstimate || 0,
        status: 'pending'
      });

    if (error) {
      console.error('[Supabase] Erro ao salvar reserva:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Supabase] Falha ao registrar reserva:', err);
    return false;
  }
}
