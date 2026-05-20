export interface MenuItem {
  id: string;
  name: string;
  category: 'entradas' | 'principais' | 'drinks' | 'sobremesas';
  price: number;
  description: string;
  image: string;
  pairing: string;
  anecdote: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  stars: number;
  dish: string;
}

export interface Table {
  id: number;
  seats: number;
  desc: string;
  location: string;
}
