export interface Anime {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: number;
  description: string;
  episodes: number;
}

export interface AppState {
  animes: Anime[];
  cart: Anime[];
  currentPage: 'catalog' | 'cart';
}