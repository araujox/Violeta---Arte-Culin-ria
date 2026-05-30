import { MenuItem, Testimonial, Table } from './types';

import heroImg from './assets/images/viva_veneto_hero_1779295871073.png';
import risottoImg from './assets/images/viva_veneto_risotto_1779295890719.png';
import wineImg from './assets/images/viva_veneto_wine_1779295907745.png';
import dessertImg from './assets/images/viva_veneto_dessert_1779295926956.png';

export const HERO_IMG = '/cardapio/banner violeta.png';
export const RISOTTO_IMG = risottoImg;
export const WINE_IMG = wineImg;
export const DESSERT_IMG = dessertImg;

export const VIOLETA_MENU: MenuItem[] = [
  // --- ENTRADAS ---
  {
    id: 'ent-1',
    name: 'Caldinho de Feijão Preto',
    category: 'entradas',
    price: 11.90,
    description: 'Caldinho de feijão com couve crispy e farofa de bacon (ovo, torresmo e azeitona).',
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=400',
    pairing: 'Cerveja Budweiser',
    anecdote: 'Um clássico reconfortante caprichado para abrir o apetite em noites frias.'
  },
  {
    id: 'ent-2',
    name: 'Bolinho de Cupim',
    category: 'entradas',
    price: 39.90,
    description: 'Bolinho de cupim com geléia de pimenta e vinagrete de pimentões.',
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=400',
    pairing: 'Vinho Tinto Bons Ventos ou Cerveja Stella Artois',
    anecdote: 'Recheio extremamente macio de cupim desfiado lentamente por 12 horas, contrastando com a geléia picante adocicada.'
  },
  {
    id: 'ent-3',
    name: 'Caldinho de Camarão',
    category: 'entradas',
    price: 12.90,
    description: 'Caldinho de camarão servido com crispy de batata doce e camarão crocante (ovo, torresmo e azeitona).',
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=400',
    pairing: 'Vinho Branco Moscato',
    anecdote: 'Receita cremosa com o toque marinho adocicado e a crocância sequinha da batata doce.'
  },
  {
    id: 'ent-4',
    name: 'Carpaccio',
    category: 'entradas',
    price: 54.90,
    description: 'Carpaccio servido com torradas da casa (lâminas de carne com mostarda escura, queijo parmesão, azeite, pimenta do reino e alcaparras).',
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=400',
    pairing: 'Vinho Tinto Cabernet Franc',
    anecdote: 'Lâminas ultrafinas de carne temperadas com precisão para uma explosão de sabor umami e acidez.'
  },
  {
    id: 'ent-5',
    name: 'Sonho Salgado',
    category: 'entradas',
    price: 34.90,
    description: 'Sonho salgado com recheio de tartar de mignon finalizado com maionese de picles com toque de páprica e nuvem de queijo grana padano.',
    image: '/cardapio/sonho salgado.jpeg',
    pairing: 'Aperol Spritz ou Negroni',
    anecdote: 'Criação exclusiva do chef: uma massa leve e adocicada que abriga o tartar de mignon fresco e temperado.'
  },
  {
    id: 'ent-6',
    name: 'Cracker com Ceviche',
    category: 'entradas',
    price: 59.90,
    description: 'Cracker com ceviche de peixe branco finalizado com cebola crispy, chutney de manga e azeite de limão.',
    image: '/cardapio/cracker de ceviche.jpeg',
    pairing: 'Vinho Sauvignon Blanc',
    anecdote: 'Crocância estaladiça do cracker harmonizando brilhantemente com o cítrico vibrante do peixe marinado.'
  },
  {
    id: 'ent-7',
    name: 'Vinagrete de Polvo',
    category: 'entradas',
    price: 59.90,
    description: 'Vinagrete de polvo com camarões e pimentões assados servido com cracker de milho.',
    image: '/cardapio/vinagrete de polvo.jpeg',
    pairing: 'Espumante Brut',
    anecdote: 'Fresco e herbáceo: os tentáculos de polvo cozidos no ponto correto unidos a camarões nobres e tomates marinados.'
  },
  {
    id: 'ent-8',
    name: 'Brusquetta',
    category: 'entradas',
    price: 39.90,
    description: 'Bruschetta de pasta de tomate com mousse de ricota finalizado com molho pesto de manjericão.',
    image: '/cardapio/brusqueta.jpeg',
    pairing: 'Vinho Tinto Leve ou Aperol Spritz',
    anecdote: 'Um clássico italiano revisitado no Violeta com a leveza inédita de nossa mousse de ricota artesanal.'
  },
  {
    id: 'ent-9',
    name: 'Camarão Crocante',
    category: 'entradas',
    price: 59.90,
    description: 'Camarão crocante servido com teriyaki de abacaxi e maionese de queijo provolone.',
    image: '/cardapio/camarão crocante.jpeg',
    pairing: 'Vinho Branco Sauvignon Blanc',
    anecdote: 'A união majestosa de camarões empanados com o teriyaki doce de abacaxi e o defumado do provolone.'
  },
  {
    id: 'ent-10',
    name: 'Fritas da Casa',
    category: 'entradas',
    price: 19.90,
    description: 'Fritas da Casa douradas e crocantes, levemente salpicadas com tomilho e flor de sal.',
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=400',
    pairing: 'Cerveja Stella Artois',
    anecdote: 'Simples, perfeita e de textura sequinha indispensável para beliscar.'
  },

  // --- RISOTOS ---
  {
    id: 'ris-1',
    name: 'Risoto de Parmesão',
    category: 'risotos',
    price: 64.90,
    description: 'Risoto de Parmesão e parma servido com medalhão de filé mignon no molho de mostarda l’ancienne.',
    image: '/cardapio/risoto de parmesão.jpeg',
    pairing: 'Vinho Tinto Malbec',
    anecdote: 'O salgado elegante do presunto de Parma unindo-se à cremosidade rica de Grana Padano.'
  },
  {
    id: 'ris-2',
    name: 'Risoto de Gorgonzola',
    category: 'risotos',
    price: 69.90,
    description: 'Risoto de gorgonzola com tomate seco, filete de mignon ao molho de vinho e crocante de batata doce.',
    image: '/cardapio/risoto gorgonzola.jpeg',
    pairing: 'Vinho Tinto Tempranillo',
    anecdote: 'O queijo azul italiano marcante equilibrado com o adocicado rico do molho de redução de Malbec.'
  },
  {
    id: 'ris-3',
    name: 'Risoto de Camarão',
    category: 'risotos',
    price: 64.90,
    description: 'Risoto de camarão com camarões selados na pasta de tomate flambados na vodka finalizado com aioli de coentro e farofa crocante de alho.',
    image: '/cardapio/risoto de camarão.jpeg',
    pairing: 'Vinho Branco Chardonnay',
    anecdote: 'Uma textura incrivelmente cremosa, com notas de alho dourado e camarões perfeitamente grelhados.'
  },
  {
    id: 'ris-4',
    name: 'Risoto de Açafrão',
    category: 'risotos',
    price: 59.90,
    description: 'Risoto de açafrão com filé de salmão na crosta de gergelim com manteiga de missô.',
    image: '/cardapio/risoto alcafrão.jpeg',
    pairing: 'Vinho Sauvignon Blanc',
    anecdote: 'O aroma floral-terroso do açafrão realçado pela untuosidade do salmão rústico sutilmente caramelizado.'
  },
  {
    id: 'ris-5',
    name: 'Risoto Limão Siciliano',
    category: 'risotos',
    price: 59.90,
    description: 'Risoto de limão siciliano com filete de filé na manteiga com crocante de batata doce.',
    image: '/cardapio/risoto de limão siciliano.jpeg',
    pairing: 'Vinho Pinot Grigio',
    anecdote: 'O frescor cítrico irresistível do limão siciliano que corta perfeitamente a riqueza da manteiga.'
  },
  {
    id: 'ris-6',
    name: 'Risoto de Arroz Negro',
    category: 'risotos',
    price: 79.90,
    description: 'Risoto de arroz negro com caldo de camarões, polvo glaceado finalizado com azeite de salsa, aioli defumado e rúcula tostada.',
    image: '/cardapio/polvo ao arroz negro.jpeg',
    pairing: 'Vinho Branco Mineral ou Alvarinho',
    anecdote: 'Combinação exótica de arroz negro rústico, aioli cremoso e polvo perfeitamente macio na grelha.'
  },

  // --- MASSAS ---
  {
    id: 'mas-1',
    name: 'Fettuccine Alfredo',
    category: 'massas',
    price: 59.90,
    description: 'Fettuccine Alfredo com medalhão de filé ao molho de mostarda escura finalizado com farofa de castanhas na manteiga.',
    image: '/cardapio/alfredo.jpeg',
    pairing: 'Vinho Tinto Merlot',
    anecdote: 'Massa fresca artesanal banhada em creme de leite fresco e manteiga trufada.'
  },
  {
    id: 'mas-2',
    name: 'Mousseline',
    category: 'massas',
    price: 74.90,
    description: 'Mousseline de jerimum na manteiga de alho confitado servido com ribs de mignon na espuma de queijo parmesão finalizado com redução de melado e chips de macaxeira.',
    image: '/cardapio/mousseline.jpeg',
    pairing: 'Vinho Português encorpado',
    anecdote: 'Nosso prato premiado: o adocicado sutil do jerimum regional contrasta de forma esplêndida com filés grelhados.'
  },
  {
    id: 'mas-3',
    name: 'Fettuccine de Cogumelo',
    category: 'massas',
    price: 69.90,
    description: 'Fettuccine ao molho de cogumelos com filetes de mignon finalizado com lascas de parmesão e tomates assados.',
    image: '/cardapio/Fetuccine Cogumelo.jpeg',
    pairing: 'Vinho Pinot Noir',
    anecdote: 'Sabor da terra pronunciado pelos cogumelos Paris flambados com ervas frescas.'
  },
  {
    id: 'mas-4',
    name: 'Fettuccine ao Pesto',
    category: 'massas',
    price: 59.90,
    description: 'Fettuccine ao molho pesto de manjericão com filé na fonduta de parmesão e pasta de tomate.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=400',
    pairing: 'Vinho Pinot Grigio',
    anecdote: 'Vibrante pesto verde de manjericão e pinoli combinado com a cremosidade do parmesão fundido.'
  },
  {
    id: 'mas-5',
    name: 'Carbonara de Camarão',
    category: 'massas',
    price: 64.90,
    description: 'Espaguete fresco artesanal com grana padano servido com camarão levemente empanado ao ponzu e furikake finalizado com farofa crocante de castanha brejeira e parmesão ralado.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=400',
    pairing: 'Vinho Branco Chardonnay',
    anecdote: 'Revisitação oriental-ocidental incrível que confere notas nítidas de mar ao clássico molho romano cremado.'
  },
  {
    id: 'mas-6',
    name: 'Tagliatelle',
    category: 'massas',
    price: 61.90,
    description: 'Tagliatelle ao molho de gorgonzola com medalhão de filé ao molho de vinho acompanhado de batatas rústicas temperadas.',
    image: '/cardapio/tagliate.jpeg',
    pairing: 'Vinho Cabernet Franc',
    anecdote: 'O clássico romano com molho de queijos robustos e tenro medalhão caramelizado.'
  },

  // --- PARMEGIANAS ---
  {
    id: 'par-1',
    name: 'Parmegiana Frango',
    category: 'parmegiana',
    price: 39.90,
    description: 'Parmegiana individual de frango. Arroz ou macarrão, acompanha batata frita.',
    image: '/cardapio/parmegiana.jpeg',
    pairing: 'Vinho Branco Sauvignon Blanc',
    anecdote: 'Empanado super sequinho sob molho pomodoro rústico fresco e muito queijo gratinado.'
  },
  {
    id: 'par-2',
    name: 'Parmegiana Filé',
    category: 'parmegiana',
    price: 44.90,
    description: 'Parmegiana individual de filé, arroz ou macarrão, e acompanha batata frita.',
    image: '/cardapio/parmegiana.jpeg',
    pairing: 'Vinho Tinto Bons Ventos',
    anecdote: 'Cortes selecionados de filé mignon amaciados artesanalmente com pomodoro exclusivo.'
  },
  {
    id: 'par-3',
    name: 'Parmegiana de Carne para Compartilhar',
    category: 'parmegiana',
    price: 95.00,
    description: 'Prato compartilhado. Serve generosamente duas a três pessoas, acompanhada de excelente espaguete ao pomodoro e fritas.',
    image: '/cardapio/parmegiana.jpeg',
    pairing: 'Vinho Tinto Cartuxa Évora',
    anecdote: 'A receita mais elogiada para almoços festivos ou jantares compartilhados na casa.'
  },
  {
    id: 'par-4',
    name: 'Parmegiana de Frango para Compartilhar',
    category: 'parmegiana',
    price: 89.90,
    description: 'Prato compartilhado de peito frango empanado, gratinado com muçarela e molho artesanal de tomates. Acompanha fritas.',
    image: '/cardapio/parmegiana.jpeg',
    pairing: 'Vinho Tinto Cabriz Colheita',
    anecdote: 'Grande sucesso em família, cozido com tomates frescos madurados lentamente.'
  },

  // --- SALADAS ---
  {
    id: 'sal-1',
    name: 'Salada de Filé Mignon',
    category: 'saladas',
    price: 45.90,
    description: 'Tiras de flat mignon, mix de folhas, tomate cereja, picles de cebola roxa, picles de rabanete, cenoura ralada, azeitonas roxas, croutons, queijo parmesão ralado e molho do chef.',
    image: '/cardapio/salada file.jpeg',
    pairing: 'Vinho Tinto Tempranillo',
    anecdote: 'Uma opção leve e completa coroada pelo sabor pronunciado de tiras nobres grelhadas com tempero defumado.'
  },
  {
    id: 'sal-2',
    name: 'Salada de Camarão',
    category: 'saladas',
    price: 44.90,
    description: 'Camarões selados na manteiga de limão siciliano, mix de folhas, tomate cereja, croutons, castanha de caju, queijo em cubos e molho cítrico.',
    image: '/cardapio/salada file.jpeg',
    pairing: 'Vinho Branco Moscato',
    anecdote: 'Folhas extremamente frescas e a nobreza estaladiça das castanhas de caju regionais.'
  },

  // --- SOBREMESAS ---
  {
    id: 'sob-1',
    name: 'Queijadinha',
    category: 'sobremesas',
    price: 29.90,
    description: 'Com calda de goiabada e crumble de bolo de rolo.',
    image: '/cardapio/queijadinha.jpeg',
    pairing: 'Vinho do Porto ou Café Expresso',
    anecdote: 'Doce cremoso de queijo assado que carrega a alma regional de Pernambuco.'
  },
  {
    id: 'sob-2',
    name: 'Canolli Italiano',
    category: 'sobremesas',
    price: 19.90,
    description: 'Com limão siciliano e mousse de chocolate 70%.',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400',
    pairing: 'Café Expresso ou Licor de Avelã',
    anecdote: 'A tradicional massa frita recheada com a dupla espetacular de limão e cacau belga.'
  },
  {
    id: 'sob-3',
    name: 'Torta Basca',
    category: 'sobremesas',
    price: 26.90,
    description: 'De doce de leite com caramelo salgado e crocante de nozes com sorvete de leite defumado.',
    image: '/cardapio/torta basca.jpeg',
    pairing: 'Espumante Moscatel ou Licor Peachtree',
    anecdote: 'Boleada a partir do clássico espanhol e defumada com delicadeza artesanal pela nossa equipe.'
  },
  {
    id: 'sob-4',
    name: 'Cocada de Forno',
    category: 'sobremesas',
    price: 22.90,
    description: 'Brulée com sorvete de leite.',
    image: '/cardapio/cocada.jpeg',
    pairing: 'Vinho do Porto',
    anecdote: 'Casquinha sutilmente maçaricada abrigando um doce fumegante e amanteigado de coco ralado.'
  },

  // --- ALMOÇO ---
  {
    id: 'alm-1',
    name: 'Filé de Peito',
    category: 'almoco',
    price: 39.90,
    description: 'Ao molho de ervas com arroz de castanhas e purê de batata doce gratinado. Acompanha salada simples.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400',
    pairing: 'Vinho Branco Sauvignon Blanc',
    anecdote: 'Incomparável leveza gourmet para recarregar as energias durante o almoço.'
  },
  {
    id: 'alm-2',
    name: 'Escalopes de Filé',
    category: 'almoco',
    price: 44.90,
    description: 'Ao molho de queijos servido com arroz, farofa crocante. Acompanha vinagrete.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400',
    pairing: 'Vinho Tinto Bons Ventos',
    anecdote: 'Cortes tenros sob um denso creme borbulhante de queijos selecionados.'
  },
  {
    id: 'alm-3',
    name: 'Salmão ao Molho',
    category: 'almoco',
    price: 49.90,
    description: 'Agridoce com arroz frito, purê de batata doce e salada de legumes no azeite de alho.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400',
    pairing: 'Vinho Branco Moscatel',
    anecdote: 'Combinação fresca de peixe nobre com legumes aromáticos grelhados.'
  },
  {
    id: 'alm-4',
    name: 'Bife de Mignon',
    category: 'almoco',
    price: 45.90,
    description: 'À molho com arroz piamontese e batatas rústicas.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400',
    pairing: 'Vinho Trapiche Malbec',
    anecdote: 'Sabor de bistrô nobre no tradicional almoço executivo.'
  },
  {
    id: 'alm-5',
    name: 'Espaguete à Bolonhesa',
    category: 'almoco',
    price: 39.90,
    description: 'Espaguete ao molho rústico de tomate e carne moída fresca de filé. Acompanha fritas.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400',
    pairing: 'Vinho Tinto Leve',
    anecdote: 'O sabor caseiro italiano reconfortante com ingredientes selecionados.'
  },

  // --- KIDS ---
  {
    id: 'kid-1',
    name: 'Bife Frango ou Carne Kids',
    category: 'kids',
    price: 29.90,
    description: 'Bife de frango ou carne, arroz branco ou espaguete ao molho de tomate com fritas smile.',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3cee50f6?auto=format&fit=crop&q=80&w=400',
    pairing: 'Suco Natural',
    anecdote: 'Preparação suave livre de conservantes, ideal para nutrir os pequenos de forma divertida.'
  },

  // --- DRINKS ---
  {
    id: 'drk-1',
    name: 'Negroni Clássico',
    price: 29.90,
    description: 'Gin, vermute rosso e campari, finalizado com twist de laranja. Amargo, equilibrado e extremamente elegante.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    pairing: 'Bolinho de Cupim ou Carpaccio',
    anecdote: 'O drink clássico mais refinado que aguça o paladar com suas ricas notas herbáceas.'
  },
  {
    id: 'drk-2',
    name: 'Aperol Spritz',
    price: 33.90,
    description: 'Aperol, espumante brut, água com gás e fatia de laranja. Refrescante, leve e com toque cítrico sofisticado.',
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    pairing: 'Brusquetas ou Camarão Crocante',
    anecdote: 'A brisa refrescante de um final de tarde na Itália encapsulada em uma taça cintilante.'
  },
  {
    id: 'drk-3',
    name: 'Moscow Mule',
    price: 24.90,
    description: 'Vodka, suco de limão, espuma de gengibre e hortelã. Servido na caneca de cobre, é aromático e envolvente.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    pairing: 'Fritas da Casa',
    anecdote: 'Servido com nossa espuma ultra cremosa e aromática de gengibre artesanal ralado.'
  },
  {
    id: 'drk-4',
    name: 'Dry Martini',
    price: 36.90,
    description: 'Gin premium, vermute seco e azeitona verde. O clássico da coquetelaria mundial, forte e marcante.',
    image: 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    pairing: 'Carpaccio de Mignon',
    anecdote: 'Seco, gelado e imensamente potente para paladares puristas.'
  },
  {
    id: 'drk-5',
    name: 'Piña Colada',
    price: 34.90,
    description: 'Rum envelhecido, creme de coco, suco de abacaxi fresco e raspas de noz-moscada. Cremoso, tropical e sofisticado.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    pairing: 'Camarão Crocante',
    anecdote: 'Doçura aveludada unindo coco fresco colhido de praias equatoriais e rum premium.'
  },
  {
    id: 'drk-6',
    name: 'Gin Tônica',
    price: 29.90,
    description: 'Gin, água tônica, rodelas de limão, alecrim e especiarias. Refrescante, adocicado e leve.',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    pairing: 'Bolinho de Cupim',
    anecdote: 'Preparação aromática com fatias desidratadas de citrinos e raminho de alecrim silvestre.'
  },
  {
    id: 'drk-7',
    name: 'Violeta Hour Sour',
    price: 29.90,
    description: 'Vermute branco, xarope de violeta, suco de limão siciliano e hibisco. Cremoso, cítrico, perfumado e sofisticado.',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    pairing: 'Entradas leves de Ricota',
    anecdote: 'Tradução alquímica e elegante de nossa essência floral Violeta encarnada em taça.'
  },
  {
    id: 'drk-caip-1',
    name: 'Caipirosca Importada',
    price: 29.90,
    description: 'Elaborada com vodka importada premium. Escolha o sabor: Morango, Maracujá ou Limão.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    pairing: 'Camarão Crocante',
    anecdote: 'Destilado premium importado que concede textura sedosa única à nossa caipira de frutas silvestres.'
  },
  {
    id: 'drk-caip-2',
    name: 'Caipirosca Nacional',
    price: 19.90,
    description: 'Elaborada com vodka nacional selecionada. Escolha o sabor: Morango, Maracujá ou Limão.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    pairing: 'Brusquetas de Tomate',
    anecdote: 'Simples, ultra gelada e perfeitamente adoçada com frutas frescas frescas da horta.'
  },
  {
    id: 'drk-caip-3',
    name: 'Café Expresso',
    price: 7.90,
    description: 'Café expresso encorpado tirado na hora para harmonizar com sua sobremesa ou drink.',
    image: 'https://images.unsplash.com/photo-1510972527409-cac5c441506a?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    pairing: 'Canolli Italiano',
    anecdote: 'Café torrado rústico de alta altitude colhido em fazendas tradicionais para encerrar com suntuosidade.'
  },
  {
    id: 'drk-lc-1',
    name: 'Peachtree',
    price: 39.90,
    description: 'Delicioso licor de pêssego com notas aromáticas leves, frutado e extremamente suave.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    pairing: 'Torta Basca Cremosa',
    anecdote: 'Sabor de pêssego ensolarado, ótimo para digestivos agradáveis e delicados.'
  },
  {
    id: 'drk-lc-2',
    name: 'Licor 43',
    price: 34.90,
    description: 'Tradicional licor espanhol de receita secreta com baunilha e notas cítricas adocicadas.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    pairing: 'Canolli de Chocolate',
    anecdote: 'Quarenta e três ervas mediterrâneas aromáticas infundidas em sabor lendário e aveludado.'
  },
  {
    id: 'drk-lc-3',
    name: 'Stella Artois',
    price: 12.90,
    description: 'Cerveja long neck lager premium belga com excelente amargor e toque refrescante.',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    pairing: 'Bolinho de Cupim',
    anecdote: 'Lager tradicional de lúpulos nobres servida em temperatura sub-zero.'
  },
  {
    id: 'drk-lc-4',
    name: 'Budweiser',
    price: 12.90,
    description: 'Cerveja long neck lager american leve, refrescante com sabor clássico equilibrado.',
    image: 'https://images.unsplash.com/photo-1623934524057-b0a70146c82c?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    pairing: 'Carpaccio de Mignon',
    anecdote: 'Refrescância perfeita com chips de madeira beechwood de maturação.'
  },
  {
    id: 'drk-lc-5',
    name: 'Heineken',
    price: 14.90,
    description: 'Cerveja long neck lager holandesa de puro malte com lúpulos nobres e sabor inconfundível.',
    image: 'https://images.unsplash.com/photo-1600718374662-0483d2b9da44?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    pairing: 'Fritas da Casa',
    anecdote: 'Lager icônica verde mundial por seu amargor marcante incomparável.'
  },
  {
    id: 'drk-lc-6',
    name: 'Heineken Zero',
    price: 15.90,
    description: 'Excelente versão sem álcool de puro malte com a mesma refrescância de lúpulo tradicional.',
    image: 'https://images.unsplash.com/photo-1600718374662-0483d2b9da44?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    pairing: 'Carpaccio de Mignon',
    anecdote: 'Mesmo aroma nobre com zero de álcool para apreciadores livres.'
  }
];

export const VIOLETA_REVIEWS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Danielle Silva',
    role: 'Cliente no Google Maps',
    text: 'Atendimento excelente, ambiente super aconchegante e reservado, comida de encher os olhos e indescritível no paladar! O risoto de camarão é com certeza um dos melhores que já provei na vida.',
    stars: 5,
    dish: 'Risoto de Camarão ao Limão Siciliano com Ouro 24k'
  },
  {
    id: 'rev-2',
    name: 'José Carlos de Oliveira',
    role: 'Celebrador Especial',
    text: 'Um verdadeiro oásis de arte gastronômica no agreste. Toda a decoração intimista, iluminação suave e os pratos são pensados com muito carinho. O drink Violeta que muda de cor é de outro nível!',
    stars: 5,
    dish: 'Gin Tônica Violeta Imperial'
  },
  {
    id: 'rev-3',
    name: 'Mariana de Souza',
    role: 'Cliente Local',
    text: 'Fizemos a reserva para o nosso aniversário de casamento e foi tudo perfeito! O chef mandou um cumprimento especial e os detalhes rústicos encantam. Local perfeito para datas especiais.',
    stars: 5,
    dish: 'Medalhão ao Roti de Vinho com Aligot'
  }
];

export const ATMOSPHERES_VIOLETA = {
  salone: {
    title: 'Salão Principal Violeta',
    subtitle: 'Intimista & Contemporâneo',
    desc: 'Espaço com iluminação suave por filamentos de carbono e velas, mesas de madeira rústica e paredes com obras de arte contemporâneas e vegetação sutil de flores violetas.',
    tables: [
      { id: 1, seats: 2, desc: 'Mesa Bistrô Amante - Próxima à Adega Climatizada e Velas', location: 'Salão Central' },
      { id: 2, seats: 2, desc: 'Mesa do Canto Reservado - Perto da adega suspensa', location: 'Aparelho Lateral' },
      { id: 3, seats: 4, desc: 'Sofá Estofado Conforto - Sob o espelho bronze clássico', location: 'Varanda Interna' },
      { id: 4, seats: 4, desc: 'Mesa Redonda das Artes - Vista completa da cozinha aberta', location: 'Salão Central' },
      { id: 5, seats: 6, desc: 'Mesa Imperial da Família - Com cadeiras de veludo', location: 'Fundo Nobre' }
    ]
  }
};
