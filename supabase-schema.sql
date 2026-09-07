-- ==============================================================================
-- SCHEMA SUPABASE PARA O VIOLETA BISTRÔ
-- Execute este script no SQL Editor do seu projeto Supabase
-- ==============================================================================

-- 1. Habilitar extensões úteis
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Tabela de Configurações Gerais do Site (Key-Value com JSONB)
-- Guarda Hero Banner, WhatsApp, Temas (Namorados, Natal, Páscoa, Ano Novo) e Experiência
CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tabela de Eventos
CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT,
    video TEXT,
    video_type TEXT DEFAULT 'link',
    active BOOLEAN DEFAULT true,
    button_text TEXT,
    whatsapp_message TEXT,
    is_romantic_special BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Tabela de Itens do Cardápio
CREATE TABLE IF NOT EXISTS menu_items (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    description TEXT,
    image TEXT,
    pairing TEXT,
    anecdote TEXT,
    is_chef_recommended BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Tabela de Reservas
CREATE TABLE IF NOT EXISTS reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL,
    guest_name TEXT NOT NULL,
    guest_email TEXT,
    guest_phone TEXT,
    booking_date TEXT NOT NULL,
    booking_time TEXT NOT NULL,
    party_size INTEGER NOT NULL,
    atmosphere TEXT,
    table_id TEXT,
    table_desc TEXT,
    upgrades TEXT[],
    total_deposit_estimate NUMERIC(10, 2),
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- POLÍTICAS DE ACESSO (Row Level Security - RLS)
-- Permitir leitura pública (SELECT) e escrita pública (INSERT/UPDATE/DELETE) 
-- usando a chave ANON (ideal para o painel de administração atual sem auth complexa)
-- ------------------------------------------------------------------------------

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- site_settings policies
CREATE POLICY "Permitir leitura publica de site_settings" 
ON site_settings FOR SELECT USING (true);

CREATE POLICY "Permitir edicao de site_settings" 
ON site_settings FOR ALL USING (true) WITH CHECK (true);

-- events policies
CREATE POLICY "Permitir leitura publica de events" 
ON events FOR SELECT USING (true);

CREATE POLICY "Permitir edicao de events" 
ON events FOR ALL USING (true) WITH CHECK (true);

-- menu_items policies
CREATE POLICY "Permitir leitura publica de menu_items" 
ON menu_items FOR SELECT USING (true);

CREATE POLICY "Permitir edicao de menu_items" 
ON menu_items FOR ALL USING (true) WITH CHECK (true);

-- reservations policies
CREATE POLICY "Permitir leitura de reservations" 
ON reservations FOR SELECT USING (true);

CREATE POLICY "Permitir insercao de reservations" 
ON reservations FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir edicao de reservations" 
ON reservations FOR ALL USING (true) WITH CHECK (true);

