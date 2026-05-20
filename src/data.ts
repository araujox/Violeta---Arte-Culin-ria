import { MenuItem, Testimonial, Table } from './types';

import heroImg from './assets/images/viva_veneto_hero_1779295871073.png';
import risottoImg from './assets/images/viva_veneto_risotto_1779295890719.png';
import wineImg from './assets/images/viva_veneto_wine_1779295907745.png';
import dessertImg from './assets/images/viva_veneto_dessert_1779295926956.png';

export const HERO_IMG = heroImg;
export const RISOTTO_IMG = risottoImg;
export const WINE_IMG = wineImg;
export const DESSERT_IMG = dessertImg;

export const VIOLETA_MENU: MenuItem[] = [
  {
    id: 'menu-1',
    name: 'Burrata ao Pesto de Pistache e Flores',
    category: 'entradas',
    price: 68,
    description: 'Burrata cremosa de búfala fresca sobre cama de tomates-cereja confitados lentamente no azeite de ervas, pesto rústico de pistache cru e folhas selecionadas de rúcula com pétalas de violetas comestíveis.',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600',
    pairing: 'Chardonnay Mineral ou Drink Autoral de Gin Violeta',
    anecdote: 'Um prelúdio refrescante que celebra o nome de nossa casa, combinando a cremosidade do leite de búfala e a textura crocante do pistache tostado.'
  },
  {
    id: 'menu-2',
    name: 'Carpaccio Trufado da Terra',
    category: 'entradas',
    price: 74,
    description: 'Fatias ultrafinas de filé de sol angus curtido na própria cozinha, regadas com azeite de trufas negras, brotos de mini-rúcula orgânica, queijo coalho artesanal ralado e lascassuperfinas de rabanete.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    pairing: 'Vinho Tinto Cabernet Sauvignon de Guarda',
    anecdote: 'Trazendo a sofisticação italiana para as origens nordestinas, com a cura sutil da carne de sol e o calor terroso das trufas.'
  },
  {
    id: 'menu-3',
    name: 'Risoto de Camarão ao Limão Siciliano com Ouro 24k',
    category: 'principais',
    price: 98,
    description: 'Arroz arbóreo importado emulsificado com queijo mascarpone, glacê cítrico de limão siciliano, generosos camarões grelhados na manteiga clarificada e decorado com uma folha inteira de ouro comestível 24k.',
    image: RISOTTO_IMG,
    pairing: 'Vinho Branco Sauvignon Blanc ou Soave Classico',
    anecdote: 'O prato de maior contraste poético do Violeta: o sabor marcante e nobre dos camarões agraciado pelo brilho dourado e místico da realeza veneziana.'
  },
  {
    id: 'menu-4',
    name: 'Medalhão ao Roti de Vinho Cabernet com Aligot',
    category: 'principais',
    price: 115,
    description: 'Corte alto de filé mignon selado em crosta rústica de ervas, regado ao demi-glace de vinho cabernet sauvignon apurado por 24 horas, servido com aligot ultra-cremoso de purê e queijo gruyère.',
    image: WINE_IMG,
    pairing: 'Vinho Tinto Encorpado Syrah ou Amarone',
    anecdote: 'Uma dança perfeita de texturas: o filé vermelho suculento se desfaz na colher combinada à elasticidade do clássico aligot francês refinado.'
  },
  {
    id: 'menu-5',
    name: 'Nhoque Rústico ao Ragù de Costela',
    category: 'principais',
    price: 88,
    description: 'Massas de nhoque artesanal de batata-doce roxa douradas na manteiga de garrafa, banhadas em ragù de costela bovina desfiada e cozida lentamente em infusão de especiarias e manjericão fresco.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600',
    pairing: 'Vinho Carmenere ou Malbec Envelhecido',
    anecdote: 'Simboliza a união das colinas do Vêneto com a riqueza do sertão, apresentando a cor púrpura vibrante oriunda da batata-doce.'
  },
  {
    id: 'menu-6',
    name: 'Gin Tônica Violeta Imperial',
    category: 'drinks',
    price: 42,
    description: 'Infusão especial de Dry Gin com pétalas de Clitória Ternatea, conferindo uma tonalidade azul natural que se transforma em roxo real ao ser misturada com limão espremido e tônica premium.',
    image: 'https://images.unsplash.com/photo-1524361115871-2ff7000cd18e?auto=format&fit=crop&q=80&w=600',
    pairing: 'Burrata ao Pesto ou Tábua de Queijos Finos',
    anecdote: 'Uma experiência alquímica na mesa do cliente, onde a química natural e os tons do restaurante se materializam sob os olhos.'
  },
  {
    id: 'menu-7',
    name: 'Tiramisù Contemporâneo de Capuccino',
    category: 'sobremesas',
    price: 36,
    description: 'Nossa releitura do tradicional doce vêneto: biscoito biscuit embebido em calda densa de espresso e licor Amaretto, sob creme aveludado de mascarpone e poeira fina de cacau 100% belga com telha crocante dourada.',
    image: DESSERT_IMG,
    pairing: 'Licor Frangelico ou Espumante Moscatel',
    anecdote: 'Nascido originalmente no norte de Itália, trazemos o aconchego do café coado fundido com o luxo da apresentação desconstruída.'
  },
  {
    id: 'menu-8',
    name: 'Cheesecake Desconstruída com Geleia de Amora',
    category: 'sobremesas',
    price: 32,
    description: 'Copo baixo minimalista com crumble crocante de castanhas brasileiras, creme suave de cream cheese fresco infusionado com fava de baunilha e calda artesanal de amora silvestre e framboesas.',
    image: 'https://images.unsplash.com/photo-1524351199679-46cddf530c04?auto=format&fit=crop&q=80&w=600',
    pairing: 'Vinho Recioto ou Late Harvest branco',
    anecdote: 'Equilíbrio sutil de acidez fresca e doçura perfumada, coroado com folhas de hortelã fresca e flor de alecrim.'
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
