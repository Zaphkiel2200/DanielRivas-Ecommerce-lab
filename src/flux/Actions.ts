import { Dispatcher } from "./Dispatcher";
import { getAnimes } from "../services/AnimeService";
import { Anime } from "../types/types";
import { store } from "./Store";

export const StoreActions = {
  loadAnimes: async (): Promise<void> => {
    try {
      const animes = await getAnimes();
      Dispatcher.dispatch({
        type: 'LOAD_ANIMES',
        payload: animes
      });
    } catch (error) {
      console.error("Error loading animes:", error);
      Dispatcher.dispatch({
        type: 'ANIME_LOAD_ERROR',
        payload: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  addToCart: (animeId: string): void => {
    const state = store.getState();
    const animeToAdd = state.animes.find((anime: Anime) => anime.id.toString() === animeId);
    
    if (animeToAdd && !state.cart.some((item: Anime) => item.id.toString() === animeId)) {
      Dispatcher.dispatch({
        type: 'ADD_TO_CART',
        payload: animeToAdd
      });
    }
  },

  removeFromCart: (animeId: string): void => {
    Dispatcher.dispatch({
      type: 'REMOVE_FROM_CART',
      payload: animeId
    });
  },

  navigate: (page: 'catalog' | 'cart'): void => {
    Dispatcher.dispatch({
      type: 'NAVIGATE',
      payload: page
    });
  },

  clearCart: (): void => {
    Dispatcher.dispatch({
      type: 'CLEAR_CART'
    });
  }
};