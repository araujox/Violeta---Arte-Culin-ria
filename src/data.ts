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
    name: 'Camarão Crocante',
    category: 'entradas',
    price: 59.90,
    description: 'Camarão crocante servido com teriyaki de abacaxi e maionese de queijo provolone.',
    image: 'https://images.unsplash.com/photo-1559742811-824132454cf4?auto=format&fit=crop&q=80&w=600',
    pairing: 'Vinho Branco Sauvignon Blanc ou Espumante Brut',
    anecdote: 'Uma textura incrivelmente estaladiça combinando o toque adocicado do abacaxi caramelizado e o fundido de provolone suave.'
  },
  {
    id: 'menu-2',
    name: 'Brusquetta Tradicional',
    category: 'entradas',
    price: 39.90,
    description: 'Bruschetta de pasta de tomate com mousse de ricota finalizado com molho pesto de manjericão.',
    image: 'https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&q=80&w=600',
    pairing: 'Vinho Tinto Leve ou Aperol Spritz',
    anecdote: 'Um clássico italiano revisitado no Violeta com a leveza aérea da mousse de ricota fresca da casa e manjericão fresco colhido de nossa horta.'
  },
  {
    id: 'menu-3',
    name: 'Mousseline Prime',
    category: 'principais',
    price: 74.90,
    description: 'Mousseline de jerimum na manteiga de alho confitado servido com ribs de mignon na espuma de queijo parmesão finalizado com redução de melado e chips de macaxeira.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    pairing: 'Vinho Português encorpado ou Cabernet Sauvignon',
    anecdote: 'Indicação especial do Chef: a cremosidade do jerimum regional encontra a riqueza suculenta das ribs de mignon assadas lentamente por horas.',
    isChefRecommended: true
  },
  {
    id: 'menu-4',
    name: 'Risoto de Arroz Negro',
    category: 'principais',
    price: 79.90,
    description: 'Risoto de arroz negro com caldo de camarões, polvo glaciado finalizado com azeite de salsa, aioli defumado e rúcula tostado.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600',
    pairing: 'Vinho Branco Mineral ou Alvarinho Chardonnay',
    anecdote: 'A profundidade mística do arroz negro importado, coroada com a maciez incomparável do polvo glaciado em fogo alto.'
  },
  {
    id: 'menu-5',
    name: 'Violeta Hour Sour',
    category: 'drinks',
    price: 29.90,
    description: 'Vermute branco, xarope de violeta, suco de limão siciliano e hibisco. Cremoso, cítrico, perfumado e sofisticado.',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=600',
    pairing: 'Entradas de Burrata ou Bruschettas leves',
    anecdote: 'O drink assinatura que traduz o nome de nossa casa em uma sofisticada alquimia sensorial doce e agradável.'
  },
  {
    id: 'menu-6',
    name: 'Negroni Clássico',
    category: 'drinks',
    price: 29.90,
    description: 'Gin, vermute rosso e campari, finalizado com twist de laranja. Amargo, equilibrado e extremamente elegante.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600',
    pairing: 'Bolinho de Cupim ou Carpaccio',
    anecdote: 'O mais elegante e reverenciado cocktail italiano clássico que aguça o paladar por notas ricas e herbais.'
  },
  {
    id: 'menu-7',
    name: 'Torta Basca Cremosa',
    category: 'sobremesas',
    price: 26.90,
    description: 'De doce de leite com caramelo salgado e crocante de nozes com sorvete de leite defumado.',
    image: 'https://images.unsplash.com/photo-1524351199679-46cddf530c04?auto=format&fit=crop&q=80&w=600',
    pairing: 'Espumante de Sobremesa ou Vinho do Porto',
    anecdote: 'Delicada crosta dourada e assada abrigando um interior incrivelmente cremoso de doce de leite artesanal com leveza mineral.'
  },
  {
    id: 'menu-8',
    name: 'Canolli Italiano Siciliano',
    category: 'sobremesas',
    price: 19.90,
    description: 'Com limão siciliano e mousse de chocolate 70%.',
    image: 'https://images.unsplash.com/photo-1510972527409-cac5c441506a?auto=format&fit=crop&q=80&w=600',
    pairing: 'Café Expresso encorpado ou Licor de Avelã',
    anecdote: 'Autêntica crocância siciliana em combinação ousada e equilibrada de cítrico fresco com a suntuosidade de cacau belga.'
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
