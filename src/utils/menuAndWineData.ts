export interface MenuCategory {
  id: string;
  title: string;
  description: string;
}

export interface FullMenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
}

export interface WineItem {
  id: string;
  name: string;
  category: 'chilenos' | 'portugueses' | 'argentinos' | 'espanhois' | 'espumantes' | 'taca' | 'licores';
  country: string;
  flag: string;
  price: number;
  image: string; // Link de placeholder elegante que o cliente pode facilmente substituir
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'entradas',
    title: 'Entradas',
    description: 'Comece sua noite com nossas seleções requintadas e sabores marcantes.'
  },
  {
    id: 'risotos',
    title: 'Risotos',
    description: 'Arroz arbóreo perfeitamente cremoso preparado com caldos e especiarias nobres.'
  },
  {
    id: 'massas',
    title: 'Massas',
    description: 'Massas frescas e artesanais banhadas em molhos clássicos da alta gastronomia.'
  },
  {
    id: 'parmegiana',
    title: 'Parmegianas',
    description: 'Pratos individuais e compartilhados gratinados com molhos artesanais e queijos nobres.'
  },
  {
    id: 'saladas',
    title: 'Saladas',
    description: 'Ingredientes frescos selecionados e grelhados com molhos exclusivos do Chef.'
  },
  {
    id: 'sobremesas',
    title: 'I Dolci (Sobremesas)',
    description: 'Harmonizações perfeitas de doçura e texturas para coroar sua experiência violeta.'
  },
  {
    id: 'almoco',
    title: 'Cardápio Almoço',
    description: 'Pratos executivos e criações leves ideais para desfrutar o requinte durante o dia.'
  },
  {
    id: 'kids',
    title: 'Kids',
    description: 'Opções delicadas e pensadas com carinho para os pequenos paladares.'
  }
];

export const FULL_MENU_ITEMS: FullMenuItem[] = [
  // --- ENTRADAS ---
  {
    id: 'ent-1',
    name: 'Caldinho de Feijão Preto',
    category: 'entradas',
    price: 11.90,
    description: 'Caldinho de feijão com couve crispy e farofa de bacon (ovo, torresmo e azeitona).'
  },
  {
    id: 'ent-2',
    name: 'Bolinho de Cupim',
    category: 'entradas',
    price: 39.90,
    description: 'Bolinho de cupim com geléia de pimenta e vinagrete de pimentões.'
  },
  {
    id: 'ent-3',
    name: 'Caldinho de Camarão',
    category: 'entradas',
    price: 12.90,
    description: 'Caldinho de camarão servido com crispy de batata doce e camarão crocante (ovo, torresmo e azeitona).'
  },
  {
    id: 'ent-4',
    name: 'Carpaccio',
    category: 'entradas',
    price: 54.90,
    description: 'Carpaccio servido com torradas da casa (lâminas de carne com mostarda escura, queijo parmesão, azeite, pimenta do reino e alcaparras).'
  },
  {
    id: 'ent-5',
    name: 'Sonho Salgado',
    category: 'entradas',
    price: 34.90,
    description: 'Sonho salgado com recheio de tartar de mignon finalizado com maionese de picles com toque de páprica e nuvem de queijo grana padano.'
  },
  {
    id: 'ent-6',
    name: 'Cracker com Ceviche',
    category: 'entradas',
    price: 59.90,
    description: 'Cracker com ceviche de peixe branco finalizado com cebola crispy, chutney de manga e azeite de limão.'
  },
  {
    id: 'ent-7',
    name: 'Vinagrete de Polvo',
    category: 'entradas',
    price: 59.90,
    description: 'Vinagrete de polvo com camarões e pimentões assados servido com cracker de milho.'
  },
  {
    id: 'ent-8',
    name: 'Brusquetta',
    category: 'entradas',
    price: 39.90,
    description: 'Bruschetta de pasta de tomate com mousse de ricota finalizado com molho pesto de manjericão.'
  },
  {
    id: 'ent-9',
    name: 'Camarão Crocante',
    category: 'entradas',
    price: 59.90,
    description: 'Camarão crocante servido com teriyaki de abacaxi e maionese de queijo provolone.'
  },
  {
    id: 'ent-10',
    name: 'Fritas da Casa',
    category: 'entradas',
    price: 19.90,
    description: 'Fritas da Casa.'
  },

  // --- RISOTOS ---
  {
    id: 'ris-1',
    name: 'Risoto de Parmesão',
    category: 'risotos',
    price: 64.90,
    description: 'Risoto de Parmesão e parma servido com medalhão de filé mignon no molho de mostarda l’ancienne.'
  },
  {
    id: 'ris-2',
    name: 'Risoto de Gorgonzola',
    category: 'risotos',
    price: 69.90,
    description: 'Risoto de gorgonzola com tomate seco, filete de mignon ao molho de vinho e crocante de batata doce.'
  },
  {
    id: 'ris-3',
    name: 'Risoto de Camarão',
    category: 'risotos',
    price: 64.90,
    description: 'Risoto de camarão com camarões selados na pasta de tomate flambados na vodka finalizado com aioli de coentro e farofa crocante de alho.'
  },
  {
    id: 'ris-4',
    name: 'Risoto de Açafrão',
    category: 'risotos',
    price: 59.90,
    description: 'Risoto de açafrão com filé de salmão na crosta de gergelim com manteiga de missô.'
  },
  {
    id: 'ris-5',
    name: 'Risoto Limão Siciliano',
    category: 'risotos',
    price: 59.90,
    description: 'Risoto de limão siciliano com filete de filé na manteiga com crocante de batata doce.'
  },
  {
    id: 'ris-6',
    name: 'Risoto de Arroz Negro',
    category: 'risotos',
    price: 79.90,
    description: 'Risoto de arroz negro com caldo de camarões, polvo glaceado finalizado com azeite de salsa, aioli defumado e rúcula tostada.'
  },

  // --- MASSAS ---
  {
    id: 'mas-1',
    name: 'Fettuccine Alfredo',
    category: 'massas',
    price: 59.90,
    description: 'Fettuccine Alfredo com medalhão de filé ao molho de mostarda escura finalizado com farofa de castanhas na manteiga.'
  },
  {
    id: 'mas-2',
    name: 'Mousseline',
    category: 'massas',
    price: 74.90,
    description: 'Mousseline de jerimum na manteiga de alho confitado servido com ribs de mignon na espuma de queijo parmesão finalizado com redução de melado e chips de macaxeira.'
  },
  {
    id: 'mas-3',
    name: 'Fettuccine de Cogumelo',
    category: 'massas',
    price: 69.90,
    description: 'Fettuccine ao molho de cogumelos com filetes de mignon finalizado com lascas de parmesão e tomates assados.'
  },
  {
    id: 'mas-4',
    name: 'Fettuccine ao Pesto',
    category: 'massas',
    price: 59.90,
    description: 'Fettuccine ao molho pesto de manjericão com filé na fonduta de parmesão e pasta de tomate.'
  },
  {
    id: 'mas-5',
    name: 'Carbonara de Camarão',
    category: 'massas',
    price: 64.90,
    description: 'Espaguete fresco artesanal com grana padano servido com camarão levemente empanado ao ponzu e furikake finalizado com farofa crocante de castanha brejeira e parmesão ralado.'
  },
  {
    id: 'mas-6',
    name: 'Tagliatelle',
    category: 'massas',
    price: 61.90,
    description: 'Tagliatelle ao molho de gorgonzola com medalhão de filé ao molho de vinho acompanhado de batatas rústicas temperadas.'
  },

  // --- PARMEGIANAS ---
  {
    id: 'par-1',
    name: 'Parmegiana Frango',
    category: 'parmegiana',
    price: 39.90,
    description: 'Parmegiana individual de frango. Arroz ou macarrão, acompanha batata frita.'
  },
  {
    id: 'par-2',
    name: 'Parmegiana Filé',
    category: 'parmegiana',
    price: 44.90,
    description: 'Parmegiana individual de filé, arroz ou macarrão, e acompanha batata frita.'
  },
  {
    id: 'par-3',
    name: 'Parmegiana de Carne com Espaguete e Fritas',
    category: 'parmegiana',
    price: 95.00,
    description: 'Prato compartilhado.'
  },
  {
    id: 'par-4',
    name: 'Parmegiana de Frango com Espaguete e Fritas',
    category: 'parmegiana',
    price: 89.90,
    description: 'Prato compartilhado.'
  },

  // --- SALADAS ---
  {
    id: 'sal-1',
    name: 'Salada de Filé Mignon',
    category: 'saladas',
    price: 45.90,
    description: 'Tiras de flat mignon, mix de folhas, tomate cereja, picles de cebola roxa, picles de rabanete, cenoura ralada, azeitonas roxas, croutons, queijo parmesão ralado e molho do chef.'
  },
  {
    id: 'sal-2',
    name: 'Salada de Camarão',
    category: 'saladas',
    price: 44.90,
    description: 'Camarões selados na manteiga de limão siciliano, mix de folhas, tomate cereja, croutons, castanha de caju, queijo em cubos e molho cítrico.'
  },

  // --- SOBREMESAS ---
  {
    id: 'sob-1',
    name: 'Queijadinha',
    category: 'sobremesas',
    price: 29.90,
    description: 'Com calda de goiabada e crumble de bolo de rolo.'
  },
  {
    id: 'sob-2',
    name: 'Canolli Italiano',
    category: 'sobremesas',
    price: 19.90,
    description: 'Com limão siciliano e mousse de chocolate 70%.'
  },
  {
    id: 'sob-3',
    name: 'Torta Basca',
    category: 'sobremesas',
    price: 26.90,
    description: 'De doce de leite com caramelo salgado e crocante de nozes com sorvete de leite defumado.'
  },
  {
    id: 'sob-4',
    name: 'Cocada de Forno',
    category: 'sobremesas',
    price: 22.90,
    description: 'Brulée com sorvete de leite.'
  },

  // --- ALMOÇO ---
  {
    id: 'alm-1',
    name: 'Filé de Peito',
    category: 'almoco',
    price: 39.90,
    description: 'Ao molho de ervas com arroz de castanhas e purê de batata doce gratinado. Acompanha salada simples.'
  },
  {
    id: 'alm-2',
    name: 'Escalopes de Filé',
    category: 'almoco',
    price: 44.90,
    description: 'Ao molho de queijos servido com arroz, farofa crocante. Acompanha vinagrete.'
  },
  {
    id: 'alm-3',
    name: 'Salmão ao Molho',
    category: 'almoco',
    price: 49.90,
    description: 'Agridoce com arroz frito, purê de batata doce e salada de legumes no azeite de alho.'
  },
  {
    id: 'alm-4',
    name: 'Bife de Mignon',
    category: 'almoco',
    price: 45.90,
    description: 'À molho com arroz piamontese e batatas rústicas.'
  },
  {
    id: 'alm-5',
    name: 'Espaguete à Bolonhesa',
    category: 'almoco',
    price: 39.90,
    description: 'Acompanha fritas.'
  },

  // --- KIDS ---
  {
    id: 'kid-1',
    name: 'Bife Frango ou Carne Kids',
    category: 'kids',
    price: 29.90,
    description: 'Bife de frango ou carne, arroz branco ou espaguete ao molho de tomate com fritas smile.'
  }
];

export const WINE_ITEMS: WineItem[] = [
  // --- CHILENOS ---
  {
    id: 'wn-chi-1',
    name: 'Chileno Branco Moscato',
    category: 'chilenos',
    country: 'Chile',
    flag: '🇨🇱',
    price: 62.90,
    image: 'https://images.unsplash.com/photo-1553156961-d779532506e7?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'wn-chi-2',
    name: 'Gato Negro Sweet Red',
    category: 'chilenos',
    country: 'Chile',
    flag: '🇨🇱',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'wn-chi-3',
    name: 'Chileno Sauvignon Blanc',
    category: 'chilenos',
    country: 'Chile',
    flag: '🇨🇱',
    price: 62.90,
    image: 'https://images.unsplash.com/photo-1569919650476-f54df555b9d6?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'wn-chi-4',
    name: 'Vinho Barrica Andina Syrah Tinto',
    category: 'chilenos',
    country: 'Chile',
    flag: '🇨🇱',
    price: 109.90,
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=600'
  },

  // --- PORTUGUESES ---
  {
    id: 'wn-por-1',
    name: 'Cabriz Colheita Branco',
    category: 'portugueses',
    country: 'Portugal',
    flag: '🇵🇹',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1584916283318-739e443b01cd?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'wn-por-2',
    name: 'Cabriz Colheita Tinto',
    category: 'portugueses',
    country: 'Portugal',
    flag: '🇵🇹',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'wn-por-3',
    name: 'Rapariga da Quinta (Colheita Selecionada)',
    category: 'portugueses',
    country: 'Portugal',
    flag: '🇵🇹',
    price: 169.90,
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'wn-por-4',
    name: 'Bons Ventos',
    category: 'portugueses',
    country: 'Portugal',
    flag: '🇵🇹',
    price: 84.90,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'wn-por-5',
    name: 'Casal Garcia Branco Sweet',
    category: 'portugueses',
    country: 'Portugal',
    flag: '🇵🇹',
    price: 109.90,
    image: 'https://images.unsplash.com/photo-1553156961-d779532506e7?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'wn-por-6',
    name: 'EA Cartuxa Tinto Red',
    category: 'portugueses',
    country: 'Portugal',
    flag: '🇵🇹',
    price: 119.90,
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'wn-por-7',
    name: 'Cartuxa Evora',
    category: 'portugueses',
    country: 'Portugal',
    flag: '🇵🇹',
    price: 399.90,
    image: 'https://images.unsplash.com/photo-1584916283318-739e443b01cd?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'wn-por-8',
    name: 'Soldado Tinto',
    category: 'portugueses',
    country: 'Portugal',
    flag: '🇵🇹',
    price: 69.90,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600'
  },

  // --- ARGENTINOS ---
  {
    id: 'wn-arg-1',
    name: 'Chac Chac Cabernet Franc',
    category: 'argentinos',
    country: 'Argentina',
    flag: '🇦🇷',
    price: 82.90,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'wn-arg-2',
    name: 'Chac Chac Malbec',
    category: 'argentinos',
    country: 'Argentina',
    flag: '🇦🇷',
    price: 82.90,
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'wn-arg-3',
    name: 'Chac Chac Sauvignon Blanc',
    category: 'argentinos',
    country: 'Argentina',
    flag: '🇦🇷',
    price: 82.90,
    image: 'https://images.unsplash.com/photo-1553156961-d779532506e7?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'wn-arg-4',
    name: 'Minimalista Pinot Grigio Branco',
    category: 'argentinos',
    country: 'Argentina',
    flag: '🇦🇷',
    price: 69.90,
    image: 'https://images.unsplash.com/photo-1569919650476-f54df555b9d6?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'wn-arg-5',
    name: 'Trapiche Vineyards Malbec',
    category: 'argentinos',
    country: 'Argentina',
    flag: '🇦🇷',
    price: 69.90,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600'
  },

  // --- ESPANHOIS ---
  {
    id: 'wn-esp-1',
    name: 'Pata Negra Oro Tempranillo',
    category: 'espanhois',
    country: 'Espanha',
    flag: '🇪🇸',
    price: 119.90,
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'wn-esp-2',
    name: 'Freixenet Moscato',
    category: 'espanhois',
    country: 'Espanha',
    flag: '🇪🇸',
    price: 149.90,
    image: 'https://images.unsplash.com/photo-1594498653385-d5172b53effc?auto=format&fit=crop&q=80&w=600'
  },

  // --- ESPUMANTES ---
  {
    id: 'wn-esp-br-1',
    name: 'Rio Sol Branco Moscatel',
    category: 'espumantes',
    country: 'Espumantes',
    flag: '🥂',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1594498653385-d5172b53effc?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'wn-esp-br-2',
    name: 'Casa Perini Aquarela',
    category: 'espumantes',
    country: 'Espumantes',
    flag: '🥂',
    price: 109.90,
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=600'
  },

  // --- TAÇA ---
  {
    id: 'wn-tac-1',
    name: 'Taça de Vinho Tinto ou Branco Individual',
    category: 'taca',
    country: 'Individual',
    flag: '🍷',
    price: 23.90,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600'
  }
];

export interface DrinkItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'classicos' | 'caipiroscas' | 'cervejas_licores';
}

export const DRINK_ITEMS: DrinkItem[] = [
  {
    id: 'drk-1',
    name: 'Negroni Clássico',
    price: 29.90,
    description: 'Gin, vermute rosso e campari, finalizado com twist de laranja. Amargo, equilibrado e extremamente elegante.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600',
    category: 'classicos'
  },
  {
    id: 'drk-2',
    name: 'Aperol Spritz',
    price: 33.90,
    description: 'Aperol, espumante brut, água com gás e fatia de laranja. Refrescante, leve e com toque cítrico sofisticado.',
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&q=80&w=600',
    category: 'classicos'
  },
  {
    id: 'drk-3',
    name: 'Moscow Mule',
    price: 24.90,
    description: 'Vodka, suco de limão, espuma de gengibre e hortelã. Servido na caneca de cobre, é aromático e envolvendo.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
    category: 'classicos'
  },
  {
    id: 'drk-4',
    name: 'Dry Martini',
    price: 36.90,
    description: 'Gin premium, vermute seco e azeitona verde. O clássico da coquetelaria mundial, forte e marcante.',
    image: 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&q=80&w=600',
    category: 'classicos'
  },
  {
    id: 'drk-5',
    name: 'Piña Colada',
    price: 34.90,
    description: 'Rum envelhecido, creme de coco, suco de abacaxi fresco e raspas de noz-moscada. Cremoso, tropical e sofisticado.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
    category: 'classicos'
  },
  {
    id: 'drk-6',
    name: 'Gin Tônica',
    price: 29.90,
    description: 'Gin, água tônica, rodelas de limão, alecrim e especiarias. Refrescante, adocicado e leve.',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&q=80&w=600',
    category: 'classicos'
  },
  {
    id: 'drk-7',
    name: 'Violeta Hour Sour',
    price: 29.90,
    description: 'Vermute branco, xarope de violeta, suco de limão siciliano e hibisco. Cremoso, cítrico, perfumado e sofisticado.',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=600',
    category: 'classicos'
  },

  // --- CAIPIROSCAS ---
  {
    id: 'drk-caip-1',
    name: 'Caipirosca Importada',
    price: 29.90,
    description: 'Elaborada com vodka importada premium. Escolha o sabor: Morango, Maracujá ou Limão.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
    category: 'caipiroscas'
  },
  {
    id: 'drk-caip-2',
    name: 'Caipirosca Nacional',
    price: 19.90,
    description: 'Elaborada com vodka nacional selecionada. Escolha o sabor: Morango, Maracujá ou Limão.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
    category: 'caipiroscas'
  },
  {
    id: 'drk-caip-3',
    name: 'Café Expresso',
    price: 7.90,
    description: 'Café expresso encorpado tirado na hora para harmonizar com sua sobremesa ou drink.',
    image: 'https://images.unsplash.com/photo-1510972527409-cac5c441506a?auto=format&fit=crop&q=80&w=600',
    category: 'caipiroscas'
  },

  // --- CERVEJAS & LICORES ---
  {
    id: 'drk-lc-1',
    name: 'Peachtree',
    price: 39.90,
    description: 'Delicioso licor de pêssego com notas aromáticas leves, frutado e extremamente suave.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600',
    category: 'cervejas_licores'
  },
  {
    id: 'drk-lc-2',
    name: 'Licor 43',
    price: 34.90,
    description: 'Tradicional licor espanhol de receita secreta com baunilha e notas cítricas adocicadas.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600',
    category: 'cervejas_licores'
  },
  {
    id: 'drk-lc-3',
    name: 'Stella Artois',
    price: 12.90,
    description: 'Cerveja long neck lager premium belga com excelente amargor e toque refrescante.',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&q=80&w=600',
    category: 'cervejas_licores'
  },
  {
    id: 'drk-lc-4',
    name: 'Budweiser',
    price: 12.90,
    description: 'Cerveja long neck lager american leve, refrescante com sabor clássico equilibrado.',
    image: 'https://images.unsplash.com/photo-1623934524057-b0a70146c82c?auto=format&fit=crop&q=80&w=600',
    category: 'cervejas_licores'
  },
  {
    id: 'drk-lc-5',
    name: 'Heineken',
    price: 14.90,
    description: 'Cerveja long neck lager holandesa de puro malte com lúpulos nobres e sabor inconfundível.',
    image: 'https://images.unsplash.com/photo-1600718374662-0483d2b9da44?auto=format&fit=crop&q=80&w=600',
    category: 'cervejas_licores'
  },
  {
    id: 'drk-lc-6',
    name: 'Heineken Zero',
    price: 15.90,
    description: 'Excelente versão sem álcool de puro malte com a mesma refrescância de lúpulo tradicional.',
    image: 'https://images.unsplash.com/photo-1600718374662-0483d2b9da44?auto=format&fit=crop&q=80&w=600',
    category: 'cervejas_licores'
  }
];
